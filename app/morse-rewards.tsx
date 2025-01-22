import { Footer } from "@/components/rewards/footer";
import { Header } from "@/components/rewards/header";
import { CouponInput } from "@/components/rewards/input";
import { OfferCard } from "@/components/rewards/reward-card";
import { CartDetails, Offer } from "@/components/rewards/types";
import Text from "@/components/text";
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

interface CouponsScreenProps {
  cartDetails: CartDetails;
  offers: Offer[];
  onBackPress: () => void;
  onApplyCoupon: (code: string) => void;
}

export const CouponsScreen: React.FC<CouponsScreenProps> = ({
  cartDetails,
  offers,
  onBackPress,
  onApplyCoupon,
}) => {
  return (
    <View style={styles.container}>
      <Header cartDetails={cartDetails} onBackPress={onBackPress} />
      <ScrollView>
        <CouponInput onApply={onApplyCoupon} />
        <View style={styles.offersSection}>
          <Text style={styles.offersTitle}>More offers</Text>
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} onApply={onApplyCoupon} />
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  offersSection: {
    paddingVertical: 16,
  },
  offersTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
    marginBottom: 16,
  },
});
