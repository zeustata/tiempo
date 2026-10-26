import { getWeatherInfo, renderWeatherIconHtml, getWindDirection } from '../utils/weatherIcons.js?v=2.2.69';

/**
 * Normaliza y formatea una marca de tiempo solar (ISO de Open-Meteo) a la hora civil oficial de Asturias/España,
 * corrigiendo el desfase estático de Open-Meteo en transiciones de cambio de horario estacional (marzo/octubre).
 */
export function formatCivilSunTime(isoStr, apiOffsetSeconds = 7200, targetTimezone = 'Europe/Madrid') {
  if (!isoStr || typeof isoStr !== 'string') return '--:--';

  // Si la cadena ya viene con indicador Z o desfase explícito (+01:00), Date() ya es exacto
  if (isoStr.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(isoStr)) {
    const d = new Date(isoStr);
    return isNaN(d.getTime()) ? '--:--' : d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  // Descomponer 'YYYY-MM-DDTHH:MM' (o con segundos)
  const parts = isoStr.split('T');
  if (parts.length < 2) return '--:--';

  const [year, month, day] = parts[0].split('-').map(Number);
  const timeTokens = parts[1].split(':').map(Number);
  const hour = timeTokens[0] || 0;
  const minute = timeTokens[1] || 0;
  const second = timeTokens[2] || 0;

  // Open-Meteo genera esta cadena sumando estáticamente apiOffsetSeconds a la hora astronómica UTC pura.
  // Reconstruimos el instante UTC puro restando ese desfase:
  const pseudoUtcMs = Date.UTC(year, month - 1, day, hour, minute, second);
  const realUtcMs = pseudoUtcMs - (apiOffsetSeconds * 1000);
  const realUtcDate = new Date(realUtcMs);

  if (isNaN(realUtcDate.getTime())) return '--:--';

  // Formatear en la hora civil oficial usando las reglas de la base IANA del huso destino
  return new Intl.DateTimeFormat('es-ES', {
    timeZone: targetTimezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(realUtcDate);
}

/**
 * Calcula la condición meteorológica representativa para un tramo horario (ej. mañana o tarde)
 * Gradúa la lluvia según la intensidad física en mm/hora (Orbayu vs. Moderada vs. Bastinazu)
 */
function getDaypartWeather(hourly, dayDateStr, startHour, endHour, fallbackCode, fallbackPop, fallbackRain, isDay = 1) {
  if (!hourly || !hourly.time) {
    const info = getWeatherInfo(fallbackCode, isDay, fallbackRain, fallbackPop);
    return { ...info, precipSum: fallbackRain || 0, maxPrecipPerHour: fallbackRain || 0, popMax: fallbackPop || 0 };
  }

  let hoursCount = 0;
  let popMax = 0;
  let precipSum = 0;
  let maxPrecipPerHour = 0;
  const codes = [];

  for (let i = 0; i < hourly.time.length; i++) {
    const tStr = hourly.time[i];
    if (tStr.startsWith(dayDateStr)) {
      const parts = tStr.split('T');
      const h = parts[1] ? parseInt(parts[1].split(':')[0], 10) : new Date(tStr).getHours();
      if (h >= startHour && h <= endHour) {
        hoursCount++;
        const pop = hourly.precipitation_probability ? (hourly.precipitation_probability[i] || 0) : 0;
        const p = hourly.precipitation ? (hourly.precipitation[i] || 0) : 0;
        if (pop > popMax) popMax = pop;
        precipSum += p;
        if (p > maxPrecipPerHour) maxPrecipPerHour = p;
        if (hourly.weather_code && hourly.weather_code[i] != null) {
          codes.push(hourly.weather_code[i]);
        }
      }
    }
  }

  if (hoursCount === 0 || codes.length === 0) {
    const info = getWeatherInfo(fallbackCode, isDay, fallbackRain, fallbackPop);
    return { ...info, precipSum: fallbackRain || 0, maxPrecipPerHour: fallbackRain || 0, popMax: fallbackPop || 0 };
  }

  // Determinar código representativo del tramo
  let dominantCode = codes[Math.floor(codes.length / 2)];
  if (popMax >= 20 && precipSum >= 0.1) {
    // 1. Detección de granizo o pedrisco
    const hailCode = codes.find(c => c === 89 || c === 90 || c === 96 || c === 99 || c === 77);
    // 2. Detección de aguanieve (mezcla de lluvia y nieve)
    const sleetCode = codes.find(c => c === 68 || c === 69 || c === 83 || c === 84);
    // 3. Detección de nieve
    const snowCode = codes.find(c => (c >= 71 && c <= 75) || c === 85 || c === 86);
    // 4. Detección de tormenta
    const stormCode = codes.find(c => c === 95);

    if (hailCode != null) {
      dominantCode = hailCode;
    } else if (sleetCode != null) {
      dominantCode = sleetCode;
    } else if (snowCode != null) {
      // Gradación de nieve por mm/h equivalentes del pluviómetro
      if (maxPrecipPerHour >= 2.5 || precipSum >= 3.5) {
        dominantCode = 75; // Nevadona fuerte / Copiosa
      } else if (maxPrecipPerHour >= 0.8 || precipSum >= 1.2) {
        dominantCode = 73; // Nevada moderada
      } else {
        dominantCode = 71; // Nevada ligera / Falispos
      }
    } else if (stormCode != null) {
      dominantCode = stormCode;
    } else {
      // Gradación hidrometeorológica estricta según intensidad de lluvia:
      // Bastinazu (>= 2.5 mm en una hora o tramo con >= 3.5 mm) -> Lluvia fuerte
      if (maxPrecipPerHour >= 2.5 || precipSum >= 3.5) {
        dominantCode = 65; // Lluvia fuerte / Bastinazu (5 gotas densas)
      } else if (maxPrecipPerHour >= 0.5 || precipSum >= 0.8) {
        dominantCode = 63; // Lluvia moderada (3 gotas)
      } else {
        dominantCode = 51; // Orbayu / Llovizna ligera (1 gota)
      }
    }
  } else {
    // Si no llueve, elegir el código más frecuente de nubosidad/sol
    const counts = {};
    for (const c of codes) counts[c] = (counts[c] || 0) + 1;
    dominantCode = Object.keys(counts).reduce((a, b) => counts[a] >= counts[b] ? a : b);
    dominantCode = Number(dominantCode);
  }

  const info = getWeatherInfo(dominantCode, isDay, maxPrecipPerHour, popMax);
  return { ...info, precipSum, maxPrecipPerHour, popMax };
}

/**
 * Renderiza el bloque de pronóstico horario por horas (72h / 3 días) con separadores de días
 */
export function renderHourlyForecastBlock(data, units = 'metric', iconTheme = 'astur') {
  const hourly = data.weather ? data.weather.hourly : null;
  if (!hourly || !hourly.time) return '';

  const now = new Date();
  const currentHour = now.getHours();
  const currentHourStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(currentHour).padStart(2, '0')}:00`;
  let startIndex = (hourly.time && Array.isArray(hourly.time)) ? hourly.time.findIndex(t => t >= currentHourStr) : -1;
  if (startIndex === -1) startIndex = currentHour;

  const cur = data.weather ? data.weather.current : null;
  const liveDirectIrr = cur?.direct_normal_irradiance != null ? cur.direct_normal_irradiance : null;
  const liveUv = cur?.uv_index != null ? cur.uv_index : (hourly?.uv_index && hourly.uv_index[startIndex] != null ? hourly.uv_index[startIndex] : null);
  const liveSw = cur?.shortwave_radiation != null ? cur.shortwave_radiation : null;
  const unitLabel = units === 'knots' ? 'kt' : 'km/h';

  const daily = data.weather ? data.weather.daily : null;
  const apiOffset = (data.weather && data.weather.utc_offset_seconds != null) ? data.weather.utc_offset_seconds : 7200;

  // Mapa de eventos solares por fecha 'YYYY-MM-DD'
  const sunEventsByDay = {};
  if (daily && daily.time) {
    for (let d = 0; d < daily.time.length; d++) {
      const dayKey = daily.time[d];
      const sunriseStr = daily.sunrise && daily.sunrise[d] ? formatCivilSunTime(daily.sunrise[d], apiOffset) : null;
      const sunsetStr = daily.sunset && daily.sunset[d] ? formatCivilSunTime(daily.sunset[d], apiOffset) : null;
      sunEventsByDay[dayKey] = { sunriseStr, sunsetStr };
    }
  }

  let hourlyCards = '';
  let lastDayDateStr = null;
  let prevIsDay = (startIndex > 0 && hourly.is_day && hourly.is_day[startIndex - 1] != null) ? hourly.is_day[startIndex - 1] : null;

  for (let i = startIndex; i < startIndex + 72 && i < hourly.time.length; i++) {
    const timeDate = new Date(hourly.time[i]);
    const dayDateStr = timeDate.toDateString();
    
    // Si cambia el día o al inicio del listado, insertar separador visual de día
    if (dayDateStr !== lastDayDateStr) {
      lastDayDateStr = dayDateStr;
      
      const isToday = timeDate.getDate() === now.getDate() && timeDate.getMonth() === now.getMonth();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      const isTomorrow = timeDate.getDate() === tomorrow.getDate() && timeDate.getMonth() === tomorrow.getMonth();
      
      let dayBadgeText = '';
      if (isToday) {
        dayBadgeText = 'Hoy (' + timeDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }) + ')';
      } else if (isTomorrow) {
        dayBadgeText = 'Mañana (' + timeDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }) + ')';
      } else {
        const dName = timeDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
        dayBadgeText = dName.charAt(0).toUpperCase() + dName.slice(1);
      }

      hourlyCards += `
        <div class="hourly-day-divider">
          <div class="day-divider-badge">
            <span class="day-divider-icon">📅</span>
            <span class="day-divider-text">${dayBadgeText}</span>
          </div>
        </div>
      `;
    }

    const hourLabel = timeDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const isDay = (hourly.is_day && hourly.is_day[i] != null) ? hourly.is_day[i] : (timeDate.getHours() >= 8 && timeDate.getHours() < 21 ? 1 : 0);

    // Detección de transición solar entre horas (Ocaso o Amanecer)
    if (prevIsDay !== null && prevIsDay !== isDay) {
      const isoDateKey = (hourly.time && hourly.time[i]) ? hourly.time[i].substring(0, 10) : '';
      const sunEvents = sunEventsByDay[isoDateKey] || {};

      if (prevIsDay === 1 && isDay === 0) {
        // Puesta de Sol (Ocaso)
        const sunsetText = sunEvents.sunsetStr && sunEvents.sunsetStr !== '--:--' ? `Ocaso • ${sunEvents.sunsetStr}` : 'Ocaso';
        hourlyCards += `
          <div class="hourly-sun-divider sunset">
            <div class="sun-divider-badge sunset" title="Puesta de sol prevista a las ${sunEvents.sunsetStr || ''}">
              <span class="sun-divider-icon">🌇</span>
              <span class="sun-divider-text">${sunsetText}</span>
            </div>
          </div>
        `;
      } else if (prevIsDay === 0 && isDay === 1) {
        // Salida de Sol (Amanecer)
        const sunriseText = sunEvents.sunriseStr && sunEvents.sunriseStr !== '--:--' ? `Amanecer • ${sunEvents.sunriseStr}` : 'Amanecer';
        hourlyCards += `
          <div class="hourly-sun-divider sunrise">
            <div class="sun-divider-badge sunrise" title="Salida de sol prevista a las ${sunEvents.sunriseStr || ''}">
              <span class="sun-divider-icon">🌅</span>
              <span class="sun-divider-text">${sunriseText}</span>
            </div>
          </div>
        `;
      }
    }
    prevIsDay = isDay;

    // Detección de horas crepusculares (primera y última hora de oscuridad)
    const prevDayVal = (i > 0 && hourly.is_day && hourly.is_day[i - 1] != null) ? hourly.is_day[i - 1] : isDay;
    const nextDayVal = (i + 1 < hourly.time.length && hourly.is_day && hourly.is_day[i + 1] != null) ? hourly.is_day[i + 1] : isDay;
    const isFirstNightHour = (!isDay && prevDayVal === 1);
    const isLastNightHour = (!isDay && nextDayVal === 1);

    let dayNightClass = 'is-day';
    if (!isDay) {
      if (isFirstNightHour) {
        dayNightClass = 'is-night is-twilight twilight-dusk';
      } else if (isLastNightHour) {
        dayNightClass = 'is-night is-twilight twilight-dawn';
      } else {
        dayNightClass = 'is-night';
      }
    }

    const pop = hourly.precipitation_probability ? (hourly.precipitation_probability[i] || 0) : 0;
    const precipMm = hourly.precipitation ? (hourly.precipitation[i] || 0) : 0;
    const code = hourly.weather_code[i];
    // Calibración Solar en Nowcasting: se aplica exclusivamente a la hora en curso y a la siguiente hora inmediata,
    // preservando al 100% la previsión general del modelo numérico para el resto de horas y días.
    const isImmediateNextHour = (i === startIndex || i === startIndex + 1);
    const useDirectIrr = isImmediateNextHour ? liveDirectIrr : null;
    const useUv = isImmediateNextHour ? liveUv : null;
    const useSw = isImmediateNextHour ? liveSw : null;

    const cloudCoverHour = (hourly.cloud_cover && hourly.cloud_cover[i] != null) ? hourly.cloud_cover[i] : null;
    const humHour = (hourly.relative_humidity_2m && hourly.relative_humidity_2m[i] != null) ? hourly.relative_humidity_2m[i] : null;
    const visHour = (hourly.visibility && hourly.visibility[i] != null) ? hourly.visibility[i] : null;
    const weather = getWeatherInfo(code, isDay, precipMm, pop, useDirectIrr, useUv, useSw, cloudCoverHour, humHour, visHour);
    const temp = Math.round(hourly.temperature_2m[i]);
    const windSpeed = units === 'knots' ? (hourly.wind_speed_10m[i] * 0.539957).toFixed(0) : Math.round(hourly.wind_speed_10m[i]);
    const windDeg = (hourly.wind_direction_10m && hourly.wind_direction_10m[i] != null) ? hourly.wind_direction_10m[i] : 0;
    const windDir = getWindDirection(windDeg);

    hourlyCards += `
      <div class="hourly-card ${dayNightClass}">
        <span class="h-time">${hourLabel}</span>
        <span class="h-icon" title="${weather.label}${precipMm >= 0.1 ? ` (${precipMm.toFixed(1)} mm)` : ''}">${renderWeatherIconHtml(weather, 28, iconTheme)}</span>
        <span class="h-temp">${temp}°C</span>
        <div class="h-pop ${pop >= 40 ? 'pop-high' : ''}" title="Probabilidad de lluvia">
          <span class="pop-drop">💧</span>
          <span>${pop}%</span>
        </div>
        <div class="h-precip ${precipMm >= 2.0 ? 'precip-heavy' : (precipMm >= 0.1 ? 'precip-active' : '')}" title="Volumen de lluvia previsto: ${precipMm.toFixed(1)} mm">
          <span>${precipMm >= 0.1 ? `${precipMm.toFixed(1)} mm` : '0.0 mm'}</span>
        </div>
        <span class="h-wind" title="Viento del ${windDir.name} (${Math.round(windDeg)}°), sopla hacia el ${windDir.toName} a ${windSpeed} ${unitLabel}">
          <svg class="h-wind-arrow" style="transform: rotate(${Math.round(windDeg + 180)}deg);" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
            <path d="M12 2L5 13h4.5v9h5v-9H19L12 2z" fill="currentColor"/>
          </svg>
          <span class="h-wind-dir">${windDir.short}</span>
          <span class="h-wind-val">${windSpeed} ${unitLabel}</span>
        </span>
      </div>
    `;
  }

  let isChartMode = false;
  try {
    isChartMode = typeof localStorage !== 'undefined' && localStorage.getItem('meteoastur_hourly_view') === 'chart';
  } catch (e) {}

  return `
    <div class="forecast-block live-hourly-block" id="live-hourly-container">
      <div class="hourly-header-bar">
        <div class="hourly-title-group">
          <h3 class="section-heading live-hourly-heading">⏱️ Pronóstico Horario (72 Horas)</h3>
          <span class="section-subtitle">Evolución hora a hora en tarjetas dinámicas o curvas</span>
        </div>

        <!-- CONMUTADOR ERGONÓMICO DE VISTA HORARIA -->
        <div class="hourly-view-switcher" role="tablist" aria-label="Modo de visualización horaria">
          <button type="button" class="btn-hourly-mode ${!isChartMode ? 'active' : ''}" id="btn-mode-cards" data-mode="cards" aria-selected="${!isChartMode ? 'true' : 'false'}" title="Ver pronóstico en tarjetas horarias">
            <span class="mode-icon">📋</span>
            <span class="mode-label">Tarjetas</span>
          </button>
          <button type="button" class="btn-hourly-mode ${isChartMode ? 'active' : ''}" id="btn-mode-chart" data-mode="chart" aria-selected="${isChartMode ? 'true' : 'false'}" title="Ver suite interactiva de curvas y tendencias">
            <span class="mode-icon">📈</span>
            <span class="mode-label">Curvas</span>
          </button>
        </div>
      </div>

      <!-- VISTA 1: CARRUSEL DE TARJETAS HORARIAS -->
      <div class="hourly-scroll-container" id="hourly-cards-view" style="${isChartMode ? 'display: none;' : ''}">
        ${hourlyCards}
      </div>

      <!-- VISTA 2: OBSERVATORIO DE CURVAS MULTIVARIABLE (METEOROLOGÍA GRÁFICA) -->
      <div class="hourly-chart-view" id="hourly-chart-view" style="${!isChartMode ? 'display: none;' : ''}">
        <div class="chart-card embedded-chart-card">
          <div class="chart-header-block">
            <div class="chart-controls-bar">
              <!-- SELECTOR DESPLEGABLE DE VARIABLES -->
              <div class="chart-var-dropdown-wrapper" id="chart-var-dropdown-wrapper">
                <button type="button" class="chart-var-dropdown-btn" id="chart-var-dropdown-btn" aria-haspopup="true" aria-expanded="false">
                  <span id="chart-active-var-text">🌡️ Térmico</span>
                  <span class="dropdown-arrow">▾</span>
                </button>
                <div class="chart-var-dropdown-menu" id="chart-var-dropdown-menu" style="display: none;">
                  <button type="button" class="chart-var-item active" data-chart="thermal">
                    <span>🌡️ Térmico (Temp. & Sensación)</span>
                    <span class="item-check">✓</span>
                  </button>
                  <button type="button" class="chart-var-item" data-chart="precip">
                    <span>🌧️ Lluvia (Hidrograma & Acumulado)</span>
                    <span class="item-check"></span>
                  </button>
                  <button type="button" class="chart-var-item" data-chart="wind">
                    <span>💨 Viento (Velocidad & Rachas)</span>
                    <span class="item-check"></span>
                  </button>
                  <button type="button" class="chart-var-item" data-chart="pressure">
                    <span>⏱️ Barómetro (Presión Atmosférica)</span>
                    <span class="item-check"></span>
                  </button>
                  <button type="button" class="chart-var-item" data-chart="snow">
                    <span>🏔️ Nieve & Cota (Altitud & Espesor)</span>
                    <span class="item-check"></span>
                  </button>
                  <button type="button" class="chart-var-item" data-chart="clouds">
                    <span>☁️ Nubosidad (Baja, Media & Alta)</span>
                    <span class="item-check"></span>
                  </button>
                  <button type="button" class="chart-var-item" data-chart="multi">
                    <span>📊 Combinado (Multivariable Clásico)</span>
                    <span class="item-check"></span>
                  </button>
                </div>
              </div>

              <!-- SELECTOR DE RANGO DE HORAS -->
              <div class="chart-range-selector" role="group" aria-label="Rango de horas">
                <button class="chart-range-btn" data-hours="24">24h</button>
                <button class="chart-range-btn active" data-hours="48">48h</button>
                <button class="chart-range-btn" data-hours="72">72h</button>
              </div>
            </div>
          </div>

          <!-- TITULARES INTELIGENTES / HITOS CLAVE HORARIOS (SMART DIGEST) -->
          <div class="chart-smart-digest" id="chart-smart-digest"></div>

          <!-- BARRA DE LECTURA DIRECTA DE DATOS (LIVE INSPECTOR READOUT) -->
          <div class="chart-live-readout" id="chart-live-readout">
            <span class="readout-idle">👆 Toca o desliza la curva para ver el detalle de cada hora</span>
          </div>

          <!-- EL GRÁFICO INMEDIATAMENTE VISIBLE (CON PISTA HORARIA SINCRONIZADA DE CIELO Y VIENTO) -->
          <div class="chart-scroll-viewport" id="chart-scroll-viewport">
            <div class="chart-canvas-wrapper" id="chart-canvas-wrapper">
              <!-- CINTA SUPERIOR SINCRONIZADA DE CIELO Y VIENTO -->
              <div class="chart-sky-timeline" id="chart-sky-timeline"></div>
              <canvas id="meteo-chart-canvas"></canvas>
            </div>
          </div>

          <!-- MÉTRICAS DE RESUMEN EN REJILLA COMPACTA 2x2 DEBAJO DEL GRÁFICO -->
          <div class="chart-summary-strip" id="chart-summary-strip"></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renderiza el pronóstico extendido a 10 días con desglose mañana y tarde
 */
export function renderForecast(data, units = 'metric', iconTheme = 'astur') {
  const hourly = data.weather ? data.weather.hourly : null;
  const daily = data.weather ? data.weather.daily : null;
  if (!daily || !daily.time) return '';

  const now = new Date();
  const unitLabel = units === 'knots' ? 'kt' : 'km/h';

  // Pronóstico Diario (Tarjetas Visuales a 10 Días con desglose Mañana / Tarde)
  let dailyCards = '';

  for (let d = 0; d < daily.time.length; d++) {
    const dayDateStr = daily.time[d];
    const dayDate = new Date(dayDateStr);
    const isToday = d === 0;
    const isTomorrow = d === 1;
    
    // Título y fecha
    const dayTitle = isToday ? 'Hoy' : isTomorrow ? 'Mañana' : dayDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const dayFormatted = dayDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    
    const maxT = Math.round(daily.temperature_2m_max[d]);
    const minT = Math.round(daily.temperature_2m_min[d]);
    const rain = (daily.precipitation_sum[d] || 0).toFixed(1);
    const popMax = daily.precipitation_probability_max ? daily.precipitation_probability_max[d] : 0;
    
    // Desglose de tiempo en 3 tramos: 
    // 🌙 Noche y Madrugada (00:00 a 08:00)
    // 🌅 Mañana (08:00 a 15:00)
    // 🌇 Tarde y Noche temprana (15:00 a 24:00)
    const nightWeather = getDaypartWeather(hourly, dayDateStr, 0, 7, daily.weather_code[d], popMax, parseFloat(rain), 0);
    const morningWeather = getDaypartWeather(hourly, dayDateStr, 8, 14, daily.weather_code[d], popMax, parseFloat(rain), 1);
    const afternoonWeather = getDaypartWeather(hourly, dayDateStr, 15, 23, daily.weather_code[d], popMax, parseFloat(rain), 1);
    const isSnowDay = nightWeather.isSnow || morningWeather.isSnow || afternoonWeather.isSnow || (daily.snowfall_sum && daily.snowfall_sum[d] > 0);
    const nightLabel = (nightWeather.label || '').split('/')[0].trim();
    const morningLabel = (morningWeather.label || '').split('/')[0].trim();
    const afternoonLabel = (afternoonWeather.label || '').split('/')[0].trim();
    
    const windSpeedRaw = daily.wind_speed_10m_max ? daily.wind_speed_10m_max[d] : 0;
    const windGustRaw = daily.wind_gusts_10m_max ? daily.wind_gusts_10m_max[d] : 0;
    const windSpeed = units === 'knots' ? (windSpeedRaw * 0.539957).toFixed(0) : Math.round(windSpeedRaw);
    const windGust = units === 'knots' ? (windGustRaw * 0.539957).toFixed(0) : Math.round(windGustRaw);

    const uvMax = daily.uv_index_max ? Math.round(daily.uv_index_max[d]) : null;
    let uvText = 'Bajo';
    let uvClass = 'uv-low';
    if (uvMax >= 8) { uvText = 'Muy Alto'; uvClass = 'uv-very-high'; }
    else if (uvMax >= 6) { uvText = 'Alto'; uvClass = 'uv-high'; }
    else if (uvMax >= 3) { uvText = 'Mod.'; uvClass = 'uv-mod'; }

    const apiOffset = (data.weather && data.weather.utc_offset_seconds != null) ? data.weather.utc_offset_seconds : 7200;
    let sunriseStr = '--:--';
    let sunsetStr = '--:--';
    if (daily.sunrise && daily.sunrise[d]) {
      sunriseStr = formatCivilSunTime(daily.sunrise[d], apiOffset);
    }
    if (daily.sunset && daily.sunset[d]) {
      sunsetStr = formatCivilSunTime(daily.sunset[d], apiOffset);
    }

    dailyCards += `
      <div class="daily-card-rich ${isToday ? 'is-today' : ''}">
        <!-- CABECERA DE LA TARJETA -->
        <div class="d-card-header">
          <div class="d-date-block">
            <div class="d-day-name-row">
              <span class="d-day-name">${dayTitle}</span>
              ${isToday ? '<span class="today-pill">HOY</span>' : ''}
              ${isTomorrow ? '<span class="tomorrow-pill">MAÑANA</span>' : ''}
            </div>
            <span class="d-date-sub">${dayFormatted}</span>
          </div>
        </div>

        <!-- TRES BOTONES INDEPENDIENTES PARA NOCHE, MAÑANA Y TARDE -->
        <div class="d-dayparts-container">
          <!-- Botón Noche -->
          <div class="d-daypart-btn night" title="Previsión Noche (00:00 - 08:00): ${nightWeather.label}${nightWeather.precipSum >= 0.1 ? ` • ${nightWeather.precipSum.toFixed(1)} mm` : ''}">
            <div class="d-dp-header">
              <span class="d-dp-tag">🌙 NOCHE <span class="d-dp-hours">(00h - 08h)</span></span>
              <span class="d-dp-precip ${nightWeather.precipSum >= 0.1 ? (nightWeather.svgKey === 'hail' ? 'has-hail' : (nightWeather.svgKey === 'sleet' ? 'has-sleet' : (nightWeather.isSnow || nightWeather.svgKey.includes('snow') ? (nightWeather.precipSum >= 2.5 ? 'heavy-snow' : 'has-snow') : (nightWeather.precipSum >= 2.5 ? 'heavy-rain' : 'has-rain')))) : ''}">
                ${nightWeather.precipSum >= 0.1 ? nightWeather.precipSum.toFixed(1) + ' mm' : '0 mm'}
              </span>
            </div>
            <div class="d-dp-body">
              <span class="d-dp-icon">${renderWeatherIconHtml(nightWeather, 24, iconTheme)}</span>
              <span class="d-dp-desc">${nightWeather.label}</span>
            </div>
          </div>

          <!-- Botón Mañana -->
          <div class="d-daypart-btn morning" title="Previsión Mañana (08:00 - 15:00): ${morningWeather.label}${morningWeather.precipSum >= 0.1 ? ` • ${morningWeather.precipSum.toFixed(1)} mm` : ''}">
            <div class="d-dp-header">
              <span class="d-dp-tag">🌅 MAÑANA <span class="d-dp-hours">(08h - 15h)</span></span>
              <span class="d-dp-precip ${morningWeather.precipSum >= 0.1 ? (morningWeather.svgKey === 'hail' ? 'has-hail' : (morningWeather.svgKey === 'sleet' ? 'has-sleet' : (morningWeather.isSnow || morningWeather.svgKey.includes('snow') ? (morningWeather.precipSum >= 2.5 ? 'heavy-snow' : 'has-snow') : (morningWeather.precipSum >= 2.5 ? 'heavy-rain' : 'has-rain')))) : ''}">
                ${morningWeather.precipSum >= 0.1 ? morningWeather.precipSum.toFixed(1) + ' mm' : '0 mm'}
              </span>
            </div>
            <div class="d-dp-body">
              <span class="d-dp-icon">${renderWeatherIconHtml(morningWeather, 24, iconTheme)}</span>
              <span class="d-dp-desc">${morningWeather.label}</span>
            </div>
          </div>

          <!-- Botón Tarde -->
          <div class="d-daypart-btn afternoon" title="Previsión Tarde (15:00 - 00:00): ${afternoonWeather.label}${afternoonWeather.precipSum >= 0.1 ? ` • ${afternoonWeather.precipSum.toFixed(1)} mm` : ''}">
            <div class="d-dp-header">
              <span class="d-dp-tag">🌇 TARDE <span class="d-dp-hours">(15h - 00h)</span></span>
              <span class="d-dp-precip ${afternoonWeather.precipSum >= 0.1 ? (afternoonWeather.svgKey === 'hail' ? 'has-hail' : (afternoonWeather.svgKey === 'sleet' ? 'has-sleet' : (afternoonWeather.isSnow || afternoonWeather.svgKey.includes('snow') ? (afternoonWeather.precipSum >= 2.5 ? 'heavy-snow' : 'has-snow') : (afternoonWeather.precipSum >= 2.5 ? 'heavy-rain' : 'has-rain')))) : ''}">
                ${afternoonWeather.precipSum >= 0.1 ? afternoonWeather.precipSum.toFixed(1) + ' mm' : '0 mm'}
              </span>
            </div>
            <div class="d-dp-body">
              <span class="d-dp-icon">${renderWeatherIconHtml(afternoonWeather, 24, iconTheme)}</span>
              <span class="d-dp-desc">${afternoonWeather.label}</span>
            </div>
          </div>
        </div>

        <!-- PANEL ÚNICO UNIFICADO (TEMPERATURAS + MÉTRICAS) -->
        <div class="d-unified-panel">
          <!-- Fila 1: Temperaturas (Mínima a la izquierda, Máxima a la derecha) -->
          <div class="d-unified-temps-row">
            <div class="u-temp-item min" title="Temperatura Mínima">
              <span class="u-temp-icon">🔻</span>
              <span class="u-temp-label">Mín</span>
              <span class="u-temp-val">${minT}°</span>
            </div>
            <div class="u-temp-item max" title="Temperatura Máxima">
              <span class="u-temp-icon">🔺</span>
              <span class="u-temp-label">Máx</span>
              <span class="u-temp-val">${maxT}°</span>
            </div>
          </div>

          <div class="d-unified-divider"></div>

          <!-- Fila 2: Métricas Integradas -->
          <div class="d-unified-metrics-grid">
            <div class="u-metric-item u-metric-rain ${popMax >= 40 ? 'metric-rain-active' : ''}" title="Probabilidad de precipitación y acumulado total del día">
              <span class="u-m-icon">${isSnowDay ? '❄️' : '💧'}</span>
              <div class="u-m-info">
                <span class="u-m-val">${popMax}%</span>
                <span class="u-m-sub">${rain > 0 ? rain + ' mm' : '0 mm'}</span>
              </div>
            </div>

            <div class="u-metric-item u-metric-wind" title="Viento medio y rachas máximas: ${windSpeed} ${unitLabel}, rachas hasta ${windGust} ${unitLabel}">
              <span class="u-m-icon">💨</span>
              <div class="u-m-info">
                <span class="u-m-val">${windSpeed} <small class="u-m-unit">${unitLabel}</small></span>
                <span class="u-m-sub">Racha <strong>${windGust}</strong></span>
              </div>
            </div>

            ${uvMax !== null ? `
            <div class="u-metric-item u-metric-uv" title="Índice Ultravioleta Máximo">
              <span class="u-m-icon">☀️</span>
              <div class="u-m-info">
                <span class="u-m-val">UV ${uvMax}</span>
                <span class="u-m-sub">${uvText}</span>
              </div>
            </div>
            ` : ''}

            <div class="u-metric-item u-metric-sun" title="Salida (Orto) y Puesta de Sol (Ocaso)">
              <div class="u-sun-times-column">
                <div class="u-sun-item sunrise">
                  <span class="u-sun-icon">🌅</span>
                  <span class="u-sun-val">${sunriseStr}</span>
                </div>
                <div class="u-sun-item sunset">
                  <span class="u-sun-icon">🌇</span>
                  <span class="u-sun-val">${sunsetStr}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="forecast-section">
      <!-- 10 DÍAS (TARJETAS ENRIQUECIDAS VERTICALES) -->
      <div class="forecast-block">
        <div class="section-title-wrap">
          <div>
            <h3 class="section-heading">📅 Pronóstico a 10 Días</h3>
            <span class="section-subtitle">Evolución diaria completa • Modelo ECMWF / ICON</span>
          </div>
        </div>
        <div class="daily-cards-container">
          ${dailyCards}
        </div>
        <div class="forecast-scroll-hint">
          <span class="hint-hand">👉</span>
          <span>Desliza horizontalmente para ver los 10 días</span>
          <span class="hint-arrow">➔</span>
        </div>
      </div>
    </div>
  `;
}