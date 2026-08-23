# 📋 Registro de Cambios (Changelog) - MeteoAstur Lode

Todas las novedades, mejoras y correcciones notables de **MeteoAstur Lode** se documentan en este archivo siguiendo el estándar [Semantic Versioning](https://semver.org/lang/es/).

---

## 🏷️ Guía de Versionado
- **Major (X.0.0)**: Cambios arquitectónicos grandes o rediseños completos.
- **Minor (0.X.0)**: Nuevas funcionalidades, nuevos módulos climáticos o integraciones.
- **Patch (0.0.X)**: Corrección de errores (*bugfixes*), ajustes de diseño y optimizaciones.
- **Sufijo `-beta` / `-rc`**: Versiones preliminares en fase de pruebas activas.

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
