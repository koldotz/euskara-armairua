/* ── Euskara Armairua · service worker ──────────────────────────────────
   Cachea las páginas y datos del sitio para que funcione sin conexión
   (uso en clase). Estrategia: stale-while-revalidate para el mismo origen;
   las fuentes/CDN y Supabase van siempre a la red (fuera de scope).      */
var CACHE = 'armairua-v5';
var ASSETS = [
  'index.html', 'ikasgela.html', 'gramatika.html', 'glosario.html', 'geruzak.html',
  'a1.html', 'a2.html',
  'armairua-gramatika-data.js', 'armairua-glosario.js', 'armairua-export.js',
  'armairua-a1-plan.js', 'armairua-a1-data.js',
  'armairua-cloud.js', 'config.js',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return c.addAll(ASSETS.map(function(u){ return new Request(u, { cache: 'reload' }); }));
    }).then(function(){ return self.skipWaiting(); }).catch(function(){})
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(ks){
      return Promise.all(ks.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;   // CDN de fuentes, Supabase… → red normal

  e.respondWith(
    caches.match(req).then(function(cached){
      var net = fetch(req).then(function(res){
        if (res && res.ok && res.type === 'basic'){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return res;
      }).catch(function(){
        // sin red: cae al caché; si es una navegación sin caché, sirve la portada
        return cached || (req.mode === 'navigate' ? caches.match('index.html') : undefined);
      });
      return cached || net;
    })
  );
});
