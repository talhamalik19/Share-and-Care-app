import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  getIndieNotificationInbox,
  deleteIndieNotificationInbox,
} from 'native-notify';
import { useSelector } from 'react-redux';
import { GLOBALS } from '../utilities/constants/config';
import RenderItem from '../components/Notifications/RenderItem';
import NoNotifications from '../components/Notifications/NoNotifications';
import * as Haptics from 'expo-haptics';
import { showMessage } from 'react-native-flash-message';
import { GlobalStyles as gs } from '../utilities/constants/styles';

export default function NotificationsScreen({ navigation, route }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const { email } = user;

  const { appId, appToken } = GLOBALS;

  const getNotificationInbox = async () => {
    setIsLoading(true);
    const inbox = await getIndieNotificationInbox(email, appId, appToken);
    setNotifications(inbox);
    setIsLoading(false);
  };

  const deleteNotification = async (notification_id) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await deleteIndieNotificationInbox(
        email,
        notification_id,
        appId,
        appToken
      );
      showMessage({
        message: 'Notification deleted',
        type: 'success',
        icon: 'success',
      });
      getNotificationInbox();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNotificationInbox();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.notification_id}
        renderItem={({ item }) => (
          <RenderItem item={item} onPress={deleteNotification} />
        )}
        onRefresh={getNotificationInbox}
        refreshing={isLoading}
        ListEmptyComponent={!isLoading && <NoNotifications />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.background,
  },
  title: {
    fontSize: 14,
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  subtitle: {},
  contentContainer: {},
  content: {},
});
