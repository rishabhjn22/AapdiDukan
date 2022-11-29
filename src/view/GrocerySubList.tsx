import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import firestore, {collection, getDocs} from '@react-native-firebase/firestore';

export default function GrocerySubList({route}: GrocerySubListParams) {
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    // let list: {id: string; name: any}[] = [];
    // firestore()
    //   .collection('Goods')
    //   .doc('Rice')
    //   .get()
    //   .then(documentSnapshot => {
    //     console.log('User exists: ', documentSnapshot.exists);

    //     if (documentSnapshot.exists) {
    //       console.log('User data: ', documentSnapshot.data());
    //     }
    //   });
    const citiesRef = firestore()
      .collection('Goods')
      .doc('Rice')
      .collection('Items');
    const snapshot = await citiesRef.get();
    snapshot.forEach(doc => {
      console.log('=>', doc.data());
    });
  }

  return (
    <View>
      <Text>GrocerySubList</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
