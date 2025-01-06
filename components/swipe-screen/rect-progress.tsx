import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";

interface RectangleProgressProps {
  progress: number;
  width?: number;
  height?: number;
  borderRadius?: number;
}

const RectangleProgress: React.FC<RectangleProgressProps> = ({
  progress,
  width = 300,
  height = 20,
  borderRadius = 10,
}) => {
  const animatedProgress = useSharedValue(0);

  React.useEffect(() => {
    animatedProgress.value = withSpring(progress, {
      damping: 15,
      stiffness: 80,
    });
  }, [progress]);

  const progressStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animatedProgress.value,
      [0, 0.4, 0.7, 1],
      ["#FCD34D", "#F59E0B", "#34D399", "#10B981"]
    );

    return {
      width: `${animatedProgress.value * 100}%`,
      backgroundColor,
    };
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }]}>
      <Animated.View
        style={[styles.progress, { borderRadius }, progressStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
    width: "100%"
  },
  progress: {
    height: "100%",
  },
});

export default RectangleProgress;
