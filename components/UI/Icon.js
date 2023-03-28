import React, { useLayoutEffect, useEffect, useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Entypo,
  Feather,
} from '@expo/vector-icons';

export default function Icon({
  color,
  size,
  name,
  lib,
  onPress,
  style,
  count,
  mode,
}) {
  const [unReadCount, setUnReadCount] = useState(0);
  let Icon;

  {
    mode === 'badge' &&
      useLayoutEffect(() => {
        setUnReadCount(count);

        return () => {
          setUnReadCount(null);
        };
      }, [count]);
  }

  if (lib === 'm') {
    Icon = <MaterialIcons name={name} color={color} size={size} />;
  } else if (lib === 'mc') {
    Icon = <MaterialCommunityIcons name={name} color={color} size={size} />;
  } else if (lib === 'a') {
    Icon = <AntDesign name={name} color={color} size={size} />;
  } else if (lib === 'f') {
    Icon = <FontAwesome5 name={name} color={color} size={size} />;
  } else if (lib === 'fa') {
    Icon = <FontAwesome name={name} color={color} size={size} />;
  } else if (lib === 'i') {
    Icon = <Ionicons name={name} color={color} size={size} />;
  } else if (lib === 'e') {
    Icon = <Entypo name={name} color={color} size={size} />;
  } else if (lib === 'fe') {
    Icon = <Feather name={name} color={color} size={size} />;
  }

  if (mode === 'badge') {
    return (
      <Pressable style={style} onPress={onPress}>
        {Icon}
        {unReadCount > 0 && <Text style={styles.badge}>{unReadCount}</Text>}
      </Pressable>
    );
  } else if (mode === 'icon') {
    return <>{Icon}</>;
  } else {
    return (
      <Pressable style={style} onPress={onPress}>
        {Icon}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 12,
    paddingHorizontal: 5,
    borderRadius: 50,
    textAlign: 'center',
  },
});
