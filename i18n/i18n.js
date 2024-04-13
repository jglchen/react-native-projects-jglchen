import i18n from 'i18next'; 
import 'intl-pluralrules';
import {initReactI18next} from 'react-i18next'; 
import en from './en.json'; 
import zhtw from './zh-tw.json';

const languageResources = {
  en: {translation: en},
  zhtw: {translation: zhtw}
};


i18n.use(initReactI18next).init({ 
    lng: 'en', 
    fallbackLng: 'en', 
    resources: languageResources,
    //resources: { 
      //en: en, 
      //zhtw: zhtw, 
    //}, 
    interpolation: { 
      escapeValue: false // react already safes from xss 
    } 
}); 

export default i18n; 