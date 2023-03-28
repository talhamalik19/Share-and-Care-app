import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function NoResults() {
  return (
    <View style={styles.noResultsContainer}>
      <Text style={styles.noResultsText}>No Records...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
  },
  noResultsText: {
    marginVertical: '25%',
    paddingHorizontal: '10%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
