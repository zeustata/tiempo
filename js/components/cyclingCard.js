/**
 * METEOASTUR LODE - Componente de Tarjeta de Ciclismo & Viento Dinámico
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Cálculo de viento relativo (en contra, a favor, cruzado) según rumbo de marcha,
 * simulador de paso horario por tramos y puertos, y blindaje de seguridad ciclista (Ley 16).
 * Blindaje ergonómico y anti-desborde para pantallas móviles de 320px a 380px (Ley Constitucional 11).
 */

import { getCyclingRoutesForConcejo, getCyclingRouteById, CYCLING_ROUTES } from '../utils/cyclingData.js?v=3.0.24.5';
import { simulateRouteConditions, rankRoutesForDeparture } from '../utils/cyclingAdvisor.js?v=3.0.24.5';

/**
 * Renderiza la vista principal del módulo de Ciclismo & Viento
 */
export function renderCyclingCard(weatherData, concejo, selectedRouteId = null, selectedHour = 9, selectedSpeed = 24) {
  if (!concejo) return '';

  const hourly = weatherData?.weather?.hourly || null;
  const localRoutes = getCyclingRoutesForConcejo(concejo.id);
  const otherRoutes = CYCLING_ROUTES.filter(r => !localRoutes.some(lr => lr.id === r.id));

  // Ruta activa: la seleccionada explícitamente o la primera local
  const activeRoute = selectedRouteId ? getCyclingRouteById(selectedRouteId) : localRoutes[0] || CYCLING_ROUTES[0];

  // Simulación para la ruta activa
  const sim = simulateRouteConditions(activeRoute, selectedHour, selectedSpeed, hourly);

  // Clasificación para el consejero inteligente (evalúa las de la zona activa)
  const ranked = rankRoutesForDeparture(localRoutes.length > 0 ? localRoutes : CYCLING_ROUTES, selectedHour, selectedSpeed, hourly);
  const bestRoute = ranked[0]?.route || activeRoute;
  const bestSim = ranked[0]?.simulation || sim;

  // Horas rápidas de salida
  const quickHours = [8, 9, 10, 11, 16, 17];
  const speeds = [
    { value: 20, label: '20 km/h', sub: 'Tranquilo' },
    { value: 24, label: '24 km/h', sub: 'Medio' },
    { value: 28, label: '28 km/h', sub: 'Rápido' }
  ];

  return `
    <style>
      .cycling-module-wrapper {
        padding: 10px 8px;
        max-width: 900px;
        margin: 0 auto;
        box-sizing: border-box;
        overflow-x: hidden;
      }
      #cycling-route-select {
        color-scheme: dark !important;
        background-color: #0b132b !important;
        color: #f8fafc !important;
        border: 1px solid rgba(56, 189, 248, 0.4) !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      #cycling-route-select optgroup {
        background-color: #070d18 !important;
        color: #38bdf8 !important;
        font-weight: 800 !important;
        font-style: normal !important;
        padding: 6px 4px !important;
      }
      #cycling-route-select option {
        background-color: #0f172a !important;
        color: #ffffff !important;
        padding: 10px 12px !important;
        font-weight: 600 !important;
      }
      #cycling-route-select option:checked {
        background-color: #1e3a8a !important;
        color: #facc15 !important;
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
        flex: 1;
        min-width: 0;
        text-align: center;
        padding: 6px 4px;
        font-size: 0.76rem;
        font-weight: 700;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-sizing: border-box;
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
    </style>

    <div class="cycling-module-wrapper">
      
      <!-- CABECERA DEL MÓDULO -->
      <div class="card card-glass" style="margin-bottom: 12px; border-radius: 14px; padding: 14px 12px; border: 1px solid rgba(255,255,255,0.08); background: var(--bg-card); box-sizing: border-box;">
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

        <!-- SELECTOR DE HORA DE SALIDA Y RITMO (BLINDADO MÓVIL) -->
        <div style="background: rgba(0,0,0,0.22); border-radius: 12px; padding: 10px; margin-top: 8px;">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            
            <!-- Hora de salida -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">⏰ Hora de salida:</span>
                <span style="font-size: 0.8rem; font-weight: 800; color: var(--primary);">${String(selectedHour).padStart(2, '0')}:00 h</span>
              </div>
              <div style="display: flex; gap: 4px; overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; -webkit-overflow-scrolling: touch;">
                ${quickHours.map(h => `
                  <button type="button" class="btn-hour-pill ${h === selectedHour ? 'active' : ''}" data-hour="${h}" style="border: 1px solid ${h === selectedHour ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}; background: ${h === selectedHour ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}; color: ${h === selectedHour ? '#000' : 'var(--text-main)'};">
                    ${h}:00
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Ritmo medio (Pastillas ergonómicas al 33%) -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">⚡ Ritmo en llano:</span>
                <span style="font-size: 0.78rem; font-weight: 700; color: var(--accent, #facc15);">${selectedSpeed} km/h</span>
              </div>
              <div style="display: flex; gap: 6px; width: 100%; box-sizing: border-box;">
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

      <!-- TARJETA DEL CONSEJERO INTELIGENTE (¿QUÉ RUTA RECOMIENDA EL VIENTO A ESA HORA?) -->
      <div class="card card-glass" style="margin-bottom: 12px; border-radius: 14px; padding: 12px; border: 1px solid rgba(56, 189, 248, 0.25); background: linear-gradient(135deg, rgba(7, 13, 24, 0.95), rgba(15, 23, 42, 0.85)); box-sizing: border-box;">
        <div style="display: flex; align-items: flex-start; gap: 8px;">
          <span style="font-size: 1.3rem; line-height: 1;">💡</span>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; margin-bottom: 4px;">
              <strong style="font-size: 0.88rem; color: var(--text-main);">Consejero de Viento (${selectedHour}:00 h)</strong>
              <span style="font-size: 0.72rem; font-weight: 800; padding: 2px 7px; border-radius: 10px; background: ${bestSim.badgeColor}; color: #000;">
                ${bestSim.badgeLabel}
              </span>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-dim); line-height: 1.4; word-break: break-word;">
              Ruta aconsejada: <strong style="color: var(--primary);">${bestRoute.name}</strong>. ${bestSim.advisorMessage}
            </p>
          </div>
        </div>
      </div>

      <!-- SELECTOR DE RUTA ESPECÍFICA CON OPTGROUP -->
      <div style="margin-bottom: 12px; display: flex; flex-direction: column; gap: 5px;">
        <label for="cycling-route-select" style="font-size: 0.82rem; font-weight: 700; color: var(--text-main);">
          📍 Selecciona trazado ciclista:
        </label>
        <select id="cycling-route-select" style="padding: 10px 12px; border-radius: 12px; font-size: 0.84rem; font-weight: 600; outline: none; cursor: pointer;">
          ${localRoutes.length > 0 ? `
            <optgroup label="📍 Rutas por ${concejo.name} y Comarca (${localRoutes.length})">
              ${localRoutes.map(r => `
                <option value="${r.id}" ${r.id === activeRoute.id ? 'selected' : ''}>
                  ${r.name} (${r.distanceKm} km • +${r.elevationGainM}m)
                </option>
              `).join('')}
            </optgroup>
          ` : ''}

          ${otherRoutes.length > 0 ? `
            <optgroup label="🌟 Grandes Clásicas de Asturias (${otherRoutes.length})">
              ${otherRoutes.map(r => `
                <option value="${r.id}" ${r.id === activeRoute.id ? 'selected' : ''}>
                  ${r.name} (${r.distanceKm} km • +${r.elevationGainM}m)
                </option>
              `).join('')}
            </optgroup>
          ` : ''}
        </select>
      </div>

      <!-- FICHA DETALLADA DE LA RUTA SELECCIONADA -->
      <div class="card card-glass" style="margin-bottom: 12px; border-radius: 14px; padding: 14px 12px; border: 1px solid rgba(255,255,255,0.08); background: var(--bg-card); box-sizing: border-box;">
        
        <!-- Título y métricas de la ruta -->
        <div style="margin-bottom: 10px;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 6px; flex-wrap: wrap;">
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main); line-height: 1.3; flex: 1; min-width: 180px;">${activeRoute.name}</h3>
            <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
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
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Distancia</span>
            <strong style="font-size: 0.92rem; color: var(--text-main);">${activeRoute.distanceKm} km</strong>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Desnivel</span>
            <strong style="font-size: 0.92rem; color: var(--accent, #facc15);">+${activeRoute.elevationGainM} m</strong>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Cota Máx</span>
            <strong style="font-size: 0.92rem; color: var(--primary);">${activeRoute.maxAltitudeM} m</strong>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Tiempo Est.</span>
            <strong style="font-size: 0.92rem; color: var(--text-main);">${sim.totalDurationFormatted}</strong>
          </div>
        </div>

        <!-- BARRA DE REPARTO DE VIENTO RELATIVO -->
        <div style="background: rgba(0,0,0,0.2); border-radius: 10px; padding: 10px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-main);">💨 Viento en Ruta:</span>
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

        <!-- DESGLOSE DE TRAMOS PASO A PASO (DISEÑO BLINDADO MÓVIL) -->
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 0.88rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
            <span>⏱️</span> Tramos &amp; Horas (${String(selectedHour).padStart(2, '0')}:00 h)
          </h4>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${sim.tramos.map((t, idx) => `
              <div style="background: rgba(0,0,0,0.22); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 8px 10px; display: flex; flex-direction: column; gap: 5px; box-sizing: border-box;">
                
                <!-- Fila superior: Nombre de tramo y hora estimada -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
                  <strong style="font-size: 0.82rem; color: var(--text-main); line-height: 1.3; flex: 1;">
                    ${idx + 1}. ${t.name}
                  </strong>
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
            `).join('')}
          </div>
        </div>

      </div>

      <!-- DESCARGO LEGAL Y CONSEJOS DE SEGURIDAD VIAL (LEY 16) -->
      <div class="card card-glass" style="border-radius: 12px; padding: 10px 12px; border: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.3); font-size: 0.72rem; color: var(--text-dim); line-height: 1.4; box-sizing: border-box;">
        <strong>🛡️ Seguridad Ciclista &amp; Exención de Responsabilidad (Ley 16):</strong>
        Estimaciones teóricas orientativas. Respeta la distancia de seguridad obligatoria de 1.5 m (DGT), uso de casco homologado y luces reglamentarias.
      </div>

    </div>
  `;
}
