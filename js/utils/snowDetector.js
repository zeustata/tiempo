/**
 * Detector Silencioso e Inteligente de Nevadas y Cota de Nieve ("Alerta Nieve")
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Mismo formato arquitectónico, cabecera y marco que la Galerna, Foehn y Alerta Xelu.
 * Cumple estrictamente con la Doctrina Constitucional 12 (Simulacro y Modo Silencioso)
 * y la Doctrina 16 (Exención de responsabilidad civil y vialidad invernal).
 */

export const ALLOW_SIMULATION = true;

/**
 * Evalúa el riesgo de nevada o desplome de cota de nieve en las próximas horas (ventana 12-24h)
 * comparando la cota de nieve con la altitud del concejo o ubicación del usuario.
 *
 * @param {Object} current - Datos meteorológicos actuales de Open-Meteo
 * @param {Object} hourly - Pronóstico horario de Open-Meteo
 * @param {Object} daily - Pronóstico diario de Open-Meteo
 * @param {Object} concejo - Objeto del concejo consultado ({ id, name, altitude, ... })
 * @returns {Object|null} Objeto con la información de la alerta o null si no hay riesgo
 */
export function detectSnowStatus(current, hourly, daily, concejo) {
  // 1. Detección de simulacro controlado (Doctrina Constitucional 12)
  if (ALLOW_SIMULATION && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');
    if (testMode === 'nieve' || testMode === 'snow' || testMode === 'nevadona' || testMode === 'cota') {
      const isSeaLevel = testMode === 'cota' || urlParams.get('level') === 'costa';
      const isMountain = urlParams.get('level') === 'montana';

      if (isSeaLevel) {
        return {
          isActive: true,
          isSimulation: true,
          level: 'historic',
          snowLevel: 80,
          expectedSnowCm: 3.5,
          startHourStr: '19:00 h',
          hoursUntil: 3,
          concejoAltitude: concejo?.altitude || 25,
          title: '❄️ Alerta Histórica: Nieve a Nivel del Mar',
          badge: '🚨 Cota Cero / Litoral Cantábrico',
          description: 'Desplome excepcional de la cota de nieve al <strong>nivel del mar (&lt; 150 m)</strong> en las próximas horas. Probabilidad muy alta de que cuaje en playas, paseos marítimos y en las autovías principales (A-8, A-66 "Y"). Máxima prudencia al volante.'
        };
      }

      if (isMountain) {
        return {
          isActive: true,
          isSimulation: true,
          level: 'mountain',
          snowLevel: 900,
          expectedSnowCm: 14.0,
          startHourStr: '18:00 h',
          hoursUntil: 2,
          concejoAltitude: concejo?.altitude || 750,
          title: '❄️ Temporal de Nieve en Puertos y Cumbres',
          badge: '🏔️ Nieve Copiosa / Vialidad Invernal',
          description: 'Entrada de frente frío muy activo con <strong>acumulaciones de más de 10-15 cm</strong> previstas en las próximas horas. Imprescindible cadenas o neumáticos de invierno en puertos de montaña (Pajares, Huerna, San Isidro, Tarna).'
        };
      }

      // Nivel medio / Valles por defecto en simulacro
      return {
        isActive: true,
        isSimulation: true,
        level: 'valleys',
        snowLevel: 320,
        expectedSnowCm: 5.2,
        startHourStr: '20:00 h',
        hoursUntil: 4,
        concejoAltitude: concejo?.altitude || 232,
        title: '❄️ Alerta Nieve en Cotas Bajas y Valles',
        badge: '⚠️ Nieve en Zonas Habitadas',
        description: 'La cota de nieve se desploma hacia los <strong>300-400 metros</strong> coincidiendo con precipitación activa en las próximas horas. Riesgo de placas y acumulación en cascos urbanos, fondos de valle y carreteras secundarias.'
      };
    }
  }

  if (!hourly || !Array.isArray(hourly.time)) {
    return null;
  }

  // 2. Localizar cursor de tiempo actual sin desfases
  const now = new Date();
  const currentHourStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:00`;
  let startIndex = hourly.time.findIndex(t => t >= currentHourStr);
  if (startIndex === -1) startIndex = 0;

  // Ventana de escaneo preventivo: próximas 18 horas
  const scanLimit = Math.min(hourly.time.length, startIndex + 18);
  const concejoAlt = concejo?.altitude || 50;

  let firstSnowIdx = -1;
  let totalSnowCm = 0;
  let minFreezingLevel = 9999;
  let hasSnowWmo = false;

  const SNOW_WMO_CODES = [71, 73, 75, 77, 85, 86];

  for (let i = startIndex; i < scanLimit; i++) {
    const snowVal = (hourly.snowfall && hourly.snowfall[i] != null) ? hourly.snowfall[i] : 0;
    const wmo = (hourly.weather_code && hourly.weather_code[i] != null) ? hourly.weather_code[i] : 0;
    const freezingLevel = (hourly.freezing_level_height && hourly.freezing_level_height[i] != null) 
      ? hourly.freezing_level_height[i] 
      : 2500;
    const precip = (hourly.precipitation && hourly.precipitation[i] != null) ? hourly.precipitation[i] : 0;

    if (freezingLevel < minFreezingLevel) {
      minFreezingLevel = freezingLevel;
    }

    // Estimación física de cota de nieve: habitualmente ~250-300 metros por debajo de la isoterma 0 °C
    const estimatedSnowLevel = Math.max(0, freezingLevel - 280);

    const isSnowRisk = snowVal >= 0.1 || SNOW_WMO_CODES.includes(wmo) || (precip >= 0.2 && estimatedSnowLevel <= concejoAlt + 120);

    if (isSnowRisk) {
      if (firstSnowIdx === -1) {
        firstSnowIdx = i;
      }
      totalSnowCm += snowVal;
      if (SNOW_WMO_CODES.includes(wmo)) {
        hasSnowWmo = true;
      }
    }
  }

  // Si no hay riesgo de nieve en la ventana de las próximas horas, silencio absoluto (Modo Silencioso)
  if (firstSnowIdx === -1 && totalSnowCm < 0.2 && !hasSnowWmo) {
    return null;
  }

  // 3. Extracción de métricas para la alerta
  const hoursUntil = Math.max(0, firstSnowIdx - startIndex);
  const snowTimeRaw = hourly.time[firstSnowIdx] || '';
  const startHourStr = snowTimeRaw ? `${snowTimeRaw.substring(11, 16)} h` : 'próximas horas';
  
  // Cota de nieve estimada en el momento de la nevada
  const fLevelAtSnow = (hourly.freezing_level_height && hourly.freezing_level_height[firstSnowIdx] != null)
    ? hourly.freezing_level_height[firstSnowIdx]
    : minFreezingLevel;
  const snowLevel = Math.max(0, Math.round((fLevelAtSnow - 280) / 50) * 50);

  const roundedSnowCm = Math.round(totalSnowCm * 10) / 10;

  // 4. Clasificación de Severidad según la cota y el concejo
  // A) Cota Cero / Nivel del Mar (< 200 m) — Evento histórico o excepcional
  if (snowLevel <= 200 || concejoAlt <= 100 && (totalSnowCm >= 0.3 || hasSnowWmo)) {
    return {
      isActive: true,
      isSimulation: false,
      level: 'historic',
      snowLevel,
      expectedSnowCm: roundedSnowCm,
      startHourStr,
      hoursUntil,
      concejoAltitude: concejoAlt,
      title: '❄️ Alerta Histórica: Nieve a Nivel del Mar',
      badge: '🚨 Cota Cero / Litoral Cantábrico',
      description: `Los modelos señalan un desplome de la cota de nieve a nivel del mar (<strong>~${snowLevel} m</strong>) hacia las <strong>${startHourStr}</strong>. Riesgo de que cuaje en playas, paseos marítimos y en las autovías principales (A-8, A-66). Máxima precaución.`
    };
  }

  // B) Cotas Bajas y Valles Habitados (200 m - 600 m)
  if (snowLevel <= 600 || concejoAlt <= 500) {
    return {
      isActive: true,
      isSimulation: false,
      level: 'valleys',
      snowLevel,
      expectedSnowCm: roundedSnowCm,
      startHourStr,
      hoursUntil,
      concejoAltitude: concejoAlt,
      title: '❄️ Alerta Nieve en Cotas Bajas y Valles',
      badge: '⚠️ Nieve en Zonas Habitadas',
      description: `Riesgo de nevada con cota situada en torno a <strong>${snowLevel} m</strong> a partir de las <strong>${startHourStr}</strong>. Afecta a fondos de valle, cascos urbanos y carreteras secundarias. Prever dificultades de tráfico y posibles placas.`
    };
  }

  // C) Nieve en Zonas Altas / Montaña (> 600 m)
  return {
    isActive: true,
    isSimulation: false,
    level: 'mountain',
    snowLevel,
    expectedSnowCm: roundedSnowCm,
    startHourStr,
    hoursUntil,
    concejoAltitude: concejoAlt,
    title: '❄️ Alerta Nieve en Montaña y Puertos',
    badge: '🏔️ Temporal en Cumbres y Puertos',
    description: `Precipitación sólida prevista hacia las <strong>${startHourStr}</strong> con cota a <strong>${snowLevel} m</strong>${roundedSnowCm > 0 ? ` y acumulación estimada de <strong>~${roundedSnowCm} cm</strong>` : ''}. Obligatorio consultar estado de puertos de la Cordillera Cantábrica y portar cadenas.`
  };
}

/**
 * Renderiza el banner dinámico clonado fielmente a la estética Liquid Glass
 * de los detectores de Alerta Xelu, Galerna y Foehn.
 */
export function renderSnowBanner(snow) {
  if (!snow || !snow.isActive) return '';

  const icon = snow.level === 'historic' ? '🚨' : (snow.level === 'mountain' ? '🏔️' : '❄️');

  return `
    <div class="snow-banner ${snow.level}">
      <div class="snow-banner-header">
        <div class="snow-header-left">
          <span class="snow-icon">${icon}</span>
          <span class="snow-title">${snow.title}</span>
          <span class="snow-badge">${snow.badge}</span>
        </div>
        <button class="btn-explain-sensor-compact" data-explain="snow_alert" title="Aprende cómo se calculan las cotas de nieve y el protocolo en Asturias">💡 ¿Por qué ocurre?</button>
      </div>
      <div class="snow-banner-body">
        <p class="snow-desc">${snow.description}</p>
        <div class="snow-metrics">
          <span class="snow-metric-pill">⏱️ Inicio estimado: <strong>${snow.startHourStr}</strong></span>
          <span class="snow-metric-pill">📏 Cota prevista: <strong>~${snow.snowLevel} m</strong></span>
          ${snow.expectedSnowCm > 0 ? `<span class="snow-metric-pill">❄️ Acumulación: <strong>~${snow.expectedSnowCm} cm</strong></span>` : ''}
          <span class="snow-metric-pill">🏔️ Altitud concejo: <strong>${snow.concejoAltitude} m</strong></span>
          ${snow.isSimulation ? '<span class="snow-metric-pill simulation-pill" style="color: #67e8f9; border-color: rgba(103, 232, 249, 0.5);">🧪 Modo Simulacro Activo</span>' : ''}
        </div>
      </div>
    </div>
  `;
}
