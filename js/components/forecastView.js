import { getWeatherInfo, renderWeatherIconHtml, getWindDirection } from '../utils/weatherIcons.js?v=1.0.78';

/**
 * Calcula la condición meteorológica representativa para un tramo horario (ej. mañana o tarde)
 */
function getDaypartWeather(hourly, dayDateStr, startHour, endHour, fallbackCode, fallbackPop, fallbackRain) {
  if (!hourly || !hourly.time) {
    return getWeatherInfo(fallbackCode, 1, fallbackRain, fallbackPop);
  }

  let hoursCount = 0;
  let popMax = 0;
  let precipSum = 0;
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
        if (hourly.weather_code && hourly.weather_code[i] != null) {
          codes.push(hourly.weather_code[i]);
        }
      }
    }
  }

  if (hoursCount === 0 || codes.length === 0) {
    return getWeatherInfo(fallbackCode, 1, fallbackRain, fallbackPop);
  }

  // Determinar código representativo del tramo
  let dominantCode = codes[Math.floor(codes.length / 2)];
  if (popMax >= 20 && precipSum >= 0.1) {
    // Si hay lluvia representativa, priorizar código de lluvia o tormenta
    const rainCode = codes.find(c => (c >= 51 && c <= 67) || (c >= 80 && c <= 82) || (c >= 95 && c <= 99));
    if (rainCode != null) dominantCode = rainCode;
  } else {
    // Si no llueve, elegir el código más frecuente de nubosidad/sol
    const counts = {};
    for (const c of codes) counts[c] = (counts[c] || 0) + 1;
    dominantCode = Object.keys(counts).reduce((a, b) => counts[a] >= counts[b] ? a : b);
    dominantCode = Number(dominantCode);
  }

  return getWeatherInfo(dominantCode, 1, precipSum, popMax);
}

/**
 * Renderiza el pronóstico por horas (24h) y las tarjetas enriquecidas a 10 días
 */
export function renderForecast(data, units = 'metric', iconTheme = 'astur') {
  const hourly = data.weather.hourly;
  const daily = data.weather.daily;
  const now = new Date();
  const currentHour = now.getHours();
  const unitLabel = units === 'knots' ? 'kt' : 'km/h';

  // 1. Horas (próximas 72 horas con separadores de días)
  let hourlyCards = '';
  let lastDayDateStr = null;

  for (let i = currentHour; i < currentHour + 72 && i < hourly.time.length; i++) {
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
    const pop = hourly.precipitation_probability ? (hourly.precipitation_probability[i] || 0) : 0;
    const precipMm = hourly.precipitation ? (hourly.precipitation[i] || 0) : 0;
    const code = hourly.weather_code[i];

    const weather = getWeatherInfo(code, isDay, precipMm, pop);
    const temp = Math.round(hourly.temperature_2m[i]);
    const windSpeed = units === 'knots' ? (hourly.wind_speed_10m[i] * 0.539957).toFixed(0) : Math.round(hourly.wind_speed_10m[i]);
    const windDeg = (hourly.wind_direction_10m && hourly.wind_direction_10m[i] != null) ? hourly.wind_direction_10m[i] : 0;
    const windDir = getWindDirection(windDeg);

    hourlyCards += `
      <div class="hourly-card">
        <span class="h-time">${hourLabel}</span>
        <span class="h-icon" title="${weather.label}${precipMm >= 0.1 ? ` (${precipMm.toFixed(1)} mm)` : ''}">${renderWeatherIconHtml(weather, 28, iconTheme)}</span>
        <span class="h-temp">${temp}°C</span>
        <div class="h-pop ${pop >= 40 ? 'pop-high' : ''}" title="Probabilidad de lluvia">
          <span class="pop-drop">💧</span>
          <span>${pop}%</span>
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

  // 2. Pronóstico Diario (Tarjetas Visuales a 10 Días con desglose Mañana / Tarde)
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
    
    // Desglose de tiempo: 🌅 Mañana (08:00 a 14:00) y 🌇 Tarde (14:00 a 21:00)
    const morningWeather = getDaypartWeather(hourly, dayDateStr, 8, 13, daily.weather_code[d], popMax, parseFloat(rain));
    const afternoonWeather = getDaypartWeather(hourly, dayDateStr, 14, 21, daily.weather_code[d], popMax, parseFloat(rain));
    
    const windSpeedRaw = daily.wind_speed_10m_max ? daily.wind_speed_10m_max[d] : 0;
    const windGustRaw = daily.wind_gusts_10m_max ? daily.wind_gusts_10m_max[d] : 0;
    const windSpeed = units === 'knots' ? (windSpeedRaw * 0.539957).toFixed(0) : Math.round(windSpeedRaw);
    const windGust = units === 'knots' ? (windGustRaw * 0.539957).toFixed(0) : Math.round(windGustRaw);

    const uvMax = daily.uv_index_max ? Math.round(daily.uv_index_max[d]) : null;
    let uvText = 'Bajo';
    let uvClass = 'uv-low';
    if (uvMax >= 8) { uvText = 'Muy Alto'; uvClass = 'uv-very-high'; }
    else if (uvMax >= 6) { uvText = 'Alto'; uvClass = 'uv-high'; }
    else if (uvMax >= 3) { uvText = 'Moderado'; uvClass = 'uv-mod'; }

    let sunriseStr = '--:--';
    let sunsetStr = '--:--';
    if (daily.sunrise && daily.sunrise[d]) {
      sunriseStr = new Date(daily.sunrise[d]).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }
    if (daily.sunset && daily.sunset[d]) {
      sunsetStr = new Date(daily.sunset[d]).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
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

          <!-- OPCIÓN A: BADGE UNIFICADO MAÑANA Y TARDE -->
          <div class="d-dayparts-badge">
            <div class="d-daypart-row morning" title="Previsión Mañana (08:00 - 14:00): ${morningWeather.label}">
              <span class="d-daypart-label">🌅 Mañana</span>
              <span class="d-daypart-icon">${renderWeatherIconHtml(morningWeather, 22, iconTheme)}</span>
              <span class="d-daypart-text">${morningWeather.label}</span>
            </div>
            <div class="d-daypart-divider"></div>
            <div class="d-daypart-row afternoon" title="Previsión Tarde (14:00 - 21:00): ${afternoonWeather.label}">
              <span class="d-daypart-label">🌇 Tarde</span>
              <span class="d-daypart-icon">${renderWeatherIconHtml(afternoonWeather, 22, iconTheme)}</span>
              <span class="d-daypart-text">${afternoonWeather.label}</span>
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
            <div class="u-metric-item ${popMax >= 40 ? 'metric-rain-active' : ''}" title="Probabilidad de lluvia y acumulado">
              <span class="u-m-icon">💧</span>
              <div class="u-m-info">
                <span class="u-m-val">${popMax}%</span>
                <span class="u-m-sub">${rain > 0 ? rain + ' mm' : 'Seco'}</span>
              </div>
            </div>

            <div class="u-metric-item" title="Viento medio y rachas máximas">
              <span class="u-m-icon">💨</span>
              <div class="u-m-info">
                <span class="u-m-val">${windSpeed} ${unitLabel}</span>
                <span class="u-m-sub">Racha ${windGust}</span>
              </div>
            </div>

            ${uvMax !== null ? `
            <div class="u-metric-item" title="Índice Ultravioleta Máximo">
              <span class="u-m-icon">☀️</span>
              <div class="u-m-info">
                <span class="u-m-val">UV ${uvMax}</span>
                <span class="u-m-sub">${uvText}</span>
              </div>
            </div>
            ` : ''}

            <div class="u-metric-item" title="Salida y Puesta de Sol">
              <span class="u-m-icon">🌅</span>
              <div class="u-m-info">
                <span class="u-m-val">${sunriseStr}</span>
                <span class="u-m-sub">${sunsetStr}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="forecast-section">
      <!-- 72H HORAS CON SEPARADOR DE DÍAS -->
      <div class="forecast-block">
        <div class="section-title-wrap">
          <div>
            <h3 class="section-heading">⏱️ Pronóstico Horario Detallado (72 Horas / 3 Días)</h3>
            <span class="section-subtitle">Desliza horizontalmente para ver la evolución hora a hora</span>
          </div>
        </div>
        <div class="hourly-scroll-container">
          ${hourlyCards}
        </div>
      </div>

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
      </div>
    </div>
  `;
}