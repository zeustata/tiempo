/**
 * Motor de Cristal Líquido Dinámico & Giroscopio (Apple Liquid Glass Parallax)
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Simula el reflejo especular de la luz ambiental sobre un cristal de zafiro
 * interactuando con el giroscopio del móvil (DeviceOrientation) y el cursor en PC.
 */

export function initGyroGlass() {
  if (typeof window === 'undefined') return;

  // Respetar preferencias de accesibilidad de movimiento reducido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let targetX = 50;
  let targetY = 30;
  let currentX = 50;
  let currentY = 30;

  let targetTiltX = 0;
  let targetTiltY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  let isGyroActive = false;

  // 1. Manejo del Giroscopio Móvil (Acelerómetro / Orientación de la mano)
  const handleOrientation = (e) => {
    const gamma = e.gamma; // Inclinación lateral izquierda/derecha (-90 a 90)
    const beta = e.beta;   // Inclinación frontal adelante/atrás (-180 a 180)

    if (gamma == null || beta == null) return;
    isGyroActive = true;

    // Normalización de la posición habitual de sujeción del móvil (beta ~ 40°-50°, gamma ~ 0°)
    const clampedGamma = Math.max(-35, Math.min(35, gamma));
    const clampedBeta = Math.max(15, Math.min(65, beta));

    // Mapeo a porcentajes de posición del reflejo especular (0% a 100%)
    targetX = ((clampedGamma + 35) / 70) * 100;
    targetY = ((clampedBeta - 15) / 50) * 100;

    // Mapeo de micro-inclinación tridimensional suave (máximo ±2.5 grados)
    targetTiltY = (clampedGamma / 35) * 2.5;
    targetTiltX = -((clampedBeta - 40) / 25) * 2.5;
  };

  // 2. Manejo del Cursor en Escritorio (Mouse Parallax)
  const handlePointerMove = (e) => {
    if (isGyroActive) return; // Si hay giroscopio físico, priorizar la mano

    const normX = e.clientX / window.innerWidth;
    const normY = e.clientY / window.innerHeight;

    targetX = normX * 100;
    targetY = normY * 100;

    targetTiltY = (normX - 0.5) * 3;
    targetTiltX = -(normY - 0.5) * 3;
  };

  // Activar listeners
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
  }
  window.addEventListener('pointermove', handlePointerMove, { passive: true });

  // 3. Bucle de Renderizado con Interpolación Suave (Lerp continuo a 60fps)
  const lerp = (start, end, factor) => start + (end - start) * factor;

  const updateFrame = () => {
    currentX = lerp(currentX, targetX, 0.07);
    currentY = lerp(currentY, targetY, 0.07);
    currentTiltX = lerp(currentTiltX, targetTiltX, 0.07);
    currentTiltY = lerp(currentTiltY, targetTiltY, 0.07);

    const root = document.documentElement;
    root.style.setProperty('--glass-x', `${currentX.toFixed(1)}%`);
    root.style.setProperty('--glass-y', `${currentY.toFixed(1)}%`);
    root.style.setProperty('--glass-tilt-x', `${currentTiltX.toFixed(2)}deg`);
    root.style.setProperty('--glass-tilt-y', `${currentTiltY.toFixed(2)}deg`);

    requestAnimationFrame(updateFrame);
  };

  requestAnimationFrame(updateFrame);
}
