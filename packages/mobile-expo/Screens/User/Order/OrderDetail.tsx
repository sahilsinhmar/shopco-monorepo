import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import ItemDetails from "../../../Components/ItemCardDetails/ItemCardDetails";
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axiosInstance from "../../../utils/Api/axiosInstance";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateOrderStatus } from "../../../redux/Slices/Orders";

export default function OrderDetail() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.User);
  const route = useRoute();
  const { userOrder }: any = route.params;

  const handleCancel = async () => {
    try {
      console.log(userOrder._id);
      const response = await axiosInstance.patch(
        `/api/v1/order/order-status-update/${userOrder._id}`,
        { status: "canceled" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        dispatch(updateOrderStatus({ id: userOrder._id, status: "canceled" }));
        navigation.navigate("OrderList");
      } else {
        Alert.alert("Error", "There is some error try again", [
          {
            text: "Back",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openAlert = () => {
    Alert.alert(
      "Cancel Order ",
      "Are you sure you want to cancel the order ?",
      [
        {
          text: "No",
          onPress: () => navigation.goBack(),
        },
        {
          text: "Yes",
          onPress: () => {
            handleCancel();
          },
        },
      ]
    );
  };

  useEffect(() => {
    navigation.setOptions({ title: ` Order: #${userOrder?.orderNo}` });
  }, [userOrder.orderNo]);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={userOrder.items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ItemDetails item={item} showButtons={false} />
          )}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.separator} />
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>
            &#8377; {userOrder.totalAmount}
          </Text>
        </View>
        {userOrder.orderStatus !== "canceled" && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.clearCartButton}
              onPress={openAlert}
            >
              <Text style={styles.clearCartButtonText}>Cancel Order</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    paddingHorizontal: 10,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoContainer: {
    flexDirection: "column",
    gap: 20,
    marginTop: "auto",
    marginBottom: 30,
  },
  clearCartButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#a83632",
    width: "100%",
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
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 18,
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
