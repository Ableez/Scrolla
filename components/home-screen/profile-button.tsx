import { Image, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import BouncyButton from "../bouncy-button";
import { router } from "expo-router";
import Text from "../text";
import { SignedIn, useAuth, useUser } from "@clerk/clerk-expo";
import { Drawer, DrawerContent, DrawerTrigger, useDrawer } from "../drawer";
import { primary_blue, primaryColor } from "@/constants/Colors";
import Svg, { Path } from "react-native-svg";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const ProfileButton = () => {
  const { user } = useUser();
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  return (
    <Drawer snapPoints={["38%"]} customBottomSheetRef={bottomSheetRef}>
      <DrawerTrigger style={{ marginBottom: 16 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            paddingLeft: 14,
          }}
        >
          <SignedIn>
            <Image
              style={{ borderRadius: 100 }}
              source={{ uri: user?.imageUrl }}
              width={40}
              height={40}
            />
          </SignedIn>
          <Text
            weight="bold"
            style={{
              fontSize: 28,
              textTransform: "capitalize",
              width: 150,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {isLoaded && isSignedIn ? user?.username : "Sign In"}
          </Text>
        </View>
      </DrawerTrigger>
      <DrawerContent>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingHorizontal: 20,
            paddingVertical: 10,
            gap: 6,
          }}
        >
          <BouncyButton
            style={{
              padding: 10,
              backgroundColor: primary_blue[0],
              borderColor: primary_blue[1],
              borderWidth: 2,
              borderBottomWidth: 6,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            onPress={() => {
              bottomSheetRef.current?.dismiss();

              if (isLoaded && isSignedIn) {
                router.push("/profile");
              } else {
                router.push("/sign-up");
              }
            }}
          >
            <Text weight="medium" style={{ color: "#fff" }}>
              {isLoaded && isSignedIn
                ? "View profile"
                : "New here? Get Started"}
            </Text>
          </BouncyButton>
          <BouncyButton
            style={{
              padding: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderBottomWidth: 6,
              borderColor: "#eeeeee",
              borderRadius: 20,
              width: "100%",
              position: "relative",
            }}
            onPress={() => {
              bottomSheetRef.current?.dismiss();

              if (isLoaded && isSignedIn) {
                router.push("/leader-board");
              } else {
                router.push("/sign-in");
              }
            }}
          >
            <Image
              source={{
                uri: "https://www.figma.com/community/resource/9043ad92-248b-4d9c-8fb9-22d27a474316/thumbnail",
              }}
              width={40}
              height={40}
              style={{ position: "absolute", left: 20, top: "50%" }}
            />
            <Text weight="medium" style={{ color: "#666" }}>
              {isLoaded && isSignedIn
                ? "View leaderboard"
                : "Continue with Google"}
            </Text>
            <SignedIn>
              <Svg
                style={{ position: "absolute", right: 50, top: "50%" }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#EFC53C"
                stroke="#EFC53C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <Path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
              </Svg>
            </SignedIn>
          </BouncyButton>
          <BouncyButton
            style={{
              padding: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderBottomWidth: 6,
              borderColor: "#eeeeee",
              borderRadius: 20,
              width: "100%",
            }}
            onPress={() => {
              bottomSheetRef.current?.dismiss();

              if (isLoaded && isSignedIn) {
                router.push("/leader-board");
              } else {
                router.push("/sign-in");
              }
            }}
          >
            <Image
              source={{
                uri: "https://cdn.worldvectorlogo.com/logos/apple-14.svg",
              }}
              width={32}
              height={32}
            />
            <Text weight="medium" style={{ color: "#666" }}>
              {isLoaded && isSignedIn ? "Settings" : "Continue with Apple"}
            </Text>
          </BouncyButton>

          <BouncyButton
            style={{
              padding: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 12,
            }}
            onPress={() => {
              bottomSheetRef.current?.dismiss();
              if (isLoaded && isSignedIn) {
                signOut({ redirectUrl: "/sign-in" });
              } else {
                router.push("/sign-in");
              }
            }}
          >
            <Text
              weight="medium"
              style={{ color: isSignedIn ? "#eb0000" : "#222" }}
            >
              {isLoaded && isSignedIn ? "Sign out" : "Sign In"}
            </Text>
          </BouncyButton>
        </View>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({});
