import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import Text from "@/components/text";
import Katex from "../katex";

// Types for content elements
type TextType = "h2" | "h4" | "body" | "caption";
type ContentElement =
  | { type: "text"; variant: TextType; content: string }
  | { type: "image"; uri: string; size?: "small" | "medium" | "large" | "full" }
  | { type: "expression"; latex: string; displayMode?: "inline" | "block" }
  | { type: "options"; choices: string[]; correctAnswer: number };

export type CardContentType = {
  id: string;
  elements: ContentElement[];
};

// Reusable KaTeX styles
const katexStyles = `
html, body {
  display: flex;
  background-color: #fafafa;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}
.katex {
  font-size: 4em;
  margin: 0;
  display: flex;
}
`;

// Text component with variants
const ContentText = ({
  variant,
  content,
}: {
  variant: TextType;
  content: string;
}) => {
  const styles = {
    h2: [baseStyles.text, baseStyles.h2],
    h4: [baseStyles.text, baseStyles.h4],
    body: [baseStyles.text, baseStyles.body],
    caption: [baseStyles.text, baseStyles.caption],
  }[variant];

  const weight =
    variant === "h4" ? "semiBold" : variant === "h2" ? "bold" : "regular";

  return (
    <Text weight={weight} style={styles}>
      {content}
    </Text>
  );
};

// Image component
const ContentImage = ({
  uri,
  size = "small",
}: {
  uri: string;
  size?: "small" | "medium" | "large" | "full";
}) => {
  const styles = {
    small: baseStyles.imageSmall,
    medium: baseStyles.imageMedium,
    large: baseStyles.imageLarge,
    full: baseStyles.imageFull,
  }[size];

  return (
    <View style={baseStyles.imageContainer}>
      <Image
        source={{ uri }}
        style={{ width: "100%", height: 150 }}
        width={styles.width}
        height={styles.height}
      />
    </View>
  );
};

// Expression component
const Expression = ({
  latex,
  displayMode = "block",
}: {
  latex: string;
  displayMode?: "inline" | "block";
}) => (
  <View
    style={{
      width: "auto",
      height: 28,
      borderWidth: 2,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Katex
      expression={latex}
      style={{ flex: 1 }}
      displayMode={false}
      throwOnError={false}
      errorColor="#f00"
      macros={{}}
      colorIsTextColor={false}
      output="htmlAndMathml"
      onError={() => console.error("Error")}
    />
  </View>
);

// Option component
const Option = ({
  choice,
  index,
  selected,
  isAnswered,
  correctAnswer,
  onSelect,
}: {
  choice: string;
  index: number;
  selected: number | null;
  isAnswered: boolean;
  correctAnswer: number;
  onSelect: (index: number) => void;
}) => {
  const isSelected = selected === index;
  const isCorrect = isAnswered && index === correctAnswer;
  const isWrong = isAnswered && isSelected && index !== correctAnswer;

  const backgroundAnim = useSharedValue(0);

  React.useEffect(() => {
    backgroundAnim.value = withSpring(isSelected ? 1 : 0);
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => {
    let backgroundColor = interpolateColor(
      backgroundAnim.value,
      [0, 1],
      ["#FFFFFF", "#F0F9FF"]
    );

    if (isAnswered) {
      if (isCorrect) backgroundColor = "#E8FFF3";
      if (isWrong) backgroundColor = "#FFF1F2";
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
        <Text style={baseStyles.optionText}>{choice}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Options component
const Options = ({
  choices,
  correctAnswer,
}: {
  choices: string[];
  correctAnswer: number;
}) => {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);

  const handleAnswer = () => {
    if (selected !== null) {
      setIsAnswered(true);
    }
  };

  return (
    <View style={baseStyles.optionsContainer}>
      {choices.map((choice, index) => (
        <Option
          key={index}
          choice={choice}
          index={index}
          selected={selected}
          isAnswered={isAnswered}
          correctAnswer={correctAnswer}
          onSelect={setSelected}
        />
      ))}
      {selected !== null && !isAnswered && (
        <TouchableOpacity
          style={baseStyles.checkButton}
          onPress={handleAnswer}
          activeOpacity={0.7}
        >
          <Text style={baseStyles.checkButtonText}>Check Answer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Main Card Content component
export const CardContent = ({ content }: { content: CardContentType }) => {
  return (
    <View style={baseStyles.container}>
      {content.elements.map((element, index) => {
        switch (element.type) {
          case "text":
            return (
              <ContentText
                key={index}
                variant={element.variant}
                content={element.content}
              />
            );
          case "image":
            return <ContentImage key={index} uri={element.uri} />;
          case "expression":
            return (
              <Expression
                displayMode={element.displayMode}
                key={index}
                latex={element.latex}
              />
            );
          case "options":
            return (
              <Options
                key={index}
                choices={element.choices}
                correctAnswer={element.correctAnswer}
              />
            );
          default:
            return null;
        }
      })}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    padding: 24,
    width: "100%",
  },
  text: {
    marginBottom: 8,
  },
  h2: {
    fontSize: 32,
    marginBottom: 16,
  },
  h4: {
    fontSize: 18,
    marginBottom: 12,
  },
  body: {
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 16,
  },
  caption: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  imageContainer: {
    marginBottom: 6,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    padding: 6,
  },
  imageSmall: {
    width: 10,
    height: 10,
  },
  imageMedium: {
    width: 300,
    height: 300,
  },
  imageLarge: {
    width: 400,
    height: 400,
  },
  imageFull: {
    width: 500,
    height: 500,
  },
  expressionContainer: {
    width: "100%",
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  katex: {
    width: "100%", // TODO: Fix this
  },
  optionsContainer: {
    width: "100%",
    gap: 8,
    marginBottom: 16,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  optionText: {
    fontSize: 16,
    color: "#374151",
  },
  checkButton: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 16,
  },
  checkButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

// Example usage
const ExampleCard = () => {
  const sampleContent: CardContentType = {
    id: "example-1",
    elements: [
      { type: "text", variant: "h2", content: "Understanding Equations" },
      {
        type: "text",
        variant: "body",
        content: "Let's explore how equations work with variables.",
      },
      { type: "expression", latex: "2x + 3 = 11", displayMode: "block" },
      {
        type: "text",
        variant: "caption",
        content: "Solve for x in this linear equation",
      },
      {
        type: "options",
        choices: ["x = 4", "x = 5", "x = 6", "x = 7"],
        correctAnswer: 0,
      },
    ],
  };

  return <CardContent content={sampleContent} />;
};

export default ExampleCard;
