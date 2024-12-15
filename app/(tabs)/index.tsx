import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/ThemedView";
import Header from "@/components/ui/header";
import HomeStackCarousel from "@/components/home-stack-carousel";
import UserStreak from "@/components/user-streak";
import { View, Text, ScrollView } from "react-native";
import useTheme from "@/hooks/useTheme";


export default function HomeScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <ThemedView style={{ paddingTop: 8, minHeight: "100%" }}>
        <Header />
        <ScrollView>
          <UserStreak />
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              marginTop: 16,
            }}
          >
            <View>
              <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                Learning paths
              </Text>
              <Text style={{ fontSize: 16, color: colors.text, marginTop: 6 }}>
                Step-by-step paths to mastery
              </Text>
            </View>
          </View>

        
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}
