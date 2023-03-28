import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import Button from '../../components/UI/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import InputField from '../../components/UI/InputField';
import Label from '../../components/UI/Label';
import { updateAccount } from '../../utilities/routes/user';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user';
import { setDataInLocalStorage } from '../../utilities/helpers/local-storage';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';
import { useEffect } from 'react';

export default function UpdateAccount({ navigation }) {
  const user = useSelector((state) => state.user);

  const [record, setRecord] = useState({
    ...user,
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [originalRecord, setOriginalRecord] = useState(record);

  const dispatch = useDispatch();

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  const Phone = useRef();
  const Address = useRef();

  const [nameError, setNameError] = useState(false);
  const [nameInfo, setNameInfo] = useState(false);

  const [phoneError, setPhoneError] = useState(false);
  const [phoneInfo, setPhoneInfo] = useState('');

  const [addressError, setAddressError] = useState(false);
  const [addressInfo, setAddressInfo] = useState('');

  const checkIfRecordChanged = () => {
    if (record.name !== originalRecord.name) {
      return true;
    }
    if (record.phone !== originalRecord.phone) {
      return true;
    }
    if (record.address !== originalRecord.address) {
      return true;
    }
    return false;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Account',
    });
  }, [navigation]);

  useLayoutEffect(() => {
    if (record.name.length < 4) {
      setNameError(true);
      setNameInfo('Name must be at least 4 characters long');
    } else {
      setNameError(false);
      setNameInfo('');
    }

    if (record.phone.startsWith('03') === false) {
      setPhoneError(true);
      setPhoneInfo('Phone number must start with 03');
    } else if (record.phone.trim().length !== 11) {
      setPhoneError(true);
      setPhoneInfo('Please provide a valid phone number');
    } else {
      setPhoneError(false);
      setPhoneInfo('');
    }

    if (record.address.trim().length < 10) {
      setAddressError(true);
      setAddressInfo('Address must be at least 10 characters');
    } else {
      setAddressError(false);
      setAddressInfo('');
    }
  }, [record.phone, record.address, record.name]);

  const onUpdateAccountHandler = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (checkIfRecordChanged()) {
      if (!phoneError && !addressError && !nameError) {
        Alert.alert(
          'Update Account',
          'Are you sure you want to update your account?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              style: 'default',
              onPress: async () => {
                const response = await updateAccount(record);
                console.log(response);
                if (response.status === '200') {
                  dispatch(setUser(response.user));
                  setOriginalRecord(response.user);
                  setDataInLocalStorage({
                    email: response.user.email,
                    token: response.user.token,
                  });
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
    } else {
      showMessage({
        message: 'No changes were made to the account',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      Alert.alert(
        'Information!',
        'You cannot update your email address or cnic number as per our policy.',
        [
          {
            text: 'OK',
            style: 'default',
          },
        ],
        { cancelable: true }
      );
    }, 200);
  }, []);

  return (
    <KeyboardAwareScrollView
      style={styles.rootContainer}
      keyboardShouldPersistTaps='always'
    >
      <View style={styles.container}>
        <Text style={styles.title}>Update Account</Text>
        <Text
          style={[
            styles.info,
            styles.infoActivated,
            { alignSelf: 'center', marginBottom: '4%' },
          ]}
        >
          Email and Cnic cannot be changed!
        </Text>
        <Label>Full Name</Label>
        <InputField
          value={record.name}
          onChangeText={(text) => onChangeRecord('name', text)}
          placeholder='Full Name'
          autoCapitalize='words'
          onSubmitEditing={() => Phone.current.focus()}
          returnKeyType='next'
          keyboardType={'default'}
        />
        <Text style={[styles.info, nameError && styles.infoActivated]}>
          {nameInfo}
        </Text>
        <Label>Email</Label>
        <InputField value={record.email} editable={false} />
        <Label>Cnic</Label>
        <InputField value={record.cnic} editable={false} />
        <Label>Phone Number</Label>
        <InputField
          value={record.phone}
          placeholder='Phone Number'
          onChangeText={(text) => onChangeRecord('phone', text)}
          keyboardType='phone-pad'
          innerRef={Phone}
          onSubmitEditing={() => Address.current.focus()}
          maxLength={11}
          returnKeyType='next'
        />
        <Text style={[styles.info, phoneError && styles.infoActivated]}>
          {phoneInfo}
        </Text>
        <Label>Address</Label>
        <InputField
          value={record.address}
          placeholder='Address'
          onChangeText={(text) => onChangeRecord('address', text)}
          keyboardType='default'
          innerRef={Address}
          multiline={true}
          numberOfLines={1}
          style={{
            textAlignVertical: 'center',
          }}
          autoCapitalize='words'
        />
        <Text style={[styles.info, addressError && styles.infoActivated]}>
          {addressInfo}
        </Text>
        <Button
          style={{
            marginTop: 10,
            alignSelf: 'center',
            minWidth: '50%',
          }}
          buttonColor={gs.colors.buttonColor1}
          onPress={onUpdateAccountHandler}
        >
          Update Account
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
