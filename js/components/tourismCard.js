/**
 * METEOASTUR LODE - Componente de Tarjeta de Planes & Ocio: ¿Qué facer güei?
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Ecosistema Zeustata • Principado de Asturias.
 * Estética Liquid Glass Pura, Arquitectura en Acordeón, Ergonomía Móvil (Ley 11) y Blindaje Legal (Leyes 15 y 16).
 */

import { getRecommendedPlans } from '../utils/tourismData.js?v=2.2.75';

// Función global para filtrar planes por categoría climática
if (typeof window !== 'undefined' && !window.filterTourismPlans) {
  window.filterTourismPlans = function(category, btn) {
    const container = btn.closest('.tourism-main-card');
    if (!container) return;

    container.querySelectorAll('.tourism-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cards = container.querySelectorAll('.tourism-accordion-card');
    let visibleCount = 0;
    cards.forEach(card => {
      const cardCat = card.dataset.weatherType;
      if (category === 'all' || cardCat === category) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.removeAttribute('open');
      }
    });

    const emptyMsg = container.querySelector('#tourism-empty-msg');
    if (emptyMsg) {
      emptyMsg.style.display = visibleCount === 0 ? 'flex' : 'none';
    }
  };
}

export function renderTourismCard(weatherData, concejo) {
  if (!concejo) return '';

  const { weatherVerdict, weatherCategory, weatherIcon, comarca, plans } = getRecommendedPlans(weatherData, concejo);
  const cleanConcejoName = (concejo.name || '').replace(/\s*\(.*?\)/, '').trim();

  // Generación de tarjetas de planes en acordeón
  const cardsHtml = plans.map(p => {
    const isRecommendedNow = p.weatherType === weatherCategory;

    let badgePill = '';
    if (isRecommendedNow) {
      badgePill = `<span class="tourism-tag-ideal">✨ Ideal hoy</span>`;
    }

    const weatherLabel = p.weatherType === 'rain' ? '🌧️ Días de lluvia' :
                         p.weatherType === 'sun' ? '☀️ Días de sol' :
                         p.weatherType === 'fog' ? '🌫️ Bruma o nubes' : '❄️ Frío / Cuchara';

    const distLabel = p.distFromUserKm < 1 
      ? 'En este concejo' 
      : `A ${p.distFromUserKm} km (~${p.driveTimeMin} min)`;

    return `
      <details class="tourism-accordion-card ${isRecommendedNow ? 'plan-recommended' : ''}" name="tourism-accordion" data-weather-type="${p.weatherType}">
        <summary class="tourism-accordion-header">
          <div class="tourism-accordion-title-wrap">
            <span class="tourism-accordion-icon">${p.icon}</span>
            <div class="tourism-accordion-name-col">
              <span class="tourism-card-name">${p.title}</span>
              <span class="tourism-card-loc">
                📍 <strong>${p.town}</strong> • ${distLabel}
              </span>
            </div>
          </div>

          <div class="tourism-accordion-meta">
            ${badgePill}
            <span class="tourism-tag-chip">${p.tag}</span>
            <span class="tourism-accordion-chevron">▾</span>
          </div>
        </summary>

        <!-- CUERPO DESPLEGABLE CON FICHA Y CHIPS 2X2 (LEY 11) -->
        <div class="tourism-accordion-body">
          <div class="tourism-specs-chips">
            <div class="tourism-spec-chip">
              <span class="t-chip-icon">📍</span>
              <div class="t-chip-info">
                <span class="t-chip-label">Municipio</span>
                <span class="t-chip-val">${p.town}</span>
              </div>
            </div>

            <div class="tourism-spec-chip">
              <span class="t-chip-icon">🚗</span>
              <div class="t-chip-info">
                <span class="t-chip-label">Distancia</span>
                <span class="t-chip-val">${p.distFromUserKm} km (~${p.driveTimeMin} min)</span>
              </div>
            </div>

            <div class="tourism-spec-chip">
              <span class="t-chip-icon">🏷️</span>
              <div class="t-chip-info">
                <span class="t-chip-label">Categoría</span>
                <span class="t-chip-val">${p.tag}</span>
              </div>
            </div>

            <div class="tourism-spec-chip">
              <span class="t-chip-icon">⛅</span>
              <div class="t-chip-info">
                <span class="t-chip-label">Cielo Óptimo</span>
                <span class="t-chip-val">${weatherLabel}</span>
              </div>
            </div>
          </div>

          <!-- Descripción del enclave -->
          <p class="tourism-card-desc">${p.desc}</p>

          <!-- Botón didáctico con el consejo meteorológico -->
          <button type="button" class="plan-tip-box plan-tip-btn btn-explain-tourism" data-explain-tourism="${p.id}" title="Toca para abrir la ficha didáctica de ${p.title}">
            <span class="plan-tip-icon">💡</span>
            <span class="plan-tip-text"><strong>Por qué hoy:</strong> ${p.tip}</span>
            <span class="plan-tip-arrow">➔ Ver ficha</span>
          </button>
        </div>
      </details>
    `;
  }).join('');

  return `
    <div class="tourism-main-card">
      <!-- 1. CABECERA LIMPIA Y ERGONÓMICA -->
      <div class="section-title-wrap" style="margin-bottom: 14px;">
        <div>
          <h3 class="section-heading">🎭 Planes &amp; Ocio en ${cleanConcejoName}</h3>
          <span class="section-subtitle">
            ¿Qué facer güei? • Recomendaciones calibradas según el cielo actual
          </span>
        </div>
        <div class="sea-state-pill" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);">
          📍 ${comarca.name}
        </div>
      </div>

      <!-- 2. VEREDICTO METEOROLÓGICO CLIMÁTICO EN TIEMPO REAL -->
      <div class="tourism-verdict-box">
        <div class="verdict-icon-bubble">${weatherIcon}</div>
        <div class="verdict-info">
          <div class="verdict-tag">Veredicto del Cielo Actual</div>
          <div class="verdict-text">${weatherVerdict}</div>
          <div class="verdict-sub">${comarca.hero}</div>
        </div>
      </div>

      <!-- 3. BARRA DE CONTROL ERGONÓMICA: PLANES POR CERCANÍA Y FILTROS -->
      <div class="routes-section-title-bar" style="margin-top: 6px; margin-bottom: 10px;">
        <h4 class="routes-section-title">🧭 Planes ordenados por cercanía</h4>
        <span class="routes-section-subtitle">Calculado en tiempo real desde tu ubicación en ${cleanConcejoName}</span>
      </div>

      <!-- FILA COMPACTA DE FILTROS EN CUADRÍCULA (LEY 11) -->
      <div class="tourism-filters-grid" role="group" aria-label="Filtrar planes según el clima">
        <button class="tourism-filter-btn active" onclick="window.filterTourismPlans('all', this)">
          ✨ Todos (${plans.length})
        </button>
        <button class="tourism-filter-btn" onclick="window.filterTourismPlans('rain', this)">
          🌧️ A cubierto
        </button>
        <button class="tourism-filter-btn" onclick="window.filterTourismPlans('sun', this)">
          ☀️ Aire Libre
        </button>
        <button class="tourism-filter-btn" onclick="window.filterTourismPlans('fog', this)">
          🌫️ Bosques & Villas
        </button>
        <button class="tourism-filter-btn" onclick="window.filterTourismPlans('snow', this)">
          ❄️ Montaña & Fuego
        </button>
      </div>

      <!-- 4. MENÚ EN ACORDEÓN DESPLEGABLE -->
      <div class="tourism-accordion-container">
        ${cardsHtml}
      </div>

      <!-- Mensaje cuando un filtro no arroja resultados -->
      <div id="tourism-empty-msg" class="routes-empty-message" style="display: none;">
        <span>🔍</span>
        <p>No hay planes en esta categoría para las condiciones actuales. Prueba a seleccionar <strong>«Todos»</strong>.</p>
      </div>

      <!-- 5. AVISO DE DIVULGACIÓN CULTURAL Y SEGURIDAD -->
      <div class="routes-disclaimer-card" style="margin-top: 16px;">
        <div class="disclaimer-header">
          <span class="disclaimer-icon">🏛️</span>
          <strong>Divulgación Cultural y Ocio en Asturias</strong>
        </div>
        <p class="disclaimer-text">
          Recomendaciones orientativas de divulgación cultural, paisajística y gastronómica en el Principado de Asturias calculadas según modelos meteorológicos y datos abiertos oficiales. Consulta siempre los horarios oficiales de apertura, reservas y el estado de carreteras (112 Asturias / DGT). En accesos costeros y cotas altas de montaña, extrema siempre la precaución y respeta las indicaciones de las autoridades.
        </p>
      </div>
    </div>
  `;
}
