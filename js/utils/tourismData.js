/**
 * METEOASTUR LODE - Base de Datos Comarcal de Turismo y Planes de Ocio Climático
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Ecosistema Zeustata • Principado de Asturias.
 * Doctrina de Legalidad Estricta, Datos Abiertos (Ley 15) y Blindaje Legal (Ley 16).
 */

export const COMARCAS_NODRIZA = {
  aviles_costa: {
    name: 'Comarca de Avilés & Costa Central',
    concejos: ['aviles', 'castrillon', 'corvera', 'illes', 'carreno', 'gozon', 'soto'],
    hero: 'Playas bravas, ría industrial reconvertida, acantilados y museos de vanguardia.'
  },
  gijon_maritimo: {
    name: 'Gijón & Costa Verde',
    concejos: ['gijon', 'villaviciosa'],
    hero: 'Villas marineras, calas, ría de Villaviciosa, sidra de manzana y cultura cantábrica.'
  },
  oviedo_centro: {
    name: 'Oviedo & Centro Histórico',
    concejos: ['oviedo', 'siero', 'llanera', 'norena', 'ribera', 'morcin', 'riosa', 'santoadriano', 'proaza', 'teverga', 'quiros', 'bimenes', 'nava', 'cabranes', 'sariego'],
    hero: 'Cuna del Prerrománico mundial, sendas de osos, valles verdes y templos gastronómicos.'
  },
  cuencas_mineras: {
    name: 'Cuencas Mineras (Nalón & Caudal)',
    concejos: ['langreo', 'smra', 'laviana', 'sobrescobio', 'caso', 'mieres', 'lena', 'aller'],
    hero: 'Patrimonio industrial vivo, carbón, Redes (Reserva Biosfera) y puertos míticos de ciclismo.'
  },
  oriente_picos: {
    name: 'Oriente, Costa Oriental & Picos de Europa',
    concejos: ['llanes', 'ribadesella', 'cangasdeonis', 'onís', 'cabrales', 'panes', 'ribadedeva', 'parres', 'pilocna', 'colunga', 'caravia', 'amieva', 'ponga'],
    hero: 'Macizo de Picos de Europa, cuevas jurásicas y rupestres, santuarios y playas de postal.'
  },
  occidente_eonavia: {
    name: 'Occidente & Tierras del Eo-Navia',
    concejos: ['valdes', 'navia', 'coana', 'elfranco', 'tapia', 'castropol', 'vegadeo', 'taramundi', 'santirso', 'villanuevadeoscos', 'santoeulaliadeoscos', 'sanmartindeoscos', 'pesoz', 'grandasdesalime', 'allande', 'boal', 'illano', 'villayon', 'cudillero', 'pravia', 'salas', 'belmontedemiranda', 'somiedo', 'cangasdelnarcea', 'tineo', 'degana', 'ibias', 'yernesytameza'],
    hero: 'Tierras mágicas de ferrerías, pizarras, bosques de Muniellos y brañas vaqueiras.'
  }
};

export const PLANES_ASTURIAS_CATALOGO = [
  // --- 🌧️ PLANES A CUBIERTO (LLUVIA / MAL TIEMPO) ---
  {
    id: 'niemeyer',
    title: 'Centro Niemeyer & Casco Histórico de Avilés',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🏛️',
    comarca: 'aviles_costa',
    town: 'Avilés',
    distInfo: 'Avilés centro',
    desc: 'Única obra del arquitecto Óscar Niemeyer en España. Exposiciones de arte moderno, cine y mirador en la cúpula sobre la ría.',
    tip: 'Ideal con lluvia o viento: todas las salas y pasarelas están conectadas y a cubierto.',
    tag: 'Arte & Arquitectura'
  },
  {
    id: 'museo_mineria_mumi',
    title: 'MUMI: Museo de la Minería y la Industria',
    type: 'indoor',
    weatherType: 'rain',
    icon: '⛏️',
    comarca: 'cuencas_mineras',
    town: 'El Entrego (SMRA)',
    distInfo: 'Valle del Nalón',
    desc: 'Descenso en "jaula" a la galería minera subterránea real y simulación de tren de extracción. Una inmersión inolvidable.',
    tip: 'Perfecto para días de bastinazu o frío: visita 100% subterránea y a cubierto.',
    tag: 'Patrimonio Minero'
  },
  {
    id: 'muja_colunga',
    title: 'MUJA: Museo del Jurásico de Asturias',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🦖',
    comarca: 'oriente_picos',
    town: 'Colunga',
    distInfo: 'Rasa de San Telmo',
    desc: 'Edificio en forma de huella tridáctila gigante. Una de las colecciones de fósiles y esqueletos de dinosaurio más completas del mundo.',
    tip: 'Si arrecia el temporal cantábrico, el interior ofrece horas de divulgación para toda la familia.',
    tag: 'Fósiles & Ciencia'
  },
  {
    id: 'museo_sidra_nava',
    title: 'Museo de la Sidra de Asturias',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🍏',
    comarca: 'oviedo_centro',
    town: 'Nava',
    distInfo: 'Comarca de la Sidra',
    desc: 'Descubre todo el ciclo del manzano, la fermentación en llagar, el escanciado interactivo y los juegos tradicionales asturianos.',
    tip: 'Magnífico refugio contra el orbayu antes de disfrutar de una espicha en los llagares de la zona.',
    tag: 'Cultura Asturiana'
  },
  {
    id: 'tito_bustillo',
    title: 'Cueva de Tito Bustillo & Centro de Arte Rupestre',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🦣',
    comarca: 'oriente_picos',
    town: 'Ribadesella',
    distInfo: 'Ribadesella',
    desc: 'Patrimonio de la Humanidad por la UNESCO. Uno de los santuarios de arte paleolítico más importantes de Europa.',
    tip: 'Ambiente en cueva protegido de las inclemencias meteorológicas exteriores.',
    tag: 'UNESCO Rupestre'
  },
  {
    id: 'museo_bellas_artes',
    title: 'Museo de Bellas Artes de Asturias',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🎨',
    comarca: 'oviedo_centro',
    town: 'Oviedo',
    distInfo: 'Casco Antiguo de Oviedo',
    desc: 'Una de las mejores pinacotecas públicas de España: obras maestras de El Greco, Goya, Sorolla, Picasso y Dalí en el Palacio de Velarde.',
    tip: 'Entrada gratuita. Plan cultural supremo para pasear resguardado en el corazón de Vetusta.',
    tag: 'Bellas Artes'
  },
  {
    id: 'acuario_gijon',
    title: 'Bioparc Acuario de Gijón',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🦈',
    comarca: 'gijon_maritimo',
    town: 'Gijón',
    distInfo: 'Playa de Poniente',
    desc: 'Recorrido por los fondos marinos del Cantábrico y los océanos del mundo: nutrias, tiburones toro y especies autóctonas.',
    tip: 'Plan estrella a pie de mar en días de temporal costero o fuerte lluvia.',
    tag: 'Fauna Marina'
  },
  {
    id: 'museo_ancla_salinas',
    title: 'Museo de Anclas Philippe Cousteau & Mina de Arnao',
    type: 'indoor',
    weatherType: 'rain',
    icon: '⚓',
    comarca: 'aviles_costa',
    town: 'Castrillón (Arnao)',
    distInfo: 'Arnao / Salinas',
    desc: 'La mina submarina más antigua de España. Galerías originales que se adentran bajo el fondo del mar Cantábrico.',
    tip: 'La visita guiada subterránea bajo el mar es inmune a la lluvia exterior.',
    tag: 'Arqueología Industrial'
  },

  // --- ☀️ PLANES DE EXTERIOR (SOL / DESPEJADO) ---
  {
    id: 'mirador_fitu',
    title: 'Mirador del Fitu: Balcón del Cantábrico',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '🔭',
    comarca: 'oriente_picos',
    town: 'Caravia / Parres',
    distInfo: 'Sierra del Sueve',
    desc: 'Estructura volada de hormigón construida en 1927 con vista de 360°: a un lado las cumbres de Picos de Europa y al otro el mar.',
    tip: 'Imprescindible día despejado para disfrutar de la panorámica más famosa de Asturias.',
    tag: 'Panorámica 360°'
  },
  {
    id: 'cabo_penas',
    title: 'Espacio Protegido y Faro de Cabo Peñas',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '🌊',
    comarca: 'aviles_costa',
    town: 'Gozón',
    distInfo: 'Punta Norte de Asturias',
    desc: 'El cabo más septentrional del Principado con acantilados de más de 100 metros sobre el Cantábrico y sendas de pasarelas de madera.',
    tip: 'Día soleado para ver el horizonte infinito. Con viento fuerte llevar cortavientos.',
    tag: 'Acantilados Salvajes'
  },
  {
    id: 'prerromanico_naranco',
    title: 'Monumentos Prerrománicos del Monte Naranco',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '👑',
    comarca: 'oviedo_centro',
    town: 'Oviedo',
    distInfo: 'Monte Naranco',
    desc: 'Santa María del Naranco y San Miguel de Lillo (Siglo IX, UNESCO). Joyas arquitectónicas únicas en el mundo con vistas sobre Oviedo.',
    tip: 'Luz dorada de media tarde con sol ideal para fotografía y paseo por las campas del Naranco.',
    tag: 'Patrimonio de la Humanidad'
  },
  {
    id: 'castro_coana',
    title: 'Castro de Coaña y Vía Céltica',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '🛖',
    comarca: 'occidente_eonavia',
    town: 'Coaña',
    distInfo: 'Cuenca del Navia',
    desc: 'Poblado castreño fortificado de la Edad del Hierro mejor conservado del norte peninsular con murallas y saunas castreñas.',
    tip: 'Paseo al aire libre entre bancales milenarios bajo cielos claros o sol tamizáu.',
    tag: 'Cultura Castreña'
  },
  {
    id: 'senda_cervigon',
    title: 'Senda del Cervigón y Rinconeda',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '🏖️',
    comarca: 'gijon_maritimo',
    town: 'Gijón',
    distInfo: 'Gijón Litoral',
    desc: 'Paseo volado sobre el mar desde la playa de San Lorenzo hasta La Ñora pasando por las calas vírgenes de Estaño y Serín.',
    tip: 'Paseo marítimo glorioso con sol o brisa suave.',
    tag: 'Paseo Costero'
  },

  // --- 🌫️ PLANES DE NIEBLA / BOSQUES MÁGICOS (BORRINA / OTOÑO) ---
  {
    id: 'bosque_muniellos',
    title: 'Reserva Integral de Muniellos & Fuentes del Narcea',
    type: 'nature',
    weatherType: 'fog',
    icon: '🍂',
    comarca: 'occidente_eonavia',
    town: 'Cangas del Narcea',
    distInfo: 'Suroccidente Asturiano',
    desc: 'El mayor robledal de España y uno de los mejor conservados de Europa. Hogar del oso pardo y urogallo cantábrico.',
    tip: 'La niebla o borrina otoñal dota al robledal de una atmósfera mágica e indescriptible.',
    tag: 'Naturaleza Pura'
  },
  {
    id: 'parque_redes',
    title: 'Parque Natural de Redes (Ruta del Alba)',
    type: 'nature',
    weatherType: 'fog',
    icon: '🌲',
    comarca: 'cuencas_mineras',
    town: 'Sobrescobio / Caso',
    distInfo: 'Alto Nalón',
    desc: 'Desfiladeros de roca caliza, cascadas de agua cristalina y hayedos centenarios declarados Reserva de la Biosfera.',
    tip: 'Con tiempo nublado o brumoso, el rumor del agua y el musgo verde brillan con luz especial.',
    tag: 'Reserva Biosfera'
  },
  {
    id: 'cudillero_villa',
    title: 'Villa Marinera de Cudillero',
    type: 'nature',
    weatherType: 'fog',
    icon: '🏘️',
    comarca: 'occidente_eonavia',
    town: 'Cudillero',
    distInfo: 'Costa Occidental',
    desc: 'Pueblo marinero escalonado en forma de anfiteatro natural sobre el mar, con casas de vivos colores y puerto pesquero.',
    tip: 'Precioso tanto con sol como en días de nubes bajas y bruma marina cantábrica.',
    tag: 'Villa Marinera'
  },
  {
    id: 'taramundi_ferrerias',
    title: 'Conjunto Etnográfico de Teixois y Taramundi',
    type: 'nature',
    weatherType: 'fog',
    icon: '⚙️',
    comarca: 'occidente_eonavia',
    town: 'Taramundi',
    distInfo: 'Oscos-Eo',
    desc: 'Molinos, mazos de hierro del siglo XVIII movidos por agua y cuna de la artesanía de navajas tradicionales.',
    tip: 'El clima húmedo y los bosques de ribera forman un cuadro de cuento de hadas.',
    tag: 'Etnografía Viva'
  },

  // --- ❄️ PLANES DE MONTAÑA / NIEVE / GASTRONOMÍA DE CUCHARA ---
  {
    id: 'somiedo_brañas',
    title: 'Brañas Vaqueiras y Teitos de Somiedo',
    type: 'mountain',
    weatherType: 'snow',
    icon: '🏔️',
    comarca: 'occidente_eonavia',
    town: 'Pola de Somiedo',
    distInfo: 'Parque Natural de Somiedo',
    desc: 'Cabañas ancestrales con techumbre de escoba vegetal (teitos) en valles glaciares de alta montaña.',
    tip: 'Con frío o cota de nieve baja, entrar en calor con un pote de berzas somedano o carne roxa.',
    tag: 'Alta Montaña'
  },
  {
    id: 'pajares_cuchara',
    title: 'Pajares y Gastronomía de Pote en el Valle de Lena',
    type: 'mountain',
    weatherType: 'snow',
    icon: '🍲',
    comarca: 'cuencas_mineras',
    town: 'Lena (Pajares)',
    distInfo: 'Puerto de Pajares',
    desc: 'La entrada histórica a Asturias por la Cordillera. Parada obligatoria para saborear fabada asturiana y pote de castañas al calor del fuego.',
    tip: 'Plan idóneo en jornadas invernales o tras una subida a ver la nieve en la cordillera.',
    tag: 'Gastronomía de Cuchara'
  },
  {
    id: 'cangas_onis_santuario',
    title: 'Cangas de Onís, Covadonga y Puente Romano',
    type: 'mountain',
    weatherType: 'snow',
    icon: '⛪',
    comarca: 'oriente_picos',
    town: 'Cangas de Onís',
    distInfo: 'Entrada a Picos de Europa',
    desc: 'Primera capital del Reino de Asturias, Santuario de la Santina en la cueva natural y gastronomía de queso Gamonéu y Cabrales.',
    tip: 'Con frío o primeras nieves en las cumbres, Covadonga y Cangas transmiten un misticismo sobrecogedor.',
    tag: 'Historia y Leyenda'
  }
];

/**
 * Obtiene la comarca correspondiente a un concejo ID
 */
export function getComarcaForConcejo(concejoId) {
  const cId = (concejoId || '').toLowerCase().trim();
  for (const [key, data] of Object.entries(COMARCAS_NODRIZA)) {
    if (data.concejos.includes(cId)) {
      return { key, ...data };
    }
  }
  // Fallback seguro: Centro
  return { key: 'oviedo_centro', ...COMARCAS_NODRIZA.oviedo_centro };
}

/**
 * Motor de Selección Inteligente: clasifica y prioriza planes según el tiempo meteorológico
 */
export function getRecommendedPlans(weatherData, concejo) {
  if (!weatherData || !weatherData.weather) {
    return {
      weatherVerdict: 'Tiempo variable asturiano',
      weatherCategory: 'all',
      plans: PLANES_ASTURIAS_CATALOGO
    };
  }

  const current = weatherData.weather.current || {};
  const temp = current.temperature_2m ?? 15;
  const rain = current.precipitation ?? 0;
  const weatherCode = current.weather_code ?? 0;
  const humidity = current.relative_humidity_2m ?? 75;

  // Detección de la categoría meteorológica dominante
  let category = 'sun';
  let verdict = 'Cielos despejados / Sol';
  let icon = '☀️';

  // 1. Nieve o Frío extremo de montaña
  if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86) || (temp <= 4 && (concejo?.altitude || 0) >= 400)) {
    category = 'snow';
    verdict = 'Ambiente frío / Nieve en cumbres: Tiempo de chimenea y montaña';
    icon = '❄️';
  }
  // 2. Lluvia, llovizna o tormenta activa
  else if (rain >= 0.1 || (weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82) || (weatherCode >= 95 && weatherCode <= 99)) {
    category = 'rain';
    verdict = 'Lluvia o llovizna: Momento ideal para planes a cubierto';
    icon = '🌧️';
  }
  // 3. Niebla o nublado muy húmedo
  else if (weatherCode === 45 || weatherCode === 48 || (humidity >= 92 && weatherCode >= 1 && weatherCode <= 3)) {
    category = 'fog';
    verdict = 'Borrina o ambiente brumoso: Bosques y villas con encanto especial';
    icon = '🌫️';
  }
  // 4. Nublado seco / Panza de burro
  else if (weatherCode >= 2 && weatherCode <= 3) {
    category = 'fog';
    verdict = 'Cielos nublados sin lluvia: Paseos costeros, bosques y visitas culturales';
    icon = '☁️';
  }
  // 5. Soleado o despejado
  else {
    category = 'sun';
    verdict = 'Cielos claros y buen tiempo: Miradores, calas y aire libre';
    icon = '☀️';
  }

  const comarcaInfo = getComarcaForConcejo(concejo?.id);

  // Ordenar los planes:
  // 1º: Planes que coinciden con el tiempo meteorológico y además están en la comarca del concejo
  // 2º: Planes que coinciden con el tiempo meteorológico en otras comarcas
  // 3º: Resto de planes
  const sortedPlans = [...PLANES_ASTURIAS_CATALOGO].sort((a, b) => {
    const aMatchWeather = (a.weatherType === category) ? 2 : 0;
    const bMatchWeather = (b.weatherType === category) ? 2 : 0;
    const aMatchComarca = (a.comarca === comarcaInfo.key) ? 1 : 0;
    const bMatchComarca = (b.comarca === comarcaInfo.key) ? 1 : 0;

    const scoreA = aMatchWeather * 2 + aMatchComarca;
    const scoreB = bMatchWeather * 2 + bMatchComarca;

    return scoreB - scoreA;
  });

  return {
    weatherVerdict: verdict,
    weatherCategory: category,
    weatherIcon: icon,
    comarca: comarcaInfo,
    plans: sortedPlans
  };
}
