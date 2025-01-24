import {
  ColorSchemeSelect,
  LearningPathWithRelations,
} from "@/server/schema.types";
import { memo } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Text from "../text";
import { usePathscreenStyles } from "@/hooks/use-pathscreen-styles";
import useTheme from "@/hooks/useTheme";

const HeaderImage = memo(
  ({
    imageUrl,
    colorScheme,
    colors,
  }: {
    imageUrl: string;
    colorScheme?: ColorSchemeSelect;
    colors: any;
  }) => {
    const styles = usePathscreenStyles();

    return (
      <View style={styles.imageContainer}>
        <View
          style={[
            styles.imageBackground,
            {
              backgroundColor: `${colorScheme?.s300 ?? colors.primary}22`,
            },
          ]}
        >
          <Image
            source={require("../../assets/images/backdrop.png")}
            style={styles.backdropImage}
          />
          <View
            style={[
              styles.gradientOverlay,
              {
                backgroundColor: `${colorScheme?.s300 ?? colors.primary}88`,
              },
            ]}
          />
          <View
            style={[
              styles.gradientOverlayBottom,
              {
                backgroundColor: `${colorScheme?.s300 ?? colors.primary}99`,
              },
            ]}
          />
        </View>
        <Image
          source={{ uri: imageUrl ?? "https://github.com/shadcn.png" }}
          style={styles.courseImage}
        />
      </View>
    );
  }
);

const Header = memo(({ path }: { path: LearningPathWithRelations }) => {
  const styles = usePathscreenStyles();

  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 14 }}>
      <HeaderImage
        imageUrl={path.imageUrl!}
        colorScheme={path.colorScheme}
        colors={colors}
      />

      <View style={styles.headerContent}>
        <Text
          style={[styles.headerTitle, { color: colors.text }]}
          weight="semiBold"
        >
          {path.title}
        </Text>
        <Text
          style={[styles.headerDescription, { color: colors.tertiaryText }]}
        >
          {path.description}
        </Text>
        <TouchableOpacity
          activeOpacity={0.65}
          style={[styles.actionButton, { backgroundColor: colors.mono }]}
        >
          <Text
            weight="medium"
            style={[styles.actionButtonText, { color: "#fff" }]}
          >
            {path.isEnrolled ? "Resume path" : "Start Learning"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default Header;
