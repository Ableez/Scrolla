import { root } from "../root";
import { useQuery, useMutation } from "@tanstack/react-query";

export const learningRouter = {
  getAllPaths: {
    useQuery: () => {
      return useQuery({
        queryKey: ["learning", "paths"],
        queryFn: async () => {
          const data = await root.learning.getAllPaths();
          console.log("DATA", data);
          return data;
        },
        enabled: true,
      });
    },
  },

  getPathById: {
    useQuery: (pathId: string) => {
      return useQuery({
        queryKey: ["learning", "path", pathId],
        queryFn: async () => {
          const data = await root.learning.getPathById(pathId);
          return data;
        },
        enabled: !!pathId,
      });
    },
  },

  getCourseById: {
    useQuery: (courseId: string) => {
      return useQuery({
        queryKey: ["learning", "course", courseId],
        queryFn: async () => {
          const data = await root.learning.getCourseById(courseId);
          return data;
        },
        enabled: !!courseId,
      });
    },
  },

  getLessonById: {
    useQuery: (lessonId: string) => {
      return useQuery({
        queryKey: ["learning", "lesson", lessonId],
        queryFn: async () => {
          const data = await root.learning.getLessonById(lessonId);
          return data;
        },
        enabled: !!lessonId,
      });
    },
  },

  getUserProgress: {
    useQuery: () => {
      return useQuery({
        queryKey: ["learning", "userProgress"],
        queryFn: async () => {
          const data = await root.learning.getUserProgress();
          return data;
        },
      });
    },
  },

  getLeaderboard: {
    useQuery: (params: {
      pathId?: string;
      period: "weekly" | "monthly" | "all_time";
      limit?: number;
    }) => {
      return useQuery({
        queryKey: ["learning", "leaderboard", params],
        queryFn: async () => {
          const data = await root.learning.getLeaderboard(params);
          return data;
        },
        enabled: !!params.period,
      });
    },
  },

  getSwipeCardById: {
    useQuery: (cardId: string) => {
      return useQuery({
        queryKey: ["learning", "swipeCard", cardId],
        queryFn: async () => {
          const data = await root.learning.getSwipeCardById(cardId);
          return data;
        },
        enabled: !!cardId,
      });
    },
  },

  getSwipeCardsByLessonId: {
    useQuery: (lessonId: string) => {
      return useQuery({
        queryKey: ["learning", "lessonSwipeCards", lessonId],
        queryFn: async () => {
          const data = await root.learning.getSwipeCardsByLessonId(lessonId);
          return data;
        },
        enabled: !!lessonId,
      });
    },
  },
};
