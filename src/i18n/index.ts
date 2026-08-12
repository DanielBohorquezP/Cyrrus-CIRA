import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esMetodoCira from "./locales/es/metodo-cira.json";
import esEstrategia from "./locales/es/estrategia.json";
import esSeleccionSoluciones from "./locales/es/seleccion-soluciones.json";
import esGestionProyectos from "./locales/es/gestion-proyectos.json";
import esGestionCambio from "./locales/es/gestion-cambio.json";
import esIntelligenceLab from "./locales/es/intelligence-lab.json";
import esLeadershipAcademy from "./locales/es/leadership-academy.json";
import esPaginas from "./locales/es/paginas.json";
import esContacto from "./locales/es/contacto.json";
import esLegal from "./locales/es/legal.json";
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enMetodoCira from "./locales/en/metodo-cira.json";
import enEstrategia from "./locales/en/estrategia.json";
import enSeleccionSoluciones from "./locales/en/seleccion-soluciones.json";
import enGestionProyectos from "./locales/en/gestion-proyectos.json";
import enGestionCambio from "./locales/en/gestion-cambio.json";
import enIntelligenceLab from "./locales/en/intelligence-lab.json";
import enLeadershipAcademy from "./locales/en/leadership-academy.json";
import enPaginas from "./locales/en/paginas.json";
import enContacto from "./locales/en/contacto.json";
import enLegal from "./locales/en/legal.json";

i18next.use(initReactI18next).init({
  lng: "es",
  fallbackLng: "es",
  defaultNS: "common",
  ns: [
    "common",
    "home",
    "metodo-cira",
    "estrategia",
    "seleccion-soluciones",
    "gestion-proyectos",
    "gestion-cambio",
    "intelligence-lab",
    "leadership-academy",
    "paginas",
    "contacto",
    "legal",
  ],
  interpolation: { escapeValue: false },
  resources: {
    es: {
      common: esCommon,
      home: esHome,
      "metodo-cira": esMetodoCira,
      estrategia: esEstrategia,
      "seleccion-soluciones": esSeleccionSoluciones,
      "gestion-proyectos": esGestionProyectos,
      "gestion-cambio": esGestionCambio,
      "intelligence-lab": esIntelligenceLab,
      "leadership-academy": esLeadershipAcademy,
      paginas: esPaginas,
      contacto: esContacto,
      legal: esLegal,
    },
    en: {
      common: enCommon,
      home: enHome,
      "metodo-cira": enMetodoCira,
      estrategia: enEstrategia,
      "seleccion-soluciones": enSeleccionSoluciones,
      "gestion-proyectos": enGestionProyectos,
      "gestion-cambio": enGestionCambio,
      "intelligence-lab": enIntelligenceLab,
      "leadership-academy": enLeadershipAcademy,
      paginas: enPaginas,
      contacto: enContacto,
      legal: enLegal,
    },
  },
});

export default i18next;
