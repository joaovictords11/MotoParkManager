import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CheckOutScreen = () => {
  const navigation = useNavigation();
  const [motos, setMotos] = useState([]);
  const [selectedMoto, setSelectedMoto] = useState(null);

  useEffect(() => {
    loadMotos();
  }, []);

  const loadMotos = async () => {
    try {
      const motosData = await AsyncStorage.getItem("motoPositions");
      if (motosData) {
        setMotos(JSON.parse(motosData));
      }
    } catch (e) {
      console.error("Failed to load motos", e);
    }
  };

  const handleCheckOut = async () => {
    if (!selectedMoto) {
      Alert.alert("Erro", "Selecione uma moto para fazer check-out");
      return;
    }

    try {
      const updatedMotos = motos.filter((m) => m.plate !== selectedMoto.plate);
      await AsyncStorage.setItem("motoPositions", JSON.stringify(updatedMotos));

      const total = await AsyncStorage.getItem("totalMotos");
      const newTotal = total ? parseInt(total) - 1 : 0;
      await AsyncStorage.setItem("totalMotos", newTotal.toString());
      await AsyncStorage.setItem("lastUpdate", new Date().toLocaleString());

      Alert.alert("Sucesso", "Check-Out realizado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      console.error("Failed to update data", e);
      Alert.alert("Erro", "Ocorreu um erro ao atualizar os dados");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Check-Out de Moto</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Motos no pátio: {motos.length}</Text>

        <FlatList
          data={motos}
          keyExtractor={(item) => item.plate}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.motoItem,
                selectedMoto?.plate === item.plate && styles.selectedMotoItem,
              ]}
              onPress={() => setSelectedMoto(item)}
            >
              <Text style={styles.motoPlate}>{item.plate}</Text>
              <Text style={styles.motoModel}>{item.model}</Text>
              <Text style={styles.motoTime}>Entrada: {item.checkInTime}</Text>
              <Text style={styles.motoPosition}>Posição: {item.position}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma moto no pátio</Text>
            </View>
          }
        />

        {motos.length > 0 && (
          <TouchableOpacity
            style={[styles.button, !selectedMoto && styles.disabledButton]}
            onPress={handleCheckOut}
            disabled={!selectedMoto}
          >
            <Text style={styles.buttonText}>Registrar Check-Out</Text>
          </TouchableOpacity>
        )}
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
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    color: "#555",
    fontWeight: "600",
  },
  motoItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedMotoItem: {
    borderColor: "#009975",
    borderWidth: 2,
    backgroundColor: "#E8F9F5",
  },
  motoPlate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  motoModel: {
    fontSize: 16,
    color: "#555",
    marginBottom: 3,
  },
  motoTime: {
    fontSize: 14,
    color: "#777",
    marginBottom: 3,
  },
  motoPosition: {
    fontSize: 14,
    color: "#777",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
  },
  button: {
    backgroundColor: "#009975",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckOutScreen;
