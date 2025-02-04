import { StyleSheet, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { XIcon } from "lucide-react-native";
import Text from "../text";
import RectangleProgress from "./rect-progress";
import { router } from "expo-router";
import { useCardSlideState } from "#/contexts/SlideStoreProvider";

const TopNav = () => {
  const progress = useCardSlideState((s) => s.progress);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 16,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 40,
        shadowColor: "#17171766",
        shadowOffset: { width: -2, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 3,
        elevation: 20,
      }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <XIcon size={24} color={"#000"} />
      </TouchableOpacity>
      <RectangleProgress progress={progress} width={200} height={10} />
      <View>
        <Text weight="semiBold" style={{ fontSize: 24, lineHeight: 24 }}>
          0
        </Text>
      </View>
    </View>
  );
};

export default TopNav;

const styles = StyleSheet.create({});
