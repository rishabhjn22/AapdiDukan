import {Dimensions, StyleSheet, View, Text, Pressable} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';
import {moderateScale} from '../utils/responsive';
import {CustomHeaderProps} from '../types/propTypes';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {height} = Dimensions.get('window');

export default function CustomHeader({
  heading,
  onPressBack,
  back,
  deleteButton,
  onPressDelete,
}: CustomHeaderProps) {
  return (
    <View style={styles.headerView}>
      {back && (
        <Pressable style={styles.back} onPress={onPressBack}>
          <Feather name="arrow-left" size={30} color="#ffffff" />
        </Pressable>
      )}

      <Text style={styles.headerText}>{heading}</Text>
      {deleteButton && (
        <Pressable style={styles.delete} onPress={onPressDelete}>
          <MaterialCommunityIcons name="delete" size={30} color="red" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    height: height / 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: moderateScale(20),
    fontFamily: 'Roboto-Bold',
  },
  back: {
    left: 20,
    position: 'absolute',
  },
  delete: {
    position: 'absolute',
    right: 20,
  },
});
