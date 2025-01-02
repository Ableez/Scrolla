import React from "react";
import { Text as NativeText, TextStyle, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { TextVariant, FontWeight, FontStyle, TextStyles } from "../types/text";

interface TextProps extends React.ComponentProps<typeof NativeText> {
  variant?: TextVariant;
  weight?: FontWeight;
  italic?: boolean;
  color?: string;
}

const fontWeightMap: Record<FontWeight, string> = {
  thin: "IBMPlexSansThin",
  extraLight: "IBMPlexSansExtraLight",
  light: "IBMPlexSansLight",
  regular: "IBMPlexSansRegular",
  medium: "IBMPlexSansMedium",
  semiBold: "IBMPlexSansSemiBold",
  bold: "IBMPlexSansBold",
};

const createFontStyle = (weight: FontWeight, italic: boolean): string => {
  const baseFont = fontWeightMap[weight];
  return italic ? `${baseFont}Italic` : baseFont;
};

const textStyles: TextStyles = {
  h1: { fontSize: 36, fontWeight: "800" },
  h2: { fontSize: 24, fontWeight: "800" },
  h3: { fontSize: 20, fontWeight: "800" },
  body1: { fontSize: 18 },
  body2: { fontSize: 12 },
  caption: { fontSize: 12 },
  button: { fontSize: 14 },
  overline: { fontSize: 10, textTransform: "uppercase" },
};

export const Text: React.FC<TextProps> = ({
  variant = "body1",
  weight = "regular",
  italic = false,
  color = "#000000",
  style,
  ...props
}) => {
  const [fontsLoaded] = useFonts({
    IBMPlexSansThin: require("../assets/fonts/IBMPlexSans-Thin.ttf"),
    IBMPlexSansThinItalic: require("../assets/fonts/IBMPlexSans-ThinItalic.ttf"),
    IBMPlexSansExtraLight: require("../assets/fonts/IBMPlexSans-ExtraLight.ttf"),
    IBMPlexSansExtraLightItalic: require("../assets/fonts/IBMPlexSans-ExtraLightItalic.ttf"),
    IBMPlexSansLight: require("../assets/fonts/IBMPlexSans-Light.ttf"),
    IBMPlexSansLightItalic: require("../assets/fonts/IBMPlexSans-LightItalic.ttf"),
    IBMPlexSansRegular: require("../assets/fonts/IBMPlexSans-Regular.ttf"),
    IBMPlexSansItalic: require("../assets/fonts/IBMPlexSans-Italic.ttf"),
    IBMPlexSansMedium: require("../assets/fonts/IBMPlexSans-Medium.ttf"),
    IBMPlexSansMediumItalic: require("../assets/fonts/IBMPlexSans-MediumItalic.ttf"),
    IBMPlexSansSemiBold: require("../assets/fonts/IBMPlexSans-SemiBold.ttf"),
    IBMPlexSansSemiBoldItalic: require("../assets/fonts/IBMPlexSans-SemiBoldItalic.ttf"),
    IBMPlexSansBold: require("../assets/fonts/IBMPlexSans-Bold.ttf"),
    IBMPlexSansBoldItalic: require("../assets/fonts/IBMPlexSans-BoldItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null; // or a loading placeholder
  }

  const fontFamily = createFontStyle(weight, italic);

  const textStyle: TextStyle = {
    ...textStyles[variant],
    fontFamily,
    color,
  };

  return (
    <NativeText style={[textStyle, style]} {...props}>
      {props.children}
    </NativeText>
  );
};

export default Text;
