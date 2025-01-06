import { Tabs } from "expo-router";
import React from "react";
import { Easing, Platform } from "react-native";
import { Compass, Stars, Zap } from "lucide-react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import useTheme from "@/hooks/useTheme";
import HomeIcon from "@/assets/icons/home-outline";
import CourseIcon from "@/assets/icons/course-icon";
import { baseStyles } from "../../components/swipe-screen/base-styles";
import BouncyButton from "@/components/bouncy-button";
import Text from "@/components/text";
import { primaryColor } from "@/constants/Colors";

export default function TabLayout() {
  const { colors } = useTheme();

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
