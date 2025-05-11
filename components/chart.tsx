import { View } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";

export default function Charts({ area }) {
  const data = [
    { value: 50 },
    { value: 80 },
    { value: 90 },
    { value: 70 },
    { value: 50 },
    { value: 80 },
    { value: 90 },
    { value: 70 },
  ];
  return (
    <View className="w-full my-8 flex items-center justify-center">
      {area ? <LineChart data={data} areaChart /> : <BarChart data={data} />}
    </View>
  );
}
