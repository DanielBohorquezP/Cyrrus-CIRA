# Plan de mejora del sitio cyrruscs.com

> **Documento maestro.** Define *qué* hay que hacer y *por qué*. El estado de cada
> tarea (hecha / en curso / bloqueada) **no** se marca aquí: vive en
> [`PROGRESO.md`](./PROGRESO.md). Este archivo solo se edita si cambia el alcance
> o una decisión.
>
> Origen: auditoría completa del 2026-09-17 (UX, salud técnica, contenido,
> posicionamiento frente a grandes consultoras).

---

## 0. Objetivo

Que cualquier persona que entre por primera vez entienda en 10 segundos:
1. **Qué hace Cyrrus** (servicios con nombres simples),
2. **Qué problema le resuelve** (el dolor, en palabras del cliente),
3. **Por qué creerle** (casos, cifras, equipo, independencia),
4. **Qué hacer ahora** (un CTA claro),

y que el sitio **se posicione en Google y en motores de IA** para los nichos donde
Cyrrus puede ganar, construyendo autoridad para competir más arriba con el tiempo.

### Posicionamiento (decisión estratégica)

- **No** competir de frente con EY/Deloitte/Accenture en términos genéricos
  ("consultoría estratégica", "transformación digital"). Se pierde por autoridad.
- **Sí** ser la referencia en nichos concretos, con el ángulo que las Big Four no
  pueden ofrecer: **independencia de proveedor** (ellas son partners de
  SAP/Oracle/Microsoft y además implementan lo que recomiendan).
- Nichos prioritarios (en este orden):
  1. Selección de ERP / software empresarial independiente (Colombia → LATAM)
  2. PMO externo / gerencia de proyectos de implementación
  3. Gestión del cambio en implementaciones de ERP y tecnología
  4. Gobierno de IA y adopción de IA para empresas
  5. Capacitación ejecutiva (Leadership Academy): IA para directivos, ISO 27001, DRP

### Decisiones ya tomadas

| # | Decisión | Motivo |
|---|---|---|
| D1 | **Se mantiene el Método CIRA**, pero como el *cómo*, no como la puerta de entrada. La navegación se organiza por **servicios**. | CIRA diferencia y es citable por IA; nadie lo busca en Google. |
| D2 | **No se cambian las URLs `/metodo-cira/...` por ahora.** Se reevalúa en Fase 9. | El sitio acaba de migrar; otro cambio de URLs suma redirecciones mientras Google aún asienta las actuales. El slug pesa poco. |
| D3 | Todo el sitio en **"usted"**. | Consistencia y tono B2B ejecutivo. |
| D4 | Toda cifra publicada debe tener **fuente o caso que la respalde**; si no, se quita. | Un comprador corporativo detecta cifras contradictorias y pierde confianza. |
| D5 | Presencia Digital (desarrollo web/SEO) **sale de las páginas de consultoría** (ver tarea 1.5 para su destino final). | Diluye el posicionamiento de consultora estratégica. |

---

## Reglas de trabajo en cada tarea (obligatorias)

Antes de tocar código, leer `CLAUDE.md` en la raíz. Resumen de lo que más se rompe:

- **Hidratación:** nada de texto adyacente en JSX (`{a} · {b}` → un solo string),
  nada de shorthands CSS ni colores hex en `style` inline, contenido diferido
  debe usar `isPrerender()` / `<ClientOnly>`, rutas lazy nuevas van en `PAGES`
  (`src/App.tsx`) **y** en `src/lib/route-meta.json` (sitemap + prerender).
- **Imágenes** siempre con `<Img>` y un `sizes` real; tras agregar fotos,
  `npm run images` y commitear original + `opt/`.
- **Secciones navy** con `AnimatedNavyBackground`.
- **Animaciones**: nunca `transition-all`, 150–200ms, solo `opacity`/`transform`.
- **Bilingüe:** todo cambio de copy va en `src/i18n/locales/es/*.json` **y**
  `src/i18n/locales/en/*.json`.
- **Verificación de cada tarea:**
  ```bash
  npm run build && node scripts/serve-dist.mjs
  ```
  Cargar las rutas afectadas (ES y EN) y confirmar consola limpia (sin error
  React #418 / "Hydration failed"). Para cambios de rendimiento:
  `node scripts/lh.mjs --route /ruta`.
- Al terminar: actualizar `PROGRESO.md` (estado + bitácora de sesión).

---

## FASE 0 — Arreglos urgentes (técnicos y de credibilidad)

Impacto alto, esfuerzo bajo. Hacer primero.

### 0.1 Inicio muestra artículos que no existen
- **Problema:** `src/components/sections/perspectivas-preview.tsx` usa
  `upcomingTopics` (temas *programados*, con `url: "/perspectivas"`), no los 3
  artículos publicados de `src/lib/blog-data.ts`.
- **Hacer:** alimentar el preview con `blogPosts` (título/resumen desde el
  namespace i18n `blog`, `href` a `/perspectivas/<slug>`, fecha real). Si hay
  menos de 4 publicados, mostrar solo los publicados (3), nunca programados.
- **Hecho cuando:** los 4 H2 falsos desaparecen del Inicio; cada tarjeta abre un
  artículo real en ES y EN.

### 0.2 H1 del Inicio sin espacios en el HTML
- **Problema:** `src/components/ui/shader-hero.tsx` (~línea 258–275) renderiza 3
  `<span className="block">` sin espacio; el HTML queda
  "ConsultoríaEstratégicaque llega hasta la ejecución".
- **Hacer:** que el texto del H1 tenga espacios reales entre partes (p. ej.
  espacio al final de cada span dentro del mismo string, respetando la regla de
  no-texto-adyacente de hidratación).
- **Hecho cuando:** `curl -s https://cyrruscs.com/ | grep -o "<h1.*</h1>"` sin
  tags da "Consultoría Estratégica que llega hasta la ejecución".

### 0.3 Redirección automática a inglés en "/" (riesgo SEO alto)
- **Problema:** `src/lib/initial-language.ts` reescribe `/` → `/en` si el navegador
  no está en español. Googlebot renderiza como en-US → puede ver la versión
  inglesa de la página más importante. Lighthouse reportó conflicto de canonical
  en el Inicio. Google desaconseja redirecciones automáticas por idioma.
- **Hacer:** eliminar la redirección. Opcional: aviso no intrusivo "View this
  site in English" para navegadores no-ES (excluido de prerender con
  `isPrerender()`, que no cause CLS). Revisar los comentarios relacionados en
  `src/main.tsx` y `src/lib/language.tsx`.
- **Hecho cuando:** Lighthouse en `/` no redirige a `/en` y la auditoría
  `canonical` pasa.

### 0.4 URLs del sitio viejo indexadas y dando 404
- **Problema:** Google aún muestra el sitio anterior (WordPress, "Cyrrus ECS").
  Confirmadas en 404: `/strategy/`, `/project-management/`, `/products/bot/`,
  `/products/dms/`, `/en/contact-page/`, `/en/products/control/`,
  `/en/products/tactical/`. Se pierde la autoridad acumulada y el usuario cae en error.
- **Hacer:**
  1. Obtener la lista completa: Search Console → Indexación → Páginas →
     "No encontrado (404)" + búsqueda `site:cyrruscs.com`. (Si no hay acceso,
     pedirlo al cliente — ver Bloqueos en PROGRESO.)
  2. Mapear en `public/.htaccess` con `RewriteRule ... [R=301,L]` **antes** de la
     regla que quita el slash final. Mapa inicial sugerido:

     | URL vieja | Destino |
     |---|---|
     | `/strategy/` | `/metodo-cira/estrategia` |
     | `/project-management/` | `/metodo-cira/gestion-de-proyectos` |
     | `/products/bot/`, `/en/products/bot/` | `/intelligence-lab/automatizaciones-desarrollo` (EN: `/en/...`) |
     | `/products/dms/`, `/products/control/`, `/products/tactical/` (+ `/en/`) | `/intelligence-lab` (o la página más cercana) |
     | `/contact-page/`, `/en/contact-page/` | `/` y `/en` |
     | cualquier otra sin equivalente | la sección padre más cercana, **nunca** todo al Inicio en bloque |
  3. Reenviar `sitemap.xml` en Search Console y solicitar indexación del Inicio y
     páginas de servicio.
- **Hecho cuando:** cada URL vieja conocida responde 301 → 200.

### 0.5 `llms.txt` con URL vieja
- `public/llms.txt` enlaza `/metodo-cira/planeacion-estrategica` (ES y EN) →
  cambiar a `/metodo-cira/estrategia`. Añadir los 3 artículos publicados y
  Leadership Academy cuando se relance (Fase 3).

### 0.6 Cifras contradictorias
- **Problema:** "+17 países" (home, metodo-cira, paginas) vs 10 países listados en
  `home.json` → `experience.countries` vs 15 en el JSON-LD de `index.html`.
  Industrias distintas entre `home.json` y `paginas.json`. "60% diagnóstico más
  rápido con IA" sin fuente (`estrategia.json`, `metodo-cira.json`,
  `paginas.json`).
- **Hacer:** confirmar con el cliente el número real de países y la lista real de
  industrias; usar **una sola fuente de datos** (idealmente un archivo en
  `src/lib/` que alimente home, experiencia y JSON-LD). Quitar el 60% o
  respaldarlo con un caso.
- **Hecho cuando:** `grep -rn "17 países\|+17\|60%" src/i18n` muestra solo cifras
  confirmadas y consistentes.

### 0.7 Tuteo → usted
- Casos detectados: `metodo-cira.json` y `route-meta.json` ("Conoce la
  metodología"), `contact-wizard.json` ("tu empresa", "escríbenos"), página de
  ERP ("También te ayudamos a seleccionar" — buscar en
  `seleccion-productos.json`/`seleccion-de-software.json`).
- **Hacer:** `grep -rniE "\b(te |tu |tus |conoce |escríbenos|contáctanos)" src/i18n/locales/es src/lib`
  y corregir todo excepto citas textuales de artículos.

### 0.8 Accesibilidad (Método CIRA 89/100)
- Lighthouse: `[role]` sin padre requerido, `<dd>/<dt>` fuera de `<dl>`, objetivos
  táctiles pequeños (también en Leadership Academy).
- **Hecho cuando:** Accesibilidad ≥ 95 en `/metodo-cira` y `/leadership-academy`.

### 0.9 Higiene del repositorio
- `cyrruscs-dist/` (build) está versionado y hay un `cyrrus-dist.zip` sin trackear.
  Confirmar con el dueño si se usan para deploy; si no, sacarlos del repo y
  añadirlos a `.gitignore`.

---

## FASE 1 — Arquitectura y navegación orientada a servicios

Objetivo: que el visitante vea **qué vendemos** antes de aprender vocabulario propio.

### 1.1 Menú por servicios
- `src/lib/nav-config.ts` + `src/i18n/locales/*/common.json`.
- Menú propuesto:
  - **Servicios** → Estrategia empresarial · Selección de tecnología (ERP/CRM/HCM/EAM,
    Tecnologías avanzadas, Infraestructura) · Gerencia de proyectos (PMO) ·
    Gestión del cambio · Inteligencia artificial (Gobierno, Arquitectura,
    Automatización)
  - **Capacitación ejecutiva** (Leadership Academy)
  - **Casos** (nueva, Fase 2)
  - **Nosotros** (Quiénes somos + Metodología CIRA + Equipo)
  - **Perspectivas** (blog)
  - CTA: "Agendar conversación"
- Los nombres "Construir/Identificar/Realizar/Adoptar" **no** aparecen en el menú.
- Las URLs no cambian (D2).

### 1.2 Reordenar el Inicio (`src/pages/Home.tsx`)
Orden propuesto (qué → por qué creer → cómo → prueba → acción):
1. Hero: titular + subtítulo con el **dolor** + 2 CTAs (mantener)
2. **Servicios** (tabs o grid: 5 servicios + Academy), cada uno con dolor en una
   línea y enlace
3. Barra de confianza: cifras confirmadas + logos
4. **Casos destacados** (2–3 tarjetas con resultado numérico) — Fase 2
5. Por qué Cyrrus (independencia, un solo responsable, IA dentro del método)
6. Cómo trabajamos: CIRA en 4 pasos (resumido)
7. Testimonios en video
8. Cita del CEO (baja; hoy está arriba)
9. Perspectivas (artículos reales)
10. CTA final + footer
- Reducir la repetición de "conectar la decisión con la ejecución" (hoy ~6 veces):
  queda en hero **o** CTA final, no en ambos, y variar el CTA final por página.
- Quitar el tab "Presencia Digital" de `home.json → servicesTabs` (D5).

### 1.3 Plantilla única de página de servicio
Todas las páginas de servicio siguen el mismo esqueleto (ver Fase 4 para contenido):
1. H1 con keyword del servicio + subtítulo con el dolor
2. "¿Le pasa esto?" — 3–5 síntomas en palabras del cliente
3. Qué hacemos / entregables concretos
4. Cómo lo hacemos (fase CIRA correspondiente, con enlace a `/metodo-cira`)
5. Caso real relacionado (Fase 2)
6. FAQ (con `FAQPage` JSON-LD)
7. Servicios relacionados (enlazado interno)
8. CTA específico del servicio

### 1.4 CIRA como página de metodología
- `/metodo-cira` se reescribe como "Nuestra metodología" (explica el cómo, enlaza
  a cada servicio). Enlazada desde Nosotros y desde cada servicio.

### 1.5 Destino de Presencia Digital
- Quitar la sección "Una estrategia sólida no sirve de nada si nadie la
  encuentra / Presencia Digital: dónde lo encuentran" de
  `src/pages/metodo-cira/PlaneacionEstrategica.tsx` (~línea 387) y su copy en
  `estrategia.json`.
- Quitar del footer (`src/components/sections/footer.tsx`).
- **Decisión pendiente del cliente:** (a) mantener las páginas pero `noindex` y
  fuera del sitemap, (b) eliminarlas con 301 a `/`, o (c) mantenerlas como
  servicio secundario solo accesible desde el footer. Recomendado: (a) o (b).

### 1.6 Breadcrumbs visibles
- Ya existe `BreadcrumbList` en JSON-LD en varias páginas; mostrarlo también en la
  UI de páginas internas de 2+ niveles.

---

## FASE 2 — Prueba y confianza (E-E-A-T)

La mayor brecha frente a una gran consultora. **Requiere insumos del cliente.**

### 2.1 Casos de éxito escritos
- Nueva sección `/casos` + `/casos/:slug` (añadir a `PAGES` y `route-meta.json`).
- Mínimo 3 casos al inicio. Candidatos con material existente:
  - **3 Castillos** (ERP + gestión del cambio; ya hay 2 videos: `7czOH9eH6lw`, `C8aDacFpwBY`)
  - **Morelco** (trabajo remoto en pandemia; video `2oWuE5RFskI`)
  - El proyecto de los logros en `gestion-proyectos.json → achievements`
    ("3% de desviación en costos", "2 customizaciones al ERP") — hoy anónimo.
- Estructura de cada caso: cliente + industria + país · reto · por qué Cyrrus ·
  qué se hizo (fases CIRA) · resultados **con números** · cita/video · servicios
  relacionados.
- Schema: `Article` + `Review`/cita; enlazar desde cada página de servicio.
- Pedir autorización escrita al cliente para nombrarlo.

### 2.2 Equipo visible
- Reemplazar la sección de 2 perfiles en `/experiencia` por una página o sección
  de equipo real: foto, cargo, años de experiencia, certificaciones (PMP, ITIL,
  ISO 27001 LA, Prosci, etc.), LinkedIn. Incluir consultores asociados si aplica.
- Schema `Person` por miembro, vinculado a `Organization`.

### 2.3 Quiénes Somos
- Hoy ~240 palabras centradas solo en el CEO. Añadir: año de fundación, historia
  (del sitio viejo "Cyrrus ECS" al modelo actual), número de proyectos, oficinas
  (Barranquilla, Bogotá), valores, alianzas académicas, equipo.
- Trayectoria del CEO con hechos verificables (empresas, cargos, años,
  certificaciones), no solo "dos décadas".

### 2.4 Política de independencia
- Página corta (p. ej. `/independencia` o sección en Nosotros): no recibimos
  comisiones de proveedores, cómo evaluamos, cómo manejamos conflictos de interés.
  Es el diferenciador frente a las Big Four: tiene que ser verificable.
- Revisar que no contradiga productos propios del pasado (CyBOT, CyControl…).

### 2.5 Página Experiencia
- Hoy ~180 palabras y promete "casos de éxito" sin mostrarlos. Convertirla en hub:
  países (cifra confirmada), industrias (con enlace a casos por industria),
  galería, logos, enlace a `/casos`.

---

## FASE 3 — Relanzamiento de Leadership Academy

Es lo nuevo y hoy es la página más débil: 7 talleres "Próximamente" con botón
"Agendar un taller", ~115 palabras cada uno, todos `noindex` y fuera del sitemap.

### 3.1 Ficha completa por taller (`workshops-data.ts` + `leadership-academy.json`)
Campos nuevos: público objetivo · problema que resuelve · objetivos de aprendizaje
· agenda/módulos · duración (horas) · modalidad (presencial / virtual / in-company)
· ciudad · facilitador (con foto y credenciales) · próximas fechas · cupo · precio o
"cotizar in-company" · certificado · FAQ. Meta: 600–1.000 palabras por taller.

### 3.2 Coherencia del hub
- Reescribir el hero: hoy habla de "modelo de gobierno de IA" pero la oferta
  incluye ISO 27001 y DRP. Propuesta: formación ejecutiva para que el equipo
  directivo decida y sostenga la transformación (IA, seguridad, continuidad,
  cambio, datos).
- Agrupar talleres por tema (IA y datos · Seguridad y continuidad · Liderazgo y cambio).
- CTA coherente: si no hay fechas, "Solicitar taller in-company" / "Avisarme de la
  próxima fecha"; nunca "Agendar" sobre algo "Próximamente".

### 3.3 Indexación
- Cuando un taller tenga ficha completa: `comingSoon: false` en
  `src/lib/workshops-data.ts` **y** `src/lib/nav-config.ts`, añadir la ruta a
  `route-meta.json` (sitemap), `Course` JSON-LD (ya existe en `CursoDetalle.tsx`)
  + `CourseInstance`/`Event` si hay fechas.
- Keywords: "taller de IA para directivos", "capacitación ISO 27001 para
  empresas", "curso continuidad de negocio DRP", "gestión del cambio para
  líderes", "formación ejecutiva Colombia/Bogotá/Barranquilla".

### 3.4 Captura de interesados
- Formulario de interés por taller (puede ser un paso del ContactWizard con el
  taller preseleccionado) + evento de analítica.

---

## FASE 4 — Profundidad del contenido de servicios

Aplicar la plantilla 1.3. Longitud orientativa: 1.000–1.800 palabras útiles.

| Página | Estado actual (palabras aprox.) | Keyword principal | Secundarias |
|---|---|---|---|
| `/metodo-cira/estrategia` | ~1.490 | consultoría estratégica empresarial Colombia | planeación estratégica, CTO/CIO as a Service |
| `/metodo-cira/seleccion-de-soluciones` | ~845 | selección de tecnología empresarial | consultoría independiente de software |
| `.../seleccion-de-software` | — | selección de software empresarial | evaluación de software |
| `.../seleccion-de-software/erp` | ~955 | consultoría selección de ERP | cómo elegir un ERP, ERP Colombia |
| `.../crm`, `/hcm`, `/eam` | — | selección de CRM / HCM / EAM | — |
| `.../tecnologias-avanzadas` | — | selección de soluciones de IA y automatización | — |
| `.../infraestructura-tecnologica` | — | consultoría ciberseguridad y nube | — |
| `/metodo-cira/gestion-de-proyectos` | ~820 | PMO externo | gerencia de proyectos ERP, PMO as a Service |
| `/metodo-cira/gestion-del-cambio` | ~710 | gestión del cambio organizacional | adopción de ERP, change management |
| `/intelligence-lab` | ~510 | consultoría en inteligencia artificial para empresas | IA empresarial Colombia |
| `/intelligence-lab/gobierno-de-ia` | ~420 | gobierno de IA | política de IA empresa, ISO 42001 |
| `/intelligence-lab/arquitectura-de-ia` | — | arquitectura de IA empresarial | — |
| `/intelligence-lab/automatizaciones-desarrollo` | — | automatización con agentes de IA | — |

Para cada página:
- Validar la keyword con datos (Search Console / Keyword Planner / Ahrefs si se
  autoriza) antes de reescribir.
- Añadir: síntomas, entregables concretos, duración típica, cómo se mide el
  éxito, caso relacionado, FAQ ampliada, enlaces a 2–3 servicios y 2–3 artículos.
- Título ≤ 60 caracteres, meta description ≤ 155, keyword en H1 y primer párrafo.
- Mantener `route-meta.json` sincronizado con lo que realmente emite
  `usePageMeta` (hoy difieren en varias rutas, p. ej. `/` y `/metodo-cira`).

---

## FASE 5 — Motor de contenido (Perspectivas)

- Calendario ya definido en `src/lib/perspectivas-topics.ts` (11 temas de oct-2026
  a mar-2027) y `Plan_Editorial_Perspectivas.xlsx`. Ritmo mínimo: **2 artículos
  al mes**, sostenido 12 meses.
- Cada artículo pertenece a un **cluster** y enlaza a su página de servicio
  (pilar) y viceversa:
  - ERP/software → `/seleccion-de-software/erp`
  - Proyectos/PMO → `/gestion-de-proyectos`
  - Cambio → `/gestion-del-cambio`
  - IA → `/intelligence-lab/*`
  - Estrategia → `/metodo-cira/estrategia`
  - Capacitación → `/leadership-academy/*`
- Autor real con bio y foto (hoy "Equipo Cyrrus" en los temas programados) →
  `Person` schema, página de autor.
- Formato orientado a respuesta: definición en las primeras 2–3 líneas, listas,
  tablas comparativas, FAQ; esto aumenta las citas en Google AI Overviews,
  ChatGPT y Perplexity.
- **Un activo de datos propios por semestre** (p. ej. "Estado de la adopción de
  IA en empresas del Caribe colombiano 2027", encuesta a clientes/asistentes a
  foros). Es lo que más enlaces y citas genera.
- Publicar cada artículo también en LinkedIn (empresa + CEO) con enlace.
- Al publicar: añadir a `blog-data.ts`, i18n `blog`, `route-meta.json`, `llms.txt`.

---

## FASE 6 — Autoridad externa y presencia local

- **Google Search Console** y **Bing Webmaster Tools**: verificar propiedad,
  enviar sitemap, revisar cobertura semanalmente las primeras 8 semanas.
- **Perfil de Empresa de Google** (Barranquilla y Bogotá): categorías, servicios,
  fotos, reseñas de clientes. El enlace `share.google/...` ya está en `sameAs`.
- **Enlaces desde otros sitios (backlinks):**
  - Universidades y foros donde ya participan (Universidad Simón Bolívar, Foro
    Caribe 2030, eventos en fotos de `decoracion/`): pedir enlace en la reseña
    del evento/perfil de ponente.
  - Gremios y cámaras (Cámara de Comercio de Barranquilla/Bogotá, ANDI, Fedesoft).
  - Directorios B2B: Clutch, GoodFirms, Sortlist, directorios de consultoría LATAM.
  - Prensa regional/sectorial con el estudio de datos propio (Fase 5).
  - Columnas invitadas del CEO en medios de negocios.
- **LinkedIn:** página de empresa y perfil del CEO coherentes con el sitio
  (mismo mensaje, mismos servicios), publicación semanal.
- Consistencia NAP (nombre, dirección, teléfono) idéntica en todas partes.

---

## FASE 7 — Medición y conversión

- GA4 (ya cargado tras consentimiento, `src/lib/analytics.ts`): eventos para
  apertura del ContactWizard, cada paso, envío, clic en "Agendar llamada",
  reproducción de video, clic en taller, lectura de artículo (scroll 75%).
- Definir conversión principal (envío del wizard) y secundarias.
- Tablero mensual (hoja o Looker Studio) con los KPIs de la sección 8.
- Revisar el wizard: número de pasos, campos obligatorios, mensaje de
  confirmación, tiempo de respuesta prometido.

---

## FASE 8 — Rendimiento fino

Hoy está bien (Lighthouse móvil en vivo: Inicio 87, Método CIRA 93, Academy 94;
CLS ≈ 0; TBT 100–180 ms). Meta: **LCP < 2,5 s en móvil** (hoy 2,6–2,8 s).
- Revisar el LCP del hero del Inicio (`ShaderHero`): preload de la imagen/fondo
  LCP, `fetchpriority="high"`, evitar que el shader retrase el primer pintado.
- Revisar cabeceras de caché en el servidor (nginx): assets con hash → `Cache-Control: immutable`.
- Añadir cabeceras de seguridad básicas (HSTS, X-Content-Type-Options) si el hosting lo permite.
- Medir tras cada fase grande: `node scripts/lh.mjs --route /ruta` y PageSpeed Insights.

---

## FASE 9 — Revisión posterior (a los 3–6 meses)

- Reevaluar D2 (URLs `/servicios/...`) con datos de Search Console. Solo migrar
  si las URLs actuales ya están indexadas y con un mapa 301 completo.
- Páginas por industria (`/industrias/:sector`) cuando haya ≥ 2 casos por industria.
- Páginas por ciudad (Bogotá, Barranquilla, Medellín) solo si hay presencia real.

---

## 8. KPIs y metas

| KPI | Línea base (sep-2026) | Meta 3 meses | Meta 12 meses |
|---|---|---|---|
| Páginas indexadas (Search Console) | desconocido; Google aún muestra el sitio viejo | 100% de URLs del sitemap | 100% + casos, talleres, 25+ artículos |
| URLs viejas en 404 | ≥ 7 confirmadas | 0 | 0 |
| Clics orgánicos/mes | medir | +100% sobre base | ×5 sobre base |
| Keywords nicho en top 10 (ERP, PMO, gobierno IA, talleres) | medir | 5 | 25 |
| Artículos publicados | 3 | 9 | 27 |
| Casos de éxito publicados | 0 | 3 | 8 |
| Talleres indexados | 0 de 7 | 3 | 7 |
| Leads del wizard/mes | medir | definir tras 1 mes de datos | — |
| Lighthouse móvil rendimiento (Inicio) | 87 | ≥ 90 | ≥ 90 |
| LCP móvil | 2,8 s | < 2,5 s | < 2,5 s |

---

## Insumos que debe entregar el cliente (bloquean tareas)

| Insumo | Bloquea |
|---|---|
| Acceso a Google Search Console (y GA4) | 0.4, Fase 6, Fase 7, KPIs |
| Número real de países y lista real de industrias | 0.6 |
| Fuente del "60%" o decisión de quitarlo | 0.6 |
| Datos de 3+ casos (reto, qué se hizo, cifras) + autorización para nombrar | 2.1, 2.5 |
| Equipo: nombres, fotos, cargos, certificaciones, LinkedIn | 2.2 |
| Historia: año de fundación, hitos, número de proyectos | 2.3 |
| Talleres: agenda, duración, modalidad, facilitador, fechas, precio | Fase 3 |
| Decisión sobre Presencia Digital (a/b/c) | 1.5 |
| Decisión sobre `cyrruscs-dist/` y el zip | 0.9 |
