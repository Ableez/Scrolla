import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect } from "react";
import useTheme from "@/hooks/useTheme";
import { Platform } from "react-native";

const Button = ({
  title,
  variant = "outline",
}: {
  title: string;
  variant: "default" | "outline" | "ghost";
}) => {
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shiftYAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(4.5)).current;

  const animatePress = (pressed: boolean) => {
    Animated.parallel([
      Animated.spring(shiftYAnim, {
        toValue: pressed ? 4 : 0,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: pressed ? 0.99 : 1,
        useNativeDriver: true,
      }),
      Animated.spring(opacityAnim, {
        toValue: pressed ? 0.8 : 1,
        useNativeDriver: true,
      }),
      Animated.spring(borderAnim, {
        toValue: pressed ? 1.5 : 4.5,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Pressable
      onPressIn={() => animatePress(true)}
      onPressOut={() => animatePress(false)}
    >
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }, { translateY: shiftYAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.button,
            {
              ...(variant === "outline" && {
                borderWidth: 1.5,
                borderColor: colors.border,
                borderBottomWidth: borderAnim,
                transformOrigin: "top",
              }),
            },
          ]}
        >
          <Animated.Text style={[styles.text]}>{title}</Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  button: {
    padding: 14,
    borderRadius: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default Button;
