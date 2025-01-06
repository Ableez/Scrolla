// types/sync.ts
export type SyncTask = {
  entity: string;
  action: "pull" | "push";
  id?: string;
  data?: any;
  timestamp: number;
};

export type SyncState = {
  lastSynced: Record<string, number>;
  pendingTasks: SyncTask[];
};

import { expoDB } from "@/app/_layout";
import { root } from "@/server/root";
// controllers/SyncController.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import {
  morseCourses,
  morseLearningPaths,
  morseLessons,
  morseLevels,
} from "../sqlite/schema";
import { transformAndInsertPath } from "../transformer";
import {
  CourseWithRelations,
  LessonWithRelations,
} from "@/server/schema.types";

export class SyncController {
  private syncState: SyncState = {
    lastSynced: {},
    pendingTasks: [],
  };

  constructor() {
    this.loadSyncState();
    this.setupNetworkListener();
  }

  private async loadSyncState() {
    const state = await AsyncStorage.getItem("sync_state");
    if (state) {
      this.syncState = JSON.parse(state);
    }
  }

  private async saveSyncState() {
    await AsyncStorage.setItem("sync_state", JSON.stringify(this.syncState));
  }

  private setupNetworkListener() {
    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        this.processSyncQueue();
      }
    });
  }

  async syncAll() {
    try {
      const pathsData = await root.learning.getAllPaths();
      const { paths, levels } = transformAndInsertPath(pathsData);

      // Add missing fields to paths object.  Replace with actual values.
      const pathsWithIds = paths.map((path) => ({
        ...path,
        createdAt: path.createdAt.getTime(), // Convert Date to timestamp
        updatedAt: path.updatedAt.getTime(), // Convert Date to timestamp
      }));

      await expoDB
        .insert(morseLearningPaths)
        .values(pathsWithIds) // Corrected: Now using values([...])
        .onConflictDoUpdate({
          target: morseLearningPaths.id,
          set: paths.reduce(
            (acc, morseLearningPath) => ({ ...acc, ...morseLearningPath }),
            {}
          ),
        });

      await expoDB
        .insert(morseLevels)
        .values(levels)
        .onConflictDoUpdate({
          target: morseLevels.id,
          set: levels.reduce((acc, level) => ({ ...acc, ...level }), {}),
        });
    } catch (error) {
      console.error("Sync failed:", error);
      this.enqueueSyncTask({
        entity: "all",
        action: "pull",
        timestamp: Date.now(),
      });
    }
  }

  async syncEntity(entity: string, id?: string) {
    try {
      let data: CourseWithRelations | LessonWithRelations;
      switch (entity) {
        case "courses":
          data = await root.learning.getCourseById(id!);

          const dataForDb = { ...data, retiringOn: data.retiringOn?.getTime() };

          await expoDB
            .insert(morseCourses)
            .values(dataForDb)
            .onConflictDoUpdate({
              target: morseCourses.id,
              set: dataForDb,
            });
          break;
        case "lessons":
          data = await root.learning.getLessonById(id!);
          const dataForDb2 = {
            ...data,
            createdAt: data.createdAt.getTime(),
            updatedAt: data.updatedAt.getTime(),
          };
          await expoDB
            .insert(morseLessons)
            .values(dataForDb2)
            .onConflictDoUpdate({ target: morseLessons.id, set: dataForDb2 });
          break;
      }

      this.syncState.lastSynced[entity] = Date.now();
      await this.saveSyncState();
    } catch (error) {
      this.enqueueSyncTask({
        entity,
        id,
        action: "pull",
        timestamp: Date.now(),
      });
    }
  }

  enqueueSyncTask(task: SyncTask) {
    this.syncState.pendingTasks.push(task);
    this.saveSyncState();
  }

  async processSyncQueue() {
    const isConnected = (await NetInfo.fetch()).isConnected;
    if (!isConnected) return;

    while (this.syncState.pendingTasks.length > 0) {
      const task = this.syncState.pendingTasks[0];
      try {
        if (task.action === "pull") {
          if (task.entity === "all") {
            await this.syncAll();
          } else {
            await this.syncEntity(task.entity, task.id);
          }
        }
        this.syncState.pendingTasks.shift();
        await this.saveSyncState();
      } catch (error) {
        break;
      }
    }
  }
}
