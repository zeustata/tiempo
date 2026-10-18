/**
 * Catálogo Oficial de Iconos "Especial Halloween / Samhain" (Estilo Fantasía Gótica & Jack-o'-lantern)
 * Diseñado a medida por Princesa & Lendo para MeteoAstur Lode
 * Motivos temáticos: Calabazas talladas, luna con bruja, niebla densa mojada con ectoplasma,
 * murciélagos, pociones mágicas, mansión encantada y calaveras de hielo.
 */

export function getHalloweenWeatherSvg(iconKey, size = 32) {
  const sz = parseInt(size, 10) || 32;

  switch (iconKey) {
    case 'clear-day':
    case 'sun':
      // 🎃 ☀️ SOL CALABAZA JACK-O'-LANTERN (LLAMARADAS MÁGICAS, OJOS BRILLANTES Y SONRISA PÍCICA)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-sun" aria-label="Sol Calabaza de Halloween">
          <!-- Rayos de fuego solar ardientes -->
          <g fill="#f97316" stroke="#ea580c" stroke-width="1">
            <polygon points="24,1 21,7 27,7" />
            <polygon points="24,47 21,41 27,41" />
            <polygon points="1,24 7,21 7,27" />
            <polygon points="47,24 41,21 41,27" />
            <polygon points="7,7 13,9 9,13" />
            <polygon points="41,41 35,39 39,35" />
            <polygon points="7,41 9,35 13,39" />
            <polygon points="41,7 39,13 35,9" />
          </g>
          <!-- Cuerpo de Calabaza con gajos -->
          <ellipse cx="24" cy="25" rx="15" ry="14" fill="#ea580c" stroke="#c2410c" stroke-width="1.6" />
          <ellipse cx="24" cy="25" rx="10" ry="13.8" fill="#f97316" opacity="0.95" />
          <ellipse cx="24" cy="25" rx="5.5" ry="13.5" fill="#fb923c" opacity="0.9" />
          <!-- Tallo verde retorcido en la coronilla -->
          <path d="M 23,12 C 22,8 26,6 27,4 C 25,6 24,9 25,12 Z" fill="#22c55e" stroke="#15803d" stroke-width="1" />
          <!-- Ojos triangulares brillantes tallados con fuego interior -->
          <polygon points="17,20 21,24 15,24" fill="#fef08a" stroke="#ca8a04" stroke-width="0.8" />
          <polygon points="31,20 33,24 27,24" fill="#fef08a" stroke="#ca8a04" stroke-width="0.8" />
          <!-- Nariz triangular pequeña -->
          <polygon points="24,24 22.5,27 25.5,27" fill="#fef08a" />
          <!-- Gran Sonrisa Pícara Mellada con Fuego Amarillo -->
          <path d="M 16,29 Q 24,38 32,29 L 30,30 L 29,32 L 27,30 L 25,32 L 23,30 L 21,32 L 19,30 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="1" />
          <!-- Pupilas de brasas de fuego -->
          <circle cx="18" cy="22.5" r="1" fill="#ea580c" />
          <circle cx="30" cy="22.5" r="1" fill="#ea580c" />
        </svg>
      `;

    case 'clear-night':
    case 'mostly-clear-night':
    case 'moon':
      // 🌙 🧙‍♀️ LUNA LLENA ESPECTRAL CON SILUETA DE BRUJA VOLANDO EN ESCOBA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-moon" aria-label="Luna Llena y Bruja Volando">
          <!-- Resplandor exterior de la luna -->
          <circle cx="23" cy="24" r="17" fill="rgba(254, 240, 138, 0.25)" />
          <!-- Disco de la Luna Llena Brillante -->
          <circle cx="23" cy="24" r="14.5" fill="#fef08a" stroke="#eab308" stroke-width="1.5" />
          <!-- Cráteres lunares suaves -->
          <circle cx="16" cy="19" r="2.2" fill="#fde047" opacity="0.6" />
          <circle cx="20" cy="30" r="1.8" fill="#fde047" opacity="0.6" />
          <circle cx="28" cy="18" r="2.5" fill="#fde047" opacity="0.6" />
          <!-- Silueta negra de la Bruja volando en su escoba -->
          <g fill="#0f172a" stroke="#0f172a" stroke-width="0.5">
            <!-- Palo de la escoba cruzado -->
            <line x1="8" y1="31" x2="36" y2="15" stroke="#0f172a" stroke-width="1.8" stroke-linecap="round" />
            <!-- Cerdas de paja de la escoba -->
            <polygon points="6,33 11,29 8,36" fill="#ca8a04" stroke="#854d0e" stroke-width="0.8" />
            <!-- Cuerpo y falda de la bruja -->
            <path d="M 21,23 L 26,20 L 22,28 Z" />
            <!-- Cabeza con nariz ganchuda -->
            <circle cx="23" cy="18" r="2.2" />
            <polygon points="25,18 27,19 25,20" />
            <!-- Sombrero cónico puntiagudo inclinado -->
            <polygon points="20,17 26,16 28,9" fill="#581c87" stroke="#3b0764" stroke-width="0.8" />
            <ellipse cx="23" cy="17" rx="3.8" ry="1.2" fill="#581c87" />
          </g>
          <!-- Murciélago pequeño volando hacia las estrellas -->
          <path d="M 36,9 Q 39,6 42,9 Q 40,11 39,10 Q 38,11 36,9 Z" fill="#0f172a" />
          <!-- Estrellas místicas de 4 puntas -->
          <path d="M 37,28 Q 37,31 40,31 Q 37,31 37,34 Q 37,31 34,31 Q 37,31 37,28 Z" fill="#ffffff" />
        </svg>
      `;

    case 'mostly-clear-day':
      // 🌤️🎃 MAYORMENTE SOLEADO: Calabaza sonriente con suave nube gótica
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-mostly-clear" aria-label="Calabaza con nubes dispersas">
          <!-- Calabaza solar al fondo -->
          <g transform="translate(-2, -2)">
            <ellipse cx="28" cy="18" rx="10" ry="9" fill="#f97316" stroke="#c2410c" stroke-width="1.4" />
            <ellipse cx="28" cy="18" rx="6.5" ry="9" fill="#fb923c" />
            <path d="M 27,9 Q 29,6 30,5" stroke="#15803d" stroke-width="1.5" fill="none" />
            <polygon points="24,15 26,17 23,17" fill="#fef08a" />
            <polygon points="32,15 33,17 30,17" fill="#fef08a" />
            <path d="M 24,20 Q 28,24 32,20 Z" fill="#fef08a" />
          </g>
          <!-- Nube nocturna de tono pizarra/púrpura -->
          <path d="M 38,37 H 14 A 8,8 0 0 1 12,22 A 11,11 0 0 1 35,21 A 7.5,7.5 0 0 1 38,37 Z" fill="#334155" stroke="#1e293b" stroke-width="1.6" />
          <!-- Ojos amigables en la nube -->
          <circle cx="21" cy="29" r="1.6" fill="#f8fafc" />
          <circle cx="29" cy="29" r="1.6" fill="#f8fafc" />
          <circle cx="21" cy="29" r="0.8" fill="#0f172a" />
          <circle cx="29" cy="29" r="0.8" fill="#0f172a" />
        </svg>
      `;

    case 'partly-cloudy-day':
      // ⛅👻 NUBES Y CLAROS: Nube gótica con fantasmita blanco sonriente asomando y destello de calabaza
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-partly-cloudy" aria-label="Claros con Fantasmita y Calabaza">
          <!-- Calabaza solar asomando arriba -->
          <g transform="translate(4, -3)">
            <ellipse cx="28" cy="17" rx="8" ry="7.5" fill="#f97316" stroke="#c2410c" stroke-width="1.2" />
            <polygon points="25,14 27,16 24,16" fill="#fef08a" />
            <polygon points="31,14 32,16 29,16" fill="#fef08a" />
            <path d="M 25,19 Q 28,22 31,19 Z" fill="#fef08a" />
          </g>
          <!-- Fantasmita flotante curioso -->
          <g transform="translate(6, 4)">
            <path d="M 8,16 Q 8,8 14,8 Q 20,8 20,16 Q 20,20 18,22 Q 16,20 14,22 Q 12,20 10,22 Q 8,20 8,16 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.2" />
            <circle cx="12" cy="13" r="1.3" fill="#0f172a" />
            <circle cx="16" cy="13" r="1.3" fill="#0f172a" />
            <ellipse cx="14" cy="16" rx="1.2" ry="1.6" fill="#0f172a" />
          </g>
          <!-- Nube oscura al frente -->
          <path d="M 40,38 H 15 A 8,8 0 0 1 13.5,23 A 11,11 0 0 1 36,22.5 A 7.5,7.5 0 0 1 40,38 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.8" />
          <!-- Resplandor púrpura tenue en la nube -->
          <path d="M 18,34 Q 25,32 32,34" stroke="#a855f7" stroke-width="1.4" fill="none" opacity="0.7" />
        </svg>
      `;

    case 'partly-cloudy-night':
      // 🌙🦇 CLAROS DE NOCHE: Luna creciente con nube nocturna y murciélago planeando
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-partly-cloudy-night" aria-label="Noche con Luna y Murciélago">
          <!-- Luna Creciente dorada -->
          <path d="M 29,22 A 10,10 0 0 1 18,7 A 10,10 0 1 0 29,22 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.2" />
          <!-- Nube nocturna -->
          <path d="M 40,38 H 15 A 8,8 0 0 1 13.5,23 A 11,11 0 0 1 36,22.5 A 7.5,7.5 0 0 1 40,38 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.8" />
          <!-- Murciélago con alas abiertas -->
          <path d="M 21,30 Q 23,26 26,29 Q 29,26 31,30 Q 28,32 26,30 Q 24,32 21,30 Z" fill="#a855f7" stroke="#7e22ce" stroke-width="0.8" />
        </svg>
      `;

    case 'resol':
      // 🌥️🕸️ RESOL ASTURIANO DE HALLOWEEN: Calabaza Jack-o'-lantern tamizada tras velo de telaraña y bruma
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-resol" aria-label="Resol de Samhain con velo místico">
          <!-- Calabaza solar brillante de fondo -->
          <g transform="translate(0, 0)">
            <ellipse cx="24" cy="22" rx="14" ry="13" fill="#ea580c" opacity="0.9" />
            <ellipse cx="24" cy="22" rx="9" ry="13" fill="#f97316" />
            <polygon points="18,18 21,22 16,22" fill="#fef08a" />
            <polygon points="30,18 32,22 27,22" fill="#fef08a" />
            <path d="M 17,26 Q 24,33 31,26 Z" fill="#fef08a" />
          </g>
          <!-- Manto velado de bruma nocturna semitransparente -->
          <path d="M 42,37 H 12 A 9,9 0 0 1 10,21 A 12,12 0 0 1 37,20.5 A 8.5,8.5 0 0 1 42,37 Z" fill="rgba(71, 85, 105, 0.72)" stroke="#475569" stroke-width="1.5" />
          <!-- Motivo de Telaraña translúcida en la esquina del sol -->
          <g stroke="#e2e8f0" stroke-width="0.9" opacity="0.65" fill="none">
            <line x1="12" y1="21" x2="24" y2="28" />
            <line x1="12" y1="26" x2="22" y2="30" />
            <path d="M 15,22 Q 17,25 15,27" />
            <path d="M 18,24 Q 21,27 19,30" />
          </g>
          <!-- Fina arañita colgada -->
          <circle cx="24" cy="36" r="1.5" fill="#0f172a" />
          <line x1="24" y1="30" x2="24" y2="35" stroke="#94a3b8" stroke-width="0.8" />
        </svg>
      `;

    case 'cloud':
    case 'cloudy':
      // ☁️🦇 NUBLADO GÓTICO: Nube gris pizarra con ojos misteriosos y murciélago volando
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-cloud" aria-label="Cielo Nublado Gótico">
          <path d="M 41,35 H 12 A 9,9 0 0 1 10.5,18 A 12,12 0 0 1 37,17.5 A 8.5,8.5 0 0 1 41,35 Z" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
          <!-- Ojos demoníacos brillantes de gato de bruja asomando -->
          <ellipse cx="20" cy="24" rx="2.5" ry="3.5" fill="#facc15" />
          <polygon points="19.5,21 20.5,21 20.5,27 19.5,27" fill="#0f172a" />
          <ellipse cx="29" cy="24" rx="2.5" ry="3.5" fill="#facc15" />
          <polygon points="28.5,21 29.5,21 29.5,27 28.5,27" fill="#0f172a" />
          <!-- Murciélago planeando debajo de la nube -->
          <path d="M 20,38 Q 23,34 26,37 Q 29,34 32,38 Q 28,40 26,38 Q 24,40 20,38 Z" fill="#0f172a" stroke="#64748b" stroke-width="0.6" />
        </svg>
      `;

    case 'fog':
      // 🌫️🪦 NIEBLA DE CEMENTERIO (BORRINA SECA ESTÁNDAR): Lápida RIP entre niebla nocturna
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-fog" aria-label="Niebla de Cementerio Encantado">
          <!-- Silueta de Lápida antigua al fondo -->
          <path d="M 21,32 L 21,18 A 4,4 0 0 1 29,18 L 29,32 Z" fill="#475569" stroke="#334155" stroke-width="1.2" />
          <!-- Cruz grabada en la lápida -->
          <line x1="25" y1="20" x2="25" y2="26" stroke="#94a3b8" stroke-width="1.2" />
          <line x1="23" y1="22" x2="27" y2="22" stroke="#94a3b8" stroke-width="1.2" />
          <!-- Capas de niebla fantasmal con puntas redondeadas -->
          <line x1="6" y1="26" x2="42" y2="26" stroke="#94a3b8" stroke-width="3.5" stroke-linecap="round" opacity="0.85" />
          <line x1="9" y1="32" x2="39" y2="32" stroke="#cbd5e1" stroke-width="3.5" stroke-linecap="round" />
          <line x1="7" y1="38" x2="35" y2="38" stroke="#64748b" stroke-width="3.5" stroke-linecap="round" opacity="0.9" />
          <line x1="12" y1="43" x2="31" y2="43" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" opacity="0.75" />
          <!-- Fuegos fatuos flotantes -->
          <circle cx="11" cy="20" r="1.4" fill="#38bdf8" opacity="0.8" />
          <circle cx="37" cy="18" r="1.2" fill="#38bdf8" opacity="0.8" />
        </svg>
      `;

    case 'wet-fog':
      // 🌫️🫧 NIEBLA DENSA MOJADA DE HALLOWEEN (BORRINA HÚMEDA / MEONA):
      // Nube brumosa en verde espectral con 4 capas densas, ojos de aparecido y gotas de rocío ectoplásmico
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-wet-fog" aria-label="Niebla Densa Mojada de Samhain">
          <!-- Nube de condensación fantasmal en tono verde agua espectral -->
          <path d="M 39,24 H 13 A 7,7 0 0 1 11.5,12 A 9.5,9.5 0 0 1 33,12.5 A 6.5,6.5 0 0 1 39,24 Z" fill="#064e3b" stroke="#10b981" stroke-width="1.8" />
          <!-- Ojos de ánima o aparecido flotando en la niebla mojada -->
          <ellipse cx="19" cy="17" rx="2" ry="2.6" fill="#34d399" />
          <circle cx="18.5" cy="16" r="0.8" fill="#ffffff" />
          <ellipse cx="27" cy="17" rx="2" ry="2.6" fill="#34d399" />
          <circle cx="26.5" cy="16" r="0.8" fill="#ffffff" />
          <!-- 4 Capas densas de niebla saturada de humedad en degradado espectral -->
          <line x1="5" y1="28" x2="43" y2="28" stroke="#34d399" stroke-width="3.8" stroke-linecap="round" />
          <line x1="8" y1="33" x2="40" y2="33" stroke="#10b981" stroke-width="3.6" stroke-linecap="round" />
          <line x1="6" y1="38" x2="38" y2="38" stroke="#059669" stroke-width="3.8" stroke-linecap="round" />
          <line x1="10" y1="43" x2="35" y2="43" stroke="#047857" stroke-width="3.2" stroke-linecap="round" />
          <!-- Gotas de condensación y rocío denso flotando (humedad meona saturada) -->
          <circle cx="10" cy="23" r="1.8" fill="#6ee7b7" opacity="0.9" />
          <circle cx="36" cy="30" r="1.6" fill="#6ee7b7" opacity="0.9" />
          <circle cx="23" cy="46" r="1.4" fill="#a7f3d0" opacity="0.95" />
        </svg>
      `;

    case 'drizzle':
    case 'orbayu':
      // 💧🧪 ORBAYU MÁGICO: Nube con poción de bruja goteando rocío verde esmeralda y morado
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-drizzle" aria-label="Orbayu Mágico de Bruja">
          <path d="M 40,28 H 13 A 8,8 0 0 1 11.5,14 A 11,11 0 0 1 35.5,14.5 A 7.5,7.5 0 0 1 40,28 Z" fill="#3b0764" stroke="#581c87" stroke-width="1.8" />
          <!-- Frasco de poción colgante -->
          <g transform="translate(19, 14)">
            <rect x="3" y="1" width="4" height="2" fill="#a855f7" />
            <path d="M 3,3 L 1,9 A 4,4 0 0 0 9,9 L 7,3 Z" fill="#10b981" stroke="#059669" stroke-width="0.8" />
          </g>
          <!-- Gotitas finas de orbayu fosforescente cayendo suavemente -->
          <path d="M 12,34 Q 10,38 10,40 A 2,2 0 0 0 14,40 Q 14,38 12,34 Z" fill="#34d399" />
          <path d="M 24,37 Q 22,41 22,43 A 2,2 0 0 0 26,43 Q 26,41 24,37 Z" fill="#c084fc" />
          <path d="M 36,34 Q 34,38 34,40 A 2,2 0 0 0 38,40 Q 38,38 36,34 Z" fill="#34d399" />
        </svg>
      `;

    case 'showers':
    case 'chubascos':
    case 'sun-rain':
      // 🎃 🌦️ CHUBASCOS CON CALABAZA SOLAR Y POCIÓN MÁGICA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-showers" aria-label="Chubascos con Sol de Halloween">
          <!-- Calabaza solar ardiente asomando arriba-izquierda -->
          <ellipse cx="17" cy="16" rx="9" ry="8.5" fill="#ea580c" stroke="#c2410c" stroke-width="1.2" />
          <ellipse cx="17" cy="16" rx="5.5" ry="8.2" fill="#f97316" />
          <polygon points="13,14 16,16 12,16" fill="#fef08a" />
          <polygon points="21,14 22,16 18,16" fill="#fef08a" />
          <path d="M 13,19 Q 17,23 21,19 Z" fill="#fef08a" />
          <!-- Rayos de fuego de la calabaza -->
          <g fill="#f97316" stroke="#ea580c" stroke-width="0.6">
            <polygon points="17,3 15,6 19,6" />
            <polygon points="4,16 7,14 7,18" />
            <polygon points="7,7 10,8 8,11" />
          </g>
          <!-- Nube Oscura Gótica con Tinte Púrpura -->
          <path d="M 42,32 H 14 A 7.5,7.5 0 0 1 12.5,17.5 A 11,11 0 0 1 37.5,18 A 7,7 0 0 1 42,32 Z" fill="#4a044e" stroke="#a855f7" stroke-width="1.8" />
          <ellipse cx="23" cy="24" rx="2" ry="2.5" fill="#fef08a" />
          <circle cx="23.5" cy="24" r="1.1" fill="#0f172a" />
          <ellipse cx="33" cy="24" rx="2" ry="2.5" fill="#fef08a" />
          <circle cx="32.5" cy="24" r="1.1" fill="#0f172a" />
          <path d="M 25,27 Q 28,30 31,27" stroke="#fef08a" stroke-width="1.4" fill="none" stroke-linecap="round" />
          <!-- Gotas de poción mágica morada y verde neón -->
          <path d="M 20,35 C 20,35 17,40 17,42 A 2.5,2.5 0 0 0 22,42 C 22,40 20,35 20,35 Z" fill="#10b981" stroke="#059669" stroke-width="0.8" />
          <path d="M 31,35 C 31,35 28,40 28,42 A 2.5,2.5 0 0 0 33,42 C 33,40 31,35 31,35 Z" fill="#c084fc" stroke="#a855f7" stroke-width="0.8" />
        </svg>
      `;

    case 'rain':
      // 🌧️🕷️ LLUVIA CON TELARAÑA Y ARAÑITA COLGANDO:
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-rain" aria-label="Lluvia con Araña de Halloween">
          <path d="M 40,28 H 13 A 8,8 0 0 1 11.5,14 A 11,11 0 0 1 35.5,14.5 A 7.5,7.5 0 0 1 40,28 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.8" />
          <!-- Gotas de lluvia densas moradas y cian -->
          <path d="M 11,33 Q 9,37 9,40 A 2.2,2.2 0 0 0 13.4,40 Q 13.4,37 11,33 Z" fill="#38bdf8" />
          <path d="M 37,33 Q 35,37 35,40 A 2.2,2.2 0 0 0 39.4,40 Q 39.4,37 37,33 Z" fill="#38bdf8" />
          <!-- Hilo de seda y araña colgante en el centro -->
          <line x1="24" y1="28" x2="24" y2="37" stroke="#e2e8f0" stroke-width="1" />
          <!-- Cuerpo de la araña -->
          <ellipse cx="24" cy="40" rx="2.5" ry="2" fill="#0f172a" stroke="#a855f7" stroke-width="0.8" />
          <!-- Patas de la araña -->
          <g stroke="#0f172a" stroke-width="1" stroke-linecap="round">
            <path d="M 22,39 Q 19,37 18,40" />
            <path d="M 22,41 Q 19,41 18,43" />
            <path d="M 26,39 Q 29,37 30,40" />
            <path d="M 26,41 Q 29,41 30,43" />
          </g>
        </svg>
      `;

    case 'heavy-rain':
      // 🌧️🦇 BASTINAZU TENEBROSO (LLUVIA FUERTE CON MURCIÉLAGOS EN EL TEMPORAL):
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-heavy-rain" aria-label="Bastinazu Tenebroso de Halloween">
          <path d="M 41,26 H 12 A 9,9 0 0 1 10,12 A 12,12 0 0 1 36,11.5 A 8.5,8.5 0 0 1 41,26 Z" fill="#0f172a" stroke="#581c87" stroke-width="2" />
          <!-- Murciélago luchando contra el viento -->
          <g transform="translate(18, 12)">
            <path d="M 1,5 Q 4,1 7,4 Q 10,1 13,5 Q 9,7 7,5 Q 5,7 1,5 Z" fill="#a855f7" />
          </g>
          <!-- Agujas densas inclinadas de aguacero fuerte -->
          <g stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round">
            <line x1="12" y1="30" x2="8" y2="44" />
            <line x1="20" y1="30" x2="16" y2="44" />
            <line x1="28" y1="30" x2="24" y2="44" />
            <line x1="36" y1="30" x2="32" y2="44" />
          </g>
        </svg>
      `;

    case 'storm':
      // ⛈️🏰 TORMENTA EN LA MANSIÓN ENCANTADA:
      // Nube negra con relámpago magenta/morado cayendo sobre el castillo encantado
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-storm" aria-label="Tormenta con Castillo Encantado">
          <!-- Silueta de Castillo / Mansión con torres picudas abajo -->
          <g fill="#0f172a" stroke="#3b0764" stroke-width="0.8">
            <rect x="7" y="32" width="6" height="13" />
            <polygon points="6,32 10,24 14,32" />
            <rect x="15" y="35" width="18" height="10" />
            <rect x="35" y="30" width="6" height="15" />
            <polygon points="34,30 38,22 42,30" />
            <!-- Ventana iluminada embrujada -->
            <rect x="22" y="38" width="3" height="4" fill="#facc15" stroke="none" />
          </g>
          <!-- Nube negra arriba -->
          <path d="M 41,23 H 12 A 8,8 0 0 1 10.5,10 A 11,11 0 0 1 36,9.5 A 7.5,7.5 0 0 1 41,23 Z" fill="#18181b" stroke="#9333ea" stroke-width="1.8" />
          <!-- Relámpago Magenta Eléctrico -->
          <polygon points="26,17 21,27 25,27 20,38 31,25 27,25" fill="#d946ef" stroke="#fdf4ff" stroke-width="1.2" />
        </svg>
      `;

    case 'hail':
      // 🧊💀 GRANIZO / PEDRISCU ESPECTRAL: Piedras afiladas de hielo de cripta
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-hail" aria-label="Pedriscu Espectral">
          <path d="M 40,28 H 13 A 8,8 0 0 1 11.5,14 A 11,11 0 0 1 35.5,14.5 A 7.5,7.5 0 0 1 40,28 Z" fill="#1e293b" stroke="#64748b" stroke-width="1.8" />
          <!-- Piedras talladas angulares con brillo gélido -->
          <polygon points="12,33 16,35 14,40 10,38" fill="#f1f5f9" stroke="#38bdf8" stroke-width="1.4" />
          <polygon points="23,34 28,32 30,38 26,41 22,38" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5" />
          <polygon points="35,34 38,37 36,41 32,39" fill="#f1f5f9" stroke="#38bdf8" stroke-width="1.4" />
          <!-- Chispa de impacto -->
          <line x1="22" y1="41" x2="20" y2="44" stroke="#e2e8f0" stroke-width="1.2" stroke-linecap="round" />
        </svg>
      `;

    case 'snow-light':
      // ❄️ FALISPOS DE SAMHAIN: Nube oscura con cristales helados ligeros
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-snow-light" aria-label="Falispos de Nieve">
          <path d="M 40,28 H 13 A 8,8 0 0 1 11.5,14 A 11,11 0 0 1 35.5,14.5 A 7.5,7.5 0 0 1 40,28 Z" fill="#334155" stroke="#64748b" stroke-width="1.8" />
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round">
            <line x1="15" y1="33" x2="15" y2="39" /><line x1="12" y1="36" x2="18" y2="36" />
            <line x1="33" y1="33" x2="33" y2="39" /><line x1="30" y1="36" x2="36" y2="36" />
          </g>
        </svg>
      `;

    case 'snow':
    case 'heavy-snow':
      // ❄️🧙‍♀️ NEVADONA CON SOMBRERO DE BRUJA: Nube con sombrero puntiagudo y copos de hielo
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-snow" aria-label="Nevadona de Halloween con Sombrero de Bruja">
          <!-- Sombrero de Bruja inclinado sobre la nube -->
          <g transform="translate(18, 1)">
            <polygon points="2,13 14,12 18,1" fill="#581c87" stroke="#3b0764" stroke-width="1" />
            <ellipse cx="8" cy="13" rx="7" ry="2" fill="#581c87" />
            <rect x="5" y="11" width="6" height="2" fill="#facc15" />
          </g>
          <!-- Nube helada blanca-pizarra -->
          <path d="M 40,30 H 13 A 8,8 0 0 1 11.5,16 A 11,11 0 0 1 35.5,16.5 A 7.5,7.5 0 0 1 40,30 Z" fill="#e2e8f0" stroke="#475569" stroke-width="1.8" />
          <!-- Copos helados cayendo -->
          <g stroke="#0284c7" stroke-width="1.8" stroke-linecap="round">
            <line x1="12" y1="35" x2="12" y2="43" /><line x1="8" y1="39" x2="16" y2="39" />
            <line x1="24" y1="35" x2="24" y2="43" /><line x1="20" y1="39" x2="28" y2="39" />
            <line x1="36" y1="35" x2="36" y2="43" /><line x1="32" y1="39" x2="40" y2="39" />
          </g>
        </svg>
      `;

    case 'sleet':
      // 🌧️❄️ AGUANIEVE DE AQUELARRE
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-sleet" aria-label="Aguanieve de Halloween">
          <path d="M 40,28 H 13 A 8,8 0 0 1 11.5,14 A 11,11 0 0 1 35.5,14.5 A 7.5,7.5 0 0 1 40,28 Z" fill="#1e293b" stroke="#64748b" stroke-width="1.8" />
          <path d="M 14,34 Q 12,38 12,41 A 2.2,2.2 0 0 0 16.4,41 Q 16.4,38 14,34 Z" fill="#38bdf8" />
          <g stroke="#c084fc" stroke-width="1.8" stroke-linecap="round">
            <line x1="27" y1="33" x2="27" y2="41" /><line x1="23" y1="37" x2="31" y2="37" />
          </g>
        </svg>
      `;

    default:
      // Nube misteriosa por defecto
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="halloween-svg-icon icon-hw-default" aria-label="Nube de Halloween">
          <path d="M 40,35 H 13 A 9,9 0 0 1 11.5,18 A 12,12 0 0 1 36.5,18.5 A 8.5,8.5 0 0 1 40,35 Z" fill="#1e293b" stroke="#7e22ce" stroke-width="1.8" />
          <ellipse cx="20" cy="25" rx="2" ry="2.5" fill="#facc15" />
          <ellipse cx="30" cy="25" rx="2" ry="2.5" fill="#facc15" />
        </svg>
      `;
  }
}
