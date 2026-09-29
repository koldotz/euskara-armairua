#!/usr/bin/env node
/* ── Pruebas de Euskara Armairua ──────────────────────────────────────────
   node tests/run.mjs            todas
   node tests/run.mjs sql unit   solo las que contengan «sql» o «unit» en su ruta
   node tests/run.mjs -v         mostrando también las que pasan

   Carpetas:  sql/   el SQL de Supabase en PGlite (sin navegador)
              unit/  funciones sueltas del código de la web
              datos/ integridad de los ficheros de datos y del service worker
              e2e/   la web entera en Chrome sin ventana, con Supabase emulado
   Cada prueba exporta `default async function(t)` y comprueba con t.ok(cond, texto).
   ───────────────────────────────────────────────────────────────────── */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const args = process.argv.slice(2);
const VERBOSE = args.includes('-v');
const filters = args.filter(a => !a.startsWith('-'));

const files = ['sql', 'unit', 'datos', 'e2e']
  .flatMap(d => fs.existsSync(path.join(HERE, d)) ? fs.readdirSync(path.join(HERE, d)).filter(f => f.endsWith('.test.mjs')).sort().map(f => d + '/' + f) : [])
  .filter(f => !filters.length || filters.some(x => f.includes(x)));
if (!files.length) { console.log('Ninguna prueba coincide con: ' + filters.join(' ')); process.exit(1); }

let mock = null, chrome = null;
if (files.some(f => f.startsWith('e2e/'))) {
  const { startMock } = await import('./lib/mock.mjs');
  const { launchChrome } = await import('./lib/cdp.mjs');
  mock = await startMock({ root: ROOT });
  chrome = await launchChrome();
}
const { tab, sleep } = await import('./lib/cdp.mjs');

let total = 0, failed = 0;
const t0 = Date.now();
for (const f of files) {
  let pass = 0; const fails = [];
  const t = {
    root: ROOT, sleep,
    ok(cond, msg){ if (cond) { pass++; if (VERBOSE) console.log('    ✓ ' + msg); } else fails.push(msg); },
  };
  if (mock) {
    await mock.sql('delete from armairua_perfilak');
    mock.down(false);
    Object.assign(t, { base: mock.url, sql: mock.sql, down: mock.down, tab: opts => tab(chrome.ws, opts) });
  }
  const s = Date.now();
  try { await (await import(pathToFileURL(path.join(HERE, f)))).default(t); }
  catch (e) { fails.push('excepción: ' + String(e && e.stack || e).split('\n').slice(0, 3).join(' · ')); }
  total += pass + fails.length; failed += fails.length;
  console.log((fails.length ? '✘ ' : '✔ ') + f.padEnd(40) + String(pass + fails.length).padStart(4) + ' comprobaciones  ' + ((Date.now() - s) / 1000).toFixed(1) + ' s');
  fails.forEach(m => console.log('    ✗ ' + m));
}
if (chrome) chrome.close();
if (mock) await mock.close();
console.log('\n' + (failed ? '✘ ' + failed + ' de ' + total + ' comprobaciones fallan' : '✔ ' + total + ' comprobaciones, todas bien') + '  (' + ((Date.now() - t0) / 1000).toFixed(0) + ' s)');
process.exit(failed ? 1 : 0);
