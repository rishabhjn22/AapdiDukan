import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {moderateScale, verticalScale} from '../utils/responsive';
import {OptionsProps} from '../types/propTypes';

export default function Options({onPressCamera, onPressGallery}: OptionsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCont}>
        <Pressable style={styles.camera} onPress={onPressCamera}>
          <Entypo name="camera" size={30} color="#000" />
          <Text style={styles.text}>Camera</Text>
        </Pressable>
        <Pressable style={styles.camera} onPress={onPressGallery}>
          <Entypo name="folder-images" size={30} color="#000" />
          <Text style={styles.text}>Gallery</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconCont: {},
  camera: {
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 25,
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: moderateScale(14),
    top: 5,
    left: 5,
    color: '#00000',
  },
});
