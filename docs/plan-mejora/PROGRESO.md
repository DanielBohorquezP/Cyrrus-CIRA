# Progreso del plan de mejora

> **Estado vivo del trabajo.** El *qué* y el *por qué* de cada tarea están en
> [`PLAN.md`](./PLAN.md) (buscar por el ID, p. ej. "0.3").
> Este archivo se actualiza **al final de cada sesión**.

## Cómo empezar una sesión nueva

1. Leer `CLAUDE.md` (reglas de hidratación, imágenes, animaciones).
2. Leer este archivo completo: **Próximo paso**, **Bloqueos** y la última entrada
   de la **Bitácora**.
3. Abrir en `PLAN.md` la sección de la tarea a trabajar.
4. `git log --oneline -10` y `git status` para confirmar el punto de partida.
5. Trabajar **una fase o un grupo pequeño de tareas** por sesión.
6. Verificar: `npm run build && node scripts/serve-dist.mjs`, cargar las rutas
   afectadas en ES y EN y confirmar consola sin errores de hidratación.
7. Al cerrar: actualizar la tabla de estado, **Próximo paso**, **Bloqueos** y
   añadir una entrada a la **Bitácora**.

**Estados:** ⬜ pendiente · 🟡 en curso · ✅ hecho · ⛔ bloqueado (ver Bloqueos) · ➖ descartado

---

## Próximo paso

> **Hallazgo crítico de la sesión de 8.1 (2026-09-18): producción está
> desactualizada desde el 12 de septiembre.** `cyrruscs.com` sirve un build
> con `Last-Modified: 12-sep-2026` — confirmado por cabeceras HTTP y por el
> hash del bundle JS, que no coincide con el del build local actual. Eso
> significa que **todo el trabajo de Fase 3 y Fase 4 de esta semana**
> (enlazado interno, FAQ ampliada en 8 páginas, agrupación de Leadership
> Academy, captura de interesados por taller, sincronización de
> `route-meta.json`) **no está visible para ningún visitante real ni para
> Google** todavía. Antes de seguir invirtiendo sesiones en contenido o
> enlazado nuevo, vale la pena que el dueño haga el redeploy (subir el
> build actual — `npm run build` ya genera `dist/`, o el `cyrrus-dist.zip`
> si ese es el flujo manual habitual) para que el trabajo empiece a contar
> para SEO real. Ver la nueva fila en **Bloqueos** y el detalle en la
> bitácora de hoy.
>
> **Fase 4 está funcionalmente cerrada.** Las 4 páginas troncales
> (Estrategia, hub de Selección de soluciones, PMO, Gestión del cambio),
> ERP/CRM/HCM/EAM, Tecnologías avanzadas/Infraestructura, y las 4 páginas de
> Intelligence Lab ya tienen enlace a `/metodo-cira`, sección "Servicios
> relacionados" y FAQ propia con `FAQPage` JSON-LD — confirmado leyendo cada
> JSON de i18n directamente en la sesión de 4.8, no solo la bitácora (una
> nota anterior sobre CRM/HCM/EAM decía que les faltaba FAQ; era
> incorrecta — ver la corrección en la tabla de 4.3 abajo). 4.8 (sincronizar
> `route-meta.json`) también cerrado.
>
> Lo único genuinamente pendiente en Fase 4 es contenido por debajo del
> rango orientativo de PLAN.md (1.000-1.800 palabras — hoy 420-790 según la
> página) y el bloque "caso real" en todas, bloqueado por 2.1. Ampliar
> palabras solo para llegar a un número, sin información nueva que decir,
> iría en contra del criterio ya aplicado en 4.2 (quitar relleno
> corporativo) — no se recomienda perseguir el conteo de palabras como
> tarea en sí misma.
>
> **Fase 3 (Leadership Academy):** 3.2 y 3.4 cerradas. Queda 3.1 (ficha
> completa por taller, bloqueada — faltan datos del cliente) y 3.3 (depende
> de 3.1).
>
> **Fase 1** cerrada salvo 1.2 ("Casos destacados", depende de 2.1) y 1.5
> (destino final de `/presencia-digital/*`, depende del cliente).
>
> Candidatos para la próxima sesión, todos sin bloqueos: 6.1 (Bing Webmaster
> + revisión semanal de GSC), 2.4 (política de independencia — validar
> texto con el CEO antes de publicar) o revisar 8.1 (LCP móvil) con una
> medición limpia de PageSpeed Insights real.

---

## Estado por tarea

### Fase 0 — Arreglos urgentes
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 0.1 | Inicio: mostrar artículos reales, no programados | ✅ | `perspectivas-preview.tsx` ahora usa `blogPosts` |
| 0.2 | H1 del Inicio con espacios en el HTML | ✅ | Espacio final en `titleAccent`/`titleBold` (ES y EN) |
| 0.3 | Quitar redirección automática `/` → `/en` | ✅ | `src/lib/initial-language.ts` eliminado |
| 0.4 | 301 de URLs del sitio viejo | ✅ | 19 URLs 404 confirmadas por Search Console, mapeadas en `public/.htaccess` |
| 0.5 | `llms.txt` con URL vieja | ✅ | URL corregida + 3 artículos de Perspectivas añadidos (ES/EN) |
| 0.6 | Unificar cifras (países, industrias, 60%) | ⛔ | Falta confirmación del cliente |
| 0.7 | Tuteo → usted | ✅ | `contact-wizard.json`, `metodo-cira.json`, `route-meta.json` |
| 0.8 | Accesibilidad Método CIRA / Academy ≥ 95 | ✅ | Lighthouse: ambas rutas en 100/100 (antes 89/96) |
| 0.9 | Higiene del repo (`cyrruscs-dist/`, zip) | ⛔ | Decisión del dueño |

### Fase 1 — Arquitectura y navegación
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 1.1 | Menú por servicios | ✅ | `nav-config.ts` reestructurado: "Servicios" (Estrategia, Selección de Soluciones, Gerencia de Proyectos, Gestión del Cambio, IA), "Capacitación Ejecutiva", "Nosotros" (Quiénes Somos, Metodología CIRA, Experiencia), "Perspectivas" |
| 1.2 | Reordenar el Inicio | 🟡 | Orden nuevo aplicado y tab de Presencia Digital quitado; tabs de Servicios ampliadas de 3 a 6 (5 servicios + Academy). Sección "Casos destacados" sigue pendiente de 2.1 |
| 1.3 | Plantilla única de página de servicio | ⬜ | Es una guía para Fase 4, no una tarea propia — no se aplica hasta reescribir cada página de servicio |
| 1.4 | `/metodo-cira` como página de metodología | ✅ | Ya era en gran parte una página de metodología (4 fases con enlace a cada servicio); enlazada desde "Nosotros" en el menú (1.1) y ahora también desde `QuienesSomos.tsx` ("Conozca el Método CIRA..."); cada página de servicio ya enlaza de vuelta a `/metodo-cira` desde su breadcrumb (1.6) |
| 1.5 | Sacar Presencia Digital de consultoría | ⛔ | Hecho: sección "digitalGap" quitada de `PlaneacionEstrategica.tsx` + `estrategia.json` (ES/EN), enlace quitado del footer. Sigue bloqueado el destino final de las páginas `/presencia-digital/*` (decisión del cliente) |
| 1.6 | Breadcrumbs visibles | ✅ | Componente `Breadcrumbs` (`src/components/ui/breadcrumbs.tsx`) integrado en `PageHero`; aplicado a las 14 páginas de nivel 2+ que ya tenían `BreadcrumbList` en JSON-LD |

### Fase 2 — Prueba y confianza
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 2.1 | Casos de éxito `/casos` | ⛔ | Falta info y autorización de clientes. Se puede construir la plantilla |
| 2.2 | Equipo visible | ⛔ | Faltan datos del equipo |
| 2.3 | Quiénes Somos ampliado | ⛔ | Faltan historia y trayectoria |
| 2.4 | Política de independencia | ⬜ | Validar el texto con el CEO |
| 2.5 | Experiencia como hub | ⬜ | Depende de 0.6 y 2.1 |

### Fase 3 — Leadership Academy
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 3.1 | Ficha completa por taller | ⛔ | Faltan agenda, duración, facilitador, fechas |
| 3.2 | Coherencia del hub (hero, agrupación, CTA) | ✅ | Hero reescrito (ya no habla solo de "gobierno de IA"), talleres agrupados en 3 temas, CTA cambiado de "Agendar un taller" a "Solicitar taller in-company". De paso, corregido un bug real: la descripción de cada taller en el hub EN salía en español |
| 3.3 | Indexación de talleres | ⬜ | Por taller, cuando cumpla 3.1 |
| 3.4 | Captura de interesados | ✅ | Botón "Me interesa este taller" por taller (hub y ficha individual) abre el `ContactWizard` con el paso "Servicio" preseleccionado a ese taller exacto + evento `workshop_interest_click` |

### Fase 4 — Profundidad de servicios
| ID | Página | Estado | Notas |
|---|---|---|---|
| 4.1 | Estrategia | 🟡 | Ya era la página más completa (~1.490 palabras, FAQ con CTO as a Service y enlace al artículo de 5.2). Se añadió enlace a `/metodo-cira` en la intro (fase Construir), sección "Servicios relacionados" (ERP → PMO → Gestión del cambio, las 3 fases siguientes del método) y 1 FAQ nueva conectando estrategia con selección/implementación. Falta caso real (2.1) |
| 4.2 | Selección de soluciones (hub) | 🟡 | Enlace a `/metodo-cira` en la intro (fase Identificar) y sección "Servicios relacionados" (Estrategia, PMO, Gestión del cambio — las otras 3 fases del método) y 2 FAQ nuevas (alcance más allá de ERP, diferencia con integrador/distribuidor). Pasada adicional de copy: reescrito el hero, la intro, los 4 criterios de evaluación, "Nuestro reto" y los 6 beneficios quitando lenguaje de relleno ("garantizamos", "aseguramos", "visión integral") por afirmaciones concretas. Falta caso real (2.1) |
| 4.3 | Selección de software + ERP/CRM/HCM/EAM | 🟡 | Prioridad 1 de nicho. **Corrección:** la nota anterior decía que CRM/HCM/EAM solo heredaban "Servicios relacionados" sin FAQ propia — al revisar el archivo de nuevo (sesión de 4.8) resultó ser incorrecta: las 4 páginas (`seleccion-productos.json`) ya tenían contenido completo y distinto por producto (dolor, problema real, solución, evaluación, entregables) **y FAQ propia de 5-7 preguntas cada una**, más el enlace a `/metodo-cira` y "Servicios relacionados" que sí es compartido vía `SeleccionProducto.tsx`. 644-789 palabras por página, por debajo del rango orientativo de 1.000-1.800 de PLAN.md pero sin relleno. Falta caso real (2.1) |
| 4.4 | Tecnologías avanzadas / Infraestructura | 🟡 | Componente compartido `SolucionDetalle.tsx`. Enlace a `/metodo-cira` en la intro, sección "Servicios relacionados" (distinta por entrada: Tecnologías Avanzadas → Gobierno de IA/Automatizaciones/Gestión del cambio; Infraestructura → Arquitectura de IA/PMO/Gestión del cambio) y 3 FAQ nuevas por entrada con `FAQPage` JSON-LD (antes no tenía FAQ). Falta caso real (2.1) |
| 4.5 | Gerencia de proyectos (PMO) | 🟡 | Prioridad 2 de nicho. Enlace a `/metodo-cira` y al artículo "por qué fracasan los proyectos de transformación" en la intro, sección "Servicios relacionados" (ERP, Gestión del cambio, Automatización con IA) y 2 FAQ nuevas (duración, PMO as a Service). Falta caso real (2.1) |
| 4.6 | Gestión del cambio | 🟡 | Enlace a `/metodo-cira` en la intro (fase Adoptar), sección "Servicios relacionados" (Selección de ERP, Gerencia de Proyectos, Gobierno de IA) y 2 FAQ nuevas (adopción de ERP, diferencia con change management tradicional). Falta caso real (2.1) |
| 4.7 | Intelligence Lab + 3 subpáginas | 🟡 | Las más delgadas. Se corrigió un bug: el hub enlazaba a anclas `/metodo-cira#construir` etc. que no existían — ahora apuntan a las 4 páginas de servicio reales. Las 3 subpáginas (Gobierno de IA, Arquitectura de IA, Automatizaciones) suman sección "Servicios relacionados" cruzándose entre sí y hacia Gestión del cambio / Selección de ERP / Gerencia de Proyectos. Sigue pendiente ampliar la profundidad de contenido (palabras, FAQ nueva) y el caso real (2.1) |
| 4.8 | Sincronizar `route-meta.json` con `usePageMeta` | ✅ | Las 31 rutas reescritas con el título/descripción ES exacto que emite cada página hoy (confirmado que `title`/`description` en este archivo no se leen en runtime, solo las claves de ruta — ver bitácora) |

### Fase 5 — Contenido
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 5.1 | Autor real + página de autor | ⬜ | |
| 5.2 | Enlazado cluster ↔ pilar en los 3 artículos actuales | ✅ | Enlace pilar→artículo (sección "servicio relacionado" en `ArticuloPerspectiva.tsx`, dato en `blog-data.ts`) y artículo→pilar (link en `PlaneacionEstrategica`/`estrategia.json`, `GestionDelCambio`/`gestion-cambio.json`, `GobiernoDeIA`/`intelligence-lab.json`) en ambas direcciones, ES y EN. Ampliado (2026-09-18, a pedido del usuario, no una tarea numerada de PLAN.md): 2 tarjetas de conversión `ArticleServiceCta` insertadas a mitad de cada artículo, ofreciendo el servicio del que habla — ver bitácora |
| 5.3 | Publicación según calendario (2/mes) | 🟡 | 3 publicados (8, 10 y 12 de septiembre de 2026) |
| 5.4 | Estudio de datos propios | ⬜ | |

### Fase 6 — Autoridad externa
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 6.1 | Search Console + Bing Webmaster | 🟡 | GSC verificado y accesible (2026-09-18); falta Bing Webmaster y revisión semanal recurrente |
| 6.2 | Perfil de Empresa de Google | ⬜ | |
| 6.3 | Plan de backlinks (universidades, gremios, directorios) | ⬜ | |
| 6.4 | LinkedIn alineado | ⬜ | |

### Fase 7 — Medición
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 7.1 | Eventos GA4 del wizard y contenido | ✅ | `trackEvent()` en `analytics.ts`; eventos `wizard_open`, `wizard_step_complete`, `wizard_submit`, `wizard_book_call_click`, `video_play`, `article_read` (scroll 75%, `use-scroll-depth-event.ts`). Falta instrumentar clic en taller (no aplica hoy: todos están "Próximamente" sin link real — ver 3.1/3.3) |
| 7.2 | Tablero mensual de KPIs | ⛔ | GSC ya accesible; falta acceso a GA4 |

### Fase 8 — Rendimiento
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 8.1 | LCP móvil < 2,5 s en el Inicio | ⛔ | Medición real con PageSpeed Insights sobre producción (2026-09-18): LCP = 2,3 s, **meta ya cumplida** — pero esa lectura es de un build del 12-sep, sin el trabajo de Fase 3/4 de esta semana. No se puede cerrar la tarea con una lectura de código que no está desplegado. Bloqueado por el redeploy (ver Bloqueos) |
| 8.2 | Cabeceras de caché y seguridad | ✅ | Confirmadas en producción con `curl -I` tras el deploy del 23-sep. 2026-09-23: añadidas en `public/.htaccess` (HSTS 1 año sin includeSubDomains, nosniff, X-Frame-Options SAMEORIGIN, Referrer-Policy, Permissions-Policy) — el `.htaccess` sí se aplica en producción (los 301 de 0.4 funcionan). Falta confirmar con `curl -I` tras el deploy. Antes: depende del hosting (nginx). Revisado de paso en 8.1: los assets con hash ya tienen `Cache-Control: max-age=315360000` (10 años) — esa parte ya está bien. Falta revisar cabeceras de seguridad (HSTS, X-Content-Type-Options): no confirmadas |

### Fase 9 — Revisión posterior
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 9.1 | Reevaluar URLs `/servicios/...` | ⬜ | No antes de dic-2026 |
| 9.2 | Páginas por industria | ⬜ | Requiere ≥ 2 casos por industria |

---

## Bloqueos (insumos pendientes del cliente)

| Insumo | Solicitado | Recibido | Desbloquea |
|---|---|---|---|
| Acceso a Search Console | ✅ | ✅ (2026-09-18) | 0.4 ✅, 6.1 🟡 |
| Acceso a GA4 | ⬜ | ⬜ | 7.2 |
| Número real de países + industrias | ⬜ | ⬜ | 0.6, 2.5 |
| Fuente del "60%" o quitarlo | ⬜ | ⬜ | 0.6 |
| 3+ casos con cifras + autorización | ⬜ | ⬜ | 2.1, 1.2 |
| Datos del equipo | ⬜ | ⬜ | 2.2 |
| Historia de la empresa | ⬜ | ⬜ | 2.3 |
| Detalle de talleres | ⬜ | ⬜ | 3.1, 3.3 |
| Decisión Presencia Digital (a/b/c) | ⬜ | ⬜ | 1.5 |
| Decisión `cyrruscs-dist/` y zip | ⬜ | ⬜ | 0.9 |
| **Redeploy a producción** (el servidor sirve un build del 12-sep; falta subir el build actual, con todo el trabajo de Fase 3/4 de esta semana) | ✅ | ✅ (2026-09-23, bundle `index-DCHW-Og-.js` idéntico al build local) | 8.1 (cierre definitivo), y en general toda medición real de Fase 6/7/GSC sobre el trabajo de Fase 0-4 hecho después del 12-sep |

---

## Métricas registradas

| Fecha | Lighthouse móvil Inicio (Rend/Acc/SEO) | LCP | Páginas indexadas | Clics orgánicos (3 meses) | Notas |
|---|---|---|---|---|---|
| 2026-09-17 | 87 / 100 / 92 | 2,8 s | — | — | Línea base de la auditoría. Google aún muestra el sitio viejo |
| 2026-09-18 | — | — | 44 / 178 conocidas | 46 (1.840 impr., CTR 2,5 %, pos. media 14,7) | Primera lectura real de Search Console. Casi todo el tráfico es de marca ("cyrrus"); ver `docs/plan-mejora/datos/search-console-2026-09-18.md` |
| 2026-09-18 | 90 / — / — | 3,09 s | — | — | `node scripts/lh.mjs --runs 3` (mediana) en esta máquina/sesión, no comparable 1:1 con la línea base del 17-09 (otra máquina). El elemento LCP sigue siendo del hero (`min-h-screen`, la sección de tabs no entra en el viewport inicial) — no parece una regresión del reorden del Inicio, pero falta confirmar con PageSpeed Insights real antes de tocar 8.1 |
| 2026-09-18 | 65 / 100 / 92 | **2,3 s** | — | — | **PageSpeed Insights real sobre `cyrruscs.com` (no lab local)**, tarea 8.1. LCP ya cumple la meta (<2,5s), pero TBT = 1.700 ms y Speed Index = 5,5 s — mucho peor que los 106 ms de TBT del build local actual. Causa: el HTML servido tiene `Last-Modified: 12-sep-2026` (confirmado con `fetch` a las cabeceras) y el bundle JS (`index-CDnTzrKm.js`) no coincide con el hash del build local (`index-CqXVWnTH.js`) — producción no incluye el trabajo de Fase 3/4 de esta semana. Ver bitácora |

---

## Bitácora de sesiones

> Una entrada por sesión, la más reciente arriba. Formato:
> fecha · tareas trabajadas · qué se hizo (archivos) · verificación · qué quedó a medias · próximo paso.

### 2026-10-03 — Investigación de keywords por servicio, reajuste de títulos y H1, ampliación de páginas y 2 artículos (a pedido del usuario)
- **Hecho:**
  - Investigación Ubersuggest (ES; México, Colombia y España) de todos los servicios; resultados en `keywords-servicios.md` y `keywords-ranking.md`. Dominio: DA 13, ~8 visitas/mes. Cuota diaria agotada al final (no se midieron `togaf`, `consultoría en ciberseguridad`, `ley de inteligencia artificial`).
  - Títulos `<title>`, H1, meta descripciones y anclas internas de ~20 páginas alineados con la keyword principal (ES + `route-meta.json`); sin "Colombia". Reparto anti-canibalización: Tecnologías avanzadas = automatización de procesos/RPA; Automatizaciones = agentes de IA; hub de soluciones = consultoría tecnológica; selección de software = ERP/CRM; Estrategia = estratégica/planeación; Método CIRA = empresarial y de negocios.
  - Talleres: innovación, ISO 27001 y DRP renombrados; Presencia Digital: "Desarrollo Web para Empresas: Sitios Corporativos" (sin "agencia", por coherencia de marca).
  - Fase A del plan de contenido: Tecnologías avanzadas (314→~790 palabras), Automatizaciones (→~880), Arquitectura (→~750), Gestión del cambio (+ modelos ADKAR/Kotter/Lewin), hub de soluciones, taller de continuidad. FAQ "¿Qué es un ERP/CRM/HCM?" y de consultor SEO. Código: campo opcional `h1` y `body` en `SolucionDetalle.tsx`; icono de agente en `solutions-icons.ts`.
  - Artículos nuevos ES+EN: "Qué es un ERP" y "Qué es una PMO" (cada uno con mención del servicio y CTA de contacto al cierre).
  - Plan en `docs/plan-mejora/plan-contenido-prioritario.md`, con la **instrucción obligatoria**: todo artículo debe dar primero la información y cerrar mencionando que Cyrrus ofrece el servicio, con CTA de contacto.
- **Verificado:** `npm run build` (78/78 rutas) y consola limpia en las páginas y artículos tocados (ES y EN).
- **Pendiente / decisiones:** confirmar con el equipo que ADKAR/Kotter/Lewin se presenten así; revisar la traducción al inglés de los dos artículos; el inglés de las páginas no se tocó (mercado EN sin medir); artículos 3 a 17 del plan sin escribir; producción sigue desactualizada hasta el redeploy.
- **Próximo paso:** redeploy; artículo 3 (planeación estratégica); medir en Ubersuggest los términos pendientes cuando se reinicie la cuota.

### 2026-09-23 — Auditoría SEO+GEO del Inicio y correcciones (a pedido del usuario)
- **Tarea:** auditoría con la skill daniel-seo-audit sobre `cyrruscs.com/` en vivo
  (build del 18-sep, 45/70) y aplicación de todo lo que no requiere datos del cliente.
- **Hecho:**
  - Title/meta del Inicio sin "Colombia" (`home.json` ES/EN, `route-meta.json`,
    `index.html`): "Consultoría Estratégica con IA, hasta la ejecución | Cyrrus".
  - Bloque de entidad "Qué es Cyrrus" con H2 con keyword sobre las pestañas de
    servicios (`Home.tsx`); el título de cada pestaña pasa de H2 a H3
    (`tabbed-panels.tsx`).
  - FAQ de 8 preguntas en el Inicio (`FaqSection`) + `FAQPage` JSON-LD, ES y EN.
  - Footer con NAP visible: NIT, 2 oficinas, teléfono (`tel:`) y correo (`mailto:`),
    los mismos datos del JSON-LD (`footer.tsx`).
  - `meta robots` con `max-snippet:-1, max-image-preview:large` en todas las rutas
    indexables (`use-page-meta.ts` ahora siempre escribe la etiqueta).
  - `email` en el nodo Organization (`index.html`); línea del Inicio en `llms.txt`
    sin "Colombia y LATAM"; `robots.txt` con ChatGPT-User, Claude-SearchBot,
    Claude-User, Perplexity-User y Bingbot explícitos.
  - Cabeceras de seguridad en `.htaccess` (8.2).
  - `blog7.tsx`: tarjetas H3 bajo un H2 (Inicio) y H2 bajo el H1 (/perspectivas);
    "Ver todos los temas" ya no abre `/perspectivas` en pestaña nueva.
  - Badge circular del hero con `aria-hidden` (texto decorativo repetido).
- **Verificación:** `npm run build` (74/74 rutas) + `serve-dist`: consola limpia en
  `/`, `/en`, `/perspectivas`, `/metodo-cira/estrategia`; sin scroll horizontal a 375px.
- **Pendiente del cliente:** cifra real de países (+17 vs 10 del mapa vs 15 del schema,
  0.6), forma societaria para el footer, año de fundación (`foundingDate`), y una
  métrica real que sustituya "1 método de punta a punta" en la TrustBar.
- **Deploy confirmado (mismo día):** producción sirve el build nuevo (mismo hash de
  bundle), title/robots/FAQPage/NAP/cabeceras verificados en vivo, consola limpia en `/` y `/en`.
- **Próximo paso:** commit; Rich Results Test sobre la FAQ del Inicio; nueva
  medición de PageSpeed (8.1).

### 2026-09-22 — Equipo con nombre, enlazado blog→servicios, artículo de PMO y plan de autoridad externa (a pedido del usuario)
- **Tarea:** continuación de la entrada de abajo. El usuario pidió
  implementar: equipo con nombre y certificaciones en cada página de servicio,
  enlaces internos desde el blog, un artículo de apoyo por tema y el trabajo
  de enlaces externos.
- **Hecho:**
  - **Bloque "Quién lidera este servicio"** (`src/components/sections/service-lead.tsx`)
    en Estrategia, Gestión del cambio y PMO: Jackson Bohorquez con foto, rol,
    una bio específica por servicio (texto `lead` en los 3 JSON, ES/EN) y
    enlaces a `/quienes-somos` y LinkedIn. Las certificaciones salen de
    `src/lib/team.ts` (`credentials`). **Está vacío a propósito:** no hay
    ningún dato de PMP/Prosci en el sitio y no se inventó ninguno. Cuando se
    agregue uno verificado, aparece como insignia en las 3 páginas.
  - **Enlaces en el texto de los artículos:** `ArticuloPerspectiva.tsx` ahora
    admite `links` en los bloques `p` (`renderInline`, una sola cadena por
    tramo para no romper la hidratación). Se agregaron enlaces sobre frases
    que ya existían (no se reescribió el texto de Jackson): "Cómo elegir una
    consultora…" → estrategia y gestión del cambio; "Por qué fracasan…" y
    "Gobierno de IA…" → gestión del cambio. ES y EN.
  - **Artículo nuevo** `gerencia-de-proyectos-cuando-contratar-una-pmo-externa`
    (ES/EN, 41 bloques, portada `IMG_20230705_122802.jpg`, que no se usaba
    antes). Es el artículo de apoyo del pilar PMO, que no tenía ninguno.
    Tiene enlaces con el texto exacto a los 3 servicios y al artículo "Por qué
    fracasan…". Solo usa datos que ya están en el sitio (PMBOK, 3% de
    desviación, 2 personalizaciones del ERP). La página de PMO ahora enlaza a
    este artículo en lugar de "Por qué fracasan…".
  - **`docs/plan-mejora/autoridad-externa.md`:** datos NAP canónicos,
    descripciones listas para pegar, directorios en orden de prioridad,
    alianzas, plantilla de nota de prensa, LinkedIn y cómo medirlo en GSC.
    Esto lo tiene que ejecutar el equipo (crear cuentas, publicar).
  - `blog.json` se editó con un serializador que conserva el formato compacto
    (un bloque por línea), comprobado byte a byte contra HEAD.
- **Verificación:** `tsc -b`, `npm run build` (74/74 rutas), enlaces con la
  ruta del idioma correcto en el HTML estático (ES y EN), consola sin errores
  en el artículo nuevo, en las páginas de servicio y en `/perspectivas`, y
  revisión visual del bloque de equipo y de los enlaces en el texto.
- **Pendiente:** (1) **Jackson tiene que revisar el artículo nuevo** antes del
  redeploy: está escrito en primera persona con su firma, igual que los
  otros. (2) Certificaciones reales para `team.ts`. (3) Ejecutar
  `autoridad-externa.md`. (4) Redeploy.

### 2026-09-22 — On-page SEO de Estrategia, Gestión del cambio y PMO frente a EY / RSM (a pedido del usuario)
- **Tarea:** no es un ítem numerado de PLAN.md (encaja con Fase 4). El
  usuario compartió los SERP de "consultoría estratégica", "servicios gestión
  del cambio" y "servicios de gerencia de proyectos" (top: EY y RSM) y pidió
  mejorar las 3 páginas para competir. Regla nueva del usuario: **no usar
  "en Colombia"** en títulos/metas, porque Cyrrus tiene alcance internacional.
- **Hecho:**
  - Title, meta, H1 (`hero.title`) y `serviceType` con la búsqueda exacta
    en las 3 páginas, ES y EN (`locales/{es,en}/{estrategia,gestion-cambio,gestion-proyectos}.json`,
    `route-meta.json`, JSON-LD en los 3 `.tsx`).
  - Bloque de definición "¿Qué es / qué son los servicios de X?" cerca del
    inicio, redactado para que lo pueda citar la respuesta de IA de Google.
    Estrategia suma además "¿Para qué sirve la consultoría estratégica?".
    Componente nuevo `src/components/sections/service-definition.tsx`.
  - La lista "Alcance" pasó de viñetas sueltas a un H3 con descripción por
    servicio (el patrón de RSM). Componente nuevo `service-scope.tsx`.
    Estrategia: 5 servicios. PMO: 10 (se agregó PMO as a Service como
    servicio propio). Gestión del cambio: sección nueva con 8 servicios que
    no repiten los 4 pilares.
  - El H2 genérico "Agilidad, transformación y eficiencia" se reemplazó en
    las 3 páginas por "Beneficios de …". También se quitó la jerga en inglés
    del texto en español ("Change Management", "Strategy/Select/Project
    Management").
  - FAQ: en Estrategia, "¿Qué es la Estrategia?" pasó a "¿Qué diferencia a
    Cyrrus de una consultora estratégica tradicional?". Se agregaron "¿Qué
    incluyen los servicios de gestión del cambio?" y "¿Gerencia vs.
    gestión de proyectos?" (esta última solo en ES).
  - Se quitó "en Colombia" del title y la meta de la home (ES y EN) y de las
    metas de PMO y Gestión del cambio.
- **Verificación:** `tsc -b`, `npm run build` (72/72), `dist` servido: title,
  H1 y H2 correctos en el HTML estático y consola sin errores de hidratación
  en las 3 rutas ES y EN y en `/`. Se revisó el layout de las secciones
  nuevas en ancho angosto y a 1280px.
- **Pendiente:** (1) **Canibalización:** la home sigue apuntando a
  "Consultoría Estratégica con IA" y compite con `/metodo-cira/estrategia`.
  Hay que revisar en GSC qué URL recibe hoy impresiones para esa búsqueda
  antes de cambiar el title de la home. (2) ~~`areaServed`~~ resuelto en la
  misma sesión: el usuario eligió `"Worldwide"`. Se cambió en los 17 `.tsx`
  con schema `Service` y en el `contactPoint` de `index.html`. Se dejó la
  lista explícita de 16 países/regiones del `Organization` de `index.html`,
  porque es un dato más preciso. (3) Nombrar marcos (ADKAR/Prosci, Kotter)
  y certificaciones (PMP) solo si el equipo de verdad los usa o los tiene;
  no se inventó nada. (4) Casos con nombre y equipo con credenciales
  (bloqueado por 2.1). (5) Todo esto necesita redeploy para contar.

### 2026-09-22 — Cambio de portada del artículo de transformación digital (a pedido del usuario)
- **Tarea:** no es un ítem de PLAN.md. El usuario señaló la foto de portada
  del artículo "Por qué fracasan los proyectos de transformación digital"
  (`IMG_20240822_085440_710.jpg`, un gafete de nombre "Jackson Bohorquez" en
  una mesa de evento) y pidió quitarla de toda la página y reemplazarla.
- **Hecho:** `src/lib/blog-data.ts` — `coverImage` de ese post cambiado a
  `/assets/decoracion/1785866331023.jpg` (foto de escritorio con monitores
  mostrando el sitio de Cyrrus). Se eligió reutilizando la misma imagen que
  ya representa la fase "Adoptar" (Gestión del Cambio) en `MetodoCira.tsx` —
  coherente porque ese es justamente el pilar de este artículo. Confirmado
  con grep que la foto retirada solo se usaba en ese único campo (no había
  otro sitio en `src/` que la referenciara); no se borró el archivo de
  imagen original, solo se dejó de usar.
- **No tocado:** el archivo de imagen en sí sigue en `public/assets/
  decoracion/` por si se necesita después; no se tocó ningún otro post.
- **Verificación:** `tsc --noEmit` + `npm run build` (72/72 rutas) +
  navegador embebido: portada nueva visible en la ficha del artículo
  (`/perspectivas/por-que-fracasan-...`) y en el listado de `/perspectivas`,
  consola limpia.
- **Próximo paso:** el de la sesión de 8.1 sigue vigente (coordinar el
  redeploy) — este cambio también quedó fuera de producción hasta que se
  suba el build.

### 2026-09-18 — Tarjetas de conversión a mitad de artículo en Perspectivas (ampliación de 5.2, a pedido del usuario)
- **Tarea:** no es un ítem numerado de PLAN.md — el usuario pidió directamente
  "en todos los artículos de blog pon dos secciones ofreciendo el servicio
  del cual está hablando el artículo de blog", mostrando como referencia
  visual una tarjeta de otro sitio (fondo oscuro, checklist, imagen, botón).
  Se implementó adaptando ese patrón a la identidad de Cyrrus (navy/cyan en
  vez de negro/rojo) sobre los 3 artículos existentes.
- **Diseño:** nuevo componente `ArticleServiceCta`
  (`src/components/sections/article-service-cta.tsx`) — tarjeta navy con
  borde izquierdo cyan, título, descripción, 2 bullets con `CheckCircle2`
  (mismo patrón que los bullets del hero de Estrategia) y un `BorderButton`
  que enlaza a la página real del servicio del que habla el artículo (el
  mismo `pillarHref` que ya usa la tarjeta "Servicio relacionado" del
  sidebar desde 5.2), más una imagen a la derecha (`<Img>`) tomada de la
  propia página del servicio para que la foto combine con el destino del
  enlace. No usa `AnimatedNavyBackground` porque no es una sección a sangre
  completa — es una tarjeta contenida dentro de la columna de 8/12 del
  cuerpo del artículo (la regla de CLAUDE.md aplica a secciones full-bleed).
- **Dónde se insertan:** cada artículo tiene exactamente 2 tarjetas, en
  índices de bloque fijos (`serviceCtaIndexes` en `blog-data.ts`,
  compartidos entre ES/EN porque `body` tiene la misma longitud y secuencia
  de tipos en ambos idiomas — verificado con un script antes de fijar los
  índices) elegidos justo antes de un `h2` existente, cerca del tercio y
  las dos terceras partes del artículo, para que la tarjeta lea como un
  corte de sección y no como una interrupción a mitad de párrafo. En el
  artículo de transformación digital, la primera tarjeta cae justo antes de
  "El cuarto error: dejar la gestión del cambio para el final" — coincide
  con el tema de la tarjeta (Gestión del Cambio) casi por definición, dado
  que ese es el pilar del artículo.
- **Hecho (archivos):**
  - `src/components/sections/article-service-cta.tsx`: componente nuevo.
  - `src/lib/blog-data.ts`: `BlogPostEntry` gana `serviceCtaIndexes: [number,
    number]` y `serviceCtaImages: [string, string]` (2 imágenes por
    artículo, reutilizadas de la página del servicio real — sin fotos
    nuevas, todas ya tenían derivados WebP optimizados).
  - `src/pages/ArticuloPerspectiva.tsx`: `BlogPostTranslation` gana
    `serviceCtas: [BlogServiceCta, BlogServiceCta]`; el `.map` sobre
    `tr.body` pasó a `.flatMap` para poder intercalar la tarjeta en el
    índice correspondiente sin envolver todo en un `Fragment` con key.
  - `src/i18n/locales/{es,en}/blog.json`: bloque `serviceCtas` (2 objetos:
    title/description/checklist/ctaLabel/imageAlt) añadido a los 3 posts,
    en ambos idiomas — copy nueva, sin relleno corporativo (mismo criterio
    de 4.2), en primera persona/tono directo consistente con el resto del
    artículo.
- **No tocado:** el contenido narrativo existente de los 3 artículos (no se
  reescribió ningún párrafo); `blog-data.ts` no ganó artículos nuevos, solo
  campos en los 3 existentes.
- **Verificación:** `node -e` para validar JSON + confirmar que `body` tiene
  la misma longitud/secuencia de tipos ES/EN antes de fijar los índices +
  `npx tsc --noEmit` limpio + `npm run build` (72/72 rutas) + navegador
  embebido: los 3 artículos en ES y en EN (`/en/perspectivas/...`), consola
  limpia en los 6. Confirmado con JS en la página en vivo que el grid
  interno de la tarjeta sí pasa a 2 columnas en desktop (299px + 299px,
  medido con `getBoundingClientRect`, no solo por captura de pantalla — la
  captura del panel salió con un artefacto de escalado que parecía mostrar
  las columnas apiladas y llevó a verificar dos veces) y en 1 columna en
  móvil; confirmado que los 6 botones (2 por artículo × 3 artículos)
  resuelven al `pillarHref` correcto, incluida la ruta con `/en/` prefijado;
  confirmado con `fetch()` que las 6 imágenes (2 por artículo, reutilizadas
  de las páginas de servicio) devuelven 200.
- **Quedó a medias:** nada de lo iniciado. Al publicar futuros artículos
  (5.3), habrá que añadir su propio `serviceCtaIndexes`/`serviceCtaImages`/
  `serviceCtas` siguiendo el mismo patrón — no quedó automatizado.
- **Próximo paso:** el de la sesión de 8.1 sigue vigente (coordinar el
  redeploy); alternativamente, con el dist ya reconstruido tras este cambio,
  conviene generar un zip nuevo antes de desplegar para no perder este
  trabajo también.

### 2026-09-18 — Fase 8: medición real de LCP (8.1) — hallazgo de despliegue desactualizado
- **Tarea:** 8.1 — sin bloqueos, uno de los tres candidatos de la sesión
  anterior (junto a 6.1 y 2.4).
- **Punto de partida:** PLAN.md pedía "medir tras cada fase grande con
  PageSpeed Insights", pero hasta ahora solo se había medido con
  `node scripts/lh.mjs` (Lighthouse local contra `dist/` servido por
  `serve-dist.mjs`), cuyo propio comentario advierte que "los números
  absolutos no van a coincidir con PageSpeed (máquina y red distintas)".
  Nunca se había corrido una medición real contra `cyrruscs.com`.
- **Hecho:**
  1. Se corrió PageSpeed Insights real (navegador embebido,
     `pagespeed.web.dev`, perfil móvil) contra `https://cyrruscs.com/` →
     Performance 65, **LCP 2,3 s** (ya cumple la meta <2,5s), TBT 1.700 ms,
     Speed Index 5,5 s.
  2. El TBT de 1.700 ms no cuadraba con los 100-180 ms que reporta
     `PROGRESO.md` de sesiones de performance anteriores (Fase 0), así que
     se investigó la causa en vez de aceptar el número: se corrió
     `npm run build` local (build limpio con el código actual) y
     `node scripts/lh.mjs --runs 3`, que dio TBT = 106 ms — coherente con
     el trabajo ya hecho en `ShaderHero` (mount diferido, límites de
     `minPixelRatio`/`maxPixelCount`, animación pausada fuera de vista).
  3. Se comparó el hash del bundle: local genera `index-CqXVWnTH.js`;
     producción sirve `index-CDnTzrKm.js` — **no son el mismo build**.
  4. Se confirmó con `fetch()` a las cabeceras HTTP reales de
     `cyrruscs.com`: `Last-Modified: Sat, 12 Sep 2026 18:17:42 GMT` tanto
     en el HTML como en el JS principal. El repo tiene commits de hoy
     (3.2, 3.4, 4.8) y de sesiones de esta semana (4.1-4.7, "Fondo blanco y
     rediseño") que **no están en producción**. Se verificó además
     navegando a `/metodo-cira/estrategia` en vivo: falta la sección
     "Servicios relacionados" y la 6ª FAQ que se añadieron en la tarea 4.1
     — confirma visualmente el desfase, no solo por cabeceras.
  5. De paso (sin ser el foco de 8.1): se confirmó que los assets con hash
     ya tienen `Cache-Control: max-age=315360000` en producción — la parte
     de caché de 8.2 ya está resuelta del lado del hosting; falta revisar
     cabeceras de seguridad (HSTS, etc.), no confirmadas.
- **No tocado:** ningún archivo de código — el hallazgo hace que cualquier
  cambio de performance adicional sea prematuro hasta que se sepa si el
  build actual, una vez desplegado, ya cumple la meta (todo indica que sí,
  dado que el build stale de hace 6 días ya la cumple y el local es
  bastante mejor en TBT).
- **Verificación:** la propia medición de PSI + comparación de hashes +
  cabeceras HTTP + lectura del HTML en vivo son la verificación. No se
  corrió `npm run build && node scripts/serve-dist.mjs` como cierre porque
  no hubo cambio de código que verificar.
- **Quedó a medias:** 8.1 no se puede cerrar como "hecho" sin una medición
  de PSI real *después* del redeploy — queda como bloqueado, no completado,
  aunque todo apunta a que ya cumple la meta.
- **Próximo paso:** coordinar con el dueño el redeploy del build actual a
  producción (ver Bloqueos). Una vez desplegado, repetir la medición de PSI
  real en 8.1 para cerrarla formalmente. Mientras tanto, los otros dos
  candidatos sin bloqueos de la sesión anterior siguen disponibles: 6.1
  (Bing Webmaster) o 2.4 (política de independencia).

### 2026-09-18 — Fase 3: captura de interesados por taller (3.4)
- **Tarea:** 3.4 — sin bloqueos, siguiente candidato de la sesión anterior.
- **Punto de partida:** el wizard de contacto (`ContactWizardModal`) ya tenía
  un paso "Servicio" con un `<select>`, pero Leadership Academy solo tenía
  **una** opción genérica en él (`leadership-academy-gestion-cambio`, un
  valor stale sin relación real con ningún taller) — no existía forma de que
  un visitante indicara interés en un taller *específico*. Las 7 tarjetas del
  hub tampoco eran clicables (`ComingSoon`, deliberado: no hay fecha/agenda
  real que mostrar — bloqueado por 3.1) y las fichas individuales
  (`CursoDetalle.tsx`, noindexadas pero alcanzables por URL directa) solo
  tenían el `FinalCta` genérico del sitio al final.
- **Diseño elegido:** no tocar `ComingSoon` (sigue bloqueando la navegación a
  la ficha del taller, correcto mientras no haya contenido real) — en su
  lugar, añadir un botón de texto **"Me interesa este taller →"** aparte,
  fuera del wrapper `ComingSoon`, en cada tarjeta del hub y en la ficha
  individual. El botón abre el wizard existente con el paso "Servicio" ya
  preseleccionado a ese taller exacto, en vez de crear un formulario nuevo
  — más barato de mantener y consistente con "puede ser un paso del
  ContactWizard con el taller preseleccionado" de PLAN.md 3.4.
- **Hecho (archivos):**
  - `src/lib/contact-wizard-context.tsx`: `openWizard()` ahora acepta un
    `prefill?: Record<string, string>` opcional, expuesto en el contexto
    junto a `isOpen`; se pasa a `trackEvent("wizard_open", ...)` para que
    quede el servicio de origen en el evento existente.
  - `src/components/contact-wizard/contact-wizard-modal.tsx`: nuevo
    `useEffect` que reseedea `values` con `{ ...emptyValues(), ...prefill }`
    cada vez que `isOpen` pasa a `true` (no en cada render, para no pisar lo
    que el usuario esté escribiendo).
  - `src/lib/contact-wizard-config.ts`: el grupo "Leadership Academy" del
    `<select>` ahora se genera iterando `workshops` de `workshops-data.ts`
    (7 opciones, valores `leadership-academy-<slug>`) en vez de la única
    opción manual anterior — si se agrega un taller nuevo a
    `workshops-data.ts`, aparece solo en el dropdown (falta añadir su label
    en `contact-wizard.json`, ver abajo).
  - `src/i18n/locales/{es,en}/contact-wizard.json`: 7 labels nuevas bajo
    `steps.servicio.options` (una por taller, texto = título exacto del
    taller), reemplazando la única label `gestionCambio` que sobraba.
  - `src/pages/LeadershipAcademy.tsx`: cada tarjeta de taller separa ahora el
    contenido bloqueado (`ComingSoon`) del nuevo botón de interés
    (`handleWorkshopInterest`, fuera del wrapper); dispara
    `trackEvent("workshop_interest_click", { workshop: slug })` y
    `openWizard({ servicio: "leadership-academy-<slug>" })`.
  - `src/pages/leadership-academy/CursoDetalle.tsx`: mismo patrón — botón
    `BorderButton` añadido tras el cuerpo del taller, antes del `FinalCta`
    genérico.
  - `src/i18n/locales/{es,en}/leadership-academy.json`: nueva clave
    `hub.workshopsSection.interestCta` ("Me interesa este taller →" /
    "I'm interested in this workshop →"), reutilizada en ambas páginas.
  - `src/components/ui/contact-cta-button.tsx`: nuevo prop opcional
    `prefill`, pasado a `openWizard()` — no usado todavía por ningún caller,
    pero deja el componente compartido listo para el mismo patrón en otra
    página sin duplicar lógica.
- **Rotura de tipos encontrada y corregida (no relacionada con el diseño,
  efecto colateral de cambiar la firma de `openWizard`):** los 4 sitios que
  pasaban `onClick={openWizard}` directo a un `<button>`/`BorderButton`
  nativo (`site-header.tsx`, `transparent-header.tsx`, `final-cta.tsx`,
  `footer.tsx`) dejaron de tipar — TS intentaba unificar el
  `MouseEvent` del navegador con el nuevo parámetro `prefill?`. Corregido
  envolviendo cada uno en `onClick={() => openWizard()}` (comportamiento
  idéntico, ahora sin ambigüedad de tipos). `npx tsc --noEmit` no lo había
  detectado — sí `npm run build` (usa `tsc -b`, distinta configuración) —
  lección: para este repo, `npm run build` es la verificación de tipos que
  realmente hay que correr, no solo `tsc --noEmit`.
- **No tocado:** `ComingSoon` en sí (sigue bloqueando el link a la ficha);
  el `<select>` de "Método CIRA" y el resto de grupos (solo se tocó
  "Leadership Academy"); ningún dato de `workshops-data.ts` ni fecha/agenda
  real (eso es 3.1, sigue bloqueado).
- **Verificación:** `npx tsc --noEmit` limpio + `npm run build` (72/72 rutas,
  falló primero por los 4 sitios de arriba, corregido y re-verificado) +
  navegador embebido en `/leadership-academy`, `/leadership-academy/
  iso-27001` y `/en/leadership-academy/iso-27001`: consola limpia en las 3.
  Con un `window.gtag` de prueba inyectado por consola, confirmado que el
  clic en "Me interesa este taller" dispara `workshop_interest_click` con el
  slug correcto seguido de `wizard_open` con el `servicio` correcto, que el
  `<select>` del wizard llega ya con esa opción seleccionada (probado con 2
  talleres distintos para descartar que siempre cayera en el mismo valor) y
  que el CTA genérico del sitio (sin `prefill`) sigue abriendo el wizard con
  "Seleccione un servicio" vacío, sin regresión.
- **Quedó a medias:** nada de lo iniciado.
- **Próximo paso:** ver "Próximo paso" arriba — 6.1 (Bing Webmaster), 2.4
  (política de independencia) u 8.1 (LCP con medición limpia) son los
  candidatos sin bloqueos.

### 2026-09-18 — Fase 3: coherencia del hub de Leadership Academy (3.2) + auditoría de Fase 4
- **Tarea:** 3.2 — sin bloqueos, se pasó a Fase 3 tras confirmar (ver abajo)
  que Fase 4 ya no tenía huecos reales de enlazado/FAQ.
- **Antes de tocar código:** al ir a elegir "el siguiente candidato" de Fase
  4 que la sesión anterior había anotado (profundizar CRM/HCM/EAM sin FAQ
  propia), se leyó `seleccion-productos.json` directamente en vez de confiar
  en la nota — **la nota era incorrecta**: CRM/HCM/EAM ya tenían contenido
  completo y distinto por producto (dolor, problema real, solución,
  evaluación, entregables, 5-7 FAQ cada una) desde antes de que existiera
  este plan, y heredan el enlace a `/metodo-cira` y "Servicios relacionados"
  del componente compartido `SeleccionProducto.tsx`. Se corrigió la tabla de
  4.3. Se revisó también `seleccion-de-software.json` (hub bespoke) e
  `intelligence-lab.json` (arquitectura/automatizaciones) por la misma
  razón — ambas ya tenían FAQ propia (4-5 ítems) y enlazado completo. Todo
  Fase 4 quedó confirmado como funcionalmente cerrado; lo único que falta es
  contenido por debajo del rango orientativo de palabras y el caso real
  (2.1, bloqueado) — no se persiguió el conteo de palabras por sí solo (ver
  Próximo paso).
- **Hecho (3.2, archivos):**
  - `src/i18n/locales/{es,en}/leadership-academy.json`: `hub.hero.title` y
    `hub.hero.description` reescritos — ya no hablan solo de "gobierno de
    IA" (la oferta real cubre IA, seguridad ISO 27001, continuidad DRP,
    gestión del cambio y gobierno de datos); `hub.serviceDescription` /
    `serviceDetail` (usados en el JSON-LD `Service`) actualizados igual;
    `hub.workshopsSection.ctaLabel` cambiado de "Agendar un taller" /
    "Schedule a workshop" a "Solicitar taller in-company" / "Request an
    in-company workshop" — los 7 talleres siguen `comingSoon: true`, un CTA
    de "agendar" sobre algo sin fecha real era engañoso (criterio explícito
    de PLAN.md 3.2); nuevo bloque `hub.groups` (3 claves: `iaDatos`,
    `seguridadContinuidad`, `liderazgoCambio`).
  - `src/pages/LeadershipAcademy.tsx`: los 7 talleres ahora se renderizan en
    3 secciones agrupadas por tema (`WORKSHOP_GROUPS`, mapa fijo
    slug→grupo) en vez de una grilla plana de 7 tarjetas — mismo criterio de
    agrupación que sugiere PLAN.md (IA y datos · Seguridad y continuidad ·
    Liderazgo y cambio).
- **Bug real encontrado y corregido de paso (no estaba en el alcance de
  3.2, pero estaba en el mismo archivo y bloque de código que se estaba
  tocando):** la descripción de cada taller en la grilla del hub salía
  de `w.intro` — el dato crudo de `workshops-data.ts`, que solo existe en
  español — en vez de `workshopTranslations[w.slug].intro` (la traducción
  real). Efecto: en `/en/leadership-academy`, el título de cada tarjeta
  salía en inglés pero el párrafo de abajo en español. Corregido cambiando
  la fuente a la traducción; interfaz `WorkshopTranslation` ampliada con
  `intro: string`.
- **No tocado (flagueado para sesión aparte vía `spawn_task`):** dos bugs
  de i18n más, encontrados al verificar la página en inglés pero fuera del
  archivo/alcance de 3.2 — (1) `workshop-orbit.tsx:128`, el pill "Ver
  taller" del carrusel del hero es un string en español hardcodeado, sin
  traducción; (2) `contact-cta-button.tsx:12`, el label por defecto del
  botón de contacto (`"Agendar conversación"`) es español hardcodeado —
  cualquier página que use `<ContactCtaButton />` sin `label` explícito
  muestra este texto también en `/en/...`. Requiere auditar todos los usos
  del componente antes de decidir si se arregla en el componente o en cada
  caller — se dejó como tarea separada para no mezclar alcance.
- **Verificación:** `npx tsc --noEmit` limpio + `npm run build` (72/72
  rutas) + navegador embebido en `/leadership-academy` y
  `/en/leadership-academy`: consola limpia en ambas, confirmado por
  `get_page_text` que los 3 grupos, el hero nuevo, el CTA nuevo y (tras el
  fix del bug) las descripciones de taller en inglés se renderizan
  correctamente. Primer intento con un typo (`t("groups...")` sin el
  prefijo `"hub."`) mostró literalmente `GROUPS.IADATOS` en pantalla —
  detectado y corregido antes de dar la tarea por terminada.
- **Quedó a medias:** nada de lo iniciado. Los dos bugs de i18n de arriba
  quedaron flageados, no arreglados.
- **Próximo paso:** ver "Próximo paso" arriba — 3.4 (captura de
  interesados), 6.1 (Bing Webmaster), 2.4 (política de independencia) u
  8.1 (LCP) son los candidatos sin bloqueos.

### 2026-09-18 — Fase 4: sincronización de `route-meta.json` (4.8)
- **Tarea:** 4.8 — última pendiente de la parte técnica de Fase 4, sin
  bloqueos ("mecánico" según el Próximo paso de la sesión anterior).
- **Hallazgo antes de tocar nada:** `title`/`description` en
  `src/lib/route-meta.json` **no se leen en ningún momento en runtime** —
  confirmado con grep sobre `scripts/generate-sitemap.mjs`,
  `scripts/prerender.mjs` y todo `src/`. Los dos scripts solo usan
  `Object.keys(routeMeta)` para construir la lista de rutas a prerenderizar
  y a incluir en el sitemap; el texto de cada entrada es puramente
  documentación para quien lee el archivo. Por eso llevaba varias sesiones
  desincronizado sin que nadie lo notara ni afectara SEO real (el meta real
  siempre salió de `usePageMeta` en cada página, vía los JSON de i18n).
- **Hecho:** reescritas las 31 entradas de `route-meta.json` con el
  `title`/`description` ES exacto que emite hoy `usePageMeta` en cada
  página — generado programáticamente leyendo los mismos archivos i18n que
  leen los componentes (`home.json`, `metodo-cira.json`, `estrategia.json`,
  `seleccion-soluciones.json` (`meta` + `detailMeta`), `seleccion-de-
  software.json`, `seleccion-productos.json` (erp/crm/hcm/eam), `gestion-
  proyectos.json`, `gestion-cambio.json`, `intelligence-lab.json`
  (`hub`/`automatizaciones`/`arquitectura`/`gobierno`), `presencia-
  digital.json` (`hub`/`desarrolloWeb`/`seo`), `leadership-academy.json`
  (`hub` + los 7 `workshops.<slug>` — título construido igual que
  `CursoDetalle.tsx`: `` `${tr.title} | Cyrrus` `` y descripción =
  `tr.intro`, no `tr.shortDescription`, que es solo la leyenda corta de la
  card del hub — confirmado en `LeadershipAcademy.tsx`) y `paginas.json`
  (`quienesSomos`/`experiencia`/`perspectivas`) — para evitar transcribir a
  mano y arrastrar un typo. Casi todas las 31 entradas cambiaron: solo
  `/metodo-cira/estrategia` (título), los 4 títulos de
  ERP/CRM/HCM/EAM, `/presencia-digital/desarrollo-web` (título),
  `/quienes-somos` (título+descripción) y las 2 de 4.4 (recién creadas en
  la sesión anterior) ya coincidían.
- **No tocado:** ninguna página ni copy real — este archivo no alimenta lo
  que ve el usuario ni Google. Tampoco se cambió la lista de claves (rutas)
  del archivo, solo el texto de cada una.
- **Verificación:** `npx tsc --noEmit` limpio + `npm run build` (72/72
  rutas prerenderizadas, mismo conteo que antes — confirma que la lista de
  rutas no cambió) + `git status` tras el build: `public/sitemap.xml` y
  `src/lib/sitemap-content-hashes.json` **no cambiaron** esta vez (a
  diferencia de la sesión de 4.4), consistente con que el sitemap se genera
  solo de las claves de ruta + `blog-data.ts` + slugs de soluciones/talleres,
  no del texto de `route-meta.json`.
- **Quedó a medias:** nada de lo iniciado.
- **Próximo paso:** ver "Próximo paso" arriba — CRM/HCM/EAM (FAQ propia,
  mismo componente que ya tiene el enlazado de 4.3) es el siguiente
  candidato de contenido en Fase 4, o cambiar a Fase 3/Fase 6 si se prefiere.

### 2026-09-18 — Fase 4: enlazado interno y FAQ ampliada en Tecnologías avanzadas / Infraestructura (4.4)
- **Tarea:** 4.4 (`/metodo-cira/seleccion-de-soluciones/tecnologias-avanzadas` e
  `/infraestructura-tecnologica`), siguiente en la cola tras cerrar 4.2 en la
  sesión anterior — cierra la parte de contenido de Fase 4 sobre el mismo JSON
  `seleccion-soluciones` que el hub.
- **Punto de partida:** ambas páginas comparten el componente
  `SolucionDetalle.tsx` (hero, grid "¿qué ayudamos a seleccionar?", stat
  opcional — ninguna de las dos lo usa — y cita de cierre). No tenían FAQ,
  sección "Servicios relacionados" ni enlace explícito a `/metodo-cira` — el
  único enlazado era el breadcrumb (Inicio → Método CIRA → hub → entrada).
- **Hecho (archivos):**
  - `src/pages/metodo-cira/SolucionDetalle.tsx`: nuevo párrafo con enlace en
    línea a `/metodo-cira` tras el grid de items ("Esta selección forma parte
    de la fase Identificar..."); nueva sección "Servicios relacionados" (3
    cards con `Link`, distinta por `slug` vía un mapa `relatedPathsBySlug`) y
    `FaqSection` con las FAQ propias de cada entrada; `FAQPage` JSON-LD
    añadido al bloque existente de `Service` + `BreadcrumbList`.
  - `src/lib/solutions-icons.ts`: nuevo `solutionRelatedIcons` (mapa
    slug → 3 iconos, paralelo a `solutionItemIcons`).
  - `src/i18n/locales/{es,en}/seleccion-soluciones.json`: bajo `detail`,
    nuevas claves `methodLinkText/methodLinkLabel/relatedEyebrow/
    relatedTitle/faqTitle`; cada entrada (`tecnologias-avanzadas`,
    `infraestructura-tecnologica`) suma `related` (3 items) y `faq` (3
    preguntas). Enlazado elegido por entrada: **Tecnologías Avanzadas** →
    Gobierno de IA, Automatización con agentes de IA, Gestión del cambio;
    **Infraestructura Tecnológica** → Arquitectura de IA, Gerencia de
    proyectos (PMO), Gestión del cambio. Las FAQ no inventan cifras (D4) —
    cubren alcance de la selección, qué pasa si ya hay proveedor elegido y
    quién gestiona la implementación después.
- **No tocado:** `entry.stat` (ninguna de las dos entradas lo usa, se dejó tal
  cual); `closingQuote` (global, no por entrada, ya se documentó en la sesión
  de 4.2 que solo lo usa este componente).
- **Verificación:** `npx tsc --noEmit` limpio + `npm run build` (72/72 rutas)
  + navegador embebido en `/metodo-cira/seleccion-de-soluciones/
  tecnologias-avanzadas`, `/infraestructura-tecnologica` y sus versiones
  `/en/...`: consola limpia en las 4. Confirmado por `get_page_text` que el
  contenido nuevo (enlace al método, servicios relacionados, FAQ) se renderiza
  en ambos idiomas, y por JS en la página en vivo que los enlaces de
  "Servicios relacionados" de Infraestructura resuelven a
  `/intelligence-lab/arquitectura-de-ia`, `/metodo-cira/gestion-de-proyectos`,
  `/metodo-cira/gestion-del-cambio` — rutas reales, no inventadas.
- **Quedó a medias:** caso real (2.1, bloqueado). No se amplió el cuerpo
  narrativo de cada entrada (el grid de items ya era específico y correcto,
  igual que se decidió para Intelligence Lab en 4.7) — el gap era enlazado y
  FAQ, no profundidad de prosa.
- **Próximo paso:** 4.8 (sincronizar `route-meta.json`) para cerrar la parte
  técnica de Fase 4, o profundizar CRM/HCM/EAM y Arquitectura de IA/
  Automatizaciones (contenido "—" en la tabla de PLAN.md, con enlazado ya
  hecho pero sin FAQ ampliada propia).

### 2026-09-18 — Fase 4: enlazado interno y FAQ ampliada en el hub de Selección de soluciones (4.2)
- **Tarea:** 4.2 (hub `/metodo-cira/seleccion-de-soluciones`), siguiente en
  la cola tras cerrar 4.7 en esta misma sesión — completa el enlazado entre
  las 4 páginas troncales del método (Estrategia, este hub como fase
  Identificar, PMO, Gestión del cambio).
- **Punto de partida:** la página ya tenía casi todos los bloques (intro,
  4 criterios de evaluación, reto/solución, 6 beneficios, 3 categorías con
  imagen, 4 servicios, las 12 etapas del proceso, FAQ con 4 preguntas y
  `FAQPage` JSON-LD) — ~845 palabras según PLAN.md. Le faltaba, igual que a
  las demás: enlace explícito a `/metodo-cira` y sección "Servicios
  relacionados".
- **Hecho (archivos):**
  - `src/pages/metodo-cira/SeleccionDeSoluciones.tsx`: nuevo enlace en línea
    en la intro ("Esta es la fase Identificar dentro del Método CIRA
    completo", mismo patrón que 4.1/4.3/4.5/4.6) y nueva sección "Servicios
    relacionados" con las otras 3 fases del método — Estrategia (Construir),
    PMO/Gerencia de proyectos (Realizar), Gestión del cambio (Adoptar) —
    mismo patrón visual que el resto (cards con icono, `Link`, "Ver más →").
  - `src/i18n/locales/{es,en}/seleccion-soluciones.json`: nuevas claves
    `intro.methodLinkText/methodLinkLabel`, 2 FAQ nuevas ("¿solo ayudan a
    elegir ERP o también otras tecnologías?" y "¿en qué se diferencia esto de
    un integrador o distribuidor de software?") y bloque `related`
    (eyebrow/title/items).
- **No tocado:** el bloque `detail`/`detailMeta` del mismo archivo JSON
  (contenido de Tecnologías Avanzadas e Infraestructura, componente
  `SolucionDetalle.tsx`) — es la tarea 4.4, no esta sesión. La página no
  recibe enlaces entrantes nuevos: Estrategia/PMO/Cambio ya enlazaban a la
  página específica de ERP (decisión de nicho de sesiones previas), no al
  hub — no se cambió ese criterio.
- **Verificación:** `npx tsc --noEmit` limpio + `npm run build` (72/72
  rutas) + navegador embebido en `/metodo-cira/seleccion-de-soluciones` y
  `/en/metodo-cira/seleccion-de-soluciones`: consola limpia. Confirmado por
  JS en la página en vivo que los 4 enlaces nuevos (`/metodo-cira`,
  Estrategia, PMO, Gestión del cambio, y sus equivalentes `/en/...`)
  resuelven a rutas reales del sitio.
- **Quedó a medias:** caso real (2.1, bloqueado).
- **Pasada adicional de copy (mismo día, a pedido del usuario):** revisión
  frase por frase de todo el texto de la página (no solo el enlazado) para
  quitar relleno corporativo vacío ("garantizamos", "aseguramos", "visión
  integral", "compromiso con la sostenibilidad empresarial") y reemplazarlo
  por afirmaciones concretas con contraste ("X, no Y") — mismo criterio en
  hero, intro, los 4 criterios de evaluación, "Nuestro reto" (pull quote +
  descripción + 3 bullets) y los 6 beneficios, en `seleccion-soluciones.json`
  (ES/EN). Categorías, Servicios principales, Proceso (12 etapas), FAQ y
  Servicios relacionados ya eran factuales y no se tocaron. Se detectó que
  la clave `closingQuote` de este mismo archivo **no se renderiza en esta
  página** — la usa `SolucionDetalle.tsx` (páginas de Tecnologías Avanzadas
  e Infraestructura, tarea 4.4), así que quedó fuera de esta revisión a
  propósito. Verificado con `tsc --noEmit` + rebuild + lectura completa de
  la página en el navegador embebido (ES), consola limpia.
- **Próximo paso:** 4.4 (Tecnologías avanzadas / Infraestructura, mismo
  archivo JSON bajo `detail`/`detailMeta` — incluye revisar el `closingQuote`
  detectado arriba) o 4.8 (sincronizar `route-meta.json`).

### 2026-09-18 — Fase 4: Intelligence Lab enlazado + fix de anclas rotas (4.7)
- **Tarea:** 4.7 (Intelligence Lab: hub + Gobierno de IA + Arquitectura de IA
  + Automatizaciones/Agentes), "las más delgadas" según PLAN.md.
- **Bug encontrado y corregido:** `src/pages/IntelligenceLab.tsx` (el hub)
  enlazaba la sección "Transversal a CIRA" a `/metodo-cira#construir`,
  `#identificar`, `#realizar`, `#adoptar` — anclas que **nunca existieron**
  en el DOM de `MetodoCira.tsx` (confirmado con grep sobre el código y sobre
  el HTML generado). El clic no daba error, pero tampoco llevaba a nada útil:
  navegaba a `/metodo-cira` sin hacer scroll a ninguna sección. Se cambió a
  un mapa `phasePaths` que apunta a las 4 páginas de servicio reales
  (Estrategia, Selección de Soluciones, Gerencia de Proyectos, Gestión del
  Cambio) — el mismo mapeo que ya usa `phaseAssets` dentro de
  `MetodoCira.tsx`.
- **Hecho (archivos):**
  - `src/pages/IntelligenceLab.tsx`: fix de las 4 anclas rotas (arriba).
  - `src/pages/intelligence-lab/GobiernoDeIA.tsx`,
    `ArquitecturaDeIA.tsx`, `AutomatizacionesDesarrollo.tsx`: nueva sección
    "Servicios relacionados" en las 3, cruzándose entre sí y con una página
    de nicho tradicional cada una — Gobierno de IA → Gestión del cambio
    (recíproco con el enlace que ya venía de 4.6), Arquitectura de IA →
    Selección de ERP (no recíproco todavía — ERP no enlaza de vuelta),
    Automatizaciones → Gerencia de Proyectos (recíproco con 4.5).
  - `src/i18n/locales/{es,en}/intelligence-lab.json`: bloque `related`
    (eyebrow/title/items) añadido a `gobierno`, `arquitectura` y
    `automatizaciones`.
- **No tocado:** no se amplió el cuerpo de texto ni se añadieron FAQ nuevas
  — a diferencia de 4.1/4.3/4.5/4.6, aquí el contenido existente (`body`,
  `included`, `faq` de 4 preguntas por página) ya era sólido y específico;
  el gap real era solo de enlazado, no de profundidad. La tabla de PLAN.md
  no mide todavía la longitud de Arquitectura/Automatizaciones ("—"), así
  que falta confirmar si están realmente por debajo del objetivo de
  1.000-1.800 palabras.
- **Verificación:** `npx tsc --noEmit` limpio + `npm run build` (72/72
  rutas) + navegador embebido: consola limpia en `/intelligence-lab` y las
  3 subpáginas. Confirmado por el HTML generado que las 4 tarjetas del hub
  ahora apuntan a `/metodo-cira/estrategia`,
  `/metodo-cira/seleccion-de-soluciones`, `/metodo-cira/gestion-de-proyectos`
  y `/metodo-cira/gestion-del-cambio` (antes iban todas a `/metodo-cira`
  sin ancla funcional), y que los enlaces de "Servicios relacionados" en
  las 3 subpáginas resuelven a rutas reales.
- **Quedó a medias:** caso real (2.1, bloqueado); profundidad de contenido
  de Arquitectura/Automatizaciones sin confirmar contra el objetivo de
  palabras; Selección de ERP no enlaza de vuelta hacia Arquitectura de IA
  (enlace no recíproco, bajo impacto).
- **Próximo paso:** 4.2 (hub de Selección de soluciones) o 4.4 (Tecnologías
  avanzadas / Infraestructura), que comparten `SolucionDetalle.tsx`, o 4.8
  (sincronizar `route-meta.json`) como tarea mecánica.

### 2026-09-18 — Fase 4: enlazado interno y FAQ ampliada en Estrategia (4.1), cierra la red de enlaces
- **Tarea:** 4.1 (Estrategia / Consultoría en Estrategia), última pendiente
  de las 4 páginas troncales del Método CIRA para el mismo patrón de
  enlazado que 4.3/4.5/4.6.
- **Punto de partida:** era la página más completa del sitio (~1.490
  palabras): intro, "¿Qué es la planeación estratégica?" con enlace al
  artículo de 5.2, diagnóstico (5 problemas — ya cumplía el "¿le pasa esto?"
  de la plantilla 1.3), stats en navy, beneficios, CxaaS (CIOaaS/CTOaaS/
  CCSOaaS), lista de servicios, testimonios y FAQ con 5 preguntas (incluida
  "CTO as a Service", keyword secundaria). Le faltaba, como a las demás:
  enlace explícito a `/metodo-cira` y sección "Servicios relacionados" —
  y era la única de las 4 páginas troncales sin enlace hacia las otras 3.
- **Hecho (archivos):**
  - `src/pages/metodo-cira/PlaneacionEstrategica.tsx`: enlace en línea en la
    intro ("Esta es la fase Construir dentro del Método CIRA completo") y
    nueva sección "Servicios relacionados" con las 3 fases siguientes del
    método en orden — Selección de ERP (Identificar), Gerencia de
    Proyectos/PMO (Realizar), Gestión del cambio (Adoptar) — cerrando así la
    red: las 4 páginas troncales (Estrategia, ERP, PMO, Gestión del cambio)
    ahora se enlazan entre sí.
  - `src/i18n/locales/{es,en}/estrategia.json`: nuevas claves
    `intro.methodLinkText/methodLinkLabel`, 1 FAQ nueva ("¿La planeación
    estratégica incluye la selección de tecnología y la implementación?")
    y bloque `related` (eyebrow/title/items).
- **No tocado:** el stat "60% reducción en tiempo de diagnóstico" en la
  sección `whyCeos` sigue sin fuente — es la tarea 0.6, bloqueada por el
  cliente, y no se tocó en esta sesión (fuera de alcance de 4.1).
- **Verificación:** `npx tsc --noEmit` limpio + `npm run build` (72/72 rutas)
  + navegador embebido en `/metodo-cira/estrategia` y
  `/en/metodo-cira/estrategia`: consola limpia. Confirmado por el HTML
  generado que los 4 enlaces nuevos (`/metodo-cira`, ERP, PMO, gestión del
  cambio) resuelven a rutas reales.
- **Quedó a medias:** caso real (2.1, bloqueado); el 60% sin fuente (0.6,
  bloqueado, no es parte de 4.1).
- **Próximo paso:** con las 4 páginas troncales ya enlazadas entre sí, el
  siguiente candidato natural es 4.7 (Intelligence Lab, "las más delgadas")
  o 4.2/4.4 (hub de selección de soluciones y tecnologías
  avanzadas/infraestructura, que comparten `SolucionDetalle.tsx`).

### 2026-09-18 — Fase 4: enlazado interno y FAQ ampliada en Gestión del Cambio (4.6)
- **Tarea:** 4.6 (Gestión del cambio), siguiente en la cola de Fase 4 tras
  4.3/4.5 en esta misma sesión.
- **Punto de partida:** la página ya tenía intro, 4 pilares ("cómo lo
  hacemos"), sección "lo que nos distingue", beneficios, imagen con caption y
  FAQ con `FAQPage` JSON-LD — y desde 5.2 ya enlazaba a Leadership Academy y
  al artículo de transformación digital. Faltaba, igual que en 4.3/4.5: enlace
  explícito a `/metodo-cira`, sección "Servicios relacionados" y FAQ con
  keywords secundarias ("adopción de ERP", "change management").
- **Hecho (archivos):**
  - `src/pages/metodo-cira/GestionDelCambio.tsx`: nuevo enlace en línea en la
    intro ("Esta es la fase Adoptar dentro del Método CIRA completo",
    mismo patrón que el link a la Academy y al artículo) y nueva sección
    "Servicios relacionados" (cards a Selección de ERP, Gerencia de
    Proyectos/PMO y Gobierno de IA — completa el triángulo de enlaces con las
    páginas de 4.3 y 4.5, que ya apuntaban de vuelta a Gestión del Cambio).
  - `src/i18n/locales/{es,en}/gestion-cambio.json`: nuevas claves
    `intro.methodLinkText/methodLinkLabel`, 2 FAQ nuevas (gestión del cambio
    en implementaciones de ERP, diferencia con el change management
    tradicional) y bloque `related` (eyebrow/title/items).
- **No tocado:** meta title/description (ya dentro de los límites); no se
  añadió una sección explícita "¿Le pasa esto?" con grid de síntomas (a
  diferencia de la página de ERP) — el dolor sigue expresado en el hero y la
  intro, no como bloque propio. Se puede revisar si se quiere alinear 100% con
  la plantilla 1.3, pero no bloqueaba el enlazado interno ni el SEO on-page.
- **Verificación:** `npx tsc --noEmit` limpio + `npm run build` (72/72 rutas)
  + `node scripts/serve-dist.mjs` vía navegador embebido: consola limpia en
  `/metodo-cira/gestion-del-cambio` y `/en/metodo-cira/gestion-del-cambio`.
  Confirmado por lectura del HTML generado que los 3 enlaces de "Servicios
  relacionados" y el enlace a `/metodo-cira` resuelven a rutas reales del
  sitio (no rutas inventadas).
- **Quedó a medias:** caso real (2.1, bloqueado); bloque "¿Le pasa esto?"
  explícito si se decide alinear estrictamente con 1.3.
- **Próximo paso:** 4.1 (Estrategia) para completar la red de enlaces entre
  las páginas troncales del método, o 4.8 (sincronizar `route-meta.json`).

### 2026-09-18 — Fase 4: enlazado interno y FAQ ampliada en ERP y PMO (4.3, 4.5)
- **Tareas:** 4.3 (Selección de software / ERP, prioridad 1 de nicho) y 4.5
  (Gerencia de proyectos / PMO, prioridad 2), las dos priorizadas por
  PROGRESO.md al cerrar la sesión anterior.
- **Punto de partida:** ambas páginas ya tenían casi todos los bloques de la
  plantilla 1.3 (dolor, qué hacemos, entregables, FAQ con `FAQPage` JSON-LD,
  CTA) de una sesión anterior a la creación del plan. Lo que faltaba: enlace
  explícito a `/metodo-cira`, una sección de "servicios relacionados" que
  cruzara ERP ↔ PMO ↔ Gestión del cambio ↔ el artículo de Perspectivas más
  afín, y FAQ ampliada con keywords secundarias.
- **Hecho (archivos):**
  - `src/pages/metodo-cira/SeleccionProducto.tsx` (componente compartido de
    ERP/CRM/HCM/EAM): nuevo enlace "Ver el Método CIRA completo →" junto al
    link existente a la fase de software; nueva sección "Servicios
    relacionados" (cards a Gestión del cambio, Gerencia de proyectos/PMO y el
    artículo "Por qué fracasan los proyectos de transformación digital").
    Por ser componente compartido, CRM/HCM/EAM heredan esta sección aunque no
    tenían tarea propia esta sesión.
  - `src/i18n/locales/{es,en}/seleccion-productos.json`: 2 FAQ nuevas
    **solo en `erp`** (no se tocó crm/hcm/eam) — "¿Ayudan a elegir ERP en
    Colombia/LATAM?" y "¿La selección incluye la gerencia de la
    implementación?" (con enlace conceptual a PMO).
  - `src/pages/metodo-cira/GestionDeProyectos.tsx`: 2 enlaces en línea en la
    intro (mismo patrón que `GestionDelCambio.tsx` de la sesión de 5.2) hacia
    `/metodo-cira` y hacia el artículo de transformación digital; nueva
    sección "Servicios relacionados" (cards a Selección de ERP, Gestión del
    cambio y Automatización con agentes de IA →
    `/intelligence-lab/automatizaciones-desarrollo`).
  - `src/i18n/locales/{es,en}/gestion-proyectos.json`: nuevas claves
    `intro.methodLinkText/methodLinkLabel/articleLinkText/articleLinkLabel`,
    2 FAQ nuevas (duración de un proyecto con PMO externo — sin inventar una
    cifra fija, D4 — y diferencia con "PMO as a Service"), y bloque `related`
    (eyebrow/title/items) para la nueva sección.
- **No tocado:** meta title/description de ambas páginas (ya cumplían los
  límites de 60/155 caracteres); CRM/HCM/EAM no recibieron FAQ ampliada ni
  contenido propio, solo la sección compartida de enlaces.
- **Verificación:** `npx tsc --noEmit` limpio + `npm run build` (72/72 rutas
  prerenderizadas) + `node scripts/serve-dist.mjs` vía navegador embebido:
  consola limpia en `/metodo-cira/gestion-de-proyectos`,
  `/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp` y su
  versión `/en/...`. Confirmado por lectura del HTML generado: los enlaces
  nuevos apuntan a `/metodo-cira` y al artículo correcto, y el `FAQPage`
  JSON-LD del ERP en inglés incluye las 2 preguntas nuevas
  ("Do you help select an ERP for companies..."). Capturas de pantalla de la
  nueva sección "Servicios relacionados" en `/metodo-cira/gestion-de-proyectos`
  confirmaron el estilo de tarjeta consistente con el resto del sitio.
- **Quedó a medias:** el bloque "caso real" de la plantilla 1.3 en ambas
  páginas sigue sin poder llenarse — bloqueado por 2.1 (autorización y datos
  de clientes). CRM/HCM/EAM (parte de 4.3) no tienen todavía su propia FAQ
  ampliada ni revisión de longitud de contenido.
- **Próximo paso:** ver "Próximo paso" arriba — replicar el patrón de
  enlazado en 4.1 o 4.6, o cerrar 4.8 (sincronizar `route-meta.json`) como
  tarea mecánica intermedia.

### 2026-09-18 — Cierre de 1.4, enlazado cluster↔pilar (5.2), eventos GA4 (7.1)
- **Tareas:** 1.4 (cierre), 5.2, 7.1. Se midió LCP para evaluar 8.1 pero no se
  tocó código de rendimiento (ver nota abajo).
- **Hecho (archivos):**
  - 1.4: `QuienesSomos.tsx` + `paginas.json` (ES/EN) — nuevo enlace "Conozca el
    Método CIRA que aplicamos en cada proyecto" tras la sección de trayectoria
    del CEO. Con esto y lo ya hecho en 1.1/1.6, `/metodo-cira` queda enlazada
    desde Nosotros (menú), desde Quiénes Somos (contenido) y desde cada
    página de servicio (breadcrumb) — tarea cerrada.
  - 5.2: `blog-data.ts` ahora lleva `pillarHref`/`pillarLabelKey` por artículo
    (mapeo cluster→pilar: transformación digital→Gestión del Cambio,
    consultora confiable→Estrategia, gobierno de IA→Gobierno de IA).
    `ArticuloPerspectiva.tsx` muestra una tarjeta "Servicio relacionado" en el
    sidebar con ese enlace. En la dirección inversa: `estrategia.json`
    (ES/EN) — el link que antes iba genérico a `/perspectivas` ahora apunta
    directo al artículo de estrategia; `gestion-cambio.json` (ES/EN) +
    `GestionDelCambio.tsx` y `intelligence-lab.json` (ES/EN) +
    `GobiernoDeIA.tsx` — nuevo párrafo "Lea también: [artículo]" en la intro.
  - 7.1: `analytics.ts` — nueva `trackEvent(name, params)`, no-op si el
    visitante no ha dado consentimiento (gtag no cargado). Instrumentado:
    `wizard_open` (`contact-wizard-context.tsx`, cubre todos los CTAs de
    "Agendar conversación" del sitio porque todos pasan por `openWizard()`),
    `wizard_step_complete` y `wizard_submit` y `wizard_book_call_click`
    (`contact-wizard-modal.tsx`), `video_play` (`youtube-facade.tsx`, cubre
    los 3 testimonios). Nuevo hook `use-scroll-depth-event.ts` (mismo patrón
    rAF-throttled que `useScrolled`) para `article_read` al pasar 75% del
    alto del documento, usado en `ArticuloPerspectiva.tsx`.
- **Verificación:** `npx tsc --noEmit` limpio + `npm run build` (72/72 rutas)
  + navegador embebido: consola limpia en `/quienes-somos`,
  `/metodo-cira/gestion-del-cambio`, `/intelligence-lab/gobierno-de-ia`,
  `/perspectivas/gobierno-de-ia-corporativo-en-la-empresa`. Eventos GA4
  verificados en vivo con un `window.gtag` de prueba inyectado por consola:
  `wizard_open`, `wizard_step_complete` (con `step`/`step_number` correctos)
  y `article_read` (con `slug` correcto al llegar a 75% de scroll) se
  confirmaron disparando tal cual se esperaba. `wizard_submit` no se probó
  en vivo para no enviar un envío de prueba real a web3forms.com — se
  verificó por lectura de código, mismo patrón que los demás.
  Ojo con `requestAnimationFrame`: no dispara en una pestaña del navegador
  embebido que no está al frente (`tabs_select` para traerla al frente antes
  de probar cualquier cosa que dependa de rAF/scroll).
- **Nota de rendimiento (no accionada):** `node scripts/lh.mjs --runs 3` dio
  LCP 3,09s en el Inicio, por encima de los 2,8s de la línea base del
  2026-09-17 — pero es otra máquina/sesión, no una comparación válida, y el
  elemento LCP sigue siendo el hero (`min-h-screen`; la sección de tabs
  reordenada en 1.2 no entra en el viewport inicial). No se tocó código de
  8.1 sin una medición limpia (PageSpeed Insights real) que confirme si hay
  regresión de verdad.
- **Quedó a medias:** nada de lo iniciado.
- **Próximo paso:** Fase 4 (reescribir páginas de servicio, empezar por ERP y
  PMO), 3.2 (coherencia del hub de Leadership Academy), 6.3/6.4
  (backlinks/LinkedIn), o confirmar el LCP con PageSpeed Insights antes de
  decidir si 8.1 necesita trabajo.

### 2026-09-18 — Fase 1: navegación por servicios, reorden del Inicio, breadcrumbs
- **Tareas:** 1.1, 1.2 (parcial), 1.5 (parcial), 1.6. 1.4 avanzó como efecto
  colateral de 1.1 (quedó parcial). 1.3 no aplica esta sesión (es guía para Fase 4).
- **Hecho (archivos):**
  - 1.1: `src/lib/nav-config.ts` reestructurado en 4 secciones —
    **Servicios** (Estrategia, Selección de Soluciones ⊃ Software/Avanzadas/Infra,
    Gerencia de Proyectos, Gestión del Cambio, Inteligencia Artificial ⊃
    Gobierno/Arquitectura/Automatización), **Capacitación Ejecutiva** (Leadership
    Academy), **Nosotros** (Quiénes Somos, Metodología CIRA, Experiencia) y
    **Perspectivas**. "Servicios" no tiene página propia todavía (D2: no se crean
    URLs nuevas) — enlaza a `/#servicios`, el bloque de tabs del Inicio.
    `src/components/layout/nav-menu.tsx` generalizado: el panel ahora soporta
    **más de una** rama con tercer nivel abierta a la vez (antes solo
    funcionaba la primera encontrada; "Servicios" tiene dos: Selección de
    Soluciones e Inteligencia Artificial). Nuevas llaves en
    `common.json` (ES/EN); llaves huérfanas de Presencia Digital eliminadas.
  - 1.5 (parcial): sección "digitalGap" ("Presencia Digital: dónde lo
    encuentran") quitada de `PlaneacionEstrategica.tsx` (~70 líneas + imports
    sin uso) y de `estrategia.json` (ES/EN); enlace a Presencia Digital quitado
    del footer (`footer.tsx`). Las páginas `/presencia-digital/*` siguen
    existiendo — su destino final sigue esperando decisión del cliente.
  - 1.2 (parcial): `Home.tsx` reordenado — Hero → **Servicios** (ancla
    `id="servicios"`) → TrustBar → WhyCyrrus → CyrrusAbout → CiraJourney →
    Testimonials → CeoSection (bajada, antes iba justo tras el hero) →
    Experience → Perspectivas → FinalCta. Las tabs de servicios
    (`home.json` → `servicesTabs`, ES/EN) se ampliaron de 3 útiles + 1
    Presencia Digital (quitada) a **6**: Estrategia, Selección de Tecnología,
    Gerencia de Proyectos, Gestión del Cambio, IA Empresarial, Leadership
    Academy — antes faltaban Selección de Soluciones y Gerencia de Proyectos
    por completo, y la tab de "Gestión del Cambio" enlazaba por error a
    Leadership Academy. `hero-services-tabs.tsx` actualizado con 6 imágenes
    (reutiliza fotos ya optimizadas, sin `npm run images` nuevo). Sigue
    pendiente el bloque "Casos destacados" (depende de 2.1).
  - 1.6: `src/components/ui/breadcrumbs.tsx` (nuevo) + prop `breadcrumbs` en
    `PageHero` (`src/components/layout/page-hero.tsx`). Aplicado a las 14
    páginas de nivel 2+ que ya construían `BreadcrumbList` en JSON-LD:
    `PlaneacionEstrategica`, `SeleccionDeSoluciones`, `SeleccionDeSoftware`,
    `SeleccionProducto`, `SolucionDetalle`, `GestionDeProyectos`,
    `GestionDelCambio`, `GobiernoDeIA`, `AutomatizacionesDesarrollo`,
    `ArquitecturaDeIA`, `CursoDetalle`, `ArticuloPerspectiva`,
    `presencia-digital/DesarrolloWeb`, `presencia-digital/Seo`. En la mayoría
    se reusa el mismo array para el JSON-LD y la UI (evita que se desincronicen).
  - 1.4 (parcial, no planeado como tarea propia de esta sesión): `MetodoCira.tsx`
    ya cumplía casi todo lo pedido (4 fases, cada una enlaza a su página de
    servicio) — lo que faltaba era que apareciera bajo "Nosotros" en la
    navegación, que quedó resuelto por 1.1. Falta: enlace explícito desde
    Quiénes Somos hacia `/metodo-cira`, y confirmar que cada página de
    servicio enlace de vuelta en su sección "cómo lo hacemos".
- **Verificación:** `npm run build` (72/72 rutas) + `node scripts/serve-dist.mjs`
  vía navegador embebido en modo escritorio y móvil: consola limpia en `/`,
  `/en`, `/metodo-cira/estrategia`,
  `/metodo-cira/seleccion-de-soluciones/seleccion-de-software/erp`,
  `/intelligence-lab/gobierno-de-ia`, `/leadership-academy/ia-para-directivos`,
  `/perspectivas/como-elegir-una-consultora-estrategica-confiable`. Menú de
  escritorio probado a mano: las dos ramas con tercer nivel (Selección de
  Soluciones e Inteligencia Artificial) abren correctamente bajo "Servicios";
  "Nosotros" muestra sus 3 hijos. Breadcrumbs visibles y con el mismo texto
  que el JSON-LD en las rutas probadas. Footer sin enlace a Presencia Digital
  en ES y EN.
- **Quedó a medias:** 1.2 (bloque "Casos destacados"), 1.4 (enlazado de
  contenido), 1.5 (destino final de `/presencia-digital/*`). 1.3 sigue sin
  aplicarse — es la plantilla que se usará al reescribir cada página en Fase 4.
- **Próximo paso:** cerrar 1.4 (enlace desde Quiénes Somos) si se quiere Fase 1
  100% completa, o pasar a Fase 2/pedir insumos del cliente (ver Bloqueos).

### 2026-09-18 — Fase 0 completa (salvo 0.6 y 0.9) + primera lectura de Search Console
- **Tareas:** 0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.8.
- **Search Console:** revisado directamente en el navegador (sc-domain:cyrruscs.com),
  ya estaba verificado — no fue necesario pedir CSV al cliente. Datos guardados en
  `docs/plan-mejora/datos/search-console-2026-09-18.md`: 44/178 páginas indexadas,
  19 URLs 404 del sitio viejo (lista completa, más precisa que el mapa inicial del
  PLAN), 46 clics / 1.840 impresiones en 3 meses (casi todo búsqueda de marca).
- **Hecho (archivos):**
  - 0.1: `src/components/sections/perspectivas-preview.tsx` reescrito para usar
    `blogPosts` (mismo patrón que `Perspectivas.tsx`) en vez de `upcomingTopics`.
  - 0.2: espacio final añadido a `hero.titleAccent`/`titleBold` en
    `src/i18n/locales/{es,en}/home.json`.
  - 0.3: `src/lib/initial-language.ts` eliminado; `src/main.tsx` y
    `src/lib/language.tsx` limpiados de las referencias/comentarios al redirect
    y del `LANG_STORAGE_KEY` que quedaba sin uso.
  - 0.4: 19 reglas 301 añadidas a `public/.htaccess` (URLs del sitio viejo →
    ruta actual más cercana; ver tabla completa en el archivo de datos de GSC).
  - 0.5: `public/llms.txt` — URL de Estrategia corregida (ES/EN) y los 3
    artículos publicados de Perspectivas añadidos (ES/EN).
  - 0.7: `contact-wizard.json`, `metodo-cira.json`, `route-meta.json` pasados a
    "usted".
  - 0.8: `circular-carousel.tsx` (listbox para los `role="option"`, aria-label
    con el tag visible, dots con hit-target de 24px), `workshop-orbit.tsx`
    (mismo fix de dots), `reveal.tsx` (`RevealGroup` ahora acepta `as` para
    poder ser `<dl>`), `cira-social-proof.tsx` (`dt`/`dd` válidos, orden visual
    conservado con `order-*`).
- **Verificación:** `npm run build` (72/72 rutas prerenderizadas, sin errores de
  TypeScript) + `node scripts/serve-dist.mjs` vía el navegador embebido:
  consola limpia en `/`, `/en`, `/metodo-cira`, `/leadership-academy`,
  `/perspectivas`; H1 con espacios correctos en ambos idiomas; sin redirección
  en `/`; wizard de contacto probado hasta el paso 4 con el copy nuevo.
  Accesibilidad verificada con un script Lighthouse ad hoc (accessibility-only,
  descartado tras usarlo): `/metodo-cira` 89→100, `/leadership-academy` 96→100.
- **Nota:** queda un audit de Lighthouse (`label-content-name-mismatch`) en los
  botones de fase de `/metodo-cira` que no afecta el score (peso 0 en esa
  categoría) — probable falso positivo del audit con elementos apilados en
  columna; no se siguió persiguiendo.
- **Quedó a medias:** nada de lo iniciado; 0.6 y 0.9 siguen bloqueadas (cliente/dueño).
- **Próximo paso:** Fase 1 (arquitectura y navegación) o pedir al cliente los
  insumos de Bloqueos (GA4, cifras, casos, equipo, historia, talleres,
  decisión de Presencia Digital y del repo `cyrruscs-dist/`).

### 2026-09-18 — Creación del plan
- **Tareas:** ninguna de implementación.
- **Hecho:** auditoría completa (UX, técnica, contenido, posicionamiento) y
  creación de `docs/plan-mejora/PLAN.md` y `PROGRESO.md`. Se añadió un puntero
  a estos archivos en `CLAUDE.md`.
- **Hallazgos clave:** URLs del sitio viejo indexadas con 404; redirección
  automática a `/en` en el Inicio; Inicio muestra artículos no publicados;
  talleres de Leadership Academy en `noindex`; cifras contradictorias; faltan
  casos de éxito y equipo.
- **Decisiones:** D1–D5 (ver PLAN.md).
- **Próximo paso:** Fase 0 (0.1, 0.2, 0.3, 0.5, 0.7, 0.8) + pedir insumos al cliente.
- **Search Console:** no hay conector disponible. El usuario va a exportar los
  CSV (Indexación → Páginas → "No encontrado (404)", "Página con redirección",
  "Rastreada: actualmente sin indexar" + Rendimiento, 3 meses) a
  `docs/plan-mejora/datos/`. Al empezar la sesión, revisar si esa carpeta
  existe: si trae los CSV, desbloquea 0.4 y la línea base de KPIs.
