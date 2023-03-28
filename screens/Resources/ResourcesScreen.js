import React, { useLayoutEffect } from 'react';
import ResourcesTabs from '../../navigators/ResourcesTabs';
import Icon from '../../components/UI/Icon';
import * as Haptics from 'expo-haptics';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

export default function ResourcesScreen({ navigation }) {
  const { address } = useSelector((state) => state.user);

  const goToRequestResourceScreen = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (address.trim() === '') {
      Alert.alert(
        'Address Required',
        'You need to add your address before you can request a resource.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Add Address',
            style: 'default',
            onPress: () => navigation.navigate('UpdateAccount'),
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate('ResourceRequest');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          lib={'i'}
          size={26}
          color={'blue'}
          name={'ios-create-outline'}
          onPress={goToRequestResourceScreen}
        />
      ),
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, [address]);

  return <ResourcesTabs />;
}
