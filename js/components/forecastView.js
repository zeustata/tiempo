import { getWeatherInfo, getWindDirection } from '../utils/weatherIcons.js';

/**
 * Renderiza el pronóstico por horas (48h) y a 10 días
 */
export function renderForecast(data, units = 'metric') {
  const hourly = data.weather.hourly;
  const daily = data.weather.daily;
  const now = new Date();
  const currentHour = now.getHours();

  // 1. Horas (próximas 24 horas)
  let hourlyCards = '';
  for (let i = currentHour; i < currentHour + 24 && i < hourly.time.length; i++) {
    const timeDate = new Date(hourly.time[i]);
    const hourLabel = timeDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const weather = getWeatherInfo(hourly.weather_code[i]);
    const temp = Math.round(hourly.temperature_2m[i]);
    const pop = hourly.precipitation_probability[i] || 0;
    const wind = units === 'knots' ? (hourly.wind_speed_10m[i] * 0.539957).toFixed(0) : hourly.wind_speed_10m[i].toFixed(0);

    hourlyCards += `
      <div class="hourly-card">
        <span class="h-time">${hourLabel}</span>
        <span class="h-icon" title="${weather.label}">${weather.icon}</span>
        <span class="h-temp">${temp}°C</span>
        <div class="h-pop" title="Probabilidad de lluvia">
          <span class="pop-drop">💧</span>
          <span>${pop}%</span>
        </div>
        <span class="h-wind">${wind} ${units === 'knots' ? 'kt' : 'km/h'}</span>
      </div>
    `;
  }

  // 2. Pronóstico Diario (10 días)
  let dailyCards = '';
  for (let d = 0; d < daily.time.length; d++) {
    const dayDate = new Date(daily.time[d]);
    const dayName = d === 0 ? 'Hoy' : d === 1 ? 'Mañana' : dayDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
    const weather = getWeatherInfo(daily.weather_code[d]);
    const maxT = Math.round(daily.temperature_2m_max[d]);
    const minT = Math.round(daily.temperature_2m_min[d]);
    const rain = (daily.precipitation_sum[d] || 0).toFixed(1);
    const popMax = daily.precipitation_probability_max ? daily.precipitation_probability_max[d] : 0;
    const windGust = Math.round(daily.wind_gusts_10m_max[d]);

    dailyCards += `
      <div class="daily-row">
        <div class="d-day">${dayName}</div>
        <div class="d-condition">
          <span class="d-icon">${weather.icon}</span>
          <span class="d-desc">${weather.label}</span>
        </div>
        <div class="d-rain">
          ${rain > 0 ? `<span class="rain-badge">💧 ${rain} mm (${popMax}%)</span>` : '<span class="rain-none">Sin lluvia</span>'}
        </div>
        <div class="d-wind">💨 Rachas ${windGust} km/h</div>
        <div class="d-temp-range">
          <span class="min-t">${minT}°</span>
          <div class="temp-bar-bg">
            <div class="temp-bar-fill" style="margin-left: ${Math.max(0, minT + 5) * 2}%; width: ${Math.max(15, (maxT - minT) * 4)}%;"></div>
          </div>
          <span class="max-t">${maxT}°</span>
        </div>
      </div>
    `;
  }

  return `
    <div class="forecast-section">
      <!-- 24H HORAS -->
      <div class="forecast-block">
        <div class="section-title-wrap">
          <h3 class="section-heading">⏱️ Pronóstico Detallado por Horas (24h)</h3>
          <span class="section-subtitle">Desliza para ver la evolución meteorológica</span>
        </div>
        <div class="hourly-scroll-container">
          ${hourlyCards}
        </div>
      </div>

      <!-- 10 DÍAS -->
      <div class="forecast-block">
        <div class="section-title-wrap">
          <h3 class="section-heading">📅 Pronóstico a 10 Días Vista</h3>
          <span class="section-subtitle">Modelo numérico europeo ECMWF / ICON</span>
        </div>
        <div class="daily-table">
          ${dailyCards}
        </div>
      </div>
    </div>
  `;
}