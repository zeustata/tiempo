/**
 * Mapeo de códigos meteorológicos WMO a descripciones en asturiano/castellano, iconos y clases
 */
export const WMO_CODES = {
  0: { label: 'Despejado / Soleyeru', icon: '☀️', lucide: 'sun', bg: 'clear', isRain: false, isSnow: false },
  1: { label: 'Principalmente despejado', icon: '🌤️', lucide: 'sun-dim', bg: 'mostly-clear', isRain: false, isSnow: false },
  2: { label: 'Parcialmente nublado', icon: '⛅', lucide: 'cloud-sun', bg: 'partly-cloudy', isRain: false, isSnow: false },
  3: { label: 'Nublado / Cubiertu', icon: '☁️', lucide: 'cloud', bg: 'cloudy', isRain: false, isSnow: false },
  45: { label: 'Niebla / Borrina', icon: '🌫️', lucide: 'cloud-fog', bg: 'fog', isRain: false, isSnow: false },
  48: { label: 'Niebla con escarcha', icon: '🌫️', lucide: 'cloud-fog', bg: 'fog', isRain: false, isSnow: false },
  51: { label: 'Orbayu / Calabobos ligero', icon: '🌦️', lucide: 'cloud-drizzle', bg: 'drizzle', isRain: true, isSnow: false },
  53: { label: 'Orbayu moderado', icon: '🌦️', lucide: 'cloud-drizzle', bg: 'drizzle', isRain: true, isSnow: false },
  55: { label: 'Orbayu persistente', icon: '🌧️', lucide: 'cloud-drizzle', bg: 'drizzle', isRain: true, isSnow: false },
  56: { label: 'Llovizna engelante ligera', icon: '🌨️', lucide: 'cloud-snow', bg: 'snow', isRain: true, isSnow: true },
  57: { label: 'Llovizna engelante densa', icon: '🌨️', lucide: 'cloud-snow', bg: 'snow', isRain: true, isSnow: true },
  61: { label: 'Lluvia débil', icon: '🌧️', lucide: 'cloud-rain', bg: 'rain', isRain: true, isSnow: false },
  63: { label: 'Lluvia moderada', icon: '🌧️', lucide: 'cloud-rain', bg: 'rain', isRain: true, isSnow: false },
  65: { label: 'Lluvia fuerte / Bastinazu', icon: '⛈️', lucide: 'cloud-rain-wind', bg: 'heavy-rain', isRain: true, isSnow: false },
  66: { label: 'Lluvia engelante ligera', icon: '🌨️', lucide: 'cloud-snow', bg: 'snow', isRain: true, isSnow: true },
  67: { label: 'Lluvia engelante fuerte', icon: '🌨️', lucide: 'cloud-snow', bg: 'snow', isRain: true, isSnow: true },
  71: { label: 'Nevada ligera', icon: '❄️', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  73: { label: 'Nevada moderada', icon: '❄️', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  75: { label: 'Nevada fuerte / Temporal', icon: '❄️', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  77: { label: 'Granizo menudo', icon: '🌨️', lucide: 'cloud-hail', bg: 'hail', isRain: false, isSnow: true },
  80: { label: 'Chubascos débiles', icon: '🌦️', lucide: 'cloud-sun-rain', bg: 'rain', isRain: true, isSnow: false },
  81: { label: 'Chubascos moderados', icon: '🌧️', lucide: 'cloud-rain', bg: 'rain', isRain: true, isSnow: false },
  82: { label: 'Chubascos violentos', icon: '⛈️', lucide: 'cloud-rain-wind', bg: 'heavy-rain', isRain: true, isSnow: false },
  85: { label: 'Chubascos de nieve débiles', icon: '🌨️', lucide: 'cloud-snow', bg: 'snow', isRain: false, isSnow: true },
  86: { label: 'Chubascos de nieve fuertes', icon: '❄️', lucide: 'snowflake', bg: 'snow', isRain: false, isSnow: true },
  95: { label: 'Tormenta eléctrica', icon: '⚡', lucide: 'cloud-lightning', bg: 'storm', isRain: true, isSnow: false },
  96: { label: 'Tormenta con granizo débil', icon: '⛈️', lucide: 'cloud-lightning', bg: 'storm', isRain: true, isSnow: true },
  99: { label: 'Tormenta con granizo fuerte', icon: '🌩️', lucide: 'zap', bg: 'storm', isRain: true, isSnow: true }
};

export function getWeatherInfo(code, isDay = 1, precipitation = null, pop = null) {
  let base = WMO_CODES[code] || { label: 'Variable', icon: '⛅', lucide: 'cloud', bg: 'cloudy', isRain: false, isSnow: false };

  // 1. Si es de noche (isDay === 0 o false), adaptar los iconos solares base a nocturnos
  if (isDay === 0 || isDay === false) {
    if (code === 0) {
      base = { ...base, label: 'Despejado / Cielo Nocturno', icon: '🌙', bg: 'clear-night' };
    } else if (code === 1) {
      base = { ...base, label: 'Poco nuboso de noche', icon: '🌙', bg: 'mostly-clear-night' };
    } else if (code === 2) {
      base = { ...base, label: 'Parcialmente nublado', icon: '☁️🌙', bg: 'partly-cloudy-night' };
    } else if (code === 51 || code === 53 || code === 80) {
      base = { ...base, label: 'Orbayu nocturno ligero', icon: '🌧️', bg: 'drizzle' };
    }
  }

  // 2. Graduación y coherencia inteligente de lluvia por tramos de intensidad (prevalece sobre cualquier código teórico)
  if (precipitation !== null || pop !== null) {
    const p = precipitation != null ? parseFloat(precipitation) : 0;
    const prob = pop != null ? parseFloat(pop) : 0;

    // Caso 0: Seco / Sin lluvia medible (prob < 20% y p < 0.3 mm) -> Nube seca sin gotas
    if (prob < 20 && p < 0.3) {
      if (base.isRain && !base.isSnow) {
        base = {
          label: (isDay === 0 || isDay === false) ? 'Nublado de noche' : 'Nublado / Cubiertu',
          icon: (isDay === 0 || isDay === false) ? '☁️' : '☁️',
          lucide: 'cloud',
          bg: (isDay === 0 || isDay === false) ? 'partly-cloudy-night' : 'cloudy',
          isRain: false,
          isSnow: false
        };
      }
    }
    // Caso 1: Llovizna / Orbayu débil (prob 20-44% o p 0.3-0.5 mm)
    else if ((prob >= 20 && prob < 45) || (p >= 0.3 && p < 0.5)) {
      base = {
        label: (isDay === 0 || isDay === false) ? 'Orbayu nocturno ligero' : 'Orbayu / Llovizna ligera',
        icon: (isDay === 0 || isDay === false) ? '🌧️' : '🌦️',
        lucide: 'cloud-drizzle',
        bg: 'drizzle',
        isRain: true,
        isSnow: false
      };
    }
    // Caso 2: Lluvia moderada (prob 45-74% o p 0.5-2.0 mm)
    else if ((prob >= 45 && prob < 75) || (p >= 0.5 && p < 2.0)) {
      base = {
        label: 'Lluvia moderada',
        icon: '🌧️',
        lucide: 'cloud-rain',
        bg: 'rain',
        isRain: true,
        isSnow: false
      };
    }
    // Caso 3: Lluvia fuerte / Bastinazu (prob >= 75% o p >= 2.0 mm o tormenta)
    else if (prob >= 75 || p >= 2.0 || code === 65 || code === 82 || code === 95 || code === 96 || code === 99) {
      const isStorm = code === 95 || code === 96 || code === 99;
      base = {
        label: isStorm ? 'Tormenta eléctrica' : 'Lluvia fuerte / Bastinazu',
        icon: '⛈️',
        lucide: 'cloud-rain-wind',
        bg: isStorm ? 'storm' : 'heavy-rain',
        isRain: true,
        isSnow: false
      };
    }
  }

  return base;
}

export function getWindDirection(degrees) {
  const directions = [
    { name: 'Norte', short: 'N', isSouth: false },
    { name: 'Noreste', short: 'NE', isSouth: false },
    { name: 'Este', short: 'E', isSouth: false },
    { name: 'Sureste', short: 'SE', isSouth: true },
    { name: 'Sur (Vientu del Sur)', short: 'S', isSouth: true },
    { name: 'Suroeste', short: 'SW', isSouth: true },
    { name: 'Oeste', short: 'W', isSouth: false },
    { name: 'Noroeste', short: 'NW', isSouth: false }
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