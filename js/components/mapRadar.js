import { CONCEJOS_ASTURIAS } from '../config/concejos.js';
import { fetchRainViewerRadar } from '../services/radarService.js';

let asturiasMap = null;
let radarTileLayer = null;
let baseLayers = {};
let radarFrames = [];
let currentFrameIndex = 0;
let animationTimer = null;
let markersLayerGroup = null;
let isPlaying = false;

/**
 * Inicializa el mapa interactivo de Asturias con Leaflet y RainViewer
 */
export async function initAsturiasMap(mapContainerId, onConcejoSelect) {
  if (typeof L === 'undefined') return;

  const container = document.getElementById(mapContainerId);
  if (!container) return;

  // Centro de Asturias y Mar Cantábrico
  const asturiasCenter = [43.40, -5.85];

  if (!asturiasMap) {
    asturiasMap = L.map(mapContainerId, {
      center: asturiasCenter,
      zoom: 9,
      minZoom: 7,
      maxZoom: 15,
      zoomControl: true,
      fadeAnimation: true
    });

    // Capa 1: CartoDB Voyager (Clara, muy nítida con relieve costero)
    const layerVoyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO &copy; RainViewer',
      subdomains: 'abcd',
      maxZoom: 19
    });

    // Capa 2: OpenStreetMap Estándar
    const layerOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19
    });

    // Capa 3: Esri World Imagery (Satélite Real)
    const layerSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri &copy; Earthstar Geographics',
      maxZoom: 19
    });

    layerVoyager.addTo(asturiasMap);

    baseLayers = {
      "Mapa Topográfico": layerVoyager,
      "OpenStreetMap": layerOSM,
      "Satélite Real (Esri)": layerSat
    };

    L.control.layers(baseLayers, null, { position: 'topright' }).addTo(asturiasMap);

    markersLayerGroup = L.layerGroup().addTo(asturiasMap);
  }

  // Pintar marcadores de concejos asturianos
  renderConcejosMarkers(onConcejoSelect);

  // Cargar capas de Radar RainViewer
  await loadRadarLayers();

  // Forzar redibujado de Leaflet para garantizar renderizado total
  resizeMap();
}

/**
 * Corrige el tamaño de Leaflet cuando el contenedor se hace visible
 */
export function resizeMap() {
  if (asturiasMap) {
    setTimeout(() => {
      if (asturiasMap) {
        asturiasMap.invalidateSize();
      }
    }, 50);
    setTimeout(() => {
      if (asturiasMap) {
        asturiasMap.invalidateSize();
      }
    }, 250);
    setTimeout(() => {
      if (asturiasMap) {
        asturiasMap.invalidateSize();
      }
    }, 600);
  }
}

function renderConcejosMarkers(onConcejoSelect) {
  if (!markersLayerGroup) return;
  markersLayerGroup.clearLayers();

  CONCEJOS_ASTURIAS.forEach(c => {
    const iconHtml = c.type === 'coast' ? '🌊' : c.type === 'mountain' ? '🏔️' : '🏛️';
    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div class="pin-badge ${c.type}">${iconHtml} ${c.name.split('/')[0]}</div>`,
      iconSize: [110, 30],
      iconAnchor: [55, 15]
    });

    const marker = L.marker([c.lat, c.lon], { icon: customIcon });
    marker.bindPopup(`
      <div class="map-popup-card">
        <h4>${c.name}</h4>
        <p>${c.badge}</p>
        <p class="popup-desc">${c.description}</p>
        <button class="popup-select-btn" id="btn-select-${c.id}">Ver Estación en Vivo</button>
      </div>
    `);

    marker.on('popupopen', () => {
      const btn = document.getElementById(`btn-select-${c.id}`);
      if (btn) {
        btn.onclick = () => {
          if (onConcejoSelect) onConcejoSelect(c.id);
        };
      }
    });

    markersLayerGroup.addLayer(marker);
  });
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
    opacity: 0.75,
    zIndex: 10,
    tileSize: 256
  }).addTo(asturiasMap);

  // Actualizar etiqueta temporal del radar y slider si existe
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
    asturiasMap.setView([43.40, -5.85], 9, { animate: true });
    resizeMap();
  }
}

export function focusConcejoOnMap(lat, lon) {
  if (asturiasMap) {
    asturiasMap.setView([lat, lon], 11, { animate: true });
    resizeMap();
  }
}
