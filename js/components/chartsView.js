import { getWeatherInfo, getWindDirection, renderWeatherIconHtml } from '../utils/weatherIcons.js?v=2.2.64';

/**
 * 📈 METEOROLOGÍA GRÁFICA (Suite Multivariable de Observatorio Horario)
 * Diseño Ultra-Ergonómico para Móviles con Selector Desplegable Liquid Glass (Opción B),
 * Live Inspector Readout continuo y métricas sintetizadas sin truncamiento.
 */

const CHART_VAR_INFO = {
  thermal: { label: '🌡️ Térmico', full: '🌡️ Térmico (Temp. & Sensación)' },
  precip: { label: '🌧️ Lluvia', full: '🌧️ Lluvia (Hidrograma & Acumulado)' },
  wind: { label: '💨 Viento', full: '💨 Viento (Velocidad & Rachas)' },
  pressure: { label: '⏱️ Barómetro', full: '⏱️ Barómetro (Presión Atmosférica)' },
  snow: { label: '🏔️ Nieve & Cota', full: '🏔️ Nieve & Cota (Altitud & Espesor)' },
  clouds: { label: '☁️ Nubosidad', full: '☁️ Nubosidad (Baja, Media & Alta)' },
  multi: { label: '📊 Combinado', full: '📊 Combinado (Multivariable Clásico)' }
};

let meteoChart = null;
let activeChartType = 'thermal'; // 'thermal' | 'precip' | 'wind' | 'pressure' | 'multi'
let activeHours = 48; // 24 | 48 | 72
let cachedHourlyData = null;
let canvasTargetId = 'meteo-chart-canvas';
let eventsInitialized = false;
let activeIconTheme = 'astur';

function getActiveIconTheme() {
  if (activeIconTheme) return activeIconTheme;
  try {
    const raw = localStorage.getItem('meteoastur_prefs');
    if (raw) {
      const p = JSON.parse(raw);
      if (p && p.iconTheme) return p.iconTheme;
    }
  } catch (e) {}
  return 'astur';
}

/**
 * Inicializa la escucha de eventos para selector desplegable de variable y rango horario
 */
function initChartControls() {
  if (eventsInitialized) return;
  eventsInitialized = true;

  document.addEventListener('click', (e) => {
    const dropdownBtn = e.target.closest('#chart-var-dropdown-btn');
    const menu = document.getElementById('chart-var-dropdown-menu');

    // Alternar menú desplegable al hacer clic en el botón
    if (dropdownBtn) {
      e.preventDefault();
      e.stopPropagation();
      if (menu) {
        const isClosed = menu.style.display === 'none' || !menu.style.display;
        menu.style.display = isClosed ? 'flex' : 'none';
        dropdownBtn.setAttribute('aria-expanded', isClosed ? 'true' : 'false');
      }
      return;
    }

    // Seleccionar variable desde el menú
    const varItem = e.target.closest('.chart-var-item');
    if (varItem) {
      e.preventDefault();
      const type = varItem.dataset.chart;
      if (menu) {
        menu.style.display = 'none';
      }
      const btn = document.getElementById('chart-var-dropdown-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');

      if (type && type !== activeChartType) {
        activeChartType = type;
        updateActivePillsUI();
        if (cachedHourlyData) {
          renderCurrentChart();
        }
      }
      return;
    }

    // Cerrar menú al hacer clic fuera
    if (menu && menu.style.display !== 'none' && !e.target.closest('#chart-var-dropdown-wrapper')) {
      menu.style.display = 'none';
      const btn = document.getElementById('chart-var-dropdown-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    // Selector de Rango Horario (24h / 48h / 72h)
    const rangeBtn = e.target.closest('.chart-range-btn');
    if (rangeBtn) {
      e.preventDefault();
      const hours = parseInt(rangeBtn.dataset.hours, 10);
      if (hours && hours !== activeHours) {
        activeHours = hours;
        updateActivePillsUI();
        if (cachedHourlyData) {
          renderCurrentChart();
        }
      }
      return;
    }
  });
}

/**
 * Actualiza las clases visuales y textos activos
 */
function updateActivePillsUI() {
  const activeInfo = CHART_VAR_INFO[activeChartType] || { label: '📈 Gráfico' };
  const labelEl = document.getElementById('chart-active-var-text');
  if (labelEl) {
    labelEl.textContent = activeInfo.label;
  }

  document.querySelectorAll('.chart-var-item').forEach(item => {
    const isAct = item.dataset.chart === activeChartType;
    item.classList.toggle('active', isAct);
    const check = item.querySelector('.item-check');
    if (check) check.textContent = isAct ? '✓' : '';
  });

  document.querySelectorAll('.chart-range-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.hours, 10) === activeHours);
  });

  const readout = document.getElementById('chart-live-readout');
  if (readout) {
    readout.innerHTML = '<span class="readout-idle">👆 Toca o desliza la curva para ver el detalle de cada hora</span>';
  }
}

/**
 * Función principal expuesta
 */
export function renderWeatherChart(canvasId = 'meteo-chart-canvas', hourlyData = null, hoursCount = null, iconTheme = null) {
  if (canvasId) canvasTargetId = canvasId;
  if (hourlyData) cachedHourlyData = hourlyData;
  if (hoursCount && !eventsInitialized) activeHours = hoursCount;
  if (iconTheme) activeIconTheme = iconTheme;

  initChartControls();
  updateActivePillsUI();

  if (!cachedHourlyData) return;
  renderCurrentChart();
}

/**
 * Genera y dibuja la gráfica activa en el canvas según la variable seleccionada
 */
function renderCurrentChart() {
  const canvas = document.getElementById(canvasTargetId);
  if (!canvas || typeof Chart === 'undefined' || !cachedHourlyData) return;

  const hourlyData = cachedHourlyData;
  const hoursCount = activeHours;

  const wrapper = document.getElementById('chart-canvas-wrapper');
  if (wrapper) {
    const targetWidth = Math.max(980, hoursCount * 50);
    wrapper.style.minWidth = `${targetWidth}px`;
  }

  if (meteoChart) {
    meteoChart.destroy();
    meteoChart = null;
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentHourStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(currentHour).padStart(2, '0')}:00`;
  let startIndex = (hourlyData.time && Array.isArray(hourlyData.time)) 
    ? hourlyData.time.findIndex(t => t >= currentHourStr) 
    : -1;
  if (startIndex === -1) startIndex = currentHour;

  const labels = [];
  const fullDates = [];
  const weatherDescriptions = [];
  const hoursData = [];

  const weatherCodes = hourlyData.weather_code || hourlyData.weathercode || [];

  for (let i = startIndex; i < startIndex + hoursCount && i < hourlyData.time.length; i++) {
    const d = new Date(hourlyData.time[i]);
    const isStartOfDay = d.getHours() === 0;
    const isFirstHour = i === startIndex;
    const dayPrefix = d.toLocaleDateString('es-ES', { weekday: 'short' });
    const formattedDay = dayPrefix.charAt(0).toUpperCase() + dayPrefix.slice(1);
    const hourStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    if (isStartOfDay) {
      labels.push([formattedDay, hourStr]);
    } else if (isFirstHour) {
      labels.push(['Hoy', hourStr]);
    } else {
      labels.push(hourStr);
    }

    fullDates.push(d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }));

    const isDay = (hourlyData.is_day && hourlyData.is_day[i] != null) ? hourlyData.is_day[i] : (d.getHours() >= 8 && d.getHours() < 21 ? 1 : 0);
    const pop = hourlyData.precipitation_probability ? (hourlyData.precipitation_probability[i] || 0) : 0;
    const precipMm = hourlyData.precipitation ? (hourlyData.precipitation[i] || 0) : 0;
    const wCode = weatherCodes[i] != null ? weatherCodes[i] : 0;

    // Nowcasting
    const isImmediate = (i === startIndex || i === startIndex + 1);
    const useUv = (isImmediate && hourlyData.uv_index && hourlyData.uv_index[i] != null) ? hourlyData.uv_index[i] : null;
    const useDirectIrr = (isImmediate && hourlyData.direct_normal_irradiance && hourlyData.direct_normal_irradiance[i] != null) ? hourlyData.direct_normal_irradiance[i] : null;
    const useSw = (isImmediate && hourlyData.shortwave_radiation && hourlyData.shortwave_radiation[i] != null) ? hourlyData.shortwave_radiation[i] : null;
    const cloudCoverHour = (hourlyData.cloud_cover && hourlyData.cloud_cover[i] != null) ? hourlyData.cloud_cover[i] : null;
    const humHour = (hourlyData.relative_humidity_2m && hourlyData.relative_humidity_2m[i] != null) ? hourlyData.relative_humidity_2m[i] : null;
    const visHour = (hourlyData.visibility && hourlyData.visibility[i] != null) ? hourlyData.visibility[i] : null;

    const wInfo = getWeatherInfo(wCode, isDay, precipMm, pop, useDirectIrr, useUv, useSw, cloudCoverHour, humHour, visHour);
    weatherDescriptions.push(`${wInfo.icon} ${wInfo.label}${precipMm >= 0.1 ? ` (${precipMm.toFixed(1)} mm)` : ''}`);

    const windDir = hourlyData.wind_direction_10m ? hourlyData.wind_direction_10m[i] : 0;
    const windDirInfo = getWindDirection(windDir);
    const snowfallMm = hourlyData.snowfall ? (hourlyData.snowfall[i] || 0) : 0;
    const snowDepthM = hourlyData.snow_depth ? (hourlyData.snow_depth[i] || 0) : 0;
    const freezingLevel = hourlyData.freezing_level_height ? Math.round(hourlyData.freezing_level_height[i] || 0) : 0;
    const cloudsPct = cloudCoverHour != null ? Math.round(cloudCoverHour) : 0;

    hoursData.push({
      time: d,
      hourStr,
      isStartOfDay,
      temp: hourlyData.temperature_2m ? hourlyData.temperature_2m[i] : 0,
      apparent: hourlyData.apparent_temperature ? hourlyData.apparent_temperature[i] : hourlyData.temperature_2m[i],
      pop,
      precip: precipMm,
      snowfall: snowfallMm,
      snowDepth: snowDepthM,
      freezingLevel,
      cloudCover: cloudsPct,
      windSpeed: hourlyData.wind_speed_10m ? hourlyData.wind_speed_10m[i] : 0,
      windGusts: hourlyData.wind_gusts_10m ? hourlyData.wind_gusts_10m[i] : 0,
      windDirection: windDir,
      windDirShort: windDirInfo ? windDirInfo.short : '',
      pressure: hourlyData.pressure_msl ? hourlyData.pressure_msl[i] : (hourlyData.surface_pressure ? hourlyData.surface_pressure[i] : 1015),
      humidity: hourlyData.relative_humidity_2m ? hourlyData.relative_humidity_2m[i] : 75,
      weatherInfo: wInfo,
      weatherIcon: wInfo.icon,
      weatherLabel: wInfo.label
    });
  }

  // Renderizar cinta superior sincronizada de cielo y viento
  renderSkyTimeline(hoursData);

  // Renderizar titulares inteligentes / hitos clave
  renderSmartDigest(hoursData);

  // Renderizar franja de métricas clave compactas
  renderSummaryStrip(activeChartType, hoursData);

  const ctx = canvas.getContext('2d');
  const chartConfig = buildChartConfig(ctx, activeChartType, labels, fullDates, weatherDescriptions, hoursData);

  meteoChart = new Chart(ctx, chartConfig);
}

/**
 * Renderiza la franja de pastillas de datos clave sintetizados sin textos largos
 */
function renderSummaryStrip(type, dataSlice) {
  const container = document.getElementById('chart-summary-strip');
  if (!container || !dataSlice.length) return;

  let html = '';

  if (type === 'thermal') {
    const temps = dataSlice.map(d => d.temp);
    const maxT = Math.max(...temps);
    const minT = Math.min(...temps);
    const maxItem = dataSlice.find(d => d.temp === maxT);
    const minItem = dataSlice.find(d => d.temp === minT);
    const maxApp = Math.max(...dataSlice.map(d => d.apparent));
    const amp = Math.round((maxT - minT) * 10) / 10;

    html = `
      <div class="chart-metric-badge highlight-warm">🔥 Máx: <strong>${Math.round(maxT)}°C</strong> <small>(${maxItem?.hourStr?.replace(':00', 'h')})</small></div>
      <div class="chart-metric-badge highlight-cool">❄️ Mín: <strong>${Math.round(minT)}°C</strong> <small>(${minItem?.hourStr?.replace(':00', 'h')})</small></div>
      <div class="chart-metric-badge">🥵 Sensación: <strong>${Math.round(maxApp)}°C</strong></div>
      <div class="chart-metric-badge">↔️ Amplitud: <strong>${amp}°C</strong></div>
    `;
  } else if (type === 'precip') {
    const totalPrecip = dataSlice.reduce((acc, d) => acc + (d.precip || 0), 0);
    const maxPrecip = Math.max(...dataSlice.map(d => d.precip || 0));
    const maxPrecipItem = dataSlice.find(d => d.precip === maxPrecip);
    const maxPop = Math.max(...dataSlice.map(d => d.pop || 0));
    const wetHours = dataSlice.filter(d => d.precip >= 0.1 || d.pop >= 45).length;

    html = `
      <div class="chart-metric-badge highlight-rain">🌧️ Total: <strong>${totalPrecip.toFixed(1)} mm</strong></div>
      <div class="chart-metric-badge highlight-rain">⚡ Pico: <strong>${maxPrecip.toFixed(1)} mm</strong> <small>(${maxPrecipItem?.hourStr?.replace(':00', 'h') || '--'})</small></div>
      <div class="chart-metric-badge">🎯 Prob. máx: <strong>${maxPop}%</strong></div>
      <div class="chart-metric-badge">🕒 Con agua: <strong>${wetHours} h</strong></div>
    `;
  } else if (type === 'wind') {
    const gusts = dataSlice.map(d => d.windGusts);
    const maxGust = Math.max(...gusts);
    const maxGustItem = dataSlice.find(d => d.windGusts === maxGust);
    const avgWind = Math.round(dataSlice.reduce((acc, d) => acc + d.windSpeed, 0) / dataSlice.length);
    const windLevel = maxGust >= 65 ? '🔴 Temporal' : (maxGust >= 45 ? '🟡 Fuerte' : '🟢 Moderado');

    html = `
      <div class="chart-metric-badge highlight-wind">💨 Racha: <strong>${Math.round(maxGust)} km/h</strong> <small>(${maxGustItem?.hourStr?.replace(':00', 'h')})</small></div>
      <div class="chart-metric-badge">🌬️ Media: <strong>${avgWind} km/h</strong></div>
      <div class="chart-metric-badge">${windLevel}</div>
      <div class="chart-metric-badge">🌪️ Máx: <strong>${Math.round(maxGust)} km/h</strong></div>
    `;
  } else if (type === 'pressure') {
    const pressures = dataSlice.map(d => d.pressure);
    const currentP = pressures[0] || 1013;
    const minP = Math.min(...pressures);
    const maxP = Math.max(...pressures);
    const minPItem = dataSlice.find(d => d.pressure === minP);
    const diff = Math.round((pressures[pressures.length - 1] - currentP) * 10) / 10;
    const trend = diff > 1.5 ? `↗️ +${diff}` : (diff < -1.5 ? `↘️ ${diff}` : `➡️ Estable`);

    html = `
      <div class="chart-metric-badge highlight-pressure">⏱️ Ahora: <strong>${Math.round(currentP)} hPa</strong></div>
      <div class="chart-metric-badge">📉 Mín: <strong>${Math.round(minP)} hPa</strong> <small>(${minPItem?.hourStr?.replace(':00', 'h')})</small></div>
      <div class="chart-metric-badge">📈 Máx: <strong>${Math.round(maxP)} hPa</strong></div>
      <div class="chart-metric-badge">Tendencia: <strong>${trend}</strong></div>
    `;
  } else if (type === 'snow') {
    const snowfalls = dataSlice.map(d => d.snowfall || 0);
    const totalSnow = snowfalls.reduce((acc, v) => acc + v, 0);
    const maxSnowHour = Math.max(...snowfalls);
    const fzLevels = dataSlice.map(d => d.freezingLevel || 0).filter(v => v > 0);
    const minFz = fzLevels.length ? Math.min(...fzLevels) : 0;
    const maxFz = fzLevels.length ? Math.max(...fzLevels) : 0;

    html = `
      <div class="chart-metric-badge highlight-snow">❄️ Nieve total: <strong>${totalSnow.toFixed(1)} cm</strong></div>
      <div class="chart-metric-badge highlight-snow">⚡ Pico: <strong>${maxSnowHour.toFixed(1)} cm/h</strong></div>
      <div class="chart-metric-badge">🏔️ Cota mín (0°C): <strong>${minFz} m</strong></div>
      <div class="chart-metric-badge">🏔️ Cota máx: <strong>${maxFz} m</strong></div>
    `;
  } else if (type === 'clouds') {
    const covers = dataSlice.map(d => d.cloudCover || 0);
    const avgCover = Math.round(covers.reduce((acc, v) => acc + v, 0) / covers.length);
    const clearHours = covers.filter(c => c < 25).length;
    const overcastHours = covers.filter(c => c >= 80).length;

    html = `
      <div class="chart-metric-badge highlight-clouds">☁️ Media nubes: <strong>${avgCover}%</strong></div>
      <div class="chart-metric-badge highlight-warm">☀️ Horas de sol: <strong>${clearHours} h</strong></div>
      <div class="chart-metric-badge">🌫️ Horas cubiertas: <strong>${overcastHours} h</strong></div>
      <div class="chart-metric-badge">✨ Claros/Nubes: <strong>${dataSlice.length - clearHours - overcastHours} h</strong></div>
    `;
  } else {
    // Multi
    const maxT = Math.max(...dataSlice.map(d => d.temp));
    const minT = Math.min(...dataSlice.map(d => d.temp));
    const totalPrecip = dataSlice.reduce((acc, d) => acc + (d.precip || 0), 0);
    const maxGust = Math.max(...dataSlice.map(d => d.windGusts));

    html = `
      <div class="chart-metric-badge highlight-warm">🌡️ Máx: <strong>${Math.round(maxT)}°C</strong></div>
      <div class="chart-metric-badge highlight-cool">❄️ Mín: <strong>${Math.round(minT)}°C</strong></div>
      <div class="chart-metric-badge highlight-rain">🌧️ Lluvia: <strong>${totalPrecip.toFixed(1)} mm</strong></div>
      <div class="chart-metric-badge highlight-wind">💨 Racha: <strong>${Math.round(maxGust)} km/h</strong></div>
    `;
  }

  container.innerHTML = html;
}

/**
 * Renderiza la cinta superior sincronizada de cielo y viento (Estilo Windy / Meteoblue)
 * Se alinea exactamente con cada columna temporal del gráfico
 */
function renderSkyTimeline(hoursData) {
  const container = document.getElementById('chart-sky-timeline');
  if (!container || !hoursData.length) return;

  const currentTheme = getActiveIconTheme();

  const html = hoursData.map(h => {
    const isGusty = (h.windGusts || 0) >= 40;
    const popClass = (h.pop && h.pop > 0) ? 'col-pop' : 'col-pop pop-zero';
    const dayStartClass = h.isStartOfDay ? ' day-start' : '';
    const iconMarkup = h.weatherInfo ? renderWeatherIconHtml(h.weatherInfo, 20, currentTheme) : (h.weatherIcon || '☀️');

    return `
      <div class="chart-sky-col${dayStartClass}" title="${h.hourStr}: ${h.weatherLabel || ''} (${h.pop || 0}%, viento ${Math.round(h.windSpeed || 0)} km/h ${h.windDirShort || ''})">
        <span class="col-icon">${iconMarkup}</span>
        <span class="${popClass}">${h.pop != null ? h.pop + '%' : ''}</span>
        <span class="col-wind ${isGusty ? 'wind-gusty' : ''}">
          <span>${Math.round(h.windSpeed || 0)}</span><small style="font-size:0.55rem;opacity:0.8;">${h.windDirShort || ''}</small>
        </span>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

/**
 * Renderiza los Titulares Inteligentes (Smart Highlights Digest)
 * Detecta automáticamente momentos clave del tramo analizado
 */
function renderSmartDigest(hoursData) {
  const container = document.getElementById('chart-smart-digest');
  if (!container || !hoursData.length) return;

  const chips = [];

  // 1. Detectar Ventana de Sol / Mejor Momento
  const sunnyStreak = [];
  let currentStreak = [];
  hoursData.forEach(h => {
    if ((h.cloudCover || 0) <= 30 && (h.pop || 0) <= 20) {
      currentStreak.push(h);
    } else {
      if (currentStreak.length > sunnyStreak.length) {
        sunnyStreak.length = 0;
        sunnyStreak.push(...currentStreak);
      }
      currentStreak = [];
    }
  });
  if (currentStreak.length > sunnyStreak.length) {
    sunnyStreak.length = 0;
    sunnyStreak.push(...currentStreak);
  }

  if (sunnyStreak.length >= 3) {
    const startH = sunnyStreak[0].hourStr.replace(':00', 'h');
    const endH = sunnyStreak[sunnyStreak.length - 1].hourStr.replace(':00', 'h');
    const startDay = sunnyStreak[0].time.toLocaleDateString('es-ES', { weekday: 'short' });
    chips.push(`
      <div class="digest-chip chip-sun">
        <span class="chip-icon">☀️</span>
        <div class="chip-content">
          <span class="chip-title">Ventana sin nubes: ${sunnyStreak.length}h seguidas</span>
          <span class="chip-desc">${startDay} de ${startH} a ${endH}</span>
        </div>
      </div>
    `);
  }

  // 2. Detectar Pico o Tramo de Lluvia
  const totalRain = hoursData.reduce((acc, h) => acc + (h.precip || 0), 0);
  if (totalRain >= 0.5) {
    const maxPrecipHour = hoursData.reduce((max, h) => (h.precip > max.precip ? h : max), hoursData[0]);
    const rainDay = maxPrecipHour.time.toLocaleDateString('es-ES', { weekday: 'short' });
    chips.push(`
      <div class="digest-chip chip-rain">
        <span class="chip-icon">🌧️</span>
        <div class="chip-content">
          <span class="chip-title">Pico de lluvia: ${maxPrecipHour.precip.toFixed(1)} mm/h</span>
          <span class="chip-desc">${rainDay} a las ${maxPrecipHour.hourStr.replace(':00', 'h')} (Acumulado: ${totalRain.toFixed(1)} mm)</span>
        </div>
      </div>
    `);
  } else {
    chips.push(`
      <div class="digest-chip chip-rain">
        <span class="chip-icon">✨</span>
        <div class="chip-content">
          <span class="chip-title">Sin lluvia significativa</span>
          <span class="chip-desc">Ambiente seco durante todo el rango</span>
        </div>
      </div>
    `);
  }

  // 3. Detectar Viento Destacado o Calma
  const maxGustHour = hoursData.reduce((max, h) => (h.windGusts > max.windGusts ? h : max), hoursData[0]);
  if (maxGustHour.windGusts >= 45) {
    const gustDay = maxGustHour.time.toLocaleDateString('es-ES', { weekday: 'short' });
    chips.push(`
      <div class="digest-chip chip-wind">
        <span class="chip-icon">💨</span>
        <div class="chip-content">
          <span class="chip-title">Racha máxima: ${Math.round(maxGustHour.windGusts)} km/h</span>
          <span class="chip-desc">${gustDay} a las ${maxGustHour.hourStr.replace(':00', 'h')} (${maxGustHour.windDirShort || ''})</span>
        </div>
      </div>
    `);
  }

  // 4. Salto Térmico / Amplitud
  const temps = hoursData.map(h => h.temp);
  const maxT = Math.max(...temps);
  const minT = Math.min(...temps);
  const diffT = Math.round((maxT - minT) * 10) / 10;
  if (diffT >= 6) {
    chips.push(`
      <div class="digest-chip chip-temp">
        <span class="chip-icon">🌡️</span>
        <div class="chip-content">
          <span class="chip-title">Contraste térmico: ${diffT}°C</span>
          <span class="chip-desc">Mínima de ${Math.round(minT)}°C y máxima de ${Math.round(maxT)}°C</span>
        </div>
      </div>
    `);
  }

  // 5. Nieve si existe
  const totalSnow = hoursData.reduce((acc, h) => acc + (h.snowfall || 0), 0);
  if (totalSnow >= 0.2) {
    chips.push(`
      <div class="digest-chip chip-snow">
        <span class="chip-icon">❄️</span>
        <div class="chip-content">
          <span class="chip-title">Nieve prevista: ${totalSnow.toFixed(1)} cm</span>
          <span class="chip-desc">Cotas medias-altas en la Cordillera</span>
        </div>
      </div>
    `);
  }

  container.innerHTML = chips.join('');
}

/**
 * Ensambla la configuración de Chart.js con soporte de Live Inspector y tooltips compactos anti-corte
 */
function buildChartConfig(ctx, type, labels, fullDates, weatherDescriptions, hoursData) {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          font: { family: 'Outfit, sans-serif', size: 12, weight: '600' },
          padding: 10,
          usePointStyle: true,
          boxWidth: 8
        }
      },
      tooltip: {
        enabled: false,
        external: function(context) {
          const readout = document.getElementById('chart-live-readout');
          if (!readout) return;
          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            readout.innerHTML = '<span class="readout-idle">👆 Toca o desliza la curva para explorar horas</span>';
            return;
          }
          if (tooltipModel.dataPoints && tooltipModel.dataPoints.length) {
            const idx = tooltipModel.dataPoints[0].dataIndex;
            const item = hoursData[idx];
            if (item) {
              const day = item.time.toLocaleDateString('es-ES', { weekday: 'short' });
              // Sintetizar descripciones largas (ej. "Nublado de noche" -> "Nublado", "Despejado de noche" -> "Despejado")
              const rawDesc = weatherDescriptions[idx] || '';
              const wDesc = rawDesc.replace(/\s+de\s+(noche|día)/gi, '').trim();

              let metricValHtml = '';
              if (type === 'thermal') {
                metricValHtml = `<span class="readout-val" style="color:#38bdf8;">🌡️ ${Math.round(item.temp)}°C</span> <span class="readout-sub">(${Math.round(item.apparent)}°)</span>`;
              } else if (type === 'precip') {
                metricValHtml = `<span class="readout-val" style="color:#38bdf8;">💧 ${item.precip.toFixed(1)}mm</span> <span class="readout-sub">(${item.pop}%)</span>`;
              } else if (type === 'wind') {
                metricValHtml = `<span class="readout-val" style="color:#f59e0b;">💨 ${Math.round(item.windGusts)} km/h</span>`;
              } else if (type === 'pressure') {
                metricValHtml = `<span class="readout-val" style="color:#c084fc;">⏱️ ${Math.round(item.pressure)} hPa</span>`;
              } else if (type === 'snow') {
                metricValHtml = `<span class="readout-val" style="color:#c084fc;">❄️ ${item.snowfall.toFixed(1)}cm</span> <span class="readout-sub">(${item.freezingLevel}m)</span>`;
              } else if (type === 'clouds') {
                metricValHtml = `<span class="readout-val" style="color:#94a3b8;">☁️ ${item.cloudCover}%</span>`;
              } else {
                metricValHtml = `<span class="readout-val" style="color:#38bdf8;">${Math.round(item.temp)}°</span> • <span class="readout-val" style="color:#60a5fa;">${item.precip.toFixed(1)}mm</span>`;
              }

              const iconMarkup = item.weatherInfo ? renderWeatherIconHtml(item.weatherInfo, 18, getActiveIconTheme()) : '';
              readout.innerHTML = `
                <div class="readout-left">
                  <span class="readout-time">🕒 ${day} ${item.hourStr}</span>
                  <span class="readout-dot">•</span>
                  ${iconMarkup ? `<span class="readout-icon-slot" style="display:inline-flex;align-items:center;vertical-align:middle;margin-right:3px;">${iconMarkup}</span>` : ''}
                  <span class="readout-desc">${item.weatherLabel || wDesc}</span>
                </div>
                <div class="readout-right">
                  ${metricValHtml}
                </div>
              `;
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: (context) => {
            const label = labels[context.index];
            return Array.isArray(label) ? 'rgba(56, 189, 248, 0.28)' : 'rgba(255, 255, 255, 0.05)';
          },
          lineWidth: (context) => {
            const label = labels[context.index];
            return Array.isArray(label) ? 1.5 : 1;
          },
          drawTicks: true
        },
        ticks: {
          color: (context) => {
            const label = labels[context.index];
            return Array.isArray(label) ? '#38bdf8' : '#94a3b8';
          },
          font: (context) => {
            const label = labels[context.index];
            return Array.isArray(label)
              ? { family: 'Outfit, sans-serif', size: 10.5, weight: '700' }
              : { family: 'Outfit, sans-serif', size: 10.5, weight: '600' };
          },
          maxRotation: 0,
          autoSkip: false,
          padding: 4
        }
      }
    }
  };

  // --- A. GRÁFICO TÉRMICO & CONFORT ---
  if (type === 'thermal') {
    const tempGrad = ctx.createLinearGradient(0, 0, 0, 300);
    tempGrad.addColorStop(0, 'rgba(56, 189, 248, 0.40)');
    tempGrad.addColorStop(1, 'rgba(56, 189, 248, 0.02)');

    return {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: hoursData.map(d => d.temp),
            borderColor: '#38bdf8',
            borderWidth: 2.8,
            backgroundColor: tempGrad,
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#38bdf8',
            pointBorderWidth: 1.8,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#38bdf8',
            yAxisID: 'yTemp'
          },
          {
            label: 'Sensación (°C)',
            data: hoursData.map(d => d.apparent),
            borderColor: '#fb923c',
            borderWidth: 2,
            borderDash: [4, 3],
            fill: false,
            tension: 0.35,
            pointRadius: 2,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#fb923c',
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#fb923c',
            yAxisID: 'yTemp'
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          ...commonOptions.scales,
          yTemp: {
            type: 'linear',
            position: 'left',
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#38bdf8',
              font: { family: 'Outfit, sans-serif', size: 10.5, weight: '700' },
              callback: (v) => v + '°'
            }
          }
        }
      }
    };
  }

  // --- B. HIDROGRAMA DE PRECIPITACIÓN & ACUMULADO ---
  if (type === 'precip') {
    let runningAccum = 0;
    const accumData = hoursData.map(d => {
      runningAccum += (d.precip || 0);
      return Math.round(runningAccum * 10) / 10;
    });

    const accumGrad = ctx.createLinearGradient(0, 0, 0, 300);
    accumGrad.addColorStop(0, 'rgba(168, 85, 247, 0.35)');
    accumGrad.addColorStop(1, 'rgba(168, 85, 247, 0.02)');

    return {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Precipitación (mm)',
            data: hoursData.map(d => d.precip),
            backgroundColor: 'rgba(56, 189, 248, 0.70)',
            borderColor: '#38bdf8',
            borderWidth: 1,
            borderRadius: 3,
            yAxisID: 'yPrecip',
            barPercentage: 0.65
          },
          {
            type: 'line',
            label: 'Acumulado (mm)',
            data: accumData,
            borderColor: '#a855f7',
            borderWidth: 2.2,
            backgroundColor: accumGrad,
            fill: true,
            tension: 0.25,
            pointRadius: 1.5,
            pointHoverRadius: 5,
            yAxisID: 'yPrecip'
          },
          {
            type: 'line',
            label: 'Probabilidad (%)',
            data: hoursData.map(d => d.pop),
            borderColor: '#60a5fa',
            borderWidth: 1.6,
            borderDash: [4, 3],
            pointRadius: 0,
            pointHoverRadius: 4,
            yAxisID: 'yPop'
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          ...commonOptions.scales,
          yPrecip: {
            type: 'linear',
            position: 'left',
            min: 0,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#38bdf8',
              font: { family: 'Outfit, sans-serif', size: 10.5, weight: '700' },
              callback: (v) => v + ' mm'
            }
          },
          yPop: {
            type: 'linear',
            position: 'right',
            min: 0,
            max: 100,
            grid: { drawOnChartArea: false },
            ticks: {
              color: '#60a5fa',
              font: { family: 'Outfit, sans-serif', size: 10, weight: '600' },
              callback: (v) => v + '%'
            }
          }
        }
      }
    };
  }

  // --- C. ANEMOGRAMA DE VIENTO & RACHAS ---
  if (type === 'wind') {
    const windGrad = ctx.createLinearGradient(0, 0, 0, 300);
    windGrad.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
    windGrad.addColorStop(1, 'rgba(245, 158, 11, 0.02)');

    return {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Rachas (km/h)',
            data: hoursData.map(d => d.windGusts),
            borderColor: '#f59e0b',
            borderWidth: 2.5,
            backgroundColor: windGrad,
            fill: true,
            tension: 0.3,
            pointRadius: 2.5,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#f59e0b',
            pointHoverRadius: 5.5,
            pointHoverBackgroundColor: '#f59e0b',
            yAxisID: 'yWind'
          },
          {
            label: 'Viento medio (km/h)',
            data: hoursData.map(d => d.windSpeed),
            borderColor: '#38bdf8',
            borderWidth: 2,
            pointRadius: 1.5,
            fill: false,
            tension: 0.3,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#38bdf8',
            yAxisID: 'yWind'
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          ...commonOptions.scales,
          yWind: {
            type: 'linear',
            position: 'left',
            min: 0,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#f59e0b',
              font: { family: 'Outfit, sans-serif', size: 10.5, weight: '700' },
              callback: (v) => v + ' km/h'
            }
          }
        }
      }
    };
  }

  // --- D. BARÓGRAFO (PRESIÓN ATMOSFÉRICA hPa) ---
  if (type === 'pressure') {
    const pressures = hoursData.map(d => d.pressure);
    const minP = Math.floor(Math.min(...pressures) - 2);
    const maxP = Math.ceil(Math.max(...pressures) + 2);

    const presGrad = ctx.createLinearGradient(0, 0, 0, 300);
    presGrad.addColorStop(0, 'rgba(192, 132, 252, 0.35)');
    presGrad.addColorStop(1, 'rgba(192, 132, 252, 0.02)');

    return {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Presión al Nivel del Mar (hPa)',
            data: pressures,
            borderColor: '#c084fc',
            borderWidth: 2.8,
            backgroundColor: presGrad,
            fill: true,
            tension: 0.35,
            pointRadius: 3,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#c084fc',
            pointBorderWidth: 1.8,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#c084fc',
            yAxisID: 'yPressure'
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          ...commonOptions.scales,
          yPressure: {
            type: 'linear',
            position: 'left',
            min: minP,
            max: maxP,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#c084fc',
              font: { family: 'Outfit, sans-serif', size: 10.5, weight: '700' },
              callback: (v) => v + ' hPa'
            }
          }
        }
      }
    };
  }

  // --- E. NIEVE & COTA (ALTITUD Y ESPESOR) ---
  if (type === 'snow') {
    const snowGrad = ctx.createLinearGradient(0, 0, 0, 300);
    snowGrad.addColorStop(0, 'rgba(192, 132, 252, 0.40)');
    snowGrad.addColorStop(1, 'rgba(192, 132, 252, 0.02)');

    return {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Nieve horaria (cm)',
            data: hoursData.map(d => d.snowfall),
            backgroundColor: 'rgba(192, 132, 252, 0.75)',
            borderColor: '#c084fc',
            borderWidth: 1.5,
            borderRadius: 4,
            yAxisID: 'ySnow',
            barPercentage: 0.65
          },
          {
            type: 'line',
            label: 'Cota de nieve (m)',
            data: hoursData.map(d => d.freezingLevel),
            borderColor: '#38bdf8',
            borderWidth: 2.2,
            pointRadius: 2,
            pointHoverRadius: 5,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#38bdf8',
            yAxisID: 'yAlt',
            tension: 0.25
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          ...commonOptions.scales,
          ySnow: {
            type: 'linear',
            position: 'left',
            min: 0,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#c084fc',
              font: { family: 'Outfit, sans-serif', size: 10.5, weight: '700' },
              callback: (v) => v + ' cm'
            }
          },
          yAlt: {
            type: 'linear',
            position: 'right',
            min: 0,
            grid: { drawOnChartArea: false },
            ticks: {
              color: '#38bdf8',
              font: { family: 'Outfit, sans-serif', size: 10, weight: '600' },
              callback: (v) => v + ' m'
            }
          }
        }
      }
    };
  }

  // --- F. NUBOSIDAD (COBERTURA TOTAL DE CIELO %) ---
  if (type === 'clouds') {
    const cloudGrad = ctx.createLinearGradient(0, 0, 0, 300);
    cloudGrad.addColorStop(0, 'rgba(148, 163, 184, 0.35)');
    cloudGrad.addColorStop(1, 'rgba(148, 163, 184, 0.02)');

    return {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Cobertura Nubosa (%)',
            data: hoursData.map(d => d.cloudCover),
            borderColor: '#94a3b8',
            borderWidth: 2.4,
            backgroundColor: cloudGrad,
            fill: true,
            tension: 0.35,
            pointRadius: 2.5,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#94a3b8',
            pointHoverRadius: 5,
            yAxisID: 'yClouds'
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          ...commonOptions.scales,
          yClouds: {
            type: 'linear',
            position: 'left',
            min: 0,
            max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: {
              color: '#94a3b8',
              font: { family: 'Outfit, sans-serif', size: 10.5, weight: '700' },
              callback: (v) => v + '%'
            }
          }
        }
      }
    };
  }

  // --- G. MULTIVARIABLE (COMBINADO CLÁSICO) ---
  const tempGradient = ctx.createLinearGradient(0, 0, 0, 300);
  tempGradient.addColorStop(0, 'rgba(56, 189, 248, 0.40)');
  tempGradient.addColorStop(1, 'rgba(56, 189, 248, 0.02)');

  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: hoursData.map(d => d.temp),
          borderColor: '#38bdf8',
          borderWidth: 2.8,
          backgroundColor: tempGradient,
          fill: true,
          tension: 0.35,
          yAxisID: 'yTemp',
          pointRadius: 3,
          pointBackgroundColor: '#0f172a',
          pointBorderColor: '#38bdf8',
          pointBorderWidth: 1.8,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#38bdf8'
        },
        {
          label: 'Probabilidad (%)',
          data: hoursData.map(d => d.pop),
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96, 165, 250, 0.45)',
          type: 'bar',
          yAxisID: 'yRain',
          borderRadius: 4,
          barPercentage: 0.55
        },
        {
          label: 'Rachas (km/h)',
          data: hoursData.map(d => d.windGusts),
          borderColor: '#f59e0b',
          borderWidth: 2.2,
          borderDash: [4, 3],
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#f59e0b',
          yAxisID: 'yWind',
          tension: 0.3
        }
      ]
    },
    options: {
      ...commonOptions,
      scales: {
        ...commonOptions.scales,
        yTemp: {
          type: 'linear',
          position: 'left',
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#38bdf8',
            font: { family: 'Outfit, sans-serif', size: 10.5, weight: '700' },
            callback: (v) => v + '°'
          }
        },
        yRain: {
          type: 'linear',
          position: 'right',
          max: 100,
          min: 0,
          grid: { drawOnChartArea: false },
          ticks: {
            color: '#60a5fa',
            font: { family: 'Outfit, sans-serif', size: 10, weight: '600' },
            callback: (v) => v + '%'
          }
        },
        yWind: {
          display: false,
          min: 0
        }
      }
    }
  };
}