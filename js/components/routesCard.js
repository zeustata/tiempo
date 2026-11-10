/**
 * METEOASTUR LODE - Componente de Tarjeta de Rutas & Senderismo
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Arquitectura de Senda Protagonista Activa, Selector Ergonómico Bottom Sheet (Adiós Scroll Infinito),
 * Rastreador Inteligente de Escampada (Dónde no llueve en Asturias),
 * Catálogo Oficial Ampliado a 58 Sendas Homologadas (Ley 11, Ley 14 y Ley 16).
 */

import { calculateHikingIndex, getRoutesForConcejo, RUTAS_ASTURIAS_CATALOGO, getRouteExplanation, getRouteWeatherBadge } from '../utils/routesData.js?v=3.0.36';

export function renderRoutesCard(data, concejo, selectedRouteId = null, selectedDay = null, activeFilter = 'all', routesWeatherMap = null) {
  if (!concejo) return '';

  const currentHour = new Date().getHours();
  const activeDay = selectedDay || (currentHour >= 19 ? 'tomorrow' : 'today');
  const dayLabelLower = activeDay === 'tomorrow' ? 'mañana' : 'hoy';
  const dayLabelCap = activeDay === 'tomorrow' ? 'Mañana' : 'Hoy';

  const hike = calculateHikingIndex(data, concejo, activeDay);
  const allRoutes = getRoutesForConcejo(concejo);

  // Enriquecer cada ruta con su previsión meteorológica oficial si está disponible
  allRoutes.forEach(r => {
    if (routesWeatherMap && routesWeatherMap[r.id]) {
      const rw = routesWeatherMap[r.id][activeDay] || routesWeatherMap[r.id]['tomorrow'];
      r.weatherBadge = getRouteWeatherBadge(rw);
    } else {
      r.weatherBadge = null;
    }
  });

  // Título limpio sin paréntesis
  const concejoTitle = concejo.name.replace(/\s*\(.*?\)/, '').trim();

  // Filtrado y ordenación inteligente
  let displayedRoutes = [...allRoutes];

  if (activeFilter === 'dry') {
    // Modo Detector de Escampada: Ordenar de menor a mayor lluvia
    displayedRoutes.sort((a, b) => {
      const scoreA = a.weatherBadge ? a.weatherBadge.score : 0;
      const scoreB = b.weatherBadge ? b.weatherBadge.score : 0;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return a.distFromUserKm - b.distFromUserKm;
    });
  } else if (activeFilter === 'facil') {
    displayedRoutes = displayedRoutes.filter(r => r.diffCat === 'facil');
    displayedRoutes.sort((a, b) => a.distFromUserKm - b.distFromUserKm);
  } else if (activeFilter === 'montana') {
    displayedRoutes = displayedRoutes.filter(r => r.type === 'montana' || r.type === 'desfiladero' || (r.elevM && r.elevM >= 300));
    displayedRoutes.sort((a, b) => a.distFromUserKm - b.distFromUserKm);
  } else if (activeFilter === 'costera') {
    displayedRoutes = displayedRoutes.filter(r => r.type === 'costera' || r.type === 'fluvial');
    displayedRoutes.sort((a, b) => a.distFromUserKm - b.distFromUserKm);
  } else {
    // Por cercanía
    displayedRoutes.sort((a, b) => a.distFromUserKm - b.distFromUserKm);
  }

  // Agrupación en locales y resto
  const localRoutes = displayedRoutes.filter(r => r.isLocal || r.distFromUserKm <= 15);
  const otherRoutes = displayedRoutes.filter(r => !localRoutes.some(lr => lr.id === r.id));

  // Senda recomendada por el sistema
  let recommendedRoute = localRoutes[0] || displayedRoutes[0] || allRoutes[0];
  if (activeFilter === 'dry' && displayedRoutes[0]) {
    recommendedRoute = displayedRoutes[0];
  } else if (hike.mudIndex && hike.mudIndex.score >= 3) {
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

  // Consejero adaptado al filtro de Escampada
  let advisorTitle = `Consejero de Senderismo (${dayLabelCap})`;
  let advisorBadge = 'Recomendada 🌟';
  let advisorText = `Senda óptima para ${dayLabelLower} en ${concejoTitle}: <strong style="color: var(--primary);">${recommendedRoute.name}</strong> (${recommendedRoute.diff}, ${recommendedRoute.dist}). Ideal por estado de firme y cercanía.`;

  if (activeFilter === 'dry') {
    const topDry = displayedRoutes[0];
    const secondDry = displayedRoutes[1];
    advisorTitle = `☀️ Rastreador de Escampada (${dayLabelCap})`;
    advisorBadge = 'Garantía Seca 🛡️';
    if (topDry && topDry.weatherBadge && topDry.weatherBadge.isDry) {
      advisorText = `¡Para no mojarte ${dayLabelLower} en Asturias! La ruta con menor riesgo de lluvia es <strong style="color: #38bdf8;">${topDry.name}</strong> en <strong>${topDry.concejoName}</strong> (${topDry.weatherBadge.label}). ${secondDry && secondDry.weatherBadge ? `Alternativa seca: <strong>${secondDry.name}</strong> (${secondDry.concejoName}, ${secondDry.weatherBadge.label}).` : ''}`;
    } else if (topDry && topDry.weatherBadge) {
      advisorText = `Jornada con nubosidad generalizada. Las opciones con menor impacto de lluvia son <strong style="color: #38bdf8;">${topDry.name}</strong> (${topDry.concejoName}, ${topDry.weatherBadge.label}).`;
    } else {
      advisorText = `Analizando el pronóstico en tiempo real para las 58 rutas de Asturias. Mostrando las sendas optimizadas contra la lluvia.`;
    }
  }

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
        background: var(--bg-surface);
        border: 1px solid var(--border-glass);
        border-radius: var(--radius-lg);
        box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.45);
        backdrop-filter: blur(var(--glass-blur, 24px)) saturate(190%);
        -webkit-backdrop-filter: blur(var(--glass-blur, 24px)) saturate(190%);
        margin-bottom: 12px;
        padding: 16px 14px;
        box-sizing: border-box;
      }
      .routes-advisor-card {
        background: rgba(30, 41, 59, 0.45);
        border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 14px;
        padding: 12px;
        margin-bottom: 12px;
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
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
        background: rgba(15, 23, 42, 0.92);
        backdrop-filter: blur(24px) saturate(190%);
        -webkit-backdrop-filter: blur(24px) saturate(190%);
        border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 20px 20px 0 0;
        width: 100%;
        max-width: 600px;
        max-height: 82vh;
        display: flex;
        flex-direction: column;
        box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.35), 0 -10px 36px rgba(0,0,0,0.65);
        animation: slideUpRoutes 0.25s ease-out;
      }
      @keyframes slideUpRoutes {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      .routes-day-pill {
        padding: 5px 12px;
        border-radius: 16px;
        font-size: 0.76rem;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-dim, #94a3b8);
      }
      .routes-day-pill.active {
        background: linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.45) 100%);
        border-color: var(--primary, #38bdf8);
        color: #ffffff;
        box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
      }
      .routes-filter-pill {
        padding: 5px 11px;
        border-radius: 14px;
        font-size: 0.74rem;
        font-weight: 700;
        cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-dim, #94a3b8);
        white-space: nowrap;
        transition: all 0.2s ease;
      }
      .routes-filter-pill.active {
        background: linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.5) 100%);
        border-color: var(--primary, #38bdf8);
        color: #ffffff;
        box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
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
        transition: background 0.15s ease, border-color 0.15s ease;
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
                58 Sendas oficiales • Salidas desde <strong>${concejoTitle}</strong>
              </span>
            </div>
          </div>
          <div class="sea-state-pill" style="background: ${hike.status === 'danger' ? '#ef444422' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b22' : '#10b98122'}; color: ${hike.status === 'danger' ? '#ef4444' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b' : '#10b981'}; border: 1px solid ${hike.status === 'danger' ? '#ef444466' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b66' : '#10b98166'};">
            ${hike.icon} ${hike.label}
          </div>
        </div>

        <!-- Panel de Diagnóstico Ejecutivo del Firme y Montaña -->
        <div style="background: rgba(15, 23, 42, 0.40); border-radius: 12px; padding: 10px; border: 1px solid rgba(255,255,255,0.08);">
          <!-- Conmutador Temporal Hoy / Mañana -->
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-main);">📅 Jornada de marcha:</span>
            <div style="display: flex; gap: 6px;">
              <button type="button" class="routes-day-pill btn-routes-day ${activeDay === 'today' ? 'active' : ''}" data-day="today">
                ☀️ Hoy
              </button>
              <button type="button" class="routes-day-pill btn-routes-day ${activeDay === 'tomorrow' ? 'active' : ''}" data-day="tomorrow">
                📅 Mañana
              </button>
            </div>
          </div>

          <!-- Barra de Filtros Inteligentes (Detector de Escampada) -->
          <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 8px; scrollbar-width: none; -webkit-overflow-scrolling: touch;">
            <button type="button" class="routes-filter-pill btn-routes-filter ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">
              📍 Cercanas
            </button>
            <button type="button" class="routes-filter-pill btn-routes-filter ${activeFilter === 'dry' ? 'active' : ''}" data-filter="dry" style="${activeFilter === 'dry' ? 'border-color: #38bdf8; background: rgba(56, 189, 248, 0.25);' : ''}">
              ☀️ Dónde no llueve (${dayLabelCap})
            </button>
            <button type="button" class="routes-filter-pill btn-routes-filter ${activeFilter === 'facil' ? 'active' : ''}" data-filter="facil">
              🟢 Fáciles
            </button>
            <button type="button" class="routes-filter-pill btn-routes-filter ${activeFilter === 'montana' ? 'active' : ''}" data-filter="montana">
              🏔️ Montaña
            </button>
            <button type="button" class="routes-filter-pill btn-routes-filter ${activeFilter === 'costera' ? 'active' : ''}" data-filter="costera">
              🏖️ Costeras &amp; Ríos
            </button>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 1.2rem;">${hike.icon}</span>
            <span style="font-size: 0.8rem; color: var(--text-main); font-weight: 700; line-height: 1.35;">
              <strong>En ${concejoTitle} (${dayLabelCap}):</strong> ${hike.summary}
            </span>
          </div>

          <div class="routes-metrics-grid" style="margin-bottom: 0;">
            <!-- Firme y Barro -->
            <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">🪵 Firme / Barro</span>
              <strong style="font-size: 0.82rem; color: ${hike.mudIndex.color};">
                ${hike.mudIndex.score <= 1 ? 'Firme Seco' : (hike.mudIndex.score === 2 ? 'Barro Leve' : (hike.mudIndex.score === 3 ? 'Barro Moderado' : 'Barrizal'))}
              </strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">Nivel ${hike.mudIndex.score}/4</span>
            </div>

            <!-- Clima en Cotas Altas -->
            <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">⛰️ Sensación Cumbre</span>
              <strong style="font-size: 0.88rem; color: var(--text-main);">${hike.windChillHigh}°C</strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">Rachas: ${hike.windGust} km/h</span>
            </div>

            <!-- Calzado Sugerido -->
            <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">👟 Calzado Sugerido</span>
              <strong style="font-size: 0.82rem; color: #38bdf8;">
                ${hike.status === 'optimal' ? 'Trekking ligero' : 'Bota de taco'}
              </strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">Suela antideslizante</span>
            </div>

            <!-- Protección Solar / Ropa -->
            <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">🎒 Ropa &amp; UV</span>
              <strong style="font-size: 0.82rem; color: var(--accent, #facc15);">
                ${hike.tempNow < 12 ? 'Cortavientos' : 'Camiseta téc.'}
              </strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">Índice UV: ${hike.uv}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. CONSEJERO INTELIGENTE: SENDA RECOMENDADA O DETECTOR DE ESCAMPADA -->
      <div class="routes-advisor-card">
        <div style="display: flex; align-items: flex-start; gap: 8px;">
          <span style="font-size: 1.3rem; line-height: 1;">${activeFilter === 'dry' ? '☀️' : '💡'}</span>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; margin-bottom: 4px;">
              <strong style="font-size: 0.88rem; color: var(--text-main);">${advisorTitle}</strong>
              <span style="font-size: 0.72rem; font-weight: 800; padding: 2px 7px; border-radius: 10px; background: #22c55e; color: #000;">
                ${advisorBadge}
              </span>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-dim); line-height: 1.4; word-break: break-word;">
              ${advisorText}
            </p>
          </div>
        </div>
      </div>

      <!-- 3. SELECTOR TÁCTIL ERGONÓMICO DE SENDA (DISPARADOR DEL BOTTOM SHEET) -->
      <div style="margin-bottom: 12px; display: flex; flex-direction: column; gap: 5px;">
        <label class="picker-section-label" style="font-size: 0.76rem; font-weight: 800; color: #facc15; text-transform: uppercase; letter-spacing: 0.04em; display: flex; align-items: center; gap: 5px;">
          <span>🥾</span>
          <span>Sendas y rutas (${displayedRoutes.length} disponibles):</span>
        </label>
        
        <button type="button" id="btn-open-routes-picker" class="routes-route-trigger" aria-label="Cambiar senda de senderismo">
          <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; min-width: 0;">
            <span style="font-size: 0.95rem;">${activeRoute.typeIcon || '🥾'}</span>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.84rem;">
              ${activeRoute.name}
            </span>
          </div>
          <div class="picker-action-badge">
            <span class="picker-action-text">${activeRoute.dist} · Elegir</span>
            <span class="picker-action-arrow">▼</span>
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
              ${activeRoute.weatherBadge ? `
                <span style="font-size: 0.70rem; font-weight: 800; padding: 2px 7px; border-radius: 8px; background: ${activeRoute.weatherBadge.bg}; color: ${activeRoute.weatherBadge.color}; border: 1px solid ${activeRoute.weatherBadge.border}; white-space: nowrap;">
                  ${activeRoute.weatherBadge.label}
                </span>
              ` : ''}
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
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Distancia</span>
            <strong style="font-size: 0.92rem; color: var(--text-main);">${activeRoute.dist}</strong>
          </div>
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Desnivel</span>
            <strong style="font-size: 0.92rem; color: var(--accent, #facc15);">${activeRoute.elev}</strong>
          </div>
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--primary);">${activeRoute.time}</strong>
          </div>
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Calzado Óptimo</span>
            <strong style="font-size: 0.78rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">
              ${calzadoRecomendado.replace(/^[^\s]+\s*/, '')}
            </strong>
          </div>
        </div>

        <!-- Tipo de Terreno y Firme -->
        <div style="background: rgba(15, 23, 42, 0.40); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 8px 10px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
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

      <!-- 6. BOTTOM SHEET / MODAL ERGONÓMICO DE SELECCIÓN DE SENDAS (58 RUTAS) -->
      <div id="hiking-routes-modal" class="routes-modal-backdrop" aria-hidden="true">
        <div class="routes-modal-sheet">
          
          <div style="padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main);">
                ${activeFilter === 'dry' ? '☀️ Rutas Ordenadas por Escampada' : 'Selecciona senda de senderismo'}
              </h3>
              <span style="font-size: 0.75rem; color: var(--text-dim);">
                ${activeFilter === 'dry' ? `Mostrando opciones más secas para ${dayLabelLower} en toda Asturias` : 'Toca una senda para cargar su ficha técnica'}
              </span>
            </div>
            <button type="button" id="btn-close-hiking-modal" style="background: rgba(255,255,255,0.08); border: none; color: var(--text-main); font-size: 1.1rem; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
              ✕
            </button>
          </div>

          <div style="padding: 12px 14px; overflow-y: auto; flex: 1; -webkit-overflow-scrolling: touch;">
            
            ${activeFilter === 'dry' ? `
              <div style="margin-bottom: 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 10px; padding: 8px 10px; font-size: 0.74rem; color: var(--text-main);">
                <strong>☀️ Rastreador de Escampada (${dayLabelCap}):</strong> Rutas ordenadas automáticamente de menor a mayor probabilidad de lluvia y litros previstos.
              </div>
            ` : ''}

            ${localRoutes.length > 0 && activeFilter !== 'dry' ? `
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
                      ${r.weatherBadge ? `
                        <span style="padding: 1px 6px; border-radius: 6px; font-size: 0.68rem; font-weight: 700; background: ${r.weatherBadge.bg}; color: ${r.weatherBadge.color}; border: 1px solid ${r.weatherBadge.border};">
                          ${r.weatherBadge.label}
                        </span>
                      ` : ''}
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

            ${(activeFilter === 'dry' ? displayedRoutes : otherRoutes).length > 0 ? `
              <div>
                <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                  ${activeFilter === 'dry' ? `🏆 Rutas Clasificadas por Escampada (${displayedRoutes.length})` : `🌟 Grandes Rutas de Asturias (${otherRoutes.length})`}
                </span>
                ${(activeFilter === 'dry' ? displayedRoutes : otherRoutes).map(r => `
                  <div class="routes-item-card ${r.id === activeRoute.id ? 'selected' : ''}" data-route-id="${r.id}">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                      <strong style="font-size: 0.84rem; color: var(--text-main);">${r.typeIcon || '🥾'} ${r.name}</strong>
                      <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); white-space: nowrap;">${r.dist}</span>
                    </div>
                    <div style="display: flex; gap: 6px; align-items: center; font-size: 0.72rem; color: var(--text-dim); flex-wrap: wrap;">
                      ${r.weatherBadge ? `
                        <span style="padding: 1px 6px; border-radius: 6px; font-size: 0.68rem; font-weight: 700; background: ${r.weatherBadge.bg}; color: ${r.weatherBadge.color}; border: 1px solid ${r.weatherBadge.border};">
                          ${r.weatherBadge.label}
                        </span>
                      ` : ''}
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