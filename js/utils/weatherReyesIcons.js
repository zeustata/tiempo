/**
 * Catálogo Oficial de Iconos "Especial Reyes Magos" (5 y 6 de Enero)
 * Diseñado con Lendo & Princesa para MeteoAstur Lode
 * 
 * PROTAGONISMO TOTAL DE LOS TRES REYES MAGOS (Melchor, Gaspar y Baltasar):
 * - Melchor: Anciano venerable, tez clara, barba y bigote blancos señoriales, manto carmesí y gran corona de oro con rubíes.
 * - Gaspar: Tez clara, barba y cabellos castaños/rubios, manto verde esmeralda y corona real de oro.
 * - Baltasar: Noble tez oscura africana, cabellos oscuros, manto azul zafiro y turbante regio oriental púrpura/oro con pluma y pedrería.
 * - La Gran Estrella de Oriente de 8 puntas guiando a los Tres Monarcas.
 * - Los Tres Cofres Sagrados: Oro, Incienso y Mirra.
 * - Caramelos y regalos de la mágica Cabalgata de Reyes.
 */

export function getReyesWeatherSvg(iconKey, size = 32) {
  const sz = parseInt(size, 10) || 32;

  switch (iconKey) {
    case 'clear-day':
    case 'sun':
      // 👑☀️ EL SOL DE LOS TRES REYES MAGOS: Los 3 Reyes juntos en primer plano bajo los rayos del Sol y la Estrella
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-sun" aria-label="Los Tres Reyes Magos con el Sol">
          <defs>
            <radialGradient id="rm-sun-bg" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="60%" stop-color="#facc15" />
              <stop offset="100%" stop-color="#f59e0b" />
            </radialGradient>
          </defs>

          <!-- Halo y rayos solares de fondo -->
          <g stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round">
            <line x1="24" y1="2" x2="24" y2="6" />
            <line x1="8" y1="8" x2="11" y2="11" />
            <line x1="40" y1="8" x2="37" y2="11" />
            <line x1="2" y1="24" x2="6" y2="24" />
            <line x1="42" y1="24" x2="46" y2="24" />
          </g>
          <circle cx="24" cy="22" r="16" fill="url(#rm-sun-bg)" opacity="0.35" />

          <!-- Gran Estrella de Oriente resplandeciente en la cúspide -->
          <g transform="translate(24, 7)">
            <polygon points="0,-6 1,-1 6,0 1,1 0,6 -1,1 -6,0 -1,-1" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.3" fill="#fef08a" />
          </g>

          <!-- === REY GASPAR (Izquierda: Manto esmeralda, barba castaña, corona de oro) === -->
          <g transform="translate(9, 21)">
            <!-- Hombro y manto verde esmeralda -->
            <path d="M -4,23 C -4,15 12,15 12,23 Z" fill="#15803d" stroke="#14532d" stroke-width="0.8" />
            <!-- Cabeza -->
            <circle cx="4" cy="9" r="6" fill="#fed7aa" stroke="#ca8a04" stroke-width="0.7" />
            <!-- Pelo y barba castaña -->
            <path d="M -2,7 Q -3,15 1,18 Q 4,20 7,18 Q 11,15 10,7 Q 8,5 4,5 Q 0,5 -2,7 Z" fill="#854d0e" />
            <circle cx="4" cy="8.5" r="4.2" fill="#fed7aa" />
            <!-- Ojos y bigote castaño -->
            <circle cx="2" cy="8" r="0.8" fill="#1e293b" />
            <circle cx="6" cy="8" r="0.8" fill="#1e293b" />
            <path d="M 1,11 Q 4,9.5 7,11 Q 4,14 1,11 Z" fill="#854d0e" />
            <!-- Corona de Gaspar -->
            <polygon points="0,4 0,1 2.5,3 4,0 6.5,3 9,1 9,4" fill="#facc15" stroke="#b45309" stroke-width="0.6" />
            <circle cx="4.5" cy="2.5" r="0.8" fill="#10b981" />
          </g>

          <!-- === REY BALTASAR (Derecha: Manto azul zafiro, noble piel morena, turbante regio con pluma) === -->
          <g transform="translate(31, 21)">
            <!-- Hombro y manto azul zafiro -->
            <path d="M -4,23 C -4,15 12,15 12,23 Z" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="0.8" />
            <!-- Cabeza de tez oscura africana inconfundible -->
            <circle cx="4" cy="9" r="6" fill="#5c3a21" stroke="#3b1d08" stroke-width="0.7" />
            <!-- Ojos brillantes y sonrisa alegre -->
            <circle cx="2" cy="8.5" r="0.9" fill="#ffffff" />
            <circle cx="2" cy="8.5" r="0.5" fill="#0f172a" />
            <circle cx="6" cy="8.5" r="0.9" fill="#ffffff" />
            <circle cx="6" cy="8.5" r="0.5" fill="#0f172a" />
            <!-- Bigote y barba fina oscura -->
            <path d="M 1,11.5 Q 4,13 7,11.5" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round" />
            <path d="M 2,13 Q 4,16 6,13" fill="#1e293b" />
            <!-- Turbante regio oriental púrpura y oro -->
            <ellipse cx="4" cy="3.5" rx="5.5" ry="3.2" fill="#7e22ce" stroke="#facc15" stroke-width="0.8" />
            <!-- Joya central dorada y pluma celeste -->
            <circle cx="4" cy="3.5" r="1.1" fill="#facc15" />
            <path d="M 4,2 Q 2,-3 5,-5 Q 6,-1 4,2 Z" fill="#38bdf8" />
          </g>

          <!-- === REY MELCHOR (Centro al frente: Manto carmesí, barba blanca señorial y gran corona de oro) === -->
          <g transform="translate(24, 18)">
            <!-- Manto carmesí imperial -->
            <path d="M -8,26 C -8,16 8,16 8,26 Z" fill="#dc2626" stroke="#991b1b" stroke-width="0.9" />
            <!-- Broche de armiño blanco en el cuello -->
            <ellipse cx="0" cy="18" rx="6" ry="2.2" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.6" />
            <!-- Cabeza -->
            <circle cx="0" cy="7" r="7.5" fill="#fed7aa" stroke="#ca8a04" stroke-width="0.7" />
            <!-- Ojos sonrientes en arco y mejillas sonrosadas -->
            <path d="M -4.5,6 Q -3,4.8 -1.5,6" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round" />
            <path d="M 1.5,6 Q 3,4.8 4.5,6" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round" />
            <circle cx="-4" cy="8" r="1.5" fill="#f43f5e" opacity="0.6" />
            <circle cx="4" cy="8" r="1.5" fill="#f43f5e" opacity="0.6" />
            <!-- Barba y bigote blanco señorial de Melchor -->
            <path d="M -6.5,8 Q -8,19 0,23 Q 8,19 6.5,8 Q 3,11 0,10 Q -3,11 -6.5,8 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
            <path d="M -4.5,8 Q 0,6 4.5,8 Q 0,11 -4.5,8 Z" fill="#f8fafc" />
            <!-- Gran Corona Real de Oro de 5 puntas de Melchor -->
            <g transform="translate(-6.5, -4)">
              <polygon points="0,5 0,1 3,3 6.5,-1 10,3 13,1 13,5" fill="#facc15" stroke="#ca8a04" stroke-width="0.8" stroke-linejoin="round" />
              <rect x="0" y="4" width="13" height="2" rx="0.8" fill="#eab308" />
              <circle cx="6.5" cy="5" r="0.9" fill="#ef4444" />
              <circle cx="2" cy="5" r="0.7" fill="#15803d" />
              <circle cx="11" cy="5" r="0.7" fill="#15803d" />
              <circle cx="6.5" cy="-1" r="1" fill="#ffffff" />
            </g>
          </g>
        </svg>
      `;

    case 'clear-night':
    case 'moon':
      // 🌙👑 NOCHE DE REYES: Luna dorada con los Tres Reyes Magos juntos mirando a la gran Estrella de Oriente
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-moon" aria-label="Los Tres Reyes Magos bajo la Luna y la Estrella">
          <!-- Luna Creciente dorada de Noche de Reyes a la izquierda -->
          <path d="M 22,5 A 16,16 0 0 1 5,27 A 16,16 0 1 0 22,5 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.3" />
          
          <!-- Gran Estrella de Oriente resplandeciente guiando en lo alto -->
          <g transform="translate(37, 10)">
            <circle cx="0" cy="0" r="8" fill="#fef08a" opacity="0.35" />
            <polygon points="0,-10 1.5,-2 9,0 1.5,2 0,10 -1.5,2 -9,0 -1.5,-2" fill="#ffffff" />
            <polygon points="-4,-4 0,-1.2 4,-4 1.2,0 4,4 0,1.2 -4,4 -1.2,0" fill="#fef08a" />
            <circle cx="0" cy="0" r="1.8" fill="#ffffff" />
          </g>

          <!-- LOS TRES REYES MAGOS JUNTOS EN LA NOCHE (Mirando a la Estrella) -->
          <!-- Gaspar (izquierda) -->
          <g transform="translate(10, 23)">
            <path d="M -3,22 C -3,15 10,15 10,22 Z" fill="#15803d" stroke="#14532d" stroke-width="0.8" />
            <circle cx="3.5" cy="9" r="5" fill="#fed7aa" />
            <path d="M -1,8 Q -2,14 1,16 Q 4,17 6,16 Q 9,14 8,8 Z" fill="#854d0e" />
            <circle cx="5" cy="8.5" r="0.8" fill="#1e293b" />
            <polygon points="0,5 0,2 2,3.5 3.5,1 5,3.5 7,2 7,5" fill="#facc15" stroke="#ca8a04" stroke-width="0.5" />
          </g>

          <!-- Baltasar (derecha) -->
          <g transform="translate(30, 23)">
            <path d="M -3,22 C -3,15 10,15 10,22 Z" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="0.8" />
            <circle cx="3.5" cy="9" r="5" fill="#5c3a21" stroke="#3b1d08" stroke-width="0.6" />
            <circle cx="4.5" cy="8.5" r="0.8" fill="#ffffff" />
            <circle cx="4.5" cy="8.5" r="0.4" fill="#0f172a" />
            <ellipse cx="3.5" cy="4" rx="4.5" ry="2.6" fill="#7e22ce" stroke="#facc15" stroke-width="0.7" />
            <path d="M 3.5,3 Q 2,-1 4,-3 Q 5,-0.5 3.5,3 Z" fill="#38bdf8" />
          </g>

          <!-- Melchor (centro) -->
          <g transform="translate(20, 20)">
            <path d="M -5,25 C -5,16 7,16 7,25 Z" fill="#dc2626" stroke="#991b1b" stroke-width="0.9" />
            <circle cx="1" cy="8" r="6" fill="#fed7aa" />
            <circle cx="3" cy="7" r="0.8" fill="#1e293b" />
            <path d="M -4,9 Q -5,18 1,21 Q 7,18 6,9 Q 3,11 1,10.5 Q -1,11 -4,9 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
            <g transform="translate(-4, -2)">
              <polygon points="0,5 0,1 2.5,3 5,0 7.5,3 10,1 10,5" fill="#facc15" stroke="#ca8a04" stroke-width="0.7" />
              <circle cx="5" cy="0" r="0.9" fill="#ffffff" />
            </g>
          </g>
        </svg>
      `;

    case 'mostly-clear-day':
    case 'sun-small-cloud':
      // 🌤️👑 SOL CON LOS TRES REYES ASOMANDO Y NUBE BLANCA AL PIE
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-mostly-clear" aria-label="Los Tres Reyes Magos con Sol y Nube">
          <circle cx="18" cy="18" r="14" fill="#facc15" stroke="#ca8a04" stroke-width="1.2" opacity="0.3" />
          
          <!-- Gaspar (izquierda) -->
          <g transform="translate(5, 12)">
            <circle cx="4" cy="7" r="4.5" fill="#fed7aa" />
            <path d="M 0,6 Q 0,12 4,13 Q 8,12 8,6 Z" fill="#854d0e" />
            <polygon points="1,4 1,1 2.5,2.5 4,0 5.5,2.5 7,1 7,4" fill="#facc15" />
          </g>
          <!-- Baltasar (derecha) -->
          <g transform="translate(23, 12)">
            <circle cx="4" cy="7" r="4.5" fill="#5c3a21" />
            <ellipse cx="4" cy="3" rx="4" ry="2.2" fill="#7e22ce" stroke="#facc15" stroke-width="0.6" />
            <path d="M 4,2 Q 3,-1 5,-3 Q 6,-0.5 4,2 Z" fill="#38bdf8" />
          </g>
          <!-- Melchor (centro) -->
          <g transform="translate(14, 9)">
            <circle cx="4" cy="8" r="5.5" fill="#fed7aa" />
            <path d="M -1,9 Q -1,18 4,19 Q 9,18 9,9 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.7" />
            <polygon points="0,4 0,0 2,2 4,-1 6,2 8,0 8,4" fill="#facc15" stroke="#ca8a04" stroke-width="0.7" />
            <circle cx="4" cy="-1" r="0.9" fill="#ffffff" />
          </g>

          <!-- Nube blanca esponjosa al frente -->
          <path d="M 43,41 H 16 A 7,7 0 0 1 15,28 A 10,10 0 0 1 38,26 A 7,7 0 0 1 43,41 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.4" />
        </svg>
      `;

    case 'mostly-clear-night':
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-moon-cloud" aria-label="Noche con Tres Coronas Reales">
          <path d="M 26,6 A 11,11 0 0 1 13,23 A 11,11 0 1 0 26,6 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.2" />
          <!-- Tres Coronas Reales en la noche -->
          <g transform="translate(14, 2)">
            <polygon points="0,5 0,1 2,3 4,0 6,3 8,1 8,5" fill="#facc15" />
          </g>
          <g transform="translate(25, 8)">
            <polygon points="0,4 0,1 1.5,2.5 3,0 4.5,2.5 6,1 6,4" fill="#facc15" />
          </g>
          <!-- Estrella -->
          <g transform="translate(38, 12)">
            <polygon points="0,-6 1,-1 6,0 1,1 0,6 -1,1 -6,0 -1,-1" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.2" fill="#fef08a" />
          </g>
          <path d="M 42,39 H 16 A 7,7 0 0 1 15,26 A 9.5,9.5 0 0 1 37,24 A 7,7 0 0 1 42,39 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="1.4" />
        </svg>
      `;

    case 'partly-cloudy-day':
    case 'cloud-sun':
      // ⛅👑 NUBES Y CLAROS: LOS TRES REYES ASOMANDO TRAS LA NUBE CON LOS TRES COFRES
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-cloud-sun" aria-label="Los Tres Reyes con Nubes y Cofres">
          <!-- Gaspar (izquierda) -->
          <g transform="translate(6, 11)">
            <circle cx="4" cy="7" r="4.5" fill="#fed7aa" />
            <path d="M 0,6 Q 0,12 4,13 Q 8,12 8,6 Z" fill="#854d0e" />
            <polygon points="1,4 1,1 2.5,2.5 4,0 5.5,2.5 7,1 7,4" fill="#facc15" />
          </g>
          <!-- Baltasar (derecha) -->
          <g transform="translate(26, 11)">
            <circle cx="4" cy="7" r="4.5" fill="#5c3a21" />
            <ellipse cx="4" cy="3" rx="4" ry="2.2" fill="#7e22ce" stroke="#facc15" stroke-width="0.6" />
            <path d="M 4,2 Q 3,-1 5,-3 Q 6,-0.5 4,2 Z" fill="#38bdf8" />
          </g>
          <!-- Melchor (centro) -->
          <g transform="translate(16, 7)">
            <circle cx="4" cy="8" r="5.5" fill="#fed7aa" />
            <path d="M -1,9 Q -1,18 4,19 Q 9,18 9,9 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.7" />
            <polygon points="0,4 0,0 2,2 4,-1 6,2 8,0 8,4" fill="#facc15" stroke="#ca8a04" stroke-width="0.7" />
            <circle cx="4" cy="-1" r="0.9" fill="#ffffff" />
          </g>

          <!-- Nube blanca al frente -->
          <path d="M 43,39 H 10 A 8,8 0 0 1 9,24 A 11,11 0 0 1 35,22 A 8,8 0 0 1 43,39 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
          
          <!-- Los Tres Cofres de Oro, Incienso y Mirra en la nube -->
          <g transform="translate(16, 27)">
            <!-- Oro (Melchor) -->
            <rect x="0" y="3" width="5" height="5" rx="1" fill="#facc15" stroke="#ca8a04" stroke-width="0.6" />
            <circle cx="2.5" cy="5.5" r="0.7" fill="#ef4444" />
            <!-- Incienso (Gaspar) -->
            <rect x="7" y="3" width="5" height="5" rx="1" fill="#38bdf8" stroke="#0284c7" stroke-width="0.6" />
            <circle cx="9.5" cy="5.5" r="0.7" fill="#10b981" />
            <!-- Mirra (Baltasar) -->
            <rect x="14" y="3" width="5" height="5" rx="1" fill="#a855f7" stroke="#7e22ce" stroke-width="0.6" />
            <circle cx="16.5" cy="5.5" r="0.7" fill="#facc15" />
          </g>
        </svg>
      `;

    case 'partly-cloudy-night':
    case 'cloud-moon':
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-cloud-moon" aria-label="Noche con Estrella y Nube">
          <path d="M 22,7 A 11,11 0 0 1 11,22 A 11,11 0 1 0 22,7 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.2" />
          <!-- Estrella de 8 puntas grande -->
          <g transform="translate(36, 12)">
            <polygon points="0,-8 1.5,-1.5 8,0 1.5,1.5 0,8 -1.5,1.5 -8,0 -1.5,-1.5" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.6" fill="#fef08a" />
          </g>
          <path d="M 42,39 H 14 A 8,8 0 0 1 13,24 A 10.5,10.5 0 0 1 36,22 A 8,8 0 0 1 42,39 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="1.4" />
        </svg>
      `;

    case 'resol':
      // 🌥️✨ RESOL: LA ESTRELLA DE ORIENTE TAMIZADA CON RESPLANDOR DORADO MÁGICO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-resol" aria-label="Resol con Luz de la Estrella de Oriente">
          <circle cx="24" cy="22" r="17" fill="rgba(254, 240, 138, 0.35)" />
          <circle cx="24" cy="22" r="12" fill="#fde047" stroke="#f59e0b" stroke-width="1.5" opacity="0.9" />
          <!-- Gran Estrella de Oriente dorada -->
          <g transform="translate(24, 22)">
            <polygon points="0,-12 2,-2 12,0 2,2 0,12 -2,2 -12,0 -2,-2" fill="#ffffff" />
            <circle cx="0" cy="0" r="3" fill="#facc15" />
          </g>
          <!-- Manto de bruma asturiana -->
          <path d="M 6,18 Q 24,15 42,18" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.9" />
          <path d="M 4,24 Q 24,21 44,24" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" opacity="0.95" />
          <path d="M 7,30 Q 24,27 41,30" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.9" />
        </svg>
      `;

    case 'cloudy':
    case 'cloud':
      // ☁️👑 LA NUBE REAL CORONADA POR LAS TRES CORONAS Y LOS TRES COFRES
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-cloud" aria-label="Nube con las Tres Coronas Reales">
          <path d="M 40,24 H 14 A 7,7 0 0 1 13,12 A 9,9 0 0 1 32,10 A 7,7 0 0 1 40,24 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.2" />
          <!-- Gran Nube Blanca Real -->
          <path d="M 43,39 H 9 A 9,9 0 0 1 8,22 A 12,12 0 0 1 35,20 A 9,9 0 0 1 43,39 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.6" />
          
          <!-- TRES CORONAS REALES SOBRE LA NUBE -->
          <!-- Corona de Gaspar (izq) -->
          <g transform="translate(10, 11)">
            <polygon points="0,5 0,1 2.5,3 4,0 6.5,3 9,1 9,5" fill="#facc15" stroke="#b45309" stroke-width="0.6" />
            <circle cx="4.5" cy="2.5" r="0.8" fill="#10b981" />
          </g>
          <!-- Turbante regio de Baltasar (dcha) -->
          <g transform="translate(29, 11)">
            <ellipse cx="4.5" cy="3.5" rx="4.5" ry="2.4" fill="#7e22ce" stroke="#facc15" stroke-width="0.7" />
            <circle cx="4.5" cy="3.5" r="0.9" fill="#facc15" />
            <path d="M 4.5,2 Q 3.5,-1 5.5,-3 Q 6,-0.5 4.5,2 Z" fill="#38bdf8" />
          </g>
          <!-- Gran Corona Real de Melchor (centro) -->
          <g transform="translate(18, 6)">
            <polygon points="0,6 0,2 3,4 6,0 9,4 12,2 12,6" fill="#facc15" stroke="#ca8a04" stroke-width="0.8" />
            <rect x="0" y="5" width="12" height="2" rx="0.6" fill="#eab308" />
            <circle cx="6" cy="1" r="1.2" fill="#ffffff" />
            <circle cx="6" cy="6" r="0.8" fill="#ef4444" />
          </g>

          <!-- TRES COFRES SAGRADOS AL FRENTE (Oro, Incienso y Mirra) -->
          <g transform="translate(13, 29)">
            <!-- Cofre Gaspar (Incienso - Turquesa) -->
            <rect x="0" y="2" width="6" height="5" rx="1" fill="#38bdf8" stroke="#0284c7" stroke-width="0.7" />
            <circle cx="3" cy="4.5" r="0.9" fill="#10b981" />
            <!-- Cofre Melchor (Oro - Dorado) -->
            <rect x="8" y="0" width="7" height="7" rx="1.2" fill="#facc15" stroke="#ca8a04" stroke-width="0.8" />
            <circle cx="11.5" cy="3.5" r="1.1" fill="#ef4444" />
            <!-- Cofre Baltasar (Mirra - Púrpura) -->
            <rect x="17" y="2" width="6" height="5" rx="1" fill="#a855f7" stroke="#7e22ce" stroke-width="0.7" />
            <circle cx="20" cy="4.5" r="0.9" fill="#facc15" />
          </g>
        </svg>
      `;

    case 'fog':
    case 'borrina':
      // 🌫️👑 NIEBLA CON LA ESTRELLA DE ORIENTE GUIANDO ENTRE LA BRUMA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-fog" aria-label="Niebla con Estrella de Oriente">
          <g stroke="#94a3b8" stroke-width="2.8" stroke-linecap="round">
            <line x1="8" y1="12" x2="40" y2="12" opacity="0.65" />
            <line x1="4" y1="20" x2="44" y2="20" opacity="0.85" />
          </g>
          <!-- Gran Estrella de Oriente brillando a través de la niebla -->
          <g transform="translate(24, 24)">
            <circle cx="0" cy="0" r="9" fill="#fef08a" opacity="0.45" />
            <polygon points="0,-12 2,-2 12,0 2,2 0,12 -2,2 -12,0 -2,-2" fill="#ffffff" />
            <circle cx="0" cy="0" r="2.5" fill="#facc15" />
          </g>
          <g stroke="#94a3b8" stroke-width="2.8" stroke-linecap="round">
            <line x1="8" y1="36" x2="40" y2="36" opacity="0.9" />
            <line x1="12" y1="42" x2="36" y2="42" opacity="0.75" />
          </g>
        </svg>
      `;

    case 'wet-fog':
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-wet-fog" aria-label="Borrina con Estrella">
          <g stroke="#94a3b8" stroke-width="2.6" stroke-linecap="round">
            <line x1="6" y1="14" x2="42" y2="14" opacity="0.65" />
            <line x1="4" y1="22" x2="44" y2="22" opacity="0.85" />
            <line x1="8" y1="30" x2="40" y2="30" opacity="0.9" />
          </g>
          <g transform="translate(24, 20)">
            <polygon points="0,-8 1.5,-1.5 8,0 1.5,1.5 0,8 -1.5,1.5 -8,0 -1.5,-1.5" fill="#ffffff" />
            <circle cx="0" cy="0" r="1.8" fill="#facc15" />
          </g>
          <circle cx="14" cy="38" r="2.2" fill="#38bdf8" />
          <circle cx="34" cy="38" r="2.2" fill="#38bdf8" />
        </svg>
      `;

    case 'drizzle':
    case 'orbayu':
      // 🌧️🍬 ORBAYU DE CABALGATA: NUBE CON CARAMELOS DE COLORES Y CORONA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-drizzle" aria-label="Orbayu con Caramelos de Cabalgata">
          <path d="M 41,23 H 12 A 7,7 0 0 1 11,11 A 9.5,9.5 0 0 1 33,9 A 7,7 0 0 1 41,23 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
          <g transform="translate(17, 3)">
            <polygon points="1,7 1,3 4,5 7,1 10,5 13,3 13,7" fill="#facc15" stroke="#ca8a04" stroke-width="0.8" />
            <circle cx="7" cy="1" r="1.3" fill="#ffffff" />
          </g>
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round">
            <line x1="14" y1="28" x2="11" y2="35" />
            <line x1="38" y1="28" x2="35" y2="35" />
          </g>
          <!-- Caramelos de la Cabalgata de Reyes cayendo -->
          <g transform="translate(20, 29)">
            <circle cx="3" cy="4" r="2.2" fill="#ef4444" />
            <polygon points="0,4 2,2 2,6" fill="#ef4444" />
            <polygon points="6,4 4,2 4,6" fill="#ef4444" />
          </g>
          <g transform="translate(29, 35)">
            <circle cx="3" cy="3" r="2" fill="#facc15" />
            <polygon points="0,3 2,1 2,5" fill="#facc15" />
            <polygon points="6,3 4,1 4,5" fill="#facc15" />
          </g>
        </svg>
      `;

    case 'showers':
    case 'chubascos':
    case 'sun-rain':
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-showers" aria-label="Chubascos Reyes">
          <circle cx="16" cy="14" r="8.5" fill="#facc15" stroke="#d97706" stroke-width="1.2" />
          <g transform="translate(11, 4)">
            <polygon points="1,6 1,2 4,4 7,1 10,4 13,2 13,6" fill="#facc15" />
          </g>
          <path d="M 41,28 H 14 A 7,7 0 0 1 13,16 A 9.5,9.5 0 0 1 34,14 A 7,7 0 0 1 41,28 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.4" />
          <g stroke="#0284c7" stroke-width="2.6" stroke-linecap="round">
            <line x1="19" y1="33" x2="16" y2="41" />
            <line x1="28" y1="33" x2="25" y2="41" />
            <line x1="37" y1="33" x2="34" y2="41" />
          </g>
        </svg>
      `;

    case 'rain':
    case 'rain-moderate':
      // 🌧️👑 LLUVIA: NUBE REAL CON CORONA Y GOTAS NÍTIDAS
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-rain" aria-label="Lluvia Reyes Magos">
          <path d="M 42,24 H 10 A 7.5,7.5 0 0 1 9,11 A 10.5,10.5 0 0 1 34,9 A 7.5,7.5 0 0 1 42,24 Z" fill="#ffffff" stroke="#64748b" stroke-width="1.5" />
          <circle cx="19" cy="17" r="1.4" fill="#1e293b" />
          <circle cx="27" cy="17" r="1.4" fill="#1e293b" />
          <circle cx="16" cy="19" r="2" fill="#f43f5e" opacity="0.6" />
          <circle cx="30" cy="19" r="2" fill="#f43f5e" opacity="0.6" />
          
          <g transform="translate(16, 2)">
            <polygon points="1,8 1,3 4,6 8,1 12,6 15,3 15,8" fill="#facc15" stroke="#ca8a04" stroke-width="0.8" />
            <rect x="1" y="7" width="14" height="2" fill="#eab308" />
            <circle cx="8" cy="1" r="1.4" fill="#ffffff" />
          </g>

          <g stroke="#0284c7" stroke-width="2.6" stroke-linecap="round">
            <line x1="14" y1="29" x2="10" y2="39" />
            <line x1="23" y1="29" x2="19" y2="39" />
            <line x1="32" y1="29" x2="28" y2="39" />
            <line x1="40" y1="29" x2="36" y2="39" />
          </g>
        </svg>
      `;

    case 'heavy-rain':
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-heavy-rain" aria-label="Bastinazu Reyes">
          <path d="M 43,24 H 9 A 8.5,8.5 0 0 1 8,10 A 11.5,11.5 0 0 1 34,8 A 8.5,8.5 0 0 1 43,24 Z" fill="#475569" stroke="#1e293b" stroke-width="1.8" />
          <g transform="translate(17, 1)">
            <polygon points="1,7 1,3 4,5 7,1 10,5 13,3 13,7" fill="#facc15" />
          </g>
          <g stroke="#38bdf8" stroke-width="2.8" stroke-linecap="round">
            <line x1="13" y1="29" x2="8" y2="42" />
            <line x1="22" y1="29" x2="17" y2="42" />
            <line x1="31" y1="29" x2="26" y2="42" />
            <line x1="40" y1="29" x2="35" y2="42" />
          </g>
        </svg>
      `;

    case 'storm':
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-storm" aria-label="Tormenta Reyes">
          <path d="M 42,23 H 10 A 8,8 0 0 1 9,9 A 11,11 0 0 1 34,7 A 8,8 0 0 1 42,23 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.8" />
          <g transform="translate(17, 1)">
            <polygon points="1,6 1,2 4,4 7,1 10,4 13,2 13,6" fill="#facc15" />
          </g>
          <!-- Gran Rayo dorado enérgico -->
          <polygon points="27,17 19,29 25,29 18,45 32,27 25,27" fill="#facc15" stroke="#d97706" stroke-width="1.2" stroke-linejoin="round" />
          <line x1="12" y1="29" x2="9" y2="37" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
          <line x1="38" y1="29" x2="35" y2="37" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
        </svg>
      `;

    case 'sleet':
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-sleet" aria-label="Aguanieve Reyes">
          <path d="M 42,24 H 10 A 8,8 0 0 1 9,10 A 11,11 0 0 1 34,8 A 8,8 0 0 1 42,24 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.6" />
          <line x1="14" y1="30" x2="11" y2="38" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
          <g stroke="#ffffff" stroke-width="2" stroke-linecap="round">
            <line x1="28" y1="29" x2="28" y2="37" /><line x1="24" y1="33" x2="32" y2="33" />
            <line x1="25.5" y1="30.5" x2="30.5" y2="35.5" /><line x1="30.5" y1="30.5" x2="25.5" y2="35.5" />
          </g>
        </svg>
      `;

    case 'snow-light':
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-snow-light" aria-label="Falispos Reyes">
          <path d="M 42,25 H 11 A 8,8 0 0 1 10,11 A 11,11 0 0 1 34,9 A 8,8 0 0 1 42,25 Z" fill="#ffffff" stroke="#64748b" stroke-width="1.5" />
          <g transform="translate(17, 3)">
            <polygon points="1,7 1,3 4,5 7,1 10,5 13,3 13,7" fill="#facc15" />
          </g>
          <g stroke="#ffffff" stroke-width="2" stroke-linecap="round">
            <line x1="16" y1="31" x2="16" y2="37" /><line x1="13" y1="34" x2="19" y2="34" />
            <line x1="27" y1="33" x2="27" y2="41" /><line x1="23" y1="37" x2="31" y2="37" />
            <line x1="38" y1="31" x2="38" y2="37" /><line x1="35" y1="34" x2="41" y2="34" />
          </g>
        </svg>
      `;

    case 'snow':
      // ❄️👑 NEVADA: MUÑECO DE NIEVE CON CORONA REAL Y REGALO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-snow" aria-label="Nevada Reyes Magos">
          <path d="M 42,21 H 11 A 7.5,7.5 0 0 1 10,8 A 10.5,10.5 0 0 1 34,6 A 7.5,7.5 0 0 1 42,21 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5" />
          <g stroke="#ffffff" stroke-width="2" stroke-linecap="round">
            <line x1="12" y1="25" x2="12" y2="33" /><line x1="8" y1="29" x2="16" y2="29" />
            <line x1="40" y1="25" x2="40" y2="33" /><line x1="36" y1="29" x2="44" y2="29" />
          </g>
          <!-- Muñeco de nieve con Corona de Rey Mago -->
          <g transform="translate(19, 20)">
            <circle cx="7" cy="16" r="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
            <circle cx="7" cy="7" r="4.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
            <circle cx="5.5" cy="6" r="0.7" fill="#1e293b" />
            <circle cx="8.5" cy="6" r="0.7" fill="#1e293b" />
            <polygon points="7,7 10,7.5 7,8" fill="#f97316" />
            <polygon points="2,3 2,0 4,2 7,-1 10,2 12,0 12,3" fill="#facc15" stroke="#ca8a04" stroke-width="0.6" />
            <rect x="3" y="10" width="8" height="2" fill="#b91c1c" rx="1" />
          </g>
        </svg>
      `;

    case 'heavy-snow':
    case 'nevadona':
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-heavy-snow" aria-label="Nevadona Reyes">
          <path d="M 42,20 H 10 A 7,7 0 0 1 9,7 A 10,10 0 0 1 34,5 A 7,7 0 0 1 42,20 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5" />
          <g stroke="#ffffff" stroke-width="2.2" stroke-linecap="round">
            <line x1="14" y1="25" x2="14" y2="33" /><line x1="10" y1="29" x2="18" y2="29" />
            <line x1="25" y1="25" x2="25" y2="33" /><line x1="21" y1="29" x2="29" y2="29" />
            <line x1="36" y1="25" x2="36" y2="33" /><line x1="32" y1="29" x2="40" y2="29" />
          </g>
          <path d="M 6,42 Q 24,37 42,42" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" />
        </svg>
      `;

    case 'hail':
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-hail" aria-label="Granizo Reyes">
          <path d="M 43,21 H 11 A 8.5,8.5 0 0 1 10,10 A 11,11 0 0 1 36,9 A 8.5,8.5 0 0 1 43,21 Z" fill="#334155" stroke="#1e293b" stroke-width="1.8" />
          <polygon points="12,26 17,28 14,33 9,31" fill="#ffffff" stroke="#0284c7" stroke-width="1.2" />
          <polygon points="25,27 31,25 33,32 27,35 23,32" fill="#f8fafc" stroke="#0284c7" stroke-width="1.5" />
          <polygon points="35,27 39,31 36,36 32,33" fill="#ffffff" stroke="#0284c7" stroke-width="1.2" />
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="reyes-svg-icon icon-rm-cloud" aria-label="Nube Reyes">
          <path d="M 42,28 H 12 A 8,8 0 0 1 11,14 A 10.5,10.5 0 0 1 35,12 A 8,8 0 0 1 42,28 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.6" />
        </svg>
      `;
  }
}
