/**
 * Catálogo Oficial de Iconos "Dibujo a Mano" (Hand-Drawn & Watercolor Sketch)
 * Trazos orgánicos artísticos a mano alzada con texturas de lápiz y toques cálidos de acuarela
 */

export function getSketchWeatherSvg(iconKey, size = 32) {
  const sz = parseInt(size, 10) || 32;

  switch (iconKey) {
    case 'clear-day':
    case 'sun':
      // ☀️ SOL DIBUJADO A MANO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon sketch-icon" aria-label="Sol Dibujo a Mano">
          <!-- Relleno estilo acuarela suave -->
          <circle cx="24" cy="24" r="11" fill="#fef08a" opacity="0.85" />
          <!-- Rayado artístico de sombreado (hatching) -->
          <g stroke="#f59e0b" stroke-width="1.2" stroke-linecap="round" opacity="0.6">
            <line x1="20" y1="17" x2="28" y2="25" />
            <line x1="17" y1="22" x2="25" y2="30" />
            <line x1="22" y1="15" x2="30" y2="23" />
          </g>
          <!-- Círculo principal a mano alzada -->
          <path d="M 23.5,13 C 30,12.5 35.5,17.8 35,24.2 C 34.6,30.5 29.2,35.2 23,35 C 16.8,34.8 12.2,29.5 13,23.2 C 13.7,17.2 18.2,13.2 24.2,13" fill="none" stroke="#d97706" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Rayos ondulados a mano alzada -->
          <g stroke="#d97706" stroke-width="2.2" stroke-linecap="round" fill="none">
            <path d="M 24,4 C 23.5,6.5 24.5,8 24,10" />
            <path d="M 24,38 C 24.5,40.5 23.5,42 24,44" />
            <path d="M 4,24 C 6.5,23.5 8,24.5 10,24" />
            <path d="M 38,24 C 40.5,24.5 42,23.5 44,24" />
            <path d="M 9.5,9.5 C 11.5,11 13,12.5 14,14" />
            <path d="M 34,34 C 35.5,35.5 37,37 38.5,38.5" />
            <path d="M 9.5,38.5 C 11,37 12.5,35.5 14,34" />
            <path d="M 34,14 C 35.5,12.5 37,11 38.5,9.5" />
          </g>
        </svg>
      `;

    case 'clear-night':
    case 'moon':
      // 🌙 LUNA DIBUJADA A MANO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon sketch-icon" aria-label="Luna Dibujo a Mano">
          <!-- Relleno acuarela celeste -->
          <path d="M 32,28 A 13.5,13.5 0 0 1 17.5,8 A 14,14 0 1 0 32,28 Z" fill="#bae6fd" opacity="0.85" />
          <!-- Trazo de pluma / lápiz -->
          <path d="M 32,28 C 26,29 20,24 18,18 C 16.5,13.5 17.2,10 17.5,8 C 11,10.5 7.5,17 8.5,24 C 9.5,31.5 16,37 23.5,37 C 28.5,37 33,33.5 34.5,28.5" fill="none" stroke="#0284c7" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Rayado sombreado interior -->
          <g stroke="#0369a1" stroke-width="1.2" stroke-linecap="round" opacity="0.5">
            <line x1="14" y1="22" x2="20" y2="28" />
            <line x1="16" y1="27" x2="23" y2="33" />
          </g>
          <!-- Estrellitas dibujadas tipo garabato -->
          <g stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" fill="none">
            <path d="M 36,8 L 36,14 M 33,11 L 39,11" />
            <path d="M 41,20 L 41,24 M 39,22 L 43,22" />
            <circle cx="28" cy="6" r="1" fill="#38bdf8" />
          </g>
        </svg>
      `;

    case 'partly-cloudy-day':
    case 'cloud-sun':
      // ⛅ SOL Y NUBE DIBUJADOS A MANO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon sketch-icon" aria-label="Sol y Nube Dibujo">
          <!-- Sol de fondo -->
          <circle cx="17" cy="16" r="8" fill="#fef08a" opacity="0.8" />
          <path d="M 17,6 L 17,9 M 8,15 L 11,15 M 10,9 L 12,11 M 23,8 L 21.5,10.5" stroke="#d97706" stroke-width="2" stroke-linecap="round" fill="none" />
          <path d="M 16.5,8 C 21.5,7.8 25.5,11.8 25,17" fill="none" stroke="#d97706" stroke-width="2.2" stroke-linecap="round" />
          <!-- Nube acuarela -->
          <path d="M 39,37 H 15 C 10.5,37 9,30 13,26 C 12,19 21,17 25,20 C 29,16 38,19 37,27 C 41,29 41.5,37 39,37 Z" fill="#f8fafc" opacity="0.9" />
          <!-- Contorno de pluma / tinta para la nube -->
          <path d="M 14.5,36.5 C 10.5,36.5 8.5,31 12.5,27.5 C 11.5,21 19.5,18 24,21 C 27.5,17 36,19 36,26.5 C 40.5,28 41,36 36.5,36.5 Z" fill="none" stroke="#475569" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Rayitas de sombreado nube -->
          <g stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round" opacity="0.6">
            <line x1="16" y1="33" x2="21" y2="35.5" />
            <line x1="24" y1="33" x2="29" y2="35.5" />
            <line x1="32" y1="33" x2="36" y2="35" />
          </g>
        </svg>
      `;

    case 'partly-cloudy-night':
    case 'cloud-moon':
      // ☁️🌙 LUNA Y NUBE DIBUJADAS A MANO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon sketch-icon" aria-label="Luna y Nube Dibujo">
          <!-- Luna -->
          <path d="M 27,16 C 22,17 18,13 17,8 C 12,10 9,16 11,21 C 12,24 15,26 18,26" fill="#bae6fd" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
          <!-- Nube acuarela nocturna -->
          <path d="M 39,37 H 15 C 10.5,37 9,30 13,26 C 12,19 21,17 25,20 C 29,16 38,19 37,27 C 41,29 41.5,37 39,37 Z" fill="#334155" opacity="0.85" />
          <path d="M 14.5,36.5 C 10.5,36.5 8.5,31 12.5,27.5 C 11.5,21 19.5,18 24,21 C 27.5,17 36,19 36,26.5 C 40.5,28 41,36 36.5,36.5 Z" fill="none" stroke="#94a3b8" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;

    case 'cloudy':
    case 'cloud':
      // ☁️ NUBE DIBUJO A MANO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon sketch-icon" aria-label="Nube Dibujo a Mano">
          <!-- Relleno suave de papel/acuarela -->
          <path d="M 40,36 H 13 C 8,36 7,29 11,24 C 9.5,16 20,13 25,17 C 29.5,12.5 40,16 38,25 C 43,27.5 43,36 40,36 Z" fill="#ffffff" opacity="0.92" />
          <!-- Trazo orgánico doble/artesanal -->
          <path d="M 13,35.5 C 8.5,35.5 7.5,29.5 11.5,25 C 10,17.5 20,14.5 25,18 C 29.5,13.5 39.5,17 37.5,25.5 C 42,28 42,35.5 38.5,35.5 Z" fill="none" stroke="#334155" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Rayitas de sombreado a lápiz -->
          <g stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round" opacity="0.7">
            <line x1="15" y1="31" x2="20" y2="34" />
            <line x1="22" y1="31" x2="27" y2="34" />
            <line x1="29" y1="31" x2="34" y2="34" />
            <line x1="35" y1="30" x2="39" y2="33" />
          </g>
        </svg>
      `;

    case 'fog':
    case 'borrina':
      // 🌫️ NIEBLA DIBUJADA A MANO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon sketch-icon" aria-label="Niebla Dibujo a Mano">
          <g stroke="#64748b" stroke-width="2.3" stroke-linecap="round" fill="none">
            <path d="M 8,14 C 14,12.5 20,15.5 26,14 C 32,12.5 36,15 40,14" />
            <path d="M 5,22 C 12,20 18,23.5 25,21.5 C 32,19.5 38,23 43,21" />
            <path d="M 9,30 C 15,28.5 21,31 27,29.5 C 33,28 36,30.5 39,29.5" />
            <path d="M 7,38 C 13,36 20,39 27,37.5 C 34,36 38,38.5 42,37" />
          </g>
        </svg>
      `;

    case 'drizzle':
    case 'orbayu':
      // 🌦️ ORBAYU DIBUJADO A MANO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon sketch-icon" aria-label="Orbayu Dibujo a Mano">
          <!-- Nube -->
          <path d="M 39,24 H 13 C 8.5,24 8,17 12,13 C 11,6 20,4 24,7 C 28,3 37,6 36,14 C 40,16 41,24 39,24 Z" fill="#e2e8f0" stroke="#475569" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Rayitas finas dibujadas de orbayu -->
          <g stroke="#38bdf8" stroke-width="2" stroke-linecap="round">
            <line x1="14" y1="30" x2="12" y2="35" />
            <line x1="22" y1="29" x2="20" y2="34" />
            <line x1="30" y1="30" x2="28" y2="35" />
            <line x1="17" y1="38" x2="15" y2="43" />
            <line x1="26" y1="38" x2="24" y2="43" />
            <line x1="34" y1="37" x2="32" y2="42" />
          </g>
        </svg>
      `;

    case 'rain':
    case 'rain-moderate':
      // 🌧️ LLUVIA DIBUJADA A MANO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon sketch-icon" aria-label="Lluvia Dibujo a Mano">
          <!-- Nube sombreada -->
          <path d="M 40,23 H 13 C 8,23 7,16 11,12 C 10,5 19,3 24,6 C 28,2 37,5 36,13 C 41,15 42,23 40,23 Z" fill="#cbd5e1" stroke="#334155" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Gotitas dibujadas con forma de lágrima y trazo -->
          <g stroke="#0284c7" stroke-width="2.2" stroke-linecap="round" fill="#38bdf8">
            <path d="M 14,29 C 14,29 10,36 10,38 A 3,3 0 0 0 16,38 C 16,36 14,29 14,29 Z" />
            <path d="M 25,30 C 25,30 21,37 21,39 A 3,3 0 0 0 27,39 C 27,37 25,30 25,30 Z" />
            <path d="M 36,29 C 36,29 32,36 32,38 A 3,3 0 0 0 38,38 C 38,36 36,29 36,29 Z" />
          </g>
        </svg>
      `;

    case 'heavy-rain':
    case 'storm':
      // ⛈️ TORMENTA DIBUJO A MANO CON RAYO ZIG-ZAG
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon sketch-icon" aria-label="Tormenta Dibujo a Mano">
          <!-- Nube oscura -->
          <path d="M 40,21 H 13 C 8,21 7,14 11,10 C 10,3 19,1 24,4 C 28,0 37,3 36,11 C 41,13 42,21 40,21 Z" fill="#475569" stroke="#1e293b" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Rayo dibujado a mano alzada en zig-zag amarillo -->
          <polygon points="25,16 17,29 23,29 18,44 33,26 26,26" fill="#fde047" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Gotitas laterales -->
          <line x1="10" y1="28" x2="8" y2="35" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
          <line x1="39" y1="28" x2="37" y2="35" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
        </svg>
      `;

    case 'snow':
    case 'nevadona':
      // ❄️ NIEVE DIBUJO A MANO
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon sketch-icon" aria-label="Nieve Dibujo a Mano">
          <!-- Copo de nieve dibujado a mano alzada -->
          <g stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" fill="none">
            <line x1="24" y1="6" x2="24" y2="42" />
            <line x1="6" y1="24" x2="42" y2="24" />
            <line x1="11" y1="11" x2="37" y2="37" />
            <line x1="11" y1="37" x2="37" y2="11" />
            <!-- Vértices doodle -->
            <path d="M 21,11 L 24,14 L 27,11" />
            <path d="M 21,37 L 24,34 L 27,37" />
            <path d="M 11,21 L 14,24 L 11,27" />
            <path d="M 37,21 L 34,24 L 37,27" />
          </g>
          <circle cx="24" cy="24" r="3" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8" />
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 48 48" width="${sz}" height="${sz}" class="astur-svg-icon sketch-icon">
          <path d="M 40,36 H 13 C 8,36 7,29 11,24 C 9.5,16 20,13 25,17 C 29.5,12.5 40,16 38,25 C 43,27.5 43,36 40,36 Z" fill="#ffffff" stroke="#334155" stroke-width="2.4" />
        </svg>
      `;
  }
}
