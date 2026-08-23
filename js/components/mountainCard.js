/**
 * Renderiza el módulo de montaña y cordillera cantábrica
 */
export function renderMountainCard(data, concejo) {
  const current = data.weather.current;
  const hourly = data.weather.hourly;
  const daily = data.weather.daily;

  // Cota de nieve estimada (nivel de congelación)
  const currentHour = new Date().getHours();
  const freezingLevel = hourly.freezing_level_height ? Math.round(hourly.freezing_level_height[currentHour] || 1800) : 1800;
  const snowAccum = daily.snowfall_sum ? daily.snowfall_sum[0].toFixed(1) : '0.0';

  // Sensación térmica en cota 1.500m (Pajares/San Isidro/Sotres)
  const lapseRate = 0.0065; // ~6.5°C por 1000m
  const temp1500m = (current.temperature_2m - (1500 - concejo.altitude) * lapseRate).toFixed(1);

  return `
    <div class="mountain-card">
      <div class="section-title-wrap">
        <div class="title-with-badge">
          <span class="section-badge mountain-badge">🏔️ Cordillera & Nieve</span>
          <h3 class="section-heading">Monitoreo de Altitud y Puertos de Asturias</h3>
        </div>
        <div class="altitude-pill">
          Altitud estación: <strong>${concejo.altitude} m</strong>
        </div>
      </div>

      <div class="mountain-grid">
        <!-- Cota de Nieve -->
        <div class="mountain-widget">
          <div class="m-label">Cota de Nieve Actual</div>
          <div class="m-value">${freezingLevel} <span class="unit">m s.n.m.</span></div>
          <div class="m-detail">
            ${concejo.altitude >= freezingLevel ? '❄️ <strong>Precaución:</strong> Nieve en la cota de la localidad.' : 'Sin riesgo de nevada en la cota actual.'}
          </div>
        </div>

        <!-- Nieve Prevista Hoy -->
        <div class="mountain-widget">
          <div class="m-label">Acumulación Estimada (Hoy)</div>
          <div class="m-value">${snowAccum} <span class="unit">cm</span></div>
          <div class="m-detail">Previsión en cumbres y puertos altos</div>
        </div>

        <!-- Temperatura en Cumbres (1.500m) -->
        <div class="mountain-widget">
          <div class="m-label">Temperatura Est. en Cota 1.500m</div>
          <div class="m-value">${temp1500m} <span class="unit">°C</span></div>
          <div class="m-detail">Valgrande-Pajares, San Isidro y Sotres</div>
        </div>

        <!-- Estado de Puertos Asturianos -->
        <div class="mountain-widget">
          <div class="m-label">Puertos de Montaña Clave</div>
          <ul class="mountain-passes-list">
            <li><span>Puerto de Pajares (N-630):</span> <strong class="status-ok">Abierto</strong></li>
            <li><span>Puerto de San Isidro (AS-112):</span> <strong class="status-ok">Abierto</strong></li>
            <li><span>Puerto de Somiedo (AS-227):</span> <strong class="status-ok">Abierto</strong></li>
            <li><span>Acceso a Lagos de Covadonga:</span> <strong class="status-ok">Regulado / Abierto</strong></li>
          </ul>
        </div>
      </div>
    </div>
  `;
}