import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

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
      en: {
        translation: {
          welcome: 'Welcome',
          message: 'This is a test message',
        },
      },
      fr: {
        translation: {
          welcome: 'Bienvenue',
          message: 'Ceci est un message de test',
        },
      },
    },
  })

export default i18n
