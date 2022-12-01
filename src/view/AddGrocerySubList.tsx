/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

export default function AddGrocerySubList({route}: AddGrocerySubListProps) {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const groceryDetails = route.params.data;

  useEffect(() => {
    if (route.params.do === 'Edit') {
      setName(groceryDetails.name);
      setImage(groceryDetails.image_url);
    }
  }, []);

  function onClosedModal() {
    setShowModal(false);
  }

  function takePhotoFromCamera() {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
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
      height: 780,
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
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    console.log(storageRef, '--');

    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

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

  async function onSubmit() {
    var imageUrl;
    if (isImageUploaded) {
      imageUrl = await uploadImage();
    } else {
      imageUrl = image;
    }
    if (route.params.do === 'Add') {
      firestore()
        .collection('Goods')
        .doc('Rice')
        .collection('Items')
        .add({
          name: name,
          image_url: imageUrl,
          postTime: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log('Item Added');
        })
        .catch((error: any) => {
          console.log(
            'Something went wrong with added post to firestore.',
            error,
          );
        });
    } else {
      firestore()
        .collection('Goods')
        .doc('Rice')
        .collection('Items')
        .doc(groceryDetails.id)
        .update({
          name: name,
          image_url:
            imageUrl?.length !== 0 ? imageUrl : groceryDetails.image_url,
        })
        .then(() => {
          console.log('Item Updated');
        })
        .catch((error: any) => {
          console.log(
            'Something went wrong with added post to firestore.',
            error,
          );
        });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>AddData</Text>
      </View>
      <View style={styles.inputConatiner}>
        <Input
          label="Name"
          value={name}
          onChangeText={val => setName(val)}
          placeholder="Enter Name"
        />
      </View>
      <View style={styles.photoback}>
        <Pressable
          style={styles.photobackinner}
          onPress={() => setShowModal(true)}>
          {image.length !== 0 && (
            <Image source={{uri: image}} style={styles.image} />
          )}
          <AntDesign name="camera" size={30} color="#CCCCCC" />
          <Text>Upload Photo</Text>
          {image.length !== 0 && uploading && (
            <View>
              <Text>{transferred} % Completed!</Text>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </Pressable>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputConatiner: {
    marginTop: verticalScale(30),
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
  photoback: {
    width: horizontalScale(350),
    height: verticalScale(200),
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(30),
    backgroundColor: '#CACACA',
  },
  photobackinner: {
    alignItems: 'center',
    width: horizontalScale(320),
    alignSelf: 'center',
    height: verticalScale(160),
    justifyContent: 'center',
    backgroundColor: '#ECECEC',
  },
  modal: {
    width: '90%',
    height: 'auto',
    backgroundColor: 'transparent',
  },
  image: {
    height: verticalScale(160),
    width: horizontalScale(320),
    position: 'absolute',
  },
  button: {
    margin: 50,
    marginTop: verticalScale(75),
  },
});
