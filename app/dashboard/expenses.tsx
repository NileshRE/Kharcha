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
import { FlatList, ScrollView, View } from "react-native";

export default function Expenses() {
  const {
    expenseData,
    expenseError,
    expenseLoading,
    // addMutation,
    categoryData,
    categoryLoading,
    handleFilterCategory,
    selectedCategory,
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
      {expenseLoading ? (
        <LoadingState />
      ) : expenseData?.length === 0 ? (
        <EmptyState type="Expenses" />
      ) : (
        <FlatList
          data={expenseData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseCard
              icon={item.icon}
              amount={item.amount}
              category={item.category}
              subcategory={item.sub_category}
              date={item.created_at}
              mode={item.mode}
            />
          )}
        />
      )}
      <FloatingCTA handleAddExp={() => {}} />
    </View>
  );
}
