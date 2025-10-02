import { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

const LoadingIndicator = ({ text = "Carregando..." }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text style={[styles.loadingText, { color: theme.text }]}>{text}</Text>
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
