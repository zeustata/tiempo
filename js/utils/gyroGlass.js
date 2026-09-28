/**
 * Motor de Cristal Líquido Dinámico & Giroscopio (Apple Liquid Glass Parallax)
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa para MeteoAstur Lode
 *
 * Simula el barrido de refracción óptica líquida y el halo de luz interior (Apple Liquid Glass)
 * interactuando con giroscopio, toques táctiles, ratón y respiración ambiental viva.
 *
 * v1.1.16 — Modo Economía Adaptativo: detector isLowPerf + throttling 30fps + idle breathing
 *           condicional para móviles con CPU/RAM limitada.
 */

/**
 * Detecta si el dispositivo tiene recursos limitados usando tres señales:
 * - Núcleos de CPU (<= 4)
 * - RAM disponible (<= 2 GB, si la API existe)
 * - Benchmark sintético de CPU (>30ms en 200k iteraciones)
 */
function detectLowPerf() {
  const cores = navigator.hardwareConcurrency || 4;
  const ram = navigator.deviceMemory; // undefined en Safari/Firefox → no penaliza

  // Benchmark rápido: ~2ms en flagship, ~35ms en Snapdragon 4xx
  const t0 = performance.now();
  let x = 0;
  for (let i = 0; i < 200_000; i++) x += Math.sqrt(i);
  const cpuMs = performance.now() - t0;

  const lowCores = cores <= 4;
  const lowRam = ram !== undefined && ram <= 2;
  const slowCpu = cpuMs > 30;

  const isLow = lowCores || lowRam || slowCpu;

  if (isLow) {
    console.info(
      `[GyroGlass] Modo Economía activado → núcleos: ${cores}, RAM: ${ram ?? '?'} GB, benchmark: ${cpuMs.toFixed(1)} ms`
    );
    // Marca el <html> para que el CSS también pueda reaccionar
    document.documentElement.classList.add('low-perf');
  }

  return isLow;
}

export function initGyroGlass() {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Detectar rendimiento del dispositivo una sola vez al arrancar
  const isLowPerf = detectLowPerf();

  // En móviles lentos: throttle a 30fps (cada 33ms). En potentes: 60fps libre.
  const FRAME_BUDGET = isLowPerf ? 33 : 0;

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
  let lastFrameTime = 0;

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

    // Desplazamiento de inclinación (reducido a ±3 en modo economía)
    const tiltScale = isLowPerf ? 3.0 : 5.5;
    targetTiltY = (clampedGamma / 35) * tiltScale;
    targetTiltX = -((clampedBeta - 42) / 28) * tiltScale;
  };

  // 2. Manejo Táctil y Puntero (Barrido interactivo directo)
  const handlePointer = (clientX, clientY) => {
    hasUserInteracted = true;
    lastInteractionTime = performance.now();

    const normX = clientX / window.innerWidth;
    const normY = clientY / window.innerHeight;

    targetX = normX * 120 - 10;
    targetY = normY * 80 + 10;

    const tiltScale = isLowPerf ? 4.0 : 8.0;
    targetTiltY = (normX - 0.5) * tiltScale;
    targetTiltX = -(normY - 0.5) * tiltScale;
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
    // Throttling adaptativo: en móviles lentos limitamos a 30fps
    if (FRAME_BUDGET > 0 && time - lastFrameTime < FRAME_BUDGET) {
      requestAnimationFrame(updateFrame);
      return;
    }
    lastFrameTime = time;

    if (!isLowPerf && (!hasUserInteracted || (time - lastInteractionTime > 3500))) {
      // Modo normal: oscilación suave viva (idle breathing)
      const t = time * 0.0012;
      const idleWaveX = Math.sin(t) * 18;
      const idleWaveY = Math.cos(t * 0.8) * 12;

      targetX = 50 + idleWaveX;
      targetY = 32 + idleWaveY;
      targetTiltY = (idleWaveX / 18) * 2.5;
      targetTiltX = (idleWaveY / 12) * 2.0;
    } else if (isLowPerf && (!hasUserInteracted || (time - lastInteractionTime > 3500))) {
      // Modo economía: posición central fija, sin oscilación sinusoidal en CPU
      targetX = 50;
      targetY = 30;
      targetTiltY = 0;
      targetTiltX = 0;
    }

    // Factor de interpolación: 0.12 en modo economía (converge más rápido → menos iteraciones "en tránsito")
    const lerpFactor = isLowPerf ? 0.12 : 0.08;

    currentX = lerp(currentX, targetX, lerpFactor);
    currentY = lerp(currentY, targetY, lerpFactor);
    currentTiltX = lerp(currentTiltX, targetTiltX, lerpFactor);
    currentTiltY = lerp(currentTiltY, targetTiltY, lerpFactor);

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

    // Desenfoque óptico reactivo:
    // - Modo economía: blur fijo 14px (sin variación dinámica para evitar repaints continuos)
    // - Modo normal:   blur dinámico de 18px a 36px
    const dynamicBlur = isLowPerf ? 14 : 18 + mistFactor * 18;
    root.style.setProperty('--glass-blur', `${dynamicBlur.toFixed(1)}px`);

    requestAnimationFrame(updateFrame);
  };

  requestAnimationFrame(updateFrame);
}
