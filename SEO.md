# SEO / AI Visibility — Estado del sitio

> Este archivo se actualiza cada vez que se corre una auditoría (`/claude-seo-ai:audit`), un
> recálculo de score (`/claude-seo-ai:score`) o una ronda de fixes de SEO sobre el código. Cada
> corrida agrega una entrada nueva arriba de la anterior en "Historial de auditorías"; las
> entradas viejas no se reescriben.

## Estado actual

| Métrica | Score | Banda | Última medición |
|---|---|---|---|
| **Search SEO** | ≈ 81 / 100 | **B** | 2026-08-03 |
| **AI Visibility (GEO/AEO)** | ≈ 61 / 100 | **D** | 2026-08-03 |

Los dos scores son independientes y nunca se promedian entre sí (uno mide ranking clásico en
buscadores, el otro qué tan citable es el sitio por motores de IA como ChatGPT, Perplexity o
Google AI Overviews).

La ronda del 2026-08-19 fue de fixes dirigidos, no una auditoría: los scores de la tabla siguen
siendo los del 2026-08-03 y están pendientes de recalcular.

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
2. **Completar el equipo de liderazgo en `/experiencia`** (`src/pages/Experiencia.tsx`, array
   `team`). Estado: Jackson Bohorquez (completo), Daniel Bohorquez — Director de Cyrrus
   Intelligence Lab (falta foto + bio), Director de Leadership Academy (falta nombre + foto +
   bio), Directora de Operaciones (falta nombre + foto + bio). Mientras 2 de 4 sigan sin nombre,
   el módulo E-E-A-T (M16) se mantiene en fail.
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

## Tareas técnicas menores pendientes (bajo impacto, se pueden automatizar)

- `BreadcrumbList` en `Experiencia.tsx`, `Contacto.tsx` y `Perspectivas.tsx` (los otros ~21
  templates ya lo tienen).
- `twitter:image` no se sobreescribe por página (solo `og:image` vía `usePageMeta`) — LinkedIn/
  Facebook sí muestran la imagen custom, X/Twitter sigue mostrando la genérica.
- Descripción de 169 caracteres en `/leadership-academy/ia-para-directivos` (y 180 en su
  versión EN). No se recortó porque ese texto es también el copy visible del hero y la página
  está `comingSoon: true` → `noindex`, así que hoy no llega a ninguna SERP. Recortarlo cuando
  el taller se lance.
- Cobertura de `FAQPage` despareja: presente en 5 de ~12 páginas de servicio (las que ya tenían
  contenido de preguntas y respuestas real y visible). El resto no tiene FAQ real todavía —
  agregar el schema ahí requeriría escribir las preguntas primero.

## Cómo actualizar este archivo

1. Correr `/claude-seo-ai:audit` (auditoría completa) o `/claude-seo-ai:score` (solo recálculo).
2. Agregar una entrada nueva arriba en "Historial de auditorías" con fecha, los dos scores,
   qué cambió desde la corrida anterior, y qué findings nuevos aparecieron o se resolvieron.
3. Actualizar la tabla de "Estado actual" con los números más recientes.
4. Revisar si algún ítem de "Qué falta por hacer" ya se resolvió y moverlo a una entrada del
   historial en vez de dejarlo en la lista de pendientes.

## Historial de auditorías

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
