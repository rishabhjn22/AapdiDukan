import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../utils/responsive';
// import FastImage from 'react-native-fast-image';
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0 ,0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  card: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  image: {
    height: verticalScale(200),
    width: horizontalScale(200),
  },
  text: {
    color: colors.secondary,
  },
});
