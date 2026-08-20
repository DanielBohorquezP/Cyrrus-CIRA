# SEO / AI Visibility — Estado del sitio

> Este archivo se actualiza cada vez que se corre una auditoría (`/claude-seo-ai:audit`), un
> recálculo de score (`/claude-seo-ai:score`) o una ronda de fixes de SEO sobre el código. Cada
> corrida agrega una entrada nueva arriba de la anterior en "Historial de auditorías"; las
> entradas viejas no se reescriben.

## Estado actual

| Métrica | Score | Banda | Última medición |
|---|---|---|---|
| **Search SEO** | 83.1 / 100 | **B** | 2026-08-20 |
| **AI Visibility (GEO/AEO)** | 85.1 / 100 | **B** | 2026-08-20 |

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

**Los números del 2026-08-20 sí son comparables con los del 08-19**, a diferencia del salto
08-03 → 08-19. Salen de `score.mjs` sobre el mismo `seo-findings-2026-08-19.json`, con los
mismos 57 findings y los mismos pesos; lo único que cambió entre una corrida y otra es el
`status` de 7 findings que pasaron de `warn` a `pass` al corregirse en el código. El +7.6 /
+9.4 mide exactamente esa ronda de fixes y nada más. La contraparte es que **tampoco hubo
re-rastreo**: los 16 `warn` restantes se dan por ciertos desde el barrido del 08-19, y los
`needs_api` (4 en Search, 3 en AI Visibility) siguen sin medirse — sobre todo Core Web Vitals
de campo, que entra al score en 50/100 por defecto y pesa 16 puntos.

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
5. **Medir el efecto del modificador geográfico de la home**, ya aplicado el 2026-08-20:
   el `<title>` pasó a "Consultoría Estratégica con IA en Colombia | Cyrrus". La decisión (Colombia
   sobre LATAM) fue del usuario. Queda pendiente comprobar si mueve algo — no se puede saber
   hasta que el dominio canónico sirva este build (punto 0) y haya datos en Search Console.
   - Cómo saber si falló: 8 semanas después de indexar, la home no aparece para "consultoría
     estratégica Colombia" ni gana impresiones para consultas con el país.
6. **Añadir casos con cifras a `/experiencia`.** 21 logos de clientes reales (Pepsico,
   Millicom, SGS, Parex, Brenntag, entre otros) sin una sola frase de caso ni resultado
   cuantificado asociado. Es el activo más desaprovechado del sitio para densidad de hechos
   (M12) — un motor de IA no tiene nada que citar de un logo aislado.
7. **Sustentar o reformular la cifra "60% de reducción en tiempo de diagnóstico".** Se repite
   en `estrategia.json`, `metodo-cira.json` y `paginas.json` (renderizada en `/experiencia`)
   sin fuente ni metodología. Añadir una nota de fuente/período, o marcarla explícitamente
   como estimación interna.
8. **Completar `geo`/`openingHoursSpecification`/`priceRange` del `Organization`** si el
   negocio decide revelarlos — no se inventaron coordenadas ni horario porque no hay una
   fuente de verdad en el repo. Cyrrus es consultoría B2B remota multi-país con agenda por
   cita, así que el techo de beneficio real (elegibilidad de Local Pack) es bajo.
9. **`/contacto` dejó de ser una URL indexable (2026-08-20).** Se reemplazó por un wizard en
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
- Descripciones fuera de rango (98–180 car.) en las 14 páginas de taller. No se recortan porque
  ese texto es también el copy visible del hero y las páginas están `comingSoon: true` →
  `noindex`, así que hoy no llegan a ninguna SERP. Recortarlas cuando cada taller se lance.
- Sin `dateModified` en el JSON-LD del sitio (`M13.freshness.no_datemodified_schema_sitewide`).
  La fuente de verdad ya existe — `generate-sitemap.mjs` calcula por ruta un `lastmod` real
  desde el hash del contenido i18n — pero hoy solo se escribe en el sitemap. Para llevarlo al
  schema habría que emitir un `route-lastmod.json` desde ese script e inyectarlo en los nodos
  `WebPage`/`Service` desde `usePageMeta`. Mecánico, no bloqueado por contenido.
- `<meta charset>` no es el primer hijo de `<head>`: el plugin de preload de fuentes inyecta
  3 `<link rel="preload">` antes (`injectTo: "head-prepend"`). **Se deja como está a propósito.**
  El charset sigue dentro de los primeros 1024 bytes, que es lo que exige la especificación, y
  mover los preloads después costaría LCP real por un hallazgo cosmético — `CLAUDE.md` prioriza
  lo primero.

*(Los ítems de `BreadcrumbList` faltante y cobertura despareja de `FAQPage` que estaban aquí
se resolvieron/verificaron en la auditoría del 2026-08-19 — ver historial. `Contacto.tsx`
además ya no existe: se reemplazó por el wizard modal, ver la entrada del 2026-08-20. El ítem
de `twitter:image` sin sobreescribir por página se resolvió antes del 2026-08-20: el barrido
de las 66 rutas confirma `twitter:image` idéntico a `og:image` en todas.)*

## Cómo actualizar este archivo

1. Correr `/claude-seo-ai:audit` (auditoría completa) o `/claude-seo-ai:score` (solo recálculo).
2. Agregar una entrada nueva arriba en "Historial de auditorías" con fecha, los dos scores,
   qué cambió desde la corrida anterior, y qué findings nuevos aparecieron o se resolvieron.
3. Actualizar la tabla de "Estado actual" con los números más recientes.
4. Revisar si algún ítem de "Qué falta por hacer" ya se resolvió y moverlo a una entrada del
   historial en vez de dejarlo en la lista de pendientes.

## Historial de auditorías

### 2026-08-20 (tarde) — Barrido programático de las 66 rutas + ronda de fixes

**Search SEO: 75.5 → 83.1 (C → B)** · **AI Visibility: 75.7 → 85.1 (C → B)**

La auditoría se corrió como un barrido programático propio sobre el build local `dist/` (las 66
rutas, no una muestra). Los dos scores salen de `score.mjs` sobre
[seo-findings-2026-08-19.json](seo-findings-2026-08-19.json), corrido después de marcar como
`pass` los 7 findings que esta ronda corrigió (34 `pass` / 16 `warn` / 6 `needs_api` /
1 `not_applicable`). El "antes" se midió de verdad, corriendo el mismo script sobre una copia
del archivo con esos 7 `status` revertidos a `warn`: mismo conjunto de 57 findings, mismos
pesos, así que el delta aísla el efecto de la ronda y nada más — no hubo re-rastreo.

Las 6 categorías que se movieron (las otras 16 quedaron idénticas):

| Categoría | Eje | Peso | Antes | Ahora |
|---|---|---|---|---|
| Indexability & Crawl | Search | 22 | 75.0 | **100** |
| On-Page & Meta | Search | 12 | 62.5 | **87.5** |
| Structured Data | Search | 12 | 91.7 | **95.8** |
| Answer Extractability | AI Visibility | 20 | 50.0 | **75.0** |
| Fact Density / Original Data | AI Visibility | 14 | 50.0 | **66.7** |
| AI Crawler Access | AI Visibility | 12 | 83.3 | **100** |

Lo que **no** se movió y explica el techo de Search SEO: Core Web Vitals entra en 50/100 con
peso 16 porque sigue en `needs_api` — no hay datos de campo mientras el dominio canónico no
sirva este build. Solo esa categoría vale ~8 puntos del score, y no se desbloquea escribiendo
contenido sino publicando (punto 0). Detrás vienen Local (66.7, peso 10), Internal Linking
(66.7, peso 8), E-E-A-T (70.8) y Freshness (70.8), que sí dependen de los pendientes de
contenido: casos con cifras en `/experiencia`, los artículos de `/perspectivas` y la bio de
Daniel.

**El bloqueador #0 sigue vivo y se reconfirmó en esta corrida.** `https://www.cyrruscs.com/`
responde 200 desde nginx con `<title>Home - Cyrrus CS</title>` y H1 "Elevando a las empresas
hacia alturas innovadoras" — el sitio anterior. `/sitemap.xml` y `/metodo-cira` devuelven 404
en el dominio canónico. El build nuevo solo existe en `cyrrus-cira.vercel.app`, que responde
con `X-Robots-Tag: noindex` (correcto, por la regla de `vercel.json`). **Nada de lo que sigue
rinde un solo puesto de ranking hasta que `cyrruscs.com` sirva este build.**

**Un defecto real, no de higiene: el `noindex` se quedaba pegado entre rutas.**
`usePageMeta` guardaba el `<meta name="robots">` que encontraba al montar y lo *restauraba* en
el cleanup. Como el prerenderer hornea ese tag en el HTML de las 16 rutas `noindex`, al montar
sobre una de ellas el valor guardado era `"noindex, follow"` — y al navegar del lado del
cliente a cualquier otra página, el cleanup lo volvía a poner. Efecto: entrar por un taller
"próximamente" o por el 404 y seguir navegando dejaba **toda la sesión en `noindex`** para un
crawler que renderiza y sigue enlaces, que es exactamente lo que hace Googlebot. `usePageMeta`
es el único escritor de ese meta (`index.html` no trae ninguno), así que el tag presente al
cargar siempre es obra de un render anterior del propio hook, nunca algo que preservar: ahora
el cleanup lo elimina y la rama `else` lo quita cuando la ruta sí es indexable. Verificado en
el navegador: desde `/leadership-academy/iso-27001` (`noindex, follow`) navegando a
`/metodo-cira` y luego a `/experiencia`, el meta queda en `null` en ambas.

**Lo demás corregido en esta ronda:**
- **Las 16 FAQ que eran afirmaciones ahora son preguntas** (puntos 6 y 7 de la lista de
  pendientes, ES + EN en paridad — 42 cadenas reescritas contando las que se repetían entre
  archivos). Barrido de verificación: **0 entradas sin signo de interrogación** en las 34
  `FAQPage` del sitio. Pega directo en Answer Extractability, el módulo de mayor peso de AI
  Visibility.
- **ERP, CRM, HCM, EAM, Selección de Software y Planeación Estratégica pasaron de 2 a 5
  preguntas** (36 preguntas nuevas, ES + EN), con las de intención comercial que faltaban:
  costo aproximado, criterios de evaluación, y por qué un consultor independiente en vez de ir
  directo al proveedor. Total del sitio: 118 → 154 preguntas. Son las páginas del clúster con
  más ventana de ranking real, y las respuestas nuevas también suben el conteo de palabras
  visible de cada una.
- **Modificador geográfico en la home** (punto 5, decisión del usuario en esta sesión):
  "Consultoría Estratégica con IA en Colombia | Cyrrus" (51 car.) / "Strategic Consulting with
  AI in Colombia | Cyrrus" (49 car.), con las descriptions ajustadas en ambos idiomas. Se eligió
  Colombia sobre LATAM por volumen de búsqueda real y por coincidir con las dos oficinas.
- **Saltos de jerarquía de encabezados eliminados** en `/perspectivas` y `/leadership-academy`
  (ES + EN): las tarjetas de `blog7` cuelgan directamente del `h1` de la página, así que su
  título es `h2`; y el rótulo del carrusel decorativo de `workshop-orbit` dejó de ser un `h3`
  (los nombres reales de los talleres ya son `h3` en la reja de abajo, así que además estaba
  duplicando). 0 saltos en las 66 rutas.
- **`BreadcrumbList` + `WebPage` en `/privacidad` y `/cookies`** (ES + EN) — eran las 4 únicas
  rutas no-home sin breadcrumb. Cobertura: 60 → 64 de 64.
- **El 404 ya no declara un canonical a una URL inexistente.** `dist/404.html` se autodeclaraba
  canónico en `/not-found-preview-only`, la ruta sintética del prerender, que devuelve 404. Se
  añadió `noCanonical` a `usePageMeta` (el 404 se sirve para *cualquier* ruta desconocida, así
  que ningún canonical suyo es correcto) y el cleanup re-adjunta el nodo al salir. Verificado:
  `/ruta-que-no-existe` sin canonical, y al volver a la home reaparece exactamente uno,
  apuntando a `/`.
- **Los 4 landmarks `<nav>` ya tienen nombre accesible.** El `aria-label` del menú de escritorio
  existía pero estaba escrito `items[0]?.label ? undefined : "Navegación principal"`, es decir
  resolvía a `undefined` siempre que hubiera ítems — siempre. Los 4 (`Navegación principal`,
  `Navegación móvil`, `Pie de página`, `Legal`) ahora se rotulan y siguen el idioma de la página.
- **Sufijo de marca en los títulos de los 14 talleres** (`… | Cyrrus`), que además saca a los
  cinco que estaban por debajo de 30 caracteres. Todas las rutas quedan dentro de 30–60.
- **El nodo `Course` dejó de emitirse en las páginas `comingSoon`.** Declaraba 14 entidades en
  rutas `noindex` que el buscador no puede alcanzar ni verificar. Vuelve solo cuando un taller
  se publique.
- **Descriptions por debajo de 120 caracteres corregidas** en `/metodo-cira/gestion-de-proyectos`,
  `/metodo-cira/gestion-del-cambio` (ES + EN) y `/en/presencia-digital/seo` — quedaron en 132–137,
  sumando el modificador geográfico. Las que siguen fuera de rango son solo las de los talleres
  `noindex`, donde la description es también el copy visible del hero (decisión ya documentada).
- **`llms.txt` ya enlaza la home en español**, que era el único nodo del sitio ausente del archivo.

**Verificación:** `tsc -b` y `npm run build` limpios, 66/66 rutas prerenderizadas. Hidratación
comprobada en el navegador sobre `dist/` servido (`node scripts/serve-dist.mjs`) en
`/`, `/perspectivas`, `/privacidad`, `/leadership-academy/iso-27001`, `/metodo-cira` y la
página de ERP: **cero errores de consola, cero React #418** — las cuatro reglas de hidratación
de `CLAUDE.md` siguen en pie tras los cambios de markup. El `lastmod` del sitemap avanzó en
exactamente las 34 URLs cuyo contenido i18n cambió, que es el comportamiento que
`generate-sitemap.mjs` debe tener.


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
