/**
 * METEOASTUR LODE - Asesor Inteligente de Colada y Secado de Ropa
 * Algoritmo asturiano de física de evaporación (Humedad, Viento, Radiación, Orpín)
 * Desarrollado por Manuel A. L. Barril y Princesa
 */

export function calculateLaundryDrying(currentOrData, hourly = null, daily = null) {
  let current = currentOrData || {};
  if (currentOrData && currentOrData.current) {
    hourly = currentOrData.hourly || hourly;
    daily = currentOrData.daily || daily;
    current = currentOrData.current;
  }

  const temp = current.temperature_2m ?? 15;
  const hum = current.relative_humidity_2m ?? 80;
  const wind = current.wind_speed_10m ?? 10;
  const gusts = current.wind_gusts_10m ?? wind;
  const precip = current.precipitation ?? 0;
  const isDay = current.is_day === 1;

  // Analizar próximas 4 horas en el pronóstico horario
  let maxNextPop = 0;
  let sumNextPrecip = 0;
  if (hourly && hourly.precipitation_probability) {
    const currentHour = new Date().getHours();
    const len = hourly.time ? hourly.time.length : hourly.precipitation_probability.length;
    const startIdx = hourly.time ? Math.min(currentHour, Math.max(0, len - 4)) : 0;
    for (let i = startIdx; i < Math.min(startIdx + 4, len); i++) {
      if (hourly.precipitation_probability[i] != null) {
        maxNextPop = Math.max(maxNextPop, hourly.precipitation_probability[i]);
      }
      if (hourly.precipitation && hourly.precipitation[i] != null) {
        sumNextPrecip += hourly.precipitation[i];
      }
    }
  }

  // 1. LLUVIA ACTIVA O INMINENTE (Peligro rojo)
  if (precip > 0 || (current.weather_code >= 51 && current.weather_code <= 67) || (current.weather_code >= 80 && current.weather_code <= 86)) {
    return {
      status: 'danger',
      icon: '🌧️',
      badgeClass: 'laundry-badge-danger',
      title: '¡Ni se te ocurra, que te va orpinar!',
      verdict: 'Lluvia o llovizna activa',
      advice: 'Déjala en el cesto o tiende dentro de casa. Fuera solo vas a conseguir que la ropa coja olor a humedad cantábrica.',
      dryingTime: 'No seca (se moja)',
      dryingScore: 5,
      factors: [
        { label: 'Lluvia', status: 'bad', text: `${precip.toFixed(1)} mm/h` },
        { label: 'Humedad', status: 'bad', text: `${hum}%` },
        { label: 'Viento', status: 'neutral', text: `${wind.toFixed(0)} km/h` }
      ]
    };
  }

  // 2. AMENAZA DE LLUVIA EN 4 HORAS (Peligro rojo)
  if (maxNextPop >= 50 || sumNextPrecip >= 0.3) {
    return {
      status: 'danger',
      icon: '☔',
      badgeClass: 'laundry-badge-danger',
      title: '¡Ojo que amenaza orpín!',
      verdict: 'Riesgo alto de lluvia próxima',
      advice: 'El cielo se está cerrando y caerán gotas en las próximas horas. No te arriesgues a tender sábanas al aire libre.',
      dryingTime: 'Riesgo alto de lluvia',
      dryingScore: 18,
      factors: [
        { label: 'Riesgo 4h', status: 'bad', text: `${maxNextPop}% prob.` },
        { label: 'Humedad', status: hum > 80 ? 'bad' : 'neutral', text: `${hum}%` },
        { label: 'Viento', status: 'neutral', text: `${wind.toFixed(0)} km/h` }
      ]
    };
  }

  // 3. VIENTO MUY FUERTE O RACHEADO (Peligro de vuelo / sujeción)
  if (gusts >= 42 || wind >= 32) {
    return {
      status: 'wind',
      icon: '💨',
      badgeClass: 'laundry-badge-wind',
      title: '¡Sujeta bien los calzones!',
      verdict: `Rachas fuertes de ${gusts.toFixed(0)} km/h`,
      advice: 'Secar va a secar como un tiro... pero pon cuatro pinzas por calcetín si no quieres ir a buscarlos al prao de abajo.',
      dryingTime: '~1 h 30 min (con pinzas dobles)',
      dryingScore: 78,
      factors: [
        { label: 'Sin lluvia', status: 'good', text: `${maxNextPop}% prob.` },
        { label: 'Humedad', status: hum < 65 ? 'good' : 'neutral', text: `${hum}%` },
        { label: 'Rachas', status: 'warn', text: `${gusts.toFixed(0)} km/h` }
      ]
    };
  }

  // 4. NOCHE HÚMEDA / SERENA CANTÁBRICA
  if (!isDay && hum >= 82) {
    return {
      status: 'warning',
      icon: '🌙',
      badgeClass: 'laundry-badge-warning',
      title: 'Cuidado con la serena nocturna',
      verdict: 'Humedad nocturna alta',
      advice: 'De noche en Asturias la serena y el rocío calan la ropa. Si no tienes tendal bajo alero o porche cerrado, mejor dentro.',
      dryingTime: 'Secado muy lento (> 8 h)',
      dryingScore: 35,
      factors: [
        { label: 'Sin lluvia', status: 'good', text: 'Seco' },
        { label: 'Humedad', status: 'bad', text: `${hum}%` },
        { label: 'Viento', status: 'neutral', text: `${wind.toFixed(0)} km/h` }
      ]
    };
  }

  // 5. DÍA DE SECADO EXPRÉS / FOEHN (Verde glorioso)
  if (hum <= 62 || (hum <= 70 && wind >= 15 && temp >= 18)) {
    return {
      status: 'optimal',
      icon: '🧺',
      badgeClass: 'laundry-badge-optimal',
      title: '¡Tiende con gloria!',
      verdict: 'Secado exprés asturiano',
      advice: 'Día de bandera. Con este aire y baja humedad la ropa secará antes de que termines de comer. ¡Aprovecha a lavar sábanas y mantas!',
      dryingTime: '~1 h 30 min - 2 horas',
      dryingScore: 95,
      factors: [
        { label: 'Cielo', status: 'good', text: '0% lluvia' },
        { label: 'Humedad', status: 'good', text: `${hum}%` },
        { label: 'Viento', status: 'good', text: `${wind.toFixed(0)} km/h` }
      ]
    };
  }

  // 6. BUENAS CONDICIONES DE SECADO (Verde normal)
  if (hum < 76 && maxNextPop < 35) {
    return {
      status: 'optimal',
      icon: '👕',
      badgeClass: 'laundry-badge-optimal',
      title: '¡Adelante, buen día para tender!',
      verdict: 'Condiciones favorables',
      advice: 'La temperatura y la brisa acompañan. La colada secará de forma continua y sin sobresaltos.',
      dryingTime: '~3 - 4 horas',
      dryingScore: 80,
      factors: [
        { label: 'Lluvia', status: 'good', text: `${maxNextPop}% prob.` },
        { label: 'Humedad', status: 'good', text: `${hum}%` },
        { label: 'Viento', status: 'good', text: `${wind.toFixed(0)} km/h` }
      ]
    };
  }

  // 7. HUMEDAD ELEVADA / AMBIENTE PESADO (Amarillo)
  return {
    status: 'warning',
    icon: '🧦',
    badgeClass: 'laundry-badge-warning',
    title: 'Tiende con ojo / Mejor a cubierto',
    verdict: `Ambiente húmedo (${hum}%)`,
    advice: 'El aire está cargado y no evapora bien. Secará a paso de tortuga. Si tienes alero o tendal cubierto, ponlo ahí; si no, paciencia.',
    dryingTime: '~6 - 8 horas',
    dryingScore: 48,
    factors: [
      { label: 'Riesgo 4h', status: maxNextPop > 30 ? 'warn' : 'good', text: `${maxNextPop}% prob.` },
      { label: 'Humedad', status: 'bad', text: `${hum}%` },
      { label: 'Viento', status: 'neutral', text: `${wind.toFixed(0)} km/h` }
    ]
  };
}

export function renderLaundryCard(laundry) {
  return `
    <div class="sensor-card laundry-sensor-card" id="sensor-card-laundry">
      <div class="sensor-header">
        <div class="sensor-header-left">
          <span class="sensor-icon">${laundry.icon}</span>
          <span class="sensor-title">Asesor de la Colada & Secado</span>
        </div>
        <button class="btn-explain-sensor" data-explain="laundry" title="¿Cómo funciona el índice de secado de ropa? Pulsa para aprender">💡 Explícame</button>
      </div>
      <div class="sensor-body laundry-sensor-body">
        <div class="laundry-title-row">
          <div class="laundry-badge ${laundry.badgeClass}">${laundry.title}</div>
        </div>
        <div class="sensor-sub laundry-verdict-sub"><strong>${laundry.verdict}</strong></div>
        
        <p class="laundry-advice-text">${laundry.advice}</p>

        <div class="laundry-meta-row">
          <div class="laundry-time-pill">
            <span class="laundry-time-icon">⏱️</span>
            <span>Secado: <strong>${laundry.dryingTime}</strong></span>
          </div>
          <div class="laundry-score-bar-wrapper" title="Índice de evaporación: ${laundry.dryingScore}/100">
            <div class="laundry-score-fill score-${laundry.status}" style="width: ${laundry.dryingScore}%;"></div>
          </div>
        </div>

        <div class="laundry-factors-strip">
          ${laundry.factors.map(f => `
            <span class="laundry-factor-pill factor-${f.status}">
              ${f.label}: <strong>${f.text}</strong>
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
