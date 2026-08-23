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
   - Con cada cambio o modificación de funcionalidades, estilos o estructura, **siempre se debe subir el número de versión** (actualmente en ciclo `v0.9.x-beta`).
   - Se debe reflejar la nueva versión en:
     - El badge del pie de página (`#app-version-badge` en `index.html`).
     - El historial del modal de versiones (`#version-modal` en `index.html`).
     - El archivo `CHANGELOG.md`.

4. 🧪 **Mantenimiento de la Fase Beta**:
   - La app se encuentra actualmente en fase de pruebas activas con el sufijo `-beta` hasta que Lendo decida publicar la versión oficial `1.0.0`.

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

---

## 🏗️ 3. Módulos de la Aplicación
1. **📊 Estación en Vivo (`panel-live`)**: Panel principal con métricas actuales y tarjetas por bloques.
2. **📡 Radar en Directo (`panel-radar`)**: Mapa interactivo con capas de lluvia/nubes de RainViewer/AEMET.
3. **📅 Previsión 14 Días (`panel-forecast`)**: Pronóstico extendido por días y horas.
4. **📈 Gráficas Meteo (`panel-charts`)**: Evolución temporal detallada con scroll táctil horizontal.
5. **🏔️ Montaña y Puertos (`panel-mountain`)**: Datos de puertos asturianos y cotas de nieve.
6. **🌊 Costa y Playas (`panel-marine`)**: Condiciones marítimas, surf, playas y mareógrafo en tiempo real de 72 horas.
7. **⚖️ Comparador (`panel-compare`)**: Comparación meteorológica en paralelo entre concejos.

---

## 🔄 4. Historial Reciente de la Sesión
- Transición completa de pestañas horizontales a selector por modal táctil.
- Integración de badges interactivos de versiones en el pie de página.
- Incorporación de la bandera del Principado de Asturias en la cabecera y catálogo de 78 concejos.
- Transformación al diseño de cristal translúcido puro (Liquid Glass) sin desenfoques opacos en todas las tarjetas de la app.
- Creación del Mareógrafo interactivo en tiempo real continuo de 72 horas y el Cuadro Semanal de Mareas y Coeficientes adaptado al litoral asturiano.
- Blindaje total y aislamiento de excepciones ante respuestas nulas de modelos satelitales.
- Subidas continuas a GitHub (`zeustata/tiempo`).
