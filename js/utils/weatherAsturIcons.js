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
    case 'mostly-clear-night':
    case 'moon':
      // 🌙 LA LUNA FELIZ DESPEJADA CON ESTRELLITAS BRILLANTES
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-moon" aria-label="Luna y Estrellas Cómic">
          <!-- Cuerpo de la Luna Creciente -->
          <path d="M 31,31 A 15,15 0 0 1 15,10 A 15,15 0 1 0 31,31 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.6" />
          <!-- Colorete tierno -->
          <ellipse cx="15" cy="27" rx="2.6" ry="1.6" fill="#f472b6" opacity="0.85" />
          <!-- Ojo Feliz Cómic (mirada tierna y despierta) -->
          <ellipse cx="16.5" cy="20.5" rx="2" ry="2.6" fill="#0f172a" />
          <circle cx="15.8" cy="19.3" r="0.9" fill="#ffffff" />
          <!-- Boquita Sonriente Dulce -->
          <path d="M 16,27 Q 19,30 22,27" stroke="#0f172a" stroke-width="1.5" fill="none" stroke-linecap="round" />
          <!-- Estrellita Principal Brillante (Dorada de 4 puntas) -->
          <path d="M 36,4 Q 36,10 42,10 Q 36,10 36,16 Q 36,10 30,10 Q 36,10 36,4 Z" fill="#facc15" stroke="#eab308" stroke-width="0.8" />
          <circle cx="36" cy="10" r="1.3" fill="#ffffff" />
          <!-- Estrellita Secundaria -->
          <path d="M 26,3 Q 26,6 29,6 Q 26,6 26,9 Q 26,6 23,6 Q 26,6 26,3 Z" fill="#fde047" stroke="#eab308" stroke-width="0.6" />
          <!-- Mini destello adicional en cielo nocturno -->
          <circle cx="41" cy="22" r="1.5" fill="#fde047" opacity="0.9" />
        </svg>
      `;

    case 'mostly-clear-day':
    case 'sun-small-cloud':
      // 🌤️ MAYORMENTE SOLEADO — Sol grande protagonista, nubecita pequeña en esquina inferior derecha
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-mostly-clear" aria-label="Mayormente Soleado Cómic">
          <!-- Rayos solares cortos y juguetones -->
          <g fill="#f59e0b" stroke="#d97706" stroke-width="1">
            <rect x="20" y="1" width="4" height="6" rx="2" />
            <rect x="20" y="38" width="4" height="5" rx="2" />
            <rect x="1" y="20" width="6" height="4" rx="2" />
            <rect x="37" y="20" width="6" height="4" rx="2" />
            <rect x="5" y="6" width="4.5" height="4.5" rx="2" transform="rotate(45 7.5 8.5)" />
            <rect x="32" y="6" width="4.5" height="4.5" rx="2" transform="rotate(-45 34.5 8.5)" />
            <rect x="5" y="32" width="4.5" height="4.5" rx="2" transform="rotate(-45 7.5 34.5)" />
          </g>
          <!-- Cuerpo del Sol grande y feliz -->
          <circle cx="22" cy="22" r="13" fill="#facc15" stroke="#ca8a04" stroke-width="1.8" />
          <!-- Coloretes tiernos -->
          <ellipse cx="14" cy="25" rx="2.8" ry="1.7" fill="#fb7185" opacity="0.85" />
          <ellipse cx="30" cy="25" rx="2.8" ry="1.7" fill="#fb7185" opacity="0.85" />
          <!-- Ojos expresivos -->
          <ellipse cx="17" cy="19" rx="2.2" ry="3" fill="#1e293b" />
          <circle cx="16.3" cy="17.8" r="1" fill="#ffffff" />
          <ellipse cx="27" cy="19" rx="2.2" ry="3" fill="#1e293b" />
          <circle cx="26.3" cy="17.8" r="1" fill="#ffffff" />
          <!-- Sonrisa grande -->
          <path d="M 17,23 Q 22,30 27,23 Z" fill="#991b1b" />
          <path d="M 19.5,26 Q 22,29.5 24.5,26 Z" fill="#f43f5e" />
          <!-- Nubecita pequeña en esquina inferior derecha (secundaria, no protagonista) -->
          <path d="M 47,45 H 32 A 5,5 0 0 1 31,36 A 7,7 0 0 1 45.5,36.5 A 5,5 0 0 1 47,45 Z"
                fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
          <!-- Ojitos de la nubecita -->
          <circle cx="37" cy="41" r="1.2" fill="#1e293b" />
          <circle cx="42" cy="41" r="1.2" fill="#1e293b" />
          <path d="M 38.5,43 Q 39.5,44.5 41,43" stroke="#1e293b" stroke-width="1" fill="none" stroke-linecap="round" />
        </svg>
      `;

    case 'resol':
      // 🌤️ RESOL / SOL TAMIZÁU (Sol con gafas y rayos penetrando la nube)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-resol" aria-label="Resol y Sol Tamizado">
          <!-- Halo dorado difuso detrás del sol (la corona del resol asturiano) -->
          <circle cx="18" cy="17" r="16" fill="rgba(250, 204, 21, 0.18)" />
          <circle cx="18" cy="17" r="13" fill="rgba(250, 204, 21, 0.13)" />
          <!-- Rayos del sol (difusos, cortos, velados) -->
          <g stroke="#f59e0b" stroke-width="1.6" stroke-linecap="round" opacity="0.65">
            <line x1="18" y1="2"  x2="18" y2="6" />
            <line x1="9"  y1="6"  x2="12" y2="9" />
            <line x1="4"  y1="16" x2="8"  y2="16" />
            <line x1="27" y1="6"  x2="24" y2="9" />
            <line x1="32" y1="16" x2="28" y2="16" />
            <line x1="9"  y1="26" x2="12" y2="24" />
            <line x1="27" y1="26" x2="24" y2="24" />
          </g>
          <!-- Sol protagonista (ojos entornados por el deslumbre difuso) -->
          <circle cx="18" cy="17" r="9" fill="#facc15" stroke="#eab308" stroke-width="1.6" />
          <!-- Ojos entornados — el sol ve a través del velo nuboso -->
          <path d="M 14,15 Q 15,14 16,15" stroke="#1e293b" stroke-width="1.6" fill="none" stroke-linecap="round" />
          <path d="M 19,15 Q 20,14 21,15" stroke="#1e293b" stroke-width="1.6" fill="none" stroke-linecap="round" />
          <!-- Coloretes suaves -->
          <ellipse cx="13" cy="18" rx="2" ry="1.2" fill="#fb7185" opacity="0.7" />
          <ellipse cx="23" cy="18" rx="2" ry="1.2" fill="#fb7185" opacity="0.7" />
          <!-- Sonrisa tranquila -->
          <path d="M 15,19.5 Q 18,22 21,19.5" stroke="#991b1b" stroke-width="1.3" fill="none" stroke-linecap="round" />
          <!-- NUBE GRANDE SEMITRANSPARENTE — el velo nuboso (altoestratos/cirros) que filtra el sol -->
          <!-- opacity baja = se ve el sol a través, que es la esencia física del resol -->
          <path d="M 44,37 H 15 A 9,9 0 0 1 13.5,20 A 12,12 0 0 1 40,20.5 A 8.5,8.5 0 0 1 44,37 Z"
                fill="rgba(226, 232, 240, 0.50)" stroke="rgba(148, 163, 184, 0.55)" stroke-width="1.5" />
          <!-- Carita soñolienta de la nube grande (recibe el calor difuso) -->
          <path d="M 24,27 Q 25,28.5 26,27" stroke="#64748b" stroke-width="1" fill="none" stroke-linecap="round" />
          <path d="M 31,27 Q 32,28.5 33,27" stroke="#64748b" stroke-width="1" fill="none" stroke-linecap="round" />
          <!-- NUBE PEQUEÑA SÓLIDA — la nube compacta de primer plano abajo-derecha -->
          <path d="M 47,46 H 33 A 5.5,5.5 0 0 1 32,38 A 7.5,7.5 0 0 1 46,38.5 A 5,5 0 0 1 47,46 Z"
                fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.4" />
          <!-- Ojitos de la nube pequeña -->
          <ellipse cx="37.5" cy="42" rx="1.3" ry="1.7" fill="#1e293b" />
          <ellipse cx="42.5" cy="42" rx="1.3" ry="1.7" fill="#1e293b" />
          <path d="M 39,44.5 Q 40,46 41.5,44.5" stroke="#1e293b" stroke-width="1" fill="none" stroke-linecap="round" />
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
      // 🌦️ ORBAYU: NUBE CON 1 SOLA GOTITA BEBÉ TIERNA (0.1 - 0.4 mm/h)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-orbayu" aria-label="Orbayu Divertido Cómic">
          <!-- Nube Dulce Celesta -->
          <path d="M 38,24 H 14 A 7,7 0 0 1 12.5,10 A 9.5,9.5 0 0 1 32,10.5 A 6.5,6.5 0 0 1 38,24 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.8" />
          <!-- Carita de la Nube -->
          <ellipse cx="20" cy="16" rx="1.8" ry="2.2" fill="#0369a1" />
          <ellipse cx="28" cy="16" rx="1.8" ry="2.2" fill="#0369a1" />
          <ellipse cx="16" cy="19" rx="1.8" ry="1" fill="#f472b6" opacity="0.8" />
          <ellipse cx="32" cy="19" rx="1.8" ry="1" fill="#f472b6" opacity="0.8" />
          <path d="M 22,19 Q 24,22 26,19" stroke="#0369a1" stroke-width="1.4" fill="none" stroke-linecap="round" />
          <!-- 1 SOLA GOTITA BEBÉ PROTAGONISTA EN EL CENTRO -->
          <g transform="translate(20, 28)">
            <path d="M 4,0 C 4,0 0,6 0,8.5 C 0,11 1.8,13 4,13 C 6.2,13 8,11 8,8.5 C 8,6 4,0 4,0 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2" />
            <circle cx="3" cy="8" r="0.7" fill="#0f172a" />
            <circle cx="5" cy="8" r="0.7" fill="#0f172a" />
            <path d="M 3.2,10.2 Q 4,11.2 4.8,10.2" stroke="#0369a1" stroke-width="0.8" fill="none" stroke-linecap="round" />
          </g>
        </svg>
      `;

    case 'rain':
    case 'rain-moderate':
      // 🌧️ LLUVIA: NUBE CONTENTA CON 3 GOTAS (0.5 - 2.4 mm/h)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-rain" aria-label="Lluvia Cómic">
          <!-- Nube de Lluvia -->
          <path d="M 40,24 H 13 A 8,8 0 0 1 11.5,9 A 11,11 0 0 1 35.5,9.5 A 7.5,7.5 0 0 1 40,24 Z" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8" />
          <ellipse cx="20" cy="15" rx="2" ry="2.5" fill="#0369a1" />
          <ellipse cx="30" cy="15" rx="2" ry="2.5" fill="#0369a1" />
          <ellipse cx="16" cy="19" rx="2.2" ry="1.3" fill="#fb7185" opacity="0.8" />
          <ellipse cx="34" cy="19" rx="2.2" ry="1.3" fill="#fb7185" opacity="0.8" />
          <path d="M 23,19 Q 25,23 27,19" stroke="#0369a1" stroke-width="1.5" fill="none" stroke-linecap="round" />
          <!-- Gotas de lluvia alegres cayendo (3 gotas regulares) -->
          <g fill="#0284c7">
            <path d="M 13,28 C 13,28 10,33 10,35 A 3,3 0 0 0 16,35 C 16,33 13,28 13,28 Z" />
            <path d="M 24,30 C 24,30 21,35 21,37 A 3,3 0 0 0 27,37 C 27,35 24,30 24,30 Z" />
            <path d="M 35,28 C 35,28 32,33 32,35 A 3,3 0 0 0 38,35 C 38,33 35,28 35,28 Z" />
          </g>
        </svg>
      `;

    case 'heavy-rain':
      // 🌧️🌊 BASTINAZU / LLUVIA FUERTE: NUBE CARGADA CON CORTINA DENSA DE 5 GOTAS (>= 2.5 mm/h, SIN RAYO)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-heavy-rain" aria-label="Bastinazu Lluvia Fuerte Cómic">
          <!-- Nube Azul Plomo Densa -->
          <path d="M 41,23 H 12 A 8.5,8.5 0 0 1 10.5,8 A 12,12 0 0 1 36.5,8.5 A 8,8 0 0 1 41,23 Z" fill="#64748b" stroke="#334155" stroke-width="2" />
          <!-- Ojos decididos ante el bastinazu -->
          <ellipse cx="19" cy="15" rx="2.2" ry="2.6" fill="#f8fafc" />
          <circle cx="20" cy="15.5" r="1.2" fill="#0f172a" />
          <ellipse cx="30" cy="15" rx="2.2" ry="2.6" fill="#f8fafc" />
          <circle cx="31" cy="15.5" r="1.2" fill="#0f172a" />
          <path d="M 22,20 Q 25,18 28,20" stroke="#f8fafc" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <!-- Cortina de 5 gotas densas cayendo con fuerza e inclinación -->
          <g fill="#0284c7" stroke="#0369a1" stroke-width="0.8">
            <path d="M 9,28 C 9,28 6,34 6,36.5 A 3,3 0 0 0 12,36.5 C 12,34 9,28 9,28 Z" />
            <path d="M 17,31 C 17,31 14,37 14,39.5 A 3,3 0 0 0 20,39.5 C 20,37 17,31 17,31 Z" />
            <path d="M 25,28 C 25,28 22,34 22,36.5 A 3,3 0 0 0 28,36.5 C 28,34 25,28 25,28 Z" />
            <path d="M 33,31 C 33,31 30,37 30,39.5 A 3,3 0 0 0 36,39.5 C 36,37 33,31 33,31 Z" />
            <path d="M 40,28 C 40,28 37,34 37,36.5 A 3,3 0 0 0 43,36.5 C 43,34 40,28 40,28 Z" />
          </g>
        </svg>
      `;

    case 'storm':
      // ⛈️ TORMENTA ELÉCTRICA (NUBE ENFADADA CON RAYO)
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

    case 'snow-light':
      // ❄️ FALISPOS / NEVADA DÉBIL: Nube sonriente con gorrito y 1 solo copito
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-snow-light" aria-label="Falispos y Nieve Ligera">
          <path d="M 40,34 H 13 A 8,8 0 0 1 11.5,19 A 11,11 0 0 1 35.5,19.5 A 7.5,7.5 0 0 1 40,34 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.8" />
          <g transform="translate(16, 3)">
            <path d="M 3,14 Q 8,4 18,10 Q 14,15 5,16 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.2" />
            <path d="M 4,14 L 18,10" stroke="#facc15" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="3" cy="14" r="3.2" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
          </g>
          <ellipse cx="20" cy="25" rx="1.8" ry="2.4" fill="#1e293b" />
          <ellipse cx="30" cy="25" rx="1.8" ry="2.4" fill="#1e293b" />
          <ellipse cx="16" cy="28" rx="2.2" ry="1.4" fill="#67e8f9" opacity="0.7" />
          <ellipse cx="34" cy="28" rx="2.2" ry="1.4" fill="#67e8f9" opacity="0.7" />
          <path d="M 23,28 Q 25,30.5 27,28" stroke="#1e293b" stroke-width="1.3" fill="none" stroke-linecap="round" />
          <!-- 1 Copito central tierno -->
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round">
            <line x1="25" y1="38" x2="25" y2="44" />
            <line x1="22" y1="41" x2="28" y2="41" />
          </g>
        </svg>
      `;

    case 'snow':
      // ❄️ NEVADA MODERADA: Nube con gorrito y 3 copos
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-snow" aria-label="Nevada Moderada">
          <path d="M 40,34 H 13 A 8,8 0 0 1 11.5,19 A 11,11 0 0 1 35.5,19.5 A 7.5,7.5 0 0 1 40,34 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.8" />
          <g transform="translate(16, 3)">
            <path d="M 3,14 Q 8,4 18,10 Q 14,15 5,16 Z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.2" />
            <path d="M 4,14 L 18,10" stroke="#facc15" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="3" cy="14" r="3.2" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
          </g>
          <ellipse cx="20" cy="25" rx="1.8" ry="2.4" fill="#1e293b" />
          <ellipse cx="30" cy="25" rx="1.8" ry="2.4" fill="#1e293b" />
          <ellipse cx="16" cy="28" rx="2.5" ry="1.5" fill="#67e8f9" opacity="0.8" />
          <ellipse cx="34" cy="28" rx="2.5" ry="1.5" fill="#67e8f9" opacity="0.8" />
          <path d="M 23,28 Q 25,31 27,28" stroke="#1e293b" stroke-width="1.4" fill="none" stroke-linecap="round" />
          <!-- 3 Copos de nieve -->
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round">
            <line x1="13" y1="38" x2="13" y2="44" />
            <line x1="10" y1="41" x2="16" y2="41" />
            <line x1="25" y1="38" x2="25" y2="44" />
            <line x1="22" y1="41" x2="28" y2="41" />
            <line x1="37" y1="38" x2="37" y2="44" />
            <line x1="34" y1="41" x2="40" y2="41" />
          </g>
        </svg>
      `;

    case 'heavy-snow':
    case 'nevadona':
      // ❄️🏔️ NEVADONA FUERTE / COPIOSA: Nube con gorro y bufanda roja, tiritando con 5 copos densos
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-heavy-snow" aria-label="Nevadona Fuerte Copiosa">
          <path d="M 40,32 H 13 A 8,8 0 0 1 11.5,17 A 11,11 0 0 1 35.5,17.5 A 7.5,7.5 0 0 1 40,32 Z" fill="#e0f2fe" stroke="#64748b" stroke-width="1.8" />
          <!-- Gorrito de Lana -->
          <g transform="translate(16, 2)">
            <path d="M 3,13 Q 8,3 18,9 Q 14,14 5,15 Z" fill="#ef4444" stroke="#991b1b" stroke-width="1.2" />
            <path d="M 4,13 L 18,9" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="3" cy="13" r="3.2" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
          </g>
          <!-- Bufanda de Lana Abajo -->
          <path d="M 16,30 Q 25,34 34,30 L 33,33 Q 25,37 17,33 Z" fill="#ef4444" stroke="#991b1b" stroke-width="1.2" />
          <!-- Carita de Frío Intenso con Boca Tiritona -->
          <circle cx="20" cy="23" r="1.8" fill="#0f172a" />
          <circle cx="30" cy="23" r="1.8" fill="#0f172a" />
          <ellipse cx="15" cy="26" rx="2.5" ry="1.5" fill="#38bdf8" opacity="0.8" />
          <ellipse cx="35" cy="26" rx="2.5" ry="1.5" fill="#38bdf8" opacity="0.8" />
          <path d="M 22,26 L 24,28 L 26,26 L 28,28" stroke="#0f172a" stroke-width="1.4" fill="none" stroke-linecap="round" />
          <!-- 5 Copos Copiosos a Dos Alturas -->
          <g stroke="#0284c7" stroke-width="1.8" stroke-linecap="round">
            <line x1="8" y1="36" x2="8" y2="42" /><line x1="5" y1="39" x2="11" y2="39" />
            <line x1="17" y1="39" x2="17" y2="45" /><line x1="14" y1="42" x2="20" y2="42" />
            <line x1="25" y1="36" x2="25" y2="42" /><line x1="22" y1="39" x2="28" y2="39" />
            <line x1="33" y1="39" x2="33" y2="45" /><line x1="30" y1="42" x2="36" y2="42" />
            <line x1="41" y1="36" x2="41" y2="42" /><line x1="38" y1="39" x2="44" y2="39" />
          </g>
        </svg>
      `;

    case 'sleet':
      // 🌧️❄️ AGUANIEVE (LLUVIA CON NIEVE): Nube con gotas líquidas y copos de nieve cayendo juntos
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-sleet" aria-label="Aguanieve Lluvia y Nieve">
          <path d="M 40,33 H 13 A 8,8 0 0 1 11.5,18 A 11,11 0 0 1 35.5,18.5 A 7.5,7.5 0 0 1 40,33 Z" fill="#f0f9ff" stroke="#64748b" stroke-width="1.8" />
          <!-- Gorro Bicolor -->
          <g transform="translate(16, 2)">
            <path d="M 3,14 Q 8,4 18,10 Q 14,15 5,16 Z" fill="#0284c7" stroke="#0369a1" stroke-width="1.2" />
            <path d="M 4,14 L 18,10" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="3" cy="14" r="3.2" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
          </g>
          <ellipse cx="20" cy="24" rx="1.8" ry="2.4" fill="#1e293b" />
          <ellipse cx="30" cy="24" rx="1.8" ry="2.4" fill="#1e293b" />
          <ellipse cx="16" cy="27" rx="2.5" ry="1.5" fill="#38bdf8" opacity="0.7" />
          <ellipse cx="34" cy="27" rx="2.5" ry="1.5" fill="#38bdf8" opacity="0.7" />
          <path d="M 23,27 Q 25,30 27,27" stroke="#1e293b" stroke-width="1.4" fill="none" stroke-linecap="round" />
          <!-- Gotas de Lluvia y Copo de Nieve Combinados -->
          <!-- Gota Izquierda -->
          <path d="M 12,37 Q 10,40 10,42 A 2.2,2.2 0 0 0 14.4,42 Q 14.4,40 12,37 Z" fill="#0284c7" />
          <!-- Copo Centro -->
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round">
            <line x1="25" y1="36" x2="25" y2="44" />
            <line x1="21" y1="40" x2="29" y2="40" />
            <line x1="22" y1="37" x2="28" y2="43" />
            <line x1="22" y1="43" x2="28" y2="37" />
          </g>
          <!-- Gota Derecha -->
          <path d="M 37,37 Q 35,40 35,42 A 2.2,2.2 0 0 0 39.4,42 Q 39.4,40 37,37 Z" fill="#0284c7" />
        </svg>
      `;

    case 'hail':
      // 🧊 GRANIZO / PEDRISCU: Nube tormentosa con ojos asustados y piedras anguladas de hielo cayendo
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon icon-comic-hail" aria-label="Granizo y Pedriscu">
          <!-- Nube Tormentosa Oscura -->
          <path d="M 40,32 H 13 A 8,8 0 0 1 11.5,17 A 11,11 0 0 1 35.5,17.5 A 7.5,7.5 0 0 1 40,32 Z" fill="#334155" stroke="#1e293b" stroke-width="2" />
          <!-- Ojos de Asombro / Preocupación -->
          <ellipse cx="20" cy="22" rx="2.5" ry="3.2" fill="#ffffff" />
          <circle cx="20" cy="22" r="1.3" fill="#0f172a" />
          <ellipse cx="30" cy="22" rx="2.5" ry="3.2" fill="#ffffff" />
          <circle cx="30" cy="22" r="1.3" fill="#0f172a" />
          <!-- Cejas Inclinadas -->
          <line x1="17" y1="17" x2="22" y2="19" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" />
          <line x1="33" y1="17" x2="28" y2="19" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" />
          <!-- Boca Abierta "O" de Sorpresa -->
          <circle cx="25" cy="26" r="2.2" fill="#0f172a" stroke="#ffffff" stroke-width="0.8" />
          <!-- Piedras Duras de Granizo con Destello Blanco y Sombra Cian -->
          <!-- Piedra 1 -->
          <polygon points="12,35 15,37 14,41 10,40" fill="#ffffff" stroke="#0284c7" stroke-width="1.3" />
          <!-- Piedra 2 (Grande) -->
          <polygon points="23,36 28,34 30,39 26,42 22,39" fill="#f8fafc" stroke="#0284c7" stroke-width="1.5" />
          <!-- Piedra 3 -->
          <polygon points="36,36 39,39 37,43 33,40" fill="#ffffff" stroke="#0284c7" stroke-width="1.3" />
          <!-- Líneas de velocidad de impacto -->
          <line x1="11" y1="42" x2="9" y2="45" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round" />
          <line x1="26" y1="43" x2="25" y2="46" stroke="#94a3b8" stroke-width="1.4" stroke-linecap="round" />
          <line x1="36" y1="44" x2="35" y2="47" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round" />
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
