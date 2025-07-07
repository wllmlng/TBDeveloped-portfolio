import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './en/translation.json'


i18n
  .use(LanguageDetector) // auto-detect browser language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // react already escapes
    },
    resources: {
        en: { translation: en },
    },
  })

export default i18n
