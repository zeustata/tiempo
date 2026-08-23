import { CONCEJOS_ASTURIAS, getConcejoById, findClosestConcejo } from './config/concejos.js?v=5.4';
import { fetchWeatherData } from './services/weatherApi.js?v=5.4';
import { getPreferences, savePreferences, toggleFavorite, isFavorite } from './utils/storage.js?v=5.4';
import { renderCurrentWeather } from './components/currentCard.js?v=5.4';
import { renderMarineCard } from './components/marineCard.js?v=5.4';
import { renderMountainCard } from './components/mountainCard.js?v=5.4';
import { renderForecast } from './components/forecastView.js?v=5.4';
import { renderWeatherChart } from './components/chartsView.js?v=5.4';
import { renderCompareView } from './components/compareView.js?v=5.4';
import { initAsturiasMap, playRadarAnimation, focusConcejoOnMap, resizeMap, resetMapCenter } from './components/mapRadar.js?v=5.4';
import { getWeatherInfo } from './utils/weatherIcons.js?v=5.4';

const APP_MODULES = [
  { id: 'live', icon: '📊', title: 'Estación en Vivo', desc: 'Sensores en tiempo real, alertas climáticas y calidad del aire', key: '1' },
  { id: 'forecast', icon: '📅', title: 'Pronósticos', desc: 'Predicción horaria detallada para 72h y evolución por días', key: '2' },
  { id: 'radar', icon: '📡', title: 'Radar Cantábrico', desc: 'Precipitación y tormentas en directo vía satélite RainViewer', key: '3' },
  { id: 'marine', icon: '🌊', title: 'Costa & Mar', desc: 'Oleaje, mareas, escala Douglas, surf y playas', key: '4' },
  { id: 'mountain', icon: '🏔️', title: 'Cordillera & Nieve', desc: 'Estado de puertos de montaña, cota de nieve y esquí', key: '5' },
  { id: 'charts', icon: '📈', title: 'Gráficos 48 Horas', desc: 'Curvas continuas de temperatura, lluvia y viento', key: '6' },
  { id: 'compare', icon: '⚖️', title: 'Comparador Climático', desc: 'Comparativa simultánea cara a cara entre dos concejos', key: '7' }
];

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
    this.renderFavoritesMenu();
    this.setupNavModal();
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
      el.innerHTML = `<span class="active-badge">${this.currentConcejo.badge}</span> <strong>${this.currentConcejo.name}</strong>`;
    }
  }

  renderFavoritesMenu() {
    const labelEl = document.getElementById('fav-btn-label');
    const modalList = document.getElementById('favorites-modal-list');
    const count = this.prefs.favorites ? this.prefs.favorites.length : 0;

    if (labelEl) {
      labelEl.textContent = `Favoritos (${count})`;
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
      const targetBtn = e.target.closest('.btn-header, .section-nav-trigger, .search-trigger-card, .fav-trigger-card, .btn-close, .version-badge-footer, .nav-modal-item, .hourly-card, .daily-card-rich, .fav-modal-remove-btn');
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
    window.addEventListener('popstate', () => {
      const modals = document.querySelectorAll('.modal-overlay');
      modals.forEach(m => {
        if (m.style.display === 'flex') {
          m.style.display = 'none';
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
        this.locateUser();
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

  setupNavModal() {
    const triggerBtn = document.getElementById('btn-open-nav-modal');
    const modal = document.getElementById('nav-modal');
    const closeBtn = document.getElementById('btn-close-nav');
    const grid = document.getElementById('nav-modal-grid');

    if (!modal || !grid) return;

    const renderNavItems = () => {
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
  }

  switchTab(targetTab) {
    const mod = APP_MODULES.find(m => m.id === targetTab) || APP_MODULES[0];

    // Actualizar indicador de sección activa
    const iconEl = document.getElementById('current-section-icon');
    const titleEl = document.getElementById('current-section-title');
    if (iconEl) iconEl.textContent = mod.icon;
    if (titleEl) titleEl.textContent = mod.title;

    // Actualizar paneles de contenido
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
        const favModal = document.getElementById('favorites-modal');
        if (favModal) favModal.style.display = 'none';
        const navModal = document.getElementById('nav-modal');
        if (navModal) navModal.style.display = 'none';
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
    this.renderFavoritesMenu();
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

    // 7. Aplicar Tema Atmosférico Dinámico y Partículas Ambientales
    if (this.weatherData.weather && this.weatherData.weather.current) {
      const cur = this.weatherData.weather.current;
      this.applyDynamicWeatherTheme(cur.weather_code, cur.is_day !== undefined ? cur.is_day : 1);
    }

    this.updateFavButton();
  }

  applyDynamicWeatherTheme(weatherCode, isDay = 1) {
    const info = getWeatherInfo(weatherCode);
    const bgType = info ? info.bg : 'cloudy';
    let themeKey = bgType;

    if (bgType === 'clear' || bgType === 'mostly-clear' || bgType === 'partly-cloudy') {
      themeKey = isDay ? `${bgType}-day` : `${bgType}-night`;
    }

    document.body.setAttribute('data-weather-theme', themeKey);

    // Ajustar modo de partículas interactivas
    if (bgType === 'clear' && isDay) {
      this.setParticleMode('sun-motes');
    } else if (bgType === 'clear' && !isDay) {
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
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      resizeMap();
      if (this.reinitParticles) this.reinitParticles(this.particleMode || 'clouds-day');
    });

    let particles = [];
    let currentMode = 'clouds-day';
    let lightningFlash = 0;

    const createParticlesForMode = (mode) => {
      currentMode = mode;
      particles = [];

      if (mode === 'sun-motes') {
        const count = 35;
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
        const count = 50;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.7,
            radius: 0.8 + Math.random() * 1.6,
            alpha: 0.2 + Math.random() * 0.7,
            twinkleSpeed: 0.03 + Math.random() * 0.04,
            pulse: Math.random() * Math.PI
          });
        }
      } else if (mode === 'snow') {
        const count = 45;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1.5 + Math.random() * 3,
            speedY: 0.8 + Math.random() * 1.5,
            sway: Math.random() * Math.PI * 2,
            swaySpeed: 0.02 + Math.random() * 0.02,
            alpha: 0.3 + Math.random() * 0.5
          });
        }
      } else if (mode === 'storm' || mode === 'heavy-rain') {
        const count = 65;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speedY: 8 + Math.random() * 7,
            length: 16 + Math.random() * 18,
            alpha: 0.25 + Math.random() * 0.35
          });
        }
      } else if (mode === 'rain') {
        const count = 45;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speedY: 4 + Math.random() * 4,
            length: 10 + Math.random() * 14,
            alpha: 0.18 + Math.random() * 0.25
          });
        }
      } else if (mode === 'fog') {
        const count = 18;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 35 + Math.random() * 60,
            speedX: 0.15 + Math.random() * 0.25,
            alpha: 0.04 + Math.random() * 0.06
          });
        }
      } else {
        // clouds-day / clouds-night / ambient-drift
        const count = 30;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 1.2 + Math.random() * 2,
            speedX: 0.2 + Math.random() * 0.4,
            speedY: (Math.random() - 0.5) * 0.2,
            alpha: 0.1 + Math.random() * 0.2
          });
        }
      }
    };

    this.reinitParticles = createParticlesForMode;
    createParticlesForMode('clouds-day');

    function animate() {
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
          ctx.fillStyle = `rgba(251, 191, 36, ${Math.max(0.05, currentAlpha)})`;
          ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

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
          const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulse) * 0.35);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 242, 254, ${currentAlpha})`;
          ctx.shadowColor = 'rgba(186, 230, 253, 0.8)';
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      } else if (currentMode === 'snow') {
        particles.forEach(p => {
          p.sway += p.swaySpeed;
          ctx.beginPath();
          ctx.arc(p.x + Math.sin(p.sway) * 8, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.shadowColor = 'rgba(224, 242, 254, 0.7)';
          ctx.shadowBlur = 5;
          ctx.fill();
          ctx.shadowBlur = 0;

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
