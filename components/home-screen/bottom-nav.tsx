import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function BottomNav() {
  const navItems = [
    { icon: "🏠", label: "Home", active: true },
    { icon: "📚", label: "Courses" },
    { icon: "🏆", label: "Leagues" },
    { icon: "⭐", label: "Premium" },
    { icon: "⚙️", label: "Settings" },
  ];

  return (
    <View style={styles.container}>
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.navItem, item.active && styles.activeItem]}
        >
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={[styles.label, item.active && styles.activeLabel]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFF",
    paddingBottom: 20,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeItem: {
    backgroundColor: "#F8F8F8",
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
  activeLabel: {
    color: "#000",
  },
});
