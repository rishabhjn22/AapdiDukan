import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {horizontalScale, verticalScale} from '../utils/responsive';
import {FABProps} from '../types/propTypes';

export default function FAB({onPress}: FABProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <AntDesign name="plus" size={25} color="#FAFAFA" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCCCCC',
    position: 'absolute',
    bottom: verticalScale(50),
    right: horizontalScale(30),
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
