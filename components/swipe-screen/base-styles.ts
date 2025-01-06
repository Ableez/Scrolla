import { StyleSheet } from "react-native";

export const baseStyles = StyleSheet.create({
  container: {
    padding: 24,
    width: "100%",
  },
  text: {},
  h2: {
    fontSize: 32,
  },
  h4: {
    fontSize: 18,
  },
  body: {
    fontSize: 17,
    lineHeight: 24,
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
  imageTall: {
    width: 100,
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
    minHeight: 30,
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
    paddingVertical: 8,
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
    padding: 12,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 10,
  },
  checkButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
