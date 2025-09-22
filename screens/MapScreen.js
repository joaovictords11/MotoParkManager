import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MapScreen = () => {
  const [motoPositions, setMotoPositions] = useState([]);
  const [selectedMoto, setSelectedMoto] = useState(null);

  useEffect(() => {
    loadMotoPositions();
  }, []);

  const loadMotoPositions = async () => {
    try {
      const positions = await AsyncStorage.getItem("motoPositions");
      if (positions !== null) {
        setMotoPositions(JSON.parse(positions));
      }
    } catch (e) {
      console.error("Failed to load moto positions", e);
    }
  };

  const handlePositionPress = (position) => {
    setSelectedMoto(position);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mapa do Pátio Mottu</Text>
      </View>

      <View style={styles.mapContainer}>
        <Image
          source={require("../assets/park.jpg")}
          style={styles.mapImage}
          resizeMode="contain"
        />

        {motoPositions.map((moto, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.motoMarker,
              {
                left: `${moto.x}%`,
                top: `${moto.y}%`,
                backgroundColor:
                  moto.plate === selectedMoto?.plate ? "#ff5722" : "#4caf50",
              },
            ]}
            onPress={() => handlePositionPress(moto)}
          >
            <Text style={styles.markerText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMoto && (
        <View style={styles.motoInfo}>
          <Text style={styles.infoTitle}>Informações da Moto</Text>
          <Text style={styles.infoText}>Placa: {selectedMoto.plate}</Text>
          <Text style={styles.infoText}>Modelo: {selectedMoto.model}</Text>
          <Text style={styles.infoText}>
            Entrada: {selectedMoto.checkInTime}
          </Text>
          <Text style={styles.infoText}>Posição: {selectedMoto.position}</Text>
        </View>
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
  mapContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  motoMarker: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  markerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  motoInfo: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
});

export default MapScreen;
