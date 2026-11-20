// Enlaces internos: recoge todos los <a> de cada página y pestaña (también los
// que pintan los datos: plan, cuaderno, Mintzamena, Ostalaritza) y comprueba
// que el destino existe: la página o el PDF, el ancla (#id, pestaña o vista
// de Mintzamena) y, en los PDF, que #page=N no pase del número de páginas.
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const PAGES = [['index.html', ['']], ['a1.html', ['egutegia', 'hiztegia', 'koadernoa', 'mintzamena', 'mz-bilatu', 'jokoa']],
  ['a2.html', ['orokorra', 'materialak', 'koadernoa']], ['gramatika.html', ['']], ['glosario.html', ['']],
  ['geruzak.html', ['']], ['ikasgela.html', ['']],
  ['kasuen-zuhaitza.html', ['']], ['nire-herria.html', ['']], ['nor-naiz.html', ['']], ['esaldi-eraikitzailea.html', ['']], ['kasuak-aurkezpena.html', ['']], ['gramatika-sakonean.html', ['']], ['bakarka-hiztegia.html', ['']], ['bakarka-1-sintesia.html', ['']], ['bakarka-3-sintesia.html', ['']], ['buruko-neurona.html', ['']]];

/* páginas de un PDF: Spotlight en macOS; en otros sistemas no se comprueba */
function pdfPages(file){
  try { const n = parseInt(execFileSync('mdls', ['-raw', '-name', 'kMDItemNumberOfPages', file], { encoding: 'utf8' }), 10); return n > 0 ? n : null; }
  catch (e) { return null; }
}

/* ¿existe el destino del ancla en la página cargada? */
const TARGET_OK = `(function(h){
  if (!h) return true;
  if (document.getElementById(h)) return true;
  var app = document.getElementById('app-' + h);
  if (app && !app.hidden) return true;
  if (window.ARMAIRUA_HASH_OK && window.ARMAIRUA_HASH_OK(h)) return true;
  return false;
})`;

export default async function(t){
  const links = new Map();   // url relativa → dónde se ha visto
  const p = await t.tab({ width: 1280, height: 900 });
  for (const [page, hashes] of PAGES) {
    for (const h of hashes) {
      await p.go(t.base + '/' + page + (h ? '#' + h : ''), 1500);
      // Mintzamena: recorre también cada situación, que pinta sus propios enlaces
      const extra = page === 'a1.html' && h === 'mintzamena'
        ? JSON.parse(await p.ev(`JSON.stringify([].slice.call(document.querySelectorAll('#app-mintzamena a[href^="#mz-"]')).map(function(a){ return a.getAttribute('href').slice(1); }))`)) : [];
      for (const view of ['', ...new Set(extra)]) {
        if (view) { await p.ev(`location.hash = '${view}'`); await p.sleep(250); }
        const found = JSON.parse(await p.ev(`JSON.stringify([].slice.call(document.querySelectorAll('a[href]')).map(function(a){ return a.href; }).filter(function(u){ return u.indexOf(location.origin) === 0; }))`));
        for (const u of found) {
          const rel = u.slice(t.base.length + 1);
          if (!links.has(rel)) links.set(rel, page + (view ? '#' + view : h ? '#' + h : ''));
        }
      }
    }
  }
  await p.close();
  t.ok(links.size > 50, 'se han recogido ' + links.size + ' enlaces internos distintos');

  const bad = [], pagesCache = {};
  const q = await t.tab({ width: 1280, height: 900 });
  let loaded = null;
  // agrupados por página: se carga una vez y se cambia solo el ancla
  const sorted = [...links].sort((a, b) => a[0].localeCompare(b[0]));
  for (const [rel, from] of sorted) {
    const [file, hash = ''] = rel.split('#');
    const fpath = decodeURIComponent((file || '').split('?')[0]) || 'index.html';
    const disk = path.join(t.root, fpath);
    if (!fs.existsSync(disk)) { bad.push(rel + ' (desde ' + from + '): el fichero no existe'); continue; }
    if (fpath.endsWith('.pdf')) {
      const m = /^page=(\d+)$/.exec(hash);
      if (m) {
        const n = pagesCache[fpath] ??= pdfPages(disk);
        if (n && (+m[1] < 1 || +m[1] > n)) bad.push(rel + ' (desde ' + from + '): el PDF tiene ' + n + ' páginas');
      }
      continue;
    }
    if (!fpath.endsWith('.html') || !hash) continue;
    if (loaded !== fpath) { await q.go(t.base + '/' + fpath + '#' + hash, 1200); loaded = fpath; }
    else { await q.ev(`location.hash = ${JSON.stringify('#' + hash)}`); await q.sleep(120); }
    let ok = await q.ev(TARGET_OK + '(' + JSON.stringify(decodeURIComponent(hash)) + ')');
    // con la máquina cargada (npm test entero) el mural aún no ha preparado sus anclas a los 1,2 s: se mira otra vez
    if (ok !== true) { await q.sleep(1500); ok = await q.ev(TARGET_OK + '(' + JSON.stringify(decodeURIComponent(hash)) + ')'); }
    // las vistas de Mintzamena (#mz-…) y de Ostalaritza (#ost-…) no son ids: cada módulo guarda
    // la vista que ha pintado, y si la pedida no existe cae a su portada
    const LAST = /^mz-/.test(hash) ? 'euskara-a1-mz-last' : /^ost-/.test(hash) ? 'euskara-a2-mat-last' : null;
    const viewOk = LAST ? (await q.ev(`localStorage.getItem('${LAST}')`)) === hash : false;
    if (ok !== true && !viewOk) bad.push(rel + ' (desde ' + from + '): el ancla #' + hash + ' no lleva a nada');
  }
  await q.close();
  t.ok(!bad.length, 'todos los enlaces internos llevan a su destino' + (bad.length ? ' — ' + bad.length + ' rotos: ' + bad.slice(0, 8).join(' ;; ') : ''));
}
