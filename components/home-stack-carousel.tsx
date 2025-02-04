import React from "react";
import { View, Dimensions, Text, Button, TouchableOpacity } from "react-native";
import { Course } from "#/_mock_/type";
import { courses } from "#/_mock_/courses";
import useTheme from "#/hooks/useTheme";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
  withTiming,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { router } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH;
const CARD_HEIGHT = CARD_WIDTH * 1.0618;

const HomeStackCarousel = () => {
  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View style={{ marginTop: 16 }}>
      <Animated.FlatList
        data={courses}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        decelerationRate="normal"
        renderItem={({ item, index }) => (
          <CarouselItem scrollX={scrollX} item={item} index={index} />
        )}
        onScroll={onScrollHandler}
        pagingEnabled={true}
        scrollToOverflowEnabled={false}
      />
    </View>
  );
};

export default HomeStackCarousel;

function CarouselItem({
  item,
  index,
  scrollX,
}: Readonly<{
  item: Course;
  index: number;
  scrollX: SharedValue<number>;
}>) {
  const { theme, colors } = useTheme();

  const inputRange = [
    (index - 1) * CARD_WIDTH,
    index * CARD_WIDTH,
    (index + 1) * CARD_WIDTH,
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withTiming(
      interpolate(
        scrollX.value,
        inputRange,
        [0.97, 1, 0.97],
        Extrapolation.CLAMP
      ),
      { duration: 50 }
    );

    const opacity = withTiming(
      interpolate(
        scrollX.value,
        inputRange,
        [0.5, 1, 0.5],
        Extrapolation.CLAMP
      ),
      { duration: 50 }
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          padding: 16,
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: 12,
          borderWidth: 1,
          borderBottomWidth: 6,
          borderColor: "#eee",
          borderRadius: 32,
          gap: 12,
        }}
      >
        <View
          style={{
            padding: 12,
            backgroundColor:
              theme === "dark"
                ? colors.secondaryBackground
                : colors.secondaryBackground,
            borderRadius: 16,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <SvgXml
            xml={item.icon}
            width={64}
            height={64}
            color={colors.primary}
          />
        </View>

        <View
          style={{ flex: 1, width: "100%", justifyContent: "space-between" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: colors.primary,
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {item.topics.length} topics
            </Text>
            <Text style={{ fontSize: 16, color: colors.primary }}>•</Text>
            <Text
              style={{
                fontSize: 16,
                color: colors.primary,
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {item.usersEnrolled} enrolled
            </Text>
          </View>

          <Text
            style={{
              fontSize: 28,
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {item.name}
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              router.push(`/course/${item.id}`);
            }}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: colors.primary,
                borderRadius: 32,
              }}
            >
              <Text
                style={{
                  color: colors.background,
                  fontWeight: "500",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Learn
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
