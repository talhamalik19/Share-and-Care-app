import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AfterAuthentication from './AfterAuthentication';
import BeforeAuthentication from './BeforeAuthentication';
import { useSelector, useDispatch } from 'react-redux';
import { checkCredentials } from '../utilities/routes/user';
import { setUser, setIsConnected, setIsLoading } from '../store/user';
import { checkForConnectionOnce } from '../utilities/helpers/intenet-connection';
import LoadingScreen from '../screens/LoadingScreen';
import NoConnectionScreen from '../screens/NoConnectionScreen';
import { showMessage } from 'react-native-flash-message';

export default function Navigator() {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { isLoggedIn, isConnected, isLoading } = user;

  const checkForInternetConnection = async () => {
    const isInternetReachable = await checkForConnectionOnce();
    dispatch(setIsConnected(isInternetReachable));
    if (!isInternetReachable) {
      showMessage({
        message: 'No internet connection',
        type: 'warning',
        icon: 'warning',
      });
    }
  };

  const checkForCredentialsInLocalStorage = async () => {
    dispatch(setIsLoading(true));
    const response = await checkCredentials();
    if (response.status) {
      dispatch(setUser(response?.user));
      showMessage({
        message: `Welcome back, ${response?.user?.name}`,
        type: 'success',
        icon: 'success',
      });
    }
    dispatch(setIsLoading(false));
  };

  useLayoutEffect(() => {
    checkForInternetConnection();
    checkForCredentialsInLocalStorage();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        id='navigator'
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoading ? (
          <Stack.Screen name='Loading' component={LoadingScreen} />
        ) : isConnected ? (
          isLoggedIn ? (
            <Stack.Screen
              name='AfterAuthentication'
              component={AfterAuthentication}
            />
          ) : (
            <Stack.Screen
              name='BeforeAuthentication'
              component={BeforeAuthentication}
            />
          )
        ) : (
          <Stack.Screen
            name='NoConnection'
            component={NoConnectionScreen}
            initialParams={{
              checkForInternetConnection,
              checkForCredentialsInLocalStorage,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
