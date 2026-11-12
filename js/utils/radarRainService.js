/**
 * METEOASTUR LODE - Servicio de Lluvia por Lotes para Radar y Ranking Regional
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Consulta por lotes para los concejos de Asturias en 1 sola llamada Open-Meteo.
 */

import { CONCEJOS_ASTURIAS } from '../config/concejos.js';

let concejosRainCache = null;
let lastFetchTimestamp = 0;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutos

/**
 * Consulta la previsión a 3 días de lluvia de todos los concejos en un único lote HTTP GET.
 */
export async function fetchConcejosRainBatch(force = false) {
  const now = Date.now();
  if (!force && concejosRainCache && (now - lastFetchTimestamp < CACHE_TTL_MS)) {
    return concejosRainCache;
  }

  try {
    const lats = CONCEJOS_ASTURIAS.map(c => c.lat.toFixed(4)).join(',');
    const lons = CONCEJOS_ASTURIAS.map(c => c.lon.toFixed(4)).join(',');
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=precipitation_sum,precipitation_probability_max,weather_code&hourly=precipitation,precipitation_probability,weather_code&forecast_days=3&timezone=Europe%2FMadrid`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    const items = Array.isArray(data) ? data : [data];
    const resultMap = {};

    items.forEach((item, index) => {
      const concejo = CONCEJOS_ASTURIAS[index];
      if (!concejo || !item.daily) return;

      const daily = item.daily;
      const hourly = item.hourly || null;
      const days = [];

      for (let d = 0; d < 3; d++) {
        const dateStr = daily.time ? daily.time[d] : '';
        const rainMm = daily.precipitation_sum ? Math.max(0, daily.precipitation_sum[d] || 0) : 0;
        const pop = daily.precipitation_probability_max ? Math.max(0, Math.min(100, daily.precipitation_probability_max[d] || 0)) : 0;
        const code = daily.weather_code ? daily.weather_code[d] : 3;

        // Horas correspondientes a este día (24 horas)
        const dayHourlyPrecip = hourly?.precipitation ? hourly.precipitation.slice(d * 24, (d + 1) * 24) : [];
        const dayHourlyPop = hourly?.precipitation_probability ? hourly.precipitation_probability.slice(d * 24, (d + 1) * 24) : [];
        const dayHourlyCode = hourly?.weather_code ? hourly.weather_code.slice(d * 24, (d + 1) * 24) : [];

        days.push({
          dayIndex: d,
          date: dateStr,
          rainMm: parseFloat(rainMm.toFixed(1)),
          pop: Math.round(pop),
          code: code,
          badge: getRainBadge(rainMm, pop),
          hourly: {
            precip: dayHourlyPrecip,
            pop: dayHourlyPop,
            code: dayHourlyCode
          }
        });
      }

      resultMap[concejo.id] = {
        concejo,
        days
      };
    });

    concejosRainCache = resultMap;
    lastFetchTimestamp = now;
    return resultMap;
  } catch (err) {
    console.warn('[MeteoAstur] Error en lote de lluvia de concejos:', err);
    return concejosRainCache || {};
  }
}

/**
 * Insignia visual y colorimétrica según litros de lluvia y probabilidad
 */
export function getRainBadge(rainMm, pop) {
  if (rainMm <= 0.05 && pop < 45) {
    return { label: 'Seco ☀️', color: '#10b981', bg: 'rgba(16, 185, 129, 0.16)', isDry: true, level: 0 };
  }
  if (rainMm <= 0.4) {
    return { label: 'Casi Seco ⛅', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.16)', isDry: true, level: 1 };
  }
  if (rainMm <= 2.5) {
    return { label: 'Orbayu 🌦️', color: '#facc15', bg: 'rgba(250, 204, 21, 0.16)', isDry: false, level: 2 };
  }
  if (rainMm <= 9.0) {
    return { label: 'Lluvia 🌧️', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.16)', isDry: false, level: 3 };
  }
  return { label: 'Temporal ⛈️', color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.16)', isDry: false, level: 4 };
}

/**
 * Calcula las métricas de lluvia para un rango horario específico [startHour, endHour) dentro de un día.
 * startHour: 0..23 (ej. 9 para 09:00)
 * endHour: 1..24 (ej. 12 para 12:00)
 * Si el rango abarca las 24 horas completas (0 a 24) o faltan los datos horarios, devuelve los datos diarios intactos.
 */
export function getDayRangeMetrics(dayObj, startHour = 0, endHour = 24) {
  if (!dayObj) {
    return { rainMm: 0, pop: 0, badge: getRainBadge(0, 0), peakHourLabel: null };
  }

  const s = Math.max(0, Math.min(23, Number(startHour) || 0));
  const e = Math.max(s + 1, Math.min(24, Number(endHour) || 24));

  const hasHourly = dayObj.hourly && Array.isArray(dayObj.hourly.precip) && dayObj.hourly.precip.length > 0;

  // Calcular hora pico dentro del tramo [s, e) si existen datos horarios
  let peakHourLabel = null;
  if (hasHourly) {
    let maxHourPrecip = 0;
    let maxHourIdx = -1;
    for (let h = s; h < e && h < dayObj.hourly.precip.length; h++) {
      const val = dayObj.hourly.precip[h];
      if (typeof val === 'number' && val > maxHourPrecip) {
        maxHourPrecip = val;
        maxHourIdx = h;
      }
    }
    if (maxHourIdx !== -1 && maxHourPrecip >= 0.2) {
      peakHourLabel = `Pico ${String(maxHourIdx).padStart(2, '0')}h`;
    }
  }

  // Si abarca el día completo (0 a 24) o no tenemos desglose horario, devolver métricas diarias directas
  if ((s === 0 && e === 24) || !hasHourly) {
    const baseMm = dayObj.rainMm ?? 0;
    const basePop = dayObj.pop ?? 0;
    return {
      rainMm: baseMm,
      pop: basePop,
      badge: dayObj.badge || getRainBadge(baseMm, basePop),
      peakHourLabel: baseMm >= 0.2 ? peakHourLabel : null
    };
  }

  const precipSlice = dayObj.hourly.precip.slice(s, e);
  const popSlice = Array.isArray(dayObj.hourly.pop) ? dayObj.hourly.pop.slice(s, e) : [];

  let sumMm = 0;
  for (let i = 0; i < precipSlice.length; i++) {
    const v = precipSlice[i];
    if (typeof v === 'number' && v > 0) {
      sumMm += v;
    }
  }

  let maxPop = 0;
  for (let i = 0; i < popSlice.length; i++) {
    const p = popSlice[i];
    if (typeof p === 'number' && p > maxPop) {
      maxPop = p;
    }
  }

  const rangeMm = parseFloat(sumMm.toFixed(1));
  const rangePop = Math.min(100, Math.max(0, Math.round(maxPop)));

  return {
    rainMm: rangeMm,
    pop: rangePop,
    badge: getRainBadge(rangeMm, rangePop),
    peakHourLabel: rangeMm >= 0.2 ? peakHourLabel : null
  };
}

/**
 * Limpia el nombre del concejo para visualización ergonómica en móvil
 */
export function formatConcejoShortName(name) {
  if (!name) return '';
  let clean = name.split('(')[0].trim();
  if (clean.includes('/')) {
    clean = clean.split('/')[0].trim();
  }
  if (clean === 'Corvera de Asturias') clean = 'Corvera';
  if (clean === 'San Martín del Rey Aurelio') clean = 'San Martín del R.A.';
  return clean;
}

