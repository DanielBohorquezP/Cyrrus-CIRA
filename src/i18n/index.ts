import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esMetodoCira from "./locales/es/metodo-cira.json";
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enMetodoCira from "./locales/en/metodo-cira.json";

i18next.use(initReactI18next).init({
  lng: "es",
  fallbackLng: "es",
  defaultNS: "common",
  ns: ["common", "home", "metodo-cira"],
  interpolation: { escapeValue: false },
  resources: {
    es: { common: esCommon, home: esHome, "metodo-cira": esMetodoCira },
    en: { common: enCommon, home: enHome, "metodo-cira": enMetodoCira },
  },
});

export default i18next;
