import React, { memo, useCallback } from "react";
import { Dimensions, StyleSheet, View, Animated } from "react-native";
import CarouselContent from "./carousel";
import ContentImage from "./content-image";
import { ContentText } from "./card-components/card-text";
import { baseStyles } from "./base-styles";
import { Expression } from "./card-components/card-expression";
import { Options } from "./card-components/card-options";
import { CardType } from "#/store/card-slide";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export const CardContent = memo(
  ({ content }: { content: CardType }) => {
    const renderItems = useCallback(
      () =>
        content.elements.map((element, index) => {
          const key = `${content.id}-${index}`;

          switch (element.type) {
            case "text":
              return (
                <ContentText
                  key={key}
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
                  key={key}
                  uri={element.uri}
                />
              );
            case "expression":
              return (
                <Expression
                  displayMode={element.displayMode}
                  key={key}
                  latex={element.latex}
                />
              );
            case "options":
              return <Options key={key} element={element} />;
            case "carousel":
              return (
                <CarouselContent
                  key={key}
                  images={element.images}
                  showDots={element.showDots}
                />
              );
            default:
              return null;
          }
        }),
      [content.elements, content.id]
    );

    return (
      <View style={styles.itemContainer}>
        <Animated.View style={[styles.item]}>
          <View style={baseStyles.container}>{renderItems()}</View>
        </Animated.View>
      </View>
    );
  },
  (prev, next) =>
    prev.content.id === next.content.id &&
    prev.content.viewed === next.content.viewed
);

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
