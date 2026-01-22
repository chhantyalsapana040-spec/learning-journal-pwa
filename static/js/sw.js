const CACHE_NAME = "journal-cache-v1";
const ASSETS = [
  "/",
  "/journal",
  "/static/css/style.css",
  "/static/js/script.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
