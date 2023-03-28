import { StyleSheet, Text, View, Linking, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import Button from '../../components/UI/Button';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';

export default function DonationDetailsScreen({ navigation, route }) {
  const donation = route.params.donation;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: donation.name,
    });
  }, [navigation, donation]);

  const openDialer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const url = `tel:${donation.phone}`;
    Linking.openURL(url);
  };

  const sendEmail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const url = `mailto:${donation.email}`;
    Linking.openURL(url);
  };

  const openWebsite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const url = donation?.website?.trim() === '' ? false : donation.website;
    console.log(url);
    if (url) {
      Linking.openURL(`http:/${url}`);
    } else {
      showMessage({
        message: 'Website not available',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.container}>
        <Text style={styles.name}>{donation.name}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Email</Text>
          <Text onPress={sendEmail} style={[styles.details, styles.link]}>
            {donation.email}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Website</Text>
          <Text onPress={openWebsite} style={[styles.details, styles.link]}>
            {donation.website || 'Not Available'}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Phone Number</Text>
          <Text style={styles.details}>{donation.phone}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Address</Text>
          <Text style={styles.details}>{donation.address}</Text>
        </View>
        {donation.phone && (
          <Button style={styles.button} onPress={openDialer}>
            Call {donation.name}
          </Button>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          These details are provided by {donation.name}.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.background,
  },
  container: {
    backgroundColor: gs.colors.primary,
    margin: '5%',
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsContainer: {
    marginVertical: '2%',
  },
  title: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: '2%',
    textAlign: 'center',
  },
  details: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: '2%',
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: '2%',
    minWidth: '70%',
  },
  infoContainer: {
    margin: '5%',
    padding: '2%',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
