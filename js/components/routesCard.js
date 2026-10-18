/**
 * METEOASTUR LODE - Componente de Tarjeta de Rutas & Senderismo
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Menú Acordeón Desplegable Ergonómico (Doctrina de Playas),
 * Cálculo Geodésico de Proximidad por Coordenadas (Ley 11)
 * y Blindaje Constitucional de Seguridad y Responsabilidad Individual (Ley 16).
 */

import { calculateHikingIndex, getRoutesForConcejo } from '../utils/routesData.js?v=2.2.70';

// Función global de filtrado, alcance y ordenación interactiva de rutas
if (typeof window !== 'undefined') {
  window.currentRoutesState = window.currentRoutesState || {
    scope: 'local', // 'local' o 'all'
    diff: 'all',    // 'all', 'facil', 'media', 'alta'
    sort: 'prox'    // 'prox', 'length_asc', 'length_desc', 'elev_desc', 'elev_asc'
  };

  window.setRoutesScope = function(scope, btn) {
    window.currentRoutesState.scope = scope;
    const card = btn.closest('.routes-card');
    if (!card) return;
    card.querySelectorAll('.route-scope-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.updateRoutesView(card);
  };

  window.setRoutesDiff = function(diff, btn) {
    window.currentRoutesState.diff = diff;
    const card = btn.closest('.routes-card');
    if (!card) return;
    card.querySelectorAll('.route-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.updateRoutesView(card);
  };

  window.setRoutesSort = function(select) {
    window.currentRoutesState.sort = select.value;
    const card = select.closest('.routes-card');
    if (!card) return;
    window.updateRoutesView(card);
  };

  window.updateRoutesView = function(card) {
    if (!card) return;
    const container = card.querySelector('.routes-accordion-container');
    if (!container) return;

    const items = Array.from(container.querySelectorAll('.route-accordion-card'));
    const { scope, diff, sort } = window.currentRoutesState;

    let visibleCount = 0;

    items.forEach(item => {
      const isLocal = item.dataset.isLocal === '1';
      const cat = item.dataset.diffCat;

      // 1. Filtro de alcance
      let matchScope = true;
      if (scope === 'local' && !isLocal) {
        matchScope = false;
      }

      // 2. Filtro de dificultad
      let matchDiff = true;
      if (diff !== 'all' && cat !== diff) {
        matchDiff = false;
      }

      if (matchScope && matchDiff) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
        item.open = false;
      }
    });

    // 3. Ordenación en el DOM
    items.sort((a, b) => {
      const proxA = parseFloat(a.dataset.proxKm) || 0;
      const proxB = parseFloat(b.dataset.proxKm) || 0;
      const lenA = parseFloat(a.dataset.distKm) || 0;
      const lenB = parseFloat(b.dataset.distKm) || 0;
      const elevA = parseFloat(a.dataset.elevM) || 0;
      const elevB = parseFloat(b.dataset.elevM) || 0;

      if (sort === 'prox') {
        return proxA - proxB;
      } else if (sort === 'length_asc') {
        return lenA - lenB;
      } else if (sort === 'length_desc') {
        return lenB - lenA;
      } else if (sort === 'elev_desc') {
        return elevB - elevA;
      } else if (sort === 'elev_asc') {
        return elevA - elevB;
      }
      return proxA - proxB;
    });

    items.forEach(item => container.appendChild(item));

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

  // Rutas locales de este concejo
  const localRoutes = allRoutes.filter(r => r.isLocal);
  const hasLocal = localRoutes.length > 0;

  // Estado inicial de scope: si el concejo tiene rutas locales, arranca en 'local', si no en 'all'
  const initialScope = hasLocal ? 'local' : 'all';
  if (typeof window !== 'undefined' && window.currentRoutesState) {
    window.currentRoutesState.scope = initialScope;
    window.currentRoutesState.diff = 'all';
    window.currentRoutesState.sort = 'prox';
  }

  // Orden inicial por proximidad
  allRoutes.sort((a, b) => a.distFromUserKm - b.distFromUserKm);

  // Conteo para los botones de dificultad según el scope inicial
  const activeSet = hasLocal ? localRoutes : allRoutes;
  const countAll = activeSet.length;
  const countFacil = activeSet.filter(r => r.diffCat === 'facil').length;
  const countMedia = activeSet.filter(r => r.diffCat === 'media').length;
  const countAlta = activeSet.filter(r => r.diffCat === 'alta').length;

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

      <!-- 3. BARRA DE CONTROL ERGONÓMICA (ALCANCE, FILTROS Y ORDENACIÓN) -->
      <div class="routes-controls-wrapper">
        <!-- Fila A: Selector de Alcance (En Concejo vs Explorar Toda Asturias) -->
        <div class="routes-scope-strip">
          ${hasLocal ? `
            <button class="route-scope-btn active" onclick="window.setRoutesScope('local', this)">
              📍 En ${concejoTitle} (${localRoutes.length})
            </button>
            <button class="route-scope-btn" onclick="window.setRoutesScope('all', this)">
              🗺️ Toda Asturias por cercanía (${allRoutes.length})
            </button>
          ` : `
            <button class="route-scope-btn active" onclick="window.setRoutesScope('all', this)">
              🗺️ Sendas más cercanas a ${concejoTitle} (${allRoutes.length})
            </button>
          `}
        </div>

        <!-- Fila B: Filtros por Dificultad y Selector de Ordenación -->
        <div class="routes-filter-sort-row">
          <div class="routes-filter-strip">
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

          <div class="routes-sort-container">
            <span class="routes-sort-label">Ordenar:</span>
            <select class="routes-sort-select" onchange="window.setRoutesSort(this)" aria-label="Ordenar sendas">
              <option value="prox" selected>📍 Por cercanía</option>
              <option value="length_asc">📏 Más cortas</option>
              <option value="length_desc">📏 Más largas</option>
              <option value="elev_desc">⛰️ Mayor desnivel</option>
              <option value="elev_asc">⛰️ Menor desnivel</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 4. MENÚ EN ACORDEÓN DESPLEGABLE (ARQUITECTURA DE PLAYAS) -->
      <div class="routes-accordion-container">
        ${allRoutes.map(r => {
          const isInitialVisible = (initialScope === 'all' || r.isLocal);
          const distLabel = r.distFromUserKm < 1.0 
            ? 'En este concejo' 
            : `A ${r.distFromUserKm} km de ${concejoTitle}`;

          return `
            <details class="route-accordion-card" name="route-accordion" 
              data-is-local="${r.isLocal ? '1' : '0'}"
              data-diff-cat="${r.diffCat}"
              data-dist-km="${r.distKm}"
              data-elev-m="${r.elevM}"
              data-prox-km="${r.distFromUserKm}"
              style="display: ${isInitialVisible ? '' : 'none'};">
              
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
        <p>No hay sendas con este nivel de dificultad en este radio. Prueba a seleccionar <strong>«Toda Asturias»</strong> o <strong>«Todas»</strong>.</p>
      </div>

      <!-- 5. AVISO CONSTITUCIONAL DE SEGURIDAD Y RESPONSABILIDAD INDIVIDUAL (LEY 16) -->
      <div class="routes-disclaimer-card">
        <div class="disclaimer-header">
          <span class="disclaimer-icon">⚠️</span>
          <strong>Responsabilidad y Seguridad en Entornos Naturales (Ley 16 - Constitución)</strong>
        </div>
        <p class="disclaimer-text">
          La práctica del senderismo y montañismo en Asturias se realiza bajo la <strong>exclusiva responsabilidad, juicio y prudencia de cada usuario</strong>. Toda previsión meteorológica, estado del barro y condiciones del firme son estimaciones teóricas orientativas basadas en modelos numéricos. La montaña cantábrica presenta cambios meteorológicos súbitos (niebla cerrada, tormentas eléctricas, vientos severos de cresta y roca caliza resbaladiza). Planifica tu itinerario, consulta siempre partes oficiales de AEMET, utiliza calzado con suela de taco y membrana impermeable, lleva agua, ropa cortavientos de abrigo y teléfono móvil con batería completa. <strong>Ante cualquier emergencia en montaña, avisa de inmediato al 112</strong>.
        </p>
      </div>
    </div>
  `;
}
