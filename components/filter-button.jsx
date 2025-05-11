import { Text, TouchableOpacity } from "react-native";

export default function FilterButton({ btnName }) {
    return (
        <TouchableOpacity className="px-3 py-2 border border-gray-300 rounded-full mx-2">
            <Text className="text-lg">{btnName}</Text>
        </TouchableOpacity>
    )
}