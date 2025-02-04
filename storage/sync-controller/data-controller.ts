// controllers/DataController.ts
import { createStore } from "zustand";
import { SyncController } from ".";
import { expoDB, localDB } from "#/app/_layout";
import { eq } from "drizzle-orm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SQLiteTable } from "drizzle-orm/sqlite-core";

type CacheStore = {
  cache: Record<string, any>;
  setCacheItem: (key: string, data: any) => void;
  invalidateCache: (key: string) => void;
};

const useCacheStore = createStore<CacheStore>((set) => ({
  cache: {},
  setCacheItem: (key, data) =>
    set((state) => ({ cache: { ...state.cache, [key]: data } })),
  invalidateCache: (key) =>
    set((state) => {
      const { [key]: _, ...rest } = state.cache;
      return { cache: rest };
    }),
}));

export class DataController {
  private readonly syncController: SyncController;

  constructor() {
    this.syncController = new SyncController();
  }

  async query<T>(entity: string, params = {}): Promise<T> {
    const cacheKey = `${entity}-${JSON.stringify(params)}`;
    const cached = useCacheStore.getState().cache[cacheKey];

    if (cached) return cached;

    try {
      let data;
      if (entity === "paths") {
        data = await expoDB.select().from(morseLearningPaths);
      } else if (entity === "courses") {
        data = await expoDB.select().from(morseCourses);
      }

      useCacheStore.getState().setCacheItem(cacheKey, data);
      return data as T;
    } catch (error) {
      console.error(`Query failed for ${entity}:`, error);
      throw error;
    }
  }

  async mutate<T>(entity: string, data: T): Promise<void> {
    try {
      // await expoDB.insert(entity).values(data as any);
      await localDB.execAsync(
        `INSERT INTO ${entity} VALUES (${Object.values(data as any)
          .map((value) => "?")
          .join(", ")})`
      );

      this.syncController.enqueueSyncTask({
        entity: `${entity}`,
        action: "push",
        data,
        timestamp: Date.now(),
      });

      useCacheStore.getState().invalidateCache(entity);
    } catch (error) {
      console.error(`Mutation failed for ${entity}:`, error);
      throw error;
    }
  }

  async prefetch(entities: string[]): Promise<void> {
    for (const entity of entities) {
      const lastSync = await this.getLastSync(entity);
      if (Date.now() - lastSync > 5 * 60 * 1000) {
        // 5 minutes
        await this.syncController.syncEntity(entity);
      }
    }
  }

  private async getLastSync(entity: string): Promise<number> {
    const syncState = await AsyncStorage.getItem("sync_state");
    if (!syncState) return 0;

    const { lastSynced } = JSON.parse(syncState);
    return lastSynced[entity] || 0;
  }
}
