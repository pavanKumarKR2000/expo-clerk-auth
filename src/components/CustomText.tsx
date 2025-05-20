import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, TextProps } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function CustomText({ style, ...rest }: TextProps) {
  const [loaded, error] = useFonts({
    circular: require("../../assets/fonts/circular.ttf"),
    circularMedium: require("../../assets/fonts/circular-medium.ttf"),
    circularBold: require("../../assets/fonts/circular-bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Text
      {...rest}
      style={{
        ...(style as object),
        fontFamily: "circular",
        // fontSize: 18,
      }}
    />
  );
}
