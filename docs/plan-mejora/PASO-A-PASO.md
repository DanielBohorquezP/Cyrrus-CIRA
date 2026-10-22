# Paso a paso — cómo ejecutar cada tarea del plan

> El *qué* y el *por qué* están en [`PLAN.md`](./PLAN.md). El estado y la
> bitácora, en [`PROGRESO.md`](./PROGRESO.md). Aquí está el **cómo**: pasos,
> archivos, verificación y criterio de "hecho" de cada tarea.
>
> Quién hace cada paso: **[Claude]** se hace en una sesión de código;
> **[Cliente]** lo hace una persona de Cyrrus (cuentas, accesos, datos,
> publicaciones a su nombre).

---

## 0. Procedimientos comunes (se usan en casi todas las tareas)

### 0.1 Verificar cualquier cambio en el sitio
1. `npm run build` (genera sitemap, prerender de todas las rutas y `dist/`).
2. Servir `dist/` (configuración `dist` de `.claude/launch.json`, puerto 4178).
3. Cargar cada ruta afectada **en ES y en EN**, esperar 3 s y revisar la consola:
   cero errores (un error React #418 o "Hydration failed" = se rompió una regla
   de `CLAUDE.md`).
4. Revisar el JSON-LD de la ruta (que parsea) y el `<title>`/meta.
5. Si toca rendimiento: `node scripts/lh.mjs --runs 3` (y `--route /ruta`).

### 0.2 Publicar un artículo o comparativa nueva
1. Medir la keyword antes de escribir (Ubersuggest: volumen CO/MX/ES y SD). Si
   tiene 0 búsquedas, cambiar el enfoque o descartarla.
2. Comprobar que ninguna página existente apunta a la misma búsqueda (D8).
3. Escribir ES y EN en `src/i18n/locales/{es,en}/blog.json` → `posts.<slug>`:
   `title`, `label`, `excerpt`, `metaDescription` (≤155), `intro`,
   `keyTakeaways` (3), `serviceCtas` (2), `body`, `sources`.
   - Cada H2 en forma de pregunta abre con una frase que la responde sola.
   - Cifras solo verificadas en la fuente original (D4), listadas en `sources`.
   - Enlaces internos con `links` (anchor descriptivo) a su servicio y a un caso.
   - Bloque `download` si hay descargable.
4. Registrar la entrada en `src/lib/blog-data.ts` (portada horizontal 1600px,
   `pillarHref`, `pillarLabelKey`, `serviceCtaIndexes` en dos H2 a 1/3 y 2/3).
5. Si hay un tema "próximamente" equivalente en `src/lib/perspectivas-topics.ts`, quitarlo.
6. Añadir la línea en `public/llms.txt` (ES y EN).
7. Enlazar el artículo desde su página de servicio (bloque "Lea también" / guía).
8. Verificar (0.1) y registrar en `plan-contenido-prioritario.md` (tabla de publicados).

### 0.3 Desplegar
1. `npm run build`.
2. Crear el zip con rutas `/` (no usar `Compress-Archive` de PowerShell 5.1: guarda `\`):
   ```bash
   python -c "import os,zipfile;z=zipfile.ZipFile('../Cyrrus builds/cyrrus-dist-AAAA-MM-DD.zip','w',zipfile.ZIP_DEFLATED);[z.write(os.path.join(r,f),os.path.relpath(os.path.join(r,f),'dist').replace(os.sep,'/')) for r,_,fs in os.walk('dist') for f in fs]"
   ```
3. **[Cliente]** subir el zip al hosting.
4. **[Claude]** comprobar en producción: `curl -sI https://cyrruscs.com/` (fecha
   `Last-Modified`), hash del bundle en el HTML igual al de `dist/`, y A1.

### 0.4 Cerrar una sesión
Ver "Protocolo de sesión" en `PROGRESO.md`.

---

## Fase A — Despliegue y medición

### A1 Desplegar y verificar en producción
1. Seguir 0.3.
2. En producción, cargar: `/`, `/experiencia/3-castillos`, `/en/experiencia/morelco`,
   `/perspectivas/gestion-del-cambio-organizacional-que-es-modelos-y-plantilla`,
   `/quienes-somos` → consola limpia.
3. `curl -sI https://cyrruscs.com/ | grep -i cache-control` → `no-cache` (regla nueva del `.htaccess`).
4. Descargar `/descargas/plantilla-plan-gestion-del-cambio.xlsx` → 200.
**Hecho cuando:** producción sirve el build del repo y las 5 rutas cargan sin errores.

### A2 Search Console
1. **[Cliente o Claude con acceso]** Sitemaps → reenviar `https://cyrruscs.com/sitemap.xml`.
2. Inspección de URL → "Solicitar indexación" para las páginas nuevas de la sesión.
3. Cada semana: Rendimiento (consultas, páginas, CTR) y Páginas (no indexadas).
   Exportar y guardar en `docs/plan-mejora/datos/search-console-AAAA-MM-DD.md`.
4. Si una consulta tiene impresiones pero CTR < 1%: reescribir título/meta de esa página.
**Hecho cuando:** sitemap procesado sin errores y hay al menos 4 lecturas semanales registradas.

### A3 Bing Webmaster Tools
1. **[Cliente]** Entrar a bing.com/webmasters → "Importar desde Google Search Console".
2. Enviar el sitemap. Activar IndexNow si el hosting lo permite.
**Hecho cuando:** el sitio aparece verificado y con el sitemap enviado.

### A4 GA4 con conversiones
1. **[Cliente]** Dar acceso de editor en GA4 o confirmar el ID de medición.
2. **[Claude]** Revisar `src/lib/analytics.ts` (`trackEvent`) y añadir eventos:
   `generate_lead` (envío del formulario; ya existe el envío en
   `src/components/contact-wizard/contact-wizard-modal.tsx` vía web3forms),
   `whatsapp_click`, `schedule_click`, `file_download` (ya existe en artículos),
   `tool_start` / `tool_complete` (Fase D).
3. **[Cliente]** En GA4 → Administrar → Eventos → marcar `generate_lead`,
   `whatsapp_click` y `schedule_click` como eventos clave.
4. Verificar en GA4 → Tiempo real con un envío de prueba.
**Hecho cuando:** los tres eventos clave aparecen en GA4 en tiempo real.

### A5 PageSpeed real
1. Tras cada deploy: pagespeed.web.dev en `/` y una página de servicio, móvil.
2. Registrar en `PROGRESO.md` → Métricas (rendimiento, LCP, TBT, CLS).
3. Si TBT > 600 ms: perfilar con `node scripts/lh.mjs` y revisar tareas largas.
**Hecho cuando:** TBT < 600 ms y LCP < 2,5 s en móvil en producción.

### A6 Tablero mensual de KPIs
1. Hoja de cálculo (o Looker Studio) con las filas de la sección 6 de `PLAN.md`.
2. Fuentes: Search Console (clics, keywords top 10), Ubersuggest (DA, dominios),
   GA4 (contactos), conteo de reseñas, prompts de IA (ver L1).
3. Primer día de cada mes: actualizar y anotar en `PROGRESO.md` → Métricas.

### A7 Vigilancia de backlinks spam
1. Mensual: Ubersuggest `backlinks_overview` + `linking_domains`.
2. Si Search Console muestra una **acción manual**: preparar archivo de disavow
   con los dominios spam y subirlo. Si no, solo registrar (D9).

---

## Fase B — Conversión inmediata

### B1 Sesión de diagnóstico gratuita (D13)
> Estado: publicada en la Sesión 7 como `/diagnostico` (ES/EN). Lo de abajo es el diseño original a precio fijo; se descartó el precio (D13). Pendiente: confirmar con Cyrrus los supuestos (60 min, tres bloques, nota de una página en 3 días hábiles, filtro 50+ empleados).

1. **[Cliente]** Definir: nombre, alcance (qué se entrega), duración (p. ej. 2
   semanas), precio o "desde", para quién es.
2. **[Claude]** Página `/diagnostico` (ES/EN):
   - Nueva entrada en `PAGES` (`src/App.tsx`) y en `src/lib/route-meta.json`.
   - Copy en un namespace nuevo o en `paginas.json`; hero con
     `AnimatedNavyBackground` vía `PageHero`.
   - Secciones: para quién es, qué recibe (entregables), cómo funciona (semana
     1/semana 2), precio, caso relacionado, FAQ, CTA (agenda + formulario).
   - JSON-LD: `Service` con `offers` (`Offer` con `price`/`priceCurrency` si
     hay precio fijo) + `FAQPage` + `BreadcrumbList`.
3. Enlazar desde el Inicio (hero o barra de confianza), desde cada página de
   servicio y desde las tarjetas `serviceCtas` de los artículos.
**Hecho cuando:** la página está publicada y enlazada desde Inicio + 4 servicios.

### B2 Rangos de precio orientativos — ➖ DESCARTADA (PLAN D14: no se publican precios de Cyrrus)
1. **[Cliente]** Rango por servicio (estrategia, selección ERP, PMO, gestión del
   cambio) y de qué depende.
2. **[Claude]** Sección "¿Cuánto cuesta?" en cada página de servicio + pregunta
   en la FAQ (y en `FAQPage`).
**Hecho cuando:** las 4 páginas principales muestran un rango y sus factores.

### B3 Agenda directa y WhatsApp
1. **[Cliente]** Enlace de agenda (Calendly / Google Calendar) y número de WhatsApp de ventas.
2. **[Claude]** Botón de agenda como opción en el formulario de contacto y en
   `FinalCta`; botón flotante de WhatsApp (`https://wa.me/57…?text=…`) con
   `trackEvent("whatsapp_click")`. Montarlo con `isPrerender()`/`ClientOnly` si
   depende de scroll o temporizador (regla 3 de hidratación).
**Hecho cuando:** ambos funcionan en móvil y disparan su evento GA4.

### B4 Secuencia de correos
1. **[Cliente]** Elegir herramienta (Brevo, Mailchimp o n8n + Gmail).
2. **[Claude]** Redactar 4 correos: entrega del recurso → caso relacionado →
   guía comparativa → invitación al diagnóstico (B1).
3. Conectar el envío de las herramientas (D1, D2) y descargas a esa lista.

### B5 Revisión del formulario
1. Recorrer el formulario en móvil: contar pasos y campos obligatorios.
2. Dejar solo lo imprescindible; confirmar con tiempo de respuesta ("le
   respondemos en 1 día hábil").

---

## Fase C — Comparativas agnósticas

Procedimiento común: 0.2, más estas reglas:
- Una tabla comparativa (funcionalidad, para quién, modelo de despliegue, rango
  de licenciamiento, ecosistema de implementadores en LATAM).
- Datos de los fabricantes tomados de sus páginas oficiales, con fecha de
  consulta en `sources`. Nada de precios inventados: si no es público, decir
  "precio bajo cotización" y explicar de qué depende.
- Declarar la independencia: "Cyrrus no revende ni implementa ninguno de estos
  productos".
- CTA: "¿No sabe cuál elegir? Hacemos la selección sin comisiones" → servicio de ERP/CRM + B1.

| ID | Título de trabajo | Keyword a medir | Enlaza a |
|---|---|---|---|
| C1 | Mejores ERP para medianas empresas en 2026 | mejores erp (MX 110 · SD 35) | ERP |
| C2 | SAP Business One vs NetSuite vs Dynamics 365 Business Central | sap business one vs netsuite | ERP |
| C3 | Odoo vs SAP Business One | odoo vs sap | ERP |
| C4 | Cuánto cuesta implementar un ERP | cuanto cuesta un erp (sin medir) | ERP + B1 |
| C5 | Salesforce vs HubSpot vs Dynamics 365 | salesforce vs hubspot | CRM |
| C6 | Mejores CRM: criterios para compararlos | mejores crm (MX 170 · SD 31) | CRM |
| C7 | ERP vs Excel: cuándo dar el salto | erp vs excel (sin medir) | ERP |

**Hecho cuando:** publicada, enlazada desde su servicio y desde la guía de ERP/CRM.

### C8–C18 Categorías de software caro (empresas de 50–100+ empleados)

Procedimiento 0.2 más las reglas de esta fase. Fuente: Ubersuggest, 2026-10-21,
medido por país en español (D11). **Volver a medir antes de escribir.**

| ID | Artículo | Keyword · volumen · SD | Enlaza a | Notas |
|---|---|---|---|---|
| C8 | Reforzar C5 (no es un artículo nuevo) | — | CRM + B1 | Añadir sección "Si su empresa tiene 100+ empleados" (integración con ERP, gobernanza de datos, el costo de implementación suele superar el de licencias, riesgo de migración); tabla "mejor opción por escenario" (ya usa Microsoft 365, necesita ERP integrado, quiere adopción rápida…) (D12); cambiar el CTA a diagnóstico cuando exista B1. Enlazar a C15–C18 |
| C9 | Qué es un sistema WMS y cómo elegir uno (WMS vs ERP) | sistema wms · MX 880 · SD 10 (CO 390 · SD 9) | Selección de Software (ERP) | **Primera prioridad**: volumen alto y competencia mínima. Intención informativa; relacionadas: "que es el sistema wms" 50, "sistema wms ejemplos" 50, "software wms" MX 320 · SD 36 |
| C10 | Cuánto cuesta SAP Business One | sap business one precio · MX 140 · SD 28 · CPC US$6; precio sap business one · MX 110 · SD 23 | Selección de Software (ERP) + C2, C3, C4 | Intención comercial confirmada. "sap business one" solo (MX 2.900) es mayormente empleo/cursos: no apuntar a eso. No repetir C2/C4: enlazar |
| C11 | Cómo elegir un software de mantenimiento (CMMS/EAM) | software cmms · MX 170 · SD 34 · CPC US$54 | Selección de Software | CPC más alto del estudio: el comprador es industrial. Relacionadas en ES: "software de mantenimiento" 880, "software de mantenimiento industrial" 90 (medir por país) |
| C12 | Migrar de SAP ECC a S/4HANA: plazos, costos y alternativas | sap s4hana · MX 1.900 · SD 28 | Selección de Software + Gerencia de proyectos | Parte del volumen es empleo/cursos. **Las fechas de fin de soporte de ECC se verifican en la fuente de SAP antes de publicar (D4)** |
| C13 | Software de RR. HH. y nómina para empresas de más de 100 empleados | software de recursos humanos · MX 260 · SD 18 · CPC US$22,6 (CO 90 · SD 21) | HCM; relacionar con G8 | Atrae mucha pyme: el título debe filtrar por tamaño. Coordinar con G8 para no canibalizar (D8) |
| C14 | Qué es un software MES y cuándo lo necesita una planta | software mes · MX 140 · SD 17 · CPC US$5,4 | Selección de Software | Nicho de manufactura, poca competencia |
| C15 | Integrar el ERP con el CRM sin middleware | (sin volumen medible) | CRM + ERP | Para responder a la IA; prompt de seguimiento de directores de operaciones en LATAM |
| C16 | Costo total de propiedad de un CRM en una mediana empresa | (sin volumen medible) | CRM + C4 | Licencias + onboarding + complementos + implementación; precios solo de páginas oficiales |
| C17 | Fin de venta de Salesforce CPQ: qué opciones tiene | (sin volumen medible) | CRM | **Verificar fechas y productos en la fuente de Salesforce (D4).** Comparar Revenue Cloud, HubSpot CPQ y Dynamics 365 |
| C18 | Gobernanza y deduplicación de datos en el CRM | (sin volumen medible) | CRM | Para RevOps; incluye lista de verificación descargable si hay tiempo |

**Descartado en esta investigación (no escribir):**
- Comparativas en español entre ERP/CRM por nombre (p. ej. "netsuite vs sap business one" MX 10, "dynamics 365 vs ..." ≤ 20): las cifras grandes de Ubersuggest sin país son búsquedas en inglés. C2, C3 y C5 ya cubren el tema.
- "selección de erp" (10), "migración erp" (0), "costo implementación erp" (0): sin volumen; se cubren dentro de C4.
- "consultoría erp" (170): intención comercial, corresponde a la **página de servicio** de ERP, no a un artículo (D8). Reforzar esa página con la palabra.
- "rfp software" (MX 40 · SD 24 · CPC US$8,5): confirma la tarea D3 (plantilla de RFP) como herramienta.

**Hecho cuando:** cada artículo publicado (0.2), enlazado desde su servicio y
desde C5/C2 según corresponda, con impresiones en Search Console a las 4 semanas.

---

## Fase D — Herramientas

### D1 Test de preparación para ERP
1. Diseñar 10 preguntas con puntuación (procesos, datos, equipo, presupuesto,
   patrocinio) y 3 resultados (no está listo / casi / listo) con recomendaciones.
2. Página `/herramientas/test-preparacion-erp` (ES/EN), ruta en `PAGES` y
   `route-meta.json`. El cuestionario es interactivo: el HTML prerenderizado
   muestra la introducción y la primera pregunta; el estado vive en React.
3. Resultado inmediato en pantalla; informe por correo opcional (B4) con
   `trackEvent("tool_complete")`.
4. JSON-LD `WebApplication` o `Quiz` + `BreadcrumbList`.
5. Enlazar desde la guía de ERP, C1–C4 y la página de ERP.

### D2 Calculadora de costo total de un ERP
1. Entradas: usuarios, módulos, nube/local, años, costo de implementación
   estimado (% de licencias), soporte anual, personal interno.
2. Salida: costo por año y total a 5 años, con supuestos visibles y editables.
3. Sin cifras de fabricantes inventadas: valores por defecto marcados como
   "ejemplo, ajústelos a su cotización".
4. Igual que D1 en ruta, eventos y enlaces (sobre todo desde C4).

### D3 Plantilla de RFP para ERP
1. Copiar el patrón de `scripts/build-change-template.py` →
   `scripts/build-rfp-template.py` (ES/EN) → `public/descargas/`.
2. Hojas: instrucciones, información de la empresa, requerimientos funcionales
   por módulo (con prioridad), técnicos, comerciales, matriz de evaluación
   ponderada, calendario del proceso.
3. Bloque `download` en la guía de ERP y en C1–C4.

### D4 Plantilla de gestión del cambio ✅
Hecha el 2026-10-05: `scripts/build-change-template.py`. Reutilizar el patrón.

### D5 Test de preparación para el cambio
Como D1, con los 5 pasos de ADKAR por grupo; enlazado desde la guía de gestión
del cambio y la página de servicio.

---

## Fase E — Estudio propio

### E1 Diseño
1. 15–20 preguntas: tamaño, sector, país, sistemas actuales, proyectos en
   curso, presupuesto de TI (% de ingresos), uso de IA, causas de fracaso,
   gestión del cambio, madurez de datos.
2. Formulario (Google Forms / Tally) con consentimiento de datos.

### E2 Recolección
**[Cliente]** Difundir por LinkedIn (Jackson y página), base de clientes,
gremios. Meta: 100–200 respuestas en 4–6 semanas.

### E3 Publicación
1. **[Claude]** Análisis (porcentajes, cruces por tamaño y sector), gráficos
   (skill `dataviz`), página `/estudio-transformacion-digital-2026` (ES/EN) con
   resumen, hallazgos (cada uno con una frase citable), metodología (n, fechas,
   países) y PDF descargable.
2. JSON-LD `Report` o `Dataset` + `Article`.

### E4 Difusión
1. Nota de prensa con 3 hallazgos y una cita de Jackson.
2. **[Cliente]** Enviar a El Heraldo, Portafolio, La República, gremios.
3. Citar el estudio desde los artículos relevantes (G) y `llms.txt`.

---

## Fase F — Autoridad externa

Datos NAP y descripciones listos para copiar en `autoridad-externa.md`
(actualizar: 15+ países, fundación 2017).

| ID | Paso a paso |
|---|---|
| F1 | **[Cliente]** Crear perfil en clutch.co → pedir reseña a 3 Castillos, Morelco y 1–3 clientes más (Clutch los entrevista por teléfono). **[Claude]** URL a `sameAs` y `llms.txt`. |
| F2 | **[Cliente]** En Google Business Profile, enviar el enlace de reseña a clientes; responder cada reseña. Copiar la URL de Maps (`maps.google.com/?cid=…`). **[Claude]** Reemplazar el `kgmid` del `sameAs` por esa URL. |
| F3 | **[Cliente]** Crear el perfil en crunchbase.com con los datos de `autoridad-externa.md`. **[Claude]** URL a `sameAs`. |
| F4 | **[Claude]** Preparar los datos (nombre, tipo, fundación 2017, fundador, sede, sitio, LinkedIn). **[Cliente]** Crear el elemento en wikidata.org (cuenta propia). **[Claude]** URL a `sameAs`. |
| F5 | **[Cliente]** Sortlist, GoodFirms, The Manifest, Cámara de Comercio de Barranquilla, ProColombia, ANDI/Fedesoft. Mismo NAP carácter por carácter. |
| F6 | **[Cliente]** Pedir enlace a cyrruscs.com en la página del docente / ponente / evento. |
| F7 | **[Claude]** Redactar 2 columnas de opinión a partir de los artículos. **[Cliente]** Proponerlas a medios. |
| F8 | **[Claude]** Tras cada perfil: `index.html` (`sameAs` de la organización) y `public/llms.txt`. |

**Hecho cuando:** cada perfil existe, está enlazado desde `sameAs` y el NAP coincide.

---

## Fase G — Contenido con volumen

Procedimiento 0.2. Ritmo: 2 por semana. Prioridad por volumen/dificultad (datos
de `plan-contenido-prioritario.md`; medir de nuevo antes de escribir).

| ID | Artículo | Keyword · volumen · SD | Enlaza a |
|---|---|---|---|
| G1 | Resistencia al cambio: causas y cómo superarla | resistencia al cambio · MX 1.600 · 34 | Gestión del cambio + guía |
| G2 | Qué es RPA y cuándo conviene frente a la IA | rpa · MX 2.900 · 28 | Tecnologías avanzadas |
| G3 | Qué es un CRM y cómo elegir el correcto | que es un crm · MX 5.400 · 43 | CRM |
| G4 | Agentes de IA para empresas: qué son y casos de uso | agentes de ia · MX 880 · 31 | Automatizaciones |
| G5 | Cambio organizacional: qué es, tipos y etapas | cambio organizacional · MX 1.300 · 29 | Gestión del cambio |
| G6 | Modelo ADKAR explicado paso a paso | modelo adkar · MX 480 · 26 | Gestión del cambio + D5 |
| G7 | Cómo implementar IA en una empresa: guía paso a paso | (medir) | Gobierno de IA |
| G8 | Software de nómina vs HCM | software de nómina · MX 590 · 18 | HCM |
| G9 | Gerencia de proyectos vs gestión de proyectos | gerencia de proyectos · MX 390 · 11 | PMO |
| G10 | Arquitectura empresarial: qué es y cómo empezar | arquitectura empresarial · MX 320 · 19 | Arquitectura de IA |
| G11 | Plan de continuidad de negocio: pasos y ejemplo | MX 260 · 21 | Leadership Academy |
| G12 | Arquitectura de datos: qué es y para qué sirve | MX 390 · 23 | Arquitectura |
| G13 | Consultoría tecnológica: qué es y cuándo contratarla | ES 720 · 36 | Hub de soluciones |
| G14 | KPI, OKR y Balanced Scorecard: cuál usar | (medir) | Estrategia |
| G15 | Transformación digital en la mediana empresa: por dónde empezar | transformación digital empresas · MX 260 · 38 | Estrategia |
| G16 | Qué es una PMO as a Service | (medir) | PMO + B1 |

**Hecho cuando:** publicado (0.2), con impresiones en Search Console a las 4 semanas.

---

## Fase H — Páginas por industria

1. Ruta `/industrias/:industria` (ES/EN) en `PAGES` y `route-meta.json`.
2. Contenido: problemas típicos del sector, cómo aplica CIRA, el caso, servicios
   relevantes, FAQ del sector. Mínimo 800 palabras propias, sin plantilla repetida.
3. Enlazar desde `/experiencia` (sección de industrias) y desde el caso.
4. **Solo** para industrias con caso publicado (H1 alimentos, H2 infraestructura).

---

## Fase I — Marca personal y distribución

| ID | Paso a paso |
|---|---|
| I1 | **[Claude]** Por cada artículo nuevo, 3–4 publicaciones de LinkedIn (skill `linkedin-cyrrus`): dato clave, lista práctica, opinión de Jackson, invitación a la guía. **[Cliente]** Publicar (martes a jueves, 7–9 a. m.). |
| I2 | **[Claude]** Guion de 60–90 s por guía. **[Cliente]** Grabar y subir a YouTube con enlace al artículo. **[Claude]** Incrustar el video en el artículo (`YoutubeFacade`) con `VideoObject`. |
| I3 | Newsletter mensual de LinkedIn con los artículos del mes y un caso. |
| I4 | **[Claude]** Proponer titular, "acerca de" y destacados del perfil de Jackson y de la página de empresa, alineados con el sitio. **[Cliente]** Aplicarlos. |

---

## Fase J — Prueba social y confianza

| ID | Paso a paso |
|---|---|
| J1 | **[Cliente]** Enviar los datos. **[Claude]** Actualizar `paginas.json` (`casos.3-castillos`, `casos.morelco`), `home.json` (testimonios) y `datos/casos-exito.md`. |
| J2 | **[Cliente]** Obtener autorización escrita (correo basta) de cada cliente. Guardar constancia fuera del repo. |
| J3 | **[Cliente]** Datos del caso nuevo (cliente, sector, año, problema, qué se hizo, cifras, testimonio). **[Claude]** Nueva entrada en `src/lib/case-studies.ts`, copy en `paginas.json` → `casos.<slug>`, ruta en `route-meta.json`, `llms.txt`. |
| J4 | **[Cliente]** Cifras con fecha de corte. **[Claude]** Barra de confianza y Experiencia. |
| J5 | Cuando el cliente lo decida: `quienesSomos`/`experiencia.team` + `Person` en schema. |
| J6 | **[Cliente]** 5–8 frases. **[Claude]** Sección en Quiénes somos (hitos) y `foundingDate` ya está. |
| J7 | **[Claude]** Redactar la política (sin comisiones, sin reventa, declaración de conflictos). **[Cliente]** Validar con Jackson. Página + enlace en footer y en servicios de selección. |
| J8 | **[Cliente]** Revisión con abogado (Ley 1581 de 2012, Decreto 1377 de 2013). **[Claude]** Aplicar el texto en `legal.json`. |
| J9 | Ver `archivo/PLAN-etapa-1.md` §3.1 y §3.3. |

---

## Fase K — Rendimiento y técnico

| ID | Paso a paso |
|---|---|
| K1 | Medir en PageSpeed tras A1. Si LCP > 2,5 s: identificar el elemento LCP, `fetchpriority="high"`/preload, revisar el shader del hero. Verificar con `scripts/lh.mjs`. |
| K2 | **[Cliente]** Foto horizontal o aprobar una existente. **[Claude]** `coverImage` en `blog-data.ts`, `npm run images`, commitear original + `opt/`. |
| K3 | **[Cliente]** Confirmar si `cyrruscs-dist/` se usa para algo. Si no: `git rm -r --cached cyrruscs-dist` y añadirlo a `.gitignore`. |
| K4 | Ampliar Gobierno de IA, Arquitectura de IA y Automatizaciones (FAQ nueva, ejemplos, enlace a G4/G7). |

---

## Fase L — Revisión trimestral

1. `/audit https://cyrruscs.com/` y comparar con la auditoría del 2026-10-05.
2. Ubersuggest: domain overview, keywords, backlinks; Search Console: top consultas.
3. Visibilidad en IA: 20 prompts fijos (p. ej. "¿qué consultora me ayuda a
   elegir un ERP en Latinoamérica?", "cómo hacer un plan de gestión del cambio")
   en ChatGPT, Perplexity y Gemini; contar cuántos citan a Cyrrus. Guardar la
   lista de prompts en `datos/prompts-ia.md` para repetir siempre los mismos.
4. Reordenar prioridades de C y G según qué trae impresiones y contactos.
