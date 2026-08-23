import { getWindDirection } from '../utils/weatherIcons.js';
import { 
  getMoonAndTideInfo, 
  getDailyTideEvents, 
  getRealtimeTideStatus, 
  getWeeklyTides, 
  renderTideSvgGraph 
} from '../utils/tides.js';

/**
 * Base de datos exhaustiva de playas y calas de cada concejo costero de Asturias
 */
export const PLAYAS_POR_CONCEJO = {
  'gijon': {
    name: 'Gijón / Xixón',
    region: 'Costa Central',
    playas: [
      { name: 'Playa de San Lorenzo', type: 'Surf clásico, escaleras 1 a 15 y paseo del Muro', tag: 'Urbana & Surf' },
      { name: 'Playa de Poniente', type: 'Aguas tranquilas, puerto deportivo y arena fina', tag: 'Familiar' },
      { name: 'Playa del Arbeyal', type: 'Playa resguardada en La Calzada', tag: 'Tranquila' },
      { name: 'Playa de Estaño', type: 'Cala con encanto y pozo natural de marea', tag: 'Cala' },
      { name: 'Playa de Peñarrubia', type: 'Acantilados imponentes y rompientes de surf', tag: 'Natural' },
      { name: 'Playa de Serín', type: 'Cala virgen entre acantilados salvajes', tag: 'Salvaje' }
    ]
  },
  'castrillon': {
    name: 'Castrillón',
    region: 'Costa Central',
    playas: [
      { name: 'Playa de Salinas', type: 'Meca del surf asturiano, dunas y gran paseo', tag: 'Surf Top' },
      { name: 'Playa de San Juan de Nieva', type: 'Potente rompiente de olas en la entrada de la ría', tag: 'Surf' },
      { name: 'Playa de Arnao', type: 'Piscina natural fósil y Museo de la Mina', tag: 'Histórica' },
      { name: 'Santa María del Mar', type: 'Cala protegida con islote rocoso', tag: 'Familiar' },
      { name: 'Playa de Bayas / El Sablón', type: 'Arenal virgen más largo de Asturias', tag: 'Monumento Natural' }
    ]
  },
  'llanes': {
    name: 'Llanes',
    region: 'Costa Oriental',
    playas: [
      { name: 'Playa de Torimbia', type: 'Cala paisajística virgen protegida de postal', tag: 'Salvaje' },
      { name: 'Playa de Gulpiyuri', type: 'Monumento Natural: playa interior de mar en un prado', tag: 'Monumento Natural' },
      { name: 'Playa de Barro', type: 'Aguas cristalinas y arena fina protegida del viento', tag: 'Familiar' },
      { name: 'Playa de Toró', type: 'Formaciones rocosas kársticas puntiagudas', tag: 'Fotogénica' },
      { name: 'Playa del Sablón', type: 'Arenal urbano junto a la muralla medieval', tag: 'Urbana' },
      { name: 'Playa de Poo', type: 'Piscina natural de marea ideal para baño seguro', tag: 'Familiar' },
      { name: 'Playa de Cuevas del Mar', type: 'Arcos gigantes de roca sobre el agua', tag: 'Paisaje' }
    ]
  },
  'villaviciosa': {
    name: 'Villaviciosa',
    region: 'Costa Oriental',
    playas: [
      { name: 'Playa de Rodiles', type: 'Mítica ola izquierda mundial, pinar y dunas', tag: 'Surf Top' },
      { name: 'Playa del Puntal', type: 'Aguas mansas en el estuario de la Ría de Villaviciosa', tag: 'Ría' },
      { name: 'Playa de Tazones', type: 'Junto al puerto marinero con huellas de dinosaurio', tag: 'Marinera' },
      { name: 'Playa de Merón', type: 'Cala virgen entre acantilados jurásicos', tag: 'Tranquila' }
    ]
  },
  'ribadesella': {
    name: 'Ribadesella',
    region: 'Costa Oriental',
    playas: [
      { name: 'Playa de Santa Marina', type: 'Arenal histórico con palacetes indianos y surf', tag: 'Urbana & Surf' },
      { name: 'Playa de Vega', type: 'Arenal salvaje, rompientes de surf y dunas protegidas', tag: 'Monumento Natural' },
      { name: 'Playa de Guadamía', type: 'Fiordo natural entre acantilados y bufones', tag: 'Fiordo' }
    ]
  },
  'gozon': {
    name: 'Gozón (Luanco)',
    region: 'Cabo Peñas',
    playas: [
      { name: 'Playa de Luanco', type: 'Playa tranquila junto al muelle y casco histórico', tag: 'Familiar' },
      { name: 'Playa de Verdicio', type: 'Olas consistentes de mar abierto, dunas y surf', tag: 'Surf' },
      { name: 'Playa de Bañugues', type: 'Aguas someras sin olas, fósiles y mar calma', tag: 'Familiar' },
      { name: 'Playa de Aguilera', type: 'Cala virgen de aguas esmeralda cerca de Peñas', tag: 'Natural' }
    ]
  },
  'cudillero': {
    name: 'Cudillero',
    region: 'Costa Occidental',
    playas: [
      { name: 'Playa del Silencio (El Gavieru)', type: 'Anfiteatro rocoso único de aguas cristalinas', tag: 'Top Paisaje' },
      { name: 'Concha de Artedo', type: 'Gran bahía protegida de cantos rodados y arena', tag: 'Protegida' },
      { name: 'San Pedro de la Ribera', type: 'Arenal amplio con pradera y desembocadura', tag: 'Familiar' }
    ]
  },
  'tapia': {
    name: 'Tapia de Casariego',
    region: 'Costa Occidental',
    playas: [
      { name: 'Playa de La Grande', type: 'Cuna del surf de Asturias y campeonato mundial', tag: 'Surf Top' },
      { name: 'Playa del Murallón', type: 'Piscina marina natural de agua salada', tag: 'Piscina Salada' },
      { name: 'Playa de Serantes', type: 'Desembocadura de río y arenal tranquilo', tag: 'Natural' },
      { name: 'Santa Gadea', type: 'Cala rocosa de mar abierto y cantos', tag: 'Salvaje' }
    ]
  },
  'valdes': {
    name: 'Valdés (Luarca)',
    region: 'Costa Occidental',
    playas: [
      { name: 'Playas de Luarca (1ª y 2ª)', type: 'Aguas calmas y protegidas por el espigón blanco', tag: 'Familiar' },
      { name: 'Playa de Portizuelo', type: 'Piedras del óleo y paisaje de pescadores', tag: 'Pintoresca' },
      { name: 'Playa de Otur', type: 'Arenal amplio con dunas y oleaje limpio para surf', tag: 'Surf' },
      { name: 'Playa de Cueva', type: 'Desembocadura del río Esva entre altos acantilados', tag: 'Paisaje' },
      { name: 'Playa de Barayo', type: 'Reserva natural parcial de marisma y dunas', tag: 'Reserva Natural' }
    ]
  },
  'carreno': {
    name: 'Carreño (Candás)',
    region: 'Costa Central',
    playas: [
      { name: 'Playa de Candás', type: 'Playa urbana con paseo marítimo', tag: 'Urbana' },
      { name: 'Playa de la Palmera', type: 'Aguas tranquilas y ambiente marinero', tag: 'Familiar' },
      { name: 'Playa de Carranques (Perlora)', type: 'Ensenada de aguas mansas en la Ciudad de Vacaciones', tag: 'Tranquila' },
      { name: 'Playa de Tranqueru', type: 'Cala natural accesible por la Vía Verde costera', tag: 'Cala' }
    ]
  },
  'colunga': {
    name: 'Colunga',
    region: 'Costa Oriental',
    playas: [
      { name: 'Playa de La Isla', type: 'Amplio arenal con islote accesible a pie en bajamar', tag: 'Familiar' },
      { name: 'Playa de La Griega', type: 'Icnitas y huellas gigantes de dinosaurios', tag: 'Jurásica' },
      { name: 'Playa de Lastres', type: 'Arenal bajo el pueblo marinero escalonado', tag: 'Marinera' }
    ]
  },
  'caravia': {
    name: 'Caravia',
    region: 'Costa Oriental',
    playas: [
      { name: 'Playa de La Espasa', type: 'Gran arenal abierto con vistas a la Sierra del Sueve', tag: 'Surf & Paisaje' },
      { name: 'Arenal de Morís', type: 'Extenso arenal con senda costera y surf', tag: 'Surf' }
    ]
  },
  'muros-de-nalon': {
    name: 'Muros de Nalón',
    region: 'Costa Occidental',
    playas: [
      { name: 'Playa de Aguilar', type: 'Playa dorada, roca de Peñafurada y senda de los Miradores', tag: 'Familiar' },
      { name: 'Playa de las Llanas', type: 'Cala salvaje al pie de altos acantilados', tag: 'Salvaje' }
    ]
  },
  'soto-del-barco': {
    name: 'Soto del Barco',
    region: 'Costa Central',
    playas: [
      { name: 'Playa de los Quebrantos', type: 'Arenal en la desembocadura de la ría del Nalón con dunas', tag: 'Surf & Dunas' }
    ]
  },
  'navia': {
    name: 'Navia',
    region: 'Costa Occidental',
    playas: [
      { name: 'Playa de Navia', type: 'Amplio arenal con pinar y ría', tag: 'Familiar' },
      { name: 'Playa de Frejulfe', type: 'Monumento Natural con potentes rompientes de surf', tag: 'Monumento Natural' },
      { name: 'Playa de Barayo', type: 'Reserva natural con ría, marisma y dunas', tag: 'Reserva Natural' }
    ]
  },
  'coana': {
    name: 'Coaña',
    region: 'Costa Occidental',
    playas: [
      { name: 'Playa de Foxos', type: 'Cala de cantos y arena junto a la ría de Navia', tag: 'Tranquila' },
      { name: 'Playa de Arnelles', type: 'Cala acogedora cerca del puerto de Ortiguera', tag: 'Cala' }
    ]
  },
  'el-franco': {
    name: 'El Franco',
    region: 'Costa Occidental',
    playas: [
      { name: 'Playa de Porcía', type: 'Ría meándrica con islotes boyas de roca kárstica', tag: 'Top Paisaje' },
      { name: 'Playa de Pormenande', type: 'Cala abrigada de pescadores y aguas mansas', tag: 'Cala' }
    ]
  },
  'castropol': {
    name: 'Castropol',
    region: 'Ría del Eo',
    playas: [
      { name: 'Playa de Penarronda', type: 'Monumento Natural con arco de roca y dunas', tag: 'Monumento Natural' },
      { name: 'Playa de Arnao (Ría del Eo)', type: 'Aguas calmas en la Ría del Eo', tag: 'Ría' }
    ]
  },
  'ribadedeva': {
    name: 'Ribadedeva',
    region: 'Costa Oriental',
    playas: [
      { name: 'Playa de La Franca', type: 'Gran concha de arena fina con cuevas en bajamar', tag: 'Familiar Top' }
    ]
  }
};

/**
 * Mapeo de referencia costera más cercana para concejos de interior o montaña
 */
function getNearestCoastalReference(concejo) {
  const cId = concejo.id;

  // Oriente
  if (['cangas-de-onis', 'parres', 'amieva', 'cabrales', 'penasanta', 'oniss', 'ponga', 'ribadesella'].includes(cId) || (concejo.region && concejo.region.includes('Oriente'))) {
    return { refId: 'ribadesella', name: 'Ribadesella (Costa Oriental)', dist: '22 km' };
  }
  // Cuencas / Centro Sur
  if (['mieres', 'langreo', 'laviana', 'san-martin-del-rey-aurelio', 'morcin', 'riosa', 'lena', 'aller', 'sobrescobio', 'caso'].includes(cId)) {
    return { refId: 'gijon', name: 'Gijón / Xixón (Costa Central)', dist: '35 km' };
  }
  // Occidente Interior / Montaña
  if (['cangas-del-narcea', 'tineo', 'allande', 'somiedo', 'belmonte-de-miranda', 'ibias', 'degana'].includes(cId)) {
    return { refId: 'valdes', name: 'Luarca / Valdés (Costa Occidental)', dist: '45 km' };
  }
  // Centro / Oviedo / Siero / Noreña / Grado / Pravia
  if (['pravia', 'candamo', 'salass'].includes(cId)) {
    return { refId: 'muros-de-nalon', name: 'Muros de Nalón / Aguilar', dist: '14 km' };
  }

  // Por defecto: Gijón (Costa Central)
  return { refId: 'gijon', name: 'Gijón / Xixón (Costa Central)', dist: '26 km' };
}

/**
 * Renderiza el módulo marítimo con Mareógrafo interactivo en tiempo real y calendario semanal de mareas
 */
export function renderMarineCard(data, concejo) {
  const marine = data.marine?.current;
  const current = data.weather.current;

  const isCoasting = PLAYAS_POR_CONCEJO[concejo.id] !== undefined;
  const coastalData = isCoasting ? PLAYAS_POR_CONCEJO[concejo.id] : null;
  const interiorRef = !isCoasting ? getNearestCoastalReference(concejo) : null;
  const activePlayas = isCoasting ? coastalData.playas : PLAYAS_POR_CONCEJO[interiorRef.refId].playas;
  const activeCoastName = isCoasting ? coastalData.name : `${interiorRef.name} (más cercana a ${concejo.name} • ${interiorRef.dist})`;

  const waveHeight = marine ? marine.wave_height.toFixed(1) : (isCoasting ? '1.4' : '1.3');
  const swellHeight = marine ? (marine.swell_wave_height || marine.wave_height).toFixed(1) : '1.2';
  const wavePeriod = marine ? Math.round(marine.wave_period) : 11;
  const waveDir = marine ? getWindDirection(marine.wave_direction) : { name: 'Noroeste (NW)' };
  const windWaveH = marine?.wind_wave_height ? marine.wind_wave_height.toFixed(1) : '0.6';

  const h = parseFloat(waveHeight);
  let douglasDegree = 3;
  let douglasName = 'Marejada';
  let flagColor = '#f59e0b';
  let flagBadge = '🟡 Bandera Amarilla';
  let surfStatus = `🏄‍♂️ Olas consistentes. Muy buenas condiciones para surf en la costa de ${isCoasting ? concejo.name : interiorRef.refId}.`;

  if (h < 0.6) {
    douglasDegree = 1;
    douglasName = 'Mar Calma / Rizada';
    flagBadge = '🟢 Bandera Verde';
    flagColor = '#10b981';
    surfStatus = '🏖️ Mar en calma. Día ideal para paseo por la arena, baño en familia y paddle surf (SUP).';
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
    surfStatus = `🔥 ¡Condiciones TOP de Surf! Rompientes activas en las playas de ${isCoasting ? concejo.name : interiorRef.name}.`;
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

  // Temperatura del agua
  const now = new Date();
  const seaTemp = (16.2 + Math.sin((now.getMonth() - 2) * 0.5) * 4.2).toFixed(1);

  // Cálculos dinámicos de mareas y fase lunar
  const tideStatus = getRealtimeTideStatus(now);
  const weeklyTides = getWeeklyTides(now);
  const tideSvg = renderTideSvgGraph(tideStatus.dayData, true, tideStatus.currentHours);

  return `
    <div class="marine-card">
      <div class="section-title-wrap">
        <div>
          <h3 class="section-heading">🌊 Costa, Playas & Surf de ${concejo.name}</h3>
          <span class="section-subtitle">
            ${isCoasting 
              ? `Litoral de ${concejo.name} (${coastalData.region}) • Modelo Marino Copernicus / ECMWF`
              : `🌲 ${concejo.name} es concejo de interior. Datos enfocados a la costa más cercana: ${interiorRef.name}`
            }
          </span>
        </div>
        <div class="sea-state-pill" style="background: ${flagColor}22; color: ${flagColor}; border: 1px solid ${flagColor};">
          Grado ${douglasDegree} • ${douglasName}
        </div>
      </div>

      <!-- 1. MAREÓGRAFO INTERACTIVO EN TIEMPO REAL (ONDA SINUSOIDAL VIVA) -->
      <div class="marine-widget mareografo-card" style="margin-bottom: 20px;">
        <div class="mareografo-header">
          <div class="mareografo-title-wrap">
            <span class="mareografo-icon">🌊</span>
            <div>
              <div class="mareografo-title">Mareógrafo Dinámico en Vivo</div>
              <div class="mareografo-subtitle">${activeCoastName} • Costa de Asturias</div>
            </div>
          </div>
          <div class="mareografo-live-badge" style="background: ${tideStatus.directionColor}20; color: ${tideStatus.directionColor}; border: 1px solid ${tideStatus.directionColor}60;">
            ${tideStatus.directionIcon} <strong>${tideStatus.directionName}</strong>
          </div>
        </div>

        <!-- Métricas clave en vivo -->
        <div class="mareografo-metrics-row">
          <div class="tide-metric-pill">
            <span class="t-label">Nivel de Agua Actual</span>
            <span class="t-value" style="color: ${tideStatus.directionColor};">${tideStatus.currentWaterHeight} <span class="t-unit">m</span></span>
          </div>

          <div class="tide-metric-pill">
            <span class="t-label">Llenado del Ciclo</span>
            <div class="tide-progress-wrap">
              <div class="tide-progress-bar" style="width: ${tideStatus.fillPercent}%; background: linear-gradient(90deg, #0284c7, #38bdf8);"></div>
            </div>
            <span class="t-subvalue">${tideStatus.fillPercent}% de marea</span>
          </div>

          <div class="tide-metric-pill highlight-countdown">
            <span class="t-label">Próximo Evento de Marea</span>
            <span class="t-countdown">⏳ ${tideStatus.countdownStr}</span>
            <span class="t-subvalue">Para <strong>${tideStatus.nextEvent.name}</strong> (${tideStatus.nextEvent.timeStr} • ${tideStatus.nextEvent.height}m)</span>
          </div>

          <div class="tide-metric-pill">
            <span class="t-label">Coeficiente Hoy</span>
            <span class="t-value">${tideStatus.moonInfo.coefficient}</span>
            <span class="t-badge-small ${tideStatus.moonInfo.tideClass}">${tideStatus.moonInfo.tideBadge}</span>
          </div>
        </div>

        <!-- Curva Gráfica Sinusoidal Interactiva -->
        <div class="tide-chart-container">
          ${tideSvg}
        </div>

        <!-- 4 Nodos del Día -->
        <div class="daily-tide-events-grid">
          ${tideStatus.dayData.events.map(ev => `
            <div class="tide-event-chip ${ev.type}">
              <div class="chip-top">
                <span class="chip-icon">${ev.type === 'high' ? '🌅' : '🏖️'}</span>
                <span class="chip-name">${ev.name}</span>
              </div>
              <div class="chip-time">${ev.timeStr}</div>
              <div class="chip-height">${ev.height} m</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 2. CUADRO SEMANAL DE MAREAS & COEFICIENTES (7 DÍAS) -->
      <div class="marine-widget weekly-tides-card" style="margin-bottom: 20px;">
        <div class="weekly-tides-header">
          <div class="weekly-title-wrap">
            <span class="weekly-icon">📅</span>
            <div>
              <div class="weekly-title">Cuadro Semanal de Mareas & Coeficientes</div>
              <div class="weekly-subtitle">Previsión astronómica oficial a 7 días • Fases Lunares & Mareonas</div>
            </div>
          </div>
        </div>

        <div class="weekly-tides-grid">
          ${weeklyTides.map((day, idx) => `
            <div class="tide-day-card ${day.isToday ? 'is-today' : ''}">
              <div class="tide-day-header">
                <div class="tide-day-date">
                  <span class="tide-day-name">${day.dayName}</span>
                  <span class="tide-day-num">${day.dateFormatted}</span>
                </div>
                <div class="tide-moon-badge" title="${day.moonInfo.moonName}">
                  <span class="moon-ico">${day.moonInfo.moonIcon}</span>
                  <span class="moon-txt">${day.moonInfo.moonName}</span>
                </div>
              </div>

              <!-- Coeficiente y Clasificación -->
              <div class="tide-coef-row">
                <span class="coef-label">Coeficiente:</span>
                <span class="coef-number">${day.moonInfo.coefficient}</span>
                <span class="coef-tag ${day.moonInfo.tideClass}">${day.moonInfo.tideType}</span>
              </div>

              <!-- Lista de 4 eventos del día -->
              <div class="tide-day-events-list">
                ${day.events.map(ev => `
                  <div class="tide-mini-row ${ev.type}">
                    <span class="mini-icon">${ev.type === 'high' ? '⬆️' : '⬇️'}</span>
                    <span class="mini-name">${ev.name}</span>
                    <span class="mini-time">${ev.timeStr}</span>
                    <span class="mini-height">${ev.height}m</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 3. GRID DE SENSORES MARINOS Y SURF -->
      <div class="marine-grid">
        <!-- Altura de Ola -->
        <div class="marine-widget">
          <div class="widget-label">Altura del Oleaje (Significativa)</div>
          <div class="widget-value">${waveHeight} <span class="unit">metros</span></div>
          <div class="widget-detail">Mar de fondo (Swell): <strong>${swellHeight} m</strong></div>
          <div class="widget-detail">Mar de viento: <strong>${windWaveH} m</strong></div>
        </div>

        <!-- Período y Dirección para Surf -->
        <div class="marine-widget">
          <div class="widget-label">Período y Dirección del Swell</div>
          <div class="widget-value">${wavePeriod} <span class="unit">segundos</span></div>
          <div class="widget-detail">Dirección del oleaje: <strong>${waveDir.name}</strong></div>
          <div class="widget-detail">Viento en orilla: <strong>${Math.round(current.wind_speed_10m)} km/h</strong></div>
        </div>

        <!-- Temperatura del Agua y Confort Turístico -->
        <div class="marine-widget">
          <div class="widget-label">Temperatura del Agua en Playa</div>
          <div class="widget-value">${seaTemp} <span class="unit">°C</span></div>
          <div class="widget-detail">${isCoasting ? `Playas de ${concejo.name}` : `Costa de ${interiorRef.name}`}</div>
          <div class="widget-detail">Visibilidad costera: <strong>${(current.visibility / 1000 || 10).toFixed(0)} km</strong></div>
        </div>

        <!-- Estado de Surf y Bandera -->
        <div class="marine-widget surf-turismo-visual-widget">
          <div class="surf-widget-top">
            <div class="surf-title-row">
              <span class="surf-title-icon">🏄‍♂️</span>
              <div>
                <div class="surf-title-main">Surf & Turismo de Playa</div>
                <div class="surf-title-sub">${isCoasting ? `Litoral de ${concejo.name}` : `Costa de ${interiorRef.name}`}</div>
              </div>
            </div>
            <div class="surf-flag-badge" style="background: ${flagColor}22; color: ${flagColor}; border: 1px solid ${flagColor};">
              ${flagBadge}
            </div>
          </div>

          <div class="surf-status-banner">
            ${surfStatus}
          </div>
        </div>
      </div>

      <!-- 4. PLAYAS DINÁMICAS DEL CONCEJO SELECCIONADO -->
      <div class="marine-ports-section">
        <h4 class="ports-title">
          🏖️ Playas y Rompientes de ${isCoasting ? concejo.name : `${concejo.name} (en ${interiorRef.name})`}
        </h4>
        <div class="ports-grid">
          ${activePlayas.map(p => `
            <div class="port-item">
              <span class="port-name">${p.name}</span>
              <span class="port-region">${p.type} • <strong>${p.tag}</strong></span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}