import ToolCard from "@/components/tools-card";
import { View } from "react-native";

export default function ToolsPage() {
  return (
    <View>
      <ToolCard text="Currency Converter" icon="swap-horizontal" color="blue" />
      <ToolCard text="EMI Calculator" icon="calculator" color="grey" />
      <ToolCard text="Khulle Paise" icon="hand-coin" color="gold" />
      <ToolCard text="Bill Splitting" icon="call-split" color="red" />
      <ToolCard text="Reverse EMI" icon="sort-reverse-variant" color="green" />
    </View>
  );
}
