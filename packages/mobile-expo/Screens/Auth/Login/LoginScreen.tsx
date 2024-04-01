import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { loginSchema } from "../../../utils/FormSchemas/FormSchema";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { addUser } from "../../../redux/Slices/User";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [admin, setAdmin] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const lowercaseData = {
      ...data,
      email: data.email.toLowerCase(),
    };

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URI}${
          admin ? "/api/v1/auth/login/admin" : "/api/v1/auth/login"
        }`,
        lowercaseData
      );
      const {
        token,
        user: { isAdmin, name },
      } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("isAdmin", JSON.stringify(isAdmin));
      await AsyncStorage.setItem("name", name);

      dispatch(addUser({ name, isAdmin, token }));

      reset();
      clearErrors();
      if (isAdmin === false) {
        navigation.replace("UserStack", {});
      } else if (isAdmin === true) {
        navigation.replace("AdminStack");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.Maincontainer}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Platform.OS === "web" ? 100 : 15,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>SHOP.CO</Text>
            <Image
              style={styles.image}
              source={require("../../../assets/images/login.jpg")}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Email:{" "}
                {errors.email && (
                  <Text style={styles.error}>
                    {errors.email?.message?.toString()}
                  </Text>
                )}
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email"
                  />
                )}
                name="email"
                defaultValue=""
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Password:{" "}
                {errors.password && (
                  <Text style={styles.error}>
                    {errors.password?.message?.toString()}
                  </Text>
                )}
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your password"
                    secureTextEntry
                  />
                )}
                name="password"
                defaultValue=""
              />
            </View>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            <BouncyCheckbox
              size={25}
              fillColor="black"
              unfillColor="#ffff"
              text="Admin"
              iconStyle={{ borderColor: "red" }}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{
                // fontFamily: "inter-regular",
                textDecorationLine: "none",
              }}
              textContainerStyle={{ marginVertical: 10 }}
              isChecked={admin}
              onPress={() => setAdmin(!admin)}
            />
            <View style={styles.btnContainer}>
              <Pressable
                style={styles.btn}
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {!isLoading ? (
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      // fontFamily: "inter-bold",
                      fontSize: 18,
                    }}
                  >
                    Login
                  </Text>
                ) : (
                  <ActivityIndicator color="#ffff" size={25} />
                )}
              </Pressable>
              <Pressable onPress={() => navigation.navigate("SignupScreen")}>
                <Text style={styles.secondaryBtn}>Register</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
  },
  container: {
    minWidth: `${Platform.OS === "web" ? "40%" : "100%"}`,
    flexDirection: `${Platform.OS === "web" ? "row" : "column"}`,
    justifyContent: `${
      Platform.OS === "web" ? "space-around" : "space-between"
    }`,
  },
  logo: {
    // fontFamily: "inter-bold",
    fontWeight: "700",
    fontSize: 40,
    textAlign: "center",
  },
  logoContainer: {
    flexDirection: "column",
    minWidth: Platform.OS === "web" ? 600 : 300,
  },

  image: {
    width: "100%",
    height: Platform.OS === "web" ? 400 : 300,
    alignSelf: "center",
    marginBottom: 10,
  },
  formContainer: {
    minWidth: Platform.OS === "web" ? 450 : 300,
    flexDirection: "column",
    gap: 15,
  },

  inputContainer: {
    marginVertical: 10,
    flexDirection: "column",
    gap: 10,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "800",
    // fontFamily: "inter-bold",
  },
  error: {
    color: "red",
    fontSize: 10,
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "column",
    gap: 4,
  },
  btn: {
    backgroundColor: "black",
    // fontFamily: "inter-bold",
    fontSize: 18,
    padding: 9,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    borderRadius: 10,
  },
  secondaryBtn: {
    backgroundColor: "white",
    // fontFamily: "inter-bold",
    fontSize: 18,
    padding: 9,
    color: "black",
    textAlign: "center",
    fontWeight: "500",
    borderRadius: 10,
  },
  label: {
    fontWeight: "600",
    // fontFamily: "inter-bold",
    fontSize: 15,
  },
});
