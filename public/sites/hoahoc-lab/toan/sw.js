// Service Worker disabled to prevent cache conflicts with Next.js and Vercel
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k.startsWith('ct99cas-')).map((k) => caches.delete(k)));
      await self.registration.unregister();
    } catch (_) {}
    await self.clients.claim();
  })());
});
