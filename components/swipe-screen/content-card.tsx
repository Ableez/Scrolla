import React, { useCallback } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import CarouselContent from "./carousel";
import ContentImage from "./content-image";
import { CardContentType } from "#/_mock_/swipe-data";
import { ContentText } from "./card-components/card-text";
import { baseStyles } from "./base-styles";
import { Expression } from "./card-components/card-expression";
import { Options } from "./card-components/card-options";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export const CardContent = ({ content }: { content: CardContentType }) => {
  const renderItems = useCallback(
    () =>
      content.elements.map((element, index) => {
        switch (element.type) {
          case "text":
            return (
              <ContentText
                key={index}
                variant={element.variant}
                content={element.content}
                bottomSpace={element.bottomSpace}
                topSpace={element.topSpace}
              />
            );
          case "image":
            return (
              <ContentImage
                customHeight={element.height}
                customWidth={element.width}
                key={index}
                uri={element.uri}
              />
            );
          case "expression":
            return (
              <Expression
                displayMode={element.displayMode}
                key={index}
                latex={element.latex}
              />
            );
          case "options":
            return <Options key={index} element={element} />;
          case "carousel":
            return (
              <CarouselContent
                key={index}
                images={element.images}
                showDots={element.showDots}
              />
            );
          default:
            return null;
        }
      }),
    []
  );

  return (
    <View style={styles.itemContainer}>
      <View style={[styles.item]}>
        <View style={baseStyles.container}>{renderItems()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  item: {
    width: "90%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#00000033",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.4,
    elevation: 10,
  },
});
