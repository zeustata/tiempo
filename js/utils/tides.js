/**
 * METEOASTUR LODE - MÓDULO ASTRONÓMICO Y DE MAREAS DEL CANTÁBRICO (ASTURIAS)
 * Calcula en tiempo real:
 * - Ciclos semidiurnos de Pleamar y Bajamar (12h 25m de período lunar M2)
 * - Alturas en metros (Cota Cero del Puerto de Gijón / El Musel - Llanes - Luarca)
 * - Coeficientes de marea (Mareas Vivas / Muertas)
 * - Fases lunares precisas
 * - Curva matemática sinusoidal interactiva para el Mareógrafo en vivo
 */

// Época de referencia astronómica y lunar unificada (Luna Nueva real: 11 Enero 2024 a las 11:57 UTC)
const LUNAR_MONTH_DAYS = 29.53058867;
const REF_NEW_MOON_UTC_MS = Date.UTC(2024, 0, 11, 11, 57, 0);

// Época de pleamar de referencia anclada en el Cantábrico (Playa de San Lorenzo - Gijón / El Musel - AEMET/IHM)
// Calibrada a las 06:28 hora local de verano (CEST / UTC+2) del 30 de agosto de 2026 = 04:28:00 UTC
const REF_TIDE_UTC_MS = Date.UTC(2026, 7, 30, 4, 28, 0);
const TIDE_CYCLE_HOURS = 12.4206012; // Período semidiurno M2 (~12h 25m 14s)
const TIDE_CYCLE_MS = TIDE_CYCLE_HOURS * 3600 * 1000;
const TIDE_HALF_MS = TIDE_CYCLE_MS / 2;

/**
 * Obtiene la fase lunar y su coeficiente para una fecha
 */
export function getMoonAndTideInfo(date = new Date()) {
  const diffDays = (date.getTime() - REF_NEW_MOON_UTC_MS) / (1000 * 60 * 60 * 24);
  const moonAge = ((diffDays % LUNAR_MONTH_DAYS) + LUNAR_MONTH_DAYS) % LUNAR_MONTH_DAYS;
  const phaseFraction = moonAge / LUNAR_MONTH_DAYS;
  
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
    moonAge: moonAge.toFixed(1),
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
 * Calcula los eventos reales de marea del día (horas y cotas en metros)
 * adaptados al huso horario local (CEST/CET) y longitud geodésica local (4 min/grado respecto a Gijón)
 */
export function getDailyTideEvents(targetDate = new Date(), lon = -5.6615) {
  const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0, 0);
  const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 24, 0, 0, 0);
  const moonInfo = getMoonAndTideInfo(startOfDay);
  const coef = moonInfo.coefficient;

  // Alturas calibradas según el coeficiente
  const coefFactor = (coef - 70) / 45;
  const highTideHeight = +(3.45 + coefFactor * 0.95).toFixed(2);
  const lowTideHeight = +(1.25 - coefFactor * 0.85).toFixed(2);

  // Desfase geodésico longitudinal: 4 minutos por grado respecto a Gijón (-5.6615°)
  const lonOffsetMs = (lon - (-5.6615)) * (4 * 60 * 1000);

  // Localizar ciclos semidiurnos que caen en la jornada local [startOfDay, endOfDay)
  const t0 = startOfDay.getTime() - lonOffsetMs;
  const cycleIndexStart = Math.floor((t0 - REF_TIDE_UTC_MS) / TIDE_HALF_MS) - 2;

  const events = [];
  for (let k = cycleIndexStart; k <= cycleIndexStart + 10; k++) {
    const eventTimeMs = REF_TIDE_UTC_MS + k * TIDE_HALF_MS + lonOffsetMs;
    if (eventTimeMs >= startOfDay.getTime() && eventTimeMs < endOfDay.getTime()) {
      const d = new Date(eventTimeMs);
      const isHigh = Math.abs(k % 2) === 0;
      const hours = d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
      const timeStr = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

      events.push({
        type: isHigh ? 'high' : 'low',
        name: isHigh ? 'Pleamar' : 'Bajamar',
        timeHours: hours,
        timeStr,
        timestamp: eventTimeMs,
        height: isHigh ? highTideHeight : lowTideHeight
      });
    }
  }

  // Ordenar cronológicamente por seguridad
  events.sort((a, b) => a.timestamp - b.timestamp);

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

  // Fase armónica local continua en tiempo universal con desfase de longitud
  const lonOffsetMs = (lon - (-5.6615)) * (4 * 60 * 1000);
  const deltaMs = now.getTime() - lonOffsetMs - REF_TIDE_UTC_MS;
  const phase = ((deltaMs % TIDE_CYCLE_MS) + TIDE_CYCLE_MS) % TIDE_CYCLE_MS / TIDE_CYCLE_MS;

  const currentWaterHeight = +(meanLevel + amplitude * Math.cos(phase * 2 * Math.PI)).toFixed(2);
  const fillPercent = Math.min(100, Math.max(0, Math.round(((currentWaterHeight - lowTideHeight) / (highTideHeight - lowTideHeight)) * 100)));

  const slope = -Math.sin(phase * 2 * Math.PI);
  const isRising = slope > 0;

  // Próximo evento (buscar en los eventos de hoy o pasar al primer evento de mañana)
  let nextEvent = events.find(e => e.timestamp > now.getTime());
  let hoursUntilNext = 0;

  if (nextEvent) {
    hoursUntilNext = (nextEvent.timestamp - now.getTime()) / (3600 * 1000);
  } else {
    const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);
    const tomorrowData = getDailyTideEvents(tomorrow, lon);
    nextEvent = tomorrowData.events[0];
    hoursUntilNext = (nextEvent.timestamp - now.getTime()) / (3600 * 1000);
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
  const totalDurationMs = 72 * 3600 * 1000;
  const lonOffsetMs = (lon - (-5.6615)) * (4 * 60 * 1000);

  for (let step = 0; step <= totalSteps; step++) {
    const globalFraction = step / totalSteps;
    const stepTimeMs = startOfDay.getTime() + globalFraction * totalDurationMs;
    const dayIdx = Math.min(2, Math.floor(globalFraction * 3));
    const curDay = daysData[dayIdx];

    const meanLevel = (curDay.highTideHeight + curDay.lowTideHeight) / 2;
    const amplitude = (curDay.highTideHeight - curDay.lowTideHeight) / 2;

    const deltaMs = stepTimeMs - lonOffsetMs - REF_TIDE_UTC_MS;
    const phase = ((deltaMs % TIDE_CYCLE_MS) + TIDE_CYCLE_MS) % TIDE_CYCLE_MS / TIDE_CYCLE_MS;
    const h = meanLevel + amplitude * Math.cos(phase * 2 * Math.PI);

    const x = padX + globalFraction * usableWidth;
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
    const now = new Date();
    const liveTimeMs = currentHours !== null
      ? (startOfDay.getTime() + currentHours * 3600 * 1000)
      : now.getTime();
    const liveFraction = Math.max(0, Math.min(1, (liveTimeMs - startOfDay.getTime()) / totalDurationMs));
    const liveX = padX + liveFraction * usableWidth;

    const curDay = daysData[0];
    const meanLevel = (curDay.highTideHeight + curDay.lowTideHeight) / 2;
    const amplitude = (curDay.highTideHeight - curDay.lowTideHeight) / 2;
    const deltaMs = liveTimeMs - lonOffsetMs - REF_TIDE_UTC_MS;
    const phase = ((deltaMs % TIDE_CYCLE_MS) + TIDE_CYCLE_MS) % TIDE_CYCLE_MS / TIDE_CYCLE_MS;
    const nowWaterH = meanLevel + amplitude * Math.cos(phase * 2 * Math.PI);
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
      const eventTimeMs = e.timestamp;
      const eventFraction = (eventTimeMs - startOfDay.getTime()) / totalDurationMs;
      const x = padX + eventFraction * usableWidth;
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
