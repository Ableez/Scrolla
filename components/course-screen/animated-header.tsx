import React, { useRef } from "react";
import { View, Animated, StyleSheet, Dimensions, Image } from "react-native";
import { GraduationCap, Dumbbell } from "lucide-react-native";
import Text from "@/components/text";
import { FALLBACK_IMAGE_URL } from "@/constants/Var";
import { primaryColor } from "@/constants/Colors";
import {
  CourseWithRelations,
  LearningPathWithRelations,
} from "@/server/schema.types";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 100;
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function AnimatedHeader({
  course,
  path,
}: Readonly<{
  course: CourseWithRelations;
  path: LearningPathWithRelations;
}>) {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Animation interpolations
  const headerHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  const titleTranslateX = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [0, Dimensions.get("window").width / 4],
    extrapolate: "clamp",
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [0, -20],
    extrapolate: "clamp",
  });

  const progressBarWidth = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: ["100%", "60%"],
    extrapolate: "clamp",
  });

  const infoRowOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <View style={styles.titleContainer}>
        <Animated.View
          style={{
            transform: [
              { scale: titleScale },
              { translateX: titleTranslateX },
              { translateY: titleTranslateY },
            ],
          }}
        >
          <Text
            weight="semiBold"
            style={[styles.label, { textTransform: "uppercase" }]}
          >
            {path?.title}
          </Text>
          <Text weight="semiBold" style={styles.title}>
            {course?.title}
          </Text>
        </Animated.View>

        <Animated.View style={{ opacity: imageOpacity }}>
          <Image
            source={{ uri: course?.imageUrl ?? FALLBACK_IMAGE_URL }}
            style={{ width: 72, height: 72 }}
          />
        </Animated.View>
      </View>

      <Animated.View
        style={{
          marginBottom: 16,
          marginTop: 8,
          width: progressBarWidth,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#eee",
            width: "100%",
            height: 10,
            borderRadius: 100,
          }}
        >
          <View
            style={{
              backgroundColor: primaryColor,
              width: "10%",
              height: 10,
              borderRadius: 100,
            }}
          />
        </View>
      </Animated.View>

      <Animated.View style={[styles.infoRow, { opacity: infoRowOpacity }]}>
        <View style={styles.infoItem}>
          <GraduationCap size={24} color="#333" />
          <Text style={styles.infoText}>2 Levels</Text>
        </View>
        <View style={styles.infoItem}>
          <Dumbbell size={20} color="#333" />
          <Text style={styles.infoText}>8 exercises</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    overflow: "hidden",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: "#333",
  },
  title: {
    fontSize: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
});
