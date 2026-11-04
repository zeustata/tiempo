/**
 * METEOASTUR LODE - Componente de Tarjeta de Rutas & Senderismo
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Arquitectura de Senda Protagonista Activa, Selector Ergonómico Bottom Sheet (Adiós Scroll Infinito),
 * Cálculo Geodésico de Proximidad por Coordenadas (Ley 11),
 * Armonía Visual Liquid Glass (Ley 14) y Blindaje de Responsabilidad y Seguridad (Ley 16).
 */

import { calculateHikingIndex, getRoutesForConcejo, RUTAS_ASTURIAS_CATALOGO, getRouteExplanation } from '../utils/routesData.js?v=3.0.24.11';

export function renderRoutesCard(data, concejo, selectedRouteId = null) {
  if (!concejo) return '';

  const hike = calculateHikingIndex(data, concejo);
  const allRoutes = getRoutesForConcejo(concejo);

  // Título limpio sin paréntesis
  const concejoTitle = concejo.name.replace(/\s*\(.*?\)/, '').trim();

  // Ordenar todas las sendas por cercanía geodésica
  allRoutes.sort((a, b) => a.distFromUserKm - b.distFromUserKm);

  // Sendas locales de este concejo o comarca inmediata (< 15 km)
  const localRoutes = allRoutes.filter(r => r.isLocal || r.distFromUserKm <= 15);
  const otherRoutes = allRoutes.filter(r => !localRoutes.some(lr => lr.id === r.id));

  // Senda recomendada por el sistema según el clima actual:
  // Si hay barro o lluvia, prioriza senda fácil/asfaltada/costera; si está óptimo, la más cercana.
  let recommendedRoute = localRoutes[0] || allRoutes[0];
  if (hike.mudIndex && hike.mudIndex.score >= 3) {
    const safeRoute = localRoutes.find(r => r.diffCat === 'facil' || r.type === 'fluvial' || r.type === 'costera');
    if (safeRoute) recommendedRoute = safeRoute;
  }

  // Senda activa a mostrar en la tarjeta protagonista
  let activeRoute = recommendedRoute;
  if (selectedRouteId) {
    const found = allRoutes.find(r => r.id === selectedRouteId);
    if (found) activeRoute = found;
  }

  const activeDistLabel = activeRoute.distFromUserKm < 0.5 
    ? 'En este concejo' 
    : `A ${activeRoute.distFromUserKm} km de ${concejoTitle}`;

  // Consejero de calzado y firme adaptado a la senda activa
  let calzadoRecomendado = '👟 Calzado de trekking ligero';
  if (activeRoute.diffRank >= 2 || (hike.mudIndex && hike.mudIndex.score >= 2)) {
    calzadoRecomendado = '🥾 Bota de montaña con suela de taco';
  }

  return `
    <style>
      .routes-module-wrapper {
        padding: 0 0 10px 0;
        max-width: 900px;
        margin: 0 auto;
        box-sizing: border-box;
        overflow-x: hidden;
      }
      .routes-card-solid {
        background: linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(11, 19, 43, 0.96) 100%);
        border: 1px solid rgba(56, 189, 248, 0.22);
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        margin-bottom: 12px;
        padding: 14px 12px;
        box-sizing: border-box;
      }
      .routes-advisor-card {
        background: linear-gradient(135deg, rgba(8, 14, 28, 0.96) 0%, rgba(15, 23, 42, 0.94) 100%);
        border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 14px;
        padding: 12px;
        margin-bottom: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(56, 189, 248, 0.2);
        box-sizing: border-box;
      }
      .routes-route-trigger {
        width: 100%;
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.85);
        border: 1px solid rgba(56, 189, 248, 0.35);
        color: #ffffff;
        font-size: 0.84rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        cursor: pointer;
        text-align: left;
        box-sizing: border-box;
        transition: border-color 0.2s ease, background 0.2s ease;
      }
      .routes-route-trigger:active {
        background: rgba(56, 189, 248, 0.15);
      }
      .routes-metrics-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-bottom: 12px;
      }
      @media (max-width: 480px) {
        .routes-metrics-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
        }
      }
      /* Modal Bottom Sheet táctil para selección de sendas */
      .routes-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 9999;
        display: none;
        align-items: flex-end;
        justify-content: center;
      }
      .routes-modal-sheet {
        background: #0b132b;
        border: 1px solid rgba(56, 189, 248, 0.3);
        border-radius: 20px 20px 0 0;
        width: 100%;
        max-width: 600px;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 -10px 30px rgba(0,0,0,0.6);
        animation: slideUpRoutes 0.25s ease-out;
      }
      @keyframes slideUpRoutes {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      .routes-item-card {
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.03);
        margin-bottom: 6px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 4px;
        transition: background 0.15s ease;
      }
      .routes-item-card:active, .routes-item-card.selected {
        background: rgba(56, 189, 248, 0.15);
        border-color: rgba(56, 189, 248, 0.5);
      }
    </style>

    <div class="routes-module-wrapper">
      
      <!-- 1. CABECERA LIMPIA Y ERGONÓMICA -->
      <div class="routes-card-solid">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 8px; max-width: 100%;">
            <span style="font-size: 1.5rem;">🥾</span>
            <div>
              <h2 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: var(--text-main); line-height: 1.2;">
                Rutas &amp; Senderismo
              </h2>
              <span style="font-size: 0.78rem; color: var(--text-dim); display: block; margin-top: 2px;">
                Condiciones y sendas • Salidas desde <strong>${concejoTitle}</strong>
              </span>
            </div>
          </div>
          <div class="sea-state-pill" style="background: ${hike.status === 'danger' ? '#ef444422' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b22' : '#10b98122'}; color: ${hike.status === 'danger' ? '#ef4444' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b' : '#10b981'}; border: 1px solid ${hike.status === 'danger' ? '#ef444466' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b66' : '#10b98166'};">
            ${hike.icon} ${hike.label}
          </div>
        </div>

        <!-- Panel de Diagnóstico Ejecutivo del Firme y Montaña -->
        <div style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 10px; border: 1px solid rgba(255,255,255,0.06);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 1.2rem;">${hike.icon}</span>
            <span style="font-size: 0.8rem; color: var(--text-main); font-weight: 700; line-height: 1.35;">
              <strong>En ${concejoTitle}:</strong> ${hike.summary}
            </span>
          </div>

          <div class="routes-metrics-grid" style="margin-bottom: 0;">
            <!-- Firme y Barro -->
            <div style="background: rgba(0,0,0,0.3); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">🪵 Firme / Barro</span>
              <strong style="font-size: 0.82rem; color: ${hike.mudIndex.color};">
                ${hike.mudIndex.score <= 1 ? 'Firme Seco' : (hike.mudIndex.score === 2 ? 'Barro Leve' : (hike.mudIndex.score === 3 ? 'Barro Moderado' : 'Barrizal'))}
              </strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">Nivel ${hike.mudIndex.score}/4</span>
            </div>

            <!-- Clima en Cotas Altas -->
            <div style="background: rgba(0,0,0,0.3); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">⛰️ Sensación Cumbre</span>
              <strong style="font-size: 0.88rem; color: var(--text-main);">${hike.windChillHigh}°C</strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">Rachas: ${hike.windGust} km/h</span>
            </div>

            <!-- Calzado Sugerido -->
            <div style="background: rgba(0,0,0,0.3); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">👟 Calzado Sugerido</span>
              <strong style="font-size: 0.82rem; color: #38bdf8;">
                ${hike.status === 'optimal' ? 'Trekking ligero' : 'Bota de taco'}
              </strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">Suela antideslizante</span>
            </div>

            <!-- Protección Solar / Ropa -->
            <div style="background: rgba(0,0,0,0.3); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">🎒 Ropa &amp; UV</span>
              <strong style="font-size: 0.82rem; color: var(--accent, #facc15);">
                ${hike.tempNow < 12 ? 'Cortavientos' : 'Camiseta téc.'}
              </strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">Índice UV: ${hike.uv}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. CONSEJERO INTELIGENTE: SENDA RECOMENDADA DE HOY -->
      <div class="routes-advisor-card">
        <div style="display: flex; align-items: flex-start; gap: 8px;">
          <span style="font-size: 1.3rem; line-height: 1;">💡</span>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; margin-bottom: 4px;">
              <strong style="font-size: 0.88rem; color: var(--text-main);">Consejero de Senderismo</strong>
              <span style="font-size: 0.72rem; font-weight: 800; padding: 2px 7px; border-radius: 10px; background: #22c55e; color: #000;">
                Recomendada 🌟
              </span>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-dim); line-height: 1.4; word-break: break-word;">
              Senda óptima de hoy en ${concejoTitle}: <strong style="color: var(--primary);">${recommendedRoute.name}</strong> (${recommendedRoute.diff}, ${recommendedRoute.dist}). Ideal por estado de firme y cercanía.
            </p>
          </div>
        </div>
      </div>

      <!-- 3. SELECTOR TÁCTIL ERGONÓMICO DE SENDA (DISPARADOR DEL BOTTOM SHEET) -->
      <div style="margin-bottom: 12px; display: flex; flex-direction: column; gap: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-main);">
            📍 Senda de montaña activa:
          </label>
          <span style="font-size: 0.72rem; color: var(--primary); font-weight: 700;">
            ${allRoutes.length} sendas oficiales
          </span>
        </div>
        
        <button type="button" id="btn-open-routes-picker" class="routes-route-trigger" aria-label="Cambiar senda de senderismo">
          <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; min-width: 0;">
            <span style="font-size: 0.95rem;">${activeRoute.typeIcon || '🥾'}</span>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.84rem;">
              ${activeRoute.name}
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
            <span style="font-size: 0.75rem; color: var(--accent, #facc15); font-weight: 800;">
              ${activeRoute.dist}
            </span>
            <span style="font-size: 0.8rem; color: var(--primary);">▾</span>
          </div>
        </button>
      </div>

      <!-- 4. FICHA DETALLADA DE LA SENDA SELECCIONADA (TARJETA PROTAGONISTA) -->
      <div class="routes-card-solid">
        
        <div style="margin-bottom: 10px;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 6px; flex-wrap: wrap;">
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main); line-height: 1.3; flex: 1; min-width: 180px;">
              ${activeRoute.name}
            </h3>
            <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.7rem; font-weight: 800; padding: 2px 7px; border-radius: 8px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); white-space: nowrap;">
                📍 ${activeRoute.concejoName}
              </span>
              <span class="route-diff-badge diff-${activeRoute.diffCat}" style="font-size: 0.7rem; font-weight: 800; padding: 2px 7px; border-radius: 8px;">
                ${activeRoute.diff}
              </span>
            </div>
          </div>
          <span style="font-size: 0.76rem; color: var(--primary); display: block; margin-top: 3px;">
            ${activeDistLabel} • Inicio: ${activeRoute.startPoint}
          </span>
          <p style="margin: 6px 0 0 0; font-size: 0.78rem; color: var(--text-dim); line-height: 1.35;">
            ${activeRoute.desc}
          </p>
        </div>

        <!-- Pastillas métricas rápidas (2x2 en móvil, 4 en desktop) -->
        <div class="routes-metrics-grid">
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Distancia</span>
            <strong style="font-size: 0.92rem; color: var(--text-main);">${activeRoute.dist}</strong>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Desnivel</span>
            <strong style="font-size: 0.92rem; color: var(--accent, #facc15);">${activeRoute.elev}</strong>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Tiempo Estimado</span>
            <strong style="font-size: 0.92rem; color: var(--primary);">${activeRoute.time}</strong>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Calzado Óptimo</span>
            <strong style="font-size: 0.78rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">
              ${calzadoRecomendado.replace(/^[^\s]+\s*/, '')}
            </strong>
          </div>
        </div>

        <!-- Tipo de Terreno y Firme -->
        <div style="background: rgba(0,0,0,0.25); border-radius: 10px; padding: 8px 10px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.1rem;">🪵</span>
          <div style="font-size: 0.74rem; color: var(--text-dim); line-height: 1.3;">
            <strong style="color: var(--text-main);">Firme &amp; Superficie:</strong> ${activeRoute.surface}
          </div>
        </div>

        <!-- Precauciones de Seguridad Específicas -->
        ${activeRoute.caution ? `
          <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 10px; padding: 8px 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.1rem;">⚠️</span>
            <div style="font-size: 0.74rem; color: var(--text-dim); line-height: 1.3;">
              <strong style="color: var(--warning, #facc15);">Precaución:</strong> ${activeRoute.caution}
            </div>
          </div>
        ` : ''}

        <!-- Botón interactivo para ver Ficha Didáctica y Track GPS -->
        <button type="button" class="btn-explain-route" data-explain-route="${activeRoute.id}" style="width: 100%; padding: 10px; border-radius: 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); color: var(--primary); font-size: 0.8rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <span>🗺️</span>
          <span>Ver Ficha Oficial, Accesos y Track GPS ➔</span>
        </button>

      </div>

      <!-- 5. DESCARGO LEGAL Y CONSEJOS DE SEGURIDAD EN MONTAÑA (LEY 16) -->
      <div style="background: rgba(11, 19, 43, 0.85); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 10px 12px; font-size: 0.72rem; color: var(--text-dim); line-height: 1.4; box-sizing: border-box;">
        <strong>🛡️ Seguridad en Montaña &amp; Exención de Responsabilidad:</strong>
        Estimaciones meteorológicas orientativas. La montaña asturiana sufre cambios súbitos (niebla cerrada, borrina, tormentas y roca caliza húmeda). Lleva siempre calzado de taco, ropa de abrigo/cortavientos, agua y móvil con batería. Emergencias: <strong>112</strong>.
      </div>

      <!-- 6. BOTTOM SHEET / MODAL ERGONÓMICO DE SELECCIÓN DE SENDAS (44 RUTAS) -->
      <div id="hiking-routes-modal" class="routes-modal-backdrop" aria-hidden="true">
        <div class="routes-modal-sheet">
          
          <div style="padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main);">Selecciona senda de senderismo</h3>
              <span style="font-size: 0.75rem; color: var(--text-dim);">Toca una senda para cargar su ficha técnica</span>
            </div>
            <button type="button" id="btn-close-hiking-modal" style="background: rgba(255,255,255,0.08); border: none; color: var(--text-main); font-size: 1.1rem; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
              ✕
            </button>
          </div>

          <div style="padding: 12px 14px; overflow-y: auto; flex: 1; -webkit-overflow-scrolling: touch;">
            
            ${localRoutes.length > 0 ? `
              <div style="margin-bottom: 14px;">
                <span style="font-size: 0.76rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                  📍 Sendas en ${concejoTitle} y Cercanías (${localRoutes.length})
                </span>
                ${localRoutes.map(r => `
                  <div class="routes-item-card ${r.id === activeRoute.id ? 'selected' : ''}" data-route-id="${r.id}">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                      <strong style="font-size: 0.84rem; color: var(--text-main);">${r.typeIcon || '🥾'} ${r.name}</strong>
                      <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); white-space: nowrap;">${r.dist}</span>
                    </div>
                    <div style="display: flex; gap: 6px; align-items: center; font-size: 0.72rem; color: var(--text-dim); flex-wrap: wrap;">
                      <span style="color: var(--primary);">📍 ${r.distFromUserKm < 0.5 ? 'En este concejo' : `A ${r.distFromUserKm} km`}</span>
                      <span>•</span>
                      <span>${r.elev}</span>
                      <span>•</span>
                      <span class="route-diff-badge diff-${r.diffCat}" style="padding: 1px 6px; font-size: 0.68rem;">${r.diff}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${otherRoutes.length > 0 ? `
              <div>
                <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                  🌟 Grandes Clásicas de Asturias (${otherRoutes.length})
                </span>
                ${otherRoutes.map(r => `
                  <div class="routes-item-card ${r.id === activeRoute.id ? 'selected' : ''}" data-route-id="${r.id}">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                      <strong style="font-size: 0.84rem; color: var(--text-main);">${r.typeIcon || '🥾'} ${r.name}</strong>
                      <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); white-space: nowrap;">${r.dist}</span>
                    </div>
                    <div style="display: flex; gap: 6px; align-items: center; font-size: 0.72rem; color: var(--text-dim); flex-wrap: wrap;">
                      <span>📍 ${r.concejoName} (a ${r.distFromUserKm} km)</span>
                      <span>•</span>
                      <span>${r.elev}</span>
                      <span>•</span>
                      <span class="route-diff-badge diff-${r.diffCat}" style="padding: 1px 6px; font-size: 0.68rem;">${r.diff}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

          </div>

        </div>
      </div>

    </div>
  `;
}
