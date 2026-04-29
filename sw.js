// ── Network-first strategy — toujours la version la plus récente ──────────
const CACHE = 'developme-v5';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Supprimer TOUS les anciens caches
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first : essaie le réseau, fallback cache uniquement si offline
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Met en cache la réponse fraîche
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
