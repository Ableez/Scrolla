import { createContext, useEffect, useMemo, useState } from "react";
import { useColorScheme as useNativeColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Colors";

type ThemeType = "light" | "dark";
type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => Promise<void>;
  colors: typeof Colors.light;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const THEME_STORAGE_KEY = "@theme";

export function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const systemColorScheme = useNativeColorScheme();
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme ?? "light");

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((storedTheme) => {
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    });
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      colors: Colors[theme],
    }),
    [theme, toggleTheme]
  ); // Add dependencies to useMemo

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
