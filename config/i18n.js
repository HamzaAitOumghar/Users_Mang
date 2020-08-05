import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import frTrans from "../client/assets/i18n/translations/fr.json";
import enTrans from "../client/assets/i18n/translations/en.json";

const resources = {
  en: {
    translation: enTrans,
  },
  fr: {
    translation: frTrans,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  debug: true,
  keySeparator: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
