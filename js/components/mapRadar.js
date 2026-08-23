import { fetchRainViewerRadar } from '../services/radarService.js';

let asturiasMap = null;
let radarTileLayer = null;
let baseLayers = {};
let radarFrames = [];
let currentFrameIndex = 0;
let animationTimer = null;
let activeConcejoMarker = null;
let isPlaying = false;

// Coordenadas óptimas para encuadrar Asturias completa y el Mar Cantábrico
const ASTURIAS_OVERVIEW_CENTER = [43.48, -5.85];
const ASTURIAS_DEFAULT_ZOOM = window.innerWidth < 650 ? 7 : 7.5;

/**
 * Inicializa el mapa interactivo del radar en Asturias con Leaflet y RainViewer
 */
export async function initAsturiasMap(mapContainerId, onConcejoSelect) {
  if (typeof L === 'undefined') return;

  const container = document.getElementById(mapContainerId);
  if (!container) return;

  if (!asturiasMap) {
    asturiasMap = L.map(mapContainerId, {
      center: ASTURIAS_OVERVIEW_CENTER,
      zoom: ASTURIAS_DEFAULT_ZOOM,
      minZoom: 5,
      maxZoom: 11, // Límite para evitar errores de zoom no soportado de RainViewer
      zoomControl: true,
      fadeAnimation: true
    });

    // Capa 1: CartoDB Voyager (Clara, muy nítida con relieve costero)
    const layerVoyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO &copy; RainViewer',
      subdomains: 'abcd',
      minZoom: 6,
      maxZoom: 11
    });

    // Capa 2: Esri World Imagery (Satélite Real de alta definición)
    const layerSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri &copy; Earthstar Geographics',
      minZoom: 6,
      maxZoom: 11
    });

    // Capa 3: OpenStreetMap Estándar
    const layerOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      minZoom: 6,
      maxZoom: 11
    });

    layerVoyager.addTo(asturiasMap);

    baseLayers = {
      "🗺️ Mapa Topográfico": layerVoyager,
      "🛰️ Satélite Real (Esri)": layerSat,
      "📍 OpenStreetMap": layerOSM
    };

    L.control.layers(baseLayers, null, { position: 'topright' }).addTo(asturiasMap);

    // Añadir leyenda de radar en la esquina inferior
    addRadarLegend(asturiasMap);
  }

  // Cargar capas de Radar RainViewer
  await loadRadarLayers();

  // Forzar redibujado de Leaflet para garantizar renderizado total
  resizeMap();
}

/**
 * Añade una leyenda visual de intensidad de precipitación
 */
function addRadarLegend(map) {
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'radar-legend-card');
    div.innerHTML = `
      <div class="legend-title">Intensidad Lluvia</div>
      <div class="legend-scale">
        <span style="background: #00ecff;"></span>
        <span style="background: #0099ff;"></span>
        <span style="background: #00ff00;"></span>
        <span style="background: #ffff00;"></span>
        <span style="background: #ff7700;"></span>
        <span style="background: #ff0000;"></span>
        <span style="background: #cc00ff;"></span>
      </div>
      <div class="legend-labels">
        <span>Débil / Orbayu</span>
        <span>Moderada</span>
        <span>Torrencial</span>
      </div>
    `;
    return div;
  };
  legend.addTo(map);
}

/**
 * Corrige el tamaño de Leaflet cuando el contenedor se hace visible
 */
export function resizeMap() {
  if (asturiasMap) {
    setTimeout(() => {
      if (asturiasMap) asturiasMap.invalidateSize();
    }, 50);
    setTimeout(() => {
      if (asturiasMap) asturiasMap.invalidateSize();
    }, 250);
    setTimeout(() => {
      if (asturiasMap) asturiasMap.invalidateSize();
    }, 600);
  }
}

async function loadRadarLayers() {
  const radarData = await fetchRainViewerRadar();
  if (!radarData || !radarData.radar || !radarData.radar.past) return;

  radarFrames = [...radarData.radar.past, ...(radarData.radar.nowcast || [])];
  if (radarFrames.length === 0) return;

  currentFrameIndex = radarData.radar.past.length - 1;
  showRadarFrame(currentFrameIndex, radarData.host);
}

function showRadarFrame(index, host = 'https://tilecache.rainviewer.com') {
  if (!radarFrames[index] || !asturiasMap) return;

  const frame = radarFrames[index];
  const url = `${host}${frame.path}/256/{z}/{x}/{y}/2/1_1.png`;

  if (radarTileLayer) {
    asturiasMap.removeLayer(radarTileLayer);
  }

  radarTileLayer = L.tileLayer(url, {
    opacity: 0.80,
    zIndex: 10,
    tileSize: 256,
    minZoom: 6,
    maxZoom: 11,
    maxNativeZoom: 10 // Escala de forma limpia si se acerca sin pedir tiles inexistentes
  }).addTo(asturiasMap);

  // Actualizar etiqueta temporal del radar
  const timeEl = document.getElementById('radar-time-display');
  if (timeEl) {
    const d = new Date(frame.time * 1000);
    const isForecast = index >= (radarFrames.length - (radarFrames.length > 3 ? 3 : 1));
    timeEl.innerHTML = `${isForecast ? '🔮 Proyección Inmediata: ' : '📡 Radar en Directo: '} <strong>${d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</strong>`;
  }
}

export function playRadarAnimation() {
  if (isPlaying) {
    if (animationTimer) clearInterval(animationTimer);
    animationTimer = null;
    isPlaying = false;
    return false; // detenido
  }

  isPlaying = true;
  animationTimer = setInterval(() => {
    currentFrameIndex = (currentFrameIndex + 1) % radarFrames.length;
    showRadarFrame(currentFrameIndex);
  }, 900);

  return true; // reproduciendo
}

export function resetMapCenter() {
  if (asturiasMap) {
    asturiasMap.setView(ASTURIAS_OVERVIEW_CENTER, ASTURIAS_DEFAULT_ZOOM, { animate: true });
    resizeMap();
  }
}

export function focusConcejoOnMap(lat, lon, concejoName) {
  if (asturiasMap) {
    const targetZoom = Math.min(asturiasMap.getZoom() || ASTURIAS_DEFAULT_ZOOM, 7.5);
    asturiasMap.setView([lat, lon], targetZoom, { animate: true });

    // Actualizar o poner un único marcador elegante y discreto en el concejo actual
    if (activeConcejoMarker) {
      asturiasMap.removeLayer(activeConcejoMarker);
      activeConcejoMarker = null;
    }

    if (lat && lon && concejoName) {
      const singlePin = L.divIcon({
        className: 'single-active-pin',
        html: `<div class="pulse-pin-badge">📍 ${concejoName.split('/')[0]}</div>`,
        iconSize: [120, 30],
        iconAnchor: [60, 15]
      });
      activeConcejoMarker = L.marker([lat, lon], { icon: singlePin }).addTo(asturiasMap);
    }

    resizeMap();
  }
}
