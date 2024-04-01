import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Profile() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { name } = useAppSelector((state) => state.User);

  useEffect(() => {
    navigation.setOptions({ headerTitle: `Hello ${name?.toUpperCase()}` });
  }, []);

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
