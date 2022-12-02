import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../utils/responsive';
import FastImage from 'react-native-fast-image';
import {colors} from '../utils/colors';

export default function Loader() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* <FastImage
          source={require('../assets/images/Spinner.gif')}
          style={styles.image}
        /> */}
        <ActivityIndicator color={colors.secondary} size="large" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    // backgroundColor: 'transparent',
  },
  image: {
    height: verticalScale(200),
    width: horizontalScale(200),
  },
  text: {
    color: colors.secondary,
  },
});
