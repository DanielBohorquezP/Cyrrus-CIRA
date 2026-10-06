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

**Última sesión cerrada:** Sesión 0 (2026-10-05, línea base).

**Próxima: Sesión 1.** Orden sugerido:
1. Confirmar con el cliente si subió `cyrrus-dist-2026-10-05-v2.zip` → si sí, **A1** + **A5**.
2. **A2** (sitemap + pedir indexación de casos y guía de gestión del cambio).
3. **C1** "Mejores ERP para medianas empresas 2026" (o **C4** si Ubersuggest
   muestra más volumen para "cuánto cuesta un ERP").
4. Si el cliente ya entregó los datos de B1/B3: empezar **B1** y **B3**.

**Hoja de ruta de las siguientes sesiones** (se ajusta al cerrar cada una):

| Sesión | Foco | Tareas |
|---|---|---|
| 1 | Despliegue + primera comparativa | A1, A2, A5, C1 |
| 2 | Vender ya | B1, B3, B5 (con insumos del cliente) |
| 3 | Comparativas | C2, C4, I1 de las piezas nuevas |
| 4 | Primera herramienta | D1 + B4 |
| 5 | Contenido con volumen | G1, G2 |
| 6 | Comparativas CRM + contenido | C5, G3 |
| 7 | Herramienta de costo | D2, C7 |
| 8 | Contenido | G4, G5 |
| 9 | Estudio propio (diseño) | E1 + G6 |
| 10 | Industrias | H1, H2 |
| 11–14 | Contenido G7–G16 a 2 por sesión; E3 cuando haya respuestas | — |
| 15 (≈ 90 días) | Revisión trimestral | L1 |

Las tareas **[Cliente]** de F, I y J se avanzan en paralelo; cada sesión revisa
qué llegó y lo integra (F8, J1, J3…).

---

## Estado por tarea

### Fase A — Despliegue y medición
| ID | Tarea | Estado | Notas |
|---|---|---|---|
| A1 | Desplegar y verificar en producción | ⛔ | Zip listo: `../Cyrrus builds/cyrrus-dist-2026-10-05-v2.zip`. Falta que el cliente lo suba |
| A2 | Search Console: sitemap, indexación, revisión semanal | 🟡 | Acceso desde 2026-09-18; falta reenviar sitemap tras A1 y la revisión semanal |
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
| C1 | Mejores ERP para medianas empresas | ⬜ | |
| C2 | SAP B1 vs NetSuite vs Dynamics 365 BC | ⬜ | |
| C3 | Odoo vs SAP Business One | ⬜ | |
| C4 | Cuánto cuesta implementar un ERP | ⬜ | Medir keyword primero |
| C5 | Salesforce vs HubSpot vs Dynamics 365 | ⬜ | |
| C6 | Mejores CRM | ⬜ | |
| C7 | ERP vs Excel | ⬜ | Medir keyword primero |

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
| K1 | LCP móvil < 2,5 s en producción | ⬜ | Lab local: LCP 3,39 s (simulado); medir en PageSpeed tras A1 |
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
| Subir `cyrrus-dist-2026-10-05-v2.zip` | 2026-10-05 | ⬜ | A1, A2, A5, K1 |
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

---

## Bitácora de sesiones

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
