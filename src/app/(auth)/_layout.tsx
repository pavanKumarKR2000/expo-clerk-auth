import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(protected)/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
