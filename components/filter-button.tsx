import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

function FilterButton({
  btnName,
  handleFilter,
  isSelected,
}: {
  btnName: string;
  handleFilter: (category: string) => void;
  isSelected: boolean;
}) {
  return (
    <TouchableOpacity
      className="px-4 py-2 border border-gray-300 rounded-full mx-2 flex-row items-center gap-2"
      onPress={() => handleFilter(btnName)}
    >
      <Text className="text-base capitalize">{btnName}</Text>
      {isSelected && <AntDesign name="close" size={20} color={"gray"} />}
    </TouchableOpacity>
  );
}

export default FilterButton;
