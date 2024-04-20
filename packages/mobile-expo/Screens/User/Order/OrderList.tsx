import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import OrderListCard from "../../../Components/Order/OrderListCard";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import axiosInstance from "../../../utils/Api/axiosInstance";

import axios from "axios";
import OrderListCardSkeleton from "../../../Components/Order/OrderListCardSkeleton";
import { addOrders } from "../../../redux/Slices/Orders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { clearUser } from "../../../redux/Slices/User";

export default function OrderList() {
  const { userInfo, token } = useAppSelector((state) => state.User);
  const { orders } = useAppSelector((state) => state.Orders);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("name");
      dispatch(clearUser());
      navigation.replace("Auth");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/api/v1/order/${userInfo?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.status);
      if (response.status === 204) {
        dispatch(addOrders([]));
      }

      if (response && response.data && response.data.userOrders) {
        dispatch(addOrders(response.data.userOrders));
      }
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.msg);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      {isLoading && (
        <FlatList
          data={Array.from({ length: 6 })}
          renderItem={({ item }) => <OrderListCardSkeleton />}
          contentContainerStyle={styles.flatListContentContainer}
        />
      )}
      {orders?.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderListCard userOrder={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.flatListContentContainer}
        />
      ) : (
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>No Orders yet</Text>
        </View>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  error: {
    color: "red",
  },
  flatListContentContainer: {
    gap: 10,
    padding: 10,
  },
  noOrdersContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noOrdersText: {
    fontWeight: "500",
    fontSize: 24,
    color: "gray",
  },
});
