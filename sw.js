const CACHE_NAME = 'basketball-stars';
const urlsToCache = [
  '/',
  '/assets',
  '/index.html',
  '/script.js',
  '/manifest.json',
  '/basketball_legends_2019.min.js',
  '/basketball-stars.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
          .then(fetchResponse => {
            return caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
              });
          });
      })
  );
});
