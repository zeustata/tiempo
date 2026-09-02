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

2. 💻 **Actualización Dual (Local + Red)**:
   - Toda modificación aprobada debe aplicarse directamente en la **carpeta de archivos locales** (`c:\Users\NUC\Downloads\IA\Tiempo`).
   - Acto seguido, realizar `git commit` y `git push origin main` para que la aplicación esté permanentemente actualizada y respaldada en la web.

3. 🔢 **Incremento de Versión Obligatorio**:
   - Con cada cambio o modificación de funcionalidades, estilos o estructura, **siempre se debe subir el número de versión** (actualmente en ciclo oficial `v1.x.x`).
   - Se debe reflejar la nueva versión en:
     - El badge del pie de página (`#app-version-badge` en `index.html`).
     - El historial del modal de versiones (`#version-modal` en `index.html`).
     - El archivo `CHANGELOG.md`.

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
- Subidas continuas a GitHub (`zeustata/tiempo`).


