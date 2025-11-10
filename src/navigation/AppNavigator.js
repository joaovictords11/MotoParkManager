import { createStackNavigator } from "@react-navigation/stack";
import i18n from "../i18n/i18n";
import AboutScreen from "../screens/AboutScreen";
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
      options={{ title: i18n.t("home_title") }}
    />
    <Stack.Screen
      name="Map"
      component={MapScreen}
      options={{ title: i18n.t("map_title") }}
    />
    <Stack.Screen
      name="CheckIn"
      component={CheckInScreen}
      options={{ title: i18n.t("checkin_title") }}
    />
    <Stack.Screen
      name="CheckOut"
      component={CheckOutScreen}
      options={{ title: i18n.t("checkout_title") }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ title: i18n.t("settings_title") }}
    />
    <Stack.Screen
      name="Reports"
      component={ReportsScreen}
      options={{ title: i18n.t("reports_title") }}
    />
    <Stack.Screen
      name="About"
      component={AboutScreen}
      options={{ title: i18n.t("about_title") }}
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
