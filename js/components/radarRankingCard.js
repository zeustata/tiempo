/**
 * METEOASTUR LODE - Tarjeta y Ventana Emergente de Ranking de Lluvia por Concejos
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Doctrina de Blindaje Anti-Desborde y Ergonomía Móvil Estricta (Leyes 11 y 14).
 */

import { formatConcejoShortName } from '../utils/radarRainService.js';

/**
 * Obtiene la etiqueta del día según el índice (0 = Hoy, 1 = Mañana, 2 = Pasado)
 */
function getDayInfo(dayIndex) {
  if (dayIndex === 0) return { label: 'Hoy', fullLabel: 'Hoy', icon: '☀️' };
  if (dayIndex === 1) return { label: 'Mañana', fullLabel: 'Mañana', icon: '📅' };
  return { label: 'Pasado', fullLabel: 'Pasado mañana', icon: '🗓️' };
}

/**
 * Ordena la lista de concejos según el día seleccionado y el orden elegido ('dry' o 'wet')
 */
export function getSortedConcejos(rainMap, dayIndex = 0, order = 'dry') {
  if (!rainMap || typeof rainMap !== 'object') return [];
  
  const list = Object.values(rainMap).map(entry => {
    const dayData = entry.days && entry.days[dayIndex] ? entry.days[dayIndex] : { rainMm: 0, pop: 0, badge: { label: '--', color: '#94a3b8' } };
    return {
      concejo: entry.concejo,
      day: dayData
    };
  });

  list.sort((a, b) => {
    if (order === 'dry') {
      return (a.day.rainMm - b.day.rainMm) || (a.day.pop - b.day.pop) || a.concejo.name.localeCompare(b.concejo.name);
    } else {
      return (b.day.rainMm - a.day.rainMm) || (b.day.pop - a.day.pop) || a.concejo.name.localeCompare(b.concejo.name);
    }
  });

  return list;
}

/**
 * Renderiza la tarjeta principal compacta (Top 5) en la pestaña Radar
 */
export function renderRadarRankingCard(rainMap, selectedDayIndex = 0, selectedOrder = 'dry', activeConcejoId = null) {
  const sortedList = getSortedConcejos(rainMap, selectedDayIndex, selectedOrder);
  const day0Info = getDayInfo(0);
  const day1Info = getDayInfo(1);
  const day2Info = getDayInfo(2);

  const top5 = sortedList.slice(0, 5);
  const maxRainInTop = Math.max(...top5.map(item => item.day.rainMm), 1.0);

  return `
    <div class="radar-rain-card" style="
      background: var(--bg-surface);
      border: 1px solid var(--border-glass);
      border-radius: var(--radius-lg);
      box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.45);
      backdrop-filter: blur(var(--glass-blur, 24px)) saturate(190%);
      -webkit-backdrop-filter: blur(var(--glass-blur, 24px)) saturate(190%);
      margin-top: 14px;
      margin-bottom: 14px;
      padding: 14px 12px;
      box-sizing: border-box;
      max-width: 100%;
      overflow: hidden;
    ">
      <!-- Cabecera limpia (Ley 11: sin sobrecarga que aplaste el título) -->
      <div style="margin-bottom: 12px;">
        <h3 style="margin: 0; font-size: 0.96rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
          <span>🌧️</span> <span>Previsión de Lluvia por Concejos</span>
        </h3>
        <span style="font-size: 0.72rem; color: var(--text-dim); display: block; margin-top: 2px;">
          Ranking comparativo de los 82 concejos de Asturias
        </span>
      </div>

      <!-- Selector de 3 Días (Leyes 11 y 18: etiquetas breves para no truncar) -->
      <div style="display: flex; gap: 6px; margin-bottom: 8px; box-sizing: border-box;">
        <button type="button" class="btn-radar-rain-day ${selectedDayIndex === 0 ? 'active' : ''}" data-day="0" style="
          flex: 1; min-height: 38px; border-radius: 10px; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
          background: ${selectedDayIndex === 0 ? 'var(--primary)' : 'rgba(255,255,255,0.06)'};
          color: ${selectedDayIndex === 0 ? '#fff' : 'var(--text-main)'};
          border: 1px solid ${selectedDayIndex === 0 ? 'transparent' : 'rgba(255,255,255,0.1)'};
          display: flex; align-items: center; justify-content: center; gap: 4px;
        ">
          ${day0Info.icon} ${day0Info.label}
        </button>
        <button type="button" class="btn-radar-rain-day ${selectedDayIndex === 1 ? 'active' : ''}" data-day="1" style="
          flex: 1; min-height: 38px; border-radius: 10px; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
          background: ${selectedDayIndex === 1 ? 'var(--primary)' : 'rgba(255,255,255,0.06)'};
          color: ${selectedDayIndex === 1 ? '#fff' : 'var(--text-main)'};
          border: 1px solid ${selectedDayIndex === 1 ? 'transparent' : 'rgba(255,255,255,0.1)'};
          display: flex; align-items: center; justify-content: center; gap: 4px;
        ">
          ${day1Info.icon} ${day1Info.label}
        </button>
        <button type="button" class="btn-radar-rain-day ${selectedDayIndex === 2 ? 'active' : ''}" data-day="2" style="
          flex: 1; min-height: 38px; border-radius: 10px; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
          background: ${selectedDayIndex === 2 ? 'var(--primary)' : 'rgba(255,255,255,0.06)'};
          color: ${selectedDayIndex === 2 ? '#fff' : 'var(--text-main)'};
          border: 1px solid ${selectedDayIndex === 2 ? 'transparent' : 'rgba(255,255,255,0.1)'};
          display: flex; align-items: center; justify-content: center; gap: 4px;
        ">
          ${day2Info.icon} ${day2Info.label}
        </button>
      </div>

      <!-- Selector de Ordenación -->
      <div style="display: flex; gap: 6px; margin-bottom: 12px; box-sizing: border-box;">
        <button type="button" class="btn-radar-rain-order ${selectedOrder === 'dry' ? 'active' : ''}" data-order="dry" style="
          flex: 1; min-height: 36px; border-radius: 9px; font-size: 0.74rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
          background: ${selectedOrder === 'dry' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.04)'};
          color: ${selectedOrder === 'dry' ? '#34d399' : 'var(--text-dim)'};
          border: 1px solid ${selectedOrder === 'dry' ? 'rgba(16, 185, 129, 0.45)' : 'rgba(255,255,255,0.08)'};
          display: flex; align-items: center; justify-content: center; gap: 4px;
        ">
          <span>☀️</span> <span>Dónde lloverá menos</span>
        </button>
        <button type="button" class="btn-radar-rain-order ${selectedOrder === 'wet' ? 'active' : ''}" data-order="wet" style="
          flex: 1; min-height: 36px; border-radius: 9px; font-size: 0.74rem; font-weight: 700; cursor: pointer; transition: all 0.2s;
          background: ${selectedOrder === 'wet' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.04)'};
          color: ${selectedOrder === 'wet' ? '#38bdf8' : 'var(--text-dim)'};
          border: 1px solid ${selectedOrder === 'wet' ? 'rgba(56, 189, 248, 0.45)' : 'rgba(255,255,255,0.08)'};
          display: flex; align-items: center; justify-content: center; gap: 4px;
        ">
          <span>🌧️</span> <span>Dónde lloverá más</span>
        </button>
      </div>

      <!-- Podio Top 5 con Blindaje Anti-Desborde en 2 Niveles (Ley 11) -->
      <div class="radar-rain-top-list" style="display: flex; flex-direction: column; gap: 7px; margin-bottom: 12px;">
        ${top5.map((item, idx) => {
          const rankBadge = idx === 0 ? '🥇' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : `#${idx + 1}`));
          const shortName = formatConcejoShortName(item.concejo.name);
          const percentWidth = Math.min(100, Math.max(8, Math.round((item.day.rainMm / maxRainInTop) * 100)));
          const isSelected = activeConcejoId === item.concejo.id;

          return `
            <div class="radar-rain-item" data-concejo-id="${item.concejo.id}" style="
              background: ${isSelected ? 'rgba(56, 189, 248, 0.14)' : 'rgba(0,0,0,0.22)'};
              border: 1px solid ${isSelected ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255,255,255,0.06)'};
              border-radius: 10px;
              padding: 9px 10px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 8px;
              cursor: pointer;
              transition: transform 0.15s, background 0.15s;
              box-sizing: border-box;
              min-width: 0;
            ">
              <!-- Columna Izquierda (Identidad): Nombre arriba y Comarca+Barra abajo -->
              <div style="min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 3px;">
                <div style="display: flex; align-items: center; gap: 6px; min-width: 0;">
                  <span style="font-size: 0.95rem; line-height: 1; flex-shrink: 0; min-width: 20px; text-align: center;">${rankBadge}</span>
                  <strong style="font-size: 0.86rem; font-weight: 800; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;">
                    ${shortName}
                  </strong>
                </div>
                <div style="display: flex; align-items: center; gap: 6px; min-width: 0; padding-left: 2px;">
                  <span style="font-size: 0.68rem; color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px;">
                    ${item.concejo.region || ''}
                  </span>
                  <!-- Barra de intensidad de lluvia -->
                  <div style="flex: 1; max-width: 60px; height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden;">
                    <div style="width: ${percentWidth}%; height: 100%; background: ${item.day.badge.color}; border-radius: 2px;"></div>
                  </div>
                </div>
              </div>

              <!-- Columna Derecha (Datos): Litros+Insignia arriba y Probabilidad abajo -->
              <div style="display: flex; flex-direction: column; align-items: flex-end; justify-content: center; gap: 2px; flex-shrink: 0;">
                <div style="display: flex; align-items: center; gap: 5px;">
                  <strong style="font-size: 0.88rem; font-weight: 800; color: ${item.day.badge.color}; white-space: nowrap;">
                    ${item.day.rainMm} mm
                  </strong>
                  <span style="font-size: 0.66rem; font-weight: 700; padding: 2px 6px; border-radius: 6px; background: ${item.day.badge.bg}; color: ${item.day.badge.color}; border: 1px solid ${item.day.badge.color}40; white-space: nowrap;">
                    ${item.day.badge.label}
                  </span>
                </div>
                <span style="font-size: 0.66rem; color: var(--text-dim); font-weight: 600;">
                  ${item.day.pop}% prob.
                </span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Botón de apertura de ventana emergente completa -->
      <button type="button" id="btn-open-radar-rain-modal" style="
        width: 100%;
        min-height: 42px;
        background: rgba(56, 189, 248, 0.12);
        border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 11px;
        color: var(--text-main);
        font-size: 0.80rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: background 0.2s;
        box-sizing: border-box;
      ">
        <span>📋</span> <span>Ver ranking completo de concejos (82)</span> <span style="color: #38bdf8;">➔</span>
      </button>
    </div>
  `;
}

/**
 * Renderiza el modal emergente con los 82 concejos completos
 */
export function renderRadarRankingModalHtml(rainMap, selectedDayIndex = 0, selectedOrder = 'dry', activeConcejoId = null) {
  const sortedList = getSortedConcejos(rainMap, selectedDayIndex, selectedOrder);
  const dayInfo = getDayInfo(selectedDayIndex);
  const orderTitle = selectedOrder === 'dry' ? 'Menor probabilidad de lluvia' : 'Mayor probabilidad de lluvia';

  return `
    <div id="radar-concejos-modal" class="modal-backdrop" style="display: none; position: fixed; inset: 0; z-index: 10000; background: rgba(0,0,0,0.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); align-items: flex-end; justify-content: center; padding: 0;">
      <div class="modal-sheet" style="
        background: #111827;
        border: 1px solid rgba(255,255,255,0.15);
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        width: 100%;
        max-width: 650px;
        max-height: 85vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 -10px 30px rgba(0,0,0,0.6);
        box-sizing: border-box;
      ">
        <!-- Cabecera del Modal (Ley 11) -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); box-sizing: border-box;">
          <div style="min-width: 0;">
            <h3 style="margin: 0; font-size: 1.0rem; font-weight: 800; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
              <span>🌧️</span> <span>Ranking de Lluvia en Asturias</span>
            </h3>
            <span style="font-size: 0.72rem; color: var(--text-dim); display: block; margin-top: 1px;">
              ${dayInfo.fullLabel} • ${orderTitle}
            </span>
          </div>
          <button type="button" id="btn-close-radar-rain-modal" aria-label="Cerrar modal" style="
            background: rgba(255,255,255,0.08);
            border: none;
            color: var(--text-main);
            width: 34px;
            height: 34px;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          ">✕</button>
        </div>

        <!-- Buscador en tiempo real dentro del modal -->
        <div style="padding: 10px 16px 6px 16px; box-sizing: border-box;">
          <input type="search" id="radar-rain-search-input" placeholder="🔍 Filtrar concejo (ej. Castrillón, Llanes...)" style="
            width: 100%;
            box-sizing: border-box;
            background: rgba(0,0,0,0.35);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 10px;
            padding: 9px 12px;
            color: var(--text-main);
            font-size: 0.84rem;
            outline: none;
          ">
        </div>

        <!-- Lista scrollable con los 82 concejos en 2 niveles anti-desborde -->
        <div id="radar-rain-modal-list" style="
          padding: 6px 16px 20px 16px;
          overflow-y: auto;
          flex: 1;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-sizing: border-box;
        ">
          ${sortedList.map((item, idx) => {
            const shortName = formatConcejoShortName(item.concejo.name);
            const isSelected = activeConcejoId === item.concejo.id;

            return `
              <div class="radar-rain-modal-item" data-concejo-id="${item.concejo.id}" data-name="${shortName.toLowerCase()}" style="
                background: ${isSelected ? 'rgba(56, 189, 248, 0.14)' : 'rgba(255,255,255,0.04)'};
                border: 1px solid ${isSelected ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255,255,255,0.06)'};
                border-radius: 9px;
                padding: 9px 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                cursor: pointer;
                transition: background 0.15s;
                box-sizing: border-box;
                min-width: 0;
              ">
                <!-- Columna Izquierda -->
                <div style="min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 2px;">
                  <div style="display: flex; align-items: center; gap: 6px; min-width: 0;">
                    <span style="font-size: 0.76rem; font-weight: 800; min-width: 24px; color: var(--text-dim); text-align: center;">
                      #${idx + 1}
                    </span>
                    <strong style="font-size: 0.84rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;">
                      ${shortName}
                    </strong>
                  </div>
                  <span style="font-size: 0.68rem; color: var(--text-dim); padding-left: 30px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${item.concejo.region || ''}
                  </span>
                </div>

                <!-- Columna Derecha -->
                <div style="display: flex; flex-direction: column; align-items: flex-end; justify-content: center; gap: 2px; flex-shrink: 0;">
                  <div style="display: flex; align-items: center; gap: 5px;">
                    <strong style="font-size: 0.84rem; font-weight: 800; color: ${item.day.badge.color}; white-space: nowrap;">
                      ${item.day.rainMm} mm
                    </strong>
                    <span style="font-size: 0.66rem; font-weight: 700; padding: 2px 6px; border-radius: 6px; background: ${item.day.badge.bg}; color: ${item.day.badge.color}; border: 1px solid ${item.day.badge.color}40; white-space: nowrap;">
                      ${item.day.badge.label}
                    </span>
                  </div>
                  <span style="font-size: 0.66rem; color: var(--text-dim); font-weight: 600;">
                    ${item.day.pop}% prob.
                  </span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}
