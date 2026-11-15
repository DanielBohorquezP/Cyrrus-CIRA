# Auditoría SEO y plan de catálogo — 2026-11-12

Fuentes (todas medidas el 2026-11-12): **Search Console** (`sc-domain:cyrruscs.com`, 2026-08-13 → 2026-11-11),
**Ubersuggest** (rank tracking de las 101 keywords del proyecto, informe del 2026-11-11, y
`keyword_suggestions`), y los `<title>`/H1 servidos hoy en producción. Todo número de este documento sale de
una de esas tres fuentes. Lo que no se pudo medir está marcado **[no medido]**.

---

## 1. Diagnóstico en una página

| Hecho medido | Lectura |
|---|---|
| 90 días: **28 clics**, 14.960 impresiones. **21 de los 28 clics son la búsqueda "cyrrus"** (marca). | El sitio todavía no capta demanda de servicios: solo lo encuentran quienes ya conocen la marca. |
| Ubersuggest: de 101 keywords, **93 no aparecen en el top 100**, 7 están entre 8 y 100 y solo **1 está en el top 10** ("gobierno de inteligencia artificial", EN, posición 8). | Las keywords de la lista no rankean aún; no es un problema de títulos. |
| Los títulos y H1 de las páginas de servicio **ya contienen la keyword comercial** (ES y EN) desde la Sesión 16. | Cambiar títulos otra vez rinde poco. Lo que falta es (a) **una página por intención** y (b) **autoridad**. |
| Las impresiones vienen de los **artículos**, no de las páginas de servicio. Top: comparativa CRM 5.600 (ES+EN), costo de ERP EN 1.275, qué es una PMO 1.500 (ES+EN), planeación estratégica EN 770. | El blog es hoy la puerta de entrada; los servicios casi no tienen impresiones comerciales. |
| **Canibalización inversa**: para "consultoría pmo" y "pmo como servicio" rankea el **artículo** ("qué es una PMO…", posiciones 23–68), no la página `/metodo-cira/gestion-de-proyectos`. | Google ve el artículo como mejor respuesta que el servicio. Hay que reforzar el servicio y enlazarlo desde el artículo. |
| El **inglés pesa más que el español** en impresiones (páginas `/en/…` concentran la mayoría), pero **las URLs en inglés usan slugs en español** (`/en/perspectivas/cuanto-cuesta-implementar-un-erp`, `/en/metodo-cira/…`). | El slug es una señal de relevancia; hoy el inglés compite con una URL en otro idioma. |
| 57 de las 101 keywords están en inglés (EE. UU.); las de Colombia (`locId 2170`) casi todas tienen volumen 0–20. | La lista mezcla términos con demanda real (EN) con términos sin demanda (ES-Colombia). Ver §3. |
| Ubersuggest marca **4 páginas con título duplicado** (impacto alto). | **[Pendiente identificar cuáles]** con `site_audit_results`. |
| Las URL antiguas de WordPress (`/cfo-aas/`, `/nuestro-equipo/`, `/change-management/`, `/contact-page/`) dan 301 correcto. | Sin problema; siguen apareciendo en Google mientras se reindexa. |

**Conclusión:** el SEO on-page está razonablemente alineado. Subir posiciones depende de tres frentes, en este orden:
1. **Cubrir intenciones que hoy no tienen página propia** (ciberseguridad, continuidad, gobierno de datos, estrategia de TI/IA, ISO 27001 como consultoría, implementación de ERP/CRM).
2. **Convertir las impresiones del blog en visitas a servicios** (enlaces internos, CTA, y mejorar las consultas en posiciones 8–30).
3. **Autoridad externa** (dominio con DA 13 según el estudio de octubre; ver `autoridad-externa.md`). Sin enlaces, las keywords con SD > 25 no pasarán de la página 2 aunque el contenido sea bueno.

---

## 2. ¿Para qué quieres rankear en estas keywords? (la lectura comercial)

Las 101 keywords son **búsquedas de quien está evaluando contratar a un consultor**. Se agrupan en 9 familias. El valor está en
el CPC (lo que otros pagan por el clic) combinado con la dificultad (SD) y el volumen.

| Familia | Keywords EN con mejor relación | Vol. · SD · CPC (USD) | Página que hoy debería rankear | ¿Existe página dedicada? |
|---|---|---|---|---|
| **Ciberseguridad** | cybersecurity consulting services | 2.400 · 12 · 29 | `…/infraestructura-tecnologica` (sección) | ❌ solo una sección dentro de infraestructura |
| | cybersecurity consulting firms | 1.600 · 34 · 30 | | |
| **ERP** | erp consultant | 1.600 · 15 · 31 | `…/seleccion-de-software/erp` (único ranking: pos. 72, 10 búsq.) | ✅ pero es de **selección**; falta **implementación** |
| | erp consulting services / implementation consulting / firms | 590 · 18 / 480 · 22 / 480 · 29 | | ❌ implementación |
| **Estrategia de TI / planeación** | it strategy consulting | 1.900 · 19 · 9,6 | `/metodo-cira/estrategia` | ❌ no hay "estrategia de TI" |
| | strategic planning consultant | 720 · 25 · 34 | | ✅ |
| | business strategic planning consultant | 210 · 6 · 0 | | ✅ |
| **Cambio** | change management consulting | 1.000 · 14 · 31 | `/metodo-cira/gestion-del-cambio` | ✅ (sin ranking aún) |
| **IA** | ai consulting services | 1.900 · 35 · 52 | `/intelligence-lab` | ✅ (SD alto) |
| | ai strategy consulting | 880 · 27 · 33 | | ❌ no hay página de estrategia de IA |
| | generative ai consulting services / ai implementation | 260 · 21 · 48 / 260 · 26 · 40 | | ❌ |
| **Transformación digital** | digital transformation consulting | 1.900 · 37 · 23 | home / `/metodo-cira` | ✅ (SD alto, a largo plazo) |
| | …companies / …company / …providers | 720 · 35 / 590 · 38 / 70 · 5 | | |
| **PMO** | project management consulting services | 480 · 21 · 25 | `/metodo-cira/gestion-de-proyectos` | ✅ |
| | pmo consulting services | 390 · 18 · 8 | | |
| **Continuidad** | business continuity consulting (services) | 260 · 14 · 19 / 590 · 10 · 10 | `/leadership-academy/continuidad-de-negocio-drp` (es un **taller**) | ❌ no hay servicio de consultoría |
| **Gobierno de datos** | data governance consulting (services) | 320 · 28 · 131 / 390 · 14 · 41 | `…/gobierno-de-ia` (rankea 15 EN / 23 ES para "consultoría gobierno de datos") | ❌ solo un taller y menciones |
| **ISO 27001** | iso 27001 consulting (services) | 260 · 29 · 59 | `/leadership-academy/iso-27001` (es un **curso**) | ❌ intención distinta |
| **Automatización** | business process automation consulting | 170 · 14 · 45 | `…/automatizaciones-desarrollo` | ✅ |
| | robotic process automation consulting | 90 · 33 · 21 | `…/tecnologias-avanzadas` | ✅ |
| **CRM** | crm consulting services | 260 · 20 · 18 | `…/seleccion-de-software/crm` | ✅ |

**Volumen en español:** casi todos los términos ES de la lista tienen 0–50 búsquedas/mes (Colombia 0–20). Excepciones medidas:
"consultoría empresarial" MX **390 · SD 11**, "consultoría de negocios" MX **390 · SD 27**, "consultoría ti" MX **320 · SD 14**,
"consultores sap" MX **480 · SD 16**, "consultoría tecnológica" MX **260 · SD 23**, "consultoría estratégica" MX **260 · SD 25**.
Esas seis son las únicas ES que justifican esfuerzo propio. Las demás ES conviene **no perseguirlas con página propia**: se cubren
con el título/H1 de la página correspondiente.

> **Decisión de enfoque que tienes que tomar:** el mayor volumen está en **inglés (EE. UU.)**. Si Cyrrus quiere vender fuera de LATAM,
> el sitio EN debe tratarse como mercado principal (slugs, títulos, artículos en EN propios). Si el objetivo es LATAM hispano,
> las 57 keywords EN de la lista aportan poco y conviene enfocar el esfuerzo en las seis ES de arriba. **Esta decisión es del cliente.**

---

## 3. Mapa keyword → página → acción (las 101, agrupadas)

Las posiciones reales hoy (Ubersuggest): "gobierno de inteligencia artificial" EN **8**; "consultoría gobierno de datos" EN **15**, ES **23**;
"consultoría pmo" ES **36** (artículo), EN **33** (artículo); "pmo como servicio" EN **38**, ES **68** (artículo); "consultor erp" EN **72**.
El resto: fuera del top 100.

| Familia / keywords de tu lista | Página objetivo | Acción concreta |
|---|---|---|
| gobierno de inteligencia artificial · gobernanza de IA · consultoría gobierno de datos · data governance consulting (+services) | `/intelligence-lab/gobierno-de-ia` **+ página nueva de gobierno de datos** | Título ES: incluir "Gobierno de inteligencia artificial" literal (hoy "Gobernanza de IA y de Datos"); GSC: "gobernanza de ia" 134 imp, pos 23. Crear página propia de **gobierno de datos** y dejar `gobierno-de-ia` solo para IA. |
| consultoría pmo · pmo como servicio · pmo consulting services · project management consulting services · consultoría gestión de proyectos | `/metodo-cira/gestion-de-proyectos` | Añadir sección "PMO como servicio" (H2) y enlazar desde el artículo con ese ancla. En el artículo, CTA al servicio. Hoy el artículo rankea y el servicio no. |
| consultor erp · consultoría erp · erp consultant/consulting services/firms/implementation consulting/selection consultant · contratar/cotizar consultoría erp · implementación erp (+pymes) | ERP: selección (existe) + **implementación (nueva)** | Separar "elegir ERP" de "implementar ERP con PMO". Artículos EN de apoyo (ver §5). |
| consultoría crm · crm enterprise · crm consulting services · crm implementation consultant · implementación crm (+hubspot, +pymes) · presupuesto implementación crm · consultoría hubspot/salesforce · implementación salesforce | `…/seleccion-de-software/crm` | Ya hay 3 artículos de CRM (qué es, costo total, gobernanza). Falta uno de **implementación de CRM** y enlazar el de costo con "presupuesto implementación CRM". Las marcas (HubSpot, Salesforce) solo con enfoque de selección/PMO (ver riesgo de independencia §6). |
| consultoría sap · sap business one · consultores sap · consultoría odoo | `…/erp` + artículos SAP/Odoo existentes | Los artículos "Odoo vs SAP" ya tienen 215 imp. Enlazarlos al servicio. Mismo riesgo de independencia. |
| consultoría estratégica (empresas) · strategic planning consultant · business strategic planning consultant · consultoría de negocios · consultoría empresarial · business strategic planning | `/metodo-cira/estrategia`, `/metodo-cira`, `/` | Títulos ya correctos. Falta autoridad. "strategic planning" (artículo EN): **469 imp en pos 20** → optimizar para entrar al top 10. |
| it strategy consulting · consultoría ti · consultoría tecnológica · technology consulting services | `/metodo-cira/seleccion-de-soluciones` | Crear **"Estrategia de TI"** como servicio (ver §4). "it strategy consulting" 1.900 · SD 19 es la mejor relación de toda la lista. |
| consultoría gestión del cambio · change management consulting (+firms/services/organizational/best firms) | `/metodo-cira/gestion-del-cambio` | Página existe. Añadir bloque "firmas de gestión del cambio: cómo comparar" solo si se puede citar fuente primaria. Autoridad. |
| consultoría de inteligencia artificial (+empresas) · ai consulting services · ai strategy consulting · ai implementation consulting · gen ai / generative ai consulting · agentic ai consulting | `/intelligence-lab` | Crear **"Estrategia de IA"** y **"IA generativa y agentes"** como páginas hijas (ver §4). |
| consultoría de procesos · business process automation consulting · robotic process automation consulting | `…/automatizaciones-desarrollo`, `…/tecnologias-avanzadas` | "consultoría de procesos" ES = 50/mes: no merece página. Cubrir con H2 dentro de automatización. |
| consultoría de datos | `…/arquitectura-de-ia` + gobierno de datos nuevo | ES MX 20/mes; no perseguir solo. |
| consultoría ciberseguridad · servicios de ciberseguridad · cybersecurity consulting services/firms | `…/infraestructura-tecnologica` → **página nueva** | Ver §4. EN es donde está el volumen (2.400 + 1.600). |
| consultoría iso 27001 · servicios implementación iso 27001 · iso 27001 consulting (services) | `/leadership-academy/iso-27001` → **página de consultoría nueva** | El curso atiende "curso ISO 27001"; la consultoría de implementación es otra intención (EN 260 · CPC US$ 59). |
| consultoría continuidad del negocio · en continuidad de negocio · business continuity consulting (services) | `/leadership-academy/continuidad-de-negocio-drp` → **página de consultoría nueva** | Hoy solo hay un taller. EN 590 · SD 10. |
| consultoría transformación digital · digital transformation consulting (+companies/company/provider(s)/service/top firms) | home `/` y `/metodo-cira` | Volumen alto pero SD 35–38 para los genéricos. Los "provider(s)" (SD 5) son inalcanzables en volumen (50–70). **No inventar páginas**; trabajar con autoridad. |

---

## 4. Cambios de título y H1 (solo los que valen la pena)

Los títulos actuales ya apuntan a la keyword. Cambios con justificación medida:

| Ruta | Hoy | Propuesta | Por qué |
|---|---|---|---|
| `/intelligence-lab/gobierno-de-ia` (ES) | Gobernanza de IA y de Datos: Consultoría | **Gobierno de Inteligencia Artificial: Gobernanza de IA y Datos** | "gobierno de inteligencia artificial" es la única keyword de tu lista en top 10 (EN); el ES no la contiene literal. GSC: "gobernanza de ia" pos 23. |
| `/en/presencia-digital/seo` | SEO Positioning & AI Search Visibility | **SEO Consulting & AI Search (GEO) Visibility** | El ES ya dice "Consultoría SEO"; el EN no dice "consulting". |
| `/en/leadership-academy/continuidad-de-negocio-drp` | Business Continuity Workshop (DRP) | Mantener el taller; **crear página aparte** de consultoría | Una página no puede ser a la vez "workshop" y "consulting services". |
| `/en/leadership-academy/iso-27001` | ISO 27001 Training for Companies | Mantener; página de consultoría aparte | Mismo motivo: "training" ≠ "consulting". |
| `/metodo-cira/gestion-de-proyectos` (ES/EN) | Consultoría PMO y Gestión de Proyectos | Añadir **"PMO como servicio"** como H2 y a la meta description | El artículo rankea para "pmo como servicio" (pos 38/68); el servicio no. |
| 4 páginas con título duplicado | — | **Identificar y corregir** | Alerta de impacto alto de Ubersuggest. |

No cambiar: home, `/metodo-cira`, estrategia, ERP, CRM, cambio, Intelligence Lab (títulos correctos; falta autoridad).

**Slugs en inglés para el sitio EN** (cambio mayor, decisión del cliente): hoy `/en/perspectivas/cuanto-cuesta-implementar-un-erp`.
Propuesta: `/en/insights/erp-implementation-cost` con 301 desde la antigua. Es lo que más probablemente ayude al inglés, porque
ese artículo tiene 1.275 impresiones en pos. 63. Requiere: tabla `PAGES`, sitemap, hreflang, canonical y redirecciones (ver reglas de hidratación en `CLAUDE.md`).

---

## 5. Victorias rápidas desde Search Console (posiciones 8–30)

Páginas que ya están cerca de la primera página. Orden por impresiones:

| Consulta | Página | Imp. | Pos. | Acción |
|---|---|---|---|---|
| strategic planning | `/en/perspectivas/planeacion-estrategica-…` | 469 | 20,1 | Reforzar intro "answer-first", H2 con la pregunta, ejemplo; enlazar a estrategia. |
| pmo (EN) | `/en/perspectivas/que-es-una-pmo-…` | 457 | 26,7 | Añadir definición en la primera frase; enlazar al servicio PMO. |
| pmo que es | `/perspectivas/que-es-una-pmo-…` | 168 | 10,5 | Casi en top 10: título y primera línea con "qué es una PMO". |
| rpa ai | `/en/perspectivas/que-es-rpa-…` | 137 | 16,8 | Título EN con "RPA vs AI". |
| odoo vs sap | `/en/perspectivas/odoo-vs-sap-…` | 107 | 9,7 | Casi en top 10. |
| gobernanza de ia | `/intelligence-lab/gobierno-de-ia` | 87 | 20,0 | Título (ver §4). |
| erp software quote / implementation cost calculator | `/en/herramientas/calculadora-costo-erp` | 63 / 51 | 8,1 / 25,9 | La herramienta rankea: enlazarla desde más artículos. |
| modelo de madurez de gobernanza de ia | artículo ES | 63 | 9,6 | Casi en top 10. |
| mes software / software mes | artículo MES | 188 / 110 | 56 / 61 | Mejorar o fusionar; hoy lejos. |
| erp cost / pricing / implementation cost (docenas de variantes) | `/en/perspectivas/cuanto-cuesta-implementar-un-erp` | ~1.275 | 60–90 | La página con más impresiones del sitio EN rankea mal. Reescribir en inglés (título, H1, slug) con fuente primaria para cualquier cifra. |

Regla del cliente: **ninguna cifra de costo se publica sin fuente primaria**; si solo hay blogs, se omite.

---

## 6. Ampliar el catálogo: propuesta de nuevos servicios

Criterio: solo se propone un servicio si (a) hay demanda medida, (b) encaja con lo que Cyrrus ya declara hacer, y (c) no rompe la
independencia de proveedor. **Lo que Cyrrus ofrece lo confirma el cliente; aquí solo se propone qué páginas tendrían demanda.**

### 6.1 Dividir los servicios existentes (alta prioridad)

| Servicio nuevo (hijo de…) | Keyword principal (medida) | Demanda | Notas |
|---|---|---|---|
| **Estrategia de TI** (de `/metodo-cira/estrategia`) | it strategy consulting | EN 1.900 · SD 19 · CPC US$ 9,6; ES: consultoría ti MX 320 · SD 14 | La mejor relación de la lista. |
| **Ciberseguridad** (de `infraestructura-tecnologica`) | cybersecurity consulting services | EN 2.400 · SD 12 · CPC US$ 29; firms 1.600 · SD 34 | Confirmar con el cliente si presta consultoría o solo selección. |
| **Continuidad del negocio (BCP/DRP)** (de Leadership Academy) | business continuity consulting services | EN 590 · SD 10; plan de continuidad del negocio MX 260 · SD 31 | Ejemplo que propusiste. Hoy es solo un taller. |
| **Gobierno de datos** (de `gobierno-de-ia`) | data governance consulting services | EN 390 · SD 14 · CPC US$ 41 (la variante sin "services": 320 · SD 28 · CPC US$ 131) | Hoy ya rankea 15/23 sin página propia. |
| **Estrategia de IA** (de `/intelligence-lab`) | ai strategy consulting | EN 880 · SD 27 · CPC US$ 33 | Hijo de Intelligence Lab. |
| **IA generativa y agentes** (de `/intelligence-lab`) | generative ai consulting services | EN 260 · SD 21 · CPC US$ 48 (agentes de IA ES: 880 MX/CO, SD 31–39) | |
| **Implementación de ERP con PMO** (de ERP) | erp implementation consulting | EN 480 · SD 22 · CPC US$ 30 | Separar "elegir" de "implementar". |
| **Consultoría ISO 27001** (de Leadership Academy) | iso 27001 consulting services | EN 260 · SD 29 · CPC US$ 59 | Requiere confirmar capacidad de implementación. |

### 6.2 Servicios con demanda medida pero que exigen decisión del cliente

| Idea | Demanda medida | Riesgo / decisión |
|---|---|---|
| **CFO as a service / Fractional CFO** | EN **fractional cfo 12.100 · SD 33 · CPC US$ 40**; fractional cfo services 2.900 · SD 27 · CPC US$ 74. ES: "cfo as a service" 40 · SD 7 | El sitio antiguo tenía `/cfo-aas/` (hoy redirige a Estrategia). **Es el mayor volumen medido en esta búsqueda**, pero hay que confirmar si Cyrrus lo ofrece hoy. |
| **vCISO (CISO como servicio)** | EN vciso 1.300 · SD 30 · CPC US$ 68; vciso services 210 · SD 20 | Solo si Cyrrus presta ese rol; no es una invención de nombre. |
| **Estrategia comercial** (tu ejemplo) | "estrategia comercial" MX **720 · SD 27 · CPC US$ 1,1**; "consultoría comercial" **10/mes** | Hay demanda **informativa** (guía), no comercial (nadie busca contratar "consultoría comercial"). Convertir en **artículo** que enlace a Estrategia, no en servicio propio. |
| **Consultoría de procesos / BPM** | ES 50/mes · EN business process consulting 110 · SD 33 | Demanda baja. Dejarlo como sección de Automatización. |
| **Consultoría SAP / Odoo / HubSpot / Salesforce** | consultores sap MX 480 · SD 16; consultoría salesforce MX 90 · SD 22; consultoría odoo MX 50; consultoría sap MX 40 | **Choca con el posicionamiento de independencia de proveedor.** Mantenerlo como "selección y PMO de implementación de X", sin presentarse como implementador de una marca. Decisión del cliente. |

### 6.3 No crear

- "Agencia SEO por ciudad" (el estudio de octubre ya lo descartó).
- Páginas por país ("…en Colombia"): contradice el alcance internacional (memoria del proyecto).
- "Consultoría comercial": 10 búsquedas/mes.
- Páginas de keywords con volumen 0–20 (casi toda la lista ES-Colombia): se cubren con H1/H2 de la página correspondiente.

---

## 7. Artículos nuevos (cada uno apoya un servicio)

Todos con fuentes primarias citadas y fecha de consulta. Cifras: solo las que se puedan abrir. Marcado **[fuente por abrir]** lo que aún no se ha verificado.

| # | Artículo | Idioma | Apoya a | Demanda medida | Fuente primaria a abrir |
|---|---|---|---|---|---|
| 1 | Qué incluye una consultoría de estrategia de TI y cuándo contratarla | EN + ES | Estrategia de TI | it strategy consulting 1.900 · SD 19 | **[por abrir]** |
| 2 | Cómo elegir una consultoría de ciberseguridad (alcance, entregables, marcos) | EN + ES | Ciberseguridad | cybersecurity consulting 2.400 · SD 12 | NIST (CSF), a abrir |
| 3 | Plan de continuidad del negocio: pasos, BIA y diferencia con un DRP | ES + EN | Continuidad | plan de continuidad MX 260 · SD 31 | ISO 22301 (página oficial), a abrir |
| 4 | Gobierno de datos: qué es y cómo empezar sin un proyecto de un año | ES + EN | Gobierno de datos | data governance consulting 320–390 | DAMA, a abrir |
| 5 | Estrategia comercial: qué es y cómo se construye (guía) | ES | Estrategia | estrategia comercial MX 720 · SD 27 | **[por abrir]** |
| 6 | Estrategia de IA: hoja de ruta para empresas medianas | EN + ES | Estrategia de IA | ai strategy consulting 880 · SD 27 | NIST AI RMF (ya usado en gobierno de IA) |
| 7 | Qué hace un consultor de implementación de ERP y cómo se mide su trabajo | EN | ERP implementación | erp consultant 1.600 · SD 15 | **[por abrir]** |
| 8 | Fractional CFO / CFO as a service: qué es y cuándo conviene | EN + ES | CFO as a service (si se confirma) | fractional cfo 12.100 · SD 33 | **[por abrir]** |
| 9 | Implementación de CRM: fases y errores (complementa "costo total de un CRM") | ES + EN | CRM | crm consulting services 260 · SD 20 | Fabricantes (Microsoft/Salesforce/HubSpot), a abrir |
| 10 | Qué es ISO 27001 y qué pasos implica certificarse | ES + EN | ISO 27001 | iso 27001 consulting 260 · SD 29 | ISO (oficial), a abrir |
| 11 | Cómo comparar firmas de gestión del cambio (criterios, no ranking) | EN | Cambio | change management consulting 1.000 · SD 14 | **[por abrir]** |
| 12 | Actualizar en EN: costo de implementar un ERP (reescritura completa, slug en inglés) | EN | ERP | 1.275 imp en pos 63 | Fuentes primarias de los fabricantes |

---

## 8. Hoja de ruta propuesta (en orden)

1. **Antes de nada:** subir el zip pendiente (`cyrrus-dist-2026-11-05-v7.zip`) y **pedir indexación a mano** de las URLs nuevas de las Sesiones 15 y 16. Sin esto, nada de lo anterior cuenta.
2. **Semana 1 (bajo esfuerzo):** cambios de título de §4; sección "PMO como servicio" y enlaces blog→servicio; identificar los 4 títulos duplicados; refuerzo de las 6 victorias rápidas de §5.
3. **Semanas 2–4:** crear 3 páginas de servicio de mayor ratio demanda/dificultad: **Estrategia de TI**, **Ciberseguridad**, **Continuidad del negocio** (ES+EN), cada una con su artículo de apoyo (#1, #2, #3).
4. **Mes 2:** **Gobierno de datos**, **Estrategia de IA**, **Implementación de ERP con PMO** + artículos #4, #6, #7, #12.
5. **Mes 3:** decisión de cliente sobre CFO as a service / vCISO / ISO 27001 consultoría; si se confirman, páginas y artículos #8, #10.
6. **En paralelo, siempre:** autoridad externa (`autoridad-externa.md`). El dominio medido en octubre tenía DA 13; las keywords con SD 12–20 son alcanzables, pero sin enlaces la primera página no se garantiza.
7. **A los 90 días:** re-medir las 101 keywords y Search Console. No hay promesa de posición: el criterio es que las impresiones comerciales de las páginas de servicio pasen de ~0 a algo medible.

---

## 9. Qué tiene que confirmar el cliente antes de escribir

1. ¿El mercado principal es **EE. UU./inglés** o **LATAM/español**? (cambia dónde se concentra el esfuerzo y si se reescriben los slugs EN).
2. ¿Cyrrus **presta** consultoría de ciberseguridad, ISO 27001, continuidad del negocio, gobierno de datos, CFO as a service, vCISO? (el sitio solo puede afirmar lo que el cliente aporte).
3. ¿Se acepta **no** presentarse como implementador de SAP/Odoo/Salesforce/HubSpot para proteger la independencia?
4. Pendientes ya anotados en `PROGRESO.md` (frase de costo en FAQs de HCM/EAM; el "60 %" de estrategia).

## 10. Lo que no se pudo medir

- Competidores y sus títulos: **[no medido]** (no se hizo `serp_analysis` para no gastar cuota; se puede añadir si se quiere comparar contra los 3 primeros de cada keyword).
- Autoridad actual del dominio (la última medida es DA 13, de octubre).
- Cuáles son las 4 páginas con título duplicado.
- Volumen en español para México/España de "ciberseguridad", "gobierno de datos" y "continuidad" con modificadores de servicio (solo se midió Colombia y los EN de tu lista).
