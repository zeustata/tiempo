/**
 * Monitor Convectivo y Alerta Silenciosa de Tormenta Inminente para Asturias
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Mismo formato arquitectónico, cabecera y marco que la Galerna Cantábrica, Foehn, Xelu y Borrina.
 * Cumple estrictamente con la Doctrina Constitucional 12 (Simulacro y Modo Silencioso).
 */

export const ALLOW_SIMULATION = false; // Desconectado formalmente tras visto bueno de Lendo (Ley 12)

export function detectThunderstormEffect(current, hourly, concejo) {
  if (!current || !hourly || !concejo) return null;

  // 1. Detección de simulacro controlado (Doctrina Constitucional 12)
  if (ALLOW_SIMULATION && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');
    if (testMode === 'tormenta' || testMode === 'rayos' || testMode === 'thunderstorm') {
      return {
        isActive: true,
        isSimulation: true,
        level: 'warning',
        hasHail: false,
        timeLabel: 'próxima hora (~20:30 h)',
        intensity: 'moderada a fuerte',
        precipRate: 4.8,
        gust: 52,
        prob: 75,
        title: '⚡ Alerta de Tormenta Inminente • [SIMULACRO]',
        badge: '⚡ Actividad Convectiva',
        description: 'Núcleo tormentoso activo aproximándose a la zona con aparato eléctrico y chubascos intensos previstos hacia la <strong>próxima hora</strong>. Rachas súbitas de viento de <strong>~52 km/h</strong>.'
      };
    }
    if (testMode === 'granizo' || testMode === 'pedrisco' || testMode === 'tormenta_severa') {
      return {
        isActive: true,
        isSimulation: true,
        level: 'severe',
        hasHail: true,
        timeLabel: 'inminente (30-45 min)',
        intensity: 'muy severa con pedrisco',
        precipRate: 9.5,
        gust: 72,
        prob: 90,
        title: '⚡ Tormenta Severa con Granizo • [SIMULACRO]',
        badge: '🚨 Riesgo de Pedrisco',
        description: 'Célula convectiva severa con <strong>alta probabilidad de granizo o pedrisco</strong> y fuertes rachas de viento convectivo (<strong>~72 km/h</strong>). Pon vehículos y objetos a resguardo.'
      };
    }
  }

  // 2. Comprobación en tiempo real (ahora mismo)
  const currentCode = current.weather_code != null ? parseInt(current.weather_code, 10) : 0;
  const currentPrecip = current.precipitation != null ? parseFloat(current.precipitation) : 0;
  const currentGust = current.wind_gusts_10m != null ? Math.round(current.wind_gusts_10m) : 0;

  const isCurrentStorm = currentCode >= 95 && currentCode <= 99;
  const isCurrentHail = currentCode === 96 || currentCode === 99;

  if (isCurrentStorm) {
    return {
      isActive: true,
      level: isCurrentHail ? 'severe' : 'warning',
      hasHail: isCurrentHail,
      timeLabel: 'Activa ahora mismo',
      intensity: isCurrentHail ? 'severa con granizo' : 'moderada',
      precipRate: currentPrecip,
      gust: currentGust,
      prob: 100,
      title: isCurrentHail ? '⚡ Tormenta Severa con Granizo Activa' : '⚡ Tormenta Eléctrica Activa en la Zona',
      badge: isCurrentHail ? '🚨 Granizo / Pedrisco Activo' : '⚡ Tormenta en Curso',
      description: isCurrentHail
        ? `Tormenta eléctrica severa descargando sobre el concejo con <strong>granizo/pedrisco</strong> (${currentPrecip.toFixed(1)} mm/h) y rachas de <strong>${currentGust} km/h</strong>. Protégete en interiores.`
        : `Tormenta con aparato eléctrico y chubasco activo (${currentPrecip.toFixed(1)} mm/h). Precaución en carreteras y descampados.`
    };
  }

  // 3. Inspección de Nowcasting (próximas 1 a 3 horas)
  if (!hourly.time || !hourly.weather_code) return null;

  const now = new Date();
  const currentHourStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:00`;

  let startIndex = 0;
  for (let i = 0; i < hourly.time.length; i++) {
    if (hourly.time[i] >= currentHourStr) {
      startIndex = i;
      break;
    }
  }

  const windowLimit = Math.min(hourly.time.length, startIndex + 3);
  let stormIndex = -1;
  let hasHailUpcoming = false;

  for (let i = startIndex; i < windowLimit; i++) {
    const code = hourly.weather_code[i] != null ? parseInt(hourly.weather_code[i], 10) : 0;
    const pop = hourly.precipitation_probability ? (parseFloat(hourly.precipitation_probability[i]) || 0) : 0;
    const p = hourly.precipitation ? (parseFloat(hourly.precipitation[i]) || 0) : 0;

    // Tormenta oficial por WMO
    if (code >= 95 && code <= 99) {
      stormIndex = i;
      if (code === 96 || code === 99) hasHailUpcoming = true;
      break;
    }

    // O chubasco convectivo violento imprevisto (pop >= 70% con mm >= 4.0/h)
    if (pop >= 70 && p >= 4.0 && (code >= 80 && code <= 82)) {
      stormIndex = i;
      break;
    }
  }

  if (stormIndex === -1) return null;

  const stormTimeStr = hourly.time[stormIndex];
  const stormHour = stormTimeStr ? stormTimeStr.split('T')[1].substring(0, 5) : 'próximas 2 horas';
  const stormPop = hourly.precipitation_probability ? (parseFloat(hourly.precipitation_probability[stormIndex]) || 0) : 70;
  const stormPrecip = hourly.precipitation ? (parseFloat(hourly.precipitation[stormIndex]) || 0) : 0;
  const stormGust = hourly.wind_gusts_10m ? (parseFloat(hourly.wind_gusts_10m[stormIndex]) || 0) : 40;

  return {
    isActive: true,
    level: hasHailUpcoming ? 'severe' : 'warning',
    hasHail: hasHailUpcoming,
    timeLabel: `sobre las ${stormHour} h`,
    intensity: hasHailUpcoming ? 'severa con granizo' : 'moderada a fuerte',
    precipRate: stormPrecip,
    gust: Math.round(stormGust),
    prob: stormPop,
    title: hasHailUpcoming ? '⚡ Tormenta con Riesgo de Granizo Inminente' : '⚡ Alerta de Tormenta Inminente',
    badge: hasHailUpcoming ? '🚨 Posible Granizo' : '⚡ Tormenta Próxima',
    description: hasHailUpcoming
      ? `Se aproxima una célula de tormenta con <strong>riesgo de granizo/pedrisco</strong> prevista ${stormHour} h (probabilidad del <strong>${stormPop}%</strong>). Rachas de viento convectivo de hasta <strong>~${Math.round(stormGust)} km/h</strong>.`
      : `Previsión de tormenta con aparato eléctrico y chubascos copiosos (${stormPrecip.toFixed(1)} mm/h) sobre las <strong>${stormHour} h</strong> (prob. <strong>${stormPop}%</strong>).`
  };
}

export function renderThunderstormBanner(storm) {
  if (!storm || !storm.isActive) return '';

  return `
    <div class="thunderstorm-banner ${storm.level}" role="alert">
      <div class="thunderstorm-banner-header">
        <div class="thunderstorm-header-left">
          <span class="thunderstorm-icon">⚡</span>
          <span class="thunderstorm-title">${storm.title}</span>
          <span class="thunderstorm-badge">${storm.badge}</span>
        </div>
        <div class="thunderstorm-header-actions">
          <button class="btn-explain-sensor-compact btn-radar-shortcut" data-action="go-radar" title="Abrir radar de lluvia y tormentas en tiempo real">📡 Ver Radar en Directo</button>
        </div>
      </div>
      <div class="thunderstorm-banner-body">
        <p class="thunderstorm-desc">${storm.description}</p>
        <div class="thunderstorm-metrics">
          <span class="thunderstorm-metric-pill">⏰ Momento: <strong>${storm.timeLabel}</strong></span>
          <span class="thunderstorm-metric-pill">🌧️ Intensidad: <strong>~${storm.precipRate.toFixed(1)} mm/h</strong></span>
          <span class="thunderstorm-metric-pill">💨 Racha: <strong>~${storm.gust} km/h</strong></span>
          <span class="thunderstorm-metric-pill">📊 Probabilidad: <strong>${storm.prob}%</strong></span>
          ${storm.isSimulation ? `<span class="thunderstorm-metric-pill simulation-pill">🧪 Simulacro Ley 12</span>` : ''}
        </div>
      </div>
    </div>
  `;
}
