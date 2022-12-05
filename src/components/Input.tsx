import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {InputProps} from '../types/propTypes';
import {moderateScale, verticalScale} from '../utils/responsive';
import {colors} from '../utils/colors';
import EndIcon from './EndIcon';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  endIcon,
  error,
  maxLength,
  keyboardType,
  onPressMicroPhone,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.input}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
      {endIcon && <EndIcon onPressMicroPhone={onPressMicroPhone} />}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    color: colors.textColor,
    fontFamily: 'Roboto-Medium',
    fontSize: moderateScale(15),
  },
  input: {
    backgroundColor: '#FFFFFF',
    marginTop: verticalScale(10),
    borderRadius: 5,
    padding: 10,
    elevation: 1,
  },
  error: {
    color: 'red',
    top: 5,
  },
});
