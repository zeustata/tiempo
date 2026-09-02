/**
 * Catálogo Oficial de Modelos Meteorológicos de Alta Resolución
 */
export const WEATHER_MODELS = [
  {
    id: 'best_match',
    apiModel: '',
    name: 'Auto Multi-Modelo',
    agency: 'Combinación Óptima Multi-Fuente',
    flag: '🌟',
    resolution: '1 - 3 km',
    tag: 'Recomendado',
    description: 'Algoritmo inteligente que selecciona y combina automáticamente el mejor modelo meteorológico para cada punto de Asturias.',
    bestFor: 'Máxima precisión general y uso diario.'
  },
  {
    id: 'ecmwf_ifs025',
    apiModel: 'ecmwf_ifs025',
    name: 'ECMWF IFS',
    agency: 'Centro Europeo de Predicción (Reading)',
    flag: '🇪🇺',
    resolution: '9 km',
    tag: 'Referencia Mundial',
    description: 'El modelo numérico global más prestigioso, robusto y fiable del mundo para medio y corto plazo.',
    bestFor: 'Evolución de frentes atlánticos, presiones y tendencias semanales.'
  },
  {
    id: 'meteofrance_seamless',
    apiModel: 'meteofrance_seamless',
    name: 'AROME Cantábrico',
    agency: 'Météo-France',
    flag: '🇫🇷',
    resolution: '1.3 km',
    tag: 'Hiper-resolución',
    description: 'Modelo de altísima resolución adaptado al Cantábrico. Modela con enorme fidelidad microclimas, valles y brisas de costa.',
    bestFor: 'Valles profundos, cordillera asturiana y microclimas de costa.'
  },
  {
    id: 'icon_seamless',
    apiModel: 'icon_seamless',
    name: 'DWD ICON-EU',
    agency: 'Servicio Alemán (DWD)',
    flag: '🇩🇪',
    resolution: '7 km',
    tag: 'Rápida Actualización',
    description: 'Modelo europeo de alta frecuencia con excelente tratamiento de nubosidad, chubascos y rachas de viento.',
    bestFor: 'Llegada de borrascas, chubascos repentinos y viento.'
  },
  {
    id: 'gfs_seamless',
    apiModel: 'gfs_seamless',
    name: 'NOAA GFS',
    agency: 'NOAA (Estados Unidos)',
    flag: '🇺🇸',
    resolution: '13 km',
    tag: 'Global Clásico',
    description: 'El modelo numérico global de referencia de la Administración Nacional Oceánica y Atmosférica de EE. UU.',
    bestFor: 'Comparativa sinóptica y contraste internacional.'
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
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,is_day,freezing_level_height&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=Europe%2FMadrid&forecast_days=10${modelQuery}`;

    const weatherPromise = fetch(weatherUrl).then(r => {
      if (!r.ok) throw new Error('Error al consultar datos meteorológicos');
      return r.json();
    });

    // 2. Calidad del Aire
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm10,pm2_5,nitrogen_dioxide,ozone,sulphur_dioxide&timezone=Europe%2FMadrid`;
    const aqiPromise = fetch(aqiUrl).then(r => r.json()).catch(() => null);

    // 3. Datos Marinos y Temperatura del Agua (en costa o referencia cantábrica)
    const marineLat = isCoast ? lat : 43.58;
    const marineLon = lon;
    const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${marineLat}&longitude=${marineLon}&current=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,secondary_swell_wave_height,secondary_swell_wave_direction,secondary_swell_wave_period,sea_surface_temperature&hourly=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,secondary_swell_wave_height,secondary_swell_wave_direction,secondary_swell_wave_period&timezone=Europe%2FMadrid`;
    const marinePromise = fetch(marineUrl).then(r => r.json()).catch(() => null);

    const [weather, aqi, marine] = await Promise.all([weatherPromise, aqiPromise, marinePromise]);

    return {
      success: true,
      weather,
      aqi,
      marine,
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