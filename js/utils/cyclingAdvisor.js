/**
 * METEOASTUR LODE - Motor Físico y Consejero Climático Dinámico para Ciclismo
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Cálculo vectorial del viento relativo (en cola, de cara, cruzado),
 * impacto de lluvia, orbayu, tormenta, nieve/frío húmedo en descensos,
 * simulación de avance temporal del ciclista y recomendación de rutas.
 */

const WMO_THUNDER_CODES = new Set([95, 96, 99]);
const WMO_SNOW_ICE_CODES = new Set([56, 57, 66, 67, 71, 73, 75, 77, 85, 86]);
const WMO_HEAVY_RAIN_CODES = new Set([63, 65, 81, 82]);
const WMO_MODERATE_RAIN_CODES = new Set([61, 80]);
const WMO_DRIZZLE_CODES = new Set([51, 53, 55]);

/**
 * Clasifica la precipitación y estado del firme para un tramo horario concreto.
 */
function evaluateTramoWeather(pop = 0, precipMm = 0, snowCm = 0, code = 1, tramoTemp = 15) {
  const hasThunder = WMO_THUNDER_CODES.has(code);
  const hasSnowOrIce = WMO_SNOW_ICE_CODES.has(code) || snowCm > 0.05;
  const isHeavyRain = !hasSnowOrIce && (precipMm >= 2.0 || (WMO_HEAVY_RAIN_CODES.has(code) && precipMm >= 0.8));
  const isModerateRain = !hasSnowOrIce && !isHeavyRain && (
    precipMm >= 0.4 ||
    (WMO_MODERATE_RAIN_CODES.has(code) && pop >= 45) ||
    (WMO_HEAVY_RAIN_CODES.has(code) && pop >= 40) ||
    (pop >= 70 && precipMm >= 0.2)
  );
  const isLightRain = !hasSnowOrIce && !isHeavyRain && !isModerateRain && (
    precipMm >= 0.1 ||
    (WMO_DRIZZLE_CODES.has(code) && pop >= 35) ||
    (WMO_MODERATE_RAIN_CODES.has(code) && pop >= 35) ||
    pop >= 55
  );
  const isWet = hasThunder || hasSnowOrIce || isHeavyRain || isModerateRain || isLightRain;
  const isColdWetRisk = isWet && tramoTemp <= 4;

  let rainLabel = '☀️ Seco';
  let rainColor = 'var(--success, #22c55e)';

  if (hasThunder) {
    rainLabel = '⛈️ Tormenta';
    rainColor = 'var(--danger, #ef4444)';
  } else if (hasSnowOrIce) {
    rainLabel = '❄️ Nieve / Hielo';
    rainColor = 'var(--danger, #ef4444)';
  } else if (isHeavyRain) {
    rainLabel = `🌧️ Lluvia fuerte (${precipMm.toFixed(1)} mm/h)`;
    rainColor = 'var(--danger, #ef4444)';
  } else if (isModerateRain) {
    rainLabel = precipMm > 0
      ? `🌧️ Lluvia (${precipMm.toFixed(1)} mm/h)`
      : `🌧️ Lluvia (${pop}%)`;
    rainColor = '#f59e0b';
  } else if (isLightRain) {
    rainLabel = precipMm >= 0.1
      ? `🌦️ Orbayu (${precipMm.toFixed(1)} mm/h)`
      : `🌦️ Orbayu / Húmedo (${pop}%)`;
    rainColor = 'var(--primary, #38bdf8)';
  } else if (pop >= 25) {
    rainLabel = `☁️ Riesgo leve (${pop}%)`;
    rainColor = 'var(--text-dim, #94a3b8)';
  }

  return {
    hasThunder,
    hasSnowOrIce,
    isHeavyRain,
    isModerateRain,
    isLightRain,
    isWet,
    isColdWetRisk,
    rainLabel,
    rainColor
  };
}

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
  // Nota física de navegación meteorológica:
  // windDirection indica de DÓNDE SOPLA (ej. 360° = sopla DESDE el norte HACIA el sur).
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
 * Extrae las condiciones meteorológicas horarias correspondientes en tiempo real.
 */
export function simulateRouteConditions(route, startHour = 9, avgSpeedKmh = 24, hourlyData = null, selectedDay = 'today') {
  if (!route || !route.tramos || route.tramos.length === 0) return null;

  let elapsedMinutes = 0;
  const simulatedTramos = [];
  let totalTailwindKm = 0;
  let totalHeadwindKm = 0;
  let totalCrosswindKm = 0;
  let totalWetKm = 0;
  let totalHeavyRainKm = 0;
  let maxGustKmh = 0;
  let maxPop = 0;
  let maxPrecipMm = 0;
  let totalEstRainMm = 0;
  let hasThunder = false;
  let hasSnowOrIce = false;
  let hasColdWetRisk = false;
  let minTramoTemp = 99;

  // Variables de desglose táctico Ida vs Vuelta
  let idaKm = 0, idaElev = 0, idaTailwindKm = 0, idaHeadwindKm = 0, idaCrosswindKm = 0, idaStartMin = -1, idaEndMin = 0, idaTemps = [], idaWinds = [], idaMaxPop = 0, idaMaxMm = 0;
  let vueltaKm = 0, vueltaElev = 0, vueltaTailwindKm = 0, vueltaHeadwindKm = 0, vueltaCrosswindKm = 0, vueltaStartMin = -1, vueltaEndMin = 0, vueltaTemps = [], vueltaWinds = [], vueltaMaxPop = 0, vueltaMaxMm = 0;

  // Si no hay datos horarios reales de Open-Meteo, usamos un perfil de referencia neutro
  const times = hourlyData?.time || [];
  const windSpeeds = hourlyData?.wind_speed_10m || [];
  const windDirs = hourlyData?.wind_direction_10m || [];
  const windGusts = hourlyData?.wind_gusts_10m || [];
  const temps = hourlyData?.temperature_2m || [];
  const pops = hourlyData?.precipitation_probability || [];
  const precips = hourlyData?.precipitation || hourlyData?.rain || [];
  const snowfalls = hourlyData?.snowfall || [];
  const weatherCodes = hourlyData?.weather_code || [];

  // Inteligencia de proyección horaria:
  // Si se selecciona 'tomorrow' (o son más de las 19h y no se especifica), se proyecta a +24h en array Open-Meteo.
  const now = new Date();
  const currentHour = now.getHours();
  let dayOffsetHours = 0;
  if (selectedDay === 'tomorrow') {
    dayOffsetHours = 24;
  } else if (selectedDay === 'today') {
    dayOffsetHours = 0;
  } else {
    dayOffsetHours = (startHour < currentHour && currentHour >= 19) ? 24 : 0;
  }

  route.tramos.forEach((tramo, index) => {
    // Cálculo del tiempo en este tramo: ajusta la velocidad según la pendiente y el ritmo medio
    let tramoSpeed = avgSpeedKmh;
    if (tramo.avgGradePct > 6) tramoSpeed = Math.max(8, avgSpeedKmh * 0.45);
    else if (tramo.avgGradePct > 3) tramoSpeed = Math.max(12, avgSpeedKmh * 0.65);
    else if (tramo.avgGradePct < -3) tramoSpeed = Math.min(55, avgSpeedKmh * 1.55);

    const tramoMinutes = Math.round((tramo.km / tramoSpeed) * 60);
    const startMinuteOfTramo = elapsedMinutes;
    const endMinuteOfTramo = elapsedMinutes + tramoMinutes;
    elapsedMinutes = endMinuteOfTramo;

    // Hora del día en la que transcurre el tramo
    const currentSimulatedDecimalHour = dayOffsetHours + startHour + (startMinuteOfTramo / 60);
    const currentHourIndex = Math.min(times.length - 1, Math.max(0, Math.floor(currentSimulatedDecimalHour)));

    // Extraer datos del tramo
    const wSpeed = windSpeeds[currentHourIndex] != null ? windSpeeds[currentHourIndex] : 14;
    const wDir = windDirs[currentHourIndex] != null ? windDirs[currentHourIndex] : 45;
    const wGust = windGusts[currentHourIndex] != null ? windGusts[currentHourIndex] : wSpeed * 1.4;
    const temp = temps[currentHourIndex] != null ? temps[currentHourIndex] : 15;
    const pop = pops[currentHourIndex] != null ? Math.round(pops[currentHourIndex]) : 0;
    const precipMm = precips[currentHourIndex] != null ? Math.round(precips[currentHourIndex] * 10) / 10 : 0;
    const snowCm = snowfalls[currentHourIndex] != null ? snowfalls[currentHourIndex] : 0;
    const code = weatherCodes[currentHourIndex] != null ? weatherCodes[currentHourIndex] : 1;

    // Ajuste térmico por altitud (gradiente adiabático: ~0.65 °C por cada 100 m)
    const baseAlt = 50;
    const altDiffM = Math.max(0, (tramo.endAlt || 100) - baseAlt);
    const tramoTemp = Math.round((temp - (altDiffM * 0.0065)) * 10) / 10;
    if (tramoTemp < minTramoTemp) minTramoTemp = tramoTemp;

    const windEval = evaluateRelativeWind(tramo.bearingDeg, wDir, wSpeed, wGust);
    const weatherEval = evaluateTramoWeather(pop, precipMm, snowCm, code, tramoTemp);

    if (windEval.type === 'tailwind') totalTailwindKm += tramo.km;
    else if (windEval.type === 'headwind') totalHeadwindKm += tramo.km;
    else totalCrosswindKm += tramo.km;

    if (weatherEval.isWet) totalWetKm += tramo.km;
    if (weatherEval.isHeavyRain) totalHeavyRainKm += tramo.km;
    if (weatherEval.hasThunder) hasThunder = true;
    if (weatherEval.hasSnowOrIce) hasSnowOrIce = true;
    if (weatherEval.isColdWetRisk) hasColdWetRisk = true;

    if (windEval.windGustsKmh > maxGustKmh) maxGustKmh = windEval.windGustsKmh;
    if (pop > maxPop) maxPop = pop;
    if (precipMm > maxPrecipMm) maxPrecipMm = precipMm;
    totalEstRainMm += precipMm * (tramoMinutes / 60);

    // Clasificación de fase: Ida vs Vuelta
    const totalTramos = route.tramos.length;
    const isIda = tramo.phase ? (tramo.phase === 'ida') : (index < Math.ceil(totalTramos / 2));

    if (isIda) {
      idaKm += tramo.km;
      idaElev += (tramo.elevGain || 0);
      if (idaStartMin === -1) idaStartMin = startMinuteOfTramo;
      idaEndMin = endMinuteOfTramo;
      idaTemps.push(tramoTemp);
      idaWinds.push(wSpeed);
      if (pop > idaMaxPop) idaMaxPop = pop;
      if (precipMm > idaMaxMm) idaMaxMm = precipMm;
      if (windEval.type === 'tailwind') idaTailwindKm += tramo.km;
      else if (windEval.type === 'headwind') idaHeadwindKm += tramo.km;
      else idaCrosswindKm += tramo.km;
    } else {
      vueltaKm += tramo.km;
      vueltaElev += (tramo.elevGain || 0);
      if (vueltaStartMin === -1) vueltaStartMin = startMinuteOfTramo;
      vueltaEndMin = endMinuteOfTramo;
      vueltaTemps.push(tramoTemp);
      vueltaWinds.push(wSpeed);
      if (pop > vueltaMaxPop) vueltaMaxPop = pop;
      if (precipMm > vueltaMaxMm) vueltaMaxMm = precipMm;
      if (windEval.type === 'tailwind') vueltaTailwindKm += tramo.km;
      else if (windEval.type === 'headwind') vueltaHeadwindKm += tramo.km;
      else vueltaCrosswindKm += tramo.km;
    }

    const formatHourMin = (totalMin) => {
      const h = Math.floor(totalMin / 60) % 24;
      const m = Math.floor(totalMin % 60);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    simulatedTramos.push({
      ...tramo,
      phase: isIda ? 'ida' : 'vuelta',
      tramoSpeedKmh: Math.round(tramoSpeed),
      estimatedStartHour: formatHourMin(startHour * 60 + startMinuteOfTramo),
      estimatedEndHour: formatHourMin(startHour * 60 + endMinuteOfTramo),
      temp: tramoTemp,
      pop,
      precipMm,
      snowCm,
      weatherCode: code,
      weather: weatherEval,
      wind: windEval
    });
  });

  const totalDistanceKm = route.distanceKm;
  const tailwindPct = Math.round((totalTailwindKm / totalDistanceKm) * 100);
  const headwindPct = Math.round((totalHeadwindKm / totalDistanceKm) * 100);
  const crosswindPct = Math.round((totalCrosswindKm / totalDistanceKm) * 100);
  const wetPct = Math.round((totalWetKm / totalDistanceKm) * 100);
  const totalRainRoundedMm = Math.round(totalEstRainMm * 10) / 10;

  // Puntuación de confort y seguridad ciclista (0 a 100):
  // Combina viento relativo + impacto real de lluvia/asfalto mojado/tormenta/frío en descenso
  let score = 75 + (tailwindPct * 0.25) - (headwindPct * 0.35);
  if (maxGustKmh >= 40) score -= 20;
  else if (maxGustKmh >= 30) score -= 10;

  const isContinuousOrHeavyRain = totalHeavyRainKm > 0 || wetPct >= 60 || maxPrecipMm >= 1.5;
  const isModerateWetRoute = !isContinuousOrHeavyRain && (wetPct >= 25 || maxPrecipMm >= 0.4 || maxPop >= 60);
  const isDrizzleRisk = !isContinuousOrHeavyRain && !isModerateWetRoute && (wetPct > 0 || maxPrecipMm >= 0.1 || maxPop >= 40);

  if (hasThunder || hasSnowOrIce) {
    score = Math.min(score - 45, 25);
  } else if (isContinuousOrHeavyRain) {
    score -= Math.round(25 + (wetPct * 0.35));
    score = Math.min(score, 44);
  } else if (isModerateWetRoute) {
    score -= Math.round(14 + (wetPct * 0.25));
    score = Math.min(score, 59);
  } else if (isDrizzleRisk) {
    score -= 10;
    score = Math.min(score, 76);
  }

  if (hasColdWetRisk) {
    score -= 12;
  }

  score = Math.max(5, Math.min(100, Math.round(score)));

  // Calificación cualitativa (priorizando seguridad y lluvia antes que viento)
  let badgeLabel = 'Favorable';
  let badgeColor = 'var(--success, #22c55e)';
  if (hasThunder) {
    badgeLabel = 'Tormenta ⛈️';
    badgeColor = 'var(--danger, #ef4444)';
  } else if (hasSnowOrIce) {
    badgeLabel = 'Nieve / Hielo ❄️';
    badgeColor = 'var(--danger, #ef4444)';
  } else if (isContinuousOrHeavyRain) {
    badgeLabel = 'Lluvia en Ruta 🌧️';
    badgeColor = 'var(--danger, #ef4444)';
  } else if (score >= 80) {
    badgeLabel = 'Óptima 🚀';
    badgeColor = 'var(--success, #22c55e)';
  } else if (score >= 60) {
    badgeLabel = 'Buena 👍';
    badgeColor = 'var(--primary, #38bdf8)';
  } else if (score >= 45) {
    badgeLabel = (isModerateWetRoute || wetPct >= 25) ? 'Asfalto Húmedo 🌦️' : 'Exigente ⚠️';
    badgeColor = 'var(--warning, #facc15)';
  } else {
    badgeLabel = 'Desfavorable 🛑';
    badgeColor = 'var(--danger, #ef4444)';
  }

  // Generación de consejo inteligente personalizado (lluvia + viento + temperatura)
  const dayText = dayOffsetHours > 0 ? 'mañana' : 'hoy';
  let advisorMessage = '';
  if (hasThunder) {
    advisorMessage = `Alerta de tormenta eléctrica durante la ruta ${dayText}. Desaconsejado salir en carretera abierta o puertos.`;
  } else if (hasSnowOrIce) {
    advisorMessage = `Riesgo de nieve o hielo en cotas altas (mín. ${minTramoTemp} °C). Evita puertos hasta que suba la temperatura.`;
  } else if (isContinuousOrHeavyRain) {
    const rainDetail = maxPrecipMm > 0 ? `hasta ${maxPrecipMm.toFixed(1)} mm/h` : `${maxPop}% prob.`;
    advisorMessage = `Lluvia prevista en el ${wetPct}% del trazado (${rainDetail}). Aunque el viento ${headwindPct > 45 ? 'moleste de cara' : 'no sea un problema'}, el agua y el asfalto mojado penalizan seguridad y frenada.`;
  } else if (isModerateWetRoute) {
    const coldNote = hasColdWetRisk ? ` Ojo al frío húmedo en descenso (${minTramoTemp} °C).` : '';
    advisorMessage = `Posible lluvia o orbayu en ${wetPct}% de la ruta (${maxPop}% máx). Lleva chubasquero, luces y precaución en curvas húmedas.${coldNote}`;
  } else {
    const drizzlePrefix = isDrizzleRisk ? `Ligero riesgo de orbayu puntual (${maxPop}%). ` : '';
    if (headwindPct > 50) {
      advisorMessage = `${drizzlePrefix}Viento en contra predominante (${headwindPct}% del trayecto a ${avgSpeedKmh} km/h). Alto gasto de vatios.`;
    } else if (tailwindPct > 45) {
      advisorMessage = isDrizzleRisk
        ? `${drizzlePrefix}Viento a favor en el ${tailwindPct}% del trazado rodando a ${avgSpeedKmh} km/h.`
        : `Excelente elección en seco para ${dayText} a ${avgSpeedKmh} km/h: disfrutarás de viento a favor durante el ${tailwindPct}% de la ruta.`;
    } else if (crosswindPct > 50) {
      advisorMessage = `${drizzlePrefix}Predomina el viento lateral (${crosswindPct}%). Precaución en bajadas rápidas si montas ruedas de perfil.`;
    } else {
      advisorMessage = `${drizzlePrefix}Condiciones equilibradas en seco rodando ${dayText} a ${avgSpeedKmh} km/h con salida a las ${startHour}:00 h.`;
    }
  }

  const formatTotalTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}min` : `${m} min`;
  };

  const formatHourMinTime = (totalMin) => {
    const h = Math.floor(totalMin / 60) % 24;
    const m = Math.floor(totalMin % 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  // Métricas específicas de IDA
  const idaTailwindPct = idaKm > 0 ? Math.round((idaTailwindKm / idaKm) * 100) : 0;
  const idaHeadwindPct = idaKm > 0 ? Math.round((idaHeadwindKm / idaKm) * 100) : 0;
  const idaCrosswindPct = idaKm > 0 ? Math.round((idaCrosswindKm / idaKm) * 100) : 0;
  const idaAvgTemp = idaTemps.length > 0 ? Math.round(idaTemps.reduce((a, b) => a + b, 0) / idaTemps.length) : 15;
  const idaAvgWind = idaWinds.length > 0 ? Math.round(idaWinds.reduce((a, b) => a + b, 0) / idaWinds.length) : 12;

  // Métricas específicas de VUELTA
  const vueltaTailwindPct = vueltaKm > 0 ? Math.round((vueltaTailwindKm / vueltaKm) * 100) : 0;
  const vueltaHeadwindPct = vueltaKm > 0 ? Math.round((vueltaHeadwindKm / vueltaKm) * 100) : 0;
  const vueltaCrosswindPct = vueltaKm > 0 ? Math.round((vueltaCrosswindKm / vueltaKm) * 100) : 0;
  const vueltaAvgTemp = vueltaTemps.length > 0 ? Math.round(vueltaTemps.reduce((a, b) => a + b, 0) / vueltaTemps.length) : 16;
  const vueltaAvgWind = vueltaWinds.length > 0 ? Math.round(vueltaWinds.reduce((a, b) => a + b, 0) / vueltaWinds.length) : 14;

  const idaBalance = {
    km: idaKm,
    elevGain: idaElev,
    startHour: formatHourMinTime(startHour * 60 + Math.max(0, idaStartMin)),
    endHour: formatHourMinTime(startHour * 60 + idaEndMin),
    tailwindPct: idaTailwindPct,
    headwindPct: idaHeadwindPct,
    crosswindPct: idaCrosswindPct,
    avgTemp: idaAvgTemp,
    avgWindKmh: idaAvgWind,
    maxPop: idaMaxPop,
    maxPrecipMm: idaMaxMm,
    windLabel: idaTailwindPct >= 50 ? '🟢 Viento a favor' : (idaHeadwindPct >= 50 ? '🔴 Viento de cara' : (idaTailwindPct > idaHeadwindPct ? '🟢 Favorable' : (idaHeadwindPct > idaTailwindPct ? '🔴 Freno frontal' : '🟡 Cruzado'))),
    windColor: idaTailwindPct >= 50 ? '#22c55e' : (idaHeadwindPct >= 50 ? '#ef4444' : (idaTailwindPct > idaHeadwindPct ? '#22c55e' : (idaHeadwindPct > idaTailwindPct ? '#ef4444' : '#facc15')))
  };

  const vueltaBalance = {
    km: vueltaKm,
    elevGain: vueltaElev,
    startHour: formatHourMinTime(startHour * 60 + Math.max(0, vueltaStartMin)),
    endHour: formatHourMinTime(startHour * 60 + vueltaEndMin),
    tailwindPct: vueltaTailwindPct,
    headwindPct: vueltaHeadwindPct,
    crosswindPct: vueltaCrosswindPct,
    avgTemp: vueltaAvgTemp,
    avgWindKmh: vueltaAvgWind,
    maxPop: vueltaMaxPop,
    maxPrecipMm: vueltaMaxMm,
    windLabel: vueltaTailwindPct >= 50 ? '🟢 Viento a favor' : (vueltaHeadwindPct >= 50 ? '🔴 Viento de cara' : (vueltaTailwindPct > vueltaHeadwindPct ? '🟢 Favorable' : (vueltaHeadwindPct > vueltaTailwindPct ? '🔴 Freno frontal' : '🟡 Cruzado'))),
    windColor: vueltaTailwindPct >= 50 ? '#22c55e' : (vueltaHeadwindPct >= 50 ? '#ef4444' : (vueltaTailwindPct > vueltaHeadwindPct ? '#22c55e' : (vueltaHeadwindPct > vueltaTailwindPct ? '#ef4444' : '#facc15')))
  };

  return {
    routeId: route.id,
    startHour,
    selectedDay: dayOffsetHours > 0 ? 'tomorrow' : 'today',
    isProjectedTomorrow: dayOffsetHours > 0,
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
    wetPct,
    maxPop,
    maxPrecipMm,
    totalEstRainMm: totalRainRoundedMm,
    hasThunder,
    hasSnowOrIce,
    hasColdWetRisk,
    minTramoTemp,
    maxGustKmh,
    idaBalance,
    vueltaBalance,
    tramos: simulatedTramos
  };
}

/**
 * Compara y ordena un conjunto de rutas para recomendar cuál es la mejor a una hora y velocidad concretas.
 */
export function rankRoutesForDeparture(routes, startHour = 9, avgSpeedKmh = 24, hourlyData = null, selectedDay = 'today') {
  if (!routes || routes.length === 0) return [];

  const ranked = routes.map(route => {
    const simulation = simulateRouteConditions(route, startHour, avgSpeedKmh, hourlyData, selectedDay);
    return {
      route,
      simulation
    };
  });

  ranked.sort((a, b) => (b.simulation?.score || 0) - (a.simulation?.score || 0));
  return ranked;
}
