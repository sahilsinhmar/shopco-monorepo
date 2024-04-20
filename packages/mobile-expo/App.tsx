import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/Auth/Login/LoginScreen";
import SignupScreen from "./Screens/Auth/Signup/SignupScreen";
import SplashScreen from "./Screens/Splash/SplashScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StripeProvider } from "@stripe/stripe-react-native";
import linkingConfig from "./linking";

import { useState } from "react";
import { UserScreens } from "./Screens/User/UserScreens";
import { AdminScreens } from "./Screens/Admin/AdminScreens";
import { Provider } from "react-redux";
import store from "./redux/store";
import PaymentSuccessScreen from "./Screens/PaymentScreens/PaymentSuccessScreen";
import PaymentCancelScreen from "./Screens/PaymentScreens/PaymentCancelScreen";

const queryClient = new QueryClient();
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
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StripeProvider
          publishableKey={process.env.EXPO_PUBLIC_PUBLISHABLE_KEY}
        >
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

              <Stack.Screen
                name="UserStack"
                component={UserScreens}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="AdminStack"
                component={AdminScreens}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </StripeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
