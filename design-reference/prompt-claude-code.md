# Prompt para Claude Code: rediseño del sitio Cyrrus

> Antes de usarlo, copia `Home.dc.html`, `Strategy.dc.html`, `Metodo CIRA.dc.html` y `Experiencia.dc.html` a la carpeta `/design-reference` del repo. Son HTML estáticos que se abren en el navegador.

---

Vas a aplicar un rediseño visual a TODO el sitio de Cyrrus (React + Tailwind + Node, repo `Cyrrus-CIRA`). En `/design-reference` hay 4 páginas de referencia en HTML con el diseño final: Home, Planeación Estratégica, Método CIRA y Experiencia. No las copies tal cual. Extrae su sistema visual, conviértelo en tokens de Tailwind y componentes reutilizables, y aplícalo a cada página de `src/pages/**`.

## Reglas
- No cambies textos, rutas, SEO, metadatos, schema ni claves i18n. El contenido sigue saliendo de `src/i18n/locales/**`. Si un componente nuevo necesita texto, agrega claves en es y en en.
- No toques la lógica de negocio: calculadoras, tests, formularios, analytics.
- Antes de crear algo, reutiliza lo que ya existe (`page-hero.tsx`, `components/sections/*`, `components/ui/*`). Refactoriza en lugar de duplicar.
- Trabaja por fases y corre `npm run build` y el lint al terminar cada una.

## 1. Tokens (tailwind.config + CSS base)
- Colores:
  - navy `#0a2c63`
  - blue `#1b6fc2`
  - sky `#3fb6e8`
  - ink `#020818`
  - mist (fondo alterno) `#f2f7fc`
  - slate (texto secundario) `#414a58`
  - line `#e6e8ec`
  - line-2 `#d9dee6`
- Tipografía: Poppins (300–700) para títulos, eyebrows, botones y números. Carlito para el cuerpo de texto.
- Degradado oscuro de marca (heros y secciones oscuras): `radial-gradient(125% 125% at 50% 10%, #1c5c92 0%, #0a2c63 35%, #020818 75%, #000 100%)`.
- Contenedor de 1280px. Padding lateral `clamp(24px,5vw,64px)`. Padding vertical de sección `clamp(80px,10vw,128px)`.
- Escala de títulos:
  - h1 `clamp(42px,5.8vw,80px)` en 700, tracking -0.035em
  - h2 `clamp(30px,3.4vw,46px)` en 700, tracking -0.025em, color navy
  - texto de cuerpo 17–20px con line-height 1.65–1.75

## 2. Componentes base (crear o refactorizar)
- `Eyebrow`: Poppins 14px, 700, uppercase, tracking .06em. Color blue (sky sobre fondo oscuro).
- `ButtonOutline`: pill, borde de 2px, alto mínimo 56px y un punto sky de 8px a la derecha. Variantes clara y oscura. Secundario: pill con borde de 1px y flecha →.
- `SectionHeader`: eyebrow + h2 a la izquierda y texto de apoyo a la derecha, en un grid de 2 columnas que colapsa a 1.
- `NumberedList`: filas con número `01` en blue, separadores de 1px y borde superior navy.
- `CardGrid`: tarjetas sin caja. Borde superior navy de 2px, título y descripción.
- `DarkStatBand`: sección oscura con cifras grandes (88px, peso 300).
- `FAQAccordion`: botón con +/− y separadores. Mantén el schema FAQ si ya existe.
- `LogoMarquee`: carrusel infinito de logos de clientes sin texto. Lista duplicada, `translateX(calc(-50% - gap/2))`, 60s lineal, máscara de desvanecido en los bordes y respeto a `prefers-reduced-motion`.
- `PhotoCaption`: figura con un caption tipo “glass” superpuesto (fondo `rgba(2,8,24,.72)` + blur) o con caption gris debajo.
- Header y footer globales con el estilo de las referencias: logo, nav en Poppins 14px/500, ES/EN y CTA outline.

## 3. Imágenes: solo con propósito
Las fotos de `public/assets/decoracion` se usan para dar contexto, nunca de relleno:
- Hero: layout dividido, con el texto y los CTAs a la izquierda y una foto real a la derecha (bordes redondeados solo arriba, pegada al borde inferior del hero) con caption contextual.
- Pasos o pilares (diagnóstico, prioridades, ejecución…): tarjeta con foto 4:3 encima del número, el título y el texto.
- Sección oscura de diferenciadores: foto a sangre de fondo con overlay `linear-gradient(90deg, rgba(2,8,24,.96), rgba(10,44,99,.9) 45%, rgba(10,44,99,.72))`.
- Beneficios o resultados: foto de tableros/pantallas junto al encabezado, con caption gris.
- Máximo 3–4 fotos por página. Cada foto debe ilustrar el bloque al que acompaña. Usa `loading="lazy"`, `alt` descriptivo y `object-fit: cover`.

## 4. Plantillas por tipo de página
Aplica el patrón de la referencia más parecida:
- Home (`Home.tsx`, `components/sections/*`) → `Home.dc.html`. Mantén el globo cobe y el hero shader.
- Fases y servicios del Método CIRA (`metodo-cira/*`, `intelligence-lab/*`, `presencia-digital/*`, `IntelligenceLab`, `LeadershipAcademy`, `PresenciaDigital`) → `Strategy.dc.html`. Secuencia: hero oscuro dividido, intro con cita, definición, problemas, banda oscura de diferenciadores, beneficios, servicios numerados, quién lidera, FAQ y servicios relacionados.
- `MetodoCira.tsx` → `Metodo CIRA.dc.html` (iniciales CIRA delineadas).
- `Experiencia.tsx`, `CasoDetalle.tsx`, `QuienesSomos.tsx` → `Experiencia.dc.html`.
- Contenido (`Perspectivas`, `ArticuloPerspectiva`, `CursoDetalle`, `SolucionDetalle`, `Diagnostico`, `herramientas/*`): usa los mismos tokens, el mismo hero oscuro compacto y la misma tipografía. El cuerpo de los artículos va a 720px de ancho con estilos `prose` adaptados.
- Legales y 404 (`Privacidad`, `Cookies`, `NotFound`): solo tokens, tipografía y header/footer.

## 5. Calidad
- Responsive desde 360px. Grids con `auto-fit, minmax(min(100%, Npx), 1fr)` y nada de anchos fijos en cajas con texto.
- Contraste AA. Enlaces en blue, y navy en hover.
- Sin regresiones de Lighthouse en SEO ni accesibilidad. Convierte las imágenes a webp si no lo están.
- Al terminar, entrega una lista de páginas migradas, los componentes creados o modificados y lo que quedó pendiente.

Empieza por la fase 1 y 2, luego Home y una página de `metodo-cira/` como piloto, y muéstrame el diff antes de seguir con el resto.
