/**
 * Detector Silencioso e Inteligente de Mar de Fondo y Golpe de Mar en el Litoral Asturiano
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Mismo formato arquitectónico, cabecera y marco que la Galerna Cantábrica, Foehn, Xelu y Borrina.
 * Cumple estrictamente con la Doctrina Constitucional 11 (Ergonomía Móvil),
 * Doctrina 12 (Simulacro y Modo Silencioso) y Doctrina 16 (Exención de Responsabilidad Civil).
 */

export const ALLOW_SIMULATION = true; // Activo para pruebas (Ley 12)

/**
 * Evalúa las condiciones oceanográficas en tiempo real o simulacro
 */
export function detectMarFondoEffect(marine, concejo) {
  if (!concejo) return null;

  // 1. Detección de simulacro controlado (Doctrina Constitucional 12)
  if (ALLOW_SIMULATION && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');

    if (testMode === 'mar_fondo' || testMode === 'swell' || testMode === 'resaca') {
      return {
        isActive: true,
        isSimulation: true,
        level: 'warning',
        waveHeight: 4.2,
        period: 14,
        energyKj: 2717,
        energyColor: '#ef4444',
        energyIcon: '🔴',
        energyLabel: 'Pesada',
        direction: 'NW (315°)',
        title: 'Mar de Fondo Fuerte • Precaución en el Litoral [SIMULACRO]',
        badge: '⚠️ Mar Combinada >= 4 m',
        description: 'Oleaje atlántico de <strong>4,2 m</strong> y período largo (<strong>14 s</strong>, <strong>2.717 kJ</strong>) en umbral de aviso costero AEMET. Fuertes corrientes de resaca y rompiente pesada en el litoral.',
        phenomenonId: 'mar_fondo'
      };
    }

    if (testMode === 'mar_fondo_rojo' || testMode === 'golpe_mar' || testMode === 'temporal_maritimo') {
      return {
        isActive: true,
        isSimulation: true,
        level: 'severe',
        waveHeight: 5.6,
        period: 16,
        energyKj: 5519,
        energyColor: '#ef4444',
        energyIcon: '🔴',
        energyLabel: 'Pesada',
        direction: 'WNW (295°)',
        title: 'Golpe de Mar Severo • Peligro en Espigones y Paseos [SIMULACRO]',
        badge: '🚨 Peligro en la Costa',
        description: 'Temporal marítimo severo con olas de <strong>5,6 m</strong> y período de <strong>16 s</strong> (<strong>5.519 kJ</strong>). Alto riesgo de que series de olas sobrepasen espigones, acantilados y paseos marítimos. Aléjate del borde costero.',
        phenomenonId: 'mar_fondo'
      };
    }
  }

  // 2. Solo activo para concejos costeros
  const isCoast = concejo.type === 'coast' ||
    (concejo.region && concejo.region.toLowerCase().includes('costa')) ||
    concejo.id === 'castrillon' || concejo.id === 'gijon' || concejo.id === 'gozon' ||
    concejo.id === 'llanes' || concejo.id === 'ribadesella' || concejo.id === 'carreno' ||
    concejo.id === 'aviles' || concejo.id === 'valdes' || concejo.id === 'tapia' ||
    concejo.id === 'cudillero' || concejo.id === 'villaviciosa' || concejo.id === 'colunga' ||
    concejo.id === 'soto_barco' || concejo.id === 'navia' || concejo.id === 'franco' ||
    concejo.id === 'coana' || concejo.id === 'ribadedeva';

  if (!isCoast || !marine) return null;

  const currentMarine = marine.current || marine;
  if (!currentMarine) return null;

  // Variables de oleaje
  const waveHeight = typeof currentMarine.wave_height === 'number' ? currentMarine.wave_height : null;
  const swellHeight = typeof currentMarine.swell_wave_height === 'number' ? currentMarine.swell_wave_height : waveHeight;
  const period = typeof currentMarine.swell_wave_period === 'number' ? currentMarine.swell_wave_period : (typeof currentMarine.wave_period === 'number' ? currentMarine.wave_period : null);
  const dirDeg = currentMarine.swell_wave_direction != null ? currentMarine.swell_wave_direction : currentMarine.wave_direction;

  if (waveHeight == null && swellHeight == null) return null;

  const h = Math.max(waveHeight || 0, swellHeight || 0);
  const t = period || 0;

  // Conversión de rumbo náutico a texto limpio
  let dirText = 'Cantábrico';
  if (dirDeg != null) {
    const d = Math.round(dirDeg);
    if (d >= 337.5 || d < 22.5) dirText = 'N';
    else if (d >= 22.5 && d < 67.5) dirText = 'NE';
    else if (d >= 67.5 && d < 112.5) dirText = 'E';
    else if (d >= 112.5 && d < 157.5) dirText = 'SE';
    else if (d >= 157.5 && d < 202.5) dirText = 'S';
    else if (d >= 202.5 && d < 247.5) dirText = 'SW';
    else if (d >= 247.5 && d < 292.5) dirText = 'W';
    else if (d >= 292.5 && d < 337.5) dirText = 'NW';
    dirText = `${dirText} (${d}°)`;
  }

  // 3. Calibración en Simbiosis 100% con Umbrales Oficiales de AEMET Meteoalerta (Costa de Asturias):
  // - Menos de 4.0 m: 100% silencioso en portada (armonía con Verde AEMET; 2-3 m es oleaje habitual en el Cantábrico).
  // - Nivel Amarillo (warning): Mar combinada de 4.0 m a 4.9 m (Umbral Amarillo AEMET en litoral asturiano).
  // - Nivel Naranja/Rojo (severe): Mar combinada >= 5.0 m (Umbral Naranja/Rojo AEMET de temporal costero severo).
  const isSevere = h >= 5.0;
  const isWarning = !isSevere && h >= 4.0;

  // Cálculo físico de Potencia de la Ola en kiloJulios (E = 11 * H^2 * T + Swell secundario)
  const h1 = swellHeight || waveHeight || h;
  const t1 = Math.max(1, t || 10);
  const h2 = typeof currentMarine.secondary_swell_wave_height === 'number' ? currentMarine.secondary_swell_wave_height : 0;
  const t2 = typeof currentMarine.secondary_swell_wave_period === 'number' ? Math.max(1, currentMarine.secondary_swell_wave_period) : 1;
  const energyKj = Math.round(11 * (h1 * h1) * t1 + (h2 > 0 ? 11 * (h2 * h2) * t2 : 0));

  let energyColor = '#10b981';
  let energyIcon = '🟢';
  let energyLabel = 'Suave';
  if (energyKj >= 1100) {
    energyColor = '#ef4444';
    energyIcon = '🔴';
    energyLabel = 'Pesada';
  } else if (energyKj >= 650) {
    energyColor = '#a855f7';
    energyIcon = '🟣';
    energyLabel = 'Muy Potente';
  } else if (energyKj >= 350) {
    energyColor = '#f97316';
    energyIcon = '🟠';
    energyLabel = 'Sólida';
  } else if (energyKj >= 180) {
    energyColor = '#fbbf24';
    energyIcon = '🟡';
    energyLabel = 'Divertida';
  }

  if (isSevere) {
    return {
      isActive: true,
      level: 'severe',
      waveHeight: Math.round(h * 10) / 10,
      period: Math.round(t),
      energyKj,
      energyColor,
      energyIcon,
      energyLabel,
      direction: dirText,
      title: 'Golpe de Mar Severo • Peligro en Espigones y Paseos',
      badge: '🚨 Peligro en la Costa',
      description: `Temporal marítimo severo en umbral naranja/rojo AEMET (<strong>${(Math.round(h * 10) / 10).toString().replace('.', ',')} m</strong>, <strong>${Math.round(t)} s</strong> y <strong>${energyKj} kJ</strong>). Alto riesgo de golpes de mar repentinos superando escolleras, rocas y paseos costeros. Extrema la precaución y mantén la distancia de seguridad.`,
      phenomenonId: 'mar_fondo'
    };
  }

  if (isWarning) {
    return {
      isActive: true,
      level: 'warning',
      waveHeight: Math.round(h * 10) / 10,
      period: Math.round(t),
      energyKj,
      energyColor,
      energyIcon,
      energyLabel,
      direction: dirText,
      title: 'Mar de Fondo Fuerte • Precaución en el Litoral',
      badge: '⚠️ Mar Combinada >= 4 m',
      description: `Mar combinada fuerte en umbral de aviso costero AEMET (<strong>${(Math.round(h * 10) / 10).toString().replace('.', ',')} m</strong>, <strong>${Math.round(t)} s</strong> y <strong>${energyKj} kJ</strong>). Fuerte resaca y rompiente pesada en playas, espigones y pedreros del litoral.`,
      phenomenonId: 'mar_fondo'
    };
  }

  return null;
}

/**
 * Renderiza el banner Liquid Glass estilo Alertas AEMET
 */
export function renderMarFondoBanner(swell) {
  if (!swell || !swell.isActive) return '';

  return `
    <div class="mar-fondo-banner ${swell.level} alert-collapsible-card collapsed" role="region" aria-label="${swell.title}">
      <div class="mar-fondo-banner-header" onclick="if (!event.target.closest('button, a')) this.closest('.alert-collapsible-card').classList.toggle('collapsed')" title="Toca para ver el desglose o plegar la alerta">
        <div class="mar-fondo-header-left">
          <div class="mar-fondo-title-group">
            <span class="mar-fondo-icon">🌊</span>
            <span class="mar-fondo-title">${swell.title}</span>
          </div>
          <span class="mar-fondo-badge">${swell.badge}</span>
        </div>
        <div class="alert-header-actions" style="display: flex; align-items: center; gap: 8px;">
          <button class="btn-explain-sensor-compact btn-open-phenomena" data-phenomenon="${swell.phenomenonId || 'mar_fondo'}" title="Aprende por qué es peligroso el mar de fondo en Asturias">💡 ¿Por qué ocurre?</button>
          <span class="alert-chevron" title="Toca para desglosar o plegar">▼</span>
        </div>
      </div>
      <div class="mar-fondo-banner-body alert-collapsible-body">
        <p class="mar-fondo-desc">${swell.description}</p>
        <div class="mar-fondo-metrics">
          ${swell.energyKj ? `<span class="mar-fondo-metric-pill" style="background: ${swell.energyColor}22; color: ${swell.energyColor}; border: 1px solid ${swell.energyColor}77; font-weight: 700;">⚡ Potencia: <strong>${swell.energyKj} kJ</strong> (${swell.energyIcon} ${swell.energyLabel})</span>` : ''}
          <span class="mar-fondo-metric-pill">🌊 Oleaje: <strong>${swell.waveHeight} m</strong></span>
          <span class="mar-fondo-metric-pill">⏱️ Período: <strong>${swell.period} s</strong></span>
          <span class="mar-fondo-metric-pill">🧭 Dirección: <strong>${swell.direction}</strong></span>
          ${swell.isSimulation ? `<span class="mar-fondo-metric-pill simulation-pill">🧪 Simulacro Ley 12</span>` : ''}
        </div>
      </div>
    </div>
  `;
}
