import { CONCEJOS_ASTURIAS, getConcejoById, findClosestConcejo } from './config/concejos.js?v=1.1.61';
import { fetchWeatherData, WEATHER_MODELS, getModelById, getDefaultModel } from './services/weatherApi.js?v=1.1.61';
import { getPreferences, savePreferences, toggleFavorite, isFavorite, getCachedWeather, saveCachedWeather } from './utils/storage.js?v=1.1.61';
import { renderCurrentWeather } from './components/currentCard.js?v=1.1.61';
import { renderMarineCard, scrollTideChartToNow } from './components/marineCard.js?v=1.1.61';
import { renderSurfCard } from './components/surfCard.js?v=1.1.61';
import { renderRoutesCard } from './components/routesCard.js?v=1.1.61';
import { renderMountainCard } from './components/mountainCard.js?v=1.1.61';
import { renderForecast } from './components/forecastView.js?v=1.1.61';
import { renderWeatherChart } from './components/chartsView.js?v=1.1.61';
import { renderAstronomyView } from './components/astronomyCard.js?v=1.1.61';
import { initAsturiasMap, playRadarAnimation, focusConcejoOnMap, resizeMap, resetMapCenter } from './components/mapRadar.js?v=1.1.61';
import { getWeatherInfo } from './utils/weatherIcons.js?v=1.1.61';
import { getAsturWeatherSvg } from './utils/weatherAsturIcons.js?v=1.1.61';
import { getPixelWeatherSvg } from './utils/weatherPixelIcons.js?v=1.1.61';
import { getNeonWeatherSvg } from './utils/weatherNeonIcons.js?v=1.1.61';
import { getSketchWeatherSvg } from './utils/weatherSketchIcons.js?v=1.1.61';
import { getGlassWeatherSvg } from './utils/weatherGlassIcons.js?v=1.1.61';
import { getFuturoWeatherSvg } from './utils/weatherFuturoIcons.js?v=1.1.61';
import { getExplanationHtml, WEATHER_EXPLANATIONS } from './utils/weatherExplanations.js?v=1.1.61';
import { WEATHER_PHENOMENA, PHENOMENA_CATEGORIES } from './utils/weatherPhenomena.js?v=1.1.61';
import { WEBCAMS_ASTURIAS } from './utils/webcamsData.js?v=1.1.61';
import { initGyroGlass } from './utils/gyroGlass.js?v=1.1.61';
import { triggerSeismicRefresh } from './utils/seismicDetector.js?v=1.1.61';
import { openShareModal } from './utils/shareCardGenerator.js?v=1.1.61';
import { toggleWeatherSpeech, stopWeatherSpeech } from './utils/weatherSpeaker.js?v=1.1.61';

const APP_MODULES = [
  { id: 'live', icon: '📊', title: 'Estación en Vivo', desc: 'Sensores en tiempo real, pronóstico horario 72h y alertas', key: '1' },
  { id: 'charts', icon: '📈', title: 'Meteorología Gráfica', desc: 'Observatorio interactivo: curvas de temperatura, lluvia, viento, barómetro y más', key: '2' },
  { id: 'forecast', icon: '📅', title: 'Pronósticos', desc: 'Predicción extendida a 10 días con desglose mañana y tarde', key: '3' },
  { id: 'radar', icon: '📡', title: 'Radar Cantábrico', desc: 'Precipitación y tormentas en directo vía satélite RainViewer', key: '4' },
  { id: 'marine', icon: '🏖️', title: 'Playas & Mareas', desc: 'Mareógrafo 72h, fases lunares, estado de baño, bandera y calas', key: '5' },
  { id: 'surf', icon: '🏄‍♂️', title: 'Surf & Rompientes', desc: 'Swell, período, viento offshore/onshore, picos bautizados y fondos', key: '6' },
  { id: 'routes', icon: '🥾', title: 'Rutas & Senderismo', desc: 'Confort de marcha, índice de barro en sendas y catálogo de rutas asturianas', key: '7' },
  { id: 'mountain', icon: '🏔️', title: 'Cordillera & Nieve', desc: 'Estado de puertos de montaña, cota de nieve y esquí', key: '8' },
  { id: 'astronomy', icon: '🔭', title: 'Astronomía & Cosmos', desc: 'Eclipses, lluvias de estrellas, fases lunares y semáforo de visibilidad en Asturias', key: '9' }
];

export const CURRENT_APP_VERSION = '1.1.61';

class MeteoAsturiasApp {
  constructor() {
    this.prefs = getPreferences();
    this.currentConcejo = getConcejoById(this.prefs.lastConcejo) || CONCEJOS_ASTURIAS[0];
    this.currentModel = getModelById(this.prefs.model) || getDefaultModel();
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
    this.updateModelTriggerDisplay();
    this.renderFavoritesMenu();
    this.setupNavModal();
    this.setupIconThemesModal();
    this.setupModelModal();
    this.setupExplainModal();
    this.setupPhenomenaModal();
    this.setupWebcamsModal();
    this.setupAutoLocationModal();
    this.updateGpsButtonDisplay();
    this.setupEventListeners();
    this.setupQuickSearch();
    this.setupPwaInstall();
    this.setupKeyboardShortcuts();
    this.setupSwipeNavigation();
    this.setupLiveClock();
    this.setupNetworkMonitor();
    initGyroGlass();
    this.setupFullscreen();
    this.initParticleCanvas();

    // Auto-apertura inmediata del modal de Novedades si hay nueva versión (Doctrina Constitucional 13)
    this.checkChangelogAutoPrompt();
    this.checkAutoLocationPrompt();

    // 1. Carga instantánea desde caché local (0 ms) para que los botones y tarjetas aparezcan de inmediato
    const cached = getCachedWeather(this.currentConcejo.id, this.currentModel.id);
    if (cached) {
      this.weatherData = cached;
      this.renderAllComponents();
      this.updateLastUpdatedTime(cached.timestamp);
    } else {
      this.renderSkeletonLoading();
    }

    // Comprobar si se abrió desde un acceso directo PWA (hash URL)
    this.handleInitialHash();

    // Auto-ubicación inteligente silenciosa al iniciar si está activada
    if (this.prefs.autoLocation === true) {
      this.locateUser({ silent: true });
    }

    // Cargar datos actualizados en segundo plano/red
    await this.loadWeather(this.currentConcejo.id);




    // Inicializar mapa Leaflet
    try {
      initAsturiasMap('map-container', (concejoId) => {
        this.switchConcejo(concejoId);
      });
      if (this.currentConcejo) {
        focusConcejoOnMap(this.currentConcejo.lat, this.currentConcejo.lon, this.currentConcejo.name);
      }
    } catch (e) {
      console.warn('[MeteoAstur] Error inicializando mapa:', e);
    }


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

        if (this.prefs.autoLocation === true) {
          this.locateUser({ silent: true });
        }

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
    const validTabs = APP_MODULES.map(m => m.id);
    if (validTabs.includes(hash)) {
      this.switchTab(hash);
    }
  }

  updateSearchTriggerDisplay() {
    const el = document.getElementById('search-bar-current-name');
    if (el && this.currentConcejo) {
      el.innerHTML = `<strong>${this.currentConcejo.name}</strong>`;
    }
  }

  updateModelTriggerDisplay() {
    const iconEl = document.getElementById('current-model-icon');
    if (iconEl && this.currentModel) iconEl.textContent = this.currentModel.flag;
  }

  renderFavoritesMenu() {
    const labelEl = document.getElementById('fav-btn-label');
    const modalList = document.getElementById('favorites-modal-list');
    const count = this.prefs.favorites ? this.prefs.favorites.length : 0;

    if (labelEl) {
      labelEl.textContent = `Favs (${count})`;
    }

    if (!modalList) return;

    if (count === 0) {
      modalList.innerHTML = `<div class="fav-modal-empty">No tienes concejos favoritos guardados todavía.<br><br>Pulsa en <strong>⭐ Guardar</strong> en cualquier localidad para tenerla siempre a mano aquí.</div>`;
      return;
    }

    modalList.innerHTML = this.prefs.favorites.map(id => {
      const concejo = getConcejoById(id);
      if (!concejo) return '';
      const isActive = concejo.id === this.currentConcejo.id;
      return `
        <div class="fav-modal-item ${isActive ? 'active' : ''}" data-id="${concejo.id}">
          <div class="fav-modal-item-left">
            <span class="fav-modal-item-badge">${concejo.badge}</span>
            <div class="fav-modal-item-info">
              <span class="fav-modal-item-name">${concejo.name}</span>
              <span class="fav-modal-item-meta">${concejo.altitude} m • ${concejo.region}</span>
            </div>
          </div>
          <button class="fav-modal-remove-btn" data-remove-id="${concejo.id}" title="Quitar de favoritos">🗑️ Quitar</button>
        </div>
      `;
    }).join('');

    const favModal = document.getElementById('favorites-modal');

    modalList.querySelectorAll('.fav-modal-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('fav-modal-remove-btn')) return;
        this.triggerHaptic();
        this.switchConcejo(item.dataset.id);
        if (favModal) favModal.style.display = 'none';
      });
    });

    modalList.querySelectorAll('.fav-modal-remove-btn').forEach(btnRemove => {
      btnRemove.addEventListener('click', (e) => {
        e.stopPropagation();
        this.triggerHaptic();
        this.prefs.favorites = toggleFavorite(btnRemove.dataset.removeId);
        this.updateFavButton();
        this.renderFavoritesMenu();
      });
    });
  }

  openModal(modal) {
    if (!modal) return;
    this.closeAllModals(false);
    modal.style.display = 'flex';
    try {
      history.pushState({ modalOpen: true, modalId: modal.id }, '');
    } catch (e) {}
  }

  closeModal(modal) {
    if (!modal || modal.style.display === 'none') return;
    modal.style.display = 'none';
    if (modal.id === 'changelog-modal') {
      try {
        localStorage.setItem('meteoastur_changelog_seen', CURRENT_APP_VERSION);
      } catch (e) {}
      if (this.prefs.autoLocation === null || this.prefs.autoLocation === undefined) {
        setTimeout(() => {
          this.promptAutoLocation();
        }, 400);
      }
    }
    if (history.state?.modalOpen) {
      try {
        history.back();
      } catch (e) {}
    }
  }

  closeAllModals(cleanHistory = true) {
    const modals = document.querySelectorAll('.modal-overlay');
    let anyOpen = false;
    modals.forEach(m => {
      if (m.style.display === 'flex') {
        m.style.display = 'none';
        anyOpen = true;
      }
    });
    if (cleanHistory && anyOpen && history.state?.modalOpen) {
      try {
        history.back();
      } catch (e) {}
    }
  }

  setupEventListeners() {
    // Sistema interactivo universal de ondas táctiles (Ripple Effect)
    document.addEventListener('pointerdown', (e) => {
      const targetBtn = e.target.closest('.btn-header, .section-nav-trigger, .model-nav-trigger, .search-trigger-card, .fav-trigger-card, .btn-close, .version-badge-footer, .nav-module-card, .model-module-card, .hourly-card, .daily-card-rich, .fav-modal-remove-btn');
      if (!targetBtn) return;
      
      const rect = targetBtn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.5;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const ripple = document.createElement('span');
      ripple.className = 'touch-ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      targetBtn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });

    // Soporte para botón o gesto "Atrás" de Android / Navegador
    window.addEventListener('popstate', (e) => {
      if (e.state?.modalOpen) return;
      const modals = document.querySelectorAll('.modal-overlay');
      modals.forEach(m => {
        if (m.style.display === 'flex') {
          m.style.display = 'none';
          if (m.id === 'changelog-modal') {
            try {
              localStorage.setItem('meteoastur_changelog_seen', CURRENT_APP_VERSION);
            } catch (err) {}
          }
        }
      });
    });

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
        this.renderFavoritesMenu();
      });
    }

    // Modal de Favoritos
    const favMenuBtn = document.getElementById('btn-favorites-menu');
    const favModal = document.getElementById('favorites-modal');
    const closeFavBtn = document.getElementById('btn-close-favorites');

    if (favMenuBtn && favModal) {
      favMenuBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.renderFavoritesMenu();
        this.openModal(favModal);
      });
    }

    if (closeFavBtn && favModal) {
      closeFavBtn.addEventListener('click', () => {
        this.closeModal(favModal);
      });
    }

    if (favModal) {
      favModal.addEventListener('click', (e) => {
        if (e.target === favModal) {
          this.closeModal(favModal);
        }
      });
    }

    // Botón GPS Ubicación
    const gpsBtn = document.getElementById('btn-gps');
    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.locateUser({ silent: false });
      });
    }

    // Botón Pantalla Completa / Ventana
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        this.toggleFullscreen();
      });
    }

    // Botón y Modal de Estampa Compartible ("MeteoAstur Instant")
    const shareCardBtn = document.getElementById('btn-share-card');
    const shareModal = document.getElementById('share-card-modal');
    const closeShareModalBtn = document.getElementById('btn-close-share-modal');

    const handleOpenShare = () => {
      this.triggerHaptic();
      if (this.currentConcejo && this.weatherData) {
        openShareModal(this.currentConcejo, this.weatherData);
      }
    };

    if (shareCardBtn) {
      shareCardBtn.addEventListener('click', handleOpenShare);
    }

    if (closeShareModalBtn && shareModal) {
      closeShareModalBtn.addEventListener('click', () => {
        this.closeModal(shareModal);
      });
    }

    if (shareModal) {
      shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) {
          this.closeModal(shareModal);
        }
      });
    }

    // Delegación de clic para botones de compartir (ej. en Hero Card)
    document.addEventListener('click', (e) => {
      const shareTrigger = e.target.closest('.btn-open-share-card');
      if (shareTrigger) {
        e.preventDefault();
        handleOpenShare();
      }
    });

    // Delegación de clic para botón de audio locución en Hero Card
    document.addEventListener('click', (e) => {
      const audioTrigger = e.target.closest('.btn-hero-audio');
      if (audioTrigger) {
        e.preventDefault();
        this.triggerHaptic();
        if (this.currentConcejo && this.weatherData) {
          toggleWeatherSpeech(this.currentConcejo, this.weatherData);
        }
      }
    });

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
          this.closeModal(shortcutsModal);
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
        this.openModal(changelogModal);
      });
    }

    if (closeChangelogBtn && changelogModal) {
      closeChangelogBtn.addEventListener('click', () => {
        this.closeModal(changelogModal);
      });
    }

    if (changelogModal) {
      changelogModal.addEventListener('click', (e) => {
        if (e.target === changelogModal) {
          this.closeModal(changelogModal);
        }
      });
    }

    // Delegación global de botones de apertura de Webcams (playas y montaña)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-open-webcams-beach, .btn-open-webcams-mountain');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const cat = btn.dataset.webcamCat || 'playas';
        if (this.openWebcamsModal) {
          this.openWebcamsModal(cat);
        }
      }
    });

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

  checkChangelogAutoPrompt() {
    const CURRENT_CHANGELOG_VERSION = CURRENT_APP_VERSION;
    const STORAGE_KEY = 'meteoastur_changelog_seen';
    try {
      const lastSeen = localStorage.getItem(STORAGE_KEY);
      if (lastSeen !== CURRENT_CHANGELOG_VERSION) {
        const changelogModal = document.getElementById('changelog-modal');
        if (changelogModal) {
          setTimeout(() => {
            // Mostrar modal directamente sin alterar historial en el arranque para evitar que popstate lo cierre
            changelogModal.style.display = 'flex';
          }, 400);
        }
      }
    } catch (e) {
      console.warn('[MeteoAstur] No se pudo verificar versión del changelog en almacenamiento local:', e);
    }
  }

  checkAutoLocationPrompt() {
    if (this.prefs.autoLocation !== null && this.prefs.autoLocation !== undefined) return;
    const STORAGE_KEY = 'meteoastur_changelog_seen';
    try {
      const lastSeen = localStorage.getItem(STORAGE_KEY);
      if (lastSeen !== CURRENT_APP_VERSION) {
        // El changelog modal saltará primero; lo encadenamos al cerrarlo para no solapar modales
        return;
      }
    } catch (e) {}

    // Si ya vio el changelog o no saltó, mostrar prompt de auto-ubicación tras breve retardo
    setTimeout(() => {
      this.promptAutoLocation();
    }, 600);
  }

  promptAutoLocation() {
    const modal = document.getElementById('autolocation-modal');
    if (!modal || modal.style.display === 'flex') return;
    this.openModal(modal);
  }

  setupAutoLocationModal() {
    const modal = document.getElementById('autolocation-modal');
    const closeBtn = document.getElementById('btn-close-autolocation');
    const enableBtn = document.getElementById('btn-enable-autolocation');
    const disableBtn = document.getElementById('btn-disable-autolocation');

    if (!modal) return;

    if (enableBtn) {
      enableBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.prefs.autoLocation = true;
        savePreferences(this.prefs);
        this.updateGpsButtonDisplay();
        this.updateNavAutoLocationBadge();
        this.closeModal(modal);
        // Solicitar GPS de inmediato para situar al usuario
        this.locateUser({ silent: false });
      });
    }

    if (disableBtn) {
      disableBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.prefs.autoLocation = false;
        savePreferences(this.prefs);
        this.updateGpsButtonDisplay();
        this.updateNavAutoLocationBadge();
        this.closeModal(modal);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        if (this.prefs.autoLocation === null || this.prefs.autoLocation === undefined) {
          this.prefs.autoLocation = false;
          savePreferences(this.prefs);
          this.updateGpsButtonDisplay();
          this.updateNavAutoLocationBadge();
        }
        this.closeModal(modal);
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        if (this.prefs.autoLocation === null || this.prefs.autoLocation === undefined) {
          this.prefs.autoLocation = false;
          savePreferences(this.prefs);
          this.updateGpsButtonDisplay();
          this.updateNavAutoLocationBadge();
        }
        this.closeModal(modal);
      }
    });
  }

  updateGpsButtonDisplay() {
    const gpsBtn = document.getElementById('btn-gps');
    const gpsLabel = document.getElementById('gps-btn-label');
    if (!gpsBtn) return;

    const isAuto = this.prefs.autoLocation === true;
    gpsBtn.classList.toggle('auto-active', isAuto);

    if (gpsLabel) {
      gpsLabel.textContent = isAuto ? 'Auto GPS' : 'GPS';
    }
    gpsBtn.title = isAuto 
      ? 'Auto-Ubicación Activa: Detecta tu concejo en Asturias al abrir o reanudar. Toca para forzar GPS ahora.'
      : 'Localizar por GPS (Tecla G)';
  }

  updateNavAutoLocationBadge() {
    const textEl = document.getElementById('nav-autoloc-text');
    const iconEl = document.getElementById('nav-autoloc-icon');
    const isAuto = this.prefs.autoLocation === true;
    if (textEl) {
      textEl.innerHTML = `Auto-GPS: <strong>${isAuto ? 'Sí' : 'No'}</strong>`;
    }
    if (iconEl) {
      iconEl.textContent = isAuto ? '📍' : '📌';
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
      const normalize = (str) => String(str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      const query = normalize(filterText);
      
      const matched = CONCEJOS_ASTURIAS.filter(c => 
        normalize(c.name).includes(query) || 
        normalize(c.region).includes(query) ||
        normalize(c.badge).includes(query) ||
        normalize(c.id).includes(query)
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
          this.closeModal(searchModal);
        });
      });
    };

    const openSearch = () => {
      this.triggerHaptic();
      this.openModal(searchModal);
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
        this.closeModal(searchModal);
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
        this.closeModal(searchModal);
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

  setupModelModal() {
    const triggerBtn = document.getElementById('btn-open-model-modal');
    const modal = document.getElementById('model-modal');
    const closeBtn = document.getElementById('btn-close-model');
    const grid = document.getElementById('model-modal-grid');

    if (!modal || !grid) return;

    const renderModelItems = () => {
      grid.innerHTML = WEATHER_MODELS.map(m => {
        const isActive = m.id === this.currentModel.id;
        return `
          <div class="model-module-card ${isActive ? 'active' : ''}" data-model-id="${m.id}">
            <div style="display: flex; gap: 14px; align-items: flex-start; width: 100%; min-width: 0;">
              <span style="font-size: 1.6rem; line-height: 1; flex-shrink: 0;">${m.flag}</span>
              <div style="display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0;">
                <div class="model-module-header-row">
                  <span class="model-module-name">${m.name}</span>
                  <span class="model-tag-pill">${m.resolution}</span>
                  ${m.tag ? `<span class="model-tag-pill" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);">${m.tag}</span>` : ''}
                </div>
                <span class="model-module-agency">${m.agency}</span>
                <span class="model-module-desc">${m.description}</span>
                <span class="model-module-ideal">🎯 ${m.bestFor}</span>
              </div>
            </div>
            ${isActive ? '<span class="model-module-check">✓</span>' : ''}
          </div>
        `;
      }).join('');

      grid.querySelectorAll('.model-module-card').forEach(card => {
        card.addEventListener('click', () => {
          this.triggerHaptic();
          this.switchModel(card.dataset.modelId);
          this.closeModal(modal);
        });
      });
    };

    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        this.triggerHaptic();
        renderModelItems();
        this.openModal(modal);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal(modal);
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });
  }

  async switchModel(modelId) {
    const selected = getModelById(modelId);
    if (!selected) return;

    this.currentModel = selected;
    this.prefs.model = selected.id;
    savePreferences(this.prefs);

    this.updateModelTriggerDisplay();

    // Recargar datos meteorológicos inmediatamente con el nuevo modelo
    await this.loadWeather(this.currentConcejo.id);
    if (this.compareConcejoB) {
      this.loadCompareData(this.compareConcejoB.id);
    }
  }

  setupNavModal() {
    const triggerBtn = document.getElementById('btn-open-nav-modal');
    const modal = document.getElementById('nav-modal');
    const closeBtn = document.getElementById('btn-close-nav');
    const grid = document.getElementById('nav-modal-grid');
    const badgeTheme = document.getElementById('badge-active-icon-theme');

    if (!modal || !grid) return;

    const updateNavHeaderThemeBadge = () => {
      if (badgeTheme) {
        const theme = this.prefs.iconTheme || 'classic';
        const themeNames = {
          classic: '📱 Emojis Clásicos',
          astur: '🎭 Emojis Emotivos',
          futuroClasico: '✨ Futuro Clásico',
          futuro: '✨ Futuro Clásico',
          tesla: '✨ Futuro Clásico',
          glass: '💎 Liquid Glass 3D',
          pixel: '👾 Pixel Art Retro',
          neon: '✨ Minimalista Neón',
          sketch: '✏️ Dibujo a Mano'
        };
        badgeTheme.textContent = themeNames[theme] || '📱 Emojis Clásicos';
      }
    };

    const renderNavItems = () => {
      updateNavHeaderThemeBadge();
      this.updateNavAutoLocationBadge();
      grid.innerHTML = APP_MODULES.map(m => {
        const isActive = m.id === this.activeTab;
        return `
          <div class="nav-module-card ${isActive ? 'active' : ''}" data-tab="${m.id}">
            <div class="nav-module-card-left">
              <span class="nav-module-icon">${m.icon}</span>
              <div class="nav-module-details">
                <div class="nav-module-title-row">
                  <span class="nav-module-name">${m.title}</span>
                </div>
                <span class="nav-module-desc">${m.desc}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      grid.querySelectorAll('.nav-module-card').forEach(card => {
        card.addEventListener('click', () => {
          this.triggerHaptic();
          this.switchTab(card.dataset.tab);
          this.closeModal(modal);
        });
      });
    };

    const toggleAutoLocBtn = document.getElementById('btn-toggle-autolocation-nav');
    if (toggleAutoLocBtn) {
      toggleAutoLocBtn.addEventListener('click', () => {
        this.triggerHaptic();
        this.prefs.autoLocation = !this.prefs.autoLocation;
        savePreferences(this.prefs);
        this.updateGpsButtonDisplay();
        this.updateNavAutoLocationBadge();
        if (this.prefs.autoLocation) {
          this.locateUser({ silent: false });
        }
      });
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        this.triggerHaptic();
        renderNavItems();
        this.openModal(modal);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal(modal);
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });

    this.renderNavItems = renderNavItems;
    this.updateNavHeaderThemeBadge = updateNavHeaderThemeBadge;
  }

  setupIconThemesModal() {
    const triggerBtn = document.getElementById('btn-open-icon-themes');
    const modal = document.getElementById('icon-themes-modal');
    const closeBtn = document.getElementById('btn-close-icon-themes');

    const previewComic = document.getElementById('preview-comic-icons');
    const previewFuturo = document.getElementById('preview-futuro-icons');
    const previewGlass = document.getElementById('preview-glass-icons');
    const previewPixel = document.getElementById('preview-pixel-icons');
    const previewNeon = document.getElementById('preview-neon-icons');
    const previewSketch = document.getElementById('preview-sketch-icons');

    if (!modal) return;

    // Renderizar miniaturas SVG dinámicas para cada colección (incluyendo los 4 escenarios de sol/nubes/resol)
    if (previewComic) {
      previewComic.innerHTML = `
        <span class="preview-svg" title="Soleado">${getAsturWeatherSvg('sun', 28)}</span>
        <span class="preview-svg" title="Mayormente soleado">${getAsturWeatherSvg('mostly-clear-day', 28)}</span>
        <span class="preview-svg" title="Nubes y claros">${getAsturWeatherSvg('partly-cloudy-day', 28)}</span>
        <span class="preview-svg" title="Resol / Sol tamizáu">${getAsturWeatherSvg('resol', 28)}</span>
        <span class="preview-svg" title="Nublado">${getAsturWeatherSvg('cloud', 28)}</span>
        <span class="preview-svg" title="Lluvia">${getAsturWeatherSvg('rain', 28)}</span>
      `;
    }

    if (previewFuturo) {
      previewFuturo.innerHTML = `
        <span class="preview-svg" title="Soleado">${getFuturoWeatherSvg('sun', 28)}</span>
        <span class="preview-svg" title="Mayormente soleado">${getFuturoWeatherSvg('mostly-clear-day', 28)}</span>
        <span class="preview-svg" title="Nubes y claros">${getFuturoWeatherSvg('partly-cloudy-day', 28)}</span>
        <span class="preview-svg" title="Resol / Sol tamizáu">${getFuturoWeatherSvg('resol', 28)}</span>
        <span class="preview-svg" title="Nublado">${getFuturoWeatherSvg('cloud', 28)}</span>
        <span class="preview-svg" title="Lluvia">${getFuturoWeatherSvg('rain', 28)}</span>
      `;
    }

    if (previewGlass) {
      previewGlass.innerHTML = `
        <span class="preview-svg" title="Soleado">${getGlassWeatherSvg('sun', 28)}</span>
        <span class="preview-svg" title="Mayormente soleado">${getGlassWeatherSvg('mostly-clear-day', 28)}</span>
        <span class="preview-svg" title="Nubes y claros">${getGlassWeatherSvg('partly-cloudy-day', 28)}</span>
        <span class="preview-svg" title="Resol / Sol tamizáu">${getGlassWeatherSvg('resol', 28)}</span>
        <span class="preview-svg" title="Nublado">${getGlassWeatherSvg('cloud', 28)}</span>
        <span class="preview-svg" title="Lluvia">${getGlassWeatherSvg('rain', 28)}</span>
      `;
    }

    if (previewPixel) {
      previewPixel.innerHTML = `
        <span class="preview-svg" title="Soleado">${getPixelWeatherSvg('sun', 28)}</span>
        <span class="preview-svg" title="Mayormente soleado">${getPixelWeatherSvg('mostly-clear-day', 28)}</span>
        <span class="preview-svg" title="Nubes y claros">${getPixelWeatherSvg('partly-cloudy-day', 28)}</span>
        <span class="preview-svg" title="Resol / Sol tamizáu">${getPixelWeatherSvg('resol', 28)}</span>
        <span class="preview-svg" title="Nublado">${getPixelWeatherSvg('cloud', 28)}</span>
        <span class="preview-svg" title="Lluvia">${getPixelWeatherSvg('rain', 28)}</span>
      `;
    }

    if (previewNeon) {
      previewNeon.innerHTML = `
        <span class="preview-svg" title="Soleado">${getNeonWeatherSvg('sun', 28)}</span>
        <span class="preview-svg" title="Mayormente soleado">${getNeonWeatherSvg('mostly-clear-day', 28)}</span>
        <span class="preview-svg" title="Nubes y claros">${getNeonWeatherSvg('partly-cloudy-day', 28)}</span>
        <span class="preview-svg" title="Resol / Sol tamizáu">${getNeonWeatherSvg('resol', 28)}</span>
        <span class="preview-svg" title="Nublado">${getNeonWeatherSvg('cloud', 28)}</span>
        <span class="preview-svg" title="Lluvia">${getNeonWeatherSvg('rain', 28)}</span>
      `;
    }

    if (previewSketch) {
      previewSketch.innerHTML = `
        <span class="preview-svg" title="Soleado">${getSketchWeatherSvg('sun', 28)}</span>
        <span class="preview-svg" title="Mayormente soleado">${getSketchWeatherSvg('mostly-clear-day', 28)}</span>
        <span class="preview-svg" title="Nubes y claros">${getSketchWeatherSvg('partly-cloudy-day', 28)}</span>
        <span class="preview-svg" title="Resol / Sol tamizáu">${getSketchWeatherSvg('resol', 28)}</span>
        <span class="preview-svg" title="Nublado">${getSketchWeatherSvg('cloud', 28)}</span>
        <span class="preview-svg" title="Lluvia">${getSketchWeatherSvg('rain', 28)}</span>
      `;
    }

    const updateActiveThemeCards = () => {
      const currentTheme = this.prefs.iconTheme || 'astur';
      modal.querySelectorAll('.icon-theme-card').forEach(card => {
        const theme = card.dataset.theme;
        card.classList.toggle('active', theme === currentTheme);
      });
      if (this.updateNavHeaderThemeBadge) this.updateNavHeaderThemeBadge();
    };

    const selectTheme = (themeId) => {
      this.triggerHaptic();
      try {
        localStorage.setItem('meteoastur_explicit_theme', 'true');
      } catch (e) {}
      this.prefs.iconTheme = themeId;
      savePreferences(this.prefs);
      updateActiveThemeCards();
      this.renderAllComponents();
      this.closeModal(modal);
    };

    modal.querySelectorAll('.icon-theme-card').forEach(card => {
      card.addEventListener('click', () => {
        const theme = card.dataset.theme;
        if (theme) selectTheme(theme);
      });
    });

    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        this.triggerHaptic();
        updateActiveThemeCards();
        this.openModal(modal);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal(modal);
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });

    updateActiveThemeCards();
  }

  setupExplainModal() {
    const modal = document.getElementById('explain-modal');
    const closeBtn = document.getElementById('btn-close-explain');
    const titleEl = document.getElementById('explain-modal-title');
    const subtitleEl = document.getElementById('explain-modal-subtitle');
    const contentEl = document.getElementById('explain-modal-content');

    if (!modal) return;

    // Delegación global de evento para cualquier botón didáctico en la app
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-explain-sensor, .btn-explain-sensor-compact, .btn-explain-clima, .climatology-badge, [data-explain]');
      if (!btn) return;

      this.triggerHaptic();
      const topicKey = btn.dataset.explain || 'barometer';
      const topic = WEATHER_EXPLANATIONS[topicKey] || WEATHER_EXPLANATIONS.barometer;

      if (titleEl) titleEl.innerHTML = `💡 ${topic.title}`;
      if (subtitleEl) subtitleEl.textContent = topic.subtitle;
      if (contentEl) contentEl.innerHTML = getExplanationHtml(topicKey);

      this.openModal(modal);
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal(modal);
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });

    // Enlace directo desde las explicaciones hacia el Diccionario de Fenómenos
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.link-open-phenomena');
      if (!link) return;
      e.preventDefault();
      e.stopPropagation();
      const targetId = link.dataset.phenomenon || null;
      if (this.openPhenomenaModal) {
        this.openPhenomenaModal(targetId);
      }
    });

    // Acceso directo al Radar Cantábrico desde el banner de tormenta
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-radar-shortcut');
      if (!btn) return;
      e.preventDefault();
      this.triggerHaptic();
      this.switchTab('radar');
    });

    // Delegación global para interruptor deslizante segmentado de previsión de surf (Horario 3h vs Extendido 7 Días)
    document.addEventListener('click', (e) => {
      const switchOption = e.target.closest('.surf-switch-option');
      if (!switchOption) return;

      this.triggerHaptic();
      const targetTab = switchOption.dataset.surfTab;
      const segmentedSwitch = document.getElementById('surf-segmented-switch');
      if (segmentedSwitch) {
        segmentedSwitch.dataset.active = targetTab;
      }

      document.querySelectorAll('.surf-switch-option').forEach(b => b.classList.remove('active'));
      switchOption.classList.add('active');

      const timelineView = document.getElementById('surf-timeline-view');
      const dailyView = document.getElementById('surf-daily-view');
      if (timelineView && dailyView) {
        if (targetTab === 'daily') {
          timelineView.style.display = 'none';
          dailyView.style.display = 'block';
        } else {
          timelineView.style.display = 'block';
          dailyView.style.display = 'none';
        }
      }
    });

    // Delegación global para interruptor deslizante de Cordillera (Estaciones & Esquí vs Puertos & Carreteras)
    document.addEventListener('click', (e) => {
      const switchOption = e.target.closest('.mountain-switch-option');
      if (!switchOption) return;

      this.triggerHaptic();
      const targetTab = switchOption.dataset.mountainTab;
      const segmentedSwitch = document.getElementById('mountain-segmented-switch');
      if (segmentedSwitch) {
        segmentedSwitch.dataset.active = targetTab;
      }

      document.querySelectorAll('.mountain-switch-option').forEach(b => b.classList.remove('active'));
      switchOption.classList.add('active');

      const skiView = document.getElementById('mountain-ski-view');
      const passesView = document.getElementById('mountain-passes-view');
      if (skiView && passesView) {
        if (targetTab === 'passes') {
          skiView.style.display = 'none';
          passesView.style.display = 'block';
        } else {
          skiView.style.display = 'block';
          passesView.style.display = 'none';
        }
      }
    });

    // Delegación global para selector de Estaciones de Esquí (Pills/Chips)
    document.addEventListener('click', (e) => {
      const resortPill = e.target.closest('.resort-select-pill');
      if (!resortPill) return;

      this.triggerHaptic();
      const resortId = resortPill.dataset.resortId;

      document.querySelectorAll('.resort-select-pill').forEach(b => b.classList.remove('active'));
      resortPill.classList.add('active');

      document.querySelectorAll('.resort-forecast-card').forEach(card => {
        const isMatch = card.id === `resort-panel-${resortId}`;
        card.style.display = isMatch ? 'flex' : 'none';
        if (isMatch) card.classList.add('active');
        else card.classList.remove('active');
      });
    });
  }

  setupPhenomenaModal() {
    const modal = document.getElementById('phenomena-modal');
    const closeBtn = document.getElementById('btn-close-phenomena');
    const listContainer = document.getElementById('phenomena-list-container');
    const triggerInNav = document.getElementById('btn-open-phenomena');
    const triggerInRadar = document.getElementById('btn-radar-phenomena');

    if (!modal || !listContainer) return;

    let expandedId = null;

    // Renderizado directo de las tarjetas con acordeón interactivo
    const renderList = () => {
      listContainer.innerHTML = WEATHER_PHENOMENA.map(p => {
        const isExpanded = p.id === expandedId;
        return `
          <div class="phenomena-card ${isExpanded ? 'expanded' : ''}" id="phenomenon-card-${p.id}" data-id="${p.id}">
            <div class="phenomena-header">
              <div class="phenomena-header-left">
                <span class="phenomena-icon">${p.icon}</span>
                <div class="phenomena-header-info">
                  <div class="phenomena-title-row">
                    <h4 class="phenomena-title">${p.title}</h4>
                    <span class="phenomena-tag">${p.tag}</span>
                  </div>
                  <p class="phenomena-summary">${p.summary}</p>
                </div>
              </div>
              <span class="phenomena-chevron">▶</span>
            </div>
            <div class="phenomena-details">
              <div class="phenomena-section-box">
                <h5 class="phenomena-section-title">💡 ¿Qué es exactamente?</h5>
                <div class="phenomena-section-body">${p.whatIs}</div>
              </div>
              <div class="phenomena-section-box">
                <h5 class="phenomena-section-title">⚙️ ¿Cómo se forma?</h5>
                <div class="phenomena-section-body">${p.howItForms}</div>
              </div>
              <div class="phenomena-section-box">
                <h5 class="phenomena-section-title">🏔️ ¿Qué tiempo deja en Asturias?</h5>
                <div class="phenomena-section-body">${p.asturiasEffect}</div>
              </div>
              <div class="phenomena-section-box">
                <h5 class="phenomena-section-title">🔍 Astucia y Curiosidad</h5>
                <div class="phenomena-section-body">${p.curiosity}</div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Delegación de eventos para acordeón al hacer clic en el encabezado
      listContainer.querySelectorAll('.phenomena-header').forEach(header => {
        header.addEventListener('click', () => {
          this.triggerHaptic();
          const card = header.closest('.phenomena-card');
          const id = card.dataset.id;
          expandedId = expandedId === id ? null : id;
          renderList();
          if (expandedId) {
            const el = document.getElementById(`phenomenon-card-${expandedId}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      });
    };

    // Función de apertura unificada (puede abrir con un fenómeno preseleccionado)
    const openPhenomena = (targetId = null) => {
      this.triggerHaptic();
      expandedId = targetId || null; // Todas cerradas por defecto salvo que se pase una específica
      renderList();
      this.openModal(modal);
      if (expandedId) {
        setTimeout(() => {
          const el = document.getElementById(`phenomenon-card-${expandedId}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
    };

    this.openPhenomenaModal = openPhenomena;

    if (triggerInNav) {
      triggerInNav.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openPhenomena();
      });
    }

    if (triggerInRadar) {
      triggerInRadar.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openPhenomena();
      });
    }

    // Delegación global para botones con .btn-open-phenomena o .link-open-phenomena
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-open-phenomena, .link-open-phenomena');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.phenomenon || null;
      openPhenomena(id);
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal(modal);
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });

    renderList();
  }

  setupWebcamsModal() {
    const modal = document.getElementById('webcams-modal');
    const closeBtn = document.getElementById('btn-close-webcams');
    const listContainer = document.getElementById('webcams-list-container');
    const searchInput = document.getElementById('webcam-search-input');
    const clearSearchBtn = document.getElementById('btn-clear-webcam-search');
    const switchContainer = document.getElementById('webcams-switch');
    const triggerInNav = document.getElementById('btn-open-webcams');

    if (!modal || !listContainer) return;

    let activeCategory = 'playas';
    let searchQuery = '';

    const normalize = (str) => String(str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

    const renderList = () => {
      const q = normalize(searchQuery);
      const filtered = WEBCAMS_ASTURIAS.filter(w => {
        const matchesCategory = q.length > 0 ? true : w.category === activeCategory;
        const matchesQuery = !q || (
          normalize(w.name).includes(q) ||
          normalize(w.concejo).includes(q) ||
          normalize(w.location).includes(q) ||
          normalize(w.desc).includes(q) ||
          normalize(w.type).includes(q)
        );
        return matchesCategory && matchesQuery;
      });

      if (filtered.length === 0) {
        listContainer.innerHTML = `
          <div class="search-empty" style="text-align: center; padding: 24px; color: #94a3b8;">
            <span style="font-size: 2rem; display: block; margin-bottom: 6px;">📹</span>
            No se encontraron cámaras para "<strong>${searchQuery}</strong>"
          </div>
        `;
        return;
      }

      listContainer.innerHTML = filtered.map(w => `
        <div class="webcam-card-item">
          <div class="webcam-card-left">
            <span class="webcam-card-icon">${w.icon}</span>
            <div class="webcam-card-info">
              <div class="webcam-card-title-row">
                <span class="webcam-card-name">${w.name}</span>
                <span class="webcam-badge-tag">${w.type}</span>
              </div>
              <div class="webcam-card-meta">${w.location} • <em>${w.desc}</em></div>
              <div class="webcam-card-source">Fuente: <strong>${w.provider}</strong></div>
            </div>
          </div>
          <a href="${w.url}" target="_blank" rel="noopener noreferrer" class="webcam-card-action-btn" title="Ver cámara en directo de ${w.name}">
            <span>Ver Cámara</span>
            <span style="font-size: 0.95rem;">↗</span>
          </a>
        </div>
      `).join('');
    };

    renderList();

    // Conmutador segmentado de categoría (Playas vs Montaña)
    if (switchContainer) {
      switchContainer.querySelectorAll('.webcam-switch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.triggerHaptic();
          switchContainer.querySelectorAll('.webcam-switch-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeCategory = btn.dataset.category;
          switchContainer.dataset.active = activeCategory;
          renderList();
        });
      });
    }

    // Buscador interactivo
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (clearSearchBtn) clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
        renderList();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        renderList();
      });
    }

    // Función de apertura con categoría opcional
    this.openWebcamsModal = (category = null) => {
      this.triggerHaptic();
      if (category) {
        activeCategory = category;
        if (switchContainer) {
          switchContainer.querySelectorAll('.webcam-switch-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.category === category);
          });
          switchContainer.dataset.active = category;
        }
      }
      this.openModal(modal);
      renderList();
    };

    if (triggerInNav) {
      triggerInNav.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openWebcamsModal();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal(modal));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeModal(modal);
    });
  }

  switchTab(targetTab, direction = null) {
    const tabList = APP_MODULES.map(m => m.id);
    const oldIndex = tabList.indexOf(this.activeTab);
    const newIndex = tabList.indexOf(targetTab);
    const mod = APP_MODULES.find(m => m.id === targetTab) || APP_MODULES[0];

    // Determinar dirección del deslizamiento lateral
    let animClass = 'slide-from-right';
    if (direction === 'backward' || (direction === null && newIndex < oldIndex && newIndex !== -1)) {
      animClass = 'slide-from-left';
    }

    // Actualizar indicador de sección activa
    const iconEl = document.getElementById('current-section-icon');
    const titleEl = document.getElementById('current-section-title');
    if (iconEl) iconEl.textContent = mod.icon;
    if (titleEl) titleEl.textContent = mod.title;

    // Actualizar paneles de contenido con animación de deslizamiento
    document.querySelectorAll('.tab-panel').forEach(p => {
      const isTarget = p.id === 'panel-' + targetTab;
      p.classList.remove('active', 'slide-from-right', 'slide-from-left');
      if (isTarget) {
        p.classList.add('active', animClass);
      }
    });

    this.activeTab = targetTab;
    window.location.hash = targetTab;

    // Reset de seguridad horizontal para blindar el viewport
    if (window.scrollX !== 0) {
      window.scrollTo({ left: 0, top: window.scrollY, behavior: 'instant' });
    }

    if (targetTab === 'radar') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => resizeMap(), 50);
      setTimeout(() => resizeMap(), 280);
    }

    if (targetTab === 'charts' && this.weatherData) {
      setTimeout(() => renderWeatherChart('meteo-chart-canvas', this.weatherData.weather.hourly, 48), 50);
    }

    if (targetTab === 'marine') {
      scrollTideChartToNow();
    }

    if (targetTab === 'astronomy') {
      renderAstronomyView('panel-astronomy', 'all');
    }

    const navModal = document.getElementById('nav-modal');
    if (navModal && navModal.style.display === 'flex') {
      navModal.style.display = 'none';
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
    const tabList = APP_MODULES.map(m => m.id);

    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();

      if (e.key >= '1' && e.key <= '9') {
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
        this.locateUser({ silent: false });
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
        const favModal = document.getElementById('favorites-modal');
        if (favModal) favModal.style.display = 'none';
        const modelModal = document.getElementById('model-modal');
        if (modelModal) modelModal.style.display = 'none';
        const navModal = document.getElementById('nav-modal');
        if (navModal) navModal.style.display = 'none';
        const iconThemesModal = document.getElementById('icon-themes-modal');
        if (iconThemesModal) iconThemesModal.style.display = 'none';
        const explainModal = document.getElementById('explain-modal');
        if (explainModal) explainModal.style.display = 'none';
        const webcamsModal = document.getElementById('webcams-modal');
        if (webcamsModal) webcamsModal.style.display = 'none';
        const phenomenaModal = document.getElementById('phenomena-modal');
        if (phenomenaModal) phenomenaModal.style.display = 'none';
      }
    });
  }

  setupSwipeNavigation() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    let mouseStartX = 0;
    let mouseStartY = 0;
    let mouseStartTime = 0;
    let isMouseDown = false;

    const tabList = APP_MODULES.map(m => m.id);

    const isInteractiveZone = (target) => {
      if (!target) return false;
      return target.closest(
        '.hourly-scroll-container, .live-hourly-block, .hourly-card, .hourly-day-divider, ' +
        '.chart-scroll-viewport, #chart-canvas-wrapper, #meteo-chart-canvas, ' +
        '.tide-scroll-viewport, .tide-svg-chart, ' +
        '.surf-timeline-grid, .surf-dayparts-list, ' +
        '.favorites-pills, .view-tabs, ' +
        '#map-container, .leaflet-container, ' +
        '.modal-overlay, .modal-card, ' +
        'input, textarea, select, button, a'
      );
    };

    // 1. GESTOS TÁCTILES MÓVILES NATIVOS (Smartphone / Tablet)
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      if (isInteractiveZone(e.target)) {
        touchStartX = 0;
        touchStartY = 0;
        return;
      }

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (touchStartX === 0 && touchStartY === 0) return;
      if (e.changedTouches.length !== 1) return;
      if (isInteractiveZone(e.target)) {
        touchStartX = 0;
        touchStartY = 0;
        return;
      }

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const duration = Date.now() - touchStartTime;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      touchStartX = 0;
      touchStartY = 0;

      // Criterios de swipe móvil limpio:
      // - Duración < 600ms
      // - Desplazamiento horizontal mínimo de 45px
      // - Trayectoria predominantemente horizontal (diffX > diffY * 1.6)
      if (duration < 600 && Math.abs(diffX) >= 45 && Math.abs(diffX) > Math.abs(diffY) * 1.6) {
        const currentIndex = tabList.indexOf(this.activeTab);
        if (currentIndex === -1) return;

        if (diffX < 0) {
          // Deslizar hacia la izquierda -> Avanza al siguiente módulo (entra desde la derecha)
          if (currentIndex < tabList.length - 1) {
            this.triggerHaptic();
            this.switchTab(tabList[currentIndex + 1], 'forward');
          }
        } else {
          // Deslizar hacia la derecha -> Vuelve al módulo anterior (entra desde la izquierda)
          if (currentIndex > 0) {
            this.triggerHaptic();
            this.switchTab(tabList[currentIndex - 1], 'backward');
          }
        }
      }
    }, { passive: true });

    // 2. SOPORTE DE ARRASTRE CON RATÓN (PC / Escritorio)
    document.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      if (isInteractiveZone(e.target)) return;

      mouseStartX = e.clientX;
      mouseStartY = e.clientY;
      mouseStartTime = Date.now();
      isMouseDown = true;
    });

    document.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      if (isInteractiveZone(e.target)) return;

      const diffX = e.clientX - mouseStartX;
      const diffY = e.clientY - mouseStartY;
      const duration = Date.now() - mouseStartTime;

      if (duration < 600 && Math.abs(diffX) >= 60 && Math.abs(diffX) > Math.abs(diffY) * 1.6) {
        const currentIndex = tabList.indexOf(this.activeTab);
        if (currentIndex === -1) return;

        if (diffX < 0) {
          if (currentIndex < tabList.length - 1) {
            this.triggerHaptic();
            this.switchTab(tabList[currentIndex + 1], 'forward');
          }
        } else {
          if (currentIndex > 0) {
            this.triggerHaptic();
            this.switchTab(tabList[currentIndex - 1], 'backward');
          }
        }
      }
    });
  }

  setupLiveClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;

    this.updateClock = () => {
      if (!navigator.onLine) {
        const syncDate = this.lastSyncTime || (this.weatherData?.timestamp ? new Date(this.weatherData.timestamp) : null);
        const syncStr = syncDate ? syncDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : '--:--';
        clockEl.textContent = '❄️ ' + syncStr;
        clockEl.classList.add('offline');
        clockEl.title = `Modo Offline: Previsión guardada a las ${syncStr}`;
      } else {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        clockEl.textContent = '🕒 ' + timeStr;
        clockEl.classList.remove('offline');
        clockEl.title = 'Hora y fecha en tiempo real';
      }
    };

    this.updateClock();
    setInterval(() => {
      if (navigator.onLine) {
        this.updateClock();
      }
    }, 1000);
  }

  setupNetworkMonitor() {
    const statusEl = document.getElementById('network-status');
    if (!statusEl) return;

    const updateStatus = () => {
      if (navigator.onLine) {
        statusEl.className = 'network-badge online';
        statusEl.textContent = '🟢 Online';
        this.triggerHaptic();
        if (this.currentConcejo) {
          this.loadWeather(this.currentConcejo.id);
        }
      } else {
        statusEl.className = 'network-badge offline';
        statusEl.textContent = '🔴 Offline';
        this.triggerHaptic();
      }
      if (this.updateClock) {
        this.updateClock();
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

  renderSkeletonLoading() {
    const liveContainer = document.getElementById('panel-live');
    if (!liveContainer || this.weatherData) return;
    liveContainer.innerHTML = `
      <div class="skeleton-card skeleton-hero">
        <div class="skeleton-line skeleton-title"></div>
        <div class="skeleton-line skeleton-sub"></div>
        <div class="skeleton-row">
          <div class="skeleton-box skeleton-temp"></div>
          <div class="skeleton-box skeleton-icon"></div>
        </div>
      </div>
      <div class="skeleton-grid">
        <div class="skeleton-card skeleton-sensor"></div>
        <div class="skeleton-card skeleton-sensor"></div>
        <div class="skeleton-card skeleton-sensor"></div>
        <div class="skeleton-card skeleton-sensor"></div>
      </div>
    `;
  }

  async switchConcejo(concejoId) {
    stopWeatherSpeech();
    this.currentConcejo = getConcejoById(concejoId) || this.currentConcejo;
    this.prefs.lastConcejo = concejoId;
    savePreferences(this.prefs);

    this.updateSearchTriggerDisplay();
    this.renderFavoritesMenu();
    this.updateFavButton();

    // Comprobar si tenemos datos guardados en caché de este concejo para pintarlo en 0ms
    const cached = getCachedWeather(concejoId, this.currentModel.id);
    if (cached) {
      this.weatherData = cached;
      this.renderAllComponents();
      this.updateLastUpdatedTime(cached.timestamp);
    } else {
      this.renderSkeletonLoading();
    }

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
    const result = await fetchWeatherData(this.compareConcejoB.lat, this.compareConcejoB.lon, isCoast, this.currentModel.apiModel || '');
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
    const favIcon = document.getElementById('fav-icon-indicator');
    if (!favBtn) return;
    const fav = isFavorite(this.currentConcejo.id);
    if (favIcon) {
      favIcon.textContent = fav ? '⭐' : '☆';
    } else {
      favBtn.innerHTML = `<span class="split-btn-icon">${fav ? '⭐' : '☆'}</span>`;
    }
    favBtn.classList.toggle('active', fav);
  }

  locateUser(options = {}) {
    const { silent = false } = options;
    if (!navigator.geolocation) {
      if (!silent) alert('Tu dispositivo o navegador no soporta geolocalización.');
      return;
    }

    const gpsBtn = document.getElementById('btn-gps');
    const gpsLabel = document.getElementById('gps-btn-label');
    if (gpsBtn && !silent && gpsLabel) {
      gpsLabel.textContent = 'GPS...';
    }

    const onGeoSuccess = (pos) => {
      const closest = findClosestConcejo(pos.coords.latitude, pos.coords.longitude);
      this.updateGpsButtonDisplay();
      if (closest) {
        if (closest.id !== this.currentConcejo.id) {
          console.log(`[MeteoAstur] GPS detectó concejo: ${closest.name}`);
          this.switchConcejo(closest.id);
        } else if (!silent && gpsLabel) {
          gpsLabel.textContent = '✓ Aquí';
          setTimeout(() => {
            this.updateGpsButtonDisplay();
          }, 1400);
        }
      }
    };

    const onGeoError = () => {
      // Intento secundario con menor precisión si el chip satelital tarda en fijar posición
      navigator.geolocation.getCurrentPosition(
        onGeoSuccess,
        (err) => {
          this.updateGpsButtonDisplay();
          if (!silent) {
            alert('No pudimos acceder a tu ubicación GPS. Asegúrate de dar permisos de ubicación precisa en tu dispositivo.');
          } else {
            console.warn('[MeteoAstur] Auto-ubicación silenciosa no pudo obtener coordenadas:', err);
          }
        },
        { enableHighAccuracy: false, timeout: 6000 }
      );
    };

    navigator.geolocation.getCurrentPosition(
      onGeoSuccess,
      onGeoError,
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }

  /**
   * Genera una firma ligera de los datos actuales para detectar si los datos frescos
   * de red son realmente distintos a los que ya están pintados (caché).
   * Evita re-renders innecesarios que causan el parpadeo en móviles.
   */
  _dataSignature(data) {
    if (!data || !data.weather || !data.weather.current) return null;
    const c = data.weather.current;
    return `${Math.round(c.temperature_2m)}|${c.weather_code}|${Math.round(c.wind_speed_10m || 0)}|${Math.round(c.apparent_temperature || 0)}`;
  }

  async loadWeather(concejoId) {
    const concejo = getConcejoById(concejoId);
    if (!concejo) return;

    try {
      const isCoast = concejo.type === 'coast' || concejo.region.includes('Costa');
      const result = await fetchWeatherData(concejo.lat, concejo.lon, isCoast, this.currentModel.apiModel || '');

      if (result && result.success) {
        // Comparar firma antes de re-renderizar: si los datos son idénticos a los pintados,
        // no hay que destruir y reconstruir el DOM (elimina parpadeo en refrescos sin cambios)
        const sigNew = this._dataSignature(result);
        const sigOld = this._dataSignature(this.weatherData);
        const dataChanged = sigNew !== sigOld;

        this.weatherData = result;
        saveCachedWeather(concejoId, this.currentModel.id, result);

        if (dataChanged) {
          // Solo re-renderizamos si los datos meteorológicos han variado realmente
          this.renderAllComponents();
        }

        this.updateLastUpdatedTime(result.timestamp);
        triggerSeismicRefresh(concejo);
      } else {
        console.error('Error cargando tiempo:', result?.error);
      }
    } catch (err) {
      console.error('Excepción en loadWeather:', err);
    }
  }

  updateLastUpdatedTime(date) {
    if (date) {
      this.lastSyncTime = date instanceof Date ? date : new Date(date);
    }
    const el = document.getElementById('last-updated');
    if (el && this.lastSyncTime) {
      el.textContent = `Actualizado: ${this.lastSyncTime.toLocaleTimeString('es-ES')}`;
    }
    if (this.updateClock) {
      this.updateClock();
    }
  }


  renderAllComponents() {
    if (!this.weatherData) return;

    // ─── FASE 1: Panel en Vivo (inmediata) ─────────────────────────────────────
    // Se renderiza primero y solo el panel-live que es lo que el usuario ve.
    // El hilo principal se libera entre fase 1 y fase 2 gracias al setTimeout(0),
    // eliminando el congelado de animaciones de ~2 segundos en Android.
    try {
      const liveContainer = document.getElementById('panel-live');
      if (liveContainer) {
        liveContainer.innerHTML = renderCurrentWeather(this.weatherData, this.currentConcejo, this.prefs.units, this.prefs.iconTheme);
      }
    } catch (e) {
      console.error('[MeteoAstur] Error renderizando Vivo:', e);
    }

    // Aplicar tema atmosférico inmediatamente (afecta al fondo/partículas del panel-live)
    if (this.weatherData.weather && this.weatherData.weather.current) {
      try {
        const cur = this.weatherData.weather.current;
        this.applyDynamicWeatherTheme(cur.weather_code, cur.is_day !== undefined ? cur.is_day : 1);
      } catch (e) {
        console.error('[MeteoAstur] Error aplicando tema atmosférico:', e);
      }
    }

    this.updateFavButton();

    // ─── FASE 2: Resto de módulos (diferida) ───────────────────────────────────
    // Se ejecuta en el siguiente ciclo del event loop (setTimeout 0), liberando
    // el hilo principal entre las dos fases y desbloqueando las animaciones.
    const data = this.weatherData;
    const concejo = this.currentConcejo;
    const prefs = this.prefs;
    const activeTab = this.activeTab;

    setTimeout(() => {
      // 2. Módulo Playas & Mareas
      try {
        const marineContainer = document.getElementById('panel-marine');
        if (marineContainer) {
          marineContainer.innerHTML = renderMarineCard(data, concejo);
          scrollTideChartToNow();
        }
      } catch (e) {
        console.error('[MeteoAstur] Error renderizando Playas & Mareas:', e);
      }

      // 2b. Módulo Surf & Rompientes
      try {
        const surfContainer = document.getElementById('panel-surf');
        if (surfContainer) {
          surfContainer.innerHTML = renderSurfCard(data, concejo);
        }
      } catch (e) {
        console.error('[MeteoAstur] Error renderizando Surf & Rompientes:', e);
      }

      // 2c. Módulo Rutas & Senderismo (v1.1.51)
      try {
        const routesContainer = document.getElementById('panel-routes');
        if (routesContainer) {
          routesContainer.innerHTML = renderRoutesCard(data, concejo);
        }
      } catch (e) {
        console.error('[MeteoAstur] Error renderizando Rutas & Senderismo:', e);
      }

      // 3. Módulo Montaña
      try {
        const mountainContainer = document.getElementById('panel-mountain');
        if (mountainContainer) {
          mountainContainer.innerHTML = renderMountainCard(data, concejo);
        }
      } catch (e) {
        console.error('[MeteoAstur] Error renderizando Cordillera & Nieve:', e);
      }

      // 4. Pronóstico
      try {
        const forecastContainer = document.getElementById('panel-forecast');
        if (forecastContainer) {
          forecastContainer.innerHTML = renderForecast(data, prefs.units, prefs.iconTheme);
        }
      } catch (e) {
        console.error('[MeteoAstur] Error renderizando Pronóstico:', e);
      }

      // 5. Gráfico si está activo
      if (activeTab === 'charts') {
        try {
          renderWeatherChart('meteo-chart-canvas', data.weather.hourly, 48);
        } catch (e) {
          console.error('[MeteoAstur] Error renderizando Gráfica:', e);
        }
      }

      // 6. Comparador si está activo
      if (activeTab === 'compare') {
        try {
          this.renderCompareSection();
        } catch (e) {
          console.error('[MeteoAstur] Error renderizando Comparador:', e);
        }
      }
    }, 0);
  }


  applyDynamicWeatherTheme(weatherCode, isDay = 1) {
    const cur = this.weatherData?.weather?.current;
    const hourly = this.weatherData?.weather?.hourly;
    const currentHour = new Date().getHours();
    const currentPop = (hourly && hourly.precipitation_probability && hourly.precipitation_probability[currentHour] != null) ? hourly.precipitation_probability[currentHour] : null;
    const directIrr = cur?.direct_normal_irradiance != null ? cur.direct_normal_irradiance : null;
    const currentUv = cur?.uv_index != null ? cur.uv_index : (hourly?.uv_index && hourly.uv_index[currentHour] != null ? hourly.uv_index[currentHour] : null);
    const currentSw = cur?.shortwave_radiation != null ? cur.shortwave_radiation : null;
    const currentCloud = cur?.cloud_cover != null ? cur.cloud_cover : (hourly?.cloud_cover && hourly.cloud_cover[currentHour] != null ? hourly.cloud_cover[currentHour] : null);
    const info = getWeatherInfo(weatherCode, isDay, cur?.precipitation, currentPop, directIrr, currentUv, currentSw, currentCloud);
    const bgType = info ? info.bg : 'cloudy';
    let themeKey = bgType;

    if (bgType === 'clear' || bgType === 'mostly-clear' || bgType === 'partly-cloudy') {
      themeKey = isDay ? `${bgType}-day` : `${bgType}-night`;
    } else if (bgType === 'cloudy') {
      themeKey = isDay ? 'cloudy' : 'cloudy-night';
    }

    document.body.setAttribute('data-weather-theme', themeKey);

    // Ajustar modo de partículas interactivas
    const isClearLike = bgType === 'clear' || bgType === 'clear-day' || bgType === 'clear-night' || bgType === 'mostly-clear' || bgType === 'mostly-clear-day' || bgType === 'mostly-clear-night';
    if (isClearLike && isDay) {
      this.setParticleMode('sun-motes');
    } else if (isClearLike && !isDay) {
      this.setParticleMode('stars');
    } else if (bgType === 'rain' || bgType === 'drizzle') {
      this.setParticleMode('rain');
    } else if (bgType === 'heavy-rain') {
      this.setParticleMode('heavy-rain');
    } else if (bgType === 'snow' || bgType === 'hail') {
      this.setParticleMode('snow');
    } else if (bgType === 'storm') {
      this.setParticleMode('storm');
    } else if (bgType === 'fog') {
      this.setParticleMode('fog');
    } else {
      this.setParticleMode(isDay ? 'clouds-day' : 'clouds-night');
    }
  }

  setParticleMode(mode) {
    this.particleMode = mode;
    if (this.reinitParticles) {
      this.reinitParticles(mode);
    }
  }

  initParticleCanvas() {
    const canvas = document.getElementById('weather-particles-canvas');
    if (!canvas) return;

    // Respetar prefers-reduced-motion: desactivar canvas de partículas completamente
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      resizeMap();
      if (this.reinitParticles) this.reinitParticles(this.particleMode || 'clouds-day');
    });

    // Detectar modo economía (reutiliza la clase .low-perf ya marcada por gyroGlass)
    // Si gyroGlass aún no corrió, hacemos nuestra propia lectura rápida
    const isLowPerf = document.documentElement.classList.contains('low-perf') ||
      (navigator.hardwareConcurrency || 8) <= 4;
    // Factor de reducción de partículas: 60% en móviles lentos
    const perfScale = isLowPerf ? 0.6 : 1.0;

    let particles = [];
    let currentMode = 'clouds-day';
    let lightningFlash = 0;

    const createParticlesForMode = (mode) => {
      currentMode = mode;
      particles = [];

      if (mode === 'sun-motes') {
        const count = Math.round(35 * perfScale);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1.5 + Math.random() * 2.5,
            speedY: -0.3 - Math.random() * 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            alpha: 0.15 + Math.random() * 0.35,
            pulseSpeed: 0.02 + Math.random() * 0.02,
            pulse: Math.random() * Math.PI
          });
        }
      } else if (mode === 'stars') {
        const count = Math.round(75 * perfScale);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.85,
            radius: 1.0 + Math.random() * 2.0,
            alpha: 0.35 + Math.random() * 0.65,
            twinkleSpeed: 0.03 + Math.random() * 0.04,
            pulse: Math.random() * Math.PI
          });
        }
      } else if (mode === 'snow') {
        const count = Math.round(60 * perfScale);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1.8 + Math.random() * 3.5,
            speedY: 0.8 + Math.random() * 1.6,
            sway: Math.random() * Math.PI * 2,
            swaySpeed: 0.02 + Math.random() * 0.02,
            alpha: 0.4 + Math.random() * 0.5
          });
        }
      } else if (mode === 'storm' || mode === 'heavy-rain') {
        const count = Math.round(80 * perfScale);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speedY: 9 + Math.random() * 8,
            length: 18 + Math.random() * 20,
            alpha: 0.35 + Math.random() * 0.45
          });
        }
      } else if (mode === 'rain') {
        const count = Math.round(60 * perfScale);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speedY: 5 + Math.random() * 5,
            length: 12 + Math.random() * 16,
            alpha: 0.3 + Math.random() * 0.35
          });
        }
      } else if (mode === 'fog') {
        const count = Math.round(22 * perfScale);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 40 + Math.random() * 70,
            speedX: 0.15 + Math.random() * 0.25,
            alpha: 0.08 + Math.random() * 0.1
          });
        }
      } else {
        // clouds-day / clouds-night / ambient-drift
        const count = Math.round(45 * perfScale);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1.6 + Math.random() * 2.8,
            speedX: 0.25 + Math.random() * 0.5,
            speedY: (Math.random() - 0.5) * 0.25,
            alpha: 0.25 + Math.random() * 0.35
          });
        }
      }
    };

    this.reinitParticles = createParticlesForMode;
    createParticlesForMode('clouds-day');

    let lastFrameTime = 0;
    let isLowPowerMode = false;

    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const checkBattery = () => {
          isLowPowerMode = (battery.level <= 0.20 && !battery.charging);
        };
        checkBattery();
        battery.addEventListener('levelchange', checkBattery);
        battery.addEventListener('chargingchange', checkBattery);
      }).catch(() => {});
    }

    function animate(timestamp = 0) {
      if (document.hidden) {
        requestAnimationFrame(animate);
        return;
      }

      // Si la batería es baja (< 20%), limitamos a 25 FPS para alargar la autonomía
      if (isLowPowerMode && timestamp - lastFrameTime < 40) {
        requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      // Destello sutil de relámpago ocasional en modo tormenta
      if (currentMode === 'storm') {
        if (Math.random() < 0.003 && lightningFlash <= 0) {
          lightningFlash = 0.22;
        }
        if (lightningFlash > 0) {
          ctx.fillStyle = `rgba(168, 85, 247, ${lightningFlash})`;
          ctx.fillRect(0, 0, width, height);
          lightningFlash -= 0.015;
        }
      }

      if (currentMode === 'sun-motes') {
        particles.forEach(p => {
          p.pulse += p.pulseSpeed;
          const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          // Sin shadowBlur: alpha más alto compensa el efecto de brillo sin coste de GPU
          ctx.fillStyle = `rgba(251, 191, 36, ${Math.max(0.07, currentAlpha)})`;
          ctx.fill();

          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        });
      } else if (currentMode === 'stars') {
        particles.forEach(p => {
          p.pulse += p.twinkleSpeed;
          const currentAlpha = Math.max(0.12, p.alpha + Math.sin(p.pulse) * 0.35);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          // Sin shadowBlur: alpha compensado para preservar el destello
          ctx.fillStyle = `rgba(224, 242, 254, ${currentAlpha})`;
          ctx.fill();
        });
      } else if (currentMode === 'snow') {
        particles.forEach(p => {
          p.sway += p.swaySpeed;
          ctx.beginPath();
          ctx.arc(p.x + Math.sin(p.sway) * 8, p.y, p.radius, 0, Math.PI * 2);
          // Sin shadowBlur: alpha ligeramente aumentado para compensar
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, p.alpha + 0.1)})`;
          ctx.fill();

          p.y += p.speedY;
          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
        });
      } else if (currentMode === 'rain' || currentMode === 'heavy-rain' || currentMode === 'storm') {
        ctx.strokeStyle = currentMode === 'storm' ? 'rgba(165, 180, 252, 0.5)' : 'rgba(96, 165, 250, 0.4)';
        ctx.lineWidth = currentMode === 'heavy-rain' ? 1.4 : 1;

        particles.forEach(p => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 2, p.y + p.length);
          ctx.stroke();

          p.y += p.speedY;
          p.x -= 0.6;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        });
      } else if (currentMode === 'fog') {
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(203, 213, 225, ${p.alpha})`;
          ctx.fill();

          p.x += p.speedX;
          if (p.x > width + p.radius) {
            p.x = -p.radius;
            p.y = Math.random() * height;
          }
        });
      } else {
        // clouds ambient
        ctx.fillStyle = currentMode === 'clouds-day' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(148, 163, 184, 0.2)';
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x > width + 10) p.x = -10;
          if (p.y > height + 10) p.y = -10;
          if (p.y < -10) p.y = height + 10;
        });
      }

      requestAnimationFrame(animate);
    }

    animate();
  }
}

// Iniciar aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  window.meteoApp = new MeteoAsturiasApp();
});
