import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/UI/Button';
import InputField from '../../components/UI/InputField';
import PasswordEye from '../../components/UI/PasswordEye';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import { Platform } from 'react-native';
import { resetPassword } from '../../utilities/routes/otp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordScreen({ navigation, route }) {
  const email = route.params?.email ?? '';
  const [record, setRecord] = useState({
    password: '',
    confirmPassword: '',
    userType: 'user',
  });

  const ConfirmPassword = useRef();

  const [passwordError, setPasswordError] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  useLayoutEffect(() => {
    if (record.password.length < 6) {
      setPasswordError(true);
      setPasswordInfo('Password must be at least 6 characters');
    } else if (record.password !== record.confirmPassword) {
      setPasswordError(true);
      setPasswordInfo('Password does not match');
    } else {
      setPasswordError(false);
      setPasswordInfo('');
    }
  }, [record.password, record.confirmPassword]);

  const showPasswordHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!passwordError) {
      const response = await resetPassword({
        email,
        password: record.password,
        userType: 'user',
      });
      if (response.status === '200') {
        navigation.navigate('Signin', {
          email,
        });
      }
      showMessage({
        message: response.message,
        type: response.status === '200' ? 'success' : 'warning',
        icon: response.status === '200' ? 'success' : 'warning',
      });
    } else {
      showMessage({
        message: 'Please enter a valid password',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='always'
        style={styles.rootContainer}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Reset Password</Text>
          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <InputField
                style={styles.passwordInput}
                placeholder='Password'
                value={record.password}
                onChangeText={(text) => onChangeRecord('password', text)}
                secureTextEntry={!showPassword}
                onSubmitEditing={() => ConfirmPassword.current.focus()}
              />
              <PasswordEye
                onPress={showPasswordHandler}
                iconSwitch={showPassword}
                colorSwitch={passwordError}
              />
            </View>
            <InputField
              placeholder='Confirm Password'
              value={record.confirmPassword}
              onChangeText={(text) => onChangeRecord('confirmPassword', text)}
              secureTextEntry={!showPassword}
              innerRef={ConfirmPassword}
            />

            <Text style={[styles.info, passwordError && styles.infoActivated]}>
              {passwordInfo}
            </Text>
          </View>
          <Button onPress={handleResetPassword} style={styles.button}>
            Reset Password
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.background,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: gs.colors.primary,
    margin: '5%',
    padding: '5%',
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: gs.colors.titleColor,
  },
  inputContainer: {
    justifyContent: 'center',
    marginVertical: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
  },
  passwordInput: {
    width: '85%',
    marginRight: 15,
  },
  passwordEye: {
    alignItems: 'center',
    paddingTop: 15,
    justifyContent: 'center',
  },
  inputName: {
    width: '48%',
    maxWidth: Platform.OS === 'web' ? 115 : '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    height: 0,
    fontSize: 13,
    paddingLeft: 5,
    color: gs.colors.inputBgColor,
  },
  infoActivated: {
    height: 18,
    marginTop: -2,
    marginVertical: 5,
  },
  button: {
    minWidth: '50%',
  },
  link: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 14,
    color: gs.colors.titleColor,
  },
});
