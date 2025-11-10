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
import i18n from "../i18n/i18n";

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
      Alert.alert(
        i18n.t("checkout_error_alert_title"),
        i18n.t("map_error_load")
      );
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
        <LoadingIndicator text={i18n.t("map_loading")} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{i18n.t("map_title")}</Text>
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
          <Text style={styles.infoTitle}>{i18n.t("map_info_title")}</Text>
          <Text style={styles.infoText}>
            {i18n.t("map_info_plate")} {selectedMoto.placa}
          </Text>
          <Text style={styles.infoText}>
            {i18n.t("map_info_model")} {selectedMoto.modelo}
          </Text>
          <Text style={styles.infoText}>
            {i18n.t("map_info_entry")}{" "}
            {selectedMoto.checkInTime || i18n.t("home_stats_na")}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// ... (stylesFactory permanece o mesmo)
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
