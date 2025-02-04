import { Image } from "expo-image";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";

const ContentImage = memo(
  ({
    uri,
    customHeight,
    customWidth,
  }: {
    customHeight?: number;
    customWidth?: number | "100%";
    uri: string;
  }) => (
    <View style={styles.imageContainer}>
      <Image
        style={[
          styles.image,
          { height: customHeight ?? 200, width: customWidth ?? "100%" },
        ]}
        source={{ uri }}
        contentFit="contain"
        transition={200}
        cachePolicy="memory-disk"
      />
    </View>
  )
);

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: 200,
  },
});

export default ContentImage;
