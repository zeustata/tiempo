/**
 * METEOASTUR LODE - Generador de Estampa Compartible ("MeteoAstur Instant")
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * 
 * Genera al vuelo una postal visual en resolución 1080x1350 px (4:5) mediante
 * HTML5 Canvas en cliente (0 peticiones a servidores externos, 0 KB librerías).
 * Compatible con la Web Share API (WhatsApp, Instagram, Telegram) y descarga directa.
 */

import { getWeatherInfo } from './weatherIcons.js?v=1.1.57';

const DICHOS_ASTURIANOS = [
  "«El tiempu n'Asturies camuda más que l'orballu na yerba.»",
  "«Si ves la mar berrar, pon la proa pal varaderu.»",
  "«Añu de ñeve na cordal, añu de miel y de pan.»",
  "«Cuando la Peña Peñamea tien capielle, o llueve o nieva.»",
  "«Agua de mayu, pan pa tol añu.»",
  "«Pel branu solazu y pel hibiernu caldiu.»",
  "«Cielu a borregos, suelu moyáu en poques hores.»",
  "«El Nordés llimpia'l cielu y apura'l orbayu.»",
  "«Vientu les castañes: aire secu que templa los valles.»"
];

function getRandomDicho() {
  const idx = Math.floor(Math.random() * DICHOS_ASTURIANOS.length);
  return DICHOS_ASTURIANOS[idx];
}

function drawRoundRectFallback(ctx, x, y, width, height, radius) {
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Genera el lienzo de 1080x1350 px con el estado del tiempo actual
 */
export function generateShareCardCanvas(concejo, weatherData) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  const current = weatherData.weather?.current || {};
  const hourly = weatherData.weather?.hourly || {};
  const daily = weatherData.weather?.daily || {};
  const marine = weatherData.marine?.current || null;

  const currentHour = new Date().getHours();
  const currentPop = (hourly?.precipitation_probability && hourly.precipitation_probability[currentHour] != null)
    ? hourly.precipitation_probability[currentHour]
    : 0;
  const directIrr = current.direct_normal_irradiance != null ? current.direct_normal_irradiance : null;
  const currentUv = current.uv_index != null ? current.uv_index : null;
  const currentSw = current.shortwave_radiation != null ? current.shortwave_radiation : null;
  const currentCloud = current.cloud_cover != null ? current.cloud_cover : 50;

  const weatherInfo = getWeatherInfo(
    current.weather_code != null ? current.weather_code : 0,
    current.is_day != null ? current.is_day : 1,
    current.precipitation || 0,
    currentPop,
    directIrr,
    currentUv,
    currentSw,
    currentCloud
  );

  const tempVal = Math.round(current.temperature_2m != null ? current.temperature_2m : 15);
  const feelsLike = Math.round(current.apparent_temperature != null ? current.apparent_temperature : tempVal);
  const tempMin = daily.temperature_2m_min ? Math.round(daily.temperature_2m_min[0]) : tempVal - 3;
  const tempMax = daily.temperature_2m_max ? Math.round(daily.temperature_2m_max[0]) : tempVal + 3;

  const windSpeed = Math.round(current.wind_speed_10m || 0);
  const windGusts = Math.round(current.wind_gusts_10m || windSpeed);
  const humidity = Math.round(current.relative_humidity_2m || 75);
  const rainSum = daily.precipitation_sum ? daily.precipitation_sum[0] : 0;

  const isNight = current.is_day === 0;

  // 1. Fondo atmosférico principal con gradiente
  let gradBg = ctx.createLinearGradient(0, 0, 1080, 1350);
  if (isNight) {
    gradBg.addColorStop(0, '#040814');
    gradBg.addColorStop(0.5, '#0b162c');
    gradBg.addColorStop(1, '#020617');
  } else if (weatherInfo.isResol || weatherInfo.label.toLowerCase().includes('sol') || weatherInfo.label.toLowerCase().includes('despejado')) {
    gradBg.addColorStop(0, '#0c224a');
    gradBg.addColorStop(0.5, '#1e3a8a');
    gradBg.addColorStop(1, '#0f172a');
  } else if (weatherInfo.label.toLowerCase().includes('lluvia') || weatherInfo.label.toLowerCase().includes('orbayu')) {
    gradBg.addColorStop(0, '#0f172a');
    gradBg.addColorStop(0.5, '#134e4a');
    gradBg.addColorStop(1, '#091524');
  } else {
    gradBg.addColorStop(0, '#0f172a');
    gradBg.addColorStop(0.5, '#1e293b');
    gradBg.addColorStop(1, '#090d16');
  }
  ctx.fillStyle = gradBg;
  ctx.fillRect(0, 0, 1080, 1350);

  // Halo cálido o frío decorativo
  let glow = ctx.createRadialGradient(850, 250, 20, 850, 250, 450);
  if (weatherInfo.isResol || !isNight) {
    glow.addColorStop(0, 'rgba(250, 204, 21, 0.28)');
    glow.addColorStop(1, 'rgba(250, 204, 21, 0)');
  } else {
    glow.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
    glow.addColorStop(1, 'rgba(56, 189, 248, 0)');
  }
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1080, 1350);

  // 2. Tarjeta interior Liquid Glass (Marco con esquinas redondeadas)
  const cardX = 48, cardY = 48, cardW = 984, cardH = 1254, cardRadius = 36;
  ctx.save();
  drawRoundRectFallback(ctx, cardX, cardY, cardW, cardH, cardRadius);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.stroke();
  ctx.restore();

  // 3. Cabecera Institucional
  ctx.font = '700 22px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('METEOASTUR LODE', cardX + 44, cardY + 70);

  ctx.font = '700 22px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#facc15';
  ctx.textAlign = 'right';
  ctx.fillText('🚩 ASTURIAS', cardX + cardW - 44, cardY + 70);
  ctx.textAlign = 'left';

  // Línea separadora tenue
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cardX + 44, cardY + 95);
  ctx.lineTo(cardX + cardW - 44, cardY + 95);
  ctx.stroke();

  // 4. Nombre del Concejo y Localidades
  const rawName = concejo.name || 'Asturias';
  const nameMatch = rawName.match(/^(.*?)\s*(\(.*?\))$/);
  const mainConcejoName = nameMatch ? nameMatch[1] : rawName;
  const localities = nameMatch ? nameMatch[2].replace(/[()]/g, '') : concejo.region || '';

  ctx.font = '800 56px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(mainConcejoName, cardX + 44, cardY + 145);

  ctx.font = '600 24px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`${localities}  •  ${concejo.altitude || 0} m`, cardX + 44, cardY + 185);

  // Fecha y hora formateada en Asturiano / Español
  const now = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
  const dateStr = now.toLocaleDateString('es-ES', options).replace(',', ' •');
  ctx.font = '500 20px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText(dateStr.toUpperCase(), cardX + 44, cardY + 220);

  // 5. Bloque Central: Gran Temperatura + Icono + Condición
  // Gran temperatura
  ctx.font = '800 135px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${tempVal}°`, cardX + 44, cardY + 365);

  // Icono del tiempo grande (emoji/símbolo de alta legibilidad)
  const iconEmoji = weatherInfo.icon || '⛅';
  ctx.font = '95px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  ctx.fillText(iconEmoji, cardX + 410, cardY + 350);

  // Nombre de la condición en vivo
  ctx.font = '700 38px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = weatherInfo.isResol ? '#fef08a' : '#e2e8f0';
  ctx.fillText(weatherInfo.label, cardX + 44, cardY + 430);

  // Píldoras de Sensación y Min/Max
  ctx.font = '600 24px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`Sensación: ${feelsLike}°C`, cardX + 44, cardY + 472);

  ctx.font = '700 24px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText(`↓ ${tempMin}°C`, cardX + 310, cardY + 472);
  ctx.fillStyle = '#f87171';
  ctx.fillText(`↑ ${tempMax}°C`, cardX + 420, cardY + 472);

  // 6. Tres Cajas Métricas Horizontales
  const boxY = cardY + 505;
  const boxH = 135;
  const boxW = (cardW - 88 - 32) / 3;

  const metrics = [
    {
      icon: '💨',
      label: 'VIENTO & RACHAS',
      val: `${windSpeed} km/h`,
      sub: `Racha: ${windGusts} km/h`
    },
    {
      icon: '💧',
      label: 'HUMEDAD & AGUA',
      val: `${humidity}%`,
      sub: rainSum > 0 ? `Lluvia: ${rainSum} mm` : 'Sin lluvia'
    },
    {
      icon: (concejo.type === 'coast' || concejo.region?.includes('Costa')) ? '🌊' : '🏔️',
      label: (concejo.type === 'coast' || concejo.region?.includes('Costa')) ? 'MAR CANTÁBRICO' : 'ENTORNO',
      val: (marine && marine.wave_height != null) ? `${marine.wave_height.toFixed(1)} m` : 'Cantábrico',
      sub: (concejo.type === 'coast' || concejo.region?.includes('Costa')) ? 'Oleaje y rompiente' : 'Valle y montaña'
    }
  ];

  metrics.forEach((m, i) => {
    const curX = cardX + 44 + i * (boxW + 16);
    ctx.save();
    drawRoundRectFallback(ctx, curX, boxY, boxW, boxH, 20);
    ctx.fillStyle = 'rgba(30, 41, 59, 0.65)';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.stroke();

    // Texto interior
    ctx.font = '26px sans-serif';
    ctx.fillText(m.icon, curX + 18, boxY + 42);

    ctx.font = '700 15px "Inter", -apple-system, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(m.label, curX + 56, boxY + 38);

    ctx.font = '800 28px "Inter", -apple-system, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(m.val, curX + 18, boxY + 82);

    ctx.font = '600 16px "Inter", -apple-system, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(m.sub, curX + 18, boxY + 114);

    ctx.restore();
  });

  // 7. Franja de Refrán Asturiano
  const refranY = cardY + 660;
  const dicho = getRandomDicho();

  ctx.save();
  drawRoundRectFallback(ctx, cardX + 44, refranY, cardW - 88, 75, 18);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.50)';
  ctx.fill();
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = 'rgba(250, 204, 21, 0.35)';
  ctx.stroke();

  ctx.font = 'italic 500 21px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#fef08a';
  ctx.textAlign = 'center';
  ctx.fillText(dicho, cardX + cardW / 2, refranY + 46);
  ctx.textAlign = 'left';
  ctx.restore();

  // 8. Evolución Horaria Detallada (Próximas 6 Horas con Icono, Pluviómetro y Viento)
  const hourlyTitleY = cardY + 770;
  ctx.font = '700 20px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('EVOLUCIÓN PRÓXIMAS 6 HORAS', cardX + 44, hourlyTitleY);

  if (hourly && hourly.time && hourly.temperature_2m) {
    let startIdx = 0;
    const nowHour = now.getHours();
    const foundIdx = hourly.time.findIndex(t => {
      const d = new Date(t);
      return d.getDate() === now.getDate() && d.getHours() === nowHour;
    });
    startIdx = foundIdx !== -1 ? foundIdx : Math.min(nowHour, hourly.time.length - 1);

    const cardBoxW = 140;
    const cardBoxH = 225;
    const gap = (cardW - 88 - (6 * cardBoxW)) / 5;
    const cardsStartY = cardY + 795;

    for (let step = 0; step < 6; step++) {
      const idx = startIdx + step;
      if (idx >= hourly.time.length) break;

      const curX = cardX + 44 + step * (cardBoxW + gap);
      const curY = cardsStartY;
      const tDate = new Date(hourly.time[idx]);
      const hourFormatted = step === 0 ? 'Ahora' : `${tDate.getHours().toString().padStart(2, '0')}:00`;
      const isDay = (hourly.is_day && hourly.is_day[idx] != null) ? hourly.is_day[idx] : (tDate.getHours() >= 8 && tDate.getHours() < 21 ? 1 : 0);
      const code = hourly.weather_code ? hourly.weather_code[idx] : 0;
      const pop = hourly.precipitation_probability ? (hourly.precipitation_probability[idx] || 0) : 0;
      const precip = hourly.precipitation ? (hourly.precipitation[idx] || 0) : 0;
      const cloudCover = (hourly.cloud_cover && hourly.cloud_cover[idx] != null) ? hourly.cloud_cover[idx] : null;
      const isImmediate = (step <= 1);
      const hWeather = getWeatherInfo(code, isDay, precip, pop, isImmediate ? directIrr : null, isImmediate ? currentUv : null, isImmediate ? currentSw : null, cloudCover);
      const hIcon = hWeather ? hWeather.icon : '☀️';
      const hTemp = Math.round(hourly.temperature_2m[idx]);
      const hWind = hourly.wind_speed_10m ? Math.round(hourly.wind_speed_10m[idx]) : (hourly.windspeed_10m ? Math.round(hourly.windspeed_10m[idx]) : 0);

      ctx.save();
      // Fondo Liquid Glass de la tarjeta horaria
      drawRoundRectFallback(ctx, curX, curY, cardBoxW, cardBoxH, 16);
      ctx.fillStyle = step === 0 ? 'rgba(14, 165, 233, 0.20)' : 'rgba(15, 23, 42, 0.55)';
      ctx.fill();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = step === 0 ? 'rgba(56, 189, 248, 0.55)' : 'rgba(255, 255, 255, 0.12)';
      ctx.stroke();

      const centerX = curX + cardBoxW / 2;

      // 1. Hora
      ctx.font = '700 17px "Inter", -apple-system, sans-serif';
      ctx.fillStyle = step === 0 ? '#38bdf8' : '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(hourFormatted, centerX, curY + 30);

      // 2. Icono Meteorológico
      ctx.font = '36px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
      ctx.fillText(hIcon, centerX, curY + 76);

      // 3. Temperatura
      ctx.font = '800 28px "Inter", -apple-system, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${hTemp}°`, centerX, curY + 118);

      // 4. Pluviómetro / Lluvia
      ctx.font = '600 15px "Inter", -apple-system, sans-serif';
      if (precip >= 0.1) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(`💧 ${precip.toFixed(1)}mm`, centerX, curY + 154);
      } else if (pop >= 15) {
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(`💧 ${pop}%`, centerX, curY + 154);
      } else {
        ctx.fillStyle = '#64748b';
        ctx.fillText('💧 0 mm', centerX, curY + 154);
      }

      // 5. Viento
      ctx.font = '600 14px "Inter", -apple-system, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`💨 ${hWind} km/h`, centerX, curY + 192);

      ctx.restore();
    }
    ctx.textAlign = 'left';
  }

  // 9. Pie Institucional de Firma y Autoría
  const footerY = cardY + cardH - 50;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cardX + 44, footerY - 35);
  ctx.lineTo(cardX + cardW - 44, footerY - 35);
  ctx.stroke();

  ctx.font = '700 20px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('MeteoAstur Lode', cardX + 44, footerY);

  ctx.font = '500 18px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('•  Manuel A. L. Barril (zeustata)  •  Open-Meteo & AEMET', cardX + 220, footerY);

  ctx.font = '700 18px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.textAlign = 'right';
  ctx.fillText('zeustata.github.io/tiempo', cardX + cardW - 44, footerY);
  ctx.textAlign = 'left';

  return canvas;
}

/**
 * Abre el modal con la estampa interactiva y activa las opciones de compartir
 */
export function openShareModal(concejo, weatherData) {
  const modal = document.getElementById('share-card-modal');
  const previewContainer = document.getElementById('share-card-preview-container');
  if (!modal || !previewContainer) return;

  previewContainer.innerHTML = '<div class="share-loading-spinner">🎨 Generando estampa asturiana...</div>';
  modal.style.display = 'flex';

  setTimeout(() => {
    try {
      const canvas = generateShareCardCanvas(concejo, weatherData);
      previewContainer.innerHTML = '';
      
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      img.alt = `Estampa del tiempo de ${concejo.name}`;
      img.className = 'share-preview-img';
      img.style.width = '100%';
      img.style.maxWidth = '250px';
      img.style.height = 'auto';
      img.style.display = 'block';
      img.style.borderRadius = '16px';
      img.style.margin = '0 auto';
      img.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.18)';
      img.style.boxSizing = 'border-box';
      previewContainer.appendChild(img);

      // Configurar botón compartir
      const btnShare = document.getElementById('btn-action-share-native');
      const btnDownload = document.getElementById('btn-action-share-download');

      if (btnShare) {
        btnShare.onclick = async () => {
          canvas.toBlob(async (blob) => {
            if (!blob) return;
            const file = new File([blob], `meteoastur-${concejo.id}.png`, { type: 'image/png' });
            const shareData = {
              title: `El tiempo en ${concejo.name} • MeteoAstur Lode`,
              text: `Mira cómo está el tiempo hoy en ${concejo.name} (${Math.round(weatherData.weather.current.temperature_2m)}°C). Generado con MeteoAstur Lode: https://zeustata.github.io/tiempo/`,
              files: [file]
            };

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              try {
                await navigator.share(shareData);
              } catch (err) {
                if (err.name !== 'AbortError') {
                  downloadCanvasImage(canvas, concejo.id);
                }
              }
            } else if (navigator.share) {
              // Compartir solo texto y link si el navegador no soporta adjuntar archivos
              try {
                await navigator.share({
                  title: shareData.title,
                  text: shareData.text,
                  url: 'https://zeustata.github.io/tiempo/'
                });
              } catch (err) {
                downloadCanvasImage(canvas, concejo.id);
              }
            } else {
              // Fallback directo a descarga
              downloadCanvasImage(canvas, concejo.id);
            }
          }, 'image/png');
        };
      }

      if (btnDownload) {
        btnDownload.onclick = () => {
          downloadCanvasImage(canvas, concejo.id);
        };
      }

    } catch (e) {
      console.error('[MeteoAstur] Error generando estampa compartible:', e);
      previewContainer.innerHTML = '<p class="error-msg">No se pudo generar la estampa. Inténtalo de nuevo.</p>';
    }
  }, 50);
}

function downloadCanvasImage(canvas, concejoId) {
  const link = document.createElement('a');
  link.download = `meteoastur-${concejoId || 'asturias'}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
