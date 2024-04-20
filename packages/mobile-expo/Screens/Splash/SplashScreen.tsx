import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/Slices/User";

export default function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useDispatch();

  const isLoggedIn = async () => {
    const userString = await AsyncStorage.getItem("user");
    let user = null;
    if (userString !== null) {
      user = JSON.parse(userString);
    }

    const token = await AsyncStorage.getItem("token");

    dispatch(addUser({ user, token }));
    if (token === null) {
      navigation.replace("Auth");
    } else if (token && user.role === "admin") {
      navigation.replace("AdminStack");
    } else if (token && user.role === "user") {
      navigation.replace("UserStack");
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.info}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SHOP.CO</Text>
          <Text style={styles.tagLine}>A clothing store</Text>
        </View>
        <View>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 5,
  },
  info: {
    flexDirection: "column",
    flex: 1,
    padding: 5,
    gap: 10,
    alignItems: "center",
    height: 200,
    justifyContent: "space-around",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "500",
    // fontFamily: "inter-regular",
  },
  tagLine: {
    fontSize: 15,
  },
});
