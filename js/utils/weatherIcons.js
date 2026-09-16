import { getAsturWeatherSvg } from './weatherAsturIcons.js?v=1.0.81';
import { getPixelWeatherSvg } from './weatherPixelIcons.js?v=1.0.81';
import { getNeonWeatherSvg } from './weatherNeonIcons.js?v=1.0.81';
import { getSketchWeatherSvg } from './weatherSketchIcons.js?v=1.0.81';

/**
 * Mapeo de códigos meteorológicos WMO a descripciones en asturiano/castellano, iconos y clases
 */
export const WMO_CODES = {
  0: { label: 'Despejado / Soleyeru', icon: '☀️', svgKey: 'clear-day', lucide: 'sun', bg: 'clear-day', isRain: false, isSnow: false },
  1: { label: 'Principalmente despejado', icon: '🌤️', svgKey: 'mostly-clear-day', lucide: 'sun-medium', bg: 'clear-day', isRain: false, isSnow: false },
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
  71: { label: 'Nevada ligera', icon: '🌨️', svgKey: 'snow', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  73: { label: 'Nevada moderada', icon: '🌨️', svgKey: 'snow', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  75: { label: 'Nevadona fuerte', icon: '❄️', svgKey: 'snow', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  77: { label: 'Granos de nieve', icon: '🌨️', svgKey: 'snow', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  80: { label: 'Chubascos de orbayu', icon: '🌦️', svgKey: 'drizzle', lucide: 'cloud-drizzle', bg: 'drizzle', isRain: true, isSnow: false },
  81: { label: 'Chubascos moderados', icon: '🌧️', svgKey: 'rain', lucide: 'cloud-rain', bg: 'rain', isRain: true, isSnow: false },
  82: { label: 'Chubascos violentos / Bastinazu', icon: '⛈️', svgKey: 'storm', lucide: 'cloud-lightning', bg: 'heavy-rain', isRain: true, isSnow: false },
  85: { label: 'Chubascos de nieve débiles', icon: '🌨️', svgKey: 'snow', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  86: { label: 'Chubascos de nieve fuertes', icon: '❄️', svgKey: 'snow', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  95: { label: 'Tormenta', icon: '⛈️', svgKey: 'storm', lucide: 'cloud-lightning', bg: 'storm', isRain: true, isSnow: false },
  96: { label: 'Tormenta con granizo débil', icon: '⛈️', svgKey: 'storm', lucide: 'cloud-lightning', bg: 'storm', isRain: true, isSnow: false },
  99: { label: 'Tormenta con granizo fuerte', icon: '⛈️', svgKey: 'storm', lucide: 'cloud-lightning', bg: 'storm', isRain: true, isSnow: false }
};

export function getWeatherInfo(code, isDay = 1, precipitation = null, pop = null, directIrradiance = null, uvIndex = null, shortwaveRadiation = null) {
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
    // REGLA 3: Solo se califica como lluvia si hay agua física cayendo (p >= 0.1 mm) o el código es de lluvia confirmado
    else if (isPhysicallyRaining || isExplicitRainCode) {
      const isStorm = code === 95 || code === 96 || code === 99;

      // Caso A: Tormenta eléctrica real (códigos WMO 95, 96, 99) -> ÚNICO caso con rayo
      if (isStorm) {
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
      // Caso B: Lluvia fuerte / Bastinazu (precipitación abundante >= 2.5 mm o códigos 65 / 82) -> Gotas abundantes, SIN RAYO
      else if (p >= 2.5 || code === 65 || code === 82) {
        base = {
          label: 'Lluvia fuerte / Bastinazu',
          icon: '🌧️',
          svgKey: 'rain',
          lucide: 'cloud-rain',
          bg: 'heavy-rain',
          isRain: true,
          isSnow: false
        };
      }
      // Caso C: Lluvia moderada (p >= 0.5 mm o códigos 63 / 81 o código 61 con lluvia física >= 0.2 mm)
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
      // Caso D: Orbayu / Llovizna ligera (p >= 0.1 mm o códigos 51/53/55/56/57/80/61)
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

  // 3. Calibración Solar Inteligente (Triple Sensor Físico de Radiación en Asturias)
  // Si es de día, no cae precipitación física en el suelo (p < 0.1 mm) y cualquiera de los 3 sensores físicos
  // confirma luz solar activa (radiación directa >= 80 W/m², índice UV >= 2.5 o radiación global >= 120 W/m²):
  // prevalece la realidad física del cielo: reclasificar a "Parcialmente nublado / Claros"
  if (!isNight) {
    const irr = directIrradiance != null ? parseFloat(directIrradiance) : 0;
    const uv = uvIndex != null ? parseFloat(uvIndex) : 0;
    const sw = shortwaveRadiation != null ? parseFloat(shortwaveRadiation) : 0;
    const p = precipitation != null ? Math.max(0, parseFloat(precipitation)) : 0;

    const hasRealSolarLight = irr >= 80 || uv >= 2.5 || sw >= 120;

    if (p < 0.1 && hasRealSolarLight && (base.isRain || base.svgKey === 'cloudy' || code === 3 || base.svgKey === 'fog')) {
      base = {
        label: 'Parcialmente nublado / Claros',
        icon: '⛅',
        svgKey: 'partly-cloudy-day',
        lucide: 'cloud-sun',
        bg: 'partly-cloudy',
        isRain: false,
        isSnow: false,
        isSolarCalibrated: true
      };
    }
  }

  return base;
}

/**
 * Renderiza el icono meteorológico según el tema activo:
 * - 'classic': Emojis nativos estándar
 * - 'astur': Emojis Emotivos (Cómic con caras)
 * - 'pixel': Pixel Art Retro (8-bits arcade)
 * - 'neon': Minimalista Neón (Glow & Line Art)
 * - 'sketch': Dibujo a Mano (Hand-Drawn Sketch & Acuarela)
 */
export function renderWeatherIconHtml(weatherInfo, size = 32, theme = 'classic') {
  if (!weatherInfo) return '';
  
  if (theme === 'classic' || !weatherInfo.svgKey) {
    return `<span class="emoji-weather-icon" style="font-size: ${Math.round(size * 0.85)}px; line-height: 1; display: inline-flex; align-items: center; justify-content: center;">${weatherInfo.icon}</span>`;
  }

  if (theme === 'pixel') {
    return getPixelWeatherSvg(weatherInfo.svgKey, size);
  }

  if (theme === 'neon') {
    return getNeonWeatherSvg(weatherInfo.svgKey, size);
  }

  if (theme === 'sketch' || theme === 'glass') {
    return getSketchWeatherSvg(weatherInfo.svgKey, size);
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