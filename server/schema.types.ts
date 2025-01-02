// Base types for common fields
type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// User Types
export type UserSelect = BaseEntity & {
  deleted: boolean;
  deletedAt: Date | null;
  deletedBy: string | null;
  username: string | null;
  displayName: string | null;
  bio: string | null;
  email: string;
  emailVerified: boolean;
  imageUrl: string | null;
  profileImageUrl: string | null;
  birthday: Date | null;
  gender: string | null;
  passwordEnabled: boolean;
  twoFactorEnabled: boolean;
  lastSignInAt: Date | null;
  disabled: boolean;
  metadata: Record<string, unknown> | null;
};

export type LearningPathSelect = BaseEntity & {
  slug: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  isEnrolled: boolean;
  percentComplete: number;
  wasRecommended: boolean;
  suggestedCourseSlug: string | null;
};

export type ColorSchemeSelect = {
  id: string;
  pathId: string;
  s100: string | null;
  s200: string | null;
  s300: string | null;
  s500: string | null;
  s700: string | null;
};

export type LevelSelect = {
  id: string;
  pathId: string;
  number: number;
};

export type CourseSelect = {
  id: string;
  levelId: string;
  title: string;
  slug: string;
  imageUrl: string | null;
  percentComplete: number;
  isUpdated: boolean;
  desktopOnly: boolean;
  retiringOn: Date | null;
};

export type UserProgressSelect = {
  id: string;
  userId: string;
  totalPoints: number;
  currentStreak: number;
  lastActivityAt: Date;
  rank: number | null;
  weeklyPoints: number;
  monthlyPoints: number;
};

export type AchievementSelect = {
  id: string;
  type:
    | "course_completion"
    | "path_completion"
    | "streak"
    | "first_enrollment"
    | "speed_learning";
  name: string;
  description: string | null;
  pointValue: number;
  imageUrl: string | null;
};

export type LeaderboardSelect = {
  id: string;
  userId: string;
  pathId: string | null;
  points: number;
  rank: number;
  period: string;
  achievementCount: number;
  lastUpdated: Date;
};

export type LessonSelect = BaseEntity & {
  title: string;
  description: string;
  imageUrl: string;
  courseId: string;
  pathId: string;
  levelId: string;
};

export type SwipeCardSelect = {
  id: string;
  title: string;
  content: string | null;
  pathId: string;
  courseId: string;
  levelId: string;
  lessonId: string;
};

// Relation Types
export type UserWithRelations = UserSelect & {
  enrolledPaths?: LearningPathSelect[];
  progress?: UserProgressSelect;
  achievements?: AchievementSelect[];
};

export type LearningPathWithRelations = LearningPathSelect & {
  colorScheme?: ColorSchemeSelect;
  levels?: LevelWithRelations[];
  enrolledUsers?: UserSelect[];
  swipeCards?: SwipeCardSelect[];
  lessons?: LessonSelect[];
};

export type LevelWithRelations = LevelSelect & {
  courses?: CourseSelect[];
  learningPath?: LearningPathSelect;
  swipeCards?: SwipeCardSelect[];
  lessons?: LessonSelect[];
};

export type CourseWithRelations = CourseSelect & {
  level?: LevelSelect;
  swipeCards?: SwipeCardSelect[];
  lessons?: LessonSelect[];
};

export type LeaderboardWithRelations = LeaderboardSelect & {
  user?: UserSelect;
  learningPath?: LearningPathSelect;
};

export type LessonWithRelations = LessonSelect & {
  course?: CourseSelect;
  path?: LearningPathSelect;
  level?: LevelSelect;
  swipeCards?: SwipeCardSelect[];
};

export type SwipeCardWithRelations = SwipeCardSelect & {
  path?: LearningPathSelect;
  course?: CourseSelect;
  level?: LevelSelect;
  lesson?: LessonSelect;
};
