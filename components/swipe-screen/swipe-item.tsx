import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { CardContent } from "./content-card";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { CardContentType } from "@/_mock_/swipe-data";

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
      [0.8, 1, 0.8],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolation.CLAMP
    );

    const rotate = interpolate(
      scrollX.value,
      inputRange,
      [90, 0, -90],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }, { rotateY: `${rotate}deg` }],
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

export default SwipeItem;

const styles = StyleSheet.create({
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
