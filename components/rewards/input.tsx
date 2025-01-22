import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Text from "../text";

interface CouponInputProps {
  onApply: (code: string) => void;
}

export const CouponInput: React.FC<CouponInputProps> = ({ onApply }) => {
  const [code, setCode] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Coupon Code"
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
      />
      <TouchableOpacity style={styles.button} onPress={() => onApply(code)}>
        <Text style={styles.buttonText}>APPLY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  button: {
    padding: 16,
    justifyContent: "center",
  },
  buttonText: {
    color: "#ff6000",
    fontWeight: "600",
  },
});
