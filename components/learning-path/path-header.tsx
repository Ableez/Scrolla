import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface CourseCardProps {
  levels: number;
  courses: number;
  isEnrolled: boolean;
  title: string;
  description: string;
  pathImage: string;
}

export default function PathHeader({
  levels = 5,
  courses = 9,
  isEnrolled = false,
  title = "Foundational Math",
  description = "Master problem solving essentials in math",
  pathImage,
}: Readonly<CourseCardProps>) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.courseInfo}>
          {levels} LEVELS • {courses} COURSES
        </Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <View>
        {isEnrolled ? (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {isEnrolled ? "IN PROGRESS" : "NOT STARTED"}
            </Text>
          </View>
        ) : null}
        <Image source={{ uri: pathImage }} style={{ width: 85, height: 85 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 24,
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
    borderWidth: 1,
    borderColor: "#333",
  },
  courseInfo: {
    fontSize: 12,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: "700",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    backgroundColor: "#d1fae5",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#248A3D",
  },
  titleContainer: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#6b7280",
  },
  iconContainer: {
    width: 96,
    height: 96,
  },
});
