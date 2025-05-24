import ExpenseCard from "@/components/expense-card";
import FilterButton from "@/components/filter-button";
import { investmentData } from "@/utils/constants";
import { FlatList, ScrollView, View } from "react-native";

export default function DashboardInvestment() {
  return (
    <View className="mx-2 mb-12">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-3"
      >
        <FilterButton btnName={"MFs"} />
        <FilterButton btnName={"RD"} />
        <FilterButton btnName={"FD"} />
        <FilterButton btnName={"Stocks"} />
        <FilterButton btnName={"Gold"} />
      </ScrollView>
      <FlatList
        data={investmentData}
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
