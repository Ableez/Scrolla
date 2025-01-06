import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedProps,
  withTiming,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircleProgressProps {
  size?: number;
  strokeWidth?: number;
  progress: number;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  size = 100,
  strokeWidth = 10,
  progress,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const animatedProgress = useSharedValue(0);

  React.useEffect(() => {
    animatedProgress.value = withSpring(progress, {
      damping: 15,
      stiffness: 80,
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference - circumference * animatedProgress.value;
    const color = interpolateColor(
      animatedProgress.value,
      [0, 0.4, 0.7, 1],
      ["#FCD34D", "#F59E0B", "#34D399", "#10B981"]
    );

    return {
      strokeDashoffset: withTiming(strokeDashoffset, { duration: 750 }),
      stroke: color,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  svg: {
    transform: [{ rotateZ: "0deg" }],
  },
});

export default CircleProgress;
