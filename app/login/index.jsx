import mainImage from "@/assets/images/app-illustration.png";
import Banner from "@/components/banner";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
    const router = useRouter();
    const handleDashboard = () => router.push('/dashboard')
    return (
        <View className="flex-1 items-center my-32">
            <Banner image={mainImage} heading={"Welcome to Kharcha"} description={"Login/Signup to keep a track of your Finances."} />
            <TextInput placeholder="Enter your mobile number..." textContentType="telephoneNumber" className="border border-gray-300 rounded-md my-6 px-4 py-2 w-2/3" />
            <TouchableOpacity className="px-8 py-2 bg-green-500 rounded-md mt-8" onPress={handleDashboard}><Text className="text-white text-lg font-medium">Login</Text></TouchableOpacity>
        </View>
    );
}
