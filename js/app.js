import { CONCEJOS_ASTURIAS, getConcejoById, findClosestConcejo } from './config/concejos.js';
import { fetchWeatherData } from './services/weatherApi.js';
import { getPreferences, savePreferences, toggleFavorite, isFavorite } from './utils/storage.js';
import { renderCurrentWeather } from './components/currentCard.js';
import { renderMarineCard } from './components/marineCard.js';
import { renderMountainCard } from './components/mountainCard.js';
import { renderForecast } from './components/forecastView.js';
import { renderWeatherChart } from './components/chartsView.js';
import { renderCompareView } from './components/compareView.js';
import { initAsturiasMap, playRadarAnimation, focusConcejoOnMap, resizeMap, resetMapCenter } from './components/mapRadar.js';

class MeteoAsturiasApp {
  constructor() {
    this.prefs = getPreferences();
    this.currentConcejo = getConcejoById(this.prefs.lastConcejo) || CONCEJOS_ASTURIAS[0];
    this.weatherData = null;
    this.compareConcejoB = getConcejoById(this.currentConcejo.id === 'gijon' ? 'oviedo' : 'gijon');
    this.compareWeatherDataB = null;
    this.activeTab = 'live';
    this.autoRefreshTimer = null;
    this.deferredInstallPrompt = null;
    
    this.init();
  }

  async init() {
    this.updateSearchTriggerDisplay();
    this.renderFavoritePills();
    this.setupEventListeners();
    this.setupQuickSearch();
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

    // Cargar datos de comparación iniciales
    this.loadCompareData(this.compareConcejoB.id);

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
      if (now - lastRefreshTime > 45 * 1000) {
        lastRefreshTime = now;
        console.log('[MeteoAstur] Reanudación detectada: actualizando datos del tiempo y versión...');
        this.loadWeather(this.currentConcejo.id);

        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistration().then(reg => {
            if (reg) reg.update();
          });
        }
      }
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        refreshIfStale();
      }
    });

    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        refreshIfStale();
      }
    });

    window.addEventListener('focus', () => {
      refreshIfStale();
    });
  }

  handleInitialHash() {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['live', 'radar', 'marine', 'mountain', 'forecast', 'charts', 'compare'];
    if (validTabs.includes(hash)) {
      this.switchTab(hash);
    }
  }

  updateSearchTriggerDisplay() {
    const el = document.getElementById('search-bar-current-name');
    if (el && this.currentConcejo) {
      el.innerHTML = `<span class="active-badge">${this.currentConcejo.badge}</span> <strong>${this.currentConcejo.name}</strong> <span class="active-meta">(${this.currentConcejo.altitude} m • ${this.currentConcejo.region})</span>`;
    }
  }

  renderFavoritePills() {
    const container = document.getElementById('favorites-pills');
    if (!container) return;

    if (!this.prefs.favorites || this.prefs.favorites.length === 0) {
      container.innerHTML = `<span class="fav-empty-hint">⭐ Pulsa "Guardar" para añadir tus concejos frecuentes</span>`;
      return;
    }

    container.innerHTML = this.prefs.favorites.map(id => {
      const concejo = getConcejoById(id);
      if (!concejo) return '';
      const isActive = concejo.id === this.currentConcejo.id;
      return `
        <button class="fav-pill ${isActive ? 'active' : ''}" data-id="${concejo.id}" title="Ver el tiempo en ${concejo.name}">
          <span class="fav-pill-badge">${concejo.badge}</span>
          <span>${concejo.name}</span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.fav-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.triggerHaptic();
        this.switchConcejo(btn.dataset.id);
      });
    });
  }

  setupEventListeners() {
    // Barra interactiva de búsqueda rápida
    const searchTrigger = document.getElementById('main-search-trigger');
    if (searchTrigger) {
      searchTrigger.addEventListener('click', () => {
        if (this.openSearchModal) this.openSearchModal();
      });
      searchTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (this.openSearchModal) this.openSearchModal();
        }
      });
    }

    // Botón Favorito
    const favBtn = document.getElementById('btn-toggle-fav');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.prefs.favorites = toggleFavorite(this.currentConcejo.id);
        this.updateFavButton();
        this.renderFavoritePills();
      });
    }

    // Botón GPS Ubicación
    const gpsBtn = document.getElementById('btn-gps');
    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.locateUser();
      });
    }

    // Botón Refrescar
    const refreshBtn = document.getElementById('btn-refresh');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.loadWeather(this.currentConcejo.id);
      });
    }

    // Selector de Unidades
    const unitBtn = document.getElementById('btn-unit-toggle');
    if (unitBtn) {
      unitBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.prefs.units = this.prefs.units === 'metric' ? 'knots' : 'metric';
        savePreferences(this.prefs);
        unitBtn.textContent = `Unidades: ${this.prefs.units === 'metric' ? 'km/h' : 'Nudos (kt)'}`;
        this.renderAllComponents();
      });
    }

    // Botón Pantalla Completa / Ventana
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        this.toggleFullscreen();
      });
    }

    // Modal de Atajos de Teclado
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

  setupQuickSearch() {
    const openSearchBtn = document.getElementById('btn-open-search');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('quick-search-input');
    const closeSearchBtn = document.getElementById('btn-close-search');
    const clearSearchBtn = document.getElementById('btn-clear-search');
    const resultsContainer = document.getElementById('search-results-container');

    if (!searchModal || !searchInput || !resultsContainer) return;

    const renderResults = (filterText = '') => {
      const query = filterText.toLowerCase().trim();
      const matched = CONCEJOS_ASTURIAS.filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.region.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query)
      );

      if (matched.length === 0) {
        resultsContainer.innerHTML = `<div class="search-empty">No se encontraron concejos para "<strong>${filterText}</strong>"</div>`;
        return;
      }

      resultsContainer.innerHTML = matched.map(c => {
        const isCurrent = c.id === this.currentConcejo.id;
        const isFav = isFavorite(c.id);
        return `
          <div class="search-item ${isCurrent ? 'selected' : ''}" data-id="${c.id}">
            <div class="search-item-left">
              <span class="search-badge">${c.badge}</span>
              <div class="search-info">
                <span class="search-name">${c.name}</span>
                <span class="search-region">${c.altitude} m • ${c.region}</span>
              </div>
            </div>
            <div class="search-item-right">
              ${isFav ? '<span class="search-fav-star">⭐</span>' : ''}
              <span class="search-arrow">➔</span>
            </div>
          </div>
        `;
      }).join('');

      resultsContainer.querySelectorAll('.search-item').forEach(item => {
        item.addEventListener('click', () => {
          this.triggerHaptic();
          this.switchConcejo(item.dataset.id);
          searchModal.style.display = 'none';
        });
      });
    };

    const openSearch = () => {
      this.triggerHaptic();
      searchModal.style.display = 'flex';
      searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      renderResults('');
      setTimeout(() => searchInput.focus(), 50);
    };

    if (openSearchBtn) {
      openSearchBtn.addEventListener('click', openSearch);
    }

    if (closeSearchBtn) {
      closeSearchBtn.addEventListener('click', () => {
        searchModal.style.display = 'none';
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        renderResults('');
        searchInput.focus();
      });
    }

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.style.display = 'none';
      }
    });

    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (clearSearchBtn) clearSearchBtn.style.display = val ? 'block' : 'none';
      renderResults(val);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const firstItem = resultsContainer.querySelector('.search-item');
        if (firstItem) {
          firstItem.click();
        }
      }
    });

    this.openSearchModal = openSearch;
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

    if (targetTab === 'compare') {
      this.renderCompareSection();
    }
  }

  setupPwaInstall() {
    const installBtn = document.getElementById('btn-install-app');
    if (!installBtn) return;

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
        const choiceResult = await this.deferredInstallPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          console.log('[PWA] Instalación aceptada');
          installBtn.style.display = 'none';
        }
        this.deferredInstallPrompt = null;
      } else {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
          alert('📱 Para instalar en tu iPhone/iPad:\n\n1. Pulsa el botón "Compartir" de Safari (el icono de cuadrado con flecha hacia arriba).\n2. Selecciona "Añadir a pantalla de inicio".');
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
    const tabList = ['live', 'radar', 'marine', 'mountain', 'forecast', 'charts', 'compare'];

    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();

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
        if (this.openSearchModal) this.openSearchModal();
      } else if (key === 'k') {
        this.toggleFullscreen();
      } else if (e.key === 'Escape') {
        const shortcutsModal = document.getElementById('shortcuts-modal');
        if (shortcutsModal) shortcutsModal.style.display = 'none';
        const changelogModal = document.getElementById('changelog-modal');
        if (changelogModal) changelogModal.style.display = 'none';
        const searchModal = document.getElementById('search-modal');
        if (searchModal) searchModal.style.display = 'none';
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

    const tryEnterFullscreen = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const el = document.documentElement;
        const requestMethod = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (requestMethod) {
          requestMethod.call(el).catch(() => {});
        }
      }
    };

    tryEnterFullscreen();

    const onUserInteraction = () => {
      tryEnterFullscreen();
      ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, onUserInteraction);
      });
    };

    ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
      window.addEventListener(evt, onUserInteraction, { passive: true });
    });
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

    this.updateSearchTriggerDisplay();
    this.renderFavoritePills();
    this.updateFavButton();

    focusConcejoOnMap(this.currentConcejo.lat, this.currentConcejo.lon, this.currentConcejo.name);
    await this.loadWeather(concejoId);

    // Si el concejo A cambió, refrescar comparador
    if (this.compareConcejoB && this.compareConcejoB.id === this.currentConcejo.id) {
      this.compareConcejoB = getConcejoById(this.currentConcejo.id === 'gijon' ? 'oviedo' : 'gijon');
      this.loadCompareData(this.compareConcejoB.id);
    } else {
      this.renderCompareSection();
    }
  }

  async loadCompareData(concejoBId) {
    this.compareConcejoB = getConcejoById(concejoBId) || this.compareConcejoB;
    const isCoast = this.compareConcejoB.type === 'coast' || this.compareConcejoB.region.includes('Costa');
    const result = await fetchWeatherData(this.compareConcejoB.lat, this.compareConcejoB.lon, isCoast);
    if (result.success) {
      this.compareWeatherDataB = result;
      this.renderCompareSection();
    }
  }

  renderCompareSection() {
    const compareContainer = document.getElementById('panel-compare');
    if (!compareContainer || !this.weatherData) return;

    compareContainer.innerHTML = renderCompareView(this.currentConcejo, this.weatherData, this.compareConcejoB, this.compareWeatherDataB);

    const selectB = document.getElementById('compare-select-b');
    if (selectB) {
      selectB.addEventListener('change', (e) => {
        this.loadCompareData(e.target.value);
      });
    }
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
        if (gpsBtn) gpsBtn.textContent = '📍 Mi Ubicación';
        if (closest) {
          this.switchConcejo(closest.id);
        }
      },
      (err) => {
        if (gpsBtn) gpsBtn.textContent = '📍 Mi Ubicación';
        alert('No pudimos acceder a tu ubicación GPS. Asegúrate de dar permisos de localización.');
      },
      { timeout: 8000 }
    );
  }

  async loadWeather(concejoId) {
    const concejo = getConcejoById(concejoId);
    if (!concejo) return;

    const isCoast = concejo.type === 'coast' || concejo.region.includes('Costa');
    const result = await fetchWeatherData(concejo.lat, concejo.lon, isCoast);

    if (result.success) {
      this.weatherData = result;
      this.renderAllComponents();
      this.updateLastUpdatedTime(result.timestamp);
    } else {
      console.error('Error cargando tiempo:', result.error);
    }
  }

  updateLastUpdatedTime(date) {
    const el = document.getElementById('last-updated');
    if (el) {
      el.textContent = `Actualizado: ${date.toLocaleTimeString('es-ES')}`;
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

    // 6. Comparador si está activo
    if (this.activeTab === 'compare') {
      this.renderCompareSection();
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
