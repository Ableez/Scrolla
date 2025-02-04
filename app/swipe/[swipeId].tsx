import React, { useEffect, memo, useRef } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useNavigation } from "expo-router";
import BottomNav from "#/components/swipe-screen/bottom-nav";
import TopNav from "#/components/swipe-screen/top-nav";
import CardSlide from "#/components/swipe-screen/cards-slide";
import { cardContent, CardContentType } from "#/_mock_/swipe-data";
import Text from "#/components/text";
import { useCardSlideState } from "#/contexts/SlideStoreProvider";
import { FlashList } from "@shopify/flash-list";

const SwipeScreen: React.FC = () => {
  const isLoading = useCardSlideState((s) => s.isLoading);
  const error = useCardSlideState((s) => s.error);
  const setCards = useCardSlideState((s) => s.setCards);
  const setIsLoading = useCardSlideState((s) => s.setIsLoading);
  const setError = useCardSlideState((s) => s.setError);

  const navigation = useNavigation();
  const flatListRef = useRef<FlashList<CardContentType>>(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const loadCards = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCardData();
        setCards(data);
      } catch (err) {
        setError("Failed to load cards");
      } finally {
        setIsLoading(false);
      }
    };

    loadCards();
  }, [setCards, setIsLoading, setError, fetchCardData]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
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

const fetchCardData = async () => {
  try {
    // Simulated API call
    // await new Promise((resolve) => setTimeout(resolve, 100));

    return cardContent;
  } catch (error) {
    throw new Error("Failed to fetch card data");
  }
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

export default memo(SwipeScreen);
