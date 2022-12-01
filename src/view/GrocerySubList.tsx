/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {GrocerySubListParams} from '../types/propTypes';
import FAB from '../components/FAB';
import {horizontalScale, verticalScale} from '../utils/responsive';

export default function GrocerySubList({
  route,
  navigation,
}: GrocerySubListParams) {
  const [data, setData] =
    useState<{id: string; name: string; image_url: any}[]>();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let list: {id: string; name: string; image_url: any}[] = [];
    firestore()
      .collection('Goods')
      .doc(route.params.name)
      .collection('Items')
      .orderBy('name', 'asc')
      .get()
      .then(documentSnapshot => {
        documentSnapshot.forEach(doc => {
          const {name, image_url} = doc.data();
          const id = doc.id;
          console.log(id, 'idd');

          list.push({
            id,
            name,
            image_url: image_url,
          });
        });
        setData(list);
      });
  }

  return (
    <View style={styles.container}>
      {data &&
        data.map(item => {
          return (
            <View
              key={item.name}
              style={{
                alignItems: 'center',
                borderWidth: 1,
                flexDirection: 'row',
                marginTop: verticalScale(10),
                margin: 20,
              }}>
              <Image
                source={{uri: item.image_url}}
                style={{height: 100, width: 100}}
              />
              <Text style={{color: '#000', left: horizontalScale(100)}}>
                {item.name}
              </Text>
              <View style={styles.edit}>
                <FAB
                  style={{height: 40, width: 40}}
                  size={20}
                  name="edit"
                  onPress={() =>
                    navigation.navigate('AddGrocerySubList', {
                      do: 'Edit',
                      data: item,
                    })
                  }
                />
              </View>
            </View>
          );
        })}
      <View style={styles.fab}>
        <FAB
          size={25}
          name="plus"
          onPress={() => navigation.navigate('AddGrocerySubList', {do: 'Add'})}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fab: {
    position: 'absolute',
    bottom: verticalScale(50),
    right: horizontalScale(30),
  },
  edit: {
    position: 'absolute',
    right: 10,
  },
});
