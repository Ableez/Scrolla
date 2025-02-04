import React, { useCallback } from "react";
import { View, ViewabilityConfig, ViewToken } from "react-native";
import { useCardSlideState } from "#/contexts/SlideStoreProvider";
import type { CardContentType } from "#/_mock_/swipe-data";
import { FlashList } from "@shopify/flash-list";
import { CardContent } from "./content-card";

const CardSlide = React.memo(
  ({
    flatListRef,
  }: {
    flatListRef: React.RefObject<FlashList<CardContentType>>;
  }) => {
    const cards = useCardSlideState((s) => s.cards);
    const setCurrentCardIndex = useCardSlideState((s) => s.setCurrentCardIndex);
    const setDisableSwipe = useCardSlideState((s) => s.setDisableSwipe);

    const viewabilityConfig: ViewabilityConfig = {
      itemVisiblePercentThreshold: 50,
      minimumViewTime: 100,
      waitForInteraction: true,
    };

    const onViewableItemsChanged = useCallback(
      ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        if (viewableItems.length > 0) {
          const newIndex = viewableItems[0]?.index ?? 0;
          setCurrentCardIndex(newIndex);
          console.log("CURRENT CARD INDEX", newIndex);

          setDisableSwipe(cards[newIndex]?.type === "qa");
        }
      },
      [cards, setCurrentCardIndex, setDisableSwipe]
    );

    return (
      <View style={{ height: "76%" }}>
        <FlashList
          data={cards}
          ref={flatListRef}
          horizontal
          pagingEnabled
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={32}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CardContent content={item} />}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          estimatedItemSize={332}
        />
      </View>
    );
  }
);

export default CardSlide;
