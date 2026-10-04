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
    distInfo: 'Rasa de San Telmo',
    desc: 'Edificio en forma de huella tridáctila gigante. Una de las colecciones de fósiles y esqueletos de dinosaurio más completas del mundo.',
    tip: 'Si arrecia el temporal cantábrico, el interior ofrece horas de divulgación para toda la familia.',
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
    distInfo: 'Comarca de la Sidra',
    desc: 'Descubre todo el ciclo del manzano, la fermentación en llagar, el escanciado interactivo y los juegos tradicionales asturianos.',
    tip: 'Magnífico refugio contra el orbayu antes de disfrutar de una espicha en los llagares de la zona.',
    tag: 'Cultura Asturiana',
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
    distInfo: 'Ribadesella',
    desc: 'Patrimonio de la Humanidad por la UNESCO. Uno de los santuarios de arte paleolítico más importantes de Europa.',
    tip: 'Ambiente en cueva protegido de las inclemencias meteorológicas exteriores.',
    tag: 'UNESCO Rupestre',
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
    tag: 'Fauna Marina',
    sections: [
      {
        icon: '🦈',
        heading: 'Inmersión en los Mares del Mundo',
        text: 'Más de 60 acuarios que recrean los ecosistemas desde los ríos de montaña asturianos con nutrias y salmones hasta los fondos del Cantábrico y arrecifes tropicales con tiburones toro.'
      },
      {
        icon: '🌊',
        heading: 'Contemplar el Temporal Costero a Resguardo',
        text: 'Situado en el paseo de Poniente. El acuario está 100% cubierto y climatizado, siendo el plan familiar predilecto cuando azotan frentes atlánticos o galernas en la bahía de Gijón.'
      },
      {
        icon: '🍽️',
        heading: 'Cercanías de Cimavilla y Poniente',
        text: 'A pocos pasos del puerto deportivo, el barrio histórico de Cimavilla y el centro de Gijón para rematar la jornada gastronómica.'
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
    distInfo: 'Arnao / Salinas',
    desc: 'La mina submarina más antigua de España. Galerías originales que se adentran bajo el fondo del mar Cantábrico.',
    tip: 'La visita guiada subterránea bajo el mar es inmune a la lluvia exterior.',
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
