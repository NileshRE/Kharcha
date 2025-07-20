import { Outstandings } from "@/lib/api";
import { AppRoutes } from "@/utils/enums";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";

const useOutstandings = () => {
  const outstandings = new Outstandings();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleFilterCategory = (value: string) => {
    setSelectedCategory((prev) => (prev === value ? "" : value));
  };
  //Fetch Expenses
  const {
    data: outstandingsData,
    isError: outstandingsError,
    isLoading: outstandingsLoading,
  } = useQuery({
    queryFn: () => outstandings.fetchOutstandings(selectedCategory),
    queryKey: ["outstandings", selectedCategory],
  });

  // Fetch Outstandings Category
  const { data: categoryData, isLoading: categoryLoading } = useQuery({
    queryFn: outstandings.fetchOutstandingCategories,
    queryKey: ["outstandingsCategory"],
  });
  const navigateToAdd = () => {
    router.push(AppRoutes.ADDOUTSTANDINGS);
  };
  return {
    outstandingsData,
    outstandingsError,
    outstandingsLoading,
    categoryData,
    categoryLoading,
    handleFilterCategory,
    selectedCategory,
    navigateToAdd,
  };
};

export default useOutstandings;
