import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LearningPathComp from "@/components/home-learning-path-comp";
import { LinearGradient } from "expo-linear-gradient";
import useTheme from "@/hooks/useTheme";
import { usePathStore } from "@/hooks/usePathsStore";
import ErrorState from "@/components/error-state";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";

const Courses = () => {
  const { colors } = useTheme();
  const { learningPaths, fetchLearningPaths } = usePathStore();

  useEffect(() => {
    void fetchLearningPaths({ includeDetails: true });
  }, [fetchLearningPaths]);

  if (learningPaths.isLoading) {
    return (
      <View
        style={{
          height: Dimensions.get("screen").height,
          width: Dimensions.get("screen").width,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (learningPaths.error) {
    return (
      <ErrorState
        message="There was an error fetching the learning paths. Please try again later."
        onBack={() => router.back()}
        title="Learning Paths Error"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={{ backgroundColor: colors.background, paddingBottom: 34 }}>
        <LinearGradient
          colors={["#007eed22", "transparent"]}
          style={{
            height: 150,
            width: Dimensions.get("screen").width,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Image
            source={require("../../assets/images/backdrop.png")}
            style={styles.image}
          />
        </LinearGradient>
        <ScrollView style={{ position: "relative" }}>
          <FlashList
            data={learningPaths.data}
            renderItem={({ item }) => (
              <LearningPathComp key={item.id} learningPath={item} />
            )}
            estimatedItemSize={100}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    opacity: 0.22,
  },
});

export default Courses;
