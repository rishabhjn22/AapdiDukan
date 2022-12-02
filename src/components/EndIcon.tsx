import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../utils/colors';

export default function EndIcon() {
  return (
    <Pressable style={styles.conatiner}>
      <AntDesign name="search1" size={20} color={colors.secondary} />
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
