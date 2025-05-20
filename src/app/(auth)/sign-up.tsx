import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import * as z from "zod";
import CustomButton from "../../components/CustomButton";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
import { Link, router } from "expo-router";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import VerificationScreen from "../../components/VerificationScreen";

const signUpSchema = z.object({
  email: z.string({ message: "Email is required" }).email(),
  password: z.string({ message: "Password is required" }).min(8),
});

export type signUpSchema = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  const { handleSubmit, control, setError } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async ({ email, password }: signUpSchema) => {
    console.log({ email, password });

    if (!isLoaded) return;

    setIsSigningUp(true);

    try {
      // Start sign-up process using email and password provided
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling

      if (isClerkAPIResponseError(err)) {
        setError("email", { message: "Email already registered" });
      }
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsSigningUp(false);
    }
  };

  if (pendingVerification) {
    return <VerificationScreen />;
  }

  return (
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
    <View style={styles.container}>
      <CustomText style={styles.title}>Sign up</CustomText>
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
        title={isSigningUp ? "Signing up..." : "Sign up"}
        onPress={handleSubmit(onSubmit)}
        variant="primary"
        disabled={isSigningUp}
      />
      <Link href="/sign-in">
        <CustomText style={styles.link}>
          Already have an account? Sign in
        </CustomText>
      </Link>
    </View>
    // {/* </KeyboardAvoidingView> */}
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
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontFamily: "circular",
    fontSize: 16,
  },
});
