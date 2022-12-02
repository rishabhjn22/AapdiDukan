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
import {GroceryListProps, ListProps} from '../types/propTypes';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../utils/responsive';
import CustomHeader from '../components/CustomHeader';
import {colors} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/Input';
import Loader from '../components/Loader';

export default function GroceryList({navigation}: GroceryListProps) {
  const [items, setItems] = useState<ListProps[]>([]);
  const [fileteredData, setFileteredData] = useState<ListProps[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

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
      setFileteredData(items);
    }
    setSearch(value);
  }

  async function getData() {
    setLoading(true);
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
    setLoading(false);
    setFileteredData(list);
  }

  function renderItem({item}: ListRenderItemInfo<{name: any; image_url: any}>) {
    return (
      <View style={styles.item}>
        <Pressable
          style={styles.itemContainer}
          onPress={() =>
            navigation.navigate('GrocerySubList', {name: item.name})
          }>
          <Image
            source={{uri: item.image_url}}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      useAngle={true}
      colors={[colors.gradiant1, colors.white, colors.gradiant2]}
      style={styles.container}>
      <CustomHeader />

      <View>
        <View style={styles.search}>
          <Input
            placeholder="Search..."
            endIcon={true}
            value={search}
            onChangeText={value => searchData(value)}
          />
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={fileteredData}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          numColumns={3}
          contentContainerStyle={styles.flatlist}
        />
      </View>
      {loading && <Loader />}
      <View style={styles.fab}>
        <FAB
          onPress={() => navigation.navigate('AddGrocery')}
          size={25}
          name="plus"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: verticalScale(50),
    right: horizontalScale(30),
  },
  itemContainer: {
    borderRadius: 8,
    backgroundColor: colors.card,
    elevation: 2,
  },
  item: {
    marginLeft: horizontalScale(20),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  name: {
    fontSize: moderateScale(16),
    fontFamily: 'Roboto-Bold',
    top: verticalScale(7.5),
    color: colors.textColor,
  },
  flatlist: {marginTop: verticalScale(20)},
  search: {
    margin: 20,
  },
});
