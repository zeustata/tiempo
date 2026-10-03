/**
 * METEOASTUR LODE - Base de Datos de Sendas y Motor Físico de Rutas
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Doctrina de Legalidad Estricta y Blindaje Constitucional (Ley 16).
 */

export const RUTAS_ASTURIAS_CATALOGO = {
  // --- CASTRILLÓN ---
  castrillon: [
    {
      name: 'Senda Costera de los Miradores (Arnao - Bayas)',
      type: 'costera',
      dist: '9.5 km',
      elev: '+180 m',
      diff: 'Fácil',
      time: '2h 45min',
      desc: 'Acantilados bravos, vistas a La Ladrona e Isla de Deva, y paso por las playas de Salinas, Santa María del Mar y Bahínas.',
      surface: 'Sendero de tierra, pasarelas de madera y pista afirmada',
      caution: 'Viento fuerte en acantilados y zonas húmedas en bajadas a calas tras lluvia'
    },
    {
      name: 'Ruta Fluvial del Agua y Molinos del Río Raíces',
      type: 'fluvial',
      dist: '6.2 km',
      elev: '+95 m',
      diff: 'Muy Fácil',
      time: '1h 30min',
      desc: 'Paseo sombrío y fresco entre castaños, alisos y antiguos molinos de marea y agua dulce.',
      surface: 'Pista de zahorra y senda forestal',
      caution: 'Humedad alta y barro en tramos sombríos de ribera'
    },
    {
      name: 'Subida al Mirador de Pulide',
      type: 'montaña',
      dist: '5.4 km',
      elev: '+310 m',
      diff: 'Media-Fácil',
      time: '1h 50min',
      desc: 'El balcón natural de Castrillón con panorámica de 360° desde el Cabo Peñas hasta la Cordillera Cantábrica.',
      surface: 'Pista forestal y camino de tierra',
      caution: 'Expuesto a viento Sur y nieblas de cumbre en días de borrina'
    }
  ],

  // --- GIJÓN ---
  gijon: [
    {
      name: 'Senda Costera del Cervigón (San Lorenzo - La Ñora)',
      type: 'costera',
      dist: '8.8 km',
      elev: '+140 m',
      diff: 'Fácil',
      time: '2h 30min',
      desc: 'Paseo marítimo espectacular bordeando calas (Rinconeda, Serín, Estaño) hasta la playa de La Ñora.',
      surface: 'Paved / Zahorra compacta',
      caution: 'Precaución con rachas de viento del Noroeste en salientes rocosos'
    },
    {
      name: 'Senda Verde de La Camocha (Tremañes - Pozo Camocha)',
      type: 'verde',
      dist: '7.5 km',
      elev: '+50 m',
      diff: 'Muy Fácil',
      time: '2h 00min',
      desc: 'Antigua caja de ferrocarril minero rehabilitada, ideal para caminar en familia bajo cualquier tiempo.',
      surface: 'Asfalto / Vía verde lisa',
      caution: 'Apto incluso con orballu moderado'
    },
    {
      name: 'Subida al Picu Fario y Deva',
      type: 'montaña',
      dist: '11.0 km',
      elev: '+520 m',
      diff: 'Media',
      time: '3h 30min',
      desc: 'Cima más alta de Gijón (731 m) con vistas de toda la rasa costera asturiana y los Picos de Europa.',
      surface: 'Camino de montaña y pista forestal',
      caution: 'Sendas muy embarradas en robledales tras episodios de lluvia'
    }
  ],

  // --- OVIEDO ---
  oviedo: [
    {
      name: 'Pista Finlandesa y Laderas del Naranco',
      type: 'mixta',
      dist: '6.0 km',
      elev: '+120 m',
      diff: 'Muy Fácil',
      time: '1h 30min',
      desc: 'Paseo panorámico sobre la capital con fuentes y sombra de robles y castaños.',
      surface: 'Tierra compacta afirmada',
      caution: 'Firme seguro, tramos húmedos cerca de arroyos'
    },
    {
      name: 'Ascensión a la Cruz del Picu Naranco y Monumentos Prerrománicos',
      type: 'montaña',
      dist: '7.8 km',
      elev: '+380 m',
      diff: 'Media',
      time: '2h 15min',
      desc: 'Paso por Santa María del Naranco y San Miguel de Lillo hasta la cumbre (634 m).',
      surface: 'Sendero de tierra y piedra',
      caution: 'Roca resbaladiza en las bajadas pedregosas con orballu'
    },
    {
      name: 'Senda Verde del Ferrocarril del Oso y Fuso de la Reina',
      type: 'verde',
      dist: '8.2 km',
      elev: '+40 m',
      diff: 'Muy Fácil',
      time: '2h 10min',
      desc: 'Ribera del río Nalón por la antigua vía minera con túneles iluminados.',
      surface: 'Asfalto y pista acondicionada',
      caution: 'Totalmente practicable en días húmedos'
    }
  ],

  // --- CANGAS DE ONÍS ---
  cangasdeonis: [
    {
      name: 'Ruta de la Garganta del Cares (Poncebos - Caín)',
      type: 'desfiladero',
      dist: '12.0 km (ida)',
      elev: '+250 m',
      diff: 'Media',
      time: '3h 30min (ida)',
      desc: 'La "Garganta Divina" tallada en la roca caliza pura de los Picos de Europa.',
      surface: 'Camino de roca y gravilla tallado en cantil',
      caution: 'Extrema precaución: caída vertical sin barandilla, desprendimientos en lluvia o deshielo y calor sofocante en verano'
    },
    {
      name: 'Ruta Circular de los Lagos de Covadonga (Enol y Ercina)',
      type: 'montaña',
      dist: '5.8 km',
      elev: '+160 m',
      diff: 'Fácil-Media',
      time: '2h 00min',
      desc: 'Pastizales glaciares, minas de Buferrera y lagos glaciares bajo las cumbres de los Urrieles.',
      surface: 'Sendero de pasto, piedra y escalones',
      caution: 'Niebla repentina muy espesa en montaña; roca caliza extremadamente pulida y deslizante con agua'
    }
  ],

  // --- SOMIEDO ---
  somiedo: [
    {
      name: 'Ruta de Valle de Lago al Lago del Valle',
      type: 'montaña',
      dist: '12.0 km (ida/vuelta)',
      elev: '+320 m',
      diff: 'Media',
      time: '3h 45min',
      desc: 'Glaciarismo puro, brañas con teitos de escoba y el mayor lago natural de Asturias.',
      surface: 'Pista de montaña y senda de tierra',
      caution: 'Viento frío de cota alta y barro en las praderías en época de deshielo o lluvia'
    },
    {
      name: 'Ruta de los Lagos de Saliencia (Alto de la Farrapona)',
      type: 'montaña',
      dist: '8.5 km',
      elev: '+360 m',
      diff: 'Media',
      time: '3h 00min',
      desc: 'Conjunto de 4 lagos de origen glaciar a más de 1.600 metros de altitud.',
      surface: 'Pista de grava y senderos calizos',
      caution: 'Alta montaña: cambios meteorológicos bruscos, sensación térmica gélida con viento'
    }
  ],

  // --- QUIRÓS / TEVERGA / PROAZA ---
  quiros: [
    {
      name: 'Senda del Oso (Tramo Tuñón - Proaza - Entrago)',
      type: 'verde',
      dist: '14.0 km',
      elev: '+150 m',
      diff: 'Fácil',
      time: '4h 00min',
      desc: 'Desfiladero de Peñas Juntas, cercado de las osas Paca y Molina y gargantas fluviales.',
      surface: 'Pista asfaltada y tratada',
      caution: 'Ideal para senderismo familiar en cualquier época del año'
    }
  ]
};

/**
 * Rutas genéricas o de proximidad para concejos sin ficha específica
 */
export function getRoutesForConcejo(concejo) {
  if (!concejo) return [];
  const key = concejo.id;
  if (RUTAS_ASTURIAS_CATALOGO[key]) {
    return RUTAS_ASTURIAS_CATALOGO[key];
  }

  // Rutas adaptadas al tipo de relieve del concejo
  if (concejo.type === 'coast') {
    return [
      {
        name: `Senda Litoral & Acantilados de ${concejo.name}`,
        type: 'costera',
        dist: '7.5 km',
        elev: '+130 m',
        diff: 'Fácil',
        time: '2h 15min',
        desc: `Recorrido por la rasa costera, miradores naturales y calas del litoral de ${concejo.name}.`,
        surface: 'Senderos de tierra y pistas locales',
        caution: 'Atención a rachas de viento cantábrico en acantilados abiertos'
      },
      {
        name: `Paseo de Ribera y Bosque Costero de ${concejo.name}`,
        type: 'fluvial',
        dist: '5.2 km',
        elev: '+80 m',
        diff: 'Muy Fácil',
        time: '1h 30min',
        desc: 'Senda protegida entre vegetación de ribera, arbolado y vegas bajas.',
        surface: 'Pista de zahorra lisa',
        caution: 'Zonas sombrías húmedas'
      }
    ];
  }

  if (concejo.type === 'mountain') {
    return [
      {
        name: `Ascensión a Cumbres y Brañas de ${concejo.name}`,
        type: 'montaña',
        dist: '9.8 km',
        elev: '+490 m',
        diff: 'Media-Exigente',
        time: '3h 30min',
        desc: `Sendero de montaña tradicional entre hayedos y mayadas de altura en ${concejo.name}.`,
        surface: 'Sendero de pasto, caliza y piedras',
        caution: 'Llevar calzado con suela de taco y abrigo de montaña'
      },
      {
        name: `Camino Real y Valles Tradicionales de ${concejo.name}`,
        type: 'valle',
        dist: '6.5 km',
        elev: '+180 m',
        diff: 'Fácil',
        time: '2h 00min',
        desc: 'Itinerario de media ladera comunicando aldeas históricas y hórreos.',
        surface: 'Camino carretero y senda de tierra',
        caution: 'Posible barro tras orballu'
      }
    ];
  }

  // Concejos de Valle / Interior
  return [
    {
      name: `Ruta de los Valles y Pomaradas de ${concejo.name}`,
      type: 'valle',
      dist: '7.0 km',
      elev: '+150 m',
      diff: 'Fácil',
      time: '2h 00min',
      desc: `Caminos tradicionales entre pomaradas, castañedos y arroyos de ${concejo.name}.`,
      surface: 'Pista de tierra y caminos de servidumbre',
      caution: 'Firme suave, charcos en tramos arcillosos'
    },
    {
      name: `Senda Panorámica a la Sierra y Miradores de ${concejo.name}`,
      type: 'mixta',
      dist: '8.2 km',
      elev: '+280 m',
      diff: 'Media-Fácil',
      time: '2h 30min',
      desc: 'Subida a los cordales con vistas panorámicas sobre los valles centrales.',
      surface: 'Camino afirmado y senda forestal',
      caution: 'Viento en zonas altas despejadas'
    }
  ];
}

/**
 * Motor de Evaluación Meteorológica de Confort en Senderismo
 */
export function calculateHikingIndex(data, concejo) {
  if (!data || !data.weather || !data.weather.current) {
    return {
      score: 7,
      status: 'good',
      label: 'Favorable para Caminar',
      badgeClass: 'hike-good',
      icon: '🟢',
      summary: 'Condiciones meteorológicas teóricas aptas para la marcha.',
      mudIndex: { level: 'Bajo', desc: 'Sendas secas o con humedad normal' },
      windChill: 16,
      visibility: 'Buena',
      windowText: 'Mañana y tarde despejadas'
    };
  }

  const { current, hourly, daily } = data.weather;
  const temp = current.temperature_2m || 15;
  const wind = current.wind_speed_10m || 10;
  const windGust = current.wind_gusts_10m || wind * 1.3;
  const code = current.weather_code || 0;
  const precipNow = current.precipitation || 0;
  const humidity = current.relative_humidity_2m || 70;

  // Buscar el índice de la hora local en curso (sincronizado con Semáforu del Paragües)
  const now = new Date();
  const currentHourStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:00`;

  let startIndex = 0;
  if (hourly && hourly.time) {
    for (let i = 0; i < hourly.time.length; i++) {
      if (hourly.time[i] >= currentHourStr) {
        startIndex = i;
        break;
      }
    }
  }

  // 1. Análisis de lluvia reciente y firme del terreno (Llamuergues / Barro)
  let rainFallenToday = 0;
  if (hourly && hourly.precipitation && startIndex > 0) {
    for (let i = 0; i < startIndex; i++) {
      rainFallenToday += parseFloat(hourly.precipitation[i]) || 0;
    }
  } else if (daily && daily.precipitation_sum) {
    rainFallenToday = parseFloat(daily.precipitation_sum[0]) || 0;
  }

  // 2. Ventana de Nowcasting en las próximas 6 horas reales desde la hora actual
  let rainInNext6h = 0;
  let maxNextPop = 0;
  let hasStormInWindow = false;
  let firstRainHourStr = null;

  if (hourly && hourly.precipitation) {
    const windowLimit = Math.min(hourly.precipitation.length, startIndex + 6);
    for (let i = startIndex; i < windowLimit; i++) {
      const p = parseFloat(hourly.precipitation[i]) || 0;
      const pop = hourly.precipitation_probability ? (parseFloat(hourly.precipitation_probability[i]) || 0) : 0;
      const c = hourly.weather_code ? parseInt(hourly.weather_code[i], 10) : 0;

      rainInNext6h += p;
      if (pop > maxNextPop) maxNextPop = pop;
      if (c >= 95 && c <= 99) hasStormInWindow = true;

      if (!firstRainHourStr && (p >= 0.2 || (pop >= 40 && c >= 51))) {
        if (hourly.time && hourly.time[i]) {
          firstRainHourStr = hourly.time[i].split('T')[1].substring(0, 5);
        }
      }
    }
  }

  // Ponderación del estado del firme: agua caída + lluvia inminente en las próximas 2 horas
  let rainImmediate2h = 0;
  if (hourly && hourly.precipitation) {
    const shortLimit = Math.min(hourly.precipitation.length, startIndex + 2);
    for (let i = startIndex; i < shortLimit; i++) {
      rainImmediate2h += parseFloat(hourly.precipitation[i]) || 0;
    }
  }
  const effectiveMudRain = Math.max(rainFallenToday, rainImmediate2h, precipNow * 2);

  let mudLevel = 'Bajo / Firme Seco';
  let mudDesc = 'Sendas firmes y transitables. Caliza seca con excelente tracción.';
  let mudColor = '#10b981';
  let mudScore = 1;
  let mudPct = 25;

  if (effectiveMudRain >= 14 || precipNow >= 2.0) {
    mudLevel = 'Muy Alto / Llamuergues';
    mudDesc = 'Barrizales abundantes (llamuergues). Caliza muy resbaladiza; botas con taco y bastones indispensables.';
    mudColor = '#ef4444';
    mudScore = 4;
    mudPct = 100;
  } else if (effectiveMudRain >= 6 || precipNow >= 0.4 || rainInNext6h >= 4.0) {
    mudLevel = 'Moderado / Zonas Blandas';
    mudDesc = 'Terreno húmedo y tramos blandos. Precaución en bajadas de tierra y roca sombría.';
    mudColor = '#f59e0b';
    mudScore = 3;
    mudPct = 75;
  } else if (effectiveMudRain >= 1.2 || precipNow > 0 || rainInNext6h >= 1.0) {
    mudLevel = 'Leve / Terreno Húmedo';
    mudDesc = 'Tierra húmeda pero compacta. Buen agarre en sendas y pistas forestales.';
    mudColor = '#84cc16';
    mudScore = 2;
    mudPct = 50;
  }

  // 3. Sensación térmica en cumbres (+300m sobre el concejo por defecto)
  const lapseRate = 0.0065; // -0.65°C cada 100m
  const altDiff = Math.max(0, 500 - (concejo?.altitude || 200));
  const tempHigh = temp - (altDiff * lapseRate);
  const windChillHigh = Math.round(tempHigh - (wind * 0.15));

  // 4. Puntuación y Veredicto Global
  let status = 'optimal';
  let label = 'Jornada Ideal de Marcha';
  let badgeClass = 'hike-optimal';
  let icon = '🟢';
  let summary = 'Cielos tranquilos, sin riesgo de lluvia inmediata y firme en buen estado.';

  if (precipNow >= 2.0 || hasStormInWindow || windGust >= 65 || rainInNext6h >= 5.0) {
    status = 'danger';
    label = 'Meteorología Desfavorable';
    badgeClass = 'hike-danger';
    icon = '🔴';
    summary = hasStormInWindow 
      ? '🚨 Riesgo de tormenta eléctrica en montaña. Evitar crestas y zonas expuestas.'
      : (precipNow >= 2.0 
          ? '🌧️ Bastinazu o lluvia copiosa activa. Rutas de montaña desaconsejadas.' 
          : `🌧️ Frente de lluvia intensa previsto (${rainInNext6h.toFixed(1)} mm) o viento severo en las próximas horas. No recomendable salir a cumbres.`);
  } else if (precipNow >= 0.2 || rainInNext6h >= 1.2 || maxNextPop >= 50 || mudScore >= 3 || windGust >= 45) {
    status = 'warning';
    label = 'Precaución en Terreno';
    badgeClass = 'hike-warning';
    icon = '🟡';
    summary = firstRainHourStr 
      ? `Lluvia o llovizna prevista hacia las ${firstRainHourStr} h (${rainInNext6h.toFixed(1)} mm en 6h). Recomendable ruta baja por bosque o pista acondicionada.`
      : 'Sendas húmedas y probabilidad de orballu o viento molesto. Recomendable ruta baja por bosque o pista acondicionada.';
  } else if (humidity >= 92 && temp <= 16 && (code === 45 || code === 48)) {
    status = 'mist';
    label = 'Niebla / Cumbres Tapadas';
    badgeClass = 'hike-warning';
    icon = '🌫️';
    summary = 'Visibilidad reducida en cotas medias/altas por niebla o nubes bajas. Llevar GPS o track descargado.';
  }

  return {
    status,
    label,
    badgeClass,
    icon,
    summary,
    mudIndex: { level: mudLevel, desc: mudDesc, color: mudColor, score: mudScore, pct: mudPct, rain24h: effectiveMudRain.toFixed(1) },
    tempNow: Math.round(temp),
    feelsLike: Math.round(current.apparent_temperature || temp),
    windChillHigh,
    windSpeed: Math.round(wind),
    windGust: Math.round(windGust),
    humidity,
    uv: daily?.uv_index_max?.[0] || 4
  };
}
