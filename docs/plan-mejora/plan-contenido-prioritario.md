# Plan de contenido: 11 páginas prioritarias

> ## INSTRUCCIÓN OBLIGATORIA PARA TODO ARTÍCULO (leer antes de redactar cualquiera)
>
> **Cada artículo debe cumplir dos cosas, en este orden de importancia:**
>
> 1. **Primero y sobre todo: la información.** El artículo debe resolver de verdad lo que busca quien llega desde Google (definición, pasos, criterios, ejemplos, errores comunes). Es lo principal y lo que posiciona. No se sacrifica contenido útil por vender.
> 2. **Después: decir que Cyrrus también lo hace y cerrar con un CTA.** En todo artículo, al final (y, si encaja, también en un punto intermedio), debe haber:
>    - **Una mención explícita de que Cyrrus ofrece el servicio del que trata el artículo.** Ejemplo: en el artículo "Qué es un ERP" → "En Cyrrus también hacemos la selección independiente de ERP: evaluamos y comparamos opciones sin sesgo de proveedor." En el de PMO → "En Cyrrus actuamos como PMO externo…". Debe nombrar el servicio concreto, no una frase genérica.
>    - **Un CTA que invite a contactarnos**, con botón o enlace al formulario de contacto (el mismo `ContactCtaButton` / ContactWizard del sitio) y un texto claro, por ejemplo: "¿Quiere que lo hagamos por usted? Agende un diagnóstico con nuestro equipo." El CTA enlaza además a la página de servicio correspondiente.
> 3. Ningún artículo se da por terminado ni se publica sin esa mención del servicio y ese CTA. Verificarlo en la revisión final de cada artículo.
> 4. Sin promesas ni cifras inventadas: la mención de servicio describe lo que Cyrrus realmente hace según la página de servicio.

Fecha: 2026-10-03. Basado en `keywords-ranking.md` (Ubersuggest: MX México, ES España, CO Colombia; vol/mes · SD = dificultad SEO).
Páginas prioritarias: ERP, Estrategia, CRM, PMO, Tecnologías avanzadas, Gestión del cambio, Automatizaciones, HCM, Arquitectura empresarial, Hub de soluciones, Plan de continuidad de negocio.

## Diagnóstico: ¿hay que cambiar la página o basta con artículos?

Longitud actual (palabras en el JSON de español) y veredicto:

| Página | Palabras | Título/H1 | ¿Cambiar contenido? | Motivo |
|---|---|---|---|---|
| ERP | 851 | OK | **No** (ya tiene FAQ "¿Qué es un ERP?") | Basta con artículos |
| CRM | 766 | OK | **No** | Basta con artículos |
| HCM | 721 | OK | **No** (ya tiene FAQ HCM vs nómina) | Basta con artículos |
| Estrategia | 1.569 | OK | **No** | Cubre planeación estratégica (6 menciones); falta el artículo |
| PMO | 1.434 | OK | **No** | Cubre PMO/PMBOK; falta el artículo "qué es una PMO" |
| Hub de soluciones | 898 | OK | **Retoque**: "consultoría tecnológica" aparece 1 vez | Añadir la frase a la intro y una FAQ |
| Gestión del cambio | 1.341 | OK | **Sí, una sección**: no menciona ADKAR, Kotter ni Lewin | La keyword ADKAR (480 · SD 26) no puede ganarse sin ese contenido |
| Tecnologías avanzadas | **314** | OK | **Sí, ampliar** a 800-1.000 | Demasiado fina para competir; RPA (2.900) aparece 2 veces |
| Automatizaciones | **524** | OK | **Sí, ampliar** a 900-1.100 | "Agentes de IA" (880) sin sección que explique qué son ni casos de uso |
| Arquitectura | **464** | OK | **Sí, ampliar** a 800-1.000 | Define arquitectura empresarial en un párrafo; sin capas ni ejemplo |
| Plan de continuidad (taller DRP) | **93** | OK | **Sí, o artículo obligatorio** | Es una ficha de taller de 93 palabras; no puede posicionar "plan de continuidad de negocio" |

**Nombres y títulos:** ninguno de los 11 requiere cambio adicional hoy. Ya están alineados con su keyword.

## Fase A — Cambios de contenido en páginas (5 páginas + 1 retoque)

1. **Tecnologías avanzadas** (`/…/tecnologias-avanzadas`): añadir
   - "RPA, IA y agentes: qué resuelve cada uno" (3 columnas)
   - "Cómo seleccionamos una herramienta de automatización" (criterios: integración, seguridad, costo total, adopción)
   - 2 preguntas FAQ: "¿Qué es RPA?" y "¿Cuándo conviene RPA y cuándo un agente de IA?"
   - Enlace a la página de Automatizaciones y a los artículos 4 y 7.
2. **Automatizaciones** (`/intelligence-lab/automatizaciones-desarrollo`): añadir
   - "Qué es un agente de IA" (definición corta)
   - "Casos de uso" (4 ejemplos genéricos, sin inventar clientes)
   - FAQ: "¿Qué diferencia hay entre un chatbot y un agente de IA?"
   - Enlace cruzado: la selección va a Tecnologías avanzadas; la construcción queda aquí.
3. **Arquitectura** (`/intelligence-lab/arquitectura-de-ia`): añadir
   - "Las tres capas": procesos, datos y sistemas, más la capa de IA encima
   - "Arquitectura de datos" como subsección (390 · SD 23)
   - FAQ: "¿Qué es la arquitectura empresarial?"
4. **Gestión del cambio** (`/metodo-cira/gestion-del-cambio`): añadir sección "Modelos que usamos" con ADKAR, Kotter y Lewin en 2-3 líneas cada uno. **Condición:** confirmar con el equipo que realmente aplican esos modelos; si no, no se incluye y se renuncia a esa keyword.
5. **Plan de continuidad (taller DRP)** (`/leadership-academy/continuidad-de-negocio-drp`): ampliar con "Qué cubre el taller" (BIA, RTO/RPO, plan de recuperación, simulacro) y enlace al artículo 10. El volumen real se capturará con el artículo.
6. **Hub de soluciones**: incluir "consultoría tecnológica" en la intro y una FAQ "¿Qué es una consultoría tecnológica y cuándo conviene?".

Después de editar, `npm run build` y verificar consola sin errores de hidratación (regla del CLAUDE.md).

## Fase B — Artículos a escribir (ordenados por oportunidad)

Existen 4 artículos (transformación digital, consultora estratégica, gobierno de IA, PMO externa). Los siguientes **no existen**. Cada uno enlaza a su página de servicio con anchor descriptivo y debe tener 1.200-1.800 palabras con una tabla o lista práctica, sin cifras inventadas.

| # | Artículo propuesto | Keyword principal | Volumen · SD | Enlaza a | Prioridad |
|---|---|---|---|---|---|
| 1 | Qué es un ERP: guía para elegirlo y no equivocarse | que es un erp | MX 8.100 · 14 / ES 4.400 · 41 / CO 2.900 · 30 | ERP | **Alta** |
| 2 | Qué es una PMO: funciones, tipos y cuándo necesitarla | pmo | MX 3.600 · 23 / ES 2.900 · 19 / CO 1.900 · 15 | PMO | **Alta** |
| 3 | Planeación estratégica: qué es, etapas y ejemplo | planeación estratégica (+ plan estratégico) | MX 3.600 · 34 (+ 2.400 · 42) | Estrategia | **Alta** |
| 4 | Qué es RPA y cuándo conviene frente a la IA | rpa | MX 2.900 · 28 / ES 4.400 · 50 | Tecnologías avanzadas | **Alta** |
| 5 | Qué es un CRM y cómo elegir el correcto | que es un crm | ES 3.600 · 34 / MX 5.400 · 43 | CRM | Media |
| 6 | Resistencia al cambio: causas y cómo superarla | resistencia al cambio | MX 1.600 · 34 | Gestión del cambio | **Alta** |
| 7 | Agentes de IA para empresas: qué son y casos de uso | agentes de ia | MX 880 / CO 880 · 31 / ES 1.300 · 39 | Automatizaciones | **Alta** |
| 8 | Software de nómina vs. HCM: cuál necesita su empresa | software de nómina / que es hcm | MX 590 · 18 / 590 · 18 | HCM | Media |
| 9 | Modelo ADKAR explicado paso a paso | modelo adkar | MX 480 · 26 | Gestión del cambio | Media (depende de A.4) |
| 10 | Plan de continuidad de negocio: pasos y ejemplo | plan de continuidad de negocio | MX 260 · 21 | Taller de continuidad | Media |
| 11 | Arquitectura empresarial: qué es y cómo empezar | arquitectura empresarial | MX 320 · 19 | Arquitectura | Media |
| 12 | Cambio organizacional: qué es, tipos y etapas | cambio organizacional | MX 1.300 · 29 | Gestión del cambio | Media |
| 13 | Mejores ERP para empresas medianas: cómo compararlos | mejores erp | MX 110 · 35 (comercial) | ERP | Baja |
| 14 | Gerencia de proyectos vs. gestión de proyectos | gerencia de proyectos | MX 390 · 11 | PMO | Baja (SD muy bajo) |
| 15 | Mejores CRM: criterios para compararlos | mejores crm | MX 170 · 31 (comercial) | CRM | Baja |
| 16 | Arquitectura de datos: qué es y para qué sirve | arquitectura de datos | MX 390 · 23 | Arquitectura | Baja |
| 17 | Consultoría tecnológica: qué es y cuándo contratarla | consultoría tecnológica | ES 720 · 36 / MX 260 · 23 | Hub de soluciones | Baja |

**Ya publicado y reutilizable:** "Cómo elegir una consultora estratégica confiable" (cubre consultores estratégicos 110 · SD 20) y "Gerencia de proyectos: cuándo contratar una PMO externa". Enlazarlos desde los artículos 2 y 3.

**Aún sin medir** (cuota Ubersuggest agotada el 2026-10-03; medir al reiniciarse): "cuánto cuesta un ERP", "ERP vs Excel", "togaf", "consultoría en ciberseguridad", "ley de inteligencia artificial". Los dos primeros podrían subir a prioridad alta si tienen volumen.

## Calendario sugerido

| Semana | Entregable |
|---|---|
| 1 | Fase A completa (5 páginas + retoque del hub) |
| 2 | Artículo 1 (ERP) |
| 3 | Artículo 2 (PMO) |
| 4 | Artículo 3 (planeación estratégica) |
| 5 | Artículo 4 (RPA) |
| 6 | Artículo 6 (resistencia al cambio) |
| 7 | Artículo 7 (agentes de IA) |
| 8-12 | Artículos 5, 8, 10, 9, 11 (uno por semana) |
| 13+ | Resto, según qué guías ya muestren impresiones en Search Console |

## Reglas de ejecución

- Cada artículo: **mención de que Cyrrus ofrece ese servicio + CTA de contacto al final (ver instrucción obligatoria arriba)**, 1 enlace al servicio con anchor descriptivo, 1 enlace al artículo hermano, FAQ de 3-4 preguntas (con `FAQPage`) y autor visible.
- Cada artículo necesita versión inglesa (el sitio es bilingüe; los 4 existentes la tienen). Alternativa: publicar primero en español y traducir los de mayor volumen.
- Registrar cada artículo en `src/lib/blog-data.ts` y en `blog.json` (es/en); luego `npm run build` y revisar consola (hidratación).
- Medir a los 90 días: impresiones y posición por URL en Search Console; subir de prioridad los artículos que ya están en posiciones 8-20.
- **Nada de esto cuenta para SEO hasta el redeploy** (producción sigue en la versión del 12-sep).

## Riesgos

- **ERP/CRM/PMO:** el volumen es informativo; convierte solo si el artículo lleva a la página de servicio y esa página cierra con un CTA claro.
- **Dominio con DA 13:** keywords con SD ≥ 35 (CRM MX, plan estratégico) pueden tardar o no llegar a la primera página sin enlaces externos; ver `autoridad-externa.md`.
- **Canibalización:** el artículo 3 (planeación estratégica) y la página de Estrategia comparten tema. Mantener el artículo informativo ("qué es, etapas") y la página comercial ("consultoría").

## Estado de la Fase A (aplicada 2026-10-03)

| Página | Antes → ahora (palabras) | Qué se añadió |
|---|---|---|
| Tecnologías avanzadas | 314 → ~790 | Tarjeta "Agentes de IA", "Automatización de procesos y RPA", 5 párrafos (RPA vs IA vs agentes, errores comunes, criterios, alcance), 2 FAQ |
| Automatizaciones | 524 → ~880 | Qué es un agente de IA, casos de uso, cómo se trabaja, cuándo no conviene, 2 FAQ |
| Arquitectura | 464 → ~750 | Las tres capas, arquitectura de datos, señales de necesidad, resultado, 2 FAQ |
| Gestión del cambio | 1.341 → 1.521 | ADKAR, Kotter y Lewin como modelos de referencia, 2 FAQ (resistencia al cambio, modelos) |
| Hub de soluciones | – | "Consultoría tecnológica" en la intro y FAQ "¿Qué es una consultoría tecnológica?" |
| Taller de continuidad | 93 → ~206 | BIA, RTO/RPO y DRP; **sigue necesitando el artículo 10** |

Pendiente de confirmar con el equipo: que se presente ADKAR/Kotter/Lewin como "modelos de referencia" (el texto no afirma que Cyrrus los aplique).
Código: `SolucionDetalle.tsx` acepta un campo opcional `body` (párrafos bajo las tarjetas); `solutions-icons.ts` añade el icono del agente.
La versión en inglés no se tocó.

## Artículos publicados

| # | Artículo | Fecha | URL | Estado |
|---|---|---|---|---|
| 1 | Qué es un ERP y cómo elegirlo: guía práctica | 2026-10-03 | `/perspectivas/que-es-un-erp-guia-para-elegirlo` (+ `/en/…`) | Escrito en ES y EN, ~1.400 palabras, 2 tarjetas de servicio, mención de que Cyrrus ofrece la selección de ERP y CTA al cierre. Pendiente de redeploy. |
| 2 | Qué es una PMO: funciones, tipos y cuándo necesitarla | 2026-10-03 | `/perspectivas/que-es-una-pmo-funciones-tipos-cuando-necesitarla` (+ `/en/…`) | Escrito en ES y EN, ~1.200 palabras, 2 tarjetas de servicio, mención de que Cyrrus actúa como PMO externa y CTA al cierre. Pendiente de redeploy. |
| 3 | Planeación estratégica: qué es, etapas y ejemplo | 2026-10-03 | `/perspectivas/planeacion-estrategica-que-es-etapas-y-ejemplo` (+ `/en/…`) | Escrito en ES y EN, ~1.200 palabras, 2 tarjetas de servicio, ejemplo ilustrativo declarado como hipotético, mención de la consultoría estratégica de Cyrrus y CTA al cierre. Pendiente de redeploy. |
| 4 | Gestión del cambio organizacional: qué es, modelos y plan (con plantilla) | 2026-10-05 | `/perspectivas/gestion-del-cambio-organizacional-que-es-modelos-y-plantilla` (+ `/en/…`) | Escrito en ES y EN, ~1.300 palabras, ADKAR/Kotter/Lewin, plan en 8 pasos, plantilla Excel descargable, caso 3 Castillos enlazado, fuentes Prosci/BCG/Kotter. Enlazado desde la página de servicio. Pendiente de redeploy. |

Nota: el slug en inglés reutiliza el slug en español, como los demás artículos del sitio.
