/**
 * METEOASTUR LODE - Base de Datos Comarcal de Turismo y Planes de Ocio Climático
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Ecosistema Zeustata • Principado de Asturias.
 * Cálculo Geodésico de Proximidad por Coordenadas (Haversine),
 * Arquitectura Ergonómica de Menú Desplegable (Doctrina de Playas y Rutas)
 * y Blindaje Legal Estricto de Datos Abiertos y Seguridad (Leyes 15 y 16).
 */

/**
 * Cálculo de distancia geodésica en km (Fórmula de Haversine)
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return 999;
  const R = 6371; // Radio medio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

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
  // ==========================================
  // 🌧️ PLANES A CUBIERTO (LLUVIA / MAL TIEMPO / INTERIOR)
  // ==========================================
  {
    id: 'niemeyer',
    title: 'Centro Niemeyer & Casco Histórico de Avilés',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🏛️',
    comarca: 'aviles_costa',
    town: 'Avilés',
    lat: 43.5575,
    lon: -5.9189,
    distInfo: 'Avilés centro',
    desc: 'Única obra del arquitecto Óscar Niemeyer en España. Exposiciones de arte moderno, cine y mirador en la cúpula sobre la ría de Avilés.',
    tip: 'Ideal con lluvia o viento: todas las salas, cúpula y pasarelas están conectadas y a cubierto.',
    tag: 'Arte & Arquitectura',
    sections: [
      {
        icon: '🏛️',
        heading: 'Historia y Arquitectura Vanguardista',
        text: 'Diseñado por el legendario arquitecto brasileño Óscar Niemeyer tras recibir el Premio Príncipe de Asturias de las Artes en 1989. Es su única obra en España y destaca por sus curvas fluidas en hormigón blanco: la cúpula, la torre-mirador sobre la ría, el auditorio y el edificio polivalente.'
      },
      {
        icon: '🌧️',
        heading: 'Comportamiento Meteorológico y Refugio',
        text: 'Cuando el Cantábrico descarga lluvia copiosa o soplan vientos del Noroeste, el Centro Niemeyer ofrece un refugio cultural continuo: todas las salas de exposiciones, auditorio y cafetería mirador están climatizados e intercomunicados.'
      },
      {
        icon: '💡',
        heading: 'Consejos Prácticos de Visita',
        text: 'Aparcamiento gratuito en las inmediaciones. Cruza la pasarela peatonal hacia el Casco Antiguo de Avilés (calles Galiana y Rivero con soportales históricos) para completar una tarde resguardada de la lluvia.'
      }
    ]
  },
  {
    id: 'museo_ancla_salinas',
    title: 'Museo de Anclas Philippe Cousteau & Mina de Arnao',
    type: 'indoor',
    weatherType: 'rain',
    icon: '⚓',
    comarca: 'aviles_costa',
    town: 'Castrillón (Arnao)',
    lat: 43.5786,
    lon: -5.9719,
    distInfo: 'Arnao / Salinas',
    desc: 'La mina submarina más antigua de España. Galerías originales del siglo XIX que se adentran por debajo del lecho marino del Cantábrico.',
    tip: 'La visita guiada subterránea bajo el fondo del mar es 100% inmune a la lluvia o temporal exterior.',
    tag: 'Arqueología Industrial',
    sections: [
      {
        icon: '⚓',
        heading: 'Pioneros del Carbón Submarino',
        text: 'La Mina de Arnao (Castrillón) es una joya histórica única en Europa: el primer pozo vertical de Asturias y la primera explotación subterránea que penetró por debajo del lecho marino del Cantábrico.'
      },
      {
        icon: '🌊',
        heading: 'Galerías Submarinas Protegidas',
        text: 'El descenso a las galerías del siglo XIX se realiza bajo techo y roca. Mientras en el exterior rompen las olas o llueve, bajo tierra se respira la historia y el ingenio de los mineros asturianos.'
      },
      {
        icon: '💡',
        heading: 'Entorno de Castrillón y Salinas',
        text: 'Completa la visita en la cercana península de La Peñona con el Museo de Anclas al aire libre o disfrutando de la gastronomía marinera en Salinas y Santa María del Mar.'
      }
    ]
  },
  {
    id: 'laboral_gijon',
    title: 'Laboral Ciudad de la Cultura & Mirador de la Torre',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🏛️',
    comarca: 'gijon_maritimo',
    town: 'Gijón',
    lat: 43.5242,
    lon: -5.6146,
    distInfo: 'Cabueñes',
    desc: 'El edificio civil más imponente de España. Gran patio corintio, teatro monumental, LABoral Centro de Arte contemporáneo y la torre mirador más alta de Asturias (130 m).',
    tip: 'Las galerías climatizadas, claustros cubiertos y salas de exposiciones son el mejor refugio cultural en días grises.',
    tag: 'Monumento Civil',
    sections: [
      {
        icon: '🏛️',
        heading: 'El Coloso Arquitectónico de Gijón',
        text: 'Construida a mediados del siglo XX por el arquitecto Luis Moya Blanco. Es una de las obras arquitectónicas más colosales del país, con una plaza mayor de 150 metros, teatro monumental con cubierta elíptica y torre inspirada en la Giralda de Sevilla.'
      },
      {
        icon: '🌧️',
        heading: 'Refugio Cultural Multidisciplinar',
        text: 'Alberga el Centro de Arte y Creación Industrial, salas de ensayo, café-teatro y visitas guiadas a cubierto que permiten admirar sus mosaicos, azulejos de Talavera y cúpula sin pisar la lluvia.'
      },
      {
        icon: '☕',
        heading: 'Entorno de Cabueñes y Merenderos',
        text: 'A tan solo dos minutos del Jardín Botánico Atlántico y de las tradicionales sidrerías y merenderos del valle de Somió.'
      }
    ]
  },
  {
    id: 'catedral_oviedo_camara_santa',
    title: 'Catedral de San Salvador & Cámara Santa (UNESCO)',
    type: 'indoor',
    weatherType: 'rain',
    icon: '⛪',
    comarca: 'oviedo_centro',
    town: 'Oviedo',
    lat: 43.3627,
    lon: -5.8433,
    distInfo: 'Casco Histórico de Oviedo',
    desc: 'Gótico flamígero y corazón sagrado del Reino de Asturias. Custodia el Santo Sudario de Cristo, la Cruz de la Victoria (908) y la Cruz de los Ángeles (808).',
    tip: 'Visita protegida imprescindible: el claustro gótico, retablo mayor y Cámara Santa ofrecen recogimiento absoluto con lluvia.',
    tag: 'Patrimonio UNESCO',
    sections: [
      {
        icon: '⛪',
        heading: 'El Corazón del Camino Primitivo',
        text: '«Quien va a Santiago y no al Salvador, honra al criado y deja al Señor». La Catedral de Oviedo fue el punto de partida de la primera peregrinación jacobea con el rey Alfonso II el Casto en el siglo IX.'
      },
      {
        icon: '👑',
        heading: 'Las Reliquias Sagradas del Reino',
        text: 'La Cámara Santa (Siglo IX, Patrimonio de la Humanidad) custodia el Santo Sudario, el Arca Santa de cedro con bajorrelieves de plata y las joyas insignes de la monarquía asturiana: la Cruz de los Ángeles y la Cruz de la Victoria.'
      },
      {
        icon: '🥖',
        heading: 'Gastronomía en El Fontán y Bulevar de la Sidra',
        text: 'Al salir, resguárdate bajo los soportales de la Plaza del Fontán o recorre la calle Gascona para degustar fabada y sidra natural.'
      }
    ]
  },
  {
    id: 'acuario_gijon',
    title: 'Bioparc Acuario de Gijón',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🦈',
    comarca: 'gijon_maritimo',
    town: 'Gijón',
    lat: 43.5422,
    lon: -5.6742,
    distInfo: 'Playa de Poniente',
    desc: 'Recorrido por los fondos marinos del Cantábrico y los océanos del mundo: nutrias fluviales, tiburones toro y cientos de especies atlánticas.',
    tip: 'Plan estrella a cubierto a pie de mar en días de temporal costero o fuerte lluvia cantábrica.',
    tag: 'Fauna Marina',
    sections: [
      {
        icon: '🦈',
        heading: 'Inmersión en los Mares del Mundo',
        text: 'Más de 60 acuarios que recrean los ecosistemas desde los ríos de montaña asturianos con nutrias y salmones hasta las profundidades del Cantábrico y arrecifes con tiburones toro.'
      },
      {
        icon: '🌊',
        heading: 'Contemplar el Temporal Costero a Resguardo',
        text: 'Situado en el paseo de Poniente. El acuario está 100% cubierto y climatizado, siendo el plan predilecto cuando azotan frentes atlánticos o galernas en la bahía de Gijón.'
      },
      {
        icon: '🍽️',
        heading: 'Cercanías de Cimavilla y Poniente',
        text: 'A pocos pasos del puerto deportivo, el barrio marinero de Cimavilla y el centro de Gijón para rematar la jornada gastronómica.'
      }
    ]
  },
  {
    id: 'museo_mineria_mumi',
    title: 'MUMI: Museo de la Minería y la Industria',
    type: 'indoor',
    weatherType: 'rain',
    icon: '⛏️',
    comarca: 'cuencas_mineras',
    town: 'El Entrego (SMRA)',
    lat: 43.2844,
    lon: -5.6419,
    distInfo: 'Valle del Nalón',
    desc: 'Descenso en "jaula" a la galería minera subterránea real y simulación de tren de extracción en las entrañas de la tierra.',
    tip: 'Perfecto para días de bastinazu o frío: visita 100% subterránea y climatizada a temperatura constante.',
    tag: 'Patrimonio Minero',
    sections: [
      {
        icon: '⛏️',
        heading: 'Patrimonio e Identidad del Carbón Asturiano',
        text: 'Erigido sobre el histórico pozo San Vicente en El Entrego. Muestra la gesta obrera, la maquinaria de vapor, la brigada de salvamento minero y la tecnología que impulsó la revolución industrial en Asturias.'
      },
      {
        icon: '🌧️',
        heading: 'Protección Térmica y Meteorológica',
        text: 'El descenso en la jaula a la galería subterránea recrea fielmente las entrañas de la tierra. La temperatura subterránea es constante (~14-16°C), convirtiéndolo en un refugio insuperable en días de temporal, frío o aguanieve.'
      },
      {
        icon: '🍲',
        heading: 'Gastronomía y Entorno Comarcal',
        text: 'Tras la visita, disfruta en El Entrego de su plato gastronómico emblemático: las cebollas rellenas de bonito, acompañadas de sidra natural de los valles del Nalón.'
      }
    ]
  },
  {
    id: 'muja_colunga',
    title: 'MUJA: Museo del Jurásico de Asturias',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🦖',
    comarca: 'oriente_picos',
    town: 'Colunga',
    lat: 43.5011,
    lon: -5.2742,
    distInfo: 'Rasa de San Telmo',
    desc: 'Edificio en forma de huella tridáctila gigante. Una de las colecciones de fósiles y esqueletos de dinosaurio más completas del mundo.',
    tip: 'Si arrecia el temporal cantábrico, el interior ofrece horas de divulgación protegida para toda la familia.',
    tag: 'Fósiles & Ciencia',
    sections: [
      {
        icon: '🦖',
        heading: 'La Costa de los Dinosaurios',
        text: 'El litoral entre Gijón, Villaviciosa y Ribadesella alberga uno de los registros fósiles del período Jurásico más ricos del planeta. El edificio reproduce una gigantesca huella tridáctila dividida en Triásico, Jurásico y Cretácico con esqueletos a escala real.'
      },
      {
        icon: '🌊',
        heading: 'Microclima de la Rasa de San Telmo',
        text: 'Situado en un acantilado panorámico sobre el mar Cantábrico. Con temporal marino o lluvia intensa, el museo permite admirar la bravura del oleaje desde sus grandes ventanales mientras se disfruta de las exposiciones a cubierto.'
      },
      {
        icon: '💡',
        heading: 'Consejo de Visita y Cercanías',
        text: 'A tan solo 10 minutos de la villa marinera de Lastres y de la playa de La Griega, donde con bajamar pueden contemplarse icnitas (huellas reales) en las rocas del acantilado.'
      }
    ]
  },
  {
    id: 'museo_sidra_nava',
    title: 'Museo de la Sidra de Asturias',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🍏',
    comarca: 'oviedo_centro',
    town: 'Nava',
    lat: 43.3578,
    lon: -5.5036,
    distInfo: 'Comarca de la Sidra',
    desc: 'Descubre todo el ciclo del manzano, la fermentación en llagar, el escanciado interactivo y los juegos tradicionales asturianos.',
    tip: 'Magnífico refugio contra el orbayu antes de disfrutar de una espicha en los llagares de la zona.',
    tag: 'Cultura de la Sidra',
    sections: [
      {
        icon: '🍏',
        heading: 'El Alma Líquida del Principado',
        text: 'Un recorrido interactivo por el cultivo de la manzana de sidra (pomaradas), el mayado en el llagar, la fermentación en toneles de castaño y el rito social único del escanciado asturiano.'
      },
      {
        icon: '🌧️',
        heading: 'El Antídoto Perfecto contra el Orbayu',
        text: 'Nava se ubica en el valle central asturiano, frecuentemente expuesto al orbayu cantábrico. El museo ofrece juegos tradicionales (bolos asturianos, rana) y simuladores en un recinto cálido y acogedor.'
      },
      {
        icon: '🥖',
        heading: 'Espicha y Gastronomía Tradicional',
        text: 'Combina la visita con una espicha en los llagares artesanales del concejo: sidra espichada directamente del tonel, tortilla de bacalao, empanada y quesos asturianos.'
      }
    ]
  },
  {
    id: 'tito_bustillo',
    title: 'Cueva de Tito Bustillo & Centro de Arte Rupestre',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🦣',
    comarca: 'oriente_picos',
    town: 'Ribadesella',
    lat: 43.4611,
    lon: -5.0642,
    distInfo: 'Ribadesella',
    desc: 'Patrimonio de la Humanidad por la UNESCO. Uno de los santuarios de arte paleolítico más importantes y deslumbrantes de Europa.',
    tip: 'Ambiente en cueva protegido de las inclemencias meteorológicas exteriores.',
    tag: 'Arte Paleolítico',
    sections: [
      {
        icon: '🦣',
        heading: 'Santuario del Paleolítico Superior (UNESCO)',
        text: 'Descubierta en 1968 por jóvenes espeleólogos locales. Conserva paneles de caballos polícromos, renos, signos antropomorfos y estalactitas milenarias de hace más de 14.000 años.'
      },
      {
        icon: '🌧️',
        heading: 'Ambiente Subterráneo Inmune al Clima',
        text: 'Tanto la cueva natural como el vanguardista Centro de Arte Rupestre anexo garantizan una visita sin depender de la lluvia exterior, con humedad constante y temperatura controlada.'
      },
      {
        icon: '📍',
        heading: 'Plan en Ribadesella',
        text: 'Paseo por el puerto pesquero de Ribadesella, la desembocadura del río Sella y el barrio marinero del Portiellu, ideal para degustar pescados de roca y mariscos del Cantábrico.'
      }
    ]
  },
  {
    id: 'museo_bellas_artes',
    title: 'Museo de Bellas Artes de Asturias',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🎨',
    comarca: 'oviedo_centro',
    town: 'Oviedo',
    lat: 43.3622,
    lon: -5.8436,
    distInfo: 'Casco Antiguo de Oviedo',
    desc: 'Una de las mejores pinacotecas públicas de España: obras maestras de El Greco, Goya, Sorolla, Picasso y Dalí en el Palacio de Velarde.',
    tip: 'Entrada gratuita. Plan cultural supremo para pasear resguardado en el corazón de Vetusta.',
    tag: 'Bellas Artes',
    sections: [
      {
        icon: '🎨',
        heading: 'Una Pinacoteca de Referencia Nacional',
        text: 'Alberga más de 15.000 piezas artísticas desde la Edad Media hasta la vanguardia contemporánea. Destacan el Apostolado de El Greco, lienzos de Murillo, Zurbarán, Goya, Sorolla, Regoyos, Evaristo Valle y Nicanor Piñole.'
      },
      {
        icon: '🌧️',
        heading: 'Refugio Cultural en la Catedral de Oviedo',
        text: 'Ubicado a escasos metros de la Catedral de San Salvador, en el Palacio de Velarde y la Casa de Oviedo-Portal. Espacios interiores amplios y silenciosos para disfrutar de horas de arte sin mirar el paraguas.'
      },
      {
        icon: '☕',
        heading: 'Paseo por Vetusta',
        text: 'Al salir, la Plaza del Fontán, las confiterías centenarias de carbayones y moscovitas de Oviedo ofrecen el complemento dulce perfecto.'
      }
    ]
  },
  {
    id: 'museo_ferrocarril_gijon',
    title: 'Museo del Ferrocarril de Asturias',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🚂',
    comarca: 'gijon_maritimo',
    town: 'Gijón',
    lat: 43.5414,
    lon: -5.6728,
    distInfo: 'Estación del Norte',
    desc: 'Una de las mayores colecciones ferroviarias de vapor de Europa en las antiguas vías y andenes cubiertos de la Estación del Norte.',
    tip: 'Visita 100% resguardada entre locomotoras históricas de vía ancha y estrecha, tranvías y coches de madera de época.',
    tag: 'Trenes de Vapor',
    sections: [
      {
        icon: '🚂',
        heading: 'La Gran Memoria del Ferrocarril en el Norte',
        text: 'Asturias fue la región con mayor densidad de líneas férreas por kilómetro cuadrado de España gracias a la minería y siderurgia. El museo conserva más de 50 locomotoras de vapor, tranvías urbanos y vagones históricos.'
      },
      {
        icon: '🌧️',
        heading: 'Andenes Cubiertos frente a la Lluvia',
        text: 'Los antiguos tinglados y naves ferroviarias proporcionan un paseo cubierto perfecto para familias en días grises o lluviosos en Gijón.'
      },
      {
        icon: '📍',
        heading: 'Enlace con Poniente y Puerto',
        text: 'Ubicado a 200 metros de la playa de Poniente y del Acuario de Gijón, permitiendo encadenar dos visitas sin apenas desplazarse.'
      }
    ]
  },
  {
    id: 'parque_prehistoria_teverga',
    title: 'Parque de la Prehistoria & Cueva Huerta',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🦣',
    comarca: 'oviedo_centro',
    town: 'Teverga',
    lat: 43.1594,
    lon: -6.0967,
    distInfo: 'San Salvador de Teverga',
    desc: 'La mayor réplica subterránea de arte rupestre europeo en la Galería y Cueva de Cuevas, junto con un cercado exterior de bisontes europeos y caballos Przewalski.',
    tip: 'La recreación en la cueva artificial subterránea está a temperatura constante y completamente a cubierto.',
    tag: 'Prehistoria & Cuevas',
    sections: [
      {
        icon: '🦣',
        heading: 'El Universo Paleolítico Reproducido',
        text: 'Contiene reproducciones hiperrealistas de las pinturas rupestres más inaccesibles del mundo (Tito Bustillo, Altamira, Niaux, Lascaux y Chauvet) en un entorno rocoso climatizado.'
      },
      {
        icon: '🌧️',
        heading: 'Refugio de Montaña bajo Techo',
        text: 'En días fríos o lluviosos en los Valles del Trubia, el museo y la Cueva de Cuevas ofrecen un viaje fascinante a la Edad del Hielo sin mojarse.'
      },
      {
        icon: '🍲',
        heading: 'Gastronomía Tevergana',
        text: 'En San Martín y La Plaza degusta el tradicional pote tevergano, carne de caza y los célebres suspiros de Teverga.'
      }
    ]
  },
  {
    id: 'museo_maritimo_luanco',
    title: 'Museo Marítimo de Asturias en Luanco',
    type: 'indoor',
    weatherType: 'rain',
    icon: '⛵',
    comarca: 'aviles_costa',
    town: 'Gozón (Luanco)',
    lat: 43.6156,
    lon: -5.7928,
    distInfo: 'Luanco marinero',
    desc: 'El museo decano de la costa asturiana con maquetas navales artesanales, cartas náuticas históricas, aparejos balleneros y memoria de los pescadores cantábricos.',
    tip: 'Plan idóneo frente al mar en días de lluvia o temporal antes de tapear por las tabernas marineras de Luanco.',
    tag: 'Historia Marina',
    sections: [
      {
        icon: '⛵',
        heading: 'Memoria Viva del Cantábrico',
        text: 'Fundado en 1948, custodia una de las colecciones de carpintería de ribera, artes de pesca y biología marina más completas de España, con un esqueleto completo de ballena piloto.'
      },
      {
        icon: '🌧️',
        heading: 'Paseo Resguardado en la Villa Marinera',
        text: 'Ubicado en el casco histórico de Luanco, a cubierto de los temporales del Nordeste. Al salir, prueba las marañuelas típicas recién horneadas.'
      },
      {
        icon: '🐟',
        heading: 'Mariscos y Pescados de Roca',
        text: 'Los restaurantes del muelle viejo de Luanco ofrecen besugo, lubina y nécoras frescas capturadas por la flota artesanal de Gozón.'
      }
    ]
  },
  {
    id: 'archivo_indianos_colombres',
    title: 'Archivo de Indianos & Quinta Guadalupe',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🌴',
    comarca: 'oriente_picos',
    town: 'Ribadedeva (Colombres)',
    lat: 43.3764,
    lon: -4.5383,
    distInfo: 'Límite Oriental',
    desc: 'Palacio azul cobalto de la Quinta Guadalupe (1906), testimonio monumental de los emigrantes asturianos que regresaron de América con grandes fortunas.',
    tip: 'Visita a cubierto en un palacete modernista deslumbrante que repasa la epopeya de la emigración a Cuba y México.',
    tag: 'Arquitectura Indiana',
    sections: [
      {
        icon: '🌴',
        heading: 'La Huella de Ultramar en Asturias',
        text: 'Edificado por el indiano Íñigo Noriega Laso. Alberga muebles de época, cartas de barco, fotografías y objetos que narran el sueño americano de miles de jóvenes asturianos.'
      },
      {
        icon: '🌧️',
        heading: 'Interior Palaciego Climatizado',
        text: 'Sus salones nobles, biblioteca y vidrieras artísticas permiten disfrutar de una visita señorial a cubierto de la lluvia del extremo oriental asturiano.'
      },
      {
        icon: '🏛️',
        heading: 'Pueblo Ejemplar de Colombres',
        text: 'Colombres fue galardonado como Pueblo Ejemplar de Asturias por su deslumbrante concentración de casonas indianas modernistas.'
      }
    ]
  },
  {
    id: 'museo_etnografico_grandas',
    title: 'Museo Etnográfico de Grandas de Salime',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🌾',
    comarca: 'occidente_eonavia',
    town: 'Grandas de Salime',
    lat: 43.2167,
    lon: -6.8744,
    distInfo: 'Tierras del Navia',
    desc: 'Uno de los museos etnográficos más grandes y fascinantes de Europa. Recrea un pueblo tradicional asturiano con herrería viva, molino, telar, barbería y escuela de época.',
    tip: 'Visita protegida por los antiguos soportales de pizarra y naves interiores llenas de memoria rural viva.',
    tag: 'Etnografía Rural',
    sections: [
      {
        icon: '🌾',
        heading: 'La Gran Enciclopedia del Mundo Rural',
        text: 'Ocupa la antigua casa rectoral de Grandas. Más de 3.000 metros cuadrados dedicados a los oficios ancestrales de la pizarra, la madera, el hierro y la vida autosuficiente de montaña.'
      },
      {
        icon: '🌧️',
        heading: 'Refugio de Piedra y Pizarra',
        text: 'En el suroccidente asturiano, los días de lluvia o frío cobran una calidez especial entre los muros centenarios y las lumbres de la cocina tradicional.'
      },
      {
        icon: '💡',
        heading: 'Presa de Salime y Camino Primitivo',
        text: 'Combínalo con las impresionantes vistas del Salto de Grandas de Salime y el paso de los peregrinos del Camino Primitivo hacia Galicia.'
      }
    ]
  },
  {
    id: 'colegiata_momias_teverga',
    title: 'Colegiata de San Pedro & Momias de Teverga',
    type: 'indoor',
    weatherType: 'rain',
    icon: '🏛️',
    comarca: 'oviedo_centro',
    town: 'Teverga (La Plaza)',
    lat: 43.1583,
    lon: -6.1033,
    distInfo: 'Valles del Trubia',
    desc: 'Templo de transición prerrománico-románico del siglo XI. En su cripta se conservan incorruptas las momias del Marqués de Valdecarzana y su hijo el abad de Teverga.',
    tip: 'Visita protegida y llena de misterio histórico en uno de los valles más salvajes de Asturias.',
    tag: 'Misterio & Historia',
    sections: [
      {
        icon: '🏛️',
        heading: 'El Templo Milenario de los Valles',
        text: 'Construida entre los años 1069 y 1076, su escultura románica primitiva y sus capiteles historiados son únicos en la Cordillera Cantábrica.'
      },
      {
        icon: '🌧️',
        heading: 'Misterio bajo la Lluvia de Montaña',
        text: 'La cripta y las naves de piedra gruesa ofrecen un ambiente silencioso y sobrecogedor, perfecto para una parada cultural en días grises.'
      },
      {
        icon: '🍲',
        heading: 'Pote y Pan de Escanda',
        text: 'Prueba en los mesones de La Plaza el pan de escanda tradicional asturiano y los embutidos de jabalí y ciervo.'
      }
    ]
  },

  // ==========================================
  // ☀️ PLANES DE EXTERIOR (SOL / DESPEJADO / MIRADORES / COSTA)
  // ==========================================
  {
    id: 'cabo_penas',
    title: 'Espacio Protegido y Faro de Cabo Peñas',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '🌊',
    comarca: 'aviles_costa',
    town: 'Gozón',
    lat: 43.6547,
    lon: -5.8503,
    distInfo: 'Punta Norte de Asturias',
    desc: 'El cabo más septentrional del Principado con acantilados de más de 100 metros sobre el Cantábrico y sendas de pasarelas de madera.',
    tip: 'Día soleado para ver el horizonte infinito. Con viento fuerte llevar cortavientos.',
    tag: 'Acantilados Salvajes',
    sections: [
      {
        icon: '🌊',
        heading: 'El Vértice Norte del Paraíso Natural',
        text: 'Acantilados verticales de cuarcita de más de 100 metros de caída sobre el océano. El faro centenario alberga el Centro de Recepción e Interpretación del Medio Marino de Peñas.'
      },
      {
        icon: '☀️',
        heading: 'Meteo y Observación Marina',
        text: 'Bajo cielos soleados la luz marina es deslumbrante y permite divisar cetáceos y aves marinas migratorias desde las pasarelas de madera protegidas.'
      },
      {
        icon: '⚓',
        heading: 'Villas de Luanco y Candás',
        text: 'A tan solo 10 minutos se encuentran las villas marineras de Luanco y Candás, perfectas para pasear y degustar marisco, bonito y marañuelas.'
      }
    ]
  },
  {
    id: 'mirador_fitu',
    title: 'Mirador del Fitu: Balcón del Cantábrico',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '🔭',
    comarca: 'oriente_picos',
    town: 'Caravia / Parres',
    lat: 43.4419,
    lon: -5.1931,
    distInfo: 'Sierra del Sueve',
    desc: 'Estructura volada de hormigón construida en 1927 con vista de 360°: a un lado las cumbres de Picos de Europa y al otro el mar Cantábrico.',
    tip: 'Imprescindible día despejado para disfrutar de la panorámica más famosa de Asturias.',
    tag: 'Panorámica 360°',
    sections: [
      {
        icon: '🔭',
        heading: 'Un Balcón Suspendido en el Aire',
        text: 'Construido en 1927 en el alto de la Collada de Belmonte (Sierra del Sueve). Su diseño de hormigón en voladizo permite contemplar una panorámica circular irrepetible que abarca desde la costa cantábrica hasta las nieves de Picos de Europa.'
      },
      {
        icon: '☀️',
        heading: 'Condiciones Meteorológicas Óptimas',
        text: 'Requiere cielos despejados o nubes altas sin niebla. En días claros con visibilidad superior a 25 km se divisan más de 10 concejos asturianos simultáneamente.'
      },
      {
        icon: '🐎',
        heading: 'Caballos Asturcones del Sueve',
        text: 'En los pastos circundantes del puerto es frecuente observar en libertad al caballo asturcón, raza autóctona milenaria del Principado.'
      }
    ]
  },
  {
    id: 'prerromanico_naranco',
    title: 'Monumentos Prerrománicos del Monte Naranco',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '👑',
    comarca: 'oviedo_centro',
    town: 'Oviedo',
    lat: 43.3800,
    lon: -5.8672,
    distInfo: 'Monte Naranco',
    desc: 'Santa María del Naranco y San Miguel de Lillo (Siglo IX, UNESCO). Joyas arquitectónicas únicas en el mundo con vistas sobre toda la ciudad de Oviedo.',
    tip: 'Luz dorada de media tarde con sol ideal para fotografía y paseo por las campas del Naranco.',
    tag: 'Patrimonio de la Humanidad',
    sections: [
      {
        icon: '👑',
        heading: 'Joyas del Reino de Asturias (Siglo IX)',
        text: 'Mandadas construir por el rey Ramiro I en el año 842 como palacio de recreo y aula regia. Su arquitectura abovedada anticipó el románico europeo en casi dos siglos y son Patrimonio de la Humanidad.'
      },
      {
        icon: '☀️',
        heading: 'Luz y Fotografía en la Ladera Sur',
        text: 'La orientación sur del Monte Naranco recibe abundante insolación en días despejados, ofreciendo una vista panorámica privilegiada sobre toda la ciudad de Oviedo y la Sierra del Aramo.'
      },
      {
        icon: '🌳',
        heading: 'Campas y Naturaleza al Lado de la Ciudad',
        text: 'Las campas que rodean los monumentos son idóneas para pasear, relajarse sobre la hierba o subir a la cumbre del Sagrado Corazón.'
      }
    ]
  },
  {
    id: 'senda_oso_cercado',
    title: 'Senda del Oso & Cercado de los Osos Pardos',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '🐻',
    comarca: 'oviedo_centro',
    town: 'Proaza / Santo Adriano',
    lat: 43.2505,
    lon: -6.0167,
    distInfo: 'Valles del Trubia',
    desc: 'Vía verde sobre el antiguo ferrocarril minero que atraviesa desfiladeros y túneles de roca caliza junto al cercado osero de Paca y Molina.',
    tip: 'Alquiler de bicis y paseo familiar idóneo con sol suave o cielos poco nubosos.',
    tag: 'Vía Verde Familiar',
    sections: [
      {
        icon: '🐻',
        heading: 'La Gran Vía Verde Asturiana',
        text: 'Discurre en suave descenso por el trazado del tren del carbón que unía Quirós y Teverga con Trubia. El desfiladero de Peñas Juntas es uno de sus pasos más sobrecogedores.'
      },
      {
        icon: '☀️',
        heading: 'Pedaleo Soleado entre Desfiladeros',
        text: 'Con tiempo seco y soleado es el plan familiar por excelencia de Asturias: alquiler de bicicletas con recogida en furgoneta al final del trayecto.'
      },
      {
        icon: '🧀',
        heading: 'Gastronomía en Proaza',
        text: 'Detente en Proaza para probar los platos de caza, miel de brezo local y el arroz con leche con costra requemada.'
      }
    ]
  },
  {
    id: 'jardin_botanico_gijon',
    title: 'Jardín Botánico Atlántico de Gijón',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '🌺',
    comarca: 'gijon_maritimo',
    town: 'Gijón',
    lat: 43.5218,
    lon: -5.6175,
    distInfo: 'Cabueñes',
    desc: 'Más de 25 hectáreas y 30.000 plantas de cuatro entornos atlánticos. El Carbayón centenario de la Isla y el laberinto de laureles son iconos de la botánica viva.',
    tip: 'Día soleado para recorrer las cuatro zonas temáticas y pasear por la aliseda pantanosa del arroyo Peñafrancia.',
    tag: 'Jardín Botánico',
    sections: [
      {
        icon: '🌺',
        heading: 'Museo Vivo del Mundo Atlántico',
        text: 'Pionero en la conservación de la flora del norte peninsular. Destaca la Carbayera de El Tragamón con robles de más de 400 años y el Jardín de La Isla de estilo romántico.'
      },
      {
        icon: '☀️',
        heading: 'Paseo Luminoso al Aire Libre',
        text: 'Bajo el sol asturiano, los senderos entre estanques, pasarelas de madera y praderas floridas invitan al descanso y la fotografía de naturaleza.'
      },
      {
        icon: '💡',
        heading: 'Visita Didáctica Familiar',
        text: 'Cuenta con itinerarios infantiles autoguiados, laberinto vegetal interactivo y merendero acondicionado a la sombra de los árboles.'
      }
    ]
  },
  {
    id: 'bufones_pria_llanes',
    title: 'Bufones de Pría & Costa Acantilada de Llanes',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '💨',
    comarca: 'oriente_picos',
    town: 'Llanes',
    lat: 43.4589,
    lon: -4.9753,
    distInfo: 'Llames de Pría',
    desc: 'Chimeneas kársticas marinas donde el oleaje del Cantábrico se pulveriza y brama hacia el cielo en columnas de agua salada de hasta 20 metros de altura.',
    tip: 'Espectáculo sobrecogedor en días de pleamar viva y mar de fondo atlántico.',
    tag: 'Géiser Marino',
    sections: [
      {
        icon: '💨',
        heading: 'La Fuerza Telúrica del Cantábrico',
        text: 'Grietas verticales abiertas en la roca caliza por la erosión marina. Cuando el mar empuja con fuerza, el aire comprimido y el agua pulverizada salen expulsados con un bramido audible a kilómetros.'
      },
      {
        icon: '🌊',
        heading: 'Condiciones de Seguridad Indispensables',
        text: 'Aunque es un espectáculo majestuoso, respeta siempre los perímetros de seguridad: nunca te asomes sobre la boca del bufón cuando el mar empuja.'
      },
      {
        icon: '🏖️',
        heading: 'Playa de Guadamía',
        text: 'A pocos metros se encuentra la playa fluvial de Guadamía, un cañón de aguas tranquilas encajado entre acantilados calizos.'
      }
    ]
  },
  {
    id: 'luarca_jardines_fontebaixa',
    title: 'Luarca, Villa Blanca y Jardines de la Fonte Baixa',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '⚓',
    comarca: 'occidente_eonavia',
    town: 'Valdés (Luarca)',
    lat: 43.5433,
    lon: -6.5333,
    distInfo: 'Costa Occidental',
    desc: 'La villa blanca de la costa verde, con sus siete puentes marineros, el cementerio panorámico más bello del Cantábrico y los jardines botánicos privados de la Fonte Baixa.',
    tip: 'Día luminoso para pasear por los miradores del faro de La Atalaya y el barrio de pescadores de El Cambaral.',
    tag: 'Villa Marinera',
    sections: [
      {
        icon: '⚓',
        heading: 'La Villa Blanca del Nobel Severo Ochoa',
        text: 'Cuna del premio Nobel Severo Ochoa. Su puerto pesquero resguardado, sus casas indianas del barrio de Villar y sus puentes curvos sobre el río Negro son postales vivas de Asturias.'
      },
      {
        icon: '🌺',
        heading: 'Jardines de la Fonte Baixa',
        text: 'Considerado el mayor jardín botánico privado de Europa, con más de 20 hectáreas de camelias, hortensias y rododendros asomados directamente sobre los acantilados de Luarca.'
      },
      {
        icon: '🐟',
        heading: 'Pescados del Cantábrico',
        text: 'Degusta en el muelle pesquero merluza del pincho de Luarca, calamares de potera y sidra artesanal frente a los barcos de bajura.'
      }
    ]
  },
  {
    id: 'llagares_villaviciosa',
    title: 'Ría de Villaviciosa & Llagares de la Manzana',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '🍏',
    comarca: 'gijon_maritimo',
    town: 'Villaviciosa',
    lat: 43.4811,
    lon: -5.4331,
    distInfo: 'Capital Manzanera',
    desc: 'El estuario más protegido de Asturias, reserva natural de aves migratorias, casco histórico ilustrado y llagares centenarios de sidra natural y espumosa.',
    tip: 'Paseo soleado al borde de la ría y visita a bodegas tradicionales de manzana.',
    tag: 'Reserva Natural & Sidra',
    sections: [
      {
        icon: '🍏',
        heading: 'El Corazón Manzanero de Asturias',
        text: 'Villaviciosa concentra las mayores pomaradas y llagares de sidra de la región. El casco histórico conserva palacios renacentistas y la iglesia románica de Santa María de la Oliva.'
      },
      {
        icon: '☀️',
        heading: 'La Ría y la Playa de Rodiles',
        text: 'En días claros de sol, el paseo de madera a lo largo del estuario es un paraíso para el avistamiento de garzas, espátulas y cormoranes, desembocando en el pinar de Rodiles.'
      },
      {
        icon: '🦐',
        heading: 'Puerto de El Puntal y Tazones',
        text: 'Completa la jornada en el cercano puerto pesquero de Tazones, donde desembarcó el emperador Carlos V en 1517, comiendo centollos y marisco vivo.'
      }
    ]
  },
  {
    id: 'castro_coana',
    title: 'Castro de Coaña y Vía Céltica',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '🛖',
    comarca: 'occidente_eonavia',
    town: 'Coaña',
    lat: 43.5186,
    lon: -6.7483,
    distInfo: 'Cuenca del Navia',
    desc: 'Poblado castreño fortificado de la Edad del Hierro mejor conservado del norte peninsular con murallas y saunas castreñas.',
    tip: 'Paseo al aire libre entre bancales milenarios bajo cielos claros o sol tamizáu.',
    tag: 'Cultura Castreña',
    sections: [
      {
        icon: '🛖',
        heading: 'La Gran Capital de la Cultura Castreña',
        text: 'Excavado desde finales del siglo XIX, muestra más de 80 cabañas circulares, calles empedradas, foso defensivo, muralla de módulo romano y el célebre edificio de la sauna castreña con piscina ritual.'
      },
      {
        icon: '☀️',
        heading: 'Visita Soleada en la Cuenca del Navia',
        text: 'El recinto se recorre a cielo abierto entre suaves bancales y pinares. Los días soleados o con sol tamizáu son ideales para apreciar los muros de mampostería de pizarra.'
      },
      {
        icon: '🗺️',
        heading: 'Ruta por el Occidente Asturiano',
        text: 'Complemento perfecto para combinar con la ría de Navia, el puerto pesquero de Puerto de Vega y las playas occidentales de Frexulfe y Barayo.'
      }
    ]
  },
  {
    id: 'senda_cervigon',
    title: 'Senda del Cervigón y Rinconeda',
    type: 'outdoor',
    weatherType: 'sun',
    icon: '🏖️',
    comarca: 'gijon_maritimo',
    town: 'Gijón',
    lat: 43.5381,
    lon: -5.6467,
    distInfo: 'Gijón Litoral',
    desc: 'Paseo volado sobre el mar desde la playa de San Lorenzo hasta La Ñora pasando por las calas vírgenes de Estaño y Serín.',
    tip: 'Paseo marítimo glorioso con sol o brisa suave.',
    tag: 'Paseo Costero',
    sections: [
      {
        icon: '🏖️',
        heading: 'El Gran Paseo Volado del Cantábrico',
        text: 'Senda peatonal que bordea los acantilados orientales de Gijón pasando por el monumento a la Madre del Emigrante ("La Lloca del Rinconín"), miradores sobre el mar y calas de aguas turquesas.'
      },
      {
        icon: '☀️',
        heading: 'Brisa Marina y Soleamiento',
        text: 'Orientada al Norte y Este, recibe sol directo durante toda la jornada. En días despejados o con brisa suave de Nordeste es uno de los paseos costeros más bellos de España.'
      },
      {
        icon: '🚶‍♂️',
        heading: 'Distancia y Ergonomía',
        text: 'Fácilmente modulable: puedes recorrer solo el tramo de San Lorenzo a El Rinconín (2 km) o continuar hasta la playa de Estaño (6 km) o La Ñora (9 km).'
      }
    ]
  },

  // ==========================================
  // 🌫️ PLANES DE NIEBLA / BOSQUES / BRUMA / PAISAJE MÁGICO
  // ==========================================
  {
    id: 'cudillero_villa',
    title: 'Villa Marinera de Cudillero',
    type: 'nature',
    weatherType: 'fog',
    icon: '🏘️',
    comarca: 'occidente_eonavia',
    town: 'Cudillero',
    lat: 43.5636,
    lon: -6.1456,
    distInfo: 'Costa Occidental',
    desc: 'Pueblo marinero escalonado en forma de anfiteatro natural sobre el mar, con casas de vivos colores y puerto pesquero.',
    tip: 'Precioso tanto con sol como en días de nubes bajas y bruma marina cantábrica.',
    tag: 'Villa Marinera',
    sections: [
      {
        icon: '🏘️',
        heading: 'El Anfiteatro Marinero de Asturias',
        text: 'Encajado en una garganta natural frente al mar. Sus casas cuelgan de las laderas en bancales superpuestos y su dialecto propio ("el pixuetu") atestigua siglos de aislamiento y tradición pescadora.'
      },
      {
        icon: '🌫️',
        heading: 'Brumas y Luces del Cantábrico',
        text: 'Con niebla marina o nubes bajas, el contraste de las fachadas de colores pastel emergiendo de la bruma sobre el agua crea una estampa cinematográfica inigualable.'
      },
      {
        icon: '🐟',
        heading: 'Gastronomía Pixueta',
        text: 'En la plaza de la Marina prueba el curadillo (pescado secado al viento de la costa sin sal), pixín (rape), calamares de potera y sidra bien tirada.'
      }
    ]
  },
  {
    id: 'santianes_pravia_prerromanico',
    title: 'Iglesia de Santianes de Pravia & Museo del Rey Silo',
    type: 'indoor',
    weatherType: 'fog',
    icon: '👑',
    comarca: 'occidente_eonavia',
    town: 'Pravia',
    lat: 43.4917,
    lon: -6.1111,
    distInfo: 'Bajo Nalón',
    desc: 'El templo cristiano prerrománico más antiguo conservado de España (año 774). Mandado edificar por los reyes Silo y Adosinda durante la corte de Pravia.',
    tip: 'Lugar místico y de recogimiento protegido, con un centro de interpretación contiguo con la inscripción laberíntica del acróstico real.',
    tag: 'Cuna Prerrománica',
    sections: [
      {
        icon: '👑',
        heading: 'La Corte de Pravia del Siglo VIII',
        text: 'Antes de que la capital pasara a Oviedo, Pravia fue el centro neurálgico del Reino de Asturias. Santianes es el testimonio en pie más antiguo de la fe y la arquitectura medieval hispánica.'
      },
      {
        icon: '🌫️',
        heading: 'Brumas del Río Nalón',
        text: 'Ubicada a orillas del Bajo Nalón, en días de niebla o bruma fluvial el templo transmite una paz monástica imperturbable.'
      },
      {
        icon: '🍰',
        heading: 'Dulces de Pravia',
        text: 'Pasea por el casco histórico de Pravia y prueba en sus confiterías los célebres "llendares" y pasteles de manzana.'
      }
    ]
  },
  {
    id: 'parque_redes',
    title: 'Parque Natural de Redes (Ruta del Alba)',
    type: 'nature',
    weatherType: 'fog',
    icon: '🌲',
    comarca: 'cuencas_mineras',
    town: 'Sobrescobio / Caso',
    lat: 43.2089,
    lon: -5.4678,
    distInfo: 'Alto Nalón',
    desc: 'Desfiladeros de roca caliza, cascadas de agua cristalina y hayedos centenarios declarados Reserva de la Biosfera.',
    tip: 'Con tiempo nublado o brumoso, el rumor del agua y el musgo verde brillan con luz especial.',
    tag: 'Reserva Biosfera',
    sections: [
      {
        icon: '🌲',
        heading: 'Reserva de la Biosfera del Alto Nalón',
        text: 'Comprende los concejos de Caso y Sobrescobio. Destaca por sus hayedos atlánticos, majadas tradicionales, bosques de ribera y desfiladeros tallados por el río Nalón y el río Alba.'
      },
      {
        icon: '🌫️',
        heading: 'Atmósfera Sombría y Frescor Natural',
        text: 'Los días cubiertos o de niebla tamizada son perfectos para adentrarse en los desfiladeros calizos: la vegetación exhala sus mejores aromas y la luz difusa resalta el verde intenso de los helechos.'
      },
      {
        icon: '🧀',
        heading: 'Queso Casín y Gastronomía',
        text: 'Imprescindible saborear el Queso Casín (uno de los más antiguos de Europa elaborado con leche cruda y moldeado a mano con sello de madera) y los embutidos de caza.'
      }
    ]
  },
  {
    id: 'bosque_muniellos',
    title: 'Reserva Integral de Muniellos & Fuentes del Narcea',
    type: 'nature',
    weatherType: 'fog',
    icon: '🍂',
    comarca: 'occidente_eonavia',
    town: 'Cangas del Narcea',
    lat: 43.0333,
    lon: -6.7000,
    distInfo: 'Suroccidente Asturiano',
    desc: 'El mayor robledal de España y uno de los mejor conservados de Europa. Hogar del oso pardo y urogallo cantábrico.',
    tip: 'La niebla o borrina otoñal dota al robledal de una atmósfera mágica e indescriptible.',
    tag: 'Naturaleza Pura',
    sections: [
      {
        icon: '🍂',
        heading: 'Santuario Biológico y Reserva Integral',
        text: 'El mayor robledal albar de España y uno de los ecosistemas forestales mejor conservados de Europa occidental. Su acceso está estrictamente regulado a 20 visitantes diarios para proteger su fauna (oso pardo, urogallo cantábrico y lobo).'
      },
      {
        icon: '🌫️',
        heading: 'La Magia de la Borrina en el Robledal',
        text: 'La niebla y la humedad atlántica son el motor vital de Muniellos: nutren líquenes milenarios, musgos sobre las ramas y confieren al bosque una solemnidad mística incomparable.'
      },
      {
        icon: '🍷',
        heading: 'Vinos de Cangas del Narcea',
        text: 'En el valle, visita las bodegas de vino de alta montaña con denominación D.O.P. Cangas, único en Asturias gracias al microclima suroccidental.'
      }
    ]
  },
  {
    id: 'monasterio_corias_bodegas',
    title: 'Monasterio de San Juan de Corias & Viñedos de Cangas',
    type: 'indoor',
    weatherType: 'fog',
    icon: '🍷',
    comarca: 'occidente_eonavia',
    town: 'Cangas del Narcea',
    lat: 43.1950,
    lon: -6.5447,
    distInfo: 'Río Narcea',
    desc: 'El "Escorial Asturiano", monasterio benedictino del siglo XI con claustro neoclásico monumental, museo del vino y catas en bodegas de ladera.',
    tip: 'Ambiente majestuoso en días de nubes bajas o lluvia suave en el valle del Narcea.',
    tag: 'Monasterio & Vino',
    sections: [
      {
        icon: '🍷',
        heading: 'Patrimonio Monástico y Enológico',
        text: 'Fundado en 1032, es uno de los monumentos históricos más impresionantes del norte peninsular. En sus bodegas subterráneas centenarias se elaboraba el vino de misa que dio origen a la D.O.P. Cangas.'
      },
      {
        icon: '🌫️',
        heading: 'Refugio entre Valles Nubosos',
        text: 'Sus muros ciclópeos y claustros interiores climatizados (actual Parador Nacional) son un oasis de paz y confort térmico en días frescos o brumosos.'
      },
      {
        icon: '🍇',
        heading: 'Viticultura Heroica de Montaña',
        text: 'Las viñas plantadas en pendientes de más del 50% de inclinación en suelos de pizarra son un prodigio de la agricultura heroica asturiana.'
      }
    ]
  },
  {
    id: 'taramundi_ferrerias',
    title: 'Conjunto Etnográfico de Teixois y Taramundi',
    type: 'nature',
    weatherType: 'fog',
    icon: '⚙️',
    comarca: 'occidente_eonavia',
    town: 'Taramundi',
    lat: 43.3606,
    lon: -7.1086,
    distInfo: 'Oscos-Eo',
    desc: 'Molinos, mazos de hierro del siglo XVIII movidos por agua y cuna de la artesanía de navajas tradicionales.',
    tip: 'El clima húmedo y los bosques de ribera forman un cuadro de cuento de hadas.',
    tag: 'Etnografía Viva',
    sections: [
      {
        icon: '⚙️',
        heading: 'La Fuerza del Agua y el Ingenio Hidráulico',
        text: 'En Os Teixois (Siglo XVIII) todos los ingenios hidráulicos siguen en funcionamiento: mazo para forjar hierro, molino de grano, rueda de afilar y batán de lana impulsados únicamente por la corriente del río.'
      },
      {
        icon: '🌫️',
        heading: 'Bosques Húmedos de Cuento',
        text: 'El clima atlántico húmedo y los valles frondosos del río Turía son el escenario natural de este conjunto etnográfico. La niebla y el goteo del agua sobre la pizarra intensifican la sensación de viaje en el tiempo.'
      },
      {
        icon: '🔪',
        heading: 'Cuchillería y Artesanía de Navajas',
        text: 'Visita los talleres artesanos donde los maestros navajeros siguen forjando a mano las tradicionales navajas de Taramundi con mangos de boj tallado y quemado.'
      }
    ]
  },
  {
    id: 'bosque_pelono_ponga',
    title: 'Hayedo de Peloño & Parque Natural de Ponga',
    type: 'nature',
    weatherType: 'fog',
    icon: '🍁',
    comarca: 'oriente_picos',
    town: 'Ponga',
    lat: 43.1833,
    lon: -5.1667,
    distInfo: 'Cordillera Oriental',
    desc: 'Más de 15 kilómetros cuadrados de hayas continuas que en otoño se transforman en una explosión de rojos, dorados y ocres, dominados por el pico Tiatordos.',
    tip: 'Con niebla suave o bruma otoñal, el bosque de Peloño ofrece una estampa mágica incomparable.',
    tag: 'Gran Hayedo',
    sections: [
      {
        icon: '🍁',
        heading: 'El Mayor Hayedo de la Cordillera Oriental',
        text: 'Reserva Natural protegida que alberga miles de hayas centenarias, robles y acebos. Es uno de los refugios predilectos del oso pardo y las aves rapaces forestales.'
      },
      {
        icon: '🌫️',
        heading: 'La Poesía de la Niebla en las Hayas',
        text: 'La bruma que entra por la Collada de Moandi envuelve los troncos plateados de las hayas creando un ambiente místico de cuento de hadas asturiano.'
      },
      {
        icon: '🧀',
        heading: 'Queso de Los Beyos',
        text: 'En San Juan de Beleño y Sobrefoz prueba el queso de Los Beyos (I.G.P.), elaborado artesanalmente con leche de vaca, cabra u oveja.'
      }
    ]
  },

  // ==========================================
  // ❄️ PLANES DE MONTAÑA / NIEVE / GASTRONOMÍA DE CUCHARA
  // ==========================================
  {
    id: 'cangas_onis_santuario',
    title: 'Cangas de Onís, Covadonga y Puente Romano',
    type: 'mountain',
    weatherType: 'snow',
    icon: '⛪',
    comarca: 'oriente_picos',
    town: 'Cangas de Onís',
    lat: 43.3142,
    lon: -5.0544,
    distInfo: 'Entrada a Picos de Europa',
    desc: 'Primera capital del Reino de Asturias, Santuario de la Santina en la cueva natural y gastronomía de queso Gamonéu y Cabrales.',
    tip: 'Con frío o primeras nieves en las cumbres, Covadonga y Cangas transmiten un misticismo sobrecogedor.',
    tag: 'Historia y Leyenda',
    sections: [
      {
        icon: '⛪',
        heading: 'Cuna del Reino y Leyenda de Covadonga',
        text: 'Cangas de Onís fue la primera capital del Reino de Asturias tras la batalla de Covadonga (722). El Puente Romano con la Cruz de la Victoria colgante es el icono más célebre de Asturias.'
      },
      {
        icon: '❄️',
        heading: 'Misticismo entre Cumbres Nevadas',
        text: 'Con tiempo frío o primeras nieves coronando los Picos de Europa, la Santa Cueva de Covadonga sobre la cascada natural transmite una atmósfera sobrecogedora e imborrable.'
      },
      {
        icon: '🧀',
        heading: 'El Santuario de los Quesos Azules',
        text: 'El mercado dominical de Cangas de Onís es el templo de los quesos tradicionales: Gamonéu del Puerto y del Valle, Cabrales, Beyos y sidra de los llagares orientales.'
      }
    ]
  },
  {
    id: 'somiedo_brañas',
    title: 'Brañas Vaqueiras y Teitos de Somiedo',
    type: 'mountain',
    weatherType: 'snow',
    icon: '🏔️',
    comarca: 'occidente_eonavia',
    town: 'Pola de Somiedo',
    lat: 43.0931,
    lon: -6.2558,
    distInfo: 'Parque Natural de Somiedo',
    desc: 'Cabañas ancestrales con techumbre de escoba vegetal (teitos) en valles glaciares de alta montaña.',
    tip: 'Con frío o cota de nieve baja, entrar en calor con un pote de berzas somedano o carne roxa.',
    tag: 'Alta Montaña',
    sections: [
      {
        icon: '🏔️',
        heading: 'Arquitectura Glaciar y Cultura Vaqueira',
        text: 'Brañas míticas como La Pornacal o Sousas conservan los "teitos", cabañas con techumbre vegetal de escoba adaptadas para resistir las nevadas invernales de la Cordillera Cantábrica.'
      },
      {
        icon: '❄️',
        heading: 'El Reino de la Nieve y la Chimenea',
        text: 'En jornadas frías o con cota de nieve baja, los valles somedanos se tiñen de blanco. Es el momento perfecto para paseos con precaución y refugiarse al calor de la lumbre tradicional.'
      },
      {
        icon: '🍲',
        heading: 'Gastronomía de Cuchara Somedana',
        text: 'En Pola de Somiedo o Valle de Lago, degusta el pote de berzas con su compango casero, la carne roxa de ternera asturiana de los valles y los borrachinos tradicionales.'
      }
    ]
  },
  {
    id: 'pajares_cuchara',
    title: 'Pajares y Gastronomía de Pote en el Valle de Lena',
    type: 'mountain',
    weatherType: 'snow',
    icon: '🍲',
    comarca: 'cuencas_mineras',
    town: 'Lena (Pajares)',
    lat: 42.9922,
    lon: -5.7656,
    distInfo: 'Puerto de Pajares',
    desc: 'La entrada histórica a Asturias por la Cordillera. Parada obligatoria para saborear fabada asturiana y pote de castañas al calor del fuego.',
    tip: 'Plan idóneo en jornadas invernales o tras una subida a ver la nieve en la cordillera.',
    tag: 'Gastronomía de Cuchara',
    sections: [
      {
        icon: '🍲',
        heading: 'El Templo de la Fabada y los Platos de Fuego',
        text: 'El Valle de Lena y el Puerto de Pajares representan el paso histórico entre la meseta y el Principado. Sus ventas y fondas centenarias son famosas por su cocina de caldereta, fabada asturiana con faba de la granja y pote de castañas.'
      },
      {
        icon: '❄️',
        heading: 'Frente a las Cumbres Nivosas',
        text: 'Cuando el invierno deja nieve en las estaciones de Valgrande-Pajares, no hay mejor plan que ascender a ver el espectáculo blanco y reconfortarse con un menú de cuchara humeante.'
      },
      {
        icon: '⛪',
        heading: 'Santa Cristina de Lena (Prerrománico)',
        text: 'En la bajada del valle no dejes de visitar Santa Cristina de Lena (Siglo IX, UNESCO), erigida sobre una colina con vistas panorámicas sobre todo el valle minero.'
      }
    ]
  }
];

/**
 * Obtiene la ficha didáctica de un plan turístico específico
 */
export function getTourismPlanExplanation(planId) {
  const plan = PLANES_ASTURIAS_CATALOGO.find(p => p.id === planId);
  if (!plan) return null;

  return {
    icon: plan.icon,
    title: plan.title,
    subtitle: `${plan.town} • ${plan.tag}`,
    badge: `Plan ${plan.tag} • ${plan.distInfo}`,
    sections: plan.sections || [
      {
        icon: '📍',
        heading: 'Descripción del Enclave',
        text: plan.desc
      },
      {
        icon: '💡',
        heading: 'Por qué visitarlo hoy',
        text: plan.tip
      }
    ]
  };
}

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
 * y calcula la distancia física en km desde el concejo activo.
 */
export function getRecommendedPlans(weatherData, concejo) {
  const userLat = concejo?.lat || 43.5558;
  const userLon = concejo?.lon || -5.9744;

  const current = weatherData?.weather?.current || {};
  const temp = current.temperature_2m ?? 15;
  const rain = current.precipitation ?? 0;
  const weatherCode = current.weather_code ?? 0;
  const humidity = current.relative_humidity_2m ?? 75;

  // Detección de la categoría meteorológica dominante
  let category = 'sun';
  let verdict = 'Cielos despejados y soleados';
  let icon = '☀️';

  // 1. Nieve o Frío extremo de montaña
  if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86) || (temp <= 4 && (concejo?.altitude || 0) >= 400)) {
    category = 'snow';
    verdict = 'Ambiente frío / Nieve en cumbres: Tiempo de chimenea, montaña y cuchara';
    icon = '❄️';
  }
  // 2. Lluvia, llovizna o tormenta activa
  else if (rain >= 0.1 || (weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82) || (weatherCode >= 95 && weatherCode <= 99)) {
    category = 'rain';
    verdict = 'Lluvia o llovizna prevista: Momento ideal para planes a cubierto y museos';
    icon = '🌧️';
  }
  // 3. Niebla o nublado muy húmedo
  else if (weatherCode === 45 || weatherCode === 48 || (humidity >= 92 && weatherCode >= 1 && weatherCode <= 3)) {
    category = 'fog';
    verdict = 'Borrina o ambiente brumoso: Bosques y villas marineras con encanto especial';
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
    verdict = 'Cielos claros y buen tiempo: Miradores, calas, acantilados y aire libre';
    icon = '☀️';
  }

  const comarcaInfo = getComarcaForConcejo(concejo?.id);

  // Mapear con distancia y tiempo de viaje
  const plansWithDist = PLANES_ASTURIAS_CATALOGO.map(p => {
    const dist = calculateDistanceKm(userLat, userLon, p.lat, p.lon);
    const driveTimeMin = Math.max(5, Math.round(dist * 1.25));
    return {
      ...p,
      distFromUserKm: dist,
      driveTimeMin
    };
  });

  // Ordenar por proximidad en kilómetros
  plansWithDist.sort((a, b) => a.distFromUserKm - b.distFromUserKm);

  return {
    weatherVerdict: verdict,
    weatherCategory: category,
    weatherIcon: icon,
    comarca: comarcaInfo,
    plans: plansWithDist
  };
}
