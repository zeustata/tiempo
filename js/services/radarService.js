/**
 * Servicio para capas de radar meteorológico en directo de RainViewer
 */
export async function fetchRainViewerRadar() {
  try {
    const res = await fetch('https://api.rainviewer.com/public/weather-maps.json');
    if (!res.ok) throw new Error('RainViewer offline');
    const data = await res.json();
    return {
      host: data.host || 'https://tilecache.rainviewer.com',
      radar: data.radar || { past: [], nowcast: [] },
      satellite: data.satellite || {},
      generated: data.generated
    };
  } catch (err) {
    console.warn('RainViewer unavailable:', err);
    return null;
  }
}

/**
 * Clasifica el color RGBA de la tesela del radar de RainViewer (paleta TITAN / estándar)
 * Retorna nivel de intensidad, código WMO, estimación de precipitación y si es tormenta
 */
export function classifyRadarColor(r, g, b, a) {
  if (a < 80) return { level: 'dry', label: 'Sin precipitación', isRain: false, isStorm: false, precipEst: 0 };

  // Magenta / Morado intenso (Tormenta convectiva severa / Granizo / Lluvia torrencial > 50 dBZ)
  if (r >= 190 && b >= 160 && g <= 180) {
    return { level: 'extreme_storm', label: 'Tormenta torrencial / Eléctrica', isRain: true, isStorm: true, wmoCode: 95, precipEst: 20.0 };
  }
  // Rojo intenso / Carmesí (Tormenta / Lluvia torrencial 45-55 dBZ)
  if (r >= 130 && g <= 60 && b <= 60) {
    return { level: 'storm', label: 'Tormenta / Lluvia torrencial', isRain: true, isStorm: true, wmoCode: 95, precipEst: 15.0 };
  }
  // Naranja (Chubascos fuertes / Lluvia convectiva 35-45 dBZ)
  if (r >= 210 && g >= 90 && g <= 190 && b <= 60) {
    return { level: 'heavy_rain', label: 'Chubascos fuertes', isRain: true, isStorm: false, wmoCode: 81, precipEst: 6.0 };
  }
  // Amarillo (Lluvia moderada 25-35 dBZ)
  if (r >= 200 && g >= 190 && b <= 70) {
    return { level: 'moderate_rain', label: 'Lluvia moderada', isRain: true, isStorm: false, wmoCode: 63, precipEst: 2.5 };
  }
  // Verde (Lluvia débil 15-25 dBZ)
  if (g >= 140 && r <= 120 && b <= 120) {
    return { level: 'light_rain', label: 'Lluvia débil', isRain: true, isStorm: false, wmoCode: 61, precipEst: 0.4 };
  }
  // Azul / Cian puro (Lluvia débil / Orbayu 10-20 dBZ)
  if ((b >= 160 && r <= 100) || (r <= 70 && g >= 150 && b >= 200)) {
    return { level: 'light_rain', label: 'Lluvia débil / Orbayu', isRain: true, isStorm: false, wmoCode: 61, precipEst: 0.2 };
  }
  // Si no encaja estrictamente en ningún color de precipitación del radar Doppler: ES SECO
  return { level: 'dry', label: 'Sin precipitación', isRain: false, isStorm: false, precipEst: 0 };
}

/**
 * Consulta en tiempo real la reflectividad del radar de RainViewer para unas coordenadas exactas.
 * Descarga la tesela 256x256 centrada en lat/lon y analiza el núcleo central (Nowcasting).
 * Timeout de 1.6s para no demorar la carga.
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
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Radar echo timeout')), 1600));
    const radarData = await Promise.race([metaPromise, timeoutPromise]);
    if (!radarData || !radarData.radar || !radarData.radar.past || !radarData.radar.past.length) {
      return null;
    }
    const host = radarData.host || 'https://tilecache.rainviewer.com';
    const latest = radarData.radar.past[radarData.radar.past.length - 1];
    const tileUrl = `${host}${latest.path}/256/7/${lat}/${lon}/2/0_0.png`;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = tileUrl;

    await Promise.race([
      new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Image load timeout')), 1400))
    ]);

    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);

    // Soberanía estricta del Píxel Central (la coordenada exacta del usuario):
    const centerP = ctx.getImageData(128, 128, 1, 1).data;
    const centerEcho = classifyRadarColor(centerP[0], centerP[1], centerP[2], centerP[3]);

    // Si sobre la cabeza del usuario no hay lluvia activa (está en seco o fuera del eco):
    // El radar NO fuerza lluvia. Retorna hasEcho: false y deja que el cielo quede en su estado real.
    if (!centerEcho.isRain) {
      return {
        hasEcho: false,
        echo: centerEcho,
        timestamp: latest.time
      };
    }

    // Si sobre el usuario SÍ hay lluvia activa:
    // Muestreo muy estrecho (+/- 1 píxel, ~500 metros) únicamente para afinar intensidad local
    let localEcho = { ...centerEcho, dx: 0, dy: 0 };
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const p = ctx.getImageData(128 + dx, 128 + dy, 1, 1).data;
        const c = classifyRadarColor(p[0], p[1], p[2], p[3]);
        if (c.isRain && c.precipEst > localEcho.precipEst) {
          localEcho = { ...c, dx, dy };
        }
      }
    }

    return {
      hasEcho: localEcho.isRain,
      echo: localEcho,
      timestamp: latest.time
    };
  } catch (err) {
    console.warn('Radar echo detection fallback:', err.message);
    return null;
  }
}
