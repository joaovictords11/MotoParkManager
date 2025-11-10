import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../contexts/ThemeContext";
import i18n from "../i18n/i18n";

const COMMIT_HASH = "c677aa5";
const APP_VERSION = "1.0.0";

const AboutScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = stylesFactory(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{i18n.t("about_title")}</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>{i18n.t("about_app_name")}</Text>
          <Text style={styles.infoValue}>{i18n.t("login_title")}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>{i18n.t("about_version")}</Text>
          <Text style={styles.infoValue}>{APP_VERSION}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>{i18n.t("about_commit_hash")}</Text>
          <Text style={styles.infoValue}>{COMMIT_HASH}</Text>
        </View>

        <Text style={styles.teamTitle}>{i18n.t("about_team_title")}</Text>
        <View style={styles.teamContainer}>
          <Text style={styles.teamMember}>{i18n.t("about_team_member_1")}</Text>
          <Text style={styles.teamMember}>{i18n.t("about_team_member_2")}</Text>
          <Text style={styles.teamMember}>{i18n.t("about_team_member_3")}</Text>
        </View>
      </View>
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
    contentContainer: {
      padding: 20,
    },
    infoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    infoLabel: {
      fontSize: 16,
      color: theme.text,
      fontWeight: "600",
    },
    infoValue: {
      fontSize: 16,
      color: theme.placeholder,
    },
    teamTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
      marginTop: 30,
      marginBottom: 15,
    },
    teamContainer: {
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 15,
      borderColor: theme.border,
      borderWidth: 1,
    },
    teamMember: {
      fontSize: 16,
      color: theme.text,
      marginBottom: 8,
    },
  });

export default AboutScreen;
