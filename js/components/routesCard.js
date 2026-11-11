/**
 * METEOASTUR LODE - Componente de Tarjeta de Rutas & Senderismo
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * Arquitectura de Senda Protagonista Activa, Selector Ergonómico Bottom Sheet (Adiós Scroll Infinito),
 * Rastreador Inteligente de Escampada (Dónde no llueve en Asturias),
 * Catálogo Oficial Ampliado a 58 Sendas Homologadas (Ley 11, Ley 14 y Ley 16).
 */

import { calculateHikingIndex, getRoutesForConcejo, RUTAS_ASTURIAS_CATALOGO, getRouteExplanation, getRouteWeatherBadge } from '../utils/routesData.js?v=3.0.36';

/**
 * Genera el Perfil Climático Horario de la Ruta (08:00h a 20:00h)
 * Integra Pluviómetro (lluvia/probabilidad), Curva Térmica y Viento/Rachas
 */
function renderRouteDaylightGraph(hourly, activeDay = 'today', activeRw = null, isExternal = false) {
  if (!hourly || !Array.isArray(hourly.time) || !Array.isArray(hourly.temperature_2m)) {
    return '';
  }

  const now = new Date();
  const targetDate = new Date(now);
  if (activeDay === 'tomorrow') {
    targetDate.setDate(now.getDate() + 1);
  }
  const datePrefix = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;

  // Extraer las 13 horas de la ventana diurna: 08:00 a 20:00 inclusive
  const daylightHours = [];
  for (let i = 0; i < hourly.time.length; i++) {
    const tStr = hourly.time[i];
    if (tStr.startsWith(datePrefix)) {
      const h = parseInt(tStr.substring(11, 13), 10);
      if (h >= 8 && h <= 20) {
        daylightHours.push({
          hour: h,
          hourLabel: `${String(h).padStart(2, '0')}h`,
          temp: Math.round(hourly.temperature_2m[i]),
          precip: parseFloat(hourly.precipitation?.[i] || 0),
          pop: parseInt(hourly.precipitation_probability?.[i] || 0, 10),
          windSpeed: Math.round(hourly.wind_speed_10m?.[i] || 0),
          windGust: Math.round(hourly.wind_gusts_10m?.[i] || hourly.wind_speed_10m?.[i] || 0),
          windDir: hourly.wind_direction_10m?.[i] || 0
        });
      }
    }
  }

  if (daylightHours.length < 5) return '';

  const temps = daylightHours.map(d => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const tempRange = Math.max(1, maxTemp - minTemp);

  const precips = daylightHours.map(d => d.precip);
  const maxPrecip = Math.max(1.5, ...precips); // Escala mínima de 1.5mm para que se vea bien

  // Dimensiones SVG HD
  const width = 650;
  const height = 196;
  const padLeft = 28;
  const padRight = 28;
  const padTop = 26;
  const tempBottom = 75; // Altura donde termina la curva térmica
  const barTop = 85; // Altura donde arrancan las barras de lluvia
  const barBottom = 125; // Altura base de las barras
  const graphW = width - padLeft - padRight;
  const stepX = graphW / (daylightHours.length - 1);

  // Puntos de la curva de temperatura
  const tempPoints = daylightHours.map((d, idx) => {
    const x = padLeft + idx * stepX;
    const y = padTop + (tempBottom - padTop) - ((d.temp - minTemp) / tempRange) * (tempBottom - padTop);
    return { x, y, ...d };
  });

  // Curva bezier suave
  let dCurve = `M ${tempPoints[0].x.toFixed(1)} ${tempPoints[0].y.toFixed(1)}`;
  for (let i = 0; i < tempPoints.length - 1; i++) {
    const p0 = tempPoints[i];
    const p1 = tempPoints[i + 1];
    const cpx = (p0.x + (p1.x - p0.x) / 2).toFixed(1);
    dCurve += ` C ${cpx} ${p0.y.toFixed(1)}, ${cpx} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }
  const dArea = `${dCurve} L ${tempPoints[tempPoints.length - 1].x.toFixed(1)} ${tempBottom} L ${tempPoints[0].x.toFixed(1)} ${tempBottom} Z`;

  // Punto vivo si estamos en el día de hoy y entre las 8 y las 20
  let liveMarker = '';
  if (activeDay === 'today') {
    const curHour = now.getHours();
    const curMin = now.getMinutes();
    if (curHour >= 8 && curHour <= 20) {
      const frac = (curHour - 8) + (curMin / 60);
      const liveX = padLeft + frac * stepX;
      // Interpolación
      const baseIdx = Math.min(tempPoints.length - 2, Math.max(0, Math.floor(frac)));
      const tFrac = Math.max(0, Math.min(1, frac - baseIdx));
      const liveY = tempPoints[baseIdx].y + (tempPoints[baseIdx + 1].y - tempPoints[baseIdx].y) * tFrac;
      liveMarker = `
        <circle cx="${liveX.toFixed(1)}" cy="${liveY.toFixed(1)}" r="10" fill="#38bdf8" opacity="0.35" class="thermal-live-pulse" />
        <circle cx="${liveX.toFixed(1)}" cy="${liveY.toFixed(1)}" r="5" fill="#ffffff" stroke="#0284c7" stroke-width="2.5" />
      `;
    }
  }

  // Generar barras de lluvia y textos de viento
  const barsAndLabels = daylightHours.map((d, idx) => {
    const x = padLeft + idx * stepX;
    const barWidth = Math.max(12, stepX * 0.55);
    const barHeight = d.precip > 0 ? Math.max(4, (d.precip / maxPrecip) * (barBottom - barTop)) : 0;
    const barY = barBottom - barHeight;

    const barColor = d.precip >= 1.5 ? '#f59e0b' : (d.precip >= 0.3 ? '#38bdf8' : '#60a5fa');

    return `
      <!-- Barra de lluvia -->
      ${d.precip > 0 ? `
        <rect x="${(x - barWidth / 2).toFixed(1)}" y="${barY.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${barHeight.toFixed(1)}" rx="3" fill="${barColor}" opacity="0.85" />
        <text x="${x.toFixed(1)}" y="${(barY - 4).toFixed(1)}" fill="${barColor}" font-size="10.5" font-family="'JetBrains Mono', monospace" font-weight="800" text-anchor="middle">${d.precip.toFixed(1)}</text>
      ` : (d.pop >= 25 ? `
        <text x="${x.toFixed(1)}" y="${(barBottom - 3).toFixed(1)}" fill="#94a3b8" font-size="9.5" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">${d.pop}%</text>
      ` : `
        <circle cx="${x.toFixed(1)}" cy="${barBottom - 4}" r="1.5" fill="rgba(255,255,255,0.18)" />
      `)}

      <!-- Hora en el eje horizontal -->
      <text x="${x.toFixed(1)}" y="145" fill="#e2e8f0" font-size="11.5" font-family="system-ui, sans-serif" font-weight="800" text-anchor="middle">${d.hourLabel}</text>

      <!-- Pastilla identificativa de Viento (km/h) con alerta de rachas -->
      <rect x="${(x - 21).toFixed(1)}" y="156" width="42" height="28" rx="6" 
            fill="${d.windGust >= 35 ? 'rgba(245, 158, 11, 0.16)' : 'rgba(15, 23, 42, 0.75)'}" 
            stroke="${d.windGust >= 35 ? 'rgba(245, 158, 11, 0.55)' : 'rgba(56, 189, 248, 0.25)'}" 
            stroke-width="1" />
      <text x="${x.toFixed(1)}" y="170" fill="${d.windGust >= 35 ? '#f59e0b' : '#38bdf8'}" font-size="11" font-family="'JetBrains Mono', monospace" font-weight="900" text-anchor="middle">${d.windSpeed}</text>
      <text x="${x.toFixed(1)}" y="180" fill="${d.windGust >= 35 ? '#fbbf24' : '#94a3b8'}" font-size="7.5" font-family="system-ui, sans-serif" font-weight="700" text-anchor="middle">km/h</text>
    `;
  }).join('');

  // Puntos y temperaturas sobre la curva
  const tempLabels = tempPoints.map(p => `
    <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="#ffffff" stroke="#0ea5e9" stroke-width="2" />
    <text x="${p.x.toFixed(1)}" y="${(p.y - 7).toFixed(1)}" fill="#f1f5f9" font-size="12" font-family="'JetBrains Mono', monospace" font-weight="900" text-anchor="middle">${p.temp}°</text>
  `).join('');

  const totalDaylightRain = precips.reduce((a, b) => a + b, 0).toFixed(1);
  const maxGust = Math.max(...daylightHours.map(d => d.windGust));

  const displayRain = (isExternal && activeRw && activeRw.rainMm !== undefined) 
    ? activeRw.rainMm.toFixed(1) 
    : totalDaylightRain;
  const displayGust = (isExternal && activeRw && activeRw.windGust !== undefined) 
    ? activeRw.windGust 
    : maxGust;

  return `
    <div style="background: rgba(15, 23, 42, 0.55); border: 1px solid rgba(250, 204, 21, 0.35); border-radius: 12px; margin-bottom: 12px; box-sizing: border-box; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);">
      
      <!-- Cabecera Plegable / Acordeón Táctil (Feedback Lendo - Ley 11) -->
      <button type="button" id="btn-toggle-daylight-graph" class="btn-toggle-daylight-graph" style="
        width: 100%;
        background: transparent;
        border: none;
        padding: 9px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        cursor: pointer;
        text-align: left;
        box-sizing: border-box;
      " aria-expanded="false" title="Desplegar u ocultar gráfica horaria">
        <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
          <span style="font-size: 0.82rem; color: ${displayRain > 0 ? '#38bdf8' : '#94a3b8'}; font-weight: 800; white-space: nowrap;">
            🌧️ ${displayRain} mm
          </span>
          <span style="font-size: 0.78rem; color: ${displayGust >= 35 ? '#f59e0b' : '#94a3b8'}; font-weight: 700; white-space: nowrap;">
            💨 ${displayGust} km/h
          </span>
        </div>

        <div style="
          display: flex;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
          padding: 4px 11px;
          border-radius: 14px;
          background: rgba(250, 204, 21, 0.15);
          border: 1px solid rgba(250, 204, 21, 0.50);
          box-shadow: 0 0 10px rgba(250, 204, 21, 0.20);
        ">
          <span class="daylight-toggle-text" style="font-size: 0.76rem; font-weight: 800; color: #facc15; white-space: nowrap;">Ver Gráfica</span>
          <span class="daylight-toggle-arrow" style="font-size: 0.80rem; color: #facc15; transition: transform 0.2s ease;">▾</span>
        </div>
      </button>

      <!-- Cuerpo Desplegable (Plegado por defecto para ergonomía móvil - Ley 11) -->
      <div id="route-daylight-graph-body" style="display: none; padding: 0 12px 10px 12px; border-top: 1px solid rgba(255,255,255,0.06);">
        <!-- Leyenda rápida -->
        <div style="display: flex; gap: 12px; font-size: 0.70rem; color: var(--text-dim); margin: 6px 0 6px 0; justify-content: flex-end; flex-wrap: wrap;">
          <span style="display: inline-flex; align-items: center; gap: 4px;"><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#38bdf8;"></span> Temp (°C)</span>
          <span style="display: inline-flex; align-items: center; gap: 4px;"><span style="display:inline-block; width:8px; height:8px; border-radius:2px; background:#60a5fa;"></span> Lluvia (mm)</span>
          <span style="display: inline-flex; align-items: center; gap: 4px;"><span style="display:inline-block; width:12px; height:8px; border-radius:3px; background:rgba(56,189,248,0.25); border:1px solid rgba(56,189,248,0.5);"></span> 💨 Viento (km/h)</span>
        </div>

        <!-- SVG HD de la Gráfica Diurna con Aislamiento Táctil Anti-Desborde (Ley 18) -->
        <div class="route-daylight-graph-wrap" style="width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; overscroll-behavior-x: contain; touch-action: pan-x pan-y;">
          <svg viewBox="0 0 ${width} ${height}" style="width: 100%; min-width: 520px; height: auto; display: block;" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="routeTempGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#38bdf8" />
                <stop offset="50%" stop-color="#facc15" />
                <stop offset="100%" stop-color="#fb923c" />
              </linearGradient>
              <linearGradient id="routeAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            <!-- Línea divisoria sutil entre térmica y lluvia -->
            <line x1="${padLeft}" y1="${barBottom}" x2="${width - padRight}" y2="${barBottom}" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="3,3" />

            <!-- Área y Curva Térmica -->
            <path d="${dArea}" fill="url(#routeAreaGrad)" />
            <path d="${dCurve}" fill="none" stroke="url(#routeTempGrad)" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linecap="round" />

            <!-- Barras de Lluvia y Textos -->
            ${barsAndLabels}

            <!-- Puntos y Etiquetas de Temperatura -->
            ${tempLabels}

            <!-- Marcador Vivo de Hora Actual -->
            ${liveMarker}
          </svg>
        </div>
      </div>
    </div>
  `;
}

export function renderRoutesCard(data, concejo, selectedRouteId = null, selectedDay = null, activeFilter = 'all', routesWeatherMap = null) {
  if (!concejo) return '';

  const currentHour = new Date().getHours();
  const activeDay = selectedDay || (currentHour >= 19 ? 'tomorrow' : 'today');
  const dayLabelLower = activeDay === 'tomorrow' ? 'mañana' : 'hoy';
  const dayLabelCap = activeDay === 'tomorrow' ? 'Mañana' : 'Hoy';

  const hike = calculateHikingIndex(data, concejo, activeDay);
  const allRoutes = getRoutesForConcejo(concejo);

  // Enriquecer cada ruta con su previsión meteorológica oficial si está disponible
  allRoutes.forEach(r => {
    if (routesWeatherMap && routesWeatherMap[r.id]) {
      const rw = routesWeatherMap[r.id][activeDay] || routesWeatherMap[r.id]['tomorrow'];
      r.weatherBadge = getRouteWeatherBadge(rw);
    } else {
      r.weatherBadge = null;
    }
  });

  // Título limpio sin paréntesis
  const concejoTitle = concejo.name.replace(/\s*\(.*?\)/, '').trim();

  // Filtrado y ordenación inteligente
  let displayedRoutes = [...allRoutes];

  if (activeFilter === 'dry') {
    // Modo Detector de Escampada: Ordenar de menor a mayor lluvia
    displayedRoutes.sort((a, b) => {
      const scoreA = a.weatherBadge ? a.weatherBadge.score : 0;
      const scoreB = b.weatherBadge ? b.weatherBadge.score : 0;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return a.distFromUserKm - b.distFromUserKm;
    });
  } else if (activeFilter === 'facil') {
    displayedRoutes = displayedRoutes.filter(r => r.diffCat === 'facil');
    displayedRoutes.sort((a, b) => a.distFromUserKm - b.distFromUserKm);
  } else if (activeFilter === 'montana') {
    displayedRoutes = displayedRoutes.filter(r => r.type === 'montana' || r.type === 'desfiladero' || (r.elevM && r.elevM >= 300));
    displayedRoutes.sort((a, b) => a.distFromUserKm - b.distFromUserKm);
  } else if (activeFilter === 'costera') {
    displayedRoutes = displayedRoutes.filter(r => r.type === 'costera' || r.type === 'fluvial');
    displayedRoutes.sort((a, b) => a.distFromUserKm - b.distFromUserKm);
  } else {
    // Por cercanía
    displayedRoutes.sort((a, b) => a.distFromUserKm - b.distFromUserKm);
  }

  // Agrupación en locales y resto
  const localRoutes = displayedRoutes.filter(r => r.isLocal || r.distFromUserKm <= 15);
  const otherRoutes = displayedRoutes.filter(r => !localRoutes.some(lr => lr.id === r.id));

  // Senda recomendada por el sistema
  let recommendedRoute = localRoutes[0] || displayedRoutes[0] || allRoutes[0];
  if (activeFilter === 'dry' && displayedRoutes[0]) {
    recommendedRoute = displayedRoutes[0];
  } else if (hike.mudIndex && hike.mudIndex.score >= 3) {
    const safeRoute = localRoutes.find(r => r.diffCat === 'facil' || r.type === 'fluvial' || r.type === 'costera');
    if (safeRoute) recommendedRoute = safeRoute;
  }

  // Senda activa a mostrar en la tarjeta protagonista
  let activeRoute = recommendedRoute;
  if (selectedRouteId) {
    const found = allRoutes.find(r => r.id === selectedRouteId);
    if (found) activeRoute = found;
  }

  // Previsión meteorológica de la ruta activa si está disponible
  const activeRw = (routesWeatherMap && routesWeatherMap[activeRoute.id])
    ? (routesWeatherMap[activeRoute.id][activeDay] || routesWeatherMap[activeRoute.id]['tomorrow'])
    : null;

  // ¿Es una ruta situada fuera del concejo base del usuario?
  const isExternalRoute = Boolean(activeRoute && activeRoute.concejoName && (activeRoute.concejoName.toLowerCase() !== concejoTitle.toLowerCase()));

  // 1. Diagnóstico Adaptativo de la Tarjeta Superior (Leyes 0, 11 y 16)
  let diagTitle = `En ${concejoTitle}`;
  let diagSubtitle = `58 Sendas oficiales • Salidas desde <strong>${concejoTitle}</strong>`;
  let diagStateBadge = `${hike.icon} ${hike.label}`;
  let diagStateStyle = `background: ${hike.status === 'danger' ? '#ef444422' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b22' : '#10b98122'}; color: ${hike.status === 'danger' ? '#ef4444' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b' : '#10b981'}; border: 1px solid ${hike.status === 'danger' ? '#ef444466' : hike.status === 'warning' || hike.status === 'mist' ? '#f59e0b66' : '#10b98166'};`;
  let diagSummary = hike.summary;

  let diagMudLabel = hike.mudIndex.score <= 1 ? 'Firme Seco' : (hike.mudIndex.score === 2 ? 'Barro Leve' : (hike.mudIndex.score === 3 ? 'Barro Moderado' : 'Barrizal'));
  let diagMudColor = hike.mudIndex.color;
  let diagMudScore = `Nivel ${hike.mudIndex.score}/4`;

  let diagTemp = `${hike.windChillHigh}°C`;
  let diagGust = `Rachas: ${hike.windGust} km/h`;

  let diagShoes = hike.status === 'optimal' ? 'Trekking ligero' : 'Bota de taco';
  let diagShoesDesc = 'Suela antideslizante';

  let diagClothes = hike.tempNow < 12 ? 'Cortavientos' : 'Camiseta téc.';
  let diagUV = `Índice UV: ${hike.uv}`;

  // Si la ruta activa está en otro concejo (ej. Cabo Peñas en Gozón), adaptamos la tarjeta superior al destino real
  if (isExternalRoute && activeRw) {
    diagTitle = `En ${activeRoute.concejoName} (${activeRoute.name})`;
    diagSubtitle = `58 Sendas oficiales • Tu base: ${concejoTitle} ➔ Destino: <strong>${activeRoute.concejoName}</strong>`;

    const isAlertWind = activeRw.windGust >= 50;
    const isModerateWind = activeRw.windGust >= 38;

    if (isAlertWind || activeRw.rainMm >= 6.0) {
      diagStateBadge = `🔴 Precaución Severa`;
      diagStateStyle = `background: #ef444422; color: #ef4444; border: 1px solid #ef444466;`;
    } else if (isModerateWind || activeRw.rainMm >= 1.0) {
      diagStateBadge = `🟡 Precaución en Terreno`;
      diagStateStyle = `background: #f59e0b22; color: #f59e0b; border: 1px solid #f59e0b66;`;
    } else {
      diagStateBadge = `🟢 Condiciones Favorables`;
      diagStateStyle = `background: #10b98122; color: #10b981; border: 1px solid #10b98166;`;
    }

    if (isAlertWind) {
      diagSummary = `Alerta por rachas de viento fuerte (${activeRw.windGust} km/h). Extremar prudencia en cumbres o acantilados.`;
    } else if (activeRw.rainMm === 0 && activeRw.windGust < 35) {
      diagSummary = `Condiciones muy favorables. Sendas secas, sin lluvia y viento seguro (${activeRw.windGust} km/h).`;
    } else if (activeRw.rainMm > 0) {
      diagSummary = `Previsión de ${activeRw.rainMm.toFixed(1)} mm (${activeRw.pop}% prob.) y viento de ${activeRw.windGust} km/h. Precaución con el firme húmedo.`;
    } else {
      diagSummary = `Tiempo estable con viento moderado (${activeRw.windGust} km/h) y temperatura máxima de ${activeRw.tempMax}°C.`;
    }

    if (activeRw.rainMm === 0 && activeRw.pop <= 30) {
      diagMudLabel = 'Firme Seco';
      diagMudColor = '#10b981';
      diagMudScore = 'Nivel 1/4';
    } else if (activeRw.rainMm < 2.0) {
      diagMudLabel = 'Barro Leve';
      diagMudColor = '#38bdf8';
      diagMudScore = 'Nivel 2/4';
    } else if (activeRw.rainMm < 6.0) {
      diagMudLabel = 'Barro Moderado';
      diagMudColor = '#f59e0b';
      diagMudScore = 'Nivel 3/4';
    } else {
      diagMudLabel = 'Barrizal';
      diagMudColor = '#ef4444';
      diagMudScore = 'Nivel 4/4';
    }

    diagTemp = `${activeRw.tempMax}°C`;
    diagGust = `Rachas: ${activeRw.windGust} km/h`;

    if (activeRoute.diffRank >= 2 || activeRw.rainMm >= 2.0) {
      diagShoes = 'Bota de taco';
    } else {
      diagShoes = 'Trekking ligero';
    }

    diagClothes = activeRw.tempMax < 13 || activeRw.windGust >= 35 ? 'Cortavientos' : 'Camiseta téc.';
    diagUV = `Índice UV: ${activeRw.uvMax || 2}`;
  }

  const activeDistLabel = activeRoute.distFromUserKm < 0.5 
    ? 'En este concejo' 
    : `A ${activeRoute.distFromUserKm} km de ${concejoTitle}`;

  // Consejero adaptado al filtro de Mejores Condiciones (Lluvia + Viento)
  let advisorTitle = 'Consejero de Senderismo';
  let advisorBadge = 'Recomendada 🌟';
  let advisorText = `Senda óptima para ${dayLabelLower} en ${concejoTitle}: <strong style="color: var(--primary);">${recommendedRoute.name}</strong> (${recommendedRoute.diff}, ${recommendedRoute.dist}). Ideal por estado de firme y cercanía.`;

  if (activeFilter === 'dry') {
    const topDry = displayedRoutes[0];
    const secondDry = displayedRoutes[1];
    advisorTitle = '🌟 Asesor de Condiciones Óptimas';
    advisorBadge = 'Clima Favorable 🛡️';
    if (topDry && topDry.weatherBadge && topDry.weatherBadge.isFavorable) {
      advisorText = `¡Condiciones óptimas ${dayLabelLower} en Asturias! La senda más favorable es <strong style="color: #38bdf8;">${topDry.name}</strong> en <strong>${topDry.concejoName}</strong> (${topDry.weatherBadge.label}). Sin lluvia y con viento seguro. ${secondDry && secondDry.weatherBadge ? `Alternativa favorable: <strong>${secondDry.name}</strong> (${secondDry.concejoName}, ${secondDry.weatherBadge.label}).` : ''}`;
    } else if (topDry && topDry.weatherBadge && topDry.weatherBadge.isDangerousWind) {
      advisorBadge = 'Alerta Viento ⚠️';
      advisorText = `Jornada ventosa en Asturias. La senda con menor impacto es <strong style="color: #f59e0b;">${topDry.name}</strong> (${topDry.concejoName}, ${topDry.weatherBadge.label}). Evita aristas y acantilados expuestos.`;
    } else if (topDry && topDry.weatherBadge) {
      advisorText = `Jornada con nubosidad o viento variable. La opción más equilibrada es <strong style="color: #38bdf8;">${topDry.name}</strong> (${topDry.concejoName}, ${topDry.weatherBadge.label}).`;
    } else {
      advisorText = `Analizando el pronóstico en tiempo real (lluvia y viento) para las 58 rutas de Asturias. Mostrando las sendas optimizadas.`;
    }
  }

  // Consejero de calzado y firme adaptado a la senda activa
  let calzadoRecomendado = '👟 Calzado de trekking ligero';
  if (activeRoute.diffRank >= 2 || (hike.mudIndex && hike.mudIndex.score >= 2)) {
    calzadoRecomendado = '🥾 Bota de montaña con suela de taco';
  }

  return `
    <style>
      .routes-module-wrapper {
        padding: 0 0 10px 0;
        max-width: 900px;
        margin: 0 auto;
        box-sizing: border-box;
        overflow-x: hidden;
      }
      .routes-card-solid {
        background: var(--bg-surface);
        border: 1px solid var(--border-glass);
        border-radius: var(--radius-lg);
        box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.45);
        backdrop-filter: blur(var(--glass-blur, 24px)) saturate(190%);
        -webkit-backdrop-filter: blur(var(--glass-blur, 24px)) saturate(190%);
        margin-bottom: 12px;
        padding: 16px 14px;
        box-sizing: border-box;
      }
      .routes-advisor-card {
        background: rgba(30, 41, 59, 0.45);
        border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 14px;
        padding: 12px;
        margin-bottom: 12px;
        box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
      }
      .routes-route-trigger {
        width: 100%;
        padding: 10px 12px;
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.85);
        border: 1px solid rgba(56, 189, 248, 0.35);
        color: #ffffff;
        font-size: 0.84rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        cursor: pointer;
        text-align: left;
        box-sizing: border-box;
        transition: border-color 0.2s ease, background 0.2s ease;
      }
      .routes-route-trigger:active {
        background: rgba(56, 189, 248, 0.15);
      }
      .routes-metrics-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-bottom: 12px;
      }
      @media (max-width: 480px) {
        .routes-metrics-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
        }
      }
      .routes-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.75);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 9999;
        display: none;
        align-items: flex-end;
        justify-content: center;
      }
      .routes-modal-sheet {
        background: rgba(15, 23, 42, 0.92);
        backdrop-filter: blur(24px) saturate(190%);
        -webkit-backdrop-filter: blur(24px) saturate(190%);
        border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 20px 20px 0 0;
        width: 100%;
        max-width: 600px;
        max-height: 82vh;
        display: flex;
        flex-direction: column;
        box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.35), 0 -10px 36px rgba(0,0,0,0.65);
        animation: slideUpRoutes 0.25s ease-out;
      }
      @keyframes slideUpRoutes {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      .routes-day-pill {
        padding: 5px 12px;
        border-radius: 16px;
        font-size: 0.76rem;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid rgba(255, 255, 255, 0.14);
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-dim, #94a3b8);
      }
      .routes-day-pill.active {
        background: linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0.45) 100%);
        border-color: var(--primary, #38bdf8);
        color: #ffffff;
        box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
      }
      .routes-filter-pill {
        padding: 5px 11px;
        border-radius: 14px;
        font-size: 0.74rem;
        font-weight: 700;
        cursor: pointer;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-dim, #94a3b8);
        white-space: nowrap;
        transition: all 0.2s ease;
      }
      .routes-filter-pill.active {
        background: linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.5) 100%);
        border-color: var(--primary, #38bdf8);
        color: #ffffff;
        box-shadow: 0 0 10px rgba(56, 189, 248, 0.25);
      }
      .routes-item-card {
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.03);
        margin-bottom: 6px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 4px;
        transition: background 0.15s ease, border-color 0.15s ease;
      }
      .routes-item-card:active, .routes-item-card.selected {
        background: rgba(56, 189, 248, 0.15);
        border-color: rgba(56, 189, 248, 0.5);
      }
    </style>

    <div class="routes-module-wrapper">
      
      <!-- 1. CABECERA LIMPIA Y ERGONÓMICA (ADAPTATIVA AL DESTINO REAL) -->
      <div class="routes-card-solid">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
          <div style="display: flex; align-items: center; gap: 8px; max-width: 100%;">
            <span style="font-size: 1.5rem;">🥾</span>
            <div>
              <h2 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: var(--text-main); line-height: 1.2;">
                Rutas &amp; Senderismo
              </h2>
              <span style="font-size: 0.78rem; color: var(--text-dim); display: block; margin-top: 2px;">
                ${diagSubtitle}
              </span>
            </div>
          </div>
          <div class="sea-state-pill" style="${diagStateStyle}">
            ${diagStateBadge}
          </div>
        </div>

        <!-- Panel de Diagnóstico Ejecutivo del Firme y Montaña -->
        <div style="background: rgba(15, 23, 42, 0.40); border-radius: 12px; padding: 10px; border: 1px solid rgba(255,255,255,0.08);">
          <!-- Conmutador Temporal Hoy / Mañana -->
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-main);">📅 Jornada de marcha:</span>
            <div style="display: flex; gap: 6px;">
              <button type="button" class="routes-day-pill btn-routes-day ${activeDay === 'today' ? 'active' : ''}" data-day="today">
                ☀️ Hoy
              </button>
              <button type="button" class="routes-day-pill btn-routes-day ${activeDay === 'tomorrow' ? 'active' : ''}" data-day="tomorrow">
                📅 Mañana
              </button>
            </div>
          </div>

          <!-- Barra de Filtros Inteligentes (Detector de Mejores Condiciones: Lluvia + Viento) -->
          <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 8px; scrollbar-width: none; -webkit-overflow-scrolling: touch;">
            <button type="button" class="routes-filter-pill btn-routes-filter ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">
              📍 Cercanas
            </button>
            <button type="button" class="routes-filter-pill btn-routes-filter ${activeFilter === 'dry' ? 'active' : ''}" data-filter="dry" style="${activeFilter === 'dry' ? 'border-color: #38bdf8; background: rgba(56, 189, 248, 0.25);' : ''}">
              🌟 Mejores Condiciones
            </button>
            <button type="button" class="routes-filter-pill btn-routes-filter ${activeFilter === 'facil' ? 'active' : ''}" data-filter="facil">
              🟢 Fáciles
            </button>
            <button type="button" class="routes-filter-pill btn-routes-filter ${activeFilter === 'montana' ? 'active' : ''}" data-filter="montana">
              🏔️ Montaña
            </button>
            <button type="button" class="routes-filter-pill btn-routes-filter ${activeFilter === 'costera' ? 'active' : ''}" data-filter="costera">
              🏖️ Costeras &amp; Ríos
            </button>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-size: 1.2rem;">${isExternalRoute ? (diagStateBadge.startsWith('🟢') ? '🟢' : (diagStateBadge.startsWith('🔴') ? '🔴' : '🟡')) : hike.icon}</span>
            <span style="font-size: 0.8rem; color: var(--text-main); font-weight: 700; line-height: 1.35;">
              <strong>${diagTitle}:</strong> ${diagSummary}
            </span>
          </div>

          <div class="routes-metrics-grid" style="margin-bottom: 0;">
            <!-- Firme y Barro -->
            <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">🪵 Firme / Barro</span>
              <strong style="font-size: 0.82rem; color: ${diagMudColor};">
                ${diagMudLabel}
              </strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">${diagMudScore}</span>
            </div>

            <!-- Clima en Cotas Altas -->
            <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">⛰️ Sensación Cumbre</span>
              <strong style="font-size: 0.88rem; color: var(--text-main);">${diagTemp}</strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">${diagGust}</span>
            </div>

            <!-- Calzado Sugerido -->
            <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">👟 Calzado Sugerido</span>
              <strong style="font-size: 0.82rem; color: #38bdf8;">
                ${diagShoes}
              </strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">${diagShoesDesc}</span>
            </div>

            <!-- Protección Solar / Ropa -->
            <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
              <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">🎒 Ropa &amp; UV</span>
              <strong style="font-size: 0.82rem; color: var(--accent, #facc15);">
                ${diagClothes}
              </strong>
              <span style="display: block; font-size: 0.65rem; color: var(--text-dim); margin-top: 1px;">${diagUV}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. CONSEJERO INTELIGENTE: SENDA RECOMENDADA O DETECTOR DE CONDICIONES ÓPTIMAS -->
      <div class="routes-advisor-card">
        <div style="display: flex; align-items: flex-start; gap: 8px;">
          <span style="font-size: 1.3rem; line-height: 1;">${activeFilter === 'dry' ? '🌟' : '💡'}</span>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; margin-bottom: 4px;">
              <strong style="font-size: 0.88rem; color: var(--text-main);">${advisorTitle}</strong>
              <span style="font-size: 0.72rem; font-weight: 800; padding: 2px 7px; border-radius: 10px; background: #22c55e; color: #000;">
                ${advisorBadge}
              </span>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--text-dim); line-height: 1.4; word-break: break-word;">
              ${advisorText}
            </p>
          </div>
        </div>
      </div>

      <!-- 3. SELECTOR TÁCTIL ERGONÓMICO DE SENDA (DISPARADOR DEL BOTTOM SHEET) -->
      <div style="margin-bottom: 12px; display: flex; flex-direction: column; gap: 5px;">
        <label class="picker-section-label" style="font-size: 0.76rem; font-weight: 800; color: #facc15; text-transform: uppercase; letter-spacing: 0.04em; display: flex; align-items: center; gap: 5px;">
          <span>🥾</span>
          <span>Sendas y rutas (${displayedRoutes.length} disponibles):</span>
        </label>
        
        <button type="button" id="btn-open-routes-picker" class="routes-route-trigger" aria-label="Cambiar senda de senderismo">
          <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; min-width: 0;">
            <span style="font-size: 0.95rem;">${activeRoute.typeIcon || '🥾'}</span>
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.84rem;">
              ${activeRoute.name}
            </span>
          </div>
          <div class="picker-action-badge">
            <span class="picker-action-text">${activeRoute.dist} · Elegir</span>
            <span class="picker-action-arrow">▼</span>
          </div>
        </button>
      </div>

      <!-- 4. FICHA DETALLADA DE LA SENDA SELECCIONADA (TARJETA PROTAGONISTA) -->
      <div class="routes-card-solid">
        
        <div style="margin-bottom: 10px;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 6px; flex-wrap: wrap;">
            <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main); line-height: 1.3; flex: 1; min-width: 180px;">
              ${activeRoute.name}
            </h3>
            <div style="display: flex; gap: 4px; align-items: center; flex-wrap: wrap;">
              ${activeRoute.weatherBadge ? `
                <span style="font-size: 0.70rem; font-weight: 800; padding: 2px 7px; border-radius: 8px; background: ${activeRoute.weatherBadge.bg}; color: ${activeRoute.weatherBadge.color}; border: 1px solid ${activeRoute.weatherBadge.border}; white-space: nowrap;">
                  ${activeRoute.weatherBadge.label}
                </span>
              ` : ''}
              <span style="font-size: 0.7rem; font-weight: 800; padding: 2px 7px; border-radius: 8px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); white-space: nowrap;">
                📍 ${activeRoute.concejoName}
              </span>
              <span class="route-diff-badge diff-${activeRoute.diffCat}" style="font-size: 0.7rem; font-weight: 800; padding: 2px 7px; border-radius: 8px;">
                ${activeRoute.diff}
              </span>
            </div>
          </div>
          <span style="font-size: 0.76rem; color: var(--primary); display: block; margin-top: 3px;">
            ${activeDistLabel} • Inicio: ${activeRoute.startPoint}
          </span>
          <p style="margin: 6px 0 0 0; font-size: 0.78rem; color: var(--text-dim); line-height: 1.35;">
            ${activeRoute.desc}
          </p>
        </div>

        <!-- Pastillas métricas rápidas (2x2 en móvil, 4 en desktop) -->
        <div class="routes-metrics-grid">
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Distancia</span>
            <strong style="font-size: 0.92rem; color: var(--text-main);">${activeRoute.dist}</strong>
          </div>
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Desnivel</span>
            <strong style="font-size: 0.92rem; color: var(--accent, #facc15);">${activeRoute.elev}</strong>
          </div>
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--primary);">${activeRoute.time}</strong>
          </div>
          <div style="background: rgba(0,0,0,0.20); border: 1px solid rgba(255,255,255,0.06); padding: 7px 4px; border-radius: 8px; text-align: center;">
            <span style="display: block; font-size: 0.68rem; color: var(--text-dim);">Calzado Óptimo</span>
            <strong style="font-size: 0.78rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">
              ${calzadoRecomendado.replace(/^[^\s]+\s*/, '')}
            </strong>
          </div>
        </div>

        <!-- Tipo de Terreno y Firme -->
        <div style="background: rgba(15, 23, 42, 0.40); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 8px 10px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.1rem;">🪵</span>
          <div style="font-size: 0.74rem; color: var(--text-dim); line-height: 1.3;">
            <strong style="color: var(--text-main);">Firme &amp; Superficie:</strong> ${activeRoute.surface}
          </div>
        </div>

        <!-- Precauciones de Seguridad Específicas -->
        ${activeRoute.caution ? `
          <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 10px; padding: 8px 10px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.1rem;">⚠️</span>
            <div style="font-size: 0.74rem; color: var(--text-dim); line-height: 1.3;">
              <strong style="color: var(--warning, #facc15);">Precaución:</strong> ${activeRoute.caution}
            </div>
          </div>
        ` : ''}

        <!-- 📊 PERFIL CLIMÁTICO HORARIO DIURNO (08:00h - 20:00h): PLUVIÓMETRO, TÉRMICA Y VIENTO (Ley 11 y Feedback Lendo) -->
        ${renderRouteDaylightGraph(data?.weather?.hourly, activeDay, activeRw, isExternalRoute)}

        <!-- Botón interactivo para ver Ficha Didáctica y Track GPS -->
        <button type="button" class="btn-explain-route" data-explain-route="${activeRoute.id}" style="width: 100%; padding: 10px; border-radius: 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); color: var(--primary); font-size: 0.8rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <span>🗺️</span>
          <span>Ver Ficha Oficial, Accesos y Track GPS ➔</span>
        </button>

      </div>

      <!-- 5. DESCARGO LEGAL Y CONSEJOS DE SEGURIDAD EN MONTAÑA (LEY 16) -->
      <div style="background: rgba(11, 19, 43, 0.85); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 10px 12px; font-size: 0.72rem; color: var(--text-dim); line-height: 1.4; box-sizing: border-box;">
        <strong>🛡️ Seguridad en Montaña &amp; Exención de Responsabilidad:</strong>
        Estimaciones meteorológicas orientativas. La montaña asturiana sufre cambios súbitos (niebla cerrada, borrina, tormentas y roca caliza húmeda). Lleva siempre calzado de taco, ropa de abrigo/cortavientos, agua y móvil con batería. Emergencias: <strong>112</strong>.
      </div>

      <!-- 6. BOTTOM SHEET / MODAL ERGONÓMICO DE SELECCIÓN DE SENDAS (58 RUTAS) -->
      <div id="hiking-routes-modal" class="routes-modal-backdrop" aria-hidden="true">
        <div class="routes-modal-sheet">
          
          <div style="padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--text-main);">
                ${activeFilter === 'dry' ? '🌟 Rutas con Mejores Condiciones' : 'Selecciona senda de senderismo'}
              </h3>
              <span style="font-size: 0.75rem; color: var(--text-dim);">
                ${activeFilter === 'dry' ? `Mostrando opciones más favorables (lluvia y viento) para ${dayLabelLower} en toda Asturias` : 'Toca una senda para cargar su ficha técnica'}
              </span>
            </div>
            <button type="button" id="btn-close-hiking-modal" style="background: rgba(255,255,255,0.08); border: none; color: var(--text-main); font-size: 1.1rem; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
              ✕
            </button>
          </div>

          <div style="padding: 12px 14px; overflow-y: auto; flex: 1; -webkit-overflow-scrolling: touch;">
            
            ${activeFilter === 'dry' ? `
              <div style="margin-bottom: 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 10px; padding: 8px 10px; font-size: 0.74rem; color: var(--text-main);">
                <strong>🌟 Buscador de Mejores Condiciones:</strong> Rutas ordenadas combinando ausencia de lluvia, viento seguro y firme favorable en toda Asturias.
              </div>
            ` : ''}

            ${localRoutes.length > 0 && activeFilter !== 'dry' ? `
              <div style="margin-bottom: 14px;">
                <span style="font-size: 0.76rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                  📍 Sendas en ${concejoTitle} y Cercanías (${localRoutes.length})
                </span>
                ${localRoutes.map(r => `
                  <div class="routes-item-card ${r.id === activeRoute.id ? 'selected' : ''}" data-route-id="${r.id}">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                      <strong style="font-size: 0.84rem; color: var(--text-main);">${r.typeIcon || '🥾'} ${r.name}</strong>
                      <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); white-space: nowrap;">${r.dist}</span>
                    </div>
                    <div style="display: flex; gap: 6px; align-items: center; font-size: 0.72rem; color: var(--text-dim); flex-wrap: wrap;">
                      ${r.weatherBadge ? `
                        <span style="padding: 1px 6px; border-radius: 6px; font-size: 0.68rem; font-weight: 700; background: ${r.weatherBadge.bg}; color: ${r.weatherBadge.color}; border: 1px solid ${r.weatherBadge.border};">
                          ${r.weatherBadge.label}
                        </span>
                      ` : ''}
                      <span style="color: var(--primary);">📍 ${r.distFromUserKm < 0.5 ? 'En este concejo' : `A ${r.distFromUserKm} km`}</span>
                      <span>•</span>
                      <span>${r.elev}</span>
                      <span>•</span>
                      <span class="route-diff-badge diff-${r.diffCat}" style="padding: 1px 6px; font-size: 0.68rem;">${r.diff}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${(activeFilter === 'dry' ? displayedRoutes : otherRoutes).length > 0 ? `
              <div>
                <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                  ${activeFilter === 'dry' ? `🏆 Rutas Clasificadas por Escampada (${displayedRoutes.length})` : `🌟 Grandes Rutas de Asturias (${otherRoutes.length})`}
                </span>
                ${(activeFilter === 'dry' ? displayedRoutes : otherRoutes).map(r => `
                  <div class="routes-item-card ${r.id === activeRoute.id ? 'selected' : ''}" data-route-id="${r.id}">
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px;">
                      <strong style="font-size: 0.84rem; color: var(--text-main);">${r.typeIcon || '🥾'} ${r.name}</strong>
                      <span style="font-size: 0.76rem; font-weight: 800; color: var(--accent, #facc15); white-space: nowrap;">${r.dist}</span>
                    </div>
                    <div style="display: flex; gap: 6px; align-items: center; font-size: 0.72rem; color: var(--text-dim); flex-wrap: wrap;">
                      ${r.weatherBadge ? `
                        <span style="padding: 1px 6px; border-radius: 6px; font-size: 0.68rem; font-weight: 700; background: ${r.weatherBadge.bg}; color: ${r.weatherBadge.color}; border: 1px solid ${r.weatherBadge.border};">
                          ${r.weatherBadge.label}
                        </span>
                      ` : ''}
                      <span>📍 ${r.concejoName} (a ${r.distFromUserKm} km)</span>
                      <span>•</span>
                      <span>${r.elev}</span>
                      <span>•</span>
                      <span class="route-diff-badge diff-${r.diffCat}" style="padding: 1px 6px; font-size: 0.68rem;">${r.diff}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

          </div>

        </div>
      </div>

    </div>
  `;
}