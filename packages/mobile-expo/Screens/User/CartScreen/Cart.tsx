import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install this package
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { clearCart, addItem, removeItem } from "../../../redux/Slices/Cart";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Cart() {
  const { cartItems } = useAppSelector((state) => state.Cart);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      {cartItems.map((item) => (
        <View key={item._id} style={styles.itemContainer}>
          <View style={{ flexDirection: "row", gap: 1 }}>
            <Image
              source={{ uri: item.imageURL[0] }}
              style={{ width: 100, height: 100, borderWidth: 1 }}
              resizeMode="contain"
            />
            <View style={styles.itemDetails}>
              <Text>{item.name}</Text>
              <Text>Size: {item.sizes}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => dispatch(removeItem(item._id))}
                >
                  <AntDesign name="minuscircleo" size={24} color="black" />
                </TouchableOpacity>
                <Text>{item.quantity}</Text>
                <TouchableOpacity onPress={() => dispatch(addItem(item))}>
                  <MaterialIcons
                    name="add-circle-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Text>&#8377; {item.price}</Text>
            <Text>x{item.quantity}</Text>
            <Text>
              &#8377;
              {parseFloat(item.price) * item.quantity}
            </Text>
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.clearCartButton}
        onPress={() => dispatch(clearCart())}
      >
        <Text style={styles.clearCartButtonText}>Clear Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "white",
    gap: 20,
    padding: 15,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 5,

    backgroundColor: "white",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "red",
    justifyContent: "space-between",
  },
  itemDetails: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  clearCartButton: {
    padding: 10,
    borderRadius: 5,

    alignItems: "center",
    backgroundColor: "#a83632",
    marginTop: "auto",
  },
  clearCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
