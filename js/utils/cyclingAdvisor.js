/**
 * METEOASTUR LODE - Motor Físico y Consejero de Viento Dinámico para Ciclismo
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Cálculo vectorial del viento relativo (en cola, de cara, cruzado),
 * simulación de avance temporal del ciclista y recomendación de rutas según la hora.
 */

/**
 * Calcula la diferencia angular mínima entre dos rumbos en grados (0 a 180°).
 */
export function getAngularDifference(bearingA, bearingB) {
  const diff = Math.abs((bearingA - bearingB + 180) % 360 - 180);
  return Math.round(diff);
}

/**
 * Clasifica el impacto del viento relativo sobre el ciclista en un tramo:
 * - diff <= 45°: Viento en cola / a favor (empuja y ahorra vatios)
 * - diff >= 135°: Viento de cara / en contra (freno aerodinámico frontal)
 * - 45° < diff < 135°: Viento lateral / cruzado (peligro de desestabilización con llantas de perfil)
 */
export function evaluateRelativeWind(cyclistBearingDeg, windDirectionDeg, windSpeedKmh, windGustsKmh = 0) {
  const diff = getAngularDifference(cyclistBearingDeg, windDirectionDeg);

  // Componente efectiva a lo largo del eje de la bicicleta (km/h)
  // cos(0°) = 1 (a favor total), cos(180°) = -1 (de cara total)
  // Como windDirection es de DÓNDE viene el viento:
  // Si viento viene de 180° (Sur) y ciclista va a 0° (Norte), ciclista va hacia el Norte empujado por viento del Sur -> A favor (diff = 180° respecto al origen del viento).
  // Nota física de navegación meteorológica:
  // La dirección del viento (windDirection) indica de DÓNDE SOPLA (ej. 360° = sopla DESDE el norte HACIA el sur).
  // El rumbo del ciclista (cyclistBearing) indica HACIA DÓNDE AVANZA (ej. 180° = va hacia el sur).
  // Por tanto, si viento viene del 360° (Norte) y el ciclista va hacia el 180° (Sur), van en la MISMA dirección (viento de cola).
  // La dirección hacia donde empuja el viento es (windDirection + 180) % 360.
  const windVectorHeading = (windDirectionDeg + 180) % 360;
  const relativeAngle = getAngularDifference(cyclistBearingDeg, windVectorHeading);

  let type = 'crosswind'; // cruzado
  let label = 'Viento Lateral / Cruzado';
  let badgeColor = 'var(--warning, #facc15)';
  let icon = '🟡';
  let desc = 'Sopla de costado. Exige firmeza en el manillar.';

  if (relativeAngle <= 45) {
    type = 'tailwind';
    label = 'Viento a Favor (En Cola)';
    badgeColor = 'var(--success, #22c55e)';
    icon = '🟢';
    desc = 'Empuja por la espalda. Ahorro de vatios y velocidad gratis.';
  } else if (relativeAngle >= 135) {
    type = 'headwind';
    label = 'Viento de Cara (En Contra)';
    badgeColor = 'var(--danger, #ef4444)';
    icon = '🔴';
    desc = 'Freno frontal. Requiere mayor esfuerzo y posición aerodinámica.';
  }

  // Componente longitudinal: positiva si ayuda, negativa si frena
  const effectiveSpeedKmh = Math.round(windSpeedKmh * Math.cos(relativeAngle * Math.PI / 180));

  // Alerta de racha desestabilizadora para ruedas de perfil (> 40mm)
  const isDangerousGust = (windGustsKmh >= 35 || windSpeedKmh >= 25) && (type === 'crosswind');

  return {
    relativeAngle,
    type,
    label,
    icon,
    badgeColor,
    desc,
    effectiveSpeedKmh,
    windSpeedKmh: Math.round(windSpeedKmh),
    windGustsKmh: Math.round(windGustsKmh),
    isDangerousGust
  };
}

/**
 * Simula el paso del ciclista tramo a tramo según su velocidad media y la hora de salida.
 * Extrae las condiciones meteorológicas horarias correspondientes.
 */
export function simulateRouteConditions(route, startHour = 9, avgSpeedKmh = 24, hourlyData = null) {
  if (!route || !route.tramos || route.tramos.length === 0) return null;

  let elapsedMinutes = 0;
  const simulatedTramos = [];
  let totalTailwindKm = 0;
  let totalHeadwindKm = 0;
  let totalCrosswindKm = 0;
  let maxGustKmh = 0;

  // Si no hay datos horarios reales de Open-Meteo, usamos un perfil de referencia neutro
  const times = hourlyData?.time || [];
  const windSpeeds = hourlyData?.wind_speed_10m || [];
  const windDirs = hourlyData?.wind_direction_10m || [];
  const windGusts = hourlyData?.wind_gusts_10m || [];
  const temps = hourlyData?.temperature_2m || [];
  const pops = hourlyData?.precipitation_probability || [];
  const weatherCodes = hourlyData?.weather_code || [];

  route.tramos.forEach((tramo, index) => {
    // Cálculo del tiempo en este tramo: ajusta la velocidad según la pendiente
    // Si sube (> 3%), la velocidad baja; si baja (< -2%), la velocidad sube
    let tramoSpeed = avgSpeedKmh;
    if (tramo.avgGradePct > 6) tramoSpeed = Math.max(10, avgSpeedKmh * 0.5);
    else if (tramo.avgGradePct > 3) tramoSpeed = Math.max(14, avgSpeedKmh * 0.7);
    else if (tramo.avgGradePct < -3) tramoSpeed = Math.min(50, avgSpeedKmh * 1.5);

    const tramoMinutes = Math.round((tramo.km / tramoSpeed) * 60);
    const startMinuteOfTramo = elapsedMinutes;
    const endMinuteOfTramo = elapsedMinutes + tramoMinutes;
    elapsedMinutes = endMinuteOfTramo;

    // Hora del día en la que transcurre el tramo
    const currentSimulatedDecimalHour = startHour + (startMinuteOfTramo / 60);
    const currentHourIndex = Math.min(times.length - 1, Math.max(0, Math.floor(currentSimulatedDecimalHour)));

    // Extraer datos del tramo
    const wSpeed = windSpeeds[currentHourIndex] != null ? windSpeeds[currentHourIndex] : 14;
    const wDir = windDirs[currentHourIndex] != null ? windDirs[currentHourIndex] : 45;
    const wGust = windGusts[currentHourIndex] != null ? windGusts[currentHourIndex] : wSpeed * 1.4;
    const temp = temps[currentHourIndex] != null ? temps[currentHourIndex] : 15;
    const pop = pops[currentHourIndex] != null ? pops[currentHourIndex] : 10;
    const code = weatherCodes[currentHourIndex] != null ? weatherCodes[currentHourIndex] : 1;

    // Ajuste térmico por altitud (gradiente adiabático: ~0.65 °C por cada 100 m)
    const baseAlt = 50;
    const altDiffM = Math.max(0, (tramo.endAlt || 100) - baseAlt);
    const tramoTemp = Math.round((temp - (altDiffM * 0.0065)) * 10) / 10;

    const windEval = evaluateRelativeWind(tramo.bearingDeg, wDir, wSpeed, wGust);

    if (windEval.type === 'tailwind') totalTailwindKm += tramo.km;
    else if (windEval.type === 'headwind') totalHeadwindKm += tramo.km;
    else totalCrosswindKm += tramo.km;

    if (windEval.windGustsKmh > maxGustKmh) maxGustKmh = windEval.windGustsKmh;

    const formatHourMin = (totalMin) => {
      const h = Math.floor(totalMin / 60) % 24;
      const m = Math.floor(totalMin % 60);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    simulatedTramos.push({
      ...tramo,
      tramoSpeedKmh: Math.round(tramoSpeed),
      estimatedStartHour: formatHourMin(startHour * 60 + startMinuteOfTramo),
      estimatedEndHour: formatHourMin(startHour * 60 + endMinuteOfTramo),
      temp: tramoTemp,
      pop,
      weatherCode: code,
      wind: windEval
    });
  });

  const totalDistanceKm = route.distanceKm;
  const tailwindPct = Math.round((totalTailwindKm / totalDistanceKm) * 100);
  const headwindPct = Math.round((totalHeadwindKm / totalDistanceKm) * 100);
  const crosswindPct = Math.round((totalCrosswindKm / totalDistanceKm) * 100);

  // Puntuación de confort ciclista (0 a 100):
  // Bonifica viento a favor (+), penaliza viento en contra (-) y ráfagas fuertes
  let score = 75 + (tailwindPct * 0.25) - (headwindPct * 0.35);
  if (maxGustKmh >= 40) score -= 20;
  else if (maxGustKmh >= 30) score -= 10;
  score = Math.max(10, Math.min(100, Math.round(score)));

  // Calificación cualitativa
  let badgeLabel = 'Favorable';
  let badgeColor = 'var(--success, #22c55e)';
  if (score >= 80) {
    badgeLabel = 'Óptima 🚀';
    badgeColor = 'var(--success, #22c55e)';
  } else if (score >= 60) {
    badgeLabel = 'Buena 👍';
    badgeColor = 'var(--primary, #38bdf8)';
  } else if (score >= 45) {
    badgeLabel = 'Exigente ⚠️';
    badgeColor = 'var(--warning, #facc15)';
  } else {
    badgeLabel = 'Desfavorable 🛑';
    badgeColor = 'var(--danger, #ef4444)';
  }

  // Generación de consejo inteligente personalizado
  let advisorMessage = '';
  if (headwindPct > 50) {
    advisorMessage = `Ruta con viento en contra predominante (${headwindPct}% del trayecto). Te exigirá un alto gasto de vatios.`;
  } else if (tailwindPct > 45) {
    advisorMessage = `Excelente elección para salir a las ${startHour}:00 h: disfrutarás de viento a favor durante el ${tailwindPct}% de la ruta.`;
  } else if (crosswindPct > 50) {
    advisorMessage = `Predomina el viento lateral (${crosswindPct}%). Precaución en bajadas rápidas si montas ruedas de perfil.`;
  } else {
    advisorMessage = `Condiciones equilibradas para rodar con salida a las ${startHour}:00 h. Ritmo cómodo y viento moderado.`;
  }

  const formatTotalTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}min` : `${m} min`;
  };

  return {
    routeId: route.id,
    startHour,
    totalDurationFormatted: formatTotalTime(elapsedMinutes),
    totalDurationMinutes: elapsedMinutes,
    avgSpeedKmh,
    score,
    badgeLabel,
    badgeColor,
    advisorMessage,
    tailwindPct,
    headwindPct,
    crosswindPct,
    maxGustKmh,
    tramos: simulatedTramos
  };
}

/**
 * Compara y ordena un conjunto de rutas para recomendar cuál es la mejor a una hora concreta.
 */
export function rankRoutesForDeparture(routes, startHour = 9, avgSpeedKmh = 24, hourlyData = null) {
  if (!routes || routes.length === 0) return [];

  const ranked = routes.map(route => {
    const simulation = simulateRouteConditions(route, startHour, avgSpeedKmh, hourlyData);
    return {
      route,
      simulation
    };
  });

  // Ordenar de mayor a menor puntuación ciclista
  ranked.sort((a, b) => (b.simulation?.score || 0) - (a.simulation?.score || 0));
  return ranked;
}

