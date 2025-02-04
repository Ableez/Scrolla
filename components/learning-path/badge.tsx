import React from "react";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import useTheme from "#/hooks/useTheme";

interface BadgeProps {
  text: string;
  variant?: "default" | "success" | "update";
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = "default" }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 1,
        borderRadius: 16,
        alignSelf: "flex-start",
        backgroundColor:
          variant === "success"
            ? colors.systemGreen
            : variant === "update"
            ? "#005eed"
            : colors.background,
        ...(variant === "update" && {
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
        }),
      }}
    >
      <ThemedText
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: "#fff",
        }}
      >
        {text}
      </ThemedText>
    </View>
  );
};
