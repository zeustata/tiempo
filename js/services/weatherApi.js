import { fetchLiveRadarEcho } from './radarService.js?v=3.0.35';

/**
 * Catálogo Oficial de Modelos Meteorológicos de Alta Resolución
 */
export const WEATHER_MODELS = [
  {
    id: 'best_match',
    apiModel: '',
    name: 'Auto Híbrido de Consenso',
    agency: 'Combinación Inteligente AROME + ECMWF',
    flag: '🌟',
    resolution: '1 - 3 km',
    tag: 'Calibrado Cantábrico',
    runCadence: 'Consenso dinámico en tiempo real (AROME 1.3 km + ECMWF 9 km)',
    description: 'Algoritmo inteligente de consenso cantábrico con soberanía de AROME (1.3 km) en tiempo real y protección estricta contra falsos claros o desfases frontales de ECMWF.',
    bestFor: 'Máxima fidelidad en costa y valles con protección estricta anti-orballu fantasma y blindaje frontal.'
  },
  {
    id: 'ecmwf_ifs025',
    apiModel: 'ecmwf_ifs',
    name: 'ECMWF IFS (Europa)',
    agency: 'Centro Europeo de Predicción a Plazo Medio',
    flag: '🇪🇺',
    resolution: '9 km',
    tag: 'Referencia Mundial',
    runCadence: 'Pasadas cada 6 h (00z, 06z, 12z, 18z) • Retardo cálculo ~4-5 h',
    description: 'El modelo numérico global más prestigioso, robusto y fiable del mundo para medio y corto plazo.',
    bestFor: 'Evolución de frentes atlánticos, presiones y tendencias a 3-7 días.'
  },
  {
    id: 'meteofrance_seamless',
    apiModel: 'meteofrance_seamless',
    name: 'AROME Cantábrico (Francia/España)',
    agency: 'Météo-France (Consorcio ALADIN)',
    flag: '🇫🇷',
    resolution: '1.3 km',
    tag: 'Hiper-Resolución',
    runCadence: 'Pasadas cada 3 h • Retardo cálculo ~3-4 h (propenso a desfases en frentes)',
    description: 'Modelo de altísima resolución adaptado al Cantábrico. Modela con enorme fidelidad microclimas, valles y brisas de costa.',
    bestFor: 'Valles profundos, nieblas costeras y orografía de Picos de Europa.'
  },
  {
    id: 'icon_seamless',
    apiModel: 'icon_seamless',
    name: 'DWD ICON-EU (Alemania)',
    agency: 'Servicio Meteorológico Alemán (DWD)',
    flag: '🇩🇪',
    resolution: '7 km',
    tag: 'Rápida Actualización',
    runCadence: 'Pasadas cada 3-6 h • Rápida disponibilidad (~2-3 h de retardo)',
    description: 'Modelo europeo de alta frecuencia con excelente tratamiento de nubosidad, chubascos y rachas de viento.',
    bestFor: 'Detección de rachas súbitas de viento y chubascos rápidos.'
  },
  {
    id: 'gfs_seamless',
    apiModel: 'gfs_seamless',
    name: 'NOAA GFS (EE. UU.)',
    agency: 'Administración Nacional Oceánica y Atmosférica (EE. UU.)',
    flag: '🇺🇸',
    resolution: '13 km',
    tag: 'Global Clásico',
    runCadence: 'Pasadas cada 6 h (00z, 06z, 12z, 18z) • Retardo cálculo ~4 h',
    description: 'El modelo numérico global de referencia de la Administración Nacional Oceánica y Atmosférica de EE. UU.',
    bestFor: 'Comparativa sinóptica y contraste internacional entre modelos.'
  },
  {
    id: 'ukmo_seamless',
    apiModel: 'ukmo_seamless',
    name: 'UK Met Office (Reino Unido)',
    agency: 'Servicio Meteorológico Nacional Británico',
    flag: '🇬🇧',
    resolution: '10 km',
    tag: 'Frentes Atlánticos',
    runCadence: '2 pasadas principales (00z, 12z) • Retardo cálculo ~4 h',
    description: 'El modelo británico de referencia histórica para borrascas profundas del Atlántico Norte y temporales en el Golfo de Vizcaya.',
    bestFor: 'Evolución de frentes borrascosos que entran por el Cantábrico y mar picado.'
  },
  {
    id: 'gem_seamless',
    apiModel: 'gem_seamless',
    name: 'GEM (Canadá)',
    agency: 'Centro Meteorológico Canadiense (Environment Canada)',
    flag: '🇨🇦',
    resolution: '15 km',
    tag: 'Especialista Polar',
    runCadence: '2 pasadas principales (00z, 12z) • Retardo cálculo ~4 h',
    description: 'Modelo global de Canadá altamente reconocido por su precisión identificando advecciones de aire ártico marítimo, olas de frío polar y ciclogénesis.',
    bestFor: 'Entradas frías invernales, nevadas en cotas medias-bajas y contraste polar.'
  },
  {
    id: 'jma_seamless',
    apiModel: 'jma_seamless',
    name: 'JMA (Japón)',
    agency: 'Agencia Meteorológica de Japón (Tokio)',
    flag: '🇯🇵',
    resolution: '10 km',
    tag: 'Humedad Oceánica',
    runCadence: 'Pasadas cada 6 h (00z, 06z, 12z, 18z) • Retardo cálculo ~4 h',
    description: 'Modelo numérico japonés de gran prestigio por su cálculo de la humedad marítima, frentes cálidos y lluvia convectiva oceánica.',
    bestFor: 'Evaluación de saturación de humedad, lloviznas marítimas y nubosidad baja.'
  }
];

export function getModelById(id) {
  if (!id) return WEATHER_MODELS[0];
  return WEATHER_MODELS.find(m => m.id === id) || WEATHER_MODELS[0];
}

export function getDefaultModel() {
  return WEATHER_MODELS[0];
}

/**
 * Servicio de datos meteorológicos, marinos y de calidad del aire con Open-Meteo
 */
export async function fetchWeatherData(lat, lon, isCoast = false, modelParam = '') {
  try {
    // 1. Meteorología Completa de Alta Resolución (con soporte para modelo específico)
    const modelQuery = modelParam ? `&models=${encodeURIComponent(modelParam)}` : '';
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,direct_normal_irradiance,uv_index,shortwave_radiation&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,is_day,freezing_level_height,direct_normal_irradiance,shortwave_radiation,cape&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=Europe%2FMadrid&forecast_days=10${modelQuery}`;

    const weatherPromise = fetch(weatherUrl).then(r => {
      if (!r.ok) throw new Error('Error al consultar datos meteorológicos');
      return r.json();
    });

    // 2. Calidad del Aire y Pólenes (Copernicus CAMS Open-Meteo)
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm10,pm2_5,nitrogen_dioxide,ozone,sulphur_dioxide,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=Europe%2FMadrid`;
    const aqiPromise = fetch(aqiUrl).then(r => r.json()).catch(() => null);

    // 3. Datos Marinos y Temperatura del Agua (en costa o referencia cantábrica)
    const marineLat = isCoast ? lat : 43.58;
    const marineLon = lon;
    const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${marineLat}&longitude=${marineLon}&current=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,secondary_swell_wave_height,secondary_swell_wave_direction,secondary_swell_wave_period,sea_surface_temperature&hourly=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,secondary_swell_wave_height,secondary_swell_wave_direction,secondary_swell_wave_period&timezone=Europe%2FMadrid`;
    const marinePromise = fetch(marineUrl).then(r => r.json()).catch(() => null);

    // 4. Filtro de Seguridad y Consenso Cantábrico (AROME + ECMWF)
    // Cuando se usa el modo Auto, se consulta en paralelo ECMWF para blindar contra falsos claros costeros
    // y resolver la asimetría de lluvia (PoP alto con 0.0 mm por corte determinista de AROME)
    const isAutoModel = !modelParam || modelParam === 'best_match';
    const consensusPromise = isAutoModel
      ? fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,cloud_cover,direct_normal_irradiance,shortwave_radiation,precipitation,relative_humidity_2m&hourly=temperature_2m,apparent_temperature,weather_code,cloud_cover,direct_normal_irradiance,shortwave_radiation,precipitation,rain,precipitation_probability,relative_humidity_2m&models=ecmwf_ifs&timezone=Europe%2FMadrid&forecast_days=2`)
        .then(r => r.ok ? r.json() : null)
        .catch(() => null)
      : Promise.resolve(null);

    // 5. Avisos Oficiales AEMET (desde JSON estático actualizado por GitHub Actions)
    const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const alertsUrl = isLocalhost
      ? 'data/avisos-asturias.json'
      : `https://raw.githubusercontent.com/zeustata/tiempo/data/data/avisos-asturias.json?_t=${Math.floor(Date.now() / 60000)}`;

    const aemetAlertsPromise = fetch(alertsUrl, { cache: 'no-cache' })
      .then(r => {
        if (!r.ok) throw new Error('Alerts fetch failed');
        return r.json();
      })
      .catch(() => {
        return fetch('data/avisos-asturias.json').then(r => r.ok ? r.json() : null).catch(() => null);
      });

    // 6. Parte Oficial de Nieve (desde JSON estático actualizado por GitHub Actions)
    const snowUrl = isLocalhost
      ? 'data/partes-nieve.json'
      : `https://raw.githubusercontent.com/zeustata/tiempo/data/data/partes-nieve.json?_t=${Math.floor(Date.now() / 300000)}`;

    const snowReportPromise = fetch(snowUrl, { cache: 'no-cache' })
      .then(r => {
        if (!r.ok) throw new Error('Snow report fetch failed');
        return r.json();
      })
      .catch(() => {
        return fetch('data/partes-nieve.json').then(r => r.ok ? r.json() : null).catch(() => null);
      });

    // 7. Radar Táctico en Vivo (Nowcasting Real de RainViewer - Doctrina Tormenta Lendo)
    const radarEchoPromise = fetchLiveRadarEcho(lat, lon).catch(() => null);

    const [weather, aqi, marine, consensus, aemetAlerts, snowReport, radarEcho] = await Promise.all([
      weatherPromise,
      aqiPromise,
      marinePromise,
      consensusPromise,
      aemetAlertsPromise,
      snowReportPromise,
      radarEchoPromise
    ]);

    if (weather) {
      if (consensus) {
        applyCantabricoConsensus(weather, consensus, radarEcho);
      } else {
        applyStandalonePhysicalSovereignty(weather, radarEcho);
      }
      harmonizeWeatherPrecipitation(weather);
    }

    return {
      success: true,
      weather,
      aqi,
      marine,
      aemetAlerts,
      snowReport,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Filtro de Seguridad y Consenso Cantábrico (AROME + ECMWF):
 * Resuelve la anomalía de mesoescala donde AROME (malla 1.3 km) simula ocasionalmente
 * un "agujero" de claro ficticio en la costa o bahías (nubosidad < 50%, cielo soleado)
 * mientras el modelo de referencia mundial (ECMWF IFS, 9 km) constata que la región
 * está bajo un manto nuboso cerrado y continuo (nubosidad >= 80%).
 * 
 * RESCATE INTELIGENTE DE ORBAYU REAL & BLINDAJE ANTI-ORBALLU FANTASMA:
 * 1. En tiempo actual en vivo (nowcasting):
 *    - AROME mantiene soberanía si no hay condiciones de saturación.
 *    - Si AROME marca seco (< 0.1 mm) por corte determinista o desfase horario, pero ECMWF
 *      marca llovizna activa (código 51-57 o >= 0.1 mm), humedad relativa alta (>= 86%),
 *      cielo cerrado (>= 80%) y ausencia de radiación solar directa, se rescata el Orbayu real.
 * 2. En el pronóstico horario:
 *    - Si ECMWF detecta llovizna (0.1 - 0.4 mm) respaldada por ensamble (PoP >= 40%),
 *      humedad >= 86%, cielo cubierto (>= 80%) y sin haz solar en ECMWF (< 100 W/m²), se valida el Orbayu.
 *    - Si se trata de lluvia frontal mayor (>= 0.5 mm), basta certeza del ensamble (PoP >= 60%) y nubes >= 60%.
 *    - En días secos de panza de burro (humedad < 85% o PoP < 40%), se mantiene el blindaje anti-fantasmas.
 */
function applyCantabricoConsensus(weather, consensus, radarEcho = null) {
  if (!weather || !consensus) return;

  // 1. Verificación del tiempo actual en vivo
  if (weather.current && consensus.current) {
    const rawCloud = weather.current.cloud_cover != null ? weather.current.cloud_cover : 100;
    const ecmwfCloud = Math.max(consensus.current.cloud_cover != null ? consensus.current.cloud_cover : 0, (consensus.hourly && consensus.hourly.cloud_cover && consensus.hourly.cloud_cover[new Date().getHours()] != null) ? consensus.hourly.cloud_cover[new Date().getHours()] : 0);
    const rawDirectIrr = weather.current.direct_normal_irradiance != null ? parseFloat(weather.current.direct_normal_irradiance) : 0;
    const rawUv = weather.current.uv_index != null ? parseFloat(weather.current.uv_index) : 0;
    const rawSw = weather.current.shortwave_radiation != null ? parseFloat(weather.current.shortwave_radiation) : 0;

    const eDirectIrr = consensus.current.direct_normal_irradiance != null ? parseFloat(consensus.current.direct_normal_irradiance) : 0;
    const eSw = consensus.current.shortwave_radiation != null ? parseFloat(consensus.current.shortwave_radiation) : 0;
    const ePrecip = consensus.current.precipitation != null ? parseFloat(consensus.current.precipitation) : 0;
    const eCode = consensus.current.weather_code != null ? parseInt(consensus.current.weather_code, 10) : 0;
    const rawPrecip = weather.current.precipitation != null ? parseFloat(weather.current.precipitation) : 0;
    const rawCode = weather.current.weather_code != null ? parseInt(weather.current.weather_code, 10) : 0;
    
    // Adopción de humedad máxima en superficie (si el Centro Europeo constata saturación cantábrica >= 94%, se respeta):
    const hum = Math.max(
      weather.current.relative_humidity_2m != null ? parseFloat(weather.current.relative_humidity_2m) : 0,
      consensus.current.relative_humidity_2m != null ? parseFloat(consensus.current.relative_humidity_2m) : 0
    );
    weather.current.relative_humidity_2m = hum;
    if (consensus.current.temperature_2m != null && weather.current.temperature_2m != null && weather.current.is_day === 0 && (weather.current.wind_speed_10m || 0) < 12 && ecmwfCloud >= 80 && (consensus.current.temperature_2m - weather.current.temperature_2m) >= 1.5) {
      weather.current.temperature_2m = Math.round(((weather.current.temperature_2m + consensus.current.temperature_2m) / 2) * 10) / 10;
      if (consensus.current.apparent_temperature != null && weather.current.apparent_temperature != null) {
        weather.current.apparent_temperature = Math.round(((weather.current.apparent_temperature + consensus.current.apparent_temperature) / 2) * 10) / 10;
      }
    }

    const nowHour = new Date().getHours();
    const curEPop = (consensus.hourly && consensus.hourly.precipitation_probability && consensus.hourly.precipitation_probability[nowHour] != null) ? consensus.hourly.precipitation_probability[nowHour] : 0;
    const curEPrecip = (consensus.hourly && consensus.hourly.precipitation && consensus.hourly.precipitation[nowHour] != null) ? consensus.hourly.precipitation[nowHour] : 0;
    const curECode = (consensus.hourly && consensus.hourly.weather_code && consensus.hourly.weather_code[nowHour] != null) ? consensus.hourly.weather_code[nowHour] : null;
    const curAromeCode = (weather.hourly && weather.hourly.weather_code && weather.hourly.weather_code[nowHour] != null) ? weather.hourly.weather_code[nowHour] : null;
    const curAromePrecip = (weather.hourly && weather.hourly.precipitation && weather.hourly.precipitation[nowHour] != null) ? weather.hourly.precipitation[nowHour] : 0;
    const curCape = (weather.hourly && weather.hourly.cape && weather.hourly.cape[nowHour] != null) ? weather.hourly.cape[nowHour] : 0;

    // VERIFICACIÓN SOLAR OBJETIVA (BLINDAJE CONTRA EL SOL FICTICIO SIMULADO POR AROME):
    // Cuando AROME simula un falso claro o desfase frontal, calcula matemáticamente radiación directa muy alta (400+ W/m²).
    // Para que el sol sea considerado real y no un mero cálculo de AROME, debe estar respaldado por ECMWF (eDirectIrr >= 80 W/m²)
    // o por una nubosidad moderada en el Centro Europeo (ecmwfCloud <= 50%).
    // Si ECMWF constata manto cubierto (>= 60%) y radiación deprimida (< 100 W/m²), la radiación de AROME se descarta como espejismo numérico.
    const hasTrueSunlight = (rawDirectIrr >= 100 || rawSw >= 200 || rawUv >= 1.0) && ecmwfCloud <= 50 && eDirectIrr >= 150;

    // A) Detección y corrección de Falso Claro (Avance Frontal de ECMWF):
    // Se activa si ECMWF detecta frente en avance o cielo cerrado (ecmwfCloud >= 60%),
    // mientras AROME se ha quedado dormido con un claro ficticio (rawCloud < 50% con divergencia >= 20%),
    // y ECMWF confirma ausencia de haz solar abrasador (eDirectIrr < 250 o ecmwfCloud >= 70).
    const isFalseClear = (rawCloud <= 15 && ecmwfCloud >= 16 && (ecmwfCloud - rawCloud >= 15)) ||
      (rawCloud <= 70 && ecmwfCloud >= 75 && (ecmwfCloud - rawCloud >= 15) && eDirectIrr < 150) ||
      (rawCloud < 50 && ecmwfCloud >= 40 && (ecmwfCloud - rawCloud >= 20));

    if (isFalseClear) {
      weather.current.cloud_cover = ecmwfCloud;
      if (consensus.current.weather_code != null) {
        weather.current.weather_code = consensus.current.weather_code < 50 ? consensus.current.weather_code : (ecmwfCloud >= 80 ? 3 : 2);
      }
      if (consensus.current.direct_normal_irradiance != null) {
        weather.current.direct_normal_irradiance = consensus.current.direct_normal_irradiance;
      }
      if (consensus.current.shortwave_radiation != null) {
        weather.current.shortwave_radiation = consensus.current.shortwave_radiation;
      }
    }

    // A1.1) Rescate Soberano de Cielo Despejado de ECMWF (Ley 27 & Banco de Ventana Caso Real #7):
    // Cuando el Centro Europeo (ECMWF) certifica cielo despejado limpio (ecmwfCloud <= 15% y eCode === 0)
    // con radiación solar directa activa (eDirectIrr >= 150 W/m² o rawDirectIrr >= 150 W/m²) en tiempo seco (sin lluvia),
    // pero AROME/modelo base simula un falso intervalo nuboso (rawCloud >= 35% o código 2):
    // SE ADOPTA EL CIELO DESPEJADO REAL DE ECMWF (erradica nubes fantasma costeras en atardeceres y mañanas).
    const isFalseCloudyInterval = (rawPrecip < 0.1 && ePrecip < 0.1) &&
      ecmwfCloud <= 15 && eCode === 0 &&
      (eDirectIrr >= 150 || rawDirectIrr >= 150) &&
      (rawCloud >= 35 || rawCode === 2);

    if (isFalseCloudyInterval) {
      weather.current.cloud_cover = ecmwfCloud;
      weather.current.weather_code = 0;
      if (consensus.current.direct_normal_irradiance != null && (!weather.current.direct_normal_irradiance || weather.current.direct_normal_irradiance < consensus.current.direct_normal_irradiance)) {
        weather.current.direct_normal_irradiance = consensus.current.direct_normal_irradiance;
      }
      if (consensus.current.shortwave_radiation != null && (!weather.current.shortwave_radiation || weather.current.shortwave_radiation < consensus.current.shortwave_radiation)) {
        weather.current.shortwave_radiation = consensus.current.shortwave_radiation;
      }
    }

    // C) Rescate Soberano de Radiación Solar Real / Resol Perforante de ECMWF (Ley 27):
    // Cuando AROME se queda "a oscuras" o subestima severamente el haz solar (rawDirectIrr < 180 W/m² con cielo encapotado),
    // pero el Centro Europeo (ECMWF) constata que el sol logra perforar el manto con fuerza de resol otoñal
    // (eDirectIrr >= 250 W/m² y eSw >= 320 W/m²):
    // SE ADOPTA LA RADIACIÓN SOLAR REAL DE ECMWF (erradicando la ceguera de AROME en la costa).
    const isSolarRescue = (rawDirectIrr < 180) && (eDirectIrr >= 250 && eSw >= 320);
    if (isSolarRescue) {
      if (consensus.current.direct_normal_irradiance != null) {
        weather.current.direct_normal_irradiance = consensus.current.direct_normal_irradiance;
      }
      if (consensus.current.shortwave_radiation != null) {
        weather.current.shortwave_radiation = consensus.current.shortwave_radiation;
      }
      if (consensus.current.uv_index != null) {
        weather.current.uv_index = consensus.current.uv_index;
      }
    }

    // B) Rescate Soberano de Lluvia / Orbayu Real de ECMWF en tiempo actual:
    // RESGUARDO DE ESCAMPADA INMEDIATA (Feedback de Lendo - Ley 27):
    // Si AROME (malla hiperlocal 1.3 km) ya ha registrado el fin del chubasco (rawPrecip < 0.1 mm y rawCode <= 3),
    // y ECMWF solo mantiene precipitación residual o desfase horario (ePrecip < 0.3 mm),
    // se respeta la escampada física: no se rescata lluvia falsa ni acumulados horarios futuros (curEPrecip)
    // y el cielo queda en Nublado / Cubiertu seco (código 3, 0.0 mm).
    const isEscampadaActive = rawPrecip < 0.1 && rawCode <= 3 && ePrecip < 0.3;

    const isCurrentRainRescue = !isEscampadaActive && ((ePrecip >= 0.3) || (ePrecip >= 0.1 && (rawCode >= 50 || eCode >= 50))) &&
      (hum >= 75 || ecmwfCloud >= 65) &&
      eDirectIrr < 100;

    if (rawPrecip >= 0.1 && ePrecip >= 0.1 && !hasTrueSunlight) {
      const meanP = Math.round(((rawPrecip + ePrecip) / 2) * 10) / 10;
      weather.current.precipitation = meanP;
      if (weather.current.rain != null) weather.current.rain = meanP;
    } else if (rawPrecip < 0.1 && ePrecip >= 0.4 && ecmwfCloud >= 80 && eDirectIrr < 100) {
      const rescuedP = Math.round((ePrecip * 0.6) * 10) / 10;
      weather.current.precipitation = rescuedP;
      if (weather.current.rain != null) weather.current.rain = rescuedP;
      weather.current.weather_code = (eCode >= 50) ? eCode : 51;
      if (ecmwfCloud > rawCloud) weather.current.cloud_cover = ecmwfCloud;
    } else if (isCurrentRainRescue) {
      const rescuedP = Math.max(ePrecip, curAromePrecip, 0.2);
      weather.current.precipitation = rescuedP;
      if (weather.current.rain != null) weather.current.rain = rescuedP;
      const targetCode = (eCode >= 50 && eCode <= 82) ? eCode : ((curECode >= 50 && curECode <= 82) ? curECode : 51);
      weather.current.weather_code = targetCode;
      if (ecmwfCloud > rawCloud) weather.current.cloud_cover = ecmwfCloud;
    } else if (isEscampadaActive && (weather.current.weather_code >= 50 || rawCode <= 3)) {
      weather.current.precipitation = 0;
      if (weather.current.rain != null) weather.current.rain = 0;
      weather.current.weather_code = Math.max(rawCloud, ecmwfCloud) >= 75 ? 3 : 2;
    }

    // B1.1) Rescate Soberano de Orbayu Cantábrico en tiempo actual (Saturación, AROME y Ensamble):
    // Resuelve el caso donde el bloque instantáneo de la API marca 0.0 mm por latencia de 15 minutos o microgotas,
    // pero la atmósfera costera está en saturación condensada (humedad >= 90%) o AROME detecta llovizna activa (51-57)
    // con humedad cantábrica (hum >= 70%), cielo cubierto (>= 75%) y sin haz solar abrasador.
    // FILTRO ANTI-FALSO ORBAYU (Banco de Ventana Lendo):
    // Si ambos modelos instantáneos marcan 0.0 mm y la radiación solar difusa o directa empieza a iluminar
    // el cielo con fuerza (eDirectIrr >= 120 W/m² o eSw >= 200 W/m² o rawDirectIrr >= 120 W/m²),
    // el frente ya ha pasado, la lluvia ha cesado y el cielo está aclarando (seco).
    const isClearingSky = (rawPrecip < 0.1 && ePrecip < 0.1) && (eDirectIrr >= 120 || eSw >= 200 || rawDirectIrr >= 120);

    const isAromeConfirmedDrizzle = !isClearingSky && (rawCode >= 50 && rawCode <= 57) && (Math.max(rawCloud, ecmwfCloud) >= 75) && hum >= 70 && !hasTrueSunlight;
    const isOrbayuCondition = !isClearingSky && (isAromeConfirmedDrizzle || (curEPop >= 60 && hum >= 80 && Math.max(rawCloud, ecmwfCloud) >= 80 && !hasTrueSunlight && eDirectIrr < 100));

    if (isOrbayuCondition) {
      weather.current.weather_code = (rawCode >= 50 && rawCode <= 57) ? rawCode : 51; // Orbayu / Llovizna activa
      if (weather.current.precipitation < 0.1) {
        weather.current.precipitation = Math.max(curEPrecip, curAromePrecip, 0.1);
        if (weather.current.rain != null) weather.current.rain = weather.current.precipitation;
      }
      if (ecmwfCloud > rawCloud) weather.current.cloud_cover = ecmwfCloud;
    }

    // B2) Filtro Anti-Llovizna Fantasma Solitaria de AROME en tiempo actual (Consenso Bidireccional & Inmunidad Solar):
    const isSolarDrizzleGhost = hasTrueSunlight && rawPrecip > 0 && rawPrecip < 0.5 && ePrecip < 0.1;
    const isPhantomAromeDrizzle = !isOrbayuCondition && (rawPrecip > 0 && rawPrecip < 1.5 &&
      (rawCode <= 3 || (rawCode >= 50 && rawCode <= 57)) &&
      ePrecip < 0.1 &&
      eCode <= 3 &&
      (hum < 86 || hasTrueSunlight)) || isSolarDrizzleGhost;

    if (isSolarDrizzleGhost) {
      weather.current.precipitation = 0;
      if (weather.current.rain != null) weather.current.rain = 0;
      weather.current.weather_code = eCode <= 3 ? eCode : 1;
      if (ecmwfCloud >= 80 && weather.current.cloud_cover < 80) {
        weather.current.cloud_cover = ecmwfCloud;
      }
    }

    // C) SOBERANÍA FÍSICA Y ARMONIZACIÓN DE FALSOS NUBLADOS / RESIDUOS DE LLUVIA:
    const isDryCurrent = weather.current.precipitation < 0.1 || isSolarDrizzleGhost || isClearingSky;
    if (isDryCurrent && (weather.current.weather_code >= 50 || isClearingSky)) {
      if (rawPrecip < 0.5 || isClearingSky) {
        weather.current.precipitation = 0;
        if (weather.current.rain != null) weather.current.rain = 0;
      }
      const effectiveCloud = Math.max(rawCloud, ecmwfCloud);
      weather.current.weather_code = effectiveCloud >= 80 ? 3 : (effectiveCloud >= 40 ? 2 : 1);
    }

    // Falso Nublado en tiempo actual (sincronizado con rescate horario: Ley 27 & Banco de Ventana)
    // Si AROME se encapota al 100% (rawCloud >= 80%) en tiempo seco pero ECMWF constata sol/claros (eDirectIrr >= 200 o hasTrueSunlight) con ecmwfCloud <= 70%
    const isFalseOvercast = isDryCurrent && ((hasTrueSunlight && rawCloud >= 75 && ecmwfCloud <= 50) || (rawCloud >= 80 && ecmwfCloud <= 70 && eDirectIrr >= 200 && eCode <= 2));
    if (isFalseOvercast) {
      weather.current.cloud_cover = ecmwfCloud;
      weather.current.weather_code = consensus.current.weather_code != null && consensus.current.weather_code <= 2
        ? consensus.current.weather_code
        : (ecmwfCloud <= 25 ? 0 : 2);
      if (consensus.current.direct_normal_irradiance != null && (!weather.current.direct_normal_irradiance || weather.current.direct_normal_irradiance < consensus.current.direct_normal_irradiance)) {
        weather.current.direct_normal_irradiance = consensus.current.direct_normal_irradiance;
      }
      if (consensus.current.shortwave_radiation != null && (!weather.current.shortwave_radiation || weather.current.shortwave_radiation < consensus.current.shortwave_radiation)) {
        weather.current.shortwave_radiation = consensus.current.shortwave_radiation;
      }
    }

    // D) SOBERANÍA ABSOLUTA DEL RADAR TÁCTICO EN VIVO (Nowcasting Real - Doctrina Tormenta Lendo):
    // Si la reflectividad del radar de RainViewer detecta precipitación activa en las coordenadas,
    // el radar físico desempata por encima de cualquier modelo numérico ciego (AROME / ECMWF):
    if (radarEcho && radarEcho.hasEcho && radarEcho.echo && radarEcho.echo.isRain) {
      const echo = radarEcho.echo;
      const isConvectiveStorm = echo.isStorm || (echo.level === 'heavy_rain' && curCape >= 40);
      if (isConvectiveStorm) {
        weather.current.weather_code = 95;
        weather.current.precipitation = Math.max(weather.current.precipitation || 0, echo.precipEst || 15.0);
        if (weather.current.rain != null) weather.current.rain = weather.current.precipitation;
        weather.current.cloud_cover = Math.max(weather.current.cloud_cover || 0, 95);
        weather.current.is_radar_rescued = true;
        weather.current.radar_rescue_level = 'storm';
        weather.current.radar_rescue_label = 'Tormenta / Lluvia torrencial';
      } else if (echo.level === 'heavy_rain' && (weather.current.weather_code <= 3 || weather.current.precipitation < 2.0)) {
        weather.current.weather_code = echo.wmoCode || 81;
        weather.current.precipitation = Math.max(weather.current.precipitation || 0, echo.precipEst || 8.0);
        if (weather.current.rain != null) weather.current.rain = weather.current.precipitation;
        weather.current.cloud_cover = Math.max(weather.current.cloud_cover || 0, 90);
        weather.current.is_radar_rescued = true;
        weather.current.radar_rescue_level = echo.level;
        weather.current.radar_rescue_label = echo.label;
      } else if (echo.level === 'moderate_rain' && (weather.current.weather_code <= 3 || weather.current.precipitation < 1.0)) {
        weather.current.weather_code = echo.wmoCode || 63;
        weather.current.precipitation = Math.max(weather.current.precipitation || 0, echo.precipEst || 4.0);
        if (weather.current.rain != null) weather.current.rain = weather.current.precipitation;
        weather.current.cloud_cover = Math.max(weather.current.cloud_cover || 0, 85);
        weather.current.is_radar_rescued = true;
        weather.current.radar_rescue_level = echo.level;
        weather.current.radar_rescue_label = echo.label;
      } else if (echo.level === 'light_rain') {
        // COLOR AZUL: Lluvia débil / Orbayu activo
        // Degrada inmediatamente tormentas o chubascos viejos a lluvia débil real (0.6 mm, 1 gota):
        weather.current.weather_code = 61; // Lluvia débil
        weather.current.precipitation = Math.min(weather.current.precipitation || 0.6, 1.2);
        if (weather.current.precipitation < 0.3) weather.current.precipitation = 0.6;
        if (weather.current.rain != null) weather.current.rain = weather.current.precipitation;
        weather.current.cloud_cover = Math.max(weather.current.cloud_cover || 0, 80);
        weather.current.is_radar_rescued = true;
        weather.current.radar_rescue_level = echo.level;
        weather.current.radar_rescue_label = 'Lluvia débil / Orbayu';
      }
    }
  }

  // 2. Verificación de pronóstico horario inmediato (primeras 48 horas)
  if (weather.hourly && weather.hourly.time && consensus.hourly && consensus.hourly.time) {
    const limit = Math.min(weather.hourly.time.length, consensus.hourly.time.length, 48);
    for (let i = 0; i < limit; i++) {
      const rawC = weather.hourly.cloud_cover ? weather.hourly.cloud_cover[i] : 100;
      const ecmwfC = consensus.hourly.cloud_cover ? consensus.hourly.cloud_cover[i] : 0;
      const eDirectIrrH = consensus.hourly.direct_normal_irradiance ? consensus.hourly.direct_normal_irradiance[i] : 0;
      const pop = weather.hourly.precipitation_probability ? (weather.hourly.precipitation_probability[i] || 0) : 0;
      const ePop = consensus.hourly.precipitation_probability ? (consensus.hourly.precipitation_probability[i] || 0) : 0;
      const precip = weather.hourly.precipitation ? (weather.hourly.precipitation[i] || 0) : 0;
      const ePrecipH = consensus.hourly.precipitation ? (consensus.hourly.precipitation[i] || 0) : 0;
      const eCodeH = consensus.hourly.weather_code ? consensus.hourly.weather_code[i] : null;
      const humH = weather.hourly.relative_humidity_2m
        ? weather.hourly.relative_humidity_2m[i]
        : (consensus.hourly.relative_humidity_2m ? consensus.hourly.relative_humidity_2m[i] : 80);

      // A) Armonización de Falso Claro Horario (frentes en avance detectados por ECMWF):
      const isFalseClearH = (rawC <= 15 && ecmwfC >= 16 && (ecmwfC - rawC >= 15)) || (rawC < 50 && ecmwfC >= 40 && (ecmwfC - rawC >= 20));

      if (isFalseClearH) {
        if (weather.hourly.cloud_cover) weather.hourly.cloud_cover[i] = ecmwfC;
        if (weather.hourly.weather_code && consensus.hourly.weather_code) {
          if (weather.hourly.weather_code[i] < 50) weather.hourly.weather_code[i] = consensus.hourly.weather_code[i] < 50 ? consensus.hourly.weather_code[i] : (ecmwfC >= 80 ? 3 : 2);
        }
        if (weather.hourly.direct_normal_irradiance && consensus.hourly.direct_normal_irradiance) {
          weather.hourly.direct_normal_irradiance[i] = consensus.hourly.direct_normal_irradiance[i];
        }
        if (weather.hourly.shortwave_radiation && consensus.hourly.shortwave_radiation) {
          weather.hourly.shortwave_radiation[i] = consensus.hourly.shortwave_radiation[i];
        }
      }

      // A1.1) Rescate Soberano de Cielo Despejado Horario de ECMWF (Ley 27 & Banco de Ventana Caso Real #7):
      const rawCodeH = weather.hourly.weather_code ? weather.hourly.weather_code[i] : null;
      const rawDirectIrrH = weather.hourly.direct_normal_irradiance ? weather.hourly.direct_normal_irradiance[i] : 0;
      const isFalseCloudyIntervalH = (precip < 0.1 && ePrecipH < 0.1) &&
        ecmwfC <= 15 && eCodeH === 0 &&
        (eDirectIrrH >= 150 || rawDirectIrrH >= 150) &&
        (rawC >= 35 || rawCodeH === 2);

      if (isFalseCloudyIntervalH) {
        if (weather.hourly.cloud_cover) weather.hourly.cloud_cover[i] = ecmwfC;
        if (weather.hourly.weather_code) weather.hourly.weather_code[i] = 0;
        if (weather.hourly.direct_normal_irradiance && consensus.hourly.direct_normal_irradiance) {
          weather.hourly.direct_normal_irradiance[i] = consensus.hourly.direct_normal_irradiance[i];
        }
        if (weather.hourly.shortwave_radiation && consensus.hourly.shortwave_radiation) {
          weather.hourly.shortwave_radiation[i] = consensus.hourly.shortwave_radiation[i];
        }
      }

      // A2) Armonización y Rescate de Falso Nublado Horario (Ley 27 & Banco de Ventana Lendo):
      // Si el modelo base se queda "encapotado" al 100% (código 3) pero no llueve en ningún modelo (<0.1 mm)
      // y ECMWF prevé sol/claros con radiación solar directa potente (eDirectIrrH >= 200 W/m² y eCodeH <= 2):
      // SE ADOPTA LA PREVISIÓN SOLEADA REAL DE ECMWF (erradica baches de nubes grises falsas al mediodía).
      const isFalseOvercastH = (precip < 0.1 && ePrecipH < 0.1) && rawC >= 80 && ecmwfC <= 70 && eDirectIrrH >= 200 && eCodeH !== null && eCodeH <= 2;
      if (isFalseOvercastH) {
        if (weather.hourly.cloud_cover) weather.hourly.cloud_cover[i] = ecmwfC;
        if (weather.hourly.weather_code) weather.hourly.weather_code[i] = eCodeH;
        if (weather.hourly.direct_normal_irradiance && consensus.hourly.direct_normal_irradiance) {
          weather.hourly.direct_normal_irradiance[i] = consensus.hourly.direct_normal_irradiance[i];
        }
        if (weather.hourly.shortwave_radiation && consensus.hourly.shortwave_radiation) {
          weather.hourly.shortwave_radiation[i] = consensus.hourly.shortwave_radiation[i];
        }
      }

      // B) Enriquecimiento Probabilístico y de Saturación Horaria (Ensamble Mundial de 51 miembros de ECMWF):
      if (false && weather.hourly.precipitation_probability && ePop > pop) {
        weather.hourly.precipitation_probability[i] = ePop;
      }
      if (weather.hourly.relative_humidity_2m && consensus.hourly.relative_humidity_2m) {
        const eHumH = consensus.hourly.relative_humidity_2m[i] || 0;
        if (eHumH > (weather.hourly.relative_humidity_2m[i] || 0)) {
          weather.hourly.relative_humidity_2m[i] = eHumH;
        }
      }

      // 1. Rescate de Orbayu Fino Real (0.1 - 0.4 mm):
      const isDrizzleRescue = (precip < 0.1 || (precip < 0.5 && eCodeH >= 50 && eCodeH <= 57)) &&
        ((eCodeH >= 51 && eCodeH <= 57) || (ePrecipH >= 0.1 && ePrecipH < 0.5)) &&
        ePrecipH >= 0.1 &&
        (ePop >= 30 || humH >= 78) &&
        (rawC >= 65 || ecmwfC >= 65) &&
        eDirectIrrH < 100;

      // 2. Lluvia Frontal Significativa (>= 0.3 mm):
      const isFrontalRainRescue = precip < 0.2 &&
        (pop >= 45 || ePop >= 45 || ePrecipH >= 0.4) &&
        ePrecipH >= 0.3 &&
        (rawC >= 60 || ecmwfC >= 60) &&
        eDirectIrrH < 100;

      if (weather.hourly.temperature_2m && consensus.hourly.temperature_2m && consensus.hourly.temperature_2m[i] != null && weather.hourly.temperature_2m[i] != null && (weather.hourly.is_day ? weather.hourly.is_day[i] === 0 : true) && (weather.hourly.wind_speed_10m ? (weather.hourly.wind_speed_10m[i] || 0) < 12 : true) && ecmwfC >= 80 && (consensus.hourly.temperature_2m[i] - weather.hourly.temperature_2m[i]) >= 1.5) {
        weather.hourly.temperature_2m[i] = Math.round(((weather.hourly.temperature_2m[i] + consensus.hourly.temperature_2m[i]) / 2) * 10) / 10;
        if (weather.hourly.apparent_temperature && consensus.hourly.apparent_temperature && consensus.hourly.apparent_temperature[i] != null) {
          weather.hourly.apparent_temperature[i] = Math.round(((weather.hourly.apparent_temperature[i] + consensus.hourly.apparent_temperature[i]) / 2) * 10) / 10;
        }
      }
      if (precip >= 0.1 && ePrecipH >= 0.1 && eDirectIrrH < 100) {
        const meanH = Math.round(((precip + ePrecipH) / 2) * 10) / 10;
        if (weather.hourly.precipitation) weather.hourly.precipitation[i] = meanH;
        if (weather.hourly.rain) weather.hourly.rain[i] = meanH;
      } else if (precip < 0.1 && ePrecipH >= 0.4 && ecmwfC >= 80 && eDirectIrrH < 100) {
        const rescuedH = Math.round((ePrecipH * 0.6) * 10) / 10;
        if (weather.hourly.precipitation) weather.hourly.precipitation[i] = rescuedH;
        if (weather.hourly.rain) weather.hourly.rain[i] = rescuedH;
        if (weather.hourly.weather_code && eCodeH) weather.hourly.weather_code[i] = eCodeH >= 50 ? eCodeH : 51;
        if (weather.hourly.precipitation_probability) weather.hourly.precipitation_probability[i] = Math.max(pop, ePop, 50);
        if (weather.hourly.cloud_cover) weather.hourly.cloud_cover[i] = Math.max(rawC, ecmwfC, 80);
      } else if (false && (isDrizzleRescue || isFrontalRainRescue)) {
        if (weather.hourly.precipitation) weather.hourly.precipitation[i] = Math.max(precip, ePrecipH);
        if (weather.hourly.rain) weather.hourly.rain[i] = Math.max(precip, ePrecipH);
        if (weather.hourly.weather_code && eCodeH) {
          weather.hourly.weather_code[i] = eCodeH;
        }
        if (weather.hourly.precipitation_probability) {
          weather.hourly.precipitation_probability[i] = Math.max(pop, ePop, 60);
        }
        if (weather.hourly.cloud_cover) {
          weather.hourly.cloud_cover[i] = Math.max(rawC, ecmwfC, 75);
        }
      }

      // 3. Filtro Anti-Llovizna Fantasma Horaria de AROME:
      const rawHourlyCode = weather.hourly.weather_code ? weather.hourly.weather_code[i] : 0;
      const isSolarHourlyGhost = eDirectIrrH >= 100 && precip > 0 && precip < 0.5 && ePrecipH < 0.1;
      const isPhantomHourlyDrizzle = (precip > 0 && precip < 1.5 &&
        (rawHourlyCode <= 3 || (rawHourlyCode >= 50 && rawHourlyCode <= 57)) &&
        ePrecipH < 0.1 &&
        eCodeH !== null && eCodeH <= 3 &&
        (humH < 86 || eDirectIrrH >= 100) && ePop < 45) || isSolarHourlyGhost;

      if (isSolarHourlyGhost) {
        if (weather.hourly.precipitation) weather.hourly.precipitation[i] = 0;
        if (weather.hourly.rain) weather.hourly.rain[i] = 0;
        if (weather.hourly.weather_code) weather.hourly.weather_code[i] = (eCodeH !== null && eCodeH <= 3) ? eCodeH : 1;
        if (weather.hourly.precipitation_probability) weather.hourly.precipitation_probability[i] = ePop;
      }

      // C) Armonización Horaria de Lluvia Residual:
      const isDryHourly = (weather.hourly.precipitation ? weather.hourly.precipitation[i] : precip) < 0.1 || isSolarHourlyGhost;
      if (isDryHourly && weather.hourly.weather_code && weather.hourly.weather_code[i] >= 50) {
        if (weather.hourly.precipitation && precip < 0.5) weather.hourly.precipitation[i] = 0;
        if (weather.hourly.rain && precip < 0.5) weather.hourly.rain[i] = 0;
        const effectiveC = Math.max(rawC, ecmwfC);
        weather.hourly.weather_code[i] = effectiveC >= 80 ? 3 : (effectiveC >= 40 ? 2 : 1);
      }
    }
  }
}

/**
 * Soberanía Física Inversa Standalone:
 * Garantiza que incluso si el usuario selecciona un modelo numérico individual (sin consenso ECMWF),
 * el sistema nunca muestre cielo 100% cubierto / nublado si los sensores físicos de radiación y UV
 * demuestran insolación directa en superficie en ausencia de precipitación.
 */
function applyStandalonePhysicalSovereignty(weather, radarEcho = null) {
  if (!weather) return;

  // Radar Táctico Soberano en Modo Standalone
  if (radarEcho && radarEcho.hasEcho && radarEcho.echo && radarEcho.echo.isRain && weather.current) {
    const echo = radarEcho.echo;
    const nowHour = new Date().getHours();
    const curCape = (weather.hourly && weather.hourly.cape && weather.hourly.cape[nowHour] != null) ? weather.hourly.cape[nowHour] : 0;
    const isConvectiveStorm = echo.isStorm || (echo.level === 'heavy_rain' && curCape >= 40);
    if (isConvectiveStorm) {
      weather.current.weather_code = 95;
      weather.current.precipitation = Math.max(weather.current.precipitation || 0, echo.precipEst || 15.0);
      if (weather.current.rain != null) weather.current.rain = weather.current.precipitation;
      weather.current.cloud_cover = Math.max(weather.current.cloud_cover || 0, 95);
      weather.current.is_radar_rescued = true;
      weather.current.radar_rescue_level = 'storm';
      weather.current.radar_rescue_label = 'Tormenta / Lluvia torrencial';
    } else if (echo.level === 'heavy_rain' && (weather.current.weather_code <= 3 || weather.current.precipitation < 2.0)) {
      weather.current.weather_code = echo.wmoCode || 81;
      weather.current.precipitation = Math.max(weather.current.precipitation || 0, echo.precipEst || 8.0);
      if (weather.current.rain != null) weather.current.rain = weather.current.precipitation;
      weather.current.cloud_cover = Math.max(weather.current.cloud_cover || 0, 90);
      weather.current.is_radar_rescued = true;
      weather.current.radar_rescue_level = echo.level;
      weather.current.radar_rescue_label = echo.label;
    } else if (echo.level === 'moderate_rain' && (weather.current.weather_code <= 3 || weather.current.precipitation < 1.0)) {
      weather.current.weather_code = echo.wmoCode || 63;
      weather.current.precipitation = Math.max(weather.current.precipitation || 0, echo.precipEst || 4.0);
      if (weather.current.rain != null) weather.current.rain = weather.current.precipitation;
      weather.current.cloud_cover = Math.max(weather.current.cloud_cover || 0, 85);
      weather.current.is_radar_rescued = true;
      weather.current.radar_rescue_level = echo.level;
      weather.current.radar_rescue_label = echo.label;
    } else if (echo.level === 'light_rain') {
      weather.current.weather_code = 61; // Lluvia débil
      weather.current.precipitation = Math.min(weather.current.precipitation || 0.6, 1.2);
      if (weather.current.precipitation < 0.3) weather.current.precipitation = 0.6;
      if (weather.current.rain != null) weather.current.rain = weather.current.precipitation;
      weather.current.cloud_cover = Math.max(weather.current.cloud_cover || 0, 80);
      weather.current.is_radar_rescued = true;
      weather.current.radar_rescue_level = echo.level;
      weather.current.radar_rescue_label = 'Lluvia débil / Orbayu';
    }
  }

  // 0. Sincronización de Nowcasting con la hora en curso:
  // Si el bloque instantáneo 'current' viene rezagado (p < 0.1 y código <= 3) pero el modelo predice
  // para la hora en curso lluvia o llovizna activa (código >= 50 y precip >= 0.1 mm) bajo cielo cubierto y sin sol directo:
  if (weather.current && weather.hourly && weather.hourly.time) {
    const nowHour = new Date().getHours();
    const hPrecip = weather.hourly.precipitation ? (weather.hourly.precipitation[nowHour] || 0) : 0;
    const hCode = weather.hourly.weather_code ? weather.hourly.weather_code[nowHour] : null;
    const curCloud = weather.current.cloud_cover != null ? weather.current.cloud_cover : 100;
    const curDirectIrr = weather.current.direct_normal_irradiance != null ? weather.current.direct_normal_irradiance : 0;

    if (weather.current.precipitation < 0.1 && weather.current.weather_code <= 3 && hCode >= 50 && hPrecip >= 0.1 && curCloud >= 75 && curDirectIrr < 100) {
      weather.current.weather_code = hCode;
      weather.current.precipitation = hPrecip;
      if (weather.current.rain != null) weather.current.rain = hPrecip;
    }
  }

  // 1. En tiempo actual: limpieza de código residual de lluvia sin agua física
  if (weather.current) {
    const rawCloud = weather.current.cloud_cover != null ? weather.current.cloud_cover : 100;
    const rawPrecip = weather.current.precipitation != null ? parseFloat(weather.current.precipitation) : 0;
    const rawDirectIrr = weather.current.direct_normal_irradiance != null ? parseFloat(weather.current.direct_normal_irradiance) : 0;
    const rawUv = weather.current.uv_index != null ? parseFloat(weather.current.uv_index) : 0;
    const rawSw = weather.current.shortwave_radiation != null ? parseFloat(weather.current.shortwave_radiation) : 0;
    const hasSun = rawDirectIrr >= 100 || rawSw >= 200 || rawUv >= 1.2;

    if ((rawPrecip < 0.1 || (hasSun && rawPrecip < 0.5)) && hasSun && weather.current.weather_code >= 50) {
      if (rawPrecip < 0.5) {
        weather.current.precipitation = 0;
        if (weather.current.rain != null) weather.current.rain = 0;
      }
      weather.current.weather_code = rawCloud >= 80 ? 3 : (rawCloud >= 40 ? 2 : 1);
    }
  }

  // 2. En pronóstico horario: limpieza de código residual de lluvia sin agua física
  if (weather.hourly && weather.hourly.time && weather.hourly.weather_code) {
    const limit = Math.min(weather.hourly.time.length, 48);
    for (let i = 0; i < limit; i++) {
      const rawC = weather.hourly.cloud_cover ? weather.hourly.cloud_cover[i] : 100;
      const precip = weather.hourly.precipitation ? (weather.hourly.precipitation[i] || 0) : 0;
      const rawDirectH = weather.hourly.direct_normal_irradiance ? (weather.hourly.direct_normal_irradiance[i] || 0) : 0;
      const rawUvH = weather.hourly.uv_index ? (weather.hourly.uv_index[i] || 0) : 0;
      const rawSwH = weather.hourly.shortwave_radiation ? (weather.hourly.shortwave_radiation[i] || 0) : 0;
      const hasHourlySun = rawDirectH >= 100 || rawSwH >= 200 || rawUvH >= 1.2;

      if ((precip < 0.1 || (hasHourlySun && precip < 0.5)) && hasHourlySun && weather.hourly.weather_code[i] >= 50) {
        if (precip < 0.5) {
          if (weather.hourly.precipitation) weather.hourly.precipitation[i] = 0;
          if (weather.hourly.rain) weather.hourly.rain[i] = 0;
        }
        weather.hourly.weather_code[i] = rawC >= 80 ? 3 : (rawC >= 40 ? 2 : 1);
      }
    }
  }
}

/**
 * Armonización Hidrometeorológica Coherente (QPF-PoP):
 * Filtro de coherencia física y estadística similar al empleado por AccuWeather y eltiempo.es (Pelmorex).
 * Evita la paradoja visual de mostrar 0% de probabilidad cuando el modelo
 * determinista cuantitativo (QPF) prevé lluvia o llovizna apreciable (>= 0.1 mm)
 * o códigos WMO de precipitación activa en Asturias.
 */
function harmonizeWeatherPrecipitation(weather) {
  if (!weather || !weather.hourly || !weather.hourly.time) return;

  const hourly = weather.hourly;
  const hasPop = Array.isArray(hourly.precipitation_probability);
  const hasPrecip = Array.isArray(hourly.precipitation);
  const hasCodes = Array.isArray(hourly.weather_code);

  if (!hasPop || !hasPrecip) return;

  for (let i = 0; i < hourly.time.length; i++) {
    const rawPop = hourly.precipitation_probability[i] || 0;
    const precip = hourly.precipitation[i] || 0;
    const code = hasCodes ? hourly.weather_code[i] : null;

    // Códigos WMO de precipitación: lloviznas, lluvias, nieve, granizo, chubascos, tormentas
    const isPrecipCode = (
      (code >= 51 && code <= 67) ||
      (code >= 71 && code <= 77) ||
      (code >= 80 && code <= 86) ||
      (code >= 95 && code <= 99)
    );

    let minPop = 0;
    if (precip >= 2.0) {
      minPop = 85;
    } else if (precip >= 1.0) {
      minPop = 75;
    } else if (precip >= 0.5) {
      minPop = 65;
    } else if (precip >= 0.2) {
      minPop = 45;
    } else if (precip >= 0.1) {
      minPop = 30;
    } else if (isPrecipCode) {
      minPop = 30;
    }

    if (minPop > 0) {
      hourly.precipitation_probability[i] = Math.max(rawPop, minPop);
    }
  }

  // Sincronizar daily.precipitation_probability_max si existe
  if (weather.daily && Array.isArray(weather.daily.time) && Array.isArray(weather.daily.precipitation_probability_max)) {
    const daily = weather.daily;
    for (let d = 0; d < daily.time.length; d++) {
      const dayDateStr = daily.time[d];
      let dayMaxPop = 0;
      for (let i = 0; i < hourly.time.length; i++) {
        if (hourly.time[i].startsWith(dayDateStr)) {
          const p = hourly.precipitation_probability[i] || 0;
          if (p > dayMaxPop) dayMaxPop = p;
        }
      }
      daily.precipitation_probability_max[d] = Math.max(daily.precipitation_probability_max[d] || 0, dayMaxPop);
    }
  }

  // Sincronización Matemática Integral de Precipitación Diaria (daily.precipitation_sum):
  // Garantiza que el total diario coincida exactamente con la suma discretizada de las 24 horas
  // de hourly.precipitation, resolviendo la discrepancia entre el Pluviómetro, el carrusel de 72h
  // y los tramos de la tarjeta a 10 días (Noche + Mañana + Tarde).
  if (weather.daily && Array.isArray(weather.daily.time) && Array.isArray(weather.daily.precipitation_sum)) {
    const daily = weather.daily;
    for (let d = 0; d < daily.time.length; d++) {
      const dayDateStr = daily.time[d];
      let dayPrecipSum = 0;
      for (let i = 0; i < hourly.time.length; i++) {
        if (hourly.time[i].startsWith(dayDateStr)) {
          dayPrecipSum += (hourly.precipitation[i] || 0);
        }
      }
      daily.precipitation_sum[d] = Math.round(dayPrecipSum * 10) / 10;
      if (d <= 1 && Array.isArray(hourly.temperature_2m) && Array.isArray(daily.temperature_2m_min) && Array.isArray(daily.temperature_2m_max)) {
        const dayTemps = [];
        for (let i = 0; i < hourly.time.length; i++) {
          if (hourly.time[i].startsWith(dayDateStr) && hourly.temperature_2m[i] != null) dayTemps.push(hourly.temperature_2m[i]);
        }
        if (dayTemps.length > 0) {
          daily.temperature_2m_min[d] = Math.min(...dayTemps);
          daily.temperature_2m_max[d] = Math.max(...dayTemps);
        }
      }
    }
  }
}
