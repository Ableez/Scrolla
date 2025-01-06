import Text from "@/components/text";
import { useCardSlideState } from "@/contexts/SlideStoreProvider";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { baseStyles } from "../base-styles";

const Option = ({
  choice,
  index,
  selected,
  isAnswered,
  correctAnswer,
  onSelect,
  imgUrl,
}: {
  choice: string;
  index: number;
  selected: number | null;
  isAnswered: boolean;
  correctAnswer: number;
  onSelect: (index: number) => void;
  imgUrl?: string;
}) => {
  const isSelected = selected === index;
  const isCorrect = isAnswered && index === correctAnswer;
  const isWrong = isAnswered && isSelected && index !== correctAnswer;

  const backgroundAnim = useSharedValue(0);

  useEffect(() => {
    backgroundAnim.value = withSpring(isSelected ? 1 : 0);
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => {
    let backgroundColor = interpolateColor(
      backgroundAnim.value,
      [0, 1],
      ["#FFFFFF", "#F0F9FF"]
    );

    if (isAnswered) {
      if (isCorrect) {
        backgroundColor = "#E8FFF3";
      }
      if (isWrong) {
        backgroundColor = "#FFF1F2";
      }
    }

    return { backgroundColor };
  });

  return (
    <TouchableOpacity
      onPress={() => !isAnswered && onSelect(index)}
      activeOpacity={0.7}
      disabled={isAnswered}
    >
      <Animated.View style={[baseStyles.option, animatedStyle]}>
        {imgUrl ? (
          <Image
            source={{ uri: imgUrl }}
            style={{ width: "100%", height: 120 }}
          />
        ) : (
          <Text style={baseStyles.optionText}>{choice}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

// Options component
export const Options = ({
  element,
}: {
  element: {
    id: string;
    type: "options";
    choices: string[];
    correctAnswer: number;
  };
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const {
    addAnsweredQuestion,
    setCurrentCardIndex,
    isAnswered: checkIsAnswered,
  } = useCardSlideState((s) => s);
  
  const isAnswered = checkIsAnswered(element.id);

  const handleSelect = (index: number) => {
    setSelected(index);
    if (selected !== null) {
      addAnsweredQuestion({
        id: element.id,
        answered: true,
        score: 0,
        selectedOption: index,
        answerChecked: false,
      });
    }
  };

  return (
    <View style={baseStyles.optionsContainer}>
      {element.choices.map((choice, index) => (
        <Option
          key={index}
          choice={choice}
          index={index}
          selected={selected}
          isAnswered={isAnswered}
          correctAnswer={element.correctAnswer}
          onSelect={handleSelect}
        />
      ))}
    </View>
  );
};
