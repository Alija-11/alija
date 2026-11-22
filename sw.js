/* علي جا: يخلي الصفحة تنثبت كتطبيق وتفتح حتى لو النت ضعيف. يجيب أحدث نسخة من النت دايماً، والنسخة المحفوظة احتياط بس. */
const C='alija-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','icon-192.png','icon-512.png'])).catch(()=>{}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url); if(u.origin!==location.origin) return;
  const scope=new URL(self.registration.scope).pathname;
  if(r.mode==='navigate'&&(u.pathname===scope||u.pathname===scope+'index.html')){
    e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(scope,cp))}return res})
      .catch(()=>caches.match(scope).then(m=>m||Response.error())));
    return;
  }
  if(/\/icon-(192|512)\.png$/.test(u.pathname)){e.respondWith(caches.match(r).then(m=>m||fetch(r)))}
});
