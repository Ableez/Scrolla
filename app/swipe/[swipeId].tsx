import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { router, useNavigation } from "expo-router";
import { Image } from "expo-image";
import { XIcon } from "lucide-react-native";
import Text from "@/components/text";
import Katex from "react-native-katex";
import {
  CardContentType,
  CardContent,
} from "@/components/swipe-screen/content-card";

const inlineStyle = `
html, body {
  display: flex;
  background-color: #000;
  justify-content: center;
  align-items: center;
  height: 10%;
  margin: 20;
  padding: 0;
}
.katex {
  font-size: 4em;
  margin: 0;
  display: flex;
}
`;

// const cardContent: CardContentType[] = [
//   {
//     id: "lesson-1-card-1",
//     elements: [
//       {
//         type: "text",
//         variant: "h2",
//         content: "What is X?",
//       },
//       {
//         type: "text",
//         variant: "body",
//         content:
//           '"X" is a number we don’t know yet. We need to find it by solving the problem. Think of it like a puzzle!',
//       },
//       {
//         type: "image",
//         uri: "https://ds055uzetaobb.cloudfront.net/brioche/chapter/science-puzzles-long-set-qYZNE6.png", // Replace with a relevant image.
//       },
//       {
//         type: "text",
//         variant: "body",
//         content:
//           `Let's see a realworld example.`,
//       },
//     ],
//   },
//   {
//     id: "lesson-1-card-2",
//     elements: [
//       {
//         type: "text",
//         variant: "h2",
//         content: "Real-Life Example",
//       },
//       {
//         type: "text",
//         variant: "body",
//         content:
//           "You have 10 candies and want to share them equally with a friend. How many candies does each person get?",
//       },
//       {
//         type: "image",
//         uri: "https://ds055uzetaobb.cloudfront.net/brioche/chapter/graphing-and-modeling-R2ewSf.png", // Replace with a relevant image.
//       },
//     ],
//   },
//   {
//     id: "lesson-1-card-3",
//     elements: [
//       {
//         type: "text",
//         variant: "h2",
//         content: "The Math Problem",
//       },
//       {
//         type: "text",
//         variant: "body",
//         content:
//           "Let’s write this as a math problem: If you divide the candies between 2 people, each person gets 5 candies.",
//       },
//       {
//         type: "expression",
//         latex: "\\frac{x}{2} = 5",
//       },
//     ],
//   },
//   {
//     id: "lesson-1-card-4",
//     elements: [
//       {
//         type: "text",
//         variant: "h2",
//         content: "How Do We Solve This?",
//       },
//       {
//         type: "text",
//         variant: "body",
//         content:
//           "To find x, we do the opposite of dividing by 2: we multiply both sides by 2.",
//       },
//       {
//         type: "expression",
//         latex: "x = 5 \\times 2",
//       },
//     ],
//   },
//   {
//     id: "lesson-1-card-5",
//     elements: [
//       {
//         type: "text",
//         variant: "h2",
//         content: "The Answer",
//       },
//       {
//         type: "text",
//         variant: "body",
//         content: "So, x = 10! Each person gets 10 candies.",
//       },
//       {
//         type: "options",
//         choices: ["5", "10", "15", "20"],
//         correctAnswer: 1, // '10'
//       },
//     ],
//   },
// ];

const cardContent: CardContentType[] = [
  {
    id: "lesson-1-card-1",
    elements: [
      {
        type: "text",
        content: "Seeing Solutions",
        variant: "h2",
      },
      {
        type: "text",
        content:
          "Equations are used to relate quantities. Sometimes, there's more than one value that can vary.",
        variant: "body",
      },
      {
        type: "text",
        content: "We can visualize the equation",
        variant: "body",
      },
      {
        type: "expression",
        latex: "x = \\frac{1}{2}",
        displayMode: "block",
      },
      {
        type: "text",
        content:
          "by drawing two bar models. The equation tells us that the two bars are equal, so they should have the same length.",
        variant: "body",
      },
      {
        type: "image",
        uri: "https://utfs.io/f/wGHSFKxTYo2ek0WeNBoq9FwpAxBP1unXgNMcCeLbOSJlVWdo",
      },
    ],
  },
  {
    id: "lesson-1-card-1",
    elements: [
      {
        type: "expression",
        latex: `\\text{If }{y = 2}\\text{ in the equation }{2y + 5 = x + 5?}\\text{If }{y = 2}\\text{ in the equation }{2y + 5 = x + 5?}`,
        displayMode: "block",
      },
      {
        type: "text",
        content: "We can visualize the equation",
        variant: "body",
      },
      {
        type: "expression",
        latex: "x = \\frac{1}{2}",
        displayMode: "block",
      },
      {
        type: "text",
        content:
          "by drawing two bar models. The equation tells us that the two bars are equal, so they should have the same length.",
        variant: "body",
      },
      {
        type: "image",
        uri: "https://utfs.io/f/wGHSFKxTYo2ek0WeNBoq9FwpAxBP1unXgNMcCeLbOSJlVWdo",
      },
    ],
  },
];

const images = [
  "https://ds055uzetaobb.cloudfront.net/category-images/foundational-math-lI90N2.png",
  "https://ds055uzetaobb.cloudfront.net/brioche/chapter/pre-algebra-OzcAr4.png",
  "https://ds055uzetaobb.cloudfront.net/brioche/chapter/visual_algebra_course_card-251yed.png",
  "https://ds055uzetaobb.cloudfront.net/brioche/chapter/VariablesCourseCard_960x960-75LzA9.png",
  "https://ds055uzetaobb.cloudfront.net/brioche/chapter/introduction-to-algebra-6aL7ww.png",
  "https://ds055uzetaobb.cloudfront.net/brioche/chapter/geometry-fundamentals-R3GX1g.png",
  "https://ds055uzetaobb.cloudfront.net/brioche/chapter/graphing-and-modeling-R2ewSf.png",
  "https://ds055uzetaobb.cloudfront.net/category-images/LLP__Puzzles_1-9nNewq.png",
  "https://ds055uzetaobb.cloudfront.net/brioche/chapter/100_Puzzles-adq1kX.png",
  "https://ds055uzetaobb.cloudfront.net/brioche/chapter/strategic-puzzles-long-set-0NgdQ0.png",
];

const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const SwipeItem = ({
  item,
  index,
  scrollX,
}: {
  scrollX: SharedValue<number>;
  item: CardContentType;
  index: number;
}) => {
  // Animation styles for each item
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.85, 1, 0.85],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={styles.itemContainer}>
      <Animated.View style={[styles.item, animatedStyle]}>
        <CardContent content={item} />
      </Animated.View>
    </View>
  );
};

const SwipeScreen = () => {
  const navigation = useNavigation();

  // Shared value to track horizontal scroll position
  const scrollX = useSharedValue(0);

  // Set navigation options
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Scroll handler to update shared value
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 40,
          shadowColor: "#17171766",
          shadowOffset: { width: -2, height: 1 },
          shadowOpacity: 0.02,
          shadowRadius: 3,
          elevation: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <XIcon size={24} color={"#000"} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#eee",
            borderRadius: 12,
            width: "70%",
            height: 10,
          }}
        >
          <View
            style={{
              width: "70%",
              backgroundColor: "green",
              borderRadius: 12,
              height: 10,
            }}
          ></View>
        </View>
        <View>
          <Text weight="semiBold" style={{ fontSize: 24, lineHeight: 24 }}>
            0
          </Text>
        </View>
      </View>
      <Animated.FlatList
        data={cardContent}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <SwipeItem index={index} item={item} scrollX={scrollX} />
        )}
      />

      <View style={{ marginBottom: 20 }}>
        <Animated.FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginInline: "auto",
            padding: 16,
            paddingHorizontal: 32,
            gap: 16,
          }}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{
                height: 56,
                width: 72,
                backgroundColor: "#00000001",
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#dde",
              }}
            >
              <Image source={{ uri: item }} style={{ height: 32, width: 32 }} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default SwipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  itemContainer: {
    height: 600,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    height: "90%",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 22,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#17171733",
    shadowOffset: { width: -2, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  itemText: {
    fontSize: 32,
    color: "#000",
  },
});
