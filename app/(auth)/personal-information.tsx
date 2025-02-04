import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Platform,
  ActivityIndicator,
  Alert,
  KeyboardTypeOptions,
} from "react-native";
import React, { useCallback, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import BouncyButton from "#/components/bouncy-button";
import { XIcon, CheckIcon, CameraIcon } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import { useUser } from "@clerk/clerk-expo";
import { primary_blue, primaryColor } from "#/constants/Colors";
import Text from "#/components/text";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormData = {
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
};

type FormErrors = {
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
};

type CustomTextInputProps = {
  label: string;
  value: string;
  onChange: (text: string) => void;
  error: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  field: keyof FormData; // Add this to identify which field is being edited
};

const PersonalInformation: React.FC = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [imageUploading, setImageUploading] = useState<boolean>(false);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    username: user?.username ?? "",
    email: user?.emailAddresses[0]?.emailAddress ?? "",
    phone: user?.phoneNumbers[0]?.phoneNumber ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
  });

  const [focusedField, setFocusedField] = useState<keyof FormData | null>(null);

  // Input validation state
  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone format (basic validation)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex: RegExp = /^\+?[\d\s-]{10,}$/;
    return phone === "" || phoneRegex.test(phone);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      username: "",
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
    };

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Invalid phone format";
    }

    // lastname and first names are optional
    // if (!formData.firstName) {
    //   newErrors.firstName = "First name is required";
    // }

    // if (!formData.lastName) {
    //   newErrors.lastName = "Last name is required";
    // }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  // Handle form submission
  const handleUpdate = async (): Promise<void> => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please check the form for errors");
      return;
    }

    if (!user) {
      Alert.alert("Error", "User not found");
      return;
    }

    setLoading(true);
    try {
      // Update username if changed
      if (user.username !== formData.username) {
        await user.update({
          username: formData.username,
        });
      }

      // Update names if changed
      if (
        user.firstName !== formData.firstName ||
        user.lastName !== formData.lastName
      ) {
        await user.update({
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      }

      // Update primary email if changed
      const primaryEmail = user.emailAddresses[0];
      if (primaryEmail?.emailAddress !== formData.email) {
        const emailAddress = await user.createEmailAddress({
          email: formData.email,
        });
        if (emailAddress) {
          await emailAddress.prepareVerification({ strategy: "email_code" });
          Alert.alert(
            "Email Verification Required",
            "Please check your email to verify your new email address"
          );
        }
      }

      // Update phone if changed
      const primaryPhone = user.phoneNumbers[0];
      if (primaryPhone?.phoneNumber !== formData.phone && formData.phone) {
        const phoneNumber = await user.createPhoneNumber({
          phoneNumber: formData.phone,
        });
        if (phoneNumber) {
          await phoneNumber.prepareVerification();
          Alert.alert(
            "Phone Verification Required",
            "Please verify your new phone number"
          );
        }
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);

      const progress =
        [
          user.lastName,
          user.firstName,
          user.username,
          user.imageUrl ?? null,
          user.emailAddresses[0].emailAddress ?? null,
        ].filter((item) => item !== null).length / 5;

      AsyncStorage.setItem(
        "progress_complete",
        progress === 1 ? "true" : "false"
      );
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      Alert.alert(
        "Update Failed",
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = async (): Promise<void> => {
    try {
      // Request permissions
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "You need to grant access to your photos to change your profile picture."
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets[0] && user) {
        setImageUploading(true);
        try {
          // Create a form data object with the image
          const formData = new FormData();
          formData.append("file", {
            uri: result.assets[0].uri,
            type: "image/jpeg",
            name: "profile-image.jpg",
          } as any);

          // Upload the image to Clerk
          await user.setProfileImage({
            file: formData.get("file") as File,
          });

          Alert.alert("Success", "Profile picture updated successfully");
        } catch (error) {
          Alert.alert(
            "Upload Failed",
            error instanceof Error
              ? error.message
              : "Failed to update profile picture"
          );
        } finally {
          setImageUploading(false);
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while picking the image");
    }
  };

  // Handle camera capture
  const handleCameraCapture = async (): Promise<void> => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "You need to grant access to your camera to take a profile picture."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0] && user) {
        setImageUploading(true);
        try {
          const formData = new FormData();
          formData.append("file", {
            uri: result.assets[0].uri,
            type: "image/jpeg",
            name: "profile-image.jpg",
          } as any);

          await user.setProfileImage({
            file: formData.get("file") as File,
          });

          Alert.alert("Success", "Profile picture updated successfully");
        } catch (error) {
          Alert.alert(
            "Upload Failed",
            error instanceof Error
              ? error.message
              : "Failed to update profile picture"
          );
        } finally {
          setImageUploading(false);
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while capturing the image");
    }
  };

  const handleImagePress = (): void => {
    Alert.alert(
      "Update Profile Picture",
      "Choose a source for your profile picture",
      [
        {
          text: "Camera",
          onPress: handleCameraCapture,
        },
        {
          text: "Photo Library",
          onPress: handleImagePick,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const CustomTextInput = useCallback<React.FC<CustomTextInputProps>>(
    ({
      label,
      value,
      onChange,
      error,
      placeholder,
      keyboardType = "default",
      field,
    }) => (
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={value}
          onChangeText={(text) => onChange(text)}
          placeholder={placeholder}
          cursorColor="#000"
          keyboardType={keyboardType}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
          // Add these props to help maintain focus
          blurOnSubmit={false}
          returnKeyType="next"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <BouncyButton onPress={() => router.back()}>
            <XIcon size={28} color="#555" strokeWidth={2.5} />
          </BouncyButton>
        </View>

        <View style={styles.profileSection}>
          <BouncyButton
            style={styles.avatarContainer}
            onPress={handleImagePress}
          >
            {imageUploading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={primary_blue[0]} size="large" />
              </View>
            ) : (
              <>
                <Image
                  source={{ uri: user?.imageUrl ?? undefined }}
                  style={styles.avatar}
                />
                <View style={styles.cameraIconContainer}>
                  <CameraIcon size={20} color="#fff" />
                </View>
              </>
            )}
          </BouncyButton>
        </View>

        <View style={styles.formContainer}>
          <CustomTextInput
            label="Username"
            value={formData.username}
            onChange={(text) => handleInputChange("username", text)}
            error={errors.username}
            placeholder="Username"
            field="username"
          />

          <CustomTextInput
            label="Email"
            value={formData.email}
            onChange={(text) => handleInputChange("email", text)}
            error={errors.email}
            placeholder="Email"
            keyboardType="email-address"
            field="email"
          />

          <CustomTextInput
            label="Phone"
            value={formData.phone}
            onChange={(text) => handleInputChange("phone", text)}
            error={errors.phone}
            placeholder="Phone"
            keyboardType="phone-pad"
            field="phone"
          />

          <CustomTextInput
            label="First Name"
            value={formData.firstName}
            onChange={(text) => handleInputChange("firstName", text)}
            error={errors.firstName}
            placeholder="First Name"
            field="firstName"
          />

          <CustomTextInput
            label="Last Name"
            value={formData.lastName}
            onChange={(text) => handleInputChange("lastName", text)}
            error={errors.lastName}
            placeholder="Last Name"
            field="lastName"
          />
        </View>

        <View style={styles.buttonContainer}>
          <BouncyButton
            style={[
              styles.updateButton,
              loading ? styles.updateButtonDisabled : null,
            ]}
            onPress={handleUpdate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.updateButtonText}>Update</Text>
            )}
          </BouncyButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  avatarContainer: {
    position: "relative",
    borderWidth: 4,
    borderColor: primaryColor,
    borderRadius: 1000,
    borderBottomWidth: 6,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    marginTop: 32,
    paddingHorizontal: 20,
    gap: 16,
  },
  label: {
    padding: 8,
    color: "#888",
    fontSize: 14,
  },
  input: {
    padding: 14,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#ddd",
    fontSize: 18,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginLeft: 8,
    marginTop: 4,
  },
  buttonContainer: {
    marginVertical: 20,
    padding: 24,
  },
  updateButton: {
    backgroundColor: primary_blue[0],
    borderWidth: 2,
    borderColor: primary_blue[1],
    borderRadius: 20,
    borderBottomWidth: 6,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  updateButtonDisabled: {
    opacity: 0.7,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
  },

  loadingContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: primary_blue[0],
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
});
