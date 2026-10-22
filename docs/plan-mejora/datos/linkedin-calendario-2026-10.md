# Calendario de LinkedIn — artículos C9–C12 (octubre de 2026)

> Tarea I1 del plan. Voz: skill `linkedin-cyrrus` (CEO/CFO/COO, de igual a igual).
> **[Cliente]** publica de martes a jueves, 7–9 a. m., **después de subir el v4**
> (si no, el enlace da 404). El enlace va en el **primer comentario**, no en el
> cuerpo del post. Dos publicaciones por artículo; la segunda, ocho a diez días
> después de la primera. Todas las cifras y fechas salen de los artículos y de
> sus fuentes oficiales.
>
> Pendiente: publicaciones para C1–C3 (la siguiente sesión de I1). Sesión 5 añadió C13, C14, C4 y C5/C8.

## Orden sugerido

| Semana | Día | Artículo | Post |
|---|---|---|---|
| 1 | Martes | C12 — SAP ECC a S/4HANA | A (urgencia de calendario) |
| 1 | Jueves | C10 — Cuánto cuesta SAP Business One | A |
| 2 | Martes | C9 — Sistema WMS | A |
| 2 | Jueves | C11 — CMMS y EAM | A |
| 3 | Martes | C12 | B (alternativas) |
| 3 | Jueves | C10 | B |
| 4 | Martes | C9 | B |
| 4 | Jueves | C11 | B |

Primer comentario de cada post: título del artículo + enlace
(`https://cyrruscs.com/perspectivas/<slug>`).

---

## C12 — Migrar de SAP ECC a S/4HANA
Slug: `migrar-sap-ecc-a-s4hana-plazos-costos-alternativas`

### Post A — urgencia (≈190 palabras)

31 de diciembre de 2027.

Esa es la fecha en que SAP termina el mantenimiento estándar de ECC. Hoy faltan poco más de catorce meses.

No es una fecha técnica. Es una decisión de directorio.

Si tu empresa opera SAP ECC, hay tres cosas que probablemente nadie te ha puesto en una sola hoja:

→ El mantenimiento extendido existe hasta el 31 de diciembre de 2030, con un recargo de dos puntos porcentuales
→ Después de 2030, SAP no recomienda el mantenimiento específico del cliente como modelo de largo plazo para sistemas críticos
→ Con bases de datos de terceros, convertir el sistema solo es posible hasta fin de 2030

El sistema no se apaga el 1 de enero de 2028.

Lo que se acaba es el margen para decidir con calma.

Esperar no es neutral. Reduce tus opciones justo cuando los equipos y los proveedores estén más saturados.

¿Tu junta ya tiene una ruta definida para ECC, o todavía es un tema "de TI"?

### Post B — alternativas (≈200 palabras)

"Migrar a S/4HANA" no es la única respuesta.

Es una de cuatro.

La mayoría de las empresas con ECC discute la herramienta antes de decidir la ruta. Al revés.

Las rutas reales:

→ Convertir el sistema actual, con su historia y su configuración
→ Implementar desde cero y migrar solo lo necesario
→ Extender el mantenimiento y decidir después
→ Evaluar un ERP distinto

Cada una tiene un costo que no aparece en la cotización: el tiempo de tu equipo, la capacitación, el cambio.

Y la que más se subestima: cada personalización que decides conservar se paga en la migración y en cada actualización futura.

El error más caro de estos proyectos no es técnico. Es ignorar a las personas que van a usar el sistema.

La tecnología no compensa la ambigüedad. La expone.

¿Cuántas personalizaciones de tu ECC podrías justificar hoy ante tu CFO, una por una?

---

## C10 — Cuánto cuesta SAP Business One
Slug: `cuanto-cuesta-sap-business-one`

### Post A — el precio que no existe (≈180 palabras)

¿Cuánto cuesta SAP Business One?

Pregunta simple. Respuesta incómoda.

SAP no publica un precio de lista. Se compra a través de socios que cotizan según alcance, región y modelo de despliegue.

Entonces, ¿de dónde salen las cifras que circulan en internet?

De estimaciones de socios y revendedores. Distintas entre sí. Envejecen rápido.

Úsalas como orden de magnitud. Nunca como presupuesto.

Lo que sí mueve el precio, y está en la guía de licencias de SAP:

+ El tipo de usuario: Professional, Limited o Starter Package (máximo cinco usuarios)
+ La base de datos: SAP HANA o SQL Server
+ El alcance de la implementación y las integraciones
+ El soporte, y las horas internas de tu equipo

Una cotización barata con un alcance angosto suele terminar en órdenes de cambio.

¿Tienes una propuesta de ERP sobre la mesa que nadie te ha desglosado a cinco años?

### Post B — compara bloques, no totales (≈190 palabras)

Tres propuestas de ERP. Tres totales distintos.

¿Cuál es la más barata?

No lo sabes todavía.

Un total no se compara. Se compara lo que hay dentro.

Pídeles a tres socios la misma propuesta, con el mismo alcance, y exige el desglose:

- Licencias o suscripción, por tipo de usuario
- Infraestructura y quién la mantiene
- Horas de implementación por actividad
- Soporte y condiciones de renovación
- Dedicación que se espera de tu equipo

Después, calcula a cinco años.

La licencia suele ser la partida más visible. No suele ser la más grande.

El costo que casi nadie presupuesta es el tiempo de tus propias personas clave.

¿Tu comité de inversión ve el costo a cinco años, o solo el del primer año?

---

## C9 — Sistema WMS
Slug: `sistema-wms-que-es-y-como-elegir`

### Post A — inventario que no coincide (≈180 palabras)

El sistema dice que hay 40 unidades.

En la bodega hay 12.

Ese día perdiste una venta, inmovilizaste capital y alguien hizo horas extra para entender qué pasó.

Y no aparece en una sola línea del estado de resultados.

Un WMS es el sistema que decide y registra el trabajo físico de la bodega: qué llega, dónde va, qué se saca, en qué orden.

El ERP es el registro de la empresa.
El WMS es la ejecución en el piso.

No son excluyentes. Muchos ERP traen su módulo de bodega.

La pregunta no es qué WMS comprar.

Es si tu ERP ya alcanza.

Señales de que no: diferencias frecuentes entre sistema y físico, conteos generales que paran la operación, pedidos que salen incompletos aunque el sistema mostraba existencias.

¿Cuánto le cuesta a tu margen la diferencia entre el inventario del sistema y el de tu bodega?

### Post B — las cuatro preguntas (≈190 palabras)

Antes de pedir cotizaciones de un WMS, tu gerencia debería poder responder cuatro preguntas.

Casi nadie puede.

→ ¿Cuál es el problema en términos de negocio? Ventas perdidas, capital inmovilizado, costo por pedido o incumplimientos de entrega
→ ¿Cuál es el costo total a cinco años? Licencias, implementación, integración con el ERP, dispositivos y mantenimiento
→ ¿Quién sostiene el sistema después del go-live?
→ ¿Qué pasa con la operación el día del cambio?

Un WMS bien elegido pero mal adoptado no corrige el inventario.

Cambia la forma de trabajar de operarios y supervisores. Eso es gestión del cambio, no software.

Algunos fabricantes ya permiten operar la bodega junto a un ERP de otro proveedor.

Bodega y ERP pueden decidirse por separado.

¿Quién en tu empresa es dueño de esa decisión: operaciones, finanzas o TI?

---

## C11 — Software CMMS y EAM
Slug: `software-cmms-eam-como-elegir`

### Post A — el costo de la parada (≈180 palabras)

Una parada no planificada puede costar más que el software que habría ayudado a evitarla.

Y casi nadie sabe cuánto cuesta una hora de parada en sus líneas críticas.

Antes de elegir un sistema de mantenimiento, mide lo que hoy no ves:

+ Costo de una hora de parada no planificada
+ Proporción de trabajo preventivo frente a correctivo
+ Gasto en repuestos de emergencia
+ Equipos críticos sin historial confiable

Con esos cuatro datos, el caso de negocio se escribe solo.

Y te sirve para medir el resultado un año después.

Sin ellos, estás comprando funciones.

¿Sabes hoy, sin preguntarle a nadie, cuánto te cuesta una hora de parada en tu línea más crítica?

### Post B — CMMS o EAM (≈190 palabras)

CMMS y EAM no son lo mismo.

Aunque muchos proveedores los usen como sinónimos.

→ CMMS: órdenes de trabajo, preventivo, repuestos, historial. Lo usan mantenimiento y producción
→ EAM: todo eso, más el ciclo de vida completo del activo: planeación de capital, riesgo y desempeño. Lo usan también finanzas y dirección

La diferencia no está en las funciones.

Está en la pregunta que hace tu dirección.

¿El problema es de ejecución? Órdenes en papel, repuestos sin control, mantenimiento reactivo. Probablemente basta un CMMS.

¿El problema es de portafolio? Cuándo reemplazar un activo, cuánto invertir en cada planta, qué riesgo aceptar. Ahí se justifica un EAM.

Pagar funciones de EAM para resolver un problema de CMMS es sobrepagar.

Lo contrario es quedarse corto.

¿Tu pregunta de hoy es de ejecución o de portafolio?

---

## Añadidas en la Sesión 5

Orden sugerido: semanas 5 y 6, martes y jueves, tras publicar las semanas 1–4.

| Semana | Día | Artículo |
|---|---|---|
| 5 | Martes | C13 — RR. HH. y nómina |
| 5 | Jueves | C14 — MES |
| 6 | Martes | C4 — Cuánto cuesta implementar un ERP |
| 6 | Jueves | C5/C8 — CRM para 100+ empleados |

## C13 — Software de RR. HH. y nómina para más de 100 empleados
Slug: `software-recursos-humanos-nomina-mas-de-100-empleados`

### Post (≈190 palabras)

Con 20 empleados, la nómina es un proceso.

Con más de 100, es otra cosa.

Es una exposición legal. Es uno de los mayores gastos de la empresa. Y es la base de datos personales más sensible que tienes.

Y aun así, muchas empresas la manejan con hojas de cálculo y tres sistemas que no se hablan.

Primero hay que distinguir lo que se compra:

→ Software de nómina: calcula y paga
→ HRIS: administra el registro del empleado
→ HCM: todo el ciclo de vida de las personas

Los proveedores no trazan esas fronteras igual. Por eso las comparaciones no se comparan.

Si operas en varios países, cada uno trae su legislación laboral y de nómina. Eso define qué alternativas son viables antes de mirar una sola función.

Un sistema de personas bien elegido y mal adoptado sigue obligando a trabajar en Excel.

¿Quién es hoy el dueño de ese sistema en tu empresa: recursos humanos, finanzas o TI?

## C14 — Software MES
Slug: `software-mes-que-es-y-cuando-lo-necesita-su-planta`

### Post (≈180 palabras)

El ERP sabe cuánto debía producirse.

El piso de planta sabe cuánto se produjo.

Entre los dos hay una brecha. Y casi nadie la ve hasta el cierre del mes.

Un MES es el sistema que la cierra: recibe las órdenes del ERP, las programa y despacha, registra lo que ocurre en producción y devuelve los resultados.

En el estándar ISA-95, el ERP vive en el nivel 4. El MES, en el nivel 3.

No toda planta lo necesita.

Las señales:

+ La trazabilidad por lote o serie la exige el cliente o el regulador
+ Los defectos se descubren tarde
+ El plan y la ejecución divergen sin que nadie lo note
+ Las paradas se registran a mano

Si ninguna se cumple, una buena configuración del ERP puede alcanzar.

Y un MES que los operarios no registran a tiempo no cumple su función.

¿Qué decisión no puedes tomar hoy por falta de datos de tu planta?

## C4 — Cuánto cuesta implementar un ERP
Slug: `cuanto-cuesta-implementar-un-erp`

### Post (≈190 palabras)

25 usuarios. Dynamics 365 Business Central Essentials.

25 × US$80 × 12 = US$24.000 al año.

Solo licencias. Con el precio de lista que publica el fabricante.

Y esa es la parte fácil del presupuesto.

El costo total de un ERP tiene cuatro bloques:

- Licencias o suscripción
- Implementación
- Infraestructura y soporte
- Tiempo de tu equipo interno

El cuarto es el que casi nadie presupuesta.

Los costos ocultos que más desvían el presupuesto: personalizar en exceso, subestimar la migración de datos, olvidar las integraciones y no planear la adopción.

Un ERP que la gente no usa no devuelve la inversión.

Pide a cada proveedor la misma propuesta, con el mismo alcance, desglosada por bloque. Si no la desglosan, no puedes compararlas.

¿Tu comité de inversión está viendo el costo a cinco años o solo el del primer año?

## C5 / C8 — CRM para empresas de más de 100 empleados
Slug: `salesforce-vs-hubspot-vs-dynamics-365-crm`

### Post (≈190 palabras)

Salesforce, HubSpot o Dynamics 365.

La lista corta casi siempre es la misma.

Y casi siempre se decide con la pregunta equivocada: ¿cuál tiene mejores funciones?

Con más de 100 empleados, la pregunta cambia.

¿Cuánto cuesta y qué riesgo tiene tenerlo en operación durante cinco años?

La licencia suele ser la partida más visible. No la más grande.

Pesan más:

→ La implementación
→ La integración con el ERP
→ La calidad de los datos de clientes
→ La adopción de ventas, servicio y finanzas

Un CRM que no se integra con facturación y cartera obliga a conciliar a mano. Y el pronóstico que llega a la junta deja de ser confiable.

Cambiar de CRM después es posible. Implica migrar datos, rehacer integraciones y reentrenar a todos.

¿Tu CRM y tu ERP hablan el mismo idioma sobre quién es el cliente?
