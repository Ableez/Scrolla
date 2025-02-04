import { Dimensions, Image, StyleSheet, View } from "react-native";
import React from "react";
import Text from "#/components/text";
import { SafeAreaView } from "react-native-safe-area-context";
import BouncyButton from "#/components/bouncy-button";

const GetStarted = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: Dimensions.get("screen").height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Image
            source={{ uri: "../../assets/images/circle_logo.png" }}
            style={{ width: 200, height: 200 }}
          />
          <Text weight={"bold"} style={{ fontSize: 36 }}>
            Interactive problem solving that’s effective and fun.
          </Text>
        </View>

        <View>
          <BouncyButton>
            <Text>Sign up free</Text>
          </BouncyButton>
          <BouncyButton style={{ padding: 18, borderWidth: 1 }}>
            <Text>Continue with Google</Text>
          </BouncyButton>
          <BouncyButton style={{ padding: 18, borderWidth: 1 }}>
            <Text>Continue with Facebook</Text>
          </BouncyButton>
          <BouncyButton style={{ padding: 18, borderWidth: 1 }}>
            <Text>Continue with Apple</Text>
          </BouncyButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({});
