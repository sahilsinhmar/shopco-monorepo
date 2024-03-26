import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/Auth/Login/LoginScreen";
import SignupScreen from "./Screens/Auth/Signup/SignupScreen";
import SplashScreen from "./Screens/SplashScreen/SplashScreen";
import HomeScreen from "./Screens/Home/HomeScreen";
import * as Font from "expo-font";

import InterRegular from "./assets/fonts/Inter-Regular.ttf";
import InterBold from "./assets/fonts/Inter-Bold.ttf";
import { useState } from "react";

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  // Load the font
  Font.loadAsync({
    "inter-regular": InterRegular,
    "inter-bold": InterBold,
    // Add other Inter font weights here
  }).then(() => {
    setIsFontLoaded(true);
  });

  if (!isFontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
