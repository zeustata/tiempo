# MEMORIA Y RECUERDOS DEL PROYECTO (TIEMPO ASTURIAS)

Este documento contiene la memoria permanente del proyecto, sus acuerdos de desarrollo, diseño y evolución histórica.

---

## 📌 1. Reglas Fundamentales de Trabajo

1. **Incremento de Versión Obligatorio**:
   - Con cada cambio o modificación de funcionalidades, estilos o estructura, **siempre se debe subir el número de versión** (actualmente en ciclo `v0.9.x-beta`).
   - Se debe reflejar la nueva versión en:
     - El badge del pie de página (`#app-version-badge` en `index.html`).
     - El historial del modal de versiones (`#version-modal` en `index.html`).
     - El archivo `CHANGELOG.md`.
2. **Sincronización con la Red (GitHub)**:
   - Cada entrega debe finalizarse con un commit descriptivo y un `git push origin main` para que los cambios queden respaldados y desplegados automáticamente en la web.
3. **Mantenimiento de la Fase Beta**:
   - La app se encuentra actualmente en fase de pruebas activas con el sufijo `-beta` hasta que el usuario decida publicar la versión oficial `1.0.0`.

---

## 🎨 2. Decisiones de Diseño y UI

1. **Tarjeta de Navegación Principal**:
   - No lleva la etiqueta `"Sección activa"`.
   - Muestra directamente el icono y el título de la sección actual (ej. *📊 Estación en Vivo*).
   - En la parte derecha muestra el botón de llamada a la acción con el texto **`Menú ➔`**.
2. **Cabecera y Accesos Rápidos**:
   - Barra organizada en una sola fila con:
     - Tarjeta táctil de búsqueda de concejo (`🔍 Nombre`).
     - Tarjeta táctil de favoritos (`⭐ Favoritos (n)`).
   - Sin botones redundantes.
3. **Módulo Costa, Playas y Surf**:
   - Dinámico y enfocado según el concejo costero seleccionado.
   - Incluye tarjetas gráficas para mareas (pleamar/bajamar con horarios y coeficientes), altura/período de oleaje, viento y temperatura del agua.
   - Créditos de propiedad y autoría integrados.
4. **Atmósfera Climática y Partículas Vivas**:
   - Motor visual interactivo que adapta el fondo y genera partículas vivas acordes al estado del tiempo actual (lluvia, nieve, niebla, sol).
5. **Radar Meteorológico**:
   - Zoom panorámico alejado por defecto centrado sobre el mar Cantábrico y la cordillera.

---

## 🏗️ 3. Módulos de la Aplicación
1. **📊 Estación en Vivo (`panel-live`)**: Panel principal con métricas actuales y tarjetas por bloques.
2. **📡 Radar en Directo (`panel-radar`)**: Mapa interactivo con capas de lluvia/nubes de RainViewer/AEMET.
3. **📅 Previsión 14 Días (`panel-forecast`)**: Pronóstico extendido por días y horas.
4. **📈 Gráficas Meteo (`panel-charts`)**: Evolución temporal detallada.
5. **🏔️ Montaña y Puertos (`panel-mountain`)**: Datos de puertos asturianos y cotas de nieve.
6. **🌊 Costa y Playas (`panel-marine`)**: Condiciones marítimas, surf y mareas.
7. **⚖️ Comparador (`panel-compare`)**: Comparación meteorológica en paralelo entre concejos.

---

## 🔄 4. Historial Reciente de la Sesión
- Transición completa de pestañas horizontales a selector por modal táctil.
- Integración de badges interactivos de versiones en el pie de página.
- Ajuste del selector de navegación (eliminación de "Sección activa" y botón "Menú").
- Subidas continuas a GitHub (`zeustata/tiempo`).
