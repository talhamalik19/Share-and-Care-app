import {
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useLayoutEffect } from 'react';
import Button from '../../components/UI/Button';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import {
  approveResourceRequest,
  deleteResourceRequest,
  hideResourceRequest,
} from '../../utilities/routes/resource';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import * as Haptics from 'expo-haptics';

export default function ResourceDetailsScreen({ navigation, route }) {
  const request = route.params.item;

  const user = useSelector((state) => state.user);
  const { name, email, phone } = user;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: request.resourceName,
    });
  }),
    [navigation, request];

  const call = (phone) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (phone) {
      const url = `tel:${phone}`;
      Linking.openURL(url);
    } else {
      showMessage({
        message: 'Phone number not available',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  const sendEmail = (email) => {
    if (email) {
      const url = `mailto:${email}`;
      Linking.openURL(url);
    } else {
      showMessage({
        message: 'Email not available',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  const approveRequest = async () => {
    if (request.requestedByEmail === user.email) {
      showMessage({
        message: 'You cannot approve your own request',
        type: 'warning',
        icon: 'warning',
      });
    } else {
      const record = {
        id: request._id,
        requestStatus: 'Approved',
        approvedByName: name,
        approvedByEmail: email,
        approvedByPhone: phone,
      };
      const response = await approveResourceRequest(record);
      showMessage({
        message: response.message,
        type: response.status === '200' ? 'success' : 'warning',
        icon: response.status === '200' ? 'success' : 'warning',
      });
      if (response.status === '200') {
        navigation.goBack();
      }
    }
  };

  const deleteRequest = async () => {
    const record = {
      id: request._id,
      email,
    };
    const response = await deleteResourceRequest(record);
    showMessage({
      message: response.message,
      type: response.status === '200' ? 'success' : 'warning',
      icon: response.status === '200' ? 'success' : 'warning',
    });
    if (response.status === '200') {
      navigation.goBack();
    }
  };

  const hideRequest = async () => {
    const record = {
      id: request._id,
      email,
    };
    const response = await hideResourceRequest(record);
    showMessage({
      message: response.message,
      type: response.status === '200' ? 'success' : 'warning',
      icon: response.status === '200' ? 'success' : 'warning',
    });
    if (response.status === '200') {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.container}>
        <Text style={styles.name}>{request.resourceName}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Request Status</Text>
          <Text style={styles.details}>{request.requestStatus}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Duration</Text>
          <Text style={styles.details}>{request.resourceDuration}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Quantity</Text>
            <Text style={styles.details}>{request.resourceQuantity}</Text>
          </View>
        </View>

        {request.resourceNotes !== '' && (
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Additional Notes</Text>
            <Text style={styles.details}>{request.resourceNotes}</Text>
          </View>
        )}

        {request.requestStatus !== 'Approved' &&
          request.requestedByEmail !== email && (
            <>
              <Button
                style={styles.button}
                textSize={14}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  Alert.alert(
                    'Approve Request',
                    'I assure the resources are available and are of good quality!',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      { text: 'OK', onPress: approveRequest },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                Approve Request
              </Button>
              <Button
                style={styles.button}
                textSize={14}
                buttonColor={gs.colors.buttonColor3}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  Alert.alert(
                    'Hide Request',
                    'Are you sure you want to hide this request?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },

                      { text: 'OK', onPress: hideRequest },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                Hide Request
              </Button>
            </>
          )}
        {request.requestStatus !== 'Approved' &&
          request.requestedByEmail === email && (
            <>
              <Button
                style={styles.button}
                textSize={14}
                buttonColor={gs.colors.buttonColor1}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  navigation.navigate('ResourceRequest', {
                    request,
                  });
                }}
              >
                Update Request
              </Button>
              <Button
                style={styles.button}
                textSize={14}
                buttonColor={gs.colors.buttonColor3}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  Alert.alert(
                    'Delete Request',
                    'Are you sure you want to delete your request?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      { text: 'OK', onPress: deleteRequest },
                    ],
                    { cancelable: false }
                  );
                }}
              >
                Delete Request
              </Button>
            </>
          )}

        {request.requestedByEmail !== email && (
          <>
            <View style={styles.divider} />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Requested By:</Text>
              <Text style={styles.details}>{request.requestedByName}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Contact Number</Text>
              <Text style={styles.details}>{request.requestedByPhone}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Email</Text>
              <Text
                onPress={sendEmail.bind(this, request.requestedByEmail)}
                style={[styles.details, styles.email]}
              >
                {request.requestedByEmail}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Address</Text>
              <Text style={styles.details}>{request.requestedByAddress}</Text>
            </View>

            {request.requestedByEmail !== email && (
              <Button
                style={styles.button}
                textSize={14}
                onPress={call.bind(this, request.requestedByPhone)}
              >
                Call {request.requestedByName}
              </Button>
            )}
          </>
        )}

        {request.requestStatus !== 'Pending' &&
          request.requestedByEmail === email && (
            <>
              <View style={styles.divider} />
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Request Approved By</Text>
                <Text style={styles.details}>{request.approvedByName}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Contact Number</Text>
                <Text style={styles.details}>{request.approvedByPhone}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Email</Text>
                <Text
                  onPress={sendEmail.bind(this, request.approvedByEmail)}
                  style={[styles.details, styles.email]}
                >
                  {request.approvedByEmail}
                </Text>
              </View>
              {request.requestedByEmail !== email && (
                <Button
                  style={styles.button}
                  textSize={14}
                  onPress={call.bind(this, request.requestedByPhone)}
                >
                  Call {request.requestedByName}
                </Button>
              )}
              {request.requestStatus === 'Approved' &&
                request.approvedByEmail !== email && (
                  <Button
                    style={styles.button}
                    textSize={14}
                    onPress={call.bind(this, request.approvedByPhone)}
                  >
                    Call {request.approvedByName}
                  </Button>
                )}
            </>
          )}
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
    overflow: 'hidden',
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2%',
  },
  detailsContainer: {
    marginVertical: '2%',
    marginHorizontal: '5%',
  },
  title: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: '2%',
    textAlign: 'center',
  },
  details: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: '2%',
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
