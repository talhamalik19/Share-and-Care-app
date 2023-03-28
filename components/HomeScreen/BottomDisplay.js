import { View, StyleSheet } from 'react-native';
import React from 'react';
import BottomDisplayButton from './BottomDisplayButton';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import { useNavigation } from '@react-navigation/native';

export default function BottomDisplay() {
  const navigation = useNavigation();

  const goToAccountScreen = () => {
    navigation.navigate('Account');
  };

  const goToResourcesScreen = () => {
    navigation.navigate('Resources');
  };

  const goToDonationsScreen = () => {
    navigation.navigate('Donations');
  };

  const goToVolunteersScreen = () => {
    navigation.navigate('Volunteers');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <BottomDisplayButton
          name='medical-services'
          lib='m'
          title='Resources'
          size={50}
          onPress={goToResourcesScreen}
        />
        <BottomDisplayButton
          name='volunteer-activism'
          title='Volunteer'
          lib='m'
          size={50}
          onPress={goToVolunteersScreen}
        />
      </View>
      <View style={styles.buttonContainer}>
        <BottomDisplayButton
          name='heart-plus'
          title='Donations'
          lib='mc'
          size={50}
          onPress={goToDonationsScreen}
        />
        <BottomDisplayButton
          lib='mc'
          name='account-circle'
          title='Account'
          size={50}
          onPress={goToAccountScreen}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: gs.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
