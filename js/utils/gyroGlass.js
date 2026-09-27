/**
 * Motor de Cristal Líquido Dinámico & Giroscopio (Apple Liquid Glass Parallax)
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Simula el barrido de refracción óptica líquida y el halo de luz interior (Apple Liquid Glass)
 * interactuando con giroscopio, toques táctiles, ratón y respiración ambiental viva.
 */

export function initGyroGlass() {
  if (typeof window === 'undefined') return;

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

  let hasUserInteracted = false;
  let lastInteractionTime = 0;

  // 1. Manejo del Giroscopio Móvil (Inclinación de la mano)
  const handleOrientation = (e) => {
    const gamma = e.gamma; // Lateral (-90 a 90)
    const beta = e.beta;   // Frontal (-180 a 180)

    if (gamma == null || beta == null) return;
    hasUserInteracted = true;
    lastInteractionTime = performance.now();

    // Normalización para postura de sujeción (beta ~ 40°-50°, gamma ~ 0°)
    const clampedGamma = Math.max(-35, Math.min(35, gamma));
    const clampedBeta = Math.max(15, Math.min(70, beta));

    // Mapeo dinámico del barrido de refracción (-10% a 110% para cubrir toda la tarjeta)
    targetX = ((clampedGamma + 35) / 70) * 120 - 10;
    targetY = ((clampedBeta - 15) / 55) * 80 + 10;

    // Desplazamiento de inclinación (hasta ±5.5)
    targetTiltY = (clampedGamma / 35) * 5.5;
    targetTiltX = -((clampedBeta - 42) / 28) * 5.5;
  };

  // 2. Manejo Táctil y Puntero (Barrido interactivo directo)
  const handlePointer = (clientX, clientY) => {
    hasUserInteracted = true;
    lastInteractionTime = performance.now();

    const normX = clientX / window.innerWidth;
    const normY = clientY / window.innerHeight;

    targetX = normX * 120 - 10;
    targetY = normY * 80 + 10;

    targetTiltY = (normX - 0.5) * 8;
    targetTiltX = -(normY - 0.5) * 8;
  };

  const handlePointerMove = (e) => {
    handlePointer(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Solicitar permiso en iOS 13+ al primer toque
  const setupPermissionsAndListeners = () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      const requestiOSPermission = () => {
        DeviceOrientationEvent.requestPermission().then((res) => {
          if (res === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, { passive: true });
          }
        }).catch(() => {});
      };
      document.addEventListener('pointerdown', requestiOSPermission, { once: true });
    } else if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
  };

  setupPermissionsAndListeners();

  // 3. Bucle de Renderizado con Interpolación Suave y Respiración Viva
  const lerp = (start, end, factor) => start + (end - start) * factor;

  const updateFrame = (time) => {
    // Si no ha habido interacción reciente (móvil sobre la mesa), oscilación suave viva
    if (!hasUserInteracted || (time - lastInteractionTime > 3500)) {
      const t = time * 0.0012;
      const idleWaveX = Math.sin(t) * 18;
      const idleWaveY = Math.cos(t * 0.8) * 12;

      targetX = 50 + idleWaveX;
      targetY = 32 + idleWaveY;
      targetTiltY = (idleWaveX / 18) * 2.5;
      targetTiltX = (idleWaveY / 12) * 2.0;
    }

    currentX = lerp(currentX, targetX, 0.08);
    currentY = lerp(currentY, targetY, 0.08);
    currentTiltX = lerp(currentTiltX, targetTiltX, 0.08);
    currentTiltY = lerp(currentTiltY, targetTiltY, 0.08);

    const root = document.documentElement;
    root.style.setProperty('--glass-x', `${currentX.toFixed(1)}%`);
    root.style.setProperty('--glass-y', `${currentY.toFixed(1)}%`);
    root.style.setProperty('--glass-tilt-x', `${currentTiltX.toFixed(2)}deg`);
    root.style.setProperty('--glass-tilt-y', `${currentTiltY.toFixed(2)}deg`);
    root.style.setProperty('--glass-tilt-x-num', currentTiltX.toFixed(2));
    root.style.setProperty('--glass-tilt-y-num', currentTiltY.toFixed(2));

    const angle = 115 + currentTiltY * 2.5;
    root.style.setProperty('--glass-angle', `${angle.toFixed(1)}deg`);

    // Dispersión esmerilada reactiva al giro (0 a 1)
    const distFromCenter = Math.hypot((currentX - 50) / 45, (currentY - 32) / 40);
    const mistFactor = Math.min(1, Math.max(0, distFromCenter));
    root.style.setProperty('--glass-mist', mistFactor.toFixed(2));

    requestAnimationFrame(updateFrame);
  };

  requestAnimationFrame(updateFrame);
}
