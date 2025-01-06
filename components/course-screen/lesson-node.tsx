import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useRef, useState } from "react";
import { LessonSelect } from "@/server/schema.types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { primary_blue, primary_green } from "@/constants/Colors";
import Text from "../text";
import Svg, { Path } from "react-native-svg";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  useDrawer,
} from "../drawer";
import RectangleProgress from "../swipe-screen/rect-progress";
import BouncyButton from "../bouncy-button";

const customSigmoid = (x: number): number => {
  return 1 + 0.8 / (1 + Math.exp(-x / 2));
};

const getZigzagMargins = (index: number) => {
  const position = index % 6; // Get position within the 6-item cycle

  switch (position) {
    case 0:
      return {
        marginLeft: 0,
        marginRight: 0 * customSigmoid(index),
      };
    case 1:
      return {
        marginLeft: 0,
        marginRight: 70 * customSigmoid(index),
      };
    case 2:
      return {
        marginLeft: 0,
        marginRight: 50 * customSigmoid(index),
      };
    case 3:
      return {
        marginLeft: 30 * customSigmoid(index),
        marginRight: 0,
      };
    case 4:
      return {
        marginLeft: 80 * customSigmoid(index),
        marginRight: 0,
      };
    case 5:
      return {
        marginLeft: 12 * customSigmoid(index),
        marginRight: 0,
      };
    default:
      return {
        marginLeft: 0,
        marginRight: 0,
      };
  }
};

export type ContentType = {
  description: string;
  link: string;
  title: string;
  progress?: number;
};

const LessonNode = memo(
  ({ index, item }: { index: number; item: LessonSelect }) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [content, setContent] = useState<ContentType>({
      description: "",
      link: "",
      title: "",
    });

    const handlePress = useCallback((opt: ContentType) => {
      setContent(opt);
      bottomSheetRef.current?.present();
    }, []);

    return (
      <View style={styles.container}>
        <Drawer snapPoints={["30%"]}>
          <DrawerTrigger
            onPress={() =>
              handlePress({
                description: item.description,
                link: item.id,
                title: item.title,
                progress: index % 2 === 0 ? 0 : 0.32,
              })
            }
          >
            <View
              style={[
                getZigzagMargins(index),
                {
                  width: 120,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <View
                style={[
                  styles.node,
                  {
                    backgroundColor:
                      index === 0 ? primary_green[0] : "#cccccc99",
                    borderColor: index === 0 ? primary_green[1] : "#ccc",
                  },
                ]}
              >
                {item.title.toLowerCase().split(" ").includes("practice") ? (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Svg
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#bbb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <Path d="M2 12h1" />
                      <Path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2" />
                      <Path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" />
                      <Path d="M9 12h6" />
                      <Path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" />
                      <Path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2" />
                      <Path d="M22 12h-1" />
                    </Svg>
                  </View>
                ) : (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={index === 0 ? primary_green[2] : "#bbb"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <Path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                      <Path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                      <Path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                      <Path d="M4.893 4.893a1 1 0 0 1 1.32 -.083l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 0 -1.414z" />
                      <Path d="M17.693 4.893a1 1 0 0 1 1.497 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7z" />
                      <Path d="M14 18a1 1 0 0 1 1 1a3 3 0 0 1 -6 0a1 1 0 0 1 .883 -.993l.117 -.007h4z" />
                      <Path d="M12 6a6 6 0 0 1 3.6 10.8a1 1 0 0 1 -.471 .192l-.129 .008h-6a1 1 0 0 1 -.6 -.2a6 6 0 0 1 3.6 -10.8z" />
                    </Svg>
                  </View>
                )}
              </View>

              <Text
                style={{ fontSize: 14, marginTop: 4, textAlign: "center" }}
                weight="medium"
                color="#777"
              >
                {item.title}
              </Text>
            </View>
          </DrawerTrigger>
          <DrawerContent style={{ paddingInline: 16 }}>
            <View style={styles.contentContainer}>
              <Text weight="semiBold" style={{ fontSize: 20 }}>
                {content.title}
              </Text>

              <Text style={styles.description}>{content.description}</Text>

              {content.progress ? (
                <View style={{ marginBottom: 24, marginTop: 12 }}>
                  <RectangleProgress
                    width={200}
                    height={10}
                    progress={content.progress}
                  />
                </View>
              ) : (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    marginBottom: 20,
                  }}
                >
                  <Svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#999"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <Path d="M6.5 7h11" />
                    <Path d="M6.5 17h11" />
                    <Path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
                    <Path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z" />
                  </Svg>
                  <Text color="#999" style={{ fontSize: 16 }} weight="bold">
                    5 mins
                  </Text>
                </View>
              )}

              <BouncyButton style={styles.startButton}>
                <Text style={styles.buttonText}>Start Lesson</Text>
              </BouncyButton>
            </View>
          </DrawerContent>
        </Drawer>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 90,
  },
  touchable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: 92,
    height: 92,
  },
  node: {
    padding: 8,
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 2.5,
    borderBottomWidth: 8,
    outline: "2",
    outlineColor: "#fff",
  },
  startButton: {
    padding: 10,
    backgroundColor: primary_blue[0],
    borderRadius: 36,
    width: "100%",
    borderWidth: 2.5,
    borderBottomWidth: 6,
    borderColor: primary_blue[1],
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
    marginTop: 4,
  },
});

export default LessonNode;
