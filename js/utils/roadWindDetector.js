/**
 * Detector Silencioso e Inteligente de Viento Lateral en Carretera y Viaductos de Asturias
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Mismo formato arquitectónico, cabecera y marco que la Galerna Cantábrica, Foehn y Xelu.
 * Cumple estrictamente con la Doctrina Constitucional 11 (Ergonomía Móvil),
 * Doctrina 12 (Simulacro y Modo Silencioso) y Doctrina 16 (Exención de Responsabilidad Civil).
 */

export const ALLOW_SIMULATION = false; // Desconectado formalmente tras visto bueno de Lendo (Ley 12)

/**
 * Catálogo de Viaductos y Puntos Críticos de la Red Viaria según Concejo y Comarca
 */
export function getViaductsForConcejo(concejo) {
  if (!concejo) {
    return [
      { name: 'Viaductos A-8 Costa', road: 'A-8', km: 'Artedo / San Pedro / Río España' },
      { name: 'Autovía del Huerna', road: 'A-66', km: 'Pajares / Campomanes' }
    ];
  }

  const cId = concejo.id || '';
  const reg = concejo.region || '';

  // 1. Costa Occidental y Franja A-8 Occidental
  if (['cudillero', 'valdes', 'murosdenalon', 'muros-de-nalon', 'sotodelbarco', 'soto-del-barco'].includes(cId)) {
    return [
      { name: 'Viaducto de Concha de Artedo', road: 'A-8 (km 431)', detail: '110 m de altura, paso de gran enfilación costera' },
      { name: 'Viaducto de San Pedro de la Ribera', road: 'A-8 (km 435)', detail: 'Desembocadura de vaguada muy batida por rachas' },
      { name: 'Viaducto de Cabo Vidio / Oviñana', road: 'A-8 (km 438)', detail: 'Rachas laterales cruzadas de componente W/NW' },
      { name: 'Viaducto del Nalón (Muros / Soto)', road: 'A-8 (km 425)', detail: 'Paso elevado abierto sobre la ría' }
    ];
  }

  if (['navia', 'coana', 'elfranco', 'el-franco', 'tapiadecasariego', 'tapia-de-casariego', 'castropol', 'vegadeo'].includes(cId)) {
    return [
      { name: 'Viaducto de los Santos', road: 'A-8 (km 505)', detail: 'Frontera Ría del Eo, viento marítimo muy encajonado' },
      { name: 'Viaducto de Barayo', road: 'A-8 (km 478)', detail: 'Vaguada abierta con viento de través' },
      { name: 'Viaducto de la Ría de Navia', road: 'A-8 (km 472)', detail: 'Paso expuesto sobre el estuario' }
    ];
  }

  // 2. Costa Central y Bahías (Castrillón, Avilés, Gozón, Carreño, Corvera)
  if (['castrillon', 'aviles', 'gozon', 'carreno', 'corvera', 'corveradeasturias', 'illas'].includes(cId)) {
    return [
      { name: 'Viaducto de San Sebastián', road: 'A-8 (km 415)', detail: 'Aproximación a Salinas y Piedras Blancas' },
      { name: 'Nudo y Enlaces de Serín', road: 'A-8 / A-66', detail: 'Confluencia ventosa Y griega y ramales elevados' },
      { name: 'Viaducto de La Florida / Tabaza', road: 'AS-19 / A-8', detail: 'Paso elevado industrial expuesto al Nordés y Sur' }
    ];
  }

  // 3. Gijón y Costa Oriental
  if (['gijon', 'villaviciosa', 'colunga', 'caravia', 'ribadesella'].includes(cId)) {
    return [
      { name: 'Viaducto del Río España', road: 'A-8 (km 368)', detail: 'Barranco profundo y rachas de través de alta violencia' },
      { name: 'Viaducto de Tazones / Ría Villaviciosa', road: 'A-8 (km 360)', detail: 'Gran rasante elevada sobre el estuario' },
      { name: 'Viaducto sobre la Ría del Sella', road: 'A-8 (km 326)', detail: 'Ribadesella, paso batido por viento marino y fluvial' },
      { name: 'Ronda Sur de Gijón y Alto Madera', road: 'A-8 / AS-II', detail: 'Zonas altas de enlace con ráfagas cruzadas' }
    ];
  }

  if (['llanes', 'ribadedeva'].includes(cId)) {
    return [
      { name: 'Viaducto de Niembro / Celorio', road: 'A-8 (km 308)', detail: 'Paso litoral elevado entre mar y sierra' },
      { name: 'Viaducto del Río Bedón', road: 'A-8 (km 312)', detail: 'Canalización de viento de valle hacia el mar' },
      { name: 'Viaducto del Río Deva', road: 'A-8 (km 292)', detail: 'Límite oriental con Cantabria, muy expuesto' }
    ];
  }

  // 4. Montaña y Pasos Sur (Lena, Aller, Mieres, Riosa, Morcín)
  if (['lena', 'aller', 'mieres', 'riosa', 'morcin', 'pajares', 'fuentesdeinvierno'].includes(cId) || reg.includes('Caudal')) {
    return [
      { name: 'Autovía del Huerna (A-66)', road: 'A-66 (km 65-88)', detail: 'Viaductos de Campomanes y aproches de alta montaña' },
      { name: 'Túnel del Negrón (Bocas Norte y Sur)', road: 'A-66 (km 89)', detail: 'Cambio brusco de viento y cizalladura al salir' },
      { name: 'Puerto de Pajares', road: 'N-630', detail: 'Curvas de cresta y ventiscas de componente Norte o Sur' },
      { name: 'Viaducto de Olloniego', road: 'A-66 (km 43)', detail: 'Paso elevado sobre el Nalón encajonado' }
    ];
  }

  // 5. Interior Occidental y Autovía A-63 (Grado, Salas, Tineo, Cangas del Narcea, etc.)
  if (['grado', 'salas', 'candamo', 'pravia', 'tineo', 'cangasdelnarcea', 'cangas-del-narcea', 'belmontedemiranda', 'allande', 'degana', 'ibias'].includes(cId) || reg.includes('Suroccidente') || reg.includes('Occidente Interior')) {
    return [
      { name: 'Viaductos de Doriga y Cornellana', road: 'A-63 (km 28-36)', detail: 'Grandes luces sobre la vega del Narcea' },
      { name: 'Viaducto de Casazorrina / Salas', road: 'A-63 (km 42)', detail: 'Ascensión expuesta con viento encajonado' },
      { name: 'Alto de La Espina', road: 'A-63 / N-634', detail: 'Rachas de cumbre y niebla orográfica' }
    ];
  }

  // 6. Oriente Interior y Picos de Europa (Cangas de Onís, Parres, Piloña, Cabrales, Onís, Amieva, Ponga, Caso, Sobrescobio)
  if (['cangasdeonis', 'cangas-de-onis', 'parres', 'pilona', 'cabrales', 'penasanta', 'onis', 'amieva', 'ponga', 'caso', 'sobrescobio'].includes(cId) || reg.includes('Picos') || reg.includes('Oriente')) {
    return [
      { name: 'Viaductos N-634 sobre el Sella', road: 'N-634 (Arriondas)', detail: 'Pasos abiertos de vega fluvial' },
      { name: 'Desfiladero de los Beyos', road: 'N-625', detail: 'Cañón estrecho con corrientes térmicas aceleradas' },
      { name: 'Desfiladero del Cares / Cabrales', road: 'AS-114', detail: 'Encajonamiento de vientos de alta montaña' }
    ];
  }

  // 7. Centro y Cuenca del Nalón (Oviedo, Siero, Llanera, Noreña, Langreo, San Martín, Laviana)
  return [
    { name: 'Viaducto de Olloniego', road: 'A-66 (km 43)', detail: 'Paso sobre el Nalón con ráfagas cruzadas' },
    { name: 'Enlaces A-64 El Berrón / Lieres', road: 'A-64 (km 12-22)', detail: 'Tramos despejados de meseta central' },
    { name: 'Nudo de Serín (A-8 / A-66)', road: 'A-8 / A-66', detail: 'Confluencia estratégica de la Y asturiana' }
  ];
}

/**
 * Evalúa el riesgo meteorológico de viento lateral en viaductos y carretera
 */
export function detectRoadWindStatus(current, daily, hourly, concejo) {
  if (!current) return null;

  const viaducts = getViaductsForConcejo(concejo);

  // 1. Detección de simulacro controlado (Doctrina Constitucional 12)
  if (ALLOW_SIMULATION && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');
    if (testMode === 'viento_viaductos' || testMode === 'viaductos' || testMode === 'viento_carretera') {
      return {
        isActive: true,
        isSimulation: true,
        isBannerActive: true,
        level: 'warning',
        speed: 48,
        gusts: 74,
        windDir: 285,
        windDirName: 'Oeste / Noroeste (WNW)',
        viaducts,
        title: '🚗💨 Precaución por Viento Lateral en Viaductos y Autovías',
        badge: '⚠️ Riesgo de Desestabilización',
        description: 'Rachas intensas de viento transversal incidiendo sobre viaductos y pasos elevados. <strong>Fuerte efecto pantalla al adelantar camiones o salir de desmontes y túneles</strong>. Máxima precaución con furgonetas, caravanas, remolques y vehículos de dos ruedas.',
        adviceList: [
          'Sujetar el volante con ambas manos con firmeza ante sacudidas laterales imprevistas.',
          'Moderar la velocidad para reducir el empuje aerodinámico y aumentar la trayectoria.',
          'Aumentar la distancia de seguridad lateral con vehículos pesados y motocicletas.',
          'Atender a los paneles de mensaje variable (PMV) de la DGT y mangas de viento en viaductos.'
        ]
      };
    }

    if (testMode === 'viaductos_severo' || testMode === 'viento_severo' || testMode === 'temporal_viaductos') {
      return {
        isActive: true,
        isSimulation: true,
        isBannerActive: true,
        level: 'severe',
        speed: 68,
        gusts: 94,
        windDir: 260,
        windDirName: 'Oeste / Suroeste (WSW)',
        viaducts,
        title: '🚨💨 Alerta Severa de Viento Lateral en Viaductos y Trazados Altos',
        badge: '⛔ Alto Riesgo de Vuelco / Tijera',
        description: 'Temporal severo con <strong>rachas huracanadas superando los 90 km/h</strong> en viaductos expuestos de la costa y altos de montaña. Riesgo crítico de efecto tijera en camiones articulados y pérdida total de trayectoria en vehículos ligeros o de gran superficie lateral.',
        adviceList: [
          'Evitar circular con autocaravanas, furgonetas vacías o remolques por viaductos expuestos.',
          'Prohibida la circulación de vehículos de dos ruedas (motos y bicicletas) en tramos críticos.',
          'Reducción drástica de velocidad y abandono de la vía hacia zonas de abrigo si el vehículo se desplaza.',
          'Consultar obligatoriamente el estado de la red en DGT (011) o el 112 Asturias antes de viajar.'
        ]
      };
    }
  }

  const speed = current.wind_speed_10m != null ? Math.round(current.wind_speed_10m) : 0;
  const gusts = current.wind_gusts_10m != null ? Math.round(current.wind_gusts_10m) : speed;
  const windDir = current.wind_direction_10m != null ? Math.round(current.wind_direction_10m) : 0;

  // Analizar previsión diaria y pico horario en las próximas 24 horas (Visión Dual Ley Específica 12.10)
  const dailyMaxGust = Math.round((daily?.wind_gusts_10m_max && daily.wind_gusts_10m_max[0] != null) ? daily.wind_gusts_10m_max[0] : gusts);
  let peakGustHourly = 0;
  let peakHourIndex = -1;
  let peakHourStr = '';
  if (hourly && Array.isArray(hourly.wind_gusts_10m) && Array.isArray(hourly.time)) {
    for (let i = 0; i < Math.min(hourly.wind_gusts_10m.length, 24); i++) {
      const g = typeof hourly.wind_gusts_10m[i] === 'number' ? Math.round(hourly.wind_gusts_10m[i]) : 0;
      if (g > peakGustHourly) {
        peakGustHourly = g;
        peakHourIndex = i;
      }
    }
    if (peakHourIndex !== -1 && hourly.time[peakHourIndex]) {
      const d = new Date(hourly.time[peakHourIndex]);
      peakHourStr = `${String(d.getHours()).padStart(2, '0')}:00 h`;
    }
  }
  const maxAnticipatedGust = Math.max(gusts, dailyMaxGust, peakGustHourly);

  // Determinar dirección cardinal legible aproximada
  let windDirName = 'Variable';
  if (windDir >= 337.5 || windDir < 22.5) windDirName = 'Norte (N)';
  else if (windDir >= 22.5 && windDir < 67.5) windDirName = 'Nordeste (NE)';
  else if (windDir >= 67.5 && windDir < 112.5) windDirName = 'Este (E)';
  else if (windDir >= 112.5 && windDir < 157.5) windDirName = 'Sureste (SE)';
  else if (windDir >= 157.5 && windDir < 202.5) windDirName = 'Sur (S)';
  else if (windDir >= 202.5 && windDir < 247.5) windDirName = 'Suroeste (SW)';
  else if (windDir >= 247.5 && windDir < 292.5) windDirName = 'Oeste (W)';
  else if (windDir >= 292.5 && windDir < 337.5) windDirName = 'Noroeste (NW)';

  // 2. Umbrales de evaluación vial con Visión Dual (En vivo vs Preaviso)
  const isSevereNow = gusts >= 85;
  const isWarningNow = gusts >= 65 && gusts < 85;
  const isSevereForecast = !isSevereNow && !isWarningNow && maxAnticipatedGust >= 85;
  const isWarningForecast = !isSevereNow && !isWarningNow && !isSevereForecast && maxAnticipatedGust >= 65;

  const isSevere = isSevereNow || isSevereForecast;
  const isWarning = isWarningNow || isWarningForecast;
  const isCaution = !isSevere && !isWarning && (gusts >= 45 || maxAnticipatedGust >= 45);
  const isForecast = isSevereForecast || isWarningForecast || (isCaution && gusts < 45);

  const isBannerActive = isSevere || isWarning;

  let level = 'safe';
  if (isSevere) level = 'severe';
  else if (isWarning) level = 'warning';
  else if (isCaution) level = 'caution';

  let title = '';
  let badge = '';
  let description = '';
  let adviceList = [];

  if (isSevereNow) {
    title = '🚨💨 Alerta Severa en Vivo: Viento Lateral en Viaductos y Trazados Altos';
    badge = '⛔ En Curso: Alto Riesgo de Vuelco / Tijera';
    description = `Temporal severo en curso con rachas registradas de <strong>${gusts} km/h</strong> incidiendo sobre viaductos expuestos. Riesgo crítico de sacudida lateral y pérdida de control para furgonetas, caravanas y motocicletas.`;
    adviceList = [
      'Evitar circular con autocaravanas, furgonetas vacías o remolques por viaductos elevados.',
      'Extremar la prudencia al salir de túneles y tramos encajonados al puente.',
      'Reducción preventiva de velocidad a límites de seguridad vial.',
      'Consulta imperativa con DGT (011) o el 112 Asturias.'
    ];
  } else if (isWarningNow) {
    title = '🚗💨 Precaución en Vivo: Viento Lateral en Viaductos y Autovías';
    badge = '⚠️ En Curso: Riesgo de Desestabilización';
    description = `Rachas registradas de <strong>${gusts} km/h</strong> de componente <strong>${windDirName}</strong>. Efecto empuje lateral pronunciado sobre vehículos altos y ligeros en pasos elevados y viaductos.`;
    adviceList = [
      'Sujetar con firmeza el volante ante sacudidas laterales imprevistas al superar camiones.',
      'Moderar la velocidad para reducir el empuje dinámico del viento.',
      'Aumentar la distancia de seguridad lateral con el resto de usuarios.',
      'Atender a las mangas de viento instaladas por el Ministerio en los viaductos.'
    ];
  } else if (isSevereForecast) {
    title = '🚨💨 Preaviso de Temporal Severo en Viaductos y Autovías';
    badge = '🕒 Preaviso: Temporal Previsto Hoy';
    description = `Viento moderado en este momento (<strong>${gusts} km/h</strong>), pero los modelos alertan de un <strong>temporal severo con rachas de hasta ${maxAnticipatedGust} km/h</strong>${peakHourStr ? ` previsto en torno a las ${peakHourStr}` : ' a lo largo de la jornada'} en viaductos expuestos de este corredor. Riesgo crítico de desestabilización para vehículos ligeros o de gran superficie.`;
    adviceList = [
      'Planifique sus desplazamientos evitando circular en las horas de mayor intensidad de viento.',
      'Evite circular con autocaravanas, remolques o furgonetas ligeras durante el paso del temporal.',
      'Atender a los paneles de mensaje variable (PMV) de la DGT y avisos del 112 Asturias.'
    ];
  } else if (isWarningForecast) {
    title = '🚗💨 Preaviso de Viento Lateral en Viaductos y Autovías';
    badge = '🕒 Preaviso: Viento Fuerte Previsto Hoy';
    description = `Viento favorable en este momento (<strong>${gusts} km/h</strong>), pero se prevé un <strong>aumento de viento con rachas de hasta ${maxAnticipatedGust} km/h</strong>${peakHourStr ? ` (máxima prevista hacia las ${peakHourStr})` : ' durante la jornada'}. Tenga en cuenta el efecto pantalla en viaductos si va a circular hoy.`;
    adviceList = [
      'Sujetar el volante con ambas manos con firmeza ante sacudidas laterales imprevistas.',
      'Moderar la velocidad para reducir el empuje aerodinámico del viento.',
      'Aumentar la distancia de seguridad lateral con vehículos pesados.'
    ];
  }

  return {
    isActive: true,
    isSimulation: false,
    isBannerActive,
    isForecast,
    level,
    speed,
    gusts,
    maxAnticipatedGust,
    peakHourStr,
    windDir,
    windDirName,
    viaducts,
    title,
    badge,
    description,
    adviceList
  };
}

/**
 * Renderiza la píldora compacta ergonómica dentro del Anemómetro (Sensor #1)
 */
export function renderRoadWindSensorPill(roadWind) {
  if (!roadWind) return '';

  const { level, gusts, isForecast, maxAnticipatedGust, peakHourStr } = roadWind;

  if (isForecast) {
    if (level === 'severe') {
      return `<div class="sensor-sub road-wind-tag severe" title="Preaviso vial: rachas severas de hasta ${maxAnticipatedGust} km/h previstas hoy${peakHourStr ? ` (${peakHourStr})` : ''} en viaductos y puertos. Peligro de vuelco para motos y vehículos altos.">🕒 Viaductos / Tráfico: <strong>Preaviso temporal (${maxAnticipatedGust} km/h)</strong></div>`;
    }
    if (level === 'warning') {
      return `<div class="sensor-sub road-wind-tag warning" title="Preaviso vial: rachas de hasta ${maxAnticipatedGust} km/h previstas hoy${peakHourStr ? ` (${peakHourStr})` : ''} en viaductos expuestos.">🕒 Viaductos A-8/A-66: <strong>Preaviso viento (${maxAnticipatedGust} km/h)</strong></div>`;
    }
    if (level === 'caution') {
      return `<div class="sensor-sub road-wind-tag caution" title="Preaviso vial: rachas moderadas de hasta ${maxAnticipatedGust} km/h previstas hoy.">🕒 Viaductos / Altos: <strong>Preaviso moderado (${maxAnticipatedGust} km/h)</strong></div>`;
    }
  }

  if (level === 'severe') {
    return `<div class="sensor-sub road-wind-tag severe" title="Alerta vial en vivo: rachas severas de ${gusts} km/h en viaductos y puertos. Peligro de vuelco para motos y vehículos altos.">⛔ Viaductos / Tráfico: <strong>Alerta severa en vivo (${gusts} km/h)</strong></div>`;
  }
  if (level === 'warning') {
    return `<div class="sensor-sub road-wind-tag warning" title="Precaución vial en vivo: rachas de ${gusts} km/h en viaductos y trazados elevados.">🚨 Viaductos A-8/A-66: <strong>Viento lateral en vivo (${gusts} km/h)</strong></div>`;
  }
  if (level === 'caution') {
    return `<div class="sensor-sub road-wind-tag caution" title="Viento moderado: atención en viaductos expuestos de la red principal.">⚠️ Viaductos / Altos: <strong>Viento moderado (${gusts} km/h)</strong></div>`;
  }
  return `<div class="sensor-sub road-wind-tag safe" title="Condiciones óptimas: viento favorable y seguro en la red viaria asturiana.">🚗 Viaductos / Tráfico: <strong>Viento favorable (&lt; 45 km/h)</strong></div>`;
}

/**
 * Renderiza el Banner Dinámico Silencioso de Alerta de Viento en Viaductos
 */
export function renderRoadWindBanner(roadWind) {
  if (!roadWind || !roadWind.isBannerActive) return '';

  const isSevere = roadWind.level === 'severe';
  const viaductsList = roadWind.viaducts || [];

  return `
    <div class="road-wind-banner ${isSevere ? 'severe' : 'warning'}">
      <div class="road-wind-banner-header">
        <div class="road-wind-header-left">
          <span class="road-wind-icon">${isSevere ? '🚨' : '🚗💨'}</span>
          <span class="road-wind-title">${roadWind.title}</span>
          <span class="road-wind-badge">${roadWind.badge}</span>
        </div>
        <button class="btn-explain-sensor-compact btn-open-phenomena" data-phenomenon="viento" title="Aprende cómo afecta el viento lateral en puentes y túneles">💡 Física del Viento</button>
      </div>

      <div class="road-wind-banner-body">
        <p class="road-wind-desc">${roadWind.description}</p>

        <!-- Puntos Críticos y Viaductos del Entorno -->
        <div class="road-wind-section-title">📍 Viaductos y Trazados Sensibles en este Corredor:</div>
        <div class="road-wind-viaducts">
          ${viaductsList.map(v => `
            <div class="road-wind-viaduct-pill" title="${v.detail || ''}">
              <span class="viaduct-road">${v.road}</span>
              <span class="viaduct-name">${v.name}</span>
            </div>
          `).join('')}
        </div>

        <!-- Métricas Viales -->
        <div class="road-wind-metrics">
          <span class="road-wind-metric-pill">💨 ${roadWind.isForecast ? 'Pico Máx. Previsto' : 'Racha Actual'}: <strong>${roadWind.isForecast ? roadWind.maxAnticipatedGust : roadWind.gusts} km/h</strong></span>
          ${roadWind.isForecast ? `<span class="road-wind-metric-pill">⏱️ Racha Actual: <strong>${roadWind.gusts} km/h</strong></span>` : ''}
          <span class="road-wind-metric-pill">🧭 Dirección: <strong>${roadWind.windDirName}</strong></span>
          <span class="road-wind-metric-pill">🚚 Vehículos: <strong>Motos, Furgos y Caravanas</strong></span>
        </div>

        <!-- Cláusula de Seguridad y Descargo Legal (Doctrina 16) -->
        <div class="road-wind-legal-note">
          ⚖️ <em>Aviso orientativo preventivo basado en modelos numéricos. Prevalecen las órdenes de la Agrupación de Tráfico de la Guardia Civil, paneles PMV de la DGT (tel. 011 / dgt.es) y el 112 Asturias.</em>
        </div>
      </div>
    </div>
  `;
}
