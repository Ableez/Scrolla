import React from "react";
import { View, FlatList, Text } from "react-native";
import { LevelSection } from "./learning-path/level-section";
import PathHeader from "./learning-path/path-header";
import type { LearningPath, Level } from "#/_mock_/type";

interface LearningPathCompProps {
  learningPath: LearningPath;
}

const LearningPathComp: React.FC<LearningPathCompProps> = ({
  learningPath,
}) => {
  const renderItem = ({ item }: { item: Level }) => {
    return (
      <LevelSection
        pathId={learningPath.id}
        levelNumber={item.number}
        courses={item.courses}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        marginBottom: 16,
      }}
    >
      {/* <PathHeader
        courses={learningPath.levels.length}
        isEnrolled={learningPath.isEnrolled}
        levels={learningPath.levels.length}
        description={learningPath.description}
        title={learningPath.title}
        pathImage={learningPath.imageUrl}
      />
      <FlatList
        data={learningPath.levels}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.number}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      /> */}
    </View>
  );
};

export default LearningPathComp;
