/**
 * Motor de Cristal Líquido Dinámico & Giroscopio (Apple Liquid Glass Parallax)
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Simula el reflejo especular de la luz ambiental sobre un cristal de zafiro
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
    const clampedGamma = Math.max(-40, Math.min(40, gamma));
    const clampedBeta = Math.max(10, Math.min(75, beta));

    // Mapeo dinámico del reflejo especular (10% a 90%)
    targetX = ((clampedGamma + 40) / 80) * 80 + 10;
    targetY = ((clampedBeta - 10) / 65) * 80 + 10;

    // Inclinación 3D suave (±4.5 grados)
    targetTiltY = (clampedGamma / 40) * 4.5;
    targetTiltX = -((clampedBeta - 42) / 32) * 4.5;
  };

  // 2. Manejo Táctil y Puntero
  const handlePointer = (clientX, clientY) => {
    hasUserInteracted = true;
    lastInteractionTime = performance.now();

    const normX = clientX / window.innerWidth;
    const normY = clientY / window.innerHeight;

    targetX = normX * 80 + 10;
    targetY = normY * 80 + 10;

    targetTiltY = (normX - 0.5) * 6;
    targetTiltX = -(normY - 0.5) * 6;
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
      const idleWaveX = Math.sin(t) * 14;
      const idleWaveY = Math.cos(t * 0.8) * 12;

      targetX = 50 + idleWaveX;
      targetY = 32 + idleWaveY;
      targetTiltY = (idleWaveX / 14) * 1.5;
      targetTiltX = (idleWaveY / 12) * 1.5;
    }

    currentX = lerp(currentX, targetX, 0.075);
    currentY = lerp(currentY, targetY, 0.075);
    currentTiltX = lerp(currentTiltX, targetTiltX, 0.075);
    currentTiltY = lerp(currentTiltY, targetTiltY, 0.075);

    const root = document.documentElement;
    root.style.setProperty('--glass-x', `${currentX.toFixed(1)}%`);
    root.style.setProperty('--glass-y', `${currentY.toFixed(1)}%`);
    root.style.setProperty('--glass-tilt-x', `${currentTiltX.toFixed(2)}deg`);
    root.style.setProperty('--glass-tilt-y', `${currentTiltY.toFixed(2)}deg`);

    // Dispersión esmerilada reactiva al giro (0 a 1)
    const distFromCenter = Math.hypot((currentX - 50) / 40, (currentY - 32) / 40);
    const mistFactor = Math.min(1, Math.max(0, distFromCenter));
    root.style.setProperty('--glass-mist', mistFactor.toFixed(2));

    requestAnimationFrame(updateFrame);
  };

  requestAnimationFrame(updateFrame);
}
