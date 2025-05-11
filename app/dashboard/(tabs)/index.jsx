
import Charts from "@/components/chart";
import FilterButton from "@/components/filter-button";
import { Text, View } from "react-native";

export default function DashboardHomeScreen() {
    return (
        <View className="flex-1 items-center my-4 mx-4 gap-8">
            <View className="w-full bg-white shadow-md p-4 rounded-md">
                <Text className="font-bold text-xl mb-4">Budget(Monthly)</Text>
                <View className="flex flex-row items-center gap-4 px-2 mb-2">
                    <Text className="text-lg text-gray-500 mb-1 w-20">Income</Text>
                    <View className="bg-green-500 rounded-full w-4/5 h-3"></View>
                </View>
                <View className="flex flex-row items-center gap-4 px-2">
                    <Text className="text-lg text-gray-500 w-20">Expenses</Text>
                    <View className="bg-red-500 rounded-full w-4/5 h-3"></View>
                </View>

            </View>
            <View className="w-full shadow-md p-4 rounded-md bg-green-100">
                <Text className="font-bold text-xl mb-2">Upcoming..</Text>
                <Text className="text-lg text-gray-500 font-medium">Investment in Parag Parikh
                </Text>
            </View>
            <View className="w-full shadow-md p-4 rounded-md bg-white">
                <View className="flex flex-row justify-between items-start">
                    <View>
                        <Text className="font-bold text-xl mb-1">Expenses</Text>
                        <Text className="text-sm text-gray-500 font-medium">This month expenses
                        </Text>
                    </View>
                    <View className="flex flex-row items-center gap-2">
                        <FilterButton btnName={"3 months"} />
                        <FilterButton btnName={"6 months"} />

                    </View>
                </View>
                <Charts area />
            </View>

        </View>
    );
}
