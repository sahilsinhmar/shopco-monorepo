import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { addItem, clearCart, removeItem } from "../../../redux/Slices/Cart";

const ProductScreen = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const { product } = route.params;
  const dispatch = useAppDispatch();

  const colorMapping = {
    Red: "#FF0000",
    Blue: "#0000FF",
    Green: "#008000",
    Yellow: "#FFFF00",
    Orange: "#FFA500",
    Purple: "#800080",
    Pink: "#FFC0CB",
    Black: "#000000",
    White: "#FFFFFF",
    Gray: "#808080",
  };

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
        {/* <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageURL[selectedImageIndex] }}
          style={styles.productImage}
        />
      </View> */}
        <View style={styles.smallImagesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {product.imageURL.map((image, index) => (
              // <Pressable
              //   // onPress={() => setSelectedImageIndex(index)}
              //   style={[
              //     styles.smallImageContainer,
              //     {
              //       borderColor: selectedImageIndex === index ? "black" : "white",
              //     },
              //   ]}
              // >
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.smallImage}
              />
              // </Pressable>
            ))}
          </ScrollView>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <View style={styles.sizeContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Sizes</Text>

            <View style={styles.sizeItemsContainer}>
              {product.sizes.map((size) => (
                <Pressable
                  onPress={() => setSelectedSize(size)}
                  key={size}
                  style={[
                    styles.sizes,
                    {
                      backgroundColor:
                        selectedSize === size ? "black" : "white",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      { color: selectedSize === size ? "white" : "black" },
                    ]}
                  >
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.sizeContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Colors</Text>

            <View style={styles.sizeItemsContainer}>
              {product.colors.map((color, index) => {
                const backgroundColor = colorMapping[color];

                return (
                  <Pressable
                    onPress={() => setSelectedColor(color)}
                    key={index}
                    style={[
                      styles.sizes,
                      {
                        backgroundColor,
                        borderWidth: selectedColor === color ? 2 : 0,
                        borderColor:
                          selectedColor === color ? "black" : "transparent",
                      },
                    ]}
                  ></Pressable>
                );
              })}
            </View>
          </View>
          <Text>{error}</Text>
          <Text style={styles.productPrice}> &#8377; {product.price}</Text>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity onPress={handleAdd} style={styles.btn}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              // fontFamily: "inter-bold",
              fontSize: 24,
            }}
          >
            Add to Cart
          </Text>
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
  smallImagesContainer: {
    width: "100%",
    height: 300,

    backgroundColor: "black",
  },
  smallImageContainer: {
    width: "100%",
    height: "100%",
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
  sizes: {
    backgroundColor: "white",
    width: 40,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "black",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
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
});

export default ProductScreen;
