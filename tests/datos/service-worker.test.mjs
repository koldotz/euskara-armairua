// El service worker precachea lo necesario para usar la web sin conexión:
// todo lo que lista debe existir, y todo lo local que cargan las páginas debe
// estar en la lista (si no, esa página se rompe sin conexión).
import fs from 'fs';
import path from 'path';

export default async function(t){
  const sw = fs.readFileSync(path.join(t.root, 'sw.js'), 'utf8');
  t.ok(/var CACHE = 'armairua-v\d+';/.test(sw), 'sw.js tiene versión de caché (' + (sw.match(/armairua-v\d+/) || [''])[0] + ')');
  const ASSETS = new Function('return ' + sw.match(/var ASSETS = (\[[\s\S]*?\]);/)[1])();
  const missing = ASSETS.filter(f => !fs.existsSync(path.join(t.root, f)));
  t.ok(!missing.length, 'todos los ficheros precacheados existen' + (missing.length ? ': faltan ' + missing.join(', ') : ''));
  const pages = ASSETS.filter(f => f.endsWith('.html'));
  const onDisk = fs.readdirSync(t.root).filter(f => f.endsWith('.html'));
  t.ok(onDisk.every(p => pages.includes(p)), 'todas las páginas .html de la raíz están precacheadas');
  for (const p of pages) {
    const h = fs.readFileSync(path.join(t.root, p), 'utf8');
    const refs = [...h.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"#?]+)[^"]*"/g)].map(m => m[1]).filter(u => !/^(https?:|data:|\/\/)/.test(u));
    const out = refs.filter(r => !ASSETS.includes(r));
    t.ok(!out.length, p + ': todo lo local que carga está precacheado' + (out.length ? ' — falta: ' + out.join(', ') : ''));
  }
}
