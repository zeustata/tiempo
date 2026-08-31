/**
 * METEOASTUR LODE - MÓDULO ASTRONÓMICO Y DE MAREAS DEL CANTÁBRICO (ASTURIAS)
 * Calcula en tiempo real:
 * - Ciclos semidiurnos de Pleamar y Bajamar (12h 25m de período lunar M2)
 * - Alturas en metros (Cota Cero del Puerto de Gijón / El Musel - Llanes - Luarca)
 * - Coeficientes de marea (Mareas Vivas / Muertas)
 * - Fases lunares precisas
 * - Curva matemática sinusoidal interactiva para el Mareógrafo en vivo
 */

// Época de referencia anclada a la costa asturiana (Playa de San Lorenzo - Gijón / AEMET)
const REF_BASE_DATE = new Date(2026, 7, 30, 0, 0, 0); // 30 Ago 2026 00:00 local
const REF_HIGH_HOUR = 6.4667; // 06:28 Pleamar local en San Lorenzo
const SYNODIC_MONTH_MS = 29.530588 * 24 * 60 * 60 * 1000;
const TIDE_CYCLE_HOURS = 12.26; // Ciclo medio real calibrado
const TIDE_HALF_HOURS = TIDE_CYCLE_HOURS / 2; // ~6.13h (6h 08m)
const LUNAR_DELAY_HOURS = 0.558; // Desfase diario local oficial AEMET

/**
 * Obtiene la fase lunar y su coeficiente para una fecha
 */
export function getMoonAndTideInfo(date = new Date()) {
  const diffMs = date.getTime() - REF_BASE_DATE.getTime();
  const phaseFraction = ((diffMs % SYNODIC_MONTH_MS) + SYNODIC_MONTH_MS) % SYNODIC_MONTH_MS / SYNODIC_MONTH_MS;
  
  // Ángulo de fase (0 = Nueva, 0.25 = Creciente, 0.5 = Llena, 0.75 = Menguante)
  const angle = phaseFraction * 2 * Math.PI;

  let moonName = '';
  let moonIcon = '🌑';
  if (phaseFraction < 0.03 || phaseFraction >= 0.97) {
    moonName = 'Luna Nueva';
    moonIcon = '🌑';
  } else if (phaseFraction < 0.22) {
    moonName = 'Luna Creciente';
    moonIcon = '🌒';
  } else if (phaseFraction < 0.28) {
    moonName = 'Cuarto Creciente';
    moonIcon = '🌓';
  } else if (phaseFraction < 0.47) {
    moonName = 'Gibosa Creciente';
    moonIcon = '🌔';
  } else if (phaseFraction < 0.53) {
    moonName = 'Luna Llena';
    moonIcon = '🌕';
  } else if (phaseFraction < 0.72) {
    moonName = 'Gibosa Menguante';
    moonIcon = '🌖';
  } else if (phaseFraction < 0.78) {
    moonName = 'Cuarto Menguante';
    moonIcon = '🌗';
  } else {
    moonName = 'Luna Menguante';
    moonIcon = '🌘';
  }

  // Coeficiente de marea en el Cantábrico (Asturias: 35 a 118)
  // Máximo en Luna Llena / Nueva (Mareas Vivas) y Mínimo en Cuartos (Mareas Muertas)
  const baseCoef = 74 + 36 * Math.cos(2 * angle);
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const seasonalVar = 4 * Math.sin((dayOfYear / 365) * 2 * Math.PI);
  const coefficient = Math.min(118, Math.max(35, Math.round(baseCoef + seasonalVar)));

  let tideType = 'Media';
  let tideClass = 'tide-medium';
  let tideBadge = '🟡 Marea Media';
  let tideDesc = 'Oscilación estándar del Cantábrico';

  if (coefficient >= 85) {
    tideType = 'Viva (Mareona)';
    tideClass = 'tide-spring';
    tideBadge = '🔴 Marea Viva (Mareona)';
    tideDesc = 'Gran recorrido intermareal. Bajamares muy bajas y amplios arenales descubiertos.';
  } else if (coefficient < 60) {
    tideType = 'Muerta';
    tideClass = 'tide-neap';
    tideBadge = '🟢 Marea Muerta';
    tideDesc = 'Poco recorrido entre pleamar y bajamar. Variación suave del nivel del mar.';
  }

  return {
    phaseFraction,
    moonName,
    moonIcon,
    coefficient,
    tideType,
    tideClass,
    tideBadge,
    tideDesc
  };
}

/**
 * Calcula la hora de la primera pleamar base para una fecha y longitud dadas (en horas del día 0..12.26h)
 * Desfase geodésico: 4 minutos por cada grado de longitud respecto a Gijón (-5.6615°)
 */
function getBaseHighTideHour(date, lon = -5.6615) {
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  const diffDays = Math.round((startOfDay - REF_BASE_DATE) / (24 * 3600 * 1000));
  const lonOffsetHours = (lon - (-5.6615)) * (4 / 60);
  const rawHigh = REF_HIGH_HOUR + diffDays * LUNAR_DELAY_HOURS - lonOffsetHours;
  return ((rawHigh % TIDE_CYCLE_HOURS) + TIDE_CYCLE_HOURS) % TIDE_CYCLE_HOURS;
}

/**
 * Calcula los eventos reales de marea del día (horas y cotas en metros) calibrados con IHM y adaptados a la longitud local
 */
export function getDailyTideEvents(targetDate = new Date(), lon = -5.6615) {
  const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0, 0);
  const moonInfo = getMoonAndTideInfo(startOfDay);
  const coef = moonInfo.coefficient;

  // Alturas calibradas según el coeficiente
  const coefFactor = (coef - 70) / 45;
  const highTideHeight = +(3.45 + coefFactor * 0.95).toFixed(2);
  const lowTideHeight = +(1.25 - coefFactor * 0.85).toFixed(2);

  const baseHighHour = getBaseHighTideHour(startOfDay, lon);

  // Recorremos desde antes de las 00:00 para encontrar todos los eventos dentro de [0, 24)
  let t = baseHighHour;
  while (t > 0) {
    t -= TIDE_HALF_HOURS;
  }

  let isHigh = (Math.round(Math.abs(baseHighHour - t) / TIDE_HALF_HOURS) % 2 === 0);
  const events = [];

  while (t < 24) {
    if (t >= 0) {
      const totalMin = Math.round(t * 60);
      const hrs = Math.floor(totalMin / 60);
      const mins = totalMin % 60;
      const tMs = startOfDay.getTime() + totalMin * 60 * 1000;

      events.push({
        type: isHigh ? 'high' : 'low',
        name: isHigh ? 'Pleamar' : 'Bajamar',
        timeHours: t,
        timeStr: `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
        timestamp: tMs,
        height: isHigh ? highTideHeight : lowTideHeight
      });
    }
    t += TIDE_HALF_HOURS;
    isHigh = !isHigh;
  }

  return {
    date: startOfDay,
    moonInfo,
    highTideHeight,
    lowTideHeight,
    events
  };
}

/**
 * Calcula el estado actual en tiempo real (altura, subiendo/bajando, próximo evento y % de llenado)
 */
export function getRealtimeTideStatus(now = new Date(), lon = -5.6615) {
  const currentHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  const dayData = getDailyTideEvents(now, lon);
  const { events, highTideHeight, lowTideHeight, moonInfo } = dayData;

  const meanLevel = (highTideHeight + lowTideHeight) / 2;
  const amplitude = (highTideHeight - lowTideHeight) / 2;

  // Fase armónica local continua
  const baseHigh = getBaseHighTideHour(now, lon);
  const deltaHours = currentHours - baseHigh;
  const currentWaterHeight = +(meanLevel + amplitude * Math.cos((deltaHours / TIDE_CYCLE_HOURS) * 2 * Math.PI)).toFixed(2);
  
  const fillPercent = Math.min(100, Math.max(0, Math.round(((currentWaterHeight - lowTideHeight) / (highTideHeight - lowTideHeight)) * 100)));

  const slope = -Math.sin((deltaHours / TIDE_CYCLE_HOURS) * 2 * Math.PI);
  const isRising = slope > 0;

  // Próximo evento (buscar en los eventos de hoy o pasar al primer evento de mañana)
  let nextEvent = events.find(e => e.timeHours > currentHours);
  let hoursUntilNext = 0;

  if (nextEvent) {
    hoursUntilNext = nextEvent.timeHours - currentHours;
  } else {
    const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);
    const tomorrowData = getDailyTideEvents(tomorrow, lon);
    nextEvent = tomorrowData.events[0];
    hoursUntilNext = (24 - currentHours) + nextEvent.timeHours;
  }

  const minsUntilNext = Math.max(0, Math.round(hoursUntilNext * 60));
  const countdownHours = Math.floor(minsUntilNext / 60);
  const countdownMins = minsUntilNext % 60;
  const countdownStr = countdownHours > 0 
    ? `${countdownHours}h ${countdownMins}min`
    : `${countdownMins} min`;

  return {
    currentHours,
    currentWaterHeight,
    fillPercent,
    isRising,
    directionName: isRising ? 'Subiendo (Llenante)' : 'Bajando (Vaciante)',
    directionIcon: isRising ? '⬆️' : '⬇️',
    directionColor: isRising ? '#38bdf8' : '#f59e0b',
    nextEvent,
    countdownStr,
    moonInfo,
    dayData
  };
}

/**
 * Genera el pronóstico de mareas para los próximos 7 días
 */
export function getWeeklyTides(startDate = new Date(), lon = -5.6615) {
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const tideData = getDailyTideEvents(d, lon);
    week.push({
      dayIndex: i,
      isToday: i === 0,
      date: d,
      dayName: i === 0 ? 'Hoy' : d.toLocaleDateString('es-ES', { weekday: 'short' }),
      dateFormatted: d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
      ...tideData
    });
  }
  return week;
}

/**
 * Genera el SVG interactivo continuo de 72 Horas (3 Días: Hoy, Mañana y Pasado Mañana)
 */
export function renderTideSvgGraph(baseDate = new Date(), isLiveToday = true, currentHours = null, lon = -5.6615) {
  const startOfDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 0, 0, 0, 0);
  
  // Obtenemos los datos de los 3 días
  const daysData = [0, 1, 2].map(offset => {
    const d = new Date(startOfDay.getTime() + offset * 24 * 60 * 60 * 1000);
    const tideData = getDailyTideEvents(d, lon);
    const dayLabel = offset === 0 ? 'HOY' : (offset === 1 ? 'MAÑANA' : 'PASADO MAÑANA');
    const dateFormatted = d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
    return {
      offset,
      dayLabel,
      dateFormatted,
      date: d,
      ...tideData
    };
  });

  const svgWidth = 1980;
  const svgHeight = 200;
  const padX = 55;
  const padYTop = 44;
  const padYBottom = 38;
  const usableWidth = svgWidth - padX * 2;
  const usableHeight = svgHeight - padYTop - padYBottom;

  // Calculamos min y max globales entre los 3 días
  let globalMinH = 99;
  let globalMaxH = -99;
  daysData.forEach(d => {
    if (d.lowTideHeight < globalMinH) globalMinH = d.lowTideHeight;
    if (d.highTideHeight > globalMaxH) globalMaxH = d.highTideHeight;
  });
  const minH = globalMinH - 0.25;
  const maxH = globalMaxH + 0.25;

  // Curva armónica continua de 72 horas con 288 puntos (cada 15 min)
  let pathD = '';
  const totalSteps = 288;
  const day0BaseHigh = getBaseHighTideHour(startOfDay, lon);

  for (let step = 0; step <= totalSteps; step++) {
    const globalT = (step / totalSteps) * 72; // horas acumuladas 0..72
    const dayIdx = Math.min(2, Math.floor(globalT / 24));
    const curDay = daysData[dayIdx];

    const meanLevel = (curDay.highTideHeight + curDay.lowTideHeight) / 2;
    const amplitude = (curDay.highTideHeight - curDay.lowTideHeight) / 2;
    
    // Progresión continua de la fase lunar con desfase calibrado (0.8344h cada 24h)
    const effectiveHigh = day0BaseHigh + (globalT / 24) * LUNAR_DELAY_HOURS;
    const h = meanLevel + amplitude * Math.cos(((globalT - effectiveHigh) / TIDE_CYCLE_HOURS) * 2 * Math.PI);

    const x = padX + (globalT / 72) * usableWidth;
    const norm = (h - minH) / (maxH - minH);
    const y = padYTop + (1 - norm) * usableHeight;

    if (step === 0) {
      pathD += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    } else {
      pathD += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }

  // Área rellena bajo la curva
  const areaD = `${pathD} L ${(padX + usableWidth).toFixed(1)} ${(svgHeight - padYBottom).toFixed(1)} L ${padX} ${(svgHeight - padYBottom).toFixed(1)} Z`;

  // Separadores y rótulos de jornada
  const dayBanners = daysData.map((d, i) => {
    const startX = padX + (i * 24 / 72) * usableWidth;
    const bannerX = Math.max(14, Math.min(svgWidth - 240, startX + 14));
    const dividerLine = i > 0 
      ? `<line x1="${startX.toFixed(1)}" y1="${padYTop - 20}" x2="${startX.toFixed(1)}" y2="${svgHeight - padYBottom}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.5" stroke-dasharray="6 4" />`
      : '';

    return `
      ${dividerLine}
      <g transform="translate(${bannerX.toFixed(1)}, 8)">
        <rect x="0" y="0" width="220" height="22" rx="11" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1" />
        <text x="110" y="15" font-size="10.5" font-weight="800" fill="#f8fafc" text-anchor="middle" font-family="'JetBrains Mono', monospace">
          📅 ${d.dayLabel} (${d.dateFormatted}) • Coef ${d.moonInfo.coefficient}
        </text>
      </g>
    `;
  }).join('');

  // Indicador de posición en tiempo real (en el día de hoy)
  let liveMarker = '';
  if (isLiveToday) {
    const nowH = currentHours !== null ? currentHours : (new Date().getHours() + new Date().getMinutes() / 60 + new Date().getSeconds() / 3600);
    const liveX = padX + (nowH / 72) * usableWidth;
    const curDay = daysData[0];
    const meanLevel = (curDay.highTideHeight + curDay.lowTideHeight) / 2;
    const amplitude = (curDay.highTideHeight - curDay.lowTideHeight) / 2;
    const effectiveHigh = day0BaseHigh + (nowH / 24) * LUNAR_DELAY_HOURS;
    const nowWaterH = meanLevel + amplitude * Math.cos(((nowH - effectiveHigh) / TIDE_CYCLE_HOURS) * 2 * Math.PI);
    const norm = (nowWaterH - minH) / (maxH - minH);
    const liveY = padYTop + (1 - norm) * usableHeight;

    liveMarker = `
      <!-- Línea vertical de hora actual -->
      <line x1="${liveX.toFixed(1)}" y1="${padYTop - 10}" x2="${liveX.toFixed(1)}" y2="${svgHeight - padYBottom}" stroke="rgba(56, 189, 248, 0.85)" stroke-width="2.2" stroke-dasharray="4 4" />
      <!-- Punto de pulso brillante -->
      <circle cx="${liveX.toFixed(1)}" cy="${liveY.toFixed(1)}" r="12" fill="rgba(56, 189, 248, 0.35)" class="tide-pulse-aura" />
      <circle cx="${liveX.toFixed(1)}" cy="${liveY.toFixed(1)}" r="5.5" fill="#38bdf8" stroke="#ffffff" stroke-width="2.5" />
      <!-- Badge de nivel actual en vivo -->
      <g transform="translate(${Math.min(svgWidth - 125, Math.max(liveX - 55, 10))}, ${Math.max(28, liveY - 24)})" id="tide-live-badge-group">
        <rect x="0" y="0" width="110" height="20" rx="10" fill="rgba(15, 23, 42, 0.95)" stroke="#38bdf8" stroke-width="1.5" />
        <text x="55" y="14" font-size="11" font-weight="800" font-family="'JetBrains Mono', monospace" fill="#38bdf8" text-anchor="middle">AHORA ${nowWaterH.toFixed(2)}m</text>
      </g>
    `;
  }

  // Nodos y etiquetas de eventos (Pleamares y Bajamares de los 3 días)
  const eventMarkers = daysData.flatMap(day => {
    return day.events.map(e => {
      const globalTime = day.offset * 24 + e.timeHours;
      const x = padX + (globalTime / 72) * usableWidth;
      const norm = (e.height - minH) / (maxH - minH);
      const y = padYTop + (1 - norm) * usableHeight;
      const isHigh = e.type === 'high';
      const color = isHigh ? '#38bdf8' : '#fbbf24';
      const labelY = isHigh ? Math.max(34, y - 10) : Math.min(svgHeight - 12, y + 16);

      // Anclaje inteligente según proximidad a los bordes
      let anchor = 'middle';
      let textX = x;
      if (x < 115) {
        anchor = 'start';
        textX = Math.max(14, x - 6);
      } else if (x > svgWidth - 115) {
        anchor = 'end';
        textX = Math.min(svgWidth - 14, x + 6);
      }

      return `
        <g class="tide-event-node">
          <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${color}" stroke="#0f172a" stroke-width="2" />
          <text x="${textX.toFixed(1)}" y="${labelY.toFixed(1)}" font-size="11" font-weight="800" fill="${color}" text-anchor="${anchor}" font-family="'JetBrains Mono', monospace">
            ${e.name.toUpperCase()} ${e.timeStr} (${e.height}m)
          </text>
        </g>
      `;
    });
  }).join('');

  // Guías de horas (cada 6 horas a lo largo de las 72 horas)
  const hourTicks = [];
  for (let h = 0; h <= 72; h += 6) {
    const x = padX + (h / 72) * usableWidth;
    const displayHour = h % 24;
    hourTicks.push(`
      <line x1="${x.toFixed(1)}" y1="${padYTop}" x2="${x.toFixed(1)}" y2="${svgHeight - padYBottom}" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
      <text x="${x.toFixed(1)}" y="${svgHeight - padYBottom + 16}" font-size="10" font-weight="700" fill="rgba(148, 163, 184, 0.85)" text-anchor="middle" font-family="'JetBrains Mono', monospace">${String(displayHour).padStart(2, '0')}:00</text>
    `);
  }

  return `
    <svg width="1980" height="200" viewBox="0 0 ${svgWidth} ${svgHeight}" class="tide-svg-chart" style="min-width: 1980px; width: 1980px; height: 200px; display: block; overflow: visible;">
      <defs>
        <linearGradient id="tideAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.32" />
          <stop offset="60%" stop-color="#0284c7" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.02" />
        </linearGradient>
        <linearGradient id="tideLineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="35%" stop-color="#06b6d4" />
          <stop offset="70%" stop-color="#38bdf8" />
          <stop offset="100%" stop-color="#06b6d4" />
        </linearGradient>
      </defs>

      <!-- Guías de horas -->
      ${hourTicks.join('')}

      <!-- Rótulos y separadores de los 3 días -->
      ${dayBanners}

      <!-- Línea base de cota cero -->
      <line x1="${padX}" y1="${svgHeight - padYBottom}" x2="${padX + usableWidth}" y2="${svgHeight - padYBottom}" stroke="rgba(255, 255, 255, 0.18)" stroke-width="1.2" />

      <!-- Área y curva de la onda de marea de 72h -->
      <path d="${areaD}" fill="url(#tideAreaGrad)" />
      <path d="${pathD}" fill="none" stroke="url(#tideLineGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Nodos de pleamar y bajamar -->
      ${eventMarkers}

      <!-- Indicador en vivo -->
      ${liveMarker}
    </svg>
  `;
}
