/**
 * Motor Oficial de Alertas Meteorológicas AEMET / MeteoAstur para Asturias
 */

/**
 * Determina la comarca oficial de avisos de AEMET para cada concejo de Asturias
 */
export function getAemetZone(concejo) {
  const cId = concejo.id;
  const reg = concejo.region || '';

  // 1. Litoral Occidental Asturiano
  if (['castropol', 'tapiadecasariego', 'tapia-de-casariego', 'elfranco', 'el-franco', 'coana', 'navia', 'valdes', 'cudillero'].includes(cId) || (reg.includes('Costa') && (reg.includes('Occidental') || reg.includes('Noroccidental')))) {
    return {
      id: 'litoral_occidental',
      aemetCode: '633301',
      name: 'Litoral Occidental Asturiano',
      code: 'ES-AST-LIT-OCC',
      scope: 'Costa y franja marítima occidental hasta 20 millas'
    };
  }

  // 2. Litoral Oriental y Central Asturiano
  if (['murosdenalon', 'muros-de-nalon', 'sotodelbarco', 'soto-del-barco', 'castrillon', 'aviles', 'gozon', 'carreno', 'gijon', 'villaviciosa', 'colunga', 'caravia', 'ribadesella', 'llanes', 'ribadedeva'].includes(cId) || (reg.includes('Costa') && !reg.includes('Occidental'))) {
    return {
      id: 'litoral_oriental',
      aemetCode: '633302',
      name: 'Litoral Central y Oriental de Asturias',
      code: 'ES-AST-LIT-ORI',
      scope: 'Costa central y oriental (Gijón, Peñas, Llanes) hasta 20 millas'
    };
  }

  // 3. Cordillera Cantábrica y Picos de Europa
  if (['somiedo', 'quiros', 'teverga', 'lena', 'aller', 'sobrescobio', 'caso', 'ponga', 'amieva', 'cabrales', 'penasanta', 'onis', 'oniss', 'cangasdeonis', 'cangas-de-onis', 'sotres', 'covadonga_lagos', 'pajares', 'fuentesdeinvierno'].includes(cId) || concejo.altitude >= 700 || reg.includes('Montaña') || reg.includes('Cordillera') || reg.includes('Picos de Europa')) {
    return {
      id: 'cordillera_picos',
      aemetCode: '633305',
      name: 'Cordillera Cantábrica y Picos de Europa',
      code: 'ES-AST-COR-PIC',
      scope: 'Zonas de cumbre, macizos y red de puertos de montaña (+800 m)'
    };
  }

  // 4. Suroccidente Asturiano
  if (['cangasdelnarcea', 'cangas-del-narcea', 'tineo', 'allande', 'ibias', 'degana', 'belmontedemiranda', 'belmonte-de-miranda', 'salas', 'villayon'].includes(cId) || reg.includes('Suroccidente')) {
    return {
      id: 'suroccidente',
      aemetCode: '633303',
      name: 'Suroccidente Asturiano',
      code: 'ES-AST-SUR-OCC',
      scope: 'Valles y sierras del suroccidente (Fuentes del Narcea, Ibias)'
    };
  }

  // 5. Zona Central, Valles Mineros y Cuencas (por defecto)
  return {
    id: 'central_valles',
    aemetCode: '633304',
    name: 'Zona Central, Valles y Cuencas Mineras',
    code: 'ES-AST-CEN-VAL',
    scope: 'Oviedo, Siero, Gijón interior, Cuencas del Nalón y Caudal'
  };
}

export const ALLOW_SIMULATION = false; // Desconectado formalmente tras visto bueno de Lendo (Ley 12)

/**
 * Evalúa los parámetros meteorológicos para detectar avisos AEMET oficiales
 * Visión dual: evalúa simultáneamente el tiempo en vivo y la previsión máxima de la jornada (Ley Específica 12.10)
 */
export function getAemetAlertStatus(weatherData, concejo) {
  const aemetZone = getAemetZone(concejo);
  let alerts = [];

  // 1. Simulacro de prueba controlado (Doctrina Constitucional 12)
  if (ALLOW_SIMULATION && typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const testMode = urlParams.get('test');
    if (testMode === 'aemet_viento' || testMode === 'viaductos' || testMode === 'viento_viaductos') {
      alerts.push({
        id: 'aemet_wind_sim',
        type: 'viento',
        level: 'yellow',
        levelName: 'Aviso Amarillo (Riesgo)',
        levelColor: '#eab308',
        icon: '💨',
        title: 'Aviso por Rachas Fuertes de Viento',
        desc: `Simulacro: Rachas máximas previstas de hasta 74 km/h en ${concejo.name} y zonas expuestas de ${aemetZone.name} (racha actual en calma: 24 km/h).`,
        validity: 'Hoy • Pico máx. previsto hacia las 17:00 h',
        probability: '40% - 70%',
        recommendation: 'Asegure elementos en terrazas y ventanas. Evite transitar bajo árboles grandes o estructuras en obras. Máxima precaución al volante.'
      });
    } else if (testMode === 'viaductos_severo' || testMode === 'temporal_viaductos' || testMode === 'viento_severo') {
      alerts.push({
        id: 'aemet_wind_sim_severe',
        type: 'viento',
        level: 'orange',
        levelName: 'Aviso Naranja (Riesgo Importante)',
        levelColor: '#f97316',
        icon: '💨',
        title: 'Aviso por Rachas Muy Fuertes de Viento',
        desc: `Simulacro: Temporal severo con rachas estimadas de hasta 94 km/h en ${concejo.name} y cotas altas de ${aemetZone.name}.`,
        validity: 'Hoy • Horas centrales y tarde (15:00 - 21:00 h)',
        probability: '70% - 90%',
        recommendation: 'Extreme la precaución en carretera y viaductos expuestos. Evite actividades al aire libre.'
      });
    }
  }

  // 2. Avisos Oficiales (MeteoAlarm) si existen y se han descargado
  let usingOfficialAemet = false;
  if (weatherData.aemetAlerts && weatherData.aemetAlerts.zones && weatherData.aemetAlerts.zones[aemetZone.aemetCode]) {
    const officialAlerts = weatherData.aemetAlerts.zones[aemetZone.aemetCode].alerts;
    
    if (officialAlerts && officialAlerts.length > 0) {
      usingOfficialAemet = true;
      
      const typeIcons = {
        'wind': '💨',
        'rain': '🌧️',
        'snow': '❄️',
        'coastal': '🌊',
        'temperature': '🌡️',
        'thunderstorm': '⛈️',
        'fog': '🌫️',
        'forest-fire': '🔥'
      };
      
      const levelNames = {
        'yellow': 'Aviso Amarillo (Riesgo)',
        'orange': 'Aviso Naranja (Riesgo Importante)',
        'red': 'Aviso Rojo (Riesgo Extremo)'
      };
      
      const levelColors = {
        'yellow': '#eab308',
        'orange': '#f97316',
        'red': '#ef4444'
      };

      officialAlerts.forEach(a => {
        let title = a.headline || `Aviso por ${a.type}`;
        
        alerts.push({
          id: a.id,
          type: a.type,
          level: a.level,
          levelName: levelNames[a.level] || 'Aviso AEMET',
          levelColor: levelColors[a.level] || '#eab308',
          icon: typeIcons[a.type] || '⚠️',
          title: title,
          desc: a.description || 'Consulta los detalles en aemet.es',
          validity: `Hasta ${new Date(a.expires).toLocaleString('es-ES', {weekday: 'short', hour: '2-digit', minute:'2-digit'})}`,
          probability: 'Oficial',
          recommendation: a.instruction || 'Siga los consejos de las autoridades.'
        });
      });
    } else {
      // MeteoAlarm devolvió explícitamente 0 alertas para esta zona.
      usingOfficialAemet = true; 
    }
  }

  // 3. Fallback: Cálculos Locales si MeteoAlarm falla
  if (!usingOfficialAemet && alerts.length === 0) {
    const current = weatherData.weather?.current || {};
    const hourly = weatherData.weather?.hourly || {};
    const daily = weatherData.weather?.daily || {};
    const marine = weatherData.marine?.current || null;
    const marineHourly = weatherData.marine?.hourly || null;

    const windSpeed = current.wind_speed_10m || 0;
    const windGustsCurrent = Math.round(current.wind_gusts_10m != null ? current.wind_gusts_10m : windSpeed);
    const windGustsDailyMax = Math.round((daily.wind_gusts_10m_max && daily.wind_gusts_10m_max[0] != null) ? daily.wind_gusts_10m_max[0] : windGustsCurrent);

    let peakGustHourly = 0;
    let peakHourStr = '';
    if (hourly && Array.isArray(hourly.wind_gusts_10m) && Array.isArray(hourly.time)) {
      for (let i = 0; i < Math.min(hourly.wind_gusts_10m.length, 24); i++) {
        const g = typeof hourly.wind_gusts_10m[i] === 'number' ? Math.round(hourly.wind_gusts_10m[i]) : 0;
        if (g > peakGustHourly) {
          peakGustHourly = g;
          if (hourly.time[i]) {
            const d = new Date(hourly.time[i]);
            peakHourStr = `${String(d.getHours()).padStart(2, '0')}:00 h`;
          }
        }
      }
    }

    const evaluatedWindGusts = Math.max(windGustsCurrent, windGustsDailyMax, peakGustHourly);
    const windDir = current.wind_direction_10m || 0;
    const rainSum = daily.precipitation_sum ? daily.precipitation_sum[0] || 0 : 0;
    const maxRainProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] || 0 : 0;
    
    const currentWaveHeight = marine && typeof marine.wave_height === 'number' ? marine.wave_height : 0;
    let maxWaveToday = currentWaveHeight;
    if (marineHourly && Array.isArray(marineHourly.wave_height)) {
      for (let i = 0; i < Math.min(marineHourly.wave_height.length, 24); i++) {
        const wh = typeof marineHourly.wave_height[i] === 'number' ? marineHourly.wave_height[i] : 0;
        if (wh > maxWaveToday) maxWaveToday = wh;
      }
    }
    const isCoast = concejo.type === 'coast' || concejo.region.includes('Costa');

    if (isCoast && (maxWaveToday >= 3.5 || evaluatedWindGusts >= 65)) {
      const isOrange = maxWaveToday >= 5.0 || evaluatedWindGusts >= 85;
      const isRed = maxWaveToday >= 7.0 || evaluatedWindGusts >= 110;
      const level = isRed ? 'red' : (isOrange ? 'orange' : 'yellow');
      const waveDesc = (maxWaveToday > currentWaveHeight + 0.4)
        ? `Mar combinada del NW con olas de ${currentWaveHeight.toFixed(1)} m aumentando hasta ${maxWaveToday.toFixed(1)} m hoy`
        : `Mar combinada del NW con olas de hasta ${maxWaveToday.toFixed(1)} m`;
      alerts.push({
        id: 'aemet_coastal', type: 'costeros', level,
        levelName: isRed ? 'Aviso Rojo (Riesgo Extremo)' : (isOrange ? 'Aviso Naranja (Riesgo Importante)' : 'Aviso Amarillo (Riesgo)'),
        levelColor: isRed ? '#ef4444' : (isOrange ? '#f97316' : '#eab308'), icon: '🌊',
        title: 'Aviso Local Estimado: Fenómenos Costeros',
        desc: `${waveDesc} y viento con rachas de hasta ${evaluatedWindGusts} km/h en la costa.`,
        validity: 'Hoy', probability: 'Local Estimado',
        recommendation: 'Aléjese de espigones y acantilados.'
      });
    }

    if (evaluatedWindGusts >= 70) {
      const isOrange = evaluatedWindGusts >= 90;
      const isRed = evaluatedWindGusts >= 120;
      const level = isRed ? 'red' : (isOrange ? 'orange' : 'yellow');
      const isCurrentActive = windGustsCurrent >= 70;
      const windDesc = isCurrentActive
        ? `Rachas intensas registradas de ${windGustsCurrent} km/h alcanzando hasta ${evaluatedWindGusts} km/h.`
        : `Rachas máximas previstas de hasta ${evaluatedWindGusts} km/h (racha actual en calma).`;
      alerts.push({
        id: 'aemet_wind', type: 'viento', level,
        levelName: isRed ? 'Aviso Rojo (Riesgo Extremo)' : (isOrange ? 'Aviso Naranja (Riesgo Importante)' : 'Aviso Amarillo (Riesgo)'),
        levelColor: isRed ? '#ef4444' : (isOrange ? '#f97316' : '#eab308'), icon: '💨',
        title: 'Aviso Local Estimado: Rachas Fuertes',
        desc: windDesc, validity: 'Hoy', probability: 'Local Estimado',
        recommendation: 'Precaución en exteriores y al volante.'
      });
    }

    if (rainSum >= 35 || current.precipitation >= 10) {
      const isOrange = rainSum >= 70 || current.precipitation >= 20;
      const isRed = rainSum >= 120;
      const level = isRed ? 'red' : (isOrange ? 'orange' : 'yellow');
      alerts.push({
        id: 'aemet_rain', type: 'lluvia', level,
        levelName: isRed ? 'Aviso Rojo (Riesgo Extremo)' : (isOrange ? 'Aviso Naranja (Riesgo Importante)' : 'Aviso Amarillo (Riesgo)'),
        levelColor: isRed ? '#ef4444' : (isOrange ? '#f97316' : '#eab308'), icon: '🌧️',
        title: 'Aviso Local Estimado: Lluvias Intensas',
        desc: `Acumulación prevista de hasta ${rainSum.toFixed(1)} mm.`,
        validity: 'Hoy', probability: 'Local Estimado',
        recommendation: 'Precaución en carreteras y cauces.'
      });
    }
  }

  // Determinar nivel máximo
  let maxLevel = 'green';
  if (alerts.some(a => a.level === 'red')) maxLevel = 'red';
  else if (alerts.some(a => a.level === 'orange')) maxLevel = 'orange';
  else if (alerts.some(a => a.level === 'yellow')) maxLevel = 'yellow';

  return {
    hasAlerts: alerts.length > 0,
    maxLevel,
    zone: aemetZone,
    alerts
  };
}

/**
 * Renderiza la tarjeta visual de Alertas AEMET en Estación en Vivo
 */
export function renderAemetAlertCard(alertStatus, concejo) {
  const { hasAlerts, maxLevel, zone, alerts } = alertStatus;

  if (!hasAlerts) {
    return `
      <div class="aemet-alert-card aemet-green">
        <div class="aemet-card-header">
          <div class="aemet-header-left">
            <span class="aemet-badge-pill pill-green">🟢 SIN AVISOS ACTIVOS</span>
            <span class="aemet-zone-label">📍 Zona AEMET: <strong>${zone.name}</strong></span>
          </div>
          <a href="https://www.aemet.es" target="_blank" rel="noopener noreferrer" class="aemet-logo-tag" style="text-decoration: none;" title="Visitar portal oficial de AEMET">aemet.es ↗</a>
        </div>
        <div class="aemet-body-calm">
          <span class="calm-icon">🌤️</span>
          <div class="calm-text">
            <strong>Situación en calma:</strong> No hay avisos meteorológicos adversos vigentes hoy para ${concejo.name}. Condiciones normales según umbrales de <a href="https://www.aemet.es" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">AEMET</a>.
          </div>
        </div>
        <div style="padding: 4px 14px 8px; font-size: 0.70rem; color: var(--text-dim); text-align: right; opacity: 0.85;">
          Fuente oficial de avisos: <a href="https://www.aemet.es" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">aemet.es</a> • App independiente no gubernamental
        </div>
      </div>
    `;
  }

  // Si hay alertas activas
  return `
    <div class="aemet-alert-card aemet-${maxLevel} has-active-alerts collapsed" onclick="this.classList.toggle('collapsed')">
      <div class="aemet-card-header">
        <div class="aemet-header-left">
          <span class="aemet-badge-pill pill-${maxLevel}">🚨 AVISOS METEOROLÓGICOS ACTIVOS (${alerts.length})</span>
          <span class="aemet-zone-label">📍 Zona AEMET: <strong>${zone.name}</strong></span>
        </div>
        <div class="aemet-header-right" style="display: flex; align-items: center; gap: 8px;">
          <a href="https://www.aemet.es" target="_blank" rel="noopener noreferrer" class="aemet-logo-tag" style="text-decoration: none;" title="Visitar portal oficial de AEMET" onclick="event.stopPropagation()">aemet.es ↗</a>
          <span class="aemet-chevron" style="color: inherit; opacity: 0.7; font-size: 0.85rem; transition: transform 0.3s ease;">▼</span>
        </div>
      </div>

      <div class="aemet-collapsible-content">
        <div class="aemet-alerts-list">
          ${alerts.map(a => `
            <div class="aemet-alert-item item-${a.level}" onclick="event.stopPropagation()">
              <div class="alert-item-top">
                <div class="alert-item-title-wrap">
                  <span class="alert-item-icon">${a.icon}</span>
                  <div>
                    <h4 class="alert-item-title">${a.title}</h4>
                    <span class="alert-item-level-tag" style="color: ${a.levelColor}; border-color: ${a.levelColor}60; background: ${a.levelColor}18;">
                      ${a.levelName}
                    </span>
                  </div>
                </div>
              </div>

              <p class="alert-item-desc">${a.desc}</p>

              <div class="alert-item-meta-grid">
                <div class="alert-meta-box">
                  <span class="meta-label">⏰ Vigencia</span>
                  <span class="meta-value">${a.validity}</span>
                </div>
                <div class="alert-meta-box">
                  <span class="meta-label">🎯 Probabilidad</span>
                  <span class="meta-value">${a.probability}</span>
                </div>
              </div>

              <div class="alert-item-advice">
                <span class="advice-icon">⚠️</span>
                <span class="advice-text"><strong>Recomendación oficial:</strong> ${a.recommendation}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="padding: 6px 14px 10px; font-size: 0.72rem; color: var(--text-dim); text-align: right; opacity: 0.9;" onclick="event.stopPropagation()">
          Avisos basados en datos abiertos oficiales de <a href="https://www.aemet.es" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">aemet.es</a> • App meteorológica independiente
        </div>
      </div>
    </div>
  `;
}

// Mantener compatibilidad con funciones existentes
export function detectWeatherAlerts(weatherData, concejo) {
  const status = getAemetAlertStatus(weatherData, concejo);
  return status.alerts;
}
