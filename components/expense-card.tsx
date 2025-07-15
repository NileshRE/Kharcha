import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";

export default function ExpenseCard({
  icon,
  amount,
  category,
  subcategory,
  date,
  mode,
  status,
}: {
  icon: any;
  amount: number;
  category: string;
  subcategory: string;
  date: string;
  mode: string;
  status?: string;
}) {
  const dateFormatted = new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "2-digit",
  });

  return (
    <View className="p-4 bg-white rounded-md shadow-md flex flex-row items-center gap-4 my-2">
      <Avatar.Icon
        icon={icon}
        size={32}
        style={{ backgroundColor: "#008000" }}
      />
      <View className="flex flex-row justify-between items-start flex-1">
        <View>
          <Text className="font-bold text-xl">₹ {amount}</Text>
          <Text className="text-lg text-gray-700 font-medium capitalize">
            {category}
          </Text>
          <Text className=" text-gray-500 capitalize">{subcategory}</Text>
        </View>
        <View className="items-end">
          <Text className="mb-1">{dateFormatted}</Text>
          {mode === "online" ? (
            <FontAwesome name="mobile" size={24} color="orange" />
          ) : (
            <FontAwesome name="money" size={24} color="green" />
          )}
        </View>
      </View>
    </View>
  );
}
