import Charts from "@/components/chart";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { Text, View } from "react-native";

export default function Analysis() {
    const [selectedCategory, setSelectedCategory] = useState();
    return (
        <View className="mx-4 my-4">
            <Text>Select Category</Text>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedCategory(itemValue)
                }
                className="border border-gray-400 rounded-md"
            >
                <Picker.Item label="Food & Drinks" value="food_and_drinks" />
                <Picker.Item label="Bills" value="bills" />
                <Picker.Item label="Transport" value="transport" />
                <Picker.Item label="Health" value="health" />
                <Picker.Item label="Medical" value="medical" />
                <Picker.Item label="Entertainment" value="entertainment" />
            </Picker>
            <Charts area={false} />
        </View>
    )
}