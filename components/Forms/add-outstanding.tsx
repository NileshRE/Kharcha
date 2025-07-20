import { Outstandings } from "@/lib/api";
import { actionsMessages } from "@/utils/constants";
import {
  AppRoutes,
  OutstandingCategory,
  OutstandingStatus,
  PaymentMode,
} from "@/utils/enums";
import { OutstandingsFormData, outstandingsSchema } from "@/utils/schemas";
import { OutstandingIconMap } from "@/utils/utlis";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import {
  Avatar,
  Button,
  RadioButton,
  Snackbar,
  TextInput,
} from "react-native-paper";

export default function AddOutstandingForm() {
  const outstandings = new Outstandings();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    setError,
  } = useForm<OutstandingsFormData>({
    resolver: zodResolver(outstandingsSchema),
  });
  const addMutation = useMutation({
    mutationFn: (outstandingsObject: OutstandingsFormData) => {
      const payload = {
        ...outstandingsObject,
        amount: Number(outstandingsObject.amount),
      };
      return outstandings.addOutstanding(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outstandings"] });
      router.push(AppRoutes.OUTSTANDINGSDBOARD);
    },
    onError: () => {
      setError("amount", { message: actionsMessages.outstandingsAddError });
    },
  });

  const onSubmit = (data: OutstandingsFormData) => {
    addMutation.mutate(data);
    reset();
  };
  const selectedCategory = watch("category");
  useEffect(() => {
    if (selectedCategory && OutstandingIconMap[selectedCategory]) {
      setValue("icon", OutstandingIconMap[selectedCategory]);
    }
  }, [selectedCategory, setValue]);

  return (
    <View className="flex gap-y-3 my-4">
      <Snackbar
        visible={addMutation.isSuccess}
        onDismiss={() => router.push(AppRoutes.OUTSTANDINGSDBOARD)}
        duration={3000}
      >
        {actionsMessages.outstandingsAddSuccess}
      </Snackbar>
      <Controller
        control={control}
        name="payment_mode"
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
      {errors.payment_mode && (
        <Text className="text-red-500 text-sm">
          {errors.payment_mode.message}
        </Text>
      )}
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative">
            <View className="h-fit absolute left-0 top-1/2 -translate-y-1/2 w-fit p-4 shadow-md">
              {selectedCategory ? (
                <Avatar.Icon
                  icon={OutstandingIconMap[selectedCategory]}
                  size={48}
                  style={{ backgroundColor: "#008000" }}
                />
              ) : (
                <Text className="text-5xl py-2 text-primary">₹</Text>
              )}
            </View>
            <TextInput
              label="Amount"
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
            {Object.values(OutstandingCategory).map((category) => (
              <Picker.Item
                key={category}
                label={category.replace(/\b\w/g, (c) => c.toUpperCase())}
                value={category}
              />
            ))}
          </Picker>
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={
              selectedCategory === OutstandingCategory.BORROWED
                ? "Borrowed By"
                : "Lent to"
            }
            value={value}
            onChangeText={(text) => onChange(text)}
          />
        )}
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
          >
            <Picker.Item label="Select Status.." value="" />
            {Object?.values(OutstandingStatus)?.map((status) => (
              <Picker.Item
                key={status}
                label={status.replace(/\b\w/g, (c) => c.toUpperCase())}
                value={status}
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
