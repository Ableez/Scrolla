import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { CartDetails } from "./types";
import Text from "../text";

interface HeaderProps {
  cartDetails: CartDetails;
  onBackPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartDetails, onBackPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Text>←</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.title}>APPLY COUPON</Text>
        <Text style={styles.subtitle}>
          Your cart: {cartDetails.currency}
          {cartDetails.total.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
