import ChatComponent from "@/components/chat";
import { View } from "react-native";

export default function AddScreen() {
  return (
    <View className="flex-1 items-center my-24">
      <ChatComponent />
    </View>
  );
}
