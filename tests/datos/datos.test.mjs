// Integridad de los ficheros de datos y coherencia de las cifras que se muestran.
import fs from 'fs';
import path from 'path';
import vm from 'vm';

export default async function(t){
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
  for (const f of ['armairua-a1-data.js', 'armairua-esaldiak-data.js', 'armairua-a1-mintzamena-data.js', 'armairua-a2-ostalaritza-data.js', 'armairua-a1-plan.js', 'armairua-geruzak-betaurrekoak.js']) {
    try { vm.runInContext(fs.readFileSync(path.join(t.root, f), 'utf8'), ctx, { filename: f }); t.ok(true, f + ' se carga'); }
    catch (e) { t.ok(false, f + ' no se carga: ' + e.message); }
  }

  // ── Hiztegia A1
  const D = ctx.A1_DATA, W = D.w;
  t.ok(W.every((w, i) => w.i === i), 'A1_DATA: cada palabra tiene i = su posición (el progreso se guarda por i)');
  t.ok(W.every(w => w.eu && w.eu.trim() && w.es && w.es.trim()), 'A1_DATA: ninguna palabra sin euskera o sin traducción');
  t.ok(W.every(w => Number.isInteger(w.t) && w.t >= 0 && w.t < D.t.length), 'A1_DATA: todos los temas existen');
  const uniq = new Set(W.map(w => w.eu.toLowerCase().trim() + '|' + w.es.toLowerCase().trim())).size;
  const shown = String(uniq).replace(/\B(?=(\d{3})+$)/g, '.');           // 1.239
  for (const [f, re] of [['index.html', /Hiztegia — ([\d.]+) hitz/], ['a1.html', /id="hzEyebrow">Hiztegia · A1 · ([\d.]+) hitz/], ['README.md', /Hiztegia \(([\d.]+) palabras[,)]/]]) {
    const m = fs.readFileSync(path.join(t.root, f), 'utf8').match(re);
    t.ok(m && m[1] === shown, `${f} muestra el total real de palabras distintas (${shown}): ${m ? m[1] : 'no encontrado'}`);
  }
  const tot = fs.readFileSync(path.join(t.root, 'a1.html'), 'utf8').match(/<b id="stTot">(\d+)<\/b>/);
  t.ok(tot && Number(tot[1]) === uniq, 'a1.html: el «Total» inicial coincide (' + (tot && tot[1]) + ')');

  // ── Esaldiak
  const E = ctx.A1_ESALDIAK;
  t.ok(Array.isArray(E) && E.length > 100 && E.every(e => e.es && e.eu && e.k && Array.isArray(e.m) && e.m.length), 'A1_ESALDIAK: frases con es, eu, etiqueta y análisis');
  t.ok(new Set(E.map(e => e.eu.toLowerCase())).size === E.length, 'A1_ESALDIAK: sin frases repetidas');

  // ── Mintzamena
  const MZ = ctx.A1_MINTZAMENA;
  const sits = (MZ && MZ.b || []).flatMap(b => b.s || []);
  t.ok(sits.length >= 40, 'A1_MINTZAMENA: ' + sits.length + ' situaciones');
  const ids = sits.map(s => s.id).filter(Boolean);
  t.ok(ids.length === sits.length && new Set(ids).size === ids.length, 'A1_MINTZAMENA: cada situación con id único');

  t.ok(MZ.pdf && fs.existsSync(path.join(t.root, MZ.pdf)), 'el PDF de Mintzamena existe: ' + MZ.pdf);

  const A2 = ctx.A2_OSTALARITZA;
  t.ok(A2 && Array.isArray(A2.units) && A2.units.length === 20, 'A2_OSTALARITZA: 20 unidades');
  t.ok(A2 && A2.dir && fs.existsSync(path.join(t.root, A2.dir)), 'la carpeta de PDF de Ostalaritza existe: ' + (A2 && A2.dir));
}
