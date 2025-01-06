import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "../text";
import { Image } from "react-native";
import { secondaryColor } from "@/constants/Colors";

export function PracticeCard() {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/022/996/345/non_2x/3d-space-rocket-render-with-transparent-background-free-png.png",
            }}
            width={44}
            height={44}
          />
        </View>
        <Text style={styles.text} weight="semiBold">
          Start your streak in 3 mins with a quick practice session
        </Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text weight="medium" style={styles.buttonText}>
          Start practice
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: secondaryColor + "44",
    borderRadius: 28,
    padding: 16,
    marginHorizontal: 16,
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: secondaryColor + "77",
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
    backgroundColor: secondaryColor,
    borderRadius: 25,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
});
