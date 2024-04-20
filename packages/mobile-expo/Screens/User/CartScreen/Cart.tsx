import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  FlatList,
} from "react-native";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { clearCart, addItem, removeItem } from "../../../redux/Slices/Cart";
import { useStripe } from "@stripe/stripe-react-native";
import axiosInstance from "../../../utils/Api/axiosInstance";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import ItemDetails from "../../../Components/ItemCardDetails/ItemCardDetails";
import { updateOrdersList } from "../../../redux/Slices/Orders";

export default function Cart() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { cartItems, totalPrice } = useAppSelector((state) => state.Cart);
  const { userInfo, token } = useAppSelector((state) => state.User);
  const dispatch = useAppDispatch();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handlePayment = async () => {
    try {
      const totalAmount = Math.round(totalPrice * 100);

      const paymentIntentResponse = await axiosInstance.post(
        "/api/v1/payment/create-payment-intent",
        { amount: totalAmount, currency: "inr" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { clientSecret } = paymentIntentResponse.data;

      const { error: paymentSheetError } = await initPaymentSheet({
        merchantDisplayName: "Shopco",
        paymentIntentClientSecret: clientSecret,
      });
      if (paymentSheetError) {
        Alert.alert(`Error during payment: ${paymentSheetError.message}`);
        return;
      }

      const { error: presentPaymentSheetError } = await presentPaymentSheet();
      if (presentPaymentSheetError) {
        Alert.alert("Payment is unsucessfull ,Please try again");
        return;
      }
      createOrder();
    } catch (error) {
      if (error instanceof Error) console.log("Error:", error.message);
    }
  };

  const createOrder = async () => {
    try {
      const payload = {
        userId: userInfo?.id,
        products: cartItems,
        totalPrice: totalPrice,
      };

      const response = await axiosInstance.post(
        "/api/v1/order/create-order",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "SUCCESS") {
        dispatch(updateOrdersList(response?.data?.data));
        navigation.navigate("OrderSuccessfull");
        dispatch(clearCart());
      } else {
        navigation.navigate("OrderRejection");
        dispatch(clearCart());
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.msg);
      } else {
        console.log("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ItemDetails
                item={item}
                onAddItem={(item) => dispatch(addItem(item))}
                onRemoveItem={(itemId) => dispatch(removeItem(itemId))}
              />
            )}
          />
          <View style={styles.separator} />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>&#8377; {totalPrice}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.PaymentButton}
              onPress={() => handlePayment()}
            >
              <Text style={styles.clearCartButtonText}>Paymentt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.clearCartButton}
              onPress={() => dispatch(clearCart())}
            >
              <Text style={styles.clearCartButtonText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Image
          source={require("../../../assets/images/empty-cart.png")}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    gap: 10,
    paddingVertical: 15,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "white",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  itemDetails: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 20,
    width: 350,
    alignSelf: "center",
    alignContent: "flex-end",
    marginTop: "auto",
  },
  PaymentButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "darkgreen",
  },
  clearCartButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#a83632",
  },
  clearCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: "auto",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  totalPrice: {
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
});
