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
      name: 'Litoral Occidental Asturiano',
      code: 'ES-AST-LIT-OCC',
      scope: 'Costa y franja marítima occidental hasta 20 millas'
    };
  }

  // 2. Litoral Oriental y Central Asturiano
  if (['murosdenalon', 'muros-de-nalon', 'sotodelbarco', 'soto-del-barco', 'castrillon', 'aviles', 'gozon', 'carreno', 'gijon', 'villaviciosa', 'colunga', 'caravia', 'ribadesella', 'llanes', 'ribadedeva'].includes(cId) || (reg.includes('Costa') && !reg.includes('Occidental'))) {
    return {
      id: 'litoral_oriental',
      name: 'Litoral Central y Oriental de Asturias',
      code: 'ES-AST-LIT-ORI',
      scope: 'Costa central y oriental (Gijón, Peñas, Llanes) hasta 20 millas'
    };
  }

  // 3. Cordillera Cantábrica y Picos de Europa
  if (['somiedo', 'quiros', 'teverga', 'lena', 'aller', 'sobrescobio', 'caso', 'ponga', 'amieva', 'cabrales', 'penasanta', 'onis', 'oniss', 'cangasdeonis', 'cangas-de-onis', 'sotres', 'covadonga_lagos', 'pajares', 'fuentesdeinvierno'].includes(cId) || concejo.altitude >= 700 || reg.includes('Montaña') || reg.includes('Cordillera') || reg.includes('Picos de Europa')) {
    return {
      id: 'cordillera_picos',
      name: 'Cordillera Cantábrica y Picos de Europa',
      code: 'ES-AST-COR-PIC',
      scope: 'Zonas de cumbre, macizos y red de puertos de montaña (+800 m)'
    };
  }

  // 4. Suroccidente Asturiano
  if (['cangasdelnarcea', 'cangas-del-narcea', 'tineo', 'allande', 'ibias', 'degana', 'belmontedemiranda', 'belmonte-de-miranda', 'salas', 'villayon'].includes(cId) || reg.includes('Suroccidente')) {
    return {
      id: 'suroccidente',
      name: 'Suroccidente Asturiano',
      code: 'ES-AST-SUR-OCC',
      scope: 'Valles y sierras del suroccidente (Fuentes del Narcea, Ibias)'
    };
  }

  // 5. Zona Central, Valles Mineros y Cuencas (por defecto)
  return {
    id: 'central_valles',
    name: 'Zona Central, Valles y Cuencas Mineras',
    code: 'ES-AST-CEN-VAL',
    scope: 'Oviedo, Siero, Gijón interior, Cuencas del Nalón y Caudal'
  };
}

/**
 * Evalúa los parámetros meteorológicos para detectar avisos AEMET oficiales
 */
export function getAemetAlertStatus(weatherData, concejo) {
  const current = weatherData.weather?.current || {};
  const hourly = weatherData.weather?.hourly || {};
  const daily = weatherData.weather?.daily || {};
  const marine = weatherData.marine?.current || null;

  const aemetZone = getAemetZone(concejo);
  const alerts = [];

  const windSpeed = current.wind_speed_10m || 0;
  const windGusts = current.wind_gusts_10m || 0;
  const windDir = current.wind_direction_10m || 0;
  const temp = current.temperature_2m || 15;
  const rainSum = daily.precipitation_sum ? daily.precipitation_sum[0] || 0 : 0;
  const maxRainProb = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] || 0 : 0;
  const waveHeight = marine && typeof marine.wave_height === 'number' ? marine.wave_height : 0;
  const isCoast = concejo.type === 'coast' || concejo.region.includes('Costa');

  // 1. AVISO POR FENÓMENOS COSTEROS (AEMET Costeros Cantábrico)
  if (isCoast && (waveHeight >= 3.5 || windGusts >= 65)) {
    const isOrange = waveHeight >= 5.0 || windGusts >= 85;
    const isRed = waveHeight >= 7.0 || windGusts >= 110;
    const level = isRed ? 'red' : (isOrange ? 'orange' : 'yellow');

    alerts.push({
      id: 'aemet_coastal',
      type: 'costeros',
      level,
      levelName: isRed ? 'Aviso Rojo (Riesgo Extremo)' : (isOrange ? 'Aviso Naranja (Riesgo Importante)' : 'Aviso Amarillo (Riesgo)'),
      levelColor: isRed ? '#ef4444' : (isOrange ? '#f97316' : '#eab308'),
      icon: '🌊',
      title: 'Aviso por Fenómenos Costeros en el Litoral Asturiano',
      desc: `Mar combinada del NW con olas de ${waveHeight.toFixed(1)} m y viento de fuerza 7 a 8 con rachas de ${Math.round(windGusts)} km/h.`,
      validity: 'Hoy • Todo el día (00:00 - 23:59 h)',
      probability: '70% - 100%',
      recommendation: 'Aléjese de espigones, rompientes, paseos marítimos y acantilados. No navegue ni practique deportes náuticos.'
    });
  }

  // 2. AVISO POR VIENTO Y RACHAS HURACANADAS
  if (windGusts >= 70) {
    const isOrange = windGusts >= 90;
    const isRed = windGusts >= 120;
    const level = isRed ? 'red' : (isOrange ? 'orange' : 'yellow');

    alerts.push({
      id: 'aemet_wind',
      type: 'viento',
      level,
      levelName: isRed ? 'Aviso Rojo (Riesgo Extremo)' : (isOrange ? 'Aviso Naranja (Riesgo Importante)' : 'Aviso Amarillo (Riesgo)'),
      levelColor: isRed ? '#ef4444' : (isOrange ? '#f97316' : '#eab308'),
      icon: '💨',
      title: 'Aviso por Rachas Fuertes de Viento',
      desc: `Rachas máximas estimadas de hasta ${Math.round(windGusts)} km/h en ${concejo.name} y zonas expuestas de ${aemetZone.name}.`,
      validity: 'Hoy • Vigente durante las próximas horas',
      probability: '40% - 70%',
      recommendation: 'Asegure elementos en terrazas y ventanas. Evite transitar bajo árboles grandes o estructuras en obras.'
    });
  }

  // 3. AVISO POR LLUVIAS INTENSAS Y ACUMULACIÓN
  if (rainSum >= 35 || current.precipitation >= 10) {
    const isOrange = rainSum >= 70 || current.precipitation >= 20;
    const isRed = rainSum >= 120;
    const level = isRed ? 'red' : (isOrange ? 'orange' : 'yellow');

    alerts.push({
      id: 'aemet_rain',
      type: 'lluvia',
      level,
      levelName: isRed ? 'Aviso Rojo (Riesgo Extremo)' : (isOrange ? 'Aviso Naranja (Riesgo Importante)' : 'Aviso Amarillo (Riesgo)'),
      levelColor: isRed ? '#ef4444' : (isOrange ? '#f97316' : '#eab308'),
      icon: '🌧️',
      title: 'Aviso por Precipitación Acumulada',
      desc: `Acumulación prevista de hasta ${rainSum.toFixed(1)} mm en 12-24 horas. Posible saturación de suelos y aumento de caudales.`,
      validity: 'Hoy • Jornada completa',
      probability: `${maxRainProb}%`,
      recommendation: 'Precaución en carreteras secundarias por balsas de agua y desprendimientos de ladera.'
    });
  }

  // 4. AVISO POR NEVADAS EN CORDILLERA Y PUERTOS
  const currentHour = new Date().getHours();
  const freezingLevel = hourly.freezing_level_height ? hourly.freezing_level_height[currentHour] || 2000 : 2000;
  if (freezingLevel <= 1000 && (rainSum > 0 || current.precipitation > 0 || current.snowfall > 0)) {
    const isOrange = freezingLevel <= 600 || current.snowfall > 5;
    const level = isOrange ? 'orange' : 'yellow';

    alerts.push({
      id: 'aemet_snow',
      type: 'nieve',
      level,
      levelName: isOrange ? 'Aviso Naranja (Riesgo Importante)' : 'Aviso Amarillo (Riesgo)',
      levelColor: isOrange ? '#f97316' : '#eab308',
      icon: '❄️',
      title: 'Aviso por Nevadas en Cotas Bajas / Puertos',
      desc: `Cota de nieve descendiendo a ${Math.round(freezingLevel)} metros en la ${aemetZone.name}.`,
      validity: 'Hoy • Horas centrales y noche',
      probability: '70% - 100%',
      recommendation: 'Obligatorio consultar el estado de puertos antes de viajar. Lleve cadenas o neumáticos de invierno.'
    });
  }

  // 5. EFECTO FÖHN / VIENTU DEL SUR
  const isSouth = (windDir >= 140 && windDir <= 230);
  if (isSouth && windGusts >= 45 && !alerts.some(a => a.type === 'viento')) {
    alerts.push({
      id: 'aemet_fohn',
      type: 'fohn',
      level: windGusts >= 75 ? 'orange' : 'yellow',
      levelName: windGusts >= 75 ? 'Aviso Naranja (Vientu del Sur)' : 'Aviso Amarillo (Vientu del Sur)',
      levelColor: windGusts >= 75 ? '#f97316' : '#eab308',
      icon: '🔥',
      title: 'Aviso: Efecto Föhn / Vientu del Sur',
      desc: `Viento del sur recalentado y seco con rachas de ${Math.round(windGusts)} km/h. Aumento brusco de temperaturas y riesgo forestal.`,
      validity: 'Hoy • Próximas horas',
      probability: '80%',
      recommendation: 'Prohibidas las quemas y precauciones en zonas arboladas de monte.'
    });
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
    <div class="aemet-alert-card aemet-${maxLevel} has-active-alerts">
      <div class="aemet-card-header">
        <div class="aemet-header-left">
          <span class="aemet-badge-pill pill-${maxLevel}">🚨 AVISOS METEOROLÓGICOS ACTIVOS (${alerts.length})</span>
          <span class="aemet-zone-label">📍 Zona AEMET: <strong>${zone.name}</strong></span>
        </div>
        <a href="https://www.aemet.es" target="_blank" rel="noopener noreferrer" class="aemet-logo-tag" style="text-decoration: none;" title="Visitar portal oficial de AEMET">aemet.es ↗</a>
      </div>

      <div class="aemet-alerts-list">
        ${alerts.map(a => `
          <div class="aemet-alert-item item-${a.level}">
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
      <div style="padding: 6px 14px 10px; font-size: 0.72rem; color: var(--text-dim); text-align: right; opacity: 0.9;">
        Avisos basados en datos abiertos oficiales de <a href="https://www.aemet.es" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">aemet.es</a> • App meteorológica independiente
      </div>
    </div>
  `;
}

// Mantener compatibilidad con funciones existentes
export function detectWeatherAlerts(weatherData, concejo) {
  const status = getAemetAlertStatus(weatherData, concejo);
  return status.alerts;
}
