import React from "react";
import { View } from "react-native";
import CarouselContent from "./carousel";
import ContentImage from "./content-image";
import { CardContentType } from "@/_mock_/swipe-data";
import { ContentText } from "./card-components/card-text";
import { baseStyles } from "./base-styles";
import { Expression } from "./card-components/card-expression";
import { Options } from "./card-components/card-options";

export const CardContent = ({ content }: { content: CardContentType }) => {
  return (
    <View style={baseStyles.container}>
      {content.elements.map((element, index) => {
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
            return (
              <Options
                key={index}
                element={element}
              />
            );
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
      })}
    </View>
  );
};
