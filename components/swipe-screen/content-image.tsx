import React from "react";
import { StyleSheet, View, Image } from "react-native";

const baseStyles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  imageSmall: {
    maxWidth: 220,
    maxHeight: 150,
  },
  imageTall: {
    maxWidth: 200,
    maxHeight: 300,
  },
  imageLarge: {
    maxWidth: 300,
    maxHeight: 300,
  },
  imageFull: {
    maxWidth: 600,
    maxHeight: 400,
  },
});

const ContentImage = ({
  uri,
  size = "small",
  customWidth,
  customHeight,
}: {
  uri: string;
  size?: "small" | "tall" | "large" | "full";
  customWidth?: number | string;
  customHeight?: number;
}) => {
  const [aspectRatio, setAspectRatio] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (uri) {
      Image.getSize(
        uri,
        (width, height) => {
          setAspectRatio(width / height);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error loading image:", error);
          setIsLoading(false);
        }
      );
    }
  }, [uri]);

  const sizePresets = {
    small: baseStyles.imageSmall,
    tall: baseStyles.imageTall,
    large: baseStyles.imageLarge,
    full: baseStyles.imageFull,
  };

  const getImageDimensions = (): {
    width: number;
    height: number;
    aspectRatio?: number;
  } => {
    if (customWidth && customHeight) {
      return {
        width: typeof customWidth === "number" ? customWidth : 0,
        height: customHeight,
      };
    }

    const preset = sizePresets[size];

    if (size === "full") {
      return { width: 0, height: 0, aspectRatio };
    }

    const maxWidth = preset.maxWidth;
    const maxHeight = preset.maxHeight;

    if (aspectRatio > 1) {
      return {
        width: maxWidth,
        height: maxWidth / aspectRatio,
      };
    } else {
      return {
        width: maxHeight * aspectRatio,
        height: maxHeight,
      };
    }
  };

  if (isLoading) {
    return (
      <View style={baseStyles.imageContainer}>
        <View style={[sizePresets[size], { backgroundColor: "#f0f0f0" }]} />
      </View>
    );
  }

  return (
    <View style={baseStyles.imageContainer}>
      <Image
        source={{ uri }}
        style={{
          resizeMode: "contain",
          width: getImageDimensions().width,
          height: getImageDimensions().height,
        }}
      />
    </View>
  );
};

export default ContentImage;
