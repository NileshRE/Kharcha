import { Expenses } from "@/lib/api";
import { AppRoutes } from "@/utils/enums";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";

const useExpense = () => {
  const expenses = new Expenses();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleFilterCategory = (value: string) => {
    setSelectedCategory((prev) => (prev === value ? "" : value));
  };
  //Fetch Expenses
  const {
    data: expenseData,
    isError: expenseError,
    isLoading: expenseLoading,
  } = useQuery({
    queryFn: () => expenses.fetchExpense(selectedCategory),
    queryKey: ["expenses", selectedCategory],
  });
  // Fetch Expenses Category
  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryFn: expenses.fetchExpCategories,
    queryKey: ["expcategory"],
  });

  const navigateToAddExpense = () => {
    router.push(AppRoutes.ADDROUTE);
  };
  return {
    expenseData,
    expenseError,
    expenseLoading,
    categoryData,
    categoryLoading,
    handleFilterCategory,
    selectedCategory,
    navigateToAddExpense,
  };
};

export default useExpense;
