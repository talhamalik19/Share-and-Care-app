import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { GlobalStyles as gs } from '../utilities/constants/styles';
import Button from '../components/UI/Button';
import * as Haptics from 'expo-haptics';
import BACKGROUND_IMAGE from '../assets/images/LandingPage.png';

export default function LandingScreen({ navigation }) {
  const onPressLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Authentication', { screen: 'Signin' });
  };

  const onPressSignup = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Authentication', { screen: 'Signup' });
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.rootContainer}
      imageStyle={styles.backgroundImage}
      resizeMode='cover'
    >
      <View style={styles.container}>
        <Text style={styles.title}>Share & Care</Text>
        <Text style={styles.subtitle}>
          Share & Care is a platform bringing hospitals and people together in
          the time of need!
        </Text>
        <Button
          style={{
            ...styles.button,
            marginTop: '5%',
          }}
          buttonColor={gs.colors.buttonColor1}
          onPress={onPressLogin}
          textSize={18}
        >
          SIGN IN
        </Button>
        <Button
          style={styles.button}
          buttonColor={gs.colors.buttonColor2}
          onPress={onPressSignup}
          textSize={18}
        >
          SIGN UP
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {},
  container: {
    marginHorizontal: '5%',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: '2%',
    textAlign: 'center',
  },
  button: {
    width: '70%',
    marginVertical: '2%',
    borderRadius: 25,
    overflow: 'hidden',
  },
});
