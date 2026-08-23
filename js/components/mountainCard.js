/**
 * Red de puertos de montaña estratégicos de la Cordillera Cantábrica en Asturias
 */
export const PUERTOS_MONTANA_ASTURIAS = [
  { name: 'Puerto de Pajares (N-630)', alt: 1378, concejo: 'Lena' },
  { name: 'Puerto de San Isidro (AS-112)', alt: 1520, concejo: 'Aller' },
  { name: 'Puerto de Leitariegos (AS-213)', alt: 1525, concejo: 'Cangas del Narcea' },
  { name: 'Puerto de Somiedo (AS-227)', alt: 1486, concejo: 'Somiedo' },
  { name: 'Puerto de Tarna (AS-117)', alt: 1490, concejo: 'Caso' },
  { name: 'Puerto de Ventana (AS-228)', alt: 1587, concejo: 'Teverga' },
  { name: 'Alto de la Cobertoria (AS-230)', alt: 1173, concejo: 'Quirós / Lena' },
  { name: 'Lagos de Covadonga', alt: 1134, concejo: 'Cangas de Onís' }
];

/**
 * Estaciones de Esquí de Asturias
 */
export const ESTACIONES_ESQUI = [
  { name: 'Valgrande-Pajares', base: 1480, cumbre: 1890, pistas: '21.5 km', concejo: 'Lena' },
  { name: 'Fuentes de Invierno', base: 1500, cumbre: 1950, pistas: '8.7 km', concejo: 'Aller' }
];

/**
 * Renderiza el módulo de montaña, cota de nieve y puertos de la Cordillera Cantábrica
 */
export function renderMountainCard(data, concejo) {
  const current = data.weather.current;
  const hourly = data.weather.hourly;
  const daily = data.weather.daily;

  const currentHour = new Date().getHours();
  const freezingLevel = hourly.freezing_level_height ? Math.round(hourly.freezing_level_height[currentHour] || 1900) : 1900;
  const snowAccum = daily.snowfall_sum ? daily.snowfall_sum[0].toFixed(1) : '0.0';

  // Gradiente térmico vertical (~0.65°C cada 100m)
  const lapseRate = 0.0065;
  const temp1500m = (current.temperature_2m - (1500 - concejo.altitude) * lapseRate).toFixed(1);
  const temp2000m = (current.temperature_2m - (2000 - concejo.altitude) * lapseRate).toFixed(1);

  // Evaluar estado dinámico de los puertos de montaña según la cota de nieve
  const passesWithStatus = PUERTOS_MONTANA_ASTURIAS.map(p => {
    let status = 'Abierto';
    let statusClass = 'status-ok';
    let icon = '🟢';

    if (freezingLevel <= p.alt - 100 && parseFloat(snowAccum) > 5) {
      status = 'Cadenas Necesarias';
      statusClass = 'status-warning';
      icon = '⛓️';
    } else if (freezingLevel <= p.alt && (parseFloat(snowAccum) > 0 || current.precipitation > 0)) {
      status = 'Precaución (Nieve/Hielo)';
      statusClass = 'status-caution';
      icon = '🟡';
    }

    return { ...p, status, statusClass, icon };
  });

  return `
    <div class="mountain-card">
      <div class="section-title-wrap">
        <div>
          <h3 class="section-heading">🏔️ Cordillera Cantábrica, Puertos & Nieve</h3>
          <span class="section-subtitle">Monitoreo de alta montaña de Asturias • Picos de Europa y Cordillera</span>
        </div>
        <div class="altitude-pill">
          Altitud ${concejo.name}: <strong>${concejo.altitude} m</strong>
        </div>
      </div>

      <!-- GRID DE SENSORES DE ALTA MONTAÑA -->
      <div class="mountain-grid">
        <!-- 1. Cota de Nieve -->
        <div class="mountain-widget">
          <div class="m-label">Cota de Nieve (Nivel de Helada)</div>
          <div class="m-value">${freezingLevel} <span class="unit">m s.n.m.</span></div>
          <div class="m-detail">
            ${concejo.altitude >= freezingLevel ? '❄️ <strong>Nieve en la cota de la localidad</strong>' : 'Cota por encima de la altitud del concejo.'}
          </div>
        </div>

        <!-- 2. Nieve Acumulada Prevista -->
        <div class="mountain-widget">
          <div class="m-label">Nieve Prevista en Cumbres (Hoy)</div>
          <div class="m-value">${snowAccum} <span class="unit">cm</span></div>
          <div class="m-detail">Previsión en cotas superiores a 1.500 metros</div>
        </div>

        <!-- 3. Temperaturas en Altura -->
        <div class="mountain-widget">
          <div class="m-label">Temperaturas Estimadas en Cumbres</div>
          <div class="m-value">${temp1500m} <span class="unit">°C a 1.500m</span></div>
          <div class="m-detail">Cota 2.000m (Picos de Europa): <strong>${temp2000m}°C</strong></div>
        </div>

        <!-- 4. Estaciones Invernales -->
        <div class="mountain-widget highlight-widget">
          <div class="m-label">Estaciones de Esquí de Asturias</div>
          <div class="ski-resorts-list">
            ${ESTACIONES_ESQUI.map(r => `
              <div class="resort-item">
                <div class="resort-name">⛷️ ${r.name}</div>
                <div class="resort-data">Base: ${r.base}m • Cumbre: ${r.cumbre}m • ${r.pistas} dominio</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- ESTADO DE LA RED DE PUERTOS DE ASTURIAS -->
      <div class="mountain-passes-section">
        <h4 class="passes-title">🚗 Estado Estimado de Puertos de Montaña</h4>
        <div class="passes-grid">
          ${passesWithStatus.map(p => `
            <div class="pass-card ${p.statusClass}">
              <div class="pass-main">
                <span class="pass-name">${p.name}</span>
                <span class="pass-alt">Altitud: <strong>${p.alt} m</strong> • ${p.concejo}</span>
              </div>
              <div class="pass-badge">
                <span>${p.icon} ${p.status}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}