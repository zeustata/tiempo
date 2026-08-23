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
    this.currentConcejo = getConcejoById(this.prefs.lastConcejo);
    this.weatherData = null;
    this.activeTab = 'live';
    this.autoRefreshTimer = null;
    
    this.init();
  }

  async init() {
    this.renderConcejoDropdown();
    this.renderFavoritePills();
    this.setupEventListeners();
    this.initParticleCanvas();

    // Cargar datos del concejo actual
    await this.loadWeather(this.currentConcejo.id);

    // Inicializar mapa Leaflet
    initAsturiasMap('map-container', (concejoId) => {
      this.switchConcejo(concejoId);
    });

    // Auto-refresco cada 10 minutos
    if (this.prefs.autoRefresh) {
      this.autoRefreshTimer = setInterval(() => {
        this.loadWeather(this.currentConcejo.id);
      }, 10 * 60 * 1000);
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

    const favs = this.prefs.favorites.map(id => getConcejoById(id)).filter(Boolean);
    
    let html = '<span class="fav-label">Favoritos:</span>';
    html += favs.map(c => '<button class="pill-item ' + (c.id === this.currentConcejo.id ? 'active' : '') + '" data-id="' + c.id + '">' + c.name.split('/')[0] + '</button>').join('');
    
    container.innerHTML = html;

    container.querySelectorAll('.pill-item').forEach(btn => {
      btn.onclick = () => this.switchConcejo(btn.dataset.id);
    });
  }

  setupEventListeners() {
    // Cambio en selector dropdown
    const select = document.getElementById('concejo-select');
    if (select) {
      select.addEventListener('change', (e) => this.switchConcejo(e.target.value));
    }

    // Botón Favorito Toggle
    const favBtn = document.getElementById('btn-toggle-fav');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        this.prefs.favorites = toggleFavorite(this.currentConcejo.id);
        this.updateFavButton();
        this.renderFavoritePills();
      });
    }

    // Botón Geolocalización GPS
    const gpsBtn = document.getElementById('btn-gps');
    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => this.locateUser());
    }

    // Botón Actualizar
    const refreshBtn = document.getElementById('btn-refresh');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.loadWeather(this.currentConcejo.id));
    }

    // Toggle de Unidades (km/h vs nudos)
    const unitBtn = document.getElementById('btn-unit-toggle');
    if (unitBtn) {
      unitBtn.addEventListener('click', () => {
        this.prefs.units = this.prefs.units === 'metric' ? 'knots' : 'metric';
        savePreferences(this.prefs);
        unitBtn.textContent = this.prefs.units === 'metric' ? 'Unidades: km/h' : 'Unidades: Nudos (kt)';
        this.renderAllComponents();
      });
    }

    // Tabs de navegación
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetTab = btn.dataset.tab;
        const panel = document.getElementById('panel-' + targetTab);
        if (panel) panel.classList.add('active');

        this.activeTab = targetTab;

        // Si se activa el radar, recalculamos inmediatamente el tamaño del mapa de Leaflet
        if (targetTab === 'radar') {
          resizeMap();
        }

        if (targetTab === 'charts' && this.weatherData) {
          renderWeatherChart('meteo-chart-canvas', this.weatherData.weather.hourly);
        }
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

  async switchConcejo(concejoId) {
    this.currentConcejo = getConcejoById(concejoId);
    this.prefs.lastConcejo = concejoId;
    savePreferences(this.prefs);

    this.renderConcejoDropdown();
    this.renderFavoritePills();
    this.updateFavButton();

    focusConcejoOnMap(this.currentConcejo.lat, this.currentConcejo.lon);
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
      alert('Tu navegador no soporta geolocalización.');
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
        alert('No se pudo obtener la ubicación GPS.');
        if (gpsBtn) gpsBtn.textContent = '📍 Mi Ubicación';
      },
      { timeout: 8000 }
    );
  }

  async loadWeather(concejoId) {
    const concejo = getConcejoById(concejoId);
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
      renderWeatherChart('meteo-chart-canvas', this.weatherData.weather.hourly);
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
