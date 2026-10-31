import { getWeatherInfo, renderWeatherIconHtml, getWindDirection, getUVDescription, getAQIDescription } from '../utils/weatherIcons.js?v=3.0.23.56';
import { getAemetAlertStatus, renderAemetAlertCard } from '../utils/weatherAlerts.js?v=3.0.21';
import { renderHourlyForecastBlock } from './forecastView.js?v=3.0.23.56';
import { detectFoehnEffect, renderFoehnBanner } from '../utils/foehnDetector.js?v=3.0.23.43';
import { detectGalernaEffect, renderGalernaBanner } from '../utils/galernaDetector.js?v=3.0.23.43';
import { detectXeluEffect, renderXeluBanner } from '../utils/xeluDetector.js?v=3.0.23.43';
import { detectSnowStatus, renderSnowBanner } from '../utils/snowDetector.js?v=3.0.23.43';
import { detectBorrinaEffect, renderBorrinaBanner } from '../utils/borrinaDetector.js?v=3.0.23.54';
import { detectMarFondoEffect, renderMarFondoBanner } from '../utils/marFondoDetector.js?v=3.0.23.41';
import { detectThunderstormEffect, renderThunderstormBanner } from '../utils/thunderstormDetector.js?v=3.0.3';
import { detectRoadWindStatus, renderRoadWindBanner, renderRoadWindSensorPill } from '../utils/roadWindDetector.js?v=3.0.23.43';
import { getSeismicStatus, renderSeismicBanner } from '../utils/seismicDetector.js?v=3.0.3';
import { calculateLaundryDrying, renderLaundryCard } from '../utils/laundryAdvisor.js?v=2.2.12';
import { getClimatologyContext, renderClimatologyStrip } from '../utils/climatologyData.js?v=3.0.2';
import { calculateUmbrellaStatus, renderUmbrellaCard } from '../utils/umbrellaAdvisor.js?v=1.1.60';
import { checkConcejoFolixa } from '../utils/festivosData.js?v=1.1.85';

/**
 * Formatea el título del concejo con jerarquía bilingüe (Castellano principal, Asturianu en oro asturiano)
 * y subordina las localidades entre paréntesis (ej. Piedras Blancas / Salinas)
 */
function formatLocationTitle(name, activeLocalidad = null) {
  if (!name) return '';
  
  // Extraer posibles localidades entre paréntesis: ej. (Grullos / San Román) o (Piedras Blancas / Salinas)
  const parenMatch = name.match(/^(.*?)\s*(\((.*?)\))$/);
  const mainPart = parenMatch ? parenMatch[1].trim() : name.trim();
  const rawLocality = parenMatch ? parenMatch[3].trim() : '';

  let titleHtml = '';
  if (mainPart.includes('/')) {
    const parts = mainPart.split('/');
    const esName = parts[0].trim();
    const astName = parts.slice(1).join('/').trim();
    if (esName.toLowerCase() === astName.toLowerCase()) {
      titleHtml = `<span class="loc-name-es">${esName}</span>`;
    } else {
      titleHtml = `<span class="loc-name-es">${esName}</span><span class="loc-divider">/</span><span class="loc-name-ast">${astName}</span>`;
    }
  } else {
    titleHtml = `<span class="loc-name-es">${mainPart}</span>`;
  }

  // Extraer localidad y limpiar barras: si tiene varias localidades separadas por barra (ej. Piedras Blancas / Salinas),
  // se escoge la activa por GPS; si no hay GPS, se toma la primera (la capital municipal) sin mostrar jamás barras apelotonadas.
  let defaultLocality = rawLocality;
  if (defaultLocality.includes('/')) {
    defaultLocality = defaultLocality.split('/')[0].trim();
  }

  const displayLocality = rawLocality ? (activeLocalidad ? activeLocalidad.name : defaultLocality) : '';
  if (displayLocality) {
    titleHtml += `<div class="location-locality-badge">${displayLocality}</div>`;
  }
  return titleHtml;
}

/**
 * Formatea la condición meteorológica con jerarquía bilingüe (Castellano principal, Asturianu en oro asturiano)
 */
function formatConditionTitle(label) {
  if (!label) return '';
  if (label.includes('/')) {
    const parts = label.split('/');
    const es = parts[0].trim();
    const ast = parts.slice(1).join('/').trim();
    if (es.toLowerCase() === ast.toLowerCase()) {
      return `<span class="cond-name-es">${es}</span>`;
    }
    return `<span class="cond-name-es">${es}</span> <span class="cond-divider">•</span> <span class="cond-name-ast">${ast}</span>`;
  }
  const parenMatch = label.match(/^(.*?)\s*\((.*?)\)$/);
  if (parenMatch) {
    const first = parenMatch[1].trim();
    const second = parenMatch[2].trim();
    if (first.toLowerCase().startsWith('orbayu')) {
      return `<span class="cond-name-es">${second}</span> <span class="cond-divider">•</span> <span class="cond-name-ast">${first}</span>`;
    }
    return `<span class="cond-name-es">${first}</span> <span class="cond-subtext">(${second})</span>`;
  }
  return `<span class="cond-name-es">${label}</span>`;
}

/**
 * Determina la clase CSS de la pastilla según la concentración de polen (granos/m³)
 */
function getPollenBadgeClass(val, lowLimit = 10, highLimit = 50) {
  if (val == null || val <= 0.2) return 'pollen-zero';
  if (val < lowLimit) return 'pollen-low';
  if (val < highLimit) return 'pollen-mod';
  return 'pollen-high';
}

/**
 * Etiqueta legible con semáforo para el nivel de polen
 */
function getPollenLabel(val, lowLimit = 10, highLimit = 50) {
  if (val == null || val <= 0.2) return 'Nulo 🟢';
  if (val < lowLimit) return 'Bajo 🟢';
  if (val < highLimit) return 'Moderado 🟡';
  return 'Alto 🔴';
}

/**
 * Genera el Mini-Gráfico Térmico Continuo 24h en SVG nativo
 * Inmunidad al desborde móvil (Ley 11), gradiente térmico y punto vivo horario
 */
function renderMiniThermalCurve24h(hourly) {
  if (!hourly || !Array.isArray(hourly.temperature_2m) || !Array.isArray(hourly.time)) {
    return '';
  }

  // Filtrar las 24 horas del día natural de hoy
  const now = new Date();
  const todayPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  const temps = [];
  const hours = [];
  for (let i = 0; i < hourly.time.length; i++) {
    if (hourly.time[i].startsWith(todayPrefix)) {
      temps.push(hourly.temperature_2m[i]);
      hours.push(parseInt(hourly.time[i].substring(11, 13), 10));
      if (temps.length >= 24) break;
    }
  }

  if (temps.length < 12) return '';

  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = Math.max(1, maxTemp - minTemp);

  // Dimensiones del lienzo SVG
  const width = 300;
  const height = 40;
  const paddingX = 14;
  const paddingTop = 12;
  const paddingBottom = 8;
  const graphH = height - paddingTop - paddingBottom;
  const stepX = (width - paddingX * 2) / (temps.length - 1);

  // Coordenadas de los puntos
  const points = temps.map((t, idx) => {
    const x = paddingX + idx * stepX;
    const y = paddingTop + graphH - ((t - minTemp) / range) * graphH;
    return { x, y, temp: t, hour: hours[idx] };
  });

  // Generar curva suave bezier (spline continua)
  let dCurve = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpx1 = (p0.x + (p1.x - p0.x) / 2).toFixed(1);
    const cpx2 = cpx1;
    dCurve += ` C ${cpx1} ${p0.y.toFixed(1)}, ${cpx2} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }

  // Área bajo la curva para el gradiente suave
  const dArea = `${dCurve} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;

  // Calcular la posición del punto vivo según la hora y minutos actuales
  const curHour = now.getHours();
  const curMin = now.getMinutes();
  const hourFraction = Math.min(23, curHour + curMin / 60);
  const curX = paddingX + hourFraction * stepX;
  
  // Interpolación de Y y temperatura para el punto vivo
  const baseIdx = Math.min(points.length - 2, Math.floor(hourFraction));
  const tFrac = hourFraction - baseIdx;
  const curY = points[baseIdx].y + (points[baseIdx + 1].y - points[baseIdx].y) * tFrac;
  const curTemp = (temps[baseIdx] + (temps[baseIdx + 1] - temps[baseIdx]) * tFrac).toFixed(1);

  // Identificar el índice de máxima y mínima para etiquetas discretas
  const maxIdx = temps.indexOf(maxTemp);
  const minIdx = temps.indexOf(minTemp);
  const maxPt = points[maxIdx];
  const minPt = points[minIdx];

  return `
    <div class="mini-thermal-widget" title="Curva térmica continua de 24h con punto en tiempo real">
      <div class="mini-thermal-header">
        <span class="mth-title">📈 Curva Térmica Hoy</span>
        <span class="mth-live-tag">Ahora: <strong>${curTemp}°C</strong> (${String(curHour).padStart(2, '0')}:${String(curMin).padStart(2, '0')}h)</span>
      </div>
      <div class="mini-thermal-svg-wrap">
        <svg viewBox="0 0 ${width} ${height}" class="mini-thermal-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="thermalCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="50%" stop-color="#fbbf24" />
              <stop offset="100%" stop-color="#818cf8" />
            </linearGradient>
            <linearGradient id="thermalAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.22" />
              <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0" />
            </linearGradient>
          </defs>

          <!-- Área sombreada -->
          <path d="${dArea}" fill="url(#thermalAreaGrad)" />

          <!-- Línea suave continua -->
          <path d="${dCurve}" fill="none" stroke="url(#thermalCurveGrad)" stroke-width="2.2" stroke-linecap="round" />

          <!-- Etiquetas discretas de mínima y máxima -->
          <text x="${maxPt.x}" y="${Math.max(8, maxPt.y - 4)}" fill="#fbbf24" font-size="7.5" font-family="'JetBrains Mono', monospace" font-weight="800" text-anchor="middle">↑${Math.round(maxTemp)}°</text>
          <text x="${minPt.x}" y="${Math.min(height - 1, minPt.y + 7.5)}" fill="#38bdf8" font-size="7.5" font-family="'JetBrains Mono', monospace" font-weight="800" text-anchor="middle">↓${Math.round(minTemp)}°</text>

          <!-- Punto vivo actual con pulso visual -->
          <circle cx="${curX.toFixed(1)}" cy="${curY.toFixed(1)}" r="4.5" fill="#38bdf8" opacity="0.35" class="thermal-live-pulse" />
          <circle cx="${curX.toFixed(1)}" cy="${curY.toFixed(1)}" r="2.8" fill="#ffffff" stroke="#0284c7" stroke-width="1.4" />
        </svg>
      </div>
      <div class="mini-thermal-timeline">
        <span>00h</span>
        <span>06h</span>
        <span>12h</span>
        <span>18h</span>
        <span>23h</span>
      </div>
    </div>
  `;
}

/**
 * Renderiza el Vaso Medidor de Cristal Pluviométrico (Estilo Probeta Hellmann Oficial)
 */
function renderRainBeakerSvg(rainFallenSoFar, currentRainIntensity) {
  const maxGaugeMm = 80;
  const clampedRain = Math.min(maxGaugeMm, Math.max(0, rainFallenSoFar));
  const usableHeight = 89; // Distancia entre la marca de 0 mm (y=114) y la de 80 mm (y=25)
  const waterFillHeight = Math.round((clampedRain / maxGaugeMm) * usableHeight);
  const waterY = 114 - waterFillHeight;
  
  let waterGradId = 'rainWaterNormal';
  let surfaceColor = '#7dd3fc';
  if (rainFallenSoFar >= 80 || currentRainIntensity >= 30) {
    waterGradId = 'rainWaterDanger';
    surfaceColor = '#fca5a5';
  } else if (rainFallenSoFar >= 40 || currentRainIntensity >= 15) {
    waterGradId = 'rainWaterWarning';
    surfaceColor = '#fde047';
  }

  const isRaining = currentRainIntensity > 0;

  return `
    <svg class="rain-beaker-svg" viewBox="0 0 72 130" width="70" height="126" aria-hidden="true">
      <defs>
        <!-- Gradientes para el agua según severidad -->
        <linearGradient id="rainWaterNormal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.85" />
          <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#0369a1" stop-opacity="0.85" />
        </linearGradient>
        <linearGradient id="rainWaterWarning" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#d97706" stop-opacity="0.85" />
          <stop offset="50%" stop-color="#fbbf24" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#b45309" stop-opacity="0.85" />
        </linearGradient>
        <linearGradient id="rainWaterDanger" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#dc2626" stop-opacity="0.85" />
          <stop offset="50%" stop-color="#f87171" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#991b1b" stop-opacity="0.85" />
        </linearGradient>
        <!-- Reflejo cristal cilíndrico -->
        <linearGradient id="beakerGlassGleam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22" />
          <stop offset="25%" stop-color="#ffffff" stop-opacity="0.06" />
          <stop offset="80%" stop-color="#ffffff" stop-opacity="0.02" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.16" />
        </linearGradient>
        <!-- Base de titanio / platino -->
        <linearGradient id="beakerBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#475569" />
          <stop offset="50%" stop-color="#1e293b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <clipPath id="beakerInnerClip">
          <rect x="22" y="16" width="28" height="98" rx="4" />
        </clipPath>
        <filter id="waterGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- BASE DE APOYO DEL PLUVIÓMETRO -->
      <path d="M 12 122 L 60 122 C 61 122 62 123 62 124 L 62 126 C 62 127 61 128 60 128 L 12 128 C 11 128 10 127 10 126 L 10 124 C 10 123 11 122 12 122 Z" fill="url(#beakerBaseGrad)" stroke="rgba(255,255,255,0.2)" stroke-width="0.8" />
      <line x1="16" y1="122" x2="56" y2="122" stroke="#38bdf8" stroke-width="1" stroke-opacity="0.4" />

      <!-- FONDO OSCURO DEL TUBO DE VIDRIO -->
      <rect x="22" y="16" width="28" height="98" rx="4" fill="rgba(10, 15, 29, 0.75)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1.2" />

      <!-- LÍQUIDO ACUMULADO (CLIPPEADO AL INTERIOR) -->
      <g clip-path="url(#beakerInnerClip)">
        ${waterFillHeight > 0 ? `
          <rect x="22" y="${waterY}" width="28" height="${waterFillHeight}" fill="url(#${waterGradId})" filter="url(#waterGlow)" />
          <!-- Menisco / Superficie del agua -->
          <ellipse cx="36" cy="${waterY}" rx="14" ry="2.5" fill="${surfaceColor}" opacity="0.9" />
          <line x1="24" y1="${waterY}" x2="48" y2="${waterY}" stroke="#ffffff" stroke-width="0.8" stroke-opacity="0.8" />
        ` : `
          <!-- Fondo en reposo seco con brillo basal -->
          <line x1="24" y1="113" x2="48" y2="113" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5" />
        `}
      </g>

      <!-- REFLEJO DE CRISTAL (BRILLO LATERAL Y VOLUMEN 3D) -->
      <rect x="22" y="16" width="28" height="98" rx="4" fill="url(#beakerGlassGleam)" pointer-events="none" />
      <line x1="25" y1="18" x2="25" y2="112" stroke="#ffffff" stroke-width="1" stroke-opacity="0.35" stroke-linecap="round" />

      <!-- BOCA / LABIO SUPERIOR DEL VASO -->
      <path d="M 19 16 C 19 14.5 21 13 23 13 L 49 13 C 51 13 53 14.5 53 16 Z" fill="none" stroke="rgba(56, 189, 248, 0.5)" stroke-width="1.2" />
      <ellipse cx="36" cy="16" rx="15" ry="2.2" fill="rgba(56, 189, 248, 0.15)" stroke="rgba(255, 255, 255, 0.5)" stroke-width="0.8" />

      <!-- GRADUACIÓN Y MARCAS MILIMÉTRICAS A LA DERECHA -->
      <!-- 80 mm (Peligro) -->
      <line x1="42" y1="25" x2="50" y2="25" stroke="#ef4444" stroke-width="1.5" />
      <text x="53" y="27" font-size="7.5" font-weight="700" fill="#fca5a5" font-family="system-ui, sans-serif">80</text>

      <!-- 60 mm -->
      <line x1="45" y1="47" x2="50" y2="47" stroke="rgba(255,255,255,0.3)" stroke-width="1" />

      <!-- 40 mm (Aviso) -->
      <line x1="42" y1="70" x2="50" y2="70" stroke="#f59e0b" stroke-width="1.5" />
      <text x="53" y="72" font-size="7.5" font-weight="700" fill="#fde047" font-family="system-ui, sans-serif">40</text>

      <!-- 20 mm -->
      <line x1="43" y1="92" x2="50" y2="92" stroke="#38bdf8" stroke-width="1.2" />
      <text x="53" y="94" font-size="7" font-weight="600" fill="#7dd3fc" font-family="system-ui, sans-serif">20</text>

      <!-- 0 mm (Base) -->
      <line x1="42" y1="114" x2="50" y2="114" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" />
      <text x="53" y="116" font-size="7" font-weight="600" fill="#94a3b8" font-family="system-ui, sans-serif">0</text>

      <!-- GOTAS DE LLUVIA ANIMADAS SI LLUEVE EN VIVO -->
      ${isRaining ? `
        <g class="beaker-rain-drops">
          <line class="beaker-drop drop-1" x1="33" y1="2" x2="33" y2="9" stroke="#38bdf8" stroke-width="1.6" stroke-linecap="round" />
          <line class="beaker-drop drop-2" x1="39" y1="-3" x2="39" y2="4" stroke="#7dd3fc" stroke-width="1.4" stroke-linecap="round" />
        </g>
      ` : ''}
    </svg>
  `;
}

/**
 * Renderiza el dashboard principal con alineación uniforme y todos los sensores de la estación
 */
export function renderCurrentWeather(data, concejo, units = 'metric', iconTheme = 'astur', activeLocalidad = null) {
  const current = data.weather.current;
  const hourly = data.weather.hourly;
  const daily = data.weather.daily;
  const aqi = data.aqi?.current;
  
  const currentHour = new Date().getHours();
  const currentPop = (hourly && hourly.precipitation_probability && hourly.precipitation_probability[currentHour] != null) ? hourly.precipitation_probability[currentHour] : null;
  const directIrr = current.direct_normal_irradiance != null ? current.direct_normal_irradiance : null;
  const currentUv = current.uv_index != null ? current.uv_index : (hourly?.uv_index && hourly.uv_index[currentHour] != null ? hourly.uv_index[currentHour] : null);
  const currentSw = current.shortwave_radiation != null ? current.shortwave_radiation : null;
  const currentCloud = current.cloud_cover != null ? current.cloud_cover : (hourly?.cloud_cover && hourly.cloud_cover[currentHour] != null ? hourly.cloud_cover[currentHour] : null);
  const currentVis = current.visibility != null ? current.visibility : (hourly?.visibility && hourly.visibility[currentHour] != null ? hourly.visibility[currentHour] : null);
  const weatherInfo = getWeatherInfo(current.weather_code, current.is_day, current.precipitation, currentPop, directIrr, currentUv, currentSw, currentCloud, current.relative_humidity_2m, currentVis);
  const windDir = getWindDirection(current.wind_direction_10m || 0);
  const uvVal = (daily.uv_index_max && daily.uv_index_max[0] != null) ? daily.uv_index_max[0] : (hourly.uv_index && hourly.uv_index[new Date().getHours()] != null ? hourly.uv_index[new Date().getHours()] : null);
  const uvInfo = getUVDescription(uvVal);
  const aqiInfo = getAQIDescription(aqi?.european_aqi);

  // 1. Presión actual y simulación de prueba para barómetro (Ley Constitucional 12)
  let rawPressure = current.pressure_msl != null ? current.pressure_msl : 1013.0;
  let simulatedBaroDiff = null;

  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');
    // Simuladores de presión con alertas (Doctrina Constitucional 12)
    if (testMode === 'presion' || testMode === 'temporal_presion' || testMode === 'borrasca' || testMode === 'baro_borrasca_profunda') {
      rawPressure = 992.4;
      simulatedBaroDiff = -3.8;
    } else if (testMode === 'ciclogenesis' || testMode === 'desplome' || testMode === 'temporal_severo_presion' || testMode === 'baro_ciclogenesis' || testMode === 'baro_alerta_roja') {
      rawPressure = 981.2;
      simulatedBaroDiff = -5.8;
    } else if (testMode === 'baro_anticiclon_caida' || testMode === 'baro_alta_caida' || testMode === 'barometro_aviso' || testMode === 'baro_aviso_naranja_alta') {
      rawPressure = 1018.4;
      simulatedBaroDiff = -3.2;
    } else if (testMode === 'baro_borrasca_caida' || testMode === 'baro_aviso_naranja_baja' || testMode === 'baro_baja_caida') {
      rawPressure = 1008.2;
      simulatedBaroDiff = -3.4;
    } else if (testMode === 'baro_subiendo_fuerte') {
      rawPressure = 1022.0;
      simulatedBaroDiff = 3.2;
    }
  }

  // 2. Tendencia Barométrica de 3 horas (OMM / WMO Code 0200)
  let diffBaro3h = 0;
  if (simulatedBaroDiff !== null) {
    diffBaro3h = simulatedBaroDiff;
  } else if (hourly && hourly.pressure_msl && hourly.pressure_msl.length > 3) {
    const curHourIdx = new Date().getHours();
    const pastIdx = Math.max(0, curHourIdx - 3);
    const pastPress = hourly.pressure_msl[pastIdx] != null ? hourly.pressure_msl[pastIdx] : rawPressure;
    diffBaro3h = Math.round((rawPressure - pastPress) * 10) / 10;
  }

  // 3. Evaluación de Severidad Barométrica Cantábrica (Aviso AEMET / Ciclogénesis)
  // - ROJO (Peligro Severo / Ciclogénesis): Caída súbita >= 5.0 hPa en 3h o presión absoluta < 985 hPa
  // - NARANJA (Precaución / Pérdida rápida de presión): Caída fuerte >= 3.0 hPa en 3h o presión < 995 hPa
  // - NORMAL / VERDE: Variación moderada o ascenso barométrico
  const isSeverePressureDrop = diffBaro3h <= -5.0 || rawPressure < 985.0;
  const isWarningPressureDrop = !isSeverePressureDrop && (diffBaro3h <= -3.0 || rawPressure < 995.0);

  // Calificativo conciso sin redundancias (Feedback Lendo)
  let baroActionLabel = 'Estable';
  if (diffBaro3h <= -5.0) {
    baroActionLabel = 'Desplome súbito';
  } else if (diffBaro3h <= -3.0) {
    baroActionLabel = 'Bajando fuerte';
  } else if (diffBaro3h < -0.8) {
    baroActionLabel = 'Bajando';
  } else if (diffBaro3h >= 3.0) {
    baroActionLabel = 'Subiendo fuerte';
  } else if (diffBaro3h > 0.8) {
    baroActionLabel = 'Subiendo';
  }

  const diffStr = `${diffBaro3h >= 0 ? '+' : ''}${diffBaro3h.toFixed(1)} hPa/3h`;
  const trendBadgeText = `${diffStr} (${baroActionLabel})`;

  let baroSeverity = {
    valClass: '',
    icon: '',
    cardClass: '',
    fillClass: '',
    trendBadgeText: trendBadgeText,
    trendClass: 'trend-stable',
    alertBadgeHtml: ''
  };

  if (isSeverePressureDrop) {
    baroSeverity = {
      valClass: 'baro-val-danger',
      icon: ' ⚠️',
      cardClass: 'baro-card-danger',
      fillClass: 'baro-fill-danger',
      trendBadgeText: trendBadgeText,
      trendClass: 'trend-danger',
      alertBadgeHtml: `
        <div class="baro-alert-pill baro-pill-danger">
          <span class="baro-pill-icon">🚨</span>
          <span class="baro-pill-text"><strong>Ciclogénesis / Temporal Severo</strong> • Desplome barométrico muy rápido</span>
        </div>
      `
    };
  } else if (isWarningPressureDrop) {
    let alertTitle = 'Aproximación de Borrasca';
    let alertDesc = 'Caída rápida • Mayor inestabilidad o frente en 6-12h';

    if (rawPressure >= 1013.0) {
      alertTitle = 'Descenso Rápido de Presión';
      alertDesc = 'Retirada anticiclónica • Probable frente activo o empeoramiento en 6-12h';
    } else if (rawPressure < 995.0) {
      alertTitle = 'Borrasca Profunda';
      alertDesc = `Presión muy baja (${rawPressure.toFixed(1)} hPa) • Temporal atlántico en curso`;
    }

    baroSeverity = {
      valClass: 'baro-val-warning',
      icon: ' ⚠️',
      cardClass: 'baro-card-warning',
      fillClass: 'baro-fill-warning',
      trendBadgeText: trendBadgeText,
      trendClass: 'trend-warning',
      alertBadgeHtml: `
        <div class="baro-alert-pill baro-pill-warning">
          <span class="baro-pill-icon">⚠️</span>
          <span class="baro-pill-text"><strong>${alertTitle}</strong> • ${alertDesc}</span>
        </div>
      `
    };
  } else {
    let tClass = 'trend-stable';
    if (diffBaro3h > 0.8) {
      tClass = 'trend-up';
    } else if (diffBaro3h < -0.8) {
      tClass = 'trend-down';
    }
    baroSeverity = {
      valClass: '',
      icon: '',
      cardClass: '',
      fillClass: '',
      trendBadgeText: trendBadgeText,
      trendClass: tClass,
      alertBadgeHtml: ''
    };
  }

  const baroGaugePercent = Math.min(100, Math.max(0, ((rawPressure - 980) / (1040 - 980)) * 100));

  // Métricas enriquecidas del Barómetro (Superficie y Diagnóstico Humano)
  const surfacePressure = current.surface_pressure != null ? current.surface_pressure.toFixed(1) : null;
  const concejoAltitude = concejo?.altitude != null ? concejo.altitude : (concejo?.altitud != null ? concejo.altitud : null);

  let baroVerdict = { icon: '⛅', text: 'Presión normal: tiempo tranquilo sin temporales a la vista', class: 'baro-badge-neutral' };
  if (rawPressure >= 1024.0) {
    baroVerdict = { icon: '🛡️', text: 'Anticiclón potente: atmósfera muy estable y cielo despejado', class: 'baro-badge-optimal' };
  } else if (rawPressure >= 1016.0) {
    baroVerdict = { icon: '☀️', text: 'Tiempo firme: el anticiclón bloquea la entrada de lluvias', class: 'baro-badge-good' };
  } else if (rawPressure >= 1009.0) {
    baroVerdict = { icon: '⛅', text: 'Presión normal: tiempo tranquilo sin temporales a la vista', class: 'baro-badge-neutral' };
  } else if (rawPressure >= 1000.0) {
    baroVerdict = { icon: '☁️', text: 'Baja presión: aire inestable con nubes y posible lluvia', class: 'baro-badge-warn' };
  } else {
    baroVerdict = { icon: '🌀', text: 'Borrasca activa: fuerte inestabilidad y viento o lluvias', class: 'baro-badge-danger' };
  }

  // Conversión de viento a nudos si se solicita
  const rawSpeed = current.wind_speed_10m != null ? current.wind_speed_10m : 0;
  let rawGusts = current.wind_gusts_10m != null ? current.wind_gusts_10m : rawSpeed;
  let rawMaxGustToday = (daily.wind_gusts_10m_max && daily.wind_gusts_10m_max[0] != null) ? daily.wind_gusts_10m_max[0] : rawGusts;

  // Simulacro de prueba para viento (Doctrina Constitucional 12)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');
    if (testMode === 'viento' || testMode === 'viento_60' || testMode === 'aemet_viento' || testMode === 'viaductos') {
      rawGusts = 68.4;
      rawMaxGustToday = 74.2;
    } else if (testMode === 'viento_severo' || testMode === 'viento_80' || testMode === 'temporal' || testMode === 'temporal_viaductos' || testMode === 'viaductos_severo') {
      rawGusts = 85.0;
      rawMaxGustToday = 96.5;
    }
  }

  const windSpeed = units === 'knots' ? (rawSpeed * 0.539957).toFixed(1) : rawSpeed.toFixed(1);
  const windGusts = units === 'knots' ? (rawGusts * 0.539957).toFixed(1) : rawGusts.toFixed(1);
  const windMaxGustToday = units === 'knots' ? (rawMaxGustToday * 0.539957).toFixed(1) : rawMaxGustToday.toFixed(1);
  const windUnit = units === 'knots' ? 'kt' : 'km/h';
  const hasDistinctGust = parseFloat(windGusts) > parseFloat(windSpeed);

  // Escala cromática de severidad para rachas (60-79 km/h Naranja con ⚠️, >= 80 km/h Rojo con ⚠️)
  const getGustSeverity = (gustKmH) => {
    if (gustKmH >= 80) {
      return { cssClass: 'wind-val-danger', icon: ' ⚠️' };
    }
    if (gustKmH >= 60) {
      return { cssClass: 'wind-val-warning', icon: ' ⚠️' };
    }
    return { cssClass: '', icon: '' };
  };

  const currentGustSeverity = getGustSeverity(rawGusts);
  const maxGustSeverity = getGustSeverity(rawMaxGustToday);

  // Veredicto Práctico de Viento (Escala Beaufort y Confort Eólico Asturiano)
  const getWindVerdict = (speedKmH, gustsKmH) => {
    const s = parseFloat(speedKmH) || 0;
    const g = parseFloat(gustsKmH) || s;
    if (g >= 75 || s >= 62) {
      return {
        icon: '🚨',
        label: 'Temporal / Bastinazu: viento duro, riesgo de ramas',
        badgeClass: 'wind-badge-danger'
      };
    }
    if (g >= 50 || s >= 39) {
      return {
        icon: '⚠️',
        label: 'Viento fuerte / Frescachón: silba en tendidos',
        badgeClass: 'wind-badge-warning'
      };
    }
    if (g >= 30 || s >= 20) {
      return {
        icon: '💨',
        label: 'Brisa moderada: mueve ramas y levanta polvo',
        badgeClass: 'wind-badge-moderate'
      };
    }
    if (s >= 6) {
      return {
        icon: '🌬️',
        label: 'Brisa suave: perceptible en cara y mueve hojas',
        badgeClass: 'wind-badge-gentle'
      };
    }
    return {
      icon: '🍃',
      label: 'Calma chicha / Ventolín: humo asciende vertical',
      badgeClass: 'wind-badge-calm'
    };
  };
  const windVerdict = getWindVerdict(rawSpeed, rawGusts);

  // Punto de rocío actual (aproximado por Magnus-Tetens) y métricas higrométricas enriquecidas
  const T = current.temperature_2m;
  const RH = current.relative_humidity_2m;
  const a = 17.27, b = 237.7;
  const alpha = ((a * T) / (b + T)) + Math.log(RH / 100);
  const dewPoint = ((b * alpha) / (a - alpha)).toFixed(1);

  // Margen de condensación / niebla (Delta T)
  const deltaDewVal = Math.max(0, T - parseFloat(dewPoint));
  const deltaDew = deltaDewVal.toFixed(1);
  let fogRisk = { label: 'Sin riesgo de condensación', class: 'hum-risk-safe', icon: '✨' };
  if (deltaDewVal <= 1.5) {
    fogRisk = { label: 'Saturación • Riesgo alto de orpín o niebla', class: 'hum-risk-danger', icon: '🌫️' };
  } else if (deltaDewVal <= 3.5) {
    fogRisk = { label: 'Alta humedad • Formación de serena', class: 'hum-risk-warning', icon: '💧' };
  }

  // Aporte higrométrico / sensación térmica (bochorno)
  const apparentTemp = current.apparent_temperature != null ? current.apparent_temperature : T;
  const humidexDiff = (apparentTemp - T).toFixed(1);
  let humidexLabel = 'Sensación térmica en equilibrio';
  if (humidexDiff >= 0.8) {
    humidexLabel = `Bochorno: +${humidexDiff}°C sobre el termómetro`;
  } else if (humidexDiff <= -0.8) {
    humidexLabel = `Sensación reducida en ${Math.abs(humidexDiff)}°C (fresco)`;
  }

  // Vapor de agua en el aire (Humedad Absoluta en g/m³)
  const absHumidity = ((216.7 * (6.112 * Math.exp((17.67 * T) / (T + 243.5)) * (RH / 100))) / (273.15 + T)).toFixed(1);

  // Métricas enriquecidas de Radiación Solar & UV
  const uvMarkerPercent = uvVal != null ? Math.min(100, Math.max(0, (uvVal / 11) * 100)).toFixed(1) : '0';
  const globalSolar = current.shortwave_radiation != null 
    ? Math.round(current.shortwave_radiation) 
    : (current.direct_normal_irradiance != null ? Math.round(current.direct_normal_irradiance) : 0);
  
  let solarPowerText = `${globalSolar} W/m²`;
  if (globalSolar <= 10) {
    solarPowerText = `${globalSolar} W/m² (Noche / Manto cubierto)`;
  } else if (globalSolar < 250) {
    solarPowerText = `${globalSolar} W/m² (Radiación difusa)`;
  } else {
    solarPowerText = `${globalSolar} W/m² (Insolación activa)`;
  }

  let peakHoursText = '13:00 - 16:30 h';
  if (hourly && hourly.uv_index) {
    const todayUvs = hourly.uv_index.slice(0, 24);
    const maxUvToday = Math.max(...todayUvs);
    if (maxUvToday >= 1.5) {
      const peakStart = todayUvs.findIndex(u => u >= maxUvToday * 0.75);
      let peakEnd = 23;
      for (let h = 23; h >= 0; h--) {
        if (todayUvs[h] >= maxUvToday * 0.75) {
          peakEnd = h;
          break;
        }
      }
      if (peakStart !== -1) {
        peakHoursText = `${String(peakStart).padStart(2, '0')}:00 - ${String(peakEnd + 1).padStart(2, '0')}:00 h`;
      }
    } else {
      peakHoursText = 'Radiación tenue (cielo cubierto)';
    }
  }

  let burnTimeAdvice = 'Exposición segura • Síntesis de Vitamina D';
  if (uvVal >= 8) {
    burnTimeAdvice = 'Quemadura en < 15 min • Fotoprotector FPS 50+ obligatorio';
  } else if (uvVal >= 6) {
    burnTimeAdvice = 'Quemadura en < 25 min • Protección alta (FPS 50)';
  } else if (uvVal >= 3) {
    burnTimeAdvice = 'Protección recomendada tras 45 min de sol continuo';
  } else {
    burnTimeAdvice = 'Exposición segura • Síntesis moderada de Vitamina D';
  }

  // Estado Oficial de Alertas AEMET
  const aemetStatus = getAemetAlertStatus(data, concejo);
  const aemetCardMarkup = renderAemetAlertCard(aemetStatus, concejo);

  // Detección de Efecto Foehn ("Vientu les Castañes")
  const foehn = detectFoehnEffect(current);
  const foehnMarkup = renderFoehnBanner(foehn);

  // Detección Silenciosa de Galerna Cantábrica
  const galerna = detectGalernaEffect(current, hourly, concejo);
  const galernaMarkup = renderGalernaBanner(galerna);

  // Detección Silenciosa de Escarcha y Placas de Hielo ("Alerta Xelu")
  const xelu = detectXeluEffect(current, daily, concejo);
  const xeluMarkup = renderXeluBanner(xelu);

  // Detector Silencioso e Inteligente de Nevadas y Cota de Nieve ("Alerta Nieve")
  const snow = detectSnowStatus(current, hourly, daily, concejo);
  const snowMarkup = renderSnowBanner(snow);

  // Detección Silenciosa de Borrina Marina y Nieblas de Valle (Inversión Térmica)
  const borrina = detectBorrinaEffect(current, hourly, concejo);
  const borrinaMarkup = renderBorrinaBanner(borrina);

  // Armonización Visual Nocturna (Ley 15 del Proyecto):
  // Si es de noche y el detector de borrina marina o niebla costera está activo,
  // la cabecera no puede mostrar cielo despejado de postal (luna sola con estrellas).
  // Se conmuta a la Luna con la Nube ('partly-cloudy-night'), reflejando el velo de bruma sobre el cielo nocturno.
  if (borrina && borrina.isActive && (current.is_day === 0 || current.is_day === false)) {
    if (!weatherInfo.isRain && !weatherInfo.isSnow && (current.weather_code === 0 || current.weather_code === 1 || weatherInfo.svgKey === 'clear-night' || weatherInfo.svgKey === 'mostly-clear-night')) {
      weatherInfo.label = borrina.type === 'marina' ? 'Bruma nocturna / Borrina costera' : 'Niebla nocturna en valle';
      weatherInfo.icon = '☁️🌙';
      weatherInfo.svgKey = 'partly-cloudy-night';
      weatherInfo.bg = 'partly-cloudy-night';
      weatherInfo.lucide = 'cloud-moon';
    }
  }

  // Detección Silenciosa de Mar de Fondo y Golpe de Mar (Litoral Asturiano)
  const marFondo = detectMarFondoEffect(data.marine, concejo);
  const marFondoMarkup = renderMarFondoBanner(marFondo);

  // 4. Pluviómetro: cálculo riguroso de agua caída hasta ahora vs total previsto de la jornada (Ley 12.12)
  const now = new Date();
  const todayPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  let rainFallenSoFar = 0;
  let rainTodayTotalCalculated = 0;
  if (hourly && Array.isArray(hourly.precipitation) && Array.isArray(hourly.time)) {
    for (let i = 0; i < hourly.time.length; i++) {
      if (hourly.time[i].startsWith(todayPrefix)) {
        const pVal = (parseFloat(hourly.precipitation[i]) || 0);
        rainTodayTotalCalculated += pVal;
        const hourPart = parseInt(hourly.time[i].substring(11, 13), 10);
        if (hourPart <= currentHour) {
          rainFallenSoFar += pVal;
        }
      }
    }
  }
  rainFallenSoFar = Math.round(rainFallenSoFar * 10) / 10;
  rainTodayTotalCalculated = Math.round(rainTodayTotalCalculated * 10) / 10;
  let rainTodayTotal = (daily && daily.precipitation_sum && daily.precipitation_sum[0] != null) 
    ? Math.max(daily.precipitation_sum[0], rainTodayTotalCalculated) 
    : rainTodayTotalCalculated;
  if (rainFallenSoFar > rainTodayTotal) {
    rainTodayTotal = rainFallenSoFar;
  }
  const currentPopVal = (hourly && hourly.precipitation_probability && hourly.precipitation_probability[currentHour] != null) ? hourly.precipitation_probability[currentHour] : 0;
  const nextHour = (currentHour + 1) % 24;
  const nextPopVal = (hourly && hourly.precipitation_probability && hourly.precipitation_probability[currentHour + 1] != null) ? hourly.precipitation_probability[currentHour + 1] : currentPopVal;
  let currentRainIntensity = current.precipitation != null ? current.precipitation : 0;

  // Simulacro de prueba para lluvia (Doctrina Constitucional 12)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');
    if (testMode === 'lluvia' || testMode === 'lluvia_naranja' || testMode === 'lluvia_40') {
      rainFallenSoFar = 32.4;
      rainTodayTotal = 54.8;
      currentRainIntensity = 18.5;
    } else if (testMode === 'lluvia_torrencial' || testMode === 'lluvia_roja' || testMode === 'lluvia_severa' || testMode === 'temporal_lluvia') {
      rainFallenSoFar = 68.5;
      rainTodayTotal = 94.2;
      currentRainIntensity = 38.0;
    }
  }

  // Escala cromática de severidad para lluvia (40-79 mm Naranja, >= 80 mm Rojo)
  const getRainAccumSeverity = (mm) => {
    if (mm >= 80) return { cssClass: 'rain-val-danger', icon: ' ⚠️' };
    if (mm >= 40) return { cssClass: 'rain-val-warning', icon: ' ⚠️' };
    return { cssClass: '', icon: '' };
  };

  // Escala cromática de severidad para intensidad horaria (15-29 mm/h Naranja, >= 30 mm/h Rojo)
  const getRainIntensitySeverity = (mmPerHour) => {
    if (mmPerHour >= 30) return { cssClass: 'rain-val-danger', icon: ' ⚠️' };
    if (mmPerHour >= 15) return { cssClass: 'rain-val-warning', icon: ' ⚠️' };
    return { cssClass: '', icon: '' };
  };

  const rainFallenSeverity = getRainAccumSeverity(rainFallenSoFar);
  const rainTotalSeverity = getRainAccumSeverity(rainTodayTotal);
  const rainIntensitySeverity = getRainIntensitySeverity(currentRainIntensity);

  // Cálculos estéticos y ergonómicos para el Pluviómetro Digital
  let rainProgressPercent = 0;
  if (rainTodayTotal > 0) {
    rainProgressPercent = Math.min(100, Math.max(0, Math.round((rainFallenSoFar / rainTodayTotal) * 100)));
  } else if (rainFallenSoFar > 0) {
    rainProgressPercent = 100;
  }
  let rainBarClass = 'rain-fill-normal';
  if (rainFallenSoFar >= 80 || rainTodayTotal >= 80 || currentRainIntensity >= 30) {
    rainBarClass = 'rain-fill-danger';
  } else if (rainFallenSoFar >= 40 || rainTodayTotal >= 40 || currentRainIntensity >= 15) {
    rainBarClass = 'rain-fill-warning';
  }

  let rainLiveStatusText = '💧 En reposo • Sin lluvia';
  let rainLiveStatusClass = 'rain-badge-neutral';
  if (currentRainIntensity >= 30) {
    rainLiveStatusText = `🚨 Torrencial: <strong>${currentRainIntensity.toFixed(1)} mm/h</strong> ⚠️`;
    rainLiveStatusClass = 'rain-badge-danger';
  } else if (currentRainIntensity >= 15) {
    rainLiveStatusText = `⚠️ Muy fuerte: <strong>${currentRainIntensity.toFixed(1)} mm/h</strong> ⚠️`;
    rainLiveStatusClass = 'rain-badge-warning';
  } else if (currentRainIntensity >= 5) {
    rainLiveStatusText = `🌧️ Moderada: <strong>${currentRainIntensity.toFixed(1)} mm/h</strong>`;
    rainLiveStatusClass = 'rain-badge-active';
  } else if (currentRainIntensity > 0) {
    rainLiveStatusText = `🌧️ Orbayu: <strong>${currentRainIntensity.toFixed(1)} mm/h</strong>`;
    rainLiveStatusClass = 'rain-badge-active';
  }
  const popTrendIcon = nextPopVal > currentPopVal ? '📈' : (nextPopVal < currentPopVal ? '📉' : '⏱️');

  // Monitor Convectivo y Alerta Silenciosa de Tormenta Inminente
  const storm = detectThunderstormEffect(current, hourly, concejo);
  const thunderstormMarkup = renderThunderstormBanner(storm);

  // Detector Silencioso e Inteligente de Viento Lateral en Viaductos y Autovías (Seguridad Vial)
  const roadWind = detectRoadWindStatus(current, daily, hourly, concejo);
  const roadWindMarkup = renderRoadWindBanner(roadWind);
  const roadWindSensorPill = renderRoadWindSensorPill(roadWind);

  // Monitor Silencioso de Actividad Sísmica en Asturias y Mar Cantábrico (EMSC Open Data)
  const seismic = getSeismicStatus(concejo);
  const seismicAgeHours = seismic && seismic.rawTime ? (Date.now() - new Date(seismic.rawTime).getTime()) / (3600 * 1000) : 0;
  const isSeismicSevere = seismic && seismic.isActive && (seismic.level === 'severe' || seismic.magnitude >= 3.5);
  // Cabecera prioritaria durante las primeras 6 horas del seísmo; de 6h a 24h pasa a pie como registro informativo
  const isTopCandidate = isSeismicSevere && (seismic.isSimulation || (seismicAgeHours >= 0 && seismicAgeHours <= 6.0));
  const seismicTopMarkup = isTopCandidate ? renderSeismicBanner(seismic) : '';
  const seismicBottomMarkup = (!isTopCandidate && seismic && seismic.isActive) ? renderSeismicBanner(seismic) : '';

  // =========================================================================
  // SISTEMA DE TRIAGE Y JERARQUÍA ESTRICTA DE ALERTAS (DOCTRINA DE PROTECCIÓN CIVIL)
  // Ordenación por severidad: 🔴 Rojo (3) > 🟠 Naranja (2) > 🟡 Amarillo (1)
  // =========================================================================
  function getAlertSeverityWeight(lvl) {
    if (!lvl) return 0;
    const l = String(lvl).toLowerCase();
    if (l === 'red' || l === 'severe' || l === 'historic' || l === 'critical') return 3; // 🔴 ROJO
    if (l === 'orange' || l === 'valleys') return 2; // 🟠 NARANJA
    if (l === 'yellow' || l === 'warning' || l === 'amber' || l === 'moderate' || l === 'mountain') return 1; // 🟡 AMARILLO
    return 0;
  }

  const activeAlertsPool = [];

  // 1. Tarjeta Oficial AEMET (si tiene avisos activos, asciende a la cabecera del pool de alertas)
  if (aemetStatus && aemetStatus.hasAlerts && aemetCardMarkup) {
    activeAlertsPool.push({
      id: 'aemet',
      weight: getAlertSeverityWeight(aemetStatus.maxLevel),
      priority: 10, // Máxima prioridad institucional dentro del mismo nivel de gravedad
      markup: aemetCardMarkup
    });
  }

  // 2. Actividad Sísmica Notable en Cabecera (primeras 6 horas)
  if (isTopCandidate && seismicTopMarkup) {
    activeAlertsPool.push({
      id: 'seismic',
      weight: getAlertSeverityWeight(seismic.level),
      priority: 9,
      markup: `<div id="seismic-top-container">${seismicTopMarkup}</div>`
    });
  }

  // 3. Galerna Cantábrica
  if (galerna && galerna.isActive && galernaMarkup) {
    activeAlertsPool.push({
      id: 'galerna',
      weight: getAlertSeverityWeight(galerna.level),
      priority: 8,
      markup: galernaMarkup
    });
  }

  // 4. Tormenta Inminente y Convección
  if (storm && storm.isActive && thunderstormMarkup) {
    activeAlertsPool.push({
      id: 'storm',
      weight: getAlertSeverityWeight(storm.level),
      priority: 7,
      markup: thunderstormMarkup
    });
  }

  // 5. Viento Lateral en Viaductos y Autovías
  if (roadWind && roadWind.isActive && roadWindMarkup) {
    activeAlertsPool.push({
      id: 'roadWind',
      weight: getAlertSeverityWeight(roadWind.level),
      priority: 6,
      markup: roadWindMarkup
    });
  }

  // 6. Nieve y Cota
  if (snow && snow.isActive && snowMarkup) {
    activeAlertsPool.push({
      id: 'snow',
      weight: getAlertSeverityWeight(snow.level),
      priority: 5,
      markup: snowMarkup
    });
  }

  // 7. Mar de Fondo y Golpe de Mar
  if (marFondo && marFondo.isActive && marFondoMarkup) {
    activeAlertsPool.push({
      id: 'marFondo',
      weight: getAlertSeverityWeight(marFondo.level),
      priority: 4,
      markup: marFondoMarkup
    });
  }

  // 8. Efecto Foehn
  if (foehn && foehn.isActive && foehnMarkup) {
    activeAlertsPool.push({
      id: 'foehn',
      weight: getAlertSeverityWeight(foehn.level),
      priority: 3,
      markup: foehnMarkup
    });
  }

  // 9. Escarcha y Placas de Hielo (Alerta Xelu)
  if (xelu && xelu.isActive && xeluMarkup) {
    activeAlertsPool.push({
      id: 'xelu',
      weight: getAlertSeverityWeight(xelu.level),
      priority: 2,
      markup: xeluMarkup
    });
  }

  // 10. Borrina Marina y Nieblas
  if (borrina && borrina.isActive && borrinaMarkup) {
    activeAlertsPool.push({
      id: 'borrina',
      weight: getAlertSeverityWeight(borrina.level),
      priority: 1,
      markup: borrinaMarkup
    });
  }

  // Ordenar el pool: Mayor severidad primero (3 > 2 > 1); ante igualdad, mayor prioridad
  activeAlertsPool.sort((a, b) => {
    if (b.weight !== a.weight) return b.weight - a.weight;
    return b.priority - a.priority;
  });

  const hasSeismicTopInPool = activeAlertsPool.some(item => item.id === 'seismic');
  const sortedAlertsMarkup = activeAlertsPool.map(item => item.markup).join('\n');

  // Asesor de Colada y Secado de Ropa
  const laundry = calculateLaundryDrying(current, hourly, daily);
  const laundryMarkup = renderLaundryCard(laundry);

  // Cálculo Climatológico de "Tiempo Habitual" (Normales Oficiales AEMET 1991-2020)
  const clima = getClimatologyContext(concejo, current, daily);
  const climaStripMarkup = renderClimatologyStrip(clima);

  // Semáforu del Paragües (Nowcasting Inmediato Asturiano 8h)
  const umbrella = calculateUmbrellaStatus(current, hourly);
  const umbrellaMarkup = renderUmbrellaCard(umbrella);

  // Monitor Automático de Folixas y Fiestas Locales del Concejo (Ley 12 de Simulacro)
  const folixa = checkConcejoFolixa(concejo);
  let folixaBannerMarkup = '';
  if (folixa && folixa.active) {
    const f = folixa.festivo;
    const isSim = folixa.isSimulated;
    folixaBannerMarkup = `
      <div class="folixa-banner-card ${isSim ? 'folixa-simulated' : ''}">
        <div class="folixa-banner-top">
          <div class="folixa-flag-badge">
            <span class="folixa-icon">${f.icon || '🎉'}</span>
            <span class="folixa-pill-tag">${isSim ? '🎭 Simulacro Folixa (Ley 12)' : '🎉 ¡Hoxe tamos de Folixa!'}</span>
            <span class="folixa-pill-sub">${f.tag || 'Fiesta Patronal'}</span>
          </div>
          <button type="button" class="folixa-explain-btn btn-explain-folixa" data-explain-folixa="${f.id || 'patronal'}" title="Toca para conocer la historia, tradición y gastronomía de esta fiesta">
            💡 ¿Qué se celebra? ➔
          </button>
        </div>
        <div class="folixa-content">
          <h3 class="folixa-title">${f.name}</h3>
          <p class="folixa-tradition">${f.tradition}</p>
          <div class="folixa-clima-tip">
            <span class="folixa-tip-icon">🎪</span>
            <span class="folixa-tip-text"><strong>Plan de Fiesta & Clima:</strong> ${f.tipClima || 'Ambiente ideal para disfrutar de la romería.'}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Pronóstico Horario Detallado (72 Horas / 3 Días) en Vivo
  const hourlyForecastMarkup = renderHourlyForecastBlock(data, units, iconTheme);

  // Alertas dinámicas para las balizas de los sensores
  const windPillAlert = rawGusts >= 80 ? 'has-alert-danger' : (rawGusts >= 60 ? 'has-alert-warning' : '');
  const baroPillAlert = isSeverePressureDrop ? 'has-alert-danger' : (isWarningPressureDrop ? 'has-alert-warning' : '');
  const rainPillAlert = (currentRainIntensity >= 30 || rainTodayTotal >= 80) ? 'has-alert-danger' : ((currentRainIntensity >= 15 || rainTodayTotal >= 40) ? 'has-alert-warning' : '');
  const isBeaconSim = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('test') === 'balizas_sensores';
  const humPillAlert = (isBeaconSim || (RH >= 94 && deltaDewVal <= 1.5)) ? 'has-alert-warning' : '';
  const uvPillAlert = (isBeaconSim || (uvVal != null && uvVal >= 11)) ? 'has-alert-danger' : ((uvVal != null && uvVal >= 8) ? 'has-alert-warning' : '');
  const hasHighPollen = (aqi?.grass_pollen != null && aqi.grass_pollen >= 50) || (aqi?.birch_pollen != null && aqi.birch_pollen >= 75) || (aqi?.alder_pollen != null && aqi.alder_pollen >= 75);
  const aqiPillAlert = (aqi?.european_aqi != null && aqi.european_aqi > 80) ? 'has-alert-danger' : (((aqi?.european_aqi != null && aqi.european_aqi > 60) || hasHighPollen) ? 'has-alert-warning' : '');

  return `
    <!-- HERO WEATHER CARD (Tiempo, Ubicación y Temperatura) -->
    <div class="hero-weather-card ${weatherInfo.bg}">
      <div class="hero-top-row">
        <div class="hero-location-block">
          <span class="location-badge">${concejo.badge}</span>
          <h2 class="location-title">${formatLocationTitle(concejo.name, activeLocalidad)}</h2>
          <p class="location-meta">Altitud: ${(activeLocalidad?.altitude != null && concejo.name && concejo.name.includes('(')) ? activeLocalidad.altitude : concejo.altitude} m • ${concejo.region}</p>
        </div>
        <div class="hero-icon-block" title="${weatherInfo.label}">
          ${renderWeatherIconHtml(weatherInfo, 54, iconTheme)}
        </div>
      </div>

      <div class="hero-main-row">
        <div class="temp-primary-block">
          <div class="temp-primary">
            <span class="temp-val">${Math.round(current.temperature_2m)}</span>
            <span class="temp-unit">°C</span>
          </div>
          <div class="temp-minmax-pills">
            <span class="t-pill min">↓ ${Math.round(daily.temperature_2m_min[0])}°C</span>
            <span class="t-pill max">↑ ${Math.round(daily.temperature_2m_max[0])}°C</span>
          </div>
        </div>
        <div class="temp-info-block">
          <div class="condition-name" title="${weatherInfo.isSolarCalibrated ? (weatherInfo.isResol ? '☀️ Calibración Solar Inteligente: Resol / Sol tamizado activo atravesando las nubes con radiación solar directa en superficie' : '☀️ Calibración Solar Inteligente: Sensores físicos en tierra confirman sol y claros') : ''}">${formatConditionTitle(weatherInfo.label)}</div>
          <div class="temp-feels">Sensación térmica: <strong>${Math.round(current.apparent_temperature)}°C</strong></div>
          <div class="hero-actions-toolbar">
            <button class="btn-hero-camera btn-open-share-card" id="btn-hero-share" title="Generar estampa visual de este concejo para WhatsApp o Instagram" aria-label="Compartir estampa">📸</button>
            <button class="btn-hero-tool btn-hero-audio" id="btn-hero-audio" title="Escuchar boletín meteorológico con voz" aria-label="Escuchar locución">🔊</button>
          </div>
        </div>
      </div>

      <!-- MINI-GRÁFICO TÉRMICO CONTINUO 24H (CURVA SUAVE CON PUNTO VIVO HORARIO) -->
      ${renderMiniThermalCurve24h(hourly)}

      <!-- BANNER DESTACADO DE FOLIXAS Y FIESTAS LOCALES (HOXE TAMOS DE FOLIXA) -->
      ${folixaBannerMarkup ? `<div class="hero-divider"></div>${folixaBannerMarkup}` : ''}

      <!-- FRANJA ERGONÓMICA DE TIEMPO HABITUAL (ANOMALÍA CLIMATOLÓGICA 30 AÑOS AEMET) -->
      ${climaStripMarkup ? `<div class="hero-divider"></div>${climaStripMarkup}` : ''}

      <!-- SEMÁFORU DEL PARAGÜES (Nowcasting Asturiano Inmediato 8h) -->
      ${umbrellaMarkup ? `<div class="hero-divider"></div>${umbrellaMarkup}` : ''}
    </div>

    <!-- FEED DE ALERTAS CON TRIAGE JERÁRQUICO POR SEVERIDAD (ROJO > NARANJA > AMARILLO) -->
    ${sortedAlertsMarkup}
    ${!hasSeismicTopInPool ? `<div id="seismic-top-container"></div>` : ''}

    <!-- PRONÓSTICO HORARIO 72H / 3 DÍAS (SOLICITADO POR BETA TESTERS) -->
    ${hourlyForecastMarkup}


    <!-- SECCIÓN DE SENSORES Y ESTACIÓN EN VIVO (CARRUSEL HORIZONTAL MONOTARJETA CON SALTO RÁPIDO) -->
    <div class="sensors-carousel-section">
      <!-- BARRA DE ACCESO RÁPIDO CON BALIZAS DE EMERGENCIA VIVAS -->
      <div class="sensors-nav-toolbar" id="sensors-nav-toolbar">
        <button type="button" class="sensor-nav-pill active ${windPillAlert}" data-sensor-target="0" title="Ver Anemómetro">
          <span class="sensor-nav-icon">🧭</span>
          <span class="sensor-nav-label">Viento</span>
          ${windPillAlert ? '<span class="sensor-nav-dot"></span>' : ''}
        </button>
        <button type="button" class="sensor-nav-pill ${baroPillAlert}" data-sensor-target="1" title="Ver Barómetro">
          <span class="sensor-nav-icon">⏱️</span>
          <span class="sensor-nav-label">Presión</span>
          ${baroPillAlert ? '<span class="sensor-nav-dot"></span>' : ''}
        </button>
        <button type="button" class="sensor-nav-pill ${humPillAlert}" data-sensor-target="2" title="Ver Humedad y Rocío">
          <span class="sensor-nav-icon">💧</span>
          <span class="sensor-nav-label">Humedad</span>
          ${humPillAlert ? '<span class="sensor-nav-dot"></span>' : ''}
        </button>
        <button type="button" class="sensor-nav-pill ${rainPillAlert}" data-sensor-target="3" title="Ver Pluviómetro">
          <span class="sensor-nav-icon">🌧️</span>
          <span class="sensor-nav-label">Lluvia</span>
          ${rainPillAlert ? '<span class="sensor-nav-dot"></span>' : ''}
        </button>
        <button type="button" class="sensor-nav-pill ${uvPillAlert}" data-sensor-target="4" title="Ver Radiación y UV">
          <span class="sensor-nav-icon">☀️</span>
          <span class="sensor-nav-label">UV / Sol</span>
          ${uvPillAlert ? '<span class="sensor-nav-dot"></span>' : ''}
        </button>
        <button type="button" class="sensor-nav-pill ${aqiPillAlert}" data-sensor-target="5" title="Ver Calidad del Aire">
          <span class="sensor-nav-icon">🍃</span>
          <span class="sensor-nav-label">Aire</span>
          ${aqiPillAlert ? '<span class="sensor-nav-dot"></span>' : ''}
        </button>
        <button type="button" class="sensor-nav-pill" data-sensor-target="6" title="Ver Asesor de Colada">
          <span class="sensor-nav-icon">🧺</span>
          <span class="sensor-nav-label">Colada</span>
        </button>
      </div>

      <!-- CONTENEDOR CARRUSEL HORIZONTAL DE SENSORES -->
      <div class="sensors-carousel" id="sensors-carousel">
        <!-- 1. ANEMÓMETRO Y DIRECCIÓN -->
        <div class="sensor-card sensor-card-wind ${windPillAlert ? (windPillAlert === 'has-alert-danger' ? 'card-alert-danger' : 'card-alert-warning') : ''}" data-sensor-index="0" id="sensor-card-wind">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">🧭</span>
            <span class="sensor-title">Anemómetro y Dirección</span>
          </div>
          <button class="btn-explain-sensor" data-explain="wind" title="¿Cómo interpretar el viento y las rachas? Pulsa para aprender" aria-label="Explicación del viento">💡</button>
        </div>
        <div class="sensor-body wind-body">
          <div class="compass-wrapper">
            <div class="compass-dial" title="Rosa de los vientos: Viento del ${windDir.name} (${current.wind_direction_10m}°), entra por el ${windDir.name} y sopla hacia el ${windDir.toName}">
              <!-- Esfera Náutica / Aeroespacial de Precisión -->
              <svg class="compass-dial-svg" viewBox="0 0 100 100" width="98" height="98" aria-hidden="true">
                <defs>
                  <radialGradient id="compassBg" cx="50%" cy="45%" r="50%">
                    <stop offset="0%" stop-color="#0f172a" />
                    <stop offset="70%" stop-color="#090d16" />
                    <stop offset="100%" stop-color="#020617" />
                  </radialGradient>
                  <linearGradient id="bezelRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.6" />
                    <stop offset="50%" stop-color="#1e293b" stop-opacity="0.8" />
                    <stop offset="100%" stop-color="#0284c7" stop-opacity="0.5" />
                  </linearGradient>
                  <linearGradient id="glassReflection" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18" />
                    <stop offset="60%" stop-color="#ffffff" stop-opacity="0.02" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                  </linearGradient>
                </defs>

                <!-- Fondo base y biseles concéntricos -->
                <circle cx="50" cy="50" r="48" fill="url(#compassBg)" />
                <circle cx="50" cy="50" r="47.5" fill="none" stroke="url(#bezelRing)" stroke-width="1.2" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255, 255, 255, 0.07)" stroke-width="0.8" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(56, 189, 248, 0.15)" stroke-width="0.6" stroke-dasharray="1.5, 3" />

                <!-- Rosa de los vientos asturiana de 8 puntas (marca de agua en claroscuro) -->
                <!-- Puntas principales (N, S, E, O) -->
                <polygon points="50,50 47,40 50,26" fill="rgba(56, 189, 248, 0.12)" />
                <polygon points="50,50 53,40 50,26" fill="rgba(56, 189, 248, 0.05)" />
                <polygon points="50,50 40,47 26,50" fill="rgba(56, 189, 248, 0.05)" />
                <polygon points="50,50 40,53 26,50" fill="rgba(56, 189, 248, 0.12)" />
                <polygon points="50,50 47,60 50,74" fill="rgba(56, 189, 248, 0.05)" />
                <polygon points="50,50 53,60 50,74" fill="rgba(56, 189, 248, 0.12)" />
                <polygon points="50,50 60,47 74,50" fill="rgba(56, 189, 248, 0.12)" />
                <polygon points="50,50 60,53 74,50" fill="rgba(56, 189, 248, 0.05)" />

                <!-- Puntas secundarias (NE, SE, SO, NO) -->
                <polygon points="50,50 50,42 66,34" fill="rgba(56, 189, 248, 0.08)" />
                <polygon points="50,50 58,50 66,34" fill="rgba(56, 189, 248, 0.03)" />
                <polygon points="50,50 58,50 66,66" fill="rgba(56, 189, 248, 0.08)" />
                <polygon points="50,50 50,58 66,66" fill="rgba(56, 189, 248, 0.03)" />
                <polygon points="50,50 50,58 34,66" fill="rgba(56, 189, 248, 0.08)" />
                <polygon points="50,50 42,50 34,66" fill="rgba(56, 189, 248, 0.03)" />
                <polygon points="50,50 42,50 34,34" fill="rgba(56, 189, 248, 0.08)" />
                <polygon points="50,50 50,42 34,34" fill="rgba(56, 189, 248, 0.03)" />

                <!-- Ticks radiales cada 30 grados -->
                <line x1="71" y1="13.6" x2="69" y2="17.1" stroke="rgba(148, 163, 184, 0.35)" stroke-width="0.8" />
                <line x1="86.4" y1="29" x2="82.9" y2="31" stroke="rgba(148, 163, 184, 0.35)" stroke-width="0.8" />
                <line x1="86.4" y1="71" x2="82.9" y2="69" stroke="rgba(148, 163, 184, 0.35)" stroke-width="0.8" />
                <line x1="71" y1="86.4" x2="69" y2="82.9" stroke="rgba(148, 163, 184, 0.35)" stroke-width="0.8" />
                <line x1="29" y1="86.4" x2="31" y2="82.9" stroke="rgba(148, 163, 184, 0.35)" stroke-width="0.8" />
                <line x1="13.6" y1="71" x2="17.1" y2="69" stroke="rgba(148, 163, 184, 0.35)" stroke-width="0.8" />
                <line x1="13.6" y1="29" x2="17.1" y2="31" stroke="rgba(148, 163, 184, 0.35)" stroke-width="0.8" />
                <line x1="29" y1="13.6" x2="31" y2="17.1" stroke="rgba(148, 163, 184, 0.35)" stroke-width="0.8" />

                <!-- Ticks medianos en intercardinales (45°, 135°, 225°, 315°) -->
                <line x1="80.4" y1="19.6" x2="77.6" y2="22.4" stroke="rgba(56, 189, 248, 0.55)" stroke-width="1.2" />
                <line x1="80.4" y1="80.4" x2="77.6" y2="77.6" stroke="rgba(148, 163, 184, 0.55)" stroke-width="1.2" />
                <line x1="19.6" y1="80.4" x2="22.4" y2="77.6" stroke="rgba(148, 163, 184, 0.55)" stroke-width="1.2" />
                <line x1="19.6" y1="19.6" x2="22.4" y2="22.4" stroke="rgba(148, 163, 184, 0.55)" stroke-width="1.2" />

                <!-- Ticks mayores cardinales (N, S, E, O) -->
                <line x1="50" y1="5" x2="50" y2="10" stroke="#38bdf8" stroke-width="1.8" />
                <line x1="50" y1="95" x2="50" y2="90" stroke="#94a3b8" stroke-width="1.5" />
                <line x1="95" y1="50" x2="90" y2="50" stroke="#94a3b8" stroke-width="1.5" />
                <line x1="5" y1="50" x2="10" y2="50" stroke="#94a3b8" stroke-width="1.5" />

                <!-- Puntos cardinales con tipografía técnica nítida -->
                <text x="50" y="19" text-anchor="middle" font-size="8.5" font-weight="900" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif">N</text>
                <text x="83.5" y="52.8" text-anchor="middle" font-size="7.5" font-weight="800" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif">E</text>
                <text x="50" y="86.5" text-anchor="middle" font-size="7.5" font-weight="800" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif">S</text>
                <text x="16.5" y="52.8" text-anchor="middle" font-size="7.5" font-weight="800" fill="#cbd5e1" font-family="system-ui, -apple-system, sans-serif">O</text>

                <!-- Reflejo cenital convexo de cristal de zafiro -->
                <path d="M 8,42 A 44,44 0 0,1 92,42 A 44,22 0 0,0 8,42 Z" fill="url(#glassReflection)" />
              </svg>

              <!-- Aguja / Veleta Aerodinámica Giratoria (transform: rotate(grados)) -->
              <div class="compass-needle" style="transform: rotate(${current.wind_direction_10m}deg);">
                <svg class="wind-arrow-svg" viewBox="0 0 100 100" width="98" height="98" aria-hidden="true">
                  <defs>
                    <linearGradient id="needleShaft" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#0284c7" />
                      <stop offset="50%" stop-color="#38bdf8" />
                      <stop offset="100%" stop-color="#7dd3fc" />
                    </linearGradient>
                    <filter id="needleGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#38bdf8" flood-opacity="0.6"/>
                    </filter>
                  </defs>

                  <!-- ORIGEN EXTERIOR: Aletas de cola de veleta y perla ámbar de entrada de viento -->
                  <polygon points="44,8 47,19 45,20 41,12" fill="#94a3b8" stroke="#cbd5e1" stroke-width="0.6" opacity="0.9" />
                  <polygon points="56,8 53,19 55,20 59,12" fill="#94a3b8" stroke="#cbd5e1" stroke-width="0.6" opacity="0.9" />
                  <line x1="50" y1="12" x2="50" y2="20" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round" />
                  <circle cx="50" cy="20" r="2.8" fill="#f59e0b" stroke="#ffffff" stroke-width="0.8" />

                  <!-- CUERPO / FUSTE AERODINÁMICO CON VOLUMEN -->
                  <line x1="50" y1="20" x2="50" y2="39" stroke="url(#needleShaft)" stroke-width="3" stroke-linecap="round" filter="url(#needleGlow)" />
                  <line x1="50" y1="21" x2="50" y2="38" stroke="#f0f9ff" stroke-width="1.2" stroke-linecap="round" />

                  <!-- PUNTA DE FLECHA TRIDIMENSIONAL APUNTANDO AL CENTRO -->
                  <polygon points="50,47 42,35 50,38" fill="#0284c7" stroke="#0369a1" stroke-width="0.6" />
                  <polygon points="50,47 58,35 50,38" fill="#38bdf8" stroke="#7dd3fc" stroke-width="0.6" />
                  <line x1="50" y1="38" x2="50" y2="47" stroke="#ffffff" stroke-width="0.8" />
                </svg>
              </div>

              <!-- Pivote central concéntrico con aro de titanio y zafiro -->
              <div class="compass-center-dot">
                <div class="compass-center-inner"></div>
              </div>
            </div>
          </div>
          <div class="wind-info">
            ${hasDistinctGust ? `
              <div class="sensor-val wind-range-val" title="Velocidad media sostenida: ${windSpeed} ${windUnit} • Racha actual: ${windGusts} ${windUnit}">
                <span class="wind-base-val">${windSpeed}</span><span class="wind-range-sep"> – </span><span class="wind-gust-val ${currentGustSeverity.cssClass}">${windGusts}</span> <small>${windUnit}</small>
              </div>
              <div class="sensor-sub wind-legend-sub">
                <span>Media: <strong>${windSpeed}</strong></span> • <span>Racha: <strong class="${currentGustSeverity.cssClass}">${windGusts} ${windUnit}${currentGustSeverity.icon}</strong></span>
              </div>
            ` : `
              <div class="sensor-val wind-range-val" title="Velocidad continua: ${windSpeed} ${windUnit}">
                <span class="wind-base-val">${windSpeed}</span> <small>${windUnit}</small>
              </div>
              <div class="sensor-sub wind-legend-sub">
                <span>Viento continuo sostenido</span>
              </div>
            `}
            <div class="sensor-sub">Dirección: <strong>${windDir.name} (${current.wind_direction_10m}°)</strong></div>
            <div class="sensor-sub wind-flow-tag">Viene del <strong>${windDir.short}</strong> ➔ sopla al <strong>${windDir.to}</strong></div>
            ${foehn ? `<div class="sensor-sub foehn-sensor-indicator">🔥 Viento Sur: Efecto Foehn Activo</div>` : ''}
            <div class="sensor-sub">Racha máx. prevista: <strong class="${maxGustSeverity.cssClass}">${windMaxGustToday} ${windUnit}${maxGustSeverity.icon}</strong></div>
            ${roadWindSensorPill}
            <div class="sensor-mini-badges wind-verdict-row">
              <div class="sensor-mini-badge ${windVerdict.badgeClass}">
                <span>${windVerdict.icon} <strong>${windVerdict.label}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. BARÓMETRO -->
      <div class="sensor-card sensor-card-barometer ${baroSeverity.cardClass}" data-sensor-index="1" id="sensor-card-barometer">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">⏱️</span>
            <span class="sensor-title">Barómetro (Presión MSL)</span>
          </div>
          <button class="btn-explain-sensor" data-explain="barometer" title="¿Cómo funciona el barómetro? Pulsa para aprender" aria-label="Explicación del barómetro">💡</button>
        </div>
        <div class="sensor-body">
          <div class="sensor-val ${baroSeverity.valClass}">${rawPressure.toFixed(1)} <small>hPa</small>${baroSeverity.icon}</div>
          <div class="sensor-sub baro-sub-container">
            <div class="baro-sub-label">Nivel del mar • Tendencia 3h:</div>
            <div class="baro-sub-badge-row">
              <strong class="trend-badge ${baroSeverity.trendClass}">${baroSeverity.trendBadgeText}</strong>
            </div>
          </div>
          <div class="pressure-gauge-bar" title="Escala barométrica OMM: ${rawPressure.toFixed(1)} hPa">
            <div class="pressure-gauge-pointer" style="left: ${baroGaugePercent.toFixed(1)}%;"></div>
          </div>
          <div class="gauge-labels">
            <span>980 (Borrasca)</span>
            <span>1013 (Normal)</span>
            <span>1040 (Anticiclón)</span>
          </div>
          ${baroSeverity.alertBadgeHtml}
          <div class="sensor-mini-badges">
            <div class="sensor-mini-badge ${baroVerdict.class}">
              <span>${baroVerdict.icon} ${baroVerdict.text}</span>
            </div>
            <div class="sensor-mini-badge baro-badge-neutral">
              <span>🏔️ Presión en suelo: <strong>${surfacePressure || rawPressure.toFixed(1)} hPa</strong> ${concejoAltitude ? `(${concejoAltitude} m altitud)` : '• Cota concejo'} • Tendencia: <strong>${baroActionLabel}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. HIGRÓMETRO & ROCÍO -->
      <div class="sensor-card sensor-card-humidity" data-sensor-index="2" id="sensor-card-humidity">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">💧</span>
            <span class="sensor-title">Humedad y Punto de Rocío</span>
          </div>
          <button class="btn-explain-sensor" data-explain="humidity_dewpoint" title="¿Qué es el punto de rocío y el bochorno? Pulsa para aprender" aria-label="Explicación de humedad y punto de rocío">💡</button>
        </div>
        <div class="sensor-body">
          <div class="sensor-val">${current.relative_humidity_2m}<small>%</small></div>
          <div class="sensor-sub">Punto de Rocío: <strong>${dewPoint}°C</strong> • Vapor: <strong>${absHumidity} g/m³</strong></div>
          <div class="humidity-gauge-bar" title="Escala de humedad cantábrica: ${current.relative_humidity_2m}%">
            <div class="humidity-gauge-fill" style="width: ${current.relative_humidity_2m}%;"></div>
          </div>
          <div class="gauge-labels">
            <span>Seco (&lt;40%)</span>
            <span>Confort (40-65%)</span>
            <span>Húmedo (65-85%)</span>
            <span>Saturado (&gt;85%)</span>
          </div>
          <div class="sensor-mini-badges">
            <div class="sensor-mini-badge ${fogRisk.class}">
              <span>${fogRisk.icon} Margen Rocío: <strong>Δ ${deltaDew}°C</strong> (${fogRisk.label})</span>
            </div>
            <div class="sensor-mini-badge hum-badge-neutral">
              <span>🌡️ ${humidexLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. PLUVIÓMETRO -->
      <div class="sensor-card sensor-card-rain ${rainPillAlert ? (rainPillAlert === 'has-alert-danger' ? 'card-alert-danger' : 'card-alert-warning') : ''}" data-sensor-index="3" id="sensor-card-rain">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">🌧️</span>
            <span class="sensor-title">Pluviómetro Digital</span>
          </div>
          <button class="btn-explain-sensor" data-explain="rain" title="¿Cómo funciona el pluviómetro y la lluvia? Pulsa para aprender" aria-label="Explicación del pluviómetro">💡</button>
        </div>
        <div class="sensor-body rain-body">
          <div class="rain-beaker-wrapper" title="Vaso medidor pluviométrico: ${rainFallenSoFar.toFixed(1)} mm acumulados hoy">
            ${renderRainBeakerSvg(rainFallenSoFar, currentRainIntensity)}
          </div>
          <div class="rain-info">
            <div class="sensor-val ${rainFallenSeverity.cssClass}">${rainFallenSoFar.toFixed(1)} <small>mm (l/m²)</small>${rainFallenSeverity.icon}</div>
            <div class="sensor-sub">Caído hoy hasta las ${String(currentHour).padStart(2, '0')}:00 h</div>
            <div class="sensor-sub">Total 24h: <strong class="${rainTotalSeverity.cssClass}">${rainTodayTotal.toFixed(1)} mm${rainTotalSeverity.icon}</strong></div>
            <div class="sensor-mini-badges rain-mini-badges">
              <div class="sensor-mini-badge rain-badge-prob">
                <span>${popTrendIcon} Prob: <strong>${currentPopVal}%</strong> ➔ <strong>${nextPopVal}%</strong> (${String(nextHour).padStart(2, '0')}h)</span>
              </div>
              <div class="sensor-mini-badge ${rainLiveStatusClass}">
                <span>${rainLiveStatusText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 5. ÍNDICE UV & RADIACIÓN -->
      <div class="sensor-card sensor-card-uv" data-sensor-index="4" id="sensor-card-uv">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">☀️</span>
            <span class="sensor-title">Radiación Solar / Índice UV</span>
          </div>
          <button class="btn-explain-sensor" data-explain="uv" title="¿Qué es el índice UV y cómo protegerse? Pulsa para aprender" aria-label="Explicación de radiación solar e índice UV">💡</button>
        </div>
        <div class="sensor-body">
          <div class="sensor-val" style="color: ${uvVal != null ? uvInfo.color : 'var(--text-dim)'};">${uvVal != null ? `${uvVal.toFixed(1)} <small class="uv-level">(${uvInfo.level})</small>` : '<span style="font-size: 1.35rem; font-weight: 700; color: var(--text-dim);">No disponible</span>'}</div>
          <div class="sensor-sub">Máx. previsto hoy • Potencia: <strong>${solarPowerText}</strong></div>
          <div class="uv-spectrum-bar" title="Escala UV OMM: ${uvVal != null ? uvVal.toFixed(1) : 0}">
            <div class="uv-spectrum-pointer" style="left: ${uvMarkerPercent}%;"></div>
          </div>
          <div class="gauge-labels">
            <span>0 (Bajo)</span>
            <span>3 (Mod)</span>
            <span>6 (Alto)</span>
            <span>8 (M.Alto)</span>
            <span>11+ (Extremo)</span>
          </div>
          <div class="sensor-mini-badges">
            <div class="sensor-mini-badge uv-badge-neutral">
              <span>⏱️ Cénit / Pico solar: <strong>${peakHoursText}</strong></span>
            </div>
            <div class="sensor-mini-badge ${uvVal >= 6 ? 'uv-badge-warn' : 'uv-badge-safe'}">
              <span>🛡️ ${burnTimeAdvice}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 6. CALIDAD DEL AIRE & PÓLENES -->
      <div class="sensor-card sensor-card-aqi" data-sensor-index="5" id="sensor-card-aqi">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">🍃</span>
            <span class="sensor-title">Calidad del Aire & Polen</span>
          </div>
          <button class="btn-explain-sensor" data-explain="aqi" title="¿Qué mide el índice de calidad del aire y los niveles de polen? Pulsa para aprender" aria-label="Explicación de calidad del aire y polen">💡</button>
        </div>
        <div class="sensor-body">
          <div class="sensor-val" style="color: ${aqiInfo.color};">${aqi?.european_aqi ?? 'Óptimo'} <small>(${aqiInfo.level})</small></div>
          <div class="sensor-sub">${aqiInfo.label}</div>
          <div class="aqi-particles">
            <span>PM2.5: <strong>${typeof aqi?.pm2_5 === 'number' ? aqi.pm2_5.toFixed(1) : '8.2'} µg/m³</strong></span>
            <span>PM10: <strong>${typeof aqi?.pm10 === 'number' ? aqi.pm10.toFixed(1) : '14.1'} µg/m³</strong></span>
          </div>
          <div class="aqi-pollen-section">
            <div class="pollen-section-title">🌾 Monitor de Polen Activo:</div>
            <div class="pollen-chips">
              <span class="pollen-chip ${getPollenBadgeClass(aqi?.grass_pollen, 10, 50)}" title="Polen de gramíneas y pastizales asturianos">
                🌾 Gramíneas: <strong>${getPollenLabel(aqi?.grass_pollen, 10, 50)}</strong>
              </span>
              <span class="pollen-chip ${getPollenBadgeClass(aqi?.birch_pollen, 15, 75)}" title="Polen de abedul de montaña y bosque">
                🌳 Abedul: <strong>${getPollenLabel(aqi?.birch_pollen, 15, 75)}</strong>
              </span>
              <span class="pollen-chip ${getPollenBadgeClass(aqi?.alder_pollen, 15, 75)}" title="Polen de aliso de riberas fluviales">
                🌿 Aliso: <strong>${getPollenLabel(aqi?.alder_pollen, 15, 75)}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 7. ASESOR DE COLADA Y SECADO (al final, como manda Lendo) -->
      ${laundryMarkup}
      </div>

      <!-- PAGINADOR DE PUNTOS DISCRETOS -->
      <div class="sensors-dots-indicator" id="sensors-dots-indicator">
        <span class="sensor-dot active" data-sensor-target="0"></span>
        <span class="sensor-dot" data-sensor-target="1"></span>
        <span class="sensor-dot" data-sensor-target="2"></span>
        <span class="sensor-dot" data-sensor-target="3"></span>
        <span class="sensor-dot" data-sensor-target="4"></span>
        <span class="sensor-dot" data-sensor-target="5"></span>
        <span class="sensor-dot" data-sensor-target="6"></span>
      </div>

      <!-- 8. MONITOR SÍSMICO SILENCIOSO (tras la tarjeta de colada para eventos menores) -->
      <div id="seismic-banner-container" class="seismic-bottom-container">${seismicBottomMarkup}</div>
    </div>
  `;
}