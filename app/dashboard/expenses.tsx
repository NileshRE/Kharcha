import ExpenseCard from "@/components/expense-card";
import FilterButton from "@/components/filter-button";
import { expenseData } from "@/utils/constants";
import { FlatList, ScrollView, View } from "react-native";

export default function Expenses() {
  return (
    <View className="mx-2 mb-12">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-3"
      >
        <FilterButton btnName={"Bills"} />
        <FilterButton btnName={"Food & Drinks"} />
        <FilterButton btnName={"Transport"} />
        <FilterButton btnName={"Health"} />
        <FilterButton btnName={"Groceries"} />
      </ScrollView>
      <FlatList
        data={expenseData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard
            icon={item.icon}
            amount={item.amount}
            category={item.category}
            subcategory={item.subCategory}
            date={item.date}
            mode={item.mode}
          />
        )}
      />
    </View>
  );
}
