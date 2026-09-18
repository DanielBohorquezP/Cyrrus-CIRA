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

> **Continuar Fase 4.** 4.3 (ERP) y 4.5 (PMO) ya tienen enlazado interno y FAQ
> ampliada aplicando la plantilla 1.3 (ver bitácora 2026-09-18 "Fase 4:
> enlazado interno..."); falta todavía en ambas el bloque "caso real" (2.1) y,
> en 4.3, aplicar el mismo nivel de profundidad de contenido (síntomas,
> FAQ ampliada) a CRM/HCM/EAM — hoy solo ERP la tiene, CRM/HCM/EAM solo
> heredaron la nueva sección "Servicios relacionados" por ser un componente
> compartido (`SeleccionProducto.tsx`).
>
> Siguiente candidato: **4.6 Gestión del cambio** o **4.1 Estrategia** (ver
> tabla "FASE 4" en PLAN.md para longitud objetivo y keywords). Aplicar el
> mismo patrón usado en 4.3/4.5: sección "Servicios relacionados" (cards con
> `Link` a 2-3 servicios + el artículo de Perspectivas más afín) y, si falta,
> un enlace explícito a `/metodo-cira` cerca de la explicación de "cómo lo
> hacemos". El caso real de cada página sigue bloqueado por 2.1 — dejar ese
> bloque para después o usar un placeholder que no invente cifras (ver D4 en
> PLAN.md: toda cifra necesita fuente o se quita).
> También válido si se prefiere: 4.8 (sincronizar `route-meta.json` con
> `usePageMeta`, mecánico y sin bloqueos) antes de seguir con contenido.
>
> Fase 1 queda cerrada salvo 1.2 ("Casos destacados", depende de 2.1) y 1.5
> (destino final de `/presencia-digital/*`, depende del cliente).

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
| 3.2 | Coherencia del hub (hero, agrupación, CTA) | ⬜ | Se puede hacer ya |
| 3.3 | Indexación de talleres | ⬜ | Por taller, cuando cumpla 3.1 |
| 3.4 | Captura de interesados | ⬜ | |

### Fase 4 — Profundidad de servicios
| ID | Página | Estado | Notas |
|---|---|---|---|
| 4.1 | Estrategia | ⬜ | |
| 4.2 | Selección de soluciones (hub) | ⬜ | |
| 4.3 | Selección de software + ERP/CRM/HCM/EAM | 🟡 | Prioridad 1 de nicho. ERP: enlace a `/metodo-cira`, sección "Servicios relacionados" (Gestión del cambio, PMO, artículo de Perspectivas) y 2 FAQ nuevas (Colombia/LATAM, selección vs. implementación). CRM/HCM/EAM comparten el componente y heredan "Servicios relacionados", pero no la FAQ ampliada. Falta caso real (2.1) |
| 4.4 | Tecnologías avanzadas / Infraestructura | ⬜ | |
| 4.5 | Gerencia de proyectos (PMO) | 🟡 | Prioridad 2 de nicho. Enlace a `/metodo-cira` y al artículo "por qué fracasan los proyectos de transformación" en la intro, sección "Servicios relacionados" (ERP, Gestión del cambio, Automatización con IA) y 2 FAQ nuevas (duración, PMO as a Service). Falta caso real (2.1) |
| 4.6 | Gestión del cambio | ⬜ | |
| 4.7 | Intelligence Lab + 3 subpáginas | ⬜ | Las más delgadas |
| 4.8 | Sincronizar `route-meta.json` con `usePageMeta` | ⬜ | |

### Fase 5 — Contenido
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| 5.1 | Autor real + página de autor | ⬜ | |
| 5.2 | Enlazado cluster ↔ pilar en los 3 artículos actuales | ✅ | Enlace pilar→artículo (sección "servicio relacionado" en `ArticuloPerspectiva.tsx`, dato en `blog-data.ts`) y artículo→pilar (link en `PlaneacionEstrategica`/`estrategia.json`, `GestionDelCambio`/`gestion-cambio.json`, `GobiernoDeIA`/`intelligence-lab.json`) en ambas direcciones, ES y EN |
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
| 2026-09-18 | 90 / — / — | 3,09 s | — | — | `node scripts/lh.mjs --runs 3` (mediana) en esta máquina/sesión, no comparable 1:1 con la línea base del 17-09 (otra máquina). El elemento LCP sigue siendo del hero (`min-h-screen`, la sección de tabs no entra en el viewport inicial) — no parece una regresión del reorden del Inicio, pero falta confirmar con PageSpeed Insights real antes de tocar 8.1 |

---

## Bitácora de sesiones

> Una entrada por sesión, la más reciente arriba. Formato:
> fecha · tareas trabajadas · qué se hizo (archivos) · verificación · qué quedó a medias · próximo paso.

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
