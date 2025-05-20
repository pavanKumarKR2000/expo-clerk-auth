import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import * as z from "zod";
import CustomButton from "../../components/CustomButton";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
import { Link, router } from "expo-router";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import SignInWith from "../../components/SignInWith";

const signInSchema = z.object({
  email: z.string({ message: "Email is required" }).email(),
  password: z.string({ message: "Password is required" }).min(8),
});

export type signInSchema = z.infer<typeof signInSchema>;

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [isSigningIn, setIsSigningIn] = useState(false);

  const { handleSubmit, control, setError } = useForm<signInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async ({ email, password }: signInSchema) => {
    if (!isLoaded) return;

    setIsSigningIn(true);

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(protected)/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling

      if (isClerkAPIResponseError(err)) {
        setError("email", { message: "Invalid email or password" });
        setError("password", { message: "Invalid email or password" });
      }
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
    <View style={styles.container}>
      <CustomText style={styles.title}>Sign in</CustomText>
      <CustomTextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        control={control}
        name="email"
      />
      <CustomTextInput
        placeholder="Password"
        secureTextEntry
        control={control}
        name="password"
      />
      <CustomButton
        onPress={handleSubmit(onSubmit)}
        title={isSigningIn ? "Signing in..." : "Sign in"}
        variant="primary"
        disabled={isSigningIn}
      />
      <Link href="/sign-up">
        <CustomText style={styles.link}>
          {" "}
          Don't have an account? Sign up
        </CustomText>
      </Link>
      <SignInWith />
    </View>
    // </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "circularBold",
  },
  button: {
    backgroundColor: "#2b7fff",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  link: {
    textAlign: "center",
    color: "#2b7fff",
    fontSize: 16,
  },
});
