import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";
import CustomTextInput from "./CustomTextInput";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";

const verificationCodeSchema = z.object({
  code: z
    .string()
    .min(1, { message: "verifiction code is required" })
    .length(6),
});

export type verificationSchema = z.infer<typeof verificationCodeSchema>;

const VerificationScreen = () => {
  const { handleSubmit, control, setError } = useForm<verificationSchema>({
    resolver: zodResolver(verificationCodeSchema),
  });

  const [isVerifying, setIsVerifying] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();

  const onVerifyPress = async ({ code }: verificationSchema) => {
    if (!isLoaded) return;

    setIsVerifying(true);

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(protected)/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (isClerkAPIResponseError(err)) {
        setError("code", { message: "Invalid verification code" });
      }
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomText style={{ fontSize: 16, textAlign: "center" }}>
        Verify your email
      </CustomText>
      <CustomTextInput
        control={control}
        name="code"
        placeholder="123456"
        inputMode="numeric"
      />
      <CustomButton
        title={isVerifying ? "Verifying..." : "Verify"}
        onPress={handleSubmit(onVerifyPress)}
        disabled={isVerifying}
        variant="primary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default VerificationScreen;
