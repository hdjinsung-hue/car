const CACHE_NAME='hongik-auto-v1.54';
const CORE=['./','./index.html','./version.json'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)).catch(()=>{}));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const u=new URL(event.request.url);
 if(event.request.method!=='GET'||u.origin!==location.origin) return;
 if(event.request.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/version.json')){
   event.respondWith(fetch(event.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(event.request,copy));return r;}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
   return;
 }
 event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)));
});
