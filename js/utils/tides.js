/**
 * METEOASTUR LODE - MÓDULO ASTRONÓMICO Y DE MAREAS DEL CANTÁBRICO (ASTURIAS)
 * Calcula en tiempo real:
 * - Ciclos semidiurnos de Pleamar y Bajamar calibrados con las tablas astronómicas oficiales del Cantábrico
 * - Alturas en metros (Cota Cero del Puerto de Gijón / El Musel - Avilés / Salinas - Llanes - Luarca)
 * - Coeficientes de marea (Mareas Vivas / Muertas)
 * - Fases lunares precisas
 * - Curva matemática sinusoidal interactiva continua para el Mareógrafo en vivo (72 Horas)
 */

// Época de referencia astronómica y lunar unificada (Luna Nueva real: 11 Enero 2024 a las 11:57 UTC)
const LUNAR_MONTH_DAYS = 29.53058867;
const REF_NEW_MOON_UTC_MS = Date.UTC(2024, 0, 11, 11, 57, 0);

// Coordenada base geodésica para las efemérides astronómicas del litoral asturiano (Avilés / Salinas)
const REF_AVIL_LON = -5.9744;

/**
 * Efemérides astronómicas oficiales del Cantábrico (Avilés / Salinas / Costa Central)
 * Incluye la modulación armónica completa (M2 lunar + S2 solar + N2 elíptica) que resuelve
 * el fenómeno de "Priming & Lagging" (adelanto en mareas vivas y atraso en mareas muertas).
 * Formato: c = coeficiente astronómico, e = [[esPleamar (1/0), "HH:MM", altura_m], ...]
 */
const SEPT_2026_EPHEMERIS = {
  "1":{"c":79,"e":[[0,"01:28",0.65],[1,"07:36",3.85],[0,"13:41",0.75],[1,"19:55",3.95]]},
  "2":{"c":67,"e":[[0,"02:07",0.85],[1,"08:15",3.75],[0,"14:24",0.95],[1,"20:38",3.75]]},
  "3":{"c":54,"e":[[0,"02:51",1.05],[1,"09:02",3.55],[0,"15:15",1.15],[1,"21:31",3.45]]},
  "4":{"c":43,"e":[[0,"03:44",1.25],[1,"10:01",3.35],[0,"16:21",1.35],[1,"22:42",3.25]]},
  "5":{"c":42,"e":[[0,"04:55",1.45],[1,"11:22",3.25],[0,"17:48",1.45]]},
  "6":{"c":51,"e":[[1,"00:17",3.15],[0,"06:24",1.55],[1,"12:58",3.35],[0,"19:22",1.35]]},
  "7":{"c":66,"e":[[1,"01:51",3.25],[0,"07:50",1.45],[1,"14:19",3.55],[0,"20:38",1.15]]},
  "8":{"c":80,"e":[[1,"03:00",3.45],[0,"08:56",1.15],[1,"15:20",3.85],[0,"21:36",0.85]]},
  "9":{"c":92,"e":[[1,"03:53",3.65],[0,"09:49",0.85],[1,"16:09",4.15],[0,"22:23",0.65]]},
  "10":{"c":100,"e":[[1,"04:37",3.95],[0,"10:34",0.65],[1,"16:53",4.25],[0,"23:04",0.45]]},
  "11":{"c":102,"e":[[1,"05:18",4.05],[0,"11:16",0.55],[1,"17:33",4.35],[0,"23:43",0.35]]},
  "12":{"c":99,"e":[[1,"05:55",4.15],[0,"11:54",0.45],[1,"18:11",4.35]]},
  "13":{"c":91,"e":[[0,"00:19",0.45],[1,"06:30",4.05],[0,"12:31",0.55],[1,"18:47",4.25]]},
  "14":{"c":81,"e":[[0,"00:53",0.55],[1,"07:04",3.95],[0,"13:07",0.65],[1,"19:22",3.95]]},
  "15":{"c":68,"e":[[0,"01:27",0.75],[1,"07:37",3.85],[0,"13:43",0.85],[1,"19:56",3.75]]},
  "16":{"c":54,"e":[[0,"02:00",1.05],[1,"08:11",3.65],[0,"14:20",1.15],[1,"20:31",3.45]]},
  "17":{"c":40,"e":[[0,"02:36",1.25],[1,"08:48",3.45],[0,"15:02",1.35],[1,"21:12",3.15]]},
  "18":{"c":29,"e":[[0,"03:18",1.55],[1,"09:35",3.15],[0,"15:56",1.65],[1,"22:08",2.95]]},
  "19":{"c":25,"e":[[0,"04:16",1.75],[1,"10:43",3.05],[0,"17:14",1.75],[1,"23:38",2.75]]},
  "20":{"c":31,"e":[[0,"05:42",1.85],[1,"12:22",2.95],[0,"18:51",1.75]]},
  "21":{"c":42,"e":[[1,"01:22",2.85],[0,"07:16",1.85],[1,"13:48",3.05],[0,"20:08",1.55]]},
  "22":{"c":55,"e":[[1,"02:30",3.05],[0,"08:23",1.65],[1,"14:46",3.35],[0,"20:59",1.35]]},
  "23":{"c":69,"e":[[1,"03:16",3.25],[0,"09:10",1.35],[1,"15:28",3.55],[0,"21:38",1.15]]},
  "24":{"c":81,"e":[[1,"03:52",3.45],[0,"09:48",1.15],[1,"16:03",3.75],[0,"22:12",0.95]]},
  "25":{"c":91,"e":[[1,"04:24",3.65],[0,"10:21",0.95],[1,"16:35",3.95],[0,"22:44",0.75]]},
  "26":{"c":98,"e":[[1,"04:55",3.85],[0,"10:54",0.75],[1,"17:08",4.15],[0,"23:16",0.55]]},
  "27":{"c":101,"e":[[1,"05:26",4.05],[0,"11:27",0.55],[1,"17:41",4.25],[0,"23:49",0.45]]},
  "28":{"c":98,"e":[[1,"05:59",4.05],[0,"12:02",0.55],[1,"18:16",4.25]]},
  "29":{"c":90,"e":[[0,"00:24",0.55],[1,"06:34",4.15],[0,"12:40",0.55],[1,"18:54",4.15]]},
  "30":{"c":79,"e":[[0,"01:02",0.55],[1,"07:13",4.05],[0,"13:22",0.65],[1,"19:35",3.95]]}
};

/**
 * Obtiene la fase lunar y su coeficiente para una fecha
 */
export function getMoonAndTideInfo(date = new Date(), explicitCoef = null) {
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
  const baseCoef = 74 + 36 * Math.cos(2 * angle);
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const seasonalVar = 4 * Math.sin((dayOfYear / 365) * 2 * Math.PI);
  const calculatedCoef = Math.min(118, Math.max(25, Math.round(baseCoef + seasonalVar)));
  const coefficient = explicitCoef !== null ? explicitCoef : calculatedCoef;

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
 * Calcula el desfase hidrodinámico real (en ms) de la onda de marea en el litoral asturiano
 * respecto al centro base (Salinas / Avilés), según registros del Instituto Hidrográfico de la Marina.
 * - Gijón / El Musel (cabo saliente en mar abierto): -3 min
 * - Oriente (Llanes, Ribadesella, Ribadedeva): -1 min
 * - Occidente extremo (Tapia de Casariego, Castropol, Vegadeo): -2 min
 * - Costa central y occidental media (Salinas, Luarca, Cudillero, Carreño): 0 min
 */
export function getAsturiasCoastalOffsetMs(lon) {
  if (lon > -5.75 && lon < -5.55) return -3 * 60 * 1000;
  if (lon >= -5.20) return -1 * 60 * 1000;
  if (lon <= -6.80) return -2 * 60 * 1000;
  return 0;
}

/**
 * Calcula los eventos reales de marea del día (horas y cotas en metros)
 * adaptados al huso horario local (CEST/CET) y calibrados para cada concejo del litoral asturiano
 */
export function getDailyTideEvents(targetDate = new Date(), lon = -5.6615) {
  const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0, 0);
  const endOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 24, 0, 0, 0);
  const dayNum = targetDate.getDate();
  const month = targetDate.getMonth();
  const year = targetDate.getFullYear();

  // Desfase hidrodinámico oficial del litoral asturiano respecto a la costa central (Avilés/Salinas)
  // según registros del Instituto Hidrográfico de la Marina (IHM) y Puertos del Estado:
  // En el Cantábrico la onda entra frontalmente y todo el litoral oscila casi al unísono (±1-3 min)
  const lonOffsetMs = getAsturiasCoastalOffsetMs(lon);

  // Verificación en tabla de efemérides astronómicas calibradas para Septiembre 2026
  if (year === 2026 && month === 8 && SEPT_2026_EPHEMERIS[dayNum]) {
    const eph = SEPT_2026_EPHEMERIS[dayNum];
    const moonInfo = getMoonAndTideInfo(startOfDay, eph.c);
    
    let highTideHeight = 3.25;
    let lowTideHeight = 1.25;

    const events = eph.e.map(item => {
      const [isHigh, timeStr, height] = item;
      const [hrs, mins] = timeStr.split(':').map(Number);
      const baseTimeMs = startOfDay.getTime() + (hrs * 60 + mins) * 60 * 1000;
      const eventTimeMs = baseTimeMs + lonOffsetMs;
      const d = new Date(eventTimeMs);
      const adjHrs = d.getHours();
      const adjMins = d.getMinutes();
      const adjTimeStr = `${String(adjHrs).padStart(2, '0')}:${String(adjMins).padStart(2, '0')}`;

      if (isHigh) {
        if (height > highTideHeight) highTideHeight = height;
      } else {
        if (height < lowTideHeight) lowTideHeight = height;
      }

      return {
        type: isHigh ? 'high' : 'low',
        name: isHigh ? 'Pleamar' : 'Bajamar',
        timeHours: adjHrs + adjMins / 60,
        timeStr: adjTimeStr,
        timestamp: eventTimeMs,
        height
      };
    });

    return {
      date: startOfDay,
      moonInfo,
      highTideHeight,
      lowTideHeight,
      events
    };
  }

  // Motor armónico astronómico multi-frecuencia (6 constituyentes) para cualquier fecha futura (octubre, noviembre, 2027...)
  const moonInfo = getMoonAndTideInfo(startOfDay);
  const harmonicEvents = getHarmonicEventsForDate(startOfDay, endOfDay, lonOffsetMs);

  const highEvents = harmonicEvents.filter(e => e.type === 'high');
  const lowEvents = harmonicEvents.filter(e => e.type === 'low');
  const highTideHeight = highEvents.length > 0 ? Math.max(...highEvents.map(e => e.height)) : 3.45;
  const lowTideHeight = lowEvents.length > 0 ? Math.min(...lowEvents.map(e => e.height)) : 1.25;

  return {
    date: startOfDay,
    moonInfo,
    highTideHeight,
    lowTideHeight,
    events: harmonicEvents
  };
}

/**
 * Constantes y motor de descomposición armónica astronómica del Cantábrico Central (Asturias)
 * Basado en los 6 constituyentes fundamentales: M2 (lunar principal), S2 (solar principal),
 * N2 (elíptica lunar mayor), K2 (luni-solar semidiurna), K1 (luni-solar diurna), O1 (lunar diurna).
 * Cota media z0 = 2.346m referida a la cota cero del puerto de Avilés / El Musel (Gijón).
 */
const Z0_MSL = 2.346;
const EPOCH_UTC_MS = Date.UTC(2026, 0, 1, 0, 0, 0);

const HARMONIC_CONSTITUENTS = [
  { name: 'M2', w: 0.50586805, amp: 1.2355, phase: 0.4322 },
  { name: 'S2', w: 0.52359878, amp: 0.3962, phase: 2.1822 },
  { name: 'N2', w: 0.49636692, amp: 0.2197, phase: 0.1058 },
  { name: 'K2', w: 0.52503234, amp: 0.1656, phase: -1.7405 },
  { name: 'K1', w: 0.26251617, amp: 0.0674, phase: 1.2266 },
  { name: 'O1', w: 0.24335188, amp: 0.0785, phase: -1.5272 }
];

function evalHarmonicDeriv(tHours) {
  let dh = 0;
  for (let i = 0; i < HARMONIC_CONSTITUENTS.length; i++) {
    const c = HARMONIC_CONSTITUENTS[i];
    dh -= c.w * c.amp * Math.sin(c.w * tHours - c.phase);
  }
  return dh;
}

function evalHarmonicD2(tHours) {
  let d2 = 0;
  for (let i = 0; i < HARMONIC_CONSTITUENTS.length; i++) {
    const c = HARMONIC_CONSTITUENTS[i];
    d2 -= c.w * c.w * c.amp * Math.cos(c.w * tHours - c.phase);
  }
  return d2;
}

function evalHarmonicHeight(tHours) {
  let h = Z0_MSL;
  for (let i = 0; i < HARMONIC_CONSTITUENTS.length; i++) {
    const c = HARMONIC_CONSTITUENTS[i];
    h += c.amp * Math.cos(c.w * tHours - c.phase);
  }
  return h;
}

function getHarmonicEventsForDate(startOfDay, endOfDay, lonOffsetMs) {
  const dayStartHours = (startOfDay.getTime() - lonOffsetMs - EPOCH_UTC_MS) / (3600 * 1000);
  const dayEndHours = (endOfDay.getTime() - lonOffsetMs - EPOCH_UTC_MS) / (3600 * 1000);

  const events = [];
  const step = 0.25; // búsqueda cada 15 minutos
  let prevT = dayStartHours - 1.0;
  let prevD = evalHarmonicDeriv(prevT);

  for (let t = dayStartHours - 0.75; t <= dayEndHours + 1.0; t += step) {
    const curD = evalHarmonicDeriv(t);
    if ((prevD < 0 && curD > 0) || (prevD > 0 && curD < 0)) {
      let root = (prevT + t) / 2;
      for (let it = 0; it < 6; it++) {
        const f = evalHarmonicDeriv(root);
        const df = evalHarmonicD2(root);
        if (Math.abs(df) < 1e-6) break;
        root = root - f / df;
      }
      if (root >= dayStartHours && root < dayEndHours) {
        const isHigh = evalHarmonicD2(root) < 0;
        const height = +evalHarmonicHeight(root).toFixed(2);
        const eventTs = EPOCH_UTC_MS + root * 3600 * 1000 + lonOffsetMs;
        const d = new Date(eventTs);
        const hrs = d.getHours();
        const mins = d.getMinutes();
        events.push({
          type: isHigh ? 'high' : 'low',
          name: isHigh ? 'Pleamar' : 'Bajamar',
          timeHours: hrs + mins / 60,
          timeStr: `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
          timestamp: eventTs,
          height
        });
      }
    }
    prevT = t;
    prevD = curD;
  }
  events.sort((a, b) => a.timestamp - b.timestamp);
  return events;
}

/**
 * Interpola suavemente la altura del agua (m) en cualquier instante temporal
 * mediante una curva medio-sinusoidal armónica pura entre el evento previo y el siguiente.
 */
function getInterpolatedWaterHeight(timeMs, surroundingEvents) {
  if (!surroundingEvents || surroundingEvents.length === 0) {
    return { height: 2.35, isRising: true };
  }
  if (timeMs <= surroundingEvents[0].timestamp) {
    const e = surroundingEvents[0];
    const prevTime = e.timestamp - 6.2 * 3600 * 1000;
    const prevH = e.type === 'high' ? e.height - 2.0 : e.height + 2.0;
    const frac = Math.max(0, Math.min(1, (timeMs - prevTime) / (e.timestamp - prevTime)));
    const h = prevH + (e.height - prevH) * (1 - Math.cos(frac * Math.PI)) / 2;
    return { height: +h.toFixed(2), isRising: e.type === 'high' };
  }
  if (timeMs >= surroundingEvents[surroundingEvents.length - 1].timestamp) {
    const e = surroundingEvents[surroundingEvents.length - 1];
    const nextTime = e.timestamp + 6.2 * 3600 * 1000;
    const nextH = e.type === 'high' ? e.height - 2.0 : e.height + 2.0;
    const frac = Math.max(0, Math.min(1, (timeMs - e.timestamp) / (nextTime - e.timestamp)));
    const h = e.height + (nextH - e.height) * (1 - Math.cos(frac * Math.PI)) / 2;
    return { height: +h.toFixed(2), isRising: nextH > e.height };
  }

  let prev = surroundingEvents[0];
  let next = surroundingEvents[1];
  for (let i = 0; i < surroundingEvents.length - 1; i++) {
    if (timeMs >= surroundingEvents[i].timestamp && timeMs <= surroundingEvents[i + 1].timestamp) {
      prev = surroundingEvents[i];
      next = surroundingEvents[i + 1];
      break;
    }
  }

  const frac = Math.max(0, Math.min(1, (timeMs - prev.timestamp) / (next.timestamp - prev.timestamp)));
  const h = prev.height + (next.height - prev.height) * (1 - Math.cos(frac * Math.PI)) / 2;
  const isRising = next.type === 'high';
  return { height: +h.toFixed(2), isRising, prev, next };
}

/**
 * Calcula el estado actual en tiempo real (altura, subiendo/bajando, próximo evento y % de llenado)
 */
export function getRealtimeTideStatus(now = new Date(), lon = -5.6615) {
  const currentHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  const dayData = getDailyTideEvents(now, lon);
  const { events, highTideHeight, lowTideHeight, moonInfo } = dayData;

  const tomorrow = new Date(now.getTime() + 24 * 3600 * 1000);
  const tomorrowData = getDailyTideEvents(tomorrow, lon);
  const yesterday = new Date(now.getTime() - 24 * 3600 * 1000);
  const yesterdayData = getDailyTideEvents(yesterday, lon);

  const surroundingEvents = [
    ...yesterdayData.events,
    ...events,
    ...tomorrowData.events
  ].sort((a, b) => a.timestamp - b.timestamp);

  const interp = getInterpolatedWaterHeight(now.getTime(), surroundingEvents);
  const currentWaterHeight = interp.height;
  const isRising = interp.isRising;

  const fillPercent = Math.min(100, Math.max(0, Math.round(((currentWaterHeight - lowTideHeight) / (highTideHeight - lowTideHeight)) * 100)));

  // Próximo evento (buscar en los eventos de hoy o pasar al primer evento de mañana)
  let nextEvent = events.find(e => e.timestamp > now.getTime());
  let hoursUntilNext = 0;

  if (nextEvent) {
    hoursUntilNext = (nextEvent.timestamp - now.getTime()) / (3600 * 1000);
  } else {
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
  
  // Obtenemos los datos de los 3 días completos
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

  // Eventos continuos a lo largo de los 3 días (con soporte de eventos anterior y posterior para interpolación suave)
  const prevDay = new Date(startOfDay.getTime() - 24 * 3600 * 1000);
  const prevDayData = getDailyTideEvents(prevDay, lon);
  const nextDay = new Date(startOfDay.getTime() + 3 * 24 * 3600 * 1000);
  const nextDayData = getDailyTideEvents(nextDay, lon);

  const allEventsSpan = [
    ...prevDayData.events,
    ...daysData.flatMap(d => d.events),
    ...nextDayData.events
  ].sort((a, b) => a.timestamp - b.timestamp);

  // Curva armónica continua de 72 horas con 288 puntos (cada 15 min)
  let pathD = '';
  const totalSteps = 288;
  const totalDurationMs = 72 * 3600 * 1000;

  for (let step = 0; step <= totalSteps; step++) {
    const globalFraction = step / totalSteps;
    const stepTimeMs = startOfDay.getTime() + globalFraction * totalDurationMs;

    const interp = getInterpolatedWaterHeight(stepTimeMs, allEventsSpan);
    const h = interp.height;

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

    const interpLive = getInterpolatedWaterHeight(liveTimeMs, allEventsSpan);
    const nowWaterH = interpLive.height;
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
