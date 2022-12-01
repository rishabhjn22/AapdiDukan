import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FABProps} from '../types/propTypes';

export default function FAB({onPress, name, size, style}: FABProps) {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      <AntDesign name={name} size={size} color="#FAFAFA" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
