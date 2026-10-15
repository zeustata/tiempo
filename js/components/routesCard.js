/**
 * METEOASTUR LODE - Componente de Tarjeta de Rutas & Senderismo
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Estética Liquid Glass Pura, Ergonomía Móvil (Ley 11) y Blindaje Legal (Ley 16).
 */

import { calculateHikingIndex, getRoutesForConcejo } from '../utils/routesData.js?v=1.1.53';

// Función global de filtrado táctil interactivo
if (typeof window !== 'undefined' && !window.filterRoutes) {
  window.filterRoutes = function(filter, btn) {
    const cardContainer = btn.closest('.routes-card');
    if (!cardContainer) return;
    cardContainer.querySelectorAll('.route-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const items = cardContainer.querySelectorAll('.route-card-item');
    items.forEach(item => {
      const cat = item.dataset.diffCat;
      if (filter === 'all' || cat === filter) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  };
}

export function renderRoutesCard(data, concejo) {
  if (!concejo) return '';

  const hike = calculateHikingIndex(data, concejo);
  const routes = getRoutesForConcejo(concejo);

  // Título limpio sin paréntesis
  const concejoTitle = concejo.name.replace(/\s*\(.*?\)/, '');

  // Helper para categorizar dificultad
  const getDiffCategory = (diff) => {
    const d = (diff || '').toLowerCase();
    if (d.includes('exigente') || d.includes('alta')) return { cat: 'alta', cls: 'diff-alta' };
    if (d.includes('media')) return { cat: 'media', cls: 'diff-media' };
    return { cat: 'facil', cls: 'diff-facil' };
  };

  // Contadores por categoría para los filtros
  const counts = {
    all: routes.length,
    facil: routes.filter(r => getDiffCategory(r.diff).cat === 'facil').length,
    media: routes.filter(r => getDiffCategory(r.diff).cat === 'media').length,
    alta: routes.filter(r => getDiffCategory(r.diff).cat === 'alta').length
  };

  return `
    <div class="routes-card">
      <!-- 1. CABECERA LIMPIA Y ERGONÓMICA -->
      <div class="section-title-wrap" style="margin-bottom: 16px;">
        <div>
          <h3 class="section-heading">🥾 Rutas &amp; Senderismo</h3>
          <span class="section-subtitle">
            Condiciones de marcha y sendas en ${concejoTitle}
          </span>
        </div>
        <div class="sea-state-pill" style="background: ${hike.status === 'danger' ? '#ef444422' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b22' : '#10b98122'}; color: ${hike.status === 'danger' ? '#ef4444' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b' : '#10b981'}; border: 1px solid ${hike.status === 'danger' ? '#ef444466' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b66' : '#10b98166'};">
          ${hike.icon} ${hike.label}
        </div>
      </div>

      <!-- 2. DIAGNÓSTICO EJECUTIVO ORDENADO -->
      <div class="routes-diagnostics-panel">
        <div class="routes-summary-banner ${hike.status}">
          <span style="font-size: 1.25rem; line-height: 1;">${hike.icon}</span>
          <span>${hike.summary}</span>
        </div>

        <div class="routes-metrics-grid">
          <!-- 1. Terreno / Firme -->
          <div class="routes-metric-pill">
            <div class="rm-pill-top">
              <span>🪵</span>
              <span>Firme &amp; Tracción</span>
            </div>
            <div class="rm-pill-val" style="color: ${hike.mudIndex.color};">
              ${hike.mudIndex.level.split('/')[0].trim()}
            </div>
            <div class="rm-pill-sub">${hike.mudIndex.rain24h} mm lluvia • Nivel ${hike.mudIndex.score}/4</div>
          </div>

          <!-- 2. Cota Alta / Clima -->
          <div class="routes-metric-pill">
            <div class="rm-pill-top">
              <span>⛰️</span>
              <span>Cumbres (+300m)</span>
            </div>
            <div class="rm-pill-val">${hike.windChillHigh}°C</div>
            <div class="rm-pill-sub">Viento: ${hike.windSpeed} km/h • Rachas: ${hike.windGust} km/h</div>
          </div>

          <!-- 3. Ropa & Calzado -->
          <div class="routes-metric-pill">
            <div class="rm-pill-top">
              <span>🎒</span>
              <span>Mochila &amp; Equipo</span>
            </div>
            <div class="rm-pill-val" style="color: #38bdf8;">
              ${hike.status === 'optimal' ? '👟 Calzado ligero' : '🥾 Bota con taco'}
            </div>
            <div class="rm-pill-sub">${hike.tempNow < 12 ? '🧥 Cortavientos' : '👕 Camiseta técnica'} • UV: ${hike.uv}</div>
          </div>
        </div>
      </div>

      <!-- 3. BARRA DE FILTROS TÁCTILES RÁPIDOS -->
      <div class="routes-filter-strip">
        <button class="route-filter-btn active" onclick="window.filterRoutes('all', this)">
          Todas (${counts.all})
        </button>
        ${counts.facil > 0 ? `
          <button class="route-filter-btn" onclick="window.filterRoutes('facil', this)">
            🟢 Fáciles (${counts.facil})
          </button>
        ` : ''}
        ${counts.media > 0 ? `
          <button class="route-filter-btn" onclick="window.filterRoutes('media', this)">
            🟡 Medias (${counts.media})
          </button>
        ` : ''}
        ${counts.alta > 0 ? `
          <button class="route-filter-btn" onclick="window.filterRoutes('alta', this)">
            🔴 Exigentes (${counts.alta})
          </button>
        ` : ''}
      </div>

      <!-- 4. CATÁLOGO DE RUTAS EN FICHAS COMPACTAS -->
      <div class="routes-grid-container">
        ${routes.map(r => {
          const { cat, cls } = getDiffCategory(r.diff);
          return `
            <div class="route-card-item" data-diff-cat="${cat}">
              <div class="route-card-header">
                <h4 class="route-name-title">${r.name}</h4>
                <span class="route-diff-badge ${cls}">${r.diff}</span>
              </div>

              <!-- Métricas directas de ruta -->
              <div class="route-chips-row">
                <span class="route-chip">📏 <strong>${r.dist}</strong></span>
                <span class="route-chip">⏱️ <strong>${r.time}</strong></span>
                <span class="route-chip">⛰️ <strong>${r.elev}</strong></span>
              </div>

              <p class="route-card-desc">${r.desc}</p>

              <div style="font-size: 0.76rem; color: #94a3b8; display: flex; align-items: center; gap: 4px;">
                <span>🪵</span> <span>${r.surface}</span>
              </div>

              ${r.caution ? `
                <div class="route-card-caution">
                  ⚠️ <strong>Precaución:</strong> ${r.caution}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>

      <!-- 5. AVISO LEGAL Y EXENCIÓN DE RESPONSABILIDAD (LEY 16) -->
      <div class="routes-disclaimer-card">
        <strong style="color: #e2e8f0; display: block; margin-bottom: 2px;">⚠️ Aviso de Seguridad en Senderismo:</strong>
        Las condiciones y estado del firme son estimaciones teóricas orientativas. En la montaña asturiana el tiempo varía con rapidez. Planifica tu ruta, lleva agua, abrigo y teléfono con batería.
      </div>
    </div>
  `;
}
