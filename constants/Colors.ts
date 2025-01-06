import { Platform } from "react-native";

// Primary app color
export const primaryColor = "#6254E3";
export const secondaryColor = "#AFF583";
export const primary_blue = ["#6254E3", "#5648CF"];
export const primary_green = ["#AFF583", "#9EE376", "#8ED365"];
export const primary_pink = ["#F583D7", "#E376BB"];
export const primary_orange = ["#F5D183", "#E3B076"];
// Define color palette
const palette = {
  primary: {
    light: primaryColor,
    dark: "#5648CF", // iOS blue for dark mode
  },
  background: {
    light: "#FFFFFF",
    dark: "#000000",
  },
  text: {
    light: "#000000",
    dark: "#FFFFFF",
  },
  secondaryText: {
    light: "#3C3C43",
    dark: "#EBEBF5",
  },
  tertiaryText: {
    light: "#66666699",
    dark: "#EBEBF599",
  },
  separator: {
    light: "#3C3C4349",
    dark: "#38383A",
  },
  systemGray: {
    light: "#8E8E93",
    dark: "#8E8E93",
  },
  systemRed: {
    light: "#FF3B30",
    dark: "#FF453A",
  },
  systemGreen: {
    light: "#8583F5",
    dark: "#7776E3",
  },
  primaryText: {
    main: "#FFFFFF",
    contrastText: "#FFFFFF",
  },
  tint: {
    dark: "#121622",
    light: "#E1E9FF",
  },
  mono: {
    light: "#000",
    dark: "#fff",
  },
};

// Function to get color with opacity
const getColorWithOpacity = (hexColor: string, opacity: number): string => {
  const rgb = parseInt(hexColor.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const Colors = {
  light: {
    primary: palette.primary.light,
    background: palette.background.light,
    secondaryBackground: Platform.select({
      ios: "#F2F2F7",
      android: "#FAFAFA",
    }),
    tint: palette.tint.light,
    text: palette.text.light,
    secondaryText: palette.secondaryText.light,
    tertiaryText: palette.tertiaryText.light,
    separator: palette.separator.light,
    link: palette.primary.light,
    systemGray: palette.systemGray.light,
    systemRed: palette.systemRed.light,
    systemGreen: palette.systemGreen.light,
    tabIconDefault: palette.primary.light,
    tabIconSelected: palette.primary.light,
    border: palette.separator.light,
    mono: palette.mono.light,
    monoText: palette.mono.dark,
  },
  dark: {
    primary: palette.primary.dark,
    background: palette.background.dark,
    secondaryBackground: Platform.select({
      ios: "#1C1C1E",
      android: "#121212",
    }),
    tint: palette.tint.dark,
    text: palette.text.dark,
    secondaryText: palette.secondaryText.dark,
    tertiaryText: palette.tertiaryText.dark,
    separator: palette.separator.dark,
    link: palette.primary.dark,
    systemGray: palette.systemGray.dark,
    systemRed: palette.systemRed.dark,
    systemGreen: palette.systemGreen.dark,
    tabIconDefault: palette.primary.dark,
    tabIconSelected: palette.primary.dark,
    border: palette.separator.dark,
    mono: palette.mono.dark,
    monoText: palette.mono.light,
  },
};

// Semantic colors for better accessibility
export const SemanticColors = {
  success: Colors.light.systemGreen,
  error: Colors.light.systemRed,
  warning: "#FF9500", // iOS orange
  info: Colors.light.primary,
};

// Helper function to ensure text has sufficient contrast with its background
export const getAccessibleTextColor = (
  backgroundColor: string,
  darkColor = Colors.dark.text,
  lightColor = Colors.light.text
) => {
  const rgb = parseInt(backgroundColor.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? darkColor : lightColor;
};
