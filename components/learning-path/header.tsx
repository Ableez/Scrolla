import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Path, Rect } from "react-native-svg";

interface CourseCardProps {
  levels: number;
  courses: number;
  status?: "IN_PROGRESS" | "COMPLETED" | "NOT_STARTED";
  title: string;
  subtitle: string;
}

export default function CourseCard({
  levels = 5,
  courses = 9,
  status = "IN_PROGRESS",
  title = "Foundational Math",
  subtitle = "Master problem solving essentials in math",
}: CourseCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.courseInfo}>
            {levels} LEVELS • {courses} COURSES
          </Text>
          {status !== "NOT_STARTED" && (
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{status.replace("_", " ")}</Text>
            </View>
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
          <Path d="M50 15L85 70H15L50 15Z" fill="#3b82f6" opacity="0.8" />
          <Rect x="30" y="50" width="40" height="40" fill="#e5e7eb" />
          <Rect x="35" y="55" width="30" height="30" fill="#1f2937" />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 24,
    backgroundColor: "white",
    borderRadius: 12,
    gap: 24,
  },
  contentContainer: {
    flex: 1,
    gap: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseInfo: {
    fontSize: 12,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    backgroundColor: "#d1fae5",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#047857",
  },
  titleContainer: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
  iconContainer: {
    width: 96,
    height: 96,
  },
});
