import React from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
// import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/theme";
import { useFonts, DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { AuthProvider } from "@hooks/auth";

// import { SignIn } from "@screens/SignIn";
import { Product } from "@screens/Product";

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   DMSans_400Regular,
  //   DMSerifDisplay_400Regular,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <AuthProvider>
        <Product />
      </AuthProvider>
    </ThemeProvider>
  );
}
