import React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { PracticeCard } from "#/components/home-screen/practice-card";
import { LessonCard } from "#/components/home-screen/lesson-card";
import Text from "#/components/text";
import DaysRow from "#/components/home-screen/day-circle";
import { Drawer, DrawerContent, DrawerTrigger } from "#/components/drawer";
import Svg, { Path } from "react-native-svg";
import { FlashList } from "@shopify/flash-list";
import ProfileButton from "#/components/home-screen/profile-button";
import useTheme from "#/hooks/useTheme";

export default function App() {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme === "dark" ? "#000" : "#fff",
      }}
    >
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 16,
            paddingTop: 12,
          }}
        >
          <ProfileButton />

          <Drawer>
            <DrawerTrigger
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                borderWidth: 2,
                marginRight: 22,
                borderRadius: 100,
                paddingLeft: 20,
                paddingRight: 10,
                borderColor: "#ccc",
                borderBottomWidth: 6,
              }}
            >
              <Text weight="medium">1</Text>
              <Svg width="29" height="29" viewBox="0 0 24 24" fill={"#ccc"}>
                <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <Path d="M13 2l.018 .001l.016 .001l.083 .005l.011 .002h.011l.038 .009l.052 .008l.016 .006l.011 .001l.029 .011l.052 .014l.019 .009l.015 .004l.028 .014l.04 .017l.021 .012l.022 .01l.023 .015l.031 .017l.034 .024l.018 .011l.013 .012l.024 .017l.038 .034l.022 .017l.008 .01l.014 .012l.036 .041l.026 .027l.006 .009c.12 .147 .196 .322 .218 .513l.001 .012l.002 .041l.004 .064v6h5a1 1 0 0 1 .868 1.497l-.06 .091l-8 11c-.568 .783 -1.808 .38 -1.808 -.588v-6h-5a1 1 0 0 1 -.868 -1.497l.06 -.091l8 -11l.01 -.013l.018 -.024l.033 -.038l.018 -.022l.009 -.008l.013 -.014l.04 -.036l.028 -.026l.008 -.006a1 1 0 0 1 .402 -.199l.011 -.001l.027 -.005l.074 -.013l.011 -.001l.041 -.002z" />
              </Svg>
            </DrawerTrigger>
            <DrawerContent>
              <View>
                <Text>Hello</Text>
              </View>
            </DrawerContent>
          </Drawer>
        </View>

        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>
            Solve 3 problems to start a streak
          </Text>
          <DaysRow />
        </View>

        <PracticeCard />

        <View style={styles.section}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            Jump back in
          </Text>
          <FlashList
            data={Array.from(Array(10).keys())}
            renderItem={() => <LessonCard />}
            estimatedItemSize={200}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: 36,
    padding: 16,
  },
  streakContainer: {
    marginBottom: 16,
  },
  streakText: {
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 12,
  },
  section: {
    marginTop: 24,
    height: 600,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    paddingHorizontal: 24,
  },
});
