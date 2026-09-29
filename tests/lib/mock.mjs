// Servidor de prueba: sirve el repositorio y emula la API de Supabase
// (POST /rest/v1/rpc/<función>) ejecutando el SQL real en PGlite.
//   · /config.js apunta al propio servidor (nunca al Supabase de verdad)
//   · /sw.js da 404: en las pruebas no hay service worker ni caché
//   · down(true) simula que el banco de perfiles no responde (503)
// Uso suelto, para probar a mano en el navegador:  node tests/lib/mock.mjs [puerto]
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { newDb } from './db.mjs';

const TYPES = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.mjs':'text/javascript; charset=utf-8',
  '.css':'text/css', '.json':'application/json', '.png':'image/png', '.svg':'image/svg+xml',
  '.webmanifest':'application/manifest+json', '.pdf':'application/pdf', '.md':'text/markdown; charset=utf-8' };
// argumentos de cada función, en orden
const RPC = { armairua_zerrenda:[], armairua_bertsioa:[], armairua_sartu:['p_izena','p_pin'], armairua_gorde:['p_izena','p_pin','p_datuak'] };

export async function startMock({ root, port = 0 } = {}){
  const D = await newDb(root);
  let down = false;
  const log = [];
  const server = http.createServer(async (req, res) => {
    const u = new URL(req.url, 'http://x');
    if (u.pathname.startsWith('/rest/v1/rpc/')) {
      if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
      let body = ''; for await (const c of req) body += c;
      if (down) { res.writeHead(503); return res.end('{}'); }
      if (!req.headers.apikey) { res.writeHead(401); return res.end('{"message":"no apikey"}'); }
      const fn = u.pathname.split('/').pop(), names = RPC[fn];
      if (!names) { res.writeHead(404); return res.end('{"code":"PGRST202"}'); }
      try {
        const a = body ? JSON.parse(body) : {};
        const args = names.map(k => k === 'p_datuak' ? JSON.stringify(a[k] || {}) : a[k]);
        let out;
        if (fn === 'armairua_zerrenda') out = await D.q('select * from armairua_zerrenda()');
        else out = await D.one(`select ${fn}(${names.map((k, i) => '$' + (i + 1) + (k === 'p_datuak' ? '::jsonb' : '')).join(',')}) r`, args);
        log.push(fn + ' ' + (a.p_izena || ''));
        res.writeHead(200, { 'Content-Type':'application/json' });
        return res.end(JSON.stringify(out));
      } catch (e) { res.writeHead(500); return res.end(JSON.stringify({ message: e.message })); }
    }
    if (u.pathname === '/config.js') { res.writeHead(200, { 'Content-Type': TYPES['.js'] }); return res.end(`window.ARMAIRUA_CFG={url:"${url}",key:"sb_publishable_proba"};`); }
    if (u.pathname === '/sw.js') { res.writeHead(404); return res.end(''); }
    const f = path.join(root, decodeURIComponent(u.pathname === '/' ? '/index.html' : u.pathname));
    if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('no'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control':'no-store' });
    fs.createReadStream(f).pipe(res);
  });
  await new Promise(r => server.listen(port, '127.0.0.1', r));
  const url = 'http://localhost:' + server.address().port;
  return {
    url,
    sql: D.q,
    down: v => { down = !!v; },
    log: () => log.splice(0),
    close: () => new Promise(r => { server.closeAllConnections(); server.close(() => r()); })
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const m = await startMock({ root, port: Number(process.argv[2]) || 8766 });
  console.log('Servidor de prueba en ' + m.url + '  (Supabase emulado en memoria; Ctrl+C para salir)');
}
