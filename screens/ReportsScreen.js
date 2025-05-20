import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Carrega os ícones antes de usar (solução para o problema)
MaterialCommunityIcons.loadFont();

const ReportsScreen = () => {
  const navigation = useNavigation();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const motosData = await AsyncStorage.getItem("motoPositions");
      const settings = await AsyncStorage.getItem("appSettings");

      if (motosData) {
        const motos = JSON.parse(motosData);

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
            value:
              motos.length > 0
                ? motos[motos.length - 1].checkInTime
                : "Nenhuma moto registrada",
            icon: "clock-outline",
          },
          {
            id: "3",
            title: "Configurações",
            value: settings
              ? JSON.parse(settings).darkModeEnabled
                ? "Modo Escuro"
                : "Modo Claro"
              : "Padrão",
            icon: "cog-outline",
          },
          {
            id: "4",
            title: "Modelos Mais Comuns",
            value:
              motos.length > 0 ? getMostCommonModels(motos) : "Nenhum dado",
            icon: "chart-bar",
          },
        ];

        setReports(generatedReports);
      }
      setLoading(false);
    } catch (e) {
      console.error("Failed to load reports", e);
      setLoading(false);
    }
  };

  const getMostCommonModels = (motos) => {
    const modelCount = {};
    motos.forEach((moto) => {
      modelCount[moto.model] = (modelCount[moto.model] || 0) + 1;
    });

    const sortedModels = Object.entries(modelCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    return sortedModels
      .map(([model, count]) => `${model} (${count})`)
      .join(", ");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Relatórios do App</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#009975" />
          <Text style={styles.loadingText}>Carregando relatórios...</Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.reportItem}
              onPress={() => navigation.navigate("Map")}
            >
              <View style={styles.reportIcon}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={24}
                  color="#009975"
                />
              </View>
              <View style={styles.reportContent}>
                <Text style={styles.reportTitle}>{item.title}</Text>
                <Text style={styles.reportValue}>{item.value}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#555",
  },
  listContainer: {
    padding: 20,
  },
  reportItem: {
    backgroundColor: "#fff",
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
    backgroundColor: "#e3f2fd",
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
    color: "#333",
    marginBottom: 5,
  },
  reportValue: {
    fontSize: 16,
    color: "#555",
  },
});

export default ReportsScreen;
