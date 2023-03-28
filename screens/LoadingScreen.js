import { View, Text, StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import SplashScreenImage from '../assets/splash.png';
import AppLoadingAnimation from '../assets/animations/app-loading.json';
import { useRef } from 'react';

export default function LoadingScreen() {
  const animation = useRef(null);
  return (
    <ImageBackground
      source={SplashScreenImage}
      resizeMode='cover'
      style={styles.rootContainer}
    >
      <View style={styles.container}>
        <LottieView
          loop={true}
          autoPlay={true}
          ref={animation}
          style={{
            width: '50%',
          }}
          source={AppLoadingAnimation}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: '10%',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
});
