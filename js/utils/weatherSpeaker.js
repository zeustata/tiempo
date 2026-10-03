/**
 * METEOASTUR LODE - Locutor Meteorológico ("MeteoAstur Voz")
 * Desarrollado por Manuel A. L. Barril (Lendo) y Princesa.
 * 
 * Genera y locuta un boletín meteorológico fluido y natural para el concejo activo
 * utilizando la Web Speech API nativa (100% en cliente, 0 KB librerías, 0 coste de servidor).
 */

import { getWeatherInfo } from './weatherIcons.js?v=1.1.59';

let isSpeakingActive = false;
let currentUtterance = null;

/**
 * Genera el guion textual del boletín meteorológico para el concejo
 */
export function generateWeatherSpeechScript(concejo, weatherData) {
  if (!weatherData || !weatherData.weather) {
    return `Información meteorológica no disponible actualmente para ${concejo.name}.`;
  }

  const current = weatherData.weather.current || {};
  const hourly = weatherData.weather.hourly || {};
  const daily = weatherData.weather.daily || {};
  const marine = weatherData.marine?.current || null;

  const currentHour = new Date().getHours();
  const currentPop = (hourly?.precipitation_probability && hourly.precipitation_probability[currentHour] != null)
    ? hourly.precipitation_probability[currentHour]
    : 0;

  const weatherInfo = getWeatherInfo(
    current.weather_code != null ? current.weather_code : 0,
    current.is_day != null ? current.is_day : 1,
    current.precipitation || 0,
    currentPop,
    current.direct_normal_irradiance,
    current.uv_index,
    current.shortwave_radiation,
    current.cloud_cover,
    current.relative_humidity_2m
  );

  const cleanConcejoName = concejo.name ? concejo.name.replace(/\(.*?\)/, '').trim() : 'Asturias';
  const temp = Math.round(current.temperature_2m != null ? current.temperature_2m : 15);
  const feelsLike = Math.round(current.apparent_temperature != null ? current.apparent_temperature : temp);
  const tempMin = daily.temperature_2m_min ? Math.round(daily.temperature_2m_min[0]) : null;
  const tempMax = daily.temperature_2m_max ? Math.round(daily.temperature_2m_max[0]) : null;

  const windSpeed = Math.round(current.wind_speed_10m != null ? current.wind_speed_10m : 0);
  const windGusts = Math.round(current.wind_gusts_10m != null ? current.wind_gusts_10m : windSpeed);
  const humidity = Math.round(current.relative_humidity_2m != null ? current.relative_humidity_2m : 70);

  // Guion narrativo
  let script = `Boletín meteorológico para ${cleanConcejoName}. `;

  // 1. Condición actual y temperatura
  script += `Actualmente tenemos ${temp} grados`;
  if (feelsLike !== temp) {
    script += `, con una sensación térmica de ${feelsLike} grados`;
  }
  script += `. El cielo presenta ${weatherInfo.label.toLowerCase()}. `;

  // 2. Extremos de temperatura
  if (tempMin != null && tempMax != null) {
    script += `Para hoy se espera una temperatura mínima de ${tempMin} y una máxima que alcanzará los ${tempMax} grados. `;
  }

  // 3. Viento
  if (windSpeed < 5) {
    script += `Viento en calma o muy flojo. `;
  } else {
    script += `Viento soplando a ${windSpeed} kilómetros por hora`;
    if (windGusts >= windSpeed + 10) {
      script += `, con rachas máximas de hasta ${windGusts} kilómetros por hora`;
    }
    script += `. `;
  }

  // 4. Humedad y precipitación
  script += `Humedad relativa del ${humidity} por ciento. `;
  const rainCurrent = current.precipitation || 0;
  if (rainCurrent >= 0.1) {
    script += `Se están registrando precipitaciones con un acumulado de ${rainCurrent.toFixed(1).replace('.', ',')} litros por metro cuadrado. `;
  } else if (currentPop >= 40) {
    script += `Existe una probabilidad de lluvia del ${currentPop} por ciento para las próximas horas. `;
  } else {
    script += `Sin precipitaciones previstas para las próximas horas. `;
  }

  // 5. Estado de la costa cantábrica o montaña
  if ((concejo.type === 'coast' || concejo.region?.includes('Costa')) && marine && marine.wave_height != null) {
    const wave = marine.wave_height.toFixed(1).replace('.', ',');
    script += `En el litoral cantábrico, la altura del oleaje se sitúa en torno a ${wave} metros. `;
  }

  script += `Previsión generada por MeteoAstur Lode.`;
  return script;
}

/**
 * Selecciona la mejor voz en español disponible en el sistema
 */
function getBestSpanishVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;

  // Prioridades: 1. es-ES natural, 2. Google/Microsoft/Apple es-ES, 3. cualquier es-*
  const esSpain = voices.find(v => v.lang === 'es-ES' && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Siri') || v.name.includes('Pablo') || v.name.includes('Laura') || v.name.includes('Helena')));
  if (esSpain) return esSpain;

  const anySpain = voices.find(v => v.lang === 'es-ES' || v.lang === 'es_ES');
  if (anySpain) return anySpain;

  const anySpanish = voices.find(v => v.lang.startsWith('es'));
  return anySpanish || voices[0];
}

/**
 * Detiene cualquier locución activa
 */
export function stopWeatherSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  isSpeakingActive = false;
  currentUtterance = null;
  updateAudioButtonsState(false);
}

/**
 * Actualiza el aspecto de todos los botones de audio en pantalla
 */
function updateAudioButtonsState(speaking) {
  isSpeakingActive = speaking;
  const buttons = document.querySelectorAll('.btn-hero-audio');
  buttons.forEach(btn => {
    if (speaking) {
      btn.innerHTML = '⏹️';
      btn.classList.add('speaking');
      btn.title = 'Detener locución de voz';
      btn.setAttribute('aria-label', 'Detener locución');
    } else {
      btn.innerHTML = '🔊';
      btn.classList.remove('speaking');
      btn.title = 'Escuchar boletín meteorológico con voz';
      btn.setAttribute('aria-label', 'Escuchar locución');
    }
  });
}

/**
 * Alterna entre iniciar la locución o detenerla
 */
export function toggleWeatherSpeech(concejo, weatherData) {
  if (!('speechSynthesis' in window)) {
    alert('Tu navegador o dispositivo no soporta la síntesis de voz (Web Speech API).');
    return;
  }

  // Si ya está hablando, detener
  if (isSpeakingActive || window.speechSynthesis.speaking) {
    stopWeatherSpeech();
    return;
  }

  const textToSpeak = generateWeatherSpeechScript(concejo, weatherData);
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  currentUtterance = utterance;

  utterance.lang = 'es-ES';
  utterance.rate = 1.02; // Cadencia natural y ágil
  utterance.pitch = 1.0;

  const voice = getBestSpanishVoice();
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    updateAudioButtonsState(true);
  };

  utterance.onend = () => {
    updateAudioButtonsState(false);
  };

  utterance.onerror = (e) => {
    // Si fue cancelado a propósito, ignorar
    if (e.error !== 'canceled' && e.error !== 'interrupted') {
      console.warn('[MeteoAstur Audio] Error en síntesis de voz:', e);
    }
    updateAudioButtonsState(false);
  };

  // Asegurar que las voces estén cargadas en navegadores Chromium
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      const v = getBestSpanishVoice();
      if (v) utterance.voice = v;
      window.speechSynthesis.speak(utterance);
    };
  } else {
    window.speechSynthesis.speak(utterance);
  }
}
