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

export function detectFoehnEffect(current) {
  if (!current) return null;

  const dir = current.wind_direction_10m != null ? current.wind_direction_10m : null;
  const rh = current.relative_humidity_2m != null ? current.relative_humidity_2m : null;
  const speed = current.wind_speed_10m != null ? current.wind_speed_10m : 0;
  const gusts = current.wind_gusts_10m != null ? current.wind_gusts_10m : speed;

  if (dir == null || rh == null) return null;

  // 1. Comprobar sector Sur (entre 135° Sureste y 225° Suroeste)
  const isSouthSector = dir >= 135 && dir <= 225;
  if (!isSouthSector) return null;

  // 2. Comprobar desplome de humedad relativa (< 52% en clima atlántico asturiano)
  if (rh >= 52) return null;

  // 3. Comprobar actividad de viento o racha
  if (gusts < 28 && speed < 16) return null;

  // Determinar severidad
  const isSevere = rh <= 38 || gusts >= 52;
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
    title: isSevere ? '🌪️ Foehn Intenso • Vientu les Castañes' : '🌬️ Efecto Foehn Activo • Viento Sur',
    badge: isSevere ? '🔥 Viento Sur Violento' : '💨 Aire Seco y Templado',
    description: `Viento Sur canalizado desde la Cordillera. Humedad desplomada al <strong>${humidityVal}%</strong> con rachas de <strong>${gustsVal} km/h</strong>. Ambiente inusualmente seco y recalentado al bajar hacia los valles y la costa.`
  };
}

export function renderFoehnBanner(foehn) {
  if (!foehn || !foehn.isActive) return '';

  return `
    <div class="foehn-banner ${foehn.level}">
      <div class="foehn-banner-header">
        <div class="foehn-header-left">
          <span class="foehn-icon">🔥</span>
          <span class="foehn-title">${foehn.title}</span>
          <span class="foehn-badge">${foehn.badge}</span>
        </div>
        <button class="btn-explain-sensor-compact btn-open-phenomena" data-phenomenon="foehn" title="Aprende por qué el Viento Sur calienta y seca el aire en Asturias">💡 ¿Por qué ocurre?</button>
      </div>
      <div class="foehn-banner-body">
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
