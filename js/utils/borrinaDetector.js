/**
 * Detector Silencioso e Inteligente de Borrina Marina y Nieblas de Inversión Térmica en Asturias
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Mismo formato arquitectónico, cabecera y marco que la Galerna Cantábrica, Foehn y Xelu.
 * Cumple estrictamente con la Doctrina Constitucional 12 (Simulacro y Modo Silencioso).
 */

export const ALLOW_SIMULATION = false; // Desconectado formalmente tras visto bueno de Lendo (Ley 12)

export function detectBorrinaEffect(current, hourly, concejo) {
  if (!current || !concejo) return null;

  // 1. Detección de simulacro controlado (Doctrina Constitucional 12)
  if (ALLOW_SIMULATION && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');
    if (testMode === 'borrina' || testMode === 'borrina_marina' || testMode === 'niebla') {
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
    if (testMode === 'inversion' || testMode === 'borrina_valle' || testMode === 'niebla_valle') {
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
  if (isCoast) {
    const isNight = current.is_day === 0 || current.is_day === false;
    const isFogCode = weatherCode === 45 || weatherCode === 48;
    const isLowVis = visibility != null && visibility <= 2000;
    
    // Calibración Fiel del Litoral Cantábrico (Feedback Lendo / Ley 15):
    // De noche, el enfriamiento radiativo costero atrapa la borrina marina baja con humedad >= 88% y margen de rocío <= 1.8°C.
    // De día, se exige mayor saturación (>= 92% y margen <= 1.2°C) para no confundir con resol o brisas húmedas.
    const minRhTrigger = isNight ? 88 : 92;
    const maxSpreadTrigger = isNight ? 1.8 : 1.2;
    const isMarineDewMatch = rh >= minRhTrigger && dewSpread <= maxSpreadTrigger;
    const isMarineBreeze = speed <= 25; // la borrina entra con viento flojo o brisa marina suave

    const minRhSustain = isNight ? 86 : 90;
    const maxSpreadSustain = isNight ? 2.0 : 1.5;

    if ((isFogCode || isLowVis || (isMarineDewMatch && isMarineBreeze)) && rh >= minRhSustain && dewSpread <= maxSpreadSustain) {
      // Calibración estricta del Cantábrico: solo es 'severe' (rojo) si la visibilidad es realmente un muro de niebla (<= 200 m)
      // o si hay niebla cerrada con saturación máxima y código WMO 45/48. Si la visibilidad es mayor (ej. 300-800 m), se califica como warning (amarillo).
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
        badge: isSevere ? '🚨 Visibilidad Muy Reducida' : '⚠️ Visibilidad Reducida',
        description: `Manto denso de niebla marina arrastrado desde el mar Cantábrico hacia el litoral (humedad del <strong>${rh}%</strong>). Desplome de la sensación térmica en playas y paseos costeros.${visibility ? ` Visibilidad horizontal estimada en <strong>~${visibility} m</strong>.` : ''} Hacia el interior suele predominar cielo más abierto.`
      };
    }
  }

  // 2. EVALUACIÓN NIEBLA DE VALLE / INVERSIÓN TÉRMICA (INTERIOR Y CUENCAS)
  if (!isCoast) {
    const currentHour = new Date().getHours();
    const isNightOrMorning = currentHour <= 12 || currentHour >= 20;
    const isFogCode = weatherCode === 45 || weatherCode === 48;
    const isLowVis = visibility != null && visibility <= 2000;
    const isValleyInversion = rh >= 93 && dewSpread <= 1.0 && speed <= 10 && (isNightOrMorning || isFogCode || isLowVis);

    if (isValleyInversion) {
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
        badge: isSevere ? '🚨 Niebla Densa en Fondo de Cuenca' : '⚠️ Visibilidad Reducida en Valle',
        description: `Bolsa de aire frío y húmedo atrapada en el fondo del valle por inversión térmica matinal (humedad del <strong>${rh}%</strong>).${visibility ? ` Visibilidad de <strong>~${visibility} m</strong> en carreteras de cuenca.` : ''} Ambiente despejado, templado y soleado en cotas altas y cumbres montañosas.`
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
    <div class="borrina-banner ${borrina.level} ${borrina.type}">
      <div class="borrina-banner-header">
        <div class="borrina-header-left">
          <div class="borrina-title-group">
            <span class="borrina-icon">${getBorrinaSvg(borrina.type)}</span>
            <span class="borrina-title">${borrina.title}</span>
          </div>
          <span class="borrina-badge">${borrina.badge}</span>
        </div>
        <button class="btn-explain-sensor-compact btn-open-phenomena" data-phenomenon="${borrina.phenomenonId}" title="Aprende por qué se forma este fenómeno en Asturias">💡 ¿Por qué ocurre?</button>
      </div>
      <div class="borrina-banner-body">
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
