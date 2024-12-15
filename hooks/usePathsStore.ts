import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { learningPaths } from "@/_mock_/data";
import type { LearningPath, Level, Course } from "@/_mock_/type";

// State Types
type DataState<T> = {
  data: T[];
  isLoading: boolean;
  error: string | null;
};

type CourseWithContext = Course & {
  level?: Level;
  learningPath?: LearningPath;
};

type LearningPlatformStore = {
  // Learning Paths
  learningPaths: DataState<LearningPath>;
  fetchLearningPaths: (options?: {
    status?: boolean;
    includeDetails?: boolean;
  }) => Promise<LearningPath[]>;

  // Utility Methods
  getPathById: (id: string) => LearningPath | undefined;
  getLevelByNumber: (pathId: string, levelNumber: number) => Level | undefined;
  getCourseById: (
    pathId: string,
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

    fetchLearningPaths: async (options = {}) => {
      set((state) => ({
        learningPaths: {
          ...state.learningPaths,
          isLoading: true,
          error: null,
        },
      }));

      try {
        // Simulating API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filter learning paths based on enrollment status
        let filteredPaths =
          options.status !== undefined
            ? learningPaths.filter((path) => path.isEnrolled === options.status)
            : learningPaths;

        set((state) => ({
          learningPaths: {
            data: filteredPaths,
            isLoading: false,
            error: null,
          },
        }));

        return filteredPaths;
      } catch (error) {
        set((state) => ({
          learningPaths: {
            ...state.learningPaths,
            isLoading: false,
            error: error instanceof Error ? error.message : "An error occurred",
          },
        }));
        return [];
      }
    },

    // Utility Methods
    getPathById: (id: string) => {
      return learningPaths.find((path) => path.id === id);
    },

    getLevelByNumber: (pathId: string, levelNumber: number) => {
      const path = get().getPathById(pathId);
      return path?.levels.find((level) => level.number === levelNumber);
    },

    getCourseById: (
      pathId: string,
      courseId: string,
      options?: {
        with?: {
          levels?: boolean;
          path?: boolean;
        };
      }
    ) => {
      const path = get().getPathById(pathId);
      if (!path) return undefined;

      const course = path.levels
        .flatMap((level) => level.courses)
        .find((course) => course.id === courseId);

      if (!course) return undefined;

      // If no options are provided, return the course as-is
      if (!options?.with) {
        return course;
      }

      // Create a result object with the course
      let result: Partial<
        Course & { level?: Level; learningPath?: LearningPath }
      > = { ...course };

      // Include level information if requested
      if (options.with.levels) {
        const containingLevel = path.levels.find((level) =>
          level.courses.some((c) => c.id === courseId)
        );
        result.level = containingLevel;
      }

      // Include path information if requested
      if (options.with.path) {
        result.learningPath = path;
      }

      return result;
    },

    calculatePathProgress: (pathId: string) => {
      const path = get().getPathById(pathId);
      if (!path) return 0;

      const allCourses = path.levels.flatMap((level) => level.courses);
      const completedCourses = allCourses.filter(
        (course) => course.percentComplete > 0
      );

      return allCourses.length > 0
        ? (completedCourses.length / allCourses.length) * 100
        : 0;
    },
  }))
);

// Hooks for easy access in components
export const useLearningPaths = () => {
  const { learningPaths, fetchLearningPaths } = usePathStore();
  return { learningPaths, fetchLearningPaths };
};
