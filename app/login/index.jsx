import mainImage from "@/assets/images/app-illustration.png";
import Banner from "@/components/banner";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const handleDashboard = () => router.push("/dashboard");
  return (
    <View className="flex-1 items-center my-24">
      <Banner
        image={mainImage}
        heading={"Welcome to Kharcha"}
        description={"Login/Signup to keep a track of your Finances."}
      />
      <TextInput
        placeholder="Enter your email..."
        textContentType="emailAddress"
        className="border border-gray-300 rounded-md mt-6 mb-2 px-4 py-2 w-2/3"
      />
      <TextInput
        placeholder="Enter your password..."
        textContentType="password"
        className="border border-gray-300 rounded-md my-2 px-4 py-2 w-2/3"
        secureTextEntry={true}
      />

      <TouchableOpacity
        className="px-8 py-2 bg-green-500 rounded-md mt-8"
        onPress={handleDashboard}
      >
        <Text className="text-white text-lg font-medium">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
