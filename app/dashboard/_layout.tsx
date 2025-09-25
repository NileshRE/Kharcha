import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

// Create the top tab navigator
const Tab = createMaterialTopTabNavigator();

// Wrap with expo-router layout context
const TopTabs = withLayoutContext(Tab.Navigator);

export default function DashboardLayout() {
  return (
    <TopTabs
      id={undefined}
      screenOptions={({ route }) => ({
        tabBarLabel: formatLabel(route.name),
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: "#16a34a",
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 14 },
        tabBarIndicatorStyle: { backgroundColor: "#008000" },
        tabBarStyle: {
          backgroundColor: "#f7fcfe",
          overflow: "scroll",
        },
      })}
    >
      <TopTabs.Screen name="expenses" />
      <TopTabs.Screen name="outstandings" />
      <TopTabs.Screen name="tools" />
    </TopTabs>
  );
}

// Helper to capitalize first letter or rename index to Dashboard
function formatLabel(name: string) {
  if (name === "index") return "Dashboard";
  return name.charAt(0).toUpperCase() + name.slice(1);
}
