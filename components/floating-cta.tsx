import { FontAwesome } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function FloatingCTA() {
  const router = useRouter();
  const pathname = usePathname();
  const baseRoute = pathname.split("/")[2];
  const handleAddNavigation = () => {
    router.push(`/${baseRoute}/add`);
  };
  const handleAnalyticsNavigation = () => {
    router.push(`/${baseRoute}/analytics`);
  };
  return (
    <View className="absolute bottom-12 right-4 space-y-3">
      <TouchableOpacity
        className="bg-blue-600 rounded-full items-center justify-center shadow-lg mb-3 flex flex-row gap-1 py-2 px-5"
        onPress={handleAddNavigation}
      >
        <FontAwesome name="plus" size={16} color={"white"} />
        <Text className="text-white text-xl">Add</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-green-600 rounded-full items-center justify-center shadow-lg mb-3 flex flex-row gap-1 py-3 px-5"
        onPress={handleAnalyticsNavigation}
      >
        <FontAwesome name="bar-chart" size={16} color={"white"} />

        <Text className="text-white text-xl">Analytics</Text>
      </TouchableOpacity>
    </View>
  );
}
