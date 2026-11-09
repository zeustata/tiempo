/**
 * Módulo de Astronomía y Eventos Celestiales con Semáforo de Visibilidad en Asturias
 * Desarrollado por Manuel A. L. Barril y Princesa
 */

// Catálogo oficial de eventos astronómicos destacados (2026 - 2035) con Ventana Rodante de 5 Años
export const ASTRONOMICAL_EVENTS = [
  // --- 2026 ---
  {
    id: 'conruncion-jupiter-saturno-2026',
    title: 'Gran Acercamiento de Júpiter y Venus',
    type: 'conjunction',
    typeLabel: '🪐 Conjunción Planetaria',
    dateStart: '2026-11-15T18:30:00',
    datePeak: '2026-11-16T19:15:00',
    dateEnd: '2026-11-17T20:30:00',
    displayDate: '15 - 17 de Noviembre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Los dos planetas más brillantes del cielo nocturno se apreciarán casi juntos como un doble faro al atardecer.',
    asturiasTip: 'Mirar hacia el suroeste durante la hora posterior a la puesta de sol.',
    equipment: '👁️ A simple vista / 🔭 Telescopio',
    icon: '🪐'
  },
  {
    id: 'leonidas-2026',
    title: 'Lluvia de Meteoros Leónidas',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2026-11-17T23:00:00',
    datePeak: '2026-11-18T03:00:00',
    dateEnd: '2026-11-18T06:30:00',
    displayDate: '17 - 18 de Noviembre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Partículas ultrarrápidas procedentes del cometa Tempel-Tuttle a más de 70 km/s.',
    asturiasTip: 'Mirar hacia el este y constelación de Leo en la segunda mitad de la noche.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'geminidas-2026',
    title: 'Lluvia de Meteoros Gemínidas',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2026-12-13T21:00:00',
    datePeak: '2026-12-14T02:00:00',
    dateEnd: '2026-12-14T06:30:00',
    displayDate: '13 - 14 de Diciembre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'La lluvia más activa y prolífica de todo el año, con más de 120 meteoros multicolor por hora.',
    asturiasTip: 'Imprescindible abrigo térmico y buscar puertos de montaña por encima del mar de nubes invernal.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },
  {
    id: 'solsticio-invierno-2026',
    title: 'Solsticio de Invierno 2026',
    type: 'solstice',
    typeLabel: '❄️ Solsticio de Invierno',
    dateStart: '2026-12-21T10:00:00',
    datePeak: '2026-12-21T21:50:00',
    dateEnd: '2026-12-21T23:59:59',
    displayDate: '21 de Diciembre de 2026',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Inicio astronómico del invierno. El día más corto del año y la noche más prolongada para observar el cielo estrellado.',
    asturiasTip: 'El Sol alcanza su altura mínima sobre el horizonte cantábrico a mediodía.',
    equipment: '👁️ A simple vista',
    icon: '❄️'
  },

  // --- 2027 ---
  {
    id: 'cuadrantidas-2027',
    title: 'Lluvia de Meteoros Cuadrántidas',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2027-01-03T22:00:00',
    datePeak: '2027-01-04T03:30:00',
    dateEnd: '2027-01-04T07:00:00',
    displayDate: '3 - 4 de Enero de 2027',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Pico muy concentrado de meteoros brillantes y bólidos de fuego con hasta 110 trazas por hora.',
    asturiasTip: 'Observación óptima en las horas previas al amanecer mirando hacia el noreste.',
    equipment: '👁️ A simple vista',
    icon: '❄️'
  },
  {
    id: 'eclipse-anular-2027-sur',
    title: 'Eclipse Solar Anular (Anillo de Fuego)',
    type: 'eclipse',
    typeLabel: '⭕ Eclipse Anular',
    dateStart: '2027-02-06T14:00:00',
    datePeak: '2027-02-06T16:00:00',
    dateEnd: '2027-02-06T18:00:00',
    displayDate: '6 de Febrero de 2027',
    visibility: 'global',
    visibilityLabel: 'Hemisferio Sur (No visible en Asturias)',
    visibilityDesc: 'Espectacular eclipse anular donde la Luna no cubre por completo al Sol, formando un anillo brillante. Visible en Sudamérica y la Antártida.',
    asturiasTip: 'No visible geográficamente desde Asturias ni la Península Ibérica. Seguimiento recomendado por retransmisión web oficial.',
    equipment: '📡 Retransmisión web oficial',
    icon: '⭕'
  },
  {
    id: 'liridas-2027',
    title: 'Lluvia de Meteoros Líridas',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2027-04-21T22:00:00',
    datePeak: '2027-04-22T04:00:00',
    dateEnd: '2027-04-23T06:00:00',
    displayDate: '21 - 23 de Abril de 2027',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Partículas de polvo del cometa Thatcher. Famosas por sus trenes de polvo persistentes que brillan varios segundos.',
    asturiasTip: 'Buscar cielos despejados de primavera en valles interiores o zonas altas costeras orientadas al este.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },
  {
    id: 'eclipse-total-espana-2027',
    title: 'Gran Eclipse Solar del 2 de Agosto de 2027',
    type: 'eclipse',
    typeLabel: '🌑 Eclipse Solar Histórico',
    dateStart: '2027-08-02T09:30:00',
    datePeak: '2027-08-02T10:45:00',
    dateEnd: '2027-08-02T12:00:00',
    displayDate: '2 de Agosto de 2027 (Mañana)',
    visibility: 'spain',
    visibilityLabel: 'Visible en España (Gran Parcial en Asturias ~85%)',
    visibilityDesc: '¡Uno de los mayores eclipses solares de Europa! En el sur de España la totalidad supera los 4 minutos y medio. En Asturias se apreciará un oscurecimiento superior al 84% del disco solar.',
    asturiasTip: 'El sol quedará reducido a una finísima medialuna a media mañana. Notable bajada de temperatura y cambio de tono ambiental.',
    equipment: '🕶️ Gafas especiales homologadas con filtro solar ISO 12312-2',
    icon: '☀️'
  },
  {
    id: 'perseidas-2027',
    title: 'Lluvia de Estrellas Perseidas 2027',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2027-08-11T22:00:00',
    datePeak: '2027-08-12T23:30:00',
    dateEnd: '2027-08-13T05:30:00',
    displayDate: '11 - 13 de Agosto de 2027',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Las Lágrimas de San Lorenzo de 2027 se presentan con excelentes condiciones lunares (creciente temprana), permitiendo ver hasta 100 meteoros/hora.',
    asturiasTip: 'Cumbres de la Cordillera Cantábrica (Somiedo, Pajares, Picos de Europa) y cabos costeros oscuros (Cabo Vidio, Peñas).',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },
  {
    id: 'superluna-sept-2027',
    title: 'Superluna Llena de Otoño 2027',
    type: 'supermoon',
    typeLabel: '🌕 Superluna',
    dateStart: '2027-09-15T19:00:00',
    datePeak: '2027-09-16T03:15:00',
    dateEnd: '2027-09-16T08:00:00',
    displayDate: '15 - 16 de Septiembre de 2027',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Perigeo lunar de máximo acercamiento del año 2027, generando mareas vivas extremas en las rías asturianas.',
    asturiasTip: 'Salida de la Luna sobre el Cantábrico visible desde paseos marítimos y acantilados al atardecer.',
    equipment: '👁️ A simple vista / 🔭 Prismáticos',
    icon: '🌕'
  },
  {
    id: 'geminidas-2027',
    title: 'Lluvia de Meteoros Gemínidas 2027',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2027-12-13T21:00:00',
    datePeak: '2027-12-14T02:30:00',
    dateEnd: '2027-12-14T06:30:00',
    displayDate: '13 - 14 de Diciembre de 2027',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Cierre del calendario astronómico con el mayor espectáculo invernal del cielo: meteoros lentos, brillantes y coloridos.',
    asturiasTip: 'Buscar zonas altas por encima de la niebla de los valles centrales asturianos.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },

  // --- 2028 ---
  {
    id: 'cuadrantidas-2028',
    title: 'Lluvia de Meteoros Cuadrántidas 2028',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2028-01-03T22:30:00',
    datePeak: '2028-01-04T04:00:00',
    dateEnd: '2028-01-04T07:00:00',
    displayDate: '3 - 4 de Enero de 2028',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Arranque del año con gran intensidad de meteoros bajo cielos fríos de invierno.',
    asturiasTip: 'Mirar hacia el noreste a partir de las 3:00 h en puertos de montaña.',
    equipment: '👁️ A simple vista',
    icon: '❄️'
  },
  {
    id: 'eclipse-anular-espana-2028',
    title: 'Eclipse Solar Anular del 26 de Enero de 2028',
    type: 'eclipse',
    typeLabel: '⭕ Eclipse Anular en España',
    dateStart: '2028-01-26T16:15:00',
    datePeak: '2028-01-26T17:40:00',
    dateEnd: '2028-01-26T18:35:00',
    displayDate: '26 de Enero de 2028 (Atardecer)',
    visibility: 'spain',
    visibilityLabel: 'Visible en España (Gran Parcial en Asturias >75%)',
    visibilityDesc: '¡Tercer eclipse ibérico consecutivo! El Sol se ocultará por el horizonte cantábrico formando un anillo y medialuna encendida al atardecer.',
    asturiasTip: 'Buscar miradores costeros o cumbres con horizonte oeste despejado sobre el mar Cantábrico.',
    equipment: '🕶️ Gafas con filtro solar homologado ISO 12312-2',
    icon: '⭕'
  },
  {
    id: 'perseidas-2028',
    title: 'Lluvia de Estrellas Perseidas 2028',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2028-08-11T22:00:00',
    datePeak: '2028-08-12T23:00:00',
    dateEnd: '2028-08-13T05:30:00',
    displayDate: '11 - 13 de Agosto de 2028',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Las tradicionales Perseidas de agosto. Hasta 90 trazas por hora surcando el firmamento de verano.',
    asturiasTip: 'Parques naturales como Redes, Somiedo o Picos de Europa alejados de la contaminación lumínica.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },
  {
    id: 'conruncion-venus-marte-2028',
    title: 'Conjunción Íntima de Venus y Marte',
    type: 'conjunction',
    typeLabel: '🪐 Conjunción Planetaria',
    dateStart: '2028-10-18T19:00:00',
    datePeak: '2028-10-19T20:15:00',
    dateEnd: '2028-10-20T21:30:00',
    displayDate: '18 - 20 de Octubre de 2028',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'El planeta rojo y el brillante lucero vespertino a menos de medio grado de separación en el cielo.',
    asturiasTip: 'Mirar al oeste tras la puesta de sol con prismáticos para apreciar el contraste cromático rojo y blanco.',
    equipment: '👁️ A simple vista / 🔭 Prismáticos',
    icon: '🪐'
  },
  {
    id: 'eclipse-total-luna-2028',
    title: 'Eclipse Total de Luna en Nochevieja 2028',
    type: 'eclipse',
    typeLabel: '🌕 Luna de Sangre Histórica',
    dateStart: '2028-12-31T20:45:00',
    datePeak: '2028-12-31T22:15:00',
    dateEnd: '2029-01-01T00:30:00',
    displayDate: '31 de Diciembre de 2028 (Nochevieja)',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: '¡Cierre de año histórico! La Luna Llena entrará en la sombra de la Tierra y se teñirá de rojo cobrizo justo durante las campanadas.',
    asturiasTip: 'Visible en toda Asturias mirando al cielo nocturno desde cualquier punto sin necesidad de telescopio.',
    equipment: '👁️ A simple vista / 📷 Modo noche',
    icon: '🔴'
  },

  // --- 2029 ---
  {
    id: 'eclipse-parcial-sol-2029',
    title: 'Eclipse Solar Parcial de Enero 2029',
    type: 'eclipse',
    typeLabel: '🌑 Eclipse Parcial Global',
    dateStart: '2029-01-14T16:00:00',
    datePeak: '2029-01-14T17:15:00',
    dateEnd: '2029-01-14T18:30:00',
    displayDate: '14 de Enero de 2029',
    visibility: 'global',
    visibilityLabel: 'Global / América (No visible en Asturias)',
    visibilityDesc: 'Primer eclipse solar del año récord 2029 (que concentrará 4 eclipses solares parciales en el planeta).',
    asturiasTip: 'No visible geográficamente desde Asturias ni Europa.',
    equipment: '📡 Retransmisión web oficial',
    icon: '🌑'
  },
  {
    id: 'asteroide-apophis-2029',
    title: 'Paso Histórico del Asteroide Apophis',
    type: 'asteroid',
    typeLabel: '☄️ Hito Astronómico del Milenio',
    dateStart: '2029-04-13T19:00:00',
    datePeak: '2029-04-13T21:46:00',
    dateEnd: '2029-04-14T02:00:00',
    displayDate: '13 de Abril de 2029 (Viernes)',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias (A Simple Vista)',
    visibilityDesc: '¡El mayor acercamiento conocido de un gran asteroide (340 metros)! Pasará a solo 31.000 km de la superficie terrestre (más cerca que los satélites geoestacionarios) y se verá como una estrella moviéndose a simple vista.',
    asturiasTip: 'Condición astronómica sin precedentes: se podrá ver cruzando el cielo europeo a simple vista sin peligro de impacto.',
    equipment: '👁️ A simple vista / 🔭 Prismáticos recomendados',
    icon: '☄️'
  },
  {
    id: 'eclipse-total-luna-2029',
    title: 'Eclipse Total de Luna de San Juan 2029',
    type: 'eclipse',
    typeLabel: '🌕 Eclipse Total de Luna',
    dateStart: '2029-06-26T01:30:00',
    datePeak: '2029-06-26T03:22:00',
    dateEnd: '2029-06-26T05:15:00',
    displayDate: '26 de Junio de 2029 (Madrugada)',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'La Luna Llena se sumerge por completo en la umbra terrestre, adquiriendo tonos rojizos intensos durante más de una hora.',
    asturiasTip: 'Espectáculo nocturno perfecto para observar desde playas y miradores en la madrugada de verano.',
    equipment: '👁️ A simple vista / 🔭 Prismáticos',
    icon: '🔴'
  },
  {
    id: 'perseidas-2029',
    title: 'Lluvia de Estrellas Perseidas 2029',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2029-08-11T22:00:00',
    datePeak: '2029-08-12T23:15:00',
    dateEnd: '2029-08-13T05:30:00',
    displayDate: '11 - 13 de Agosto de 2029',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'El gran clásico estival asturiano con luna menguante tardía que no interferirá en las primeras horas de la noche.',
    asturiasTip: 'Buscar zonas de oscuridad certificada en la Cordillera Cantábrica.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },
  {
    id: 'superluna-dic-2029',
    title: 'Superluna Llena de Diciembre 2029',
    type: 'supermoon',
    typeLabel: '🌕 Superluna Fría',
    dateStart: '2029-12-20T17:30:00',
    datePeak: '2029-12-20T23:45:00',
    dateEnd: '2029-12-21T07:30:00',
    displayDate: '20 - 21 de Diciembre de 2029',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'La Luna más brillante y cercana del año en coincidencia casi exacta con el solsticio de invierno.',
    asturiasTip: 'Salida majestuosa en el horizonte oriental al caer la tarde.',
    equipment: '👁️ A simple vista / 🔭 Prismáticos',
    icon: '🌕'
  },

  // --- 2030 ---
  {
    id: 'cuadrantidas-2030',
    title: 'Lluvia de Meteoros Cuadrántidas 2030',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2030-01-03T22:00:00',
    datePeak: '2030-01-04T03:30:00',
    dateEnd: '2030-01-04T07:00:00',
    displayDate: '3 - 4 de Enero de 2030',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Apertura de la década de 2030 con trazas meteóricas veloces y brillantes bajo el frío de enero.',
    asturiasTip: 'Zonas altas de montaña libres de nieblas bajas.',
    equipment: '👁️ A simple vista',
    icon: '❄️'
  },
  {
    id: 'eclipse-solar-anular-2030',
    title: 'Gran Eclipse Solar del 1 de Junio de 2030',
    type: 'eclipse',
    typeLabel: '⭕ Eclipse Solar Europeo',
    dateStart: '2030-06-01T06:15:00',
    datePeak: '2030-06-01T07:35:00',
    dateEnd: '2030-06-01T09:00:00',
    displayDate: '1 de Junio de 2030 (Amanecer)',
    visibility: 'spain',
    visibilityLabel: 'Visible en España (Parcial en Asturias >65%)',
    visibilityDesc: 'La franja anular cruzará el sur de Europa y el norte de África. En Asturias el Sol amanecerá parcialmente eclipsado en más de un 65%.',
    asturiasTip: 'Buscar playas orientadas al este para contemplar el amanecer solar con la Luna mordiendo el disco.',
    equipment: '🕶️ Gafas con filtro solar homologado ISO 12312-2',
    icon: '☀️'
  },
  {
    id: 'eclipse-lunar-penumbral-2030',
    title: 'Eclipse Lunar de Junio 2030',
    type: 'eclipse',
    typeLabel: '🌕 Eclipse Penumbral de Luna',
    dateStart: '2030-06-15T18:45:00',
    datePeak: '2030-06-15T20:30:00',
    dateEnd: '2030-06-15T22:15:00',
    displayDate: '15 de Junio de 2030',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Sutil oscurecimiento del limbo lunar al pasar por la penumbra terrestre al anochecer.',
    asturiasTip: 'Salida de la Luna sobre el mar con tonalidades ligeramente sombreadas.',
    equipment: '👁️ A simple vista / 🔭 Prismáticos',
    icon: '🌕'
  },
  {
    id: 'perseidas-2030',
    title: 'Lluvia de Estrellas Perseidas 2030',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2030-08-11T22:00:00',
    datePeak: '2030-08-12T23:30:00',
    dateEnd: '2030-08-13T05:30:00',
    displayDate: '11 - 13 de Agosto de 2030',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'El gran espectáculo veraniego asturiano alcanzando hasta 100 meteoros por hora en su noche cumbre.',
    asturiasTip: 'Miradores astronómicos de Somiedo, Muniellos y Picos de Europa.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },
  {
    id: 'eclipse-total-sol-2030-sur',
    title: 'Eclipse Total de Sol de Noviembre 2030',
    type: 'eclipse',
    typeLabel: '🌑 Eclipse Total Global',
    dateStart: '2030-11-25T05:00:00',
    datePeak: '2030-11-25T06:50:00',
    dateEnd: '2030-11-25T08:30:00',
    displayDate: '25 de Noviembre de 2030',
    visibility: 'global',
    visibilityLabel: 'Hemisferio Sur (No visible en Asturias)',
    visibilityDesc: 'Eclipse total que cruzará Namibia, Sudáfrica y el océano Índico hasta el sur de Australia.',
    asturiasTip: 'No visible geográficamente en España. Seguimiento por retransmisión astronómica oficial.',
    equipment: '📡 Retransmisión web oficial',
    icon: '🌑'
  },
  {
    id: 'geminidas-2030',
    title: 'Lluvia de Meteoros Gemínidas 2030',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2030-12-13T21:00:00',
    datePeak: '2030-12-14T02:30:00',
    dateEnd: '2030-12-14T06:30:00',
    displayDate: '13 - 14 de Diciembre de 2030',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Gran colofón del año astronómico con meteoros multicolor y bólidos intensos.',
    asturiasTip: 'Cielos limpios de montaña lejos de los focos urbanos de la costa central.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },

  // --- 2031 ---
  {
    id: 'cuadrantidas-2031',
    title: 'Lluvia de Meteoros Cuadrántidas 2031',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2031-01-03T22:00:00',
    datePeak: '2031-01-04T03:00:00',
    dateEnd: '2031-01-04T07:00:00',
    displayDate: '3 - 4 de Enero de 2031',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Arranque del año con una de las lluvias más intensas, con picos de más de 100 meteoros por hora.',
    asturiasTip: 'Abrigo extremo y observación hacia el noreste por encima de los valles con niebla invernal.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'superluna-primavera-2031',
    title: 'Superluna Rosa de Primavera 2031',
    type: 'supermoon',
    typeLabel: '🌕 Superluna Llena',
    dateStart: '2031-05-06T20:30:00',
    datePeak: '2031-05-07T02:15:00',
    dateEnd: '2031-05-07T07:00:00',
    displayDate: '6 - 7 de Mayo de 2031',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Plenilunio en coincidencia con el perigeo orbital; la Luna se apreciará un 12% mayor sobre el mar Cantábrico.',
    asturiasTip: 'Salida espectacular sobre el horizonte este al atardecer costero.',
    equipment: '👁️ A simple vista / 📷 Fotografía',
    icon: '🌕'
  },
  {
    id: 'perseidas-2031',
    title: 'Lluvia de Meteoros Perseidas 2031',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2031-08-12T22:00:00',
    datePeak: '2031-08-13T02:30:00',
    dateEnd: '2031-08-13T06:00:00',
    displayDate: '12 - 13 de Agosto de 2031',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Las tradicionales Lágrimas de San Lorenzo cruzando la atmósfera a más de 59 km/s en plena canícula veraniega.',
    asturiasTip: 'Miradores costeros de Cabo Peñas, Cabo Vidio o puertos de montaña como Pajares y Somiedo.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'oposicion-saturno-2031',
    title: 'Gran Oposición de Saturno 2031',
    type: 'conjunction',
    typeLabel: '🪐 Oposición Planetaria',
    dateStart: '2031-09-20T21:00:00',
    datePeak: '2031-09-21T01:30:00',
    dateEnd: '2031-09-21T06:00:00',
    displayDate: '21 de Septiembre de 2031',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'El planeta de los anillos se sitúa en su distancia mínima anual a la Tierra, con su disco 100% iluminado por el Sol.',
    asturiasTip: 'Visible como una joya dorada en el cielo sur; los anillos son perfectamente distinguibles con telescopio pequeño.',
    equipment: '🔭 Telescopio / 👁️ A simple vista',
    icon: '🪐'
  },
  {
    id: 'geminidas-2031',
    title: 'Lluvia de Meteoros Gemínidas 2031',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2031-12-13T21:00:00',
    datePeak: '2031-12-14T02:00:00',
    dateEnd: '2031-12-14T06:30:00',
    displayDate: '13 - 14 de Diciembre de 2031',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'La reina de las lluvias de estrellas invernales, generada por el asteroide Faetón.',
    asturiasTip: 'Buscar cielos despejados de la Cordillera Cantábrica por encima de las nieblas de los valles.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },

  // --- 2032 ---
  {
    id: 'perseidas-2032',
    title: 'Lluvia de Meteoros Perseidas 2032',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2032-08-12T22:00:00',
    datePeak: '2032-08-13T02:30:00',
    dateEnd: '2032-08-13T06:00:00',
    displayDate: '12 - 13 de Agosto de 2032',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Cientos de meteoros veloces cruzando la noche agosteña asturiana con excelente tasa horaria cenital.',
    asturiasTip: 'Mirar hacia el noreste pasada la medianoche en zonas libres de contaminación lumínica.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'transito-mercurio-2032',
    title: 'Tránsito de Mercurio por el Sol 2032',
    type: 'eclipse',
    typeLabel: '☀️ Tránsito Planetario',
    dateStart: '2032-11-13T07:40:00',
    datePeak: '2032-11-13T09:30:00',
    dateEnd: '2032-11-13T11:45:00',
    displayDate: '13 de Noviembre de 2032',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'El planeta Mercurio cruza directamente por delante del disco solar como un pequeño punto negro perfecto en movimiento.',
    asturiasTip: 'Imprescindible filtro solar homologado en telescopio. ¡Nunca mirar directamente al Sol sin protección!',
    equipment: '🔭 Telescopio con filtro solar',
    icon: '☀️'
  },
  {
    id: 'leonidas-tormenta-2032',
    title: 'Gran Retorno de las Leónidas 2032',
    type: 'meteor_shower',
    typeLabel: '🌠 Tormenta de Meteoros',
    dateStart: '2032-11-17T22:00:00',
    datePeak: '2032-11-18T03:30:00',
    dateEnd: '2032-11-18T06:30:00',
    displayDate: '17 - 18 de Noviembre de 2032',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Ciclo orbital de 33 años del cometa Tempel-Tuttle; probabilidad excepcional de bólidos brillantes y alta cadencia.',
    asturiasTip: 'Noche clave para observar el cielo oriental desde cualquier punto de la geografía asturiana.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'geminidas-2032',
    title: 'Lluvia de Meteoros Gemínidas 2032',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2032-12-13T21:00:00',
    datePeak: '2032-12-14T02:00:00',
    dateEnd: '2032-12-14T06:30:00',
    displayDate: '13 - 14 de Diciembre de 2032',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'El espectáculo celeste más regular y consistente del invierno peninsular.',
    asturiasTip: 'Abrigo térmico obligatorio y observación tumbado hacia el cenit.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },

  // --- 2033 ---
  {
    id: 'cuadrantidas-2033',
    title: 'Lluvia de Meteoros Cuadrántidas 2033',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2033-01-03T22:00:00',
    datePeak: '2033-01-04T03:00:00',
    dateEnd: '2033-01-04T07:00:00',
    displayDate: '3 - 4 de Enero de 2033',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Trazas brillantes y bólidos azulados en una de las lluvias más intensas pero breves del año.',
    asturiasTip: 'Ventana óptima de observación de solo unas 4 horas antes del amanecer.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'superluna-gigante-2033',
    title: 'Superluna Gigante de 2033',
    type: 'supermoon',
    typeLabel: '🌕 Superluna Histórica',
    dateStart: '2033-04-14T19:30:00',
    datePeak: '2033-04-15T00:30:00',
    dateEnd: '2033-04-15T06:30:00',
    displayDate: '14 - 15 de Abril de 2033',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Perigeo lunar extremo a menos de 356.500 km de la Tierra; la Luna más grande y luminosa de todo el decenio.',
    asturiasTip: 'Iluminación nocturna espectacular sobre las playas y calas asturianas.',
    equipment: '👁️ A simple vista / 📷 Fotografía',
    icon: '🌕'
  },
  {
    id: 'perseidas-2033',
    title: 'Lluvia de Meteoros Perseidas 2033',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2033-08-12T22:00:00',
    datePeak: '2033-08-13T02:00:00',
    dateEnd: '2033-08-13T06:00:00',
    displayDate: '12 - 13 de Agosto de 2033',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Lágrimas de San Lorenzo de verano bajo condiciones propicias para astronomía nocturna.',
    asturiasTip: 'Buscar zonas oscuras de la costa occidental (Tapia, Luarca) o valles del interior.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'geminidas-2033',
    title: 'Lluvia de Meteoros Gemínidas 2033',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2033-12-13T21:00:00',
    datePeak: '2033-12-14T02:30:00',
    dateEnd: '2033-12-14T06:30:00',
    displayDate: '13 - 14 de Diciembre de 2033',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Cierre anual con meteoros de trayectoria pausada y estelas persistentes.',
    asturiasTip: 'Picos de Europa y Cordillera Cantábrica ofrecen las mejores condiciones de transparencia.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },

  // --- 2034 ---
  {
    id: 'conjuncion-jupiter-marte-2034',
    title: 'Gran Conjunción Júpiter y Marte 2034',
    type: 'conjunction',
    typeLabel: '🪐 Conjunción Planetaria',
    dateStart: '2034-02-27T19:00:00',
    datePeak: '2034-02-28T21:30:00',
    dateEnd: '2034-03-01T01:00:00',
    displayDate: '28 de Febrero de 2034',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'El brillo blanco de Júpiter y el tono rojizo de Marte aparecerán en íntimo abrazo angular en el cielo vespertino.',
    asturiasTip: 'Observar hacia el oeste en las primeras horas tras la puesta de sol.',
    equipment: '👁️ A simple vista / 🔭 Telescopio',
    icon: '🪐'
  },
  {
    id: 'perseidas-2034',
    title: 'Lluvia de Meteoros Perseidas 2034',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2034-08-12T22:00:00',
    datePeak: '2034-08-13T02:30:00',
    dateEnd: '2034-08-13T06:00:00',
    displayDate: '12 - 13 de Agosto de 2034',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Las reinas del verano asturiano con picos de más de 80 meteoros visibles a simple vista.',
    asturiasTip: 'Buscar zonas de oscuridad certificada en la comarca de los Oscos o Fuentes del Narcea.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'eclipse-lunar-septiembre-2034',
    title: 'Eclipse Total de Luna (Luna de Sangre) 2034',
    type: 'eclipse',
    typeLabel: '🌕 Eclipse Total de Luna',
    dateStart: '2034-09-28T19:40:00',
    datePeak: '2034-09-28T21:15:00',
    dateEnd: '2034-09-28T23:00:00',
    displayDate: '28 de Septiembre de 2034',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'La sombra de la Tierra cubrirá íntegramente el disco lunar, tiñéndolo de un tono cobre y rojizo intenso.',
    asturiasTip: 'Visible en plenitud en el cielo nocturno asturiano en horario ideal para toda la familia.',
    equipment: '👁️ A simple vista / 📷 Fotografía',
    icon: '🌕'
  },
  {
    id: 'geminidas-2034',
    title: 'Lluvia de Meteoros Gemínidas 2034',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2034-12-13T21:00:00',
    datePeak: '2034-12-14T02:00:00',
    dateEnd: '2034-12-14T06:30:00',
    displayDate: '13 - 14 de Diciembre de 2034',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Meteoros multicolor intensos de velocidad moderada.',
    asturiasTip: 'Constelación de Géminis alta en el cielo hacia la medianoche.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  },

  // --- 2035 ---
  {
    id: 'cuadrantidas-2035',
    title: 'Lluvia de Meteoros Cuadrántidas 2035',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2035-01-03T22:00:00',
    datePeak: '2035-01-04T03:00:00',
    dateEnd: '2035-01-04T07:00:00',
    displayDate: '3 - 4 de Enero de 2035',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'La primera lluvia intensa de 2035 con bólidos brillantes en el cielo invernal.',
    asturiasTip: 'Buscar zonas despejadas de la Cordillera sin nubes bajas.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'perseidas-2035',
    title: 'Lluvia de Meteoros Perseidas 2035',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2035-08-12T22:00:00',
    datePeak: '2035-08-13T02:30:00',
    dateEnd: '2035-08-13T06:00:00',
    displayDate: '12 - 13 de Agosto de 2035',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Lágrimas de San Lorenzo de máxima actividad estival.',
    asturiasTip: 'Observación en grupo y tumbado hacia el noreste.',
    equipment: '👁️ A simple vista',
    icon: '☄️'
  },
  {
    id: 'oposicion-jupiter-2035',
    title: 'Gran Oposición de Júpiter 2035',
    type: 'conjunction',
    typeLabel: '🪐 Oposición Planetaria',
    dateStart: '2035-11-17T19:00:00',
    datePeak: '2035-11-18T00:30:00',
    dateEnd: '2035-11-18T06:00:00',
    displayDate: '18 de Noviembre de 2035',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Júpiter en su mayor brillo del decenio; sus cuatro lunas galileanas (Ío, Europa, Ganímedes y Calisto) se apreciarán con prismáticos sencillos.',
    asturiasTip: 'Un lucero brillante inconfundible dominando toda la noche asturiana.',
    equipment: '👁️ A simple vista / 🔭 Prismáticos o Telescopio',
    icon: '🪐'
  },
  {
    id: 'geminidas-2035',
    title: 'Lluvia de Meteoros Gemínidas 2035',
    type: 'meteor_shower',
    typeLabel: '🌠 Lluvia de Meteoros',
    dateStart: '2035-12-13T21:00:00',
    datePeak: '2035-12-14T02:00:00',
    dateEnd: '2035-12-14T06:30:00',
    displayDate: '13 - 14 de Diciembre de 2035',
    visibility: 'asturias',
    visibilityLabel: 'Visible en Asturias',
    visibilityDesc: 'Cierre del decenio astronómico con la lluvia más consistente del firmamento.',
    asturiasTip: 'Mirar al cenit en noches despejadas de invierno.',
    equipment: '👁️ A simple vista',
    icon: '✨'
  }
];

// Resumen titular y didáctico de cada año (2026 - 2035)
export const YEAR_HIGHLIGHTS = {
  '2026': {
    badge: '🌟 Gran Cierre de 2026',
    title: 'Acercamiento de Gigantes y Gemínidas',
    summary: 'Pico estelar con conjunción deslumbrante de Júpiter y Venus al anochecer, lluvias Leónidas y las prolíficas Gemínidas invernales.'
  },
  '2027': {
    badge: '☀️ El Gran Eclipse del 2 de Agosto',
    title: 'Eclipse Solar Histórico y Perseidas Sin Luna',
    summary: 'El Sol se cubrirá más de un 84% en Asturias a media mañana, seguido de unas Lágrimas de San Lorenzo de ensueño bajo cielo oscuro.'
  },
  '2028': {
    badge: '⭕ Anillo de Fuego y Nochevieja Roja',
    title: 'Eclipse Anular de Sol y Luna de Sangre en Nochevieja',
    summary: 'Atardecer ibérico con el eclipse anular del 26 de enero y fin de año histórico con un eclipse total de Luna en plena Nochevieja.'
  },
  '2029': {
    badge: '☄️ El Paso Histórico de Apophis',
    title: 'El Asteroide Visible a Simple Vista y Eclipses Lunares',
    summary: 'El 13 de abril el asteroide Apophis rozará la Tierra a solo 31.000 km y se verá a simple vista como una estrella fugaz cruzando Europa.'
  },
  '2030': {
    badge: '🌌 Cierre de la Década: Sol & Cosmos',
    title: 'Eclipse Solar Europeo y Superlunas de Otoño',
    summary: 'Gran eclipse solar de inicio de verano con amplia visibilidad parcial (>65%) en Asturias y calendario prolífico de efemérides.'
  },
  '2031': {
    badge: '🪐 Oposición de Gigantes & Perseidas',
    title: 'Saturno en Máximo Esplendor y Noches Oscuras',
    summary: 'Saturno muestra sus anillos orientados favorablemente en su punto más cercano a la Tierra, con unas Perseidas veraniegas de excelente visibilidad.'
  },
  '2032': {
    badge: '☀️ El Tránsito de Mercurio',
    title: 'El Planeta Cruzando el Sol y Leónidas Extraordinarias',
    summary: 'Hito astronómico mayor del decenio con el Tránsito de Mercurio del 13 de noviembre cruzando el disco solar y el retorno del ciclo de las Leónidas.'
  },
  '2033': {
    badge: '🌕 La Superluna de la Década',
    title: 'Máximo Acercamiento Lunar y Noches de San Lorenzo',
    summary: 'La Luna alcanzará su perigeo más cercano del decenio, luciendo un 14% más grande y un 30% más brillante en el firmamento cantábrico.'
  },
  '2034': {
    badge: '🔴 Luna Roja de Otoño',
    title: 'Eclipse Total de Luna y Baile de Planetas',
    summary: 'La noche otoñal del 28 de septiembre se teñirá de cobre con un eclipse total de Luna visible a la perfección desde Asturias.'
  },
  '2035': {
    badge: '✨ Hitos del 2035: Júpiter & Perseidas',
    title: 'Cierre del Ciclo Decenal y Júpiter Deslumbrante',
    summary: 'Júpiter alcanza su máximo brillo con sus lunas galileanas observables con prismáticos, y las Perseidas de agosto culminan sin interferencia lunar.'
  }
};

/**
 * Calcula la fase lunar actual aproximada
 */
export function getMoonPhaseDetails(date = new Date()) {
  const LUNAR_MONTH = 29.53058867;
  // Luna nueva de referencia conocida: 11 Enero 2024 a las 11:57 UTC
  const refNewMoon = new Date(Date.UTC(2024, 0, 11, 11, 57, 0));
  const diffDays = (date.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const moonAge = (diffDays % LUNAR_MONTH + LUNAR_MONTH) % LUNAR_MONTH;
  const phaseNormalized = moonAge / LUNAR_MONTH;

  // Iluminación estimada
  const illumination = Math.round((1 - Math.cos(2 * Math.PI * phaseNormalized)) / 2 * 100);

  let phaseName = 'Luna Nueva';
  let icon = '🌑';
  let desc = 'La Luna se encuentra entre la Tierra y el Sol; disco no iluminado.';

  if (phaseNormalized < 0.03 || phaseNormalized > 0.97) {
    phaseName = 'Luna Nueva';
    icon = '🌑';
    desc = 'Cielos oscuros ideales para observación de cielo profundo y estrellas.';
  } else if (phaseNormalized < 0.22) {
    phaseName = 'Luna Creciente';
    icon = '🌒';
    desc = 'Fina franja visible al anochecer hacia el oeste.';
  } else if (phaseNormalized < 0.28) {
    phaseName = 'Cuarto Creciente';
    icon = '🌓';
    desc = 'Iluminada exactamente la mitad derecha del disco lunar.';
  } else if (phaseNormalized < 0.47) {
    phaseName = 'Gibosa Creciente';
    icon = '🌔';
    desc = 'Gran brillo lunar en la primera mitad de la noche.';
  } else if (phaseNormalized < 0.53) {
    phaseName = 'Luna Llena';
    icon = '🌕';
    desc = 'Disco lunar 100% iluminado visible durante toda la noche.';
  } else if (phaseNormalized < 0.72) {
    phaseName = 'Gibosa Menguante';
    icon = '🌖';
    desc = 'Comienza a decrecer la luz lunar, visible tras la medianoche.';
  } else if (phaseNormalized < 0.78) {
    phaseName = 'Cuarto Menguante';
    icon = '🌗';
    desc = 'Iluminada la mitad izquierda del disco en las horas matutinas.';
  } else {
    phaseName = 'Luna Menguante';
    icon = '🌘';
    desc = 'Último arco visible antes del amanecer.';
  }

  const daysToFullMoon = Math.round((0.5 - phaseNormalized + (phaseNormalized > 0.5 ? 1 : 0)) * LUNAR_MONTH);

  return {
    phaseName,
    icon,
    desc,
    illumination,
    moonAge: moonAge.toFixed(1),
    daysToFullMoon
  };
}

let cachedWeatherData = null;
let cachedConcejo = null;

/**
 * Calcula los tramos exactos de Hora Dorada y Hora Azul para el día y concejo activo
 */
export function getGoldenAndBlueHours(weatherData, concejo) {
  let sunriseDate = null;
  let sunsetDate = null;

  if (weatherData && weatherData.weather && weatherData.weather.daily) {
    const daily = weatherData.weather.daily;
    if (daily.sunrise && daily.sunrise[0]) {
      sunriseDate = new Date(daily.sunrise[0]);
    }
    if (daily.sunset && daily.sunset[0]) {
      sunsetDate = new Date(daily.sunset[0]);
    }
  }

  // Estimación astronómica por defecto si no hay API cargada
  if (!sunriseDate || isNaN(sunriseDate.getTime()) || !sunsetDate || isNaN(sunsetDate.getTime())) {
    const today = new Date();
    sunriseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 25);
    sunsetDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 15);
  }

  // Cálculos de intervalos de luz en minutos
  // Amanecer:
  // Hora Azul: 35 min antes del orto hasta 10 min antes del orto
  const blueMorningStart = new Date(sunriseDate.getTime() - 35 * 60 * 1000);
  const blueMorningEnd = new Date(sunriseDate.getTime() - 10 * 60 * 1000);

  // Hora Dorada matutina: desde el orto hasta 45 min después
  const goldenMorningStart = new Date(sunriseDate.getTime());
  const goldenMorningEnd = new Date(sunriseDate.getTime() + 45 * 60 * 1000);

  // Atardecer:
  // Hora Dorada vespertina: 45 min antes del ocaso hasta el ocaso
  const goldenEveningStart = new Date(sunsetDate.getTime() - 45 * 60 * 1000);
  const goldenEveningEnd = new Date(sunsetDate.getTime());

  // Hora Azul vespertina: 10 min después del ocaso hasta 35 min después
  const blueEveningStart = new Date(sunsetDate.getTime() + 10 * 60 * 1000);
  const blueEveningEnd = new Date(sunsetDate.getTime() + 35 * 60 * 1000);

  const formatH = (d) => {
    return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  // Calidad fotográfica del atardecer según nubosidad prevista
  let cloudCoverSunset = null;
  if (weatherData && weatherData.weather && weatherData.weather.hourly && weatherData.weather.hourly.time) {
    const sunsetHour = sunsetDate.getHours();
    const times = weatherData.weather.hourly.time;
    for (let i = 0; i < times.length; i++) {
      const t = new Date(times[i]);
      if (t.getDate() === sunsetDate.getDate() && t.getHours() === sunsetHour) {
        if (weatherData.weather.hourly.cloud_cover && weatherData.weather.hourly.cloud_cover[i] != null) {
          cloudCoverSunset = weatherData.weather.hourly.cloud_cover[i];
        }
        break;
      }
    }
  }

  let photoQuality = {
    badge: '🟢 Visibilidad Óptima',
    badgeClass: 'photo-optimo',
    desc: 'Cielos diáfanos: luz pura y horizonte nítido sobre la costa y cumbres.'
  };

  if (cloudCoverSunset !== null) {
    if (cloudCoverSunset > 75) {
      photoQuality = {
        badge: '⚪ Luz Plana y Difusa',
        badgeClass: 'photo-cubierto',
        desc: `Cielo cubierto (${cloudCoverSunset}% de nubes): sol oculto tras el manto gris.`
      };
    } else if (cloudCoverSunset > 30) {
      photoQuality = {
        badge: '🟡 Luz Dramática',
        badgeClass: 'photo-nubes',
        desc: `Nubes y claros (${cloudCoverSunset}%): contrastes vivos y rayos crepusculares.`
      };
    } else {
      photoQuality = {
        badge: '🟢 Luz Óptima',
        badgeClass: 'photo-optimo',
        desc: `Cielos despejados (${cloudCoverSunset}%): horizonte nítido y sombras suaves.`
      };
    }
  }

  return {
    concejoName: concejo ? concejo.name : 'Asturias',
    morning: {
      blue: `${formatH(blueMorningStart)} - ${formatH(blueMorningEnd)}`,
      golden: `${formatH(goldenMorningStart)} - ${formatH(goldenMorningEnd)}`
    },
    evening: {
      golden: `${formatH(goldenEveningStart)} - ${formatH(goldenEveningEnd)}`,
      blue: `${formatH(blueEveningStart)} - ${formatH(blueEveningEnd)}`
    },
    sunriseStr: formatH(sunriseDate),
    sunsetStr: formatH(sunsetDate),
    photoQuality
  };
}

/**
 * Calcula la calidad real del cielo nocturno ESTA NOCHE (22:00 a 04:00 h) cruzando
 * la nubosidad horaria prevista en el concejo con la iluminación lunar.
 */
export function getTonightStargazingIndex(weatherData, moon, concejo) {
  const cleanConcejo = (concejo?.name || 'Asturias').replace(/\s*\(.*?\)/, '').trim();
  const hourly = weatherData?.weather?.hourly || null;

  let avgCloudPct = 25;
  let minCloudPct = 20;
  let bestHourStr = '00:00';
  let rainTonight = 0;

  if (hourly && hourly.time && hourly.cloud_cover) {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const tom = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const tomStr = `${tom.getFullYear()}-${String(tom.getMonth() + 1).padStart(2, '0')}-${String(tom.getDate()).padStart(2, '0')}`;

    const targetPrefixes = [
      `${todayStr}T22`, `${todayStr}T23`,
      `${tomStr}T00`, `${tomStr}T01`, `${tomStr}T02`, `${tomStr}T03`, `${tomStr}T04`
    ];

    let sumCloud = 0;
    let count = 0;
    minCloudPct = 100;

    for (let i = 0; i < hourly.time.length; i++) {
      const t = hourly.time[i];
      if (targetPrefixes.some(pref => t.startsWith(pref))) {
        const c = hourly.cloud_cover[i] ?? 50;
        const p = hourly.precipitation ? (hourly.precipitation[i] || 0) : 0;
        sumCloud += c;
        rainTonight += p;
        count++;
        if (c < minCloudPct) {
          minCloudPct = c;
          bestHourStr = t.split('T')[1]?.substring(0, 5) || '00:00';
        }
      }
    }

    if (count > 0) {
      avgCloudPct = Math.round(sumCloud / count);
    } else {
      minCloudPct = 25;
    }
  }

  const moonIllum = moon?.illumination ?? 50;

  if (rainTonight >= 0.3 || avgCloudPct >= 75) {
    return {
      icon: '☁️',
      badge: '🔴 Cielo Cubierto',
      color: '#ef4444',
      verdict: `Manto nuboso en ${cleanConcejo} (${avgCloudPct}% nubes)`,
      desc: `Noche tapada entre las 22:00 y las 04:00 h${rainTonight >= 0.3 ? ' con riesgo de lluvia u orbayu' : ''}. Condiciones desfavorables para ver estrellas hoy.`,
      avgCloudPct,
      bestWindow: `Mín. nubes: ${minCloudPct}% (${bestHourStr} h)`
    };
  }

  if (avgCloudPct >= 35) {
    return {
      icon: '⛅',
      badge: '🟡 Claros Nocturnos',
      color: '#f59e0b',
      verdict: `Nubes y claros en ${cleanConcejo} (${avgCloudPct}% nubes)`,
      desc: `Visibilidad intermitente esta noche. La mejor ventana de cielo más limpio se espera hacia las ${bestHourStr} h (${minCloudPct}% de nubosidad).`,
      avgCloudPct,
      bestWindow: `Mejor hora: ${bestHourStr} h (${minCloudPct}% nubes)`
    };
  }

  if (moonIllum >= 65) {
    return {
      icon: '🌕',
      badge: '🟢 Despejado • Luz Lunar',
      color: '#38bdf8',
      verdict: `Cielo raso con Luna brillante (${avgCloudPct}% nubes)`,
      desc: `Cielo despejado en ${cleanConcejo}. Noche ideal para observar la superficie lunar (${moonIllum}%), planetas y estrellas principales; el brillo lunar atenúa la Vía Láctea.`,
      avgCloudPct,
      bestWindow: `Óptimo: ${bestHourStr} h (${minCloudPct}% nubes)`
    };
  }

  return {
    icon: '🌌',
    badge: '🟢 Noche Estelar Óptima',
    color: '#10b981',
    verdict: `Cielo oscuro y despejado en ${cleanConcejo} (${avgCloudPct}% nubes)`,
    desc: `Condiciones sobresalientes esta noche: cielo limpio y baja contaminación lumínica lunar (${moonIllum}%). Excelente para observar la Vía Láctea y estrellas fugaces.`,
    avgCloudPct,
    bestWindow: `Óptimo: ${bestHourStr} h (${minCloudPct}% nubes)`
  };
}

// Estado del filtro anual y visibilidad de astronomía
let currentSelectedYear = null;
let currentVisibilityFilter = 'asturias';

/**
 * Obtiene la ventana rodante de 5 años para efemérides astronómicas
 * Ej: en 2026 -> ['2026', '2027', '2028', '2029', '2030']
 *     en 2027 -> ['2027', '2028', '2029', '2030', '2031']
 */
export function getRollingAstronomyYears(count = 5) {
  // Conmutador de simulacro controlado (Ley 12): ?sim_year=2027
  let currentYear = new Date().getFullYear();
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
    const simYear = parseInt(urlParams.get('sim_year'), 10);
    if (!isNaN(simYear) && simYear >= 2026 && simYear <= 2035) {
      currentYear = simYear;
    }
  }
  return Array.from({ length: count }, (_, i) => (currentYear + i).toString());
}

/**
 * Renderiza el módulo completo de Astronomía
 */
export function renderAstronomyView(containerId, yearOrFilter = null, visOrWeather = null, weatherData = null, concejo = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const rollingYears = getRollingAstronomyYears(5);
  const startRollingYear = rollingYears[0];
  const endRollingYear = rollingYears[rollingYears.length - 1];

  // Si no hay año seleccionado o quedó desfasado respecto a la ventana rodante, arrancar en el año en curso
  if (!currentSelectedYear || !rollingYears.includes(currentSelectedYear)) {
    currentSelectedYear = startRollingYear;
  }

  // Manejo flexible de parámetros (compatibilidad hacia atrás con llamadas de app.js)
  if (typeof yearOrFilter === 'string') {
    if (['asturias', 'all'].includes(yearOrFilter)) {
      currentVisibilityFilter = yearOrFilter;
    } else if (rollingYears.includes(yearOrFilter) || YEAR_HIGHLIGHTS[yearOrFilter]) {
      currentSelectedYear = yearOrFilter;
    }
  }

  if (typeof visOrWeather === 'string' && ['asturias', 'all'].includes(visOrWeather)) {
    currentVisibilityFilter = visOrWeather;
  } else if (typeof visOrWeather === 'object' && visOrWeather !== null) {
    weatherData = visOrWeather;
    if (weatherData && !concejo && arguments[3]) concejo = arguments[3];
  }

  if (weatherData) cachedWeatherData = weatherData;
  if (concejo) cachedConcejo = concejo;

  const targetWeatherData = weatherData || cachedWeatherData;
  const targetConcejo = concejo || cachedConcejo;

  const moon = getMoonPhaseDetails();
  const sunData = getGoldenAndBlueHours(targetWeatherData, targetConcejo);
  const stargazing = getTonightStargazingIndex(targetWeatherData, moon, targetConcejo);
  let now = new Date();
  if (typeof window !== 'undefined' && window.location && window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
    const simYear = parseInt(urlParams.get('sim_year'), 10);
    if (!isNaN(simYear) && simYear >= 2026 && simYear <= 2035) {
      now = new Date(simYear, 0, 1, 0, 0, 0);
    }
  }

  // 1. Filtrar exclusivamente los eventos activos o futuros (excluir fenómenos culminados en el pasado)
  const activeEvents = ASTRONOMICAL_EVENTS.filter(evt => {
    const endDate = new Date(evt.dateEnd || evt.datePeak);
    return endDate >= now;
  });

  // 2. Filtrar por año seleccionado
  const yearEvents = activeEvents.filter(evt => {
    const eventYear = new Date(evt.datePeak).getFullYear().toString();
    return eventYear === currentSelectedYear;
  });

  // Conteos para los botones de visibilidad del año seleccionado
  const countYearAsturias = yearEvents.filter(e => e.visibility === 'asturias' || e.visibility === 'spain').length;
  const countYearAll = yearEvents.length;

  // 3. Filtrar según visibilidad elegida (asturias vs todos)
  const filteredEvents = yearEvents.filter(evt => {
    if (currentVisibilityFilter === 'all') return true;
    return evt.visibility === 'asturias' || evt.visibility === 'spain';
  });

  const yearHighlight = YEAR_HIGHLIGHTS[currentSelectedYear] || YEAR_HIGHLIGHTS[startRollingYear] || YEAR_HIGHLIGHTS['2026'];

  const html = `
    <div class="astronomy-view-container">
      
      <!-- HERO CARD PRINCIPAL: ASTRONOMÍA & COSMOS (CON CARRUSEL DESLIZANTE NOCHE / DÍA) -->
      <div class="astronomy-hero-card">
        <div class="astronomy-hero-top">
          <div class="astronomy-hero-title">
            <span class="astronomy-hero-icon">🔭</span>
            <div>
              <h3>Astronomía & Cosmos</h3>
              <span class="astronomy-subtitle">Acontecimientos celestes y semáforo de visibilidad en Asturias (${startRollingYear} - ${endRollingYear})</span>
            </div>
          </div>
        </div>

        <!-- CARRUSEL DESLIZABLE COMPACTO: NOCHE & LUNA vs DÍA & HORA MÁGICA (LEY 18) -->
        <div class="cosmos-widgets-carousel-wrap">
          <div class="cosmos-widgets-carousel" id="cosmos-widgets-carousel">
            
            <!-- Slide 1: Cielo Nocturno & Luna -->
            <div class="cosmos-widget-slide">
              <div class="cosmos-subcard cosmos-night-card">
                <div class="cosmos-subcard-header">
                  <div class="cosmos-subcard-title">
                    <span class="subcard-icon">🌙</span>
                    <div>
                      <strong>Cielo Nocturno & Luna</strong>
                      <span class="subcard-subtitle">Fase lunar y calidad de cielo hoy</span>
                    </div>
                  </div>
                </div>

                <div class="astronomy-moon-details-grid">
                  <div class="moon-metric-pill moon-pill-main">
                    <span class="moon-icon-pill">${moon.icon}</span>
                    <div class="moon-metric-meta">
                      <span class="metric-label">${moon.phaseName}</span>
                      <span class="metric-val">${moon.illumination}% Ilum.</span>
                    </div>
                  </div>
                  <div class="moon-metric-pill moon-pill-main">
                    <span class="moon-icon-pill">🌕</span>
                    <div class="moon-metric-meta">
                      <span class="metric-label">Luna Llena</span>
                      <span class="metric-val">${moon.daysToFullMoon === 0 ? '¡Hoy!' : 'En ' + moon.daysToFullMoon + ' días'}</span>
                    </div>
                  </div>
                </div>

                <!-- SEMÁFORO EN VIVO: CALIDAD DEL CIELO ESTA NOCHE (22:00 - 04:00 H) -->
                <div style="margin-top: 10px; background: rgba(15, 23, 42, 0.55); border: 1px solid ${stargazing.color}55; border-left: 4px solid ${stargazing.color}; border-radius: 12px; padding: 9px 11px; box-sizing: border-box;">
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; margin-bottom: 4px;">
                    <span style="font-size: 0.74rem; font-weight: 800; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.04em;">
                      ${stargazing.icon} Observación Esta Noche (22:00 - 04:00 h)
                    </span>
                    <span style="font-size: 0.70rem; font-weight: 800; padding: 2px 7px; border-radius: 999px; background: ${stargazing.color}22; color: ${stargazing.color}; border: 1px solid ${stargazing.color}66;">
                      ${stargazing.badge}
                    </span>
                  </div>
                  <div style="font-size: 0.84rem; font-weight: 800; color: #ffffff; margin-bottom: 2px;">
                    ${stargazing.verdict}
                  </div>
                  <p style="margin: 0; font-size: 0.76rem; color: #94a3b8; line-height: 1.35;">
                    ${stargazing.desc}
                  </p>
                  <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px; padding-top: 5px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 0.70rem; color: #38bdf8; font-weight: 700;">
                    <span>☁️ Nubosidad: ${stargazing.avgCloudPct}%</span>
                    <span>•</span>
                    <span>⏱️ ${stargazing.bestWindow}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 2: Luz Natural & Hora Mágica -->
            <div class="cosmos-widget-slide">
              <div class="cosmos-subcard cosmos-sun-card">
                <div class="cosmos-subcard-header">
                  <div class="cosmos-subcard-title">
                    <span class="subcard-icon">📸</span>
                    <div>
                      <strong>Luz Natural & Hora Mágica</strong>
                      <span class="subcard-subtitle">Ventanas fotográficas hoy en ${sunData.concejoName ? sunData.concejoName.split('(')[0].trim() : 'Asturias'}</span>
                    </div>
                  </div>
                  <button class="btn-explain-sensor" data-explain="golden_hour" title="¿Qué son la Hora Dorada y la Hora Azul? Pulsa para aprender" aria-label="Explicación de la hora dorada y azul">💡</button>
                </div>

                <div class="sun-magic-sections">
                  <!-- Bloque Amanecer -->
                  <div class="sun-magic-group">
                    <div class="sun-magic-group-title">
                      <span>🌅 Amanecer • Orto ${sunData.sunriseStr}</span>
                    </div>
                    <div class="sun-magic-grid">
                      <div class="sun-pill sun-pill-blue">
                        <div class="sun-pill-header">
                          <span class="sun-pill-name">Hora Azul</span>
                          <span class="sun-pill-dot">🔵</span>
                        </div>
                        <span class="sun-pill-time">${sunData.morning.blue}</span>
                      </div>
                      <div class="sun-pill sun-pill-golden">
                        <div class="sun-pill-header">
                          <span class="sun-pill-name">Hora Dorada</span>
                          <span class="sun-pill-dot">🟡</span>
                        </div>
                        <span class="sun-pill-time">${sunData.morning.golden}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Bloque Atardecer -->
                  <div class="sun-magic-group">
                    <div class="sun-magic-group-title">
                      <span>🌇 Atardecer • Ocaso ${sunData.sunsetStr}</span>
                    </div>
                    <div class="sun-magic-grid">
                      <div class="sun-pill sun-pill-golden">
                        <div class="sun-pill-header">
                          <span class="sun-pill-name">Hora Dorada</span>
                          <span class="sun-pill-dot">🟡</span>
                        </div>
                        <span class="sun-pill-time">${sunData.evening.golden}</span>
                      </div>
                      <div class="sun-pill sun-pill-blue">
                        <div class="sun-pill-header">
                          <span class="sun-pill-name">Hora Azul</span>
                          <span class="sun-pill-dot">🔵</span>
                        </div>
                        <span class="sun-pill-time">${sunData.evening.blue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Semáforo de Calidad Fotográfica -->
                <div class="sun-magic-visibility-footer" style="margin-top: 6px; padding: 7px 10px;">
                  <span class="sun-magic-status-badge ${sunData.photoQuality.badgeClass}">${sunData.photoQuality.badge}</span>
                  <span class="sun-magic-status-text" style="font-size: 0.74rem;">${sunData.photoQuality.desc}</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Paginador Interactivo de 2 Puntos (Ley 18) -->
          <div class="cosmos-widgets-dots" id="cosmos-widgets-dots">
            <span class="sensor-dot active" data-sensor-target="0" title="Ver Luna y Cielo Nocturno"></span>
            <span class="sensor-dot" data-sensor-target="1" title="Ver Luz Natural y Hora Mágica"></span>
          </div>
        </div>
      </div>

      <!-- CABECERA DE SECCIÓN: ACONTECIMIENTOS CELESTES (${startRollingYear} - ${endRollingYear}) -->
      <div class="astronomy-section-header">
        <div class="astronomy-section-title-wrap">
          <span class="astronomy-section-icon">🌌</span>
          <div>
            <h4 class="astronomy-section-title">Acontecimientos Celestes (${startRollingYear} - ${endRollingYear})</h4>
            <span class="astronomy-section-subtitle">Exploración anual y visibilidad en Asturias</span>
          </div>
        </div>
      </div>

      <!-- SELECTOR DE AÑO SEGMENTADO (${startRollingYear} - ${endRollingYear}) -->
      <div class="astro-year-selector-wrap">
        <div class="astro-year-pills" role="tablist" aria-label="Seleccionar año astronómico">
          ${rollingYears.map(yr => `
            <button class="astro-year-pill ${currentSelectedYear === yr ? 'active' : ''}" data-year="${yr}" role="tab" aria-selected="${currentSelectedYear === yr}">
              ${yr}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- FILTRO DE VISIBILIDAD INTELIGENTE (ASTURIAS vs TODOS) -->
      <div class="astro-visibility-toolbar">
        <div class="astro-visibility-toggle">
          <button class="astro-vis-btn ${currentVisibilityFilter === 'asturias' ? 'active' : ''}" data-vis="asturias">
            🟢 En Asturias (${countYearAsturias})
          </button>
          <button class="astro-vis-btn ${currentVisibilityFilter === 'all' ? 'active' : ''}" data-vis="all">
            🌐 Global (${countYearAll})
          </button>
        </div>
      </div>

      <!-- TARJETA DESTACADA DEL AÑO SELECCIONADO -->
      <div class="astro-year-highlight-card">
        <div class="astro-year-badge">${yearHighlight.badge}</div>
        <h4 class="astro-year-title">${yearHighlight.title}</h4>
        <p class="astro-year-desc">${yearHighlight.summary}</p>
      </div>

      <!-- LISTADO DE EVENTOS ASTRONÓMICOS DEL AÑO (CERO SCROLL INFINITO) -->
      <div class="astronomy-events-grid">
        ${filteredEvents.length === 0 ? `
          <div class="astro-empty-state" style="grid-column: 1 / -1; padding: 25px 16px; text-align: center; color: var(--text-dim); background: rgba(15, 23, 42, 0.45); border-radius: 14px; border: 1px dashed rgba(255, 255, 255, 0.12);">
            <span style="font-size: 1.8rem; display: block; margin-bottom: 6px;">🌌</span>
            <p style="margin: 0; font-size: 0.84rem;">No hay más eventos restantes en Asturias para ${currentSelectedYear} con este filtro.</p>
            <button class="astro-vis-btn" data-vis="all" style="margin-top: 10px; display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
              🌐 Ver todos los eventos globales de ${currentSelectedYear}
            </button>
          </div>
        ` : filteredEvents.map((evt) => {
          const eventDate = new Date(evt.datePeak);
          const diffDays = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
          
          let countdownText = '';
          if (diffDays <= 0) {
            countdownText = '🔥 ¡Sucediendo Ahora!';
          } else if (diffDays === 1) {
            countdownText = '⏳ ¡Mañana!';
          } else {
            countdownText = `⏳ En ${diffDays} días`;
          }

          let semaforoClass = 'badge-green';
          let semaforoIcon = '🟢';
          if (evt.visibility === 'spain') {
            semaforoClass = 'badge-yellow';
            semaforoIcon = '🟡';
          } else if (evt.visibility === 'global') {
            semaforoClass = 'badge-red';
            semaforoIcon = '🔴';
          }

          return `
            <details class="astro-event-card astro-accordion-card ${evt.visibility}" name="astro-accordion">
              <summary class="astro-accordion-header">
                <div class="astro-accordion-summary-content">
                  <div class="astro-event-header">
                    <div class="astro-event-type-row">
                      <span class="astro-type-pill">${evt.typeLabel}</span>
                      <span class="astro-countdown-pill ${diffDays <= 3 && diffDays >= 0 ? 'urgent' : ''}">${countdownText}</span>
                    </div>
                    <div class="astro-traffic-badge ${semaforoClass}">
                      <span>${semaforoIcon} ${evt.visibilityLabel}</span>
                    </div>
                  </div>

                  <div class="astro-accordion-title-row">
                    <div class="astro-accordion-name-col">
                      <h4 class="astro-event-title">${evt.icon} ${evt.title}</h4>
                      <div class="astro-event-date">📅 ${evt.displayDate}</div>
                    </div>
                    <span class="astro-accordion-chevron" aria-hidden="true">▾</span>
                  </div>
                </div>
              </summary>

              <div class="astro-accordion-body">
                <p class="astro-event-desc">${evt.visibilityDesc}</p>

                <div class="astro-event-tips-box">
                  <div class="astro-tip-item">
                    <strong>📍 Observación en Asturias:</strong> ${evt.asturiasTip}
                  </div>
                  <div class="astro-tip-item equipment">
                    <strong>🔭 Instrumento recomendado:</strong> ${evt.equipment}
                  </div>
                </div>
              </div>
            </details>
          `;
        }).join('')}
      </div>

      <!-- PIE INFORMATIVO DE ASTRONOMÍA -->
      <div class="astronomy-footer-info">
        <span>✨ Información y efemérides astronómicas oficiales para el cielo de Asturias (${startRollingYear} - ${endRollingYear}) • MeteoAstur Lode</span>
      </div>

    </div>
  `;

  container.innerHTML = html;

  // Inicializar carrusel y dots de astronomía (Ley 18)
  initCosmosCarousel();

  // Event Listeners para la barra de años (${startRollingYear} - ${endRollingYear})
  container.querySelectorAll('.astro-year-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const year = e.currentTarget.dataset.year;
      renderAstronomyView(containerId, year, currentVisibilityFilter, cachedWeatherData, cachedConcejo);
    });
  });

  // Event Listeners para el conmutador de visibilidad (Asturias vs Todos)
  container.querySelectorAll('.astro-vis-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const vis = e.currentTarget.dataset.vis;
      renderAstronomyView(containerId, currentSelectedYear, vis, cachedWeatherData, cachedConcejo);
    });
  });
}

/**
 * Inicializador del Carrusel Deslizante de Astronomía (Ley 18)
 * Sincroniza el paginador de puntos y el desplazamiento horizontal fluido
 */
export function initCosmosCarousel() {
  const carousel = document.getElementById('cosmos-widgets-carousel');
  const dotsContainer = document.getElementById('cosmos-widgets-dots');
  if (!carousel || !dotsContainer || carousel.dataset.dotsBound === '1') return;
  carousel.dataset.dotsBound = '1';

  const dots = dotsContainer.querySelectorAll('.sensor-dot');
  const slides = carousel.querySelectorAll('.cosmos-widget-slide');
  if (!slides.length || !dots.length) return;

  const updateActiveDot = (idx) => {
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  };

  const findClosestSlideIndex = () => {
    const scrollLeft = carousel.scrollLeft;
    let closestIdx = 0;
    let minDiff = Infinity;
    slides.forEach((slide, i) => {
      const slidePos = slide.offsetLeft - carousel.offsetLeft;
      const diff = Math.abs(scrollLeft - slidePos);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });
    return closestIdx;
  };

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = parseInt(dot.getAttribute('data-sensor-target') || '0', 10);
      if (slides[targetIdx]) {
        const targetLeft = slides[targetIdx].offsetLeft - carousel.offsetLeft;
        carousel.scrollTo({ left: targetLeft, behavior: 'smooth' });
        updateActiveDot(targetIdx);
      }
    });
  });

  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      updateActiveDot(findClosestSlideIndex());
    }, 45);
  }, { passive: true });
}
