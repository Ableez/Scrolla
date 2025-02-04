import React, { memo } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import Text from "#/components/text";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 64;

interface CardProps {
  item: string;
  index: number;
  animatedValue: Animated.Value;
  totalCards: number;
}

const Card = memo(({ item, index, animatedValue, totalCards }: CardProps) => {
  const rotate = animatedValue.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ["-30deg", "0deg", "30deg"],
    extrapolate: "clamp",
  });

  const opacity = animatedValue.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [0.5, 1, 0.5],
    extrapolate: "clamp",
  });

  const scale = animatedValue.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [0.8, 1, 0.8],
    extrapolate: "clamp",
  });

  const translateY = animatedValue.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [30, 0, 30],
    extrapolate: "clamp",
  });

  // Add flip animation
  const flipRotation = animatedValue.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ["180deg", "0deg", "-180deg"],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [
            { translateX: animatedValue },
            { rotate },
            { scale },
            { translateY },
          ],
          opacity,
          zIndex: totalCards - index,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.card,
          styles.cardFront,
          {
            transform: [{ rotateY: flipRotation }],
            backfaceVisibility: "hidden",
          },
        ]}
      >
        <Text>Front: {item}</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          {
            transform: [{ rotateY: "180deg" }, { rotateY: flipRotation }],
            backfaceVisibility: "hidden",
          },
        ]}
      >
        <Text>Back: {item}</Text>
      </Animated.View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: 400,
    position: "absolute",
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    padding: 16,
    position: "absolute",
    shadowColor: "#00000066",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  cardFront: {
    backgroundColor: "#ebebeb",
  },
  cardBack: {
    backgroundColor: "#d4d4d4",
  },
});

export default Card;
