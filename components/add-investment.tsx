import { Investments } from "@/lib/api";
import { actionsMessages } from "@/utils/constants";
import { AppRoutes, InvestmentCategory, PaymentMode } from "@/utils/enums";
import { InvestmentFormData, investmentSchema } from "@/utils/schemas";
import { CategoryIconMap } from "@/utils/utlis";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { Avatar, Button, RadioButton, Snackbar } from "react-native-paper";

export default function AddInvestmentForm() {
  const investments = new Investments();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<InvestmentFormData>({
    resolver: zodResolver(investmentSchema),
  });
  console.log(errors, "errors");

  // Add Expense
  const addMutation = useMutation({
    mutationFn: (expenseObject: InvestmentFormData) => {
      const payload = {
        ...expenseObject,
        amount: Number(expenseObject.amount),
      };
      return investments.addInvestment(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      router.push(AppRoutes.INVESTMENTSDBOARD);
    },
    onError: () => {
      console.log(actionsMessages.investmentAddError);
    },
  });
  const onSubmit = (data: InvestmentFormData) => {
    addMutation.mutate(data);
    reset();
  };
  const selectedCategory = watch("category");

  useEffect(() => {
    if (selectedCategory) {
      setValue("icon", CategoryIconMap.investment);
    }
  }, [selectedCategory, setValue]);

  return (
    <View className="flex gap-y-3 my-4">
      <Snackbar
        visible={addMutation.isSuccess}
        onDismiss={() => router.push(AppRoutes.INVESTMENTSDBOARD)}
        duration={3000}
      >
        {actionsMessages.investmentAddSuccess}
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
      {errors.mode && (
        <Text className="text-red-500 text-sm">{errors.mode.message}</Text>
      )}
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative">
            <View className="h-fit absolute left-0 top-1/2 -translate-y-1/2 w-fit p-4 shadow-md">
              {selectedCategory ? (
                <Avatar.Icon
                  icon={CategoryIconMap["investment"]}
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
            {Object.values(InvestmentCategory).map((category) => (
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
        name="comment"
        render={({ field: { onChange, value } }) => (
          <View>
            <TextInput
              placeholder="Enter comment about the investment"
              textContentType="name"
              value={value}
              onChangeText={(val) => onChange(val)}
            />
          </View>
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
