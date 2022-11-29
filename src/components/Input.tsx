import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {InputProps} from '../types/propTypes';
import {verticalScale} from '../utils/responsive';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    color: '#CCCCCC',
  },
  input: {
    backgroundColor: '#ECECEC',
    marginTop: verticalScale(10),
    borderRadius: 5,
    padding: 10,
  },
});
