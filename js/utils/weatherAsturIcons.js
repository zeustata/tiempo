/**
 * Catálogo Oficial de Iconos Vectoriales SVG "Estilu Asturianu"
 * Diseñados con la paleta de Asturias (Azul Cantábrico, Oro Victoria, Verde Prau, Gris Pizarra)
 */

export function getAsturWeatherSvg(iconKey, size = 32) {
  const sz = parseInt(size, 10) || 32;

  switch (iconKey) {
    case 'clear-day':
    case 'sun':
      // Soleyeru Radiante
      return `
        <svg viewBox="0 0 32 32" width="${sz}" height="${sz}" class="astur-svg-icon icon-sun" aria-hidden="true">
          <circle cx="16" cy="16" r="6" fill="#facc15" stroke="#eab308" stroke-width="1.2" />
          <g stroke="#f59e0b" stroke-width="2" stroke-linecap="round">
            <line x1="16" y1="3" x2="16" y2="6" />
            <line x1="16" y1="26" x2="16" y2="29" />
            <line x1="3" y1="16" x2="6" y2="16" />
            <line x1="26" y1="16" x2="29" y2="16" />
            <line x1="6.8" y1="6.8" x2="8.9" y2="8.9" />
            <line x1="23.1" y1="23.1" x2="25.2" y2="25.2" />
            <line x1="6.8" y1="25.2" x2="8.9" y2="23.1" />
            <line x1="23.1" y1="8.9" x2="25.2" y2="6.8" />
          </g>
        </svg>
      `;

    case 'clear-night':
    case 'moon':
      // Noche Estrellada Asturiana
      return `
        <svg viewBox="0 0 32 32" width="${sz}" height="${sz}" class="astur-svg-icon icon-moon" aria-hidden="true">
          <path d="M22 17.5A8.5 8.5 0 0 1 12 5a8.5 8.5 0 1 0 10 12.5z" fill="#38bdf8" stroke="#0284c7" stroke-width="1" />
          <circle cx="23" cy="7" r="1.4" fill="#fef08a" />
          <circle cx="27" cy="13" r="1" fill="#fef08a" />
          <circle cx="18" cy="3.5" r="1" fill="#fef08a" />
        </svg>
      `;

    case 'mostly-clear-day':
    case 'partly-cloudy-day':
    case 'cloud-sun':
      // Intervalos Nubosos de Día
      return `
        <svg viewBox="0 0 32 32" width="${sz}" height="${sz}" class="astur-svg-icon icon-cloud-sun" aria-hidden="true">
          <circle cx="12" cy="11" r="5" fill="#facc15" stroke="#eab308" stroke-width="1" />
          <g stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round">
            <line x1="12" y1="2" x2="12" y2="4.5" />
            <line x1="3.5" y1="11" x2="6" y2="11" />
            <line x1="6" y1="5" x2="7.8" y2="6.8" />
            <line x1="18" y1="5" x2="16.2" y2="6.8" />
          </g>
          <path d="M24 23H11a5 5 0 0 1-.9-9.9A6.5 6.5 0 0 1 23 14a4.5 4.5 0 0 1 1 9z" fill="#64748b" />
          <path d="M23 22H11.5a4 4 0 0 1-.7-7.9A5.5 5.5 0 0 1 22 14.5a3.5 3.5 0 0 1 1 7.5z" fill="#cbd5e1" />
        </svg>
      `;

    case 'mostly-clear-night':
    case 'partly-cloudy-night':
    case 'cloud-moon':
      // Noche con Nubes / Claros
      return `
        <svg viewBox="0 0 32 32" width="${sz}" height="${sz}" class="astur-svg-icon icon-cloud-moon" aria-hidden="true">
          <path d="M18 11.5A5.5 5.5 0 0 1 11.5 3a5.5 5.5 0 1 0 6.5 8.5z" fill="#38bdf8" />
          <circle cx="21" cy="5" r="1.1" fill="#fef08a" />
          <path d="M24 23H11a5 5 0 0 1-.9-9.9A6.5 6.5 0 0 1 23 14a4.5 4.5 0 0 1 1 9z" fill="#475569" />
          <path d="M23 22H11.5a4 4 0 0 1-.7-7.9A5.5 5.5 0 0 1 22 14.5a3.5 3.5 0 0 1 1 7.5z" fill="#94a3b8" />
        </svg>
      `;

    case 'cloudy':
    case 'cloud':
      // Nublado / Cubiertu Asturiano (Nube Pizarra)
      return `
        <svg viewBox="0 0 32 32" width="${sz}" height="${sz}" class="astur-svg-icon icon-cloud" aria-hidden="true">
          <path d="M25 24H9a6 6 0 0 1-1-11.9A7.5 7.5 0 0 1 23 13a5.5 5.5 0 0 1 2 11z" fill="#475569" />
          <path d="M24 23H9.5a5 5 0 0 1-.8-9.9A6.5 6.5 0 0 1 22 14a4.5 4.5 0 0 1 2 9z" fill="#94a3b8" />
        </svg>
      `;

    case 'fog':
    case 'borrina':
      // La Borrina (Niebla de Valle y Costa)
      return `
        <svg viewBox="0 0 32 32" width="${sz}" height="${sz}" class="astur-svg-icon icon-fog" aria-hidden="true">
          <path d="M23 13H10a4 4 0 0 1-.7-7.9A5 5 0 0 1 21.5 6a3.5 3.5 0 0 1 1.5 7z" fill="#64748b" opacity="0.7" />
          <line x1="5" y1="17" x2="27" y2="17" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" />
          <line x1="8" y1="21" x2="24" y2="21" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" />
          <line x1="6" y1="25" x2="26" y2="25" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" />
        </svg>
      `;

    case 'drizzle':
    case 'orbayu':
      // L'Orbayu (Calabobos Asturiano Fino)
      return `
        <svg viewBox="0 0 32 32" width="${sz}" height="${sz}" class="astur-svg-icon icon-orbayu" aria-hidden="true">
          <path d="M24 16H9a5 5 0 0 1-.9-9.9A6.5 6.5 0 0 1 22.5 7a4.5 4.5 0 0 1 1.5 9z" fill="#64748b" />
          <path d="M23 15H9.5a4 4 0 0 1-.7-7.9A5.5 5.5 0 0 1 22 8a3.5 3.5 0 0 1 1 7z" fill="#94a3b8" />
          <line x1="10" y1="19" x2="8.5" y2="23" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
          <line x1="16" y1="19" x2="14.5" y2="23" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
          <line x1="22" y1="19" x2="20.5" y2="23" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
        </svg>
      `;

    case 'rain':
    case 'rain-moderate':
      // Lluvia Moderada Continua
      return `
        <svg viewBox="0 0 32 32" width="${sz}" height="${sz}" class="astur-svg-icon icon-rain" aria-hidden="true">
          <path d="M24 16H9a5 5 0 0 1-.9-9.9A6.5 6.5 0 0 1 22.5 7a4.5 4.5 0 0 1 1.5 9z" fill="#475569" />
          <path d="M23 15H9.5a4 4 0 0 1-.7-7.9A5.5 5.5 0 0 1 22 8a3.5 3.5 0 0 1 1 7z" fill="#64748b" />
          <line x1="10" y1="19" x2="7.5" y2="26" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
          <line x1="16" y1="19" x2="13.5" y2="26" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
          <line x1="22" y1="19" x2="19.5" y2="26" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
        </svg>
      `;

    case 'heavy-rain':
    case 'storm':
      // El Bastinazu & Tormenta con Rayo Oro
      return `
        <svg viewBox="0 0 32 32" width="${sz}" height="${sz}" class="astur-svg-icon icon-storm" aria-hidden="true">
          <path d="M25 15H9a5.5 5.5 0 0 1-1-10.9A7 7 0 0 1 23.5 5a5 5 0 0 1 1.5 10z" fill="#334155" />
          <polygon points="17,14 12,22 16,22 13.5,29 22,19 17.5,19" fill="#facc15" stroke="#ca8a04" stroke-width="0.8" />
          <line x1="8" y1="18" x2="6.5" y2="24" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
          <line x1="24" y1="18" x2="22.5" y2="24" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" />
        </svg>
      `;

    case 'snow':
    case 'nevadona':
      // La Nevadona (Copos en la Cordillera)
      return `
        <svg viewBox="0 0 32 32" width="${sz}" height="${sz}" class="astur-svg-icon icon-snow" aria-hidden="true">
          <path d="M24 16H9a5 5 0 0 1-.9-9.9A6.5 6.5 0 0 1 22.5 7a4.5 4.5 0 0 1 1.5 9z" fill="#64748b" />
          <path d="M23 15H9.5a4 4 0 0 1-.7-7.9A5.5 5.5 0 0 1 22 8a3.5 3.5 0 0 1 1 7z" fill="#94a3b8" />
          <g stroke="#f8fafc" stroke-width="2" stroke-linecap="round">
            <line x1="11" y1="19" x2="11" y2="26" />
            <line x1="8" y1="22.5" x2="14" y2="22.5" />
            <line x1="21" y1="19" x2="21" y2="26" />
            <line x1="18" y1="22.5" x2="24" y2="22.5" />
          </g>
        </svg>
      `;

    default:
      return `
        <svg viewBox="0 0 32 32" width="${sz}" height="${sz}" class="astur-svg-icon icon-cloud" aria-hidden="true">
          <path d="M24 22H9a5 5 0 0 1-.9-9.9A6.5 6.5 0 0 1 22.5 13a4.5 4.5 0 0 1 1.5 9z" fill="#94a3b8" />
        </svg>
      `;
  }
}
