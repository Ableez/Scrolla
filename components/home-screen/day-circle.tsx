import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, useColorScheme } from "react-native";
import Text from "#/components/text";
import { primaryColor, secondaryColor } from "#/constants/Colors";
import Svg, { Path } from "react-native-svg";

interface DayCircleProps {
  day: string;
  isActive: boolean;
}

const DayCircle = ({ day, isActive }: DayCircleProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.spring(scaleAnim, {
            toValue: 1.05,
            useNativeDriver: true,
            friction: 1,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 1,
          }),
        ])
      ).start();
    } else {
      scaleAnim.setValue(1);
    }

    return () => {
      scaleAnim.stopAnimation();
    };
  }, [isActive]);

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleAnim }],
            backgroundColor: isActive
              ? secondaryColor
              : isDarkMode
              ? "#1E293B"
              : "#FFFFFF",
            borderWidth: isActive ? 2 : 0,
            borderColor: isActive ? secondaryColor + "66" : "#00000000",
          },
        ]}
      >
        <Text style={[styles.dayText, isActive && styles.activeText]}>
          <Svg
            width="29"
            height="29"
            viewBox="0 0 24 24"
            fill={
              isActive
                ? isDarkMode
                  ? "#000"
                  : "#000"
                : isDarkMode
                ? "#94A3B8"
                : "#bbb"
            }
          >
            <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <Path d="M13 2l.018 .001l.016 .001l.083 .005l.011 .002h.011l.038 .009l.052 .008l.016 .006l.011 .001l.029 .011l.052 .014l.019 .009l.015 .004l.028 .014l.04 .017l.021 .012l.022 .01l.023 .015l.031 .017l.034 .024l.018 .011l.013 .012l.024 .017l.038 .034l.022 .017l.008 .01l.014 .012l.036 .041l.026 .027l.006 .009c.12 .147 .196 .322 .218 .513l.001 .012l.002 .041l.004 .064v6h5a1 1 0 0 1 .868 1.497l-.06 .091l-8 11c-.568 .783 -1.808 .38 -1.808 -.588v-6h-5a1 1 0 0 1 -.868 -1.497l.06 -.091l8 -11l.01 -.013l.018 -.024l.033 -.038l.018 -.022l.009 -.008l.013 -.014l.04 -.036l.028 -.026l.008 -.006a1 1 0 0 1 .402 -.199l.011 -.001l.027 -.005l.074 -.013l.011 -.001l.041 -.002z" />
          </Svg>
        </Text>
      </Animated.View>
      <Text
        weight="semiBold"
        style={{
          color: isActive
            ? isDarkMode
              ? "#fff"
              : "#000"
            : isDarkMode
            ? "#94A3B8"
            : "#888",
          fontSize: 14,
          marginTop: 6,
        }}
      >
        {day}
      </Text>
    </View>
  );
};

const DaysRow = () => {
  const allDays = ["Su", "M", "T", "W", "Th", "F", "S"];
  const today = new Date().getDay();

  // Calculate indices for the four days including today
  const startIndex = today;
  const endIndex = (startIndex + 4) % 7;

  const reorderedDays =
    endIndex > startIndex
      ? allDays.slice(startIndex, endIndex + 1)
      : [...allDays.slice(startIndex), ...allDays.slice(0, endIndex + 1)];

  return (
    <View style={styles.row}>
      {reorderedDays.map((day, index) => (
        <DayCircle key={index} day={day} isActive={index === 0} /> // Use index as key
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  dayText: {
    fontSize: 18,
    color: "#374151",
  },
  activeText: {
    color: "white",
  },
});

export default DaysRow;
