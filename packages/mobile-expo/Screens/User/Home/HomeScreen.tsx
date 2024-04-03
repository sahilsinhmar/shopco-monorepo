import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import SkeletonProductCard from "../../../Components/ProductCard/SkeletonProductCard";
import { useAppSelector } from "../../../redux/hooks";

export default function UserHomeScreen() {
  const { token } = useAppSelector((state) => state.User);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${
          Platform.OS === "web"
            ? "http://localhost:3000"
            : process.env.EXPO_PUBLIC_BASE_URI
        }/api/v1/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response && response.data && response.data.products) {
        return response.data.products;
      } else {
        throw new Error("No products found in response data");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.msg);
      } else {
        console.error("An unexpected error occurred. Please try again later.");
      }
      throw error;
    }
  };

  const {
    data: products,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const filteredProducts = products?.filter((product: any) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Products</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "70%",
          alignSelf: "center",
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        placeholder="Search products..."
      />

      {queryError && <Text>Error: {queryError.message}</Text>}
      {isLoading && (
        <FlatList
          data={Array.from({ length: 6 })}
          renderItem={({ item }) => <SkeletonProductCard />}
          numColumns={2}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          columnWrapperStyle={{ gap: 10 }}
        />
      )}
      {products?.length > 0 && (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={Platform.OS === "web" ? 4 : 2}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: Platform.OS === "web" ? 20 : 5,
            borderWidth: 1,
            paddingVertical: 10,
            borderColor: "red",
          }}
          columnWrapperStyle={{ gap: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 6,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
