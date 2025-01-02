import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { THEME_STORAGE_KEY, ThemeProvider } from "@/contexts/ThemeContext";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NavigationThemeProvider
          value={theme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="course/[_courseId]"
              options={{ headerShown: false, animation: "simple_push" }}
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
        </NavigationThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
