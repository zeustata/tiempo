let cachedRainViewerData = null;
let cachedRainViewerTime = 0;

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
  if (a < 50) return { level: 'dry', label: 'Sin precipitación', isRain: false, isStorm: false, precipEst: 0 };

  // Magenta / Morado intenso (Tormenta convectiva severa / Granizo / Lluvia torrencial > 50 dBZ)
  if (r >= 170 && b >= 140 && g <= 180) {
    return { level: 'extreme_storm', label: 'Tormenta torrencial / Eléctrica', isRain: true, isStorm: true, wmoCode: 95, precipEst: 20.0 };
  }
  // Rojo intenso / Carmesí (Tormenta / Lluvia torrencial 45-55 dBZ)
  if (r >= 140 && g <= 70 && b <= 70) {
    return { level: 'storm', label: 'Tormenta / Lluvia torrencial', isRain: true, isStorm: true, wmoCode: 95, precipEst: 15.0 };
  }
  // Naranja (Chubascos fuertes / Lluvia convectiva 35-45 dBZ)
  if (r >= 210 && g >= 80 && g <= 190 && b <= 70) {
    return { level: 'heavy_rain', label: 'Chubascos fuertes', isRain: true, isStorm: false, wmoCode: 81, precipEst: 6.0 };
  }
  // Amarillo (Lluvia moderada 25-35 dBZ)
  if (r >= 200 && g >= 180 && b <= 80) {
    return { level: 'moderate_rain', label: 'Lluvia moderada', isRain: true, isStorm: false, wmoCode: 63, precipEst: 2.5 };
  }
  // Verde (Lluvia moderada/débil)
  if (g >= 140 && r <= 130 && b <= 130) {
    return { level: 'light_rain', label: 'Lluvia débil', isRain: true, isStorm: false, wmoCode: 61, precipEst: 0.6 };
  }
  // Azul / Cian / Cualquier otro eco de radar de RainViewer:
  // En teselas de RainViewer TODO píxel con opacidad >= 50 es reflectividad de precipitación (5-25 dBZ)
  return { level: 'light_rain', label: 'Lluvia débil / Orbayu', isRain: true, isStorm: false, wmoCode: 61, precipEst: 0.3 };
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

    // Muestreo del píxel central exacto de las coordenadas:
    const centerP = ctx.getImageData(px, py, 1, 1).data;
    let bestEcho = classifyRadarColor(centerP[0], centerP[1], centerP[2], centerP[3]);

    // Si el punto exacto no tiene eco o es débil, inspeccionamos el vecindario inmediato (radio ~1.2 km):
    if (!bestEcho.isRain) {
      const neighbors = [];
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = Math.min(255, Math.max(0, px + dx));
          const ny = Math.min(255, Math.max(0, py + dy));
          const np = ctx.getImageData(nx, ny, 1, 1).data;
          const nEcho = classifyRadarColor(np[0], np[1], np[2], np[3]);
          if (nEcho.isRain) neighbors.push(nEcho);
        }
      }
      if (neighbors.length >= 2) {
        const severityOrder = { extreme_storm: 5, storm: 4, heavy_rain: 3, moderate_rain: 2, light_rain: 1 };
        neighbors.sort((a, b) => (severityOrder[b.level] || 0) - (severityOrder[a.level] || 0));
        bestEcho = neighbors[0];
      }
    }

    if (!bestEcho.isRain) {
      return {
        hasEcho: false,
        echo: bestEcho,
        timestamp: latest.time
      };
    }

    return {
      hasEcho: true,
      echo: bestEcho,
      timestamp: latest.time
    };
  } catch (err) {
    console.warn('Radar echo detection fallback:', err.message);
    return null;
  }
}
