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
const TIDE_CYCLE_HOURS = LUNAR_DAY_HOURS / 2; // ~12.42h (12h 25m)

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
 * Calcula los 4 eventos de marea del día (horas y cotas en metros)
 */
export function getDailyTideEvents(targetDate = new Date()) {
  const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const moonInfo = getMoonAndTideInfo(startOfDay);
  const coef = moonInfo.coefficient;

  // Alturas calibradas según el coeficiente
  const coefFactor = (coef - 70) / 45;
  const highTideHeight = +(3.45 + coefFactor * 0.95).toFixed(2);
  const lowTideHeight = +(1.25 - coefFactor * 0.85).toFixed(2);

  // Desfase diario de la marea (~50 min cada 24 horas respecto a la órbita lunar)
  const daysSinceEpoch = (startOfDay.getTime() - REF_NEW_MOON) / (24 * 60 * 60 * 1000);
  const baseTideHour = ((daysSinceEpoch * 0.8412 + 3.8) % TIDE_CYCLE_HOURS + TIDE_CYCLE_HOURS) % TIDE_CYCLE_HOURS;

  // Generamos los 4 puntos del día
  const events = [];
  
  let h_p1 = baseTideHour;
  let h_b1 = (h_p1 + 6.21) % 24;
  let h_p2 = (h_p1 + 12.42) % 24;
  let h_b2 = (h_p2 + 6.21) % 24;

  events.push({ type: 'high', name: 'Pleamar', timeHours: h_p1, height: highTideHeight });
  events.push({ type: 'low', name: 'Bajamar', timeHours: h_b1, height: lowTideHeight });
  events.push({ type: 'high', name: 'Pleamar', timeHours: h_p2, height: highTideHeight });
  events.push({ type: 'low', name: 'Bajamar', timeHours: h_b2, height: lowTideHeight });

  events.sort((a, b) => a.timeHours - b.timeHours);

  events.forEach(e => {
    const totalMinutes = Math.round(e.timeHours * 60);
    const hrs = Math.floor(totalMinutes / 60) % 24;
    const mins = totalMinutes % 60;
    e.timeStr = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  });

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
  const currentHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  const dayData = getDailyTideEvents(now);
  const { events, highTideHeight, lowTideHeight, moonInfo } = dayData;

  const meanLevel = (highTideHeight + lowTideHeight) / 2;
  const amplitude = (highTideHeight - lowTideHeight) / 2;
  
  const p1 = events.find(e => e.type === 'high') || events[0];
  const deltaHours = currentHours - p1.timeHours;
  const currentWaterHeight = +(meanLevel + amplitude * Math.cos((deltaHours / TIDE_CYCLE_HOURS) * 2 * Math.PI)).toFixed(2);
  
  const fillPercent = Math.min(100, Math.max(0, Math.round(((currentWaterHeight - lowTideHeight) / (highTideHeight - lowTideHeight)) * 100)));

  const slope = -Math.sin((deltaHours / TIDE_CYCLE_HOURS) * 2 * Math.PI);
  const isRising = slope > 0;

  let nextEvent = events.find(e => e.timeHours > currentHours);
  let hoursUntilNext = 0;

  if (nextEvent) {
    hoursUntilNext = nextEvent.timeHours - currentHours;
  } else {
    const tomorrowData = getDailyTideEvents(new Date(now.getTime() + 24 * 60 * 60 * 1000));
    nextEvent = tomorrowData.events[0];
    hoursUntilNext = (24 - currentHours) + nextEvent.timeHours;
  }

  const minsUntilNext = Math.round(hoursUntilNext * 60);
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
 * Genera el SVG interactivo del Mareógrafo para una fecha dada (por defecto hoy)
 */
export function renderTideSvgGraph(dayData, isLiveToday = true, currentHours = null) {
  const { events, highTideHeight, lowTideHeight } = dayData;
  const p1 = events.find(e => e.type === 'high') || events[0];

  const svgWidth = 880;
  const svgHeight = 240;
  const padX = 50;
  const padYTop = 40;
  const padYBottom = 48;
  const usableWidth = svgWidth - padX * 2;
  const usableHeight = svgHeight - padYTop - padYBottom;

  // Curva de 24 horas con 96 puntos (cada 15 min)
  let pathD = '';
  const points = [];
  const minH = lowTideHeight - 0.25;
  const maxH = highTideHeight + 0.25;

  for (let step = 0; step <= 96; step++) {
    const t = (step / 96) * 24;
    const x = padX + (t / 24) * usableWidth;
    
    // Altura sinusoidal
    const meanLevel = (highTideHeight + lowTideHeight) / 2;
    const amplitude = (highTideHeight - lowTideHeight) / 2;
    const h = meanLevel + amplitude * Math.cos(((t - p1.timeHours) / TIDE_CYCLE_HOURS) * 2 * Math.PI);
    
    // Mapeo Y invertido (arriba = marea alta)
    const norm = (h - minH) / (maxH - minH);
    const y = padYTop + (1 - norm) * usableHeight;

    points.push({ t, x, y, h });
    if (step === 0) {
      pathD += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    } else {
      pathD += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  }

  // Área rellena bajo la curva
  const areaD = `${pathD} L ${(padX + usableWidth).toFixed(1)} ${(svgHeight - padYBottom).toFixed(1)} L ${padX} ${(svgHeight - padYBottom).toFixed(1)} Z`;

  // Calcular posición del indicador de tiempo real si aplica
  let liveMarker = '';
  if (isLiveToday) {
    const nowH = currentHours !== null ? currentHours : (new Date().getHours() + new Date().getMinutes() / 60);
    const liveX = padX + (nowH / 24) * usableWidth;
    const meanLevel = (highTideHeight + lowTideHeight) / 2;
    const amplitude = (highTideHeight - lowTideHeight) / 2;
    const nowWaterH = meanLevel + amplitude * Math.cos(((nowH - p1.timeHours) / TIDE_CYCLE_HOURS) * 2 * Math.PI);
    const norm = (nowWaterH - minH) / (maxH - minH);
    const liveY = padYTop + (1 - norm) * usableHeight;

    liveMarker = `
      <!-- Línea vertical de hora actual -->
      <line x1="${liveX.toFixed(1)}" y1="${padYTop - 15}" x2="${liveX.toFixed(1)}" y2="${svgHeight - padYBottom}" stroke="rgba(56, 189, 248, 0.75)" stroke-width="2" stroke-dasharray="4 4" />
      <!-- Punto de pulso brillante -->
      <circle cx="${liveX.toFixed(1)}" cy="${liveY.toFixed(1)}" r="14" fill="rgba(56, 189, 248, 0.3)" class="tide-pulse-aura" />
      <circle cx="${liveX.toFixed(1)}" cy="${liveY.toFixed(1)}" r="6.5" fill="#38bdf8" stroke="#ffffff" stroke-width="2.5" />
      <!-- Badge de nivel actual en vivo -->
      <g transform="translate(${Math.min(svgWidth - 115, Math.max(liveX - 50, 10))}, ${Math.max(8, liveY - 28)})">
        <rect x="0" y="0" width="100" height="22" rx="11" fill="rgba(15, 23, 42, 0.92)" stroke="#38bdf8" stroke-width="1.4" />
        <text x="50" y="15" font-size="11.5" font-weight="800" font-family="'JetBrains Mono', monospace" fill="#38bdf8" text-anchor="middle">AHORA ${nowWaterH.toFixed(2)}m</text>
      </g>
    `;
  }

  // Puntos de eventos (Pleamares y Bajamares)
  const eventMarkers = events.map(e => {
    const x = padX + (e.timeHours / 24) * usableWidth;
    const norm = (e.height - minH) / (maxH - minH);
    const y = padYTop + (1 - norm) * usableHeight;
    const isHigh = e.type === 'high';
    const color = isHigh ? '#38bdf8' : '#fbbf24';
    const labelY = isHigh ? y - 12 : y + 18;

    return `
      <g class="tide-event-node">
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.5" fill="${color}" stroke="#0f172a" stroke-width="2" />
        <text x="${x.toFixed(1)}" y="${labelY.toFixed(1)}" font-size="12" font-weight="800" fill="${color}" text-anchor="middle" font-family="'JetBrains Mono', monospace">
          ${e.name.toUpperCase()} ${e.timeStr} (${e.height}m)
        </text>
      </g>
    `;
  }).join('');

  // Guías de horas (cada 3 horas: 00h, 03h, 06h, 09h, 12h, 15h, 18h, 21h, 24h)
  const hourTicks = [0, 3, 6, 9, 12, 15, 18, 21, 24].map(h => {
    const x = padX + (h / 24) * usableWidth;
    return `
      <line x1="${x.toFixed(1)}" y1="${padYTop}" x2="${x.toFixed(1)}" y2="${svgHeight - padYBottom}" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />
      <text x="${x.toFixed(1)}" y="${svgHeight - padYBottom + 18}" font-size="11" font-weight="700" fill="rgba(148, 163, 184, 0.85)" text-anchor="middle" font-family="'JetBrains Mono', monospace">${String(h).padStart(2, '0')}:00</text>
    `;
  }).join('');

  return `
    <svg width="880" height="240" viewBox="0 0 ${svgWidth} ${svgHeight}" class="tide-svg-chart" style="min-width: 880px; width: 880px; height: 240px; display: block; overflow: visible;">
      <defs>
        <linearGradient id="tideAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.32" />
          <stop offset="60%" stop-color="#0284c7" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.02" />
        </linearGradient>
        <linearGradient id="tideLineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38bdf8" />
          <stop offset="50%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#38bdf8" />
        </linearGradient>
      </defs>

      <!-- Guías de horas -->
      ${hourTicks}

      <!-- Línea base de cota cero -->
      <line x1="${padX}" y1="${svgHeight - padYBottom}" x2="${padX + usableWidth}" y2="${svgHeight - padYBottom}" stroke="rgba(255, 255, 255, 0.18)" stroke-width="1.2" />

      <!-- Área y curva de la onda de marea -->
      <path d="${areaD}" fill="url(#tideAreaGrad)" />
      <path d="${pathD}" fill="none" stroke="url(#tideLineGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Nodos de pleamar y bajamar -->
      ${eventMarkers}

      <!-- Indicador en vivo -->
      ${liveMarker}
    </svg>
  `;
}
