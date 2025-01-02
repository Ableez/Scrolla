export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  isEnrolled: boolean;
  percentComplete: number;
  wasRecommended: boolean;
  suggestedCourseSlug: string | null;
  createdAt: Date;
  updatedAt: Date;
  colorScheme?: ColorScheme;
  levels: Level[];
  leaderboardEntries?: LeaderboardEntry[];
}

export interface ColorScheme {
  id: string;
  pathId: string;
  s100: string | null;
  s200: string | null;
  s300: string | null;
  s500: string | null;
  s700: string | null;
}

export interface Level {
  id: string;
  pathId: string;
  number: number;
  courses: Course[];
  learningPath?: LearningPath;
}

export interface Course {
  id: string;
  levelId: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  percentComplete: number;
  isUpdated: boolean;
  desktopOnly: boolean;
  retiringOn: Date | null;
  level?: Level;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  pathId: string;
  levelId: string;
  course?: Course;
  path?: LearningPath;
  level?: Level;
  swipeCards?: SwipeCard[];
}

export interface SwipeCard {
  id: string;
  title: string;
  content: string | null;
  pathId: string;
  courseId: string;
  levelId: string;
  lessonId: string;
  path?: LearningPath;
  course?: Course;
  level?: Level;
  lesson?: Lesson;
}

export interface UserProgress {
  id: string;
  userId: string;
  totalPoints: number;
  currentStreak: number;
  lastActivityAt: Date | null;
  rank: number | null;
  weeklyPoints: number;
  monthlyPoints: number;
  user?: User;
}

export interface Achievement {
  id: string;
  type: AchievementType;
  name: string;
  description: string | null;
  pointValue: number;
  imageUrl: string | null;
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  earnedAt: Date;
  achievement?: Achievement;
  user?: User;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  pathId: string | null;
  points: number;
  rank: number;
  period: LeaderboardPeriod;
  achievementCount: number;
  lastUpdated: Date;
  user?: User;
  learningPath?: LearningPath;
}

export interface User {
  id: string;
  username: string | null;
  displayName: string | null;
  email: string;
  imageUrl: string | null;
  profileImageUrl: string | null;
}

export type AchievementType =
  | "course_completion"
  | "path_completion"
  | "streak"
  | "first_enrollment"
  | "speed_learning";

export type LeaderboardPeriod = "weekly" | "monthly" | "all_time";
