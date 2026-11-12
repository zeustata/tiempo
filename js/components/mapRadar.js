import { fetchRainViewerRadar } from '../services/radarService.js?v=3.0.38.24';

let asturiasMap = null;
let radarTileLayer = null;
let baseLayers = {};
let radarFrames = [];
let currentFrameIndex = 0;
let animationTimer = null;
let activeConcejoMarker = null;
let isPlaying = false;
let savedConcejoCallback = null;
let lastFocusedConcejo = null;
let leafletFallbackPromise = null;

// Parámetros configurables del radar (Persistencia en localStorage)
let radarPalette = '2'; // 2: TITAN, 5: NEXRAD, 4: Meteored, 1: Universal Blue
try {
  radarPalette = localStorage.getItem('meteoastur_radar_palette') || '2';
} catch (_) {}

let radarOpacity = '0.80';
try {
  radarOpacity = localStorage.getItem('meteoastur_radar_opacity') || '0.80';
} catch (_) {}

let radarSpeed = 900;
try {
  radarSpeed = parseInt(localStorage.getItem('meteoastur_radar_speed') || '900', 10);
} catch (_) {}

let userGpsMarker = null;
let userAccuracyCircle = null;
let settingsInitialized = false;

/**
 * Respaldo silencioso de CDN: solo actúa si unpkg.com falló o fue bloqueado en la red móvil (typeof L === 'undefined').
 * Para el 99% de usuarios donde L ya cargó en index.html, retorna true en 0 ms sin hacer nada.
 */
async function ensureLeafletLoaded() {
  if (typeof L !== 'undefined') return true;
  if (leafletFallbackPromise) return leafletFallbackPromise;

  leafletFallbackPromise = new Promise((resolve) => {
    // Asegurar hoja de estilos CSS de respaldo
    if (!document.getElementById('leaflet-css-fallback')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css-fallback';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => resolve(typeof L !== 'undefined');
    script.onerror = () => {
      const script2 = document.createElement('script');
      script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script2.onload = () => resolve(typeof L !== 'undefined');
      script2.onerror = () => resolve(false);
      document.head.appendChild(script2);
    };
    document.head.appendChild(script);
  });

  const ok = await leafletFallbackPromise;
  if (!ok) leafletFallbackPromise = null;
  return ok;
}

// Coordenadas óptimas para encuadrar Asturias completa y el Mar Cantábrico
const ASTURIAS_OVERVIEW_CENTER = [43.48, -5.85];
const ASTURIAS_DEFAULT_ZOOM = window.innerWidth < 650 ? 7 : 7.5;

/**
 * Inicializa el mapa interactivo del radar en Asturias con Leaflet y RainViewer
 */
export async function initAsturiasMap(mapContainerId = 'map-container', onConcejoSelect = null) {
  if (onConcejoSelect) savedConcejoCallback = onConcejoSelect;

  const hasLeaflet = await ensureLeafletLoaded();
  if (!hasLeaflet || typeof L === 'undefined') return;

  const container = document.getElementById(mapContainerId);
  if (!container) return;

  if (!asturiasMap) {
    asturiasMap = L.map(mapContainerId, {
      center: ASTURIAS_OVERVIEW_CENTER,
      zoom: ASTURIAS_DEFAULT_ZOOM,
      minZoom: 6,
      maxZoom: 11,
      zoomControl: true,
      fadeAnimation: true
    });

    // Capa 1: Esri World Imagery (Satélite Real de alta definición - Por defecto)
    const layerSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri &copy; Earthstar Geographics',
      minZoom: 4,
      maxZoom: 11
    });

    // Capa 2: Esri World Topo Map (Relieve topográfico HD, montañas y costas de Asturias, 100% libre sin API Key)
    const layerTopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri &copy; OpenStreetMap &copy; RainViewer',
      minZoom: 4,
      maxZoom: 11
    });

    // Capa 3: OpenStreetMap Estándar
    const layerOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap &copy; RainViewer',
      minZoom: 4,
      maxZoom: 11
    });

    layerSat.addTo(asturiasMap);

    baseLayers = {
      "🛰️ Satélite Real (Esri)": layerSat,
      "🗺️ Mapa Topográfico HD": layerTopo,
      "📍 OpenStreetMap Oficial": layerOSM
    };

    L.control.layers(baseLayers, null, { position: 'topright' }).addTo(asturiasMap);

    // Añadir leyenda de radar en la esquina inferior
    addRadarLegend(asturiasMap);

    if (lastFocusedConcejo) {
      focusConcejoOnMap(lastFocusedConcejo.lat, lastFocusedConcejo.lon, lastFocusedConcejo.name);
    }
  }

  // Inicializar controles avanzados de configuración y pantalla completa (Leyes 11 y 14)
  initRadarSettingsControls();

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
  if (!asturiasMap) {
    initAsturiasMap('map-container', savedConcejoCallback).then(() => {
      if (asturiasMap && lastFocusedConcejo) {
        focusConcejoOnMap(lastFocusedConcejo.lat, lastFocusedConcejo.lon, lastFocusedConcejo.name);
      }
    });
    return;
  }
  if (radarFrames.length === 0) {
    loadRadarLayers();
  }
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

let radarHost = 'https://tilecache.rainviewer.com';

async function loadRadarLayers() {
  const radarData = await fetchRainViewerRadar();
  if (!radarData || !radarData.radar || !radarData.radar.past) return;

  radarHost = radarData.host || 'https://tilecache.rainviewer.com';
  radarFrames = [...radarData.radar.past, ...(radarData.radar.nowcast || [])];
  if (radarFrames.length === 0) return;

  currentFrameIndex = radarData.radar.past.length - 1;
  initRadarSliderControls();
  showRadarFrame(currentFrameIndex, radarHost);
}

function initRadarSliderControls() {
  const slider = document.getElementById('radar-time-slider');
  const minLabel = document.getElementById('radar-slider-min-time');
  const maxLabel = document.getElementById('radar-slider-max-time');

  if (slider && radarFrames.length > 0) {
    slider.min = '0';
    slider.max = String(radarFrames.length - 1);
    slider.value = String(currentFrameIndex);

    const firstDate = new Date(radarFrames[0].time * 1000);
    const lastDate = new Date(radarFrames[radarFrames.length - 1].time * 1000);

    if (minLabel) {
      minLabel.textContent = `⏮️ ${firstDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    }
    if (maxLabel) {
      maxLabel.textContent = `${lastDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} ⏭️`;
    }

    slider.oninput = (e) => {
      const idx = parseInt(e.target.value, 10);
      if (!isNaN(idx) && idx >= 0 && idx < radarFrames.length) {
        pauseRadarAnimation();
        currentFrameIndex = idx;
        showRadarFrame(currentFrameIndex, radarHost);
      }
    };
  }

  // Vincular botones de navegación temporal
  const btnFirst = document.getElementById('btn-radar-first');
  const btnPrev = document.getElementById('btn-radar-prev');
  const btnNext = document.getElementById('btn-radar-next');
  const btnLast = document.getElementById('btn-radar-last');

  if (btnFirst) {
    btnFirst.onclick = () => stepRadarFrame(0);
  }
  if (btnPrev) {
    btnPrev.onclick = () => stepRadarFrame(currentFrameIndex - 1);
  }
  if (btnNext) {
    btnNext.onclick = () => stepRadarFrame(currentFrameIndex + 1);
  }
  if (btnLast) {
    btnLast.onclick = () => stepRadarFrame(radarFrames.length - 1);
  }
}

export function stepRadarFrame(targetIndex) {
  if (radarFrames.length === 0) return;
  pauseRadarAnimation();
  const clampedIndex = Math.max(0, Math.min(radarFrames.length - 1, targetIndex));
  currentFrameIndex = clampedIndex;
  showRadarFrame(currentFrameIndex, radarHost);
}

export function pauseRadarAnimation() {
  if (isPlaying) {
    if (animationTimer) clearInterval(animationTimer);
    animationTimer = null;
    isPlaying = false;
    const playBtn = document.getElementById('btn-radar-play');
    if (playBtn) {
      playBtn.innerHTML = '▶️ Reproducir';
      playBtn.classList.remove('active');
    }
  }
}

function showRadarFrame(index, host = radarHost) {
  if (!radarFrames[index] || !asturiasMap) return;

  const frame = radarFrames[index];
  const url = `${host}${frame.path}/256/{z}/{x}/{y}/${radarPalette}/1_1.png`;

  if (radarTileLayer) {
    asturiasMap.removeLayer(radarTileLayer);
  }

  radarTileLayer = L.tileLayer(url, {
    opacity: parseFloat(radarOpacity),
    zIndex: 10,
    tileSize: 256,
    minZoom: 4,
    maxZoom: 11,
    maxNativeZoom: 7 // RainViewer solo genera teselas nativas hasta zoom 7
  }).addTo(asturiasMap);

  // Actualizar slider y etiqueta horaria del radar
  const slider = document.getElementById('radar-time-slider');
  if (slider && parseInt(slider.value, 10) !== index) {
    slider.value = String(index);
  }

  const d = new Date(frame.time * 1000);
  const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const isForecast = index >= (radarFrames.length - (radarFrames.length > 3 ? 3 : 1));

  const timeEl = document.getElementById('radar-time-display');
  if (timeEl) {
    timeEl.innerHTML = `${isForecast ? '🔮 Proyección Inmediata: ' : '📡 Radar en Directo: '} <strong>${timeStr}</strong>`;
  }

  const badgeEl = document.getElementById('radar-slider-now-badge');
  if (badgeEl) {
    badgeEl.textContent = `${isForecast ? '🔮 ' : '📡 '}${timeStr}`;
    badgeEl.style.borderColor = isForecast ? '#d946ef' : '#00ecff';
    badgeEl.style.color = isForecast ? '#f472b6' : '#00ecff';
  }
}

export function playRadarAnimation() {
  if (isPlaying) {
    pauseRadarAnimation();
    return false; // detenido
  }

  isPlaying = true;
  animationTimer = setInterval(() => {
    currentFrameIndex = (currentFrameIndex + 1) % radarFrames.length;
    showRadarFrame(currentFrameIndex, radarHost);
  }, radarSpeed);

  return true; // reproduciendo
}

export function resetMapCenter() {
  if (!asturiasMap) {
    resizeMap();
    return;
  }
  asturiasMap.setView(ASTURIAS_OVERVIEW_CENTER, ASTURIAS_DEFAULT_ZOOM, { animate: true });
  resizeMap();
}

export function focusConcejoOnMap(lat, lon, concejoName) {
  if (lat && lon && concejoName) {
    lastFocusedConcejo = { lat, lon, name: concejoName };
  }
  if (asturiasMap) {
    const targetZoom = Math.min(asturiasMap.getZoom() || ASTURIAS_DEFAULT_ZOOM, 7.5);
    asturiasMap.setView([lat, lon], targetZoom, { animate: true });

    // Actualizar o poner un marcador de pulso GPS sutil y minimalista (sin tapar los ecos de lluvia)
    if (activeConcejoMarker) {
      asturiasMap.removeLayer(activeConcejoMarker);
      activeConcejoMarker = null;
    }

    if (lat && lon && concejoName) {
      const cleanName = concejoName.split('/')[0].trim();
      const gpsPulsePin = L.divIcon({
        className: 'radar-gps-marker',
        html: `
          <div class="radar-pulse-ring"></div>
          <div class="radar-pulse-dot" title="${cleanName}"></div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
      });

      activeConcejoMarker = L.marker([lat, lon], { icon: gpsPulsePin })
        .addTo(asturiasMap)
        .bindTooltip(`🎯 ${cleanName}`, {
          direction: 'top',
          offset: [0, -10],
          className: 'radar-concejo-tooltip'
        });
    }

    // Actualizar indicador del concejo activo en la cabecera del radar
    const locationEl = document.getElementById('radar-active-location');
    if (locationEl && concejoName) {
      locationEl.textContent = `📍 ${concejoName.split('/')[0].trim()}`;
    }

    resizeMap();
  }
}

/**
 * Localiza la posición en tiempo real del usuario con GPS y centra el radar con marcador luminoso (Ley 0 y 11)
 */
export function locateUserGps() {
  if (!navigator.geolocation) {
    alert('La geolocalización no está soportada en este dispositivo.');
    return;
  }

  const gpsBtn = document.getElementById('btn-radar-gps');
  if (gpsBtn) {
    gpsBtn.innerHTML = '⏳ Buscando...';
    gpsBtn.disabled = true;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (gpsBtn) {
        gpsBtn.innerHTML = '📍 Mi Posición';
        gpsBtn.disabled = false;
        gpsBtn.classList.add('active');
        setTimeout(() => gpsBtn.classList.remove('active'), 2500);
      }

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      if (asturiasMap) {
        asturiasMap.setView([lat, lon], 9, { animate: true });

        if (userGpsMarker) {
          asturiasMap.removeLayer(userGpsMarker);
          userGpsMarker = null;
        }
        if (userAccuracyCircle) {
          asturiasMap.removeLayer(userAccuracyCircle);
          userAccuracyCircle = null;
        }

        const userGpsIcon = L.divIcon({
          className: 'radar-gps-marker',
          html: `
            <div class="radar-pulse-ring user-location"></div>
            <div class="radar-pulse-dot user-location" title="Mi Posición"></div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14]
        });

        userGpsMarker = L.marker([lat, lon], { icon: userGpsIcon })
          .addTo(asturiasMap)
          .bindTooltip('📍 Mi Posición (GPS)', {
            permanent: false,
            direction: 'top',
            offset: [0, -12],
            className: 'radar-concejo-tooltip radar-user-tooltip'
          });

        if (accuracy && accuracy < 6000) {
          userAccuracyCircle = L.circle([lat, lon], {
            radius: Math.min(accuracy, 2500),
            color: '#ef4444',
            weight: 1.5,
            fillColor: '#ef4444',
            fillOpacity: 0.12
          }).addTo(asturiasMap);
        }
      }
      resizeMap();
    },
    (err) => {
      if (gpsBtn) {
        gpsBtn.innerHTML = '📍 Mi Posición';
        gpsBtn.disabled = false;
      }
      console.warn('GPS location error:', err);
      if (gpsBtn) {
        gpsBtn.innerHTML = '⚠️ Sin permiso GPS';
        setTimeout(() => { gpsBtn.innerHTML = '📍 Mi Posición'; }, 3000);
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
}

/**
 * Conmuta el modo Pantalla Completa en el contenedor del radar (Leyes 11 y 14)
 */
export function toggleRadarFullscreen() {
  const radarWrapper = document.querySelector('.radar-wrapper') || document.getElementById('panel-radar');
  if (!radarWrapper) return;

  const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
  if (!isFs) {
    if (radarWrapper.requestFullscreen) {
      radarWrapper.requestFullscreen().catch(err => console.warn('Fullscreen err:', err));
    } else if (radarWrapper.webkitRequestFullscreen) {
      radarWrapper.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(err => console.warn('Exit fullscreen err:', err));
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/**
 * Escucha eventos de cambio de pantalla completa para sincronizar controles y redimensionar el mapa
 */
function initFullscreenListeners() {
  const onFsChange = () => {
    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const fsBtn = document.getElementById('btn-radar-fullscreen');
    if (fsBtn) {
      fsBtn.innerHTML = isFs ? '✕ Salir' : '⛶ Pantalla Completa';
      fsBtn.classList.toggle('active', isFs);
    }
    resizeMap();
    setTimeout(() => resizeMap(), 150);
  };
  document.removeEventListener('fullscreenchange', onFsChange);
  document.removeEventListener('webkitfullscreenchange', onFsChange);
  document.addEventListener('fullscreenchange', onFsChange);
  document.addEventListener('webkitfullscreenchange', onFsChange);
}

/**
 * Inicializa el panel desplegable de Ajustes del Radar y sincroniza con localStorage
 */
function initRadarSettingsControls() {
  if (settingsInitialized) return;
  settingsInitialized = true;

  const toggleBtn = document.getElementById('btn-radar-settings-toggle');
  const panel = document.getElementById('radar-settings-panel');

  if (toggleBtn && panel) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = panel.style.display !== 'none';
      panel.style.display = isVisible ? 'none' : 'block';
      toggleBtn.classList.toggle('active', !isVisible);
      toggleBtn.setAttribute('aria-expanded', !isVisible);
    });
  }

  // Sincronizar estado visual de las pastillas con localStorage
  const pills = document.querySelectorAll('.radar-setting-pill');
  pills.forEach(pill => {
    const setting = pill.dataset.setting;
    const val = pill.dataset.val;

    if (setting === 'palette') {
      pill.classList.toggle('active', val === radarPalette);
    } else if (setting === 'opacity') {
      pill.classList.toggle('active', parseFloat(val).toFixed(2) === parseFloat(radarOpacity).toFixed(2));
    } else if (setting === 'speed') {
      pill.classList.toggle('active', parseInt(val, 10) === radarSpeed);
    }

    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      const currSetting = pill.dataset.setting;
      const currVal = pill.dataset.val;

      // Actualizar estado activo en el grupo
      document.querySelectorAll(`.radar-setting-pill[data-setting="${currSetting}"]`).forEach(p => {
        p.classList.toggle('active', p === pill);
      });

      if (currSetting === 'palette') {
        radarPalette = currVal;
        try { localStorage.setItem('meteoastur_radar_palette', radarPalette); } catch (_) {}
        showRadarFrame(currentFrameIndex, radarHost);
      } else if (currSetting === 'opacity') {
        radarOpacity = currVal;
        try { localStorage.setItem('meteoastur_radar_opacity', radarOpacity); } catch (_) {}
        if (radarTileLayer) {
          radarTileLayer.setOpacity(parseFloat(radarOpacity));
        }
      } else if (currSetting === 'speed') {
        radarSpeed = parseInt(currVal, 10);
        try { localStorage.setItem('meteoastur_radar_speed', String(radarSpeed)); } catch (_) {}
        if (isPlaying) {
          if (animationTimer) clearInterval(animationTimer);
          animationTimer = setInterval(() => {
            currentFrameIndex = (currentFrameIndex + 1) % radarFrames.length;
            showRadarFrame(currentFrameIndex, radarHost);
          }, radarSpeed);
        }
      }
    });
  });

  // Vincular botones de GPS y Pantalla Completa si no están enlazados
  const gpsBtn = document.getElementById('btn-radar-gps');
  if (gpsBtn && !gpsBtn._bound) {
    gpsBtn._bound = true;
    gpsBtn.addEventListener('click', () => locateUserGps());
  }

  const fsBtn = document.getElementById('btn-radar-fullscreen');
  if (fsBtn && !fsBtn._bound) {
    fsBtn._bound = true;
    fsBtn.addEventListener('click', () => toggleRadarFullscreen());
  }

  initFullscreenListeners();
}

