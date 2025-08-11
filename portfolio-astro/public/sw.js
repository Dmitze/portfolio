// Найпростіший кеш для статичних ассетів
const CACHE = 'static-v1';
self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE && caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.pathname.startsWith('/_astro/') || url.pathname.startsWith('/assets/') || url.pathname.startsWith('/images/')) {
    e.respondWith(
      caches.open(CACHE).then(cache => cache.match(e.request).then(hit => hit || fetch(e.request).then(res => { cache.put(e.request, res.clone()); return res; })))
    );
  }
});