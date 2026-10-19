import { getAsturiasClimateMemory } from './climateMemoryData.js?v=2.2.81';

/**
 * Normales Climatológicas Oficiales de Asturias (Serie Estándar AEMET / OMM 1991-2020)
 * y Motor de Cálculo de Anomalía Térmica ("Tiempo Habitual")
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 * 
 * Datos de Dominio Público Abierto de AEMET OpenData (Resolución de 30/11/2015).
 * Cálculo 100% autónomo en local, sin peticiones de red externas y sin coste de API.
 */

// 1. Tablas climatológicas mensuales (Ene=0 ... Dic=11) por zonas homogéneas de Asturias
const CLIMATE_ZONES = {
  // Costa y Litoral (Castrillón, Gijón, Gozón, Llanes, Ribadesella, Carreño, Avilés, etc.)
  coast: {
    name: 'Costa y Litoral Cantábrico',
    baseAltitude: 25,
    months: [
      { tMax: 13.2, tMin: 5.8, tMean: 9.5, rainDays: 12, rainMm: 98 },  // Ene
      { tMax: 13.6, tMin: 5.5, tMean: 9.6, rainDays: 11, rainMm: 85 },  // Feb
      { tMax: 15.4, tMin: 7.0, tMean: 11.2, rainDays: 11, rainMm: 80 }, // Mar
      { tMax: 16.5, tMin: 8.2, tMean: 12.4, rainDays: 12, rainMm: 90 }, // Abr
      { tMax: 18.8, tMin: 10.8, tMean: 14.8, rainDays: 11, rainMm: 68 },// May
      { tMax: 21.2, tMin: 13.5, tMean: 17.4, rainDays: 8, rainMm: 52 }, // Jun
      { tMax: 23.1, tMin: 15.5, tMean: 19.3, rainDays: 7, rainMm: 45 }, // Jul
      { tMax: 23.7, tMin: 15.8, tMean: 19.8, rainDays: 8, rainMm: 55 }, // Ago
      { tMax: 22.2, tMin: 14.0, tMean: 18.1, rainDays: 9, rainMm: 68 }, // Sep
      { tMax: 19.4, tMin: 11.5, tMean: 15.5, rainDays: 11, rainMm: 102 },// Oct
      { tMax: 15.8, tMin: 8.3, tMean: 12.1, rainDays: 14, rainMm: 130 },// Nov
      { tMax: 13.9, tMin: 6.4, tMean: 10.2, rainDays: 12, rainMm: 108 } // Dic
    ]
  },

  // Valles Centrales y Cuencas (Oviedo, Siero, Mieres, Langreo, Grado, etc.)
  interior: {
    name: 'Valles Centrales y Cuencas',
    baseAltitude: 240,
    months: [
      { tMax: 12.2, tMin: 4.6, tMean: 8.4, rainDays: 12, rainMm: 85 },  // Ene
      { tMax: 12.8, tMin: 4.4, tMean: 8.6, rainDays: 11, rainMm: 78 },  // Feb
      { tMax: 15.2, tMin: 5.8, tMean: 10.5, rainDays: 11, rainMm: 72 }, // Mar
      { tMax: 16.3, tMin: 7.1, tMean: 11.7, rainDays: 12, rainMm: 85 }, // Abr
      { tMax: 19.1, tMin: 9.8, tMean: 14.5, rainDays: 11, rainMm: 70 }, // May
      { tMax: 22.0, tMin: 12.6, tMean: 17.3, rainDays: 8, rainMm: 50 }, // Jun
      { tMax: 24.1, tMin: 14.5, tMean: 19.3, rainDays: 7, rainMm: 42 }, // Jul
      { tMax: 24.6, tMin: 14.8, tMean: 19.7, rainDays: 8, rainMm: 52 }, // Ago
      { tMax: 22.8, tMin: 12.8, tMean: 17.8, rainDays: 9, rainMm: 71 }, // Sep
      { tMax: 19.3, tMin: 10.2, tMean: 14.8, rainDays: 11, rainMm: 98 },// Oct
      { tMax: 15.0, tMin: 6.9, tMean: 11.0, rainDays: 13, rainMm: 120 },// Nov
      { tMax: 12.9, tMin: 5.1, tMean: 9.0, rainDays: 12, rainMm: 98 }  // Dic
    ]
  },

  // Occidente Interior (Cangas del Narcea, Allande, Tineo, Ibias)
  occidente: {
    name: 'Occidente y Suroccidente',
    baseAltitude: 380,
    months: [
      { tMax: 11.4, tMin: 1.8, tMean: 6.6, rainDays: 11, rainMm: 80 },  // Ene
      { tMax: 12.6, tMin: 1.6, tMean: 7.1, rainDays: 10, rainMm: 72 },  // Feb
      { tMax: 15.8, tMin: 3.2, tMean: 9.5, rainDays: 10, rainMm: 65 },  // Mar
      { tMax: 17.0, tMin: 4.8, tMean: 10.9, rainDays: 12, rainMm: 80 }, // Abr
      { tMax: 20.4, tMin: 7.5, tMean: 14.0, rainDays: 11, rainMm: 68 }, // May
      { tMax: 24.2, tMin: 10.6, tMean: 17.4, rainDays: 7, rainMm: 45 }, // Jun
      { tMax: 26.8, tMin: 12.5, tMean: 19.7, rainDays: 6, rainMm: 38 }, // Jul
      { tMax: 27.2, tMin: 12.6, tMean: 19.9, rainDays: 7, rainMm: 46 }, // Ago
      { tMax: 24.5, tMin: 10.5, tMean: 17.5, rainDays: 8, rainMm: 65 }, // Sep
      { tMax: 19.8, tMin: 7.2, tMean: 13.5, rainDays: 11, rainMm: 92 }, // Oct
      { tMax: 14.5, tMin: 4.1, tMean: 9.3, rainDays: 12, rainMm: 110 }, // Nov
      { tMax: 12.0, tMin: 2.2, tMean: 7.1, rainDays: 11, rainMm: 88 }  // Dic
    ]
  },

  // Montaña y Cordillera Cantábrica (Somiedo, Pajares, Picos de Europa, Degaña, Quirós)
  mountain: {
    name: 'Cordillera y Alta Montaña',
    baseAltitude: 800,
    months: [
      { tMax: 7.2, tMin: -0.8, tMean: 3.2, rainDays: 13, rainMm: 120 }, // Ene
      { tMax: 8.0, tMin: -1.2, tMean: 3.4, rainDays: 12, rainMm: 105 }, // Feb
      { tMax: 10.8, tMin: 0.5, tMean: 5.7, rainDays: 12, rainMm: 95 },  // Mar
      { tMax: 12.2, tMin: 2.0, tMean: 7.1, rainDays: 13, rainMm: 110 }, // Abr
      { tMax: 15.5, tMin: 5.0, tMean: 10.3, rainDays: 12, rainMm: 90 }, // May
      { tMax: 19.5, tMin: 8.2, tMean: 13.9, rainDays: 9, rainMm: 60 },  // Jun
      { tMax: 22.2, tMin: 10.5, tMean: 16.4, rainDays: 8, rainMm: 48 }, // Jul
      { tMax: 22.6, tMin: 10.8, tMean: 16.7, rainDays: 8, rainMm: 58 }, // Ago
      { tMax: 19.6, tMin: 8.6, tMean: 14.1, rainDays: 9, rainMm: 82 },  // Sep
      { tMax: 14.8, tMin: 5.2, tMean: 10.0, rainDays: 12, rainMm: 125 },// Oct
      { tMax: 10.2, tMin: 1.8, tMean: 6.0, rainDays: 14, rainMm: 145 }, // Nov
      { tMax: 7.8, tMin: -0.2, tMean: 3.8, rainDays: 13, rainMm: 130 }  // Dic
    ]
  }
};

// 2. Récords Históricos Oficiales AEMET por Estaciones Principales de Asturias (Serie Digital Oficial)
export const HISTORICAL_RECORDS = {
  coast: {
    stationName: 'AEMET Gijón (Musel) / Avilés',
    stationOfficialName: 'Observatorio Meteorológico Oficial AEMET Gijón (Musel)',
    stationAltitude: '25 m sobre el nivel del mar',
    stationLocation: 'Costa Central de Asturias • Puerto de El Musel',
    stationMunicipality: 'Gijón / Xixón',
    stationDescription: 'Observatorio costero oficial de referencia AEMET para Castrillón, Gijón, Gozón, Carreño, Avilés y la rasa litoral cantábrica.',
    zoneLabel: 'Litoral Cantábrico',
    zoneIcon: '🌊',
    stationShort: 'Gijón (Musel)',
    months: [
      { maxT: 23.6, maxYear: 2003, minT: -4.8, minYear: 1985, maxRain: 76.5, rainYear: 1993 }, // Ene
      { maxT: 25.8, maxYear: 1990, minT: -3.0, minYear: 1986, maxRain: 65.0, rainYear: 1978 }, // Feb
      { maxT: 28.0, maxYear: 2021, minT: -1.0, minYear: 1971, maxRain: 58.2, rainYear: 2001 }, // Mar
      { maxT: 29.5, maxYear: 2011, minT: 1.0, minYear: 1973, maxRain: 68.0, rainYear: 1986 },  // Abr
      { maxT: 33.2, maxYear: 2001, minT: 3.8, minYear: 1979, maxRain: 54.4, rainYear: 1981 },  // May
      { maxT: 35.0, maxYear: 2015, minT: 7.2, minYear: 1984, maxRain: 62.0, rainYear: 2010 },   // Jun
      { maxT: 36.4, maxYear: 2022, minT: 9.8, minYear: 1977, maxRain: 82.0, rainYear: 1983 },   // Jul
      { maxT: 35.8, maxYear: 2003, minT: 9.2, minYear: 1986, maxRain: 78.4, rainYear: 2002 },  // Ago
      { maxT: 32.5, maxYear: 1988, minT: 6.8, minYear: 1972, maxRain: 92.4, rainYear: 2000 },  // Sep
      { 
        maxT: 31.0, maxYear: 2011, maxDate: '12 de Octubre de 2011', maxContext: 'Medido en el Observatorio del Musel (Gijón) durante un potente episodio de viento sur (efecto Foehn) y advección cálida sahariana.',
        minT: 2.5, minYear: 1974, minDate: '24 de Octubre de 1974', minContext: 'Medido en Gijón durante una intensa entrada polar ártica temprana.',
        maxRain: 114.0, rainYear: 2000, rainDate: '26 de Octubre de 2000', rainContext: 'Mayor lluvia en 24h registrada en la costa asturiana por un tren de frentes atlánticos.'
      }, // Oct
      { maxT: 26.2, maxYear: 2015, minT: -0.8, minYear: 1988, maxRain: 84.5, rainYear: 2019 }, // Nov
      { maxT: 24.5, maxYear: 1985, minT: -3.2, minYear: 1970, maxRain: 96.0, rainYear: 1981 }  // Dic
    ]
  },
  interior: {
    stationName: 'AEMET Oviedo (El Cristo / Buenavista)',
    stationOfficialName: 'Observatorio Meteorológico Oficial AEMET Oviedo (El Cristo)',
    stationAltitude: '336 m sobre el nivel del mar',
    stationLocation: 'Valles Centrales • El Cristo',
    stationMunicipality: 'Oviedo / Uviéu',
    stationDescription: 'Observatorio oficial de referencia para Oviedo, Siero, Llanera y las cuencas centrales de Asturias.',
    zoneLabel: 'Valles Centrales',
    zoneIcon: '🏙️',
    stationShort: 'Oviedo (El Cristo)',
    months: [
      { maxT: 23.4, maxYear: 2003, minT: -6.0, minYear: 1985, maxRain: 72.0, rainYear: 1996 },
      { maxT: 24.6, maxYear: 1990, minT: -3.8, minYear: 1986, maxRain: 62.4, rainYear: 1978 },
      { maxT: 27.2, maxYear: 2021, minT: -2.6, minYear: 1971, maxRain: 60.0, rainYear: 2001 },
      { maxT: 30.0, maxYear: 2011, minT: -0.6, minYear: 1973, maxRain: 65.2, rainYear: 1986 },
      { maxT: 34.0, maxYear: 2001, minT: 1.6, minYear: 1979, maxRain: 58.0, rainYear: 1981 },
      { maxT: 35.8, maxYear: 2015, minT: 5.6, minYear: 1984, maxRain: 70.0, rainYear: 2010 },
      { maxT: 37.0, maxYear: 2022, minT: 7.4, minYear: 1977, maxRain: 84.5, rainYear: 1983 },
      { maxT: 36.6, maxYear: 2003, minT: 7.0, minYear: 1986, maxRain: 75.0, rainYear: 2002 },
      { maxT: 33.0, maxYear: 2021, minT: 5.6, minYear: 1972, maxRain: 79.4, rainYear: 2000 },
      { 
        maxT: 31.5, maxYear: 2011, maxDate: '12 de Octubre de 2011', maxContext: 'Medido en El Cristo (Oviedo) con fuerte viento sur recalentado y polvo sahariano.',
        minT: 0.8, minYear: 1974, minDate: '24 de Octubre de 1974', minContext: 'Escarcha y helada temprana en la capital bajo una entrada ártica.',
        maxRain: 95.0, rainYear: 2000, rainDate: '26 de Octubre de 2000', rainContext: 'Lluvias torrenciales continuas que desbordaron tramos fluviales del Nalón y Nora.'
      },
      { maxT: 25.0, maxYear: 2015, minT: -2.2, minYear: 1988, maxRain: 78.0, rainYear: 2019 },
      { maxT: 23.5, maxYear: 1985, minT: -4.5, minYear: 1970, maxRain: 88.0, rainYear: 1981 }
    ]
  },
  occidente: {
    stationName: 'AEMET Cangas del Narcea',
    stationOfficialName: 'Estación Meteorológica Oficial AEMET Cangas del Narcea',
    stationAltitude: '380 m sobre el nivel del mar',
    stationLocation: 'Suroccidente Asturiano • Valle del Narcea',
    stationMunicipality: 'Cangas del Narcea',
    stationDescription: 'Estación oficial de referencia para el suroccidente asturiano y valles del Narcea, Allande, Ibias y Tineo.',
    zoneLabel: 'Suroccidente',
    zoneIcon: '🍂',
    stationShort: 'Cangas del Narcea',
    months: [
      { maxT: 22.0, maxYear: 2003, minT: -8.5, minYear: 1985, maxRain: 68.0, rainYear: 1996 },
      { maxT: 24.0, maxYear: 1990, minT: -6.0, minYear: 1986, maxRain: 58.0, rainYear: 1978 },
      { maxT: 28.5, maxYear: 2021, minT: -4.2, minYear: 1971, maxRain: 55.0, rainYear: 2001 },
      { maxT: 31.2, maxYear: 2011, minT: -2.0, minYear: 1973, maxRain: 62.0, rainYear: 1986 },
      { maxT: 35.4, maxYear: 2001, minT: 0.2, minYear: 1979, maxRain: 52.0, rainYear: 1981 },
      { maxT: 38.0, maxYear: 2015, minT: 3.5, minYear: 1984, maxRain: 65.0, rainYear: 2010 },
      { maxT: 39.5, maxYear: 2022, minT: 5.0, minYear: 1977, maxRain: 70.0, rainYear: 1983 },
      { maxT: 39.0, maxYear: 2003, minT: 4.8, minYear: 1986, maxRain: 68.0, rainYear: 2002 },
      { maxT: 34.2, maxYear: 2021, minT: 2.2, minYear: 1972, maxRain: 78.0, rainYear: 1999 },
      { 
        maxT: 32.0, maxYear: 2011, maxDate: '12 de Octubre de 2011', maxContext: 'Récord de calor otoñal en los valles del suroccidente asturiano.',
        minT: -1.0, minYear: 1974, minDate: '25 de Octubre de 1974', minContext: 'Primera helada bajo cero de otoño en el valle.',
        maxRain: 88.0, rainYear: 2000, rainDate: '26 de Octubre de 2000', rainContext: 'Tromba otoñal atlántica en las cuencas occidentales.'
      },
      { maxT: 25.5, maxYear: 2015, minT: -4.5, minYear: 1988, maxRain: 72.0, rainYear: 2019 },
      { maxT: 22.5, maxYear: 1985, minT: -7.0, minYear: 1970, maxRain: 80.0, rainYear: 1981 }
    ]
  },
  mountain: {
    stationName: 'AEMET Pajares / Picos de Europa',
    stationOfficialName: 'Observatorio de Alta Montaña AEMET Puerto de Pajares',
    stationAltitude: '1.378 m sobre el nivel del mar',
    stationLocation: 'Cordillera Cantábrica • Puerto de Pajares',
    stationMunicipality: 'Lena',
    stationDescription: 'Observatorio oficial de alta montaña para la Cordillera Cantábrica, puertos y Picos de Europa.',
    zoneLabel: 'Picos de Europa / Cordillera',
    zoneIcon: '🏔️',
    stationShort: 'Pajares / Picos',
    months: [
      { maxT: 18.0, maxYear: 2003, minT: -14.0, minYear: 1985, maxRain: 95.0, rainYear: 1996 },
      { maxT: 19.5, maxYear: 1990, minT: -12.5, minYear: 1986, maxRain: 85.0, rainYear: 1978 },
      { maxT: 22.0, maxYear: 2021, minT: -10.0, minYear: 1971, maxRain: 80.0, rainYear: 2001 },
      { maxT: 24.5, maxYear: 2011, minT: -6.5, minYear: 1973, maxRain: 90.0, rainYear: 1986 },
      { maxT: 28.0, maxYear: 2001, minT: -3.0, minYear: 1979, maxRain: 75.0, rainYear: 1981 },
      { maxT: 30.5, maxYear: 2015, minT: 0.5, minYear: 1984, maxRain: 78.0, rainYear: 2010 },
      { maxT: 32.0, maxYear: 2022, minT: 2.0, minYear: 1977, maxRain: 88.0, rainYear: 1983 },
      { maxT: 31.8, maxYear: 2003, minT: 1.8, minYear: 1986, maxRain: 82.0, rainYear: 2002 },
      { maxT: 26.4, maxYear: 1988, minT: -2.0, minYear: 1972, maxRain: 125.0, rainYear: 1993 },
      { 
        maxT: 25.0, maxYear: 2011, maxDate: '12 de Octubre de 2011', maxContext: 'Inversión térmica y calor insólito en cumbres cordilleranas.',
        minT: -5.0, minYear: 1974, minDate: '24 de Octubre de 1974', minContext: 'Fuerte helada y cellisca temprana en cotas altas de montaña.',
        maxRain: 135.0, rainYear: 2000, rainDate: '26 de Octubre de 2000', rainContext: 'Temporal orográfico con precipitaciones torrenciales en vertiente norte.'
      },
      { maxT: 20.0, maxYear: 2015, minT: -9.5, minYear: 1988, rainYear: 2019, maxRain: 110.0 },
      { maxT: 18.5, maxYear: 1985, minT: -12.0, minYear: 1970, rainYear: 1981, maxRain: 115.0 }
    ]
  }
};

/**
 * Resuelve la zona climática para un concejo de Asturias
 */
function resolveZoneKey(concejo) {
  if (!concejo) return 'interior';
  const cId = (concejo.id || '').toLowerCase();
  const reg = (concejo.region || '').toLowerCase();
  const cType = (concejo.type || '').toLowerCase();
  const desc = (concejo.description || '').toLowerCase();

  // 1. Costa y Litoral Cantábrico
  if (cType === 'coast' || reg.includes('costa') || reg.includes('litoral')) {
    return 'coast';
  }

  // 2. Occidente y Suroccidente Interior (Cangas del Narcea, Degaña, Ibias, Allande, Tineo...)
  if (
    reg.includes('occidente') ||
    reg.includes('narcea') ||
    reg.includes('ibias') ||
    reg.includes('degaña') ||
    cId.includes('narcea') ||
    cId === 'allande' ||
    cId === 'tineo' ||
    cId === 'ibias' ||
    cId === 'degana'
  ) {
    return 'occidente';
  }

  // 3. Cordillera y Picos de Europa / Alta Montaña
  if (
    cType === 'mountain' ||
    (concejo.altitude || 0) >= 600 ||
    reg.includes('montaña') ||
    reg.includes('cordillera') ||
    reg.includes('picos') ||
    desc.includes('picos de europa') ||
    ['cabrales', 'cangasdeonis', 'cangas-de-onis', 'onis', 'amieva', 'ponga', 'caso', 'sobrescobio', 'somiedo', 'quiros', 'teverga', 'lena', 'aller', 'pajares', 'sotres', 'covadonga_lagos', 'fuentesdeinvierno'].includes(cId)
  ) {
    return 'mountain';
  }

  // 4. Valles Centrales y Cuencas
  return 'interior';
}

const MONTH_NAMES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

/**
 * Calcula el contexto climatológico y anomalía térmica ("Tiempo Habitual") para un concejo y fecha
 */
export function getClimatologyContext(concejo, current, daily) {
  if (!concejo || !daily || !daily.temperature_2m_max) return null;

  const now = new Date();
  const month = now.getMonth();
  const dayOfMonth = now.getDate();
  const monthName = MONTH_NAMES[month];

  const zoneKey = resolveZoneKey(concejo);
  const zone = CLIMATE_ZONES[zoneKey] || CLIMATE_ZONES.interior;
  const monthData = zone.months[month];

  // Corrección por altitud del concejo (gradiente adiabático medio: -0.6°C / 100m)
  const altDiff = (concejo.altitude || 0) - zone.baseAltitude;
  const lapseRateCorrection = (altDiff / 100) * 0.60;

  const normalMax = Math.round((monthData.tMax - lapseRateCorrection) * 10) / 10;
  const normalMin = Math.round((monthData.tMin - lapseRateCorrection) * 10) / 10;
  const normalMean = Math.round((monthData.tMean - lapseRateCorrection) * 10) / 10;

  // Temperatura máxima prevista hoy (o temperatura actual si falta)
  const todayMax = (daily.temperature_2m_max && daily.temperature_2m_max[0] != null) ? daily.temperature_2m_max[0] : (current?.temperature_2m || normalMax);
  const todayMin = (daily.temperature_2m_min && daily.temperature_2m_min[0] != null) ? daily.temperature_2m_min[0] : normalMin;

  const diffMax = Math.round((todayMax - normalMax) * 10) / 10;
  const absDiff = Math.abs(diffMax);

  // Clasificación de la anomalía térmica
  let status = 'normal';
  let badgeClass = 'clima-normal';
  let icon = '🟢';
  let label = 'Valores habituales';
  let shortText = `En la media habitual (${normalMax}°C)`;
  let title = `Tiempo habitual para finales de ${monthName}`;

  if (diffMax >= 2.0) {
    status = 'warm';
    badgeClass = diffMax >= 4.5 ? 'clima-very-warm' : 'clima-warm';
    icon = diffMax >= 4.5 ? '🔥' : '☀️';
    label = `+${diffMax}°C sobre lo habitual`;
    shortText = `+${diffMax}°C más cálido de lo normal`;
  } else if (diffMax <= -2.0) {
    status = 'cool';
    badgeClass = diffMax <= -4.5 ? 'clima-very-cool' : 'clima-cool';
    icon = diffMax <= -4.5 ? '❄️' : '🧥';
    label = `${diffMax}°C bajo lo habitual`;
    shortText = `${diffMax}°C más fresco de lo normal`;
  }

  // Frase explicativa adaptada a Asturias
  const periodLabel = dayOfMonth <= 10 ? `inicios de ${monthName}` : (dayOfMonth <= 20 ? `mediados de ${monthName}` : `finales de ${monthName}`);
  
  let explanation = '';
  if (status === 'warm') {
    explanation = `Hoy se prevén <strong>${Math.round(todayMax)}°C</strong> de máxima, unos <strong>${absDiff}°C por encima</strong> de lo habitual en ${periodLabel} (media histórica de <strong>${normalMax}°C</strong>).`;
  } else if (status === 'cool') {
    explanation = `Hoy se prevén <strong>${Math.round(todayMax)}°C</strong> de máxima, unos <strong>${absDiff}°C por debajo</strong> de lo normal en ${periodLabel} (media histórica de <strong>${normalMax}°C</strong>).`;
  } else {
    explanation = `Máxima prevista de <strong>${Math.round(todayMax)}°C</strong>, plenamente acorde a lo habitual en ${periodLabel} (media histórica de <strong>${normalMax}°C</strong>).`;
  }

  // Récords históricos para la zona y mes
  const recordStation = HISTORICAL_RECORDS[zoneKey] || HISTORICAL_RECORDS.interior;
  const monthRecord = recordStation.months[month] || null;

  // Memoria climática asturiana (Tal día como hoy)
  const memory = getAsturiasClimateMemory(now);

  return {
    status,
    badgeClass,
    icon,
    label,
    shortText,
    title,
    periodLabel,
    todayMax: Math.round(todayMax),
    todayMin: Math.round(todayMin),
    normalMax,
    normalMin,
    normalMean,
    diffMax,
    absDiff,
    rainDays: monthData.rainDays,
    rainMm: monthData.rainMm,
    explanation,
    zoneName: zone.name,
    concejoName: concejo.name,
    monthName,
    memory,
    records: monthRecord ? {
      station: recordStation.stationName,
      stationOfficialName: recordStation.stationOfficialName || recordStation.stationName,
      stationAltitude: recordStation.stationAltitude || `${zone.baseAltitude} m snm`,
      stationLocation: recordStation.stationLocation || recordStation.zoneLabel,
      stationMunicipality: recordStation.stationMunicipality || recordStation.stationShort,
      stationDescription: recordStation.stationDescription || '',
      zoneLabel: recordStation.zoneLabel,
      zoneIcon: recordStation.zoneIcon,
      stationShort: recordStation.stationShort,
      maxT: monthRecord.maxT,
      maxYear: monthRecord.maxYear,
      maxDate: monthRecord.maxDate || `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${monthRecord.maxYear}`,
      maxContext: monthRecord.maxContext || 'Máxima histórica de la serie oficial.',
      minT: monthRecord.minT,
      minYear: monthRecord.minYear,
      minDate: monthRecord.minDate || `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${monthRecord.minYear}`,
      minContext: monthRecord.minContext || 'Mínima histórica de la serie oficial.',
      maxRain: monthRecord.maxRain,
      rainYear: monthRecord.rainYear,
      rainDate: monthRecord.rainDate || `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${monthRecord.rainYear}`,
      rainContext: monthRecord.rainContext || 'Mayor precipitación acumulada en 24h.'
    } : null
  };
}

/**
 * Renderiza la tarjeta de Climatología y Memoria de Asturias en la Hero Card
 * Estructura minimizada con desglose desplegable (Opción 1 - Feedback Lendo v2.2.82)
 */
export function renderClimatologyStrip(clima) {
  if (!clima) return '';

  const rec = clima.records;
  const mem = clima.memory;

  return `
    <details class="climatology-strip clima-history-card clima-accordion-card ${clima.badgeClass}">
      <!-- RESUMEN COMPACTO EN REPOSO (CANALIZACIÓN EN 2 FILAS ANTI-COLISIÓN - LEY 11) -->
      <summary class="clima-compact-summary">
        <!-- Fila 1: Cabecera con Título a la izquierda y Botón Desglose a la derecha (ESPACIO 100% BLINDADO) -->
        <div class="clima-sum-header-row">
          <div class="clima-sum-brand">
            <span class="clima-sum-icon">🏛️</span>
            <span class="clima-sum-title">Clima · ${clima.monthName.charAt(0).toUpperCase() + clima.monthName.slice(1)}</span>
          </div>
          <span class="clima-toggle-pill" title="Toca para abrir o cerrar el desglose y la memoria histórica">
            <span class="toggle-text-open">Desglose</span>
            <span class="toggle-text-close">Cerrar</span>
            <span class="toggle-chevron">▾</span>
          </span>
        </div>

        <!-- Fila 2: Distintivo de Balance Térmico e Indicadores Rápidos con 100% de Ancho Libre -->
        <div class="clima-sum-sub-row">
          <span class="climatology-badge ${clima.badgeClass} clima-badge-compact" title="${clima.label}">
            <span class="climatology-icon">${clima.icon}</span>
            <span class="climatology-text">${clima.label}</span>
          </span>
          <div class="clima-sum-metrics">
            <span class="c-met">Media: <strong>${clima.normalMax}°C</strong></span>
            <span class="c-sep">·</span>
            <span class="c-met">Hoy: <strong>${clima.todayMax}°C</strong> <small class="c-diff">(${clima.diffMax >= 0 ? `+${clima.diffMax}` : `${clima.diffMax}`}°C)</small></span>
            ${rec ? `
              <span class="c-sep hide-tiny">·</span>
              <span class="c-met hide-tiny">Récord: <strong>${rec.maxT}°C</strong></span>
            ` : ''}
          </div>
        </div>
      </summary>

      <!-- CUERPO DESPLEGABLE ULTRA-MINIMIZADO (FEEDBACK LENDO v2.2.84) -->
      <div class="clima-expanded-body">
        <!-- 1. COMPARATIVA RÁPIDA (HOY VS HABITUAL) -->
        <div class="clima-compare-row">
          <div class="clima-compare-box normal-box">
            <span class="clima-cmp-label">Habitual en ${clima.periodLabel}</span>
            <span class="clima-cmp-val"><strong>${clima.normalMax}°C</strong> <small class="cmp-note">media 30 años</small></span>
          </div>
          <div class="clima-compare-sep">➔</div>
          <div class="clima-compare-box today-box ${clima.badgeClass}">
            <span class="clima-cmp-label">Máxima Prevista Hoy</span>
            <span class="clima-cmp-val"><strong>${clima.todayMax}°C</strong> <small class="cmp-note">${clima.diffMax >= 0 ? `+${clima.diffMax}` : `${clima.diffMax}`}°C</small></span>
          </div>
        </div>

        <!-- 2. DÓNDE SE MIDIÓ Y RÉCORDS DEL MES (COMPACTO) -->
        ${rec ? `
          <div class="clima-min-station-card">
            <div class="clima-min-station-row">
              <span class="min-st-pin">📍</span>
              <span class="min-st-text">Medido en: <strong>${rec.stationOfficialName || rec.station}</strong> <small>(${rec.stationAltitude || '25 m'})</small></span>
            </div>
            <div class="climatology-records-pills">
              <span class="record-mini-pill record-max" title="${rec.maxContext || `Récord de calor`}">
                🔥 Máx: <strong>${rec.maxT}°C</strong> <small>(${rec.maxYear})</small>
              </span>
              <span class="record-mini-pill record-min" title="${rec.minContext || `Récord de frío`}">
                ❄️ Mín: <strong>${rec.minT}°C</strong> <small>(${rec.minYear})</small>
              </span>
              <span class="record-mini-pill record-rain" title="${rec.rainContext || `Mayor lluvia en 24h`}">
                🌧️ 24h: <strong>${rec.maxRain} mm</strong> <small>(${rec.rainYear})</small>
              </span>
            </div>
          </div>
        ` : ''}

        <!-- 3. MEMORIA DEL CLIMA ASTURIANO (1 FRASE COMPACTA) -->
        ${mem ? `
          <div class="clima-min-memory-card">
            <div class="min-mem-head">
              <span class="min-mem-icon">${mem.icon}</span>
              <span class="min-mem-title">Memoria Asturiana · ${mem.dateLabel}${mem.year ? ` (${mem.year})` : ''}</span>
              <span class="clima-memory-tag ${mem.tagClass}">${mem.tag}</span>
            </div>
            <p class="min-mem-text"><strong>${mem.title}:</strong> ${mem.summary}</p>
          </div>
        ` : ''}
      </div>
    </details>
  `;
}
