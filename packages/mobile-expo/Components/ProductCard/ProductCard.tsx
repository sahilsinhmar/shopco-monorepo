import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function ProductCard({ product }: any) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("ProductScreen", { product })}
    >
      <View>
        <View>
          <Image
            source={{
              uri: `${product.imageURL[0]}`,
            }}
            style={styles.image}
            resizeMode={Platform.OS === "web" ? "center" : "cover"}
          />
        </View>
        <View style={styles.infocontainer}>
          <Text style={{ fontWeight: "bold" }}>{product.name}</Text>
          <Text style={{ color: "gray", fontWeight: "300" }}>
            {product.description}
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>
            &#8377; {product.price}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    gap: 5,
    maxWidth: Platform.OS === "web" ? 350 : 190,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  imageContainer: {},
  image: {
    width: "100%",
    height: 300,
  },
  infocontainer: {
    flexDirection: "column",
    gap: 4,
    padding: 10,
  },
});
