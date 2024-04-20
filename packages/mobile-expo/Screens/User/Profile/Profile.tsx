import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearUser } from "../../../redux/Slices/User";

export default function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { userInfo } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("name");
      dispatch(clearUser());
      navigation.replace("Auth");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Hello ${userInfo?.name?.toUpperCase()}`,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
