import React, { useRef, useEffect, useState } from "react";
import { View, Animated, LayoutChangeEvent } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ActionButton from "@/components/neo-ai/action-button";

export interface Action {
  label: string;
  onPress: () => void;
}

export interface InfiniteScrollFlashListProps {
  actions: Action[];
}

const SCROLL_SPEED = 0.5; // Adjust this to change scroll speed

const InfiniteScrollFlashList: React.FC<InfiniteScrollFlashListProps> = ({
  actions,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlashList<Action>>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const duplicatedActions = [...actions, ...actions, ...actions]; // Triple the actions for smoother looping

  useEffect(() => {
    if (containerWidth === 0) return;

    const totalWidth = actions.length * containerWidth;
    const scrollAnimation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: -totalWidth,
        duration: totalWidth * (1 / SCROLL_SPEED),
        useNativeDriver: true,
        isInteraction: false,
      })
    );

    scrollAnimation.start();

    return () => {
      scrollAnimation.stop();
    };
  }, [actions.length, containerWidth]);

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      if (flatListRef.current && containerWidth > 0) {
        const newIndex = Math.round(-value / containerWidth) % actions.length;
        flatListRef.current.scrollToIndex({ index: newIndex, animated: false });
      }
    });

    return () => {
      scrollX.removeListener(listener);
    };
  }, [containerWidth, actions.length]);

  const renderItem = ({ item }: { item: Action }) => (
    <View style={{ width: containerWidth }}>
      <ActionButton label={item.label} onPress={item.onPress} />
    </View>
  );

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={{ height: 120 }} onLayout={handleLayout}>
      {containerWidth > 0 && (
        <FlashList
          ref={flatListRef}
          data={duplicatedActions}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.label}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          estimatedItemSize={containerWidth}
          initialScrollIndex={actions.length} // Start from the middle set of items
          viewabilityConfig={{
            itemVisiblePercentThreshold: 100,
          }}
        />
      )}
    </View>
  );
};

export default InfiniteScrollFlashList;
