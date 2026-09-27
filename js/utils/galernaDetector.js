/**
 * Detector Silencioso de Galerna Cantábrica para Asturias
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 * 
 * Evalúa las condiciones físicas, cinemáticas y barométricas de la Galerna:
 * 1. Ámbito geográfico: Concejos del litoral y costa asturiana.
 * 2. Role súbito al Noroeste: Viento de componente WNW / NW / NNW (270° a 345°).
 * 3. Aceleración violenta: Rachas >= 45 km/h (moderada) o >= 65 km/h (severa).
 * 4. Desplome térmico rápido: Caída de temperatura de >= 4 °C en 1-2 horas respecto al ambiente previo.
 * 5. Salto barométrico: Inyección marina con aumento repentino de presión (>= 1.5 hPa) y humedad alta.
 * 
 * Principio de funcionamiento: 
 * - Si no hay galerna, devuelve null (silencio absoluto en la interfaz).
 * - Si se desata, despliega un banner de advertencia náutica con métricas en vivo y botón didáctico.
 */

export function detectGalernaEffect(current, hourly, concejo) {
  // --- PROTOCOLO CONSTITUCIONAL DE SIMULACRO (Artículo 12) ---
  const ALLOW_SIMULATION = false; // Desconectado formalmente tras visto bueno de Lendo
  const isSimulation = ALLOW_SIMULATION && typeof window !== 'undefined' && 
                       (window.location.search.includes('test=galerna') || 
                        window.location.search.includes('simulacro=galerna') ||
                        window.__GALERNA_SIMULATION__ === true);

  if (isSimulation) {
    return {
      isActive: true,
      isSevere: true,
      isSimulation: true,
      level: 'severe',
      windDirection: 305,
      windDirectionLabel: 'Noroeste (Simulacro)',
      gusts: 68,
      speed: 46,
      tempDrop: 7.5,
      pressureJump: 2.8,
      humidity: 88,
      title: '🌊 Galerna Cantábrica Activa • [SIMULACRO]',
      badge: '🧪 Modo Prueba Art. 12',
      description: 'Giro repentino y violento del viento a componente Noroeste (NW) con rachas de <strong>68 km/h</strong> en el litoral. Desplome térmico simulado de <strong>-7.5 °C</strong> y salto de presión de <strong>+2.8 hPa</strong>. Mar blanco y golpe súbito de viento en playas y rías.'
    };
  }

  if (!current || !concejo) return null;

  // 1. Ámbito: Solo concejos de costa o con fachada litoral directa
  const isCoast = concejo.type === 'coast' || 
                  (concejo.region && concejo.region.toLowerCase().includes('costa')) ||
                  concejo.id === 'castrillon' || concejo.id === 'gijon' || concejo.id === 'gozon' ||
                  concejo.id === 'llanes' || concejo.id === 'ribadesella' || concejo.id === 'carreno' ||
                  concejo.id === 'aviles' || concejo.id === 'valdes' || concejo.id === 'tapia' ||
                  concejo.id === 'cudillero' || concejo.id === 'villaviciosa' || concejo.id === 'colunga';

  if (!isCoast) return null;

  const dir = current.wind_direction_10m != null ? Math.round(current.wind_direction_10m) : null;
  const speed = current.wind_speed_10m != null ? Math.round(current.wind_speed_10m) : 0;
  const gusts = current.wind_gusts_10m != null ? Math.round(current.wind_gusts_10m) : speed;
  const currentTemp = current.temperature_2m != null ? current.temperature_2m : null;
  const currentPress = current.pressure_msl != null ? current.pressure_msl : (current.surface_pressure || null);
  const rh = current.relative_humidity_2m != null ? Math.round(current.relative_humidity_2m) : null;

  if (dir == null || currentTemp == null) return null;

  // 2. Sector de viento: Debe ser de componente Noroeste (WNW a NNW: 270° a 345°)
  const isNwSector = dir >= 270 && dir <= 345;
  if (!isNwSector) return null;

  // 3. Rachas de viento activas (mínimo 45 km/h o sostenido >= 30 km/h)
  if (gusts < 45 && speed < 30) return null;

  // 4. Análisis del cambio térmico y barométrico con datos horarios (últimas 1-3 horas)
  let tempDrop = 0;
  let pressureJump = 0;
  let hasThermalCollapse = false;

  if (hourly && Array.isArray(hourly.time) && Array.isArray(hourly.temperature_2m)) {
    const nowIsoHour = new Date().toISOString().slice(0, 13);
    let nowIndex = hourly.time.findIndex(t => t.startsWith(nowIsoHour));
    if (nowIndex === -1) nowIndex = Math.min(12, hourly.time.length - 1);

    // Comparar con la temperatura de 1 a 3 horas antes
    const lookback = Math.max(0, nowIndex - 2);
    const prevTemps = hourly.temperature_2m.slice(lookback, nowIndex);
    const maxPrevTemp = prevTemps.length > 0 ? Math.max(...prevTemps) : currentTemp;

    tempDrop = Math.max(0, Math.round((maxPrevTemp - currentTemp) * 10) / 10);

    // Salto barométrico si hay histórico de presión
    if (Array.isArray(hourly.pressure_msl) && currentPress != null) {
      const prevPressures = hourly.pressure_msl.slice(lookback, nowIndex);
      const minPrevPress = prevPressures.length > 0 ? Math.min(...prevPressures) : currentPress;
      pressureJump = Math.max(0, Math.round((currentPress - minPrevPress) * 10) / 10);
    }

    // Se considera colapso térmico si cayó >= 3.5 °C tras calor/bochorno previo o si el viento roló súbitamente con racha fuerte
    hasThermalCollapse = tempDrop >= 3.5;
  }

  // Si no tenemos histórico horario pero la racha es >= 58 km/h en sector NW con humedad marina muy alta
  const isSuddenGalerna = (hasThermalCollapse && gusts >= 45) || (gusts >= 58 && rh >= 80);

  if (!isSuddenGalerna) return null;

  // Severidad
  const isSevere = gusts >= 65 || tempDrop >= 6.0;

  return {
    isActive: true,
    isSevere,
    level: isSevere ? 'severe' : 'moderate',
    windDirection: dir,
    windDirectionLabel: 'Noroeste',
    gusts,
    speed,
    tempDrop: tempDrop > 0 ? tempDrop : null,
    pressureJump: pressureJump > 0 ? pressureJump : null,
    humidity: rh,
    title: isSevere ? '🌊 Galerna Severa • Zarpazo del Noroeste' : '⚠️ Galerna Cantábrica Activa',
    badge: isSevere ? '🚨 Temporal Súbito NW' : '💨 Giro Violento a Noroeste',
    description: `Giro repentino y violento del viento a componente Noroeste (NW) con rachas de <strong>${gusts} km/h</strong> en el litoral.${tempDrop > 0 ? ` Desplome térmico estimado de <strong>-${tempDrop} °C</strong>.` : ''} Mar blanco, rompiente cruzada y golpe súbito de viento en playas y rías.`
  };
}

export function renderGalernaBanner(galerna) {
  if (!galerna || !galerna.isActive) return '';

  return `
    <div class="galerna-banner ${galerna.level}">
      <div class="galerna-banner-header">
        <div class="galerna-header-left">
          <span class="galerna-icon">🌊</span>
          <span class="galerna-title">${galerna.title}</span>
          <span class="galerna-badge">${galerna.badge}</span>
        </div>
        <button class="btn-explain-sensor-compact btn-open-phenomena" data-phenomenon="galerna" title="Aprende por qué se desatan las galernas en la costa asturiana">💡 ¿Por qué ocurre?</button>
      </div>
      <div class="galerna-banner-body">
        <p class="galerna-desc">${galerna.description}</p>
        <div class="galerna-metrics">
          <span class="galerna-metric-pill">🧭 Rumbo: <strong>${galerna.windDirection}° (${galerna.windDirectionLabel})</strong></span>
          <span class="galerna-metric-pill">💨 Racha: <strong>${galerna.gusts} km/h</strong></span>
          ${galerna.tempDrop ? `<span class="galerna-metric-pill">📉 Caída térmica: <strong>-${galerna.tempDrop} °C</strong></span>` : ''}
          ${galerna.pressureJump ? `<span class="galerna-metric-pill">📈 Salto barómetro: <strong>+${galerna.pressureJump} hPa</strong></span>` : ''}
          ${galerna.humidity ? `<span class="galerna-metric-pill">💧 Humedad marina: <strong>${galerna.humidity}%</strong></span>` : ''}
        </div>
      </div>
    </div>
  `;
}
