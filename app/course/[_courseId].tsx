import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { usePathStore } from "@/hooks/usePathsStore";
import ErrorState from "@/components/error-state";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, Dumbbell, LandPlot } from "lucide-react-native";
import useTheme from "@/hooks/useTheme";
import { ThemedView } from "@/components/ThemedView";
import { Course } from "@/types/learning";
import { FALLBACK_IMAGE_URL } from "@/constants/Var";

const Header = ({
  course,
  colorScheme,
}: {
  colorScheme: { s300: string; s500: string };
  course: Course;
}) => {
  const { colors } = useTheme();
  return (
    <View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeftIcon size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <View
          style={[
            styles.imageBackground,
            { backgroundColor: `${colorScheme.s300}22` },
          ]}
        >
          <Image
            source={require("../../assets/images/backdrop.png")}
            style={styles.backdropImage}
          />
          <View
            style={{
              backgroundColor: `${colorScheme.s300}88`,
              width: "100%",
              height: 20,
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          />
          <View
            style={{
              backgroundColor: `${colorScheme.s300}99`,
              width: "100%",
              height: 10,
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          />
        </View>
        <Image
          source={{ uri: course.imageUrl ?? FALLBACK_IMAGE_URL }}
          style={styles.courseImage}
        />
      </View>

      <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
        <Text style={{ color: colors.text, fontSize: 32, fontWeight: "bold" }}>
          {course.title}
        </Text>
        <Text
          style={{
            color: colors.tertiaryText,
            fontSize: 16,
            marginTop: 4,
          }}
        >
          We will tell you all you need to know about this course here.
        </Text>
      </View>
    </View>
  );
};

const CourseInformation = () => {
  const { _courseId } = useLocalSearchParams();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { getCourseById, getPathById } = usePathStore();

  const [courseId, pathId] = String(_courseId).split("__");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [courseId]);

  if (!courseId) {
    return (
      <ErrorState
        message="Course not found"
        title="Course Not Found"
        onBack={() => router.back()}
      />
    );
  }

  const course = getCourseById(courseId, {
    with: {
      levels: true,
    },
  });
  const path = getPathById(pathId);

  return (
    <SafeAreaView>
      <ThemedView>
        <View style={{ paddingHorizontal: 16, paddingVertical: 4 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeftIcon color={colors.text} size={28} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: 16,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ maxWidth: "80%" }}>
              <Text
                style={{
                  textTransform: "uppercase",
                  fontWeight: "700",
                  color: `${path?.colorScheme?.s500}`,
                }}
              >
                {path?.title} &bull; Level {path?.currentLevelNumber}
              </Text>
              <Text
                style={{
                  textTransform: "uppercase",
                  fontWeight: "800",
                  fontSize: 20,
                }}
              >
                {course?.level?.number}.{course?.courseNumber} {course?.title}
              </Text>
            </View>
            <Image
              source={{ uri: course?.imageUrl ?? FALLBACK_IMAGE_URL }}
              style={{ width: 62, height: 62 }}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              gap: 18,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <LandPlot size={18} strokeWidth={2.3} color={colors.text} />
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                12 Lessons
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Dumbbell size={18} strokeWidth={2.3} color={colors.text} />
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                12 Lessons
              </Text>
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

export default CourseInformation;

const styles = StyleSheet.create({
  courseImage: {
    width: 115,
    height: 115,
    resizeMode: "cover",
  },
  imageContainer: {
    position: "relative",
    height: 135,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  backdropImage: {
    width: "100%",
    height: 135,
    resizeMode: "cover",
    opacity: 0.22,
  },
});
