import { Link } from '@react-navigation/native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/UI/Button';
import InputField from '../../components/UI/InputField';
import PasswordEye from '../../components/UI/PasswordEye';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import { signIn } from '../../utilities/routes/user';
import { setDataInLocalStorage } from '../../utilities/helpers/local-storage';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user';
import { registerIndieID } from 'native-notify';
import { GLOBALS } from '../../utilities/constants/config';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';

export default function SigninScreen({ route, navigation }) {
  const { appId, appToken } = GLOBALS;
  const [record, setRecord] = useState({
    email: route.params?.email ?? '',
    password: '',
  });

  const dispatch = useDispatch();

  const Password = useRef();

  const [passwordError, setPasswordError] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailInfo, setEmailInfo] = useState('');

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  useLayoutEffect(() => {
    if (record.password.length < 6) {
      setPasswordError(true);
      setPasswordInfo('Password must be at least 6 characters');
    } else {
      setPasswordError(false);
      setPasswordInfo('');
    }

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
  }, [record.email, record.password]);

  const showPasswordHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowPassword(!showPassword);
  };

  const onSignInHandler = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!emailError && !passwordError) {
      console.log('Signing in...', record);
      const response = await signIn(record);
      if (response.status === '200') {
        const { user } = response;
        setDataInLocalStorage({
          email: user.email,
          token: user.token,
        });
        dispatch(setUser(user));
        await registerIndieID(record.email, appId, appToken);
      }
      showMessage({
        message: response.message,
        type: response.status === '200' ? 'success' : 'warning',
        icon: response.status === '200' ? 'success' : 'warning',
      });
    } else {
      showMessage({
        message: 'Please fill out all fields and check for existing errors',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.rootContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.inputContainer}>
          <InputField
            placeholder='Email'
            value={record.email}
            onChangeText={(text) => onChangeRecord('email', text)}
            keyboardType='email-address'
            onSubmitEditing={() => Password.current.focus()}
            autoFocus={true}
            textContentType='emailAddress'
          />
          <Text style={[styles.info, emailError && styles.infoActivated]}>
            {emailInfo}
          </Text>
          <View style={styles.passwordContainer}>
            <InputField
              style={[styles.passwordInput]}
              placeholder='Password'
              value={record.password}
              onChangeText={(text) => onChangeRecord('password', text)}
              secureTextEntry={!showPassword}
              innerRef={Password}
              onSubmitEditing={onSignInHandler}
              textContentType='password'
            />
            <PasswordEye
              onPress={showPasswordHandler}
              iconSwitch={showPassword}
              colorSwitch={passwordError}
            />
          </View>

          <Text style={[styles.info, passwordError && styles.infoActivated]}>
            {passwordInfo}
          </Text>
        </View>
        <Button
          buttonColor={gs.colors.buttonColor1}
          onPress={onSignInHandler}
          style={styles.button}
        >
          SIGN IN
        </Button>
        <Link style={styles.link} to={{ screen: 'Signup' }}>
          Not A User? SIGN UP
        </Link>
        <Link
          style={styles.link}
          to={{ screen: 'ForgotPassword', params: { email: record.email } }}
        >
          Forgot Password?
        </Link>
      </View>
    </KeyboardAvoidingView>
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
  },
  passwordContainer: {
    flexDirection: 'row',
  },
  passwordInput: {
    width: '85%',
    marginRight: 15,
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
    marginTop: -2,
    height: 15,
    marginVertical: 5,
  },
  buttonContainer: {
    width: '40%',
  },
  link: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginTop: 10,
    fontSize: 14,
    color: gs.colors.titleColor,
  },
  button: {
    minWidth: '50%',
  },
});
