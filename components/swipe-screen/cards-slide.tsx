import { Dimensions, StyleSheet, View, type ViewToken } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { cardContent, CardContentType } from "@/_mock_/swipe-data";
import SwipeItem from "./swipe-item";
import { useCardSlideState } from "@/contexts/SlideStoreProvider";

interface ViewableItemsChanged {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const CardSlide = ({
  flatListRef,
}: {
  flatListRef: React.RefObject<Animated.FlatList<CardContentType>>;
}) => {
  const { cards, disableSwipe, setCurrentCardIndex, setDisableSwipe } =
    useCardSlideState((s) => s);

  console.log("disableSwipe", disableSwipe);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  const onViewableItemsChanged = useRef<(info: ViewableItemsChanged) => void>(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index ?? 0;
        setCurrentCardIndex(newIndex);

        if (cards[newIndex].type === "qa") {
          setDisableSwipe(true);
        }
      }
    }
  );

  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View style={{ height: "76%" }}>
      <Animated.FlatList
        data={cards}
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <SwipeItem index={index} item={item} scrollX={scrollX} />
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        scrollEnabled={!disableSwipe}
      />
    </View>
  );
};

export default CardSlide;
