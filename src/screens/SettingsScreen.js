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
import { ThemeContext } from "../contexts/ThemeContext"; // 1. Importa o contexto

const SettingsScreen = () => {
  // 2. Pega o tema atual, o estado e a função para trocar o tema do contexto
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);
  const styles = stylesFactory(theme);

  // O botão de salvar não é mais estritamente necessário para o tema,
  // pois a mudança é aplicada instantaneamente.
  // Mantemos para outras configurações futuras.
  const handleSaveChanges = () => {
    Alert.alert("Sucesso", "Configurações salvas!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Configurações do App</Text>
      </View>

      <View style={styles.settingsContainer}>
        {/* Item do Modo Escuro */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Modo Escuro</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme} // 3. Chama a função do contexto diretamente
            trackColor={{ false: "#767577", true: theme.secondary }}
            thumbColor={isDarkMode ? theme.primary : "#f4f3f4"}
          />
        </View>

        {/* Outros itens de configuração podem vir aqui */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notificações</Text>
          <Switch disabled />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Grade no Mapa</Text>
          <Switch value={true} disabled />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Salvar Configurações</Text>
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
