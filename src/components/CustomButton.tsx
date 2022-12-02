import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {CustomButtonProps} from '../types/propTypes';
import {moderateScale} from '../utils/responsive';
import {colors} from '../utils/colors';

export default function CustomButton({
  onPress,
  title,
  style,
  textStyle,
}: CustomButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 4,
    elevation: 1,
    backgroundColor: colors.secondary,
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: moderateScale(18),
    color: '#ffffff',
  },
});
