/**
 * METEOASTUR LODE - Componente de Tarjeta de Planes & Ocio: ¿Qué facer güei?
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Ecosistema Zeustata • Principado de Asturias.
 * Arquitectura de Plan Protagonista Activo, Selector Ergonómico Bottom Sheet (Adiós Scroll Infinito),
 * Estética Liquid Glass Pura (Ley 14), Ergonomía Móvil (Ley 11) y Blindaje Legal (Leyes 15 y 16).
 */

import { getRecommendedPlans, getTourismPlanExplanation } from '../utils/tourismData.js?v=3.0.24.12';

export function renderTourismCard(weatherData, concejo, selectedPlanId = null) {
  if (!concejo) return '';

  const { weatherVerdict, weatherCategory, weatherIcon, comarca, plans } = getRecommendedPlans(weatherData, concejo);
  const cleanConcejoName = (concejo.name || '').replace(/\s*\(.*?\)/, '').trim();

  // Plan sugerido automáticamente según el tiempo de hoy y proximidad
  const recommendedPlan = plans.find(p => p.weatherType === weatherCategory) || plans[0];

  // Plan activo a mostrar en pantalla completa
  let activePlan = recommendedPlan;
  if (selectedPlanId) {
    const found = plans.find(p => p.id === selectedPlanId);
    if (found) activePlan = found;
  }

  const isRecommendedNow = (activePlan.weatherType === weatherCategory);

  const activeDistLabel = activePlan.distFromUserKm < 1 
    ? 'En este concejo' 
    : `A ${activePlan.distFromUserKm} km (~${activePlan.driveTimeMin} min)`;

  const weatherLabel = activePlan.weatherType === 'rain' ? '🌧️ Días de lluvia' :
                       activePlan.weatherType === 'sun' ? '☀️ Días de sol' :
                       activePlan.weatherType === 'fog' ? '🌫️ Bruma o nubes' : '❄️ Frío / Cuchara';

  return `
    <style>
      .tourism-module-wrapper {
        padding: 0 0 10px 0;
        max-width: 900px;
        margin: 0 auto;
        box-sizing: border-box;
        overflow-x: hidden;
      }
      .tourism-card-solid {
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
      .tourism-advisor-card {
        background: linear-gradient(135deg, rgba(8, 14, 28, 0.96) 0%, rgba(15, 23, 42, 0.94) 100%);
        border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 14px;
        padding: 12px;
        margin-bottom: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(56, 189, 248, 0.2);
        box-sizing: border-box;
      }
      .tourism-plan-trigger {
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
      .tourism-plan-trigger:active {
        background: rgba(56, 189, 248, 0.15);
      }
      .tourism-metrics-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-bottom: 12px;
      }
      @media (max-width: 480px) {
        .tourism-metrics-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
        }
      }
      /* Modal Bottom Sheet táctil para selección de planes */
      .tourism-modal-backdrop {
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
      .tourism-modal-sheet {
        background: #0b132b;
        border: 1px solid rgba(56, 189, 248, 0.3);
        border-radius: 20px 20px 0 0;
        width: 100%;
        max-width: 600px;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 -10px 30px rgba(0,0,0,0.6);
        animation: slideUpTourism 0.25s ease-out;
      }
      @keyframes slideUpTourism {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      .tourism-item-card {
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
      .tourism-item-card:active, .tourism-item-card.selected {
        background: rgba(56, 189, 248, 0.15);
        border-color: rgba(56, 189, 248, 0.5);
      }
    </style>

    <div class="tourism-module-wrapper">
      
      <!-- 1. CABECERA LIMPIA Y ERGONÓMICA -->
      <div class="tourism-card-solid">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 8px; max-width: 100%;">
            <span style="font-size: 1.5rem;">🎭</span>
            <div>
              <h2 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: var(--text-main); line-height: 1.2;">
                Planes &amp; Ocio: ¿Qué facer güei?
              </h2>
              <span style="font-size: 0.78rem; color: var(--text-dim); display: block; margin-top: 2px;">
                Recomendaciones según el cielo • Salidas desde <strong>${cleanConcejoName}</strong>
              </span>
            </div>
          </div>
          <div class="sea-state-pill" style="background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35);">
            📍 ${comarca.name}
          </div>
        </div>

        <!-- Veredicto del Cielo Actual -->
        <div style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 10px; border: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 1.8rem; line-height: 1; flex-shrink: 0;">${weatherIcon}</div>
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 0.7rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px;">Veredicto del Cielo Actual</div>
            <div style="font-size: 0.86rem; font-weight: 800; color: var(--text-main); margin-top: 1px; line-height: 1.3;">${weatherVerdict}</div>
            <div style="font-size: 0.72rem; color: var(--text-dim); margin-top: 2px;">${comarca.hero}</div>
          </div>
        </div>
      </div>

      <!-- 2. CONSEJERO INTELIGENTE: PLAN RECOMENDADO DE HOY -->
      <div class="tourism-advisor-card">
        <div style="display: flex; align-items: flex-start; gap: 8px;">
          <span style="font-size: 1.3rem; line-height: 1;">💡</span>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; margin-bottom: 4px;">
              <strong style="font-size: 0.88rem; color: var(--text-main);">Consejero de Ocio y Planes</strong>
              <span style="font-size: 0.72rem; font-weight: 800; padding: 2px 7px; border-radius: 10px; background: #22c55e; color: #000;">
                Óptimo hoy ✨
              </span>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-dim); line-height: 1.4; word-break: break-word;">
              Plan sugerido para hoy: <strong style="color: var(--primary);">${recommendedPlan.title}</strong> (${recommendedPlan.town}). ${recommendedPlan.tip}
            </p>
          </div>
        </div>
      </div>

      <!-- 3. SELECTOR TÁCTIL ERGONÓMICO DE PLAN (DISPARADOR DEL BOTTOM SHEET) -->
      <div style="margin-bottom: 12px; display: flex; flex-direction: column; gap: 5px;">
        <label style="font-size: 0.82rem; font-weight: 700; color: var(--text-main);">
          Plan de ocio:
        </label>
        
        <button type="button" id="btn-open-tourism-picker" class="tourism-plan-trigger" aria-label="Cambiar plan de ocio">
          <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; min-width: 0;">
            <span style="font-size: 0.95rem;">${activePlan.icon}</span>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.84rem;">
              ${activePlan.title}
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
            <span style="font-size: 0.75rem; color: var(--accent, #facc15); font-weight: 800;">
              ${activePlan.distFromUserKm} km
            </span>
            <span style="font-size: 0.8rem; color: var(--primary);">▾</span>
          </div>
        </button>
      </div>

      <!-- 4. FICHA DETALLADA DEL PLAN SELECCIONADO (TARJETA PROTAGONISTA) -->
      <div class="tourism-card-solid">
        
        <div style="margin-bottom: 10px;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 6px; flex-wrap: wrap;">
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main); line-height: 1.3; flex: 1; min-width: 180px;">
              ${activePlan.title}
            </h3>
            <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
              ${isRecommendedNow ? `<span style="font-size: 0.7rem; font-weight: 800; padding: 2px 7px; border-radius: 8px; background: rgba(34, 197, 94, 0.15); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.3); white-space: nowrap;">✨ Ideal hoy</span>` : ''}
              <span style="font-size: 0.7rem; font-weight: 800; padding: 2px 7px; border-radius: 8px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); white-space: nowrap;">
                ${activePlan.tag}
              </span>
            </div>
          </div>
          <span style="font-size: 0.76rem; color: var(--primary); display: block; margin-top: 3px;">
            📍 ${activePlan.town} • ${activeDistLabel}
          </span>
          <p style="margin: 6px 0 0 0; font-size: 0.78rem; color: var(--text-dim); line-height: 1.35;">
            ${activePlan.desc}
          </p>
        </div>

        <!-- Pastillas métricas rápidas (2x2 en móvil, 4 en desktop) -->
        <div class="tourism-metrics-grid">
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Municipio</span>
            <strong style="font-size: 0.82rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">${activePlan.town}</strong>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Distancia</span>
            <strong style="font-size: 0.92rem; color: var(--accent, #facc15);">${activePlan.distFromUserKm} km</strong>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Tiempo en Coche</span>
            <strong style="font-size: 0.92rem; color: var(--primary);">~${activePlan.driveTimeMin} min</strong>
          </div>
          <div style="background: rgba(0,0,0,0.25); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Cielo Óptimo</span>
            <strong style="font-size: 0.78rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">
              ${weatherLabel}
            </strong>
          </div>
        </div>

        <!-- Consejo Meteorológico: Por qué hoy -->
        <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 10px; padding: 8px 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.1rem;">💡</span>
          <div style="font-size: 0.76rem; color: var(--text-dim); line-height: 1.35;">
            <strong style="color: var(--primary);">Por qué hoy:</strong> ${activePlan.tip}
          </div>
        </div>

        <!-- Botón interactivo para ver Ficha Didáctica y Track GPS -->
        <button type="button" class="btn-explain-tourism" data-explain-tourism="${activePlan.id}" style="width: 100%; padding: 10px; border-radius: 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); color: var(--primary); font-size: 0.8rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <span>🏛️</span>
          <span>Ver Ficha Oficial, Horarios y Cómo Llegar ➔</span>
        </button>

      </div>

      <!-- 5. DESCARGO LEGAL Y DIVULGACIÓN CULTURAL -->
      <div style="background: rgba(11, 19, 43, 0.85); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 10px 12px; font-size: 0.72rem; color: var(--text-dim); line-height: 1.4; box-sizing: border-box;">
        <strong>🏛️ Divulgación Cultural &amp; Ocio en Asturias:</strong>
        Recomendaciones orientativas calculadas según modelos meteorológicos y datos abiertos oficiales. Consulta siempre los horarios oficiales de apertura, reservas y el estado de carreteras (112 Asturias / DGT).
      </div>

      <!-- 6. BOTTOM SHEET / MODAL ERGONÓMICO DE SELECCIÓN DE PLANES (36 PLANES) -->
      <div id="tourism-plans-modal" class="tourism-modal-backdrop" aria-hidden="true">
        <div class="tourism-modal-sheet">
          
          <div style="padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main);">Selecciona plan de ocio</h3>
              <span style="font-size: 0.75rem; color: var(--text-dim);">Toca un plan para ver su ficha completa</span>
            </div>
            <button type="button" id="btn-close-tourism-modal" style="background: rgba(255,255,255,0.08); border: none; color: var(--text-main); font-size: 1.1rem; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
              ✕
            </button>
          </div>

          <div style="padding: 12px 14px; overflow-y: auto; flex: 1; -webkit-overflow-scrolling: touch;">
            
            <div style="margin-bottom: 14px;">
              <span style="font-size: 0.76rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                ✨ Planes ordenados por cercanía desde ${cleanConcejoName} (${plans.length})
              </span>
              ${plans.map(p => `
                <div class="tourism-item-card ${p.id === activePlan.id ? 'selected' : ''}" data-plan-id="${p.id}">
                  <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                    <strong style="font-size: 0.84rem; color: var(--text-main);">${p.icon} ${p.title}</strong>
                    <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); white-space: nowrap;">${p.distFromUserKm} km</span>
                  </div>
                  <div style="display: flex; gap: 6px; align-items: center; font-size: 0.72rem; color: var(--text-dim); flex-wrap: wrap;">
                    <span style="color: var(--primary);">📍 ${p.town}</span>
                    <span>•</span>
                    <span>~${p.driveTimeMin} min en coche</span>
                    <span>•</span>
                    <span style="color: ${p.weatherType === weatherCategory ? '#22c55e' : 'var(--text-dim)'}; font-weight: 700;">
                      ${p.weatherType === weatherCategory ? '✨ Recomendado hoy' : p.tag}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>

          </div>

        </div>
      </div>

    </div>
  `;
}
