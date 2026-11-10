/**
 * METEOASTUR LODE - Catálogo Oficial de Sendas de Asturias y Motor Físico de Rutas
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Doctrina de Legalidad Estricta y Blindaje Constitucional de Seguridad y Responsabilidad (Ley 16).
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

/**
 * Catálogo Oficial Completo de Sendas Homologadas y Rutas de Asturias
 */
export const RUTAS_ASTURIAS_CATALOGO = [
  // ==========================================
  // COSTA CENTRAL Y COMARCA DE AVILÉS
  // ==========================================
  {
    id: 'miradores_castrillon',
    name: 'Senda Costera de los Miradores (Arnao - Bayas)',
    concejoId: 'castrillon',
    concejoName: 'Castrillón',
    lat: 43.5772,
    lon: -5.9814,
    startPoint: 'Playa de Arnao / Santa María del Mar',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '9.5 km',
    distKm: 9.5,
    elev: '+180 m',
    elevM: 180,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 45min',
    desc: 'Acantilados bravos del Cantábrico con vistas panorámicas a La Ladrona y el Monumento Natural de la Isla de Deva, enlazando las playas de Salinas, Santa María del Mar, Bahínas, Munielles y Bayas.',
    surface: 'Sendero de tierra afirmada, pasarelas de madera y pista local',
    caution: 'Atención a rachas de viento del Noroeste en salientes de acantilados y firme resbaladizo en bajadas a calas tras lluvia'
  },
  {
    id: 'molinos_raices_castrillon',
    name: 'Ruta Fluvial del Agua y Molinos del Río Raíces',
    concejoId: 'castrillon',
    concejoName: 'Castrillón',
    lat: 43.5411,
    lon: -5.9558,
    startPoint: 'San Martín de Laspra / Piedras Blancas',
    type: 'fluvial',
    typeIcon: '🌊',
    dist: '6.2 km',
    distKm: 6.2,
    elev: '+95 m',
    elevM: 95,
    diff: 'Muy Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 30min',
    desc: 'Paseo tranquilo y sombrío entre alisos, sauces y castaños bordeando el río Raíces y vestigios de molinos harineros tradicionales de agua dulce.',
    surface: 'Pista de zahorra lisa y senda forestal compacta',
    caution: 'Zonas sombrías con humedad persistente y posibles charcos en épocas de lluvia continua'
  },
  {
    id: 'mirador_pulide_castrillon',
    name: 'Subida al Mirador de Pulide (El Balcón de Castrillón)',
    concejoId: 'castrillon',
    concejoName: 'Castrillón',
    lat: 43.5264,
    lon: -6.0125,
    startPoint: 'Pillarno / Pulide',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '5.4 km',
    distKm: 5.4,
    elev: '+310 m',
    elevM: 310,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '1h 50min',
    desc: 'Ascensión a la atalaya natural más alta de Castrillón (438 m) con una panorámica inigualable de 360° desde el Cabo Peñas y la ría de Avilés hasta los Picos de Europa.',
    surface: 'Pista forestal, camino de gravilla y senda de tierra',
    caution: 'Zona alta desabrigada muy expuesta a rachas de viento Sur y nieblas cerradas con borrina'
  },
  {
    id: 'ria_aviles',
    name: 'Paseo Fluvial de la Ría de Avilés y Centro Niemeyer',
    concejoId: 'aviles',
    concejoName: 'Avilés',
    lat: 43.5575,
    lon: -5.9208,
    startPoint: 'Paseo de la Ría / Pasarela Niemeyer',
    type: 'verde',
    typeIcon: '🛤️',
    dist: '5.0 km',
    distKm: 5.0,
    elev: '+15 m',
    elevM: 15,
    diff: 'Muy Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 15min',
    desc: 'Itinerario urbano y portuario completamente llano que bordea la dársena avilesina, uniendo el casco histórico con las cúpulas vanguardistas del Niemeyer y el puerto deportivo.',
    surface: 'Pavimento liso, madera tratada y aceras peatonales',
    caution: 'Apta para carritos de bebé y personas con movilidad reducida con cualquier meteorología'
  },
  {
    id: 'magdalena_aviles',
    name: 'Senda Periurbana de La Magdalena y Valgranda',
    concejoId: 'aviles',
    concejoName: 'Avilés',
    lat: 43.5431,
    lon: -5.9181,
    startPoint: 'Parque de la Magdalena',
    type: 'verde',
    typeIcon: '🛤️',
    dist: '4.5 km',
    distKm: 4.5,
    elev: '+60 m',
    elevM: 60,
    diff: 'Muy Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 10min',
    desc: 'Circuito verde periurbano de recreo y marcha deportiva entre arbolado autóctono y prados del cinturón sur de Avilés.',
    surface: 'Zahorra fina compacta y asfalto peatonal',
    caution: 'Muy cómoda y resguardada del viento costero'
  },
  {
    id: 'cabo_penas_gozon',
    name: 'Senda del Paisaje Protegido de Cabo Peñas',
    concejoId: 'gozon',
    concejoName: 'Gozón',
    lat: 43.6508,
    lon: -5.8503,
    startPoint: 'Faro de Cabo Peñas / Centro de Interpretación',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '7.8 km',
    distKm: 7.8,
    elev: '+140 m',
    elevM: 140,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 15min',
    desc: 'El punto más septentrional de Asturias: acantilados imponentes de más de 100 metros de caída vertical, brezales marinos y vistas salvajes a los islotes La Herbosa y Gaviera.',
    surface: 'Pasarelas de madera protegidas y sendero de tierra sobre rasa marina',
    caution: 'Prohibido acercarse al borde de los cortados; viento severo en temporales del Cantábrico y nieblas marítimas repentinas'
  },
  {
    id: 'banugues_luanco_gozon',
    name: 'Senda Litoral de Bañugues a Luanco y Playa de Moniello',
    concejoId: 'gozon',
    concejoName: 'Gozón',
    lat: 43.6189,
    lon: -5.8017,
    startPoint: 'Ensenada de Bañugues',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '8.4 km',
    distKm: 8.4,
    elev: '+160 m',
    elevM: 160,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 30min',
    desc: 'Ruta geológica y marina entre calas fósiles, el área recreativa de Moniello y el puerto pesquero tradicional de Luanco.',
    surface: 'Camino afirmado, praderías de rasa y pista costera',
    caution: 'Tramos expuestos al oleaje en la ensenada baja durante mareas vivas de temporal'
  },
  {
    id: 'candas_luanco_carreno',
    name: 'Senda Costera de Candás a Perlora y Luanco',
    concejoId: 'carreno',
    concejoName: 'Carreño',
    lat: 43.5903,
    lon: -5.7656,
    startPoint: 'Puerto de Candás',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '8.2 km',
    distKm: 8.2,
    elev: '+130 m',
    elevM: 130,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 20min',
    desc: 'Itinerario costero continuo por la Ciudad Residencial de Perlora, calas protegidas como Carranques y Huelgues, túneles del antiguo tren y la villa marinera de Candás.',
    surface: 'Paseo marítimo asfaltado y sendero afirmado',
    caution: 'Firme seguro apto para paseo familiar bajo orballu ligero'
  },
  {
    id: 'trasona_corvera',
    name: 'Senda Perimetral del Embalse de Trasona',
    concejoId: 'corvera',
    concejoName: 'Corvera de Asturias',
    lat: 43.5358,
    lon: -5.8856,
    startPoint: 'Centro de Tecnificación Deportiva de Trasona',
    type: 'fluvial',
    typeIcon: '🌊',
    dist: '5.8 km',
    distKm: 5.8,
    elev: '+30 m',
    elevM: 30,
    diff: 'Muy Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 20min',
    desc: 'Vuelta completa al embalse deportivo de piragüismo, entre sauces, ánades reales y vistas tranquilas a la lámina de agua.',
    surface: 'Pista de zahorra lisa perimetral y pasarelas llanas',
    caution: 'Excelente tracción sin desniveles; muy cómoda para andar o correr'
  },

  // ==========================================
  // GIJÓN Y OVIEDO (ÁREA CENTRAL)
  // ==========================================
  {
    id: 'cervigon_gijon',
    name: 'Senda Costera del Cervigón (San Lorenzo a La Ñora)',
    concejoId: 'gijon',
    concejoName: 'Gijón',
    lat: 43.5381,
    lon: -5.6425,
    startPoint: 'Playa de San Lorenzo (Escalera 24) / El Tostaderu',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '8.8 km',
    distKm: 8.8,
    elev: '+140 m',
    elevM: 140,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 30min',
    desc: 'Paseo litoral emblemático de Gijón bordeando acantilados y calas vírgenes (Rinconeda, Peñarrubia, Serín, Estaño) hasta la desembocadura del río y playa de La Ñora.',
    surface: 'Pavimento liso, pasarelas de madera y camino de zahorra',
    caution: 'Precaución con rachas fuertes de viento del Noroeste en los salientes de los cabos'
  },
  {
    id: 'camocha_gijon',
    name: 'Senda Verde de La Camocha (Tremañes - Pozo Camocha)',
    concejoId: 'gijon',
    concejoName: 'Gijón',
    lat: 43.5181,
    lon: -5.6881,
    startPoint: 'Barrio de Tremañes / Parque de Los Campones',
    type: 'verde',
    typeIcon: '🛤️',
    dist: '7.5 km',
    distKm: 7.5,
    elev: '+50 m',
    elevM: 50,
    diff: 'Muy Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 50min',
    desc: 'Antigua caja del ferrocarril minero rehabilitada como vía verde; discurre entre praderías, pomaradas y el emblemático castillete del Pozo Camocha en Huerces.',
    surface: 'Asfalto suave y firme acondicionado sin baches',
    caution: 'Completamente practicable en días lluviosos o con orballu'
  },
  {
    id: 'fario_gijon',
    name: 'Subida al Picu Fario y Parque Natural de Monte Deva',
    concejoId: 'gijon',
    concejoName: 'Gijón',
    lat: 43.4831,
    lon: -5.5881,
    startPoint: 'Centro de Interpretación de Monte Deva',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '11.0 km',
    distKm: 11.0,
    elev: '+520 m',
    elevM: 520,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 30min',
    desc: 'Ascensión a la cima más alta del concejo de Gijón (Cima del Fario, 731 m), con vistas espectaculares de la rasa costera gijonesa, el Sueve y la Cordillera.',
    surface: 'Camino de montaña, senderos forestales y pista de tierra',
    caution: 'Sendas con barro denso en los tramos de robledal sombrío tras lluvias; calzado de taco indispensable'
  },
  {
    id: 'finlandesa_oviedo',
    name: 'Pista Finlandesa y Laderas Bajas del Monte Naranco',
    concejoId: 'oviedo',
    concejoName: 'Oviedo',
    lat: 43.3758,
    lon: -5.8611,
    startPoint: 'Barrio de Fozaneldi / Ciudad Naranco',
    type: 'verde',
    typeIcon: '🛤️',
    dist: '6.0 km',
    distKm: 6.0,
    elev: '+120 m',
    elevM: 120,
    diff: 'Muy Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 30min',
    desc: 'Paseo panorámico arbolado sobre los tejados de la capital de Asturias, con fuentes naturales y excelente sombra de robles y castaños.',
    surface: 'Pista de tierra compacta afirmada muy cuidada',
    caution: 'Muy segura en cualquier época; tramos húmedos cerca de pequeñas regueras'
  },
  {
    id: 'cruz_naranco_oviedo',
    name: 'Ascensión a la Cruz del Naranco y Monumentos Prerrománicos',
    concejoId: 'oviedo',
    concejoName: 'Oviedo',
    lat: 43.3808,
    lon: -5.8681,
    startPoint: 'Santa María del Naranco',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '7.8 km',
    distKm: 7.8,
    elev: '+380 m',
    elevM: 380,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '2h 15min',
    desc: 'Ruta cultural y paisajística por las joyas del Prerrománico Asturiano (Santa María del Naranco y San Miguel de Lillo) coronando el Sagrado Corazón (634 m).',
    surface: 'Sendero de tierra, roca caliza y camino empedrado',
    caution: 'Roca pulida muy resbaladiza en las bajadas empinadas con humedad o llovizna'
  },
  {
    id: 'fuso_reina_oviedo',
    name: 'Senda Verde de Fuso de la Reina y Riberas del Nalón',
    concejoId: 'oviedo',
    concejoName: 'Oviedo',
    lat: 43.3481,
    lon: -5.8611,
    startPoint: 'Parque de Invierno de Oviedo',
    type: 'verde',
    typeIcon: '🛤️',
    dist: '8.2 km',
    distKm: 8.2,
    elev: '+40 m',
    elevM: 40,
    diff: 'Muy Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 10min',
    desc: 'Antigua vía ferroviaria que desciende desde el Parque de Invierno hasta el río Nalón y la histórica estación de Fuso, atravesando túneles iluminados y bosques de ribera.',
    surface: 'Asfalto peatonal liso y pasarelas acondicionadas',
    caution: 'Ideal para familias y días de lluvia fina al contar con túneles y piso firme'
  },

  // ==========================================
  // VALLES DEL OSO, PICOS Y MONTAÑA CENTRAL
  // ==========================================
  {
    id: 'xanas_santoadriano',
    name: 'Desfiladero de Las Xanas (Villanueva a Pedroveya)',
    concejoId: 'santoadriano',
    concejoName: 'Santo Adriano',
    lat: 43.2778,
    lon: -5.9819,
    startPoint: 'Área Recreativa de El Molín (Villanueva)',
    type: 'desfiladero',
    typeIcon: '⛰️',
    dist: '8.5 km (ida/vuelta)',
    distKm: 8.5,
    elev: '+350 m',
    elevM: 350,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 00min',
    desc: 'Declarado Monumento Natural y conocido como "El pequeño Cares de Asturias": una garganta sobrecogedora excavada en la roca viva con túneles y caída vertical sobre el arroyo de Viescas, rematando en los prados de Pedroveya.',
    surface: 'Sendero de roca viva caliza y camino de montaña empedrado',
    caution: 'Camino con cortado lateral vertical de más de 80 metros; niños siempre de la mano. Peligro de caída de piedras en temporales de lluvia o deshielo'
  },
  {
    id: 'senda_oso_proaza',
    name: 'Senda del Oso (Tramo Tuñón - Proaza - Cercado de Osos)',
    concejoId: 'proaza',
    concejoName: 'Proaza',
    lat: 43.2931,
    lon: -6.0028,
    startPoint: 'Área Recreativa de Tuñón',
    type: 'verde',
    typeIcon: '🛤️',
    dist: '12.0 km',
    distKm: 12.0,
    elev: '+110 m',
    elevM: 110,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '3h 15min',
    desc: 'La vía verde más famosa del Principado: desfiladeros de roca entre túneles ferroviarios iluminados, ríos cristalinos y paso por el recinto de las osas Paca y Molina.',
    surface: 'Asfalto especial tratado y pasarelas de madera con barandillas',
    caution: 'Muy segura y llana; moderar la marcha ante cruce con cicloturistas'
  },
  {
    id: 'xiblu_teverga',
    name: 'Hayedo de Montegrande y Cascada del Xiblu',
    concejoId: 'teverga',
    concejoName: 'Teverga',
    lat: 43.1111,
    lon: -6.0681,
    startPoint: 'Aparcamiento de La Focella / Puerto de Ventana',
    type: 'bosque',
    typeIcon: '🌲',
    dist: '8.6 km',
    distKm: 8.6,
    elev: '+240 m',
    elevM: 240,
    diff: 'Fácil-Media',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 45min',
    desc: 'Paseo mágico por el tercer hayedo más extenso de Asturias hasta los tres saltos de agua encadenados de la cascada del Xiblu (más de 100 m de caída).',
    surface: 'Pista forestal sombría y sendero de tierra y raíces',
    caution: 'Firme embarrado en el tramo final de acceso a la cascada; roca caliza muy deslizante con el vapor de agua'
  },
  {
    id: 'angliru_riosa',
    name: 'Subida al Alto del Angliru (La Cueña les Cabres y Gamonal)',
    concejoId: 'riosa',
    concejoName: 'Riosa',
    lat: 43.2211,
    lon: -5.9417,
    startPoint: 'Área de Viapará / Carretera del Angliru',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '7.5 km',
    distKm: 7.5,
    elev: '+780 m',
    elevM: 780,
    diff: 'Exigente',
    diffCat: 'alta',
    diffRank: 3,
    time: '3h 30min',
    desc: 'El coloso ciclista y senderista de la Sierra del Aramo: desniveles brutales de hasta el 23.5% en la Cueña les Cabres coronando las brañas de Gamonal (1.570 m).',
    surface: 'Carretera asfaltada de alta pendiente y pradería de montaña',
    caution: 'Gran esfuerzo físico; ambiente de alta montaña expuesto a nieblas súbitas (borrina) y frío intenso con viento'
  },
  {
    id: 'monsacro_morcin',
    name: 'Ruta al Monsacro y Ermitas Medievales (La Foz de Morcín)',
    concejoId: 'morcin',
    concejoName: 'Morcín',
    lat: 43.2781,
    lon: -5.9081,
    startPoint: 'La Foz de Morcín / Santa Eulalia',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '6.8 km',
    distKm: 6.8,
    elev: '+540 m',
    elevM: 540,
    diff: 'Media-Exigente',
    diffCat: 'media',
    diffRank: 2,
    time: '2h 45min',
    desc: 'La montaña sagrada asturiana: subida empinada hacia la meseta de cumbre donde se alzan las capillas prerrománicas y templarias de Santiago y La Magdalena (1.054 m).',
    surface: 'Camino pedregoso de montaña y senda caliza',
    caution: 'Subida pronunciada; piedras sueltas en la canal y niebla espesa que desorienta en la meseta cimera'
  },
  {
    id: 'foces_pino_aller',
    name: 'Monumento Natural de las Foces del Pino',
    concejoId: 'aller',
    concejoName: 'Aller',
    lat: 43.1258,
    lon: -5.5181,
    startPoint: 'Pueblo de El Pino (Aller)',
    type: 'desfiladero',
    typeIcon: '⛰️',
    dist: '7.2 km (ida/vuelta)',
    distKm: 7.2,
    elev: '+290 m',
    elevM: 290,
    diff: 'Fácil-Media',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 30min',
    desc: 'Desfiladero angosto tallado por el río San Félix con puentes de piedra medievales y paredes de roca caliza separadas por apenas 6 metros de anchura.',
    surface: 'Calzada empedrada tradicional y sendero de montaña',
    caution: 'Empedrado antiguo muy resbaladizo si ha llovido; cruce con ganado de montaña'
  },
  {
    id: 'ruta_carisa_lena',
    name: 'Vía Romana de La Carisa (Puerto de La Carisa)',
    concejoId: 'lena',
    concejoName: 'Lena',
    lat: 42.9911,
    lon: -5.7511,
    startPoint: 'Pendilla / Puerto de Pajares',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '14.0 km',
    distKm: 14.0,
    elev: '+420 m',
    elevM: 420,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '4h 30min',
    desc: 'La calzada militar que utilizaron las legiones romanas de Publio Carisio para cruzar la Cordillera Cantábrica, discurriendo por las cumbres de los cordales con vistas panorámicas únicas.',
    surface: 'Pista de montaña de zahorra y senda de crestería',
    caution: 'Ruta de gran altitud (>1.500 m) desabrigada; vientos gélidos y nieblas habituales'
  },
  {
    id: 'ruta_alba_sobrescobio',
    name: 'Monumento Natural de la Ruta del Alba (Parque de Redes)',
    concejoId: 'sobrescobio',
    concejoName: 'Sobrescobio',
    lat: 43.2011,
    lon: -5.4658,
    startPoint: 'Piscifactoría de Soto de Agues',
    type: 'desfiladero',
    typeIcon: '⛰️',
    dist: '14.2 km (ida/vuelta)',
    distKm: 14.2,
    elev: '+380 m',
    elevM: 380,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '4h 00min',
    desc: 'Una de las rutas más emblemáticas y accesibles de Asturias: remonta el río Alba entre cascadas rumorosas, hayedos y un cañón calizo impresionante donde apenas entra el sol.',
    surface: 'Pista hormigonada en los primeros kilómetros y senda acondicionada de montaña',
    caution: 'Firme seguro apto para todas las edades; abrigarse al entrar en el desfiladero por la caída de temperatura'
  },
  {
    id: 'desfiladero_arrudos_caso',
    name: 'Desfiladero de los Arrudos (Caleao a La Infiesta)',
    concejoId: 'caso',
    concejoName: 'Caso',
    lat: 43.1608,
    lon: -5.3958,
    startPoint: 'Pueblo de Caleao (Parque Natural de Redes)',
    type: 'desfiladero',
    typeIcon: '⛰️',
    dist: '13.5 km',
    distKm: 13.5,
    elev: '+620 m',
    elevM: 620,
    diff: 'Media-Exigente',
    diffCat: 'media',
    diffRank: 2,
    time: '4h 30min',
    desc: 'Garganta caliza salvaje con escalones tallados en la roca madre («El Collaín»), hayedos frondosos de Redes y majadas de alta montaña.',
    surface: 'Roca caliza pulida, escalones de piedra y senda de tierra',
    caution: 'Caliza sumamente resbaladiza con humedad en los escalones; calzado de montaña técnico imprescindible'
  },

  // ==========================================
  // ORIENTE, PICOS DE EUROPA Y COSTA DE LLANES
  // ==========================================
  {
    id: 'cares_cabrales',
    name: 'Ruta de la Garganta del Cares (Poncebos a Caín)',
    concejoId: 'cabrales',
    concejoName: 'Cabrales',
    lat: 43.2567,
    lon: -4.8333,
    startPoint: 'Puente de Poncebos (Cabrales)',
    type: 'desfiladero',
    typeIcon: '⛰️',
    dist: '12.0 km (ida) / 24 km (i/v)',
    distKm: 12.0,
    elev: '+250 m',
    elevM: 250,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 30min (ida)',
    desc: 'La "Garganta Divina" de los Picos de Europa: el sendero más famoso de España excavado a pico en las entrañas de la roca caliza con cortados verticales de más de mil metros.',
    surface: 'Camino de gravilla y roca caliza tallado en el cantil',
    caution: 'Caída vertical directa al abismo sin barandilla en muchos tramos; prohibido bicicletas y carritos. Peligro extremo de desprendimientos en lluvia'
  },
  {
    id: 'lagos_covadonga_cangas',
    name: 'Circular de los Lagos de Covadonga (Enol - Ercina - Bricial)',
    concejoId: 'cangasdeonis',
    concejoName: 'Cangas de Onís',
    lat: 43.2725,
    lon: -4.9858,
    startPoint: 'Aparcamiento de Buferrera / Centro Pedro Pidal',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '5.8 km',
    distKm: 5.8,
    elev: '+160 m',
    elevM: 160,
    diff: 'Fácil-Media',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 00min',
    desc: 'Los lagos glaciares más célebres de la península: pastizales alpinos, hayas centenarias del bosque de Palomberu y cumbres calizas del macizo occidental.',
    surface: 'Sendero de pasto, losas de piedra, escalones y pista de grava',
    caution: 'Niebla de montaña extremadamente repentina y espesa; caliza pulida muy deslizante con orballu'
  },
  {
    id: 'bulnes_canal_tejo_cabrales',
    name: 'Subida a Bulnes por la Canal del Tejo',
    concejoId: 'cabrales',
    concejoName: 'Cabrales',
    lat: 43.2567,
    lon: -4.8181,
    startPoint: 'Puente de Poncebos (Junto al funicular)',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '4.2 km (ida)',
    distKm: 4.2,
    elev: '+490 m',
    elevM: 490,
    diff: 'Media-Exigente',
    diffCat: 'media',
    diffRank: 2,
    time: '1h 45min (ida)',
    desc: 'El camino histórico que comunicaba a pie la aldea aislada de Bulnes con el mundo: una canal empinada y espectacular encajada entre peñas calizas.',
    surface: 'Sendero empinado de piedra suelta, caliza y escalones de roca',
    caution: 'Pendiente continua exigente; piedras rodantes en bajada y piso resbaladizo tras orballu'
  },
  {
    id: 'pandebano_urriellu_cabrales',
    name: 'Collado Pandébano y Mirador del Picu Urriellu (Naranjo de Bulnes)',
    concejoId: 'cabrales',
    concejoName: 'Cabrales',
    lat: 43.2381,
    lon: -4.7958,
    startPoint: 'Curva de Sotres / Collado Pandébano',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '9.0 km (ida/vuelta)',
    distKm: 9.0,
    elev: '+560 m',
    elevM: 560,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 30min',
    desc: 'La meca del montañismo asturiano: pastizales de alta montaña hasta el pie de la mítica pared Oeste del Picu Urriellu (2.519 m).',
    surface: 'Sendero de alta montaña pedregoso y praderías calizas',
    caution: 'Alta montaña exigente: cambios de tiempo radicales en cuestión de minutos, viento gélido y nieblas de cumbre'
  },
  {
    id: 'pelono_ponga',
    name: 'Bosque de Peloño y Roblón de Los Biforcos (Parque de Ponga)',
    concejoId: 'ponga',
    concejoName: 'Ponga',
    lat: 43.1581,
    lon: -5.1658,
    startPoint: 'Collada de Les Bedules (San Juan de Beleño)',
    type: 'bosque',
    typeIcon: '🌲',
    dist: '13.0 km',
    distKm: 13.0,
    elev: '+340 m',
    elevM: 340,
    diff: 'Fácil-Media',
    diffCat: 'facil',
    diffRank: 1,
    time: '4h 00min',
    desc: 'El mayor hayedo continuo de Asturias y Reserva Natural Integral: más de 200.000 hayas centenarias, robles monumentales y vistas a los Picos de Europa.',
    surface: 'Pista forestal de tierra y grava compacta',
    caution: 'Tránsito fácil y protegido del viento; espectacular en seronda (otoño) por la gama cromática de las hojas'
  },
  {
    id: 'molinos_profundo_villaviciosa',
    name: 'Ruta de los Molinos del Río Profundo (Valdediós)',
    concejoId: 'villaviciosa',
    concejoName: 'Villaviciosa',
    lat: 43.4358,
    lon: -5.5011,
    startPoint: 'Valbucar / Monasterio de Valdediós',
    type: 'fluvial',
    typeIcon: '🌊',
    dist: '7.4 km (ida/vuelta)',
    distKm: 7.4,
    elev: '+180 m',
    elevM: 180,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 30min',
    desc: 'Sendero sombrío de ribera que remonta el río Profundo entre pozas esmeraldas, helechos gigantes y más de una veintena de molinos de agua en ruinas.',
    surface: 'Sendero de tierra, pasarelas de madera y raíces',
    caution: 'Firme muy húmedo y tramos con barro denso en épocas de lluvia; calzado con agarre imprescindible'
  },
  {
    id: 'ria_villaviciosa',
    name: 'Senda de la Ría de Villaviciosa y El Puntal',
    concejoId: 'villaviciosa',
    concejoName: 'Villaviciosa',
    lat: 43.5181,
    lon: -5.4181,
    startPoint: 'Playa de El Puntal / Puerto de Tazones',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '6.5 km',
    distKm: 6.5,
    elev: '+40 m',
    elevM: 40,
    diff: 'Muy Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 45min',
    desc: 'Reserva Natural Parcial de la Ría: observación de aves migratorias, marismas, bosque de ribera y ensenadas arenosas protegidas.',
    surface: 'Pasarelas de madera sobre marisma y camino afirmado',
    caution: 'Completamente llana y muy accesible en cualquier día'
  },
  {
    id: 'acantilados_infierno_ribadesella',
    name: 'Senda de los Acantilados del Infierno y Río Guadamía',
    concejoId: 'ribadesella',
    concejoName: 'Ribadesella',
    lat: 43.4611,
    lon: -5.0081,
    startPoint: 'Área Recreativa de Guadamía / Cuerres',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '7.8 km',
    distKm: 7.8,
    elev: '+120 m',
    elevM: 120,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 15min',
    desc: 'Uno de los tramos costeros más salvajes de Asturias: arcos naturales de roca caliza esculpidos por el mar bravo, simas verticales y cortados rocosos.',
    surface: 'Sendero sobre la rasa marina y caminos de hierba y tierra',
    caution: 'Extrema precaución al borde de las simas y acantilados con viento fuerte'
  },
  {
    id: 'bufones_pria_llanes',
    name: 'Monumento Natural de los Bufones de Pría (Llames de Pría)',
    concejoId: 'llanes',
    concejoName: 'Llanes',
    lat: 43.4608,
    lon: -4.9758,
    startPoint: 'Playa de Guadamía / Llames de Pría',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '6.2 km (circular)',
    distKm: 6.2,
    elev: '+90 m',
    elevM: 90,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 45min',
    desc: 'Chimeneas naturales en la roca caliza marina por las que el mar Cantábrico expulsado a presión brama y lanza chorros pulverizados de agua salada a más de 20 metros de altura en días de mar de fondo.',
    surface: 'Rasa costera de hierba y roca caliza kárstica',
    caution: 'En días de temporal nunca asomarse a los agujeros de los bufones; la fuerza del aire y agua es violenta'
  },
  {
    id: 'costera_llanes',
    name: 'Senda Costera de Llanes (Poo - Celorio - Niembro - Torimbia)',
    concejoId: 'llanes',
    concejoName: 'Llanes',
    lat: 43.4358,
    lon: -4.7811,
    startPoint: 'Playa de Poo / Celorio',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '10.5 km',
    distKm: 10.5,
    elev: '+150 m',
    elevM: 150,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '3h 00min',
    desc: 'La joya del litoral oriental: calas de arena blanca, rías mareales (Poo, Niembro con su iglesia en la marisma) y la icónica playa salvaje de Torimbia.',
    surface: 'Camino afirmado, pistas vecinales y senda de tierra',
    caution: 'Muy cómoda y señalizada; protección solar necesaria en días despejados'
  },
  {
    id: 'camin_encantau_llanes',
    name: 'El Camín Encantáu del Valle de Ardisana',
    concejoId: 'llanes',
    concejoName: 'Llanes',
    lat: 43.3781,
    lon: -4.8911,
    startPoint: 'Pueblo de La Venta de Los Probes (Valle de Ardisana)',
    type: 'bosque',
    typeIcon: '🌲',
    dist: '9.0 km (circular)',
    distKm: 9.0,
    elev: '+280 m',
    elevM: 280,
    diff: 'Fácil-Media',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 45min',
    desc: 'Sendero mágico entre bosques de castaños donde aguardan esculturas de madera de la mitología asturiana: el Nuberu, el Cuélebre, el Trasgu, la Xana y el Busgosu.',
    surface: 'Caminos de tierra, calzadas vecinales y senderos forestales',
    caution: 'Perfecta para senderistas de todas las edades; húmeda en zonas de arroyo sombrío'
  },

  // ==========================================
  // OCCIDENTE, SOMIEDO Y VALLES DEL NAVIA
  // ==========================================
  {
    id: 'vidio_cudillero',
    name: 'Ruta de los Acantilados de Cabo Vidio (Oviñana)',
    concejoId: 'cudillero',
    concejoName: 'Cudillero',
    lat: 43.5858,
    lon: -6.2411,
    startPoint: 'Faro de Cabo Vidio (Oviñana)',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '6.8 km',
    distKm: 6.8,
    elev: '+110 m',
    elevM: 110,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 50min',
    desc: 'Murallón rocoso de 80 metros de altura sobre el mar bravío, con la espectacular cueva marina de La Iglesiona bajo el faro y vistas desde Peñas hasta Estaca de Bares.',
    surface: 'Sendero de tierra costero y pasarelas protegidas',
    caution: 'Viento fuerte en temporales marinos; no abandonar las zonas delimitadas'
  },
  {
    id: 'ballenas_valdes',
    name: 'Senda de las Ballenas y Cabo Busto',
    concejoId: 'valdes',
    concejoName: 'Valdés',
    lat: 43.5658,
    lon: -6.4681,
    startPoint: 'Pueblo de Busto (Luarca)',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '7.5 km (circular)',
    distKm: 7.5,
    elev: '+130 m',
    elevM: 130,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 15min',
    desc: 'Circuito circular sobre los acantilados de la rasa de Busto, histórico oteadero de balleneros medievales con miradores acondicionados sobre calas salvajes.',
    surface: 'Pistas agrícolas llanas y sendero afirmado',
    caution: 'Ruta muy cómoda y de escaso desnivel; atención a ráfagas de viento de mar'
  },
  {
    id: 'foces_esva_valdes',
    name: 'Monumento Natural de las Foces del Esva (Paredes)',
    concejoId: 'valdes',
    concejoName: 'Valdés',
    lat: 43.4508,
    lon: -6.4528,
    startPoint: 'Paredes / San Pedro de Paredes',
    type: 'desfiladero',
    typeIcon: '⛰️',
    dist: '9.8 km',
    distKm: 9.8,
    elev: '+360 m',
    elevM: 360,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 15min',
    desc: 'Garganta salvaje abierta en la cuarcita por el río Esva entre nutrias, madroños y carballos, con sendas talladas a media ladera sobre aguas transparentes.',
    surface: 'Sendero estrecho de piedra, tierra y tramos rocosos',
    caution: 'Sendero estrecho sobre el cañón fluvial; extremar la precaución con piso mojado'
  },
  {
    id: 'naviega_navia',
    name: 'Senda Costera Naviega (Barayo - Frejulfe - Navia)',
    concejoId: 'navia',
    concejoName: 'Navia',
    lat: 43.5581,
    lon: -6.6508,
    startPoint: 'Reserva Natural Parcial de Barayo / Puerto de Vega',
    type: 'costera',
    typeIcon: '🏖️',
    dist: '13.5 km',
    distKm: 13.5,
    elev: '+210 m',
    elevM: 210,
    diff: 'Fácil-Media',
    diffCat: 'facil',
    diffRank: 1,
    time: '3h 45min',
    desc: 'Considerada una de las sendas costeras más vírgenes del Cantábrico: dunas de Barayo, el pintoresco puerto marinero de Puerto de Vega y los pinares de la playa de Frejulfe.',
    surface: 'Sendero de tierra sobre rasa costera y pistas agrícolas',
    caution: 'Ruta larga pero de fácil relieve; llevar agua y protección'
  },
  {
    id: 'cascadas_oneta_villayon',
    name: 'Monumento Natural de las Cascadas de Oneta',
    concejoId: 'villayon',
    concejoName: 'Villayón',
    lat: 43.4581,
    lon: -6.7028,
    startPoint: 'Pueblo de Oneta (Villayón)',
    type: 'fluvial',
    typeIcon: '🌊',
    dist: '4.2 km (ida/vuelta)',
    distKm: 4.2,
    elev: '+110 m',
    elevM: 110,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 30min',
    desc: 'Grupo de tres impresionantes cascadas encadenadas, destacando La Firbia con un salto continuo de más de 15 metros entre robledales y antiguos molinos harineros.',
    surface: 'Camino empedrado y senda de tierra de ribera',
    caution: 'Piedras y raíces húmedas resbaladizas en la bajada final a la poza de la cascada'
  },
  {
    id: 'lago_valle_somiedo',
    name: 'Ruta de Valle de Lago al Lago del Valle (Parque de Somiedo)',
    concejoId: 'somiedo',
    concejoName: 'Somiedo',
    lat: 43.0781,
    lon: -6.2167,
    startPoint: 'Valle de Lago (Somiedo)',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '12.0 km (ida/vuelta)',
    distKm: 12.0,
    elev: '+320 m',
    elevM: 320,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 45min',
    desc: 'Valle glaciar de origen cuaternario con brañas de teitos de escoba que conduce al mayor lago natural de Asturias (1.570 m), enclavado bajo los paredones calizos de Peña Llana.',
    surface: 'Pista de montaña afirmada y sendero de tierra y piedra',
    caution: 'Clima de alta montaña: viento frío y sensación térmica reducida; abrigarse adecuadamente'
  },
  {
    id: 'saliencia_somiedo',
    name: 'Ruta de los Lagos de Saliencia (Alto de la Farrapona)',
    concejoId: 'somiedo',
    concejoName: 'Somiedo',
    lat: 43.0611,
    lon: -6.0917,
    startPoint: 'Alto de la Farrapona (Límite con León)',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '8.5 km (circular)',
    distKm: 8.5,
    elev: '+360 m',
    elevM: 360,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 00min',
    desc: 'Conjunto kárstico de 4 lagos glaciares (Cueva, Almagrera, Cerveriz y Calabazosa) a más de 1.600 metros de altitud, con los tonos turquesas y rojizos de las antiguas minas de hierro.',
    surface: 'Pistas mineras de grava y senderos calizos alpinos',
    caution: 'Prohibido bañarse (reserva biológica); exposición solar muy alta y vientos fríos'
  },
  {
    id: 'muniellos_cangasnarcea',
    name: 'Bosque de Muniellos (Paseo de Moal y Miradores)',
    concejoId: 'cangasdelnarcea',
    concejoName: 'Cangas del Narcea',
    lat: 43.0858,
    lon: -6.6881,
    startPoint: 'Pueblo de Moal (Puerta de Muniellos)',
    type: 'bosque',
    typeIcon: '🌲',
    dist: '9.2 km',
    distKm: 9.2,
    elev: '+380 m',
    elevM: 380,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 15min',
    desc: 'Entorno de la mayor masa forestal de roble albar de Europa occidental, paseando por los bosques protegidos de Moal con vistas al corazón de la Reserva Integral.',
    surface: 'Pistas forestales, sendas de monte y caminos de ribera',
    caution: 'Ambiente muy húmedo; calzado con membrana impermeable recomendado'
  },
  {
    id: 'nonaya_salas',
    name: 'Ruta de las Cascadas de Nonaya (Camino Primitivo)',
    concejoId: 'salas',
    concejoName: 'Salas',
    lat: 43.4111,
    lon: -6.2658,
    startPoint: 'Colegiata de Santa María la Mayor de Salas',
    type: 'fluvial',
    typeIcon: '🌊',
    dist: '6.5 km (ida/vuelta)',
    distKm: 6.5,
    elev: '+140 m',
    elevM: 140,
    diff: 'Muy Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 50min',
    desc: 'Itinerario umbrío del Camino de Santiago Primitivo bordeando el río Nonaya entre puentes centenarios y castaños monumentales hasta la cascada y poza cristalina.',
    surface: 'Pista forestal compacta y camino empedrado tradicional',
    caution: 'Firme suave y cómodo; ideal para días calurosos o paseos en familia'
  },

  // ==========================================
  // JOYAS DEL SUROCCIDENTE, OSCOS Y CORDILLERA (AMPLIACIÓN OFICIAL)
  // ==========================================
  {
    id: 'seimeira_santauelaliaoscos',
    name: 'Senda de la Seimeira y Cascada del Murias (Los Oscos)',
    concejoId: 'santaeulaliadeoscos',
    concejoName: 'Santa Eulalia de Oscos',
    lat: 43.2592,
    lon: -7.0203,
    startPoint: 'Pueblo de Pumares (Santa Eulalia de Oscos)',
    type: 'fluvial',
    typeIcon: '🌊',
    dist: '7.6 km (ida/vuelta)',
    distKm: 7.6,
    elev: '+160 m',
    elevM: 160,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 15min',
    desc: 'Valle encantado del río Agüeira entre castañares y bosques autóctonos de ribera que culmina en la espectacular cascada de La Seimeira, con un salto vertical de agua de 30 metros de caída libre.',
    surface: 'Sendero tradicional de tierra y pasarelas de madera',
    caution: 'Húmedo junto a las pozas del río; ideal y resguardado del viento en cualquier época'
  },
  {
    id: 'agua_taramundi',
    name: 'Ruta del Agua de Taramundi y Mazonovo',
    concejoId: 'taramundi',
    concejoName: 'Taramundi',
    lat: 43.3606,
    lon: -7.1089,
    startPoint: 'Taramundi (Plaza del Pousadoiro)',
    type: 'fluvial',
    typeIcon: '🌊',
    dist: '14.0 km (circular)',
    distKm: 14.0,
    elev: '+380 m',
    elevM: 380,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '4h 00min',
    desc: 'Cuna del turismo rural español: molinos de agua, el mayor museo de molinos de España (Mazonovo), ferrerías tradicionales, cascada del Salgueiro y los telares de Esquíos.',
    surface: 'Caminos de herradura, pistas forestales y sendas de ribera',
    caution: 'Ruta de media distancia con subidas tendidas; calzado de montaña con buen agarre'
  },
  {
    id: 'cioyo_castropol',
    name: 'Ruta de la Cascada de Cioyo (Ría del Eo)',
    concejoId: 'castropol',
    concejoName: 'Castropol',
    lat: 43.4912,
    lon: -6.9815,
    startPoint: 'Pueblo de Vilarín (Castropol)',
    type: 'bosque',
    typeIcon: '🌲',
    dist: '4.5 km (ida/vuelta)',
    distKm: 4.5,
    elev: '+140 m',
    elevM: 140,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 30min',
    desc: 'Sendero umbrío a través de un cañón boscoso de robles, abedules y laureles que desciende hasta el salto escondido del río Cioyo en el corazón de la Reserva de la Biosfera del Eo.',
    surface: 'Sendero de bosque con cuerdas de apoyo y escalones de madera',
    caution: 'Firme húmedo con raíces resbaladizas en el tramo de bajada hacia la cascada'
  },
  {
    id: 'pornacal_somiedo',
    name: 'Brañas de La Pornacal y Los Cuetos (Villar de Vildas)',
    concejoId: 'somiedo',
    concejoName: 'Somiedo',
    lat: 43.1167,
    lon: -6.2917,
    startPoint: 'Villar de Vildas (Pueblo Ejemplar de Asturias)',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '11.5 km (ida/vuelta)',
    distKm: 11.5,
    elev: '+420 m',
    elevM: 420,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 30min',
    desc: 'El mayor conjunto de brañas con cabañas de teito de escoba de toda Europa. Remonta el valle del río Pigüeña entre hayedos y pastizales bajo la mirada del oso pardo cantábrico.',
    surface: 'Pista de montaña de hormigón/grava y camino afirmado',
    caution: 'Excelente firme en todo el recorrido; abrigarse por ser valle de montaña con viento de fondo'
  },
  {
    id: 'hermo_cangasnarcea',
    name: 'Hayedo de Hermo y Fuentes del Narcea',
    concejoId: 'cangasdelnarcea',
    concejoName: 'Cangas del Narcea',
    lat: 42.9912,
    lon: -6.5612,
    startPoint: 'Pueblo de Monasterio de Hermo (Cangas del Narcea)',
    type: 'bosque',
    typeIcon: '🌲',
    dist: '10.2 km',
    distKm: 10.2,
    elev: '+390 m',
    elevM: 390,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 15min',
    desc: 'Una de las mayores masas forestales de haya de la Cordillera Cantábrica (más de 1.500 hectáreas). Remonta el valle del recién nacido río Narcea entre acebos, líquenes y cascadas alpinas.',
    surface: 'Pistas forestales y senderos de monte',
    caution: 'Zona de alta montaña protegida; nieblas frecuentes en cotas altas sobre 1.400 m'
  },
  {
    id: 'oro_ibias',
    name: 'Ruta del Oro y Lagunas de Salgueiras (Ibias)',
    concejoId: 'ibias',
    concejoName: 'Ibias',
    lat: 43.0415,
    lon: -6.8711,
    startPoint: 'San Antolín de Ibias / Cecos',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '12.8 km',
    distKm: 12.8,
    elev: '+460 m',
    elevM: 460,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 45min',
    desc: 'Paisajes vírgenes del suroccidente asturiano con canales romanos excavados en roca para la extracción de oro (ruina montium) y lagunas en la comarca con más horas de sol de Asturias.',
    surface: 'Caminos de montaña, pistas y sendas tradicionales',
    caution: 'Clima de interior muy contrastado: soleado y cálido de día, fresco al atardecer'
  },
  {
    id: 'biescona_sueve',
    name: 'Hayedo de La Biescona (Sierra del Sueve)',
    concejoId: 'colunga',
    concejoName: 'Colunga',
    lat: 43.4568,
    lon: -5.2012,
    startPoint: 'Mirador del Fitu / Casa Julia',
    type: 'bosque',
    typeIcon: '🌲',
    dist: '5.5 km (ida/vuelta)',
    distKm: 5.5,
    elev: '+280 m',
    elevM: 280,
    diff: 'Fácil-Media',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 00min',
    desc: 'El hayedo a menor altitud de toda la Península Ibérica y de Europa (apenas 200 m sobre el nivel del mar). Un bosque umbrío y jurásico envuelto en brumas marinas, musgos y tejos milenarios.',
    surface: 'Sendero de montaña con piedras, tierra y hojas húmedas',
    caution: 'Humedad permanente y piso resbaladizo entre las hayas; bastones de marcha recomendables'
  },
  {
    id: 'picu_pienzu_parres',
    name: 'Ascensión al Picu Pienzu (Mirador del Fitu - Cumbre 1.161 m)',
    concejoId: 'parres',
    concejoName: 'Parres',
    lat: 43.4389,
    lon: -5.1956,
    startPoint: 'Aparcamiento del Mirador del Fitu',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '10.0 km (ida/vuelta)',
    distKm: 10.0,
    elev: '+580 m',
    elevM: 580,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 30min',
    desc: 'El mejor balcón panorámico de Asturias: cumbre solitaria sobre el mar Cantábrico que ofrece una perspectiva 360° inigualable de toda la costa oriental y los murallones de los Picos de Europa.',
    surface: 'Caminos de pastos de montaña y canchales pedregosos calizos',
    caution: 'Exposición total al viento; cumbre despejada con frío de altitud; no subir con borrina'
  },
  {
    id: 'foces_raigosu_laviana',
    name: 'Monumento Natural de las Foces del Raigosu',
    concejoId: 'laviana',
    concejoName: 'Laviana',
    lat: 43.2189,
    lon: -5.5112,
    startPoint: 'Pueblo de El Condado (Laviana)',
    type: 'desfiladero',
    typeIcon: '⛰️',
    dist: '8.5 km',
    distKm: 8.5,
    elev: '+310 m',
    elevM: 310,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '2h 45min',
    desc: 'Profundo desfiladero calizo labrado por el río Raigosu en el valle del Nalón, con farallones verticales de más de 300 metros, túneles naturales y encinares cantábricos en abrigo térmico.',
    surface: 'Pista de tierra afirmada y sendero de piedra',
    caution: 'Zona de cañón fresco; firme transitable y bien definido'
  },
  {
    id: 'torres_aller',
    name: 'Pico Torres desde el Puerto de San Isidro (Cumbre 2.104 m)',
    concejoId: 'aller',
    concejoName: 'Aller',
    lat: 43.0612,
    lon: -5.3912,
    startPoint: 'Puerto de San Isidro / La Raya (Aller)',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '7.2 km (ida/vuelta)',
    distKm: 7.2,
    elev: '+590 m',
    elevM: 590,
    diff: 'Alta',
    diffCat: 'dificil',
    diffRank: 3,
    time: '3h 15min',
    desc: 'Pirámide caliza altiva que preside la Cordillera Cantábrica central. Ascensión montañera por la Majada de Torres y collado hasta la arista cimera con vistas espectaculares a Redes y Ubiñas.',
    surface: 'Canchales pedregosos de alta montaña y senda caliza empinada',
    caution: 'Alta montaña: requiere experiencia, buen calzado de taco y abstenerse con viento o niebla'
  },
  {
    id: 'cascadas_guanga_oviedo',
    name: 'Ruta de las Cascadas de Guanga (San Andrés de Trubia)',
    concejoId: 'oviedo',
    concejoName: 'Oviedo',
    lat: 43.3289,
    lon: -5.9812,
    startPoint: 'San Andrés de Trubia (Oviedo)',
    type: 'fluvial',
    typeIcon: '🌊',
    dist: '4.5 km (circular)',
    distKm: 4.5,
    elev: '+220 m',
    elevM: 220,
    diff: 'Fácil-Media',
    diffCat: 'facil',
    diffRank: 1,
    time: '1h 45min',
    desc: 'Joya fluvial escondida en los valles del Trubia: serie de cascadas y pozas en hilera descendiendo entre bosques densos de castaños y robles autóctonos.',
    surface: 'Sendero de tierra de bosque con raíces y piedras',
    caution: 'Tramos empinados con barro húmedo en bajadas; bastones recomendables tras lluvias'
  },
  {
    id: 'beyo_ponga',
    name: 'Desfiladero de Los Beyos y Puente Vidosa',
    concejoId: 'ponga',
    concejoName: 'Ponga',
    lat: 43.1989,
    lon: -5.1012,
    startPoint: 'Puente Vidosa / Desfiladero del Sella',
    type: 'desfiladero',
    typeIcon: '⛰️',
    dist: '6.0 km',
    distKm: 6.0,
    elev: '+290 m',
    elevM: 290,
    diff: 'Media',
    diffCat: 'media',
    diffRank: 2,
    time: '2h 15min',
    desc: 'Imponente cañón fluvial encajonado entre murallas de roca de más de mil metros de altura sobre el río Sella, con la cascada de Aguasaliu de 40 metros de caída.',
    surface: 'Sendero empedrado tradicional y tramos calizos',
    caution: 'Imprescindible no salir del trazado señalizado; húmedo y sonoro por el rumor del agua'
  },
  {
    id: 'pena_mea_laviana',
    name: 'Ruta de Peña Mea y el Ojo de Buey (Pelúgano)',
    concejoId: 'laviana',
    concejoName: 'Laviana',
    lat: 43.1712,
    lon: -5.5412,
    startPoint: 'Pueblo de Pelúgano (Laviana)',
    type: 'montaña',
    typeIcon: '🏔️',
    dist: '8.5 km (ida/vuelta)',
    distKm: 8.5,
    elev: '+620 m',
    elevM: 620,
    diff: 'Media-Alta',
    diffCat: 'media',
    diffRank: 2,
    time: '3h 45min',
    desc: 'Una de las montañas más legendarias de Asturias: ascensión hacia el Ojo de Buey, un descomunal arco natural de roca caliza de 20 metros de diámetro con vistas panorámicas únicas.',
    surface: 'Caminos de pradería empinada y senderos calizos pedregosos',
    caution: 'Desnivel pronunciado; terreno kárstico resbaladizo con humedad; calzado firme de montaña'
  },
  {
    id: 'teverga_entrago',
    name: 'Senda del Oso - Ramal Teverga y Cueva Huerta',
    concejoId: 'teverga',
    concejoName: 'Teverga',
    lat: 43.1612,
    lon: -6.0912,
    startPoint: 'Entrago / San Martín de Teverga',
    type: 'valle',
    typeIcon: '🪵',
    dist: '9.0 km',
    distKm: 9.0,
    elev: '+120 m',
    elevM: 120,
    diff: 'Fácil',
    diffCat: 'facil',
    diffRank: 1,
    time: '2h 30min',
    desc: 'Tramo alto y más salvaje del antiguo ferrocarril minero: desfiladeros fluviales de Peña Sobia, túneles iluminados en la roca y aproximación al Monumento Natural de Cueva Huerta.',
    surface: 'Pista asfaltada y afirmada completamente llana y segura',
    caution: 'Ruta 100% transitable para todas las edades, niños y carritos; inmune al barro'
  }
];

/**
 * Obtiene y enriquece las sendas para cualquier concejo:
 * Calcula la distancia exacta en km desde las coordenadas del concejo (o usuario)
 * a cada ruta de Asturias, permitiendo explorar sendas locales y provinciales por cercanía.
 */
export function getRoutesForConcejo(concejo, userCoords = null) {
  if (!concejo) return [];

  const refLat = (userCoords && userCoords.lat) ? userCoords.lat : (concejo.lat || 43.36);
  const refLon = (userCoords && userCoords.lon) ? userCoords.lon : (concejo.lon || -5.85);

  return RUTAS_ASTURIAS_CATALOGO.map(r => {
    const distKmFromUser = calculateDistanceKm(refLat, refLon, r.lat, r.lon);
    const isLocal = (r.concejoId === concejo.id);
    return {
      ...r,
      distFromUserKm: distKmFromUser,
      isLocal
    };
  });
}

/**
 * Motor de Evaluación Meteorológica de Confort en Senderismo
 */
export function calculateHikingIndex(data, concejo, selectedDay = 'today') {
  if (!data || !data.weather || !data.weather.current) {
    return {
      score: 7,
      status: 'good',
      label: 'Favorable para Caminar',
      badgeClass: 'hike-good',
      icon: '🟢',
      summary: 'Condiciones meteorológicas teóricas aptas para la marcha.',
      mudIndex: { level: 'Bajo', desc: 'Sendas secas o con humedad normal', color: '#10b981', score: 1, rain24h: '0.0' },
      windChillHigh: 16,
      windSpeed: 10,
      windGust: 15,
      tempNow: 16,
      feelsLike: 16,
      humidity: 65,
      uv: 4
    };
  }

  const { current, hourly, daily } = data.weather;
  const now = new Date();
  const isTomorrow = (selectedDay === 'tomorrow');

  let startIndex = 0;
  if (hourly && hourly.time) {
    if (isTomorrow) {
      const tom = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const tomMorningStr = `${tom.getFullYear()}-${String(tom.getMonth() + 1).padStart(2, '0')}-${String(tom.getDate()).padStart(2, '0')}T09:00`;
      const foundIdx = hourly.time.findIndex(t => t >= tomMorningStr);
      startIndex = foundIdx !== -1 ? foundIdx : Math.min(33, hourly.time.length - 1);
    } else {
      const currentHourStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:00`;
      for (let i = 0; i < hourly.time.length; i++) {
        if (hourly.time[i] >= currentHourStr) {
          startIndex = i;
          break;
        }
      }
    }
  }

  const midIdx = isTomorrow ? Math.min(startIndex + 3, (hourly?.time?.length || 1) - 1) : startIndex;

  const temp = isTomorrow
    ? (hourly?.temperature_2m?.[midIdx] ?? daily?.temperature_2m_max?.[1] ?? 15)
    : (current.temperature_2m || 15);
  const wind = isTomorrow
    ? (hourly?.wind_speed_10m?.[midIdx] ?? daily?.wind_speed_10m_max?.[1] ?? 10)
    : (current.wind_speed_10m || 10);
  const windGust = isTomorrow
    ? (hourly?.wind_gusts_10m?.[midIdx] ?? daily?.wind_gusts_10m_max?.[1] ?? (wind * 1.3))
    : (current.wind_gusts_10m || wind * 1.3);
  const code = isTomorrow
    ? (hourly?.weather_code?.[midIdx] ?? daily?.weather_code?.[1] ?? 0)
    : (current.weather_code || 0);
  const precipNow = isTomorrow ? 0 : (current.precipitation || 0);
  const humidity = isTomorrow
    ? (hourly?.relative_humidity_2m?.[midIdx] ?? 70)
    : (current.relative_humidity_2m || 70);

  // 1. Análisis de lluvia reciente y firme del terreno (Llamuergues / Barro)
  let rainFallenToday = 0;
  if (hourly && hourly.precipitation && startIndex > 0) {
    const lookbackStart = isTomorrow ? Math.max(0, startIndex - 24) : 0;
    for (let i = lookbackStart; i < startIndex; i++) {
      rainFallenToday += parseFloat(hourly.precipitation[i]) || 0;
    }
    if (isTomorrow) rainFallenToday = rainFallenToday * 0.7; // Drenaje nocturno natural del terreno
  } else if (daily && daily.precipitation_sum) {
    rainFallenToday = parseFloat(daily.precipitation_sum[isTomorrow ? 1 : 0]) || 0;
  }

  // 2. Ventana de Nowcasting en las próximas 6-8 horas desde el inicio de ruta
  let rainInNext6h = 0;
  let maxNextPop = 0;
  let hasStormInWindow = false;
  let firstRainHourStr = null;

  if (hourly && hourly.precipitation) {
    const windowHours = isTomorrow ? 8 : 6;
    const windowLimit = Math.min(hourly.precipitation.length, startIndex + windowHours);
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

  // Ponderación del estado del firme: agua caída + lluvia inminente en las primeras 2 horas
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
  let label = isTomorrow ? 'Mañana Ideal de Marcha' : 'Jornada Ideal de Marcha';
  let badgeClass = 'hike-optimal';
  let icon = '🟢';
  let summary = isTomorrow
    ? 'Previsión favorable para mañana: cielos tranquilos, sin lluvia significativa y firme en buen estado.'
    : 'Cielos tranquilos, sin riesgo de lluvia inmediata y firme en buen estado.';

  if (precipNow >= 2.0 || hasStormInWindow || windGust >= 65 || rainInNext6h >= 5.0) {
    status = 'danger';
    label = 'Meteorología Desfavorable';
    badgeClass = 'hike-danger';
    icon = '🔴';
    summary = hasStormInWindow 
      ? '🚨 Riesgo de tormenta eléctrica en montaña. Evitar crestas y zonas expuestas.'
      : (precipNow >= 2.0 
          ? '🌧️ Bastinazu o lluvia copiosa activa. Rutas de montaña desaconsejadas.' 
          : `🌧️ Frente de lluvia intensa previsto (${rainInNext6h.toFixed(1)} mm) o viento severo. No recomendable salir a cumbres.`);
  } else if (precipNow >= 0.2 || rainInNext6h >= 1.2 || maxNextPop >= 50 || mudScore >= 3 || windGust >= 45) {
    status = 'warning';
    label = 'Precaución en Terreno';
    badgeClass = 'hike-warning';
    icon = '🟡';
    summary = firstRainHourStr 
      ? `Lluvia o llovizna prevista hacia las ${firstRainHourStr} h (${rainInNext6h.toFixed(1)} mm). Recomendable ruta baja por bosque o pista acondicionada.`
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
    feelsLike: Math.round(isTomorrow ? temp : (current.apparent_temperature || temp)),
    windChillHigh,
    windSpeed: Math.round(wind),
    windGust: Math.round(windGust),
    humidity,
    uv: daily?.uv_index_max?.[isTomorrow ? 1 : 0] || 4
  };
}

/**
 * Obtiene la ficha técnica y didáctica oficial de una ruta de senderismo
 */
export function getRouteExplanation(routeId) {
  const route = RUTAS_ASTURIAS_CATALOGO.find(r => r.id === routeId);
  if (!route) return null;

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${route.lat},${route.lon}`;
  const wikilocUrl = `https://es.wikiloc.com/rutas-senderismo?q=${encodeURIComponent(route.name)}`;

  return {
    icon: route.typeIcon || '🥾',
    title: route.name,
    subtitle: `${route.concejoName} • Dificultad ${route.diff}`,
    badge: `Senda Oficial • ${route.dist} • ${route.elev} • ${route.time}`,
    sections: [
      {
        icon: '🗺️',
        heading: 'Itinerario y Puntos Clave',
        text: route.desc
      },
      {
        icon: '🪵',
        heading: 'Terreno, Firme y Tracción',
        text: `Superficie: ${route.surface}. ${route.diffRank >= 2 ? 'Se recomienda calzado técnico o bota de montaña con suela de taco para agarre óptimo en roca húmeda, caliza y barro.' : 'Senda apta con calzado deportivo o senderismo ligero.'}`
      },
      {
        icon: '🚩',
        heading: 'Punto de Inicio y Accesos',
        text: `Salida recomendada: ${route.startPoint} (${route.concejoName}). Coordenadas geodésicas: ${route.lat.toFixed(4)}°N, ${route.lon.toFixed(4)}°W.`,
        actionButtons: [
          {
            label: '🚗 Cómo llegar al inicio (GPS)',
            url: mapsUrl
          },
          {
            label: '🧭 Tracks en Wikiloc ↗',
            url: wikilocUrl
          }
        ]
      },
      {
        icon: '⚠️',
        heading: 'Seguridad y Precauciones Oficiales',
        text: route.caution || 'Atención a cambios repentinos de visibilidad por niebla cantábrica o borrina en zonas altas y rocas resbaladizas tras lluvia. Lleva siempre agua, cortavientos y batería completa en el teléfono móvil.'
      }
    ]
  };
}


/**
 * Caché en memoria para el pronóstico meteorológico en lote de las 58 rutas
 */
let _routesWeatherCache = {
  timestamp: 0,
  data: null
};

/**
 * Obtiene el pronóstico meteorológico oficial en una única llamada HTTP por lotes a Open-Meteo
 * para todas las rutas de Asturias (58 puntos), optimizado para responder en ~150 ms sin saturar la red.
 */
export async function fetchRoutesBatchWeather(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && _routesWeatherCache.data && (now - _routesWeatherCache.timestamp < 15 * 60 * 1000)) {
    return _routesWeatherCache.data;
  }

  try {
    const lats = RUTAS_ASTURIAS_CATALOGO.map(r => r.lat.toFixed(2)).join(',');
    const lons = RUTAS_ASTURIAS_CATALOGO.map(r => r.lon.toFixed(2)).join(',');
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=precipitation_sum,precipitation_probability_max,weather_code&timezone=auto&forecast_days=2`;

    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const results = await resp.json();

    const items = Array.isArray(results) ? results : [results];
    const weatherMap = {};

    RUTAS_ASTURIAS_CATALOGO.forEach((r, idx) => {
      const forecast = items[idx] || items[0];
      if (forecast && forecast.daily) {
        weatherMap[r.id] = {
          today: {
            rainMm: parseFloat(forecast.daily.precipitation_sum?.[0]) || 0,
            pop: parseInt(forecast.daily.precipitation_probability_max?.[0], 10) || 0,
            code: parseInt(forecast.daily.weather_code?.[0], 10) || 0
          },
          tomorrow: {
            rainMm: parseFloat(forecast.daily.precipitation_sum?.[1]) || 0,
            pop: parseInt(forecast.daily.precipitation_probability_max?.[1], 10) || 0,
            code: parseInt(forecast.daily.weather_code?.[1], 10) || 0
          }
        };
      }
    });

    _routesWeatherCache = {
      timestamp: now,
      data: weatherMap
    };
    return weatherMap;
  } catch (err) {
    console.warn('[MeteoAstur] No se pudo obtener el clima por lotes de rutas:', err);
    return null;
  }
}

/**
 * Genera el distintivo meteorológico (Badge) y puntuación de escampada para una ruta
 */
export function getRouteWeatherBadge(routeWeather) {
  if (!routeWeather) return null;
  const { rainMm, pop, code } = routeWeather;

  if (rainMm <= 0.0 && pop <= 25) {
    return {
      label: `0.0 mm (${pop}%) • Seco ☀️`,
      cssClass: 'badge-dry-pure',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.20)',
      border: 'rgba(16, 185, 129, 0.45)',
      isDry: true,
      score: 100 - (pop * 0.5)
    };
  } else if (rainMm <= 0.8 && pop <= 50) {
    return {
      label: `${rainMm.toFixed(1)} mm (${pop}%) • Casi Seco ⛅`,
      cssClass: 'badge-dry-almost',
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.20)',
      border: 'rgba(56, 189, 248, 0.45)',
      isDry: true,
      score: 75 - (rainMm * 10) - (pop * 0.2)
    };
  } else if (rainMm < 3.0) {
    return {
      label: `${rainMm.toFixed(1)} mm (${pop}%) • Orbayu 🌦️`,
      cssClass: 'badge-dry-light',
      color: '#facc15',
      bg: 'rgba(250, 204, 21, 0.20)',
      border: 'rgba(250, 204, 21, 0.45)',
      isDry: false,
      score: 45 - (rainMm * 8)
    };
  } else {
    return {
      label: `${rainMm.toFixed(1)} mm (${pop}%) • Lluvia 🌧️`,
      cssClass: 'badge-rainy',
      color: '#f87171',
      bg: 'rgba(248, 113, 113, 0.20)',
      border: 'rgba(248, 113, 113, 0.45)',
      isDry: false,
      score: Math.max(0, 25 - (rainMm * 3))
    };
  }
}
