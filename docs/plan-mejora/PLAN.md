# Plan principal de mejora — cyrruscs.com (Etapa 2: competir y vender)

> **Documento maestro.** Define *qué* hay que hacer y *por qué*. No registra
> avances.
>
> - **Cómo** se hace cada tarea, paso a paso → [`PASO-A-PASO.md`](./PASO-A-PASO.md)
> - **Estado, sesiones y bitácora** → [`PROGRESO.md`](./PROGRESO.md)
> - Etapa 1 (sep–oct 2026, arreglos, arquitectura, contenido base) →
>   [`archivo/PLAN-etapa-1.md`](./archivo/PLAN-etapa-1.md) y
>   [`archivo/PROGRESO-etapa-1.md`](./archivo/PROGRESO-etapa-1.md)
>
> Este archivo solo se edita si cambia el alcance o una decisión.
> Origen: auditoría SEO + IA en producción y datos de Ubersuggest del 2026-10-05.

---

## 1. Objetivo

Que cyrruscs.com **genere tráfico calificado y contactos de venta** compitiendo
con firmas grandes (EY Colombia, Deloitte, PwC, Accenture, KPMG) en los terrenos
donde ellas no pueden ganar, y que Cyrrus sea **la fuente que citan los
buscadores de IA** (ChatGPT, Perplexity, Gemini, AI Overviews) cuando alguien
pregunta cómo elegir un ERP, montar una PMO o gestionar un cambio.

## 2. Punto de partida (2026-10-05)

| Indicador | Valor | Fuente |
|---|---|---|
| Visitas orgánicas/mes | ~8 | Ubersuggest (estimado) |
| Keywords posicionadas | 7, ninguna en top 10 | Ubersuggest |
| Autoridad de dominio (DA) | 13 | Ubersuggest |
| Dominios que enlazan | 66, casi todos directorios spam (PBN) | Ubersuggest |
| Clics orgánicos (3 meses) | 46, casi todos de marca | Search Console, 2026-09-18 |
| Puntuación SEO / Visibilidad IA | ~76 (C) / ~66 (D) | Auditoría `/audit` |
| TBT de laboratorio (Inicio) | 33 ms local; 1,5 s en PageSpeed real antes del último deploy | `scripts/lh.mjs`, Ubersuggest |
| Casos de éxito publicados | 2 (3 Castillos, Morelco) | Sitio |
| Artículos publicados | 8 | Sitio |

Lo técnico está sólido (indexación, hreflang, schema, prerender hidratado).
**Lo que falta es autoridad, contenido de fondo de embudo, una oferta de
entrada y distribución.**

## 3. Estrategia: dónde sí se le puede ganar a EY

**No** competir por "consultoría estratégica" o "transformación digital": EY
tiene décadas de enlaces y gana durante años. **Sí** ganar donde una Big Four
no puede o no quiere estar:

1. **Independencia de proveedor.** EY, Deloitte y Accenture son socios de
   SAP, Oracle y Microsoft. No publican comparativas honestas entre ellos.
   Cyrrus sí puede: es 100% agnóstico. → Fases C y D.
2. **La mediana empresa de LATAM.** Las grandes firmas le hablan a la gran
   corporación. La mediana empresa busca precios, comparativas y guías
   prácticas, y nadie se las da. → Fases B, C y G.
3. **Respuestas que cita la IA.** Los motores de IA citan pasajes con datos,
   definiciones claras y fuentes. Un estudio propio y guías bien estructuradas
   pesan más que la marca. → Fases E y G.
4. **Una persona con nombre y 30 años de trayectoria.** Jackson Bohorquez
   (Oracle, PepsiCo, Covidien, Coremar) es un activo que EY no puede ofrecer
   como persona. → Fase I.

## 4. Decisiones tomadas

| # | Decisión | Motivo |
|---|---|---|
| D1 | El Método CIRA es el *cómo*; la navegación y el contenido se organizan por **servicios y problemas**. | Nadie busca "CIRA" en Google. |
| D2 | Las URLs `/metodo-cira/...` no se cambian (se reevalúa en la fase L). | Google aún está asentando las actuales. |
| D3 | Todo en **"usted"**. | Tono B2B ejecutivo. |
| D4 | **Ninguna cifra sin fuente o caso.** Cifras externas solo si se verificaron en la fuente original; si las fuentes se contradicen, no se publica. | Credibilidad y citabilidad por IA. |
| D5 | Sin "en Colombia" en títulos y metas SEO: el alcance es internacional (15+ países). | Memoria del proyecto: Cyrrus es multinacional. |
| D6 | Presencia Digital se mantiene como **servicio aparte** (decisión del cliente, 2026-10-05). | — |
| D7 | Las métricas internas de Cyrrus (p. ej. el 60% de diagnóstico más rápido) se publican marcadas como "medición interna", sin revelar el detalle. | Decisión del cliente, 2026-10-05. |
| D8 | Cada página de servicio tiene intención **comercial**; cada artículo, **informativa**. Nunca dos páginas para la misma búsqueda. | Evita canibalización (ver caso ERP, 2026-10-05). |
| D9 | Los backlinks spam no se desautorizan salvo acción manual de Google; se vigilan. | Google los ignora solos; el disavow mal hecho resta. |
| D10 | Cliente objetivo: empresas de **50–100+ empleados** que van a comprar software caro. Los artículos nuevos se eligen por **la categoría de software que esa empresa busca** (WMS, SAP, CMMS, RR. HH.…), no por "cómo seleccionar software": esa frase casi no tiene búsquedas en español. | Investigación Ubersuggest 2026-10-21 (Sesión 2). |
| D11 | Los volúmenes se miden **por país en español** (México 2484, Colombia 2170). Sin país, Ubersuggest mezcla búsquedas en inglés y sobrestima (p. ej. "netsuite vs sap" 590 global frente a ~10 en México). | Idem. |
| D14 | **No se publican precios de Cyrrus** (ni rangos por servicio). El precio se da en la propuesta, después de la sesión de diagnóstico. Los artículos solo citan precios de lista de los fabricantes, con su fuente. | Decisión del cliente (2026-10-21). Coherente con el mercado: la competencia casi no los publica. |
| D13 | La oferta de entrada (B1) es **una sesión de diagnóstico gratuita de 60 minutos**, no un servicio de pago a precio fijo. | Decisión del cliente (2026-10-21). Investigación: en México y Colombia casi nadie publica alcance y precio de un diagnóstico (erp.com.mx cobra US$1.500; el resto cotiza "bajo solicitud") y ninguno independiente declara "sin comisiones". Lo gratuito baja la barrera para el decisor; se filtra por tamaño (50+ empleados) y por decisión próxima. |
| D12 | Todo comparativo termina con una tabla **"mejor opción por escenario"** (no solo "depende"), para ser citable por la IA y ayudar a decidir. | Prompts de seguimiento de IA que piden "ranking de mejor a peor" (2026-10-13). |

## 5. Fases

Los IDs (A1, B2…) son los que se usan en `PASO-A-PASO.md` y `PROGRESO.md`.

### Fase A — Despliegue y medición (base de todo lo demás)
Sin producción actualizada y sin medición, todo lo demás es a ciegas.
- **A1** Desplegar el build actual y verificarlo en producción.
- **A2** Search Console: reenviar sitemap, pedir indexación de páginas nuevas, revisión semanal.
- **A3** Bing Webmaster Tools (alimenta a ChatGPT y Copilot).
- **A4** GA4 con conversiones: envío del formulario, clic en WhatsApp, clic en agenda, descargas, inicio y fin de herramientas.
- **A5** PageSpeed Insights real después de cada deploy grande (meta: TBT < 600 ms, LCP < 2,5 s en móvil).
- **A6** Tablero mensual de KPIs (sección 6).
- **A7** Vigilancia mensual de backlinks spam (D9).

### Fase B — Conversión inmediata (vender ya)
Hoy el único llamado es "Agendar conversación", y eso le pide demasiado a alguien que no conoce a Cyrrus.
- **B1** Oferta de entrada: **sesión de diagnóstico gratuita** de 60 minutos (D13), con su propia página `/diagnostico`.
- ~~**B2** Rangos de precio orientativos por servicio.~~ **Descartada (D14).**
- **B3** **Agenda directa** (Calendly o Google Calendar) y **botón de WhatsApp**.
- **B4** Secuencia de correos para quien deja sus datos (herramientas, plantillas).
- **B5** Revisión del formulario de contacto: pasos, campos y mensaje de confirmación con tiempo de respuesta.

### Fase C — Comparativas agnósticas (fondo de embudo)
El contenido que busca alguien a punto de comprar, y que EY no puede escribir.
- **C1** Mejores ERP para medianas empresas (2026).
- **C2** SAP Business One vs Oracle NetSuite vs Microsoft Dynamics 365 Business Central.
- **C3** Odoo vs SAP Business One.
- **C4** Cuánto cuesta implementar un ERP (rangos y de qué depende).
- **C5** Salesforce vs HubSpot vs Dynamics 365 (CRM).
- **C6** Mejores CRM: criterios para compararlos.
- **C7** ERP vs Excel: cuándo dar el salto.

**Subfase C-bis — categorías de software caro para empresas de 50–100+
empleados** (investigación Ubersuggest del 2026-10-21; datos y orden en
`PASO-A-PASO.md`). Se publica en este orden:
- **C8** Reforzar C5 (Salesforce vs HubSpot vs Dynamics 365): sección "Si su empresa tiene 100+ empleados", tabla "mejor opción por escenario" y CTA al diagnóstico.
- **C9** Qué es un sistema WMS y cómo elegir uno (incluye WMS vs ERP).
- **C10** Cuánto cuesta SAP Business One: licencias, implementación y costos ocultos.
- **C11** Cómo elegir un software de mantenimiento (CMMS/EAM).
- **C12** Migrar de SAP ECC a S/4HANA: plazos, costos y alternativas.
- **C13** Software de RR. HH. y nómina para empresas de más de 100 empleados.
- **C14** Qué es un software MES y cuándo lo necesita una planta.
- **C15–C18** Satélites del CRM para compradores grandes (los que preguntan a la IA): integración ERP–CRM sin middleware, costo total de propiedad de un CRM, fin de venta de Salesforce CPQ, gobernanza y deduplicación de datos en el CRM. Sin volumen medible en Ubersuggest; se miden con los prompts de seguimiento (KPI de menciones en IA).

### Fase D — Herramientas que capturan contactos
Consiguen enlaces de forma natural y entregan datos de contacto.
- **D1** Test "¿Está su empresa lista para un ERP?" (10 preguntas, resultado inmediato, informe por correo).
- **D2** Calculadora del costo total de un ERP a 5 años.
- **D3** Plantilla de RFP para seleccionar ERP (Excel/Word).
- **D4** Plantilla del plan de gestión del cambio. ✅ (2026-10-05)
- **D5** Test de preparación para el cambio (ADKAR por grupo).

### Fase E — Estudio propio de datos
Lo que hace EY y lo que más citan la prensa y la IA.
- **E1** Diseño del "Estudio de madurez en transformación digital de la mediana empresa en LATAM 2026".
- **E2** Recolección (100–200 respuestas por LinkedIn y base de clientes).
- **E3** Página del estudio + PDF descargable + gráficos.
- **E4** Difusión: nota de prensa, medios, LinkedIn, enlaces desde artículos.

### Fase F — Autoridad externa y entidad
- **F1** Clutch con 3–5 reseñas verificadas (lo que más pesa en consultoría).
- **F2** Reseñas en Google Business Profile (Barranquilla y Bogotá) y URL de Maps en `sameAs`.
- **F3** Crunchbase.
- **F4** Wikidata.
- **F5** Directorios: Sortlist, GoodFirms, The Manifest, Cámara de Comercio, ProColombia, gremios.
- **F6** Universidades: cátedra de Jackson, eventos en la Simón Bolívar y otros.
- **F7** Columnas de opinión de Jackson en medios de negocios.
- **F8** Cada perfil nuevo se añade al `sameAs` y a `llms.txt`.

### Fase G — Contenido con volumen (2 artículos por semana, 90 días)
Guías informativas que traen tráfico y enlazan a su servicio y a un caso.
Lista priorizada por volumen y dificultad en `PASO-A-PASO.md` (G1–G16).

### Fase H — Páginas por industria con caso real
Solo donde exista un caso publicado detrás; sin caso quedan como páginas vacías.
- **H1** Transformación digital para empresas de alimentos (3 Castillos).
- **H2** Infraestructura y construcción (Morelco).
- **H3+** Cada industria nueva cuando tenga su caso.

### Fase I — Marca personal de Jackson y distribución
El canal que vende primero mientras el SEO madura.
- **I1** Calendario de LinkedIn: cada artículo se convierte en 3–4 publicaciones.
- **I2** Videos cortos para YouTube a partir de cada guía (con transcripción en el sitio).
- **I3** Newsletter de LinkedIn mensual.
- **I4** Perfil de LinkedIn de Jackson y página de empresa alineados con el sitio.

### Fase J — Prueba social y confianza (heredado de la etapa 1)
- **J1** Completar los casos: nombre del CIO de 3 Castillos, ERP/CRM elegidos e implementador, cargo de Fernando Gutiérrez.
- **J2** Autorización escrita de 3 Castillos y Morelco.
- **J3** Tercer caso de éxito (y siguientes).
- **J4** Número de proyectos y clientes con fecha de corte.
- **J5** Daniel Bohorquez y equipo (dejado para después por decisión del cliente).
- **J6** Historia de la empresa.
- **J7** Política de independencia de proveedor (página).
- **J8** Revisión legal de la política de privacidad (Ley 1581 de 2012).
- **J9** Leadership Academy: ficha completa por taller e indexación.

### Fase K — Rendimiento y técnico
- **K1** LCP móvil < 2,5 s en el Inicio (medido en producción).
- **K2** Portada horizontal (1200×630) para el artículo de ERP y revisión de portadas verticales.
- **K3** Decidir qué hacer con `cyrruscs-dist/` versionado en el repo.
- **K4** Profundidad de Intelligence Lab y sus 3 subpáginas.

### Fase L — Revisión trimestral
- **L1** Re-auditoría (`/audit`) + Ubersuggest + Search Console a los 90 días; ajustar prioridades.
- **L2** Reevaluar D2 (URLs) y la estrategia de keywords con datos reales.

## 6. KPIs y metas

| KPI | Base (oct-2026) | 90 días | 6 meses | 12 meses |
|---|---|---|---|---|
| Clics orgánicos/mes (Search Console) | ~15 (46 en 3 meses) | 150 | 600 | 2.000 |
| Keywords en top 10 | 0 | 10 | 40 | 100 |
| Dominios de referencia reales (sin spam) | ~0 | 10 | 25 | 50 |
| Reseñas verificadas (Clutch + Google) | 0 | 5 | 10 | 20 |
| Artículos + comparativas publicados | 8 | 30 | 50 | 80 |
| Herramientas / descargables | 1 | 3 | 4 | 5 |
| Casos de éxito publicados | 2 | 3 | 5 | 8 |
| Contactos calificados/mes (formulario + WhatsApp + agenda) | medir en A4 | definir tras 1 mes | — | — |
| Menciones en respuestas de IA (prompts de seguimiento) | medir | 3 de 20 prompts | 8 de 20 | 12 de 20 |
| Lighthouse móvil Inicio / TBT PageSpeed | 85 / 1,5 s | ≥ 90 / < 600 ms | ≥ 90 / < 300 ms | ≥ 90 / < 300 ms |

## 7. Expectativa realista

- **Este mes:** B (oferta, agenda, WhatsApp) e I (LinkedIn) pueden traer
  conversaciones de venta sin esperar al SEO.
- **3–6 meses:** C, D, F y G empiezan a traer tráfico orgánico real.
- **6–12 meses:** liderazgo en búsquedas de nicho ("qué ERP elegir",
  comparativas, PMO, gestión del cambio) y presencia en respuestas de IA.
- Ganarle a EY por "consultoría estratégica" **no** es la meta.

## 8. Reglas de trabajo en cada tarea

Antes de tocar código, leer `CLAUDE.md` en la raíz. Lo que más se rompe:
hidratación (texto adyacente en JSX, shorthands CSS en `style`, contenido
diferido sin `isPrerender()`, rutas lazy fuera de `PAGES` y de
`route-meta.json`), imágenes sin `<Img>`, `transition-all`, copy solo en un
idioma. Cada tarea se verifica con `npm run build`, el servidor de `dist/` y la
consola limpia en ES y EN. El detalle por tarea está en `PASO-A-PASO.md`.

## 9. Insumos que debe entregar el cliente

| Insumo | Bloquea |
|---|---|
| Subir el zip a producción (cada vez que se genera) | A1 y toda medición |
| Acceso a GA4 (o un usuario con permiso de edición) | A4, A6 |
| ~~Alcance, duración y precio del diagnóstico~~ (resuelto: sesión gratuita; confirmar los supuestos de la página, ver PROGRESO Sesión 7) | B1 |
| ~~Rangos de precio por servicio~~ (descartado, D14) | B2 |
| Enlace de agenda (Calendly/Google) y número de WhatsApp de ventas | B3 |
| Herramienta de correo para la secuencia (o aprobar n8n/Brevo) | B4, D1 |
| Difundir la encuesta del estudio (LinkedIn, clientes) | E2 |
| Crear cuentas: Clutch, Crunchbase, directorios; pedir reseñas a clientes | F1–F5 |
| Contactos en universidades y medios | F6, F7 |
| Datos pendientes de casos, autorización escrita, tercer caso | J1–J3 |
| Número de proyectos y clientes; Daniel y equipo; historia | J4–J6 |
| Revisión legal de la política de privacidad | J8 |
| Detalle de talleres | J9 |
