import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar, Platform, View, Text, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import Profile from "./Profile/Profile";
import ProductScreen from "./ProductScreen/ProductScreen";
import UserHomeScreen from "./Home/HomeScreen";
import Cart from "./CartScreen/Cart";
import { useAppSelector } from "../../redux/hooks";
import OrderSuccessfull from "./Order/OrderSuccessfull/OrderSuccessfull";
import OrderRejection from "./Order/OrderRejection/OrderRejection";
import OrderList from "./Order/OrderList";
import OrderDetail from "./Order/OrderDetail";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

// Custom hook to get the cart item count
const useCartItemCount = () => {
  const cartItems = useAppSelector((state) => state.Cart.cartItems);
  return cartItems.length;
};

// Component to render the cart icon with item count
const CartIcon = () => {
  const numberOfItems = useCartItemCount();
  return (
    <Link to={{ screen: "CartStack" }}>
      <View style={styles.cartIconContainer}>
        {numberOfItems > 0 && (
          <Text style={styles.cartItemCount}>{numberOfItems}</Text>
        )}
        <View style={{ marginRight: 20 }}>
          <FontAwesome6 name="cart-shopping" color="white" size={24} />
        </View>
      </View>
    </Link>
  );
};

const commonScreenOptions = {
  headerStyle: {
    backgroundColor: "#000",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold" as "bold",
    fontSize: 26,
  },

  headerRight: () => <CartIcon />,
};

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen name="Cart" component={Cart} options={{ title: "Cart" }} />
      <Stack.Screen
        name="OrderSuccessfull"
        component={OrderSuccessfull}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderRejection"
        component={OrderRejection}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const UserTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        ...commonScreenOptions,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#A9A9A9",
        tabBarStyle: {
          backgroundColor: "#000",
        },
      }}
    >
      <Tabs.Screen
        name="UserHomeScreen"
        component={UserHomeScreen}
        options={{
          headerTitle: "SHOP.CO",
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="OrderList"
        component={OrderList}
        options={{
          title: "Orders",
          headerTitle: "Your Orders",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export const UserScreens = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={commonScreenOptions}
        initialRouteName="UserTabs"
      >
        <Stack.Screen
          name="UserTabs"
          component={UserTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CartStack"
          component={CartStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductScreen"
          component={ProductScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{
            title: "",
          }}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemCount: {
    color: "white",
    marginRight: 8,
  },
});
