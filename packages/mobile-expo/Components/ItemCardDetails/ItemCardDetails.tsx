import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type ItemDetailsProps = {
  item: any;
  onAddItem?: (id: number) => void;
  onRemoveItem?: (id: number) => void;
  showButtons?: boolean;
};

const ItemDetails = ({
  item,
  onAddItem,
  onRemoveItem,
  showButtons = true,
}: ItemDetailsProps) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageAndDetailsContainer}>
        <Image
          source={{ uri: item.imageURL[0] }}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemSize}>Size: {item.sizes}</Text>
          {showButtons && (
            <View style={styles.buttonContainer}>
              {onRemoveItem && (
                <TouchableOpacity onPress={() => onRemoveItem(item._id)}>
                  <AntDesign name="minuscircleo" size={24} color="black" />
                </TouchableOpacity>
              )}
              {item.quantity && (
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
              )}
              {onAddItem && (
                <TouchableOpacity onPress={() => onAddItem(item)}>
                  <AntDesign name="pluscircleo" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.itemPrice}>&#8377; {item.price}</Text>
        {item.quantity && (
          <Text style={styles.itemQuantity}>x{item.quantity}</Text>
        )}
        <Text style={styles.totalPrice}>
          &#8377;
          {parseFloat(item.price) * (item.quantity || 1)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "white",
    marginBottom: 20,
    justifyContent: "space-between",
    borderWidth: 0.6,
  },
  imageAndDetailsContainer: {
    flexDirection: "row",
    gap: 1,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderWidth: 1,
  },
  itemDetails: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemSize: {
    fontSize: 14,
  },
  itemQuantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  priceContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },
  itemPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ItemDetails;
