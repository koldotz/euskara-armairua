#!/usr/bin/env node
/* ── Palabras candidatas para el Hiztegia ─────────────────────────────────
   Segundo paso al incorporar un material nuevo: de un texto en euskera (por
   ejemplo el texto.txt de tools/pdf), lista las formas que todavía no están
   en el vocabulario del A1, de más a menos frecuentes.

   node tools/hiztegia/berriak.mjs <texto.txt> [--min 2] [--todas]

   Es solo una criba: compara formas escritas, no lemas. «etxean» no está
   como tal aunque «etxe» sí, así que por defecto se descartan las formas que
   empiezan por una palabra ya conocida seguida de una terminación habitual
   (-a, -ak, -an, -ko, -tik, -ra, -rekin…). Con --todas se ven todas.
   La selección final, la traducción y el tema se deciden a mano (como se
   hizo con Mintzamena: ver src:"mz" en armairua-a1-data.js).
   ───────────────────────────────────────────────────────────────────── */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const get = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args.splice(i, 2)[1] : d; };
const MIN = Number(get('--min', 1));
const ALL = args.includes('--todas'); if (ALL) args.splice(args.indexOf('--todas'), 1);
if (!args[0]) { console.log('Uso: node tools/hiztegia/berriak.mjs <texto.txt> [--min 2] [--todas]'); process.exit(2); }

const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'armairua-a1-data.js'), 'utf8'), ctx);
const known = new Set();
ctx.A1_DATA.w.forEach(w => w.eu.toLowerCase().split(/[\s/,()·]+/).filter(Boolean).forEach(x => known.add(x)));

const ENDINGS = ['a', 'ak', 'ek', 'ari', 'ei', 'aren', 'en', 'an', 'ean', 'etan', 'tan', 'n', 'ra', 'era', 'etara', 'tara', 'tik', 'etik', 'etatik', 'tatik',
  'ko', 'eko', 'go', 'rekin', 'arekin', 'ekin', 'rentzat', 'arentzat', 'z', 'az', 'ez', 'rik', 'ik', 'ri', 'k', 'ren', 'ok'];
const derived = w => ENDINGS.some(e => w.endsWith(e) && known.has(w.slice(0, -e.length)));

const text = fs.readFileSync(args[0], 'utf8').replace(/===== PDF PAGE \d+ =====/g, ' ');
const freq = new Map();
for (const m of text.toLowerCase().matchAll(/[a-zñ]+(?:-[a-zñ]+)*/g)) {
  const w = m[0];
  if (w.length < 3 || known.has(w) || (!ALL && derived(w))) continue;
  freq.set(w, (freq.get(w) || 0) + 1);
}
const list = [...freq].filter(([, n]) => n >= MIN).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'eu'));
list.forEach(([w, n]) => console.log(String(n).padStart(4) + '  ' + w));
console.error('\n' + list.length + ' formas no están en el Hiztegia (' + known.size + ' formas conocidas). Ojo: el texto puede traer castellano; revisa la lista a mano.');
