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
import axiosInstance from "../../../utils/Api/axiosInstance";

export default function UserHomeScreen() {
  const { token } = useAppSelector((state) => state.User);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      <TextInput
        style={styles.searchInput}
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
          contentContainerStyle={styles.flatListContentContainer}
          columnWrapperStyle={styles.flatListColumnWrapper}
        />
      )}
      {products?.length > 0 && (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard product={item} />}
          numColumns={Platform.OS === "web" ? 4 : 2}
          contentContainerStyle={[
            styles.flatListContentContainer,
            { paddingHorizontal: Platform.OS === "web" ? 20 : 5 },
          ]}
          columnWrapperStyle={styles.flatListColumnWrapper}
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
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "70%",
    alignSelf: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  flatListContentContainer: {
    gap: 10,
    padding: 10,
  },
  flatListColumnWrapper: {
    gap: 10,
  },
});
