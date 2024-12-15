import { primaryColor } from "@/constants/Colors";
import useTheme from "@/hooks/useTheme";
import React from "react";
import { View, Image, Text } from "react-native";

const CourseHeader = ({
  courseData,
  pathData,
}: {
  courseData: any;
  pathData: any;
}) => {
  const { colors } = useTheme();
  return (
    <View style={{ paddingHorizontal: 8, marginBottom: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <View style={{ paddingVertical: 16, flex: 1 }}>
          <Text
            style={{
              color: pathData?.colorScheme.s500,
              fontWeight: "700",
              textTransform: "uppercase",
              fontSize: 11,
            }}
          >
            {pathData?.title} &bull; LEVEL {courseData?.level?.number}
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "700" }}>
            {courseData?.title}
          </Text>
        </View>
        <Image
          style={{ width: 85, height: 85 }}
          source={{ uri: courseData?.imageUrl }}
        />
      </View>

      <View
        style={{
          backgroundColor: colors.secondaryBackground,
          borderRadius: 100,
          width: "100%",
          height: 8,
          marginBlock: 16,
        }}
      >
        <View
          style={{
            backgroundColor: primaryColor,
            width: "40%",
            height: 8,
            borderRadius: 100,
          }}
        />
      </View>

      <Text style={{ fontSize: 16, color: colors.tertiaryText }}>
        {courseData?.learningPath?.description}
      </Text>
    </View>
  );
};

export default CourseHeader;
