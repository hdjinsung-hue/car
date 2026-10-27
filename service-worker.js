const SW_VERSION = "1.51";
const CACHE_NAME = `hongik-auto-${SW_VERSION}`;

self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith("hongik-auto-") && k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 실행 화면과 버전 파일은 항상 네트워크를 먼저 확인해 설치형 앱도 최신판을 받게 합니다.
  if (req.mode === "navigate" || url.pathname.endsWith("/version.json") || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/")) {
    event.respondWith((async () => {
      try {
        return await fetch(req, { cache: "no-store" });
      } catch (e) {
        const cached = await caches.match(req);
        return cached || Response.error();
      }
    })());
  }
});
