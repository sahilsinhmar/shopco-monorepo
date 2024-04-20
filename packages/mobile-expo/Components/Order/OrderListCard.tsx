import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function OrderListCard({ userOrder }) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const itemName =
    userOrder?.items?.length > 1
      ? `${userOrder?.items[0]?.name.substring(0, 7)}...+${
          userOrder?.items?.length - 1
        } more`
      : `${userOrder?.items[0]?.name}`;

  const itemDetails =
    userOrder?.items?.length > 1
      ? `${userOrder?.items?.length} Items`
      : `Size:  ${userOrder?.items[0]?.sizes}   x${userOrder.items[0].quantity}`;

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("OrderDetail", { userOrder })}
    >
      <View style={styles.rowContainer}>
        <View style={styles.leftContainer}>
          <Image
            source={{ uri: `${userOrder?.items[0]?.imageURL[0]}` }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.itemDetails}>
            <Text style={styles.orderId}>
              Order Id: {userOrder?.orderNo.toUpperCase()}
            </Text>
            <Text style={styles.itemName}>{itemName}</Text>
            <Text style={styles.itemDetailsText}>{itemDetails}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.orderStatus}>
            {userOrder.orderStatus.toUpperCase()}
          </Text>
          <Text style={styles.totalAmount}>
            &#8377; {userOrder.totalAmount}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.8,
    borderColor: "gray",
    padding: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  itemDetails: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  orderId: {
    color: "gray",
    fontWeight: "500",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemDetailsText: {
    fontWeight: "bold",
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderStatus: {
    padding: 5,
    fontWeight: "400",
    color: "gray",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "400",
    color: "green",
  },
});
