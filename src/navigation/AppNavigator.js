import { createStackNavigator } from "@react-navigation/stack";
import CheckInScreen from "../screens/CheckInScreen";
import CheckOutScreen from "../screens/CheckOutScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MapScreen from "../screens/MapScreen";
import ReportsScreen from "../screens/ReportsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: "MotoPark Manager" }}
    />
    <Stack.Screen
      name="Map"
      component={MapScreen}
      options={{ title: "Mapa do Pátio" }}
    />
    <Stack.Screen
      name="CheckIn"
      component={CheckInScreen}
      options={{ title: "Check-In" }}
    />
    <Stack.Screen
      name="CheckOut"
      component={CheckOutScreen}
      options={{ title: "Check-Out" }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ title: "Configurações" }}
    />
    <Stack.Screen
      name="Reports"
      component={ReportsScreen}
      options={{ title: "Relatórios" }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Main" component={MainNavigator} />
  </Stack.Navigator>
);

export default AppNavigator;
