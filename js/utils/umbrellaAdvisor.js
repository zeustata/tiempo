/**
 * METEOASTUR LODE - Semáforu del Paragües (El Semáforo del Paraguas Asturiano)
 * Evalúa las próximas 6 a 8 horas para dar una recomendación inmediata, visual y práctica.
 * Se nutre de los datos ya armonizados por el Algoritmo de Consenso Cantábrico (Leyes 7 y 8).
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 */

export function calculateUmbrellaStatus(current, hourly) {
  if (!current || !hourly || !hourly.time) {
    return null;
  }

  const now = new Date();
  const currentHourStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:00`;

  let startIndex = 0;
  for (let i = 0; i < hourly.time.length; i++) {
    if (hourly.time[i] >= currentHourStr) {
      startIndex = i;
      break;
    }
  }

  const currentPrecip = current.precipitation != null ? parseFloat(current.precipitation) : 0;
  const currentCode = current.weather_code != null ? parseInt(current.weather_code, 10) : 0;
  const currentHum = current.relative_humidity_2m != null ? parseFloat(current.relative_humidity_2m) : null;
  const isDrizzleCode = (currentCode >= 51 && currentCode <= 57);
  const isFalseDrizzle = isDrizzleCode && currentPrecip < 0.1 && (currentHum !== null && currentHum < 94);
  const isCurrentlyRaining = (currentPrecip >= 0.1 || (currentCode >= 50 && currentCode <= 99)) && !isFalseDrizzle;

  // 1. Si está lloviendo AHORA MISMO
  if (isCurrentlyRaining) {
    const isHeavy = currentPrecip >= 1.5 || currentCode === 65 || currentCode === 82 || currentCode === 95 || currentCode === 96 || currentCode === 99;
    return {
      status: isHeavy ? 'danger' : 'warning',
      badgeClass: isHeavy ? 'umbrella-badge-danger' : 'umbrella-badge-warning',
      dotClass: isHeavy ? 'dot-danger' : 'dot-warning',
      icon: isHeavy ? '☂️' : '🌂',
      badgeText: isHeavy ? '🔴 Bastinazu Agora' : '🟡 Orbayando Agora',
      title: isHeavy ? 'Paraguas obligatorio o quédate a cubierto' : 'Chubasquero o paraguas en mano',
      desc: isHeavy
        ? `Lluvia intensa activa en este momento (${currentPrecip.toFixed(1)} mm/h). Evita exponerte si no es necesario.`
        : `Orbayu / llovizna fina activa (${currentPrecip.toFixed(1)} mm/h). Moja sin avisar.`
    };
  }

  // 2. Si no llueve ahora, inspeccionar las próximas 8 horas (nowcasting)
  const windowLimit = Math.min(hourly.time.length, startIndex + 8);
  let firstRainIndex = -1;
  let firstHeavyIndex = -1;
  let maxPrecipInWindow = 0;

  for (let i = startIndex; i < windowLimit; i++) {
    const p = hourly.precipitation ? (parseFloat(hourly.precipitation[i]) || 0) : 0;
    const pop = hourly.precipitation_probability ? (parseFloat(hourly.precipitation_probability[i]) || 0) : 0;
    const c = hourly.weather_code ? parseInt(hourly.weather_code[i], 10) : 0;

    if (p > maxPrecipInWindow) {
      maxPrecipInWindow = p;
    }

    const isHeavyHour = p >= 1.5 || c === 65 || c === 82 || c === 95 || c === 96 || c === 99;
    const isRainHour = p >= 0.1 || (pop >= 35 && c >= 50);

    if (firstRainIndex === -1 && isRainHour) {
      firstRainIndex = i;
    }

    if (firstHeavyIndex === -1 && isHeavyHour) {
      firstHeavyIndex = i;
    }
  }

  // Si no se espera lluvia en las próximas 8 horas
  if (firstRainIndex === -1 && firstHeavyIndex === -1) {
    return {
      status: 'safe',
      badgeClass: 'umbrella-badge-safe',
      dotClass: 'dot-safe',
      icon: '🌤️',
      badgeText: '🟢 Cielo Noble',
      title: 'Paraguas no necesario',
      desc: 'Tregua seca garantizada en las próximas 8 horas. Puedes salir o tender sin miedo al agua.'
    };
  }

  // Si se espera lluvia copiosa o bastinazu (>= 1.5 mm/h o tormenta) en la ventana
  if (firstHeavyIndex !== -1) {
    const heavyTimeStr = hourly.time[firstHeavyIndex];
    const heavyHour = heavyTimeStr ? heavyTimeStr.split('T')[1].substring(0, 5) : 'próximas horas';
    const heavyPop = hourly.precipitation_probability ? (parseFloat(hourly.precipitation_probability[firstHeavyIndex]) || 0) : 0;
    const heavyPrecip = hourly.precipitation ? (parseFloat(hourly.precipitation[firstHeavyIndex]) || maxPrecipInWindow) : maxPrecipInWindow;

    // Si hay llovizna débil previa antes del bastinazu (ej. 17:00 h llovizna y 21:00 h bastinazu)
    if (firstRainIndex !== -1 && firstRainIndex < firstHeavyIndex) {
      const lightTimeStr = hourly.time[firstRainIndex];
      const lightHour = lightTimeStr ? lightTimeStr.split('T')[1].substring(0, 5) : 'tarde';
      const lightPrecip = hourly.precipitation ? (parseFloat(hourly.precipitation[firstRainIndex]) || 0) : 0;
      return {
        status: 'danger',
        badgeClass: 'umbrella-badge-danger',
        dotClass: 'dot-danger',
        icon: '☂️',
        badgeText: '🔴 Peligro de Bastinazu',
        title: `Lluvia copiosa a partir de las ${heavyHour} h`,
        desc: `Orbayu débil previo a las ${lightHour} h (~${lightPrecip.toFixed(1)} mm) con tregua; el frente activo (~${heavyPrecip.toFixed(1)} mm/h, prob. ${heavyPop}%) entrará a las ${heavyHour} h. Prepara paraguas grande.`
      };
    }

    return {
      status: 'danger',
      badgeClass: 'umbrella-badge-danger',
      dotClass: 'dot-danger',
      icon: '☂️',
      badgeText: '🔴 Peligro de Bastinazu',
      title: `Lluvia copiosa a partir de las ${heavyHour} h`,
      desc: `Se espera lluvia moderada a fuerte (~${heavyPrecip.toFixed(1)} mm/h, prob. ${heavyPop}%). No salgas sin paraguas grande.`
    };
  }

  // Si solo se espera orbayu o lluvia débil (< 1.5 mm/h)
  const rainTimeStr = hourly.time[firstRainIndex];
  const rainHour = rainTimeStr ? rainTimeStr.split('T')[1].substring(0, 5) : 'próximas horas';
  const rainPrecip = hourly.precipitation ? (parseFloat(hourly.precipitation[firstRainIndex]) || 0) : 0;
  const rainPop = hourly.precipitation_probability ? (parseFloat(hourly.precipitation_probability[firstRainIndex]) || 0) : 0;

  return {
    status: 'warning',
    badgeClass: 'umbrella-badge-warning',
    dotClass: 'dot-warning',
    icon: '🌂',
    badgeText: '🟡 Peligro d\'Orbayu',
    title: `Lleva paraguas o chubasquero desde las ${rainHour} h`,
    desc: `Orbayu intermitente previsto sobre las ${rainHour} h (~${rainPrecip > 0 ? rainPrecip.toFixed(1) : '0,3'} mm, prob. ${rainPop}%). Seco hasta entonces.`
  };
}

export function renderUmbrellaCard(umbrella) {
  if (!umbrella) return '';

  return `
    <div class="umbrella-advisor-strip ${umbrella.status}" role="region" aria-label="Semáforu del Paragües">
      <div class="umbrella-strip-left">
        <span class="umbrella-strip-icon" aria-hidden="true">${umbrella.icon}</span>
        <div class="umbrella-strip-info">
          <div class="umbrella-strip-headline">
            <span class="umbrella-badge-pill ${umbrella.badgeClass}">
              <span class="umbrella-dot ${umbrella.dotClass}"></span>
              ${umbrella.badgeText}
            </span>
            <span class="umbrella-strip-title">${umbrella.title}</span>
          </div>
          <div class="umbrella-strip-desc">${umbrella.desc}</div>
        </div>
      </div>
    </div>
  `;
}
