# MEMORIA Y RECUERDOS DEL PROYECTO (TIEMPO ASTURIAS)

Este documento contiene la memoria permanente del proyecto, sus acuerdos de desarrollo, diseño y evolución histórica.

---

## 🏛️ Reforma Constitucional Suprema: Doctrina de Legalidad Estricta, Datos Abiertos y Blindaje Google Play Store (Artículo 15) — 2026-09-30
- **Autenticación y Reforma:** Tras verificación obligatoria con PIN maestro de seguridad (`2796`), Lendo aprueba y consagra formalmente el **Artículo 15** en la Parte I (Constitución Suprema):
  1. *Legalidad y Licencias Abiertas:* Obligatoriedad de operar exclusivamente con datos abiertos oficiales (Open Data), código abierto o dominio público conforme a la Ley de Reutilización de la Información del Sector Público.
  2. *Prohibición de Malas Prácticas:* Prohibido taxativamente el raspado web (*web scraping*) no autorizado a servidores privados, la elusión de pagos o la vulneración de Términos de Servicio (TOS).
  3. *Atribución y Transparencia:* Obligación de identificar todas las fuentes oficiales e incluir descargo visible de independencia para evitar presunta suplantación de entes estatales.
  4. *Blindaje Google Play Store:* Blindaje estricto de directivas para desarrolladores en Google Play Console para erradicar cualquier riesgo de sanción, suspensión o baneo.

## 🏛️ Reforma Constitucional Suprema: Protocolo de Juicio Crítico, Evaluación y Firmeza Intelectual (Artículo 0) — 2026-09-28
- **Autenticación y Reforma:** Tras verificación obligatoria con PIN maestro de seguridad (`2796`), Lendo aprueba y consagra formalmente la adición al **Artículo 0** de la Constitución Suprema:
  1. *Socios en Igualdad:* Lendo y Princesa son socios; nadie manda sobre nadie y Princesa dice siempre la verdad sin complacencia.
  2. *Evaluación antes de elogiar:* Al solicitar opinión o evaluación de algo (un texto, una idea, una decisión), Princesa evalúa antes de elogiar: empieza por lo que fallaría o lo que objetaría un experto exigente, y después lo que funciona. Sin aperturas halagüeñas ni inventar fallos artificiales.
  3. *Juicio independiente sin anclaje:* Si Lendo opina antes de pedir la opinión de Princesa, no se toma como referencia; se forma juicio autónomo y se señala cualquier discrepancia.
  4. *Firmeza ante la presión:* Si hay posición técnica fundada, se sostiene frente a insistencias; solo cambia ante argumentos o datos nuevos explicados con rigor.
  5. *Fronteras del conocimiento:* Distinción rigurosa entre hechos, opiniones y desconocimiento (sin rellenar con especulaciones).
  6. *Separación entre Juicio y Ejecución:* Aplica cuando se pide juicio; ante órdenes de tareas concretas decididas, se ejecuta sin discusión.

## 🚀 Última Actualización Oficial: v1.1.46 🌍 — 2026-10-01
- **Estabilidad & Tablets: Erradicación Total del Temblor de 2s en Tablets en Stand (Feedback Lendo):**
  1. *Diagnóstico del Conflicto Gyro vs CSS Transition (Tablets Apaisadas en Soporte):*
     - En tablets colocadas en soporte de mesa (stand, ángulo de 75°-80°), el giroscopio calcula un desplazamiento de inclinación que el motor JS (`gyroGlass.js`) interpola con `lerp` durante ~2 segundos al arrancar o refrescar. Al mismo tiempo, las tarjetas tenían `transform: translate(...)` y `transition: transform 0.12s ease-out, box-shadow 0.15s ease-out`. Esta colisión de dos motores de animación independientes sobre la misma propiedad provocaba un temblor o vibración subpixel continua de la tarjeta durante exactamente los 2 segundos de interpolación. En vertical no sucedía porque el ángulo neutro no forzaba este recorrido extremo.
  2. *Solución Definitiva y Limpia (Cero Riesgo):*
     - **Asentamiento Fijo de Tarjetas:** Eliminado el `transform: translate` físico y las transiciones CSS de `transform` y `box-shadow` en `.hero-weather-card` y `.app-header`. La tarjeta permanece inmóvil y nítida como una roca.
     - **Preservación Integral de Liquid Glass:** El efecto óptico de refracción líquida y halo de luz en `::after` (`--glass-x`, `--glass-y`) se mantiene 100% vivo y reactivo a toques y giroscopio.
     - **Limpieza de Transición Residual:** Ajustado `.btn-explain-clima` para transiciones discretas en lugar de `transition: all`.
  3. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.46 🌍`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.46 🌍`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.46'` en [js/app.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/js/app.js).
     - `CACHE_NAME = 'meteoasturlode-v1146-rock-solid-glass'` en [sw.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/sw.js).
     - CSS y módulos JS sincronizados con `?v=1.1.46`.

---

## 🚀 Versión Anterior: v1.1.45 🌍 — 2026-10-01
- **Rendimiento & GPU: Fix Definitivo Anti-Microdestellos en Tablets (Feedback Lendo):**
  1. *Diagnóstico del Conflicto de Capas GPU en Pantallas de Alta Resolución (Tablets):*
     - En pantallas táctiles de gran resolución (tablets), la combinación de un elemento hijo con `filter: drop-shadow(...)` y `transition: filter` dentro de una tarjeta con `backdrop-filter: blur(24px)` y animación dinámica de refracción (`gyroGlass`) provocaba que el compositor gráfico de Chrome/Android descartara y reconstruyera la textura GPU repetidamente durante los primeros ~2 segundos de montaje, traduciéndose en micro-destellos o chispazos rápidos en la tarjeta principal.
  2. *Solución Quirúrgica y Limpia (Cero Riesgo):*
     - **Sustitución Vectorial por `text-shadow`:** Se sustituye `filter: drop-shadow` por sombreado tipográfico nativo `text-shadow: 0 0 4px rgba(250, 204, 21, 0.75)` en la bombilla `💡` de `.clima-bulb`. El efecto estético de halo dorado es idéntico, pero no fuerza la creación de texturas GPU separadas ni genera descarte de capas sobre `backdrop-filter`.
     - **Supresión de Transiciones en `filter`:** Eliminado el canal `filter` de las transiciones de `.climatology-badge` y `.clima-bulb`, evitando que la GPU intente interpolar filtros durante el ciclo de entrada.
     - **Erradicación de Opacidad Cero Artificial:** Retirado el `opacity: 0` de `#panel-live.refreshing`, evitando cualquier micro-apagón forzado del contenedor.
     - **Firma Pura en `_dataSignature`:** Eliminado el timestamp dinámico para que solo se active re-renderizado si la temperatura, código de tiempo o viento han variado realmente respecto a los datos en pantalla.
  3. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.45 🌍`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.45 🌍`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.45'` en [js/app.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/js/app.js).
     - `CACHE_NAME = 'meteoasturlode-v1145-tablet-gpu-pure'` en [sw.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/sw.js).
     - CSS y módulos JS sincronizados con `?v=1.1.45`.

---

## 🚀 Versión Anterior: v1.1.43 🌍 — 2026-09-30
- **Diseño & Estabilidad: Supresión de Doble Pastilla y Eliminación del Temblor en Tablets:**
  1. *Pastilla Única Autónoma en Climatología (Feedback Lendo):*
     - Erradicado el marco exterior amarillo/ámbar (`.btn-explain-sensor`) que envolvía la pastilla verde.
     - La pastilla (`.climatology-badge.clima-normal`) pasa a ser el único botón interactivo, translúcido y redondeado (999px), conteniendo el punto verde (`🟢`), la etiqueta (`Valores habituales`) y la bombilla (`💡`).
     - Al interactuar o hacer clic se dispara limpiamente la guía didáctica de las Normales AEMET sin cajas duplicadas.
  2. *Eliminación del Temblor / Jitter de la Tarjeta en Tablets:*
     - Sustituida la directiva `transition: all 0.25s ease;` en `.climatology-strip` por transiciones específicas discretas de fondo y borde (`transition: background 0.2s ease, border-color 0.2s ease;`).
     - Al re-renderizar o refrescar el panel en pantallas de tablets, se erradica cualquier cálculo elástico de altura o margen durante el montaje del DOM, garantizando un refresco instantáneo y visualmente inmóvil.
  3. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.43 🌍`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.43 🌍`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.43'` en [js/app.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/js/app.js).
     - `CACHE_NAME = 'meteoasturlode-v1143-single-clima-pill'` en [sw.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/sw.js).
     - CSS y módulos JS sincronizados con `?v=1.1.43`.

---

## 🚀 Versión Anterior: v1.1.42 🌍 — 2026-09-30
- **Ergonomía & Apertura Modal: Integración de Bombilla 💡 en Pastilla y Apertura Modal Blindada:**
  1. *Integración de Bombilla en Pastilla de Estado (Feedback Lendo):*
     - Supresión del texto redundante «Explícame» y adición del icono limpio de bombilla `💡` integrado directamente en la pastilla de estado (ej. `🟢 Valores habituales 💡`).
     - Efecto de iluminación interactiva (*glow*) y micro-rotación en hover/touch con `.clima-bulb`.
     - La pastilla actúa como botón táctil único de apertura para la guía didáctica de climatología.
  2. *Blindaje y Corrección de Apertura del Modal Didáctico:*
     - Corregido el selector en el manejador global de eventos de [js/app.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/js/app.js) incorporando `[data-explain]` y `.climatology-badge-interactive` para garantizar la captura de clics en cualquier elemento didáctico.
     - Añadida la sección didáctica completa `climatology` en el diccionario de explicaciones (`WEATHER_EXPLANATIONS` en [js/utils/weatherExplanations.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/js/utils/weatherExplanations.js)), detallando el estándar de 30 años de la OMM y AEMET (1991-2020), el cálculo de anomalía térmica, la corrección por altitud (-0,6 °C / 100m) y los 4 dominios climáticos de Asturias.
  3. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.42 🌍`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.42 🌍`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.42'` en [js/app.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/js/app.js).
     - `CACHE_NAME = 'meteoasturlode-v1142-clima-explain-bulb'` en [sw.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/sw.js).
     - CSS y módulos JS sincronizados con `?v=1.1.42`.

---

## 🚀 Versión Anterior: v1.1.41 🌍 — 2026-09-30
- **Ergonomía & Diseño Limpio: Pastilla Interactiva en Tiempo Habitual & Purgado de Caché Móvil:**
  1. *Pastilla Interactiva Única en Climatología (Feedback Lendo):*
     - Supresión del botón redundante `[ 📊 Tiempo Habitual ]` que forzaba un segundo renglón en la cabecera climatológica en teléfonos móviles.
     - Transformada la pastilla de diagnóstico (`🟢 Valores habituales 💡 Explícame`) en el propio elemento táctil interactivo (`.climatology-badge-interactive`) para abrir la ventana didáctica explicativa de las Normales de 30 años de AEMET.
     - Cabecera reducida a una sola línea fluida y minimalista, liberando holgura vertical en la tarjeta.
  2. *Purgado Exhaustivo de Cachés en Módulos (Artículo 4 zeustata):*
     - Sincronizadas las cadenas de versión (`?v=1.1.41`) en la totalidad de los módulos y componentes en [js/app.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/js/app.js) y [js/components/currentCard.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/js/components/currentCard.js).
     - Erradicada la retención de archivos desactualizados en móviles PWA, garantizando la visualización inmediata de las demarcaciones climáticas oficiales y estaciones AEMET.
  3. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.41 🌍`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.41 🌍`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.41'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1141-clima-pill-streamline'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.41`.

---

## 🚀 Versión Anterior: v1.1.40 🌍 — 2026-09-30
- **Climatología & Zonas AEMET: Diferenciación de Zonas y Estaciones Oficiales en Récords Históricos:**
  1. *Identificación Geográfica Rigurosa de Récords Mensuales (Feedback Lendo / Ley 11 Parte II):*
     - Erradicada la ambigüedad en los récords históricos de 30 años (AEMET 1991–2020) en la tarjeta principal.
     - Asignación obligatoria y explícita de cada concejo a su demarcación climática oficial y estación meteorológica de referencia:
       - 🌊 **Litoral Cantábrico:** *AEMET Gijón Musel / Avilés* (Gijón, Avilés, Castrillón, Gozón, Llanes, Ribadesella, Tapia...).
       - 🏙️ **Valles Centrales y Cuencas:** *AEMET Oviedo El Cristo* (Oviedo, Siero, Mieres, Langreo, Grado...).
       - 🍂 **Suroccidente Interior:** *AEMET Cangas del Narcea* (Cangas del Narcea, Allande, Degaña, Ibias, Tineo...).
       - 🏔️ **Cordillera y Picos de Europa:** *AEMET Pajares / Picos de Europa (Alta Montaña)* (Cabrales, Cangas de Onís, Amieva, Sotres, Somiedo, Pajares, Quirós, Lena...).
  2. *Diseño Ergonómico en Dos Niveles (Doctrina Artículo 11 zeustata):*
     - Reorganizado el bloque climatológico en 2 filas limpias: cabecera con mes (`📜 Récords AEMET · [Mes]:`) y pastilla de zona destacada (`.records-zone-pill`), y fila inferior con las 3 pastillas de métricas (`🔥 Máx`, `❄️ Mín`, `🌧️ 24h`).
     - Blindaje defensivo en arrays de temperaturas para prevenir excepciones en cliente si faltan datos en la API.
  3. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.40 🌍`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.40 🌍`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.40'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1140-climatology-zones'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.40`.

---

## 🚀 Versión Anterior: v1.1.39 🌍 — 2026-09-30
- **Ergonomía Móvil & Visualización: Blindaje Anti-Recorte en Métricas de Viento y Rachas:**
  1. *Subordinación Tipográfica y Jerarquía de Unidades (Artículo 11 zeustata):*
     - Modificado [js/components/forecastView.js](file:///c:/Users/NUC/Downloads/IA/Tiempo/js/components/forecastView.js) para renderizar la unidad de velocidad (`km/h` o `kt`) encapsulada en `<small class="u-m-unit">`, dotándola de menor peso visual (`0.68rem`, `font-weight: 500`) frente al número principal (`0.92rem`, `font-weight: 700`).
     - Formato ultra-compacto en racha máxima (`Racha <strong>${windGust}</strong>`), destacando la cifra sin consumir espacio innecesario en la pastilla.
  2. *Optimización de Márgenes y Padding Móvil:*
     - En [css/components.css](file:///c:/Users/NUC/Downloads/IA/Tiempo/css/components.css), dentro de `@media (max-width: 480px)`:
       - `.daily-card-rich`: padding reducido de `20px 22px` a `16px 14px`, ganando 16px netos de ancho para las columnas internas.
       - `.d-unified-metrics-grid`: padding de cada celda ajustado a `5px 6px` y gap a `5px`.
       - `.u-m-icon`: tamaño ajustado a `1.05rem`.
     - Resultado verificado: visualización completa y limpia en pantallas estrechas (320px - 380px) sin truncamiento por puntos suspensivos (`25 k...` y `Racha ...`).
  3. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.39 🌍`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.39 🌍`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.39'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1139-forecast-wind-ergonomy'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.39`.

---

## 🚀 Versión Anterior: v1.1.38 🌍 — 2026-09-30
- **Seguridad, Higiene & Blindaje Legal: Migración Integral a HTTPS en Webcams:**
  1. *Migración Integral a Protocolo Cifrado TLS / HTTPS (Artículo 15 zeustata):*
     - Actualizada la totalidad de los 39 enlaces salientes de `js/utils/webcamsData.js` a `https://www.webcamsdeasturias.com/`.
     - Supresión total de redirecciones 301/302 intermedias, acelerando en 100-200 ms la apertura de las cámaras de playas, rompientes y puertos de montaña al pulsar *"Ver Cámara ↗"*.
     - Blindaje absoluto ante los analizadores de seguridad de Google Play Store, erradicando cualquier aviso potencial de *"Cleartext Traffic"*.
     - Actualizada la leyenda legal al pie de `#webcams-modal` certificando la condición de enlaces salientes cifrados hacia el portal oficial propietario con plena transparencia.
  2. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.38 🌍`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.38 🌍`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.38'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1138-https-webcams-blindaje'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.38`.

---

## 🚀 Versión Anterior: v1.1.37 🌍 — 2026-09-30
- **Calibración Sismológica: Umbral Menor de Sensibilidad (M >= 2.5) & Reubicación Discreta:**
  1. *Filtro Físico y Menor Sensibilidad (Feedback Lendo):*
     - Elevación del umbral de activación regional de `M 1.8` a **`M >= 2.5`**, suprimiendo de raíz falsos positivos de micro-sismos instrumentales distantes como el capturado en el norte de Portugal (M 2.2 a ~190 km).
     - Delimitación geográfica estricta para Asturias y litoral Cantábrico inmediato (Latitud `42.80° N` a `44.40° N`, Longitud `-7.30° W` a `-4.40° W`). Eventos fuera de este cuadrante solo se contemplan si son terremotos mayores (`M >= 4.0` regional o `M >= 4.5` lejano).
     - Reducción del intervalo de vigilancia de 48h a **24 horas**.
     - Auto-limpieza inmediata de caché en el cliente (`localStorage`): cualquier sismo residual almacenado que no satisfaga los nuevos filtros se purga al instante al arrancar la app, asegurando el silencio total del centinela.
  2. *Reubicación al Final del Panel (Instrucción Expresa de Lendo):*
     - Reubicación del contenedor dinámico `#seismic-banner-container` desde la zona alta hacia la **última tarjeta del dashboard, inmediatamente después del Asesor de Colada y Secado (`${laundryMarkup}`)**.
     - La cabecera meteorológica queda 100% despejada para el tiempo en vivo, mientras que cualquier evento sísmico relevante se expone discretamente al final.
  3. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.37 🌍`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.37 🌍`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.37'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1137-seismic-calibrated'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.37`.

---

## 🚀 Versión Anterior: v1.1.36 🌍 — 2026-09-30
- **Monitor Silencioso de Actividad Sísmica en Asturias y Mar Cantábrico (Open Data EMSC / IGN):**
  1. *Centinela Geofísico Silencioso (Doctrina Constitucional 12 & Artículo 15 zeustata):*
     - En conformidad con el recién aprobado **Artículo 15 (Legalidad Estricta y Datos Abiertos)**, se incorporó un monitor sísmico georreferenciado conectado a los servicios oficiales FDSN Web Services del **Centro Sismológico Euromediterráneo (EMSC/CSEM)** e **IGN**.
     - Es 100% legal, público y abierto: sin tokens privados, sin cuotas, sin raspado web ni riesgos de baneo en Google Play Console.
     - Cobertura geofísica con centro en Asturias (43.35° N, -5.85° W) y un radio de 2.5° (~270 km), abarcando los 78 concejos del Principado, la Cordillera Cantábrica (León, Palencia, Cantabria, Lugo) y la plataforma submarina del Cantábrico.
     - **Comportamiento Silencioso (Ley 12):** El centinela permanece 100% oculto e imperceptible para el usuario a menos que se haya registrado un evento de magnitud `>= 1.8` en las últimas 48 horas.
     - **Cálculo de Distancia In situ (Haversine):** Calcula en kilómetros la distancia exacta entre el epicentro y las coordenadas del concejo seleccionado en pantalla (ej. "a ~35 km de Degaña" o "a ~78 km de Gijón").
     - **Caché Inteligente (25 min):** Almacenado en `localStorage` (`meteoastur_seismic_data`) para no sobrecargar la red al cambiar de concejo. Si el usuario conmuta entre concejos, la app recalcula la distancia al vuelo sin necesidad de repetir peticiones fetch.
  2. *Simulacro Controlado (Doctrina Constitucional 12):*
     - Incorporados conmutadores de prueba para verificación visual: `?test=sismo` (sismo en suroccidente asturiano M 3.1) y `?test=sismo_mar` (sismo submarino cantábrico M 3.8).
  3. *Diseño Armónico Liquid Glass (Ley 14):*
     - Tarjeta con borde y sombra pulsante (`seismicAmberGlow`, `seismicRedGlow`), pastillas ergonómicas de magnitud M, epicentro, profundidad, registro horario transcurrido y enlace a la ficha técnica oficial del EMSC.
  4. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.36 🌍`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.36 🌍`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.36'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1136-seismic-sentinel'` en `sw.js` agregando `seismicDetector.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.36`.

---

## 🚀 Versión Anterior: v1.1.35 🌐 — 2026-09-30
- **Ampliación del Observatorio Global: 3 Nuevos Modelos Mundiales (8 Potencias):**
  1. *Auditoría Técnica y Selección de Modelos:*
     - Lendo solicitó evaluar e integrar los demás modelos numéricos disponibles en Open-Meteo.
     - Se realizó una auditoría rigurosa de las APIs de predicción en tiempo real. Se constató que el modelo de Inteligencia Artificial `ecmwf_aifs025` no proporciona datos de superficie, códigos WMO ni precipitación en tiempo actual (devuelve `null`), por lo que fue descartado por seguridad técnica para evitar anomalías en la UI.
     - Se seleccionaron e integraron con éxito los 3 mejores modelos globales con compatibilidad completa a 10 días (240 horas) y ahora en vivo:
       - **🇬🇧 UK Met Office (Reino Unido) — `ukmo_seamless` (10 km):** Histórica referencia en frentes atlánticos, temporales marinos y borrascas cantábricas.
       - **🇨🇦 GEM (Environment Canada, Canadá) — `gem_seamless` (15 km):** Máxima precisión en advecciones árticas y olas de frío polar.
       - **🇯🇵 JMA (Agencia Meteorológica de Japón) — `jma_seamless` (10 km):** Física avanzada de saturación de humedad oceánica y precipitación convectiva.
  2. *Integración en Catálogo y Guía Didáctica:*
     - El catálogo `WEATHER_MODELS` en `js/services/weatherApi.js` asciende a 8 modelos de referencia mundial.
     - Actualizada la sección didáctica `weather_models` en `js/utils/weatherExplanations.js` detallando las fortalezas de cada uno para Asturias.
  3. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.35 🌐`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.35 🌐`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.35'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1135-global-models'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.35`.

---

## 🚀 Versión Anterior: v1.1.34 🇫🇷 — 2026-09-30
- **Soberanía de AROME (1.3 km) en Tiempo Actual & Blindaje Anti-Orballu Fantasma de ECMWF (Ley 10):**
  1. *Diagnóstico Forense de Terreno y Desacople en Castrillón / Rasa Costera:*
     - Lendo constató en vivo que durante toda la jornada la app se quedó clavada en *"Orbayu llixeru (0.1 - 0.2 mm)"* y *"🟡 Orbayando Agora"*. En la realidad: de 5:00 a 8:00 no llovió nada, luego cayeron cuatro gotas testimoniales y después nada de nada; sobre las 14:00 se abrieron claros limpios y por la tarde el cielo presentaba claros azules.
     - La inspección forense de las APIs reveló que **AROME (1.3 km)** clavó con milimétrica precisión la realidad: 0.0 mm en toda la franja, nublado sin lluvia y código 0 (Despejado/Claros) a las 13:00 y 14:00.
     - Por el contrario, **ECMWF IFS (9 km)** arrojaba llovizna residual continua (0.1 a 0.2 mm y WMO 51) de 5:00 a 16:00 debido a su sesgo húmedo orográfico (la cuadrícula gruesa de 9 km promedia la masa húmeda condensada contra la cordillera y la derrama sobre la costa).
     - El algoritmo de consenso `applyCantabricoConsensus()` previo tenía un fallo crítico de diseño: si `ecmwfPrecip >= 0.1` y AROME daba 0.0, sobreescribía la precipitación actual e inyectaba el código WMO 51. Esto secuestraba el tiempo en vivo, cegaba el detector de Resol/Claros (que exige `p < 0.1`) y congelaba el Semáforu del Paragües en "Orbayando Agora".
  2. *Refactorización Rigurosa en `js/services/weatherApi.js`:*
     - **Soberanía Absoluta de AROME en Nowcasting:** Eliminada completamente la sobreescritura de precipitación y código meteorológico en tiempo actual (`weather.current`). AROME (1.3 km) es la autoridad indiscutible sobre el suelo asturiano. Si AROME dice seco (< 0.1 mm), ECMWF no puede imponer lluvia bajo ninguna circunstancia.
     - **Protección Anti-Orballu Fantasma en Pronóstico Horario (`weather.hourly`):** ECMWF solo puede armonizar lluvia si el ensamble es inequívoco (`PoP >= 65%`), la acumulación es relevante (`>= 0.5 mm`) y el cielo está efectivamente cubierto (`nubosidad >= 60%`). Se prohíbe machacar a AROME por trazas o lloviznas de 0.1–0.4 mm.
     - **Blindaje de Falsos Claros:** Se eleva el filtro a divergencia crítica masiva (`rawCloud < 50 && ecmwfCloud >= 80 && diff >= 35%`).
     - **Metadatos del Catálogo:** Modelo `best_match` actualizado a etiqueta `Calibrado Cantábrico` con descripción de consenso inteligente.
  3. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.34 🇫🇷`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.34 🇫🇷`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.34'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1134-arome-sovereignty'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.34`.

---

## 🚀 Versión Anterior: v1.1.33 ⚡ — 2026-09-30
- **Blindaje Anti-Colisión y Rediseño Ergonómico de Tiempo Habitual (Ley 11):**
  1. *Diagnóstico del Incidente:*
     - Lendo detectó que en la franja de Climatología (justo bajo las temperaturas mínima y máxima en la Hero Card) se superponían dos textos volviéndose ilegibles en pantallas móviles: el badge de estado térmico `Valores habituales` y el botón de acción didáctica `📊 Tiempo Habitual`.
     - El origen radicaba en que en `v1.1.32`, al agregar la fila de récords históricos, se agrupó la cabecera dentro de un nuevo `<div class="climatology-top-row">` con `display: flex` (row sin wrap), mientras que la media query `@media (max-width: 480px)` asignaba `width: 100%` a la parte izquierda y `width: 100%` al botón. Flexbox comprimió la parte izquierda a ancho 0, pintando el badge desbordado exactamente sobre el botón centrado.
  2. *Refactorización Ergonómica de Jerarquía en `js/utils/climatologyData.js`:*
     - Fila 1 (Cabecera limpia): `.climatology-header-left` a la izquierda con icono `🟢` y badge `Valores habituales`, y el botón didáctico `📊 Tiempo Habitual` a la derecha. Ambos caben con holgura en pantallas de 320px–360px.
     - Fila 2 (Cuerpo descriptivo): `.climatology-desc-row` con el texto explicativo a ancho completo sin interferencias (`Habitual en finales de septiembre: 22.2°C`).
     - Fila 3 (Pie de récords): `.climatology-records-row` con los récords históricos de AEMET.
  3. *Blindaje CSS en `css/components.css`:*
     - Definidos `.climatology-header-left` y `.climatology-desc-row`.
     - Corregido el media query `@media (max-width: 480px)` eliminando el forzado `width: 100%` que causaba la compresión y permitiendo ajuste ergonómico perfecto.
  4. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.33 ⚡`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.33 ⚡`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.33'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1133-fix-climatology-layout'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.33`.

---

## 🚀 Versión Anterior: v1.1.32 ⚡ — 2026-09-29
- **Monitor Convectivo de Tormentas Inminentes y Récords Históricos Oficiales AEMET:**
  1. *Evaluación Crítica Previa (Artículo 0):*
     - Lendo consultó sobre la fiabilidad real de las tormentas y los récords. Princesa evaluó honestamente: los modelos numéricos no son sensores de rayos al milímetro en tiempo real, pero sí son altamente fiables para predecir inestabilidad convectiva, granizo y chubascos severos a 1-3 horas (nowcasting); por su parte, los récords de los observatorios centenarios de AEMET son 100% veraces e indiscutibles.
  2. *Arquitectura del Monitor Convectivo en `js/utils/thunderstormDetector.js`:*
     - Componente pasivo (`.thunderstorm-banner`) que permanece invisible si no hay tormenta inminente.
     - Analiza códigos WMO 95-99 y aguaceros convectivos violentos a corto plazo.
     - Detecta riesgo de pedrisco/granizo (WMO 96 y 99) alertando para resguardar vehículos.
     - Incorpora botón directo `📡 Ver Radar en Directo` que conmuta al instante a la pestaña de radar satélite RainViewer.
     - Soporta simulacro controlado (Ley 12) mediante `?test=tormenta` y `?test=granizo`.
  3. *Base de Datos de Récords Oficiales AEMET en `js/utils/climatologyData.js`:*
     - Incorporada la serie digital oficial de las estaciones históricas de referencia en Asturias (Gijón-Musel, Oviedo-Buenavista, Avilés-Aeropuerto, Llanes, Cangas del Narcea y Pajares).
     - Despliega en la franja climatológica: récord de calor del mes con año, récord de frío del mes con año y máxima lluvia en 24 horas con año.
  4. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.32 ⚡`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.32 ⚡`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.32'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1132-storm-records'` en `sw.js` y añadido `./js/utils/thunderstormDetector.js` a `STATIC_ASSETS`.
     - CSS y módulos JS sincronizados con `?v=1.1.32`.

---

## 🚀 Versión Anterior: v1.1.31 🌫️ — 2026-09-29
- **Detector Silencioso e Inteligente de Borrina Marina y Nieblas de Valle (Ley 12):**
  1. *Concepto y Naturaleza Pasiva:*
     - Lendo consultó si el detector de borrina era pasivo, confirmándose su naturaleza 100% silenciosa: permanece invisible en días normales y únicamente salta a la vista cuando los sensores físicos constatan la niebla.
     - Sigue el patrón arquitectónico de la Galerna Cantábrica, Efecto Foehn y Alerta Xelu.
  2. *Doble Escala Regional en `js/utils/borrinaDetector.js`:*
     - **Borrina Marina Costera (Litoral Cantábrico):** Se activa en concejos costeros cuando la humedad es `>= 92%`, la diferencia entre temperatura y punto de rocío es `<= 1.2 °C` y la brisa marina sopla floja del mar, advirtiendo de visibilidad reducida en playas/puertos y desplome de sensación térmica.
     - **Niebla de Valle / Inversión Térmica (Interior y Cuencas):** Se activa en concejos del interior o cuencas fluviales con humedad `>= 93%`, viento en calma y frío atrapado en fondo de valle, advirtiendo de que en cotas altas luce el sol.
  3. *Doctrina de Simulacro (Ley 12):*
     - Se implementó un conmutador controlado de prueba activable con `?test=borrina` (para borrina marina) o `?test=inversion` (para niebla de valle) para verificación previa visual antes de despliegue.
  4. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.31 🌫️`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.31 🌫️`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.31'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1131-borrina-detector'` en `sw.js` y añadido `./js/utils/borrinaDetector.js` a `STATIC_ASSETS`.
     - CSS y módulos JS sincronizados con `?v=1.1.31`.

---

## 🚀 Versión Anterior: v1.1.30 ☂️ — 2026-09-29
- **Semáforu del Paragües (Nowcasting Práctico Asturiano):**
  1. *Concepto e Integración:*
     - Lendo solicitó incorporar una funcionalidad útil y directa para el día a día asturiano: el "Semáforo del Paraguas", que responde de un vistazo si se debe coger paraguas o si se puede salir o tender con tranquilidad.
     - Se descartó la integración forzada o con iframes de webcams de terceros para evitar bloqueos por CORS, infracciones de derechos, banners publicitarios externos y rechazos en Google Play Store (manteniéndose los enlaces directos verificados en nueva pestaña, 100% legales y seguros).
  2. *Arquitectura e Implementación en `js/utils/umbrellaAdvisor.js`:*
     - Ventana temporal de 6 a 8 horas inmediatas (Nowcasting).
     - Se alimenta de los datos de `current` y `hourly` una vez procesados por el *Algoritmo Híbrido de Consenso Cantábrico (Leyes 7, 8 y 10)*, garantizando que el orballu nocturno de Gijón (0.3 mm rescatado de ECMWF) active correctamente la advertencia.
     - Tres estados cromáticos intuitivos:
       - 🟢 **Cielo Noble**: Tregua seca garantizada en las próximas 8 horas. No hace falta paraguas.
       - 🟡 **Peligro d'Orbayu**: Orbayu / llovizna fina prevista en las próximas horas (o activa en el momento). Muestra la hora exacta prevista de llegada (ej. *"a partir de las 21:00 h"*), la cantidad en mm y recomendación de chubasquero o paraguas pequeño.
       - 🔴 **Bastinazu**: Lluvia copiosa (>= 1.5 mm/h o tormenta). Alerta visual destacada para llevar paraguas grande o quedarse a cubierto.
  3. *Diseño Visual y Blindaje Ergonómico (Leyes 11 y 14):*
     - Componente `.umbrella-advisor-strip` con estética *Liquid Glass* integrado armónicamente dentro de la tarjeta meteorológica principal justo debajo de la pastilla climática.
     - Indicador tipo píldora pulsante (`dot-safe`, `dot-warning`, `dot-danger`) adaptado al 100% al ancho útil de dispositivos móviles sin desbordes.
  4. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.30 ☂️`.
     - Footer de `index.html` con `#app-version-badge` actualizado a `v1.1.30 ☂️`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.30'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1130-umbrella-advisor'` en `sw.js` y añadido `./js/utils/umbrellaAdvisor.js` a `STATIC_ASSETS`.
     - CSS y módulos JS sincronizados con `?v=1.1.30`.

---

## 🚀 Versión Anterior: v1.1.29 🧪 — 2026-09-29
- **Armonización de Lluvia por Consenso (Supresión de la Paradoja 63% con 0.0 mm):**
  1. *Diagnóstico del Desacople Estadístico-Determinista:*
     - Lendo observó en el pronóstico nocturno para Gijón que el modelo en pruebas marcaba a las 22:00 un 55% y a las 23:00 un 63% de lluvia pero con `0.0 mm` acumulados.
     - La investigación de la API de Open-Meteo desveló que `best_match` extrae el porcentaje de probabilidad del ensamble alemán DWD ICON-EPS (que ve lluvia de 0.6 mm y por tanto 63% de probabilidad), pero los litros los extrae de la salida determinista seca de AROME (0.0 mm).
     - Al mismo tiempo, el modelo Europeo (ECMWF IFS) pronosticaba orballu continuo (`WMO 51`) con 0.3 mm cada hora (~1 mm acumulado).
  2. *Resolución Algorítmica en `js/services/weatherApi.js`:*
     - Se añadió la precipitación y lluvia a la consulta paralela de ECMWF en el *Filtro de Seguridad y Consenso Cantábrico*.
     - Regla de Armonización: si la probabilidad horaria es significativa (`>= 30%`), el modelo cuantitativo en bruto no marca lluvia (`< 0.1 mm`), y ECMWF prevé lluvia real (`>= 0.1 mm`), el consenso adopta los milímetros y el código WMO de ECMWF (orballu / calabobos / lluvia ligera).
     - Resultado: a las 22:00 y 23:00, la app muestra de forma coherente 0.3 mm con código 51 (*Orbayu llixeru*) junto a su probabilidad correspondiente, eliminando la confusión visual para el usuario.
  3. *Versionado & Anti-Caché:*
     - Incremento oficial a `v1.1.29 🧪`.
     - Footer de `index.html` actualizado con badge `#app-version-badge` a `v1.1.29 🧪`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.29'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1129-rain-consensus'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.29`.

---

## 🚀 Versión Anterior: v1.1.28 🧪 — 2026-09-29
- **Algoritmo Híbrido de Consenso Cantábrico (AROME + ECMWF):**
  1. *Diagnóstico de Falso Claro Costero en Gijón:*
     - Lendo constató que al seleccionar Gijón en la app, se mostraba *Despejado / Soleyeru (`☀️`)* con 13-44% de nubes, mientras que la webcam de San Lorenzo mostraba un cielo mayoritariamente cubierto.
     - La comparativa multi-modelo reveló que AROME (1.3 km) simuló un claro numérico irreal en la bahía de Gijón, mientras que ECMWF IFS (9 km) marcaba con total fidelidad un 91% de nubosidad cubierta (`weather_code: 3`).
     - Al estar la app en modo `Auto Multi-Modelo` (`best_match`), Open-Meteo priorizaba a AROME por su malla ultra-fina, arrastrando el error a la interfaz.
  2. *Implementación Técnica del Consenso en Paralelo:*
     - En `js/services/weatherApi.js`, cuando el modelo activo es el modo Auto, se lanza en paralelo una consulta ligera (300 bytes) a ECMWF IFS (`weather_code,cloud_cover,direct_normal_irradiance,shortwave_radiation`).
     - Si se detecta divergencia crítica (`rawCloud < 50 && ecmwfCloud >= 75 && diff >= 30%`), la función `applyCantabricoConsensus` adopta la cobertura nubosa y los valores solares de ECMWF para el tiempo en vivo y las primeras 24 horas.
     - **Preservación Incondicional de Calibraciones:** Los detectores de *Resol / Sol tamizáu* (Ley 7 con umbral estricto de 450 W/m²), armonización QPF-PoP (Ley 8), rompientes de surf (Ley 9) y puertos de montaña operan de manera intacta sobre los datos armonizados.
  3. *Catálogo de Modelos & Versionado:*
     - Etiqueta del modelo `best_match` cambiada a `🧪 En Pruebas (Beta)`.
     - Incremento oficial a `v1.1.28 🧪`.
     - Footer de `index.html` actualizado con badge `#app-version-badge` a `v1.1.28 🧪`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.28'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1128-consensus-beta'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.28`.

---

## 🚀 Versión Anterior: v1.1.27 ☀️ — 2026-09-29
- **Calibración Estricta de Resol / Sol Tamizáu (Ley 7):**
  1. *Diagnóstico Físico y Delimitación entre "Nublado Claro" y "Resol":*
     - Lendo constató en vivo que tras el primer ajuste (190 W/m²), la app continuaba marcando *"Resol / Sol tamizáu"* bajo un cielo totalmente cubierto (100% nubes) pero de tonalidad clara y luminosa (capa de altostratos blanquecinos sin sol directo perceptible).
     - La consulta a los sensores numéricos en tiempo real en Piedras Blancas a las 17:10 CEST reveló: `weather_code: 3`, `cloud_cover: 100%`, `direct_normal_irradiance: 398.1 W/m²`, `diffuse_radiation: 180.7 W/m²`.
     - Explicación física: en un día de cielo despejado a las 17:00 en Asturias la radiación directa supera los 820 W/m². Un valor de ~398 W/m² representa una atenuación de más del 51%, típica de un manto nuboso uniforme y luminoso que no llega a proyectar sombras ni a encandilar la mirada.
     - Ajuste técnico estricto acordado: se elevaron los umbrales de radiación directa normal perpendicular (`direct_normal_irradiance`):
       - Primavera / Principios de otoño (Sep, Oct, Abr): **450 W/m²** (antes 190 W/m²).
       - Verano pleno (May, Jun, Jul, Ago): **500 W/m²** (antes 240 W/m²).
       - Otoño medio / Primavera temprana (Nov, Mar): **380 W/m²** (antes 170 W/m²).
       - Invierno (Dic, Ene, Feb): **320 W/m²** (antes 150 W/m²).
     - Resultado: a 398.1 W/m², la condición `dni >= 450` resulta falsa, catalogándose rigurosamente como **Nublado / Cubiertu** (`☁️`). El estado **Resol / Sol tamizáu** (`🌥️`) se reserva con total fidelidad para cuando el disco solar perfora la nubosidad con intensidad real.
  2. *Anti-Caché Obligatorio y Versionado:*
     - Incremento oficial a `v1.1.27 ☀️`.
     - Footer de `index.html` actualizado con badge `#app-version-badge` a `v1.1.27 ☀️`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.27'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1127-resol-strict'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.27`.

---

## 🚀 Versión Anterior: v1.1.26 ☀️ — 2026-09-29
- **Recalibración Inteligente del Resol Asturiano (Ley 7):**
  1. *Diagnóstico y Resolución del Falso Resol en Días Grises:*
     - Lendo observó en el terreno que durante una jornada predominantemente nublada y gris en Asturias, la aplicación etiquetaba de forma continua *"Resol / Sol tamizáu"* en el tiempo en vivo y pronósticos.
     - Causa identificada al consultar los datos numéricos de radiación de la estación: el umbral de radiación directa perpendicular (`direct_normal_irradiance`) estaba fijado en apenas 90 W/m² (menos del 10% del sol cenital). Además, una condición disyuntiva `|| uv >= thresholds.uvStrict` permitía que el índice UV difuso diurno (habitualmente entre 2.8 y 4.1 a mediodía) forzara la activación de resol con el sol completamente tapado.
     - Solución acordada en equipo: se elevó el umbral de radiación directa a **190 W/m²** en otoño y primavera (término medio calibrado para no asfixiar el resol periférico de mañana y tarde pero erradicar falsos positivos), y se eliminó el atajo por UV difuso, exigiendo imperativamente haz solar directo real (`hasDirectBeam`) para perforar el velo nuboso.
     - Escala estacional actualizada: Otoño/Primavera **190 W/m²**, Verano **240 W/m²**, Invierno **150 W/m²**.
  2. *Anti-Caché Obligatorio y Versionado:*
     - Incremento oficial a `v1.1.26 ☀️`.
     - Footer de `index.html` actualizado con badge `#app-version-badge` a `v1.1.26 ☀️`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.26'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1126-resol-calibration'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.26`.

---

## 🚀 Versión Anterior: v1.1.25 📱 — 2026-09-29
- **Blindaje Anti-Desborde y Simetría en Arterias a la Meseta (Leyes 11 y 14):**
  1. *Diagnóstico y Resolución del Corte Lateral Derecho:*
     - Lendo detectó que en pantallas móviles, las tarjetas de las dos arterias principales hacia la meseta (*Autopista del Huerna AP-66* y *Puerto de Pajares N-630*) mostraban el borde redondeado izquierdo normal, pero se desbordaban por la derecha, quedando amputadas y sin margen respecto al borde de la pantalla.
     - Causa identificada: un bloque CSS duplicado residual en `css/components.css` (líneas 3382 a 3476) forzaba la cuadrícula a `minmax(280px, 1fr)` sin contención `box-sizing` ni media query móvil adecuada.
     - Solución aplicada: se purgó el bloque residual de 98 líneas, se blindó `.passes-arteries-grid` para colapsar en 1 columna limpia en dispositivos móviles (`@media (max-width: 600px)`), y se dotó a `.pass-artery-card` de `width: 100%; max-width: 100%; box-sizing: border-box; overflow: hidden;`.
  2. *Anti-Caché Obligatorio y Versionado:*
     - Incremento oficial a `v1.1.25 📱`.
     - Footer de `index.html` actualizado con badge `#app-version-badge` a `v1.1.25 📱`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.25'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1125-arteries-anti-overflow'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.25`.

---

## 🚀 Versión Anterior: v1.1.24 📱 — 2026-09-29
- **Puertos de Montaña sin Truncamientos en Móvil & Armonía Visual (Leyes 11 y 14):**
  1. *Diagnóstico y Resolución del Truncamiento en Sectores de Montaña:*
     - En la vista de puertos de montaña (`#mountain-passes-view`), las tarjetas de sectores (*Centro y Valles Mineros*, *Oriente y Picos de Europa*, *Occidente*) utilizaban un contenedor rígido horizontal de una sola línea (`flex-wrap: nowrap`) con `white-space: nowrap; text-overflow: ellipsis;`.
     - La cápsula de estado (`🟢 Tráfico Normal / Abierto`) consumía ~160px, dejando únicamente ~100px para el título en pantallas móviles (320-380px). Esto provocaba que todos los nombres se cortaran como `Puerto...`, `Alto de...` o `Lagos...` y la carretera como `AS-112 / ...`.
     - Se reestructuró `.pass-card` y su interior `.pass-card-content` con `flex-wrap: wrap`, permitiendo que el nombre del puerto (`.pass-name`) y la información de ruta (`.pass-alt`) cuenten con `white-space: normal`, eliminando cualquier tipo de truncamiento.
  2. *Cápsula de Tráfico y Armonía Liquid Glass:*
     - En pantallas reducidas, la cápsula de estado fluye de manera natural sin comprimir el texto y adopta fondo y borde luminiscente reactivos al estado (`background: ${p.color}22; color: ${p.color}; border: 1px solid ${p.color}66;`), armonizando con las tarjetas de Arterias Principales (AP-66 y N-630) según la Ley 14.
  3. *Depuración de Reglas CSS Duplicadas:*
     - Eliminados dos bloques duplicados obsoletos de `.pass-card` y `.passes-grid` en `css/components.css` (líneas 3478 y 4007) que provocaban anomalías en la cascada de estilos.
  4. *Anti-Caché Obligatorio y Versionado:*
     - Incremento oficial a `v1.1.24 📱`.
     - Footer de `index.html` actualizado con badge `#app-version-badge` a `v1.1.24 📱`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.24'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1124-mountain-passes-ergonomics'` en `sw.js`.
     - CSS y módulos JS sincronizados con `?v=1.1.24`.

---

## 🚀 Versión Anterior: v1.1.23 📱 — 2026-09-28
- **Desacoplamiento en Dos Botones Dedicados (Mañana y Tarde) & Viento Anti-Truncado:**
  1. *Dos Botones Independientes para Mañana y Tarde:*
     - A propuesta y decisión en equipo con Lendo, se suprime la caja estrecha compartida y se divide en dos botones dedicados completos (`.d-daypart-btn.morning` y `.d-daypart-btn.afternoon`).
     - Fila superior del botón: Tag de franja (`🌅 MAÑANA` / `🌇 TARDE`) a la izquierda y badge de pluviometría (`0.5 mm` / `0 mm`) a la derecha.
     - Fila inferior del botón: Icono SVG de alta fidelidad (24px) y texto meteorológico íntegro a todo el ancho (`white-space: normal`), eliminando para siempre truncamientos como `Nu...` u `O...`.
  2. *Corrección de Escala en Viento y Rachas:*
     - Reducida la tipografía de `.u-m-val` y `.u-m-sub` en pantallas pequeñas a `0.78rem` y `0.68rem`, logrando que `18 km/h` y `Rachas 28` entren sin recortar a `18 k...` o `Racha...`.
  3. *Anti-Caché Obligatorio y Versionado:*
     - Incremento oficial a `v1.1.23 📱`.
     - Footer de `index.html` actualizado con badge `#app-version-badge` a `v1.1.23 📱`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.23'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1123-dual-daypart-buttons'` en `sw.js`.
     - CSS y módulos vinculados a `?v=1.1.23`.

---

## 🚀 Versión Anterior: v1.1.22 📱 — 2026-09-28
- **Ergonomía Móvil Anti-Desborde y Blindaje Visual en Pronósticos:**
  1. *Optimización de la Cabecera de Día (Mañana y Tarde):*
     - En `forecastView.js`, se extrae el término primario del cielo (`morningLabel`, `afternoonLabel`) para garantizar una única línea horizontal impecable, sin saltos a 3 líneas quebradas ni colisión con el botón de milímetros (`0 mm`).
     - Se preserva el rótulo bilingüe completo (`Nublado / Cubiertu`) en el tooltip `title`.
     - En CSS, se aplica `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0;` a `.d-daypart-text`.
  2. *Supresión de Truncados en Métricas Diarias:*
     - Pluviómetro compacto `${rain} mm` (en vez de `mm total`), erradicando los molestos puntos suspensivos como `0.1 mm ...`.
     - Escala UV abreviada a `Mod.` (en vez de `Moderado`), impidiendo cortes como `Moder...`.
     - Mejorados los paddings y flex-wrap de las pastillas `.u-metric-item`.
  3. *Anti-Caché Obligatorio y Versionado:*
     - Incremento oficial a `v1.1.22 📱`.
     - Footer de `index.html` actualizado con badge `#app-version-badge` a `v1.1.22 📱`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.22'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1122-mobile-ergonomics'` en `sw.js`.
     - CSS y módulos vinculados a `?v=1.1.22`.

---

## 🚀 Versión Anterior: v1.1.21 ⚡ — 2026-09-28
- **Restauración y Corrección en Pronóstico Extendido a 10 Días:**
  1. *Diagnóstico y Subsanación Técnica:*
     - Al incorporar la detección de nieve en la métrica del pluviómetro dentro de `js/components/forecastView.js`, una variable no declarada (`dailyWeather`) y un índice erróneo (`i` en vez de `d`) causaban una excepción en tiempo de ejecución (`ReferenceError: dailyWeather is not defined`).
     - Se reemplazó por la constante `isSnowDay = morningWeather.isSnow || afternoonWeather.isSnow || (daily.snowfall_sum && daily.snowfall_sum[d] > 0)`, evaluada de forma limpia y robusta sobre el índice `d`.
  2. *Verificación Sintética:*
     - Comprobada mediante ejecución directa en Node.js, generando satisfactoriamente las tarjetas extendidas sin errores.
  3. *Anti-Caché Obligatorio y Versionado:*
     - Incremento oficial a `v1.1.21 ⚡`.
     - Footer de `index.html` actualizado con badge `#app-version-badge` a `v1.1.21 ⚡`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.21'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1121-forecast-fix'` en `sw.js`.

---

## 🚀 Versión Anterior: v1.1.20 ✨ — 2026-09-28
- **Consolidación Oficial de la Colección «Futuro Clásico» (Vanguardia 2.5D):**
  1. *Blindaje de Marca y Política Google Play Store:*
     - A propuesta y decisión expresa de Lendo para evitar riesgos con marcas comerciales registradas ajenas en Google Play Store, se rebautiza oficialmente la nueva colección estética como **«Futuro Clásico»** (`futuroClasico`).
     - Módulo centralizado en `js/utils/weatherFuturoIcons.js` exportando `getFuturoWeatherSvg`.
  2. *Características Artísticas y Técnicas Preservadas al 100%:*
     - Fusión magistral entre los iconos universales clásicos y la alta vanguardia digital.
     - Laca satinada multicapa, volúmenes 2.5D, escala de lluvia real graduada en mm/h (1 gota en Orbayu, 3 en Moderada, 5 vectores densos sin rayo en Bastinazu), pedriscu de hielo real (`hail`), aguanieve (`sleet`), graduación de nieve en 3 niveles y Resol asturiano con manto estratiforme translúcido.
  3. *Integración Completa:*
     - Selector modal `#icon-themes-modal` con tarjeta `✨ Futuro Clásico` (`#theme-card-futuro`, `data-theme="futuroClasico"`).
     - Previsualizaciones vectoriales dinámicas en vivo.
     - Retrocompatibilidad transparente en `renderWeatherIconHtml`.
  4. *Anti-Caché Obligatorio y Versionado:*
     - Incremento oficial a `v1.1.20 ✨`.
     - Footer de `index.html` actualizado con badge `#app-version-badge` a `v1.1.20 ✨`.
     - Inyectado bloque de novedades en `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.20'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1120-futuro-clasico'` en `sw.js`.

---

## 🚀 Versión Anterior: v1.1.19 🚘☀️ — 2026-09-28
- **Nueva Colección de Iconos «Tesla Clásico» (Automotive Weather UI) & Perfeccionamiento del Selector de Iconos:**
  1. *Filosofía y Lenguaje Visual:*
     - Fusión armónica entre los iconos universales clásicos (reconocibles al instante, familiares) y la alta ingeniería visual automotriz de Tesla (laca satinada multicapa, volúmenes 2.5D, luces especulares pulidas y degradados continuos).
     - Fiel al tiempo real (cero fantasía: se descartaron diamantes o lásers de ciencia ficción; se implementó agua pura, hielo sólido denso, nieve cristalina y velo estratiforme real).
  2. *Cobertura Meteorológica Integral en `js/utils/weatherTeslaIcons.js`:*
     - `clear-day` / `sun`: Sol esférico dorado con volumen 2.5D, corona de 8 ejes simétricos pulidos, halo solar tenue y brillo especular elíptico superior.
     - `clear-night` / `moon`: Luna creciente nítida con textura de relieve y halo nocturno.
     - `mostly-clear-day` / `mostly-clear-night`: Sol o luna dominante con nubecita satinada baja.
     - `partly-cloudy-day` / `partly-cloudy-night`: Nube voluminosa frontal con astro emergiendo lateralmente.
     - `resol`: Resol asturiano con halo solar expansivo difuminado, disco solar deslumbrante atravesando un manto estratiforme translúcido fidedigno y nubecita de horizonte.
     - `cloudy`: Doble nube aerodinámica con gradiente blanco satinado y sombra ambiental.
     - `fog`: Nube suave y 3 barras flotantes aerodinámicas con gradiente horizontal.
     - `drizzle`: Orbayu con 1 sola gota cristalina central con punto de luz especular.
     - `rain`: Lluvia moderada con 3 gotas paralelas de agua limpia.
     - `heavy-rain`: Bastinazu torrencial con nube de tormenta cargada y 5 vectores densos inclinados de agua sin rayo.
     - `storm`: Tormenta eléctrica con nube densa, rayo de oro eléctrico quebradizo y 2 gotas.
     - `hail`: Pedriscu de hielo real con bolas esféricas densas sombreadas y vectores de impacto rápido.
     - `sleet`: Aguanieve con gotas de agua líquida y copos de nieve cayendo a la vez.
     - `snow-light`: Falispos con 1 copo delicado de 6 brazos.
     - `snow`: Nieve moderada con 3 copos limpios.
     - `heavy-snow`: Nevadona con nube ártica fría y 5 copos densos escalonados.
  3. *Integración en el Selector y Sistema de Temas:*
     - Incorporadas las tarjetas de *Tesla Clásico* (`#theme-card-tesla`) y *Liquid Glass 3D* (`#theme-card-glass`) en el modal `#icon-themes-modal`.
     - Generación dinámica de previsualizaciones SVG en vivo en `js/app.js`.
     - Corrección de mapeo en `themeNames` de la barra de navegación.
  4. *Anti-Caché Obligatorio y Versionado:*
     - Incremento oficial de versión a `v1.1.19 🚘☀️`.
     - Actualizado badge en footer de `index.html`.
     - Inyectado bloque de novedades en modal `#changelog-modal`.
     - `CURRENT_APP_VERSION = '1.1.19'` en `js/app.js`.
     - `CACHE_NAME = 'meteoasturlode-v1119-tesla-icons'` en `sw.js`.

---

## 🚀 Versión Anterior: v1.1.18 ❄️🧊 — 2026-09-28
- **Granizo, Aguanieve y Graduación de Nieve en la Ecuación Pluviométrica:**
  1. *Física de la Precipitación Sólida y Mixta:*
     - **Granizo / Pedriscu (`hail`):** Tratamiento genérico contundente. Icono con piedras anguladas de hielo cayendo a gran velocidad, respondiendo a códigos WMO 89, 90 (chubascos de granizo), 96, 99 (tormentas con granizo) y 77 (granizo menudo). Pastilla `.has-hail` en previsiones.
     - **Aguanieve (`sleet`):** Gotas líquidas y copos de nieve cayendo simultáneamente bajo códigos WMO 68, 69, 83, 84 o mezcla física en pluviómetro con temperaturas de cota. Pastilla `.has-sleet` turquesa.
     - **Nieve Graduada (`snow-light`, `snow`, `heavy-snow`):**
       - Falispos / Nevada ligera (< 0.8 mm equiv. o WMO 71/85): 1 copito sutil.
       - Nevada moderada (0.8 a 2.4 mm equiv. o WMO 73): 3 copos regulares.
       - Nevadona fuerte / Copiosa (>= 2.5 mm equiv. o WMO 75/86): 5 copos densos con abrigo en cómic astur. Pastillas `.has-snow` y `.heavy-snow`.
  2. *Cobertura en los 5 Temas Gráficos:*
     - Implementado en Cómic Astur, Pixel Art, Neón Cyber, Dibujo a Mano / Acuarela y Liquid Glass 3D.
  3. *Métricas y Previsiones Diarias:*
     - `getDaypartWeather` en `forecastView.js` detecta granizo, aguanieve y nieve en el tramo de mañana o tarde sin forzarlos a códigos de lluvia líquida.
     - En días con predominio de nieve, el icono del acumulado diario se adapta automáticamente a `❄️`.
  4. *Anti-Caché Obligatorio:*
     - `CACHE_NAME` en `sw.js`: `meteoasturlode-v1118-snow-hail`.
     - Query strings: `?v=1.1.18`.

---

## 🚀 Versión Anterior: v1.1.17 💧⛅ — 2026-09-28
- **Versionado Obligatorio y Salto Incondicional de Changelog (Reforma de Ley Específica 1):**
  - Se deroga definitivamente la salvedad de Google Play en `AGENTS.md` (Parte II, Ley 1). A partir de ahora, toda mejora o cambio en MeteoAstur Lode incrementa obligatoriamente el ciclo oficial de versión, actualiza el modal HTML `#changelog-modal` e inyecta la nueva versión en `CURRENT_APP_VERSION` para garantizar que el aviso de novedades salte de forma transparente e inequívoca en la pantalla del usuario.
- **Escala Hidrológica Visual de Lluvia & Desglose Pluviométrico Mañana/Tarde:**
  1. *Física de la Intensidad Pluviométrica:*
     - Reconocimiento de que en la climatología asturiana 0.2 mm/h es un orbayu que no moja, mientras que >= 2.5 mm/h es un bastinazu torrencial.
     - Gradación en 3 escalones de lluvia + 1 de tormenta:
       - **💧 Orbayu / Gotas ligeras (0.1 a 0.4 mm/h):** Nube con 1 sola gota central.
       - **🌧️ Lluvia moderada (0.5 a 2.4 mm/h):** Nube con 3 gotas regulares.
       - **🌧️🌊 Lluvia fuerte / Bastinazu (>= 2.5 mm/h o tramo >= 3.5 mm):** Nube cargada con cortina densa de 5 gotas con fuerza, sin rayo.
       - **⛈️ Tormenta eléctrica:** Nube oscura con lluvia y rayo (códigos 95, 96, 99).
  2. *Pluviómetro Desglosado en Previsiones (Mañana vs. Tarde):*
     - Desglose del volumen cuantitativo (mm) en las pastillas de 🌅 Mañana (08:00 - 14:00) y 🌇 Tarde (14:00 - 21:00) junto a su icono específico graduado según el pico horario de lluvia.
     - La métrica general de la tarjeta diaria muestra el acumulado total de 24h (`X.X mm total`).
  3. *Cobertura en los 5 Temas Gráficos:*
     - Adaptado en Cómic Astur, Pixel Art, Neón, Boceto y Liquid Glass.
  4. *Anti-Caché Obligatorio:*
     - `CACHE_NAME` en `sw.js`: `meteoasturlode-v1117-rain-scale`.
     - Query strings en `index.html`, `currentCard.js`, `app.js`, `forecastView.js` y `weatherIcons.js`: `?v=1.1.17`.

- **Diferenciación de los 4 Estados Solares & Icono Propio de Resol Asturiano:**
  1. *Física y Filosofía Meteorológica:*
     - Distinción tajante entre Claros (sol directo por hueco azul entre cúmulos) y Resol (cielo tomado por velo blanquecino de altoestratos/cirros que filtra y difumina la luz solar directa quemando y deslumbrando).
     - Cuatro estados visualmente independientes:
       - **☀️ Soleado (`clear-day`):** Sol radiante sin nubes.
       - **🌤️ Mayormente soleado (`mostly-clear-day` / WMO 1):** Sol dominante central con nubecita pequeña en esquina inferior derecha.
       - **⛅ Parcialmente nublado / Claros (`partly-cloudy-day` / WMO 2):** Nube grande con sol asomando entre claros.
       - **🌥️ Resol / Sol tamizáu (`resol`):** Sol con halo dorado difuso + manto nuboso semitransparente que deja ver el disco solar por detrás + nube pequeña sólida.
  2. *Cobertura Universal en Todos los Temas:*
     - Implementado en `weatherAsturIcons.js` (Cómic Astur con expresiones y coloretes), `weatherPixelIcons.js` (píxeles translúcidos), `weatherNeonIcons.js` (resplandor velado neón), `weatherSketchIcons.js` (acuarela y trazos a pluma) y `weatherGlassIcons.js` (velo 3D translúcido).
  3. *Unificación de Tema Recomendado & Selector de Iconos:*
     - Activación de Emojis Emotivos (Cómic Astur) como predeterminado en `storage.js`.
     - Actualización del modal de selección de iconos en `index.html` y `js/app.js` exhibiendo los 4 estados solares para comparativa inmediata.
  4. *Anti-Caché Obligatorio:*
     - `CACHE_NAME` en `sw.js`: `meteoasturlode-v243-resol-icons`.
     - Query strings en `index.html`, `currentCard.js`, `app.js` y `weatherIcons.js`: `?v=1.1.16-resol-v243`.

- **Motor de Rendimiento Adaptativo & Modo Economía (Performance Optimizer):**
  1. *Detector Automático de Hardware Lento (`js/utils/gyroGlass.js` → `detectLowPerf()`):*
     - Evalúa tres señales al arranque: `hardwareConcurrency <= 4` (núcleos de CPU), `deviceMemory <= 2 GB` (RAM, solo Chrome/Android) y benchmark sintético de 200.000 iteraciones `Math.sqrt` (~2ms en flagship, ~35ms en Snapdragon 430).
     - Si cualquiera de las señales indica hardware lento, añade la clase `html.low-perf` para que CSS y JS reaccionen coordinadamente sin repetir el benchmark.
     - Diagnóstico visible en consola de beta testers: `[GyroGlass] Modo Economía activado → núcleos: 4, RAM: 2 GB, benchmark: 38.2 ms`.
  2. *Throttling Adaptativo del Bucle Giroscópico:*
     - Modo potente: 60fps libres, blur dinámico 18-36px, idle breathing vivo (oscilación sinusoidal `Math.sin/cos`).
     - Modo economía: 30fps (presupuesto 33ms/frame), blur fijo 14px (elimina repaints continuos del `backdrop-filter`), idle breathing desactivado (posición central fija x=50%, y=30%), ángulo de inclinación reducido a ±3° (vs. ±5.5°).
  3. *Canvas de Partículas Climáticas Escalado Automáticamente (`js/app.js`):*
     - `prefers-reduced-motion`: canvas desactivado completamente si el SO lo solicita.
     - `perfScale = 0.6`: todos los modos reducen partículas al 60% en modo economía (rain 60→36, storm/heavy-rain 80→48, stars 75→45, snow 60→36, fog 22→13, clouds 45→27).
     - Eliminado `ctx.shadowBlur` en `sun-motes`, `stars` y `snow`: en GPUs antiguas (Adreno 3xx, Mali-T6xx) el shadowBlur fuerza renderizado por software desactivando la aceleración hardware. Sustituido por ligero incremento de alpha sin coste.
  4. *CSS Modo Economía (`css/components.css` & `css/main.css`):*
     - Regla `html.low-perf .{card}`: `backdrop-filter: blur(12px) saturate(150%)` (vs. 24px dinámico), `transform: none` (paralaje desactivado), `box-shadow` estático, `transition` mínima.
     - Pseudo-elemento `::after` (halo óptico prismático) oculto con `display: none` en modo economía para eliminar la capa compositing extra.
     - `will-change: transform` añadido al bloque principal de tarjetas glass y `.app-header` para promoverlos a capas GPU independientes y reducir el área de repaint en cada frame.
  5. *Blindaje de Caché y Versión:*
     - Versión oficial `v1.1.16 ⚡`.
     - `CACHE_NAME` actualizado a `meteoasturlode-v242-perf-opt` en `sw.js`.
     - Query strings de scripts, módulos y CSS sincronizados a `?v=1.1.16-perf-opt-v242`.
     - Badge del pie y modal de novedades actualizados a `v1.1.16 ⚡`.

---

## 🚀 Versión Anterior Oficial: v1.1.15 — 2026-09-27

- **Cristal Óptico Real & Desenfoque Dinámico Reactivo (Apple True Glass):**
  1. *Diagnóstico Fiel & Erradicación de Bandas Sintéticas:*
     - Lendo señaló con acierto que el efecto anterior "solo hacía hacer una imagen con reflejos" (una capa gráfica con degradados de color superpuesta).
     - Se eliminaron por completo las líneas diagonales de color en `::after`. Se sustituyeron por un halo especular puramente difuso en blanco/zafiro suave con `mix-blend-mode: overlay` y `z-index: 1`, evitando que la luz oculte o coloree artificialmente los textos e iconos.
  2. *Desenfoque Dinámico al Giro (`--glass-blur`):*
     - Vinculación del factor de inclinación con el radio de desenfoque: el `backdrop-filter: blur(var(--glass-blur))` varía fluidamente de 18px a 36px al mover el móvil, logrando la sensación física real de condensación/esmerilado óptico en ángulos rasantes.
  3. *Inyección de Orbes de Contraste en Fondo:*
     - Para que el desenfoque `backdrop-filter` sea visualmente perceptible en pantallas oscuras, se añadieron orbes lumínicos atmosféricos en el fondo (`body`) que se emborronan activamente al quedar bajo las tarjetas, haciendo tangible el volumen del cristal.
  4. *Blindaje de Caché y Versión:*
     - Versión oficial `v1.1.15 📱✨`.
     - `CACHE_NAME` actualizado a `meteoasturlode-v241-real-glass` en `sw.js`.
     - Query strings de scripts, módulos y CSS sincronizados a `?v=1.1.15-real-glass-v241`.

---

 
## 🚀 Versión Anterior Oficial: v1.1.14 — 2026-09-27
 
- **Panel Unificado Apple Liquid Glass en Todas las Tarjetas:**
  1. *Feedback y Resolución Universal:*
     - Lendo apreció la calidad del efecto Liquid Glass ("precioso"), pero detectó con precisión que solo afectaba a la primera tarjeta (`.hero-weather-card`).
     - Se unificó el motor de estilos en `css/components.css` y `css/main.css` aplicando el conjunto de refracción líquida, barrido diagonal prismático, manto de dispersión esmerilada (`--glass-mist`), bisel interno dinámico (`Edge Bloom`) y micro-paralaje 2D a todas las tarjetas de la app: `.app-header`, `.hero-weather-card`, `.forecast-block`, `.sensor-card`, `.chart-card`, `.marine-card`, `.mountain-card`, `.astronomy-card`, `.surf-card` y `.laundry-card`.
  2. *Sincronía Óptica Coherente:*
     - Todas las tarjetas reaccionan coordinadas al unísono con el giroscopio y el deslizamiento táctil, creando una experiencia inmersiva fluida en toda la navegación.
  3. *Blindaje de Caché y Versión:*
     - Versión oficial `v1.1.14 📱✨`.
     - `CACHE_NAME` actualizado a `meteoasturlode-v240-all-glass` en `sw.js`.
     - Query strings de scripts, módulos y CSS sincronizados a `?v=1.1.14-all-glass-v240`.
 
---
 
## 🚀 Versión Anterior Oficial: v1.1.13 — 2026-09-27

- **Barrido Óptico de Refracción Líquida & Halo Reactivo (Apple Liquid Glass):**
  1. *Fidelidad al Lenguaje Apple Liquid Glass:*
     - Lendo precisó la dinámica visual observada en iOS: un barrido óptico que emerge al girar y simula el desenfoque y la refracción de una lente de cristal físico.
     - Se sustituyó el antiguo foco circular estático por una franja diagonal ancha de refracción prismática (115° con espectro cian, blanco puro y violeta) que barre suavemente toda la tarjeta (-10% a 110%) interactuando con el giroscopio y el tacto.
  2. *Bisel de Borde Interior Reactivo (Edge Bloom):*
     - Desplazamiento dinámico del `box-shadow: inset` en tiempo real según los ejes de inclinación: al girar hacia un lateral, el bisel proyecta un halo de 24px de desenfoque de luz hacia el interior, creando la sensación de grosor y corte pulido de un zafiro físico.
  3. *Blindaje de Caché y Versión:*
     - Versión oficial `v1.1.13 📱✨`.
     - `CACHE_NAME` actualizado a `meteoasturlode-v239-liquid-glass` en `sw.js`.
     - Query strings de scripts, módulos y CSS sincronizados a `?v=1.1.13-liquid-glass-v239`.

---

## 🚀 Versión Anterior Oficial: v1.1.12 — 2026-09-27

- **Cristal Líquido & Dispersión Esmerilada Reactiva (Frosted Glass Sheen):**
  1. *Diagnóstico & Desbloqueo GPU:*
     - Lendo constató con precisión que el haz de luz sí funcionaba, pero el desenfoque no se apreciaba en móvil.
     - Se identificó la incompatibilidad de Chromium y WebKit que cancelaba `backdrop-filter` al tener transformaciones 3D (`perspective` / `rotateX`). Se sustituyó por micro-paralaje suave 2D (`translate`), liberando el desenfoque en la GPU móvil.
  2. *Manto de Dispersión Esmerilada Reactivo (`--glass-mist`):*
     - Modulación dinámica de la densidad óptica del cristal: a mayor ángulo de giro del móvil, el cristal dispersa un manto lechoso zafiro más denso (`rgba(255, 255, 255, calc(0.20 + var(--glass-mist) * 0.22))`), recreando fielmente la dispersión interna de la luz de un cristal esmerilado de alta gama.
     - Incremento del desenfoque base a `blur(24px) saturate(190%)` con bisel de luz tallada Apple (`inset 0 1px 1px rgba(255, 255, 255, 0.45)`).
  3. *Orbes de Alto Contraste:*
     - En `cloudy-night`, focos radiales zafiro y cian potenciados y centrados detrás de la tarjeta principal para que el desenfoque refracte luz y volumen reales.
  4. *Blindaje de Caché y Versión:*
     - Versión oficial `v1.1.12 📱✨`.
     - `CACHE_NAME` actualizado a `meteoasturlode-v238-super-glass` en `sw.js`.
     - Query strings de scripts, módulos y CSS sincronizados a `?v=1.1.12-glass-v238`.

---

## 🚀 Versión Anterior Oficial: v1.1.11 — 2026-09-27

- **Perfeccionamiento Apple Liquid Glass & Disparo Prioritario de Novedades (Changelog Auto-Prompt):**
  1. *Diagnóstico & Corrección del Auto-Prompt:*
     - Lendo constató que el modal de novedades no saltaba al actualizar. La causa radicaba en que el cliente móvil ya había guardado `1.1.10` en `localStorage` en la prueba previa, requiriendo un incremento oficial a `v1.1.11` para que el comparador `lastSeen !== CURRENT_APP_VERSION` forzara el salto automático mandatorio (Ley 13).
     - Además, se reubicó la llamada `checkChangelogAutoPrompt()` al principio inmediato del arranque (400 ms) sin esperar a las peticiones asíncronas de red de `loadWeather()`.
  2. *Refinamiento Integral de Cristal Líquido Apple:*
     - Reflejo especular blanco zafiro en capa superior sin `overlay` que absorba la luz en fondos oscuros.
     - Bisel de luz interior tallada (`inset 0 1px 1px rgba(255, 255, 255, 0.35)`).
     - Triple entrada: giroscopio, gestos táctiles directos (`touchmove`), ratón y respiración viva oscilatoria (*idle breathing*).
     - Extensión del efecto a todas las tarjetas de sensores (`.sensor-card`).
     - Orbes atmosféricos difusos de luz lunar y zafiro en los fondos nocturnos.
  3. *Blindaje de Caché y Versión:*
     - Versión oficial `v1.1.11 📱✨`.
     - `CACHE_NAME` actualizado a `meteoasturlode-v237-apple-glass` en `sw.js`.
     - Query strings de scripts, módulos y CSS sincronizados a `?v=1.1.11-glass-v237`.

---

## 🚀 Versión Anterior Oficial: v1.1.10 — 2026-09-27

- **Cristal Líquido Dinámico (Apple Liquid Glass Giroscopio) & Noche Zafiro Profundo:**
  1. *Apreciación & Petición de Lendo:*
     - Lendo observó que la noche nublada se veía "descolorida y sosa" al pasar todo por los ojos, y propuso implementar el efecto Apple Liquid Glass que reacciona con blur y reflejo especular al girar el móvil.
     - En el primer test en móvil, el efecto quedaba enmascarado por la absorción del `mix-blend-mode: overlay` en fondos oscuros y la ausencia de `touchmove`. Lendo autorizó aplicar el perfeccionamiento integral.
  2. *Motor Físico Giroscópico & Táctil (`js/utils/gyroGlass.js` & `css/components.css`):*
     - Soporte triple de interacción: lectura en tiempo real de `DeviceOrientationEvent` (inclinación lateral `gamma` y frontal `beta` de la mano), gestos táctiles directos en pantalla (`touchmove`), ratón en PC y respiración ambiental viva en reposo (*idle breathing* oscilatorio cuando el teléfono reposa sobre una mesa).
     - Manejador de permisos automático para iOS 13+ Safari (`DeviceOrientationEvent.requestPermission`) al primer toque.
     - Destello especular puro sin modos de fusión sustractivos en capa superior (`z-index: 5; pointer-events: none;`) con bisel interior de luz tallada Apple (`inset 0 1px 1px rgba(255, 255, 255, 0.35)`).
     - Extensión del efecto a todas las tarjetas de sensores (`.sensor-card`) para una coherencia visual de panel único de zafiro en toda la interfaz.
     - Micro-blur cristalino de alta transmitancia (`blur(12px) saturate(145%)`), otorgando relieve 3D sin tapar las partículas vivas animadas (fiel cumplimiento de la Ley 5).
  3. *Tema Atmosférico Nocturno `cloudy-night` con Orbes de Luz (`css/weather-themes.css` & `js/app.js`):*
     - Sustitución del fondo plano gris por una cúpula zafiro/cobalto nocturna enriquecida con orbes difusos de luz ambiental (luz lunar cian `rgba(56, 189, 248, 0.22)` e índigo `rgba(99, 102, 241, 0.18)`), aportando a la refracción del cristal la textura luminosa típica de Apple visionOS e iOS.
  4. *Blindaje de Caché y Versión:*
     - Versión oficial `v1.1.10 📱✨`.
     - `CACHE_NAME` actualizado a `meteoasturlode-v236-apple-glass` en `sw.js`.
     - Query strings de scripts, módulos y CSS sincronizados a `?v=1.1.10-glass-v236`.

---

## 🚀 Versión Anterior Oficial: v1.1.9 — 2026-09-27

- **Detector de Heladas y Placas de Hielo en Asfalto ("Alerta Xelu") & Monitor de Polen (AQI):**
  1. *Concepto & Solicitud de Lendo:*
     - Lendo aprobó abordar simultáneamente dos funciones de alto valor: el detector de heladas/hielo en carretera para la seguridad vial y el enriquecimiento de la tarjeta de Calidad del Aire con el monitor polínico.
     - En el afinado de diseño, Lendo instruyó prescindir de la palabra "escarcha" (centrándose en "Riesgo de Helada") e ideó una diferenciación semafórica vial: **amarillo ámbar para el riesgo de helada preventivo** y **rojo de emergencia para las placas de hielo severas**.
  2. *Motor Físico del Xelu (`js/utils/xeluDetector.js`):*
     - Variables termodinámicas: T <= 2.5 °C, depresión del punto de rocío <= 2.0 °C, calma de viento (<= 12 km/h) en horario nocturno y matinal (21h a 10h), o mínima prevista <= 2.0 °C.
     - Diagnósticos: 🟡 ❄️ *Riesgo de Helada • Alerta Xelu* (firme húmedo y asfalto deslizante en marco amarillo ámbar pulsante) y 🔴 🧊 *Alerta de Placas de Hielo en Asfalto* (hielo negro invisible en calzada en marco rojo de peligro crítico).
     - Consejos específicos de conducción vial en zonas umbrías, puentes y curvas sombrías.
     - Diseño semafórico vial (`.xelu-banner.moderate` en ámbar y `.xelu-banner.severe` en rojo): bordes translúcidos de 1.5px, pastillas métricas ergonómicas redondas a 999px y botón didáctico `💡 ¿Por qué ocurre?`.
     - Cumplimiento de la **Doctrina Constitucional 12** con soporte de simulacro controlado (`?test=xelu`, `?test=helada` y `?test=hielo`).
  3. *Monitor de Polen en Calidad del Aire (`js/services/weatherApi.js` & `js/components/currentCard.js`):*
     - Ampliación de la consulta a Copernicus CAMS Open-Meteo con alérgenos: Gramíneas, Abedul, Aliso, Olivo y Ambrosía sin coste de API ni llamadas extra.
     - Fila compacta integrada dentro de la tarjeta de Calidad del Aire con semáforo por concentración (Nulo 🟢, Bajo 🟢, Moderado 🟡, Alto 🔴).
     - Sin saturar la pantalla con nuevas tarjetas sueltas (Doctrina Constitucional 11).
  4. *Suite Didáctica de Salud Ambiental & Heladas (`js/utils/weatherExplanations.js`):*
     - Nuevas guías didácticas completas para `xelu` (física de la helada, inversión térmica en valles asturianos, hielo negro y precauciones al volante) y `aqi` (partículas finas y aerobiología).
  5. *Blindaje de Caché y Versión:*
     - Versión oficial actualizada a `v1.1.9 ❄️🌿` en badge del pie (`#app-version-badge`), modal de novedades y registros.
     - `CACHE_NAME` actualizado a `meteoasturlode-v234-changelog-119` en `sw.js`.
     - Inclusión de `./js/utils/xeluDetector.js` en `STATIC_ASSETS`.
     - Query strings de scripts y CSS sincronizados a `?v=1.1.9-modal-v234`.
  6. *Reforma Constitucional - Ley 13 (Doctrina del Changelog Universal y Auto-Prompt Obligatorio):*
     - Autorizada solemnemente por Lendo mediante PIN criptográfico maestro de 4 cifras (`2796`).
     - Incorporación del Artículo 13 a la Constitución Suprema: obligación imperativa de modal de changelog interactivo y disparo automático (`checkChangelogAutoPrompt()`) con retardo de 800ms ante cambios de versión, centralizando la variable `CURRENT_APP_VERSION` para erradicar versiones hardcoded.

---

## 🚀 Versión Anterior Oficial: v1.1.8 — 2026-09-27

- **Jerarquía Visual & Tipografía en Ubicaciones y Parroquias:**
  1. *Apreciación & Petición de Lendo:*
     - Lendo observó que en concejos como Castrillón, la cabecera mostraba todo al mismo tamaño: *Castrillón (Piedras Blancas / Salinas)*.
     - Solicitó mantener el nombre del concejo principal con su tamaño actual, pero hacer que el texto entre paréntesis (las parroquias y núcleos de referencia) fuera más pequeño y subordinado visualmente.
  2. *Implementación Técnica (`js/components/currentCard.js` & `css/components.css`):*
     - Creación del parser `formatLocationTitle(name)` que extrae limpiamente cualquier sufijo entre paréntesis envolviéndolo en `<span class="location-locality">`.
     - Estilizado de `.location-locality`:
       - `font-size: 0.90rem;` (~33% más reducido que el título noble de `1.35rem`).
       - `font-weight: 600;` (seminegrita equilibrada frente al `800` del concejo).
       - `color: #cbd5e1;` (tono atenuado de texto secundario).
       - `display: inline-block; margin-left: 4px; vertical-align: baseline;`
  3. *Adaptabilidad Fluida & Anti-Desborde (Doctrina Constitucional 11):*
     - Si la resolución es de 320px o el nombre es largo, el paréntesis baja suavemente a una segunda línea sin desbordar ni chocar con el icono del tiempo.
  4. *Blindaje de Caché y Versión:*
     - Versión oficial actualizada a `v1.1.8 📍` en el badge del pie (`#app-version-badge`), modal de novedades y registros.
     - `CACHE_NAME` actualizado a `meteoasturlode-v228-location-locality` en `sw.js`.
     - Query strings de scripts y CSS sincronizados a `?v=1.1.8-loc`.

---

## 🚀 Versión Anterior Oficial: v1.1.7 — 2026-09-27

- **Ergonomía Visual & Mayor Legibilidad en Cápsulas de Mínimas y Máximas:**
  1. *Observación de Lendo:*
     - Lendo apreció que las pastillas de temperaturas mínimas y máximas en la cabecera principal se veían algo pequeñas y solicitó hacerlas un poco más grandes, sin pasarse.
  2. *Ajuste Tipográfico & Espacial:*
     - En `css/components.css`, para `.t-pill`:
       - `font-size`: aumentado de `0.82rem` a `0.92rem` (+12% de tamaño) para una lectura clara de un vistazo.
       - `font-weight`: elevado de `700` a `800` (negrita con empaque).
       - `padding`: ampliado de `3px 8px` a `4px 10px` con bordes redondeados a `7px` y `letter-spacing: -0.2px`.
  3. *Blindaje Anti-Desborde Móvil (Doctrina 11):*
     - Las dos cápsulas juntas miden apenas ~130px, encajando con holgura total en pantallas estrechas (320px–360px) junto a la sensación térmica.
  4. *Blindaje de Caché y Versión:*
     - Versión oficial actualizada a `v1.1.7 🌡️` en el badge del pie (`#app-version-badge`), modal de novedades y registros.
     - `CACHE_NAME` actualizado a `meteoasturlode-v227-pill-size` en `sw.js`.
     - Query strings de scripts y CSS sincronizados a `?v=1.1.7-pills`.

---

## 🚀 Versión Anterior Oficial: v1.1.6 — 2026-09-27

- **Métricas de "Tiempo Habitual" & Normales Climatológicas 1991–2020 (AEMET / OMM):**
  1. *Inspiración & Requerimiento de Lendo:*
     - Lendo observó en *eltiempo.es* la incorporación de la comparativa de "Tiempo habitual" frente al tiempo actual y encomendó investigar e implementar la mejor solución para MeteoAstur Lode.
     - Lendo seleccionó la **Opción 1**: Franja ergonómica y sutil en la cabecera del Hero Weather Card mostrando la anomalía térmica diaria (ej. `+2.8 °C sobre lo habitual de finales de septiembre`) acompañada del botón didáctico `[ 📊 Tiempo Habitual ]`.
     - Lendo exigió expresamente verificar la gratuidad y el cumplimiento normativo con Google Play Store (TWA) antes de tocar el código.
  2. *Marco Legal & Cero Coste de API (100% Gratuito y Abierto):*
     - Basado estrictamente en las **Normales Climatológicas Estándar Oficiales de 30 años (período 1991–2020)** publicadas por AEMET OpenData (Resolución de 30/11/2015).
     - Datos de dominio público estatal bajo la **Ley 37/2007 de Reutilización de la Información del Sector Público**.
     - El cálculo se ejecuta al 100% de forma estática y matemática en local en el dispositivo del usuario (`js/utils/climatologyData.js`): cero peticiones de red externas, cero latencia, cero consumo de cuota de API y total compatibilidad offline.
  3. *Microclimatología Asturiana & Gradiente Térmico por Altitud:*
     - Zonificación de los 78 concejos en 4 áreas microclimáticas homogéneas: Costa y Litoral Cantábrico, Valles Centrales y Cuencas, Occidente y Suroccidente, y Montaña / Cordillera Cantábrica.
     - Aplicación de un gradiente adiabático vertical de **-0.6 °C por cada 100 metros** de elevación sobre el nivel del mar según la altitud de la estación de referencia.
     - Ponderación quincenal continua para modelar suavemente la transición térmica entre meses contiguos.
  4. *Ergonomía Móvil (Constitución Ley 11) & Diseño Liquid Glass:*
     - La franja `.climatology-strip` se integra de forma compacta en la base de la tarjeta meteorológica principal, evitando sobrecargar la fila de mínimas y máximas.
     - Código visual de 3 estados: 🔥 *Más cálido de lo habitual* (anomalía > +1.5 °C), 🌿 *Acorde a lo habitual* (entre -1.5 °C y +1.5 °C), y ❄️ *Más fresco / frío* (< -1.5 °C).
     - Botón táctil interactivo `[ 📊 Tiempo Habitual ]` que activa el modal divulgativo con la suite didáctica (`js/utils/weatherExplanations.js`).
  5. *Blindaje de Caché y Versión:*
     - Versión oficial actualizada a `v1.1.6 📊` en badge del pie (`#app-version-badge`), modal de novedades y registros.
     - `CACHE_NAME` actualizado a `meteoasturlode-v226-clima-habitual` en `sw.js`.
     - Inclusión de `./js/utils/climatologyData.js` en `STATIC_ASSETS` de `sw.js`.
     - Query strings de scripts sincronizados a `?v=1.1.6-clima`.

---

## 🚀 Versión Anterior Oficial: v1.1.5 — 2026-09-27

- **Detector Silencioso de Galerna Cantábrica en Tiempo Real:**
  1. *Concepto & Propuesta Técnica de Lendo:*
     - Lendo propuso incorporar un detector silencioso de Galerna Cantábrica con la misma elegancia y discreción que el ya consolidado *Vientu les Castañes* (Efecto Foehn): sin ruidos ni avisos invasivos, que permanezca en silencio absoluto y solo se despliegue cuando los sensores en la costa detecten el zarpazo del Noroeste.
  2. *Motor Físico & Cinemático (`js/utils/galernaDetector.js`):*
     - Ámbito geográfico específico: concejos con fachada litoral y costa en Asturias (Castrillón, Gijón, Gozón, Llanes, Ribadesella, Carreño, Avilés, Valdés, Tapia, etc.).
     - Condiciones matemáticas de disparo:
       - Viento de componente Noroeste estricto (WNW a NNW: 270° a 345°).
       - Aceleración brusca de rachas: &ge; 45 km/h (moderada) o &ge; 65 km/h (severa).
       - Desplome térmico en 1-3 horas (&ge; 4.0 °C respecto a la temperatura previa).
       - Salto barométrico positivo (&ge; 1.5 hPa) e inyección de humedad marina (&ge; 80%).
  3. *Banner Dinámico Náutico (`css/components.css` & `js/components/currentCard.js`):*
     - Banner translúcido con gradiente marino profundo (`.galerna-banner`) y animación de halo oceánico palpitante (`galernaOceanGlow`).
     - Pastillas ergonómicas con métricas vivas: rumbo NW, racha en km/h, caída térmica estimada y salto de presión.
     - Botón didáctico integrado `💡 ¿Por qué ocurre?` conectado directamente con la enciclopedia meteorológica asturiana (`data-phenomenon="galerna"`).
  4. *Blindaje de Caché y Versión:*
     - Versión oficial actualizada a `v1.1.5 🌊` en badge del pie (`#app-version-badge`), modal de novedades y registros.
     - `CACHE_NAME` actualizado a `meteoasturlode-v225-galerna-detector` en `sw.js`.
     - Query strings de scripts y CSS sincronizados a `?v=1.1.5-galerna`.

---

## 🚀 Versión Anterior Oficial: v1.1.4 — 2026-09-27

- **Fidelidad Oceanográfica & Calibración de Superficie Glassy en Rompiente:**
  1. *Diagnóstico & Observación Técnica de Lendo:*
     - Lendo detectó que en el módulo de Surf, al mostrar `Superficie Glassy` con viento calmo (&le; 6 km/h), la tarjeta describía: *"Calma total. La lámina de agua parece un espejo perfecto."*.
     - Esta afirmación resultaba físicamente inadecuada y contradictoria: si hay swell y olas rompiendo activamente en la playa (por ejemplo en Salinas o San Lorenzo), el agua no puede ser "un espejo", pues solo hay ausencia de viento pero la superficie está modulada por el tren de olas.
  2. *Corrección Fiel y Concisa:*
     - En `js/components/surfCard.js` se suprime la frase redundante, dejando la descripción limpia y exacta: **"Calma total."** y etiqueta interna `Glassy (Calma)`.
     - En `js/utils/weatherExplanations.js` se sincroniza la guía didáctica: *"Ausencia total de viento que rice o distorsione la pared de la ola"*.
  3. *Suite Didáctica con Tablas Ergonómicas Visuales:*
     - Lendo solicitó hacer más intuitiva la comprensión de la nota 1 al 10 y la diferencia entre estrellas doradas y blancas.
     - Se integran dos tablas visuales en el modal didáctico `💡 Explícame`:
       - Tabla 1 (Baremos Físicos): desglosa la contribución de altura (hasta 4 pts), período swell (hasta 4 pts) y energía (hasta 2 pts) para sumar la nota 1 al 10.
       - Tabla 2 (Color de Estrellas): relación directa entre viento terral offshore (doradas), calma glassy/brisa (blancas) y viento de mar/mar pasado (0★).
     - Diseño responsive blindado con `.explain-table-container` y badges visuales para evitar desbordes en móviles estrechos (320px–380px, Ley Constitucional 11).
  4. *Blindaje de Caché, Auto-Prompt y Versión:*
     - Corrección crítica en `js/app.js`: actualización de `CURRENT_CHANGELOG_VERSION` a `'1.1.4'` y purga de cadenas duras `?v=1.1.2-fix` en las importaciones de módulos hacia `?v=1.1.4-table`.
     - Subida de cache-busting a `meteoasturlode-v224-surf-tables-live` en `sw.js`.
     - Query strings de scripts y hojas de estilo actualizados a `?v=1.1.4-tables-live`.

---

## 🚀 Versión Anterior Oficial: v1.1.3 — 2026-09-27

- **Calibración Solar Inteligente Estacional & Detector Asturiano de "Resol / Sol tamizáu":**
  1. *Contexto & Diagnóstico en Castrillón (Piedras Blancas - 27 Sep 2026):*
     - Lendo constató desde Piedras Blancas que, habiendo en la calle resol evidente y sol tamizado que calienta y deslumbra, la aplicación mostraba "Nublado / Cubiertu ☁️".
     - Al consultar los sensores en tiempo real de Open-Meteo, se evidenció que los modelos numéricos asignaban `cloud_cover: 100%` debido a un velo compacto de nubes altas (cirros/altoestratos).
     - La versión anterior (del 18 de septiembre) tenía un candado ultra-estricto ante coberturas del 100% que exigía `uv_index >= 4.5`, ignorando la radiación solar directa perpendicular (`direct_normal_irradiance`, DNI), e imposibilitando desempatar en otoño o invierno donde astronómicamente el índice UV difícilmente supera 2.5 - 3.5 incluso en cielos despejados. A pesar de que los sensores registraban 129,2 W/m² de radiación directa atravesando la nube, la app quedaba atrapada en el gris.
  2. *Solución Algorítmica con Adaptación Estacional (`js/utils/weatherIcons.js`):*
     - **Ciclo Astronómico Estacional (`getSeasonalSolarThresholds`):** Adaptado a la latitud de Asturias (~43.5° N). Los umbrales de UV y radiación global se modulan por épocas del año:
       - Invierno (Dic, Ene, Feb): UV estricto 1.8, moderado 1.4, DNI resol 75 W/m².
       - Otoño medio / Primavera temprana (Nov, Mar): UV estricto 2.5, moderado 2.0, DNI resol 85 W/m².
       - Primavera / Principios de otoño (Abr, Sep, Oct): UV estricto 3.0, moderado 2.4, DNI resol 90 W/m² (activo hoy en Castrillón).
       - Verano pleno (May, Jun, Jul, Ago): UV estricto 4.2, moderado 3.6, DNI resol 100 W/m².
     - **El Sensor Rey: Radiación Directa Perpendicular (`direct_normal_irradiance` >= 90-100 W/m²):** Permite validar físicamente que el haz solar llega en línea recta desde el disco solar perforando el manto nuboso, diferenciando tajantemente el resol de la "panza de burro" (cielo blanco o niebla marina donde la radiación directa es nula: 0 a 20 W/m²).
  3. *Nueva Condición Visual y Cultural: "Resol / Sol tamizáu" (⛅):*
     - Cuando el modelo marca cielo cerrado (cobertura >= 85% o 100%) pero los sensores en tierra confirman radiación directa activa, la estación en vivo reclasifica la condición a:
       - Etiqueta: **`Resol / Sol tamizáu`**.
       - Icono: Sol tras nube grande (`⛅` / el huevo frito, soportado en todos los temas visuales).
       - Tooltip contextual: *"☀️ Calibración Solar Inteligente: Resol / Sol tamizado activo atravesando las nubes con radiación solar directa en superficie"*.
       - Si la cobertura es inferior al 85%, se preserva la clásica etiqueta *"Parcialmente nublado / Claros"*.
  4. *Enciclopedia Didáctica de Fenómenos (`js/utils/weatherPhenomena.js`):*
     - Nueva ficha técnica y divulgativa sobre el fenómeno del *Resol (Sol tamizáu / Resolana)* en la categoría de Asturias & Cantábrico, explicando la óptica de nubes altas, el bochorno y la prevención de quemaduras solares bajo nubes finas.
  5. *Blindaje Anti-Desborde y Ergonomía Móvil Estricta (Ley Constitucional 11):*
     - Erradicación del desborde horizontal en la Hero Weather Card en pantallas móviles: se suprime la pastilla redundante de colada de la fila de mínimas y máximas (`.temp-minmax-pills`), dejando la información de colada exclusivamente en su tarjeta dedicada de ancho completo al final del panel de sensores (#7).
     - La fila principal de la tarjeta recupera todo su espacio visual: `Resol / Sol tamizáu`, la sensación térmica y las pastillas térmicas `[↓ 15°C]` y `[↑ 22°C]` cuentan con `min-width: 0` y `word-break: break-word`, garantizando holgura perfecta sin cortes de texto en teléfonos estrechos (320px - 380px).
  6. *Suite de Iconos Exclusivos de Resol en Todos los Temas Visuales:*
     - Diseño e implementación de la clave `svgKey: 'resol'` con emoji nativo `🌤️`.
     - **Tema Astur (`weatherAsturIcons.js`):** Sol sonriente con gafas de sol oscuras molonas (deslumbramiento del resol) irradiando rayos que atraviesan la nube translúcida.
     - **Tema Neón (`weatherNeonIcons.js`):** Sol dorado central con halo glow resplandeciente (`#neon-glow-resol`) y haces de luz perforando la nube neón cian.
     - **Tema Pixel Art (`weatherPixelIcons.js`):** Sol pixelado en oro y ámbar con corona de rayos penetrantes entre los bloques de la nube blanca.
     - **Tema Sketch (`weatherSketchIcons.js`):** Sol en acuarela dorada y trazo de pluma proyectando rayos que cruzan el velo acuarelado de la nube.
  7. *Blindaje de Caché y Versión:*
     - Versión oficial actualizada a `v1.1.3 ⛅` en footer (`#app-version-badge`), en modal de Novedades (`#changelog-modal`) y sincronizado con `meteoastur_changelog_seen`.
     - `CACHE_NAME` actualizado a `meteoasturlode-v221-resol-icons` en `sw.js`.
     - Query strings de scripts y CSS sincronizados a `?v=1.1.3-resolicon`.

---

## 🚀 Versión Anterior Oficial: v1.1.2 — 2026-09-26

- **Asesor Inteligente y Simpático de la Colada & Secado de Ropa ("¿Tiendo fuera o dentro?"):**
  1. *Motor Termodinámico Fiel de Evaporación Textil (`js/utils/laundryAdvisor.js`):*
     - Cálculo de evaporación multicriterio: combina déficit de saturación de vapor según la ley de Dalton (es - ea), ventilación aerodinámica superficial (reducción de capa límite por viento), radiación solar directa e insolación neta, y horizonte de precipitación a corto plazo (Nowcasting a 4 horas con `hourly.precipitation_probability` y `hourly.precipitation`).
     - Cuatro diagnósticos climáticos precisos con tono simpático, auténtico y asturiano:
       - 🟢 **¡Tiende con gloria!**: Secado exprés (1h30 a 2h30). Condiciones ideales con humedad &lt; 62%, sol o viento seco de componente Sur (Efecto Foehn / "Vientu les Castañes").
       - 🟢 **¡Adelante, buen día para tender!**: Condiciones óptimas (3h a 4h30) con humedad &lt; 76% y brisa adecuada.
       - 🟡 **Tiende con ojo / Mejor a cubierto**: Humedad alta (&gt; 76%), frío o noche con "serena" (riesgo de condensación y rocío cantábrico).
       - 🔴 **¡Ni se te ocurra, que te va orpinar!**: Lluvia en curso o probabilidad de precipitación &gt; 40% en las próximas 4 horas (evita el temido orvayu/orpín).
     - **Alerta Eólica de Pinzas:** En rachas &ge; 42 km/h despliega el aviso 💨 *¡Sujeta bien los calzones!* recomendando doble pinza de madera o tender a sotavento.
  2. *Doble Presencia y Máxima Visibilidad en la Estación en Vivo (`js/components/currentCard.js` & `css/components.css`):*
     - **Píldora Rápida en Tarjeta Principal (Hero Card):** Integración directa en la cabecera en vivo (`🧺 ¡Tiende con gloria!`, etc.) que permite conocer el veredicto de un vistazo sin necesidad de scroll y con enlace interactivo que desplaza suavemente hacia el informe completo.
     - **Tarjeta Destacada a Ancho Completo (`grid-column: 1 / -1`):** Posicionada en la cabecera de la cuadrícula de sensores, con barra de evaporación, tiempo estimado de secado, factores desglosados y botón didáctico `💡 Explícame`.
  3. *Suite Didáctica Educativa (`js/utils/weatherExplanations.js`):*
     - Entrada didáctica interactiva que explica los principios físicos de la evaporación, el arrastre de humedad por el viento, por qué el viento Sur seca tan rápido y el peligro del orvayu imperceptible y la serena nocturna en Asturias.
  4. *Anti-Caché Estricto y Sincronización de Submódulos:*
     - Inclusión de `js/utils/laundryAdvisor.js` en `STATIC_ASSETS` de `sw.js`.
     - Incremento de CACHE_NAME a `meteoasturlode-v217-v1.1.2-colada-prominent`.
     - Sincronización en cascada de todos los query strings de importación de módulos ES en `app.js` y `currentCard.js` a `?v=1.1.2-fix` para erradicar cachés residuales de módulos previos.

- **Correcciones Post-Lanzamiento v1.1.2 (Fixes de UX — 2026-09-26):**
  1. *Bug crítico de Changelog (siempre aparecía al recargar):*
     - Causa raíz identificada: `closeModal()` y el listener de `popstate` guardaban `'1.1.1'` en `localStorage('meteoastur_changelog_seen')`, pero `checkChangelogAutoPrompt()` comparaba contra `'1.1.2'`. La discrepancia hacía que el modal siempre se considerase "no visto" y saltase en cada carga.
     - Solución: corregidas las dos ocurrencias en `js/app.js` (líneas 238 y 295) para guardar `'1.1.2'` al cerrar el changelog. Ahora solo aparece una vez por versión nueva, como manda la ley.
  2. *Reposicionamiento de la tarjeta de Colada al final del sensors-grid:*
     - La tarjeta `sensor-card-laundry` se movió a la posición #7 (última) del `sensors-grid` en `js/components/currentCard.js`, después de Calidad del Aire (AQI), tal como pidió Lendo. La píldora rápida en la Hero Card sigue en su lugar para ver el estado de un vistazo.
  3. *Cache-busting sincronizado:*
     - `CACHE_NAME` actualizado de `meteoasturlode-v217-v1.1.2-colada-prominent` a `meteoasturlode-v218-v1.1.2-fixes` en `sw.js` para garantizar descarga fresca en todos los dispositivos.

---

## 🚀 Versión Anterior Oficial: v1.1.1 — 2026-09-26

- **Webcams Oficiales en Directo de Asturias (Playas y Puertos de Montaña):**
  1. *Directorio Oficial Curado y Validado Punto a Punto (`js/utils/webcamsData.js`):*
     - Corrección y validación automatizada mediante script en tiempo real contra los servidores de *Webcams de Asturias*, DGT y 112 Asturias, garantizando **HTTP 200** y correspondencia al 100% entre el título, concejo y cámara exacta (eliminados identificadores genéricos que provocaban desvíos).
     - Catálogo ampliado a 40 cámaras estratégicas y de máxima resolución:
       - **Playas y Surf:** Salinas (Central y Rompiente de El Espartal), Gijón (San Lorenzo La Escalerona, El Tostaderu/Piles, Panorámica de la Bahía, El Rinconín, Poniente y Puerto Deportivo), Gozón (Playa de Xagó, Luanco Playa de La Ribera y Muelle Pesquero), Carreño (Candás Paseo Marítimo y Playa), Villaviciosa (Rodiles Barra de Surf mundial, Playa/Pinar de Rodiles, Playa España y Playa de La Ñora), Ribadesella (Santa Marina y Playa de Vega), Llanes (Barro, Celorio Palombina, Andrín y San Antolín de Bedón), Muros de Nalón (Aguilar), Soto del Barco (Los Quebrantos / San Juan de La Arena), Tapia de Casariego (Anguileiro / La Grande) y Castropol (Peñarronda).
       - **Puertos de Montaña, Cumbres y Esquí:** Valgrande-Pajares (Cuitu Negru 1.850 m, Panorámica Ubiñas y Brañillín/Zona Baja), San Isidro / Fuentes de Invierno (La Raya 1.520 m en cumbre y Felechosa), Caso (Puerto de Tarna 1.490 m), Degaña (Puerto de Cerredo 1.290 m), Somiedo (Pola de Somiedo y Caunedo/Subida al Puerto), Picos de Europa (Lagos de Covadonga Lago Enol 1.070 m, Picu Urriellu / Camarmeña, Refugio de Bulnes, Sotres / Pandébano y Vega de Ario 1.630 m), Ponga (San Juan de Beleño / Tiatordos), Todas con apertura directa a imagen/stream en vivo sin portales intermedios.
  2. *Cumplimiento Legal y Google Play Store (TWA):*
     - Acceso directo mediante enlaces a fuentes oficiales y públicas autorizadas con atributos seguros `target="_blank" rel="noopener noreferrer"`. Cero scraping indebido de streams comerciales, cero bloqueos CORS, máxima velocidad y nulo consumo residual de datos móviles.
  3. *Interfaz y Ergonomía Móvil (Doctrina Constitucional Ley 11):*
     - Modal `#webcams-modal` con interruptor segmentado animado con glider (`🏖️ Playas y Surf` vs `🏔️ Puertos y Pistas`), buscador dinámico en tiempo real (`#webcam-search-input`) que filtra al instante por nombre, concejo, altitud o descripción.
     - Botón de acceso general en el menú de navegación (`#nav-modal`).
     - Botones contextuales dedicados e integrados ergonómicamente en la cabecera de las tarjetas de `Mar & Surf` (`📹 Ver Webcams de Playas en Directo`) y `Cordillera & Nieve` (`📹 Ver Webcams de Puertos y Pistas en Vivo`), abriendo el modal directamente prefiltrado en su categoría correspondiente.
  4. *Blindaje PWA y Anti-Caché:*
     - Incorporación de `js/utils/webcamsData.js` a la caché estática de `sw.js`.
     - Actualización de CACHE_NAME a meteoasturlode-v214-v1.1.1-overflowfix.
     - Actualización de query strings a `v=1.1.1` en `index.html` y módulos ES.
     - Actualización del badge a `v1.1.1 📹` y registro detallado en `CHANGELOG.md`.

---

## 🚀 Versión Anterior Oficial: v1.1 — 2026-09-26

- **Lanzamiento Mayor Oficial v1.1 y Aviso de Novedades en Primera Apertura:**
  1. *Actualización de Versión:* Badge del pie de página actualizado a `v1.1 🚀`.
  2. *Changelog Unificado:* Inclusión de todas las innovaciones desarrolladas desde el 17 de septiembre (v1.0.81) en `#changelog-modal`:
     - Detector termodinámico de Efecto Foehn ("Vientu les Castañes").
     - Radar Cantábrico en Satélite Real Esri HD por defecto con blindaje de alejamiento (minZoom 6) y resolución de teselas nativas RainViewer (fin del error "Zoom Level not supported").
     - Ergonomía móvil cuadrada (380px) en radar eliminando el secuestro táctil de Leaflet y limpieza de controles redundantes.
     - Revolución de Cordillera & Nieve: Visor dual Snow-Forecast con cotas altitudinales en 3 niveles, Wind Chill, semáforo de remontes, nieve a 3 días y reorganización geográfica de los 16 puertos de montaña asturianos en 4 sectores.
     - Surf & Rompientes: Sistema de estrellas (0-10★), textura marina, flechas vectoriales SVG de 360° para viento y mar de fondo, y advertencias para arenales abiertos.
     - Menú de herramientas anti-desborde (Doctrina Constitucional Ley 11).
  3. *Aviso Automático de Novedades (`checkChangelogAutoPrompt`) y Blindaje Anti-Cierre:*
     - Despliegue automático tras 800ms sin alterar el historial (`history.pushState`) para impedir que los eventos `popstate` de finalización de carga del navegador cierren la ventana.
     - Guarda en `popstate` (`if (e.state?.modalOpen) return;`).
     - Almacenamiento en `localStorage` únicamente tras el cierre explícito por el usuario (`[ ✕ ]` o clic fuera).
     - Protección en `controllerchange` del Service Worker para no forzar recarga si el modal de novedades está activo en pantalla.
- **Cache-bust:** `sw.js` → `meteoasturlode-v211-v1.1`, query strings `v=1.1` en `index.html` y módulos ES.

---

## 🔧 v1.1.06-foehn — 2026-09-26

- **Detector Científico de Efecto Foehn ("Vientu les Castañes"):**
  1. *Física Termodinámica en Vivo (`js/utils/foehnDetector.js`):* Detección en tiempo real de compresión adiabática del aire al descender de la Cordillera Cantábrica hacia los valles y la costa (Viento sector Sur 135°-225°, caída de humedad relativa < 52% / < 38% severo, y rachas aceleradas >= 28 km/h).
  2. *Banner Dinámico y Divulgativo (`currentCard.js`):* Banner visual acristalado ámbar/naranja con diagnóstico en vivo de racha y humedad desplomada, botón directo `💡 ¿Por qué ocurre?` conectado al modal didáctico de fenómenos meteorológicos (`#phenomenon-card-foehn`), e indicador activo en la rosa de los vientos del anemómetro.
  3. *Reposo Silencioso:* En condiciones climáticas normales del Cantábrico (humedad 75-95% o viento no Sur), el detector permanece en reposo total sin mostrar ningún elemento que sobrecargue la interfaz.
- **Cache-bust:** `sw.js` → `meteoasturlode-v206-foehn`, query strings `v=1.1.06-foehn` y `css/components.css?v=1.1.06`.

---

## 🔧 v1.1.05-radarmarkupclean — 2026-09-26

- **Limpieza Minimalista del Radar Cantábrico (Supresión de Botones Redundantes):**
  1. *Eliminación de controles duplicados:* Retirados los botones `📊 Menú` y `📖 Fenómenos` de la botonera superior del radar al encontrarse ya disponibles de forma fija y global en la cabecera principal y en el modal de menú de la app.
  2. *Supresión del botón inferior:* Eliminado el botón `🔝 Subir al Menú Principal` bajo el mapa, ya que la altura cuadrada de 380px permite navegar y hacer scroll táctil sin obstáculos ni capturas de Leaflet.
  3. *Enfoque en acciones esenciales:* La tarjeta queda despejada, limpia y centrada exclusivamente en sus dos acciones clave: `🎯 Centrar Asturias` y `▶️ Reproducir Radar`.
- **Cache-bust:** `sw.js` → `meteoasturlode-v205-radarmarkupclean`, query strings `v=1.1.05-radarmarkupclean` y `css/components.css?v=1.1.05`.

---

## 🔧 v1.1.04-radarmobile — 2026-09-26

- **Radar Cantábrico en Móviles (Ergonomía Cuadrada y Erradicación del Secuestro Táctil):**
  1. *Formato Cuadrado Adaptativo en Móvil (`@media (max-width: 650px)`):* Se sustituyó la altura fija desmesurada de `620px` por `380px` (`max-height: 52vh; min-height: 320px`). El mapa vuelve a ser cuadrado y cómodo como en tablet/PC, adaptándose fielmente a la morfología geográfica de Asturias.
  2. *Erradicación del Secuestro Táctil (Leaflet Trap):* Al no cubrir el 100% de la pantalla del smartphone, deja franjas libres superior e inferior para que el pulgar haga scroll vertical libre sin que Leaflet capture el gesto. Además, al entrar a la pestaña 'radar' se ejecuta un scroll suave (`window.scrollTo({ top: 0, behavior: 'smooth' })`) para que la cabecera del menú siempre quede accesible.
  3. *Doble Botón de Rescate y Navegación:*
     - Botonera del radar: botón `📊 Menú` que abre directamente el modal selector de módulos sin desplazamientos.
     - Pie del mapa: botón `.btn-radar-rescue` (`🔝 Subir al Menú Principal`) para regresar a la cabecera de la app con un solo toque desde la parte inferior.
- **Cache-bust:** `sw.js` → `meteoasturlode-v204-radarmobile`, query strings `v=1.1.04-radarmobile` y `css/components.css?v=1.1.04`.

---

## 🔧 v1.1.03-radarzoom — 2026-09-26

- **Radar Cantábrico (Satélite Real y Ergonomía de Zoom):**
  1. *Satélite Real por defecto:* Activado `layerSat` (*Esri World Imagery HD*) como capa base predeterminada al instanciar el mapa del Radar Cantábrico.
  2. *Protección contra pantalla vacía/gris al alejar:* El mapa tenía `minZoom: 5` pero las capas base exigían `minZoom: 6`, dejando el mapa sin teselas al alejar. Se fijó `minZoom: 6` en el mapa y `minZoom: 4` en todas las capas para garantizar cobertura completa en el Cantábrico y Golfo de Vizcaya.
  3. *Eliminación del error "Zoom Level not supported" al acercar:* RainViewer solo ofrece teselas de radar hasta zoom nivel 7. Se ajustó `maxNativeZoom: 7` en `radarTileLayer`, permitiendo que Leaflet descargue las teselas nativas hasta nivel 7 y las redimensione automáticamente por hardware al hacer zoom hasta nivel 11 sobre el satélite nítido de Esri.
- **Cache-bust:** `sw.js` → `meteoasturlode-v203-radarzoom`, query strings `v=1.1.03-radarzoom`.

---

## 🔧 v1.1.02-navbtnsize — 2026-09-25

- **Ajuste ergonómico (Iteración final de botones menú):** Solución a tres problemas encadenados al intentar aumentar la zona táctil (min-height 52px) de los botones `Fenómenos` e `Iconos` de la mini-tira:
  1. *Guillotinado superior:* Se eliminó el `overflow: hidden` del contenedor padre que los cortaba (v1.0.99).
  2. *Aplastamiento flexbox:* Se forzó `flex-shrink: 0` para impedir que la lista inferior aplastase la botonera en móviles bajos (v1.1.00).
  3. *Desbordamiento y Proporción:* Al ser muy estrechos, "Fenómenos" no cabía. Se redujo el `padding` lateral a 4px, el `gap` a 6px, y finalmente se ajustó la fuente a proporciones elegantes (`0.85rem` texto, `1.15rem` icono) (v1.1.01 - v1.1.02).
- **Cache-bust crítico:** Se implementó `?v=1.1.02` directo a los `.css` en el `<head>` de `index.html`.
- **Cache-bust general:** `sw.js` → `meteoasturlode-v202-navbtnsize-fix4`.

---

## 🔧 v1.0.95-fixaludes — 2026-09-25

- **Bug corregido:** Botón `💡 Explícame` en la fila *Peligro de Aludes (EAWS)* del módulo Cordillera & Nieve no abría el modal didáctico al pulsarlo.
- **Causa raíz:** El botón en `mountainCard.js` tiene clase `btn-explain-sensor-compact`, pero el listener global de delegación de eventos en `app.js` (L806) solo capturaba la clase `btn-explain-sensor`. El selector `closest()` no matcheaba el botón de aludes y el evento era ignorado silenciosamente.
- **Corrección:** Una sola línea en `js/app.js` — el selector se amplía a `'.btn-explain-sensor, .btn-explain-sensor-compact'` para capturar ambas variantes del botón didáctico.
- **Archivos modificados:** `js/app.js` (L806), `sw.js` (CACHE_NAME).
- **Cache-bust:** `sw.js` → `meteoasturlode-v195-fixaludes`.

---

## 🔧 v1.0.94-gliderfix — 2026-09-25

- **Bug corregido:** Glider (pastilla naranja deslizante) del interruptor segmentado *Esquí / Puertos* del módulo Cordillera & Nieve no se posicionaba correctamente bajo el botón "Puertos" al pulsarlo.
- **Causa:** `translateX(100%)` en CSS mueve el glider su propio ancho (`calc(50% - 3px)`), dejándolo 3 px corto por el `padding: 3px` del contenedor.
- **Corrección:** `translateX(calc(100% + 3px))` en `css/components.css` → `.mountain-sliding-segmented-switch[data-active="passes"] .mountain-switch-glider`.
- **Cache-bust:** `sw.js` → `meteoasturlode-v194-gliderfix`. Badge → `v1.0.94 🏔️`.


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












