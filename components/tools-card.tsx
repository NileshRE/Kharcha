import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function ToolCard({
  text,
  icon,
  color,
}: {
  text: string;
  icon: any;
  color: string;
}) {
  return (
    <View className="p-4 bg-white rounded-md shadow-md flex flex-row items-center justify-between my-2 w-full">
      <Text className="font-semibold text-lg">{text}</Text>
      <MaterialCommunityIcons name={icon} size={48} color={color} />
    </View>
  );
}
