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

  // Ámbitos geográficos
  const isCoast = concejo.type === 'coast' || 
                  (concejo.region && concejo.region.toLowerCase().includes('costa')) ||
                  concejo.id === 'castrillon' || concejo.id === 'gijon' || concejo.id === 'gozon' ||
                  concejo.id === 'llanes' || concejo.id === 'ribadesella' || concejo.id === 'carreno' ||
                  concejo.id === 'aviles' || concejo.id === 'valdes' || concejo.id === 'tapia' ||
                  concejo.id === 'cudillero' || concejo.id === 'villaviciosa' || concejo.id === 'colunga' ||
                  concejo.id === 'soto_barco' || concejo.id === 'navia' || concejo.id === 'franco' ||
                  concejo.id === 'coana' || concejo.id === 'ribadedeva';

  // Visibilidad estimada (si viene en hourly o en current)
  let visibility = null;
  if (hourly && Array.isArray(hourly.visibility)) {
    const nowHour = new Date().getHours();
    if (hourly.visibility[nowHour] != null) {
      visibility = Math.round(hourly.visibility[nowHour]);
    }
  }

  // 1. EVALUACIÓN BORRINA MARINA (COSTA)
  if (isCoast) {
    const isFogCode = weatherCode === 45 || weatherCode === 48;
    const isLowVis = visibility != null && visibility <= 2000;
    const isMarineDewMatch = rh >= 92 && dewSpread <= 1.2;
    const isMarineBreeze = speed <= 22; // la borrina entra con viento flojo o brisa marina

    if ((isFogCode || isLowVis || (isMarineDewMatch && isMarineBreeze)) && rh >= 90 && dewSpread <= 1.5) {
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

export function renderBorrinaBanner(borrina) {
  if (!borrina || !borrina.isActive) return '';

  return `
    <div class="borrina-banner ${borrina.level} ${borrina.type}">
      <div class="borrina-banner-header">
        <div class="borrina-header-left">
          <span class="borrina-icon">🌫️</span>
          <span class="borrina-title">${borrina.title}</span>
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
