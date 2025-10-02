import { useIsFocused } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMotos } from "../api/api";
import LoadingIndicator from "../components/LoadingIndicator";
import { ThemeContext } from "../contexts/ThemeContext";

const MapScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = stylesFactory(theme);
  const isFocused = useIsFocused();

  const [motoPositions, setMotoPositions] = useState([]);
  const [selectedMoto, setSelectedMoto] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMotoPositions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getMotos(0, 100);
      const motos = response.data.content || response.data || [];

      // Adiciona coordenadas aleatórias se a API não as fornecer
      const motosComPosicao = motos.map((moto) => ({
        ...moto,
        x: moto.x || Math.random() * 80 + 10,
        y: moto.y || Math.random() * 80 + 10,
      }));

      setMotoPositions(motosComPosicao);
    } catch (error) {
      console.error("Falha ao carregar posições:", error);
      Alert.alert("Erro", "Não foi possível carregar as posições das motos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadMotoPositions();
    }
  }, [isFocused, loadMotoPositions]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <LoadingIndicator text="Carregando mapa..." />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mapa do Pátio Mottu</Text>
      </View>

      <View style={styles.mapContainer}>
        <Image
          source={require("../../assets/park.jpg")}
          style={styles.mapImage}
          resizeMode="contain"
        />

        {motoPositions.map((moto, index) => (
          <TouchableOpacity
            key={moto.placa || index}
            style={[
              styles.motoMarker,
              {
                left: `${moto.x}%`,
                top: `${moto.y}%`,
                backgroundColor:
                  moto.placa === selectedMoto?.placa
                    ? theme.accent
                    : theme.primary,
              },
            ]}
            onPress={() => setSelectedMoto(moto)}
          >
            <Text style={styles.markerText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMoto && (
        <View style={styles.motoInfo}>
          <Text style={styles.infoTitle}>Informações da Moto</Text>
          <Text style={styles.infoText}>Placa: {selectedMoto.placa}</Text>
          <Text style={styles.infoText}>Modelo: {selectedMoto.modelo}</Text>
          <Text style={styles.infoText}>
            Entrada: {selectedMoto.checkInTime || "N/A"}
          </Text>
        </View>
      )}
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
    mapContainer: {
      flex: 1,
      margin: 20,
      backgroundColor: theme.card,
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
      borderWidth: 2,
      borderColor: theme.card,
    },
    markerText: {
      color: "#fff",
      fontWeight: "bold",
    },
    motoInfo: {
      backgroundColor: theme.card,
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
      color: theme.text,
    },
    infoText: {
      fontSize: 16,
      marginBottom: 5,
      color: theme.text,
    },
  });

export default MapScreen;
