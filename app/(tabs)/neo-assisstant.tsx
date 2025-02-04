import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Header from "#/components/neo-ai/header";
import useTheme from "#/hooks/useTheme";
import MessageInput from "#/components/neo-ai/input";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "#/components/text";
import InfiniteScrollFlashList from "../../components/neo-ai/infinite-scroll";
import { FlashList } from "@shopify/flash-list";
import ActionButton from "#/components/neo-ai/action-button";

const actions = [
  {
    label: "➕ Solve for x",
    onPress: () => {
      console.log("Solving for x");
    },
  },
  {
    label: "📐 Quadratic Formula",
    onPress: () => {
      console.log("Explaining quadratic formula");
    },
  },
  {
    label: "📈 Find Derivative",
    onPress: () => {
      console.log("Finding derivative");
    },
  },
  {
    label: "🔵 Area of Circle",
    onPress: () => {
      console.log("Calculating area of circle");
    },
  },
  {
    label: "➗ Long Division",
    onPress: () => {
      console.log("Performing long division");
    },
  },
  {
    label: "🌉 Bridge Design",
    onPress: () => {
      console.log("Discussing bridge design principles");
    },
  },
  {
    label: "🧱 Best Materials",
    onPress: () => {
      console.log("Analyzing best materials for construction");
    },
  },
  {
    label: "💧 Fluid Dynamics",
    onPress: () => {
      console.log("Explaining fluid dynamics concepts");
    },
  },
  {
    label: "📏 Load Capacity",
    onPress: () => {
      console.log("Calculating load capacity");
    },
  },
  {
    label: "☀️ Solar Efficiency",
    onPress: () => {
      console.log("Discussing solar panel efficiency");
    },
  },
  {
    label: "🔍 Binary Search",
    onPress: () => {
      console.log("Implementing binary search algorithm");
    },
  },
  {
    label: "🔄 Explain Recursion",
    onPress: () => {
      console.log("Explaining concept of recursion");
    },
  },
  {
    label: "⏱️ Big O Notation",
    onPress: () => {
      console.log("Discussing Big O notation");
    },
  },
  {
    label: "🗑️ Garbage Collection",
    onPress: () => {
      console.log("Explaining garbage collection in programming");
    },
  },
  {
    label: "🔀 Sorting Algorithms",
    onPress: () => {
      console.log("Comparing different sorting algorithms");
    },
  },
  {
    label: "📊 Data Structures",
    onPress: () => {
      console.log("Discussing various data structures");
    },
  },
  {
    label: "🧮 Matrix Operations",
    onPress: () => {
      console.log("Performing matrix operations");
    },
  },
  {
    label: "🔢 Number Theory",
    onPress: () => {
      console.log("Exploring number theory concepts");
    },
  },
  {
    label: "🌡️ Thermodynamics",
    onPress: () => {
      console.log("Explaining thermodynamics principles");
    },
  },
  {
    label: "⚡ Circuit Analysis",
    onPress: () => {
      console.log("Analyzing electrical circuits");
    },
  },
];

const HomeScreen = () => {
  const [message, setMessage] = useState("");
  const { colors } = useTheme();

  const handleGetPlus = useCallback(() => {
    // Implement Get Plus functionality
  }, []);

  const handleCreateImage = useCallback(() => {
    // Implement Create Image functionality
  }, []);

  const handleHelpWrite = useCallback(() => {
    // Implement Help Write functionality
  }, []);

  const handleCode = useCallback(() => {
    // Implement Code functionality
  }, []);

  const handleMakePlan = useCallback(() => {
    // Implement Make Plan functionality
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onMenuPress={() => {}}
        onGetPlusPress={handleGetPlus}
        onEditPress={() => {}}
        onMorePress={() => {}}
      />

      <View style={styles.content}>
        <Text weight="semiBold" style={styles.title}>
          What can I help with?
        </Text>

        <View style={{ height: 120 }}>
          <FlashList
            data={actions}
            estimatedItemSize={50}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ActionButton label={item.label} onPress={item.onPress} />
            )}
            contentContainerStyle={{ padding: 16 }}
          />
        </View>
        {/* <InfiniteScrollFlashList actions={actions} /> */}
      </View>

      <MessageInput
        value={message}
        onChangeText={setMessage}
        onAttachmentPress={() => {}}
        onMicPress={() => {}}
        onGlobePress={() => {}}
        onSendPress={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 24,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
});

export default HomeScreen;
