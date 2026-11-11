/**
 * METEOASTUR LODE - Componente de Tarjeta de Ciclismo & Viento Dinámico
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Cálculo de viento relativo (en contra, a favor, cruzado) según rumbo de marcha,
 * simulador de paso horario por tramos y puertos, auto-carga de ruta óptima según hora/concejo,
 * selector táctil ergonómico sin diálogos gigantes de Android y blindaje de seguridad ciclista.
 */

import { getCyclingRoutesForConcejo, getCyclingRouteById, CYCLING_ROUTES } from '../utils/cyclingData.js?v=3.0.38.22';
import { simulateRouteConditions, rankRoutesForDeparture } from '../utils/cyclingAdvisor.js?v=3.0.38';

/**
 * Renderiza la vista principal del módulo de Ciclismo & Viento
 */
export function renderCyclingCard(weatherData, concejo, selectedRouteId = null, selectedHour = null, selectedSpeed = 24, selectedDay = null) {
  if (!concejo) return '';

  const hourly = weatherData?.weather?.hourly || null;
  const localRoutes = getCyclingRoutesForConcejo(concejo.id);
  const otherRoutes = CYCLING_ROUTES.filter(r => !localRoutes.some(lr => lr.id === r.id));

  // Horas de salida (mañanas y tardes ampliadas a petición de Lendo)
  const allQuickHours = [8, 9, 10, 11, 12, 13, 16, 17, 18, 19];
  const now = new Date();
  const currentHour = now.getHours();

  // Filtrado estricto para "Hoy": solo horas estrictamente futuras (h > currentHour)
  // A las 11:38 h, las 11 ya pasaron -> la primera hora útil es a partir de las 12:00 h
  const todayUpcomingHours = allQuickHours.filter(h => h > currentHour);

  // 1. Determinar día: Si ya no quedan horas diurnas hoy, saltar automáticamente a 'tomorrow'
  let activeDay = selectedDay;
  if (!activeDay) {
    activeDay = (todayUpcomingHours.length === 0 || currentHour >= 19) ? 'tomorrow' : 'today';
  } else if (activeDay === 'today' && todayUpcomingHours.length === 0) {
    activeDay = 'tomorrow';
  }

  // Tira de horas activa según el día:
  const displayHours = (activeDay === 'today') ? todayUpcomingHours : allQuickHours;

  // 2. Determinar hora útil inteligente (sin fantasmas del pasado):
  let activeHour = selectedHour;
  if (activeHour == null || !displayHours.includes(activeHour)) {
    if (activeDay === 'today') {
      activeHour = displayHours.length > 0 ? displayHours[0] : 12;
    } else {
      activeHour = 9; // Salida habitual matinal para mañana
    }
  }

  // Clasificación para el consejero inteligente (evalúa las de la localidad activa para el día y hora resueltos)
  const candidateRoutes = localRoutes.length > 0 ? localRoutes : CYCLING_ROUTES;
  const ranked = rankRoutesForDeparture(candidateRoutes, activeHour, selectedSpeed, hourly, activeDay);
  const bestRoute = ranked[0]?.route || candidateRoutes[0] || CYCLING_ROUTES[0];
  const bestSim = ranked[0]?.simulation || null;

  // REGLA DE ORO DE LENDO:
  // Si no se ha elegido una ruta manual específica, o si la seleccionada no pertenece a este concejo,
  // se auto-carga directamente la ruta ÓPTIMA sugerida por el consejero para esta hora y ritmo.
  let activeRoute = bestRoute;
  if (selectedRouteId) {
    const manualRoute = getCyclingRouteById(selectedRouteId);
    if (manualRoute) activeRoute = manualRoute;
  }

  // Simulación para la ruta activa que se pinta debajo
  const sim = simulateRouteConditions(activeRoute, activeHour, selectedSpeed, hourly, activeDay);

  const speeds = [
    { value: 16, label: '16 km/h', sub: 'Paseo' },
    { value: 20, label: '20 km/h', sub: 'Tranquilo' },
    { value: 24, label: '24 km/h', sub: 'Medio' },
    { value: 28, label: '28 km/h', sub: 'Avanzado' },
    { value: 32, label: '32 km/h', sub: 'Semipro' }
  ];

  return `
    <style>
      .cycling-module-wrapper {
        padding: 0 0 10px 0;
        max-width: 900px;
        margin: 0 auto;
        box-sizing: border-box;
        overflow-x: hidden;
      }
      .cycling-card {
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
      .cycling-advisor-card {
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
      .cycling-disclaimer-card {
        background: rgba(11, 19, 43, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 10px 12px;
        font-size: 0.72rem;
        color: var(--text-dim);
        line-height: 1.4;
        box-sizing: border-box;
      }
      .cycling-metrics-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-bottom: 12px;
      }
      @media (max-width: 480px) {
        .cycling-metrics-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
        }
      }
      .btn-speed-pill {
        flex: 1 0 74px;
        min-width: 74px;
        text-align: center;
        padding: 6px 4px;
        font-size: 0.74rem;
        font-weight: 700;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-sizing: border-box;
      }
      .cycling-day-pill {
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
      .cycling-day-pill.active {
        background: linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.45) 100%);
        border-color: var(--primary, #38bdf8);
        color: #ffffff;
        box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
      }
      .btn-hour-pill {
        flex: 1;
        min-width: 44px;
        padding: 6px 2px;
        font-size: 0.78rem;
        font-weight: 700;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: center;
        box-sizing: border-box;
      }
      /* Selector ergonómico de rutas táctil (Adiós al diálogo gigante de Android) */
      .cycling-route-trigger {
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
      .cycling-route-trigger:active {
        background: rgba(56, 189, 248, 0.15);
      }
      /* Modal flotante de selección de rutas */
      .cycling-modal-backdrop {
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
      .cycling-modal-sheet {
        background: rgba(15, 23, 42, 0.88);
        backdrop-filter: blur(24px) saturate(190%);
        -webkit-backdrop-filter: blur(24px) saturate(190%);
        border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 20px 20px 0 0;
        width: 100%;
        max-width: 600px;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.35), 0 -10px 36px rgba(0,0,0,0.65);
        animation: slideUpCycling 0.25s ease-out;
      }
      @keyframes slideUpCycling {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      .cycling-route-item {
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
      .cycling-route-item:active, .cycling-route-item.selected {
        background: rgba(56, 189, 248, 0.15);
        border-color: rgba(56, 189, 248, 0.5);
      }
    </style>

    <div class="cycling-module-wrapper">
      
      <!-- CABECERA DEL MÓDULO -->
      <div class="cycling-card">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 8px; max-width: 100%;">
            <span style="font-size: 1.5rem;">🚴</span>
            <div>
              <h2 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: var(--text-main); line-height: 1.2;">
                Ciclismo en Ruta &amp; Viento
              </h2>
              <span style="font-size: 0.78rem; color: var(--text-dim); display: block; margin-top: 2px;">
                Viento por tramos • Salidas desde <strong>${concejo.name}</strong>
              </span>
            </div>
          </div>
          <span class="badge" style="background: rgba(56, 189, 248, 0.15); color: var(--primary); border: 1px solid rgba(56, 189, 248, 0.3); font-weight: 700; padding: 3px 8px; border-radius: 16px; font-size: 0.72rem;">
            Vectorial Dinámico
          </span>
        </div>

        <!-- SELECTOR DE DÍA, HORA DE SALIDA Y RITMO (BLINDADO MÓVIL) -->
        <div style="background: rgba(15, 23, 42, 0.40); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 10px; margin-top: 8px;">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            
            <!-- Selector de Día (Hoy / Mañana) -->
            <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.06);">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 5px;">
                <span>📅</span> Planificar salida:
              </span>
              <div style="display: flex; gap: 6px;">
                <button type="button" class="cycling-day-pill btn-cycling-day ${activeDay === 'today' ? 'active' : ''}" data-day="today">
                  Hoy
                </button>
                <button type="button" class="cycling-day-pill btn-cycling-day ${activeDay === 'tomorrow' ? 'active' : ''}" data-day="tomorrow">
                  Mañana
                </button>
              </div>
            </div>

            <!-- Hora de salida -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">⏰ Hora de salida:</span>
                <span style="font-size: 0.8rem; font-weight: 800; color: var(--primary);">
                  ${activeDay === 'tomorrow' ? 'Mañana ' : ''}${String(activeHour).padStart(2, '0')}:00 h
                </span>
              </div>
              <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; -webkit-overflow-scrolling: touch;">
                ${displayHours.length > 0 ? displayHours.map(h => {
    const isSelected = (h === activeHour);
    return `
                    <button type="button" 
                      class="btn-hour-pill ${isSelected ? 'active' : ''}" 
                      data-hour="${h}" 
                      style="border: 1px solid ${isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}; background: ${isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}; color: ${isSelected ? '#000' : 'var(--text-main)'};">
                      ${h}:00
                    </button>
                  `;
  }).join('') : `
                  <div style="font-size: 0.78rem; color: var(--text-dim); padding: 4px 2px;">
                    🌙 Ya no quedan salidas con luz hoy. Toca arriba en <strong>Mañana</strong>.
                  </div>
                `}
              </div>
            </div>

            <!-- Ritmo medio (Pastillas ergonómicas con scroll horizontal) -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">⚡ Ritmo en llano:</span>
                <span style="font-size: 0.78rem; font-weight: 700; color: var(--accent, #facc15);">${selectedSpeed} km/h (${speeds.find(s => s.value === selectedSpeed)?.sub || ''})</span>
              </div>
              <div style="display: flex; gap: 5px; width: 100%; box-sizing: border-box; overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; -webkit-overflow-scrolling: touch;">
                ${speeds.map(s => `
                  <button type="button" class="btn-speed-pill ${s.value === selectedSpeed ? 'active' : ''}" data-speed="${s.value}" style="border: 1px solid ${s.value === selectedSpeed ? 'var(--accent, #facc15)' : 'rgba(255,255,255,0.1)'}; background: ${s.value === selectedSpeed ? 'rgba(250, 204, 21, 0.2)' : 'rgba(255,255,255,0.04)'}; color: ${s.value === selectedSpeed ? 'var(--accent, #facc15)' : 'var(--text-dim)'};">
                    ${s.label}
                  </button>
                `).join('')}
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- TARJETA DEL CONSEJERO INTELIGENTE (AUTO-CARGA DE LA RUTA ÓPTIMA DEBAJO) -->
      <div class="cycling-advisor-card">
        <div style="display: flex; align-items: flex-start; gap: 8px;">
          <span style="font-size: 1.3rem; line-height: 1;">💡</span>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; margin-bottom: 4px;">
              <strong style="font-size: 0.88rem; color: var(--text-main);">Consejero de Viento (${activeDay === 'tomorrow' ? 'Mañana' : 'Hoy'}, ${String(activeHour).padStart(2, '0')}:00 h)</strong>
              <span style="font-size: 0.72rem; font-weight: 800; padding: 2px 7px; border-radius: 10px; background: ${activeRoute.id === bestRoute.id ? (bestSim?.badgeColor || '#22c55e') : (sim?.badgeColor || '#facc15')}; color: #000;">
                ${activeRoute.id === bestRoute.id ? (bestSim?.badgeLabel || 'Óptima 🚀') : (sim?.badgeLabel || 'Exigente ⚠️')}
              </span>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-dim); line-height: 1.4; word-break: break-word;">
              ${activeRoute.id === bestRoute.id
      ? `Ruta más favorable cargada: <strong style="color: var(--primary);">${bestRoute.name}</strong>. ${bestSim?.advisorMessage || ''}`
      : `Viendo selección manual: <strong style="color: #facc15;">${activeRoute.name}</strong>. ${sim?.advisorMessage || ''} <span style="display:block; margin-top:3px; font-size:0.74rem; color:#94a3b8;">(💡 La más favorable en tu zona es <em style="color:var(--primary); font-weight:700;">${bestRoute.name}</em> con ${bestSim?.badgeLabel}).</span>`
    }
            </p>
          </div>
        </div>
      </div>

      <!-- SELECTOR TÁCTIL ERGONÓMICO DE RUTA (DISPARADOR DEL MODAL COMPACTO) -->
      <div style="margin-bottom: 12px; display: flex; flex-direction: column; gap: 5px;">
        <label class="picker-section-label" style="font-size: 0.76rem; font-weight: 800; color: #facc15; text-transform: uppercase; letter-spacing: 0.04em; display: flex; align-items: center; gap: 5px;">
          <span>🚴</span>
          <span>Rutas ciclistas y puertos:</span>
        </label>
        
        <button type="button" id="btn-open-cycling-picker" class="cycling-route-trigger" aria-label="Cambiar trazado ciclista">
          <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; min-width: 0;">
            <span style="font-size: 0.95rem;">🗺️</span>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.84rem;">
              ${activeRoute.name}
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
            <span style="font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 6px; background: ${sim?.badgeColor || '#22c55e'}; color: #000; white-space: nowrap;">
              ${sim?.badgeLabel || 'Buena 👍'}
            </span>
            <div class="picker-action-badge">
              <span class="picker-action-text">${activeRoute.distanceKm} km · Elegir</span>
              <span class="picker-action-arrow">▼</span>
            </div>
          </div>
        </button>
      </div>

      <!-- FICHA DETALLADA DE LA RUTA SELECCIONADA -->
      <div class="cycling-card">
        
        <!-- Título y métricas de la ruta -->
        <div style="margin-bottom: 10px;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 6px; flex-wrap: wrap;">
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main); line-height: 1.3; flex: 1; min-width: 180px;">${activeRoute.name}</h3>
            <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
              <span style="font-size: 0.72rem; font-weight: 800; padding: 2px 7px; border-radius: 8px; background: ${sim?.badgeColor || '#22c55e'}; color: #000; white-space: nowrap;">
                ${sim?.badgeLabel || 'Buena 👍'}
              </span>
              <span style="font-size: 0.7rem; font-weight: 800; padding: 2px 7px; border-radius: 8px; background: rgba(34, 197, 94, 0.15); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3); white-space: nowrap;">
                🔄 Circular (Vuelta a casa)
              </span>
              <span style="font-size: 0.72rem; font-weight: 700; padding: 2px 7px; border-radius: 8px; background: rgba(255,255,255,0.1); color: var(--text-dim); white-space: nowrap;">
                ${activeRoute.difficulty} • ${activeRoute.profileType}
              </span>
            </div>
          </div>
          <span style="font-size: 0.78rem; color: var(--primary); display: block; margin-top: 3px;">
            ${activeRoute.subtitle}
          </span>
          <p style="margin: 6px 0 0 0; font-size: 0.78rem; color: var(--text-dim); line-height: 1.35;">
            ${activeRoute.description}
          </p>
        </div>

        <!-- Pastillas métricas rápidas (2x2 en móvil, 4 en desktop) -->
        <div class="cycling-metrics-grid">
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Distancia</span>
            <strong style="font-size: 0.92rem; color: var(--text-main);">${activeRoute.distanceKm} km</strong>
          </div>
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Desnivel</span>
            <strong style="font-size: 0.92rem; color: var(--accent, #facc15);">+${activeRoute.elevationGainM} m</strong>
          </div>
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Cota Máx</span>
            <strong style="font-size: 0.92rem; color: var(--primary);">${activeRoute.maxAltitudeM} m</strong>
          </div>
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Tiempo Est.</span>
            <strong style="font-size: 0.92rem; color: var(--text-main);">${sim.totalDurationFormatted}</strong>
          </div>
        </div>

        <!-- BARRA DE REPARTO DE VIENTO RELATIVO -->
        <div style="background: rgba(15, 23, 42, 0.40); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-main);">💨 Viento Global en Ruta:</span>
            <span style="font-size: 0.72rem; color: var(--text-dim);">Racha máx: <strong>${sim.maxGustKmh} km/h</strong></span>
          </div>

          <!-- Barra multicolor -->
          <div style="height: 10px; border-radius: 5px; overflow: hidden; display: flex; width: 100%; margin-bottom: 6px; background: rgba(255,255,255,0.05);">
            <div style="width: ${sim.tailwindPct}%; background: var(--success, #22c55e);" title="A favor: ${sim.tailwindPct}%"></div>
            <div style="width: ${sim.crosswindPct}%; background: var(--warning, #facc15);" title="Cruzado: ${sim.crosswindPct}%"></div>
            <div style="width: ${sim.headwindPct}%; background: var(--danger, #ef4444);" title="En contra: ${sim.headwindPct}%"></div>
          </div>

          <!-- Leyenda de porcentajes compacta -->
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; flex-wrap: wrap; gap: 4px;">
            <span style="color: var(--success, #22c55e); font-weight: 700;">🟢 Favor ${sim.tailwindPct}%</span>
            <span style="color: var(--warning, #facc15); font-weight: 700;">🟡 Cruzado ${sim.crosswindPct}%</span>
            <span style="color: var(--danger, #ef4444); font-weight: 700;">🔴 De cara ${sim.headwindPct}%</span>
          </div>
        </div>

        ${(sim.idaBalance && sim.vueltaBalance) ? `
          <!-- BALANCE TÁCTICO: CONDICIONES DE IDA VS VUELTA -->
          <div style="background: rgba(15, 23, 42, 0.45); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 0.82rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 5px;">
                <span>🧭</span> Balance Táctico: Ida vs Vuelta
              </span>
              <span style="font-size: 0.70rem; color: var(--text-dim);">Giro en km ${sim.idaBalance.km}</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <!-- TARJETA IDA -->
              <div style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; padding: 8px; border-left: 3px solid ${sim.idaBalance.windColor}; box-sizing: border-box;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-size: 0.74rem; font-weight: 800; color: var(--text-main);">🚴 IDA</span>
                  <span style="font-size: 0.68rem; color: var(--text-dim);">${sim.idaBalance.startHour} - ${sim.idaBalance.endHour}</span>
                </div>
                <div style="font-size: 0.70rem; color: var(--text-dim); margin-bottom: 5px; line-height: 1.3;">
                  ${sim.idaBalance.km} km • +${sim.idaBalance.elevGain} m • 🌡️ ${sim.idaBalance.avgTemp}°C
                </div>
                <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 6px;">
                  <strong style="font-size: 0.74rem; color: ${sim.idaBalance.windColor};">${sim.idaBalance.windLabel}</strong>
                </div>
                <!-- Barra mini de viento ida -->
                <div style="height: 5px; border-radius: 3px; overflow: hidden; display: flex; width: 100%; background: rgba(255,255,255,0.05); margin-bottom: 4px;">
                  <div style="width: ${sim.idaBalance.tailwindPct}%; background: var(--success, #22c55e);"></div>
                  <div style="width: ${sim.idaBalance.crosswindPct}%; background: var(--warning, #facc15);"></div>
                  <div style="width: ${sim.idaBalance.headwindPct}%; background: var(--danger, #ef4444);"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--text-dim);">
                  <span>🟢 ${sim.idaBalance.tailwindPct}%</span>
                  <span>🔴 ${sim.idaBalance.headwindPct}%</span>
                  <span>💨 ${sim.idaBalance.avgWindKmh}k/h</span>
                </div>
              </div>

              <!-- TARJETA VUELTA -->
              <div style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; padding: 8px; border-left: 3px solid ${sim.vueltaBalance.windColor}; box-sizing: border-box;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-size: 0.74rem; font-weight: 800; color: var(--text-main);">🔄 VUELTA</span>
                  <span style="font-size: 0.68rem; color: var(--text-dim);">${sim.vueltaBalance.startHour} - ${sim.vueltaBalance.endHour}</span>
                </div>
                <div style="font-size: 0.70rem; color: var(--text-dim); margin-bottom: 5px; line-height: 1.3;">
                  ${sim.vueltaBalance.km} km • +${sim.vueltaBalance.elevGain} m • 🌡️ ${sim.vueltaBalance.avgTemp}°C
                </div>
                <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 6px;">
                  <strong style="font-size: 0.74rem; color: ${sim.vueltaBalance.windColor};">${sim.vueltaBalance.windLabel}</strong>
                </div>
                <!-- Barra mini de viento vuelta -->
                <div style="height: 5px; border-radius: 3px; overflow: hidden; display: flex; width: 100%; background: rgba(255,255,255,0.05); margin-bottom: 4px;">
                  <div style="width: ${sim.vueltaBalance.tailwindPct}%; background: var(--success, #22c55e);"></div>
                  <div style="width: ${sim.vueltaBalance.crosswindPct}%; background: var(--warning, #facc15);"></div>
                  <div style="width: ${sim.vueltaBalance.headwindPct}%; background: var(--danger, #ef4444);"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--text-dim);">
                  <span>🟢 ${sim.vueltaBalance.tailwindPct}%</span>
                  <span>🔴 ${sim.vueltaBalance.headwindPct}%</span>
                  <span>💨 ${sim.vueltaBalance.avgWindKmh}k/h</span>
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- DESGLOSE DE TRAMOS PASO A PASO -->
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 0.88rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
            <span>⏱️</span> Tramos &amp; Horas (${activeDay === 'tomorrow' ? 'Mañana ' : ''}${String(activeHour).padStart(2, '0')}:00 h)
          </h4>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${sim.tramos.map((t, idx) => {
              const isFirstVuelta = t.phase === 'vuelta' && (idx === 0 || sim.tramos[idx - 1]?.phase === 'ida');
              const isFirstIda = idx === 0 && t.phase === 'ida' && sim.vueltaBalance;
              return `
              ${isFirstIda ? `
                <div style="display: flex; align-items: center; gap: 6px; margin: 4px 0 2px 0;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px;">🚴 TRAMOS DE IDA</span>
                  <div style="flex: 1; height: 1px; background: rgba(56, 189, 248, 0.25);"></div>
                </div>
              ` : ''}
              ${isFirstVuelta ? `
                <div style="display: flex; align-items: center; gap: 6px; margin: 8px 0 2px 0;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: var(--accent, #facc15); text-transform: uppercase; letter-spacing: 0.5px;">🔄 TRAMOS DE VUELTA (REGRESO)</span>
                  <div style="flex: 1; height: 1px; background: rgba(250, 204, 21, 0.25);"></div>
                </div>
              ` : ''}
              <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 8px 10px; display: flex; flex-direction: column; gap: 5px; box-sizing: border-box;">
                
                <!-- Fila superior: Nombre de tramo y hora estimada -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
                  <div style="display: flex; align-items: center; gap: 6px; flex: 1;">
                    <span style="font-size: 0.65rem; font-weight: 800; padding: 1px 5px; border-radius: 4px; ${t.phase === 'ida' ? 'background: rgba(56, 189, 248, 0.15); color: var(--primary);' : 'background: rgba(250, 204, 21, 0.15); color: var(--accent, #facc15);'}">
                      ${t.phase === 'ida' ? 'IDA' : 'VUELTA'}
                    </span>
                    <strong style="font-size: 0.82rem; color: var(--text-main); line-height: 1.3;">
                      ${idx + 1}. ${t.name}
                    </strong>
                  </div>
                  <span style="font-size: 0.74rem; font-weight: 800; color: var(--primary); background: rgba(56, 189, 248, 0.12); padding: 2px 6px; border-radius: 5px; white-space: nowrap;">
                    ${t.estimatedStartHour} - ${t.estimatedEndHour}
                  </span>
                </div>

                <!-- Fila intermedia: Métricas físicas y meteorológicas -->
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px; flex-wrap: wrap; font-size: 0.74rem; color: var(--text-dim);">
                  <span>📏 ${t.km} km • Pend: <strong>${t.avgGradePct > 0 ? '+' : ''}${t.avgGradePct}%</strong></span>
                  <span>🏔️ ${t.endAlt} m</span>
                  <span>🌡️ ${t.temp} °C</span>
                </div>

                <!-- Fila inferior: Viento relativo -->
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; background: rgba(255,255,255,0.02); padding: 5px 7px; border-radius: 6px; border-left: 3px solid ${t.wind.badgeColor};">
                  <div style="display: flex; align-items: center; gap: 5px;">
                    <span style="font-size: 0.88rem;">${t.wind.icon}</span>
                    <span style="font-size: 0.76rem; font-weight: 700; color: ${t.wind.badgeColor};">
                      ${t.wind.label}
                    </span>
                  </div>
                  <div style="font-size: 0.72rem; color: var(--text-main);">
                    <strong>${t.wind.windSpeedKmh} km/h</strong> (Rachas: ${t.wind.windGustsKmh})
                  </div>
                </div>

                ${t.wind.isDangerousGust ? `
                  <div style="font-size: 0.7rem; color: var(--danger, #ef4444); background: rgba(239, 68, 68, 0.12); padding: 3px 6px; border-radius: 5px; font-weight: 700; line-height: 1.25;">
                    ⚠️ Racha lateral de ${t.wind.windGustsKmh} km/h: precaución con llantas de perfil alto.
                  </div>
                ` : ''}

              </div>
            `;
            }).join('')}
          </div>
        </div>

        <!-- Botón interactivo para ver Ficha Oficial, Consejos de Puerto y Salida GPS -->
        <button type="button" class="btn-explain-cycling" data-explain-cycling="${activeRoute.id}" style="width: 100%; margin-top: 12px; padding: 10px; border-radius: 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); color: var(--primary); font-size: 0.8rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <span>🗺️</span>
          <span>Ver Ficha Oficial, Consejos de Puerto y Salida GPS ➔</span>
        </button>

      </div>

      <!-- DESCARGO LEGAL Y CONSEJOS DE SEGURIDAD VIAL -->
      <div class="cycling-disclaimer-card">
        <strong>🛡️ Seguridad Ciclista &amp; Exención de Responsabilidad:</strong>
        Estimaciones meteorológicas orientativas. Respeta la distancia de seguridad obligatoria de 1.5 m (DGT), uso de casco homologado, luces reglamentarias en túneles y chaleco cortavientos para descensos fríos.
      </div>

      <!-- BOTTOM SHEET / MODAL ERGONÓMICO DE RUTAS (SIN DIÁLOGOS GIGANTES) -->
      <div id="cycling-routes-modal" class="cycling-modal-backdrop" aria-hidden="true">
        <div class="cycling-modal-sheet">
          
          <div style="padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main);">Selecciona trazado ciclista</h3>
              <span style="font-size: 0.75rem; color: var(--text-dim);">Toca una ruta para calcular el viento</span>
            </div>
            <button type="button" id="btn-close-cycling-modal" style="background: rgba(255,255,255,0.08); border: none; color: var(--text-main); font-size: 1.1rem; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
              ✕
            </button>
          </div>

          <div style="padding: 12px 14px; overflow-y: auto; flex: 1; -webkit-overflow-scrolling: touch;">
            
            ${localRoutes.length > 0 ? `
              <div style="margin-bottom: 12px;">
                <span style="font-size: 0.76rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                  📍 Rutas por ${concejo.name} y Comarca (${localRoutes.length})
                </span>
                ${localRoutes.map(r => {
      const rSim = simulateRouteConditions(r, activeHour, selectedSpeed, hourly, activeDay);
      return `
                  <div class="cycling-route-item ${r.id === activeRoute.id ? 'selected' : ''}" data-route-id="${r.id}">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                      <strong style="font-size: 0.84rem; color: var(--text-main);">${r.name}</strong>
                      <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                        <span style="font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 6px; background: ${rSim?.badgeColor || '#22c55e'}; color: #000; white-space: nowrap;">
                          ${rSim?.badgeLabel || ''}
                        </span>
                        <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); white-space: nowrap;">${r.distanceKm} km</span>
                      </div>
                    </div>
                    <div style="display: flex; gap: 6px; align-items: center; font-size: 0.72rem; color: var(--text-dim); flex-wrap: wrap; margin-top: 2px;">
                      <span>+${r.elevationGainM} m</span>
                      <span>•</span>
                      <span>${r.difficulty}</span>
                      <span>•</span>
                      ${rSim?.headwindPct >= 50 ? `<span style="color: var(--danger, #ef4444); font-weight: 700;">🔴 ${rSim.headwindPct}% de cara</span>` : (rSim?.tailwindPct >= 40 ? `<span style="color: var(--success, #22c55e); font-weight: 700;">🟢 ${rSim.tailwindPct}% a favor</span>` : `<span>🟡 ${rSim?.crosswindPct || 0}% cruzado</span>`)}
                    </div>
                  </div>
                `;
    }).join('')}
              </div>
            ` : ''}

            ${otherRoutes.length > 0 ? `
              <div>
                <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                  🌟 Grandes Clásicas de Asturias (${otherRoutes.length})
                </span>
                ${otherRoutes.map(r => {
      const rSim = simulateRouteConditions(r, activeHour, selectedSpeed, hourly, activeDay);
      return `
                  <div class="cycling-route-item ${r.id === activeRoute.id ? 'selected' : ''}" data-route-id="${r.id}">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                      <strong style="font-size: 0.84rem; color: var(--text-main);">${r.name}</strong>
                      <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                        <span style="font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 6px; background: ${rSim?.badgeColor || '#22c55e'}; color: #000; white-space: nowrap;">
                          ${rSim?.badgeLabel || ''}
                        </span>
                        <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); white-space: nowrap;">${r.distanceKm} km</span>
                      </div>
                    </div>
                    <div style="display: flex; gap: 6px; align-items: center; font-size: 0.72rem; color: var(--text-dim); flex-wrap: wrap; margin-top: 2px;">
                      <span>+${r.elevationGainM} m</span>
                      <span>•</span>
                      <span>${r.difficulty}</span>
                      <span>•</span>
                      ${rSim?.headwindPct >= 50 ? `<span style="color: var(--danger, #ef4444); font-weight: 700;">🔴 ${rSim.headwindPct}% de cara</span>` : (rSim?.tailwindPct >= 40 ? `<span style="color: var(--success, #22c55e); font-weight: 700;">🟢 ${rSim.tailwindPct}% a favor</span>` : `<span>🟡 ${rSim?.crosswindPct || 0}% cruzado</span>`)}
                    </div>
                  </div>
                `;
    }).join('')}
              </div>
            ` : ''}

          </div>

        </div>
      </div>

    </div>
  `;
}
