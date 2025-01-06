import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useEffect, useState } from "react";
import { api } from "@/server/api";
import { root } from "@/server/root";
import type {
  LearningPathWithRelations,
  LevelWithRelations,
  CourseWithRelations,
} from "@/server/schema.types";
import { expoDB } from "@/app/_layout";
import { allLearningPaths } from "@/storage/sqlite/schema";
import { DB_queryAllPaths } from "@/storage/sqlite/statements";

// State Types
type DataState<T> = {
  data: T[];
  isLoading: boolean;
  error: string | null;
};

type CourseWithContext = CourseWithRelations & {
  courseNumber: number;
  learningPath?: LearningPathWithRelations;
};

type LearningPlatformStore = {
  // Learning Paths
  learningPaths: DataState<LearningPathWithRelations>;
  setLearningPaths: (paths: LearningPathWithRelations[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // Utility Methods
  getPathById: (id: string) =>
    | (LearningPathWithRelations & {
        currentLevelNumber: number;
        nextCourseId: string | undefined;
      })
    | undefined;
  getLevelByNumber: (
    pathId: string,
    levelNumber: number
  ) => LevelWithRelations | undefined;
  getCourseById: (
    courseId: string,
    options?: {
      with?: {
        levels?: boolean;
        path?: boolean;
      };
    }
  ) => CourseWithContext | undefined;
  calculatePathProgress: (pathId: string) => number;
};

// Create Zustand Store
export const usePathStore = create<LearningPlatformStore>()(
  devtools((set, get) => ({
    // Learning Paths
    learningPaths: { data: [], isLoading: false, error: null },

    setLearningPaths: (paths) =>
      set((state) => ({
        learningPaths: { ...state.learningPaths, data: paths },
      })),

    setLoading: (isLoading) =>
      set((state) => ({
        learningPaths: { ...state.learningPaths, isLoading },
      })),

    setError: (error) =>
      set((state) => ({
        learningPaths: { ...state.learningPaths, error },
      })),

    getPathById: (id: string) => {
      const path = get().learningPaths.data.find((path) => path.id === id);
      if (!path || !path.levels) return undefined;

      // Find the current level and next course
      let currentLevelNumber = 1;
      let nextCourseId: string | undefined;

      // Iterate through levels and courses to find current progress
      for (const level of path.levels) {
        if (!level.courses?.length) continue;

        const incompleteCourse = level.courses.find(
          (course) => course.percentComplete < 100
        );

        if (incompleteCourse) {
          currentLevelNumber = level.number;
          if (!nextCourseId) {
            nextCourseId = incompleteCourse.id;
          }
          break;
        }
      }

      if (!nextCourseId) {
        const nextLevel = path.levels.find(
          (level) => level.number === currentLevelNumber + 1
        );
        if (nextLevel?.courses?.[0]) {
          nextCourseId = nextLevel.courses[0].id;
        }
      }

      return {
        ...path,
        currentLevelNumber,
        nextCourseId,
      };
    },

    getLevelByNumber: (pathId: string, levelNumber: number) => {
      const path = get().getPathById(pathId);
      if (!path?.levels) return undefined;
      return path.levels.find((level) => level.number === levelNumber);
    },

    getCourseById: (courseId: string, options) => {
      const path = get().learningPaths.data.find((path) =>
        path.levels?.some((level) =>
          level.courses?.some((course) => course.id === courseId)
        )
      );

      if (!path?.levels) return undefined;

      const level = path.levels.find((level) =>
        level.courses?.some((course) => course.id === courseId)
      );

      if (!level?.courses) return undefined;

      const courseIndex = level.courses.findIndex(
        (course) => course.id === courseId
      );

      if (courseIndex === -1) return undefined;

      const course = level.courses[courseIndex];
      const baseResult: CourseWithContext = {
        ...course,
        courseNumber: courseIndex + 1,
        level: undefined,
        swipeCards: undefined,
        lessons: undefined,
      };

      if (!options?.with) {
        return baseResult;
      }

      if (options.with.levels) {
        baseResult.level = level;
      }

      if (options.with.path) {
        baseResult.learningPath = path;
      }

      return baseResult;
    },

    calculatePathProgress: (pathId: string) => {
      const path = get().getPathById(pathId);
      if (!path?.levels) return 0;

      const allCourses = path.levels.flatMap((level) => level.courses ?? []);
      if (!allCourses.length) return 0;

      const completedCourses = allCourses.filter(
        (course) => course?.percentComplete > 0
      );

      return (completedCourses.length / allCourses.length) * 100;
    },
  }))
);

// Custom hooks for data fetching with React Query
export const useLearningPaths = () => {
  const store = usePathStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const qr = await (await DB_queryAllPaths).executeAsync();

      console.log("1:", qr);
    } catch (error) {
      console.error(
        "OH SHITT! Something went wrong while fetching learning paths",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const query = await root.learning.getAllPaths();

        if (query) {
          store.setLearningPaths(query);
        }
      } catch (error) {
        console.error(
          "OH SHITT! Something went wrong while fetching learning paths",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

  return {
    learningPaths: store.learningPaths,
    isLoading,
    refetch: fetchData,
  };
};

export const useLearningPath = (pathId: string) => {
  return api.learning.getPathById.useQuery(pathId);
};

export const useCourse = (courseId: string) => {
  return api.learning.getCourseById.useQuery(courseId);
};

export const useLesson = (lessonId: string) => {
  return api.learning.getLessonById.useQuery(lessonId);
};

export const useUserProgress = () => {
  return api.learning.getUserProgress.useQuery();
};

export const useLeaderboard = (options: {
  pathId?: string;
  period: "weekly" | "monthly" | "all_time";
  limit?: number;
}) => {
  return api.learning.getLeaderboard.useQuery(options);
};
