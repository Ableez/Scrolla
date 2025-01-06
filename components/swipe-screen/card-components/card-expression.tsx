import { Dimensions, View } from "react-native";
import Katex from "react-native-katex";
import { baseStyles } from "../base-styles";

// Reusable KaTeX styles
const katexStyles = `
  html, body {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    background-color: transparent;
  }
  .katex {
    font-size: 2em;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }
`;

// Expression component
export const Expression = ({
  latex,
  displayMode = "block",
}: {
  latex: string;
  displayMode?: "inline" | "block";
}) => (
  <View style={baseStyles.expressionContainer}>
    <Katex
      expression={latex}
      style={{ width: 900 }}
      inlineStyle={katexStyles}
      displayMode={false}
      throwOnError={false}
      containerStyle={{
        width: Dimensions.get("screen").width - 32 * 3,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexWrap: "wrap",
      }}
      errorColor="#DC2626"
    />
  </View>
);
