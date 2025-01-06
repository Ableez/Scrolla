import { Triangle } from "lucide-react-native";
import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const CarouselContent = ({
  images,
  showDots = false,
}: {
  showDots?: boolean;
  images: string[];
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderDotIndicators = () => {
    return (
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image src={images[activeIndex]} style={styles.image} />
      {showDots && renderDotIndicators()}

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginTop: 24,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            if (activeIndex > 0) {
              setActiveIndex((p) => p - 1); // Fixed: Use proper decrement
            }
          }}
          style={{
            backgroundColor: activeIndex === 0 ? "#00000044" : "#000",
            width: 44,
            height: 40,
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.6}
          disabled={activeIndex === 0}
        >
          <Triangle
            size={20}
            color="#fff"
            fill={"#fff"}
            style={{ transform: [{ rotate: "270deg" }], marginRight: 2 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (activeIndex < images.length - 1) {
              // Fixed: Correct boundary check
              setActiveIndex((p) => p + 1); // Fixed: Use proper increment
            }
          }}
          style={{
            backgroundColor:
              activeIndex >= images.length - 1 ? "#00000044" : "#000", // Fixed: Boundary check
            width: 44,
            height: 40,
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.6}
          disabled={activeIndex >= images.length - 1} // Fixed: Boundary check
        >
          <Triangle
            size={20}
            color="#fff"
            fill={"#fff"}
            style={{ transform: [{ rotate: "90deg" }], marginRight: -2 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "#00000011",
    borderRadius: 14,
  },
  itemContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  image: {
    width: "100%",
    height: 80,
    borderRadius: 10,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  inactiveDot: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});

export default CarouselContent;
