import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, View } from "react-native";

const EmptyState = ({ type }: { type: string }) => {
  return (
    <View className="mt-48 flex items-center justify-center">
      <FontAwesome name="rupee" size={128} color="green" />
      <Text className="text-gray-500 font-semibold mt-4 text-xl">
        No {type} Added
      </Text>
    </View>
  );
};

const ErrorState = () => {
  return (
    <View className="mt-48 flex items-center justify-center">
      <MaterialIcons name="error-outline" size={128} color="red" />
      <Text className="text-gray-500 font-semibold mt-4 text-xl">
        Error fetching data...
      </Text>
    </View>
  );
};

const LoadingState = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <View
          key={index}
          className="p-4 bg-white rounded-md shadow-md flex flex-row items-center gap-4 my-2"
        >
          <View className="size-10 rounded-full p-1 flex items-center justify-center bg-gray-200" />
          <View className="flex flex-row justify-between items-start flex-1 gap-4">
            <View className="flex flex-col gap-y-2 flex-1">
              <View className="bg-gray-200 h-6 w-3/4 rounded-md" />
              <View className="bg-gray-200 h-4 w-4/5 rounded-md" />
              <View className="bg-gray-200 h-4 w-full rounded-md" />
            </View>

            <View className="items-end flex flex-col gap-y-2">
              <View className="bg-gray-200 h-4 w-16 rounded-md" />
              <View className="bg-gray-200 size-6 rounded-md" />
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

const FiltersLoading = () => {
  return <View className="px-3 py-2 bg-gray-200 rounded-full mx-2"></View>;
};

export { EmptyState, ErrorState, FiltersLoading, LoadingState };
