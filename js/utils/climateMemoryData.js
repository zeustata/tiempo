/**
 * Memoria del Clima Asturiano (Efemérides Históricas y Grandes Temporales de Asturias)
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 * 
 * Base de datos histórica documentada con los grandes hitos meteorológicos del Principado:
 * ciclogénesis históricas, temporales de mar cantábrico, grandes nevadas en puertos,
 * galernas, olas de calor y frío siberiano, e inundaciones históricas.
 */

export const ASTURIAS_CLIMATE_MEMORIES = {
  // OCTUBRE
  '10-19': {
    dateLabel: '19 de Octubre',
    title: 'El Gran Temporal de Mar Cantábrico de 2014',
    icon: '🌊',
    tag: 'Temporal Marítimo Histórico',
    tagClass: 'memory-tag-marine',
    year: 2014,
    location: 'Litoral Cantábrico (Gijón, Salinas, Ribadesella)',
    summary: 'Un potente tren de borrascas atlánticas generó olas récord de más de 10 metros en la costa asturiana. En Gijón, el oleaje reventó el pretil del paseo del Muro de San Lorenzo inundando la calzada de arena y espuma; en Salinas el agua invadió los soportales de primera línea de playa con boyas costeras marcando picos históricos.'
  },
  '10-12': {
    dateLabel: '12 de Octubre',
    title: 'Veranillo de El Pilar y Récord de Calor de 2011',
    icon: '☀️',
    tag: 'Récord de Calor Otoñal',
    tagClass: 'memory-tag-heat',
    year: 2011,
    location: 'Gijón (Musel) y Valles Centrales',
    summary: 'Una masa de aire subtropical sahariano impulsada por viento sur disparó los termómetros a máximas históricas absolutas para el mes de octubre: 31.0 °C en Gijón (Musel) y 31.5 °C en Oviedo, dejando las playas asturianas repletas en pleno otoño.'
  },
  '10-15': {
    dateLabel: '15 de Octubre',
    title: 'El Huracán y Ciclón Post-Tropical Ophelia (2017)',
    icon: '🌪️',
    tag: 'Ciclón Tropical Atlántico',
    tagClass: 'memory-tag-storm',
    year: 2017,
    location: 'Todo el Principado de Asturias',
    summary: 'El huracán Ophelia rozó el noroeste peninsular con rachas huracanadas superiores a 130 km/h. Arrastró una gigantesca masa de polvo sahariano y humo de incendios que tiñó el cielo asturiano de un rojo apocalíptico en penumbra durante pleno mediodía.'
  },
  '10-24': {
    dateLabel: '24 de Octubre',
    title: 'Entrada Ártica y Nieve Temprana de 1974',
    icon: '❄️',
    tag: 'Frío Polar Histórico',
    tagClass: 'memory-tag-cold',
    year: 1974,
    location: 'Cordillera y costa cantábrica',
    summary: 'Una masa polar continental temprana provocó la mínima histórica de octubre en la costa asturiana (2.5 °C en Gijón y 0.8 °C en Oviedo). Cuajó nieve a solo 400 metros de altitud en valles del Caudal y Nalón en fechas inusualmente tempranas.'
  },
  '10-26': {
    dateLabel: '26 de Octubre',
    title: 'El Diluvio Atlántico del 2000',
    icon: '🌧️',
    tag: 'Precipitación Récord 24h',
    tagClass: 'memory-tag-rain',
    year: 2000,
    location: 'Costa Central (Avilés, Gijón, Carreño)',
    summary: 'Un frente atlántico cuasi-estacionario descargó 114.0 l/m² en menos de 24 horas en el litoral central, marcando el récord absoluto de lluvia en un solo día para octubre. Provocó riadas en cuencas bajas e inundó zonas portuarias.'
  },
  '10-28': {
    dateLabel: '28 de Octubre',
    title: 'Ciclogénesis Explosiva Becky (1998)',
    icon: '💨',
    tag: 'Ciclogénesis y Temporal de Viento',
    tagClass: 'memory-tag-wind',
    year: 1998,
    location: 'Cabo Peñas y litoral asturiano',
    summary: 'Una borrasca atlántica con una caída de presión vertiginosa de más de 30 hPa en 24 horas barrió Asturias con rachas de 145 km/h en Cabo Peñas y olas de 9 metros, arrancando techumbres y centenares de árboles.'
  },

  // NOVIEMBRE
  '11-04': {
    dateLabel: '4 de Noviembre',
    title: 'Temporal de Sur y Foehn Extremo de 1985',
    icon: '🔥',
    tag: 'Efecto Foehn Severo',
    tagClass: 'memory-tag-heat',
    year: 1985,
    location: 'Litoral Cantábrico',
    summary: 'Un violento viento sur orográfico bajó comprimido y recalentado por la Cordillera, elevando los termómetros en la costa a 26.2 °C en plena madrugada, con humedad por debajo del 20% y rachas huracanadas en cumbres.'
  },
  '11-15': {
    dateLabel: '15 de Noviembre',
    title: 'La Gran Nortada y Nevada a Cota Cero de 1985',
    icon: '❄️',
    tag: 'Temporal de Nieve en Costa',
    tagClass: 'memory-tag-snow',
    year: 1985,
    location: 'Salinas, Gijón y cuencas',
    summary: 'Un pasillo polar ártico desplomó la cota de nieve hasta el mismo nivel del mar en Asturias. La playa de San Lorenzo y las dunas de Salinas quedaron cubiertas bajo un manto blanco de más de 5 cm de nieve helada.'
  },

  // DICIEMBRE
  '12-24': {
    dateLabel: '24 de Diciembre',
    title: 'Ciclogénesis Explosiva Dirk en Nochebuena (2013)',
    icon: '💨',
    tag: 'Ciclogénesis Huracanada',
    tagClass: 'memory-tag-wind',
    year: 2013,
    location: 'Todo el Principado de Asturias',
    summary: 'En plena Nochebuena de 2013, la borrasca Dirk azotó Asturias con vientos sostenidos de temporal duro y rachas de 160 km/h en El Fitu y Cabo Peñas, provocando cortes generalizados de luz y olas de 11 metros.'
  },

  // ENERO
  '01-24': {
    dateLabel: '24 de Enero',
    title: 'La Mítica Ciclogénesis Klaus de 2009',
    icon: '🌪️',
    tag: 'Ciclogénesis Histórica Klaus',
    tagClass: 'memory-tag-storm',
    year: 2009,
    location: 'Asturias y Golfo de Vizcaya',
    summary: 'Considerada la borrasca más destructiva del siglo XXI en el norte de España. El barómetro se desplomó hasta 968 hPa con rachas de 175 km/h en Cabo Peñas y 198 km/h en Estaca de Bares. Destrozó bosques, tendidos y paseos marítimos.'
  },
  '01-16': {
    dateLabel: '16 de Enero',
    title: 'La Gran Ola de Frío Siberiano de 1985',
    icon: '❄️',
    tag: 'Frío Extremo Continental',
    tagClass: 'memory-tag-cold',
    year: 1985,
    location: 'Oviedo, Gijón y Cordillera',
    summary: 'Una masa de aire siberiano continental congeló Asturias durante casi dos semanas: -4.8 °C en Gijón (Musel), -6.0 °C en Oviedo y -14.0 °C en Pajares. Se helaron fuentes urbanas y cuajó la nieve en las playas asturianas.'
  },

  // FEBRERO
  '02-12': {
    dateLabel: '12 de Febrero',
    title: 'La Gran Nevada del Siglo en Pajares de 1996',
    icon: '🏔️',
    tag: 'Nevada Histórica Cordillera',
    tagClass: 'memory-tag-snow',
    year: 1996,
    location: 'Puerto de Pajares y Picos de Europa',
    summary: 'Un tren ininterrumpido de frentes del norte acumuló más de 3 metros de nieve en la rampa de Pajares y puertos de la Cordillera. El puerto permaneció cerrado al tráfico durante 12 días consecutivos con pueblos enteros aislados por aludes.'
  },

  // JULIO
  '07-04': {
    dateLabel: '4 de Julio',
    title: 'La Trágica Galerna del Sábado de Gloria (1961)',
    icon: '⛵',
    tag: 'Galerna Cantábrica Trágica',
    tagClass: 'memory-tag-marine',
    year: 1961,
    location: 'Mar Cantábrico y puertos asturianos',
    summary: 'Tras una mañana calurosa de calma chicha, un giro súbito de viento del noroeste entró con furia a más de 110 km/h levantando un mar arbolado en minutos. Sorprendió a decenas de lanchas boniteras en alta mar en la peor tragedia pesquera moderna.'
  },
  '07-17': {
    dateLabel: '17 de Julio',
    title: 'La Mayor Ola de Calor de la Historia Asturiana (2022)',
    icon: '🔥',
    tag: 'Récord Histórico Absoluto',
    tagClass: 'memory-tag-heat',
    year: 2022,
    location: 'Oviedo, Gijón y Cangas del Narcea',
    summary: 'Una cúpula de calor sahariana pulverizó todos los registros históricos jamás medidos en Asturias: 37.0 °C en Oviedo, 36.4 °C en Gijón y 39.5 °C en Cangas del Narcea, superando con creces la barrera histórica de 1928.'
  },

  // AGOSTO
  '08-26': {
    dateLabel: '26 de Agosto',
    title: 'Las Riadas Catastróficas del Cantábrico de 1983',
    icon: '🌧️',
    tag: 'Inundaciones Históricas',
    tagClass: 'memory-tag-rain',
    year: 1983,
    location: 'Oriente de Asturias y cuencas fluviales',
    summary: 'Una gota fría convectiva descargó diluvios torrenciales en el norte de España. En el oriente asturiano desbordaron el Sella y el Cares con crecidas nunca antes vistas, destruyendo puentes, carreteras y anegando vegas agrícolas.'
  }
};

/**
 * Refranero y climatología tradicional asturiana por meses (como fallback inteligente)
 */
const ASTURIAS_SEASONAL_CLIMATE_LORE = {
  0: { // Enero
    title: 'Las Nevaes de Xineru y les Xelaes de Valle',
    icon: '❄️',
    tag: 'Tradición Invernal Asturiana',
    summary: '«En xineru, la nieve en cueru»: Mes dominado por las inversiones térmicas en los fondos de valle y las nortadas de cordillera. El refranero asturiano recuerda que la nieve temprana en cumbres asegura pastos verdes y manantiales llenos para el verano.'
  },
  1: { // Febrero
    title: 'Febrerín el Cuerzu y les Galernes de Seronda',
    icon: '💨',
    tag: 'Climatología Tradicional',
    summary: '«Febreru curtiu y en díes veintiochu, si truena guarda la leña y tamién el gochu»: Época de temporales atlánticos virulentos con rápidos vaivenes de presión y alternancia súbita entre sol y celliscas de aguanieve.'
  },
  2: { // Marzo
    title: 'Marzu Ventosu y les Primeres Foliaes',
    icon: '🌱',
    tag: 'Despertar de la Primavera',
    summary: '«Marzu marzador, de noche lluvia y de día sol»: Inicio del deshielo en las cumbres de los Picos de Europa y despertar de los pastizales con fuertes vientos del suroeste que barren las brumas de los valles.'
  },
  3: { // Abril
    title: 'Abril de Agües Mil y les Borrines del Campu',
    icon: '🌧️',
    tag: 'Temporada de Orbayu y Lluvia',
    summary: '«En abril agües mil, toles que quepan nun barril»: El régimen de precipitaciones atlánticas alcanza su punto de humedad continua en el litoral, abonando la floración del manzano de sidra en las pomaradas asturianas.'
  },
  4: { // Mayo
    title: 'Mayu Floríu y la Entrada del Viento Nordés',
    icon: '🌸',
    tag: 'Brumas Marinas y Flores',
    summary: '«Hasta que mayu nun acabe, nun te quites el sayu»: Aparecen las primeras brumas marinas (borrina) empujadas por el anticiclón de las Azores, manteniendo mañanas frescas y tardes templadas.'
  },
  5: { // Junio
    title: 'El Solsticiu de San Xuan y la Calma Marina',
    icon: '☀️',
    tag: 'Luz Plena y Solsticio',
    summary: '«Pela nueche de San Xuan, los díes más llargos del añu van»: Días de máxima insolación en Asturias, con aguas del Cantábrico templándose progresivamente y noches suaves al calor de las hogueras costeras.'
  },
  6: { // Julio
    title: 'El Resol Costeru y el Caldo del Cantábrico',
    icon: '🏖️',
    tag: 'Verano Cantábrico',
    summary: '«Polo Santiago el sol quema el campu y engrana el grano»: Días de resol litoral donde el nordeste sopla limpio por la tarde, refrescando los arenales y levantando las nieblas matinales de la costa.'
  },
  7: { // Agosto
    title: 'El Veranín de San Llorienzu y les Marexades',
    icon: '🌾',
    tag: 'Canícula Asturiana',
    summary: '«Polo San Roque, l’agua a monte»: Máxima temperatura del agua del mar Cantábrico (alrededor de 21 °C a 22 °C), noches con brisa de tierra y tormentas de calor orográficas en la Cordillera.'
  },
  8: { // Septiembre
    title: 'La Seronda Temprana y la Siega de la Manzana',
    icon: '🍎',
    tag: 'Llegada de la Seronda',
    summary: '«Pela Virxen de Cuadonga, la seronda asoma»: Comienza la recolección de manzana de sidra con cielos diáfanos de otoño, amaneceres frescos con rocío tupido y tardes templadas de viento sur.'
  },
  9: { // Octubre
    title: 'La Seronda Plena, Castañes y Primeres Borrasques',
    icon: '🌰',
    tag: 'Tiempo de Seronda y Castañes',
    summary: '«Pela seronda, castañes y fariñes, y el vientu del sur que l’aire afina»: Época dorada de los hayedos asturianos (Muniellos, Redes, Peloño) con entradas atlánticas que alternan el veranillo con los primeros temporales de mar y nieve en cumbres altas.'
  },
  10: { // Noviembre
    title: 'El Mes del Amagüestu y les Primeres Xelaes',
    icon: '🍂',
    tag: 'Amagüestu y Frío de Seronda',
    summary: '«Polo San Martín, la castaña al botín y el frío a la fin»: Castañes asaes en el tamboril y sidra dulce. Los valles experimentan las primeras heladas severas por inversión térmica bajo cielos estrellados.'
  },
  11: { // Diciembre
    title: 'El Solsticiu d’Iviernu y les Grandes Marees Vives',
    icon: '🕯️',
    tag: 'Invierno Tradicional',
    summary: '«Polo Navidá, l’iviernu ye de verdá»: Mareas vivas de invierno en las rías del Eo, Nalón y Villaviciosa, con cumbres blancas en Pajares y el Angulero navegando las desembocaduras fluviales.'
  }
};

/**
 * Obtiene la efeméride o memoria climática asturiana para una fecha dada (por defecto hoy)
 */
export function getAsturiasClimateMemory(date = new Date()) {
  const month = date.getMonth(); // 0 a 11
  const day = date.getDate(); // 1 a 31
  const key = `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // 1. Si existe efeméride exacta para el día de hoy
  if (ASTURIAS_CLIMATE_MEMORIES[key]) {
    return {
      isSpecificDay: true,
      dayKey: key,
      ...ASTURIAS_CLIMATE_MEMORIES[key]
    };
  }

  // 2. Fallback inteligente estacional y tradicional asturiano para que NUNCA quede vacío
  const lore = ASTURIAS_SEASONAL_CLIMATE_LORE[month] || ASTURIAS_SEASONAL_CLIMATE_LORE[9];
  return {
    isSpecificDay: false,
    dayKey: key,
    dateLabel: `${day} de ${monthNames[month]}`,
    title: lore.title,
    icon: lore.icon,
    tag: lore.tag,
    tagClass: 'memory-tag-lore',
    year: null,
    location: 'Principado de Asturias',
    summary: lore.summary
  };
}
