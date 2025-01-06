import * as React from "react";
import { TextInput, View, Pressable, ActivityIndicator } from "react-native";
import { useAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, Redirect, useRouter } from "expo-router";
import Text from "@/components/text";
import { SafeAreaView } from "react-native-safe-area-context";
import BouncyButton from "@/components/bouncy-button";
import { AuthError } from "./sign-up";
import { useAuthStyles } from "@/hooks/use-auth-styles";

export default function SignInScreen() {
  const styles = useAuthStyles();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<AuthError | null>(null);

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

  return (
    <SafeAreaView style={styles.container}>
      <Text weight="bold" style={styles.header}>
        Welcome back
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

        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />

        {error && <Text style={styles.errorText}>{error.message}</Text>}

        <BouncyButton
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
        </BouncyButton>

        <View style={styles.link}>
          <Text>Don't have an account?</Text>
          <Link href="/sign-up" asChild>
            <Pressable>
              <Text style={styles.linkText}>Sign up</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
