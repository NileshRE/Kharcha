import { Expenses } from "@/lib/api";
import { ExpenseAddType } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useExpense = () => {
  const expenses = new Expenses();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleFilterCategory = (value: string) => {
    setSelectedCategory((prev) => (prev === value ? "" : value));
  };
  //Fetch Expenses
  const {
    data: expenseData,
    isError: expenseError,
    isLoading: expenseLoading,
    refetch: refetchExpenses,
  } = useQuery({
    queryFn: () => expenses.fetchExpense(selectedCategory),
    queryKey: ["expenses", selectedCategory],
  });

  // Add Expense
  const addMutation = useMutation({
    mutationFn: (expenseObject: ExpenseAddType) =>
      expenses.addExpense(expenseObject),
    onSuccess: () => {
      console.log("Expenses Added");
      refetchExpenses();
    },
    onError: () => {
      console.log("Unable to add expense");
    },
  });
  // Fetch Expenses Category
  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryFn: expenses.fetchExpCategories,
    queryKey: ["expcategory"],
  });
  return {
    expenseData,
    expenseError,
    expenseLoading,
    addMutation,
    categoryData,
    categoryLoading,
    handleFilterCategory,
    selectedCategory,
  };
};

export default useExpense;
