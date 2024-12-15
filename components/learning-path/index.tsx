import React from "react";
import { View } from "react-native";
import useTheme from "@/hooks/useTheme";
import { LearningPath } from "@/_mock_/learning-path-data";
import { LearningPathHeader } from "./learning-path-header";
import { LevelSection } from "./level-section";
import { ThemedView } from "../ThemedView";
import CourseCard from "./header";

interface LearningPathCompProps {
  learningPath: LearningPath;
}

const LearningPathComp: React.FC<LearningPathCompProps> = ({
  learningPath,
}) => {
  const { colors } = useTheme();

  return (
    <ThemedView>
      <LearningPathHeader path={learningPath} />
      {learningPath.levels.map((level) => (
        <LevelSection key={level.id} level={level} />
      ))}
    </ThemedView>
  );
};

export default LearningPathComp;
