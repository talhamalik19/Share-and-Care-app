import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { GlobalStyles as gs } from '../../utilities/constants/styles';

export default function InputField({
  style,
  placeholder,
  value,
  innerRef,
  secureTextEntry,
  onChangeText,
  autoCapitalize,
  keyboardType,
  returnKeyType,
  onSubmitEditing,
  multiline,
  numberOfLines,
  editable,
  maxLength,
  autoFocus,
  textContentType,
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      maxLength={maxLength ?? 100}
      placeholder={placeholder ?? 'Enter text'}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize ?? 'none'}
      secureTextEntry={secureTextEntry || false}
      keyboardType={keyboardType ?? 'default'}
      ref={innerRef}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={false}
      returnKeyType={returnKeyType ?? 'done'}
      multiline={multiline ?? false}
      numberOfLines={numberOfLines ?? 1}
      editable={editable ?? true}
      enablesReturnKeyAutomatically={true}
      autoFocus={autoFocus ?? false}
      textContentType={textContentType ?? 'none'}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 8,
    marginVertical: 8,
    backgroundColor: gs.colors.inputBgColor,
    borderRadius: 10,
    elevation: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
