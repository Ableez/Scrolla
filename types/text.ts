import { TextStyle } from "react-native";

export type FontWeight =
  | "thin"
  | "extraLight"
  | "light"
  | "regular"
  | "medium"
  | "semiBold"
  | "bold";
export type FontStyle = "normal" | "italic";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body1"
  | "body2"
  | "caption"
  | "button"
  | "overline";

export interface TextStyles {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  caption: TextStyle;
  button: TextStyle;
  overline: TextStyle;
}
