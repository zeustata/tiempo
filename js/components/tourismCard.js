/**
 * METEOASTUR LODE - Componente de Tarjeta de Planes & Ocio: ¿Qué facer güei?
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Ecosistema Zeustata • Principado de Asturias.
 * Estética Liquid Glass Pura, Ergonomía Móvil (Ley 11) y Blindaje Legal (Leyes 15 y 16).
 */

import { getRecommendedPlans, COMARCAS_NODRIZA } from '../utils/tourismData.js?v=1.1.83';

// Función global para filtrar planes por categoría interactiva
if (typeof window !== 'undefined' && !window.filterTourismPlans) {
  window.filterTourismPlans = function(category, btn) {
    const container = btn.closest('.tourism-main-card');
    if (!container) return;

    container.querySelectorAll('.tourism-filter-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cards = container.querySelectorAll('.tourism-plan-card');
    cards.forEach(card => {
      const cardCat = card.dataset.weatherType;
      if (category === 'all' || cardCat === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };
}

export function renderTourismCard(weatherData, concejo) {
  if (!concejo) return '';

  const { weatherVerdict, weatherCategory, weatherIcon, comarca, plans } = getRecommendedPlans(weatherData, concejo);
  const cleanConcejoName = concejo.name.replace(/\s*\(.*?\)/, '');

  // Generación de tarjetas de planes
  const cardsHtml = plans.map(p => {
    const isLocalComarca = p.comarca === comarca.key;
    const isRecommendedNow = p.weatherType === weatherCategory;

    let badgePill = '';
    if (isRecommendedNow && isLocalComarca) {
      badgePill = `<span class="plan-tag-highlight">⭐ Recomendado en tu Comarca</span>`;
    } else if (isRecommendedNow) {
      badgePill = `<span class="plan-tag-ideal">✨ Plan Ideal para hoy</span>`;
    } else if (isLocalComarca) {
      badgePill = `<span class="plan-tag-local">📍 Cerca de ${cleanConcejoName}</span>`;
    }

    return `
      <article class="tourism-plan-card ${isRecommendedNow ? 'plan-recommended' : ''}" data-weather-type="${p.weatherType}" data-comarca="${p.comarca}">
        <div class="plan-card-header">
          <div class="plan-header-icon-box">
            <span class="plan-icon">${p.icon}</span>
          </div>
          <div class="plan-header-title-box">
            <div class="plan-badge-row">
              <span class="plan-category-badge">${p.tag}</span>
              ${badgePill}
            </div>
            <h4 class="plan-title">${p.title}</h4>
            <span class="plan-location">📍 ${p.town} • ${p.distInfo}</span>
          </div>
        </div>

        <p class="plan-desc">${p.desc}</p>

        <div class="plan-tip-box">
          <span class="plan-tip-icon">💡</span>
          <span class="plan-tip-text"><strong>Por qué hoy:</strong> ${p.tip}</span>
        </div>
      </article>
    `;
  }).join('');

  return `
    <div class="tourism-main-card">
      <!-- 1. CABECERA LIQUID GLASS -->
      <div class="section-title-wrap" style="margin-bottom: 14px;">
        <div>
          <div class="tourism-top-badges">
            <span class="tourism-module-pill">🗺️ Módulo 10 • Ocio Asturiano</span>
            <span class="tourism-comarca-pill">📍 ${comarca.name}</span>
          </div>
          <h3 class="section-heading" style="margin-top: 6px;">¿Qué facer güei en Asturias?</h3>
          <span class="section-subtitle">
            Planes recomendados según el cielo actual en <strong>${cleanConcejoName}</strong> y concejos cercanos
          </span>
        </div>
      </div>

      <!-- 2. VEREDICTO METEOROLÓGICO CLIMÁTICO EN TIEMPO REAL -->
      <div class="tourism-verdict-box">
        <div class="verdict-icon-bubble">${weatherIcon}</div>
        <div class="verdict-info">
          <div class="verdict-tag">Veredicto del Tiempo Actual</div>
          <div class="verdict-text">${weatherVerdict}</div>
          <div class="verdict-sub">${comarca.hero}</div>
        </div>
      </div>

      <!-- 3. SELECTOR ERGONÓMICO DE FILTROS POR TIEMPO (LEY 11) -->
      <div class="tourism-filters-bar" role="group" aria-label="Filtrar planes según el clima">
        <button class="tourism-filter-chip active" onclick="window.filterTourismPlans('all', this)">
          <span>Todos (${plans.length})</span>
        </button>
        <button class="tourism-filter-chip" onclick="window.filterTourismPlans('rain', this)">
          <span>🌧️ Si Llueve</span>
        </button>
        <button class="tourism-filter-chip" onclick="window.filterTourismPlans('sun', this)">
          <span>☀️ Si hay Sol</span>
        </button>
        <button class="tourism-filter-chip" onclick="window.filterTourismPlans('fog', this)">
          <span>🌫️ Con Niebla / Bosques</span>
        </button>
        <button class="tourism-filter-chip" onclick="window.filterTourismPlans('snow', this)">
          <span>❄️ Montaña & Cuchara</span>
        </button>
      </div>

      <!-- 4. LISTADO DE PLANES -->
      <div class="tourism-plans-grid">
        ${cardsHtml}
      </div>

      <!-- 5. DESCARGO DE RESPONSABILIDAD Y BLINDAJE LEGAL (LEYES 15 Y 16) -->
      <div class="tourism-legal-notice">
        <span class="notice-icon">⚖️</span>
        <span class="notice-text">
          <strong>Aviso institucional y de seguridad:</strong> Recomendaciones orientativas de divulgación cultural y turística basadas en datos abiertos del Principado de Asturias. Consulta siempre horarios oficiales de apertura, estado de carreteras (112 Asturias) y extremar la prudencia en accesos costeros y de montaña.
        </span>
      </div>
    </div>
  `;
}
