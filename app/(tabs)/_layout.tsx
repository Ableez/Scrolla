import { Tabs } from "expo-router";
import React from "react";
import { Easing, Platform } from "react-native";
import { Stars } from "lucide-react-native";
import useTheme from "@/hooks/useTheme";
import HomeIcon from "@/assets/icons/home-outline";
import CourseIcon from "@/assets/icons/course-icon";
import { primaryColor } from "@/constants/Colors";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: primaryColor,
        headerShown: false,
        animation: "shift",
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 150,
            easing: Easing.inOut(Easing.ease),
          },
        },
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: "absolute",
            },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: true,
          tabBarStyle: {},
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon filled={!focused} color={focused ? "#7776E3" : "#aaa"} />
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          tabBarShowLabel: true,
          tabBarStyle: {},
          tabBarIcon: ({ color, focused }) => (
            <CourseIcon
              filled={!focused}
              color={focused ? "#7776E3" : "#aaa"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="neo-assisstant"
        options={{
          title: "Neo AI",
          tabBarShowLabel: true,
          tabBarStyle: {},
          tabBarIcon: ({ color, focused }) => (
            <Stars
              size={25}
              strokeWidth={2.2}
              color={focused ? "#7776E3" : "#aaa"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
