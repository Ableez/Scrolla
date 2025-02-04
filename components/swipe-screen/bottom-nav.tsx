import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import CircleProgress from "./circle-progress";
import Text from "../text";
import { BookOpenTextIcon, ChevronLeft } from "lucide-react-native";
import { CardContentType } from "#/_mock_/swipe-data";
import { FlashList } from "@shopify/flash-list";
import { useCardSlideState } from "#/contexts/SlideStoreProvider";

interface BottomNavProps {
  flatListRef: React.RefObject<FlashList<CardContentType>>;
}

const BottomNav: React.FC<BottomNavProps> = React.memo(({ flatListRef }) => {
  const confettiRef = useRef<ConfettiCannon>(null);

  const cards = useCardSlideState((s) => s.cards);
  const currentCardIndex = useCardSlideState((s) => s.currentCardIndex);
  const questionCards = useCardSlideState((s) => s.questionCards);
  const goToNextCard = useCardSlideState((s) => s.goToNextCard);
  const goToPreviousCard = useCardSlideState((s) => s.goToPreviousCard);
  const addAnsweredQuestion = useCardSlideState((s) => s.addAnsweredQuestion);

  const isLastCard = useMemo(
    () => currentCardIndex === cards.length - 1,
    [currentCardIndex, cards.length]
  );

  const currentCard = useMemo(
    () => cards[currentCardIndex],
    [cards, currentCardIndex]
  );

  const { currentQuestionElement, currentQuestionState } = useMemo(() => {
    if (!currentCard || currentCard.type !== "qa") return {};

    const element = currentCard.elements.find((e) => e.type === "options");
    const state = element
      ? questionCards.find((qa) => qa.id === element.id)
      : null;

    return { currentQuestionElement: element, currentQuestionState: state };
  }, [currentCard, questionCards]);

  const { correctAnswers, progress } = useMemo(() => {
    const total = cards.filter((card) => card.type === "qa").length;
    const correct = questionCards.filter((qa) => qa.score === 1).length;
    return {
      totalQuestions: total,
      correctAnswers: correct,
      progress: total > 0 ? correct / total : 0,
    };
  }, [cards, questionCards]);

  const canNavigateBack = currentCardIndex > 0;
  const canCheck = useMemo(
    () =>
      currentQuestionState?.selectedOption != null &&
      !currentQuestionState?.answerChecked,
    [currentQuestionState]
  );

  const handleNavigation = useCallback(
    (direction: "next" | "prev") => {
      if (!flatListRef.current) {
        console.error("Flatlist ref not found");
        return;
      }

      // confettiRef.current?.start();

      if (direction === "next") {
        console.log("NEXT, currentQuestionElement", currentQuestionElement);
        if (
          canCheck &&
          currentQuestionState &&
          currentQuestionElement?.type === "options"
        ) {
          addAnsweredQuestion({
            ...currentQuestionState,
            answerChecked: true,
            score:
              currentQuestionState.selectedOption ===
              currentQuestionElement.correctAnswer
                ? 1
                : 0,
          });
          return;
        }

        const newIndex = Math.min(currentCardIndex + 1, cards.length - 1);
        flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
        goToNextCard();
      } else {
        const newIndex = Math.max(currentCardIndex - 1, 0);
        flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
        goToPreviousCard();
      }
    },
    [
      canCheck,
      currentCardIndex,
      cards.length,
      currentQuestionState,
      currentQuestionElement,
    ]
  );

  const buttonState = useMemo(() => {
    if (!currentCard || currentCard.type !== "qa") {
      return {
        disabled: false,
        text: isLastCard ? "Complete" : "Continue",
        style: styles.buttonActive,
      };
    }

    if (!currentQuestionState?.selectedOption) {
      return {
        disabled: true,
        text: "Continue",
        style: styles.buttonDisabled,
      };
    }

    return currentQuestionState.answerChecked
      ? {
          disabled: false,
          text: isLastCard ? "Complete" : "Continue",
          style: styles.buttonActive,
        }
      : {
          disabled: false,
          text: "Check",
          style: styles.buttonActive,
        };
  }, [currentCard, isLastCard, currentQuestionState]);

  if (!currentCard) return null;

  return (
    <View style={styles.container}>
      <ConfettiCannon
        count={150}
        origin={{ x: 0, y: 0 }}
        autoStart={false}
        fadeOut
        ref={confettiRef}
      />

      <View style={styles.topSection}>
        <View style={styles.progressContainer}>
          <CircleProgress progress={progress} size={24} strokeWidth={4.8} />
          <Text weight="semiBold">{correctAnswers}</Text>
        </View>
        <TouchableOpacity style={styles.theoryButton}>
          <BookOpenTextIcon size={14} color="#bbb" />
          <Text weight="semiBold" style={styles.theoryText}>
            View theory
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.theoryButton}>
          <BookOpenTextIcon size={14} color="#bbb" />
          <Text weight="semiBold" style={styles.theoryText}>
            Ask Neo
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.backButton, !canNavigateBack && styles.buttonDisabled]}
          onPress={() => handleNavigation("prev")}
          disabled={!canNavigateBack}
        >
          <ChevronLeft size={24} color={canNavigateBack ? "#000" : "#bbb"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.continueButton, buttonState.style]}
          onPress={() => handleNavigation("next")}
          disabled={buttonState.disabled}
        >
          <Text
            style={[
              styles.continueText,
              buttonState.disabled ? styles.textDisabled : styles.textActive,
            ]}
            weight="medium"
          >
            {buttonState.text}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    height: "14%",
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
  },
  buttonDisabled: {
    backgroundColor: "#eee",
    color: "#bbb",
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
    textAlign: "center",
  },
});

export default BottomNav;
