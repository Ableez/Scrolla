export type AuthError = {
  message: string;
  code: string;
};

import {
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { useAuth, useSignUp } from "@clerk/clerk-expo";
import { Link, Redirect, useRouter } from "expo-router";
import Text from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";
import BouncyButton from "@/components/bouncy-button";
import { z } from "zod";
import { useAuthStyles } from "@/hooks/use-auth-styles";
import Svg, { Path } from "react-native-svg";
import { primaryColor } from "@/constants/Colors";
import { ChevronLeft, Eye, EyeClosed } from "lucide-react-native";
import { useEffect, useState } from "react";

const SignUpSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export default function SignUpScreen() {
  const styles = useAuthStyles();
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [showpPass, setShowPass] = useState(false);

  const [verificationStep, setVerificationStep] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const validateForm = () => {
    try {
      SignUpSchema.parse({ email, password });
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            errors[error.path[0].toString()] = error.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const onSignUpPress = async () => {
    if (!isLoaded || loading || !validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      await signUp.create({
        emailAddress: email,
        password,
        username: email.split("@")[0],
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerificationStep(true);
      setResendCooldown(60);
    } catch (err: any) {
      setError({
        message: err.errors?.[0]?.message ?? "Something went wrong",
        code: err.errors?.[0]?.code ?? "unknown_error",
      });
      console.error("SIGN UP ERROR: ", JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const onResendCode = async () => {
    if (!isLoaded || loading || resendCooldown > 0) return;
    setCodeError(null);

    setLoading(true);
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setResendCooldown(60);
    } catch (err) {
      setCodeError("Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    console.log("BEFORE CLICKED");
    if (!isLoaded || loading || code.length !== 6) return;

    setLoading(true);
    setCodeError(null);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log("signUpAttempt", signUpAttempt);

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        setCodeError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      setCodeError(err.errors?.[0]?.message ?? "Invalid verification code");
      console.log(err);
      // if (err.errors?.[0]?.message === "Already verified".toLowerCase()) {
      //   router.push("/sign-in");
      // }
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (verificationStep) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 24, paddingTop: 16 }}>
          <BouncyButton onPress={() => router.back()}>
            <ChevronLeft size={32} color={"#333"} />
          </BouncyButton>
        </View>
        <Text weight="bold" style={{ fontSize: 36 }}>
          6-digit code
        </Text>

        <View style={styles.form}>
          <Text style={{ fontSize: 16, marginVertical: 6 }}>
            Please enter the code we've sent to {email ?? "your email"}
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

          <BouncyButton
            onPress={onVerifyPress}
            style={[
              styles.button,
              (loading || code.length !== 6) && styles.buttonDisabled,
            ]}
            disabled={loading || code.length !== 6}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text weight="medium" style={styles.buttonText}>
                Verify Email
              </Text>
            )}
          </BouncyButton>

          <Pressable
            onPress={onResendCode}
            style={styles.resendButton}
            disabled={loading || resendCooldown > 0}
          >
            <Text style={styles.resendText}>
              {resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : "Resend code"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  if (loading) {
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

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: 32,
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
        Create account
      </Text>

      <View style={styles.form}>
        <View>
          <TextInput
            autoCapitalize="none"
            style={[styles.input, validationErrors.email && styles.inputError]}
            value={email}
            placeholder="Email address"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          {!!validationErrors.email && (
            <Text style={styles.errorText}>{validationErrors.email}</Text>
          )}
        </View>

        <View>
          <TextInput
            value={password}
            style={[
              styles.input,
              validationErrors.password && styles.inputError,
            ]}
            placeholder="Password"
            secureTextEntry={showpPass}
            onChangeText={setPassword}
          />
          {!!validationErrors.password && (
            <Text style={styles.errorText}>{validationErrors.password}</Text>
          )}
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
            {showpPass ? (
              <EyeClosed size={22} color={"#333"} />
            ) : (
              <Eye size={22} color={"#333"} />
            )}
          </BouncyButton>
        </View>

        {error && <Text style={styles.errorText}>{error.message}</Text>}

        <TouchableHighlight
          onPress={onSignUpPress}
          style={[styles.button, loading && styles.buttonDisabled]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text weight="medium" style={styles.buttonText}>
              Sign up
            </Text>
          )}
        </TouchableHighlight>

        <View style={styles.link}>
          <Text>Already have an account?</Text>
          <Link href="/sign-in" asChild>
            <Pressable>
              <Text style={styles.linkText}>Sign in</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
