# SEO / AI Visibility — Estado del sitio

> Este archivo se actualiza cada vez que se corre una auditoría (`/claude-seo-ai:audit`), un
> recálculo de score (`/claude-seo-ai:score`) o una ronda de fixes de SEO sobre el código. Cada
> corrida agrega una entrada nueva arriba de la anterior en "Historial de auditorías"; las
> entradas viejas no se reescriben.

## Estado actual

| Métrica | Score | Banda | Última medición |
|---|---|---|---|
| **Search SEO** | 75.5 / 100 | **C** | 2026-08-19 |
| **AI Visibility (GEO/AEO)** | 75.7 / 100 | **C** | 2026-08-19 |

Los dos scores son independientes y nunca se promedian entre sí (uno mide ranking clásico en
buscadores, el otro qué tan citable es el sitio por motores de IA como ChatGPT, Perplexity o
Google AI Overviews).

**Estos números no son comparables con los del 2026-08-03** (81/B y 61/D): esa corrida no dejó
un JSON de findings, así que no hay diff posible, y la del 08-19 usó 4 agentes especialistas
haciendo barridos programáticos sobre las 68 rutas en vez de una muestra — encontró defectos
reales que la anterior no vio (`sameAs` de LinkedIn roto, conflicto de `@id` en `/contacto`,
`lastmod` congelado) y encontrar más problemas baja el número aunque el sitio esté igual o
mejor. Los findings quedan guardados en [seo-findings-2026-08-19.json](seo-findings-2026-08-19.json)
para que `/claude-seo-ai:score` funcione sin volver a rastrear — se actualizó el `status` de 10
findings a `pass` conforme se corrigieron en esta misma ronda (ver historial abajo). Todavía
falta correr la verificación tier 1 (cabeceras HTTP, los dos redirects 301, Core Web Vitals de
campo) contra el dominio ya publicado — ver el punto 0 de "Qué falta por hacer".

**La tabla no incluye todavía el reemplazo de `/contacto` por el wizard modal (2026-08-20,
ver historial)** — ese cambio salió después de la última corrida de `score.mjs` y no se ha
vuelto a recalcular. No hay `findings` nuevos que marcar porque no fue una auditoría, así que
el número de arriba sigue siendo el más reciente medido de verdad.

## Qué falta por hacer (bloqueadores activos)

Estos son los pendientes que más mueven el score y que **requieren contenido/decisión humana**
— no se pueden resolver con otra corrida automática de `/fix`:

0. **Publicar este sitio en `www.cyrruscs.com`.** Bloqueador por encima de todos los demás:
   el dominio canónico sigue sirviendo el sitio anterior (título "Home - Cyrrus CS", H1
   "Elevando a las empresas hacia alturas innovadoras"). El sitio nuevo solo existe en
   `cyrrus-cira.vercel.app`, y `vercel.json` le aplica `X-Robots-Tag: noindex` a todo host
   `*.vercel.app` — correctamente, pero significa que **ninguna** de estas páginas está
   indexada en ninguna parte. Los canonicals, el sitemap, `llms.txt` y todo el JSON-LD ya
   apuntan a `cyrruscs.com`, así que el resto del trabajo de SEO no rinde nada hasta que
   el dominio sirva este build.
   - Cómo saber si falló: `site:cyrruscs.com` no devuelve las rutas nuevas 3 semanas
     después del deploy.
1. **Publicar artículos reales en `/perspectivas`.** Hay 14 títulos SEO-optimizados en
   `src/lib/perspectivas-topics.ts`, cero publicados. Esto es lo que más pesa en AI Visibility
   (Answer Extractability, peso 20/100) y en Freshness en ambos scores. Cada artículo necesita:
   cuerpo real (600–1200 palabras), fecha de publicación visible, y JSON-LD `BlogPosting` con
   `datePublished` + `author` apuntando al `@id` de la persona autora.
   - Prioridad alta: ERP (qué es), Planeación Estratégica (qué es), Cómo implementar IA,
     Cómo elegir un ERP.
2. **Profundizar el perfil de Daniel Bohorquez en `/experiencia`.** Corrección sobre lo que decía
   esta entrada: el roster ya no tiene 4 puestos con 2 sin nombre — bajó a 2 personas (Jackson
   Bohorquez, Daniel Bohorquez — Director de Cyrrus Intelligence Lab), ambas con nombre y foto
   (`src/i18n/locales/es/paginas.json`, `experiencia.team.roles`). Lo que falta ahora es
   profundidad: Daniel no tiene bio, ni LinkedIn, ni página propia, a diferencia de Jackson
   (que sí tiene `/quienes-somos` completo con schema `Person`). Verificado con auditoría
   2026-08-19 (`M16.eeat.team_roster_asymmetric_depth`).
3. **Reforzar la bio de Jackson en `/quienes-somos`**: nombrar una institución/evento específico
   donde haya dado charlas, y sustentar con un dato concreto la mención de "dos décadas de
   experiencia" (año de fundación de Cyrrus u otro hito verificable).
4. **Entrar en los listicles de terceros.** Buena parte de las SERP cabeza en Colombia
   ("consultoría empresarial", "firmas de consultoría", "software ERP") no las gana ninguna
   consultora: las ganan artículos tipo "Top 50 firmas de consultoría en Colombia"
   (sterlingyco.com, lastopdelatam.com, comparasoftware.co, guiatic.com). Para esas queries
   la vía de captura es aparecer **dentro** de esos listados — relaciones y PR, no on-page.
   Ninguna palabra del sitio lo resuelve.
5. **Decidir si la home lleva modificador geográfico.** Hoy el `<title>` es "Consultoría
   Estratégica con IA | Cyrrus Consulting Services", sin país ni región; "LATAM"/"Colombia"
   solo aparecen en descriptions y en `/experiencia`. Frente a EY/KPMG/Accenture la geografía
   es la mayor palanca de diferenciación disponible. Es un cambio de una línea, pero es una
   decisión de posicionamiento, no una tarea técnica.
6. **Reformular las 4 preguntas de FAQ de `/intelligence-lab/gobierno-de-ia` que no son
   preguntas.** Son afirmaciones ("No tenemos ningún marco de IA hoy") sin signo de
   interrogación — reduce el matching léxico con lo que un usuario realmente teclea en un
   motor de IA. `/…/erp` repite el patrón en una de sus dos preguntas. Barato de corregir y
   pega directo en Answer Extractability, el módulo de mayor peso en AI Visibility (20/100).
7. **Ampliar el FAQ de ERP/CRM/HCM/EAM** (2 preguntas cada una, hoy) con preguntas de alto
   valor comercial: costo aproximado, criterios de evaluación, diferencia frente a implementar
   directo con el proveedor. `/presencia-digital/seo` ya tiene 5 — usarla de referencia. Son
   justo las páginas del clúster con más ventana de ranking real (ver diagnóstico de
   competencia en el historial del 2026-08-19).
8. **Añadir casos con cifras a `/experiencia`.** 21 logos de clientes reales (Pepsico,
   Millicom, SGS, Parex, Brenntag, entre otros) sin una sola frase de caso ni resultado
   cuantificado asociado. Es el activo más desaprovechado del sitio para densidad de hechos
   (M12) — un motor de IA no tiene nada que citar de un logo aislado.
9. **Sustentar o reformular la cifra "60% de reducción en tiempo de diagnóstico".** Se repite
   en `estrategia.json`, `metodo-cira.json` y `paginas.json` (renderizada en `/experiencia`)
   sin fuente ni metodología. Añadir una nota de fuente/período, o marcarla explícitamente
   como estimación interna.
10. **Completar `geo`/`openingHoursSpecification`/`priceRange` del `Organization`** si el
    negocio decide revelarlos — no se inventaron coordenadas ni horario porque no hay una
    fuente de verdad en el repo. Cyrrus es consultoría B2B remota multi-país con agenda por
    cita, así que el techo de beneficio real (elegibilidad de Local Pack) es bajo.
11. **`/contacto` dejó de ser una URL indexable (2026-08-20).** Se reemplazó por un wizard en
    modal (ver historial) que se abre desde cualquier página — decisión de producto, no un
    error, pero tiene un costo de SEO real: ya no hay una página propia que pueda rankear para
    queries de navegación tipo "contacto cyrrus" o "agendar cita cyrrus consulting", ni un
    `ContactPage` en el JSON-LD. La información de contacto (teléfono, correo, las dos
    direcciones) sigue visible y en el `Organization` schema de `index.html`, así que la
    entidad de negocio no pierde señal — lo que se pierde es la superficie de una URL propia.
    Si en el futuro esto pesa, la opción más barata es una landing `/contacto` liviana con
    `ContactPage` schema que abra el mismo wizard al cargar, en vez de un formulario propio.

## Tareas técnicas menores pendientes (bajo impacto, se pueden automatizar)

- `twitter:image` no se sobreescribe por página (solo `og:image` vía `usePageMeta`) — LinkedIn/
  Facebook sí muestran la imagen custom, X/Twitter sigue mostrando la genérica.
- Descripción de 169 caracteres en `/leadership-academy/ia-para-directivos` (y 180 en su
  versión EN). No se recortó porque ese texto es también el copy visible del hero y la página
  está `comingSoon: true` → `noindex`, así que hoy no llega a ninguna SERP. Recortarlo cuando
  el taller se lance.

*(Los ítems de `BreadcrumbList` faltante y cobertura despareja de `FAQPage` que estaban aquí
se resolvieron/verificaron en la auditoría del 2026-08-19 — ver historial. `Contacto.tsx`
además ya no existe: se reemplazó por el wizard modal, ver la entrada del 2026-08-20.)*

## Cómo actualizar este archivo

1. Correr `/claude-seo-ai:audit` (auditoría completa) o `/claude-seo-ai:score` (solo recálculo).
2. Agregar una entrada nueva arriba en "Historial de auditorías" con fecha, los dos scores,
   qué cambió desde la corrida anterior, y qué findings nuevos aparecieron o se resolvieron.
3. Actualizar la tabla de "Estado actual" con los números más recientes.
4. Revisar si algún ítem de "Qué falta por hacer" ya se resolvió y moverlo a una entrada del
   historial en vez de dejarlo en la lista de pendientes.

## Historial de auditorías

### 2026-08-20 — `/contacto` reemplazada por un wizard en modal

**Sin recalcular** (cambio de producto, no una ronda de SEO — se documenta aquí por el impacto
en rutas/schema/sitemap).

A pedido del usuario, la página `/contacto` se eliminó por completo y se reemplazó por una
secuencia de 4 preguntas en un modal (servicio → empresa/tamaño → nombre/rol → teléfono o
correo) que se abre desde cualquiera de los 16+ CTAs de "Agendar conversación" del sitio, sin
navegar a ninguna URL. Mismo envío por Web3Forms que usaba el formulario anterior.

Lo que esto cambia para SEO/AI Visibility, específicamente:
- **Ruta eliminada** de `App.tsx`, `route-meta.json`, `generate-sitemap.mjs` y `llms.txt` — ya
  no se genera `dist/contacto/` ni `dist/en/contacto/`. Confirmado con `npm run build` (66/66
  rutas, antes 68) y un grep completo del repo sin referencias muertas.
- **`ContactPage` + su `BreadcrumbList` desaparecieron** — solo existían en `Contacto.tsx`. Ver
  el punto 11 de "Qué falta por hacer" sobre la implicación de perder esa URL indexable.
- La información de contacto (NAP, WhatsApp, las dos direcciones de Barranquilla y Bogotá) se
  mantiene visible y en el `Organization` schema compartido de `index.html` — no se perdió como
  entidad, solo como página propia.
- El namespace i18n `contacto` se borró (`contacto.json` ES/EN, `ns/contacto.ts`); nace uno
  nuevo, `contact-wizard`, con el copy de las 4 preguntas en paridad ES/EN — el idioma del
  wizard sigue automáticamente el de la página desde la que se abre.

Verificación: `tsc -b` y `npm run build` limpios; flujo completo de los 4 pasos (selección,
validación por campo, validación cruzada de "al menos un teléfono o correo", navegación
"Atrás" con persistencia de valores, cierre/reseteo) verificado por inspección directa de
React/DOM en el navegador del preview.

### 2026-08-19 (tarde) — Defectos reales corregidos, no solo higiene

**Search SEO: 65.6 → 75.5 (D → C)** · **AI Visibility: 54.6 → 75.7 (F → C)**

Auditoría completa (4 agentes especialistas — técnico, GEO/IA, contenido/E-E-A-T, schema —
barriendo programáticamente las 68 rutas del build local `dist/`, no una muestra) seguida de
una ronda de fixes sobre los defectos reales que encontró. Los findings quedan en
[seo-findings-2026-08-19.json](seo-findings-2026-08-19.json).

**Los 4 defectos reales, corregidos:**
- `sameAs` de LinkedIn de Jackson Bohorquez apuntaba a un slug distinto (`jacksonbohorquezb`
  en el schema) del enlace visible en la página (`jacksonbohorquez`, sin la "b") — confirmado
  con el usuario cuál era el correcto y unificados ambos.
- El `@id` `#organization` se redeclaraba con un `@type` distinto y un `contactPoint` duplicado
  en `/contacto` — se movió el `contactPoint` real al bloque canónico de `index.html` y
  `Contacto.tsx` quedó como referencia pura por `@id` (antes de eliminarse la página del todo
  al día siguiente, ver arriba).
- El `lastmod` del sitemap nunca avanzaba salvo para URLs nuevas — `generate-sitemap.mjs` ahora
  hashea el contenido i18n real de cada ruta (`CONTENT_SOURCE`) y solo mueve la fecha cuando ese
  contenido cambia de verdad, no en cada corrida del script.
- `WebSite.inLanguage` estaba fijo en `"es"` incluso en las 34 páginas servidas bajo `/en/` —
  ahora es `["es", "en"]`.

**Higiene adicional de la misma ronda:**
- Stub del `Person` del fundador embebido en el `founder` compartido de `index.html` (antes un
  `@id` que solo resolvía dentro de `/quienes-somos`).
- `HowTo` (deprecado desde sept-2023) y el uso indebido de `Offer`/`OfferCatalog` en
  `/metodo-cira` reemplazados por un `ItemList` que referencia los 4 `Service` reales por `@id`.
- 42 fotos originales huérfanas (6.8 MB, nunca referenciadas en `src/` — la cifra de 21.2 MB que
  había reportado el auditor estaba inflada por comparar contra el HTML ya construido en vez del
  código fuente) eliminadas de `public/assets`; `npm run images` confirma cero regresión en los
  derivados servidos.
- Dirección de Bogotá (Carrera 62 #103-44 Oficina 401S) agregada como texto visible en
  `/contacto` y como segundo nodo `Place` en `location` del `Organization` — sin crear una
  segunda entidad de negocio, que es el anti-patrón que la propia auditoría de local-business
  advertía evitar para oficinas no verificables (esta sí es una dirección real).

Confirmado en la misma auditoría que dos hallazgos de la ronda del 2026-08-03 ya no aplicaban:
el roster de `/experiencia` bajó de 4 puestos con 2 sin nombre a 2 personas con nombre y foto
(ver punto 2 de "Qué falta por hacer" — lo que falta ahora es profundidad, no nombres), y
`BreadcrumbList` ya cubre `Experiencia.tsx`/`Contacto.tsx`/`Perspectivas.tsx`.

Verificación: `npm run build` (68/68 rutas ese día), consola limpia en las páginas tocadas,
validador de JSON-LD del propio pack sin bloques inválidos.

### 2026-08-19 — Vocabulario: demanda antes que marca, y fin de la canibalización

**Scores sin recalcular** (ronda de fixes dirigidos, no auditoría completa).

Punto de partida: análisis competitivo de las SERP en español para los términos que el sitio
persigue. Conclusión — el on-page está por encima del promedio de la competencia local, pero
el vocabulario estaba organizado por cómo Cyrrus nombra sus cosas ("Método CIRA", "Intelligence
Lab", "Leadership Academy", "Presencia Digital"), no por cómo el comprador busca. "Método CIRA"
no existe en el SERP: cero demanda, y ocupaba el inicio del `<title>` de `/metodo-cira`.

Cambios aplicados (22 archivos, 56 cadenas: ES + EN en paridad):

**Títulos — término de demanda primero, marca después.** `/metodo-cira` (68 → 60 chars,
"Consultoría en Transformación Digital | Método CIRA"), `/intelligence-lab` ("Consultoría en
Inteligencia Artificial Empresarial" — el término paraguas por el que rankean Ztrategia,
Intezia y EY), `/intelligence-lab/gobierno-de-ia`, `/intelligence-lab/automatizaciones-desarrollo`,
`/presencia-digital`, `/leadership-academy`, `/experiencia`, `/perspectivas` (71 → 56),
`/…/tecnologias-avanzadas`, `/presencia-digital/seo`. CIRA, Intelligence Lab y Leadership
Academy siguen en el contenido y en los H1 — solo dejaron de ocupar la posición inicial del
`<title>`.

**Canibalización resuelta en dos pares de páginas.**
- `/metodo-cira/seleccion-de-soluciones` (hub) disputaba "ERP, CRM, HCM" con su propia hija
  `/…/seleccion-de-software`. El hub pasó al término de método ("Selección de tecnología sin
  sesgo de proveedor") en title, H1, description y copy del hero; la hija quedó como única
  dueña de ERP/CRM/HCM/EAM. El H1 del hub alimenta también el `name` del `Service` y del
  `BreadcrumbList`, así que ambos quedaron alineados.
- `/intelligence-lab` (hub) y `/intelligence-lab/gobierno-de-ia` competían por "gobierno de
  IA". El hub subió al término paraguas; la hija se quedó con "gobierno de IA" en exclusiva.

**Higiene.** 21 meta descriptions recortadas a ≤155 caracteres (la peor era `/intelligence-lab`
con 257 → 150; también estrategia 207→142, leadership-academy 226→140, experiencia 207→149,
desarrollo-web 198→147, ERP 197→148, HCM 185→143, EAM 188→141). Todos los `<title>` quedaron
en ≤60. `llms.txt` regenerado: se eliminó la entrada muerta a `/tecnologias-maduras` (ruta
renombrada a `/seleccion-de-software` en la ronda anterior; el 301 existía pero la señal a los
motores de IA seguía vieja), se agregaron las cuatro páginas de producto (ERP, CRM, HCM, EAM)
que faltaban, y se alinearon las descripciones del hub y de Intelligence Lab con el nuevo
posicionamiento. Verificado que las 47 URLs del archivo existen en el sitemap.

Verificación: `npm run build` → 68/68 rutas prerenderizadas; consola limpia (sin error #418)
en `/metodo-cira/seleccion-de-soluciones`, `/…/seleccion-de-software`, `/intelligence-lab` y
`/en/metodo-cira/seleccion-de-soluciones`.

Bloqueador nuevo identificado en esta ronda: `www.cyrruscs.com` sigue sirviendo el sitio
anterior — ver el punto 0 de "Qué falta por hacer".

### 2026-08-03 — Fixes técnicos + contenido inicial de equipo/blog

**Search SEO: 33 → 81 (F → B)** · **AI Visibility: 53 → 61 (F → D)**

Cambios aplicados en esta ronda:
- Sitemap y `llms.txt` actualizados con `/quienes-somos` (antes ausente).
- 12 páginas de Service/Course con `provider` enlazado por `@id` a la Organization canónica
  (antes objetos `Organization` anónimos y duplicados).
- Nodo `WebSite` agregado en `index.html`, enlazado a la Organization vía `publisher`.
- `BreadcrumbList` agregado en 21 de 26 rutas.
- Las 19 etiquetas `<img>` del sitio ahora tienen `width`/`height`/`loading`.
- `og:image` configurable por página vía `usePageMeta` (antes solo la imagen genérica del sitio).
- Fuentes de Google movidas de `@import` (bloqueante) a `preconnect` + `<link rel="stylesheet">`.
- Bug corregido: el prerender horneaba una URL `http://127.0.0.1:PORT/...` rota en
  `dist/intelligence-lab/index.html` (origen efímero del servidor de build filtrándose al HTML
  final) — ahora se reescribe a ruta relativa antes de escribir cada archivo.
- `FAQPage` agregado en `PlaneacionEstrategica.tsx` (tenía preguntas reales sin marcar).
- Página nueva `/quienes-somos` con bio y schema `Person` de Jackson Bohorquez.
- Daniel Bohorquez agregado al equipo como "Director de Cyrrus Intelligence Lab" (sin foto aún).
- 14 títulos de blog SEO-optimizados agregados al calendario editorial de `/perspectivas`
  (0 publicados todavía).

Pendiente identificado para la próxima ronda: publicar contenido real de blog y completar
perfiles de equipo — ver "Qué falta por hacer" arriba.
