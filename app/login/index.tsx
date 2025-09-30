import Banner from "@/components/banner";
import { useLogin } from "@/hooks/useLogin";
import { Controller } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function LoginScreen() {
  const { control, loginMutation, errors, onFormSubmit, handleSignUp } =
    useLogin();

  return (
    <View className="flex-1 items-center my-24">
      <Banner
        image="../../assets/images/app-illustration.png"
        heading={"Welcome to Kharcha"}
        description={"Login to keep a track of your Finances."}
      />
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

      <TouchableOpacity
        className="px-8 py-2 bg-green-500 rounded-md mt-8"
        onPress={onFormSubmit}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white text-lg font-medium">Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity className="rounded-md mt-8" onPress={handleSignUp}>
        <Text className="text-lg text-primary">New to Karcha, Signup?</Text>
      </TouchableOpacity>
    </View>
  );
}
