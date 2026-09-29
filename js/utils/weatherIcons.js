import { getAsturWeatherSvg } from './weatherAsturIcons.js?v=1.1.29';
import { getPixelWeatherSvg } from './weatherPixelIcons.js?v=1.1.29';
import { getNeonWeatherSvg } from './weatherNeonIcons.js?v=1.1.29';
import { getSketchWeatherSvg } from './weatherSketchIcons.js?v=1.1.29';
import { getGlassWeatherSvg } from './weatherGlassIcons.js?v=1.1.29';
import { getFuturoWeatherSvg } from './weatherFuturoIcons.js?v=1.1.29';

/**
 * Mapeo de códigos meteorológicos WMO a descripciones en asturiano/castellano, iconos y clases
 */
export const WMO_CODES = {
  0: { label: 'Despejado / Soleyeru', icon: '☀️', svgKey: 'clear-day', lucide: 'sun', bg: 'clear-day', isRain: false, isSnow: false },
  1: { label: 'Mayormente soleado / Despejáu', icon: '🌤️', svgKey: 'mostly-clear-day', lucide: 'sun-medium', bg: 'clear-day', isRain: false, isSnow: false },
  2: { label: 'Parcialmente nublado / Claros', icon: '⛅', svgKey: 'partly-cloudy-day', lucide: 'cloud-sun', bg: 'partly-cloudy', isRain: false, isSnow: false },
  3: { label: 'Nublado / Cubiertu', icon: '☁️', svgKey: 'cloudy', lucide: 'cloud', bg: 'cloudy', isRain: false, isSnow: false },
  45: { label: 'Niebla / Borrina', icon: '🌫️', svgKey: 'fog', lucide: 'cloud-fog', bg: 'fog', isRain: false, isSnow: false },
  48: { label: 'Niebla con escarcha', icon: '🌫️', svgKey: 'fog', lucide: 'cloud-fog', bg: 'fog', isRain: false, isSnow: false },
  51: { label: 'Orbayu llixeru (Llovizna ligera)', icon: '🌦️', svgKey: 'drizzle', lucide: 'cloud-drizzle', bg: 'drizzle', isRain: true, isSnow: false },
  53: { label: 'Orbayu moderado', icon: '🌦️', svgKey: 'drizzle', lucide: 'cloud-drizzle', bg: 'drizzle', isRain: true, isSnow: false },
  55: { label: 'Orbayu trupu (Llovizna densa)', icon: '🌧️', svgKey: 'drizzle', lucide: 'cloud-drizzle', bg: 'drizzle', isRain: true, isSnow: false },
  56: { label: 'Llovizna helada ligera', icon: '🌧️', svgKey: 'drizzle', lucide: 'cloud-drizzle', bg: 'drizzle', isRain: true, isSnow: false },
  57: { label: 'Llovizna helada densa', icon: '🌧️', svgKey: 'drizzle', lucide: 'cloud-drizzle', bg: 'drizzle', isRain: true, isSnow: false },
  61: { label: 'Lluvia débil', icon: '🌧️', svgKey: 'rain', lucide: 'cloud-rain', bg: 'rain', isRain: true, isSnow: false },
  63: { label: 'Lluvia moderada', icon: '🌧️', svgKey: 'rain', lucide: 'cloud-rain', bg: 'rain', isRain: true, isSnow: false },
  65: { label: 'Lluvia fuerte / Bastinazu', icon: '🌧️', svgKey: 'heavy-rain', lucide: 'cloud-rain-wind', bg: 'heavy-rain', isRain: true, isSnow: false },
  66: { label: 'Lluvia helada ligera', icon: '🌧️', svgKey: 'rain', lucide: 'cloud-rain', bg: 'rain', isRain: true, isSnow: false },
  67: { label: 'Lluvia helada fuerte', icon: '🌧️', svgKey: 'heavy-rain', lucide: 'cloud-rain-wind', bg: 'heavy-rain', isRain: true, isSnow: false },
  68: { label: 'Aguanieve ligera (Lluvia con nieve)', icon: '🌨️', svgKey: 'sleet', lucide: 'cloud-sleet', bg: 'rain', isRain: true, isSnow: true },
  69: { label: 'Aguanieve moderada o fuerte', icon: '🌨️', svgKey: 'sleet', lucide: 'cloud-sleet', bg: 'heavy-rain', isRain: true, isSnow: true },
  71: { label: 'Nevada ligera / Falispos', icon: '🌨️', svgKey: 'snow-light', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  73: { label: 'Nevada moderada', icon: '🌨️', svgKey: 'snow', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  75: { label: 'Nevadona fuerte / Copiosa', icon: '❄️', svgKey: 'heavy-snow', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  77: { label: 'Granizo menudo / Cinarra', icon: '🌨️', svgKey: 'hail', lucide: 'cloud-hail', bg: 'snow', isRain: false, isSnow: true },
  80: { label: 'Chubascos de orbayu', icon: '🌦️', svgKey: 'drizzle', lucide: 'cloud-drizzle', bg: 'drizzle', isRain: true, isSnow: false },
  81: { label: 'Chubascos moderados', icon: '🌧️', svgKey: 'rain', lucide: 'cloud-rain', bg: 'rain', isRain: true, isSnow: false },
  82: { label: 'Chubascos violentos / Bastinazu', icon: '⛈️', svgKey: 'storm', lucide: 'cloud-lightning', bg: 'heavy-rain', isRain: true, isSnow: false },
  83: { label: 'Chubascos de aguanieve ligeros', icon: '🌨️', svgKey: 'sleet', lucide: 'cloud-sleet', bg: 'rain', isRain: true, isSnow: true },
  84: { label: 'Chubascos de aguanieve fuertes', icon: '🌨️', svgKey: 'sleet', lucide: 'cloud-sleet', bg: 'heavy-rain', isRain: true, isSnow: true },
  85: { label: 'Chubascos de nieve ligeros', icon: '🌨️', svgKey: 'snow-light', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  86: { label: 'Chubascos de nieve fuertes / Nevadona', icon: '❄️', svgKey: 'heavy-snow', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  89: { label: 'Chubascos de granizo', icon: '🌨️', svgKey: 'hail', lucide: 'cloud-hail', bg: 'heavy-rain', isRain: true, isSnow: false },
  90: { label: 'Chubascos de pedriscu fuerte', icon: '⛈️', svgKey: 'hail', lucide: 'cloud-hail', bg: 'heavy-rain', isRain: true, isSnow: false },
  95: { label: 'Tormenta', icon: '⛈️', svgKey: 'storm', lucide: 'cloud-lightning', bg: 'storm', isRain: true, isSnow: false },
  96: { label: 'Tormenta con granizo', icon: '⛈️', svgKey: 'hail', lucide: 'cloud-lightning', bg: 'storm', isRain: true, isSnow: false },
  99: { label: 'Tormenta con pedriscu violento', icon: '⛈️', svgKey: 'hail', lucide: 'cloud-lightning', bg: 'storm', isRain: true, isSnow: false }
};

/**
 * Umbrales de radiación solar y UV calibrados estacionalmente para Asturias (latitud ~43.5° N)
 * Evita la trampa astronómica de exigir índices UV o radiación veraniega en otoño o invierno.
 */
export function getSeasonalSolarThresholds(date = new Date()) {
  const month = date.getMonth(); // 0: Ene, 1: Feb, ..., 8: Sep, 9: Oct, 11: Dic
  // Invierno (Dic, Ene, Feb): Sol bajo (máx solar ~23° a 30°). UV máx teórico despejado: 1.5 - 2.5
  if (month === 11 || month === 0 || month === 1) {
    return {
      uvStrict: 1.8,
      uvModerate: 1.4,
      swGlobalHigh: 300,
      directMinResol: 320
    };
  }
  // Otoño medio / Primavera temprana (Nov, Mar): Sol medio-bajo. UV máx teórico despejado: ~3.0 - 4.0
  if (month === 10 || month === 2) {
    return {
      uvStrict: 2.5,
      uvModerate: 2.0,
      swGlobalHigh: 400,
      directMinResol: 380
    };
  }
  // Primavera / Principios de otoño (Abr, Sep, Oct): UV máx teórico despejado: ~4.5 - 6.0
  if (month === 3 || month === 8 || month === 9) {
    return {
      uvStrict: 3.0,
      uvModerate: 2.4,
      swGlobalHigh: 460,
      directMinResol: 450
    };
  }
  // Verano pleno (May, Jun, Jul, Ago): Sol alto (hasta 70°). UV máx teórico despejado: 7.5 - 9.0
  return {
    uvStrict: 4.2,
    uvModerate: 3.6,
    swGlobalHigh: 540,
    directMinResol: 500
  };
}

export function getWeatherInfo(code, isDay = 1, precipitation = null, pop = null, directIrradiance = null, uvIndex = null, shortwaveRadiation = null, cloudCover = null) {
  let base = WMO_CODES[code] || { label: 'Variable', icon: '⛅', svgKey: 'cloudy', lucide: 'cloud', bg: 'cloudy', isRain: false, isSnow: false };

  const isNight = isDay === 0 || isDay === false;

  // 1. Si es de noche, adaptar los iconos solares base a nocturnos
  if (isNight) {
    if (code === 0) {
      base = { ...base, label: 'Despejado / Cielo Nocturno', icon: '🌙', svgKey: 'clear-night', bg: 'clear-night' };
    } else if (code === 1) {
      base = { ...base, label: 'Poco nuboso de noche', icon: '🌙', svgKey: 'mostly-clear-night', bg: 'mostly-clear-night' };
    } else if (code === 2) {
      base = { ...base, label: 'Parcialmente nublado', icon: '☁️🌙', svgKey: 'partly-cloudy-night', bg: 'partly-cloudy-night' };
    } else if (code === 3) {
      base = { ...base, label: 'Nublado de noche', icon: '☁️', svgKey: 'cloudy', bg: 'cloudy' };
    }
  }

  // 2. Graduación y coherencia de lluvia física (LA PROBABILIDAD NUNCA INVENTA LLUVIA)
  if (precipitation !== null || pop !== null) {
    const p = precipitation != null ? Math.max(0, parseFloat(precipitation)) : 0;
    const hasPop = pop !== null && pop !== undefined;
    const prob = hasPop ? Math.max(0, parseFloat(pop)) : null;

    // Lluvia física real medible en pluviómetro (>= 0.1 mm) o código WMO explícito de lluvia
    const isPhysicallyRaining = p >= 0.1;
    const isExplicitRainCode = base.isRain || base.svgKey === 'drizzle' || base.svgKey === 'rain' || base.svgKey === 'storm';

    // REGLA 1: Si el código base es de tiempo seco (sol, claros, nublado) y no cae lluvia física (p < 0.1 mm),
    // la probabilidad estadística jamás transforma el cielo en lluvia. Se respeta el estado del cielo.
    if (!isPhysicallyRaining && !isExplicitRainCode) {
      // El estado base (despejado, parcialmente nublado, cubierto, etc.) se preserva intacto
    }
    // REGLA 2: Si el modelo traía un código de lluvia pero la probabilidad es ínfima (< 20%) y no cae lluvia física (p < 0.1):
    // anular a 'Nublado' para evitar falsas alarmas
    else if (hasPop && prob < 20 && !isPhysicallyRaining && code !== 61 && code !== 63 && code !== 65 && code !== 81 && code !== 82 && code !== 95 && code !== 96 && code !== 99) {
      if (isExplicitRainCode) {
        base = {
          label: isNight ? 'Nublado de noche' : 'Nublado / Cubiertu',
          icon: '☁️',
          svgKey: 'cloudy',
          lucide: 'cloud',
          bg: isNight ? 'partly-cloudy-night' : 'cloudy',
          isRain: false,
          isSnow: false
        };
      }
    }
    // REGLA 3: Solo se califica como precipitación si hay agua/nieve física cayendo (p >= 0.1 mm) o código confirmado
    else if (isPhysicallyRaining || isExplicitRainCode || base.isSnow) {
      const isHail = code === 77 || code === 89 || code === 90 || code === 96 || code === 99 || base.svgKey === 'hail';
      const isSleet = code === 68 || code === 69 || code === 83 || code === 84 || base.svgKey === 'sleet';
      const isSnow = (code >= 71 && code <= 75) || code === 85 || code === 86 || base.isSnow;
      const isStorm = code === 95;

      // 🧊 Caso A: Granizo / Pedriscu (suele ser siempre fuerte y peligroso)
      if (isHail) {
        base = {
          label: (code === 96 || code === 99) ? 'Tormenta con granizo' : (code === 90 ? 'Chubasco de pedriscu fuerte' : 'Granizo / Pedriscu'),
          icon: '⛈️',
          svgKey: 'hail',
          lucide: 'cloud-hail',
          bg: (code === 96 || code === 99) ? 'storm' : 'heavy-rain',
          isRain: true,
          isSnow: false
        };
      }
      // 🌧️❄️ Caso B: Aguanieve (Lluvia con nieve mezclada)
      else if (isSleet) {
        base = {
          label: 'Aguanieve (Lluvia con nieve)',
          icon: '🌨️',
          svgKey: 'sleet',
          lucide: 'cloud-sleet',
          bg: p >= 2.5 ? 'heavy-rain' : 'rain',
          isRain: true,
          isSnow: true
        };
      }
      // ❄️ Caso C: Nieve graduada por el pluviómetro
      else if (isSnow) {
        if (p >= 2.5 || code === 75 || code === 86) {
          base = {
            label: 'Nevadona fuerte / Copiosa',
            icon: '❄️',
            svgKey: 'heavy-snow',
            lucide: 'snowflake',
            bg: 'snow',
            isRain: false,
            isSnow: true
          };
        } else if (p >= 0.8 || code === 73) {
          base = {
            label: 'Nevada moderada',
            icon: '🌨️',
            svgKey: 'snow',
            lucide: 'snowflake',
            bg: 'snow',
            isRain: false,
            isSnow: true
          };
        } else {
          base = {
            label: 'Nevada ligera / Falispos',
            icon: '🌨️',
            svgKey: 'snow-light',
            lucide: 'snowflake',
            bg: 'snow',
            isRain: false,
            isSnow: true
          };
        }
      }
      // ⛈️ Caso D: Tormenta eléctrica pura (WMO 95) -> con rayo
      else if (isStorm) {
        base = {
          label: 'Tormenta eléctrica',
          icon: '⛈️',
          svgKey: 'storm',
          lucide: 'cloud-lightning',
          bg: 'storm',
          isRain: true,
          isSnow: false
        };
      }
      // 🌧️🌊 Caso E: Lluvia fuerte / Bastinazu (>= 2.5 mm o códigos 65 / 82) -> 5 gotas densas SIN RAYO
      else if (p >= 2.5 || code === 65 || code === 82) {
        base = {
          label: 'Lluvia fuerte / Bastinazu',
          icon: '🌧️',
          svgKey: 'heavy-rain',
          lucide: 'cloud-rain-wind',
          bg: 'heavy-rain',
          isRain: true,
          isSnow: false
        };
      }
      // 🌧️ Caso F: Lluvia moderada (p >= 0.5 mm o códigos 63 / 81 o código 61 con lluvia física >= 0.2 mm)
      else if (p >= 0.5 || code === 63 || code === 81 || (code === 61 && p >= 0.2)) {
        base = {
          label: 'Lluvia moderada',
          icon: '🌧️',
          svgKey: 'rain',
          lucide: 'cloud-rain',
          bg: 'rain',
          isRain: true,
          isSnow: false
        };
      }
      // 💧 Caso G: Orbayu / Llovizna ligera (p >= 0.1 mm o códigos 51/53/55/56/57/80/61)
      else {
        base = {
          label: isNight ? 'Orbayu nocturno ligero' : 'Orbayu / Llovizna ligera',
          icon: isNight ? '🌧️' : '🌦️',
          svgKey: 'drizzle',
          lucide: 'cloud-drizzle',
          bg: 'drizzle',
          isRain: true,
          isSnow: false
        };
      }
    }
  }

  // 3. Calibración Solar Inteligente Estacional & Detector Asturiano de Resol
  // Si es de día y no cae precipitación física en el suelo (p < 0.1 mm):
  // - Adapta los umbrales de radiación UV y global al ciclo astronómico estacional en Asturias.
  // - Diferencia físicamente entre la "panza de burro" blanquecina (radiación directa casi nula)
  //   y el "resol" real (radiación directa perpendicular perforando el velo nuboso).
  if (!isNight) {
    const irr = directIrradiance != null ? parseFloat(directIrradiance) : 0;
    const uv = uvIndex != null ? parseFloat(uvIndex) : 0;
    const sw = shortwaveRadiation != null ? parseFloat(shortwaveRadiation) : 0;
    const p = precipitation != null ? Math.max(0, parseFloat(precipitation)) : 0;
    const cc = cloudCover != null ? parseFloat(cloudCover) : null;
    const thresholds = getSeasonalSolarThresholds();

    // Detección física de haz solar directo (direct normal irradiance)
    const hasDirectBeam = irr >= thresholds.directMinResol;
    let hasRealSolarLight = false;
    let isResol = false;

    if (cc !== null && cc >= 85) {
      // Cobertura casi total o total (85% a 100% de nubes):
      // BLINDAJE ANTI-FALSO RESOL: Se exige obligatoriamente haz solar directo real (irr >= directMinResol)
      // para perforar el velo nuboso. Se elimina el falso positivo por radiación UV difusa.
      if (hasDirectBeam) {
        hasRealSolarLight = true;
        isResol = true;
      }
    } else {
      // Cobertura < 85% o sin dato de nubosidad: desempate por radiación para claros
      hasRealSolarLight = (irr >= 90 || uv >= thresholds.uvModerate || sw >= thresholds.swGlobalHigh);
      isResol = false;
    }

    if (p < 0.1 && hasRealSolarLight && (base.isRain || base.svgKey === 'cloudy' || code === 3 || base.svgKey === 'fog')) {
      base = {
        label: isResol ? 'Resol / Sol tamizáu' : 'Parcialmente nublado / Claros',
        icon: isResol ? '🌥️' : '⛅',
        svgKey: isResol ? 'resol' : 'partly-cloudy-day',
        lucide: 'cloud-sun',
        bg: 'partly-cloudy',
        isRain: false,
        isSnow: false,
        isSolarCalibrated: true,
        isResol: isResol
      };
    }
  }

  return base;
}

/**
 * Renderiza el icono meteorológico según el tema activo:
 * - 'astur': Emojis Emotivos (Cómic Astur con caras y micro-detalles) - Por defecto
 * - 'pixel': Pixel Art Retro (8-bits arcade)
 * - 'neon': Minimalista Neón (Glow & Line Art)
 * - 'sketch': Dibujo a Mano (Hand-Drawn Sketch & Acuarela)
 * - 'glass': Liquid Glass 3D translúcido
 * - 'classic': Emojis nativos estándar del sistema
 */
export function renderWeatherIconHtml(weatherInfo, size = 32, theme = 'astur') {
  if (!weatherInfo) return '';
  
  if (theme === 'classic' || !weatherInfo.svgKey) {
    return `<span class="emoji-weather-icon" style="font-size: ${Math.round(size * 0.85)}px; line-height: 1; display: inline-flex; align-items: center; justify-content: center;">${weatherInfo.icon}</span>`;
  }

  if (theme === 'futuroClasico' || theme === 'futuro' || theme === 'tesla') {
    return getFuturoWeatherSvg(weatherInfo.svgKey, size);
  }

  if (theme === 'pixel') {
    return getPixelWeatherSvg(weatherInfo.svgKey, size);
  }

  if (theme === 'neon') {
    return getNeonWeatherSvg(weatherInfo.svgKey, size);
  }

  if (theme === 'sketch') {
    return getSketchWeatherSvg(weatherInfo.svgKey, size);
  }

  if (theme === 'glass') {
    return getGlassWeatherSvg(weatherInfo.svgKey, size);
  }

  // Por defecto para 'astur' o cualquier clave personalizada
  return getAsturWeatherSvg(weatherInfo.svgKey, size);
}

export function getWindDirection(degrees) {
  const directions = [
    { name: 'Norte', short: 'N', to: 'S', toName: 'Sur', isSouth: false },
    { name: 'Noreste', short: 'NE', to: 'SO', toName: 'Suroeste', isSouth: false },
    { name: 'Este', short: 'E', to: 'O', toName: 'Oeste', isSouth: false },
    { name: 'Sureste', short: 'SE', to: 'NO', toName: 'Noroeste', isSouth: true },
    { name: 'Sur (Vientu del Sur)', short: 'S', to: 'N', toName: 'Norte', isSouth: true },
    { name: 'Suroeste', short: 'SO', to: 'NE', toName: 'Noreste', isSouth: true },
    { name: 'Oeste', short: 'O', to: 'E', toName: 'Este', isSouth: false },
    { name: 'Noroeste', short: 'NO', to: 'SE', toName: 'Sureste', isSouth: false }
  ];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export function getUVDescription(uv) {
  if (uv == null || isNaN(uv)) {
    return { level: 'No disponible', color: 'var(--text-dim)', badge: 'bg-gray-500', advice: 'Este modelo numérico no computa el índice UV diario. Puedes consultar el modelo Auto Multi-Modelo para ver la radiación solar.' };
  }
  if (uv <= 2) return { level: 'Bajo', color: '#10b981', badge: 'bg-green-500', advice: 'Riesgo mínimo. Ideal para actividades al aire libre.' };
  if (uv <= 5) return { level: 'Moderado', color: '#f59e0b', badge: 'bg-amber-500', advice: 'Usa gafas y protección en horas centrales.' };
  if (uv <= 7) return { level: 'Alto', color: '#f97316', badge: 'bg-orange-500', advice: 'Protección SPF 30+ y gorra recomendada.' };
  if (uv <= 10) return { level: 'Muy Alto', color: '#ef4444', badge: 'bg-red-500', advice: 'Evita exposición directa al mediodía.' };
  return { level: 'Extremo', color: '#8b5cf6', badge: 'bg-purple-600', advice: '¡Alerta! Busca sombra y máxima protección.' };
}

export function getAQIDescription(aqi) {
  if (aqi == null) return { level: 'Normal', color: '#10b981', label: 'Sin datos de estación' };
  if (aqi <= 20) return { level: 'Excelente', color: '#10b981', label: 'Aire puro cantábrico' };
  if (aqi <= 40) return { level: 'Bueno', color: '#3b82f6', label: 'Condiciones óptimas' };
  if (aqi <= 60) return { level: 'Moderado', color: '#f59e0b', label: 'Aceptable para exteriores' };
  if (aqi <= 80) return { level: 'Pobre', color: '#f97316', label: 'Sensibles: limitar esfuerzo' };
  return { level: 'Muy Desfavorable', color: '#ef4444', label: 'Alerta ambiental' };
}