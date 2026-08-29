import { getWeatherInfo } from '../utils/weatherIcons.js?v=1.0.40';

/**
 * Generador de gráficos de evolución horaria (48h) con scroll horizontal interactivo en móviles
 */
let meteoChart = null;

export function renderWeatherChart(canvasId, hourlyData, hoursCount = 48) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === 'undefined') return;

  const wrapper = document.getElementById('chart-canvas-wrapper');
  if (wrapper) {
    // Ancho proporcional holgado (54px por hora = ~2592px para 48h) para máxima legibilidad táctil
    const targetWidth = Math.max(1400, hoursCount * 54);
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
  const temps = [];
  const rains = [];
  const winds = [];

  const weatherCodes = hourlyData.weather_code || hourlyData.weathercode || [];

  for (let i = currentHour; i < currentHour + hoursCount && i < hourlyData.time.length; i++) {
    const d = new Date(hourlyData.time[i]);
    const isStartOfDay = d.getHours() === 0;
    const isFirstHour = i === currentHour;
    const dayPrefix = d.toLocaleDateString('es-ES', { weekday: 'short' });
    const formattedDay = dayPrefix.charAt(0).toUpperCase() + dayPrefix.slice(1);
    const hourStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    // Si es medianoche o la primera hora, incluimos el día arriba y la hora abajo en 2 líneas limpias
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

    const wInfo = getWeatherInfo(wCode, isDay, precipMm, pop);
    weatherDescriptions.push(`${wInfo.icon} ${wInfo.label}${precipMm >= 0.1 ? ` (${precipMm.toFixed(1)} mm)` : ''}`);

    temps.push(hourlyData.temperature_2m[i]);
    rains.push(pop);
    winds.push(hourlyData.wind_gusts_10m[i] || 0);
  }

  const ctx = canvas.getContext('2d');

  // Crear degradado para el área de temperatura
  const tempGradient = ctx.createLinearGradient(0, 0, 0, 320);
  tempGradient.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  tempGradient.addColorStop(1, 'rgba(56, 189, 248, 0.02)');

  meteoChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: temps,
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
          pointHoverBackgroundColor: '#38bdf8',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2
        },
        {
          label: 'Probabilidad de Lluvia (%)',
          data: rains,
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96, 165, 250, 0.45)',
          type: 'bar',
          yAxisID: 'yRain',
          borderRadius: 5,
          barPercentage: 0.55
        },
        {
          label: 'Rachas de Viento (km/h)',
          data: winds,
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
            padding: 16,
            usePointStyle: true,
            boxWidth: 10
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
            },
            label: function(item) {
              if (item.dataset.label.includes('Temperatura')) {
                return ` 🌡️ Temperatura: ${item.formattedValue} °C`;
              }
              if (item.dataset.label.includes('Lluvia')) {
                return ` 💧 Probabilidad lluvia: ${item.formattedValue} %`;
              }
              if (item.dataset.label.includes('Viento')) {
                return ` 💨 Rachas viento: ${item.formattedValue} km/h`;
              }
              return item.formattedValue;
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
        },
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
  });
}