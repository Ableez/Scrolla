import React, { useEffect, memo } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useNavigation } from "expo-router";
import TopNav from "#/components/swipe-screen/top-nav";
import CardSlide from "#/components/swipe-screen/cards-slide";
import { cardContent } from "#/_mock_/swipe-data";
import Text from "#/components/text";
import { useCardSlideState } from "#/contexts/SlideStoreProvider";

const SwipeScreen: React.FC = () => {
  const { isLoading, error, setCards, setIsLoading, setError } =
    useCardSlideState((s) => s, "[swipeid]------useCardSlideState");

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const loadCards = async () => {
      setIsLoading(true);
      try {
        const data = cardContent;
        setCards(data);
      } catch (err) {
        setError("Failed to load cards");
      } finally {
        setIsLoading(false);
      }
    };

    loadCards();
  }, []);

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
      <CardSlide />
    </View>
  );
};

// const fetchCardData = async () => {
//   try {
//     return cardContent;
//   } catch (error) {
//     throw new Error("Failed to fetch card data");
//   }
// };

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
