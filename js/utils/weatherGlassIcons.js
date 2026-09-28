/**
 * Catálogo Oficial de Iconos "Cristal 3D / Glassmorphism"
 * Capas de vidrio esmerilado translúcido, reflejos especulares y volumen 3D premium
 */

export function getGlassWeatherSvg(iconKey, size = 32) {
  const sz = parseInt(size, 10) || 32;

  switch (iconKey) {
    case 'clear-day':
    case 'sun':
      // ☀️ SOL CRISTAL 3D CON REFLEJOS ORO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Sol Cristal 3D">
          <defs>
            <radialGradient id="glass-sun-core" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#fffbeb" />
              <stop offset="30%" stop-color="#fde047" />
              <stop offset="75%" stop-color="#eab308" />
              <stop offset="100%" stop-color="#ca8a04" />
            </radialGradient>
            <linearGradient id="glass-ray-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fde047" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ca8a04" stop-opacity="0.3" />
            </linearGradient>
            <filter id="glass-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#ca8a04" flood-opacity="0.4"/>
            </filter>
          </defs>
          <!-- Corona de Rayos de Cristal -->
          <g fill="url(#glass-ray-grad)" opacity="0.85">
            <rect x="22.5" y="2" width="3" height="7" rx="1.5" />
            <rect x="22.5" y="39" width="3" height="7" rx="1.5" />
            <rect x="2" y="22.5" width="7" height="3" rx="1.5" />
            <rect x="39" y="22.5" width="7" height="3" rx="1.5" />
            <rect x="7" y="7" width="3" height="6" rx="1.5" transform="rotate(-45 8.5 10)" />
            <rect x="35" y="35" width="3" height="6" rx="1.5" transform="rotate(-45 36.5 38)" />
            <rect x="7" y="35" width="3" height="6" rx="1.5" transform="rotate(45 8.5 38)" />
            <rect x="35" y="7" width="3" height="6" rx="1.5" transform="rotate(45 36.5 10)" />
          </g>
          <!-- Esfera de Vidrio Solar 3D -->
          <circle cx="24" cy="24" r="13" fill="url(#glass-sun-core)" filter="url(#glass-shadow)" />
          <!-- Reflejo Especular Superior -->
          <ellipse cx="20" cy="18" rx="6" ry="3.5" fill="#ffffff" opacity="0.6" transform="rotate(-25 20 18)" />
        </svg>
      `;

    case 'clear-night':
    case 'moon':
      // 🌙 LUNA CRISTAL AZUL PLATA 3D
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Luna Cristal 3D">
          <defs>
            <linearGradient id="glass-moon-grad" x1="20%" y1="10%" x2="80%" y2="90%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="35%" stop-color="#7dd3fc" />
              <stop offset="85%" stop-color="#0284c7" />
              <stop offset="100%" stop-color="#0369a1" />
            </linearGradient>
            <filter id="glass-moon-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#0284c7" flood-opacity="0.45"/>
            </filter>
          </defs>
          <!-- Cuerpo de Luna Translúcida -->
          <path d="M 33,28 A 14,14 0 0 1 18,9 A 14,14 0 1 0 33,28 Z" fill="url(#glass-moon-grad)" filter="url(#glass-moon-shadow)" />
          <!-- Reflejo de borde vítreo -->
          <path d="M 30,26 A 12,12 0 0 1 19,11 A 14,14 0 0 0 20,24 A 12,12 0 0 0 30,26 Z" fill="#ffffff" opacity="0.4" />
          <!-- Estrellas de Cristal -->
          <circle cx="36" cy="10" r="2" fill="#ffffff" opacity="0.9" />
          <circle cx="42" cy="20" r="1.4" fill="#7dd3fc" opacity="0.8" />
        </svg>
      `;

    case 'mostly-clear-day':
    case 'sun-small-cloud':
      // 🌤️ MAYORMENTE SOLEADO — Sol 3D grande + nubecita cristal pequeña en esquina
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Mayormente Soleado Cristal">
          <defs>
            <radialGradient id="glass-sun-big" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stop-color="#fffbeb" />
              <stop offset="35%" stop-color="#fde047" />
              <stop offset="100%" stop-color="#ca8a04" />
            </radialGradient>
            <linearGradient id="glass-cloud-tiny" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.7" />
            </linearGradient>
            <filter id="glass-sun-big-glow">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#fbbf24" flood-opacity="0.55"/>
            </filter>
          </defs>
          <!-- Sol grande protagonista 3D -->
          <circle cx="22" cy="21" r="14" fill="url(#glass-sun-big)" filter="url(#glass-sun-big-glow)" />
          <!-- Reflejo especular en el sol -->
          <ellipse cx="17" cy="15" rx="5" ry="2.8" fill="#ffffff" opacity="0.55" transform="rotate(-25 17 15)" />
          <!-- Rayos finos -->
          <g stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" opacity="0.7">
            <line x1="22" y1="4"  x2="22" y2="7" />
            <line x1="13" y1="7"  x2="15" y2="10" />
            <line x1="5"  y1="20" x2="8"  y2="20" />
            <line x1="31" y1="7"  x2="29" y2="10" />
            <line x1="39" y1="20" x2="36" y2="20" />
          </g>
          <!-- Nubecita pequeña cristal — esquina inferior derecha -->
          <path d="M 47,45 H 33 A 5,5 0 0 1 32,37 A 7,7 0 0 1 46,37.5 A 4.5,4.5 0 0 1 47,45 Z"
                fill="url(#glass-cloud-tiny)" stroke="rgba(255,255,255,0.7)" stroke-width="1" />
          <path d="M 34,38.5 A 5.5,5.5 0 0 1 45,39" stroke="#ffffff" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.75" />
        </svg>
      `;

    case 'resol':
      // 🌥️☀️ RESOL / SOL TAMIZÁU — Sol 3D + velo nuboso semitransparente grande + nube pequeña sólida
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Resol Sol Tamizado Cristal">
          <defs>
            <radialGradient id="glass-resol-sun" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stop-color="#fffbeb" />
              <stop offset="40%" stop-color="#fde047" />
              <stop offset="100%" stop-color="#d97706" />
            </radialGradient>
            <!-- Gradiente del velo nuboso — semitransparente -->
            <linearGradient id="glass-velo" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#e2e8f0" stop-opacity="0.55" />
              <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.40" />
            </linearGradient>
            <!-- Nube pequeña sólida -->
            <linearGradient id="glass-cloud-small" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.75" />
            </linearGradient>
            <filter id="glass-resol-halo">
              <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#fbbf24" flood-opacity="0.4"/>
            </filter>
          </defs>
          <!-- Halo dorado difuso (corona del resol) -->
          <circle cx="18" cy="17" r="15" fill="rgba(251,191,36,0.15)" />
          <!-- Sol con halo -->
          <circle cx="18" cy="17" r="9" fill="url(#glass-resol-sun)" filter="url(#glass-resol-halo)" />
          <!-- Reflejo especular en el sol -->
          <ellipse cx="14" cy="13" rx="3.5" ry="2" fill="#ffffff" opacity="0.5" transform="rotate(-25 14 13)" />
          <!-- Rayos cortos y difusos -->
          <g stroke="#f59e0b" stroke-width="1.4" stroke-linecap="round" opacity="0.55">
            <line x1="18" y1="3"  x2="18" y2="7" />
            <line x1="9"  y1="7"  x2="12" y2="10" />
            <line x1="4"  y1="17" x2="8"  y2="17" />
            <line x1="27" y1="7"  x2="24" y2="10" />
            <line x1="32" y1="17" x2="28" y2="17" />
          </g>
          <!-- NUBE GRANDE SEMITRANSPARENTE (velo nuboso — altoestratos filtrando el sol) -->
          <path d="M 44,37 H 14 A 9,9 0 0 1 12.5,20 A 12,12 0 0 1 40,20.5 A 8.5,8.5 0 0 1 44,37 Z"
                fill="url(#glass-velo)" stroke="rgba(148,163,184,0.45)" stroke-width="1.2" />
          <!-- Reflejo de borde vítreo en la nube grande -->
          <path d="M 16,21.5 A 10,10 0 0 1 38,22" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.5" />
          <!-- NUBE PEQUEÑA SÓLIDA (primer plano abajo-derecha) -->
          <path d="M 47,46 H 33 A 5.5,5.5 0 0 1 32,38 A 7.5,7.5 0 0 1 46,38.5 A 5,5 0 0 1 47,46 Z"
                fill="url(#glass-cloud-small)" stroke="rgba(255,255,255,0.6)" stroke-width="1" />
          <path d="M 34,39.5 A 6,6 0 0 1 45,40" stroke="#ffffff" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.7" />
        </svg>
      `;

    case 'partly-cloudy-day':
    case 'cloud-sun':
      // ⛅ SOL 3D Y NUBE DE CRISTAL ESMERILADO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Sol y Nube Cristal">
          <defs>
            <radialGradient id="glass-sun-mini" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#fffbeb" />
              <stop offset="40%" stop-color="#fde047" />
              <stop offset="100%" stop-color="#eab308" />
            </radialGradient>
            <linearGradient id="glass-cloud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
              <stop offset="60%" stop-color="#cbd5e1" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.65" />
            </linearGradient>
            <filter id="glass-cloud-glow">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.25"/>
            </filter>
          </defs>
          <!-- Sol de fondo -->
          <circle cx="19" cy="16" r="9" fill="url(#glass-sun-mini)" />
          <ellipse cx="16.5" cy="12.5" rx="3.5" ry="1.8" fill="#ffffff" opacity="0.6" transform="rotate(-25 16.5 12.5)" />
          <!-- Nube de Vidrio Esmerilado al frente -->
          <path d="M 39,37 H 15 A 8,8 0 0 1 13.5,22.5 A 11,11 0 0 1 35,23 A 7.5,7.5 0 0 1 39,37 Z" fill="url(#glass-cloud-grad)" filter="url(#glass-cloud-glow)" stroke="rgba(255,255,255,0.6)" stroke-width="1" />
          <path d="M 17,24 A 9,9 0 0 1 33,24.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.8" />
        </svg>
      `;

    case 'partly-cloudy-night':
    case 'cloud-moon':
      // ☁️🌙 LUNA Y NUBE DE CRISTAL NOCTURNO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Luna y Nube Cristal">
          <defs>
            <linearGradient id="glass-cloud-night-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#334155" stop-opacity="0.75" />
            </linearGradient>
          </defs>
          <!-- Luna -->
          <path d="M 27,17 A 8.5,8.5 0 0 1 18,5 A 8.5,8.5 0 1 0 27,17 Z" fill="#7dd3fc" />
          <!-- Nube de cristal nocturno -->
          <path d="M 39,37 H 15 A 8,8 0 0 1 13.5,22.5 A 11,11 0 0 1 35,23 A 7.5,7.5 0 0 1 39,37 Z" fill="url(#glass-cloud-night-grad)" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
        </svg>
      `;

    case 'cloudy':
    case 'cloud':
      // ☁️ NUBE DE VIDRIO ESMERILADO 3D
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Nube Cristal 3D">
          <defs>
            <linearGradient id="glass-pure-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
              <stop offset="50%" stop-color="#e2e8f0" stop-opacity="0.85" />
              <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.7" />
            </linearGradient>
            <filter id="glass-drop-shadow">
              <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#0f172a" flood-opacity="0.3"/>
            </filter>
          </defs>
          <path d="M 41,36 H 13 A 9,9 0 0 1 11.5,19 A 12.5,12.5 0 0 1 37,20 A 8.5,8.5 0 0 1 41,36 Z" fill="url(#glass-pure-cloud)" filter="url(#glass-drop-shadow)" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" />
          <!-- Brillo de relieve vítreo -->
          <path d="M 14,20 A 10,10 0 0 1 35,21" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.9" />
        </svg>
      `;

    case 'fog':
    case 'borrina':
      // 🌫️ NIEBLA DE CRISTAL TRANSLÚCIDO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Niebla Cristal 3D">
          <defs>
            <linearGradient id="glass-fog-bar" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0.3" />
            </linearGradient>
          </defs>
          <rect x="8" y="13" width="32" height="4" rx="2" fill="url(#glass-fog-bar)" />
          <rect x="4" y="21" width="40" height="4.5" rx="2.2" fill="url(#glass-fog-bar)" />
          <rect x="9" y="29" width="30" height="4" rx="2" fill="url(#glass-fog-bar)" />
          <rect x="6" y="37" width="36" height="4.5" rx="2.2" fill="url(#glass-fog-bar)" />
        </svg>
      `;

    case 'drizzle':
    case 'orbayu':
      // 🌦️ ORBAYU CON GOTAS DE CRISTAL PERLADAS
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Orbayu Cristal 3D">
          <defs>
            <linearGradient id="glass-drizzle-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.75" />
            </linearGradient>
            <linearGradient id="glass-pearl-drop" x1="20%" y1="10%" x2="80%" y2="90%">
              <stop offset="0%" stop-color="#e0f2fe" />
              <stop offset="50%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#0284c7" />
            </linearGradient>
          </defs>
          <!-- Nube -->
          <path d="M 39,22 H 13 A 7,7 0 0 1 11.5,8.5 A 10,10 0 0 1 33,9 A 6.5,6.5 0 0 1 39,22 Z" fill="url(#glass-drizzle-cloud)" stroke="rgba(255,255,255,0.7)" stroke-width="1" />
          <!-- 1 SOLA GOTA PERLADA CENTRAL -->
          <g fill="url(#glass-pearl-drop)">
            <ellipse cx="24" cy="32" rx="2.5" ry="4.5" transform="rotate(-10 24 32)" />
          </g>
        </svg>
      `;

    case 'rain':
    case 'rain-moderate':
      // 🌧️ LLUVIA CRISTAL 3D
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Lluvia Cristal 3D">
          <defs>
            <linearGradient id="glass-rain-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#475569" stop-opacity="0.8" />
            </linearGradient>
            <linearGradient id="glass-crystal-drop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#7dd3fc" />
              <stop offset="100%" stop-color="#0369a1" />
            </linearGradient>
          </defs>
          <!-- Nube de tormenta vítrea -->
          <path d="M 41,23 H 13 A 7.5,7.5 0 0 1 11.5,8 A 11,11 0 0 1 36,9 A 7,7 0 0 1 41,23 Z" fill="url(#glass-rain-cloud)" stroke="rgba(255,255,255,0.5)" stroke-width="1" />
          <!-- Gotas de lluvia cristalinas -->
          <g fill="url(#glass-crystal-drop)">
            <path d="M 14,28 C 14,28 10,36 10,39 A 3.5,3.5 0 0 0 17,39 C 17,36 14,28 14,28 Z" />
            <path d="M 25,30 C 25,30 21,38 21,41 A 3.5,3.5 0 0 0 28,41 C 28,38 25,30 25,30 Z" />
            <path d="M 36,28 C 36,28 32,36 32,39 A 3.5,3.5 0 0 0 39,39 C 39,36 36,28 36,28 Z" />
          </g>
        </svg>
      `;

    case 'heavy-rain':
      // 🌧️🌊 BASTINAZU CRISTAL 3D (Cortina densa de 5 gotas cristal, >= 2.5 mm/h, SIN RAYO)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Bastinazu Cristal 3D">
          <defs>
            <linearGradient id="glass-heavy-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#475569" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#1e293b" stop-opacity="0.85" />
            </linearGradient>
            <linearGradient id="glass-heavy-drop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#0284c7" />
            </linearGradient>
          </defs>
          <path d="M 41,22 H 12 A 8,8 0 0 1 10.5,7.5 A 11.5,11.5 0 0 1 36.5,8 A 7.5,7.5 0 0 1 41,22 Z" fill="url(#glass-heavy-cloud)" stroke="rgba(255,255,255,0.4)" stroke-width="1" />
          <!-- Cortina de 5 gotas densas inclinadas -->
          <g fill="url(#glass-heavy-drop)">
            <path d="M 9,27 C 9,27 6,34 6,37 A 3,3 0 0 0 12,37 C 12,34 9,27 9,27 Z" />
            <path d="M 17,30 C 17,30 14,37 14,40 A 3,3 0 0 0 20,40 C 20,37 17,30 17,30 Z" />
            <path d="M 25,27 C 25,27 22,34 22,37 A 3,3 0 0 0 28,37 C 28,34 25,27 25,27 Z" />
            <path d="M 33,30 C 33,30 30,37 30,40 A 3,3 0 0 0 36,40 C 36,37 33,30 33,30 Z" />
            <path d="M 40,27 C 40,27 37,34 37,37 A 3,3 0 0 0 43,37 C 43,34 40,27 40,27 Z" />
          </g>
        </svg>
      `;

    case 'storm':
      // ⛈️ TORMENTA CRISTAL CON RAYO ORO 3D
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Tormenta Cristal 3D">
          <defs>
            <linearGradient id="glass-storm-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#475569" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#0f172a" stop-opacity="0.85" />
            </linearGradient>
            <linearGradient id="glass-bolt-grad" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stop-color="#fffbeb" />
              <stop offset="30%" stop-color="#fde047" />
              <stop offset="100%" stop-color="#eab308" />
            </linearGradient>
            <filter id="glass-bolt-glow">
              <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#facc15" flood-opacity="0.8"/>
            </filter>
          </defs>
          <!-- Nube de Obsidiana Vítrea -->
          <path d="M 41,21 H 12 A 8,8 0 0 1 10.5,5 A 12,12 0 0 1 36,6 A 7.5,7.5 0 0 1 41,21 Z" fill="url(#glass-storm-cloud)" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
          <!-- Rayo 3D de Oro Puro -->
          <polygon points="24,17 16,30 23,30 18,45 33,26 25,26" fill="url(#glass-bolt-grad)" filter="url(#glass-bolt-glow)" stroke="#fef08a" stroke-width="0.8" />
        </svg>
      `;

    case 'snow':
    case 'nevadona':
      // ❄️ NIEVE CRISTAL DE HIELO 3D
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon" aria-label="Nieve Cristal 3D">
          <defs>
            <linearGradient id="glass-ice-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="50%" stop-color="#bae6fd" />
              <stop offset="100%" stop-color="#38bdf8" />
            </linearGradient>
          </defs>
          <g stroke="url(#glass-ice-grad)" stroke-width="2.2" stroke-linecap="round">
            <line x1="24" y1="5" x2="24" y2="43" />
            <line x1="5" y1="24" x2="43" y2="24" />
            <line x1="10" y1="10" x2="38" y2="38" />
            <line x1="10" y1="38" x2="38" y2="10" />
            <!-- Pequeños prismas de hielo -->
            <polygon points="24,10 27,15 21,15" fill="#ffffff" />
            <polygon points="24,38 27,33 21,33" fill="#38bdf8" />
            <polygon points="10,24 15,21 15,27" fill="#ffffff" />
            <polygon points="38,24 33,21 33,27" fill="#38bdf8" />
          </g>
          <circle cx="24" cy="24" r="3.5" fill="#ffffff" stroke="#7dd3fc" stroke-width="1" />
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon glass-icon">
          <path d="M 41,36 H 13 A 9,9 0 0 1 11.5,19 A 12.5,12.5 0 0 1 37,20 A 8.5,8.5 0 0 1 41,36 Z" fill="#ffffff" />
        </svg>
      `;
  }
}
