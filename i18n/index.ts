import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import gb from "./gb/common.json";
import fa from "./fa/common.json";

i18n.use(initReactI18next).init({
  resources: {
    gb: { common: gb },
    fa: { common: fa },
  },
  lng: "gb",
  fallbackLng: "gb",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
