/**
 * Detector Silencioso e Inteligente de Borrina Marina y Nieblas de Inversión Térmica en Asturias
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Mismo formato arquitectónico, cabecera y marco que la Galerna Cantábrica, Foehn y Xelu.
 * Cumple estrictamente con la Doctrina Constitucional 12 (Simulacro y Modo Silencioso).
 */

export const ALLOW_SIMULATION = true; // Habilitado temporalmente para comprobación (Ley 12)

export function detectBorrinaEffect(current, hourly, concejo) {
  if (!current || !concejo) return null;

  // 1. Detección de simulacro controlado (Doctrina Constitucional 12)
  if (ALLOW_SIMULATION && typeof window !== 'undefined') {
    const rawSearch = decodeURIComponent(window.location.search || '').toLowerCase();
    const isValle = rawSearch.includes('test=inversion') || 
                    rawSearch.includes('test=valle') || 
                    rawSearch.includes('test=niebla_valle');
    const isBorrinaMarina = rawSearch.includes('test=borrina') || 
                            rawSearch.includes('test=marina') || 
                            rawSearch.includes('test=niebla') || 
                            rawSearch.includes('test=taro') ||
                            rawSearch.includes('simulacro=borrina');

    if (isBorrinaMarina && !isValle) {
      return {
        isActive: true,
        isSimulation: true,
        type: 'marina',
        level: 'warning',
        humidity: 98,
        temp: 16.2,
        dewPoint: 15.9,
        windSpeed: 8,
        visibility: 450,
        phenomenonId: 'borrina',
        title: 'Borrina Marina Activa • Litoral Cantábrico [SIMULACRO]',
        badge: '⚠️ Niebla de Advección',
        description: 'Manto denso y bajo de niebla marina entrando desde el Cantábrico por brisa marina. <strong>Visibilidad reducida a ~450 m</strong> y desplome de la sensación térmica en la costa. Cielo despejado o resol a pocos kilómetros hacia el interior.'
      };
    }
    if (isValle) {
      return {
        isActive: true,
        isSimulation: true,
        type: 'valle',
        level: 'warning',
        humidity: 97,
        temp: 6.8,
        dewPoint: 6.5,
        windSpeed: 3,
        visibility: 300,
        phenomenonId: 'inversion',
        title: 'Niebla de Valle Zarrada • Inversión Térmica [SIMULACRO]',
        badge: '⚠️ Niebla en Fondo de Cuenca',
        description: 'Bolsa de aire frío atrapada en el fondo del valle con <strong>visibilidad reducida a ~300 m</strong> en carreteras fluviales y cuencas. Cielo despejado, sol resplandeciente y ambiente más templado por encima de los 400-600 m de altitud.'
      };
    }
  }

  const rh = current.relative_humidity_2m != null ? Math.round(current.relative_humidity_2m) : null;
  const temp = current.temperature_2m != null ? current.temperature_2m : null;
  const speed = current.wind_speed_10m != null ? Math.round(current.wind_speed_10m) : 0;
  const weatherCode = current.weather_code != null ? parseInt(current.weather_code, 10) : 0;
  const precip = current.precipitation != null ? parseFloat(current.precipitation) : 0;

  if (rh == null || temp == null) return null;

  // Si está cayendo lluvia o chubascos significativos (>= 0.5 mm), no es niebla pura sino precipitación
  if (precip >= 0.5 && weatherCode !== 45 && weatherCode !== 48) return null;

  // Cálculo de punto de rocío
  const a = 17.27, b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + Math.log(rh / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  const dewSpread = Math.abs(temp - dewPoint);

  // Ámbitos geográficos: catálogo completo de concejos con fachada litoral en Asturias
  const isCoast = concejo.type === 'coast' || 
                  (concejo.region && concejo.region.toLowerCase().includes('costa')) ||
                  (concejo.region && concejo.region.toLowerCase().includes('costero')) ||
                  concejo.id === 'castrillon' || concejo.id === 'gijon' || concejo.id === 'gozon' ||
                  concejo.id === 'llanes' || concejo.id === 'ribadesella' || concejo.id === 'carreno' ||
                  concejo.id === 'aviles' || concejo.id === 'valdes' || concejo.id === 'tapiadecasariego' ||
                  concejo.id === 'cudillero' || concejo.id === 'villaviciosa' || concejo.id === 'colunga' ||
                  concejo.id === 'sotodelbarco' || concejo.id === 'navia' || concejo.id === 'elfranco' ||
                  concejo.id === 'coana' || concejo.id === 'ribadedeva' || concejo.id === 'caravia' ||
                  concejo.id === 'castropol' || concejo.id === 'murosdenalon';

  // Visibilidad estimada (si viene en hourly o en current)
  let visibility = null;
  if (hourly && Array.isArray(hourly.visibility)) {
    const nowHour = new Date().getHours();
    if (hourly.visibility[nowHour] != null) {
      visibility = Math.round(hourly.visibility[nowHour]);
    }
  }

  // 1. EVALUACIÓN BORRINA MARINA (COSTA ASTURIANA)
  // Simbiosis OMM / AEMET: Solo se declara Niebla/Borrina si existe visibilidad horizontal <= 1.000 m
  // o código oficial WMO de niebla (45/48). Queda prohibido disparar alerta de niebla en noches despejadas (> 1.000 m de visibilidad) solo por humedad.
  if (isCoast) {
    const isFogCode = weatherCode === 45 || weatherCode === 48;
    const isRealFogVis = visibility != null ? (visibility <= 1000) : isFogCode;
    const isMarineSaturated = rh >= 92 && dewSpread <= 1.5 && speed <= 25;

    if (isRealFogVis && (isFogCode || isMarineSaturated)) {
      // Umbral Oficial AEMET Meteoalerta para Nieblas: <= 200 m (Severo / Rojo) | 201-1000 m (Aviso Amarillo)
      const isSevere = visibility != null ? (visibility <= 200) : (rh >= 98 && isFogCode);
      return {
        isActive: true,
        type: 'marina',
        level: isSevere ? 'severe' : 'warning',
        humidity: rh,
        temp,
        dewPoint: Math.round(dewPoint * 10) / 10,
        windSpeed: speed,
        visibility,
        phenomenonId: 'borrina',
        title: isSevere ? 'Borrina Marina Densa • Litoral Cantábrico' : 'Borrina Marina Activa • Costa Asturiana',
        badge: isSevere ? '🚨 Visibilidad <= 200 m (Umbral AEMET)' : '⚠️ Visibilidad Reducida (<= 1 km)',
        description: `Manto denso de niebla marina arrastrado desde el mar Cantábrico hacia el litoral (humedad del <strong>${rh}%</strong>). Desplome de la sensación térmica en playas y paseos costeros.${visibility ? ` Visibilidad horizontal reducida a <strong>~${visibility} m</strong>.` : ''} Hacia el interior suele predominar cielo más abierto.`
      };
    }
  }

  // 2. EVALUACIÓN NIEBLA DE VALLE / INVERSIÓN TÉRMICA (INTERIOR Y CUENCAS)
  if (!isCoast) {
    const isFogCode = weatherCode === 45 || weatherCode === 48;
    const isRealFogVis = visibility != null ? (visibility <= 1000) : isFogCode;
    const isValleyInversion = rh >= 93 && dewSpread <= 1.2 && speed <= 12 && isRealFogVis;

    if (isValleyInversion || (isFogCode && isRealFogVis && rh >= 90)) {
      const isSevere = visibility != null ? (visibility <= 200) : (rh >= 98 && isFogCode);
      return {
        isActive: true,
        type: 'valle',
        level: isSevere ? 'severe' : 'warning',
        humidity: rh,
        temp,
        dewPoint: Math.round(dewPoint * 10) / 10,
        windSpeed: speed,
        visibility,
        phenomenonId: 'inversion',
        title: isSevere ? 'Niebla de Valle Zarrada • Inversión Térmica' : 'Niebla de Valle • Inversión Térmica',
        badge: isSevere ? '🚨 Visibilidad <= 200 m (Umbral AEMET)' : '⚠️ Visibilidad Reducida en Valle',
        description: `Bolsa de aire frío y húmedo atrapada en el fondo del valle por inversión térmica (humedad del <strong>${rh}%</strong>).${visibility ? ` Visibilidad reducida a <strong>~${visibility} m</strong> en carreteras de cuenca.` : ''} Ambiente despejado, templado y soleado en cotas altas y cumbres montañosas.`
      };
    }
  }

  return null;
}

function getBorrinaSvg(type = 'marina') {
  if (type === 'marina') {
    return `
      <svg class="borrina-svg-icon" viewBox="0 0 32 32" width="28" height="28" fill="none" aria-label="Borrina Marina Cantábrica">
        <defs>
          <linearGradient id="b-sea-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="50%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#0369a1" />
          </linearGradient>
          <linearGradient id="b-fog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25" />
            <stop offset="30%" stop-color="#e0f2fe" stop-opacity="0.95" />
            <stop offset="70%" stop-color="#ffffff" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.25" />
          </linearGradient>
        </defs>
        <!-- Olas del mar Cantábrico -->
        <path d="M 2,24 C 5,22 8,22 11,24 C 14,26 17,26 20,24 C 23,22 26,22 29,24" stroke="url(#b-sea-grad)" stroke-width="2.6" stroke-linecap="round" />
        <path d="M 4,28.5 C 7,27 10,27 13,28.5 C 16,30 19,30 22,28.5 C 25,27 28,27 30,28.5" stroke="#0284c7" stroke-width="2" stroke-linecap="round" opacity="0.8" />
        <!-- Capas de niebla marina arrastrada sobre el agua -->
        <path d="M 3,6 C 8,5 14,7 20,5.5 C 25,4.5 28,6 30,5.5" stroke="url(#b-fog-grad)" stroke-width="2.8" stroke-linecap="round" />
        <path d="M 1,11.5 C 7,10 13,13 19,11.5 C 24,10 27,12 31,11" stroke="url(#b-fog-grad)" stroke-width="3.2" stroke-linecap="round" />
        <path d="M 4,17.5 C 9,16 16,18.5 22,17 C 26,16 28,17.5 30,17" stroke="url(#b-fog-grad)" stroke-width="2.8" stroke-linecap="round" />
        <!-- Micro-motas de condensación marina en suspensión -->
        <circle cx="27" cy="9" r="1.1" fill="#7dd3fc" opacity="0.9" />
        <circle cx="7" cy="14" r="1.1" fill="#bae6fd" opacity="0.9" />
      </svg>
    `;
  }
  // Niebla de valle / inversión térmica
  return `
    <svg class="borrina-svg-icon" viewBox="0 0 32 32" width="28" height="28" fill="none" aria-label="Niebla de Valle">
      <defs>
        <linearGradient id="b-valley-fog" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.25" />
          <stop offset="35%" stop-color="#f1f5f9" stop-opacity="0.95" />
          <stop offset="65%" stop-color="#f8fafc" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.25" />
        </linearGradient>
      </defs>
      <!-- Siluetas de montaña en cuenca -->
      <path d="M 1,22 L 8,9 L 14,20 L 21,6 L 31,23" stroke="#475569" stroke-width="2" stroke-linejoin="round" fill="none" opacity="0.65" />
      <!-- Manto denso de niebla atrapada en el fondo del valle -->
      <path d="M 4,16 C 9,15 15,17 21,15.5 C 25,14.5 28,16 30,15.5" stroke="url(#b-valley-fog)" stroke-width="2.8" stroke-linecap="round" />
      <path d="M 2,21.5 C 8,20 14,23 20,21.5 C 25,20.5 28,22 30,21.5" stroke="url(#b-valley-fog)" stroke-width="3.4" stroke-linecap="round" />
      <path d="M 5,27 C 10,25.5 17,28 23,26.5 C 27,25.5 29,27 31,26.5" stroke="url(#b-valley-fog)" stroke-width="3" stroke-linecap="round" />
    </svg>
  `;
}

export function renderBorrinaBanner(borrina) {
  if (!borrina || !borrina.isActive) return '';

  return `
    <div class="borrina-banner ${borrina.level} ${borrina.type} alert-collapsible-card collapsed" role="region" aria-label="${borrina.title}">
      <div class="borrina-banner-header" onclick="if (!event.target.closest('button, a')) this.closest('.alert-collapsible-card').classList.toggle('collapsed')" title="Toca para ver el desglose o plegar la alerta">
        <div class="borrina-header-left">
          <div class="borrina-title-group">
            <span class="borrina-icon">${getBorrinaSvg(borrina.type)}</span>
            <span class="borrina-title">${borrina.title}</span>
          </div>
          <span class="borrina-badge">${borrina.badge}</span>
        </div>
        <div class="alert-header-actions" style="display: flex; align-items: center; gap: 8px;">
          <button class="btn-explain-sensor-compact btn-open-phenomena" data-phenomenon="${borrina.phenomenonId}" title="Aprende por qué se forma este fenómeno en Asturias">💡 ¿Por qué ocurre?</button>
          <span class="alert-chevron" title="Toca para desglosar o plegar">▼</span>
        </div>
      </div>
      <div class="borrina-banner-body alert-collapsible-body">
        <p class="borrina-desc">${borrina.description}</p>
        <div class="borrina-metrics">
          <span class="borrina-metric-pill">💧 Humedad: <strong>${borrina.humidity}%</strong></span>
          <span class="borrina-metric-pill">🌡️ Temp / Rocío: <strong>${borrina.temp}°C / ${borrina.dewPoint}°C</strong></span>
          <span class="borrina-metric-pill">💨 Viento: <strong>${borrina.windSpeed} km/h</strong></span>
          ${borrina.visibility ? `<span class="borrina-metric-pill">👁️ Visibilidad: <strong>~${borrina.visibility} m</strong></span>` : ''}
          ${borrina.isSimulation ? `<span class="borrina-metric-pill simulation-pill">🧪 Simulacro Ley 12</span>` : ''}
        </div>
      </div>
    </div>
  `;
}
