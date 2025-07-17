import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const HeaderRightButtons = () => {
  const router = useRouter();
  return (
    <View style={{ flexDirection: "row", paddingRight: 8 }}>
      <TouchableOpacity onPress={() => router.push("/notification")}>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/profile")}
        style={{ marginLeft: 16 }}
      >
        <FontAwesome name="user-circle" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRightButtons;
