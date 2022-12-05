import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utils/colors';
import {EndIconProps} from '../types/propTypes';

export default function EndIcon({onPressMicroPhone}: EndIconProps) {
  return (
    <Pressable style={styles.conatiner} onPress={onPressMicroPhone}>
      <FontAwesome name="microphone" size={20} color={colors.secondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});
