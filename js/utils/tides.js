/**
 * METEOASTUR LODE - MÓDULO ASTRONÓMICO Y DE MAREAS DEL CANTÁBRICO (ASTURIAS)
 * Calcula en tiempo real:
 * - Ciclos semidiurnos de Pleamar y Bajamar (12h 25m de período lunar M2)
 * - Alturas en metros (Cota Cero del Puerto de Gijón / El Musel - Llanes - Luarca)
 * - Coeficientes de marea (Mareas Vivas / Muertas)
 * - Fases lunares precisas
 * - Curva matemática sinusoidal interactiva para el Mareógrafo en vivo
 */

// Época de referencia (Luna Nueva con Pleamar de referencia en Asturias)
const REF_NEW_MOON = new Date(Date.UTC(2024, 0, 11, 11, 57, 0)).getTime();
const SYNODIC_MONTH_MS = 29.530588 * 24 * 60 * 60 * 1000;
const LUNAR_DAY_HOURS = 24.8412; // 24h 50m 28s
const TIDE_CYCLE_HOURS = LUNAR_DAY_HOURS / 2; // ~12.4206h (12h 25m 14s)
const TIDE_CYCLE_MS = TIDE_CYCLE_HOURS * 3600 * 1000;
const TIDE_HALF_CYCLE_MS = TIDE_CYCLE_MS / 2; // ~6.2103h (6h 12m 37s)
// Offset de calibración para la costa asturiana (Pleamar base a 3.8h de la época de referencia)
const REF_HIGH_TIDE_MS = REF_NEW_MOON + 3.8 * 3600 * 1000;

/**
 * Obtiene la fase lunar y su coeficiente para una fecha
 */
export function getMoonAndTideInfo(date = new Date()) {
  const diffMs = date.getTime() - REF_NEW_MOON;
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
  // Pequeña oscilación por perigeo / declinación solar
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
 * Calcula los eventos reales de marea del día (horas y cotas en metros de forma continua)
 */
export function getDailyTideEvents(targetDate = new Date()) {
  const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0, 0);
  const startOfDayMs = startOfDay.getTime();
  const endOfDayMs = startOfDayMs + 24 * 60 * 60 * 1000;

  const moonInfo = getMoonAndTideInfo(startOfDay);
  const coef = moonInfo.coefficient;

  // Alturas calibradas según el coeficiente
  const coefFactor = (coef - 70) / 45;
  const highTideHeight = +(3.45 + coefFactor * 0.95).toFixed(2);
  const lowTideHeight = +(1.25 - coefFactor * 0.85).toFixed(2);

  // Cálculo astronómico continuo: obtener crestas (pleamares) y senos (bajamares) en [startOfDayMs, endOfDayMs)
  // n par = Pleamar, n impar = Bajamar
  const nStart = Math.ceil((startOfDayMs - REF_HIGH_TIDE_MS) / TIDE_HALF_CYCLE_MS);
  const nEnd = Math.floor((endOfDayMs - 1 - REF_HIGH_TIDE_MS) / TIDE_HALF_CYCLE_MS);

  const events = [];
  for (let n = nStart; n <= nEnd; n++) {
    const tMs = REF_HIGH_TIDE_MS + n * TIDE_HALF_CYCLE_MS;
    const isHigh = Math.abs(n % 2) === 0;
    const d = new Date(tMs);
    const hrs = d.getHours();
    const mins = d.getMinutes();
    const timeHours = hrs + mins / 60 + d.getSeconds() / 3600;
    const timeStr = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

    events.push({
      type: isHigh ? 'high' : 'low',
      name: isHigh ? 'Pleamar' : 'Bajamar',
      timeHours,
      timeStr,
      timestamp: tMs,
      height: isHigh ? highTideHeight : lowTideHeight
    });
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
export function getRealtimeTideStatus(now = new Date()) {
  const nowMs = now.getTime();
  const currentHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  const dayData = getDailyTideEvents(now);
  const { highTideHeight, lowTideHeight, moonInfo } = dayData;

  const meanLevel = (highTideHeight + lowTideHeight) / 2;
  const amplitude = (highTideHeight - lowTideHeight) / 2;
  
  // Fase continua sobre la línea temporal absoluta
  const phase = ((nowMs - REF_HIGH_TIDE_MS) / TIDE_CYCLE_MS) * 2 * Math.PI;
  const currentWaterHeight = +(meanLevel + amplitude * Math.cos(phase)).toFixed(2);
  
  const fillPercent = Math.min(100, Math.max(0, Math.round(((currentWaterHeight - lowTideHeight) / (highTideHeight - lowTideHeight)) * 100)));

  const slope = -Math.sin(phase);
  const isRising = slope > 0;

  // Próximo evento continuo (siguiente cresta o seno en la línea de tiempo)
  const nextN = Math.floor((nowMs - REF_HIGH_TIDE_MS) / TIDE_HALF_CYCLE_MS) + 1;
  const nextTMs = REF_HIGH_TIDE_MS + nextN * TIDE_HALF_CYCLE_MS;
  const isNextHigh = Math.abs(nextN % 2) === 0;
  const nextDate = new Date(nextTMs);
  const nextHrs = nextDate.getHours();
  const nextMins = nextDate.getMinutes();
  const nextTimeStr = `${String(nextHrs).padStart(2, '0')}:${String(nextMins).padStart(2, '0')}`;
  
  // Coeficiente y altura para el momento del próximo evento
  const nextMoon = getMoonAndTideInfo(nextDate);
  const nextCoefFactor = (nextMoon.coefficient - 70) / 45;
  const nextHeight = isNextHigh 
    ? +(3.45 + nextCoefFactor * 0.95).toFixed(2)
    : +(1.25 - nextCoefFactor * 0.85).toFixed(2);

  const nextEvent = {
    type: isNextHigh ? 'high' : 'low',
    name: isNextHigh ? 'Pleamar' : 'Bajamar',
    timeHours: nextHrs + nextMins / 60,
    timeStr: nextTimeStr,
    timestamp: nextTMs,
    height: nextHeight
  };

  const hoursUntilNext = (nextTMs - nowMs) / (3600 * 1000);
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
export function getWeeklyTides(startDate = new Date()) {
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const tideData = getDailyTideEvents(d);
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
export function renderTideSvgGraph(baseDate = new Date(), isLiveToday = true, currentHours = null) {
  const startOfDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 0, 0, 0, 0);
  const startOfDayMs = startOfDay.getTime();
  
  // Obtenemos los datos de los 3 días
  const daysData = [0, 1, 2].map(offset => {
    const d = new Date(startOfDayMs + offset * 24 * 60 * 60 * 1000);
    const tideData = getDailyTideEvents(d);
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
  const svgHeight = 250;
  const padX = 45;
  const padYTop = 48;
  const padYBottom = 48;
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

  // Curva armónica 100% continua de 72 horas con 288 puntos (cada 15 min)
  let pathD = '';
  const totalSteps = 288;

  for (let step = 0; step <= totalSteps; step++) {
    const globalT = (step / totalSteps) * 72;
    const tMs = startOfDayMs + globalT * 3600 * 1000;
    const dayIdx = Math.min(2, Math.floor(globalT / 24));
    const curDay = daysData[dayIdx];

    const meanLevel = (curDay.highTideHeight + curDay.lowTideHeight) / 2;
    const amplitude = (curDay.highTideHeight - curDay.lowTideHeight) / 2;
    
    // Función sinusoidal continua sobre el tiempo astronómico real
    const phase = ((tMs - REF_HIGH_TIDE_MS) / TIDE_CYCLE_MS) * 2 * Math.PI;
    const h = meanLevel + amplitude * Math.cos(phase);

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

  // Separadores y rótulos de jornada (Día 1: Hoy, Día 2: Mañana, Día 3: Pasado Mañana)
  const dayBanners = daysData.map((d, i) => {
    const startX = padX + (i * 24 / 72) * usableWidth;
    const bannerX = startX + 14;
    const dividerLine = i > 0 
      ? `<line x1="${startX.toFixed(1)}" y1="${padYTop - 25}" x2="${startX.toFixed(1)}" y2="${svgHeight - padYBottom}" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.5" stroke-dasharray="6 4" />`
      : '';

    return `
      ${dividerLine}
      <g transform="translate(${bannerX.toFixed(1)}, 14)">
        <rect x="0" y="0" width="220" height="24" rx="12" fill="rgba(15, 23, 42, 0.88)" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1" />
        <text x="110" y="16" font-size="11" font-weight="800" fill="#f8fafc" text-anchor="middle" font-family="'JetBrains Mono', monospace">
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
    const liveTMs = startOfDayMs + nowH * 3600 * 1000;
    const livePhase = ((liveTMs - REF_HIGH_TIDE_MS) / TIDE_CYCLE_MS) * 2 * Math.PI;
    const nowWaterH = meanLevel + amplitude * Math.cos(livePhase);
    const norm = (nowWaterH - minH) / (maxH - minH);
    const liveY = padYTop + (1 - norm) * usableHeight;

    liveMarker = `
      <!-- Línea vertical de hora actual -->
      <line x1="${liveX.toFixed(1)}" y1="${padYTop - 15}" x2="${liveX.toFixed(1)}" y2="${svgHeight - padYBottom}" stroke="rgba(56, 189, 248, 0.85)" stroke-width="2.2" stroke-dasharray="4 4" />
      <!-- Punto de pulso brillante -->
      <circle cx="${liveX.toFixed(1)}" cy="${liveY.toFixed(1)}" r="14" fill="rgba(56, 189, 248, 0.35)" class="tide-pulse-aura" />
      <circle cx="${liveX.toFixed(1)}" cy="${liveY.toFixed(1)}" r="6.5" fill="#38bdf8" stroke="#ffffff" stroke-width="2.5" />
      <!-- Badge de nivel actual en vivo -->
      <g transform="translate(${Math.min(svgWidth - 125, Math.max(liveX - 55, 10))}, ${Math.max(8, liveY - 28)})">
        <rect x="0" y="0" width="110" height="22" rx="11" fill="rgba(15, 23, 42, 0.95)" stroke="#38bdf8" stroke-width="1.5" />
        <text x="55" y="15" font-size="11.5" font-weight="800" font-family="'JetBrains Mono', monospace" fill="#38bdf8" text-anchor="middle">AHORA ${nowWaterH.toFixed(2)}m</text>
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
      const labelY = isHigh ? y - 12 : y + 18;

      return `
        <g class="tide-event-node">
          <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.5" fill="${color}" stroke="#0f172a" stroke-width="2" />
          <text x="${x.toFixed(1)}" y="${labelY.toFixed(1)}" font-size="11.5" font-weight="800" fill="${color}" text-anchor="middle" font-family="'JetBrains Mono', monospace">
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
      <text x="${x.toFixed(1)}" y="${svgHeight - padYBottom + 18}" font-size="10.5" font-weight="700" fill="rgba(148, 163, 184, 0.85)" text-anchor="middle" font-family="'JetBrains Mono', monospace">${String(displayHour).padStart(2, '0')}:00</text>
    `);
  }

  return `
    <svg width="1980" height="250" viewBox="0 0 ${svgWidth} ${svgHeight}" class="tide-svg-chart" style="min-width: 1980px; width: 1980px; height: 250px; display: block; overflow: visible;">
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
