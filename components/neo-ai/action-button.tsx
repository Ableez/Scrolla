import { Action } from "@/components/neo-ai/infinite-scroll";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import BouncyButton from "../bouncy-button";

const ActionButton: React.FC<Action> = ({ label, onPress }) => {
  return (
    <BouncyButton style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </BouncyButton>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingInline: 16,
    paddingBlock: 10,
    margin: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
  },
  label: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default ActionButton;
