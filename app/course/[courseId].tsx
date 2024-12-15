import React, { useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import ErrorState from "@/components/error-state";
import { usePathStore } from "@/hooks/usePathsStore";
import { MasonryFlashList } from "@shopify/flash-list";
import CourseItem from "@/components/course-screen/course-item";
import { course_item_placeholder } from "@/_mock_/data";
import CourseHeader from "@/components/course-screen/header";

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 46,
        width: "100%",
        justifyContent: "center",
        position: "absolute",
      }}
    >
      <View
        style={{
          height: "100%",
          width: 3,
          backgroundColor: "#ddd",
          borderRadius: 16,
          bottom: `50%`,
          left: "50%",
        }}
      />
    </View>
  );
};

const CourseScreen = () => {
  const { courseId } = useLocalSearchParams();
  const navigation = useNavigation();
  const { getPathById, learningPaths, getCourseById } = usePathStore();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [courseId]);

  if (!courseId) {
    return (
      <ErrorState
        title="Course Not Found"
        message="We couldn't find the course you're looking for. Please try again."
        onBack={() => router.back()}
      />
    );
  }

  const [course, pathId] = (courseId as string).split("__");
  const courseData = getCourseById(pathId, course, {
    with: {
      levels: true,
      path: true,
    },
  });
  const pathData = getPathById(pathId);

  if (!learningPaths) {
    return (
      <ErrorState
        title="Learning Path Not Found"
        message="The learning path you're looking for doesn't exist."
        onBack={() => router.back()}
      />
    );
  }

  return (
    <View style={{ height: Dimensions.get("window").height }}>
      <View style={{ paddingHorizontal: 16 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <FontAwesome6 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, gap: 16 }}>
        <MasonryFlashList
          data={course_item_placeholder}
          renderItem={({ item }) => (
            <CourseItem
              item={item}
              courseImageUrl={courseData?.imageUrl ?? ""}
            />
          )}
          keyExtractor={(item) => item}
          estimatedItemSize={100}
          contentContainerStyle={{
            paddingRight: 16,
            paddingLeft: 16,
          }}
          style={{
            borderWidth: 2,
            borderColor: "#004eed",
          }}
          ItemSeparatorComponent={renderSeparator}
          ListHeaderComponent={
            <CourseHeader courseData={courseData} pathData={pathData} />
          }
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 24,
    marginBottom: 8,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});

export default CourseScreen;
