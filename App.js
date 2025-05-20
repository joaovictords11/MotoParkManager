import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Screens
import CheckInScreen from "./screens/CheckInScreen";
import CheckOutScreen from "./screens/CheckOutScreen";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import ReportsScreen from "./screens/ReportsScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
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
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
