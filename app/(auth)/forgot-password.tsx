import React, { useState, useEffect, useRef } from "react";
import {
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { useAuth, useSignIn, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Text from "#/components/text";
import { SafeAreaView } from "react-native-safe-area-context";
import BouncyButton from "#/components/bouncy-button";
import { useAuthStyles } from "#/hooks/use-auth-styles";
import Svg, { Path } from "react-native-svg";
import { primary_blue, primaryColor } from "#/constants/Colors";
import { ChevronLeft, Eye, EyeClosed } from "lucide-react-native";
import { z } from "zod";
import { Drawer, DrawerContent } from "#/components/drawer";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type ResetError = {
  message: string;
  code: string;
};

const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

const ForgotPassword = () => {
  const styles = useAuthStyles();
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const customBottomSheetRef = useRef<BottomSheetModal>(null);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ResetError | null>(null);
  const [step, setStep] = useState<"email" | "code" | "newPassword">("email");

  // Verification code state
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // New password state
  const [newPassword, setNewPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const onRequestReset = async () => {
    if (!isLoaded || loading || !email) return;
    signOut();

    setLoading(true);
    setError(null);

    try {
      const reset = await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      console.log("RESET: ", reset);
      setStep("code");
      setResendCooldown(60);
    } catch (err: any) {
      setError({
        message: err.errors?.[0]?.message ?? "Failed to send reset email",
        code: err.errors?.[0]?.code ?? "unknown_error",
      });

      console.log("REQUEST RESET ERROR: ", JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const onResendCode = async () => {
    if (!isLoaded || loading || resendCooldown > 0) return;

    setLoading(true);
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setResendCooldown(60);
    } catch (err) {
      setCodeError("Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  const onVerifyCode = async () => {
    if (!isLoaded || loading || code.length !== 6) return;

    setLoading(true);
    setCodeError(null);

    try {
      await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
      });
      setStep("newPassword");
    } catch (err: any) {
      setCodeError(err.errors?.[0]?.message ?? "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  const onResetPassword = async () => {
    if (!isLoaded || loading) return;

    try {
      PasswordSchema.parse(newPassword);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setValidationError(err.errors[0].message);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const resetAttempt = await signIn.resetPassword({
        password: newPassword,
      });

      if (resetAttempt.status === "complete") {
        await setActive({ session: resetAttempt.createdSessionId });

        router.replace("/");
      }
      router.replace("/");
    } catch (err: any) {
      setError({
        message: err.errors?.[0]?.message ?? "Failed to reset password",
        code: err.errors?.[0]?.code ?? "unknown_error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      customBottomSheetRef.current?.present();
    }
  }, []);

  if (!isLoaded || loading) {
    return (
      <View
        style={{
          height: Dimensions.get("screen").height,
          width: Dimensions.get("screen").width,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"#000"} />
      </View>
    );
  }

  console.log("SIGNED IN ALREADY", isSignedIn);

  if (isSignedIn) {
    console.log("SIGNED IN ALREADY");
    return (
      <Drawer customBottomSheetRef={customBottomSheetRef}>
        <DrawerContent>
          <View style={{ padding: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 24 }}>
              You are currently signed in as{" "}
              {user?.username ?? user?.emailAddresses[0].emailAddress}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              width: "100%",
              padding: 20,
              marginTop: 16,
            }}
          >
            <BouncyButton
              style={{
                width: "100%",
                padding: 16,
                borderRadius: 24,
                backgroundColor: primary_blue[0],
                borderWidth: 2,
                borderBottomWidth: 6,
                borderBottomColor: primary_blue[1],
              }}
            >
              <Text>Go back</Text>
            </BouncyButton>
            <BouncyButton
              style={{ width: "100%", padding: 16, borderRadius: 24 }}
            >
              <Text style={{ color: "#eb0000" }}>Yes, sign out</Text>
            </BouncyButton>
          </View>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 24, paddingTop: 16 }}>
        <BouncyButton onPress={() => router.back()}>
          <ChevronLeft size={32} color={"#333"} />
        </BouncyButton>
      </View>

      <View
        style={{
          marginTop: 28,
          width: "auto",
          marginInline: "auto",
          padding: 16,
        }}
      >
        <Svg
          width={41.234 * 1.6 + "mm"}
          height={43.868 * 1.6 + "mm"}
          clipRule="evenodd"
          fillRule="evenodd"
          viewBox="0 0 128.34 136.54"
          fill={primaryColor}
        >
          <Path d="m109.4 68.54-0.11-9.14-35.61 0.11v18.07l35.61 0.11 0.11-9.14zm-90.47 0 0.11-9.14 35.61 0.11v18.07l-35.61 0.11-0.11-9.14zm54.75-33.43v-27.54-0.17l-9.52 0.09-9.52-0.09v0.17 27.54c-9.91 0.72-17.76 1.82-25.06-3.17-9.48-6.49-7.19-19.57-7.11-31.94h-22.48c0.03 14.27 0.82 23.02 13.38 30.03l9.13 3.85c1.48 0.96 0.46-0.04 1.49 1.29l-23.94 0.19c-0.03 22.14-0.03 44.2 0 66.34l23.94 0.19c-1.03 1.33-0.01 0.33-1.49 1.29l-9.13 3.85c-12.4 6.93-13.32 15.54-13.37 29.5h22.48c-0.14-12.21-2.23-25.01 7.12-31.4 12.17-3.76 15.15-3.9 25.06-3.17v27.54 0.17l9.52-0.09 9.52 0.09v-0.17-27.54c9.91-0.72 12.89-0.59 25.06 3.17 9.34 6.39 7.26 19.2 7.12 31.4h22.48c-0.05-13.96-0.97-22.57-13.37-29.5l-9.13-3.85c-1.48-0.95-0.46 0.04-1.49-1.29l23.94-0.19c0.03-22.14 0.03-44.2 0-66.34l-23.94-0.19c1.03-1.33 0.01-0.33 1.49-1.29l9.13-3.85c12.56-7.01 13.34-15.76 13.38-30.03h-22.48c0.08 12.36 2.37 25.45-7.11 31.94-7.29 4.99-15.15 3.9-25.06 3.17h-0.01z" />
        </Svg>
      </View>

      <Text weight="bold" style={styles.header}>
        {step === "email"
          ? "Reset password"
          : step === "code"
          ? "Verify email"
          : "New password"}
      </Text>

      <View style={styles.form}>
        {step === "email" && (
          <>
            <Text style={{ fontSize: 16, marginVertical: 6 }}>
              Enter your email address and we'll send you a code to reset your
              password.
            </Text>
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              value={email}
              placeholder="Email address"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
            <TouchableHighlight
              onPress={onRequestReset}
              style={[styles.button, !email && styles.buttonDisabled]}
              disabled={!email}
            >
              <Text weight="medium" style={styles.buttonText}>
                Send reset code
              </Text>
            </TouchableHighlight>
          </>
        )}

        {step === "code" && (
          <>
            <Text style={{ fontSize: 16, marginVertical: 6 }}>
              Please enter the code we've sent to {email}
            </Text>
            <TextInput
              value={code}
              placeholder="000000"
              style={[
                styles.input,
                styles.codeInput,
                codeError && styles.inputError,
              ]}
              maxLength={6}
              keyboardType="number-pad"
              onChangeText={setCode}
            />
            {codeError && <Text style={styles.errorText}>{codeError}</Text>}
            <TouchableHighlight
              onPress={onVerifyCode}
              style={[
                styles.button,
                code.length !== 6 && styles.buttonDisabled,
              ]}
              disabled={code.length !== 6}
            >
              <Text weight="medium" style={styles.buttonText}>
                Verify code
              </Text>
            </TouchableHighlight>
            <Pressable
              onPress={onResendCode}
              style={styles.resendButton}
              disabled={resendCooldown > 0}
            >
              <Text style={styles.resendText}>
                {resendCooldown > 0
                  ? `Resend code in ${resendCooldown}s`
                  : "Resend code"}
              </Text>
            </Pressable>
          </>
        )}

        {step === "newPassword" && (
          <>
            <Text style={{ fontSize: 16, marginVertical: 6 }}>
              Enter your new password
            </Text>
            <View>
              <TextInput
                value={newPassword}
                style={[styles.input, validationError && styles.inputError]}
                placeholder="New password"
                secureTextEntry={showPass}
                onChangeText={setNewPassword}
              />
              <BouncyButton
                style={{
                  position: "absolute",
                  width: 55,
                  height: "100%",
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setShowPass((p) => !p)}
              >
                {showPass ? (
                  <EyeClosed size={22} color={"#333"} />
                ) : (
                  <Eye size={22} color={"#333"} />
                )}
              </BouncyButton>
            </View>
            {validationError && (
              <Text style={styles.errorText}>{validationError}</Text>
            )}
            {error && <Text style={styles.errorText}>{error.message}</Text>}
            <TouchableHighlight
              onPress={onResetPassword}
              style={[styles.button, !newPassword && styles.buttonDisabled]}
              disabled={!newPassword}
            >
              <Text weight="medium" style={styles.buttonText}>
                Reset password
              </Text>
            </TouchableHighlight>
          </>
        )}

        <View style={styles.link}>
          <Text style={{ fontSize: 16 }} weight="medium">
            Remember your password?
          </Text>
          <Link href="/sign-in" asChild>
            <Pressable>
              <Text
                weight="semiBold"
                style={[styles.linkText, { color: primaryColor, fontSize: 18 }]}
              >
                Sign in
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
