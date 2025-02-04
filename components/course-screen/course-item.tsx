import useTheme from "#/hooks/useTheme";
import React from "react";
import { View, Image, Text } from "react-native";

const CourseItem = ({
  item,
  courseImageUrl,
}: {
  item: string;
  courseImageUrl: string;
}) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        padding: 12,
        zIndex: 2,
        overflow: "visible",
        transform: "scale(0.92)",
      }}
    >
      <View
        style={{
          height: 150,
          width: "100%",
          backgroundColor: colors.secondaryBackground,
          borderRadius: 16,
          borderWidth: 1,
          borderBottomWidth: 6,
          borderColor: "#ddd",
          justifyContent: "center",
          alignItems: "center",
          padding: 8,
          gap: 8,
          zIndex: 2,
        }}
      >
        <Image
          source={{ uri: courseImageUrl }}
          style={{ width: 60, height: 60 }}
        />
        <Text
          style={{
            textTransform: "capitalize",
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          {item.replace("-", " ")}
        </Text>
      </View>
    </View>
  );
};

export default CourseItem;
