# Cyrrus Consulting Services — Sitio web

Sitio institucional de Cyrrus construido alrededor de la **metodología CIRA** (Construir · Identificar · Realizar · Adoptar), con identidad de firma de consultoría premium (blanco dominante + acentos Navy/Blue/Cyan) y una estrategia de SEO orientada a topic clusters.

## Stack técnico

| Capa | Tecnología |
|---|---|
| Build / dev server | Vite 8 |
| Framework | React 19 + TypeScript |
| Estilos | Tailwind CSS v4 (`src/index.css`, tokens vía `@theme`) |
| Componentes | shadcn/ui (`components.json`, alias `@/components/ui`) |
| Routing | `react-router-dom` (SPA, `BrowserRouter`) |
| i18n | `i18next` + `react-i18next` — sitio bilingüe ES/EN (`src/i18n/`, ver [Internacionalización](#internacionalización-esen)) |
| Animación | `framer-motion` |
| Globo 3D | `cobe` (WebGL) |
| Iconos | `lucide-react` |

React monta con `hydrateRoot`, no con `createRoot`: cada ruta se **pre-renderiza** a HTML estático en build time (`scripts/prerender.mjs`) y React hidrata ese HTML en vez de re-renderizarlo desde cero — ver reglas de hidratación en `CLAUDE.md`. No hay servidor Node en producción (no es SSR en el sentido de "servidor que renderiza en cada request"); el resultado final es un sitio 100% estático, servible desde cualquier hosting. El SEO on-page se apoya en ese HTML ya renderizado más `sitemap.xml`, `robots.txt`, JSON-LD estático (`index.html`) y JSON-LD/meta dinámico por página (`usePageMeta`).

## Cómo correr el proyecto

```bash
npm install
npm run dev      # servidor de desarrollo (Vite)
npm run build    # type-check (tsc -b) + build de producción
npm run preview  # sirve el build de producción localmente
```

## Despliegue

El sitio compila a **archivos 100% estáticos** (HTML + JS + CSS + imágenes) — no hay backend ni servidor Node en producción. Esto significa que se puede desplegar en **cualquier hosting o servidor** capaz de servir archivos estáticos: Vercel, Netlify, GitHub Pages, S3+CloudFront, un VPS con Nginx/Apache, cPanel, Firebase Hosting, etc. Los pasos son siempre los mismos tres:

1. **Generar el build**
   ```bash
   npm install
   npm run build
   ```
   Esto corre, en orden: type-check (`tsc -b`) → genera `public/sitemap.xml` → build de producción con Vite → **prerender** de cada ruta (`scripts/prerender.mjs`). El resultado queda en la carpeta `dist/`, con un `index.html` real y ya renderizado por cada página del sitio (`dist/metodo-cira/index.html`, `dist/experiencia/index.html`, etc.) más un `dist/404.html` para rutas que no existen.

2. **Verificar el build localmente** (recomendado antes de subir a cualquier servidor)
   ```bash
   npm run serve
   ```
   Sirve `dist/` en `http://localhost:4178` replicando cómo debe comportarse en producción (URLs limpias, fallback a `404.html`). Revisar la consola del navegador: no debe haber errores de hidratación (ver reglas en `CLAUDE.md`).

3. **Subir el contenido de `dist/` al servidor**
   Copiar (FTP/SFTP, `rsync`, panel de control del hosting, o el mecanismo propio del proveedor) el **contenido** de la carpeta `dist/` a la raíz pública del servidor (`public_html`, `www`, el bucket, etc.). No hace falta Node ni ningún proceso corriendo — es servir archivos tal cual.

### Configuración que necesita el servidor

Como cada ruta ya viene pre-renderizada a su propio `index.html`, **no hace falta la típica reescritura "todo a index.html" de una SPA**. Solo dos cosas:

- **URLs limpias:** una petición a `/experiencia` (sin `.html`) debe resolver a `dist/experiencia/index.html`. La mayoría de hostings estáticos (Netlify, Vercel, Firebase Hosting, GitHub Pages, Nginx con `try_files`) hacen esto por defecto o con una línea de config.
- **Página 404 personalizada:** las rutas que no existen deben servir `dist/404.html` (con status 404), en vez del 404 genérico del servidor.

Ejemplo para **Nginx**:
```nginx
root /var/www/cyrrus/dist;
index index.html;

location / {
  try_files $uri $uri/ $uri/index.html =404;
}

error_page 404 /404.html;
location = /404.html {
  internal;
}
```

Ejemplo para **Apache** (`.htaccess` dentro de `dist/`):
```apache
DirectoryIndex index.html
ErrorDocument 404 /404.html
```

En hostings tipo Netlify/Vercel/Firebase esto ya viene resuelto de forma nativa (URLs limpias + 404 propio) sin configuración adicional. `vercel.json`, incluido en este repo, es la config equivalente específica de Vercel (redirects 301 puntuales y un header `noindex` para subdominios de preview) — es opcional y solo aplica si se despliega ahí; en cualquier otro servidor se puede ignorar o adaptar el mismo criterio (redirects, `noindex` en previews) a la sintaxis de ese proveedor.

No se requieren variables de entorno ni build steps adicionales del lado del servidor (el sitio no usa `.env`, no hay backend ni API propia).

## Estructura de carpetas

```
public/
  assets/
    logos-cyrrus/     → logos reales de Cyrrus (+ opt/, derivados WebP para <Img>)
    logos-clientes/    → logos reales de clientes (+ opt/)
    decoracion/         → fotografía propia real (eventos, equipo, oficina) (+ opt/)
  robots.txt
  sitemap.xml

src/
  components/
    ui/               → primitivas shadcn + bloques de terceros adaptados a TS/Cyrrus
    layout/           → header, hero de página interna, scroll-to-top, cookie consent
    sections/         → bloques de contenido compuestos con copy real de Cyrrus
    contact-wizard/   → el modal de contacto multi-paso (ver más abajo)
  i18n/               → configuración de i18next + locales/{es,en}/*.json por namespace
  lib/                → utilidades (cn, usePageMeta, nav-config, contact-wizard-config, datos compartidos)
  pages/              → una página por ruta (con subcarpetas para las rutas anidadas, p. ej. pages/metodo-cira/)
  App.tsx             → definición de rutas
```

**Convención del proyecto:** `components/ui` contiene componentes "genéricos" (reutilizables, sin copy hardcodeado de Cyrrus cuando es posible); `components/sections` contiene los wrappers que les inyectan el contenido real y los ensamblan en las páginas.

## Rutas / páginas

Todas las rutas están definidas como datos en la tabla `PAGES` de `App.tsx` — no hay dos copias de las rutas: el árbol en español se monta también bajo el prefijo `/en` (mismo slug, contenido en inglés vía `i18next`), y `preloadRouteChunk()` usa esa misma tabla para precargar el chunk de la ruta visitada antes de hidratar.

| Ruta (ES) | Archivo | Rol |
|---|---|---|
| `/` | `pages/Home.tsx` | Hero + tabs de servicios + prueba de confianza + método + experiencia + preview editorial |
| `/metodo-cira` | `pages/MetodoCira.tsx` | Las 4 fases de CIRA, cada una con ancla propia |
| `/metodo-cira/planeacion-estrategica` | `pages/metodo-cira/PlaneacionEstrategica.tsx` | Fase Construir en su propia URL/keyword |
| `/metodo-cira/seleccion-de-soluciones` | `pages/metodo-cira/SeleccionDeSoluciones.tsx` | Fase Identificar |
| `/metodo-cira/seleccion-de-soluciones/seleccion-de-software` | `pages/metodo-cira/SeleccionDeSoftware.tsx` | Selección de ERP/software, con `/:producto` para el detalle de cada producto (`SeleccionProducto.tsx`) |
| `/metodo-cira/seleccion-de-soluciones/:solucion` | `pages/metodo-cira/SolucionDetalle.tsx` | Detalle de cada solución evaluada (datos en `lib/solutions-data.ts`) |
| `/metodo-cira/gestion-de-proyectos` | `pages/metodo-cira/GestionDeProyectos.tsx` | Fase Realizar / PMO externo |
| `/metodo-cira/gestion-del-cambio` | `pages/metodo-cira/GestionDelCambio.tsx` | Fase Adoptar |
| `/intelligence-lab` | `pages/IntelligenceLab.tsx` | Gobierno y arquitectura de IA (capa transversal a CIRA) |
| `/intelligence-lab/automatizaciones-desarrollo` | `pages/intelligence-lab/AutomatizacionesDesarrollo.tsx` | Automatización con agentes de IA |
| `/intelligence-lab/arquitectura-de-ia` | `pages/intelligence-lab/ArquitecturaDeIA.tsx` | Arquitectura de IA empresarial |
| `/intelligence-lab/gobierno-de-ia` | `pages/intelligence-lab/GobiernoDeIA.tsx` | Gobierno de IA corporativo |
| `/leadership-academy` | `pages/LeadershipAcademy.tsx` | Los 7 talleres ejecutivos, todos marcados `comingSoon` en `lib/nav-config.ts` |
| `/leadership-academy/:curso` | `pages/leadership-academy/CursoDetalle.tsx` | Detalle de cada taller (datos en `lib/workshops-data.ts`) |
| `/experiencia` | `pages/Experiencia.tsx` | Países, industrias, equipo, logos de clientes |
| `/quienes-somos` | `pages/QuienesSomos.tsx` | Historia de Cyrrus y perfil del CEO |
| `/perspectivas` | `pages/Perspectivas.tsx` | Espacio editorial (blog); temas en `lib/perspectivas-topics.ts` |
| `/privacidad` | `pages/Privacidad.tsx` | Política de privacidad |
| `/cookies` | `pages/Cookies.tsx` | Política de cookies |
| `*` | `pages/NotFound.tsx` | 404 |

**`/presencia-digital`** (+ `/desarrollo-web`, `/seo`) sigue existiendo como ruta y sigue en el sitemap, pero ya **no tiene entrada en la navegación** (`lib/nav-config.ts`) desde que se quitó del nav/Home — es una página huérfana, no enlazada desde ningún otro lugar del sitio.

**`/contacto` ya no existe como página.** Se reemplazó por `ContactWizardModal` (`components/contact-wizard/`), un modal de contacto multi-paso que se abre desde cualquier CTA del sitio vía `useContactWizard()` — se monta una sola vez en `App.tsx`, fuera de `<Routes>`. Su copy y sus pasos viven en `lib/contact-wizard-config.ts` + el namespace de i18n `contact-wizard`.

`App.tsx` monta `<ScrollToTop />` para resetear scroll (o saltar a un ancla `#hash`) en cada cambio de ruta, y `<CookieConsent />` para el aviso de cookies (banner, no bloqueante, ver `components/layout/cookie-consent.tsx`).

## Internacionalización (ES/EN)

Sitio bilingüe completo, no solo textos sueltos: **todas** las rutas en español tienen su espejo bajo `/en/...` (mismo slug), montadas desde la misma tabla `PAGES` de `App.tsx` — no hay una lista de rutas en inglés mantenida a mano. El copy vive en `src/i18n/locales/{es,en}/*.json`, un archivo por namespace (`home.json`, `metodo-cira.json`, `contact-wizard.json`, `legal.json`, etc.), cargado con `i18next` + `react-i18next` (`useTranslation(namespace)`). `usePageMeta` acepta un `alternatePath` opcional que emite los `hreflang` alternates (+ `x-default`) entre la versión ES y la EN de cada página. No hay switcher manual de idioma en la UI (se removió); el idioma se determina por la URL.

## Identidad de marca y tokens

Definidos en `src/index.css`:

- **Paleta:** `--navy` `#0a2c63`, `--blue` `#1b6fc2`, `--cyan` `#3fb6e8`, `--light-blue` `#e8f2fb`, `--gray` `#5a6472`. Expuestos como utilidades Tailwind (`bg-navy`, `text-cyan`, etc.) además de los tokens shadcn estándar (`--primary`, `--secondary`, ...).
- **Tipografía:** Poppins (headings) + Carlito (body), cargadas por Google Fonts.
- **Modo dominante:** fondo blanco en secciones de contenido; navy como color de "pausa"/énfasis en secciones alternas (hero, CTA final, bloques bento).

## Metodología CIRA (contenido central del sitio)

| Fase | Pregunta | Servicio | Acelerador de IA |
|---|---|---|---|
| **C**onstruir | ¿Hacia dónde vamos? | Strategy / CTO·CIO as a Service | Diagnóstico y análisis de datos |
| **I**dentificar | ¿Con qué lo logramos? | Select | Evaluación de proveedores en paralelo |
| **R**ealizar | ¿Cómo lo ejecutamos? | Project Management / PMO externo | Monitoreo de riesgo en tiempo real |
| **A**doptar | ¿Cómo hacemos que se quede? | Change Management | Medición continua de adopción |

Cyrrus Intelligence Lab (gobierno/arquitectura de IA) y Leadership Academy (talleres ejecutivos) son las dos capas que sostienen el ciclo, no servicios sueltos — así están redactadas todas las páginas.

## Componentes destacados

- **`hero-section-4.tsx` + `transparent-header.tsx`** — Hero de Home (foto full-bleed, sin nav propia) + header transparente superpuesto para no perder la navegación.
- **`tabbed-panels.tsx` + `hero-services-tabs.tsx`** — Los 3 servicios pilar como pestañas justo debajo del Hero. Los 3 paneles están **siempre en el DOM** (toggle por CSS, no por montado/desmontado) para que el contenido y los enlaces internos sean rastreables por buscadores, siguiendo la recomendación de evitar carruseles que descartan HTML.
- **`bento-features.tsx`** — Grid bento con fondo de espiral SVG animada (navy + resplandor cyan); reutilizado en "Cómo trabajamos" y en "Experiencia".
- **`cobe-globe-pulse.tsx` + `cyrrus-globe.tsx`** — Globo 3D interactivo (WebGL, arrastrable) con marcadores en los 10 países/regiones donde opera Cyrrus.
- **`cira-journey.tsx`** — Las 4 fases de CIRA en Home como grid estático (ya no es el stepper con autoplay de versiones anteriores; ese componente, `feature-section.tsx`, se eliminó al simplificar la sección).
- **`about-3.tsx` + `cyrrus-about.tsx`** — Sección "Cómo trabajamos": foto única (`singleImage`, modo alternativo al grid original de 3 imágenes), tarjetas de los 3 niveles del modelo, y carrusel de logos.
- **`blog7.tsx` + `perspectivas-preview.tsx`** — Grid de artículos, reutilizado en `/perspectivas` y como preview en Home (mismos datos, `lib/perspectivas-topics.ts`).
- **`logo-carousel.tsx`** — Marquee infinito en CSS puro con fade en los bordes vía overlays de gradiente (no `mask-image`, que no se renderizaba de forma consistente).
- **`reveal.tsx`** — Wrapper de scroll-reveal (`whileInView`) usado en casi todas las secciones para consistencia de motion.
- **`contact-wizard/contact-wizard-modal.tsx`** — Modal de contacto multi-paso (elección de intención → datos → confirmación con CTA de "Agendar llamada") que reemplazó a la antigua página `/contacto`; se abre desde cualquier CTA vía `useContactWizard()` (`lib/contact-wizard-context.tsx`), con sus pasos/copy definidos como datos en `lib/contact-wizard-config.ts`.
- **`cookie-consent.tsx`** — Banner de cookies no bloqueante, montado una vez en `App.tsx`; se excluye del prerender (`isPrerender()`) porque su estado de visibilidad depende de `localStorage`.

## SEO

- **H1 único por página, keyword-first.** El tagline de marca original de cada página se conservó como subtítulo/eyebrow, no se perdió, solo se reordenó.
- **`usePageMeta`** (`lib/use-page-meta.ts`): hook que setea `<title>`, meta description, canonical, `hreflang` (ES/EN, vía `alternatePath`) y opcionalmente JSON-LD (`Service`, `BreadcrumbList`, `FAQPage`, etc.) por página, limpiando al desmontar.
- **JSON-LD sitewide** (`ProfessionalService`) en `index.html`, además de Open Graph y canonical; la mayoría de páginas internas añaden además su propio `BreadcrumbList` y, donde aplica, `FAQPage`.
- **`public/sitemap.xml`** y **`public/robots.txt`** — el sitemap **ya no se edita a mano**: `npm run build` lo regenera (`scripts/generate-sitemap.mjs`) a partir de `lib/route-meta.json`, y su `lastmod` avanza solo cuando el contenido real de esa ruta cambió (hash guardado en `lib/sitemap-content-hashes.json`), no en cada build.
- **`SEO.md`** — bitácora del audit de SEO del sitio (hallazgos, prioridades, fixes aplicados); referencia más detallada que este README para ese tema.
- **Mapa de keywords por página** (resumen; el detalle completo vive en el copy de cada `PageHero`/`PhaseSection`):
  - Home → consultoría estratégica, transformación digital, inteligencia artificial
  - Método CIRA → consultoría de planeación estratégica, CTO/CIO as a Service, selección de ERP, PMO externo, gestión del cambio
  - Intelligence Lab → gobierno de IA corporativo, arquitectura de IA empresarial
  - Leadership Academy → talleres para altos ejecutivos, capacitación gerencial, ISO 27001, DRP
  - Experiencia → consultoría multinacional LATAM, por industria

## Placeholders pendientes de contenido real

La mayoría de los placeholders originales ya se resolvieron; lo que queda pendiente hoy:

- Equipo en `/experiencia` — solo 2 de los perfiles tienen nombre y rol reales (Jackson Bohorquez, CEO & Fundador; Daniel Bohorquez, Director de Cyrrus Intelligence Lab); el resto sigue con el texto `photoNamePending` ("Foto y nombre pendientes").
- Contenido editorial real de `/perspectivas` — ya no son 3 temas: `lib/perspectivas-topics.ts` tiene un calendario de 14 artículos (con fecha estimada de publicación de septiembre 2026 a marzo 2027), pero todos siguen siendo *preview* — ninguno es todavía un artículo publicado con su propia URL.
- Talleres de `/leadership-academy` — los 7 están marcados `comingSoon: true` en `lib/nav-config.ts`; solo tienen página de detalle (`CursoDetalle.tsx`), no fecha ni inscripción real.
- El dominio de producción `www.cyrruscs.com` aún no está conectado en Vercel (ver [Despliegue](#despliegue)) — hoy sirve un sitio legado distinto, por eso `usePageMeta` arma las imágenes de Open Graph contra el dominio `.vercel.app`.

Ya resueltos (documentados antes como pendientes, verificados en el código actual): logos de Cyrrus y de clientes, fotografía propia de `decoracion/` (ya no son stock de Unsplash), testimonios (ahora con nombre real + video de YouTube embebido, no roles genéricos), y el contacto (ya no es un email/enlace de agenda provisional, es el `ContactWizardModal` completo).

## Próximos pasos sugeridos (de la conversación con el cliente)

Del plan original, ya resuelto: las 4 fases de Método CIRA tienen ruta propia (`/metodo-cira/planeacion-estrategica`, `/seleccion-de-soluciones`, `/gestion-de-proyectos`, `/gestion-del-cambio`) y los assets reales (logos, fotos) ya están cargados. Pendiente:

1. Páginas por industria (`/industrias/[sector]`) — no existen todavía en `App.tsx`.
2. Publicar los artículos reales de Perspectivas — el calendario ya está definido (`lib/perspectivas-topics.ts`), falta el contenido y la página de detalle por artículo.
3. Completar el equipo real en `/experiencia` (nombres/fotos de los perfiles con `photoNamePending`).
4. Conectar el dominio `www.cyrruscs.com` en Vercel.
