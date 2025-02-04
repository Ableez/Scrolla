import {
  DB_insertAllPaths,
  DB_queryAllPaths,
} from "#/storage/sqlite/statements";
import type {
  LearningPathWithRelations,
  CourseWithRelations,
  LessonWithRelations,
  UserProgressSelect,
  LeaderboardWithRelations,
  SwipeCardWithRelations,
} from "./schema.types";
import { generateUID } from "#/utils/generate-uuid";
import { expoDB } from "#/app/_layout";
import { allLearningPaths, coursesData } from "#/storage/sqlite/schema";
import { eq } from "drizzle-orm";

const BASE_URL = "https://52ea-102-89-22-117.ngrok-free.app";

type Period = "weekly" | "monthly" | "all_time";

const STALE_TIME = 1000 * 60 * 1000;

interface LeaderboardParams {
  pathId?: string;
  period: Period;
  limit?: number;
}

type LocalDBItem = {
  id: string;
  lastSynced: number;
  data: string;
};

export const root = {
  learning: {
    getAllPaths: async (): Promise<LearningPathWithRelations[] | null> => {
      try {
        const data = await expoDB.select().from(allLearningPaths);

        if (
          data[0] &&
          data[0].lastSynced! > new Date().getTime() - STALE_TIME
        ) {
          console.log("RETURNING FROM CACHE");
          return JSON.parse(data[0].data!);
        }
        console.log("FETCHING FROM SERVER");

        const response = await fetch(
          `${BASE_URL}/api/trpc/learning.getAllPaths`
        );

        if (!response.ok) {
          if (data[0]) {
            console.log("[ERROR]: FALLBACK TO CACHE");

            return JSON.parse(data[0].data!);
          } else {
            throw new Error("Error fetching learning paths");
          }
        }

        const d = ((await response.json()) as unknown as any).result.data.json;
        expoDB.delete(allLearningPaths).all();

        await expoDB.insert(allLearningPaths).values({
          id: generateUID(),
          lastSynced: new Date().getTime(),
          data: JSON.stringify(d),
        });

        return d;
      } catch (error) {
        console.error("ERROR", error);
        return null;
      }
    },

    getPathById: async (pathId: string): Promise<LearningPathWithRelations> => {
      const response = await fetch(
        `${BASE_URL}/api/trpc/learning.getPathById?input=${JSON.stringify(
          pathId
        )}`
      );
      if (!response.ok) throw new Error("Failed to fetch learning path");
      return response.json();
    },

    getCourseById: async (courseId: string): Promise<CourseWithRelations> => {
      const data = await expoDB
        .select()
        .from(coursesData)
        .where(eq(coursesData.id, courseId));

      if (data[0] && data[0].lastSynced! > new Date().getTime() - STALE_TIME) {
        console.log("RETURNING FROM CACHE");
        return JSON.parse(data[0].data!);
      }

      // THIS IS SAYING COURSE ID IS NOT DEFINED OR ISN'T A STRING
      // FIX THIS

      console.log(
        `${BASE_URL}/api/trpc/learning.getCourseById?input=${JSON.stringify({
          json: { courseId },
        })}`
      );
      if (!courseId) throw new Error("Course ID is not defined");

      const response = await fetch(
        `${BASE_URL}/api/trpc/learning.getCourseById?input=${JSON.stringify({
          json: { courseId },
        })}`
      );
      if (!response.ok) throw new Error("Failed to fetch course");
      const d = ((await response.json()) as unknown as any).result.data.json;

      expoDB.delete(coursesData).where(eq(coursesData.id, courseId)).all();

      await expoDB.insert(coursesData).values({
        id: courseId,
        lastSynced: new Date().getTime(),
        data: JSON.stringify(d),
      });

      return d;
    },

    getLessonById: async (lessonId: string): Promise<LessonWithRelations> => {
      const response = await fetch(
        `${BASE_URL}/api/trpc/learning.getLessonById?input=${JSON.stringify(
          lessonId
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch lesson");
      return response.json();
    },

    getUserProgress: async (): Promise<UserProgressSelect> => {
      const response = await fetch(
        `${BASE_URL}/api/trpc/learning.getUserProgress`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch user progress");
      return response.json();
    },

    getLeaderboard: async ({
      pathId,
      period,
      limit = 10,
    }: LeaderboardParams): Promise<LeaderboardWithRelations[]> => {
      const params = { pathId, period, limit };
      const response = await fetch(
        `${BASE_URL}/api/trpc/learning.getLeaderboard?input=${JSON.stringify(
          params
        )}`
      );
      if (!response.ok) throw new Error("Failed to fetch leaderboard");
      return response.json();
    },

    getSwipeCardById: async (
      cardId: string
    ): Promise<SwipeCardWithRelations> => {
      const response = await fetch(
        `${BASE_URL}/api/trpc/learning.getSwipeCardById?input=${JSON.stringify(
          cardId
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch swipe card");
      return response.json();
    },

    getSwipeCardsByLessonId: async (
      lessonId: string
    ): Promise<SwipeCardWithRelations[]> => {
      const response = await fetch(
        `${BASE_URL}/api/trpc/learning.getSwipeCardsByLessonId?input=${JSON.stringify(
          lessonId
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch lesson swipe cards");
      return response.json();
    },
  },
};
