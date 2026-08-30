# 📋 Registro de Cambios (Changelog) - MeteoAstur Lode

Todas las novedades, mejoras y correcciones notables de **MeteoAstur Lode** se documentan en este archivo siguiendo el estándar [Semantic Versioning](https://semver.org/lang/es/).

---

## 🏷️ Guía de Versionado
- **Major (X.0.0)**: Cambios arquitectónicos grandes o rediseños completos.
- **Minor (0.X.0)**: Nuevas funcionalidades, nuevos módulos climáticos o integraciones.
- **Patch (0.0.X)**: Corrección de errores (*bugfixes*), ajustes de diseño y optimizaciones.
- **Sufijo `-beta` / `-rc`**: Versiones preliminares en fase de pruebas activas.

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
  3. ⏱️ **Barómetro y Presión**: Funcionamiento de altas/bajas presiones y tendencia.
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

### ⏱️ Pronóstico Horario Extendido a 72 Horas con Separadores de Días (New & Improved)
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
