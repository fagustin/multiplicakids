const CACHE_NAME = "multiplicakids-v3"; // 🔥 Cambia versión en cada release

const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

/* ===========================
   INSTALL
=========================== */

self.addEventListener("install", event => {
  self.skipWaiting(); // 🔥 Activa inmediatamente

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

/* ===========================
   ACTIVATE
=========================== */

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim(); // 🔥 Toma control inmediato
});

/* ===========================
   FETCH
=========================== */

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

/* ===========================
   SKIP WAITING MESSAGE
=========================== */

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
