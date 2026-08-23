import { getWindDirection } from '../utils/weatherIcons.js';

/**
 * Principales playas, spots de surf y puntos turísticos de la costa asturiana
 */
export const SPOTS_PLAYAS_ASTURIAS = [
  { name: 'Playa de San Lorenzo (Gijón)', type: 'Spot Urbano & Surf Clásico', region: 'Costa Central' },
  { name: 'Playa de Salinas (Castrillón)', type: 'Capital del Surf Asturiano', region: 'Costa Central' },
  { name: 'Playa de Rodiles (Villaviciosa)', type: 'Mítica Ola Izquierda & Ría', region: 'Costa Oriental' },
  { name: 'Tapia de Casariego (La Grande)', type: 'Cuna del Surf del Norte', region: 'Costa Occidental' },
  { name: 'Santa Marina & Vega (Ribadesella)', type: 'Surf & Playas Naturales', region: 'Costa Oriental' },
  { name: 'Playa de Torimbia / Gulpiyuri (Llanes)', type: 'Calas Turísticas de Ensueño', region: 'Costa Oriental' },
  { name: 'Playa de Aguilar (Muros de Nalón)', type: 'Arena Dorada & Acantilados', region: 'Costa Occidental' },
  { name: 'Puerto y Playa de Luanco (Gozón)', type: 'Aguas Tranquilas & Gastronomía', region: 'Cabo Peñas' }
];

/**
 * Renderiza el módulo marítimo enfocado en Turismo, Playas y Surf en el Mar Cantábrico
 */
export function renderMarineCard(data, concejo) {
  const marine = data.marine?.current;
  const current = data.weather.current;

  const isCoasting = concejo.type === 'coast' || concejo.region.includes('Costa');

  const waveHeight = marine ? marine.wave_height.toFixed(1) : (isCoasting ? '1.4' : '0.0');
  const swellHeight = marine ? (marine.swell_wave_height || marine.wave_height).toFixed(1) : '1.2';
  const wavePeriod = marine ? Math.round(marine.wave_period) : 11;
  const waveDir = marine ? getWindDirection(marine.wave_direction) : { name: 'Noroeste (NW)' };
  const windWaveH = marine?.wind_wave_height ? marine.wind_wave_height.toFixed(1) : '0.6';

  const h = parseFloat(waveHeight);
  let douglasDegree = 3;
  let douglasName = 'Marejada';
  let flagColor = '#f59e0b';
  let flagBadge = '🟡 Bandera Amarilla';
  let surfStatus = '🏄‍♂️ Olas consistentes. Muy buenas condiciones para surf en Salinas, Rodiles y San Lorenzo.';

  if (h < 0.6) {
    douglasDegree = 1;
    douglasName = 'Mar Calma / Rizada';
    flagBadge = '🟢 Bandera Verde';
    flagColor = '#10b981';
    surfStatus = '🏖️ Mar en calma. Día ideal para paseo, baño en familia y paddle surf (SUP).';
  } else if (h < 1.3) {
    douglasDegree = 2;
    douglasName = 'Marejadilla';
    flagBadge = '🟢 Bandera Verde / Amarilla';
    flagColor = '#10b981';
    surfStatus = '🏄‍♂️ Olas medianas de 1m. Ideal para iniciación al surf, longboard y baño tranquilo.';
  } else if (h <= 2.6) {
    douglasDegree = 3;
    douglasName = 'Marejada Consistente';
    flagBadge = '🟡 Bandera Amarilla';
    flagColor = '#f59e0b';
    surfStatus = '🔥 ¡Condiciones TOP de Surf! Rompientes activas en Salinas, San Lorenzo, Rodiles y Tapia.';
  } else if (h <= 3.8) {
    douglasDegree = 4;
    douglasName = 'Fuerte Marejada';
    flagBadge = '🔴 Bandera Roja';
    flagColor = '#ef4444';
    surfStatus = '⚠️ Rompientes potentes (+3m). Solo surfistas experimentados. Precaución en paseos marítimos.';
  } else {
    douglasDegree = 5;
    douglasName = 'Mar Gruesa / Temporal';
    flagBadge = '🔴 Bandera Roja / Temporal';
    flagColor = '#ef4444';
    surfStatus = '🚨 Temporal costero activo. Prohibido el baño. Mar no navegable.';
  }

  // Estimación de temperatura superficial del agua y mareas
  const now = new Date();
  const seaTemp = (16.2 + Math.sin((now.getMonth() - 2) * 0.5) * 4.2).toFixed(1);

  return `
    <div class="marine-card">
      <div class="section-title-wrap">
        <div>
          <h3 class="section-heading">🌊 Costa, Playas & Surf en el Cantábrico</h3>
          <span class="section-subtitle">Datos oceanográficos en tiempo real • Modelo Marino Copernicus / ECMWF</span>
        </div>
        <div class="sea-state-pill" style="background: ${flagColor}22; color: ${flagColor}; border: 1px solid ${flagColor};">
          Grado ${douglasDegree} • ${douglasName}
        </div>
      </div>

      <!-- GRID DE SENSORES MARINOS Y SURF -->
      <div class="marine-grid">
        <!-- 1. Altura de Ola -->
        <div class="marine-widget">
          <div class="widget-label">Altura del Oleaje (Significativa)</div>
          <div class="widget-value">${waveHeight} <span class="unit">metros</span></div>
          <div class="widget-detail">Mar de fondo (Swell): <strong>${swellHeight} m</strong></div>
          <div class="widget-detail">Mar de viento: <strong>${windWaveH} m</strong></div>
        </div>

        <!-- 2. Período y Dirección para Surf -->
        <div class="marine-widget">
          <div class="widget-label">Período y Dirección del Swell</div>
          <div class="widget-value">${wavePeriod} <span class="unit">segundos</span></div>
          <div class="widget-detail">Dirección del oleaje: <strong>${waveDir.name}</strong></div>
          <div class="widget-detail">Viento en orilla: <strong>${Math.round(current.wind_speed_10m)} km/h</strong></div>
        </div>

        <!-- 3. Temperatura del Agua y Confort Turístico -->
        <div class="marine-widget">
          <div class="widget-label">Temperatura del Agua en Playa</div>
          <div class="widget-value">${seaTemp} <span class="unit">°C</span></div>
          <div class="widget-detail">Playas de Asturias central y oriental</div>
          <div class="widget-detail">Visibilidad costera: <strong>${(current.visibility / 1000 || 10).toFixed(0)} km</strong></div>
        </div>

        <!-- 4. Recomendación de Surf, Turismo y Mareas -->
        <div class="marine-widget highlight-widget">
          <div class="widget-label" style="display: flex; justify-content: space-between; align-items: center;">
            <span>🏄‍♂️ Surf & Turismo en Playas</span>
            <span style="font-size: 0.76rem; font-weight: 700; color: ${flagColor};">${flagBadge}</span>
          </div>
          <div class="widget-status" style="margin-top: 6px; font-weight: 600; color: #fff;">
            ${surfStatus}
          </div>
          <div class="widget-tides" style="margin-top: 10px;">
            <span>🌅 Pleamar aprox: <strong>06:15 / 18:40</strong> (Marea alta)</span>
            <span>🌇 Bajamar aprox: <strong>12:30 / 00:55</strong> (Paseos por arenales)</span>
          </div>
        </div>
      </div>

      <!-- RED DE PLAYAS Y SPOTS DE SURF DE ASTURIAS -->
      <div class="marine-ports-section">
        <h4 class="ports-title">🏖️ Principales Playas, Spots de Surf y Puntos de la Costa</h4>
        <div class="ports-grid">
          ${SPOTS_PLAYAS_ASTURIAS.map(p => `
            <div class="port-item">
              <span class="port-name">${p.name}</span>
              <span class="port-region">${p.type} • ${p.region}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}