import { Investments } from "@/lib/api";
import { AppRoutes } from "@/utils/enums";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";

const useInvestment = () => {
  const investments = new Investments();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleFilterCategory = (value: string) => {
    setSelectedCategory((prev) => (prev === value ? "" : value));
  };
  //Fetch Expenses
  const {
    data: investmentData,
    isError: investmentError,
    isLoading: investmentLoading,
  } = useQuery({
    queryFn: () => investments.fetchInvestment(selectedCategory),
    queryKey: ["investments", selectedCategory],
  });

  // Fetch Investments Category
  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryFn: investments.fetchInvCategories,
    queryKey: ["invcategory"],
  });
  const navigateToAdd = () => {
    router.push(AppRoutes.ADDROUTE);
  };
  return {
    investmentData,
    investmentError,
    investmentLoading,
    categoryData,
    categoryLoading,
    handleFilterCategory,
    selectedCategory,
    navigateToAdd,
  };
};

export default useInvestment;
