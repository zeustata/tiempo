let cachedRainViewerData = null;
let cachedRainViewerTime = 0;
const satCloudCache = new Map();
const SAT_CLOUD_CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * Servicio para capas de radar meteorológico en directo de RainViewer
 * Con caché en memoria de 3 minutos para evitar peticiones redundantes
 */
export async function fetchRainViewerRadar() {
  const now = Date.now();
  if (cachedRainViewerData && (now - cachedRainViewerTime < 180000)) {
    return cachedRainViewerData;
  }
  try {
    const res = await fetch('https://api.rainviewer.com/public/weather-maps.json');
    if (!res.ok) throw new Error('RainViewer offline');
    const data = await res.json();
    cachedRainViewerData = {
      host: data.host || 'https://tilecache.rainviewer.com',
      radar: data.radar || { past: [], nowcast: [] },
      satellite: data.satellite || {},
      generated: data.generated
    };
    cachedRainViewerTime = now;
    return cachedRainViewerData;
  } catch (err) {
    if (cachedRainViewerData) return cachedRainViewerData;
    console.warn('RainViewer unavailable:', err);
    return null;
  }
}

/**
 * Clasifica el color RGBA de la tesela del radar de RainViewer (paleta TITAN / estándar)
 * Retorna nivel de intensidad, código WMO, estimación de precipitación y si es tormenta
 */
export function classifyRadarColor(r, g, b, a) {
  // En la paleta oficial de RainViewer (esquema 2), los ecos reales de precipitación tienen opacidad alta (a >= 180).
  // Las capas semitransparentes grises/beige (a < 180 o baja saturación cromática) son cobertura nubosa seca o virga.
  if (a < 180) return { level: 'dry', label: 'Sin precipitación', isRain: false, isStorm: false, precipEst: 0 };

  // Filtro anti-máscara gris/arena/beige: si los tres canales están próximos entre sí (baja saturación cromática), no es eco Doppler
  const maxC = Math.max(r, g, b);
  const minC = Math.min(r, g, b);
  if (maxC - minC < 65) {
    return { level: 'dry', label: 'Sin precipitación', isRain: false, isStorm: false, precipEst: 0 };
  }

  // Magenta / Morado intenso (Tormenta convectiva severa / Granizo / Lluvia torrencial > 50 dBZ)
  if (r >= 180 && b >= 150 && g <= 170) {
    return { level: 'extreme_storm', label: 'Tormenta torrencial / Eléctrica', isRain: true, isStorm: true, wmoCode: 95, precipEst: 20.0 };
  }
  // Rojo intenso / Carmesí (Tormenta / Lluvia torrencial 45-55 dBZ)
  if (r >= 140 && g <= 65 && b <= 65) {
    return { level: 'storm', label: 'Tormenta / Lluvia torrencial', isRain: true, isStorm: true, wmoCode: 95, precipEst: 15.0 };
  }
  // Naranja (Chubascos fuertes / Lluvia convectiva 35-45 dBZ)
  if (r >= 210 && g >= 85 && g <= 185 && b <= 65) {
    return { level: 'heavy_rain', label: 'Chubascos fuertes', isRain: true, isStorm: false, wmoCode: 81, precipEst: 6.0 };
  }
  // Amarillo puro (Lluvia moderada 25-35 dBZ; < 2.5 mm para no disparar falso Bastinazu)
  if (r >= 200 && g >= 185 && b <= 70) {
    return { level: 'moderate_rain', label: 'Lluvia moderada', isRain: true, isStorm: false, wmoCode: 63, precipEst: 1.8 };
  }
  // Verde (Lluvia débil 15-25 dBZ)
  if (g >= 140 && r <= 120 && b <= 120) {
    return { level: 'light_rain', label: 'Lluvia débil', isRain: true, isStorm: false, wmoCode: 61, precipEst: 0.2 };
  }
  // Azul / Cian puro (Lluvia débil / Orbayu 10-20 dBZ, incluyendo azules oscuros RGB(0,105,156) y cianes claros de RainViewer)
  if ((b >= 120 && r <= 125 && b > g) || (r <= 120 && g >= 140 && b >= 190)) {
    return { level: 'light_rain', label: 'Lluvia débil / Orbayu', isRain: true, isStorm: false, wmoCode: 61, precipEst: 0.2 };
  }

  // Si no encaja estrictamente en ningún color de precipitación del radar Doppler: ES SECO
  return { level: 'dry', label: 'Sin precipitación', isRain: false, isStorm: false, precipEst: 0 };
}

/**
 * Convierte coordenadas (lat, lon) a número de tesela Slippy (xTile, yTile)
 * y posición de píxel (px, py) dentro de la tesela de 256x256 píxeles a nivel de zoom dado.
 */
export function latLonToTilePixel(lat, lon, zoom = 7) {
  const latRad = (lat * Math.PI) / 180;
  const n = Math.pow(2, zoom);
  const xExact = ((lon + 180) / 360) * n;
  const yExact = (1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2 * n;
  const xTile = Math.floor(xExact);
  const yTile = Math.floor(yExact);
  const px = Math.min(255, Math.max(0, Math.floor((xExact - xTile) * 256)));
  const py = Math.min(255, Math.max(0, Math.floor((yExact - yTile) * 256)));
  return { xTile, yTile, px, py };
}

/**
 * Consulta en tiempo real la reflectividad del radar de RainViewer para unas coordenadas exactas.
 * Descarga la tesela 256x256 que cubre lat/lon y analiza el píxel exacto y su entorno inmediato (Nowcasting).
 * Timeout de 2.2s para no demorar la carga.
 */
export async function fetchLiveRadarEcho(lat, lon) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    if (typeof globalThis !== 'undefined' && globalThis.__TEST_RADAR_ECHO__) {
      return globalThis.__TEST_RADAR_ECHO__;
    }
    return null;
  }
  try {
    const metaPromise = fetchRainViewerRadar();
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Radar echo timeout')), 3500));
    const radarData = await Promise.race([metaPromise, timeoutPromise]);
    if (!radarData || !radarData.radar || !radarData.radar.past || !radarData.radar.past.length) {
      return null;
    }
    const host = radarData.host || 'https://tilecache.rainviewer.com';
    const latest = radarData.radar.past[radarData.radar.past.length - 1];

    // Cálculo exacto de la tesela Slippy (xTile, yTile) y la posición del píxel (px, py)
    const zoom = 7;
    const { xTile, yTile, px, py } = latLonToTilePixel(lat, lon, zoom);
    const tileUrl = `${host}${latest.path}/256/${zoom}/${xTile}/${yTile}/2/0_0.png`;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = tileUrl;

    await Promise.race([
      new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Image load timeout')), 3000))
    ]);

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);

    // Prioridad Absoluta del Píxel Central exacto de las coordenadas (Doctrina Lendo):
    // Si en el punto exacto de la ubicación no hay eco de lluvia, jamás se arrastra lluvia de píxeles vecinos.
    const centerP = ctx.getImageData(px, py, 1, 1).data;
    const bestEcho = classifyRadarColor(centerP[0], centerP[1], centerP[2], centerP[3]);

    // Muestreo de ventana 3x3 alrededor del píxel central para detectar ecos débiles (orbayu fino / nube cargada)
    const xStart = Math.max(0, px - 1);
    const yStart = Math.max(0, py - 1);
    const xEnd = Math.min(255, px + 1);
    const yEnd = Math.min(255, py + 1);
    const winData = ctx.getImageData(xStart, yStart, xEnd - xStart + 1, yEnd - yStart + 1).data;
    let weakPixels = 0;
    for (let i = 0; i < winData.length; i += 4) {
      if (winData[i + 3] >= 50) {
        weakPixels++;
      }
    }
    const centerAlpha = centerP[3];
    const hasWeakCloudEcho = centerAlpha >= 50 && weakPixels >= 5;

    if (!bestEcho.isRain) {
      return {
        hasEcho: false,
        echo: bestEcho,
        timestamp: latest.time,
        centerAlpha,
        weakPixels,
        hasWeakCloudEcho
      };
    }

    return {
      hasEcho: true,
      echo: bestEcho,
      timestamp: latest.time,
      centerAlpha,
      weakPixels,
      hasWeakCloudEcho
    };
  } catch (err) {
    console.warn('Radar echo detection fallback:', err.message);
    return null;
  }
}

/**
 * Consulta en tiempo real la Máscara Oficial de Nubes de EUMETSAT Meteosat (msg_fes:clm, TIME=current).
 * Analiza una cuadrícula 15x15 (~16x16 km) centrada en las coordenadas del concejo y calcula
 * el porcentaje total de cobertura nubosa satelital y el porcentaje del núcleo central 3x3.
 */
export async function fetchLiveSatelliteCloudCover(lat, lon) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    if (typeof globalThis !== 'undefined' && globalThis.__TEST_SAT_CLOUD__) {
      return globalThis.__TEST_SAT_CLOUD__;
    }
    return null;
  }

  const cacheKey = `${Number(lat).toFixed(2)},${Number(lon).toFixed(2)}`;
  const cached = satCloudCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp < SAT_CLOUD_CACHE_TTL_MS)) {
    return cached;
  }

  try {
    const deg = 0.08;
    const bbox = `${(lon - deg).toFixed(4)},${(lat - deg).toFixed(4)},${(lon + deg).toFixed(4)},${(lat + deg).toFixed(4)}`;
    const url = `https://view.eumetsat.int/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&LAYERS=msg_fes:clm&STYLES=&BBOX=${bbox}&TIME=current&WIDTH=15&HEIGHT=15&FORMAT=image/png&SRS=EPSG:4326`;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;

    await Promise.race([
      new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Satellite timeout')), 3000))
    ]);

    const canvas = document.createElement('canvas');
    canvas.width = 15;
    canvas.height = 15;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, 15, 15);
    const data = ctx.getImageData(0, 0, 15, 15).data;

    let cloud = 0;
    let centerCloud = 0;
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 15; x++) {
        const idx = (y * 15 + x) * 4;
        const isCloud = data[idx + 3] >= 180 && data[idx] >= 180 && data[idx + 1] >= 180 && data[idx + 2] >= 180;
        if (isCloud) {
          cloud++;
          if (x >= 6 && x <= 8 && y >= 6 && y <= 8) {
            centerCloud++;
          }
        }
      }
    }

    const result = {
      cloudPct: Math.round((100 * cloud) / 225),
      centerCloudPct: Math.round((100 * centerCloud) / 9),
      source: 'EUMETSAT Meteosat (msg_fes:clm)',
      timestamp: Date.now()
    };
    satCloudCache.set(cacheKey, result);
    return result;
  } catch (err) {
    console.warn('Satellite cloud detection fallback:', err.message);
    return null;
  }
}
