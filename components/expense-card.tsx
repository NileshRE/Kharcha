import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

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
  const randomColor = () => {
    const colors = [
      "#FF5733",
      "#33B5FF",
      "#28A745",
      "#FFC107",
      "#9C27B0",
      "#E91E63",
      "#795548",
      "#00BCD4",
      "#FF9800",
      "#3F51B5",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const dateFormatted = new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "2-digit",
  });
  const borderColor = (status: string) => {
    return status === "Completed"
      ? "border-green-500 border-2"
      : "border-gray-300";
  };
  return (
    <View className="p-4 bg-white rounded-md shadow-md flex flex-row items-center gap-4 my-2">
      <View
        className={`size-10 border rounded-full p-1 flex items-center justify-center ${borderColor(
          status
        )}`}
      >
        <FontAwesome name={icon} size={20} color={randomColor()} />
      </View>
      <View className="flex flex-row justify-between items-start flex-1">
        <View>
          <Text className="font-bold text-xl">₹ {amount}</Text>
          <Text className="text-lg text-gray-700 font-medium capitalize">
            {category}
          </Text>
          <Text className=" text-gray-500">{subcategory}</Text>
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
