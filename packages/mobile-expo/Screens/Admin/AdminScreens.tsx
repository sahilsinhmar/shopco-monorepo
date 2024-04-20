import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHomeScreen from "./Home/AdminHomeScreen";
import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import CreateProduct from "./CreateProductScreen/CreateProduct";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile/Profile";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const CreateProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor.color,
        headerTitleStyle: styles.headerTitleStyle,
      }}
    >
      <Stack.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{ title: "Add Product" }}
      />
    </Stack.Navigator>
  );
};

const AdminTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: styles.tabBarActiveTintColor.color,
        tabBarInactiveTintColor: styles.tabBarInactiveTintColor.color,
        tabBarStyle: styles.tabBarStyle,
        headerStyle: styles.headerStyle,
        headerTintColor: styles.headerTintColor.color,
        headerTitleStyle: styles.headerTitleStyle,
      }}
    >
      <Tabs.Screen
        name="AdminHomeScreen"
        component={AdminHomeScreen}
        options={{
          headerTitle: "SHOP.CO",
          headerRight: () => (
            <Link to={{ screen: "CreateProductStack" }}>
              {Platform.OS === "web" ? (
                <View style={styles.addProductButton}>
                  <Text style={styles.addProductButtonText}>Add Product</Text>
                  <FontAwesome6 name="add" color="white" size={24} />
                </View>
              ) : (
                <FontAwesome6 name="add" color="white" size={24} />
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

export const AdminScreens = () => {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="AdminTabs">
        <Stack.Screen
          name="AdminTabs"
          component={AdminTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateProductStack"
          component={CreateProductStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#000",
  },
  headerTintColor: {
    color: "#fff",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 30,
  },
  tabBarActiveTintColor: {
    color: "#FFFFFF",
  },
  tabBarInactiveTintColor: {
    color: "#A9A9A9",
  },
  tabBarStyle: {
    backgroundColor: "#000",
  },
  addProductButton: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  addProductButtonText: {
    color: "white",
    fontSize: 18,
  },
});
