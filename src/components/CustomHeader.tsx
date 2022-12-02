import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';
import {moderateScale} from '../utils/responsive';
const {height} = Dimensions.get('window');

export default function CustomHeader() {
  return (
    <View style={styles.headerView}>
      {/* <Text style={styles.headerText}>CustomHeader</Text> */}
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
    color: colors.textColor,
    fontSize: moderateScale(18),
    fontFamily: 'Roboto-Bold',
  },
});
