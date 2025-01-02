import React, { useCallback } from "react";
import { TouchableOpacity, Animated, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import Text from "../text";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CourseCard = React.memo(
  ({ course, pathId }: { course: any; pathId: string }) => {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        useNativeDriver: true,
        tension: 12,
        friction: 3,
      }).start();
    }, []);

    const handlePressOut = useCallback(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 10,
        friction: 3,
      }).start();
    }, []);

    return (
      <AnimatedTouchable
        activeOpacity={0.8}
        onPress={() => console.log("Pressed", course.id)}
        // onPress={() => router.push(`/course/${course.id}__${pathId}`)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.courseItem, { transform: [{ scale: scaleAnim }] }]}
      >
        <Image
          source={{
            uri: course.imageUrl ?? "https://github.com/shadcn.png",
          }}
          style={styles.courseThumb}
        />
        <Text style={styles.courseTitle}>{course.title}</Text>
      </AnimatedTouchable>
    );
  }
);

const styles = StyleSheet.create({
  courseItem: {
    backgroundColor: "white",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#00000011",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    display: "flex",
    flexDirection: "row",
    padding: 16,
    borderWidth: 1,
    borderBottomWidth: 5,
    borderColor: "#ddd",
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  courseThumb: {
    width: 50,
    height: 50,
  },
  courseTitle: {
    fontSize: 16,
    padding: 12,
    color: "#333",
  },
});

export default CourseCard;
