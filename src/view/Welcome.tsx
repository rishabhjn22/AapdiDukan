/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import '../assets/languages/i18n';
import CustomButton from '../components/CustomButton';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/responsive';
import {WeclomeProps} from '../types/propTypes';

export default function Welcome({navigation}: WeclomeProps) {
  const {t, i18n} = useTranslation();

  const [currentLanguage, setLanguage] = useState('en');

  const change = (value: string) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{t('hello')} </Text>
      <Text style={styles.headerText}>
        Please Select the language you want to continue...
      </Text>
      <Text style={styles.headerText}>
        कृपया वह भाषा चुनें जिसे आप जारी रखना चाहते हैं।
      </Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => change('en')}
          title="Select English "
          style={{
            backgroundColor: currentLanguage === 'en' ? '#ECEC' : '#CCCCCC',
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => change('hi')}
          title="हिंदी का चयन करें"
          style={{
            backgroundColor: currentLanguage === 'hi' ? '#ECEC' : '#CCCCCC',
          }}
        />
      </View>
      <View
        style={[
          styles.buttonContainer,
          {width: verticalScale(380), marginTop: verticalScale(100)},
        ]}>
        <CustomButton
          title={t('Next')}
          onPress={() => navigation.navigate('GroceryList')}
          style={{backgroundColor: 'lightgreen'}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: horizontalScale(250),
    marginTop: verticalScale(50),
    alignSelf: 'center',
  },
  headerText: {
    fontFamily: 'Roboto-Medium',
    fontSize: moderateScale(14),
    lineHeight: verticalScale(30),
    alignSelf: 'center',
  },
  welcomeText: {
    fontFamily: 'Roboto-Medium',
    fontSize: moderateScale(16),
    lineHeight: verticalScale(30),
    alignSelf: 'center',
  },
});
