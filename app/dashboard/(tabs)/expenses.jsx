import ExpenseCard from "@/components/expense-card";
import FilterButton from "@/components/filter-button";
import { FlatList, ScrollView, View } from "react-native";

export default function Expenses() {
    const expenseData = [
        {
            id: "1",
            icon: "cutlery",
            amount: 122,
            category: 'Food & Drinks',
            subCategory: 'Dinner',
            date: '08 May 25',
            mode: "Online"
        },
        {
            id: "2",
            icon: "rupee",
            amount: 422,
            category: 'Food & Drinks',
            subCategory: 'Lunch',
            date: '07 May 25',
            mode: "Cash"
        },
        {
            id: "3",
            icon: "bus",
            amount: 60,
            category: 'Transport',
            subCategory: 'Bus Fare',
            date: '06 May 25',
            mode: "Cash"
        },
        {
            id: "4",
            icon: "heartbeat",
            amount: 250,
            category: 'Health',
            subCategory: 'Medicine',
            date: '05 May 25',
            mode: "Online"
        },
        {
            id: "5",
            icon: "shopping-cart",
            amount: 1400,
            category: 'Groceries',
            subCategory: 'Monthly Shopping',
            date: '04 May 25',
            mode: "Card"
        },
        {
            id: "6",
            icon: "wifi",
            amount: 899,
            category: 'Utilities',
            subCategory: 'Internet',
            date: '03 May 25',
            mode: "Online"
        },
        {
            id: "7",
            icon: "film",
            amount: 250,
            category: 'Entertainment',
            subCategory: 'Movie',
            date: '02 May 25',
            mode: "UPI"
        },
        {
            id: "8",
            icon: "cutlery",
            amount: 180,
            category: 'Food & Drinks',
            subCategory: 'Snacks',
            date: '01 May 25',
            mode: "Cash"
        },
        {
            id: "9",
            icon: "book",
            amount: 500,
            category: 'Education',
            subCategory: 'Books',
            date: '30 April 25',
            mode: "Card"
        },
        {
            id: "10",
            icon: "tint",
            amount: 100,
            category: 'Utilities',
            subCategory: 'Water Bill',
            date: '29 April 25',
            mode: "Online"
        }
    ];

    return (
        <View className="mx-2">
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="flex-row mt-3">
                <FilterButton btnName={"Bills"} />
                <FilterButton btnName={"Food & Drinks"} />
                <FilterButton btnName={"Transport"} />
                <FilterButton btnName={"Health"} />
                <FilterButton btnName={"Groceries"} />
            </ScrollView>
            <FlatList
                data={expenseData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ExpenseCard icon={item.icon} amount={item.amount} category={item.category} subcategory={item.subCategory} date={item.date} mode={item.mode} />} />
        </View>
    )
}

