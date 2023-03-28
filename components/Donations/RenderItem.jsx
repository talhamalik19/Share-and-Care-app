import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import { useNavigation } from '@react-navigation/native';

const RenderItem = React.memo(({ item }) => {
  const navigation = useNavigation();

  const goToDonationDetails = () => {
    navigation.navigate('DonationDetails', { donation: item });
  };

  return (
    <Pressable onPress={goToDonationDetails} style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.itemDetails}>Phone: {item.phone}</Text>
        <Text style={styles.itemDetails}>
          Website:
          {/* {item.website?.trim() === '' ? 'Not Available' : item.website} */}
          {item.website || 'Not Available'}
        </Text>
      </View>
    </Pressable>
  );
});

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: gs.colors.primary,
    padding: '5%',
    marginVertical: '2%',
    marginHorizontal: '4%',
    justifyContent: 'space-between',
    elevation: 5,
    borderRadius: 15,
  },
  itemName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  itemDetailsContainer: {
    marginTop: 5,
  },
  itemDetails: {
    fontSize: 12,
    color: 'white',
    textAlign: 'left',
  },
});
