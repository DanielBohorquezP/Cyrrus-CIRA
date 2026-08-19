import { lazy, Suspense, useState, type ComponentType } from "react";
import { BrowserRouter, Routes, Route, Outlet, matchPath } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { LanguageProvider } from "@/lib/language";
import Home from "@/pages/Home";
import { CookieConsent } from "@/components/layout/cookie-consent";

type PageModule = { default: ComponentType };

interface RoutePage {
  (): React.ReactElement;
  /** Fetches this route's chunk. Safe to call repeatedly. */
  preload: () => Promise<PageModule>;
}

/**
 * A code-split route that can be hydrated.
 *
 * Two things here exist because the app hydrates its prerendered HTML rather
 * than re-rendering it (see src/main.tsx):
 *
 * 1. The Suspense boundary is per-route, not once around <Routes>. A single
 *    shared boundary put a Suspense component in every page's tree — Home
 *    included, which isn't lazy and never suspends. React looks for the comment
 *    markers that wrap a server-rendered Suspense boundary, doesn't find them in
 *    markup produced by a client render, and gives up on hydrating the subtree.
 *
 * 2. When the chunk is already loaded, the page renders with no boundary at all.
 *    That's the case main.tsx sets up: it preloads the chunk for the URL being
 *    visited before it hydrates, so the route renders synchronously on the first
 *    pass and React can match it against the existing DOM. Without it a lazy
 *    route suspends on its first render, and a suspended boundary can't hydrate
 *    — every page except Home would rebuild its whole tree.
 *
 * Empty fallback: chunks resolve fast enough that a spinner would only flash.
 * ScrollToTop keeps the viewport stable across the swap.
 */
function lazyPage(loader: () => Promise<PageModule>): RoutePage {
  let resolved: PageModule | null = null;
  let pending: Promise<PageModule> | null = null;

  const preload = () => {
    pending ??= loader().then((mod) => {
      resolved = mod;
      return mod;
    });
    return pending;
  };

  const Lazy = lazy(preload);

  function LazyPage() {
    // Decided once per mount, deliberately. Reading `resolved` on every render
    // would flip this component from the Suspense form to the direct form the
    // moment a chunk finished loading — a different tree shape, so React would
    // unmount and remount the page underneath the visitor.
    const [wasPreloaded] = useState(() => resolved !== null);

    if (wasPreloaded && resolved) {
      const Page = resolved.default;
      return <Page />;
    }
    return (
      <Suspense fallback={null}>
        <Lazy />
      </Suspense>
    );
  }

  LazyPage.preload = preload;
  return LazyPage as RoutePage;
}

// Home stays in the main bundle (it's the common entry point); every other
// route is split out so a visitor doesn't parse the whole site to see one page.
const MetodoCira = lazyPage(() => import("@/pages/MetodoCira"));
const IntelligenceLab = lazyPage(() => import("@/pages/IntelligenceLab"));
const PresenciaDigital = lazyPage(() => import("@/pages/PresenciaDigital"));
const LeadershipAcademy = lazyPage(() => import("@/pages/LeadershipAcademy"));
const Experiencia = lazyPage(() => import("@/pages/Experiencia"));
const QuienesSomos = lazyPage(() => import("@/pages/QuienesSomos"));
const Perspectivas = lazyPage(() => import("@/pages/Perspectivas"));
const Contacto = lazyPage(() => import("@/pages/Contacto"));
const PlaneacionEstrategica = lazyPage(() => import("@/pages/metodo-cira/PlaneacionEstrategica"));
const SeleccionDeSoluciones = lazyPage(() => import("@/pages/metodo-cira/SeleccionDeSoluciones"));
const SolucionDetalle = lazyPage(() => import("@/pages/metodo-cira/SolucionDetalle"));
const SeleccionDeSoftware = lazyPage(() => import("@/pages/metodo-cira/SeleccionDeSoftware"));
const SeleccionProducto = lazyPage(() => import("@/pages/metodo-cira/SeleccionProducto"));
const GestionDeProyectos = lazyPage(() => import("@/pages/metodo-cira/GestionDeProyectos"));
const GestionDelCambio = lazyPage(() => import("@/pages/metodo-cira/GestionDelCambio"));
const AutomatizacionesDesarrollo = lazyPage(
  () => import("@/pages/intelligence-lab/AutomatizacionesDesarrollo"),
);
const ArquitecturaDeIA = lazyPage(() => import("@/pages/intelligence-lab/ArquitecturaDeIA"));
const GobiernoDeIA = lazyPage(() => import("@/pages/intelligence-lab/GobiernoDeIA"));
const DesarrolloWeb = lazyPage(() => import("@/pages/presencia-digital/DesarrolloWeb"));
const Seo = lazyPage(() => import("@/pages/presencia-digital/Seo"));
const CursoDetalle = lazyPage(() => import("@/pages/leadership-academy/CursoDetalle"));
const Privacidad = lazyPage(() => import("@/pages/Privacidad"));
const Cookies = lazyPage(() => import("@/pages/Cookies"));
const NotFound = lazyPage(() => import("@/pages/NotFound"));

/**
 * The route table, written once.
 *
 * Paths are the Spanish (canonical) ones; the English tree mounts the identical
 * set under `/en`, which is the same rule langPath() and scripts/prerender.mjs
 * follow. It used to be two hand-maintained copies of the same twenty routes —
 * as data it can't drift, and preloadRouteChunk() below can match against it.
 */
const PAGES: { path: string; Component: ComponentType }[] = [
  { path: "/", Component: Home },
  { path: "/metodo-cira", Component: MetodoCira },
  { path: "/metodo-cira/planeacion-estrategica", Component: PlaneacionEstrategica },
  { path: "/metodo-cira/seleccion-de-soluciones", Component: SeleccionDeSoluciones },
  { path: "/metodo-cira/seleccion-de-soluciones/seleccion-de-software", Component: SeleccionDeSoftware },
  { path: "/metodo-cira/seleccion-de-soluciones/seleccion-de-software/:producto", Component: SeleccionProducto },
  { path: "/metodo-cira/seleccion-de-soluciones/:solucion", Component: SolucionDetalle },
  { path: "/metodo-cira/gestion-de-proyectos", Component: GestionDeProyectos },
  { path: "/metodo-cira/gestion-del-cambio", Component: GestionDelCambio },
  { path: "/intelligence-lab", Component: IntelligenceLab },
  { path: "/intelligence-lab/automatizaciones-desarrollo", Component: AutomatizacionesDesarrollo },
  { path: "/intelligence-lab/arquitectura-de-ia", Component: ArquitecturaDeIA },
  { path: "/intelligence-lab/gobierno-de-ia", Component: GobiernoDeIA },
  { path: "/presencia-digital", Component: PresenciaDigital },
  { path: "/presencia-digital/desarrollo-web", Component: DesarrolloWeb },
  { path: "/presencia-digital/seo", Component: Seo },
  { path: "/leadership-academy", Component: LeadershipAcademy },
  { path: "/leadership-academy/:curso", Component: CursoDetalle },
  { path: "/experiencia", Component: Experiencia },
  { path: "/quienes-somos", Component: QuienesSomos },
  { path: "/perspectivas", Component: Perspectivas },
  { path: "/contacto", Component: Contacto },
  { path: "/privacidad", Component: Privacidad },
  { path: "/cookies", Component: Cookies },
];

/**
 * Loads the chunk for `pathname` before React renders.
 *
 * Called from main.tsx. With the chunk already in hand the route renders on the
 * first pass instead of suspending, which is what lets a code-split page hydrate
 * its prerendered HTML rather than throw it away and rebuild.
 *
 * Resolves either way — a chunk that fails to load here just falls back to the
 * normal Suspense path, exactly as it behaved before.
 */
export function preloadRouteChunk(pathname: string): Promise<unknown> {
  const canonical = pathname === "/en" ? "/" : pathname.replace(/^\/en(?=\/)/, "");
  const match = PAGES.find(({ path }) => matchPath(path, canonical));
  const page = match?.Component as Partial<RoutePage> | undefined;
  return page?.preload?.().catch(() => undefined) ?? Promise.resolve();
}

function pageRoutes(prefixed: boolean) {
  return PAGES.map(({ path, Component }) =>
    prefixed && path === "/" ? (
      <Route key={path} index element={<Component />} />
    ) : (
      <Route
        key={path}
        path={prefixed ? path.slice(1) : path}
        element={<Component />}
      />
    ),
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<LanguageProvider lang="es"><Outlet /></LanguageProvider>}>
          {pageRoutes(false)}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/en" element={<LanguageProvider lang="en"><Outlet /></LanguageProvider>}>
          {pageRoutes(true)}
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieConsent />
    </BrowserRouter>
  );
}
