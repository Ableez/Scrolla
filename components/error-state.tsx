import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "./ThemedView";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

const ErrorState = ({
  title,
  message,
  onBack,
}: {
  title: string;
  message: string;
  onBack: () => void;
}) => (
  <ThemedView>
    <SafeAreaView style={styles.errorContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <FontAwesome6 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FontAwesome6 name="circle-exclamation" size={64} color="#94a3b8" />
        <Text style={styles.errorTitle}>{title}</Text>
        <Text style={styles.errorMessage}>{message}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </ThemedView>
);

export default ErrorState;

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 24,
    marginBottom: 8,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});
