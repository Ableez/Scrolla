import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import Text from "../text";
import { router } from "expo-router";

export function LessonCard() {
  return (
    <Pressable onPress={() => router.push(`/swipe/1`)}>
      <View style={styles.card}>
        <View
          style={{
            width: "100%",
            height: 200,
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "#F5F8FF",
          }}
        >
          <Image
            src={"../../assets/images/backdrop.png"}
            style={{
              width: "100%",
              height: 200,
            }}
            resizeMode="cover"
          />
        </View>
        <Image
          source={{
            uri: "https://ds055uzetaobb.cloudfront.net/category-images/foundational-math-lI90N2.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.label}>MATH • LEVEL 2</Text>
          <Text weight="semiBold" style={styles.title}>
            Understanding Graphs
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 28,
    marginVertical: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderBottomWidth: 6,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    color: "#000",
  },
});
