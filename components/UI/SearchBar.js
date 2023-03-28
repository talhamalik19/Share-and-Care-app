import { StyleSheet, Text, View, TextInput } from "react-native";
import Icon from "./Icon";
import React from "react";
import * as Haptics from "expo-haptics";

export default function SearchBar({ onChangeText, searchText, setSearchText }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon
          style={{
            margin: "1%",
            borderRadius: 100,
          }}
          name="search"
          lib="m"
          color="black"
          size={20}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={onChangeText}
          value={searchText}
        />
        {searchText !== "" && (
          <Icon
            style={{
              margin: "1%",
              borderRadius: 100,
            }}
            onPress={() => {
              setSearchText("");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
            name="close"
            lib="m"
            color="black"
            size={20}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "2%",
    marginHorizontal: "4%",
    marginBottom: "1%",
    backgroundColor: "#fcfcfc",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "space-between",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  searchInput: {
    marginLeft: "2%",
    fontSize: 20,
    color: "black",
    flex: 1,
    fontSize: 18,
  },
});
