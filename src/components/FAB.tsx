import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FABProps} from '../types/propTypes';
import {colors} from '../utils/colors';

export default function FAB({onPress, name, size, style}: FABProps) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <AntDesign name={name} size={size} color="#FAFAFA" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
