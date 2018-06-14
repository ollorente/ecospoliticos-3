var cacheName = 'ecospoliticos-1-0';
var filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './img/ico_16x16.png',
  './img/ico_32x32.png',
  './img/ico_64x64.png',
  './img/ico_96x96.png',
  './img/ico_128x128.png',
  './img/ico_192x192.png',
  './img/ico_256x256.png',
  './img/ico_384x384.png',
  './img/ico_512x512.png',
  './img/ico_1024x1024.png',
  './img/ecospoliticos.svg'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
