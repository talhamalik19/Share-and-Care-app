import { View, Text, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { clearDataInLocalStorage } from '../../utilities/helpers/local-storage';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/user';
import AnimatedLottieView from 'lottie-react-native';
import Button from '../../components/UI/Button';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';
import { signOut } from '../../utilities/routes/user';
import { useSelector } from 'react-redux';

export default function SignoutScreen() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { email, token } = user;

  const onSignOutHandler = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    clearDataInLocalStorage();
    dispatch(removeUser());
    showMessage({
      message: 'SignOut Successful',
      type: 'success',
      icon: 'success',
    });
    await signOut({ email, token });
  };

  const animation = useRef(null);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <AnimatedLottieView
          loop={true}
          autoPlay={true}
          ref={animation}
          style={{
            width: 300,
            height: 300,
          }}
          source={require('../../assets/animations/signout.json')}
        />
        <Text style={styles.text}>Signing out??</Text>
        <Text style={styles.subTitle}>Are you sure you want to sign out?</Text>
      </View>
      <Button style={{ minWidth: '40%' }} onPress={onSignOutHandler}>
        Signout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: gs.colors.background,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5%',
    padding: '5%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: gs.colors.text,
    marginTop: 15,
    textAlign: 'center',
  },
});
