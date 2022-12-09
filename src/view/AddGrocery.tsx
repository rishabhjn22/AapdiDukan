/* eslint-disable @typescript-eslint/no-shadow */
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
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
import {colors} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../components/CustomHeader';
import {AddGroceryProps} from '../types/propTypes';
import Loader from '../components/Loader';
import Toast from 'react-native-toast-message';

export default function AddGrocery({navigation}: AddGroceryProps) {
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<GroceryErrors>({});

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
      })
      .catch(err => console.log(err));
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
      })
      .catch(err => console.log(err));
  }

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  function validation(): boolean {
    const validationErrors: GroceryErrors = {};
    if (name.length === 0) {
      validationErrors.name = 'Please Enter Name';
    }
    if (image.length === 0) {
      validationErrors.image = 'Please Upload Image';
    }
    setErrors({...validationErrors});
    return Object.keys(validationErrors).length === 0;
  }

  async function onSubmit() {
    const validate = validation();

    if (validate) {
      setUploading(true);
      const imageUrl = await uploadImage();
      console.log(imageUrl);
      firestore()
        .collection('Goods')
        .doc(name)
        .set({
          name: name,
          image_url: imageUrl,
          postTime: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Post Added!',
          });
          setUploading(false);
          navigation.goBack();
        })
        .catch(error => {
          console.log(
            'Something went wrong with added post to firestore.',
            error,
          );
          Toast.show({
            type: 'error',
            text1: 'Something went wrong!',
          });
          setUploading(false);
        });
    }
  }

  return (
    <LinearGradient
      colors={[colors.gradiant1, colors.white, colors.gradiant2]}
      style={styles.container}>
      <CustomHeader
        heading="ADD KIRANA ITEM"
        back={true}
        onPressBack={() => navigation.goBack()}
      />
      {uploading && <Loader />}
      <Pressable
        style={styles.photobackinner}
        onPress={() => setShowModal(true)}>
        {image.length !== 0 && (
          <Image source={{uri: image}} style={styles.image} />
        )}
        <AntDesign name="camera" size={30} color={colors.secondary} />
        <Text style={styles.uploadText}>Upload Photo</Text>
      </Pressable>
      {errors.image && <Text style={styles.error}>{errors.image}</Text>}
      <View style={styles.inputConatiner}>
        <Input
          label="Name"
          value={name}
          onChangeText={val => setName(val)}
          placeholder="Enter Name"
          error={errors.name}
        />
      </View>

      <View style={styles.button}>
        <CustomButton title="Submit" onPress={onSubmit} />
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  inputConatiner: {
    marginTop: verticalScale(30),
    width: horizontalScale(350),
    alignSelf: 'center',
  },
  headerText: {
    color: colors.textColor,
    fontSize: moderateScale(18),
    fontFamily: 'Roboto-Bold',
  },
  photobackinner: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    width: horizontalScale(350),
    height: verticalScale(200),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    borderRadius: 8,
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
    marginTop: verticalScale(50),
  },
  uploadText: {
    color: colors.textColor,
    fontSize: moderateScale(16),
    lineHeight: verticalScale(25),
    fontFamily: 'Roboto-Medium',
  },
  headerView: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    left: 15,
    top: 5,
  },
});
