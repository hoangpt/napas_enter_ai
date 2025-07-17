import { IRegion } from 'interfaces';
// Flags
import enFlag from 'assets/images/flags/en.svg';
import jpFlag from 'assets/images/flags/jp.svg';
// Translation files
import enTrans from 'locales/en/translation.json';
import jpTrans from 'locales/jp/translation.json';
// Antd locale files
import enUS from 'antd/lib/locale/en_US';
import jaJP from 'antd/lib/locale/ja_JP';

const RESOURCES = {
  en: { translation: enTrans },
  jp: { translation: jpTrans },
};

const REGIONS: IRegion = {
  en: {
    key: 'en',
    name: 'English',
    flag: enFlag,
    antdLocale: enUS,
  },
  jp: {
    key: 'jp',
    name: 'Japanese',
    flag: jpFlag,
    antdLocale: jaJP,
  },
};

export default {
  RESOURCES,
  REGIONS,
};
