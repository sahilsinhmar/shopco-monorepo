import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "./types";

const prefix = Linking.createURL("/");

const config: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix],
  config: {
    screens: {
      SplashScreen: "splash",
      Auth: {
        screens: {
          LoginScreen: "login",
          SignupScreen: "signup",
        },
      },
      UserStack: "user",
      AdminStack: "admin",
      PaymentSuccess: "payment/success",
      PaymentCancel: "payment/cancel",
    },
  },
};

export default config;
