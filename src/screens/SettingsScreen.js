import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../contexts/ThemeContext";
import i18n from "../i18n/i18n";

const SettingsScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);
  const styles = stylesFactory(theme);
  const navigation = useNavigation();

  const handleSaveChanges = () => {
    Alert.alert(
      i18n.t("settings_save_success_title"),
      i18n.t("settings_save_success_message")
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{i18n.t("settings_title")}</Text>
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>{i18n.t("settings_dark_mode")}</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: theme.secondary }}
            thumbColor={isDarkMode ? theme.primary : "#f4f3f4"}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>
            {i18n.t("settings_notifications")}
          </Text>
          <Switch disabled />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>{i18n.t("settings_map_grid")}</Text>
          <Switch value={true} disabled />
        </View>

        <TouchableOpacity
          style={styles.aboutButton}
          onPress={() => navigation.navigate("About")}
        >
          <Text style={styles.settingText}>
            {i18n.t("settings_about_button")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>
            {i18n.t("settings_save_button")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const stylesFactory = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: 15,
      backgroundColor: theme.primary,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
    },
    settingsContainer: {
      padding: 20,
    },
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    aboutButton: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    settingText: {
      fontSize: 16,
      color: theme.text,
    },
    saveButton: {
      backgroundColor: theme.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 30,
    },
    saveButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });

export default SettingsScreen;
