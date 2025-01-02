import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../text";

type DayCircleProps = {
  day: string;
  isActive?: boolean;
};

export function DayCircle({ day, isActive }: DayCircleProps) {
  return (
    <View style={[styles.circle, isActive && styles.activeCircle]}>
      <Text style={styles.text}>{day}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  activeCircle: {
    borderColor: "#000",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
