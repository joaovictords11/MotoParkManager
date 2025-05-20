import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CheckInScreen = () => {
  const navigation = useNavigation();
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [position, setPosition] = useState("");
  const [checkInTime, setCheckInTime] = useState("");

  const handleCheckIn = async () => {
    if (!plate || !model || !position) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    const currentTime = new Date().toLocaleString();
    setCheckInTime(currentTime);

    const newMoto = {
      plate,
      model,
      position,
      checkInTime: currentTime,
      x: Math.random() * 80 + 10, // Random position x (10-90%)
      y: Math.random() * 80 + 10, // Random position y (10-90%)
    };

    try {
      // Save moto data
      const existingMotos = await AsyncStorage.getItem("motoPositions");
      let motos = [];
      if (existingMotos) {
        motos = JSON.parse(existingMotos);
      }
      motos.push(newMoto);
      await AsyncStorage.setItem("motoPositions", JSON.stringify(motos));

      // Update total count
      const total = await AsyncStorage.getItem("totalMotos");
      const newTotal = total ? parseInt(total) + 1 : 1;
      await AsyncStorage.setItem("totalMotos", newTotal.toString());
      await AsyncStorage.setItem("lastUpdate", currentTime);

      Alert.alert("Sucesso", "Check-In realizado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      console.error("Failed to save data", e);
      Alert.alert("Erro", "Ocorreu um erro ao salvar os dados");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Check-In de Moto</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Placa da Moto*</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: ABC1D23"
          value={plate}
          onChangeText={setPlate}
          autoCapitalize="characters"
        />

        <Text style={styles.label}>Modelo*</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Honda CG 160"
          value={model}
          onChangeText={setModel}
        />

        <Text style={styles.label}>Posição no Pátio*</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Setor A, Vaga 12"
          value={position}
          onChangeText={setPosition}
        />

        {checkInTime && (
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              Horário de Entrada: {checkInTime}
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleCheckIn}>
          <Text style={styles.buttonText}>Registrar Check-In</Text>
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
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  timeContainer: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    color: "#1976d2",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#009975",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CheckInScreen;
