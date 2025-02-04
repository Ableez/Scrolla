import { LevelWithRelations } from "#/server/schema.types";
import { View } from "react-native";
import React, { memo } from "react";
import Text from "../text";
import LevelLessons from "./level-item-lessons";
import { usePathscreenStyles } from "#/hooks/use-pathscreen-styles";

const LevelItem = memo(
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
  }) => {
    const styles = usePathscreenStyles();

    return (
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

        <LevelLessons item={item} pathId={pathId} />
      </View>
    );
  }
);

export default LevelItem;
