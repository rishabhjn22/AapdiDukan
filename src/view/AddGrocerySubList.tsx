/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Input from '../components/Input';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/responsive';
import Modal from 'react-native-modalbox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import Options from '../components/Options';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import {AddGrocerySubListProps} from '../types/propTypes';
import CustomHeader from '../components/CustomHeader';
import {colors} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import GlobalContext from '../contexts/GlobalContext';
import Loader from '../components/Loader';
import Toast from 'react-native-toast-message';

export default function AddGrocerySubList({
  route,
  navigation,
}: AddGrocerySubListProps) {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [lastSellingPrice, setLastSellingPrice] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [errors, setErrors] = useState<GrocerySubListErrors>({});
  const groceryDetails = route.params.data;
  const {productId} = useContext(GlobalContext);

  useEffect(() => {
    if (route.params.do === 'Edit') {
      setName(groceryDetails.name);
      setImage(groceryDetails.image_url);
      setBuyingPrice(groceryDetails.buying_price);
      setSellingPrice(groceryDetails.selling_price);
      setLastSellingPrice(groceryDetails.last_selling_price);
    }
  }, []);

  function onClosedModal() {
    setShowModal(false);
  }

  function takePhotoFromCamera() {
    ImagePicker.openCamera({
      width: 1200,
      height: 1200,
      cropping: true,
    })
      .then(el => {
        console.log(el);
        const imageUri = el.path;
        setImage(imageUri);
        setShowModal(false);
        setIsImageUploaded(true);
      })
      .catch(err => {
        console.log(err);
        setIsImageUploaded(false);
      });
  }

  function choosePhotoFromLibrary() {
    ImagePicker.openPicker({
      width: 1200,
      height: 1200,
      cropping: true,
    })
      .then(el => {
        console.log(el);
        const imageUri = el.path;
        setImage(imageUri);
        setShowModal(false);
        setIsImageUploaded(true);
      })
      .catch(err => {
        console.log(err);
        setIsImageUploaded(false);
      });
  }

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    console.log(uploadUri, 'uploadUri');

    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);

    const storageRef = storage().ref(`photos/${filename}`);
    console.log(storageRef, '--');

    const task = storageRef.putFile(uploadUri);

    // Set transferred state

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  function alert() {
    Alert.alert(`Delete ${name}`, `${name} will be deleted!`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteItem()},
    ]);
  }

  function deleteItem() {
    setUploading(true);
    firestore()
      .collection('Goods')
      .doc(productId)
      .collection('Items')
      .doc(groceryDetails.id)
      .delete()
      .then(() => {
        Toast.show({
          type: 'error',
          text1: 'User deleted!',
        });
        setUploading(false);
        navigation.goBack();
      });
  }

  function validation(): boolean {
    const validationErrors: GrocerySubListErrors = {};
    if (name.length === 0) {
      validationErrors.name = 'Please enter Name';
    }
    if (sellingPrice.length === 0) {
      validationErrors.selling = 'Please enter Selling Price';
    }
    if (buyingPrice.length === 0) {
      validationErrors.buying = 'Please enter Buying Price';
    }
    if (image.length === 0) {
      validationErrors.image = 'Please Upload Image';
    }
    setErrors({...validationErrors});
    return Object.keys(validationErrors).length === 0;
  }

  async function onSubmit() {
    const validateInputs = validation();
    if (isImageUploaded) {
      var imageUrl;
      imageUrl = await uploadImage();
    } else {
      imageUrl = image;
    }
    if (validateInputs) {
      if (route.params.do === 'Add') {
        firestore()
          .collection('Goods')
          .doc(productId)
          .collection('Items')
          .add({
            name: name,
            image_url: imageUrl,
            selling_price: sellingPrice,
            buying_price: buyingPrice,
            last_selling_price: lastSellingPrice,
            postTime: firestore.Timestamp.fromDate(new Date()),
          })
          .then(() => {
            Toast.show({
              type: 'success',
              text1: 'Item Added',
            });
            navigation.goBack();
          })
          .catch((error: any) => {
            console.log(
              'Something went wrong with added post to firestore.',
              error,
            );
            Toast.show({
              type: 'error',
              text1: 'Something went wrong',
            });
          });
      } else {
        firestore()
          .collection('Goods')
          .doc(productId)
          .collection('Items')
          .doc(groceryDetails.id)
          .update({
            name: name,
            image_url:
              imageUrl?.length !== 0 ? imageUrl : groceryDetails.image_url,
            selling_price: sellingPrice,
            buying_price: buyingPrice,
            last_selling_price: lastSellingPrice,
            postTime: firestore.Timestamp.fromDate(new Date()),
          })
          .then(() => {
            Toast.show({
              type: 'success',
              text1: 'Item Updated',
            });
            navigation.goBack();
          })
          .catch((error: any) => {
            console.log(
              'Something went wrong with added post to firestore.',
              error,
            );
            Toast.show({
              type: 'error',
              text1: 'Something went wrong',
            });
          });
      }
    }
  }

  return (
    <LinearGradient
      useAngle={true}
      colors={[colors.gradiant1, colors.white, colors.gradiant2]}
      style={styles.container}>
      <CustomHeader
        heading={
          route.params.do === 'Add'
            ? `ADD NEW ${productId.toUpperCase()}`
            : name
        }
        back={true}
        onPressBack={() => navigation.goBack()}
        deleteButton={route.params.do === 'Add' ? false : true}
        onPressDelete={() => alert()}
      />
      {uploading && <Loader />}
      <ScrollView>
        <Pressable
          style={styles.photobackinner}
          onPress={() => setShowModal(true)}>
          {image.length !== 0 && (
            <Image
              source={{uri: image}}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <AntDesign name="camera" size={30} color="#CCCCCC" />
          <Text>Upload Photo</Text>
          {/* {image.length !== 0 && uploading && (
            <View>
              <Text>{transferred} % Completed!</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )} */}
        </Pressable>
        {errors.image && <Text style={styles.error}>{errors.image}</Text>}
        <View style={styles.inputConatiner}>
          <Input
            label="Name"
            value={name}
            onChangeText={val => setName(val)}
            placeholder="Enter Name"
            maxLength={14}
            error={errors.name}
          />
        </View>
        <View style={styles.inputConatiner}>
          <Input
            label="Selling Price"
            value={sellingPrice}
            onChangeText={val => setSellingPrice(val)}
            placeholder="Enter Selling Price"
            keyboardType="numeric"
            maxLength={4}
            error={errors.selling}
          />
        </View>
        <View style={styles.inputConatiner}>
          <Input
            label="Buying Price"
            value={buyingPrice}
            onChangeText={val => setBuyingPrice(val)}
            placeholder="Enter Buying Price"
            keyboardType="numeric"
            maxLength={4}
            error={errors.buying}
          />
        </View>
        <View style={styles.inputConatiner}>
          <Input
            label="Last Selling Price"
            value={lastSellingPrice}
            onChangeText={val => setLastSellingPrice(val)}
            placeholder="Enter Last Selling Price"
            keyboardType="numeric"
            maxLength={4}
          />
        </View>

        <View style={styles.button}>
          <CustomButton
            title={route.params.do === 'Add' ? 'Save' : 'Update'}
            onPress={onSubmit}
          />
        </View>
        <Modal
          isOpen={showModal}
          onClosed={onClosedModal}
          backButtonClose={true}
          backdrop={true}
          style={styles.modal}>
          <Options
            onPressCamera={takePhotoFromCamera}
            onPressGallery={choosePhotoFromLibrary}
          />
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  inputConatiner: {
    marginTop: verticalScale(20),
    width: horizontalScale(350),
    alignSelf: 'center',
  },
  headerView: {
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  headerText: {
    fontFamily: 'Roboto-Medium',
    fontSize: moderateScale(18),
  },
  photobackinner: {
    marginTop: verticalScale(30),
    width: horizontalScale(350),
    height: verticalScale(200),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  modal: {
    width: '90%',
    height: 'auto',
    backgroundColor: 'transparent',
  },
  image: {
    width: horizontalScale(350),
    height: verticalScale(200),
    position: 'absolute',
    borderRadius: 8,
  },
  button: {
    margin: 50,
    marginTop: verticalScale(30),
  },
  error: {
    color: 'red',
    left: 15,
    top: 5,
  },
});
