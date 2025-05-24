import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function AnalyticsScreen() {
  const { category } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Analytics Screen</Text>
      <Text className="text-lg mt-2 text-gray-500">Category: {category}</Text>
    </View>
  );
}
