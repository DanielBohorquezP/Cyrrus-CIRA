# SEO / AI Visibility — Estado del sitio

> Este archivo se actualiza cada vez que se corre una auditoría (`/claude-seo-ai:audit`) o un
> recálculo de score (`/claude-seo-ai:score`). No se edita manualmente el historial — cada
> corrida agrega una entrada nueva arriba de la anterior en la sección "Historial de auditorías".

## Estado actual

| Métrica | Score | Banda | Última medición |
|---|---|---|---|
| **Search SEO** | ≈ 81 / 100 | **B** | 2026-08-03 |
| **AI Visibility (GEO/AEO)** | ≈ 61 / 100 | **D** | 2026-08-03 |

Los dos scores son independientes y nunca se promedian entre sí (uno mide ranking clásico en
buscadores, el otro qué tan citable es el sitio por motores de IA como ChatGPT, Perplexity o
Google AI Overviews).

## Qué falta por hacer (bloqueadores activos)

Estos son los pendientes que más mueven el score y que **requieren contenido/decisión humana**
— no se pueden resolver con otra corrida automática de `/fix`:

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

## Tareas técnicas menores pendientes (bajo impacto, se pueden automatizar)

- `BreadcrumbList` en `Experiencia.tsx`, `Contacto.tsx` y `Perspectivas.tsx` (los otros ~21
  templates ya lo tienen).
- Títulos de página aún sobre ~60 caracteres en varios talleres de Leadership Academy y en
  `/metodo-cira`, `/perspectivas` (SERP los trunca).
- Meta descriptions sobre ~160 caracteres en home, `/intelligence-lab`, `/metodo-cira`,
  `/leadership-academy`, `/experiencia`.
- `twitter:image` no se sobreescribe por página (solo `og:image` vía `usePageMeta`) — LinkedIn/
  Facebook sí muestran la imagen custom, X/Twitter sigue mostrando la genérica.
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
