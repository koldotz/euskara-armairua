#!/usr/bin/env node
/* ── Generador de las gafas de Geruzak ────────────────────────────────────
   Construye armairua-geruzak-betaurrekoak.js a partir de:
     morf.mjs   tipos de pieza (MOTA) e inventario de morfemas (M)
     words.mjs  el diccionario de formas (W), con generadores de paradigmas
     extra.mjs  formas que también son castellanas (STOP) y frases (F)
   Antes de escribir valida que cada pieza use un morfema de M y que las
   piezas reconstruyan la palabra; si algo falla, no escribe nada.

   node tools/geruzak/build.mjs           regenera el fichero
   node tools/geruzak/build.mjs --check   solo comprueba que el publicado está al día
   ───────────────────────────────────────────────────────────────────── */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MOTA, M } from './morf.mjs';
import { W as W0 } from './words.mjs';
import { STOP, F } from './extra.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const OUT = path.join(ROOT, 'armairua-geruzak-betaurrekoak.js');
const reads = v => Array.isArray(v[0]) ? v : [v];

/* errores de coherencia del diccionario (vacío = todo bien) */
export function validate(W = W0){
  const errs = [];
  for (const [k, v] of Object.entries(W)) {
    for (const r of reads(v)) {
      if (typeof r[0] !== 'string' || typeof r[1] !== 'string') { errs.push(k + ': formato'); continue; }
      let surf = '';
      for (const piece of r[1].split('|')) {
        const m = piece.match(/^(.*):([A-Z0-9]+)$/);
        if (m && !M[m[2]]) errs.push(k + ': morfema desconocido ' + m[2]);
        if (m && !MOTA[M[m[2]] && M[m[2]][0]]) errs.push(k + ': tipo desconocido en ' + m[2]);
        surf += m ? m[1] : piece.split('=')[0];
      }
      if (surf.toLowerCase().replace(/-/g, '') !== k.toLowerCase().replace(/-/g, '')) errs.push(k + ': las piezas forman «' + surf + '»');
    }
  }
  return errs;
}

/* el texto completo del fichero de datos */
export function generate(){
  // contracciones del castellano en las glosas generadas: «a el» → «al», «de el» → «del»
  const fix = g => g.replace(/\b(a|de) el\b/g, (m, p) => p === 'a' ? 'al' : 'del');
  const W = {};
  for (const k of Object.keys(W0)) W[k] = Array.isArray(W0[k][0]) ? W0[k].map(r => [fix(r[0]), r[1]]) : [fix(W0[k][0]), W0[k][1]];
  const J = x => JSON.stringify(x);
  const L = [];
  L.push('/* ─────────────────────────────────────────────────────────────────────');
  L.push('   Geruzak · «Ikasteko betaurrekoak» (gafas de aprendizaje)');
  L.push('   Fichero GENERADO por tools/geruzak/build.mjs: no lo edites a mano;');
  L.push('   cambia tools/geruzak/words.mjs (o morf.mjs, extra.mjs) y regenera.');
  L.push('   Datos del modo de visualización de geruzak.html: cada forma vasca de la');
  L.push('   guía con su traducción y su desglose en morfemas.');
  L.push('     mota : tipos de pieza → [nombre vasco, descripción, etiqueta corta]');
  L.push('     m    : morfemas → [mota, forma, explicación, bloque de la guía]');
  L.push('     w    : forma → [glosa, piezas] o varias lecturas [[glosa, piezas], …]');
  L.push('            piezas separadas por «|»: «etxe=casa» raíz · «ta:TA» morfema de m');
  L.push('     stop : formas que también son palabras castellanas (su, da, ni, al…):');
  L.push('            solo se desglosan dentro de una frase vasca');
  L.push('     f    : traducción de frases vascas que en la guía no la llevan');
  L.push('   Desglose preparado con ayuda de IA: revísalo con las tablas de la guía.');
  L.push('   ───────────────────────────────────────────────────────────────────── */');
  L.push('var GERUZAK_BETAURREKOAK = {');
  L.push('mota: {');
  L.push(Object.entries(MOTA).map(([k, v]) => '  ' + k + ': ' + J(v)).join(',\n'));
  L.push('},');
  L.push('m: {');
  L.push(Object.entries(M).map(([k, v]) => '  ' + k + ': ' + J(v)).join(',\n'));
  L.push('},');
  L.push('w: {');
  L.push(Object.keys(W).sort((a, b) => a.localeCompare(b, 'eu')).map(k => '  ' + J(k) + ': ' + J(W[k])).join(',\n'));
  L.push('},');
  L.push('stop: ' + J(STOP.slice().sort()) + ',');
  L.push('f: {');
  L.push(Object.entries(F).map(([k, v]) => '  ' + J(k) + ': ' + J(v)).join(',\n'));
  L.push('}');
  L.push('};');
  return L.join('\n') + '\n';
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errs = validate();
  if (errs.length) { console.error('✘ ' + errs.length + ' errores en el diccionario:\n  ' + errs.join('\n  ')); process.exit(1); }
  const text = generate();
  if (process.argv.includes('--check')) {
    const same = fs.existsSync(OUT) && fs.readFileSync(OUT, 'utf8') === text;
    console.log(same ? '✔ armairua-geruzak-betaurrekoak.js está al día' : '✘ armairua-geruzak-betaurrekoak.js no coincide con el generador: ejecuta node tools/geruzak/build.mjs');
    process.exit(same ? 0 : 1);
  }
  fs.writeFileSync(OUT, text);
  console.log('✔ escrito ' + path.relative(ROOT, OUT) + ' · ' + Object.keys(W0).length + ' formas · ' + Buffer.byteLength(text) + ' bytes');
}
