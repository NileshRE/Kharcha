import Banner from "@/components/banner";
import { useSignup } from "@/hooks/useSignUp";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function LoginScreen() {
  const { control, errors, onFormSubmit, signupMutation, handleLogin } =
    useSignup();

  return (
    <View className="flex-1 items-center mt-6">
      <Banner
        image="../../assets/images/app-illustration.png"
        heading={"Welcome to Kharcha"}
        description={"Signup to keep a track of your Finances."}
      />
      <Controller
        control={control}
        name="fullName"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Enter your full name.."
            textContentType="name"
            className="border border-gray-300 rounded-md my-2 px-4 py-2 w-2/3"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.fullName && (
        <Text className="text-red-500 text-xs">{errors.fullName.message}</Text>
      )}

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Enter your email..."
            textContentType="emailAddress"
            className="border border-gray-300 rounded-md mt-6 mb-2 px-4 py-2 w-2/3"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.email && (
        <Text className="text-red-500 text-xs text-left">
          {errors.email.message}
        </Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Enter your password..."
            textContentType="password"
            className="border border-gray-300 rounded-md my-2 px-4 py-2 w-2/3"
            secureTextEntry={true}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text className="text-red-500 text-xs">{errors.password.message}</Text>
      )}
      <Controller
        control={control}
        name="age"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Enter your age"
            keyboardType="numeric"
            textContentType="none"
            className="border border-gray-300 rounded-md my-2 px-4 py-2 w-2/3"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.age && (
        <Text className="text-red-500 text-xs">{errors.age.message}</Text>
      )}
      <Controller
        control={control}
        name="gender"
        render={({ field: { value, onChange } }) => (
          <View className="border border-gray-300 rounded-md w-2/3 my-2">
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              mode="dropdown"
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        )}
      />
      {errors.gender && (
        <Text className="text-red-500 text-xs">{errors.gender.message}</Text>
      )}

      <TouchableOpacity
        className="px-8 py-2 bg-green-500 rounded-md mt-8"
        onPress={onFormSubmit}
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white text-lg font-medium">Signup</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity className="rounded-md mt-8" onPress={handleLogin}>
        <Text className="text-lg text-primary">Already a user, Login?</Text>
      </TouchableOpacity>
    </View>
  );
}
