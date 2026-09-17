/**
 * Diccionario Didáctico de Fenómenos Meteorológicos
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 */

export const WEATHER_PHENOMENA = [
  {
    id: 'vaguada',
    title: 'Vaguada',
    icon: '📉',
    category: 'sistemas',
    categoryName: 'Grandes Sistemas',
    tag: 'Inestabilidad en Altura',
    summary: 'Lengua alargada de aire frío en niveles altos que actúa como chimenea de tormentas.',
    whatIs: 'Una vaguada no es una borrasca en el suelo, sino una <strong>ondulación alargada en forma de "V"</strong> de bajas presiones y aire polar en capas medias y altas de la atmósfera (a unos 5.500 metros de altura). En los mapas del tiempo se dibuja como una línea discontinua o una curva abierta que desciende hacia el sur.',
    howItForms: 'Funciona como una auténtica <strong>chimenea de succión</strong>. Al deslizarse aire frío por las capas altas, el aire cálido y húmedo que está en la superficie se ve obligado a ascender violentamente. Al subir, se enfría a gran velocidad, se condensa y dispara gigantescas nubes de tormenta (cumulonimbos).',
    asturiasEffect: 'En Asturias, cuando cruza una vaguada atlántica o cantábrica, el choque del aire húmedo marino con las laderas de la Cordillera Cantábrica y Picos de Europa intensifica las tormentas. Deja <strong>chubascos súbitos, aparato eléctrico, granizo y chubascos de distribución muy irregular</strong>: en un concejo puede caer una tromba de agua y a 10 km estar seco.',
    curiosity: 'Muchos partes dicen "se acerca una borrasca" cuando en realidad es una vaguada. La clave está en que la vaguada no tiene un centro circular cerrado con frentes en el suelo, sino que es una lengua abierta de inestabilidad aérea.'
  },
  {
    id: 'borrasca',
    title: 'Borrasca',
    icon: '🌀',
    category: 'sistemas',
    categoryName: 'Grandes Sistemas',
    tag: 'Baja Presión en Superficie',
    summary: 'Centro cerrado de bajas presiones que gira en sentido antihorario acarreando frentes de lluvia y temporales.',
    whatIs: 'Una borrasca (o ciclón extratropical) es una <strong>región donde la presión atmosférica en superficie es significativamente más baja</strong> que la del aire que la rodea (por debajo de 1013 hPa). En los mapas se representa con círculos cerrados (isobaras) con una gran "B" en el centro.',
    howItForms: 'Nace del choque entre dos grandes masas de aire: el aire polar frío que baja del norte y el aire tropical cálido que sube del sur. Al chocar, la masa cálida asciende sobre la fría formando un remolino que, debido a la rotación terrestre (fuerza de Coriolis), <strong>gira en sentido contrario a las agujas del reloj</strong> en nuestro hemisferio, arrastrando una cola de frentes fríos y cálidos.',
    asturiasEffect: 'En Asturias y todo el Cantábrico, las borrascas atlánticas que entran desde el oeste o noroeste traen <strong>temporales duros de mar (mar de fondo y olas de más de 5-7 metros)</strong>, vientos de componente oeste y noroeste continuos, y lluvias generales que barren la región durante días.',
    curiosity: 'Cuanto más juntos estén los círculos de las isobaras en el mapa, mayor es la diferencia de presión y más huracanado será el viento en el litoral y las cumbres.'
  },
  {
    id: 'dana',
    title: 'DANA (Gota Fría)',
    icon: '💧',
    category: 'sistemas',
    categoryName: 'Grandes Sistemas',
    tag: 'Bolsa Aislada & Torrencial',
    summary: 'Depresión Aislada en Niveles Altos: una bolsa de aire polar que se desprende y flota errática.',
    whatIs: 'DANA son las siglas de <strong>Depresión Aislada en Niveles Altos</strong>. Es lo que popularmente se conoció toda la vida como "gota fría". Se trata de una bolsa de aire muy frío (a -20 °C o -30 °C a 5.500 metros) que ha quedado totalmente separada de la circulación general de la atmósfera.',
    howItForms: 'La corriente en chorro (un río de viento a 10.000 metros) sufre una ondulación extrema (una vaguada muy profunda) hasta que se <strong>"estrangula" y se corta</strong>. La bolsa de aire frío queda flotando de forma independiente, como una gota de aceite en agua, sin frentes definidos y moviéndose a menudo de forma errática o retrógrada (hacia el este o hacia el sur).',
    asturiasEffect: 'El efecto en Asturias depende de dónde quede atrapada la DANA. Si se sitúa al oeste de Galicia o sobre el Golfo de Cádiz, bombea aire cálido y muy húmedo de componente sur y sureste que, al remontar la cordillera, genera <strong>tormentas torrenciales de granizo y aparato eléctrico</strong> en los valles interiores y la montaña asturiana.',
    curiosity: 'Una DANA no siempre causa catástrofes; para que sea devastadora necesita alimentarse de un mar muy cálido y cargado de vapor de agua (como el Mediterráneo en otoño) o de una fuerte inyección de humedad atlántica.'
  },
  {
    id: 'ciclogenesis',
    title: 'Ciclogénesis Explosiva',
    icon: '💣',
    category: 'sistemas',
    categoryName: 'Grandes Sistemas',
    tag: 'La "Bomba" Meteorológica',
    summary: 'Borrasca que se profundiza a velocidad vertiginosa (caída de 20+ hPa en 24h) creando temporales huracanados.',
    whatIs: 'La ciclogénesis es el proceso habitual de nacimiento de una borrasca. Se convierte en <strong>"explosiva" o "bomba meteorológica"</strong> cuando la presión en su centro se desploma a una velocidad vertiginosa: al menos <strong>18 a 24 hPa en un período de solo 24 horas</strong> en nuestras latitudes.',
    howItForms: 'Ocurre cuando coincide una anomalía de aire gélido polar en capas altas con una masa de aire muy templada y húmeda en superficie, frecuentemente sobre las aguas relativamente cálidas de la Corriente del Golfo. La corriente en chorro interactúa justo encima a más de 300 km/h, aspirando el aire con tal furia que la borrasca explota en cuestión de horas.',
    asturiasEffect: 'Cuando una ciclogénesis explosiva cruza el Golfo de Vizcaya o el Atlántico norte hacia el Cantábrico (como las históricas Klaus o Xynthia), provoca <strong>rachas de viento superiores a 130-160 km/h</strong> en cabos como Peñas, Busto o Lastres, olas colosales de 9 a 11 metros y riesgo severo de caída de árboles y tejados.',
    curiosity: 'El término técnico científico proviene del meteorólogo Fred Sanders del MIT en 1980, quien definió la unidad de profundización rápida como "el Bergeron" (en honor al meteorólogo sueco Tor Bergeron).'
  },
  {
    id: 'galerna',
    title: 'Galerna Cantábrica',
    icon: '🌊',
    category: 'cantabrico',
    categoryName: 'Asturias & Cantábrico',
    tag: 'El Zarpazo del Noroeste',
    summary: 'Giro súbito del viento al Noroeste con rachas huracanadas y caída térmica de 10 °C en minutos.',
    whatIs: 'Es el <strong>fenómeno meteorológico más repentino, traicionero y peligroso del litoral cantábrico</strong>. Consiste en un cambio brusco y violento del viento, que rola en cuestión de segundos de un sur o calma templada a un vendaval huracanado de componente Noroeste (NW).',
    howItForms: 'Suele ocurrir en días calurosos de primavera y verano. La costa cantábrica se calienta intensamente con viento flojo o del sur, formándose una baja térmica local. De pronto, un frente frío oceánico o una masa de aire marino denso rompe la barrera y se encajona a toda velocidad entre la Cordillera Cantábrica y el mar, avanzando como un auténtico "pistón" de aire frío de oeste a este.',
    asturiasEffect: 'En playas como Salinas, San Lorenzo, Rodiles o Llanes, la jornada comienza como un día plácido de baño (28-30 °C). En cuestión de <strong>5 a 15 minutos, el cielo se torna plomizo, el termómetro se desploma 10 °C, el viento salta a más de 80-100 km/h</strong> y el mar pasa de plato a romper con olas desordenadas y espuma blanca, arrastrando sombrillas y poniendo en peligro embarcaciones y bañistas.',
    curiosity: 'La Galerna del Sábado de Gloria (1878) se cobró la vida de 322 pescadores en el Cantábrico. Hoy en día, los modelos de alta resolución como AROME permiten emitir alertas con horas de antelación.'
  },
  {
    id: 'frentes',
    title: 'Frentes: Frío, Cálido y Ocluido',
    icon: '🌦️',
    category: 'frentes',
    categoryName: 'Frentes & Nubes',
    tag: 'Las Fronteras del Aire',
    summary: 'Líneas de choque entre masas de aire de distinta temperatura y humedad que generan las lluvias.',
    whatIs: 'Un frente meteorológico es la <strong>zona de frontera o choque</strong> entre dos masas de aire con diferente temperatura y humedad. Al no mezclarse de forma instantánea debido a su distinta densidad, se producen ascensos de aire y nubosidad en la línea de contacto.',
    howItForms: `
      <ul class="explain-list">
        <li><strong>🔵 Frente Frío (Línea azul con triángulos):</strong> El aire polar frío avanza como una pala excavadora y se mete por debajo del aire cálido, levantándolo bruscamente. Deja <em>chubascos fuertes, bajada súbita de temperatura y viento del Noroeste</em>.</li>
        <li><strong>🔴 Frente Cálido (Línea roja con semicírculos):</strong> El aire cálido avanza y se desliza suavemente sobre el aire frío que se retira. Genera <em>cielos blanquecinos de nimbostratos, lluvias continuas y orballo suave persistente</em>.</li>
        <li><strong>🟣 Frente Ocluido (Línea morada combinada):</strong> Dado que el frente frío viaja más rápido que el cálido, termina alcanzándolo y levantándolo del suelo, exprimiendo las últimas lluvias antes de que la masa de aire se homogeneice.</li>
      </ul>
    `,
    asturiasEffect: 'En Asturias el paso de un frente frío atlántico es la estampa clásica: nubes oscuras entrando por el cabo Busto y Peñas, chubasco intenso de corta duración con granizo o tormenta, y detrás una atmósfera limpísima con aire fresco del norte.',
    curiosity: 'El término "frente" fue acuñado durante la Primera Guerra Mundial por la Escuela de Bergen (Noruega), inspirándose en las líneas de trincheras donde combatían dos ejércitos enfrentados.'
  },
  {
    id: 'anticiclon',
    title: 'Anticiclón y Dorsal',
    icon: '☀️',
    category: 'sistemas',
    categoryName: 'Grandes Sistemas',
    tag: 'El Muro de Estabilidad',
    summary: 'Zona de altas presiones (>1013 hPa) con aire descendente que disipa nubes y trae tiempo seco.',
    whatIs: 'Un anticiclón es una <strong>región de altas presiones (por encima de 1013.25 hPa)</strong> donde el aire desciende lentamente desde la alta atmósfera hacia el suelo (fenómeno llamado <em>subsidencia</em>). Una <strong>dorsal</strong> es una prolongación o cuña alargada de ese anticiclón en niveles altos.',
    howItForms: 'Al descender el aire hacia la superficie, se comprime y se calienta de forma natural. Este proceso de calentamiento por compresión hace que la humedad relativa baje y las gotas de agua se evaporen, lo que <strong>impide que se formen nubes de lluvia y disipa las tormentas</strong>, actuando como un escudo protector frente a las borrascas.',
    asturiasEffect: 'En Asturias, el famoso "Anticiclón de las Azores" cuando se posiciona sobre las islas británicas o el Cantábrico garantiza <strong>días soleados, vientos del nordeste suaves y tiempo seco</strong>. Sin embargo, en invierno en valles interiores como Oviedo o el Caudal puede atrapar frío e inversión térmica con densas nieblas.',
    curiosity: 'En el hemisferio norte, el aire dentro del anticiclón gira en el <strong>sentido de las agujas del reloj</strong> (al revés que las borrascas) y hacia el exterior.'
  },
  {
    id: 'foehn',
    title: 'Viento Sur (Efecto Foehn)',
    icon: '🔥',
    category: 'cantabrico',
    categoryName: 'Asturias & Cantábrico',
    tag: 'El Ábrego Seco y Cálido',
    summary: 'Viento que cruza la Cordillera Cantábrica recalentándose y secándose al bajar hacia la costa asturiana.',
    whatIs: 'El <strong>Efecto Foehn</strong> (o Föhn) es un fenómeno termodinámico que ocurre cuando una masa de aire se ve forzada a superar una cadena montañosa elevada como la Cordillera Cantábrica (con cotas de más de 2.000 metros). En Asturias se le conoce comúnmente como <strong>Viento Sur o Ábrego</strong>.',
    howItForms: 'El aire húmedo sube por la ladera sur (León / Meseta) y se enfría, condensando su humedad y descargando lluvias en la montaña leonesa. Pero al coronar la cumbre y <strong>descender por las laderas asturianas hacia el mar</strong>, el aire ya está completamente seco y se comprime por el aumento de presión, <strong>calentándose a un ritmo constante de 1 °C por cada 100 metros que baja</strong>.',
    asturiasEffect: 'Provoca que en Gijón, Oviedo, Avilés o Llanes se alcancen <strong>temperaturas de 25 °C a 28 °C en pleno invierno</strong>, con humedades relativas que se desploman por debajo del 25-30%, cielo azul profundo sin una nube y ráfagas muy secas y violentas. Es el mayor acelerador de incendios forestales en la cornisa cantábrica.',
    curiosity: 'En Asturias la tradición popular llamaba a este viento el "viento de las castañas" o el "viento de los locos", pues la ionización y el cambio brusco de presión solían alterar el sueño y el estado de ánimo de los vecinos.'
  },
  {
    id: 'borrina',
    title: 'Niebla Marina ("Borrina")',
    icon: '🌫️',
    category: 'cantabrico',
    categoryName: 'Asturias & Cantábrico',
    tag: 'Advección Marina Costera',
    summary: 'Banco de niebla espesa y fría que entra desde el mar Cantábrico a las playas en pleno verano.',
    whatIs: 'La <strong>niebla de advección marina</strong>, popularmente llamada en Asturias <em>borrina costera</em> o <em>taró</em>, es una niebla densa y baja que se genera sobre la superficie del agua del mar y es empujada por una suave brisa hacia la costa.',
    howItForms: 'Ocurre sobre todo a finales de primavera y en verano. Una masa de aire cálido y cargado de vapor de agua entra en contacto con las aguas superficiales del Cantábrico, que están notablemente más frías (a 16-19 °C). El contacto con el agua enfría la base del aire hasta alcanzar el <strong>punto de rocío</strong>, condensando el vapor en millones de microgotas flotantes.',
    asturiasEffect: 'Entra como un "muro blanco" fantasmal desde mar adentro. En cuestión de minutos, la playa de San Lorenzo, Salinas o Ribadesella pasa de un sol abrasador a quedar cubierta por una <strong>niebla helada que reduce la visibilidad a 50 metros y baja el termómetro 6 °C o 8 °C</strong>, mientras a 2 kilómetros tierra adentro en el interior luce un sol radiante.',
    curiosity: 'Aunque parezca un día gris de lluvia fina, la borrina suele tener un espesor vertical muy fino (apenas 50 a 100 metros). Si subes al monte Deva, Naranco o Mirador del Fito, verás que estás por encima de ella bajo un cielo azul limpísimo.'
  },
  {
    id: 'inversion',
    title: 'Inversión Térmica & Mar de Nubes',
    icon: '🏔️',
    category: 'cantabrico',
    categoryName: 'Asturias & Cantábrico',
    tag: 'El Mundo al Revés',
    summary: 'Aire frío atrapado en los valles con niebla, mientras en las cumbres de montaña hace sol y calor.',
    whatIs: 'En condiciones normales en la atmósfera, la temperatura disminuye con la altura (aproximadamente 0.65 °C cada 100 m). En la <strong>inversión térmica ocurre exactamente lo contrario: hace más frío en el fondo de los valles que en lo alto de las montañas</strong>.',
    howItForms: 'Ocurre en noches largas y despejadas de invierno bajo anticiclones tranquilos sin viento. La tierra pierde calor rápidamente por radiación hacia el espacio. El aire en contacto con el suelo se vuelve gélido y denso (pesado), deslizándose ladera abajo y <strong>acumulándose como una charca de aire frío en el fondo de los valles y cuencas</strong>, quedando atrapado bajo una capa de aire más templado que actúa de tapadera.',
    asturiasEffect: 'Es muy común en Oviedo, Cangas de Onís, Pola de Siero o las cuencas del Nalón y Caudal. Amanecen a <strong>1 °C o 3 °C con niebla cerrada, húmeda y fría</strong>, mientras que arriba en Pajares, Somiedo o los Lagos de Covadonga (a 1.200 m) hay <strong>14 °C con sol resplandeciente</strong> sobre un espectacular "Mar de Nubes".',
    curiosity: 'La inversión térmica actúa como una campana hermética: atrapa el humo de chimeneas y los humos del tráfico en el fondo del valle, haciendo que empeore notablemente el índice de calidad del aire (AQI) hasta que levanta la niebla al mediodía.'
  }
];

/**
 * Devuelve el listado de categorías disponibles
 */
export const PHENOMENA_CATEGORIES = [
  { id: 'all', label: 'Todos', icon: '🌐', count: WEATHER_PHENOMENA.length },
  { id: 'sistemas', label: 'Grandes Sistemas', icon: '🌀', count: WEATHER_PHENOMENA.filter(p => p.category === 'sistemas').length },
  { id: 'cantabrico', label: 'Asturias & Cantábrico', icon: '⚓', count: WEATHER_PHENOMENA.filter(p => p.category === 'cantabrico').length },
  { id: 'frentes', label: 'Frentes & Nubes', icon: '🌦️', count: WEATHER_PHENOMENA.filter(p => p.category === 'frentes').length }
];
