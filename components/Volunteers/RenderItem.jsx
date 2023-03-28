import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

function RenderItem({ item, screen }) {
  const [applicantStatus, setApplicantStatus] = useState('');
  const navigation = useNavigation();

  const user = useSelector((state) => state.user);
  const { email } = user;

  const checkApplicantStatus = () => {
    item.applicants.forEach((applicant) => {
      if (applicant.applicantEmail === email) {
        setApplicantStatus(applicant.applicantRequestStatus);
      }
    });
  };

  useLayoutEffect(() => {
    checkApplicantStatus();
  }, [item]);

  const goToVolunteerRequest = () => {
    navigation.navigate('VolunteerRequestDetails', {
      item,
      screen,
      applicantStatus,
    });
  };

  return (
    <Pressable onPress={goToVolunteerRequest} style={styles.container}>
      <View style={styles.row}>
        <Text
          style={[
            styles.title,
            screen === 'myRequests' && {
              width: '80%',
            },
          ]}
        >
          {item.volunteerRequestTitle}
        </Text>
        {screen === 'myRequests' && (
          <Text
            style={[
              styles.requestStatus,
              applicantStatus === 'Rejected' && styles.rejected,
              applicantStatus === 'Applied' && styles.applied,
              applicantStatus === 'Approved' && styles.approved,
            ]}
          >
            {applicantStatus}
          </Text>
        )}
      </View>
      <Text style={styles.text}>Requested By: {item.hospitalName}</Text>
      <Text style={styles.text}>Contact: {item.hospitalPhone}</Text>
    </Pressable>
  );
}

export default React.memo(RenderItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: gs.colors.primary,
    padding: '4%',
    marginVertical: '2%',
    marginHorizontal: '4%',
    borderRadius: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  counter: {
    width: '20%',
    fontSize: 12,
    color: 'white',
    textAlign: 'left',
    marginTop: '3%',
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    color: 'white',
    textAlign: 'left',
    marginTop: 3,
  },
  requestStatus: {
    maxHeight: 25,
    maxWidth: 60,
    fontSize: 10,
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 25,
    marginLeft: 'auto',
    textAlign: 'center',
  },
  applied: {
    backgroundColor: 'yellow',
    color: 'black',
  },
  approved: {
    backgroundColor: 'green',
  },
  rejected: {
    backgroundColor: 'red',
  },
});
