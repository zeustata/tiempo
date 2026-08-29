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
          <!-- Gotitas perladas -->
          <g fill="url(#glass-pearl-drop)">
            <ellipse cx="14" cy="30" rx="2" ry="3.5" transform="rotate(-15 14 30)" />
            <ellipse cx="24" cy="32" rx="2" ry="3.5" transform="rotate(-15 24 32)" />
            <ellipse cx="34" cy="30" rx="2" ry="3.5" transform="rotate(-15 34 30)" />
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
