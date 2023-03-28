import { View, Text, StyleSheet } from 'react-native';
import React, { useLayoutEffect, useState, useRef } from 'react';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import InputField from '../../components/UI/InputField';
import Label from '../../components/UI/Label';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Button from '../../components/UI/Button';
import {
  postResourceRequest,
  updateResourceRequest,
} from '../../utilities/routes/resource';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';

export default function PostRequestScreen({ navigation, route }) {
  const { request } = route.params ?? {};

  const RESOURCE = useRef();
  const QUANTITY = useRef();
  const DURATION = useRef();
  const ADDRESS = useRef();

  const user = useSelector((state) => state.user);
  const { name, email, phone, address } = user;

  const [missingFields, setMissingFields] = useState(false);

  const [record, setRecord] = useState({
    userType: 'user',
    id: request?._id ?? '',
    resourceName: request?.resourceName ?? '',
    resourceQuantity: request?.resourceQuantity ?? '',
    resourceDuration: request?.resourceDuration ?? '',
    resourceNotes: request?.resourceNotes ?? '',
    requestedByName: name,
    requestedByEmail: email,
    requestedByPhone: phone,
    requestedByAddress: address,
  });

  const onChangeRecord = (key, value) => {
    setRecord({ ...record, [key]: value });
  };

  const emptyFields = () => {
    setRecord({
      resourceName: '',
      resourceQuantity: '',
      resourceDuration: '',
      resourceNotes: '',
      requestedByName: name,
      requestedByEmail: email,
      requestedByPhone: phone,
      requestedByAddress: address,
    });
  };

  const onPostRequest = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (missingFields) {
      showMessage({
        message: 'Please fill in all the required fields',
        type: 'warning',
        icon: 'warning',
      });
    } else {
      try {
        const response = await postResourceRequest(record);
        showMessage({
          message: response.message,
          type: response.status === '201' ? 'success' : 'warning',
          icon: response.status === '201' ? 'success' : 'warning',
        });
        if (response.status === '201') {
          emptyFields();
          navigation.goBack();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onUpdateRequest = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (missingFields) {
      showMessage({
        message: 'Please fill in all the required fields',
        type: 'warning',
        icon: 'warning',
      });
    } else {
      try {
        const response = await updateResourceRequest(record);
        showMessage({
          message: response.message,
          type: response.status === '200' ? 'success' : 'warning',
          icon: response.status === '200' ? 'success' : 'warning',
        });
        navigation.navigate('Resources');
      } catch (err) {
        console.log(err);
      }
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: request ? 'Update Request' : 'Post A New Request',
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useLayoutEffect(() => {
    if (
      record.resourceName.trim() === '' ||
      record.resourceQuantity.trim() === '' ||
      record.resourceDuration.trim() === '' ||
      record.requestedByPhone.trim() === ''
    ) {
      setMissingFields(true);
    } else {
      setMissingFields(false);
    }
  }, [record]);

  return (
    <KeyboardAwareScrollView
      style={styles.rootContainer}
      keyboardShouldPersistTaps='always'
    >
      <View style={styles.rootContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Please {request ? 'update the' : 'fill out'} the form below to{' '}
            {request ? 'update the' : 'post a'} resource request.
          </Text>
          {!request && (
            <Text style={styles.subTitle}>Use one form for each request *</Text>
          )}
          <Label>Resource Name *</Label>
          <InputField
            placeholder='Blood Bags'
            value={record.resourceName}
            onChangeText={(value) => onChangeRecord('resourceName', value)}
            onSubmitEditing={() => QUANTITY.current.focus()}
            innerRef={RESOURCE}
            autoCapitalize={'words'}
            maxLength={15}
          />
          <View style={styles.row}>
            <View style={styles.col}>
              <Label>Quantity *</Label>
              <InputField
                placeholder='3'
                keyboardType='decimal-pad'
                value={record.resourceQuantity}
                onChangeText={(value) =>
                  onChangeRecord('resourceQuantity', value)
                }
                onSubmitEditing={() => DURATION.current.focus()}
                innerRef={QUANTITY}
                returnKeyType='next'
                maxLength={3}
              />
            </View>
            <View style={styles.col}>
              <Label>Duration *</Label>
              <InputField
                placeholder='1 Week'
                value={record.resourceDuration}
                onChangeText={(value) =>
                  onChangeRecord('resourceDuration', value)
                }
                onSubmitEditing={() => ADDRESS.current.focus()}
                innerRef={DURATION}
                returnKeyType='next'
                autoCapitalize={'words'}
                maxLength={8}
              />
            </View>
          </View>

          <Label>Any Additional Information</Label>
          <InputField
            placeholder='Any additional information'
            multiline={true}
            numberOfLines={3}
            value={record.resourceNotes}
            onChangeText={(value) => onChangeRecord('resourceNotes', value)}
            autoCapitalize={'words'}
            returnKeyType='done'
            style={{
              textAlignVertical: 'top',
            }}
            maxLength={100}
          />
          <View style={styles.button}>
            <Button
              buttonColor={gs.colors.buttonColor2}
              onPress={request ? onUpdateRequest : onPostRequest}
            >
              {request ? 'Update' : 'Post'} Request
            </Button>
          </View>
        </View>
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
    backgroundColor: gs.colors.primary,
    margin: '5%',
    padding: '5%',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: gs.colors.titleColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    color: gs.colors.titleColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    width: '48%',
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
