/**
 * Catálogo Oficial de Iconos Vectoriales SVG "Estilu Asturianu" Auténtico
 * Incorpora elementos culturales y geográficos reales de Asturias:
 * - Soleyeru con Trisquel solar celta
 * - Borrina con silueta de Hórreo tradicional (pegollos y muelas)
 * - Orbayu con Manzana de Sidra de la pumarada
 * - Bastinazu y Tormenta sobre el Faro del Cabo Peñas
 * - Nevadona sobre el Picu Urriellu (Naranjo de Bulnes)
 * - Noche con Cruz de la Victoria y estrellas sobre el Cantábrico
 */

export function getAsturWeatherSvg(iconKey, size = 32) {
  const sz = parseInt(size, 10) || 32;

  switch (iconKey) {
    case 'clear-day':
    case 'sun':
      // ☀️ SOLEYERU CON TRISQUEL CELTA ASTURIANO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-sun" aria-label="Soleyeru con Trisquel">
          <!-- Corona de Rayos Solares -->
          <g stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round">
            <line x1="24" y1="3" x2="24" y2="8" />
            <line x1="24" y1="40" x2="24" y2="45" />
            <line x1="3" y1="24" x2="8" y2="24" />
            <line x1="40" y1="24" x2="45" y2="24" />
            <line x1="9" y1="9" x2="13" y2="13" />
            <line x1="35" y1="35" x2="39" y2="39" />
            <line x1="9" y1="39" x2="13" y2="35" />
            <line x1="35" y1="9" x2="39" y2="13" />
          </g>
          <!-- Disco Solar Oro -->
          <circle cx="24" cy="24" r="14" fill="#facc15" stroke="#eab308" stroke-width="2" />
          <!-- Trisquel Solar Celta Grabado en Oro Viejo -->
          <path d="M 24,24 C 24,18 29,15 31,18 C 33,21 29,25 24,24 Z" fill="#ca8a04" opacity="0.9" />
          <path d="M 24,24 C 18,24 15,29 18,31 C 21,33 25,29 24,24 Z" fill="#ca8a04" opacity="0.9" />
          <path d="M 24,24 C 24,30 19,33 17,30 C 15,27 19,23 24,24 Z" fill="#ca8a04" opacity="0.9" />
          <circle cx="24" cy="24" r="2.5" fill="#fef08a" />
        </svg>
      `;

    case 'clear-night':
    case 'moon':
      // 🌙 NOCHE ESTRELLADA CON CRUZ DE LA VICTORIA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-moon" aria-label="Noche con Cruz de la Victoria">
          <!-- Luna Creciente Azul Plata -->
          <path d="M 33,26 A 15,15 0 0 1 18,8 A 15,15 0 1 0 33,26 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.8" />
          <!-- Estrellas en el Cielo de la Cordillera -->
          <circle cx="36" cy="10" r="2" fill="#fef08a" />
          <circle cx="42" cy="20" r="1.4" fill="#fef08a" />
          <circle cx="28" cy="4" r="1.4" fill="#fef08a" />
          <!-- Silueta de la Cruz de la Victoria en Oro -->
          <g fill="#facc15" stroke="#ca8a04" stroke-width="0.8">
            <!-- Brazo Vertical -->
            <rect x="29" y="27" width="3" height="15" rx="0.5" />
            <!-- Brazo Horizontal -->
            <rect x="24" y="31" width="13" height="3" rx="0.5" />
            <!-- Gemas en los extremos -->
            <circle cx="24" cy="32.5" r="1.8" fill="#ef4444" />
            <circle cx="37" cy="32.5" r="1.8" fill="#ef4444" />
            <circle cx="30.5" cy="27" r="1.8" fill="#ef4444" />
          </g>
        </svg>
      `;

    case 'mostly-clear-day':
    case 'partly-cloudy-day':
    case 'cloud-sun':
      // ⛅ INTERVALOS: SOL CON TRISQUEL Y NUBE DE VALLE
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-cloud-sun" aria-label="Sol y Nubes de Valle">
          <!-- Sol Naciente con Rayos -->
          <g stroke="#f59e0b" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="4" x2="18" y2="8" />
            <line x1="5" y1="17" x2="9" y2="17" />
            <line x1="8" y1="8" x2="11" y2="11" />
            <line x1="28" y1="8" x2="25" y2="11" />
          </g>
          <circle cx="18" cy="17" r="9" fill="#facc15" stroke="#eab308" stroke-width="1.5" />
          <circle cx="18" cy="17" r="3" fill="#ca8a04" opacity="0.8" />
          <!-- Nube de Pizarra Asturiana -->
          <path d="M 38,38 H 16 A 8,8 0 0 1 14.5,22.2 A 11,11 0 0 1 35.5,23.5 A 7.5,7.5 0 0 1 38,38 Z" fill="#64748b" />
          <path d="M 36,36 H 17 A 6.5,6.5 0 0 1 15.5,23.5 A 9.5,9.5 0 0 1 34.5,24.5 A 6,6 0 0 1 36,36 Z" fill="#94a3b8" />
        </svg>
      `;

    case 'mostly-clear-night':
    case 'partly-cloudy-night':
    case 'cloud-moon':
      // ☁️🌙 NOCHE CON NUBES SOBRE EL CANTÁBRICO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-cloud-moon" aria-label="Noche con Nubes">
          <!-- Luna Azulada -->
          <path d="M 28,19 A 9,9 0 0 1 18,6 A 9,9 0 1 0 28,19 Z" fill="#38bdf8" />
          <circle cx="32" cy="8" r="1.5" fill="#fef08a" />
          <!-- Nube Oscura de Noche -->
          <path d="M 38,38 H 16 A 8,8 0 0 1 14.5,22.2 A 11,11 0 0 1 35.5,23.5 A 7.5,7.5 0 0 1 38,38 Z" fill="#334155" />
          <path d="M 36,36 H 17 A 6.5,6.5 0 0 1 15.5,23.5 A 9.5,9.5 0 0 1 34.5,24.5 A 6,6 0 0 1 36,36 Z" fill="#64748b" />
        </svg>
      `;

    case 'cloudy':
    case 'cloud':
      // ☁️ NUBLAU / CUBIERTU: NUBES DE PIZARRA Y RELIEVE ASTURIANO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-cloud" aria-label="Nublado Asturiano">
          <path d="M 40,38 H 14 A 10,10 0 0 1 12.2,18.2 A 13,13 0 0 1 37.5,19.5 A 9,9 0 0 1 40,38 Z" fill="#475569" />
          <path d="M 38,36 H 15.5 A 8,8 0 0 1 14,20 A 11,11 0 0 1 35.5,21 A 7.5,7.5 0 0 1 38,36 Z" fill="#94a3b8" />
          <!-- Toque de montaña sutil en la base -->
          <polygon points="10,38 18,28 26,38" fill="#1e293b" opacity="0.6" />
          <polygon points="22,38 30,26 38,38" fill="#1e293b" opacity="0.6" />
        </svg>
      `;

    case 'fog':
    case 'borrina':
      // 🌫️ LA BORRINA CON SILUETA DE HÓRREO TRADICIONAL
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-fog" aria-label="La Borrina con Hórreo">
          <!-- Silueta de Hórreo Asturiano Tradicional -->
          <g fill="#94a3b8" stroke="#475569" stroke-width="1">
            <!-- Tejado a 4 aguas -->
            <polygon points="24,6 10,16 38,16" fill="#b45309" stroke="#78350f" />
            <!-- Caja de madera del Hórreo (Cámara) -->
            <rect x="13" y="16" width="22" height="11" fill="#d97706" stroke="#92400e" />
            <line x1="24" y1="16" x2="24" y2="27" stroke="#78350f" stroke-width="1.5" />
            <!-- Muelas de Piedra (Tornarratas circulares) -->
            <ellipse cx="17" cy="28" rx="4" ry="1.5" fill="#e2e8f0" />
            <ellipse cx="31" cy="28" rx="4" ry="1.5" fill="#e2e8f0" />
            <!-- Pegollos (Pilares de madera/piedra) -->
            <polygon points="15.5,29.5 18.5,29.5 19,38 15,38" fill="#94a3b8" />
            <polygon points="29.5,29.5 32.5,29.5 33,38 29,38" fill="#94a3b8" />
          </g>
          <!-- Capas de Borrina / Niebla Flotante -->
          <line x1="4" y1="20" x2="44" y2="20" stroke="#f1f5f9" stroke-width="3" stroke-linecap="round" opacity="0.85" />
          <line x1="8" y1="27" x2="40" y2="27" stroke="#cbd5e1" stroke-width="3.2" stroke-linecap="round" opacity="0.9" />
          <line x1="4" y1="34" x2="44" y2="34" stroke="#f1f5f9" stroke-width="3.5" stroke-linecap="round" opacity="0.95" />
          <line x1="10" y1="41" x2="38" y2="41" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" opacity="0.9" />
        </svg>
      `;

    case 'drizzle':
    case 'orbayu':
      // 🌦️ L'ORBAYU CON MANZANA DE SIDRA (PUMARADA)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-orbayu" aria-label="L'Orbayu con Manzana de Sidra">
          <!-- Nube de Orbayu -->
          <path d="M 38,22 H 14 A 7,7 0 0 1 12.5,8 A 9.5,9.5 0 0 1 32,8.5 A 6.5,6.5 0 0 1 38,22 Z" fill="#64748b" />
          <!-- Gotitas finas de Orbayu en diagonal -->
          <line x1="13" y1="25" x2="10" y2="30" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
          <line x1="21" y1="25" x2="18" y2="30" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
          <line x1="29" y1="25" x2="26" y2="30" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
          <line x1="17" y1="33" x2="14" y2="38" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" />
          <!-- Manzana de Sidra Asturiana Verde Brillante -->
          <g transform="translate(24, 26)">
            <!-- Rabillo y Hoja Verde -->
            <path d="M 10,4 Q 12,0 15,-1" stroke="#78350f" stroke-width="1.8" fill="none" stroke-linecap="round" />
            <path d="M 13,0 Q 18,-2 17,3 Z" fill="#22c55e" />
            <!-- Cuerpo de la Manzana -->
            <path d="M 4,7 C 0,4 -2,12 2,16 C 5,19 8,18 10,17 C 12,18 15,19 18,16 C 22,12 20,4 16,7 C 13,9 11,5 10,5 C 9,5 7,9 4,7 Z" fill="#84cc16" stroke="#4d7c0f" stroke-width="1.2" />
            <ellipse cx="6.5" cy="9" rx="1.5" ry="3" fill="#bef264" transform="rotate(-20 6.5 9)" />
          </g>
        </svg>
      `;

    case 'rain':
    case 'rain-moderate':
      // 🌧️ LLUVIA CANTÁBRICA CON SILUETA DEL CABO PEÑAS
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-rain" aria-label="Lluvia Cantábrica y Acantilado">
          <!-- Nube de Lluvia Intensa -->
          <path d="M 42,20 H 12 A 8,8 0 0 1 10.5,4 A 11,11 0 0 1 35.5,5 A 7.5,7.5 0 0 1 42,20 Z" fill="#475569" />
          <!-- Lluvia Continua Diagonal -->
          <line x1="12" y1="24" x2="8" y2="34" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
          <line x1="20" y1="24" x2="16" y2="34" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
          <line x1="28" y1="24" x2="24" y2="34" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
          <!-- Silueta del Acantilado y Olas del Mar -->
          <polygon points="26,45 32,30 46,45" fill="#334155" />
          <path d="M 2,44 Q 10,40 18,44 T 34,44 T 46,44" stroke="#38bdf8" stroke-width="2.5" fill="none" />
        </svg>
      `;

    case 'heavy-rain':
    case 'storm':
      // ⛈️ EL BASTINAZU: TORMENTA, RAYO ORO Y FARO DEL CABO PEÑAS
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-storm" aria-label="Bastinazu con Faro de Peñas">
          <!-- Nube Negra de Tormenta -->
          <path d="M 42,19 H 10 A 8.5,8.5 0 0 1 8.5,2 A 12,12 0 0 1 36,3 A 8,8 0 0 1 42,19 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.5" />
          <!-- Gran Rayo de Oro Victoria en Zigzag -->
          <polygon points="24,14 16,26 23,26 18,39 32,23 25,23" fill="#facc15" stroke="#ca8a04" stroke-width="1.2" />
          <!-- Lluvia Torrencial -->
          <line x1="10" y1="24" x2="6" y2="33" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
          <line x1="36" y1="24" x2="32" y2="33" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
          <!-- Faro del Cabo Peñas en la esquina -->
          <g transform="translate(32, 28)">
            <!-- Torre del Faro -->
            <polygon points="5,17 7,4 11,4 13,17" fill="#f8fafc" stroke="#334155" stroke-width="0.8" />
            <rect x="7" y="7" width="4" height="3" fill="#ef4444" />
            <!-- Cúpula y Luz -->
            <rect x="6.5" y="2" width="5" height="3" fill="#facc15" />
            <circle cx="9" cy="3.5" r="1" fill="#fef08a" />
          </g>
        </svg>
      `;

    case 'snow':
    case 'nevadona':
      // ❄️ LA NEVADONA SOBRE EL PICU URRIELLU (NARANJO DE BULNES)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-snow" aria-label="Nevadona en el Urriellu">
          <!-- Silueta Majestuosa del Picu Urriellu (Naranjo de Bulnes) -->
          <polygon points="24,14 10,42 38,42" fill="#64748b" stroke="#334155" stroke-width="1.5" />
          <polygon points="24,14 18,24 24,22 30,25" fill="#f8fafc" />
          <polygon points="18,24 14,42 22,42 24,32" fill="#475569" />
          <polygon points="24,22 24,32 32,42 38,42 30,25" fill="#94a3b8" />
          <!-- Copos de Nieve de la Cordillera -->
          <g stroke="#ffffff" stroke-width="2" stroke-linecap="round">
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="36" y1="8" x2="36" y2="16" />
            <line x1="32" y1="12" x2="40" y2="12" />
            <line x1="24" y1="2" x2="24" y2="8" />
          </g>
          <circle cx="18" cy="18" r="1.5" fill="#ffffff" />
          <circle cx="30" cy="18" r="1.5" fill="#ffffff" />
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-cloud" aria-label="Nublado">
          <path d="M 38,36 H 14 A 8,8 0 0 1 12.5,20 A 11,11 0 0 1 35.5,21 A 7.5,7.5 0 0 1 38,36 Z" fill="#94a3b8" />
        </svg>
      `;
  }
}
