import { CONCEJOS_ASTURIAS, getConcejoById, findClosestConcejo } from './config/concejos.js';
import { fetchWeatherData } from './services/weatherApi.js';
import { getPreferences, savePreferences, toggleFavorite, isFavorite } from './utils/storage.js';
import { renderCurrentWeather } from './components/currentCard.js';
import { renderMarineCard } from './components/marineCard.js';
import { renderMountainCard } from './components/mountainCard.js';
import { renderForecast } from './components/forecastView.js';
import { renderWeatherChart } from './components/chartsView.js';
import { initAsturiasMap, playRadarAnimation, focusConcejoOnMap, resizeMap, resetMapCenter } from './components/mapRadar.js';

class MeteoAsturiasApp {
  constructor() {
    this.prefs = getPreferences();
    this.currentConcejo = getConcejoById(this.prefs.lastConcejo) || CONCEJOS_ASTURIAS[0];
    this.weatherData = null;
    this.activeTab = 'live';
    this.autoRefreshTimer = null;
    this.deferredInstallPrompt = null;
    
    this.init();
  }

  async init() {
    this.renderConcejoDropdown();
    this.renderFavoritePills();
    this.setupEventListeners();
    this.setupPwaInstall();
    this.setupKeyboardShortcuts();
    this.setupLiveClock();
    this.setupNetworkMonitor();
    this.setupFullscreen();
    this.initParticleCanvas();

    // Comprobar si se abrió desde un acceso directo PWA (hash URL)
    this.handleInitialHash();

    // Cargar datos del concejo actual
    await this.loadWeather(this.currentConcejo.id);

    // Inicializar mapa Leaflet
    initAsturiasMap('map-container', (concejoId) => {
      this.switchConcejo(concejoId);
    });

    // Auto-refresco cada 10 minutos en segundo plano
    if (this.prefs.autoRefresh) {
      this.autoRefreshTimer = setInterval(() => {
        this.loadWeather(this.currentConcejo.id);
      }, 10 * 60 * 1000);
    }

    // Auto-refresco instantáneo cada vez que abres o desbloqueas la App
    this.setupAutoRefreshOnResume();
  }

  setupAutoRefreshOnResume() {
    let lastRefreshTime = Date.now();

    const refreshIfStale = () => {
      const now = Date.now();
      // Si han pasado más de 45 segundos desde la última carga o se vuelve a abrir la app
      if (now - lastRefreshTime > 45 * 1000) {
        lastRefreshTime = now;
        console.log('[MeteoAstur] Reanudación detectada: actualizando datos del tiempo y versión...');
        
        // 1. Actualizar datos meteorológicos
        this.loadWeather(this.currentConcejo.id);

        // 2. Comprobar si hay nueva versión de la app en GitHub
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistration().then(reg => {
            if (reg) reg.update();
          });
        }
      }
    };

    // Cuando vuelves a la pestaña/app desde otra app o desbloqueas el móvil
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        refreshIfStale();
      }
    });

    // Cuando la ventana recupera el foco en Windows/navegador
    window.addEventListener('focus', () => {
      refreshIfStale();
    });

    // Evento pageshow para móviles (cuando se recupera de la memoria de Android/iOS)
    window.addEventListener('pageshow', (event) => {
      refreshIfStale();
    });
  }

  handleInitialHash() {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['live', 'radar', 'marine', 'mountain', 'forecast', 'charts', 'glossary'];
    if (validTabs.includes(hash)) {
      this.switchTab(hash);
    }
  }

  renderConcejoDropdown() {
    const select = document.getElementById('concejo-select');
    if (!select) return;

    const coastGroup = CONCEJOS_ASTURIAS.filter(c => c.type === 'coast');
    const valleyGroup = CONCEJOS_ASTURIAS.filter(c => c.type === 'valley');
    const mountainGroup = CONCEJOS_ASTURIAS.filter(c => c.type === 'mountain');

    let html = '';
    html += '<optgroup label="🌊 Costa y Rías de Asturias">';
    html += coastGroup.map(c => '<option value="' + c.id + '" ' + (c.id === this.currentConcejo.id ? 'selected' : '') + '>' + c.name + '</option>').join('');
    html += '</optgroup>';
    html += '<optgroup label="🏛️ Valles y Centros Urbanos">';
    html += valleyGroup.map(c => '<option value="' + c.id + '" ' + (c.id === this.currentConcejo.id ? 'selected' : '') + '>' + c.name + '</option>').join('');
    html += '</optgroup>';
    html += '<optgroup label="🏔️ Montaña y Picos de Europa">';
    html += mountainGroup.map(c => '<option value="' + c.id + '" ' + (c.id === this.currentConcejo.id ? 'selected' : '') + '>' + c.name + '</option>').join('');
    html += '</optgroup>';

    select.innerHTML = html;
  }

  renderFavoritePills() {
    const container = document.getElementById('favorites-container');
    if (!container) return;

    const favs = (this.prefs.favorites || []).map(id => getConcejoById(id)).filter(Boolean);
    
    let html = '<span class="fav-label">⭐ Favoritos:</span>';
    if (favs.length === 0) {
      html += '<span style="font-size: 0.8rem; color: var(--text-dim); padding: 4px 8px;">(Pulsa ⭐ Guardar para añadir concejos)</span>';
    } else {
      html += favs.map(c => '<button class="pill-item ' + (c.id === this.currentConcejo.id ? 'active' : '') + '" data-id="' + c.id + '">' + c.name.split('/')[0] + '</button>').join('');
    }
    
    container.innerHTML = html;

    container.querySelectorAll('.pill-item').forEach(btn => {
      btn.onclick = () => {
        this.triggerHaptic();
        this.switchConcejo(btn.dataset.id);
      };
    });
  }

  setupEventListeners() {
    // Cambio en selector dropdown
    const select = document.getElementById('concejo-select');
    if (select) {
      select.addEventListener('change', (e) => {
        this.triggerHaptic();
        this.switchConcejo(e.target.value);
      });
    }

    // Botón Favorito Toggle
    const favBtn = document.getElementById('btn-toggle-fav');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.prefs.favorites = toggleFavorite(this.currentConcejo.id);
        this.updateFavButton();
        this.renderFavoritePills();
      });
    }

    // Botón Geolocalización GPS
    const gpsBtn = document.getElementById('btn-gps');
    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.locateUser();
      });
    }

    // Botón Actualizar
    const refreshBtn = document.getElementById('btn-refresh');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.triggerHaptic();
        refreshBtn.textContent = '⏳ Cargando...';
        
        // Comprobar si hay nueva versión de la app en la nube
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistration().then(reg => {
            if (reg) reg.update();
          });
        }

        this.loadWeather(this.currentConcejo.id).finally(() => {
          setTimeout(() => {
            if (refreshBtn) refreshBtn.textContent = '🔄 Refrescar';
          }, 600);
        });
      });
    }

    // Toggle de Unidades (km/h vs nudos)
    const unitBtn = document.getElementById('btn-unit-toggle');
    if (unitBtn) {
      unitBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.prefs.units = this.prefs.units === 'metric' ? 'knots' : 'metric';
        savePreferences(this.prefs);
        unitBtn.textContent = this.prefs.units === 'metric' ? 'Unidades: km/h' : 'Unidades: Nudos (kt)';
        this.renderAllComponents();
      });
    }

    // Botón Modo Pantalla Completa / Kiosko (Windows & Desktop)
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    // Botón Modal de Atajos
    const shortcutsBtn = document.getElementById('btn-shortcuts-help');
    const shortcutsModal = document.getElementById('shortcuts-modal');
    const closeModalBtn = document.getElementById('btn-close-modal');

    if (shortcutsBtn && shortcutsModal) {
      shortcutsBtn.addEventListener('click', () => {
        shortcutsModal.style.display = 'flex';
      });
    }

    if (closeModalBtn && shortcutsModal) {
      closeModalBtn.addEventListener('click', () => {
        shortcutsModal.style.display = 'none';
      });
    }

    if (shortcutsModal) {
      shortcutsModal.addEventListener('click', (e) => {
        if (e.target === shortcutsModal) {
          shortcutsModal.style.display = 'none';
        }
      });
    }

    // Modal de Changelog / Versiones
    const versionBadge = document.getElementById('app-version-badge');
    const changelogModal = document.getElementById('changelog-modal');
    const closeChangelogBtn = document.getElementById('btn-close-changelog');

    if (versionBadge && changelogModal) {
      versionBadge.addEventListener('click', () => {
        this.triggerHaptic();
        changelogModal.style.display = 'flex';
      });
    }

    if (closeChangelogBtn && changelogModal) {
      closeChangelogBtn.addEventListener('click', () => {
        changelogModal.style.display = 'none';
      });
    }

    if (changelogModal) {
      changelogModal.addEventListener('click', (e) => {
        if (e.target === changelogModal) {
          changelogModal.style.display = 'none';
        }
      });
    }

    // Tabs de navegación
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.triggerHaptic();
        this.switchTab(btn.dataset.tab);
      });
    });

    // Control animación radar
    const playBtn = document.getElementById('btn-radar-play');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const isPlaying = playRadarAnimation();
        playBtn.innerHTML = isPlaying ? '⏸️ Pausar' : '▶️ Reproducir Radar';
        playBtn.classList.toggle('active', isPlaying);
      });
    }

    // Control centrar mapa en Asturias
    const centerBtn = document.getElementById('btn-radar-center');
    if (centerBtn) {
      centerBtn.addEventListener('click', () => {
        resetMapCenter();
      });
    }
  }

  switchTab(targetTab) {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === targetTab);
    });
    document.querySelectorAll('.tab-panel').forEach(p => {
      p.classList.toggle('active', p.id === 'panel-' + targetTab);
    });

    this.activeTab = targetTab;
    window.location.hash = targetTab;

    if (targetTab === 'radar') {
      setTimeout(() => resizeMap(), 50);
    }

    if (targetTab === 'charts' && this.weatherData) {
      setTimeout(() => renderWeatherChart('meteo-chart-canvas', this.weatherData.weather.hourly, 48), 50);
    }
  }

  setupPwaInstall() {
    const installBtn = document.getElementById('btn-install-app');
    if (!installBtn) return;

    // Mostrar el botón siempre para permitir instalación directa o guiada
    installBtn.style.display = 'inline-flex';

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      installBtn.style.display = 'inline-flex';
    });

    installBtn.addEventListener('click', async () => {
      this.triggerHaptic();

      if (this.deferredInstallPrompt) {
        this.deferredInstallPrompt.prompt();
        const { outcome } = await this.deferredInstallPrompt.userChoice;
        if (outcome === 'accepted') {
          installBtn.style.display = 'none';
        }
        this.deferredInstallPrompt = null;
      } else {
        // Modal de ayuda para instalación según el dispositivo
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
          alert('📱 Para instalar en tu iPhone / iPad:\n\n1. Pulsa el botón "Compartir" de Safari (icono del cuadrado con flecha hacia arriba ⬆️).\n2. Desliza hacia abajo y selecciona "Añadir a pantalla de inicio" (➕).\n3. ¡Listo! Tendrás el icono de MeteoAstur Lode.');
        } else {
          alert('📱 Para instalar en tu teléfono Android:\n\n1. Pulsa en los 3 puntos de Chrome (⋮) en la esquina superior derecha.\n2. Toca en "Instalar aplicación" (o "Añadir a pantalla de inicio").\n3. ¡Listo! Se creará el acceso directo como una app independiente.');
        }
      }
    });

    window.addEventListener('appinstalled', () => {
      installBtn.style.display = 'none';
      console.log('[PWA] MeteoAstur Lode instalada con éxito.');
    });
  }

  setupKeyboardShortcuts() {
    const tabList = ['live', 'radar', 'marine', 'mountain', 'forecast', 'charts', 'glossary'];

    window.addEventListener('keydown', (e) => {
      // Ignorar si el usuario está escribiendo en un input o select
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();

      // Atajos de dígitos 1-7
      if (e.key >= '1' && e.key <= '7') {
        const index = parseInt(e.key, 10) - 1;
        if (tabList[index]) {
          this.switchTab(tabList[index]);
        }
      } else if (key === 'r') {
        this.loadWeather(this.currentConcejo.id);
      } else if (key === 'f') {
        this.prefs.favorites = toggleFavorite(this.currentConcejo.id);
        this.updateFavButton();
        this.renderFavoritePills();
      } else if (key === 'g') {
        this.locateUser();
      } else if (key === 's' || key === '/') {
        e.preventDefault();
        const select = document.getElementById('concejo-select');
        if (select) select.focus();
      } else if (key === 'k') {
        this.toggleFullscreen();
      } else if (e.key === 'Escape') {
        const shortcutsModal = document.getElementById('shortcuts-modal');
        if (shortcutsModal) shortcutsModal.style.display = 'none';
        const changelogModal = document.getElementById('changelog-modal');
        if (changelogModal) changelogModal.style.display = 'none';
      }
    });
  }

  setupLiveClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;

    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      clockEl.textContent = '🕒 ' + timeStr;
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  setupNetworkMonitor() {
    const statusEl = document.getElementById('network-status');
    if (!statusEl) return;

    const updateStatus = () => {
      if (navigator.onLine) {
        statusEl.className = 'network-badge online';
        statusEl.textContent = '🟢 En línea';
      } else {
        statusEl.className = 'network-badge offline';
        statusEl.textContent = '🔴 Modo Offline';
      }
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();
  }

  setupFullscreen() {
    const updateBtn = () => {
      const btn = document.getElementById('btn-fullscreen');
      if (!btn) return;
      const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement);
      btn.innerHTML = isFull ? '🗗 Ventana' : '🖥️ Completa';
      btn.title = isFull ? 'Volver a Modo Ventana (Tecla K / Esc)' : 'Ver en Pantalla Completa (Tecla K / F11)';
    };

    document.addEventListener('fullscreenchange', updateBtn);
    document.addEventListener('webkitfullscreenchange', updateBtn);
    updateBtn();

    // Intentar activar pantalla completa automáticamente en la primera interacción del usuario
    const autoFullscreenOnFirstInteraction = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen().catch(() => {});
        }
      }
      window.removeEventListener('click', autoFullscreenOnFirstInteraction);
      window.removeEventListener('touchstart', autoFullscreenOnFirstInteraction);
    };

    window.addEventListener('click', autoFullscreenOnFirstInteraction, { once: true });
    window.addEventListener('touchstart', autoFullscreenOnFirstInteraction, { once: true });
  }

  toggleFullscreen() {
    this.triggerHaptic();
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if (!isFull) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen().catch(() => {});
      }
    }
  }

  triggerHaptic() {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch (err) {}
    }
  }

  async switchConcejo(concejoId) {
    this.currentConcejo = getConcejoById(concejoId) || this.currentConcejo;
    this.prefs.lastConcejo = concejoId;
    savePreferences(this.prefs);

    this.renderConcejoDropdown();
    this.renderFavoritePills();
    this.updateFavButton();

    focusConcejoOnMap(this.currentConcejo.lat, this.currentConcejo.lon, this.currentConcejo.name);
    await this.loadWeather(concejoId);
  }

  updateFavButton() {
    const favBtn = document.getElementById('btn-toggle-fav');
    if (!favBtn) return;
    const fav = isFavorite(this.currentConcejo.id);
    favBtn.innerHTML = fav ? '⭐ Guardado' : '☆ Guardar';
    favBtn.classList.toggle('active', fav);
  }

  locateUser() {
    if (!navigator.geolocation) {
      alert('Tu dispositivo o navegador no soporta geolocalización.');
      return;
    }

    const gpsBtn = document.getElementById('btn-gps');
    if (gpsBtn) gpsBtn.textContent = '📍 Localizando...';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const closest = findClosestConcejo(pos.coords.latitude, pos.coords.longitude);
        if (gpsBtn) gpsBtn.textContent = '📍 GPS Localizado';
        this.switchConcejo(closest.id);
      },
      (err) => {
        alert('No se pudo obtener la ubicación GPS precisa.');
        if (gpsBtn) gpsBtn.textContent = '📍 Mi Ubicación';
      },
      { timeout: 8000 }
    );
  }

  async loadWeather(concejoId) {
    const concejo = getConcejoById(concejoId) || this.currentConcejo;
    const isCoast = concejo.type === 'coast';

    const livePanel = document.getElementById('panel-live');
    if (livePanel && !this.weatherData) {
      livePanel.innerHTML = '<div class="loading-state">🛰️ Conectando con los sensores de ' + concejo.name + '...</div>';
    }

    const res = await fetchWeatherData(concejo.lat, concejo.lon, isCoast);
    if (!res.success) {
      if (livePanel) livePanel.innerHTML = '<div class="error-state">⚠️ Error al cargar datos: ' + res.error + '</div>';
      return;
    }

    this.weatherData = res;
    this.renderAllComponents();

    const lastUpdated = document.getElementById('last-updated');
    if (lastUpdated) {
      lastUpdated.textContent = 'Actualizado: ' + new Date().toLocaleTimeString('es-ES');
    }
  }

  renderAllComponents() {
    if (!this.weatherData) return;

    // 1. Dashboard en Vivo
    const liveContainer = document.getElementById('panel-live');
    if (liveContainer) {
      liveContainer.innerHTML = renderCurrentWeather(this.weatherData, this.currentConcejo, this.prefs.units);
    }

    // 2. Módulo Marino
    const marineContainer = document.getElementById('panel-marine');
    if (marineContainer) {
      marineContainer.innerHTML = renderMarineCard(this.weatherData, this.currentConcejo);
    }

    // 3. Módulo Montaña
    const mountainContainer = document.getElementById('panel-mountain');
    if (mountainContainer) {
      mountainContainer.innerHTML = renderMountainCard(this.weatherData, this.currentConcejo);
    }

    // 4. Pronóstico
    const forecastContainer = document.getElementById('panel-forecast');
    if (forecastContainer) {
      forecastContainer.innerHTML = renderForecast(this.weatherData, this.prefs.units);
    }

    // 5. Gráfico si está activo
    if (this.activeTab === 'charts') {
      renderWeatherChart('meteo-chart-canvas', this.weatherData.weather.hourly, 48);
    }

    this.updateFavButton();
  }

  initParticleCanvas() {
    const canvas = document.getElementById('weather-particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      resizeMap();
    });

    const particles = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1 + Math.random() * 2,
        length: 8 + Math.random() * 12,
        opacity: 0.15 + Math.random() * 0.25
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1;

      particles.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - 2, p.y + p.length);
        ctx.stroke();

        p.y += p.speed;
        p.x -= 0.5;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }
}

// Iniciar aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  window.meteoApp = new MeteoAsturiasApp();
});
