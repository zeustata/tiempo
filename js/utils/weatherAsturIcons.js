/**
 * Catálogo Oficial de Iconos "Emojis Emotivos" (Estilo Cómic / Cartoon)
 * Personajes meteorológicos expresivos con ojos, boca, coloretes y personalidad divertida
 */

export function getAsturWeatherSvg(iconKey, size = 32) {
  const sz = parseInt(size, 10) || 32;

  switch (iconKey) {
    case 'clear-day':
    case 'sun':
      // ☀️ EL SOL SUPER FELIZ (OJOS BRILLANTES, COLORETES Y GRAN SONRISA)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-sun" aria-label="Sol Feliz Cómic">
          <!-- Rayos redondeados juguetones -->
          <g fill="#f59e0b" stroke="#d97706" stroke-width="1">
            <rect x="22" y="2" width="4" height="6" rx="2" />
            <rect x="22" y="40" width="4" height="6" rx="2" />
            <rect x="2" y="22" width="6" height="4" rx="2" />
            <rect x="40" y="22" width="6" height="4" rx="2" />
            <rect x="7" y="8" width="5" height="5" rx="2" transform="rotate(45 9.5 10.5)" />
            <rect x="33" y="34" width="5" height="5" rx="2" transform="rotate(45 35.5 36.5)" />
            <rect x="7" y="34" width="5" height="5" rx="2" transform="rotate(-45 9.5 36.5)" />
            <rect x="33" y="8" width="5" height="5" rx="2" transform="rotate(-45 35.5 10.5)" />
          </g>
          <!-- Cuerpo del Sol Dorado -->
          <circle cx="24" cy="24" r="14" fill="#facc15" stroke="#ca8a04" stroke-width="1.8" />
          <!-- Coloretes Rosados Tiernos -->
          <ellipse cx="16" cy="27" rx="3" ry="1.8" fill="#fb7185" opacity="0.85" />
          <ellipse cx="32" cy="27" rx="3" ry="1.8" fill="#fb7185" opacity="0.85" />
          <!-- Ojos Grandes de Cómic -->
          <ellipse cx="18" cy="21" rx="2.5" ry="3.5" fill="#1e293b" />
          <circle cx="17.2" cy="19.5" r="1.2" fill="#ffffff" />
          <circle cx="19" cy="22.5" r="0.6" fill="#ffffff" />
          <ellipse cx="30" cy="21" rx="2.5" ry="3.5" fill="#1e293b" />
          <circle cx="29.2" cy="19.5" r="1.2" fill="#ffffff" />
          <circle cx="31" cy="22.5" r="0.6" fill="#ffffff" />
          <!-- Gran Boca Sonriente con Lengua -->
          <path d="M 19,25 Q 24,32 29,25 Z" fill="#991b1b" />
          <path d="M 21.5,28 Q 24,32 26.5,28 Z" fill="#f43f5e" />
        </svg>
      `;

    case 'clear-night':
    case 'moon':
      // 🌙 LA LUNA DURMIENDO CON GORRO DE NOCHE Y "Zzz"
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-moon" aria-label="Luna Durmiente Cómic">
          <!-- Cuerpo de la Luna Creciente -->
          <path d="M 33,28 A 14,14 0 0 1 18,9 A 14,14 0 1 0 33,28 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5" />
          <!-- Colorete de Dormir -->
          <ellipse cx="16" cy="25" rx="2.5" ry="1.5" fill="#f472b6" opacity="0.8" />
          <!-- Ojo Feliz Cerrado Durmiendo -->
          <path d="M 13,20 Q 16,24 19,20" stroke="#0f172a" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <!-- Boquita Sonriente Dulce -->
          <path d="M 18,27 Q 21,30 24,27" stroke="#0f172a" stroke-width="1.5" fill="none" stroke-linecap="round" />
          <!-- Gorrito de Dormir a Rayas -->
          <g transform="translate(14, 2)">
            <path d="M 4,14 Q 12,2 26,6 Q 18,12 8,15 Z" fill="#ef4444" stroke="#991b1b" stroke-width="1" />
            <path d="M 8,11 Q 14,5 20,7" stroke="#ffffff" stroke-width="2.5" fill="none" />
            <!-- Borla del Gorro -->
            <circle cx="27" cy="7" r="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
          </g>
          <!-- Letras Zzz Tiernas -->
          <text x="33" y="16" font-family="'Comic Sans MS', cursive, sans-serif" font-size="9" font-weight="bold" fill="#fef08a">Z</text>
          <text x="39" y="10" font-family="'Comic Sans MS', cursive, sans-serif" font-size="7" font-weight="bold" fill="#fef08a">z</text>
        </svg>
      `;

    case 'partly-cloudy-day':
    case 'cloud-sun':
      // ⛅ SOL Y NUBE AMIGOS SALUDANDO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-cloud-sun" aria-label="Sol y Nube Amigos">
          <!-- Sol sonriente asomando -->
          <circle cx="18" cy="16" r="9" fill="#facc15" stroke="#eab308" stroke-width="1.5" />
          <ellipse cx="14" cy="14" rx="1.2" ry="1.8" fill="#1e293b" />
          <ellipse cx="20" cy="14" rx="1.2" ry="1.8" fill="#1e293b" />
          <path d="M 15,18 Q 17,21 19,18" stroke="#991b1b" stroke-width="1.2" fill="none" stroke-linecap="round" />
          <!-- Nube Esponjosa Tierna -->
          <path d="M 38,38 H 15 A 8,8 0 0 1 13.5,23 A 10.5,10.5 0 0 1 34.5,23.5 A 7.5,7.5 0 0 1 38,38 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.8" />
          <!-- Carita de la Nube -->
          <ellipse cx="21" cy="30" rx="1.8" ry="2.4" fill="#1e293b" />
          <circle cx="20.5" cy="29" r="0.8" fill="#ffffff" />
          <ellipse cx="30" cy="30" rx="1.8" ry="2.4" fill="#1e293b" />
          <circle cx="29.5" cy="29" r="0.8" fill="#ffffff" />
          <ellipse cx="17" cy="33" rx="2" ry="1.2" fill="#fb7185" opacity="0.8" />
          <ellipse cx="34" cy="33" rx="2" ry="1.2" fill="#fb7185" opacity="0.8" />
          <path d="M 23,32 Q 25.5,35 28,32" stroke="#1e293b" stroke-width="1.5" fill="none" stroke-linecap="round" />
        </svg>
      `;

    case 'partly-cloudy-night':
    case 'cloud-moon':
      // ☁️🌙 LUNA Y NUBE ABRAZADAS DURMIENDO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-cloud-moon" aria-label="Luna y Nube Noche">
          <!-- Luna tierna de fondo -->
          <path d="M 26,18 A 8.5,8.5 0 0 1 17,5 A 8.5,8.5 0 1 0 26,18 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2" />
          <!-- Nube de Noche Cálida -->
          <path d="M 38,38 H 15 A 8,8 0 0 1 13.5,23 A 10.5,10.5 0 0 1 34.5,23.5 A 7.5,7.5 0 0 1 38,38 Z" fill="#475569" stroke="#334155" stroke-width="1.8" />
          <!-- Carita Dormilona -->
          <path d="M 20,29 Q 22,32 24,29" stroke="#f8fafc" stroke-width="1.5" fill="none" stroke-linecap="round" />
          <path d="M 28,29 Q 30,32 32,29" stroke="#f8fafc" stroke-width="1.5" fill="none" stroke-linecap="round" />
          <ellipse cx="17" cy="32" rx="2" ry="1.2" fill="#f472b6" opacity="0.7" />
          <ellipse cx="34" cy="32" rx="2" ry="1.2" fill="#f472b6" opacity="0.7" />
          <path d="M 24,33 Q 26,36 28,33" stroke="#f8fafc" stroke-width="1.4" fill="none" stroke-linecap="round" />
        </svg>
      `;

    case 'cloudy':
    case 'cloud':
      // ☁️ LA NUBE GORDITA Y SONRIENTE
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-cloud" aria-label="Nube Feliz Cómic">
          <!-- Cuerpo Nube Esponjosa Blanca -->
          <path d="M 40,37 H 13 A 9,9 0 0 1 11.5,20 A 12,12 0 0 1 36.5,20.5 A 8.5,8.5 0 0 1 40,37 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
          <!-- Ojos Grandes con Brillo -->
          <ellipse cx="20" cy="27" rx="2.5" ry="3.2" fill="#1e293b" />
          <circle cx="19" cy="25.5" r="1.1" fill="#ffffff" />
          <ellipse cx="30" cy="27" rx="2.5" ry="3.2" fill="#1e293b" />
          <circle cx="29" cy="25.5" r="1.1" fill="#ffffff" />
          <!-- Coloretes Rosa Kawaii -->
          <ellipse cx="15" cy="31" rx="2.8" ry="1.8" fill="#fb7185" opacity="0.85" />
          <ellipse cx="35" cy="31" rx="2.8" ry="1.8" fill="#fb7185" opacity="0.85" />
          <!-- Sonrisa Feliz -->
          <path d="M 22,30 Q 25,35 28,30" stroke="#0f172a" stroke-width="1.8" fill="none" stroke-linecap="round" />
        </svg>
      `;

    case 'fog':
    case 'borrina':
      // 🌫️ LA NUBE JUGANDO AL ESCONDITE (CON GAFAS O MANITAS)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-fog" aria-label="Borrina Traviesa Cómic">
          <!-- Nube Flotante -->
          <path d="M 38,26 H 14 A 7,7 0 0 1 12.5,13 A 9.5,9.5 0 0 1 32,13.5 A 6.5,6.5 0 0 1 38,26 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.8" />
          <!-- Ojos asomando curiosos -->
          <ellipse cx="20" cy="18" rx="2.2" ry="2.8" fill="#1e293b" />
          <circle cx="19.2" cy="17" r="0.9" fill="#ffffff" />
          <ellipse cx="28" cy="18" rx="2.2" ry="2.8" fill="#1e293b" />
          <circle cx="27.2" cy="17" r="0.9" fill="#ffffff" />
          <ellipse cx="16" cy="21" rx="2" ry="1.2" fill="#fb7185" opacity="0.8" />
          <ellipse cx="32" cy="21" rx="2" ry="1.2" fill="#fb7185" opacity="0.8" />
          <path d="M 22,21 Q 24,23 26,21" stroke="#1e293b" stroke-width="1.4" fill="none" stroke-linecap="round" />
          <!-- Capas de Borrina Esponjosas con Bordes Redondeados -->
          <line x1="6" y1="30" x2="42" y2="30" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round" />
          <line x1="10" y1="36" x2="38" y2="36" stroke="#cbd5e1" stroke-width="3.5" stroke-linecap="round" />
          <line x1="8" y1="42" x2="34" y2="42" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
        </svg>
      `;

    case 'drizzle':
    case 'orbayu':
      // 🌦️ ORBAYU: NUBE CON GOTITAS BEBÉ SONRIENTES
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-orbayu" aria-label="Orbayu Divertido Cómic">
          <!-- Nube Dulce -->
          <path d="M 38,22 H 14 A 7,7 0 0 1 12.5,8 A 9.5,9.5 0 0 1 32,8.5 A 6.5,6.5 0 0 1 38,22 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.8" />
          <!-- Carita de la Nube -->
          <ellipse cx="20" cy="14" rx="1.8" ry="2.2" fill="#0369a1" />
          <ellipse cx="28" cy="14" rx="1.8" ry="2.2" fill="#0369a1" />
          <ellipse cx="16" cy="17" rx="1.8" ry="1" fill="#f472b6" opacity="0.8" />
          <ellipse cx="32" cy="17" rx="1.8" ry="1" fill="#f472b6" opacity="0.8" />
          <path d="M 22,17 Q 24,20 26,17" stroke="#0369a1" stroke-width="1.4" fill="none" stroke-linecap="round" />
          <!-- Gotita Bebé 1 con Carita -->
          <g transform="translate(13, 27)">
            <path d="M 4,0 C 4,0 0,6 0,8 C 0,10.2 1.8,12 4,12 C 6.2,12 8,10.2 8,8 C 8,6 4,0 4,0 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1" />
            <circle cx="3" cy="8" r="0.6" fill="#0f172a" />
            <circle cx="5" cy="8" r="0.6" fill="#0f172a" />
          </g>
          <!-- Gotita Bebé 2 -->
          <g transform="translate(27, 29)">
            <path d="M 4,0 C 4,0 0,6 0,8 C 0,10.2 1.8,12 4,12 C 6.2,12 8,10.2 8,8 C 8,6 4,0 4,0 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1" />
            <circle cx="3" cy="8" r="0.6" fill="#0f172a" />
            <circle cx="5" cy="8" r="0.6" fill="#0f172a" />
          </g>
        </svg>
      `;

    case 'rain':
    case 'rain-moderate':
      // 🌧️ LLUVIA: NUBE CONTENTA CON PARAGUAS DE COLORES
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-rain" aria-label="Lluvia Cómic">
          <!-- Nube de Lluvia -->
          <path d="M 40,24 H 13 A 8,8 0 0 1 11.5,9 A 11,11 0 0 1 35.5,9.5 A 7.5,7.5 0 0 1 40,24 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8" />
          <ellipse cx="20" cy="15" rx="2" ry="2.5" fill="#0369a1" />
          <ellipse cx="30" cy="15" rx="2" ry="2.5" fill="#0369a1" />
          <ellipse cx="16" cy="19" rx="2.2" ry="1.3" fill="#fb7185" opacity="0.8" />
          <ellipse cx="34" cy="19" rx="2.2" ry="1.3" fill="#fb7185" opacity="0.8" />
          <path d="M 23,19 Q 25,23 27,19" stroke="#0369a1" stroke-width="1.5" fill="none" stroke-linecap="round" />
          <!-- Gotas de lluvia alegres cayendo -->
          <g fill="#0284c7">
            <path d="M 12,28 C 12,28 9,33 9,35 A 3,3 0 0 0 15,35 C 15,33 12,28 12,28 Z" />
            <path d="M 24,30 C 24,30 21,35 21,37 A 3,3 0 0 0 27,37 C 27,35 24,30 24,30 Z" />
            <path d="M 36,28 C 36,28 33,33 33,35 A 3,3 0 0 0 39,35 C 39,33 36,28 36,28 Z" />
          </g>
        </svg>
      `;

    case 'heavy-rain':
    case 'storm':
      // ⛈️ TORMENTA GRUÑONA (NUBE ENFADADA DIVERTIDA CON RAYO)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-storm" aria-label="Tormenta Gruñona Cómic">
          <!-- Nube Oscura Gruñona -->
          <path d="M 40,24 H 12 A 8.5,8.5 0 0 1 10.5,8 A 12,12 0 0 1 35.5,8.5 A 8,8 0 0 1 40,24 Z" fill="#334155" stroke="#1e293b" stroke-width="2" />
          <!-- Cejas Enfadadas Graciosas -->
          <line x1="16" y1="12" x2="22" y2="15" stroke="#f8fafc" stroke-width="2" stroke-linecap="round" />
          <line x1="32" y1="12" x2="26" y2="15" stroke="#f8fafc" stroke-width="2" stroke-linecap="round" />
          <!-- Ojos Enfadados pero Cómicos -->
          <circle cx="19" cy="17" r="2.2" fill="#ffffff" />
          <circle cx="19.5" cy="17" r="1.1" fill="#0f172a" />
          <circle cx="29" cy="17" r="2.2" fill="#ffffff" />
          <circle cx="28.5" cy="17" r="1.1" fill="#0f172a" />
          <!-- Boca en Zigzag de Gruñón -->
          <path d="M 21,21 L 23,23 L 25,21 L 27,23" stroke="#f8fafc" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Gran Rayo de Oro Brillante -->
          <polygon points="24,24 16,36 23,36 19,46 33,32 26,32" fill="#facc15" stroke="#ca8a04" stroke-width="1.5" />
        </svg>
      `;

    case 'snow':
    case 'nevadona':
      // ❄️ LA NUBE CON GORRITO DE LANA Y COPOS SONRIENTES
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-snow" aria-label="Nube con Gorro de Nieve">
          <!-- Nube de Invierno -->
          <path d="M 40,34 H 13 A 8,8 0 0 1 11.5,19 A 11,11 0 0 1 35.5,19.5 A 7.5,7.5 0 0 1 40,34 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.8" />
          <!-- Gorrito de Lana con Pompón -->
          <g transform="translate(16, 3)">
            <path d="M 3,14 Q 8,4 18,10 Q 14,15 5,16 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.2" />
            <path d="M 4,14 L 18,10" stroke="#facc15" stroke-width="2.5" stroke-linecap="round" />
            <!-- Pompón -->
            <circle cx="3" cy="14" r="3.2" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
          </g>
          <!-- Carita Sonriente con Frío -->
          <ellipse cx="20" cy="25" rx="1.8" ry="2.4" fill="#1e293b" />
          <ellipse cx="30" cy="25" rx="1.8" ry="2.4" fill="#1e293b" />
          <ellipse cx="16" cy="28" rx="2.5" ry="1.5" fill="#67e8f9" opacity="0.8" />
          <ellipse cx="34" cy="28" rx="2.5" ry="1.5" fill="#67e8f9" opacity="0.8" />
          <path d="M 23,28 Q 25,31 27,28" stroke="#1e293b" stroke-width="1.4" fill="none" stroke-linecap="round" />
          <!-- Copos de Nieve Bonitos -->
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round">
            <line x1="12" y1="38" x2="12" y2="44" />
            <line x1="9" y1="41" x2="15" y2="41" />
            <line x1="26" y1="38" x2="26" y2="44" />
            <line x1="23" y1="41" x2="29" y2="41" />
            <line x1="38" y1="38" x2="38" y2="44" />
            <line x1="35" y1="41" x2="41" y2="41" />
          </g>
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-cloud" aria-label="Nube Feliz">
          <path d="M 40,37 H 13 A 9,9 0 0 1 11.5,20 A 12,12 0 0 1 36.5,20.5 A 8.5,8.5 0 0 1 40,37 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
          <circle cx="20" cy="27" r="2" fill="#1e293b" />
          <circle cx="30" cy="27" r="2" fill="#1e293b" />
          <path d="M 23,30 Q 25,33 27,30" stroke="#0f172a" stroke-width="1.5" fill="none" stroke-linecap="round" />
        </svg>
      `;
  }
}
