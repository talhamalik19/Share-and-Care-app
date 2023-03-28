import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import Button from '../../components/UI/Button';
import { Linking } from 'react-native';
import {
  applyForVolunteerRequest,
  withdrawVolunteerRequest,
  hideVolunteerRequest,
} from '../../utilities/routes/volunteers';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';

export default function VolunteerRequestsDetailsScreen({ navigation, route }) {
  const user = useSelector((state) => state.user);
  const { name, email, phone, cnic } = user;
  const { item, screen, applicantStatus } = route.params;

  const acceptVolunteerRequest = async () => {
    if (item.requestStatus === 'Disabled') {
      showMessage({
        message: 'Hospital is not accepting volunteers anymore',
        type: 'warning',
        icon: 'warning',
      });
    } else if (
      item.applicants.find((applicant) => applicant.applicantEmail === email)
    ) {
      showMessage({
        message: 'You have already applied for this request',
        type: 'warning',
        icon: 'warning',
      });
    } else {
      const record = {
        volunteerRequestId: item._id,
        applicantName: name,
        applicantEmail: email,
        applicantPhone: phone,
        applicantCnic: cnic,
      };
      const response = await applyForVolunteerRequest(record);
      if (response.status === '200') {
        navigation.goBack();
      }
      showMessage({
        message: response.message,
        type: response.status === '200' ? 'success' : 'warning',
        icon: response.status === '200' ? 'success' : 'warning',
      });
    }
  };

  const callHospital = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const phoneNumber =
      item.hospitalPhone.trim() === NaN ? false : item.hospitalPhone;
    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    } else {
      showMessage({
        message: 'Phone number is not available',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  const sendEmail = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const email =
      item.hospitalEmail.trim() === NaN ? false : item.hospitalEmail;
    if (email) {
      const url = `mailto:${email}`;
      Linking.openURL(url);
    } else {
      showMessage({
        message: 'Email is not available',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  const withdrawRequest = async () => {
    const record = {
      id: item._id,
      applicantEmail: email,
    };
    const response = await withdrawVolunteerRequest(record);
    if (response.status === '200') {
      navigation.goBack();
    }
    showMessage({
      message: response.message,
      type: response.status === '200' ? 'success' : 'warning',
      icon: response.status === '200' ? 'success' : 'warning',
    });
  };

  const hideRequest = async () => {
    const record = {
      id: item._id,
      applicantEmail: email,
    };
    const response = await hideVolunteerRequest(record);
    if (response.status === '200') {
      navigation.goBack();
    }
    showMessage({
      message: response.message,
      type: response.status === '200' ? 'success' : 'warning',
      icon: response.status === '200' ? 'success' : 'warning',
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: item?.hospitalName,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.container}>
        <Text style={styles.requestTitle}>{item.volunteerRequestTitle}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.details}>{item.volunteerRequestDescription}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Duration</Text>
          <Text style={styles.details}>{item.timeDuration}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Volunteers Required</Text>
          <Text style={styles.details}>{item.volunteersRequired}</Text>
        </View>

        {screen === 'myRequests' && (
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Request Status</Text>
            <Text style={styles.details}>{applicantStatus}</Text>
          </View>
        )}

        {screen === 'all' && (
          <>
            <Button
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                Alert.alert(
                  'Apply to Volunteer',
                  'Are you sure you want to apply for this request? You will be notified if your request is approved or not!',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => acceptVolunteerRequest() },
                  ],
                  { cancelable: false }
                );
              }}
              style={styles.button}
            >
              {item.requestStatus === 'Enabled' && 'Apply'}
            </Button>
            <Button
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                Alert.alert(
                  'Hide Request',
                  'Do you want to hide this request?',
                  [
                    {
                      text: 'No',
                      style: 'No',
                    },
                    {
                      text: 'Yes',
                      onPress: hideRequest,
                    },
                  ],
                  { cancelable: false }
                );
              }}
              buttonColor={gs.colors.buttonColor3}
              style={styles.button}
            >
              {item.requestStatus === 'Enabled' && 'Hide Request'}
            </Button>
          </>
        )}

        {screen === 'myRequests' &&
          item.requestStatus === 'Enabled' &&
          applicantStatus === 'Applied' && (
            <Button
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                Alert.alert(
                  'Withdraw Request',
                  'Do you want to withdraw your request?',
                  [
                    {
                      text: 'No',
                      style: 'No',
                    },
                    {
                      text: 'Yes',
                      onPress: withdrawRequest,
                    },
                  ],
                  { cancelable: false }
                );
              }}
              textSize={14}
              buttonColor={gs.colors.buttonColor3}
              style={styles.button}
            >
              Withdraw Request
            </Button>
          )}

        <View style={styles.divider}></View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Hospital Name</Text>
          <Text style={styles.details}>{item.hospitalName}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Contact</Text>
          <Text style={styles.details}>{item.hospitalPhone}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Email</Text>
          <Text onPress={sendEmail} style={[styles.details, styles.email]}>
            {item.hospitalEmail}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Hospital Address</Text>
          <Text style={styles.details}>{item.hospitalLocation}</Text>
        </View>
        <Button onPress={callHospital} textSize={14} style={styles.button}>
          Call {item.hospitalName}
        </Button>
      </View>
    </ScrollView>
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
    paddingVertical: '5%',
    paddingHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  requestTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2%',
  },
  detailsContainer: {
    marginVertical: '2%',
  },
  title: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  details: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  email: {
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: '3%',
    minWidth: '60%',
  },
  divider: {
    borderColor: 'white',
    borderBottomWidth: 1,
    borderRadius: 10,
    width: '80%',
    marginVertical: '5%',
  },
});
