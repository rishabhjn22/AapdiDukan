/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import FAB from '../components/FAB';
import {GroceryListProps} from '../types/propTypes';

export default function GroceryList({navigation}: GroceryListProps) {
  const [items, setItems] = useState<
    {
      id: string;
      name: any;
      image_url: any;
    }[]
  >();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let list: {id: string; name: any; image_url: any}[] = [];
    await firestore()
      .collection('Goods')
      .get()
      .then(documentSnapshot => {
        documentSnapshot.forEach(doc => {
          const {name, image_url} = doc.data();
          const id = doc.id;
          list.push({
            id,
            name,
            image_url: image_url,
          });
        });
      });
    setItems(list);
  }

  function renderItem({
    item,
  }: ListRenderItemInfo<{id: string; name: any; image_url: any}>) {
    return (
      <Pressable
        style={{padding: 20, alignItems: 'center'}}
        onPress={() => navigation.navigate('GrocerySubList', {id: item.id})}>
        <Image
          source={{uri: item.image_url}}
          style={{height: 100, width: 100}}
        />
        <Text>{item.name}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
      />
      <FAB onPress={() => navigation.navigate('AddGrocery')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
