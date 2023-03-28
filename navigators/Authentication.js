import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../components/UI/Icon';
import SigninScreen from '../screens/User/SigninScreen';
import SignupScreen from '../screens/User/SignupScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { GlobalStyles as gs } from '../utilities/constants/styles';

export default function Authentication() {
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView style={styles.rootContainer}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 3,
          },
          tabBarStyle: {
            height: 50,
          },
        }}
        backBehavior='history'
      >
        <Tab.Screen
          name='Signin'
          component={SigninScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon
                mode='icon'
                lib='mc'
                name='account-key'
                color={color}
                size={30}
              />
            ),
            tabBarLabel: 'SIGN IN',
          }}
        />
        <Tab.Screen
          name='Signup'
          component={SignupScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon
                mode='icon'
                lib='mc'
                name='account-plus'
                color={color}
                size={30}
                onPress={() => console.log('pressed')}
              />
            ),
            tabBarLabel: 'SIGN UP',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.background,
  },
});
