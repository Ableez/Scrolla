import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { primary_blue } from "#/constants/Colors";
import Text from "../text";
import Svg, { Path } from "react-native-svg";
import BouncyButton from "../bouncy-button";

interface HeaderProps {
  onMenuPress: () => void;
  onGetPlusPress: () => void;
  onEditPress: () => void;
  onMorePress: () => void;
}

const Header = memo(
  ({ onMenuPress, onGetPlusPress, onEditPress, onMorePress }: HeaderProps) => {
    return (
      <View style={styles.container}>
        <BouncyButton onPress={onGetPlusPress} style={styles.getPlusButton}>
          <Svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <Path d="M6 5h12l3 5l-8.5 9.5a.7 .7 0 0 1 -1 0l-8.5 -9.5l3 -5" />
            <Path d="M10 12l-2 -2.2l.6 -1" />
          </Svg>
          <Text weight={"medium"} style={styles.getPlusText}>
            Get Plus
          </Text>
        </BouncyButton>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BouncyButton onPress={onEditPress} style={styles.iconButton}>
            <Svg width="36" height="36" viewBox="0 0 24 24" fill="#666">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z" />
            </Svg>
          </BouncyButton>
          <BouncyButton onPress={onEditPress} style={styles.iconButton}>
            <Svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              stroke="#666"
              fill={"none"}
              strokeWidth={2.5}
            >
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M12 8l0 4l2 2" />
              <Path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
            </Svg>
          </BouncyButton>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingLeft: 16,
  },
  iconButton: {
    paddingRight: 18,
    paddingVertical: 16,
  },
  getPlusButton: {
    backgroundColor: primary_blue[0],
    borderWidth: 2,
    borderBottomWidth: 6,
    borderColor: primary_blue[1],
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  getPlusText: {
    color: "#fff",
    fontSize: 16,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
