import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "../text";

export function PracticeCard() {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📚</Text>
        </View>
        <Text style={styles.text}>
          Start your streak in 3 mins with a quick practice session
        </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text weight="medium" style={styles.buttonText}>
          Quick practice
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F8FFA366",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: "#E9F073",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#E9F073",
    borderRadius: 25,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
});
