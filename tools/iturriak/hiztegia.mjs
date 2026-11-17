#!/usr/bin/env node
/* ── Vocabulario de los libros → Hiztegia ─────────────────────────────────
   Lleva al Hiztegia (armairua-a1-data.js) las palabras de los bloques
   «hiztegia» de las unidades personales de pribatua/ (carpeta local, fuera
   del repositorio), con un tema por lección («Bakarka 1 · 2. Zer da hau?»)
   y src:"bk1". Solo pasan palabras sueltas con su traducción.

   node tools/iturriak/hiztegia.mjs            → muestra lo que añadiría
   node tools/iturriak/hiztegia.mjs --escribir → lo añade

   Solo AÑADE al final: nunca cambia ni renumera lo que ya está, porque el
   progreso de cada palabra se guarda por su posición (i). Si una palabra ya
   está en su tema con la misma traducción, no se repite. Una palabra igual
   (euskera + traducción) a otra de otro tema comparte ficha con ella: la
   app las une sola (CANON en a1.html), así que no cuenta doble.
   Después hay que actualizar los totales que se muestran (npm run
   test:rapido dice cuáles) y subir la versión de sw.js.
   ───────────────────────────────────────────────────────────────────── */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const WRITE = process.argv.includes('--escribir');
const FUENTES = [
  { file: 'pribatua/armairua-a1-bakarka1-data.js', src: 'bakarka1', code: 'bk1', name: u => 'Bakarka 1 · ' + u.n + '. ' + u.eu }
];

const DATA = path.join(ROOT, 'armairua-a1-data.js');
const text = fs.readFileSync(DATA, 'utf8');
const at = text.indexOf('var A1_DATA = ');
const head = text.slice(0, at), json = text.slice(at + 'var A1_DATA = '.length).replace(/;\s*$/, '');
const D = JSON.parse(json);

/* mismo formato que el fichero (json.dumps de Python: «, » y «: ») */
function ser(v){
  if (Array.isArray(v)) return '[' + v.map(ser).join(', ') + ']';
  if (v && typeof v === 'object') return '{' + Object.keys(v).map(k => JSON.stringify(k) + ': ' + ser(v[k])).join(', ') + '}';
  return JSON.stringify(v);
}
if (ser(D) !== json.trim()) { console.error('✗ No reconozco el formato de armairua-a1-data.js: no lo toco.'); process.exit(1); }

const key = (eu, es) => eu.toLowerCase().trim() + '|' + es.toLowerCase().trim();
let added = 0, themes = 0;
for (const F of FUENTES) {
  if (!fs.existsSync(path.join(ROOT, F.file))) { console.log('· ' + F.file + ' no está en este ordenador: nada que añadir.'); continue; }
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, F.file), 'utf8'), ctx);
  for (const u of ctx.A1_ITURRIAK.unitateak.filter(u => u.src === F.src)) {
    const words = u.atalak.filter(a => a.mota === 'hiztegia').flatMap(a => a.hitzak);
    if (!words.length) continue;
    const tn = F.name(u);
    let t = D.t.indexOf(tn);
    if (t < 0) { t = D.t.length; D.t.push(tn); themes++; console.log('+ tema ' + t + ': ' + tn); }
    const have = new Set(D.w.filter(w => w.t === t).map(w => key(w.eu, w.es)));
    for (const [eu, es] of words) {
      if (have.has(key(eu, es))) continue;
      have.add(key(eu, es));
      D.w.push({ i: D.w.length, eu, es, t, src: F.code });
      added++;
    }
  }
}
const uniq = new Set(D.w.map(w => key(w.eu, w.es))).size;
console.log(`${added} palabras nuevas en ${themes} temas nuevos · total ${D.w.length} entradas, ${uniq} palabras distintas.`);
if (!added && !themes) process.exit(0);
if (!WRITE) { console.log('(prueba: añade --escribir para guardarlo)'); process.exit(0); }
fs.writeFileSync(DATA, head + 'var A1_DATA = ' + ser(D) + ';\n');
console.log('✔ armairua-a1-data.js actualizado.');
