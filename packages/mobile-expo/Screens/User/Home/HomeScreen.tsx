import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";

export default function UserHomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("isAdmin");
      navigation.replace("Auth");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <View>
      <Text>User HomeScreen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
0;
const styles = StyleSheet.create({});
