import React, { memo, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Plus,
  Mic,
  Globe,
  AudioLines,
  XIcon,
  AlignLeft,
  AlignRight,
  AlignCenter,
  ArrowUpRightIcon,
} from "lucide-react-native";
import { primary_blue, primaryColor } from "#/constants/Colors";
import Text from "../text";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../drawer";
import { LinearGradient } from "expo-linear-gradient";
import { FlashList } from "@shopify/flash-list";
import BouncyButton from "../bouncy-button";
import Svg, { Path } from "react-native-svg";

interface MessageInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAttachmentPress: () => void;
  onMicPress: () => void;
  onGlobePress: () => void;
  onSendPress: () => void;
}

const MessageInput = memo(
  ({
    value,
    onChangeText,
    onAttachmentPress,
    onMicPress,
    onGlobePress,
    onSendPress,
  }: MessageInputProps) => {
    const inputRef = useRef<TextInput>(null);

    return (
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={onAttachmentPress}
            style={styles.iconButton}
          >
            <Plus size={24} color={"#555"} />
          </TouchableOpacity>
        </View>

        {/* <Drawer snapPoints={["100%"]}>
          <DrawerTrigger style={{ flex: 1 }}>
            <View
              style={{
                borderWidth: 1,
                height: 30,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                borderColor: "transparent",
              }}
            >
              <Text color={"#888"} weight="medium" style={{ fontSize: 14 }}>
                Ask anything...
              </Text>
            </View>
          </DrawerTrigger>

          <DrawerContent>
            <View style={{ position: "relative", height: "100%" }}>
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingTop: 16,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: 80,
                    padding: 8,
                    borderRadius: 36,
                    backgroundColor: "#009eed11",
                    paddingHorizontal: 12,
                  }}
                >
                  <Text weight="medium" style={{ fontSize: 15 }}>
                    Focus
                  </Text>
                  <AlignCenter size={16} strokeWidth={2.5} color={"#555"} />
                </TouchableOpacity>
              </View>
              <LinearGradient
                colors={["#fff", "#fff", "rgba(255, 255, 255, 0)"]}
                style={{
                  position: "absolute",
                  top: 70,
                  left: 0,
                  width: Dimensions.get("screen").width,
                  height: 24,
                  zIndex: 999,
                }}
              />
              <View style={{ padding: 14, paddingTop: 22 }}>
                <TextInput
                  placeholder={"Ask anything..."}
                  style={{
                    width: "100%",
                    borderBottomWidth: 1,
                    borderColor: "#ccc",
                    fontSize: 26,
                  }}
                  multiline={true}
                  numberOfLines={4}
                  cursorColor={"#000"}
                  autoFocus={true}
                  onChangeText={(e) => onChangeText(e)}
                  value={value}
                  submitBehavior="blurAndSubmit"
                  ref={inputRef}
                />
              </View>

              <ScrollView style={{ maxHeight: "80%" }}>
                <FlashList
                  data={[
                    "What are the best resources for mastering calculus concepts?",
                    "How do I improve my lab techniques for biology experiments?",
                    "How do I find the derivative of a function using the chain rule?",
                    "What techniques can I use for evaluating definite and indefinite integrals?",
                    "How do I apply the mean value theorem in practical scenarios?",
                    "What are the applications of calculus in physics, particularly in motion analysis?",
                  ]}
                  estimatedItemSize={200}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        onChangeText(item);
                        inputRef.current?.focus();
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          paddingHorizontal: 16,
                          paddingVertical: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          style={{ fontSize: 14, flex: 0.9, color: "#333" }}
                          weight="medium"
                        >
                          {item}
                        </Text>
                        <ArrowUpRightIcon size={16} color={"#aaa"} />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </ScrollView>
            </View>
          </DrawerContent>
        </Drawer> */}

        <TextInput
          placeholder="Ask anything..."
          onChangeText={(t) => onChangeText(t)}
          style={{
            borderWidth: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            borderColor: "transparent",
            flex: 1,
            height: "100%",
            fontSize: 16,
            fontWeight: "600",
          }}
          multiline
          numberOfLines={6}
          cursorColor={"#000"}
        />

        <View style={styles.rightIcons}>
          <Drawer snapPoints={["35%"]}>
            <DrawerTrigger onPress={onSendPress}>
              <View style={styles.iconButton}>
                <AudioLines size={24} strokeWidth={2.5} color={primaryColor} />
              </View>
            </DrawerTrigger>
            <DrawerContent>
              <View
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 350,
                    position: "absolute",
                    bottom: -120,
                    backgroundColor: primary_blue[0] + "22",
                    borderRadius: 140,
                    padding: 30,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 350,
                      backgroundColor: primary_blue[0] + "33",
                      borderRadius: 140,
                      padding: 36,
                      shadowOffset: {
                        height: 4,
                        width: 4,
                      },
                      shadowColor: "#fff",
                      elevation: 10,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 350,
                        backgroundColor: primary_blue[0] + "44",
                        borderRadius: 140,
                        padding: 36,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        shadowOffset: {
                          height: 4,
                          width: 4,
                        },
                        shadowColor: "#fff",
                        elevation: 10,
                      }}
                    >
                      <BouncyButton
                        style={{
                          padding: 20,
                          backgroundColor: primary_blue[0],
                          aspectRatio: 1,
                          width: 86,
                          borderRadius: 100,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill={"#fff"}
                        >
                          <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <Path d="M19 9a1 1 0 0 1 1 1a8 8 0 0 1 -6.999 7.938l-.001 2.062h3a1 1 0 0 1 0 2h-8a1 1 0 0 1 0 -2h3v-2.062a8 8 0 0 1 -7 -7.938a1 1 0 1 1 2 0a6 6 0 0 0 12 0a1 1 0 0 1 1 -1m-7 -8a4 4 0 0 1 4 4v5a4 4 0 1 1 -8 0v-5a4 4 0 0 1 4 -4" />
                        </Svg>
                      </BouncyButton>
                    </View>
                  </View>
                </View>
              </View>
            </DrawerContent>
          </Drawer>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeeee88",
    paddingHorizontal: 8,
    borderRadius: 26,
    margin: 12,
    gap: 2,
  },
  iconButton: {
    padding: 6,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default MessageInput;
