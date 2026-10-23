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

**Última sesión cerrada:** Sesión 11 (2026-10-23, G2: qué es RPA y cuándo conviene frente a la IA).

**Próxima: Sesión 12.** Orden sugerido:
0. ~~Auditoría de verificabilidad completa~~ ✅ hecha (ver `AUDITORIA-VERIFICABILIDAD.md`). Pendiente de la sección 5 de ese archivo: respaldo documental de los datos propios y autorizaciones J2.
1. **Cliente: confirmar los supuestos de `/diagnostico`** (60 minutos, tres bloques, nota de una página en 3 días hábiles, filtro 50+ empleados, quién dirige la sesión). Confirmar si subió `cyrrus-dist-2026-10-23-v14.zip` (C8–C14, C17, G1, G2, D1–D3 y B1; reemplaza al v13). Si sí: **A2** (reenviar sitemap y pedir indexación de las 14 URLs nuevas, los 2 casos y la guía de cambio), **A5**/**K1** (PageSpeed real) y avisar para publicar el calendario de LinkedIn.
2. Si llegaron: **B3** (agenda y WhatsApp), **B4** (herramienta de correo: enviar el informe del test y la calculadora).
3. Sin insumos: contenido **G3**, luego **C15, C16, C18**, **C6/C7** (C17 y G1 en la Sesión 10; G2 en la 11).
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
| C15 | Integrar ERP y CRM sin middleware | ⬜ | Sesión 2: satélite para respuestas de IA |
| C16 | Costo total de propiedad de un CRM | ⬜ | Sesión 2: satélite para respuestas de IA |
| C17 | Fin de venta de Salesforce CPQ | ✅ | Sesión 10. `/perspectivas/fin-de-venta-salesforce-cpq-opciones`, ES/EN. Fuente: página oficial de Salesforce (consultada 2026-10-23): fin de venta, no fin de vida; **sin fecha publicada**; sucesor Revenue Cloud Advanced; sin migración forzosa. Alternativas con HubSpot (Revenue Hub) y Microsoft Learn. Sin enlaces cruzados desde C5/CRM aún |
| C18 | Gobernanza y deduplicación de datos en el CRM | ⬜ | Sesión 2: satélite para respuestas de IA |

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
| Subir `cyrrus-dist-2026-10-23-v14.zip` (C8–C14, C17, G1, G2, D1–D3 y B1; reemplaza al v13 y al v3 en producción) | 2026-10-21 | ⬜ | A2, A5, K1, publicar I1 |
| Confirmar los supuestos de la sesión de diagnóstico (duración, entregable, filtro, quién la dirige) | 2026-10-21 | ⬜ | Cierre de B1 |
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

---

## Bitácora de sesiones

### Sesión 11 — 2026-10-23 — Qué es RPA (G2)
- **Tareas trabajadas:** G2 ✅. Sin insumos del cliente (siguen bloqueados B3, B4, A4).
- **Hecho:** artículo ES/EN `que-es-rpa-y-cuando-conviene-frente-a-la-ia` (`blog.json`, `blog-data.ts`, `llms.txt`). Verificado en IBM (definición, "guiada por el proceso" vs "guiada por los datos", capa de presentación sin API, límites de escala, casos en seguros/banca/comercio) y Microsoft Learn (desktop flows, aplicaciones antiguas, captura de datos en un ERP). **No se usó:** la página de SAP (403) ni cifras de ahorro (sin fuente primaria). Preguntas y decisiones de la gerencia rotuladas como criterio de Cyrrus.
- **Verificación:** `tsc` limpio; build de 120 rutas; ES y EN con título, H1 y tabla; consola sin errores.
- **Commits:** ver `git log` ("Sesión 11: …").
- **Zip para subir:** `../Cyrrus builds/cyrrus-dist-2026-10-23-v14.zip`. El árbol sigue con el rediseño ajeno sin confirmar; el v13 se conserva.
- **Pendiente / bloqueos nuevos:** enlazar G2 desde la página de tecnologías avanzadas.
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
