import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import Button from '../../components/UI/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import InputField from '../../components/UI/InputField';
import PasswordEye from '../../components/UI/PasswordEye';
import Label from '../../components/UI/Label';
import { updatePassword } from '../../utilities/routes/user';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';

export default function UpdatePassword({ navigation }) {
  const user = useSelector((state) => state.user);

  const [record, setRecord] = useState({
    ...user,
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  const Password = useRef();
  const NewPassword = useRef();
  const ConfirmNewPassword = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Account',
    });
  }, [navigation]);

  useLayoutEffect(() => {
    if (record.password.length < 6) {
      setPasswordError(true);
      setPasswordInfo('Password must be at least 6 characters');
    } else if (record.newPassword.length < 6) {
      setPasswordError(true);
      setPasswordInfo('New Password must be at least 6 characters');
    } else if (record.newPassword !== record.confirmNewPassword) {
      setPasswordError(true);
      setPasswordInfo('New Password and Confirm New Password must match');
    } else {
      setPasswordError(false);
      setPasswordInfo('');
    }
  }, [record.password, record.newPassword, record.confirmNewPassword]);

  const showPasswordHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowPassword(!showPassword);
  };

  const clearPasswordInputs = () => {
    setRecord((prevRecord) => ({
      ...prevRecord,
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    }));
  };

  const onUpdatePasswordHandler = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!passwordError) {
      Alert.alert(
        'Update Password',
        'Are you sure you want to update your password?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Update',
            onPress: async () => {
              const response = await updatePassword(record);
              console.log(response);
              if (response.status === '200') {
                clearPasswordInputs();
              }
              showMessage({
                message: response.message,
                type: response.status === '200' ? 'success' : 'warning',
                icon: response.status === '200' ? 'success' : 'warning',
              });
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      showMessage({
        message:
          'Please fill out all fields with valid information and check for existing errors',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.rootContainer}
      keyboardShouldPersistTaps='always'
    >
      <View style={styles.container}>
        <Text style={styles.title}>Update Password</Text>
        <Label>Password</Label>
        <InputField
          value={record.password}
          placeholder='Password'
          onChangeText={(text) => onChangeRecord('password', text)}
          secureTextEntry={!showPassword}
          innerRef={Password}
          onSubmitEditing={() => NewPassword.current.focus()}
        />
        <Label>New Password</Label>

        <InputField
          value={record.newPassword}
          placeholder='New Password'
          onChangeText={(text) => onChangeRecord('newPassword', text)}
          secureTextEntry={!showPassword}
          innerRef={NewPassword}
          onSubmitEditing={() => ConfirmNewPassword.current.focus()}
        />
        <Label>Confirm New Password</Label>

        <View style={styles.passwordContainer}>
          <InputField
            style={styles.passwordInput}
            value={record.confirmNewPassword}
            placeholder='Confirm New Password'
            onChangeText={(text) => onChangeRecord('confirmNewPassword', text)}
            secureTextEntry={!showPassword}
            innerRef={ConfirmNewPassword}
            onSubmitEditing={onUpdatePasswordHandler}
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

        <Button
          style={{
            marginTop: 10,
            alignSelf: 'center',
            minWidth: '50%',
          }}
          buttonColor={gs.colors.buttonColor1}
          onPress={onUpdatePasswordHandler}
        >
          Update Password
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.background,
  },
  container: {
    margin: '5%',
    padding: '5%',
    backgroundColor: gs.colors.primary,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
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
  info: {
    height: 0,
    fontSize: 13,
    paddingLeft: 5,
    color: gs.colors.inputBgColor,
  },
  infoActivated: {
    marginTop: -2,
    height: 'auto',
    marginVertical: 5,
  },
});
