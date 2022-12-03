import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modalbox';
import {FloatingActionsProps} from '../types/propTypes';

export default function FloatingActions({
  isOpen,
  onClosed,
}: FloatingActionsProps) {
  return (
    <Modal
      isOpen={isOpen}
      backButtonClose={true}
      backdrop={true}
      onClosed={onClosed}
      style={styles.modal}>
      <View>
        <Text>Hellooo</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: '90%',
    height: 'auto',
  },
});
