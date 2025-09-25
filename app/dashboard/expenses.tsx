import ExpenseCard from "@/components/expense-card";
import FilterButton from "@/components/filter-button";
import FloatingCTA from "@/components/floating-cta";
import {
  EmptyState,
  ErrorState,
  FiltersLoading,
  LoadingState,
} from "@/components/ui-states";
import useExpense from "@/hooks/useExpense";
import { FlatList, ScrollView, Text, View } from "react-native";

export default function Expenses() {
  const {
    expenseData,
    expenseError,
    expenseLoading,
    categoryData,
    categoryLoading,
    handleFilterCategory,
    selectedCategory,
    navigateToAddExpense,
  } = useExpense();

  if (expenseError) return <ErrorState />;
  return (
    <View className="mx-2 mb-12 h-full relative">
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-3 flex-grow-0"
      >
        {categoryLoading ? (
          <FiltersLoading />
        ) : (
          categoryData?.map((category, index) => (
            <FilterButton
              key={index}
              btnName={category}
              handleFilter={handleFilterCategory}
              isSelected={selectedCategory === category}
            />
          ))
        )}
      </ScrollView>
      <View className="w-full my-2">
        <Text className="text-lg p-4 rounded-xl shadow-lg bg-green-600 text-white">
          Total: ₹ {expenseData?.totalAmount} /-
        </Text>
      </View>
      {expenseLoading ? (
        <LoadingState />
      ) : expenseData?.expenses?.length === 0 ? (
        <EmptyState type="Expenses" />
      ) : (
        <FlatList
          className="mb-32"
          data={expenseData?.expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseCard
              amount={item.amount}
              category={item.category}
              subcategory={item.sub_category}
              date={item.created_at}
              mode={item.mode}
            />
          )}
        />
      )}

      <FloatingCTA handleAddExp={navigateToAddExpense} />
    </View>
  );
}
