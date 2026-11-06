/**
 * Catálogo Oficial de Iconos "Especial Papá Noel" (24 y 25 de Diciembre)
 * Diseñado con Lendo & Princesa para MeteoAstur Lode
 * 
 * Concepto (Fórmula Halloween):
 * - Los propios elementos meteorológicos SON Papá Noel:
 *   - El Sol ES Papá Noel (disco solar dorado con cara de Santa, barba y gorro rojo).
 *   - La Nube ES Papá Noel (nube blanca mullida con gorro rojo de Santa y barba esponjosa).
 *   - La Luna ES Papá Noel (luna dorada durmiendo con su gorro rojo).
 *   - La Lluvia / Nieve / Tormenta emanan directamente de la Nube-Santa.
 */

export function getPapaNoelWeatherSvg(iconKey, size = 32) {
  const sz = parseInt(size, 10) || 32;

  switch (iconKey) {
    case 'clear-day':
    case 'sun':
      // 🎅☀️ EL SOL ES PAPÁ NOEL: Disco solar dorado con rayos, cara entrañable, barba blanca y gorro rojo
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-sun" aria-label="Sol Papá Noel">
          <defs>
            <radialGradient id="pn-sun-gold" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="55%" stop-color="#facc15" />
              <stop offset="100%" stop-color="#eab308" />
            </radialGradient>
            <radialGradient id="pn-face-blush" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stop-color="#fed7aa" />
              <stop offset="100%" stop-color="#fdba74" />
            </radialGradient>
          </defs>
          <!-- Rayos solares dorados y luminosos alrededor del Sol-Santa -->
          <g stroke="#f59e0b" stroke-width="2.6" stroke-linecap="round">
            <line x1="24" y1="3" x2="24" y2="7" />
            <line x1="9" y1="9" x2="12" y2="12" />
            <line x1="39" y1="9" x2="36" y2="12" />
            <line x1="3" y1="24" x2="7" y2="24" />
            <line x1="41" y1="24" x2="45" y2="24" />
            <line x1="8" y1="38" x2="11" y2="35" />
            <line x1="40" y1="38" x2="37" y2="35" />
            <line x1="24" y1="41" x2="24" y2="45" />
          </g>

          <!-- Gran Cuerpo Solar Dorado de base -->
          <circle cx="24" cy="24" r="16" fill="url(#pn-sun-gold)" stroke="#ca8a04" stroke-width="1.3" />

          <!-- Cara sonrosada de Santa integrada en el centro del sol -->
          <circle cx="24" cy="23" r="10.5" fill="url(#pn-face-blush)" />
          
          <!-- Mejillas sonrosadas y felices -->
          <circle cx="18" cy="25" r="2.8" fill="#f43f5e" opacity="0.65" />
          <circle cx="30" cy="25" r="2.8" fill="#f43f5e" opacity="0.65" />
          
          <!-- Ojos sonrientes en arco alegre -->
          <path d="M 18.5,21 Q 20.5,19 22.5,21" stroke="#1e293b" stroke-width="1.6" fill="none" stroke-linecap="round" />
          <path d="M 25.5,21 Q 27.5,19 29.5,21" stroke="#1e293b" stroke-width="1.6" fill="none" stroke-linecap="round" />
          
          <!-- Nariz de botón simpática -->
          <circle cx="24" cy="23.5" r="2.2" fill="#fb7185" stroke="#e11d48" stroke-width="0.5" />

          <!-- Gran barba blanca y tupida que envuelve la parte baja del Sol -->
          <path d="M 13,24 Q 9,35 16,42 Q 24,46 32,42 Q 39,35 35,24 Q 30,28 24,27 Q 18,28 13,24 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2" />
          
          <!-- Bigote rizado blanco esponjoso -->
          <path d="M 24,24.5 Q 18,22 15,26.5 Q 21,30 24,26 Q 27,30 33,26.5 Q 30,22 24,24.5 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8" />

          <!-- Gorro rojo de Papá Noel encasquetado en la cabeza del Sol -->
          <g transform="translate(13, 3)">
            <!-- Dobladillo de borreguillo blanco esponjoso -->
            <rect x="0" y="9" width="22" height="5" rx="2.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
            <!-- Cono de terciopelo rojo doblado a la derecha -->
            <path d="M 2,10 Q 5,1 15,1 Q 22,2 26,11 Q 20,7 10,9 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
            <!-- Pompón blanco en la punta -->
            <circle cx="26.5" cy="13.5" r="3.2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
          </g>
        </svg>
      `;

    case 'clear-night':
    case 'moon':
      // 🌙🎅 LA LUNA ES PAPÁ NOEL: Luna creciente dorada durmiendo plácidamente con gorro de Santa
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-moon" aria-label="Luna Papá Noel Durmiendo">
          <!-- Luna Creciente dorada con mejilla y perfil -->
          <path d="M 30,7 A 15,15 0 0 1 12,28 A 15,15 0 1 0 30,7 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.3" />
          
          <!-- Ojo cerrado durmiendo plácidamente en arco feliz -->
          <path d="M 16,21 Q 18,23 20,21" stroke="#854d0e" stroke-width="1.5" fill="none" stroke-linecap="round" />
          <!-- Mejilla sonrosada en la luna -->
          <circle cx="17" cy="25" r="2.2" fill="#f43f5e" opacity="0.6" />
          <!-- Pequeña sonrisita nocturna -->
          <path d="M 17,29 Q 19,31 22,29" stroke="#854d0e" stroke-width="1.3" fill="none" stroke-linecap="round" />

          <!-- Gorro de Papá Noel encasquetado en la punta de la luna -->
          <g transform="translate(18, 2)">
            <!-- Dobladillo blanco -->
            <rect x="0" y="6" width="13" height="4" rx="2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" transform="rotate(-15)" />
            <!-- Cono rojo -->
            <path d="M 2,6 Q 10,-3 16,3 Q 18,9 13,11 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
            <!-- Pompón blanco en la punta -->
            <circle cx="17.5" cy="4.5" r="2.8" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
          </g>

          <!-- Estrellas místicas de Nochebuena alrededor -->
          <circle cx="37" cy="14" r="1.5" fill="#fef08a" />
          <path d="M 37,28 Q 37,32 41,32 Q 37,32 37,36 Q 37,32 33,32 Q 37,32 37,28 Z" fill="#ffffff" />
          <circle cx="10" cy="11" r="1" fill="#fef08a" />
          <circle cx="28" cy="42" r="1.2" fill="#fef08a" />
        </svg>
      `;

    case 'mostly-clear-day':
    case 'sun-small-cloud':
      // 🌤️🎅 EL SOL-SANTA PREDOMINANTE CON PEQUEÑA NUBE DISPERSA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-mostly-clear" aria-label="Sol Santa Mayormente Despejado">
          <!-- Sol Santa protagonista arriba a la izquierda -->
          <g transform="translate(-1, -1)">
            <!-- Rayos solares -->
            <g stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round">
              <line x1="20" y1="3" x2="20" y2="6" />
              <line x1="7" y1="9" x2="10" y2="12" />
              <line x1="33" y1="9" x2="30" y2="12" />
              <line x1="3" y1="21" x2="6" y2="21" />
            </g>
            <!-- Cabeza del Sol Santa -->
            <circle cx="20" cy="21" r="13.5" fill="#facc15" stroke="#ca8a04" stroke-width="1.2" />
            <circle cx="20" cy="20" r="9" fill="#fed7aa" />
            <circle cx="15.5" cy="22" r="2.2" fill="#f43f5e" opacity="0.6" />
            <circle cx="24.5" cy="22" r="2.2" fill="#f43f5e" opacity="0.6" />
            <!-- Ojos sonrientes -->
            <path d="M 16,18 Q 17.5,16.5 19,18" stroke="#1e293b" stroke-width="1.3" fill="none" stroke-linecap="round" />
            <path d="M 21,18 Q 22.5,16.5 24,18" stroke="#1e293b" stroke-width="1.3" fill="none" stroke-linecap="round" />
            <!-- Barba blanca -->
            <path d="M 12,22 Q 9,31 15,36 Q 20,39 25,36 Q 31,31 28,22 Q 24,25 20,24 Q 16,25 12,22 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
            <!-- Bigote -->
            <path d="M 20,22 Q 15,20 13,23.5 Q 18,26 20,23 Q 22,26 27,23.5 Q 25,20 20,22 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.7" />
            <!-- Gorrito rojo de Santa -->
            <g transform="translate(10, 4)">
              <rect x="0" y="7" width="18" height="4" rx="2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
              <path d="M 2,8 Q 5,1 12,1 Q 17,2 21,9 Q 16,6 8,7 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="0.8" />
              <circle cx="21" cy="11" r="2.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.7" />
            </g>
          </g>

          <!-- Nubecita blanca secundaria abajo a la derecha -->
          <path d="M 43,41 H 24 A 6,6 0 0 1 22,30 A 8,8 0 0 1 39,28 A 6,6 0 0 1 43,41 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.4" />
        </svg>
      `;

    case 'mostly-clear-night':
      // 🌙 LUNA PAPÁ NOEL CON PEQUEÑA NUBE NOCTURNA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-moon-cloud" aria-label="Luna Santa con Nube">
          <path d="M 28,6 A 12,12 0 0 1 14,24 A 12,12 0 1 0 28,6 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.2" />
          <path d="M 18,17 Q 20,19 22,17" stroke="#854d0e" stroke-width="1.3" fill="none" stroke-linecap="round" />
          <!-- Gorrito en la luna -->
          <g transform="translate(17, 3)">
            <rect x="0" y="4" width="9" height="3" rx="1.5" fill="#ffffff" />
            <path d="M 1,4 Q 6,-2 11,2 L 10,7 Z" fill="#ef4444" />
            <circle cx="11" cy="2" r="1.8" fill="#ffffff" />
          </g>
          <!-- Nube nocturna -->
          <path d="M 41,38 H 17 A 7,7 0 0 1 16,25 A 9,9 0 0 1 36,23 A 7,7 0 0 1 41,38 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="1.4" />
          <circle cx="35" cy="11" r="1.2" fill="#fef08a" />
        </svg>
      `;

    case 'partly-cloudy-day':
    case 'cloud-sun':
      // ⛅🎅 NUBES Y CLAROS: EL SOL-SANTA ASOMA TRAS LA NUBE-SANTA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-partly-cloudy" aria-label="Sol Santa y Nube Santa">
          <!-- Sol Santa sonriente asomando detrás -->
          <g transform="translate(0, -3)">
            <circle cx="18" cy="18" r="11" fill="#facc15" stroke="#ca8a04" stroke-width="1.2" />
            <circle cx="18" cy="18" r="7.5" fill="#fed7aa" />
            <circle cx="15" cy="19.5" r="1.8" fill="#f43f5e" opacity="0.6" />
            <circle cx="21" cy="19.5" r="1.8" fill="#f43f5e" opacity="0.6" />
            <path d="M 16,16.5 Q 17,15.5 18,16.5" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round" />
            <path d="M 19,16.5 Q 20,15.5 21,16.5" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round" />
            <!-- Gorrito del Sol -->
            <g transform="translate(10, 6)">
              <rect x="0" y="5" width="14" height="3" rx="1.5" fill="#ffffff" />
              <path d="M 1,5 Q 4,0 10,1 L 13,6 Z" fill="#ef4444" />
              <circle cx="12" cy="1" r="1.8" fill="#ffffff" />
            </g>
          </g>

          <!-- Nube blanca mullida al frente -->
          <path d="M 42,38 H 12 A 8.5,8.5 0 0 1 11,23 A 11,11 0 0 1 35,21 A 8.5,8.5 0 0 1 42,38 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
          
          <!-- Carita feliz y simpática en la propia nube -->
          <circle cx="22" cy="30" r="1.3" fill="#1e293b" />
          <circle cx="29" cy="30" r="1.3" fill="#1e293b" />
          <circle cx="19" cy="32" r="1.8" fill="#f43f5e" opacity="0.5" />
          <circle cx="32" cy="32" r="1.8" fill="#f43f5e" opacity="0.5" />
          <path d="M 23.5,33 Q 25.5,35.5 27.5,33" stroke="#1e293b" stroke-width="1.3" fill="none" stroke-linecap="round" />
        </svg>
      `;

    case 'partly-cloudy-night':
    case 'cloud-moon':
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-cloud-moon" aria-label="Luna y Nube de Nochebuena">
          <path d="M 22,8 A 11,11 0 0 1 11,23 A 11,11 0 1 0 22,8 Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.2" />
          <path d="M 42,38 H 15 A 8,8 0 0 1 14,24 A 10.5,10.5 0 0 1 36,22 A 8,8 0 0 1 42,38 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="1.4" />
          <circle cx="34" cy="10" r="1.5" fill="#fef08a" />
        </svg>
      `;

    case 'resol':
      // 🌥️✨ RESOL ASTURIANO: EL SOL-SANTA VELADO TRAS MANTO DE NIEBLA TRANSLÚCIDA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-resol" aria-label="Resol de Navidad">
          <!-- Halo dorado luminoso -->
          <circle cx="24" cy="22" r="17" fill="rgba(254, 240, 138, 0.3)" />
          <!-- Sol Santa dorado -->
          <circle cx="24" cy="22" r="12" fill="#fde047" stroke="#f59e0b" stroke-width="1.5" opacity="0.9" />
          <!-- Carita sonriente de Santa en el sol -->
          <circle cx="20" cy="21" r="1.2" fill="#854d0e" />
          <circle cx="28" cy="21" r="1.2" fill="#854d0e" />
          <circle cx="18" cy="23" r="1.8" fill="#f43f5e" opacity="0.5" />
          <circle cx="30" cy="23" r="1.8" fill="#f43f5e" opacity="0.5" />
          <path d="M 22,24 Q 24,26 26,24" stroke="#854d0e" stroke-width="1.2" fill="none" stroke-linecap="round" />
          <!-- Franjas de velo de resol blanco asturiano -->
          <path d="M 6,18 Q 24,15 42,18" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.9" />
          <path d="M 4,24 Q 24,21 44,24" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" opacity="0.95" />
          <path d="M 7,30 Q 24,27 41,30" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.9" />
          <!-- Gorrito rojo asomando en la cima -->
          <g transform="translate(17, 7)">
            <rect x="0" y="4" width="14" height="3" rx="1.5" fill="#ffffff" />
            <path d="M 1,4 Q 7,-1 11,2 L 12,5 Z" fill="#ef4444" />
            <circle cx="12" cy="2" r="1.6" fill="#ffffff" />
          </g>
        </svg>
      `;

    case 'cloudy':
    case 'cloud':
      // ☁️🎅 LA NUBE ES PAPÁ NOEL: Nube blanca con cara sonriente, gorro rojo de Santa y barba de nube
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-cloud" aria-label="Nube Papá Noel">
          <!-- Nube grisácea trasera suave para dar volumen -->
          <path d="M 39,24 H 14 A 7,7 0 0 1 13,12 A 9,9 0 0 1 32,10 A 7,7 0 0 1 39,24 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.2" />
          
          <!-- Gran Nube Blanca que conforma el cuerpo y la barba de Papá Noel -->
          <path d="M 42,38 H 10 A 9,9 0 0 1 9,21 A 12,12 0 0 1 35,19 A 9,9 0 0 1 42,38 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.6" />
          
          <!-- Carita de Santa en el centro de la nube -->
          <!-- Ojos negros alegres y brillantes -->
          <circle cx="20" cy="25" r="1.6" fill="#1e293b" />
          <circle cx="28" cy="25" r="1.6" fill="#1e293b" />
          <circle cx="19.5" cy="24.5" r="0.6" fill="#ffffff" />
          <circle cx="27.5" cy="24.5" r="0.6" fill="#ffffff" />
          
          <!-- Mejillas sonrosadas rojas de Santa -->
          <circle cx="16.5" cy="27" r="2.5" fill="#f43f5e" opacity="0.6" />
          <circle cx="31.5" cy="27" r="2.5" fill="#f43f5e" opacity="0.6" />
          
          <!-- Nariz redonda simpática -->
          <ellipse cx="24" cy="26" rx="2" ry="1.5" fill="#fb7185" stroke="#e11d48" stroke-width="0.5" />
          
          <!-- Bigote blanco rizado de Santa sobre la nube -->
          <path d="M 24,27 Q 19,25 17,29 Q 22,32 24,28.5 Q 26,32 31,29 Q 29,25 24,27 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8" />
          
          <!-- Sonrisa bondadosa de Papá Noel -->
          <path d="M 22,29 Q 24,31.5 26,29" stroke="#1e293b" stroke-width="1.3" fill="none" stroke-linecap="round" />

          <!-- Gorro rojo de Papá Noel en la coronilla de la nube -->
          <g transform="translate(15, 6)">
            <!-- Dobladillo blanco de borreguillo -->
            <rect x="0" y="8" width="18" height="4.5" rx="2" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
            <!-- Cuerpo cónico rojo doblado -->
            <path d="M 2,9 Q 6,1 14,2 Q 19,3 22,10 Q 17,6 9,8 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
            <!-- Pompón blanco en la punta -->
            <circle cx="23" cy="11.5" r="2.8" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
          </g>
        </svg>
      `;

    case 'fog':
    case 'borrina':
      // 🌫️🎅 NIEBLA CON LA NUBE-SANTA ASOMANDO ENTRE LA BRUMA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-fog" aria-label="Niebla con Nube Santa">
          <!-- Líneas de niebla -->
          <g stroke="#94a3b8" stroke-width="2.8" stroke-linecap="round">
            <line x1="8" y1="12" x2="40" y2="12" opacity="0.65" />
            <line x1="4" y1="20" x2="44" y2="20" opacity="0.85" />
          </g>
          <!-- Nube Santa asomando entre la bruma -->
          <path d="M 38,34 H 14 A 7,7 0 0 1 13,20 A 9.5,9.5 0 0 1 33,18 A 7,7 0 0 1 38,34 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.4" />
          <circle cx="21" cy="25" r="1.3" fill="#1e293b" />
          <circle cx="27" cy="25" r="1.3" fill="#1e293b" />
          <circle cx="18" cy="27" r="2" fill="#f43f5e" opacity="0.6" />
          <circle cx="30" cy="27" r="2" fill="#f43f5e" opacity="0.6" />
          <!-- Gorro rojo de Santa -->
          <g transform="translate(18, 9)">
            <rect x="0" y="6" width="12" height="3" rx="1.5" fill="#ffffff" />
            <path d="M 1,6 Q 5,1 10,2 L 11,7 Z" fill="#ef4444" />
            <circle cx="11.5" cy="3" r="1.8" fill="#ffffff" />
          </g>
          <!-- Líneas de niebla inferiores -->
          <g stroke="#94a3b8" stroke-width="2.8" stroke-linecap="round">
            <line x1="8" y1="36" x2="40" y2="36" opacity="0.9" />
            <line x1="12" y1="42" x2="36" y2="42" opacity="0.75" />
          </g>
        </svg>
      `;

    case 'wet-fog':
      // 🌫️🫧 BORRINA MEONA: LA NUBE-SANTA MOJADA CON GOTITAS DE ROCÍO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-wet-fog" aria-label="Borrina Húmeda Santa">
          <g stroke="#94a3b8" stroke-width="2.6" stroke-linecap="round">
            <line x1="6" y1="13" x2="42" y2="13" opacity="0.65" />
            <line x1="4" y1="21" x2="44" y2="21" opacity="0.85" />
          </g>
          <!-- Nube Santa -->
          <path d="M 38,33 H 14 A 7,7 0 0 1 13,20 A 9.5,9.5 0 0 1 33,18 A 7,7 0 0 1 38,33 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.4" />
          <circle cx="21" cy="25" r="1.2" fill="#1e293b" />
          <circle cx="27" cy="25" r="1.2" fill="#1e293b" />
          <circle cx="18" cy="27" r="1.8" fill="#f43f5e" opacity="0.5" />
          <circle cx="30" cy="27" r="1.8" fill="#f43f5e" opacity="0.5" />
          <!-- Gorro rojo -->
          <g transform="translate(18, 9)">
            <rect x="0" y="6" width="12" height="3" rx="1.5" fill="#ffffff" />
            <path d="M 1,6 Q 5,1 10,2 L 11,7 Z" fill="#ef4444" />
            <circle cx="11.5" cy="3" r="1.8" fill="#ffffff" />
          </g>
          <!-- Gotitas de rocío -->
          <circle cx="14" cy="39" r="2.2" fill="#38bdf8" />
          <circle cx="25" cy="41" r="2.4" fill="#38bdf8" />
          <circle cx="36" cy="39" r="2.2" fill="#38bdf8" />
        </svg>
      `;

    case 'drizzle':
    case 'orbayu':
      // 🌧️🎅 ORBAYU: LA NUBE-SANTA CON SU GORRO ROJO Y ORBAYU FINO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-drizzle" aria-label="Orbayu Santa">
          <!-- Nube Santa -->
          <path d="M 40,25 H 12 A 7,7 0 0 1 11,13 A 9.5,9.5 0 0 1 33,11 A 7,7 0 0 1 40,25 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
          <!-- Carita de Santa en la nube -->
          <circle cx="20" cy="18" r="1.3" fill="#1e293b" />
          <circle cx="26" cy="18" r="1.3" fill="#1e293b" />
          <circle cx="17" cy="20" r="1.8" fill="#f43f5e" opacity="0.6" />
          <circle cx="29" cy="20" r="1.8" fill="#f43f5e" opacity="0.6" />
          <path d="M 21.5,21.5 Q 23,23 24.5,21.5" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round" />
          
          <!-- Gorro rojo de Santa en la nube -->
          <g transform="translate(16, 2)">
            <rect x="0" y="6" width="14" height="3.5" rx="1.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
            <path d="M 1,6 Q 5,0 12,1 L 14,7 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="0.8" />
            <circle cx="14" cy="2" r="2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6" />
          </g>

          <!-- Agujas finas de orbayu cayendo desde la barba de la nube -->
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round">
            <line x1="14" y1="30" x2="11" y2="37" />
            <line x1="22" y1="29" x2="19" y2="36" />
            <line x1="30" y1="30" x2="27" y2="37" />
            <line x1="38" y1="29" x2="35" y2="36" />
            <line x1="18" y1="39" x2="16" y2="45" opacity="0.8" />
            <line x1="26" y1="38" x2="24" y2="44" opacity="0.8" />
            <line x1="34" y1="39" x2="32" y2="45" opacity="0.8" />
          </g>
        </svg>
      `;

    case 'showers':
    case 'chubascos':
    case 'sun-rain':
      // 🌦️🎅 CHUBASCOS: EL SOL-SANTA Y LA NUBE-SANTA CON LLUVIA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-showers" aria-label="Chubascos Santa">
          <!-- Sol Santa de fondo -->
          <circle cx="16" cy="14" r="8.5" fill="#facc15" stroke="#d97706" stroke-width="1.2" />
          <path d="M 12,7 Q 16,3 19,5 L 18,9 Z" fill="#ef4444" />
          <circle cx="19" cy="5" r="1.4" fill="#ffffff" />
          <!-- Nube Santa con lluvia -->
          <path d="M 41,28 H 14 A 7,7 0 0 1 13,16 A 9.5,9.5 0 0 1 34,14 A 7,7 0 0 1 41,28 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.4" />
          <circle cx="21" cy="21" r="1.2" fill="#1e293b" />
          <circle cx="27" cy="21" r="1.2" fill="#1e293b" />
          <!-- Gotas de lluvia azules -->
          <g stroke="#0284c7" stroke-width="2.5" stroke-linecap="round">
            <line x1="19" y1="33" x2="16" y2="41" />
            <line x1="28" y1="33" x2="25" y2="41" />
            <line x1="37" y1="33" x2="34" y2="41" />
          </g>
        </svg>
      `;

    case 'rain':
    case 'rain-moderate':
      // 🌧️🎅 LLUVIA: LA NUBE-SANTA CON GORRO ROJO LLORANDO GOTAS AZULES NÍTIDAS
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-rain" aria-label="Lluvia Santa">
          <!-- Nube Santa azul grisácea esponjosa -->
          <path d="M 42,25 H 10 A 7.5,7.5 0 0 1 9,12 A 10.5,10.5 0 0 1 34,10 A 7.5,7.5 0 0 1 42,25 Z" fill="#ffffff" stroke="#64748b" stroke-width="1.5" />
          
          <!-- Carita tierna de Santa en la nube -->
          <circle cx="19" cy="18" r="1.4" fill="#1e293b" />
          <circle cx="27" cy="18" r="1.4" fill="#1e293b" />
          <circle cx="16" cy="20" r="2" fill="#f43f5e" opacity="0.6" />
          <circle cx="30" cy="20" r="2" fill="#f43f5e" opacity="0.6" />
          <!-- Bigotito blanco -->
          <path d="M 23,20 Q 20,19 18,21.5 Q 22,23 23,21 Q 24,23 28,21.5 Q 26,19 23,20 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.6" />
          <path d="M 21.5,22.5 Q 23,21.5 24.5,22.5" stroke="#1e293b" stroke-width="1.2" fill="none" stroke-linecap="round" />

          <!-- Gorro rojo de Santa en la nube -->
          <g transform="translate(16, 2)">
            <rect x="0" y="6" width="16" height="4" rx="2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
            <path d="M 1,6 Q 5,0 13,1 L 16,8 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="0.8" />
            <circle cx="16" cy="2" r="2.2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.7" />
          </g>

          <!-- 5 Gotas de lluvia diagonales gruesas de agua azul nítida -->
          <g stroke="#0284c7" stroke-width="2.6" stroke-linecap="round">
            <line x1="14" y1="30" x2="10" y2="40" />
            <line x1="23" y1="30" x2="19" y2="40" />
            <line x1="32" y1="30" x2="28" y2="40" />
            <line x1="40" y1="30" x2="36" y2="40" />
            <line x1="25" y1="41" x2="23" y2="46" opacity="0.8" />
          </g>
        </svg>
      `;

    case 'heavy-rain':
      // 🌧️💥 BASTINAZU: LA NUBE-SANTA OSCURA CON GORRO Y LLUVIA TORRENCIAL
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-heavy-rain" aria-label="Bastinazu Santa">
          <path d="M 43,24 H 9 A 8.5,8.5 0 0 1 8,10 A 11.5,11.5 0 0 1 34,8 A 8.5,8.5 0 0 1 43,24 Z" fill="#475569" stroke="#1e293b" stroke-width="1.8" />
          <!-- Ojos de asombro cómico en la nube -->
          <circle cx="18" cy="16" r="1.8" fill="#ffffff" />
          <circle cx="18" cy="16" r="0.9" fill="#0f172a" />
          <circle cx="28" cy="16" r="1.8" fill="#ffffff" />
          <circle cx="28" cy="16" r="0.9" fill="#0f172a" />
          <ellipse cx="23" cy="20" rx="1.5" ry="2" fill="#0f172a" />

          <!-- Gorro rojo de Santa -->
          <g transform="translate(17, 1)">
            <rect x="0" y="5" width="16" height="3.5" rx="1.5" fill="#ffffff" />
            <path d="M 1,5 Q 5,0 13,1 L 16,7 Z" fill="#ef4444" />
            <circle cx="16" cy="2" r="2" fill="#ffffff" />
          </g>

          <!-- Lluvia torrencial -->
          <g stroke="#38bdf8" stroke-width="2.8" stroke-linecap="round">
            <line x1="13" y1="29" x2="8" y2="42" />
            <line x1="22" y1="29" x2="17" y2="42" />
            <line x1="31" y1="29" x2="26" y2="42" />
            <line x1="40" y1="29" x2="35" y2="42" />
          </g>
        </svg>
      `;

    case 'storm':
      // ⛈️⚡ TORMENTA: LA NUBE-SANTA CON GORRO Y RAYO DORADO EN ZIGZAG
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-storm" aria-label="Tormenta Santa">
          <path d="M 42,23 H 10 A 8,8 0 0 1 9,9 A 11,11 0 0 1 34,7 A 8,8 0 0 1 42,23 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.8" />
          <!-- Gorro rojo de Santa con pompón -->
          <g transform="translate(17, 1)">
            <rect x="0" y="5" width="15" height="3.5" rx="1.5" fill="#ffffff" />
            <path d="M 1,5 Q 5,0 13,1 L 15,7 Z" fill="#ef4444" />
            <circle cx="15.5" cy="2" r="2" fill="#ffffff" />
          </g>
          <!-- Ojos brillantes en la nube de tormenta -->
          <circle cx="18" cy="15" r="1.4" fill="#facc15" />
          <circle cx="28" cy="15" r="1.4" fill="#facc15" />

          <!-- Gran Rayo Dorado enérgico en zigzag -->
          <polygon points="27,17 19,29 25,29 18,45 32,27 25,27" fill="#facc15" stroke="#d97706" stroke-width="1.2" stroke-linejoin="round" />
          
          <line x1="12" y1="29" x2="9" y2="37" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
          <line x1="38" y1="29" x2="35" y2="37" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
        </svg>
      `;

    case 'sleet':
      // 🌨️🧊 AGUANIEVE: LA NUBE-SANTA CON GOTAS Y CRISTALES DE HIELO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-sleet" aria-label="Aguanieve Santa">
          <path d="M 42,24 H 10 A 8,8 0 0 1 9,10 A 11,11 0 0 1 34,8 A 8,8 0 0 1 42,24 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.6" />
          <g transform="translate(16, 2)">
            <rect x="0" y="5" width="14" height="3" rx="1.5" fill="#ffffff" />
            <path d="M 1,5 Q 5,0 11,1 L 13,7 Z" fill="#ef4444" />
            <circle cx="13" cy="2" r="1.8" fill="#ffffff" />
          </g>
          <line x1="14" y1="30" x2="11" y2="38" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
          <line x1="36" y1="30" x2="33" y2="38" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
          <g stroke="#ffffff" stroke-width="2" stroke-linecap="round">
            <line x1="24" y1="29" x2="24" y2="37" /><line x1="20" y1="33" x2="28" y2="33" />
            <line x1="21.5" y1="30.5" x2="26.5" y2="35.5" /><line x1="26.5" y1="30.5" x2="21.5" y2="35.5" />
          </g>
        </svg>
      `;

    case 'snow-light':
      // 🌨️ FALISPOS: LA NUBE-SANTA CON COPOS SUAVES
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-snow-light" aria-label="Falispos Santa">
          <path d="M 42,25 H 11 A 8,8 0 0 1 10,11 A 11,11 0 0 1 34,9 A 8,8 0 0 1 42,25 Z" fill="#ffffff" stroke="#64748b" stroke-width="1.5" />
          <circle cx="19" cy="18" r="1.3" fill="#1e293b" />
          <circle cx="27" cy="18" r="1.3" fill="#1e293b" />
          <circle cx="16" cy="20" r="1.8" fill="#f43f5e" opacity="0.6" />
          <circle cx="30" cy="20" r="1.8" fill="#f43f5e" opacity="0.6" />
          <!-- Gorro rojo -->
          <g transform="translate(16, 3)">
            <rect x="0" y="5" width="14" height="3" rx="1.5" fill="#ffffff" />
            <path d="M 1,5 Q 5,0 11,1 L 13,7 Z" fill="#ef4444" />
            <circle cx="13" cy="2" r="1.8" fill="#ffffff" />
          </g>
          <!-- Copitos cayendo -->
          <g stroke="#ffffff" stroke-width="2" stroke-linecap="round">
            <line x1="16" y1="31" x2="16" y2="37" /><line x1="13" y1="34" x2="19" y2="34" />
            <line x1="27" y1="33" x2="27" y2="41" /><line x1="23" y1="37" x2="31" y2="37" />
            <line x1="38" y1="31" x2="38" y2="37" /><line x1="35" y1="34" x2="41" y2="34" />
          </g>
        </svg>
      `;

    case 'snow':
      // ❄️🎅 NEVADA: LA NUBE-SANTA SONRIENTE SOPLANDO COPOS BLANCOS CRISTALINOS
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-snow" aria-label="Nevada Santa">
          <path d="M 42,24 H 10 A 8,8 0 0 1 9,11 A 11,11 0 0 1 34,9 A 8,8 0 0 1 42,24 Z" fill="#ffffff" stroke="#64748b" stroke-width="1.6" />
          <!-- Carita feliz de Santa en la nieve -->
          <circle cx="19" cy="17" r="1.4" fill="#1e293b" />
          <circle cx="27" cy="17" r="1.4" fill="#1e293b" />
          <circle cx="16" cy="19.5" r="2" fill="#f43f5e" opacity="0.65" />
          <circle cx="30" cy="19.5" r="2" fill="#f43f5e" opacity="0.65" />
          <!-- Bigote esponjoso blanco -->
          <path d="M 23,19 Q 20,18 18,20.5 Q 22,22 23,20.5 Q 24,22 28,20.5 Q 26,18 23,19 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.6" />

          <!-- Gorro rojo de Santa -->
          <g transform="translate(16, 2)">
            <rect x="0" y="6" width="16" height="4" rx="2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
            <path d="M 1,6 Q 5,0 13,1 L 16,8 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="0.8" />
            <circle cx="16" cy="2" r="2.2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.7" />
          </g>

          <!-- Copos estrellados de nieve nítidos -->
          <g stroke="#ffffff" stroke-width="2.2" stroke-linecap="round">
            <line x1="14" y1="29" x2="14" y2="37" /><line x1="10" y1="33" x2="18" y2="33" />
            <line x1="11.5" y1="30.5" x2="16.5" y2="35.5" /><line x1="16.5" y1="30.5" x2="11.5" y2="35.5" />
            
            <line x1="36" y1="29" x2="36" y2="37" /><line x1="32" y1="33" x2="40" y2="33" />
            <line x1="33.5" y1="30.5" x2="38.5" y2="35.5" /><line x1="38.5" y1="30.5" x2="33.5" y2="35.5" />
            
            <line x1="25" y1="34" x2="25" y2="43" /><line x1="20.5" y1="38.5" x2="29.5" y2="38.5" />
          </g>
        </svg>
      `;

    case 'heavy-snow':
    case 'nevadona':
      // ❄️🏔️ NEVADONA: LA NUBE-SANTA NEVANDO COPIOSAMENTE
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-heavy-snow" aria-label="Nevadona Santa">
          <path d="M 42,22 H 10 A 8,8 0 0 1 9,8 A 11,11 0 0 1 34,6 A 8,8 0 0 1 42,22 Z" fill="#cbd5e1" stroke="#475569" stroke-width="1.6" />
          <g transform="translate(16, 0)">
            <rect x="0" y="5" width="16" height="3.5" rx="1.5" fill="#ffffff" />
            <path d="M 1,5 Q 5,0 13,1 L 16,7 Z" fill="#ef4444" />
            <circle cx="16" cy="2" r="2" fill="#ffffff" />
          </g>
          <g stroke="#ffffff" stroke-width="2.4" stroke-linecap="round">
            <line x1="14" y1="26" x2="14" y2="35" /><line x1="9.5" y1="30.5" x2="18.5" y2="30.5" />
            <line x1="25" y1="26" x2="25" y2="35" /><line x1="20.5" y1="30.5" x2="29.5" y2="30.5" />
            <line x1="36" y1="26" x2="36" y2="35" /><line x1="31.5" y1="30.5" x2="40.5" y2="30.5" />
          </g>
          <path d="M 6,43 Q 24,38 42,43" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" />
        </svg>
      `;

    case 'hail':
      // 🧊 GRANIZO SANTA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-hail" aria-label="Granizo Santa">
          <path d="M 43,21 H 11 A 8.5,8.5 0 0 1 10,10 A 11,11 0 0 1 36,9 A 8.5,8.5 0 0 1 43,21 Z" fill="#334155" stroke="#1e293b" stroke-width="1.8" />
          <g transform="translate(17, 1)">
            <rect x="0" y="5" width="15" height="3" rx="1.5" fill="#ffffff" />
            <path d="M 1,5 Q 5,0 12,1 L 14,7 Z" fill="#ef4444" />
            <circle cx="14" cy="2" r="1.8" fill="#ffffff" />
          </g>
          <polygon points="13,26 18,28 15,34 10,32" fill="#ffffff" stroke="#0284c7" stroke-width="1.3" />
          <polygon points="25,27 31,25 33,32 27,35 23,32" fill="#f8fafc" stroke="#0284c7" stroke-width="1.5" />
          <polygon points="37,28 41,32 38,37 34,34" fill="#ffffff" stroke="#0284c7" stroke-width="1.3" />
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="papanoel-svg-icon icon-pn-cloud" aria-label="Nube Santa">
          <path d="M 42,28 H 12 A 8,8 0 0 1 11,14 A 10.5,10.5 0 0 1 35,12 A 8,8 0 0 1 42,28 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.6" />
        </svg>
      `;
  }
}
