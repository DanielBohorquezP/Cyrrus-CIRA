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

**Última sesión cerrada:** Sesión 19c (2026-11-18, canibalización de títulos, tres guías nuevas y enlaces desde los servicios, ES/EN).

**Próxima: Sesión 20.** **Prioridad 0 (decidida por el cliente el 2026-11-14): el plan de clics, [`PLAN-CLICS.md`](./PLAN-CLICS.md), fase M, con Colombia primero, luego México y EE. UU.; los enlaces (M8) van de último. Va antes que todo lo de abajo.** Sesión 20: **M0** (reporte que separa marca / prompts automáticos / humanas), **M1** (búsquedas de Colombia cerca del top 10) y **M2** (qué buscan de verdad las empresas colombianas). Orden de lo demás, sin cambios:
0a. **Cliente: subir `cyrrus-dist-2026-11-18b.zip`** (está en `Cyrrus builds`; reemplaza a los anteriores, incluido `cyrrus-dist-2026-11-18.zip`, que es previo a las tres guías nuevas y no hay que subir; incluye Sesiones 15 a 19c). Luego: comprobar que las URLs nuevas dan 200 (las 22 de la Sesión 17/18 más las 6 de la 19c: tres guías, ES/EN), reenviar el sitemap (**166 URLs**) y **pedir indexación a mano** de las páginas nuevas y de las pendientes de las Sesiones 15 y 16. Tras subirlo, **revisar en Search Console a los 30 días** si "gobernanza de ia" deja de alternar entre el servicio y los artículos.
0b. **Cliente: tres decisiones de la auditoría** (`auditoria-seo-2026-11-12.md`, §9): (1) mercado principal, EE. UU./inglés o LATAM/español, que define si se reescriben los slugs `/en/…` en inglés; (2) qué servicios presta de verdad Cyrrus para crear páginas: consultoría ISO 27001, CFO as a Service (el sitio antiguo tenía `/cfo-aas/`; "fractional cfo" 12.100 búsquedas/mes EN · SD 33) y vCISO; (3) si acepta no presentarse como implementador de SAP/Odoo/Salesforce/HubSpot. Las 5 páginas de la Sesión 17 se construyeron solo con lo que el sitio ya decía (estrategia de TI y plan de continuidad están en la lista de servicios de Estrategia; ciberseguridad y continuidad en Infraestructura; gobierno de datos en Gobierno de IA y en el taller). **Pedir al cliente que lea las 5 páginas nuevas** y confirme el alcance (en ciberseguridad se escribió que la operación diaria la presta el proveedor seleccionado; en continuidad que el plan se ensaya con un simulacro).
0c. ~~Victorias rápidas de Search Console~~ ✅ hechas en la Sesión 18 (intros "respuesta primero" EN de planeación estratégica, PMO y costo de ERP; sección nueva de estimación en costo de ERP ES/EN; títulos EN duplicados corregidos). Queda por decidir el slug EN del artículo de costo de ERP (depende del mercado principal). **Oportunidad detectada en el SERP (2026-11-13):** "business continuity consulting services" (590/mes) tiene un SERP débil (el #2 orgánico es un dominio DA 16) y "it strategy consulting" (1.900/mes) lo encabeza un blog DA 16 con un artículo informativo: las páginas nuevas de continuidad y estrategia de TI pueden entrar sin más autoridad; conviene revisar su posición a los 30 días de la indexación. "cybersecurity consulting services" (2.400/mes) lo dominan CrowdStrike, HCL, Protiviti y un paquete local de EE. UU.: a largo plazo.
0d. Pendientes de sesiones anteriores: frase "la asesoría cuesta una fracción de la licencia más la implementación" (FAQs HCM/EAM) y el "60 %" de estrategia, sin fuente; sección 5 de `AUDITORIA-VERIFICABILIDAD.md`.
1. **Cliente: confirmar los supuestos de `/diagnostico`** (60 minutos, tres bloques, nota de una página en 3 días hábiles, filtro 50+ empleados, quién dirige la sesión). Si subió el zip: **A2**, **A5**/**K1** (PageSpeed real) y avisar para publicar el calendario de LinkedIn.
2. Si llegaron: **B3** (agenda y WhatsApp), **B4** (herramienta de correo: enviar el informe del test y la calculadora).
3. Sin insumos: ~~artículo de implementación de ERP con PMO~~ ✅ (Sesión 19); queda el artículo EN #7 de la auditoría ("qué hace un consultor de implementación de ERP y cómo se mide su trabajo", fuente por abrir), luego **G4, G5**, **C6/C7**, **G6**, **D5**. Candidatos EN con SERP débil para páginas o guías: "business continuity consulting" y "it strategy consulting" (ver 0c).
4. **I1** de C1–C3 (faltan).

**Criterio editorial (decidido por el cliente en la Sesión 3):** el lector objetivo es alta gerencia (CEO, CFO, COO) de empresas de 50+ empleados que pueden contratar consultorías de COP 30 millones o más. Cada artículo debe hablar en costo total a varios años, riesgo, capital de trabajo y gobierno, no en funciones del producto; el CTA lleva a una conversación de diagnóstico, no a una descarga.

**Hoja de ruta de las siguientes sesiones** (se ajusta al cerrar cada una):

| Sesión | Foco | Tareas |
|---|---|---|
| 1 ✅ | Comparativas (adelantadas a pedido del cliente) | C1–C5 + K1 parcial |
| 2 ✅ | Investigación de temas para compradores de 50–100+ empleados | C8–C18 (definidas) |
| 3 ✅ | Verificar despliegue + primeras categorías caras | A1, C8, C9 |
| 4 ✅ | Categorías de software caro | C10, C11, C12, I1 (C9–C12) |
| 5 ✅ | RR. HH., MES y enlaces cruzados | C13, C14, I1 (C4, C5/C8, C13, C14) |
| 6 ✅ | Primera herramienta | D1 |
| 8 ✅ | Segunda herramienta | D2 |
| 9 | Indexación, medición y contenido | A2, A5, G1, G2 o D3; B3, B4, B5 si llegan insumos |
| 8 | Contenido CRM | G3 |
| 9 | Herramienta de costo | D2 (enlazada desde C4) |
| 10 | Contenido | G4, G5 |
| 11 | Estudio propio (diseño) | E1 + G6 |
| 12 | Industrias | H1, H2 |
| 13–16 | Contenido G7–G16 a 2 por sesión; E3 cuando haya respuestas | — |
| 16 (≈ 90 días) | Revisión trimestral | L1 |

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
| B1 | Sesión de diagnóstico gratuita | ✅ | Sesión 7. `/diagnostico` ES/EN (D13). Enlazada desde el CTA final de todas las páginas y 11 artículos. Supuestos por confirmar (ver Bloqueos) |
| B2 | Rangos de precio por servicio | ➖ | Descartada por el cliente (2026-10-21, PLAN D14): no se publican precios de Cyrrus |
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
| C10 | Cuánto cuesta SAP Business One | ✅ | Sesión 4. `/perspectivas/cuanto-cuesta-sap-business-one`, ES/EN. SAP no publica precios: el artículo explica qué define el costo (tipos de usuario según la guía de licencias de SAP, despliegue, implementación, soporte) y cómo presupuestar a 5 años. Sin cifras de terceros. MX 140 + 110 · SD 23–28 |
| C11 | Software de mantenimiento (CMMS/EAM) | ✅ | Sesión 4. `/perspectivas/software-cmms-eam-como-elegir`, ES/EN. CMMS vs EAM vs módulo del ERP, qué medir (costo de parada), ISO 55001. Fuentes: TechTarget, ISO. Enlaza a la página de EAM. MX 170 · SD 34 · CPC US$54 |
| C12 | Migrar de SAP ECC a S/4HANA | ✅ | Sesión 4. `/perspectivas/migrar-sap-ecc-a-s4hana-plazos-costos-alternativas`, ES/EN. Fechas verificadas en SAP Support y SAP News (oct-2026): estándar hasta 31-dic-2027, extendido hasta 31-dic-2030 (+2 puntos), S/4HANA hasta 2040. MX 1.900 · SD 28. Revisar si SAP cambia fechas (L1) |
| C13 | Software de RR. HH. y nómina (100+) | ✅ | Sesión 5. `/perspectivas/software-recursos-humanos-nomina-mas-de-100-empleados`, ES/EN, título filtrado por tamaño, sin país. Nómina vs HRIS vs HCM, multi-país, integración con finanzas, datos personales. Fuentes débiles (Avanti, Microsoft Learn): no hay definición oficial única; el artículo lo dice. G8 (nómina vs HCM) debe enlazar aquí y no repetirlo. MX 260 · SD 18 |
| C14 | Software MES | ✅ | Sesión 5. `/perspectivas/software-mes-que-es-y-cuando-lo-necesita-su-planta`, ES/EN. ISA-95 (nivel 3 vs 4, fuente ISA), funciones del MES (Infor), cuándo se justifica. MX 140 · SD 17 |
| C15 | Integrar ERP y CRM sin middleware | ✅ | Sesión 14. `/perspectivas/integrar-erp-y-crm-conector-nativo-o-middleware`, ES/EN. Única fuente: Microsoft Learn (Business Central con Dynamics 365 Sales por Dataverse); esa página no usa "middleware", el artículo lo dice y no afirma nada de otras combinaciones |
| C16 | Costo total de propiedad de un CRM | ✅ | Sesión 14. `/perspectivas/costo-total-de-un-crm-que-sumar-ademas-de-la-licencia`, ES/EN. Precios de las páginas oficiales de Salesforce, HubSpot y Microsoft (consultados 2026-10-23); HubSpot Starter/Professional no se tabularon porque la página no aclara mensual vs anual. Ejemplo ilustrativo con 25 usuarios supuestos. Revisar precios en L1 |
| C17 | Fin de venta de Salesforce CPQ | ✅ | Sesión 10. `/perspectivas/fin-de-venta-salesforce-cpq-opciones`, ES/EN. Fuente: página oficial de Salesforce (consultada 2026-10-23): fin de venta, no fin de vida; **sin fecha publicada**; sucesor Revenue Cloud Advanced; sin migración forzosa. Alternativas con HubSpot (Revenue Hub) y Microsoft Learn. Sin enlaces cruzados desde C5/CRM aún |
| C18 | Gobernanza y deduplicación de datos en el CRM | ✅ | Sesión 14. `/perspectivas/gobernanza-y-deduplicacion-de-datos-en-el-crm`, ES/EN. Fuentes: Microsoft Learn (reglas de duplicados) y HubSpot (duplicados). La ayuda de Salesforce no se pudo abrir: no se cubre. Sin lista descargable |

### Fase D — Herramientas
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| D1 | Test de preparación para ERP | ✅ | Sesión 6. `/herramientas/test-preparacion-erp`, ES/EN: 10 preguntas en 5 bases (procesos, datos, equipo, presupuesto, patrocinio), puntaje 0–30, 3 rangos, brechas con recomendaciones, sin registro. Eventos `tool_start`/`tool_complete`. Falta el informe por correo (B4) |
| D2 | Calculadora de costo total de ERP | ✅ | Sesión 8. `/herramientas/calculadora-costo-erp`, ES/EN. Nube o licencia perpetua; usuarios, implementación, integraciones, capacitación, equipo interno, infraestructura, contingencia, 1–10 años. Supuestos editables, valores de ejemplo (no precios de fabricantes). Cálculo en el navegador |
| D3 | Plantilla de RFP para ERP | ✅ | Sesión 9. `scripts/build-rfp-template.py` → `public/descargas/plantilla-rfp-erp.xlsx` y `erp-rfp-template.xlsx`. 8 hojas (empresa, funcionales, técnicos, costo total con sumas, matriz ponderada con verificación de pesos, calendario, referencias). Sin precios ni pesos de ejemplo. Descarga en la guía de ERP, mejores ERP y costo de ERP |
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
| G1 | Resistencia al cambio | ✅ | Sesión 10. `/perspectivas/resistencia-al-cambio-como-diagnosticarla-y-que-hacer`, ES/EN. Solo Prosci (ADKAR, patrocinio) y Kotter (8 pasos); sin estadísticas. Keyword (MX 1.600) sin volver a medir |
| G2 | Qué es RPA | ✅ | Sesión 11. `/perspectivas/que-es-rpa-y-cuando-conviene-frente-a-la-ia`, ES/EN. Solo IBM (RPA guiada por proceso, IA por datos; límites) y Microsoft Learn (desktop flows); sin cifras. SAP dio 403: no se citó. Keyword (MX 2.900) sin volver a medir. Falta enlazarla desde la página de tecnologías avanzadas |
| G3 | Qué es un CRM | ✅ | Sesión 12. `/perspectivas/que-es-un-crm-y-como-elegir-el-correcto`, ES/EN. Solo IBM (definición, 3 tipos, funciones, riesgos) y Microsoft Learn (Dynamics 365 Sales); sin cifras. Enlaza a la comparativa C5 y a la página de selección de CRM. Keyword (MX 5.400) sin volver a medir. La página de servicio de CRM aún solo enlaza a C5 |
| G4 | Agentes de IA | ✅ | Sesión 19c. `/perspectivas/agentes-de-ia-que-son-cuando-valen-la-pena-y-como-evaluarlos`, ES/EN. Solo IBM (definición, componentes, cuatro limitaciones, buenas prácticas), Anthropic (workflows vs agentes, costo y controles), Gartner (predicción del 25-jun-2025: más del 40 % de proyectos de IA agéntica cancelados antes de fin de 2027, presentada como predicción) y NIST AI RMF. Título sin "Agentes de IA para empresas" (es el H1 de la página de servicio). Keywords (Ubersuggest, 2026-11-18): "agentes de ia" MX 880 · SD 49; "agente de ia" CO 880 · SD 46; "ai agents for business" US 3.600 (comercial, CPC US$87) |
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
| G17 | Qué es la gobernanza de IA y qué marcos usar | ✅ | Sesión 15. `/perspectivas/que-es-gobernanza-de-ia-y-que-marcos-usar`, ES/EN. NIST AI RMF (página, PDF y AIRC), principios de la OCDE y ficha de la IEC de ISO/IEC 42001. Keyword objetivo: "ai governance" (US 5.400) y "ai governance framework" (US 4.400), Ubersuggest 2026-11-02 |
| G18 | Regulación de la IA: UE, EE. UU. y España | ✅ | Sesión 15. `/perspectivas/regulacion-de-ia-que-exigen-la-ue-eeuu-y-espana`, ES/EN. Comisión Europea y AI Act Service Desk (texto consolidado al 27-jul-2026, con el AI Omnibus), texto inscrito de la H.B. 149 de Texas, página oficial de SB26-189 de Colorado, BOE (RD 729/2023) y DNP (CONPES 4144). Colombia solo en el cuerpo, no en título ni metas. El texto de CONPES no se revisó completo |
| G19 | ISO/IEC 42001: qué es y a quién aplica | ✅ | Sesión 15. `/perspectivas/iso-iec-42001-que-es-y-a-quien-aplica`, ES/EN. Solo ficha de la IEC y nota del organismo de Estonia sobre ISO/IEC 42006. **iso.org dio 403: no se afirma nada de la norma que no esté en la IEC; no se describen cláusulas, costos ni plazos.** Keyword: "iso 42001" (ES 1.300, MX 880, CO 720) |
| G20 | Modelo de madurez de gobernanza de IA | ✅ | Sesión 15. `/perspectivas/modelo-de-madurez-de-gobernanza-de-ia`, ES/EN. Solo el Responsible AI Maturity Model de Microsoft (MSR-TR-2023-26 y documento v1). Los demás modelos encontrados eran de consultoras/proveedores y no se usaron. Keyword: "ai governance maturity model" (US 1.000) |
| G24 | COBIT 2019: qué es, sus 40 objetivos y cuándo conviene adoptarlo | ✅ | Sesión 19c. `/perspectivas/cobit-2019-que-es-y-cuando-conviene-adoptarlo`, ES/EN. ISACA (página oficial: 40 objetivos, áreas de enfoque, guías, certificados), artículo de ISACA de 2019 (cinco dominios EDM/APO/BAI/DSS/MEA, 13+13 metas, patrocinio de la alta dirección) e ISO/IEC 38500:2024 (iso.org). **No se afirmó** el contenido de los factores de diseño (no abrió una fuente oficial); los cinco pasos de arranque están rotulados como criterio de Cyrrus. Keywords: "cobit" MX 1.300 · CO 720 (SD 12–16); "cobit 2019" MX 320 |
| G25 | Gobierno de la ciberseguridad: NIST CSF 2.0 e ISO/IEC 27014 | ✅ | Sesión 19c. `/perspectivas/gobierno-de-la-ciberseguridad-nist-csf-2-iso-27014`, ES/EN. NIST CSWP 29 (26-feb-2024; función GOVERN, seis categorías, GV.RR-01, GV.RM-02, GV.RR-03, comunicación con ejecutivos) e ISO/IEC 27014:2020 (iso.org, abierta con el navegador integrado; 2.ª edición, en revisión). **No se afirmó** que GOVERN sea una función nueva (el texto no lo dice). Keywords: "cybersecurity governance" US 260 (CPC US$23), "information security governance" US 110; en español casi nulos (10/mes) |
| G21 | Cumplimiento de IA: evidencia que mostrar | ✅ | Sesión 15. `/perspectivas/cumplimiento-de-ia-que-evidencia-debe-poder-mostrar-la-empresa`, ES/EN. Artículos 3, 4, 6, 9, 11, 12, 14, 17, 26 y 113 del AI Act Service Desk y preguntas y respuestas de la Comisión sobre alfabetización. La columna de evidencia está marcada como criterio de Cyrrus. Keyword: "ai governance compliance" (US 1.000) y "ai governance training" (US 1.300) |
| G23 | Implementación de ERP con PMO: cómo gobernar el proyecto | ✅ | Sesión 19. `/perspectivas/implementacion-de-erp-con-pmo-como-gobernar-el-proyecto`, ES/EN. Solo la guía pública de Microsoft para Dynamics 365 (gobierno del proyecto, estrategia de implementación; consultadas 2026-11-14), declarada como guía de un fabricante; sin cifras. Lo propio de Cyrrus marcado "en nuestro criterio" y lo que dice de sí misma tomado de la página de PMO. Keywords: "erp implementation consulting" (EN 480 · SD 22), "implementación de erp" (MX 90 · SD 19). Sin enlace entrante aún desde la página de PMO ni desde ERP |
| G22 | Herramientas y plataformas de gobernanza de IA | ✅ | Sesión 15. `/perspectivas/herramientas-y-plataformas-de-gobernanza-de-ia-como-evaluarlas`, ES/EN. Sin nombrar ni comparar proveedores ni precios; criterios ligados al AI Act, NIST y Microsoft. Keywords: "ai governance solution" (US 2.400), "tools" (1.900), "platforms" (1.600) |

### Fase M — Plan de clics (prioridad 0; detalle en [`PLAN-CLICS.md`](./PLAN-CLICS.md))
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| M0 | Reporte de Search Console que separa marca / prompts automáticos / humanas, por país | ⬜ | Línea base en PLAN-CLICS §1: humanas sin marca CO 301 imp., MX 607, EE. UU. 1.948; 0 clics en los tres |
| M1 | Colombia: ganar las búsquedas casi en el top 10 (PMO, gobernanza de IA, WMS/ERP, CMMS/EAM, SEO/GEO) | ⬜ | 6 páginas |
| M2 | Colombia: investigar qué buscan las empresas colombianas (Ubersuggest, ubicación Colombia) | ⬜ | Decide si hay contenido nuevo |
| M3 | Títulos y metas de las búsquedas humanas con posición ≤ 10 y 0 clics | ⬜ | |
| M4 | México: gobernanza de IA, precio de SAP B1, testing de ERP | ⬜ | Testing/QA de ERP: decisión del cliente |
| M5 | EE. UU.: reescribir costo de implementar un ERP (EN) | ⬜ | Depende de la decisión de mercado (slug) |
| M6 | Enlaces internos hacia las páginas objetivo | ⬜ | Incluye enlazar el artículo de ERP con PMO |
| M7 | Medir el efecto 30 días después de indexar | ⬜ | Necesita el zip subido |
| M8 | Autoridad y enlaces (Google Business Profile, Clutch, directorios…) | ⬜ | **Último** por decisión del cliente; avanza en paralelo con insumos del cliente (= F1–F7, A7) |

### Fase H — Industrias
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| H1 | Alimentos (3 Castillos) | ⬜ | |
| H2 | Infraestructura (Morelco) | ⬜ | |

### Fase I — Marca personal y distribución
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| I1 | Calendario de LinkedIn por artículo | 🟡 | `docs/plan-mejora/datos/linkedin-calendario-2026-10.md`: 2 posts por artículo para C9–C12 y 1 para C4, C5/C8, C13, C14 y D1 (siete semanas). Faltan C1–C3. [Cliente] publica tras subir el v7 |
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
| Subir `cyrrus-dist-2026-11-20b.zip` (Sesiones 19d–19f: categoría Comercial, Plan de Acción 2027, todos los servicios bajo `/servicios` con 301; reemplaza a los zips anteriores) | 2026-11-20 | ⬜ | Publicar Comercial y Plan 2027 y las URLs nuevas; reenviar sitemap |
| Subir `cyrrus-dist-2026-11-14.zip` (Sesiones 15–19: 5 páginas de servicio y 6 guías nuevas, títulos EN sin duplicados; reemplaza al 2026-11-13, al 2026-11-05-v7 y al 2026-11-01 en producción) | 2026-11-12 | ⬜ | A2 de las 16 URLs nuevas, medición de la Sesión 17 |
| Decisiones de la auditoría SEO (mercado principal, servicios que presta Cyrrus: ISO 27001, CFO aaS, vCISO; marcas de ERP/CRM) | 2026-11-12 | ⬜ | Slugs EN, páginas nuevas de servicio |
| Subir `cyrrus-dist-2026-10-23-v18.zip` (C8–C14, C17, G1, G2, D1–D3 y B1; reemplaza al v13 y al v3 en producción) | 2026-10-21 | ⬜ | A2, A5, K1, publicar I1 |
| Confirmar los supuestos de la sesión de diagnóstico (duración, entregable, filtro, quién la dirige) | 2026-10-21 | ⬜ | Cierre de B1 |
| Respuestas al radar comercial (Sesión 19d): titular con resultado, cliente/fecha de las cifras de PMO y fuente del 60 %, cargo de Daniel, credenciales del equipo, caso reciente, Presencia Digital/CXaaS, para quién no es, modelo de madurez, versión oficial de datos en LinkedIn y directorios, reseñas | 2026-11-20 | ⬜ | D1.1, D2.2, D4.4, D4.5, D5.1, D8.1, D9.1 del radar |
| Acceso a GA4 | sep-2026 | ⬜ | A4, A6 |
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
| 2026-11-01 | Search Console API (inspección de URLs, 108 URLs del sitemap) | — | — | — | — | 101 indexadas y 7 no. Tras subir el zip del 2026-11-01: 5 de las 7 ya indexadas; faltan los 3 artículos de la sesión 14 (6 URLs ES/EN, "descubiertas" o "no reconocidas") y `/en/metodo-cira/seleccion-de-soluciones/infraestructura-tecnologica` |
| 2026-11-03 | Search Console API (inspección de URLs, 126 URLs del sitemap, tras subir el zip) | — | — | — | — | 125 indexadas; falta solo `/en/perspectivas/herramientas-y-plataformas-de-gobernanza-de-ia-como-evaluarlas` ("Google no reconoce esta URL"; pedir indexación a mano). Los 7 talleres de Leadership Academy en "próximamente" siguen fuera del sitemap a propósito |
| 2026-11-02 | PageSpeed vía Ubersuggest (producción: zip del 2026-11-01) | — | — | — | Móvil: LCP 3,5 s / TBT 3,2 s / FCP 2,5 s / TTI 7,2 s / CLS 0. Escritorio: LCP 0,36 s / TBT 1,2 s | Antes (2026-10-05): LCP 2,9 s, TBT 1,5 s. Aviso "Redirects": 601 ms en móvil (posible redirección por idioma en `/`; sin confirmar). Cierra A5/K1 con dato real |
| 2026-11-04 | Search Console API (rendimiento, 2026-07-01 a 2026-11-03) | 65 clics en todo el rango (14.120 impresiones, posición media 19,9) | 430 de las 1.000 consultas con más datos tienen posición media ≤10; 153 son consultas largas "compara hubspot con…" (1.798 impresiones, 0 clics; probablemente automáticas) | — | — | 34 de los 65 clics son la búsqueda "cyrrus". Páginas con más impresiones: comparativa de CRM (ES 3.170, pos. 6,4; EN 954, pos. 4,2) y "qué es una PMO" (ES 976, pos. 9,8). Costo de ERP (EN) y "mejores ERP para medianas empresas" (ES) aparecen en posición 52–78. Países por impresiones: México 3.335 (pos. 7,9), EE. UU. 2.359 (pos. 28), España 1.717 (pos. 32,5), Colombia 913 (pos. 8,1). Aparecen URLs `/products/control/` y `/cfo-aas/` que no son rutas del sitio actual |
| 2026-11-02 | `scripts/lh.mjs` (local, 3 runs, móvil, `/`) | — | — | — | Último commit (sin rediseño): 81 / 3,91 s / 83 ms / CLS 0. Árbol actual (con rediseño sin confirmar): 75 / 4,73 s / 114 ms / CLS 0,018 | El rediseño sin confirmar cuesta ~6 puntos y ~0,8 s de LCP. En el árbol actual el elemento LCP es el texto del banner de cookies (render delay 4,4 s) y el CSS que bloquea el renderizado pasa de 155 a 755 ms; en el commit anterior era el H1. El TBT varía mucho entre corridas (83–434 ms en el mismo build): no es señal |
| 2026-11-12 | Search Console API (rendimiento, 2026-08-13 a 2026-11-11) | 28 clics en 90 días (14.960 impresiones; 1.598 consultas) | — | — | — | 21 de los 28 clics son "cyrrus". Páginas con más impresiones: comparativa de CRM ES 4.430 (pos. 6,1), costo de ERP EN 1.275 (pos. 63), PMO EN 955 / ES 545, planeación estratégica EN 770 (pos. 20). Consultas comerciales en 8–30: "strategic planning" 469 imp. pos. 20, "pmo" 457 pos. 27, "pmo que es" 168 pos. 10,5, "gobernanza de ia" 134 pos. 23, "erp software quote" 63 pos. 8 (calculadora EN). Para "consultoría pmo" y "pmo como servicio" rankea el artículo de PMO, no el servicio |
| 2026-11-12 | Ubersuggest, rank tracking del proyecto (101 keywords, informe del 2026-11-11) | — | 1 (gobierno de inteligencia artificial, EN, pos. 8) | — | — | 93 keywords fuera del top 100; 7 entre 8 y 100: consultoría gobierno de datos EN 15 / ES 23 (gobierno-de-ia), consultoría pmo ES 36 / EN 33 y pmo como servicio EN 38 / ES 68 (artículo "qué es una PMO"), consultor erp EN 72. 57 de las 101 keywords son EN (EE. UU.); las ES de Colombia tienen 0–20 búsquedas. Ubersuggest marca 4 títulos duplicados (no se pudo identificar cuáles: `site_audit_results` rechaza el id) |
| 2026-11-13 | Ubersuggest `serp_analysis` (EE. UU., sin refresco: datos de sep–oct 2026 salvo continuidad, del 13-nov) | — | — | — | — | "it strategy consulting": #1 blog informativo de itcgroup.io (DA 16), #2 Deloitte, #3 corsicatech (DA 43); rankean artículos "qué es", no solo páginas de servicio. "cybersecurity consulting services": AI Overview, CrowdStrike (DA 72), HCL (68), paquete local de 3 firmas de EE. UU., Gartner, Protiviti (61). "erp implementation cost": AI Overview, itransition (DA 46), erpfocus (41), NetSuite (75), mrpeasy, randgroup; títulos con "ERP implementation cost(s)" literal. "business continuity consulting services": AI Overview y solo 3 orgánicos (xownsolutions DA 16, kirkpatrickprice DA 38, resilienceweb DA 6): SERP débil |
| 2026-11-14 | Search Console API (rendimiento, 2026-05-18 a 2026-11-12) | 96 clics (22.825 impresiones) | — | — | — | Desglose de las consultas con datos (17.486 imp.): **587 consultas con forma de prompt** ("compara… debes proporcionar un ranking", "qué dicen los sitios de reseñas…", 10+ palabras) suman 6.235 imp. y 0 clics, probablemente automáticas; aparecen desde octubre, cuando las impresiones saltan de ~600 a ~10.000/mes. Marca: 1.967 imp., 46 clics. Consultas humanas sin marca: 9.284 imp. y 6 clics, pero 6.874 de esas imp. están en posición >20 y solo 1.272 en top 10. Conclusión: el problema es de posición (autoridad), no de CTR del snippet. `www` ya redirige 301 al dominio sin www |

---

## Bitácora de sesiones

### Sesión 19f — 2026-11-20 — Todos los servicios bajo /servicios con el nombre del menú
- **Tareas trabajadas:** fuera del plan (pedido del cliente: URLs coherentes con cada página; eligió mover todo el sitio a `/servicios`). La Sesión 20 sigue siendo M0–M2.
- **Mapa de URLs (ES y `/en`):**
  - `/metodo-cira/estrategia[/…]` → `/servicios/estrategia[/…]`
  - `/metodo-cira/seleccion-de-soluciones[/…]` → `/servicios/seleccion-de-soluciones[/…]` (incluye software, ERP, CRM, HCM, EAM, tecnologías avanzadas, infraestructura, ciberseguridad)
  - `/metodo-cira/gestion-de-proyectos` → `/servicios/gerencia-de-proyectos`
  - `/metodo-cira/gestion-del-cambio` → `/servicios/gestion-del-cambio`
  - `/intelligence-lab[/…]` → `/servicios/inteligencia-artificial[/…]`; `automatizaciones-desarrollo` → `automatizacion-y-agentes-ia`
  - `/comercial[/plan-de-accion-2027]` → `/servicios/comercial[/plan-de-accion-2027]`
  - Sin cambio: `/metodo-cira` (página del método), `/leadership-academy` (no está en el menú Servicios), experiencia, perspectivas, herramientas, diagnóstico, quiénes somos.
- **Hecho:** 507 referencias reescritas con un script (rutas, menú, pie, enlaces de las guías, casos, schema de `index.html`, `route-meta.json`, generador de sitemap, `llms.txt`, hashes del sitemap). `.htaccess`: 301 genéricos que conservan la subruta y quitan la barra en un solo salto; los 301 del sitio viejo (WordPress) apuntan directo a la URL nueva, sin cadenas; `/servicios` → `/#servicios`. Reglas probadas con una simulación en Python sobre 16 rutas.
- **Verificación:** `tsc` limpio; build 168/168; sitemap sin URLs viejas; 191 enlaces internos del HTML generado resuelven a archivos existentes; consola limpia en 8 páginas (estrategia, IA, automatización, PMO EN, ERP, ciberseguridad, caso 3 Castillos, Plan 2027); canonical, hreflang y migas con la URL nueva.
- **No cambiado (decidir):** las migas de las páginas del método siguen diciendo "Inicio › Método CIRA › …" aunque la URL diga `/servicios`; las hijas de IA dicen "Cyrrus Intelligence Lab" como padre.
- **Después de subir:** comprobar los 301 en producción (las carpetas viejas pueden seguir en el servidor; el 301 se aplica antes de servirlas), enviar el sitemap nuevo en Search Console y pedir indexación de las URLs principales. Puede haber caída temporal de posiciones mientras Google procesa los 301.
- **Commits:** ver `git log` (rama `seo/fix-en-en-links`).
- **Zip para subir:** `cyrrus-dist-2026-11-20b.zip` en `Cyrrus builds/`. Reemplaza al `cyrrus-dist-2026-11-20.zip`.
- **Próxima sesión:** Sesión 20 (M0–M2), sin cambios.

### Sesión 19e — 2026-11-20 — Comercial como categoría propia y subpágina Plan de Acción 2027 (ES/EN)
- **Tareas trabajadas:** fuera del plan (pedido del cliente: instrucciones para el webmaster del 19-nov, basadas en la Biblia comercial v3 del 9-nov). La Sesión 20 sigue siendo M0–M2.
- **Decisión del cliente:** "Estrategia comercial" deja de ser hija de Estrategia/CIRA y pasa a ser la categoría **Comercial** (`/comercial`) con el contenido que tenía; el servicio **Plan de Acción 2027: Negocio y Comercial** vive en `/comercial/plan-de-accion-2027`.
- **Hecho:**
  - Contenido de `estrategiaComercial` movido sin cambios de texto de `estrategia.json` a un namespace nuevo `comercial.json` (ES/EN); se quitó el eyebrow "Método CIRA — Construir", el enlace al método y el bloque "Por qué Cyrrus" de Estrategia (grupo `estrategia`). Se agregó el Plan 2027 como primer servicio relacionado y como enlace secundario del hero.
  - Plan de Acción 2027 con el "texto recomendado" del cliente: hero (pregunta de negocio), qué puede lograr, qué es, cinco pasos, entregables, duración y responsabilidades (con lo que no incluye, del documento del 19-nov), FAQ armada solo con frases del mismo texto. Sin enlace ni mención a CIRA, sin cifras de crecimiento, sin testimonios; un solo CTA. EN traducido.
  - `createServiceChildPage`: `parent` opcional (categoría sin padre en las migas) y `heroLink` configurable (`null` = sin enlace secundario).
  - Menú: Comercial como categoría de Servicios con la subpágina; `route-meta.json`, `App.tsx` (PAGES), `generate-sitemap.mjs`, `llms.txt` ES/EN; 301 en `.htaccess` desde `/metodo-cira/estrategia/estrategia-comercial` (y `/en/…`) a `/comercial`.
- **Verificación:** `tsc` limpio; build 168/168 rutas; consola limpia en `/comercial`, `/comercial/plan-de-accion-2027` y sus versiones `/en`; menú móvil muestra Comercial.
- **No verificado / pendiente del cliente:** que la Biblia v3 coincida con el alcance congelado del 18-nov; que Jackson valide el texto; el formulario de contacto no tiene la opción "Comercial" (el CTA abre el formulario sin servicio preseleccionado). Tras subir: pedir indexación de las 4 URLs nuevas y comprobar el 301.
- **Commits:** `ae11054` (rama `seo/fix-en-en-links`; incluye también la 19d).
- **Zip para subir:** `cyrrus-dist-2026-11-20.zip` en `Cyrrus builds/` (624 archivos, rutas con `/`). Reemplaza al `cyrrus-dist-2026-11-18b.zip`.
- **Próxima sesión:** Sesión 20 (M0–M2), sin cambios.

### Sesión 19d — 2026-11-20 — Radar de posicionamiento comercial (20-oct) contra el sitio actual
- **Tareas trabajadas:** fuera del plan (lectura del radar `2026-10-21_analisis_radar-posicionamiento-cyrrus_v6.html`); no cambia el estado de ninguna tarea. La Sesión 20 sigue siendo M0–M2.
- **Ya resuelto en el sitio antes de esta sesión** (hallazgos del radar): enlace roto a `youtube.com/@cyrrusconsultingservices3066`; "15+" frente a "+17" países; 12 sectores frente a 6 industrias; 2014/2017 (el sitio dice 2017); `sameAs` en el schema; paso de bajo riesgo (`/diagnostico`, calculadora y test de ERP); WhatsApp.
- **Hecho:**
  - Reescritos sin afirmaciones nuevas los dos textos que el radar marcó como descuido (D7.4), ES y EN: beneficio "Diagnósticos que sí se implementan" (`estrategia.json`) y "Resultados que transforman" (`gestion-proyectos.json`, quitado "creamos éxitos empresariales").
  - `disambiguatingDescription` en el Organization (`index.html`, y versión EN en `site-graph-locale.ts`) con datos que ya publica el sitio (razón social, NIT, 2017, fundador, oficinas, CIRA), porque Perplexity mezcló a Cyrrus con un homónimo del Reino Unido (D5.1, D10.3).
- **Verificación:** build 166/166 rutas; textos nuevos y schema ES/EN presentes en `dist`; consola limpia en estrategia (ES/EN) y gestión de proyectos servidas desde `dist`.
- **Commits:** `ae11054` (junto con la 19e).
- **Zip para subir:** `cyrrus-dist-2026-11-20.zip` (ver 19e).
- **Pendiente (requiere al cliente, ver Bloqueos):** titular con resultado para el cliente (D1.1); cliente y fecha de "3% en los costos" y "2 customizaciones" (gestión de proyectos) y fuente del "60% más rápido (medición interna)", o quitarlas; cargo oficial de Daniel (sitio: Director de Intelligence Lab, LinkedIn: Strategic Execution Consultant); credenciales reales del equipo (`team.ts` vacío); caso reciente (ERP, PMO o IA); lugar de Presencia Digital y de las siglas CXaaS en la oferta; "para quién no es" fuera del diagnóstico; si el "Modelo Cyrrus de Madurez Empresarial" entra al sitio. Fuera del sitio: reseñas (Google 0, Facebook 1, Clutch sin perfil), datos de LinkedIn empresa (+17, 2014, 11-50, sede Bogotá) y de ConnectAmericas, cadencia de LinkedIn.
- **Próxima sesión:** Sesión 20 (M0–M2), sin cambios.

### Sesión 19c — 2026-11-18 — Canibalización de títulos, tres guías nuevas y enlaces desde los servicios (ES/EN)
- **Tareas trabajadas:** G4 (✅), G24 y G25 (nuevas, ✅); fuera del plan: auditoría de canibalización. La Sesión 20 sigue siendo M0–M2.
- **Hecho:**
  - **Canibalización (regla del cliente: las páginas de servicio mandan).** Con títulos de `route-meta.json`, títulos de artículos y Search Console (90 días, ES/EN fusionados): único choque confirmado = gobernanza de IA (servicio + dos artículos "qué es"). Cambiado el título/H1/meta de **16 artículos** (ES/EN) para que no empiecen con el término del servicio, sin tocar slugs (decisión: no cambiar URLs sin datos de Search Console; si "gobernanza de ia" sigue empatado a los 30 días, cambiar ese slug con 301). Selección de software (hub) ya no dice "Consultoría ERP y CRM": quedan ERP y CRM como dueñas de esos términos. Elegidos con Ubersuggest CO/MX/EE. UU.: "software de nómina" CO 1.000, "software ERP" MX 720, "software cmms" MX 170 (CPC US$54), "plan estratégico" MX 2.400, "rto y rpo" CO 320.
  - Etiquetas de enlace de las páginas de servicio, `SeleccionProducto.tsx`, `llms.txt` (ES y EN) y sitemap alineados con los títulos nuevos.
  - **Tres guías nuevas** en `blog.json` ES/EN + `blog-data.ts` (G4, G24, G25), 2 tarjetas de servicio cada una, fuentes con fecha de consulta 2026-11-18, opinión rotulada "en nuestro criterio". Quitado "Agentes de IA para empresas" de los temas "próximamente".
  - **Enlazadas desde su servicio** (bloque "Guías"): COBIT en estrategia de TI; agentes en automatización y agentes de IA (bloque `guides` nuevo, con RPA y marcos de IA); gobierno de la ciberseguridad en la página de ciberseguridad. Títulos de guías con nombres viejos sincronizados en 16 enlaces.
- **No se pudo verificar / no se usó:** TOGAF (pubs.opengroup.org exige inicio de sesión: no hay fuente abierta para las fases del ADM; artículo descartado); factores de diseño de COBIT; que GOVERN sea nueva en CSF 2.0; Gartner dio 403 con WebFetch y se leyó con el navegador integrado. ISO 27001 se descartó como artículo: la palabra ya está asignada a `/leadership-academy/iso-27001` ("certificación iso 27001" MX 320).
- **Datos de Ubersuggest (2026-11-18):** "gobierno de ti" MX 170 · CO 50; "gobernanza de ciberseguridad" 10 en CO y MX; "iso 27001" CO 5.400; "togaf" MX 880; "arquitectura empresarial" CO 480 (G10 sigue pendiente por la falta de fuente abierta de TOGAF). "PYP" no tiene datos (significado por confirmar con el cliente).
- **Verificación:** build 166/166 rutas, títulos ≤ 60 y metas ≤ 160, consola limpia en las 3 guías (ES/EN) y en las 3 páginas de servicio servidas desde `dist`.
- **Commits:** ver `git log` (rama `seo/fix-en-en-links`).
- **Zip para subir:** `cyrrus-dist-2026-11-18b.zip` (620 archivos, rutas con `/`). El `cyrrus-dist-2026-11-18.zip` es anterior a las guías y no debe subirse.
- **Pendiente / bloqueos nuevos:** confirmar con el cliente qué es "PYP". Medir a los 30 días de indexar: posición de las tres guías y si "gobernanza de ia" deja de alternar. G10 (arquitectura empresarial) solo si aparece una fuente abierta de TOGAF.
- **Próxima sesión:** Sesión 20 (M0–M2), sin cambios.

### Sesión 19b — 2026-11-16 — Auditoría SEO/IA (`/claude-seo-ai:audit`) y correcciones
- **Tareas trabajadas:** fuera del plan (auditoría puntual); no cambia el estado de ninguna tarea. La Sesión 20 sigue siendo M0–M2.
- **Hecho:**
  - `langPath()` ya no antepone `/en` a rutas que lo traen (había 18 enlaces del cuerpo de artículos EN que daban `/en/en/…` → 404).
  - Los 7 workshops de Leadership Academy ("próximamente") pasan a indexables y entran al sitemap (decisión del cliente, 2026-11-16): sin `noindex`, sin exclusión en `generate-sitemap.mjs`; el schema `Course` sigue apagado mientras sean "próximamente". Sitemap: 146 → 160 URLs.
  - 17 títulos (>60 caracteres) y 31 descripciones (>160) recortados sin añadir datos nuevos: `seoTitle` en `blog.json` y textos en `route-meta.json` y los JSON de `i18n`. Título del artículo de SAP B1 ES cambiado a "Precio de SAP Business One…" (Ubersuggest: "precio sap business one" 20/mes CO; "cuánto cuesta sap business one" 0). Título ES de SAP B1 vs NetSuite ya no es igual al EN.
- **Datos de la auditoría (Ubersuggest, 2026-11-16):** DA 10, 404 backlinks / 157 dominios; 5 palabras clave posicionadas (~16 de tráfico); PageSpeed móvil LCP 4.0 s, TBT 211 ms, CLS 0; visibilidad en IA (ChatGPT, 10 prompts) 0 %.
- **Verificación:** build 160/160 rutas, 0 títulos >60, 0 descripciones >160, 0 enlaces `/en/en/`; consola limpia en 4 rutas servidas desde `dist`.
- **Commits:** ver `git log` (rama `seo/fix-en-en-links`).
- **Zip para subir:** no generado.
- **Pendiente / bloqueos nuevos:** `/en/herramientas/test-preparacion-erp` y `/en/herramientas/calculadora-costo-erp` dan 403 en producción (el build local sí las genera): revisar el zip subido o los permisos de esas carpetas. Vigilar en Search Console que los 7 workshops no queden en "Rastreada: sin indexar" por contenido escaso. LCP móvil de 4.0 s: repetir PageSpeed tras el próximo deploy (A5).
- **Próxima sesión:** Sesión 20 (M0–M2), sin cambios.

### Sesión 19 — 2026-11-14 — Guía de implementación de ERP con PMO (ES/EN)
- **Tareas trabajadas:** G23 (nueva, ✅), a partir de la auditoría §6.1/§7 ("Implementación de ERP con PMO"). Sin insumos del cliente.
- **Hecho:** artículo `implementacion-de-erp-con-pmo-como-gobernar-el-proyecto` en `blog.json` ES/EN (insertado como texto, los archivos no son round-trip de `JSON.stringify`), `blog-data.ts` (pilar: gerencia de proyectos; tarjetas de servicio en los bloques 15 y 31) y `llms.txt`. Estructura: qué hace una PMO en un ERP, las seis áreas de gobierno, comité de dirección vs equipo de implementación y contrato con el integrador, qué se recorta primero, cómo se mide, qué decide la dirección. Enlaza a costo de ERP, mejores ERP, calculadora, selección de ERP, PMO y PMO externa.
- **Fuentes (abiertas el 2026-11-14):** Microsoft Learn, guía de gobierno del proyecto (actualizada 2024-01-22) y de estrategia de implementación (2024-01-05) de Dynamics 365. Se presentan como guía de un fabricante usada como lista de verificación; no se generaliza a otros ERP. Los indicadores del tablero y la diferencia integrador/PMO están marcados como criterio de Cyrrus. La página `overview` se abrió pero no se cita. El tablero no usa cifras.
- **Verificación:** `tsc` limpio; build **162/162 rutas**; sitemap **148 URLs**; consola sin errores en ES y EN; títulos y H1 comprobados en el HTML prerenderizado.
- **Commits:** ninguno (mismo criterio que las Sesiones 15 a 18: el árbol incluye el rediseño sin confirmar).
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-11-14.zip` (reemplaza al `2026-11-13`; el borrado del zip viejo fue denegado, queda por borrar a mano; incluye Sesiones 15 a 19).
- **Diagnóstico de clics (pedido del cliente):** lectura de Search Console y plan en `PLAN-CLICS.md`; ver también la fila 2026-11-14 de Métricas. Decisión: ese plan pasa a prioridad 0.
- **Pendiente:** enlazar el artículo desde la página de PMO (`GestionDeProyectos.tsx` solo admite un enlace de artículo) y desde la página de ERP; el slug EN depende de la decisión de mercado.
- **Próxima sesión:** Sesión 20 (ver arriba).

### Sesión 18 — 2026-11-13 — Victorias rápidas EN, títulos duplicados, SERP y guías de gobierno de datos y estrategia de IA
- **Tareas trabajadas:** continuación del pedido del cliente ("sigue con el plan"): punto 0c de la Sesión 18 (victorias rápidas), los 4 títulos duplicados, SERP de competidores y dos de los tres artículos de apoyo pendientes. Sin insumos del cliente.
- **Hecho:**
  - **Títulos duplicados (los 4 que marcaba Ubersuggest):** eran los artículos de comparativa de CRM y de SAP B1 vs NetSuite, con el mismo `<title>` en ES y EN. `seoTitle` EN nuevos: "Salesforce vs HubSpot vs Dynamics 365: Which CRM to Choose" y "SAP Business One vs NetSuite vs Business Central Compared". Comprobado sobre `dist/`: ninguna página comparte título.
  - **Victorias rápidas (Search Console):** `intro` "respuesta primero" en EN de planeación estratégica (469 imp., pos. 20), PMO (457 imp., pos. 27; también ES) y costo de ERP (1.275 imp., pos. 63; también ES). En costo de ERP, sección nueva ES/EN "¿Cómo estimar el costo de implementar un ERP en su empresa?" (seis pasos, enlace a la calculadora, que ya rankea en pos. 8 para "erp software quote"); el artículo pasa de 26 a 34 bloques con la misma forma en ambos idiomas (los índices de las tarjetas, 9 y 15, no cambian).
  - **SERP de competidores** (Ubersuggest, 4 keywords, sin gastar créditos de refresco): ver Métricas. Conclusión: continuidad del negocio y estrategia de TI tienen SERPs alcanzables con la autoridad actual; ciberseguridad y costo de ERP no a corto plazo.
  - **2 guías nuevas (ES/EN)**: `gobierno-de-datos-que-es-y-como-empezar` (fuente ISO/IEC 38505-1:2026, abierta en iso.org con el navegador integrado; DAMA solo como "marco de referencia reconocido") y `estrategia-de-ia-para-empresas-hoja-de-ruta` (NIST AI RMF: página oficial del 13-nov y AI RMF Core ya verificado en la Sesión 15). Enlazadas como primera guía de sus páginas de servicio (`intelligence-lab.json`), en `blog-data.ts` y en `llms.txt`.
- **Fuentes:** ISO/IEC 38505-1:2026 (iso.org/standard/87195.html; la edición 2017 está retirada), NIST AI RMF (nist.gov/itl/ai-risk-management-framework), NIST AIRC Core. Sin cifras nuevas; la del informe de Panorama en la sección de estimación ya estaba en el artículo con su fuente.
- **No hecho:** artículo de implementación de ERP con PMO; slugs EN; páginas de ISO 27001 / CFO aaS / vCISO (decisión del cliente).
- **Verificación:** `tsc` limpio; build **160/160 rutas**; sitemap **146 URLs**; consola sin errores en las dos guías (ES/EN), en costo de ERP (ES/EN) y en la página de gobierno de datos EN; sección y guías nuevas visibles.
- **Commits:** ninguno (mismo criterio que las Sesiones 16 y 17).
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-11-13.zip` (reemplaza al `2026-11-12`, eliminado, y al `2026-11-05-v7`; incluye Sesiones 15 a 18).
- **Próxima sesión:** Sesión 19 (ver arriba).

### Sesión 17 — 2026-11-12 — Auditoría SEO con datos reales, 5 páginas de servicio nuevas y 3 guías (ES/EN)
- **Tareas trabajadas:** fuera de las fases del plan (pedido directo del cliente: "rankear en las 101 keywords de Ubersuggest y vender orgánicamente"). Equivale a G (contenido con volumen) y a la parte de títulos de K. Sin insumos del cliente (siguen bloqueados B3, B4, A4).
- **Hecho:**
  - **Auditoría** en `docs/plan-mejora/auditoria-seo-2026-11-12.md`: diagnóstico con Search Console (API) y el rank tracking de Ubersuggest (ver Métricas), mapa keyword → página → acción para las 101 keywords, títulos a cambiar, victorias rápidas, propuesta de catálogo (qué dividir, qué no crear, qué decide el cliente) y 12 artículos candidatos. Google Suggest (Ubersuggest, 20 semillas ES/EN) confirmó las formas de búsqueda: en EN "X consulting firms / services / companies"; en ES "consultoría en ciberseguridad para pymes", "plan de continuidad del negocio ejemplo / BIA / ISO 22301 / vs plan de contingencia".
  - **5 páginas de servicio nuevas (ES/EN)**, construidas solo con lo que el sitio ya decía de Cyrrus: `/metodo-cira/estrategia/estrategia-de-ti` (it strategy consulting 1.900 · SD 19), `/metodo-cira/estrategia/continuidad-del-negocio` (business continuity consulting services 590 · SD 10), `/metodo-cira/seleccion-de-soluciones/ciberseguridad` (cybersecurity consulting services 2.400 · SD 12), `/intelligence-lab/gobierno-de-datos` (data governance consulting services 390 · SD 14) y `/intelligence-lab/estrategia-de-ia` (ai strategy consulting 880 · SD 27). Cuatro usan un componente nuevo `src/components/layout/service-child-page.tsx` (`createServiceChildPage`, misma estructura que `GobiernoDeIA.tsx`: hero, respuesta primero, qué incluye, cuerpo, relacionados, guías, FAQ con FAQPage y BreadcrumbList) con la copia en `estrategia.json` (`estrategiaTi`, `continuidad`) e `intelligence-lab.json` (`gobiernoDatos`, `estrategiaIa`); ciberseguridad es una entrada más de `solutions-data.ts` / `seleccion-soluciones.json` (`SolucionDetalle.tsx`). Rutas en `App.tsx` (PAGES), `route-meta.json`, `generate-sitemap.mjs` (CONTENT_SOURCE), menú (`nav-config.ts` + claves nuevas en `common.json`), categoría nueva en el hub de selección, relacionados en Estrategia (+2), Infraestructura (+2) y Gobierno de IA (+1), y `llms.txt`.
  - **Marcos citados solo de fuentes abiertas el 2026-11-12:** ISO 22301:2019, ISO/IEC 27001:2022 e ISO/IEC 38500:2024 (páginas de iso.org, abiertas con el navegador integrado; WebFetch daba 403), NIST CSF 2.0 (PDF, 2024-02-26: seis funciones), NIST SP 800-34 Rev. 1 (PDF: BIA, MTD, RTO, RPO, BCP vs. DRP vs. ISCP, siete pasos), COBIT 2019 (página de ISACA) y DAMA-DMBOK (página de DAMA: solo "marco de referencia reconocido"; no define gobierno de datos, por eso la página de gobierno de datos no le atribuye más). Sin cifras.
  - **3 guías nuevas (ES/EN)** en `blog.json` + `blog-data.ts`: `plan-de-continuidad-del-negocio-que-es-bia-rto-rpo` (NIST SP 800-34 + ISO 22301), `estrategia-de-ti-que-es-y-que-incluye` (ISO/IEC 38500 + COBIT) y `como-elegir-una-consultoria-de-ciberseguridad` (NIST CSF 2.0 + ISO/IEC 27001). Cada una con H2 en pregunta que abre respondiendo, 3 ideas clave, 2 tarjetas de servicio, enlaces a su servicio y a las otras guías, fuentes con fecha de consulta y opiniones marcadas "en nuestro criterio".
  - **Victorias rápidas:** título ES de gobierno de IA → "Consultoría en Gobierno de Inteligencia Artificial" (única keyword de la lista en top 10, EN pos. 8; `route-meta.json` sincronizado); título EN de SEO → "SEO Consulting & AI Search (GEO) Visibility"; descripción de PMO ES/EN con "PMO como servicio / PMO as a Service"; enlace "PMO as a Service" → `/metodo-cira/gestion-de-proyectos` en los dos artículos de PMO (ES/EN); `seoTitle` EN en planeación estratégica ("Strategic Planning: Definition, Stages & Example") y PMO ("What Is a PMO? Functions, Types & When You Need One"), y ES en PMO (el título tenía 67 caracteres).
  - **Herramientas de la sesión** (scratchpad, no en el repo): `gsc.mjs` (JWT con la cuenta de servicio; 1.598 consultas y 1.853 pares consulta-página), `content-pages.mjs` / `content-posts.mjs` / `apply.mjs` (inserción textual en los JSON que no son round-trip de `JSON.stringify`: `blog.json`, `common.json`; `estrategia.json` se reformateó en tres arrays en línea).
- **No hecho / decisiones del cliente:** no se crearon páginas de consultoría ISO 27001, CFO as a Service, vCISO ni implementación de ERP (no están en el sitio como servicios); no se cambiaron los slugs `/en/…` (depende del mercado principal); no se comparó contra competidores en el SERP; no se identificaron los 4 títulos duplicados de Ubersuggest. Sigue sin tocarse el artículo de costo de ERP EN (1.275 impresiones en pos. 63).
- **Verificación:** `tsc` limpio; `npm run build` con **156/156 rutas** prerenderizadas; sitemap regenerado con **142 URLs** (16 nuevas); consola sin errores (sin #418) en las 5 páginas de servicio y las 3 guías (ES y EN mezcladas) y en `/metodo-cira/estrategia`, servidas desde `dist/` con `serve-dist.mjs`; títulos y H1 comprobados en el HTML prerenderizado.
- **Commits:** ninguno (siguen los ~70 archivos del rediseño ajeno sin confirmar; mismo criterio que la Sesión 16).
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-11-13.zip` (reemplaza al `2026-11-05-v7`; incluye las Sesiones 15, 16 y 17 y el rediseño sin confirmar).
- **Pendiente / bloqueos nuevos:** ver Bloqueos (zip y decisiones de la auditoría).
- **Próxima sesión:** Sesión 18 (ver arriba).

### Sesión 16 — 2026-11-05 — Palabras clave comerciales, títulos y contenido de páginas de servicio
- **Tareas trabajadas:** fuera de las fases del plan (pedido directo del cliente): investigación de palabras clave por país, títulos SEO y contenido de cuatro páginas de servicio. Sin insumos del cliente (siguen bloqueados B3, B4, A4).
- **Hecho:**
  - **Palabras clave (Ubersuggest, 2026-11-04/05):** listas por país en `docs/keywords-posicionamiento/` (EE. UU., México, Colombia, más las de Search Console). Hallazgo: en español la demanda de "consultoría X" es de 0 a 110 búsquedas al mes; el volumen comercial está en inglés (EE. UU.): "ai consulting services" 2.400, "erp consultant" 1.600, "change management consulting" 1.000, "pmo consulting services" 390.
  - **Search Console (2026-07-01 a 2026-11-03):** ver Métricas. 34 de 65 clics son la marca; 153 consultas largas "compara hubspot con…" (probablemente automáticas) explican casi todas las impresiones de la comparativa de CRM.
  - **Títulos:** 24 títulos de página de servicio ES/EN (`meta.title` de cada namespace; `route-meta.json` sincronizado en ES), 4 `seoTitle` de artículos (gestión del cambio y gobierno de IA, ES/EN) y 5 más de hire-intent (PMO externa ES/EN, costo de ERP EN, ERP para medianas ES/EN, consultora estratégica EN). Todos ≤ 60 caracteres con " | Cyrrus". Corregido el título HCM ES (63).
  - **Contenido (patrón "respuesta primero"):** ERP y CRM (`seleccion-productos.json` + bloque `respuesta` opcional en `SeleccionProducto.tsx`), PMO (`gestion-proyectos.json`) e Intelligence Lab hub (`intelligence-lab.json` + `IntelligenceLab.tsx`, con bloque de respuesta y tres guías enlazadas). H1 alineado con el título, FAQ nueva de "cuándo contratar" (entra al FAQPage) y enlace al caso 3 Castillos desde ERP y CRM. Título EN del hub ajustado a "AI Consulting Services: Governance & Architecture" para no prometer "strategy & implementation".
  - **Botón** "Test de preparación para un ERP" en el encabezado de la página de ERP (ES/EN).
  - **Gestión del cambio EN** (`en/gestion-cambio.json`): H1 "Change management consulting services: adoption from day one", definición y alcance con "change management consulting services", FAQ nueva "When should a company hire a change management consulting firm?" (primera del FAQPage). Caso Morelco añadido como cuarto enlace relacionado en ES y EN (`GestionDelCambio.tsx`, texto de la descripción publicada del caso).
  - **Estrategia EN** (`en/estrategia.json`): H1 "Strategic planning and strategy consulting for companies", definición como "What does a strategic planning consultant do?", servicio "IT strategy consulting and digital transformation", FAQ renombrada "When should a company hire a strategic planning consultant?" y FAQ nueva "What does IT strategy consulting include?" (del alcance y entregables ya publicados). Caso 3 Castillos como cuarto enlace relacionado en ES y EN (`PlaneacionEstrategica.tsx`).
  - **Subpáginas de Intelligence Lab** (`intelligence-lab.json` ES/EN, `GobiernoDeIA.tsx`, `ArquitecturaDeIA.tsx`, `AutomatizacionesDesarrollo.tsx`). Ubersuggest 2026-11-05: "gobernanza de ia" 210 (ES, global), "gobierno de ia" 90, "AI governance consulting" 170 (EE. UU., SD 12), "data governance consulting services" 390.
    - **Gobierno de IA (prioridad):** título ES "Gobernanza de IA y de Datos: Consultoría" y EN "AI Governance Consulting & Data Governance Services"; H1 alineados; bloque de respuesta "¿Qué es la gobernanza de IA y con qué marco se hace?" con NIST AI RMF, OCDE e ISO/IEC 42001 (hechos tomados de la guía G17, que cita las fuentes oficiales; sin fechas en la página); cuerpo de 2 a 5 párrafos (auditoría de lo existente, las cuatro decisiones de la gerencia marcadas como criterio de Cyrrus, relación con el gobierno de datos); sección de guías (marcos, ISO/IEC 42001, regulación); 3 FAQs nuevas (cuándo contratar, qué marco usar, gobierno de IA vs. de datos).
    - **Arquitectura y automatización EN:** cuerpo y FAQs traducidos del ES (EN tenía 2 párrafos frente a 6–7); H1 "Enterprise AI architecture and AI implementation consulting" y "Process automation consulting and AI agents for companies"; H1 ES de arquitectura "Arquitectura de IA empresarial y arquitectura de datos". FAQ nueva de "cuándo contratar" en ambas, ES/EN.
    - Botón "Agendar conversación" en el encabezado de las tres subpáginas (no tenían). Corregido: la FAQ de las tres salía "Preguntas frecuentes" en `/en` (faltaba el título).
  - **Selección de soluciones, HCM y EAM** (`seleccion-soluciones.json`, `seleccion-productos.json` ES/EN, `SeleccionDeSoluciones.tsx`, `SeleccionProducto.tsx`). Ubersuggest 2026-11-05: "technology consulting services" 720 (EE. UU.), "consultoría tecnológica" 210, "hcm consulting" 320, "hris consultant" 110, "software de recursos humanos" 1.000, "software de mantenimiento" 880, "eam consulting" 40, "cmms consultant" 30.
    - **Hub:** bloque de respuesta "¿Qué hace una consultoría tecnológica independiente?" (qué elegimos, cómo, tiempo), H1 EN "Technology consulting services: vendor-neutral IT solution selection", FAQ EN "What is technology consulting, and when should a company hire it?" (existía solo en ES) y caso 3 Castillos como cuarto enlace relacionado (su ficha publicada incluye selección de infraestructura, ERP y CRM).
    - **HCM:** títulos "Software de Recursos Humanos (HCM): Consultoría" / "HCM Consulting: HRIS & HCM Software Selection", H1 alineados, bloque de respuesta, FAQ "cuándo contratar" (de los dolores publicados) y en EN la FAQ "What is an HCM…" que solo estaba en ES; enlace a la guía de software de RR. HH. y nómina.
    - **EAM:** títulos "Software de Mantenimiento (EAM/CMMS): Consultoría" / "EAM & CMMS Consulting: Asset Management Software", H1 alineados, bloque de respuesta, FAQs "cuándo contratar" y "CMMS vs. EAM" (de la guía publicada); enlace a la guía CMMS/EAM. Corregida la generalización sin fuente "la brecha… es la más amplia del software empresarial" → "puede ser amplia".
  - **Selección de software y tecnologías avanzadas** (`seleccion-de-software.json`, `seleccion-soluciones.json` ES/EN, `SeleccionDeSoftware.tsx`, `SolucionDetalle.tsx` con bloques opcionales `answer` y `guides`). Ubersuggest 2026-11-05: "rpa consulting" 170 y "rpa consulting services" 110 (EE. UU.), "software selection" 90, "automatización de procesos" 720 (España, ya la apunta Intelligence Lab), "software rpa" 50, "selección de software" 10.
    - **Hub de software:** bloque de respuesta "¿Qué es la selección de software empresarial?" (qué seleccionamos, las seis dimensiones de evaluación, 6–12 semanas), H1 EN "Software selection consulting: independent ERP and CRM evaluation", FAQ 1 reescrita para que responda (los cinco pasos publicados), FAQ nueva "cuándo contratar" y sección de cuatro guías (ERP, CRM, RR. HH., CMMS/EAM). Corregida la generalización "es lo que separa una selección que se adopta de una que se resiste" → marcada como criterio de Cyrrus.
    - **Tecnologías avanzadas:** títulos "Consultoría RPA: Software de Automatización e IA" / "RPA Consulting: Automation Software Selection" (para no competir con la página de automatización de Intelligence Lab), H1 alineados, bloque de respuesta "¿Qué hace una consultoría RPA independiente?", FAQ "cuándo contratar", definición de RPA alineada con la guía G2 (IBM/Microsoft) y sección de guías (RPA, integración ERP–CRM, gobernanza de IA). El EN estaba desactualizado (3 ítems, sin cuerpo ni H1): traducido completo del ES. Corregidas generalizaciones: "suele convenir" → "puede convenir", "muchas veces la mejor solución mezcla dos" → ejemplo de la guía, "termina en mantenimiento permanente" → "necesita ajustes constantes" con la cita de IBM, y "automatizar un proceso confuso…" marcado como criterio de Cyrrus.
  - **Infraestructura tecnológica** (`seleccion-soluciones.json` ES/EN, `SolucionDetalle.tsx`). Ubersuggest 2026-11-05: "cybersecurity consulting services" 2.400 (EE. UU.), "it infrastructure consulting" 590, "cloud migration consulting" 590, "consultoría de ciberseguridad" 110 (España), "consultoría cloud" 40. No se apuntó "cybersecurity consulting services" en el título EN porque esa búsqueda suele pedir servicios que la página no ofrece (opinión); se usó "IT Infrastructure Consulting: Cybersecurity & Cloud". ES conserva "Consultoría en Ciberseguridad y Nube para Empresas".
    - H1 alineados, bloque de respuesta (diagnóstico de lo existente, los cuatro criterios publicados en el hub, alcance con PMO), cuerpo nuevo de 5 párrafos (ES y EN no tenían; errores típicos marcados como criterio de Cyrrus), FAQ "cuándo contratar" y enlaces a los talleres de ISO 27001 y continuidad/DRP de Leadership Academy.
- **Fuentes:** todo el texto nuevo sale del propio sitio (FAQs existentes, dolores y entregables de cada página, descripción publicada del caso 3 Castillos, servicios de PMO; en gobierno de IA, la guía G17 con sus fuentes). No se añadieron cifras ni afirmaciones nuevas sobre Cyrrus.
- **No verificado / no hecho:** no se revisó el SERP de todas las keywords (solo "erp consultant", "consultoría estratégica", "consultoría tecnológica" y "pmo consulting services"). En `/en` el aviso de cookies sale en español (fuera de alcance).
- **Verificación:** `tsc` limpio; build de **140 rutas**; consola sin errores de hidratación en ERP, CRM, PMO, Intelligence Lab, gestión del cambio, estrategia, selección de soluciones/software, HCM, EAM, tecnologías avanzadas e infraestructura (ES y EN); títulos comprobados en el navegador.
- **Commits:** ninguno (siguen ~70 archivos del rediseño ajeno sin confirmar, que se empaquetan en el build).
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-11-05-v7.zip` (reemplaza a `2026-11-05`, `-v2` a `-v6`, eliminados). Incluye el rediseño ajeno sin confirmar.
- **Próxima sesión:** Sesión 17 (ver arriba).

### Sesión 15 — 2026-11-02 — Gobernanza de IA (G17–G22) y conexión con Search Console
- **Tareas trabajadas:** G17 ✅, G18 ✅, G19 ✅, G20 ✅, G21 ✅, G22 ✅. A1 ✅ (el cliente subió `cyrrus-dist-2026-11-01.zip`; producción sirve el mismo bundle, 114 URLs del sitemap con 200). Sin insumos del cliente (siguen bloqueados B3, B4, A4).
- **Hecho:**
  - **Search Console por API:** cuenta de servicio de solo lectura (permiso "Restringido") sobre `sc-domain:cyrruscs.com`. La clave JSON está **fuera del repo**, en `C:\Users\danie\.secrets\gsc-cyrrus.json`; no se sube a git. Se inspeccionaron las 108 URLs del sitemap por prioridad: ver Métricas. La API no permite pedir indexación (solo la interfaz).
  - **Investigación de palabras clave (Ubersuggest, 2026-11-02, México, Colombia, España y EE. UU.)** y selección de seis temas según la plataforma aliada (lideria.org). El volumen está en inglés (EE. UU.); en español solo hay volumen real en "iso 42001".
  - **Seis guías ES/EN** en `blog.json`, `blog-data.ts` y `llms.txt`, con pilar `/intelligence-lab/gobierno-de-ia`, enlazadas entre sí y con la guía previa de gobierno de IA corporativo. Todo dato con fuente abierta consultada el 2026-11-02; cada guía separa "lo que dice la fuente" de "criterio de Cyrrus" y dice qué no se pudo verificar.
  - **Clics (lectura 2026-08-01 a 2026-10-30):** 53 clics, 11.560 impresiones, CTR 0,46 %, posición media 19,2. De las consultas visibles (8.900 impresiones; Search Console oculta las anónimas), 408 consultas de 12+ palabras suman 3.150 impresiones y 0 clics (posición media 5,7): formato de instrucción a un asistente, no personas (origen sin confirmar). Las consultas reales (771, 5.750 impresiones, 27 clics) están en posición media 31,4. Páginas con más demanda real: planeación estratégica EN ("strategic planning", 469 impr., pos. 20,1), PMO ES/EN ("pmo que es" pos. 10,0; "pmo" pos. 19,8), "rpa ai" EN (pos. 17,2). Los ERP largos están en pos. 63–85. Los títulos y descripciones de esas páginas ya coinciden con las consultas: **no se cambiaron**.
  - **Enlaces internos (palanca elegida):** las páginas con más demanda real recibían 2 enlaces y la home enlaza a 4 de 32 artículos. Se añadió un párrafo "Para profundizar en temas relacionados" (ES) / "Related reading" (EN), con 1 a 3 enlaces a artículos del mismo tema, en 19 artículos existentes (`blog.json`, antes del cierre "Cómo podemos ayudarle" o al final si no hay). Enlaces entrantes: planeación estratégica 2→8, PMO 2→8, RPA 2→4, CMMS 2→6, MES 2→6, mejores ERP 3→6, WMS 3→5. 0 enlaces rotos. No se tocó la home (rediseño ajeno sin confirmar).
  - **Intención comercial (Ubersuggest, 2026-11-02):** en español la demanda comercial es mínima ("consultoría erp" 20 y "consultoría pmo" 10 en México; sin dato para planeación estratégica ni gestión del cambio). En EE. UU. (inglés): "erp consulting" 1.600 (CPC $36,51, SD 38), "change management consulting" 1.000 (SD 14), "strategic planning consulting services" 880 (SD 30), "strategic planning consulting" 590, "erp consulting service" 590, "pmo consulting services" 390 (SD 18), "independent erp consulting" 70. Las páginas de servicio casi no aparecen: 0–19 impresiones cada una en tres meses (casi todas de la marca "cyrrus"), así que **el título no es la causa de que no haya clics**; la causa es que no están posicionadas para esas búsquedas.
  - **Títulos EN de servicio cambiados** para nombrar la búsqueda comercial exacta (los ES ya decían "Consultoría …"): estrategia → "Strategy & Strategic Planning Consulting Services"; gestión del cambio → "Change Management Consulting Services"; PMO → "PMO Consulting Services & Project Management"; ERP → "Independent ERP Consulting: ERP Selection". Descripciones ajustadas igual (≤ 154 caracteres). Archivos: `en/estrategia.json`, `en/gestion-cambio.json`, `en/gestion-proyectos.json`, `en/seleccion-productos.json`. Los artículos informativos no se tocaron a propósito: reciben consultas informativas y un título comercial no coincidiría con lo que buscan.
  - **Medir:** a las 3–4 semanas de subir el zip, repetir la lectura con el filtro de personas y comparar posición y clics de planeación estratégica, PMO, RPA y CMMS/MES, y las impresiones de las cuatro páginas de servicio EN.
- **Fuentes (todas abiertas y leídas):** NIST (AI RMF 1.0, AIRC), OCDE, ficha de la IEC (ISO/IEC 42001), organismo de Estonia (ISO/IEC 42006), Comisión Europea, AI Act Service Desk, texto de la H.B. 149 de Texas, SB26-189 de Colorado, BOE, DNP, Microsoft Research.
- **No verificado (no se afirma):** la página de ISO (`iso.org`, 403) y el texto de pago de ISO/IEC 42001 y 42006; el texto completo del CONPES 4144 (solo el artículo divulgativo del DNP); competencias actuales de la AESIA bajo el reglamento europeo; normas federales de EE. UU.; el número oficial del AI Omnibus (solo apareció en fuentes secundarias, no se cita).
- **Verificación:** `tsc` limpio; build de **140 rutas**; las 12 URLs nuevas prerrenderizadas; consola sin errores de hidratación en 6 rutas de muestra (ES y EN); 0 enlaces internos rotos; título SEO ≤ 52 caracteres y descripción ≤ 155.
- **Commits:** ninguno. Hay ~70 archivos sin confirmar del rediseño ajeno, que se empaquetan en el build; confirmar solo los de esta sesión (`blog.json` ES/EN, `blog-data.ts`, `llms.txt`, `sitemap.xml`, `sitemap-content-hashes.json`, este archivo).
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-11-02-v3.zip` (reemplaza al `2026-11-01`, que ya está en producción, y a los `2026-11-02` y `-v2`, eliminados). Incluye el rediseño ajeno sin confirmar.
- **Pendiente / bloqueos nuevos:** (1) pedir indexación a mano de: los 3 artículos de la sesión 14 en ES y EN, `/en/metodo-cira/seleccion-de-soluciones/infraestructura-tecnologica` y las 12 URLs nuevas (G17–G22) una vez subido el zip. (2) Los 7 talleres de Leadership Academy en "próximamente" (14 URLs) siguen fuera del sitemap a propósito; no pedir indexación. (3) Confirmar con el cliente si quiere mencionar a Lideria en las guías; no se hizo porque no hay texto aportado por el cliente. (4) Las guías en inglés compiten con URLs de slug en español (convención del sitio); valorar slugs en inglés para las EN.
- **Próxima sesión:** Sesión 16 (ver arriba).

### Sesión 14 — 2026-10-23 — Satélites de CRM (C15, C16, C18)
- **Tareas trabajadas:** C15 ✅, C16 ✅, C18 ✅. Sin insumos del cliente (siguen bloqueados B3, B4, A4).
- **Hecho:** tres artículos ES/EN en `blog.json`, `blog-data.ts` y `llms.txt`; enlazados entre sí y desde la guía "Qué es un CRM" (bloque nuevo antes de "Cómo podemos ayudarle"), a la comparativa C5 y al servicio de CRM/ERP. **C15:** tabla de correspondencia, frecuencia de 30 minutos y límites tal como los declara Microsoft; el resto son decisiones de la gerencia rotuladas como criterio de Cyrrus. **C16:** tabla de precios por usuario (Salesforce 25/100/195/395/550; Dynamics 65/105/150; HubSpot Enterprise 150 más cuota de US$3.500; cuota de Professional US$1.500) y costos aparte según las propias páginas (complementos, créditos de Copilot, soportes, Data Hub). **C18:** reglas de detección de Dynamics 365 (predeterminadas solo para cuentas y contactos; máximo cinco publicadas por tipo base) y de HubSpot (comparación diaria; fusiones irreversibles; reglas propias con Data Hub). **No se usó:** porcentajes de implementación o capacitación (no publicados), la ayuda de Salesforce (no abrió), cualquier afirmación de integración fuera de Microsoft.
- **Imágenes:** fotos de cámara de 1600 px; `scripts/audit-images.mjs` sin fotos ampliadas.
- **Verificación:** `tsc` limpio; build de 128 rutas; las seis páginas con título, H1 y tabla, 0 imágenes rotas, 0 enlaces internos rotos, consola sin errores. Descripciones ≤ 155 caracteres.
- **Commits:** ver `git log` ("Sesión 14: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-23-v18.zip` (reemplaza al v17). Incluye el rediseño ajeno sin confirmar.
- **Pendiente / bloqueos nuevos:** revisar los precios de C16 en L1 (las páginas avisan que pueden cambiar); enlazar C15, C16 y C18 desde la página de servicio de CRM (archivo del rediseño).
- **Próxima sesión:** Sesión 15 (ver arriba).

### Sesión 13 — 2026-10-23 — Lectura de Search Console (3 meses) y ajuste de títulos
- **Tareas trabajadas:** A2 (lectura de datos). Sin tarea nueva del plan.
- **Datos (exportación 2026-07-22 a 2026-10-21):** 52 clics, 7,27 mil impresiones, CTR 0,7 %, posición media 17,4. Las impresiones pasan de ~20 al día a 400–470 desde el 6–10 de oct. (el build del 5 de oct.). Colombia da 32 de los 52 clics.
- **Hallazgos:** (1) 177 consultas con formato de instrucción a un asistente de IA ("compara HubSpot con Salesforce… debes proporcionar un ranking") suman 1.624 de las 5.717 impresiones listadas (28 %), posición media 5,3, 0 clics: no son búsquedas de personas; el origen (herramientas de medición de IA o respuestas de IA) es una hipótesis sin confirmar. (2) 29 de los 30 clics listados son de la consulta de marca "cyrrus" (posición 4,9). (3) Las consultas reales de ERP están en posición 73–86 (páginas recién publicadas); "pmo" y "strategic planning" en 20; "pmo que es" en 10,2; "crm microsoft vs hubspot" en 7,3. (4) Las URL del sitio anterior ya redirigen con 301; la URL con slug duplicado de la comparativa de CRM daba 404.
- **Hecho:** título SEO y descripción de la comparativa de CRM (ahora con "Microsoft Dynamics 365") y descripción de la guía de PMO (abre con la definición), ES/EN, en `blog.json`; redirección 301 de la URL con slug duplicado en `public/.htaccess` (no se puede probar con el servidor local; probar en producción tras subir). El título de PMO no se cambió: ya coincide con la búsqueda.
- **Medir:** a las 3–4 semanas de subir, comparar clics y CTR de esas dos páginas en Search Console. Para ver solo personas: filtro de Consulta → expresión regular personalizada → "no coincide" `(.*\s){7,}.*`.
- **Verificación:** build de 122 rutas; título y descripción nuevos en el HTML de ES y EN; JSON válido.
- **Commits:** ver `git log` ("Sesión 13: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-23-v18.zip` (reemplaza al v16). Incluye el rediseño ajeno sin confirmar.
- **Pendiente / bloqueos nuevos:** ninguno nuevo. Para subir posiciones en ERP hacen falta tiempo y enlaces externos (F).
- **Próxima sesión:** Sesión 14 (ver arriba).

### Sesión 12 — 2026-10-23 — Qué es un CRM (G3)
- **Tareas trabajadas:** G3 ✅. Sin insumos del cliente (siguen bloqueados B3, B4, A4).
- **Hecho:** artículo ES/EN `que-es-un-crm-y-como-elegir-el-correcto`. Verificado en IBM (definición; operativo, analítico y colaborativo; funciones; riesgos de adopción, proveedor y tamaño) y Microsoft Learn (qué gestiona Dynamics 365 Sales). **No se usó:** cifras de retorno ni estadísticas de mercado (sin fuente primaria); IBM no trata la calidad de datos como reto aparte, por eso no se afirma. Criterios de elección rotulados como criterio de Cyrrus. Se quitaron de `perspectivas-topics.ts` los temas "próximamente" ya publicados (RPA, CRM, resistencia al cambio).
- **Imágenes:** portada y tarjetas con fotos de cámara de 1600 px; `node scripts/audit-images.mjs` sin fotos ampliadas.
- **Verificación:** `tsc` limpio; build de 122 rutas; ES y EN con título y tabla; consola sin errores.
- **Commits:** ver `git log` ("Sesión 12: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-23-v18.zip` (reemplaza al v15). Incluye el rediseño ajeno sin confirmar.
- **Pendiente / bloqueos nuevos:** enlazar G2 y G3 desde sus páginas de servicio (la de CRM está en archivos del rediseño).
- **Próxima sesión:** Sesión 13 (ver arriba).

### Sesión 11 — 2026-10-23 — Qué es RPA (G2)
- **Tareas trabajadas:** G2 ✅. Sin insumos del cliente (siguen bloqueados B3, B4, A4).
- **Hecho:** artículo ES/EN `que-es-rpa-y-cuando-conviene-frente-a-la-ia` (`blog.json`, `blog-data.ts`, `llms.txt`). Verificado en IBM (definición, "guiada por el proceso" vs "guiada por los datos", capa de presentación sin API, límites de escala, casos en seguros/banca/comercio) y Microsoft Learn (desktop flows, aplicaciones antiguas, captura de datos en un ERP). **No se usó:** la página de SAP (403) ni cifras de ahorro (sin fuente primaria). Preguntas y decisiones de la gerencia rotuladas como criterio de Cyrrus.
- **Verificación:** `tsc` limpio; build de 120 rutas; ES y EN con título, H1 y tabla; consola sin errores.
- **Commits:** ver `git log` ("Sesión 11: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-23-v18.zip`. El árbol sigue con el rediseño ajeno sin confirmar; el v13 se conserva.
- **Imágenes (a pedido del cliente: ninguna borrosa):** `scripts/audit-images.mjs` (con `dist` servido) recorre las rutas del sitemap y lista las fotos que se muestran más grandes que su archivo. Causa principal: en recortes por altura (`object-cover` en tarjetas casi cuadradas) el `sizes` por ancho hacía elegir una versión chica y el navegador la ampliaba 1,5x a 2,5x; se subieron los `sizes` de `page-hero`, `included-grid`, `service-body`, `service-intro`, `article-service-cta`, `card-grid`, `blog7`, Experiencia y Quiénes somos. Se reemplazaron las fotos `evento-*` (capturas de video con barras negras, 1280×575 con contenido de ~430 px; una es la foto de una pantalla) y las de WhatsApp por fotos de cámara de 1600 px, con alt neutro donde el alt afirmaba quién aparecía. Foto de Jackson: de `.webp` 256×320 a `.jpeg` 800×1000. Miniaturas de YouTube: `maxresdefault` (1280×720) en vez de `hqdefault` (480×360). **Logo del encabezado:** apuntaba a un `.webp` que no existe (404, desde la Sesión de rendimiento 5018963); ahora usa el `.png` que sí está en el manifiesto. Resultado de la auditoría: 0 fotos ampliadas.
- **Pendiente / bloqueos nuevos:** enlazar G2 desde la página de tecnologías avanzadas. **Logos de clientes**: los archivos fuente miden ~43 px de alto (Marympunt 43×43, Parex 71×29…); se ven bien a 1x y blandos en pantallas retina: el cliente debe enviar los logos en SVG o a mayor resolución. **Foro Caribe 2030** (Quiénes somos, hito 3): es una foto de evento de 1280×575 con barras negras; se ve aceptable recortada, pero conviene el original. Los archivos del rediseño ajeno siguen sin confirmar (incluye los cambios de `sizes` y de fotos en esos componentes).
- **Próxima sesión:** Sesión 12 (ver arriba).

### Sesión 10 — 2026-10-23 — Fin de venta de Salesforce CPQ (C17)
- **Tareas trabajadas:** C17 ✅. Sin insumos del cliente (siguen bloqueados B3, B4, A4).
- **Hecho:** artículo ES/EN `fin-de-venta-salesforce-cpq-opciones` (`blog.json`, `blog-data.ts`, `llms.txt`). Solo afirma lo que dice Salesforce en su página oficial (leída 2026-10-23): CPQ no se vende a clientes nuevos; los actuales pueden usarlo, agregar usuarios, renovar y recibir soporte con correcciones críticas, sin funciones nuevas; no hay fecha de fin de vida ni migración forzosa; sucesor Revenue Cloud Advanced; Salesforce cita ~15 % de migrados y 3–6 meses (rotulado como cifras de Salesforce). HubSpot: CPQ en Revenue Hub Professional/Enterprise (página de HubSpot). Dynamics 365: catálogo, listas de precios y plug-ins (Microsoft Learn). **No se usó:** fecha de "19-mar-2025" ni "fin de vida 2029–2030" (solo terceros), ni el nombre "Agentforce Revenue Management" (no aparece en la página de Salesforce).
- **G1 ✅:** artículo ES/EN `resistencia-al-cambio-como-diagnosticarla-y-que-hacer`. Verificado: elementos de ADKAR y "barrera más temprana" (página de Prosci), patrocinio activo como principal contribuyente "por más de 25 años", "tres a uno" y prácticas del patrocinador (blog de Prosci), 8 pasos de Kotter. **No se usó** (no se pudo abrir o no figura en la página): 72 % vs 29 % de patrocinadores, "falta de conciencia es la causa principal" y la definición numérica de barrera (≤3); HBR de Kanter (de pago, no lista los diez motivos). Preguntas de diagnóstico y acciones rotuladas como criterio de Cyrrus.
- **Rediseño:** los artículos nuevos usan el renderizador de `ArticuloPerspectiva` del rediseño en curso (hero oscuro compacto, cuerpo a 720 px, tokens `mist`/`line`/`slate`); no necesitan componentes propios. Portada de G1: foto existente del manifiesto. La foto "Evento mesas" no está en el manifiesto (requiere `npm run images`).
- **Verificación:** `tsc` limpio; build de 118 rutas; ES y EN con título, H1, tabla y enlaces; G1 sin desborde horizontal; consola sin errores.
- **Commits:** ver `git log` ("Sesión 10: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-23-v13.zip` (regenerado al añadir G1). **Ojo:** el árbol de trabajo tiene ~60 archivos sin confirmar de un rediseño ajeno a esta sesión (componentes de layout, `index.css`, páginas) y el build los incluye; revisar antes de subir. El v12 se conserva por eso.
- **Pendiente / bloqueos nuevos:** enlazar C17 desde C5 y desde la página de CRM; la fecha de la página de Salesforce no figura, por lo que revisar en L1.
- **Próxima sesión:** Sesión 11 (ver arriba).

### Sesión 9 — 2026-10-21 — Plantilla de RFP para ERP (D3)
- **Tareas trabajadas:** D3 ✅. Producción sigue sin los zips v4–v12 (las páginas nuevas dan 404), así que A2/A5 siguen esperando.
- **Hecho:** `scripts/build-rfp-template.py` genera dos Excel (ES/EN) como estructura, no como datos: instrucciones; empresa y alcance; requerimientos funcionales (6 módulos × 4 filas, con prioridad y respuesta por proveedor); técnicos y cobertura local; costo total por proveedor con sumas; matriz de evaluación ponderada con los siete criterios de la guía de ERP, validación 1–5, pesos que deben sumar 100 y aviso si no; calendario con las siete etapas de la guía; referencias. Pesos, precios y plazos los pone la empresa (regla de `CLAUDE.md`). Bloque de descarga en la guía de ERP, en mejores ERP y en costo de ERP (ES/EN); `llms.txt`.
- **Verificación:** fórmulas revisadas a mano (ponderado = peso/100 × calificación; suma; chequeo de pesos); descarga 200 en ES y EN; build de 114 rutas; consola sin errores. No hay LibreOffice para recalcular las fórmulas con datos.
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-21-v12.zip` (reemplaza al v11, eliminado).
- **Pendiente / bloqueos nuevos:** ninguno nuevo. Abrir el Excel en Excel una vez para confirmar el formato de las listas desplegables.
- **Próxima sesión:** Sesión 10 (ver arriba).

### Sesión 8c — 2026-10-21 — Auditoría completa de verificabilidad
- **Alcance:** los 19 artículos, todas las páginas de servicio, inicio, métodos, casos, herramientas, `llms.txt`, datos estructurados y descripciones (ES y EN). Registro completo y con fuentes en [`AUDITORIA-VERIFICABILIDAD.md`](./AUDITORIA-VERIFICABILIDAD.md).
- **Verificado en fuente abierta:** BCG (70%), Prosci (88% vs 13%, unas 7 veces), Panorama 2026 (más de una cuarta parte sobre presupuesto), HBR/Zook y Allen (1.854 empresas, 7 de 8, 90%), SAP (fechas de ECC, licencias de Business One), Microsoft (precios de Business Central, bodega), TechTarget, ISA, Infor; PMI 11,4%, Air Canada, Samsung e ISO 42001 por confirmación de terceros (las páginas dieron 403).
- **Corregido:** HBR atribuía el estudio a Kaplan y Norton y decía "más del 90%": es de Zook y Allen y dice 90%. Se quitaron/suavizaron en ES y EN decenas de afirmaciones sin fuente ("la mayoría de las iniciativas de IA fallan…", "casi nunca falla por el software", "el sesgo de quien la vendió", "garantizamos…", "alineación perfecta", "casi toda empresa que nos llama", "mandos medios boicotean…"). "Resultados verificables" pasó a "Resultados de un proyecto de Cyrrus". Inicio ahora cita a BCG; Método CIRA cita a Panorama; el plazo de SEO usa lo que Google sí dice. Fuente Samsung: CNBC (403) → Bloomberg. Retirada la frase de ISO 55001 que no se pudo abrir.
- **Queda como dato del cliente (sin respaldo comprobable desde fuera):** 15+ países, 2017, trayectoria de Jackson, cifras de casos, 6 a 12 semanas, "sin comisiones", etc. Lista en la sección 2 del archivo de auditoría.
- **Verificación:** `tsc` limpio; build de 114 rutas; páginas tocadas cargan sin errores de hidratación.
- **Zip:** `../Cyrrus builds/cyrrus-dist-2026-10-21-v12.zip` (reemplaza al v10, eliminado).

### Sesión 8b — 2026-10-21 — Auditoría de verificabilidad (regla del cliente: nada inventado)
- **Disparador:** el cliente preguntó si la calculadora era real y exigió que todo lo publicado sea 100% verificable. Regla guardada en `CLAUDE.md` ("Contenido: nada inventado, todo verificable") y en la memoria.
- **Calculadora D2:** sin valores iniciales. Campos vacíos; el único ejemplo carga un precio publicado (Business Central Essentials, US$80 por usuario al mes, pago anual, verificado en la página de Microsoft el 2026-10-21) y 25 usuarios. Se añadió un dato verificable del informe The 2026 ERP Report de Panorama Consulting (170 organizaciones, ene 2025–ene 2026): más de una cuarta parte superó su presupuesto; la causa más común fue la necesidad inesperada de tecnología adicional (PDF leído directamente).
- **No verificado y retirado:** ratios 1x–3x implementación/licencia y 3x–5x a cinco años (las páginas que los dan admiten que son reglas generales sin fuente; la atribución a Gartner no se pudo comprobar); mantenimiento del 20% y de 22% de SAP/Oracle (solo consultoras de licenciamiento); precios por usuario de SAP Business One (blogs de socios que se contradicen); porcentajes de integración, capacitación, contingencia, costo mensual por persona e infraestructura (inventados por mí).
- **Texto corregido en ES/EN:** quitadas generalizaciones sin fuente ("la licencia suele ser la partida más visible pero no la más grande", "los costos que más desvían el presupuesto", "casi nadie presupuesta", "la mayoría de los ERP que fracasan…", "más evaluados", "la elección suele decidirse por la simpatía", entre otras) en 9 artículos, el test D1, la calculadora, `/diagnostico`, la página de servicio de CRM y el calendario de LinkedIn. C4 ahora cita a Panorama.
- **C10 (SAP Business One):** verificado en documentos oficiales de SAP: tipos de usuario (Professional, Limited CRM/Financials/Logistics, Starter), Starter máximo 5 usuarios en la edición en la nube (Cloud Supplement), la app móvil está incluida en la licencia (guía 10.0). Retirado "excluye funciones avanzadas" (no verificado). La página de producto de SAP y la de ISO dieron 403: lo que dependía de ellas se redactó solo con lo que sí se leyó.
- **Sigue sin verificarse (y por qué):** ISO 55001 "aplica a todo tipo y tamaño de organización" (la página de ISO dio 403; la frase vino de un resumen de búsqueda); "6 a 12 semanas" de la fase de selección y la declaración "Cyrrus no recibe comisiones" (datos de Cyrrus, los aporta el cliente); el reparto 15/30/15 y el resto de supuestos de `/diagnostico` (a confirmar con el cliente); preguntas y rangos de puntaje del test D1 (criterio de Cyrrus, rotulado como orientativo).
- **Pendiente:** la auditoría de lo anterior a la Sesión 1 se hizo en la Sesión 8c (abajo).
- **Zip:** `../Cyrrus builds/cyrrus-dist-2026-10-21-v12.zip` (reemplaza al v9, eliminado).

### Sesión 8 — 2026-10-21 — Segunda herramienta: calculadora de costo total de un ERP (D2)
- **Tareas trabajadas:** D2 ✅, I1 🟡 (post de D2). Producción sigue sin el v8.
- **Hecho:**
  - `/herramientas/calculadora-costo-erp` (ES/EN): `src/pages/herramientas/CalculadoraCostoErp.tsx`, textos bajo `calculadoraErp` en `herramientas.json`. Entradas: modelo (nube o perpetua más mantenimiento), usuarios, precio por usuario, implementación, integraciones y migración, capacitación y cambio, contingencia, equipo interno (personas × meses × costo × dedicación), infraestructura y años (1–10). Salida: costo total y por año, parte de la licencia en el total ("la licencia es el 56% del costo"), desglose por categoría (barra y lista) y tabla por año. Botón para restablecer.
  - Sin cifras de fabricantes: los valores iniciales son ejemplos redondos y la página lo dice; el usuario los reemplaza por los de sus cotizaciones.
  - Hidratación: números con separador de miles manual (no `Intl`), anchos con un decimal, estado inicial igual en HTML estático y primer render.
  - Enlaces: artículo de costo de ERP (C4), test de preparación (ahora 4 tarjetas), `llms.txt`. Eventos GA4 `tool_start`.
  - Post de LinkedIn de D2 (semana 7).
- **Verificación:** `tsc` limpio; build de 114 rutas; cuatro escenarios calculados a mano y comparados con la pantalla (25 usuarios 215.040; 100 usuarios 690.960; perpetuo 1.139.400; 3 años 1.013.400; campo vacío 50.400), todos coinciden; EN con comas; móvil 375 px sin desborde; consola sin errores.
- **Commits:** ver `git log` ("Sesión 8: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-21-v12.zip` (reemplaza al v8, eliminado).
- **Pendiente / bloqueos nuevos:** ninguno nuevo. Los porcentajes de ejemplo (implementación 100%, integraciones 25%, capacitación 15%, contingencia 15%, mantenimiento 20%) son criterio de Cyrrus sin fuente: conviene validarlos con Jackson. Solo calcula costo, no beneficios.
- **Próxima sesión:** Sesión 9 (ver arriba).

### Sesión 7 — 2026-10-21 — Sesión de diagnóstico gratuita (B1) e investigación de competidores
- **Tareas trabajadas:** B1 ✅ (con supuestos por confirmar). Decisión del cliente: la oferta de entrada es **una sesión de diagnóstico gratuita**, no un servicio de pago (PLAN D13).
- **Hecho:**
  - Investigación: se pidió saber cuántos competidores ofrecen un diagnóstico de entrada con precio. En México y Colombia, de unas doce firmas revisadas, solo **erp.com.mx** publica precio (Básico US$0, Premium US$1.500; sin declarar independencia). Ninguna consultora independiente colombiana de selección de ERP apareció; las locales son implantadoras de su propio producto (Ofima, SAP B1, etc.). Panorama (oficina en Ciudad de México) y enterDATA se declaran independientes pero no publican precio. Fuentes con límites: búsqueda desde EE. UU. y sitios de las propias empresas.
  - Página nueva `/diagnostico` (ES/EN): `src/pages/Diagnostico.tsx`, textos en `locales/{es,en}/diagnostico.json`. Para quién es (50+ empleados, decisión en 12 meses) y cuándo no lo es (quien solo quiere cotización de licencias); sesión de 60 min en tres bloques; qué se lleva; cómo funciona; FAQ con "sin comisiones" y confidencialidad; enlace al test D1. JSON-LD `Service` (oferta a precio 0) + `FAQPage` + `BreadcrumbList`.
  - Enlaces: `FinalCta` (todas las páginas) ahora muestra "¿Aún no sabe por dónde empezar? Solicite una sesión de diagnóstico gratuita" (apagado en la propia página); la frase final de 11 artículos (C1–C14) enlaza al diagnóstico; `llms.txt`.
  - **Supuestos míos que el cliente debe confirmar**: duración de 60 minutos y reparto 15/30/15; nota de una página en los 3 días hábiles siguientes; filtro de 50+ empleados; que la dirige "un consultor senior" (sin nombre); tres preguntas de preparación enviadas por correo; confidencialidad según la política de privacidad.
- **Verificación:** `tsc` limpio; build de 112 rutas; ES y EN con título, H1, JSON-LD válido; enlace de FinalCta en Inicio; enlace en artículo EN; consola sin errores.
- **Commits:** ver `git log` ("Sesión 7: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-21-v8.zip` (reemplaza al v7, eliminado).
- **Pendiente / bloqueos nuevos:** confirmar los supuestos de arriba; B3 (agenda y WhatsApp) sigue bloqueada: hoy la solicitud va por el formulario de contacto, no por calendario. B2 (precios) quedó descartada (D14).
- **Próxima sesión:** Sesión 8 (ver arriba).

### Sesión 6 — 2026-10-21 — Primera herramienta: test de preparación para un ERP (D1)
- **Tareas trabajadas:** D1 ✅, I1 🟡 (post de la herramienta). B4 sigue bloqueada (falta elegir herramienta de correo). Producción sigue sin el v6 (artículos nuevos dan 404).
- **Hecho:**
  - Página nueva `/herramientas/test-preparacion-erp` (ES/EN): `src/pages/herramientas/TestPreparacionErp.tsx`, textos en `src/i18n/locales/{es,en}/herramientas.json` y `src/i18n/ns/herramientas.ts`; ruta en `PAGES` (`src/App.tsx`), `route-meta.json` y `CONTENT_SOURCE` del sitemap.
  - Diseño para el decisor: diez preguntas en cinco bases (procesos, datos, equipo, presupuesto y caso de negocio, patrocinio), una a la vez, con "Anterior". Resultado inmediato: puntaje sobre 30, tres rangos (no / casi / listo), barras por base (brecha / en desarrollo / sólida) y las tres brechas más débiles con recomendación y enlace a C4, guía de cambio y selección de ERP. CTA a contacto con el servicio de selección precargado. Aviso de que es orientativo, no un estudio.
  - Privacidad: no pide datos; las respuestas se calculan en el navegador. Eventos GA4 `tool_start` y `tool_complete` (con rango y puntaje) solo con consentimiento.
  - Hidratación: el estado empieza vacío (pregunta 1) igual en el HTML estático y en el primer render; barras con `transform: scaleX`, sin `opacity` ni atajos CSS; foco al cambiar de pregunta solo tras un clic.
  - Enlaces: tarjeta nueva en la página de servicio de ERP (la cuadrícula pasa a 4 columnas solo ahí), guía "Qué es un ERP", mejores ERP y costo de ERP, ES/EN; `llms.txt`.
  - JSON-LD `WebApplication` + `FAQPage` + `BreadcrumbList`.
  - LinkedIn: post de D1 y semana 7 en el calendario.
- **Verificación:** `tsc` limpio; build de 110 rutas; recorrido completo de las 10 preguntas en ES (puntaje 15/30, 3 brechas), EN con 4 opciones y JSON-LD, móvil 375 px sin desborde; consola sin errores de hidratación (solo el `ERR_CONNECTION_REFUSED` del panel que sale en cualquier página).
- **Commits:** ver `git log` ("Sesión 6: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-21-v7.zip` (reemplaza al v6, eliminado).
- **Pendiente / bloqueos nuevos:** el informe por correo depende de B4. El contenido de las preguntas y los umbrales de puntaje son criterio de Cyrrus, no están validados con datos: conviene revisarlos con Jackson y ajustarlos con las primeras respuestas (GA4 cuando exista A4).
- **Próxima sesión:** Sesión 7 (ver arriba).

### Sesión 5 — 2026-10-21 — RR. HH. y MES (C13, C14), enlaces cruzados y LinkedIn
- **Tareas trabajadas:** C13 ✅, C14 ✅, I1 🟡 (ampliado). Producción sigue sin el v5 (artículos de C9–C12 dan 404), así que A2/A5 siguen esperando.
- **Hecho:**
  - C13 *Software de RR. HH. y nómina para más de 100 empleados*: nómina vs HRIS vs HCM (aclara que los proveedores no usan los términos igual), qué cambia con el tamaño (exposición legal, rotación, cifras de personal, multi-país), integración con finanzas/ERP, protección de datos, cinco decisiones de la gerencia. Título sin país (ver memoria). Enlaza a la página HCM.
  - C14 *Software MES*: qué hace, MES vs ERP según ISA-95 (nivel 3 vs 4), tabla por niveles, señales de que una planta lo necesita, cuatro preguntas de la gerencia.
  - Enlaces cruzados pendientes de la Sesión 4: guía de mejores ERP → migración a S/4HANA; comparativas de SAP B1 vs NetSuite/BC y Odoo vs SAP B1 → cuánto cuesta SAP B1; artículo de costo de ERP → ambos. ES/EN. `llms.txt` actualizado.
  - Calendario de LinkedIn: añadidas piezas para C13, C14, C4 y C5/C8 (cifras solo de los artículos).
- **Verificación:** build de 108 rutas; las nuevas ES/EN con título, tabla y JSON-LD válido; enlaces cruzados presentes con el prefijo `/en` correcto; sin errores de hidratación en consola.
- **Commits:** ver `git log` ("Sesión 5: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-21-v6.zip` (reemplaza al v5, eliminado).
- **Pendiente / bloqueos nuevos:** ninguno nuevo. No se enlazó aún C10–C14 desde las páginas de servicio de ERP/HCM/EAM (solo hay tarjeta de recurso por servicio). La página de MES/manufactura no existe como servicio.
- **Próxima sesión:** Sesión 6 (ver arriba).

### Sesión 4 — 2026-10-21 — Categorías de software caro (C10, C11, C12) y LinkedIn (I1)
- **Tareas trabajadas:** C10 ✅, C11 ✅, C12 ✅, I1 🟡. Se confirmó que producción aún no tiene el v4 (el artículo de WMS da 404), así que A2/A5 siguen esperando.
- **Hecho:**
  - C10 *Cuánto cuesta SAP Business One*: no se inventaron precios. SAP no publica lista y no pude verificar cifras de socios (403 en la fuente), así que el artículo explica qué define el costo con la guía de licencias oficial (Professional, Limited, Starter de hasta 5 usuarios), tabla de componentes con "qué pedir en la cotización" y método de 5 años.
  - C11 *Software CMMS y EAM*: tabla de tres opciones, cuándo basta cada una, qué medir (costo de parada, preventivo vs correctivo), integración con el ERP, ISO 55001. Enlazado a la página de EAM.
  - C12 *SAP ECC a S/4HANA*: fechas verificadas en SAP Support y SAP News de octubre de 2026; tabla de etapas, tabla de cuatro rutas y cinco decisiones de la gerencia. Es la de más urgencia comercial: quedan poco más de 14 meses.
  - Los tres escritos para el lector decisor (CEO/CFO/COO): costo total, riesgo, capital, gobierno. `llms.txt` actualizado (ES/EN).
  - I1: calendario de LinkedIn de C9–C12 con la voz del skill `linkedin-cyrrus`.
- **Verificación:** build de 104 rutas; las 6 versiones nuevas cargan con título correcto, tablas y JSON-LD válido. En la consola solo aparece un `ERR_CONNECTION_REFUSED` que también sale en `/quienes-somos` (página sin cambios): viene del navegador del panel, no del sitio.
- **Commits:** ver `git log` ("Sesión 4: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-21-v5.zip` (reemplaza al v4, eliminado).
- **Pendiente / bloqueos nuevos:** ninguno nuevo. Falta enlazar C10–C12 desde ERP/EAM y desde C2–C4; portadas reutilizan fotos genéricas (K2 pendiente).
- **Próxima sesión:** Sesión 5 (ver arriba).

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

## Notas de diseño y contenido (2026-11-15) — plantilla de servicio, estrategia comercial y dos artículos

- **Plantilla única de páginas de servicio** (`ServiceTemplate`): todas las páginas de servicio tienen las mismas secciones (qué hacemos, qué es, cómo lo hacemos, por qué Cyrrus, beneficios, preguntas frecuentes, cierre). "Cómo lo hacemos" y "Beneficios" son propios de cada página y reformulan texto que la página ya tenía; no hay cifras nuevas.
- **Páginas retiradas por ahora:** Presencia Digital, Desarrollo Web y SEO (se reemplazan por la sección de estrategia comercial). Los textos siguen en `presencia-digital.json`, sin uso. Las URLs viejas dan 404; falta decidir si se redirigen.
- **Nueva página** `/metodo-cira/estrategia/estrategia-comercial` (ES/EN), con el contenido de la presentación del cliente, redactado en general (sin año). Palabras clave (Ubersuggest, 2026-11-15): "estrategia comercial" 480 búsquedas/mes en Colombia (dificultad 22) y 720 en México (27); "estrategia de ventas" 1.000 en Colombia (20); "consultoría comercial" 10; en EE. UU., "go to market strategy consulting" 140 (23) y "commercial strategy consulting" 30 (61). El volumen de búsquedas de servicio en español es muy bajo.
- **Cifra de Gartner (45 %) — verificada en parte:** la presentación dice "IA generativa" y "645 compradores". Lo que se pudo abrir (Digital Commerce 360, 17-mar-2026, que cita a Gartner) dice "45 % usó herramientas de IA en una compra reciente", encuesta a **646** compradores, agosto–septiembre de 2025. Las notas de prensa de Gartner (marzo y mayo de 2026) dieron 403. La página usa la redacción verificable. **Pedir al cliente** el documento original de Gartner si quiere afirmar "generativa" y 645.
- **Artículos nuevos** (ES/EN): "Cómo elegir una consultoría de IA con ejecución de punta a punta y ROI medible" y "Señales de que su empresa necesita una consultoría de ciberseguridad…". El segundo **reemplaza** a `como-elegir-una-consultoria-de-ciberseguridad` (misma intención de búsqueda; redirección 301 en `vercel.json`). El de IA no canibaliza ninguno de los 38 existentes.
- **Del texto original se quitó por no poder verificarse:** "82 % a 88 %" de pilotos sin producción (Prosigns solo dice 82 %); rangos US$15.000–75.000 y "US$500.000 o más" y la atribución a GoodFirms (Tillerbridge dice US$15.000–50.000 y "siete cifras o más" y no nombra a GoodFirms); la reducción de error MAPE de 31 % a 14 %; los plazos de 8–16 semanas, 3–5 meses y 9–18 meses; "extracción de modelos" como amenaza (OWASP 2025 no la lista); los rangos de Deepseas y Atlant Security (no se encontraron publicados; se reemplazaron por los de Clutch); la afirmación sobre el modelo por horas atribuida a Dan Cumberland Labs.
- **Fuentes que no se pudieron reabrir hoy:** ISO/IEC 27001 (403; se conserva la consulta del 12-nov); páginas de prensa de Gartner (403).
