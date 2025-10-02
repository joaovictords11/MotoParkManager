import { useIsFocused } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getMotos } from "../api/api";
import LoadingIndicator from "../components/LoadingIndicator";
import { ThemeContext } from "../contexts/ThemeContext";

MaterialCommunityIcons.loadFont();

const ReportsScreen = () => {
  const { theme, isDarkMode } = useContext(ThemeContext);
  const styles = stylesFactory(theme);
  const isFocused = useIsFocused();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMostCommonModels = (motos) => {
    if (!motos || motos.length === 0) return "Nenhum dado";
    const modelCount = {};
    motos.forEach((moto) => {
      modelCount[moto.modelo] = (modelCount[moto.modelo] || 0) + 1;
    });

    const sortedModels = Object.entries(modelCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    return sortedModels
      .map(([model, count]) => `${model} (${count})`)
      .join(", ");
  };

  const loadReports = useCallback(async () => {
    try {
      const response = await getMotos(0, 100);
      const motos = response.data.content || response.data || [];

      const generatedReports = [
        {
          id: "1",
          title: "Motos no Pátio",
          value: motos.length.toString(),
          icon: "motorbike",
        },
        {
          id: "2",
          title: "Última Atualização",
          value: new Date().toLocaleTimeString(),
          icon: "clock-outline",
        },
        {
          id: "3",
          title: "Tema Ativo",
          value: isDarkMode ? "Modo Escuro" : "Modo Claro",
          icon: "theme-light-dark",
        },
        {
          id: "4",
          title: "Modelos Mais Comuns",
          value: getMostCommonModels(motos),
          icon: "chart-bar",
        },
      ];
      setReports(generatedReports);
    } catch (error) {
      console.error("Falha ao gerar relatórios:", error);
      Alert.alert("Erro", "Não foi possível gerar os relatórios.");
    } finally {
      setLoading(false);
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadReports();
    }
  }, [isFocused, loadReports]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <LoadingIndicator text="Gerando relatórios..." />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Relatórios do App</Text>
      </View>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.reportItem}>
            <View style={styles.reportIcon}>
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color={theme.primary}
              />
            </View>
            <View style={styles.reportContent}>
              <Text style={styles.reportTitle}>{item.title}</Text>
              <Text style={styles.reportValue}>{item.value}</Text>
            </View>
          </View>
        )}
      />
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
    listContainer: {
      padding: 20,
    },
    reportItem: {
      backgroundColor: theme.card,
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    reportIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.background,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },
    reportContent: {
      flex: 1,
    },
    reportTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 5,
    },
    reportValue: {
      fontSize: 16,
      color: theme.placeholder,
    },
  });

export default ReportsScreen;
