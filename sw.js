const CACHE = 'ttt-pwa-v1';
const ASSETS = ['/ttt-pwa/', '/ttt-pwa/index.html', '/ttt-pwa/manifest.json', '/ttt-pwa/icon-192.png', '/ttt-pwa/icon-512.png'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { if (res && res.status === 200 && res.type === 'basic') { const rc = res.clone(); caches.open(CACHE).then(c => c.put(e.request, rc)); } return res; }))));