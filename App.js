import 'react-native-gesture-handler';
import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import Navigator from './navigators/Navigator';
import registerNNPushToken from 'native-notify';
import { GLOBALS } from './utilities/constants/config';
import FlashMessage from 'react-native-flash-message';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { GlobalStyles as gs } from './utilities/constants/styles';

export default function App() {
  const { appId, appToken } = GLOBALS;
  registerNNPushToken(appId, appToken);

  return (
    <View style={styles.rootContainer}>
      <Provider store={store}>
        <Navigator />
      </Provider>
      <StatusBar style='dark' />
      <FlashMessage
        hideOnPress={true}
        duration={2000}
        animated={true}
        position='top'
        style={{ zIndex: 100, marginTop: '7%' }}
        floating={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.background,
  },
});
