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
