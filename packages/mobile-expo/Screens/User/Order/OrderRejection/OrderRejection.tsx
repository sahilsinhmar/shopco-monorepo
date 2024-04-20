import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function OrderRejection() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",

          gap: 16,
        }}
      >
        <MaterialIcons name="error" size={164} color="black" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "gray",
          }}
        >
          Sorry your order has not been places .Please try again.
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Sorry for the inconvience
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("UserHomeScreen")}
        >
          <Text style={styles.ButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "black",
    width: 150,
    marginTop: "auto",
  },
  ButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
