import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useNavigation } from "expo-router";
import BottomNav from "@/components/swipe-screen/bottom-nav";
import TopNav from "@/components/swipe-screen/top-nav";
import CardSlide from "@/components/swipe-screen/cards-slide";
import { cardContent, CardContentType } from "@/_mock_/swipe-data";
import Animated from "react-native-reanimated";
import Text from "@/components/text";
import { type CardSlideState } from "@/store/card-slide";
import { useCardSlideState } from "@/contexts/SlideStoreProvider";

const SwipeScreen: React.FC = () => {
  // const [state, setState] = useState<CardSlideState>({
  //   currentCardIndex: 0,
  //   cards: [],
  //   isComplete: false,
  //   highestViewedIndex: 0,
  //   progress: 0,
  //   isLoading: true,
  //   error: null,
  //   disableSwipe: true,
  // });

  const state = useCardSlideState((s) => s);

  const flatListRef = React.useRef<Animated.FlatList<CardContentType>>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const loadCards = async () => {
      state.setIsLoading(true);

      try {
        const data = await fetchCardData();
        state.setCards(data);
      } catch (error) {
        state.setError("Failed to load cards");
      } finally {
        state.setIsLoading(false);
      }
    };

    loadCards();
  }, []);

  const handleCardChange = (newIndex: number) => {
    const newProgress = (newIndex + 1) / state.cards.length;
    const newHighestIndex = Math.max(state.highestViewedIndex, newIndex);
    const isComplete = newIndex === state.cards.length - 1;

    const answered = state.questionCards.find(
      (qa) => qa.id === state.cards[newIndex].id
    );

    const disableSwipe =
      state.cards[newIndex].type === "qa" && answered === undefined;

    state.updateState({
      currentCardIndex: newIndex,
      progress: newProgress,
      highestViewedIndex: newHighestIndex,
      isComplete,
      disableSwipe,
    });
  };

  if (state.isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{state.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNav />
      <CardSlide flatListRef={flatListRef} />
      <BottomNav flatListRef={flatListRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default SwipeScreen;

// Utility function for fetching card data
async function fetchCardData(): Promise<CardContentType[]> {
  try {
    // In a real app, this would be an API call
    // const response = await fetch('/api/cards');
    // const data = await response.json();
    // return data;

    // For now, simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return cardContent;
  } catch (error) {
    throw new Error("Failed to fetch card data");
  }
}
