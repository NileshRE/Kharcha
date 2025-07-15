import ExpenseCard from "@/components/expense-card";
import FilterButton from "@/components/filter-button";
import FloatingCTA from "@/components/floating-cta";
import {
  EmptyState,
  ErrorState,
  FiltersLoading,
  LoadingState,
} from "@/components/ui-states";
import useInvestment from "@/hooks/useInvestment";
import { FlatList, ScrollView, View } from "react-native";

export default function DashboardInvestment() {
  const {
    investmentData,
    investmentError,
    investmentLoading,
    handleFilterCategory,
    selectedCategory,
    categoryData,
    categoryLoading,
    // addMutation,
  } = useInvestment();
  if (investmentError) return <ErrorState />;
  return (
    <View className="mx-2 mb-12 h-full">
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
      {investmentLoading ? (
        <LoadingState />
      ) : investmentData?.length === 0 ? (
        <EmptyState type="Investments" />
      ) : (
        <FlatList
          data={investmentData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseCard
              icon={item.icon}
              amount={item.amount}
              category={item.category}
              subcategory={item.subCategory}
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
