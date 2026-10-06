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
        waveHeight: 2.8,
        period: 14,
        direction: 'NW (315°)',
        title: 'Mar de Fondo Activo • Resaca en Playas [SIMULACRO]',
        badge: '⚠️ Resaca y Mar Tendido',
        description: 'Oleaje atlántico de período largo (<strong>14 s</strong>) con fuerte masa de agua. Resaca engañosa y corrientes de retorno peligrosas en la orilla de las playas. Precaución en el baño.',
        phenomenonId: 'mar_fondo'
      };
    }

    if (testMode === 'mar_fondo_rojo' || testMode === 'golpe_mar' || testMode === 'temporal_maritimo') {
      return {
        isActive: true,
        isSimulation: true,
        level: 'severe',
        waveHeight: 4.6,
        period: 16,
        direction: 'WNW (295°)',
        title: 'Golpe de Mar Severo • Peligro en Espigones y Paseos [SIMULACRO]',
        badge: '🚨 Peligro en la Costa',
        description: 'Mar de fondo masivo y muy energético con olas de <strong>4,6 m</strong> y período de <strong>16 s</strong>. Alto riesgo de que series de olas sobrepasen espigones, acantilados y paseos marítimos. Aléjate del borde costero.',
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

  // 3. Calibración Rigurosa de Niveles (Amarillo y Rojo)
  // A) Nivel Rojo (Severo):
  //    - Olas de más de 3.8m con período largo (>= 12s)
  //    - O mar muy grueso / temporal severo directo (>= 4.8m)
  const isSevere = (h >= 3.8 && t >= 12) || (h >= 4.8);

  // B) Nivel Amarillo (Aviso / Resaca activa):
  //    - Olas de 2.0m a 3.8m con período largo (>= 11s)
  //    - Olas de 3.2m a 4.8m con período normal
  const isWarning = !isSevere && (
    (h >= 2.0 && t >= 11) ||
    (h >= 3.2 && t >= 8)
  );

  if (isSevere) {
    return {
      isActive: true,
      level: 'severe',
      waveHeight: Math.round(h * 10) / 10,
      period: Math.round(t),
      direction: dirText,
      title: 'Golpe de Mar Severo • Peligro en Espigones y Paseos',
      badge: '🚨 Peligro en la Costa',
      description: `Mar de fondo atlántico muy energético (<strong>${(Math.round(h * 10) / 10).toString().replace('.', ',')} m</strong> con período de <strong>${Math.round(t)} s</strong>). Alto riesgo de golpes de mar repentinos superando escolleras, rocas y paseos costeros. Extrema la precaución y mantén la distancia de seguridad.`,
      phenomenonId: 'mar_fondo'
    };
  }

  if (isWarning) {
    return {
      isActive: true,
      level: 'warning',
      waveHeight: Math.round(h * 10) / 10,
      period: Math.round(t),
      direction: dirText,
      title: 'Mar de Fondo Activo • Resaca en Playas',
      badge: '⚠️ Resaca y Mar Tendido',
      description: `Entrada de mar de fondo en el litoral (<strong>${(Math.round(h * 10) / 10).toString().replace('.', ',')} m</strong> con período de <strong>${Math.round(t)} s</strong>). Fuerte resaca y corrientes de resaca invisibles en orillas y rompientes de baño. Atención a las banderas de la playa.`,
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
    <div class="mar-fondo-banner ${swell.level}">
      <div class="mar-fondo-banner-header">
        <div class="mar-fondo-header-left">
          <span class="mar-fondo-icon">🌊</span>
          <span class="mar-fondo-title">${swell.title}</span>
          <span class="mar-fondo-badge">${swell.badge}</span>
        </div>
        <button class="btn-explain-sensor-compact btn-open-phenomena" data-phenomenon="${swell.phenomenonId || 'mar_fondo'}" title="Aprende por qué es peligroso el mar de fondo en Asturias">💡 ¿Por qué ocurre?</button>
      </div>
      <div class="mar-fondo-banner-body">
        <p class="mar-fondo-desc">${swell.description}</p>
        <div class="mar-fondo-metrics">
          <span class="mar-fondo-metric-pill">🌊 Oleaje: <strong>${swell.waveHeight} m</strong></span>
          <span class="mar-fondo-metric-pill">⏱️ Período: <strong>${swell.period} s</strong></span>
          <span class="mar-fondo-metric-pill">🧭 Dirección: <strong>${swell.direction}</strong></span>
          ${swell.isSimulation ? `<span class="mar-fondo-metric-pill simulation-pill">🧪 Simulacro Ley 12</span>` : ''}
        </div>
      </div>
    </div>
  `;
}
