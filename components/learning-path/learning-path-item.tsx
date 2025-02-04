import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import useTheme from "#/hooks/useTheme";

interface LearningPathItemProps {
  item: {
    title: string;
    imageUrl: string;
    description: string;
    currentLevel: number | null;
    percentComplete: number;
    currentCourse: {
      title: string;
    } | null;
    colorScheme: {
      s300: string;
      s500: string;
    };
    levels: {
      courses: any[];
    }[];
  };
}

const LearningPathItem: React.FC<LearningPathItemProps> = ({ item }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {item.currentLevel && (
        <Text style={[styles.levelText, { color: item.colorScheme.s500 }]}>
          LEVEL {item.currentLevel}
        </Text>
      )}
      <View style={styles.imageContainer}>
        <View
          style={[
            styles.backdrop,
            { backgroundColor: `${item.colorScheme.s300}22` },
          ]}
        >
          <Image
            source={require("../../assets/images/backdrop.png")}
            style={styles.backdropImage}
          />
        </View>
        <Image source={{ uri: item.imageUrl }} style={styles.mainImage} />
      </View>
      <View style={styles.contentContainer}>
        <View>
          {!item.currentLevel && (
            <Text style={[styles.metaText, { color: `${colors.text}88` }]}>
              {item.levels.length} LEVELS •{" "}
              {item.levels.flatMap((level) => level.courses).length} COURSES
            </Text>
          )}
          <Text style={styles.title}>{item.title}</Text>
          {!item.currentLevel ? (
            <Text style={[styles.description, { color: `${colors.text}88` }]}>
              {item.description}
            </Text>
          ) : (
            <Text style={styles.progress}>
              {item.percentComplete}% {item.currentCourse?.title}
            </Text>
          )}
        </View>
        {item.currentLevel && (
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.primary,
                  width: `${item.percentComplete}%`,
                },
              ]}
            />
          </View>
        )}
        <TouchableOpacity activeOpacity={0.7}>
          <View style={[styles.button, { backgroundColor: colors.mono }]}>
            <Text style={[styles.buttonText, { color: colors.monoText }]}>
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderBottomWidth: 6,
    borderColor: "#ddd",
    borderRadius: 36,
    height: 400,
    marginBottom: 16,
    overflow: "hidden",
    position: "relative",
  },
  levelText: {
    fontSize: 12,
    fontWeight: "700",
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
  },
  imageContainer: {
    position: "relative",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  backdropImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    opacity: 0.22,
  },
  mainImage: {
    width: 160,
    height: 160,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  description: {
    fontSize: 16,
    marginVertical: 4,
  },
  progress: {
    fontSize: 16,
    fontWeight: "700",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#eee",
    overflow: "hidden",
    borderRadius: 100,
  },
  progressFill: {
    height: 8,
  },
  button: {
    padding: 16,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default React.memo(LearningPathItem);
