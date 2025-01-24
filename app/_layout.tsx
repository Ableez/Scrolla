import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NativeThemeProvider,
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
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { migrate, useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../storage/drizzle/migrations";
import { View, useColorScheme } from "react-native";
import Text from "@/components/text";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/utils/cache";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

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

  useDrizzleStudio(localDB);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      SplashScreen.setOptions({ fade: true });
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

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
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
              <GestureHandlerRootView>
                <BottomSheetModalProvider>
                  <ThemeProvider>
                    <CardSlideProvider>
                      <NativeThemeProvider value={DefaultTheme}>
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
                          <Stack.Screen
                            name="(auth)/sign-in"
                            options={{
                              headerShown: false,
                              animation: "slide_from_left",
                            }}
                          />
                          <Stack.Screen
                            name="(auth)/sign-up"
                            options={{
                              headerShown: false,
                              animation: "slide_from_left",
                            }}
                          />
                          <Stack.Screen
                            name="(auth)/forgot-password"
                            options={{
                              headerShown: false,
                            }}
                          />
                          <Stack.Screen
                            name="(auth)/profile"
                            options={{
                              headerShown: false,
                            }}
                          />
                          <Stack.Screen
                            name="(auth)/personal-information"
                            options={{
                              headerShown: false,
                            }}
                          />

                          <Stack.Screen
                            name="morse-rewards"
                            options={{
                              headerShown: false,
                            }}
                          />

                          <Stack.Screen name="+not-found" />
                        </Stack>
                      </NativeThemeProvider>
                      <StatusBar style={theme === "dark" ? "light" : "dark"} />
                    </CardSlideProvider>
                  </ThemeProvider>
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </SQLiteProvider>
          </Suspense>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
