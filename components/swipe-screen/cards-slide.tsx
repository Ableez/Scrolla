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

    const keyExtractor = useCallback((item: CardContentType) => item.id, []);

    const renderItem = useCallback(
      ({ item }: { item: CardContentType }) => <CardContent content={item} />,
      []
    );

    const initialScrollIndex = 0;

    return (
      <View style={{ height: "76%" }}>
        <FlashList
          data={cards}
          ref={flatListRef}
          horizontal
          pagingEnabled
          removeClippedSubviews={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          estimatedItemSize={332}
          initialScrollIndex={initialScrollIndex}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 10,
          }}
        />
      </View>
    );
  }
);

export default CardSlide;
