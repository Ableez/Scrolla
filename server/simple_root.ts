import type {
  LearningPathWithRelations,
  CourseWithRelations,
  LessonWithRelations,
  UserProgressSelect,
  LeaderboardWithRelations,
  SwipeCardWithRelations,
} from "./schema.types";

const BASE_URL = "https://ea38-102-88-109-125.ngrok-free.app";

console.log("BASE", BASE_URL);

type Period = "weekly" | "monthly" | "all_time";

interface LeaderboardParams {
  pathId?: string;
  period: Period;
  limit?: number;
}

export const getAllPaths = async () => {
  const response = await fetch(`${BASE_URL}/api/trpc/learning.getAllPaths`);

  if (!response.ok) throw new Error("Failed to fetch learning paths");

  const json = await response.json();
  return json.result.data as LearningPathWithRelations[];
};

export const getPathById = async (
  pathId: string
): Promise<LearningPathWithRelations> => {
  const response = await fetch(
    `${BASE_URL}/api/trpc/learning.getPathById?input=${JSON.stringify(pathId)}`
  );
  if (!response.ok) throw new Error("Failed to fetch learning path");
  return response.json();
};

export const getCourseById = async (
  courseId: string
): Promise<CourseWithRelations> => {
  const response = await fetch(
    `${BASE_URL}/api/trpc/learning.getCourseById?input=${JSON.stringify(
      courseId
    )}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch course");
  return response.json();
};

export const getLessonById = async (
  lessonId: string
): Promise<LessonWithRelations> => {
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
};

export const getUserProgress = async (): Promise<UserProgressSelect> => {
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
};

export const getLeaderboard = async ({
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
};

export const getSwipeCardById = async (
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
};

export const getSwipeCardsByLessonId = async (
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
};
