import { getWeatherInfo } from '../utils/weatherIcons.js?v=1.1.60';

/**
 * 📈 METEOROLOGÍA GRÁFICA (Suite Multivariable de Observatorio Horario)
 * Permite explorar curvas especializadas de Temperatura y Sensación, Hidrograma de Lluvia,
 * Anemograma de Viento, Barógrafo de Presión y Gráfica Combinada en rangos de 24h, 48h y 72h.
 */

let meteoChart = null;
let activeChartType = 'thermal'; // 'thermal' | 'precip' | 'wind' | 'pressure' | 'multi'
let activeHours = 48; // 24 | 48 | 72
let cachedHourlyData = null;
let canvasTargetId = 'meteo-chart-canvas';
let eventsInitialized = false;

/**
 * Inicializa la escucha de eventos táctiles y clics para los selectores de variable y horas
 */
function initChartControls() {
  if (eventsInitialized) return;
  eventsInitialized = true;

  document.addEventListener('click', (e) => {
    // Selector de Variable
    const pillBtn = e.target.closest('.chart-pill-btn');
    if (pillBtn) {
      e.preventDefault();
      const type = pillBtn.dataset.chart;
      if (type && type !== activeChartType) {
        activeChartType = type;
        updateActivePillsUI();
        if (cachedHourlyData) {
          renderCurrentChart();
        }
      }
      return;
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
 * Actualiza las clases visuales de los botones de la barra de controles
 */
function updateActivePillsUI() {
  document.querySelectorAll('.chart-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.chart === activeChartType);
  });
  document.querySelectorAll('.chart-range-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.hours, 10) === activeHours);
  });

  const subtitleEl = document.getElementById('chart-section-subtitle');
  if (subtitleEl) {
    const subtitles = {
      thermal: 'Evolución horaria de temperatura real vs. sensación térmica y confort',
      precip: 'Hidrograma de precipitaciones, probabilidad y volumen acumulado (mm)',
      wind: 'Anemograma de velocidad media del viento y rachas máximas (km/h)',
      pressure: 'Barógrafo de presión atmosférica a nivel del mar (hPa) y detección de frentes',
      multi: 'Curvas continuas clásicas combinadas de temperatura, lluvia y viento'
    };
    subtitleEl.textContent = subtitles[activeChartType] || subtitles.thermal;
  }

  const hintEl = document.getElementById('chart-scroll-hint');
  if (hintEl) {
    hintEl.textContent = `👈 Desliza la gráfica para explorar las ${activeHours}h 👉`;
  }
}

/**
 * Función principal expuesta para renderizar la suite de gráficos
 */
export function renderWeatherChart(canvasId = 'meteo-chart-canvas', hourlyData = null, hoursCount = null) {
  if (canvasId) canvasTargetId = canvasId;
  if (hourlyData) cachedHourlyData = hourlyData;
  if (hoursCount && !eventsInitialized) activeHours = hoursCount;

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
    // Ancho proporcional holgado (52px por hora) para deslizamiento táctil ultra cómodo
    const targetWidth = Math.max(1050, hoursCount * 52);
    wrapper.style.minWidth = `${targetWidth}px`;
  }

  if (meteoChart) {
    meteoChart.destroy();
    meteoChart = null;
  }

  const currentHour = new Date().getHours();
  const labels = [];
  const fullDates = [];
  const weatherDescriptions = [];
  const hoursData = [];

  const weatherCodes = hourlyData.weather_code || hourlyData.weathercode || [];

  for (let i = currentHour; i < currentHour + hoursCount && i < hourlyData.time.length; i++) {
    const d = new Date(hourlyData.time[i]);
    const isStartOfDay = d.getHours() === 0;
    const isFirstHour = i === currentHour;
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

    fullDates.push(d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }));

    const isDay = (hourlyData.is_day && hourlyData.is_day[i] != null) ? hourlyData.is_day[i] : (d.getHours() >= 8 && d.getHours() < 21 ? 1 : 0);
    const pop = hourlyData.precipitation_probability ? (hourlyData.precipitation_probability[i] || 0) : 0;
    const precipMm = hourlyData.precipitation ? (hourlyData.precipitation[i] || 0) : 0;
    const wCode = weatherCodes[i] != null ? weatherCodes[i] : 0;

    // Nowcasting
    const isImmediate = (i === currentHour || i === currentHour + 1);
    const useUv = (isImmediate && hourlyData.uv_index && hourlyData.uv_index[i] != null) ? hourlyData.uv_index[i] : null;
    const useDirectIrr = (isImmediate && hourlyData.direct_normal_irradiance && hourlyData.direct_normal_irradiance[i] != null) ? hourlyData.direct_normal_irradiance[i] : null;
    const useSw = (isImmediate && hourlyData.shortwave_radiation && hourlyData.shortwave_radiation[i] != null) ? hourlyData.shortwave_radiation[i] : null;
    const cloudCoverHour = (hourlyData.cloud_cover && hourlyData.cloud_cover[i] != null) ? hourlyData.cloud_cover[i] : null;

    const wInfo = getWeatherInfo(wCode, isDay, precipMm, pop, useDirectIrr, useUv, useSw, cloudCoverHour);
    weatherDescriptions.push(`${wInfo.icon} ${wInfo.label}${precipMm >= 0.1 ? ` (${precipMm.toFixed(1)} mm)` : ''}`);

    hoursData.push({
      time: d,
      hourStr,
      temp: hourlyData.temperature_2m ? hourlyData.temperature_2m[i] : 0,
      apparent: hourlyData.apparent_temperature ? hourlyData.apparent_temperature[i] : hourlyData.temperature_2m[i],
      pop,
      precip: precipMm,
      windSpeed: hourlyData.wind_speed_10m ? hourlyData.wind_speed_10m[i] : 0,
      windGusts: hourlyData.wind_gusts_10m ? hourlyData.wind_gusts_10m[i] : 0,
      pressure: hourlyData.pressure_msl ? hourlyData.pressure_msl[i] : (hourlyData.surface_pressure ? hourlyData.surface_pressure[i] : 1015),
      humidity: hourlyData.relative_humidity_2m ? hourlyData.relative_humidity_2m[i] : 75
    });
  }

  // Renderizar franja de métricas clave resumidas
  renderSummaryStrip(activeChartType, hoursData);

  const ctx = canvas.getContext('2d');
  const chartConfig = buildChartConfig(ctx, activeChartType, labels, fullDates, weatherDescriptions, hoursData);

  meteoChart = new Chart(ctx, chartConfig);
}

/**
 * Renderiza la franja de pastillas de datos clave sobre el gráfico
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
      <div class="chart-metric-badge highlight-warm">🔥 Máx: <strong>${Math.round(maxT)}°C</strong> <small>(${maxItem?.hourStr})</small></div>
      <div class="chart-metric-badge highlight-cool">❄️ Mín: <strong>${Math.round(minT)}°C</strong> <small>(${minItem?.hourStr})</small></div>
      <div class="chart-metric-badge">🥵 Sensación máx: <strong>${Math.round(maxApp)}°C</strong></div>
      <div class="chart-metric-badge">↔️ Amplitud térmica: <strong>${amp}°C</strong></div>
    `;
  } else if (type === 'precip') {
    const totalPrecip = dataSlice.reduce((acc, d) => acc + (d.precip || 0), 0);
    const maxPrecip = Math.max(...dataSlice.map(d => d.precip || 0));
    const maxPrecipItem = dataSlice.find(d => d.precip === maxPrecip);
    const maxPop = Math.max(...dataSlice.map(d => d.pop || 0));
    const wetHours = dataSlice.filter(d => d.precip >= 0.1 || d.pop >= 45).length;

    html = `
      <div class="chart-metric-badge highlight-rain">🌧️ Lluvia acumulada: <strong>${totalPrecip.toFixed(1)} mm</strong></div>
      <div class="chart-metric-badge highlight-rain">⚡ Pico: <strong>${maxPrecip.toFixed(1)} mm/h</strong> <small>(${maxPrecipItem?.hourStr || '--'})</small></div>
      <div class="chart-metric-badge">🎯 Probabilidad máx: <strong>${maxPop}%</strong></div>
      <div class="chart-metric-badge">🕒 Horas con agua: <strong>${wetHours} h</strong></div>
    `;
  } else if (type === 'wind') {
    const gusts = dataSlice.map(d => d.windGusts);
    const maxGust = Math.max(...gusts);
    const maxGustItem = dataSlice.find(d => d.windGusts === maxGust);
    const avgWind = Math.round(dataSlice.reduce((acc, d) => acc + d.windSpeed, 0) / dataSlice.length);
    const windLevel = maxGust >= 65 ? '🔴 Temporal Cantábrico' : (maxGust >= 45 ? '🟡 Rachas fuertes' : '🟢 Viento moderado');

    html = `
      <div class="chart-metric-badge highlight-wind">💨 Racha máxima: <strong>${Math.round(maxGust)} km/h</strong> <small>(${maxGustItem?.hourStr})</small></div>
      <div class="chart-metric-badge">🌬️ Viento medio: <strong>${avgWind} km/h</strong></div>
      <div class="chart-metric-badge">${windLevel}</div>
    `;
  } else if (type === 'pressure') {
    const pressures = dataSlice.map(d => d.pressure);
    const currentP = pressures[0] || 1013;
    const minP = Math.min(...pressures);
    const maxP = Math.max(...pressures);
    const minPItem = dataSlice.find(d => d.pressure === minP);
    const diff = Math.round((pressures[pressures.length - 1] - currentP) * 10) / 10;
    const trend = diff > 1.5 ? `↗️ Subiendo (+${diff} hPa)` : (diff < -1.5 ? `↘️ Bajando (${diff} hPa)` : `➡️ Estable (${diff} hPa)`);

    html = `
      <div class="chart-metric-badge highlight-pressure">⏱️ Presión ahora: <strong>${Math.round(currentP)} hPa</strong></div>
      <div class="chart-metric-badge">📉 Mínimo: <strong>${Math.round(minP)} hPa</strong> <small>(${minPItem?.hourStr})</small></div>
      <div class="chart-metric-badge">📈 Máximo: <strong>${Math.round(maxP)} hPa</strong></div>
      <div class="chart-metric-badge">Tendencia: <strong>${trend}</strong></div>
    `;
  } else {
    // Multi
    const maxT = Math.max(...dataSlice.map(d => d.temp));
    const totalPrecip = dataSlice.reduce((acc, d) => acc + (d.precip || 0), 0);
    const maxGust = Math.max(...dataSlice.map(d => d.windGusts));

    html = `
      <div class="chart-metric-badge highlight-warm">🌡️ Máx: <strong>${Math.round(maxT)}°C</strong></div>
      <div class="chart-metric-badge highlight-rain">🌧️ Acumulado: <strong>${totalPrecip.toFixed(1)} mm</strong></div>
      <div class="chart-metric-badge highlight-wind">💨 Racha máx: <strong>${Math.round(maxGust)} km/h</strong></div>
    `;
  }

  container.innerHTML = html;
}

/**
 * Ensambla la configuración de Chart.js según la variable seleccionada
 */
function buildChartConfig(ctx, type, labels, fullDates, weatherDescriptions, hoursData) {
  // 1. Configuración común de tooltips e interacciones
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
          font: { family: 'Outfit, sans-serif', size: 13, weight: '600' },
          padding: 14,
          usePointStyle: true,
          boxWidth: 9
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#38bdf8',
        titleFont: { size: 13, weight: 'bold', family: 'Outfit, sans-serif' },
        bodyFont: { size: 12, family: 'Outfit, sans-serif' },
        padding: 12,
        borderColor: 'rgba(56, 189, 248, 0.3)',
        borderWidth: 1,
        boxPadding: 6,
        callbacks: {
          title: function(items) {
            const index = items[0].dataIndex;
            return '🕒 ' + fullDates[index];
          },
          afterTitle: function(items) {
            const index = items[0].dataIndex;
            return weatherDescriptions[index] || '';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: (context) => {
            const label = labels[context.index];
            return Array.isArray(label) ? 'rgba(56, 189, 248, 0.28)' : 'rgba(255, 255, 255, 0.06)';
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
              ? { family: 'Outfit, sans-serif', size: 11, weight: '700' }
              : { family: 'Outfit, sans-serif', size: 11, weight: '600' };
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
    const tempGrad = ctx.createLinearGradient(0, 0, 0, 340);
    tempGrad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
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
            borderWidth: 3,
            backgroundColor: tempGrad,
            fill: true,
            tension: 0.35,
            pointRadius: 3.5,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#38bdf8',
            pointBorderWidth: 2,
            pointHoverRadius: 6.5,
            pointHoverBackgroundColor: '#38bdf8',
            yAxisID: 'yTemp'
          },
          {
            label: 'Sensación Térmica (°C)',
            data: hoursData.map(d => d.apparent),
            borderColor: '#fb923c',
            borderWidth: 2.2,
            borderDash: [5, 4],
            fill: false,
            tension: 0.35,
            pointRadius: 2.5,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#fb923c',
            pointHoverRadius: 6,
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
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: '#38bdf8',
              font: { family: 'Outfit, sans-serif', size: 11, weight: '700' },
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

    const accumGrad = ctx.createLinearGradient(0, 0, 0, 340);
    accumGrad.addColorStop(0, 'rgba(168, 85, 247, 0.35)');
    accumGrad.addColorStop(1, 'rgba(168, 85, 247, 0.02)');

    return {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Precipitación (mm/h)',
            data: hoursData.map(d => d.precip),
            backgroundColor: 'rgba(56, 189, 248, 0.70)',
            borderColor: '#38bdf8',
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: 'yPrecip',
            barPercentage: 0.65
          },
          {
            type: 'line',
            label: 'Lluvia Acumulada (mm)',
            data: accumData,
            borderColor: '#a855f7',
            borderWidth: 2.5,
            backgroundColor: accumGrad,
            fill: true,
            tension: 0.25,
            pointRadius: 2,
            pointHoverRadius: 5,
            yAxisID: 'yPrecip'
          },
          {
            type: 'line',
            label: 'Probabilidad de Lluvia (%)',
            data: hoursData.map(d => d.pop),
            borderColor: '#60a5fa',
            borderWidth: 1.8,
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
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: '#38bdf8',
              font: { family: 'Outfit, sans-serif', size: 11, weight: '700' },
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
              font: { family: 'Outfit, sans-serif', size: 11, weight: '600' },
              callback: (v) => v + '%'
            }
          }
        }
      }
    };
  }

  // --- C. ANEMOGRAMA DE VIENTO & RACHAS ---
  if (type === 'wind') {
    const windGrad = ctx.createLinearGradient(0, 0, 0, 340);
    windGrad.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
    windGrad.addColorStop(1, 'rgba(245, 158, 11, 0.02)');

    return {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Rachas Máximas (km/h)',
            data: hoursData.map(d => d.windGusts),
            borderColor: '#f59e0b',
            borderWidth: 2.8,
            backgroundColor: windGrad,
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#f59e0b',
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#f59e0b',
            yAxisID: 'yWind'
          },
          {
            label: 'Velocidad Media (km/h)',
            data: hoursData.map(d => d.windSpeed),
            borderColor: '#38bdf8',
            borderWidth: 2.2,
            pointRadius: 2,
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
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: '#f59e0b',
              font: { family: 'Outfit, sans-serif', size: 11, weight: '700' },
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

    const presGrad = ctx.createLinearGradient(0, 0, 0, 340);
    presGrad.addColorStop(0, 'rgba(192, 132, 252, 0.40)');
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
            borderWidth: 3,
            backgroundColor: presGrad,
            fill: true,
            tension: 0.35,
            pointRadius: 3.5,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#c084fc',
            pointBorderWidth: 2,
            pointHoverRadius: 6.5,
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
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: '#c084fc',
              font: { family: 'Outfit, sans-serif', size: 11, weight: '700' },
              callback: (v) => v + ' hPa'
            }
          }
        }
      }
    };
  }

  // --- E. MULTIVARIABLE (COMBINADO CLÁSICO) ---
  const tempGradient = ctx.createLinearGradient(0, 0, 0, 320);
  tempGradient.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
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
          borderWidth: 3,
          backgroundColor: tempGradient,
          fill: true,
          tension: 0.35,
          yAxisID: 'yTemp',
          pointRadius: 4,
          pointBackgroundColor: '#0f172a',
          pointBorderColor: '#38bdf8',
          pointBorderWidth: 2,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#38bdf8'
        },
        {
          label: 'Probabilidad de Lluvia (%)',
          data: hoursData.map(d => d.pop),
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96, 165, 250, 0.45)',
          type: 'bar',
          yAxisID: 'yRain',
          borderRadius: 5,
          barPercentage: 0.55
        },
        {
          label: 'Rachas de Viento (km/h)',
          data: hoursData.map(d => d.windGusts),
          borderColor: '#f59e0b',
          borderWidth: 2.5,
          borderDash: [5, 4],
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
          grid: { color: 'rgba(255, 255, 255, 0.06)' },
          ticks: {
            color: '#38bdf8',
            font: { family: 'Outfit, sans-serif', size: 11, weight: '700' },
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
            font: { family: 'Outfit, sans-serif', size: 11, weight: '600' },
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