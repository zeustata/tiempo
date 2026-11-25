/**
 * METEOASTUR LODE - Agenda Viva de Mercados y Folixas con Previsión Meteorológica Real
 * Catálogo verificado de mercados semanales asturianos y calendario de folixas/romerías
 * con consulta Open-Meteo por coordenada y franja horaria exacta.
 */

import { CONCEJOS_ASTURIAS } from '../config/concejos.js';
import { FESTIVOS_ASTURIAS_CATALOGO, isFestivoOnDate } from './festivosData.js';

const WEEKDAY_NAMES_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MONTH_SHORT_ES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

const CONCEJO_COORDS_BY_ID = new Map(CONCEJOS_ASTURIAS.map((c) => [c.id, c]));

/**
 * Mercados tradicionales semanales de Asturias verificados (horario habitual 09:00–14:00)
 * days: 0 = Domingo .. 6 = Sábado
 */
export const ASTURIAS_WEEKLY_MARKETS = [
  {
    id: 'mkt_piedras_blancas',
    name: 'Mercadillo de Piedras Blancas',
    concejoId: 'castrillon',
    town: 'Piedras Blancas (Castrillón)',
    place: 'Parking Piscinas / C/ Vallín',
    days: [3],
    hours: '09:00–14:00',
    lat: 43.5574,
    lon: -5.9752
  },
  {
    id: 'mkt_aviles',
    name: 'Mercado Semanal de Avilés',
    concejoId: 'aviles',
    town: 'Avilés',
    place: 'Plaza Hermanos Orbón y entorno',
    days: [1],
    hours: '09:00–14:00',
    lat: 43.5547,
    lon: -5.9248
  },
  {
    id: 'mkt_grado',
    name: 'Mercado Tradicional de Grau / Grado',
    concejoId: 'grado',
    town: 'Grado',
    place: 'Plazas y calles del centro',
    days: [0, 3],
    hours: '09:00–14:00',
    lat: 43.3917,
    lon: -6.0744
  },
  {
    id: 'mkt_oviedo_fontan',
    name: 'Mercado del Fontán (Oviedo)',
    concejoId: 'oviedo',
    town: 'Oviedo',
    place: 'Plaza Daoíz y Velarde / El Fontán',
    days: [0, 4, 6],
    hours: '09:00–14:30',
    lat: 43.3606,
    lon: -5.8453
  },
  {
    id: 'mkt_gijon_rastro',
    name: 'Rastro de Gijón',
    concejoId: 'gijon',
    town: 'Gijón',
    place: 'Explanada de El Molinón',
    days: [0],
    hours: '09:00–14:30',
    lat: 43.5357,
    lon: -5.6373
  },
  {
    id: 'mkt_luanco',
    name: 'Mercadillo de Luanco',
    concejoId: 'gozon',
    town: 'Luanco (Gozón)',
    place: 'C/ La Riba y C/ Madrid',
    days: [5],
    hours: '09:00–14:00',
    lat: 43.6150,
    lon: -5.7890
  },
  {
    id: 'mkt_candas',
    name: 'Mercadillo de Candás',
    concejoId: 'carreno',
    town: 'Candás (Carreño)',
    place: 'Plaza de la Baragaña',
    days: [6],
    hours: '09:00–14:00',
    lat: 43.5900,
    lon: -5.7670
  },
  {
    id: 'mkt_pravia',
    name: 'Mercado de Pravia',
    concejoId: 'pravia',
    town: 'Pravia',
    place: 'Plaza de las Almadreñas',
    days: [4],
    hours: '09:00–14:00',
    lat: 43.4908,
    lon: -6.1111
  },
  {
    id: 'mkt_villaviciosa',
    name: 'Mercado de Villaviciosa',
    concejoId: 'villaviciosa',
    town: 'Villaviciosa',
    place: 'Plaza del Ayuntamiento y casco',
    days: [3],
    hours: '09:00–14:00',
    lat: 43.4813,
    lon: -5.4357
  },
  {
    id: 'mkt_pola_siero',
    name: 'Mercado de La Pola Siero',
    concejoId: 'siero',
    town: 'Pola de Siero',
    place: 'Mercado y plaza cubierta',
    days: [2],
    hours: '09:00–14:00',
    lat: 43.3925,
    lon: -5.6606
  },
  {
    id: 'mkt_sama',
    name: 'Mercado Semanal de Sama',
    concejoId: 'langreo',
    town: 'Sama de Langreo',
    place: 'Centro urbano / Dorado',
    days: [1],
    hours: '09:00–14:00',
    lat: 43.2981,
    lon: -5.6833
  },
  {
    id: 'mkt_felguera',
    name: 'Mercadillo de La Felguera',
    concejoId: 'langreo',
    town: 'La Felguera (Langreo)',
    place: 'Zona centro y entorno parque',
    days: [6],
    hours: '09:00–14:00',
    lat: 43.3095,
    lon: -5.6915
  },
  {
    id: 'mkt_mieres',
    name: 'Mercado Dominical de Mieres',
    concejoId: 'mieres',
    town: 'Mieres',
    place: 'Entorno Plaza de Abastos',
    days: [0],
    hours: '09:00–14:00',
    lat: 43.2503,
    lon: -5.7761
  },
  {
    id: 'mkt_nava',
    name: 'Mercado de Nava',
    concejoId: 'nava',
    town: 'Nava',
    place: 'Plaza Manuel Uría',
    days: [6],
    hours: '09:00–14:00',
    lat: 43.3581,
    lon: -5.5061
  },
  {
    id: 'mkt_infiesto',
    name: 'Mercado de Infiesto',
    concejoId: 'pilona',
    town: 'Infiesto (Piloña)',
    place: 'Centro de la villa',
    days: [1],
    hours: '09:00–14:00',
    lat: 43.3478,
    lon: -5.3636
  },
  {
    id: 'mkt_cangas_onis',
    name: 'Mercado Dominical de Cangas de Onís',
    concejoId: 'cangas_de_onis',
    town: 'Cangas de Onís',
    place: 'Plaza del Mercado / Quesos de Picos',
    days: [0],
    hours: '09:00–14:00',
    lat: 43.3511,
    lon: -5.1278
  },
  {
    id: 'mkt_arriondas',
    name: 'Mercadillo de Arriondas',
    concejoId: 'parres',
    town: 'Arriondas (Parres)',
    place: 'Parque de La Llera',
    days: [6],
    hours: '09:00–14:00',
    lat: 43.3858,
    lon: -5.1844
  },
  {
    id: 'mkt_ribadesella',
    name: 'Mercado de Ribadesella',
    concejoId: 'ribadesella',
    town: 'Ribadesella',
    place: 'Centro histórico / La Atalaya',
    days: [3],
    hours: '09:00–14:00',
    lat: 43.4611,
    lon: -5.0615
  },
  {
    id: 'mkt_llanes',
    name: 'Mercado Semanal de Llanes',
    concejoId: 'llanes',
    town: 'Llanes',
    place: 'Plaza de las Barqueras / Ría',
    days: [2],
    hours: '09:00–14:00',
    lat: 43.4198,
    lon: -4.7549
  },
  {
    id: 'mkt_luarca',
    name: 'Mercado de Luarca',
    concejoId: 'valdes',
    town: 'Luarca (Valdés)',
    place: 'Paseo del Muelle / Plaza',
    days: [3],
    hours: '09:00–14:00',
    lat: 43.5422,
    lon: -6.5358
  },
  {
    id: 'mkt_navia',
    name: 'Mercado de Navia',
    concejoId: 'navia',
    town: 'Navia',
    place: 'Avda. Dársena / C/ Viejo Pancho',
    days: [4],
    hours: '09:00–14:00',
    lat: 43.5414,
    lon: -6.7214
  },
  {
    id: 'mkt_tineo',
    name: 'Mercado de Tineo',
    concejoId: 'tineo',
    town: 'Tineo',
    place: 'Avda. Conde Campomanes',
    days: [4],
    hours: '09:00–14:00',
    lat: 43.3364,
    lon: -6.4111
  },
  {
    id: 'mkt_cangas_narcea',
    name: 'Mercado de Cangas del Narcea',
    concejoId: 'cangas_del_narcea',
    town: 'Cangas del Narcea',
    place: 'Plaza Mayor y centro',
    days: [6],
    hours: '09:00–14:00',
    lat: 43.1783,
    lon: -6.5494
  },
  {
    id: 'mkt_vegadeo',
    name: 'Mercado de Vegadeo',
    concejoId: 'vegadeo',
    town: 'Vegadeo',
    place: 'Explanada Recinto Ferial',
    days: [6],
    hours: '09:00–14:00',
    lat: 43.4639,
    lon: -7.0508
  }
];

/**
 * Complemento otoño-invierno-primavera para que «Próximas Folixas» tenga cobertura todo el año
 */
const EXTRA_SEASONAL_FOLIXAS = [
  {
    id: 'san_andres_smra',
    name: 'Fiesta de San Andrés',
    concejoId: 'san_martin_rey_aurelio',
    town: 'El Entrego / L’Entregu (SMRA)',
    lat: 43.2856,
    lon: -5.6361,
    type: 'fixed',
    month: 11,
    day: 30,
    icon: '🌰',
    tag: 'Patronal & Cebolla Rellena'
  },
  {
    id: 'santa_barbara_mieres',
    name: 'Santa Bárbara (Patrona Minera)',
    concejoId: 'mieres',
    town: 'Mieres',
    lat: 43.2503,
    lon: -5.7761,
    type: 'fixed',
    month: 12,
    day: 4,
    icon: '⛏️',
    tag: 'Tradición Minera'
  },
  {
    id: 'santa_barbara_langreo',
    name: 'Santa Bárbara en Langreo',
    concejoId: 'langreo',
    town: 'Langreo',
    lat: 43.2981,
    lon: -5.6833,
    type: 'fixed',
    month: 12,
    day: 4,
    icon: '⛏️',
    tag: 'Cuenca del Nalón'
  },
  {
    id: 'mercau_navidenu_aviles',
    name: 'Mercáu Navideñu d’Avilés',
    concejoId: 'aviles',
    town: 'Avilés',
    lat: 43.5547,
    lon: -5.9248,
    type: 'fixed',
    month: 12,
    day: 6,
    icon: '🎄',
    tag: 'Puente de Diciembre'
  },
  {
    id: 'mercado_navidad_oviedo',
    name: 'Mercado de Navidad de Oviedo',
    concejoId: 'oviedo',
    town: 'Oviedo',
    lat: 43.3619,
    lon: -5.8494,
    type: 'fixed',
    month: 12,
    day: 6,
    icon: '🎄',
    tag: 'Plaza de la Catedral / Porlier'
  },
  {
    id: 'menax_navidad_gijon',
    name: 'Menax / Navidad en Xixón',
    concejoId: 'gijon',
    town: 'Gijón',
    lat: 43.5357,
    lon: -5.6615,
    type: 'fixed',
    month: 12,
    day: 6,
    icon: '🎄',
    tag: 'Paseo de Begoña / Náutico'
  },
  {
    id: 'guirria_ponga',
    name: 'El Guirria y L’Aguinaldu',
    concejoId: 'ponga',
    town: 'San Juan de Beleño (Ponga)',
    lat: 43.1908,
    lon: -5.1611,
    type: 'fixed',
    month: 1,
    day: 1,
    icon: '🎭',
    tag: 'Interés Turístico'
  },
  {
    id: 'cabalgata_oviedo',
    name: 'Cabalgata de Reyes de Oviedo',
    concejoId: 'oviedo',
    town: 'Oviedo',
    lat: 43.3619,
    lon: -5.8494,
    type: 'fixed',
    month: 1,
    day: 5,
    icon: '👑',
    tag: 'Tarde / Noche'
  },
  {
    id: 'san_anton_grado',
    name: 'Feria y Fiesta de San Antón',
    concejoId: 'grado',
    town: 'Grado',
    lat: 43.3917,
    lon: -6.0744,
    type: 'fixed',
    month: 1,
    day: 17,
    icon: '🔔',
    tag: 'Tradición Rural'
  },
  {
    id: 'candelas_candas',
    name: 'Las Candelas',
    concejoId: 'carreno',
    town: 'Candás (Carreño)',
    lat: 43.5900,
    lon: -5.7670,
    type: 'fixed',
    month: 2,
    day: 2,
    icon: '🕯️',
    tag: 'Villa Marinera'
  },
  {
    id: 'san_jose_castrillon',
    name: 'San José en Castrillón',
    concejoId: 'castrillon',
    town: 'Piedras Blancas (Castrillón)',
    lat: 43.5558,
    lon: -5.9744,
    type: 'fixed',
    month: 3,
    day: 19,
    icon: '🎉',
    tag: 'Patronal del Concejo'
  }
];

const agendaWeatherCache = new Map();
const AGENDA_CACHE_TTL_MS = 15 * 60 * 1000;

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toLocalDateIso(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDaysLocal(baseDate, days) {
  const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + days);
  return d;
}

function attachDistance(item, userLat, userLon) {
  const distKm = Math.round(haversineKm(userLat, userLon, item.lat, item.lon));
  const driveMin = distKm < 2 ? 0 : Math.max(5, Math.round((distKm / 55) * 60));
  return { ...item, distKm, driveMin };
}

/**
 * Devuelve los mercados cercanos para hoy/mañana ordenados por distancia.
 * Si ese día hay < 2 mercados en toda Asturias (p. ej. viernes solo Luanco), completa con
 * los 2 más cercanos del día siguiente etiquetados con su día de la semana.
 */
export function getMarketsForDay(concejo, activeDay = 'today', limit = 4) {
  const userLat = concejo?.lat ?? 43.5558;
  const userLon = concejo?.lon ?? -5.9744;
  const dayOffset = activeDay === 'tomorrow' ? 1 : 0;
  const now = new Date();
  const targetDate = addDaysLocal(now, dayOffset);
  const weekday = targetDate.getDay();
  const dateIso = toLocalDateIso(targetDate);
  const dayName = WEEKDAY_NAMES_ES[weekday];

  const primary = ASTURIAS_WEEKLY_MARKETS
    .filter((m) => m.days.includes(weekday))
    .map((m) => attachDistance({
      ...m,
      kind: 'market',
      dayOffset,
      weekday,
      weekdayLabel: dayOffset === 0 ? `Hoy (${dayName})` : `Mañana (${dayName})`,
      dateIso,
      isNextDayPreview: false
    }, userLat, userLon))
    .sort((a, b) => a.distKm - b.distKm);

  const items = primary.slice(0, limit);

  if (primary.length < 2) {
    const nextOffset = dayOffset + 1;
    const nextDate = addDaysLocal(now, nextOffset);
    const nextWd = nextDate.getDay();
    const nextName = WEEKDAY_NAMES_ES[nextWd];
    const nextIso = toLocalDateIso(nextDate);
    const usedIds = new Set(items.map((x) => x.id));

    const extras = ASTURIAS_WEEKLY_MARKETS
      .filter((m) => !usedIds.has(m.id) && m.days.includes(nextWd))
      .map((m) => attachDistance({
        ...m,
        id: `${m.id}_next`,
        kind: 'market',
        dayOffset: nextOffset,
        weekday: nextWd,
        weekdayLabel: `${nextName} (próximo)`,
        dateIso: nextIso,
        isNextDayPreview: true
      }, userLat, userLon))
      .sort((a, b) => a.distKm - b.distKm)
      .slice(0, Math.min(2, limit - items.length));

    items.push(...extras);
  }

  return { dayOffset, dayName, dateIso, items };
}

/**
 * Recopila todas las folixas y fiestas oficiales + calendario otoño/invierno en próximos daysAhead días
 */
export function getUpcomingFolixas(concejo, daysAhead = 21, limit = 4) {
  const userLat = concejo?.lat ?? 43.5558;
  const userLon = concejo?.lon ?? -5.9744;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const catalog = [];
  for (const [concejoId, list] of Object.entries(FESTIVOS_ASTURIAS_CATALOGO)) {
    const cInfo = CONCEJO_COORDS_BY_ID.get(concejoId);
    if (!cInfo || !Array.isArray(list)) continue;
    for (const f of list) {
      catalog.push({
        id: `${concejoId}_${f.id}`,
        name: f.name,
        concejoId,
        town: cInfo.name.replace(/\s*\(.*?\)/, '').trim(),
        lat: cInfo.lat,
        lon: cInfo.lon,
        type: f.type,
        month: f.month,
        day: f.day,
        offset: f.offset,
        icon: f.icon || '🎉',
        tag: f.tag || 'Folixa Asturiana'
      });
    }
  }
  for (const extra of EXTRA_SEASONAL_FOLIXAS) {
    catalog.push(extra);
  }

  const found = [];
  const seen = new Set();

  for (let offset = 0; offset <= daysAhead; offset++) {
    const checkDate = addDaysLocal(today, offset);
    const dateIso = toLocalDateIso(checkDate);
    const dateLabel =
      offset === 0
        ? 'Hoy'
        : offset === 1
          ? 'Mañana'
          : `${checkDate.getDate()} ${MONTH_SHORT_ES[checkDate.getMonth()]}`;

    for (const entry of catalog) {
      if (seen.has(entry.id)) continue;
      if (isFestivoOnDate(entry, checkDate)) {
        seen.add(entry.id);
        found.push(attachDistance({
          ...entry,
          kind: 'folixa',
          daysUntil: offset,
          dateIso,
          dateLabel,
          weekdayName: WEEKDAY_NAMES_ES[checkDate.getDay()]
        }, userLat, userLon));
      }
    }
  }

  found.sort((a, b) => {
    if (a.daysUntil !== b.daysUntil) return a.daysUntil - b.daysUntil;
    return a.distKm - b.distKm;
  });

  return found.slice(0, limit);
}

function buildMarketVerdict(precipMm, maxPop, maxGust) {
  if (precipMm >= 3.0) return { verdict: '🌧️ Pasado por agua', verdictTone: 'danger' };
  if (precipMm >= 0.4 || maxPop >= 55) return { verdict: '☂️ Lleva paraguas', verdictTone: 'warn' };
  if (maxGust >= 50) return { verdict: '💨 Ojo a las rachas', verdictTone: 'wind' };
  return { verdict: '☀️ Ideal para pasear', verdictTone: 'ok' };
}

function buildFolixaVerdict(precipMm, maxPop, maxGust) {
  if (precipMm >= 5.0) return { verdict: '🌧️ Lluvia prevista', verdictTone: 'danger' };
  if (precipMm >= 0.8 || maxPop >= 55) return { verdict: '☂️ Posible lluvia', verdictTone: 'warn' };
  if (maxGust >= 55) return { verdict: '💨 Viento fuerte', verdictTone: 'wind' };
  return { verdict: '☀️ Tiempo favorable', verdictTone: 'ok' };
}

function summarizeMarketMorning(payload, dateIso) {
  const hourly = payload && payload.hourly;
  if (!hourly || !Array.isArray(hourly.time)) return null;

  let minTemp = Infinity;
  let maxTemp = -Infinity;
  let precipMm = 0;
  let maxPop = 0;
  let maxGust = 0;
  let middayCode = null;
  let worstCode = 0;

  for (let i = 0; i < hourly.time.length; i++) {
    const t = hourly.time[i];
    if (!t || !t.startsWith(dateIso)) continue;
    const hr = parseInt(t.slice(11, 13), 10);
    if (hr < 9 || hr > 14) continue;

    const temp = hourly.temperature_2m?.[i];
    const p = hourly.precipitation?.[i] ?? 0;
    const pop = hourly.precipitation_probability?.[i] ?? 0;
    const g = hourly.wind_gusts_10m?.[i] ?? 0;
    const code = hourly.weather_code?.[i] ?? 0;

    if (typeof temp === 'number') {
      if (temp < minTemp) minTemp = temp;
      if (temp > maxTemp) maxTemp = temp;
    }
    precipMm += p;
    if (pop > maxPop) maxPop = pop;
    if (g > maxGust) maxGust = g;
    if (code > worstCode) worstCode = code;
    if (hr === 11 || (middayCode === null && hr >= 10)) middayCode = code;
  }

  if (!Number.isFinite(minTemp)) return null;

  precipMm = Math.round(precipMm * 10) / 10;
  const wmoCode = precipMm >= 0.4 ? Math.max(worstCode, 61) : (middayCode ?? worstCode);
  const { verdict, verdictTone } = buildMarketVerdict(precipMm, Math.round(maxPop), Math.round(maxGust));

  return {
    outOfRange: false,
    wmoCode,
    minTemp: Math.round(minTemp),
    maxTemp: Math.round(maxTemp),
    precipMm,
    maxPop: Math.round(maxPop),
    maxGust: Math.round(maxGust),
    verdict,
    verdictTone
  };
}

function summarizeFolixaDay(payload, dateIso) {
  const daily = payload && payload.daily;
  if (!daily || !Array.isArray(daily.time)) return null;
  const idx = daily.time.indexOf(dateIso);
  if (idx === -1) return { outOfRange: true };

  const wmoCode = daily.weather_code?.[idx] ?? 0;
  const minTemp = Math.round(daily.temperature_2m_min?.[idx] ?? 8);
  const maxTemp = Math.round(daily.temperature_2m_max?.[idx] ?? 15);
  const precipMm = Math.round((daily.precipitation_sum?.[idx] ?? 0) * 10) / 10;
  const maxPop = Math.round(daily.precipitation_probability_max?.[idx] ?? 0);
  const maxGust = Math.round(daily.wind_gusts_10m_max?.[idx] ?? 0);
  const { verdict, verdictTone } = buildFolixaVerdict(precipMm, maxPop, maxGust);

  return {
    outOfRange: false,
    wmoCode,
    minTemp,
    maxTemp,
    precipMm,
    maxPop,
    maxGust,
    verdict,
    verdictTone
  };
}

/**
 * Consulta Open-Meteo en una sola llamada batch para todas las coordenadas únicas de mercados y folixas.
 * Retorna Map<itemId, summary>.
 */
export async function fetchAgendaWeatherBatch(items = []) {
  const resultMap = new Map();
  if (!Array.isArray(items) || items.length === 0) return resultMap;

  const coordList = [];
  const coordKeyToIndex = new Map();
  const inRangeItems = [];

  for (const item of items) {
    if (item.kind === 'folixa' && item.daysUntil >= 10) {
      resultMap.set(item.id, { outOfRange: true });
      continue;
    }
    inRangeItems.push(item);
    const key = `${Number(item.lat).toFixed(3)},${Number(item.lon).toFixed(3)}`;
    if (!coordKeyToIndex.has(key)) {
      coordKeyToIndex.set(key, coordList.length);
      coordList.push({ lat: item.lat, lon: item.lon, key });
    }
  }

  if (coordList.length === 0) return resultMap;

  const batchKey = coordList.map((c) => c.key).join('|');
  const cached = agendaWeatherCache.get(batchKey);
  let payloads = null;

  if (cached && (Date.now() - cached.ts < AGENDA_CACHE_TTL_MS)) {
    payloads = cached.payloads;
  } else {
    const lats = coordList.map((c) => c.lat.toFixed(4)).join(',');
    const lons = coordList.map((c) => c.lon.toFixed(4)).join(',');
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}` +
      '&hourly=temperature_2m,precipitation,precipitation_probability,weather_code,wind_gusts_10m' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_gusts_10m_max' +
      '&timezone=Europe%2FMadrid&forecast_days=10';

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    try {
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      payloads = Array.isArray(json) ? json : [json];
      agendaWeatherCache.set(batchKey, { ts: Date.now(), payloads });
    } catch (err) {
      console.warn('[MeteoAstur Agenda] Error batch Open-Meteo:', err.message);
      return resultMap;
    } finally {
      clearTimeout(timer);
    }
  }

  for (const item of inRangeItems) {
    const key = `${Number(item.lat).toFixed(3)},${Number(item.lon).toFixed(3)}`;
    const idx = coordKeyToIndex.get(key);
    const payload = payloads[idx];
    if (!payload) continue;

    const summary =
      item.kind === 'market'
        ? summarizeMarketMorning(payload, item.dateIso)
        : summarizeFolixaDay(payload, item.dateIso);

    if (summary) {
      resultMap.set(item.id, summary);
    }
  }

  return resultMap;
}
