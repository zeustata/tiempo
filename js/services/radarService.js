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
  if (a < 50) return { level: 'dry', label: 'Sin precipitación', isRain: false, isStorm: false, precipEst: 0 };

  // Magenta / Morado intenso (Tormenta convectiva severa / Granizo / Lluvia torrencial > 50 dBZ)
  if (r >= 200 && b >= 170) {
    return { level: 'extreme_storm', label: 'Tormenta torrencial / Eléctrica', isRain: true, isStorm: true, wmoCode: 95, precipEst: 25.0 };
  }
  // Rojo intenso / Carmesí (Tormenta / Lluvia torrencial 45-55 dBZ)
  if (r >= 130 && g <= 70 && b <= 70) {
    return { level: 'storm', label: 'Tormenta / Lluvia torrencial', isRain: true, isStorm: true, wmoCode: 95, precipEst: 15.0 };
  }
  // Naranja (Chubascos fuertes / Lluvia convectiva 35-45 dBZ)
  if (r >= 210 && g >= 90 && g <= 200 && b <= 60) {
    return { level: 'heavy_rain', label: 'Chubascos fuertes', isRain: true, isStorm: false, wmoCode: 81, precipEst: 8.0 };
  }
  // Amarillo (Lluvia moderada 25-35 dBZ)
  if (r >= 200 && g >= 190 && b <= 70) {
    return { level: 'moderate_rain', label: 'Lluvia moderada', isRain: true, isStorm: false, wmoCode: 63, precipEst: 4.0 };
  }
  // Azul / Cian / Verde (Lluvia débil / Orbayu 10-25 dBZ)
  if (b >= 70 || g >= 90) {
    return { level: 'light_rain', label: 'Lluvia / Orbayu', isRain: true, isStorm: false, wmoCode: 61, precipEst: 1.2 };
  }
  return { level: 'rain', label: 'Precipitación activa', isRain: true, isStorm: false, wmoCode: 61, precipEst: 1.5 };
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

    // 1. Muestreo de máxima prioridad: Centro exacto (radio estrecho +/- 2 píxeles, ~1.2 km sobre el usuario)
    const centerP = ctx.getImageData(128, 128, 1, 1).data;
    const centerEcho = classifyRadarColor(centerP[0], centerP[1], centerP[2], centerP[3]);

    let localEcho = { ...centerEcho, r: centerP[0], g: centerP[1], b: centerP[2], a: centerP[3], dx: 0, dy: 0 };
    for (let dy = -2; dy <= 2; dy += 2) {
      for (let dx = -2; dx <= 2; dx += 2) {
        if (dx === 0 && dy === 0) continue;
        const p = ctx.getImageData(128 + dx, 128 + dy, 1, 1).data;
        const c = classifyRadarColor(p[0], p[1], p[2], p[3]);
        if (c.precipEst > localEcho.precipEst) {
          localEcho = { ...c, r: p[0], g: p[1], b: p[2], a: p[3], dx, dy };
        }
      }
    }

    // 2. Muestreo periférico secundario (+/- 4 píxeles, ~3 km):
    // SOLO interviene para alertar si se aproxima una tormenta severa (morado/rojo) a menos de 3 km.
    // Jamás arrastra lluvia moderada o fuerte si en tu posición exacta ya ha escampado o está en azul/seco.
    let approachingStorm = null;
    for (let dy = -4; dy <= 4; dy += 2) {
      for (let dx = -4; dx <= 4; dx += 2) {
        if (Math.abs(dx) <= 2 && Math.abs(dy) <= 2) continue;
        const p = ctx.getImageData(128 + dx, 128 + dy, 1, 1).data;
        const c = classifyRadarColor(p[0], p[1], p[2], p[3]);
        if (c.isStorm) {
          approachingStorm = { ...c, r: p[0], g: p[1], b: p[2], a: p[3], dx, dy };
          break;
        }
      }
      if (approachingStorm) break;
    }

    // Soberanía local: manda lo que cae sobre tu cabeza, salvo tormenta severa inmediata a menos de 3 km
    const effectiveEcho = (localEcho.isRain)
      ? localEcho
      : (approachingStorm ? approachingStorm : localEcho);

    return {
      hasEcho: effectiveEcho.isRain,
      echo: effectiveEcho,
      timestamp: latest.time
    };
  } catch (err) {
    console.warn('Radar echo detection fallback:', err.message);
    return null;
  }
}
