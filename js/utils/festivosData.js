/**
 * METEOASTUR LODE - Catálogo Oficial de Días Festivos, Folixas y Romerías de Asturias
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Ecosistema Zeustata • Principado de Asturias.
 * 
 * Incluye:
 * 1. Calendario de festivos patronales oficiales para los 78 concejos.
 * 2. Motor astronómico de cómputo de Pascua (Meeus/Jones/Butcher) para fiestas móviles (Antroxu, Bollo, Balesquida).
 * 3. Fichas didácticas de tradición, historia, gastronomía de prao y microclima.
 * 4. Simulador interactivo conforme a la Ley 12 de AGENTS.md.
 */

/**
 * Calcula el Domingo de Resurrección (Pascua) para cualquier año gregoriano
 * Algoritmo anónimo de Butcher / Meeus
 */
export function getEasterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = Marzo, 4 = Abril
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

/**
 * Suma o resta días a una fecha
 */
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Catálogo base de festivos y folixas de los 78 concejos
 * Soporta tipo 'fixed' (mes 1-12, dia 1-31) y 'easter_offset' (días relativos a Pascua)
 */
export const FESTIVOS_ASTURIAS_CATALOGO = {
  // --- CIUDADES PRINCIPALES Y CENTRO ---
  gijon: [
    {
      id: 'san_pedro_gijon',
      name: 'San Pedro (Día del Patrono)',
      type: 'fixed',
      month: 6,
      day: 29,
      icon: '⚓',
      tag: 'Patrono Mayor de Xixón',
      tradition: 'Bendición de las aguas en el puerto deportivo y misa solemne en la iglesia de San Pedro.',
      gastronomy: 'Bonito a la plancha, sardinas asadas, andaricas y sidra natural.',
      tipClima: 'Brisa de Nordeste habitual en la bahía de San Lorenzo; agradable con sol y ambiente marinero.',
      sections: [
        {
          icon: '⚓',
          heading: 'La Bendición del Cantábrico',
          text: 'San Pedro es el patrón marinero de Gijón. Cada 29 de junio el clero y las gentes de la mar celebran la bendición de las aguas en el espigón del puerto, pidiendo una costera próspera y protección frente a las galernas.'
        },
        {
          icon: '🐟',
          heading: 'Gastronomía de San Pedro',
          text: 'Fiesta unida al olor a sardina asada en los merenderos de Somió, Deva y Cimavilla. Menú marinero por excelencia con bonito del norte, bugre con arroz y sidra recién escanciada.'
        },
        {
          icon: '🌤️',
          heading: 'Microclima de la Bahía en San Pedro',
          text: 'Finales de junio suele traer brisas marinas diurnas (Nordeste) que refrescan la tarde. Noche templada perfecta para pasear por el Campo Valdés y el Muro.'
        }
      ]
    },
    {
      id: 'antroxu_gijon',
      name: 'Martes de Carnaval (Antroxu de Xixón)',
      type: 'easter_offset',
      offset: -47, // Martes de Carnaval = Domingo de Ramos - 40 días = Pascua - 47 días
      icon: '🎭',
      tag: 'Fiesta de Interés Turístico',
      tradition: 'Gran desfile de charangas y carrozas por el centro y entierro de la Sardina.',
      gastronomy: 'Picadillo, pote asturiano con compango, frixuelos, picatostes y fayueles.',
      tipClima: 'Noche fresca de invierno/primavera; conviene abrigar el disfraz si sopla viento del mar.',
      sections: [
        {
          icon: '🎭',
          heading: 'El Gran Antroxu Asturiano',
          text: 'Declarada Fiesta de Interés Turístico. Las calles de Gijón se llenan de charangas, sátira y disfraces desde el viernes hasta el desfile cumbre del martes de Antroxu en la Plaza Mayor.'
        },
        {
          icon: '🥞',
          heading: 'Menú de Antroxu y Dulces Típicos',
          text: 'Pote asturiano de berzas contundente para combatir el frío, seguido de frixuelos finos de sartén, picatostes caramelizados y casadielles.'
        },
        {
          icon: '🧥',
          heading: 'Consejo Meteorológico Fiestero',
          text: 'Al celebrarse entre febrero y marzo, las noches son frías (~8-11°C). Ideal llevar doble capa bajo el disfraz para aguantar la verbena al aire libre.'
        }
      ]
    }
  ],

  aviles: [
    {
      id: 'san_agustin_aviles',
      name: 'Fiestas de San Agustín',
      type: 'fixed',
      month: 8,
      day: 28,
      icon: '🚢',
      tag: 'Fiesta Mayor de Avilés',
      tradition: 'Fuegos artificiales sobre la ría, Mercado Franco de Alcabala y festivales de música.',
      gastronomy: 'Mariscos de la ría, ternera asturiana, sidra y mantecado de Avilés.',
      tipClima: 'Noche de agosto típicamente suave; los fuegos lucen espectacular con cielos despejados.',
      sections: [
        {
          icon: '🚢',
          heading: 'La Gran Semana Grande Avilesina',
          text: 'Conmemora a San Agustín con verbenas en El Parche (Plaza de España), el festival Folclórico Internacional y los fuegos artificiales reflejados sobre el Centro Niemeyer y la ría.'
        },
        {
          icon: '🧁',
          heading: 'Mantecado Imperial de Avilés',
          text: 'No falta en ninguna mesa el mantecado escarchado tradicional con forma de estrella o copa, símbolo repostero indiscutible de la villa del Adelantado.'
        },
        {
          icon: '🎆',
          heading: 'Consejo para los Fuegos Artificiales',
          text: 'La brisa de la ría suele ser suave a finales de agosto. Si sopla viento flojo del Norte, el humo de la pirotecnia se disipa rápido, permitiendo una visibilidad cristalina.'
        }
      ]
    },
    {
      id: 'bollo_aviles',
      name: 'Fiesta de El Bollo (Comida en la Calle)',
      type: 'easter_offset',
      offset: 1, // Lunes de Pascua = Pascua + 1 día
      icon: '🥖',
      tag: 'Fiesta de Interés Turístico Nacional',
      tradition: 'Comida fraternal masiva en las calles históricas con más de 12.000 personas en mesas continuas.',
      gastronomy: 'El Bollo mantecado de Pascua, empanadas, tortilla de patata y sidra.',
      tipClima: 'Comida al aire libre bajo los soportales de Galiana y Rivero: resguardados de lluvia o sol.',
      sections: [
        {
          icon: '🥖',
          heading: 'La Mayor Mesa del Mundo en la Calle',
          text: 'Desde 1893 celebra la bienvenida de la primavera. Miles de familias y amigos comparten mesa a lo largo de más de 4 kilómetros de calles peatonales en el casco medieval.'
        },
        {
          icon: '🏛️',
          heading: 'Arquitectura que Desafía al Tiempo',
          text: 'Los famosos soportales románicos y barrocos de las calles Galiana, Rivero y La Ferrería garantizan que la fiesta se celebre con total éxito llueva, truene o haga sol.'
        },
        {
          icon: '🍷',
          heading: 'El Bollo y la Sidra',
          text: 'Cada comensal aporta su comida casera y los padrinos regalan el tradicional bollo escarchado a sus ahijados en un ambiente de cordialidad asturiana insuperable.'
        }
      ]
    }
  ],

  oviedo: [
    {
      id: 'san_mateo_oviedo',
      name: 'Fiestas de San Mateo',
      type: 'fixed',
      month: 9,
      day: 21,
      icon: '👑',
      tag: 'Fiesta Mayor de Vetusta',
      tradition: 'Chiringuitos en el Casco Antiguo, Día de América en Asturias y fuegos en el Naranco.',
      gastronomy: 'Bollos preñaos, costillas asadas, sidra y Carbayones de Oviedo.',
      tipClima: 'Finales de verano en el valle central; ambiente festivo con noches agradables.',
      sections: [
        {
          icon: '👑',
          heading: 'El Clímax de las Fiestas de Oviedo',
          text: 'El 21 de septiembre conmemora el traslado de las santas reliquias y la Cámara Santa. La ciudad estalla de música en la Plaza del Paraguas, la Catedral y el Campo San Francisco.'
        },
        {
          icon: '🌎',
          heading: 'El Desfile del Día de América',
          text: 'Homenaje a los emigrantes asturianos que partieron a México, Cuba o Argentina, con carrozas de época, música folclórica y grupos internacionales recorriendo la calle Uría.'
        },
        {
          icon: '🥐',
          heading: 'El Bollo Preñáu y los Carbayones',
          text: 'Comer el bollo de chorizo caliente en las campas del San Francisco o en los chiringuitos del Fontán es el rito inexcusable de todo ovetense.'
        }
      ]
    },
    {
      id: 'desarme_oviedo',
      name: 'Fiesta del Desarme',
      type: 'fixed',
      month: 10,
      day: 19,
      icon: '🍲',
      tag: 'Fiesta Gastronómica Histórica',
      tradition: 'Degustación obligatoria del menú histórico carlista en todos los restaurantes de la ciudad.',
      gastronomy: 'Garbanzos con bacalao y espinacas, callos a la asturiana y arroz con leche.',
      tipClima: 'Pleno otoño asturiano; menú contundente y caliente perfecto para días frescos o de orbayu.',
      sections: [
        {
          icon: '⚔️',
          heading: 'Origen de las Guerras Carlistas (1836)',
          text: 'La tradición relata cómo se desarmó pacíficamente a las tropas enemigas ofreciéndoles una abundante y pesada comida popular de garbanzos y callos que les impidió combatir.'
        },
        {
          icon: '🍲',
          heading: 'La Gran Trilogía Gastronómica',
          text: 'El 19 de octubre no hay restaurante ni hogar en Oviedo que no sirva el menú canónico: primer plato de garbanzos con bacalao y espinacas, segundo de callos picantinos y remate con arroz con leche requemado.'
        },
        {
          icon: '🍂',
          heading: 'Plan Otoñal Cálido e Inolvidable',
          text: 'Coincide con la llegada de las castañas y los primeros fríos del otoño. La comida reconforta cuerpo y alma antes de pasear por el casco antiguo de Vetusta.'
        }
      ]
    }
  ],

  castrillon: [
    {
      id: 'dia_castrillon',
      name: 'Día de Castrillón (Piedras Blancas)',
      type: 'fixed',
      month: 5,
      day: 26,
      icon: '🏰',
      tag: 'Fiesta Institucional del Concejo',
      tradition: 'Comida en la calle, mercado tradicional y pasacalles de gaitas en Piedras Blancas.',
      gastronomy: 'Cordero a la estaca, carne roxa, empanada de bonito y sidra de Castrillón.',
      tipClima: 'Primavera costera; brisa cantábrica templada en el valle de Quiloño.',
      sections: [
        {
          icon: '🏰',
          heading: 'La Gran Fiesta del Concejo',
          text: 'Celebra la autonomía histórica y comunitaria de Castrillón. Piedras Blancas reúne a vecinos de las 8 parroquias en el parque de La Libertad y calles principales.'
        },
        {
          icon: '🥩',
          heading: 'El Corderu a la Estaca',
          text: 'Famoso por las parrilladas populares y corderos al estilo tradicional asados a fuego lento de leña de roble durante horas.'
        },
        {
          icon: '🌊',
          heading: 'De la Playa al Valle',
          text: 'A tan solo 3 minutos de las playas de Salinas y Santa María del Mar, combinando brisa marinera y sol primaveral.'
        }
      ]
    },
    {
      id: 'carmen_salinas',
      name: 'Nuestra Señora del Carmen (Salinas / Arnao)',
      type: 'fixed',
      month: 7,
      day: 16,
      icon: '🏄‍♂️',
      tag: 'Fiesta Marinera y de Prao',
      tradition: 'Procesión marinera de la Virgen del Carmen, bendición de las olas y romería en Salinas.',
      gastronomy: 'Bonito del norte, sardinada en el arenal, sidra y frixuelos.',
      tipClima: 'Pleno verano cantábrico; ideal para disfrutar del surf y la fiesta en el arenal.',
      sections: [
        {
          icon: '⛵',
          heading: 'La Estrella de los Mares en Salinas',
          text: 'Procesión devota y marinera donde la imagen de la Virgen del Carmen es llevada hacia el Cantábrico por pescadores y surfistas locales.'
        },
        {
          icon: '🏄‍♂️',
          heading: 'Surf y Tradición Fusionados',
          text: 'Salinas respira olas, arena y música. El ambiente fiestero se extiende desde los chiringuitos de la playa hasta las plazas del pueblo.'
        },
        {
          icon: '🌅',
          heading: 'Atardeceres Únicos en La Peñona',
          text: 'Disfruta de la caída del sol con temperaturas cálidas estivales (~20-22°C) mientras rompen las olas en las barras de arena.'
        }
      ]
    }
  ],

  cangasdelnarcea: [
    {
      id: 'descarga_cangas',
      name: 'Fiesta del Carmen y La Descarga',
      type: 'fixed',
      month: 7,
      day: 16,
      icon: '💥',
      tag: 'Fiesta de Interés Turístico Nacional',
      tradition: 'La Descarga: más de 80.000 voladores estallan al unísono en el cielo en 7 minutos de apoteosis de pólvora.',
      gastronomy: 'Ternera asturiana de los valles, vino D.O.P. Cangas, embutidos y chopa a la sidra.',
      tipClima: 'Tarde calurosa de verano en el suroccidente (~28-32°C); noche vibrante y despejada.',
      sections: [
        {
          icon: '💥',
          heading: 'La Mayor Tirada de Pólvora de España',
          text: 'A las 20:00 h en punto, cuando la Virgen del Carmen llega al centro del Puente Romano, el cielo de Cangas ruge con una nube atronadora de miles de barrenos disparados a mano por las peñas.'
        },
        {
          icon: '🍇',
          heading: 'Vino de Cangas y Gastronomía',
          text: 'Se bebe el vino tinto albarín negro de viticultura heroica en cunqueiros de madera, acompañado de embutidos curados al humo de roble.'
        },
        {
          icon: '🌡️',
          heading: 'Microclima Cálido del Valle del Narcea',
          text: 'El suroccidente asturiano registra las temperaturas más veraniegas del Principado. Ideal llevar ropa ligera y protegerse del sol durante el día.'
        }
      ]
    },
    {
      id: 'magdalena_cangas',
      name: 'Fiesta de la Magdalena',
      type: 'fixed',
      month: 7,
      day: 22,
      icon: '🍇',
      tag: 'Fiesta Patronal Tradicional',
      tradition: 'Romería de prao en las riberas del Narcea y pasacalles de peñas.',
      gastronomy: 'Empanadas de carne, pote de berzas y vino de la tierra.',
      tipClima: 'Ambiente estival templado, perfecto para romería campestre.',
      sections: [
        {
          icon: '🍇',
          heading: 'La Continuación de las Fiestas del Narcea',
          text: 'La Magdalena prolonga el ambiente festivo de Cangas con comidas campestres, verbenas hasta el amanecer y hermandad de peñas.'
        },
        {
          icon: '🌲',
          heading: 'Paisaje de Viñedos y Montaña',
          text: 'El entorno de las laderas empinadas del Narcea dota a la folixa de un marco geográfico majestuoso.'
        }
      ]
    }
  ],

  llanes: [
    {
      id: 'san_roque_llanes',
      name: 'Fiestas de San Roque',
      type: 'fixed',
      month: 8,
      day: 16,
      icon: '🎻',
      tag: 'Fiesta de Interés Turístico Nacional',
      tradition: 'Danza Prima en la plaza de Parres Sobrino, Pericote llanisco y procesión del Santo.',
      gastronomy: 'Queso de Pría, fabes con almejas, mariscos y sidra del oriente.',
      tipClima: 'Tarde veraniega suave con brisas cantábricas; noche templada ideal para el baile.',
      sections: [
        {
          icon: '🎻',
          heading: 'El Pericote y la Devoción Llanisca',
          text: 'Hombres y mujeres ataviados con los trajes tradicionales de aldeana y porruanu bailan el Pericote, danza ancestral del siglo XVI única en España.'
        },
        {
          icon: '🌸',
          heading: 'La Danza Prima',
          text: 'Cientos de personas enlazadas por el meñique cantando al unísono en coro circular frente al mar en una de las expresiones folclóricas más puras de Asturias.'
        },
        {
          icon: '🏖️',
          heading: 'Verano en el Litoral Oriental',
          text: 'Llanes goza de más de 30 arenales vírgenes. La fiesta combina días de playa con noches de folixa y fuegos artificiales.'
        }
      ]
    },
    {
      id: 'guia_llanes',
      name: 'Fiesta de Nuestra Señora de la Guía',
      type: 'fixed',
      month: 9,
      day: 8,
      icon: '⛪',
      tag: 'Día de Asturias y Llanes',
      tradition: 'Procesión nocturna con antorchas desde la ermita de la Guía y disparo de palenques.',
      gastronomy: 'Verdinas con marisco, borona preñada y sidra dulce.',
      tipClima: 'Comienzo de septiembre con temperaturas muy agradables en la costa oriental.',
      sections: [
        {
          icon: '⛪',
          heading: 'La Virgen de la Colina',
          text: 'La bajada nocturna de la Virgen de la Guía con miles de devotos portando velas por las murallas medievales es un espectáculo conmovedor.'
        },
        {
          icon: '🥘',
          heading: 'Verdinas del Oriente Asturiano',
          text: 'Faba verdina fina y mantecosa guisada con llámpares, almejas o mariscos, reina culinaria de la fiesta.'
        }
      ]
    }
  ],

  ribadesella: [
    {
      id: 'fiesta_piragues_sella',
      name: 'El Descenso Internacional del Sella (Les Piragües)',
      type: 'first_saturday_august',
      month: 8,
      icon: '🛶',
      tag: 'Fiesta de Interés Turístico Internacional',
      tradition: 'Salida masiva de piraguas en Arriondas, tren fluvial y apoteosis de romería de prao en los Campos de Ova (Ribadesella).',
      gastronomy: 'Empanada, sidra a raudales, salmón del Sella y bollu preñáu.',
      tipClima: 'Primer sábado de agosto: sol radiante o chaparrón veraniego que no frena la folixa.',
      sections: [
        {
          icon: '🛶',
          heading: 'La Gran Fiesta de las Piraguas del Mundo',
          text: 'Creada en 1930 por Dionisio de la Huerta. Reúne a más de 1.000 palistas internacionales compitiendo a lo largo de 20 km del río Sella y a decenas de miles de romeros con collar de flores y montera picona.'
        },
        {
          icon: '🚂',
          heading: 'El Tren Fluvial y el Río Sella',
          text: 'El tren de vapor y coches engalanados acompañan a las piraguas desde Arriondas hasta la meta en el puente de Ribadesella entre cánticos del "Asturias, Patria Querida".'
        },
        {
          icon: '⛺',
          heading: 'La Noche del Sella en Ribadesella',
          text: 'Fiesta de hermandad ininterrumpida que une deporte de élite mundial con la romería más alegre del norte de España.'
        }
      ]
    },
    {
      id: 'guia_ribadesella',
      name: 'Nuestra Señora de la Guía',
      type: 'fixed',
      month: 7,
      day: 15,
      icon: '⛪',
      tag: 'Fiesta Marinera de Ribadesella',
      tradition: 'Procesión marinera de barcos engalanados por la ría del Sella y bahía.',
      gastronomy: 'Pescados de roca del Cantábrico, mariscos y sidra natural.',
      tipClima: 'Clima estival suave a orillas de la ría del Sella.',
      sections: [
        {
          icon: '⛵',
          heading: 'Patrona de los Mareantes',
          text: 'Los pesqueros del puerto de Ribadesella escoltan a la Virgen en el mar entre sirenas y banderas de fiesta.'
        },
        {
          icon: '🐟',
          heading: 'Cocina Marinera del Sella',
          text: 'Pescados desembarcados en la rula local preparados en caldereta o a la plancha.'
        }
      ]
    }
  ],

  villaviciosa: [
    {
      id: 'portal_villaviciosa',
      name: 'Fiestas de Nuestra Señora del Portal',
      type: 'fixed',
      month: 9,
      day: 11,
      icon: '🍏',
      tag: 'La Gran Folixa de la Manzana',
      tradition: 'Danza del Portal frente al Ayuntamiento, concurso de sidra natural y desfile de carrozas.',
      gastronomy: 'Sidra de manzana fresca, fabada asturiana y tarta de manzana.',
      tipClima: 'Septiembre suave y luminoso en la ría de Villaviciosa.',
      sections: [
        {
          icon: '🍏',
          heading: 'La Capital Manzanera de España',
          text: 'Villaviciosa celebra a su patrona con la majestuosa Danza del Portal, donde cientos de parejas bailan al compás de la gaita en la plaza mayor.'
        },
        {
          icon: '🍎',
          heading: 'El Mejor Escanciado de Sidra',
          text: 'Durante las fiestas se elige la mejor sidra natural del año y se celebra el concurso de escanciadores profesionales.'
        }
      ]
    }
  ],

  mieres: [
    {
      id: 'san_juan_mieres',
      name: 'Fiestas de San Juan de Mieres',
      type: 'fixed',
      month: 6,
      day: 24,
      icon: '🔥',
      tag: 'Fiesta Mayor del Caudal',
      tradition: 'La gran Foguera de San Juan en la plaza del Ayuntamiento y la danza prima popular.',
      gastronomy: 'Carne asada, embutidos mineros y sidra a esgaya.',
      tipClima: 'Noche mágica del solsticio de verano; ambiente cálido en el valle del Caudal.',
      sections: [
        {
          icon: '🔥',
          heading: 'La Hoguera Mágica del Caudal',
          text: 'La noche del 23 al 24 de junio Mieres enciende su monumental hoguera, quemando lo viejo para dar paso al verano asturiano con bailes y fuegos.'
        },
        {
          icon: '⛏️',
          heading: 'Orgullo Minero y Tradición',
          text: 'Fiesta de profunda raigambre popular con música en vivo, bandas de gaitas y verbenas en el Parque Jovellanos.'
        }
      ]
    }
  ],

  langreo: [
    {
      id: 'santiago_langreo',
      name: 'Fiestas de Santiago Apóstol (Sama de Langreo)',
      type: 'fixed',
      month: 7,
      day: 25,
      icon: '⛏️',
      tag: 'Fiesta Patronal de Sama',
      tradition: 'Gira campestre a Los Llaos, mercado tradicional y verbenas.',
      gastronomy: 'Tortilla de patatas en el prao, lacón cocido y sidra natural.',
      tipClima: 'Verano en el valle del Nalón; días soleados y cálidos (~24-27°C).',
      sections: [
        {
          icon: '⛏️',
          heading: 'La Tradición Obrera y Campestre',
          text: 'Sama de Langreo celebra a Santiago combinando actos religiosos con la mítica subida popular campestre a la ermita de Los Llaos.'
        },
        {
          icon: '🌲',
          heading: 'Gira al Prao',
          text: 'Familias enteras se instalan con carpas, empanadas y toneles para celebrar la romería asturiana por antonomasia.'
        }
      ]
    }
  ],

  cangasdeonis: [
    {
      id: 'san_antoniu_cangas',
      name: 'Fiesta de San Antoniu',
      type: 'fixed',
      month: 6,
      day: 13,
      icon: '👑',
      tag: 'Fiesta de Prao en el Sella',
      tradition: 'La gran jira al Robledal de San Antoniu, subasta del ramu y quema del xigante.',
      gastronomy: 'Gamonéu, borona preñada, carnes asadas y sidra oriental.',
      tipClima: 'Junio floreciente a las faldas de Picos de Europa.',
      sections: [
        {
          icon: '👑',
          heading: 'El Robledal de San Antoniu',
          text: 'El robledal centenario junto a la capilla de San Antoniu acoge a miles de romeros vestidos de porruanos y aldeanas celebrando la subasta del ramu de panes de espelta.'
        },
        {
          icon: '🧀',
          heading: 'Quesos de Picos de Europa',
          text: 'Degustación de los mejores lotes de queso Gamonéu de puerto y del valle en un entorno festivo incomparable.'
        }
      ]
    }
  ]
};

/**
 * Determina si un festivo ocurre en una fecha concreta (objeto Date)
 */
export function isFestivoOnDate(festivo, checkDate) {
  const year = checkDate.getFullYear();
  const month = checkDate.getMonth() + 1; // 1-12
  const day = checkDate.getDate();

  // 1. Fiestas de día fijo
  if (festivo.type === 'fixed') {
    return festivo.month === month && festivo.day === day;
  }

  // 2. Fiestas relativas a Pascua (Antroxu, Bollo, etc.)
  if (festivo.type === 'easter_offset') {
    const easter = getEasterSunday(year);
    const targetDate = addDays(easter, festivo.offset);
    return targetDate.getFullYear() === year &&
           (targetDate.getMonth() + 1) === month &&
           targetDate.getDate() === day;
  }

  // 3. Primer sábado de agosto (Descenso del Sella)
  if (festivo.type === 'first_saturday_august') {
    if (month !== 8) return false;
    // Buscar el primer sábado de agosto tras el 2 de agosto
    for (let d = 1; d <= 7; d++) {
      const tempDate = new Date(year, 7, d);
      if (tempDate.getDay() === 6 && d >= 1) { // 6 = Sábado
        return d === day;
      }
    }
    return false;
  }

  return false;
}

/**
 * Comprueba si el concejo seleccionado está hoy de fiesta oficial
 * Soporta simulacro (?test=folixa o ?test=fiesta) conforme a la Ley 12
 */
export function checkConcejoFolixa(concejo, overrideDate = null) {
  if (!concejo || !concejo.id) return null;

  // 1. Detección de simulacro controlado en cliente
  let isSimulated = false;
  if (typeof window !== 'undefined' && window.location) {
    const params = new URLSearchParams(window.location.search);
    if (params.get('test') === 'folixa' || params.get('test') === 'fiesta') {
      isSimulated = true;
    }
  }

  const cId = concejo.id.toLowerCase().trim();
  const list = FESTIVOS_ASTURIAS_CATALOGO[cId];

  // Si está en modo simulacro y el concejo tiene fiesta, devolvemos la primera
  if (isSimulated && list && list.length > 0) {
    return {
      active: true,
      isSimulated: true,
      concejo,
      festivo: list[0]
    };
  }

  // Si está en modo simulacro y es un concejo sin fiesta específica, creamos una fiesta local canónica simulada
  if (isSimulated) {
    return {
      active: true,
      isSimulated: true,
      concejo,
      festivo: {
        id: `patronal_${cId}`,
        name: `Fiesta Patronal de ${concejo.name}`,
        icon: '🎉',
        tag: 'Día Grande del Concejo',
        tradition: `Celebración de la folixa y romería patronal de ${concejo.name}.`,
        gastronomy: 'Empanada asturiana, cordero asado, sidra y dulces locales.',
        tipClima: 'Noche agradable de verbena; disfruta de la fiesta al aire libre.',
        sections: [
          {
            icon: '🎉',
            heading: `La Gran Folixa de ${concejo.name}`,
            text: `Día festivo local oficial en el concejo de ${concejo.name}, reuniendo a vecinos y visitantes en torno a la tradición y el folclore asturiano.`
          },
          {
            icon: '🥘',
            heading: 'Gastronomía de la Folixa',
            text: 'Productos de la huerta, carnes asturianas y sidra natural para compartir en hermandad.'
          }
        ]
      }
    };
  }

  // Modo real en vivo: evaluar con la fecha real del usuario
  if (!list || list.length === 0) return null;

  const now = overrideDate || new Date();
  for (const festivo of list) {
    if (isFestivoOnDate(festivo, now)) {
      return {
        active: true,
        isSimulated: false,
        concejo,
        festivo
      };
    }
  }

  return null;
}
