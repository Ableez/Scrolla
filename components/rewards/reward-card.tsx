import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Offer } from "./types";
import Text from "../text";

interface OfferCardProps {
  offer: Offer;
  onApply: (code: string) => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, onApply }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.sidebar, { backgroundColor: "#ff6000" }]}>
        <Text style={styles.sidebarText}>{offer.type}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={{ uri: offer.brandLogo }} style={styles.logo} />
          <Text style={styles.code}>{offer.code}</Text>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => onApply(offer.code)}
          >
            <Text style={styles.applyButtonText}>APPLY</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.terms}>{offer.terms}</Text>
        {offer.additionalInfo && <Text style={styles.more}>+ MORE</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  sidebar: {
    width: 60,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sidebarText: {
    color: "#fff",
    fontWeight: "600",
    // writingMode: "vertical-rl",
    // textOrientation: "mixed",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  code: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  applyButton: {
    padding: 8,
  },
  applyButtonText: {
    color: "#ff6000",
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    color: "#00b300",
    marginBottom: 8,
  },
  terms: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  more: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
