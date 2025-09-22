import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [mapGridEnabled, setMapGridEnabled] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem("appSettings");
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        setNotificationsEnabled(parsedSettings.notificationsEnabled || false);
        setDarkModeEnabled(parsedSettings.darkModeEnabled || false);
        setMapGridEnabled(parsedSettings.mapGridEnabled !== false); // default true
      }
    } catch (e) {
      console.error("Failed to load settings", e);
    }
  };

  const saveSettings = async () => {
    try {
      const settings = {
        notificationsEnabled,
        darkModeEnabled,
        mapGridEnabled,
      };
      await AsyncStorage.setItem("appSettings", JSON.stringify(settings));
      Alert.alert("Sucesso", "Configurações salvas com sucesso!");
    } catch (e) {
      console.error("Failed to save settings", e);
      Alert.alert("Erro", "Ocorreu um erro ao salvar as configurações");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Configurações do App</Text>
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notificações</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#767577", true: "#00B88D" }}
            thumbColor={notificationsEnabled ? "#008566" : "#f4f3f4"}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Modo Escuro</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: "#767577", true: "#00B88D" }}
            thumbColor={darkModeEnabled ? "#008566" : "#f4f3f4"}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Grade no Mapa</Text>
          <Switch
            value={mapGridEnabled}
            onValueChange={setMapGridEnabled}
            trackColor={{ false: "#767577", true: "#00B88D" }}
            thumbColor={mapGridEnabled ? "#008566" : "#f4f3f4"}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveButtonText}>Salvar Configurações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 15,
    backgroundColor: "#009975",
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
    borderBottomColor: "#ddd",
  },
  settingText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#009975",
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
