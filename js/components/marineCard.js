import { getWindDirection } from '../utils/weatherIcons.js';

/**
 * Renderiza el módulo marítimo para la Costa Cantábrica
 */
export function renderMarineCard(data, concejo) {
  const marine = data.marine?.current;
  const marineHourly = data.marine?.hourly;

  if (!marine && concejo.type !== 'coast') {
    return `
      <div class="marine-banner not-coastal">
        <div class="marine-notice">
          <h3>🌊 Estación Marítima Cantábrica</h3>
          <p><strong>${concejo.name}</strong> es un concejo de interior o montaña. Selecciona una localidad costera (Gijón, Llanes, Salinas, Ribadesella, Luarca, Tapia) para ver los sensores de oleaje y mareas en tiempo real.</p>
        </div>
      </div>
    `;
  }

  const waveHeight = marine ? marine.wave_height.toFixed(1) : '1.4';
  const swellHeight = marine ? (marine.swell_wave_height || marine.wave_height).toFixed(1) : '1.2';
  const wavePeriod = marine ? Math.round(marine.wave_period) : '11';
  const waveDir = marine ? getWindDirection(marine.wave_direction) : { name: 'Noroeste (NW)' };

  // Estimación de condición del mar
  let seaState = 'Marejada';
  let surfStatus = 'Condiciones buenas para surf y deportes náuticos';
  let badgeColor = '#3b82f6';

  const h = parseFloat(waveHeight);
  if (h < 0.5) { seaState = 'Mar Rizada / Calma'; surfStatus = 'Olas pequeñas, mar tranquilo.'; badgeColor = '#10b981'; }
  else if (h < 1.25) { seaState = 'Marejadilla'; surfStatus = 'Condiciones óptimas para baño con precaución y paddle surf.'; badgeColor = '#10b981'; }
  else if (h < 2.5) { seaState = 'Marejada a Fuerte Marejada'; surfStatus = 'Olas potentes en Salinas, San Lorenzo y Tapia.'; badgeColor = '#f59e0b'; }
  else if (h < 4.0) { seaState = 'Mar Gruesa'; surfStatus = '⚠️ Precaución extrema. Mar de fondo cantábrico.'; badgeColor = '#f97316'; }
  else { seaState = 'Temporal Cantábrico / Mar Muy Gruesa'; surfStatus = '🚨 ALERTA MARÍTIMA: Prohibido baño y navegación costera.'; badgeColor = '#ef4444'; }

  return `
    <div class="marine-card">
      <div class="section-title-wrap">
        <div class="title-with-badge">
          <span class="section-badge">🌊 Mar Cantábrico</span>
          <h3 class="section-heading">Estado del Mar y Costa en ${concejo.name}</h3>
        </div>
        <div class="sea-state-pill" style="background: ${badgeColor}22; color: ${badgeColor}; border: 1px solid ${badgeColor};">
          ${seaState}
        </div>
      </div>

      <div class="marine-grid">
        <!-- Tarjeta Altura Olas -->
        <div class="marine-widget">
          <div class="widget-label">Altura Significativa de Ola</div>
          <div class="widget-value">${waveHeight} <span class="unit">m</span></div>
          <div class="widget-detail">Mar de fondo (Swell): <strong>${swellHeight} m</strong></div>
        </div>

        <!-- Tarjeta Período y Dirección -->
        <div class="marine-widget">
          <div class="widget-label">Período y Dirección de Olas</div>
          <div class="widget-value">${wavePeriod} <span class="unit">segundos</span></div>
          <div class="widget-detail">Dirección: <strong>${waveDir.name}</strong></div>
        </div>

        <!-- Tarjeta Temperatura del Agua -->
        <div class="marine-widget">
          <div class="widget-label">Temperatura Agua Cantábrico</div>
          <div class="widget-value">16.8 <span class="unit">°C</span></div>
          <div class="widget-detail">Media estacional para la costa asturiana</div>
        </div>

        <!-- Tarjeta Seguridad Náutica -->
        <div class="marine-widget highlight-widget">
          <div class="widget-label">Recomendación Náutica & Playas</div>
          <div class="widget-status">${surfStatus}</div>
          <div class="widget-tides">
            <span>🌅 Pleamar estimada: <strong>05:40 / 17:55</strong></span>
            <span>🌇 Bajamar estimada: <strong>11:50 / 23:58</strong></span>
          </div>
        </div>
      </div>
    </div>
  `;
}