import { getWindDirection } from '../utils/weatherIcons.js?v=1.1.53';
import { getRealtimeTideStatus } from '../utils/tides.js?v=1.0.81-tides-calib';
import { 
  PLAYAS_POR_CONCEJO, 
  getNearestCoastalReference, 
  getSurfWindCondition,
  getBeachSpecificWindCondition,
  getSeaWaterTemperature,
  getDouglasScale
} from './marineCard.js?v=2.2.6';

/**
 * Recomienda el grosor de neopreno según la temperatura del agua
 */
function getWetsuitRecommendation(tempC) {
  const t = typeof tempC === 'number' ? tempC : 14;
  if (t < 13) return { suit: '5/4 mm con capucha y escarpines', icon: '❄️', tag: 'Muy Fría' };
  if (t < 15) return { suit: '4/3 mm con escarpines', icon: '🌊', tag: 'Fría' };
  if (t < 18) return { suit: '4/3 mm estándar o 3/2 mm sellado', icon: '🏄‍♂️', tag: 'Fresca' };
  if (t < 21) return { suit: '3/2 mm integral / primavera', icon: '☀️', tag: 'Agradable' };
  return { suit: '2 mm shorty o bañador / licra', icon: '🌴', tag: 'Cálida' };
}

/**
 * Calcula la Energía de la Ola en kiloJulios (kJ) según la física oceanográfica (E ~ k * H_swell^2 * T)
 * Calibrada con estándares reales de Surf-Forecast y oceanografía cantábrica (factor k=11)
 * Soporta Multi-Swell (Energía Combinada = Swell 1 + Swell 2)
 */
export function calculateWaveEnergy(heightM, periodS, secondaryHeightM = 0, secondaryPeriodS = 0) {
  const h1 = Math.max(0, parseFloat(heightM) || 0);
  const t1 = Math.max(1, parseFloat(periodS) || 1);
  const e1 = 11 * (h1 * h1) * t1;

  const h2 = Math.max(0, parseFloat(secondaryHeightM) || 0);
  const t2 = Math.max(1, parseFloat(secondaryPeriodS) || 1);
  const e2 = h2 > 0 ? (11 * (h2 * h2) * t2) : 0;

  const rawKj = Math.round(e1 + e2);
  const primaryKj = Math.round(e1);
  const secondaryKj = Math.round(e2);
  const hasSecondary = h2 >= 0.2 && secondaryKj > 0;

  let label = 'Suave (Iniciación / Poca Fuerza)';
  let shortLabel = 'Suave';
  let badgeClass = 'energy-soft';
  let color = '#10b981';
  let icon = '🟢';
  let desc = 'Olas dóciles con poco empuje. Excelente para escuelas, principiantes y longboard.';

  if (rawKj >= 1100) {
    label = 'Pesada (Extrema / Solo Expertos)';
    shortLabel = 'Pesada';
    badgeClass = 'energy-extreme';
    color = '#ef4444';
    icon = '🔴';
    desc = 'Gran potencia y masa de agua con fuertes corrientes y resacas. Rompientes mayores.';
  } else if (rawKj >= 650) {
    label = 'Muy Potente (Tubos / Nivel Alto)';
    shortLabel = 'Muy Potente';
    badgeClass = 'energy-high';
    color = '#a855f7';
    icon = '🟣';
    desc = 'Mucha masa de agua y velocidad. Fondos que rompen con decisión y tubos huecos.';
  } else if (rawKj >= 350) {
    label = 'Sólida (Exigente / Buen Tamaño)';
    shortLabel = 'Sólida';
    badgeClass = 'energy-solid';
    color = '#f97316';
    icon = '🟠';
    desc = 'Olas consistentes y de gran empuje. Exige remada, experiencia y buena colocación.';
  } else if (rawKj >= 180) {
    label = 'Divertida (Shortboard & Evolutiva)';
    shortLabel = 'Divertida';
    badgeClass = 'energy-optimal';
    color = '#fbbf24';
    icon = '🟡';
    desc = 'Zona dulce de arenales para olas nobles (1.0m a 1.5m). Buen empuje para maniobras.';
  }

  return {
    kj: rawKj,
    primaryKj,
    secondaryKj,
    hasSecondary,
    label,
    shortLabel,
    badgeClass,
    color,
    icon,
    desc
  };
}

/**
 * Evalúa la calidad global del swell para surfing armonizada con la energía (kJ), período y viento
 */
function evaluateSurfQuality(waveHeight, wavePeriod, windCondition, waveEnergy = null) {
  const h = parseFloat(waveHeight) || 1.2;
  const p = parseInt(wavePeriod, 10) || 10;
  const isOffshore = windCondition && windCondition.type === 'offshore';
  const isGlassy = windCondition && windCondition.type === 'glassy';
  const isOffshoreOrGlassy = isOffshore || isGlassy;
  const isOnshore = windCondition && (windCondition.type === 'onshore' || windCondition.type === 'cross-onshore');
  const energyKj = waveEnergy?.kj || Math.round(11 * (h * h) * p);

  // 1. Mar casi plato o sin fuerza
  if (h < 0.6 || energyKj < 45) {
    return {
      status: '🏖️ Mar Casi Plato / Olas Muy Pequeñas',
      badge: 'Olas Pequeñas',
      color: '#94a3b8',
      bg: '#94a3b822',
      border: '#94a3b8',
      desc: 'Ideal para tablas con mucho volumen (Longboard, SUP, Softboard) o iniciación en la orilla.'
    };
  }

  // 2. Mar realmente duro / Temporal / Oleaje masivo (> 3m o > 1100 kJ)
  if (h >= 3.0 || energyKj >= 1100) {
    return {
      status: '⚠️ Mar Fuerte / Oleaje Duro y Masivo',
      badge: 'Mar Duro / Pro',
      color: '#ef4444',
      bg: '#ef444422',
      border: '#ef4444',
      desc: 'Olas de gran tamaño, fuerte resaca y corrientes intensas. Solo apto para surfistas muy experimentados en calas resguardadas.'
    };
  }

  // 3. Saturación / Mar Pasado en Arenales Abiertos (>= 1.7m, o >= 1.5m con energía >= 350 kJ o período >= 13s)
  // Caso de Edu en Salinas: arenales abiertos con 1.5m y período largo rompen en bloque con cerrones inaguantables
  if (h >= 1.7 || (energyKj >= 350 && h >= 1.5) || (p >= 13 && h >= 1.5)) {
    return {
      status: '⚠️ Mar Pasado en Arenales / Barras Cerronas',
      badge: 'Mar Pasado / Fuerte',
      color: '#f97316',
      bg: '#f9731622',
      border: '#f97316',
      desc: 'Oleaje saturado para arenales abiertos (como Salinas o San Lorenzo). Las series cierran en bloque con fuertes corrientes de resaca. Recomendado buscar calas o esquinas al abrigo (ej. El Espartal, Luanco) o surfistas expertos.'
    };
  }

  // 4. Viento Onshore / Chop desordenado (Sinceridad de Surf-Forecast: 1-2 estrellas)
  if (isOnshore) {
    return {
      status: '🌊 Olas con Viento de Mar (Chop / Desordenado)',
      badge: 'Chop / Desordenado',
      color: '#f59e0b',
      bg: '#f59e0b22',
      border: '#f59e0b',
      desc: 'El viento de mar pica y rompe las secciones de la ola, generando espuma revuelta y dificultando la pared limpia.'
    };
  }

  // 5. Sesión Épica / Calidad Top (¡Exclusiva para condiciones excepcionales!)
  // Tamaño dulce (1.0m a 1.5m), período largo (>= 12s), viento ESTRICTAMENTE TERRAL (offshore) peinando la ola y energía noble (160 - 349 kJ)
  if (h >= 1.0 && h <= 1.5 && p >= 12 && isOffshore && energyKj >= 160 && energyKj < 350) {
    return {
      status: '🔥 Sesión Épica / Calidad Top',
      badge: 'Épica / Top',
      color: '#10b981',
      bg: '#10b98122',
      border: '#10b981',
      desc: 'Condiciones excepcionales de revista: mar de fondo largo y limpio, energía perfecta sin saturar la barra y viento terral que ahueca tubos y paredes.'
    };
  }

  // 6. Buenas Condiciones / Olas Limpias (Offshore o Glassy con buen período)
  if (h >= 0.8 && h <= 1.6 && p >= 10 && isOffshoreOrGlassy && energyKj < 350) {
    return {
      status: '🌊 Buenas Condiciones / Olas Limpias',
      badge: 'Buenas Olas',
      color: '#06b6d4',
      bg: '#06b6d422',
      border: '#06b6d4',
      desc: 'Mar ordenado con buen período y viento favorable. Olas con recorrido y paredes aprovechables en rompientes expuestas.'
    };
  }

  // 7. Baño Entretenido / Condiciones Medias (Período medio o glassy suave)
  if (h >= 0.7 && p >= 8) {
    return {
      status: '🌊 Baño Entretenido / Olas Medias',
      badge: 'Entretenido',
      color: '#38bdf8',
      bg: '#38bdf822',
      border: '#38bdf8',
      desc: 'Olas de empuje moderado y altura accesible. Muy divertido para tablas evolutivas, longboard o shortboard en picos nobles.'
    };
  }

  // 8. Olas Suaves / Swell Corto
  return {
    status: '🌊 Olas Suaves / Swell Corto',
    badge: 'Suave / Iniciación',
    color: '#94a3b8',
    bg: '#94a3b822',
    border: '#94a3b8',
    desc: 'Olas con ritmo rápido y empuje suave. Muy buenas para tablas evolutivas, longboard e iniciación.'
  };
}

/**
 * Calcula la calificación de surf por estrellas (0 a 10) inspirada en los estándares de Surf-Forecast
 * - 🌟 Estrellas Doradas: Viento terral puro (offshore) con swell ordenado y energía noble
 * - ⚪ Estrellas Blancas: Viento terral / glassy con mar pequeño, período moderado o brisa cruzada
 * - 🚫 Cero Estrellas: Viento onshore (mar picado/chop), arenal saturado por mar pasado o calma chicha
 */
export function getSurfStarRating(waveHeight, wavePeriod, windCondition, waveEnergy = null, isBeachBreakOverload = false) {
  const h = parseFloat(waveHeight) || 1.2;
  const p = parseInt(wavePeriod, 10) || 10;
  const energyKj = waveEnergy?.kj || Math.round(11 * (h * h) * p);
  const isOffshore = windCondition && windCondition.type === 'offshore';
  const isGlassy = windCondition && windCondition.type === 'glassy';
  const isSemiOffshore = windCondition && windCondition.type === 'cross-offshore';
  const isOnshore = windCondition && (windCondition.type === 'onshore' || windCondition.type === 'cross-onshore');

  // 1. Caso de sobrecarga o temporal (mar pasado en arenales o peligro extremo)
  if (isBeachBreakOverload || h >= 2.6 || energyKj >= 900) {
    return {
      stars: 0,
      maxStars: 10,
      type: 'none',
      badgeClass: 'rating-zero',
      starIcons: '0 Estrellas (Cerrones)',
      shortIcons: '0★ Cerrón',
      summary: '0/10 • Mar Pasado en Arenales',
      desc: 'Barras cerronas masivas y corrientes de resaca intensas. No apto para arenales abiertos.',
      color: '#ef4444'
    };
  }

  // 2. Mar plato o sin tamaño
  if (h < 0.6 || energyKj < 45) {
    return {
      stars: 0,
      maxStars: 10,
      type: 'none',
      badgeClass: 'rating-zero',
      starIcons: '0 Estrellas (Plato)',
      shortIcons: '0★ Plato',
      summary: '0/10 • Sin Fuerza',
      desc: 'Olas insuficientes o sin empuje para surf convencional.',
      color: '#94a3b8'
    };
  }

  // 3. Viento de mar directo (Onshore / Chop revuelto)
  if (isOnshore) {
    return {
      stars: 0,
      maxStars: 10,
      type: 'none',
      badgeClass: 'rating-zero',
      starIcons: '0 Estrellas (Chop)',
      shortIcons: '0★ Chop',
      summary: '0/10 • Viento de Mar',
      desc: 'El viento de mar desordena las secciones de la ola e impide paredes limpias.',
      color: '#f59e0b'
    };
  }

  // 4. Condiciones Faborables (Offshore, Glassy o Semi-Offshore)
  let score = 0;
  let isGold = isOffshore;

  // Aportación por Altura de Ola (zona dulce cantábrica: 1.0m a 1.6m)
  if (h >= 1.0 && h <= 1.6) {
    score += 4;
  } else if (h >= 0.8 && h < 1.0) {
    score += 2;
  } else if (h > 1.6 && h < 2.0) {
    score += 3;
  } else {
    score += 1;
  }

  // Aportación por Período
  if (p >= 14) {
    score += 4;
  } else if (p >= 12) {
    score += 3;
  } else if (p >= 10) {
    score += 2;
  } else {
    score += 1;
  }

  // Aportación por Energía dulce (160 - 350 kJ)
  if (energyKj >= 160 && energyKj <= 350) {
    score += 2;
  } else if (energyKj >= 351 && energyKj <= 500) {
    score += 1;
  }

  // Calificación del tipo de estrella
  if (isOffshore) {
    isGold = true;
  } else if (isGlassy) {
    // Glassy con período largo y buena ola da estrella dorada, si no blanca
    isGold = p >= 11 && h >= 1.0;
  } else {
    isGold = false;
    score = Math.max(1, score - 2);
  }

  const finalStars = Math.min(10, Math.max(1, score));
  const starType = isGold ? 'gold' : 'white';
  const starSymbol = isGold ? '⭐' : '⚪';
  const starColor = isGold ? '#fbbf24' : '#e2e8f0';
  const starLabel = isGold ? 'Estrellas Doradas' : 'Estrellas Blancas';

  // Mostrar hasta 5 estrellas visuales para evitar desbordes en móviles, con badge numérico
  const visualCount = Math.min(5, finalStars);
  const visualIcons = starSymbol.repeat(visualCount);

  return {
    stars: finalStars,
    maxStars: 10,
    type: starType,
    badgeClass: isGold ? 'rating-gold' : 'rating-white',
    starIcons: `${visualIcons} ${finalStars}/10`,
    shortIcons: `${starSymbol}${finalStars}`,
    summary: `${finalStars}/10 ${starLabel}`,
    desc: isGold
      ? 'Condiciones limpias con viento terral peinando la pared y swell bien formado.'
      : 'Condiciones nobles: mar ordenado o glassy ideal para tablas con volumen y baño entretenido.',
    color: starColor
  };
}

/**
 * Determina la textura de la lámina de agua (Superficie / Wind State)
 */
export function getWaterTexture(windSpeedKmH, windCondition) {
  const spd = Math.round(windSpeedKmH || 0);
  const type = windCondition?.type || 'variable';

  if (spd <= 6) {
    return {
      type: 'glassy',
      icon: '🪞',
      label: 'Glassy (Calma)',
      badge: 'Superficie Glassy',
      desc: 'Calma total.',
      color: '#38bdf8'
    };
  }

  if (type === 'offshore') {
    return {
      type: 'clean',
      icon: '💨',
      label: 'Limpio (Terral / Offshore)',
      badge: 'Superficie Limpia',
      desc: 'El viento de tierra alisa la pared y frena el labio, abriendo el tubo.',
      color: '#10b981'
    };
  }

  if (type === 'cross-offshore') {
    return {
      type: 'semi-clean',
      icon: '✨',
      label: 'Semi-Limpio (Cruzado Terral)',
      badge: 'Brisa Favorable',
      desc: 'Brisa diagonal con componente terral, paredes aprovechables.',
      color: '#34d399'
    };
  }

  if (type === 'cross-onshore') {
    return {
      type: 'cross-chop',
      icon: '〰️',
      label: 'Picado (Cruzado Onshore)',
      badge: 'Superficie Rizada',
      desc: 'Brisa diagonal de mar que pica la cara de la ola.',
      color: '#fbbf24'
    };
  }

  if (type === 'onshore') {
    return {
      type: 'chop',
      icon: '🌊',
      label: 'Chop / Desordenado (Onshore)',
      badge: 'Superficie Picada',
      desc: 'Viento de mar directo picando y rompiendo las secciones de la ola.',
      color: '#f97316'
    };
  }

  return {
    type: 'variable',
    icon: '〰️',
    label: 'Brisa Ligera',
    badge: 'Superficie Variable',
    desc: 'Viento suave variable en la orilla.',
    color: '#94a3b8'
  };
}

/**
 * Genera el SVG interactivo de la flecha de viento (apunta hacia donde viaja el aire en estándar náutico)
 */
export function getSurfWindArrowSvg(deg, color = '#38bdf8', size = 12) {
  const rotation = Math.round((deg + 180) % 360);
  return `<svg class="surf-wind-arrow" style="transform: rotate(${rotation}deg);" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" title="Viento soplando hacia el ${(deg + 180) % 360}°">
    <path d="M12 2L5 13h4.5v9h5v-9H19L12 2z" fill="${color}"/>
  </svg>`;
}

/**
 * Genera el SVG interactivo de la flecha de swell / oleaje (apunta hacia donde viajan las olas hacia la costa)
 */
export function getSurfSwellArrowSvg(deg, color = '#38bdf8', size = 12) {
  const rotation = Math.round((deg + 180) % 360);
  return `<svg class="surf-swell-arrow" style="transform: rotate(${rotation}deg);" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" title="Swell avanzando hacia el ${(deg + 180) % 360}°">
    <path d="M12 2L4 13h4.5v9h7v-9H20L12 2z" fill="${color}"/>
  </svg>`;
}

/**
 * Genera los tramos de previsión cada 3 horas para Hoy y Mañana (estilo Surf-Forecast / Windguru)
 */
function getSurfTimelineSlots(data, concejo) {
  const marineHourly = data.marine?.hourly;
  const weatherHourly = data.weather?.hourly;
  if (!weatherHourly || !weatherHourly.time) return [];

  const now = new Date();
  const slots = [];
  const targetHours = [8, 11, 14, 17, 20];

  [0, 1, 2].forEach(dayOffset => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset);
    const dayLabel = dayOffset === 0 ? 'Hoy' : (dayOffset === 1 ? 'Mañana' : 'Pasado');
    const dayName = d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });

    targetHours.forEach(hour => {
      const targetDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, 0, 0);
      const hourPrefix = `${targetDate.getFullYear()}-${String(targetDate.getMonth()+1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}T${String(hour).padStart(2, '0')}`;
      
      let idx = weatherHourly.time.findIndex(t => t.startsWith(hourPrefix));
      if (idx === -1) {
        idx = dayOffset * 24 + hour;
      }
      if (idx < 0 || idx >= weatherHourly.time.length) return;

      const timeStr = `${String(hour).padStart(2, '0')}:00`;
      const isPast = dayOffset === 0 && now.getHours() > (hour + 1);
      if (isPast) return;

      // Métricas de oleaje
      const rawH = marineHourly?.wave_height ? marineHourly.wave_height[idx] : null;
      const h = (typeof rawH === 'number') ? rawH.toFixed(1) : '1.3';
      
      const rawSwellH = marineHourly?.swell_wave_height ? marineHourly.swell_wave_height[idx] : null;
      const swellH = (typeof rawSwellH === 'number') ? rawSwellH.toFixed(1) : h;

      const rawPeriod = marineHourly?.swell_wave_period ? marineHourly.swell_wave_period[idx] : (marineHourly?.wave_period ? marineHourly.wave_period[idx] : null);
      const period = (typeof rawPeriod === 'number') ? Math.round(rawPeriod) : 11;

      const rawSwellDeg = marineHourly?.swell_wave_direction ? marineHourly.swell_wave_direction[idx] : (marineHourly?.wave_direction ? marineHourly.wave_direction[idx] : 315);
      const swellDeg = (typeof rawSwellDeg === 'number') ? Math.round(rawSwellDeg) : 315;
      const swellDirObj = getWindDirection(swellDeg);

      const rawSecH = marineHourly?.secondary_swell_wave_height ? marineHourly.secondary_swell_wave_height[idx] : null;
      const secH = (typeof rawSecH === 'number') ? rawSecH.toFixed(1) : '0';

      const rawSecPeriod = marineHourly?.secondary_swell_wave_period ? marineHourly.secondary_swell_wave_period[idx] : null;
      const secPeriod = (typeof rawSecPeriod === 'number') ? Math.round(rawSecPeriod) : 0;

      const energy = calculateWaveEnergy(swellH, period, secH, secPeriod);

      // Viento y calidad
      const windSpd = Math.round(weatherHourly.wind_speed_10m[idx] || 0);
      const windDeg = weatherHourly.wind_direction_10m[idx] || 180;
      const windDirObj = getWindDirection(windDeg);
      const surfWind = getSurfWindCondition(windDeg, windSpd);

      // Estado de marea
      const tideStatus = getRealtimeTideStatus(targetDate, concejo.lon || -5.6615);

      // Sobrecarga / mar pasado en arenales para este slot horario
      const isSlotOverload = (parseFloat(h) >= 1.7) || 
                             (parseFloat(swellH) >= 1.7) || 
                             (energy.kj >= 350 && (parseFloat(h) >= 1.5 || parseFloat(swellH) >= 1.5)) ||
                             (period >= 13 && (parseFloat(h) >= 1.5 || parseFloat(swellH) >= 1.5));

      const starRating = getSurfStarRating(swellH, period, surfWind, energy, isSlotOverload);
      const waterTexture = getWaterTexture(windSpd, surfWind);

      slots.push({
        dayOffset,
        dayLabel,
        dayName,
        timeStr,
        fullDate: targetDate,
        isPast,
        h,
        swellH,
        period,
        swellDeg,
        swellDirObj,
        energy,
        windSpd,
        windDeg,
        windDirObj,
        surfWind,
        tideStatus,
        starRating,
        waterTexture
      });
    });
  });

  return slots.slice(0, 10);
}

/**
 * Genera el pronóstico extendido a 7 días de surf desglosado en Mañana (08h-14h) y Tarde (14h-20h)
 */
function getSurfDailyForecast(data, concejo) {
  const marineHourly = data.marine?.hourly;
  const weatherHourly = data.weather?.hourly;
  if (!marineHourly || !marineHourly.time || !weatherHourly || !weatherHourly.time) {
    return [];
  }

  const now = new Date();
  const dailyForecast = [];

  for (let d = 0; d < 7; d++) {
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + d);
    const dayDateStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;
    const isToday = d === 0;
    const isTomorrow = d === 1;
    const dayTitle = isToday ? 'Hoy' : isTomorrow ? 'Mañana' : targetDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const dayCapitalized = dayTitle.charAt(0).toUpperCase() + dayTitle.slice(1);
    const dayFormatted = targetDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

    // 1. TRAMO MAÑANA (Índice representativo: 11:00)
    const morningHour = 11;
    const morningPrefix = `${dayDateStr}T${String(morningHour).padStart(2, '0')}`;
    let morningIdx = marineHourly.time.findIndex(t => t.startsWith(morningPrefix));
    if (morningIdx === -1) morningIdx = Math.min(d * 24 + morningHour, marineHourly.time.length - 1);

    const mH = (typeof marineHourly.wave_height[morningIdx] === 'number') ? marineHourly.wave_height[morningIdx].toFixed(1) : '1.2';
    const mSwellH = (typeof marineHourly.swell_wave_height?.[morningIdx] === 'number') ? marineHourly.swell_wave_height[morningIdx].toFixed(1) : mH;
    const mPeriod = (typeof marineHourly.swell_wave_period?.[morningIdx] === 'number') ? Math.round(marineHourly.swell_wave_period[morningIdx]) : ((typeof marineHourly.wave_period?.[morningIdx] === 'number') ? Math.round(marineHourly.wave_period[morningIdx]) : 10);
    const mWaveDeg = (typeof marineHourly.swell_wave_direction?.[morningIdx] === 'number') ? Math.round(marineHourly.swell_wave_direction[morningIdx]) : ((typeof marineHourly.wave_direction?.[morningIdx] === 'number') ? Math.round(marineHourly.wave_direction[morningIdx]) : 315);
    const mWaveDir = getWindDirection(mWaveDeg);
    
    const mSecH = (typeof marineHourly.secondary_swell_wave_height?.[morningIdx] === 'number') ? marineHourly.secondary_swell_wave_height[morningIdx].toFixed(1) : '0';
    const mSecPeriod = (typeof marineHourly.secondary_swell_wave_period?.[morningIdx] === 'number') ? Math.round(marineHourly.secondary_swell_wave_period[morningIdx]) : 0;
    const mEnergy = calculateWaveEnergy(mSwellH, mPeriod, mSecH, mSecPeriod);

    const mWindSpd = Math.round(weatherHourly.wind_speed_10m?.[morningIdx] || 0);
    const mWindDeg = weatherHourly.wind_direction_10m?.[morningIdx] || 180;
    const mWindDirObj = getWindDirection(mWindDeg);
    const mSurfWind = getSurfWindCondition(mWindDeg, mWindSpd);
    const mQuality = evaluateSurfQuality(mH, mPeriod, mSurfWind, mEnergy);
    const mOverload = (parseFloat(mH) >= 1.7) || (parseFloat(mSwellH) >= 1.7) || (mEnergy.kj >= 350 && (parseFloat(mH) >= 1.5 || parseFloat(mSwellH) >= 1.5)) || (mPeriod >= 13 && (parseFloat(mH) >= 1.5 || parseFloat(mSwellH) >= 1.5));
    const mStarRating = getSurfStarRating(mSwellH, mPeriod, mSurfWind, mEnergy, mOverload);
    const mWaterTexture = getWaterTexture(mWindSpd, mSurfWind);

    // 2. TRAMO TARDE (Índice representativo: 17:00)
    const afternoonHour = 17;
    const afternoonPrefix = `${dayDateStr}T${String(afternoonHour).padStart(2, '0')}`;
    let afternoonIdx = marineHourly.time.findIndex(t => t.startsWith(afternoonPrefix));
    if (afternoonIdx === -1) afternoonIdx = Math.min(d * 24 + afternoonHour, marineHourly.time.length - 1);

    const aH = (typeof marineHourly.wave_height[afternoonIdx] === 'number') ? marineHourly.wave_height[afternoonIdx].toFixed(1) : '1.2';
    const aSwellH = (typeof marineHourly.swell_wave_height?.[afternoonIdx] === 'number') ? marineHourly.swell_wave_height[afternoonIdx].toFixed(1) : aH;
    const aPeriod = (typeof marineHourly.swell_wave_period?.[afternoonIdx] === 'number') ? Math.round(marineHourly.swell_wave_period[afternoonIdx]) : ((typeof marineHourly.wave_period?.[afternoonIdx] === 'number') ? Math.round(marineHourly.wave_period[afternoonIdx]) : 10);
    const aWaveDeg = (typeof marineHourly.swell_wave_direction?.[afternoonIdx] === 'number') ? Math.round(marineHourly.swell_wave_direction[afternoonIdx]) : ((typeof marineHourly.wave_direction?.[afternoonIdx] === 'number') ? Math.round(marineHourly.wave_direction[afternoonIdx]) : 315);
    const aWaveDir = getWindDirection(aWaveDeg);
    
    const aSecH = (typeof marineHourly.secondary_swell_wave_height?.[afternoonIdx] === 'number') ? marineHourly.secondary_swell_wave_height[afternoonIdx].toFixed(1) : '0';
    const aSecPeriod = (typeof marineHourly.secondary_swell_wave_period?.[afternoonIdx] === 'number') ? Math.round(marineHourly.secondary_swell_wave_period[afternoonIdx]) : 0;
    const aEnergy = calculateWaveEnergy(aSwellH, aPeriod, aSecH, aSecPeriod);

    const aWindSpd = Math.round(weatherHourly.wind_speed_10m?.[afternoonIdx] || 0);
    const aWindDeg = weatherHourly.wind_direction_10m?.[afternoonIdx] || 180;
    const aWindDirObj = getWindDirection(aWindDeg);
    const aSurfWind = getSurfWindCondition(aWindDeg, aWindSpd);
    const aQuality = evaluateSurfQuality(aH, aPeriod, aSurfWind, aEnergy);
    const aOverload = (parseFloat(aH) >= 1.7) || (parseFloat(aSwellH) >= 1.7) || (aEnergy.kj >= 350 && (parseFloat(aH) >= 1.5 || parseFloat(aSwellH) >= 1.5)) || (aPeriod >= 13 && (parseFloat(aH) >= 1.5 || parseFloat(aSwellH) >= 1.5));
    const aStarRating = getSurfStarRating(aSwellH, aPeriod, aSurfWind, aEnergy, aOverload);
    const aWaterTexture = getWaterTexture(aWindSpd, aSurfWind);

    dailyForecast.push({
      dayIndex: d,
      dayTitle: dayCapitalized,
      dayFormatted,
      morning: {
        h: mH,
        swellH: mSwellH,
        period: mPeriod,
        waveDeg: mWaveDeg,
        waveDir: mWaveDir,
        energy: mEnergy,
        windSpd: mWindSpd,
        windDeg: mWindDeg,
        windDirObj: mWindDirObj,
        surfWind: mSurfWind,
        quality: mQuality,
        starRating: mStarRating,
        waterTexture: mWaterTexture
      },
      afternoon: {
        h: aH,
        swellH: aSwellH,
        period: aPeriod,
        waveDeg: aWaveDeg,
        waveDir: aWaveDir,
        energy: aEnergy,
        windSpd: aWindSpd,
        windDeg: aWindDeg,
        windDirObj: aWindDirObj,
        surfWind: aSurfWind,
        quality: aQuality,
        starRating: aStarRating,
        waterTexture: aWaterTexture
      }
    });
  }

  return dailyForecast;
}

/**
 * Renderiza el módulo especializado de Surf, Rompientes & Olas
 */
export function renderSurfCard(data, concejo, selectedBeachName = null) {
  const marine = data.marine?.current;
  const current = data.weather.current;

  const isCoasting = PLAYAS_POR_CONCEJO[concejo.id] !== undefined;
  const coastalData = isCoasting ? PLAYAS_POR_CONCEJO[concejo.id] : null;
  const interiorRef = !isCoasting ? getNearestCoastalReference(concejo) : null;
  const activePlayas = isCoasting 
    ? (coastalData ? coastalData.playas : [])
    : (PLAYAS_POR_CONCEJO[interiorRef.refId] ? PLAYAS_POR_CONCEJO[interiorRef.refId].playas : []);

  const selectedBeach = (selectedBeachName && activePlayas.find(p => p.name === selectedBeachName)) || activePlayas[0] || null;

  const cleanConcejoName = (concejo.name || '').split(' (')[0].trim();
  const cleanInteriorName = interiorRef ? (interiorRef.name || '').split(' (')[0].trim() : '';
  const surfLocationTitle = isCoasting ? cleanConcejoName : `${cleanConcejoName} (en ${cleanInteriorName})`;

  // Métricas del oleaje y swell primario y secundario
  const waveHeight = (marine && typeof marine.wave_height === 'number') ? marine.wave_height.toFixed(1) : (isCoasting ? '1.4' : '1.3');
  const swellHeight = (marine && typeof marine.swell_wave_height === 'number') ? marine.swell_wave_height.toFixed(1) : ((marine && typeof marine.wave_height === 'number') ? marine.wave_height.toFixed(1) : '1.2');
  const wavePeriod = (marine && typeof marine.swell_wave_period === 'number') ? Math.round(marine.swell_wave_period) : ((marine && typeof marine.wave_period === 'number') ? Math.round(marine.wave_period) : 11);
  const rawWaveDeg = (marine && typeof marine.swell_wave_direction === 'number') ? marine.swell_wave_direction : ((marine && typeof marine.wave_direction === 'number') ? marine.wave_direction : 315);
  const waveDirDeg = Math.round(rawWaveDeg);
  const waveDir = getWindDirection(waveDirDeg);
  const windWaveH = (marine && typeof marine.wind_wave_height === 'number') ? marine.wind_wave_height.toFixed(1) : '0.6';

  // Swell Secundario
  const secSwellH = (marine && typeof marine.secondary_swell_wave_height === 'number') ? marine.secondary_swell_wave_height.toFixed(1) : '0.0';
  const secSwellPeriod = (marine && typeof marine.secondary_swell_wave_period === 'number') ? Math.round(marine.secondary_swell_wave_period) : 0;
  const secSwellDeg = (marine && typeof marine.secondary_swell_wave_direction === 'number') ? Math.round(marine.secondary_swell_wave_direction) : 315;
  const secSwellDir = (marine && typeof marine.secondary_swell_wave_direction === 'number') ? getWindDirection(secSwellDeg) : null;
  const hasSecondary = parseFloat(secSwellH) >= 0.2;
  
  // Viento actual
  const windSpeed = Math.round(current.wind_speed_10m || 0);
  const rawGusts = current.wind_gusts_10m != null ? Math.round(current.wind_gusts_10m) : windSpeed;
  const hasDistinctGust = rawGusts > windSpeed;
  const windDeg = current.wind_direction_10m !== undefined ? current.wind_direction_10m : 180;
  const windDirObj = getWindDirection(windDeg);
  
  // Análisis dinámico Offshore / Onshore
  const surfWind = getSurfWindCondition(windDeg, windSpeed);

  // Energía de la Ola (kJ) combinada basada en Multi-Swell
  const waveEnergy = calculateWaveEnergy(swellHeight || waveHeight, wavePeriod, secSwellH, secSwellPeriod);

  // Escala Douglas
  const douglas = getDouglasScale(parseFloat(waveHeight));
  const douglasDegree = douglas.degree;
  const douglasName = douglas.name;

  // Calidad global del swell
  const surfQuality = evaluateSurfQuality(waveHeight, wavePeriod, surfWind, waveEnergy);
  const isBeachBreakOverload = (parseFloat(waveHeight) >= 1.7) || 
                               (parseFloat(swellHeight) >= 1.7) || 
                               (waveEnergy.kj >= 350 && (parseFloat(waveHeight) >= 1.5 || parseFloat(swellHeight) >= 1.5)) ||
                               (wavePeriod >= 13 && (parseFloat(waveHeight) >= 1.5 || parseFloat(swellHeight) >= 1.5));

  // Calificación Oficial por Estrellas (0 a 10) y Textura del Agua (Estándar Surf-Forecast)
  const surfStarRating = getSurfStarRating(swellHeight || waveHeight, wavePeriod, surfWind, waveEnergy, isBeachBreakOverload);
  const waterTexture = getWaterTexture(windSpeed, surfWind);

  // Temperatura del mar y traje unificada
  const seaTemp = getSeaWaterTemperature(marine);
  const wetsuit = getWetsuitRecommendation(parseFloat(seaTemp));

  // Tramos de evolución a 3 horas y previsión diaria a 7 días
  const timelineSlots = getSurfTimelineSlots(data, concejo);
  const dailyForecast = getSurfDailyForecast(data, concejo);

  // Título limpio sin paréntesis para evitar redundancia y recarga visual
  const concejoTitle = concejo.name.replace(/\s*\(.*?\)/, '');

  return `
    <div class="surf-module-wrapper">
      <div class="marine-card">
      <div class="section-title-wrap" style="margin-bottom: 8px;">
        <div>
          <h3 class="section-heading" style="margin-bottom: 0;">🏄‍♂️ Surf & Rompientes</h3>
        </div>
        ${!isCoasting ? `
        <div class="altitude-pill" style="font-size: 0.74rem;">
          Ref: <strong>${interiorRef.name.split(' (')[0]}</strong>
        </div>` : ''}
      </div>

      <!-- 1. CARRUSEL TRIPARTITO DE BLOQUES TÉCNICOS DE SURF (CALIFICACIÓN, FUERZA & PREVISIÓN) -->
      <div class="surf-carousel-wrap" id="surf-carousel-wrap">
        <!-- BARRA ERGONÓMICA DE NAVEGACIÓN TRIPARTITA (SUPERIOR EN FILA ÚNICA) -->
        <div class="surf-nav-toolbar" id="surf-nav-toolbar">
          <button class="surf-nav-pill surf-pill-stars active" data-surf-target="0" type="button" aria-label="Ver Calificación y Estrellas">
            <span class="surf-nav-icon">⭐</span>
            <span class="surf-nav-label">Calificación</span>
          </button>
          <button class="surf-nav-pill surf-pill-energy" data-surf-target="1" type="button" aria-label="Ver Fuerza del Oleaje">
            <span class="surf-nav-icon">⚡</span>
            <span class="surf-nav-label">Fuerza</span>
          </button>
          <button class="surf-nav-pill surf-pill-forecast" data-surf-target="2" type="button" aria-label="Ver Previsión a 3 horas y 7 días">
            <span class="surf-nav-icon">⏱️</span>
            <span class="surf-nav-label">Previsión</span>
          </button>
        </div>

        <div class="surf-cards-carousel" id="surf-cards-carousel">
          <!-- SLIDE 0: Calificación & Estrellas -->
          <div class="surf-carousel-slide" data-slide-index="0">
            <div class="marine-widget surf-turismo-visual-widget">
              <!-- Bloque Protagonista Superior (100% Ancho): Calificación y Estrellas -->
              <div style="background: rgba(15, 23, 42, 0.58); border: 1px solid ${surfStarRating.color}44; border-radius: 10px; padding: 10px 12px; margin-bottom: 8px; box-sizing: border-box;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                  <span style="font-size: 0.72rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.04em;">
                    ⭐ Calificación de Surf (${isCoasting ? concejoTitle : cleanInteriorName})
                  </span>
                  <button class="btn-explain-sensor" data-explain="surf_stars" title="¿Cómo funciona el rating de estrellas doradas y blancas? Pulsa para aprender" aria-label="Explicación del rating de estrellas de surf">💡</button>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-top: 4px;">
                  <div style="display: flex; align-items: baseline; gap: 4px;">
                    <span style="font-size: 1.85rem; font-weight: 800; color: ${surfStarRating.color}; line-height: 1.1;">
                      ${surfStarRating.stars}
                    </span>
                    <span style="font-size: 0.85rem; font-weight: 600; color: #94a3b8;">/ 10</span>
                  </div>
                  <span class="surf-flag-badge ${surfStarRating.badgeClass}" style="background: ${surfQuality.color}22; color: ${surfQuality.color}; border: 1px solid ${surfQuality.color}77; font-size: 0.78rem; padding: 4px 10px; border-radius: 999px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
                    ${surfQuality.status}
                  </span>
                </div>

                <!-- Fila de Estrellas con Brillo y Tipo -->
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
                  <span style="font-size: 1.05rem; letter-spacing: 2px; text-shadow: 0 0 10px ${surfStarRating.color}77;">
                    ${surfStarRating.type === 'none' ? '🚫 0★' : (surfStarRating.type === 'gold' ? '⭐'.repeat(Math.min(5, surfStarRating.stars)) : '⚪'.repeat(Math.min(5, surfStarRating.stars)))}
                  </span>
                  <span style="font-size: 0.74rem; font-weight: 700; color: ${surfStarRating.color};">
                    ${surfStarRating.type === 'gold' ? 'Estrellas Doradas (Terral)' : (surfStarRating.type === 'white' ? 'Estrellas Blancas (Glassy)' : 'Sin Estrellas (Mar Pasado / Chop)')}
                  </span>
                </div>
              </div>

              <!-- Bloque 2 y 3 Apilados Verticalmente (100% Ancho): Textura Marina & Anatomía Swell -->
              <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
                <!-- Fila 1: Textura del Agua & Viento -->
                <div style="width: 100%; background: rgba(15, 23, 42, 0.58); border: 1px solid rgba(56, 189, 248, 0.28); border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px; box-sizing: border-box;">
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%;">
                    <span style="font-size: 0.72rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.04em;">🪞 Textura del Agua & Viento</span>
                    <span style="font-size: 0.76rem; font-weight: 700; color: ${waterTexture.color};">${waterTexture.icon} ${waterTexture.badge}</span>
                  </div>
                  <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; width: 100%;">
                    <div style="font-size: 0.88rem; font-weight: 700; color: #38bdf8;">
                      💨 ${hasDistinctGust ? `${windSpeed}–${rawGusts}` : windSpeed} km/h (${(surfWind.name || 'Costero').split(' ')[0]})
                    </div>
                    <div style="font-size: 0.76rem; color: #94a3b8;">
                      ${surfWind.desc || 'Viento en costa'}
                    </div>
                  </div>
                </div>

                <!-- Fila 2: Swell de Fondo y Chop -->
                <div style="width: 100%; background: rgba(15, 23, 42, 0.58); border: 1px solid rgba(56, 189, 248, 0.28); border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px; box-sizing: border-box;">
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%;">
                    <span style="font-size: 0.72rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.04em;">🌊 Oleaje de Fondo (Swell 1)</span>
                    <span style="font-size: 0.76rem; color: #94a3b8;">Chop: <strong>${windWaveH} m</strong></span>
                  </div>
                  <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; width: 100%;">
                    <div style="font-size: 0.88rem; font-weight: 700; color: #f8fafc; display: inline-flex; align-items: center; gap: 5px;">
                      ${getSurfSwellArrowSvg(waveDirDeg, '#38bdf8', 13)} ${swellHeight} m · ${wavePeriod} s (${waveDir.name})
                    </div>
                    ${hasSecondary && secSwellDir ? `
                    <div style="font-size: 0.74rem; color: #7dd3fc;">
                      + Swell 2: <strong>${secSwellH}m (${secSwellDir.short})</strong>
                    </div>` : ''}
                  </div>
                </div>
              </div>

              <!-- Píldora de Diagnóstico Final -->
              <div style="margin-top: 8px; padding: 7px 10px; background: rgba(15, 23, 42, 0.40); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.06); font-size: 0.78rem; line-height: 1.35; color: #cbd5e1;">
                ${surfQuality.desc}
              </div>
            </div>
          </div>

          <!-- SLIDE 1: Fuerza y Dinámica del Oleaje -->
          <div class="surf-carousel-slide" data-slide-index="1">
            <div class="marine-widget surf-energy-widget">
              <div class="t-label-row" style="margin-bottom: 8px;">
                <span class="widget-label">🌊 Fuerza y Dinámica del Oleaje</span>
              </div>

              <!-- Botón/Bloque Protagonista Superior (100% Ancho): Energía Combinada en kiloJulios (kJ) -->
              <div style="background: rgba(15, 23, 42, 0.58); border: 1px solid rgba(56, 189, 248, 0.28); border-radius: 10px; padding: 10px 12px; margin-bottom: 8px; box-sizing: border-box;">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                  <span style="font-size: 0.72rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.04em;">⚡ Potencia de la Ola (kiloJulios)</span>
                  <button class="btn-explain-sensor" data-explain="surf_energy" title="¿Qué es la energía de la ola en kJ y multiswell? Pulsa para aprender" aria-label="Explicación de la energía de la ola">💡</button>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-top: 4px;">
                  <div style="font-size: 1.65rem; font-weight: 800; color: ${waveEnergy.color}; line-height: 1.1;">
                    ${waveEnergy.kj} <span style="font-size: 0.85rem; font-weight: 600; color: #94a3b8;">kJ</span>
                  </div>
                  <span class="surf-energy-pill ${waveEnergy.badgeClass}" style="background: ${waveEnergy.color}24; color: ${waveEnergy.color}; border: 1px solid ${waveEnergy.color}77; font-size: 0.78rem; padding: 4px 10px; border-radius: 999px; font-weight: 700;">
                    ${waveEnergy.icon} ${waveEnergy.label}
                  </span>
                </div>
              </div>

              <!-- Bloque 2 y 3 Apilados Verticalmente (100% Ancho Adaptable en Móvil y Monitor Horizontal): Altura + Período -->
              <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
                <!-- Fila 1: Altura Significativa -->
                <div style="width: 100%; background: rgba(15, 23, 42, 0.58); border: 1px solid rgba(56, 189, 248, 0.28); border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px; box-sizing: border-box;">
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%;">
                    <span style="font-size: 0.72rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.04em;">🌊 Altura del Oleaje (Significativa)</span>
                    <button class="btn-explain-sensor" data-explain="waves" title="Explicación de la altura del oleaje y escala Douglas" aria-label="Explicación del oleaje">💡</button>
                  </div>
                  <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; width: 100%;">
                    <div style="font-size: 1.45rem; font-weight: 800; color: #f8fafc; line-height: 1.1;">
                      ${waveHeight} <span style="font-size: 0.82rem; font-weight: 600; color: #94a3b8;">metros</span>
                    </div>
                    <div style="font-size: 0.78rem; color: #cbd5e1;">
                      Escala Douglas: <strong>Grado ${douglasDegree} (${douglasName})</strong>
                    </div>
                  </div>
                </div>

                <!-- Fila 2: Período y Dirección -->
                <div style="width: 100%; background: rgba(15, 23, 42, 0.58); border: 1px solid rgba(56, 189, 248, 0.28); border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px; box-sizing: border-box;">
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%;">
                    <span style="font-size: 0.72rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.04em;">⏱️ Período & Dirección del Swell</span>
                    <button class="btn-explain-sensor" data-explain="swell" title="Explicación del período en segundos y dirección del swell" aria-label="Explicación del período">💡</button>
                  </div>
                  <div style="display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; width: 100%;">
                    <div style="font-size: 1.45rem; font-weight: 800; color: #38bdf8; line-height: 1.1;">
                      ${wavePeriod} <span style="font-size: 0.82rem; font-weight: 600; color: #94a3b8;">segundos</span>
                    </div>
                    <div style="font-size: 0.78rem; color: #cbd5e1; display: inline-flex; align-items: center; gap: 5px;">
                      ${getSurfSwellArrowSvg(waveDirDeg, '#38bdf8', 13)} <strong>${waveDir.name} (${waveDirDeg}°)</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- SLIDE 2: Previsión de Surf & Rompiente (Horario 3h / Extendido 7 días) -->
          <div class="surf-carousel-slide" data-slide-index="2">
            <div class="marine-widget surf-timeline-widget">
        <div class="surf-timeline-header">
          <div class="surf-timeline-title-wrap">
            <div>
              <div class="surf-timeline-title">Previsión de Surf & Rompiente</div>
              <div class="surf-timeline-subtitle">Evolución en ${concejo.name}</div>
            </div>
          </div>
        </div>

        <!-- INTERRUPTOR DESLIZANTE SEGMENTADO (100% RESPONSIVE EN MÓVIL Y DESKTOP) -->
        <div class="surf-toggle-container">
          <div class="surf-sliding-segmented-switch" id="surf-segmented-switch" data-active="timeline">
            <div class="surf-switch-glider"></div>
            <button class="surf-switch-option active" data-surf-tab="timeline" id="btn-surf-tab-timeline" aria-label="Ver evolución a 3 horas">
              <span class="surf-switch-icon">⏱️</span>
              <span class="surf-switch-label">3 Horas</span>
            </button>
            <button class="surf-switch-option" data-surf-tab="daily" id="btn-surf-tab-daily" aria-label="Ver previsión de 7 días mañana y tarde">
              <span class="surf-switch-icon">📅</span>
              <span class="surf-switch-label">7 Días</span>
            </button>
          </div>
        </div>

        <!-- VISTA 1: CRONOGRAMA 3 HORAS (POR DEFECTO) -->
        <div id="surf-timeline-view" class="surf-tab-content active">
          <div class="surf-timeline-grid" id="surf-timeline-carousel">
            ${timelineSlots.map(slot => `
              <div class="surf-slot-card ${slot.isPast ? 'is-past' : ''}">
                <div class="surf-daily-card-header">
                  <div class="surf-daily-day-badge">⏱️ ${slot.dayLabel} · ${slot.timeStr}</div>
                  <div class="surf-daily-date-sub" title="Marea en este tramo">
                    ${slot.tideStatus.directionIcon} ${slot.tideStatus.directionName.split(' ')[0]} ${slot.tideStatus.currentWaterHeight}m
                  </div>
                </div>

                <div class="surf-dayparts-list">
                  <div class="surf-daypart-row-item">
                    <div class="surf-dp-top-row">
                      <span class="surf-dp-stars-badge" style="background: ${slot.starRating.color}22; color: ${slot.starRating.color}; border: 1px solid ${slot.starRating.color}66; border-radius: 6px; padding: 2px 7px; font-size: 0.74rem; font-weight: 700;">
                        ${slot.starRating.starIcons}
                      </span>
                      <span class="surf-dp-texture-pill" style="background: ${slot.waterTexture.color}22; color: ${slot.waterTexture.color}; border: 1px solid ${slot.waterTexture.color}66; border-radius: 6px; padding: 2px 7px; font-size: 0.72rem; font-weight: 600;">
                        ${slot.waterTexture.icon} ${slot.waterTexture.label.split(' ')[0]}
                      </span>
                      <div class="surf-dp-energy-pill" style="background: ${slot.energy.color}22; color: ${slot.energy.color}; border: 1px solid ${slot.energy.color}66;">
                        ⚡ ${slot.energy.kj} kJ • ${slot.energy.shortLabel}
                      </div>
                    </div>
                    
                    <div class="surf-dp-grid-row">
                      <div class="surf-dp-wave-col">
                        <span class="surf-dp-val">${slot.h}m</span>
                        <span class="surf-dp-swell" style="display: flex; align-items: center; gap: 4px;">
                          ${getSurfSwellArrowSvg(slot.swellDeg, '#38bdf8', 11)} Swell: ${slot.swellH}m · ${slot.period}s (${slot.swellDirObj.short})
                        </span>
                      </div>
                      <div class="surf-dp-wind-col ${slot.surfWind.statusClass}">
                        <span class="surf-dp-wind-badge" style="color: ${slot.surfWind.color};">${slot.surfWind.badge}</span>
                        <span class="surf-dp-wind-spd" style="display: flex; align-items: center; gap: 4px;">
                          ${getSurfWindArrowSvg(slot.windDeg, slot.surfWind.color, 11)} ${slot.windSpd} km/h (${slot.windDirObj.short})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="sensors-dots-indicator carousel-dots-indicator" id="surf-timeline-dots">
            ${timelineSlots.map((slot, idx) => `<span class="sensor-dot ${idx === 0 ? 'active' : ''}" data-sensor-target="${idx}" title="${slot.dayLabel} ${slot.timeStr}"></span>`).join('')}
          </div>
        </div>

        <!-- VISTA 2: PREVISIÓN EXTENDIDA 7 DÍAS (MAÑANA / TARDE) -->
        <div id="surf-daily-view" class="surf-tab-content" style="display: none;">
          <div class="surf-daily-cards-grid" id="surf-daily-carousel">
            ${dailyForecast.map(day => `
              <div class="surf-daily-card">
                <div class="surf-daily-card-header">
                  <div class="surf-daily-day-badge">📅 ${day.dayTitle}</div>
                  <div class="surf-daily-date-sub">${day.dayFormatted}</div>
                </div>
                
                <div class="surf-dayparts-list">
                  <!-- MAÑANA -->
                  <div class="surf-daypart-row-item morning-item">
                    <div class="surf-dp-top-row">
                      <span class="surf-daypart-tag morning-tag">🌅 Mañana (08h - 14h)</span>
                      <span class="surf-dp-stars-badge" style="background: ${day.morning.starRating.color}22; color: ${day.morning.starRating.color}; border: 1px solid ${day.morning.starRating.color}66; border-radius: 6px; padding: 2px 7px; font-size: 0.74rem; font-weight: 700;">
                        ${day.morning.starRating.starIcons}
                      </span>
                      <div class="surf-dp-energy-pill" style="background: ${day.morning.energy.color}22; color: ${day.morning.energy.color}; border: 1px solid ${day.morning.energy.color}66;">
                        ⚡ ${day.morning.energy.kj} kJ • ${day.morning.energy.shortLabel}
                      </div>
                    </div>
                    
                    <div class="surf-dp-grid-row">
                      <div class="surf-dp-wave-col">
                        <span class="surf-dp-val">${day.morning.h}m</span>
                        <span class="surf-dp-swell" style="display: flex; align-items: center; gap: 4px;">
                          ${getSurfSwellArrowSvg(day.morning.waveDeg, '#38bdf8', 11)} Swell: ${day.morning.swellH}m · ${day.morning.period}s (${day.morning.waveDir.short})
                        </span>
                      </div>
                      <div class="surf-dp-wind-col ${day.morning.surfWind.statusClass}">
                        <span class="surf-dp-wind-badge" style="color: ${day.morning.surfWind.color};">${day.morning.surfWind.badge}</span>
                        <span class="surf-dp-wind-spd" style="display: flex; align-items: center; gap: 4px;">
                          ${getSurfWindArrowSvg(day.morning.windDeg, day.morning.surfWind.color, 11)} ${day.morning.windSpd} km/h (${day.morning.windDirObj.short})
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- TARDE -->
                  <div class="surf-daypart-row-item afternoon-item">
                    <div class="surf-dp-top-row">
                      <span class="surf-daypart-tag afternoon-tag">🌇 Tarde (14h - 20h)</span>
                      <span class="surf-dp-stars-badge" style="background: ${day.afternoon.starRating.color}22; color: ${day.afternoon.starRating.color}; border: 1px solid ${day.afternoon.starRating.color}66; border-radius: 6px; padding: 2px 7px; font-size: 0.74rem; font-weight: 700;">
                        ${day.afternoon.starRating.starIcons}
                      </span>
                      <div class="surf-dp-energy-pill" style="background: ${day.afternoon.energy.color}22; color: ${day.afternoon.energy.color}; border: 1px solid ${day.afternoon.energy.color}66;">
                        ⚡ ${day.afternoon.energy.kj} kJ • ${day.afternoon.energy.shortLabel}
                      </div>
                    </div>
                    
                    <div class="surf-dp-grid-row">
                      <div class="surf-dp-wave-col">
                        <span class="surf-dp-val">${day.afternoon.h}m</span>
                        <span class="surf-dp-swell" style="display: flex; align-items: center; gap: 4px;">
                          ${getSurfSwellArrowSvg(day.afternoon.waveDeg, '#38bdf8', 11)} Swell: ${day.afternoon.swellH}m · ${day.afternoon.period}s (${day.afternoon.waveDir.short})
                        </span>
                      </div>
                      <div class="surf-dp-wind-col ${day.afternoon.surfWind.statusClass}">
                        <span class="surf-dp-wind-badge" style="color: ${day.afternoon.surfWind.color};">${day.afternoon.surfWind.badge}</span>
                        <span class="surf-dp-wind-spd" style="display: flex; align-items: center; gap: 4px;">
                          ${getSurfWindArrowSvg(day.afternoon.windDeg, day.afternoon.surfWind.color, 11)} ${day.afternoon.windSpd} km/h (${day.afternoon.windDirObj.short})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="sensors-dots-indicator carousel-dots-indicator" id="surf-daily-dots">
            ${dailyForecast.map((day, idx) => `<span class="sensor-dot ${idx === 0 ? 'active' : ''}" data-sensor-target="${idx}" title="${day.dayTitle}"></span>`).join('')}
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>

      <!-- 3. CATÁLOGO TÉCNICO DE PICOS DE SURF, FONDOS & ROMPIENTES -->
      <div class="marine-ports-section" style="margin-top: 20px;">
        <div class="beach-section-header" style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <h4 class="ports-title" style="margin: 0; font-size: 1.05rem; line-height: 1.35;">
            🏖️ Rompientes, Picos y Fondos de ${surfLocationTitle}
          </h4>
          <button class="btn-explain-sensor surf-guide-btn" data-explain="surf" title="Aprender sobre Offshore, Fondos, Izquierdas y Picos" style="padding: 6px 14px; height: 34px; font-size: 0.8rem; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px; background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); cursor: pointer; transition: all 0.2s ease;">
            <span>💡</span>
            <span>Guía de Surf</span>
          </button>
        </div>

        ${activePlayas.length > 0 ? `
          <!-- SELECTOR ERGONÓMICO TÁCTIL DE ARENAL / ROMPIENTE (ESTILO RUTAS Y CICLISMO) -->
          <div class="surf-spot-selector-wrap" style="margin-bottom: 12px; display: flex; flex-direction: column; gap: 6px;">
            <label style="font-size: 0.8rem; font-weight: 700; color: #94a3b8;">
              Arenal y Rompientes:
            </label>

            <button type="button" id="btn-open-surf-spot-picker" class="surf-spot-trigger" aria-label="Cambiar arenal o rompiente de surf">
              <div style="display: flex; align-items: center; gap: 8px; overflow: hidden; min-width: 0;">
                <span style="font-size: 1.15rem; flex-shrink: 0;">🏖️</span>
                <div style="display: flex; flex-direction: column; min-width: 0; text-align: left;">
                  <span id="surf-trigger-beach-name" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.88rem; font-weight: 800; color: #ffffff;">
                    ${selectedBeach.name}
                  </span>
                  <span id="surf-trigger-beach-sub" style="font-size: 0.72rem; color: #94a3b8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${selectedBeach.facing ? `Mira al ${selectedBeach.facing}` : 'Costera'} · ${selectedBeach.tag || 'Spot de Surf'}
                  </span>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                <span style="font-size: 0.75rem; color: #38bdf8; font-weight: 800;">Elegir</span>
                <span style="font-size: 0.8rem; color: #38bdf8;">▼</span>
              </div>
            </button>
          </div>

          <!-- TARJETA PROTAGONISTA DE LA PLAYA SELECCIONADA -->
          <div id="surf-active-beach-container" class="surf-active-beach-container">
            ${activePlayas.map(p => {
              const beachWind = getBeachSpecificWindCondition(p.facingDeg || 355, windDeg, windSpeed);
              const isVisible = p.name === selectedBeach.name;
              return `
                <div class="surf-beach-spot-card ${isVisible ? 'active' : ''}" data-beach-name="${p.name}" style="${isVisible ? '' : 'display: none;'}">
                  ${(p.type || p.tag) ? `
                    <div class="surf-spot-card-header">
                      <div style="flex: 1; min-width: 0;">
                        <p style="margin: 0; font-size: 0.82rem; color: #cbd5e1; line-height: 1.45;">
                          ${p.type || (p.facing ? `Arenal orientado al ${p.facing}` : 'Rompiente costera')}
                        </p>
                      </div>
                      ${p.tag ? `
                        <span class="beach-card-tag" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 6px; flex-shrink: 0; white-space: nowrap;">
                          ${p.tag}
                        </span>
                      ` : ''}
                    </div>
                  ` : ''}

                  <div class="beach-specs-chips" style="margin-top: 10px;">
                    ${p.picos ? `
                      <div class="beach-spec-chip beach-chip-full" style="background: rgba(14, 116, 144, 0.15); border: 1px solid rgba(56, 189, 248, 0.25);">
                        <span class="beach-chip-icon">🎯</span>
                        <div class="beach-chip-info">
                          <span class="beach-chip-label">Picos de Surf Bautizados</span>
                          <span class="beach-chip-value" style="color: #38bdf8; font-weight: 700;">${p.picos}</span>
                        </div>
                      </div>
                    ` : ''}

                    <!-- Diagnóstico de Viento en Vivo específico para esta playa según su orientación -->
                    <div class="beach-spec-chip beach-chip-full ${beachWind.statusClass}" style="border-left: 3px solid ${beachWind.color}; background: rgba(15, 23, 42, 0.65);">
                      <span class="beach-chip-icon">💨</span>
                      <div class="beach-chip-info">
                        <span class="beach-chip-label">Viento en este arenal (${p.facing ? `Mira al ${p.facing}` : 'Costera'})</span>
                        <span class="beach-chip-value" style="color: ${beachWind.color}; font-weight: 700;">
                          ${beachWind.badge} • ${beachWind.shortDesc}
                        </span>
                      </div>
                    </div>

                    ${p.bestWind ? `
                      <div class="beach-spec-chip" style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981;">
                        <div class="beach-chip-header">
                          <span class="beach-chip-icon">🧭</span>
                          <span class="beach-chip-label">Viento Terral</span>
                        </div>
                        <span class="beach-chip-value" style="color: #34d399; font-weight: 700;">${p.bestWind}</span>
                      </div>
                    ` : ''}

                    ${p.bestSwell ? `
                      <div class="beach-spec-chip" style="background: rgba(56, 189, 248, 0.08); border-left: 3px solid #38bdf8;">
                        <div class="beach-chip-header">
                          <span class="beach-chip-icon">🌊</span>
                          <span class="beach-chip-label">Swell Óptimo</span>
                        </div>
                        <span class="beach-chip-value" style="color: #38bdf8; font-weight: 700;">${p.bestSwell}</span>
                      </div>
                    ` : ''}

                    <div class="beach-spec-chip">
                      <div class="beach-chip-header">
                        <span class="beach-chip-icon">🪨</span>
                        <span class="beach-chip-label">Fondo Marino</span>
                      </div>
                      <span class="beach-chip-value">${(p.bottom || 'Arena (Beach Break)').replace(/^[\p{Emoji}\u200d\uFE0F\s]+/u, '')}</span>
                    </div>

                    <div class="beach-spec-chip">
                      <div class="beach-chip-header">
                        <span class="beach-chip-icon">🔄</span>
                        <span class="beach-chip-label">Dirección Ola</span>
                      </div>
                      <span class="beach-chip-value">${(p.waveType || 'Picos A-Frame').replace(/^[\p{Emoji}\u200d\uFE0F\s]+/u, '')}</span>
                    </div>

                    <div class="beach-spec-chip">
                      <div class="beach-chip-header">
                        <span class="beach-chip-icon">⏳</span>
                        <span class="beach-chip-label">Marea Óptima</span>
                      </div>
                      <span class="beach-chip-value">${p.bestTide || 'Media Marea'}</span>
                    </div>

                    <div class="beach-spec-chip">
                      <div class="beach-chip-header">
                        <span class="beach-chip-icon">🎯</span>
                        <span class="beach-chip-label">Nivel Técnico</span>
                      </div>
                      <span class="beach-chip-value level-badge">${p.surfLevel || 'Todos'}</span>
                    </div>

                    ${p.hazards ? `
                      <div class="beach-spec-chip beach-chip-full" style="background: rgba(239, 68, 68, 0.06); border-left: 3px solid #ef4444;">
                        <span class="beach-chip-icon">⚠️</span>
                        <div class="beach-chip-info">
                          <span class="beach-chip-label">Precaución / Peligros</span>
                          <span class="beach-chip-value" style="color: #fca5a5; font-size: 0.74rem;">${p.hazards}</span>
                        </div>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div style="padding: 16px; text-align: center; background: rgba(15, 23, 42, 0.5); border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); color: #94a3b8; font-size: 0.82rem;">
            No hay arenales registrados específicamente en este sector costero.
          </div>
        `}
      </div>

      <!-- AVISO LEGAL Y EXENCIÓN DE RESPONSABILIDAD -->
      <div class="surf-disclaimer-box" style="margin-top: 20px; padding: 12px 16px; background: rgba(15, 23, 42, 0.45); border-radius: 12px; border-left: 3px solid #06b6d4; font-size: 0.76rem; color: #94a3b8; line-height: 1.5;">
        <strong style="color: #e2e8f0; display: block; margin-bottom: 4px;">⚠️ Responsabilidad Deportiva &amp; Surf:</strong>
        Las calificaciones (0-10★), energía en kJ y alturas de ola son cálculos físicos teóricos del oleaje mar adentro. <strong>Las condiciones locales en rompientes, barras y corrientes pueden ser muy cambiantes y peligrosas</strong>. Cada surfista entra al mar bajo su exclusiva responsabilidad, criterio y preparación física.
      </div>
    </div>

    <!-- BOTTOM SHEET / MODAL ERGONÓMICO DE SELECCIÓN DE ARENAL / ROMPIENTE (FUERA DE MARINE-CARD) -->
    ${activePlayas.length > 0 ? `
      <div id="surf-spots-modal" class="surf-spots-modal-backdrop" aria-hidden="true" style="display: none;">
        <div class="surf-spots-modal-sheet">
          <div style="padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: #ffffff;">Selecciona arenal o rompiente</h3>
              <span style="font-size: 0.75rem; color: #94a3b8;">Toca una playa para ver su ficha técnica</span>
            </div>
            <button type="button" id="btn-close-surf-spots-modal" style="background: rgba(255,255,255,0.08); border: none; color: #ffffff; font-size: 1.1rem; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;" aria-label="Cerrar selector">
              ✕
            </button>
          </div>

          <div style="padding: 12px 14px; overflow-y: auto; flex: 1; -webkit-overflow-scrolling: touch; max-height: 60vh;">
            ${activePlayas.map(p => {
              const beachWind = getBeachSpecificWindCondition(p.facingDeg || 355, windDeg, windSpeed);
              const isSelected = p.name === selectedBeach.name;
              return `
                <div class="surf-spot-item-card ${isSelected ? 'selected' : ''}" data-beach-name="${p.name}" data-beach-sub="${p.facing ? `Mira al ${p.facing}` : 'Costera'} · ${p.tag || 'Spot de Surf'}">
                  <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                    <strong style="font-size: 0.88rem; color: #ffffff;">🏖️ ${p.name}</strong>
                    <span style="font-size: 0.7rem; font-weight: 800; padding: 2px 7px; border-radius: 6px; background: ${beachWind.color}; color: #000; white-space: nowrap;">
                      ${beachWind.badge}
                    </span>
                  </div>
                  <div style="display: flex; gap: 8px; align-items: center; font-size: 0.72rem; color: #94a3b8; margin-top: 4px; flex-wrap: wrap;">
                    <span>🧭 ${p.facing ? `Mira al ${p.facing}` : 'Costera'}</span>
                    <span>•</span>
                    <span>🌊 ${p.bottom || 'Arena'}</span>
                    <span>•</span>
                    <span style="color: #38bdf8;">${p.surfLevel || 'Todos'}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    ` : ''}
  </div>
`;
}


