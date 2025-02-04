import { LevelWithRelations } from "#/server/schema.types";
import { FlashList } from "@shopify/flash-list";
import { memo } from "react";
import { View } from "react-native";
import CourseCard from "./course-card";

const LevelLessons = memo(
  ({ item, pathId }: { item: LevelWithRelations; pathId: string }) => (
    <FlashList
      renderToHardwareTextureAndroid
      data={item.courses}
      keyExtractor={(course) => course.id}
      renderItem={({ index, item: course }) => (
        <View>
          <CourseCard course={course} pathId={pathId} />
          {index !== 1 && index % 2 === 0 ? (
            <View
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: 4,
                  height: 30,
                  backgroundColor: "#eee",
                  borderRadius: 100,
                }}
              ></View>
            </View>
          ) : null}
        </View>
      )}
      removeClippedSubviews={true}
      estimatedItemSize={50}
    />
  )
);

export default LevelLessons;
