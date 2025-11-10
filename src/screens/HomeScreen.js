import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
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
import { registerForPushNotificationsAsync } from "../services/notificationService";

const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { theme } = useContext(ThemeContext);
  const styles = stylesFactory(theme);

  const [totalMotos, setTotalMotos] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Efeito para registrar notificações na inicialização
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const loadData = useCallback(async () => {
    try {
      const response = await getMotos(0, 1);
      setTotalMotos(response.data.totalElements || response.data.length || 0);
      setLastUpdate(new Date().toLocaleString());
    } catch (error) {
      console.error("Falha ao carregar os dados:", error);
      setTotalMotos(0);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadData();
    }
  }, [isFocused, loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <LoadingIndicator text={i18n.t("home_loading_data")} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
      >
        <View style={styles.header}>
          <Image
            source={require("../../assets/moto.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>{i18n.t("home_title")}</Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>{i18n.t("home_stats_title")}</Text>
          <View style={styles.statsCard}>
            <Text style={styles.statsValue}>{totalMotos}</Text>
            <Text style={styles.statsLabel}>
              {i18n.t("home_stats_value_label")}
            </Text>
          </View>
          <Text style={styles.updateText}>
            {i18n.t("home_stats_update_label")}{" "}
            {lastUpdate || i18n.t("home_stats_na")}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Map")}
          >
            <Image
              source={require("../../assets/map.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>{i18n.t("home_action_map")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("CheckIn")}
          >
            <Image
              source={require("../../assets/checkIn.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>
              {i18n.t("home_action_checkin")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("CheckOut")}
          >
            <Image
              source={require("../../assets/checkOut.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>
              {i18n.t("home_action_checkout")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Reports")}
          >
            <Image
              source={require("../../assets/reports.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>
              {i18n.t("home_action_reports")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <Image
              source={require("../../assets/settings.png")}
              style={styles.actionIcon}
            />
            <Text style={styles.actionText}>
              {i18n.t("home_action_settings")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
      color: theme.text,
    },
    statsContainer: {
      backgroundColor: theme.card,
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
      color: theme.text,
    },
    statsCard: {
      backgroundColor: theme.primary,
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
      color: theme.placeholder,
      textAlign: "center",
    },
    actionsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    actionButton: {
      width: "48%",
      backgroundColor: theme.card,
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
      color: theme.text,
      textAlign: "center",
    },
  });

export default HomeScreen;
