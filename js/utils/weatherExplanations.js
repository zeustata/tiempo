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
