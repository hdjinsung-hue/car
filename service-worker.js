const CACHE='car-comp-v1.00';
const ASSETS=['./manifest.webmanifest','./car-icon-192.png','./car-icon-512.png','./car-icon-180.png','./car-icon-64.png','./favicon.ico'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return; e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});
