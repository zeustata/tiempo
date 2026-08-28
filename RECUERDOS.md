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
5. **🌊 Costa y Playas (`panel-marine`)**: Condiciones marítimas, surf, playas y mareógrafo en tiempo real de 72 horas.
6. **🏔️ Montaña y Puertos (`panel-mountain`)**: Datos de puertos asturianos y cotas de nieve.
7. **🔭 Astronomía & Cosmos (`panel-astronomy`)**: Catálogo de eventos celestes, eclipses, lluvias de estrellas, fases lunares en directo y semáforo de visibilidad en Asturias.

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
- Subidas continuas a GitHub (`zeustata/tiempo`).

