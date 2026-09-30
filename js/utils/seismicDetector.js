/**
 * Monitor Silencioso de Actividad Sísmica en Asturias y Mar Cantábrico
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Fuente Oficial Open Data: EMSC / CSEM (Centro Sismológico Euromediterráneo)
 * FDSN Web Services (Open Data conforme al Artículo 15 de la Constitución zeustata).
 * Cumple estrictamente con la Doctrina Constitucional 12 (Simulacro y Modo Silencioso).
 */

export const ALLOW_SIMULATION = false; // Desconectado formalmente tras visto bueno de Lendo (Ley 12)

const CACHE_KEY_DATA = 'meteoastur_seismic_data';
const CACHE_KEY_TS = 'meteoastur_seismic_ts';
const CACHE_TTL_MS = 25 * 60 * 1000; // 25 minutos de caché para evitar consultas excesivas

// Centro geográfico de Asturias y radio de cobertura cantábrica
const ASTURIAS_LAT = 43.35;
const ASTURIAS_LON = -5.85;
const MAX_RADIUS_DEG = 2.5; // ~270 km: cubre Asturias, Cordillera Cantábrica, León, Lugo y plataforma marina
const MIN_MAGNITUDE = 1.8; // Umbral de registro significativo regional
const MAX_AGE_HOURS = 48; // Ventana temporal de vigilancia

/**
 * Fórmula de Haversine para cálculo de distancia en kilómetros entre dos coordenadas
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return 0;
  const R = 6371; // Radio medio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Formatea el tiempo transcurrido en lenguaje natural limpio (Cero LaTeX / Ley 5)
 */
function formatTimeAgo(dateString) {
  const eventTime = new Date(dateString).getTime();
  const now = Date.now();
  const diffMinutes = Math.max(1, Math.round((now - eventTime) / 60000));

  if (diffMinutes < 60) {
    return `hace ${diffMinutes} min`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  const remMinutes = diffMinutes % 60;
  if (diffHours < 24) {
    return remMinutes > 0 ? `hace ${diffHours} h ${remMinutes} min` : `hace ${diffHours} h`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
}

/**
 * Obtiene el estado sísmico actual para el concejo indicado.
 * Devuelve el objeto del sismo activo o null si no hay eventos recientes.
 */
export function getSeismicStatus(concejo) {
  if (!concejo) return null;

  // 1. Detección de simulacro controlado (Doctrina Constitucional 12)
  if (ALLOW_SIMULATION && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');

    if (testMode === 'sismo' || testMode === 'terremoto' || testMode === 'seismic') {
      const simLat = 43.05;
      const simLon = -6.72; // Suroccidente asturiano (Degaña / Ibias)
      const dist = calculateDistanceKm(concejo.lat, concejo.lon, simLat, simLon);

      return {
        isActive: true,
        isSimulation: true,
        level: 'warning',
        magnitude: 3.1,
        magType: 'mb',
        depth: 10,
        timeLabel: 'hace 2 h 15 min',
        place: 'Degaña / Ibias (Suroccidente Asturiano)',
        region: 'Asturias / Cordillera Cantábrica',
        distanceKm: dist,
        network: 'IGN / EMSC',
        sourceUrl: 'https://www.emsc-csem.org/',
        title: '🌍 Registro Sísmico en Asturias • [SIMULACRO]',
        badge: '⚠️ Sismo Menor M 3.1',
        description: `Detectado movimiento sísmico de <strong>magnitud M 3.1</strong> localizado en la zona de <strong>Degaña / Ibias</strong> a 10 km de profundidad (a <strong>~${dist} km</strong> de ${concejo.name}). Sin daños reportados.`
      };
    }

    if (testMode === 'sismo_mar' || testMode === 'sismo_cantabrico') {
      const simLat = 43.85;
      const simLon = -5.75; // Plataforma marina Cantábrica frente a Cabo Peñas
      const dist = calculateDistanceKm(concejo.lat, concejo.lon, simLat, simLon);

      return {
        isActive: true,
        isSimulation: true,
        level: 'severe',
        magnitude: 3.8,
        magType: 'ml',
        depth: 14,
        timeLabel: 'hace 45 min',
        place: 'Plataforma Marina del Mar Cantábrico (frente a Peñas)',
        region: 'Golfo de Vizcaya / Costa Asturiana',
        distanceKm: dist,
        network: 'IGN / EMSC',
        sourceUrl: 'https://www.emsc-csem.org/',
        title: '🌍 Sismo Submarino Cantábrico • [SIMULACRO]',
        badge: '🚨 Sismo Notable M 3.8',
        description: `Registrado sismo submarino de <strong>magnitud M 3.8</strong> en la plataforma marina cantábrica a <strong>~${dist} km</strong> de ${concejo.name}. Posiblemente percibido en localidades costeras.`
      };
    }
  }

  // 2. Consulta en la caché local para no saturar peticiones
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const cachedTs = parseInt(localStorage.getItem(CACHE_KEY_TS) || '0', 10);
      const isFresh = Date.now() - cachedTs < CACHE_TTL_MS;
      const rawData = localStorage.getItem(CACHE_KEY_DATA);

      if (isFresh && rawData) {
        const parsed = JSON.parse(rawData);
        if (!parsed || !parsed.hasEvent) {
          return null; // Silencioso: no hay actividad reciente
        }

        // Recalcular distancia respecto al concejo activo actualmente
        const dist = calculateDistanceKm(concejo.lat, concejo.lon, parsed.lat, parsed.lon);
        return {
          ...parsed,
          distanceKm: dist,
          timeLabel: formatTimeAgo(parsed.rawTime),
          description: buildSeismicDescription(parsed, concejo, dist)
        };
      }
    } catch (e) {
      console.warn('[SeismicDetector] Error leyendo caché local:', e);
    }
  }

  // 3. Si la caché expiró o no existe, lanzar refresco en segundo plano sin bloquear la UI
  triggerSeismicRefresh(concejo);
  return null;
}

/**
 * Construye la descripción adaptada al sismo y a la distancia del concejo
 */
function buildSeismicDescription(event, concejo, distKm) {
  const isCoast = concejo.type === 'coast' || (concejo.region && concejo.region.includes('Costa'));
  const locationText = distKm < 25 ? `en el entorno inmediato de <strong>${concejo.name}</strong>` : `a <strong>~${distKm} km</strong> de ${concejo.name}`;

  if (event.magnitude >= 3.5) {
    return `Sismo notable de <strong>magnitud M ${event.magnitude.toFixed(1)}</strong> registrado ${locationText} (${event.place}). Evento superficial (${event.depth} km de profundidad) con probabilidad de haber sido percibido.`;
  }
  if (event.magnitude >= 2.5) {
    return `Sismo menor de <strong>magnitud M ${event.magnitude.toFixed(1)}</strong> detectado ${locationText} (${event.place}), profundidad de ${event.depth} km. Habitualmente sin repercusión en superficie.`;
  }
  return `Micro-sismo instrumental de <strong>magnitud M ${event.magnitude.toFixed(1)}</strong> detectado por la red sísmica ${locationText} (${event.place}). Solo detectable por sismógrafos.`;
}

/**
 * Consulta asíncrona a la API FDSN oficial de EMSC
 */
let isRefreshing = false;

export async function triggerSeismicRefresh(concejo) {
  if (isRefreshing || typeof window === 'undefined') return;
  isRefreshing = true;

  try {
    const url = `https://www.seismicportal.eu/fdsnws/event/1/query?format=json&lat=${ASTURIAS_LAT}&lon=${ASTURIAS_LON}&maxradius=${MAX_RADIUS_DEG}&minmag=${MIN_MAGNITUDE}&limit=4`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) {
      isRefreshing = false;
      return;
    }

    const geojson = await res.json();
    const features = geojson?.features || [];

    const now = Date.now();
    const cutoffTime = now - (MAX_AGE_HOURS * 3600 * 1000);

    // Filtrar sismos dentro de las últimas 48 horas y magnitud válida
    const validEvents = features.filter(f => {
      const p = f.properties;
      if (!p || !p.time || p.mag == null) return false;
      const t = new Date(p.time).getTime();
      return t >= cutoffTime && p.mag >= MIN_MAGNITUDE;
    });

    if (validEvents.length === 0) {
      // Registrar silencio oficial (no hay sismos recientes)
      localStorage.setItem(CACHE_KEY_DATA, JSON.stringify({ hasEvent: false }));
      localStorage.setItem(CACHE_KEY_TS, Date.now().toString());

      // Si había banner en DOM, retirarlo
      const container = document.getElementById('seismic-banner-container');
      if (container) container.innerHTML = '';
      isRefreshing = false;
      return;
    }

    // Tomar el evento más relevante o reciente
    const topFeature = validEvents[0];
    const props = topFeature.properties;
    const mag = parseFloat(props.mag);
    const depth = props.depth != null ? Math.round(parseFloat(props.depth)) : 10;
    const lat = parseFloat(props.lat);
    const lon = parseFloat(props.lon);
    const place = props.flynn_region || 'Noroeste Peninsular / Cantábrico';
    const auth = props.auth || 'IGN / EMSC';
    const rawTime = props.time;
    const sourceUrl = props.source_id
      ? `https://www.emsc-csem.org/Earthquake_information/earthquake.php?id=${props.source_id}`
      : 'https://www.emsc-csem.org/';

    const level = mag >= 3.5 ? 'severe' : (mag >= 2.5 ? 'warning' : 'info');
    const badge = mag >= 3.5 ? `🚨 Sismo Notable M ${mag.toFixed(1)}` : (mag >= 2.5 ? `⚠️ Sismo Menor M ${mag.toFixed(1)}` : `🌍 Micro-sismo M ${mag.toFixed(1)}`);
    const title = mag >= 3.5 ? '🌍 Registro Sísmico Notable en la Zona' : '🌍 Actividad Sísmica Reciente Registrada';

    const eventPayload = {
      hasEvent: true,
      isActive: true,
      level,
      magnitude: mag,
      magType: props.magtype || 'ml',
      depth,
      lat,
      lon,
      place,
      region: props.flynn_region || 'Asturias / Cantábrico',
      network: auth,
      sourceUrl,
      title,
      badge,
      rawTime
    };

    localStorage.setItem(CACHE_KEY_DATA, JSON.stringify(eventPayload));
    localStorage.setItem(CACHE_KEY_TS, Date.now().toString());

    // Actualizar dinámicamente el DOM si el contenedor está presente
    if (concejo) {
      const dist = calculateDistanceKm(concejo.lat, concejo.lon, lat, lon);
      const displayEvent = {
        ...eventPayload,
        distanceKm: dist,
        timeLabel: formatTimeAgo(rawTime),
        description: buildSeismicDescription(eventPayload, concejo, dist)
      };

      const container = document.getElementById('seismic-banner-container');
      if (container) {
        container.innerHTML = renderSeismicBanner(displayEvent);
      }
    }
  } catch (err) {
    // Falla silenciosa sin interrumpir la experiencia de usuario
    console.warn('[SeismicDetector] Comprobación de sismología EMSC omitida:', err?.message || err);
  } finally {
    isRefreshing = false;
  }
}

/**
 * Renderiza el banner HTML con Liquid Glass y acabado armónico (Doctrina 14)
 */
export function renderSeismicBanner(seismic) {
  if (!seismic || !seismic.isActive) return '';

  return `
    <div class="seismic-banner ${seismic.level}" role="alert">
      <div class="seismic-banner-header">
        <div class="seismic-header-left">
          <span class="seismic-icon">🌍</span>
          <span class="seismic-title">${seismic.title}</span>
          <span class="seismic-badge">${seismic.badge}</span>
        </div>
        <div class="seismic-header-actions">
          <a href="${seismic.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn-explain-sensor-compact btn-seismic-shortcut" title="Ver ficha sismológica oficial en el Centro Sismológico Euromediterráneo (EMSC)">
            🏛️ Ficha EMSC
          </a>
        </div>
      </div>
      <div class="seismic-banner-body">
        <p class="seismic-desc">${seismic.description}</p>
        <div class="seismic-metrics">
          <span class="seismic-metric-pill">💥 Magnitud: <strong>M ${seismic.magnitude.toFixed(1)}</strong></span>
          <span class="seismic-metric-pill">📍 Epicentro: <strong>${seismic.place}</strong> (~${seismic.distanceKm} km)</span>
          <span class="seismic-metric-pill">⏱️ Registro: <strong>${seismic.timeLabel}</strong></span>
          <span class="seismic-metric-pill">🕳️ Profundidad: <strong>${seismic.depth} km</strong></span>
          <span class="seismic-metric-pill">📡 Red: <strong>${seismic.network}</strong></span>
          ${seismic.isSimulation ? `<span class="seismic-metric-pill simulation-pill">🧪 Simulacro Ley 12</span>` : ''}
        </div>
      </div>
    </div>
  `;
}
