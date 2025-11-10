import { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";
import i18n from "../i18n/i18n";

const LoadingIndicator = ({ text }) => {
  const { theme } = useContext(ThemeContext);
  const loadingText = text || i18n.t("reports_loading"); // "Gerando relatórios..." como padrão genérico

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text style={[styles.loadingText, { color: theme.text }]}>
        {loadingText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoadingIndicator;
