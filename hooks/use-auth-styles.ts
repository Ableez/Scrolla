// hooks/useAuthStyles.ts
import { StyleSheet } from "react-native";
import { useMemo } from "react";
import { primary_blue, primaryColor } from "#/constants/Colors";

export const useAuthStyles = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          paddingHorizontal: 24,
        },
        header: {
          fontSize: 32,
          marginBottom: 32,
          marginTop: 20,
          textAlign: "center",
        },
        form: {
          gap: 16,
        },
        input: {
          padding: 16,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#e2e8f0",
          borderRadius: 20,
          backgroundColor: "#f8fafc",
        },
        inputError: {
          borderColor: "#ef4444",
        },
        button: {
          padding: 16,
          backgroundColor: primary_blue[0],
          borderWidth: 2,
          borderBottomWidth: 6,
          borderColor: primary_blue[1],
          borderRadius: 36,
          marginTop: 8,
        },
        buttonDisabled: {
          backgroundColor: "#ccc",
          borderColor: "#bbb",
        },
        buttonText: {
          fontSize: 16,
          color: "#fff",
          textAlign: "center",
        },
        link: {
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
          marginTop: 24,
        },
        linkText: {
          color: "#000",
          textDecorationLine: "underline",
        },
        errorText: {
          color: "#ef4444",
          fontSize: 14,
          marginTop: 4,
        },
        codeInput: {
          letterSpacing: 24,
          fontSize: 28,
          padding: 16,
        },
        resendButton: {
          marginTop: 16,
        },
        resendText: {
          textAlign: "center",
          color: "#64748b",
        },
      }),
    []
  );
};
