/**
 * Detector de Efecto Foehn ("Vientu les Castañes") para Asturias
 * 
 * Evalúa las condiciones físicas y termodinámicas del Foehn Cantábrico:
 * 1. Sector del viento: Componente Sur estricto (135° SSE a 225° SSO).
 * 2. Desplome de Humedad Relativa: < 52% (moderado), < 38% (severo/extremo).
 *    En el litoral y valles asturianos la humedad típica ronda el 75-95%.
 * 3. Dinámica del viento: Viento sostenido >= 16 km/h o ráfagas >= 28 km/h
 *    aceleradas por compresión y canalización orográfica en la Cordillera.
 */

export const ALLOW_SIMULATION = true; // Habilitado temporalmente para comprobación (Ley 12)

export function detectFoehnEffect(current) {
  // 1. Detección de simulacro controlado (Doctrina Constitucional 12)
  if (ALLOW_SIMULATION && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');
    if (testMode === 'foehn' || testMode === 'castanes' || testMode === 'vientu_sur') {
      const isSevere = urlParams.get('level') === 'severe' || testMode === 'foehn';
      return {
        isActive: true,
        isSevere,
        isSimulation: true,
        level: isSevere ? 'severe' : 'moderate',
        humidity: isSevere ? 32 : 44,
        gusts: isSevere ? 68 : 42,
        windDirection: 195,
        title: isSevere ? 'Foehn Intenso • Vientu les Castañes [SIMULACRO]' : 'Efecto Foehn Activo • Viento Sur [SIMULACRO]',
        badge: isSevere ? '🔥 Viento Sur Violento' : '💨 Aire Seco y Templado',
        description: 'Viento Sur canalizado desde la Cordillera. Humedad desplomada al <strong>32%</strong> con rachas simuladas de <strong>68 km/h</strong>. Ambiente inusualmente seco y recalentado al bajar hacia los valles y la costa.'
      };
    }
  }

  if (!current) return null;

  const dir = current.wind_direction_10m != null ? current.wind_direction_10m : null;
  const rh = current.relative_humidity_2m != null ? current.relative_humidity_2m : null;
  const speed = current.wind_speed_10m != null ? current.wind_speed_10m : 0;
  const gusts = current.wind_gusts_10m != null ? current.wind_gusts_10m : speed;
  const temp = current.temperature_2m != null ? current.temperature_2m : null;
  const precip = current.precipitation != null ? current.precipitation : 0;

  if (dir == null || rh == null) return null;

  // 1. Comprobar sector Sur (entre 135° Sureste y 225° Suroeste)
  const isSouthSector = dir >= 135 && dir <= 225;
  if (!isSouthSector) return null;

  // 2. Comprobar ausencia de lluvia (el Foehn cantábrico produce sombra pluviométrica y ambiente seco)
  if (precip > 0.1) return null;

  // 3. Comprobar desplome de humedad relativa (<= 48% en clima atlántico asturiano) y ambiente templado (>= 15.5 °C)
  if (rh > 48) return null;
  if (temp != null && temp < 15.5) return null;

  // 4. Comprobar actividad real de viento Sur canalizado (rachas >= 38 km/h o sostenido >= 20 km/h)
  if (gusts < 38 && speed < 20) return null;

  // Determinar severidad (riesgo extremo de propagación forestal y turbonadas de Sur)
  const isSevere = (rh <= 35 && gusts >= 50) || gusts >= 65;
  const humidityVal = Math.round(rh);
  const gustsVal = Math.round(gusts);
  const dirVal = Math.round(dir);

  return {
    isActive: true,
    isSevere,
    level: isSevere ? 'severe' : 'moderate',
    humidity: humidityVal,
    gusts: gustsVal,
    windDirection: dirVal,
    title: isSevere ? 'Foehn Intenso • Vientu les Castañes' : 'Efecto Foehn Activo • Viento Sur',
    badge: isSevere ? '🔥 Viento Sur Violento' : '💨 Aire Seco y Templado',
    description: `Viento Sur canalizado desde la Cordillera. Humedad desplomada al <strong>${humidityVal}%</strong> con rachas de <strong>${gustsVal} km/h</strong>. Ambiente inusualmente seco y recalentado al bajar hacia los valles y la costa.`
  };
}

export function renderFoehnBanner(foehn) {
  if (!foehn || !foehn.isActive) return '';

  return `
    <div class="foehn-banner ${foehn.level} alert-collapsible-card collapsed" role="region" aria-label="${foehn.title}">
      <div class="foehn-banner-header" onclick="if (!event.target.closest('button, a')) this.closest('.alert-collapsible-card').classList.toggle('collapsed')" title="Toca para ver el desglose o plegar la alerta">
        <div class="foehn-header-left">
          <div class="foehn-title-group">
            <span class="foehn-icon">🔥</span>
            <span class="foehn-title">${foehn.title}</span>
          </div>
          <span class="foehn-badge">${foehn.badge}</span>
        </div>
        <div class="alert-header-actions" style="display: flex; align-items: center; gap: 8px;">
          <button class="btn-explain-sensor-compact btn-open-phenomena" data-phenomenon="foehn" title="Aprende por qué el Viento Sur calienta y seca el aire en Asturias">💡 ¿Por qué ocurre?</button>
          <span class="alert-chevron" title="Toca para desglosar o plegar">▼</span>
        </div>
      </div>
      <div class="foehn-banner-body alert-collapsible-body">
        <p class="foehn-desc">${foehn.description}</p>
        <div class="foehn-metrics">
          <span class="foehn-metric-pill">💧 Humedad: <strong>${foehn.humidity}%</strong> (desplomada)</span>
          <span class="foehn-metric-pill">💨 Racha: <strong>${foehn.gusts} km/h</strong></span>
          <span class="foehn-metric-pill">🧭 Rumbo: <strong>${foehn.windDirection}° (Sur)</strong></span>
        </div>
      </div>
    </div>
  `;
}
