import React, { useCallback, useMemo } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "lucide-react-native";
import ErrorState from "#/components/error-state";
import useTheme from "#/hooks/useTheme";
import { LevelWithRelations } from "#/server/schema.types";
import { usePathStore } from "#/hooks/usePathsStore";
import { FlashList } from "@shopify/flash-list";
import { usePathscreenStyles } from "#/hooks/use-pathscreen-styles";
import LevelItem from "#/components/path-screen/level-item";
import Header from "#/components/path-screen/header";

const CourseScreen = () => {
  const { pathId } = useLocalSearchParams();
  const { getPathById } = usePathStore();
  const { colors, theme } = useTheme();
  const styles = usePathscreenStyles();

  const path = useMemo(
    () => (pathId ? getPathById(pathId as string) : null),
    [pathId, getPathById]
  );

  const renderLevel = ({ item }: { item: LevelWithRelations }) => (
    <LevelItem
      item={item}
      pathId={pathId as string}
      theme={theme}
      colors={colors}
    />
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
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeftIcon size={34} color={"#000"} />
        </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={<Header path={path} />}
        data={path.levels}
        renderItem={(item) => renderLevel(item)}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        bouncesZoom={true}
        bounces={true}
        keyExtractor={(item) => item.id}
        getItemLayout={() => ({ length: 600, offset: 100, index: 1 })}
      />
    </SafeAreaView>
  );
};

export default React.memo(CourseScreen);
