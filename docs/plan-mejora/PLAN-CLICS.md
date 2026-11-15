# Plan de clics — Colombia, México y EE. UU.

> **Prioridad 0 (decidida por el cliente el 2026-11-14):** va antes que cualquier
> otra tarea pendiente del plan (G4–G16, C6/C7, D5, E, H, etc.). Las tareas
> bloqueadas por el cliente (B3, B4, A4, J) siguen esperando igual.
>
> - Estado y bitácora → [`PROGRESO.md`](./PROGRESO.md) (fase **M**)
> - Datos de partida → sección 1 de este documento
> - Orden de trabajo → sección 4

## 0. El problema

Search Console (2026-05-18 a 2026-11-12): **22.825 impresiones y 96 clics**.
La gente casi no ve el sitio en los resultados y, cuando lo ve, rara vez está
en las primeras posiciones. El objetivo es **más clics de personas reales en
búsquedas sin la marca**, en tres países, con **Colombia primero**.

**Meta de trabajo** (es una meta, no un pronóstico; se revisa en cada medición):
que cada país tenga clics de búsquedas sin marca, hoy cero en los tres.

## 1. Datos de partida (Search Console API, 6 meses)

Se separan tres tipos de búsqueda para no engañarnos con el total:

| Tipo | Qué es | Impresiones | Clics |
|---|---|---|---|
| Marca | "cyrrus", "cycontrol"… | 1.967 | 46 |
| Con forma de prompt | "compara hubspot con… debes proporcionar un ranking", "qué dicen G2 y Capterra…", 10+ palabras. Parecen automáticas (herramientas que lanzan prompts a Google) | 6.235 | 0 |
| **Humanas sin marca** | las que importan | **9.284** | **6** |

De las humanas sin marca, **6.874 impresiones están en posición > 20** (página 3
o peor) y solo ~1.270 en el top 10. El problema es de **posición**, no del texto
del resultado.

**Por país (solo búsquedas humanas sin marca):**

| País | Impresiones | Clics | Qué se ve |
|---|---|---|---|
| **Colombia** | **301** | **0** | Volumen muy bajo. "pmo que es" (pos. 10,5; ~50 imp. y otras ~35 en variantes), "gobernanza de ia" (19), "erp y wms" (9), "inteligencia artificial y arquitectura empresarial" (9,9), "cmms/eam" (6,6), "consulting seo" (36,6), "consultor geo" (36,6). Los 26 clics de Colombia son todos de la marca |
| México | 607 | 0 | "gobernanza de ia" (24), "modelo de madurez de gobernanza de ia" (10,7), "salesforce crm vs hubspot para empresas mexicanas medianas" (5,7), "wms" (27), "servicios de testing de erp" (24), "precio de sap business one" (61–75) |
| EE. UU. | 1.948 | 0 | "strategic planning" (26), "erp implementation cost" y variantes (66–89), "pmo" (49), "what is a pmo" (27), "erp for midsize companies" (13,6) |

**Lectura honesta sobre Colombia.** Con los datos de hoy, la demanda medida en
español para Colombia es pequeña (301 impresiones humanas en 6 meses; la
investigación de Ubersuggest de octubre ya mostraba 0–20 búsquedas/mes en casi
todas las keywords de Colombia). Esto no significa que no valga la pena: significa que
(1) cada búsqueda cuenta y hay que ganarlas todas, (2) hay que **medir qué buscan
de verdad las empresas colombianas** antes de producir más (tarea M2) y (3) buena
parte del tráfico de Colombia vendrá de canales que no son Google (LinkedIn,
referidos), que ya están en el plan (I1).

## 2. Reglas de este plan

1. **Medir solo lo humano.** Todo reporte separa marca, prompts automáticos y humanas.
2. **Nada inventado** (regla del cliente). Cifras de mercado colombiano o normas
   (p. ej. facturación electrónica) solo con fuente primaria abierta y citada con fecha.
3. **Sin "Colombia" en títulos, metas ni H1** (decisión del cliente del 2026-09-22:
   alcance internacional). Colombia se trabaja con **el vocabulario que usan las
   empresas colombianas** y su contexto en el cuerpo (pesos, normativa con fuente),
   no con el país en el título. *Si el cliente quiere cambiar esta regla ahora que
   Colombia es el foco, se anota aquí y se aplica en M1/M2.*
4. **Nada cuenta hasta que Google lo vea:** todo depende de subir el zip y pedir
   indexación a mano (punto 0a de `PROGRESO.md`).

## 3. Tareas (fase M)

### M0 — Medir bien (antes de tocar nada)
- Crear `scripts/gsc-report.mjs` (reutiliza la cuenta de servicio de
  `reference_search-console-api`): rendimiento por país, separando marca / prompts /
  humanas; páginas y consultas con posición 5–20; guarda `docs/plan-mejora/datos/gsc-AAAA-MM-DD.md`.
- Línea base: la tabla de la sección 1.
- **Hecho cuando:** un comando produce el reporte mensual en menos de un minuto.

### M1 — Colombia: ganar las búsquedas que ya casi ganamos
Páginas que ya aparecen en Colombia cerca del top 10 o con búsquedas humanas:

| Búsqueda (Colombia) | Pos. | Página | Acción |
|---|---|---|---|
| pmo que es / que es una pmo / que es un pmo / que es pmo | 8–11 | `/perspectivas/que-es-una-pmo-funciones-tipos-cuando-necesitarla` | Título y H1 con "qué es una PMO"; respuesta de 2–3 líneas arriba; H2 con las variantes ("qué es una PMO en proyectos"); enlaces internos desde servicio de PMO y desde el artículo de ERP con PMO |
| gobernanza de ia | 19 | `/intelligence-lab/gobierno-de-ia` y `/perspectivas/que-es-gobernanza-de-ia-y-que-marcos-usar` | Decidir cuál es la página objetivo (hoy compiten); la guía debe responder "qué es la gobernanza de IA" en la primera pantalla y enlazar al servicio |
| erp y wms / erp wms / wms erp / que es wms y erp | 7–21 | `/perspectivas/sistema-wms-que-es-y-como-elegir` | Sección "WMS vs ERP" visible con ese título; ajustar título para "WMS" |
| inteligencia artificial y arquitectura empresarial | 9,9 | Gobierno de IA / Estrategia de IA | Revisar si hay una sección que lo responda; si no, una pregunta en la FAQ |
| cmms/eam | 6,6 | `/perspectivas/software-cmms-eam-como-elegir` | Título con "CMMS/EAM"; respuesta directa arriba |
| consulting seo / consultor geo | 36,6 | `/presencia-digital/seo` | Revisar H1 y primera pantalla para "consultoría SEO" y "GEO"; páginas de servicio son comerciales, de las pocas con intención de compra |

**Hecho cuando:** las seis filas aplicadas, build verde y las URLs reindexadas.

### M2 — Colombia: ¿qué buscan de verdad?
- Ubersuggest, ubicación Colombia (`location_suggest`): volumen real para ~40
  términos de los servicios (ERP, CRM, PMO, WMS, IA, ciberseguridad, continuidad,
  estrategia de TI, SEO/GEO) en el vocabulario colombiano.
- Dejar un cuadro "término → volumen CO → dificultad → página que lo cubre / falta".
- Decidir **qué páginas o guías nuevas** valen la pena para Colombia y cuáles no.
  Si se mencionan normas o requisitos locales (p. ej. DIAN, Ley 1581), solo con fuente primaria abierta.
- **Hecho cuando:** hay un cuadro con volumen y una lista corta (≤ 5) de contenido nuevo, o la conclusión de que no hay demanda.

### M3 — Clics donde ya estamos en el top 10 (snippet)
Para las búsquedas humanas con posición ≤ 10 y 0 clics, reescribir título y meta
para que digan exactamente lo que la persona busca y para qué sirve la página:
"salesforce crm vs hubspot para empresas mexicanas medianas" (5,7, MX),
"modelo de madurez de gobernanza de ia" (10,7 MX / 9,5 total), "erp software quote" (8,1),
"what erp system is best for mid-size manufacturers" (3,8), "vendor criteria for eam and cmms software" (4,8),
"erp for midsize companies" (8,6), "pmo que es" (10,5).
- Reglas: título ≤ 60 caracteres, meta ≤ 155, sin país, la palabra de la búsqueda al principio.
- **Hecho cuando:** títulos y metas aplicados y `route-meta.json` sincronizado.

### M4 — México: las búsquedas humanas que tiene
- "gobernanza de ia" (24) y "modelo de madurez de gobernanza de ia" (10,7): reforzar la guía de madurez (G20) con respuesta directa y enlazarla desde el servicio.
- "precio / costo de sap business one" (61–75): mejorar el artículo C10 con una sección "cuánto cuesta" que responda lo que SAP sí publica y diga lo que no publica (ya lo dice; hacerlo visible en el título y la intro).
- "servicios de testing / QA de ERP" (24 y 61): ver si Cyrrus presta ese servicio (**decisión del cliente**); si sí, una sección en la página de ERP/PMO.
- "wms" (27): ver M1.
- **Hecho cuando:** las cuatro filas resueltas o descartadas con motivo.

### M5 — EE. UU.: reescribir el artículo que más impresiones tiene
- `/en/perspectivas/cuanto-cuesta-implementar-un-erp`: 700 imp. en pos. 72 con un cluster de ~15 variantes (erp implementation cost, cost of erp implementation, erp price/pricing/cost…). Reescritura EN completa (auditoría #12): título con "ERP implementation cost", respuesta con rangos **solo si tienen fuente primaria**, sección de cálculo y enlace a la calculadora. Slug en inglés si el cliente decide el mercado (hoy pendiente).
- "strategic planning" (26) y "what is a pmo" (27): secciones "respuesta primero" ya hechas en la Sesión 18; revisar tras 30 días.
- **Meta realista:** pasar de la pos. 70–89 a la 30–40 no da clics; entrar al top 20 depende de enlaces (M8). Esta tarea se hace **una sola vez**.

### M6 — Enlaces internos hacia las páginas objetivo
- La comparativa de CRM es la página con más autoridad y tráfico (pos. 5–6, México 3.451 imp.); casi todo su tráfico son los prompts automáticos, pero igual **reparte autoridad**: añadirle enlaces a PMO, WMS, gobernanza de IA y costo de ERP donde tengan sentido.
- Enlazar el artículo de ERP con PMO desde la página de PMO y la de ERP (pendiente de la Sesión 19).
- Revisar que toda página de M1/M3/M4/M5 reciba al menos 3 enlaces internos de contexto.
- **Hecho cuando:** lista de enlaces añadidos por página y build verde.

### M7 — Medir el efecto (30 días después de indexar)
- Repetir M0. Comparar contra la línea base, por país y por página, solo con búsquedas humanas.
- Decidir qué se repite y qué se descarta. Registrar en `PROGRESO.md` › Métricas.

### M8 — Autoridad y enlaces (ÚLTIMO, por decisión del cliente)
Es lo que más mueve las posiciones, pero requiere tiempo y insumos del cliente. Se
avanza en paralelo desde el inicio solo con lo que pide el cliente, sin bloquear M0–M7:
1. **F2:** ficha de Google Business Profile y reseñas en Google (la más rápida y la que más ayuda a Colombia).
2. **F1:** perfil en Clutch con reseñas.
3. **F3, F5:** Crunchbase y directorios.
4. **F4:** Wikidata (Claude prepara los datos).
5. **F6, F7:** universidades y columnas en medios.
6. **A7:** vigilar los backlinks spam (66 dominios, casi todos PBN).

## 4. Orden de trabajo

| Sesión | Tareas | Depende de |
|---|---|---|
| 20 | **M0**, **M1**, **M2** (investigación) | Nada; el cliente sube el zip en paralelo |
| 21 | **M3**, **M6** | M0 |
| 22 | **M4** | M2 (decisión sobre qué servicios presta Cyrrus) |
| 23 | **M5** | Decisión de mercado (slug EN) |
| ≈ 30 días tras indexar | **M7** | Zip subido e indexación pedida |
| En paralelo | **M8** | Cliente |

## 5. Qué necesito del cliente (corto)

1. Subir el zip y pedir indexación a mano (sin esto, nada cambia en Google).
2. Confirmar si, ahora que Colombia es el foco, se mantiene la regla "sin Colombia en títulos" (sección 2, punto 3).
3. Confirmar si Cyrrus presta pruebas/QA de ERP (M4).
4. Para M8: abrir la ficha de Google Business Profile (F2) y empezar a pedir reseñas.
