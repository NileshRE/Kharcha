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
import { Card } from "react-native-paper";

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
      <Card className="absolute bottom-4 w-full">
        <Card.Title title="Total" />
        <Card.Content>
          <Text className="font-semibold text-xl">
            ₹ {expenseData?.totalAmount} /-
          </Text>
        </Card.Content>
      </Card>

      <FloatingCTA handleAddExp={navigateToAddExpense} />
    </View>
  );
}
