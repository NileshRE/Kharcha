import mainImage from "@/assets/images/app-illustration.png";
import Banner from "@/components/banner";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const handleLogin = () => router.push('/login')
  return (
    <View className="flex-1 items-center my-32">
      <Banner image={mainImage} heading={"Kharcha App. All at one place."} description={"All your expenses, income, investments, outstandings at one place, be aware of your spendings and save more."} />
      <TouchableOpacity className="px-8 py-2 bg-green-500 rounded-md mt-8" onPress={handleLogin}><Text className="text-white text-lg font-medium">Get Started</Text></TouchableOpacity>
    </View>
  );
}
