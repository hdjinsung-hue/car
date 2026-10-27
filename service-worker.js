const CACHE_NAME='hongik-auto-v1.71';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys()){if(k!==CACHE_NAME) await caches.delete(k);}await self.clients.claim();})());});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});
