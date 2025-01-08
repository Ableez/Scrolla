import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { primary_orange } from "@/constants/Colors";
import BouncyButton from "@/components/bouncy-button";
import { ChevronRight } from "lucide-react-native";
import Text from "@/components/text";

const dummyUser = {
  username: "Jdoe1",
  handle: "@jdoe1501",
  avatarUrl: "https://example.com/avatar.jpg",
  profileCompletion: 10,
  yuBucksBalance: 10,
  isVerified: true,
  friendsCount: 2,
};

const UserProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <BouncyButton>
            <Feather name="chevron-left" size={24} color="black" />
          </BouncyButton>
          <View style={styles.coinBalance}>
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={primary_orange[0]}
            >
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M13 2l.018 .001l.016 .001l.083 .005l.011 .002h.011l.038 .009l.052 .008l.016 .006l.011 .001l.029 .011l.052 .014l.019 .009l.015 .004l.028 .014l.04 .017l.021 .012l.022 .01l.023 .015l.031 .017l.034 .024l.018 .011l.013 .012l.024 .017l.038 .034l.022 .017l.008 .01l.014 .012l.036 .041l.026 .027l.006 .009c.12 .147 .196 .322 .218 .513l.001 .012l.002 .041l.004 .064v6h5a1 1 0 0 1 .868 1.497l-.06 .091l-8 11c-.568 .783 -1.808 .38 -1.808 -.588v-6h-5a1 1 0 0 1 -.868 -1.497l.06 -.091l8 -11l.01 -.013l.018 -.024l.033 -.038l.018 -.022l.009 -.008l.013 -.014l.04 -.036l.028 -.026l.008 -.006a1 1 0 0 1 .402 -.199l.011 -.001l.027 -.005l.074 -.013l.011 -.001l.041 -.002z" />
            </Svg>
            <Text style={styles.coinText}>{dummyUser.yuBucksBalance}</Text>
          </View>
          <BouncyButton>
            <Feather name="settings" size={24} color="black" />
          </BouncyButton>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://github.com/shadcn.png" }}
              style={styles.avatar}
            />
            <View style={styles.progressRing}>
              <Text style={styles.progressText}>
                {dummyUser.profileCompletion}%
              </Text>
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{dummyUser.username}</Text>
            <Text style={styles.handle}>{dummyUser.handle}</Text>
          </View>
        </View>

        <BouncyButton style={styles.completeProfile}>
          <Feather name="edit-2" size={20} color="black" />
          <Text style={styles.completeProfileText}>Complete your profile</Text>
          <Text style={styles.seeMore}>See more</Text>
        </BouncyButton>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/011/299/243/non_2x/gold-medal-championship-cup-3d-illustration-3d-rendering-png.png",
            }}
            width={64}
            height={64}
          />
          <View>
            <Text style={{ fontSize: 14 }}>You position</Text>
            <Text weight="semiBold" style={{ fontSize: 24 }}>
              Silver
            </Text>
          </View>
        </View>

        <View>
          <BouncyButton
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingHorizontal: 20,
              gap: 14,
              paddingVertical: 16,
            }}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="#555">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
              <Path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
            </Svg>
            <Text style={{ fontSize: 16 }}>Personal information</Text>

            <ChevronRight
              size={24}
              color={"#999"}
              style={{ position: "absolute", top: "75%", right: 20 }}
            />
          </BouncyButton>
          <BouncyButton
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingHorizontal: 20,
              gap: 14,
              paddingVertical: 16,
            }}
          >
            <Svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M9 3h6l3 7l-6 2l-6 -2z" />
              <Path d="M12 12l-3 -9" />
              <Path d="M15 11l-3 -8" />
              <Path d="M12 19.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z" />
            </Svg>
            <Text style={{ fontSize: 16 }}>Morse Rewards</Text>

            <ChevronRight
              size={24}
              color={"#999"}
              style={{ position: "absolute", top: "75%", right: 20 }}
            />
          </BouncyButton>
          <BouncyButton
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingHorizontal: 20,
              gap: 14,
              paddingVertical: 16,
            }}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="#555">
              <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <Path d="M22 10v6a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-6h20zm-14.99 4h-.01a1 1 0 1 0 .01 2a1 1 0 0 0 0 -2zm5.99 0h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2zm5 -10a4 4 0 0 1 4 4h-20a4 4 0 0 1 4 -4h12z" />
            </Svg>
            <Text style={{ fontSize: 16 }}>Payments and subscription</Text>

            <ChevronRight
              size={24}
              color={"#999"}
              style={{ position: "absolute", top: "75%", right: 20 }}
            />
          </BouncyButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  coinBalance: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 8,
    borderRadius: 16,
  },
  coinIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  coinText: {
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  progressRing: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  profileInfo: {
    alignItems: "center",
    marginTop: 12,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  handle: {
    fontSize: 16,
    color: "#666",
  },
  completeProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F5F5F5",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
  },
  completeProfileText: {
    fontWeight: "bold",
    flex: 1,
    marginLeft: 8,
  },
  seeMore: {
    color: "#666",
  },
  connectionCard: {
    margin: 16,
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
  },
  appleIdSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  appleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  connectedText: {
    fontWeight: "bold",
  },
  appleIdText: {
    color: "#666",
  },
  claimButton: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  claimButtonText: {
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  listItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  listItemText: {
    marginLeft: 12,
    fontSize: 16,
  },
  listItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItemValue: {
    marginRight: 8,
    fontWeight: "bold",
  },
});

export default UserProfileScreen;
