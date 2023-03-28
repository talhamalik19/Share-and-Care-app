import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import UserAvatar from 'react-native-user-avatar';
import Icon from '../UI/Icon';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchStats } from '../../utilities/routes/user';
import * as Haptics from 'expo-haptics';

export default function TopDisplay() {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState('');
  const [fName, setFName] = useState('');
  const [requestsCount, setRequestsCount] = useState(0);

  const navigation = useNavigation();

  const getTotalRequests = async () => {
    const response = await fetchStats({
      email: user.email,
    });
    if (response.status === '200') {
      setRequestsCount(response.data);
    }
  };

  useFocusEffect(() => {
    setName(user.name ?? '');
    setFName(name?.split(' ')[0] ?? '');
  });

  useFocusEffect(() => {
    getTotalRequests();
  });

  const goToSignoutScreen = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Signout');
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.userDetails}>
          <UserAvatar size={45} name={name} />
          <Text style={styles.userName}>Welcome, {fName}</Text>
        </View>
        <View style={styles.userCompleteDetails}>
          <Icon
            lib='a'
            name='logout'
            color='white'
            size={20}
            onPress={goToSignoutScreen}
          />
        </View>
      </View>
      <View style={styles.resources}>
        <Text style={styles.requests}>Your Requests:</Text>
        <Text style={styles.requestsNumber}>{requestsCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: gs.colors.primary,
    margin: '5%',
    padding: '5%',
    borderRadius: 10,
    elevation: 5,
  },
  user: {
    flexDirection: 'row',
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  userCompleteDetails: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: gs.colors.titleColor,
  },
  resources: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: gs.colors.background,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  requests: {
    fontSize: 14,
    color: 'black',
    marginRight: '1%',
  },
  requestsNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});
