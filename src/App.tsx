import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import Home from "@/pages/Home";
import MetodoCira from "@/pages/MetodoCira";
import IntelligenceLab from "@/pages/IntelligenceLab";
import LeadershipAcademy from "@/pages/LeadershipAcademy";
import Experiencia from "@/pages/Experiencia";
import QuienesSomos from "@/pages/QuienesSomos";
import Perspectivas from "@/pages/Perspectivas";
import Contacto from "@/pages/Contacto";
import PlaneacionEstrategica from "@/pages/metodo-cira/PlaneacionEstrategica";
import SeleccionDeSoluciones from "@/pages/metodo-cira/SeleccionDeSoluciones";
import SolucionDetalle from "@/pages/metodo-cira/SolucionDetalle";
import GestionDeProyectos from "@/pages/metodo-cira/GestionDeProyectos";
import GestionDelCambio from "@/pages/metodo-cira/GestionDelCambio";
import AutomatizacionesDesarrollo from "@/pages/intelligence-lab/AutomatizacionesDesarrollo";
import ArquitecturaDeIA from "@/pages/intelligence-lab/ArquitecturaDeIA";
import GobiernoDeIA from "@/pages/intelligence-lab/GobiernoDeIA";
import CursoDetalle from "@/pages/leadership-academy/CursoDetalle";
import Privacidad from "@/pages/Privacidad";
import Cookies from "@/pages/Cookies";
import { CookieConsent } from "@/components/layout/cookie-consent";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metodo-cira" element={<MetodoCira />} />
        <Route path="/metodo-cira/planeacion-estrategica" element={<PlaneacionEstrategica />} />
        <Route path="/metodo-cira/seleccion-de-soluciones" element={<SeleccionDeSoluciones />} />
        <Route path="/metodo-cira/seleccion-de-soluciones/:solucion" element={<SolucionDetalle />} />
        <Route path="/metodo-cira/gestion-de-proyectos" element={<GestionDeProyectos />} />
        <Route path="/metodo-cira/gestion-del-cambio" element={<GestionDelCambio />} />
        <Route path="/intelligence-lab" element={<IntelligenceLab />} />
        <Route path="/intelligence-lab/automatizaciones-desarrollo" element={<AutomatizacionesDesarrollo />} />
        <Route path="/intelligence-lab/arquitectura-de-ia" element={<ArquitecturaDeIA />} />
        <Route path="/intelligence-lab/gobierno-de-ia" element={<GobiernoDeIA />} />
        <Route path="/leadership-academy" element={<LeadershipAcademy />} />
        <Route path="/leadership-academy/:curso" element={<CursoDetalle />} />
        <Route path="/experiencia" element={<Experiencia />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/perspectivas" element={<Perspectivas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>
      <CookieConsent />
    </BrowserRouter>
  );
}
