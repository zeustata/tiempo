/**
 * Generador de gráficos de evolución con Chart.js
 */
let meteoChart = null;

export function renderWeatherChart(canvasId, hourlyData) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || typeof Chart === 'undefined') return;

  if (meteoChart) {
    meteoChart.destroy();
  }

  const hoursToDisplay = 36;
  const currentHour = new Date().getHours();
  const labels = [];
  const temps = [];
  const rains = [];
  const winds = [];

  for (let i = currentHour; i < currentHour + hoursToDisplay && i < hourlyData.time.length; i++) {
    const d = new Date(hourlyData.time[i]);
    labels.push(d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
    temps.push(hourlyData.temperature_2m[i]);
    rains.push(hourlyData.precipitation_probability[i] || 0);
    winds.push(hourlyData.wind_gusts_10m[i] || 0);
  }

  meteoChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: temps,
          borderColor: '#38bdf8',
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          fill: true,
          tension: 0.4,
          yAxisID: 'yTemp',
          pointRadius: 3,
          pointHoverRadius: 6
        },
        {
          label: 'Probabilidad de Lluvia (%)',
          data: rains,
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96, 165, 250, 0.4)',
          type: 'bar',
          yAxisID: 'yRain',
          borderRadius: 4
        },
        {
          label: 'Rachas de Viento (km/h)',
          data: winds,
          borderColor: '#f59e0b',
          borderDash: [4, 4],
          pointRadius: 0,
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
          labels: {
            color: '#cbd5e1',
            font: { family: 'Outfit, sans-serif', size: 12 }
          }
        },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#38bdf8',
          borderColor: '#334155',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#94a3b8' }
        },
        yTemp: {
          type: 'linear',
          position: 'left',
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: '#38bdf8',
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
            callback: (v) => v + '%'
          }
        },
        yWind: {
          display: false
        }
      }
    }
  });
}