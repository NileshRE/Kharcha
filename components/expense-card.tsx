import {
  CategoryIcon,
  CategoryIconMap,
  OutstandingCategory,
  PaymentModesIcon,
  PaymentModesIconMap,
} from "@/utils/enums";
import { Text, View } from "react-native";
import { Icon } from "react-native-paper";

export default function ExpenseCard({
  amount,
  category,
  subcategory,
  date,
  mode,
  status,
  type,
}: {
  amount: number;
  category: string;
  subcategory: string;
  date: string;
  mode: string;
  type?: string;
  status?: string;
}) {
  const dateObj = new Date(date);
  const dateFormatted = `${String(dateObj.getDate()).padStart(2, "0")}/${String(
    dateObj.getMonth() + 1
  ).padStart(2, "0")}/${String(dateObj.getFullYear()).slice(-2)}`;

  const iconCategoryMap = CategoryIconMap[category] || CategoryIcon.HELP;
  const iconModeMap =
    PaymentModesIconMap[mode.toLowerCase()] || PaymentModesIcon.OTHER;

  return (
    <View className="p-4 bg-white rounded-lg shadow-lg flex flex-row items-center gap-4 my-2">
      <View className="flex flex-row justify-between items-start flex-1">
        <View>
          <Text
            className={`font-bold text-xl ${
              type === "Outstandings"
                ? status === OutstandingCategory.LENT
                  ? "text-green-500"
                  : "text-red-500"
                : ""
            }`}
          >
            ₹ {amount}
          </Text>
          <View className="flex flex-row items-center gap-x-2">
            <Icon source={iconCategoryMap} size={20} color="#2563eb" />
            <Text className="text-lg text-gray-700 font-medium capitalize">
              {category}
            </Text>
          </View>
          <Text className="text-gray-500 capitalize">{subcategory}</Text>
        </View>
        <View className="items-end">
          <Text className="mb-2 text-gray-500 text-pur">{dateFormatted}</Text>
          <Icon source={iconModeMap} size={20} color="#6b7280" />
        </View>
      </View>
    </View>
  );
}
