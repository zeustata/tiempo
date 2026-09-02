/**
 * Diccionario didáctico de explicaciones meteorológicas ("Explícame")
 * Desarrollado por Manuel A. L. Barril y Princesa
 */

export const WEATHER_EXPLANATIONS = {
  barometer: {
    icon: '🧭',
    title: '¿Cómo funciona el Barómetro y la Presión?',
    subtitle: 'Aprende a anticipar el tiempo leyendo la presión atmosférica',
    badge: '1013.25 hPa = Nivel de Equilibrio',
    sections: [
      {
        icon: '⚖️',
        heading: '1. ¿Qué es la presión atmosférica?',
        text: 'La atmósfera es una capa de aire que envuelve la Tierra y tiene peso. Los <strong>hPa (hectopascales)</strong> miden la fuerza que ejerce ese aire sobre nosotros. El valor estándar a nivel del mar es <strong>1013.25 hPa</strong>.'
      },
      {
        icon: '☀️',
        heading: '2. Anticiclón (> 1013 hPa) • Altas Presiones',
        text: 'El aire "pesa mucho" y desciende hacia el suelo (*subsidencia*). Al comprimirse, <strong>disipa las nubes e impide tormentas</strong>, trayendo días despejados, sol, calma y tiempo seco.'
      },
      {
        icon: '🌧️',
        heading: '3. Borrasca (< 1013 hPa) • Bajas Presiones',
        text: 'El aire "pesa poco" y asciende rápidamente. Al subir, se enfría, se condensa y genera <strong>frentes de nubes densas, lluvias, viento y tormentas</strong>.'
      },
      {
        icon: '📈',
        heading: '4. Cómo leer la tendencia (Últimas 3 horas)',
        text: `
          <ul class="explain-list">
            <li><strong>↗️ Subiendo (+0.8 a +2.0 hPa):</strong> El anticiclón gana fuerza. Viene <em>mejoría clara y el cielo se despejará</em>.</li>
            <li><strong>→ Estable (-0.8 a +0.8 hPa):</strong> Continuidad. El tiempo se mantendrá igual en las próximas horas.</li>
            <li><strong>↘️ Bajando rápido (-1.0 a -3.0 hPa):</strong> ¡Alerta! Se acerca una <em>borrasca, temporal de viento o lluvia inminente</em>.</li>
          </ul>
        `
      },
      {
        icon: '🏔️',
        heading: 'Astucia Meteorológica en Asturias',
        text: 'En el litoral y valles asturianos, un anticiclón en verano puede favorecer nieblas marinas costeras por la mañana que levantan al mediodía, mientras que en invierno asegura cumbres soleadas por encima de la inversión térmica.'
      }
    ]
  },

  wind: {
    icon: '🧭',
    title: '¿Cómo interpretar el Viento y las Ráfagas?',
    subtitle: 'Diferencia entre viento sostenido y rachas, escala Beaufort y vientos típicos de Asturias',
    badge: 'Velocidad Sostenida (km/h) vs Rachas Máximas',
    sections: [
      {
        icon: '💨',
        heading: '1. Viento Medio vs Rachas / Ráfagas',
        text: 'La <strong>velocidad media</strong> representa el flujo continuo durante los últimos 10 minutos. Las <strong>rachas o ráfagas</strong> son picos repentinos de 3 segundos que pueden ser hasta un <strong>50% o 100% superiores</strong>, y son las que causan caídas de ramas, vuelco de objetos y peligro en carretera.'
      },
      {
        icon: '📊',
        heading: '2. Escala de Intensidad (Beaufort)',
        text: `
          <ul class="explain-list">
            <li><strong>🟢 0 a 19 km/h (Brisa Suave):</strong> Hojas de árboles en movimiento; sensación agradable.</li>
            <li><strong>🟡 20 a 39 km/h (Moderado):</strong> Se mueven ramas pequeñas; levanta polvo y papeles.</li>
            <li><strong>🟠 40 a 60 km/h (Fuerte):</strong> Dificultad para abrir paraguas o caminar contra el viento.</li>
            <li><strong>🔴 > 60 a 90+ km/h (Temporal / Vendaval):</strong> Riesgo de caída de tejas y ramas. Avisos meteorológicos activos.</li>
          </ul>
        `
      },
      {
        icon: '🧭',
        heading: '3. Rosa de los Vientos',
        text: 'Indica el punto cardinal de procedencia: <strong>N (Norte)</strong>, <strong>NE (Nordeste)</strong>, <strong>E (Este)</strong>, <strong>SE (Sureste)</strong>, <strong>S (Sur)</strong>, <strong>SO (Suroeste)</strong>, <strong>O (Oeste)</strong> y <strong>NO (Noroeste)</strong>.'
      },
      {
        icon: '🏔️',
        heading: 'Astucia con los Vientos en Asturias',
        text: 'El <strong>Viento Sur (Ábrego)</strong> desciende recalentado y seco de la Cordillera Cantábrica por <em>efecto Foehn</em>, disparando las temperaturas y el riesgo de incendios. En contraste, el <strong>Gallego o Noroeste (NO)</strong> llega cargado de humedad marina cantábrica trayendo chubascos, oleaje bravo y bajada térmica.'
      }
    ]
  },

  rain: {
    icon: '🌧️',
    title: '¿Cómo funciona el Pluviómetro y la Lluvia?',
    subtitle: 'Aprende a leer los litros por metro cuadrado (l/m²), intensidad y tipos de precipitación',
    badge: '1 mm de precipitación = 1 Litro por m²',
    sections: [
      {
        icon: '🪣',
        heading: '1. ¿Qué significa 1 mm de lluvia?',
        text: 'Cada milímetro registrado por el pluviómetro equivale exactamente a <strong>1 litro de agua acumulada sobre una superficie de un metro cuadrado (1 l/m²)</strong>. Si caen 20 mm, un tejado de 100 m² habrá recibido 2.000 litros de agua.'
      },
      {
        icon: '⏱️',
        heading: '2. Escala de Intensidad Oficial (AEMET)',
        text: `
          <ul class="explain-list">
            <li><strong>🟢 Menos de 2 mm/h:</strong> <em>Lluvia débil / Llovizna:</em> Humedece el suelo sin provocar escorrentía.</li>
            <li><strong>🟡 2 a 15 mm/h:</strong> <em>Lluvia moderada:</em> Precipitación constante ordinaria.</li>
            <li><strong>🟠 15 a 30 mm/h:</strong> <em>Lluvia fuerte:</em> Charcos inmediatos y reducción notable de visibilidad al volante.</li>
            <li><strong>🔴 > 30 a 60 mm/h:</strong> <em>Lluvia muy fuerte o torrencial:</em> Riesgo de desbordamiento de arroyos y balsas en carreteras.</li>
          </ul>
        `
      },
      {
        icon: '🎯',
        heading: '3. Probabilidad (%) vs Cantidad (mm)',
        text: 'Un 90% de probabilidad significa que es casi seguro que precipitará, aunque pueda ser un simple calabobos. Por contra, un 30% en verano puede corresponder a una tormenta muy localizada pero de gran intensidad.'
      },
      {
        icon: '🌫️',
        heading: 'Singularidades de la Lluvia en Asturias',
        text: 'En Asturias el agua se vive de muchas formas: desde el tradicional <strong>orbayu o calabobos</strong> (gotículas casi suspendidas en el aire con 100% de humedad) hasta el <strong>bastinazu</strong> (tromba repentina y torrencial de corta duración).'
      }
    ]
  },

  humidity_dewpoint: {
    icon: '💧',
    title: '¿Qué es la Humedad y el Punto de Rocío?',
    subtitle: 'El mejor indicador científico de sensación de bochorno y condensación',
    badge: 'Humedad Relativa (%) & Punto de Rocío (°C)',
    sections: [
      {
        icon: '🌊',
        heading: '1. Humedad Relativa (%)',
        text: 'Mide la cantidad de vapor de agua que hay en el aire comparada con el <strong>máximo posible</strong> a esa temperatura. Un 100% significa aire saturado donde ya no cabe ni una molécula más de vapor.'
      },
      {
        icon: '🌫️',
        heading: '2. ¿Qué es el Punto de Rocío (°C)?',
        text: 'Es la <strong>temperatura exacta a la que debe enfriarse el aire para que el vapor se condense en agua líquida</strong>. Si la temperatura del suelo o del aire cae hasta el punto de rocío, se forman nieblas, vaho en los cristales o rocío en los prados.'
      },
      {
        icon: '🌡️',
        heading: '3. Escala de Sensación y Confort Humano',
        text: `
          <ul class="explain-list">
            <li><strong>🧊 Menor de 10 °C:</strong> Aire seco y fresco. Confortable y fácil transpiración.</li>
            <li><strong>✨ 10 °C a 16 °C:</strong> Nivel óptimo y agradable. Sensación térmica perfecta.</li>
            <li><strong>😓 16 °C a 19 °C:</strong> Sensación perceptible de humedad y calor moderado.</li>
            <li><strong>🔥 20 °C a 24 °C+:</strong> <em>Bochorno sofocante y pegajoso</em>. El sudor no se evapora y aumenta el cansancio térmico.</li>
          </ul>
        `
      },
      {
        icon: '🏔️',
        heading: 'Astucia Meteorológica en Asturias',
        text: 'Cuando la temperatura ambiente y el punto de rocío están separados por menos de <strong>1 °C o 2 °C</strong> en la costa cantábrica o los valles asturianos, ¡la presencia de <em>niebla marina, nubes bajas o el típico orbayu</em> es prácticamente inevitable!'
      }
    ]
  },

  uv: {
    icon: '☀️',
    title: '¿Qué es el Índice de Radiación Ultravioleta (UV)?',
    subtitle: 'Protege tu piel y ojos según la intensidad solar en cada hora',
    badge: 'Escala 0 a 11+',
    sections: [
      {
        icon: '🔬',
        heading: '1. ¿Qué mide el índice UV?',
        text: 'Mide la capacidad de la radiación solar para producir quemaduras en la piel humana. Cuanto mayor sea el número, mayor es la intensidad y más rápido se pueden sufrir lesiones solares.'
      },
      {
        icon: '🟢',
        heading: '2. Niveles de Riesgo Solar',
        text: `
          <ul class="explain-list">
            <li><strong>🟢 0 a 2 (Bajo):</strong> Riesgo mínimo. Seguro para actividades al aire libre sin protección especial.</li>
            <li><strong>🟡 3 a 5 (Moderado):</strong> Protección recomendada. Usa gafas de sol y crema SPF 30+ en horas centrales.</li>
            <li><strong>🟠 6 a 7 (Alto):</strong> Precaución alta. Evita exposición prolongada entre 12:00 y 17:00 h.</li>
            <li><strong>🔴 8 a 10 (Muy Alto) y 11+ (Extremo):</strong> Quemaduras en pocos minutos. Sombra obligatoria y protección SPF 50+.</li>
          </ul>
        `
      },
      {
        icon: '🏔️',
        heading: 'Astucia en la Montaña y Playas de Asturias',
        text: 'En la Cordillera Cantábrica y Picos de Europa, la radiación UV aumenta un <strong>10% por cada 1.000 metros de altitud</strong>. Y en la nieve o en la orilla del mar, el reflejo duplica el impacto solar en la piel.'
      }
    ]
  },

  aqi: {
    icon: '🍃',
    title: '¿Qué es el Índice de Calidad del Aire (AQI)?',
    subtitle: 'Conoce la pureza del aire que respiras en tu concejo',
    badge: 'Estándar Europeo CAQI',
    sections: [
      {
        icon: '💨',
        heading: '1. ¿Qué mide el AQI?',
        text: 'Monitorea la concentración de partículas finas en suspensión (<strong>PM2.5 y PM10</strong>), ozono troposférico (<strong>O3</strong>) y dióxido de nitrógeno (<strong>NO2</strong>).'
      },
      {
        icon: '🌈',
        heading: '2. Escala de Calidad',
        text: `
          <ul class="explain-list">
            <li><strong>🟢 Excelente / Buena:</strong> Aire puro, perfecto para deporte y actividades al aire libre.</li>
            <li><strong>🟡 Moderada:</strong> Calidad aceptable; personas muy sensibles al polen o asma deben moderar esfuerzos intensos.</li>
            <li><strong>🔴 Desfavorable / Mala:</strong> Posible presencia de polvo en suspensión (calima) o inversión térmica; se recomienda limitar ejercicio prolongado al exterior.</li>
          </ul>
        `
      }
    ]
  },

  surf: {
    icon: '🏄‍♂️',
    title: '¿Cómo entender el Viento, Olas y Picos de Surf?',
    subtitle: 'Guía de viento Offshore vs Onshore, fondos marinos, izquierdas/derechas y picos de Asturias',
    badge: 'Offshore (Terral) vs Onshore (Mar) • Beach & Reef Breaks',
    sections: [
      {
        icon: '🧭',
        heading: '1. Offshore vs Onshore (El Viento y la Calidad de la Ola)',
        text: `
          <ul class="explain-list">
            <li><strong>🟢 Offshore (Viento Terral / De Tierra al Mar):</strong> En Asturias (costa orientada al Norte), es el viento del <em>Sur, Suroeste o Sureste</em>. Frena la caída de la cresta, ahueca el labio formando <strong>tubos perfectos</strong> y deja la superficie lisa como un espejo (<em>efecto glassy</em>). ¡El viento soñado!</li>
            <li><strong>🔴 Onshore (Viento de Mar a Tierra):</strong> Viento del <em>Norte, Noroeste o Noreste</em>. Choca de frente contra la ola, la aplasta antes de tiempo y genera <em>chop</em> (mar picado, revuelto y lleno de espuma desordenada).</li>
            <li><strong>🟡 Cross-shore (Viento Lateral):</strong> Viento de <em>Este u Oeste</em> que recorre la orilla de lado, barriendo las olas y creando corrientes laterales de arrastre.</li>
            <li><strong>✨ Glassy (Calma Total):</strong> Viento casi nulo (< 8 km/h). El agua parece una pista de hielo y las olas rompen limpias y cristalinas.</li>
          </ul>
        `
      },
      {
        icon: '🔄',
        heading: '2. ¿Cómo se define Surfear de Izquierdas o de Derechas?',
        text: `
          La dirección se mide siempre <strong>desde la perspectiva del surfista que rema la ola y mira hacia la orilla</strong>:
          <ul class="explain-list">
            <li><strong>⬅️ Ola de Izquierdas:</strong> La pared de la ola rompe abriendo hacia la izquierda del surfista (vista desde la arena de la playa abre hacia tu derecha).</li>
            <li><strong>➡️ Ola de Derechas:</strong> La pared rompe abriendo hacia la derecha del surfista (vista desde la arena abre hacia tu izquierda).</li>
            <li><strong>↔️ Pico (A-Frame / Dos Aguas):</strong> La ola rompe en el centro exacto y abre pared simultáneamente a izquierda y derecha, permitiendo a dos surfistas cogerla a la vez en direcciones opuestas.</li>
            <li><strong>🚫 Cerrote (Close-out):</strong> La ola rompe entera de golpe en toda su longitud a la vez, sin permitir surfear la pared.</li>
          </ul>
        `
      },
      {
        icon: '🪨',
        heading: '3. Fondos Marinos: Arena (Beach Break) vs Roca (Reef Break)',
        text: `
          <ul class="explain-list">
            <li><strong>🏖️ Fondo de Arena (Beach Break):</strong> (Ej. <em>Salinas, San Lorenzo, Xagó, Vega</em>). Las olas rompen sobre barras de arena móviles que cambian según las mareas y temporales. Olas dinámicas y caídas más seguras.</li>
            <li><strong>🪨 Fondo de Roca / Arrecife (Point & Reef Break):</strong> (Ej. <em>El Mongol</em> en Gijón, puntas de Verdicio, Tapia). La ola rompe con trayectoria geométrica fija y consistente sobre losa de roca, exigiendo mayor nivel.</li>
            <li><strong>🪨🏖️ Fondo Mixto:</strong> Combinación de barras de arena con arrecifes o lajas rocosas en los extremos.</li>
          </ul>
        `
      },
      {
        icon: '⛰️',
        heading: '4. El Relieve de Asturias y la Orientación de Playas (El Efecto Cabo Peñas)',
        text: `
          Asturias no es una línea recta que mire al Norte franco; sus cabos, rías y ensenadas cambian la dirección de cada playa:
          <ul class="explain-list">
            <li><strong>El Ejemplo Clásico de Xagó vs Candás / Luanco:</strong> Con viento del <em>Oeste (Poniente)</em>, en la playa de <strong>Xagó (Gozón)</strong> el viento entra de frente desde el mar porque el arenal mira al Oeste/Noroeste, siendo <strong>🔴 Onshore (mar picado/chop)</strong>. Sin embargo, ese mismo viento de Poniente al otro lado de la península de Peñas en <strong>Candás (Carreño)</strong> o <strong>Luanco</strong> baja desde tierra hacia el mar saliendo hacia el Este, siendo <strong>🟢 Offshore (terral / aguas mansas y limpias)</strong>.</li>
            <li><strong>La Barra de Rodiles (Villaviciosa):</strong> Encajada en la ría mirando al NNW; con viento del <em>Suroeste / Sur</em> el monte Rodiles canaliza el viento desde tierra dejándola con un terral tubular perfecto.</li>
            <li><strong>Consejo de Surfista Local:</strong> Si en tu playa habitual entra viento de mar picado (Onshore), busca un arenal cercano al otro lado de un cabo o con orientación resguardada.</li>
          </ul>
        `
      },
      {
        icon: '📍',
        heading: '5. Picos Legendarios de Asturias',
        text: `
          <ul class="explain-list">
            <li><strong>Villaviciosa (Rodiles):</strong> <em>La Barra de Rodiles</em>, mítica izquierda tubular de fama mundial en la ría + picos del arenal.</li>
            <li><strong>Castrillón (Salinas / Espartal):</strong> <em>El Balneario</em>, <em>Las Dunas</em> y <em>El Espartal</em> (consistencia diaria).</li>
            <li><strong>Gijón (San Lorenzo & Peñarrubia):</strong> <em>Escalera 4</em>, <em>Escalera 10 (Piles)</em>, <em>El Peñón</em> y la potente derecha sobre losa de <em>El Mongol</em>.</li>
            <li><strong>Gozón (Xagó & Verdicio):</strong> <em>El Escamplero</em> y <em>La Duna</em>, picos consistentes con poco mar.</li>
            <li><strong>Tapia de Casariego:</strong> Cuna del surf cantábrico (<em>La Grande</em>, <em>La Muralla</em> y <em>Los Campos</em>).</li>
          </ul>
        `
      },
      {
        icon: '⏱️',
        heading: '6. El Período de Oleaje (Swell en Segundos)',
        text: 'El período es el tiempo que pasa entre el paso de dos crestas consecutivas de olas. Un período de <strong>10 a 15+ segundos</strong> indica <em>mar de fondo potente y ordenado</em> generado por borrascas lejanas en el Atlántico Norte. Un período corto (< 8 segundos) indica mar de viento local y desordenado.'
      }
    ]
  },

  tides: {
    icon: '🌊',
    title: '¿Cómo entender el Coeficiente y las Mareas?',
    subtitle: 'Aprende qué mide el coeficiente, mareas vivas vs muertas y su impacto en las playas de Asturias',
    badge: 'Escala 20 a 118 en el Cantábrico • Pleamar vs Bajamar',
    sections: [
      {
        icon: '📐',
        heading: '1. ¿Qué es el Coeficiente de Marea?',
        text: 'El coeficiente expresa la <strong>amplitud prevista de la marea</strong> (la diferencia de altura en metros entre la bajamar y la pleamar sucesivas). En el mar Cantábrico oscila entre <strong>20</strong> (mínima amplitud) y <strong>118</strong> (máxima amplitud astronómica posible).'
      },
      {
        icon: '🔴',
        heading: '2. Mareas Vivas y "Mareonas" (Coeficiente 85 a 118)',
        text: `
          Ocurren cuando el Sol, la Luna y la Tierra están alineados (en <strong>Luna Llena y Luna Nueva</strong>), sumando sus fuerzas gravitatorias (<em>mareas de sicigia</em>):
          <ul class="explain-list">
            <li><strong>En Pleamar (Marea Alta):</strong> El mar sube con enorme fuerza, cubriendo casi por completo la arena en calas estrechas y acantilados.</li>
            <li><strong>En Bajamar (Marea Baja):</strong> El agua se retira cientos de metros mar adentro, dejando al descubierto inmensas explanadas de arena, lajas de roca y bancos de marisqueo.</li>
            <li><strong>⚠️ Precaución:</strong> Las corrientes de vaciante y llenante en rías y rompientes son mucho más rápidas e intensas.</li>
          </ul>
        `
      },
      {
        icon: '🟢',
        heading: '3. Mareas Muertas (Coeficiente 20 a 64)',
        text: `
          Ocurren cuando el Sol y la Luna forman un ángulo de 90° respecto a la Tierra (en <strong>Cuarto Creciente y Cuarto Menguante</strong>), contrarrestando sus atracciones (<em>mareas de cuadratura</em>):
          <ul class="explain-list">
            <li>La diferencia entre pleamar y bajamar es <strong>mínima</strong>.</li>
            <li>El mar apenas avanza al subir ni se retira al bajar; la línea de orilla se mantiene muy estable durante todo el día.</li>
            <li>Ideal para baño tranquilo y fondeo de embarcaciones.</li>
          </ul>
        `
      },
      {
        icon: '🟡',
        heading: '4. Mareas Medias (Coeficiente 65 a 84)',
        text: 'Representan el régimen intermedio y equilibrado del Cantábrico, con oscilación normal de agua y corrientes moderadas.'
      },
      {
        icon: '🏖️',
        heading: 'Astucia y Seguridad en las Playas de Asturias',
        text: `
          <ul class="explain-list">
            <li><strong>Calas encajadas (Gulpiyuri, Poo, Peñarrubia, Cuevas del Mar):</strong> Con coeficientes superiores a 90-100 en pleamar, ¡el agua llega a las paredes de roca y la playa seca desaparece por completo! Planifica tu visita hacia la media marea o bajamar.</li>
            <li><strong>Grandes arenales (Salinas, San Lorenzo, Rodiles, Xagó):</strong> En mareas vivas con bajamar se crean kilómetros de playa firme ideales para caminar y deportes en la arena.</li>
            <li><strong>Desembocaduras de rías (Villaviciosa, Navia, Ribadesella):</strong> Con coeficientes altos, el cambio de marea genera corrientes peligrosas de arrastre hacia mar abierto.</li>
          </ul>
        `
      }
    ]
  },

  surf_energy: {
    icon: '⚡',
    title: '¿Qué es la Energía de la Ola (kJ)?',
    subtitle: 'El indicador definitivo de fuerza, empuje y calidad de surf en la rompiente',
    badge: 'Energía (kJ) ∝ Swell² × Período',
    sections: [
      {
        icon: '🌊',
        heading: '1. ¿Por qué la altura en metros engaña?',
        text: 'Medir solo los metros de una ola no basta. Una ola de <strong>1,2 m con 14 segundos</strong> de período desplaza una masa inmensa de agua a gran velocidad con paredes tubulares. En cambio, una ola de <strong>1,8 m con 6 segundos</strong> es mar de viento débil, fofo y revuelto. La <strong>Energía de la Ola (en kiloJulios, kJ)</strong> combina ambos factores para medir el empuje real en la rompiente.'
      },
      {
        icon: '📊',
        heading: '2. Escala de Potencia y Zona de Confort',
        text: `
          <ul class="explain-list">
            <li><strong>🟢 50 a 200 kJ (Suave / Iniciación / Poca Fuerza):</strong> Olas dóciles con poco empuje. Ideal para escuelas de surf, principiantes o tablas tipo Longboard y Foam.</li>
            <li><strong>🟡 200 a 500 kJ (Divertida / Óptima):</strong> La zona dulce para la mayoría de surfistas. Olas con buen empuje para acelerar y hacer maniobras con tabla corta (shortboard) o evolutiva.</li>
            <li><strong>🟠 500 a 1.200 kJ (Potente / Consistente):</strong> Mucha masa de agua y velocidad. Olas huecas, secciones tubulares y fondos que rompen con decisión. Exige remada y nivel intermedio-avanzado.</li>
            <li><strong>🔴 > 1.200 kJ (Pesada / Solo Expertos):</strong> Rompientes mayores, fondos de roca exigentes o temporales cantábricos de gran calibre. Precaución con corrientes de fondo.</li>
          </ul>
        `
      },
      {
        icon: '🧮',
        heading: '3. La Física del Mar: ¿Cómo se calcula?',
        text: 'La física oceanográfica demuestra que la energía es proporcional al <strong>cuadrado de la altura del mar de fondo ($H_{\\text{swell}}^2$) multiplicado por el período ($T$)</strong>. Duplicar la altura cuadruplica la fuerza del impacto, y un período largo compacta la energía en trenes de olas muy organizados.'
      },
      {
        icon: '🌊',
        heading: '4. Multi-Swell y Energía Combinada Total',
        text: 'En el océano a menudo coexisten <strong>dos o más trenes de olas simultáneos</strong> (ej. un <em>Swell Primario</em> del NW de borrascas lejanas y un <em>Swell Secundario</em> del WNW o Norte). Siguiendo el estándar de <em>Surf-Forecast</em>, la <strong>Energía Combinada Total</strong> suma la potencia de ambos trenes ($E_{\\text{total}} = E_1 + E_2$), ofreciendo una radiografía exacta del empuje total que llega a la orilla.'
      },
      {
        icon: '🏄‍♂️',
        heading: 'Astucia en los Picos de Asturias',
        text: `
          <ul class="explain-list">
            <li><strong>Salinas y San Lorenzo:</strong> Con 200-450 kJ y viento Offshore (Sur), los arenales ofrecen picos constantes de izquierda y derecha en casi cualquier marea.</li>
            <li><strong>La Barra de Rodiles:</strong> Suele necesitar más de <strong>400-700 kJ</strong> y período > 12s con marea bajando para que la mítica izquierda rompa con su característico tubo a lo largo de la ría.</li>
            <li><strong>Días de poco mar (< 150 kJ):</strong> Aprovecha arenales expuestos y abiertos como <strong>Xagó o Verdicio</strong>, que exprimen cualquier rastro de energía atlántica.</li>
          </ul>
        `
      }
    ]
  },

  waves: {
    icon: '🌊',
    title: '¿Cómo entender la Altura del Oleaje y el Estado de la Mar?',
    subtitle: 'Aprende qué es la altura significativa, mar de fondo vs mar de viento y la escala Douglas',
    badge: 'Altura Significativa (Hs) • Swell vs Chop • Escala Douglas',
    sections: [
      {
        icon: '📏',
        heading: '1. ¿Qué es la Altura Significativa (Hs)?',
        text: 'La altura que ves (ej. 1,5 m) es la <strong>Altura Significativa ($H_s$)</strong>: el promedio del tercio más alto ($1/3$) de todas las olas observadas. <em>¡Ojo!</em> Esto significa que <strong>1 de cada 10 olas puede ser hasta un 30% más grande</strong> que el valor medio indicado, y olas aisladas pueden alcanzar casi el doble.'
      },
      {
        icon: '🌊',
        heading: '2. Mar de Fondo (Swell) vs Mar de Viento (Chop)',
        text: `
          <ul class="explain-list">
            <li><strong>🌊 Mar de Fondo (Swell):</strong> Olas limpias, regulares y organizadas en largas series continuas. Se generaron hace días a miles de kilómetros por profundas borrascas atlánticas y viajan intactas. Es el mar noble y buscado para surfear y navegar.</li>
            <li><strong>💨 Mar de Viento (Wind Waves / Chop):</strong> Olas cortas, picadas, desordenadas y con espuma blanca provocadas por el viento local que sopla en ese instante sobre la costa cantábrica.</li>
          </ul>
        `
      },
      {
        icon: '⚓',
        heading: '3. Escala Douglas (Estado de la Mar)',
        text: `
          <ul class="explain-list">
            <li><strong>Grado 0 (Mar Llana):</strong> 0 m de altura. Mar espejo.</li>
            <li><strong>Grado 1 (Mar Rizada):</strong> 0 a 0,1 m. Pequeñas ondulaciones sin crestas.</li>
            <li><strong>Grado 2 (Marejadilla):</strong> 0,1 a 0,5 m. Olas cortas y bien formadas.</li>
            <li><strong>Grado 3 (Marejada):</strong> 0,5 a 1,25 m. Olas moderadas con algunos borreguillos blancos.</li>
            <li><strong>Grado 4 (Fuerte Marejada):</strong> 1,25 a 2,5 m. Olas más largas y numerosas crestas de espuma.</li>
            <li><strong>Grado 5 (Gruesa):</strong> 2,5 a 4,0 m. Mar imponente con rociones continuos.</li>
            <li><strong>Grado 6+ (Muy Gruesa a Arbolada):</strong> > 4,0 m. Temporal cantábrico mayor.</li>
          </ul>
        `
      },
      {
        icon: '🛡️',
        heading: 'Astucia y Seguridad en la Costa de Asturias',
        text: `
          <ul class="explain-list">
            <li><strong>En pedreros y acantilados (Peñas, Tazones, Vidio):</strong> Nunca des la espalda al mar; los trenes de series mayores de fondo pueden subir de golpe varios metros sobre la roca seca.</li>
            <li><strong>En arenales:</strong> Con más de 1,5 metros (Marejada/Fuerte Marejada), las corrientes de resaca (canales de retorno) se multiplican cerca de las orillas.</li>
          </ul>
        `
      }
    ]
  },

  swell: {
    icon: '⏱️',
    title: '¿Qué es el Período y la Dirección del Swell?',
    subtitle: 'El tiempo entre olas, la dirección de llegada y su impacto en la rompiente',
    badge: 'Período en Segundos (T) • Rumbo del Swell (NW, WNW, N) • Refracción',
    sections: [
      {
        icon: '⏱️',
        heading: '1. El Período de Oleaje (T en Segundos)',
        text: `
          El período es el tiempo en segundos que tarda en pasar una ola y la siguiente por un punto fijo:
          <ul class="explain-list">
            <li><strong>🟢 Período Largo (11 a 16+ segundos):</strong> Procede de borrascas lejanas atlánticas. Las olas viajan compactadas en trenes muy ordenados, con inmensa masa de agua en movimiento a gran velocidad subacuática. Al llegar a la playa levantan paredes limpias, potentes y tubulares.</li>
            <li><strong>🟡 Período Medio (8 a 10 segundos):</strong> Frecuencia habitual cantábrica. Olas consistentes con ritmo ágil de rompiente.</li>
            <li><strong>🔴 Período Corto (< 7-8 segundos):</strong> Típico mar de viento local. Olas fofas, apelmazadas y sin empuje submarino.</li>
          </ul>
        `
      },
      {
        icon: '🧭',
        heading: '2. Dirección del Swell en Asturias (NW, WNW, N)',
        text: `
          <ul class="explain-list">
            <li><strong>Noroeste (NW / WNW):</strong> La dirección reina en el Cantábrico (el 80% de los temporales atlánticos entran desde este cuadrante). Entra con total franqueza y potencia a las costas de Asturias.</li>
            <li><strong>Norte (N):</strong> Entra perpendicular de lleno en todos los arenales abiertos septentrionales.</li>
            <li><strong>Oeste / Poniente (W):</strong> Requiere refracción al rodear cabos salientes como Peñas, Lastres o Busto para entrar en las bahías orientadas al este.</li>
          </ul>
        `
      },
      {
        icon: '🏖️',
        heading: '3. Refracción Marina y Geografía de la Costa',
        text: 'Cuando el tren de olas entra en aguas poco profundas, la parte de la ola que toca antes el fondo submarino se frena, haciendo que la cresta gire (<strong>refracción</strong>) adaptándose a la silueta de la costa. Por eso playas resguardadas como <em>Luanco, Candás o San Lorenzo</em> pueden recibir olas perfectamente ordenadas aunque el oleaje en mar abierto sea de Noroeste.'
      }
    ]
  }
};

/**
 * Genera el HTML completo para el modal didáctico
 */
export function getExplanationHtml(topicKey) {
  const topic = WEATHER_EXPLANATIONS[topicKey] || WEATHER_EXPLANATIONS.barometer;

  return `
    <div class="explain-content-wrapper">
      <div class="explain-top-badge-row">
        <span class="explain-icon-large">${topic.icon}</span>
        <div class="explain-badge-tag">${topic.badge}</div>
      </div>

      <div class="explain-sections-list">
        ${topic.sections.map(sec => `
          <div class="explain-card-block">
            <h4 class="explain-block-title">${sec.icon} ${sec.heading}</h4>
            <div class="explain-block-text">${sec.text}</div>
          </div>
        `).join('')}
      </div>

      <div class="explain-footer-note">
        💡 <em>MeteoAstur Lode • Divulgación y meteorología práctica asturiana</em>
      </div>
    </div>
  `;
}
