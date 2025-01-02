import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { useNavigation } from "expo-router";

const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const SwipeItem = ({
  item,
  index,
  scrollX,
}: {
  scrollX: SharedValue<number>;
  item: string;
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
        <Text>Swipe old</Text>
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
      <Animated.FlatList
        data={data}
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
    </View>
  );
};

export default SwipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
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
    borderRadius: 32,
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
