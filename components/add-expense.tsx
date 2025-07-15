import { Expenses } from "@/lib/api";
import { Category, PaymentMode } from "@/utils/enums";
import { ExpenseFormData, expenseSchema } from "@/utils/schemas";
import { CategoryIconMap, CategorySubCategoryMap } from "@/utils/utlis";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { Avatar, Button, RadioButton, Snackbar } from "react-native-paper";

export default function AddExpenseForm() {
  const expenses = new Expenses();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });
  // Add Expense
  const addMutation = useMutation({
    mutationFn: (expenseObject: ExpenseFormData) => {
      const payload = {
        ...expenseObject,
        amount: Number(expenseObject.amount),
      };
      return expenses.addExpense(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      router.push("/dashboard/expenses");
    },
    onError: () => {
      console.log("Unable to add expense");
    },
  });
  const onSubmit = (data: ExpenseFormData) => {
    addMutation.mutate(data);
    reset();
  };
  const selectedCategory = watch("category");
  const subCategoryOptions =
    CategorySubCategoryMap[selectedCategory as Category] || [];

  useEffect(() => {
    if (selectedCategory && CategoryIconMap[selectedCategory]) {
      setValue("icon", CategoryIconMap[selectedCategory]);
    }
  }, [selectedCategory, setValue]);

  return (
    <View className="flex gap-y-3 my-4">
      <Snackbar
        visible={addMutation.isSuccess}
        onDismiss={() => router.push("/dashboard/expenses")}
        duration={3000}
      >
        New Expense Added!
      </Snackbar>
      <Controller
        control={control}
        name="mode"
        render={({ field: { onChange, value } }) => (
          <RadioButton.Group
            onValueChange={(newValue) => onChange(newValue)}
            value={value}
          >
            <View className="flex flex-row gap-x-48 items-center">
              <View className="flex flex-row gap-x-2 items-center">
                <RadioButton value={PaymentMode.ONLINE} color="#008000" />
                <Text className="text-lg font-medium">Online</Text>
              </View>
              <View className="flex flex-row gap-x-2 items-center">
                <RadioButton value={PaymentMode.CASH} color="#008000" />
                <Text className="text-lg font-medium">Cash</Text>
              </View>
            </View>
          </RadioButton.Group>
        )}
      />
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative">
            <View className="h-fit absolute left-0 top-1/2 -translate-y-1/2 w-fit p-4 shadow-md">
              {selectedCategory ? (
                <Avatar.Icon
                  icon={CategoryIconMap[selectedCategory]}
                  size={48}
                  style={{ backgroundColor: "#008000" }}
                />
              ) : (
                <Text className="text-5xl py-2 text-primary">₹</Text>
              )}
            </View>
            <TextInput
              placeholder="Enter amount..."
              inputMode="numeric"
              keyboardType="numeric"
              returnKeyType="done"
              value={value}
              onBlur={onBlur}
              onChangeText={(val) => onChange(val.replace(/[^0-9]/g, ""))}
              className="border-b border-gray-300 rounded-md pl-24 py-2 w-full h-28 text-3xl font-semibold flex items-center justify-center"
            />
          </View>
        )}
      />
      {errors.amount && (
        <Text className="text-red-500 text-sm">{errors.amount.message}</Text>
      )}
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
          >
            <Picker.Item label="Select category..." value="" />
            {Object.values(Category).map((category) => (
              <Picker.Item
                key={category}
                label={category
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
                value={category}
              />
            ))}
          </Picker>
        )}
      />
      <Controller
        control={control}
        name="sub_category"
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
          >
            <Picker.Item label="Select sub category..." value="" />
            {subCategoryOptions?.map((subCategory) => (
              <Picker.Item
                key={subCategory}
                label={subCategory
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
                value={subCategory}
              />
            ))}
          </Picker>
        )}
      />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={addMutation.isPending}
        disabled={addMutation.isPending}
        buttonColor="#008000"
      >
        Submit
      </Button>
    </View>
  );
}
