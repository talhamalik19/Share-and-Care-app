import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SignoutScreen from '../screens/User/SignoutScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import NoConnectionScreen from '../screens/NoConnectionScreen';
import AccountScreen from '../screens/User/AccountScreen';
import UpdateAccount from '../screens/User/UpdateAccount';
import UpdatePassword from '../screens/User/UpdatePassword';
import DeleteAccountScreen from '../screens/User/DeleteAccountScreen';
import DonationsScreen from '../screens/Donation/DonationsScreen';
import DonationDetailsScreen from '../screens/Donation/DonationDetailsScreen';
import ResourcesScreen from '../screens/Resources/ResourcesScreen';
import PostRequestScreen from '../screens/Resources/PostRequestScreen';
import ResourceDetailsScreen from '../screens/Resources/ResourceDetailsScreen';
import VolunteerRequestsDetailsScreen from '../screens/Volunteers/VolunteerRequestsDetailsScreen';
import VolunteersScreen from '../screens/Volunteers/VolunteersScreen';

export default function AfterAuthentication() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='NoInternet' component={NoConnectionScreen} />
      <Stack.Screen
        name='Notifications'
        options={{
          presentation: 'modal',
        }}
        component={NotificationsScreen}
      />

      {/* user */}
      <Stack.Group name='User'>
        <Stack.Screen name='Account' component={AccountScreen} />
        <Stack.Screen name='UpdateAccount' component={UpdateAccount} />
        <Stack.Screen name='UpdatePassword' component={UpdatePassword} />
        <Stack.Screen name='Signout' component={SignoutScreen} />
        <Stack.Screen name='DeleteAccount' component={DeleteAccountScreen} />
      </Stack.Group>

      {/* Donations */}
      <Stack.Group name='Donations'>
        <Stack.Screen name='Donations' component={DonationsScreen} />
        <Stack.Screen
          name='DonationDetails'
          component={DonationDetailsScreen}
        />
      </Stack.Group>

      {/* Resources */}
      <Stack.Group name='Resources'>
        <Stack.Screen name='Resources' component={ResourcesScreen} />
        <Stack.Screen name='ResourceRequest' component={PostRequestScreen} />
        <Stack.Screen
          name='ResourceDetails'
          component={ResourceDetailsScreen}
        />
      </Stack.Group>

      {/* Volunteers */}
      <Stack.Group name='Volunteers'>
        <Stack.Screen name='Volunteers' component={VolunteersScreen} />
        <Stack.Screen
          name='VolunteerRequestDetails'
          component={VolunteerRequestsDetailsScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
