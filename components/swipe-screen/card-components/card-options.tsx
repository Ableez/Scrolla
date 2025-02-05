import Text from "#/components/text";
import { useCardSlideState } from "#/contexts/SlideStoreProvider";
import { memo, useCallback, useState } from "react";
import { Image } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { baseStyles } from "../base-styles";

const Option = memo(
  ({
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

    return (
      <TouchableOpacity
        onPress={() => !isAnswered && onSelect(index)}
        activeOpacity={0.7}
        disabled={isAnswered}
      >
        <View
          style={[
            baseStyles.option,
            {
              backgroundColor: isSelected
                ? "#009eed22"
                : isCorrect
                ? "#E8FFF3"
                : isWrong
                ? "#FFF1F2"
                : "#fff",
            },
          ]}
        >
          {imgUrl ? (
            <Image
              source={{ uri: imgUrl }}
              style={{ width: "100%", height: 120 }}
            />
          ) : (
            <Text style={baseStyles.optionText}>{choice}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

// Options component
export const Options = memo(
  ({
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
    const { handleQuestionAnswer, isAnswered: checkIsAnswered } =
      useCardSlideState((s) => ({
        handleQuestionAnswer: s.handleQuestionAnswer,
        isAnswered: s.isAnswered,
      }));

    const isAnswered = checkIsAnswered(element.id);

    const handleSelect = useCallback(
      (index: number) => {
        handleQuestionAnswer(element.id, index);
      },
      [element.id]
    );

    // const handleSelect = useCallback(
    //   (index: number) => {
    //     setSelected(index);
    //     console.log(
    //       "index, selected, qlen",
    //       index,
    //       selected,
    //       questionCards.length
    //     );
    //     if (selected !== null) {
    //       handleQuestionAnswer({
    //         id: element.id,
    //         answered: true,
    //         score: 0,
    //         selectedOption: index + 1,
    //         answerChecked: false,
    //       });
    //     }
    //   },
    //   [selected]
    // );

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
  }
);
