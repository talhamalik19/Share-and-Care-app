import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedScreen from '../screens/Resources/FeedScreen';

const Tab = createMaterialTopTabNavigator();

export default function ResourcesTabs({ navigation, route }) {
  return (
    <Tab.Navigator backBehavior='none' keyboardDismissMode='on-drag'>
      <Tab.Screen
        name='Feed'
        options={{
          tabBarLabel: 'Feed',
        }}
        component={FeedScreen}
        initialParams={{
          screen: 'all',
        }}
      />
      <Tab.Screen
        name='MyRequests'
        options={{
          tabBarLabel: 'My Requests',
        }}
        component={FeedScreen}
        initialParams={{
          screen: 'myRequests',
        }}
      />
      <Tab.Screen
        name='ApprovedRequests'
        options={{
          tabBarLabel: 'Approved',
        }}
        component={FeedScreen}
        initialParams={{
          screen: 'approved',
        }}
      />
    </Tab.Navigator>
  );
}
