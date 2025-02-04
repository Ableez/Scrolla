import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated as NativeAnimated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  SharedValue,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { Search } from "lucide-react-native";
import { router } from "expo-router";

import useTheme from "#/hooks/useTheme";
import { useLearningPaths } from "#/hooks/usePathsStore";
import ErrorState from "#/components/error-state";
import { FALLBACK_IMAGE_URL } from "#/constants/Var";
import {
  LearningPathWithRelations,
  CourseSelect,
  LevelWithRelations,
} from "#/server/schema.types";
import Text from "#/components/text";
import BouncyButton from "#/components/bouncy-button";

interface EnhancedLearningPath
  extends Omit<LearningPathWithRelations, "levels"> {
  levels: LevelWithRelations[];
  currentLevel: number | null;
  currentCourse: (CourseSelect & { moduleNumber: number }) | null;
}

interface CourseItemProps {
  item: EnhancedLearningPath;
  index: number;
  scrollY: SharedValue<number>;
  theme: "light" | "dark";
}

type CategoryKey = "All Courses" | "In Progress" | "Not Started" | "Completed";

const ITEM_HEIGHT = 340;
const HEADER_HEIGHT = 50;
const STICKY_HEADER_HEIGHT = 50;

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

const CourseItem: React.FC<CourseItemProps> = React.memo(
  ({ item, index, scrollY, theme }) => {
    const { colors } = useTheme();

    return (
      <BouncyButton
        style={[styles.courseItemContainer, { minHeight: ITEM_HEIGHT }]}
        onPress={() => router.navigate(`/path/${item.id}`)}
      >
        <View
          style={[
            styles.courseItem,
            {
              borderColor: theme === "dark" ? "#99999933" : "#aaaaaa44",
              height: ITEM_HEIGHT,
              borderBottomWidth: 6,
            },
          ]}
        >
          {item.currentLevel && (
            <View style={[styles.inProgressBadge, { borderColor: `#ddd` }]}>
              <Text
                style={[styles.inProgressText, { color: colors.primary }]}
                weight="semiBold"
              >
                IN PROGRESS
              </Text>
            </View>
          )}
          {item.currentLevel && (
            <Text
              style={[styles.levelText, { color: `${item.colorScheme?.s500}` }]}
            >
              LEVEL {item.currentLevel}
            </Text>
          )}
          <View style={styles.imageContainer}>
            <View
              style={[
                styles.imageBackground,
                { backgroundColor: `${item.colorScheme?.s300}22` },
              ]}
            >
              <Image
                source={require("../../assets/images/backdrop.png")}
                style={styles.backdropImage}
              />
            </View>
            <Image
              source={{ uri: item.imageUrl ?? FALLBACK_IMAGE_URL }}
              style={styles.courseImage}
            />
          </View>
          <View style={styles.courseContent}>
            <View>
              {!item.currentLevel && item.levels && (
                <Text
                  variant="caption"
                  color="#888"
                  style={styles.courseMetaInfo}
                >
                  {item.levels.length} LEVELS •{" "}
                  {item.levels.reduce(
                    (acc, level) => acc + (level.courses?.length ?? 0),
                    0
                  )}{" "}
                  COURSES
                </Text>
              )}
              <Text variant="h2" weight="semiBold">
                {item.title}
              </Text>
              {!item.currentLevel && (
                <Text
                  style={[
                    styles.courseDescription,
                    { color: `${colors.text}88` },
                  ]}
                >
                  {item.description}
                </Text>
              )}
              {item.currentLevel && item.currentCourse && (
                <Text style={styles.currentCourseTitle}>
                  {item.currentCourse.title}{" "}
                  {item.currentCourse.percentComplete}%
                </Text>
              )}
            </View>
            {item.currentLevel && item.currentCourse && (
              <View style={[styles.progressBar, { backgroundColor: "#eee" }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      backgroundColor: colors.primary,
                      width: `${item.currentCourse.percentComplete}%`,
                    },
                  ]}
                />
              </View>
            )}
          </View>
        </View>
      </BouncyButton>
    );
  }
);

const Courses: React.FC = () => {
  const { colors, theme } = useTheme();
  const {
    learningPaths,
    isLoading,
    refetch: refetchLearningPaths,
  } = useLearningPaths();

  const scrollY = useSharedValue(0);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey>("All Courses");
  const [categories, setCategories] = useState<
    Record<CategoryKey, { title: string; isActive: boolean }>
  >({
    "All Courses": { title: "All Courses", isActive: true },
    "In Progress": { title: "In Progress", isActive: false },
    "Not Started": { title: "Not Started", isActive: false },
    Completed: { title: "Completed", isActive: false },
  });

  const findCurrentLevel = (
    levels: LevelWithRelations[] | undefined
  ): number | null => {
    if (!levels?.length) return null;
    let lastLevelWithProgress = 1;

    for (let i = 0; i < levels.length; i++) {
      const currentLevelHasProgress = levels[i].courses?.some(
        (course) => course.percentComplete > 0
      );

      if (currentLevelHasProgress) {
        lastLevelWithProgress = i + 1;
      }
      const nextLevelIndex = i + 1;
      const isLastLevel = nextLevelIndex === levels.length;
      const nextLevelHasNoProgress =
        isLastLevel ||
        levels[nextLevelIndex].courses?.every(
          (course) => course.percentComplete === 0
        );

      if (currentLevelHasProgress && nextLevelHasNoProgress) {
        return i + 1;
      }
    }

    return lastLevelWithProgress > 1 ? lastLevelWithProgress : null;
  };

  const findCurrentCourse = (
    levels: LevelWithRelations[] | undefined
  ): (CourseSelect & { moduleNumber: number }) | null => {
    if (!levels?.length) return null;
    let currentCourse: (CourseSelect & { moduleNumber: number }) | null = null;
    let highestProgress = 0;

    levels.forEach((level) => {
      level.courses?.forEach((course, index) => {
        if (
          (course.percentComplete > 0 && highestProgress === 0) ||
          course.percentComplete > highestProgress
        ) {
          currentCourse = { ...course, moduleNumber: index + 1 };
          highestProgress = course.percentComplete;
        }
      });
    });

    return currentCourse;
  };

  const pathsWithCurrentLevel = useMemo<EnhancedLearningPath[]>(() => {
    if (!learningPaths.data) return [];

    const isValidPath = (
      path: unknown
    ): path is LearningPathWithRelations & { levels: LevelWithRelations[] } => {
      return (
        path !== null &&
        typeof path === "object" &&
        "levels" in path &&
        Array.isArray((path as any).levels) &&
        "id" in path &&
        "title" in path &&
        "slug" in path
      );
    };

    return (learningPaths.data as unknown[]).filter(isValidPath).map((path) => {
      const enhancedPath: EnhancedLearningPath = {
        id: path.id,
        createdAt: path.createdAt,
        updatedAt: path.updatedAt,
        slug: path.slug,
        title: path.title,
        description: path.description,
        imageUrl: path.imageUrl,
        isEnrolled: path.isEnrolled,
        percentComplete: path.percentComplete,
        wasRecommended: path.wasRecommended,
        suggestedCourseSlug: path.suggestedCourseSlug,
        colorScheme: path.colorScheme,
        enrolledUsers: path.enrolledUsers,
        swipeCards: path.swipeCards,
        lessons: path.lessons,
        levels: path.levels,
        currentLevel: findCurrentLevel(path.levels),
        currentCourse: findCurrentCourse(path.levels),
      };
      return enhancedPath;
    });
  }, [learningPaths.data]);

  const filteredPaths = useMemo(() => {
    return pathsWithCurrentLevel.filter((path) => {
      switch (selectedCategory) {
        case "In Progress":
          return path.currentLevel !== null;
        case "Not Started":
          return path.currentLevel === null;
        case "Completed":
          return (
            path.levels?.every((level) =>
              level.courses?.every((course) => course.percentComplete === 100)
            ) ?? false
          );
        default:
          return true;
      }
    });
  }, [pathsWithCurrentLevel, selectedCategory]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  if (learningPaths.error) {
    return (
      <ErrorState
        message="There was an error fetching the learning paths. Please try again later."
        onBack={() => router.back()}
        title="Learning Paths Error"
      />
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 28 }} weight="medium">
          Courses
        </Text>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Search size={26} color={theme === "dark" ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={[colors.background, "rgba(255, 255, 255, 0)"]}
        style={styles.headerGradient}
      />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} size={"large"} />
        </View>
      ) : (
        <FlashList
          data={Object.keys(categories)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 36,
                  paddingVertical: 1,
                  borderWidth: 1,
                  borderColor: selectedCategory === item ? "#000" : "#ddd",
                },
              ]}
              onPress={() => {
                setSelectedCategory(item as CategoryKey);
                setCategories((prev) => ({
                  ...prev,
                  [item as CategoryKey]: {
                    ...prev[item as CategoryKey],
                    isActive: !prev[item as CategoryKey].isActive,
                  },
                }));
              }}
              activeOpacity={0.6}
            >
              <Text
                style={{
                  color:
                    selectedCategory === item ? "#000" : colors.tertiaryText,
                  fontSize: 14,
                }}
                weight={"medium"}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={100}
          contentContainerStyle={styles.categoriesContentContainer}
          // onRefresh={async () => await refetchLearningPaths()}
        />
      )}

      {!isLoading && filteredPaths.length > 0 ? (
        <AnimatedFlashList
          data={filteredPaths}
          refreshControl={<RefreshControl refreshing={isLoading} />}
          refreshing={isLoading}
          onRefresh={async () => await refetchLearningPaths()}
          renderItem={({ item, index }) => (
            <CourseItem
              item={item as EnhancedLearningPath}
              index={index}
              scrollY={scrollY}
              theme={theme}
            />
          )}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={styles.coursesContentContainer}
          estimatedItemSize={200}
          ListEmptyComponent={() => (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>
                No courses found in this category
              </Text>
            </View>
          )}
        />
      ) : !isLoading && !filteredPaths.length ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            No courses found in this category
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    height: Dimensions.get("screen").height - 400,
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    width: Dimensions.get("screen").width,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: HEADER_HEIGHT,
  },
  headerTitle: {
    fontSize: 28,
  },
  headerGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: HEADER_HEIGHT * 2.7,
    height: HEADER_HEIGHT / 1.618,
    zIndex: 9,
  },
  categoriesContainer: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 8,
  },
  categoryButton: {
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 14,
  },
  categoriesContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  coursesContentContainer: {
    paddingHorizontal: 20,
    paddingTop: HEADER_HEIGHT / 1.618,
  },
  courseItemContainer: {
    marginBottom: 16,
  },
  courseItem: {
    width: "100%",
    borderWidth: 1,
    borderBottomWidth: 6,
    borderRadius: 24,
    height: ITEM_HEIGHT,
    overflow: "hidden",
    position: "relative",
  },
  inProgressBadge: {
    position: "absolute",
    backgroundColor: "#eee",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    left: 8,
    top: 8,
    borderWidth: 1,
    zIndex: 1,
  },
  inProgressText: {
    fontSize: 12,
  },
  levelText: {
    fontSize: 12,
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  imageContainer: {
    position: "relative",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  backdropImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    opacity: 0.22,
  },
  courseImage: {
    width: 160,
    height: 160,
    resizeMode: "cover",
  },
  courseContent: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  courseMetaInfo: {
    fontSize: 12,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 24,
  },
  courseDescription: {
    fontSize: 16,
    marginVertical: 4,
  },
  currentCourseTitle: {
    fontSize: 16,
    marginTop: 8,
  },
  progressBar: {
    width: "100%",
    height: 8,
    overflow: "hidden",
    borderRadius: 100,
  },
  progressBarFill: {
    height: 8,
  },
  continueButton: {
    padding: 12,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: "#888",
  },
});

export default Courses;
