/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import Loader from '../components/Loader';
import GlobalContext from '../contexts/GlobalContext';

export default function GrocerySubList({
  route,
  navigation,
}: GrocerySubListParams) {
  const [data, setData] = useState<SubListProps[]>([]);
  const [fileteredData, setFileteredData] = useState<SubListProps[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const {productId} = useContext(GlobalContext);

  useEffect(() => {
    navigation.addListener('focus', getData);
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
    setLoading(true);
    let list: SubListProps[] = [];
    firestore()
      .collection('Goods')
      .doc(route.params.name)
      .collection('Items')
      .orderBy('name', 'asc')
      .get()
      .then(documentSnapshot => {
        documentSnapshot.forEach(doc => {
          const {
            name,
            image_url,
            selling_price,
            buying_price,
            last_selling_price,
          } = doc.data();
          const id = doc.id;
          list.push({
            id,
            name,
            image_url: image_url,
            selling_price,
            buying_price,
            last_selling_price,
          });
        });
        setData(list);
        setFileteredData(list);
        setLoading(false);
      });
  }

  return (
    <LinearGradient
      useAngle={true}
      colors={[colors.gradiant1, colors.white, colors.gradiant2]}
      style={styles.container}>
      <CustomHeader
        heading={productId}
        back={true}
        onPressBack={() => navigation.goBack()}
      />
      {loading && <Loader />}
      <View style={styles.search}>
        <Input
          iconName="search"
          placeholder="Search..."
          endIcon={true}
          value={search}
          onChangeText={value => searchData(value)}
        />
      </View>

      {fileteredData.length !== 0 ? (
        fileteredData.map(item => {
          return (
            <Pressable
              key={item.name}
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate('AddGrocerySubList', {
                  do: 'Edit',
                  data: item,
                })
              }>
              <Image
                source={{uri: item.image_url}}
                style={styles.image}
                resizeMode="cover"
              />

              <View style={styles.detailsContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.name.toUpperCase()}</Text>
                </View>

                <View style={styles.priceCont}>
                  {/* <View style={styles.priceTag}> */}
                  <Text style={styles.price}>Buy: ₹{item.buying_price}</Text>
                  {/* </View> */}
                  {/* <View style={styles.priceTag}> */}
                  {item.last_selling_price && (
                    <Text style={[styles.price, {left: 10}]}>
                      Last: ₹{item.last_selling_price}
                    </Text>
                  )}

                  {/* </View> */}
                </View>
              </View>

              <View style={styles.accod}>
                <Text style={[styles.text, {fontSize: moderateScale(18)}]}>
                  ₹{item.selling_price}
                </Text>
              </View>
            </Pressable>
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
    alignItems: 'center',
    elevation: 2,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
  },
  detailsContainer: {
    marginLeft: horizontalScale(20),
  },
  fab: {
    position: 'absolute',
    bottom: verticalScale(50),
    right: horizontalScale(30),
  },
  fabButton: {height: 40, width: 40},
  accod: {
    position: 'absolute',
    right: 30,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 120,
  },
  text: {
    color: colors.textColor,
    fontFamily: 'Roboto-Bold',
    fontSize: moderateScale(16),
    lineHeight: 25,
  },
  price: {
    color: '#FF6666',
    fontFamily: 'Roboto-Bold',
    fontSize: moderateScale(16),
    lineHeight: 25,
  },
  search: {
    margin: 10,
  },
  textContainer: {
    flexDirection: 'row',
  },
  noDataContainer: {
    alignItems: 'center',
    top: verticalScale(50),
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
  },
  noDataImage: {
    height: verticalScale(300),
    width: horizontalScale(300),
  },
  priceCont: {
    flexDirection: 'row',
  },
  priceTag: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: colors.gradiant1,
    elevation: 3,
    fontSize: 14,
  },
});
