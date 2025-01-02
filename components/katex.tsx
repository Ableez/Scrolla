import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { WebViewSharedProps } from "react-native-webview/lib/WebViewTypes";

import katexStyle from "@/styles/katex-style.css";
import katexScript from "@/scripts/katex-script";

export interface KatexOptions {
  displayMode?: boolean;
  output?: "html" | "mathml" | "htmlAndMathml";
  leqno?: boolean;
  fleqn?: boolean;
  throwOnError?: boolean;
  errorColor?: string;
  macros?: any;
  minRuleThickness?: number;
  colorIsTextColor?: boolean;
  maxSize?: number;
  maxExpand?: number;
  strict?: boolean | string;
  trust?: boolean;
  globalGroup?: boolean;
}

export interface ContentOptions extends KatexOptions {
  inlineStyle?: string;
  expression?: string;
}

function getContent({ inlineStyle, expression, ...options }: ContentOptions) {
  return `<!DOCTYPE html>
<html>
<head>
<style>
${katexStyle}
${inlineStyle}
</style>
<script>
window.onerror = e => document.write(e);
window.onload = () => katex.render(${JSON.stringify(
    expression
  )}, document.getElementById("rendered"), ${JSON.stringify(options)});
${katexScript}
</script>
</head>
<body>
<span id="rendered" style="height: 100%; font-size: 4em;"></span>
</body>
</html>
`;
}

const defaultStyle = StyleSheet.create({
  root: {
    height: 1000,
  },
});

const defaultInlineStyle = `
html, body {
    font-size: 6em,
}
.katex {
  margin: 0;
  display: flex;
  font-size: 8em;
}
`;

export interface KatexProps
  extends ContentOptions,
    Omit<WebViewSharedProps, "source"> {}

export default function Katex({
  expression,
  displayMode,
  output,
  leqno,
  fleqn,
  throwOnError,
  errorColor,
  macros,
  minRuleThickness,
  colorIsTextColor,
  maxSize,
  maxExpand,
  strict,
  trust,
  globalGroup,
  ...webViewProps
}: KatexProps) {
  return (
    <WebView
      {...webViewProps}
      source={{
        html: getContent({
          expression,
          displayMode,
          output,
          leqno,
          fleqn,
          throwOnError,
          errorColor,
          macros,
          minRuleThickness,
          colorIsTextColor,
          maxSize,
          maxExpand,
          strict,
          trust,
          globalGroup,
        }),
      }}
    />
  );
}

Katex.defaultProps = {
  expression: "",
  displayMode: false,
  throwOnError: false,
  errorColor: "#f00",
  inlineStyle: defaultInlineStyle,
  style: defaultStyle,
  macros: {},
  colorIsTextColor: false,
};
