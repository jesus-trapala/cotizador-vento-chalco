/* Vento Chalco · service worker
   · El HTML se pide SIEMPRE a la red primero: al publicar una versión nueva,
     la app instalada la toma al abrirse. La copia guardada solo se usa sin internet.
   · Solo se guardan archivos estáticos (íconos, fichas técnicas, manifest).
   · Nunca se toca nada de Google (Apps Script, Sheets): clientes y precios
     siempre llegan frescos.
   Al publicar, sube también el número de CACHE para limpiar lo viejo.      */
const CACHE = "vento-3.6";
const BASE = ["./", "./index.html", "./manifest.json", "./iconos/icono-192.png", "./iconos/icono-512.png", "./iconos/apple-touch-icon.png", "./iconos/icono-maskable-512.png"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).catch(() => {}));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k.startsWith("vento-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;   // Google, fuentes, librerías: directo a la red
  if (url.pathname.endsWith("version.json") || url.pathname.endsWith("sw.js")) return;

  const esHTML = req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith(".html");
  if (esHTML) {
    e.respondWith(
      fetch(req, { cache: "no-store" })
        .then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; })
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
    return;
  }
  // Estáticos (íconos, fichas): de la copia, y se refresca en segundo plano
  e.respondWith(
    caches.match(req).then(hit => {
      const red = fetch(req).then(r => {
        if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
        return r;
      }).catch(() => hit);
      return hit || red;
    })
  );
});
