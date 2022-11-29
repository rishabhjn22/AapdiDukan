import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SplashProps} from '../types/propTypes';

export default function Splash({navigation}: SplashProps) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 1500);
  });

  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
