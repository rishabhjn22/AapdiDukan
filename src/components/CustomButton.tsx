import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {CustomButtonProps} from '../types/propTypes';
import {moderateScale} from '../utils/responsive';

export default function CustomButton({
  onPress,
  title,
  style,
}: CustomButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#CCCCCC',
    borderWidth: 0.5,
    borderColor: '#ACACAC',
    padding: 15,
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: moderateScale(14),
    color: '#000',
  },
});
