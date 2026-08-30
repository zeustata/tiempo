const CACHE_NAME = 'meteoasturlode-v146-official';
const STATIC_ASSETS = [
  './',
  './index.html',
  './privacy.html',
  './manifest.json',
  './icons/bandera-asturias.svg',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
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
  './js/components/astronomyCard.js',
  './js/components/mapRadar.js',
  './js/utils/weatherIcons.js',
  './js/utils/weatherAsturIcons.js',
  './js/utils/weatherPixelIcons.js',
  './js/utils/weatherNeonIcons.js',
  './js/utils/weatherSketchIcons.js',
  './js/utils/weatherAlerts.js',
  './js/utils/weatherExplanations.js',
  './js/utils/storage.js',
  './js/utils/tides.js'
];

// Instalación: forzar activación inmediata sin esperar a que se cierren pestañas
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activación: purgar inmediatamente todas las cachés viejas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) {
            console.log('[SW] Eliminando caché antigua:', k);
            return caches.delete(k);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia NETWORK-FIRST para garantizar que móviles y PC siempre vean la última versión
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  // Si no es petición HTTP/HTTPS (ej: chrome-extension), ignorar
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        // Si la red responde correctamente y es un archivo local/estático, actualizamos la copia en caché en segundo plano
        if (networkResponse && networkResponse.status === 200 && e.request.url.includes(self.location.origin)) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Solo si no hay internet / offline, acudimos a la caché guardada
        return caches.match(e.request);
      })
  );
});