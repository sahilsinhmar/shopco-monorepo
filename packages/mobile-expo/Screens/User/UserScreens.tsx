import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserHomeScreen from "./Home/HomeScreen";

const Stack = createNativeStackNavigator();

export const UserScreens = () => {
  return (
    <Stack.Navigator initialRouteName="UserHomeScreen">
      <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
    </Stack.Navigator>
  );
};
