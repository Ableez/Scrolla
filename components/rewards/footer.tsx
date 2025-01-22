import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "../text";

export const Footer: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "swiggy-logo.png" }} style={styles.logo} />
      <Text style={styles.text}>curated by</Text>
      <Image source={{ uri: "mobbin-logo.png" }} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  logo: {
    width: 80,
    height: 24,
    resizeMode: "contain",
  },
  text: {
    marginHorizontal: 8,
    color: "#666",
  },
});
