import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef, useMemo, useCallback } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import Text from "../text";
import { BookOpenTextIcon, ChevronLeft } from "lucide-react-native";
import { CardContentType } from "#/_mock_/swipe-data";
import { FlashList } from "@shopify/flash-list";
import { useCardSlideState } from "#/contexts/SlideStoreProvider";

interface BottomNavProps {
  flatListRef: React.RefObject<FlashList<CardContentType>>;
}

const BottomNav: React.FC<BottomNavProps> = React.memo(({ flatListRef }) => {
  // Refs
  const confettiRef = useRef<ConfettiCannon>(null);

  // State selectors
  const {
    cards,
    currentCardIndex,
    questionCards,
    goToNextCard,
    goToPreviousCard,
    addAnsweredQuestion,
  } = useCardSlideState((s) => ({
    cards: s.cards,
    currentCardIndex: s.currentCardIndex,
    questionCards: s.questionCards,
    goToNextCard: s.goToNextCard,
    goToPreviousCard: s.goToPreviousCard,
    addAnsweredQuestion: s.addAnsweredQuestion,
  }));

  // Derived state
  const isLastCard = currentCardIndex === cards.length - 1;
  const currentCard = cards[currentCardIndex];
  const canNavigateBack = currentCardIndex > 0;

  // Current question details
  const { currentQuestion, questionState } = useMemo(() => {
    if (!currentCard || currentCard.type !== "qa") return {};

    const questionElement = currentCard.elements.find(
      (e) => e.type === "options"
    );
    const state =
      questionElement && questionCards.find((q) => q.id === questionElement.id);

    return { currentQuestion: questionElement, questionState: state };
  }, [currentCard, questionCards]);

  // // Progress calculations
  // const { correctCount, progressValue } = useMemo(() => {
  //   const totalQuestions = cards.filter((card) => card.type === "qa").length;
  //   const correct = questionCards.filter((q) => q.score === 1).length;
  //   return {
  //     correctCount: correct,
  //     progressValue: totalQuestions > 0 ? correct / totalQuestions : 0,
  //   };
  // }, [cards, questionCards]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (!flatListRef.current) return;

    // Handle question check first
    if (questionState?.selectedOption != null && !questionState.answerChecked) {
      const isCorrect =
        currentQuestion?.type === "options" &&
        questionState.selectedOption === currentQuestion.correctAnswer;

      addAnsweredQuestion({
        ...questionState,
        answerChecked: true,
        score: isCorrect ? 1 : 0,
      });
      return;
    }

    // Regular next navigation
    const nextIndex = Math.min(currentCardIndex + 1, cards.length - 1);
    flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    goToNextCard();
  }, [currentCardIndex, cards.length, questionState, currentQuestion]);

  const handlePrev = useCallback(() => {
    if (!flatListRef.current) return;

    const prevIndex = Math.max(currentCardIndex - 1, 0);
    flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
    goToPreviousCard();
  }, [currentCardIndex]);

  // Button state configuration
  const buttonConfig = () => {
    if (!currentCard || currentCard.type !== "qa") {
      return {
        text: isLastCard ? "Complete" : "Continue",
        disabled: false,
      };
    }

    if (!questionState?.selectedOption) {
      return {
        text: "Continue",
        disabled: true,
      };
    }

    return questionState.answerChecked
      ? { text: isLastCard ? "Complete" : "Continue", disabled: false }
      : { text: "Check", disabled: false };
  };

  if (!currentCard) return null;

  return (
    <View style={styles.container}>
      <ConfettiCannon
        ref={confettiRef}
        count={150}
        origin={{ x: 0, y: 0 }}
        autoStart={false}
        fadeOut
      />

      <View style={styles.topSection}>
        {/* <View style={styles.progressContainer}>
          <CircleProgress
            progress={progressValue}
            size={24}
            strokeWidth={4.8}
          />
          <Text weight="semiBold">{correctCount}</Text>
        </View> */}

        <View style={styles.actionsContainer}>
          <TheoryButton
            icon={<BookOpenTextIcon size={14} color="#bbb" />}
            text="View theory"
          />
          <TheoryButton
            icon={<BookOpenTextIcon size={14} color="#bbb" />}
            text="Ask Neo"
          />
        </View>
      </View>

      <View style={styles.navigationContainer}>
        <NavButton
          direction="prev"
          enabled={canNavigateBack}
          onPress={handlePrev}
        />

        <TouchableOpacity
          style={[
            styles.continueButton,
            buttonConfig().disabled
              ? styles.buttonDisabled
              : styles.buttonActive,
          ]}
          onPress={handleNext}
          disabled={buttonConfig().disabled}
        >
          <Text
            style={[
              styles.continueText,
              buttonConfig().disabled ? styles.textDisabled : styles.textActive,
            ]}
            weight="medium"
          >
            {buttonConfig().text}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const TheoryButton = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <TouchableOpacity style={styles.theoryButton}>
    {icon}
    <Text weight="semiBold" style={styles.theoryText}>
      {text}
    </Text>
  </TouchableOpacity>
);

const NavButton = ({
  direction,
  enabled,
  onPress,
}: {
  direction: "prev" | "next";
  enabled: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.backButton, !enabled && styles.buttonDisabled]}
    onPress={onPress}
    disabled={!enabled}
  >
    <ChevronLeft
      size={24}
      color={enabled ? "#000" : "#bbb"}
      style={
        direction === "next" ? { transform: [{ rotate: "180deg" }] } : undefined
      }
    />
  </TouchableOpacity>
);

// Keep your existing styles
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
