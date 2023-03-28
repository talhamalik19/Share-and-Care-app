import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import UserAvatar from 'react-native-user-avatar';
import { useSelector } from 'react-redux';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import Button from '../../components/UI/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import * as Haptics from 'expo-haptics';
import Icon from '../../components/UI/Icon';

export default function AccountScreen({ navigation }) {
  const user = useSelector((state) => state.user);

  const goToDeleteAccountScreen = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('DeleteAccount');
  };

  const goToUpdateAccountScreen = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('UpdateAccount');
  };

  const goToUpdatePasswordScreen = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('UpdatePassword');
  };

  const goToSignOutScreen = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Signout');
  };

  return (
    <KeyboardAwareScrollView
      style={styles.rootContainer}
      keyboardShouldPersistTaps='always'
    >
      <View style={styles.container}>
        <UserAvatar size={100} name={user.name ?? ''} />
        <Text style={styles.name}>{user.name ?? ''}</Text>
      </View>
      <Pressable
        style={[
          styles.button,
          {
            marginTop: '10%',
          },
        ]}
        onPress={goToUpdateAccountScreen}
      >
        <Icon
          mode='icon'
          lib='mc'
          name='shield-account'
          color='white'
          size={30}
        />
        <Text style={styles.buttonText}>Update Account</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={goToUpdatePasswordScreen}>
        <Icon mode='icon' lib='mc' name='shield-key' color='white' size={30} />
        <Text style={styles.buttonText}>Update Password</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={goToDeleteAccountScreen}>
        <Icon mode='icon' lib='a' name='deleteuser' color='white' size={30} />
        <Text style={styles.buttonText}>Delete Account</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={goToSignOutScreen}>
        <Icon mode='icon' lib='mc' name='logout' color='white' size={30} />
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.background,
  },
  name: {
    marginTop: '2%',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginTop: '5%',
    padding: '5%',
    backgroundColor: gs.colors.primary,
    borderRadius: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: '5%',
    marginTop: '3%',
    padding: '3%',
    backgroundColor: gs.colors.primary,
    borderRadius: 10,
  },
  buttonText: {
    marginLeft: '3%',
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
});
