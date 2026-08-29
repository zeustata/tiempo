import { getWeatherInfo, renderWeatherIconHtml } from '../utils/weatherIcons.js?v=1.0.36';

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
    const wind = units === 'knots' ? (hourly.wind_speed_10m[i] * 0.539957).toFixed(0) : Math.round(hourly.wind_speed_10m[i]);

    hourlyCards += `
      <div class="hourly-card">
        <span class="h-time">${hourLabel}</span>
        <span class="h-icon" title="${weather.label}${precipMm >= 0.1 ? ` (${precipMm.toFixed(1)} mm)` : ''}">${renderWeatherIconHtml(weather, 28, iconTheme)}</span>
        <span class="h-temp">${temp}°C</span>
        <div class="h-pop ${pop >= 40 ? 'pop-high' : ''}" title="Probabilidad de lluvia">
          <span class="pop-drop">💧</span>
          <span>${pop}%</span>
        </div>
        <span class="h-wind">💨 ${wind} ${unitLabel}</span>
      </div>
    `;
  }

  // 2. Pronóstico Diario (Tarjetas Visuales Amplias a 10 Días)
  let dailyCards = '';
  
  // Calcular mínimas y máximas globales de la semana para la escala visual
  const allMins = daily.temperature_2m_min.map(t => Math.round(t));
  const allMaxs = daily.temperature_2m_max.map(t => Math.round(t));
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);
  const tempSpan = Math.max(1, globalMax - globalMin);

  for (let d = 0; d < daily.time.length; d++) {
    const dayDate = new Date(daily.time[d]);
    const isToday = d === 0;
    const isTomorrow = d === 1;
    
    // Título y fecha
    const dayTitle = isToday ? 'Hoy' : isTomorrow ? 'Mañana' : dayDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const dayFormatted = dayDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    
    const maxT = Math.round(daily.temperature_2m_max[d]);
    const minT = Math.round(daily.temperature_2m_min[d]);
    const rain = (daily.precipitation_sum[d] || 0).toFixed(1);
    const popMax = daily.precipitation_probability_max ? daily.precipitation_probability_max[d] : 0;
    const weather = getWeatherInfo(daily.weather_code[d], 1, parseFloat(rain), popMax);
    
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

    // Cálculo relativo de la barra térmica
    const leftPercent = Math.max(0, Math.min(85, ((minT - globalMin) / tempSpan) * 100));
    const widthPercent = Math.max(15, Math.min(100 - leftPercent, ((maxT - minT) / tempSpan) * 100));

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

          <div class="d-condition-badge">
            <span class="d-icon-large">${renderWeatherIconHtml(weather, 36, iconTheme)}</span>
            <div class="d-condition-info">
              <span class="d-desc-text">${weather.label}</span>
            </div>
          </div>
        </div>

        <!-- SECCIÓN TÉRMICA DESTACADA (ORGANIZADA EN BLOQUE VERTICAL) -->
        <div class="d-temp-section">
          <div class="d-temp-badges-row">
            <div class="temp-badge max">
              <span class="tb-label">Máxima</span>
              <span class="tb-val">${maxT}°</span>
            </div>
            <div class="temp-badge min">
              <span class="tb-label">Mínima</span>
              <span class="tb-val">${minT}°</span>
            </div>
            <div class="temp-badge osc">
              <span class="tb-label">Rango</span>
              <span class="tb-val osc-val">Δ ${maxT - minT}°</span>
            </div>
          </div>

          <div class="d-temp-bar-wrap">
            <div class="temp-bar-bg">
              <div class="temp-bar-fill" style="margin-left: ${leftPercent.toFixed(1)}%; width: ${widthPercent.toFixed(1)}%;"></div>
            </div>
            <div class="temp-bar-labels">
              <span>${minT}° Mín</span>
              <span class="temp-range-text">Rango del día</span>
              <span>${maxT}° Máx</span>
            </div>
          </div>
        </div>

        <!-- CUADRÍCULA DE MÉTRICAS CLAVE -->
        <div class="d-card-metrics-grid">
          <div class="metric-pill ${popMax >= 40 ? 'metric-rain-active' : ''}">
            <span class="m-icon">💧</span>
            <div class="m-data">
              <span class="m-val">${popMax}% Lluvia</span>
              <span class="m-sub">${rain > 0 ? rain + ' mm acum.' : 'Sin lluvia prevista'}</span>
            </div>
          </div>

          <div class="metric-pill">
            <span class="m-icon">💨</span>
            <div class="m-data">
              <span class="m-val">${windSpeed} ${unitLabel}</span>
              <span class="m-sub">Rachas: ${windGust} ${unitLabel}</span>
            </div>
          </div>

          ${uvMax !== null ? `
          <div class="metric-pill">
            <span class="m-icon">☀️</span>
            <div class="m-data">
              <span class="m-val">UV ${uvMax} (${uvText})</span>
              <span class="m-sub">Índice solar máx.</span>
            </div>
          </div>
          ` : ''}

          <div class="metric-pill">
            <span class="m-icon">🌅</span>
            <div class="m-data">
              <span class="m-val">${sunriseStr} / ${sunsetStr}</span>
              <span class="m-sub">Sol y Ocaso</span>
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