import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { Text, View, Image, TouchableOpacity } from "react-native";
import useTheme from "@/hooks/useTheme";
import { ThemedText } from "../ThemedText";

const Header = () => {
  const { colors } = useTheme();
  return (
    <ThemedView style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            overflow: "hidden",
            borderRadius: 50,
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/images/user01.png")}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                backgroundColor: colors.secondaryBackground,
                padding: 8,
                borderRadius: 50,
                paddingHorizontal: 12,
              }}
            >
              <Ionicons name={"search"} size={16} color={colors.text} />
              <ThemedText style={{ fontSize: 16 }}>Explore</ThemedText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name={"settings"} size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
};

export default Header;
