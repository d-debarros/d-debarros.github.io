// Optional: Service Worker for Performance (PWA-ready)
// Uncomment in index.html to enable

const CACHE_NAME = 'db-portfolio-v1';
const urlsToCache = [
  '/',
  '/assets/styles.css',
  '/assets/js/app.js',
  '/assets/images/lightningbolt.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
