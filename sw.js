const CACHE_NAME = 'meteoasturias-cache-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon.svg',
  './css/main.css',
  './css/components.css',
  './css/weather-themes.css',
  './js/app.js',
  './js/config/concejos.js',
  './js/services/weatherApi.js',
  './js/services/radarService.js',
  './js/components/currentCard.js',
  './js/components/marineCard.js',
  './js/components/mountainCard.js',
  './js/components/forecastView.js',
  './js/components/chartsView.js',
  './js/components/mapRadar.js',
  './js/utils/weatherIcons.js',
  './js/utils/storage.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Solo cachear peticiones GET
  if (e.request.method !== 'GET') return;

  // Peticiones de datos meteorológicos y satélite: Network First con fallback a caché
  if (e.request.url.includes('open-meteo.com') || e.request.url.includes('rainviewer.com')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  // Assets estáticos: Cache First con fallback a red
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(response => {
        return response;
      });
    })
  );
});