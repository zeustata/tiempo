/**
 * Módulo de Astronomía y Eventos Celestiales con Semáforo de Visibilidad en Asturias
 * Desarrollado por Manuel A. L. Barril y Princesa
 */

// Catálogo de eventos astronómicos destacados (2026 - 2027)
export const ASTRONOMICAL_EVENTS = [
  {
    id: 'perseidas-2026',
    title: 'Lluvia de Estrellas Perseidas (Lágrimas de San Lorenzo)',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2026-08-11T22:00:00',
    datePeak: '2026-08-12T23:30:00',
    dateEnd: '2026-08-13T05:30:00',
    displayDate: '11 - 13 de Agosto de 2026',
    visibility: 'asturias', // 'asturias' | 'spain' | 'global'
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Visibilidad óptima en toda Asturias en cielos despejados. Pico de hasta 100 meteoros/hora.',
    asturiasTip: 'Recomendado subir a zonas de montaña como Somiedo, Puerto Ventana, Pajares o Picos de Europa para evitar la niebla y la contaminación lumínica.',
    equipment: '👁️ A simple vista (no requiere telescopio)',
    icon: '✨'
  },
  {
    id: 'eclipse-total-2026',
    title: 'Gran Eclipse Solar Total del 12 de Agosto de 2026',
    type: 'eclipse',
    typeLabel: '🌑 Eclipse Solar Total',
    dateStart: '2026-08-12T19:30:00',
    datePeak: '2026-08-12T20:27:00',
    dateEnd: '2026-08-12T20:30:00',
    displayDate: '12 de Agosto de 2026 (19:30 - 20:30 h)',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias (Zona de Totalidad)',
    visibilityDesc: '¡Acontecimiento histórico único en un siglo! La franja de totalidad del eclipse solar cruza directamente sobre Asturias.',
    asturiasTip: 'El sol se ocultará al 100% oscureciendo el cielo en pleno día durante casi 2 minutos. Mirar hacia el oeste/noroeste en zonas con horizonte despejado.',
    equipment: '🕶️ Gafas especiales homologadas con filtro solar ISO 12312-2',
    icon: '☀️'
  },
  {
    id: 'superluna-sept-2026',
    title: 'Superluna de la Cosecha',
    type: 'supermoon',
    typeLabel: '🌕 Superluna',
    dateStart: '2026-09-25T18:00:00',
    datePeak: '2026-09-26T02:45:00',
    dateEnd: '2026-09-26T08:00:00',
    displayDate: '25 - 26 de Septiembre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'La Luna estará en su perigeo (punto más cercano a la Tierra), viéndose hasta un 14% más grande y un 30% más brillante.',
    asturiasTip: 'Impresionante vista sobre la línea de costa del Cantábrico y reflectando en las playas asturianas al anochecer.',
    equipment: '👁️ A simple vista / 🔭 Prismáticos',
    icon: '🌕'
  },
  {
    id: 'orionidas-2026',
    title: 'Lluvia de Meteoros Oriónidas',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2026-10-20T23:00:00',
    datePeak: '2026-10-21T03:00:00',
    dateEnd: '2026-10-22T06:00:00',
    displayDate: '20 - 22 de Octubre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Restos procedentes del célebre Cometa Halley. Hasta 25 meteoros por hora a gran velocidad.',
    asturiasTip: 'Mirar en dirección a la constelación de Orión hacia el sureste a partir de la medianoche.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'conruncion-jupiter-saturno-2026',
    title: 'Gran Acercamiento de Júpiter y Venus',
    type: 'conjunction',
    typeLabel: '🪐 Conjunción Planetaria',
    dateStart: '2026-11-15T18:30:00',
    datePeak: '2026-11-16T19:15:00',
    dateEnd: '2026-11-17T20:30:00',
    displayDate: '15 - 17 de Noviembre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Los dos planetas más brillantes del cielo nocturno se apreciarán casi juntos como un doble faro al atardecer.',
    asturiasTip: 'Mirar hacia el suroeste durante la hora posterior a la puesta de sol.',
    equipment: '👁️ A simple vista / 🔭 Telescopio (anillos y lunas galileanas)',
    icon: '🪐'
  },
  {
    id: 'geminidas-2026',
    title: 'Lluvia de Meteoros Gemínidas',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2026-12-13T21:00:00',
    datePeak: '2026-12-14T02:00:00',
    dateEnd: '2026-12-14T06:30:00',
    displayDate: '13 - 14 de Diciembre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'La lluvia más activa y prolífica de todo el año, con más de 120 meteoros multicolor por hora.',
    asturiasTip: 'Imprescindible abrigo térmico y buscar puertos de montaña por encima del mar de nubes invernal.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },
  {
    id: 'aurora-boreal-espana',
    title: 'Pico Solar y Posibles Auroras Boreales',
    type: 'aurora',
    typeLabel: '🌌 Actividad Geomagnética',
    dateStart: '2026-09-01T00:00:00',
    datePeak: '2026-10-15T00:00:00',
    dateEnd: '2026-11-30T00:00:00',
    displayDate: 'Otoño 2026 (Pico Ciclo Solar 25)',
    visibility: 'spain',
    visibilityLabel: 'Visible en España / Cantábrico (Kp > 7)',
    visibilityDesc: 'El ciclo solar 25 alcanza su máximo. En tormentas geomagnéticas severas (Kp 7-9), las auroras descienden al litoral cantábrico.',
    asturiasTip: 'Mirar hacia el horizonte norte en la costa o cumbres asturianas sin luces de ciudades en noches de alerta geomagnética.',
    equipment: '👁️ A simple vista / 📷 Cámara en exposición nocturna',
    icon: '🌌'
  },
  {
    id: 'eclipse-anular-2027-sur',
    title: 'Eclipse Solar Anular (Anillo de Fuego)',
    type: 'eclipse',
    typeLabel: '⭕ Eclipse Anular',
    dateStart: '2027-02-06T14:00:00',
    datePeak: '2027-02-06T16:00:00',
    dateEnd: '2027-02-06T18:00:00',
    displayDate: '6 de Febrero de 2027',
    visibility: 'global',
    visibilityLabel: 'Hemisferio Sur (No visible en Asturias)',
    visibilityDesc: 'Espectacular eclipse anular donde la luna no cubre por completo al Sol, formando un anillo brillante. Visible en Sudamérica y la Antártida.',
    asturiasTip: 'No visible geográficamente desde Asturias ni la Península Ibérica. Seguimiento recomendado por retransmisión astronómica online.',
    equipment: '📡 Retransmisión web oficial',
    icon: '⭕'
  }
];

/**
 * Calcula la fase lunar actual aproximada
 */
export function getMoonPhaseDetails(date = new Date()) {
  const LUNAR_MONTH = 29.53058867;
  // Luna nueva de referencia conocida: 11 Enero 2024 a las 11:57 UTC
  const refNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57, 0));
  const diffDays = (date.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const moonAge = (diffDays % LUNAR_MONTH + LUNAR_MONTH) % LUNAR_MONTH;
  const phaseNormalized = moonAge / LUNAR_MONTH;

  // Iluminación estimada
  const illumination = Math.round((1 - Math.cos(2 * Math.PI * phaseNormalized)) / 2 * 100);

  let phaseName = 'Luna Nueva';
  let icon = '🌑';
  let desc = 'La Luna se encuentra entre la Tierra y el Sol; disco no iluminado.';

  if (phaseNormalized < 0.03 || phaseNormalized > 0.97) {
    phaseName = 'Luna Nueva';
    icon = '🌑';
    desc = 'Cielos oscuros ideales para observación de cielo profundo y estrellas.';
  } else if (phaseNormalized < 0.22) {
    phaseName = 'Luna Creciente';
    icon = '🌒';
    desc = 'Fina franja visible al anochecer hacia el oeste.';
  } else if (phaseNormalized < 0.28) {
    phaseName = 'Cuarto Creciente';
    icon = '🌓';
    desc = 'Iluminada exactamente la mitad derecha del disco lunar.';
  } else if (phaseNormalized < 0.47) {
    phaseName = 'Gibosa Creciente';
    icon = '🌔';
    desc = 'Gran brillo lunar en la primera mitad de la noche.';
  } else if (phaseNormalized < 0.53) {
    phaseName = 'Luna Llena';
    icon = '🌕';
    desc = 'Disco lunar 100% iluminado visible durante toda la noche.';
  } else if (phaseNormalized < 0.72) {
    phaseName = 'Gibosa Menguante';
    icon = '🌖';
    desc = 'Comienza a decrecer la luz lunar, visible tras la medianoche.';
  } else if (phaseNormalized < 0.78) {
    phaseName = 'Cuarto Menguante';
    icon = '🌗';
    desc = 'Iluminada la mitad izquierda del disco en las horas matutinas.';
  } else {
    phaseName = 'Luna Menguante';
    icon = '🌘';
    desc = 'Último arco visible antes del amanecer.';
  }

  const daysToFullMoon = Math.round((0.5 - phaseNormalized + (phaseNormalized > 0.5 ? 1 : 0)) * LUNAR_MONTH);

  return {
    phaseName,
    icon,
    desc,
    illumination,
    moonAge: moonAge.toFixed(1),
    daysToFullMoon
  };
}

/**
 * Renderiza el módulo completo de Astronomía
 */
export function renderAstronomyView(containerId, currentFilter = 'all') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const moon = getMoonPhaseDetails();
  const now = new Date();

  // Filtrar eventos según la selección
  const filteredEvents = ASTRONOMICAL_EVENTS.filter(evt => {
    if (currentFilter === 'all') return true;
    return evt.visibility === currentFilter;
  });

  const html = `
    <div class="astronomy-view-container">
      
      <!-- HERO CARD LUNAR Y CIELO NOCTURNO -->
      <div class="astronomy-hero-card">
        <div class="astronomy-hero-top">
          <div class="astronomy-hero-title">
            <span class="astronomy-hero-icon">🔭</span>
            <div>
              <h3>Observatorio Astronómico & Cosmos</h3>
              <span class="astronomy-subtitle">Acontecimientos celestes y semáforo de visibilidad en Asturias</span>
            </div>
          </div>
          <div class="astronomy-moon-badge">
            <span class="moon-icon-giant">${moon.icon}</span>
            <div class="moon-badge-meta">
              <strong>${moon.phaseName}</strong>
              <span>${moon.illumination}% Iluminación</span>
            </div>
          </div>
        </div>

        <div class="astronomy-moon-details-grid">
          <div class="moon-metric-pill">
            <span class="metric-label">🌓 Edad Lunar</span>
            <span class="metric-val">${moon.moonAge} días</span>
          </div>
          <div class="moon-metric-pill">
            <span class="metric-label">🌕 Próxima Luna Llena</span>
            <span class="metric-val">${moon.daysToFullMoon === 0 ? '¡Hoy!' : 'En ' + moon.daysToFullMoon + ' días'}</span>
          </div>
          <div class="moon-metric-pill">
            <span class="metric-label">🌌 Estado del Cielo</span>
            <span class="metric-val">${moon.illumination > 70 ? 'Luz Brillante' : 'Cielo Oscuro'}</span>
          </div>
        </div>
      </div>

      <!-- BARRA DE SEMÁFORO Y FILTROS -->
      <div class="astronomy-filter-bar">
        <div class="astronomy-filter-title">
          <span>🚦 Semáforo de Visibilidad:</span>
        </div>
        <div class="astronomy-filter-chips">
          <button class="astro-chip ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">
            🌟 Todos (${ASTRONOMICAL_EVENTS.length})
          </button>
          <button class="astro-chip chip-green ${currentFilter === 'asturias' ? 'active' : ''}" data-filter="asturias">
            🟢 Visible en Asturias (${ASTRONOMICAL_EVENTS.filter(e => e.visibility === 'asturias').length})
          </button>
          <button class="astro-chip chip-yellow ${currentFilter === 'spain' ? 'active' : ''}" data-filter="spain">
            🟡 España / Europa (${ASTRONOMICAL_EVENTS.filter(e => e.visibility === 'spain').length})
          </button>
          <button class="astro-chip chip-red ${currentFilter === 'global' ? 'active' : ''}" data-filter="global">
            🔴 Global / Lejano (${ASTRONOMICAL_EVENTS.filter(e => e.visibility === 'global').length})
          </button>
        </div>
      </div>

      <!-- LISTADO DE EVENTOS ASTRONÓMICOS -->
      <div class="astronomy-events-grid">
        ${filteredEvents.map(evt => {
          const eventDate = new Date(evt.datePeak);
          const diffDays = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
          
          let countdownText = '';
          if (diffDays < 0) {
            countdownText = '✨ Fenómeno culminado';
          } else if (diffDays === 0) {
            countdownText = '🔥 ¡Sucediendo Hoy!';
          } else if (diffDays === 1) {
            countdownText = '⏳ ¡Mañana!';
          } else {
            countdownText = `⏳ En ${diffDays} días`;
          }

          let semaforoClass = 'badge-green';
          let semaforoIcon = '🟢';
          if (evt.visibility === 'spain') {
            semaforoClass = 'badge-yellow';
            semaforoIcon = '🟡';
          } else if (evt.visibility === 'global') {
            semaforoClass = 'badge-red';
            semaforoIcon = '🔴';
          }

          return `
            <div class="astro-event-card ${evt.visibility}">
              <div class="astro-event-header">
                <div class="astro-event-type-row">
                  <span class="astro-type-pill">${evt.typeLabel}</span>
                  <span class="astro-countdown-pill ${diffDays <= 3 && diffDays >= 0 ? 'urgent' : ''}">${countdownText}</span>
                </div>
                <div class="astro-traffic-badge ${semaforoClass}">
                  <span>${semaforoIcon} ${evt.visibilityLabel}</span>
                </div>
              </div>

              <h4 class="astro-event-title">${evt.icon} ${evt.title}</h4>
              <div class="astro-event-date">📅 ${evt.displayDate}</div>

              <p class="astro-event-desc">${evt.visibilityDesc}</p>

              <div class="astro-event-tips-box">
                <div class="astro-tip-item">
                  <strong>📍 Observación en Asturias:</strong> ${evt.asturiasTip}
                </div>
                <div class="astro-tip-item equipment">
                  <strong>🔭 Instrumento recomendado:</strong> ${evt.equipment}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- PIE INFORMATIVO DE ASTRONOMÍA -->
      <div class="astronomy-footer-info">
        <span>✨ Información y efemérides astronómicas calculadas para el cielo de Asturias • MeteoAstur Lode</span>
      </div>

    </div>
  `;

  container.innerHTML = html;

  // Event Listeners para los filtros del semáforo
  container.querySelectorAll('.astro-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const filter = e.currentTarget.dataset.filter;
      renderAstronomyView(containerId, filter);
    });
  });
}
