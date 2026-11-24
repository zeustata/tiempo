import { getWeatherInfo, renderWeatherIconHtml } from '../utils/weatherIcons.js?v=3.0.38.50';

let cachedResortsWeather = null;
let cachedResortsTime = 0;
const RESORTS_CACHE_TTL_MS = 10 * 60 * 1000;

/**
 * Red de puertos de montaña estratégicos de la Cordillera Cantábrica en Asturias
 * Arterias prioritarias de conexión con la meseta y pasos comarcales
 */
export const PUERTOS_MONTANA_ASTURIAS = [
  // --- ARTERIAS PRINCIPALES DE CONEXIÓN CON LA MESETA ---
  { id: 'huerna', name: 'Autopista del Huerna (AP-66)', alt: 1229, concejo: 'Lena / León', road: 'AP-66', sector: 'arterias', isArtery: true, desc: 'Vía de alta capacidad principal entre Asturias y la Meseta (Túnel del Negrón).' },
  { id: 'pajares', name: 'Puerto de Pajares (N-630)', alt: 1378, concejo: 'Lena / León', road: 'N-630', sector: 'arterias', isArtery: true, skiAccess: 'Valgrande-Pajares', desc: 'Paso histórico nacional alternativo al Huerna con fuertes pendientes.' },

  // --- SECTOR CENTRO Y VALLES MINEROS (Caudal, Aller, Quirós, Riosa) ---
  { id: 'san_isidro', name: 'Puerto de San Isidro', alt: 1520, concejo: 'Aller / León', road: 'AS-112 / LE-331', sector: 'centro', skiAccess: 'Fuentes de Invierno y San Isidro', desc: 'Acceso a Fuentes de Invierno y San Isidro.' },
  { id: 'cobertoria', name: 'Alto de la Cobertoria', alt: 1173, concejo: 'Quirós / Lena', road: 'AS-230', sector: 'centro', desc: 'Paso interior central que enlaza Quirós y Pola de Lena.' },
  { id: 'angliru', name: 'Alto del Angliru', alt: 1570, concejo: 'Riosa', road: 'RI-5', sector: 'centro', desc: 'Cima mítica ciclista de rampas extremas en la Sierra del Aramo.' },
  { id: 'ventana', name: 'Puerto de Ventana', alt: 1587, concejo: 'Teverga / León', road: 'AS-228 / LE-481', sector: 'centro', desc: 'Paso de alta montaña entre Teverga y Babia.' },

  // --- SECTOR ORIENTE Y PICOS DE EUROPA (Caso, Ponga, Cangas de Onís) ---
  { id: 'tarna', name: 'Puerto de Tarna', alt: 1490, concejo: 'Caso / León', road: 'AS-117 / CL-635', sector: 'oriente', desc: 'Paso por el Parque Natural de Redes hacia Riaño.' },
  { id: 'ponton', name: 'Puerto del Pontón / Desfiladero', alt: 1280, concejo: 'Amieva / Ponga hacia León', road: 'N-625', sector: 'oriente', desc: 'Paso por el Desfiladero de los Beyos hacia Riaño y Picos de Europa.' },
  { id: 'lagos_covadonga', name: 'Lagos de Covadonga', alt: 1134, concejo: 'Cangas de Onís', road: 'CO-4', sector: 'oriente', desc: 'Enclave icónico del Parque Nacional de Picos de Europa.' },

  // --- SECTOR OCCIDENTE (Somiedo, Narcea, Allande, Ibias) ---
  { id: 'somiedo', name: 'Puerto de Somiedo', alt: 1486, concejo: 'Somiedo / León', road: 'AS-227 / LE-495', sector: 'occidente', desc: 'Corazón del Parque Natural de Somiedo hacia Laciana.' },
  { id: 'san_lorenzo', name: 'Puerto de San Lorenzo', alt: 1349, concejo: 'Somiedo / Teverga', road: 'AS-265', sector: 'occidente', desc: 'Conexión entre valles occidentales con rampas exigentes.' },
  { id: 'leitariegos', name: 'Puerto de Leitariegos', alt: 1525, concejo: 'Cangas del Narcea / León', road: 'AS-213 / LE-497', sector: 'occidente', skiAccess: 'Leitariegos', desc: 'Acceso a la estación invernal de Leitariegos.' },
  { id: 'el_connio', name: 'Puerto del Connio', alt: 1315, concejo: 'Cangas del Narcea / Ibias', road: 'AS-348', sector: 'occidente', desc: 'Atraviesa la Reserva Integral de Muniellos.' },
  { id: 'el_palo', name: 'Puerto del Palo', alt: 1146, concejo: 'Allande / Grandas', road: 'AS-14', sector: 'occidente', desc: 'Paso clave del Camino Primitivo y el occidente asturiano.' },
  { id: 'la_marta', name: 'Puerto de la Marta', alt: 1105, concejo: 'Allande', road: 'ALL-4', sector: 'occidente', desc: 'Paso montañoso solitario y expuesto del occidente.' },
  { id: 'mujeres_muertas', name: 'Pozo de las Mujeres Muertas', alt: 1117, concejo: 'Allande / Ibias', road: 'AS-29', sector: 'occidente', desc: 'Conexión de la cuenca del Navia hacia San Antolín de Ibias.' }
];

/**
 * Fichas de Estaciones de Esquí de Asturias y limítrofes
 * Formato Snow-Forecast con cotas Cumbre, Media y Base
 */
export const ESTACIONES_ESQUI = [
  {
    id: 'pajares',
    name: 'Valgrande-Pajares',
    shortName: 'Pajares',
    concejo: 'Lena (Asturias)',
    lat: 42.9928,
    lon: -5.7633,
    baseAlt: 1480,
    midAlt: 1680,
    topAlt: 1890,
    summitName: 'Celleros / Cueto Negro',
    pistasKm: '21.5 km',
    kmTotalNum: 21.5,
    pistasCount: 38,
    remontesCount: 8,
    snowpark: true,
    web: 'https://www.valgrande-pajares.com',
    parteOficialUrl: 'https://www.deporteasturiano.org/estaciones-invernales/valgrande-pajares/',
    desc: 'La decana del esquí en la cordillera cantábrica. Cuenta con la nueva telecabina Cuitu Negru y vertientes orientadas al norte y este.',
    pistasDesglose: { verdes: 9, azules: 10, rojas: 15, negras: 4 },
    defaultStatus: {
      temporada: 'pretemporada', // 'abierta' | 'cerrada' | 'pretemporada'
      kmEsquiables: 0,
      pistasAbiertas: 0,
      remontesAbiertos: 0,
      espesorMin: 0,
      espesorMax: 0
    }
  },
  {
    id: 'fuentes',
    name: 'Fuentes de Invierno',
    shortName: 'Fuentes',
    concejo: 'Aller (Asturias)',
    lat: 43.0642,
    lon: -5.3942,
    baseAlt: 1500,
    midAlt: 1720,
    topAlt: 1950,
    summitName: 'Picu Entresiegu',
    pistasKm: '8.7 km',
    kmTotalNum: 8.7,
    pistasCount: 15,
    remontesCount: 5,
    snowpark: false,
    web: 'https://www.fuentesdeinvierno.com',
    parteOficialUrl: 'https://www.deporteasturiano.org/estaciones-invernales/fuentes-de-invierno/',
    desc: 'Estación moderna y acogedora en el concejo de Aller, con nieve polvo de altísima calidad por su orientación sombría.',
    pistasDesglose: { verdes: 3, azules: 3, rojas: 6, negras: 3 },
    defaultStatus: {
      temporada: 'pretemporada',
      kmEsquiables: 0,
      pistasAbiertas: 0,
      remontesAbiertos: 0,
      espesorMin: 0,
      espesorMax: 0
    }
  },
  {
    id: 'san_isidro',
    name: 'San Isidro (Puebla de Lillo)',
    shortName: 'San Isidro',
    concejo: 'Aller / León (Frontera)',
    lat: 43.0636,
    lon: -5.3740,
    baseAlt: 1500,
    midAlt: 1800,
    topAlt: 2100,
    summitName: 'Pico Requejines',
    pistasKm: '34.0 km',
    kmTotalNum: 34.0,
    pistasCount: 35,
    remontesCount: 15,
    snowpark: true,
    web: 'https://www.san-isidro.net',
    parteOficialUrl: 'https://www.san-isidro.net/parte-de-nieve',
    desc: 'La mayor estación de la cordillera cantábrica, pegada a Fuentes de Invierno. Dividida en 4 sectores: Cebolledo, Riopinos, Requejines y Salencias.',
    pistasDesglose: { verdes: 5, azules: 9, rojas: 14, negras: 4, itinerarios: 3 },
    defaultStatus: {
      temporada: 'pretemporada',
      kmEsquiables: 0,
      pistasAbiertas: 0,
      remontesAbiertos: 0,
      espesorMin: 0,
      espesorMax: 0
    }
  },
  {
    id: 'leitariegos',
    name: 'Leitariegos (Valle de Laciana)',
    shortName: 'Leitariegos',
    concejo: 'Cangas del Narcea / León',
    lat: 42.9990,
    lon: -6.4170,
    baseAlt: 1525,
    midAlt: 1660,
    topAlt: 1800,
    summitName: 'Cueto de Arbás',
    pistasKm: '8.0 km',
    kmTotalNum: 8.0,
    pistasCount: 13,
    remontesCount: 6,
    snowpark: true,
    web: 'https://www.nieveleitariegos.com',
    parteOficialUrl: 'https://www.nieveleitariegos.com/parte-de-nieve',
    desc: 'Estación familiar del occidente al pie del Cueto de Arbás, rodeada de bosques de abedules y pistas muy resguardadas.',
    pistasDesglose: { verdes: 6, azules: 4, rojas: 2, negras: 0, itinerarios: 1 },
    defaultStatus: {
      temporada: 'pretemporada',
      kmEsquiables: 0,
      pistasAbiertas: 0,
      remontesAbiertos: 0,
      espesorMin: 0,
      espesorMax: 0
    }
  }
];

/**
 * Consulta meteorológica independiente (bajo demanda al abrir Cordillera & Nieve)
 * para las 4 estaciones de esquí en una única petición batch multi-coordenada.
 */
export async function fetchMountainResortsWeather() {
  if (cachedResortsWeather && (Date.now() - cachedResortsTime < RESORTS_CACHE_TTL_MS)) {
    return cachedResortsWeather;
  }

  try {
    const lats = ESTACIONES_ESQUI.map(r => r.lat).join(',');
    const lons = ESTACIONES_ESQUI.map(r => r.lon).join(',');
    const elevs = ESTACIONES_ESQUI.map(r => r.midAlt).join(',');

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&elevation=${elevs}` +
      `&current=temperature_2m,relative_humidity_2m,is_day,precipitation,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,direct_normal_irradiance,shortwave_radiation` +
      `&hourly=temperature_2m,precipitation,snowfall,weather_code,wind_speed_10m,freezing_level_height,cloud_cover` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max` +
      `&forecast_days=7&timezone=Europe%2FMadrid`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;

    const payload = await res.json();
    const list = Array.isArray(payload) ? payload : [payload];
    if (list.length < ESTACIONES_ESQUI.length) return null;

    const map = {};
    ESTACIONES_ESQUI.forEach((resort, idx) => {
      if (list[idx] && list[idx].current) {
        map[resort.id] = list[idx];
      }
    });

    if (Object.keys(map).length === 0) return null;
    cachedResortsWeather = map;
    cachedResortsTime = Date.now();
    return map;
  } catch (err) {
    console.warn('[MeteoAstur] Mountain batch weather fallback:', err.message);
    return cachedResortsWeather || null;
  }
}

/**
 * Resuelve la fase física real de precipitación en pistas (Nieve / Aguanieve / Lluvia)
 * evitando contradicciones térmicas (mostrar lluvia bajo cero).
 */
export function resolveSkiWeatherCode(rawCode, precip = 0, snowCm = 0, tempAtMid = 5, flH = 2000, midAlt = 1700) {
  const code = rawCode != null ? rawCode : 3;
  const p = precip != null ? Math.max(0, parseFloat(precip)) : 0;
  const s = snowCm != null ? Math.max(0, parseFloat(snowCm)) : 0;
  const isPrecipCode = (code >= 51 && code <= 86) || code >= 95;
  const hasPrecip = s > 0.05 || p >= 0.1 || isPrecipCode;

  if (!hasPrecip) {
    return { code, isSnow: false, isSleet: false, effectiveSnowCm: 0 };
  }

  const isSnowPhase = s > 0.05 || tempAtMid <= 1.0 || flH <= midAlt + 100;
  if (isSnowPhase) {
    const isHeavy = s >= 1.5 || p >= 2.5 || code === 75 || code === 86 || code === 65 || code === 82;
    const isMod = s >= 0.4 || p >= 0.8 || code === 73 || code === 63 || code === 81;
    const snowCode = isHeavy ? 75 : (isMod ? 73 : 71);
    const effectiveSnowCm = s > 0.05 ? s : (p >= 0.1 ? p : (isHeavy ? 1.5 : (isMod ? 0.6 : 0.2)));
    return { code: snowCode, isSnow: true, isSleet: false, effectiveSnowCm };
  }

  const isSleetPhase = tempAtMid <= 2.2 || flH <= midAlt + 220;
  if (isSleetPhase) {
    return { code: 68, isSnow: false, isSleet: true, effectiveSnowCm: 0 };
  }

  return { code, isSnow: false, isSleet: false, effectiveSnowCm: 0 };
}

/**
 * Calcula la Sensación Térmica (Wind Chill) según la fórmula oficial de la NOAA / JAG/TI
 * WindChill = 13.12 + 0.6215 * T - 11.37 * (V^0.16) + 0.3965 * T * (V^0.16)
 */
export function calculateWindChill(tempC, windSpeedKmH) {
  const t = parseFloat(tempC);
  const v = parseFloat(windSpeedKmH);
  if (t <= 10 && v >= 4.8) {
    const vPow = Math.pow(v, 0.16);
    const wc = 13.12 + (0.6215 * t) - (11.37 * vPow) + (0.3965 * t * vPow);
    return Math.round(wc);
  }
  return Math.round(t);
}

/**
 * Genera la flecha vectorial de viento para cumbres y pistas
 */
export function getMountainWindArrowSvg(deg, color = '#38bdf8', size = 13) {
  const rotation = Math.round((deg + 180) % 360);
  return `<svg class="mountain-wind-arrow" style="transform: rotate(${rotation}deg); display: inline-block; vertical-align: middle; flex-shrink: 0;" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" title="Viento soplando hacia el ${(deg + 180) % 360}°">
    <path d="M12 2L5 13h4.5v9h5v-9H19L12 2z" fill="${color}"/>
  </svg>`;
}

/**
 * Evalúa el semáforo de seguridad de remontes y telesillas según el viento en cumbre
 */
export function evaluateLiftSafety(summitWindKmH) {
  const w = Math.round(summitWindKmH || 0);
  if (w >= 52) {
    return {
      status: 'Riesgo Cierre Remontes',
      badgeClass: 'lift-danger',
      icon: '🔴',
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.15)',
      desc: 'Viento fuerte en crestas y cuerdas altas (≥ 50 km/h). Posible paralización de telesillas por seguridad.'
    };
  }
  if (w >= 36) {
    return {
      status: 'Precaución por Viento',
      badgeClass: 'lift-caution',
      icon: '🟡',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.15)',
      desc: 'Rachas moderadas a fuertes (35-50 km/h). Telesillas de cota alta pueden operar a velocidad reducida.'
    };
  }
  return {
    status: 'Remontes Operativos',
    badgeClass: 'lift-ok',
    icon: '🟢',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.15)',
    desc: 'Viento noble y seguro (< 35 km/h). Condiciones favorables para la operación normal de remontes.'
  };
}

/**
 * Clasifica la calidad de la nieve en pista estilo Snow-Forecast
 */
export function evaluateSnowQuality(tempC, windSpeedKmH, isSnowing, freezingLevel, alt) {
  const t = parseFloat(tempC);
  const w = parseFloat(windSpeedKmH);

  if (w >= 45 && (isSnowing || t <= -1)) {
    return {
      type: 'ventisca',
      icon: '⚠️',
      label: 'Ventisca / Whiteout',
      color: '#f43f5e',
      desc: 'Nieve venteada con fuerte racha. Visibilidad comprometida en zonas altas.'
    };
  }
  if (t <= -2 && (isSnowing || freezingLevel <= alt - 100)) {
    return {
      type: 'polvo',
      icon: '❄️',
      label: 'Nieve Polvo (Powder)',
      color: '#38bdf8',
      desc: 'Frío seco y nieve ligera y suelta. Calidad óptima para deslizar.'
    };
  }
  if (t > -2 && t <= 1.5) {
    return {
      type: 'dura',
      icon: '🎿',
      label: 'Nieve Pisada / Dura',
      color: '#a78bfa',
      desc: 'Firme compacto y rápido por helada nocturna. Buen agarre de cantos.'
    };
  }
  if (t > 1.5) {
    return {
      type: 'primavera',
      icon: '💧',
      label: 'Nieve Primavera / Húmeda',
      color: '#fbbf24',
      desc: 'Nieve húmeda y pesada que se ablanda con las temperaturas diurnas.'
    };
  }
  return {
    type: 'estable',
    icon: '⛷️',
    label: 'Nieve Firme',
    color: '#38bdf8',
    desc: 'Buenas condiciones generales de manto nival en pista.'
  };
}

/**
 * Genera el Bloque Visual Ergonómico de Parte de Nieve y Estado de Pistas
 * Cumple la Ley 11 (Anti-desborde) y la Ley 12 (Simulacro ?test=esqui o ?test=pistas)
 */
export function renderSkiResortSnowReport(resort, snowReport = null) {
  // Comprobación de simulacro controlado (Ley 12)
  const urlParams = new URLSearchParams(window.location.search);
  const isTestEsqui = urlParams.get('test') === 'esqui' || urlParams.get('test') === 'pistas' || urlParams.get('test') === 'nieve_abierta';

  // Datos reales consolidados por el bot automatizado
  const live = (snowReport && snowReport.stations && snowReport.stations[resort.id]) || null;

  // Estado abierto/cerrado (el simulacro de prueba tiene soberanía si está activo)
  const isAbierta = isTestEsqui || (live && live.abierta);
  
  // Cálculo de valores según estado
  const kmEsquiables = isTestEsqui 
    ? (resort.kmTotalNum * 0.72).toFixed(1) 
    : (live ? live.kmEsquiables.toFixed(1) : '0.0');
    
  const kmTotales = live && live.kmTotales > 0 
    ? live.kmTotales.toFixed(1) 
    : resort.kmTotalNum.toFixed(1);
    
  const porcentaje = isAbierta 
    ? Math.min(100, Math.round((parseFloat(kmEsquiables) / (parseFloat(kmTotales) || 1)) * 100)) 
    : 0;
  
  const pistasAbiertas = isTestEsqui 
    ? Math.round(resort.pistasCount * 0.70) 
    : (live ? live.pistasAbiertas : 0);
    
  const pistasTotales = live && live.pistasTotales > 0 
    ? live.pistasTotales 
    : resort.pistasCount;
    
  const remontesAbiertos = isTestEsqui 
    ? Math.max(1, Math.round(resort.remontesCount * 0.75)) 
    : (live ? live.remontesAbiertos : 0);
    
  const remontesTotales = live && live.remontesTotales > 0 
    ? live.remontesTotales 
    : resort.remontesCount;
    
  const espesorMin = isTestEsqui ? 25 : (live ? live.espesorMin : 0);
  const espesorMax = isTestEsqui ? 75 : (live ? live.espesorMax : 0);

  const fechaActualizacion = live && live.fechaActualizacion ? live.fechaActualizacion : '';
  const updatedAtRaw = (snowReport && snowReport.updatedAt) ? snowReport.updatedAt : null;
  let horaVerificada = '';
  if (updatedAtRaw) {
    const updDate = new Date(updatedAtRaw);
    if (!isNaN(updDate.getTime())) {
      horaVerificada = updDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + ' h';
    }
  }
  const calidadNieve = live && live.calidadNieve && live.calidadNieve !== 'Sin especificar' ? live.calidadNieve : null;

  const d = resort.pistasDesglose || { verdes: 0, azules: 0, rojas: 0, negras: 0 };
  const lp = (live && live.pistasDesglose) || null;

  const verdesAbiertas = isTestEsqui ? Math.max(1, Math.round(d.verdes * 0.8)) : (lp ? lp.verdes : 0);
  const verdesTotales = (lp && lp.verdesTotales > 0) ? lp.verdesTotales : d.verdes;

  const azulesAbiertas = isTestEsqui ? Math.max(1, Math.round(d.azules * 0.75)) : (lp ? lp.azules : 0);
  const azulesTotales = (lp && lp.azulesTotales > 0) ? lp.azulesTotales : d.azules;

  const rojasAbiertas = isTestEsqui ? Math.max(1, Math.round(d.rojas * 0.6)) : (lp ? lp.rojas : 0);
  const rojasTotales = (lp && lp.rojasTotales > 0) ? lp.rojasTotales : d.rojas;

  const negrasAbiertas = isTestEsqui ? Math.max(1, Math.round(d.negras * 0.5)) : (lp ? lp.negras : 0);
  const negrasTotales = (lp && lp.negrasTotales > 0) ? lp.negrasTotales : d.negras;

  return `
    <div class="resort-snow-report-block">
      <div class="resort-report-top">
        <div class="resort-report-heading">
          <span class="report-badge-title">🎿 Parte de Nieve & Pistas</span>
          <span class="report-update-tag">${isAbierta ? '🟢 Temporada Invernal' : '🍂 Fuera de Temporada / Pretemporada'}${fechaActualizacion ? ' • ' + fechaActualizacion : ''}${horaVerificada ? ' (' + horaVerificada + ')' : ''}</span>
        </div>
        <div class="resort-open-badge ${isAbierta ? 'badge-open' : 'badge-closed'}">
          ${isAbierta ? '⛷️ Estación Abierta' : '🔴 Cerrada'}
        </div>
      </div>

      <!-- Métricas Principales de Kilómetros y Remontes -->
      <div class="resort-km-metric-card">
        <div class="resort-km-main-row">
          <div class="resort-km-info">
            <span class="km-label">Dominio Esquiable</span>
            <div class="km-numbers">
              <span class="km-open-val">${kmEsquiables}</span>
              <span class="km-total-val">/ ${kmTotales} km</span>
            </div>
          </div>
          <div class="resort-pct-circle" style="--pct: ${porcentaje}%;">
            <span class="pct-val">${porcentaje}%</span>
            <span class="pct-sub">abierto</span>
          </div>
        </div>

        <!-- Barra de Progreso Visual de Km Esquiables -->
        <div class="resort-km-progress-bar">
          <div class="resort-km-progress-fill" style="width: ${porcentaje}%;"></div>
        </div>

        <div class="resort-quick-pills-row">
          <div class="quick-stat-pill">
            <span class="qs-icon">🎿</span>
            <span class="qs-label">Pistas:</span>
            <span class="qs-val"><strong>${pistasAbiertas}</strong>/${pistasTotales}</span>
          </div>
          <div class="quick-stat-pill">
            <span class="qs-icon">🚠</span>
            <span class="qs-label">Remontes:</span>
            <span class="qs-val"><strong>${remontesAbiertos}</strong>/${remontesTotales}</span>
          </div>
          <div class="quick-stat-pill">
            <span class="qs-icon">📏</span>
            <span class="qs-label">Espesor:</span>
            <span class="qs-val"><strong>${espesorMin}-${espesorMax}</strong> cm</span>
          </div>
          ${calidadNieve && isAbierta ? `
          <div class="quick-stat-pill">
            <span class="qs-icon">❄️</span>
            <span class="qs-label">Nieve:</span>
            <span class="qs-val"><strong>${calidadNieve}</strong></span>
          </div>` : ''}
        </div>
      </div>

      <!-- Desglose de Pistas por Colores de Dificultad -->
      <div class="resort-slopes-breakdown">
        <span class="slopes-breakdown-title">Desglose de Pistas por Dificultad:</span>
        <div class="slopes-pills-grid">
          <div class="slope-pill slope-green" title="Pistas Verdes (Muy fáciles / Iniciación)">
            <span class="slope-dot">🟢</span>
            <span class="slope-name">Verdes</span>
            <span class="slope-count"><strong>${verdesAbiertas}</strong>/${verdesTotales}</span>
          </div>
          <div class="slope-pill slope-blue" title="Pistas Azules (Fáciles)">
            <span class="slope-dot">🔵</span>
            <span class="slope-name">Azules</span>
            <span class="slope-count"><strong>${azulesAbiertas}</strong>/${azulesTotales}</span>
          </div>
          <div class="slope-pill slope-red" title="Pistas Rojas (Difíciles)">
            <span class="slope-dot">🔴</span>
            <span class="slope-name">Rojas</span>
            <span class="slope-count"><strong>${rojasAbiertas}</strong>/${rojasTotales}</span>
          </div>
          <div class="slope-pill slope-black" title="Pistas Negras (Muy difíciles / Expertos)">
            <span class="slope-dot">⚫</span>
            <span class="slope-name">Negras</span>
            <span class="slope-count"><strong>${negrasAbiertas}</strong>/${negrasTotales}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Evalúa el peligro de aludes en la Cordillera según la escala europea EAWS (1 a 5)
 */
export function evaluateAvalancheRisk(snowfallSumToday, windSpeedKmH, freezingLevel) {
  const snow = parseFloat(snowfallSumToday) || 0;
  const wind = parseFloat(windSpeedKmH) || 0;

  if (snow >= 25 || (snow >= 15 && wind >= 50)) {
    return {
      level: 4,
      name: 'Fuerte',
      icon: '🔴',
      color: '#ef4444',
      desc: 'Manto nival débilmente estabilizado en la mayoría de laderas. Salidas fuera de pista altamente desaconsejadas.'
    };
  }
  if (snow >= 10 || (snow >= 5 && wind >= 35)) {
    return {
      level: 3,
      name: 'Notable',
      icon: '🟠',
      color: '#f97316',
      desc: 'Inestabilidad en pendientes empinadas por sobrecarga de nieve reciente y placas de viento.'
    };
  }
  if (snow > 0 || freezingLevel <= 1400) {
    return {
      level: 2,
      name: 'Limitado',
      icon: '🟡',
      color: '#eab308',
      desc: 'Manto moderadamente consolidado. Precaución en laderas pronunciadas umbrías.'
    };
  }
  return {
    level: 1,
    name: 'Débil',
    icon: '🟢',
    color: '#10b981',
    desc: 'Manto nival bien estabilizado en general. Condiciones seguras en montaña.'
  };
}

/**
 * Evalúa el estado de un puerto de montaña según la cota de nieve y precipitación
 */
export function evaluatePassStatus(passAlt, freezingLevel, snowAccumToday, precipNow, skiAccess = null) {
  const alt = parseInt(passAlt, 10);
  let fl = parseInt(freezingLevel, 10);
  let snow = parseFloat(snowAccumToday) || 0;
  let isPrecip = parseFloat(precipNow) > 0;

  // Doctrina de Simulacro Ley 12: Simulación controlada de temporal de nieve en puertos
  const urlParams = new URLSearchParams(window.location.search);
  const isTestChains = urlParams.get('test') === 'cadenas' || urlParams.get('test') === 'puertos_nieve' || urlParams.get('test') === 'temporal_nieve';
  const isTestCaution = urlParams.get('test') === 'precaucion_puertos' || urlParams.get('test') === 'hielo';

  if (isTestChains) {
    fl = 1100; // Cota baja simulada
    snow = 12.0; // Nevada copiosa
    isPrecip = true;
  } else if (isTestCaution) {
    fl = 1400;
    snow = 2.0;
    isPrecip = true;
  }

  // Diagnóstico vial de acceso a estación de esquí
  let skiAccessStatus = null;
  if (skiAccess) {
    if (fl <= alt - 150 && snow >= 6) {
      skiAccessStatus = {
        icon: '⛓️',
        label: `Acceso a ${skiAccess}: Cadenas obligatorias estimadas`,
        color: '#ef4444'
      };
    } else if (fl <= alt && (snow > 0 || isPrecip)) {
      skiAccessStatus = {
        icon: '⚠️',
        label: `Acceso a ${skiAccess}: Precaución estimada (Nieve/Hielo)`,
        color: '#f59e0b'
      };
    } else if (fl <= alt + 150) {
      skiAccessStatus = {
        icon: '❄️',
        label: `Acceso a ${skiAccess}: Precaución por heladas nocturnas`,
        color: '#38bdf8'
      };
    } else {
      skiAccessStatus = {
        icon: '🎿',
        label: `Acceso a ${skiAccess}: Calzada estimada despejada`,
        color: '#10b981'
      };
    }
  }

  if (fl <= alt - 150 && snow >= 6) {
    return {
      status: 'Cadenas Estimadas',
      statusClass: 'status-chains',
      icon: '⛓️',
      color: '#ef4444',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      border: 'rgba(239, 68, 68, 0.4)',
      skiAccessStatus
    };
  }
  if (fl <= alt && (snow > 0 || isPrecip)) {
    return {
      status: 'Precaución Estimada',
      statusClass: 'status-caution',
      icon: '🟡',
      color: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      border: 'rgba(245, 158, 11, 0.4)',
      skiAccessStatus
    };
  }
  if (fl <= alt + 150) {
    return {
      status: 'Riesgo Heladas',
      statusClass: 'status-frost',
      icon: '❄️',
      color: '#38bdf8',
      badgeBg: 'rgba(56, 189, 248, 0.15)',
      border: 'rgba(56, 189, 248, 0.4)',
      skiAccessStatus
    };
  }
  return {
    status: 'Tráfico Estimado Normal',
    statusClass: 'status-ok',
    icon: '🟢',
    color: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.4)',
    skiAccessStatus
  };
}

/**
 * Renderiza el módulo completo de Cordillera, Esquí & Puertos
 * Arquitectura Dual: Estaciones de Esquí (Snow-Forecast) & Red de Puertos de Montaña
 */
export function renderMountainCard(data, concejo, iconTheme = 'astur', resortsWeatherMap = null, selectedResortId = null, selectedMountainTab = 'ski') {
  const current = data.weather.current;
  const hourly = data.weather.hourly;
  const daily = data.weather.daily;

  const currentHour = new Date().getHours();
  const fallbackFreezingLevel = hourly.freezing_level_height ? Math.round(hourly.freezing_level_height[currentHour] || 1900) : 1900;
  const fallbackSnowToday = daily.snowfall_sum && daily.snowfall_sum[0] != null ? daily.snowfall_sum[0].toFixed(1) : '0.0';

  // Viento actual de respaldo (concejo activo si aún no llegó la consulta de Cordillera)
  const fallbackWindSpeed = Math.round(current.wind_speed_10m || 0);
  const fallbackWindDeg = current.wind_direction_10m !== undefined ? current.wind_direction_10m : 180;

  // Gradiente térmico vertical (~0.65°C cada 100m)
  const lapseRate = 0.0065;
  const activeTabMode = selectedMountainTab === 'passes' ? 'passes' : 'ski';
  let activeResortIdx = selectedResortId ? ESTACIONES_ESQUI.findIndex(r => r.id === selectedResortId) : 0;
  if (activeResortIdx < 0) activeResortIdx = 0;

  // Procesar estado independiente de cada una de las 4 estaciones de esquí
  const resortsData = ESTACIONES_ESQUI.map(resort => {
    const rW = resortsWeatherMap && resortsWeatherMap[resort.id] ? resortsWeatherMap[resort.id] : null;
    const rCurrent = rW ? rW.current : current;
    const rHourly = rW ? rW.hourly : hourly;
    const rDaily = rW ? rW.daily : daily;
    const refAlt = rW ? resort.midAlt : (concejo.altitude || 0);

    const rFreezingLevel = (rHourly && rHourly.freezing_level_height && rHourly.freezing_level_height[currentHour] != null)
      ? Math.round(rHourly.freezing_level_height[currentHour])
      : fallbackFreezingLevel;
    const rWindDeg = rCurrent.wind_direction_10m !== undefined ? rCurrent.wind_direction_10m : fallbackWindDeg;
    const rWindBase = Math.round(rCurrent.wind_speed_10m || fallbackWindSpeed);
    const rSnowToday = (rDaily && rDaily.snowfall_sum && rDaily.snowfall_sum[0] != null)
      ? rDaily.snowfall_sum[0].toFixed(1)
      : fallbackSnowToday;

    const curSnowLive = rCurrent.snowfall != null ? parseFloat(rCurrent.snowfall) : 0;
    const curPrecipLive = rCurrent.precipitation != null ? parseFloat(rCurrent.precipitation) : 0;
    const hasCurrentPrecip = curSnowLive > 0 || curPrecipLive >= 0.1;

    // 1. COTA CUMBRE (TOP)
    const topTemp = (rCurrent.temperature_2m - (resort.topAlt - refAlt) * lapseRate).toFixed(1);
    const topWind = rW ? Math.round(rWindBase * 1.25) : Math.round(rWindBase * 1.55);
    const topWindChill = calculateWindChill(topTemp, topWind);
    const topIsSnowing = hasCurrentPrecip && (rFreezingLevel <= resort.topAlt + 80 || curSnowLive > 0 || parseFloat(topTemp) <= 1.0);
    const topQuality = evaluateSnowQuality(topTemp, topWind, topIsSnowing, rFreezingLevel, resort.topAlt);
    const liftSafety = evaluateLiftSafety(topWind);

    // 2. COTA MEDIA (MID)
    const midTemp = (rCurrent.temperature_2m - (resort.midAlt - refAlt) * lapseRate).toFixed(1);
    const midWind = rW ? rWindBase : Math.round(rWindBase * 1.25);
    const midWindChill = calculateWindChill(midTemp, midWind);
    const midIsSnowing = hasCurrentPrecip && (rFreezingLevel <= resort.midAlt + 80 || curSnowLive > 0 || parseFloat(midTemp) <= 1.0);
    const midQuality = evaluateSnowQuality(midTemp, midWind, midIsSnowing, rFreezingLevel, resort.midAlt);

    // 3. COTA BASE (BOTTOM)
    const baseTemp = (rCurrent.temperature_2m - (resort.baseAlt - refAlt) * lapseRate).toFixed(1);
    const baseWind = rW ? Math.round(rWindBase * 0.85) : Math.round(rWindBase * 1.0);
    const baseWindChill = calculateWindChill(baseTemp, baseWind);
    const baseIsSnowing = hasCurrentPrecip && (rFreezingLevel <= resort.baseAlt + 50 || curSnowLive > 0 || parseFloat(baseTemp) <= 1.0);
    const basePrecipType = baseIsSnowing ? '❄️ Nieve' : (curPrecipLive >= 0.1 ? '🌧️ Lluvia en Base' : 'Sin Precip.');

    // Nieve prevista para esta estación hoy
    const resortSnowToday = (rW || rFreezingLevel <= resort.topAlt) ? rSnowToday : '0.0';

    // TIEMPO ACTUAL EN PISTAS (Cota Media de la Estación)
    let currentSky = { icon: '⛅', label: 'Variable', weatherInfo: null };
    if (topIsSnowing || midIsSnowing) {
      currentSky = { icon: '❄️', label: 'Nevando', weatherInfo: getWeatherInfo(73, rCurrent.is_day ?? 1, 1) };
    } else if (curPrecipLive >= 0.1) {
      const curResolved = resolveSkiWeatherCode(rCurrent.weather_code, curPrecipLive, curSnowLive, parseFloat(midTemp), rFreezingLevel, resort.midAlt);
      const curInfo = getWeatherInfo(curResolved.code, rCurrent.is_day ?? 1, curPrecipLive);
      currentSky = { icon: curInfo.icon, label: curInfo.label.split('/')[0].trim(), weatherInfo: curInfo };
    } else {
      const liveInfo = getWeatherInfo(rCurrent.weather_code, rCurrent.is_day ?? 1, rCurrent.precipitation, null, rCurrent.direct_normal_irradiance, rCurrent.uv_index, rCurrent.shortwave_radiation, rCurrent.cloud_cover, rCurrent.relative_humidity_2m);
      currentSky = {
        icon: liveInfo.icon,
        label: liveInfo.label.split('/')[0].trim(),
        weatherInfo: liveInfo
      };
    }

    // PREVISIÓN A 7 DÍAS EN LA ESTACIÓN (Hoy a 7 días) CON DESGLOSE MAÑANA / TARDE
    const today = new Date();
    const forecastDaysCount = Math.min(7, (rDaily.time && rDaily.time.length) || 7);

    // Función auxiliar para extraer métricas reales de tramos de esquí (Mañana 09-13h vs Tarde 13-17h) y nieve fría 24h
    const getSkiDaypartMetrics = (dayDateStr) => {
      if (!rHourly || !rHourly.time) return null;
      const morningItems = [];
      const afternoonItems = [];
      let coldSnow24h = 0;

      for (let i = 0; i < rHourly.time.length; i++) {
        const tStr = rHourly.time[i];
        if (tStr.startsWith(dayDateStr)) {
          const parts = tStr.split('T');
          const h = parts[1] ? parseInt(parts[1].split(':')[0], 10) : new Date(tStr).getHours();
          const wRaw = (rHourly.wind_speed_10m && rHourly.wind_speed_10m[i] != null) ? rHourly.wind_speed_10m[i] : 15;
          const w = rW ? wRaw : wRaw * 1.3;
          const s = (rHourly.snowfall && rHourly.snowfall[i] != null) ? rHourly.snowfall[i] : 0;
          const p = (rHourly.precipitation && rHourly.precipitation[i] != null) ? rHourly.precipitation[i] : 0;
          const rawC = (rHourly.weather_code && rHourly.weather_code[i] != null) ? rHourly.weather_code[i] : 3;
          const rawT = (rHourly.temperature_2m && rHourly.temperature_2m[i] != null) ? rHourly.temperature_2m[i] : rCurrent.temperature_2m;
          const tMid = rawT - (resort.midAlt - refAlt) * lapseRate;
          const flH = (rHourly.freezing_level_height && rHourly.freezing_level_height[i] != null) ? rHourly.freezing_level_height[i] : rFreezingLevel;

          const resolved = resolveSkiWeatherCode(rawC, p, s, tMid, flH, resort.midAlt);
          coldSnow24h += resolved.effectiveSnowCm;

          const slot = { ...resolved, wind: w, rawPrecip: p, snowCm: s };
          if (h >= 9 && h < 13) {
            morningItems.push(slot);
          } else if (h >= 13 && h <= 17) {
            afternoonItems.push(slot);
          }
        }
      }

      if (morningItems.length === 0 && afternoonItems.length === 0) return { morning: null, afternoon: null, isShiftRisk: false, coldSnow24h };

      const calcPart = (items) => {
        if (items.length === 0) {
          const defInfo = getWeatherInfo(2, 1, 0);
          return { icon: '⛅', weatherInfo: defInfo, wind: 15, snow: '0.0', isSnow: false, isSleet: false, isGale: false, isBlizzard: false, label: 'Variable' };
        }
        const maxWind = Math.round(Math.max(...items.map(it => it.wind)));
        const snowTotal = items.reduce((acc, it) => acc + it.effectiveSnowCm, 0);
        const hasSnow = items.some(it => it.isSnow) || snowTotal > 0.05;
        const hasSleet = !hasSnow && items.some(it => it.isSleet);

        let info;
        if (hasSnow) {
          const heavySnow = items.some(it => it.code === 75) || snowTotal >= 2.0;
          info = getWeatherInfo(heavySnow ? 75 : 73, 1, 1);
        } else if (hasSleet) {
          info = getWeatherInfo(68, 1, 0.6);
        } else {
          const precipSlot = items.find(it => (it.code >= 51 && it.code <= 86) || it.code >= 95 || it.rawPrecip >= 0.1);
          const midItem = items[Math.floor(items.length / 2)];
          const chosenCode = precipSlot ? precipSlot.code : midItem.code;
          const maxP = Math.max(...items.map(it => it.rawPrecip), 0);
          info = getWeatherInfo(chosenCode, 1, precipSlot ? Math.max(maxP, 0.2) : 0);
        }

        const isGale = maxWind >= 50;
        const isBlizzard = hasSnow && maxWind >= 45;
        const icon = isBlizzard ? '❄️💨' : (hasSnow ? '🌨️' : info.icon);
        return {
          icon,
          weatherInfo: info,
          wind: maxWind,
          snow: snowTotal.toFixed(1),
          isSnow: hasSnow,
          isSleet: hasSleet,
          isGale,
          isBlizzard,
          label: isBlizzard ? 'Ventisca' : (hasSnow ? 'Nieve' : (hasSleet ? 'Aguanieve' : info.label.split('/')[0].trim()))
        };
      };

      const morning = calcPart(morningItems);
      const afternoon = calcPart(afternoonItems);
      const isShiftRisk = (!morning.isGale && !morning.isBlizzard) && (afternoon.isGale || afternoon.isBlizzard || afternoon.wind >= morning.wind + 25);

      return { morning, afternoon, isShiftRisk, coldSnow24h };
    };

    const forecast7Days = Array.from({ length: forecastDaysCount }, (_, dayIdx) => {
      const code = rDaily.weather_code && rDaily.weather_code[dayIdx] != null ? rDaily.weather_code[dayIdx] : 3;
      const rawMax = rDaily.temperature_2m_max && rDaily.temperature_2m_max[dayIdx] != null ? rDaily.temperature_2m_max[dayIdx] : rCurrent.temperature_2m;
      const rawMin = rDaily.temperature_2m_min && rDaily.temperature_2m_min[dayIdx] != null ? rDaily.temperature_2m_min[dayIdx] : rCurrent.temperature_2m - 4;

      // Adaptación de temperaturas a cota media de la estación
      const tMax = Math.round(rawMax - (resort.midAlt - refAlt) * lapseRate);
      const tMin = Math.round(rawMin - (resort.midAlt - refAlt) * lapseRate);

      // Viento y rachas previstas en la estación
      const rawWind = rDaily.wind_speed_10m_max && rDaily.wind_speed_10m_max[dayIdx] != null ? rDaily.wind_speed_10m_max[dayIdx] : rWindBase;
      const rawGust = rDaily.wind_gusts_10m_max && rDaily.wind_gusts_10m_max[dayIdx] != null ? rDaily.wind_gusts_10m_max[dayIdx] : rawWind * 1.4;
      const windStation = rW ? Math.round(rawWind) : Math.round(rawWind * 1.3);
      const gustStation = rW ? Math.round(rawGust) : Math.round(rawGust * 1.35);

      const dayDateStr = (rDaily.time && rDaily.time[dayIdx]) ? rDaily.time[dayIdx] : '';
      const dayparts = dayDateStr ? getSkiDaypartMetrics(dayDateStr) : null;
      const rawDailySnow = (rDaily.snowfall_sum && rDaily.snowfall_sum[dayIdx] != null) ? rDaily.snowfall_sum[dayIdx] : 0;
      const snowNum = (rW && rawDailySnow > 0.05)
        ? rawDailySnow
        : Math.max(rawDailySnow, dayparts ? dayparts.coldSnow24h : 0);
      const snowDay = snowNum.toFixed(1);

      const fallbackResolved = resolveSkiWeatherCode(code, rDaily.precipitation_sum?.[dayIdx] ?? 0, snowNum, (tMax + tMin) / 2, rFreezingLevel, resort.midAlt);
      const rawDayInfo = getWeatherInfo(fallbackResolved.code, 1, (snowNum > 0 || fallbackResolved.isSnow || fallbackResolved.isSleet) ? 1 : 0);
      let dayInfo = rawDayInfo;
      let dayIcon = rawDayInfo.icon;
      let dayDesc = rawDayInfo.label.split('/')[0].trim();

      if (dayparts && dayparts.morning && dayparts.afternoon) {
        const hasAnyBlizzard = dayparts.morning.isBlizzard || dayparts.afternoon.isBlizzard;
        const hasAnySnow = snowNum > 0.05 || dayparts.morning.isSnow || dayparts.afternoon.isSnow;
        const hasAnySleet = !hasAnySnow && (dayparts.morning.isSleet || dayparts.afternoon.isSleet);
        if (hasAnyBlizzard || hasAnySnow) {
          dayIcon = hasAnyBlizzard ? '❄️💨' : '🌨️';
          dayDesc = hasAnyBlizzard ? 'Ventisca' : 'Nieve en Pistas';
          dayInfo = getWeatherInfo(snowNum >= 5 ? 75 : 73, 1, 1);
        } else if (hasAnySleet) {
          dayIcon = '🌨️';
          dayDesc = 'Aguanieve en Pistas';
          dayInfo = getWeatherInfo(68, 1, 0.8);
        } else if (dayparts.morning.icon === '☀️' && dayparts.afternoon.icon === '☀️') {
          dayIcon = '☀️';
          dayDesc = 'Despejado / Sol';
          dayInfo = getWeatherInfo(0, 1, 0);
        } else if ((dayparts.morning.icon === '☀️' || dayparts.morning.icon === '🌤️') && (dayparts.afternoon.icon === '☀️' || dayparts.afternoon.icon === '🌤️')) {
          dayIcon = '🌤️';
          dayDesc = 'Sol / Casi Despejado';
          dayInfo = getWeatherInfo(1, 1, 0);
        } else if (dayparts.morning.icon === '☀️' && dayparts.afternoon.icon.includes('☁')) {
          dayIcon = '⛅';
          dayDesc = 'Sol mañana, nubes tarde';
          dayInfo = getWeatherInfo(2, 1, 0);
        } else if (dayparts.morning.icon.includes('☁') && dayparts.afternoon.icon === '☀️') {
          dayIcon = '⛅';
          dayDesc = 'Nubes mañana, abre tarde';
          dayInfo = getWeatherInfo(2, 1, 0);
        } else if (dayparts.morning.weatherInfo?.isRain || dayparts.afternoon.weatherInfo?.isRain) {
          const rainInfo = dayparts.morning.weatherInfo?.isRain ? dayparts.morning.weatherInfo : dayparts.afternoon.weatherInfo;
          dayIcon = rainInfo.icon;
          dayDesc = rainInfo.label.split('/')[0].trim();
          dayInfo = rainInfo;
        }
      } else if (snowNum > 0.05) {
        dayIcon = '🌨️';
        dayDesc = 'Nieve en Pistas';
        dayInfo = getWeatherInfo(73, 1, 1);
      }

      // Etiqueta del día
      let dayLabel = '';
      if (dayIdx === 0) dayLabel = 'Hoy';
      else if (dayIdx === 1) dayLabel = 'Mañana';
      else if (rDaily.time && rDaily.time[dayIdx]) {
        const dObj = new Date(rDaily.time[dayIdx] + 'T12:00:00');
        const dStr = dObj.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
        dayLabel = dStr.charAt(0).toUpperCase() + dStr.slice(1);
      } else {
        const dObj = new Date(today);
        dObj.setDate(today.getDate() + dayIdx);
        const dStr = dObj.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
        dayLabel = dStr.charAt(0).toUpperCase() + dStr.slice(1);
      }

      const isBlizzardDay = Boolean(dayparts && ((dayparts.morning && dayparts.morning.isBlizzard) || (dayparts.afternoon && dayparts.afternoon.isBlizzard)));

      return {
        label: dayLabel,
        icon: dayIcon,
        weatherInfo: dayInfo,
        isBlizzardDay,
        desc: dayDesc,
        tMax,
        tMin,
        wind: windStation,
        gust: gustStation,
        snow: snowDay,
        isGaleRisk: gustStation >= 65,
        dayparts: (dayparts && dayparts.morning && dayparts.afternoon) ? dayparts : null
      };
    });

    const snow3Days = forecast7Days.slice(0, 3).reduce((acc, f) => acc + (parseFloat(f.snow) || 0), 0).toFixed(1);
    const snow7Days = forecast7Days.reduce((acc, f) => acc + (parseFloat(f.snow) || 0), 0).toFixed(1);

    return {
      ...resort,
      isIndependentData: Boolean(rW),
      freezingLevel: rFreezingLevel,
      windDeg: rWindDeg,
      snow3Days,
      snow7Days,
      currentSky,
      forecast7Days,
      top: {
        alt: resort.topAlt,
        name: resort.summitName,
        temp: topTemp,
        windChill: topWindChill,
        windSpd: topWind,
        quality: topQuality,
        isSnowing: topIsSnowing
      },
      mid: {
        alt: resort.midAlt,
        temp: midTemp,
        windChill: midWindChill,
        windSpd: midWind,
        quality: midQuality,
        isSnowing: midIsSnowing
      },
      base: {
        alt: resort.baseAlt,
        temp: baseTemp,
        windChill: baseWindChill,
        windSpd: baseWind,
        precipType: basePrecipType,
        isSnowing: baseIsSnowing
      },
      liftSafety,
      snowToday: resortSnowToday
    };
  });

  const headlineResort = resortsData[activeResortIdx] || resortsData[0];
  const freezingLevel = headlineResort.freezingLevel;
  const snowAccumToday = headlineResort.snowToday;
  const totalSnow3Days = headlineResort.snow3Days;
  const avalanche = evaluateAvalancheRisk(snowAccumToday, headlineResort.mid.windSpd, freezingLevel);

  // Procesar puertos de montaña usando datos reales de Cordillera cuando estén disponibles
  const passesWithStatus = PUERTOS_MONTANA_ASTURIAS.map(p => {
    let refW = null;
    if (resortsWeatherMap) {
      if (p.sector === 'occidente') refW = resortsWeatherMap.leitariegos || resortsWeatherMap.pajares;
      else if (p.id === 'pajares' || p.id === 'huerna' || (p.skiAccess && p.skiAccess.includes('Pajares'))) refW = resortsWeatherMap.pajares || resortsWeatherMap.san_isidro;
      else refW = resortsWeatherMap.san_isidro || resortsWeatherMap.fuentes || resortsWeatherMap.pajares;
    }
    const pFl = (refW && refW.hourly && refW.hourly.freezing_level_height && refW.hourly.freezing_level_height[currentHour] != null)
      ? Math.round(refW.hourly.freezing_level_height[currentHour])
      : freezingLevel;
    const pSnow = (refW && refW.daily && refW.daily.snowfall_sum && refW.daily.snowfall_sum[0] != null)
      ? refW.daily.snowfall_sum[0].toFixed(1)
      : snowAccumToday;
    const pPrecip = refW && refW.current && refW.current.precipitation != null ? refW.current.precipitation : current.precipitation;
    const statusObj = evaluatePassStatus(p.alt, pFl, pSnow, pPrecip, p.skiAccess);
    return {
      ...p,
      ...statusObj
    };
  });

  // Clasificación de puertos por sectores geográficos naturales de Asturias
  const arteryPasses = passesWithStatus.filter(p => p.sector === 'arterias');
  const centroPasses = passesWithStatus.filter(p => p.sector === 'centro');
  const orientePasses = passesWithStatus.filter(p => p.sector === 'oriente');
  const occidentePasses = passesWithStatus.filter(p => p.sector === 'occidente');

  return `
    <div class="mountain-card">
      <div class="section-title-wrap" style="margin-bottom: 8px;">
        <h3 class="section-heading" style="margin-bottom: 0;">🏔️ Cordillera & Nieve</h3>
      </div>

      <!-- 1. BARRA UNIFICADA DE SENSORES DE ALTA MONTAÑA (2 PISOS ANTI-COLISIÓN) -->
      <div class="mountain-top-unified-bar">
        <!-- Piso 1: Cota de Nieve y Nieve 3 Días (50% cada una con divisor vertical) -->
        <div class="m-top-split-row">
          <div class="m-top-col">
            <span class="m-top-label">🏔️ Cota Nieve 0°C</span>
            <div class="m-top-val">${freezingLevel} <span class="unit">m</span></div>
            <span class="m-top-sub">${resortsWeatherMap ? `${headlineResort.shortName} · Cordillera` : (concejo.altitude >= freezingLevel ? '❄️ En tu cota' : 'Por encima')}</span>
          </div>

          <div class="m-top-v-divider"></div>

          <div class="m-top-col">
            <span class="m-top-label">❄️ Nieve (3 Días)</span>
            <div class="m-top-val highlight">${totalSnow3Days} <span class="unit">cm</span></div>
            <span class="m-top-sub">Hoy: <strong>${snowAccumToday} cm</strong></span>
          </div>
        </div>

        <div class="m-top-h-divider"></div>

        <!-- Piso 2: Peligro de Aludes a todo lo ancho -->
        <div class="m-top-avalanche-row">
          <div class="m-avalanche-info">
            <span class="m-avalanche-title">⚠️ Peligro Aludes (EAWS):</span>
            <span class="m-avalanche-badge" style="color: ${avalanche.color};">
              ${avalanche.icon} <strong>Nivel ${avalanche.level} (${avalanche.name})</strong>
            </span>
          </div>
          <button class="btn-explain-sensor" data-explain="ski_mountain" title="Escala europea de riesgo de aludes y guía didáctica" aria-label="Escala europea de riesgo de aludes y guía didáctica">💡</button>
        </div>
      </div>

      <!-- 2. CONMUTADOR DE MONTAÑA: ESQUÍ / PUERTOS (Ley 11) -->
      <div class="mountain-operational-section">
        <!-- INTERRUPTOR DESLIZANTE SEGMENTADO TÁCTIL (ETIQUETAS CORTAS DE 1 PALABRA) -->
        <div class="mountain-toggle-container">
          <div class="mountain-sliding-segmented-switch" id="mountain-segmented-switch" data-active="${activeTabMode}">
            <div class="mountain-switch-glider"></div>
            <button class="mountain-switch-option ${activeTabMode === 'ski' ? 'active' : ''}" data-mountain-tab="ski" id="btn-mountain-tab-ski" aria-label="Ver previsión de esquí estilo Snow-Forecast">
              <span class="mountain-switch-icon">⛷️</span>
              <span class="mountain-switch-label">Esquí</span>
            </button>
            <button class="mountain-switch-option ${activeTabMode === 'passes' ? 'active' : ''}" data-mountain-tab="passes" id="btn-mountain-tab-passes" aria-label="Ver estado de puertos de montaña y conexiones a la meseta">
              <span class="mountain-switch-icon">🚗</span>
              <span class="mountain-switch-label">Puertos</span>
            </button>
          </div>
        </div>

        <!-- Botón de Webcams de Puertos y Pistas -->
        <div style="margin: 8px 0 4px 0;">
          <button class="btn-open-webcams-mountain" data-webcam-cat="montana" title="Ver cámaras en directo de puertos de montaña y estaciones">
            <span>📹</span>
            <span>Ver Webcams de Puertos y Pistas en Vivo</span>
          </button>
        </div>
      </div>

      <!-- VISTA A: ⛷️ ESTACIONES DE ESQUÍ (ESTÁNDAR SNOW-FORECAST COMPACTO) -->
      <div id="mountain-ski-view" class="mountain-tab-content ${activeTabMode === 'ski' ? 'active' : ''}" style="${activeTabMode === 'ski' ? 'display: block;' : 'display: none;'}">
        <!-- Selector de Estaciones en Cuadrícula 2x2 Táctil -->
        <div class="resorts-selector-bar">
          <div class="resorts-pills-grid">
            ${resortsData.map((r, i) => `
              <button class="resort-select-pill ${i === activeResortIdx ? 'active' : ''}" data-resort-id="${r.id}">
                <span class="pill-icon">⛷️</span>
                <span class="pill-name">${r.shortName}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Paneles de Previsión Desglosada por Estación -->
        <div class="resorts-cards-container">
          ${resortsData.map((r, i) => `
            <div class="resort-forecast-card ${i === activeResortIdx ? 'active' : ''}" id="resort-panel-${r.id}" style="${i === activeResortIdx ? 'display: flex;' : 'display: none;'}">
              <!-- Encabezado de la Estación -->
              <div class="resort-card-header">
                <div class="resort-header-title">
                  <h4 class="resort-name-main">⛷️ ${r.name}</h4>
                  <span class="resort-sub">${r.concejo} • ${r.pistasKm} (${r.pistasCount} pistas, ${r.remontesCount} remontes)</span>
                </div>
                <div class="resort-header-badges">
                  <!-- Tiempo General Actual en la Estación -->
                  <div class="ski-sky-badge" title="Tiempo general actual en la estación">
                    <span class="ski-sky-icon">${r.currentSky.weatherInfo ? renderWeatherIconHtml(r.currentSky.weatherInfo, 22, iconTheme) : r.currentSky.icon}</span>
                    <span class="ski-sky-label">${r.currentSky.label}</span>
                  </div>
                </div>
              </div>

              <!-- LAS 3 COTAS ALTITUDINALES EN CARRUSEL DESLIZANTE CON 3 PASTILLAS (Ley 18) -->
              <div class="ski-cotas-carousel-wrapper">
                <div class="ski-cotas-carousel" id="ski-cotas-carousel-${r.id}">
                  <!-- 1. CUMBRE -->
                  <div class="ski-cota-slide">
                    <div class="ski-level-strip top-strip">
                      <div class="ski-strip-header">
                        <span class="cota-badge top-badge">🏔️ CUMBRE (${r.top.alt}m)</span>
                        <span class="cota-peak-name">${r.top.name}</span>
                      </div>
                      <div class="ski-strip-metrics">
                        <span class="cota-temp-val">${r.top.temp}°C</span>
                        <span class="cota-chill-pill" title="Sensación térmica con viento">🥶 Siente ${r.top.windChill}°C</span>
                        <span class="cota-wind-val">${getMountainWindArrowSvg(r.windDeg, '#38bdf8', 12)} ${r.top.windSpd} km/h</span>
                        <span class="cota-quality-pill" style="color: ${r.top.quality.color};">${r.top.quality.icon} ${r.top.quality.label}</span>
                      </div>
                    </div>
                  </div>

                  <!-- 2. MEDIA ESTACIÓN -->
                  <div class="ski-cota-slide">
                    <div class="ski-level-strip mid-strip">
                      <div class="ski-strip-header">
                        <span class="cota-badge mid-badge">🚠 MEDIA ESTACIÓN (${r.mid.alt}m)</span>
                        <span class="cota-peak-name">Zona Central</span>
                      </div>
                      <div class="ski-strip-metrics">
                        <span class="cota-temp-val">${r.mid.temp}°C</span>
                        <span class="cota-chill-pill" title="Sensación térmica con viento">🥶 Siente ${r.mid.windChill}°C</span>
                        <span class="cota-wind-val">${getMountainWindArrowSvg(r.windDeg, '#38bdf8', 12)} ${r.mid.windSpd} km/h</span>
                        <span class="cota-quality-pill" style="color: ${r.mid.quality.color};">${r.mid.quality.icon} ${r.mid.quality.label}</span>
                      </div>
                    </div>
                  </div>

                  <!-- 3. BASE -->
                  <div class="ski-cota-slide">
                    <div class="ski-level-strip bot-strip">
                      <div class="ski-strip-header">
                        <span class="cota-badge bot-badge">🎿 BASE / PARKING (${r.base.alt}m)</span>
                        <span class="cota-peak-name">Taquillas</span>
                      </div>
                      <div class="ski-strip-metrics">
                        <span class="cota-temp-val">${r.base.temp}°C</span>
                        <span class="cota-chill-pill" title="Sensación térmica">🥶 Siente ${r.base.windChill}°C</span>
                        <span class="cota-wind-val">${getMountainWindArrowSvg(r.windDeg, '#38bdf8', 12)} ${r.base.windSpd} km/h</span>
                        <span class="cota-quality-pill" style="color: #38bdf8;">${r.base.precipType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 3 PASTILLAS SELECTORAS INTERACTIVAS (Cumbre, Media Estación, Base) -->
                <div class="ski-cotas-pills-bar" id="ski-cotas-pills-${r.id}">
                  <button class="ski-cota-tab-pill active" data-resort="${r.id}" data-cota-idx="0" type="button" aria-label="Ver Cota Cumbre">
                    <span>🏔️</span>
                    <span>Cumbre</span>
                  </button>
                  <button class="ski-cota-tab-pill" data-resort="${r.id}" data-cota-idx="1" type="button" aria-label="Ver Cota Media">
                    <span>🚠</span>
                    <span>Media</span>
                  </button>
                  <button class="ski-cota-tab-pill" data-resort="${r.id}" data-cota-idx="2" type="button" aria-label="Ver Cota Base">
                    <span>🎿</span>
                    <span>Base</span>
                  </button>
                </div>
              </div>

              <!-- 4. BLOQUE DINÁMICO DE PARTE DE NIEVE Y ESTADO DE PISTAS (KM ESQUIABLES) -->
              ${renderSkiResortSnowReport(r, data && data.snowReport)}

              <!-- PREVISIÓN METEOROLÓGICA Y VIENTO A 7 DÍAS EN LA ESTACIÓN -->
              <div class="ski-resort-forecast-section">
                <div class="ski-forecast-title-row">
                  <div class="ski-forecast-badge-line">
                    <span class="ski-forecast-badge">📅 Previsión a 7 Días • Esquí & Montaña</span>
                  </div>
                </div>

                <!-- Carrusel horizontal fashion con scroll nativo táctil -->
                <div class="ski-7days-carousel" id="ski-7days-carousel-${r.id}">
                  ${r.forecast7Days.map(f => `
                    <div class="ski-day-card ${f.isGaleRisk ? 'gale-warning' : ''} ${f.dayparts && f.dayparts.isShiftRisk ? 'shift-warning' : ''}">
                      <div class="ski-day-header">
                        <span class="ski-day-name">${f.label}</span>
                        <span class="ski-day-icon" title="${f.desc}">${f.isBlizzardDay ? '❄️💨' : (f.weatherInfo ? renderWeatherIconHtml(f.weatherInfo, 24, iconTheme) : f.icon)}</span>
                      </div>
                      
                      <div class="ski-day-temps">
                        <span class="ski-day-tmax">${f.tMax > 0 ? `+${f.tMax}` : f.tMax}°</span>
                        <span class="ski-day-tmin">${f.tMin > 0 ? `+${f.tMin}` : f.tMin}°</span>
                      </div>

                      <!-- Desglose Mañana vs Tarde (Detector de Ventisca / Cambio Brusco de Cefe) -->
                      ${f.dayparts ? `
                        <div class="ski-dayparts-dual">
                          <div class="ski-daypart-slot morning" title="Mañana (09h-13h): ${f.dayparts.morning.label}">
                            <span class="daypart-tag">09-13h</span>
                            <span class="daypart-icon">${f.dayparts.morning.isBlizzard ? '❄️💨' : (f.dayparts.morning.weatherInfo ? renderWeatherIconHtml(f.dayparts.morning.weatherInfo, 18, iconTheme) : f.dayparts.morning.icon)}</span>
                            <span class="daypart-wind ${f.dayparts.morning.isGale ? 'wind-alert' : ''}">💨${f.dayparts.morning.wind}</span>
                          </div>
                          <div class="ski-daypart-divider"></div>
                          <div class="ski-daypart-slot afternoon ${f.dayparts.isShiftRisk ? 'shift-alert' : ''}" title="Tarde (13h-17h): ${f.dayparts.afternoon.label}">
                            <span class="daypart-tag">13-17h</span>
                            <span class="daypart-icon">${f.dayparts.afternoon.isBlizzard ? '❄️💨' : (f.dayparts.afternoon.weatherInfo ? renderWeatherIconHtml(f.dayparts.afternoon.weatherInfo, 18, iconTheme) : f.dayparts.afternoon.icon)}</span>
                            <span class="daypart-wind ${f.dayparts.afternoon.isGale ? 'wind-alert' : ''}">💨${f.dayparts.afternoon.wind}</span>
                          </div>
                        </div>
                        ${f.dayparts.isShiftRisk ? `
                          <div class="ski-shift-badge" title="La tarde empeora de forma brusca con ventisca o fuerte viento">⚠️ Ventisca Tarde</div>
                        ` : ''}
                      ` : `
                        <div class="ski-day-wind ${f.isGaleRisk ? 'wind-alert' : ''}" title="Viento medio y rachas máximas previstas">
                          <span>💨 ${f.wind} km/h</span>
                          <span class="ski-day-gust">(${f.gust} racha)</span>
                        </div>
                      `}

                      <div class="ski-day-snow">
                        <span class="ski-snow-icon">❄️</span>
                        <span class="ski-snow-val ${parseFloat(f.snow) > 0 ? 'snow-active' : ''}">${f.snow} cm</span>
                      </div>
                    </div>
                  `).join('')}
                </div>

                <!-- Resumen Simétrico de Nieve Acumulada (3 y 7 Días) -->
                <div class="ski-snow-summary-grid">
                  <div class="ski-summary-pill">
                    <span class="ski-pill-label">⏱️ Próx. 3 Días</span>
                    <span class="ski-pill-val">${r.snow3Days} <span class="ski-pill-unit">cm</span></span>
                  </div>
                  <div class="ski-summary-pill">
                    <span class="ski-pill-label">❄️ Total 7 Días</span>
                    <span class="ski-pill-val">${r.snow7Days} <span class="ski-pill-unit">cm</span></span>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- VISTA B: 🚗 RED INTEGRAL DE PUERTOS Y ACCESOS A LA MESETA -->
      <div id="mountain-passes-view" class="mountain-tab-content ${activeTabMode === 'passes' ? 'active' : ''}" style="${activeTabMode === 'passes' ? 'display: block;' : 'display: none;'}">
        <style>
          .passes-sector-filter-bar {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            padding: 2px 0 10px 0;
            margin-bottom: 6px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .passes-sector-filter-bar::-webkit-scrollbar {
            display: none;
          }
          .pass-sector-filter-pill {
            flex: 0 0 auto;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 0.76rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid rgba(255, 255, 255, 0.14);
            background: rgba(15, 23, 42, 0.55);
            color: var(--text-dim, #94a3b8);
            white-space: nowrap;
          }
          .pass-sector-filter-pill.active {
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.45) 100%);
            border-color: var(--primary, #38bdf8);
            color: #ffffff;
            box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
          }
        </style>

        <!-- ARTERIAS PRINCIPALES DE CONEXIÓN CON LA MESETA -->
        <div class="passes-disclaimer-banner">
          <span>⚠️ <strong>Aviso Preventivo:</strong> Estado del firme estimado por modelo físico. No sustituye la señalización de la DGT ni la orden de la Guardia Civil de Tráfico. Consulta las webcams antes de viajar.</span>
        </div>

        <!-- FILTRO RÁPIDO DE PUERTOS POR SECTOR GEOGRÁFICO -->
        <div class="passes-sector-filter-bar" role="tablist" aria-label="Filtrar puertos de montaña por sector">
          <button type="button" class="pass-sector-filter-pill active" data-pass-sector="all">
            🌟 Todos (${passesWithStatus.length})
          </button>
          <button type="button" class="pass-sector-filter-pill" data-pass-sector="arterias">
            🛣️ Meseta (${arteryPasses.length})
          </button>
          <button type="button" class="pass-sector-filter-pill" data-pass-sector="centro">
            📍 Centro (${centroPasses.length})
          </button>
          <button type="button" class="pass-sector-filter-pill" data-pass-sector="oriente">
            🏔️ Oriente (${orientePasses.length})
          </button>
          <button type="button" class="pass-sector-filter-pill" data-pass-sector="occidente">
            🌲 Occidente (${occidentePasses.length})
          </button>
        </div>

        <div class="passes-group-block" data-sector-group="arterias">
          <div class="passes-group-title">
            <span>🛣️ Arterias Principales hacia la Meseta (Asturias - León)</span>
            <span class="passes-group-sub">Vías neurálgicas de alta capacidad y comunicación nacional</span>
          </div>

          <div class="passes-arteries-grid">
            ${arteryPasses.map(p => `
              <div class="pass-artery-card ${p.statusClass}" style="border: 1px solid ${p.border}; background: ${p.badgeBg};">
                <div class="pass-artery-top">
                  <div>
                    <h5 class="pass-artery-name">${p.name}</h5>
                    <span class="pass-artery-meta">${p.road} • Altitud: <strong>${p.alt} m</strong> • ${p.concejo}</span>
                  </div>
                  <div class="pass-badge" style="background: ${p.color}22; color: ${p.color}; border: 1px solid ${p.color}88;">
                    ${p.icon} ${p.status}
                  </div>
                </div>
                ${p.skiAccessStatus ? `
                  <div class="pass-ski-access-badge" style="border: 1px solid ${p.skiAccessStatus.color}44; background: ${p.skiAccessStatus.color}18; color: ${p.skiAccessStatus.color};">
                    <span>${p.skiAccessStatus.icon}</span>
                    <span>${p.skiAccessStatus.label}</span>
                  </div>
                ` : ''}
                <p class="pass-artery-desc">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTOR CENTRO Y VALLES MINEROS -->
        <div class="passes-sector-block" data-sector-group="centro">
          <div class="passes-sector-header">
            <span class="passes-sector-title">📍 Sector Centro y Valles Mineros (Caudal, Aller, Quirós, Riosa)</span>
            <span class="passes-sector-count">${centroPasses.length} pasos</span>
          </div>
          <div class="passes-grid">
            ${centroPasses.map(p => `
              <div class="pass-card ${p.statusClass}" style="border: 1px solid ${p.border}; background: rgba(15, 23, 42, 0.55); border-left: 4px solid ${p.color};">
                <div class="pass-card-content">
                  <div class="pass-main">
                    <h5 class="pass-name">${p.name}</h5>
                    <span class="pass-alt"><strong>${p.road}</strong> • Altitud: <strong>${p.alt} m</strong> • ${p.concejo}</span>
                    ${p.skiAccessStatus ? `
                      <div class="pass-ski-access-badge compact" style="border: 1px solid ${p.skiAccessStatus.color}44; background: ${p.skiAccessStatus.color}18; color: ${p.skiAccessStatus.color};">
                        <span>${p.skiAccessStatus.icon}</span>
                        <span>${p.skiAccessStatus.label}</span>
                      </div>
                    ` : ''}
                  </div>
                  <div class="pass-badge" style="background: ${p.color}22; color: ${p.color}; border: 1px solid ${p.color}66;">
                    ${p.icon} ${p.status}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTOR ORIENTE Y PICOS DE EUROPA -->
        <div class="passes-sector-block" data-sector-group="oriente">
          <div class="passes-sector-header">
            <span class="passes-sector-title">🏔️ Sector Oriente y Picos de Europa (Caso, Ponga, Cangas de Onís)</span>
            <span class="passes-sector-count">${orientePasses.length} pasos</span>
          </div>
          <div class="passes-grid">
            ${orientePasses.map(p => `
              <div class="pass-card ${p.statusClass}" style="border: 1px solid ${p.border}; background: rgba(15, 23, 42, 0.55); border-left: 4px solid ${p.color};">
                <div class="pass-card-content">
                  <div class="pass-main">
                    <h5 class="pass-name">${p.name}</h5>
                    <span class="pass-alt"><strong>${p.road}</strong> • Altitud: <strong>${p.alt} m</strong> • ${p.concejo}</span>
                  </div>
                  <div class="pass-badge" style="background: ${p.color}22; color: ${p.color}; border: 1px solid ${p.color}66;">
                    ${p.icon} ${p.status}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTOR OCCIDENTE -->
        <div class="passes-sector-block" data-sector-group="occidente">
          <div class="passes-sector-header">
            <span class="passes-sector-title">🌲 Sector Occidente (Somiedo, Narcea, Allande, Ibias)</span>
            <span class="passes-sector-count">${occidentePasses.length} pasos</span>
          </div>
          <div class="passes-grid">
            ${occidentePasses.map(p => `
              <div class="pass-card ${p.statusClass}" style="border: 1px solid ${p.border}; background: rgba(15, 23, 42, 0.55); border-left: 4px solid ${p.color};">
                <div class="pass-card-content">
                  <div class="pass-main">
                    <h5 class="pass-name">${p.name}</h5>
                    <span class="pass-alt"><strong>${p.road}</strong> • Altitud: <strong>${p.alt} m</strong> • ${p.concejo}</span>
                    ${p.skiAccessStatus ? `
                      <div class="pass-ski-access-badge compact" style="border: 1px solid ${p.skiAccessStatus.color}44; background: ${p.skiAccessStatus.color}18; color: ${p.skiAccessStatus.color};">
                        <span>${p.skiAccessStatus.icon}</span>
                        <span>${p.skiAccessStatus.label}</span>
                      </div>
                    ` : ''}
                  </div>
                  <div class="pass-badge" style="background: ${p.color}22; color: ${p.color}; border: 1px solid ${p.color}66;">
                    ${p.icon} ${p.status}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- AVISO LEGAL Y EXENCIÓN DE RESPONSABILIDAD -->
      <div class="mountain-disclaimer-box" style="margin-top: 20px; padding: 12px 16px; background: rgba(15, 23, 42, 0.45); border-radius: 12px; border-left: 3px solid #a855f7; font-size: 0.76rem; color: #94a3b8; line-height: 1.5;">
        <strong style="color: #e2e8f0; display: block; margin-bottom: 4px;">⚠️ Vialidad Invernal &amp; Alta Montaña:</strong>
        El estado de transitabilidad de puertos y cotas de nieve procede de estimaciones matemáticas y cotas altitudinales. <strong>Consulta siempre el estado oficial en tiempo real de la DGT (011) y 112 Asturias</strong> antes de circular por alta montaña en episodios de nieve o hielo.
      </div>
    </div>
  `;
}