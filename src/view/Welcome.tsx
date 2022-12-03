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
import {colors} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../components/CustomHeader';

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
    <LinearGradient
      useAngle={true}
      colors={[colors.gradiant1, colors.white, colors.gradiant2]}
      style={styles.container}>
      <CustomHeader heading="Welcome" />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>{t('hello')} </Text>
        <Text style={styles.headerText}>
          Please Select the language you want to continue...
        </Text>
        <Text style={styles.headerText}>
          कृपया वह भाषा चुनें जिसे आप जारी रखना चाहते हैं।
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => change('en')}
          title="Select English "
          style={{
            backgroundColor:
              currentLanguage === 'en' ? '#428B75' : colors.gradiant1,
          }}
          textStyle={{
            color: currentLanguage === 'en' ? '#FFFFFF' : '#000000',
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => change('hi')}
          title="हिंदी का चयन करें"
          style={{
            backgroundColor:
              currentLanguage === 'hi' ? '#428B75' : colors.gradiant1,
          }}
          textStyle={{
            color: currentLanguage === 'hi' ? '#FFFFFF' : '#000000',
          }}
        />
      </View>
      <View style={[styles.buttonContainer]}>
        <CustomButton
          title={t('Next')}
          onPress={() => navigation.navigate('GroceryList')}
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
  buttonContainer: {
    width: horizontalScale(250),
    marginTop: verticalScale(50),
    alignSelf: 'center',
  },
  headerText: {
    fontFamily: 'Roboto-Medium',
    fontSize: moderateScale(15),
    lineHeight: verticalScale(30),
    alignSelf: 'center',
    color: colors.textColor,
  },
  welcomeText: {
    fontFamily: 'Roboto-Medium',
    fontSize: moderateScale(18),
    lineHeight: verticalScale(30),
    alignSelf: 'center',
    color: colors.textColor,
  },
  textContainer: {
    marginTop: verticalScale(30),
  },
});
