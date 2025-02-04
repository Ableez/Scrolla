import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import { ChevronLeft, Dumbbell, GraduationCap } from "lucide-react-native";
import { primaryColor } from "#/constants/Colors";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { usePathStore } from "#/hooks/usePathsStore";
import ErrorState from "#/components/error-state";
import Text from "#/components/text";
import { CourseWithRelations } from "#/server/schema.types";
import { root } from "#/server/root";
import { FlashList } from "@shopify/flash-list";
import LessonNode from "#/components/course-screen/lesson-node";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "#/components/drawer";
import { FALLBACK_IMAGE_URL } from "#/constants/Var";

export default function MorseLesson() {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(10);
  const [courseData, setCourseData] = useState<CourseWithRelations | null>(
    null
  );
  const [isFetching, setIsFetching] = useState(false);
  const { _courseId } = useLocalSearchParams();
  const navigation = useNavigation();
  const { getCourseById, getPathById } = usePathStore();
  const [courseId, pathId] = String(_courseId).split("__");

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openDrawer = () => {
    bottomSheetRef.current?.present();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const course = await root.learning.getCourseById(String(courseId));

        console.log("COURSE", JSON.stringify(course));

        setCourseData(course);
      } catch (error) {
        console.error("Error fetching course data", error);
        return null;
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [courseId]);

  const course = getCourseById(courseId, {
    with: {
      levels: true,
    },
  });
  const path = getPathById(pathId);

  useEffect(() => {
    // Animate content on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (!courseId) {
    return (
      <ErrorState
        message="Course not found"
        title="Course Not Found"
        onBack={() => router.back()}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>

        <Drawer>
          <DrawerTrigger>
            <Svg width="29" height="29" viewBox="0 0 24 24" fill={"#ccc"}>
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M13 2l.018 .001l.016 .001l.083 .005l.011 .002h.011l.038 .009l.052 .008l.016 .006l.011 .001l.029 .011l.052 .014l.019 .009l.015 .004l.028 .014l.04 .017l.021 .012l.022 .01l.023 .015l.031 .017l.034 .024l.018 .011l.013 .012l.024 .017l.038 .034l.022 .017l.008 .01l.014 .012l.036 .041l.026 .027l.006 .009c.12 .147 .196 .322 .218 .513l.001 .012l.002 .041l.004 .064v6h5a1 1 0 0 1 .868 1.497l-.06 .091l-8 11c-.568 .783 -1.808 .38 -1.808 -.588v-6h-5a1 1 0 0 1 -.868 -1.497l.06 -.091l8 -11l.01 -.013l.018 -.024l.033 -.038l.018 -.022l.009 -.008l.013 -.014l.04 -.036l.028 -.026l.008 -.006a1 1 0 0 1 .402 -.199l.011 -.001l.027 -.005l.074 -.013l.011 -.001l.041 -.002z" />
            </Svg>
          </DrawerTrigger>
          <DrawerContent>
            <View>
              <Text>Hello</Text>
            </View>
          </DrawerContent>
        </Drawer>
      </View>

      {/* Content */}
      {/* header shrinks to this on scroll */}
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 40,
            width: "100%",
            paddingHorizontal: 20,
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: 0.95 },
              { translateX: 0.5 },
            ],
            zIndex: 10,
          },
        ]}
      >
        <View
          style={[
            styles.titleContainer,
            {
              marginBottom: 10,
            },
          ]}
        >
          <View
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              weight="semiBold"
              style={[
                styles.label,
                {
                  textTransform: "uppercase",
                  textAlign: "center",
                  width: "100%",
                },
              ]}
            >
              {path?.title}
            </Text>

            <Text weight="semiBold" style={styles.title}>
              {course?.title}
            </Text>
          </View>
          {/* <Image
            source={{ uri: course?.imageUrl ?? FALLBACK_IMAGE_URL }}
            width={72}
            height={72}
          /> */}
        </View>

        <View
          style={{
            marginBottom: 0,
            marginTop: 0,
            width: "60%",
            marginInline: "auto",
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
            ></View>
          </View>
        </View>
        <View style={[styles.infoRow, { display: "none" }]}>
          <View style={styles.infoItem}>
            <GraduationCap size={24} color="#333" />
            <Text style={styles.infoText}>{course?.courseNumber} Levels</Text>
          </View>
          <View style={styles.infoItem}>
            <Dumbbell size={20} color="#333" />
            <Text style={styles.infoText}>8 exercises</Text>
          </View>
        </View>
      </Animated.View>
      <LinearGradient
        colors={["#fff", "#fff", "rgba(255, 255, 255, 0)"]}
        style={{
          zIndex: 11,
          height: 80,
          position: "absolute",
          top: 105,
          left: 0,
          width: "100%",
        }}
      />

      {/* initial header */}
      <View style={{ height: 20 }} />
      <Text>Hello im here</Text>

      {isFetching ? (
        <ActivityIndicator color={"#000"} size="large" />
      ) : (
        <View style={{ height: Dimensions.get("screen").height - 120 }}>
          <FlashList
            data={[]}
            renderItem={({ item, index }) => (
              <LessonNode item={item} index={index} />
            )}
            estimatedItemSize={100}
            contentContainerStyle={{ paddingTop: 60 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 32,
    zIndex: 12,
    paddingVertical: 4,
  },
  content: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 12,
    color: "#333",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
  },
  MorseBadge: {
    backgroundColor: primaryColor,
    borderRadius: 12,
    padding: 8,
    marginLeft: 16,
  },
  morseText: {
    color: "#fff",
    fontSize: 18,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
    lineHeight: 26,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
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
  button: {
    backgroundColor: primaryColor,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  bookmarkButton: {
    position: "absolute",
    right: 20,
    bottom: -60,
  },
});
