import { View, Text, StyleSheet } from 'react-native';
import React, { useLayoutEffect, useRef } from 'react';
import { clearDataInLocalStorage } from '../../utilities/helpers/local-storage';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { removeUser } from '../../store/user';
import AnimatedLottieView from 'lottie-react-native';
import Button from '../../components/UI/Button';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import { deleteAccount } from '../../utilities/routes/user';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';

export default function DeleteAccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { email, token } = user;

  const onDeleteAccountHandler = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const response = await deleteAccount({ email, token });
    if (response.status === '200') {
      dispatch(removeUser());
      clearDataInLocalStorage();
    }
    showMessage({
      message: response.message,
      type: response.status === '200' ? 'success' : 'warning',
      icon: response.status === '200' ? 'success' : 'warning',
    });
  };

  const animation = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Delete Account',
    });
  }, [navigation]);

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
        <Text style={styles.title}>Deleting Your Account??</Text>
        <Text style={styles.subTitle}>
          We are sorry to let you go! But remember this action is irreversible
          and all of your data would be lost
        </Text>
      </View>
      <Button
        style={{ minWidth: '40%' }}
        buttonColor={gs.colors.buttonColor3}
        onPress={onDeleteAccountHandler}
      >
        Delete Account
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
    alignItems: 'center',
    margin: '5%',
    padding: '5%',
  },
  title: {
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
