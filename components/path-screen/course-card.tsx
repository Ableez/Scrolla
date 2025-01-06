import React from "react";
import { Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import Text from "../text";
import BouncyButton from "../bouncy-button";

const CourseCard = React.memo(
  ({ course, pathId }: { course: any; pathId: string }) => {
    return (
      <BouncyButton
        activeOpacity={0.8}
        // onPress={() => console.log("Pressed", course.id)}
        onPress={() => router.push(`/course/${course.id}__${pathId}`)}
        style={[styles.courseItem]}
      >
        <Image
          source={{
            uri: course.imageUrl ?? "https://github.com/shadcn.png",
          }}
          style={styles.courseThumb}
        />
        <Text style={styles.courseTitle}>{course.title}</Text>
      </BouncyButton>
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
