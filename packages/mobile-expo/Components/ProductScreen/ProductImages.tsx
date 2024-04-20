import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";

interface Props {
  images: string[];
}

const ProductImages = ({ images }: Props) => {
  return (
    <View style={styles.smallImagesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.smallImage}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProductImages;
