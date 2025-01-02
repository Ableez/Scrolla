import React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { DayCircle } from "@/components/home-screen/day-circle";
import { PracticeCard } from "@/components/home-screen/practice-card";
import { LessonCard } from "@/components/home-screen/lesson-card";
import { BottomNav } from "@/components/home-screen/bottom-nav";
import Text from "@/components/text";

export default function App() {
  const days = ["F", "S", "Su", "M", "T"];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text weight="semiBold" style={styles.title}>
            For you
          </Text>
        </View>

        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>
            Solve 3 problems to start a streak
          </Text>
          <View style={styles.daysRow}>
            {days.map((day, index) => (
              <DayCircle key={index} day={day} isActive={index === 0} />
            ))}
          </View>
        </View>

        <PracticeCard />

        <View style={styles.section}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            Jump back in
          </Text>
          <LessonCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 32,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 36,
    color: "#000",
  },
  streakContainer: {
    marginVertical: 16,
  },
  streakText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 16,
    marginBottom: 12,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    color: "#000",
    marginBottom: 16,
  },
});
