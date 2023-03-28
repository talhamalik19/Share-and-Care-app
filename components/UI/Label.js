import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Label({ children, style }) {
  return <Text style={[styles.label, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "#ffffff",
    paddingLeft: 5,
    marginBottom: -5,
  },
});
