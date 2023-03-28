import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/UI/Button';
import InputField from '../../components/UI/InputField';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { forgotPassword, verifyOtp } from '../../utilities/routes/otp';
import { useFocusEffect } from '@react-navigation/native';

export default function ForgotPasswordScreen({ navigation, route }) {
  const [record, setRecord] = useState({
    email: route.params?.email ?? '',
    otp: '',
    userType: 'user',
  });

  const [enableOtpInput, setEnableOtpInput] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailInfo, setEmailInfo] = useState('');

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  useLayoutEffect(() => {
    if (
      record.email.trim().includes('@') === true &&
      record.email.trim().endsWith('.com') === true
    ) {
      setEmailInfo('');
      setEmailError(false);
    } else {
      setEmailError(true);
      setEmailInfo('Please provide a valid email address');
    }
  }, [record.email]);

  const handleForgotPassword = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('handleForgotPassword');
    if (!emailError) {
      console.log('handleForgotPassword');
      const response = await forgotPassword(record);
      if (response.status === '200') {
        setEnableOtpInput(true);
      }
      showMessage({
        message: response.message,
        type: response.status === '200' ? 'success' : 'warning',
        icon: response.status === '200' ? 'success' : 'warning',
      });
    } else {
      showMessage({
        message: 'Please enter a valid email address',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  const handleVerifyOtp = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (record.otp.length === 6) {
      const response = await verifyOtp(record);
      if (response.status === '200') {
        navigation.navigate('ResetPassword', { email: record.email });
      }
      showMessage({
        message: response.message,
        type: response.status === '200' ? 'success' : 'warning',
        icon: response.status === '200' ? 'success' : 'warning',
      });
    } else {
      showMessage({
        message: 'Please enter a valid OTP',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <KeyboardAvoidingView style={styles.rootContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Forgot Password</Text>
          <View style={styles.inputContainer}>
            <InputField
              placeholder='Email'
              value={record.email}
              onChangeText={(text) => onChangeRecord('email', text)}
              keyboardType='email-address'
            />
            <Text style={[styles.info, emailError && styles.infoActivated]}>
              {emailInfo}
            </Text>
            <View style={styles.otpContainer}>
              <InputField
                style={[
                  styles.otpInput,
                  !enableOtpInput && styles.disabledOtpInput,
                ]}
                editable={enableOtpInput}
                placeholder='Enter Otp here'
                value={record.otp}
                keyboardType='number-pad'
                maxLength={6}
                onChangeText={(text) => onChangeRecord('otp', text)}
              />
              <Button
                style={styles.otpButton}
                title='Resend Otp'
                onPress={handleForgotPassword}
                mode='flat'
                textDecoration={'underline'}
              >
                Send OTP
              </Button>
            </View>
          </View>
          {enableOtpInput && (
            <Button style={styles.button} onPress={handleVerifyOtp}>
              Verify
            </Button>
          )}
        </View>
      </KeyboardAvoidingView>
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
    margin: 20,
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
    marginVertical: 20,
    width: '100%',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: '65%',
  },
  disabledOtpInput: {
    backgroundColor: '#ccc',
  },
  otpButton: {
    justifyContent: 'center',
  },
  info: {
    height: 0,
    fontSize: 13,
    paddingLeft: 5,
    color: gs.colors.inputBgColor,
  },
  infoActivated: {
    marginTop: -2,
    height: 15,
    marginVertical: 5,
  },
  buttonContainer: {
    width: '40%',
  },

  button: {
    minWidth: '50%',
  },
});
