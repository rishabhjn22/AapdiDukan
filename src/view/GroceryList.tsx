/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import FAB from '../components/FAB';
import {GroceryListProps} from '../types/propTypes';
import {verticalScale, horizontalScale} from '../utils/responsive';

export default function GroceryList({navigation}: GroceryListProps) {
  const [items, setItems] = useState<
    {
      name: any;
      image_url: any;
    }[]
  >();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let list: {name: any; image_url: any}[] = [];
    await firestore()
      .collection('Goods')
      .get()
      .then(documentSnapshot => {
        documentSnapshot.forEach(doc => {
          const {name, image_url} = doc.data();
          list.push({
            name,
            image_url: image_url,
          });
        });
      });
    setItems(list);
  }

  function renderItem({item}: ListRenderItemInfo<{name: any; image_url: any}>) {
    return (
      <Pressable
        style={{padding: 20, alignItems: 'center'}}
        onPress={() =>
          navigation.navigate('GrocerySubList', {name: item.name})
        }>
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
        keyExtractor={item => item.name}
        numColumns={3}
      />
      <View style={styles.fab}>
        <FAB
          onPress={() => navigation.navigate('AddGrocery')}
          size={25}
          name="plus"
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
});
