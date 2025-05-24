import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import "../globals.css";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#008000",
          },
          headerTintColor: "#fff",
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 8 }}>
              <TouchableOpacity onPress={() => router.push("/notification")}>
                <Ionicons name="notifications-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/profile")}
                style={{ marginLeft: 16 }}
              >
                <FontAwesome name="user-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
