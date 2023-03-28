import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function PasswordEye({ onPress, iconSwitch, colorSwitch }) {
  return (
    <Pressable onPress={onPress} style={styles.passwordEye}>
      <Ionicons
        name={iconSwitch ? "ios-eye" : "ios-eye-off"}
        size={26}
        color={colorSwitch ? "red" : "white"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  passwordEye: {
    alignItems: "center",
    justifyContent: "center",
  },
});
