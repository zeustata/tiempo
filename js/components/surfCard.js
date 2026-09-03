import { getWindDirection } from '../utils/weatherIcons.js?v=1.0.80';
import { getRealtimeTideStatus } from '../utils/tides.js?v=1.0.80';
import { 
  PLAYAS_POR_CONCEJO, 
  getNearestCoastalReference, 
  getSurfWindCondition,
  getBeachSpecificWindCondition,
  getSeaWaterTemperature
} from './marineCard.js?v=1.0.80';

/**
 * Calcula la escala de Douglas a partir de la altura significativa de ola
 */
function getDouglasScale(height) {
  if (height < 0.1) return { degree: 0, name: 'Mar llana' };
  if (height < 0.5) return { degree: 1, name: 'Mar rizada' };
  if (height < 1.25) return { degree: 2, name: 'Marejadilla' };
  if (height < 2.5) return { degree: 3, name: 'Marejada' };
  if (height < 4.0) return { degree: 4, name: 'Fuerte marejada' };
  if (height < 6.0) return { degree: 5, name: 'Gruesa' };
  if (height < 9.0) return { degree: 6, name: 'Muy gruesa' };
  if (height < 14.0) return { degree: 7, name: 'Arbolada' };
  return { degree: 8, name: 'Montañosa' };
}

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

  if (rawKj >= 1200) {
    label = 'Pesada (Solo Expertos)';
    shortLabel = 'Pesada';
    badgeClass = 'energy-extreme';
    color = '#ef4444';
    icon = '🔴';
    desc = 'Gran potencia y masa de agua con fuertes corrientes. Solo surfistas expertos.';
  } else if (rawKj >= 500) {
    label = 'Potente (Tubos / Consistente)';
    shortLabel = 'Potente';
    badgeClass = 'energy-high';
    color = '#f97316';
    icon = '🟠';
    desc = 'Mucha fuerza y empuje. Paredes consistentes, huecas y tubulares.';
  } else if (rawKj >= 200) {
    label = 'Óptima (Divertida / Shortboard)';
    shortLabel = 'Óptima';
    badgeClass = 'energy-optimal';
    color = '#fbbf24';
    icon = '🟡';
    desc = 'Potencia ideal y buen empuje para maniobras con tabla corta y evolutiva.';
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
  const isOffshoreOrGlassy = windCondition && (windCondition.type === 'offshore' || windCondition.type === 'glassy');
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

  // 2. Mar realmente duro / Temporal / Oleaje masivo (> 3m o > 1200 kJ)
  if (h >= 3.0 || energyKj >= 1200) {
    return {
      status: '⚠️ Mar Fuerte / Oleaje Duro y Masivo',
      badge: 'Mar Duro / Pro',
      color: '#ef4444',
      bg: '#ef444422',
      border: '#ef4444',
      desc: 'Olas de gran tamaño, fuerte resaca y corrientes intensas. Solo apto para surfistas muy experimentados en calas resguardadas.'
    };
  }

  // 3. Sesión Épica (Mar de fondo de calidad, período largo y viento peinando la ola)
  if (h >= 0.8 && h <= 2.5 && p >= 11 && isOffshoreOrGlassy) {
    return {
      status: '🔥 Sesión Épica / Olas Excelentes',
      badge: 'Excelente',
      color: '#10b981',
      bg: '#10b98122',
      border: '#10b981',
      desc: 'Mar de fondo largo con período de gran calidad y viento favorable que peina la rompiente.'
    };
  }

  // 4. Buenas condiciones con período medio/largo (p >= 9s)
  if (p >= 9) {
    if (isOnshore) {
      return {
        status: '🌊 Olas con Mar Picado (Chop)',
        badge: 'Chop / Desordenado',
        color: '#f59e0b',
        bg: '#f59e0b22',
        border: '#f59e0b',
        desc: 'Hay fuerza y tamaño de ola, pero el viento de mar genera espuma y textura rizada.'
      };
    }
    return {
      status: '🏄‍♂️ Buenas Condiciones para Surfear',
      badge: 'Buenas Olas',
      color: '#38bdf8',
      bg: '#38bdf822',
      border: '#38bdf8',
      desc: 'Buen tamaño de ola, empuje consistente y paredes definidas en rompientes expuestas.'
    };
  }

  // 5. Período corto (p < 9s): Mar de viento o swell joven (olas fofas de poco empuje)
  if (isOnshore) {
    return {
      status: '💨 Mar de Viento / Olas Revueltas',
      badge: 'Mar Revuelto',
      color: '#f59e0b',
      bg: '#f59e0b22',
      border: '#f59e0b',
      desc: 'Período corto con viento desfavorable. Olas fofas y revueltas con poco empuje de fondo.'
    };
  }

  return {
    status: '🏄‍♂️ Olas Suaves / Período Corto',
    badge: 'Suave / Iniciación',
    color: '#0ea5e9',
    bg: '#0ea5e922',
    border: '#0ea5e9',
    desc: 'Olas con ritmo rápido y empuje suave. Muy buenas para tablas evolutivas, longboard e iniciación.'
  };
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

  [0, 1].forEach(dayOffset => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset);
    const dayLabel = dayOffset === 0 ? 'Hoy' : 'Mañana';
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

      // Métricas de oleaje
      const rawH = marineHourly?.wave_height ? marineHourly.wave_height[idx] : null;
      const h = (typeof rawH === 'number') ? rawH.toFixed(1) : '1.3';
      
      const rawSwellH = marineHourly?.swell_wave_height ? marineHourly.swell_wave_height[idx] : null;
      const swellH = (typeof rawSwellH === 'number') ? rawSwellH.toFixed(1) : h;

      const rawPeriod = marineHourly?.swell_wave_period ? marineHourly.swell_wave_period[idx] : (marineHourly?.wave_period ? marineHourly.wave_period[idx] : null);
      const period = (typeof rawPeriod === 'number') ? Math.round(rawPeriod) : 11;

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
        energy,
        windSpd,
        windDeg,
        windDirObj,
        surfWind,
        tideStatus
      });
    });
  });

  return slots;
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
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + d);
    const dayDateStr = targetDate.toISOString().split('T')[0];
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
    const mWaveDir = (typeof marineHourly.swell_wave_direction?.[morningIdx] === 'number') ? getWindDirection(marineHourly.swell_wave_direction[morningIdx]) : { name: 'NW', short: 'NW' };
    
    const mSecH = (typeof marineHourly.secondary_swell_wave_height?.[morningIdx] === 'number') ? marineHourly.secondary_swell_wave_height[morningIdx].toFixed(1) : '0';
    const mSecPeriod = (typeof marineHourly.secondary_swell_wave_period?.[morningIdx] === 'number') ? Math.round(marineHourly.secondary_swell_wave_period[morningIdx]) : 0;
    const mEnergy = calculateWaveEnergy(mSwellH, mPeriod, mSecH, mSecPeriod);

    const mWindSpd = Math.round(weatherHourly.wind_speed_10m?.[morningIdx] || 0);
    const mWindDeg = weatherHourly.wind_direction_10m?.[morningIdx] || 180;
    const mWindDirObj = getWindDirection(mWindDeg);
    const mSurfWind = getSurfWindCondition(mWindDeg, mWindSpd);
    const mQuality = evaluateSurfQuality(mH, mPeriod, mSurfWind, mEnergy);

    // 2. TRAMO TARDE (Índice representativo: 17:00)
    const afternoonHour = 17;
    const afternoonPrefix = `${dayDateStr}T${String(afternoonHour).padStart(2, '0')}`;
    let afternoonIdx = marineHourly.time.findIndex(t => t.startsWith(afternoonPrefix));
    if (afternoonIdx === -1) afternoonIdx = Math.min(d * 24 + afternoonHour, marineHourly.time.length - 1);

    const aH = (typeof marineHourly.wave_height[afternoonIdx] === 'number') ? marineHourly.wave_height[afternoonIdx].toFixed(1) : '1.2';
    const aSwellH = (typeof marineHourly.swell_wave_height?.[afternoonIdx] === 'number') ? marineHourly.swell_wave_height[afternoonIdx].toFixed(1) : aH;
    const aPeriod = (typeof marineHourly.swell_wave_period?.[afternoonIdx] === 'number') ? Math.round(marineHourly.swell_wave_period[afternoonIdx]) : ((typeof marineHourly.wave_period?.[afternoonIdx] === 'number') ? Math.round(marineHourly.wave_period[afternoonIdx]) : 10);
    const aWaveDir = (typeof marineHourly.swell_wave_direction?.[afternoonIdx] === 'number') ? getWindDirection(marineHourly.swell_wave_direction[afternoonIdx]) : { name: 'NW', short: 'NW' };
    
    const aSecH = (typeof marineHourly.secondary_swell_wave_height?.[afternoonIdx] === 'number') ? marineHourly.secondary_swell_wave_height[afternoonIdx].toFixed(1) : '0';
    const aSecPeriod = (typeof marineHourly.secondary_swell_wave_period?.[afternoonIdx] === 'number') ? Math.round(marineHourly.secondary_swell_wave_period[afternoonIdx]) : 0;
    const aEnergy = calculateWaveEnergy(aSwellH, aPeriod, aSecH, aSecPeriod);

    const aWindSpd = Math.round(weatherHourly.wind_speed_10m?.[afternoonIdx] || 0);
    const aWindDeg = weatherHourly.wind_direction_10m?.[afternoonIdx] || 180;
    const aWindDirObj = getWindDirection(aWindDeg);
    const aSurfWind = getSurfWindCondition(aWindDeg, aWindSpd);
    const aQuality = evaluateSurfQuality(aH, aPeriod, aSurfWind, aEnergy);

    dailyForecast.push({
      dayIndex: d,
      dayTitle: dayCapitalized,
      dayFormatted,
      morning: {
        h: mH,
        swellH: mSwellH,
        period: mPeriod,
        waveDir: mWaveDir,
        energy: mEnergy,
        windSpd: mWindSpd,
        windDeg: mWindDeg,
        windDirObj: mWindDirObj,
        surfWind: mSurfWind,
        quality: mQuality
      },
      afternoon: {
        h: aH,
        swellH: aSwellH,
        period: aPeriod,
        waveDir: aWaveDir,
        energy: aEnergy,
        windSpd: aWindSpd,
        windDeg: aWindDeg,
        windDirObj: aWindDirObj,
        surfWind: aSurfWind,
        quality: aQuality
      }
    });
  }

  return dailyForecast;
}

/**
 * Renderiza el módulo especializado de Surf, Rompientes & Olas
 */
export function renderSurfCard(data, concejo) {
  const marine = data.marine?.current;
  const current = data.weather.current;

  const isCoasting = PLAYAS_POR_CONCEJO[concejo.id] !== undefined;
  const coastalData = isCoasting ? PLAYAS_POR_CONCEJO[concejo.id] : null;
  const interiorRef = !isCoasting ? getNearestCoastalReference(concejo) : null;
  const activePlayas = isCoasting 
    ? (coastalData ? coastalData.playas : [])
    : (PLAYAS_POR_CONCEJO[interiorRef.refId] ? PLAYAS_POR_CONCEJO[interiorRef.refId].playas : []);

  // Métricas del oleaje y swell primario y secundario
  const waveHeight = (marine && typeof marine.wave_height === 'number') ? marine.wave_height.toFixed(1) : (isCoasting ? '1.4' : '1.3');
  const swellHeight = (marine && typeof marine.swell_wave_height === 'number') ? marine.swell_wave_height.toFixed(1) : ((marine && typeof marine.wave_height === 'number') ? marine.wave_height.toFixed(1) : '1.2');
  const wavePeriod = (marine && typeof marine.swell_wave_period === 'number') ? Math.round(marine.swell_wave_period) : ((marine && typeof marine.wave_period === 'number') ? Math.round(marine.wave_period) : 11);
  const waveDir = (marine && typeof marine.swell_wave_direction === 'number') ? getWindDirection(marine.swell_wave_direction) : ((marine && typeof marine.wave_direction === 'number') ? getWindDirection(marine.wave_direction) : { name: 'Noroeste (NW)' });
  const windWaveH = (marine && typeof marine.wind_wave_height === 'number') ? marine.wind_wave_height.toFixed(1) : '0.6';

  // Swell Secundario
  const secSwellH = (marine && typeof marine.secondary_swell_wave_height === 'number') ? marine.secondary_swell_wave_height.toFixed(1) : '0.0';
  const secSwellPeriod = (marine && typeof marine.secondary_swell_wave_period === 'number') ? Math.round(marine.secondary_swell_wave_period) : 0;
  const secSwellDir = (marine && typeof marine.secondary_swell_wave_direction === 'number') ? getWindDirection(marine.secondary_swell_wave_direction) : null;
  const hasSecondary = parseFloat(secSwellH) >= 0.2;
  
  // Viento actual
  const windSpeed = Math.round(current.wind_speed_10m || 0);
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

  // Temperatura del mar y traje unificada
  const seaTemp = getSeaWaterTemperature(marine);
  const wetsuit = getWetsuitRecommendation(parseFloat(seaTemp));

  // Tramos de evolución a 3 horas y previsión diaria a 7 días
  const timelineSlots = getSurfTimelineSlots(data, concejo);
  const dailyForecast = getSurfDailyForecast(data, concejo);

  return `
    <div class="marine-card">
      <div class="section-title-wrap">
        <div>
          <h3 class="section-heading">🏄‍♂️ Surf, Rompientes & Olas de ${concejo.name}</h3>
          <span class="section-subtitle">
            ${isCoasting 
              ? `Dinámica marina y picos de ${concejo.name} (${coastalData.region}) • Swell Cantábrico`
              : `🌲 ${concejo.name} es concejo de interior. Rompientes enfocadas a la costa más cercana: ${interiorRef.name}`
            }
          </span>
        </div>
        <div class="sea-state-pill" style="background: ${surfQuality.bg}; color: ${surfQuality.color}; border: 1px solid ${surfQuality.border};">
          Grado ${douglasDegree} • ${douglasName} (${waveHeight}m)
        </div>
      </div>

      <!-- 1. GRID DE SENSORES TÉCNICOS DE SWELL, ENERGÍA Y ROMPIENTE -->
      <div class="marine-grid">
        <!-- Altura de Ola Significativa -->
        <div class="marine-widget">
          <div class="t-label-row">
            <span class="widget-label">Altura del Oleaje (Significativa)</span>
            <button class="btn-explain-sensor" data-explain="waves" title="¿Cómo entender la altura del oleaje, mar de fondo y escala Douglas? Pulsa para aprender">💡 Explícame</button>
          </div>
          <div class="widget-value">${waveHeight} <span class="unit">metros</span></div>
          <div class="widget-detail">Mar de fondo (Swell): <strong>${swellHeight} m</strong></div>
          <div class="widget-detail">Mar de viento (Chop): <strong>${windWaveH} m</strong></div>
        </div>

        <!-- Período y Dirección del Swell -->
        <div class="marine-widget">
          <div class="t-label-row">
            <span class="widget-label">Período y Dirección del Swell</span>
            <button class="btn-explain-sensor" data-explain="swell" title="¿Qué es el período en segundos y la dirección del swell? Pulsa para aprender">💡 Explícame</button>
          </div>
          <div class="widget-value">${wavePeriod} <span class="unit">segundos</span></div>
          <div class="widget-detail">🌊 Swell 1 (Principal): <strong>${swellHeight}m · ${wavePeriod}s (${waveDir.name})</strong></div>
          ${hasSecondary && secSwellDir 
            ? `<div class="widget-detail" style="color: #7dd3fc;">🌊 Swell 2 (Secundario): <strong>${secSwellH}m · ${secSwellPeriod}s (${secSwellDir.name})</strong></div>` 
            : `<div class="widget-detail">Viento en costa: <strong>${windSpeed} km/h (${windDirObj.name})</strong></div>`
          }
        </div>

        <!-- Energía de la Ola (kJ) -->
        <div class="marine-widget surf-energy-widget">
          <div class="t-label-row">
            <span class="widget-label">⚡ Energía de la Ola (Combinada)</span>
            <button class="btn-explain-sensor" data-explain="surf_energy" title="¿Qué es la energía de la ola en kJ y multiswell? Pulsa para aprender">💡 Explícame</button>
          </div>
          <div class="widget-value" style="color: ${waveEnergy.color};">${waveEnergy.kj} <span class="unit">kJ (kiloJulios)</span></div>
          <div class="surf-energy-badge-row">
            <span class="surf-energy-pill ${waveEnergy.badgeClass}" style="background: ${waveEnergy.color}22; color: ${waveEnergy.color}; border: 1px solid ${waveEnergy.color}66;">
              ${waveEnergy.icon} ${waveEnergy.label}
            </span>
          </div>
          <div class="widget-detail" style="margin-top: 6px;">
            ${waveEnergy.hasSecondary 
              ? `⚡ Energía Combinada: <strong>${waveEnergy.primaryKj} kJ</strong> (Swell 1) + <strong>${waveEnergy.secondaryKj} kJ</strong> (Swell 2)` 
              : waveEnergy.desc}
          </div>
        </div>

        <!-- Aptitud y Calidad de la Rompiente -->
        <div class="marine-widget surf-turismo-visual-widget">
          <div class="surf-widget-top">
            <div class="surf-title-row">
              <span class="surf-title-icon">🏄‍♂️</span>
              <div>
                <div class="surf-title-main">Condición de Rompiente</div>
                <div class="surf-title-sub">${isCoasting ? `Playas de ${concejo.name}` : `Costa de ${interiorRef.name}`}</div>
              </div>
            </div>
            <div class="surf-flag-badge" style="background: ${surfQuality.bg}; color: ${surfQuality.color}; border: 1px solid ${surfQuality.border};">
              ${surfQuality.badge}
            </div>
          </div>

          <div class="surf-status-banner" style="color: ${surfQuality.color};">
            ${surfQuality.status}
          </div>
          <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 6px; line-height: 1.3;">
            ${surfQuality.desc}
          </div>
        </div>

        <!-- Temperatura Marina y Traje Recomendado -->
        <div class="marine-widget">
          <div class="widget-label">Temperatura del Agua & Neopreno</div>
          <div class="widget-value">${seaTemp} <span class="unit">°C</span></div>
          <div class="widget-detail">${wetsuit.icon} Traje sugerido: <strong>${wetsuit.suit}</strong></div>
          <div class="widget-detail">Sensación marina: <strong>Agua ${wetsuit.tag}</strong></div>
        </div>
      </div>

      <!-- 2. VISOR DUAL DE PREVISIÓN DE SURF (HORARIO 3H vs EXTENDIDO 7 DÍAS MAÑANA/TARDE) -->
      <div class="marine-widget surf-timeline-widget" style="margin-top: 20px; margin-bottom: 20px;">
        <div class="surf-timeline-header">
          <div class="surf-timeline-title-wrap">
            <span class="surf-timeline-icon">🏄‍♂️</span>
            <div>
              <div class="surf-timeline-title">Previsión de Surf & Rompiente</div>
              <div class="surf-timeline-subtitle">Evolución de oleaje, swell, energía kJ y viento en ${concejo.name}</div>
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
          <div class="surf-timeline-scroll-container">
            <div class="surf-timeline-scroll-hint">
              <span>👆 Desliza horizontalmente para ver la evolución a 3 horas de Hoy y Mañana</span>
            </div>
            <div class="surf-timeline-grid">
              ${timelineSlots.map(slot => `
                <div class="surf-slot-card ${slot.isPast ? 'is-past' : ''}">
                  <div class="surf-slot-top">
                    <span class="slot-day">${slot.dayLabel}</span>
                    <span class="slot-hour">${slot.timeStr}</span>
                  </div>

                  <!-- Ola y Swell -->
                  <div class="slot-metric-row">
                    <div class="slot-metric-main">
                      <span class="slot-wave-val">${slot.h}m</span>
                      <span class="slot-swell-sub">Swell: ${slot.swellH}m</span>
                    </div>
                    <div class="slot-period-badge">
                      <span class="period-num">${slot.period}s</span>
                      <span class="period-lbl">período</span>
                    </div>
                  </div>

                  <!-- Energía kJ -->
                  <div class="slot-energy-box" style="border-left: 3px solid ${slot.energy.color}; background: rgba(15, 23, 42, 0.65);">
                    <div class="slot-energy-top">
                      <span class="slot-energy-kj" style="color: ${slot.energy.color};">⚡ ${slot.energy.kj} kJ</span>
                      <span class="slot-energy-tag" style="color: ${slot.energy.color};">${slot.energy.shortLabel}</span>
                    </div>
                  </div>

                  <!-- Viento y Calidad -->
                  <div class="slot-wind-box ${slot.surfWind.statusClass}" style="border: 1px solid ${slot.surfWind.color}55;">
                    <div class="slot-wind-top">
                      <span class="slot-wind-badge" style="color: ${slot.surfWind.color};">${slot.surfWind.badge}</span>
                      <span class="slot-wind-speed">${slot.windSpd} km/h</span>
                    </div>
                    <div class="slot-wind-dir">${slot.windDirObj.name}</div>
                  </div>

                  <!-- Marea en esa hora -->
                  <div class="slot-tide-row">
                    <span class="slot-tide-ico">${slot.tideStatus.directionIcon}</span>
                    <span class="slot-tide-txt">${slot.tideStatus.directionName.split(' ')[0]}</span>
                    <span class="slot-tide-h">${slot.tideStatus.currentWaterHeight}m</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- VISTA 2: PREVISIÓN EXTENDIDA 7 DÍAS (MAÑANA / TARDE) -->
        <div id="surf-daily-view" class="surf-tab-content" style="display: none;">
          <div class="surf-daily-cards-grid">
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
                      <div class="surf-dp-energy-pill" style="background: ${day.morning.energy.color}22; color: ${day.morning.energy.color}; border: 1px solid ${day.morning.energy.color}66;">
                        ⚡ ${day.morning.energy.kj} kJ • ${day.morning.energy.shortLabel}
                      </div>
                    </div>
                    
                    <div class="surf-dp-grid-row">
                      <div class="surf-dp-wave-col">
                        <span class="surf-dp-val">${day.morning.h}m</span>
                        <span class="surf-dp-swell">Swell: ${day.morning.swellH}m · ${day.morning.period}s (${day.morning.waveDir.short})</span>
                      </div>
                      <div class="surf-dp-wind-col ${day.morning.surfWind.statusClass}">
                        <span class="surf-dp-wind-badge" style="color: ${day.morning.surfWind.color};">${day.morning.surfWind.badge}</span>
                        <span class="surf-dp-wind-spd">${day.morning.windSpd} km/h (${day.morning.windDirObj.short})</span>
                      </div>
                    </div>
                  </div>

                  <!-- TARDE -->
                  <div class="surf-daypart-row-item afternoon-item">
                    <div class="surf-dp-top-row">
                      <span class="surf-daypart-tag afternoon-tag">🌇 Tarde (14h - 20h)</span>
                      <div class="surf-dp-energy-pill" style="background: ${day.afternoon.energy.color}22; color: ${day.afternoon.energy.color}; border: 1px solid ${day.afternoon.energy.color}66;">
                        ⚡ ${day.afternoon.energy.kj} kJ • ${day.afternoon.energy.shortLabel}
                      </div>
                    </div>
                    
                    <div class="surf-dp-grid-row">
                      <div class="surf-dp-wave-col">
                        <span class="surf-dp-val">${day.afternoon.h}m</span>
                        <span class="surf-dp-swell">Swell: ${day.afternoon.swellH}m · ${day.afternoon.period}s (${day.afternoon.waveDir.short})</span>
                      </div>
                      <div class="surf-dp-wind-col ${day.afternoon.surfWind.statusClass}">
                        <span class="surf-dp-wind-badge" style="color: ${day.afternoon.surfWind.color};">${day.afternoon.surfWind.badge}</span>
                        <span class="surf-dp-wind-spd">${day.afternoon.windSpd} km/h (${day.afternoon.windDirObj.short})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- 3. PANEL DE INTELIGENCIA DE SURF: VIENTO OFFSHORE/ONSHORE & GUÍA DIDÁCTICA -->
      <div class="marine-widget surf-intelligence-card" style="margin-top: 20px; margin-bottom: 20px;">
        <div class="surf-intel-header">
          <div class="surf-intel-title-wrap">
            <span class="surf-intel-icon">🧭</span>
            <div>
              <div class="surf-intel-title">Calidad de Viento para Surf (Offshore / Onshore)</div>
              <div class="surf-intel-subtitle">Análisis aerodinámico en vivo cruzando viento y orientación cantábrica</div>
            </div>
          </div>
          <button class="btn-explain-sensor surf-guide-btn" data-explain="surf" title="Aprender sobre Offshore, Fondos, Izquierdas y Picos">
            💡 Guía de Surf y Olas
          </button>
        </div>

        <div class="surf-wind-analysis-grid">
          <!-- Tarjeta de Estado del Viento en Vivo -->
          <div class="surf-wind-pill-card ${surfWind.statusClass}">
            <div class="surf-wind-badge-row">
              <span class="surf-wind-status-badge" style="background: ${surfWind.color}22; color: ${surfWind.color}; border: 1px solid ${surfWind.color}80;">
                ${surfWind.badge}
              </span>
              <span class="surf-wind-reading">${windSpeed} km/h • ${windDirObj.name} (${Math.round(windDeg)}°)</span>
            </div>
            <div class="surf-wind-desc-text">
              <strong>${surfWind.name}:</strong> ${surfWind.desc}
            </div>
            <div class="surf-wind-effect-tag">
              ⚡ <strong>Efecto en la rompiente:</strong> ${surfWind.effect}
            </div>
          </div>

          <!-- Consejos de Orientación y Lectura Rápida -->
          <div class="surf-quick-tips-card">
            <div class="quick-tip-row">
              <span class="tip-icon">🟢</span>
              <div class="tip-body">
                <strong>Offshore (Viento Sur):</strong> Ideal. Peina la ola, crea tubos y deja el mar como un espejo.
              </div>
            </div>
            <div class="quick-tip-row">
              <span class="tip-icon">🔴</span>
              <div class="tip-body">
                <strong>Onshore (Viento Norte):</strong> Mar picado (chop), aplasta las olas y genera espuma.
              </div>
            </div>
            <div class="quick-tip-row">
              <span class="tip-icon">🏄‍♂️</span>
              <div class="tip-body">
                <strong>Izquierdas / Derechas:</strong> Se definen siempre mirando hacia la playa desde la ola.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. CATÁLOGO TÉCNICO DE PICOS DE SURF, FONDOS & ROMPIENTES -->
      <div class="marine-ports-section">
        <div class="beach-section-header">
          <div>
            <h4 class="ports-title" style="margin-bottom: 2px;">
              🏖️ Rompientes, Picos de Surf & Fondos de ${isCoasting ? concejo.name : `${concejo.name} (en ${interiorRef.name})`}
            </h4>
            <span class="beach-section-subtitle">
              Picos bautizados, orientación de costa, viento en tiempo real, tipo de fondo y marea óptima
            </span>
          </div>
        </div>

        <div class="beaches-grid">
          ${activePlayas.map(p => {
            const beachWind = getBeachSpecificWindCondition(p.facingDeg || 355, windDeg, windSpeed);
            return `
              <div class="beach-card">
                <div class="beach-card-top">
                  <span class="beach-card-name">${p.name}</span>
                  <span class="beach-card-tag">${p.tag || 'Playa'}</span>
                </div>
                
                <div class="beach-card-desc">${p.type}</div>

                <div class="beach-specs-table">
                  ${p.picos ? `
                    <div class="beach-picos-box">
                      <span class="picos-box-label">📍 PICOS DE SURF:</span>
                      <span class="picos-box-value">${p.picos}</span>
                    </div>
                  ` : ''}

                  <!-- Diagnóstico de Viento en Vivo específico para esta playa según su orientación -->
                  <div class="beach-spec-row ${beachWind.statusClass}" style="border-left: 3px solid ${beachWind.color}; background: rgba(15, 23, 42, 0.55);">
                    <span class="spec-label">💨 VIENTO EN ESTA PLAYA (${p.facing ? `Mira al ${p.facing}` : 'Costera'}):</span>
                    <span class="spec-value" style="color: ${beachWind.color}; font-weight: 700;">
                      ${beachWind.badge} • ${beachWind.shortDesc}
                    </span>
                  </div>

                  <div class="beach-spec-row">
                    <span class="spec-label">🪨 Fondo Marino:</span>
                    <span class="spec-value">${p.bottom || '🏖️ Arena (Beach Break)'}</span>
                  </div>

                  <div class="beach-spec-row">
                    <span class="spec-label">🔄 Dirección Ola:</span>
                    <span class="spec-value">${p.waveType || '↔️ Picos A-Frame'}</span>
                  </div>

                  <div class="beach-spec-row">
                    <span class="spec-label">⏳ Marea Óptima:</span>
                    <span class="spec-value">${p.bestTide || 'Media Marea'}</span>
                  </div>

                  <div class="beach-spec-row">
                    <span class="spec-label">🎯 Nivel Técnico:</span>
                    <span class="spec-value level-badge">${p.surfLevel || 'Todos'}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}


