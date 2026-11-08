/**
 * Módulo de Astronomía y Eventos Celestiales con Semáforo de Visibilidad en Asturias
 * Desarrollado por Manuel A. L. Barril y Princesa
 */

// Catálogo de eventos astronómicos destacados (2026 - 2027)
// Catálogo de eventos astronómicos destacados (2026 - 2027)
export const ASTRONOMICAL_EVENTS = [
  // --- 2026 ---
  {
    id: 'superluna-sept-2026',
    title: 'Superluna de la Cosecha',
    type: 'supermoon',
    typeLabel: '🌕 Superluna',
    dateStart: '2026-09-25T18:00:00',
    datePeak: '2026-09-26T02:45:00',
    dateEnd: '2026-09-26T08:00:00',
    displayDate: '25 - 26 de Septiembre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'La Luna estará en su perigeo (punto más cercano a la Tierra), viéndose hasta un 14% más grande y un 30% más brillante.',
    asturiasTip: 'Impresionante vista sobre la línea de costa del Cantábrico y reflectando en las playas asturianas al anochecer.',
    equipment: '👁️ A simple vista / 🔭 Prismáticos',
    icon: '🌕'
  },
  {
    id: 'aurora-boreal-espana',
    title: 'Pico Solar y Posibles Auroras Boreales',
    type: 'aurora',
    typeLabel: '🌌 Actividad Geomagnética',
    dateStart: '2026-09-01T00:00:00',
    datePeak: '2026-10-15T00:00:00',
    dateEnd: '2026-11-30T23:59:59',
    displayDate: 'Otoño 2026 (Pico Ciclo Solar 25)',
    visibility: 'spain',
    visibilityLabel: 'Visible en España / Cantábrico (Kp > 7)',
    visibilityDesc: 'El ciclo solar 25 alcanza su máximo. En tormentas geomagnéticas severas (Kp 7-9), las auroras descienden al litoral cantábrico.',
    asturiasTip: 'Mirar hacia el horizonte norte en la costa o cumbres asturianas sin luces de ciudades en noches de alerta geomagnética.',
    equipment: '👁️ A simple vista / 📷 Cámara en exposición nocturna',
    icon: '🌌'
  },
  {
    id: 'orionidas-2026',
    title: 'Lluvia de Meteoros Oriónidas',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2026-10-20T23:00:00',
    datePeak: '2026-10-21T03:00:00',
    dateEnd: '2026-10-22T06:00:00',
    displayDate: '20 - 22 de Octubre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Restos procedentes del célebre Cometa Halley. Hasta 25 meteoros por hora a gran velocidad.',
    asturiasTip: 'Mirar en dirección a la constelación de Orión hacia el sureste a partir de la medianoche.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'conruncion-jupiter-saturno-2026',
    title: 'Gran Acercamiento de Júpiter y Venus',
    type: 'conjunction',
    typeLabel: '🪐 Conjunción Planetaria',
    dateStart: '2026-11-15T18:30:00',
    datePeak: '2026-11-16T19:15:00',
    dateEnd: '2026-11-17T20:30:00',
    displayDate: '15 - 17 de Noviembre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Los dos planetas más brillantes del cielo nocturno se apreciarán casi juntos como un doble faro al atardecer.',
    asturiasTip: 'Mirar hacia el suroeste durante la hora posterior a la puesta de sol.',
    equipment: '👁️ A simple vista / 🔭 Telescopio (anillos y lunas galileanas)',
    icon: '🪐'
  },
  {
    id: 'geminidas-2026',
    title: 'Lluvia de Meteoros Gemínidas',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2026-12-13T21:00:00',
    datePeak: '2026-12-14T02:00:00',
    dateEnd: '2026-12-14T06:30:00',
    displayDate: '13 - 14 de Diciembre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'La lluvia más activa y prolífica de todo el año, con más de 120 meteoros multicolor por hora.',
    asturiasTip: 'Imprescindible abrigo térmico y buscar puertos de montaña por encima del mar de nubes invernal.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },
  // --- 2027 ---
  {
    id: 'cuadrantidas-2027',
    title: 'Lluvia de Meteoros Cuadrántidas',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2027-01-03T22:00:00',
    datePeak: '2027-01-04T03:30:00',
    dateEnd: '2027-01-04T07:00:00',
    displayDate: '3 - 4 de Enero de 2027',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Primera gran lluvia del año. Pico muy concentrado de meteoros brillantes y bólidos de fuego con hasta 110 trazas por hora.',
    asturiasTip: 'Observación óptima en las horas previas al amanecer mirando hacia el norte/noreste en zonas libres de bruma.',
    equipment: '👁️ A simple vista (ropa de abrigo extremo)',
    icon: '❄️'
  },
  {
    id: 'eclipse-anular-2027-sur',
    title: 'Eclipse Solar Anular (Anillo de Fuego)',
    type: 'eclipse',
    typeLabel: '⭕ Eclipse Anular',
    dateStart: '2027-02-06T14:00:00',
    datePeak: '2027-02-06T16:00:00',
    dateEnd: '2027-02-06T18:00:00',
    displayDate: '6 de Febrero de 2027',
    visibility: 'global',
    visibilityLabel: 'Hemisferio Sur (No visible en Asturias)',
    visibilityDesc: 'Espectacular eclipse anular donde la Luna no cubre por completo al Sol, formando un anillo brillante. Visible en Sudamérica y la Antártida.',
    asturiasTip: 'No visible geográficamente desde Asturias ni la Península Ibérica. Seguimiento recomendado por retransmisión astronómica online.',
    equipment: '📡 Retransmisión web oficial',
    icon: '⭕'
  },
  {
    id: 'liridas-2027',
    title: 'Lluvia de Meteoros Líridas',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2027-04-21T22:00:00',
    datePeak: '2027-04-22T04:00:00',
    dateEnd: '2027-04-23T06:00:00',
    displayDate: '21 - 23 de Abril de 2027',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Partículas de polvo del cometa Thatcher. Famosas por sus trenes de polvo persistentes que brillan varios segundos.',
    asturiasTip: 'Buscar cielos despejados de primavera en valles interiores o zonas altas costeras orientadas al este.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },
  {
    id: 'eclipse-total-espana-2027',
    title: 'Gran Eclipse Solar del 2 de Agosto de 2027',
    type: 'eclipse',
    typeLabel: '🌑 Eclipse Solar Histórico',
    dateStart: '2027-08-02T09:30:00',
    datePeak: '2027-08-02T10:45:00',
    dateEnd: '2027-08-02T12:00:00',
    displayDate: '2 de Agosto de 2027 (Mañana)',
    visibility: 'spain',
    visibilityLabel: 'Visible en España (Gran Parcial en Asturias ~85%)',
    visibilityDesc: '¡Uno de los mayores eclipses solares de Europa! En el sur de España la totalidad supera los 4 minutos y medio. En Asturias se apreciará un oscurecimiento superior al 84% del disco solar.',
    asturiasTip: 'El sol quedará reducido a una finísima medialuna a media mañana. Notable bajada de temperatura y cambio de tono ambiental.',
    equipment: '🕶️ Gafas especiales homologadas con filtro solar ISO 12312-2',
    icon: '☀️'
  },
  {
    id: 'perseidas-2027',
    title: 'Lluvia de Estrellas Perseidas 2027',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2027-08-11T22:00:00',
    datePeak: '2027-08-12T23:30:00',
    dateEnd: '2027-08-13T05:30:00',
    displayDate: '11 - 13 de Agosto de 2027',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Las Lágrimas de San Lorenzo de 2027 se presentan con excelentes condiciones lunares (creciente temprana), permitiendo ver hasta 100 meteoros/hora.',
    asturiasTip: 'Cumbres de la Cordillera Cantábrica (Somiedo, Pajares, Picos de Europa) y cabos costeros oscuros (Cabo Vidio, Peñas).',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },
  {
    id: 'superluna-sept-2027',
    title: 'Superluna Llena de Otoño 2027',
    type: 'supermoon',
    typeLabel: '🌕 Superluna',
    dateStart: '2027-09-15T19:00:00',
    datePeak: '2027-09-16T03:15:00',
    dateEnd: '2027-09-16T08:00:00',
    displayDate: '15 - 16 de Septiembre de 2027',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Perigeo lunar de máximo acercamiento del año 2027, generando mareas vivas extremas (mareonas) en las rías asturianas.',
    asturiasTip: 'Salida de la Luna sobre el mar Cantábrico visible desde paseos marítimos y acantilados al atardecer.',
    equipment: '👁️ A simple vista / 🔭 Prismáticos',
    icon: '🌕'
  },
  {
    id: 'geminidas-2027',
    title: 'Lluvia de Meteoros Gemínidas 2027',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2027-12-13T21:00:00',
    datePeak: '2027-12-14T02:30:00',
    dateEnd: '2027-12-14T06:30:00',
    displayDate: '13 - 14 de Diciembre de 2027',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Cierre del calendario astronómico con el mayor espectáculo invernal del cielo: meteoros lentos, brillantes y coloridos.',
    asturiasTip: 'Buscar zonas altas por encima de la niebla de los valles centrales asturianos.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  }
];

/**
 * Calcula la fase lunar actual aproximada
 */
export function getMoonPhaseDetails(date = new Date()) {
  const LUNAR_MONTH = 29.53058867;
  // Luna nueva de referencia conocida: 11 Enero 2024 a las 11:57 UTC
  const refNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57, 0));
  const diffDays = (date.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const moonAge = (diffDays % LUNAR_MONTH + LUNAR_MONTH) % LUNAR_MONTH;
  const phaseNormalized = moonAge / LUNAR_MONTH;

  // Iluminación estimada
  const illumination = Math.round((1 - Math.cos(2 * Math.PI * phaseNormalized)) / 2 * 100);

  let phaseName = 'Luna Nueva';
  let icon = '🌑';
  let desc = 'La Luna se encuentra entre la Tierra y el Sol; disco no iluminado.';

  if (phaseNormalized < 0.03 || phaseNormalized > 0.97) {
    phaseName = 'Luna Nueva';
    icon = '🌑';
    desc = 'Cielos oscuros ideales para observación de cielo profundo y estrellas.';
  } else if (phaseNormalized < 0.22) {
    phaseName = 'Luna Creciente';
    icon = '🌒';
    desc = 'Fina franja visible al anochecer hacia el oeste.';
  } else if (phaseNormalized < 0.28) {
    phaseName = 'Cuarto Creciente';
    icon = '🌓';
    desc = 'Iluminada exactamente la mitad derecha del disco lunar.';
  } else if (phaseNormalized < 0.47) {
    phaseName = 'Gibosa Creciente';
    icon = '🌔';
    desc = 'Gran brillo lunar en la primera mitad de la noche.';
  } else if (phaseNormalized < 0.53) {
    phaseName = 'Luna Llena';
    icon = '🌕';
    desc = 'Disco lunar 100% iluminado visible durante toda la noche.';
  } else if (phaseNormalized < 0.72) {
    phaseName = 'Gibosa Menguante';
    icon = '🌖';
    desc = 'Comienza a decrecer la luz lunar, visible tras la medianoche.';
  } else if (phaseNormalized < 0.78) {
    phaseName = 'Cuarto Menguante';
    icon = '🌗';
    desc = 'Iluminada la mitad izquierda del disco en las horas matutinas.';
  } else {
    phaseName = 'Luna Menguante';
    icon = '🌘';
    desc = 'Último arco visible antes del amanecer.';
  }

  const daysToFullMoon = Math.round((0.5 - phaseNormalized + (phaseNormalized > 0.5 ? 1 : 0)) * LUNAR_MONTH);

  return {
    phaseName,
    icon,
    desc,
    illumination,
    moonAge: moonAge.toFixed(1),
    daysToFullMoon
  };
}

let cachedWeatherData = null;
let cachedConcejo = null;

/**
 * Calcula los tramos exactos de Hora Dorada y Hora Azul para el día y concejo activo
 */
export function getGoldenAndBlueHours(weatherData, concejo) {
  let sunriseDate = null;
  let sunsetDate = null;

  if (weatherData && weatherData.weather && weatherData.weather.daily) {
    const daily = weatherData.weather.daily;
    if (daily.sunrise && daily.sunrise[0]) {
      sunriseDate = new Date(daily.sunrise[0]);
    }
    if (daily.sunset && daily.sunset[0]) {
      sunsetDate = new Date(daily.sunset[0]);
    }
  }

  // Estimación astronómica por defecto si no hay API cargada
  if (!sunriseDate || isNaN(sunriseDate.getTime()) || !sunsetDate || isNaN(sunsetDate.getTime())) {
    const today = new Date();
    sunriseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 25);
    sunsetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 15);
  }

  // Cálculos de intervalos de luz en minutos
  // Amanecer:
  // Hora Azul: 35 min antes del orto hasta 10 min antes del orto
  const blueMorningStart = new Date(sunriseDate.getTime() - 35 * 60 * 1000);
  const blueMorningEnd = new Date(sunriseDate.getTime() - 10 * 60 * 1000);

  // Hora Dorada matutina: desde el orto hasta 45 min después
  const goldenMorningStart = new Date(sunriseDate.getTime());
  const goldenMorningEnd = new Date(sunriseDate.getTime() + 45 * 60 * 1000);

  // Atardecer:
  // Hora Dorada vespertina: 45 min antes del ocaso hasta el ocaso
  const goldenEveningStart = new Date(sunsetDate.getTime() - 45 * 60 * 1000);
  const goldenEveningEnd = new Date(sunsetDate.getTime());

  // Hora Azul vespertina: 10 min después del ocaso hasta 35 min después
  const blueEveningStart = new Date(sunsetDate.getTime() + 10 * 60 * 1000);
  const blueEveningEnd = new Date(sunsetDate.getTime() + 35 * 60 * 1000);

  const formatH = (d) => {
    return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  // Calidad fotográfica del atardecer según nubosidad prevista
  let cloudCoverSunset = null;
  if (weatherData && weatherData.weather && weatherData.weather.hourly && weatherData.weather.hourly.time) {
    const sunsetHour = sunsetDate.getHours();
    const times = weatherData.weather.hourly.time;
    for (let i = 0; i < times.length; i++) {
      const t = new Date(times[i]);
      if (t.getDate() === sunsetDate.getDate() && t.getHours() === sunsetHour) {
        if (weatherData.weather.hourly.cloud_cover && weatherData.weather.hourly.cloud_cover[i] != null) {
          cloudCoverSunset = weatherData.weather.hourly.cloud_cover[i];
        }
        break;
      }
    }
  }

  let photoQuality = {
    badge: '🟢 Visibilidad Óptima',
    badgeClass: 'photo-optimo',
    desc: 'Cielos diáfanos: luz pura y horizonte nítido sobre la costa y cumbres.'
  };

  if (cloudCoverSunset !== null) {
    if (cloudCoverSunset > 75) {
      photoQuality = {
        badge: '⚪ Luz Plana y Difusa',
        badgeClass: 'photo-cubierto',
        desc: `Cielo cubierto (${cloudCoverSunset}% de nubes): sol oculto tras el manto gris.`
      };
    } else if (cloudCoverSunset > 30) {
      photoQuality = {
        badge: '🟡 Luz Dramática',
        badgeClass: 'photo-nubes',
        desc: `Nubes y claros (${cloudCoverSunset}%): contrastes vivos y rayos crepusculares.`
      };
    } else {
      photoQuality = {
        badge: '🟢 Luz Óptima',
        badgeClass: 'photo-optimo',
        desc: `Cielos despejados (${cloudCoverSunset}%): horizonte nítido y sombras suaves.`
      };
    }
  }

  return {
    concejoName: concejo ? concejo.name : 'Asturias',
    morning: {
      blue: `${formatH(blueMorningStart)} - ${formatH(blueMorningEnd)}`,
      golden: `${formatH(goldenMorningStart)} - ${formatH(goldenMorningEnd)}`
    },
    evening: {
      golden: `${formatH(goldenEveningStart)} - ${formatH(goldenEveningEnd)}`,
      blue: `${formatH(blueEveningStart)} - ${formatH(blueEveningEnd)}`
    },
    sunriseStr: formatH(sunriseDate),
    sunsetStr: formatH(sunsetDate),
    photoQuality
  };
}

/**
 * Calcula la calidad real del cielo nocturno ESTA NOCHE (22:00 a 04:00 h) cruzando
 * la nubosidad horaria prevista en el concejo con la iluminación lunar.
 */
export function getTonightStargazingIndex(weatherData, moon, concejo) {
  const cleanConcejo = (concejo?.name || 'Asturias').replace(/\s*\(.*?\)/, '').trim();
  const hourly = weatherData?.weather?.hourly || null;

  let avgCloudPct = 25;
  let minCloudPct = 20;
  let bestHourStr = '00:00';
  let rainTonight = 0;

  if (hourly && hourly.time && hourly.cloud_cover) {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const tom = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const tomStr = `${tom.getFullYear()}-${String(tom.getMonth() + 1).padStart(2, '0')}-${String(tom.getDate()).padStart(2, '0')}`;

    const targetPrefixes = [
      `${todayStr}T22`, `${todayStr}T23`,
      `${tomStr}T00`, `${tomStr}T01`, `${tomStr}T02`, `${tomStr}T03`, `${tomStr}T04`
    ];

    let sumCloud = 0;
    let count = 0;
    minCloudPct = 100;

    for (let i = 0; i < hourly.time.length; i++) {
      const t = hourly.time[i];
      if (targetPrefixes.some(pref => t.startsWith(pref))) {
        const c = hourly.cloud_cover[i] ?? 50;
        const p = hourly.precipitation ? (hourly.precipitation[i] || 0) : 0;
        sumCloud += c;
        rainTonight += p;
        count++;
        if (c < minCloudPct) {
          minCloudPct = c;
          bestHourStr = t.split('T')[1]?.substring(0, 5) || '00:00';
        }
      }
    }

    if (count > 0) {
      avgCloudPct = Math.round(sumCloud / count);
    } else {
      minCloudPct = 25;
    }
  }

  const moonIllum = moon?.illumination ?? 50;

  if (rainTonight >= 0.3 || avgCloudPct >= 75) {
    return {
      icon: '☁️',
      badge: '🔴 Cielo Cubierto',
      color: '#ef4444',
      verdict: `Manto nuboso en ${cleanConcejo} (${avgCloudPct}% nubes)`,
      desc: `Noche tapada entre las 22:00 y las 04:00 h${rainTonight >= 0.3 ? ' con riesgo de lluvia u orbayu' : ''}. Condiciones desfavorables para ver estrellas hoy.`,
      avgCloudPct,
      bestWindow: `Mín. nubes: ${minCloudPct}% (${bestHourStr} h)`
    };
  }

  if (avgCloudPct >= 35) {
    return {
      icon: '⛅',
      badge: '🟡 Claros Nocturnos',
      color: '#f59e0b',
      verdict: `Nubes y claros en ${cleanConcejo} (${avgCloudPct}% nubes)`,
      desc: `Visibilidad intermitente esta noche. La mejor ventana de cielo más limpio se espera hacia las ${bestHourStr} h (${minCloudPct}% de nubosidad).`,
      avgCloudPct,
      bestWindow: `Mejor hora: ${bestHourStr} h (${minCloudPct}% nubes)`
    };
  }

  if (moonIllum >= 65) {
    return {
      icon: '🌕',
      badge: '🟢 Despejado • Luz Lunar',
      color: '#38bdf8',
      verdict: `Cielo raso con Luna brillante (${avgCloudPct}% nubes)`,
      desc: `Cielo despejado en ${cleanConcejo}. Noche ideal para observar la superficie lunar (${moonIllum}%), planetas y estrellas principales; el brillo lunar atenúa la Vía Láctea.`,
      avgCloudPct,
      bestWindow: `Óptimo: ${bestHourStr} h (${minCloudPct}% nubes)`
    };
  }

  return {
    icon: '🌌',
    badge: '🟢 Noche Estelar Óptima',
    color: '#10b981',
    verdict: `Cielo oscuro y despejado en ${cleanConcejo} (${avgCloudPct}% nubes)`,
    desc: `Condiciones sobresalientes esta noche: cielo limpio y baja contaminación lumínica lunar (${moonIllum}%). Excelente para observar la Vía Láctea y estrellas fugaces.`,
    avgCloudPct,
    bestWindow: `Óptimo: ${bestHourStr} h (${minCloudPct}% nubes)`
  };
}

/**
 * Renderiza el módulo completo de Astronomía
 */
export function renderAstronomyView(containerId, currentFilter = 'all', weatherData = null, concejo = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (weatherData) cachedWeatherData = weatherData;
  if (concejo) cachedConcejo = concejo;

  const targetWeatherData = weatherData || cachedWeatherData;
  const targetConcejo = concejo || cachedConcejo;

  const moon = getMoonPhaseDetails();
  const sunData = getGoldenAndBlueHours(targetWeatherData, targetConcejo);
  const stargazing = getTonightStargazingIndex(targetWeatherData, moon, targetConcejo);
  const now = new Date();

  // Filtrar exclusivamente los eventos activos o futuros (excluir fenómenos culminados en el pasado)
  const activeEvents = ASTRONOMICAL_EVENTS.filter(evt => {
    const endDate = new Date(evt.dateEnd || evt.datePeak);
    return endDate >= now;
  });

  // Filtrar eventos según la selección del semáforo
  const filteredEvents = activeEvents.filter(evt => {
    if (currentFilter === 'all') return true;
    return evt.visibility === currentFilter;
  });

  const countAll = activeEvents.length;
  const countAsturias = activeEvents.filter(e => e.visibility === 'asturias').length;
  const countSpain = activeEvents.filter(e => e.visibility === 'spain').length;
  const countGlobal = activeEvents.filter(e => e.visibility === 'global').length;

  const html = `
    <div class="astronomy-view-container">
      
      <!-- HERO CARD PRINCIPAL: ASTRONOMÍA & COSMOS (CON CARRUSEL DESLIZANTE NOCHE / DÍA) -->
      <div class="astronomy-hero-card">
        <div class="astronomy-hero-top">
          <div class="astronomy-hero-title">
            <span class="astronomy-hero-icon">🔭</span>
            <div>
              <h3>Astronomía & Cosmos</h3>
              <span class="astronomy-subtitle">Acontecimientos celestes y semáforo de visibilidad en Asturias (2026 - 2027)</span>
            </div>
          </div>
        </div>

        <!-- CARRUSEL DESLIZABLE COMPACTO: NOCHE & LUNA vs DÍA & HORA MÁGICA (LEY 18) -->
        <div class="cosmos-widgets-carousel-wrap">
          <div class="cosmos-widgets-carousel" id="cosmos-widgets-carousel">
            
            <!-- Slide 1: Cielo Nocturno & Luna -->
            <div class="cosmos-widget-slide">
              <div class="cosmos-subcard cosmos-night-card">
                <div class="cosmos-subcard-header">
                  <div class="cosmos-subcard-title">
                    <span class="subcard-icon">🌙</span>
                    <div>
                      <strong>Cielo Nocturno & Luna</strong>
                      <span class="subcard-subtitle">Fase actual y visibilidad de estrellas</span>
                    </div>
                  </div>
                  <div class="astronomy-moon-badge compact">
                    <span class="moon-icon-giant">${moon.icon}</span>
                    <div class="moon-badge-meta">
                      <strong>${moon.phaseName}</strong>
                      <span>${moon.illumination}% Ilum.</span>
                    </div>
                  </div>
                </div>

                <div class="astronomy-moon-details-grid">
                  <div class="moon-metric-pill">
                    <span class="metric-label">🌓 Edad Lunar</span>
                    <span class="metric-val">${moon.moonAge} días</span>
                  </div>
                  <div class="moon-metric-pill">
                    <span class="metric-label">🌕 Próxima Llena</span>
                    <span class="metric-val">${moon.daysToFullMoon === 0 ? '¡Hoy!' : 'En ' + moon.daysToFullMoon + 'd'}</span>
                  </div>
                </div>

                <!-- SEMÁFORO EN VIVO: CALIDAD DEL CIELO ESTA NOCHE (22:00 - 04:00 H) -->
                <div style="margin-top: 10px; background: rgba(15, 23, 42, 0.55); border: 1px solid ${stargazing.color}55; border-left: 4px solid ${stargazing.color}; border-radius: 12px; padding: 9px 11px; box-sizing: border-box;">
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; margin-bottom: 4px;">
                    <span style="font-size: 0.74rem; font-weight: 800; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.04em;">
                      ${stargazing.icon} Observación Esta Noche (22:00 - 04:00 h)
                    </span>
                    <span style="font-size: 0.70rem; font-weight: 800; padding: 2px 7px; border-radius: 999px; background: ${stargazing.color}22; color: ${stargazing.color}; border: 1px solid ${stargazing.color}66;">
                      ${stargazing.badge}
                    </span>
                  </div>
                  <div style="font-size: 0.84rem; font-weight: 800; color: #ffffff; margin-bottom: 2px;">
                    ${stargazing.verdict}
                  </div>
                  <p style="margin: 0; font-size: 0.76rem; color: #94a3b8; line-height: 1.35;">
                    ${stargazing.desc}
                  </p>
                  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px; padding-top: 5px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 0.70rem; color: #38bdf8; font-weight: 700;">
                    <span>☁️ Nubosidad: ${stargazing.avgCloudPct}%</span>
                    <span>•</span>
                    <span>⏱️ ${stargazing.bestWindow}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 2: Luz Natural & Hora Mágica -->
            <div class="cosmos-widget-slide">
              <div class="cosmos-subcard cosmos-sun-card">
                <div class="cosmos-subcard-header">
                  <div class="cosmos-subcard-title">
                    <span class="subcard-icon">📸</span>
                    <div>
                      <strong>Luz Natural & Hora Mágica</strong>
                      <span class="subcard-subtitle">Ventanas fotográficas hoy en ${sunData.concejoName ? sunData.concejoName.split('(')[0].trim() : 'Asturias'}</span>
                    </div>
                  </div>
                  <button class="btn-explain-sensor" data-explain="golden_hour" title="¿Qué son la Hora Dorada y la Hora Azul? Pulsa para aprender" aria-label="Explicación de la hora dorada y azul">💡</button>
                </div>

                <div class="sun-magic-sections">
                  <!-- Bloque Amanecer -->
                  <div class="sun-magic-group">
                    <div class="sun-magic-group-title">
                      <span>🌅 Amanecer • Orto ${sunData.sunriseStr}</span>
                    </div>
                    <div class="sun-magic-grid">
                      <div class="sun-pill sun-pill-blue">
                        <div class="sun-pill-header">
                          <span class="sun-pill-name">Hora Azul</span>
                          <span class="sun-pill-dot">🔵</span>
                        </div>
                        <span class="sun-pill-time">${sunData.morning.blue}</span>
                      </div>
                      <div class="sun-pill sun-pill-golden">
                        <div class="sun-pill-header">
                          <span class="sun-pill-name">Hora Dorada</span>
                          <span class="sun-pill-dot">🟡</span>
                        </div>
                        <span class="sun-pill-time">${sunData.morning.golden}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Bloque Atardecer -->
                  <div class="sun-magic-group">
                    <div class="sun-magic-group-title">
                      <span>🌇 Atardecer • Ocaso ${sunData.sunsetStr}</span>
                    </div>
                    <div class="sun-magic-grid">
                      <div class="sun-pill sun-pill-golden">
                        <div class="sun-pill-header">
                          <span class="sun-pill-name">Hora Dorada</span>
                          <span class="sun-pill-dot">🟡</span>
                        </div>
                        <span class="sun-pill-time">${sunData.evening.golden}</span>
                      </div>
                      <div class="sun-pill sun-pill-blue">
                        <div class="sun-pill-header">
                          <span class="sun-pill-name">Hora Azul</span>
                          <span class="sun-pill-dot">🔵</span>
                        </div>
                        <span class="sun-pill-time">${sunData.evening.blue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Semáforo de Calidad Fotográfica -->
                <div class="sun-magic-visibility-footer" style="margin-top: 6px; padding: 7px 10px;">
                  <span class="sun-magic-status-badge ${sunData.photoQuality.badgeClass}">${sunData.photoQuality.badge}</span>
                  <span class="sun-magic-status-text" style="font-size: 0.74rem;">${sunData.photoQuality.desc}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Paginador Interactivo de 2 Puntos (Ley 18) -->
          <div class="cosmos-widgets-dots" id="cosmos-widgets-dots">
            <span class="sensor-dot active" data-sensor-target="0" title="Ver Luna y Cielo Nocturno"></span>
            <span class="sensor-dot" data-sensor-target="1" title="Ver Luz Natural y Hora Mágica"></span>
          </div>
        </div>
      </div>

      <!-- CABECERA DE SECCIÓN: PRÓXIMOS ACONTECIMIENTOS -->
      <div class="astronomy-section-header">
        <div class="astronomy-section-title-wrap">
          <span class="astronomy-section-icon">🌌</span>
          <div>
            <h4 class="astronomy-section-title">Próximos Acontecimientos</h4>
            <span class="astronomy-section-subtitle">Efemérides celestes y calendario astronómico</span>
          </div>
        </div>
      </div>

      <!-- BARRA DE SEMÁFORO Y FILTROS -->
      <div class="astronomy-filter-bar">
        <div class="astronomy-filter-title">
          <span>🚦 Semáforo de Visibilidad:</span>
        </div>
        <div class="astronomy-filter-chips">
          <button class="astro-chip ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">
            🌟 Próximos (${countAll})
          </button>
          <button class="astro-chip chip-green ${currentFilter === 'asturias' ? 'active' : ''}" data-filter="asturias">
            🟢 Visible en Asturias (${countAsturias})
          </button>
          <button class="astro-chip chip-yellow ${currentFilter === 'spain' ? 'active' : ''}" data-filter="spain">
            🟡 España / Europa (${countSpain})
          </button>
          <button class="astro-chip chip-red ${currentFilter === 'global' ? 'active' : ''}" data-filter="global">
            🔴 Global / Lejano (${countGlobal})
          </button>
        </div>
      </div>

      <!-- LISTADO DE EVENTOS ASTRONÓMICOS EN ACORDEÓN -->
      <div class="astronomy-events-grid">
        ${filteredEvents.length === 0 ? `
          <div class="astro-empty-state" style="grid-column: 1 / -1; padding: 30px 20px; text-align: center; color: var(--text-dim);">
            <span style="font-size: 2rem; display: block; margin-bottom: 8px;">🌌</span>
            <p>No hay eventos próximos para el filtro seleccionado.</p>
          </div>
        ` : filteredEvents.map((evt, idx) => {
          const eventDate = new Date(evt.datePeak);
          const diffDays = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
          
          let countdownText = '';
          if (diffDays <= 0) {
            countdownText = '🔥 ¡Sucediendo Ahora!';
          } else if (diffDays === 1) {
            countdownText = '⏳ ¡Mañana!';
          } else {
            countdownText = `⏳ En ${diffDays} días`;
          }

          let semaforoClass = 'badge-green';
          let semaforoIcon = '🟢';
          if (evt.visibility === 'spain') {
            semaforoClass = 'badge-yellow';
            semaforoIcon = '🟡';
          } else if (evt.visibility === 'global') {
            semaforoClass = 'badge-red';
            semaforoIcon = '🔴';
          }

          // Opción A: Primer evento abierto por defecto para inmediatez, resto plegados
          const isOpen = idx === 0 ? 'open' : '';

          return `
            <details class="astro-event-card astro-accordion-card ${evt.visibility}" name="astro-accordion" ${isOpen}>
              <summary class="astro-accordion-header">
                <div class="astro-accordion-summary-content">
                  <div class="astro-event-header">
                    <div class="astro-event-type-row">
                      <span class="astro-type-pill">${evt.typeLabel}</span>
                      <span class="astro-countdown-pill ${diffDays <= 3 && diffDays >= 0 ? 'urgent' : ''}">${countdownText}</span>
                    </div>
                    <div class="astro-traffic-badge ${semaforoClass}">
                      <span>${semaforoIcon} ${evt.visibilityLabel}</span>
                    </div>
                  </div>

                  <div class="astro-accordion-title-row">
                    <div class="astro-accordion-name-col">
                      <h4 class="astro-event-title">${evt.icon} ${evt.title}</h4>
                      <div class="astro-event-date">📅 ${evt.displayDate}</div>
                    </div>
                    <span class="astro-accordion-chevron" aria-hidden="true">▾</span>
                  </div>
                </div>
              </summary>

              <div class="astro-accordion-body">
                <p class="astro-event-desc">${evt.visibilityDesc}</p>

                <div class="astro-event-tips-box">
                  <div class="astro-tip-item">
                    <strong>📍 Observación en Asturias:</strong> ${evt.asturiasTip}
                  </div>
                  <div class="astro-tip-item equipment">
                    <strong>🔭 Instrumento recomendado:</strong> ${evt.equipment}
                  </div>
                </div>
              </div>
            </details>
          `;
        }).join('')}
      </div>

      <!-- PIE INFORMATIVO DE ASTRONOMÍA -->
      <div class="astronomy-footer-info">
        <span>✨ Información y efemérides astronómicas calculadas para el cielo de Asturias • MeteoAstur Lode</span>
      </div>

    </div>
  `;

  container.innerHTML = html;

  // Inicializar carrusel y dots de astronomía (Ley 18)
  initCosmosCarousel();

  // Event Listeners para los filtros del semáforo
  container.querySelectorAll('.astro-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.currentTarget.dataset.filter;
      renderAstronomyView(containerId, filter, cachedWeatherData, cachedConcejo);
    });
  });
}

/**
 * Inicializador del Carrusel Deslizante de Astronomía (Ley 18)
 * Sincroniza el paginador de puntos y el desplazamiento horizontal fluido
 */
export function initCosmosCarousel() {
  const carousel = document.getElementById('cosmos-widgets-carousel');
  const dotsContainer = document.getElementById('cosmos-widgets-dots');
  if (!carousel || !dotsContainer || carousel.dataset.dotsBound === '1') return;
  carousel.dataset.dotsBound = '1';

  const dots = dotsContainer.querySelectorAll('.sensor-dot');
  const slides = carousel.querySelectorAll('.cosmos-widget-slide');
  if (!slides.length || !dots.length) return;

  const updateActiveDot = (idx) => {
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  };

  const findClosestSlideIndex = () => {
    const scrollLeft = carousel.scrollLeft;
    let closestIdx = 0;
    let minDiff = Infinity;
    slides.forEach((slide, i) => {
      const slidePos = slide.offsetLeft - carousel.offsetLeft;
      const diff = Math.abs(scrollLeft - slidePos);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });
    return closestIdx;
  };

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = parseInt(dot.getAttribute('data-sensor-target') || '0', 10);
      if (slides[targetIdx]) {
        const targetLeft = slides[targetIdx].offsetLeft - carousel.offsetLeft;
        carousel.scrollTo({ left: targetLeft, behavior: 'smooth' });
        updateActiveDot(targetIdx);
      }
    });
  });

  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      updateActiveDot(findClosestSlideIndex());
    }, 45);
  }, { passive: true });
}
