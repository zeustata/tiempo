/**
 * Motor inteligente de detección de alertas y avisos meteorológicos para Asturias
 */
export function detectWeatherAlerts(weatherData, concejo) {
  const current = weatherData.weather.current;
  const hourly = weatherData.weather.hourly;
  const daily = weatherData.weather.daily;
  const marine = weatherData.marine?.current;
  const alerts = [];

  const windSpeed = current.wind_speed_10m;
  const windGusts = current.wind_gusts_10m;
  const windDir = current.wind_direction_10m;
  const temp = current.temperature_2m;
  const rainSum = daily.precipitation_sum ? daily.precipitation_sum[0] : 0;
  const waveHeight = marine ? marine.wave_height : 0;
  const isCoast = concejo.type === 'coast' || concejo.region.includes('Costa');

  // 1. Efecto Föhn / Vientu del Sur
  const isSouth = (windDir >= 140 && windDir <= 230);
  if (isSouth && windGusts >= 45) {
    alerts.push({
      id: 'south_wind',
      level: windGusts >= 75 ? 'orange' : 'yellow',
      icon: '🔥',
      title: 'Aviso: Efecto Föhn / Vientu del Sur',
      desc: `Rachas de viento sur de hasta ${Math.round(windGusts)} km/h. Provoca ambiente seco, altas temperaturas y riesgo en zonas altas.`
    });
  }

  // 2. Temporal Costero y Oleaje en el Cantábrico
  if (isCoast && (waveHeight >= 3.5 || windGusts >= 65)) {
    alerts.push({
      id: 'coastal_storm',
      level: waveHeight >= 5.0 || windGusts >= 85 ? 'orange' : 'yellow',
      icon: '🌊',
      title: 'Aviso por Fenómenos Costeros en el Cantábrico',
      desc: `Oleaje significativo de ${waveHeight.toFixed(1)} m y rachas de ${Math.round(windGusts)} km/h. Precaución extrema en paseos marítimos y espigones.`
    });
  }

  // 3. Lluvia Intensa / Bastinazu
  if (rainSum >= 30 || current.precipitation >= 12) {
    alerts.push({
      id: 'heavy_rain',
      level: rainSum >= 60 || current.precipitation >= 20 ? 'orange' : 'yellow',
      icon: '🌧️',
      title: 'Aviso por Lluvias Intensas y Acumuladas',
      desc: `Precipitación prevista de ${rainSum.toFixed(1)} mm. Posibles crecidas en cuencas fluviales asturianas.`
    });
  }

  // 4. Nieve y Heladas en Cotas Bajas
  const currentHour = new Date().getHours();
  const freezingLevel = hourly.freezing_level_height ? hourly.freezing_level_height[currentHour] : 2000;
  if (freezingLevel <= 900 && (rainSum > 0 || current.precipitation > 0)) {
    alerts.push({
      id: 'snow_risk',
      level: freezingLevel <= 600 ? 'orange' : 'yellow',
      icon: '❄️',
      title: 'Aviso por Cota de Nieve Baja',
      desc: `Cota de nieve descendiendo a ${Math.round(freezingLevel)} metros. Precaución en la red de puertos de montaña de Asturias.`
    });
  }

  // 5. Rachas de Viento Huracanado en Cumbres
  if (windGusts >= 70 && concejo.altitude >= 500) {
    alerts.push({
      id: 'high_wind',
      level: windGusts >= 90 ? 'orange' : 'yellow',
      icon: '💨',
      title: 'Aviso por Viento Fuerte en Zonas Altas',
      desc: `Rachas máximas de ${Math.round(windGusts)} km/h en zonas de montaña.`
    });
  }

  return alerts;
}
