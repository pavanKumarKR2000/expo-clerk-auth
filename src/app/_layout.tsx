import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  );
}
