import * as React from "react";
import {
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, Redirect, useRouter } from "expo-router";
import Text from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";
import BouncyButton from "@/components/bouncy-button";
import { AuthError } from "./sign-up";
import { useAuthStyles } from "@/hooks/use-auth-styles";
import Svg, { Path } from "react-native-svg";
import { primaryColor } from "@/constants/Colors";
import { ChevronLeft, Eye, EyeClosed } from "lucide-react-native";

export default function SignInScreen() {
  const styles = useAuthStyles();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<AuthError | null>(null);
  const [showPass, setShowPass] = React.useState(false);

  const onSignInPress = async () => {
    if (!isLoaded || loading) return;

    setLoading(true);
    setError(null);

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        setError({
          message: "Unable to sign in. Please try again.",
          code: "unknown_error",
        });
      }
    } catch (err: any) {
      setError({
        message: err.errors?.[0]?.message ?? "Invalid email or password",
        code: err.errors?.[0]?.code ?? "unknown_error",
      });
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
      <View style={{ marginBottom: 24, paddingTop: 16 }}>
        <BouncyButton onPress={() => router.back()}>
          <ChevronLeft size={32} color={"#333"} />
        </BouncyButton>
      </View>

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
        Sign in
      </Text>

      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={email}
          placeholder="Email address"
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <View>
          <TextInput
            value={password}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={showPass}
            onChangeText={setPassword}
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

        {error && <Text style={styles.errorText}>{error.message}</Text>}

        <TouchableHighlight
          onPress={onSignInPress}
          style={[styles.button, loading && styles.buttonDisabled]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text weight="medium" style={styles.buttonText}>
              Sign in
            </Text>
          )}
        </TouchableHighlight>

        <View style={styles.link}>
          <Text>Don't have an account?</Text>
          <Link href="/sign-up" asChild>
            <Pressable>
              <Text style={styles.linkText}>Sign up</Text>
            </Pressable>
          </Link>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <Link href="(auth)/forgot-password" asChild>
            <Pressable>
              <Text
                weight="semiBold"
                style={{ color: primaryColor, textDecorationStyle: "solid" }}
              >
                Forgot password?
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
