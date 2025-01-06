import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import CircleProgress from "./circle-progress";
import Text from "../text";
import { BookOpenTextIcon, ChevronLeft } from "lucide-react-native";
import { CardContentType } from "@/_mock_/swipe-data";
import Animated from "react-native-reanimated";
import { useCardSlideState } from "@/contexts/SlideStoreProvider";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

interface BottomNavProps {
  flatListRef: React.RefObject<Animated.FlatList<CardContentType>>;
}

const BottomNav: React.FC<BottomNavProps> = ({ flatListRef }) => {
  const {
    cards,
    currentCardIndex,
    questionCards,
    goToNextCard,
    goToPreviousCard,
    addAnsweredQuestion,
  } = useCardSlideState((state) => state);
  const confettiRef = useRef<ConfettiCannon>(null);

  const isLastCard = currentCardIndex === cards.length - 1;

  const currentCard = cards[currentCardIndex];
  if (!currentCard) {
    return null; // Or render a loading/error state
  }

  const currentQuestionElement =
    currentCard.type === "qa"
      ? currentCard.elements.find((e) => e.type === "options")
      : null;

  const currentQuestionState = currentQuestionElement
    ? questionCards.find((qa) => qa.id === currentQuestionElement.id)
    : null;

  // Calculate progress
  const totalQuestions = cards.filter((card) => card.type === "qa").length;
  const correctAnswers = questionCards.filter((qa) => qa.score === 1).length;
  const progress = totalQuestions > 0 ? correctAnswers / totalQuestions : 0;

  // Navigation state
  const canNavigateBack = currentCardIndex > 0;
  const canCheck =
    currentQuestionState?.selectedOption !== null &&
    currentQuestionState?.selectedOption !== undefined &&
    !currentQuestionState?.answerChecked;
  const canContinue =
    !currentQuestionState || currentQuestionState.answerChecked;

  const handleNavigation = (direction: "next" | "prev") => {
    if (!flatListRef.current) return;
    confettiRef.current?.start();

    if (direction === "next") {
      if (canCheck && currentQuestionState) {
        // Update the question state to mark it as checked
        const correctAnswer =
          currentQuestionElement?.type === "options"
            ? currentQuestionElement.correctAnswer
            : null;

        addAnsweredQuestion({
          ...currentQuestionState,
          answerChecked: true,
          score: currentQuestionState.selectedOption === correctAnswer ? 1 : 0,
        });
        return;
      }
      const newIndex = currentCardIndex + 1;
      flatListRef.current.scrollToOffset({
        offset: newIndex * SCREEN_WIDTH,
        animated: true,
      });
      goToNextCard();
    } else {
      const newIndex = currentCardIndex - 1;
      flatListRef.current.scrollToOffset({
        offset: newIndex * SCREEN_WIDTH,
        animated: true,
      });
      goToPreviousCard();
    }
  };

  const getButtonState = () => {
    if (!currentCard || currentCard.type !== "qa") {
      return {
        disabled: false,
        text: isLastCard ? "Complete" : "Continue",
        style: styles.buttonActive,
      };
    }

    if (!currentQuestionState || currentQuestionState.selectedOption === null) {
      return {
        disabled: true,
        text: "Continue",
        style: styles.buttonDisabled,
      };
    }

    if (!currentQuestionState.answerChecked) {
      return {
        disabled: false,
        text: "Check",
        style: styles.buttonActive,
      };
    }

    return {
      disabled: false,
      text: isLastCard ? "Complete" : "Continue",
      style: styles.buttonActive,
    };
  };

  const buttonState = getButtonState();

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
          <BookOpenTextIcon size={14} color={styles.theoryText.color} />
          <Text weight="semiBold" style={styles.theoryText}>
            View theory
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[styles.backButton, !canNavigateBack && styles.buttonDisabled]}
          onPress={() => handleNavigation("prev")}
          disabled={!canNavigateBack}
        >
          <ChevronLeft
            size={24}
            color={
              canNavigateBack
                ? styles.buttonActive.color
                : styles.buttonDisabled.color
            }
          />
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
};

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
