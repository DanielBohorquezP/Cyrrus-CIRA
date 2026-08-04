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
| Animación | `framer-motion` |
| Globo 3D | `cobe` (WebGL) |
| Iconos | `lucide-react` |

Sin SSR/SSG — es un SPA client-side rendered. El SEO on-page se compensa con `sitemap.xml`, `robots.txt`, JSON-LD estático (`index.html`) y JSON-LD dinámico por página (`usePageMeta`).

## Cómo correr el proyecto

```bash
npm install
npm run dev      # servidor de desarrollo (Vite)
npm run build    # type-check (tsc -b) + build de producción
npm run preview  # sirve el build de producción localmente
```

## Estructura de carpetas

```
public/
  assets/
    logos-cyrrus/     → logos propios (pendiente de cargar el archivo real)
    logos-clientes/    → logos de clientes (pendiente)
    decoracion/         → fotografía propia (hoy se usan placeholders de Unsplash)
  robots.txt
  sitemap.xml

src/
  components/
    ui/         → primitivas shadcn + bloques de terceros adaptados a TS/Cyrrus
    layout/     → header, hero de página interna, scroll-to-top
    sections/   → bloques de contenido compuestos con copy real de Cyrrus
  lib/          → utilidades (cn, usePageMeta, datos compartidos)
  pages/        → una página por ruta
  App.tsx       → definición de rutas
```

**Convención del proyecto:** `components/ui` contiene componentes "genéricos" (reutilizables, sin copy hardcodeado de Cyrrus cuando es posible); `components/sections` contiene los wrappers que les inyectan el contenido real y los ensamblan en las páginas.

## Rutas / páginas

| Ruta | Archivo | Rol |
|---|---|---|
| `/` | `pages/Home.tsx` | Hero + tabs de servicios + prueba de confianza + método + experiencia + preview editorial |
| `/metodo-cira` | `pages/MetodoCira.tsx` | Las 4 fases de CIRA, cada una con ancla propia (`#construir`, `#identificar`, `#realizar`, `#adoptar`) |
| `/intelligence-lab` | `pages/IntelligenceLab.tsx` | Gobierno y arquitectura de IA (capa transversal a CIRA) |
| `/leadership-academy` | `pages/LeadershipAcademy.tsx` | Los 7 talleres ejecutivos |
| `/experiencia` | `pages/Experiencia.tsx` | Países, industrias, equipo, logos de clientes |
| `/perspectivas` | `pages/Perspectivas.tsx` | Espacio editorial (blog); temas en `lib/perspectivas-topics.ts` |
| `/contacto` | `pages/Contacto.tsx` | Invitación consultiva (sin formulario frío) |

`App.tsx` monta `<ScrollToTop />` para resetear scroll (o saltar a un ancla `#hash`) en cada cambio de ruta.

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
- **`feature-section.tsx` + `cira-journey.tsx`** — Stepper con autoplay de las 4 fases de CIRA; el título de la sección es una función `(currentFeature, progress) => ReactNode` que renderiza un kicker + barra de progreso de 4 segmentos sincronizada con el avance real (no decorativa).
- **`about-3.tsx` + `cyrrus-about.tsx`** — Sección "Cómo trabajamos": foto única (`singleImage`, modo alternativo al grid original de 3 imágenes), tarjetas de los 3 niveles del modelo, y carrusel de logos.
- **`blog7.tsx` + `perspectivas-preview.tsx`** — Grid de artículos, reutilizado en `/perspectivas` y como preview en Home (mismos datos, `lib/perspectivas-topics.ts`).
- **`logo-carousel.tsx`** — Marquee infinito en CSS puro con fade en los bordes vía overlays de gradiente (no `mask-image`, que no se renderizaba de forma consistente).
- **`reveal.tsx`** — Wrapper de scroll-reveal (`whileInView`) usado en casi todas las secciones para consistencia de motion.

## SEO

- **H1 único por página, keyword-first.** El tagline de marca original de cada página se conservó como subtítulo/eyebrow, no se perdió, solo se reordenó.
- **`usePageMeta`** (`lib/use-page-meta.ts`): hook que setea `<title>`, meta description y opcionalmente JSON-LD (`Service`) por página, limpiando al desmontar.
- **JSON-LD sitewide** (`ProfessionalService`) en `index.html`, además de Open Graph y canonical.
- **`public/sitemap.xml`** y **`public/robots.txt`** — el sitemap se debe actualizar a mano cuando se agreguen artículos reales a Perspectivas.
- **Mapa de keywords por página** (resumen; el detalle completo vive en el copy de cada `PageHero`/`PhaseSection`):
  - Home → consultoría estratégica, transformación digital, inteligencia artificial
  - Método CIRA → consultoría de planeación estratégica, CTO/CIO as a Service, selección de ERP, PMO externo, gestión del cambio
  - Intelligence Lab → gobierno de IA corporativo, arquitectura de IA empresarial
  - Leadership Academy → talleres para altos ejecutivos, capacitación gerencial, ISO 27001, DRP
  - Experiencia → consultoría multinacional LATAM, por industria

## Placeholders pendientes de contenido real

Marcados explícitamente en el propio sitio (no ocultos):

- `public/assets/logos-cyrrus/` — logo de Cyrrus (el `<img>` ya apunta ahí).
- `public/assets/logos-clientes/` — logos de clientes (carrusel y grids ya armados).
- `public/assets/decoracion/` — fotografía propia (hoy se usan fotos de stock de Unsplash).
- Equipo en `/experiencia` — nombres y fotos reales (hoy solo roles).
- Testimonios — atribuidos a roles/sector genéricos, no a personas reales.
- Email/enlace de agenda en `/contacto` — provisional.
- Contenido editorial real de `/perspectivas` — hoy son 3 temas "próximamente".

## Próximos pasos sugeridos (de la conversación con el cliente)

1. Separar las 4 fases de Método CIRA en rutas propias (`/metodo-cira/construir`, etc.) para no competir por keyword dentro de una sola URL.
2. Páginas por industria (`/industrias/[sector]`).
3. Calendario editorial real de Perspectivas.
4. Cargar assets reales (logos, fotos, equipo) reemplazando los placeholders.
