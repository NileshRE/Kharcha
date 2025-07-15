import { Investments } from "@/lib/api";
import { InvestmentAddType } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useInvestment = () => {
  const investments = new Investments();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleFilterCategory = (value: string) => {
    setSelectedCategory((prev) => (prev === value ? "" : value));
  };
  //Fetch Expenses
  const {
    data: investmentData,
    isError: investmentError,
    isLoading: investmentLoading,
    refetch: refetchInvestments,
  } = useQuery({
    queryFn: () => investments.fetchInvestment(selectedCategory),
    queryKey: ["investments", selectedCategory],
  });

  // Add Expense
  const addMutation = useMutation({
    mutationFn: (investmentObject: InvestmentAddType) =>
      investments.addInvestment(investmentObject),
    onSuccess: () => {
      console.log("Investment Added");
      refetchInvestments();
    },
    onError: () => {
      console.log("Unable to add investment");
    },
  });
  // Fetch Expenses Category
  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryFn: investments.fetchInvCategories,
    queryKey: ["invcategory"],
  });
  return {
    investmentData,
    investmentError,
    investmentLoading,
    addMutation,
    categoryData,
    categoryLoading,
    handleFilterCategory,
    selectedCategory,
  };
};

export default useInvestment;
