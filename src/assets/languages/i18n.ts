import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import hi from './hi.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    hi: hi,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;

// t - function which accepts key as parameter and returns the
//     appropriate text based on current language selected.
// i18n - object containing function like changeLanguage
//     and other useful values.
