/**
 * Catálogo Oficial de Iconos "Pixel Art Retro" (8-Bits Arcade)
 * Iconos estilo videojuego retro con renderizado de píxeles nítidos
 */

export function getPixelWeatherSvg(iconKey, size = 32) {
  const sz = parseInt(size, 10) || 32;

  switch (iconKey) {
    case 'clear-day':
    case 'sun':
      // ☀️ SOL PIXEL ART 8-BITS
      return `
        <svg viewBox="0 0 24 24" width="${sz}" height="${sz}" class="astur-svg-icon pixel-icon" shape-rendering="crispEdges" aria-label="Sol Pixel Art">
          <!-- Rayos Pixelados -->
          <rect x="11" y="1" width="2" height="3" fill="#f59e0b" />
          <rect x="11" y="20" width="2" height="3" fill="#f59e0b" />
          <rect x="1" y="11" width="3" height="2" fill="#f59e0b" />
          <rect x="20" y="11" width="3" height="2" fill="#f59e0b" />
          <rect x="4" y="4" width="2" height="2" fill="#f59e0b" />
          <rect x="18" y="4" width="2" height="2" fill="#f59e0b" />
          <rect x="4" y="18" width="2" height="2" fill="#f59e0b" />
          <rect x="18" y="18" width="2" height="2" fill="#f59e0b" />
          <!-- Disco Solar Pixel -->
          <rect x="9" y="6" width="6" height="12" fill="#facc15" />
          <rect x="6" y="9" width="12" height="6" fill="#facc15" />
          <rect x="8" y="7" width="8" height="10" fill="#fde047" />
          <rect x="7" y="8" width="10" height="8" fill="#fde047" />
          <!-- Borde Retro -->
          <rect x="9" y="5" width="6" height="1" fill="#ca8a04" />
          <rect x="9" y="18" width="6" height="1" fill="#ca8a04" />
          <rect x="5" y="9" width="1" height="6" fill="#ca8a04" />
          <rect x="18" y="9" width="1" height="6" fill="#ca8a04" />
          <!-- Brillo de Píxel -->
          <rect x="8" y="8" width="2" height="2" fill="#ffffff" />
        </svg>
      `;

    case 'clear-night':
    case 'moon':
      // 🌙 LUNA PIXEL ART 8-BITS
      return `
        <svg viewBox="0 0 24 24" width="${sz}" height="${sz}" class="astur-svg-icon pixel-icon" shape-rendering="crispEdges" aria-label="Luna Pixel Art">
          <!-- Luna Creciente Pixelada -->
          <rect x="12" y="3" width="4" height="2" fill="#38bdf8" />
          <rect x="8" y="5" width="4" height="2" fill="#38bdf8" />
          <rect x="6" y="7" width="3" height="4" fill="#38bdf8" />
          <rect x="5" y="11" width="3" height="4" fill="#38bdf8" />
          <rect x="6" y="15" width="4" height="3" fill="#38bdf8" />
          <rect x="9" y="18" width="5" height="2" fill="#38bdf8" />
          <rect x="14" y="19" width="3" height="2" fill="#38bdf8" />
          <!-- Brillo Interior -->
          <rect x="9" y="7" width="2" height="7" fill="#bae6fd" />
          <rect x="8" y="14" width="3" height="3" fill="#bae6fd" />
          <!-- Estrellas Pixel -->
          <rect x="18" y="6" width="2" height="2" fill="#fef08a" />
          <rect x="17" y="7" width="4" height="1" fill="#fef08a" />
          <rect x="18" y="14" width="1" height="1" fill="#fef08a" />
        </svg>
      `;

    case 'partly-cloudy-day':
    case 'cloud-sun':
      // ⛅ SOL Y NUBE PIXEL ART
      return `
        <svg viewBox="0 0 24 24" width="${sz}" height="${sz}" class="astur-svg-icon pixel-icon" shape-rendering="crispEdges" aria-label="Sol y Nube Pixel">
          <!-- Sol de fondo -->
          <rect x="6" y="3" width="6" height="6" fill="#facc15" />
          <rect x="5" y="2" width="2" height="2" fill="#f59e0b" />
          <rect x="11" y="2" width="2" height="2" fill="#f59e0b" />
          <rect x="2" y="5" width="2" height="2" fill="#f59e0b" />
          <!-- Nube pixelada al frente -->
          <rect x="9" y="10" width="8" height="3" fill="#ffffff" />
          <rect x="6" y="13" width="14" height="6" fill="#ffffff" />
          <rect x="4" y="15" width="18" height="4" fill="#ffffff" />
          <!-- Sombras de píxel -->
          <rect x="5" y="18" width="16" height="2" fill="#94a3b8" />
          <rect x="18" y="14" width="3" height="4" fill="#cbd5e1" />
        </svg>
      `;

    case 'partly-cloudy-night':
    case 'cloud-moon':
      // ☁️🌙 LUNA Y NUBE PIXEL ART
      return `
        <svg viewBox="0 0 24 24" width="${sz}" height="${sz}" class="astur-svg-icon pixel-icon" shape-rendering="crispEdges" aria-label="Luna y Nube Pixel">
          <!-- Luna de fondo -->
          <rect x="12" y="3" width="4" height="2" fill="#38bdf8" />
          <rect x="10" y="5" width="3" height="4" fill="#38bdf8" />
          <!-- Nube pixelada de noche -->
          <rect x="8" y="10" width="8" height="3" fill="#64748b" />
          <rect x="5" y="13" width="14" height="6" fill="#64748b" />
          <rect x="3" y="15" width="18" height="4" fill="#64748b" />
          <rect x="4" y="18" width="16" height="2" fill="#334155" />
        </svg>
      `;

    case 'cloudy':
    case 'cloud':
      // ☁️ NUBE PIXEL ART
      return `
        <svg viewBox="0 0 24 24" width="${sz}" height="${sz}" class="astur-svg-icon pixel-icon" shape-rendering="crispEdges" aria-label="Nube Pixel Art">
          <rect x="8" y="7" width="8" height="4" fill="#ffffff" />
          <rect x="5" y="10" width="14" height="6" fill="#ffffff" />
          <rect x="3" y="13" width="18" height="5" fill="#ffffff" />
          <!-- Sombra pixelada -->
          <rect x="4" y="17" width="16" height="2" fill="#94a3b8" />
          <rect x="7" y="9" width="10" height="2" fill="#f8fafc" />
        </svg>
      `;

    case 'fog':
    case 'borrina':
      // 🌫️ NIEBLA PIXEL ART
      return `
        <svg viewBox="0 0 24 24" width="${sz}" height="${sz}" class="astur-svg-icon pixel-icon" shape-rendering="crispEdges" aria-label="Niebla Pixel Art">
          <rect x="4" y="6" width="16" height="2" fill="#e2e8f0" />
          <rect x="2" y="10" width="20" height="2" fill="#cbd5e1" />
          <rect x="5" y="14" width="14" height="2" fill="#94a3b8" />
          <rect x="3" y="18" width="18" height="2" fill="#64748b" />
        </svg>
      `;

    case 'drizzle':
    case 'orbayu':
      // 🌦️ ORBAYU PIXEL ART
      return `
        <svg viewBox="0 0 24 24" width="${sz}" height="${sz}" class="astur-svg-icon pixel-icon" shape-rendering="crispEdges" aria-label="Orbayu Pixel Art">
          <!-- Nube -->
          <rect x="7" y="5" width="8" height="3" fill="#cbd5e1" />
          <rect x="4" y="8" width="14" height="5" fill="#cbd5e1" />
          <rect x="3" y="11" width="16" height="3" fill="#cbd5e1" />
          <!-- Gotitas pixel finas -->
          <rect x="6" y="16" width="2" height="2" fill="#38bdf8" />
          <rect x="11" y="18" width="2" height="2" fill="#38bdf8" />
          <rect x="16" y="16" width="2" height="2" fill="#38bdf8" />
        </svg>
      `;

    case 'rain':
    case 'rain-moderate':
      // 🌧️ LLUVIA PIXEL ART
      return `
        <svg viewBox="0 0 24 24" width="${sz}" height="${sz}" class="astur-svg-icon pixel-icon" shape-rendering="crispEdges" aria-label="Lluvia Pixel Art">
          <!-- Nube Oscura -->
          <rect x="7" y="4" width="8" height="3" fill="#64748b" />
          <rect x="4" y="7" width="14" height="5" fill="#64748b" />
          <rect x="3" y="10" width="16" height="3" fill="#475569" />
          <!-- Rayas diagonales de lluvia -->
          <rect x="6" y="15" width="2" height="4" fill="#0284c7" />
          <rect x="5" y="16" width="2" height="4" fill="#38bdf8" />
          <rect x="11" y="15" width="2" height="4" fill="#0284c7" />
          <rect x="10" y="16" width="2" height="4" fill="#38bdf8" />
          <rect x="16" y="15" width="2" height="4" fill="#0284c7" />
          <rect x="15" y="16" width="2" height="4" fill="#38bdf8" />
        </svg>
      `;

    case 'heavy-rain':
    case 'storm':
      // ⛈️ TORMENTA PIXEL ART CON RAYO ARCADE
      return `
        <svg viewBox="0 0 24 24" width="${sz}" height="${sz}" class="astur-svg-icon pixel-icon" shape-rendering="crispEdges" aria-label="Tormenta Pixel Art">
          <!-- Nube Tormenta -->
          <rect x="7" y="3" width="9" height="3" fill="#334155" />
          <rect x="4" y="6" width="15" height="5" fill="#1e293b" />
          <!-- Rayo Amarillo Arcade -->
          <rect x="12" y="10" width="3" height="2" fill="#facc15" />
          <rect x="10" y="12" width="3" height="2" fill="#facc15" />
          <rect x="8" y="14" width="5" height="2" fill="#facc15" />
          <rect x="10" y="16" width="2" height="2" fill="#facc15" />
          <rect x="9" y="18" width="2" height="2" fill="#facc15" />
          <rect x="8" y="20" width="2" height="2" fill="#fef08a" />
          <!-- Gotas de lluvia laterales -->
          <rect x="4" y="14" width="2" height="3" fill="#38bdf8" />
          <rect x="18" y="14" width="2" height="3" fill="#38bdf8" />
        </svg>
      `;

    case 'snow':
    case 'nevadona':
      // ❄️ NIEVE PIXEL ART
      return `
        <svg viewBox="0 0 24 24" width="${sz}" height="${sz}" class="astur-svg-icon pixel-icon" shape-rendering="crispEdges" aria-label="Nieve Pixel Art">
          <!-- Nube Blanca -->
          <rect x="7" y="4" width="8" height="3" fill="#ffffff" />
          <rect x="4" y="7" width="14" height="5" fill="#ffffff" />
          <rect x="3" y="10" width="16" height="3" fill="#cbd5e1" />
          <!-- Copos en cruz 8-bits -->
          <rect x="6" y="16" width="1" height="3" fill="#ffffff" />
          <rect x="5" y="17" width="3" height="1" fill="#ffffff" />
          <rect x="12" y="17" width="1" height="3" fill="#ffffff" />
          <rect x="11" y="18" width="3" height="1" fill="#ffffff" />
          <rect x="18" y="16" width="1" height="3" fill="#ffffff" />
          <rect x="17" y="17" width="3" height="1" fill="#ffffff" />
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 24 24" width="${sz}" height="${sz}" class="astur-svg-icon pixel-icon" shape-rendering="crispEdges">
          <rect x="8" y="7" width="8" height="4" fill="#ffffff" />
          <rect x="5" y="10" width="14" height="6" fill="#ffffff" />
          <rect x="3" y="13" width="18" height="5" fill="#ffffff" />
        </svg>
      `;
  }
}
