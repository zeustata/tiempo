# 📋 Registro de Cambios (Changelog) - MeteoAstur Lode

Todas las novedades, mejoras y correcciones notables de **MeteoAstur Lode** se documentan en este archivo siguiendo el estándar [Semantic Versioning](https://semver.org/lang/es/).

---

## 🏷️ Guía de Versionado
- **Major (X.0.0)**: Cambios arquitectónicos grandes o rediseños completos.
- **Minor (0.X.0)**: Nuevas funcionalidades, nuevos módulos climáticos o integraciones.
- **Patch (0.0.X)**: Corrección de errores (*bugfixes*), ajustes de diseño y optimizaciones.
- **Sufijo `-beta` / `-rc`**: Versiones preliminares en fase de pruebas activas.

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
