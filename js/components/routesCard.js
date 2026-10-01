/**
 * METEOASTUR LODE - Componente de Tarjeta de Rutas & Senderismo
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Estética Liquid Glass Pura, Ergonomía Móvil (Ley 11) y Blindaje Legal (Ley 16).
 */

import { calculateHikingIndex, getRoutesForConcejo } from '../utils/routesData.js?v=1.1.51';

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
          <h3 class="section-heading">🥾 Rutas &amp; Senderismo de ${concejoTitle}</h3>
          <span class="section-subtitle">
            Condiciones de marcha, estado del suelo y senderos de ${concejoTitle} (${concejo.region})
          </span>
        </div>
        <div class="sea-state-pill" style="background: ${hike.status === 'danger' ? '#ef444422' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b22' : '#10b98122'}; color: ${hike.status === 'danger' ? '#ef4444' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b' : '#10b981'}; border: 1px solid ${hike.status === 'danger' ? '#ef444466' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b66' : '#10b98166'};">
          ${hike.icon} ${hike.label}
        </div>
      </div>

      <!-- 2. DIAGNÓSTICO DE MARCHA & ESTADO DEL FIRME (LIQUID GLASS) -->
      <div class="routes-diagnostics-panel">
        <!-- A) Semáforu de Llamuergues (Barra de Tracción) -->
        <div class="traction-header">
          <span class="traction-title">
            🪵 Semáforu de Llamuergues (Tracción &amp; Firme)
          </span>
          <span class="traction-level-badge" style="background: ${hike.mudIndex.color}22; color: ${hike.mudIndex.color}; border: 1px solid ${hike.mudIndex.color}66;">
            Nivel ${hike.mudIndex.score || 1}/4: ${hike.mudIndex.level}
          </span>
        </div>

        <div class="traction-bar-track">
          <div class="traction-bar-fill" style="width: ${hike.mudIndex.pct || 25}%; background: ${hike.mudIndex.color}; box-shadow: 0 0 10px ${hike.mudIndex.color}88;"></div>
        </div>

        <div class="traction-subtext">
          Lluvia acumulada 24-48h: <strong>${hike.mudIndex.rain24h || '0.0'} mm</strong> • ${hike.mudIndex.desc}
        </div>

        <!-- B) Rejilla de Confort en Marcha (3 columnas compactas) -->
        <div class="routes-comfort-row">
          <!-- Cota Alta -->
          <div class="routes-comfort-item">
            <span class="comfort-item-label">🌡️ Cota Alta (+300m)</span>
            <div class="comfort-item-value">${hike.windChillHigh}° <span class="unit">C</span></div>
            <div class="comfort-item-sub">En base: <strong>${hike.tempNow}°C</strong> (Sensación: ${hike.feelsLike}°C)</div>
          </div>

          <!-- Viento en Cresta -->
          <div class="routes-comfort-item">
            <span class="comfort-item-label">💨 Viento en Cresta</span>
            <div class="comfort-item-value">${hike.windSpeed} <span class="unit">km/h</span></div>
            <div class="comfort-item-sub">Rachas máx: <strong>${hike.windGust} km/h</strong> • ${hike.windGust >= 45 ? '💨 Racheado' : '🍃 Brisa suave'}</div>
          </div>

          <!-- Mochila & Equipo -->
          <div class="routes-comfort-item">
            <span class="comfort-item-label">🎒 Mochila &amp; Equipo</span>
            <div class="comfort-item-value" style="font-size: 0.98rem; color: #38bdf8; font-weight: 600;">
              ${hike.status === 'optimal' ? '👟 Calzado de marcha' : '🥾 Bota con taco &amp; Bastón'}
            </div>
            <div class="comfort-item-sub">${hike.tempNow < 12 ? '🧥 Cortavientos + Capa térmica' : '👕 Camiseta técnica'} • UV: <strong>${hike.uv}</strong></div>
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
            🟢 Fáciles &amp; Familiares (${counts.facil})
          </button>
        ` : ''}
        ${counts.media > 0 ? `
          <button class="route-filter-btn" onclick="window.filterRoutes('media', this)">
            🟡 Moderadas (${counts.media})
          </button>
        ` : ''}
        ${counts.alta > 0 ? `
          <button class="route-filter-btn" onclick="window.filterRoutes('alta', this)">
            🔴 Exigentes (${counts.alta})
          </button>
        ` : ''}
      </div>

      <!-- 4. CATÁLOGO DE RUTAS EN FICHAS COMPACTAS (CHIPS DE UN VISTAZO) -->
      <div class="routes-grid-container">
        ${routes.map(r => {
          const { cat, cls } = getDiffCategory(r.diff);
          return `
            <div class="route-card-item" data-diff-cat="${cat}">
              <div class="route-card-header">
                <h4 class="route-name-title">${r.name}</h4>
                <span class="route-diff-badge ${cls}">${r.diff}</span>
              </div>

              <!-- Fila de Chips Técnicos -->
              <div class="route-chips-row">
                <span class="route-chip">📏 <strong>${r.dist}</strong></span>
                <span class="route-chip">⏱️ <strong>${r.time}</strong></span>
                <span class="route-chip">⛰️ <strong>${r.elev}</strong></span>
                <span class="route-chip">🪵 <strong>${r.surface}</strong></span>
              </div>

              <p class="route-card-desc">${r.desc}</p>

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
        <strong style="color: #e2e8f0; display: block; margin-bottom: 4px;">⚠️ Aviso de Seguridad en Senderismo &amp; Rutas:</strong>
        Las condiciones de confort meteorológico y estado del firme son estimaciones teóricas basadas en modelos numéricos de lluvia acumulada y viento. <strong>No sustituyen la preparación individual, la cartografía oficial ni los avisos del 112 Asturias</strong>. En la montaña asturiana, la niebla y las tormentas pueden desatarse con rapidez: lleva siempre calzado adecuado, agua, ropa de abrigo y teléfono con batería cargada.
      </div>
    </div>
  `;
}
