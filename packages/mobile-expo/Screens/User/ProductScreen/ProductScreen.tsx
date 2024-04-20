import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { addItem, removeItem } from "../../../redux/Slices/Cart";
import ColorSelection from "../../../Components/ProductScreen/ColorSelection";
import SizeSelection from "../../../Components/ProductScreen/SizeSelection";
import ProductImages from "../../../Components/ProductScreen/ProductImages";

const ProductScreen = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const { product } = route.params;
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.setOptions({ title: product?.name });
  }, [product.name]);

  const handleAdd = () => {
    if (!selectedColor || !selectedSize) {
      setError("Please size and color to add to the cart");
      return;
    }
    const item = { ...product, colors: selectedColor, sizes: selectedSize };
    dispatch(addItem(item));
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <ProductImages images={product.imageURL} />
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <SizeSelection
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />
          <ColorSelection
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />
          <Text style={styles.error}>{error}</Text>
          <Text style={styles.productPrice}> &#8377; {product.price}</Text>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity onPress={handleAdd} style={styles.btn}>
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
  },

  smallImagesContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "black",
  },

  smallImage: {
    width: 390,
    height: "100%",
    resizeMode: "contain",
  },
  infoContainer: {
    flexDirection: "column",
    gap: 8,
    padding: 20,
  },
  productPrice: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 26,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
  },
  sizeContainer: {
    flexDirection: "column",
    gap: 4,
  },
  sizeItemsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  sizeButton: {
    backgroundColor: "white",
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "black",
  },
  sizeButtonSelected: {
    backgroundColor: "black",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  sizeTextSelected: {
    color: "white",
  },
  colorButton: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorButtonSelected: {
    borderColor: "black",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  error: {
    color: "red",
  },
  btn: {
    backgroundColor: "black",
    padding: 15,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
  },
});

export default ProductScreen;
