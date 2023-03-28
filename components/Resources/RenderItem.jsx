import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import { useNavigation } from '@react-navigation/native';

const RenderItem = React.memo(({ item, screen }) => {
  const navigation = useNavigation();

  const goToDetailsScreen = () => {
    navigation.navigate('ResourceDetails', { item });
  };

  return (
    <Pressable onPress={goToDetailsScreen} style={styles.itemContainer}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.resourceName}</Text>
        <Text
          style={[
            styles.requestStatus,
            item.requestStatus === 'Pending' ? styles.pending : styles.approved,
          ]}
        >
          {item.requestStatus}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.details}>Quantity: {item.resourceQuantity}</Text>
        <Text
          style={[
            styles.details,
            {
              textAlign: 'right',
            },
          ]}
        >
          Duration: {item.resourceDuration}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.details, { width: '100%' }]}>
          {screen === 'myRequests' && item.requestStatus === 'Approved'
            ? `Approved by: ${item.approvedByName}`
            : `Requested by: ${item.requestedByName}`}
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
    borderRadius: 7,
    justifyContent: 'space-between',
    elevation: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
    maxWidth: '80%',
  },
  requestStatus: {
    fontSize: 10,
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 25,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  pending: {
    backgroundColor: 'yellow',
    color: 'black',
  },
  approved: {
    backgroundColor: 'green',
  },
  details: {
    fontSize: 12,
    color: 'white',
    width: '48%',
    textAlign: 'left',
  },
});
