/**
 * METEOASTUR LODE - Componente de Tarjeta de Rutas & Senderismo
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Menú Acordeón Desplegable Ergonómico (Doctrina de Playas),
 * Cálculo Geodésico de Proximidad por Coordenadas (Ley 11)
 * y Blindaje Constitucional de Seguridad y Responsabilidad Individual (Ley 16).
 */

import { calculateHikingIndex, getRoutesForConcejo } from '../utils/routesData.js?v=2.2.72';

// Función global de filtrado interactivo por dificultad de rutas
if (typeof window !== 'undefined') {
  window.currentRoutesState = window.currentRoutesState || {
    diff: 'all' // 'all', 'facil', 'media', 'alta'
  };

  window.setRoutesDiff = function(diff, btn) {
    window.currentRoutesState.diff = diff;
    const card = btn.closest('.routes-card');
    if (!card) return;
    card.querySelectorAll('.route-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.updateRoutesView(card);
  };

  window.updateRoutesView = function(card) {
    if (!card) return;
    const container = card.querySelector('.routes-accordion-container');
    if (!container) return;

    const items = Array.from(container.querySelectorAll('.route-accordion-card'));
    const { diff } = window.currentRoutesState;

    let visibleCount = 0;

    items.forEach(item => {
      const cat = item.dataset.diffCat;
      const matchDiff = (diff === 'all' || cat === diff);

      if (matchDiff) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
        item.open = false;
      }
    });

    // Contador visible y mensaje de vacío
    const countBadge = card.querySelector('#routes-visible-counter');
    if (countBadge) {
      countBadge.textContent = `${visibleCount} senda${visibleCount === 1 ? '' : 's'}`;
    }

    const emptyMsg = card.querySelector('#routes-empty-msg');
    if (emptyMsg) {
      emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };
}

export function renderRoutesCard(data, concejo) {
  if (!concejo) return '';

  const hike = calculateHikingIndex(data, concejo);
  const allRoutes = getRoutesForConcejo(concejo);

  // Título limpio sin paréntesis
  const concejoTitle = concejo.name.replace(/\s*\(.*?\)/, '').trim();

  // Reiniciar estado
  if (typeof window !== 'undefined' && window.currentRoutesState) {
    window.currentRoutesState.diff = 'all';
  }

  // Orden natural inmutable por proximidad en km
  allRoutes.sort((a, b) => a.distFromUserKm - b.distFromUserKm);

  return `
    <div class="routes-card">
      <!-- 1. CABECERA LIMPIA Y ERGONÓMICA -->
      <div class="section-title-wrap" style="margin-bottom: 16px;">
        <div>
          <h3 class="section-heading">🥾 Rutas &amp; Senderismo</h3>
          <span class="section-subtitle">
            Catálogo de sendas de montaña y costa • Calibrado en ${concejoTitle}
          </span>
        </div>
        <div class="sea-state-pill" style="background: ${hike.status === 'danger' ? '#ef444422' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b22' : '#10b98122'}; color: ${hike.status === 'danger' ? '#ef4444' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b' : '#10b981'}; border: 1px solid ${hike.status === 'danger' ? '#ef444466' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b66' : '#10b98166'};">
          ${hike.icon} ${hike.label}
        </div>
      </div>

      <!-- 2. DIAGNÓSTICO EJECUTIVO DE CONDICIONES METEOROLÓGICAS -->
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

      <!-- 3. BARRA DE CONTROL ERGONÓMICA: RUTAS POR CERCANÍA Y FILTROS -->
      <div class="routes-section-title-bar">
        <h4 class="routes-section-title">🥾 Rutas por cercanía</h4>
        <span class="routes-section-subtitle">Ordenadas por distancia desde tu ubicación actual (${concejoTitle})</span>
      </div>

      <!-- FILA ÚNICA DE FILTROS EN CUADRÍCULA COMPACTA (LEY 11) -->
      <div class="routes-filter-grid">
        <button class="route-filter-btn active" onclick="window.setRoutesDiff('all', this)">
          Todas
        </button>
        <button class="route-filter-btn diff-btn-facil" onclick="window.setRoutesDiff('facil', this)">
          🟢 Fáciles
        </button>
        <button class="route-filter-btn diff-btn-media" onclick="window.setRoutesDiff('media', this)">
          🟡 Medias
        </button>
        <button class="route-filter-btn diff-btn-alta" onclick="window.setRoutesDiff('alta', this)">
          🔴 Exigentes
        </button>
      </div>

      <!-- 4. MENÚ EN ACORDEÓN DESPLEGABLE (ARQUITECTURA DE PLAYAS) -->
      <div class="routes-accordion-container">
        ${allRoutes.map(r => {
          const distLabel = r.distFromUserKm < 0.5 
            ? 'En este concejo' 
            : `A ${r.distFromUserKm} km de ${concejoTitle}`;

          return `
            <details class="route-accordion-card" name="route-accordion" 
              data-is-local="${r.isLocal ? '1' : '0'}"
              data-diff-cat="${r.diffCat}"
              data-dist-km="${r.distKm}"
              data-elev-m="${r.elevM}"
              data-prox-km="${r.distFromUserKm}">
              
              <summary class="route-accordion-header">
                <div class="route-accordion-title-wrap">
                  <span class="route-accordion-icon">${r.typeIcon}</span>
                  <div class="route-accordion-name-col">
                    <span class="route-card-name">${r.name}</span>
                    <span class="route-card-loc">
                      📍 <strong>${r.concejoName}</strong> • ${distLabel}
                    </span>
                  </div>
                </div>

                <div class="route-accordion-meta">
                  <span class="route-dist-chip">📏 ${r.dist}</span>
                  <span class="route-diff-badge diff-${r.diffCat}">${r.diff}</span>
                  <span class="route-accordion-chevron">▾</span>
                </div>
              </summary>

              <!-- FICHA TÉCNICA DETALLADA AL DESPLEGAR -->
              <div class="route-accordion-body">
                <!-- Chips Métricos Rápidos -->
                <div class="route-specs-chips">
                  <div class="route-spec-chip">
                    <span class="r-chip-icon">📏</span>
                    <div class="r-chip-info">
                      <span class="r-chip-label">Distancia</span>
                      <span class="r-chip-val">${r.dist}</span>
                    </div>
                  </div>

                  <div class="route-spec-chip">
                    <span class="r-chip-icon">⏱️</span>
                    <div class="r-chip-info">
                      <span class="r-chip-label">Tiempo Est.</span>
                      <span class="r-chip-val">${r.time}</span>
                    </div>
                  </div>

                  <div class="route-spec-chip">
                    <span class="r-chip-icon">⛰️</span>
                    <div class="r-chip-info">
                      <span class="r-chip-label">Desnivel</span>
                      <span class="r-chip-val">${r.elev}</span>
                    </div>
                  </div>

                  <div class="route-spec-chip">
                    <span class="r-chip-icon">🚩</span>
                    <div class="r-chip-info">
                      <span class="r-chip-label">Inicio / Acceso</span>
                      <span class="r-chip-val">${r.startPoint}</span>
                    </div>
                  </div>
                </div>

                <!-- Descripción del Itinerario -->
                <p class="route-card-desc">${r.desc}</p>

                <!-- Tipo de Terreno y Firme -->
                <div class="route-surface-block">
                  <span class="surface-icon">🪵</span>
                  <div class="surface-info">
                    <span class="surface-label">Firme &amp; Superficie:</span>
                    <span class="surface-val">${r.surface}</span>
                  </div>
                </div>

                <!-- Precauciones Específicas de Seguridad -->
                ${r.caution ? `
                  <div class="route-card-caution">
                    <span class="caution-icon">⚠️</span>
                    <div class="caution-info">
                      <strong>Precaución en Ruta:</strong>
                      <span>${r.caution}</span>
                    </div>
                  </div>
                ` : ''}
              </div>
            </details>
          `;
        }).join('')}
      </div>

      <!-- Mensaje cuando un filtro no arroja resultados -->
      <div id="routes-empty-msg" class="routes-empty-message" style="display: none;">
        <span>🔍</span>
        <p>No hay sendas con este nivel de dificultad. Prueba a seleccionar <strong>«Todas»</strong>.</p>
      </div>

      <!-- 5. AVISO DE SEGURIDAD Y RESPONSABILIDAD INDIVIDUAL -->
      <div class="routes-disclaimer-card">
        <div class="disclaimer-header">
          <span class="disclaimer-icon">⚠️</span>
          <strong>Responsabilidad y Seguridad en Entornos Naturales</strong>
        </div>
        <p class="disclaimer-text">
          La práctica del senderismo y montañismo en Asturias se realiza bajo la <strong>exclusiva responsabilidad, juicio y prudencia de cada usuario</strong>. Toda previsión meteorológica, estado del barro y condiciones del firme son estimaciones teóricas orientativas basadas en modelos numéricos. La montaña cantábrica presenta cambios meteorológicos súbitos (niebla cerrada, tormentas eléctricas, vientos severos de cresta y roca caliza resbaladiza). Planifica tu itinerario, consulta siempre partes oficiales de AEMET, utiliza calzado con suela de taco y membrana impermeable, lleva agua, ropa cortavientos de abrigo y teléfono móvil con batería completa. <strong>Ante cualquier emergencia en montaña, avisa de inmediato al 112</strong>.
        </p>
      </div>
    </div>
  `;
}
