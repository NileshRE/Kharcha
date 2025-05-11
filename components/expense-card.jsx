import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function ExpenseCard({ icon, amount, category, subcategory, date, mode }) {
    const randomColor = () => {
        const colors = [
            "#FF5733", "#33B5FF", "#28A745", "#FFC107", "#9C27B0",
            "#E91E63", "#795548", "#00BCD4", "#FF9800", "#3F51B5"
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };
    return (
        <View className="p-4 bg-white rounded-md shadow-md flex flex-row items-center gap-4 my-3">
            <View className="size-10 border border-gray-300 rounded-full p-1 flex items-center justify-center">
                <FontAwesome name={icon} size={20} color={randomColor()} />
            </View>
            <View className="flex flex-row justify-between items-start flex-1">
                <View>
                    <Text className="font-bold text-2xl">{amount}</Text>
                    <Text className="text-lg text-gray-500">{category}</Text>
                    <Text className=" text-gray-500">{subcategory}</Text>
                </View>
                <View className="items-end">
                    <Text className="font-smediummb-1">{date}</Text>
                    {mode === "Online" ? <FontAwesome name="mobile" size={24} color="orange" /> : <FontAwesome name="money" size={24} color="green" />}
                </View>
            </View>
        </View>
    )
}