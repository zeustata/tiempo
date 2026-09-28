/**
 * METEOASTUR LODE - Iconografía Tesla Clásico (Automotive Weather UI)
 * Estilo visual de alta gama inspirado en las interfaces de navegación de Tesla:
 * - Realismo meteorológico fiel (sin fantasías de diamantes o lásers)
 * - Volúmenes pulidos, gradientes satinados de carrocería y luces especulares
 * - Integración total de la escala hidrológica: Orbayu (1 gota), Moderada (3 gotas),
 *   Bastinazu (5 gotas sin rayo), Granizo (pedrisco de hielo real), Aguanieve y Nieve graduada.
 */

export function getTeslaWeatherSvg(key, size = 32) {
  const sz = size;

  switch (key) {
    case 'clear-day':
    case 'sun':
      // ☀️ SOLEADO: Sol noble con volumen esférico, corona de rayos estilizados y brillo central
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon tesla-sun" aria-label="Soleado Tesla">
          <defs>
            <radialGradient id="tsla-sun-grad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#fffbeb" />
              <stop offset="35%" stop-color="#fde047" />
              <stop offset="75%" stop-color="#f59e0b" />
              <stop offset="100%" stop-color="#d97706" />
            </radialGradient>
            <linearGradient id="tsla-ray-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fbbf24" />
              <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.2" />
            </linearGradient>
            <filter id="tsla-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <!-- Rayos estilizados de alta gama (8 ejes simétricos pulidos) -->
          <g stroke="#f59e0b" stroke-width="2.6" stroke-linecap="round" opacity="0.95">
            <line x1="24" y1="3" x2="24" y2="8" />
            <line x1="24" y1="40" x2="24" y2="45" />
            <line x1="3" y1="24" x2="8" y2="24" />
            <line x1="40" y1="24" x2="45" y2="24" />
            <line x1="9" y1="9" x2="13" y2="13" />
            <line x1="35" y1="35" x2="39" y2="39" />
            <line x1="9" y1="39" x2="13" y2="35" />
            <line x1="35" y1="13" x2="39" y2="9" />
          </g>
          <!-- Halo solar tenue -->
          <circle cx="24" cy="24" r="14" fill="#fef08a" opacity="0.25" filter="url(#tsla-glow)" />
          <!-- Disco solar con volumen 3D -->
          <circle cx="24" cy="24" r="11.5" fill="url(#tsla-sun-grad)" stroke="#f59e0b" stroke-width="0.8" />
          <!-- Reflejo especular superior -->
          <ellipse cx="20.5" cy="18" rx="4.5" ry="2.5" fill="#ffffff" opacity="0.6" />
        </svg>
      `;

    case 'clear-night':
    case 'moon':
      // 🌙 DESPEJADO DE NOCHE: Luna creciente noble y nítida con textura de relieve
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon tesla-moon" aria-label="Noche Despejada Tesla">
          <defs>
            <radialGradient id="tsla-moon-grad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="45%" stop-color="#fef08a" />
              <stop offset="85%" stop-color="#eab308" />
              <stop offset="100%" stop-color="#ca8a04" />
            </radialGradient>
            <filter id="tsla-moon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#tsla-moon-glow)">
            <path d="M 33,8 A 17,17 0 1 1 16,39 A 15,15 0 0 0 33,8 Z" fill="url(#tsla-moon-grad)" stroke="#ca8a04" stroke-width="0.8" />
          </g>
          <!-- Pequeñas estrellas de navegación satélite -->
          <circle cx="36" cy="14" r="1.2" fill="#ffffff" opacity="0.9" />
          <circle cx="41" cy="22" r="0.9" fill="#fef08a" opacity="0.8" />
          <circle cx="11" cy="12" r="1.1" fill="#ffffff" opacity="0.8" />
        </svg>
      `;

    case 'mostly-clear-day':
      // 🌤️ MAYORMENTE SOLEADO: Sol dominante con nubecita aerodinámica pulcra
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Mayormente Soleado Tesla">
          <defs>
            <radialGradient id="tsla-sun-mcd" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#fffbeb" />
              <stop offset="60%" stop-color="#fbbf24" />
              <stop offset="100%" stop-color="#d97706" />
            </radialGradient>
            <linearGradient id="tsla-cloud-satin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="70%" stop-color="#f1f5f9" />
              <stop offset="100%" stop-color="#cbd5e1" />
            </linearGradient>
            <filter id="tsla-cloud-shadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.25" />
            </filter>
          </defs>
          <!-- Sol protagonista central -->
          <g transform="translate(-2, -2)">
            <g stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" opacity="0.9">
              <line x1="22" y1="4" x2="22" y2="8" />
              <line x1="8" y1="18" x2="12" y2="18" />
              <line x1="32" y1="18" x2="36" y2="18" />
              <line x1="12" y1="8" x2="15" y2="11" />
              <line x1="32" y1="8" x2="29" y2="11" />
            </g>
            <circle cx="22" cy="18" r="9.5" fill="url(#tsla-sun-mcd)" stroke="#f59e0b" stroke-width="0.8" />
            <ellipse cx="19" cy="14" rx="3.5" ry="1.8" fill="#ffffff" opacity="0.55" />
          </g>
          <!-- Nube pequeña pulcra abajo a la derecha -->
          <g filter="url(#tsla-cloud-shadow)">
            <path d="M 43,39 H 23 A 6.5,6.5 0 0 1 21.8,26.5 A 9,9 0 0 1 39.5,27 A 6,6 0 0 1 43,39 Z" fill="url(#tsla-cloud-satin)" stroke="#94a3b8" stroke-width="0.8" />
            <path d="M 23,30 Q 30,24 37,28" stroke="#ffffff" stroke-width="1.2" fill="none" opacity="0.8" />
          </g>
        </svg>
      `;

    case 'mostly-clear-night':
      // ☁️🌙 MAYORMENTE DESPEJADO DE NOCHE
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Mayormente Despejado de Noche Tesla">
          <defs>
            <radialGradient id="tsla-mcn-moon" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="50%" stop-color="#fef08a" />
              <stop offset="100%" stop-color="#eab308" />
            </radialGradient>
            <linearGradient id="tsla-cloud-dark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#e2e8f0" />
              <stop offset="100%" stop-color="#94a3b8" />
            </linearGradient>
            <filter id="tsla-mcn-sh" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#020617" flood-opacity="0.35" />
            </filter>
          </defs>
          <!-- Luna -->
          <g transform="translate(6, -2)">
            <path d="M 25,6 A 12,12 0 1 1 13,28 A 11,11 0 0 0 25,6 Z" fill="url(#tsla-mcn-moon)" stroke="#ca8a04" stroke-width="0.8" />
          </g>
          <!-- Nube -->
          <g filter="url(#tsla-mcn-sh)">
            <path d="M 42,39 H 19 A 7,7 0 0 1 17.5,26 A 9.5,9.5 0 0 1 37.5,27 A 6.5,6.5 0 0 1 42,39 Z" fill="url(#tsla-cloud-dark)" stroke="#64748b" stroke-width="0.8" />
          </g>
        </svg>
      `;

    case 'partly-cloudy-day':
      // ⛅ NUBES Y CLAROS: Nube protagonista con sol emergiendo noblemente
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Nubes y Claros Tesla">
          <defs>
            <radialGradient id="tsla-pc-sun" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#fffbeb" />
              <stop offset="50%" stop-color="#fde047" />
              <stop offset="100%" stop-color="#d97706" />
            </radialGradient>
            <linearGradient id="tsla-cloud-main" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="60%" stop-color="#f8fafc" />
              <stop offset="100%" stop-color="#cbd5e1" />
            </linearGradient>
            <filter id="tsla-pc-shadow" x="-10%" y="-10%" width="125%" height="135%">
              <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" flood-color="#0f172a" flood-opacity="0.25" />
            </filter>
          </defs>
          <!-- Sol asomando arriba a la izquierda -->
          <g transform="translate(1, 1)">
            <g stroke="#f59e0b" stroke-width="2" stroke-linecap="round" opacity="0.85">
              <line x1="16" y1="4" x2="16" y2="8" />
              <line x1="6" y1="14" x2="10" y2="14" />
              <line x1="8" y1="7" x2="12" y2="10" />
              <line x1="24" y1="7" x2="21" y2="10" />
            </g>
            <circle cx="16" cy="14" r="8" fill="url(#tsla-pc-sun)" stroke="#f59e0b" stroke-width="0.8" />
          </g>
          <!-- Gran Nube Volumétrica -->
          <g filter="url(#tsla-pc-shadow)">
            <path d="M 42,39 H 14 A 8,8 0 0 1 12.5,23.5 A 11.5,11.5 0 0 1 37.5,24.5 A 7.5,7.5 0 0 1 42,39 Z" fill="url(#tsla-cloud-main)" stroke="#94a3b8" stroke-width="0.9" />
            <path d="M 15,28 Q 24,19 35,24" stroke="#ffffff" stroke-width="1.4" fill="none" opacity="0.9" />
          </g>
        </svg>
      `;

    case 'resol':
      // 🌥️ RESOL / SOL TAMIZÁU: Sol real difuso con halo y velo nuboso translúcido estratiforme
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon tesla-resol" aria-label="Resol Asturiano Tesla">
          <defs>
            <radialGradient id="tsla-resol-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fde047" stop-opacity="0.9" />
              <stop offset="40%" stop-color="#f59e0b" stop-opacity="0.5" />
              <stop offset="75%" stop-color="#ea580c" stop-opacity="0.2" />
              <stop offset="100%" stop-color="#d97706" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="tsla-resol-core" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="50%" stop-color="#fef08a" />
              <stop offset="100%" stop-color="#f59e0b" />
            </radialGradient>
            <linearGradient id="tsla-resol-veil" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.82" />
              <stop offset="50%" stop-color="#e2e8f0" stop-opacity="0.75" />
              <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.88" />
            </linearGradient>
            <linearGradient id="tsla-resol-lower" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="100%" stop-color="#94a3b8" />
            </linearGradient>
            <filter id="tsla-resol-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>
          <!-- Halo solar expansivo difuminado -->
          <circle cx="24" cy="18" r="16" fill="url(#tsla-resol-halo)" filter="url(#tsla-resol-blur)" />
          <!-- Disco solar central que deslumbra -->
          <circle cx="24" cy="18" r="9.5" fill="url(#tsla-resol-core)" stroke="#f59e0b" stroke-width="0.8" />
          <!-- Rayos sutiles filtrándose -->
          <g stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round" opacity="0.65">
            <line x1="24" y1="4" x2="24" y2="7" />
            <line x1="12" y1="9" x2="14" y2="11" />
            <line x1="36" y1="9" x2="34" y2="11" />
          </g>
          <!-- Manto estratiforme translúcido que tamiza la luz -->
          <path d="M 44,28 H 6 C 6,21 16,19 22,22 C 28,17 38,19 44,28 Z" fill="url(#tsla-resol-veil)" stroke="rgba(255,255,255,0.7)" stroke-width="0.8" />
          <!-- Nubecita baja sólida del horizonte -->
          <g filter="url(#tsla-pc-shadow)">
            <path d="M 43,40 H 17 A 7,7 0 0 1 15.5,27 A 10,10 0 0 1 37.5,28 A 6.5,6.5 0 0 1 43,40 Z" fill="url(#tsla-resol-lower)" stroke="#64748b" stroke-width="0.8" />
          </g>
        </svg>
      `;

    case 'cloudy':
    case 'cloud':
      // ☁️ NUBLADO / CUBIERTU: Doble nube con relieve y volumen aerodinámico
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Nublado Tesla">
          <defs>
            <linearGradient id="tsla-cloud-back" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#cbd5e1" />
              <stop offset="100%" stop-color="#94a3b8" />
            </linearGradient>
            <linearGradient id="tsla-cloud-front" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="65%" stop-color="#f1f5f9" />
              <stop offset="100%" stop-color="#cbd5e1" />
            </linearGradient>
          </defs>
          <!-- Nube trasera -->
          <path d="M 37,29 H 14 A 7,7 0 0 1 12.8,16 A 9.5,9.5 0 0 1 32.5,17 A 6.5,6.5 0 0 1 37,29 Z" fill="url(#tsla-cloud-back)" stroke="#64748b" stroke-width="0.8" />
          <!-- Nube delantera con sombra -->
          <g filter="url(#tsla-pc-shadow)">
            <path d="M 43,40 H 13 A 8,8 0 0 1 11.5,24.5 A 11.5,11.5 0 0 1 37.5,25.5 A 7.5,7.5 0 0 1 43,40 Z" fill="url(#tsla-cloud-front)" stroke="#94a3b8" stroke-width="0.9" />
            <path d="M 14,29 Q 23,20 35,25" stroke="#ffffff" stroke-width="1.3" fill="none" opacity="0.9" />
          </g>
        </svg>
      `;

    case 'fog':
      // 🌫️ NIEBLA / BORRINA: Nube suave y 3 barras aerodinámicas flotantes con gradiente
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Niebla Tesla">
          <defs>
            <linearGradient id="tsla-fog-bar" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.2" />
              <stop offset="25%" stop-color="#e2e8f0" stop-opacity="0.95" />
              <stop offset="75%" stop-color="#e2e8f0" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.2" />
            </linearGradient>
          </defs>
          <!-- Nube disipada arriba -->
          <path d="M 39,22 H 13 A 6.5,6.5 0 0 1 11.8,10 A 9.5,9.5 0 0 1 33.5,11 A 6.5,6.5 0 0 1 39,22 Z" fill="#e2e8f0" opacity="0.75" />
          <!-- 3 Barras horizontales limpias de niebla -->
          <rect x="6" y="27" width="36" height="3" rx="1.5" fill="url(#tsla-fog-bar)" />
          <rect x="10" y="33" width="28" height="3" rx="1.5" fill="url(#tsla-fog-bar)" />
          <rect x="14" y="39" width="20" height="3" rx="1.5" fill="url(#tsla-fog-bar)" />
        </svg>
      `;

    case 'drizzle':
      // 💧 ORBAYU / LLOVIZNA (0.1 - 0.4 mm/h): Nube suave con 1 SOLA GOTA pura y cristalina
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Orbayu Tesla">
          <defs>
            <linearGradient id="tsla-drop-pure" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="60%" stop-color="#0284c7" />
              <stop offset="100%" stop-color="#0369a1" />
            </linearGradient>
          </defs>
          <!-- Nube -->
          <path d="M 41,31 H 13 A 7.5,7.5 0 0 1 11.5,16.5 A 11,11 0 0 1 36.5,17 A 7,7 0 0 1 41,31 Z" fill="url(#tsla-cloud-main)" stroke="#94a3b8" stroke-width="0.8" />
          <!-- 1 ÚNICA Gota Central de Orbayu con reflejo blanco -->
          <g transform="translate(24, 39)">
            <path d="M 0,-6 C -3.2,-2 -3.5,2 0,4.5 C 3.5,2 3.2,-2 0,-6 Z" fill="url(#tsla-drop-pure)" stroke="#0284c7" stroke-width="0.6" />
            <circle cx="-0.9" cy="-0.5" r="0.8" fill="#ffffff" opacity="0.8" />
          </g>
        </svg>
      `;

    case 'rain':
      // 🌧️ LLUVIA MODERADA (0.5 - 2.4 mm/h): Nube con 3 GOTAS paralelas regulares
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Lluvia Moderada Tesla">
          <defs>
            <linearGradient id="tsla-rain-drop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#0284c7" />
            </linearGradient>
          </defs>
          <path d="M 41,30 H 13 A 7.5,7.5 0 0 1 11.5,15.5 A 11,11 0 0 1 36.5,16 A 7,7 0 0 1 41,30 Z" fill="url(#tsla-cloud-main)" stroke="#94a3b8" stroke-width="0.8" />
          <!-- 3 Gotas de precisión -->
          <!-- Gota 1 -->
          <g transform="translate(15, 39)">
            <path d="M 0,-5 C -2.8,-1.5 -3,1.8 0,4 C 3,1.8 2.8,-1.5 0,-5 Z" fill="url(#tsla-rain-drop)" />
            <circle cx="-0.8" cy="-0.5" r="0.7" fill="#ffffff" opacity="0.7" />
          </g>
          <!-- Gota 2 -->
          <g transform="translate(24, 40)">
            <path d="M 0,-5 C -2.8,-1.5 -3,1.8 0,4 C 3,1.8 2.8,-1.5 0,-5 Z" fill="url(#tsla-rain-drop)" />
            <circle cx="-0.8" cy="-0.5" r="0.7" fill="#ffffff" opacity="0.7" />
          </g>
          <!-- Gota 3 -->
          <g transform="translate(33, 39)">
            <path d="M 0,-5 C -2.8,-1.5 -3,1.8 0,4 C 3,1.8 2.8,-1.5 0,-5 Z" fill="url(#tsla-rain-drop)" />
            <circle cx="-0.8" cy="-0.5" r="0.7" fill="#ffffff" opacity="0.7" />
          </g>
        </svg>
      `;

    case 'heavy-rain':
      // 🌧️🌊 BASTINAZU / LLUVIA FUERTE (>= 2.5 mm/h): Nube plomiza con cortina densa de 5 gotas con fuerza (SIN RAYO)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Bastinazu Tesla">
          <defs>
            <linearGradient id="tsla-storm-cloud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#475569" />
              <stop offset="60%" stop-color="#334155" />
              <stop offset="100%" stop-color="#1e293b" />
            </linearGradient>
            <linearGradient id="tsla-heavy-drop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#60a5fa" />
              <stop offset="100%" stop-color="#1d4ed8" />
            </linearGradient>
          </defs>
          <!-- Nube de tormenta plomiza -->
          <path d="M 42,28 H 12 A 8,8 0 0 1 10.5,12.5 A 12,12 0 0 1 36.5,13.5 A 7.5,7.5 0 0 1 42,28 Z" fill="url(#tsla-storm-cloud-grad)" stroke="#0f172a" stroke-width="0.9" />
          <!-- Cortina de 5 gotas enérgicas inclinadas -->
          <g stroke="#38bdf8" stroke-width="2.4" stroke-linecap="round">
            <line x1="11" y1="33" x2="8" y2="42" />
            <line x1="18" y1="35" x2="15" y2="45" />
            <line x1="25" y1="32" x2="22" y2="42" />
            <line x1="32" y1="35" x2="29" y2="45" />
            <line x1="39" y1="33" x2="36" y2="42" />
          </g>
        </svg>
      `;

    case 'storm':
      // ⛈️ TORMENTA ELÉCTRICA: Nube grafito con relámpago dorado eléctrico natural y lluvia
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Tormenta Eléctrica Tesla">
          <defs>
            <linearGradient id="tsla-bolt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fffbeb" />
              <stop offset="50%" stop-color="#facc15" />
              <stop offset="100%" stop-color="#eab308" />
            </linearGradient>
          </defs>
          <path d="M 42,27 H 12 A 8,8 0 0 1 10.5,11.5 A 12,12 0 0 1 36.5,12.5 A 7.5,7.5 0 0 1 42,27 Z" fill="url(#tsla-storm-cloud-grad)" stroke="#0f172a" stroke-width="0.9" />
          <!-- Rayo dorado nítido -->
          <polygon points="25,18 16,31 23,31 18,45 33,27 26,27" fill="url(#tsla-bolt-grad)" stroke="#ca8a04" stroke-width="0.8" />
          <!-- Gotitas laterales -->
          <line x1="11" y1="34" x2="9" y2="41" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
          <line x1="38" y1="34" x2="36" y2="41" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        </svg>
      `;

    case 'hail':
      // 🧊 GRANIZO / PEDRISCU: Nube tormentosa con bolas y piedras de hielo blanco compacto cayendo
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Granizo Tesla">
          <defs>
            <radialGradient id="tsla-hail-stone" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="65%" stop-color="#e2e8f0" />
              <stop offset="100%" stop-color="#94a3b8" />
            </radialGradient>
          </defs>
          <path d="M 42,28 H 12 A 8,8 0 0 1 10.5,12.5 A 12,12 0 0 1 36.5,13.5 A 7.5,7.5 0 0 1 42,28 Z" fill="url(#tsla-storm-cloud-grad)" stroke="#0f172a" stroke-width="0.9" />
          <!-- Piedras y bolas duras de pedrisco con masa e impacto -->
          <!-- Piedra 1 -->
          <circle cx="12" cy="36" r="3.2" fill="url(#tsla-hail-stone)" stroke="#64748b" stroke-width="0.8" />
          <circle cx="11" cy="35" r="0.8" fill="#ffffff" />
          <!-- Piedra 2 (Grande irregular) -->
          <polygon points="23,34 29,32 31,38 27,42 22,39" fill="url(#tsla-hail-stone)" stroke="#64748b" stroke-width="0.9" />
          <circle cx="25" cy="35" r="0.9" fill="#ffffff" />
          <!-- Piedra 3 -->
          <circle cx="38" cy="36" r="3" fill="url(#tsla-hail-stone)" stroke="#64748b" stroke-width="0.8" />
          <circle cx="37" cy="35" r="0.7" fill="#ffffff" />
          <!-- Líneas de caída veloz -->
          <line x1="12" y1="41" x2="11" y2="44" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round" />
          <line x1="26" y1="43" x2="25" y2="46" stroke="#94a3b8" stroke-width="1.4" stroke-linecap="round" />
          <line x1="38" y1="41" x2="37" y2="44" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round" />
        </svg>
      `;

    case 'sleet':
      // 🌧️❄️ AGUANIEVE: Gotas de agua reales combinadas con copo de nieve nítido
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Aguanieve Tesla">
          <path d="M 42,29 H 13 A 7.5,7.5 0 0 1 11.5,14.5 A 11,11 0 0 1 36.5,15 A 7,7 0 0 1 42,29 Z" fill="url(#tsla-cloud-main)" stroke="#94a3b8" stroke-width="0.8" />
          <!-- Gota izquierda de agua -->
          <g transform="translate(13, 38)">
            <path d="M 0,-4.5 C -2.5,-1.2 -2.8,1.6 0,3.6 C 2.8,1.6 2.5,-1.2 0,-4.5 Z" fill="url(#tsla-rain-drop)" />
          </g>
          <!-- Copo central de nieve real -->
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round">
            <line x1="25" y1="33" x2="25" y2="44" />
            <line x1="19" y1="38.5" x2="31" y2="38.5" />
            <line x1="21" y1="34.5" x2="29" y2="42.5" />
            <line x1="21" y1="42.5" x2="29" y2="34.5" />
          </g>
          <circle cx="25" cy="38.5" r="1.5" fill="#ffffff" />
          <!-- Gota derecha de agua -->
          <g transform="translate(37, 38)">
            <path d="M 0,-4.5 C -2.5,-1.2 -2.8,1.6 0,3.6 C 2.8,1.6 2.5,-1.2 0,-4.5 Z" fill="url(#tsla-rain-drop)" />
          </g>
        </svg>
      `;

    case 'snow-light':
      // ❄️ FALISPOS / NIEVE LIGERA: 1 solo copo nítido y fino
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Falispos Tesla">
          <path d="M 42,30 H 13 A 7.5,7.5 0 0 1 11.5,15.5 A 11,11 0 0 1 36.5,16 A 7,7 0 0 1 42,30 Z" fill="url(#tsla-cloud-main)" stroke="#94a3b8" stroke-width="0.8" />
          <!-- 1 Copo central sutil -->
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round">
            <line x1="24" y1="33" x2="24" y2="43" />
            <line x1="19" y1="38" x2="29" y2="38" />
            <line x1="20.5" y1="34.5" x2="27.5" y2="41.5" />
            <line x1="20.5" y1="41.5" x2="27.5" y2="34.5" />
          </g>
          <circle cx="24" cy="38" r="1.3" fill="#ffffff" />
        </svg>
      `;

    case 'snow':
      // ❄️ NIEVE MODERADA: 3 copos limpios
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Nieve Tesla">
          <path d="M 42,29 H 13 A 7.5,7.5 0 0 1 11.5,14.5 A 11,11 0 0 1 36.5,15 A 7,7 0 0 1 42,29 Z" fill="url(#tsla-cloud-main)" stroke="#94a3b8" stroke-width="0.8" />
          <!-- 3 Copos de nieve bien distribuidos -->
          <g stroke="#38bdf8" stroke-width="1.6" stroke-linecap="round">
            <!-- Copo 1 -->
            <line x1="14" y1="35" x2="14" y2="43" /><line x1="10" y1="39" x2="18" y2="39" />
            <line x1="11" y1="36" x2="17" y2="42" /><line x1="11" y1="42" x2="17" y2="36" />
            <!-- Copo 2 -->
            <line x1="25" y1="34" x2="25" y2="42" /><line x1="21" y1="38" x2="29" y2="38" />
            <line x1="22" y1="35" x2="28" y2="41" /><line x1="22" y1="41" x2="28" y2="35" />
            <!-- Copo 3 -->
            <line x1="36" y1="35" x2="36" y2="43" /><line x1="32" y1="39" x2="40" y2="39" />
            <line x1="33" y1="36" x2="39" y2="42" /><line x1="33" y1="42" x2="39" y2="36" />
          </g>
          <circle cx="14" cy="39" r="1.1" fill="#ffffff" />
          <circle cx="25" cy="38" r="1.1" fill="#ffffff" />
          <circle cx="36" cy="39" r="1.1" fill="#ffffff" />
        </svg>
      `;

    case 'heavy-snow':
    case 'nevadona':
      // ❄️🏔️ NEVADONA FUERTE / COPIOSA: Nube ártica con cortina de 5 copos copiosos
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon" aria-label="Nevadona Tesla">
          <defs>
            <linearGradient id="tsla-arctic-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#f1f5f9" />
              <stop offset="70%" stop-color="#cbd5e1" />
              <stop offset="100%" stop-color="#64748b" />
            </linearGradient>
          </defs>
          <path d="M 42,28 H 12 A 8,8 0 0 1 10.5,12.5 A 12,12 0 0 1 36.5,13.5 A 7.5,7.5 0 0 1 42,28 Z" fill="url(#tsla-arctic-cloud)" stroke="#475569" stroke-width="0.9" />
          <!-- 5 Copos densos escalonados a dos alturas -->
          <g stroke="#0284c7" stroke-width="1.6" stroke-linecap="round">
            <line x1="9" y1="31" x2="9" y2="37" /><line x1="6" y1="34" x2="12" y2="34" />
            <line x1="17" y1="35" x2="17" y2="43" /><line x1="13" y1="39" x2="21" y2="39" />
            <line x1="25" y1="30" x2="25" y2="37" /><line x1="21.5" y1="33.5" x2="28.5" y2="33.5" />
            <line x1="33" y1="35" x2="33" y2="43" /><line x1="29" y1="39" x2="37" y2="39" />
            <line x1="41" y1="31" x2="41" y2="37" /><line x1="38" y1="34" x2="44" y2="34" />
          </g>
          <circle cx="17" cy="39" r="1.3" fill="#ffffff" />
          <circle cx="33" cy="39" r="1.3" fill="#ffffff" />
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon tesla-icon">
          <path d="M 42,38 H 14 A 8,8 0 0 1 12.5,22.5 A 11.5,11.5 0 0 1 37.5,23.5 A 7.5,7.5 0 0 1 42,38 Z" fill="url(#tsla-cloud-main)" stroke="#94a3b8" stroke-width="0.9" />
        </svg>
      `;
  }
}
