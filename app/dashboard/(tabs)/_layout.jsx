import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";



export default function TabLayout() {
    const router = useRouter();
    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#008000",
                },
                tabBarActiveTintColor: "#008000",
                contentStyle: {
                    backgroundColor: "#f7fcfe",
                },
                headerTintColor: "#ffffff",
                headerTitleStyle: {
                    fontWeight: "800",
                    fontSize: 20,
                },
                headerRight: () => (
                    <View style={{ display: "flex", flexDirection: "row", marginRight: 24 }}>
                        <TouchableOpacity
                            onPress={() => router.push("dashboard/notification")}
                        >
                            <Ionicons name="notifications-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push("dashboard/profile")}
                            style={{ marginLeft: 16 }}
                        >
                            <FontAwesome name="user-circle" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                ),
                headerLeft: () => (
                    <View style={{ marginRight: 24, marginLeft: 16 }}>
                        <TouchableOpacity
                            onPress={() => alert("Back")}>
                            <FontAwesome name="bars" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                ),

            }}>
            <Tabs.Screen name="index" options={{ title: "Dashboard", tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} /> }} />
            <Tabs.Screen name="expenses" options={{ title: "Expenses", tabBarIcon: ({ color }) => <FontAwesome size={24} name="rupee" color={color} /> }} />
            <Tabs.Screen name="investments" options={{ title: "Investments", tabBarIcon: ({ color }) => <FontAwesome size={20} name="bank" color={color} /> }} />
            <Tabs.Screen name="analysis" options={{ title: "Analysis", tabBarIcon: ({ color }) => <FontAwesome size={28} name="pie-chart" color={color} /> }} />
        </Tabs>
    )
}