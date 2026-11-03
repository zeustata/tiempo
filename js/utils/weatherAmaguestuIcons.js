/**
 * Catálogo Oficial de Iconos "Especial Amagüestu de Seronda" (Fiesta de San Martín)
 * Diseñado a medida por Princesa & Lendo para MeteoAstur Lode
 * Iconografía con alma y máxima legibilidad:
 * - Sol y Cucurucho cónico de papel de periódico con castañes asaes calentines y humo
 * - Castañina asada risueña asomando en nubes y claros
 * - Tamboril de chapa perforado con brasas incandescentes y columna de humo
 * - Xarra tradicional de barro con sidra dulce de duernu en lluvia
 * - Castaña con bufandina de lana roja en nieve
 * Conforme a la Ley 23: Cobertura total de los 20 estados meteorológicos.
 */

export function getAmaguestuWeatherSvg(iconKey, size = 32) {
  const sz = parseInt(size, 10) || 32;

  switch (iconKey) {
    case 'clear-day':
    case 'sun':
      // ☀️🌰 GRAN SOL DORADO RADIANTE + CUCURUCHO DE PERIÓDICO REBOSANTE DE CASTAÑES ASAES HUMEANTES
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-sun" aria-label="Sol de Amagüestu con Cucurucho de Castañes">
          <defs>
            <radialGradient id="amg-sun-gold" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="65%" stop-color="#f59e0b" />
              <stop offset="100%" stop-color="#d97706" />
            </radialGradient>
            <linearGradient id="amg-paper-cone" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="50%" stop-color="#f1f5f9" />
              <stop offset="100%" stop-color="#cbd5e1" />
            </linearGradient>
            <radialGradient id="amg-chestnut-hot" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stop-color="#a16207" />
              <stop offset="50%" stop-color="#78350f" />
              <stop offset="100%" stop-color="#451a03" />
            </radialGradient>
          </defs>

          <!-- Rayos Solares Dorados Luminosos y Largos -->
          <g stroke="#f59e0b" stroke-width="2.6" stroke-linecap="round">
            <line x1="20" y1="2" x2="20" y2="7" />
            <line x1="4" y1="18" x2="9" y2="18" />
            <line x1="8" y1="6" x2="12" y2="10" />
            <line x1="32" y1="6" x2="28" y2="10" />
            <line x1="7" y1="30" x2="11" y2="27" />
          </g>

          <!-- Núcleo del Gran Sol Dorado Luminoso (Arriba a la izquierda) -->
          <circle cx="20" cy="18" r="12" fill="url(#amg-sun-gold)" stroke="#b45309" stroke-width="1.2" />
          <circle cx="16" cy="14" r="3.5" fill="#ffffff" opacity="0.45" />

          <!-- Humillo caliente ondulante saliendo del cucurucho hacia el sol -->
          <path d="M 31,22 Q 29,17 33,12" stroke="#fef3c7" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.85" />
          <path d="M 37,21 Q 40,16 38,11" stroke="#fef3c7" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.8" />

          <!-- CUCURUCHO DE PAPEL DE PERIÓDICO (Fácilmente reconocible en primer plano) -->
          <!-- Castañas asadas sobresaliendo del cucurucho -->
          <!-- Castaña 1 (Izquierda) -->
          <ellipse cx="30" cy="25" rx="4.5" ry="4" fill="url(#amg-chestnut-hot)" stroke="#291102" stroke-width="0.8" />
          <line x1="28.5" y1="23.5" x2="31.5" y2="26.5" stroke="#fef08a" stroke-width="1.3" stroke-linecap="round" />
          <line x1="31.5" y1="23.5" x2="28.5" y2="26.5" stroke="#fef08a" stroke-width="1.3" stroke-linecap="round" />

          <!-- Castaña 2 (Derecha / Arriba) -->
          <ellipse cx="37" cy="24" rx="4.8" ry="4.2" fill="url(#amg-chestnut-hot)" stroke="#291102" stroke-width="0.8" />
          <line x1="35" y1="22.5" x2="39" y2="25.5" stroke="#fde047" stroke-width="1.3" stroke-linecap="round" />
          <line x1="39" y1="22.5" x2="35" y2="25.5" stroke="#fde047" stroke-width="1.3" stroke-linecap="round" />

          <!-- Castaña Central Calentina asomando -->
          <ellipse cx="33.5" cy="26" rx="4" ry="3.5" fill="url(#amg-chestnut-hot)" stroke="#291102" stroke-width="0.8" />
          <circle cx="33.5" cy="26" r="1.2" fill="#fef08a" />

          <!-- Cono de Papel de Periódico Cónico Plegado -->
          <polygon points="34,47 24,28 43,26" fill="url(#amg-paper-cone)" stroke="#64748b" stroke-width="1.2" stroke-linejoin="round" />
          <!-- Pliegue lateral del periódico -->
          <polygon points="34,47 43,26 40,32" fill="#94a3b8" opacity="0.4" />
          <!-- Rayitas impresas simulando las noticias del periódico asturiano -->
          <line x1="28" y1="33" x2="36" y2="32" stroke="#475569" stroke-width="1" stroke-linecap="round" />
          <line x1="29" y1="36" x2="38" y2="35" stroke="#475569" stroke-width="1" stroke-linecap="round" />
          <line x1="31" y1="39" x2="37" y2="38" stroke="#475569" stroke-width="0.9" stroke-linecap="round" />
          <line x1="32" y1="42" x2="36" y2="41.5" stroke="#475569" stroke-width="0.9" stroke-linecap="round" />
        </svg>
      `;

    case 'clear-night':
    case 'moon':
      // 🌕🌰 LUNA LLENA OTOÑAL CON ESTRELLAS Y CUCURUCHO DE CASTAÑES CALENTINES
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-moon" aria-label="Noche Clara con Cucurucho de Castañes">
          <defs>
            <radialGradient id="amg-moon-gold" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="75%" stop-color="#facc15" />
              <stop offset="100%" stop-color="#ca8a04" />
            </radialGradient>
          </defs>
          <!-- Resplandor lunar suave -->
          <circle cx="21" cy="19" r="15" fill="rgba(254, 240, 138, 0.2)" />
          <circle cx="21" cy="19" r="12" fill="url(#amg-moon-gold)" stroke="#a16207" stroke-width="1.2" />
          <!-- Cráteres lunares suaves -->
          <circle cx="17" cy="16" r="2" fill="#eab308" opacity="0.5" />
          <circle cx="24" cy="22" r="2.2" fill="#eab308" opacity="0.5" />

          <!-- Estrellas brillantes en cielo despejado -->
          <polygon points="38,6 39,9 42,10 39,11 38,14 37,11 34,10 37,9" fill="#fef08a" />
          <polygon points="9,10 10,12 12,13 10,14 9,16 8,14 6,13 8,12" fill="#fef08a" opacity="0.8" />

          <!-- Humillo blanco subiendo hacia la luna -->
          <path d="M 32,23 Q 30,18 33,13" stroke="#f1f5f9" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.8" />

          <!-- Castañas asadas humeando -->
          <ellipse cx="31" cy="25" rx="4.2" ry="3.8" fill="#78350f" stroke="#291102" stroke-width="0.8" />
          <line x1="29.5" y1="24" x2="32.5" y2="26.5" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round" />
          <ellipse cx="37" cy="24" rx="4.5" ry="4" fill="#78350f" stroke="#291102" stroke-width="0.8" />
          <line x1="35" y1="22.5" x2="38.5" y2="25.5" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round" />

          <!-- Cucurucho de periódico en primer plano -->
          <polygon points="34,47 24,28 43,26" fill="#f1f5f9" stroke="#64748b" stroke-width="1.2" stroke-linejoin="round" />
          <line x1="28" y1="33" x2="36" y2="32" stroke="#475569" stroke-width="1" stroke-linecap="round" />
          <line x1="29" y1="36" x2="38" y2="35" stroke="#475569" stroke-width="1" stroke-linecap="round" />
          <line x1="31" y1="39" x2="37" y2="38" stroke="#475569" stroke-width="0.9" stroke-linecap="round" />
        </svg>
      `;

    case 'mostly-clear-day':
    case 'sun-small-cloud':
      // 🌤️🌰 POCO NUBOSO: SOL DOMINANTE + MINI-NUBE + CUCURUCHO DE CASTAÑES
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-mostly-clear" aria-label="Mayormente Soleado de Amagüestu">
          <!-- Rayos solares -->
          <g stroke="#f59e0b" stroke-width="2.4" stroke-linecap="round">
            <line x1="18" y1="3" x2="18" y2="7" />
            <line x1="4" y1="17" x2="8" y2="17" />
            <line x1="8" y1="7" x2="11" y2="10" />
            <line x1="27" y1="7" x2="24" y2="10" />
          </g>
          <!-- Sol Dorado Dominante -->
          <circle cx="18" cy="17" r="11" fill="#f59e0b" stroke="#d97706" stroke-width="1.2" />
          <circle cx="15" cy="14" r="3" fill="#ffffff" opacity="0.45" />

          <!-- Mini-nube blanca limpia a la derecha -->
          <path d="M 43,25 H 28 A 5.5,5.5 0 0 1 27,16 A 7,7 0 0 1 39,15 A 5,5 0 0 1 43,25 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.3" />

          <!-- Castañas calentinas -->
          <ellipse cx="30" cy="27" rx="4" ry="3.5" fill="#78350f" stroke="#291102" stroke-width="0.8" />
          <line x1="28.5" y1="25.5" x2="31.5" y2="28" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round" />
          <ellipse cx="36" cy="26" rx="4.2" ry="3.8" fill="#78350f" stroke="#291102" stroke-width="0.8" />
          <line x1="34" y1="24.5" x2="38" y2="27.5" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round" />

          <!-- Cucurucho de periódico -->
          <polygon points="34,47 24,30 42,28" fill="#f8fafc" stroke="#64748b" stroke-width="1.2" stroke-linejoin="round" />
          <line x1="28" y1="35" x2="35" y2="34" stroke="#475569" stroke-width="0.9" stroke-linecap="round" />
          <line x1="29" y1="38" x2="37" y2="37" stroke="#475569" stroke-width="0.9" stroke-linecap="round" />
          <line x1="31" y1="41" x2="36" y2="40.5" stroke="#475569" stroke-width="0.8" stroke-linecap="round" />
        </svg>
      `;

    case 'mostly-clear-night':
      // 🌘 LUNA CON NUBE TENUE Y CUCURUCHO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-mostly-clear-night" aria-label="Noche con Claros de Amagüestu">
          <circle cx="19" cy="18" r="11" fill="#fef08a" stroke="#eab308" stroke-width="1.2" />
          <circle cx="16" cy="15" r="2.2" fill="#fde047" opacity="0.5" />
          <polygon points="38,7 39,9 41,10 39,11 38,13 37,11 35,10 37,9" fill="#fef08a" />
          <!-- Nubecilla nocturna -->
          <path d="M 43,26 H 26 A 5.5,5.5 0 0 1 25,17 A 7,7 0 0 1 39,17 A 5,5 0 0 1 43,26 Z" fill="#334155" stroke="#475569" stroke-width="1.3" />
          <!-- Cucurucho -->
          <polygon points="34,47 24,30 42,28" fill="#f1f5f9" stroke="#64748b" stroke-width="1.2" stroke-linejoin="round" />
          <line x1="28" y1="35" x2="35" y2="34" stroke="#475569" stroke-width="0.9" stroke-linecap="round" />
        </svg>
      `;

    case 'partly-cloudy-day':
    case 'cloud-sun':
      // ⛅🌰 INTERVALOS: EL SOL + NUBE BLANCA CON LA CASTAÑINA RISUEÑA ASOMANDO GRANDOTA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-partly-cloudy" aria-label="Intervalos Nubosos con Castañina Risueña">
          <!-- Sol brillante arriba a la izquierda -->
          <circle cx="15" cy="15" r="9.5" fill="#f59e0b" stroke="#d97706" stroke-width="1.2" />
          <g stroke="#f59e0b" stroke-width="2" stroke-linecap="round">
            <line x1="15" y1="3" x2="15" y2="5.5" />
            <line x1="4" y1="15" x2="6.5" y2="15" />
            <line x1="7" y1="7" x2="9" y2="9" />
          </g>

          <!-- CASTAÑINA ASADA RISUEÑA ASOMANDO POR DETRÁS DE LA NUBE (Como el fantasma en Halloween) -->
          <g transform="translate(23, 11)">
            <!-- Humillo aromático de la castaña -->
            <path d="M 8,0 Q 6,-4 9,-8" stroke="#fef3c7" stroke-width="1.2" fill="none" stroke-linecap="round" />
            <!-- Cuerpo redondo de la castaña calentina -->
            <path d="M 8,1 C 3,1 0,6 2,12 C 4,16 12,16 14,12 C 16,6 13,1 8,1 Z" fill="#78350f" stroke="#3b1502" stroke-width="1.2" />
            <!-- Ojos sonrientes pillos -->
            <circle cx="5.5" cy="6.5" r="1.1" fill="#ffffff" />
            <circle cx="5.7" cy="6.5" r="0.6" fill="#1e293b" />
            <circle cx="10.5" cy="6.5" r="1.1" fill="#ffffff" />
            <circle cx="10.7" cy="6.5" r="0.6" fill="#1e293b" />
            <!-- Sonrisa asada dorada feliz con corte en cruz -->
            <path d="M 6,9.5 Q 8,12 10,9.5" stroke="#fef08a" stroke-width="1.4" fill="none" stroke-linecap="round" />
            <!-- Mejillitas sonrojadas de calor de brasa -->
            <circle cx="4" cy="8.5" r="1" fill="#f97316" opacity="0.8" />
            <circle cx="12" cy="8.5" r="1" fill="#f97316" opacity="0.8" />
          </g>

          <!-- Nube blanca esponjosa y limpia en primer plano -->
          <path d="M 44,36 H 14 A 8.5,8.5 0 0 1 13,23 A 11,11 0 0 1 36,21 A 7.5,7.5 0 0 1 44,36 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.6" />
          <!-- Sombras suaves de la nube para volumen 3D -->
          <path d="M 17,34 Q 24,36 33,34" stroke="#e2e8f0" stroke-width="1.8" fill="none" stroke-linecap="round" />

          <!-- Cucurucho de castañas abajo a la derecha -->
          <polygon points="38,47 31,34 44,32" fill="#f1f5f9" stroke="#64748b" stroke-width="1" stroke-linejoin="round" />
          <ellipse cx="37" cy="32" rx="3" ry="2.5" fill="#78350f" />
          <circle cx="37" cy="32" r="0.9" fill="#fef08a" />
        </svg>
      `;

    case 'partly-cloudy-night':
    case 'cloud-moon':
      // ☁️🌙 LUNA CRECIENTE CON NUBE Y CASTAÑINA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-partly-cloudy-night" aria-label="Noche con Intervalos de Amagüestu">
          <path d="M 16,8 A 10,10 0 1 0 25,20 A 8.5,8.5 0 0 1 16,8 Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.2" />
          <!-- Castañina asomando -->
          <g transform="translate(24, 13)">
            <path d="M 7,2 C 3,2 1,6 3,11 C 5,14 11,14 13,11 C 15,6 12,2 7,2 Z" fill="#78350f" stroke="#3b1502" stroke-width="1.1" />
            <circle cx="5" cy="6.5" r="0.9" fill="#fef08a" />
            <circle cx="9" cy="6.5" r="0.9" fill="#fef08a" />
          </g>
          <!-- Nube nocturna -->
          <path d="M 44,37 H 15 A 8.5,8.5 0 0 1 14,24 A 11,11 0 0 1 37,22 A 7.5,7.5 0 0 1 44,37 Z" fill="#1e293b" stroke="#475569" stroke-width="1.6" />
        </svg>
      `;

    case 'resol':
      // 🌥️🍂 RESOL ASTURIANO: HALO SOLAR CON CIRROESTRATOS, CUCURUCHO Y HOJAS DE CARBAYU FLOTANDO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-resol" aria-label="Resol Asturiano de Amagüestu">
          <!-- Halo circular del Resol -->
          <circle cx="21" cy="20" r="16" fill="rgba(251, 191, 36, 0.25)" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="3,3" />
          <!-- Núcleo solar tamizado ámbar -->
          <circle cx="21" cy="20" r="11" fill="#fde047" opacity="0.9" />

          <!-- Velo de cirroestratos en franjas ondulantes -->
          <path d="M 5,16 C 13,13 21,19 29,15 C 35,13 41,16 43,17" stroke="#ffffff" stroke-width="2.2" fill="none" opacity="0.9" stroke-linecap="round" />
          <path d="M 3,22 C 11,19 19,25 27,21 C 34,19 40,22 45,23" stroke="#ffffff" stroke-width="2.4" fill="none" opacity="0.85" stroke-linecap="round" />

          <!-- Hojas de roble otoñales mecidas en el aire caliente -->
          <path d="M 12,38 C 14,34 18,33 21,35 C 19,37 22,39 20,42 C 17,41 15,43 12,38 Z" fill="#d97706" stroke="#92400e" stroke-width="0.8" />

          <!-- Cucurucho de castañas con humo dorado en el resol -->
          <polygon points="36,47 26,29 44,27" fill="#fef9c3" stroke="#a16207" stroke-width="1.2" stroke-linejoin="round" />
          <ellipse cx="33" cy="26" rx="4" ry="3.5" fill="#78350f" />
          <line x1="31.5" y1="24.5" x2="34.5" y2="27.5" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 34,22 Q 32,17 35,13" stroke="#fef08a" stroke-width="1.3" fill="none" stroke-linecap="round" opacity="0.9" />
        </svg>
      `;

    case 'cloudy':
    case 'cloud':
      // ☁️🔥 CUBIERTU: GRAN TAMBORIL DE CHAPA SOBRE BRASAS VIVAS FORMANDO LA NUBE CON SU HUMO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-cloudy" aria-label="Nublado con Tamboril de Asar Castañes">
          <!-- Gran Nube gris otoñal bien delineada en la parte superior -->
          <path d="M 44,23 H 13 A 8,8 0 0 1 12,11 A 11,11 0 0 1 37,10 A 8,8 0 0 1 44,23 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="1.6" />

          <!-- Columna aromática de humo ascendente del tamboril que alimenta la nube -->
          <path d="M 19,29 Q 16,24 21,20" stroke="#94a3b8" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.8" />
          <path d="M 28,29 Q 32,24 27,19" stroke="#94a3b8" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.8" />

          <!-- EL TAMBORIL DE CHAPA DE ASAR CASTAÑAS (Grande y detallado en primer plano) -->
          <g transform="translate(10, 27)">
            <!-- Brasas incandescentes debajo del tamboril -->
            <ellipse cx="14" cy="18" rx="13" ry="2.5" fill="#ef4444" opacity="0.6" />
            <circle cx="8" cy="18" r="1.5" fill="#facc15" />
            <circle cx="13" cy="18.5" r="1.8" fill="#f97316" />
            <circle cx="18" cy="18" r="1.4" fill="#facc15" />
            <circle cx="21" cy="17.5" r="1.2" fill="#ef4444" />

            <!-- Chasis / Patas de hierro -->
            <line x1="3" y1="18" x2="6" y2="10" stroke="#334155" stroke-width="1.8" stroke-linecap="round" />
            <line x1="25" y1="18" x2="22" y2="10" stroke="#334155" stroke-width="1.8" stroke-linecap="round" />
            <line x1="4" y1="10" x2="24" y2="10" stroke="#475569" stroke-width="1.8" stroke-linecap="round" />

            <!-- Cilindro de chapa perforado -->
            <rect x="5" y="4" width="18" height="11" rx="2.5" fill="#1e293b" stroke="#0f172a" stroke-width="1.3" />

            <!-- Manivela tradicional para voltear las castañas -->
            <path d="M 23,9.5 L 27,9.5 L 27,14" stroke="#94a3b8" stroke-width="1.8" fill="none" stroke-linecap="round" />
            <circle cx="27" cy="14" r="1.2" fill="#e2e8f0" />

            <!-- Agujeros perforados del tambor brillando con las castañas y fuego interior -->
            <circle cx="8" cy="7" r="1" fill="#facc15" />
            <circle cx="12" cy="7" r="1" fill="#f97316" />
            <circle cx="16" cy="7" r="1" fill="#facc15" />
            <circle cx="20" cy="7" r="1" fill="#ef4444" />
            <circle cx="10" cy="10" r="1.1" fill="#fef08a" />
            <circle cx="14" cy="10" r="1.1" fill="#facc15" />
            <circle cx="18" cy="10" r="1.1" fill="#f97316" />
            <circle cx="8" cy="12.5" r="0.9" fill="#ef4444" />
            <circle cx="12" cy="12.5" r="0.9" fill="#facc15" />
            <circle cx="16" cy="12.5" r="0.9" fill="#fef08a" />
          </g>
        </svg>
      `;

    case 'fog':
    case 'borrina':
      // 🌫️ NIEBLA / BORRINA: FRANZAS DE NIEBLA CON EL TAMBORIL HUMEANTE ENTRE LA BRUMA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-fog" aria-label="Niebla y Humo de Amagüestu">
          <!-- Bancos de niebla nítidos -->
          <line x1="6" y1="10" x2="42" y2="10" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
          <line x1="11" y1="16" x2="37" y2="16" stroke="#94a3b8" stroke-width="3.2" stroke-linecap="round" />
          <line x1="5" y1="22" x2="43" y2="22" stroke="#cbd5e1" stroke-width="3.2" stroke-linecap="round" />
          <line x1="9" y1="28" x2="39" y2="28" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />

          <!-- Cucurucho de castañas humeando en la niebla -->
          <polygon points="34,47 24,30 42,28" fill="#f1f5f9" stroke="#64748b" stroke-width="1.2" stroke-linejoin="round" />
          <ellipse cx="31" cy="27" rx="3.8" ry="3.2" fill="#78350f" />
          <line x1="29.5" y1="25.5" x2="32.5" y2="28" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round" />
          <!-- Humillo que se funde con la niebla -->
          <path d="M 32,23 Q 29,18 33,14" stroke="#ffffff" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.9" />
        </svg>
      `;

    case 'wet-fog':
      // 🌫️🫧 BORRINA HÚMEDA / MEONA: GOTAS DE ROCÍO MEÓN BRILLANTES Y CASTAÑA CONDENSADA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-wet-fog" aria-label="Borrina Húmeda de Amagüestu">
          <line x1="6" y1="11" x2="42" y2="11" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
          <line x1="10" y1="18" x2="38" y2="18" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
          <line x1="5" y1="25" x2="43" y2="25" stroke="#cbd5e1" stroke-width="3.2" stroke-linecap="round" />
          <line x1="8" y1="32" x2="40" y2="32" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />

          <!-- Grandes gotas condensadas de borrina meona azul cielo brillante -->
          <circle cx="16" cy="14.5" r="2.2" fill="#38bdf8" stroke="#0284c7" stroke-width="0.7" />
          <circle cx="32" cy="14.5" r="1.8" fill="#38bdf8" stroke="#0284c7" stroke-width="0.7" />
          <circle cx="23" cy="21.5" r="2.4" fill="#38bdf8" stroke="#0284c7" stroke-width="0.8" />
          <circle cx="13" cy="28.5" r="2" fill="#38bdf8" stroke="#0284c7" stroke-width="0.7" />
          <circle cx="35" cy="28.5" r="2.3" fill="#38bdf8" stroke="#0284c7" stroke-width="0.8" />

          <!-- Cucurucho con gotas de humedad -->
          <polygon points="34,47 24,32 42,30" fill="#e2e8f0" stroke="#64748b" stroke-width="1.1" stroke-linejoin="round" />
          <ellipse cx="31" cy="29" rx="3.5" ry="3" fill="#78350f" />
          <circle cx="37" cy="36" r="1.2" fill="#38bdf8" />
        </svg>
      `;

    case 'drizzle':
    case 'orbayu':
      // 🌧️ ORBAYU: AGUJAS FINAS DE LLUVIA CON CASTAÑA GUARECIÉNDOSE BAJO HOJA DE CARBAYU PARAGUAS
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-drizzle" aria-label="Orbayu con Castaña y Paraguas de Hoja">
          <!-- Nube gris suave -->
          <path d="M 42,21 H 13 A 7.5,7.5 0 0 1 12,11 A 10,10 0 0 1 35,10 A 7,7 0 0 1 42,21 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5" />

          <!-- Agujas finas de orbayu celestes diagonales -->
          <g stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round">
            <line x1="14" y1="25" x2="11" y2="32" />
            <line x1="21" y1="25" x2="18" y2="32" />
            <line x1="28" y1="25" x2="25" y2="32" />
            <line x1="16" y1="35" x2="13" y2="42" />
          </g>

          <!-- Hoja grande de roble otoñal haciendo de paraguas -->
          <path d="M 27,33 C 28,27 36,25 41,28 C 39,30 43,34 40,38 C 36,37 34,39 27,33 Z" fill="#d97706" stroke="#92400e" stroke-width="1.2" />
          <!-- Rabillo de la hoja paraguas -->
          <path d="M 33,36 L 33,42" stroke="#78350f" stroke-width="1.5" stroke-linecap="round" />

          <!-- Castañina calentina guarecida bajo la hoja -->
          <path d="M 36,46 C 31,46 29,41 32,37 C 34,33 40,33 43,38 C 45,42 41,46 36,46 Z" fill="#78350f" stroke="#3b1502" stroke-width="1.1" />
          <!-- Corte de asado -->
          <line x1="35" y1="37" x2="39" y2="41" stroke="#fef08a" stroke-width="1.3" stroke-linecap="round" />
        </svg>
      `;

    case 'showers':
    case 'chubascos':
    case 'sun-rain':
      // 🌦️🌰 CHUBASCOS CON SOL / LLUEVE Y FAI SOL: SOL RADIANTE + NUBE + LLUVIA + CUCURUCHO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-showers" aria-label="Chubascos con Sol de Amagüestu">
          <!-- Sol dorado nítido arriba a la izquierda -->
          <circle cx="16" cy="15" r="9.5" fill="#f59e0b" stroke="#d97706" stroke-width="1.2" />
          <g stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round">
            <line x1="16" y1="3" x2="16" y2="5.5" />
            <line x1="4" y1="15" x2="6.5" y2="15" />
            <line x1="7.5" y1="6.5" x2="9.5" y2="8.5" />
          </g>

          <!-- Nube de chubasco blanca y gris -->
          <path d="M 43,26 H 18 A 7.5,7.5 0 0 1 17,15 A 9.5,9.5 0 0 1 37,14 A 6.5,6.5 0 0 1 43,26 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />

          <!-- Gotas de lluvia azul marino brillantes -->
          <g stroke="#0284c7" stroke-width="2" stroke-linecap="round">
            <line x1="21" y1="30" x2="18" y2="38" />
            <line x1="27" y1="30" x2="24" y2="38" />
          </g>

          <!-- Cucurucho de castañas con humo bajo el sol y lluvia -->
          <polygon points="36,47 28,32 44,30" fill="#f1f5f9" stroke="#64748b" stroke-width="1.1" stroke-linejoin="round" />
          <ellipse cx="34" cy="29" rx="3.8" ry="3.2" fill="#78350f" />
          <line x1="32.5" y1="27.5" x2="35.5" y2="30.5" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round" />
          <path d="M 35,25 Q 33,21 36,17" stroke="#fef3c7" stroke-width="1.2" fill="none" stroke-linecap="round" />
        </svg>
      `;

    case 'rain':
    case 'rain-moderate':
      // 🌧️🏺 LLUVIA: NUBE CON GOTAS AZULES CAYENDO SOBRE GRAN XARRA DE BARRO CON SIDRA DULCE DE DUERNU
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-rain" aria-label="Lluvia y Jarra de Sidra Dulce de Amagüestu">
          <!-- Nube de lluvia gris media -->
          <path d="M 44,22 H 13 A 8,8 0 0 1 12,11 A 10.5,10.5 0 0 1 36,10 A 7.5,7.5 0 0 1 44,22 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="1.6" />

          <!-- Gotas de lluvia azul continuas -->
          <g stroke="#2563eb" stroke-width="2.2" stroke-linecap="round">
            <line x1="15" y1="26" x2="12" y2="34" />
            <line x1="22" y1="26" x2="19" y2="34" />
            <line x1="17" y1="37" x2="14" y2="45" />
          </g>

          <!-- GRAN XARRA TRADICIONAL DE BARRO CON SIDRA DULCE (Bien visible en la derecha) -->
          <g transform="translate(26, 23)">
            <!-- Asa gruesa de cerámica -->
            <path d="M 14,7 Q 19,12 14,17" fill="none" stroke="#78350f" stroke-width="2.4" stroke-linecap="round" />
            <!-- Cuerpo panzudo de barro cocido -->
            <path d="M 4,5 L 13,5 L 14,15 Q 14,20 8.5,20 Q 3,20 4,15 Z" fill="#b45309" stroke="#5c2609" stroke-width="1.5" />
            <!-- Cenefa decorativa tradicional amarilla de cerámica asturiana -->
            <path d="M 3.8,10 Q 8.5,12 13.2,10" stroke="#fef08a" stroke-width="1.4" fill="none" />
            <path d="M 3.8,14 Q 8.5,16 13.2,14" stroke="#fef08a" stroke-width="1.4" fill="none" />
            <!-- Boca de la xarra con sidra dulce dorada mayada -->
            <ellipse cx="8.5" cy="5" rx="4.5" ry="1.8" fill="#facc15" stroke="#5c2609" stroke-width="1" />
            <!-- Salpicadura de gota de lluvia en la xarra -->
            <circle cx="2" cy="18" r="1.3" fill="#60a5fa" />
          </g>
        </svg>
      `;

    case 'heavy-rain':
      // 🌧️💥 BASTINAZU: CORTINA TORRENCIAL CON 5 CHORROS SOBRE EL DUERNU DE MAYAR
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-heavy-rain" aria-label="Bastinazu de Amagüestu">
          <!-- Nube oscura de tormenta -->
          <path d="M 44,21 H 11 A 8.5,8.5 0 0 1 10,10 A 11,11 0 0 1 36,9 A 8,8 0 0 1 44,21 Z" fill="#64748b" stroke="#334155" stroke-width="1.8" />
          <!-- 5 chorros densos de lluvia torrencial -->
          <g stroke="#1d4ed8" stroke-width="2.6" stroke-linecap="round">
            <line x1="13" y1="25" x2="9" y2="36" />
            <line x1="20" y1="25" x2="16" y2="36" />
            <line x1="27" y1="25" x2="23" y2="36" />
            <line x1="34" y1="25" x2="30" y2="36" />
            <line x1="16" y1="38" x2="12" y2="47" />
            <line x1="24" y1="38" x2="20" y2="47" />
            <line x1="32" y1="38" x2="28" y2="47" />
          </g>
          <!-- Salpicaduras enérgicas -->
          <circle cx="11" cy="46" r="1.5" fill="#60a5fa" />
          <circle cx="27" cy="46" r="1.5" fill="#60a5fa" />
        </svg>
      `;

    case 'storm':
      // ⛈️⚡ TORMENTA ELÉCTRICA: NUBE PIZARRA CON RAYO DORADO Y CHISPAS VIVAS DE BRASA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-storm" aria-label="Tormenta de Amagüestu">
          <path d="M 44,22 H 11 A 8.5,8.5 0 0 1 10,10 A 11,11 0 0 1 36,9 A 8,8 0 0 1 44,22 Z" fill="#1e293b" stroke="#0f172a" stroke-width="1.8" />
          <!-- Rayo dorado zigzag prominente y brillante -->
          <polygon points="26,20 16,33 24,33 19,46 34,29 26,29" fill="#facc15" stroke="#ca8a04" stroke-width="1.2" />
          <!-- Chispas de brasa viva saltando del fuego -->
          <circle cx="13" cy="38" r="1.5" fill="#ef4444" />
          <circle cx="36" cy="34" r="1.6" fill="#f97316" />
          <circle cx="38" cy="42" r="1.2" fill="#fef08a" />
        </svg>
      `;

    case 'sleet':
      // 🌨️🧊 AGUANIEVE: LLUVIA FRÍA Y CRISTALES DE HIELO CAYENDO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-sleet" aria-label="Aguanieve de Amagüestu">
          <path d="M 43,22 H 12 A 8,8 0 0 1 11,11 A 10.5,10.5 0 0 1 35,10 A 7.5,7.5 0 0 1 43,22 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.6" />
          <g stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round">
            <line x1="16" y1="26" x2="13" y2="34" />
            <line x1="33" y1="26" x2="30" y2="34" />
            <line x1="28" y1="37" x2="25" y2="45" />
          </g>
          <!-- Cristales geométricos de hielo blanco -->
          <g stroke="#ffffff" stroke-width="1.8" stroke-linecap="round">
            <line x1="24" y1="26" x2="24" y2="33" />
            <line x1="20.5" y1="29.5" x2="27.5" y2="29.5" />
            <line x1="18" y1="38" x2="18" y2="45" />
            <line x1="14.5" y1="41.5" x2="21.5" y2="41.5" />
          </g>
        </svg>
      `;

    case 'snow-light':
      // 🌨️ FALISPOS DE NIEVE: COPOS SUAVES CAYENDO SOBRE CUCURUCHO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-snow-light" aria-label="Falispos de Nieve con Cucurucho">
          <path d="M 43,22 H 13 A 8,8 0 0 1 12,11 A 10.5,10.5 0 0 1 35,10 A 7.5,7.5 0 0 1 43,22 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.6" />
          <!-- Copos simétricos blancos -->
          <g stroke="#ffffff" stroke-width="1.8" stroke-linecap="round">
            <line x1="16" y1="26" x2="16" y2="34" /><line x1="12" y1="30" x2="20" y2="30" />
            <line x1="26" y1="26" x2="26" y2="34" /><line x1="22" y1="30" x2="30" y2="30" />
            <line x1="20" y1="37" x2="20" y2="45" /><line x1="16" y1="41" x2="24" y2="41" />
          </g>
          <!-- Cucurucho de castañas calientes en la nieve -->
          <polygon points="36,47 28,33 44,31" fill="#f1f5f9" stroke="#64748b" stroke-width="1.1" stroke-linejoin="round" />
          <ellipse cx="34" cy="30" rx="3.5" ry="3" fill="#78350f" />
          <path d="M 35,26 Q 33,22 36,18" stroke="#fef08a" stroke-width="1.2" fill="none" stroke-linecap="round" />
        </svg>
      `;

    case 'snow':
      // ❄️🧣 NEVADA: COPOS CAYENDO SOBRE CASTAÑINA CALENTINA CON BUFANDINA ROJA DE LANA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-snow" aria-label="Nevada con Castaña Abrigada">
          <!-- Nube invernal -->
          <path d="M 43,21 H 12 A 8.5,8.5 0 0 1 11,10 A 11,11 0 0 1 36,9 A 8,8 0 0 1 43,21 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="1.6" />

          <!-- Copos de nieve azules claros -->
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round">
            <line x1="14" y1="25" x2="14" y2="33" /><line x1="10" y1="29" x2="18" y2="29" />
            <line x1="11" y1="26" x2="17" y2="32" /><line x1="17" y1="26" x2="11" y2="32" />
          </g>

          <!-- CASTAÑA ASADA CON BUFANDINA ROJA DE LANA (Bien visible en la base) -->
          <g transform="translate(23, 24)">
            <!-- Humillo que sale de la castañina -->
            <path d="M 10,-1 Q 8,-5 11,-9" stroke="#f1f5f9" stroke-width="1.3" fill="none" stroke-linecap="round" />
            <!-- Cuerpo de la castaña -->
            <path d="M 10,0 C 4,0 1,5 3,11 C 5,16 15,16 17,11 C 19,5 16,0 10,0 Z" fill="#78350f" stroke="#3b1502" stroke-width="1.3" />
            <!-- Ojitos felices sonrientes -->
            <circle cx="7" cy="5.5" r="0.9" fill="#fef08a" />
            <circle cx="13" cy="5.5" r="0.9" fill="#fef08a" />
            <!-- Bufanda roja de lana enrollada al cuello -->
            <path d="M 2,10 Q 10,14 18,10" stroke="#ef4444" stroke-width="3.2" fill="none" stroke-linecap="round" />
            <!-- Flecos / Cola de la bufanda colgando -->
            <path d="M 14,10 L 15,18" stroke="#ef4444" stroke-width="2.8" stroke-linecap="round" />
            <circle cx="15" cy="14" r="1" fill="#ffffff" />
          </g>
        </svg>
      `;

    case 'heavy-snow':
    case 'nevadona':
      // ❄️🏔️ NEVADONA COPIOSA: COPOS DOBLES GRANDES CAYENDO SOBRE TAMBORIL NEVADO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-heavy-snow" aria-label="Nevadona de Amagüestu">
          <path d="M 44,20 H 11 A 8.5,8.5 0 0 1 10,9 A 11,11 0 0 1 36,8 A 8,8 0 0 1 44,20 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.8" />
          <!-- Grandes copos dobles -->
          <g stroke="#ffffff" stroke-width="2.2" stroke-linecap="round">
            <line x1="14" y1="24" x2="14" y2="33" /><line x1="9.5" y1="28.5" x2="18.5" y2="28.5" />
            <line x1="26" y1="24" x2="26" y2="33" /><line x1="21.5" y1="28.5" x2="30.5" y2="28.5" />
            <line x1="38" y1="24" x2="38" y2="33" /><line x1="33.5" y1="28.5" x2="42.5" y2="28.5" />
            <line x1="20" y1="36" x2="20" y2="45" /><line x1="15.5" y1="40.5" x2="24.5" y2="40.5" />
            <line x1="32" y1="36" x2="32" y2="45" /><line x1="27.5" y1="40.5" x2="36.5" y2="40.5" />
          </g>
          <!-- Manto de nieve espesa en el suelo -->
          <path d="M 6,46 Q 24,41 42,46" stroke="#f1f5f9" stroke-width="3.5" fill="none" stroke-linecap="round" />
        </svg>
      `;

    case 'hail':
      // 🧊⚡ GRANIZO / PEDRISCU: NUBE TORMENTOSA CON PIEDRAS DE HIELO REBOTANDO EN CASTAÑA
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-hail" aria-label="Granizo y Pedriscu de Amagüestu">
          <path d="M 43,21 H 11 A 8.5,8.5 0 0 1 10,10 A 11,11 0 0 1 36,9 A 8,8 0 0 1 43,21 Z" fill="#334155" stroke="#1e293b" stroke-width="1.8" />
          <!-- Piedras anguladas de hielo rebotando -->
          <polygon points="13,26 18,28 15,34 10,32" fill="#ffffff" stroke="#0284c7" stroke-width="1.3" />
          <polygon points="25,27 31,25 33,32 27,35 23,32" fill="#f8fafc" stroke="#0284c7" stroke-width="1.5" />
          <polygon points="37,28 41,32 38,37 34,34" fill="#ffffff" stroke="#0284c7" stroke-width="1.3" />
          <!-- Líneas de impacto y rebote -->
          <line x1="12" y1="36" x2="10" y2="41" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round" />
          <line x1="28" y1="37" x2="27" y2="43" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" />
          <line x1="37" y1="39" x2="36" y2="44" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round" />
        </svg>
      `;

    default:
      // Nube amigable por defecto con cucurucho de castañas
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="amaguestu-svg-icon icon-amg-cloud" aria-label="Nube de Amagüestu">
          <path d="M 42,26 H 13 A 8,8 0 0 1 12,14 A 10.5,10.5 0 0 1 36,13 A 7.5,7.5 0 0 1 42,26 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.6" />
          <polygon points="34,47 24,30 42,28" fill="#f1f5f9" stroke="#64748b" stroke-width="1.1" stroke-linejoin="round" />
          <ellipse cx="31" cy="27" rx="3.8" ry="3.2" fill="#78350f" />
          <line x1="29.5" y1="25.5" x2="32.5" y2="28" stroke="#fef08a" stroke-width="1.2" stroke-linecap="round" />
        </svg>
      `;
  }
}
