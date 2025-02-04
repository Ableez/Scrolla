import React, { useRef, useCallback } from "react";
import {
  Animated,
  Pressable,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import useTheme from "#/hooks/useTheme";
import { Badge } from "./badge";
import { ThemedText } from "../ThemedText";
import { router } from "expo-router";
import type { Course } from "#/_mock_/type";

interface CourseCardProps {
  course: Course;
  pathId: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, pathId }) => {
  const { theme, colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 5,
    }).start();
  }, []);

  const onPressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 5,
    }).start();
  }, []);

  return (
    <Pressable
      onPress={() => {
        router.push(`/course/${course.id}__${pathId}`);
      }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            borderColor: theme === "dark" ? colors.border : "#dddddd88",
            transform: [{ scale: scaleAnim }],
            height: course.isUpdated ? 116 : 108,
          },
        ]}
      >
        <Image
          style={{ width: 72, height: 72 }}
          source={{ uri: course.imageUrl }}
        />
        <ThemedText style={styles.title}>{course.title}</ThemedText>
        {course.isUpdated && <Badge text="UPDATED" variant="update" />}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderBottomWidth: 6,
    flexDirection: "row",
    gap: 16,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 54,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "left",
    width: "80%",
  },
});
