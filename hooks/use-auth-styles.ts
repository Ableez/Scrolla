// hooks/useAuthStyles.ts
import { StyleSheet } from "react-native";
import { useMemo } from "react";

export const useAuthStyles = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          paddingHorizontal: 24,
          backgroundColor: "#fff",
        },
        header: {
          fontSize: 32,
          marginBottom: 32,
          marginTop: 12,
        },
        form: {
          gap: 16,
        },
        input: {
          padding: 16,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#e2e8f0",
          borderRadius: 12,
          backgroundColor: "#f8fafc",
        },
        inputError: {
          borderColor: "#ef4444",
        },
        button: {
          padding: 16,
          backgroundColor: "#000",
          borderRadius: 12,
          marginTop: 8,
        },
        buttonDisabled: {
          backgroundColor: "#94a3b8",
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
          fontSize: 24,
          textAlign: "center",
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
