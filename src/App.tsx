import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { LanguageProvider } from "@/lib/language";
import Home from "@/pages/Home";
import { CookieConsent } from "@/components/layout/cookie-consent";

// Home stays in the main bundle (it's the common entry point); every other
// route is split out so a visitor doesn't parse the whole site to see one page.
const MetodoCira = lazy(() => import("@/pages/MetodoCira"));
const IntelligenceLab = lazy(() => import("@/pages/IntelligenceLab"));
const LeadershipAcademy = lazy(() => import("@/pages/LeadershipAcademy"));
const Experiencia = lazy(() => import("@/pages/Experiencia"));
const QuienesSomos = lazy(() => import("@/pages/QuienesSomos"));
const Perspectivas = lazy(() => import("@/pages/Perspectivas"));
const Contacto = lazy(() => import("@/pages/Contacto"));
const PlaneacionEstrategica = lazy(() => import("@/pages/metodo-cira/PlaneacionEstrategica"));
const SeleccionDeSoluciones = lazy(() => import("@/pages/metodo-cira/SeleccionDeSoluciones"));
const SolucionDetalle = lazy(() => import("@/pages/metodo-cira/SolucionDetalle"));
const GestionDeProyectos = lazy(() => import("@/pages/metodo-cira/GestionDeProyectos"));
const GestionDelCambio = lazy(() => import("@/pages/metodo-cira/GestionDelCambio"));
const AutomatizacionesDesarrollo = lazy(
  () => import("@/pages/intelligence-lab/AutomatizacionesDesarrollo"),
);
const ArquitecturaDeIA = lazy(() => import("@/pages/intelligence-lab/ArquitecturaDeIA"));
const GobiernoDeIA = lazy(() => import("@/pages/intelligence-lab/GobiernoDeIA"));
const CursoDetalle = lazy(() => import("@/pages/leadership-academy/CursoDetalle"));
const Privacidad = lazy(() => import("@/pages/Privacidad"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Empty fallback: chunks resolve fast enough that a spinner would only
          flash. ScrollToTop keeps the viewport stable across the swap. */}
      <Suspense fallback={null}>
      <Routes>
        <Route element={<LanguageProvider lang="es"><Outlet /></LanguageProvider>}>
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
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/en" element={<LanguageProvider lang="en"><Outlet /></LanguageProvider>}>
          <Route index element={<Home />} />
          <Route path="metodo-cira" element={<MetodoCira />} />
          <Route path="metodo-cira/planeacion-estrategica" element={<PlaneacionEstrategica />} />
          <Route path="metodo-cira/seleccion-de-soluciones" element={<SeleccionDeSoluciones />} />
          <Route path="metodo-cira/seleccion-de-soluciones/:solucion" element={<SolucionDetalle />} />
          <Route path="metodo-cira/gestion-de-proyectos" element={<GestionDeProyectos />} />
          <Route path="metodo-cira/gestion-del-cambio" element={<GestionDelCambio />} />
          <Route path="intelligence-lab" element={<IntelligenceLab />} />
          <Route path="intelligence-lab/automatizaciones-desarrollo" element={<AutomatizacionesDesarrollo />} />
          <Route path="intelligence-lab/arquitectura-de-ia" element={<ArquitecturaDeIA />} />
          <Route path="intelligence-lab/gobierno-de-ia" element={<GobiernoDeIA />} />
          <Route path="leadership-academy" element={<LeadershipAcademy />} />
          <Route path="leadership-academy/:curso" element={<CursoDetalle />} />
          <Route path="experiencia" element={<Experiencia />} />
          <Route path="quienes-somos" element={<QuienesSomos />} />
          <Route path="perspectivas" element={<Perspectivas />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="privacidad" element={<Privacidad />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <CookieConsent />
    </BrowserRouter>
  );
}
