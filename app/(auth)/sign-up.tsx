export type AuthError = {
  message: string;
  code: string;
};

import * as React from "react";
import {
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { useAuth, useSignUp } from "@clerk/clerk-expo";
import { Link, Redirect, useRouter } from "expo-router";
import Text from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";
import BouncyButton from "@/components/bouncy-button";
import { z } from "zod";
import { useAuthStyles } from "@/hooks/use-auth-styles";

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

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<AuthError | null>(null);
  const [validationErrors, setValidationErrors] = React.useState<
    Record<string, string>
  >({});

  const [verificationStep, setVerificationStep] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = React.useState(0);

  React.useEffect(() => {
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

    console.log("CLICKED");

    setLoading(true);
    setError(null);

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerificationStep(true);
      setResendCooldown(60);
    } catch (err: any) {
      setError({
        message: err.errors?.[0]?.message ?? "Something went wrong",
        code: err.errors?.[0]?.code ?? "unknown_error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onResendCode = async () => {
    if (!isLoaded || loading || resendCooldown > 0) return;

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

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        setCodeError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      setCodeError(err.errors?.[0]?.message ?? "Invalid verification code");
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
        <Text weight="bold" style={styles.header}>
          Verify your email
        </Text>

        <View style={styles.form}>
          <Text>We sent a verification code to {email}</Text>

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

  return (
    <SafeAreaView style={styles.container}>
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
          {validationErrors.email && (
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
            secureTextEntry
            onChangeText={setPassword}
          />
          {validationErrors.password && (
            <Text style={styles.errorText}>{validationErrors.password}</Text>
          )}
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
