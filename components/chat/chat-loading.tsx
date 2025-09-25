import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function ChatLoading() {
  const bounce1 = useRef(new Animated.Value(0)).current;
  const bounce2 = useRef(new Animated.Value(0)).current;
  const bounce3 = useRef(new Animated.Value(0)).current;

  const createBounce = (animatedValue: Animated.Value, delay: number) => {
    return Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animatedValue, {
          toValue: -6,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    );
  };

  useEffect(() => {
    createBounce(bounce1, 0).start();
    createBounce(bounce2, 200).start();
    createBounce(bounce3, 400).start();
  }, []);

  return (
    <View
      style={styles.container}
      className="p-6 bg-white rounded-lg shadow-md self-start flex-row items-center space-x-1"
    >
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: bounce1 }] }]}
      />
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: bounce2 }] }]}
      />
      <Animated.View
        style={[styles.dot, { transform: [{ translateY: bounce3 }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    height: 24,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#9CA3AF", // Tailwind's gray-500
    marginHorizontal: 2,
  },
});
