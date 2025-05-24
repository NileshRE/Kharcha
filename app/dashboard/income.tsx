import ExpenseCard from "@/components/expense-card";
import FilterButton from "@/components/filter-button";
import { incomeData } from "@/utils/constants";
import { FlatList, ScrollView, View } from "react-native";

export default function DashboardIncome() {
  return (
    <View className="mx-2 mb-12">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-3"
      >
        <FilterButton btnName={"Salary"} />
        <FilterButton btnName={"Freelance"} />
        <FilterButton btnName={"Sell"} />
        <FilterButton btnName={"Cashback"} />
        <FilterButton btnName={"Teaching"} />
      </ScrollView>
      <FlatList
        data={incomeData}
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
