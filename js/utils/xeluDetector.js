/**
 * Detector Inteligente de Escarcha y Placas de Hielo en Asfalto ("Alerta Xelu")
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Mismo formato arquitectónico, cabecera y marco que la Galerna Cantábrica y el Foehn.
 * Cumple estrictamente con la Doctrina Constitucional 12 (Simulacro y Modo Silencioso).
 */

export const ALLOW_SIMULATION = false;

/**
 * Evalúa el riesgo de xelu (escarcha) y placas de hielo en firme
 */
export function detectXeluEffect(current, daily, concejo) {
  if (!current) return null;

  // 1. Detección de simulacro controlado (Doctrina Constitucional 12)
  if (ALLOW_SIMULATION && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');
    if (testMode === 'xelu' || testMode === 'hielo' || testMode === 'helada' || testMode === 'escarcha') {
      const isSevere = testMode === 'hielo';
      return {
        isActive: true,
        isSimulation: true,
        level: isSevere ? 'severe' : 'moderate',
        temp: isSevere ? -1.2 : 1.4,
        dewPoint: isSevere ? -2.0 : 0.1,
        windSpeed: 4,
        title: isSevere ? '🧊 Alerta de Placas de Hielo en Asfalto' : '❄️ Riesgo de Helada • Alerta Xelu',
        badge: isSevere ? '🚨 Firme Helado / Hielo Negro' : '⚠️ Firme Deslizante',
        description: isSevere
          ? 'Subenfriamiento severo en superficie. Formación inminente de <strong>placas de hielo negro invisible</strong> en asfalto húmedo. Máxima precaución en curvas sombrías, pasos elevados y puentes.'
          : 'Condiciones de helada radiativa al amanecer. <strong>Firme húmedo y asfalto deslizante</strong> en calzada. Precaución en zonas sombrías, fondos de valle y rotondas con pérdida de adherencia.'
      };
    }
  }

  const temp = current.temperature_2m;
  if (temp == null || temp > 3.0) {
    // Si la mínima del día tampoco es fría, silencio absoluto
    const todayMin = (daily && daily.temperature_2m_min && daily.temperature_2m_min[0] != null) 
      ? daily.temperature_2m_min[0] 
      : 10;
    if (todayMin > 2.0) return null;
  }

  // 2. Cálculo aproximado de punto de rocío si no viene directo
  const rh = current.relative_humidity_2m || 75;
  const a = 17.27, b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + Math.log(rh / 100);
  const dewPoint = (b * alpha) / (a - alpha);

  const windSpeed = current.wind_speed_10m || 0;
  const currentHour = new Date().getHours();
  const isNightOrMorning = currentHour >= 21 || currentHour <= 10;

  // 3. Reglas de disparo físico
  const isFreezing = temp <= 0.5 || dewPoint <= -0.5;
  const isNearFrost = temp <= 2.8 && (temp - dewPoint) <= 2.2 && windSpeed <= 15;

  if (!isNightOrMorning && !isFreezing) {
    return null;
  }

  if (isFreezing) {
    return {
      isActive: true,
      isSimulation: false,
      level: 'severe',
      temp: Math.round(temp * 10) / 10,
      dewPoint: Math.round(dewPoint * 10) / 10,
      windSpeed: Math.round(windSpeed),
      title: '🧊 Alerta de Placas de Hielo en Asfalto',
      badge: '🚨 Firme Helado / Hielo Negro',
      description: 'Subenfriamiento severo en superficie. Formación inminente de <strong>placas de hielo negro invisible</strong> en calzada. Máxima precaución al volante en curvas sombrías, pasos elevados y puentes.'
    };
  }

  if (isNearFrost) {
    return {
      isActive: true,
      isSimulation: false,
      level: 'moderate',
      temp: Math.round(temp * 10) / 10,
      dewPoint: Math.round(dewPoint * 10) / 10,
      windSpeed: Math.round(windSpeed),
      title: '❄️ Riesgo de Helada • Alerta Xelu',
      badge: '⚠️ Firme Deslizante',
      description: 'Condiciones de helada radiativa al amanecer. <strong>Firme húmedo y asfalto deslizante</strong> en calzada. Precaución en zonas sombrías, fondos de valle y rotondas con pérdida de adherencia.'
    };
  }

  return null;
}

/**
 * Renderiza el banner dinámico clonado exactamente al diseño de la Galerna y Foehn
 */
export function renderXeluBanner(xelu) {
  if (!xelu || !xelu.isActive) return '';

  const icon = xelu.level === 'severe' ? '🧊' : '❄️';

  return `
    <div class="xelu-banner ${xelu.level}">
      <div class="xelu-banner-header">
        <div class="xelu-header-left">
          <span class="xelu-icon">${icon}</span>
          <span class="xelu-title">${xelu.title}</span>
          <span class="xelu-badge">${xelu.badge}</span>
        </div>
        <button class="btn-explain-sensor-compact" data-explain="xelu" title="Aprende cómo se forman las heladas y el hielo negro en Asturias">💡 ¿Por qué ocurre?</button>
      </div>
      <div class="xelu-banner-body">
        <p class="xelu-desc">${xelu.description}</p>
        <div class="xelu-metrics">
          <span class="xelu-metric-pill">🌡️ Aire: <strong>${xelu.temp} °C</strong></span>
          <span class="xelu-metric-pill">💧 Rocío: <strong>${xelu.dewPoint} °C</strong></span>
          <span class="xelu-metric-pill">🍃 Viento: <strong>${xelu.windSpeed} km/h (calma)</strong></span>
          ${xelu.isSimulation ? '<span class="xelu-metric-pill simulation-pill" style="color: #facc15; border-color: rgba(250, 204, 21, 0.4);">🧪 Modo Simulacro Activo</span>' : ''}
        </div>
      </div>
    </div>
  `;
}
