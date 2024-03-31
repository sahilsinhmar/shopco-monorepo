import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminHomeScreen from "./Home/AdminHomeScreen";
import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, Text, View } from "react-native";
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
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          // fontFamily: "inter-bold",
          fontWeight: "bold",
          fontSize: 30,
        },
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
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#A9A9A9",
        tabBarStyle: {
          backgroundColor: "#000",
        },
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          // fontFamily: "inter-bold",
          fontWeight: "bold",
          fontSize: 30,
        },
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
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Add Product
                  </Text>
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
      <Stack.Navigator
        initialRouteName="AdminTabs"
        // screenOptions={{
        //   headerStyle: {
        //     backgroundColor: "#000",
        //   },
        //   headerTintColor: "#fff",
        //   headerTitleStyle: {
        //     // fontFamily: "inter-bold",
        //     fontWeight: "bold",
        //     fontSize: 30,
        //   },
        // }}
      >
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
