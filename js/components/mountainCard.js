/**
 * Red de puertos de montaña estratégicos de la Cordillera Cantábrica en Asturias
 * Arterias prioritarias de conexión con la meseta y pasos comarcales
 */
export const PUERTOS_MONTANA_ASTURIAS = [
  // --- ARTERIAS PRINCIPALES DE CONEXIÓN CON LA MESETA ---
  { id: 'huerna', name: 'Autopista del Huerna (AP-66)', alt: 1229, concejo: 'Lena / León', road: 'AP-66', sector: 'arterias', isArtery: true, desc: 'Vía de alta capacidad principal entre Asturias y la Meseta (Túnel del Negrón).' },
  { id: 'pajares', name: 'Puerto de Pajares (N-630)', alt: 1378, concejo: 'Lena / León', road: 'N-630', sector: 'arterias', isArtery: true, desc: 'Paso histórico nacional alternativo al Huerna con fuertes pendientes.' },

  // --- SECTOR CENTRO Y VALLES MINEROS (Caudal, Aller, Quirós, Riosa) ---
  { id: 'san_isidro', name: 'Puerto de San Isidro', alt: 1520, concejo: 'Aller / León', road: 'AS-112 / LE-331', sector: 'centro', desc: 'Acceso a Fuentes de Invierno y San Isidro.' },
  { id: 'cobertoria', name: 'Alto de la Cobertoria', alt: 1173, concejo: 'Quirós / Lena', road: 'AS-230', sector: 'centro', desc: 'Paso interior central que enlaza Quirós y Pola de Lena.' },
  { id: 'angliru', name: 'Alto del Angliru', alt: 1570, concejo: 'Riosa', road: 'RI-5', sector: 'centro', desc: 'Cima mítica ciclista de rampas extremas en la Sierra del Aramo.' },
  { id: 'ventana', name: 'Puerto de Ventana', alt: 1587, concejo: 'Teverga / León', road: 'AS-228 / LE-481', sector: 'centro', desc: 'Paso de alta montaña entre Teverga y Babia.' },

  // --- SECTOR ORIENTE Y PICOS DE EUROPA (Caso, Ponga, Cangas de Onís) ---
  { id: 'tarna', name: 'Puerto de Tarna', alt: 1490, concejo: 'Caso / León', road: 'AS-117 / CL-635', sector: 'oriente', desc: 'Paso por el Parque Natural de Redes hacia Riaño.' },
  { id: 'ponton', name: 'Puerto del Pontón / Desfiladero', alt: 1280, concejo: 'Amieva / Ponga hacia León', road: 'N-625', sector: 'oriente', desc: 'Paso por el Desfiladero de los Beyos hacia Riaño y Picos de Europa.' },
  { id: 'lagos_covadonga', name: 'Lagos de Covadonga', alt: 1134, concejo: 'Cangas de Onís', road: 'CO-4', sector: 'oriente', desc: 'Enclave icónico del Parque Nacional de Picos de Europa.' },

  // --- SECTOR OCCIDENTE (Somiedo, Narcea, Allande, Ibias) ---
  { id: 'somiedo', name: 'Puerto de Somiedo', alt: 1486, concejo: 'Somiedo / León', road: 'AS-227 / LE-495', sector: 'occidente', desc: 'Corazón del Parque Natural de Somiedo hacia Laciana.' },
  { id: 'san_lorenzo', name: 'Puerto de San Lorenzo', alt: 1349, concejo: 'Somiedo / Teverga', road: 'AS-265', sector: 'occidente', desc: 'Conexión entre valles occidentales con rampas exigentes.' },
  { id: 'leitariegos', name: 'Puerto de Leitariegos', alt: 1525, concejo: 'Cangas del Narcea / León', road: 'AS-213 / LE-497', sector: 'occidente', desc: 'Acceso a la estación invernal de Leitariegos.' },
  { id: 'el_connio', name: 'Puerto del Connio', alt: 1315, concejo: 'Cangas del Narcea / Ibias', road: 'AS-348', sector: 'occidente', desc: 'Atraviesa la Reserva Integral de Muniellos.' },
  { id: 'el_palo', name: 'Puerto del Palo', alt: 1146, concejo: 'Allande / Grandas', road: 'AS-14', sector: 'occidente', desc: 'Paso clave del Camino Primitivo y el occidente asturiano.' },
  { id: 'la_marta', name: 'Puerto de la Marta', alt: 1105, concejo: 'Allande', road: 'ALL-4', sector: 'occidente', desc: 'Paso montañoso solitario y expuesto del occidente.' },
  { id: 'mujeres_muertas', name: 'Pozo de las Mujeres Muertas', alt: 1117, concejo: 'Allande / Ibias', road: 'AS-29', sector: 'occidente', desc: 'Conexión de la cuenca del Navia hacia San Antolín de Ibias.' }
];

/**
 * Fichas de Estaciones de Esquí de Asturias y limítrofes
 * Formato Snow-Forecast con cotas Cumbre, Media y Base
 */
export const ESTACIONES_ESQUI = [
  {
    id: 'pajares',
    name: 'Valgrande-Pajares',
    shortName: 'Pajares',
    concejo: 'Lena (Asturias)',
    baseAlt: 1480,
    midAlt: 1680,
    topAlt: 1890,
    summitName: 'Celleros / Cueto Negro',
    pistasKm: '21.5 km',
    pistasCount: 38,
    remontesCount: 8,
    snowpark: true,
    web: 'https://www.valgrande-pajares.com',
    desc: 'La decana del esquí en la cordillera cantábrica. Cuenta con la nueva telecabina Cuitu Negru y vertientes orientadas al norte y este.'
  },
  {
    id: 'fuentes',
    name: 'Fuentes de Invierno',
    shortName: 'Fuentes',
    concejo: 'Aller (Asturias)',
    baseAlt: 1500,
    midAlt: 1720,
    topAlt: 1950,
    summitName: 'Picu Entresiegu',
    pistasKm: '8.7 km',
    pistasCount: 15,
    remontesCount: 5,
    snowpark: false,
    web: 'https://www.fuentesdeinvierno.com',
    desc: 'Estación moderna y acogedora en el concejo de Aller, con nieve polvo de altísima calidad por su orientación sombría.'
  },
  {
    id: 'san_isidro',
    name: 'San Isidro (Puebla de Lillo)',
    shortName: 'San Isidro',
    concejo: 'Aller / León (Frontera)',
    baseAlt: 1500,
    midAlt: 1800,
    topAlt: 2100,
    summitName: 'Pico Requejines',
    pistasKm: '34.0 km',
    pistasCount: 35,
    remontesCount: 15,
    snowpark: true,
    web: 'https://www.san-isidro.net',
    desc: 'La mayor estación de la cordillera cantábrica, pegada a Fuentes de Invierno. Dividida en 4 sectores: Cebolledo, Riopinos, Requejines y Salencias.'
  },
  {
    id: 'leitariegos',
    name: 'Leitariegos (Valle de Laciana)',
    shortName: 'Leitariegos',
    concejo: 'Cangas del Narcea / León',
    baseAlt: 1525,
    midAlt: 1660,
    topAlt: 1800,
    summitName: 'Cueto de Arbás',
    pistasKm: '8.0 km',
    pistasCount: 13,
    remontesCount: 6,
    snowpark: true,
    web: 'https://www.nieveleitariegos.com',
    desc: 'Estación familiar del occidente al pie del Cueto de Arbás, rodeada de bosques de abedules y pistas muy resguardadas.'
  }
];

/**
 * Calcula la Sensación Térmica (Wind Chill) según la fórmula oficial de la NOAA / JAG/TI
 * WindChill = 13.12 + 0.6215 * T - 11.37 * (V^0.16) + 0.3965 * T * (V^0.16)
 */
export function calculateWindChill(tempC, windSpeedKmH) {
  const t = parseFloat(tempC);
  const v = parseFloat(windSpeedKmH);
  if (t <= 10 && v >= 4.8) {
    const vPow = Math.pow(v, 0.16);
    const wc = 13.12 + (0.6215 * t) - (11.37 * vPow) + (0.3965 * t * vPow);
    return Math.round(wc);
  }
  return Math.round(t);
}

/**
 * Genera la flecha vectorial de viento para cumbres y pistas
 */
export function getMountainWindArrowSvg(deg, color = '#38bdf8', size = 13) {
  const rotation = Math.round((deg + 180) % 360);
  return `<svg class="mountain-wind-arrow" style="transform: rotate(${rotation}deg); display: inline-block; vertical-align: middle; flex-shrink: 0;" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" title="Viento soplando hacia el ${(deg + 180) % 360}°">
    <path d="M12 2L5 13h4.5v9h5v-9H19L12 2z" fill="${color}"/>
  </svg>`;
}

/**
 * Evalúa el semáforo de seguridad de remontes y telesillas según el viento en cumbre
 */
export function evaluateLiftSafety(summitWindKmH) {
  const w = Math.round(summitWindKmH || 0);
  if (w >= 52) {
    return {
      status: 'Riesgo Cierre Remontes',
      badgeClass: 'lift-danger',
      icon: '🔴',
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.15)',
      desc: 'Viento fuerte en crestas y cuerdas altas (≥ 50 km/h). Posible paralización de telesillas por seguridad.'
    };
  }
  if (w >= 36) {
    return {
      status: 'Precaución por Viento',
      badgeClass: 'lift-caution',
      icon: '🟡',
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.15)',
      desc: 'Rachas moderadas a fuertes (35-50 km/h). Telesillas de cota alta pueden operar a velocidad reducida.'
    };
  }
  return {
    status: 'Remontes Operativos',
    badgeClass: 'lift-ok',
    icon: '🟢',
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.15)',
    desc: 'Viento noble y seguro (< 35 km/h). Condiciones favorables para la operación normal de remontes.'
  };
}

/**
 * Clasifica la calidad de la nieve en pista estilo Snow-Forecast
 */
export function evaluateSnowQuality(tempC, windSpeedKmH, isSnowing, freezingLevel, alt) {
  const t = parseFloat(tempC);
  const w = parseFloat(windSpeedKmH);

  if (w >= 45 && (isSnowing || t <= -1)) {
    return {
      type: 'ventisca',
      icon: '⚠️',
      label: 'Ventisca / Whiteout',
      color: '#f43f5e',
      desc: 'Nieve venteada con fuerte racha. Visibilidad comprometida en zonas altas.'
    };
  }
  if (t <= -2 && (isSnowing || freezingLevel <= alt - 100)) {
    return {
      type: 'polvo',
      icon: '❄️',
      label: 'Nieve Polvo (Powder)',
      color: '#38bdf8',
      desc: 'Frío seco y nieve ligera y suelta. Calidad óptima para deslizar.'
    };
  }
  if (t > -2 && t <= 1.5) {
    return {
      type: 'dura',
      icon: '🎿',
      label: 'Nieve Pisada / Dura',
      color: '#a78bfa',
      desc: 'Firme compacto y rápido por helada nocturna. Buen agarre de cantos.'
    };
  }
  if (t > 1.5) {
    return {
      type: 'primavera',
      icon: '💧',
      label: 'Nieve Primavera / Húmeda',
      color: '#fbbf24',
      desc: 'Nieve húmeda y pesada que se ablanda con las temperaturas diurnas.'
    };
  }
  return {
    type: 'estable',
    icon: '⛷️',
    label: 'Nieve Firme',
    color: '#38bdf8',
    desc: 'Buenas condiciones generales de manto nival en pista.'
  };
}

/**
 * Evalúa el peligro de aludes en la Cordillera según la escala europea EAWS (1 a 5)
 */
export function evaluateAvalancheRisk(snowfallSumToday, windSpeedKmH, freezingLevel) {
  const snow = parseFloat(snowfallSumToday) || 0;
  const wind = parseFloat(windSpeedKmH) || 0;

  if (snow >= 25 || (snow >= 15 && wind >= 50)) {
    return {
      level: 4,
      name: 'Fuerte',
      icon: '🔴',
      color: '#ef4444',
      desc: 'Manto nival débilmente estabilizado en la mayoría de laderas. Salidas fuera de pista altamente desaconsejadas.'
    };
  }
  if (snow >= 10 || (snow >= 5 && wind >= 35)) {
    return {
      level: 3,
      name: 'Notable',
      icon: '🟠',
      color: '#f97316',
      desc: 'Inestabilidad en pendientes empinadas por sobrecarga de nieve reciente y placas de viento.'
    };
  }
  if (snow > 0 || freezingLevel <= 1400) {
    return {
      level: 2,
      name: 'Limitado',
      icon: '🟡',
      color: '#eab308',
      desc: 'Manto moderadamente consolidado. Precaución en laderas pronunciadas umbrías.'
    };
  }
  return {
    level: 1,
    name: 'Débil',
    icon: '🟢',
    color: '#10b981',
    desc: 'Manto nival bien estabilizado en general. Condiciones seguras en montaña.'
  };
}

/**
 * Evalúa el estado de un puerto de montaña según la cota de nieve y precipitación
 */
export function evaluatePassStatus(passAlt, freezingLevel, snowAccumToday, precipNow) {
  const alt = parseInt(passAlt, 10);
  const fl = parseInt(freezingLevel, 10);
  const snow = parseFloat(snowAccumToday) || 0;
  const isPrecip = parseFloat(precipNow) > 0;

  if (fl <= alt - 150 && snow >= 6) {
    return {
      status: 'Cadenas Obligatorias',
      statusClass: 'status-chains',
      icon: '⛓️',
      color: '#ef4444',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      border: 'rgba(239, 68, 68, 0.4)'
    };
  }
  if (fl <= alt && (snow > 0 || isPrecip)) {
    return {
      status: 'Precaución (Nieve/Hielo)',
      statusClass: 'status-caution',
      icon: '🟡',
      color: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      border: 'rgba(245, 158, 11, 0.4)'
    };
  }
  if (fl <= alt + 150) {
    return {
      status: 'Riesgo de Heladas',
      statusClass: 'status-frost',
      icon: '❄️',
      color: '#38bdf8',
      badgeBg: 'rgba(56, 189, 248, 0.15)',
      border: 'rgba(56, 189, 248, 0.4)'
    };
  }
  return {
    status: 'Tráfico Normal / Abierto',
    statusClass: 'status-ok',
    icon: '🟢',
    color: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.4)'
  };
}

/**
 * Renderiza el módulo completo de Cordillera, Esquí & Puertos
 * Arquitectura Dual: Estaciones de Esquí (Snow-Forecast) & Red de Puertos de Montaña
 */
export function renderMountainCard(data, concejo) {
  const current = data.weather.current;
  const hourly = data.weather.hourly;
  const daily = data.weather.daily;

  const currentHour = new Date().getHours();
  const freezingLevel = hourly.freezing_level_height ? Math.round(hourly.freezing_level_height[currentHour] || 1900) : 1900;
  const snowAccumToday = daily.snowfall_sum ? daily.snowfall_sum[0].toFixed(1) : '0.0';
  const snowAccumTomorrow = daily.snowfall_sum && daily.snowfall_sum.length > 1 ? daily.snowfall_sum[1].toFixed(1) : '0.0';
  const snowAccumDay3 = daily.snowfall_sum && daily.snowfall_sum.length > 2 ? daily.snowfall_sum[2].toFixed(1) : '0.0';
  const totalSnow3Days = (parseFloat(snowAccumToday) + parseFloat(snowAccumTomorrow) + parseFloat(snowAccumDay3)).toFixed(1);

  // Viento actual en la estación base
  const baseWindSpeed = Math.round(current.wind_speed_10m || 0);
  const windDeg = current.wind_direction_10m !== undefined ? current.wind_direction_10m : 180;

  // Peligro de Aludes (Escala Europea EAWS)
  const avalanche = evaluateAvalancheRisk(snowAccumToday, baseWindSpeed, freezingLevel);

  // Gradiente térmico vertical (~0.65°C cada 100m)
  const lapseRate = 0.0065;

  // Procesar estado de cada una de las 4 estaciones de esquí
  const resortsData = ESTACIONES_ESQUI.map(resort => {
    // 1. COTA CUMBRE (TOP)
    const topTemp = (current.temperature_2m - (resort.topAlt - concejo.altitude) * lapseRate).toFixed(1);
    const topWind = Math.round(baseWindSpeed * 1.55);
    const topWindChill = calculateWindChill(topTemp, topWind);
    const topIsSnowing = (current.precipitation > 0 || parseFloat(snowAccumToday) > 0) && freezingLevel <= resort.topAlt + 80;
    const topQuality = evaluateSnowQuality(topTemp, topWind, topIsSnowing, freezingLevel, resort.topAlt);
    const liftSafety = evaluateLiftSafety(topWind);

    // 2. COTA MEDIA (MID)
    const midTemp = (current.temperature_2m - (resort.midAlt - concejo.altitude) * lapseRate).toFixed(1);
    const midWind = Math.round(baseWindSpeed * 1.25);
    const midWindChill = calculateWindChill(midTemp, midWind);
    const midIsSnowing = (current.precipitation > 0 || parseFloat(snowAccumToday) > 0) && freezingLevel <= resort.midAlt + 80;
    const midQuality = evaluateSnowQuality(midTemp, midWind, midIsSnowing, freezingLevel, resort.midAlt);

    // 3. COTA BASE (BOTTOM)
    const baseTemp = (current.temperature_2m - (resort.baseAlt - concejo.altitude) * lapseRate).toFixed(1);
    const baseWind = Math.round(baseWindSpeed * 1.0);
    const baseWindChill = calculateWindChill(baseTemp, baseWind);
    const baseIsSnowing = (current.precipitation > 0 || parseFloat(snowAccumToday) > 0) && freezingLevel <= resort.baseAlt + 50;
    const basePrecipType = baseIsSnowing ? '❄️ Nieve' : (current.precipitation > 0 ? '🌧️ Lluvia en Base' : 'Sin Precip.');

    // Nieve prevista para esta estación hoy
    const resortSnowToday = freezingLevel <= resort.topAlt ? snowAccumToday : '0.0';

    return {
      ...resort,
      top: {
        alt: resort.topAlt,
        name: resort.summitName,
        temp: topTemp,
        windChill: topWindChill,
        windSpd: topWind,
        quality: topQuality,
        isSnowing: topIsSnowing
      },
      mid: {
        alt: resort.midAlt,
        temp: midTemp,
        windChill: midWindChill,
        windSpd: midWind,
        quality: midQuality,
        isSnowing: midIsSnowing
      },
      base: {
        alt: resort.baseAlt,
        temp: baseTemp,
        windChill: baseWindChill,
        windSpd: baseWind,
        precipType: basePrecipType,
        isSnowing: baseIsSnowing
      },
      liftSafety,
      snowToday: resortSnowToday
    };
  });

  // Procesar puertos de montaña clasificados (Arterias principales y red general)
  const passesWithStatus = PUERTOS_MONTANA_ASTURIAS.map(p => {
    const statusObj = evaluatePassStatus(p.alt, freezingLevel, snowAccumToday, current.precipitation);
    return {
      ...p,
      ...statusObj
    };
  });

  // Clasificación de puertos por sectores geográficos naturales de Asturias
  const arteryPasses = passesWithStatus.filter(p => p.sector === 'arterias');
  const centroPasses = passesWithStatus.filter(p => p.sector === 'centro');
  const orientePasses = passesWithStatus.filter(p => p.sector === 'oriente');
  const occidentePasses = passesWithStatus.filter(p => p.sector === 'occidente');

  return `
    <div class="mountain-card">
      <div class="section-title-wrap">
        <div>
          <h3 class="section-heading">🏔️ Cordillera Cantábrica, Esquí & Puertos</h3>
          <span class="section-subtitle">Estándar Snow-Forecast para Esquí • Estado de Puertos y Cota de Nieve en Asturias</span>
        </div>
        <div class="altitude-pill">
          Altitud ${concejo.name}: <strong>${concejo.altitude} m</strong>
        </div>
      </div>

      <!-- 1. BARRA UNIFICADA DE SENSORES DE ALTA MONTAÑA (2 PISOS ANTI-COLISIÓN) -->
      <div class="mountain-top-unified-bar">
        <!-- Piso 1: Cota de Nieve y Nieve 3 Días (50% cada una con divisor vertical) -->
        <div class="m-top-split-row">
          <div class="m-top-col">
            <span class="m-top-label">🏔️ Cota Nieve 0°C</span>
            <div class="m-top-val">${freezingLevel} <span class="unit">m</span></div>
            <span class="m-top-sub">${concejo.altitude >= freezingLevel ? '❄️ En tu cota' : 'Por encima'}</span>
          </div>

          <div class="m-top-v-divider"></div>

          <div class="m-top-col">
            <span class="m-top-label">❄️ Nieve (3 Días)</span>
            <div class="m-top-val highlight">${totalSnow3Days} <span class="unit">cm</span></div>
            <span class="m-top-sub">Hoy: <strong>${snowAccumToday} cm</strong></span>
          </div>
        </div>

        <div class="m-top-h-divider"></div>

        <!-- Piso 2: Peligro de Aludes a todo lo ancho -->
        <div class="m-top-avalanche-row">
          <div class="m-avalanche-info">
            <span class="m-avalanche-title">⚠️ Peligro Aludes (EAWS):</span>
            <span class="m-avalanche-badge" style="color: ${avalanche.color};">
              ${avalanche.icon} <strong>Nivel ${avalanche.level} (${avalanche.name})</strong>
            </span>
          </div>
          <button class="btn-explain-sensor-compact" data-explain="ski_mountain" title="Escala europea de riesgo de aludes y guía didáctica">
            💡 Explícame
          </button>
        </div>
      </div>

      <!-- 2. SERVICIOS EN RUTA Y VIALIDAD INVERNAL (DIFERENCIADO DE SENSORES DE COTA/ALUDES) -->
      <div class="mountain-operational-section">
        <div class="mountain-operational-header">
          <div class="m-op-title-row">
            <span class="m-op-badge">🎿🚗 Servicios en Ruta</span>
            <span class="m-op-sub">Selecciona el módulo de previsión que deseas consultar:</span>
          </div>
        </div>

        <!-- INTERRUPTOR DESLIZANTE SEGMENTADO TÁCTIL (ETIQUETAS CORTAS DE 1 PALABRA) -->
        <div class="mountain-toggle-container">
          <div class="mountain-sliding-segmented-switch" id="mountain-segmented-switch" data-active="ski">
            <div class="mountain-switch-glider"></div>
            <button class="mountain-switch-option active" data-mountain-tab="ski" id="btn-mountain-tab-ski" aria-label="Ver previsión de esquí estilo Snow-Forecast">
              <span class="mountain-switch-icon">⛷️</span>
              <span class="mountain-switch-label">Esquí</span>
            </button>
            <button class="mountain-switch-option" data-mountain-tab="passes" id="btn-mountain-tab-passes" aria-label="Ver estado de puertos de montaña y conexiones a la meseta">
              <span class="mountain-switch-icon">🚗</span>
              <span class="mountain-switch-label">Puertos</span>
            </button>
          </div>
        </div>
      </div>

      <!-- VISTA A: ⛷️ ESTACIONES DE ESQUÍ (ESTÁNDAR SNOW-FORECAST COMPACTO) -->
      <div id="mountain-ski-view" class="mountain-tab-content active">
        <!-- Selector de Estaciones en Cuadrícula 2x2 Táctil -->
        <div class="resorts-selector-bar">
          <div class="resorts-pills-grid">
            ${resortsData.map((r, i) => `
              <button class="resort-select-pill ${i === 0 ? 'active' : ''}" data-resort-id="${r.id}">
                <span class="pill-icon">⛷️</span>
                <span class="pill-name">${r.shortName}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Paneles de Previsión Desglosada por Estación -->
        <div class="resorts-cards-container">
          ${resortsData.map((r, i) => `
            <div class="resort-forecast-card ${i === 0 ? 'active' : ''}" id="resort-panel-${r.id}" style="${i === 0 ? 'display: flex;' : 'display: none;'}">
              <!-- Encabezado de la Estación -->
              <div class="resort-card-header">
                <div class="resort-header-title">
                  <h4 class="resort-name-main">⛷️ ${r.name}</h4>
                  <span class="resort-sub">${r.concejo} • ${r.pistasKm} (${r.pistasCount} pistas, ${r.remontesCount} remontes)</span>
                </div>
                <!-- Semáforo de Remontes por Viento en Cumbre -->
                <div class="lift-status-pill" style="background: ${r.liftSafety.bg}; color: ${r.liftSafety.color}; border: 1px solid ${r.liftSafety.color}66;">
                  ${r.liftSafety.icon} ${r.liftSafety.status}
                </div>
              </div>

              <!-- LAS 3 COTAS ALTITUDINALES (ESTILO SNOW-FORECAST EN TIRAS DE 2 LÍNEAS) -->
              <div class="ski-levels-list">
                <!-- 1. CUMBRE -->
                <div class="ski-level-strip top-strip">
                  <div class="ski-strip-header">
                    <span class="cota-badge top-badge">🏔️ CUMBRE (${r.top.alt}m)</span>
                    <span class="cota-peak-name">${r.top.name}</span>
                  </div>
                  <div class="ski-strip-metrics">
                    <span class="cota-temp-val">${r.top.temp}°C</span>
                    <span class="cota-chill-pill" title="Sensación térmica con viento">🥶 Siente ${r.top.windChill}°C</span>
                    <span class="cota-wind-val">${getMountainWindArrowSvg(windDeg, '#38bdf8', 12)} ${r.top.windSpd} km/h</span>
                    <span class="cota-quality-pill" style="color: ${r.top.quality.color};">${r.top.quality.icon} ${r.top.quality.label}</span>
                  </div>
                </div>

                <!-- 2. MEDIA ESTACIÓN -->
                <div class="ski-level-strip mid-strip">
                  <div class="ski-strip-header">
                    <span class="cota-badge mid-badge">🚠 MEDIA ESTACIÓN (${r.mid.alt}m)</span>
                    <span class="cota-peak-name">Zona Central</span>
                  </div>
                  <div class="ski-strip-metrics">
                    <span class="cota-temp-val">${r.mid.temp}°C</span>
                    <span class="cota-chill-pill" title="Sensación térmica con viento">🥶 Siente ${r.mid.windChill}°C</span>
                    <span class="cota-wind-val">${getMountainWindArrowSvg(windDeg, '#38bdf8', 12)} ${r.mid.windSpd} km/h</span>
                    <span class="cota-quality-pill" style="color: ${r.mid.quality.color};">${r.mid.quality.icon} ${r.mid.quality.label}</span>
                  </div>
                </div>

                <!-- 3. BASE -->
                <div class="ski-level-strip bot-strip">
                  <div class="ski-strip-header">
                    <span class="cota-badge bot-badge">🎿 BASE / PARKING (${r.base.alt}m)</span>
                    <span class="cota-peak-name">Taquillas</span>
                  </div>
                  <div class="ski-strip-metrics">
                    <span class="cota-temp-val">${r.base.temp}°C</span>
                    <span class="cota-chill-pill" title="Sensación térmica">🥶 Siente ${r.base.windChill}°C</span>
                    <span class="cota-wind-val">${getMountainWindArrowSvg(windDeg, '#38bdf8', 12)} ${r.base.windSpd} km/h</span>
                    <span class="cota-quality-pill" style="color: #38bdf8;">${r.base.precipType}</span>
                  </div>
                </div>
              </div>

              <!-- PREVISIÓN DE NIEVE FRESCA A 3 DÍAS (CUADRÍCULA 2X2 ANTI-DESBORDE) -->
              <div class="ski-resort-snowfall-row">
                <div class="snowfall-pills-grid">
                  <div class="snow-day-pill">
                    <span class="snow-day-label">📅 Hoy</span>
                    <span class="snow-day-val">${snowAccumToday} cm</span>
                  </div>
                  <div class="snow-day-pill">
                    <span class="snow-day-label">📅 Mañana</span>
                    <span class="snow-day-val">${snowAccumTomorrow} cm</span>
                  </div>
                  <div class="snow-day-pill">
                    <span class="snow-day-label">📅 Pasado</span>
                    <span class="snow-day-val">${snowAccumDay3} cm</span>
                  </div>
                  <div class="snow-day-pill total-pill">
                    <span class="snow-day-label">❄️ Total 3 Días</span>
                    <span class="snow-day-val highlight">${totalSnow3Days} cm</span>
                  </div>
                </div>
              </div>

              <!-- Enlace Oficial a Webcams y Partes de Nieve -->
              <div class="resort-web-link-row">
                <a href="${r.web}" target="_blank" rel="noopener noreferrer" class="btn-resort-link">
                  📷 Webcams y Parte Oficial de ${r.shortName} ↗
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- VISTA B: 🚗 RED INTEGRAL DE PUERTOS Y ACCESOS A LA MESETA -->
      <div id="mountain-passes-view" class="mountain-tab-content" style="display: none;">
        <!-- ARTERIAS PRINCIPALES DE CONEXIÓN CON LA MESETA -->
        <div class="passes-group-block">
          <div class="passes-group-title">
            <span>🛣️ Arterias Principales hacia la Meseta (Asturias - León)</span>
            <span class="passes-group-sub">Vías neurálgicas de alta capacidad y comunicación nacional</span>
          </div>

          <div class="passes-arteries-grid">
            ${arteryPasses.map(p => `
              <div class="pass-artery-card ${p.statusClass}" style="border: 1px solid ${p.border}; background: ${p.badgeBg};">
                <div class="pass-artery-top">
                  <div>
                    <h5 class="pass-artery-name">${p.name}</h5>
                    <span class="pass-artery-meta">${p.road} • Altitud: <strong>${p.alt} m</strong> • ${p.concejo}</span>
                  </div>
                  <div class="pass-badge" style="background: ${p.color}22; color: ${p.color}; border: 1px solid ${p.color}88;">
                    ${p.icon} ${p.status}
                  </div>
                </div>
                <p class="pass-artery-desc">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTOR CENTRO Y VALLES MINEROS -->
        <div class="passes-sector-block">
          <div class="passes-sector-header">
            <span class="passes-sector-title">📍 Sector Centro y Valles Mineros (Caudal, Aller, Quirós, Riosa)</span>
            <span class="passes-sector-count">${centroPasses.length} pasos</span>
          </div>
          <div class="passes-grid">
            ${centroPasses.map(p => `
              <div class="pass-card ${p.statusClass}" style="border-left: 3px solid ${p.color};">
                <div class="pass-main">
                  <span class="pass-name">${p.name}</span>
                  <span class="pass-alt"><strong>${p.road}</strong> • ${p.alt} m • ${p.concejo}</span>
                </div>
                <div class="pass-badge" style="color: ${p.color};">
                  <span>${p.icon} ${p.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTOR ORIENTE Y PICOS DE EUROPA -->
        <div class="passes-sector-block">
          <div class="passes-sector-header">
            <span class="passes-sector-title">🏔️ Sector Oriente y Picos de Europa (Caso, Ponga, Cangas de Onís)</span>
            <span class="passes-sector-count">${orientePasses.length} pasos</span>
          </div>
          <div class="passes-grid">
            ${orientePasses.map(p => `
              <div class="pass-card ${p.statusClass}" style="border-left: 3px solid ${p.color};">
                <div class="pass-main">
                  <span class="pass-name">${p.name}</span>
                  <span class="pass-alt"><strong>${p.road}</strong> • ${p.alt} m • ${p.concejo}</span>
                </div>
                <div class="pass-badge" style="color: ${p.color};">
                  <span>${p.icon} ${p.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTOR OCCIDENTE -->
        <div class="passes-sector-block">
          <div class="passes-sector-header">
            <span class="passes-sector-title">🌲 Sector Occidente (Somiedo, Narcea, Allande, Ibias)</span>
            <span class="passes-sector-count">${occidentePasses.length} pasos</span>
          </div>
          <div class="passes-grid">
            ${occidentePasses.map(p => `
              <div class="pass-card ${p.statusClass}" style="border-left: 3px solid ${p.color};">
                <div class="pass-main">
                  <span class="pass-name">${p.name}</span>
                  <span class="pass-alt"><strong>${p.road}</strong> • ${p.alt} m • ${p.concejo}</span>
                </div>
                <div class="pass-badge" style="color: ${p.color};">
                  <span>${p.icon} ${p.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}