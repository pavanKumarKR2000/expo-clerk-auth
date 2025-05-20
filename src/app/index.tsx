import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import * as z from "zod";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";
import CustomTextInput from "../components/CustomTextInput";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";

export default function WelcomeScreen() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(protected)/" />;
  }
  return <Redirect href="/(auth)/sign-in" />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
