import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { checkOut, getMotos } from "../api/api";
import LoadingIndicator from "../components/LoadingIndicator";
import { ThemeContext } from "../contexts/ThemeContext";
import i18n from "../i18n/i18n";

const CheckOutScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { theme } = useContext(ThemeContext);
  const styles = stylesFactory(theme);

  const [motos, setMotos] = useState([]);
  const [selectedMoto, setSelectedMoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const loadMotos = useCallback(async () => {
    try {
      const response = await getMotos(0, 100);
      setMotos(response.data.content || response.data || []);
    } catch (error) {
      console.error("Falha ao carregar as motos:", error);
      Alert.alert(
        i18n.t("checkout_error_alert_title"),
        i18n.t("checkout_error_load")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadMotos();
    }
  }, [isFocused, loadMotos]);

  const handleCheckOut = async () => {
    if (!selectedMoto) {
      Alert.alert(
        i18n.t("checkout_error_alert_title"),
        i18n.t("checkout_error_select_moto")
      );
      return;
    }
    setCheckoutLoading(true);
    try {
      await checkOut(selectedMoto.placa);
      Alert.alert(
        i18n.t("checkout_success_alert_title"),
        i18n.t("checkout_success_alert_message"),
        [
          {
            text: "OK",
            onPress: () => {
              setMotos(motos.filter((m) => m.placa !== selectedMoto.placa));
              setSelectedMoto(null);
            },
          },
        ]
      );
    } catch (error) {
      console.error("Falha no check-out:", error);
      Alert.alert(
        i18n.t("checkout_error_alert_title"),
        i18n.t("checkout_error_alert_message")
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <LoadingIndicator text={i18n.t("checkout_loading")} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{i18n.t("checkout_title")}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>{i18n.t("checkout_subtitle")}</Text>

        <FlatList
          data={motos}
          keyExtractor={(item) => item.placa}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.motoItem,
                selectedMoto?.placa === item.placa && styles.selectedMotoItem,
              ]}
              onPress={() => setSelectedMoto(item)}
            >
              <Text style={styles.motoPlate}>{item.placa}</Text>
              <Text style={styles.motoModel}>{item.modelo}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{i18n.t("checkout_empty")}</Text>
            </View>
          }
        />

        {motos.length > 0 && (
          <TouchableOpacity
            style={[
              styles.button,
              (!selectedMoto || checkoutLoading) && styles.disabledButton,
            ]}
            onPress={handleCheckOut}
            disabled={!selectedMoto || checkoutLoading}
          >
            {checkoutLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>{i18n.t("checkout_button")}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
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
    content: {
      flex: 1,
      padding: 20,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 15,
      color: theme.text,
      fontWeight: "600",
    },
    motoItem: {
      backgroundColor: theme.card,
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.border,
    },
    selectedMotoItem: {
      borderColor: theme.primary,
      borderWidth: 2,
      backgroundColor: theme.background,
    },
    motoPlate: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
    },
    motoModel: {
      fontSize: 16,
      color: theme.placeholder,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    emptyText: {
      fontSize: 16,
      color: theme.placeholder,
    },
    button: {
      backgroundColor: theme.primary,
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
