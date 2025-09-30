import { Text, View } from "react-native";
import { useAuthContext } from "./context/useAuthContext";

export default function ProfilePage() {
  const { session } = useAuthContext();
  const userDetail = session?.user?.user_metadata;

  return (
    <View className="mt-4 flex gap-4 mx-4">
      <Text>User Email</Text>
      <Text className="text-lg font-medium">{userDetail?.email}</Text>
      <Text>Full Name</Text>
      <Text className="text-lg font-medium">{userDetail?.fullName}</Text>
      <Text>Gender</Text>
      <Text className="text-lg font-medium">{userDetail?.gender}</Text>
      <Text>Age</Text>
      <Text className="text-lg font-medium">{userDetail?.age}</Text>
    </View>
  );
}
