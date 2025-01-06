import React, { useCallback, RefObject, useMemo, ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Text from "./text";
import BouncyButton from "./bouncy-button";
import { ContentType } from "./course-screen/lesson-node";
import RectangleProgress from "./swipe-screen/rect-progress";
import Svg, { Path } from "react-native-svg";
import { primary_blue } from "@/constants/Colors";

const BottomSheet = ({
  bottomSheetRef,
  content,
  children,
  setContent,
}: {
  bottomSheetRef: RefObject<BottomSheetModal>;
  children?: ReactNode;
  content?: ContentType;
  setContent?: (opt: ContentType) => void;
}) => {
  const snapPoints = useMemo(() => ["30%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={"close"}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={{ flex: 1 }}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={{ flex: 1 }}>
        {children}
        {content ? (
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
            <BouncyButton style={styles.startButton} onPress={handleClosePress}>
              <Text style={styles.buttonText}>Start Lesson</Text>
            </BouncyButton>
          </View>
        ) : null}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
    marginTop: 4,
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
});

export default BottomSheet;
