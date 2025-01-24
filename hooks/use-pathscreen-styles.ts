import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const usePathscreenStyles = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff",
        },
        backButton: {
          padding: 16,
        },
        imageContainer: {
          position: "relative",
          height: 135,
          justifyContent: "flex-end",
          alignItems: "center",
        },
        imageBackground: {
          position: "absolute",
          width: "100%",
          height: "100%",
        },
        backdropImage: {
          width: "100%",
          height: 135,
          resizeMode: "cover",
          opacity: 0.22,
        },
        gradientOverlay: {
          width: "100%",
          height: 20,
          position: "absolute",
          bottom: 0,
          left: 0,
        },
        gradientOverlayBottom: {
          width: "100%",
          height: 10,
          position: "absolute",
          bottom: 0,
          left: 0,
        },
        courseImage: {
          width: 115,
          height: 115,
          resizeMode: "cover",
        },
        headerContent: {
          paddingHorizontal: 16,
          paddingTop: 10,
        },
        headerTitle: {
          fontSize: 32,
        },
        headerDescription: {
          fontSize: 16,
          marginTop: 4,
        },
        actionButton: {
          paddingVertical: 12,
          marginTop: 16,
          borderRadius: 100,
        },
        actionButtonText: {
          fontSize: 17,
          textAlign: "center",
        },
        levelContainer: {
          paddingTop: 16,
          paddingHorizontal: 20,
          marginBottom: 20,
        },
        levelHeader: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          gap: 8,
          paddingHorizontal: 10,
          marginBottom: 16,
        },
        levelNumber: {
          fontSize: 44,
        },
        levelLabel: {
          fontSize: 12,
          marginTop: -8,
        },
        levelTitleContainer: {
          marginLeft: 12,
          flex: 1,
        },
        levelTitle: {
          fontSize: 22,
        },
        courseItem: {
          padding: 18,
          borderWidth: 1,
          borderBottomWidth: 5,
          borderColor: "#ddd",
          borderRadius: 24,
          marginTop: 16,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        },
        courseThumb: {
          width: 48,
          height: 48,
          resizeMode: "cover",
        },
        courseTitle: {
          fontSize: 16,
          width: 200,
        },
        separator: {
          height: 1,
          width: "70%",
          marginHorizontal: "auto",
        },
      }),
    []
  );
};
