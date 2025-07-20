import ExpenseCard from "@/components/expense-card";
import FilterButton from "@/components/filter-button";
import FloatingCTA from "@/components/floating-cta";
import {
  EmptyState,
  ErrorState,
  FiltersLoading,
  LoadingState,
} from "@/components/ui-states";
import useOutstandings from "@/hooks/useOutstandings";
import { FlatList, ScrollView, Text, View } from "react-native";
import { Card } from "react-native-paper";

export default function DashboardOutstanding() {
  const {
    outstandingsData,
    navigateToAdd,
    outstandingsError,
    outstandingsLoading,
    categoryData,
    categoryLoading,
    selectedCategory,
    handleFilterCategory,
  } = useOutstandings();

  if (outstandingsError) return <ErrorState />;

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
      {outstandingsLoading ? (
        <LoadingState />
      ) : outstandingsData?.outstandings?.length === 0 ? (
        <EmptyState type="Outstandings" />
      ) : (
        <FlatList
          data={outstandingsData?.outstandings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseCard
              icon={item.icon}
              amount={item.amount}
              category={item.category}
              subcategory={item.name}
              date={item.created_at}
              mode={item.mode}
              status={item.category}
            />
          )}
        />
      )}
      <Card className="absolute bottom-4 w-full">
        <Card.Title title="Total" />
        <Card.Content>
          <Text className="font-semibold text-xl">
            ₹ {outstandingsData?.totalAmount} /-
          </Text>
        </Card.Content>
      </Card>
      <FloatingCTA handleAddExp={navigateToAdd} />
    </View>
  );
}
