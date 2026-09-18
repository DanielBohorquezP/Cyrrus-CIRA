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

> Fase 0 completa salvo 0.6 y 0.9 (bloqueadas por el cliente/dueño). Seguir con
> **Fase 1** (1.1–1.6, arquitectura y navegación) o pedir al cliente los
> insumos de la tabla de Bloqueos para desbloquear Fase 2.

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
| 1.1 | Menú por servicios | ⬜ | |
| 1.2 | Reordenar el Inicio | ⬜ | La sección "Casos destacados" depende de 2.1 |
| 1.3 | Plantilla única de página de servicio | ⬜ | |
| 1.4 | `/metodo-cira` como página de metodología | ⬜ | |
| 1.5 | Sacar Presencia Digital de consultoría | ⛔ | Quitar de Estrategia/footer se puede hacer ya; destino final espera decisión |
| 1.6 | Breadcrumbs visibles | ⬜ | |

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
| 3.2 | Coherencia del hub (hero, agrupación, CTA) | ⬜ | Se puede hacer ya |
| 3.3 | Indexación de talleres | ⬜ | Por taller, cuando cumpla 3.1 |
| 3.4 | Captura de interesados | ⬜ | |

### Fase 4 — Profundidad de servicios
| ID | Página | Estado | Notas |
|---|---|---|---|
| 4.1 | Estrategia | ⬜ | |
| 4.2 | Selección de soluciones (hub) | ⬜ | |
| 4.3 | Selección de software + ERP/CRM/HCM/EAM | ⬜ | Prioridad 1 de nicho |
| 4.4 | Tecnologías avanzadas / Infraestructura | ⬜ | |
| 4.5 | Gerencia de proyectos (PMO) | ⬜ | Prioridad 2 de nicho |
| 4.6 | Gestión del cambio | ⬜ | |
| 4.7 | Intelligence Lab + 3 subpáginas | ⬜ | Las más delgadas |
| 4.8 | Sincronizar `route-meta.json` con `usePageMeta` | ⬜ | |

### Fase 5 — Contenido
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 5.1 | Autor real + página de autor | ⬜ | |
| 5.2 | Enlazado cluster ↔ pilar en los 3 artículos actuales | ⬜ | |
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
| 7.1 | Eventos GA4 del wizard y contenido | ⬜ | |
| 7.2 | Tablero mensual de KPIs | ⛔ | GSC ya accesible; falta acceso a GA4 |

### Fase 8 — Rendimiento
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 8.1 | LCP móvil < 2,5 s en el Inicio | ⬜ | Hoy 2,8 s |
| 8.2 | Cabeceras de caché y seguridad | ⬜ | Depende del hosting (nginx) |

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

---

## Métricas registradas

| Fecha | Lighthouse móvil Inicio (Rend/Acc/SEO) | LCP | Páginas indexadas | Clics orgánicos (3 meses) | Notas |
|---|---|---|---|---|---|
| 2026-09-17 | 87 / 100 / 92 | 2,8 s | — | — | Línea base de la auditoría. Google aún muestra el sitio viejo |
| 2026-09-18 | — | — | 44 / 178 conocidas | 46 (1.840 impr., CTR 2,5 %, pos. media 14,7) | Primera lectura real de Search Console. Casi todo el tráfico es de marca ("cyrrus"); ver `docs/plan-mejora/datos/search-console-2026-09-18.md` |

---

## Bitácora de sesiones

> Una entrada por sesión, la más reciente arriba. Formato:
> fecha · tareas trabajadas · qué se hizo (archivos) · verificación · qué quedó a medias · próximo paso.

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
