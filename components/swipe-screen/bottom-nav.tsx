// BottomNav.tsx
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useMemo } from "react";
import Text from "../text";
import { ChevronLeft, Stars } from "lucide-react-native";
import { useCardSlideState } from "#/contexts/SlideStoreProvider";
import BouncyButton from "../bouncy-button";
import { CardType } from "#/store/card-slide";

interface BottomNavProps {
  flatListRef: React.RefObject<FlatList<CardType>>;
}

const BottomNav = memo(({ flatListRef }: BottomNavProps) => {
  const {
    currentCardIndex,
    cards,
    questionCards,
    maxAllowedIndex,
    goToNextCard,
    goToPreviousCard,
    updateCard,
    handleQuestionAnswer,
    canMoveToNextCard,
    checkAnswer,
  } = useCardSlideState(
    (s) => ({
      currentCardIndex: s.currentCardIndex,
      cards: s.cards,
      questionCards: s.questionCards,
      maxAllowedIndex: s.maxAllowedIndex,
      goToNextCard: s.goToNextCard,
      goToPreviousCard: s.goToPreviousCard,
      handleQuestionAnswer: s.handleQuestionAnswer,
      updateCard: s.updateCard,
      checkAnswer: s.checkAnswer,
      canMoveToNextCard: s.canMoveToNextCard,
    })
    // "bottom-nav------------------------useCardSlideState"
  );

  const { currentQuestion, questionState } = useMemo(() => {
    const currentCard = cards[currentCardIndex];
    if (!currentCard || currentCard.type !== "qa") return {};

    const questionElement = currentCard.elements.find(
      (e) => e.type === "options"
    );
    const state =
      questionElement && questionCards.find((q) => q.id === questionElement.id);

    return { currentQuestion: questionElement, questionState: state };
  }, [currentCardIndex, cards, questionCards]);

  const buttonConfig = useMemo(() => {
    const isLastCard = currentCardIndex === cards.length - 1;

    if (!currentQuestion) {
      return { text: isLastCard ? "Complete" : "Continue", disabled: false };
    }

    if (!questionState?.selectedOption) {
      return { text: "Continue", disabled: true };
    }

    return questionState.answerChecked
      ? { text: isLastCard ? "Complete" : "Continue", disabled: false }
      : { text: "Check", disabled: false };
  }, [currentCardIndex, cards.length, currentQuestion, questionState]);

  const handleNavigation = useCallback(
    (direction: "next" | "prev") => {
      if (direction === "prev") {
        const newIndex = Math.max(currentCardIndex - 1, 0);

        if (!flatListRef.current) {
          console.log("[BottomNav] FlatListRef is null");
          return;
        }

        if (cards[newIndex]) {
          flatListRef.current?.scrollToIndex({
            index: newIndex,
            animated: true,
          });
          updateCard(cards[newIndex]?.id, { viewed: true });
        }

        goToPreviousCard();
      }
    },
    [currentCardIndex, cards, flatListRef, updateCard, goToPreviousCard]
  );

  const handleContinue = useCallback(() => {
    if (currentQuestion && !questionState?.answerChecked) {
      checkAnswer(currentQuestion.id);
    } else if (canMoveToNextCard()) {
      handleNavigation("next");
    }
  }, [currentQuestion, questionState, canMoveToNextCard]);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 4,
          gap: 8,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <View
            style={{
              borderWidth: 4,
              borderColor: "#ccc",
              borderRadius: 100,
              padding: 8,
              width: 8,
            }}
          />
          <Text variant="h3" style={{ color: "#555" }}>
            0
          </Text>
        </View>
        <BouncyButton
          style={{
            paddingVertical: 6,
            paddingHorizontal: 14,
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Stars size={16} color="#555" />
          <Text style={{ color: "#555", fontSize: 14 }} weight="bold">
            View theory
          </Text>
        </BouncyButton>
      </View>
      <View style={styles.navigationContainer}>
        <BouncyButton
          style={[
            styles.backButton,
            currentCardIndex <= 0 && { backgroundColor: "#eee" },
          ]}
          onPress={() => handleNavigation("prev")}
          disabled={currentCardIndex <= 0}
        >
          <ChevronLeft
            size={24}
            color={currentCardIndex > 0 ? "#000" : "#bbb"}
          />
        </BouncyButton>

        <BouncyButton
          style={[
            styles.continueButton,
            buttonConfig.disabled && styles.buttonDisabled,
          ]}
          activeOpacity={0.7}
          onPress={() => handleContinue()}
          disabled={buttonConfig.disabled}
        > 
          <Text style={styles.continueText} weight="medium">
            {buttonConfig.text}
          </Text>
        </BouncyButton>
      </View>
    </View>
  );
});

// Keep your existing styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    height: "100%",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  theoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  theoryText: {
    color: "#bbb",
    fontSize: 14,
    lineHeight: 18,
  },
  navigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: "19%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#ccc",
  },
  continueButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: "79%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#eee",
    backgroundColor: "#000",
  },
  buttonDisabled: {
    backgroundColor: "#999",
    borderColor: "#999",
  },
  buttonActive: {
    backgroundColor: "#000",
    color: "#000",
  },
  textDisabled: {
    color: "#bbb",
  },
  textActive: {
    color: "#fff",
  },
  continueText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default BottomNav;
