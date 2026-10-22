# Progreso — Etapa 2: competir y vender

> **Registro vivo.** Qué falta, en qué estado está cada tarea y qué se hizo en
> cada sesión, desde el 2026-10-05 hasta terminar el plan.
>
> - Qué y por qué → [`PLAN.md`](./PLAN.md)
> - Cómo, paso a paso → [`PASO-A-PASO.md`](./PASO-A-PASO.md)
> - Etapa 1 (historial) → [`archivo/PROGRESO-etapa-1.md`](./archivo/PROGRESO-etapa-1.md)

**Estados:** ⬜ pendiente · 🟡 en curso · ✅ hecho · ⛔ bloqueado (ver Bloqueos) · ➖ descartado

---

## Protocolo de sesión

**Al empezar:**
1. Leer `CLAUDE.md` (reglas de hidratación, imágenes, animaciones).
2. Leer este archivo: **Sesión actual / próxima**, **Bloqueos** y la última
   entrada de la **Bitácora**.
3. Abrir en `PASO-A-PASO.md` las tareas de la sesión.
4. `git log --oneline -10` y `git status`.
5. Si la sesión anterior generó un zip, confirmar si el cliente ya lo subió
   (y si sí, hacer A1).

**Al cerrar (obligatorio, aunque la sesión se corte a medias):**
1. Actualizar la tabla **Estado por tarea** (estado + nota corta).
2. Añadir la entrada **Sesión N** en la **Bitácora** con la plantilla de abajo.
3. Actualizar **Sesión actual / próxima** (qué toca en la N+1).
4. Mover a **Bloqueos** lo que quedó esperando al cliente.
5. Si hubo deploy o medición, registrar en **Métricas**.
6. Si se generó build: crear el zip (PASO-A-PASO 0.3) y anotar su nombre.
7. Commit con el mensaje `Sesión N: …`.

**Plantilla de bitácora:**
```markdown
### Sesión N — AAAA-MM-DD — <título corto>
- **Tareas trabajadas:** IDs (estado final de cada una)
- **Hecho:** qué cambió, con archivos principales
- **Verificación:** build, rutas revisadas, consola, Lighthouse
- **Commits:** hashes
- **Zip para subir:** nombre o "no aplica"
- **Pendiente / bloqueos nuevos:** …
- **Próxima sesión:** …
```

---

## Sesión actual / próxima

**Última sesión cerrada:** Sesión 3 (2026-10-21, A1 verificado; C8 y C9 publicados).

**Próxima: Sesión 4.** Orden sugerido:
1. Confirmar si el cliente subió `cyrrus-dist-2026-10-21-v4.zip` (C8 + C9). Hacer **A2** (pedir indexación de los 6 artículos nuevos, los 2 casos y la guía de gestión del cambio; reenviar sitemap) y **A5**/**K1** (PageSpeed real de producción).
2. Si llegaron los insumos de venta: **B1**, **B3**, **B5**.
3. **C10** (SAP B1 precio), **C11** (CMMS), **C12** (S/4HANA, verificar fechas en SAP), y **I1** (LinkedIn para C1–C5 y C9). Medir cada keyword antes de escribir.
4. Después: C13–C14, C6/C7.

**Criterio editorial (decidido por el cliente en la Sesión 3):** el lector objetivo es alta gerencia (CEO, CFO, COO) de empresas de 50+ empleados que pueden contratar consultorías de COP 30 millones o más. Cada artículo debe hablar en costo total a varios años, riesgo, capital de trabajo y gobierno, no en funciones del producto; el CTA lleva a una conversación de diagnóstico, no a una descarga.

**Hoja de ruta de las siguientes sesiones** (se ajusta al cerrar cada una):

| Sesión | Foco | Tareas |
|---|---|---|
| 1 ✅ | Comparativas (adelantadas a pedido del cliente) | C1–C5 + K1 parcial |
| 2 ✅ | Investigación de temas para compradores de 50–100+ empleados | C8–C18 (definidas) |
| 3 ✅ | Verificar despliegue + primeras categorías caras | A1, C8, C9 |
| 4 | Indexación, medición y siguientes categorías | A2, A5, C10, C11, C12, I1 (B1, B3, B5 si llegan insumos) |
| 5 | Primera herramienta | D1 + B4 |
| 6 | Contenido con volumen | G1, G2 |
| 7 | Contenido CRM | G3 |
| 8 | Herramienta de costo | D2 (enlazada desde C4) |
| 9 | Contenido | G4, G5 |
| 10 | Estudio propio (diseño) | E1 + G6 |
| 11 | Industrias | H1, H2 |
| 12–15 | Contenido G7–G16 a 2 por sesión; E3 cuando haya respuestas | — |
| 15 (≈ 90 días) | Revisión trimestral | L1 |

Las tareas **[Cliente]** de F, I y J se avanzan en paralelo; cada sesión revisa
qué llegó y lo integra (F8, J1, J3…).

---

## Estado por tarea

### Fase A — Despliegue y medición
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| A1 | Desplegar y verificar en producción | ✅ | 2026-10-21: producción sirve el build v3 (hash del bundle idéntico, 10 rutas 200, `Cache-Control: no-cache`). El v4 está pendiente de subir |
| A2 | Search Console: sitemap, indexación, revisión semanal | 🟡 | Acceso desde 2026-09-18; falta reenviar sitemap y pedir indexación tras subir el v4, y la revisión semanal |
| A3 | Bing Webmaster Tools | ⬜ | |
| A4 | GA4 con conversiones | ⛔ | Falta acceso a GA4. `file_download` ya existe en artículos |
| A5 | PageSpeed real tras cada deploy | ⬜ | Lab local 2026-10-05: TBT 33 ms tras `startTransition` |
| A6 | Tablero mensual de KPIs | ⛔ | Depende de A4 |
| A7 | Vigilancia de backlinks spam | ⬜ | Base: 66 dominios, casi todos PBN (2026-10-05) |

### Fase B — Conversión inmediata
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| B1 | Diagnóstico a precio fijo | ⛔ | Falta alcance, duración y precio |
| B2 | Rangos de precio por servicio | ⛔ | Faltan rangos |
| B3 | Agenda directa + WhatsApp | ⛔ | Falta enlace de agenda y número |
| B4 | Secuencia de correos | ⛔ | Falta elegir herramienta |
| B5 | Revisión del formulario | ⬜ | |

### Fase C — Comparativas agnósticas
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| C1 | Mejores ERP para medianas empresas | ✅ | 2026-10-05 (Sesión 1). `/perspectivas/mejores-erp-para-medianas-empresas`, ES/EN, 6 ERP, tabla, 10 fuentes. "mejores erp" MX 110 · SD 35 |
| C2 | SAP B1 vs NetSuite vs Dynamics 365 BC | ✅ | Sesión 1. `/perspectivas/sap-business-one-vs-netsuite-vs-dynamics-365-business-central`. MX 10 · SD 27 · CPC US$7,7 |
| C3 | Odoo vs SAP Business One | ✅ | Sesión 1. `/perspectivas/odoo-vs-sap-business-one-diferencias`. "odoo vs sap" MX 70 · SD 17 |
| C4 | Cuánto cuesta implementar un ERP | ✅ | Sesión 1. `/perspectivas/cuanto-cuesta-implementar-un-erp`. MX 20 · SD 27; ejemplo de cálculo con precios publicados |
| C5 | Salesforce vs HubSpot vs Dynamics 365 | ✅ | Sesión 1. `/perspectivas/salesforce-vs-hubspot-vs-dynamics-365-crm`. MX 20 · SD 25 · CPC US$8; enlazada desde la página de CRM |
| C6 | Mejores CRM | ⬜ | |
| C7 | ERP vs Excel | ⬜ | Medir keyword primero |
| C8 | Reforzar C5 para empresas de 100+ | ✅ | Sesión 3. Sección "¿Qué cambia si su empresa tiene más de 100 empleados?" (costo total, integración con ERP, riesgo de migración) + tabla por situación, ES/EN. Falta cambiar el CTA a diagnóstico cuando exista B1 y enlazar C15–C18 |
| C9 | Sistema WMS y cómo elegirlo | ✅ | Sesión 3. `/perspectivas/sistema-wms-que-es-y-como-elegir`, ES/EN. Enfocado en decisión gerencial (WMS vs ERP, costo total a 5 años, señales de alerta). Fuentes: Microsoft Learn (2) y SAP Press. MX 880 · SD 10 |
| C10 | Cuánto cuesta SAP Business One | ⬜ | Sesión 2: MX 140 + 110 · SD 23–28 |
| C11 | Software de mantenimiento (CMMS/EAM) | ⬜ | Sesión 2: MX 170 · SD 34 · CPC US$54 |
| C12 | Migrar de SAP ECC a S/4HANA | ⬜ | Sesión 2: MX 1.900 · SD 28. Verificar fechas de soporte en SAP |
| C13 | Software de RR. HH. y nómina (100+) | ⬜ | Sesión 2: MX 260 · SD 18 · CPC US$22,6. Coordinar con G8 |
| C14 | Software MES | ⬜ | Sesión 2: MX 140 · SD 17 |
| C15 | Integrar ERP y CRM sin middleware | ⬜ | Sesión 2: satélite para respuestas de IA |
| C16 | Costo total de propiedad de un CRM | ⬜ | Sesión 2: satélite para respuestas de IA |
| C17 | Fin de venta de Salesforce CPQ | ⬜ | Sesión 2: verificar fechas en Salesforce |
| C18 | Gobernanza y deduplicación de datos en el CRM | ⬜ | Sesión 2: satélite para respuestas de IA |

### Fase D — Herramientas
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| D1 | Test de preparación para ERP | ⬜ | |
| D2 | Calculadora de costo total de ERP | ⬜ | |
| D3 | Plantilla de RFP para ERP | ⬜ | Reutilizar patrón de `scripts/build-change-template.py` |
| D4 | Plantilla de gestión del cambio | ✅ | 2026-10-05, ES/EN, enlazada desde la guía |
| D5 | Test de preparación para el cambio | ⬜ | |

### Fase E — Estudio propio
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| E1 | Diseño de la encuesta | ⬜ | |
| E2 | Recolección | ⬜ | [Cliente] |
| E3 | Página + PDF | ⬜ | |
| E4 | Difusión | ⬜ | |

### Fase F — Autoridad externa
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| F1 | Clutch + reseñas | ⬜ | [Cliente] |
| F2 | Reseñas en Google + URL de Maps en `sameAs` | ⬜ | [Cliente] |
| F3 | Crunchbase | ⬜ | [Cliente] |
| F4 | Wikidata | ⬜ | Claude prepara datos; cliente crea |
| F5 | Directorios | ⬜ | [Cliente] |
| F6 | Universidades | ⬜ | [Cliente] |
| F7 | Columnas en medios | ⬜ | |
| F8 | `sameAs` y `llms.txt` por perfil | ⬜ | `alternateName` y `foundingDate` ya publicados |

### Fase G — Contenido con volumen
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| G1 | Resistencia al cambio | ⬜ | |
| G2 | Qué es RPA | ⬜ | |
| G3 | Qué es un CRM | ⬜ | |
| G4 | Agentes de IA | ⬜ | |
| G5 | Cambio organizacional | ⬜ | |
| G6 | Modelo ADKAR | ⬜ | |
| G7 | Cómo implementar IA | ⬜ | |
| G8 | Nómina vs HCM | ⬜ | |
| G9 | Gerencia vs gestión de proyectos | ⬜ | |
| G10 | Arquitectura empresarial | ⬜ | |
| G11 | Plan de continuidad de negocio | ⬜ | |
| G12 | Arquitectura de datos | ⬜ | |
| G13 | Consultoría tecnológica | ⬜ | |
| G14 | KPI, OKR y Balanced Scorecard | ⬜ | |
| G15 | Transformación digital en la mediana empresa | ⬜ | |
| G16 | PMO as a Service | ⬜ | |

### Fase H — Industrias
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| H1 | Alimentos (3 Castillos) | ⬜ | |
| H2 | Infraestructura (Morelco) | ⬜ | |

### Fase I — Marca personal y distribución
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| I1 | Calendario de LinkedIn por artículo | ⬜ | |
| I2 | Videos cortos | ⬜ | |
| I3 | Newsletter de LinkedIn | ⬜ | |
| I4 | Perfiles alineados | ⬜ | |

### Fase J — Prueba social y confianza
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| J1 | Completar datos de los casos | ⛔ | Nombre del CIO, ERP/CRM e implementador, cargo de F. Gutiérrez |
| J2 | Autorización escrita de clientes | ⛔ | [Cliente] |
| J3 | Tercer caso | ⛔ | [Cliente] |
| J4 | N.º de proyectos y clientes | ⛔ | El cliente lo debe |
| J5 | Daniel y equipo | ⛔ | Pospuesto por el cliente |
| J6 | Historia de la empresa | ⛔ | Pospuesto por el cliente |
| J7 | Política de independencia | ⬜ | |
| J8 | Revisión legal de privacidad (Ley 1581) | ⛔ | [Cliente] con abogado |
| J9 | Leadership Academy: fichas e indexación | ⛔ | Falta detalle de talleres |

### Fase K — Rendimiento y técnico
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| K1 | LCP móvil < 2,5 s en producción | 🟡 | Sesión 1: `PageHero` sin `opacity: 0` (CSS `hero-rise`): LCP de laboratorio en /metodo-cira/estrategia 4,77 → 3,61 s. Falta medir en producción tras A1 |
| K2 | Portada horizontal para ERP | ⬜ | Hoy 720×1600 |
| K3 | `cyrruscs-dist/` en el repo | ⛔ | Decisión del cliente |
| K4 | Profundidad de Intelligence Lab | ⬜ | |

### Fase L — Revisión trimestral
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| L1 | Re-auditoría a 90 días | ⬜ | ≈ 2027-01-05 |
| L2 | Reevaluar URLs y keywords | ⬜ | |

---

## Bloqueos (insumos pendientes del cliente)

| Insumo | Pedido | Recibido | Desbloquea |
|---|---|---|---|
| Subir `cyrrus-dist-2026-10-21-v4.zip` (C8 + C9; reemplaza v3, que ya está en producción) | 2026-10-21 | ⬜ | A2, A5, K1 |
| Acceso a GA4 | sep-2026 | ⬜ | A4, A6 |
| Diagnóstico de entrada: alcance, duración, precio | 2026-10-05 | ⬜ | B1 |
| Rangos de precio por servicio | 2026-10-05 | ⬜ | B2 |
| Enlace de agenda + número de WhatsApp | 2026-10-05 | ⬜ | B3 |
| Herramienta de correo | 2026-10-05 | ⬜ | B4, D1 |
| Datos faltantes de casos + autorización escrita | 2026-10-05 | ⬜ | J1, J2 |
| Tercer caso | 2026-10-05 | ⬜ | J3 |
| N.º de proyectos y clientes con fecha de corte | 2026-10-05 | ⬜ | J4 |
| Revisión legal de privacidad | 2026-10-05 | ⬜ | J8 |
| Detalle de talleres | sep-2026 | ⬜ | J9 |
| Decisión sobre `cyrruscs-dist/` | sep-2026 | ⬜ | K3 |

---

## Métricas

| Fecha | Fuente | Clics/mes | Keywords top 10 | DA / dominios | Lighthouse móvil / LCP / TBT | Notas |
|---|---|---|---|---|---|---|
| 2026-09-18 | Search Console | ~15 (46 en 3 meses) | — | — | — | Casi todo tráfico de marca |
| 2026-10-05 | Ubersuggest | ~8 (estimado) | 0 (7 keywords posicionadas) | 13 / 66 (spam) | PageSpeed (vía Ubersuggest): LCP 2,9 s, TBT 1,5 s | Producción con el build del 3-oct |
| 2026-10-05 | `scripts/lh.mjs` (local, 3 runs) | — | — | — | 87 / 3,39 s / 33 ms | Tras hidratar en `startTransition` (antes 127 ms) |
| 2026-10-05 | `scripts/lh.mjs --route metodo-cira/estrategia` (local, 3 runs) | — | — | — | 85 / 3,61 s / 13 ms | Antes del arreglo de `PageHero`: 77 / 4,77 s / 15 ms |

---

## Bitácora de sesiones

### Sesión 3 — 2026-10-21 — Despliegue verificado y primeras categorías de software caro (C8, C9)
- **Tareas trabajadas:** A1 ✅, C8 ✅, C9 ✅. Criterio nuevo del cliente: lector objetivo = alta gerencia (CEO/CFO/COO) de empresas de 50+ empleados que pueden pagar consultorías de COP 30 millones o más.
- **Hecho:**
  - A1: producción ya servía el build v3 (hash del bundle `index-Bw1hGO1U.js` idéntico al de `dist/`, 10 rutas en 200, `Cache-Control: no-cache`, `Last-Modified` 2026-10-05).
  - C8: en el artículo de CRM (el de más tráfico) se añadió la sección "¿Qué cambia si su empresa tiene más de 100 empleados?" (la licencia deja de ser la partida mayor; pesan implementación, integración con ERP, calidad de datos, adopción y costo de migrar después) y la tabla "Mejor punto de partida según su situación" (5 escenarios, con qué validar antes de decidir). ES/EN. Segundo CTA de servicio movido tras la sección nueva (`serviceCtaIndexes` [6, 16]).
  - C9: artículo nuevo "Sistema WMS: qué es, WMS vs ERP y cómo elegirlo" (ES/EN) escrito para quien decide, no para quien opera: señales que llegan al margen, tabla de tres formas de resolver la bodega, cuatro preguntas de la gerencia antes de comprar (problema en términos de negocio, costo total a 5 años, quién sostiene el sistema, día del cambio). Sin cifras de mercado inventadas. Enlazado desde la guía de ERP, `llms.txt` y (ida y vuelta) al artículo de costo de ERP.
- **Verificación:** build de 98 rutas; consola limpia en WMS (ES/EN) y CRM; JSON-LD válido; tabla y H2 correctos.
- **Commits:** ver `git log` (mensaje "Sesión 3: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-21-v4.zip`.
- **Pendiente / bloqueos nuevos:** subir el v4. No se pudo abrir las páginas de Oracle y SAP (403); la definición de WMS se apoya en Microsoft Learn y SAP Press. Falta el enlace de C9 desde la página de servicio de ERP (hoy solo desde la guía) y revisar la portada (reutiliza una foto genérica).
- **Próxima sesión:** Sesión 4 (ver arriba).

### Sesión 2 — 2026-10-21 — Investigación de temas para compradores de software de 50–100+ empleados
- **Tareas trabajadas:** C8–C18 (definidas en el plan, ⬜); sin cambios en el sitio.
- **Hecho:**
  - Evaluación del artículo C5 (Salesforce vs HubSpot vs Dynamics 365), el de más tráfico: sirve como puerta de entrada (intención de compra, agnóstico, tabla de precios), pero atrae a pymes y a quien solo compara. Le faltan lo que le importa a una empresa de 100+ (integración con ERP, gobernanza, costo de implementación), una tabla "mejor opción por escenario" y un CTA de nivel adecuado. → C8.
  - Investigación en Ubersuggest (2026-10-21), por país en español. Hallazgo: casi nadie busca "cómo seleccionar software"; el comprador grande busca **la categoría**. Oportunidades medidas: sistema WMS MX 880 · SD 10 (CO 390); SAP Business One precio MX 140 + 110 · SD 23–28; software CMMS MX 170 · SD 34 · CPC US$54; SAP S/4HANA MX 1.900 · SD 28; software de RR. HH. MX 260 · SD 18 · CPC US$22,6; software MES MX 140 · SD 17.
  - Cuatro satélites de CRM (C15–C18) pensados para las respuestas de IA de directores de operaciones y RevOps (sin volumen medible en Ubersuggest).
  - Decisiones nuevas en `PLAN.md`: D10 (cliente 50–100+ y temas por categoría), D11 (medir por país en español), D12 (tabla "mejor opción por escenario"). Fase C ampliada con la subfase C-bis; detalle, notas y descartes en `PASO-A-PASO.md`.
  - Descartado: comparativas en español entre ERP/CRM por nombre (≈10 búsquedas/mes en México; las cifras grandes eran búsquedas en inglés), "selección de erp", "migración erp"; "consultoría erp" (170) va a la página de servicio.
- **Verificación:** no aplica (solo documentación). Los volúmenes se vuelven a medir antes de escribir cada artículo.
- **Commits:** incluidos en el commit de la Sesión 3.
- **Zip para subir:** no aplica (el zip v3 de la Sesión 1 sigue esperando deploy).
- **Pendiente / bloqueos nuevos:** ninguno nuevo. Para C12 y C17 hay que verificar fechas oficiales (SAP, Salesforce) antes de publicar.
- **Próxima sesión:** Sesión 3 (ver arriba).

### Sesión 1 — 2026-10-05 — Comparativas agnósticas de ERP y CRM (C1–C5)
- **Tareas trabajadas:** C1 ✅, C2 ✅, C3 ✅, C4 ✅, C5 ✅, K1 🟡 (a pedido del cliente se adelantaron las comparativas; A1 sigue esperando el deploy).
- **Hecho:**
  - Keywords medidas en Ubersuggest (MX): "mejores erp" 110 · SD 35; "odoo vs sap" 70 · SD 17; "cuanto cuesta un erp" 20 · SD 27; "sap business one vs netsuite" 10 · CPC US$7,7; "salesforce vs hubspot" 20 · CPC US$8. Poco volumen, pero intención de compra alta.
  - 5 artículos ES/EN en `blog.json` + `blog-data.ts`: mejores ERP, SAP B1 vs NetSuite vs Business Central, Odoo vs SAP B1, cuánto cuesta un ERP, Salesforce vs HubSpot vs Dynamics 365. Cada uno con respuesta directa, tabla comparativa, declaración de independencia, 2 tarjetas de servicio, CTA final y fuentes.
  - Datos verificados en fuentes oficiales (octubre de 2026): Business Central US$80/110/8; Odoo Standard US$7,95 y Custom US$13,40 (anual), Community LGPLv3; NetSuite licencia anual = plataforma + módulos + usuarios + implementación única; SAP B1 para pymes, cotizado vía socios, SAP HANA o SQL Server; Acumatica por consumo con usuarios ilimitados; GROW with SAP; Salesforce US$0/25/100/195/395/550; HubSpot gratis 2 usuarios y onboarding US$1.500/3.500; Dynamics 365 Sales US$65/105/150. Se descartaron precios de NetSuite publicados por terceros (no oficiales).
  - Renderizador de artículos: bloque `table` y `seoTitle` opcional (títulos ≤ 60 caracteres en el `<title>`; el H1 se mantiene completo).
  - Enlaces: guía de ERP → mejores ERP y costo; página de servicio de CRM → comparativa de CRM; `llms.txt`.
  - `PageHero` pasó de framer-motion (`opacity: 0` en el HTML estático) a la clase CSS `hero-rise`: el H1 de todas las páginas interiores es visible antes del JavaScript. LCP de laboratorio 4,77 → 3,61 s en Estrategia. Regla añadida a `CLAUDE.md`.
  - `public/favicon.ico` (antes 404 en producción).
- **Verificación:** build de 96 rutas; las 10 versiones nuevas con tabla, 3 ideas clave, fuentes, 4 enlaces al servicio y JSON-LD válido; consola limpia en pestaña nueva (artículos, Estrategia, caso EN).
- **Commits:** ver `git log` (mensaje "Sesión 1: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-05-v3.zip`.
- **Pendiente / bloqueos nuevos:** artículos de 460–770 palabras de texto (más tabla); se pueden ampliar con FAQ cuando haya datos de Search Console. Precios a revisar cada trimestre (L1).
- **Próxima sesión:** Sesión 2 (ver arriba).

### Sesión 0 — 2026-10-05 — Línea base: auditoría, casos, datos del cliente y nuevo plan
- **Tareas trabajadas:** auditoría `/audit` + Ubersuggest; D4 ✅; base de A, F8, J, K.
- **Hecho:**
  - Auditoría en producción: SEO ~76 (C), Visibilidad IA ~66 (D). Ubersuggest: ~8 visitas/mes, DA 13, backlinks spam.
  - Página de ERP separada de la guía (intención comercial vs informativa); YouTube `@cyrruscs`; Presencia Digital como servicio aparte; `Cache-Control: no-cache` en HTML; zips fuera del repo.
  - Casos `/experiencia/3-castillos` y `/experiencia/morelco` (ES/EN, `Article` + `VideoObject`), video del CIO, cifras por caso en testimonios.
  - Datos del cliente: 15+ países (los 15 del schema en los mapas), 12 industrias, fundación 2017, 60% como "medición interna", "4 metodologías propias", trayectoria y formación de Jackson (`Person` con `alumniOf`, `AboutPage`).
  - Schema de la organización en inglés en `/en`; `llms.txt` reordenado.
  - Artículos: "En breve", respuesta directa, cifras con fuente (BCG, Prosci, PMI, HBR, NIST, ISO), bio del autor.
  - Hidratación en `startTransition` (TBT local 127 → 33 ms).
  - Guía pilar de gestión del cambio + plantilla Excel ES/EN (`scripts/build-change-template.py`).
  - Plan reescrito: `PLAN.md` (etapa 2), `PASO-A-PASO.md` y este archivo; la etapa 1 pasó a `archivo/`.
- **Verificación:** build de 86 rutas; consola limpia en Inicio, Experiencia, casos, Quiénes somos, artículos, gestión del cambio (ES/EN); descarga de plantilla 200.
- **Commits:** cbbbc73 → ec030eb (+ commit de este plan).
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-05-v2.zip`.
- **Pendiente / bloqueos nuevos:** ver tabla de Bloqueos.
- **Próxima sesión:** Sesión 1 (ver arriba).
