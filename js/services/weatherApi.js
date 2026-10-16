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
    description: 'Algoritmo inteligente de consenso cantábrico con soberanía de AROME (1.3 km) en tiempo real y protección contra falsos claros costeros de ECMWF.',
    bestFor: 'Máxima fidelidad en costa y valles con protección estricta anti-orballu fantasma.'
  },
  {
    id: 'ecmwf_ifs025',
    apiModel: 'ecmwf_ifs025',
    name: 'ECMWF IFS (Europa)',
    agency: 'Centro Europeo de Predicción a Plazo Medio',
    flag: '🇪🇺',
    resolution: '9 km',
    tag: 'Referencia Mundial',
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
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,direct_normal_irradiance,uv_index,shortwave_radiation&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,is_day,freezing_level_height&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=Europe%2FMadrid&forecast_days=10${modelQuery}`;

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
      ? fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,cloud_cover,direct_normal_irradiance,shortwave_radiation,precipitation,relative_humidity_2m&hourly=weather_code,cloud_cover,direct_normal_irradiance,shortwave_radiation,precipitation,rain,precipitation_probability,relative_humidity_2m&models=ecmwf_ifs025&timezone=Europe%2FMadrid&forecast_days=2`)
          .then(r => r.ok ? r.json() : null)
          .catch(() => null)
      : Promise.resolve(null);

    // 5. Avisos Oficiales AEMET (desde JSON estático actualizado por GitHub Actions)
    const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const alertsUrl = isLocalhost 
      ? 'data/avisos-asturias.json' 
      : 'https://raw.githubusercontent.com/zeustata/tiempo/data/data/avisos-asturias.json';
      
    const aemetAlertsPromise = fetch(alertsUrl)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null);

    const [weather, aqi, marine, consensus, aemetAlerts] = await Promise.all([weatherPromise, aqiPromise, marinePromise, consensusPromise, aemetAlertsPromise]);

    if (weather) {
      if (consensus) {
        applyCantabricoConsensus(weather, consensus);
      } else {
        applyStandalonePhysicalSovereignty(weather);
      }
      harmonizeWeatherPrecipitation(weather);
    }

    return {
      success: true,
      weather,
      aqi,
      marine,
      aemetAlerts,
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
function applyCantabricoConsensus(weather, consensus) {
  if (!weather || !consensus) return;

  // 1. Verificación del tiempo actual en vivo
  if (weather.current && consensus.current) {
    const rawCloud = weather.current.cloud_cover != null ? weather.current.cloud_cover : 100;
    const ecmwfCloud = consensus.current.cloud_cover != null ? consensus.current.cloud_cover : 0;
    const rawDirectIrr = weather.current.direct_normal_irradiance != null ? parseFloat(weather.current.direct_normal_irradiance) : 0;
    const rawUv = weather.current.uv_index != null ? parseFloat(weather.current.uv_index) : 0;
    const rawSw = weather.current.shortwave_radiation != null ? parseFloat(weather.current.shortwave_radiation) : 0;

    // SOBERANÍA SOLAR FÍSICA INQUEBRANTABLE EN TIEMPO ACTUAL:
    // Si los sensores y el modelo de alta resolución detectan haz solar directo real (radiación directa >= 100 W/m²,
    // radiación global >= 200 W/m² o UV >= 1.0), es físicamente imposible que haya un cielo 100% encapotado.
    // Prohibido clasificar como "falso claro" si hay radiación solar activa verificable.
    const hasActiveSunlight = rawDirectIrr >= 100 || rawSw >= 200 || rawUv >= 1.0;

    // A) Solo se corrige el falso claro si no hay sol directo activo, ECMWF constata un manto cerrado (>= 80%) y la divergencia es masiva (>= 35%)
    const isFalseClear = !hasActiveSunlight && rawCloud < 50 && ecmwfCloud >= 80 && (ecmwfCloud - rawCloud >= 35);

    if (isFalseClear) {
      weather.current.cloud_cover = ecmwfCloud;
      if (consensus.current.weather_code != null) {
        weather.current.weather_code = consensus.current.weather_code;
      }
      if (consensus.current.direct_normal_irradiance != null) {
        weather.current.direct_normal_irradiance = consensus.current.direct_normal_irradiance;
      }
      if (consensus.current.shortwave_radiation != null) {
        weather.current.shortwave_radiation = consensus.current.shortwave_radiation;
      }
    }

    // B) Rescate de Orbayu Cantábrico Real en tiempo actual:
    const rawPrecip = weather.current.precipitation != null ? parseFloat(weather.current.precipitation) : 0;
    const ePrecip = consensus.current.precipitation != null ? parseFloat(consensus.current.precipitation) : 0;
    const eCode = consensus.current.weather_code != null ? parseInt(consensus.current.weather_code, 10) : 0;
    const hum = weather.current.relative_humidity_2m != null 
      ? parseFloat(weather.current.relative_humidity_2m) 
      : (consensus.current.relative_humidity_2m != null ? parseFloat(consensus.current.relative_humidity_2m) : 0);
    const eDirectIrr = consensus.current.direct_normal_irradiance != null ? parseFloat(consensus.current.direct_normal_irradiance) : 0;

    const isCurrentDrizzleRescue = rawPrecip < 0.1 &&
      ((eCode >= 51 && eCode <= 57) || (ePrecip >= 0.1 && ePrecip < 0.5)) &&
      ePrecip >= 0.1 &&
      hum >= 86 &&
      (rawCloud >= 80 || ecmwfCloud >= 80) &&
      !hasActiveSunlight &&
      eDirectIrr < 100;

    if (isCurrentDrizzleRescue) {
      weather.current.precipitation = ePrecip;
      if (weather.current.rain != null) weather.current.rain = ePrecip;
      weather.current.weather_code = (eCode >= 50 && eCode <= 67) ? eCode : 51;
      if (ecmwfCloud > rawCloud) weather.current.cloud_cover = ecmwfCloud;
    }

    // C) SOBERANÍA FÍSICA INVERSA (Anti-Falso Nublado / Estratos Matinales Disipados):
    // Si el modelo numérico crudo marca cielo cubierto (código 3 o nubes >= 75%) pero NO hay precipitación activa,
    // y la física constata insolación directa (UV >= 1.2 o Radiación Directa >= 100 W/m² o Radiación Global >= 200 W/m²):
    // Es físicamente imposible un cielo 100% encapotado. Se corrige la nubosidad y el código a soleado/despejado.
    const isDryCurrent = rawPrecip < 0.1 && ePrecip < 0.1;
    const isFalseOvercast = isDryCurrent && hasActiveSunlight && (weather.current.weather_code === 3 || rawCloud >= 75);

    if (isFalseOvercast) {
      let targetCloud = rawCloud;
      if (ecmwfCloud < rawCloud && ecmwfCloud <= 65) {
        targetCloud = ecmwfCloud;
      } else if (rawDirectIrr >= 250 || rawUv >= 2.0) {
        targetCloud = 15;
      } else {
        targetCloud = 35;
      }
      weather.current.cloud_cover = targetCloud;
      weather.current.weather_code = targetCloud <= 20 ? 0 : (targetCloud <= 50 ? 1 : 2);
    }
  }

  // 2. Verificación de pronóstico horario inmediato (primeras 48 horas)
  if (weather.hourly && weather.hourly.time && consensus.hourly && consensus.hourly.time) {
    const limit = Math.min(weather.hourly.time.length, consensus.hourly.time.length, 48);
    for (let i = 0; i < limit; i++) {
      // A) Armonización de falso claro (únicamente bajo cobertura masiva de ECMWF >= 80%)
      const rawC = weather.hourly.cloud_cover ? weather.hourly.cloud_cover[i] : 100;
      const ecmwfC = consensus.hourly.cloud_cover ? consensus.hourly.cloud_cover[i] : 0;
      if (rawC < 50 && ecmwfC >= 80 && (ecmwfC - rawC >= 35)) {
        if (weather.hourly.cloud_cover) weather.hourly.cloud_cover[i] = ecmwfC;
        if (weather.hourly.weather_code && consensus.hourly.weather_code) {
          weather.hourly.weather_code[i] = consensus.hourly.weather_code[i];
        }
        if (weather.hourly.direct_normal_irradiance && consensus.hourly.direct_normal_irradiance) {
          weather.hourly.direct_normal_irradiance[i] = consensus.hourly.direct_normal_irradiance[i];
        }
        if (weather.hourly.shortwave_radiation && consensus.hourly.shortwave_radiation) {
          weather.hourly.shortwave_radiation[i] = consensus.hourly.shortwave_radiation[i];
        }
      }

      // B) Armonización y Rescate de Orbayu Real / Lluvia Frontal:
      const pop = weather.hourly.precipitation_probability ? (weather.hourly.precipitation_probability[i] || 0) : 0;
      const ePop = consensus.hourly.precipitation_probability ? (consensus.hourly.precipitation_probability[i] || 0) : 0;
      const precip = weather.hourly.precipitation ? (weather.hourly.precipitation[i] || 0) : 0;
      const ePrecip = consensus.hourly.precipitation ? (consensus.hourly.precipitation[i] || 0) : 0;
      const eCode = consensus.hourly.weather_code ? consensus.hourly.weather_code[i] : null;
      const hum = weather.hourly.relative_humidity_2m 
        ? weather.hourly.relative_humidity_2m[i] 
        : (consensus.hourly.relative_humidity_2m ? consensus.hourly.relative_humidity_2m[i] : 80);
      const eDirectIrr = consensus.hourly.direct_normal_irradiance ? consensus.hourly.direct_normal_irradiance[i] : 0;

      // 1. Rescate de Orbayu Fino Real (0.1 - 0.4 mm):
      // Si AROME marca seco pero ECMWF ve llovizna con ensamble (PoP >= 40%), humedad >= 86%,
      // cielo cubierto (>= 80%) y sin haz solar directo en ECMWF (< 100 W/m²).
      const isDrizzleRescue = precip < 0.1 &&
        ((eCode >= 51 && eCode <= 57) || (ePrecip >= 0.1 && ePrecip < 0.5)) &&
        ePrecip >= 0.1 &&
        ePop >= 40 &&
        hum >= 86 &&
        (rawC >= 80 || ecmwfC >= 80) &&
        eDirectIrr < 100;

      // 2. Lluvia Frontal Significativa (>= 0.5 mm):
      // Si el ensamble ve lluvia clara (PoP >= 60% en AROME o ECMWF), acumulación >= 0.5 mm y nubosidad >= 60%.
      const isFrontalRainRescue = precip < 0.1 &&
        (pop >= 60 || ePop >= 60) &&
        ePrecip >= 0.5 &&
        (rawC >= 60 || ecmwfC >= 60);

      if (isDrizzleRescue || isFrontalRainRescue) {
        if (weather.hourly.precipitation) weather.hourly.precipitation[i] = ePrecip;
        if (weather.hourly.rain) weather.hourly.rain[i] = ePrecip;
        if (weather.hourly.weather_code && (weather.hourly.weather_code[i] < 50) && eCode) {
          weather.hourly.weather_code[i] = eCode;
        }
        if (weather.hourly.precipitation_probability) {
          weather.hourly.precipitation_probability[i] = Math.max(pop, ePop);
        }
      }

      // C) Anti-Falso Nublado Horario (Soberanía Física Inversa):
      const eDirectH = consensus.hourly.direct_normal_irradiance ? (consensus.hourly.direct_normal_irradiance[i] || 0) : 0;
      const rawDirectH = weather.hourly.direct_normal_irradiance ? (weather.hourly.direct_normal_irradiance[i] || 0) : 0;
      const rawUvH = weather.hourly.uv_index ? (weather.hourly.uv_index[i] || 0) : 0;
      const rawSwH = weather.hourly.shortwave_radiation ? (weather.hourly.shortwave_radiation[i] || 0) : 0;
      const hasHourlySun = rawDirectH >= 100 || eDirectH >= 100 || rawSwH >= 200 || rawUvH >= 1.2;
      const isDryHourly = precip < 0.1 && ePrecip < 0.1;

      if (isDryHourly && hasHourlySun && weather.hourly.weather_code && (weather.hourly.weather_code[i] === 3 || rawC >= 75)) {
        let targetHourlyCloud = rawC;
        if (ecmwfC < rawC && ecmwfC <= 65) {
          targetHourlyCloud = ecmwfC;
        } else if (rawDirectH >= 250 || rawUvH >= 2.0) {
          targetHourlyCloud = 15;
        } else {
          targetHourlyCloud = 35;
        }
        if (weather.hourly.cloud_cover) weather.hourly.cloud_cover[i] = targetHourlyCloud;
        weather.hourly.weather_code[i] = targetHourlyCloud <= 20 ? 0 : (targetHourlyCloud <= 50 ? 1 : 2);
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
function applyStandalonePhysicalSovereignty(weather) {
  if (!weather) return;

  // 1. En tiempo actual
  if (weather.current) {
    const rawCloud = weather.current.cloud_cover != null ? weather.current.cloud_cover : 100;
    const rawPrecip = weather.current.precipitation != null ? parseFloat(weather.current.precipitation) : 0;
    const rawDirectIrr = weather.current.direct_normal_irradiance != null ? parseFloat(weather.current.direct_normal_irradiance) : 0;
    const rawUv = weather.current.uv_index != null ? parseFloat(weather.current.uv_index) : 0;
    const rawSw = weather.current.shortwave_radiation != null ? parseFloat(weather.current.shortwave_radiation) : 0;
    const hasSun = rawDirectIrr >= 100 || rawSw >= 200 || rawUv >= 1.2;

    if (rawPrecip < 0.1 && hasSun && (weather.current.weather_code === 3 || rawCloud >= 75)) {
      const targetCloud = (rawDirectIrr >= 250 || rawUv >= 2.0) ? 15 : 35;
      weather.current.cloud_cover = targetCloud;
      weather.current.weather_code = targetCloud <= 20 ? 0 : (targetCloud <= 50 ? 1 : 2);
    }
  }

  // 2. En pronóstico horario
  if (weather.hourly && weather.hourly.time && weather.hourly.weather_code) {
    const limit = Math.min(weather.hourly.time.length, 48);
    for (let i = 0; i < limit; i++) {
      const rawC = weather.hourly.cloud_cover ? weather.hourly.cloud_cover[i] : 100;
      const precip = weather.hourly.precipitation ? (weather.hourly.precipitation[i] || 0) : 0;
      const rawDirectH = weather.hourly.direct_normal_irradiance ? (weather.hourly.direct_normal_irradiance[i] || 0) : 0;
      const rawUvH = weather.hourly.uv_index ? (weather.hourly.uv_index[i] || 0) : 0;
      const rawSwH = weather.hourly.shortwave_radiation ? (weather.hourly.shortwave_radiation[i] || 0) : 0;
      const hasHourlySun = rawDirectH >= 100 || rawSwH >= 200 || rawUvH >= 1.2;

      if (precip < 0.1 && hasHourlySun && (weather.hourly.weather_code[i] === 3 || rawC >= 75)) {
        const targetCloud = (rawDirectH >= 250 || rawUvH >= 2.0) ? 15 : 35;
        if (weather.hourly.cloud_cover) weather.hourly.cloud_cover[i] = targetCloud;
        weather.hourly.weather_code[i] = targetCloud <= 20 ? 0 : (targetCloud <= 50 ? 1 : 2);
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
}