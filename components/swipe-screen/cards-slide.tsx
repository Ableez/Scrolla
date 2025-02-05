import React, { memo, useCallback, useRef } from "react";
import { Dimensions, FlatList, View, ViewToken } from "react-native";
import { useCardSlideState } from "#/contexts/SlideStoreProvider";
import { CardContent } from "./content-card";
import BottomNav from "./bottom-nav";
import { CardType } from "#/store/card-slide";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const CardSlide = memo(() => {
  const flatListRef = useRef<FlatList<CardType>>(null);

  const { cards, setCurrentCardIndex, setDisableSwipe } = useCardSlideState(
    (s) => ({
      cards: s.cards,
      setCurrentCardIndex: s.setCurrentCardIndex,
      setDisableSwipe: s.setDisableSwipe,
    })
    // "cards-slide------------------------useCardSlideState"
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 100,
  });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<CardType>[] }) => {
      let timeoutId: NodeJS.Timeout;
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0]?.index ?? 0;
        if (timeoutId!) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          setCurrentCardIndex(newIndex);
          setDisableSwipe(cards[newIndex]?.type === "qa");
        }, 100);
      }
    },
    [cards, setCurrentCardIndex, setDisableSwipe]
  );

  const getItemLayout: (
    data: ArrayLike<CardType> | null | undefined,
    index: number
  ) => { length: number; offset: number; index: number } = useCallback(
    (_, index) => ({
      length: SCREEN_WIDTH,
      offset: SCREEN_WIDTH * index,
      index,
    }),
    []
  );

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <View
        style={{
          height: "75%",
          width: "100%",
        }}
      >
        <FlatList
          ref={flatListRef}
          data={cards}
          horizontal
          pagingEnabled
          initialNumToRender={2}
          maxToRenderPerBatch={3}
          windowSize={5}
          removeClippedSubviews
          showsHorizontalScrollIndicator={false}
          getItemLayout={getItemLayout}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CardContent content={item} />}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig.current}
          // CellRendererComponent={({ children }) => (
          //   <View collapsable={true} style={{ width: SCREEN_WIDTH }}>
          //     {children}
          //   </View>
          // )}
        />
      </View>

      <View
        style={{
          height: "25%",
          width: "100%",
        }}
      >
        <BottomNav flatListRef={flatListRef} />
      </View>
    </View>
  );
});

export default CardSlide;
