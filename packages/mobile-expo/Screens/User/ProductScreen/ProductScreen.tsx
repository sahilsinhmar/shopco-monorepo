import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PagerView from "react-native-pager-view";

const ProductScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const { product } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: product?.name });
  }, [product.name]);

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.imageContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
      >
        {product?.imageURL.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.productImage}
          />
        ))}
      </PagerView>

      <Text style={styles.productPrice}> &#8377; {product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    borderWidth: 1,
    backgroundColor: "black",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
  },
});

export default ProductScreen;
