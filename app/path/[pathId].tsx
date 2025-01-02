import type { LearningPath, Level } from "@/_mock_/type";
import React, { useCallback, useEffect, useMemo } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useLocalSearchParams, router, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "lucide-react-native";
import ErrorState from "@/components/error-state";
import useTheme from "@/hooks/useTheme";
import {
  ColorSchemeSelect,
  LearningPathWithRelations,
  LevelWithRelations,
} from "@/server/schema.types";
import Text from "@/components/text";
import { usePathStore } from "@/hooks/usePathsStore";
import CourseCard from "@/components/path-screen/course-card";

// Separate components to prevent unnecessary re-renders
const HeaderImage = React.memo(
  ({
    imageUrl,
    colorScheme,
    colors,
  }: {
    imageUrl: string;
    colorScheme?: ColorSchemeSelect;
    colors: any;
  }) => (
    <View style={styles.imageContainer}>
      <View
        style={[
          styles.imageBackground,
          {
            backgroundColor: `${colorScheme?.s300 ?? colors.primary}22`,
          },
        ]}
      >
        <Image
          source={require("../../assets/images/backdrop.png")}
          style={styles.backdropImage}
        />
        <View
          style={[
            styles.gradientOverlay,
            {
              backgroundColor: `${colorScheme?.s300 ?? colors.primary}88`,
            },
          ]}
        />
        <View
          style={[
            styles.gradientOverlayBottom,
            {
              backgroundColor: `${colorScheme?.s300 ?? colors.primary}99`,
            },
          ]}
        />
      </View>
      <Image
        source={{ uri: imageUrl ?? "https://github.com/shadcn.png" }}
        style={styles.courseImage}
      />
    </View>
  )
);

const CourseItem = React.memo(
  ({ course, pathId }: { course: any; pathId: string }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => router.push(`/course/${course.id}__${pathId}`)}
      style={styles.courseItem}
    >
      <Image
        source={{
          uri: course.imageUrl ?? "https://github.com/shadcn.png",
        }}
        style={styles.courseThumb}
      />
      <Text style={styles.courseTitle}>{course.title}</Text>
    </TouchableOpacity>
  )
);

const LevelItem = React.memo(
  ({
    item,
    pathId,
    theme,
    colors,
  }: {
    item: LevelWithRelations;
    pathId: string;
    theme: string;
    colors: any;
  }) => (
    <View style={styles.levelContainer}>
      <View style={styles.levelHeader}>
        <View>
          <Text
            style={[
              styles.levelNumber,
              {
                color: theme === "dark" ? "#ffffff44" : "#00000044",
              },
            ]}
            weight="bold"
          >
            {item.number}
          </Text>
          <Text
            style={[styles.levelLabel, { color: colors.primary }]}
            weight="bold"
          >
            LEVEL
          </Text>
        </View>
        <View style={styles.levelTitleContainer}>
          <Text weight="semiBold" style={styles.levelTitle}>
            Solving Equations
          </Text>
        </View>
      </View>

      <FlatList
        data={item.courses}
        keyExtractor={(course) => course.id}
        renderItem={({ item: course }) => (
          <CourseCard course={course} pathId={pathId} />
        )}
        removeClippedSubviews={true}
        maxToRenderPerBatch={4}
        windowSize={5}
      />
    </View>
  )
);

const Header = React.memo(({ path }: { path: LearningPathWithRelations }) => {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 14 }}>
      <HeaderImage
        imageUrl={path.imageUrl!}
        colorScheme={path.colorScheme}
        colors={colors}
      />

      <View style={styles.headerContent}>
        <Text
          style={[styles.headerTitle, { color: colors.text }]}
          weight="semiBold"
        >
          {path.title}
        </Text>
        <Text
          style={[styles.headerDescription, { color: colors.tertiaryText }]}
        >
          {path.description}
        </Text>
        <TouchableOpacity
          activeOpacity={0.65}
          style={[styles.actionButton, { backgroundColor: colors.mono }]}
        >
          <Text style={[styles.actionButtonText, { color: colors.monoText }]}>
            {path.isEnrolled ? "Resume path" : "Start Learning"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const CourseScreen = () => {
  const { pathId } = useLocalSearchParams();
  const { getPathById } = usePathStore();
  const { colors, theme } = useTheme();

  const path = useMemo(
    () => (pathId ? getPathById(pathId as string) : null),
    [pathId, getPathById]
  );

  const renderLevel = useCallback(
    ({ item }: { item: LevelWithRelations }) => (
      <LevelItem
        item={item}
        pathId={pathId as string}
        theme={theme}
        colors={colors}
      />
    ),
    [pathId, theme, colors]
  );

  if (!pathId || !path) {
    return (
      <ErrorState
        title={!pathId ? "Course Not Found" : "Learning Path Not Found"}
        message={
          !pathId
            ? "We couldn't find the course you're looking for. Please try again."
            : "The learning path you're looking for doesn't exist."
        }
        onBack={() => router.back()}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 4,
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeftIcon size={34} color={"#000"} />
        </TouchableOpacity>
      </View>
      <FlatList
        ListHeaderComponent={<Header path={path} />}
        data={path.levels}
        renderItem={renderLevel}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 16,
  },
  imageContainer: {
    position: "relative",
    height: 135,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  backdropImage: {
    width: "100%",
    height: 135,
    resizeMode: "cover",
    opacity: 0.22,
  },
  gradientOverlay: {
    width: "100%",
    height: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  gradientOverlayBottom: {
    width: "100%",
    height: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  courseImage: {
    width: 115,
    height: 115,
    resizeMode: "cover",
  },
  headerContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 32,
  },
  headerDescription: {
    fontSize: 16,
    marginTop: 4,
  },
  actionButton: {
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 100,
  },
  actionButtonText: {
    fontSize: 16,
    textAlign: "center",
  },
  levelContainer: {
    paddingTop: 16,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  levelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  levelNumber: {
    fontSize: 44,
  },
  levelLabel: {
    fontSize: 12,
    marginTop: -8,
  },
  levelTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  levelTitle: {
    fontSize: 22,
  },
  courseItem: {
    padding: 18,
    borderWidth: 1,
    borderBottomWidth: 5,
    borderColor: "#ddd",
    borderRadius: 24,
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  courseThumb: {
    width: 48,
    height: 48,
    resizeMode: "cover",
  },
  courseTitle: {
    fontSize: 16,
    width: 200,
  },
  separator: {
    height: 1,
    width: "70%",
    marginHorizontal: "auto",
  },
});

export default React.memo(CourseScreen);
