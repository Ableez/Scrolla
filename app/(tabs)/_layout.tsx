import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Home, Compass, BookOpen, Crown, User, Zap } from "lucide-react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import useTheme from "@/hooks/useTheme";

export default function TabLayout() {
  const { colors } = useTheme();
  const isPremium = true;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: "absolute",
            },
          }),
          ...{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 2,
            borderColor: "#004eed",
          },
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarStyle: {},
          tabBarIcon: ({ color, focused }) => (
            <Home
              size={25}
              strokeWidth={2.2}
              color={focused ? "#34C759" : "#aaa"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          tabBarShowLabel: false,
          tabBarStyle: {},
          tabBarIcon: ({ color, focused }) => (
            <BookOpen
              size={25}
              strokeWidth={2.2}
              color={focused ? "#34C759" : "#aaa"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarShowLabel: false,
          tabBarStyle: {},
          tabBarIcon: ({ color, focused }) => (
            <Compass
              size={25}
              strokeWidth={2.2}
              color={focused ? "#34C759" : "#aaa"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="challenges"
        options={{
          title: "Challenges",
          tabBarShowLabel: false,
          tabBarStyle: {},
          tabBarIcon: ({ color, focused }) => (
            <Zap
              size={25}
              strokeWidth={2.2}
              color={focused ? "#34C759" : "#aaa"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
