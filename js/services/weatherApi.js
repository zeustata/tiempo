/**
 * Servicio de datos meteorológicos, marinos y de calidad del aire con Open-Meteo
 */
export async function fetchWeatherData(lat, lon, isCoast = false) {
  try {
    // 1. Meteorología Completa de Alta Resolución
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,is_day,freezing_level_height&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&timezone=Europe%2FMadrid&forecast_days=10`;

    const weatherPromise = fetch(weatherUrl).then(r => {
      if (!r.ok) throw new Error('Error al consultar datos meteorológicos');
      return r.json();
    });

    // 2. Calidad del Aire
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,pm10,pm2_5,nitrogen_dioxide,ozone,sulphur_dioxide&timezone=Europe%2FMadrid`;
    const aqiPromise = fetch(aqiUrl).then(r => r.json()).catch(() => null);

    // 3. Datos Marinos si es zona costera
    let marinePromise = Promise.resolve(null);
    if (isCoast) {
      const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period&hourly=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_period&timezone=Europe%2FMadrid`;
      marinePromise = fetch(marineUrl).then(r => r.json()).catch(() => null);
    }

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