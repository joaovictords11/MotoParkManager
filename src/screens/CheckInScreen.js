import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { checkIn, createMoto } from "../api/api";
import { ThemeContext } from "../contexts/ThemeContext";
import i18n from "../i18n/i18n";
import { scheduleLocalNotification } from "../services/notificationService";

const CheckInScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const styles = stylesFactory(theme);

  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!placa) newErrors.placa = i18n.t("checkin_error_plate_required");
    else if (placa.length < 7)
      newErrors.placa = i18n.t("checkin_error_plate_min");
    if (!modelo) newErrors.modelo = i18n.t("checkin_error_model_required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckIn = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await createMoto({ placa, modelo });
      await checkIn(placa);

      // Agendamento da notificação
      await scheduleLocalNotification(
        i18n.t("checkin_notification_title"),
        i18n.t("checkin_notification_body", { placa: placa })
      );

      Alert.alert(
        i18n.t("checkin_success_alert_title"),
        i18n.t("checkin_success_alert_message", { placa: placa }),
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error(
        "Falha no check-in:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.message || i18n.t("checkin_error_alert_message");
      Alert.alert(i18n.t("checkin_error_alert_title"), errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{i18n.t("checkin_title")}</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>{i18n.t("checkin_plate_label")}</Text>
        <TextInput
          style={[styles.input, errors.placa && styles.inputError]}
          placeholder={i18n.t("checkin_plate_placeholder")}
          placeholderTextColor={theme.placeholder}
          value={placa}
          onChangeText={setPlaca}
          autoCapitalize="characters"
        />
        {errors.placa && <Text style={styles.errorText}>{errors.placa}</Text>}

        <Text style={styles.label}>{i18n.t("checkin_model_label")}</Text>
        <TextInput
          style={[styles.input, errors.modelo && styles.inputError]}
          placeholder={i18n.t("checkin_model_placeholder")}
          placeholderTextColor={theme.placeholder}
          value={modelo}
          onChangeText={setModelo}
        />
        {errors.modelo && <Text style={styles.errorText}>{errors.modelo}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleCheckIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{i18n.t("checkin_button")}</Text>
          )}
        </TouchableOpacity>
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
    formContainer: {
      padding: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: theme.text,
      fontWeight: "600",
    },
    input: {
      backgroundColor: theme.card,
      color: theme.text,
      padding: 15,
      borderRadius: 8,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: theme.border,
    },
    inputError: {
      borderColor: theme.accent,
      borderWidth: 2,
    },
    errorText: {
      color: theme.accent,
      marginBottom: 15,
      marginLeft: 5,
    },
    button: {
      backgroundColor: theme.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 20,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });

export default CheckInScreen;
