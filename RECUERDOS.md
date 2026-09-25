# MEMORIA Y RECUERDOS DEL PROYECTO (TIEMPO ASTURIAS)

Este documento contiene la memoria permanente del proyecto, sus acuerdos de desarrollo, diseño y evolución histórica.

---

## 👑 0. Identidad del Proyecto
- **Usuario / Desarrollador**: **Lendo** (*Manuel A. L. Barril*).
- **Asistente IA**: **Princesa**.
- Siempre mantener el trato directo, cercano y personalizado hacia **Lendo**.

---

## 📌 1. Reglas Fundamentales de Trabajo

1. ⭐ **Regla de Oro (Validación y Visto Bueno Previo)**:
   - Si Lendo propone hacer algo pero pregunta **"¿qué te parece?"**, solicita opinión o pide valorar una alternativa, **NO adelantarse modificando el código**.
   - Responder confirmando lo entendido, dando la opinión o propuesta técnica y **esperar a que Lendo dé el visto bueno explícito** antes de tocar el código.

2. 💻 **Actualización Dual Inmediata (Local + Red con Cache-Busting Garantizado)**:
   - Toda modificación aprobada debe aplicarse directamente en la **carpeta de archivos locales** (`c:\Users\NUC\Downloads\IA\Tiempo`).
   - Para que la web y los dispositivos móviles NO se queden atrapados en cachés viejas, **SIEMPRE actualizar la cadena de caché en cascada** (nombre de caché en `sw.js` y query string de cache-busting en `index.html` y módulos JS).
   - Acto seguido, realizar `git commit` y `git push origin main` hacia `zeustata/tiempo` y verificar que el despliegue en GitHub Pages quede activo en vivo.

3. 🔢 **Incremento de Versión Obligatorio**:
   - Con cada cambio o modificación de funcionalidades, estilos o estructura, **siempre se debe subir el número de versión** (actualmente en ciclo oficial `v1.x.x`).
   - Se debe reflejar la nueva versión en:
     - El badge del pie de página (`#app-version-badge` en `index.html`).
     - El historial del modal de versiones (`#version-modal` en `index.html`).
     - El archivo `CHANGELOG.md`.
     - El archivo de memoria permanente `RECUERDOS.md` (Constitución Suprema, Art. 10).

4. 🚀 **Versión Oficial 1.0.0**:
   - Culminación de la fase beta y publicación de la versión oficial `1.0.0` para su despliegue y lanzamiento en Google Play Store.

---

## 🎨 2. Decisiones de Diseño y UI

1. **Cabecera y Emblema Asturiano**:
   - Icono oficial en SVG de la **Bandera del Principado de Asturias** ([icons/bandera-asturias.svg](file:///c:/Users/NUC/Downloads/IA/Tiempo/icons/bandera-asturias.svg)) con la Cruz de la Victoria y letras Alfa y Omega (Α / ω).
   - Reloj en directo, estado de red e insignia de instalación / atajos.
2. **Tarjeta de Navegación Principal**:
   - No lleva la etiqueta `"Sección activa"`.
   - Muestra directamente el icono y el título de la sección actual (ej. *📊 Estación en Vivo*).
   - En la parte derecha muestra el botón de llamada a la acción con el texto **`Menú ➔`**.
3. **Cabecera y Accesos Rápidos**:
   - Barra organizada en una sola fila con:
     - Tarjeta táctil de búsqueda de concejo (`🔍 Nombre`).
     - Tarjeta táctil de favoritos (`⭐ Favoritos (n)`).
   - Sin botones redundantes.
4. **Módulo Costa, Playas y Surf**:
   - Dinámico y enfocado según el concejo costero seleccionado.
   - Incluye tarjetas gráficas para mareas (pleamar/bajamar con horarios y coeficientes), altura/período de oleaje, viento y temperatura del agua.
   - Créditos de propiedad y autoría integrados (*Manuel A. L. Barril / Princesa*).
5. **Atmósfera Climática y Partículas Vivas (Liquid Glass)**:
   - Tarjetas con cristal translúcido puro (`rgba(15, 23, 42, 0.35)`) sin filtros gaussianos de desenfoque (`backdrop-filter: blur`) que destruyan las partículas de fondo; todas las tarjetas permiten ver las partículas atmosféricas en movimiento sin excepción.
6. **Radar Meteorológico**:
   - Zoom panorámico alejado por defecto centrado sobre el mar Cantábrico y la cordillera.
7. **Catálogo de Concejos Completo**:
   - Integrados los **78 concejos oficiales de Asturias** con búsqueda insensible a acentos.
8. **Mareógrafo Astronómico Panorámico de 72 Horas**:
   - Cálculo del ciclo semidiurno M2 (12h 25m) con oscilación sinusoidal continua a 3 días (Hoy, Mañana y Pasado Mañana), indicador en vivo con cuenta atrás, clasificación cromática de coeficientes (🔴 Vivas / 🟡 Medias / 🟢 Muertas), fases lunares y cuadro semanal de mareas a 7 días con scroll horizontal táctil de 1980px.
9. **Tarjeta Oficial de Alertas Meteorológicas AEMET**:
   - Ubicada estratégicamente en *Estación en Vivo* inmediatamente después del Hero Card principal. Mapea automáticamente los 78 concejos en las 5 zonas oficiales de avisos de Asturias (Litoral Occidental, Litoral Oriental, Cordillera, Suroccidente y Valles Centrales) con clasificación cromática (🟢 Sin avisos, 🟡 Amarillo, 🟠 Naranja, 🔴 Rojo), vigencia, probabilidades y recomendaciones de seguridad.
10. **Tipografía Equilibrada y Proporcionada**:
   - Hero Card estilizado con temperatura a `2.6rem`, título de concejo a `1.35rem` e icono a `2.8rem` para una lectura limpia y compacta.

11. **Selector de Modelos Meteorológicos Científicos**:
    - Botón interactivo de 1 sola línea situado inmediatamente encima del botón de *Menú* (`🌟 Modelo: Auto Multi-Modelo ➔`).
    - Permite al usuario conmutar entre los modelos científicos más avanzados del mundo: 🌟 *Auto Multi-Modelo*, 🇪🇺 *ECMWF IFS (Centro Europeo)*, 🇫🇷 *Météo-France AROME Cantábrico (1.3 km)*, 🇩🇪 *DWD ICON-EU (Alemania)* y 🇺🇸 *NOAA GFS (EE. UU.)*.
    - Implementación integrada sin dependencias externas, con persistencia en `localStorage` y actualización en vivo al instante de todos los datos climáticos.

---

## 🏗️ 3. Módulos de la Aplicación
1. **📊 Estación en Vivo (`panel-live`)**: Panel principal con Hero Card, Alertas AEMET y sensores detallados.
2. **📈 Gráficas Meteo (`panel-charts`)**: Evolución temporal detallada con scroll táctil horizontal y curvas 48 horas con iconografía del cielo.
3. **📅 Previsión 14 Días (`panel-forecast`)**: Pronóstico extendido por días y horas.
4. **📡 Radar en Directo (`panel-radar`)**: Mapa interactivo con capas de lluvia/nubes de RainViewer/AEMET.
5. **🏖️ Playas & Mareas (`panel-marine`)**: Turismo costero, baño, mareógrafo en tiempo real de 72h, fases lunares, estado de baño y catálogo de calas/arenales.
6. **🏄‍♂️ Surf & Rompientes (`panel-surf`)**: Swell, altura y período de ola, mar de fondo/viento, detector offshore/onshore en vivo, suite didáctica y picos bautizados.
7. **🏔️ Montaña y Puertos (`panel-mountain`)**: Datos de puertos asturianos y cotas de nieve.
8. **🔭 Astronomía & Cosmos (`panel-astronomy`)**: Catálogo de eventos celestes, eclipses, lluvias de estrellas, fases lunares en directo y semáforo de visibilidad en Asturias.

---

## 🔄 4. Historial Reciente de la Sesión
- Transición completa de pestañas horizontales a selector por modal táctil.
- Integración de badges interactivos de versiones en el pie de página.
- Incorporación de la bandera del Principado de Asturias en la cabecera y catálogo de 78 concejos.
- Transformación al diseño de cristal translúcido puro (Liquid Glass) sin desenfoques opacos en todas las tarjetas de la app.
- Creación del Mareógrafo interactivo en tiempo real continuo de 72 horas y el Cuadro Semanal de Mareas y Coeficientes adaptado al litoral asturiano.
- Blindaje total y aislamiento de excepciones ante respuestas nulas de modelos satelitales.
- Integración de la Tarjeta Oficial de Alertas AEMET por comarcas asturianas tras la tarjeta principal.
- Armonización y ajuste compacto de las fuentes tipográficas del Hero Card.
- Corrección de visibilidad y contraste nítido en el buscador rápido de concejos en móviles.
- Reorganización fija en cuadrícula 2x2 de los botones de la cabecera en móviles.
- Integración del Selector Multimodelo Científico (Auto, ECMWF, AROME, ICON, GFS) con botón superior de 1 sola línea encima del menú.
- Blindaje de variables nulas y despliegue del estado explícito "No disponible" en el índice UV para modelos que no lo computan.
- Geolocalización satelital de alta precisión (`enableHighAccuracy`), algoritmo esférico de Haversine y calibración del centro de Candamo (Grullos / San Román).
- Consolidación definitiva de las mareas diarias en 2 únicas tarjetas con estructura a 2 niveles (nombre arriba, hora y metros abajo de extremo a extremo).
- Culminación de la fase beta y lanzamiento histórico de la **Versión Oficial 1.0.0** (`v1.0.0 🚀`) con creación de la Política de Privacidad (`privacy.html`), enlace en pie de página, Service Worker `v100-official` y preparación para Google Play Store.
- Optimización inteligente de cabecera en modo standalone/móviles: ocultación de botones redundantes (*Instalar* y *Completa*) dejando 2 botones simétricos (*Guardar* y *Ubicación*) y salto a **v1.0.1** (SW `v101-official`).
- Actualización de la Política de Privacidad (`privacy.html`): establecimiento del correo oficial directo (`zeustata@gmail.com`) como canal exclusivo de soporte para máxima privacidad, sencillez de cara al usuario final y cumplimiento de estándares para Google Play Store, con salto a **v1.0.2** (SW `v102-official`).
- Reorganización del menú de navegación de módulos para situar **📈 Gráficos 48 Horas** en la segunda posición (entre *Estación en Vivo* y *Pronósticos*), agrupando el Top 3 de previsión local directa y sincronizando atajos numéricos, con salto a **v1.0.3** (SW `v103-official`).
- Optimización y holgura en **📈 Gráficos 48 Horas**: ampliación a 54px por hora (~2600px de ancho) y formateo de etiquetas en 2 líneas verticales (`[Día, Hora]`) con líneas guía sutiles en cian para eliminar cualquier superposición de horas y cuadrículas en móviles, con salto a **v1.0.4** (SW `v104-official`).
- Integración de iconografía y estado del cielo en el cuadro emergente interactivo (*tooltip*) de **📈 Gráficos 48 Horas** sin sobrecargar la cuadrícula visual, con salto a **v1.0.5** (SW `v105-official`).
- Retirada del botón del Comparador Climático y supresión de precargas de datos innecesarias en segundo plano, consolidando 6 módulos oficiales con atajos numéricos del 1 al 6, con salto a **v1.0.6** (SW `v106-official`).
- Creación e integración del nuevo módulo **🔭 Astronomía & Cosmos** (`panel-astronomy` / atajo `7`) con catálogo de acontecimientos celestes, semáforo inteligente de visibilidad geográfica (🟢 Asturias / 🟡 España / 🔴 Global), fases lunares en vivo, cuentas atrás dinámicas y filtros táctiles, con salto a **v1.0.7** (SW `v107-official`).
- Reversión atómica y segura del botón didáctico al estado funcional estable con salto a **v1.0.9** (SW `v109-official`) para purga inmediata de caché en todos los clientes.
- Integración verificada y libre de errores del botón y modal didáctico interactivo **`[ 💡 Explícame ]`** en la tarjeta del Barómetro con explicación clara de presión, anticiclón, borrasca, lectura de tendencias y trucos asturianos, con arquitectura extensible a otros sensores, con salto a **v1.0.10** (SW `v110-official`).
- Sincronización masiva de query strings de submódulos JavaScript para forzar la actualización inmediata del botón didáctico en clientes con salto a **v1.0.11** (SW `v111-official`).
- Integración del botón didáctico **`[ 💡 Explícame ]`** en el sensor de Humedad y Punto de Rocío con guía completa sobre condensación, bochorno y formación de nieblas/orbayu asturiano con salto a **v1.0.12** (SW `v112-official`).
- Refuerzo global de contraste y accesibilidad visual: elevación de tokens de color (`--text-muted` a `#cbd5e1`, `--text-dim` a `#94a3b8`) y aclarado nítido de etiquetas en mareógrafos, sensores y módulos de montaña para lectura cristalina en cualquier condición atmosférica con salto a **v1.0.13** (SW `v113-official`).
- Despliegue de la suite didáctica completa: integración de botones interactivos **`[ 💡 Explícame ]`** en la totalidad de los 6 sensores de la Estación en Vivo (Anemómetro/Viento, Barómetro, Humedad/Rocío, Pluviómetro, Radiación UV y Calidad del Aire AQI) con salto a **v1.0.14** (SW `v114-official`).
- Perfeccionamiento visual y simetría en el módulo Observatorio Astronómico: cuadrícula fija 2x2 para los filtros del semáforo de visibilidad, 3 columnas proporcionales en una sola fila para las métricas lunares y encaje simétrico de etiquetas en eventos astronómicos con salto a **v1.0.15** (SW `v115-official`).
- Coherencia inteligente en pronóstico horario (72h) y gráficas (48h): armonización automática entre probabilidad de precipitación (%), litros y códigos de cielo para eliminar contradicciones visuales (nubes de lluvia con 0% de probabilidad) e incorporación de iconografía nocturna real (🌙) con salto a **v1.0.16** (SW `v116-official`).
- Graduación de lluvia por intensidad real en 4 niveles (seco, orbayu ligero, lluvia moderada y bastinazu/fuerte) cruzando mm/h y probabilidad con salto a **v1.0.17** (SW `v117-official`).
- Hotfix y blindaje de variables térmicas en tarjetas diarias del módulo Pronósticos con salto a **v1.0.18** (SW `v118-official`).
- Reordenación y prevalencia absoluta del filtro de precipitación sobre adaptaciones nocturnas para garantizar nubes secas sin falsos avisos con salto a **v1.0.19** (SW `v119-official`).
- Blindaje estricto del umbral de lluvia para eliminar falsos iconos por ruido numérico del modelo (< 20% prob o < 0.3 mm) con salto a **v1.0.20** (SW `v120-official`).
- Creación del set de iconos vectoriales propios "Estilu Asturianu" (SVG) y selector conmutable en el menú de navegación con salto a **v1.0.21** (SW `v121-official`).
- Rediseño gráfico auténticamente asturiano de los iconos SVG con Hórreo, Picu Urriellu, Manzana de Sidra, Trisquel celta, Faro de Peñas y Cruz de la Victoria con salto a **v1.0.22** (SW `v122-official`).
- Creación del set de personajes estilo cómic "Emojis Emotivos" (con ojos, boca, coloretes y expresiones divertidas) y renombrado oficial del botón en el menú con salto a **v1.0.23** (SW `v123-official`).
- Simplificación y limpieza del selector en el menú retirando el encabezado redundante con salto a **v1.0.24** (SW `v124-official`).
- Blindaje definitivo de la Regla de Oro de Probabilidad (< 20% = Incondicionalmente Seco / Nube limpia) para eliminar falsas lluvias por ensambles residuales con salto a **v1.0.25** (SW `v125-official`).
- Creación de la ventana emergente de selección de estilos de iconos con vista previa interactiva y emojis clásicos por defecto con salto a **v1.0.26** (SW `v126-official`).
- Compactación y estilización del botón de acceso a estilos en el menú en dos líneas limpias con salto a **v1.0.27** (SW `v127-official`).
- Gran Lanzamiento de la Colección de 5 Estilos de Iconos (Clásicos, Emotivos, Pixel Art Retro 8-Bits, Minimalista Neón Glow y Cristal 3D Glassmorphism) con salto a **v1.0.28** (SW `v128-official`).
- Habilitación de scroll vertical táctil suave en el modal de selección de iconos con salto a **v1.0.29** (SW `v129-official`).
- Sustitución del estilo de cristal por el nuevo estilo artesano "✏️ Dibujo a Mano" (Hand-Drawn Sketch & Acuarela) con salto a **v1.0.30** (SW `v130-official`).
- Unificación total de la cabecera en una Tarjeta Maestra Universal (Centro de Control Unificado: Identidad, Modelo, Menú y Acciones Rápidas) con salto a **v1.0.31** (SW `v131-official`).
- Ajuste de cuadrícula simétrica de 2 botones por línea (50% / 50%) para navegación y acciones con salto a **v1.0.32** (SW `v132-official`).
- Rollback seguro: Restauración de la cabecera clásica independiente (sin unificación) manteniendo el pack "Dibujo a Mano" con salto a **v1.0.33** (SW `v133-official`).
- Unificación del bloque superior dentro de una única tarjeta contenedora exterior conservando al 100% el diseño estético y disposición original de cada elemento con salto a **v1.0.34** (SW `v134-official`).
- Ajuste de cabecera: reloj y estado en una misma fila horizontal paralela y subtítulo corto "Estación Meteorológica Asturias" con salto a **v1.0.35** (SW `v135-official`).
- Reordenación ergonómica: fila de Buscar concejo y Favoritos colocada encima del selector de Modelo con salto a **v1.0.36** (SW `v136-official`).
- Tarjeta ultra compacta con reducción del 50% de altura: botones dobles inteligentes (Buscar + GPS / Guardar + Favs) y Modelo + Menú al 50% con salto a **v1.0.37** (SW `v137-official`).
- Simplificación minimalista de botones de navegación a [Modelo ➔] y [Menú ➔] con salto a **v1.0.38** (SW `v138-official`).
- Simetría visual total con botones gemelos idénticos (icono cuadrado a la izquierda y acción con texto a la derecha) con salto a **v1.0.39** (SW `v139-official`).
- Doble previsión horaria Mañana / Tarde en tarjetas diarias de pronóstico a 10 días (Opción B inicial en v1.0.49 y consolidación de la **Opción A: Badge Unificado Horizontal** con filas limpias y divisor) con salto a **v1.0.50** (SW `v150-official`).
- Supresión de la barra horizontal redundante de "Rango del día" en tarjetas de pronóstico diario, reduciendo altura y dejando las 3 cajas térmicas esenciales (Máx, Mín, Oscilación Δ) con salto a **v1.0.51** (SW `v151-official`).
- Unificación total de métricas y temperaturas de tarjetas diarias a 10 días en un único panel armónico de 2 filas (Opción 1), ahorrando más del 40% de altura con salto a **v1.0.52** (SW `v152-official`).
- Reordenación simétrica de temperaturas en panel diario (🔻 Mínima a la izquierda / 🔺 Máxima a la derecha) y retirada de oscilación para eliminar desbordes en móviles con salto a **v1.0.53** (SW `v153-official`).
- Flecha aerodinámica vectorial SVG en el anemómetro/rosa de los vientos (cola de origen, fuste y punta hacia el destino) con aclaración de flujo (Viene de ➔ va hacia) con salto a **v1.0.54** (SW `v154-official`).
- Corrección y restauración total del renderizado de los 6 sensores en Estación en Vivo con salto a **v1.0.55** (SW `v155-official`).
- Flecha de viento náutica en anemómetro orientada desde el punto de origen exterior hacia el centro del observador con salto a **v1.0.56** (SW `v156-official`).
- Despliegue de Inteligencia de Surf y Dinámica Marina: detector en tiempo real de viento Offshore / Onshore / Cross-shore / Glassy, catálogo de playas de Asturias enriquecido con picos de surf bautizados, tipo de fondo (Arena / Roca / Mixto), dirección de ola (Izquierdas / Derechas / A-Frames), marea óptima y suite didáctica interactiva `[ 💡 Guía de Surf y Olas ]` con salto a **v1.0.57** (SW `v157-official`).
- Separación especializada de la costa en dos módulos independientes: **🏖️ Playas & Mareas** (turismo, baño, mareógrafo 72h, fases lunares y catálogo de arenales) y **🏄‍♂️ Surf & Rompientes** (swell, período, mar de fondo/viento, inteligencia de viento offshore/onshore, suite didáctica y picos bautizados), ampliando a 8 módulos el menú con salto a **v1.0.58** (SW `v158-official`).
- Corrección de la exportación de `getNearestCoastalReference` en `marineCard.js` para reactivar la ejecución de scripts y el menú con salto a **v1.0.59** (SW `v159-official`).
- Rediseño visual de las especificaciones de playas y picos (Fondo Marino, Dirección de Ola, Marea Óptima, Nivel) en filas técnicas horizontales de ancho 100% (Liquid Glass) con alineación simétrica y cero desbordes en móviles con salto a **v1.0.60** (SW `v160-official`).
- Despliegue de clases semánticas dedicadas e independientes (`.beach-specs-table`, `.beach-picos-box`, `.beach-spec-row`) con estilos directos y actualización atómica en `surfCard.js` y `marineCard.js` con salto a **v1.0.61** (SW `v161-official`).
- Unificación armónica total: ajuste de ancho 100% y padding `16px 20px` en `.beach-card` coincidiendo 1:1 con `.marine-widget`, y formato vertical con etiqueta arriba y valor abajo alineado estrictamente a la izquierda como los sensores de la app con salto a **v1.0.62** (SW `v162-official`).
- Motor de Inteligencia Aerodinámica Costera Pro: asignación de azimut de costa (`facingDeg`) a todas las playas de Asturias y cálculo dinámico de viento Offshore/Onshore en vivo por playa (demostrando el efecto Cabo Peñas de Xagó vs Candás) con capítulo didáctico en la Guía de Surf con salto a **v1.0.63** (SW `v163-official`).
- Unificación Total de Temperatura Marina: inclusión de `sea_surface_temperature` en la API marina en vivo y cálculo centralizado en `getSeaWaterTemperature` compartido entre Playas & Mareas y Surf & Rompientes con salto a **v1.0.64** (SW `v164-official`).
- Corrección de exportación top-level de `getSeaWaterTemperature` en `marineCard.js` para restablecer el arranque inmediato de los módulos y el menú con salto a **v1.0.65** (SW `v165-official`).
- Mareas del Día en Pastillas Compactas y Dinámicas: reducción del 65% de espacio vertical con `.tide-compact-pill` adaptándose dinámicamente tanto si el día tiene 3 o 4 mareas astronómicas con salto a **v1.0.66** (SW `v166-official`). *(Frase de Lendo para arrancar cambios: "¡Písale!" en honor a Star Trek)*.
- Perfección visual en Mareas del Día: sustitución por filas horizontales 100% de ancho `.tide-row-item` con salto a **v1.0.67** (SW `v167-official`).
- Estructura anti-colisión en 2 bloques extremos (Izquierda: Tipo • Derecha: Hora + Altura) con salto a **v1.0.68** (SW `v168-official`).
- Mareas de Hoy en Tarjeta Única a 2 Niveles (`.daily-tides-grid` y `.tide-sub-item` con arriba: icono + tipo + orden, abajo: hora + altura) y calibración de márgenes/anclajes de texto en el Mareógrafo SVG de 72h con salto a **v1.0.69** (SW `v169-official`).
- Auto-Centrado en tiempo real del Mareógrafo de 72h ("AHORA") y consolidación de Mareas de Hoy en cuadrícula fija 2x2 súper compacta con salto a **v1.0.70** (SW `v170-official`).
- Restauración completa y segura de las 2 tarjetas de ciclo diarias (1ª Marea y 2ª Marea) con pleamares y bajamares una debajo de otra con salto a **v1.0.71** (SW `v171-official`).
- Despliegue de la Suite Didáctica de Coeficientes y Mareas (`[ 💡 Explícame ]`) en Playas & Mareas (píldora de Coeficiente Hoy y cabecera del Cuadro Semanal) explicando la amplitud de marea (escala 20-118), mareas vivas vs muertas y precauciones en calas y arenales de Asturias con salto a **v1.0.72** (SW `v172-official`).
- Inteligencia de Energía de la Ola en kiloJulios ($E \propto H_s^2 \cdot T$) con suite didáctica `surf_energy` y Cronograma de Surf a 3 Horas (08h, 11h, 14h, 17h, 20h para Hoy y Mañana cruzando oleaje, swell, período, energía, viento offshore/onshore y mareas en tiempo real al estilo Surf-Forecast y Windguru) con salto a **v1.0.73** (SW `v173-official`).
- Calibración Fiel de Energía de Oleaje (kJ) a estándar oceanográfico de *Surf-Forecast* ($E = 11 \cdot H_{\text{swell}}^2 \cdot T$) con ajuste de umbrales y cálculo directo sobre el mar de fondo (corrección observada por Edu en olas de 1.3m y 8s que ahora dan 148 kJ Suave) con salto a **v1.0.74** (SW `v174-official`).
- Flecha Dinámica Rotatoria de 360° y Rumbo Cardinal en Pronóstico Horario a 72 Horas (propuesta de Edu y Opción A aprobada por Lendo con vector físico de flujo de viento `(windDeg + 180)deg`, iniciales en español N/NE/E/SE/S/SO/O/NO y velocidad) con salto a **v1.0.75** (SW `v175-official`).
- Despliegue de la Suite Didáctica de Olas y Swell (`[ 💡 Explícame ]`) en Surf & Rompientes (Altura de Oleaje y Período/Dirección del Swell) y Playas & Mareas (Estado de la Mar - Douglas), explicando Altura Significativa ($H_s$), Mar de Fondo vs Mar de Viento, Escala Douglas, Período ($T$) y Refracción Marina Cantábrica con salto a **v1.0.76** (SW `v176-official`).
- Inteligencia Multi-Swell y Energía Combinada Total ($E_{\text{total}} = E_1 + E_2$) alineada 1:1 con la tabla oficial de *Surf-Forecast* (detección de Swell 1 Principal + Swell 2 Secundario con alturas, períodos y rumbos independientes y suma de potencia física en kiloJulios) con salto a **v1.0.77** (SW `v177-official`).
- Previsión Extendida de Surf a 7 Días (Mañana 08h-14h vs Tarde 14h-20h) con selector conmutable de pestañas táctiles en el visor de Rompientes (Opción A elegida por Lendo) con salto a **v1.0.78** (SW `v178-official`).
- Interruptor Deslizante Segmentado 100% Móvil (`.surf-sliding-segmented-switch` con glider animado) para conmutar entre Horas 3h y 7 Días M/T sin desbordamientos ni cortes de texto con salto a **v1.0.79** (SW `v179-official`).
- Carga Instantánea 0 ms & Stale-While-Revalidate: Almacenamiento en caché de la última instantánea meteorológica (`localStorage`), inyección de Skeleton Loader ultra fluido para arranques en frío, eliminación de recargas agresivas por `controllerchange` y salto a **v1.0.81** (SW `v181-official`).
- Conexión Digital Asset Links oficial de Google Play Console (Huella SHA-256 agregada y replicada en la raíz `zeustata.github.io/.well-known/assetlinks.json` con `.nojekyll` para eliminar definitivamente la barra superior CCT en dispositivos Android).
- Reubicación del Pronóstico Horario 72h / 3 Días en "Estación en Vivo": Situado con precisión milimétrica entre la tarjeta Hero y la tarjeta de Avisos AEMET a petición de los 17 beta testers (Opción A aprobada por Lendo), dejando la pestaña "Pronósticos" centrada en el análisis extendido a 10 días, manteniendo la versión pública en v1.0.81 (SW `v181-live-hourly`) para total congruencia con Google Play Console.
- Verificación Oficial de Desarrollador de Google Play Console: Soporte a Lendo para completar la verificación de identidad y número de teléfono.
- Generación del Kit Gráfico Oficial de Google Play Store:
  - Portada Principal Cinematográfica (1024 x 500 px): Cristal holográfico 3D con la bandera del Principado de Asturias, insignia dorada `👑 Principado de Asturias • 78 Concejos Oficiales`, rayos aurorales y los 9 módulos de la app con gradientes de neón individuales.
  - 18 Capturas de Pantalla Pixel-Perfect: 10 de móvil (1080 x 2400 px) y 8 de tablet horizontal (1920 x 1080 px) recorriendo todas las vistas reales de la app.
- Configuración Integral de la Ficha y Políticas en Google Play Console:
  - Las 11 tareas legales completadas al 100% (Política de Privacidad, Sin Anuncios, PEGI 3 para todos los públicos, Seguridad de Datos, Categoría El Tiempo).
- Generación del Paquete Instalable Oficial (`.aab`):
  - Creación del paquete firmado `com.zeustata.meteoasturlode` (`MeteoAstur Lode.aab`) mediante PWABuilder con clave de firma digital `signing.keystore`.
- Motor Armónico Astronómico Autónomo Universal (6 Constituyentes: M2, S2, N2, K2, K1, O1): Superación definitiva de tablas fijas y ciclos rígidos. Cálculo continuo universal para cualquier mes y año futuro (octubre, noviembre, 2027, 2028...) con resolución de raíces Newton-Raphson, sincronización total con fases lunares (Luna Llena 4 Sep 2028 confirmada) y cero desincronización en el tiempo.
- Calibración Hidrodinámica Fiel del Litoral Asturiano (IHM): Sustitución del desfase lineal teórico por la batimetría real del Cantábrico (la onda entra frontalmente al unísono). Coincidencia al 100% y al minuto exacto con las tablas oficiales en los 19 concejos costeros de Asturias: Salinas (22:42), Luarca (22:42), Llanes (22:41), Ribadesella (22:41), Gijón (22:39) y Tapia (22:40).
- Regla Permanente de Comunicación Limpia en el Chat: Prohibición absoluta de usar código de fórmulas matemáticas (LaTeX/KaTeX con dólares, barras y llaves como `$12\text{ h }...$`) que ensucian la pantalla en el visor. Escribir siempre texto natural, legible y pulcro (ej. `12 h 41 min`, `4,05 m`).
- Preservación Total de la Barra de Navegación de Android & Optimización en Reposo: Supresión del auto-fullscreen invasivo para que los botones nativos del teléfono (Atrás, Inicio, Apps) nunca desaparezcan en teléfonos antiguos. Pausa instantánea de partículas en segundo plano sin alterar la calidad gráfica máxima de la app, manteniendo la versión oficial en v1.0.81 (SW `v181-surflayout`).
- Armonización de Subtítulos del Menú Modular: Corrección del subtítulo de 'Pronósticos' (actualizado a predicción extendida a 10 días) y de 'Estación en Vivo' (incluyendo mención al pronóstico horario 72h), garantizando coherencia absoluta tras la reubicación de tarjetas.
- Purga Integral de LaTeX en Suite Didáctica ("Explícame") e Historial: Supresión de caracteres rotos y fórmulas matemáticas con dólares o barras invertidas, asegurando lectura en texto natural, claro y amigable en toda la aplicación.
- Reordenación Estética de Sensores en Surf & Rompientes: Intercambio de posiciones entre 'Temperatura del Agua & Neopreno' (ahora 4ª) y 'Condición de Rompiente' (ahora 5ª) logrando armonía visual de sensores numéricos y situando el banner resumen al final.
- Actualización Constitucional del Artículo 0 (Honestidad Intelectual y Código de Respuesta de Princesa): Blindaje explícito de la personalidad de Princesa: cero complacencia por inercia, análisis crítico riguroso, corrección activa de premisas falsas, distinción entre hechos y opiniones, transparencia ante la incertidumbre y protección irrenunciable de la precisión frente al halago fácil.
- Incorporación del Artículo 8 a la Constitución Suprema (Candado de Seguridad y PIN Maestro de Acceso y Reforma Constitucional): Blindaje con PIN de 4 cifras (verificado mediante huella SHA-256) requerido obligatoriamente para consultar o modificar las leyes constitucionales en el chat.
- Calibración Solar Inteligente con Triple Sensor Físico (Radiación Directa >= 80 W/m², Índice UV >= 2.5, Radiación Global >= 120 W/m²) & Nowcasting Estricto a Corto Plazo:
  - Contexto y Diagnóstico en Vivo: Prueba de campo mediante webcam en tiempo real del Real Club Náutico de Salinas (15 Sep 2026, 15:02 h) con sol radiante y cielo azul claro. El modelo numérico de Open-Meteo entregaba WMO 3 (Cubierto) e interpoló artificialmente la radiación directa a la baja (7.3 - 11.5 W/m²) anticipando prematuramente un frente nocturno, provocando que la regla anterior basada únicamente en `direct_normal_irradiance >= 100` se desactivara y mostrara nublado por error.
  - Detección de Contradicción Física: Se comprobó que mientras la radiación directa caía a 11.5 W/m², el Índice UV se mantenía en un altísimo 5.55 y la radiación global de onda corta (`shortwave_radiation`) en 178.2 W/m², demostrando que la atmósfera estaba bañada de energía solar real.
  - Arquitectura del Triple Sensor Solar: En `weatherIcons.js`, `weatherApi.js`, `currentCard.js` y `app.js` se asimilaron `uv_index` y `shortwave_radiation` en el bloque instantáneo (`current`). La condición de reclasificación a `⛅ Parcialmente nublado / Claros` se dispara si de día no llueve (`precipitation < 0.1 mm` y `pop < 35%`) y se cumple CUALQUIERA de las tres vías físicas: `direct_normal_irradiance >= 80`, `uv_index >= 2.5` o `shortwave_radiation >= 120`.
  - Nowcasting Estricto en Pronóstico: En `forecastView.js` y `chartsView.js`, la calibración se aplica exclusivamente a la hora en curso (`i === currentHour`) y a la siguiente hora inmediata (`i === currentHour + 1`), blindando al 100% las horas posteriores (`currentHour + 2` en adelante) y el pronóstico extendido a 10 días para no enmascarar la entrada real de frentes nocturnos o cambios de tiempo venideros.
  - Corrección de Variable en Bucle Horario: Subsanado de inmediato el `ReferenceError: code is not defined` restaurando `const code = hourly.weather_code[i]` en `forecastView.js`.
  - Preservación de Versión Oficial y Novedades del Modal: Se mantiene la versión oficial `v1.0.81 🚀` en el pie de página y cabecera del historial por encontrarse en fase de revisión de Google Play / pruebas beta, actualizando la fecha al 15 Sep 2026 y encabezando el modal de historial con la explicación pedagógica del Triple Sensor y Nowcasting.
  - Anti-Caché Garantizado: Cadena de caché renovada a `v181-triplesolar3` en `sw.js` e `index.html`.
- Subidas continuas a GitHub (`zeustata/tiempo`).
- **Volumen de Precipitación Horario (mm) en Pronóstico 72 Horas**:
  - *Contexto y Necesidad*: Observado por Lendo que el pluviómetro solo mostraba el acumulado general del día en la estación de sensores, faltando ver el volumen esperado hora a hora bajo el porcentaje de probabilidad de lluvia.
  - *Implementación Técnica*: En `js/components/forecastView.js`, se integra bajo el contenedor de probabilidad (`.h-pop`) el nuevo indicador `.h-precip` que muestra el volumen físico en milímetros previsto para cada una de las 72 horas (`precipMm.toFixed(1) + ' mm'`). Si no llueve (`< 0.1 mm`), se muestra un discreto `0.0 mm` en tono atenuado; si llueve (`>= 0.1 mm`), se destaca en cian con fondo translúcido (`.precip-active`) y en bastinazu (`>= 2.0 mm`) con halo cian intenso (`.precip-heavy`).
  - *Ajuste Estético Compacto*: En `css/components.css`, se ajusta sutilmente el espaciado interior (`padding: 13px 10px`) y entre elementos (`gap: 7px`) de `.hourly-card`, manteniendo la altura uniforme y compacta de las tarjetas en móviles y escritorio.
  - *Preservación de Versión*: Por indicación expresa de Lendo debido a la fase de pruebas y revisión de tienda en curso, se preserva la versión pública en `v1.0.81 🚀` sin saltar a la 82, actualizando la cadena de caché anti-obsolescencia a `v181-hourlyprecip` en `sw.js`, `index.html` y módulos JS correspondientes.
- **Incorporación del Artículo 10 a la Constitución Suprema (Memoria Permanente y Actualización Obligatoria de Recuerdos - `RECUERDOS.md`)**:
  - Reforma constitucional universal aprobada por Lendo mediante verificación con PIN de seguridad de 4 cifras.
  - Obligatoriedad de registrar con máximo rigor y detalle técnico cada mejora, ajuste o versión en `RECUERDOS.md` e incluirlo en el commit y despliegue a GitHub (`zeustata/[nombre-proyecto]`). Ninguna tarea se da por cerrada sin haber guardado y subido su recuerdo.
- **Desacoplamiento Estricto entre Probabilidad Estadística (PoP) y Lluvia Física Real (Corrección de Sol y Claros)**:
  - *Diagnóstico y Causa Raíz*: Lendo detectó que en días soleados con cielo despejado o parcialmente nublado, la aplicación mostraba 'Lluvia moderada' con icono de gotas y partículas lluviosas. La inspección técnica demostró que la API entregaba en vivo `weather_code: 2` (Parcialmente nublado / Claros), `precipitation: 0.00 mm`, radiación solar directa altísima (`620.3 W/m²`) e índice UV de `4.25`, pero una probabilidad horaria estadística del `65%`. Una regla errónea en `weatherIcons.js` (`else if ((hasPop && prob >= 45) ... base = { label: 'Lluvia moderada' })`) sobreescribía la realidad física, convirtiendo arbitrariamente un riesgo estadístico a futuro en una lluvia inexistente en el presente y bloqueando por añadidura la calibración solar al fijar `isRain: true`.
  - *Solución Definitiva*:
    1. Eliminación total de `prob >= 45` en la determinación del tiempo presente. La probabilidad estadística (PoP) jamás puede transformar un tiempo seco en lluvia; su valor (ej. 65%) se mantiene exclusivamente donde corresponde como dato consultivo: en el Pluviómetro y en el indicador horario de 72h.
    2. Criterio de lluvia estricto: solo se clasifica lluvia si el pluviómetro mide precipitación física real (`p >= 0.1 mm/h`) o existe código WMO de lluvia confirmado.
    3. Blindaje Solar Total: se elimina la restricción artificial `prob < 35` de la calibración solar. Si de día no cae agua física (`p < 0.1 mm`) y cualquiera de los 3 sensores físicos confirma sol activo (radiación directa `>= 80 W/m²`, UV `>= 2.5` o radiación global `>= 120 W/m²`), el sistema reclasifica obligatoriamente a cielo soleado o claros (`⛅ Parcialmente nublado / Claros`) y activa partículas doradas solares (`sun-motes`), garantizando que la app jamás diga lo contrario de lo que se ve en el cielo.
  - *Cadena Anti-Caché*: Actualizada a `v181-reallight` en `sw.js`, `index.html` y módulos JS.
  - *Preservación de Versión*: Mantenida la versión pública en `v1.0.81 🚀` por revisión de Google Play Console.
  - *Validación*: Probado unitariamente en Node.js y levantado servidor local en puerto 8080 para comprobación visual directa por Lendo.
- **Armonización Hidrometeorológica Coherente (QPF-PoP - Corrección de Paradoja de Lluvia en Pronóstico Horario)**:
  - *Contexto y Observación de Lendo*: Al consultar el pronóstico horario de 72 horas para Castrillón a las 17:00 h, se visualizaba una paradoja meteorológica evidente: un `0%` de probabilidad de lluvia junto a un volumen previsto de `0.7 mm` y código WMO de precipitación.
  - *Diagnóstico Científico*: Open-Meteo entrega dos fuentes de cómputo distintas. La probabilidad (PoP) procede del modelo por conjuntos (*ensemble* de 30-50 miembros a escala global de 15-25 km de cuadrícula), donde ligeras desviaciones espaciales sitúan los chubascos fuera de la celda puntual dando 0% estadístico. En cambio, el volumen cuantitativo (QPF, 0.7 mm) procede de la simulación determinista de alta resolución (1-2 km), que modela con precisión la orografía costera asturiana y detecta la condensación real (código WMO 55: llovizna densa / *orvayu*).
  - *Solución Meteorológica Inspirada en AccuWeather y Pelmorex/eltiempo.es*:
    - Implementación de la función `harmonizeWeatherPrecipitation` en `js/services/weatherApi.js`.
    - Escala de coherencia física progresiva:
      * `precip >= 2.0 mm`: suelo mínimo de probabilidad del 85%.
      * `precip >= 1.0 mm`: suelo mínimo de probabilidad del 75%.
      * `precip >= 0.5 mm` (chubasco u orvayu notable): suelo mínimo de probabilidad del 65%.
      * `precip >= 0.2 mm` (llovizna constante): suelo mínimo de probabilidad del 45%.
      * `precip >= 0.1 mm` o código WMO de precipitación activa (51-67, 71-77, 80-86, 95-99): suelo mínimo del 30%.
      * `precip == 0.0 mm`: se respeta al 100% el valor original devuelto por el ensemble.
    - Se recalcula `hourly.precipitation_probability` con `Math.max(rawPop, minPop)` y se sincroniza automáticamente `daily.precipitation_probability_max`.
    - Se beneficia todo el ecosistema de visualización de forma unificada: Pronóstico 72h (`forecastView.js`), Gráficos 48h (`chartsView.js`), Tarjeta en Vivo y Pluviómetro (`currentCard.js`), Comparador y Avisos.
  - *Versionado & Anti-Caché*: Incremento a `v1.0.82 🚀` en badge del footer, modal de novedades y `CHANGELOG.md`. Cadena de caché renovada a `meteoasturlode-v182-harmony` en `sw.js` e `index.html`.
- **Diccionario Didáctico de Fenómenos Meteorológicos (Vaguada, Borrasca, DANA, Galerna y Dinámica Cantábrica - v1.0.83)**:
  - *Génesis de la Necesidad (Propuesta de Lendo)*: Lendo observó en las noticias y partes del tiempo cómo se mencionaba reiteradamente el término "vaguada", constatando la confusión generalizada en la sociedad entre vaguada, borrasca, DANA y otros conceptos meteorológicos clave. Propuso integrar en la app un menú/glosario específico para explicar y diferenciar de forma nítida estos fenómenos.
  - *Arquitectura del Módulo (`js/utils/weatherPhenomena.js`)*:
    - Creación de un catálogo didáctico con 10 fenómenos fundamentales clasificados en 3 categorías temáticas (*Grandes Sistemas*, *Asturias & Cantábrico*, *Frentes & Nubes*):
      1. **Vaguada**: Ondulación en 'V' en niveles medios/altos (~5.500 m / 500 hPa). No es una borrasca en superficie, sino una chimenea de inestabilidad que fuerza el ascenso y disparo convectivo.
      2. **Borrasca**: Centro cerrado de bajas presiones (< 1013 hPa) con giro ciclónico antihorario y frentes asociados.
      3. **DANA (Gota Fría)**: Depresión Aislada en Niveles Altos originada por el estrangulamiento de una vaguada por el *jet stream*, quedando como bolsa fría errática.
      4. **Ciclogénesis Explosiva**: Borrasca con caída barométrica vertiginosa (>= 18-24 hPa en 24 horas) apodada "bomba meteorológica".
      5. **Galerna Cantábrica**: Fenómeno brusco y letal del litoral cantábrico con giro súbito a viento del NO de 80-100+ km/h y caída térmica de 10 °C en minutos.
      6. **Frentes Atmosféricos**: Choque entre masas de aire; explicación detallada de frente frío (azul/triángulos), frente cálido (rojo/semicírculos) y frente ocluido (morado).
      7. **Anticiclón y Dorsal**: Región de altas presiones con subsidencia (aire descendente que disipa nubosidad y asegura estabilidad).
      8. **Viento Sur (Efecto Foehn)**: Ábrego recalentado y seco que baja por la vertiente norte de la Cordillera Cantábrica a razón de 1 °C por cada 100 m, disparando el termómetro y el riesgo de incendios.
      9. **Niebla Marina ("Borrina")**: Advección costera sobre aguas frías que invade arenales cantábricos en verano bajando bruscamente la temperatura.
      10. **Inversión Térmica & Mar de Nubes**: Inversión vertical donde los fondos de valle amanecen gélidos bajo niebla cerrada mientras los puertos de montaña registran sol radiante y temperaturas templadas.
    - Cada ficha contiene 4 campos obligatorios: *💡 ¿Qué es exactamente?*, *⚙️ ¿Cómo se forma?*, *🏔️ ¿Qué tiempo deja en Asturias?* y *🔍 Astucia y Curiosidad*.
  - *Diseño UI & Experiencia de Usuario*:
    - Modal Liquid Glass `#phenomena-modal` con diseño limpio directo sin sobrecarga (omisión de buscador y pastillas de filtro por decisión de diseño de Lendo), maximizando el espacio vertical para una lectura clara de las tarjetas.
    - Acordeón interactivo fluido: clic en la cabecera despliega/contrae la tarjeta con microanimaciones, abriendo por defecto la *Vaguada* al iniciarse.
  - *Integración y Puntos de Entrada*:
    - Acceso prioritario en el modal de Menú principal (`#nav-modal`) mediante botón de acceso rápido `📖 Diccionario de Fenómenos`.
    - Botón `📖 Fenómenos` en la barra de herramientas del *Radar Cantábrico* (`#panel-radar`).
    - Enlace cruzado interactivo dentro de la explicación del barómetro (`weatherExplanations.js`) para resolver la duda en un clic.
  - *Preservación Estricta de Versión Pública (v1.0.81 🚀) & Anti-Caché*:
    - Por indicación directa y expresa de Lendo por encontrarse la aplicación en fase de pruebas activas y revisión de tienda (Google Play Store), se preserva de forma estricta la versión pública oficial en `v1.0.81 🚀` en el badge del pie (`#app-version-badge`), en el modal de novedades y en `CHANGELOG.md` sin saltar de versión.
    - Se garantiza el refresco anti-obsolescencia mediante la cadena de caché `v181-clean` en `sw.js` (`meteoasturlode-v181-clean`), `index.html` y módulos ES.
    - Corrección arquitectónica del modal de fenómenos: ajuste de `.modal-phenomena-card` con `padding: 0 !important`, `.phenomena-modal-body` con `flex: 1 1 auto; min-height: 0; overflow-y: auto;` y `.phenomena-card` con `flex-shrink: 0; min-height: 56px;` para eliminar el colapso vertical en navegadores de escritorio y móvil.
- **Calibración Solar Inteligente con Blindaje Anti-Nublado 100% (Corrección de Falsos Claros al Mediodía - 18 Sep 2026)**:
  - *Contexto & Diagnóstico en Directo*: Lendo constató desde Piedras Blancas (Castrillón) que, tras llevar nublado varias horas con cielo estratiforme blanquecino y sin rastro del sol ("la verdad es que está bastante claro el cielo pero sin rastro del sol"), la app mostraba sol y nubes (icono de sol tras nube grande `⛅`, Parcialmente nublado / Claros).
  - *Investigación de Modelos & Datos Físicos*:
    - Todos los modelos numéricos de Open-Meteo (AROME, ICON, GFS y ECMWF) coincidían de forma unánime en WMO 3 (Cubierto) y cobertura nubosa del 100% (`cloud_cover: 100`).
    - Sin embargo, el filtro de Calibración Solar Inteligente (creado el 15 de septiembre) se disparaba porque los cálculos del modelo daban `direct_normal_irradiance: 473.5 W/m²`, `uv_index: 2.80` y `shortwave_radiation: 504.6 W/m²`, superando los umbrales permisivos previos (`uv >= 2.5` o `sw >= 120`).
    - Se comprobó que al mediodía cantábrico en verano/septiembre, una capa de nubes blancas finas genera suficiente radiación difusa para dar UV de 2.5-3.0 sin que exista sol directo en superficie.
  - *Blindaje Físico y Solución Algorítmica*:
    - En `js/utils/weatherIcons.js`, `getWeatherInfo` asimila el parámetro `cloudCover`.
    - Blindaje de Cobertura 100%: si el modelo marca un cielo sellado al 100% de nubes (`cloud_cover >= 100`), la radiación difusa queda bloqueada y solo se permite reclasificar a claros si el Índice UV es demoledor (`uv >= 4.5`), demostrando sol real que quema en superficie (como el 5.85 UV registrado el 15 Sep en Salinas).
    - Para coberturas casi totales (90-99%): se exige radiación directa potente (`irr >= 150 W/m²`) o UV alto (`uv >= 4.0`).
    - Para coberturas inferiores a 90%: se eleva el umbral diurno a `uv >= 4.0` o `sw >= 550 W/m²`.
    - Sincronización completa en componentes: `currentCard.js` pasa `current.cloud_cover`, `forecastView.js` y `chartsView.js` pasan `hourly.cloud_cover[i]`, y `app.js` en `applyDynamicWeatherTheme`.
- **Calibración Fiel de Rompiente & Detector de Mar Pasado en Arenales Abiertos (Feedback Edu - Salinas 20 Sep 2026)**:
  - *Contexto & Detección de Edu*: En Salinas (Castrillón), con condiciones marítimas reales de 2,1 metros de altura de ola, 10 segundos de período y 486 kJ de energía combinada, la aplicación mostraba la etiqueta '🟡 Óptima (Divertida / Shortboard)'. Edu alertó a Lendo con fotografía del rompiente mostrando cómo la playa estaba completamente pasada de olas, con barras cerronas masivas y fuertes corrientes de resaca, resultando engañoso calificarla como 'divertida/óptima'.
  - *Diagnóstico Físico*: La escala anterior agrupaba de 200 a 500 kJ como 'Óptima (Divertida)', por lo que 486 kJ (producidos por 2,1 m y 10 s) quedaba encasillada como accesible. En arenales abiertos cantábricos (beach breaks como Salinas o San Lorenzo), cuando el mar sobrepasa los 1,8-2,0 metros, las barras de arena se saturan, cerrando en bloque de extremo a extremo e imposibilitando el surfing recreativo noble.
  - *Solución Algorítmica y Reajuste Escalonado (`js/components/surfCard.js`)*:
    1. Reajuste de los escalones de energía (kJ) a 5 niveles fisiológicos y oceanográficos reales:
       - `< 180 kJ`: 🟢 Suave (Iniciación / Longboard / Poca fuerza).
       - `180 a 349 kJ`: 🟡 Divertida (Shortboard & Evolutiva / Zona dulce de olas nobles de 1,0 m a 1,5 m).
       - `350 a 649 kJ`: 🟠 Sólida (Exigente / Buen tamaño / 1,6 m a 2,2 m / Remada y experiencia; reclasifica los 486 kJ de Salinas).
       - `650 a 1099 kJ`: 🟣 Muy Potente (Tubos / Nivel alto / Velocidad y fondos huecos).
       - `>= 1100 kJ`: 🔴 Pesada (Extrema / Solo expertos / Rompientes mayores y corrientes intensas).
    2. Detector Inteligente de Saturación en Arenales Abiertos (`evaluateSurfQuality`):
       - Condición: `h >= 1.9 m` o `(energyKj >= 400 && h >= 1.8 m)`.
       - Reclasificación automática de la rompiente a: `⚠️ Mar Pasado en Arenales / Barras Cerronas` (Badge: `Mar Pasado / Fuerte`), informando al surfista de series cerronas y resacas, recomendando esquinas abrigadas (El Espartal, Luanco).
       - Aviso contextual visual integrado en la tarjeta de energía (`surf-energy-widget`).
  - *Suite Didáctica Sincronizada (`js/utils/weatherExplanations.js`)*:
    - Actualización de los 5 niveles en la explicación de kiloJulios (`surf_energy`) y adición de la pauta de saturación en arenales dentro de 'Astucia en los Picos de Asturias'.
  - *Preservación de Versión Pública (v1.0.81 🚀) & Anti-Caché*:
    - Mantenida la versión pública en `v1.0.81 🚀` en el badge del footer y en el modal de novedades para no interferir en la revisión de Google Play Store.
    - Cadena de caché renovada a `meteoasturlode-v181-edusurf` en `sw.js`, `index.html` y query strings de submódulos JavaScript.
- **⚔️ El Gran Desafío de Precisión: MeteoAstur Lode vs. 'eltiempo.es' (El Duelo Maldonado - 23 Sep 2026)**:
  - *La Misión de Lendo & Princesa*: Convertir a MeteoAstur Lode en la aplicación con mayor tasa de acierto y fidelidad meteorológica de Asturias, superando abiertamente a los gigantes comerciales generalistas (eltiempo.es / Pelmorex).
  - *Diagnóstico del Talón de Aquiles Generalista*:
    - Las grandes apps aplican un modelo global (ECMWF/GFS) a 9-14 km con cortes matemáticos de medianoche (00:00 a 23:59 h). Cuando un frente atlántico llega al atardecer/noche, o bien lo diluyen, o asignan los litros al día siguiente, fallándole a la gente en sus planes de tarde.
  - *La Doctrina de Victoria de MeteoAstur*:
    - **Medio plazo (72-96h)**: Diagnóstico de tendencia con Auto Multi-Modelo y ECMWF, identificando la borrasca sin casarse prematuramente con minutos falsos.
    - **Corto plazo (<48h)**: Entrada demoledora de **AROME (1.3 km)**, resolviendo al milímetro la interacción orográfica de los montes asturianos, el Cabo Peñas y las rías cantábricas.
    - **Blindajes Propios**: Armonización QPF-PoP (cero paradojas de lluvia con 0%), calibración solar anti-falsos nublados y alertas de mar pasado en arenales.
  - *Estrategia de Despliegue*: Esperar a la publicación y subida definitiva en Google Play Store para arrancar con toda la fuerza, validar en vivo frente a Maldonado y demostrar la superioridad en cada rincón del Principado.
- **Calibración Fiel de Rompiente, Supresión del Sesgo Permisivo & Detector de Mar Pasado en Arenales (Feedback Edu / Surf-Forecast - 24 Sep 2026)**:
  - *Contexto & Detección de Edu*: Edu trasladó a Lendo que la aplicación seguía mostrándose excesivamente permisiva en Salinas. Aportó enlace a Surf-Forecast donde se contrastó que en condiciones de 1,2 m a 1,3 m con 12 s de período, Surf-Forecast otorgaba un rating modesto de 1 a 3 estrellas sobre 10, mientras que la app las catalogaba de forma inflada como '🔥 Sesión Épica / Olas Excelentes'. Además, ante la entrada de swells largos de 17-19 s con 1,5 m (más de 1.500 kJ de energía), la app no activaba la alerta de mar pasado porque el umbral de altura previo estaba en 1,8-1,9 m.
  - *Solución Algorítmica en Local (`js/components/surfCard.js`)*:
    1. **Ajuste del Detector de Saturación en Arenales (`isBeachBreakOverload` & `evaluateSurfQuality`)**:
       - Salto inmediato a `⚠️ Mar Pasado en Arenales / Barras Cerronas` (Badge: `Mar Pasado / Fuerte`) si la altura es `>= 1.7 m`, o bien `>= 1.5 m` con energía `>= 350 kJ` o período largo `>= 13 s`.
    2. **Blindaje Estricto de la Sesión Épica**:
       - La etiqueta `🔥 Sesión Épica / Calidad Top` se reserva únicamente para condiciones verdaderamente excepcionales de revista: altura dulce `1.0 m a 1.5 m`, período largo `>= 12 s`, viento **estrictamente terral (`offshore`)** y energía dulce `160 a 349 kJ`.
    3. **Sinceridad y Fidelidad con Viento Onshore y Días Normales**:
       - Viento de mar (`onshore` / `cross-on`) reclasifica a `🌊 Olas con Viento de Mar (Chop / Desordenado)`.
       - Días buenos normales (como 1,2 m con 12 s) se clasifican como `🏄‍♂️ Buenas Condiciones / Olas Limpias` o `Baño Entretenido` (equivalente a 3-5 estrellas), eliminando cualquier permisividad.
  - *Despliegue Sigiloso & Blindaje Anti-Caché*:
    - Tras verificación rigurosa en localhost (`http://localhost:8080`), Lendo autorizó el despliegue silencioso a producción.
    - Se mantuvo intacto el badge visual en `v1.0.81 🚀` en el pie de página para preservar la coherencia al 100% con la revisión de Google Play Store.
    - Se renovó la cadena de caché a `meteoasturlode-v181-salinascalib` en `sw.js`, `index.html` y `app.js`, desplegándose con éxito en `zeustata/tiempo` (commit `edb99bd`).
- **👑 La Doctrina de Excelencia de Princesa & Hoja de Ruta Integral de Mejoras (Fase Post-Google Play - 24 Sep 2026)**:
  - *La Misión Sagrada de Lendo & Princesa*:
    - El objetivo primordial de Lendo es que Princesa y MeteoAstur Lode sean mejores que nadie en el mundo, aprendiendo sin descanso de los grandes referentes globales (Surf-Forecast, AEMET, IHM) y del conocimiento real sobre el terreno (Edu en el mar, conductores en la cordillera, policías y vecinos en la calle).
    - Cero conformismo: la excelencia se forja admitiendo siempre que hay margen de mejora y no deteniéndose jamás.
  - *Bloque 1: Revolución de Cordillera, Puertos & Nieve (`mountainCard.js`)*:
    1. **Ampliación Integral de la Red de Puertos de Asturias**:
       - Incorporar puertos estratégicos que faltan: *El Palo* y *La Marta* (Allande), *El Connio* y *El Acebo* (Cangas / Ibias / Grandas), *San Lorenzo* (Somiedo / Teverga), *Alto del Angliru* (Riosa), *La Colladona* y *El Pontón / Desfiladero de los Beyos* (Ponga / Amieva hacia Picos de Europa).
       - Monitorización prioritaria de las arterias principales hacia la meseta: la **Autopista del Huerna (AP-66)** y el **Puerto de Pajares (N-630)**.
    2. **Evolución Horaria de la Cota de Nieve (48 Horas)**:
       - Sustituir el número estático actual por una gráfica/curva continua que permita ver la hora exacta del desplome polar (ej. cota a 1.800 m al mediodía bajando bruscamente a 800 m al anochecer).
    3. **Sensación Térmica Real en Cumbres (Wind Chill)**:
       - Cálculo físico del impacto del viento en alta montaña: a 1.800 m, 0°C con viento de 50 km/h equivale a -8°C de sensación para montañeros y esquiadores.
    4. **Ficha y Espesores de Estaciones Invernales**:
       - Para *Valgrande-Pajares* y *Fuentes de Invierno*: espesores previstos de nieve en 3 días, calidad de nieve (polvo, dura, primavera) y visibilidad en pistas.
    5. **Boletín de Peligro de Aludes**:
       - Integración de la Escala Europea de Peligro de Aludes (1 Débil a 5 Muy Fuerte) para Picos de Europa y Macizo de Ubiña.
  - *Bloque 2: La Suite Definitiva de Surf & Rompientes (Inspiración Surf-Forecast)*:
    1. **Sistema de Notación Estricto (0 a 10 Estrellas)**:
       - Incorporar la calificación por estrellas en cada tramo horario: 🟡 *Estrella Dorada* (olas limpias y viento terral), ⚪ *Estrella Blanca* (viento terral modesto o rompiente irregular) y ⚫ *Calificación Cero* (mar roto por viento de mar o desfasado).
    2. **Textura del Agua (*Wind State*)**:
       - Clasificación explícita de superficie: *Glassy* (calma cristalina), *Terral* (offshore puro), *Chop* (picado) y *Mar Revuelto*.
    3. **Fichas Oceanográficas Playa a Playa**:
       - Ficha técnica para cada arenal de Asturias indicando su dirección óptima de swell (ej. Salinas: NW) y viento ideal (ej. Salinas: SE/S; Rodiles: SW; San Lorenzo: S).
  - *Bloque 3: Experiencia de Usuario & Pantalla de Novedades*:
    - Creación de un modal de bienvenida tras actualización (*"¿Qué hay de nuevo?"*) controlado por `localStorage` para mostrarse una única vez por versión sin molestar en el uso diario.
  - *Estrategia de Ejecución*:
    - Mantener la calma y disciplina técnica hasta recibir la aprobación oficial de Google Play Store. En cuanto la v1.0.0 esté activa, se arrancará el desarrollo escalonado de esta hoja de ruta en sucesivos ciclos oficiales.
- **🏄‍♂️ Hito Técnico Cumplido: Suite de Surf, Estrellas (0 a 10★), Textura Marina, Flechas Visuales Dinámicas y Modal Didáctico (25 Sep 2026)**:
  - *Contexto & Solicitud de Lendo*: Integración completa de la suite de surf inspirada en el estándar de Surf-Forecast para Salinas (`https://es.surf-forecast.com/breaks/Salinas/forecasts/latest`). Incorporación de priorización visual de flechas de dirección solicitada por Lendo ("la gente se fija mucho en flechas tanto en el viento como en las olas").
  - *Arquitectura Implementada en Local*:
    1. **Sistema de Calificación por Estrellas (0 a 10★)** (`getSurfStarRating` en `surfCard.js`):
       - ⭐ *Estrellas Doradas (1 a 10★)*: Viento terral estricto (`offshore`) + swell ordenado y energía noble (160 - 349 kJ).
       - ⚪ *Estrellas Blancas (1 a 5★)*: Baño noble y aprovechable con olas justas (< 0,9 m) o condiciones *glassy*.
       - 🚫 *0★ (Cerrón / Chop)*: Viento onshore (mar picado) o mar pasado en arenales abiertos.
    2. **Indicador de Textura de la Superficie Marina (Wind State)** (`getWaterTexture` en `surfCard.js`):
       - *Glassy (Espejo)*, *Limpio (Terral)*, *Semi-Limpio (Cruzado Terral)*, *Picado (Cruzado Onshore)*, *Chop (Onshore)* y *Brisa Ligera*.
    3. **Flechas Vectoriales Dinámicas de Dirección en SVG**:
       - `getSurfWindArrowSvg(deg, color, size)`: Rotación matemática continua `(windDeg + 180) % 360` (apunta hacia donde sopla el aire) con colores adaptativos (verde terral, cian glassy, naranja onshore).
       - `getSurfSwellArrowSvg(deg, color, size)`: Rotación continua `(swellDeg + 180) % 360` en tono turquesa indicando trayectoria de entrada del tren de olas.
       - Presentes en Widget 2 (sensores principales), Cronograma 3 Horas (Hoy y Mañana) y Previsión 7 Días (Mañana y Tarde).
    4. **Fichas Técnicas de Arenales en Asturias (`marineCard.js`)**:
       - Integración de `bestSwell`, `bestWind` y `hazards` para Salinas, San Lorenzo, Peñarrubia, Rodiles, Xagó, Verdicio, Santa Marina, Vega, Tapia, San Antolín y Andrín.
    5. **Modal Didáctico "Explícame" (`surf_stars` en `weatherExplanations.js`)**:
       - Explicación pedagógica de estrellas doradas y blancas, viento terral cantábrico, textura marina y alternativas de abrigo (El Espartal, Luanco, Candás).
    6. **Anti-Caché Obligatorio (Regla 4)**:
       - Actualización en cascada de `sw.js` (`meteoasturlode-v182-surfarrows`), `index.html` (`v=1.0.82-surfarrows`) y `app.js` (`v=1.0.82-surfarrows`).
- **⛷️ Hito Técnico Cumplido: Revolución de Cordillera, Visor Dual Snow-Forecast (Feedback Cefe) y Red Integral de Puertos (25 Sep 2026)**:
  - *Contexto & Feedback de Cefe*: Cefe (amigo esquiador de Lendo) compartió el referente mundial `https://www.snow-forecast.com/`. Lendo aprobó implementar la Opción 1 ("Visor Dual con Desglose en 3 Altitudes y Red Integral de Puertos y Arterias").
  - *Arquitectura Implementada en Local (`js/components/mountainCard.js`, `css/components.css`, `js/app.js`)*:
    1. **Interruptor Deslizante Segmentado Liquid Glass**:
       - Selector fluido `.mountain-sliding-segmented-switch` para conmutar entre `[ ⛷️ Estaciones & Esquí ]` y `[ 🚗 Puertos & Carreteras ]` con pastilla deslizante animada.
    2. **Módulo de Estaciones & Esquí (Estándar Snow-Forecast)**:
       - Pastillas interactivas para *Valgrande-Pajares*, *Fuentes de Invierno*, *San Isidro* y *Leitariegos*.
       - **Semáforo de Operatividad de Remontes por Viento en Cumbre** (🟢 Operativos < 35 km/h, 🟡 Precaución 35-50 km/h, 🔴 Riesgo Cierre ≥ 50 km/h).
       - **Desglose en 3 Altitudes (Cumbre / Media Estación / Base)**:
         - Temperatura calculada según gradiente vertical (`0.0065 °C/m`).
         - Sensación térmica por viento en cumbres (**Wind Chill** con fórmula oficial JAG/NOAA).
         - Estado de precipitación (Nieve, Aguanieve, Lluvia fría, Despejado).
         - Velocidad y vector dinámico de viento con flecha aerodinámica SVG (`(windDeg + 180) % 360`) y aceleración en cumbres (factor 1.55x).
         - Calidad de nieve estimada (*Polvo de Alta Cota*, *Pisada / Húmeda*, *Primavera*, *Dura / Hielo*, *Ventisca / Whiteout*).
       - Previsión de nieve acumulada a 3 días (Hoy, Mañana, Pasado Mañana y Total 3 Días) y enlace directo a webcams oficiales.
    3. **Módulo de Puertos & Carreteras**:
       - Arterias principales a la Meseta: **Autopista del Huerna (AP-66)** y **Puerto de Pajares (N-630)**.
       - Red ampliada de 16 puertos de montaña asturianos con monitorización de viabilidad invernal (*Abierto*, *Precaución*, *Cadenas Obligatorias*, *Cerrado*).
    4. **Sensores de Cabecera & Aludes**:
       - Cota de nieve / Isoterma 0°C, acumulación a 3 días y Escala Europea de Riesgo de Aludes (EAWS 1 a 5).
    5. **Módulo Didáctico "Explícame" (`ski_mountain` en `weatherExplanations.js`)**:
       - Guía técnica interactiva con botón `[ 💡 Explícame ]` en la tarjeta de cordillera.
    6. **Anti-Caché & Service Worker `v183-snowforecast`**:
       - Actualización en `sw.js`, `index.html` y llamadas de versión.
- **📱 Hito Técnico Cumplido: Optimización Móvil y Ergonómica de Cordillera (Feedback Visual Lendo - 25 Sep 2026)**:
  - *Contexto & Detección de Lendo*: Tras el despliegue de la versión 1.0.83, Lendo compartió captura real de su teléfono señalando que la distribución quedaba desordenada ("queda mal ordenado"): los 3 sensores superiores se apilaban verticalmente desaprovechando espacio, el texto de Aludes saltaba de línea, el botón derecho del interruptor se cortaba (`🚗 Puertos & (`), y las estaciones de esquí tenían cajones verticales gigantescos con textos decorativos largos.
  - *Solución Algorítmica y Visual en Local (`js/components/mountainCard.js`, `css/components.css`)*:
    1. **Barra Unificada de Sensores de Alta Montaña**:
       - Agrupación en 1 sola cápsula de cristal con 3 columnas simétricas: *Cota 0°C*, *Nieve 3 Días* y *Aludes EAWS* (con icono didáctico compacto `💡`), ahorrando el 65% de altura en móvil.
    2. **Interruptor Deslizante Anti-Desborde**:
       - Textos calibrados a `[ ⛷️ Esquí y Pistas ]` y `[ 🚗 Puertos y Huerna ]` con `min-width: 0` y ajuste elástico total.
    3. **Matriz Comparativa de 3 Cotas (Estilo Snow-Forecast Puro)**:
       - 3 filas horizontales limpias (*Cumbre*, *Media Estación*, *Base*) mostrando altitud, temperatura, Wind Chill, flecha vectorial de viento y calidad de nieve (*Polvo*, *Primavera*, *Dura*), suprimiendo la parrafada descriptiva del dominio esquiable.
    4. **Selector Compacto de Estaciones**:
       - Pastillas simétricas: `[ Pajares ]`, `[ Fuentes ]`, `[ San Isidro ]`, `[ Leitariegos ]`.
    5. **Cuadrícula de Nieve Fresca a 4 Columnas**:
       - Presentación horizontal simétrica para Hoy, Mañana, Pasado y Total 3 Días.
    6. **Anti-Caché & Despliegue `v1.0.84-snowmobile`**:
       - Sincronización en `sw.js`, `index.html`, `components.css` y `app.js`.
- **📱 Hito Técnico Cumplido: Erradicación de Cortes y Superposiciones en Móvil (Feedback Lendo "fuera de plano" - 25 Sep 2026)**:
  - *Contexto & Detección de Lendo*: Lendo envió nueva captura real mostrando que en 360 px los textos salían truncados con elipsis (`Cu...`, `Me...`, `Niev...`, `Puertos y Hu...`, `San Isidro (Pueb...`) y los 3 sensores colisionaban entre sí con el nivel de aludes pisando los centímetros de nieve.
  - *Solución Definitiva en Local (`js/components/mountainCard.js`, `css/components.css`)*:
    1. **Panel Superior en 2 Pisos Anti-Colisión**:
       - *Piso 1 (50% / 50%)*: Cota de Nieve y Nieve 3 Días con divisor vertical, con holgura para números grandes.
       - *Piso 2 (Ancho completo)*: Peligro de Aludes EAWS desplegado a todo lo ancho con nivel legible y botón `💡 Explícame`.
    2. **Interruptor de 1 Palabra Limpia**:
       - Conmutador directo: `[ ⛷️ Esquí ]` y `[ 🚗 Puertos ]`, eliminando cualquier corte o punto suspensivo.
    3. **Selector de Estaciones en Cuadrícula 2x2 Táctil**:
       - Pastillas simétricas: `[ ⛷️ Pajares ]`, `[ ⛷️ Fuentes ]`, `[ ⛷️ San Isidro ]` y `[ ⛷️ Leitariegos ]`.
    4. **Cotas en Tiras de 2 Líneas 100% Legibles**:
       - Sustitución de la tabla de 4 columnas estrechas por tiras horizontales donde caben todos los textos completos: Cota, pico, temperatura, sensación térmica Wind Chill, viento vectorial y calidad de nieve sin truncamientos.
    5. **Anti-Caché & Despliegue Dual `v1.0.85-snowclean`**:
       - Sincronización en `sw.js`, `index.html`, `components.css` y `app.js`.
- **❄️ Hito Técnico Cumplido: Cuadrícula 2x2 para Nieve Prevista sin Desborde (Feedback Lendo - 25 Sep 2026)**:
  - *Contexto & Detección de Lendo*: Lendo envió captura confirmando la excelente legibilidad de las 3 cotas, pero detectando que en la pastilla de *Total 3 Días* el borde sobresalía por la derecha atravesando el marco de la tarjeta, debido a la compresión de 4 columnas en pantallas estrechas.
  - *Solución Definitiva en Local (`js/components/mountainCard.js`, `css/components.css`)*:
    1. **Cuadrícula 2x2 para Espesores de Nieve (`.snowfall-pills-grid`)**:
       - Fila 1: `📅 Hoy` y `📅 Mañana` (50% de ancho cada una).
       - Fila 2: `📅 Pasado` y `❄️ Total 3 Días` (50% de ancho cada una).
       - Cada pastilla muestra la etiqueta a la izquierda y el valor (`0.0 cm`) a la derecha en una sola línea horizontal sin cortes ni desbordes.
    2. **Anti-Caché & Despliegue Dual `v1.0.86-snowgrid`**:
       - Sincronización en `sw.js`, `index.html`, `components.css` y `app.js`.
- **❄️ Hito Técnico Cumplido: Disposición Vertical Anti-Desborde en Nieve Prevista (Feedback Lendo - 25 Sep 2026)**:
  - *Contexto & Detección de Lendo*: Tras el paso a 2x2, la disposición horizontal de título largo (`Total 3 Días`) + valor (`0.0 cm`) en una misma línea seguía excediendo el ancho de la columna en móviles estrechos, desbordando la pastilla por el margen derecho.
  - *Solución Definitiva en Local (`css/components.css`)*:
    1. **Apilado Vertical Interno (`.snow-day-pill`)**:
       - Reorganización con `flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 8px 6px; text-align: center;`.
       - Etiqueta arriba (`.snow-day-label` a 0.72rem) y valor numérico monoespaciado abajo (`.snow-day-val` a 1.05rem).
       - Reducción del ancho horizontal requerido de ~140px a ~75px, garantizando más de 50px de holgura por celda en pantallas móviles.
    2. **Blindaje de Desborde**:
       - Inclusión de `box-sizing: border-box`, `max-width: 100%` y `overflow: hidden` en `.resort-forecast-card` y `.ski-resort-snowfall-row`.
    3. **Anti-Caché & Despliegue Dual `v1.0.87-snowvert`**:
       - Sincronización en `sw.js`, `index.html`, `components.css` y `app.js`.
- **🌅 Hito Técnico Cumplido: Simetría Tipográfica y Cromatismo Solar (Feedback Tester / Lendo - 25 Sep 2026)**:
  - *Contexto & Detección*: Feedback de beta tester trasladado por Lendo: en la tarjeta de pronóstico extendido a 10 días, la salida del sol se veía muy bien pero el ocaso se leía mal, apagado y diminuto.
  - *Diagnóstico*: La salida del sol usaba `.u-m-val` (blanco brillante y tamaño grande) mientras que el ocaso estaba en `.u-m-sub` (subtítulo secundario a 0.68rem en gris apagado).
  - *Solución Definitiva en Local (`js/components/forecastView.js`, `css/components.css`)*:
    1. **Contenedor Vertical Simétrico (`.u-sun-times-column`)**:
       - Ambas horas igualadas con exactitud milimétrica a `font-size: 0.78rem`, negrita `800` y tipografía monoespaciada `JetBrains Mono`.
       - **Salida del Sol (Orto)**: Icono `🌅` y hora en **Dorado Solar / Ámbar Amanecer** (`#fbbf24`).
       - **Puesta del Sol (Ocaso)**: Icono `🌇` y hora en **Naranja Crepuscular / Atardecer Cálido** (`#f97316`).
    2. **Anti-Caché & Despliegue Dual `v1.0.88-sunhours`**:
       - Sincronización en `sw.js`, `index.html`, `components.css`, `forecastView.js` y `app.js`.
- **📑 Hito Técnico Cumplido: Rediseño Minimalista de Herramientas en Menú (Feedback Lendo - 25 Sep 2026)**:
  - *Contexto & Detección de Lendo*: Lendo señaló que al abrir el Menú de módulos, los botones didácticos de Diccionario de Fenómenos y Estilos de Iconos ocupaban demasiado espacio vertical en la parte superior, empujando la cuadrícula de módulos hacia abajo. Solicitó que fueran "dos iconos sin más".
  - *Solución Definitiva en Local (`index.html`, `css/main.css`)*:
    1. **Integración en la Cabecera del Modal (`.modal-header-actions`)**:
       - Supresión completa de la barra `.nav-menu-quick-tools` con sus bloques y subtítulos.
       - Reubicación de ambos accesos como botones de icono de cristal discretos (`[ 📖 ]` y `[ 🎨 ]`) en la cabecera superior del menú junto al botón de cerrar `[ ✕ ]`.
       - Dimensiones táctiles simétricas (`42px x 42px`) con escala adaptativa (`36px x 36px` en `<= 400px`), dejando el menú 100% despejado y visible sin scroll.
    2. **Anti-Caché & Despliegue Dual `v1.0.89-menuicons`**:
       - Sincronización en `sw.js`, `index.html` y `css/main.css`.
- **🏛️ Hito Técnico Cumplido: Blindaje Anti-Desborde & Consagración Constitucional Ley 11 (Feedback Lendo - 25 Sep 2026)**:
  - *Contexto & Detección de Lendo*: Tras colocar los 3 botones en la cabecera modal, el botón de cierre `[ ✕ ]` sobresalía por la derecha fuera de la tarjeta en móviles estrechos. Lendo envió captura evidenciando el desborde y solicitó elevarlo a la Constitución Suprema para blindar que nunca más vuelva a ocurrir en ningún proyecto.
  - *Autorización Constitucional (PIN 2796)*:
    - Verificación matemática SHA-256 de la identidad de Lendo autorizando la creación del **Artículo 11 (Doctrina de Blindaje Anti-Desborde y Ergonomía Móvil Estricta)** en la Constitución Suprema (Parte I) en `AGENTS.md`.
  - *Solución Definitiva en Local (`index.html`, `css/main.css`)*:
    1. **Cabecera Limpia con Botón Cerrar Protegido**:
       - Eliminación de la sobrecarga horizontal: la cabecera modal vuelve a tener exclusivamente el título y el botón `[ ✕ ]` a la derecha sin rozar el marco.
    2. **Mini-Tira Horizontal `.nav-modal-tools-strip`**:
       - Tira compacta de 32px de alto con dos botones simétricos al 50%: `[ 📖 Fenómenos ]` y `[ 🎨 Estilos Iconos ]`, con margen de seguridad superior a 40px por celda.
    3. **Anti-Caché & Despliegue Dual `v1.0.90-navstrip`**:
       - Sincronización en `sw.js`, `index.html`, `css/main.css` y `AGENTS.md`.
- **🎨 Hito Técnico Cumplido: Síntesis de Etiqueta y Acolchado Anti-Desborde (Feedback Lendo - 25 Sep 2026)**:
  - *Contexto & Detección de Lendo*: Tras la creación de la mini-tira, Lendo detectó que la etiqueta *"Estilos Iconos"* (dos palabras) rozaba ligeramente el margen derecho en pantallas muy estrechas, sugiriendo llamarla simplemente *"Iconos"*.
  - *Solución Definitiva en Local (`index.html`, `css/main.css`)*:
    1. **Nombre Conciso Simétrico (`[ 🎨 Iconos ]`)**:
       - Compactación a una sola palabra *"Iconos"*, a la par que *"Fenómenos"*.
       - Ajuste de padding a `7px 8px` con `max-width: 100%` y `overflow: hidden`, asegurando más de 50px de holgura por celda en móviles.
    2. **Anti-Caché & Despliegue Dual `v1.0.91-navclean`**:
       - Sincronización en `sw.js`, `index.html` y `css/main.css`.
- **🏔️ Hito Técnico Cumplido: Reorganización Geográfica de Puertos y Cabecera Operacional (Feedback Lendo - 25 Sep 2026)**:
  - *Contexto & Detección de Lendo*: Lendo detectó que en el módulo de Cordillera, Esquí y Puertos (`mountainCard.js`), era necesario diferenciar nítidamente Esquí y Puertos de la monitorización general de alta montaña, y que la red de puertos aparecía desordenada geográficamente a lo largo de Asturias.
  - *Diagnóstico*: Los puertos saltaban erráticamente entre concejos sin estructuración comarcal, y el interruptor táctil de Esquí/Puertos carecía de una cabecera que explicara su propósito frente a los sensores climáticos de cumbre (Cota 0°C, Espesores 3 Días y Aludes EAWS).
  - *Solución Definitiva en Local (`js/components/mountainCard.js`, `css/components.css`)*:
    1. **Cabecera Operacional Diferenciada (`.mountain-operational-section`)**:
       - Bloque visualmente delimitado con badge `🎿🚗 Servicios en Ruta` y subtítulo explicativo, albergando el interruptor deslizante táctil.
    2. **Estructuración Geográfica en 4 Sectores Naturales de Asturias**:
       - **🛣️ Arterias Principales (Asturias - León)**: Autopista del Huerna (AP-66) y Puerto de Pajares (N-630) con tarjetas destacadas.
       - **📍 Sector Centro y Valles Mineros (Caudal, Aller, Quirós, Riosa)**: San Isidro (AS-112), Cobertoria (AS-230), Angliru (RI-5), Ventana (AS-228).
       - **🏔️ Sector Oriente y Picos de Europa (Caso, Ponga, Cangas de Onís)**: Tarna (AS-117), Pontón / Desfiladero (N-625), Lagos de Covadonga (CO-4).
       - **🌲 Sector Occidente (Somiedo, Narcea, Allande, Ibias)**: Somiedo (AS-227), San Lorenzo (AS-265), Leitariegos (AS-213), Connio (AS-348), El Palo (AS-14), La Marta (ALL-4), Mujeres Muertas (AS-29).
    3. **Depuración de Badge de Aludes EAWS**:
       - Eliminación de la redundancia textual (`Nivel 1 (Débil)`).
    4. **Anti-Caché & Despliegue Dual `v1.0.92-mountainorder`**:
       - Sincronización en `sw.js`, `index.html`, `components.css` y `mountainCard.js`.












