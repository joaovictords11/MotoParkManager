import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";

// Configura o handler de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 1. Função para registrar para Push Notifications
export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Falha!",
        "Não foi possível obter permissão para notificações."
      );
      return;
    }

    // NOTA: Troque "SEU_PROJECT_ID_AQUI" pelo "slug" do seu app.json ou ID do projeto EAS
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "motopark-manager",
      })
    ).data;
    console.log("Expo Push Token:", token);
  } else {
    console.log("Notificações Push só funcionam em dispositivos físicos.");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

// 2. Função para agendar uma notificação local
export async function scheduleLocalNotification(title, body, data = {}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data,
    },
    trigger: { seconds: 2 }, // Dispara 2 segundos após a ação
  });
}
