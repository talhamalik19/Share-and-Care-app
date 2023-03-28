import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Icon from '../UI/Icon';
import { GlobalStyles as gs } from '../../utilities/constants/styles';
import * as Haptics from 'expo-haptics';

export default function BottomDisplayButton({
  onPress,
  name,
  lib,
  size,
  title,
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={styles.container}
    >
      <Icon
        lib={lib}
        mode='icon'
        color={'white'}
        name={name}
        size={size}
        style={styles.icon}
      />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    // borderRadius: 10,
    // backgroundColor: "#e5ffed",
    backgroundColor: gs.colors.primary,
    width: 130,
    height: 130,
    paddingHorizontal: 10,
    elevation: 5,
    margin: '5%',
  },
  icon: {
    backgroundColor: gs.colors.primary,
    padding: '2%',
    borderRadius: 50,
  },
  text: {
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
  },
});
