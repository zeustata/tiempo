# 📋 Registro de Cambios (Changelog) - MeteoAstur Lode

Todas las novedades, mejoras y correcciones notables de **MeteoAstur Lode** se documentan en este archivo siguiendo el estándar [Semantic Versioning](https://semver.org/lang/es/).

---

## 🏷️ Guía de Versionado
- **Major (X.0.0)**: Cambios arquitectónicos grandes o rediseños completos.
- **Minor (0.X.0)**: Nuevas funcionalidades, nuevos módulos climáticos o integraciones.
- **Patch (0.0.X)**: Corrección de errores (*bugfixes*), ajustes de diseño y optimizaciones.
- **Sufijo `-beta` / `-rc`**: Versiones preliminares en fase de pruebas activas.

## [2.2.58] - 2026-10-17

### 🎿 Restauración de Visibilidad y Renderizado 2D Nativo en Tablets (Feedback Lendo - Tablet)
- **Erradicación del Layer Culling y Retorno de Textos y Métricas en Nieve:**
  - Diagnóstico: en la versión 2.2.56, al forzar aceleración por hardware con `transform: translateZ(0)` e `isolation: isolate` en los iconos, la GPU de tablets Android promovió los SVGs a su propia textura pero descartó el plano 2D de los textos hermanos (`HOY`, temperaturas, etiquetas `09-13h`, viento y nieve fresca), dejando los iconos flotando en rectángulos vacíos.
  - Intervención técnica en `css/components.css` y `css/main.css`: eliminados todos los `transform: translateZ(0)`, `isolation: isolate`, `backface-visibility: hidden` y `scroll-snap` del carrusel de esquí de 7 días, sus tarjetas, cabeceras, slots y SVGs. Se alineó la estructura al modelo de `.hourly-scroll-container` (que rinde perfectamente en tablets con textos e iconos a la primera).
  - Emancipación del ciclo de animación en paneles: eliminada la propiedad estática `animation: ... forwards` y `will-change` permanente de `.tab-panel.active`. En `js/app.js`, se introdujo un temporizador de limpieza de clases de animación tras 380 ms, devolviendo al panel su estado 2D estándar y permitiendo a Chromium pintar al instante y sin retrasos todos los textos e iconos en cualquier resolución.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2258-tablet-ski-forecast-restored`.
  - Versión oficial elevada a `v2.2.58 🎿` en pie (`#app-version-badge`), modal `#changelog-modal`, `CURRENT_APP_VERSION = '2.2.58'` en `app.js` y query strings en `index.html`.

## [2.2.57] - 2026-10-17

### ☁️ Calibración Anti-Falsos Orbayus Secos en Cielo Cubierto (Feedback Lendo - Piedras Blancas)
- **Coherencia Física entre Código del Cielo y Micro-Trazas de Lluvia:**
  - Diagnóstico: en Castrillón (Piedras Blancas), el cielo estaba encapotado pero seco. Todos los modelos numéricos marcaban código 3 (Nublado / Cubiertu), pero AROME (1.3 km) introducía una micro-traza residual de 0.1 mm con humedad relativa de solo el 79%.
  - Causa raíz: el clasificador consideraba cualquier valor `>= 0.1 mm` como lluvia física activa en superficie, transformando falsamente el código 3 en `Orbayu / Llovizna ligera 🌦️` a pesar de que las micro-gotas a 1.000 m se evaporaban como virga con 79% de humedad.
  - Corrección en `weatherIcons.js`: para códigos WMO secos (0, 1, 2, 3, 45, 48), una traza aislada de 0.1 mm solo se convalida como precipitación activa si la humedad relativa en superficie alcanza la saturación (h >= 90%). Con humedades inferiores al 90%, se descarta la virga y se preserva fielmente el estado real: **Nublado / Cubiertu ☁️**.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2257-anti-false-orbayu-overcast`.
  - Versión oficial elevada a `v2.2.57 ☁️` en pie (`#app-version-badge`), modal `#changelog-modal`, `CURRENT_APP_VERSION = '2.2.57'` en `app.js` y query strings en `index.html`.

## [2.2.56] - 2026-10-17

### 🎿 Blindaje de Renderizado Inmediato de Iconos SVG en Tablets (Feedback Lendo - Expediente X Tablet)
- **Fin del Retraso de Rasterizado en Tablets Android / Chromium:**
  - Diagnóstico del fenómeno: en pantallas de tablet en apaisado (landscape), donde los 7 días de previsión entran de golpe sin necesidad de scroll vertical, los motores Chromium diferían el rasterizado de los iconos SVG con filtros de sombra dentro de contenedores `overflow-x: auto` hasta que el usuario tocaba la pantalla.
  - Aplicado aislamiento de capa gráfica independiente (`isolation: isolate; transform: translateZ(0); -webkit-backface-visibility: hidden; backface-visibility: hidden;`) en el carrusel de esquí (`.ski-7days-carousel`), en las tarjetas (`.ski-day-card`), en las cabeceras (`.ski-day-icon`), en los slots horarios (`.daypart-icon`) y en los SVGs vectoriales (`.astur-svg-icon`).
  - Añadido micro-despertador en `switchTab('mountain')` en `js/app.js` para forzar el commit de rasterizado de la GPU del tablet en 60 ms al entrar en la pestaña.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2256-tablet-ski-icons-raster`.
  - Versión oficial elevada a `v2.2.56 🎿` en pie (`#app-version-badge`), modal `#changelog-modal`, `CURRENT_APP_VERSION = '2.2.56'` en `app.js` y query strings en `index.html`.

## [2.2.55] - 2026-10-17

### 🏄‍♂️ Desbloqueo y Visibilidad Total del Viento en Rompientes (Feedback Lendo)
- **Viento en Costa Permanente en la Tarjeta de Swell (`surfCard.js`):**
  - Desacoplado el renderizado del viento del condicional del Swell 2. Ahora, tanto si hay oleaje secundario como si no, el **Viento en costa** (velocidad media, rachas y flecha aerodinámica con color de terral/onshore) se muestra siempre en su propia línea visible.
- **Velocidad y Rachas en la Pastilla de Textura Marina:**
  - Integrada la velocidad en km/h y rango de rachas directamente en el chip `.surf-texture-chip` de la Hero Card (ej. `Textura: Superficie Picada • 7–16 km/h (Chop)`), facilitando la lectura instantánea de la fuerza del aire en el arenal.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2255-surf-wind-unlocked`.
  - Versión oficial elevada a `v2.2.55 🏄‍♂️` en pie (`#app-version-badge`), modal `#changelog-modal`, `CURRENT_APP_VERSION = '2.2.55'` en `app.js` y query strings en `index.html`.

## [2.2.54] - 2026-10-17

### 🧭 Rango Dinámico de Viento en Anemómetro (Feedback Edu & Lendo)
- **Visibilidad Integral de Rachas Perceptibles (`currentCard.js` & `components.css`):**
  - **Titular en Rango Dinámico (Opción A):** Cuando las rachas son superiores al flujo continuo, el anemómetro muestra el rango completo en tamaño prominente (ej. `6.8 – 16 km/h`), dando el protagonismo que merecen las rachas que el usuario siente físicamente contra casas y árboles.
  - **Subtítulo Aclaratorio Inmediato:** Añadida una leyenda directa bajo la cifra (`Media: 6.8 • Racha: 16 km/h`) que despeja cualquier duda entre viento sostenido y ráfaga.
  - **Blindaje Tipográfico y Anti-Desborde Móvil (Ley 11):** Escala de fuentes adaptativa (`1.80rem` a `1.48rem` en pantallas ≤380px) con `min-width: 0; flex: 1;` en el contenedor `.wind-info`, garantizando alineación impoluta con la rosa de los vientos sin riesgo de salto de línea descontrolado.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2254-wind-range-anemometer`.
  - Versión oficial elevada a `v2.2.54 🧭` en pie (`#app-version-badge`), modal `#changelog-modal`, `CURRENT_APP_VERSION = '2.2.54'` en `app.js` y query strings en `index.html`.

## [2.2.53] - 2026-10-16

### 🏄‍♂️ Micro-Pastilla Armónica de Textura Marina (Petición Lendo)
- **Erradicación de Texto Comprimido en Rompiente (`surfCard.js`):**
  - Sustituida la caja horizontal que aplastaba la frase explicativa al lado de «Superficie Picada» por una pastilla ergonómica fluida (`.surf-texture-chip`), limpia y de una sola línea sin colisión de textos.
  - Integrado el titular de estado (`⚠️ Mar Pasado en Arenales...`) y la recomendación técnica dentro del contenedor de diagnóstico (`.surf-status-banner`) con márgenes unificados y lectura clara.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2253-surf-clean-texture-chip`.
  - Versión oficial elevada a `v2.2.53 🏄‍♂️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.52] - 2026-10-16

### 🏄‍♂️ Armonización y Orden Ergonómico de Surf & Rompientes (Petición Lendo)
- **Orden de Rompiente y Reorganización de Sensores (`surfCard.js`):**
  - La tarjeta de Calificación de Estrellas (0-10★) y Textura Marina (Glassy/Choppy) asciende a la primera posición como Hero Card, ofreciendo al surfista el diagnóstico inmediato del día nada más entrar al módulo.
  - Los 4 sensores técnicos (Altura de Ola Significativa, Período y Swell, Energía Combinada en kJ, y Temperatura con Traje) se consolidan en una cuadrícula simétrica, reduciendo el scroll vertical a más de la mitad.
- **Supresión de Avisos Redundantes en Previsión:**
  - Erradicadas las barras redundantes de «Desliza horizontalmente» tanto en el cronograma a 3 horas como en la previsión de 7 días, ganando 70 píxeles de desplazamiento limpio.
- **Guía de Surf Integrada y Fichas Modernizadas a Micro-Píldoras:**
  - El botón de «💡 Guía de Surf» se acopla a la cabecera de rompientes en pastilla compacta, eliminando la barra de 44px de alto.
  - El interior de las fichas de cada arenal (picos bautizados, viento terral específico, swell óptimo, fondo y marea) adopta el sistema moderno de micro-píldoras simétricas a 2 columnas (`.beach-specs-chips`), garantizando total inmunidad al desborde en móvil.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2252-surf-ergonomic-order`.
  - Versión oficial elevada a `v2.2.52 🏄‍♂️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.51] - 2026-10-16

### 🏖️ Desplegable de Playas Conciso y Anti-Recorte (Petición Lendo)
- **Ergonomía de Etiquetas y Blindaje Móvil (`marineCard.js`):**
  - Simplificada la opción por defecto del selector a `🏖️ Playas` (en sustitución de `🏖️ Todas las playas (xx)`), eliminando el desborde y los puntos suspensivos que se producían al compartir fila con el botón de Webcams en móviles.
  - Concisión de una sola palabra en los nombres de las categorías temáticas (`Familiares`, `Calas`, `Surf`, `Salvajes`) y supresión de los contadores numéricos en el desplegable.
  - Garantizada la lectura limpia, proporcionada y sin cortes en pantallas estrechas (320px - 380px) al seleccionar cualquier filtro.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2251-compact-beach-select`.
  - Versión oficial elevada a `v2.2.51 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.50] - 2026-10-16

### 🏖️ Ajuste de Paddings y Compactación del Mareógrafo (Petición Lendo)
- **Apretar el Aire Sobrante y Eficiencia Vertical (`marineCard.js` y `components.css`):**
  - Suprimida la barra de aviso redundante sobre la curva de marea de 72h (`.tide-scroll-hint-bar`), permitiendo que el gráfico dinámico SVG se conecte de forma inmediata y limpia.
  - Reducido el padding interior de la tarjeta del mareógrafo (`.mareografo-card`) a 16px 18px (y 12px 14px en smartphones), aprovechando el marco útil de la pantalla.
  - Compactadas las 4 métricas en vivo en pastillas sleeker (`.tide-metric-pill`) con padding de 10px 14px y gap de 8px, y ajustado el padding de los 3 sensores de costa (`.marine-widget`) a 14px 16px.
  - Ahorro neto de otros 40 píxeles verticales, completando la tríada de recortes ergonómicos del módulo.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2250-compact-tide-paddings`.
  - Versión oficial elevada a `v2.2.50 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.49] - 2026-10-16

### 🏖️ Supresión de Textos de Relleno en Guía de Playas (Petición Lendo)
- **Eliminación de Subtítulo Decorativo y Ganancia de Espacio (`marineCard.js` y `components.css`):**
  - Suprimida la frase poética de relleno (*«Arenales, calas con encanto, entorno marinero y mejor momento de marea»*) sobre el catálogo de arenales.
  - La barra ergonómica de Webcams y el desplegable de categorías se acoplan directamente bajo el título de las playas con margen optimizado, ahorrando otros 30 píxeles verticales y subiendo las fichas hacia la vista inicial del usuario.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2249-lean-beach-section`.
  - Versión oficial elevada a `v2.2.49 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.48] - 2026-10-16

### 🏖️ Unificación de Cabeceras en Playas y Mareógrafo (Petición Lendo)
- **Fusión de Cabeceras y Ahorro Vertical (`marineCard.js` y `components.css`):**
  - Fusión de la cabecera general de sección y la cabecera interna del mareógrafo en una única cabecera canónica (`.marine-master-header`).
  - Toda la información contextual (concejo activo, región litoral / interior de escape, estado de marea llenante/vaciante y bandera de mar) queda agrupada arriba de forma compacta.
  - Suprimido el bloque `.mareografo-header` dentro de la tarjeta del mareógrafo, permitiendo que las métricas en tiempo real comiencen de inmediato con un ahorro de más de 60 píxeles de altura vertical.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2248-unified-marine-header`.
  - Versión oficial elevada a `v2.2.48 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.47] - 2026-10-16

### 🏖️ Acordeón Exclusivo de Playas y Spots de Surf (Petición Lendo)
- **Autocierre Inteligente y Navegación Recogida (`app.js`):**
  - Implementado oyente global en fase de captura para eventos `toggle` sobre `.beach-accordion-card`. Al abrir una playa o rompiente de surf, cualquier otra ficha previamente desplegada se cierra automáticamente.
  - Erradicado el crecimiento acumulativo de la página: el usuario puede explorar arenales sin generar un scroll infinito ni perder de vista el menú superior de categorías.
  - Al cambiar de filtro en el selector desplegable (`#beach-category-select`), todos los acordeones se repliegan para ofrecer una vista compacta y ordenada de la nueva selección.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2247-exclusive-accordion-streamline`.
  - Versión oficial elevada a `v2.2.47 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.46] - 2026-10-16

### 🏖️ Erradicación del Doble Icono en Selector de Playas (Petición Lendo)
- **Supresión de Span Redundante y Armonización Canónica (`marineCard.js`, `components.css` y `app.js`):**
  - Eliminado el elemento `<span>` exterior (`#beach-active-icon`) que duplicaba el icono al elegir categorías específicas de playas, generando dos emojis pegados (ej. `👨‍👩‍👧‍👦 👨‍👩‍👧‍👦 Familiares`).
  - Integrado el emoji `🏖️` en la opción inicial `🏖️ Todas las playas`, homogeneizando todas las opciones del desplegable con su propio icono nativo sin redundancias.
  - Simplificada la lógica de JavaScript en `app.js`, prescindiendo de manipulaciones del DOM sobre el span externo y garantizando un único icono visible tanto en reposo como en el menú nativo.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2246-beach-single-icon-streamline`.
  - Versión oficial elevada a `v2.2.46 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.45] - 2026-10-16

### 🏖️ Selector Desplegable de Playas y Omisión de Seguridad de Baño (Petición Lendo)
- **Selector Desplegable Ergonómico en Guía de Playas (`marineCard.js`, `components.css` y `app.js`):**
  - Sustituido el carrusel de pastillas horizontales por un selector desplegable (`<select id="beach-category-select">`) estilizado con Glassmorphism y chevron cyan, alineado en una sola fila compacta junto al botón de `📹 Webcams ●`.
  - Desglose fluido e instantáneo de opciones: `🏖️ Todas las playas`, `👨‍👩‍👧‍👦 Familiares`, `🪨 Calas & Pozas`, `🏄‍♂️ Surf` y `🌿 Salvajes & Dunas`, con actualización dinámica del icono frontal según la categoría activa.
  - Elimina el deslizamiento lateral con el pulgar para buscar categorías, activando el selector nativo táctil de iOS y Android en una vista compacta sin sobrecarga visual.
- **Omisión de la Tarjeta de Seguridad de Baño y Tríada Simétrica (`marineCard.js`):**
  - Retirado el widget de seguridad de baño de la cuadrícula de sensores marinos por petición expresa de Lendo: la aplicación meteorológica no sustituye la evaluación presencial de los socorristas y salvavidas a pie de playa (Ley 16 - Exención de Responsabilidad Civil).
  - La cuadrícula `.marine-grid` pasa a una tríada simétrica limpia y equilibrada de 3 sensores esenciales: `Temperatura del Agua`, `Estado de la Mar (Douglas)` y `Visibilidad Costera & Viento`.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2245-beach-dropdown-streamline`.
  - Versión oficial elevada a `v2.2.45 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.44] - 2026-10-16

### 🏖️ Integración de Webcams en Barra de Filtros (Petición Lendo)
- **Compactación y Ergonomía en Guía de Playas (`marineCard.js`, `components.css` y `app.js`):**
  - Fusionado el botón de cámaras en directo como la primera pastilla destacada (`📹 Webcams ●`) del carrusel de filtros, equipada con un punto rojo pulsante (*live pulse*).
  - **Ahorro de Salto Vertical:** Eliminada la fila rectangular aislada que consumía 45px de altura en la vista móvil, agrupando todas las acciones y filtros en un único carrusel horizontal con el pulgar.
  - **Aislamiento de Delegación de Eventos:** Asegurado que el pulsador de webcams abra exclusivamente el modal de cámaras sin interferir con la lógica de filtrado de playas ni heredar la clase `.active`.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2244-webcams-pill-streamline`.
  - Versión oficial elevada a `v2.2.44 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.43] - 2026-10-16

### 🏖️ Estandarización y Simetría Limpia en Sensores Costeros (Petición Lendo)
- **Simetría y Armonización 2x2 en Sensores de Costa (`marineCard.js`):**
  - Rediseñada la 4ª tarjeta (`Seguridad de Baño`) para adoptar exactamente la misma arquitectura y ritmo visual que las tres anteriores (`Temperatura del Agua`, `Estado de la Mar` y `Visibilidad & Viento`).
  - **Estructura Cuádruple Idéntica:** Etiqueta en mayúsculas (`widget-label`), Métrica Hero destacada (`widget-value`) y exactamente dos líneas de detalle contextual (`widget-detail`), eliminando banners discordantes y alturas dispares.
  - **Erradicación de Redundancias (Ley 14):** Suprimido el sello duplicado de bandera teórica (que ya preside en grande la cabecera principal), logrando un bloque simétrico que reduce un **30% de altura vertical** y mejora la legibilidad en smartphones.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2243-marine-sensors-symmetry`.
  - Versión oficial elevada a `v2.2.43 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.42] - 2026-10-16

### 🏖️ Filtros Rápidos Deslizables por Tipo de Playa (Petición Lendo)
- **Barra de Filtros Horizontales Reactivos (`marineCard.js`, `components.css` y `app.js`):**
  - Implementada barra horizontal deslizante con pastillas ergonómicas táctiles tipo carrusel con contadores en vivo:
    - `[ 🏖️ Todas ]`
    - `[ 👨‍👩‍👧‍👦 Familiares ]` (arenales resguardados, tranquilos, urbanos y aptos para baño/paseos)
    - `[ 🪨 Calas & Pozas ]` (calas con encanto, pedreros, pozos naturales y fondos de roca/losa)
    - `[ 🏄‍♂️ Surf ]` (rompientes de olas, picos bautizados, barras de ría y swell activo)
    - `[ 🌿 Salvajes & Dunas ]` (monumentos naturales, dunas eólicas y arenales vírgenes)
  - **Erradicación de la Fatiga de Scroll:** En concejos con decenas de arenales (Llanes, Castrillón, Gozón o Villaviciosa), los usuarios pueden acotar instantáneamente lo que buscan con un solo toque en pantalla.
  - **Aislamiento Gestual Móvil (Leyes 11 y 18):** `touch-action: pan-x pan-y;` y blindaje en `isInteractiveZone` para permitir el desplazamiento horizontal suave sin activar jamás el cambio accidental de pestaña o menú.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2242-beach-filters-streamline`.
  - Versión oficial elevada a `v2.2.42 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.41] - 2026-10-16

### 🏖️ Rediseño Ergonómico a Micro-Píldoras en Fichas de Playas (Petición Lendo)
- **Transformación de Fichas de Playas a Micro-Píldoras Modernas (`marineCard.js` y `components.css`):**
  - Sustituidas las 3 filas rectangulares rígidas apiladas (`.beach-specs-table`) por una cuadrícula fluida de micro-píldoras (`.beach-specs-chips`):
    - `[ 🏖️ Fondo / Entorno: Arena fina dorada ]`
    - `[ ⏳ Marea Óptima: Media Marea / Bajamar ]`
    - `[ 👨‍👩‍👧‍👦 Recomendación: Ideal para baño, descanso y paseos ]` (span completo a todo el ancho con acento visual temático).
  - **Ahorro del 45% de Espacio Vertical:** Compactación extrema sin perder ni una sola línea de datos o recomendaciones turísticas, erradicando el aspecto de formulario administrativo y logrando una estética 100% nativa.
  - **Erradicación de Emojis Duplicados:** Extracción algorítmica limpia del icono del tipo de fondo y de la recomendación, asegurando que no se repitan emojis adyacentes.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2241-beach-chips-redesign`.
  - Versión oficial elevada a `v2.2.41 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.40] - 2026-10-16

### 🏖️ Blindaje Móvil y Sintetización en Selector de Mareas (Petición Lendo)
- **Sintetización Visual Ergonómica (Ley 11):**
  - Rediseñadas las etiquetas del selector deslizante del mareógrafo a `📈 Curva 72h` y `📅 7 Días` (en lugar de «Curva Continua 72h» y «Marea Semanal 7 Días»).
  - Erradicado el desborde y corte lateral en smartphones estrechos (< 380px), garantizando centrado perfecto, holgura visual y armonía con los selectores de Surf y Cordillera.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2240-marine-switch-streamline`.
  - Versión oficial elevada a `v2.2.40 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.39] - 2026-10-16

### 🏖️ Selector Deslizante en Mareógrafo y Reorganización de Mareas (Petición Lendo)
- **Selector Ergonómico Segmented Control en Mareógrafo (`marineCard.js` y `components.css`):**
  - Implementado interruptor deslizante con efecto táctil háptico y glider animado: `[ 📈 Curva Continua 72h | 📅 Marea Semanal 7 Días ]`.
  - Erradicado el problema de apilamiento de dos carruseles horizontales consecutivos en pantallas móviles, reduciendo la altura vertical del módulo y evitando tropiezos táctiles involuntarios.
  - Al alternar a la Curva de 72h, se activa automáticamente el autocentrado (`scrollTideChartToNow()`) en la hora viva actual.
- **Consolidación Armónica del Cuadro de Mando Costero:**
  - Reorganizada la cuadrícula de condiciones en 4 bloques equilibrados: Temperatura del Agua con sensación térmica, Estado de la Mar (Escala Douglas) con botón didáctico 💡, Visibilidad & Viento en arenal, y Seguridad de Baño con su bandera teórica oficial y recomendaciones.
  - Eliminada la duplicidad visual de la bandera entre cabecera y cuerpo.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2239-marine-card-streamline`.
  - Versión oficial elevada a `v2.2.39 🏖️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.38] - 2026-10-16

### 🛡️ Erradicación Total de Iconos Duplicados y Blindaje Indivisible en Alertas Silenciosas (Petición Lendo)
- **Auditoría y Desparasitado Integral de Emojis en Títulos:**
  - Erradicados todos los emojis duplicados incrustados en las cadenas de texto del título en los 6 detectores silenciosos restantes:
    - *Efecto Foehn (`foehnDetector.js`):* Eliminados tornados y vientos del título (`🌪️`, `🌬️`), dejando el icono de llama `🔥` exclusivo en cabecera.
    - *Galerna Cantábrica (`galernaDetector.js`):* Eliminadas olas y triángulos del título (`🌊`, `⚠️`), eliminando el choque `🌊 🌊`.
    - *Alerta Xelu (`xeluDetector.js`):* Eliminados glifos de hielo y copo (`🧊`, `❄️`), eliminando los duplicados `🧊 🧊` y `❄️ ❄️`.
    - *Alerta Nieve (`snowDetector.js`):* Eliminado el copo de nieve del título (`❄️`), unificando con los iconos de severidad (`🚨`, `🏔️`, `❄️`).
    - *Tormentas Convectivas (`thunderstormDetector.js`):* Eliminado el rayo repetido del título (`⚡`), erradicando `⚡ ⚡`.
    - *Viento en Viaductos (`roadWindDetector.js`):* Eliminados los coches y sirenas incrustados (`🚗💨`, `🚨💨`), erradicando `🚗💨 🚗💨` y `🚨 🚨💨`.
- **Encapsulamiento Indivisible Universal en Pantallas Móviles:**
  - Extendida la regla de bloque agrupado indivisible (`display: inline-flex; align-items: center; gap: 8px;`) a todas las alertas silenciosas: `.foehn-title-group`, `.galerna-title-group`, `.xelu-title-group`, `.snow-title-group`, `.road-wind-title-group`, `.thunderstorm-title-group` y `.mar-fondo-title-group`.
  - Impide que en resoluciones reducidas el icono quede huérfano en una línea superior y el texto salte a la siguiente.
- **Blindaje de Versión y Cache-Busting (Leyes 1, 4, 10, 11, 13 y 14):**
  - Service Worker actualizado a `meteoasturlode-v2238-silent-alerts-harmonization`.
  - Versión oficial elevada a `v2.2.38 🛡️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.37] - 2026-10-16

### 🌍 Unificación Indivisible y Erradicación de Iconos Duplicados en Tarjeta Sísmica (Petición Lendo)
- **Erradicación del Doble Icono del Planeta:**
  - Corregida la anomalía por la cual la tarjeta de registro sísmico mostraba dos iconos del planeta (uno de mayor tamaño suelto arriba y otro más pequeño delante del título).
  - Eliminado el glifo `🌍` incrustado dentro de las cadenas de texto del título en `seismicDetector.js`, manteniéndolo exclusivamente en el nodo semántico de icono.
- **Grupo Indivisible en Cabecera Móvil (`.seismic-title-group` en `components.css`):**
  - Encapsulados el icono y el título dentro de un contenedor `display: inline-flex; align-items: center; gap: 8px;`, asegurando que en pantallas estrechas de teléfonos móviles el icono nunca se desacople ni salte de línea de forma aislada.
- **Sanitización Dinámica de Caché Local:**
  - Incorporada limpieza reactiva en la lectura del almacenamiento local (`parsed.title.replace(/^🌍\s*/, '')`), garantizando la actualización visual inmediata en clientes con eventos guardados en caché sin requerir purgas manuales.
- **Blindaje de Versión y Cache-Busting (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2237-seismic-icon-harmonization`.
  - Versión oficial elevada a `v2.2.37 🌍` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.36] - 2026-10-16

### ☀️ Soberanía Física Inversa & Anti-Falso Nublado en Tiempo Real (Feedback Lendo)
- **Erradicación de Falsos Días Grises ante el Sol Real:**
  - Corregida la anomalía por la cual los modelos numéricos deterministas (como AROME o ICON) mantenían a Castrillón / Salinas y otras zonas costeras con etiqueta de «Cubierto (100% nubes)» a media mañana debido al rezago de nieblas o estratos matinales que en la realidad física ya se habían disipado por completo (evidenciado en webcams en directo y estaciones oficiales METAR de aeropuertos).
- **Consenso Cantábrico Simétrico y Bidireccional (`weatherApi.js`):**
  - Implementada la **Soberanía Física Inversa** como contraparte exacta del filtro anti-falso claro:
    Si no hay lluvia activa y los sensores físicos detectan radiación solar directa (>= 100 W/m², >= 200 W/m² de radiación global o índice UV >= 1.2), es una imposibilidad física que el cielo esté encapotado al 100%.
  - El sistema detecta la contradicción física, descarta el código 3 (cubierto) y reclasifica automáticamente el estado a **Soleado / Despejado** (códigos 0, 1 o 2), ajustando la cobertura nubosa al valor real coherente con la insolación.
- **Protección Standalone Universal:**
  - Si el usuario selecciona manualmente un modelo individual (desactivando el consenso híbrido de ECMWF), la función `applyStandalonePhysicalSovereignty` aplica la misma garantía física para impedir que ningún modelo mienta sobre el estado del cielo cuando el sol brilla.
- **Blindaje de Versión y Cache-Busting (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2236-soberania-fisica-anti-falso-nublado`.
  - Versión oficial elevada a `v2.2.36 ☀️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.35] - 2026-10-16

### 🚨 Sistema de Triage y Jerarquía de Alertas por Severidad (Petición Lendo)
- **Triage Dinámico por Severidad (`currentCard.js`):**
  - Implementado motor de clasificación y ordenación en tiempo real basado en la Doctrina de Protección Civil:
    🔴 **Rojo (Peligro Extremo / Peso 3)** > 🟠 **Naranja (Riesgo Importante / Peso 2)** > 🟡 **Amarillo (Riesgo / Peso 1)**.
  - Toda alerta activa se evalúa dinámicamente y se posiciona en el feed de cabecera estrictamente según su gravedad: cualquier aviso rojo (lluvia torrencial, galerna roja, sismo severo o temporal) se antepone siempre a las advertencias naranjas o amarillas.
- **Ascenso Inteligente de la Tarjeta Oficial AEMET:**
  - Cuando AEMET emite avisos activos (amarillo, naranja o rojo), la tarjeta oficial asciende a la cabecera activa y se integra en el flujo de triage por encima del pronóstico horario de 72 horas.
  - Cuando la situación está en calma (verde / sin avisos), la tarjeta permanece en su ubicación habitual tras el pronóstico horario.
- **Ordenación Interna de Avisos AEMET (`weatherAlerts.js`):**
  - Si coinciden múltiples avisos oficiales simultáneos en la zona (ej. aviso rojo por lluvia y amarillo por viento), el listado interno se ordena automáticamente de mayor a menor severidad (`Rojo > Naranja > Amarillo`).
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2235-triage-jerarquia-alertas`.
  - Versión oficial elevada a `v2.2.35 🚨` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.34] - 2026-10-16

### 🚨 Protocolo de Alertas Rojas de Emergencia y Jerarquía de Sismos Graves (Petición Lendo)
- **Modal de Emergencia Roja Instantánea (`#emergency-alert-modal` en `index.html` y `app.js`):**
  - Si al abrir la app existe una alerta roja meteorológica extrema (AEMET roja, galerna roja, temporal severo) o un terremoto grave próximo (M >= 3.8 / cercanía crítica), la aplicación despliega inmediatamente un modal emergente de emergencia con máxima visibilidad y prioridad operativa.
  - **Prioridad Absoluta sobre el Changelog:** La alerta roja de emergencia se antepone siempre a las novedades (`#changelog-modal`), postergando el changelog para no eclipsar situaciones de riesgo civil.
  - Diseñado con estética de alta seguridad en cristal líquido rubí (`.emergency-modal-card`), borde brillante pulsante, datos de magnitud/fenómeno, recomendaciones de protección civil y botón de acuse de recibo.
- **Jerarquía y Promoción de Terremotos Graves (`currentCard.js` y `seismicDetector.js`):**
  - Los sismos severos o notables sentidos (`level === 'severe'` o `magnitude >= 3.5`) ya no quedan ocultos al fondo de la estación en vivo.
  - Ahora se promocionan automáticamente a la cabecera del feed de alertas de la estación en vivo (`#seismic-top-container`), inmediatamente junto a las alertas AEMET y fenómenos silenciosos críticos.
  - Los sismos menores o distantes siguen mostrándose de forma informativa en el banner inferior (`#seismic-banner-container`).
- **Temporalidad y Ciclo de Vida de Emergencias (Regla de Protección Civil):**
  - **Diferenciación Sismo vs Meteorología:** A diferencia de las alertas meteorológicas de AEMET (que se mantienen activas de forma continuada durante toda la vigencia del temporal), los terremotos son fenómenos puntuales e instantáneos.
  - **Ventana de Emergencia Sísmica de 2 Horas:** El modal emergente a pantalla completa para sismos solo se dispara durante las 2 primeras horas tras el evento (ventana crítica de shock y riesgo de réplicas). Pasadas 2 horas, el pop-up no interrumpe al usuario.
  - **Escalado en Estación en Vivo:** Terremotos severos se muestran en cabecera (`#seismic-top-container`) durante las primeras 6 horas; de 6 a 24 horas pasan a registro informativo en pie (`#seismic-banner-container`); a las 24 horas expiran y desaparecen por completo.
- **Simulacro y Pruebas Rápidas (Ley 12):**
  - Soporte para parámetros de URL `?test=emergencia_roja`, `?test=aemet_rojo` y `?test=sismo_severo` para verificación visual controlada en local.
- **Cache-Busting y Sincronización de Versión (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2234-alertas-rojas-emergencia`.
  - Versión oficial actualizada a `v2.2.34 🚨` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.33] - 2026-10-16

### 🚨 Palpitación Envolvente en Tarjeta AEMET y Alertas Silenciosas (Petición Lendo)
- **Animación Pulsante en Tarjeta Oficial AEMET (`components.css`):**
  - Dotada a la tarjeta oficial AEMET (`.aemet-alert-card`) de un sistema de animación rítmica de halo y respiración Liquid Glass cuando existen avisos activos:
    - 🟡 **Aviso Amarillo:** Pulso de 2,2 segundos (`aemetPulseYellow`) con borde ámbar encendido, halo expansivo de 0 a 32px y resplandor interior.
    - 🟠 **Aviso Naranja:** Pulso de 1,8 segundos (`aemetPulseOrange`) en tono naranja vivo.
    - 🔴 **Aviso Rojo:** Pulso de 1,5 segundos (`aemetPulseRed`) con halo rubí de 38px y urgencia visual.
- **Potenciación y Homogeneización de Alertas Silenciosas (`components.css` y `weather-themes.css`):**
  - Acelerados los ciclos de pulsación (antes lentos a 3,5s, ahora 2,2s para moderado y 1,5s para severo) y enriquecida la profundidad con resplandor `box-shadow` inset y exterior de alto contraste:
    - Alerta Xelu (`xeluAmberGlow` y `xeluRedGlow`).
    - Alerta Borrina (`borrinaYellowGlow` y `borrinaRedGlow`).
    - Alerta Mar de Fondo (`marFondoYellowGlow` y `marFondoRedGlow`).
    - Alerta Tormenta Convectiva (`stormPurpleGlow` y `stormRedGlow`).
    - Alerta Viento en Viaductos / Carretera (`roadWindAmberGlow` y `roadWindRedGlow`).
    - Alerta Galerna Cantábrica (`galernaOceanGlow` y `galernaRedGlow`).
    - Alerta Efecto Foehn (`foehnWarmGlow` y `foehnRedGlow`).
    - Alerta Sismología EMSC (`seismicAmberGlow`, `seismicRedGlow` y `seismicCyanGlow`).
    - Alerta Nieve y Ventiscas (`snowCyanGlow`, `snowHistoricGlow` y `snowMountainGlow`).
- **Simulacro Dinámico para Verificación (Ley 12 / `weatherAlerts.js`):**
  - Incorporados alias de simulacro controlado `?test=aemet` (amarillo), `?test=aemet_naranja` y `?test=aemet_rojo` para prueba visual inmediata en local.
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2233-alertas-pulsantes`.
  - Versión oficial elevada a `v2.2.33 🚨` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.32] - 2026-10-16

### 🏄‍♂️ Armonización Visual de Tarjetas a 3 Horas de Surf con Diseño y Monotarjeta de 7 Días (Petición Lendo)
- **Diseño Unificado a 2 Columnas y Cabecera de Marea (`surfCard.js`):**
  - Las tarjetas de cronograma horario a 3 horas (`.surf-slot-card`) adoptan la estructura visual, tipografías y proporciones de las tarjetas de 7 días:
    - Cabecera elegante (`.surf-daily-card-header`) con badge de día/hora (`⏱️ Hoy · 14:00`) y estado del mar/marea en ese momento (`🌊 Bajamar 1.15m`).
    - Fila de badges superiores con estrellas doradas (`slot.starRating.starIcons`), textura marina (`slot.waterTexture`) y energía en kiloJulios (`slot.energy.kj kJ`).
    - Distribución a 2 columnas equilibradas: Columna 1 con altura de ola, flecha de mar de fondo y período de swell; Columna 2 con insignia de calidad de viento, flecha aerodinámica con grados, velocidad en km/h y orientación.
- **Carrusel Monotarjeta al 100% y Fluidez Táctil (`components.css`, `main.css` y `app.js`):**
  - En smartphones, cada tarjeta `.surf-slot-card` ocupa el 100% exacto del ancho útil disponible con `scroll-snap-stop: always;` para avance magnético de slot en slot.
  - En pantallas medianas y escritorio se ajusta a 350px de ancho ergonómico.
  - Asignada la directiva `touch-action: pan-x pan-y;` conforme a la Ley 18 para garantizar desplazamiento vertical libre sin congelaciones.
  - Incluidas `.surf-slot-card` y `.surf-timeline-scroll-hint` en `isInteractiveZone` para blindar los gestos táctiles.
  - Sustituido el antiguo texto superior por la pastilla táctil en cristal líquido inferior *«👉 Desliza horizontalmente para ver la evolución a 3 horas ➔»*.
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2232-surf-3h-monotarjeta`.
  - Versión oficial elevada a `v2.2.32 🏄‍♂️` en pie (`#app-version-badge`), modal `#changelog-modal`, CSS y scripts.

## [2.2.31] - 2026-10-16

### 🏄‍♂️ Carrusel Monotarjeta al 100% en Surf 7 Días (Aplicación Ley 18 / Feedback Lendo)
- **Transformación a Carrusel Horizontal (`components.css` y `surfCard.js`):**
  - Reemplazada la columna vertical infinita de 7 días (`.surf-daily-cards-grid`) por un carrusel táctil horizontal fluido con fijación magnética `scroll-snap-type: x mandatory` y `scroll-snap-stop: always`.
  - En móviles cada tarjeta diaria `.surf-daily-card` ocupa el 100% exacto del ancho útil (`flex: 0 0 100%; width: 100%; max-width: 100%`) con alineación inicial fija `scroll-snap-align: start`.
  - En tablets y escritorio se adapta a 350px de ancho fijo ergonómico.
- **Scroll Vertical Libre & Blindaje Táctil (`main.css` y `app.js`):**
  - Asignada la directiva `touch-action: pan-x pan-y;` conforme a la Ley 18 para no bloquear jamás el scroll vertical de la página.
  - Blindadas las clases `.surf-daily-cards-grid`, `.surf-daily-card` y `.surf-daily-scroll-hint` en `isInteractiveZone` para impedir saltos accidentales de menú al deslizar.
- **Pastilla Didáctica en Cristal Líquido (`surfCard.js`):**
  - Añadida la pastilla *«👉 Desliza horizontalmente para ver los 7 días de surf ➔»* con micro-animación intuitiva.
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2231-surf-7dias-carrusel`.
  - Versión oficial elevada a `v2.2.31 🏄‍♂️` en pie, modal `#changelog-modal`, CSS y scripts.

## [2.2.30] - 2026-10-16

### 👆 Desbloqueo de Scroll Vertical Libre en Carruseles (Feedback Lendo)
- **Corrección de Directiva Táctil Bidireccional (`main.css` y `components.css`):**
  - Sustituida la directiva excluyente `touch-action: pan-x` por la directiva bidireccional nativa `touch-action: pan-x pan-y;` en `.weekly-tides-grid`, `.tide-day-card`, `.daily-cards-container` y `.daily-card-rich`.
  - Desbloqueadas las zonas muertas verticales: ahora el usuario puede apoyar el pulgar en cualquier parte de las tarjetas para desplazarse libremente arriba y abajo por la página sin que la pantalla se congele.
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2230-touch-action-pan-y`.
  - Versión oficial elevada a `v2.2.30 👆` en pie, modal `#changelog-modal`, CSS y scripts.

## [2.2.29] - 2026-10-16

### 🏖️ Carrusel Monotarjeta al 100% en Marea Semanal (Aplicación Ley 18 / Feedback Lendo)
- **Encuadre Monotarjeta al 100% en Pantallas Móviles (`components.css`):**
  - Cada tarjeta de marea `.tide-day-card` se reconfigura para ocupar el 100% exacto del ancho útil disponible en smartphones (`flex: 0 0 100%; width: 100%; max-width: 100%`) con alineación inicial fija `scroll-snap-align: start`.
  - Añadida la propiedad CSS `scroll-snap-stop: always`, asegurando que cada arrastre con el pulgar desplace limpiamente un día de marea a la vez sin espacios residuales.
- **Pastilla Didáctica en Cristal Líquido (`marineCard.js`):**
  - Añadida la pastilla interactiva *«👉 Desliza horizontalmente para ver los 7 días de mareas ➔»* bajo el carrusel de marea semanal.
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2229-marea-semanal-monotarjeta`.
  - Versión oficial elevada a `v2.2.29 🏖️` en pie, modal `#changelog-modal`, CSS y scripts.

## [2.2.28] - 2026-10-16

### 🛡️ Blindaje Táctil & Pantalla Completa en Pronóstico a 10 Días (Feedback Lendo)
- **Visión Íntegra al 100% en Pantallas Móviles (`components.css`):**
  - Cada tarjeta `.daily-card-rich` pasa a ocupar exactamente el 100% del ancho disponible en smartphones (`flex: 0 0 100%; width: 100%; max-width: 100%`) con alineación inicial fija `scroll-snap-align: start`.
  - Añadida la propiedad CSS `scroll-snap-stop: always`, garantizando que cada deslizamiento avance estrictamente una sola tarjeta a la vez.
  - Eliminados los recortes en el extremo derecho de las tarjetas y la visión residual del día anterior.
- **Aislamiento de Swipe y Protección de Menú (`app.js`):**
  - Añadidas las clases `.daily-cards-container`, `.daily-card-rich` y `.forecast-scroll-hint` a la función guardiana `isInteractiveZone(target)` en `setupSwipeNavigation()`.
  - El detector global de gestos táctiles ya no intercepta los deslizamientos sobre el carrusel de 10 días, permitiendo consultar los días sin cambiar de pestaña ni saltar de menú.
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2228-blindaje-carrusel-10dias`.
  - Versión oficial elevada a `v2.2.28 📅` en pie, modal `#changelog-modal`, CSS y scripts.

## [2.2.27] - 2026-10-16

### 📅 Ergonomía Móvil & Carrusel Horizontal en Pronóstico a 10 Días (Petición Lendo)
- **Transformación a Carrusel Horizontal Día a Día (`forecastView.js` y `components.css`):**
  - Erradicado el scroll vertical infinito (más de 3.500 px de desplazamiento continuo en móviles). Las 10 tarjetas diarias ahora se navegan en un carrusel horizontal táctil con fijación magnética `scroll-snap-type: x mandatory` y `touch-action: pan-x`.
  - En móviles cada tarjeta ocupa el ancho óptimo (88-90% de pantalla) dejando asomar el lateral del día siguiente para invitar al deslizamiento natural con el pulgar.
  - En tablets y escritorio las tarjetas se alinean con ancho fijo ergonómico de 350px.
- **Pastilla Didáctica Minimalista:**
  - Incorporado bajo el carrusel un badge elegante en cristal líquido (*«👉 Desliza horizontalmente para ver los 10 días ➔»*) con sutil micro-animación en la mano y la flecha guía.
- **Rejilla de Métricas 2x2 sin Recortes (`components.css`):**
  - Corregida la cuadrícula `.d-unified-metrics-grid` a un formato fijo de 2 columnas x 2 filas (`repeat(2, 1fr)`), otorgando ~150px de ancho útil a cada botón métrico (Lluvia, Viento, UV y Sol). Erradicado al 100% el truncamiento con puntos suspensivos (`4..`, `0..`, etc.) visto en monitores y pantallas anchas.
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2227-carrusel-10dias`.
  - Versión oficial elevada a `v2.2.27 📅` en pie, modal `#changelog-modal`, CSS y scripts.

## [2.2.26] - 2026-10-15

### ✨ Dinamismo Visual & Presencia en Estación en Vivo (Feedback Lendo)
- **Calibración con Presencia del Icono Vivo Flotante (`css/components.css`):**
  - Ajustado el ciclo de respiración y levitación `@keyframes heroWeatherFloat` para que tenga presencia visible real: ascenso de **-8px** (en vez de -4px imperceptibles), expansión armónica de un **10%** (`scale(1.10)`), balanceo pendular mecido por la brisa (**±2°**) y resplandor vivo sobre el cristal.
  - Cadencia natural de **3.2s** (en lugar de 4.0s demasiado estático) aportando vida al icono principal sin saturar.
- **Aceleración por Hardware & Blindaje para SoCs Modestos:**
  - Migración a `translate3d(0, -8px, 0)` garantizando compositing directo en GPU (0% CPU).
  - Incorporada directiva `@media (prefers-reduced-motion: reduce)` para apagar la animación automáticamente en modos de ahorro de batería o accesibilidad en móviles antiguos.
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2226-icono-vivo`.
  - Versión oficial elevada a `v2.2.26 ✨` en pie, modal `#changelog-modal`, CSS y scripts.

## [2.2.25] - 2026-10-15

### 📸 Armonía Visual & Iconos Temáticos en la Estampa para Compartir (Feedback Lendo)
- **Renderizado Vectorial SVG en Lienzo HTML5 Canvas (`shareCardGenerator.js`):**
  - Implementado motor de carga y pintado asíncrono de iconos vectoriales SVG en memoria (`loadSvgToImage`) directamente sobre el lienzo Canvas de 1080×1350 px.
  - El icono meteorológico principal de la estampa ahora se dibuja a gran escala (130×130 px) con los gráficos vectoriales del tema activo elegido por el usuario (Asturiano Cómic por defecto, Liquid Glass 3D, Píxel Retro, Neón Cyberpunk, Boceto o Futurista), con fallback automático a emoji en caso de fallo.
  - Las 6 tarjetas de la evolución horaria de la postal postal ahora renderizan sus iconos SVG temáticos (42×42 px) cargados en paralelo con `Promise.all`.
- **Sincronización de Preferencias Globales (Ley 14):**
  - Conectado el paso de `this.prefs.iconTheme` desde `app.js` hacia `openShareModal` y `generateShareCardCanvas`, asegurando que las estampas compartidas en WhatsApp, Instagram Stories y Telegram luzcan con la misma calidad e identidad que la aplicación.
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2225-iconos-estampa`.
  - Versión oficial elevada a `v2.2.25 📸` en pie, modal `#changelog-modal` y scripts.

## [2.2.24] - 2026-10-15

### 🏔️ Armonía Visual & Iconos Temáticos en Cordillera & Nieve (Feedback Lendo)
- **Sincronización de Iconos Temáticos en Estaciones de Esquí y Pistas:**
  - Integrado el motor de renderizado dinámico `renderWeatherIconHtml` en el badge general de tiempo de cada estación (`.ski-sky-icon`), en las tarjetas del carrusel de previsión a 7 días (`.ski-day-icon`) y en el desglose horario de pistas de Mañana (09-13h) y Tarde (13-17h) (`.daypart-icon`).
  - Sustituidos los antiguos emojis planos por los iconos oficiales vectoriales SVG del sistema según el tema activo del usuario (Asturiano por defecto, Liquid Glass 3D, Píxel Retro, Neón Cyberpunk, Boceto o Futurista), preservando el icono especial de alerta ante riesgo de ventisca severa (`❄️💨`).
  - Sincronizado el pase de `prefs.iconTheme` desde `js/app.js` e incorporadas reglas CSS con tamaños ergonómicos (22px, 24px y 18px) y micro-centrado con protección anti-desborde (Ley 14).
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2224-iconos-montana`.
  - Versión oficial elevada a `v2.2.24 🏔️` en pie, modal y variables del sistema.

## [2.2.23] - 2026-10-15

### 🎨 Armonía Visual & Iconos Temáticos en Meteorología Gráfica (Reflexión Lendo)
- **Sincronización de Iconos Temáticos en la Gráfica Horaria:**
  - Integrado el motor dinámico `renderWeatherIconHtml` en la cinta superior horaria (`.chart-sky-timeline`) y en el Live Inspector Readout, sustituyendo los emojis planos residuales por los iconos vectoriales SVG oficiales del sistema según el tema activo del usuario (Asturiano por defecto, Liquid Glass 3D, Píxel Retro, Neón Cyberpunk, Boceto o Futurista).
  - Configurado tamaño ergonómico de 20px SVG con protección anti-desborde y micro-alineación vertical, garantizando una estética 100% homogénea con la Estación en Vivo, Pronóstico a 10 Días y Comparador Climático (Ley 14).
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2223-iconos-grafica`.
  - Versión oficial elevada a `v2.2.23 🎨` en pie, modal y variables del sistema.

## [2.2.22] - 2026-10-15

### 📡 Claridad & Ergonomía en Radar en Directo (Feedback Lendo)
- **Subtítulo Minimalista en Cabecera de Radar:**
  - Incorporada la leyenda explicativa *«Seguimiento de lluvia y tormentas en tiempo real vía satélite»* bajo la clase estandarizada `.section-subtitle` en el panel de radar (`#panel-radar`), armonizando su jerarquía visual con el resto de módulos de la aplicación.
- **Sincronización en Menú de Módulos (`APP_MODULES`):**
  - Actualizada la descripción en la tarjeta de navegación de radar para mantener perfecta consistencia visual y de contenido.
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2222-subtitulo-radar`.
  - Versión oficial elevada a `v2.2.22 📡` en pie, modal y variables del sistema.

## [2.2.21] - 2026-10-15

### 📈 Claridad & Ergonomía en Meteorología Gráfica (Feedback Lendo)
- **Subtítulo Minimalista en Cabecera de Gráficas:**
  - Incorporada la leyenda explicativa *«Suite de curvas y tendencias multivariable por horas»* bajo la clase estandarizada `.section-subtitle` en el panel de gráficos (`#panel-charts`), armonizando su jerarquía visual con el resto de módulos de la aplicación.
- **Cache-Busting Garantizado (Leyes 1, 4, 10 y 13):**
  - Service Worker actualizado a `meteoasturlode-v2221-subtitulo-grafica`.
  - Versión oficial elevada a `v2.2.21 📈` en pie, modal y variables del sistema.

## [2.2.20] - 2026-10-15

### 🥾 Síntesis Visual & Rediseño Ejecutivo en Rutas & Senderismo (Feedback Lendo)
- **Erradicación del Caos Visual y Estructuración Ejecutiva:**
  - Sustituido el antiguo panel sobrecargado y las barras repetitivas por un **Dashboard Ejecutivo** unificado:
    - **Banner de Veredicto Inmediato:** Indicador claro con semáforo y resumen directo (🟢 Favorable / 🟡 Precaución / 🔴 Desaconsejada).
    - **3 Píldoras Métricas Simétricas:** Firme & Tracción (estado del suelo y lluvia reciente), Cumbres (+300m, temperatura y viento en cresta) y Recomendación de Equipo (calzado y ropa).
- **Fichas de Rutas Limpias y Claras:**
  - Métricas clave en una sola línea horizontal (`📏 Distancia`, `⏱️ Tiempo`, `⛰️ Desnivel`), descripción directa y terreno en pastilla discreta, eliminando la densidad y saturación visual.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v2220-rutas-senderismo-redisenado`, query strings actualizadas a `?v=2.2.20`.

## [2.2.19] - 2026-10-15

### ✨ Dinamismo Visual & Atmósfera Viva en Estación en Vivo (Feedback Lendo)
- **Animación Flotante y Respiración Viva en Icono del Tiempo Actual:**
  - Creada animación `@keyframes heroWeatherFloat 4s ease-in-out infinite` sobre `.hero-icon-block`.
  - El icono del cielo levita suavemente 4px con un sutil pulso de escala (1.0 a 1.06) y resplandor ambiental (*glow* atmosférico).
  - Compatible al 100% y de forma automática con los 7 temas de iconos disponibles (Emojis nativos, Asturiano SVG, Liquid Glass 3D, Neón, Píxel, Boceto y Futurista).
- **Micro-latido Orgánico en Sensores:**
  - Creada animación `@keyframes sensorIconSubtlePulse 4.5s ease-in-out infinite` sobre `.sensor-icon`.
  - Los iconos de las tarjetas de sensores (anemómetro, lluvia, barómetro, UV, etc.) respiran con cadencia relajada y elegante, conviviendo en armonía con las bombillas ámbar sin saturar la vista.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v2219-animacion-viva-iconos-estacion`, query strings actualizadas a `?v=2.2.19`.

## [2.2.18] - 2026-10-15

### 🌊 Blindaje Táctil & Aislamiento de Swipe en Marea Semanal (Feedback Lendo)
- **Aislamiento de Gestos Horizontales en `isInteractiveZone`:**
  - Añadido `.weekly-tides-grid`, `.weekly-tides-card` y `.tide-day-card` a la lista de zonas interactivas protegidas en `js/app.js`.
  - Directiva `touch-action: pan-x` añadida al contenedor en `components.css`.
- **Erradicación del Salto Involuntario de Pestaña/Menú:**
  - El detector global de swipe ya no intercepta los deslizamientos sobre el carrusel de 7 días, permitiendo deslizar suavemente de lado a lado para ver las mareas sin cambiar accidentalmente de módulo.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v2218-blindaje-swipe-marea-semanal`, query strings actualizadas a `?v=2.2.18`.

## [2.2.17] - 2026-10-15

### 🌊 Ergonomía & Carrusel Horizontal en Marea Semanal (Feedback Lendo)
- **Transformación a Carrusel Táctil Horizontal Continuo:**
  - Convertida la cuadrícula de 7 días (`.weekly-tides-grid`) en un contenedor `display: flex; overflow-x: auto;` con `scroll-snap-type: x mandatory;`.
  - Tarjetas de día fijadas en `flex: 0 0 215px` con `scroll-snap-align: start`, barra de scroll sutil y aceleración nativa `-webkit-overflow-scrolling: touch`.
- **Blindaje contra el Desplazamiento Vertical Excesivo:**
  - En pantallas móviles se erradica el apilamiento kilométrico de 7 tarjetas verticales (~1.500px), reduciendo la altura total a la de una sola tarjeta (~220px).
  - Los 7 días se consultan deslizando suavemente de izquierda a derecha con respuesta táctil inmediata.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v2217-marea-semanal-scroll-horizontal`, query strings actualizadas a `?v=2.2.17`.

## [2.2.16] - 2026-10-15

### 📅 Depuración de Redundancias en Marea Semanal (Feedback Lendo)
- **Supresión de Bombilla Didáctica Duplicada:**
  - Eliminado el botón interactivo `💡` de la cabecera de *«Marea Semanal»*, al ser un duplicado idéntico del botón ya presente en la tarjeta contigua superior (*«Coeficiente Hoy»*). Ambas abrían la misma explicación sobre mareas y coeficientes (`data-explain="tides"`).
  - La cabecera semanal queda despejada, elegante y minimalista.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v2216-marea-semanal-sin-bombilla-duplicada`, query strings actualizadas a `?v=2.2.16`.

## [2.2.15] - 2026-10-15

### 📅 Síntesis Visual en Marea Semanal (Feedback Lendo)
- **Simplificación Integral de la Cabecera:**
  - Título conciso: Sustituido *«Cuadro Semanal de Mareas & Coeficientes»* por **«Marea Semanal»**.
  - Subtítulo aligerado: Reducido a *«Previsión a 7 días • Fases lunares»*, despejando el espacio visual de la tarjeta y armonizando con el estilo directo de la app.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v2215-marea-semanal-minimal`, query strings actualizadas a `?v=2.2.15`.

## [2.2.14] - 2026-10-15

### 🏖️ Refinamiento Tipográfico & Limpieza en Mareas de Hoy (Feedback Lendo)
- **Supresión Definitiva de la Etiqueta «Próxima» (Ley 11):**
  - Eliminado el distintivo verde que se comprimía y quedaba cortado en teléfonos móviles de columna estrecha, garantizando total limpieza y cero cortes de texto.
- **Escala Tipográfica Proporcionada y Elegante:**
  - Hora ajustada a `1.08rem` JetBrains Mono (reduciendo la escala anterior de `1.25rem`).
  - Nombre de marea ajustado a `0.74rem` y altura en metros a `0.80rem` con padding compacto de `8px 10px`, logrando un equilibrio visual y minimalista perfecto.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v2214-mareas-tipografia-fina`, query strings actualizadas a `?v=2.2.14`.

## [2.2.13] - 2026-10-15

### 🏖️ Minimalismo Náutico & Píldoras Simétricas de Mareas de Hoy (Feedback Lendo)
- **Erradicación del Cardception (Cajas dentro de Cajas):**
  - Supresión de las dos grandes tarjetas apiladas (*«1ª Marea del Día»* y *«2ª Marea del Día»*) que contenían sub-cajas anidadas, bordes dobles y cabeceras duplicadas.
  - Ahorro de más de 180px de scroll vertical en el módulo de Playas y Mareas.
- **Rejilla Simétrica de 4 Píldoras (2×2 en Móviles / 4×1 en Escritorio):**
  - Cada evento de marea de la jornada se muestra en una elegante píldora de superficie única con acento de borde cian (Pleamar) o ámbar (Bajamar).
  - Jerarquía visual impecable: icono y nombre de marea, hora destacada en `1.25rem` JetBrains Mono, altura en metros y distintivo verde luminoso `Próxima` en la marea inminente.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v2213-mareas-minimal-grid`, query strings actualizadas a `?v=2.2.13`.

## [2.2.12] - 2026-10-15

### 💡 Síntesis Visual & Micro-animación Didáctica de Sensores (Feedback Lendo)
- **Erradicación del Texto «Explícame» en Todos los Sensores:**
  - Sustituida la pastilla rectangular con texto por un botón circular compacto de 32×32 px con solo el icono `💡`.
  - Aplicado de manera unificada a todos los sensores meteorológicos: Viento, Barómetro, Humedad/Rocío, Pluviómetro, Radiación UV, Calidad del Aire/Polen, Mareas, Oleaje y Asesor de Colada.
  - Gran despeje visual de las cabeceras de todas las tarjetas, reduciendo drásticamente la sobrecarga cognitiva.
- **Respiración Luminosa Ámbar (Breathing Glow):**
  - Implementada micro-animación cíclica suave (3.5 s) de intensidad luminosa y halo ámbar en el filamento de la bombilla, llamando la atención de forma atractiva y natural sin causar fatiga ni parecer una alarma.
  - Al pulsar o interactuar, se escala confortablemente con micro-animación de retorno.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v2212-bombilla-didactica-respiracion`, query strings actualizadas a `?v=2.2.12`.

## [2.2.11] - 2026-10-15

### 🌊 Síntesis Visual & Ergonomía del Mareógrafo (Feedback Lendo)
- **Simplificación Integral de la Cabecera del Mareógrafo:**
  - **Título Conciso:** Eliminada la coletilla extensa *«Dinámico en Vivo (72 Horas)»*, dejando el título directo, sobrio y elegante como **«Mareógrafo»**.
  - **Subtítulo Focalizado Únicamente en el Concejo:** Suprimidas las cadenas secundarias auxiliares (coordenadas longitudinales y previsión de 3 días) para mostrar exclusivamente el nombre del concejo limpio (`${concejoTitle}`, ej. *Castrillón*).
  - **Reducción de Carga Visual:** Se aligera el módulo de Playas y Mareas eliminando texto superfluo y optimizando la legibilidad en pantallas móviles.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v2211-mareografo-simplificado`, query strings actualizadas a `?v=2.2.11`.

## [2.2.10] - 2026-10-15

### 🏄‍♂️ Blindaje Anti-Desborde & Tipografía en Rompientes de Surf (Feedback Lendo - Ley 11)
- **Desacoplamiento de Cabecera & Título Limpio (Ley 11):**
  - Tras verificar en dispositivo móvil real que el nombre largo del concejo comprimía el título en un bloque vertical estrecho de múltiples líneas forzadas, se depura el título dejándolo conciso y a ancho completo: `🏖️ Rompientes, Picos de Surf y Fondos de ${ConcejoLimpio}` (ej. *Castrillón*).
  - Eliminado el subtítulo redundante para otorgar total limpieza y confort visual.
  - **Fila Secundaria Dedicada:** El botón `[ 💡 Guía de Surf y Olas ]` pasa a ocupar su propia fila independiente debajo del título con ancho completo y altura táctil de 44px, erradicando cualquier riesgo de colisión o estrangulamiento tipográfico.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v2210-surf-cabecera-ergonomica`, query strings actualizadas a `?v=2.2.10`.

## [2.2.9] - 2026-10-15

### 🏄‍♂️ Síntesis Ergonómica & Limpieza del Módulo de Surf (Feedback Lendo)
- **Supresión de Tarjetas Redundantes & Ahorro de Scroll (Leyes 11 y 14):**
  - Eliminado el bloque intermedio `.surf-intelligence-card` que albergaba las tarjetas fijas de consejos estáticos (Offshore/Onshore) y diagnóstico general de viento (Glassy).
  - Ahorro de más de 220px de scroll vertical en pantallas móviles, eliminando textos redundantes y simplificando drásticamente la interfaz.
  - El diagnóstico de viento en vivo se preserva donde verdaderamente tiene valor microclimático: calculado playa a playa dentro de cada ficha desplegable de rompiente según la orientación real de costa (`facingDeg`).
- **Integración Armónica de la Guía Didáctica (Ley 14):**
  - El botón interactivo `[ 💡 Guía de Surf y Olas ]` se traslada a la cabecera de la sección de rompientes (`.beach-section-header`), alineado con el título y con adaptación `flex-wrap` responsive para móvil.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v229-surf-limpieza-inteligencia`, query strings actualizadas a `?v=2.2.9`.

## [2.2.8] - 2026-10-15

### 🏄‍♂️ Rompientes y Picos de Surf en Acordeón Exclusivo (Feedback Lendo)
- **Ergonomía, Síntesis y Armonía Visual (Leyes 11 y 14):**
  - Extensión del sistema de acordeón exclusivo a la sección de Surf (`surfCard.js` y `components.css`).
  - **Todos los spots cerrados de inicio:** Se erradica el scroll kilométrico en móvil, permitiendo una visión de conjunto limpia y rápida de todos los rompientes del concejo.
  - **Acordeón Exclusivo:** Basado en `<details class="beach-accordion-card" name="surf-spots-accordion">`. Al abrir un spot se cierran automáticamente los demás.
  - **Cabecera Táctil Ergonómica:** Icono `🏄‍♂️`, nombre del spot en azul celeste (`#38bdf8`), distintivo de entorno (`Spot`, `Cala`, `Playa`) y chevron dinámico `▾` con rotación suave.
  - **Ficha Técnica Integral al Desplegar:** Diagnóstico en tiempo real del viento en la rompiente según orientación de costa, picos de surf bautizados, swell óptimo, terral favorable, tipo de fondo marino, dirección de ola, marea idónea y nivel técnico.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v228-surf-rompientes-acordeon`, query strings actualizadas a `?v=2.2.8`.

## [2.2.7] - 2026-10-15

### 🏖️ Guía de Playas y Calas en Acordeón Compacto Exclusivo (Feedback Lendo)
- **Ergonomía & Despliegue Bajo Demanda (Opción A - Leyes 11 y 14):**
  - Transformación del catálogo de arenales y calas del concejo en un acordeón táctil exclusivo basado en `<details class="beach-accordion-card" name="beach-accordion">` y `<summary class="beach-accordion-header">`.
  - **Todas las playas cerradas de inicio:** Se elimina el scroll infinito en móvil, permitiendo ver de un vistazo toda la lista de playas y seleccionar directamente la que se desea consultar.
  - **Acordeón Exclusivo:** Al abrir una playa, cualquier otra que estuviera desplegada se cierra de forma automática, preservando la pantalla siempre despejada.
  - **Cabecera Táctil Ergonómica:** Icono `🏖️`, nombre destacado en azul celeste (`#38bdf8`), distintivo de entorno (`Urbana`, `Cala`, `Natural`) y chevron `▾` interactivo con rotación suave (`180deg`) al desplegar.
  - **Compatibilidad Universal:** Atributo nativo HTML5 con delegación de respaldo para máxima fluidez en cualquier navegador y dispositivo móvil.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v227-guia-playas-acordeon`, query strings actualizadas a `?v=2.2.7`.

## [2.2.6] - 2026-10-14

### 🌊 Blindaje y Restauración Definitiva de Mareas de Hoy (Feedback Lendo & Princesa)
- **Cierre y Restauración Estable al Diseño Original Funcional (Leyes 2 y 17):**
  - Tras verificar de forma fehaciente en pantallas móviles que los intentos de compactación horizontal provocan conflictos de renderizado en navegadores móviles (superposiciones o cortes de caracteres), se aplica la Ley 17 («Si no sabes, no toques / ¿Para qué te metes, Manolete?») y la Ley 2 (Rollback seguro).
  - Se restaura de forma inmutable la arquitectura original de dos niveles por evento:
    - Nivel superior (`.tide-sub-top`): Icono temático (`🌅` / `🏖️`) y nombre completo en mayúsculas (**BAJAMAR** / **PLEAMAR**).
    - Nivel inferior (`.tide-sub-bottom`): Hora grande (`1.35rem` `JetBrains Mono`) a la izquierda y altura en metros (`0.95rem`) a la derecha.
  - Cero riesgos, cero textos montados y legibilidad premium al 100% en cualquier dispositivo.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v226-mareas-estables`, query strings actualizadas a `?v=2.2.6`.

## [2.2.5] - 2026-10-14

### 🌊 Tabla Náutica Compacta Unificada de Mareas de Hoy (Feedback Lendo & Princesa)
- **Unificación Profesional en 1 Sola Tarjeta Delgada (Leyes 11 y 14):**
  - En lugar de dos tarjetas exteriores superpuestas que consumían márgenes y altura excesiva, se unifica todo el ciclo de mareas del día en una sola tarjeta náutica estilizada (`.today-tides-card`).
  - Tabla de 3 columnas milimétricamente alineada:
    - **Izquierda:** Icono náutico (`🌅` / `🏖️`), nombre en mayúsculas (**PLEAMAR** / **BAJAMAR**) y etiqueta de ciclo (*1ª marea* / *2ª marea*).
    - **Centro:** Hora astronómica en tipografía monoespaciada `JetBrains Mono` con distintivo luminoso «Próxima» para la marea inminente.
    - **Derecha:** Altura del agua en metros en pastilla compacta de contraste marino (`3.76 m` / `0.98 m`) con ancho garantizado y blindaje anti-desborde.
  - Ahorro de más de 120px de espacio vertical en móvil con visibilidad directa de las 4 mareas del día sin necesidad de scroll forzado.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v225-tabla-mareas-compacta`, query strings actualizadas a `?v=2.2.5`.

## [2.2.4] - 2026-10-14

### 🌊 Restauración de Mareas de Hoy al Formato Funcional Doble Nivel (Feedback Lendo & Princesa)
- **Rollback Limpio al Diseño de Alta Legibilidad Móvil (Leyes 2 y 11):**
  - Tras verificar en dispositivo móvil real que las filas horizontales comprimidas forzaban la partición de la unidad de medida (`m` partida debajo de la cifra decimal), se restaura el formato original de dos niveles (`.tide-sub-top` y `.tide-sub-bottom`).
  - Arriba: Icono distintivo (`🌅` / `🏖️`) y nombre de marea (**PLEAMAR** / **BAJAMAR**).
  - Abajo: Hora en tipografía monoespaciada grande (`1.35rem` JetBrains Mono) alineada a la izquierda y altura (`0.98 m` / `3.76 m`) a la derecha, con espacio generoso para respirar.
  - Cero cortes, cero desbordes y legibilidad instantánea en cualquier smartphone.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v224-mareas-restauradas`, query strings actualizadas a `?v=2.2.4`.

## [2.2.3] - 2026-10-14

### 🌊 Filas Limpias Integradas para Mareas de Hoy (Feedback Lendo)
- **Erradicación Definitiva de Desborde y Cortes de Texto:**
  - Sustitución de las cajas cuadradas rígidas que colisionaban en pantallas móviles por un formato integrado de filas náuticas horizontales de ancho completo (`.tide-cycle-rows` y `.tide-row-item`).
  - La bajamar y la pleamar aprovechan el 100% del ancho disponible en cada ciclo diario, mostrando nombre, hora en grande monoespaciada blanca y altura de agua en color con acento marino lateral (ámbar y cian).
  - Solución garantizada a prueba de cualquier resolución de pantalla, sin truncamientos de texto ni desbordes laterales.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v223-mareas-filas-limpias`, query strings actualizadas a `?v=2.2.3`.

## [2.2.2] - 2026-10-14

### 🌊 Unificación Horizontal de Mareas Diarias (Feedback Lendo)
- **Bajamar y Pleamar en una Sola Fila (50% / 50%):**
  - Rediseñado el bloque de mareas de hoy en el módulo de Playas & Mareas (`marineCard.js` y `components.css`).
  - Los eventos de cada marea diaria (1ª Marea y 2ª Marea) se presentan ahora unificados de forma horizontal en un bloque simétrico de dos columnas, en lugar de cajas verticales apiladas.
  - Ahorro de más del 40% del espacio vertical en pantalla móvil, permitiendo una lectura simultánea e intuitiva de la evolución de la bajamar y pleamar sin scroll forzado.
  - Tipografía optimizada y blindaje anti-desborde para cualquier ancho de pantalla (Ley 11).
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v222-mareas-unificadas`, query strings actualizadas a `?v=2.2.2`.

## [2.2.1] - 2026-10-14

### 🎯 Simplificación y Limpieza de Cabeceras y Menús (Feedback Lendo)
- **Cabeceras Directas y Supresión de Redundancias:**
  - Renombrada la cabecera principal de previsión de `📅 Pronóstico Extendido a 10 Días` a `📅 Pronóstico a 10 Días`, logrando un encabezado mucho más ágil y conciso.
  - Limpieza de títulos de módulo eliminando reiteraciones de nombres de concejo o textos largos que ya figuran en los subtítulos o insignias de estado:
    - Playas: de `🏖️ Playas, Mareas & Turismo de [Concejo]` a `🏖️ Playas & Mareas`.
    - Surf: de `🏄‍♂️ Surf, Rompientes & Olas de [Concejo]` a `🏄‍♂️ Surf & Rompientes`.
    - Rutas: de `🥾 Rutas & Senderismo de [Concejo]` a `🥾 Rutas & Senderismo`.
    - Montaña: de `🏔️ Cordillera Cantábrica, Esquí & Puertos` a `🏔️ Cordillera & Nieve`.
    - Radar: de `📡 Radar Meteorológico en Directo sobre Asturias` a `📡 Radar en Directo`.
    - Comparador: de `⚖️ Comparador Climático de Concejos` a `⚖️ Comparador Climático`.
    - Astronomía: de `Observatorio Astronómico & Cosmos` a `Astronomía & Cosmos`.
- **Selector General Armonizado (`APP_MODULES`):**
  - Módulos en el modal "Menú" alineados con los nuevos nombres (`Pronóstico a 10 Días`, `Radar en Directo`), optimizando la legibilidad en pantallas móviles.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v221-titulos-limpios`, registro de `sw.js?v=2.2.1` y sincronización completa de imports internos (`forecastView.js?v=2.2.1`, `marineCard.js?v=2.2.1`, `surfCard.js?v=2.2.1`, `routesCard.js?v=2.2.1`, `mountainCard.js?v=2.2.1`, `astronomyCard.js?v=2.2.1`, `currentCard.js?v=2.2.1`, `mapRadar.js?v=2.2.1`) para forzar la invalidación inmediata de caché de disco en Chrome móvil y WebAPK.

## [2.2.0] - 2026-10-14

### ✨ Splash Cinemático MeteoAsturLode (Feedback Lendo)
- **Impacto de Marca y Calidad Estética (1,8 s):**
  - Implementada una pantalla de bienvenida cinemática (1,8 segundos) que enlaza armónicamente la pantalla de carga nativa del sistema operativo con el arranque de la app.
  - Presenta el escudo oficial de la estación (`icon-512.png`) con la Cruz de la Victoria, Alfa y Omega, sol radiante y lluvia cantábrica con halo pulsante, junto al surgimiento luminoso del título `MeteoAsturLode` en azul Cantábrico y oro asturiano, aprovechando la ausencia de publicidad en la app para ofrecer una bienvenida de máxima categoría.
- **Blindaje «Tap to Skip» Inmediato:**
  - Tocar o pulsar cualquier parte de la pantalla retira la cortina al instante (150 ms) para usuarios que requieren consulta inmediata sin esperas.
- **Cero Bloqueo de Datos:**
  - La animación corre en una capa flotante mientras el motor meteorológico consulta la API en segundo plano, sin demorar la respuesta de la interfaz.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v220-splash-cinematico`, query strings actualizadas a `?v=2.2.0`.

## [2.1.9] - 2026-10-14

### 💛💙 Optimización de Escala y Porte Tipográfico de MeteoAsturLode (Feedback Lendo)
- **Mayor Legibilidad y Presencia en 1 Sola Línea:**
  - Ajustado el tamaño de la marca unificada a `1.68rem` en monitores de escritorio/tabletas y `1.40rem` en dispositivos móviles (con `letter-spacing: -0.5px` y `white-space: nowrap;`).
  - El nombre de la app destaca con mayor presencia, nitidez y fuerza visual, garantizando matemáticamente que permanezca en una sola línea horizontal (más de 70px de margen libre incluso en pantallas de 320px).
- **Equilibrio Vertical y Ergonomía:**
  - La altura de la cabecera no se incrementa, integrando el texto de forma armónica junto a los 44px del círculo con la bandera del Principado de Asturias.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v219-brand-size-opt`, query strings actualizadas a `?v=2.1.9`.

## [2.1.8] - 2026-10-14

### 💛💙 Unificación Tipográfica MeteoAsturLode con Colores de la Bandera de Asturias (Feedback Lendo)
- **Fusión de Marca en 1 Sola Línea Compacta:**
  - El título de la aplicación se unifica en una sola palabra continua: `MeteoAsturLode`.
  - Escala tipográfica compacta y proporcionada (reducida de 1.75rem a 1.45rem en escritorio/tablet y 1.25rem en móviles con `white-space: nowrap`), liberando valioso espacio vertical para que las tarjetas del tiempo y alertas luzcan más altas y accesibles.
- **Bicolor Bandera de Asturias:**
  - `MeteoAstur`: Gradiente azul Cantábrico brillante (`#ffffff` a `#38bdf8`) con resplandor atmosférico.
  - `Lode`: Oro resplandeciente de la Cruz de la Victoria (`#fef08a`, `#facc15` y `#f59e0b`), actuando como separador visual óptico y firma de autor de máxima categoría.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v218-branding-bandera-asturias`, query strings actualizadas a `?v=2.1.8`.

## [2.1.7] - 2026-10-14

### 📈 Alineación Integrada de la Curva Térmica bajo la Temperatura (Feedback Lendo)
- **Anclaje Natural en Columna Izquierda (Ley 11 y Ley 14):**
  - Desplazado el widget de la curva térmica continua 24 horas (`.mini-thermal-widget`) hacia la izquierda (`margin: 10px 0 0 0;`), situándolo directamente bajo la temperatura actual y las píldoras de mín/máx.
  - Erradica el efecto de «isla flotante» que dejaba el widget aislado en el centro de tarjetas anchas en monitores de Windows y tabletas, unificando todo el bloque de datos térmicos en una misma vertical intuitiva.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v217-curva-termica-izquierda`, query strings actualizadas a `?v=2.1.7`.

## [2.1.6] - 2026-10-14

### 🌊🌫️ Icono Vectorial Dinámico para Alertas de Borrina Marina & Niebla de Valle (Feedback Lendo)
- **Erradicación del Glifo Cuadrado Descolorido de Android/Windows:**
  - Sustituido el emoji estándar `🌫️` (que en dispositivos Android y pantallas Windows se representaba como un sello cuadrado blanco-grisáceo plano sin relieve ni contraste) por iconos vectoriales SVG dinámicos a todo color.
- **Iconografía Exclusiva por Tipología de Niebla:**
  - **Borrina Marina Litoral:** Olas del Cantábrico en azul turquesa y marino (`#0284c7`, `#38bdf8`) con franjas de bruma iluminada y micro-partículas flotando sobre el agua, transmitiendo al instante la entrada de niebla desde el mar hacia la costa.
  - **Niebla de Valle / Inversión Térmica:** Siluetas de montaña en cuenca emergiendo sobre el denso mar de niebla atrapado en el fondo del valle.
- **Blindaje Estructural de Cabecera Móvil (Ley 11):**
  - Creado `.borrina-title-group` para que el icono y el título viajen siempre juntos en el mismo renglón, impidiendo que el icono quede huérfano o salte de línea en pantallas estrechas.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v216-icono-vectorial-borrina`, query strings de hojas de estilo y scripts actualizadas a `?v=2.1.6`.

## [2.1.5] - 2026-10-14

### 🌫️ Icono Exclusivo para Borrina Húmeda / Niebla Saturada (Feedback Lendo)
- **Diferenciación Visual Real (`wet-fog` / `🌫️🫧`):**
  - Creado un icono vectorial independiente para la niebla cerrada saturada de humedad (humedad relativa en superficie ≥95%, cielo cubierto y lluvia estrictamente 0.0 mm con probabilidad < 20%), separándolo del icono de niebla seca estándar (`fog` / `🌫️`).
- **Diseño Meteorológico Fiel sin Gotas Falsas de Lluvia:**
  - Nube con sutil tinte brumoso húmedo, 4 franjas tupidas de borrina en gradiente azul Cantábrico y dos micro-partículas de condensación en suspensión estática.
  - Refleja fielmente la atmósfera caladora de la borrina costera sin recurrir a gotas de precipitación que confundan al usuario frente al 0% y 0.0 mm de los modelos.
- **Soporte Multi-Tema Completo:** Integrado en todos los packs de iconos (`Astur Cómic`, `Glass`, `Pixel Art`, `Neón`, `Sketch` y `Futuro Clásico`).
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v215-icono-borrina-humeda`, query strings actualizadas a `?v=2.1.5`.

## [2.1.4] - 2026-10-14

### 📈 Ergonomía Visual y Proporción de la Curva Térmica 24h (Feedback Lendo)
- **Tope de Ancho Ergonómico en Pantallas Grandes (Ley 11 y Ley 14):**
  - Acotado el ancho máximo de la tarjeta de la curva térmica continua (`.mini-thermal-widget`) a `440px` y centrado horizontalmente (`margin: 10px auto 0 auto;`).
  - Erradica la distorsión que aplastaba la curva en tabletas y monitores panorámicos de Windows, manteniendo exactamente el mismo relieve sinusoidal, curvatura elegante y proporción estética que en teléfonos móviles.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v214-curva-termica-ergonomia`, query strings de hojas de estilo actualizadas a `components.css?v=2.1.4` y `app.js?v=2.1.4`.

## [2.1.3] - 2026-10-14

### 🌦️ Rescate Inteligente de Orbayu Real & Calibración Cantábrica (Feedback Lendo)
- **Eliminación del Punto Ciego de Llovizna Fina por Desfase de AROME:**
  - Cuando el modelo determinista de alta resolución (AROME, 1.3 km) retrasa la entrada de una masa húmeda atlántica o marca corte seco (`0.0 mm`), pero el modelo europeo (ECMWF IFS, 9 km) constata llovizna activa (código 51 con `≥ 0.1 mm`), el algoritmo de consenso evalúa los chivatos físicos en superficie.
  - Si la humedad relativa en superficie es alta (`≥ 86%`), el cielo está cubierto (`≥ 80%`), la probabilidad del ensamble europeo supera el 40% y no hay radiación solar directa activa, se valida y rescata el **Orbayu real** tanto en tiempo en vivo como en el pronóstico horario inmediato.
  - Activa de inmediato el Semáforu del Paragües (`🟡 Orbayando Agora`), fondo de llovizna con partículas vivas de lluvia y sincronización horaria a 72h.
- **Blindaje Anti-Orbayu Fantasma Preservado:**
  - En días de panza de burro seca o coberturas nubosas altas sin saturación de humedad (< 86% o probabilidad < 40%), se mantiene estrictamente el tiempo nublado seco sin inventar falsas lluvias.
- **Coherencia Visual Estricta Niebla vs. Orbayu (Feedback Lendo):**
  - Erradicada la discordancia que mostraba icono de llovizna (nube con 1 gota) en horas con 0% de probabilidad y 0.0 mm. Si la probabilidad es nula (< 20%) y no llueve, las nieblas de inversión o madrugada se clasifican limpiamente con icono de `🌫️ Borrina / Niebla húmeda` sin gotas de agua, preservando la honestidad matemática sin inventar lluvia.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v213-rescate-orbayu` y query strings `?v=2.1.3`.

## [2.1.2] - 2026-10-13

### ⛷️ Armonización Diurna en Horario de Pistas de Esquí (Feedback Lendo & Cefe)
- **Eliminación de Falsas Contradicciones Cielo Diurno vs. Nocturno:**
  - El icono meteorológico principal y la descripción superior de cada jornada en las estaciones de esquí ahora se calculan a partir de la franja horaria real de funcionamiento de remontes (09:00 a 17:00).
  - Si durante las horas de esquí el cielo está despejado tanto por la mañana como por la tarde, la tarjeta se armoniza mostrando `☀️ Despejado / Sol`, evitando que nubes, nieblas o estratos de la madrugada (a las 04:00 o 06:00 de la mañana) marquen erróneamente el día entero como "Nublado".
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v212-armonizacion-esqui` y query strings `?v=2.1.2`.

## [2.1.1] - 2026-10-13

### 🎿 Cefe Edition: Previsión de Esquí a 7 Días & Detector de Ventisca Vespertina (Feedback Tester Cefe)
- **Horizonte Extendido a 7 Días (Semana Completa de Esquí):**
  - Las fichas de estaciones invernales (Valgrande-Pajares, Fuentes de Invierno, Leitariegos, San Isidro) amplían su pronóstico de 3 a 7 días en un carrusel táctil suave (`.ski-7days-carousel`) adaptado a móviles.
  - Balance de nieve fresca acumulada: desglose de la semana completa (7 días) junto al balance de los 3 días inmediatos.
- **Desglose en Pistas Mañana vs. Tarde (09-13h vs. 13-17h):**
  - Análisis horario específico para esquiadores y montañeros.
  - Detección proactiva de la clásica trampa cantábrica: alerta destacada `⚠️ Ventisca Tarde` cuando la mañana amanece despejada pero la tarde empeora bruscamente con rachas severas de viento o ventisca de nieve.
  - Indicador fashion `🎿 Cefe Edition` con estilo Liquid Glass y estética moderna.
- **Blindaje Táctil Móvil:** Inclusión de `.ski-7days-carousel` en `isInteractiveZone` de `js/app.js` y `touch-action` en `css/main.css` para scroll horizontal nativo sin saltos de menú.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v211-esqui-cefe-edition` y query strings `?v=2.1.1`.

## [2.1.0] - 2026-10-13

### 🛡️ Blindaje Táctil del Carrusel de Titulares Inteligentes (Feedback Lendo)
- **Inmunidad al Swipe de Pantalla Completa:**
  - Inclusión de `.chart-smart-digest` y `.digest-chip` en la función de protección `isInteractiveZone` de `js/app.js`.
  - Al arrastrar el dedo horizontalmente en teléfonos móviles sobre las tarjetas de hitos clave («Sin lluvia», «Contraste térmico», «Rachas de viento», etc.), el scroll horizontal pertenece estrictamente al carrusel sin activar accidentalmente el cambio de menú/pestaña general.
- **Respuesta Táctil Fluida:** Incorporación de `.chart-smart-digest` a la directiva CSS `touch-action: pan-x pan-y;` en `css/main.css`.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v210-blindaje-tactil-digest` y query strings `?v=2.1.0`.

## [2.0.9] - 2026-10-13

### 📈 Observatorio Gráfico Vivo: Cinta Horaria Sincronizada (Estilo Windy/Meteoblue), Titulares Inteligentes (Smart Digest) y Modos Nieve & Nubosidad (Feedback Lendo)
- **Cinta Horaria Sincronizada de Cielo y Viento:** Superpuesta directamente sobre la gráfica en scroll horizontal, mostrando alineado columna a columna con el eje de horas:
  - Icono meteorológico del tiempo en esa hora (`☀️`, `⛅`, `🌧️`, `🌨️`, `⛈️`).
  - Probabilidad de precipitación (`%`).
  - Velocidad del viento (`km/h`) con distinción cromática ámbar en rachas vivas y rumbo cardinal (`N`, `NE`, `S`, `NO`...).
- **Titulares Inteligentes / Hitos Clave (Smart Digest):** Carrusel horizontal con tarjetas analíticas calculadas en tiempo real:
  - *Ventana sin nubes:* Intervalos de horas consecutivas de sol despejado (ej. "Mañana de 11h a 18h").
  - *Pico de lluvia y acumulado:* Momento exacto de mayor precipitación en mm/h y balance total.
  - *Racha máxima de viento:* Velocidad punta y dirección cardinal.
  - *Contraste y Amplitud Térmica:* Diferencia entre mínima y máxima del tramo.
  - *Proyección de nieve fresca:* Alerta en cm si hay cota en la Cordillera.
- **Nuevos Modos Gráficos Especializados Asturianos:**
  - *🏔️ Nieve & Cota:* Curva continua de altitud de cota (0°C en metros) combinada con hidrograma de nieve horaria acumulada en cm.
  - *☁️ Nubosidad:* Porcentaje de cobertura de cielo (%) con desglose de horas despejadas, mixtas y cubiertas.
- **Ergonomía Móvil y Blindaje Anti-Desborde (Ley 11 & Ley 14):** Inmunidad visual en pantallas móviles de 320px a 380px.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v209-meteorologia-grafica-viva` y query strings `?v=2.0.9`.

---

## [2.0.8] - 2026-10-13

### ⛷️ Esquí & Cordillera Cantábrica: Previsión Meteorológica Completa a 3 Días y Tiempo en Pistas (Feedback Tester de Esquí)
- **Tiempo General Actual en Pistas:** Integración en la cabecera de las 4 estaciones invernales (Valgrande-Pajares, Fuentes de Invierno, San Isidro y Leitariegos) de una pastilla informativa con el estado del cielo y tiempo en vivo (`☀️ Soleado`, `❄️ Nevando en pistas`, `☁️ Cubierto`...).
- **Previsión de 3 Días (Hoy, Mañana, Pasado):** Incorporación de un panel desglosado con:
  - Icono del tiempo general previsto para cada jornada.
  - Temperaturas mínimas y máximas calculadas a cota media de estación.
  - Viento medio y rachas máximas estimadas (`💨 km/h`), con alerta visual (`gale-warning`) cuando las rachas comprometen la operatividad de los remontes.
  - Nieve fresca acumulada prevista por jornada y balance total a 3 días.
- **Doctrina Anti-Desborde (Ley 11):** Cuadrícula ergonómica de 3 columnas (`ski-3days-grid`) con visualización impecable en resoluciones móviles estándar.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v208-esqui-prevision-pistas` y query strings `?v=2.0.8`.

---

## [2.0.7] - 2026-10-13

### 🌧️ Calibración Cantábrica: Detector Asturiano de Orbayu de Niebla / Meona (Feedback Lendo)
- **Resolución del Punto Ciego de Modelos Numéricos:** Resuelve la anomalía en la que el modelo numérico envía código WMO 3 (Cubierto) o 45/48 (Niebla) y precipitación 0.0 mm por falta de peso hidrostático en la cazoleta del pluviómetro, pero la atmósfera está en condensación líquida activa mojando el asfalto.
- **Criterios Físicos Rigurosos de Activación:** Se detecta automáticamente ante saturación extrema de humedad (`humidity >= 94%`), cielo cerrado (`cloudCover >= 85%` o código 3/45/48), ausencia de radiación solar directa y techo bajo con visibilidad reducida (`visibility <= 2.500 m`, o `humidity >= 95%` en ausencia de sensor de visibilidad).
- **Etiquetado Fidedigno Asturiano:** Clasifica con exactitud como **«Orbayu meón (Llovizna fina)»** (o *«Orbayu meón nocturno»*) con icono `🌦️`, fondo dinámico de lluvia (`drizzle`) y gotas vivas.
- **Blindaje Anti-Orbayu Fantasma 100% Intacto:** Se mantiene estrictamente el filtro anti-fantasma (anulación de código 51 a nublado seco si la humedad es `< 94%`), impidiendo que en días secos de panza de burro se invente lluvia ficticia.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v207-orbayu-niebla-meona` y query strings `?v=2.0.7`.

---

## [2.0.6] - 2026-10-12

### 🌫️ Calibración Cantábrica: Detector Integral de Borrina Marina en los 20 Concejos Costeros (Feedback Lendo)
- **Sensibilidad Nocturna Calibrada:** Adaptación de los umbrales de saturación costera en horas nocturnas (`is_day === 0`), fijando activación con humedad relativa `≥ 88%` y margen de rocío `dewSpread ≤ 1.8 °C`. Captura con fidelidad la entrada y estancamiento de niebla marina arrastrada hacia el litoral (verificado en Salinas y toda la rasa costera asturiana).
- **Cobertura Costera Integral de los 20 Concejos:** Incorporación completa de la totalidad de municipios con litoral de Asturias (Castropol, Tapia de Casariego, El Franco, Coaña, Navia, Valdés, Cudillero, Muros de Nalón, Soto del Barco, Castrillón, Avilés, Gozón, Carreño, Gijón, Villaviciosa, Colunga, Caravia, Ribadesella, Llanes y Ribadedeva).
- **Armonización Visual con Luna y Nube:** La cabecera se viste con `☁️🌙 partly-cloudy-night` mientras la borrina permanezca activa sobre la costa de noche.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v206-borrina-costera-cantabrico`.

---

## [2.0.5] - 2026-10-12

### 🌙 Armonización Visual Nocturna ante Borrina y Niebla Costera (Feedback Lendo)
- **Sincronización Realista del Cielo Nocturno:** Cuando el detector oficial de borrina marina o niebla en fondo de valle está activo en Asturias (humedad relativa saturada y condensación en superficie), la tarjeta principal sustituye la luna despejada con estrellas por la **Luna con Nube (`☁️🌙 partly-cloudy-night`)**.
- **Coherencia Visual Inmediata:** Elimina la contradicción estética de mostrar una noche despejada de postal cuando la atmósfera en tierra está cubierta por un manto de niebla marina o bruma densa con visibilidad reducida.
- **Inmunidad Integral de Sensores:** Mantiene intacta la jerarquía de precipitaciones (lluvia, nieve, granizo), alertas de viento, avisos de AEMET y calibraciones diurnas de resol y panza de burro.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v205-armonizacion-nocturna-borrina`.

---

## [2.0.4] - 2026-10-12

### ⛅ Blindaje Anti-Falso Sol Costero y Nubes Bajas Asturianas
- **Detección Fiel de Estratos y Panza de Burro Costera:** Corrección de la simetría inversa física cuando el modelo numérico pronostica código despejado (`code 1`) pero en el litoral asturiano los sensores demuestran humedad casi saturada (`≥ 90%`), presencia de estratos bajos (`cloud_cover ≥ 35%`) y ausencia de radiación solar directa (`< 80 W/m²`).
- **Desempate Realista Nowcasting:** Reasigna a `⛅ Parcialmente nublado / Intervalos nubosos` o `☁️ Nublado / Cubiertu` (si la cobertura es `>= 70%`), erradicando la contradicción visual en concejos de costa (Castrillón, Gijón, Gozón, etc.).
- **Inmunidad de Parámetros Preexistentes:** La soberanía de la radiación solar directa a mediodía, el detector de *Resol / Sol tamizáu* (`🌥️`) y los filtros estrictos de lluvia y orbayu físico (`p >= 0.1 mm` o `h >= 94%`) se mantienen completamente inalterados.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v204-calibracion-falso-sol-costero`.

---

## [2.0.3] - 2026-10-12

### 📈 Mini-Gráfico Térmico Continuo 24h (Hero Card)
- **Curva Térmica Spline:** Incorporación de una curva continua suave con gradiente térmico de 24 horas dentro de la tarjeta principal, proyectando la evolución de la temperatura de 00:00 a 23:59h.
- **Punto Vivo Horario:** Indicador pulsante situado en tiempo real sobre el minuto exacto de la jornada, facilitando la lectura inmediata de la tendencia térmica.
- **Mínimas y Máximas Dinámicas:** Rotulación discreta de los picos térmicos del día sin saturar la vista.
- **Inmunidad Anti-Desborde (Ley 11):** SVG vectorial nativo sin dependencias pesadas adaptado con fluidez a cualquier ancho móvil.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v203-curva-termica-24h`.

---

## [2.0.2] - 2026-10-12

### 🚗 Accesos Viales a Estaciones de Esquí en Puertos de Montaña
- **Diagnóstico Vial de Acceso a Estaciones:** Los puertos de montaña que conectan con los dominios esquiables (Pajares N-630 hacia Valgrande-Pajares, San Isidro AS-112/LE-331 hacia Fuentes de Invierno y San Isidro, y Leitariegos AS-213) cuentan ahora con un distintivo dinámico de accesibilidad invernal.
- **Semáforo de Accesibilidad a Pistas:** Evalúa si el firme está limpio hasta el parking de la estación (`🎿 Carretera despejada`), si se requiere precaución por heladas o si es obligatorio el uso de cadenas/neumáticos de invierno (`⛓️ Cadenas obligatorias`).
- **Doctrina de Blindaje Anti-Desborde y Armonía Visual (Leyes 11 y 14):** Integración homogénea de pastillas ergonómicas tanto en arterias principales como en los sectores de montaña.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v202-accesos-puertos-esqui`.

---

## [2.0.1] - 2026-10-12

### 🎿 Parte de Nieve y Estado de Pistas de Esquí (Cordillera Cantábrica)
- **Dominio Esquiable y Km en Vivo:** Monitor dinámico en cada estación (Valgrande-Pajares, Fuentes de Invierno, San Isidro y Leitariegos) mostrando los kilómetros esquiables disponibles respecto al dominio total de la estación.
- **Desglose de Pistas por Colores:** Conteo visual ergonómico de pistas operativas clasificadas por niveles de dificultad (🟢 Verdes, 🔵 Azules, 🔴 Rojas y ⚫ Negras) y pistas abiertas/totales.
- **Remontes y Espesores de Nieve:** Seguimiento de remontes mecánicos operativos y cotas de nieve mínima y máxima en pistas (cm).
- **Acceso Oficial Directo:** Enlace integrado al parte diario oficial del Principado de Asturias (`deporteasturiano.org`) y centrales de estaciones para contraste en tiempo real.
- **Doctrina de Simulacro (Ley 12):** Activación de prueba mediante parámetro en URL (`?test=esqui` o `?test=pistas`) para inspeccionar el panel invernal en cualquier momento.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v201-partes-nieve-esqui`.

---

## [2.0.0] - 2026-10-05

### 🚀 Novedades Oficiales de la Versión 2.0 (Google Play Store & PWA)
- **Detección de folixas y festivos:** Reconocimiento automático en los 78 concejos de Asturias con historia y tradiciones (`festivosData.js`, `currentCard.js`).
- **Planes y Ocio Climático:** Asesor inteligente comarcal para saber qué hacer o visitar según el tiempo en vivo (sol, lluvia o frío) en las 6 comarcas asturianas (`tourismData.js`, `tourismCard.js`).
- **Mareas del Cantábrico:** Motor armónico autónomo de 6 constituyentes astronómicos y predicción del estado del mar de alta precisión calibrada con el Instituto Hidrográfico de la Marina (IHM) a 3 minutos (`tides.js`, `marineCard.js`).
- **Calibración Solar Inteligente:** Detección pionera de resol y sol tamizado en superficie mediante sensores de radiación directa perpendicular (`weatherIcons.js`, `weatherApi.js`).
- **Nuevo Icono y Rendimiento:** Nuevo diseño del escudo oficial de Asturias con la Cruz de la Victoria sobre azul Cantábrico, mejoras de fluidez y estabilidad.
- **Detector de Borrina Marina y Nieblas de Valle (Estilo Alertas AEMET):** Rediseño visual prominente con gradientes luminosos y resplandor dinámico en amarillo ámbar (warning - visibilidad reducida) y carmesí (severe - visibilidad muy reducida), adaptado con la calibración del Cantábrico para exigir visibilidad real estricta <= 200 m antes de disparar el nivel rojo.
- **Detector Silencioso de Mar de Fondo y Golpe de Mar (marFondoDetector.js):** Nuevo monitor costero con aviso amarillo (resaca peligrosa y período largo >= 11s) y rojo carmesí (golpes de mar severos en espigones, paseos y acantilados con períodos >= 12-16s y oleaje masivo), con ficha didáctica (*💡 ¿Por qué ocurre?*) y simulacro Ley 12 (?test=mar_fondo y ?test=mar_fondo_rojo).
- **Radar Temporal Interactivo con Slider (mapRadar.js):** Nueva barra de control temporal con botones paso a paso (⏮️ / ◀ -10m / +10m ▶ / ⏭️ Ahora) y deslizador táctil horizontal para inspeccionar la evolución de la lluvia fotograma a fotograma en el pasado reciente y en la proyección inmediata (Nowcasting).
- **Detector Silencioso e Inteligente de Nevadas y Cota («Alerta Nieve») (snowDetector.js):** Monitor preventivo para las próximas horas que calcula la cota de nieve física según la altitud de cada concejo asturiano, con 3 niveles: alerta histórica en costa (cota cero < 200 m), aviso en cotas bajas y valles habitados (200-600 m), y temporal copioso en montaña. Incluye ficha didáctica en el modal explicativo y simulacro Ley 12 (?test=nieve, ?test=cota, ?test=snow).
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v200-gran-actualizacion-playstore` y módulos JS a `?v=2.0.0`.

---

## [1.1.85] - 2026-10-04

### 🎪 Detección Automática de Días Festivos y Folixas ("¡Hoxe tamos de Folixa!")
- **Banner Dinámico de Folixa (`festivosData.js`, `currentCard.js`, `components.css`):** Tarjeta luminosa con estética Liquid Glass que se activa automáticamente bajo el bloque principal de tiempo cuando el concejo en pantalla celebra su festivo local o patronal.
- **Cómputo Astronómico de Pascua (Meeus/Butcher):** Algoritmo autónomo para el cálculo exacto del Domingo de Resurrección, permitiendo sincronizar las fiestas móviles asturianas (Antroxu en Gijón, El Bollo en Avilés, Balesquida y Martes de Campo en Oviedo) sin APIs externas.
- **Ficha Didáctica Explicativa (`#explain-modal`):** Botón táctil *💡 ¿Qué se celebra?* que despliega en el modal de la app la historia, tradición marinera/vaqueira, gastronomía de prao (pote, frixuelos, bollo, sidra) y recomendaciones meteorológicas.
- **Doctrina de Simulacro (Ley 12):** Interruptor de prueba controlado mediante parámetro en URL (`?test=folixa` o `?test=fiesta`) para verificar el banner en cualquier momento y concejo.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v1185-folixas-fiestas-locales` y módulos JS a `?v=1.1.85`.

---

## [1.1.84] - 2026-10-04

### 💡 Fichas Didácticas Interactivas en Planes de Ocio ("Explícame: ¿Por qué hoy?")
- **Bombilla Táctil Interactiva (`tourismCard.js`, `tourismData.js`, `app.js`):** La píldora del consejo meteorológico de cada plan se convierte en un botón interactivo que abre el modal didáctico de la app.
- **Ficha Didáctica Completa por Enclave:** Desglose en 3 bloques por cada uno de los planes del catálogo: Historia/Arquitectura, Comportamiento Meteorológico y Refugio, y Consejos Prácticos de Visita / Gastronomía de proximidad.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v1184-fichas-didacticas-ocio` y módulos JS a `?v=1.1.84`.

---

## [1.1.83] - 2026-10-04

### 🗺️ Módulo 10 Oficial: Planes & Ocio Climático — ¿Qué facer güei?
- **Asesor Meteorológico Dinámico (`tourismData.js`, `tourismCard.js`):** Nuevo motor inteligente comarcal que cruza el tiempo actual en el concejo (lluvia, sol, niebla o frío) con actividades culturales, patrimoniales, miradores y visitas en Asturias.
- **Arquitectura Comarcal Nodriza:** Organización de los 78 concejos en 6 comarcas nodrizas (Costa Central/Avilés, Gijón/Costa Verde, Oviedo/Centro, Cuencas Mineras, Oriente/Picos de Europa y Occidente/Eo-Navia) garantizando propuestas de proximidad a menos de 20-30 minutos.
- **Filtros Ergonómicos y Blindaje Legal (Leyes 11, 15 y 16):** Selector táctil por categoría meteorológica y advertencias institucionales de prudencia y datos abiertos oficiales.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v1183-modulo-10-planes-y-ocio` y módulos JS a `?v=1.1.83`.

---

## [1.1.82] - 2026-10-04

### 📸 Subsanación de Generación de Estampa Compartible "MeteoAstur Instant"
- **Corrección de ReferenceError en Canvas (`shareCardGenerator.js`):** Declarada e inicializada la constante `isImmediate = (step === 0)` dentro del bucle de evolución horaria de las próximas 6 horas de la postal. Resuelve el error `isImmediate is not defined` que provocaba la caída al bloque `catch` e impedía la generación visual de la postal en móviles y escritorio.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v1182-fix-estampa-share-card` y módulos JS a `?v=1.1.82`.

---

## [1.1.81] - 2026-10-03

### 🚨 Integración Oficial de Avisos AEMET en Tiempo Real (Ley Específica 1)
- **Conexión con MeteoAlarm Oficial:** Implementado flujo automatizado en la rama `data` para descargar de forma recurrente los avisos meteorológicos oficiales de AEMET para España, filtrando y aislando las 5 zonas de Asturias.
- **Reestructuración de la Tarjeta AEMET (`weatherAlerts.js`):** La tarjeta principal muestra ahora la realidad oficial estricta de AEMET para el concejo, respetando la demanda del usuario (*"Si dan alertas no puede ser que diga sin alertas"*). Se mantiene de forma secundaria la estimación local como mecanismo de resiliencia (`Fallback`) si el servidor oficial falla.
- **Cache-Busting Garantizado (Ley 4):** Service Worker actualizado a `meteoasturlode-v1180-avisos-oficiales-aemet` y scripts a `?v=1.1.81`.

---

## [1.1.79] - 2026-10-03

### ⏱️ Robustez de Indexación Temporal por Timestamp Local en Pronóstico y Gráficas (Ley Específica 12.13)
- **Erradicación del Cursor Ciego de Horas (`forecastView.js`, `chartsView.js`, `compareView.js`):**
  - Se erradica por completo la asunción de que la posición 0 del array `hourly.time` de la API corresponde a las 00:00 de hoy (`for (let i = currentHour; ...)`).
  - El Pronóstico Horario 72h, la Suite Multivariable de Gráficas y el Comparador Climático ahora localizan de forma matemática e infalible su índice de arranque (`startIndex`) mediante comparación con el timestamp local exacto: `const startIndex = hourly.time.findIndex(t => t >= currentHourStr)`.
- **Nowcasting y Curvas Armonizadas:**
  - Las evaluaciones de Nowcasting en tiempo real (irradiancia directa perpendicular, UV, radiación solar y nubosidad) se sincronizan con `startIndex` (`i === startIndex || i === startIndex + 1`), garantizando que tanto el carrusel de 72 horas como el trazado de la gráfica arranquen siempre en el punto temporal fidedigno, con independencia de husos o arrays con histórico de horas pasadas.
- **Cache-Busting Garantizado (Ley 4):**
  - Service Worker actualizado a `meteoasturlode-v1179-cursor-temporal-robusto` y script `app.js?v=1.1.79`.

---

## [1.1.78] - 2026-10-03

### 🌧️ Rigor en el Pluviómetro Digital y Diferenciación Acumulada vs Prevista (Ley Específica 12.12)
- **Diferenciación Física Estricta en el Sensor del Pluviómetro (`currentCard.js`):**
  - Se erradica la confusión entre lluvia caída y pronóstico. El valor principal en grande del pluviómetro ahora muestra con exactitud el **Agua caída hoy hasta la hora actual** (sumando las horas transcurridas en `hourly.precipitation`), evitando que en mañanas secas con tormenta prevista por la tarde el sensor muestre falsos acumulados pasados.
  - Se incorpora como métrica destacada el **Total previsto hoy (24h)** (`daily.precipitation_sum[0]`) para que el usuario conozca con total transparencia la proyección completa del día.
- **Corrección Cronológica de Probabilidad Horaria e Intensidad en Vivo:**
  - Corregido el índice que leía la hora en curso llamándola "próxima hora". El sensor ahora detalla con precisión: *Probabilidad hora actual (Xh) ➔ Próxima hora (Yh)*.
  - Muestra la intensidad en tiempo real: *Lloviendo ahora: X mm/h* o *Sin lluvia en este momento*.
- **Cache-Busting Garantizado (Ley 4):**
  - Service Worker actualizado a `meteoasturlode-v1178-pluviometro-rigor-caida-prevista` y script `app.js?v=1.1.78`.

---

## [1.1.77] - 2026-10-03

### 🚨 Inmunidad al Desfase UTC y Sellado Horario Local en Detectores y Modelos (Ley Específica 12.11)
- **Erradicación del Atraso de 2 Horas en la Galerna Cantábrica (`galernaDetector.js`):**
  - Sustituida la llamada a `new Date().toISOString().slice(0, 13)` por formateo de hora local asturiana real (`YYYY-MM-DDTHH`).
  - Corrige el desfase de 2 horas (UTC+2 en verano / UTC+1 en invierno) que obligaba al detector a comparar la temperatura contra registros de hacía 3 a 5 horas, restaurando el principio de nowcasting para comparar fielmente la caída térmica en los últimos 60 a 120 minutos reales.
  - Se erradica el fallo de indexación nocturna entre las 00:00 y las 01:59 h donde `toISOString` caía a la fecha del día anterior y forzaba un fallback a las 12:00 del mediodía.
- **Corrección de Medianoche en Previsión Semanal de Surf (`surfCard.js`):**
  - Sustituida la traslación con `toISOString().split('T')[0]` por composición de fechas de calendario local (`YYYY-MM-DD`).
  - Erradica el bug de medianoche que desfasaba el parte matinal de olas (11:00 h) hacia la jornada anterior.
- **Blindaje de Días Naturales en el Mareógrafo de 72h (`tides.js`):**
  - Sustituida la suma de milisegundos planos (`24 * 3600 * 1000`) por adición natural de días de calendario (`new Date(y, m, d + offset)`), garantizando inmunidad a desajustes de 1 hora en los cambios oficiales de hora estacional (DST).
- **Cache-Busting Garantizado (Ley 4):**
  - Service Worker actualizado a `meteoasturlode-v1177-inmunidad-utc-horarios` y script `app.js?v=1.1.77`.

---

## [1.1.76] - 2026-10-03

### 🛡️ Visión Dual en Viaductos y Avisos Oficiales AEMET (Ley Específica 12.10)
- **Superación de la Foto Fija en Avisos AEMET (`weatherAlerts.js`):**
  - El motor de alertas oficiales evalúa simultáneamente el tiempo en vivo y la previsión máxima de la jornada:
    - **Viento:** Consulta `daily.wind_gusts_10m_max[0]` y localiza el pico horario en las próximas 24 horas (`hourly.wind_gusts_10m`). Se erradica la ceguera de mañanas tranquilas con temporal vespertino previsto, activando el aviso con validez y hora estimada (ej. *Previsto hoy • Pico máximo de 92 km/h hacia las 17:00 h*).
    - **Fenómenos Costeros:** Consulta la altura de ola máxima esperada en 24 horas (`marineHourly.wave_height`) y rachas costeras, avisando con antelación ante la llegada de mar arbolada o muy gruesa.
    - **Nevadas:** Evalúa la cota mínima de nieve en 24 horas (`hourly.freezing_level_height`) y la hora de mayor descenso para puertos y cotas bajas.
- **Preaviso Preventivo en Viaductos y Autovías (`roadWindDetector.js`):**
  - Implementación de la distinción operativa vial:
    - **En Curso (Tiempo Real):** Si las rachas actuales son `>= 65 km/h` o `>= 85 km/h`, el sistema emite alerta severa o precaución en vivo con sus correspondientes badges y consejos de sujeción de volante.
    - **Preaviso para Hoy (Previsión):** Si el viento actual es moderado pero los modelos numéricos prevén rachas de `>= 65 km/h` o `>= 85 km/h` durante la jornada, la tarjeta emite un preaviso preventivo detallando el pico esperado y la hora crítica para planificar desplazamientos de caravanas, furgonetas y motocicletas.
  - La píldora ergonómica del Anemómetro (Sensor #1) refleja fielmente el estado: *🕒 Preaviso viento hoy (XX km/h)* o *🚨 Viento lateral en vivo (XX km/h)*.
- **Cache-Busting Garantizado (Ley 4):**
  - Service Worker actualizado a `meteoasturlode-v1176-vision-dual-viaductos-aemet` y query strings `app.js?v=1.1.76`.

---

## [1.1.75] - 2026-10-03

### ⚖️ Sincronización Total del Comparador Climático con Leyes 7, 12 y 14 (Feedback Lendo)
- **Calibración Solar Inteligente (Ley 7) y Filtro Anti-Orbayu (Ley 12.1):**
  - El comparador de concejos cara a cara (`compareView.js`) ahora procesa todos los sensores físicos del observatorio (`direct_normal_irradiance`, `shortwave_radiation`, `uv_index`, `cloud_cover`, `is_day`, `relative_humidity_2m` y `precipitation_probability`).
  - Si un concejo se encuentra bajo condiciones de *Resol / Sol tamizáu*, el comparador lo identificará con total fidelidad en lugar de degradarlo a nublado o sol plano.
  - El filtro anti-orbayu evita falsas alarmas de llovizna si la humedad es inferior al 94% con 0.0 mm.
- **Detección Nocturna Real:**
  - Erradicado el fallo visual que mostraba un sol a medianoche en noches despejadas; ahora muestra con exactitud la luna nocturna.
- **Doctrina de Armonía Visual y Acabado Integral (Ley 14):**
  - Sustituidos los emojis planos por el motor de renderizado de iconos dinámicos SVG asturianos (`renderWeatherIconHtml`) del sistema en ambas columnas comparativas.
- **Cache-Busting Garantizado (Ley 4):**
  - Service Worker actualizado a `meteoasturlode-v1175-comparador-calibracion-solar`, hoja de estilos `components.css?v=1.1.75` y script `app.js?v=1.1.75`.

---

## [1.1.74] - 2026-10-03

### 🌊 Unificación Oficial de la Escala Douglas (IHM / Puertos del Estado / OMM)
- **Centralización y Rigor Náutico Oficial (Ley 12, Punto 8):**
  - Implementación de la función centralizada `getDouglasScale(heightM)` en `marineCard.js` conforme al estándar de la Organización Meteorológica Mundial (OMM Código 3700), el Instituto Hidrográfico de la Marina y Puertos del Estado.
  - Sincronización idéntica entre **Playas & Mareas** y **Surf & Rompientes**: ambas tarjetas importan y ejecutan exactamente la misma función, eliminando desfases donde un mar de 2.55 m se rotulaba como Marejada en una tarjeta y Fuerte Marejada en otra.
  - Clasificación oficial rigurosa:
    - `0 a 0.10 m`: Mar Llana / Rizada (Grado 0–1)
    - `0.10 a 0.50 m`: Marejadilla (Grado 2)
    - `0.50 a 1.25 m`: Marejada (Grado 3)
    - `1.25 a 2.50 m`: Fuerte Marejada (Grado 4)
    - `2.50 a 4.00 m`: Gruesa / Mar Pesada (Grado 5)
    - `4.00 a 6.00 m`: Muy Gruesa (Grado 6)
    - `>= 6.00 m`: Temporal / Arbolada (Grado 7+)
- **Cache-Busting Garantizado (Ley 4):**
  - Service Worker actualizado a `meteoasturlode-v1174-douglas-oficial-ihm` y script `app.js?v=1.1.74`.

---

## [1.1.73] - 2026-10-03

### 🥾 Sincronización de Rutas & Senderismo con Nowcasting del Paraguas (Feedback Lendo)
- **Nowcasting Real en Marcha (Próximas 6 Horas):**
  - Corrección del desfase en `routesData.js`: se sustituye el bucle estático `i = 0 a 5` (que evaluaba la madrugada de 00:00 a 05:00 del pasado) por el índice de la hora actual (`startIndex`), evaluando las próximas 6 horas reales desde este instante.
  - Sincronización cronológica con el Semáforu del Paragües: si entra lluvia o tormenta por la tarde o noche, la tarjeta de Rutas pasa inmediatamente a estado de aviso con hora estimada (ej. *Lluvia o llovizna prevista hacia las 21:00 h*), erradicando el falso veredicto de «Jornada Ideal de Marcha» ante frentes vespertinos o nocturnos.
- **Calibración Fiel del Firme y Llamuergues:**
  - El Semáforu de Llamuergues evalúa el agua real caída durante las horas previas de la jornada y la precipitación inminente en 2 horas, eliminando la suma ciega de horas futuras no ocurridas.
- **Cache-Busting Garantizado (Ley 4):**
  - Service Worker actualizado a `meteoasturlode-v1173-rutas-nowcasting` y script `app.js?v=1.1.73`.

---

## [1.1.72] - 2026-10-03

### 🌅 Cobertura Temporal Íntegra de 24 Horas en Tarjetas Diarias (Feedback Lendo)
- **Eliminación del Agujero Negro Nocturno (Ley 12, Punto 6):**
  - Corrección de los rangos horarios en el desglose diario de `forecastView.js`. Anteriormente solo computaban de 08:00 a 13:00 (Mañana) y de 14:00 a 21:00 (Tarde), dejando 10 horas completas en un limbo (la madrugada de 00:00 a 07:59 y la noche de 22:00 a 23:59).
  - Ampliación de los tramos para abarcar el 100% de las 24 horas del día:
    - **Tramo Mañana:** De `00:00 a 13:59` (cubre la noche, madrugada y mañana).
    - **Tramo Tarde:** De `14:00 a 23:59` (cubre la tarde y noche completa).
  - Resuelve la desconexión matemática donde borrascas nocturnas de 14–15 mm en la madrugada aparecían como 3.7 mm en la pastilla matinal. Ahora la suma de los tramos concuerda al milímetro con el total acumulado diario y con el Pronóstico Horario a 72 Horas.
- **Cache-Busting Garantizado (Ley 4):**
  - Service Worker actualizado a `meteoasturlode-v1172-cobertura-24h-pronosticos` y script `app.js?v=1.1.72`.

---

## [1.1.71] - 2026-10-03

### 📱 Blindaje Anti-Corte y Fluidez Multilínea en el Semáforu del Paragües (Feedback Lendo)
- **Ergonomía Móvil y Visibilidad Total de la Hora (Ley 11):**
  - Supresión de la regla rígida `white-space: nowrap; text-overflow: ellipsis;` en el titular `.umbrella-strip-title` que truncaba el texto con puntos suspensivos (*«Lluvia copiosa a partir de...»*) en teléfonos móviles (320px–380px).
  - Implementado ajuste multilínea fluido con `white-space: normal; line-height: 1.3; word-break: break-word;` y separación elástica `gap: 6px 8px` en `.umbrella-strip-headline`.
  - Ahora el titular desglosa la hora con nitidez y holgura completa debajo de la pastilla de alarma (ej. *Lluvia copiosa a partir de las 21:00 h*), garantizando que ningún dato clave quede recortado en pantalla pequeña.
- **Cache-Busting Garantizado (Ley 4):**
  - Service Worker actualizado a `meteoasturlode-v1171-antidesborde-paragues`, query strings de hojas de estilo `components.css?v=1.1.71` y script `app.js?v=1.1.71`.

---

## [1.1.70] - 2026-10-03

### 🌂 Sincronización Cronológica Estricta en el Semáforu del Paragües (Feedback Lendo)
- **Diferenciación Rigurosa entre Primera Llovizna y Bastinazu (Ley 12, Punto 5):**
  - Corrección de la anomalía lógica que combinaba la hora de la primera llovizna débil previa (`firstRainIndex`) con la severidad del pico de precipitación posterior (`firstHeavyIndex`).
  - Si en la ventana de 8 horas se prevé lluvia copiosa o bastinazu (`>= 1.5 mm/h`), el titular sitúa con total honestidad la hora exacta de entrada del frente activo (ej. *Lluvia copiosa a partir de las 21:00 h*), sin adelantar erróneamente el bastinazu a las horas de orballu disperso o tregua seca.
  - Si existen lloviznas previas con tregua (ej. 0.1 mm a las 17:00 h y seco de 18:00 a 20:00 h), la descripción detalla fidedignamente: *«Orbayu débil previo a las 17:00 h (~0.1 mm) con tregua; el frente activo (~2.0 mm/h, prob. 88%) entrará a las 21:00 h. Prepara paraguas grande»*.
- **Coherencia Matemática Absoluta:**
  - Plena concordancia cronológica entre la tarjeta superior del Semáforo del Paraguas y la tabla de Pronóstico Horario a 72 Horas.
- **Cache-Busting Garantizado (Ley 4):**
  - Service Worker actualizado a `meteoasturlode-v1170-semaforu-paragues-cronologia` y query strings `?v=1.1.70`.

---

## [1.1.69] - 2026-10-03

### 💧 Calibración Empírica & Filtro Anti-Orbayu Fantasma por Humedad (Feedback Lendo)
- **Filtro Anti-Orbayu Fantasma por Humedad Relativa (Ley 12):**
  - Si el modelo numérico (Open-Meteo / AROME / ECMWF) proyecta código WMO de llovizna (`51`, `53`, `55`, `56`, `57`), pero el pluviómetro determinista registra estrictamente `0.0 mm` en suelo, el sistema evalúa la humedad relativa (`relative_humidity_2m`).
  - **Humedad < 94%:** Se anula la calificación de lluvia activa y se reconduce a **"Nublado / Cubiertu"** con icono `☁️` y tema nublado sin gotas (resuelve el caso clásico de estratocúmulos o panza de burro secos donde no cae ni una gota en la calle).
  - **Humedad >= 94%:** Se valida como **"Orbayu meón / Llovizna fina"**, alertando de aire en saturación extrema capaz de mojar y condensar sobre el usuario sin llegar a hacer bascular la cazoleta del pluviómetro (0.1 mm).
  - **Precipitación >= 0.1 mm:** Se preserva la condición indiscutible de lluvia/llovizna física activa.
- **Sincronización Total de Módulos:**
  - Armonizado en el **Semáforo del Paraguas** (`umbrellaAdvisor.js`) y en el **Asesor de Tendido** (`laundryAdvisor.js`) para evitar que indiquen erróneamente *"Orbayando agora"* o *"Lluvia activa"* con la calle seca.
  - Sincronizado en la tarjeta principal (`currentCard.js`), pronóstico horario (`forecastView.js`), gráficas horarias (`chartsView.js`), postales compartibles (`shareCardGenerator.js`) y locución por voz (`weatherSpeaker.js`).
- **Constitución Específica del Proyecto (`AGENTS.md`):**
  - Incorporado el **Artículo 12 (Protocolo de Calibración Empírica y Ajustes Finos del Clima Asturiano)** en la Parte II, centralizando en una sola tabla todos los umbrales de ajuste manual (Orbayu fantasma, Resol vs. Panza de Burro, QPF-PoP, y Energía de rompiente en arenales).
- **Cache-Busting Garantizado (Ley 4):**
  - Service Worker actualizado a `meteoasturlode-v1169-filtro-anti-orbayu-humedad` y query strings `?v=1.1.69`.

---

## [1.1.68] - 2026-10-02

### 🛡️ Restauración Inmediata de Estabilidad Funcional (Feedback Lendo)
- **Retorno a Versión Estable (Ley 2):**
  - Restauración íntegra de la versión funcional previa 100% operativa (v1.1.66), revirtiendo de raíz los cambios preliminares del módulo de ocio.
- **Purga y Renovación de Caché (Ley 4):**
  - Actualización de la cadena del Service Worker a `meteoasturlode-v1168-restauracion-estabilidad` y query strings `?v=1.1.68` para forzar la recarga limpia e inmediata en dispositivos y PWA.

---

## [1.1.66] - 2026-10-02

### 🎨 Atmósfera Cromática y Acabado Liquid Glass en Pronóstico a 10 Días (Feedback Lendo)
- **Diferenciación Matinal vs. Crepuscular:**
  - La tarjeta de **🌅 Mañana** incorpora un degradado envolvente cálido de sol naciente (`linear-gradient(135deg, rgba(245, 158, 11, 0.13) 0%, rgba(15, 23, 42, 0.72) 100%)`) con borde ámbar suave (`rgba(245, 158, 11, 0.28)`).
  - La tarjeta de **🌇 Tarde** incorpora un degradado azul zafiro/índigo crepuscular (`linear-gradient(135deg, rgba(56, 189, 248, 0.13) 0%, rgba(15, 23, 42, 0.72) 100%)`) con borde celeste suave (`rgba(56, 189, 248, 0.28)`).
  - Se erradica la monotonía visual entre ambas partes del día, permitiendo distinguir de inmediato la evolución del cielo sin esfuerzo lector.
- **Panel General Unificado y Micro-Tintes Temáticos:**
  - Acabado pulido *Liquid Glass* superior (`linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.78) 100%)`) con bisel interior fino y fila de temperaturas destacada en cápsula oscura.
  - Micro-tintes cromáticos individuales para las 4 métricas clave:
    - *💧 Precipitación:* Fondo aguamarina suave (`rgba(14, 165, 233, 0.08)` / `0.22` con lluvia activa).
    - *💨 Viento y rachas:* Fondo plateado / cian tenue (`rgba(148, 163, 184, 0.08)`).
    - *☀️ Índice UV:* Fondo solar ámbar (`rgba(245, 158, 11, 0.08)`).
    - *🌅/🌇 Orto y Ocaso:* Fondo crepuscular violeta tenue (`rgba(168, 85, 247, 0.08)`).
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1166-tarjetas-pronostico-ricas` y query strings `?v=1.1.66` sincronizadas en toda la plataforma.

---

## [1.1.65] - 2026-10-02

### 📱 Blindaje Anti-Corte en Barra Live Inspector y Métricas (Feedback Lendo)
- **Distribución Dual Protegida en Live Inspector Readout (`#chart-live-readout`):**
  - Reestructuración de la barra de lectura en dos áreas flexibles diferenciadas:
    - *Izquierda:* Contexto horario (`🕒 Día Hora • Cielo`) con texto fluido.
    - *Derecha:* Valor métrico blindado con `flex-shrink: 0`, `margin-left: auto` y colores vivos (`1024 hPa`, `21°C`, `2.4mm`, `35 km/h`), impidiendo que el texto numérico se corte por el margen derecho en pantallas móviles.
- **Sintetización Inteligente de Textos y Tiempos:**
  - Supresión automática de coletillas redundantes en el estado del cielo (ej: «de noche / de día»).
  - Abreviatura de horas en pastillas de extremos (`18h` en lugar de `18:00`), garantizando que ninguna cifra quede oculta.
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1165-readout-blindado` y query strings `?v=1.1.65` sincronizadas.

---

## [1.1.64] - 2026-10-02

### 📱 Selector Desplegable Liquid Glass y Tooltip Flotante Silenciado (Feedback Lendo)
- **Pastilla Desplegable de Variables (Opción B):**
  - Sustitución de la fila horizontal de pastillas por un selector desplegable elegante (`[ 🌡️ Térmico ▾ ]`) que comparte la misma fila con el selector de ventana horaria (`24h | 48h | 72h`).
  - Ahorro de una línea completa de altura en pantalla vertical y arquitectura preparada para añadir ilimitadas variables futuras (Radiación UV, Humedad, Punto de rocío, etc.) sin desbordar el diseño móvil jamás.
- **Supresión Definitiva de Cajas Flotantes Cortadas en Móvil:**
  - Configurado `tooltip: { enabled: false }` en Chart.js para apagar el popup nativo flotante que se cortaba en el borde derecho en pantallas móviles de 360px, canalizando el 100% de la interactividad táctil hacia la barra fija superior Live Inspector Readout (`#chart-live-readout`).
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1164-graficos-menu-dropdown` y query strings `?v=1.1.64` sincronizadas.

---

## [1.1.63] - 2026-10-02

### 📱 Optimización de Espacio y Live Inspector en «Meteorología Gráfica» (Feedback Lendo)
- **Barra Fija Superior Live Inspector Readout (`#chart-live-readout`):**
  - Incorporación de una franja de lectura en tiempo real situada justo encima de la gráfica. Al tocar o deslizar el dedo por cualquier punto de la curva horaria, muestra al instante día, hora, descripción meteorológica y valores numéricos exactos, eliminando por completo el problema de los tooltips de Chart.js que se cortaban fuera del marco de la pantalla en los bordes laterales del móvil.
- **Tipografía y Controles Micro-Ajustados (Anti-Desborde Móvil, Ley 11):**
  - Ajuste del título `📈 Meteorología Gráfica` a `1.05rem` (y `0.98rem` en pantallas ultra estrechas `<= 380px`), permitiendo que el selector horario (`24h | 48h | 72h`) conviva holgadamente en la misma fila sin expulsar el botón `72h`.
- **Métricas 2×2 Sintetizadas sin Puntos Suspensivos:**
  - Reducción quirúrgica de etiquetas y decimales en las tarjetas de resumen inferiores (`🔥 Máx`, `❄️ Mín`, `🥵 Sensación`, `↔️ Amplitud`), impidiendo que el texto se trunque con `...` en pantallas de 360px.
- **Tooltips Compactos en Canvas:**
  - Reducción del padding del tooltip interno a 6px, fecha abreviada (`Vie 23:00`), y supresión de cajas de color redundantes para una experiencia visual limpia y precisa.
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1163-graficos-ultra-mobile` y query strings `?v=1.1.63` sincronizadas en toda la aplicación.

---

## [1.1.62] - 2026-10-02

### 📱 Rediseño Limpio y Gráfico Protagonista en «Meteorología Gráfica» (Feedback Lendo)
- **Supresión de Sobrecarga Vertical y Ergonomía Móvil (Ley 11):**
  - El gráfico sube a la parte superior inmediatamente visible sin necesidad de scroll, eliminando subtítulos redundantes y banners gigantes de aviso que desplazaban la gráfica fuera de la pantalla.
- **Cabecera Unificada en 1 Sola Línea:**
  - Título `📈 Meteorología Gráfica` a la izquierda y selector de horas (`24h | 48h | 72h`) integrado a la derecha en la misma fila horizontal.
- **Rejilla 2×2 Compacta de Métricas de Resumen:**
  - Las pastillas de datos clave pasan debajo de la gráfica distribuidas simétricamente en 2 columnas al 50%, manteniendo la pantalla ordenada y limpia.
- **Altura de Lienzo Optimizada:**
  - Ajuste de altura a 340px (310px en smartphones estrechos) para que la gráfica completa y las métricas queden visibles en una sola pantalla.
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1162-graficos-ergonomia-movil` y query strings `?v=1.1.62` sincronizadas.

---

## [1.1.61] - 2026-10-02

### 📈 Transformación a «Meteorología Gráfica» (Feedback Lendo)
- **Suite Multigráfico Especializado de Observatorio Horario:**
  - Sustitución del antiguo panel rígido único de 48h por un observatorio dinámico interactivo con selector de 5 variables meteorológicas táctil Liquid Glass:
    1. *🌡️ Térmico:* Curva de temperatura real (`#38bdf8`) vs. curva de sensación térmica (`#fb923c`) discontinua.
    2. *🌧️ Lluvia:* Hidrograma completo con barras de precipitación horaria (mm/h), probabilidad de lluvia (%) y curva de lluvia acumulada total (mm).
    3. *💨 Viento:* Anemograma continuo con rachas máximas (km/h) y velocidad media del viento.
    4. *🚨 Barómetro:* Barógrafo de presión atmosférica a nivel del mar (hPa) con eje dinámico de alta resolución para detectar frentes, borrascas y galernas.
    5. *📊 Combinado:* La gráfica multivariable clásica con las tres métricas combinadas.
- **Selector de Ventana Temporal (24h / 48h / 72h):**
  - Posibilidad de alternar el alcance temporal con un solo clic/toque, recalculando automáticamente el lienzo táctil con scroll horizontal holgado.
- **Franja Superior de Resumen y Métricas Clave:**
  - Tarjetas compactas con los picos máximos, mínimos, horas exactas de los eventos, lluvia acumulada y tendencias de presión.
- **Renombramiento Oficial en Navegación y Menús:**
  - El módulo 2 pasa a denominarse oficialmente **«Meteorología Gráfica»** en toda la aplicación.
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1161-meteorologia-grafica-suite` y query strings `?v=1.1.61` sincronizadas.

---

## [1.1.60] - 2026-10-02

### 📏 Líneas Divisorias de Cristal Líquido en Hero Card (Feedback Lendo)
- **Estructuración Visual de la Hero Card (Doctrina de Armonía Visual, Ley 14):**
  - Incorporación de dos líneas divisorias sutiles y difuminadas (`1px solid rgba(255, 255, 255, 0.08)`):
    1. Una línea entre la fila principal térmica/acciones y el bloque de *Valores Habituales* (climatología 30 años AEMET).
    2. Otra línea entre *Valores Habituales* y el *Semáforu del Paragües*.
  - Renderizado condicional para que solo se dibujen si los bloques correspondientes están presentes.
- **Espaciado y Ergonomía Móvil (Ley 11):**
  - Ajuste de márgenes simétricos (`margin: 12px 0` con reglas de hermanos adyacentes `margin-top: 0`), permitiendo que las tres zonas respiren y luzcan ordenadas sin añadir scroll vertical.
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1160-hero-dividers` y query strings `?v=1.1.60` sincronizadas en toda la plataforma.

---

## [1.1.59] - 2026-10-02

### 🔊 Boletín Meteorológico Locutado por Voz (Web Speech API)
- **Locución Nativa por Voz en la Hero Card (Feedback Lendo):**
  - Incorporación del botón de audio `🔊` en la barra de herramientas derecha (`.hero-actions-toolbar`) junto a la cámara de la estampa (`📸`).
  - Al pulsarlo, el sintetizador de voz nativo del dispositivo (`window.speechSynthesis`) narra un boletín meteorológico completo en español (`es-ES`) estructurado de forma natural y cercana:
    - *Identificación del concejo y hora del boletín.*
    - *Estado actual del cielo y sensación térmica.*
    - *Valores extremos esperados para hoy (temperatura máxima y mínima).*
    - *Régimen de viento (velocidad en km/h y dirección cardinal).*
    - *Humedad relativa ambiental.*
    - *Precipitación y probabilidad de lluvia según Nowcasting.*
    - *Condición marítima (altura de ola en el litoral para concejos costeros).*
- **Control Interactivo y Feedback Visual Dinámico:**
  - Mientras el boletín está en reproducción, el botón conmuta a `⏹️` con una suave pulsación luminosa cian (`pulseAudioSpeaking`).
  - Al volver a pulsar `⏹️`, la locución se detiene de inmediato.
  - Se detiene automáticamente al cambiar de concejo en el mapa o buscador.
  - Cero dependencias externas (0 KB de librería añadida) y privacidad total (no envía grabaciones ni peticiones a servidores de terceros).
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1159-audio-resumen-voz` y query strings `?v=1.1.59` sincronizadas en toda la aplicación.

---

## [1.1.58] - 2026-10-02

### 🌡️ Rebalanceo Térmico y Toolbar de Acciones en Hero Card (Feedback Lendo)
- **Bloque Térmico Unificado a la Izquierda:**
  - Reubicación de las pastillas de temperatura mínima y máxima (`↓ X°C` y `↑ Y°C`) debajo de la temperatura actual a la izquierda (`.temp-primary-block`).
  - Se aprovecha de forma natural el hueco inferior de la gran cifra de grados, unificando toda la información térmica en una columna vertical sólida.
- **Botonera de Herramientas Ergonómica a la Derecha:**
  - Creación de `.hero-actions-toolbar` en la columna derecha para alojar los botones de interacción del concejo: botón circular de estampa postal (`📸`) y espacio reservado para la futura función de audio resumen con voz (`🔊`).
  - La columna derecha queda despejada, equilibrada y sin acumulación de elementos.
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1158-herocard-rebalance-minmax-toolbar` y query strings `?v=1.1.58` sincronizadas en CSS y módulos JS.

---

## [1.1.57] - 2026-10-02

### 📸 Evolución Horaria Completa en la Estampa Compartible (Feedback Lendo)
- **Suite Horaria Detallada en 6 Mini-Tarjetas Liquid Glass:**
  - Sustitución de los números planos de temperatura por 6 pastillas independientes de cristal translúcido para las próximas 6 horas consecutivas (`Ahora`, `+1h`, `+2h`, `+3h`, `+4h`, `+5h`).
  - **Métricas completas por hora:**
    1. *Hora formateada:* `Ahora`, `18:00`, `19:00`, etc.
    2. *Icono meteorológico en alta resolución:* Sol, Resol asturiano (`🌥️`), Orbayu (`🌧️`), etc. con soporte de nowcasting solar.
    3. *Temperatura destacada:* En tipografía suiza rotunda blanca.
    4. *Pluviómetro de precipitación:* Volumen cuantitativo en milímetros (`💧 1.2mm` en cian brillante o probabilidad `💧 %` / `💧 0 mm`).
    5. *Velocidad del viento:* Anemómetro horario (`💨 km/h`).
- **Preservación Estricta de la Proporción 4:5 (1080×1350 px):**
  - Rebalanceo armónico del lienzo para alojar las tarjetas horarias preservando intactas las 3 cajas métricas (viento, humedad, mar), el refrán popular asturiano y el pie institucional, sin requerir scroll ni desbordar la pantalla del móvil.
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1157-evolucion-horaria-completa-en-estampa` y query strings `?v=1.1.57` sincronizadas en CSS y módulos JS.

---

## [1.1.56] - 2026-10-02

### 📸 Botones Compactos y Supresión Total de Scroll en Modal de Estampa (Feedback Lendo)
- **Eliminación de Subtítulos Secundarios (Ergonomía Móvil y Doctrina 11):**
  - Supresión de los textos secundarios explicativos dentro de los botones de acción inferior, dejando exclusivamente los títulos limpios y claros: **`📲 Compartir en redes`** y **`💾 Guardar postal`**.
- **Supresión de la Barra de Desplazamiento Vertical:**
  - Ajuste dimensional del modal y de la previsualización (`max-width: 250px`), reduciendo los paddings y márgenes verticales para que la postal completa y los dos botones entren de forma armónica y holgada en la pantalla de cualquier smartphone sin generar barra de scroll vertical.
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1156-botones-compactos-sin-scroll` y query strings `?v=1.1.56` sincronizadas en CSS y módulos JS.

---

## [1.1.55] - 2026-10-02

### 📸 Rediseño Minimalista del Botón de Cámara y Blindaje de Escalado de la Estampa
- **Botón de Cámara Minimalista en Hero Card (Feedback Directo de Lendo):**
  - Sustitución de la pastilla con texto por un elegante botón circular minimalista de 32px (`📸`) con estética Liquid Glass pura, sin texto innecesario y perfectamente alineado con las pastillas de temperaturas mínima y máxima.
  - Supresión del botón duplicado en la barra superior de herramientas para evitar cualquier sobrecarga o colisión en pantallas móviles estrechas (Doctrina Constitucional 11 de Ergonomía Móvil).
- **Blindaje Estricto de Escalado en el Modal de Vista Previa:**
  - Inmunización absoluta contra cachés lentas mediante estilos inline aplicados directamente sobre el elemento `<img>` (`width: 100%; max-width: 270px; margin: 0 auto; height: auto; border-radius: 16px;`), impidiendo que el lienzo de alta resolución (1080×1350 px) se desborde o se muestre gigante en pantallas de teléfono.
  - Contenedor de vista previa con sombra de cristal sutil y encaje vertical ergonómico dentro de los límites del viewport móvil (`max-height: 88vh`).
- **Cache-Busting y Sincronización:**
  - Cadena de Service Worker actualizada a `meteoasturlode-v1155-fix-estampa-boton-y-preview` y query strings `?v=1.1.55` sincronizadas en CSS y módulos JS.

---

## [1.1.54] - 2026-10-02

### 📸 Nueva Función Social: «MeteoAstur Instant» (Estampa Visual Compartible)
- **Generación Local Instantánea mediante Canvas (100% en Cliente):**
  - Nuevo módulo independiente `js/utils/shareCardGenerator.js` que renderiza al vuelo en menos de 30 ms una postal visual en resolución premium vertical de 1080&times;1350 px (proporción estándar 4:5 de WhatsApp e Instagram Stories).
  - Cero dependencias externas y cero coste de servidor: utiliza la API nativa de `<canvas>` sin subir archivos a servidores intermedios.
- **Estética Liquid Glass y Toque Asturiano Genuino:**
  - **Fondo dinámico adaptativo:** El lienzo adopta el color atmosférico del cielo en tiempo real (azul cobalto cálido para resol y sol, azul cosmos estrellado para noche, pizarra atlántica para orbayu y violeta para tormentas).
  - **Identidad local:** Muestra el nombre del concejo con tipografía suiza rotunda, localidades subordinadas (ej. *Castrillón - Piedras Blancas / Salinas*), altitud, fecha y hora actual en asturiano/castellano.
  - **Gran bloque térmico:** Temperatura destacada a gran escala, condición meteorológica fidedigna (incluyendo etiquetas asturianas como *«Resol / Sol tamizáu»* u *«Orbayu manso»*), sensación y extremas.
  - **Trilogía métrica:** Tres cajas compactas con viento y rachas, humedad/lluvia acumulada y estado del Cantábrico (oleaje/rompiente si es costero) o confort de marcha.
  - **Refrán Popular Asturiano:** Franja elegante con dichos tradicionales del refranero meteorológico asturiano (*«El tiempu n'Asturies camuda más que l'orballu na yerba»*, *«Si ves la mar berrar, pon la proa pal varaderu»*, etc.).
  - **Firma y sello:** Marca de agua elegante *MeteoAstur Lode • zeustata.github.io/tiempo*.
- **Integración con Web Share API y Guardar en Galería:**
  - Soporte nativo para compartir directo mediante `navigator.share`: abre la bandeja del teléfono para enviar la estampa con un solo clic a grupos o estados de WhatsApp, Instagram Stories o Telegram.
  - Botón de guardado local (*«Guardar Postal»*) para descargar el archivo PNG directamente en la galería del dispositivo o PC.
- **Accesos Ergonómicos en Interfaz:**
  - Botón directo `📸` en la barra de herramientas superior de la aplicación.
  - Pastilla interactiva `📸 Compartir` incrustada de forma ergonómica en la fila de temperaturas de la propia Hero Card.
- **Cache-Busting Sincronizado:** Service Worker actualizado a `meteoasturlode-v1154-estampa-compartir` y query strings unificadas a `?v=1.1.54`.

---

## [1.1.53] - 2026-10-02

### 🚗💨 Alerta Silenciosa de Viento Lateral en Viaductos y Conducción (Seguridad Vial)
- **Banner Dinámico Condicional en Cabecera (Doctrina Constitucional 12):**
  - Implementación del nuevo detector modular `roadWindDetector.js`, diseñado para alertar en carretera frente al riesgo de desestabilización, efecto tijera o vuelco provocado por viento lateral transversal.
  - **Modo Silencioso Estricto:** En días de régimen normal (`rachas < 65 km/h`), el banner no ocupa espacio en el DOM (0 px), preservando intacta la interfaz.
  - **Disparo Condicional:** Cuando las rachas alcanzan nivel de aviso (`65 a 84 km/h`, nivel amarillo) o temporal severo (`>= 85 km/h`, nivel rojo), salta el banner Liquid Glass destacando la precaución obligatoria para vehículos vulnerables (*furgonetas, autocaravanas, remolques y motos*) al salir de túneles, desmontes o avanzar por puentes expuestos.
- **Catálogo de Viaductos y Trazados Críticos por Concejo:**
  - Asignación comarcal de los viaductos más batidos de la red viaria asturiana:
    - *A-8 Costa Occidental:* Viaductos de Concha de Artedo (110 m), San Pedro de la Ribera, Cabo Vidio, Río Esva, Ría de Navia y Viaducto de los Santos (Eo).
    - *A-8 / A-66 Costa Central & Y Griega:* Nudo y enlaces de Serín, Viaducto de San Sebastián (Castrillón / Salinas), Viaducto de La Florida y Tabaza.
    - *A-8 Costa Oriental:* Viaductos del Río España (Quintes / Villaviciosa), Ría de Villaviciosa (Tazones), Ribadesella (Sella), Niembro y Río Deva.
    - *A-66 / N-630 Corredor de Montaña y Cuencas:* Viaductos del Huerna (Campomanes, Vega del Ciego), bocas del Túnel del Negrón y Puerto de Pajares.
    - *A-63 Corredor del Suroccidente:* Viaductos de Doriga, Cornellana, Casazorrina y Alto de La Espina.
- **Píldora Contextual en Anemómetro (Sensor #1):**
  - Línea ergonómica fija en la tarjeta de Anemómetro con código semafórico en tiempo real: *Viento favorable en viaductos* (verde), *Viento moderado* (amarillo), *Precaución viento lateral* (naranja) o *Alerta severa* (rojo).
- **Cumplimiento Constitucional Riguroso:**
  - **Ergonomía Móvil (Ley 11):** Diseño `box-sizing: border-box`, `max-width: 100%`, flex-wrap y chips compactos para garantizar ausencia total de desborde en pantallas de 320px a 380px.
  - **Simulacro y Verificación (Ley 12):** Conmutador controlado mediante `?test=viento_viaductos` (aviso amarillo) y `?test=viaductos_severo` (alerta roja).
  - **Exención de Responsabilidad Civil (Ley 16):** Cintillo visible recordando que los avisos emanan de modelos numéricos y que prevalecen las órdenes de la Agrupación de Tráfico de la Guardia Civil y los paneles PMV de la DGT (011 / dgt.es).
- **Cache-Busting Sincronizado:** Service Worker actualizado a `meteoasturlode-v1153-alerta-viento-viaductos` y query strings unificadas a `?v=1.1.53`.

---

## [1.1.52] - 2026-10-01

### 🥾 Ergonomía Móvil y Blindaje Anti-Corte en Rutas (Ley 11)
- **Compactación y Resolución de Desborde en Filtros de Sendas (Feedback Lendo):**
  - Reducción ergonómica del texto de pastillas a `🟢 Fáciles` y `🟡 Medias`, evitando que nombres largos como *«Fáciles & Familiares»* se corten en el borde lateral de las pantallas de smartphones (resolución estándar de 320px a 380px).
  - Implementación de `flex-wrap: wrap; gap: 6px;` y `box-sizing: border-box` en `.routes-filter-strip`, garantizando que todas las opciones quepan holgadamente en una sola fila en móviles y se adapten limpiamente sin desbordamiento horizontal.
- **Cache-Busting Sincronizado:** Service Worker actualizado a `meteoasturlode-v1152-ergonomia-rutas` y query strings unificadas a `?v=1.1.52`.

---

## [1.1.51] - 2026-10-01

### 🥾 Nuevo Módulo: Rutas, Sendas & Monte Asturiano (Tecla 7)
- **Suite Especializada para Caminantes y Montañeros:**
  - Creación del nuevo módulo independiente posicionado armónicamente entre *Surf & Rompientes* y *Cordillera & Nieve*, asignado con el atajo de teclado numérico <kbd>7</kbd> (desplazando Cordillera al 8 y Cosmos al 9).
  - Componente dedicado `routesCard.js` y motor termodinámico de sendas en `routesData.js` con diseño Liquid Glass puro.
- **Rediseño Ergonómico y Fichas de Ruta Modernas (Feedback Lendo):**
  - **Semáforu de Llamuergues Visual:** Barra de tracción de 4 niveles (*Seco*, *Húmedo*, *Zonas Blandas*, *Llamuergues*) con porcentaje visual dinámico, lluvia acumulada 24-48h y textura de agarre.
  - **Panel de Confort en Marcha:** 3 bloques compactos (Sensación térmica en cota +300m, Viento en cresta con alerta de rachas y Mochila/Equipo sugerido con UV).
  - **Filtros Táctiles Instantáneos:** Botonera interactiva para filtrar en caliente por `Todas`, `🟢 Fáciles & Familiares`, `🟡 Moderadas` y `🔴 Exigentes`.
  - **Fichas Estilo AllTrails / Wikiloc:** Sustitución de listas de texto por chips horizontales ergonómicos (`📏 km`, `🚨 tiempo`, `⛰️ desnivel`, `🪵 firme`) y avisos destacados de precaución.
- **Blindaje Legal Pleno (Ley 16):**
  - Cintillo expreso de seguridad en senderismo y montaña sin tecnicismos internos.
- **Corrección de Caché en Cascada del Icono Lunar:**
  - Sincronización de importaciones a `?v=1.1.51` en `forecastView.js`, `chartsView.js`, `marineCard.js`, `surfCard.js` y `compareView.js`, erradicando definitivamente el residuo de la luna con gorro de versiones antiguas en todos los navegadores.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1151-rutas-senderismo`, actualización general a `?v=1.1.51` en `index.html`, `js/app.js` y todos los componentes.

---

## [1.1.50] - 2026-10-01

### 🛡️ Blindaje Legal: Doctrina de Exención de Responsabilidad Civil (Ley 16)
- **Consagración Constitucional de la Ley 16 (Parte I):**
  - Autenticada formalmente mediante PIN maestro de seguridad de Lendo (`2796`), se consagra en la Constitución Suprema la *Doctrina de Exención de Responsabilidad Civil, Prudencia y Blindaje de Actividades en Entornos Naturales*.
  - Establece la naturaleza estrictamente orientativa y matemática de los modelos meteorológicos, la soberanía inapelable de las autoridades y servicios oficiales a pie de campo (socorristas, DGT, 112) y la asunción exclusiva de riesgo por el usuario, blindando al desarrollador (Lendo / zeustata) frente a cualquier contingencia civil.
- **Avisos Legales Visibles en Módulos Sensibles:**
  - *Playas & Mareas (`marineCard.js`):* Banderas renombradas a *«(Teórica)»* (ej. `🟢 Bandera Verde (Teórica)`) y cintillo al pie recordando que las condiciones locales y las directrices del servicio de socorrismo y salvamento prevalecen en todo momento.
  - *Surf & Rompientes (`surfCard.js`):* Bloque de advertencia recordando que las calificaciones (0-10★) y cálculos en kJ son teóricos y que cada surfista accede al agua bajo su propia responsabilidad física y técnica.
  - *Cordillera & Nieve (`mountainCard.js`):* Cintillo de vialidad invernal remitiendo obligatoriamente a la DGT (011) y al 112 Asturias.
- **Blindaje en Términos Oficiales (`privacy.html`):**
  - Incorporada la sección expresa *«6. Exención de Responsabilidad en Actividades al Aire Libre, Náuticas y de Montaña (Prudencia Individual)»*.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1150-legal-disclaimer`, actualización general a `?v=1.1.50` en `index.html`, `js/app.js` y componentes.

---

## [1.1.49] - 2026-10-01

### 🏖️ Diseño & Claridad: Títulos Limpios y Elegantes en Playas y Surf (Feedback Lendo)
- **Supresión de Localidades entre Paréntesis en Encabezados H3:**
  - En las tarjetas de *Playas & Turismo* (`marineCard.js`) y *Surf & Rompientes* (`surfCard.js`), los títulos principales mostraban el nombre completo del concejo con sus localidades entre paréntesis (ej. `🏖️ Playas, Mareas & Turismo de Castrillón (Piedras Blancas / Salinas)` y `🏄‍♂️ Surf, Rompientes & Olas de Castrillón (Piedras Blancas / Salinas)`).
  - Al figurar ya las localidades subordinadas en la tarjeta principal y en el propio subtítulo geográfico de la sección, la reiteración generaba una carga visual excesiva y aumentaba innecesariamente la altura del bloque en dispositivos móviles.
  - Se aplica limpieza automática con expresión regular sobre el título principal, mostrando directamente el concejo limpio (`🏖️ Playas, Mareas & Turismo de Castrillón` y `🏄‍♂️ Surf, Rompientes & Olas de Castrillón`), logrando una presencia mucho más despejada y elegante.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1149-clean-titles`, actualización general a `?v=1.1.49` en `index.html`, `js/app.js` y componentes.

---

## [1.1.48] - 2026-10-01

### 🌙 Diseño & Iconos: Rediseño Nítido de Luna Despejada con Estrellas (Feedback Lendo)
- **Erradicación del Borrón Nocturno a 32px:**
  - En el pack por defecto de "Emojis Emotivos / Cómic", el icono de noche despejada (`clear-night`) representaba una luna con un gorro de dormir cónico a rayas rojas y borla blanca con letras `Zzz`. En pantallas de smartphones y tablets a tamaños reducidos (28-32px), el gorro y las letras se fundían visualmente, dando la impresión de una mancha marrón confusa en la parte superior.
  - Se sustituye el gorro por una luna creciente luminosa, nítida y sonriente en azul celestial (`#38bdf8`), acompañada en la parte superior de dos estrellas doradas de cuatro puntas (`✨` / `✦` en `#facc15` y `#fde047`) con destello blanco central, simbolizando con absoluta claridad el cielo despejado y estrellado.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1148-luna-estrellas`, actualización general a `?v=1.1.48` en `index.html`, `js/app.js` y componentes.

---

## [1.1.47] - 2026-10-01

### 📍 Usabilidad & Geoposición: Auto-Ubicación Inteligente al Iniciar (Feedback Lendo)
- **Detección Automática de Concejo por GPS al Iniciar y Reanudar:**
  - Si está activada, la app consulta el GPS de forma transparente y silenciosa en segundo plano al abrir la aplicación o desbloquear el móvil/tablet. Si el usuario se ha desplazado a otro concejo (ej. de Gijón a Castrillón / Piedras Blancas), la app conmuta automáticamente al nuevo concejo sin exigir la pulsación manual de `[ 📍 GPS ]`.
  - Carga ultrarrápida (0 ms) preservada: la pantalla se pinta instantáneamente con la última caché para no hacer esperar al usuario mientras el GPS satelital resuelve las coordenadas.
- **Onboarding No Invasivo y Respeto a Navegación Manual:**
  - En el primer uso (o tras la actualización), un modal elegante con estética Liquid Glass pregunta al usuario si desea activar la detección automática o mantener concejo fijo.
  - No pisa las búsquedas manuales: si el usuario consulta otro concejo desde el buscador o favoritos, se mantiene en pantalla mientras use la aplicación.
- **Control Directo en Interfaz:**
  - El botón superior `[ 📍 GPS ]` muestra el estado `Auto GPS` con distintivo visual verde cuando está activado.
  - Añadido conmutador rápido en la barra de herramientas del menú de navegación (`#nav-modal`) para activar o desactivar la auto-ubicación en cualquier instante.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1147-auto-location-gps`, actualización general a `?v=1.1.47` en `index.html`, `js/app.js` y componentes.

---

## [1.1.46] - 2026-10-01

### 📱 Estabilidad & Tablets: Erradicación Total del Temblor de 2s en Tablets en Stand (Feedback Lendo)
- **Diagnóstico del Conflicto Gyro vs CSS Transition (Tablets Apaisadas en Soporte):**
  - Causa raíz identificada: En tablets colocadas en soporte de mesa (stand, ángulo de 75°-80°), el giroscopio calcula un desplazamiento de inclinación que el motor JS (`gyroGlass.js`) interpola con `lerp` durante ~2 segundos al arrancar o refrescar. Al mismo tiempo, las tarjetas tenían `transform: translate(...)` y `transition: transform 0.12s ease-out, box-shadow 0.15s ease-out`. Esta colisión de dos motores de animación independientes sobre la misma propiedad provocaba un temblor o vibración subpixel continua de la tarjeta durante exactamente los 2 segundos de interpolación. En vertical no sucedía porque el ángulo neutro no forzaba este recorrido extremo.
- **Solución Definitiva y Limpia (Cero Riesgo):**
  1. **Asentamiento Fijo de Tarjetas:** Eliminado el `transform: translate` físico y las transiciones CSS de `transform` y `box-shadow` en `.hero-weather-card` y `.app-header`. La tarjeta permanece inmóvil y nítida como una roca.
  2. **Preservación Integral de Liquid Glass:** El efecto óptico de refracción líquida y halo de luz en `::after` (`--glass-x`, `--glass-y`) se mantiene 100% vivo y reactivo a toques y giroscopio.
  3. **Limpieza de Transición Residual:** Ajustado `.btn-explain-clima` para transiciones discretas en lugar de `transition: all`.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1146-rock-solid-glass`, actualización general a `?v=1.1.46` en `index.html`, `js/app.js` y componentes.

---

## [1.1.45] - 2026-10-01

### 📱 Rendimiento & GPU: Fix Definitivo Anti-Microdestellos en Tablets (Feedback Lendo)
- **Diagnóstico del Conflicto de Capas GPU en Pantallas de Alta Resolución (Tablets):**
  - Causa raíz identificada: En pantallas táctiles de gran resolución (tablets), la combinación de un elemento hijo con `filter: drop-shadow(...)` y `transition: filter` dentro de una tarjeta con `backdrop-filter: blur(24px)` y animación dinámica de refracción (`gyroGlass`) provocaba que el compositor gráfico descartara y reconstruyera la textura GPU repetidamente durante los primeros ~2 segundos de montaje, traduciéndose en micro-destellos o chispazos rápidos en la tarjeta principal.
- **Solución Quirúrgica y Limpia (Cero Riesgo):**
  1. **Sustitución Vectorial por `text-shadow`:** Se sustituye `filter: drop-shadow` por sombreado tipográfico nativo `text-shadow: 0 0 4px rgba(250, 204, 21, 0.75)` en la bombilla `💡` de `.clima-bulb`. El efecto estético de halo dorado es idéntico, pero no fuerza la creación de texturas GPU separadas ni genera descarte de capas sobre `backdrop-filter`.
  2. **Supresión de Transiciones en `filter`:** Eliminado el canal `filter` de las transiciones de `.climatology-badge` y `.clima-bulb`, evitando que la GPU intente interpolar filtros durante el ciclo de entrada.
  3. **Erradicación de Opacidad Cero Artificial:** Retirado el `opacity: 0` de `#panel-live.refreshing`, evitando cualquier micro-apagón forzado del contenedor.
  4. **Firma Pura en `_dataSignature`:** Eliminado el timestamp dinámico para que solo se active re-renderizado si la temperatura, código de tiempo o viento han variado realmente respecto a los datos en pantalla.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1145-tablet-gpu-pure`, actualización general a `?v=1.1.45` en `index.html`, `js/app.js` y componentes.

---

## [1.1.44] - 2026-09-30

### 📱 Rendimiento & Móvil: Anti-Parpadeo en Refresco de Datos (Honor Magic Pro / Snapdragon)
- **Diagnóstico del Parpadeo (Análisis Princesa):**
  - Causa raíz identificada: doble renderizado completo del DOM con `innerHTML` al pasar de datos de caché a datos frescos de red (~1-2 segundos de margen). En ese instante el navegador Android destruye y reconstruye todas las tarjetas glassmorphism simultáneamente con `backdrop-filter: blur(24px) saturate(190%)` en cada una, generando un flash visual brusco de ~2 segundos en el `panel-live`.
- **Solución Doble (Opción C — Comparación + Fade):**
  1. **`_dataSignature(data)`**: Nuevo método en `MeteoAsturiasApp` que genera una firma ligera (`timestamp|temperatura|weather_code|viento`) de los datos. En `loadWeather()`, antes de re-renderizar se compara la firma de los datos frescos con la de los datos pintados; si son idénticos, **no se destruye ni reconstruye el DOM**, eliminando el parpadeo en el caso más común (datos sin cambios reales entre refresco de caché y red).
  2. **Fade suave `withFade=true`**: Cuando los datos sí son distintos, `renderAllComponents(true)` aplica la clase `.refreshing` (`opacity:0; transition:none`) justo antes del `innerHTML`, luego usa doble `requestAnimationFrame` para asegurar que el navegador procesa el opacity:0 antes de activar `.refresh-in` (`opacity:1; transition:opacity 0.18s ease-out`). El parpadeo brusco de 2 segundos se convierte en un fundido de 180ms imperceptible.
- **CSS en `main.css`**: Añadidas las clases `#panel-live.refreshing` y `#panel-live.refresh-in` sin coste GPU adicional (solo `opacity`, sin `transform` ni `backdrop-filter` nuevos).
- **Diseño 100% intacto**: Glassmorphism, partículas, gyroGlass, giroscopio y todos los datos se mantienen exactamente igual. El cambio es únicamente en la gestión del ciclo de renderizado.
- **Versión:** `CURRENT_APP_VERSION = '1.1.44'` en `js/app.js`, badge `v1.1.44` en `index.html`.

---

## [1.1.43] - 2026-09-30

### 🌍 Diseño & Estabilidad: Supresión de Doble Pastilla y Eliminación del Temblor en Tablets
- **Pastilla Única Autónoma en Climatología (Feedback Lendo):**
  - Erradicado el marco amarillo/ámbar exterior heredado de los botones didácticos de sensores (`.btn-explain-sensor`).
  - La pastilla (ej. `🟢 Valores habituales 💡`) pasa a ser un único elemento interactivo verde, translúcido y elegante (`.climatology-badge.clima-normal`), con su punto, texto y bombilla perfectamente integrados sin capas duplicadas ni marcos redundantes.
- **Eliminación del Temblor / Jitter al Actualizar en Pantallas Grandes y Tablets:**
  - Sustituida la transición indiscriminada `transition: all 0.25s ease;` en `.climatology-strip` por transiciones específicas de color y fondo (`transition: background 0.2s ease, border-color 0.2s ease;`).
  - Erradicado el recálculo elástico que provocaba parpadeo y vibración de altura en el DOM durante el re-renderizado en tablets.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1143-single-clima-pill`, actualización general a `?v=1.1.43` en `index.html`, `js/app.js` y componentes.

---

## [1.1.42] - 2026-09-30

### 🌍 Ergonomía & Apertura Modal: Integración de Bombilla 💡 en Pastilla y Apertura Modal Blindada
- **Integración de Bombilla en Pastilla de Estado (Feedback Lendo):**
  - Supresión del texto redundante «Explícame» y adición del icono limpio de bombilla `💡` integrado directamente en la pastilla de estado (ej. `🟢 Valores habituales 💡`).
  - Efecto de iluminación interactiva (*glow*) y micro-rotación en hover/touch.
  - La pastilla actúa como botón táctil único de apertura para la guía didáctica.
- **Blindaje y Corrección de Apertura del Modal Didáctico:**
  - Corregido el selector en el manejador global de eventos de `app.js` incorporando `[data-explain]` y `.climatology-badge-interactive` para garantizar la captura de clics en cualquier elemento didáctico.
  - Añadida la sección didáctica completa `climatology` en el diccionario de explicaciones (`WEATHER_EXPLANATIONS` en `weatherExplanations.js`), detallando el estándar de 30 años de la OMM y AEMET (1991-2020), el cálculo de anomalía térmica, la corrección por altitud (-0,6 °C / 100m) y los 4 dominios climáticos de Asturias.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1142-clima-explain-bulb`, actualización general a `?v=1.1.42` en `index.html`, `js/app.js` y componentes.

---

## [1.1.41] - 2026-09-30

### 🌍 Ergonomía & Diseño Limpio: Pastilla Interactiva en Tiempo Habitual & Purgado de Caché Móvil
- **Pastilla Interactiva Única en Climatología (Feedback Lendo):**
  - Supresión del botón redundante `[ 📊 Tiempo Habitual ]` que forzaba un segundo renglón en teléfonos móviles.
  - La pastilla de diagnóstico (`🟢 Valores habituales 💡 Explícame`) se transforma en el elemento táctil interactivo directo para desplegar la ventana didáctica de las Normales de 30 años de AEMET.
  - Cabecera reducida a una sola línea limpia, elegante y de bajo consumo vertical.
- **Purgado Integral de Cachés de Módulos (Doctrina Anti-Caché Artículo 4 zeustata):**
  - Actualización exhaustiva de las cadenas de consulta (`?v=1.1.41`) en la totalidad de los componentes (`currentCard.js`, `forecastView.js`, `marineCard.js`, etc.) y sus dependencias internas.
  - Garantizada la visualización inmediata de la demarcación climática y estación de referencia (`🌊 Litoral Cantábrico`, `🏔️ Picos de Europa`, etc.) en smartphones y dispositivos PWA sin retención de caché.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1141-clima-pill-streamline`, actualización general a `?v=1.1.41` en `index.html`, `js/app.js` y componentes.

---

## [1.1.40] - 2026-09-30

### 🌍 Climatología & Zonas AEMET: Diferenciación de Zonas y Estaciones Oficiales en Récords Históricos
- **Identificación Geográfica Rigurosa de Récords Mensuales (Feedback Lendo):**
  - Supresión de la ambigüedad en los récords históricos de 30 años (AEMET 1991–2020) en la tarjeta principal.
  - Asignación obligatoria y explícita de cada concejo a su demarcación climática oficial y estación meteorológica de referencia:
    - 🌊 **Litoral Cantábrico:** *AEMET Gijón Musel / Avilés* (Gijón, Avilés, Castrillón, Gozón, Llanes, Ribadesella, Tapia...).
    - 🏙️ **Valles Centrales y Cuencas:** *AEMET Oviedo El Cristo* (Oviedo, Siero, Mieres, Langreo, Grado...).
    - 🍂 **Suroccidente Interior:** *AEMET Cangas del Narcea* (Cangas del Narcea, Allande, Degaña, Ibias, Tineo...).
    - 🏔️ **Cordillera y Picos de Europa:** *AEMET Pajares / Picos de Europa (Alta Montaña)* (Cabrales, Cangas de Onís, Amieva, Sotres, Somiedo, Pajares, Quirós, Lena...).
- **Diseño Ergonómico en Dos Niveles (Doctrina Artículo 11 zeustata):**
  - **Fila 1:** Cabecera con título del mes (`📜 Récords AEMET · [Mes]:`) y pastilla de zona destacada con icono y estación abreviada (ej. `🏔️ Picos de Europa / Cordillera (Pajares / Picos)`).
  - **Fila 2:** Las 3 pastillas de métricas históricas (`🔥 Máx`, `❄️ Mín`, `🌧️ 24h`) con ancho completo y sin colisiones en pantallas móviles.
  - Blindaje defensivo en arrays de temperaturas para prevenir excepciones si faltan datos en la API.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1140-climatology-zones`, actualización general a `?v=1.1.40` en `index.html`, `js/app.js` y componentes.

---

## [1.1.39] - 2026-09-30

### 🌍 Ergonomía Móvil & Visualización: Blindaje Anti-Recorte en Métricas de Viento y Rachas
- **Blindaje Tipográfico y Jerarquía de Unidades en Tarjetas Diarias (Doctrina Artículo 11 zeustata):**
  - Subordinación tipográfica de las unidades de velocidad (`km/h` o `kt`) mediante etiquetas `<small class="u-m-unit">`, reduciendo su peso visual y tamaño (`0.68rem`) frente al valor numérico (`0.92rem`), ganando más de 12px de ancho útil por pastilla.
  - Formato ultra-compacto en racha máxima (`Racha <strong>${windGust}</strong>`), garantizando que la cifra quede siempre legible y destacada sin colapsar la etiqueta.
- **Optimización de Padding y Holgura en Pantallas Móviles:**
  - Reducción del padding horizontal de `.daily-card-rich` en pantallas móviles (`<= 480px`) de `22px` a `14px`, liberando 16px adicionales de ancho útil interior en la tarjeta.
  - Ajuste ergonómico de la rejilla `.d-unified-metrics-grid`: padding de pastillas reducido a `5px 6px` y espaciado gap ajustado a `5px`.
  - Iconos de métricas optimizados a `1.05rem` para evitar empujar el texto en teléfonos compactos (320px - 380px), eliminando definitivamente los puntos suspensivos (`25 k...` y `Racha ...`).
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1139-forecast-wind-ergonomy`, actualización general a `?v=1.1.39` en `index.html`, `js/app.js` y componentes.

---

## [1.1.38] - 2026-09-30

### 🌍 Seguridad, Higiene & Blindaje Legal: Migración Integral a HTTPS en Webcams
- **Migración Integral a Transmisión Cifrada HTTPS (Artículo 15 zeustata):**
  - Actualización de la totalidad de las URLs en el catálogo oficial de cámaras [js/utils/webcamsData.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/js/utils/webcamsData.js) (playas, rompientes, puertos de montaña y cumbres alpinas) a protocolo seguro `https://www.webcamsdeasturias.com/`.
  - Eliminación de redirecciones intermedias 301/302 en texto plano, logrando una apertura más rápida (ahorro de 100-200 ms) al pulsar *"Ver Cámara ↗"*.
  - Erradicación definitiva de advertencias de *"Tráfico en texto plano (Cleartext Traffic)"* en las auditorías de Google Play Console y de avisos de *"Sitio no seguro"* en navegadores móviles.
  - Actualizada la leyenda legal al pie del modal de webcams explicitando la condición de enlaces externos verificados hacia el portal oficial propietario con cifrado TLS.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1138-https-webcams-blindaje`, actualización general a `?v=1.1.38` en `index.html`, `js/app.js` y componentes.

---

## [1.1.37] - 2026-09-30

### 🌍 Calibración Sismológica: Umbral Menor de Sensibilidad (M >= 2.5) & Reubicación Discreta
- **Optimización de Sensibilidad y Delimitación Geográfica (Feedback Lendo):**
  - Elevación del umbral mínimo de activación regional a **magnitud M >= 2.5** (frente al 1.8 anterior), eliminando de raíz falsos positivos de micro-sismos instrumentales irrelevantes como el registrado en Portugal (M 2.2).
  - Delimitación geográfica estricta a Asturias y litoral Cantábrico inmediato (Lat `42.80° N` a `44.40° N`, Lon `-7.30° W` a `-4.40° W`). Fuera de esta demarcación, solo se computan sismos de gran intensidad (`M >= 4.0` regional o `M >= 4.5` lejano).
  - Reducción de la ventana de seguimiento temporal a **24 horas** (en lugar de 48h).
  - **Auto-purga en cliente:** al arrancar o recibir datos, si el evento en `localStorage` no cumple con la nueva calibración estricta, se elimina de inmediato de la memoria y se retira el banner del DOM.
- **Reubicación Ergonómica en el Dashboard (Orden de Lendo):**
  - Desplazamiento del contenedor `#seismic-banner-container` desde la cabecera superior hacia la **última posición del panel en vivo, inmediatamente tras el Asesor de Colada y Secado (`${laundryMarkup}`)**. De este modo, la cabecera queda limpia y el aviso sísmico se ubica discretamente al pie.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1137-seismic-calibrated`, actualización general a `?v=1.1.37` en `index.html`, `js/app.js` y componentes.

---

## [1.1.36] - 2026-09-30

### 🌍 Monitor Silencioso de Sismicidad en Asturias y Mar Cantábrico (Open Data EMSC / IGN)
- **Centinela Geofísico Silencioso (Doctrina Constitucional 12 & Artículo 15 zeustata):**
  - Creación de `js/utils/seismicDetector.js` conectado a la red oficial del **Centro Sismológico Euromediterráneo (EMSC/CSEM)** e **IGN** mediante servicios FDSN Web Services sin autenticación privada ni scraping (100% Open Data).
  - Vigilancia geofísica en un radio de 2.5° (~270 km) alrededor del centro de Asturias (lat 43.35°, lon -5.85°), cubriendo la totalidad de los 78 concejos, la Cordillera Cantábrica, León, Lugo, Cantabria y la plataforma marina cantábrica.
  - Comportamiento 100% silencioso e invisible: si no hay eventos de magnitud `>= 1.8` en las últimas 48 horas, el módulo no muestra nada ni ocupa espacio.
  - Al registrarse un evento, activa el banner Liquid Glass con magnitud (M), epicentro, profundidad, distancia exacta en km calculada por Haversine hasta el concejo seleccionado, tiempo transcurrido y enlace directo a la ficha técnica oficial del EMSC.
  - Caché inteligente de 25 minutos en `localStorage` (`meteoastur_seismic_data`) con re-calibración instantánea de distancia entre concejos sin peticiones adicionales a la red.
- **Simulacro de Pruebas Controlado (Ley 12):**
  - Parámetros de prueba accesibles mediante `?test=sismo` (sismo terrestre en el suroccidente asturiano M 3.1) o `?test=sismo_mar` (sismo submarino cantábrico M 3.8).
- **Diseño Armónico Liquid Glass (Ley 14):**
  - Estilos `.seismic-banner` con gradientes de ámbar a pizarra espacial y cian marino, animaciones pulsantes y pastillas ergonómicas.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1136-seismic-sentinel`, actualización general a `?v=1.1.36` en `index.html`, `js/app.js` y componentes.

---

## [1.1.35] - 2026-09-30

### 🌐 Ampliación del Observatorio Global: 3 Nuevos Modelos Mundiales (8 Potencias)
- **Integración de 3 Nuevos Motores Numéricos de Élite en `js/services/weatherApi.js`:**
  - **🇬🇧 UK Met Office (Reino Unido) — `ukmo_seamless` (10 km):** Modelo del Servicio Meteorológico Británico de reconocido prestigio histórico en la predicción de borrascas profundas del Atlántico Norte, frentes atlánticos y oleaje en el Mar Cantábrico.
  - **🇨🇦 GEM (Canadá) — `gem_seamless` (15 km):** Modelo global de Environment Canada, líder mundial en la modelización de masas de aire ártico marítimo, ciclogénesis explosivas y olas de frío polar.
  - **🇯🇵 JMA (Japón) — `jma_seamless` (10 km):** Modelo de la Agencia Meteorológica de Japón, altamente valorado por su física avanzada de transporte de humedad oceánica, frentes marítimos y precipitación convectiva.
- **Didáctica & Navegación:**
  - El modal de selección de modelos pasa de 5 a **8 modelos de potencia mundial**, con banderas identificativas, agencias oficiales, resolución de malla y recomendaciones de uso.
  - Actualizada la guía didáctica interactiva (`💡 Explícame: ¿Cómo elegir el mejor modelo?`) en `js/utils/weatherExplanations.js` incorporando las fortalezas específicas de los 3 nuevos modelos.
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1135-global-models`, sincronización integral a `?v=1.1.35` en hojas de estilo, scripts y módulos.

---

## [1.1.34] - 2026-09-30

### 🇫🇷 Soberanía de AROME (1.3 km) en Tiempo Actual & Blindaje Anti-Orballu de ECMWF (Ley 10)
- **Diagnóstico Forense de Terreno y Desacople en Rasa Costera:**
  - Lendo detectó que durante toda la jornada en Castrillón / Piedras Blancas la app marcaba de forma fija e inmutable *"Orbayu llixeru (0.1 - 0.2 mm)"* y *"🟡 Orbayando Agora"*, cuando en la realidad no llovía (0.0 mm), solo cayeron 4 gotas testimoniales y a las 14:00 se abrieron claros limpios.
  - La inspección de las APIs en tiempo real desveló que **AROME (1.3 km)** clavó fidedignamente la atmósfera (0.0 mm toda la mañana, nublado y código 0 despejado a las 13h–14h), mientras que **ECMWF IFS (9 km)** arrojaba llovizna residual continua (0.1 a 0.2 mm y WMO 51) por sesgo húmedo orográfico.
  - El algoritmo de consenso anterior otorgaba a ECMWF poder de veto sobre la lluvia actual: al recibir `ecmwfPrecip >= 0.1`, sobreescribía la salida de AROME forzando precipitación y código 51, bloqueando a su vez el detector de *Resol / Sol tamizáu* y el *Semáforu del Paragües*.
- **Soberanía Indiscutible de AROME en Nowcasting:**
  - Supresión definitiva de la sobreescritura de precipitación en tiempo real (`current`): AROME (1.3 km) tiene resolución 50 veces superior y es la autoridad exclusiva sobre el suelo en Asturias. ECMWF nunca más podrá imponer lluvia activa en vivo si AROME marca seco (`< 0.1 mm`).
  - Blindaje estricto en el pronóstico horario (`hourly`): ECMWF solo puede armonizar lluvia determinista si el ensamble probabilístico es inequívoco (`PoP >= 65%`), la acumulación prevista es significativa (`>= 0.5 mm`) y el cielo está densamente cubierto (`nubosidad >= 60%`), erradicando las trazas de 0.1–0.2 mm que anulaban los claros costeros.
  - Calibración de falso claro reforzada a divergencia crítica masiva (`rawCloud < 50 && ecmwfCloud >= 80 && diff >= 35%`).
- **Cache-bust & Sincronización:** `sw.js` → `meteoasturlode-v1134-arome-sovereignty`, actualización general a `?v=1.1.34` en hojas de estilo, scripts y módulos.

---

## [1.1.33] - 2026-09-30

### 🛡️ Blindaje Anti-Colisión y Rediseño Ergonómico de Tiempo Habitual (Ley 11)
- **Ergonomía y Jerarquía Visual en Climatología AEMET:**
  - Desacoplada la cabecera del cuerpo descriptivo en `js/utils/climatologyData.js`: se establece una fila superior limpia (`.climatology-top-row`) con el icono térmico y badge a la izquierda (`.climatology-header-left`), y el botón de acción didáctica a la derecha (`.btn-explain-clima`).
  - Ubicada la frase comparativa (`Habitual en...`) en una fila intermedia independiente (`.climatology-desc-row`) a ancho natural, erradicando por completo el choque visual con el botón `📊 Tiempo Habitual` en pantallas móviles de 320px–480px.
  - Ajuste en `css/components.css` eliminando el forzado `width: 100%` en ambos elementos bajo la media query móvil que provocaba la superposición espacial.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1133-fix-climatology-layout`, sincronización a `?v=1.1.33` en hojas de estilo, scripts y módulos.

---

## [1.1.32] - 2026-09-29

### ⚡ Monitor Convectivo de Tormentas Inminentes y Récords AEMET
- **Monitor Convectivo y Alerta Silenciosa de Tormentas (Nowcasting):**
  - Componente pasivo (`.thunderstorm-banner`) que analiza las 1 a 3 horas inmediatas mediante modelos numéricos de alta resolución y códigos WMO 95-99.
  - Alerta anticipada ante tormentas con aparato eléctrico, hora estimada de llegada, chubascos intensos y detección específica de riesgo de granizo/pedrisco (`código 96/99`).
  - Botón de acceso directo para saltar en un toque al radar de lluvia y tormentas RainViewer en vivo (`📡 Ver Radar en Directo`).
  - Protocolo de simulacro controlado para verificación (Ley 12) mediante `?test=tormenta` y `?test=granizo`.
- **Récords Históricos Oficiales AEMET en Tiempo Habitual:**
  - Integrada en `js/utils/climatologyData.js` la base de datos de récords absolutos históricos mensuales de las estaciones oficiales de referencia de AEMET en Asturias (Gijón-Musel, Oviedo-Buenavista, Avilés-Aeropuerto, Llanes, Cangas del Narcea y Pajares).
  - Muestra en la franja climatológica: récord de calor absoluto del mes, récord de frío absoluto y máxima lluvia en 24 horas con el año exacto en que se registraron.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1132-storm-records`, actualización a `?v=1.1.32` en hojas de estilo, scripts y módulos.

---

## [1.1.31] - 2026-09-29

### 🌫️ Detector Silencioso de Borrina Marina y Nieblas de Valle (Ley 12)
- **Sensor Pasivo e Inteligente de Nieblas Asturianas:**
  - Desarrollado como componente 100% silencioso (`.borrina-banner`) que permanece invisible en condiciones atmosféricas ordinarias y únicamente entra en acción cuando los sensores físicos detectan el fenómeno.
  - **Doble Escala Meteorológica Regional:**
    1. **Borrina Marina Costera (Litoral Cantábrico):** Identifica la niebla de advección marina que invade playas y rías (Gijón, Salinas, Peñas, Llanes) con humedad extrema (`>= 92%`), punto de rocío coincidente y suave brisa marina, mientras que a pocos kilómetros tierra adentro predomina cielo abierto o resol.
    2. **Niebla de Valle e Inversión Térmica (Interior y Cuencas):** Detecta bolsas de aire frío estancadas en el fondo de valles fluviales (Nalón, Caudal, Trubia, Cangas de Onís, Oviedo) con viento en calma, humedad alta y visibilidad comprometida, contrastando con sol resplandeciente en cotas medias y cumbres.
  - **Didáctica y Doctrina de Simulacro (Ley 12):**
    - Botón didáctico integrado `💡 ¿Por qué ocurre?` enlazado al diccionario interactivo de fenómenos (`borrina` o `inversion`).
    - Interruptor de simulacro controlado para verificación previa mediante URL (`?test=borrina` o `?test=inversion`).
- **Cache-bust:** `sw.js` → `meteoasturlode-v1131-borrina-detector`, actualización a `?v=1.1.31` en hojas de estilo, scripts y módulos.

---

## [1.1.30] - 2026-09-29

### ☂️ Semáforu del Paragües (Nowcasting Práctico Asturiano)
- **Asistente Inteligente de Lluvia y Orbayu para el Día a Día:**
  - Nueva banda interactiva y ergonómica (`.umbrella-advisor-strip`) integrada en la tarjeta meteorológica principal, diseñada para resolver la duda cotidiana asturiana: *¿Tengo que coger paraguas para salir ahora?*.
  - **Ventana de Nowcasting a Corto Plazo (6 a 8 horas):**
    - Evalúa en tiempo real las condiciones actuales y el pronóstico de las próximas 6 a 8 horas, alimentándose directamente de los datos ya armonizados por el Algoritmo de Consenso Cantábrico (Leyes 7, 8 y 10).
  - **Semáforo Cromático Tricolor Inmediato:**
    - 🟢 **Cielo Noble**: Tregua seca garantizada en las próximas 8 horas. No hace falta paraguas, ideal para tender o pasear sin preocupaciones.
    - 🟡 **Peligro d'Orbayu**: Orbayu o llovizna fina prevista en las próximas horas (o activa en el momento). Muestra la hora estimada de inicio (ej. *"desde las 21:00 h"*), la cantidad en mm y la recomendación de llevar chubasquero o paraguas pequeño.
    - 🔴 **Bastinazu / Lluvia Fuerte**: Lluvia copiosa o temporal (>= 1.5 mm/h o tormenta). Alerta visual con paraguas grande indispensable y aviso de ponerse a cubierto.
  - **Diseño Ergonómico y Liquid Glass (Leyes 5, 11 y 14):**
    - Totalmente adaptado a pantallas móviles estrechas, sin desbordes, con badge de estado pulsante (`dot-safe`, `dot-warning`, `dot-danger`) y micro-animaciones fluidas.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1130-umbrella-advisor`, actualización a `?v=1.1.30` en hojas de estilo, scripts y módulos.

---

## [1.1.29] - 2026-09-29

### 🧪 Armonización de Lluvia por Consenso (Supresión de la Paradoja 63% con 0.0 mm)
- **Eliminación del Conflicto de Ensambles en Modo Auto:**
  - Lendo detectó que en el pronóstico para las horas nocturnas (21:00 a 23:00 en Gijón), la aplicación marcaba hasta un 63% de probabilidad de precipitación pero con `0.0 mm`.
  - Diagnóstico físico y estadístico: el motor `best_match` de Open-Meteo inyecta la probabilidad de lluvia del ensamble alemán (DWD ICON, 55-63%) porque AROME no dispone de salida probabilística, pero conserva los milímetros de la salida determinista seca de AROME (0.0 mm).
  - Solución en `js/services/weatherApi.js`: se extendió el *Algoritmo Híbrido de Consenso Cantábrico* para consultar en paralelo la precipitación y lluvia de ECMWF IFS. Cuando la probabilidad supera el 30% pero el modelo determinista no marca lluvia (< 0.1 mm) y ECMWF confirma lluvia medible (>= 0.1 mm), el consenso adopta los milímetros acumulables y el código de orballu/llovizna (WMO 51) de ECMWF.
  - Plena consistencia visual y meteorológica entre la curva de probabilidad horaria, las barras de lluvia y los iconos del tiempo.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1129-rain-consensus`, actualización a `?v=1.1.29` en hojas de estilo, scripts y módulos.

---

## [1.1.28] - 2026-09-29

### 🧪 Algoritmo Híbrido de Consenso Cantábrico (AROME + ECMWF)
- **Filtro de Seguridad contra Falsos Claros Costeros:**
  - Lendo detectó que bajo cielo cubierto observable en las webcams de Gijón, la aplicación marcaba erróneamente *Despejado / Soleyeru* con apenas un 13-44% de nubes.
  - Causa meteorológica: el modelo de mesoescala AROME (1.3 km) genera ocasionalmente "agujeros" de subsidencia o viento de sotavento ficticios en bahías costeras cantábricas, mientras que el modelo europeo global (ECMWF IFS, 9 km) mantenía con total acierto un 91% de nubosidad cubierta.
  - Implementado un filtro de consenso inteligente en paralelo en `js/services/weatherApi.js`: cuando el modelo Auto detecta divergencia crítica (AROME con nubosidad < 50% frente a ECMWF con nubosidad >= 75%), se activa el blindaje adoptando la cobertura y radiación de ECMWF.
  - **Preservación Total de Calibraciones Asturianas:** El detector de *Resol / Sol tamizáu* (umbral 450 W/m²), la armonización de precipitación QPF-PoP, y todos los módulos propios se mantienen al 100% operativos sobre los datos armonizados.
- **Catálogo de Modelos:**
  - Actualizada la etiqueta del modelo `best_match` a **🧪 En Pruebas (Beta)** en el modal de selección de modelos.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1128-consensus-beta`, actualización a `?v=1.1.28` en hojas de estilo, scripts y módulos.

---

## [1.1.27] - 2026-09-29

### ☀️ Calibración Estricta de Resol / Sol Tamizáu (Ley 7)
- **Diferenciación Física entre Cielo Nublado Claro y Verdadero Resol:**
  - Ajuste de precisión tras validación en vivo con Lendo en Asturias: bajo un cielo completamente cubierto (100% de nubes) pero luminoso (altostratos blanquecinos) con ~398 W/m² de radiación directa normal, el sistema aún activaba *Resol / Sol tamizáu*.
  - Para que exista auténtico *resol* asturiano, el haz solar debe perforar el estrato nuboso con potencia suficiente para proyectar sombras nítidas y deslumbrar la vista (requiriendo habitualmente > 50-60% del DNI teórico de cielo despejado).
  - Elevada la exigencia de `direct_normal_irradiance`:
    - Primavera / Principios de otoño (Sep, Oct, Abr): **450 W/m²** (antes 190 W/m²).
    - Verano pleno (May, Jun, Jul, Ago): **500 W/m²** (antes 240 W/m²).
    - Otoño medio / Primavera temprana (Nov, Mar): **380 W/m²** (antes 170 W/m²).
    - Invierno (Dic, Ene, Feb): **320 W/m²** (antes 150 W/m²).
  - Con esta calibración, cielos cubiertos blanquecinos permanecen honestamente clasificados como **Nublado / Cubiertu** (`☁️`), reservando el icono `🌥️` y la etiqueta **Resol / Sol tamizáu** únicamente para cuando el sol rompe de verdad.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1127-resol-strict`, actualización a `?v=1.1.27` en hojas de estilo, scripts y módulos.

---

## [1.1.26] - 2026-09-29

### ☀️ Recalibración Inteligente del Resol Asturiano (Ley 7)
- **Eliminación del Falso Resol en Días Predominantemente Nublados:**
  - Tras observación empírica en tiempo real con Lendo en Asturias, se ajustaron los umbrales físicos del detector de *Resol / Sol tamizáu*.
  - Elevada la exigencia de radiación solar directa normal perpendicular (`direct_normal_irradiance`) a **190 W/m²** en otoño y primavera (frente a los 90 W/m² previos, que resultaban hiper-permisivos y activaban resol bajo simple claridad blanquecina grisácea).
  - Eliminado el atajo por radiación ultravioleta difusa (`uv >= uvStrict` con operador `OR`), que forzaba resol en horas centrales del día aunque el sol estuviera completamente oculto. A partir de ahora, el resol exige **imperativamente haz solar directo real** (`hasDirectBeam`).
  - Escala estacional actualizada: Otoño/Primavera **190 W/m²**, Verano **240 W/m²**, Invierno **150 W/m²**.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1126-resol-calibration`, actualización a `?v=1.1.26` en hojas de estilo, scripts y módulos.

---

## [1.1.25] - 2026-09-29

### 📱 Blindaje Anti-Desborde y Simetría en Arterias a la Meseta (Leyes 11 y 14)
- **Corrección de Desborde Lateral en Huerna (AP-66) y Pajares (N-630):**
  - Subsanada la anomalía de renderizado que provocaba que las tarjetas de las dos arterias principales hacia la meseta se saliesen por el margen derecho en smartphones, cortando los bordes redondeados y rompiendo la simetría con el resto de la interfaz.
  - Purgado un bloque duplicado obsoleto en `css/components.css` que forzaba un ancho de rejilla rígido (`minmax(280px, 1fr)`) incompatible con resoluciones móviles estrechas.
  - Implementada contención elástica total en `.passes-arteries-grid` y `.pass-artery-card` (`width: 100%; max-width: 100%; box-sizing: border-box; overflow: hidden;`), asegurando una columna única perfecta en pantallas móviles (`@media (max-width: 600px)`).
- **Cache-bust:** `sw.js` → `meteoasturlode-v1125-arteries-anti-overflow`, actualización a `?v=1.1.25` en hojas de estilo, scripts y módulos.

---

## [1.1.24] - 2026-09-29

### 📱 Puertos de Montaña sin Truncamientos en Móvil & Armonía Visual (Leyes 11 y 14)
- **Ergonomía Móvil y Supresión de Truncamientos en Puertos Generales:**
  - Reestructuradas las tarjetas `.pass-card` de todos los sectores geográficos (*Centro y Valles Mineros*, *Oriente y Picos de Europa*, *Occidente*) en una estructura envolvente y adaptativa de dos niveles.
  - Nombre del puerto completo con `white-space: normal`, `line-height: 1.35` y sin puntos suspensivos: erradicados los recortes `Puerto...` o `Alto de...`, permitiendo la lectura íntegra en cualquier dispositivo.
  - Vía, cota y concejo (`AS-112 • Altitud: 1520 m • Aller / León`) desplegados sin recortes.
- **Cápsula de Estado Adaptativa y Armonía Liquid Glass:**
  - La pastilla de estado de tráfico (`🟢 Tráfico Normal / Abierto`, `🟡 Precaución`, `⛓️ Cadenas Obligatorias`, `🔴 Cerrado`) se acopla fluidamente mediante `flex-wrap: wrap`, sin forzar al nombre del puerto a comprimirse ni romperse.
  - Incorporado micro-borde y fondo traslúcido reactivo a la severidad del estado (`p.color`), armonizando la estética con las Arterias Principales (AP-66 y N-630).
- **Limpieza de Cascada CSS:**
  - Eliminados dos bloques obsoletos y duplicados de `.pass-card` y `.passes-grid` en `css/components.css` que generaban conflictos de renderizado.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1124-mountain-passes-ergonomics`, actualización a `?v=1.1.24` en hojas de estilo, scripts y módulos.

---

## [1.1.23] - 2026-09-28

### 📱 Dos Botones Dedicados para Mañana y Tarde & Viento Anti-Desborde
- **Desacoplamiento Integral en Dos Botones Dedicados:**
  - Reemplazado el bloque unificado estrecho por dos botones interactivos independientes (`.d-daypart-btn.morning` y `.d-daypart-btn.afternoon`).
  - **Cabecera dedicada:** Etiqueta `🌅 MAÑANA` / `🌇 TARDE` a la izquierda y badge de pluviometría (`0.5 mm`) a la derecha.
  - **Cuerpo dedicado a todo el ancho:** Icono representativo (24px) y descripción meteorológica completa en tipografía legible sin truncamiento (`white-space: normal`), eliminando para siempre cortes como `Nu...` u `O...`.
- **Ajuste Tipográfico en Métricas de Viento y Rachas:**
  - Reducida la escala de `.u-m-val` y `.u-m-sub` en pantallas móviles a `0.78rem` / `0.68rem`, permitiendo la lectura íntegra de `18 km/h` y `Rachas 28` sin cortar a `18 k...`.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1123-dual-daypart-buttons`, actualización a `?v=1.1.23` en hojas de estilo, scripts y módulos.

---

## [1.1.22] - 2026-09-28

### 📱 Ergonomía Móvil Anti-Desborde en Pronóstico a 10 Días
- **Optimización de Textos en Mañana y Tarde:**
  - Extraído el término meteorológico principal (ej. `Nublado`, `Claros`, `Orbayu`) evitando particiones forzadas en 3 líneas en pantallas estrechas.
  - Implementado `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0;` en `.d-daypart-text`.
  - Preservado el texto bilingüe íntegro (`Nublado / Cubiertu`) en tooltip accesible (`title`).
- **Ajuste Anti-Truncado en Pastillas de Métricas Diarias:**
  - Pluviómetro compacto `${rain} mm` (en lugar de `mm total`), erradicando puntos suspensivos como `0.1 mm ...`.
  - Índice UV abreviado a `Mod.` (en lugar de `Moderado`), impidiendo cortes como `Moder...`.
  - Aumentado el padding y holgura interna de `.u-metric-item`.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1122-mobile-ergonomics`, actualización a `?v=1.1.22` en hojas de estilo, scripts y módulos.

---

## [1.1.21] - 2026-09-28

### ⚡ Corrección Crítica en Pronóstico Extendido a 10 Días
- **Subsanación de Variable Interna:**
  - Corregida referencia en la métrica del pluviómetro diario dentro de `forecastView.js` (`isSnowDay`), eliminando la excepción `ReferenceError` y restaurando la generación inmediata de todas las tarjetas diarias.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1121-forecast-fix`, actualización a `?v=1.1.21` en módulos y scripts.

---

## [1.1.20] - 2026-09-28

### ✨ Nueva Colección de Iconos «Futuro Clásico» (Vanguardia 2.5D)
- **Denominación Oficial Segura y Vanguardista:**
  - Bautismo definitivo de la nueva colección como **«Futuro Clásico»** (`futuroClasico` / `js/utils/weatherFuturoIcons.js`).
  - Totalmente blindada ante las políticas de marca registrada y propiedad intelectual de Google Play Store.
- **Diseño Digital de Alta Gama:**
  - Acabado en laca satinada multicapa, volúmenes 2.5D, sombreado ambiental suave (`feDropShadow`) y reflejos especulares de alta fidelidad.
  - Representación física real: escala hidrológica por intensidad horaria (1 gota en Orbayu, 3 en Moderada, 5 vectores densos sin rayo en Bastinazu), bolas de hielo densas en Granizo/Pedriscu, copos nítidos de nieve y Resol asturiano con manto estratiforme translúcido.
- **Integración y Compatibilidad:**
  - Nueva tarjeta `✨ Futuro Clásico` en `#icon-themes-modal` con previsualización en vivo.
  - Soporte de retrocompatibilidad transparente para identificadores previos.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1120-futuro-clasico`, actualización a `?v=1.1.20` en todos los módulos y scripts.

---

## [1.1.19] - 2026-09-28

### 🚘☀️ Nueva Colección de Iconos «Tesla Clásico» (Automotive Weather UI)
- **Diseño Automotriz de Alta Gama:**
  - Inspirado en la elegancia, precisión técnica y contraste de las interfaces de abordo de Tesla.
  - Acabado en laca satinada multicapa, volúmenes 2.5D, sombreado ambiental suave (`feDropShadow`) y reflejos especulares nítidos.
- **Física Meteorológica Real (Cero Fantasía):**
  - **☀️ Soleado (`clear-day` / `sun`):** Sol noble con volumen esférico, 8 rayos simétricos de alta gama y reflejo elíptico superior.
  - **🌙 Noche despejada (`clear-night` / `moon`):** Luna creciente nítida con textura de relieve y resplandor lunar suave.
  - **🌤️ Mayormente soleado & Nubes y Claros:** Transición suave con nubes satinadas blancas y disco solar emergente.
  - **🌥️ Resol asturiano (`resol`):** Disco solar central con halo expansivo difuminado, atravesando un manto estratiforme translúcido fidedigno con nubecita baja.
  - **💧 Escala Pluviométrica Fiel:**
    - *Orbayu / Llovizna:* 1 gota solitaria pura y cristalina con brillo especular.
    - *Lluvia moderada:* 3 gotas paralelas aerodinámicas de agua limpia.
    - *Lluvia fuerte / Bastinazu:* 5 vectores inclinados de agua densa sin rayo.
    - *Tormenta eléctrica:* Nube tormentosa oscura con rayo de oro eléctrico limpio y dos gotas.
  - **🧊 Granizo / Pedriscu (`hail`):** Nube de tormenta con nódulos de hielo esféricos sólidos de alta densidad, sombras grises y líneas de impacto de velocidad real.
  - **🌨️ Aguanieve (`sleet`):** Gotas de agua y cristales de nieve combinados simultáneamente.
  - **❄️ Escala de Nieve Graduada:** *Falispos* (1 copo fino), *Nevada moderada* (3 copos) y *Nevadona / Copiosa* (nube ártica con 5 copos densos).
- **Selector en Menú Modal & Previsualizaciones en Vivo:**
  - Nueva tarjeta `🚘 Tesla Clásico` y tarjeta `💎 Liquid Glass 3D` integradas en el selector visual de estilos (`#icon-themes-modal`).
  - Previsualizaciones vectoriales SVG dinámicas en tiempo real para todos los temas.
  - Sincronización de badges y persistencia inmediata en preferencias del usuario.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1119-tesla-icons`, actualización a `?v=1.1.19` en todos los módulos y scripts.

---

## [1.1.18] - 2026-09-28

### ❄️🧊 Granizo, Aguanieve y Graduación de Nieve en la Ecuación Pluviométrica
- **🧊 Granizo y Pedriscu en los 5 Temas Gráficos:**
  - Nube de tormenta amenazante con piedras de hielo duras anguladas cayendo a gran velocidad (`hail`).
  - Detección física directa de chubascos de granizo (WMO 89, 90), tormentas severas con granizo (WMO 96, 99) y granizo menudo/cinarra (WMO 77).
  - Pastilla de advertencia en previsiones `.has-hail` con tono perlado/amatista de alerta.
- **🌧️❄️ Aguanieve Fiel (Lluvia mezclada con Nieve):**
  - Icono híbrido que combina gotas de lluvia líquida simultáneamente con copos de nieve (`sleet`) en los 5 estilos artísticos.
  - Detección de WMO 68, 69, 83, 84 y mezcla física en pluviómetro con temperaturas de transición.
  - Pastilla pluviométrica en previsiones `.has-sleet` con tono turquesa/cian.
- **❄️ Graduación de Nieve por Pluviómetro (Agua Equivalente):**
  - **Falispos / Nevada ligera (0.1 a 0.7 mm equiv. o WMO 71/85):** Nube con 1 solo copito delicado (`snow-light`).
  - **Nevada moderada (0.8 a 2.4 mm equiv. o WMO 73):** Nube con 3 copos regulares (`snow`).
  - **Nevadona fuerte / Copiosa (>= 2.5 mm equiv. o WMO 75/86):** Nube plomiza de invierno con cortina densa de 5 copos copiosos (`heavy-snow`) y abrigo en cómic astur.
  - Pastillas en previsiones `.has-snow` y `.heavy-snow` con tonos gélidos y blanco puro con brillo.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1118-snow-hail`, actualización a `?v=1.1.18` en módulos, scripts y hojas de estilo.

---

## [1.1.17] - 2026-09-28

### 🌧️ Escala Hidrológica Visual de Lluvia & Desglose Pluviométrico Mañana/Tarde
- **Gradación Visual por Intensidad Horaria en mm/h:**
  - **💧 Orbayu / Llovizna ligera (0.1 a 0.4 mm/h):** Nube con **1 sola gota** cayendo en el centro.
  - **🌧️ Lluvia moderada (0.5 a 2.4 mm/h):** Nube con **3 gotas** regulares y continuas.
  - **🌧️🌊 Lluvia fuerte / Bastinazu (>= 2.5 mm/h o tramo >= 3.5 mm):** Nube plomiza con **cortina densa de 5 gotas enérgicas cayendo con fuerza**, ¡totalmente separada de tormenta y SIN RAYO!
  - **⛈️ Tormenta eléctrica:** Nube oscura con **rayo de tormenta y lluvia** (exclusivo para códigos WMO 95, 96, 99).
- **Cobertura en los 5 Temas Gráficos:**
  - `weatherAsturIcons.js`: Orbayu con 1 gotita bebé tierna y sonriente, bastinazu con 5 gotas densas y ojos decididos sin rayo.
  - `weatherPixelIcons.js`: Orbayu con 1 gota pixel, bastinazu con 5 columnas inclinadas pixel sin rayo.
  - `weatherNeonIcons.js`: Orbayu con 1 haz neón cian, bastinazu con 5 trazos neón intensos sin rayo.
  - `weatherSketchIcons.js`: Orbayu con 1 gota a tinta, bastinazu con 5 gotas artesanales densas sin rayo.
  - `weatherGlassIcons.js`: Orbayu con 1 gota perlada 3D, bastinazu con 5 gotas cristalinas sin rayo.
- **Pluviómetro Desglosado en Previsiones (`js/components/forecastView.js` & `css/components.css`):**
  - Pastilla 🌅 **Mañana (08:00 - 14:00):** Icono propio según la intensidad máxima del tramo + **acumulado exacto en mm** (ej. `0.4 mm` o `0 mm`).
  - Pastilla 🌇 **Tarde (14:00 - 21:00):** Icono propio según la intensidad máxima del tramo + **acumulado exacto en mm** (ej. `3.5 mm` o `0 mm`).
  - Métrica de Pluviómetro: Mantiene el total acumulado de las 24 horas del día (`X.X mm total`) para máxima coherencia hidrometeorológica.

### 🎨 Diferenciación de los 4 Estados Solares & Icono Propio de Resol Asturiano
- **Cuádruple Escenario Meteorológico Solar Inconfundible:**
  - **☀️ Soleado (`clear-day` / WMO 0):** Sol radiante, limpio, sin nubes.
  - **🌤️ Mayormente soleado (`mostly-clear-day` / WMO 1):** Sol protagonista en el centro con una **nubecita pequeña** abajo a la derecha.
  - **⛅ Parcialmente nublado / Claros (`partly-cloudy-day` / WMO 2):** **Nube grande** con sol asomando por detrás entre claros de cielo azul.
  - **🌥️ Resol / Sol tamizáu (`resol`):** Diseño propio exclusivo. El sol en el centro con su **halo dorado difuso**, cubierto por un **manto de nube semitransparente** (donde se ve el disco solar por detrás como un velo) más una nubecita baja sólida.
- **Implementación Vectorial en los 5 Temas Gráficos:**
  - `weatherAsturIcons.js` (Cómic Astur): Sol expresivo con ojos entrecerrados velados por la nube translúcida y nube pequeña compañera.
  - `weatherPixelIcons.js` (Pixel Art Retro): Píxeles de baja opacidad para el halo y velo nuboso translúcido sin duplicidades.
  - `weatherNeonIcons.js` (Glow & Line Art): Corona neón dorada con resplandor difuso, trazo suave para el velo y nubecita sólida.
  - `weatherSketchIcons.js` (Dibujo & Acuarela): Halo dorado difuso a la acuarela con líneas de pluma discontinuas y nube translúcida.
  - `weatherGlassIcons.js` (Liquid Glass 3D): Gradiente de velo translúcido con sol 3D de fondo y sombra suave.
- **Exposición en el Selector de Iconos (`index.html` & `js/app.js`):**
  - El modal de estilos de iconos ahora muestra la comparativa de los 4 estados solares para que el usuario pueda apreciar las diferencias al instante.
  - Se activa el estilo **Emojis Emotivos (Cómic Astur)** como recomendado y por defecto para que la app luzca siempre el arte propio de Asturias.
- **Cache-bust:** `sw.js` → `meteoasturlode-v1117-rain-scale`, actualización a `?v=1.1.17` en módulos, scripts y hojas de estilo.

---

## [1.1.16] - 2026-09-28

### ⚡ Motor de Rendimiento Adaptativo & Modo Economía (Performance Optimizer)
- **Detector Automático de Hardware Lento (`js/utils/gyroGlass.js`):**
  - Nueva función `detectLowPerf()` que evalúa tres señales combinadas al arranque: núcleos de CPU (`hardwareConcurrency <= 4`), RAM disponible (`deviceMemory <= 2 GB`) y benchmark sintético de CPU (200k iteraciones `Math.sqrt` — ~2ms en flagship, ~35ms en Snapdragon 4xx).
  - El resultado se persiste en la sesión mediante la clase CSS `.low-perf` en `<html>`, permitiendo que tanto JS como CSS reaccionen a él.
  - Diagnóstico visible en consola para beta testers: `[GyroGlass] Modo Economía activado → núcleos: 4, RAM: 2 GB, benchmark: 38.2 ms`.
- **Throttling Adaptativo del Bucle Giroscópico (30fps en móviles lentos):**
  - En dispositivos detectados como lentos: el `requestAnimationFrame` se limita a 30fps (presupuesto de 33ms por frame) en lugar de 60fps, reduciendo a la mitad la carga del hilo principal.
  - *Idle breathing* desactivado en modo economía: en reposo, la posición del cristal se fija en el centro (x=50%, y=30%) eliminando el cálculo sinusoidal continuo de `Math.sin/cos` en cada frame.
  - Blur fijo de 14px en modo economía (vs. dinámico 18-36px) para eliminar los repaints continuos del `backdrop-filter`.
  - Ángulo de inclinación máximo reducido a ±3° (vs. ±5.5°) para que el efecto siga siendo visualmente elegante sin castigar la GPU.
- **Canvas de Partículas Climáticas Escalado Automáticamente (`js/app.js`):**
  - Respeto estricto de `prefers-reduced-motion`: canvas desactivado completamente si el SO del usuario lo solicita.
  - Factor de escala `perfScale = 0.6` en modo economía: todos los modos reducen su conteo al 60% (lluvia 60→36, tormenta 80→48, estrellas 75→45, nieve 60→36, nubes 45→27).
  - Eliminación de `ctx.shadowBlur` en todos los modos del canvas (`sun-motes`, `stars`, `snow`): en GPUs de gama baja, el shadowBlur fuerza renderizado por software desactivando la aceleración hardware. Sustituido por ligero incremento de alpha que preserva el efecto visual sin coste.
- **CSS Modo Economía `.low-perf` (`css/components.css` & `css/main.css`):**
  - Regla selectora `html.low-perf .{card}` que sobreescribe: `backdrop-filter: blur(12px) saturate(150%)` (vs. 24px+), `transform: none` (sin paralaje), `box-shadow` estático y `transition` mínima.
  - Pseudo-elemento `::after` (halo óptico prismático) oculto (`display: none`) en modo economía para eliminar la capa compositing extra que genera.
  - `will-change: transform` añadido al bloque principal de tarjetas glass y al `.app-header` para promoverlos a capas compositing independientes en la GPU, reduciendo el área de repaint en cada frame.
- **Cache-bust:** `sw.js` → `meteoasturlode-v242-perf-opt`, actualización a `?v=1.1.16-perf-opt-v242` en módulos, scripts y hojas de estilo.

---

## [1.1.15] - 2026-09-27
 
### 💎 Cristal Óptico Real & Desenfoque Dinámico Reactivo (Apple True Glass)
- **Supresión de Rayas Sintéticas & Halo Especular Difuso (`css/components.css` & `css/main.css`):**
  - Eliminación de los degradados lineales con bandas de color que generaban apariencia de "imagen o pegatina con reflejos dibujados".
  - Sustitución por un halo especular difuso y puro (`radial-gradient` con `mix-blend-mode: overlay` y `z-index: 1`), integrando la luz en el cristal de forma sedosa sin cubrir textos ni sensores con líneas de color.
- **Desenfoque Dinámico Reactivo al Giro (`js/utils/gyroGlass.js`):**
  - Nueva variable `--glass-blur` sincronizada con la inclinación del terminal (oscila en tiempo real de 18px a 36px).
  - Al girar el móvil, la profundidad de desenfoque del `backdrop-filter` se modula orgánicamente, dando la sensación táctil y visual de que el cristal se vuelve más lechoso y denso en ángulos oblicuos.
- **Orbes Atmosféricos de Contraste en Fondo (`css/main.css`):**
  - Inyección de orbes lumínicos (cian, violeta y zafiro) en el fondo del lienzo que se difunden activamente a través del cristal esmerilado de las tarjetas, haciendo visible de inmediato la refracción y el desenfoque real.
- **Cache-bust:** `sw.js` → `meteoasturlode-v241-real-glass`, actualización a `?v=1.1.15-real-glass-v241` en módulos, scripts y hojas de estilo.

---

## [1.1.14] - 2026-09-27
 
### 💎 Panel Unificado Apple Liquid Glass en Todas las Tarjetas
- **Extensión Universal del Motor Óptico (`css/components.css` & `css/main.css`):**
  - El efecto Apple Liquid Glass (barrido diagonal prismático de 115°, manto esmerilado de dispersión `--glass-mist` y halo de borde interior reactivo *Edge Bloom*) se extiende al 100% de los bloques y tarjetas de la aplicación:
    - Cabecera compacta y navegación unificada (`.app-header`).
    - Tarjeta maestra de tiempo actual (`.hero-weather-card`).
    - Bloque de pronóstico horario 72h continuo (`.forecast-block`).
    - Cuadrícula de sensores de viento, humedad, UV, presión y polen (`.sensor-card`).
    - Gráficos interactivos 48h (`.chart-card`).
    - Tarjetas de módulos especializados: Playas & Mareas (`.marine-card`), Surf & Rompientes (`.surf-card`), Cordillera & Nieve (`.mountain-card`), Cosmos & Astronomía (`.astronomy-card`) y Tendero Asturiano (`.laundry-card`).
- **Micro-Paralaje Óptico Reactivo 2D Sincronizado:**
  - Todas las tarjetas se mueven y refractan armónicamente en bloque según la inclinación del terminal o la interacción táctil, preservando íntegra la aceleración GPU y el desenfoque `backdrop-filter: blur(24px) saturate(190%)`.
- **Cache-bust:** `sw.js` → `meteoasturlode-v240-all-glass`, actualización a `?v=1.1.14-all-glass-v240` en módulos, scripts y hojas de estilo.

---

## [1.1.13] - 2026-09-27

### 🌊 Motor Óptico de Refracción Líquida & Barrido Prismático (Apple Liquid Glass)
- **Onda Diagonal de Barrido Óptico Líquido (`js/utils/gyroGlass.js` & `css/components.css`):**
  - Implementación del barrido de lente líquida auténtico de Apple iOS: una franja diagonal ancha de refracción prismática (cian `0.18`, destello blanco cristalino `0.48` y violeta difuso `0.20`) que barre de lado a lado (-10% a 110%) al girar el móvil o deslizar el dedo.
  - Al inclinarse el terminal, la onda de luz resbala por encima de la tarjeta simulando la refracción y el desenfoque de una lente física en movimiento.
- **Halo de Borde Interior Reactivo (*Internal Edge Bloom*):**
  - Bisel interior de profundidad (`box-shadow: inset`) que se desplaza en tiempo real: al inclinar a la derecha o izquierda, el borde correspondiente proyecta un halo de luz y desenfoque de 24px hacia el interior de la tarjeta, otorgando sensación de grosor y bisel tallado.
- **Cache-bust:** `sw.js` → `meteoasturlode-v239-liquid-glass`, actualización a `?v=1.1.13-liquid-glass-v239` en módulos, scripts y hojas de estilo.

---

## [1.1.12] - 2026-09-27

### 💎 Cristal Líquido & Dispersión Esmerilada Reactiva (Frosted Glass Sheen)
- **Desbloqueo GPU del Motor de Desenfoque (`css/components.css`):**
  - Supresión de perspectivas 3D (`perspective` / `rotateX` / `rotateY`) en las tarjetas principales que provocaban que los navegadores móviles (Chromium Android y WebKit iOS) cancelaran el `backdrop-filter`. Sustitución por micro-paralaje suave 2D (`translate`) 100% compatible.
  - Incremento del desenfoque base a `blur(24px) saturate(190%)` con marco biselado tallado (`inset 0 1px 1px rgba(255, 255, 255, 0.45)`).
- **Manto de Dispersión Esmerilada Reactivo al Giro (`js/utils/gyroGlass.js` & `css/components.css`):**
  - Nueva variable dinámica `--glass-mist` que mide la inclinación respecto al centro. A mayor ángulo de giro del móvil, el cristal dispersa un manto lechoso zafiro más denso, simulando fielmente la refracción física de un vidrio esmerilado de revista.
- **Orbes Luminosos de Alto Contraste en Temas Nocturnos (`css/weather-themes.css`):**
  - Focos radiales cian y zafiro de alta potencia situados directamente detrás de las tarjetas para que el desenfoque refracte luz y volumen reales en la noche asturiana.
- **Cache-bust:** `sw.js` → `meteoasturlode-v238-super-glass`, actualización a `?v=1.1.12-glass-v238` en módulos, scripts y hojas de estilo.

---

## [1.1.11] - 2026-09-27

### 📱 Perfeccionamiento Apple Liquid Glass & ⚡ Disparo Prioritario de Novedades
- **Cristal Líquido Dinámico Refinado (`js/utils/gyroGlass.js` & `css/components.css`):**
  - Reflejo especular puro sin modos de fusión que lo apaguen en fondos oscuros, con bisel de luz interior tallado (`inset 0 1px 1px rgba(255, 255, 255, 0.35)`).
  - Soporte táctil directo (`touchmove`), giroscopio calibrado para la mano, permisos automáticos en iOS Safari y respiración ambiental viva en reposo (*idle breathing*).
  - Efecto extendido a todas las tarjetas de sensores (`.sensor-card`) como un panel unificado de zafiro.
  - Orbes de luz atmosférica de fondo en temas nocturnos (`cloudy-night`, `clear-night`, `partly-cloudy-night`) para refracción con volumen real.
- **Disparo Prioritario Inmediato de Novedades (`js/app.js`):**
  - Reubicación de `checkChangelogAutoPrompt()` al inicio instantáneo de la aplicación (400 ms) sin esperar a peticiones asíncronas de red, garantizando el cumplimiento fiel del Auto-Prompt de la Constitución (Ley 13).
- **Cache-bust:** `sw.js` → `meteoasturlode-v237-apple-glass`, actualización a `?v=1.1.11-glass-v237` en módulos, scripts y hojas de estilo.

---

## [1.1.10] - 2026-09-27

### 📱 Cristal Líquido Dinámico (Apple Liquid Glass Giroscopio) & 🌌 Noche Nublada Zafiro
- **Efecto de Cristal Líquido Giroscópico & Táctil (`js/utils/gyroGlass.js` & `css/components.css`):**
  - Motor físico en tiempo real conectado al giroscopio del móvil (`DeviceOrientationEvent`: inclinación lateral y frontal), gestos táctiles (`touchmove`), cursor en PC y respiración ambiental viva en reposo (*idle breathing*).
  - Destello especular líquido dinámico sobre la tarjeta principal y tarjetas de sensores con bisel de luz interior tallado (`inset 0 1px 1px rgba(255, 255, 255, 0.35)`), sin modos de fusión que apaguen el brillo en fondos oscuros.
  - Micro-inclinación tridimensional física (perspectiva 3D con suave tilt de hasta 4.5 grados) con suavizado mediante interpolación continua a 60 fps.
  - Filtro de refracción vítrea (`blur(12px) saturate(145%)`) preservando las partículas animadas de fondo.
- **Tema Atmosférico Nocturno Dedicado con Orbes de Luz (`css/weather-themes.css` & `js/app.js`):**
  - Sustitución del gris diurno plano por el nuevo tema específico **`cloudy-night`**: orbes de luz ambiental zafiro/cian difusos que aportan profundidad real a la refracción del cristal, con halo de luna y alto contraste OLED.
- **Cache-bust:** `sw.js` → `meteoasturlode-v236-apple-glass`, actualización a `?v=1.1.10-glass-v236` en módulos, scripts y hojas de estilo.

---

## [1.1.9] - 2026-09-27

### ❄️ Detector de Heladas y Placas de Hielo ("Alerta Xelu") & 🌿 Monitor de Polen (AQI)
- **Detector Silencioso de Heladas y Placas de Hielo en Firme (`js/utils/xeluDetector.js`):**
  - Motor termodinámico que evalúa subenfriamiento superficial (&le; 2.5 °C), punto de rocío (&le; 0.5 °C) y enfriamiento radiativo nocturno/matinal (21h a 10h) bajo calma de viento (&le; 12 km/h).
  - Dos estados de severidad con código semafórico vial internacional: 🟡 ❄️ *Riesgo de Helada • Alerta Xelu* (firme húmedo y asfalto resbaladizo preventivo en marco amarillo ámbar pulsante) y 🔴 🧊 *Alerta de Placas de Hielo en Asfalto* (hielo negro invisible en calzada con marco rojo de emergencia idéntico a la Galerna Severa).
  - Cápsulas métricas a 999px y botón didáctico `💡 ¿Por qué ocurre?`.
  - Integración estricta con la **Doctrina Constitucional 12** (conmutador de simulacro controlado `?test=xelu`, `?test=helada` y `?test=hielo`).
- **Monitor de Polen Activo en Calidad del Aire (`js/services/weatherApi.js` & `js/components/currentCard.js`):**
  - Consulta en tiempo real de alérgenos clave en Europa vía *Copernicus CAMS Open-Meteo*: Gramíneas, Abedul, Aliso, Olivo y Ambrosía sin coste de API ni peticiones adicionales.
  - Fila ergonómica integrada en el sensor de Calidad del Aire con pastillas semafóricas (Nulo 🟢, Bajo 🟢, Moderado 🟡, Alto 🔴) y blindaje anti-desborde (Doctrina 11).
- **Suite Didáctica Ampliada (`js/utils/weatherExplanations.js`):**
  - Nuevas entradas educativas completas en el modal didáctico para `xelu` (física de la helada, inversión térmica en valles asturianos, hielo negro y seguridad vial) y `aqi` (partículas PM2.5/PM10 y aerobiología).
- **Cache-bust:** `sw.js` → `meteoasturlode-v233-semaforo`, actualización a `?v=1.1.9-semaforo-v233` en módulos, scripts y hojas de estilo.

---

## [1.1.8] - 2026-09-27

### 📍 Jerarquía Visual & Tipografía en Ubicaciones y Parroquias
- **Subordinación Estética de Localidades Secundarias (`js/components/currentCard.js` & `css/components.css`):**
  - Implementación de la función `formatLocationTitle()` que identifica automáticamente los núcleos y parroquias entre paréntesis (ej. *(Piedras Blancas / Salinas)* en Castrillón o *(Pola de Allande)* en Allande).
  - Jerarquía tipográfica refinada: el nombre principal del concejo mantiene su tamaño destacado (`1.35rem`, peso `800` en blanco), mientras que el texto entre paréntesis se estiliza con `.location-locality` (`0.90rem`, peso `600`, tono sutil `#cbd5e1`).
  - Adaptabilidad fluida garantizada en móviles: si el nombre es extenso en resoluciones estrechas, salta de línea de forma armónica sin forzar desbordes ni cortar la insignia del concejo.
- **Cache-bust:** `sw.js` → `meteoasturlode-v228-location-locality`, actualización a `?v=1.1.8-loc` en módulos, scripts y hojas de estilo.

---

## [1.1.7] - 2026-09-27

### 🌡️ Ergonomía Visual & Legibilidad de Cápsulas Térmicas
- **Cápsulas de Mínimas y Máximas Diarias (`css/components.css`):**
  - Ajuste ergonómico en `.t-pill` aumentando el tamaño de fuente de `0.82rem` a `0.92rem` (+12% de superficie visual) y el peso tipográfico a `800` (negrita extra).
  - Incremento del relleno interior a `4px 10px` con bordes redondeados a `7px` para enmarcar con holgura los extremos térmicos diarios (`↓ Tmin` y `↑ Tmax`).
  - Totalmente blindado contra desbordes en teléfonos móviles de pantalla estrecha (320px–360px) en cumplimiento de la Doctrina Constitucional 11.
- **Cache-bust:** `sw.js` → `meteoasturlode-v227-pill-size`, actualización a `?v=1.1.7-pills` en módulos, scripts y hojas de estilo.

---

## [1.1.6] - 2026-09-27

### 📊 Tiempo Habitual & Normales Climatológicas 1991–2020 (AEMET / OMM)
- **Motor Climatológico Autónomo (`js/utils/climatologyData.js`):**
  - Incorporación de las tablas de normales climatológicas de la serie oficial estándar de 30 años (1991–2020) de AEMET OpenData (Resolución de 30/11/2015, datos públicos abiertos bajo Ley 37/2007).
  - Cálculo 100% en local en el dispositivo del usuario: cero peticiones de red adicionales, cero consumo de cuota de API y 100% de cumplimiento estricto con las políticas de Google Play Store (TWA).
  - Algoritmo de ponderación quincenal para transiciones suaves en cambios de mes (ej. finales de septiembre pondera con inicios de octubre).
- **Zonificación Asturiana & Gradiente de Altitud:**
  - Clasificación de los 78 concejos en 4 áreas microclimáticas homogéneas: Costa y Litoral Cantábrico, Valles Centrales y Cuencas, Occidente y Suroccidente, y Montaña / Cordillera Cantábrica.
  - Corrección térmica vertical automática por gradiente adiabático estándar (-0.6 °C por cada 100 metros de elevación sobre el nivel del mar).
- **Franja Ergonómica de Tiempo Habitual (`css/components.css` & `js/components/currentCard.js`):**
  - Tira integrada al pie de la *Hero Weather Card* con diseño Liquid Glass, microanimación hover e inmunidad total a desbordes en teléfonos móviles (Constitución Ley 11).
  - Códigos de color y badges temáticos: 🔥 *Más cálido de lo habitual* (anomalía > +1.5 °C), 🌿 *Acorde a lo habitual* (entre -1.5 °C y +1.5 °C), y ❄️ *Más fresco / frío* (< -1.5 °C).
  - Botón táctil ergonómico `[ 📊 Tiempo Habitual ]` que abre la nueva guía didáctica interactiva en el modal educativo (`js/utils/weatherExplanations.js`).
- **Cache-bust:** `sw.js` → `meteoasturlode-v226-clima-habitual`, actualización a `?v=1.1.6-clima` en módulos y scripts.

---

## [1.1.5] - 2026-09-27

### 🌊 Detector Silencioso de Galerna Cantábrica en Tiempo Real
- **Motor Físico & Cinemático de Detección (`js/utils/galernaDetector.js`):**
  - Monitorización costera de los concejos del litoral asturiano (Castrillón, Gijón, Gozón, Llanes, Ribadesella, Carreño, Avilés, Valdés, Tapia, etc.).
  - Detección precisa del rolido súbito a componente Noroeste (WNW a NNW: 270° a 345°) combinado con aceleración violenta de rachas (&ge; 45 km/h moderada, &ge; 65 km/h severa).
  - Análisis cinemático de las últimas 1 a 3 horas: evalúa el desplome térmico rápido (&ge; 4.0 °C respecto al bochorno previo) y el salto barométrico repentino (&ge; 1.5 hPa) por irrupción de aire denso oceánico.
- **Banner Dinámico de Advertencia Náutica (`css/components.css` & `js/components/currentCard.js`):**
  - Principio silencioso idéntico al Efecto Foehn: si no hay galerna, no ocupa espacio ni emite señales de ruido en la interfaz.
  - Al desencadenarse, despliega el banner *Liquid Glass* azul marino (`.galerna-banner`) con halo oceánico palpitante, métricas en tiempo real (rumbo NW, rachas km/h, caída térmica y salto de presión) y botón directo `💡 ¿Por qué ocurre?` hacia la enciclopedia meteorológica asturiana (`data-phenomenon="galerna"`).
- **Cache-bust:** `sw.js` → `meteoasturlode-v225-galerna-detector`, actualización a `?v=1.1.5-galerna` en módulos y CSS.

---

## [1.1.4] - 2026-09-27

### 🏄 Fidelidad Oceanográfica & Calibración de Superficie Glassy
- **Textura de Lámina de Agua en Calma (`js/components/surfCard.js` & `js/utils/weatherExplanations.js`):**
  - Corrección física y oceanográfica certera de la descripción de *Superficie Glassy* (viento &le; 6 km/h).
  - Supresión de la afirmación "La lámina de agua parece un espejo perfecto", físicamente incongruente cuando existe swell u oleaje activo rompiendo en la playa.
- **Suite Didáctica de Surf & Tablas Visuales (`js/utils/weatherExplanations.js` & `css/components.css`):**
  - Incorporación en el modal didáctico [💡 Explícame] de tablas ergonómicas adaptadas a móvil que desglosan con total transparencia los tres pilares de la nota (altura hasta 4 pts, período hasta 4 pts, energía hasta 2 pts = 10 pts máx.).
  - Tabla comparativa intuitiva para entender de un vistazo la condición física de estrellas doradas (terral offshore), blancas (calma glassy / olas nobles) y 0★ (chop onshore o mar pasado).
  - Blindaje CSS responsive contra desbordes en teléfonos móviles (`.explain-table-container` con scroll táctil suave y badges de puntos).
- **Cache-bust:** `sw.js` → `meteoasturlode-v224-surf-tables-live`, actualización a `?v=1.1.4-tables-live` en módulos y CSS.

---

## [1.1.3] - 2026-09-27

### ⛅ Calibración Solar Inteligente Estacional & Detector Asturiano de "Resol / Sol tamizáu"
- **Calibración Solar Estacional Astronómica (`js/utils/weatherIcons.js`):**
  - Implementación de la función `getSeasonalSolarThresholds()` adaptada a la latitud de Asturias (~43.5° N).
  - Escalonamiento de umbrales de radiación UV y global (SW) según la altura astronómica del sol a lo largo del año (verano, primavera/otoño, invierno).
  - Eliminación definitiva del bloqueo estacional que impedía validar sol en superficie en otoño e invierno al exigir índices UV veraniegos inalcanzables (UV >= 4.5).
- **Sensor Rey de Radiación Directa & Detección Fidedigna de Resol:**
  - Integración del parámetro de Radiación Solar Directa Perpendicular (`direct_normal_irradiance` >= 90-100 W/m²).
  - Cuando los modelos matemáticos en bruto predicen un cielo 100% cubierto por velos de nubes altas (cirros/altoestratos) pero los sensores en tierra demuestran que los rayos del sol atraviesan la capa nubosa, la app desempata con rigor y autenticidad asturiana etiquetando **"Resol / Sol tamizáu"** con icono `⛅` (sol tras nube / "el huevo frito").
  - Blindaje anti-panza de burro: si el cielo es una sábana blanca u oscura sin sol (niebla o nubes bajas densas), la radiación directa es nula (0 a 20 W/m²), manteniéndose con total fidelidad en "Nublado / Cubiertu".
- **Enciclopedia Didáctica de Fenómenos (`js/utils/weatherPhenomena.js`):**
  - Incorporación de la ficha didáctica oficial del *Resol (Sol tamizáu / Resolana)* con explicación óptica, causas y prevención de quemaduras solares bajo nubes altas.
- **Blindaje Anti-Desborde y Ergonomía Móvil Estricta (Ley Constitucional 11):**
  - Supresión de la pastilla redundante de colada en la Hero Weather Card: la recomendación de secado se preserva en su tarjeta dedicada de ancho completo (#7) al final de la cuadrícula de sensores, eliminando la sobrecarga horizontal que provocaba desbordes en teléfonos móviles de 320px-380px.
  - La fila de temperatura principal recupera holgura total: la condición meteorológica, sensación térmica y pastillas térmicas `[↓ 15°C]` y `[↑ 22°C]` lucen sin cortes ni colisiones.
- **Suite de Iconos Exclusivos de Resol en Todos los Temas Visuales:**
  - Nueva clave visual `svgKey: 'resol'` con emoji nativo `🌤️`.
  - **Tema Astur:** Sol sonriente con gafas de sol oscuras (el sol que deslumbra) y rayos atravesando la nube.
  - **Tema Neón:** Sol dorado central con halo resplandeciente (`#neon-glow-resol`) y rayos penetrando la nube cian.
  - **Tema Pixel Art:** Sol radiante en 8-bits con corona de rayos filtrándose entre los bloques de la nube.
  - **Tema Sketch:** Sol en acuarela dorada y trazos de pluma con rayos cruzando el velo nuboso.
- **Cache-bust:** `sw.js` → `meteoasturlode-v221-resol-icons`, actualización a `?v=1.1.3-resolicon` en módulos y CSS.

---

## [1.1.2] - 2026-09-26

### 🧺 Asesor Inteligente y Simpático de la Colada & Secado ("¿Tiendo fuera o dentro?")
- **Motor Termodinámico de Evaporación Textil (`js/utils/laundryAdvisor.js`):**
  - Algoritmo físico multicriterio que calcula el índice de secado (0 a 100) evaluando humedad relativa ambiental, temperatura, déficit de saturación de vapor (Ley de Dalton), arrastre por viento (eliminación de la capa límite saturada), radiación solar directa/global y probabilidad de lluvia en las próximas 4 horas (`hourly.precipitation_probability` y `hourly.precipitation`).
  - 4 Veredictos de secado con lenguaje cercano, auténtico y simpático asturiano:
    - 🟢 **¡Tiende con gloria!**: Secado exprés en exteriores (1h30 a 2h30). Activado con humedad baja (< 62%), insolación directa o días de Efecto Foehn ("Vientu les Castañes").
    - 🟢 **¡Adelante, buen día para tender!**: Condiciones óptimas de secado al aire libre (3h a 4h30) con atmósfera seca (< 76% HR) y brisa favorable.
    - 🟡 **Tiende con ojo / Mejor a cubierto**: Humedad elevada (> 76%), días fríos o noche con serena/rocío cantábrico (secado muy lento o riesgo de humedecimiento nocturno).
    - 🔴 **¡Ni se te ocurra, que te va orpinar!**: Lluvia activa o previsión inmediata de precipitaciones/llovizna en las próximas 4 horas (> 40% PoP o código WMO de orvayu).
- **Alerta Eólica Especial de Pinzas:**
  - Si las rachas de viento superan los 42 km/h, se activa la advertencia simpática 💨 *¡Sujeta bien los calzones!*, aconsejando doble pinza de madera o tender en zona resguardada del vendaval.
- **Doble Presencia y Máxima Visibilidad (`currentCard.js` & `components.css`):**
  - **Píldora Rápida en Tarjeta Principal (Hero Card):** Integración directa en la cabecera en vivo (`🧺 ¡Tiende con gloria!`, etc.) que permite conocer el veredicto de un vistazo sin necesidad de scroll y con enlace interactivo que desplaza suavemente hacia el informe completo.
  - **Tarjeta Destacada a Ancho Completo (`grid-column: 1 / -1`):** Posicionada en la cabecera de la cuadrícula de sensores, con barra de evaporación, tiempo estimado de secado, factores desglosados y botón didáctico `💡 Explícame`.
- **Suite Didáctica "¿Cómo se calcula?" (`js/utils/weatherExplanations.js`):**
  - Explicación científica accesible sobre la evaporación y ley de Dalton, eliminación de capa límite por viento, efecto Foehn ("vientu les castañes"), el orpín asturiano y la serena nocturna.
- **Cache-bust:** `sw.js` → `meteoasturlode-v217-v1.1.2-colada-prominent`, sincronización de todos los módulos ES internos a `?v=1.1.2-fix`.

---

## [1.1.1] - 2026-09-26

### 📹 Guía y Visor Oficial de Webcams de Asturias (Playas y Puertos)
- **Módulo y Modal de Webcams (`#webcams-modal` & `js/utils/webcamsData.js`):**
  - Catálogo curado de cámaras oficiales y en directo de Asturias clasificado en dos categorías:
    - **🏖️ Playas y Costa:** Salinas, San Lorenzo (La Escalerona y Piles), Poniente, Rodiles, Santa Marina (Ribadesella), Tapia, Luanco, Candás, Llanes (El Sablón), Vega y Xagó.
    - **🏔️ Puertos y Montaña:** Puerto de Pajares (N-630 / DGT), Autopista del Huerna (AP-66 / Aucalsa), Valgrande-Pajares (Cuitu Negru y Brañillín), Fuentes de Invierno (Entresierras y Llano Fitu), San Isidro, Somiedo, Leitariegos, Tarna, Lagos de Covadonga y Cabo Peñas.
  - Conmutador segmentado táctil entre Playas y Montaña con buscador interactivo en tiempo real por nombre, concejo o descripción.
  - Tarjetas acristaladas con ubicación, tipo de arenal o paso, proveedor oficial y enlace directo en pestaña segura sin intermediarios ni violación de derechos de autor.
- **Acceso Contextual en la App:**
  - En la tarjeta de **Playas & Mareas**: Botón ergonómico `📹 Ver Webcams de Playas en Directo`.
  - En la tarjeta de **Cordillera & Nieve**: Botón ergonómico `📹 Ver Webcams de Puertos y Pistas en Vivo`.
  - En el **Menú de Módulos (`nav-modal`)**: Fila secundaria dedicada de acceso general (Ley Constitucional 11).
- **Cache-bust:** `sw.js` → `meteoasturlode-v212-v1.1-webcams`, query strings `v=1.1`.

---

## [1.1.0] - 2026-09-26 (Lanzamiento Mayor v1.1)

### 🚀 Consolidación de Versión v1.1 y Sistema de Novedades Automáticas
- **Salto Oficial de Versión a v1.1**:
  - Actualización del badge del footer (`#app-version-badge`) a `v1.1 🚀`.
  - Actualización completa del modal de Novedades (`#changelog-modal`) reuniendo todos los avances desde v1.0.81 (17 de septiembre).
  - **Aviso Automático de Novedades (`checkChangelogAutoPrompt`)**: Despliegue del modal de cambios informando al usuario de todas las mejoras introducidas.
  - **Blindaje Anti-Cierre Prematuro en Arranque**:
    - Supresión de `history.pushState` en la apertura automática en frío para neutralizar eventos `popstate` durante la inicialización del navegador.
    - Guarda en el listener de `popstate` (`if (e.state?.modalOpen) return;`) para evitar cierres accidentales.
    - Registro en `localStorage` únicamente tras el cierre explícito del usuario (`[ ✕ ]` o clic exterior), asegurando que si la app recarga por actualización de caché no se pierda el aviso.
    - Protección en `controllerchange` de Service Worker para no recargar bruscamente la página mientras el usuario lee el modal de novedades.
  - Sincronización de caché PWA en `sw.js` (`meteoasturlode-v211-v1.1`) y parámetros de cache-busting en CSS y JS (`?v=1.1`).

---

## [1.1.06] - 2026-09-26

### 🌬️ Detector de Efecto Foehn ("Vientu les Castañes")
- **Motor Científico de Detección Termodinámica en Vivo (`js/utils/foehnDetector.js`):**
  - Evalúa en tiempo real las 3 variables definitorias del Foehn asturiano:
    1. Viento de componente Sur estricto (135° SSE a 225° SSO).
    2. Caída anómala de la humedad relativa por debajo del 52% (moderado) o del 38% (severo/extremo), frente a la media cantábrica habitual del 75-95%.
    3. Rachas activas aceleradas por compresión adiabática y canalización orográfica desde la Cordillera Cantábrica hacia los valles y la costa (rachas >= 28 km/h o sostenido >= 16 km/h).
- **Banner Dinámico Acristalado en Tarjeta "En Vivo" (`currentCard.js`):**
  - Muestra un banner ámbar/naranja con resplandor cálido (`.foehn-banner`), diagnóstico en vivo de humedad y racha, y botón didáctico `💡 ¿Por qué ocurre?` con enlace directo al modal de divulgación meteorológica (`#phenomenon-card-foehn`).
  - Indicador específico de Viento Sur activo integrado en la tarjeta del anemómetro y rosa de los vientos.
- **Cache-bust:** `sw.js` → `meteoasturlode-v206-foehn`, query strings actualizadas a `v=1.1.06-foehn` y `css/components.css?v=1.1.06`.

---

## [1.1.05] - 2026-09-26

### 🧹 Limpieza Minimalista del Radar Cantábrico: Supresión de Botones Redundantes
- **Eliminación de controles duplicados:**
  - Se eliminan los botones `📊 Menú` y `📖 Fenómenos` de la botonera superior del radar, al estar ya integrados y permanentemente accesibles en la cabecera principal y en la barra de herramientas del menú de la app.
  - Se elimina el botón redundante `🔝 Subir al Menú Principal` al pie del mapa, dejando el marco inferior completamente limpio y despejado.
- **Enfoque en acciones esenciales:**
  - La tarjeta del radar conserva de forma minimalista únicamente las dos acciones nucleares: `🎯 Centrar Asturias` y `▶️ Reproducir Radar`.
- **Cache-bust:** `sw.js` → `meteoasturlode-v205-radarmarkupclean`, query strings actualizadas a `v=1.1.05-radarmarkupclean` y `css/components.css?v=1.1.05`.

---

## [1.1.04] - 2026-09-26

### 📱 Radar Móvil: Ergonomía Cuadrada y Erradicación del Secuestro Táctil
- **Mapa cuadrado y adaptativo en móvil (`@media (max-width: 650px)`):**
  - Se ajusta la altura de `#map-container` en pantallas móviles a `380px` (`max-height: 52vh; min-height: 320px`), eliminando el rascacielos vertical desproporcionado de 620px.
  - La relación de aspecto en móvil ahora es cuadrada y proporcionada, encuadrando Asturias con naturalidad geográfica (igual que en tablets o PC).
- **Erradicación de la "trampa táctil" (Leaflet Touch Hijacking):**
  - Al no ocupar la pantalla completa del móvil, deja siempre bandas libres por encima y por debajo donde apoyar el pulgar para hacer scroll vertical normal en la página web.
  - Al cambiar a la pestaña 'radar', el visor realiza un scroll automático suave (`window.scrollTo({ top: 0, behavior: 'smooth' })`) garantizando que la cabecera quede siempre visible.
- **Doble botón de rescate y navegación al Menú:**
  - En la botonera superior del radar: nuevo botón `📊 Menú` que abre directamente el modal selector de módulos sin necesidad de desplazarse.
  - Al pie del mapa: nuevo botón de rescate `🔝 Subir al Menú Principal` (`.btn-radar-rescue`) para volver a la cabecera con un solo toque desde cualquier punto inferior.
- **Cache-bust:** `sw.js` → `meteoasturlode-v204-radarmobile`, query strings actualizadas a `v=1.1.04-radarmobile` y `css/components.css?v=1.1.04`.

---

## [1.1.03] - 2026-09-26

### 🛰️ Radar Cantábrico: Satélite Real por Defecto y Blindaje de Zoom
- **Satélite Real por defecto:** Se activa `layerSat` (*Esri World Imagery HD*) como capa base por defecto al cargar el Radar Cantábrico, ubicándola como primera opción en el selector de capas.
- **Blindaje de alejamiento (Anti-pantalla en blanco):**
  - Ajustado `minZoom: 6` en el mapa principal y `minZoom: 4` en todas las capas base (`layerSat`, `layerTopo`, `layerOSM`) y capa de radar (`radarTileLayer`).
  - Previene que el mapa quede en gris/blanco al alejar, enmarcando de forma óptima el Mar Cantábrico, el Golfo de Vizcaya y la mitad norte peninsular para observar la aproximación de frentes.
- **Supresión del error "Zoom Level not supported" al acercar:**
  - **Causa raíz:** RainViewer solo genera teselas de radar meteorológico nativas hasta zoom nivel 7. Al tener fijado `maxNativeZoom: 10`, Leaflet solicitaba imágenes inexistentes a RainViewer que devolvían el gráfico de error impreso.
  - **Solución:** Fijado `maxNativeZoom: 7` en `radarTileLayer`. Leaflet descarga las teselas nativas hasta nivel 7 y las escala suavemente mediante GPU al ampliar hasta nivel 11 sobre el satélite Esri de alta definición.
- **Cache-bust:** `sw.js` → `meteoasturlode-v203-radarzoom`, query strings actualizadas a `v=1.1.03-radarzoom`.

---

## [1.1.02] - 2026-09-25

### 🔧 Fix Ergonómico: Ajuste visual de texto e iconos
- **Problema:** En la v1.1.01 los caracteres de los botones "Fenómenos" e "Iconos" se veían desproporcionadamente grandes en comparación con el resto de la interfaz.
- **Solución en `css/main.css`**: Se ha reducido la fuente del texto (`0.95rem` → `0.85rem`) y del icono (`1.3rem` → `1.15rem`) para lograr una estética elegante y proporcionada, manteniendo la altura táctil ergonómica de 52px.

---

## [1.1.01] - 2026-09-25

### 🔧 Fix Ergonómico: Desbordamiento Texto en Móvil Estrecho
- **Problema:** Tras el aumento de tamaño en v1.1.00, la palabra "Fenómenos" era muy larga y se desbordaba horizontalmente en móviles estrechos.
- **Solución en `css/main.css`**: 
  - Reducido el padding horizontal (`14px 12px` → `12px 4px`).
  - Reducido el gap (`8px` → `6px`).
  - Ajustada fuente texto (`1rem` → `0.95rem`) e icono (`1.5rem` → `1.3rem`).
- Mantenido el alto de `52px` por pura ergonomía táctil.
- **Cache-bust:** Implementado parámetro `?v=1.1.01` directo en las hojas de estilo CSS en `index.html` para romper cachés duras de PWA en iOS/Android de forma inmediata.

---

## [1.1.00] - 2026-09-25

### 🔧 Fix Estructural: Evitar aplastamiento Flexbox
- **Problema:** En móviles de poca altura, el contenedor de la lista inferior (`nav-modal-body`) intentaba ocupar todo el espacio, aplastando la tira de herramientas.
- **Solución en `css/main.css`**: Se añade regla inquebrantable `flex-shrink: 0` a `.nav-modal-tools-strip` para forzar a que respete sus 52px de altura.

---

## [1.0.99] - 2026-09-25

### 🔧 Fix Estructural: Botones "Guillotinados" (overflow)
- **Problema:** El contenedor de la tira tenía `overflow: hidden`, cortando los botones cuando se aumentaba su `min-height`.
- **Solución en `css/main.css`**: Eliminada la propiedad `overflow: hidden` de `.nav-modal-tools-strip`.

---

## [1.0.98] - 2026-09-25

### 🎮 Iteración 3 de Botones (Más Grandes)
- Aumento drástico de altura mínima a `min-height: 52px`.
- Área táctil masiva garantizada.

---

## [1.0.96-navbtnsize] - 2026-09-25
### 🎮 Botones Fenómenos e Iconos del Menú Más Grandes (Feedback Lendo)

- **Problema:** Los botones `🌊 Fenómenos` e `🌈 Iconos` de la mini-tira del menú de navegación resultaban demasiado pequeños y poco ergonómicos en móvil.
- **Cambios en `css/main.css`** (clase `.nav-tool-strip-btn` y auxiliares):
  - `padding`: `7px 8px` → `11px 10px` (mayor área táctil).
  - `.strip-btn-text` `font-size`: `0.8rem` → `0.875rem` (texto más legible).
  - `.strip-btn-icon` `font-size`: `1.05rem` → `1.2rem` (icono más visible).
  - `gap`: `6px` → `7px` (separación icon‑texto más natural).
- **Cache-bust:** `sw.js` → `meteoasturlode-v196-navbtnsize`.

---

## [1.0.95-fixaludes] - 2026-09-25

### 🔧 Corrección del Botón Explícame en Peligro de Aludes (Feedback Lendo)

- **Bug:** El botón `💡 Explícame` en la fila *Peligro Aludes (EAWS)* del módulo Cordillera & Nieve no abría el modal didáctico al pulsarlo en ninguna plataforma (móvil o escritorio).
- **Causa raiz:** El botón en `mountainCard.js` usa la clase CSS `btn-explain-sensor-compact` (variante compacta para fila de aludes), pero el listener global de delegación de clicks en `app.js` solo escuchaba la clase `btn-explain-sensor` mediante `e.target.closest('.btn-explain-sensor')`. El selector fallaba silenciosamente para el botón de aludes.
- **Solución:** Cambio mínimo de una sola línea en `js/app.js` (L806): selector ampliado a `'.btn-explain-sensor, .btn-explain-sensor-compact'` para capturar ambas variantes sin modificar el HTML ni los estilos.
- **Verificado:** Funcionamiento confirmado en local por Lendo antes de despliegue.
- **Archivos:** `js/app.js`, `sw.js`.

---

## [1.0.94-gliderfix] - 2026-09-25

### 🔧 Corrección del Glider del Interruptor Esquí / Puertos (Feedback Lendo)
- **Bug visual:** El glider (pastilla deslizante naranja) del selector segmentado del módulo *Cordillera & Nieve* no se desplazaba correctamente al pulsar "Puertos". Visualmente quedaba centrado bajo "Esquí" aunque la pestaña activa fuera "Puertos".
- **Causa raíz:** `translateX(100%)` desplaza el elemento su propio ancho (`calc(50% - 3px)`), quedando exactamente **3 px corto** respecto al botón "Puertos" (el padding interior del contenedor no estaba incluido).
- **Solución:** Cambiado a `translateX(calc(100% + 3px))` en `[data-active="passes"] .mountain-switch-glider`, que suma el `padding: 3px` del contenedor y hace que el glider caiga con precisión milimétrica bajo el segundo botón.
- **Archivo:** `css/components.css` (línea 2519).
- **Anti-Caché & Service Worker `v194-gliderfix`**: sincronización en `sw.js` e `index.html`.

---

## [1.0.92-mountainorder] - 2026-09-25 (Fase de Pruebas Activa)


### 🏔️ Reorganización Geográfica por Sectores y Cabecera Operacional en Cordillera (Feedback Lendo)
- **Cabecera Operacional Diferenciada (`🎿🚗 Servicios en Ruta`)**:
  - Incorporación del bloque `.mountain-operational-section` con cabecera dedicada y badge de alta legibilidad encima del selector táctil, separando de manera inequívoca los sensores de cumbre (Cota de Nieve 0°C, Nieve 3 Días y Peligro de Aludes EAWS) de las operaciones de transporte, esquí y vialidad.
- **Estructuración Geográfica Natural de la Red de Puertos (16 Pasos)**:
  - Clasificación en 4 sectores asturianos con títulos de sección, conteo de pasos y fichas ordenadas:
    - **🛣️ Arterias Principales hacia la Meseta (Asturias - León)**: Autopista del Huerna (AP-66) y Puerto de Pajares (N-630) con tarjetas destacadas de vía rápida.
    - **📍 Sector Centro y Valles Mineros (Caudal, Aller, Quirós, Riosa)**: San Isidro, Cobertoria, Angliru, Ventana.
    - **🏔️ Sector Oriente y Picos de Europa (Caso, Ponga, Cangas de Onís)**: Tarna, Pontón / Desfiladero, Lagos de Covadonga.
    - **🌲 Sector Occidente (Somiedo, Narcea, Allande, Ibias)**: Somiedo, San Lorenzo, Leitariegos, Connio, El Palo, La Marta, Pozo de las Mujeres Muertas.
- **Corrección de Redundancia en Badge de Aludes**:
  - Corrección de la escala textual EAWS para evitar duplicidades tipográficas (`Nivel 1 (Débil)`).
- **Anti-Caché & Service Worker `v192-mountainorder`**:
  - Actualización atómica en `sw.js`, `index.html` y hojas CSS.

---

## [1.0.91-navclean] - 2026-09-25 (Fase de Pruebas Activa)

### 🎨 Síntesis de Etiqueta y Acolchado Anti-Desborde en Menú (Feedback Lendo)
- **Compactación a 1 Sola Palabra (`[ 🎨 Iconos ]`)**:
  - Sustitución de *"Estilos Iconos"* por la palabra única y rotunda *"Iconos"*, garantizando simetría perfecta con *"Fenómenos"*.
  - Ajuste ergonómico de acolchado a `padding: 7px 8px` con `overflow: hidden; max-width: 100%;` en la mini-tira `.nav-modal-tools-strip`, blindando una holgura visual superior a 50px libres por celda en cualquier resolución móvil.
- **Anti-Caché & Service Worker `v191-navclean`**:
  - Sincronización en `sw.js`, `index.html` y módulos ES.

---

## [1.0.90-navstrip] - 2026-09-25 (Fase de Pruebas Activa)

### 🏛️ Blindaje Anti-Desborde y Mini-Tira Simétrica en Menú (Doctrina Constitucional Ley 11)
- **Despeje de Cabecera y Protección de Botón Cerrar (`[ ✕ ]`)**:
  - Restitución de la cabecera modal para albergar exclusivamente el título `📑 Módulos Meteorológicos` y el botón de cierre `[ ✕ ]` en el extremo derecho, eliminando la sobrecarga horizontal que expulsaba el botón fuera del marco de la tarjeta en móviles estrechos.
  - Creación de la mini-tira horizontal `.nav-modal-tools-strip` de 32px de alto con dos pastillas al 50%:
    - `[ 📖 Fenómenos ]` y `[ 🎨 Estilos Iconos ]` con holgura garantizada y margen de seguridad superior a 40px por celda.
- **Consagración de la Ley 11 en la Constitución Suprema (Parte I)**:
  - Autorización mediante PIN maestro 2796 de la *Doctrina de Blindaje Anti-Desborde y Ergonomía Móvil Estricta*, prohibiendo sobrecargar cabeceras con múltiples acciones en todos los proyectos zeustata.
- **Anti-Caché & Service Worker `v190-navstrip`**:
  - Sincronización en `sw.js`, `index.html` y módulos ES.

---

## [1.0.89-menuicons] - 2026-09-25 (Fase de Pruebas Activa)

### 📑 Rediseño Minimalista de Herramientas en Menú (Feedback Lendo)
- **Integración de Fenómenos y Estilos de Iconos en Cabecera (`modal-header-actions`)**:
  - Supresión de los dos bloques gigantes apilados verticalmente que ocupaban más de 120px de altura y desplazaban los módulos climáticos.
  - Creación de dos botones de icono de cristal discretos y táctiles (`[ 📖 ]` y `[ 🎨 ]`) situados en la cabecera superior del menú junto a la `[ ✕ ]` de cerrar.
  - Ahorro de espacio del 100%: los 8 módulos meteorológicos quedan accesibles en la parte superior sin necesidad de scroll forzado.
  - Adaptabilidad táctil garantizada con escala responsiva para teléfonos de pantalla estrecha (`<= 400px`).
- **Anti-Caché & Service Worker `v189-menuicons`**:
  - Sincronización en `sw.js`, `index.html` y módulos ES.

---

## [1.0.88-sunhours] - 2026-09-25 (Fase de Pruebas Activa)

### 🌅 Igualación y Cromatismo Solar en Salida y Puesta de Sol (Feedback Tester / Lendo)
- **Simetría Tipográfica y Cromatismo Atmosférico en Tarjeta de Pronóstico Extendido**:
  - Corrección de la disparidad visual donde el ocaso aparecía relegado a subtítulo diminuto y gris apagado frente a la salida del sol en blanco brillante.
  - Implementación de contenedor vertical simétrico (`.u-sun-times-column`):
    - **Salida del Sol (Orto)**: Icono `🌅` con hora destacada en **Dorado Solar / Ámbar Amanecer** (`#fbbf24`).
    - **Puesta del Sol (Ocaso)**: Icono `🌇` con hora destacada en **Naranja Crepuscular / Atardecer Cálido** (`#f97316`).
    - Ambas cifras al **mismo tamaño exacto (`0.78rem`)**, peso negrita `800` y tipografía monoespaciada JetBrains Mono, garantizando legibilidad perfecta e idéntica jerarquía visual.
- **Anti-Caché & Service Worker `v188-sunhours`**:
  - Sincronización en `sw.js`, `index.html` y módulos ES.

---

## [1.0.87-snowvert] - 2026-09-25 (Fase de Pruebas Activa)

### ❄️ Disposición Vertical Anti-Desborde en Nieve Prevista (Feedback Lendo)
- **Apilado Vertical de Etiquetas y Espesores (Hoy, Mañana, Pasado y Total 3 Días)**:
  - Transformación del diseño interno de cada pastilla de la cuadrícula 2x2 a disposición vertical (`flex-direction: column; align-items: center; justify-content: center; gap: 4px;`):
    - Etiqueta centrada en la parte superior (`📅 Hoy`, `📅 Mañana`, `📅 Pasado`, `❄️ Total 3 Días`).
    - Espesor destacado en tipografía monoespaciada en la parte inferior (`0.0 cm`).
  - Reducción del ancho mínimo necesario a menos de la mitad (~75px frente a los ~140px requeridos en línea horizontal), proporcionando un margen de seguridad de más de 50px libres por columna en cualquier teléfono móvil.
  - Blindaje con `box-sizing: border-box`, `max-width: 100%` y `overflow: hidden` en `.resort-forecast-card` y `.ski-resort-snowfall-row` para imposibilitar físicamente cualquier salida del marco.
- **Anti-Caché & Service Worker `v187-snowvert`**:
  - Sincronización en `sw.js`, `index.html` y módulos ES.

---

## [1.0.86-snowgrid] - 2026-09-25 (Fase de Pruebas Activa)

### ❄️ Corrección de Desborde en Nieve Prevista a 3 Días (Feedback Visual Lendo)
- **Cuadrícula 2x2 Simétrica y Amplia para Nieve en Pistas**:
  - Reestructuración de la fila de 4 pastillas comprimidas en una cuadrícula simétrica de 2 filas por 2 columnas (Fila 1: `📅 Hoy` y `📅 Mañana` • Fila 2: `📅 Pasado` y `❄️ Total 3 Días`), otorgando un 50% de ancho a cada celda y erradicando el desborde por la derecha fuera del marco de la tarjeta.
  - Formato en una sola línea por celda (etiqueta a la izquierda y `0.0 cm` a la derecha sin saltos de línea verticales).
- **Anti-Caché & Service Worker `v186-snowgrid`**:
  - Sincronización en `sw.js`, `index.html` y módulos ES.

---

## [1.0.85-snowclean] - 2026-09-25 (Fase de Pruebas Activa)

### 📱 Erradicación de Cortes y Superposiciones en Cordillera (Feedback Visual Lendo)
- **Barra de Sensores en 2 Pisos Anti-Colisión**:
  - *Piso 1 (50% / 50%)*: Cota de Nieve (0°C) y Nieve Prevista (3 Días) con divisor vertical propio, eliminando cualquier roce o solapamiento numérico.
  - *Piso 2 (Ancho completo)*: Peligro de Aludes EAWS desplegado a todo lo ancho con nivel legible sin cortes y botón `💡 Explícame`.
- **Interruptor de 1 Palabra Limpia**:
  - Conmutador directo: **`[ ⛷️ Esquí ]`** y **`[ 🚗 Puertos ]`**, erradicando puntos suspensivos (`...`) en pantallas estrechas.
- **Selector de Estaciones en Cuadrícula 2x2 Táctil**:
  - Distribución ergonómica con pastillas amplias para el dedo: `[ ⛷️ Pajares ]`, `[ ⛷️ Fuentes ]`, `[ ⛷️ San Isidro ]` y `[ ⛷️ Leitariegos ]`, suprimiendo paréntesis largos desbordados.
- **Cotas Altitudinales en Tiras de 2 Líneas 100% Legibles**:
  - Cada nivel (Cumbre, Media Estación y Base) se presenta en 2 líneas holgadas (Línea 1: Cota y nombre del pico; Línea 2: Temperatura, Sensación Wind Chill, Viento vectorial y Calidad de nieve) con capacidad de ajuste flexible, erradicando los cortes de texto (`Cu...`, `Me...`, `Niev...`).
- **Anti-Caché & Service Worker `v185-snowclean`**:
  - Sincronización en `sw.js`, `index.html` y módulos ES.

---

## [1.0.84-snowmobile] - 2026-09-25 (Fase de Pruebas Activa)

### 📱 Optimización Móvil Ergonómica en Cordillera (Feedback Visual Lendo)
- **Barra Unificada de Sensores de Alta Montaña**:
  - Fusión de las 3 tarjetas apiladas en una sola barra de cristal horizontal con 3 columnas simétricas: **Cota de Nieve (0°C)**, **Nieve Acumulada (3 Días)** y **Peligro de Aludes EAWS** con botón didáctico compacto `💡`, erradicando el salto de línea y ahorrando un 65% de altura en pantallas móviles.
- **Interruptor Deslizante Segmentado Anti-Corte**:
  - Etiquetas compactadas a **`[ ⛷️ Esquí y Pistas ]`** y **`[ 🚗 Puertos y Huerna ]`** con `min-width: 0` y ajuste elástico para impedir cualquier desborde o recorte de texto en dispositivos móviles.
- **Matriz Comparativa de 3 Cotas estilo Snow-Forecast**:
  - Sustitución de los 3 cajones verticales por una tabla comparativa de 3 filas compactas (**Cumbre**, **Media Estación** y **Base**) mostrando en una sola línea altitud, temperatura, sensación térmica con viento, racha/rumbo y calidad de nieve (*Polvo*, *Primavera*, *Dura*).
  - Supresión de la parrafada descriptiva del dominio para centrar la experiencia 100% en las condiciones de nieve y pistas.
- **Selector de Estaciones Compacto**:
  - Pastillas directas: `[ Pajares ]`, `[ Fuentes ]`, `[ San Isidro ]` y `[ Leitariegos ]` distribuidas uniformemente.
- **Cuadrícula de Nieve Fresca a 4 Columnas**:
  - Distribución horizontal completa de los espesores para Hoy, Mañana, Pasado y Total 3 Días.
- **Anti-Caché & Service Worker `v184-snowmobile`**:
  - Sincronización en `sw.js`, `index.html` y módulos ES.

---

## [1.0.83-snowforecast] - 2026-09-25 (Fase de Pruebas Activa)

### ⛷️ Rediseño de Cordillera & Nieve: Visor Dual Estilo Snow-Forecast (Feedback Cefe) & Red Integral de Puertos
- **Arquitectura de Doble Visor con Switch Segmentado Liquid Glass**:
  - Incorporación del interruptor deslizante `.mountain-sliding-segmented-switch` para alternar fluidamente entre:
    - **[ ⛷️ Estaciones & Esquí ]**: Visor de estaciones invernales con desglose altitudinal idéntico al estándar de *Snow-Forecast*.
    - **[ 🚗 Puertos & Carreteras ]**: Monitorización de arterias críticas de conexión con la Meseta y red de 16 puertos de montaña asturianos.
- **Módulo de Esquí & Estaciones de Montaña (Estándar Snow-Forecast)**:
  - **Selector de Estaciones**: Pastillas interactivas para *Valgrande-Pajares*, *Fuentes de Invierno*, *San Isidro* y *Leitariegos*.
  - **Semáforo de Operatividad de Remontes por Viento en Cumbre**:
    - 🟢 *Remontes Operativos* (< 35 km/h): Telesillas y remontes en servicio normal.
    - 🟡 *Precaución / Posibles Cierres Parciales* (35-50 km/h): Viento fuerte en cotas altas que puede afectar a remontes desenganchables.
    - 🔴 *Riesgo Alto de Cierre de Remontes* (≥ 50 km/h): Viento muy fuerte/rachas severas con alta probabilidad de paro por seguridad.
  - **Desglose en 3 Niveles Altitudinales (Cumbre / Media Estación / Base)**:
    - Estimación de temperatura en cada cota mediante gradiente vertical real (`0.0065 °C/m`).
    - Sensación térmica por viento en cumbres (**Wind Chill** según fórmula oficial JAG/NOAA).
    - Estado de precipitación por cota (Nieve continua, Aguanieve, Lluvia fría, Despejado).
    - Velocidad y vector dinámico de viento con flecha aerodinámica SVG (`(windDeg + 180) % 360`) y aceleración orográfica en cumbres (factor 1.55x).
    - Diagnóstico de calidad de nieve (*Polvo de Alta Cota*, *Pisada / Húmeda*, *Primavera*, *Dura / Hielo*, *Ventisca / Whiteout*).
  - **Previsión de Nieve Acumulada a 3 Días (Hoy, Mañana, Pasado Mañana y Total 3 Días)** en cm.
  - **Enlace Directo a Webcams Oficiales** en tiempo real de cada estación.
- **Módulo de Puertos & Carreteras de la Cordillera**:
  - **Arterias Principales de la Meseta**: Monitorización destacada de la **Autopista del Huerna (AP-66)** y el **Puerto de Pajares (N-630)**.
  - **Red Ampliada de 16 Puertos de Montaña**: *San Isidro*, *Tarna*, *Somiedo*, *Ventana*, *San Lorenzo*, *Leitariegos*, *El Palo*, *La Marta*, *El Connio*, *El Acebo*, *Alto del Angliru*, *La Colladona*, *La Cobertoria*, *El Cordal*, *El Fito* y *El Pontón*.
  - **Evaluación Dinámica de Viabilidad Invernal**: Detección de *🟢 Abierto / Limpio*, *🟡 Precaución Nieve / Hielo*, *🟠 Cadenas Obligatorias / Desaconsejado*, *🔴 Cerrado por Nieve* o *⚠️ Riesgo de Heladas Nocturnas*.
- **Sensores de Cabecera & Boletín de Aludes**:
  - Indicador de **Isoterma 0°C (Cota de Nieve)** en vivo con rango estimado.
  - **Acumulación de Nieve a 3 Días** en cumbres cantábricas.
  - **Riesgo de Aludes EAWS** (Escala Europea de 1 Débil a 5 Muy Fuerte) con recomendaciones de seguridad.
- **Módulo Didáctico "💡 Explícame" de Esquí y Cordillera (`ski_mountain`)**:
  - Nueva temática didáctica en `weatherExplanations.js` explicando la importancia del desglose en 3 cotas, la fórmula del Wind Chill, el semáforo de remontes, los tipos de nieve y la viabilidad de puertos.
- **Anti-Caché Obligatorio (Regla 4)**:
  - Cache-busting actualizado a `meteoasturlode-v183-snowforecast` en `sw.js`, `index.html` y módulos ES.

---

## [1.0.82-surfarrows] - 2026-09-25 (Fase de Pruebas Activa)

### 🏄‍♂️ Evolución de Surf: Estrellas (0 a 10★), Textura Marina, Flechas de Dirección y Guía Didáctica
- **Sistema de Calificación por Estrellas (Estándar Surf-Forecast)**:
  - Implementación del algoritmo oficial de 0 a 10 estrellas (`getSurfStarRating`):
    - ⭐ **Estrellas Doradas (1 a 10★)**: Viento terral puro (*offshore*) combinado con swell noble y energía armónica sin saturar la barra.
    - ⚪ **Estrellas Blancas (1 a 5★)**: Baño noble y divertido con olas más justas (< 0,9 m) o condiciones *glassy*.
    - 🚫 **Calificación Cero (0★)**: Viento de mar (*onshore / chop*), mar revuelto o barras cerronas por mar pasado en arenales abiertos.
  - Insignia destacada en el widget principal de *Calificación & Estrellas* y en cada celda del cronograma horario y diario.
- **Indicador de Textura de Superficie Marina (Wind State)**:
  - Clasificación oceanográfica dinámica de la lámina de agua: *Glassy (Espejo)*, *Limpio (Terral / Offshore)*, *Semi-Limpio (Cruzado Terral)*, *Picado (Cruzado Onshore)*, *Chop / Desordenado (Onshore)* y *Brisa Ligera*.
- **Flechas Vectoriales Dinámicas de Dirección (Viento y Swell)**:
  - **Flecha de Viento**: Rotación vectorial matemática continua en SVG (`(windDeg + 180) % 360`) siguiendo el estándar náutico/surf internacional (apunta hacia donde sopla el aire) con colores adaptativos según sea terral, glassy u onshore.
  - **Flecha de Swell**: Rotación continua en SVG (`(swellDeg + 180) % 360`) con tono azul turquesa indicando la trayectoria de entrada de las olas hacia la costa asturiana.
  - Integración en: sensor principal de *Período y Dirección del Swell*, **Cronograma de 3 Horas** (Hoy y Mañana) y previsión extendida a **7 Días** (Mañana y Tarde).
- **Fichas Oceanográficas y Secretos de Rompientes por Concejo**:
  - Incorporación en el catálogo costero (`marineCard.js`) de las condiciones ideales (`bestSwell`, `bestWind`) y advertencias de seguridad (`hazards`) para arenales y picos de Salinas, San Lorenzo, Peñarrubia, Rodiles, Xagó, Verdicio, Santa Marina, Vega, Tapia, San Antolín y Andrín.
- **Módulo Didáctico "💡 Explícame" de Surf & Estrellas (`surf_stars`)**:
  - Nueva temática didáctica en `weatherExplanations.js` explicando la escala de estrellas doradas y blancas, el efecto peinado del viento Sur asturiano, la escala de textura marina y consejos de esquinas al abrigo (El Espartal, Luanco, Candás).
- **Anti-Caché & Service Worker `v182-surfarrows`**:
  - Renovación de cadenas de versión en `sw.js`, `index.html` y módulos ES (`app.js`, `surfCard.js`, `marineCard.js`, `weatherExplanations.js`).

---

## [1.0.81] - 2026-09-17 (Fase de Pruebas Activa)

### 🏄‍♂️ Calibración de Oleaje & Detector de Mar Pasado en Arenales (Feedback Edu)
- **Reajuste de Escalones de Energía (kJ)**: Ampliación de la escala a 5 escalones precisos para evitar clasificar como "divertidas" olas de más de 2 metros:
  - *< 180 kJ*: 🟢 **Suave** (Iniciación / Longboard / Poca fuerza).
  - *180 a 349 kJ*: 🟡 **Divertida** (Shortboard & Evolutiva / Zona dulce de arenales nobles de 1,0 m a 1,5 m).
  - *350 a 649 kJ*: 🟠 **Sólida** (Exigente / Buen tamaño / 1,6 m a 2,2 m / Remada y experiencia).
  - *650 a 1.099 kJ*: 🟣 **Muy Potente** (Tubos / Nivel alto / Fondos huecos y velocidad).
  - *≥ 1.100 kJ*: 🔴 **Pesada** (Extrema / Solo expertos / Rompientes mayores y fuertes resacas).
- **Detector de Saturación en Arenales Abiertos (Beach Break Overload)**:
  - Detección en vivo cuando las olas superan los **1,9 metros** o la energía supera los **400 kJ** con alturas >= **1,8 metros** (ej. Salinas con 2,1 m y 486 kJ).
  - La condición de rompiente pasa automáticamente a `⚠️ Mar Pasado en Arenales / Barras Cerronas` (Badge: `Mar Pasado / Fuerte`), informando de barras cerronas continuas y fuertes corrientes de resaca, recomendando esquinas al abrigo (El Espartal, Luanco) o surfistas expertos.
  - Alerta contextual visible en la tarjeta principal de energía del oleaje.
- **Suite Didáctica Actualizada**: Sincronización en `weatherExplanations.js` de la escala de energía y notas de saturación para arenales asturianos en *Astucia en los Picos de Asturias*.
- **Anti-Caché Garantizado**: Cadena `meteoasturlode-v181-edusurf` en `sw.js`, `index.html` y módulos ES.

### 📖 Diccionario Didáctico de Fenómenos Meteorológicos (Vaguada, Borrasca, DANA, Galerna y más)
- **Nuevo Módulo Didáctico e Interactivo**: Creación de un diccionario especializado (`js/utils/weatherPhenomena.js`) con 10 grandes fenómenos atmosféricos explicados en lenguaje claro, riguroso y adaptado al clima asturiano:
  - *Vaguada*: Inestabilidad en altura y chimenea de tormentas.
  - *Borrasca*: Centro cerrado de bajas presiones en superficie y frentes.
  - *DANA (Gota Fría)*: Depresión aislada en niveles altos descolgada del chorro polar.
  - *Ciclogénesis Explosiva*: La "bomba" meteorológica con caída rápida de presión.
  - *Galerna Cantábrica*: El zarpazo súbito del Noroeste, desplome térmico y galernazo.
  - *Frentes Atmosféricos*: Líneas de choque frío, cálido y ocluido.
  - *Anticiclón y Dorsal*: Muro de estabilidad, subsidencia y sol.
  - *Viento Sur / Efecto Foehn*: El Ábrego seco y cálido que recalienta la vertiente norte asturiana.
  - *Niebla Marina ("Borrina")*: Advección costera veraniega en las playas.
  - *Inversión Térmica & Mar de Nubes*: El mundo al revés en los valles asturianos.
- **Ventana Modal Liquid Glass y Acordeón Limpio**:
  - Modal interactivo `#phenomena-modal` sin elementos de saturación visual (sin buscador ni pastillas de filtro), centrado directamente en las 10 tarjetas didácticas con diseño limpio y máxima visibilidad.
  - Tarjetas desplegables con estructura fija en 4 bloques didácticos: *¿Qué es exactamente?*, *¿Cómo se forma?*, *¿Qué tiempo deja en Asturias?* y *Astucia y Curiosidad*.
- **Puntos de Entrada Estratégicos**:
  - Acceso directo en el Menú principal de la app (`#nav-modal`) con botón de acceso destacado.
  - Botón directo `📖 Fenómenos` en la barra de herramientas del *Radar Cantábrico*.
  - Enlace contextual dentro de la explicación del barómetro (`weatherExplanations.js`) para resolver la duda común entre Borrasca, Vaguada y DANA.
- **Armonización Hidrometeorológica Coherente (QPF-PoP)**: Corrección del fallo clásico de modelos numéricos donde el ensamble probabilístico global arrojaba 0% de probabilidad con lluvia o llovizna apreciable prevista (ej. 0.7 mm en Castrillón). Implementación de filtro físico progresivo (suelo del 30% al 85% de probabilidad según volumen o código WMO de precipitación).
- **Anti-Caché & Service Worker `v181-clean`**: Sincronización de cadenas de versión en `sw.js`, `index.html` y módulos ES preservando la versión pública v1.0.81 bajo examen.
    - `>= 0.5 mm` (chubasco / orvayu denso): suelo mínimo del 65%.
    - `>= 0.2 mm` (llovizna constante): suelo mínimo del 45%.
    - `>= 0.1 mm` o código WMO de llovizna/lluvia/nieve (51-67, 71-77, 80-86, 95-99): suelo mínimo del 30%.
    - `0.0 mm`: preserva al 100% la probabilidad original devuelta por el ensamble.
- **Sincronización Transversal**: Procesamiento centralizado en `weatherApi.js` (`harmonizeWeatherPrecipitation`), propagando los valores armonizados al pronóstico horario de 72 horas, gráficos evolutivos de 48 horas, tarjeta en vivo (Nowcasting) y resúmenes diarios a 10 días.
- **Service Worker `v182-harmony` & Anti-Caché**: Actualización de cadenas en `sw.js` e `index.html`.

---

## [1.0.81] - 2026-09-02

### ☀️ Calibración Solar Inteligente de Nubosidad & Triple Sensor en Nowcasting
- **Triple Sensor Físico de Energía Lumínica**: Superación definitiva del punto ciego de modelos numéricos donde una nube teórica desploma la radiación directa a cero. Si el modelo devuelve WMO 3 (*Cubiertu*) de día sin lluvia, se rescata a **`⛅ Parcialmente nublado / Claros`** ante cualquiera de 3 evidencias físicas: radiación directa `>= 80 W/m²`, Índice UV `>= 2.5` o radiación global de onda corta `>= 120 W/m²`.
- **Nowcasting Estricto en Pronóstico a Corto Plazo**: La calibración se aplica al tiempo en vivo (Hero card y fondo interactivo) y exclusivamente a la hora en curso y siguiente hora inmediata en el pronóstico horario (72h) y gráfico (48h).
- **Previsión General y Sinóptica Intacta**: Preservación al 100% de los pronósticos del supercomputador para las horas posteriores (`+2h` en adelante) y el pronóstico extendido a 10 días, garantizando que frentes y precipitaciones nocturnas se visualicen sin enmascaramiento.
- **Service Worker `v181-triplesolar2` & Anti-Caché**: Actualización sincronizada de cadenas de caché en `sw.js`, `index.html`, `app.js`, `currentCard.js`, `forecastView.js` y `chartsView.js`.

### 🔭 Observatorio Astronómico Filtrado & Calendario Completo 2026-2027
- **Filtro Automático de Fenómenos Pasados**: Exclusión rigurosa en tiempo real de los acontecimientos astronómicos cuya fecha de finalización ya ha culminado respecto al momento actual (`endDate >= now`), eliminando el ruido visual de eventos obsoletos.
- **Ampliación Integral del Calendario Celeste (2026 - 2027)**: Registro exhaustivo de los mayores acontecimientos astronómicos visibles desde Asturias y España:
  - *Lluvias de meteoros*: Oriónidas 2026, Gemínidas 2026, Cuadrántidas 2027, Líridas 2027, Perseidas 2027 (con condiciones lunares óptimas) y Gemínidas 2027.
  - *Eclipses históricos*: El Gran Eclipse Solar del 2 de Agosto de 2027 (¡más del 84% de oscurecimiento en Asturias y totalidad en Andalucía!) y Eclipse Solar Anular de Febrero de 2027 (seguimiento web).
  - *Superlunas*: Superluna de la Cosecha (Septiembre 2026) y Superluna Llena de Otoño 2027 (máximo perigeo y mareonas vivas).
  - *Planetas y Auroras*: Acercamiento extremo Júpiter-Venus y seguimiento del pico del Ciclo Solar 25 en el Cantábrico.
- **Sincronización Dinámica de Contadores del Semáforo**: Actualización en vivo de los chips del semáforo de visibilidad (`🟢 Visible en Asturias`, `🟡 España`, `🔴 Global / Lejano`) computando exclusivamente los fenómenos que están por llegar.
- **Service Worker `v181-astroupdate` & Anti-Caché**: Actualización de cadenas de caché en `sw.js`, `index.html`, `app.js` y `astronomyCard.js`.

### 🛰️ Marcador Radar GPS Sutil & Despeje Total de Chubascos (Feedback Tester)
- **Despeje Visual del Radar de Lluvia**: Sustitución de la cápsula flotante opaca con texto central por un marcador circular sutil tipo GPS pulsante con halo translúcido (`.radar-gps-marker`). El centro de 12px y su halo expansivo permiten visualizar con nitidez milimétrica cualquier frente, borrasca o pequeño chubasco sobrevolando la localidad sin obstáculos ni puntos ciegos.
- **Identificación Ergonómica del Concejo**: El nombre del concejo seleccionado se muestra de forma fija y limpia en la barra de controles superior del radar (`#radar-active-location`) y en un *tooltip* táctil de Leaflet al posar o pulsar sobre el punto.
- **Sincronización Inicial de Coordenadas**: Invocación automática de `focusConcejoOnMap` tras la inicialización del lienzo para garantizar la posición inmediata del marcador sin esperas.



### 🧭 Clarificación Aerodinámica en Anemómetro (Racha Actual vs Máxima Prevista)
- **Desglose Riguroso de Rachas**: Corrección de la etiqueta ambigua *"Racha máx hoy"* en el sensor de viento de la Estación en Vivo. Ahora se muestra de forma transparente la **Racha actual** en tiempo real (`current.wind_gusts_10m`) y la **Racha máx. prevista** para la totalidad de la jornada (`daily.wind_gusts_10m_max[0]`), eliminando cualquier posible confusión para el usuario.
- **Service Worker `v181-windfix` & Anti-Caché**: Actualización sincronizada en `sw.js`, `index.html` y `app.js`.
- **Estado de Red Universal (Online / Offline)**: Modernización del indicador de cabecera a *🟢 Online* (más limpio y ergonómico) y *🔴 Offline*.
- **Reloj Congelado Inteligente en Modo Offline**: Al entrar en modo avión o perder cobertura en montaña o calas, el reloj principal cambia automáticamente a un tono gélido/escarchado indicando con precisión la hora exacta de la última previsión meteorológica recibida (*❄️ HH:MM*), deteniendo el segundero. Al recuperar señal, retorna al azul celeste vibrante en tiempo real y refresca los datos meteorológicos en segundo plano.
- **Mareas Autónomas sin Cobertura**: Garantía de cálculo continuo e ininterrumpido de las mareas astronómicas del Cantábrico sin conexión a internet.
- **Optimización de Batería en Partículas**: Reducción automática de la tasa de refresco del lienzo de cielo si el nivel de batería desciende del 20% en ruta o exteriores.
- **Service Worker `v181-offline` & Anti-Caché**: Sincronización de caché en `sw.js` e `index.html`.

### 🛰️ Guía Didáctica en el Selector de Modelos Meteorológicos ("Explícame")
- **Píldora Didáctica Interactiva**: Incorporación del botón *💡 Explícame: ¿Cómo elegir el mejor modelo?* en la cabecera del modal de selección de modelos numéricos.
- **Divulgación Meteorológica Calibrada para Asturias**: Guía didáctica detallada sobre qué es un modelo numérico, qué mide la resolución espacial (1.3 km frente a 13 km) y por qué el pronunciado relieve asturiano exige modelos hiperlocales como AROME (1.3 km) o el algoritmo Auto Multi-Modelo frente a modelos globales más abiertos.
- **Tarjetas de Modelos Mejoradas**: Clarificación pedagógica de nombres, países, agencias y recomendaciones de uso (ECMWF para tendencias a 3-7 días, AROME para valles y costa cantábrica, DWD ICON para viento repentino y NOAA GFS para contraste sinóptico).
- **Service Worker `v181-models` & Anti-Caché**: Actualización de cadenas de caché en `sw.js` e `index.html`.

### 📱 Navegación Táctil por Deslizamiento Lateral (Silk Slide & Candado Anti-Desplazamiento)
- **Deslizamiento Lateral Sedoso (*Silk Slide*)**: Evolución del fundido estático a un deslizamiento horizontal direccional cinemático y suave (`translateX`). Afinada la curva de aceleración física (`cubic-bezier(0.2, 0.9, 0.3, 1)` a 0.38s con desplazamiento amortiguado de 70px) para eliminar cualquier corte brusco y ofrecer una transición sedosa y natural idéntica a las aplicaciones nativas.
- **Candado Anti-Desplazamiento del Viewport (`touch-action: pan-y` & `overflow-x: clip`)**: Blindaje estricto en `html`, `body` y `.app-container` para impedir que el gesto táctil del dedo arrastre la cabecera completa hacia los lados o active el rebote elástico de 1 segundo en el navegador de Android.
- **Blindaje Total de Zonas con Scroll**: Se mantiene intacto el aislamiento y el `touch-action: pan-x pan-y` absoluto del carrusel de 72 horas hora por hora, el visor de gráficas, las mareas de 72h y el mapa del radar, permitiendo desplazarse horizontalmente dentro de ellos sin provocar saltos de pantalla.
- **Aceleración GPU por Hardware (`will-change: transform, opacity`)**: Renderizado ultra-fluido en 60/120 FPS sin consumo de CPU y auto-centrado de seguridad `window.scrollTo(0)` tras cada transición.
- **Micro-Vibración Háptica Nativa**: Retroalimentación táctil suave en el dispositivo al completar el cambio de sección.
- **Service Worker `v181-silklock` & Anti-Caché**: Actualización de cadenas de caché en `sw.js` e `index.html`.

### ⚡ Carga Instantánea en 0 ms (Stale-While-Revalidate) & Skeleton Loader
- **Renderizado Inmediato desde Memoria Local (0 ms)**: Guardado y lectura instantánea de la última previsión en `localStorage` (`getCachedWeather` / `saveCachedWeather`). Al abrir la aplicación o pulsar "Actualizar", todos los paneles, tarjetas, sensores y botones didácticos aparecen al instante en pantalla sin parpadeos, huecos en blanco ni tiempos de espera.
- **Actualización Silenciosa en Segundo Plano**: Tras pintar el estado en caché, la aplicación solicita la previsión meteorológica fresca a la API de Open-Meteo y actualiza los valores numéricos con una transición limpia y continua.
- **Esqueleto Visual de Carga (*Skeleton Loader*)**: Inclusión de un layout estructurado con efecto de brillo animado (*shimmer*) cuando se entra por primera vez o se cambia a un concejo sin caché previa, eliminando cualquier sensación de bloqueo.
- **Armonización de Condiciones de Rompiente con Energía (kJ)**: Corrección en `evaluateSurfQuality` para clasificar adecuadamente olas de período corto (< 9 segundos) y mar de viento como *"Suave / Poco empuje"* o *"Mar Revuelto"* en lugar de caer erróneamente en *"Mar Fuerte"*, alineando el estado al 100% con los kiloJulios reales calculados.
- **Optimización del Service Worker**: Desactivación del `controllerchange` invasivo para evitar recargas automáticas forzosas de página a mitad de sesión.
- **Cumplimiento Integral de la Política de Información Gubernamental de Google Play**: Incorporación de enlaces directos y funcionales a las fuentes oficiales de datos meteorológicos abiertos (`https://www.aemet.es`, `https://open-meteo.com`, `https://rainviewer.com`) y adición de la cláusula legal de exención de responsabilidad (*Aplicación de desarrollo independiente no gubernamental*) en `index.html`, `weatherAlerts.js` y `privacy.html`.
- **Pronóstico Horario 72h en "Estación en Vivo" (Feedback 17 Beta Testers)**: Reubicación del carrusel interactivo hora a hora (próximas 72 horas / 3 días con separadores diarios) en la pantalla principal entre la tarjeta Hero y los avisos de la AEMET con título compacto y jerarquía visual armonizada. La pestaña "Pronósticos" queda centrada exclusivamente en el pronóstico extendido a 10 días.
- **Armonización de Subtítulos en Menú Modular**: Actualización del subtítulo de 'Pronósticos' para reflejar 'Predicción extendida a 10 días con desglose mañana y tarde' y de 'Estación en Vivo' para incluir 'Sensores en tiempo real, pronóstico horario 72h y alertas', eliminando menciones desfasadas.
- **Purga Total de Fórmulas LaTeX en Suite Didáctica ("Explícame") & Historial**: Supresión definitiva de símbolos de dólar, barras invertidas y llaves (`$H_s$`, `$E_{\text{total}}$`, etc.) en [weatherExplanations.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/js/utils/weatherExplanations.js) e [index.html](file:///c:/Users/NUC/Downloads/IA/Tiempo/index.html), sustituyéndolos por lenguaje natural pulcro y legible según la Constitución del proyecto.
- **Reordenación Estética en Módulo de Surf & Rompientes**: Reubicación de la tarjeta *Temperatura del Agua & Neopreno* por encima de la tarjeta *Condición de Rompiente* para agrupar armónicamente los sensores numéricos (Altura, Período, Energía y Temperatura) y situar el banner visual de aptitud al final de la cuadrícula.
- **Service Worker `v181-surflayout` & Cache-Busting**: Actualización a `?v=1.0.81-surflayout` en `sw.js`, `index.html` e importaciones de `surfCard.js` en `app.js`.

---

## [1.0.80] - 2026-09-02

### 📱 Filas Horizontales Espaciosas y Switch Compacto Móvil para Previsión de Surf
- **Filas Horizontales Espaciosas para Mañana y Tarde (`.surf-dayparts-list`)**: Rediseño de las tarjetas diarias de 7 días reemplazando las 2 columnas estrechas por filas horizontales completas y legibles al 100%, mostrando claramente metros de ola, mar de fondo (Swell), período en segundos ($T$), energía combinada en kiloJulios (⚡ kJ) y viento en la rompiente (*Offshore / Onshore / Glassy*).
- **Ajuste Ergonómico del Switch (`🚨 3 Horas` / `📅 7 Días`)**: Reducción de textos en el interruptor deslizante segmentado y contención estricta de márgenes laterales en el widget para eliminar cualquier desborde en teléfonos móviles.
- **Service Worker `v180-official` & Cache-Busting Total**: Sincronización completa a `?v=1.0.80` en todos los archivos.

---

## [1.0.79] - 2026-09-02

### 📱 Interruptor Deslizante Segmentado 100% Móvil para Previsión de Surf
- **Interruptor Deslizante Segmentado de Ancho Completo (`.surf-sliding-segmented-switch`)**: Sustitución de los botones con textos largos por una cápsula deslizable tipo iOS / Liquid Glass con dos posiciones simétricas al 50% (`🚨 Horas 3h` / `📅 7 Días M/T`), eliminando por completo cualquier corte de texto o desbordamiento horizontal en pantallas móviles.
- **Glider Animado de Alta Fluidez**: Deslizamiento suave de la pastilla celeste brillante con aceleración cúbica (`cubic-bezier(0.4, 0, 0.2, 1)`) y retroalimentación háptica en dispositivos móviles.
- **Service Worker `v179-official` & Cache-Busting Total**: Sincronización completa a `?v=1.0.79` en todos los archivos.

---

## [1.0.78] - 2026-09-02

### 🏄‍♂️ Previsión Extendida de Surf a 7 Días (Mañana vs Tarde) con Selector Conmutable
- **Panel de Planificación Semanal de Rompientes (7 Días)**: Nueva función `getSurfDailyForecast` que calcula la evolución de oleaje, swell, período, energía combinada en kJ, velocidad y rumbo de viento y aptitud de rompiente para cada uno de los próximos 7 días completos.
- **Estructura Símétrica Mañana (08h-14h) vs Tarde (14h-20h)**: Cada día cuenta con dos cápsulas visuales claras que permiten comparar el amanecer y el atardecer, facilitando la elección del mejor baño del día.
- **Selector Conmutable de Previsión**: Pestañas interactivas `[ 🚨 Próximas Horas (3h) ]` y `[ 📅 Previsión 7 Días (Mañana / Tarde) ]` en la cabecera del visor de surf con transición suave e instantánea.
- **Service Worker `v178-official` & Cache-Busting Total**: Sincronización completa a `?v=1.0.78` en todos los componentes.

---

## [1.0.77] - 2026-09-02

### 🏄‍♂️ Inteligencia Multi-Swell & Energía Combinada Total (Estándar Surf-Forecast)
- **Soporte de Multi-Swell Satelital en Vivo**: Integración de las variables de mar de fondo secundario (`secondary_swell_wave_height`, `secondary_swell_wave_direction`, `secondary_swell_wave_period`) en las llamadas a Open-Meteo para todos los concejos asturianos y costas adyacentes.
- **Cálculo Físico de Energía Combinada Total ($E_{\text{total}} = E_1 + E_2$)**: Suma de la potencia del Swell 1 (Principal) y Swell 2 (Secundario) ($11 \cdot H_1^2 \cdot T_1 + 11 \cdot H_2^2 \cdot T_2$), alineando el resultado al 100% con la tabla desglosada oficial de *Surf-Forecast* y plataformas profesionales.
- **Desglose Visual de Swells en Tarjeta & Cronograma de 3 Horas**: Muestra la línea de *Swell 1 (Principal)* y *Swell 2 (Secundario)* con sus metros, segundos y rumbos independientes, desglosando la energía combinada en la tarjeta principal y en cada franja horaria.
- **Ampliación Didáctica**: Nueva sección sobre Multi-Swell y Energía Combinada en `WEATHER_EXPLANATIONS.surf_energy`.
- **Service Worker `v177-official` & Cache-Busting Total**: Sincronización completa a `?v=1.0.77` en scripts, estilos y manifest.

---

## [1.0.76] - 2026-09-02

### 💡 Suite Didáctica de Olas y Swell ("Explícame") en Playas y Surf
- **Módulo Didáctico `WEATHER_EXPLANATIONS.waves`**: Explicación completa e ilustrada sobre qué es la *Altura Significativa ($H_s$)* (promedio del tercio más alto y por qué 1 de cada 10 olas es un 30% mayor), diferenciación física entre *Mar de fondo (Swell)* y *Mar de viento (Chop)*, desglose de la *Escala Douglas* de 0 a 6+ y precauciones en pedreros/acantilados cantábricos.
- **Módulo Didáctico `WEATHER_EXPLANATIONS.swell`**: Guía técnica sobre el *Período en Segundos ($T$)* (período largo vs corto y volumen subacuático), cuadrantes de dirección de oleaje dominantes en Asturias (*Noroeste NW, Norte N, Poniente W*) y fenómeno de *Refracción marina* costera.
- **Botones Interactivos `[ 💡 Explícame ]`**: Desplegados en las tarjetas de *Altura del Oleaje (Significativa)* y *Período y Dirección del Swell* en **Surf & Rompientes**, y en la tarjeta de *Estado de la Mar (Escala Douglas)* en **Playas & Mareas**.
- **Service Worker `v176-official` & Cache-Busting Total**: Sincronización completa a `?v=1.0.76` en todos los archivos.

---

## [1.0.75] - 2026-09-02

### 🧭 Flecha Dinámica de Dirección & Rumbo Cardinal en Pronóstico Horario (72 Horas)
- **Vector Físico de Viento Dinámico en 360°**: Sustitución del icono genérico `💨` por una flecha aerodinámica SVG con rotación continua en tiempo real calculada según el rumbo físico de desplazamiento de la masa de aire (`(windDeg + 180)deg`), indicando hacia dónde sopla exactamente en cada una de las 72 horas.
- **Rumbo Cardinal en Español & Velocidad**: Despliegue de la abreviatura del rumbo cardinal en tono cyan brillante (`N`, `NE`, `E`, `SE`, `S`, `SO`, `O`, `NO`) junto a la velocidad en km/h (o nudos) y cuadro emergente explicativo al posar el cursor o pulsar.
- **Diseño Ergonómico Compacto**: Ajuste simétrico de anchos y alineación `inline-flex` en `.hourly-card`, manteniendo la holgura y diseño sin desbordes.
- **Service Worker `v175-official` & Cache-Busting Total**: Sincronización completa a `?v=1.0.75` en scripts, estilos y manifest.

---

## [1.0.74] - 2026-09-01

### 🏄‍♂️ Calibración de Energía de Oleaje (kJ) & Estándar Oceanográfico Cantábrico
- **Calibración Fiel del Factor de Energía ($E = 11 \cdot H_{\text{swell}}^2 \cdot T$)**: Ajuste del multiplicador y cálculo sobre la altura del mar de fondo (*Swell*), alineando los resultados al milímetro con los estándares oceanográficos y de plataformas como *Surf-Forecast*.
- **Corrección de Escala y Coherencia**: Olas de 1.3m con 8s se calculan ahora en ~148 kJ (categoría 🟢 *Suave / Poca Fuerza*), reservando los 400-600 kJ para olas con períodos consistentes de mar de fondo (>12-14s) u olas potentes.
- **Armonización de Umbrales**: Reestructuración de tramos (🟢 `< 200 kJ` Suave, 🟡 `200-500 kJ` Óptima, 🟠 `500-1200 kJ` Potente, 🔴 `> 1200 kJ` Pesada) sincronizada en tarjeta, cronograma de 3 horas y visor didáctico `WEATHER_EXPLANATIONS.surf_energy`.
- **Service Worker `v174-official` & Cache-Busting Total**: Sincronización completa a `?v=1.0.74` en scripts, estilos y manifest.

---

## [1.0.73] - 2026-09-01

### 🏄‍♂️ Inteligencia de Energía de la Ola (kJ) & Cronograma de Surf a 3 Horas
- **Cálculo de Energía de la Ola (kJ)**: Integración del cálculo físico de potencia de oleaje ($E \propto H_s^2 \cdot T$) con escala cromática (Suave 🟢, Óptima 🟡, Potente 🟠, Pesada 🔴) en la tarjeta de métricas marinas y el visor didáctico `WEATHER_EXPLANATIONS.surf_energy`.
- **Cronograma de Surf a 3 Horas (Hoy y Mañana)**: Despliegue de un visor interactivo horizontal con las franjas clave de surf (08h, 11h, 14h, 17h, 20h) combinando altura y swell (m), período (s), energía (kJ), viento local offshore/onshore y nivel/estado de la marea en tiempo real.
- **Service Worker `v173-official` & Cache-Busting Total**: Sincronización completa a `?v=1.0.73` en scripts, estilos y manifest.

---

## [1.0.72] - 2026-09-01

### 💡 Suite Didáctica de Coeficientes y Mareas ("Explícame")
- **Extensión Didáctica en Playas & Mareas**: Integración del motor educativo interactivo `WEATHER_EXPLANATIONS.tides` accesible mediante botones `💡 Explícame` en la píldora de *Coeficiente Hoy* y en la cabecera del *Cuadro Semanal de Mareas & Coeficientes*.
- **Contenido Técnico y Astuto de Mareas**: Explicación detallada de la amplitud de marea (escala 20 a 118 en el Cantábrico), contraste entre Mareas Vivas / Mareonas (85-118) de sicigia y Mareas Muertas (20-64) de cuadratura, junto con recomendaciones prácticas de seguridad para calas estrechas (Gulpiyuri, Poo, Peñarrubia), grandes arenales (Salinas, San Lorenzo, Rodiles) y corrientes de rías.
- **Service Worker `v172-official` & Cache-Busting Total**: Sincronización completa a `?v=1.0.72` en todos los archivos y caché PWA.

---

## [1.0.71] - 2026-08-31

### 🏖️ Restauración Estable: Mareas de Hoy por Ciclos Diarios
- **Restauración de 2 Tarjetas de Ciclo Diarias (`.tide-cycle-card`)**: Vuelta al diseño contrastado y validado en el historial con 2 bloques de ciclo (`🌅 1ª Marea del Día` y `🌙 2ª Marea del Día`), conteniendo las pleamares y bajamares una debajo de otra (`.tide-sub-item`) a 2 niveles (nombre arriba, hora y metros abajo).
- **Service Worker `v171-official` & Cache-Busting Total**: Sincronización completa a `?v=1.0.71` en scripts, estilos y manifest.

---

## [1.0.70] - 2026-08-31

### 🎯 Sincronización en Vivo con Auto-Centrado & Cuadrícula 2x2 Compacta
- **Auto-Centrado en Vivo en Mareógrafo (`scrollTideChartToNow`)**: Al cargar o acceder a *Playas & Mareas*, el visor horizontal se desplaza automáticamente para situar el punto en tiempo real ("AHORA") exactamente en el centro de la pantalla.
- **Armonización de Altura SVG**: Ajuste a 200px de altura para eliminar espacios vacíos y que la curva sinusoidal llene el marco con holgura y elegancia.
- **Cuadrícula Fija 2x2 en Mareas de Hoy**: Fijación de 2 columnas por 2 filas simétricas sin saltos a una sola columna en pantallas estrechas, reduciendo el espacio vertical al mínimo con lectura 100% clara.
- **Service Worker `v170-official` & Cache-Busting Total**: Sincronización a `?v=1.0.70` en toda la aplicación.

---

## [1.0.69] - 2026-08-31

### 💎 Mareas de Hoy en Tarjeta Única a 2 Niveles & Calibración de Gráfico 72h
- **Tarjeta Única Unificada**: Consolidación de todos los eventos diarios de mareas dentro de una única tarjeta con estructura a 2 niveles (arriba: icono, tipo y orden; abajo: hora y altura) con renderizado en rejilla armónica (`.daily-tides-grid` y `.tide-sub-item`), garantizando cero desbordes en dispositivos móviles.
- **Calibración SVG en Mareógrafo de 72h**: Ampliación de la altura a 270px, ajuste de márgenes verticales de seguridad y anclaje inteligente (`text-anchor`) en las etiquetas de los extremos para erradicar cualquier corte o truncamiento de texto.
- **Service Worker `v169-official`**: Purgado y actualización atómica en caché.

---

## [1.0.68] - 2026-08-31

### 💎 Mareas en 2 Bloques Extremos (Space-Between)
- **Estructura a Prueba de Colisiones**: Reorganización de las filas de marea en dos bloques independientes (Izquierda: Icono + Tipo + Orden • Derecha: Hora + Altura) utilizando `justify-content: space-between`, imposibilitando cualquier solapamiento de textos en pantallas móviles.
- **Service Worker `v168-official`**: Actualización atómica en caché.

---

## [1.0.67] - 2026-08-31

### 💎 Perfección Visual: Filas Horizontales 100% de Ancho en Mareas
- **Filas Horizontales de Cristal (`.tide-row-item`)**: Sustitución de la rejilla de 2 columnas por filas completas al 100% de ancho (Izquierda: Icono + Tipo • Centro: Hora • Derecha: Altura en metros), eliminando cualquier corte o desborde en pantallas móviles estrechas.
- **Service Worker `v167-official`**: Actualización atómica en web y PWA.

---

## [1.0.66] - 2026-08-31

### 🏖️ Mareas del Día en Pastillas Compactas & Dinámicas (3 o 4 Mareas)
- **Rejilla Dinámica Adaptable**: Rediseño integral de las mareas diarias en `marineCard.js`, sustituyendo los dos contenedores sobredimensionados por pastillas horizontales de cristal (`.tide-compact-pill`) que ahorran un 65% de espacio vertical.
- **Soporte Astronómico Exacto**: Renderizado directo de los eventos reales del día (`events.map`), adaptándose de forma natural a días con 3 o 4 mareas sin inventar ciclos ficticios.
- **Service Worker `v166-official`**: Actualización inmediata en caché.

---

## [1.0.65] - 2026-08-31

### 🔧 Corrección Crítica de Exportación de Módulos (ES Modules)
- **Ámbito Superior en Funciones Exportadas**: Reubicación de `getSeaWaterTemperature` fuera de la función `renderMarineCard` para cumplir estrictamente la especificación ECMAScript de `export` a nivel superior.
- **Restablecimiento Total del Ciclo de Ejecución**: Eliminado el bloqueo de parsing que impedía la carga del menú y módulos en dispositivos.
- **Service Worker `v165-official`**: Actualización atómica de caché y recarga limpia.

---

## [1.0.64] - 2026-08-31

### 🌊 Temperatura Marina Unificada y Sensor en Vivo Satelital
- **Integración de `sea_surface_temperature` en la API Marina**: Activación del parámetro oficial de temperatura del agua superficial en la llamada a Open-Meteo (`marine-api.open-meteo.com`) para todos los concejos.
- **Cálculo Centralizado (`getSeaWaterTemperature`)**: Exportación y uso de la misma función compartida en `marineCard.js` y `surfCard.js`, resolviendo la discrepancia previa y garantizando sincronización 1:1 al milímetro en toda la app.
- **Service Worker `v164-official`**: Purgado y recarga automática en clientes web y móviles.

---

## [1.0.63] - 2026-08-31

### 🧭 Inteligencia Aerodinámica y Relieve Costero de Asturias (Surf Pro)
- **Orientación Real Playa a Playa (Azimut de Costa)**: Enriquecimiento de toda la base de datos `PLAYAS_POR_CONCEJO` con la orientación exacta de apertura al mar (`facing` y `facingDeg`) de todos los arenales y picos de Asturias (ej. *Salinas -> 350° Norte*, *Xagó -> 295° Oeste-Noroeste*, *Candás/Luanco -> 115° Este-Sureste*, *Rodiles -> 335° Noroeste*).
- **Motor de Viento Local en Vivo (`getBeachSpecificWindCondition`)**: Cálculo dinámico del ángulo de incidencia del viento en tiempo real para cada playa, determinando si es *🟢 Offshore (Terral)*, *🔴 Onshore (Mar Picado)*, *🟡 Cross-shore (Lateral)* o *✨ Glassy*, reflejando con exactitud la física real (el viento del Oeste entra Onshore en Xagó y Offshore en Candás).
- **Capítulo Geográfico en la Guía Didáctica de Surf**: Inclusión de la sección didáctica *"El Relieve de Asturias y la Orientación de Playas (El Efecto Cabo Peñas)"*.
- **Service Worker `v163-official`**: Actualización atómica en web y PWA.

---

## [1.0.62] - 2026-08-31

### 💎 Armonía Visual Plena: Unificación de Márgenes y Alineación Vertical en Playas y Surf
- **Unificación 1:1 de Ancho y Márgenes con Tarjetas Superiores**: Ajuste de las tarjetas de arenales (`.beach-card`) y cuadrícula (`.beaches-grid`) con ancho 100%, relleno uniforme (`16px 20px`) y bordes idénticos a los widgets de sensores superiores (`.marine-widget`).
- **Disposición Vertical Homogénea (Etiqueta Arriba / Valor Abajo)**: Transformación de todas las especificaciones (*Fondo Marino*, *Dirección de Ola*, *Marea Óptima*, *Nivel Técnico*, *Picos de Surf*) en bloques con etiqueta e icono en cabecera y valor debajo alineado con precisión estricta a la izquierda, eliminando cualquier desfase horizontal o efecto zigzag.
- **Service Worker `v162-official`**: Purgado forzado y sincronización de caché a `?v=1.0.62`.

---

## [1.0.61] - 2026-08-31

### 🏄‍♂️📐 Despliegue de Ficha Técnica Horizontal Incondicional (Blindaje de Caché)
- **Nuevas Clases Semánticas e Independientes**: Implementación de `.beach-specs-table`, `.beach-picos-box` y `.beach-spec-row` con estilos `!important` y renderizado HTML en `surfCard.js` y `marineCard.js`, garantizando la presentación en filas técnicas horizontales simétricas de extremo a extremo sin dependencia de selectores heredados.
- **Service Worker `v161-official`**: Purgado total de caché y actualización atómica en clientes web y móviles.

---

## [1.0.60] - 2026-08-31

### 📐 Diseño & Armonía Visual: Filas Técnicas Horizontales en Playas y Surf
- **Transformación a Ficha Técnica de Extremo a Extremo**: Rediseño visual de las especificaciones de playas y picos (Fondo Marino, Dirección de Ola, Marea Óptima, Nivel) pasando de cuadrícula estrecha 2x2 a filas técnicas horizontales (`.beach-details-grid` y `.beach-detail-item` con ancho 100%).
- **Alineación Simétrica y Lectura Fluida en Móviles**: Cada característica se presenta con su etiqueta e icono a la izquierda (`#94a3b8`) y su valor en texto claro/badge a la derecha (`#f1f5f9` / `#34d399`), eliminando por completo desbordes, cortes y desajustes de altura entre columnas.
- **Service Worker `v160-official`**: Purgado y renovación instantánea de caché con sincronización a `?v=1.0.60` en CSS y JS.

---

## [1.0.59] - 2026-08-31

### 🛠️ Corrección Crítica de Exportación de Módulos
- **Exportación en `marineCard.js`**: Incorporación explícita de `export function getNearestCoastalReference` requerida por el nuevo módulo `surfCard.js`, resolviendo la excepción de importación que detenía el árbol de dependencias ES Module al inicio.
- **Service Worker `v159-official`**: Purgado forzado de caché para actualización instantánea en todos los navegadores y dispositivos móviles.

---

## [1.0.58] - 2026-08-31

### 🏖️🏄‍♂️ División Especializada de Costa en 2 Módulos: Playas & Mareas (Turismo) y Surf & Rompientes (Deportes)
- **Módulo 1: 🏖️ Playas & Mareas (`panel-marine` / Atajo `5`)**:
  - **Enfoque**: Bañistas, familias, turismo costero y paseos marítimos.
  - **Componentes integrados**:
    - Mareógrafo Dinámico en Vivo (72 Horas) con onda sinusoidal interactiva continua y cuenta atrás al próximo evento (Pleamar / Bajamar).
    - Cuadro Semanal de Mareas & Coeficientes (7 Días) con fases lunares y mareonas asturianas.
    - Grid de confort de playa: Temperatura del agua, visibilidad costera, estado Douglas y Bandera de Baño (Verde, Amarilla, Roja) con avisos de seguridad.
    - Catálogo turístico de playas y calas de cada concejo (entorno, tipo de arena, calas con encanto y marea idónea para disfrutar de la arena).
- **Módulo 2: 🏄‍♂️ Surf & Rompientes (`panel-surf` / Atajo `6`)**:
  - **Enfoque**: Surf, bodyboard, SUP y deportes náuticos.
  - **Componentes integrados**:
    - Sensores de Swell y Oleaje: Altura significativa de ola, desglose de mar de fondo y mar de viento, período en segundos, dirección del swell (NW, WNW...) y viento en costa.
    - Aptitud de rompiente y recomendación de traje de neopreno en función de la temperatura del agua marina.
    - Panel de Inteligencia de Viento Surf en tiempo real (Offshore 🟢, Onshore 🔴, Cross-shore 🟡, Glassy ✨) con su efecto directo en la ola.
    - Suite Didáctica Interactiva: Botón `[ 💡 Guía de Surf y Olas ]`.
    - Catálogo técnico de rompientes, picos bautizados, tipo de fondo (Beach break, Reef, Losa), dirección de la ola (izquierdas, derechas, A-Frames) y nivel técnico.
- **Navegación Ampliada a 8 Módulos**: Reorganización simétrica del menú modal y atajos numéricos del 1 al 8.
- **Service Worker `v158-official` & Cache-Busting Total**: Sincronización a `?v=1.0.58` en toda la aplicación.

---

## [1.0.57] - 2026-08-31

### 🏄‍♂️ Inteligencia de Surf: Detector Offshore / Onshore en Vivo & Catálogo de Picos de Asturias
- **Detector Aerodinámico en Vivo de Viento para Surf (`getSurfWindCondition`)**:
  - Cruce en tiempo real entre la dirección del viento y la orientación septentrional del litoral asturiano:
    - 🟢 **OFFSHORE (Viento Terral - Sur/SO/SE)**: Viento favorable de tierra que frena la cresta, ahueca el tubo y alisa la superficie (*efecto glassy*).
    - 🔴 **ONSHORE (Viento de Mar - Norte/NO/NE)**: Choca de frente, aplasta la ola y genera *chop* (mar picado y desordenado).
    - 🟡 **CROSS-SHORE (Viento Lateral - Este/Oeste)**: Barre la orilla y genera corriente de deriva.
    - ✨ **GLASSY (< 8 km/h)**: Mar liso como un espejo con condiciones cristalinas.
- **Catálogo Exhaustivo de Playas, Rompientes y Fondos Marinos**:
  - Enriquecimiento de todas las playas asturianas con:
    - **Picos de Surf bautizados**: *La Barra de Rodiles* (Villaviciosa), *El Balneario y Las Dunas* (Salinas), *Escalera 4, 10 y El Mongol* (Gijón), *El Escamplero* (Xagó), *La Grande y La Muralla* (Tapia), *Pico del Río* (Vega / Ribadesella), etc.
    - **Fondo Marino**: 🏖️ Arena (*Beach Break*), 🪨 Roca / Losa (*Point & Reef Break*) o 🪨🏖️ Mixto.
    - **Dirección de Ola**: ⬅️ Izquierdas tubulares, ➡️ Derechas de punta, ↔️ Picos A-Frame.
    - **Marea Idónea y Nivel**: Bajamar, Media marea, Pleamar, Iniciación, Intermedio o Avanzado-Pro.
- **Suite Didáctica Interactiva `[ 💡 Guía de Surf y Olas ]`**:
  - Despliegue en modal con explicaciones ilustradas sobre Offshore vs Onshore, cómo se definen las olas de izquierdas/derechas (perspectiva del surfista mirando a la playa), tipos de fondo y el significado del período de oleaje (swell en segundos).
- **Service Worker `v157-official` & Cache-Busting Total**: Sincronización a `?v=1.0.57` en toda la aplicación.

---

## [1.0.56] - 2026-08-31

### 🧭 Anemómetro: Orientación Náutica Perímetro ➔ Centro
- **Geometría de Flujo Hacia el Observador**: Rediseño del vector de la flecha en la rosa de los vientos para que nazca en el cuadrante exterior de procedencia y desemboque exactamente sobre el punto de pivote central (donde se sitúa el usuario / estación meteorológica).
- **Intuición Cartográfica Plena**: Al originarse en el borde exterior y apuntar hacia el centro, el impacto visual del viento es inmediato e inequívoco en cualquier ángulo de giro (0° a 360°).
- **Service Worker `v156-official` & Cache-Busting Total**: Sincronización a `?v=1.0.56` en toda la app.

---

## [1.0.55] - 2026-08-31

### 🛠️ Corrección: Restauración de los 6 Sensores en Estación en Vivo
- **Resolución de Renderizado en `currentCard.js`**: Corrección de variable en plantilla HTML que impedía desplegar los bloques inferiores de sensores tras la tarjeta superior.
- **Visualización Completa y Fluida**:
  1. Anemómetro y Dirección con la nueva flecha aerodinámica SVG.
  2. Barómetro MSL con manómetro y tendencia.
  3. Higrómetro y Punto de Rocío.
  4. Pluviómetro Digital.
  5. Radiación Solar / Índice UV.
  6. Calidad del Aire (AQI).
- **Service Worker `v155-official` & Cache-Busting Total**: Sincronización a `?v=1.0.55` en toda la app.

---

## [1.0.54] - 2026-08-31

### 🧭 Anemómetro: Flecha Aerodinámica de Dirección & Sentido de Viento
- **Sustitución de Línea Simple por Veleta Aerodinámica (SVG)**: Rediseño completo de la rosa de los vientos en la *Estación en Vivo*:
  - **Origen / Cola (arriba)**: Estilizada con aletas estabilizadoras en ámbar/slate que marcan exactamente de qué punto cardinal procede el viento.
  - **Fuste & Punta Luminosa (abajo)**: Flecha azul cyan brillante (`#38bdf8`) que señala con total nitidez hacia dónde sopla el aire.
  - **Ejes Guía & Punto Pivotante**: Ejes cardinales sutiles con punto central y N en color principal.
- **Aclaración Textual de Flujo Meteorológico**: Indicación explícita bajo la velocidad (ej. `Viene del N ➔ sopla al S`) para evitar cualquier ambigüedad de lectura náutica/surf.
- **Service Worker `v154-official` & Cache-Busting Total**: Sincronización a `?v=1.0.54` en toda la app.

---

## [1.0.53] - 2026-08-31

### 📅 Pronósticos a 10 Días: Simetría Térmica Mínima / Máxima & Eliminación de Desbordes
- **Reordenación Simétrica de Temperaturas**:
  - 🔻 **Mínima a la izquierda** (`#60a5fa` en azul suave con icono hacia abajo).
  - 🔺 **Máxima a la derecha** (`#f87171` en rojo suave con icono hacia arriba).
- **Supresión de Oscilación (Δ OSC)**: Retirada de la etiqueta de oscilación para eliminar el desborde en móviles y dotar a ambas temperaturas de un espacio generoso, centrado y equilibrado.
- **Service Worker `v153-official` & Cache-Busting Total**: Sincronización a `?v=1.0.53` en toda la app.

---

## [1.0.52] - 2026-08-31

### 📅 Pronósticos a 10 Días: Panel Único Unificado de Métricas Diarias (Opción 1)
- **Fusión en 1 Solo Bloque Integrado (`.d-unified-panel`)**: Agrupación completa de todas las métricas térmicas y atmosféricas en un único contenedor de cristal con 2 filas armónicas:
  - **Fila 1 (Térmica en Línea)**: `🔺 Máx ${maxT}°` • `🔻 Mín ${minT}°` • `Δ Osc. ${maxT - minT}°`.
  - **Línea Divisoria Sutil**: Separación tenue de degradado.
  - **Fila 2 (Métricas Integradas)**: Cuadrícula con Lluvia (`% y mm`), Viento medio y rachas, Radiación UV y horarios de Sol/Ocaso.
- **Ahorro de Espacio Superior al 40%**: Eliminadas las 7 cajitas/pastillas sueltas anteriores, logrando tarjetas diarias ultra compactas y perfectamente legibles.
- **Service Worker `v152-official` & Cache-Busting Total**: Sincronización a `?v=1.0.52` en toda la aplicación.

---

## [1.0.51] - 2026-08-31

### 📅 Pronósticos a 10 Días: Supresión de Barra Redundante & Máxima Compactación
- **Eliminación de la Barra de Rango Térmico (`.d-temp-bar-wrap`)**: Retirada de la barra repetitiva de "Rango del día" y sus cálculos asociados (`globalMin`/`globalMax`), eliminando duplicidades y reduciendo sensiblemente la altura de las 10 tarjetas diarias.
- **Enfoque Térmico Nítido**: Información térmica centralizada en los 3 bloques principales (Máxima, Mínima y Oscilación Δ) con padding compacto (`10px 14px`).
- **Service Worker `v151-official` & Cache-Busting Total**: Sincronización a `?v=1.0.51` en todos los archivos del proyecto.

---

## [1.0.50] - 2026-08-31

### 📅 Pronósticos a 10 Días: Doble Previsión Mañana / Tarde (Opción A - Badge Unificado)
- **Elegante Badge Unificado Horizontal en Tarjetas Diarias**: Sustitución del diseño de cápsulas independientes por un bloque integrado y armónico con divisor tenue que muestra:
  - 🌅 **Mañana**: Etiqueta dorada (`#fbbf24`), icono del tiempo activo y descripción clara del cielo matutino.
  - 🌇 **Tarde**: Etiqueta azul cielo (`#38bdf8`), icono del tiempo activo y previsión vespertina.
- **Alineación Simétrica & Compacta**: Estilizado con cristal translúcido oscuro (`rgba(15, 23, 42, 0.68)`), elevación suave y adaptación táctil para teléfonos y ordenadores.
- **Service Worker `v150-official` & Cache-Busting Total**: Sincronización a `?v=1.0.50` en todos los scripts, estilos y manifest.

---

## [1.0.49] - 2026-08-31

### 📅 Pronósticos a 10 Días: Doble Previsión Mañana / Tarde (Opción B)
- **Doble Cápsula Visual por Día**: Desglose horario inteligente en cada una de las tarjetas diarias a 10 días, dividiendo la jornada en:
  - 🌅 **Mañana (08:00 – 14:00)**: Icono representativo del tiempo matutino con su etiqueta descriptiva y barra lateral ámbar/dorada (`#f59e0b`).
  - 🌇 **Tarde (14:00 – 21:00)**: Icono representativo del tiempo vespertino con su etiqueta descriptiva y barra lateral azul cielo (`#38bdf8`).
- **Algoritmo de Detección de Tramo Horario (`getDaypartWeather`)**: Computa el estado del cielo dominante, probabilidad de lluvia y precipitación acumulada en cada tramo específico a partir de las 240 horas descargadas de los modelos meteorológicos (ECMWF / ICON).
- **Diseño Adaptativo Móvil**: Cápsulas compactas y legibles con microinteracciones `hover`, sombra suave y tipografía nítida en pantallas pequeñas y de escritorio.
- **Service Worker `v149-official` & Cache-Busting**: Actualización a `?v=1.0.49` para asegurar refresco inmediato sin caché obsoleta.

---

## [1.0.48] - 2026-08-30

### 🏔️ Rediseño Glaciar Alpino: Montaña, Altitudes & Estaciones de Esquí
- **Armonización Visual Glaciar (`#38bdf8`)**: Sustitución del tono morado/ultravioleta por una refinada paleta de Azul Hielo / Glaciar de alto contraste en toda la sección de Montaña.
- **Pill de Altitud del Concejo (`.altitude-pill`)**: Estilizado con cristal escarchado translúcido, borde cyan luminoso y sombra suave para una legibilidad óptima.
- **Estaciones de Esquí (Valgrande-Pajares & Fuentes de Invierno)**: Tipografía y contenedores adaptados al esquema cromático alpino cantábrico.
- **Service Worker `v148-official` & Cache-Busting**: Actualización global de CSS (`main.css?v=1.0.48`, `components.css?v=1.0.48`) y módulos JS a `?v=1.0.48`.

---

## [1.0.47] - 2026-08-30

### 🌧️ Radar Cantábrico: Eliminación de Marcas de Agua & Capa Topográfica HD
- **Nueva Capa Base Esri World Topo Map**: Sustitución definitiva de CartoDB (que introdujo marca de agua de API Key) por Esri World Topo Map en alta definición, 100% libre, sin marcas de agua ni restricciones de acceso.
- **Relieve Fino de Asturias y Cantábrico**: Representación nítida de los Picos de Europa, cordales montañosos, ríos y litoral sobre la animación de radar de lluvia de RainViewer.
- **Selector de Capas Mejorado**: Mantiene acceso rápido a *Topográfico HD*, *Satélite Real HD* y *OpenStreetMap Oficial*.
- **Service Worker `v147-official` & Cache-Busting**: Actualización global de dependencias a `?v=1.0.47`.

---

## [1.0.46] - 2026-08-30

### 🌊 Geolocalización de Mareas por Concejo (Oriente vs Occidente de Asturias)
- **Ajuste Longitudinal Geodésico ($4\text{ min/grado}$)**: Integración de la coordenada de longitud de cada concejo en el cálculo armónico de mareas (`tides.js` y `marineCard.js`), adaptando las horas de pleamar y bajamar a la costa exacta donde se encuentre el usuario:
  - *Llanes / Ribadedeva / Oriente*: La marea se adelanta de 4 a 6 minutos respecto a Gijón.
  - *Gijón / Cabo Peñas / Centro*: Referencia base calibrada con AEMET / San Lorenzo.
  - *Luarca / Tapia de Casariego / Castropol*: La marea se retrasa de 5 a 8 minutos respecto a Gijón.
- **Mareógrafo Dinámico Georreferenciado**: El trazado armónico SVG de 72 horas y el cuadro semanal adaptan sus fases al concejo activo.
- **Service Worker `v146-official` & Cache-Busting**: Actualización global de dependencias internas a `?v=1.0.46`.

---

## [1.0.45] - 2026-08-30

### 🚀 Cache-Busting Integral en Cascada & Propagación Instantánea
- **Actualización Total de Imports Internos**: Sincronización en cascada de todas las referencias de `tides.js` y `weatherIcons.js` dentro de `marineCard.js`, `currentCard.js`, `forecastView.js`, `chartsView.js` y `app.js` a `?v=1.0.45`.
- **Eliminación Definitiva de Caché Residual**: Garantiza que ningún navegador o PWA mantenga archivos anteriores en memoria y descargue al 100% la calibración oficial de AEMET (Playa de San Lorenzo: Bajamar 00:20, Pleamar 06:28, Bajamar 12:36, Pleamar 18:44).
- **Service Worker `v145-official`**: Nuevo nombre de caché atómica para activación inmediata.

---

## [1.0.44] - 2026-08-30

### 🌊 Sincronización Total AEMET: Horario Local Oficial (CEST / UTC+2)
- **Calibración con la Predicción de AEMET / IHM (Playa de San Lorenzo - Gijón)**: Sincronización con el huso oficial español de verano (CEST / UTC+2), ajustando pleamares y bajamares a los horarios oficiales locales.
- **Concordancia Exacta**:
  - *Domingo 30*: Bajamar 00:20 (AEMET 00:19), Pleamar 06:28 (AEMET 06:28), Bajamar 12:36 (AEMET 12:30), Pleamar 18:44 (AEMET 18:43).
  - *Lunes 31*: Bajamar 00:54 (AEMET 00:51), Pleamar 07:01 (AEMET 07:00), Bajamar 13:09 (AEMET 13:04), Pleamar 19:17 (AEMET 19:18).
  - *Martes 01*: Bajamar 01:27 (AEMET 01:25), Pleamar 07:35 (AEMET 07:35), Bajamar 13:43 (AEMET 13:41), Pleamar 19:51 (AEMET 19:56).
- **Service Worker `v144-official` & Cache-Busting**: Actualización global de dependencias a `?v=1.0.44`.

---

## [1.0.43] - 2026-08-30

### 🌊 Calibración Oficial IHM: Mareas del Cantábrico & Concordancia Total
- **Calibración con el Instituto Hidrográfico de la Marina (IHM / El Musel)**: Ajuste milimétrico del desfase lunar solar local ($0.8344\text{ h/día}$) sobre la época base para Gijón y la costa asturiana, sincronizando las pleamares y bajamares con las tablas astronómicas oficiales.
- **Precisión Horaria**: Sincronización a $\pm 1\text{ min}$ respecto a los datos oficiales de Puertos del Estado.
- **Continuidad Total 72h & Días de 3 Mareas**: El mareógrafo interactivo y el cuadro semanal mantienen su trazado armónico sinusoidal continuo sin quiebros ni solapes.
- **Service Worker `v143-official` & Cache-Busting**: Actualización global de dependencias internas a `?v=1.0.43`.

---

## [1.0.42] - 2026-08-30

### 🌊 Corrección Astronómica: Mareógrafo Continuo, Días de 3 Mareas & Invalidation Total
- **Cálculo Continuo Armónico ($M_2 \approx 12.42\text{ h}$)**: Reestructuración del algoritmo de mareas en `js/utils/tides.js` para calcular la onda sobre el tiempo astronómico absoluto, eliminando las anomalías de solape por módulo `% 24`.
- **Soporte Astronómico de Días con 3 Mareas**: Reconocimiento natural de las jornadas en las que el ciclo cruza la medianoche (como el Sábado 5 de septiembre), sin forzar artificialmente 4 eventos ni generar solapes de doble bajamar.
- **Onda 72h 100% Suave y Continua**: El trazado gráfico SVG del Mareógrafo genera una curva armónica pura sin saltos de fase ni quiebros en los pasos de medianoche (00:00).
- **Adaptabilidad en Tarjetas de Marea**: `marineCard.js` gestiona con total fluidez tanto jornadas de 4 mareas como de 3 mareas.
- **Cache-Busting Total & Service Worker `v142-official`**: Actualización unificada de parámetros `?v=1.0.42` en todos los módulos de `app.js` y `index.html` para forzar la recarga instantánea en dispositivos y PWA.

---

## [1.0.40] - 2026-08-28

### 🎯 Minimalismo y Centrado: Retirada de Flechas en Modelo y Menú
- **Centrado Perfecto y Cero Ruido**: Eliminación de las flechitas decorativas `➔` en los selectores de *[🌟 Modelo]* y *[📊 Menú]*, centrando armónicamente el icono y el texto en cada botón.
- **Service Worker `v140-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.39] - 2026-08-28

### 📐 Simetría Visual Perfecta: Botones Dobles Gemelos
- **Homogeneidad de Tamaños**: Rediseño de la primera fila de acciones con estructura gemela: icono de ancho fijo a la izquierda (`🔍` y `⭐`) y botón de acción directa a la derecha (`📍 GPS` y `📑 Favs`), logrando un equilibrio visual total.
- **Service Worker `v139-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.38] - 2026-08-28

### ✨ Limpieza y Minimalismo: Botones Simétricos de Modelo y Menú
- **Eliminación de Textos Largos Superpuestos**: Rediseño limpio de la fila de navegación a dos botones simétricos al 50% con `[🌟 Modelo ➔]` y `[📊 Menú ➔]`, garantizando cero desbordamientos o textos montados en cualquier pantalla móvil.
- **Service Worker `v138-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.37] - 2026-08-28

### 🌟 Reducción del 50%: Botones Dobles Inteligentes & Tarjeta Ultra Compacta
- **Botones Divididos (`Split Buttons`)**: Fusión de *Buscar Concejo* con botón directo *📍 GPS* a la izquierda (50%), y *Guardar en Favoritos* con el acceso a la lista *⭐ Favs* a la derecha (50%) en una sola fila interactiva.
- **Distribución de Modelo y Menú**: Alineación horizontal de *🌟 Modelo* y *📊 Menú* en la segunda fila, reduciendo la altura vertical de la tarjeta principal a la mitad.
- **Service Worker `v137-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.36] - 2026-08-28

### 🚀 Reordenación Ergonómica: Buscar y Favoritos sobre Modelo
- **Acceso Inmediato a Concejos**: Se traslada la fila de búsqueda (`🔍 Buscar ➔`) y `⭐ Favoritos` a la posición inmediatamente superior al selector de Modelo meteorológico, permitiendo interactuar con los concejos de forma más rápida y natural.
- **Service Worker `v136-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.35] - 2026-08-28

### 📱 Optimización de Cabecera: Alineación de Reloj, Estado y Subtítulo
- **Alineación Horizontal de Badges**: Inclusión de `brand-badges-row` con `flex-wrap: nowrap` para que el reloj (`🕒`) y el estado (`🟢 En línea`) se muestren siempre en paralelo en una sola fila nítida debajo del título principal `MeteoAstur Lode`.
- **Subtítulo Compacto**: Simplificación del texto descriptivo a *Estación Meteorológica Asturias* para optimizar el espacio vertical.
- **Service Worker `v135-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.34] - 2026-08-28

### 🌟 Tarjeta Maestra: Unificación Visual del Bloque Superior
- **Unificación sin Alterar el Diseño**: Todo el bloque superior (cabecera con título, reloj y estado, botones de Guardar y Ubicación, selector de Modelo, selector de Menú, y fila de Búsqueda y Favoritos) se integra dentro de una única tarjeta contenedora, manteniendo exactamente la misma estética, orden y dimensiones individuales de cada elemento.
- **Service Worker `v134-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.33] - 2026-08-28

### 🛡️ Rollback: Restauración del Diseño Clásico de Cabecera y Navegación
- **Vuelta al Diseño Original**: Reversión limpia y segura del experimento de tarjeta universal a petición de Lendo. Se restaura la cabecera clásica con sus botones superiores y la barra separada de navegación (Modelo, Menú y Búsqueda).
- **Service Worker `v133-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.32] - 2026-08-28

### 📐 Cuadrícula Simétrica: Distribución de 2 Botones por Línea
- **Alineación Perfecta al 50%**: Configuración de `grid-template-columns: 1fr 1fr` tanto para la fila de navegación (Modelo y Menú) como para la fila de acciones (Guardar y Mi Ubicación), garantizando un diseño estructurado, equilibrado y de fácil pulsación con el pulgar.
- **Service Worker `v132-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.31] - 2026-08-28

### 🌟 Rediseño Maestro: Tarjeta Cabecera Maestra Universal (Centro de Control Unificado)
- **Unificación Total de la Cabecera**: Integración de los selectores de Modelo Meteorológico (`#btn-open-model-modal`) y Menú de Módulos (`#btn-open-nav-modal`) en una fila simétrica, y los botones de acción rápida (`⭐ Guardar`, `📍 Mi Ubicación`, `🖥️ Completa`, `📥 Instalar App`) en una segunda fila de acceso directo, todo dentro de una única tarjeta superior acristalada con `border-radius: var(--radius-lg)` y sombras suaves.
- **Eliminación de Fragmentación Visual**: Supresión de cajas flotantes intermedias redundantes para maximizar el espacio útil y elevar los datos en vivo en pantalla.
- **Service Worker `v131-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.30] - 2026-08-28

### ✏️ Nuevo Estilo Oficial: Dibujo a Mano (Hand-Drawn & Acuarela)
- **Relevo Artístico del Pack Cristal**: Sustitución del estilo glassmorphism por un nuevo pack `weatherSketchIcons.js` con trazos artísticos a mano alzada, textura de tinta/lápiz, sombreados orgánicos y toques cálidos de acuarela.
- **Galería Modal Actualizada**: Tarjeta interactiva `✏️ Dibujo a Mano` con vista previa en vivo y badge `✏️ Dibujo a Mano` en el menú principal.
- **Service Worker `v130-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.29] - 2026-08-28

### 📱 Desplazamiento Vertical Táctil en la Galería de Iconos
- **Scroll Táctil Suave & Fluido**: Configurado `overflow-y: auto`, `max-height: 72vh`, `overscroll-behavior: contain` y `-webkit-overflow-scrolling: touch` en `.icon-themes-modal-body` para permitir deslizar cómodamente por las 5 tarjetas de estilos sin cortes.
- **Barra de Scroll Estilizada**: Scrollbar translúcido personalizado con tonos azul cielo de MeteoAstur.
- **Service Worker `v129-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.28] - 2026-08-28

### 🌟 Gran Lanzamiento: Colección Completa con 5 Estilos de Iconos Meteorológicos
- **👾 Pixel Art Retro (8-Bits Arcade)**: Catálogo vectorial completo (`weatherPixelIcons.js`) con renderizado nítido `crispEdges`, sol dorado pixelado, rayos arcade y estética retro nostálgica.
- **✨ Minimalista Neón (Glow & Line Art)**: Catálogo vectorial luminoso (`weatherNeonIcons.js`) con filtros SVG gaussianos de resplandor neón, trazo fino en azul cantábrico, cian y oro eléctrico sobre fondo oscuro.
- **💎 Cristal 3D (Glassmorphism)**: Catálogo vectorial premium (`weatherGlassIcons.js`) con capas de vidrio translúcido esmerilado, degradados radiales, reflejos especulares de luz y relieve 3D.
- **Galería Modal con 5 Tarjetas Interactivas**: Tarjetas con miniaturas dinámicas en vivo para cada estilo, selector instantáneo y sincronización en tiempo real con el menú.
- **Service Worker `v128-official` & Cache-Busting**: Inclusión de los 3 nuevos módulos en caché estática y recarga atómica.

---

## [1.0.27] - 2026-08-28

### 📐 Botón de Acceso Compacto y Estilizado en el Menú
- **Diseño Estrecho y Limpio**: Eliminación del subtítulo descriptivo redundante y organización en dos líneas compactas (`🎨 Estilo de Iconos` superior y el pack activo en la línea inferior), reduciendo la altura del botón y mejorando el aprovechamiento del espacio en el menú.
- **Service Worker `v127-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.26] - 2026-08-28

### 🎨 Nueva Ventana Emergente de Estilos de Iconos & Emojis Clásicos por Defecto
- **Emojis Clásicos por Defecto**: Configurado `classic` como estilo inicial estándar y universal para cualquier usuario nuevo que entre a la aplicación.
- **Ventana Emergente de Colección de Iconos (`#icon-themes-modal`)**: Modal dedicado accesible mediante un único botón limpio en el menú de navegación (`🎨 Estilo de Iconos ➔`), con tarjetas interactivas, vista previa en vivo (emojis estándar vs personajes SVG de cómic) y estado activo en tiempo real.
- **Service Worker `v126-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.25] - 2026-08-28

### 🛡️ Blindaje Científico: Regla de Oro de Probabilidad de Lluvia (< 20% = Incondicionalmente Seco)
- **Eliminación Total de Falsos Avisos por Residuos Numéricos de Simulación**: Aislamiento estricto de todas las horas con probabilidad de precipitación inferior al 20% (3%, 5%, 10%), ignorando milímetros teóricos aislados de ensambles y garantizando que muestren siempre la nube seca sonriente `☁️` sin gotas de lluvia.
- **Service Worker `v125-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.24] - 2026-08-28

### 🧹 Diseño Minimalista en Selector de Emojis Emotivos
- **Eliminación de Texto Redundante**: Retirada del encabezado superior en el selector de iconos del menú, dejando directamente los dos botones conmutables (*🎭 Emojis Emotivos* y *📱 Emojis Clásicos*) con espaciado compacto y limpio.
- **Service Worker `v124-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente.

---

## [1.0.23] - 2026-08-28

### 🎭 Lanzamiento de "Emojis Emotivos" (Estilo Cómic / Cartoon)
- **Personajes Meteorológicos Expresivos con Ojos, Boca y Personalidad**:
  - *Sol Feliz*: Sol dorado radiante con grandes ojos de cómic brillantes, coloretes rosados y amplia sonrisa abierta.
  - *Luna Durmiente*: Luna azul cielo con gorro de noche a rayas y borla durmiendo plácidamente con "Zzz".
  - *Nube Esponjosa*: Nube blanca regordeta con mejillas rosadas y carita kawaii.
  - *Orbayu Travieso*: Nube tierna con gotitas bebé sonrientes con ojitos.
  - *Lluvia Content*: Nube celeste con gotas alegres cayendo.
  - *Tormenta Gruñona*: Nube oscura con cejas cómicas de enfado y gran rayo de oro brillante.
  - *Nieve con Gorrito*: Nube de invierno con gorro de lana azul, pompón rojo y copos sonrientes.
- **Selector Conmutable Oficial "🎭 Emojis Emotivos"**: Renombrado el botón del selector en el menú a *🎭 Emojis Emotivos* junto a *📱 Emojis Clásicos*.
- **Service Worker `v123-official` & Cache-Busting**: Actualización atómica de caché y forzado de recarga.

---

## [1.0.22] - 2026-08-28

### 🏔️ Iconografía "Estilu Asturianu" con Símbolos Culturales y Geográficos Reales
- **Rediseño Vectorial con Elementos Emblemáticos de Asturias**:
  - *Borrina*: Silueta de Hórreo asturiano tradicional con tejado a 4 aguas, pegollos y muelas entre niebla flotante.
  - *Orbayu*: Gotas finas diagonales sobre la clásica Manzana verde de sidra de la pumarada.
  - *Nevadona*: El majestuoso Picu Urriellu (Naranjo de Bulnes) cubierto de manto blanco de nieve con copos.
  - *Soleyeru*: Sol radiante grabado con el Trisquel solar celta asturiano en oro.
  - *Bastinazu / Tormenta*: Rayo de oro en zigzag descargando sobre el acantilado y el Faro del Cabo Peñas.
  - *Noche*: Luna creciente azul-plata con estrellas y la silueta de la Cruz de la Victoria.
- **Service Worker `v122-official` & Cache-Busting**: Actualización atómica de recursos estáticos.

---

## [1.0.21] - 2026-08-28

### 🍏 Nuevo Set de Iconos Vectoriales "Estilu Asturianu" & Selector Conmutable
- **Iconos Vectoriales SVG Propios con Identidad Asturiana**: Creación del módulo `weatherAsturIcons.js` con diseño vectorial exclusivo en alta resolución (Soleyeru, Intervalos, Orbayu, Lluvia continua, Bastinazu & Tormenta con Rayo Oro, Borrina asturiana, Nevadona en Picos y Noche Estrellada).
- **Selector Conmutable en el Menú de Navegación**: Integración en el modal de menú de un selector con dos estilos disponibles: `🍏 Estilu Asturianu` (por defecto) y `📱 Emojis Clásicos`, con memorización permanente en `localStorage` y cambio instantáneo en vivo sin recargar la página.
- **Service Worker `v121-official` & Cache-Busting**: Actualización atómica de caché y sincronización de recursos estáticos.

---

## [1.0.20] - 2026-08-28

### 🛡️ Blindaje Estricto de Umbral en Probabilidades Residuales de Precipitación
- **Eliminación Definitiva de Falsos Iconos de Lluvia por Ruido Numérico (< 0.3 mm / < 20% prob)**: Corrección del umbral de lluvia para que cualquier hora con probabilidad menor al 20% y menos de 0.3 mm de acumulación muestre exclusivamente la nube seca `☁️`, solventando la contradicción visual en las horas con 3% de probabilidad.
- **Service Worker `v120-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente en clientes.

---

## [1.0.19] - 2026-08-28

### 🎯 Prevalencia y Prioridad Absoluta del Filtro de Lluvia sobre Iconografía Nocturna
- **Reordenación del Flujo de Ejecución en `getWeatherInfo`**: Adaptación previa de la iluminación solar/nocturna y ejecución final con poder de decisión absoluto del filtro de intensidad de precipitación.
- **Resolución Definitiva de Nubes Secas**: Garantía incondicional de que horas con probabilidades residuales (<20% como 3%, 5%, 10%) o sin lluvia (<0.1 mm) muestren siempre la nube seca `☁️` (o `☁️🌙`), sin riesgo de sobreescritura accidental por códigos WMO teóricos de lluvia.
- **Service Worker `v119-official` & Cache-Busting**: Actualización atómica de caché en todos los clientes y plataformas.

---

## [1.0.18] - 2026-08-28

### 🛡️ Hotfix y Blindaje de Render en Módulo de Pronósticos (Forecast View Stability)
- **Corrección de Variables Térmicas en Tarjetas Diarias a 10 Días**: Restauración y blindaje del cálculo relativo de las barras térmicas y métricas de máximas/mínimas en `forecastView.js`.
- **Sincronización Total con Graduación de Lluvia**: Enlace perfecto entre el módulo de pronósticos (72h horarias y 10 días diarios) y el motor de graduación por intensidad de precipitación.
- **Service Worker `v118-official` & Cache-Busting**: Actualización atómica de caché y forzado de recarga en clientes.

---

## [1.0.17] - 2026-08-28

### 🌧️ Graduación Escalonada por Intensidad de Precipitación (Rain Intensity Tiers)
- **Iconografía Diferenciada por Volumen y Probabilidad**: Implementación de 4 tramos reales de lluvia en `getWeatherInfo`:
  1. *Seco / Trazas inapreciables* (`< 0.1 mm` y `< 20%`): Nube seca `☁️` (o `☁️🌙`), eliminando falsos avisos con probabilidades residuales (3%, 5%, 10%).
  2. *Orbayu / Llovizna suave* (`0.1 a 0.4 mm` o `20-44%`): Nube de llovizna suave `🌦️` de día / `🌧️` de noche.
  3. *Lluvia moderada continua* (`0.5 a 2.0 mm` o `45-74%`): Nube de lluvia estándar `🌧️`.
  4. *Lluvia fuerte / Bastinazu / Tormenta* (`> 2.0 mm` o `≥ 75%` o código de tormenta): Nube de lluvia intensa `⛈️`.
- **Integración Global**: Desplegado en vivo en el sensor principal, en las 72h del pronóstico horario y en el trazado de las gráficas interactivas de 48h.
- **Service Worker `v117-official` & Cache-Busting**: Actualización atómica de caché y sincronización en clientes.

---

## [1.0.16] - 2026-08-28

### 🎯 Coherencia Inteligente Lluvia/Nubes e Iconografía Nocturna (Hourly Rain Coherence & Night Icons)
- **Filtro de Coherencia en Pronóstico Horario y Gráficas**: Sincronización inteligente entre probabilidad de precipitación (%), litros acumulados (mm) y código de cielo WMO. Si para una hora concreta la probabilidad de lluvia es 0% y la precipitación prevista es 0.0 mm, el icono refleja el estado real de la nubosidad (☁️ cubierto / ⛅ intervalos) en lugar de una nube de lluvia, eliminando contradicciones visuales.
- **Iconografía Nocturna Dinámica en `getWeatherInfo`**: Integración del parámetro de luz solar (`is_day`) para que las horas nocturnas muestren cielos nocturnos y lunares (🌙 / ☁️🌙) evitando soles diurnos tras el anochecer (21h, 22h, etc.).
- **Service Worker `v116-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente instantánea en todos los clientes.

---

## [1.0.15] - 2026-08-28

### 📐 Alineación y Simetría en Observatorio Astronómico (Layout Polish & Grid Balance)
- **Cuadrícula 2x2 Simétrica para Filtros del Semáforo**: Organización de los botones de filtrado (*Todos*, *Asturias*, *España/Europa*, *Global*) en cuadrícula simétrica `2x2` al 50% de ancho en móviles, eliminando asimetrías y saltos de línea huérfanos.
- **Armonización de Métricas Lunares**: Estructuración de las 3 tarjetas superiores (*Edad Lunar*, *Próxima Luna Llena* y *Estado del Cielo*) en 3 columnas uniformes de una sola fila (`repeat(3, 1fr)`) con texto centrado e insignias compactas.
- **Encaje Limpio en Tarjetas de Eventos Celestes**: Separador sutil y alineación armónica de las etiquetas de tipo de evento, cuenta atrás y semáforo de visibilidad en Asturias.
- **Service Worker `v115-official` & Cache-Busting**: Actualización atómica de caché y versionado en caliente en todos los navegadores y clientes móviles.

---

## [1.0.14] - 2026-08-28

### 💡 Suite Didáctica Completa "Explícame" en Todos los Sensores (Full Interactive Education Suite)
- **Despliegue Global en los 6 Sensores de Estación en Vivo**: Integración de botones interactivos didácticos `[ 💡 Explícame ]` en la totalidad de las tarjetas meteorológicas principales:
  1. 🧭 **Anemómetro y Dirección**: Guía sobre la diferencia entre viento medio y rachas máximas instantáneas, escala de intensidad Beaufort (brisa, moderado, fuerte, temporal), la Rosa de los Vientos y la influencia de los vientos asturianos (el *Sur/Ábrego* cálido y seco por efecto Foehn frente al *Gallego/NO* frío y húmedo).
  2. 🌧️ **Pluviómetro Digital**: Explicación de la equivalencia 1 mm = 1 l/m², escala oficial de intensidad de lluvia AEMET (<2 débil, 2-15 moderada, 15-30 fuerte, >30 torrencial), probabilidad vs volumen y singularidades asturianas (*orbayu / calabobos* vs *bastinazu*).
  3. 🚨 **Barómetro y Presión**: Funcionamiento de altas/bajas presiones y tendencia.
  4. 💧 **Higrómetro y Punto de Rocío**: Escala de bochorno y condensación.
  5. ☀️ **Radiación Solar e Índice UV**: Rangos de protección solar y aumento de UV por altitud en la Cordillera.
  6. 🍃 **Calidad del Aire (AQI)**: Monitoreo de partículas PM2.5 / PM10 y escala europea de salubridad.
- **Service Worker `v114-official` & Cache-Busting**: Actualización atómica de caché y recarga en caliente instantánea en todos los clientes.

---

## [1.0.13] - 2026-08-28

### 🎨 Alto Contraste y Accesibilidad Visual (High Contrast & Clear Readability)
- **Incremento de Contraste en Tokens Globales**: Elevación de las variables de color del sistema de diseño en `main.css` (`--text-muted` a `#cbd5e1` y `--text-dim` a `#94a3b8`), eliminando grises pizarra oscuros que dificultaban la lectura sobre fondos translúcidos *Liquid Glass*.
- **Claridad Nítida en Módulos y Sensores**: Refuerzo de etiquetas de métricas (`.widget-label`, `.m-label`, `.t-label`, `.cycle-badge`, `.tide-sub-name`, etc.) a tonos blanco hielo/plata luminosos (`#cbd5e1` / `#e2e8f0`) con tipografía nítida y contrastada.
- **Legibilidad Garantizada bajo cualquier Clima**: Visibilidad óptima comprobada para cualquier estado del fondo dinámico (días despejados con cielo azul, días cubiertos o de niebla con tonos grisáceos, noches estrelladas y tormentas).
- **Service Worker `v113-official` & Cache-Busting**: Actualización atómica de caché y versionado en caliente en todos los navegadores y clientes móviles.

---

## [1.0.12] - 2026-08-28

### 💧 Botón Didáctico "Explícame" en Humedad y Punto de Rocío (Learning & Dew Point)
- **Botón `[ 💡 Explícame ]` en Higrómetro & Rocío**: Integración del botón interactivo didáctico en la tarjeta del sensor de Humedad (*Estación en Vivo*).
- **Guía Didáctica del Punto de Rocío**: Despliegue interactivo con explicación clara de qué es la humedad relativa, el significado físico del Punto de Rocío (°C), la tabla de sensación de bochorno (<10°C seco, 10-16°C óptimo, >20°C sofocante) y por qué se producen las nieblas y el *orbayu* asturiano.
- **Service Worker `v112-official` & Cache-Busting**: Renovación de versión y activación instantánea.

---

## [1.0.11] - 2026-08-28

### 🚀 Sincronización Total de Caché & Despliegue del Botón "Explícame" (Release & Cache-Busting)
- **Sincronización Total de Submódulos**: Actualización de todos los query strings de importación a `?v=1.0.11` en `app.js` y `currentCard.js` para forzar la recarga en caliente de las tarjetas climáticas y el botón didáctico `[ 💡 Explícame ]` en todos los navegadores y dispositivos móviles.
- **Service Worker `v111-official`**: Purga de caché y activación inmediata.

---

## [1.0.10] - 2026-08-28

### 💡 Botón y Modal Didáctico "Explícame" (Meteorological Learning & UX)
- **Botón Interactivo `[ 💡 Explícame ]` en Barómetro**: Integración de un botón táctil ámbar en la cabecera del sensor del Barómetro (*Estación en Vivo*) para consultar al instante la explicación clara y accesible de la presión atmosférica.
- **Ventana Emergente Didáctica (*Modal "Explícame el Clima"*)**: Despliegue interactivo con cierre táctil `[ ✕ ]`, clic exterior o tecla Escape, explicando detalladamente: qué es la presión atmosférica (hPa), anticiclón (>1013 hPa) vs borrasca (<1013 hPa), cómo interpretar la tendencia de 3 horas y astucias climáticas específicas en Asturias.
- **Arquitectura Modular Extensible**: Creación del diccionario educativo modular ([`js/utils/weatherExplanations.js`](js/utils/weatherExplanations.js)) preparado para extender explicaciones a otros sensores (UV, AQI, Humedad, etc.) en futuras iteraciones.
- **Cache-Busting Total (`?v=1.0.10`) & SW `v110-official`**: Renovación de versión de recursos y caché del Service Worker para actualización inmediata.

---

## [1.0.9] - 2026-08-28

### 🛡️ Reversión de Seguridad y Restauración Integral de Sensores (Stability & Rollback)
- **Reversión a Estado Funcional Estable**: Aplicación de la Regla de Oro de Rollback para restaurar el estado funcional íntegro de la aplicación con sus 7 módulos oficiales (incluyendo el nuevo *Observatorio Astronómico & Cosmos*).
- **Purga y Renovación de Caché**: Salto directo a **`v1.0.9`** y Service Worker `v109-official` para asegurar que todos los dispositivos y navegadores carguen inmediatamente los scripts estables sin residuos de caché.

---

## [1.0.7] - 2026-08-28

### 🔭 Nuevo Módulo Astronómico & Semáforo de Visibilidad en Asturias (New Feature & Cosmos)
- **🔭 Observatorio Astronómico & Cosmos**: Creación del nuevo módulo astronómico especializado para el seguimiento de los grandes fenómenos celestes (eclipses solares y lunares, lluvias de meteoros Perseidas/Gemínidas/Oriónidas, superlunas, conjunciones de planetas y auroras boreales).
- **🚦 Semáforo de Visibilidad Geográfica**: Clasificación cromática en tiempo real para saber qué fenómenos son observables directamente desde Asturias (🟢 Visible en Asturias con consejos y mejores cumbres libres de niebla), cuáles en regiones limítrofes o España (🟡 España / Europa) y cuáles a escala mundial (🔴 Hemisferio Sur / Lejano).
- **🌓 Fases Lunares & Cuentas Atrás Dinámicas**: Indicador en vivo de fase lunar actual, porcentaje de iluminación del disco, edad lunar y tarjetas interactivas con cuenta atrás exacta por evento.
- **Filtros Táctiles Inmediatos**: Botonera con chips interactivos para filtrar en 1 toque por categoría de visibilidad (`🌟 Todos`, `🟢 Asturias`, `🟡 España`, `🔴 Global`).
- **Cache-Busting Total (`?v=1.0.7`) & SW `v107-official`**: Renovación de versión de recursos y caché del Service Worker para actualización inmediata.

---

## [1.0.6] - 2026-08-28

### ⚡ Optimización del Menú y Supresión de Cargas Innecesarias (Performance & Clarity)
- **Retirada del Comparador Climático**: Eliminación del botón del comparador del menú principal de navegación, consolidando una suite de **6 módulos esenciales** de meteorología asturiana.
- **Ahorro de Datos y Recursos**: Supresión de la precarga en segundo plano del tiempo de otros concejos al arrancar la app, mejorando el consumo de memoria, batería y tiempos de respuesta.
- **Atajos Directos Compactos (1 al 6)**: Sincronización automática de los atajos numéricos directos para los 6 módulos activos.
- **Cache-Busting Total (`?v=1.0.6`) & SW `v106-official`**: Renovación de versión de recursos y caché del Service Worker para actualización inmediata.

---

## [1.0.5] - 2026-08-28

### 🌤️ Iconografía Meteorológica en Gráficos 48h (Visual Detail & UX)
- **Icono y Estado del Cielo en Cuadro Interactivo**: Integración del icono meteorológico (☀️, 🌤️, 🌧️, ⛈️, etc.) y la descripción del estado del cielo en el encabezado del cuadro emergente táctil (*tooltip*) al pulsar cualquier hora del gráfico de 48 horas.
- **Gráfica Limpia sin Sobrepeso Visual**: Toda la información se despliega de forma elegante dentro del cuadro flotante sin necesidad de añadir trazos, rayas ni líneas adicionales a las curvas de la cuadrícula.
- **Cache-Busting Total (`?v=1.0.5`) & SW `v105-official`**: Renovación de versión de recursos y caché del Service Worker para actualización inmediata.

---

## [1.0.4] - 2026-08-28

### 📈 Espaciado Holgado y Etiquetas a 2 Niveles en Gráficos 48h (Visual Perfection & Clarity)
- **Anchura Holgada por Columna Horaria**: Ampliación del ancho base por hora de 34px a **54px por hora** (alcanzando cerca de **2600px** de desplazamiento táctil continuo a lo largo de las 48 horas), dotando a cada punto y barra de suficiente amplitud para evitar cualquier choque de textos.
- **Etiquetas de Día/Hora en 2 Líneas Verticales**: Las marcas temporales de medianoche (`00:00`) y hora inicial se formatean automáticamente en dos niveles (`[Día, Hora]`), manteniendo un ancho compacto y limpio en el eje horizontal.
- **Resalte Visual y Cuadrícula Guiada**: Las líneas verticales que marcan el cambio de día se acentúan en un tono cian sutil (`#38bdf8`) con mayor contraste para facilitar la lectura del paso de los días.
- **Cache-Busting Total (`?v=1.0.4`) & SW `v104-official`**: Renovación de versión de recursos y caché del Service Worker para actualización inmediata.

---

## [1.0.3] - 2026-08-28

### 📈 Reorganización Prioritaria del Menú y Atajos de Teclado (UX & Navigation)
- **Top 3 de Previsión Local Inmediata**: Reorganización del menú de navegación de módulos para situar **📈 Gráficos 48 Horas** en la segunda posición (justo entre *📊 Estación en Vivo* y *📅 Pronósticos*), permitiendo consultar la evolución temporal continua hora a hora de inmediato antes de los pronósticos por días.
- **Sincronización de Atajos de Teclado Numéricos (1 al 7)**: Actualizada la asignación dinámica de teclas directas (1: Estación, 2: Gráficos 48h, 3: Pronósticos, 4: Radar, 5: Costa & Mar, 6: Cordillera & Nieve, 7: Comparador).
- **Cache-Busting Total (`?v=1.0.3`) & SW `v103-official`**: Renovación de versión de recursos y caché del Service Worker para actualización inmediata.

---

## [1.0.2] - 2026-08-28

### 🔒 Política de Privacidad y Canal Directo de Soporte (Privacy & Contact)
- **Canal Directo de Soporte Oficial**: Actualización de la sección de contacto en la Política de Privacidad ([`privacy.html`](privacy.html)), estableciendo el correo oficial directo (`zeustata@gmail.com`) como canal exclusivo de atención al usuario.
- **Preparación y Cumplimiento Google Play Store**: Adecuación a los estándares internacionales de tiendas de aplicaciones móviles, evitando fricción o exposición técnica innecesaria a usuarios finales y canalizando todas las dudas directamente a la bandeja privada del desarrollador.
- **Cache-Busting Total (`?v=1.0.2`) & SW `v102-official`**: Renovación de versión de recursos y caché del Service Worker para actualización inmediata.

---

## [1.0.1] - 2026-08-27

### 📱 Optimización de Cabecera Móvil y Detección Standalone (Improved & Mobile UX)
- **Cabecera Simétrica de 2 Botones en Móviles**: Ocultación inteligente del botón *Completa / Ventana* en pantallas de teléfonos móviles (`max-width: 768px`), desplegando una sola fila limpia y simétrica de 2 botones táctiles: `[ ⭐ Guardar ]` y `[ 📍 Mi Ubicación ]`.
- **Detección Automática de Modo Standalone / App**: En la aplicación instalada (PWA / Google Play Store TWA en teléfonos y tablets), el sistema detecta el modo app (`display-mode: standalone`) y oculta automáticamente los botones redundantes (*Instalar App* y *Completa*), ofreciendo una interfaz 100% nativa.
- **Cache-Busting Total (`?v=1.0.1`) & SW `v101-official`**: Actualización de manifiestos y caché para despliegue instantáneo.

---

## [1.0.0] - 2026-08-27

### 🚀 Gran Lanzamiento Oficial v1.0.0 & Preparación Google Play Store (Major Release)
- **Culminación de la Fase Beta**: Finalización exitosa del ciclo beta y salto histórico a la **Versión Oficial 1.0.0** de *MeteoAstur Lode*.
- **Política de Privacidad Oficial (`privacy.html`)**: Creación de la página oficial de Política de Privacidad adaptada a la normativa de Google Play Store, garantizando el tratamiento local de las coordenadas GPS y cero almacenamiento de datos de usuario en servidores externos.
- **Identificación Oficial y Enlaces**: Integración del acceso directo a la Política de Privacidad en el pie de página y actualización del distintivo de versión a **`v1.0.0 🚀`**.
- **Cache-Busting Total & Service Worker `v100-official`**: Purga completa de caché para garantizar la sincronización instantánea de todos los usuarios en web y dispositivos móviles.

---

## [0.9.1004-beta] - 2026-08-26

### 🌊 Distribución a 2 Niveles por Marea (Visual Clarity & 100% Mobile Immunity)
- **Estructura a 2 Niveles por Fila**: En cada evento de marea (Pleamar y Bajamar), el nombre e icono se sitúan en la línea superior (`tide-sub-top`) y la hora en monoespaciado grande (`1.35rem`) junto con los metros en cian/ámbar se sitúan en la línea inferior (`tide-sub-bottom`) de extremo a extremo (`justify-content: space-between`), asegurando holgura total y cero desbordamientos en cualquier ancho de pantalla móvil.
- **Cache-Busting Total (`?v=1004`) & SW `v75`**: Renovación de versión de recursos para actualización inmediata en clientes.

---

## [0.9.999y-beta] - 2026-08-25

### 🛰️ Geolocalización GPS de Alta Precisión y Algoritmo Haversine (Improved & Precision)
- **Activación de Chip Satelital (High Accuracy)**: Habilitado `enableHighAccuracy: true` y `maximumAge: 0` para forzar a los navegadores y teléfonos a activar el receptor satelital GPS directo en vez de depender de antenas 4G o Wi-Fi con márgenes de error de varios kilómetros.
- **Cálculo de Distancia Esférica (Fórmula de Haversine)**: Migración de la búsqueda del concejo más cercano a la fórmula de Haversine con curvatura terrestre y proyección real de latitud/longitud.
- **Calibración Geográfica de Candamo**: Actualizadas las coordenadas de referencia al centro neurálgico y administrativo municipal (Grullos / San Román), garantizando una detección exacta en todos sus pueblos y valles limítrofes.

---

## [0.9.999x-beta] - 2026-08-25

### ☀️ Indicación Explícita "No disponible" para Radiación UV (Improved & Safety)
- **Claridad y Prevención de Errores**: Cuando un modelo meteorológico no computa el índice ultravioleta (como ECMWF o ICON), la tarjeta del sensor muestra explícitamente **"No disponible"** en gris con la indicación *"No computado por este modelo"*, eliminando el valor falso `0.0` y evitando que el usuario asuma que el riesgo solar es bajo cuando en realidad puede ser elevado.

---

## [0.9.999w-beta] - 2026-08-25

### ☀️ Indicación Explícita "No disponible" para Radiación UV (Improved & Safety)
- **Claridad y Prevención de Errores**: Cuando un modelo meteorológico no computa el índice ultravioleta (como ECMWF o ICON), la tarjeta del sensor muestra explícitamente **"No disponible"** en gris con la indicación *"No computado por este modelo"*, eliminando el valor falso `0.0` y evitando que el usuario asuma que el riesgo solar es bajo cuando en realidad puede ser elevado.

---

## [0.9.999v-beta] - 2026-08-25

### 🛡️ Blindaje de Lecturas Multimodelo en Vivo (Fixed & Resilience)
- **Protección de Datos Nulos en Sensores**: Manejo seguro y tolerante a fallos de variables de radiación solar UV (`uv_index_max`), tendencias barométricas y ráfagas de viento para modelos que omiten ciertas métricas (como ECMWF IFS o ICON-EU), evitando caídas de renderizado y garantizando que las tarjetas de *Estación en Vivo* se muestren siempre con total fluidez.

---

## [0.9.999u-beta] - 2026-08-25

### 🛰️ Selector de Modelos Meteorológicos Científicos Integrado (New & Feature)
- **Botón Multimodelo Ultralimpio en 1 Sola Línea**: Nuevo selector situado encima del menú principal con estética *Liquid Glass* (`🌟 Modelo: Auto Multi-Modelo ➔`) perfectamente simétrico con el botón de menú inferior, sin duplicidades de texto ni sobrecargas visuales.
- **Modal de Selección de Modelos Científicos**: Ventana emergente táctil con fichas de los motores numéricos oficiales más prestigiosos del mundo:
  - 🌟 **Auto Multi-Modelo**: Selección combinada y ponderada de alta resolución (1-3 km).
  - 🇪🇺 **ECMWF IFS (Centro Europeo)**: El estándar de oro mundial de la meteorología científica (9 km).
  - 🇫🇷 **AROME Cantábrico (Météo-France)**: Hiper-resolución (1.3 km) especializada en microclimas de costa y valles asturianos.
  - 🇩🇪 **DWD ICON-EU (Alemania)**: Rápida actualización horaria para precipitación y dinámicas de viento (7 km).
  - 🇺🇸 **NOAA GFS (Estados Unidos)**: Modelo numérico global norteamericano (13 km).
- **Arquitectura Integrada y Persistencia**: Implementación robusta dentro de los módulos existentes (`weatherApi.js`), persistencia en `localStorage` y actualización inmediata en vivo de sensores, gráficas y previsiones con cero dependencias externas.

---

## [0.9.999t-beta] - 2026-08-25

### 📐 Cabecera 2x2 Fija & Sincronización Estable (Fixed & UI)
- **Cabecera 2x2 Fija y Simétrica en Móviles**: Distribución en cuadrícula de 2 filas y 2 columnas fijas para *Instalar App*, *Guardar*, *Completa* y *Mi Ubicación*, eliminando amontonamientos verticales en teléfonos.
- **Purga y Renovación de Caché en Service Worker**: Actualizado el manifiesto de caché (`meteoasturlode-v61-clean-stable`) y los parámetros de importación `?v=7.0` para garantizar una carga limpia y estable.

---

## [0.9.999s-beta] - 2026-08-24

### 🔍 Corrección de Contraste y Visibilidad en el Buscador de Concejos (Fixed & UI)
- **Texto Nítido y Visible**: Aplicadas directivas explícitas de color blanco brillante (`#f8fafc`), `-webkit-text-fill-color`, cursor celeste y tipografía de 16px para evitar que los teclados virtuales o estilos de navegador oscurezcan el texto mientras se escribe.

---

## [0.9.999r-beta] - 2026-08-24

### 💎 Tipografía Compacta y Proporcionada en el Hero Card (Improved & Visual)
- **Ajuste Armónico de Fuentes**: Reducción elegante del tamaño de la temperatura principal (de 3.8rem a 2.6rem), título del concejo, icono del cielo y sensación térmica para una visualización más refinada y equilibrada en dispositivos móviles y de escritorio.

---

## [0.9.999q-beta] - 2026-08-24

### 📐 Reordenación Visual en Estación en Vivo (Improved & UX)
- **Prioridad Visual al Hero Card**: Tarjeta de alertas oficial AEMET posicionada estratégicamente justo después de la tarjeta principal (tiempo, temperatura y ubicación) y antes de los sensores detallados.

---

## [0.9.999p-beta] - 2026-08-24

### 🚨 Tarjeta Oficial de Alertas Meteorológicas AEMET (New & Safety)
- **Sistema de Avisos AEMET por Comarcas**: Integración en *Estación en Vivo* del sistema oficial de alertas tempranas adaptado a las 5 zonas de Asturias (Litoral Occidental, Litoral Oriental, Cordillera y Picos de Europa, Suroccidente y Valles Centrales).
- **Semáforo Oficial de Riesgo**: Clasificación cromática (🟢 Sin avisos, 🟡 Amarillo, 🟠 Naranja, 🔴 Rojo) con desglose de fenómeno adverso (oleaje, viento, lluvias, nieve, efecto Föhn), ventanas horarias de vigencia, probabilidades y recomendaciones de Protección Civil.

---

## [0.9.999o-beta] - 2026-08-24

### 🌊 Recuperación Completa de Costa & Mar & Blindaje ante Nulos (Fixed & Marine)
- **Tolerancia a Nulos en Modelos Marinos**: Asegurada la lectura de oleaje (`wave_height`, `swell_wave_height`, `wave_period`) ante coordenadas costeras limítrofes.
- **Sincronización de Dependencias Internas**: Actualización en cascada de imports de módulos astronómicos (`tides.js`) para garantizar la visualización instantánea del Mareógrafo de 72 horas en todos los concejos.

---

## [0.9.999n-beta] - 2026-08-24

### 🛡️ Aislamiento Robusto de Módulos & Protección de Renderizado (Fixed & Stability)
- **Blindaje Individual de Tarjetas**: Cada sección (Estación en Vivo, Costa & Mar, Cordillera & Nieve, Pronóstico, Gráfica y Comparador) cuenta con captura aislada de excepciones.
- **Garantía de Carga Ininterrumpida**: Asegurada la inicialización del radar, el comparador y las llamadas de datos de forma resiliente en cualquier navegador móvil o de escritorio.

---

## [0.9.999m-beta] - 2026-08-24

### 🌊 Mareógrafo Panorámico de 72 Horas (3 Días) (New & Visual)
- **Onda Sinusoidal Continua de 3 Días**: Previsión marina de 72 horas completas que abarcan Hoy, Mañana y Pasado Mañana, con separadores visuales de fecha y coeficientes de marea.
- **Formato Panorámico 1980px con Desplazamiento Fluido**: Ancho total de 1980px en el contenedor táctil, etiquetas cada 6 horas y nodos de pleamar/bajamar con máxima claridad en pantallas móviles.

---

## [0.9.999L-beta] - 2026-08-24

### 🔓 Desbloqueo Real de Scroll Táctil en el Mareógrafo Móvil (Fixed & Mobile UX)
- **Eliminación de Compresión Forzada en SVG**: Se anuló la restricción `max-width: 100%` que comprimía el SVG en los 320px de la pantalla móvil impidiendo el scroll; ahora el gráfico se despliega con ancho completo de 880px.
- **Scroll Táctil Inmediato & Textos Grandes**: Desplazamiento horizontal ultrasuave (`overflow-x: scroll`), etiquetas de horas cada 3 horas y textos de Pleamar/Bajamar grandes y nítidos sin solapamientos.

---

## [0.9.999k-beta] - 2026-08-24

### 📱 Scroll Horizontal Táctil en el Mareógrafo Móvil (Improved & Mobile UX)
- **Viewport Desplazable de 24 Horas**: Implementado un contenedor con scroll horizontal fluido idéntico al de la gráfica de 48 horas con ancho optimizado de 780px.
- **Píldora Indicadora**: Incorporado aviso interactivo (*"👆 Desliza horizontalmente para recorrer las 24h"*) para una lectura cómoda, nítida y sin solapamiento de textos en teléfonos móviles.

---

## [0.9.999j-beta] - 2026-08-24

### 🌊 Mareógrafo Dinámico en Tiempo Real & Cuadro Semanal de Mareas (New & Feature)
- **Mareógrafo en Vivo con Onda Sinusoidal**: Gráfico continuo de oscilación del Cantábrico con indicador de posición en tiempo real, cota de agua en metros, porcentaje de llenado del ciclo y cuenta atrás hacia el próximo evento (Pleamar o Bajamar).
- **Cuadro Semanal de Mareas & Coeficientes**: Previsión a 7 días con las 4 mareas diarias (horas y alturas), fases lunares astronómicas e insignias de clasificación cromática para Mareas Vivas / Mareonas (🔴), Medias (🟡) y Muertas (🟢).

---

## [0.9.999i-beta] - 2026-08-24

### 🌊 Cristal Translúcido Universal en Costa & Mar, Cordillera & Nieve y Comparador (Fixed & Visual)
- **Extensión Completa a Todos los Módulos**: Eliminados todos los fondos opacos (0.9/0.6) y filtros de desenfoque residuales en los widgets de Surf, Mareas, Puertos Marítimos, Pasos de Montaña, Estaciones de Esquí, Radar y Comparador Climático.
- **Transparencia 100% Homogénea**: Ahora cada tarjeta y sub-tarjeta de la aplicación permite ver las partículas atmosféricas en movimiento sin excepción.

---

## [0.9.999h-beta] - 2026-08-23

### 🌟 Cristal Translúcido Nítido y Partículas Vivas (Fixed & Visual)
- **Eliminación del Desenfoque Opacificante**: Retirado el `backdrop-filter: blur(26px)` que difuminaba y desvanecía las partículas pequeñas al pasar tras las tarjetas; ahora todas las tarjetas actúan como cristal transparente idéntico a las tarjetas del Changelog.
- **Refuerzo de Luminosidad y Partículas**: Incrementada la densidad y luminosidad de las estrellas, nieve y lluvia en el lienzo de partículas para un dinamismo atmosférico total.

---

## [0.9.999g-beta] - 2026-08-23

### 💎 Cristal Puro Ultraligero (18% - 24% Opacidad) (New & Visual)
- **Transparencia Real y Cristalina**: Eliminación de capas base densas; tarjetas de estación, sensores, navegación y pronósticos calibradas a un 18%-24% de opacidad idéntico a la insignia de versión.
- **Desenfoque y Bisel Esmerilado**: Transparencia pura con reflejos de borde de luz blanca y desenfoque fluido que deja ver con total claridad el fondo dinámico.

---

## [0.9.999f-beta] - 2026-08-23

### 🌌 Transparencia Real y Visibilidad del Fondo Dinámico (Improved & Visual)
- **Eliminación de Opacidades Oscuras en Temas**: Reconfiguración de todas las reglas de `weather-themes.css` a gradientes translúcidos (38% a 48% de opacidad) permitiendo visibilidad directa de las partículas climáticas y degradados de cielo.
- **Efecto Lente Atmosférica**: Las partículas animadas (estrellas, lluvia, nieve y polvo solar) y los tonos del clima atraviesan con nitidez las tarjetas manteniendo perfecta legibilidad tipográfica.

---

## [0.9.999e-beta] - 2026-08-23

### 🔮 Estética Liquid Glass & Glassmorphism Translúcido (New & Visual)
- **Fondos de Cristal Líquido**: Reemplazo de bloques opacos por gradientes translúcidos (`rgba(255, 255, 255, 0.08)` a `rgba(15, 23, 42, 0.62)`).
- **Desenfoque Profundo con Saturación**: `backdrop-filter: blur(26px) saturate(185%)` que deja entrever las partículas meteorológicas activas en el fondo.
- **Bisel de Luz Interior**: Reflejos de luz especular (`inset 0 1px 1px 0 rgba(255, 255, 255, 0.22)`) en tarjeta principal, sensores climáticos, carrusel horario y modales.

---

## [0.9.999d-beta] - 2026-08-23

### 📏 Corrección de Altura y Recorte de Texto en Selector de Módulos (Fixed)
- **Eliminación del Colapso Vertical**: Añadido `flex-shrink: 0` a todas las tarjetas de módulos para evitar que se compriman verticalmente dentro del modal.
- **Scroll Natural en Pantallas Móviles**: Configuración de `max-height: 72vh` con desplazamiento suave (`-webkit-overflow-scrolling: touch`) para que todo el texto y descripciones se lean íntegros con holgura.

---

## [0.9.999c-beta] - 2026-08-23

### ⚡ Dinamismo Táctil, Ondas Ripple y Micro-Animaciones (New & Improved)
- **Micro-rebote Elástico (Pill Spring)**: Integrada física elástica `cubic-bezier` al pulsar botones y tarjetas con respuesta táctil instantánea.
- **Motor de Ondas Táctiles (Touch Ripples)**: Ondas de luz líquida y translúcida que nacen bajo la posición del dedo en cada pulsación y se disipan con suavidad.
- **Iconos Vivos**: Micro-animaciones en los iconos de instalación (`📥 bounce`), favoritos (`⭐ star pop`), ubicación (`📍 pin jump`) y flechas de navegación.

---

## [0.9.999b-beta] - 2026-08-23

### 🎨 Jerarquía Tipográfica y Refinamiento Visual (Improved & Changed)
- **Mayor Presencia de la Marca**: Incrementado el tamaño de la tipografía del título superior *MeteoAstur Lode* en la cabecera tanto en pantallas móviles como de escritorio.
- **Proporciones Armónicas en la Tarjeta Principal**: Ajustado el tamaño de la temperatura a `3.5rem` y del título del concejo a `1.65rem` para un equilibrio visual idóneo.
- **Icono del Tiempo Prominente**: Mantenido el icono climático a `3.8rem` con su iluminación y relieve para máxima expresividad visual.

---

## [0.9.999a-beta] - 2026-08-23

### 📅 Orientación Natural y Recta de Separadores Diarios (Fixed & Improved)
- **Corrección de Icono y Texto Vertical**: Eliminada la rotación invertida de 180° que causaba que el emoji de calendario apareciera abajo y boca abajo. Ahora el icono `📅` se sitúa en la parte superior y el texto del día se lee de arriba hacia abajo con total claridad.
- **Mantenimiento en Fase Beta**: Continuación del ciclo beta con el sufijo `a` (`v0.9.999a-beta`).

---

## [0.9.999-beta] - 2026-08-23

### 🚀 Actualización de Importaciones ES6 & Forzado de 72 Horas (Fixed & Improved)
- **Versionado Interno de Módulos ES6**: Incorporado parámetro de control de versión en los `import` internos de JavaScript (`forecastView.js?v=4.7`) para evitar que navegadores móviles sirvan módulos cacheados en memoria.
- **Renderizado Inmediato de 72 Horas**: Garantizada la carga instantánea de las 72 horas y sus separadores de días en cualquier dispositivo.

---

## [0.9.998-beta] - 2026-08-23

### 🚨 Pronóstico Horario Extendido a 72 Horas con Separadores de Días (New & Improved)
- **Ampliación de 24h a 72 Horas (3 Días)**: El carrusel interactivo por horas ahora muestra las próximas 72 horas completas con sus iconos de tiempo, temperatura, probabilidad de precipitación y viento.
- **Insignias de Separación Diaria**: Incorporados divisores visuales verticales con etiquetas estilizadas (*Hoy*, *Mañana*, *Día de la semana*) que separan de manera intuitiva cada jornada al deslizar.

---

## [0.9.997-beta] - 2026-08-23

### 📅 Reorganización del Módulo 'Pronósticos' en Menú de Navegación (Improved & Changed)
- **Renombrado a 'Pronósticos'**: Se actualizó el título del módulo para reflejar tanto la predicción horaria detallada para las próximas 48 horas como el pronóstico a 10 días.
- **Acceso Prioritario en Segunda Posición**: Reubicado el módulo de *Pronósticos* a la segunda posición de la navegación (justo después de *Estación en Vivo*) para un flujo de consulta óptimo.

---

## [0.9.996-beta] - 2026-08-23

### 🔄 Purga de Caché Forzada y Despliegue Inmediato de Concejos (Fixed & Improved)
- **Purga y Renovación de Service Worker**: Actualización forzada a la versión de caché `meteoasturlode-v32-live` con cache-busting `?v=4.4` para garantizar que los teléfonos móviles y navegadores descarguen la lista nueva de 78 concejos sin servir copias antiguas en caché.
- **Sincronización Total de Datos Meteorológicos**: Verificación de consultas climáticas para Grado/Grau y todos los concejos asturianos.

---

## [0.9.995-beta] - 2026-08-23

### 🏔️ Cobertura Completa de los 78 Concejos de Asturias (New & Improved)
- **Catálogo Oficial Íntegro de los 78 Concejos**: Añadida la totalidad de los 78 municipios del Principado de Asturias (*Grado/Grau, Pravia, Carreño/Candás, Gozón/Luanco, Laviana, Lena, Salas, Nava, Allande, Vegadeo, etc.*) con sus coordenadas GPS de precisión, altitud oficial y comarcas.
- **Búsqueda Predictiva Inteligente y Diacríticos**: El buscador ahora es insensible a tildes y mayúsculas, permitiendo encontrar rápidamente cualquier localidad con nombres en castellano o asturiano (*ej: Grado, Grau, Gijon, Uvieu, Lena, etc.*).

---

## [0.9.994-beta] - 2026-08-23

### 🔍 Buscador Optimizado para Móvil y Navegación Atrás en Android (Fixed & Improved)
- **Placeholder de Búsqueda Compacto**: Sustituido el texto extenso por `Buscar (78 Concejos)`, eliminando el desbordamiento y los textos cortados en pantallas de móviles.
- **Botón de Cierre Táctil de Gran Accesibilidad**: El botón `✕` de cierre del buscador y los modales ahora cuenta con dimensiones táctiles amplias (42x42px), borde sutil de cristal y espacio garantizado sin comprimirse.
- **Soporte para Gesto y Botón Atrás en Android**: Al usar el botón o gesto físico de retroceso del teléfono Android, los modales abiertos se cierran de forma limpia y natural sin salir de la aplicación ni provocar bucles de recarga.

---

## [0.9.993-beta] - 2026-08-23

### 🔘 Reorganización de Cabecera y Feedback Táctil Instantáneo (Improved & Fixed)
- **Reordenación de Botones de Cabecera**: Reubicado el botón de *Guardar Favoritos* en posición prioritaria, seguido de *Completa / Ventana* y *Mi Ubicación*.
- **Retirada del Botón Atajos**: Simplificación de la cabecera retirando el botón de atajos para una interfaz uniforme y sin distracciones en Android y Windows.
- **Feedback Táctil Limpio**: Los botones *Completa* y *Mi Ubicación* solo muestran el resalte azul al presionarse (`:active`), restaurando de inmediato su aspecto neutro sin foco azul persistente tras tocar o hacer clic.

---

## [0.9.992-beta] - 2026-08-23

### 🏛️ Bandera Oficial del Principado de Asturias y Ajustes de Navegación (New & Improved)
- **Bandera de Asturias en la Cabecera**: Sustituido el emoji de rayo por una representación vectorial en alta resolución de la bandera oficial del Principado de Asturias con la Cruz de la Victoria y las letras alfa y omega.
- **Simplificación del Selector de Navegación**: Retirada la etiqueta "Sección activa" para mostrar directamente el nombre del módulo actual y actualizado el botón a *Menú ➔*.

---

## [0.9.991-beta] - 2026-08-23

### 🏄‍♂️ Rediseño Visual de Surf, Mareas y Créditos de Propiedad (New & Improved)
- **Tarjetas Gráficas de Mareas**: Cajas visuales diferenciadas con píldoras de hora para Pleamar (*marea alta*) y Bajamar (*marea baja / paseos*).
- **Banner Visual de Surf y Bandera de Playa**: Insignia luminosa con el estado estimado de baño y potencial de rompientes.
- **Identificación de Propiedad**: Inclusión en el pie de página de la autoría y propiedad: *Manuel A. L. Barril* / *Princesa*.

---

## [0.9.99-beta] - 2026-08-23

### 🏖️ Módulo Costa & Playas 100% Dinámico por Concejo (New & Improved)
- **Sincronización Total con el Concejo Seleccionado**: Al elegir cualquier concejo, el módulo de Costa y Playas se personaliza al instante mostrando su litoral exacto (*Gijón, Castrillón, Llanes, Villaviciosa, Tapia, Ribadesella, Cudillero, Luarca, Candás, etc.*).
- **Directorio Dinámico de Playas y Calas**: Se sustituyó el listado estático por un catálogo interactivo con las playas, calas y rompientes reales del concejo activo con etiquetas de tipología (*Surf Top, Monumento Natural, Familiar, Cala, Salvaje*).
- **Referencia Costera para Concejos de Interior**: Si se selecciona una localidad de interior o montaña, la app calcula la costa y arenales más próximos indicando la distancia.

---

## [0.9.98-beta] - 2026-08-23

### 🏄‍♂️ Módulo Costa & Mar Centrado en Surf, Playas y Turismo (Changed & Improved)
- **Evaluación Específica de Surf y Playas**: Sustituida la información de pesca para enfocarse al 100% en condiciones de rompientes de surf, banderas estimadas de baño en playa y mareas para paseos en bajamar.
- **Directorio de Playas y Spots de Referencia**: Foco en los mejores arenales y rompientes de Asturias (*Salinas, Rodiles, San Lorenzo, Tapia de Casariego, Ribadesella, Llanes, Luanco*).

---

## [0.9.97-beta] - 2026-08-23

### 🌦️ Clima Dinámico Atmosférico y Fondos Vivos (New & Improved)
- **Adaptación Visual al Clima en Directo**: La interfaz y los fondos cobran vida adaptándose en tiempo real a las condiciones meteorológicas del concejo (azul cielo brillante soleado, gris orbayu/calabobos, azul tormenta eléctrico, cota de nieve glaciar o noche estrellada).
- **Motor de Partículas Interactivas**: Animación fluida de motas doradas solares, lluvia, copos de nieve o estrellas titilantes en el fondo según la meteorología activa.

---

## [0.9.96-beta] - 2026-08-23

### 📑 Ventana Modal de Navegación entre Módulos (Changed & Improved)
- **Sustitución de Pestañas Horizontales por Selector de Sección**: Se eliminó la tira de pestañas con scroll horizontal para maximizar la superficie útil en pantalla.
- **Selector de Sección Activa y Ventana Modal Táctil**: Al pulsar sobre la sección activa (*ej: `📊 Estación en Vivo`*), se abre un menú emergente con tarjetas descriptivas de los 7 módulos meteorológicos de la app.

---

## [0.9.95-beta] - 2026-08-23

### 🛰️ Radar Cantábrico con Zoom Panorámico Más Alejado (Changed & Improved)
- **Apertura de Radar Panorámica**: Ajustado el nivel de zoom por defecto a una vista más amplia y alejada (`zoom: 7`), permitiendo ver toda la región de Asturias y una amplia franja del Mar Cantábrico y el Atlántico.
- **Transición Suave entre Concejos**: Al cambiar de localidad se preserva la perspectiva global para vigilar borrascas y frentes en movimiento.

---

## [0.9.94-beta] - 2026-08-23

### 🪟 Ventana Modal de Favoritos y Ajuste de Tarjetas (Fixed & Improved)
- **Ventana Modal de Favoritos**: Al pulsar `⭐ Favoritos (X)`, se despliega una ventana emergente limpia y centrada, resolviendo de raíz cualquier problema de corte o superposición con la barra de pestañas en móvil.
- **Optimización de Texto de Búsqueda**: Se simplificó la visualización del concejo activo en la tarjeta de búsqueda para que no se amontone en teléfonos de pantalla estrecha.

---

## [0.9.93-beta] - 2026-08-23

### 🎨 Diseño en Paralelo: Búsqueda y Favoritos Lado a Lado (Changed & Improved)
- **Fila Principal Armónica**: La tarjeta de búsqueda rápida de concejos y la tarjeta de favoritos se sitúan una junto a la otra en la misma fila con proporciones equilibradas.
- **Corrección de Superposición (Z-Index)**: El menú desplegable de favoritos se superpone fluidamente con `z-index: 9999` y fondo desenfocado sobre cualquier tarjeta sin cortarse ni quedar tapado.

---

## [0.9.92-beta] - 2026-08-23

### ⭐ Menú Desplegable de Favoritos en Cabecera (Changed & Improved)
- **Sustitución de Botón de Unidades por Menú de Favoritos**: En lugar del botón de unidades, ahora se cuenta con el selector desplegable `⭐ Favoritos (X) ▾` en la cabecera.
- **Gestión Rápida de Concejos Guardados**: Permite cambiar entre tus concejos favoritos o eliminarlos directamente desde el menú emergente.
- **Pantalla Principal Completamente Despejada**: Se retira la fila inferior de favoritos para conseguir un aspecto ultralimpio y minimalista.

---

## [0.9.91-beta] - 2026-08-23

### 🐛 Restauración de Pastillas de Favoritos (Fixed & Improved)
- **Corrección de Identificador de Contenedor**: Corregida la discrepancia del DOM que impedía que se visualizaran las pastillas de ciudades guardadas como favoritas.
- **Estilos Glassmorphism en Scroll Horizontal**: Presentación fluida de favoritos justo debajo de la barra de búsqueda principal.

---

## [0.9.9-beta] - 2026-08-23

### 🔍 Barra Táctil de Búsqueda Rápida como Selector Principal (Changed & Improved)
- **Sustitución Completa del Dropdown por Barra de Búsqueda**: Se reemplazó el selector nativo desplegable por una tarjeta interactiva elegante que muestra el concejo activo con su altitud y permite buscar predictivamente entre los 78 concejos con un solo toque.
- **Ergonomía Táctil en Móviles**: Acceso más rápido, visual e intuitivo a cualquier concejo de Asturias.

---

## [0.9.8-beta] - 2026-08-23

### 🧹 Limpieza de Cabecera e Integración de Versión en Pie (Changed & Improved)
- **Eliminación del Botón Redundante de Refresco**: Al contar ya con auto-actualización en segundo plano, recarga al desbloquear y atajo `R`, se despeja la cabecera móvil.
- **Integración de Versión en el Pie de Página**: La etiqueta interactiva de versión se traslada como un botón elegante `v0.9.8-beta 📋` a la tarjeta inferior, accesible en todo momento para abrir el historial de cambios.

---

## [0.9.7-beta] - 2026-08-23

### 🚀 Buscador Rápido, Comparador de Concejos, Alertas y Módulos Ampliados (Added & Improved)
- **Buscador Rápido Predictivo**: Acceso inmediato con botón `🔍 Buscar` o tecla `S`/`/` para saltar a cualquiera de los 78 concejos.
- **Comparador Climático Cara a Cara**: Nueva pestaña `⚖️ Comparador` para enfrentar dos concejos en tiempo real con cálculo de diferencias térmicas, altitud y meteorología.
- **Motor MeteoAlerta Asturias**: Avisos de viento sur (Föhn), temporal marítimo, lluvias intensas y cotas de nieve.
- **Mar Cantábrico y Puertos**: Escala Douglas, mar de viento vs fondo y red de puertos asturianos.
- **Cordillera y Puertos**: Monitoreo de 8 puertos de montaña con semáforo dinámico y estaciones de esquí.
- **Retirada del Glosario**: Eliminada la pestaña para dar paso al nuevo comparador.

---

## [0.9.6-beta] - 2026-08-23

### 🏷️ Etiqueta Compacta "Rango" en Pronóstico (Changed & Improved)
- **Sustitución de "Oscilación" por "Rango"**: Reemplazada la palabra larga por el término conciso **`Rango`** (`Δ X°`), garantizando que se mantenga 100% dentro de la tarjeta sin desbordarse ni recortarse en pantallas móviles estrechas.
- **Auto-ajuste Flex y Prevención de Desbordamiento**: Insignias térmicas con `min-width: 0`, protección contra texto sobrante y ajuste responsivo exacto.

---

## [0.9.5-beta] - 2026-08-23

### 📐 Alineación Perfecta de Sensores y Sección Térmica Despejada (Fixed & Improved)
- **Alineación 100% Homogénea de Sensores en Móvil**: Se corrigió el orden de cascada CSS que provocaba que las tarjetas de sensores quedaran más estrechas que la tarjeta superior. Ahora todos los sensores tienen exactamente el 100% del ancho y la misma alineación de bordes.
- **Sección Térmica de 10 Días Despejada**:
  - Reorganización en bloque vertical: 3 insignias limpias arriba (`Máxima`, `Mínima` y `Oscilación Δ X°C`).
  - Barra de rango térmico debajo a ancho completo, evitando que el texto de oscilación se corte en móviles pequeños.

---

## [0.9.4-beta] - 2026-08-23

### 🎨 Alineación Visual y Perfeccionamiento de Tarjetas (Changed & Improved)
- **Alineación Geométrica Uniforme en Móvil**: Todas las tarjetas (`Hero`, `Sensores`, `Pronóstico`, `Mar`, `Montaña`, `Gráficos` y `Radar`) comparten ahora el mismo espaciado interno (`padding: 18px`), margen inferior y radio de curvatura.
- **Corrección de la Tarjeta Hero Principal**:
  - Rediseño de la cabecera (Concejo e Icono meteorológico en fila superior).
  - Bloque térmico equilibrado (Temperatura gigante a la izquierda y descripción del estado, sensación térmica y mín/máx a la derecha) sin saltos de línea antiestéticos.
- **Cuadrícula de Sensores Unificada**: Visualización en columna completa en pantallas móviles para eliminar asimetrías.

---

## [0.9.3-beta] - 2026-08-23

### 🖥️ Control de Pantalla Completa y Modo Kiosko (Changed & Improved)
- **Botón Dinámico de Pantalla**: El botón ahora muestra exactamente **`🖥️ Completa`** cuando estás en modo ventana y cambia automáticamente a **`🗗 Ventana`** al estar a pantalla completa.
- **Detección Automática de Estado**: Escucha en tiempo real los eventos del sistema (`fullscreenchange`, `F11`, `Esc`) para actualizar la etiqueta al instante.
- **Auto-Fullscreen en Inicio**: Al interactuar con la app, intenta expandirse automáticamente a pantalla completa si el navegador lo permite, además del modo standalone nativo de la PWA.

---

## [0.9.2-beta] - 2026-08-23

### 📈 Mejoras en Gráficos y Visualización Móvil (Changed & Improved)
- **Scroll Horizontal Táctil en Gráficos (48 Horas)**: El panel de gráficas ahora cuenta con un visor deslizable horizontalmente (`overflow-x: auto`) con ancho dinámico (~1100px) para que todas las horas tengan espacio suficiente sin amontonarse ni cortarse en pantallas móviles.
- **Ampliación a 48 Horas Completas**: Visualización continua de las próximas 48 horas de evolución de temperatura, probabilidad de precipitación y rachas de viento.
- **Separadores Diarios en el Eje X**: Etiquetas de hora con indicación del día correspondiente (`Hoy 13:00`, `Mañ 00:00`, etc.) para una lectura temporal precisa.
- **Insignia de Ayuda Visual**: Distintivo animado `👈 Desliza la gráfica para explorar las 48h 👉`.

---

## [0.9.1-beta] - 2026-08-23

### 🎨 Mejoras de Experiencia y Diseño Móvil (Changed & Improved)
- **Rediseño Completo de Pronóstico a 10 Días para Móviles**: Sustitución de las filas comprimidas por un feed vertical de **tarjetas enriquecidas de gran formato (el doble de espacio y visuales)**.
- **Métricas Ampliadas en Cada Día**:
  - **Temperaturas y Rango Térmico**: Indicadores grandes de Máx/Mín con barra de gradiente de oscilación térmica.
  - **Precipitaciones**: Probabilidad de lluvia en `%` con litros acumulados en `mm`.
  - **Viento y Rachas**: Velocidad media y ráfagas máximas del día.
  - **Radiación Solar**: Índice UV máximo con nivel (*Bajo, Moderado, Alto, Muy Alto*).
  - **Ciclo Solar**: Hora exacta de amanecer y puesta de sol (Ocaso).
- **Tarjetas Horarias (24h) Mejoradas**: Iconos más grandes (2.2rem), tarjetas más altas y legibilidad superior en pantallas móviles.

---

## [0.9.0-beta] - 2026-08-23

### 🚀 Novedades y Características (Added)
- **Instalación PWA Multiplataforma**: Soporte nativo para instalación en teléfonos móviles (**Android / iOS**) y ordenadores con **Windows (Escritorio / PWA)**.
- **Iconos PNG Oficiales y Adaptativos**: Generación de iconos de alta resolución (`192x192`, `512x512` y formatos `maskable` para Google Play WebAPK).
- **Auto-refresco Inteligente al Abrir la App**: Detección de reactivación (`visibilitychange`, `pageshow`, `focus`) para actualizar el tiempo y radar inmediatamente al desbloquear el móvil o abrir la app.
- **Atajos de Teclado para Windows**: Navegación rápida con teclas numéricas (`1`-`7`), refresco (`R`), favoritos (`F`), GPS (`G`), búsqueda (`S`/`/`) y modo pantalla completa/kiosko (`K`/`F11`).
- **Modo Kiosko / Estación de Pared**: Pantalla completa optimizada para tablets, monitores secundarios y pantallas de pared.
- **Reloj Digital en Directo**: Visualización de hora exacta y fecha en tiempo real en la cabecera.
- **Monitor de Estado de Red**: Indicador visual de conexión (🟢 *En línea* / 🔴 *Modo Offline*).
- **Feedback Háptico**: Micro-vibraciones en móviles compatibles al navegar entre pestañas y concejos.
- **Leyenda del Radar Cantábrico**: Escala cromática de intensidad de precipitaciones (*Débil / Orbayu*, *Moderada*, *Fuerte*, *Torrencial*).

### 🎨 Mejoras de Experiencia y Diseño (Changed)
- **Renombrado Oficial**: Transición de marca a **MeteoAstur Lode**.
- **Radar Despejado**: Eliminación de marcadores amontonados de los 78 concejos en el mapa, priorizando la nitidez del radar meteorológico y satélite del Cantábrico.
- **Encuadre Panorámico del Radar**: Ajuste del zoom inicial a nivel 8 para visualizar Asturias al completo, el mar Cantábrico y el Golfo de Vizcaya.
- **Favoritos Limpios por Defecto**: La lista de favoritos comienza vacía para que el usuario guarde únicamente los concejos que desee.
- **Estrategia Network-First en Service Worker**: Garantiza que el usuario reciba siempre la versión más reciente sin bloqueos de caché persistente.

### 🐛 Correcciones de Errores (Fixed)
- **WebAPK en Android**: Corrección del enlace del manifiesto (eliminación de parámetros de consulta) para permitir la creación del icono en la pantalla de inicio de Android.
- **Zoom Level Not Supported**: Restricción del zoom máximo en el mapa (`maxZoom: 11`, `maxNativeZoom: 10`) para evitar errores de mosaico en el proveedor de radar.
- **Safe Area Insets**: Ajuste ergonómico para muescas (*Notch* / *Dynamic Island*) y barras gestuales inferiores en smartphones.

---

## [0.8.0-beta] - 2026-08-23
- Inicialización del proyecto y configuración del repositorio oficial en GitHub.
- Integración de APIs de predicción meteorológica (Open-Meteo ECMWF / ICON) y satélite RainViewer.
- Despliegue en la nube mediante GitHub Pages.
