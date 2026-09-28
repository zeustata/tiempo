/**
 * Catálogo Oficial de Iconos "Minimalista Neón" (Glow & Line Art)
 * Trazos finos luminosos con resplandor neón futurista sobre fondo oscuro
 */

export function getNeonWeatherSvg(iconKey, size = 32) {
  const sz = parseInt(size, 10) || 32;

  switch (iconKey) {
    case 'clear-day':
    case 'sun':
      // ☀️ SOL NEÓN DORADO GLOW
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Sol Neón">
          <defs>
            <filter id="neon-glow-sun" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g stroke="#facc15" stroke-width="2.2" stroke-linecap="round" filter="url(#neon-glow-sun)" fill="none">
            <circle cx="24" cy="24" r="10" />
            <line x1="24" y1="4" x2="24" y2="8" />
            <line x1="24" y1="40" x2="24" y2="44" />
            <line x1="4" y1="24" x2="8" y2="24" />
            <line x1="40" y1="24" x2="44" y2="24" />
            <line x1="10" y1="10" x2="13" y2="13" />
            <line x1="35" y1="35" x2="38" y2="38" />
            <line x1="10" y1="38" x2="13" y2="35" />
            <line x1="35" y1="13" x2="38" y2="10" />
          </g>
          <circle cx="24" cy="24" r="5" fill="#fef08a" opacity="0.4" />
        </svg>
      `;

    case 'clear-night':
    case 'moon':
      // 🌙 LUNA NEÓN CIAN & AZUL ELÉCTRICO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Luna Neón">
          <defs>
            <filter id="neon-glow-moon" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" filter="url(#neon-glow-moon)" fill="none">
            <path d="M 32,27 A 13,13 0 0 1 18,9 A 13,13 0 1 0 32,27 Z" />
          </g>
          <!-- Estrellas Neón -->
          <circle cx="36" cy="11" r="1.5" fill="#38bdf8" />
          <circle cx="41" cy="21" r="1.2" fill="#38bdf8" />
          <circle cx="27" cy="6" r="1.2" fill="#38bdf8" />
        </svg>
      `;

    case 'mostly-clear-day':
    case 'sun-small-cloud':
      // 🌤️ MAYORMENTE SOLEADO NEÓN — Sol neón grande + nubecita trazo neón pequeña
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Mayormente Soleado Neón">
          <defs>
            <filter id="neon-sun-big-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="neon-cloud-tiny-glow">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <!-- Sol neón grande protagonista -->
          <circle cx="22" cy="21" r="12" stroke="#fde047" stroke-width="2.5" fill="none" filter="url(#neon-sun-big-glow)" opacity="0.95"/>
          <!-- Rayos neón -->
          <g stroke="#fde047" stroke-width="2" stroke-linecap="round" filter="url(#neon-sun-big-glow)" opacity="0.85">
            <line x1="22" y1="4"  x2="22" y2="8" />
            <line x1="13" y1="7"  x2="16" y2="11" />
            <line x1="5"  y1="20" x2="9"  y2="20" />
            <line x1="31" y1="7"  x2="28" y2="11" />
            <line x1="39" y1="20" x2="35" y2="20" />
            <line x1="13" y1="33" x2="16" y2="30" />
            <line x1="31" y1="33" x2="28" y2="30" />
          </g>
          <!-- Brillo interior sol -->
          <circle cx="22" cy="21" r="6" stroke="#ffffff" stroke-width="1" fill="none" opacity="0.4"/>
          <!-- Nubecita neón PEQUEÑA en esquina inferior derecha -->
          <path d="M 47,45 H 33 A 5,5 0 0 1 32,37 A 7,7 0 0 1 46,37.5 A 4.5,4.5 0 0 1 47,45 Z"
                stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"
                filter="url(#neon-cloud-tiny-glow)" opacity="0.9"/>
        </svg>
      `;

    case 'resol':
      // 🌥️☀️ RESOL NEÓN — Sol neón + nube grande trazo difuso + nube pequeña sólida neón
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Resol Neón">
          <defs>
            <filter id="neon-resol-halo">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="neon-velo-glow">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="neon-cloud2-glow">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <!-- Halo dorado difuso (corona del resol) -->
          <circle cx="18" cy="17" r="15" stroke="#fde047" stroke-width="1" fill="none" opacity="0.25" filter="url(#neon-resol-halo)"/>
          <!-- Sol neón protagonista -->
          <circle cx="18" cy="17" r="9" stroke="#fde047" stroke-width="2.2" fill="none" filter="url(#neon-resol-halo)" opacity="0.95"/>
          <!-- Rayos cortos velados -->
          <g stroke="#fde047" stroke-width="1.6" stroke-linecap="round" opacity="0.55" filter="url(#neon-resol-halo)">
            <line x1="18" y1="3"  x2="18" y2="7" />
            <line x1="9"  y1="7"  x2="12" y2="10" />
            <line x1="4"  y1="17" x2="8"  y2="17" />
            <line x1="27" y1="7"  x2="24" y2="10" />
            <line x1="32" y1="17" x2="28" y2="17" />
          </g>
          <!-- NUBE GRANDE SEMITRANSPARENTE — trazo discontinuo neón (velo nuboso) -->
          <path d="M 44,37 H 14 A 9,9 0 0 1 12.5,20 A 12,12 0 0 1 40,20.5 A 8.5,8.5 0 0 1 44,37 Z"
                stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                stroke-dasharray="4,3" fill="none" filter="url(#neon-velo-glow)" opacity="0.55"/>
          <!-- NUBE PEQUEÑA SÓLIDA (trazo continuo neón — primer plano) -->
          <path d="M 47,46 H 33 A 5.5,5.5 0 0 1 32,38 A 7.5,7.5 0 0 1 46,38.5 A 5,5 0 0 1 47,46 Z"
                stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
                fill="none" filter="url(#neon-cloud2-glow)" opacity="0.95"/>
        </svg>
      `;

    case 'partly-cloudy-day':
    case 'cloud-sun':
      // ⛅ SOL Y NUBE NEÓN
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Sol y Nube Neón">
          <defs>
            <filter id="neon-glow-cloudsun" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <!-- Sol de fondo -->
          <g stroke="#f59e0b" stroke-width="2" stroke-linecap="round" fill="none">
            <path d="M 14,14 A 8,8 0 1 1 26,14" />
            <line x1="19" y1="4" x2="19" y2="7" />
            <line x1="7" y1="13" x2="10" y2="13" />
            <line x1="10" y1="7" x2="12" y2="9" />
            <line x1="28" y1="7" x2="26" y2="9" />
          </g>
          <!-- Nube Neón Cian -->
          <path d="M 38,37 H 16 A 7,7 0 0 1 14.5,23.5 A 10,10 0 0 1 34,24 A 7,7 0 0 1 38,37 Z" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#neon-glow-cloudsun)" />
        </svg>
      `;

    case 'partly-cloudy-night':
    case 'cloud-moon':
      // ☁️🌙 LUNA Y NUBE NEÓN NOCHE
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Luna y Nube Neón">
          <defs>
            <filter id="neon-glow-cloudmoon" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <!-- Luna -->
          <path d="M 27,17 A 8,8 0 0 1 18,5 A 8,8 0 1 0 27,17 Z" stroke="#818cf8" stroke-width="1.8" fill="none" />
          <!-- Nube Neón -->
          <path d="M 38,37 H 16 A 7,7 0 0 1 14.5,23.5 A 10,10 0 0 1 34,24 A 7,7 0 0 1 38,37 Z" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#neon-glow-cloudmoon)" />
        </svg>
      `;

    case 'cloudy':
    case 'cloud':
      // ☁️ NUBE NEÓN MINIMALISTA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Nube Neón">
          <defs>
            <filter id="neon-glow-cloud" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 40,36 H 14 A 8.5,8.5 0 0 1 12.5,19.5 A 11.5,11.5 0 0 1 36.5,20.5 A 8,8 0 0 1 40,36 Z" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#neon-glow-cloud)" />
          <path d="M 34,32 H 18 A 5.5,5.5 0 0 1 17,22 A 7.5,7.5 0 0 1 32,23 A 5,5 0 0 1 34,32 Z" stroke="#818cf8" stroke-width="1.2" stroke-dasharray="3 3" fill="none" opacity="0.6" />
        </svg>
      `;

    case 'fog':
    case 'borrina':
      // 🌫️ NIEBLA NEÓN
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Niebla Neón">
          <defs>
            <filter id="neon-glow-fog" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" filter="url(#neon-glow-fog)">
            <line x1="8" y1="14" x2="40" y2="14" />
            <line x1="5" y1="22" x2="43" y2="22" stroke="#818cf8" />
            <line x1="10" y1="30" x2="38" y2="30" />
            <line x1="7" y1="38" x2="41" y2="38" stroke="#818cf8" />
          </g>
        </svg>
      `;

    case 'drizzle':
    case 'orbayu':
      // 🌦️ ORBAYU NEÓN (1 solo haz neón fino, 0.1 - 0.4 mm/h)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Orbayu Neón">
          <defs>
            <filter id="neon-glow-drizzle" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 38,24 H 14 A 7,7 0 0 1 12.5,10.5 A 9.5,9.5 0 0 1 33,11 A 6.5,6.5 0 0 1 38,24 Z" stroke="#38bdf8" stroke-width="2" fill="none" filter="url(#neon-glow-drizzle)" />
          <!-- 1 SOLO HAZ DE ORBAYU CENTRAL -->
          <line x1="24" y1="30" x2="21" y2="39" stroke="#06b6d4" stroke-width="2.2" stroke-linecap="round" filter="url(#neon-glow-drizzle)" />
        </svg>
      `;

    case 'rain':
    case 'rain-moderate':
      // 🌧️ LLUVIA NEÓN (3 trazos neón regulares, 0.5 - 2.4 mm/h)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Lluvia Neón">
          <defs>
            <filter id="neon-glow-rain" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 40,24 H 13 A 7.5,7.5 0 0 1 11.5,9.5 A 10.5,10.5 0 0 1 35.5,10 A 7,7 0 0 1 40,24 Z" stroke="#38bdf8" stroke-width="2.2" fill="none" filter="url(#neon-glow-rain)" />
          <g stroke="#0284c7" stroke-width="2.4" stroke-linecap="round" filter="url(#neon-glow-rain)">
            <line x1="14" y1="30" x2="9" y2="42" />
            <line x1="23" y1="30" x2="18" y2="42" />
            <line x1="32" y1="30" x2="27" y2="42" />
          </g>
        </svg>
      `;

    case 'heavy-rain':
      // 🌧️🌊 BASTINAZU NEÓN (Cortina densa de 5 trazos neón con fuerza, >= 2.5 mm/h, SIN RAYO)
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Bastinazu Neón">
          <defs>
            <filter id="neon-glow-heavy" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 41,23 H 12 A 8,8 0 0 1 10.5,8 A 11,11 0 0 1 36.5,8.5 A 7.5,7.5 0 0 1 41,23 Z" stroke="#60a5fa" stroke-width="2.2" fill="none" filter="url(#neon-glow-heavy)" />
          <!-- Cortina de 5 trazos de lluvia densa inclinada -->
          <g stroke="#38bdf8" stroke-width="2.4" stroke-linecap="round" filter="url(#neon-glow-heavy)">
            <line x1="10" y1="28" x2="5" y2="42" />
            <line x1="17" y1="29" x2="12" y2="43" stroke="#0284c7" />
            <line x1="24" y1="28" x2="19" y2="42" />
            <line x1="31" y1="29" x2="26" y2="43" stroke="#0284c7" />
            <line x1="38" y1="28" x2="33" y2="42" />
          </g>
        </svg>
      `;

    case 'storm':
      // ⛈️ TORMENTA NEÓN CON RAYO RESPLANDECIENTE
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Tormenta Neón">
          <defs>
            <filter id="neon-glow-storm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 40,22 H 13 A 7.5,7.5 0 0 1 11.5,7.5 A 10.5,10.5 0 0 1 35.5,8 A 7,7 0 0 1 40,22 Z" stroke="#818cf8" stroke-width="2.2" fill="none" />
          <!-- Rayo Neón Amarillo Fuego -->
          <polygon points="24,18 16,30 22,30 18,44 32,26 25,26" fill="#facc15" stroke="#fef08a" stroke-width="1.2" filter="url(#neon-glow-storm)" />
        </svg>
      `;

    case 'snow-light':
      // ❄️ FALISPOS / NIEVE LIGERA NEÓN: 1 cristal neón sutil
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Falispos Neón">
          <defs>
            <filter id="neon-glow-snow-light" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" filter="url(#neon-glow-snow-light)">
            <line x1="24" y1="12" x2="24" y2="36" />
            <line x1="12" y1="24" x2="36" y2="24" />
            <line x1="15" y1="15" x2="33" y2="33" />
            <line x1="15" y1="33" x2="33" y2="15" />
          </g>
          <circle cx="24" cy="24" r="2.2" fill="#ffffff" />
        </svg>
      `;

    case 'snow':
      // ❄️ NIEVE NEÓN CRISTAL MODERADA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Nieve Neón">
          <defs>
            <filter id="neon-glow-snow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g stroke="#38bdf8" stroke-width="2" stroke-linecap="round" filter="url(#neon-glow-snow)">
            <!-- Eje vertical y horizontal -->
            <line x1="24" y1="6" x2="24" y2="42" />
            <line x1="6" y1="24" x2="42" y2="24" />
            <!-- Diagonales -->
            <line x1="11" y1="11" x2="37" y2="37" />
            <line x1="11" y1="37" x2="37" y2="11" />
            <!-- Ramificaciones en V -->
            <polyline points="21,11 24,14 27,11" fill="none" />
            <polyline points="21,37 24,34 27,37" fill="none" />
            <polyline points="11,21 14,24 11,27" fill="none" />
            <polyline points="37,21 34,24 37,27" fill="none" />
          </g>
          <circle cx="24" cy="24" r="3" fill="#ffffff" />
        </svg>
      `;

    case 'heavy-snow':
    case 'nevadona':
      // ❄️🏔️ NEVADONA FUERTE NEÓN: Nube cian intensa con cortina de destellos de nieve
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Nevadona Neón">
          <defs>
            <filter id="neon-glow-heavy-snow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 40,24 H 13 A 7.5,7.5 0 0 1 11.5,9.5 A 10.5,10.5 0 0 1 35.5,10 A 7,7 0 0 1 40,24 Z" stroke="#38bdf8" stroke-width="2.2" fill="none" filter="url(#neon-glow-heavy-snow)" />
          <!-- 5 Cristales de nieve neón a dos niveles -->
          <g stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" filter="url(#neon-glow-heavy-snow)">
            <!-- Copo 1 -->
            <line x1="10" y1="30" x2="10" y2="36" /><line x1="7" y1="33" x2="13" y2="33" />
            <!-- Copo 2 -->
            <line x1="17" y1="35" x2="17" y2="43" /><line x1="13" y1="39" x2="21" y2="39" />
            <!-- Copo 3 (Central) -->
            <line x1="25" y1="28" x2="25" y2="36" /><line x1="21" y1="32" x2="29" y2="32" />
            <!-- Copo 4 -->
            <line x1="33" y1="35" x2="33" y2="43" /><line x1="29" y1="39" x2="37" y2="39" />
            <!-- Copo 5 -->
            <line x1="40" y1="30" x2="40" y2="36" /><line x1="37" y1="33" x2="43" y2="33" />
          </g>
        </svg>
      `;

    case 'sleet':
      // 🌧️❄️ AGUANIEVE NEÓN: Haz de lluvia cian y cristal de nieve blanco intercalados
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Aguanieve Neón">
          <defs>
            <filter id="neon-glow-sleet" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 40,24 H 13 A 7.5,7.5 0 0 1 11.5,9.5 A 10.5,10.5 0 0 1 35.5,10 A 7,7 0 0 1 40,24 Z" stroke="#38bdf8" stroke-width="2.2" fill="none" />
          <!-- Rayas de lluvia líquida cian -->
          <line x1="14" y1="31" x2="11" y2="40" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" filter="url(#neon-glow-sleet)" />
          <line x1="36" y1="31" x2="33" y2="40" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" filter="url(#neon-glow-sleet)" />
          <!-- Copo de nieve neón blanco en el centro -->
          <g stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" filter="url(#neon-glow-sleet)">
            <line x1="24" y1="30" x2="24" y2="42" />
            <line x1="18" y1="36" x2="30" y2="36" />
            <line x1="20" y1="32" x2="28" y2="40" />
            <line x1="20" y1="40" x2="28" y2="32" />
          </g>
        </svg>
      `;

    case 'hail':
      // 🧊 GRANIZO / PEDRISCU NEÓN: Nube violeta con gemas de hielo anguladas en caída dura
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon" aria-label="Granizo Neón">
          <defs>
            <filter id="neon-glow-hail" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M 40,24 H 13 A 7.5,7.5 0 0 1 11.5,9.5 A 10.5,10.5 0 0 1 35.5,10 A 7,7 0 0 1 40,24 Z" stroke="#818cf8" stroke-width="2.2" fill="none" />
          <!-- Diamantes/piedras anguladas de hielo neón -->
          <polygon points="14,30 18,34 14,38 10,34" fill="#ffffff" stroke="#38bdf8" stroke-width="1.5" filter="url(#neon-glow-hail)" />
          <polygon points="25,32 30,37 25,43 20,37" fill="#ffffff" stroke="#38bdf8" stroke-width="1.8" filter="url(#neon-glow-hail)" />
          <polygon points="36,29 40,33 36,37 32,33" fill="#ffffff" stroke="#38bdf8" stroke-width="1.5" filter="url(#neon-glow-hail)" />
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon neon-icon">
          <path d="M 40,36 H 14 A 8.5,8.5 0 0 1 12.5,19.5 A 11.5,11.5 0 0 1 36.5,20.5 A 8,8 0 0 1 40,36 Z" stroke="#38bdf8" stroke-width="2.2" fill="none" />
        </svg>
      `;
  }
}
