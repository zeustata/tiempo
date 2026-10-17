import { getWeatherInfo, renderWeatherIconHtml, getWindDirection, getUVDescription, getAQIDescription } from '../utils/weatherIcons.js?v=2.1.6';
import { getAemetAlertStatus, renderAemetAlertCard } from '../utils/weatherAlerts.js?v=1.1.76';
import { renderHourlyForecastBlock } from './forecastView.js?v=2.2.1';
import { detectFoehnEffect, renderFoehnBanner } from '../utils/foehnDetector.js?v=2.2.38';
import { detectGalernaEffect, renderGalernaBanner } from '../utils/galernaDetector.js?v=2.2.38';
import { detectXeluEffect, renderXeluBanner } from '../utils/xeluDetector.js?v=2.2.38';
import { detectSnowStatus, renderSnowBanner } from '../utils/snowDetector.js?v=2.2.38';
import { detectBorrinaEffect, renderBorrinaBanner } from '../utils/borrinaDetector.js?v=2.2.38b';
import { detectMarFondoEffect, renderMarFondoBanner } from '../utils/marFondoDetector.js?v=2.2.38';
import { detectThunderstormEffect, renderThunderstormBanner } from '../utils/thunderstormDetector.js?v=2.2.38';
import { detectRoadWindStatus, renderRoadWindBanner, renderRoadWindSensorPill } from '../utils/roadWindDetector.js?v=2.2.38';
import { getSeismicStatus, renderSeismicBanner } from '../utils/seismicDetector.js?v=2.2.38';
import { calculateLaundryDrying, renderLaundryCard } from '../utils/laundryAdvisor.js?v=2.2.12';
import { getClimatologyContext, renderClimatologyStrip } from '../utils/climatologyData.js?v=1.1.60';
import { calculateUmbrellaStatus, renderUmbrellaCard } from '../utils/umbrellaAdvisor.js?v=1.1.60';
import { checkConcejoFolixa } from '../utils/festivosData.js?v=1.1.85';

/**
 * Formatea el título del concejo subordinando las localidades entre paréntesis (ej. Piedras Blancas / Salinas)
 */
function formatLocationTitle(name) {
  if (!name) return '';
  const match = name.match(/^(.*?)\s*(\(.*?\))$/);
  if (match) {
    return `${match[1]} <span class="location-locality">${match[2]}</span>`;
  }
  return name;
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
 * Renderiza el dashboard principal con alineación uniforme y todos los sensores de la estación
 */
export function renderCurrentWeather(data, concejo, units = 'metric', iconTheme = 'astur') {
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

  // Calcular tendencia barométrica
  let baroTrend = { text: 'Estable', icon: '→', class: 'trend-stable' };
  if (hourly && hourly.pressure_msl && hourly.pressure_msl.length > 3) {
    const currentPress = current.pressure_msl;
    const pastPress = hourly.pressure_msl[Math.max(0, new Date().getHours() - 3)] || currentPress;
    const diff = currentPress - pastPress;
    if (diff > 0.8) baroTrend = { text: `+${diff.toFixed(1)} hPa (Subiendo)`, icon: '↗', class: 'trend-up' };
    else if (diff < -0.8) baroTrend = { text: `${diff.toFixed(1)} hPa (Bajando rápido)`, icon: '↘', class: 'trend-down' };
    else baroTrend = { text: `${diff >= 0 ? '+' : ''}${diff.toFixed(1)} hPa (Estable)`, icon: '→', class: 'trend-stable' };
  }

  // Conversión de viento a nudos si se solicita
  const rawSpeed = current.wind_speed_10m != null ? current.wind_speed_10m : 0;
  const rawGusts = current.wind_gusts_10m != null ? current.wind_gusts_10m : rawSpeed;
  const rawMaxGustToday = (daily.wind_gusts_10m_max && daily.wind_gusts_10m_max[0] != null) ? daily.wind_gusts_10m_max[0] : rawGusts;
  const windSpeed = units === 'knots' ? (rawSpeed * 0.539957).toFixed(1) : rawSpeed.toFixed(1);
  const windGusts = units === 'knots' ? (rawGusts * 0.539957).toFixed(1) : rawGusts.toFixed(1);
  const windMaxGustToday = units === 'knots' ? (rawMaxGustToday * 0.539957).toFixed(1) : rawMaxGustToday.toFixed(1);
  const windUnit = units === 'knots' ? 'kt' : 'km/h';
  const hasDistinctGust = parseFloat(windGusts) > parseFloat(windSpeed);

  // Punto de rocío actual (aproximado por Magnus-Tetens)
  const T = current.temperature_2m;
  const RH = current.relative_humidity_2m;
  const a = 17.27, b = 237.7;
  const alpha = ((a * T) / (b + T)) + Math.log(RH / 100);
  const dewPoint = ((b * alpha) / (a - alpha)).toFixed(1);

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
  if (hourly && Array.isArray(hourly.precipitation) && Array.isArray(hourly.time)) {
    for (let i = 0; i < hourly.time.length; i++) {
      if (hourly.time[i].startsWith(todayPrefix)) {
        const hourPart = parseInt(hourly.time[i].substring(11, 13), 10);
        if (hourPart <= currentHour) {
          rainFallenSoFar += (parseFloat(hourly.precipitation[i]) || 0);
        }
      }
    }
  }
  rainFallenSoFar = Math.round(rainFallenSoFar * 10) / 10;
  const rainTodayTotal = (daily && daily.precipitation_sum && daily.precipitation_sum[0] != null) ? daily.precipitation_sum[0] : 0;
  const currentPopVal = (hourly && hourly.precipitation_probability && hourly.precipitation_probability[currentHour] != null) ? hourly.precipitation_probability[currentHour] : 0;
  const nextHour = (currentHour + 1) % 24;
  const nextPopVal = (hourly && hourly.precipitation_probability && hourly.precipitation_probability[currentHour + 1] != null) ? hourly.precipitation_probability[currentHour + 1] : currentPopVal;
  const currentRainIntensity = current.precipitation != null ? current.precipitation : 0;

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
    if (l === 'orange') return 2; // 🟠 NARANJA
    if (l === 'yellow' || l === 'warning' || l === 'amber') return 1; // 🟡 AMARILLO
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

  return `
    <!-- HERO WEATHER CARD (Tiempo, Ubicación y Temperatura) -->
    <div class="hero-weather-card ${weatherInfo.bg}">
      <div class="hero-top-row">
        <div class="hero-location-block">
          <span class="location-badge">${concejo.badge}</span>
          <h2 class="location-title">${formatLocationTitle(concejo.name)}</h2>
          <p class="location-meta">Altitud: ${concejo.altitude} m • ${concejo.region}</p>
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
          <div class="condition-name" title="${weatherInfo.isSolarCalibrated ? (weatherInfo.isResol ? '☀️ Calibración Solar Inteligente: Resol / Sol tamizado activo atravesando las nubes con radiación solar directa en superficie' : '☀️ Calibración Solar Inteligente: Sensores físicos en tierra confirman sol y claros') : ''}">${weatherInfo.label}</div>
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

    <!-- TARJETA OFICIAL AEMET EN ESTADO SILENCIOSO / SIN AVISOS (si tiene avisos activos, ya se muestra arriba ordenada por gravedad) -->
    ${(!aemetStatus || !aemetStatus.hasAlerts) ? aemetCardMarkup : ''}

    <!-- SENSORS GRID -->
    <div class="sensors-grid">
      <!-- 1. ANEMÓMETRO Y DIRECCIÓN -->
      <div class="sensor-card">
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
              <div class="compass-axis-v"></div>
              <div class="compass-axis-h"></div>
              <span class="compass-cardinal card-n">N</span>
              <span class="compass-cardinal card-e">E</span>
              <span class="compass-cardinal card-s">S</span>
              <span class="compass-cardinal card-w">O</span>
              <div class="compass-needle" style="transform: rotate(${current.wind_direction_10m}deg);">
                <svg class="wind-arrow-svg" viewBox="0 0 92 92" width="92" height="92" aria-hidden="true">
                  <!-- Origen / Cola de veleta en el borde exterior (donde entra el viento) -->
                  <path d="M40 15 L46 23 L52 15 L46 12 Z" fill="#94a3b8" stroke="#cbd5e1" stroke-width="1" />
                  <circle cx="46" cy="23" r="2" fill="#f59e0b" />
                  <!-- Fuste aerodinámico -->
                  <line x1="46" y1="23" x2="46" y2="36" stroke="#38bdf8" stroke-width="2.8" stroke-linecap="round" />
                  <!-- Punta de flecha apuntando directamente al centro (hacia el observador) -->
                  <polygon points="46,43 39,32 46,35 53,32" fill="#38bdf8" stroke="#0284c7" stroke-width="1" />
                </svg>
              </div>
              <div class="compass-center-dot"></div>
            </div>
          </div>
          <div class="wind-info">
            ${hasDistinctGust ? `
              <div class="sensor-val wind-range-val" title="Velocidad media sostenida: ${windSpeed} ${windUnit} • Racha actual: ${windGusts} ${windUnit}">
                <span class="wind-base-val">${windSpeed}</span><span class="wind-range-sep"> – </span><span class="wind-gust-val">${windGusts}</span> <small>${windUnit}</small>
              </div>
              <div class="sensor-sub wind-legend-sub">
                <span>Media: <strong>${windSpeed}</strong></span> • <span>Racha: <strong>${windGusts} ${windUnit}</strong></span>
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
            <div class="sensor-sub">Racha máx. prevista: <strong>${windMaxGustToday} ${windUnit}</strong></div>
            ${roadWindSensorPill}
          </div>
        </div>
      </div>

      <!-- 2. BARÓMETRO -->
      <div class="sensor-card">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">⏱️</span>
            <span class="sensor-title">Barómetro (Presión MSL)</span>
          </div>
          <button class="btn-explain-sensor" data-explain="barometer" title="¿Cómo funciona el barómetro? Pulsa para aprender" aria-label="Explicación del barómetro">💡</button>
        </div>
        <div class="sensor-body">
          <div class="sensor-val">${current.pressure_msl != null ? current.pressure_msl.toFixed(1) : '1013.0'} <small>hPa</small></div>
          <div class="sensor-sub">Nivel del mar • Tendencia: <strong class="${baroTrend.class}">${baroTrend.text}</strong></div>
          <div class="pressure-gauge-bar">
            <div class="gauge-fill" style="width: ${Math.min(100, Math.max(0, ((current.pressure_msl - 980) / (1040 - 980)) * 100))}%;"></div>
          </div>
          <div class="gauge-labels">
            <span>980 (Borrasca)</span>
            <span>1013 (Normal)</span>
            <span>1040 (Anticiclón)</span>
          </div>
        </div>
      </div>

      <!-- 3. HIGRÓMETRO & ROCÍO -->
      <div class="sensor-card">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">💧</span>
            <span class="sensor-title">Humedad y Punto de Rocío</span>
          </div>
          <button class="btn-explain-sensor" data-explain="humidity_dewpoint" title="¿Qué es el punto de rocío y el bochorno? Pulsa para aprender" aria-label="Explicación de humedad y punto de rocío">💡</button>
        </div>
        <div class="sensor-body">
          <div class="sensor-val">${current.relative_humidity_2m}<small>%</small></div>
          <div class="sensor-sub">Punto de Rocío: <strong>${dewPoint}°C</strong></div>
          <div class="humidity-progress">
            <div class="hum-bar" style="width: ${current.relative_humidity_2m}%;"></div>
          </div>
          <div class="sensor-hint">
            ${current.relative_humidity_2m > 85 ? 'Humedad cantábrica muy alta (ambiente propicio para orpín/borrina)' : 'Nivel de humedad confortable'}
          </div>
        </div>
      </div>

      <!-- 4. PLUVIÓMETRO -->
      <div class="sensor-card">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">🌧️</span>
            <span class="sensor-title">Pluviómetro Digital</span>
          </div>
          <button class="btn-explain-sensor" data-explain="rain" title="¿Cómo funciona el pluviómetro y la lluvia? Pulsa para aprender" aria-label="Explicación del pluviómetro">💡</button>
        </div>
        <div class="sensor-body">
          <div class="sensor-val">${rainFallenSoFar.toFixed(1)} <small>mm (l/m²)</small></div>
          <div class="sensor-sub">Agua caída hoy hasta las ${String(currentHour).padStart(2, '0')}:00 h</div>
          <div class="sensor-sub" style="margin-top: 4px;">
            Total previsto hoy (24h): <strong>${rainTodayTotal.toFixed(1)} mm</strong>
          </div>
          <div class="sensor-sub" style="margin-top: 6px; padding: 4px 8px; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 6px; font-size: 0.80rem;">
            Probabilidad: <strong>${currentPopVal}%</strong> (${String(currentHour).padStart(2, '0')}h) ➔ <strong>${nextPopVal}%</strong> (${String(nextHour).padStart(2, '0')}h)
          </div>
          <div class="sensor-sub" style="margin-top: 4px;">
            Intensidad en vivo: <strong>${currentRainIntensity > 0 ? `${currentRainIntensity.toFixed(1)} mm/h` : 'Sin lluvia en este momento'}</strong>
          </div>
        </div>
      </div>

      <!-- 5. ÍNDICE UV & RADIACIÓN -->
      <div class="sensor-card">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">☀️</span>
            <span class="sensor-title">Radiación Solar / Índice UV</span>
          </div>
          <button class="btn-explain-sensor" data-explain="uv" title="¿Qué es el índice UV y cómo protegerse? Pulsa para aprender" aria-label="Explicación de radiación solar e índice UV">💡</button>
        </div>
        <div class="sensor-body">
          <div class="sensor-val" style="color: ${uvVal != null ? uvInfo.color : 'var(--text-dim)'};">${uvVal != null ? `${uvVal.toFixed(1)} <small class="uv-level">(${uvInfo.level})</small>` : '<span style="font-size: 1.35rem; font-weight: 700; color: var(--text-dim);">No disponible</span>'}</div>
          <div class="sensor-sub">${uvVal != null ? 'Máximo previsto en la jornada' : 'No computado por este modelo'}</div>
          <div class="sensor-hint" style="border-left: 3px solid ${uvVal != null ? uvInfo.color : 'rgba(148, 163, 184, 0.4)'}; padding-left: 8px; margin-top: 8px;">
            ${uvInfo.advice}
          </div>
        </div>
      </div>

      <!-- 6. CALIDAD DEL AIRE & PÓLENES -->
      <div class="sensor-card">
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

      <!-- 8. MONITOR SÍSMICO SILENCIOSO (tras la tarjeta de colada para eventos menores) -->
      <div id="seismic-banner-container" class="seismic-bottom-container">${seismicBottomMarkup}</div>
    </div>
  `;
}