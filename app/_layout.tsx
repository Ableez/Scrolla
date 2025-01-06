import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect, useState } from "react";
import "react-native-reanimated";
import { THEME_STORAGE_KEY, ThemeProvider } from "@/contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CardSlideProvider } from "@/contexts/SlideStoreProvider";
import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { migrate, useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../storage/drizzle/migrations";
import { View, useColorScheme } from "react-native";
import Text from "@/components/text";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();

export const localDB = openDatabaseSync("db2.db", {
  enableChangeListener: true,
});
export const expoDB = drizzle(localDB);

type ThemeType = "light" | "dark";

// Initialize the query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  const [loaded] = useFonts({
    IBMPlexSansBold: require("../assets/fonts/IBMPlexSans-Bold.ttf"),
    IBMPlexSansBoldItalic: require("../assets/fonts/IBMPlexSans-BoldItalic.ttf"),
    IBMPlexSansExtraLight: require("../assets/fonts/IBMPlexSans-ExtraLight.ttf"),
    IBMPlexSansExtraLightItalic: require("../assets/fonts/IBMPlexSans-ExtraLightItalic.ttf"),
    IBMPlexSansItalic: require("../assets/fonts/IBMPlexSans-Italic.ttf"),
    IBMPlexSansLight: require("../assets/fonts/IBMPlexSans-Light.ttf"),
    IBMPlexSansLightItalic: require("../assets/fonts/IBMPlexSans-LightItalic.ttf"),
    IBMPlexSansMedium: require("../assets/fonts/IBMPlexSans-Medium.ttf"),
    IBMPlexSansMediumItalic: require("../assets/fonts/IBMPlexSans-MediumItalic.ttf"),
    IBMPlexSansRegular: require("../assets/fonts/IBMPlexSans-Regular.ttf"),
    IBMPlexSansSemiBold: require("../assets/fonts/IBMPlexSans-SemiBold.ttf"),
    IBMPlexSansSemiBoldItalic: require("../assets/fonts/IBMPlexSans-SemiBoldItalic.ttf"),
    IBMPlexSansThin: require("../assets/fonts/IBMPlexSans-Thin.ttf"),
    IBMPlexSansThinItalic: require("../assets/fonts/IBMPlexSans-ThinItalic.ttf"),
  });

  const { success, error } = useMigrations(expoDB, migrations);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(systemTheme ?? "light");

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((storedTheme) => {
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    });
  }, []);

  if (!loaded) {
    return null;
  }

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Text>Loading DB...</Text>}>
        <SQLiteProvider
          databaseName="test4.db"
          onInit={async (db) => {
            await db.execAsync("PRAGMA journal_mode = WAL");
            await db.execAsync("PRAGMA foreign_keys = ON");
            migrate(
              db as unknown as ExpoSQLiteDatabase<Record<string, unknown>>,
              migrations
            );
          }}
          useSuspense
        >
          <ThemeProvider>
            <GestureHandlerRootView>
              <BottomSheetModalProvider>
                <NavigationThemeProvider
                  value={theme === "dark" ? DarkTheme : DefaultTheme}
                >
                  <CardSlideProvider>
                    <Stack>
                      <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="course/[_courseId]"
                        options={{
                          headerShown: false,
                          animation: "simple_push",
                        }}
                      />
                      <Stack.Screen
                        name="path/[pathId]"
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusBar style={theme === "dark" ? "light" : "dark"} />
                  </CardSlideProvider>
                </NavigationThemeProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </ThemeProvider>
        </SQLiteProvider>
      </Suspense>
    </QueryClientProvider>
  );
}
