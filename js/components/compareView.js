import { CONCEJOS_ASTURIAS, getConcejoById } from '../config/concejos.js';
import { getWeatherInfo } from '../utils/weatherIcons.js';

/**
 * Renderiza el comparador climático cara a cara entre dos concejos de Asturias
 */
export function renderCompareView(concejoA, weatherDataA, concejoB, weatherDataB) {
  const currentA = weatherDataA.weather.current;
  const currentB = weatherDataB?.weather?.current;
  const dailyA = weatherDataA.weather.daily;
  const dailyB = weatherDataB?.weather?.daily;

  const weatherInfoA = getWeatherInfo(currentA.weather_code);
  const weatherInfoB = currentB ? getWeatherInfo(currentB.weather_code) : null;

  const tempA = currentA.temperature_2m;
  const tempB = currentB ? currentB.temperature_2m : null;
  const tempDiff = tempB !== null ? (tempB - tempA).toFixed(1) : null;

  const rainA = dailyA.precipitation_probability_max ? dailyA.precipitation_probability_max[0] : 0;
  const rainB = dailyB && dailyB.precipitation_probability_max ? dailyB.precipitation_probability_max[0] : 0;

  const windA = Math.round(currentA.wind_speed_10m);
  const windB = currentB ? Math.round(currentB.wind_speed_10m) : 0;

  const humA = currentA.relative_humidity_2m;
  const humB = currentB ? currentB.relative_humidity_2m : 0;

  const altDiff = concejoB ? concejoB.altitude - concejoA.altitude : 0;

  // Opciones para el selector del segundo concejo
  const optionsB = CONCEJOS_ASTURIAS.map(c => 
    `<option value="${c.id}" ${concejoB && concejoB.id === c.id ? 'selected' : ''}>${c.name} (${c.altitude}m • ${c.region})</option>`
  ).join('');

  return `
    <div class="compare-card">
      <div class="section-title-wrap">
        <div>
          <h3 class="section-heading">⚖️ Comparador Climático de Concejos</h3>
          <span class="section-subtitle">Compara el tiempo en tiempo real entre dos localidades de Asturias</span>
        </div>
      </div>

      <!-- SELECTORES DE CONCEJOS -->
      <div class="compare-selectors-bar">
        <div class="selector-box">
          <label class="sel-label">Concejo Principal (A)</label>
          <div class="static-concejo-pill">
            <span class="pill-badge">${concejoA.badge}</span>
            <span class="pill-name">${concejoA.name}</span>
          </div>
        </div>

        <div class="compare-vs-badge">VS</div>

        <div class="selector-box">
          <label class="sel-label" for="compare-select-b">Concejo a Comparar (B)</label>
          <select id="compare-select-b" class="compare-select-dropdown">
            ${optionsB}
          </select>
        </div>
      </div>

      ${currentB ? `
        <!-- TARJETAS CARA A CARA -->
        <div class="compare-grid">
          <!-- CONCEJO A -->
          <div class="compare-column col-a">
            <div class="col-header">
              <span class="col-badge">${concejoA.badge}</span>
              <h4 class="col-name">${concejoA.name}</h4>
              <span class="col-meta">${concejoA.altitude} m • ${concejoA.region}</span>
            </div>
            <div class="col-weather">
              <span class="col-icon">${weatherInfoA.icon}</span>
              <div class="col-temp">${Math.round(tempA)}°C</div>
              <span class="col-desc">${weatherInfoA.label}</span>
            </div>
            <ul class="col-metrics">
              <li><span>💧 Prob. Lluvia:</span> <strong>${rainA}%</strong></li>
              <li><span>💨 Viento:</span> <strong>${windA} km/h</strong></li>
              <li><span>💦 Humedad:</span> <strong>${humA}%</strong></li>
              <li><span>🌡️ Sensación:</span> <strong>${Math.round(currentA.apparent_temperature)}°C</strong></li>
            </ul>
          </div>

          <!-- DIFERENCIA RESUMEN CENTRAL -->
          <div class="compare-diff-card">
            <div class="diff-header">Diferencia (B vs A)</div>
            <div class="diff-item">
              <span class="diff-label">Temperatura:</span>
              <strong class="diff-val ${tempDiff > 0 ? 'warmer' : tempDiff < 0 ? 'colder' : ''}">
                ${tempDiff > 0 ? '+' + tempDiff : tempDiff}°C
              </strong>
            </div>
            <div class="diff-item">
              <span class="diff-label">Diferencia Altitud:</span>
              <strong class="diff-val">${altDiff > 0 ? '+' + altDiff : altDiff} m</strong>
            </div>
            <div class="diff-item">
              <span class="diff-label">Riesgo Lluvia:</span>
              <strong class="diff-val">${rainB - rainA > 0 ? '+' + (rainB - rainA) : (rainB - rainA)}%</strong>
            </div>
          </div>

          <!-- CONCEJO B -->
          <div class="compare-column col-b">
            <div class="col-header">
              <span class="col-badge">${concejoB.badge}</span>
              <h4 class="col-name">${concejoB.name}</h4>
              <span class="col-meta">${concejoB.altitude} m • ${concejoB.region}</span>
            </div>
            <div class="col-weather">
              <span class="col-icon">${weatherInfoB.icon}</span>
              <div class="col-temp">${Math.round(tempB)}°C</div>
              <span class="col-desc">${weatherInfoB.label}</span>
            </div>
            <ul class="col-metrics">
              <li><span>💧 Prob. Lluvia:</span> <strong>${rainB}%</strong></li>
              <li><span>💨 Viento:</span> <strong>${windB} km/h</strong></li>
              <li><span>💦 Humedad:</span> <strong>${humB}%</strong></li>
              <li><span>🌡️ Sensación:</span> <strong>${Math.round(currentB.apparent_temperature)}°C</strong></li>
            </ul>
          </div>
        </div>
      ` : `
        <div class="compare-loading">
          <div class="loading-spinner"></div>
          <p>Cargando datos climáticos para comparar...</p>
        </div>
      `}
    </div>
  `;
}
