import { getWindDirection } from '../utils/weatherIcons.js?v=1.0.75';
import { getRealtimeTideStatus } from '../utils/tides.js?v=1.0.75';
import { 
  PLAYAS_POR_CONCEJO, 
  getNearestCoastalReference, 
  getSurfWindCondition,
  getBeachSpecificWindCondition,
  getSeaWaterTemperature
} from './marineCard.js?v=1.0.75';

/**
 * Calcula la escala de Douglas a partir de la altura significativa de ola
 */
function getDouglasScale(height) {
  if (height < 0.1) return { degree: 0, name: 'Mar llana' };
  if (height < 0.5) return { degree: 1, name: 'Mar rizada' };
  if (height < 1.25) return { degree: 2, name: 'Marejadilla' };
  if (height < 2.5) return { degree: 3, name: 'Marejada' };
  if (height < 4.0) return { degree: 4, name: 'Fuerte marejada' };
  if (height < 6.0) return { degree: 5, name: 'Gruesa' };
  if (height < 9.0) return { degree: 6, name: 'Muy gruesa' };
  if (height < 14.0) return { degree: 7, name: 'Arbolada' };
  return { degree: 8, name: 'Montañosa' };
}

/**
 * Recomienda el grosor de neopreno según la temperatura del agua
 */
function getWetsuitRecommendation(tempC) {
  const t = typeof tempC === 'number' ? tempC : 14;
  if (t < 13) return { suit: '5/4 mm con capucha y escarpines', icon: '❄️', tag: 'Muy Fría' };
  if (t < 15) return { suit: '4/3 mm con escarpines', icon: '🌊', tag: 'Fría' };
  if (t < 18) return { suit: '4/3 mm estándar o 3/2 mm sellado', icon: '🏄‍♂️', tag: 'Fresca' };
  if (t < 21) return { suit: '3/2 mm integral / primavera', icon: '☀️', tag: 'Agradable' };
  return { suit: '2 mm shorty o bañador / licra', icon: '🌴', tag: 'Cálida' };
}

/**
 * Calcula la Energía de la Ola en kiloJulios (kJ) según la física oceanográfica (E ~ k * H_swell^2 * T)
 * Calibrada con estándares reales de Surf-Forecast y oceanografía cantábrica (factor k=11)
 */
export function calculateWaveEnergy(heightM, periodS) {
  const h = Math.max(0, parseFloat(heightM) || 0);
  const t = Math.max(1, parseFloat(periodS) || 1);
  
  // Calibración estándar de energía en kJ para rompientes cantábricas
  const rawKj = Math.round(11 * (h * h) * t);

  let label = 'Suave (Iniciación / Poca Fuerza)';
  let shortLabel = 'Suave';
  let badgeClass = 'energy-soft';
  let color = '#10b981';
  let icon = '🟢';
  let desc = 'Olas dóciles con poco empuje. Excelente para escuelas, principiantes y longboard.';

  if (rawKj >= 1200) {
    label = 'Pesada (Solo Expertos)';
    shortLabel = 'Pesada';
    badgeClass = 'energy-extreme';
    color = '#ef4444';
    icon = '🔴';
    desc = 'Gran potencia y masa de agua con fuertes corrientes. Solo surfistas expertos.';
  } else if (rawKj >= 500) {
    label = 'Potente (Tubos / Consistente)';
    shortLabel = 'Potente';
    badgeClass = 'energy-high';
    color = '#f97316';
    icon = '🟠';
    desc = 'Mucha fuerza y empuje. Paredes consistentes, huecas y tubulares.';
  } else if (rawKj >= 200) {
    label = 'Óptima (Divertida / Shortboard)';
    shortLabel = 'Óptima';
    badgeClass = 'energy-optimal';
    color = '#fbbf24';
    icon = '🟡';
    desc = 'Potencia ideal y buen empuje para maniobras con tabla corta y evolutiva.';
  }

  return {
    kj: rawKj,
    label,
    shortLabel,
    badgeClass,
    color,
    icon,
    desc
  };
}

/**
 * Evalúa la calidad global del swell para surfing
 */
function evaluateSurfQuality(waveHeight, wavePeriod, windCondition) {
  const h = parseFloat(waveHeight) || 1.2;
  const p = parseInt(wavePeriod, 10) || 10;
  const isOffshoreOrGlassy = windCondition.type === 'offshore' || windCondition.type === 'glassy';

  if (h >= 0.8 && h <= 2.5 && p >= 11 && isOffshoreOrGlassy) {
    return {
      status: '🔥 Sesión Épica / Olas Excelentes',
      badge: 'Excelente',
      color: '#10b981',
      bg: '#10b98122',
      border: '#10b981',
      desc: 'Mar de fondo largo con período de calidad y viento favorable que peina la rompiente.'
    };
  }
  if (h >= 0.6 && h <= 3.0 && p >= 9) {
    if (windCondition.type === 'onshore') {
      return {
        status: '🌊 Olas con Mar Picado (Chop)',
        badge: 'Chop / Desordenado',
        color: '#f59e0b',
        bg: '#f59e0b22',
        border: '#f59e0b',
        desc: 'Hay fuerza y tamaño de ola, pero el viento onshore genera espuma y textura rizada.'
      };
    }
    return {
      status: '🏄‍♂️ Buenas Condiciones para Surfear',
      badge: 'Buenas Olas',
      color: '#38bdf8',
      bg: '#38bdf822',
      border: '#38bdf8',
      desc: 'Buen tamaño de ola y consistencia en la mayoría de rompientes expuestas.'
    };
  }
  if (h < 0.6) {
    return {
      status: '🏖️ Mar Casi Plato / Olas Muy Pequeñas',
      badge: 'Olas Pequeñas',
      color: '#94a3b8',
      bg: '#94a3b822',
      border: '#94a3b8',
      desc: 'Ideal para tablas con mucho volumen (Longboard, SUP, Softboard) o iniciación.'
    };
  }
  return {
    status: '⚠️ Mar Fuerte / Oleaje Duro y Masivo',
    badge: 'Mar Duro / Pro',
    color: '#ef4444',
    bg: '#ef444422',
    border: '#ef4444',
    desc: 'Olas de gran tamaño y fuertes corrientes. Solo apto para surfistas experimentados en calas resguardadas.'
  };
}

/**
 * Genera los tramos de previsión cada 3 horas para Hoy y Mañana (estilo Surf-Forecast / Windguru)
 */
function getSurfTimelineSlots(data, concejo) {
  const marineHourly = data.marine?.hourly;
  const weatherHourly = data.weather?.hourly;
  if (!weatherHourly || !weatherHourly.time) return [];

  const now = new Date();
  const slots = [];
  const targetHours = [8, 11, 14, 17, 20];

  [0, 1].forEach(dayOffset => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayOffset);
    const dayLabel = dayOffset === 0 ? 'Hoy' : 'Mañana';
    const dayName = d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });

    targetHours.forEach(hour => {
      const targetDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, 0, 0);
      const hourPrefix = `${targetDate.getFullYear()}-${String(targetDate.getMonth()+1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}T${String(hour).padStart(2, '0')}`;
      
      let idx = weatherHourly.time.findIndex(t => t.startsWith(hourPrefix));
      if (idx === -1) {
        idx = dayOffset * 24 + hour;
      }
      if (idx < 0 || idx >= weatherHourly.time.length) return;

      const timeStr = `${String(hour).padStart(2, '0')}:00`;
      const isPast = dayOffset === 0 && now.getHours() > (hour + 1);

      // Métricas de oleaje
      const rawH = marineHourly?.wave_height ? marineHourly.wave_height[idx] : null;
      const h = (typeof rawH === 'number') ? rawH.toFixed(1) : '1.3';
      
      const rawSwellH = marineHourly?.swell_wave_height ? marineHourly.swell_wave_height[idx] : null;
      const swellH = (typeof rawSwellH === 'number') ? rawSwellH.toFixed(1) : h;

      const rawPeriod = marineHourly?.wave_period ? marineHourly.wave_period[idx] : null;
      const period = (typeof rawPeriod === 'number') ? Math.round(rawPeriod) : 11;

      const energy = calculateWaveEnergy(swellH, period);

      // Viento y calidad
      const windSpd = Math.round(weatherHourly.wind_speed_10m[idx] || 0);
      const windDeg = weatherHourly.wind_direction_10m[idx] || 180;
      const windDirObj = getWindDirection(windDeg);
      const surfWind = getSurfWindCondition(windDeg, windSpd);

      // Estado de marea
      const tideStatus = getRealtimeTideStatus(targetDate, concejo.lon || -5.6615);

      slots.push({
        dayOffset,
        dayLabel,
        dayName,
        timeStr,
        fullDate: targetDate,
        isPast,
        h,
        swellH,
        period,
        energy,
        windSpd,
        windDeg,
        windDirObj,
        surfWind,
        tideStatus
      });
    });
  });

  return slots;
}

/**
 * Renderiza el módulo especializado de Surf, Rompientes & Olas
 */
export function renderSurfCard(data, concejo) {
  const marine = data.marine?.current;
  const current = data.weather.current;

  const isCoasting = PLAYAS_POR_CONCEJO[concejo.id] !== undefined;
  const coastalData = isCoasting ? PLAYAS_POR_CONCEJO[concejo.id] : null;
  const interiorRef = !isCoasting ? getNearestCoastalReference(concejo) : null;
  const activePlayas = isCoasting 
    ? (coastalData ? coastalData.playas : [])
    : (PLAYAS_POR_CONCEJO[interiorRef.refId] ? PLAYAS_POR_CONCEJO[interiorRef.refId].playas : []);

  // Métricas del oleaje y swell
  const waveHeight = (marine && typeof marine.wave_height === 'number') ? marine.wave_height.toFixed(1) : (isCoasting ? '1.4' : '1.3');
  const swellHeight = (marine && typeof marine.swell_wave_height === 'number') ? marine.swell_wave_height.toFixed(1) : ((marine && typeof marine.wave_height === 'number') ? marine.wave_height.toFixed(1) : '1.2');
  const wavePeriod = (marine && typeof marine.wave_period === 'number') ? Math.round(marine.wave_period) : 11;
  const waveDir = (marine && typeof marine.wave_direction === 'number') ? getWindDirection(marine.wave_direction) : { name: 'Noroeste (NW)' };
  const windWaveH = (marine && typeof marine.wind_wave_height === 'number') ? marine.wind_wave_height.toFixed(1) : '0.6';
  
  // Viento actual
  const windSpeed = Math.round(current.wind_speed_10m || 0);
  const windDeg = current.wind_direction_10m !== undefined ? current.wind_direction_10m : 180;
  const windDirObj = getWindDirection(windDeg);
  
  // Análisis dinámico Offshore / Onshore
  const surfWind = getSurfWindCondition(windDeg, windSpeed);

  // Energía de la Ola (kJ) basada en mar de fondo (Swell)
  const waveEnergy = calculateWaveEnergy(swellHeight || waveHeight, wavePeriod);

  // Escala Douglas
  const douglas = getDouglasScale(parseFloat(waveHeight));
  const douglasDegree = douglas.degree;
  const douglasName = douglas.name;

  // Calidad global del swell
  const surfQuality = evaluateSurfQuality(waveHeight, wavePeriod, surfWind);

  // Temperatura del mar y traje unificada
  const seaTemp = getSeaWaterTemperature(marine);
  const wetsuit = getWetsuitRecommendation(parseFloat(seaTemp));

  // Tramos de evolución a 3 horas
  const timelineSlots = getSurfTimelineSlots(data, concejo);

  return `
    <div class="marine-card">
      <div class="section-title-wrap">
        <div>
          <h3 class="section-heading">🏄‍♂️ Surf, Rompientes & Olas de ${concejo.name}</h3>
          <span class="section-subtitle">
            ${isCoasting 
              ? `Dinámica marina y picos de ${concejo.name} (${coastalData.region}) • Swell Cantábrico`
              : `🌲 ${concejo.name} es concejo de interior. Rompientes enfocadas a la costa más cercana: ${interiorRef.name}`
            }
          </span>
        </div>
        <div class="sea-state-pill" style="background: ${surfQuality.bg}; color: ${surfQuality.color}; border: 1px solid ${surfQuality.border};">
          Grado ${douglasDegree} • ${douglasName} (${waveHeight}m)
        </div>
      </div>

      <!-- 1. GRID DE SENSORES TÉCNICOS DE SWELL, ENERGÍA Y ROMPIENTE -->
      <div class="marine-grid">
        <!-- Altura de Ola Significativa -->
        <div class="marine-widget">
          <div class="widget-label">Altura del Oleaje (Significativa)</div>
          <div class="widget-value">${waveHeight} <span class="unit">metros</span></div>
          <div class="widget-detail">Mar de fondo (Swell): <strong>${swellHeight} m</strong></div>
          <div class="widget-detail">Mar de viento (Chop): <strong>${windWaveH} m</strong></div>
        </div>

        <!-- Período y Dirección del Swell -->
        <div class="marine-widget">
          <div class="widget-label">Período y Dirección del Swell</div>
          <div class="widget-value">${wavePeriod} <span class="unit">segundos</span></div>
          <div class="widget-detail">Dirección del oleaje: <strong>${waveDir.name}</strong></div>
          <div class="widget-detail">Viento en costa: <strong>${windSpeed} km/h (${windDirObj.name})</strong></div>
        </div>

        <!-- Energía de la Ola (kJ) -->
        <div class="marine-widget surf-energy-widget">
          <div class="t-label-row">
            <span class="widget-label">⚡ Energía de la Ola (Potencia)</span>
            <button class="btn-explain-sensor" data-explain="surf_energy" title="¿Qué es la energía de la ola en kJ? Pulsa para aprender">💡 Explícame</button>
          </div>
          <div class="widget-value" style="color: ${waveEnergy.color};">${waveEnergy.kj} <span class="unit">kJ (kiloJulios)</span></div>
          <div class="surf-energy-badge-row">
            <span class="surf-energy-pill ${waveEnergy.badgeClass}" style="background: ${waveEnergy.color}22; color: ${waveEnergy.color}; border: 1px solid ${waveEnergy.color}66;">
              ${waveEnergy.icon} ${waveEnergy.label}
            </span>
          </div>
          <div class="widget-detail" style="margin-top: 6px;">${waveEnergy.desc}</div>
        </div>

        <!-- Aptitud y Calidad de la Rompiente -->
        <div class="marine-widget surf-turismo-visual-widget">
          <div class="surf-widget-top">
            <div class="surf-title-row">
              <span class="surf-title-icon">🏄‍♂️</span>
              <div>
                <div class="surf-title-main">Condición de Rompiente</div>
                <div class="surf-title-sub">${isCoasting ? `Playas de ${concejo.name}` : `Costa de ${interiorRef.name}`}</div>
              </div>
            </div>
            <div class="surf-flag-badge" style="background: ${surfQuality.bg}; color: ${surfQuality.color}; border: 1px solid ${surfQuality.border};">
              ${surfQuality.badge}
            </div>
          </div>

          <div class="surf-status-banner" style="color: ${surfQuality.color};">
            ${surfQuality.status}
          </div>
          <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 6px; line-height: 1.3;">
            ${surfQuality.desc}
          </div>
        </div>

        <!-- Temperatura Marina y Traje Recomendado -->
        <div class="marine-widget">
          <div class="widget-label">Temperatura del Agua & Neopreno</div>
          <div class="widget-value">${seaTemp} <span class="unit">°C</span></div>
          <div class="widget-detail">${wetsuit.icon} Traje sugerido: <strong>${wetsuit.suit}</strong></div>
          <div class="widget-detail">Sensación marina: <strong>Agua ${wetsuit.tag}</strong></div>
        </div>
      </div>

      <!-- 2. CRONOGRAMA DE SURF CADA 3 HORAS (EVOLUCIÓN HORARIA TIPO SURF-FORECAST / WINDGURU) -->
      ${timelineSlots.length > 0 ? `
        <div class="marine-widget surf-timeline-widget" style="margin-top: 20px; margin-bottom: 20px;">
          <div class="surf-timeline-header">
            <div class="surf-timeline-title-wrap">
              <span class="surf-timeline-icon">⏱️</span>
              <div>
                <div class="surf-timeline-title">Evolución de Rompiente & Swell a 3 Horas</div>
                <div class="surf-timeline-subtitle">Previsión en franjas clave (08h, 11h, 14h, 17h, 20h) • Hoy y Mañana</div>
              </div>
            </div>
            <button class="btn-explain-sensor" data-explain="surf_energy" title="¿Cómo interpretar la energía en kJ de las olas? Pulsa para aprender">
              💡 Energía (kJ)
            </button>
          </div>

          <div class="surf-timeline-scroll-container">
            <div class="surf-timeline-scroll-hint">
              <span>👆 Desliza horizontalmente para ver la evolución a 3 horas de Hoy y Mañana</span>
            </div>
            <div class="surf-timeline-grid">
              ${timelineSlots.map(slot => `
                <div class="surf-slot-card ${slot.isPast ? 'is-past' : ''}">
                  <div class="surf-slot-top">
                    <span class="slot-day">${slot.dayLabel}</span>
                    <span class="slot-hour">${slot.timeStr}</span>
                  </div>

                  <!-- Ola y Swell -->
                  <div class="slot-metric-row">
                    <div class="slot-metric-main">
                      <span class="slot-wave-val">${slot.h}m</span>
                      <span class="slot-swell-sub">Swell: ${slot.swellH}m</span>
                    </div>
                    <div class="slot-period-badge">
                      <span class="period-num">${slot.period}s</span>
                      <span class="period-lbl">período</span>
                    </div>
                  </div>

                  <!-- Energía kJ -->
                  <div class="slot-energy-box" style="border-left: 3px solid ${slot.energy.color}; background: rgba(15, 23, 42, 0.65);">
                    <div class="slot-energy-top">
                      <span class="slot-energy-kj" style="color: ${slot.energy.color};">⚡ ${slot.energy.kj} kJ</span>
                      <span class="slot-energy-tag" style="color: ${slot.energy.color};">${slot.energy.shortLabel}</span>
                    </div>
                  </div>

                  <!-- Viento y Calidad -->
                  <div class="slot-wind-box ${slot.surfWind.statusClass}" style="border: 1px solid ${slot.surfWind.color}55;">
                    <div class="slot-wind-top">
                      <span class="slot-wind-badge" style="color: ${slot.surfWind.color};">${slot.surfWind.badge}</span>
                      <span class="slot-wind-speed">${slot.windSpd} km/h</span>
                    </div>
                    <div class="slot-wind-dir">${slot.windDirObj.name}</div>
                  </div>

                  <!-- Marea en esa hora -->
                  <div class="slot-tide-row">
                    <span class="slot-tide-ico">${slot.tideStatus.directionIcon}</span>
                    <span class="slot-tide-txt">${slot.tideStatus.directionName.split(' ')[0]}</span>
                    <span class="slot-tide-h">${slot.tideStatus.currentWaterHeight}m</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      <!-- 3. PANEL DE INTELIGENCIA DE SURF: VIENTO OFFSHORE/ONSHORE & GUÍA DIDÁCTICA -->
      <div class="marine-widget surf-intelligence-card" style="margin-top: 20px; margin-bottom: 20px;">
        <div class="surf-intel-header">
          <div class="surf-intel-title-wrap">
            <span class="surf-intel-icon">🧭</span>
            <div>
              <div class="surf-intel-title">Calidad de Viento para Surf (Offshore / Onshore)</div>
              <div class="surf-intel-subtitle">Análisis aerodinámico en vivo cruzando viento y orientación cantábrica</div>
            </div>
          </div>
          <button class="btn-explain-sensor surf-guide-btn" data-explain="surf" title="Aprender sobre Offshore, Fondos, Izquierdas y Picos">
            💡 Guía de Surf y Olas
          </button>
        </div>

        <div class="surf-wind-analysis-grid">
          <!-- Tarjeta de Estado del Viento en Vivo -->
          <div class="surf-wind-pill-card ${surfWind.statusClass}">
            <div class="surf-wind-badge-row">
              <span class="surf-wind-status-badge" style="background: ${surfWind.color}22; color: ${surfWind.color}; border: 1px solid ${surfWind.color}80;">
                ${surfWind.badge}
              </span>
              <span class="surf-wind-reading">${windSpeed} km/h • ${windDirObj.name} (${Math.round(windDeg)}°)</span>
            </div>
            <div class="surf-wind-desc-text">
              <strong>${surfWind.name}:</strong> ${surfWind.desc}
            </div>
            <div class="surf-wind-effect-tag">
              ⚡ <strong>Efecto en la rompiente:</strong> ${surfWind.effect}
            </div>
          </div>

          <!-- Consejos de Orientación y Lectura Rápida -->
          <div class="surf-quick-tips-card">
            <div class="quick-tip-row">
              <span class="tip-icon">🟢</span>
              <div class="tip-body">
                <strong>Offshore (Viento Sur):</strong> Ideal. Peina la ola, crea tubos y deja el mar como un espejo.
              </div>
            </div>
            <div class="quick-tip-row">
              <span class="tip-icon">🔴</span>
              <div class="tip-body">
                <strong>Onshore (Viento Norte):</strong> Mar picado (chop), aplasta las olas y genera espuma.
              </div>
            </div>
            <div class="quick-tip-row">
              <span class="tip-icon">🏄‍♂️</span>
              <div class="tip-body">
                <strong>Izquierdas / Derechas:</strong> Se definen siempre mirando hacia la playa desde la ola.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. CATÁLOGO TÉCNICO DE PICOS DE SURF, FONDOS & ROMPIENTES -->
      <div class="marine-ports-section">
        <div class="beach-section-header">
          <div>
            <h4 class="ports-title" style="margin-bottom: 2px;">
              🏖️ Rompientes, Picos de Surf & Fondos de ${isCoasting ? concejo.name : `${concejo.name} (en ${interiorRef.name})`}
            </h4>
            <span class="beach-section-subtitle">
              Picos bautizados, orientación de costa, viento en tiempo real, tipo de fondo y marea óptima
            </span>
          </div>
        </div>

        <div class="beaches-grid">
          ${activePlayas.map(p => {
            const beachWind = getBeachSpecificWindCondition(p.facingDeg || 355, windDeg, windSpeed);
            return `
              <div class="beach-card">
                <div class="beach-card-top">
                  <span class="beach-card-name">${p.name}</span>
                  <span class="beach-card-tag">${p.tag || 'Playa'}</span>
                </div>
                
                <div class="beach-card-desc">${p.type}</div>

                <div class="beach-specs-table">
                  ${p.picos ? `
                    <div class="beach-picos-box">
                      <span class="picos-box-label">📍 PICOS DE SURF:</span>
                      <span class="picos-box-value">${p.picos}</span>
                    </div>
                  ` : ''}

                  <!-- Diagnóstico de Viento en Vivo específico para esta playa según su orientación -->
                  <div class="beach-spec-row ${beachWind.statusClass}" style="border-left: 3px solid ${beachWind.color}; background: rgba(15, 23, 42, 0.55);">
                    <span class="spec-label">💨 VIENTO EN ESTA PLAYA (${p.facing ? `Mira al ${p.facing}` : 'Costera'}):</span>
                    <span class="spec-value" style="color: ${beachWind.color}; font-weight: 700;">
                      ${beachWind.badge} • ${beachWind.shortDesc}
                    </span>
                  </div>

                  <div class="beach-spec-row">
                    <span class="spec-label">🪨 Fondo Marino:</span>
                    <span class="spec-value">${p.bottom || '🏖️ Arena (Beach Break)'}</span>
                  </div>

                  <div class="beach-spec-row">
                    <span class="spec-label">🔄 Dirección Ola:</span>
                    <span class="spec-value">${p.waveType || '↔️ Picos A-Frame'}</span>
                  </div>

                  <div class="beach-spec-row">
                    <span class="spec-label">⏳ Marea Óptima:</span>
                    <span class="spec-value">${p.bestTide || 'Media Marea'}</span>
                  </div>

                  <div class="beach-spec-row">
                    <span class="spec-label">🎯 Nivel Técnico:</span>
                    <span class="spec-value level-badge">${p.surfLevel || 'Todos'}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}


