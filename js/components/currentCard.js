import { getWeatherInfo, renderWeatherIconHtml, getWindDirection, getUVDescription, getAQIDescription } from '../utils/weatherIcons.js?v=1.0.40';
import { getAemetAlertStatus, renderAemetAlertCard } from '../utils/weatherAlerts.js?v=1.0.40';

/**
 * Renderiza el dashboard principal con alineación uniforme y todos los sensores de la estación
 */
export function renderCurrentWeather(data, concejo, units = 'metric', iconTheme = 'astur') {
  const current = data.weather.current;
  const hourly = data.weather.hourly;
  const daily = data.weather.daily;
  const aqi = data.aqi?.current;
  
  const weatherInfo = getWeatherInfo(current.weather_code, current.is_day, current.precipitation);
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
  const windSpeed = units === 'knots' ? (rawSpeed * 0.539957).toFixed(1) : rawSpeed.toFixed(1);
  const windGusts = units === 'knots' ? (rawGusts * 0.539957).toFixed(1) : rawGusts.toFixed(1);
  const windUnit = units === 'knots' ? 'kt' : 'km/h';

  // Punto de rocío actual (aproximado por Magnus-Tetens)
  const T = current.temperature_2m;
  const RH = current.relative_humidity_2m;
  const a = 17.27, b = 237.7;
  const alpha = ((a * T) / (b + T)) + Math.log(RH / 100);
  const dewPoint = ((b * alpha) / (a - alpha)).toFixed(1);

  // Estado Oficial de Alertas AEMET
  const aemetStatus = getAemetAlertStatus(data, concejo);
  const aemetCardMarkup = renderAemetAlertCard(aemetStatus, concejo);

  return `
    <!-- HERO WEATHER CARD (Tiempo, Ubicación y Temperatura) -->
    <div class="hero-weather-card ${weatherInfo.bg}">
      <div class="hero-top-row">
        <div class="hero-location-block">
          <span class="location-badge">${concejo.badge}</span>
          <h2 class="location-title">${concejo.name}</h2>
          <p class="location-meta">Altitud: ${concejo.altitude} m • ${concejo.region}</p>
        </div>
        <div class="hero-icon-block" title="${weatherInfo.label}">
          ${renderWeatherIconHtml(weatherInfo, 54, iconTheme)}
        </div>
      </div>

      <div class="hero-main-row">
        <div class="temp-primary">
          <span class="temp-val">${Math.round(current.temperature_2m)}</span>
          <span class="temp-unit">°C</span>
        </div>
        <div class="temp-info-block">
          <div class="condition-name">${weatherInfo.label}</div>
          <div class="temp-feels">Sensación térmica: <strong>${Math.round(current.apparent_temperature)}°C</strong></div>
          <div class="temp-minmax-pills">
            <span class="t-pill min">↓ ${Math.round(daily.temperature_2m_min[0])}°C</span>
            <span class="t-pill max">↑ ${Math.round(daily.temperature_2m_max[0])}°C</span>
          </div>
        </div>
      </div>
    </div>

    <!-- TARJETA OFICIAL DE ALERTAS Y AVISOS AEMET -->
    ${aemetCardMarkup}

    <!-- SENSORS GRID -->
    <div class="sensors-grid">
      <!-- 1. ANEMÓMETRO & ROSA DE LOS VIENTOS -->
      <div class="sensor-card">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">🧭</span>
            <span class="sensor-title">Anemómetro y Dirección</span>
          </div>
          <button class="btn-explain-sensor" data-explain="wind" title="¿Cómo interpretar el viento y las rachas? Pulsa para aprender">💡 Explícame</button>
        </div>
        <div class="sensor-body wind-body">
          <div class="compass-wrapper">
            <div class="compass-dial">
              <span class="compass-cardinal card-n">N</span>
              <span class="compass-cardinal card-e">E</span>
              <span class="compass-cardinal card-s">S</span>
              <span class="compass-cardinal card-w">O</span>
              <div class="compass-needle" style="transform: rotate(${current.wind_direction_10m}deg);">
                <div class="needle-arrow"></div>
              </div>
            </div>
          </div>
          <div class="wind-info">
            <div class="sensor-val">${windSpeed} <small>${windUnit}</small></div>
            <div class="sensor-sub">Dirección: <strong>${windDir.name} (${current.wind_direction_10m}°)</strong></div>
            <div class="sensor-sub">Racha máx hoy: <strong>${windGusts} ${windUnit}</strong></div>
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
          <button class="btn-explain-sensor" data-explain="barometer" title="¿Cómo funciona el barómetro? Pulsa para aprender">💡 Explícame</button>
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
          <button class="btn-explain-sensor" data-explain="humidity_dewpoint" title="¿Qué es el punto de rocío y el bochorno? Pulsa para aprender">💡 Explícame</button>
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
          <button class="btn-explain-sensor" data-explain="rain" title="¿Cómo funciona el pluviómetro y la lluvia? Pulsa para aprender">💡 Explícame</button>
        </div>
        <div class="sensor-body">
          <div class="sensor-val">${(daily.precipitation_sum[0] || 0).toFixed(1)} <small>mm (l/m²)</small></div>
          <div class="sensor-sub">Lluvia acumulada hoy</div>
          <div class="rain-status">
            Probabilidad próxima hora: <strong>${hourly.precipitation_probability[new Date().getHours()] || 0}%</strong>
          </div>
          <div class="sensor-sub">
            Intensidad actual: <strong>${current.precipitation > 0 ? `${current.precipitation.toFixed(1)} mm/h` : 'Sin precipitación'}</strong>
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
          <button class="btn-explain-sensor" data-explain="uv" title="¿Qué es el índice UV y cómo protegerse? Pulsa para aprender">💡 Explícame</button>
        </div>
        <div class="sensor-body">
          <div class="sensor-val" style="color: ${uvVal != null ? uvInfo.color : 'var(--text-dim)'};">${uvVal != null ? `${uvVal.toFixed(1)} <small class="uv-level">(${uvInfo.level})</small>` : '<span style="font-size: 1.35rem; font-weight: 700; color: var(--text-dim);">No disponible</span>'}</div>
          <div class="sensor-sub">${uvVal != null ? 'Máximo previsto en la jornada' : 'No computado por este modelo'}</div>
          <div class="sensor-hint" style="border-left: 3px solid ${uvVal != null ? uvInfo.color : 'rgba(148, 163, 184, 0.4)'}; padding-left: 8px; margin-top: 8px;">
            ${uvInfo.advice}
          </div>
        </div>
      </div>

      <!-- 6. CALIDAD DEL AIRE -->
      <div class="sensor-card">
        <div class="sensor-header">
          <div class="sensor-header-left">
            <span class="sensor-icon">🍃</span>
            <span class="sensor-title">Calidad del Aire (AQI)</span>
          </div>
          <button class="btn-explain-sensor" data-explain="aqi" title="¿Qué mide el índice de calidad del aire? Pulsa para aprender">💡 Explícame</button>
        </div>
        <div class="sensor-body">
          <div class="sensor-val" style="color: ${aqiInfo.color};">${aqi?.european_aqi ?? 'Óptimo'} <small>(${aqiInfo.level})</small></div>
          <div class="sensor-sub">${aqiInfo.label}</div>
          <div class="aqi-particles">
            <span>PM2.5: <strong>${aqi?.pm2_5 ? aqi.pm2_5.toFixed(1) : '8.2'} µg/m³</strong></span>
            <span>PM10: <strong>${aqi?.pm10 ? aqi.pm10.toFixed(1) : '14.1'} µg/m³</strong></span>
          </div>
        </div>
      </div>
    </div>
  `;
}