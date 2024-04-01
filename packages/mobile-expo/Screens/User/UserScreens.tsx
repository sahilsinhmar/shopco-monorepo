import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile/Profile";
import ProductScreen from "./ProductScreen/ProductScreen";
import UserHomeScreen from "./Home/HomeScreen";
import Cart from "./CartScreen/Cart";
import { useAppSelector } from "../../redux/hooks";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const commonScreenOptions = {
  headerStyle: {
    backgroundColor: "#000",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    // fontFamily: "inter-bold",
    fontWeight: "bold",
    fontSize: 30,
  },
};

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen name="Cart" component={Cart} options={{ title: "Cart" }} />
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
          headerRight: () => (
            <Link to={{ screen: "CartStack" }}>
              {Platform.OS === "web" ? (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>Cart</Text>
                  <FontAwesome6 name="cart-shopping" color="white" size={24} />
                </View>
              ) : (
                <FontAwesome6 name="cart-shopping" color="white" size={24} />
              )}
            </Link>
          ),
          headerRightContainerStyle: { paddingHorizontal: 20 },
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
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
      <StatusBar style="light" />
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
      </Stack.Navigator>
    </>
  );
};
