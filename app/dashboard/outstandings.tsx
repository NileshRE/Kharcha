import ExpenseCard from "@/components/expense-card";
import FilterButton from "@/components/filter-button";
import { outstandingData } from "@/utils/constants";
import { FlatList, ScrollView, View } from "react-native";

export default function DashboardOutstanding() {
  return (
    <View className="mx-2 mb-12">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-3"
      >
        <FilterButton btnName={"Lent"} />
        <FilterButton btnName={"Borrowed"} />
        <FilterButton btnName={"Pending"} />
        <FilterButton btnName={"Completed"} />
      </ScrollView>
      <FlatList
        data={outstandingData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard
            icon={item.icon}
            amount={item.amount}
            category={item.category}
            subcategory={item.subCategory}
            date={item.date}
            mode={item.mode}
            status={item.status}
          />
        )}
      />
    </View>
  );
}
