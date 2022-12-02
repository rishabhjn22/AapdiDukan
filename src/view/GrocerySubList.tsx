/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {GrocerySubListParams, SubListProps} from '../types/propTypes';
import FAB from '../components/FAB';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/responsive';
import CustomHeader from '../components/CustomHeader';
import {colors} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/Input';

export default function GrocerySubList({
  route,
  navigation,
}: GrocerySubListParams) {
  const [data, setData] = useState<SubListProps[]>([]);
  const [fileteredData, setFileteredData] = useState<SubListProps[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getData();
  }, []);

  function searchData(value: string) {
    let filtered = [...fileteredData];
    if (value !== '') {
      filtered = fileteredData.filter(el => {
        if (el.name?.toLowerCase().includes(search.toLowerCase())) {
          return el;
        }
      });
      setFileteredData([...filtered]);
    } else {
      setFileteredData(data);
    }
    setSearch(value);
  }

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
          list.push({
            id,
            name,
            image_url: image_url,
          });
        });
        setData(list);
        setFileteredData(list);
      });
  }

  return (
    <LinearGradient
      useAngle={true}
      colors={[colors.gradiant1, colors.white, colors.gradiant2]}
      style={styles.container}>
      <CustomHeader />
      {fileteredData.length !== 0 && (
        <View style={styles.search}>
          <Input
            placeholder="Search..."
            endIcon={true}
            value={search}
            onChangeText={value => searchData(value)}
          />
        </View>
      )}

      {fileteredData.length !== 0 ? (
        fileteredData.map(item => {
          return (
            <View key={item.name} style={styles.itemContainer}>
              <Image source={{uri: item.image_url}} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={[styles.text, {fontFamily: 'Roboto-Regular'}]}>
                  Name:{' '}
                </Text>
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View style={styles.edit}>
                <FAB
                  style={styles.fabButton}
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
        })
      ) : (
        <View style={styles.noDataContainer}>
          <Image
            source={require('../assets/images/NoData.png')}
            style={styles.noDataImage}
          />
        </View>
      )}
      <View style={styles.fab}>
        <FAB
          size={25}
          name="plus"
          onPress={() => navigation.navigate('AddGrocerySubList', {do: 'Add'})}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  itemContainer: {
    elevation: 2,
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    bottom: verticalScale(50),
    right: horizontalScale(30),
  },
  fabButton: {height: 40, width: 40},
  edit: {
    position: 'absolute',
    right: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  text: {
    color: colors.textColor,
    fontFamily: 'Roboto-Medium',
    fontSize: moderateScale(16),
  },
  search: {
    margin: 10,
  },
  textContainer: {
    marginLeft: horizontalScale(10),
    flexDirection: 'row',
  },
  noDataContainer: {
    alignItems: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  noDataImage: {
    height: verticalScale(300),
    width: horizontalScale(300),
  },
});
