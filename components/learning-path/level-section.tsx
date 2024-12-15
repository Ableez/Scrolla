import React from "react";
import { View, Dimensions, Text } from "react-native";
import { CourseCard } from "./course-card";
import { ThemedText } from "../ThemedText";
import type { Course, Level } from "@/_mock_/type";

interface LevelSectionProps {
  levelNumber: number;
  courses: Course[];
  pathId: string;
}

export const LevelSection: React.FC<LevelSectionProps> = ({
  levelNumber,
  courses,
  pathId,
}) => {
  return (
    <View
      style={{
        marginBottom: 24,
        paddingHorizontal: 24,
        width: Dimensions.get("window").width,
      }}
    >
      <ThemedText
        style={{
          fontSize: 12,
          fontWeight: "800",
          color: "#007eed",
          marginBottom: 16,
        }}
      >
        Level {levelNumber}
      </ThemedText>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {courses.map((item) => {
          return <CourseCard key={item.id} course={item} pathId={pathId} />;
        })}
      </View>
    </View>
  );
};
