import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [totalMotos, setTotalMotos] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const loadData = async () => {
    try {
      const motos = await AsyncStorage.getItem("totalMotos");
      const update = await AsyncStorage.getItem("lastUpdate");

      if (motos !== null) {
        setTotalMotos(parseInt(motos));
      }

      if (update !== null) {
        setLastUpdate(update);
      }
    } catch (e) {
      console.error("Failed to load data", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require("../assets/moto.png")} style={styles.logo} />
          <Text style={styles.title}>MotoPark Manager</Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Estatísticas do Pátio</Text>
          <View style={styles.statsCard}>
            <Text style={styles.statsValue}>{totalMotos}</Text>
            <Text style={styles.statsLabel}>Motos no pátio</Text>
          </View>
          <Text style={styles.updateText}>
            Última atualização: {lastUpdate || "N/A"}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Map")}
          >
            <Image
              source={require("../assets/map.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Ver Mapa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("CheckIn")}
          >
            <Image
              source={require("../assets/checkIn.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Fazer Check-In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("CheckOut")}
          >
            <Image
              source={require("../assets/checkOut.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Fazer Check-Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Reports")}
          >
            <Image
              source={require("../assets/reports.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Relatórios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <Image
              source={require("../assets/settings.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  statsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#444",
  },
  statsCard: {
    backgroundColor: "#009975",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  statsValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  statsLabel: {
    fontSize: 16,
    color: "#fff",
  },
  updateText: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  actionIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

export default HomeScreen;
