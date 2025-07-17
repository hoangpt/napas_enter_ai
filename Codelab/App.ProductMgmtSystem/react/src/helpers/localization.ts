import localStorageConstants from 'constants/localStorage';
import localizationConstants from 'constants/localization';

const { LOCALIZATION } = localStorageConstants;
const { REGIONS } = localizationConstants;

const getCurrentLanguage = () => {
  const language = localStorage.getItem(LOCALIZATION) || REGIONS.en.key;
  return language;
};

const changeLanguage = (language: string) => {
  if (language === getCurrentLanguage()) return;
  localStorage.setItem(LOCALIZATION, language);
  window.location.reload();
};

export default {
  getCurrentLanguage,
  changeLanguage,
};
