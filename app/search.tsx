import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { router, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Search } from "lucide-react-native";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState(""); // Add state for search query

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text); // Update search query on text change
    // Perform search here using searchQuery
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 8,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={26} color={"#000"} />
            </TouchableOpacity>
            <View
              style={{
                borderRadius: 32,
                borderWidth: 2,
                borderColor: "#ddd",
                backgroundColor: "#eee",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingHorizontal: 16,
                gap: 8,
                width: "90%",
              }}
            >
              <Search strokeWidth={2.5} size={18} color={"#777"} />
              <TextInput
                autoFocus
                value={searchQuery} // Bind TextInput value to searchQuery state
                onChangeText={handleSearchChange} // Call handleSearchChange on text change
                submitBehavior={"blurAndSubmit"}
                enterKeyHint="search"
                returnKeyType="search"
                clearButtonMode="always"
                placeholder="Search paths, courses, questions"
                style={{
                  fontFamily: "IBMPlexSansMedium",
                  fontSize: 16,
                }}
                cursorColor={"#000"}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SearchScreen;
