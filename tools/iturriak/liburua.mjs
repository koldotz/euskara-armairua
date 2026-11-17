#!/usr/bin/env node
/* ── Tu copia del libro, al lado de las hojas de respuestas ───────────────
   Las hojas de respuestas (armairua-a1-arian-orria.js) no llevan el texto
   del libro: se trabaja con el libro delante. Para no depender del libro en
   papel, este script ENLAZA tu propio PDF y tus audios dentro de pribatua/
   (carpeta local, ignorada por git) y escribe el índice que usa el visor
   (armairua-koadernoa-liburua.js, que solo se carga en local):

     pribatua/arian-a1/liburua.pdf      → enlace a tu PDF (y a los PDF sueltos con páginas que le faltan)
     pribatua/arian-a1/audio/NNN.mp3    → enlaces a tus pistas
     pribatua/arian-a1/index.js         → qué página del PDF es cada página impresa

   node tools/iturriak/liburua.mjs               → dice lo que haría
   node tools/iturriak/liburua.mjs --escribir    → lo hace
     --pdf <ruta>      otro PDF (por defecto, el de Documentos/EUS/A1)
     --audio <carpeta> otra carpeta de pistas (ficheros «NNN- ….mp3»)
     --kopiatu         copia los ficheros en vez de enlazarlos

   No copia ni convierte nada del libro: son enlaces a ficheros que ya son
   tuyos. Nada de pribatua/ entra en el repositorio ni en la web publicada.
   ───────────────────────────────────────────────────────────────────── */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const WRITE = args.includes('--escribir'), COPY = args.includes('--kopiatu');
const opt = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const EUS = path.join(os.homedir(), 'Documents', 'EUS');

/* mapa: [página del PDF desde, hasta, desfase] → página impresa = página del PDF + desfase.
   El escaneado no trae todas las páginas (faltan portadas de unidad y alguna suelta),
   por eso el desfase va creciendo. */
const LIBURUAK = {
  arian: {
    izena: 'Arian A1', dir: 'pribatua/arian-a1',
    pdf: opt('--pdf') || path.join(EUS, 'A1', 'Arian-A1-Ikaslearen liburua osoa.pdf'),
    audio: opt('--audio') || path.join(EUS, 'HEO DOCS', 'HEO 4', 'A1', 'Arian A1', 'arian audioak'),
    mapa: [[6, 28, 7], [29, 52, 8], [53, 75, 9], [76, 92, 10], [93, 96, 11], [97, 109, 13], [110, 128, 14],
           [129, 148, 15], [149, 167, 17], [168, 186, 18], [187, 203, 21], [204, 226, 22], [227, 249, 23]],
    /* otros PDF tuyos con páginas que al libro entero le faltan: la unidad 10 suelta trae la 205–207 */
    gehigarriak: [
      { izena: '10-unitatea.pdf', pdf: path.join(EUS, 'HEO DOCS', 'HEO 3', 'A2', 'A2', 'Herria ala hiria Arian 1.pdf'), mapa: [[1, 3, 204]] }
    ]
  }
};

function put(src, dst){
  if (!WRITE) return;
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  try { fs.unlinkSync(dst); } catch (e) {}
  if (COPY) fs.copyFileSync(src, dst); else fs.symlinkSync(src, dst);
}

for (const [key, b] of Object.entries(LIBURUAK)) {
  const dir = path.join(ROOT, b.dir), out = { izena: b.izena, mapa: b.mapa, audioak: {} };
  console.log(`\n${b.izena} → ${b.dir}/`);
  if (fs.existsSync(b.pdf)) {
    put(b.pdf, path.join(dir, 'liburua.pdf')); out.pdf = b.dir + '/liburua.pdf';
    const last = b.mapa[b.mapa.length - 1];
    console.log(`  PDF: ${b.pdf}\n       páginas impresas ${b.mapa[0][0] + b.mapa[0][2]}–${last[1] + last[2]} en ${b.mapa.length} tramos`);
  } else console.log(`  PDF: no está en ${b.pdf} (usa --pdf <ruta>)`);
  (b.gehigarriak || []).forEach(g => {
    if (!fs.existsSync(g.pdf)) { console.log(`  PDF suelto: no está ${g.pdf}`); return; }
    put(g.pdf, path.join(dir, g.izena));
    (out.gehigarriak = out.gehigarriak || []).push({ pdf: b.dir + '/' + g.izena, mapa: g.mapa });
    console.log(`  PDF suelto: ${path.basename(g.pdf)} → páginas impresas ${g.mapa.map(m => (m[0] + m[2]) + '–' + (m[1] + m[2])).join(', ')}`);
  });
  if (fs.existsSync(b.audio)) {
    const mp3 = fs.readdirSync(b.audio).filter(f => /^\d{1,3}\b.*\.mp3$/i.test(f)).sort();
    mp3.forEach(f => { const n = parseInt(f, 10), name = String(n).padStart(3, '0') + '.mp3';
      put(path.join(b.audio, f), path.join(dir, 'audio', name)); out.audioak[n] = b.dir + '/audio/' + name; });
    const ns = Object.keys(out.audioak).map(Number);
    console.log(`  audio: ${mp3.length} pistas` + (ns.length ? ` (de la ${Math.min(...ns)} a la ${Math.max(...ns)})` : ''));
  } else console.log(`  audio: no hay carpeta ${b.audio} (usa --audio <carpeta>)`);
  if (WRITE && (out.pdf || out.gehigarriak || Object.keys(out.audioak).length)) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.js'),
      '/* Índice de tu copia del libro (lo escribe tools/iturriak/liburua.mjs). Solo en local: no se publica. */\n' +
      'window.A1_LIBURUA = window.A1_LIBURUA || {};\nwindow.A1_LIBURUA.' + key + ' = ' + JSON.stringify(out) + ';\n');
  }
}
console.log(WRITE ? `\nHecho (${COPY ? 'copiados' : 'enlazados'}). Abre la app en local: las hojas ofrecen «📖 página» y «▶ pista».` : '\nNada escrito. Añade --escribir para hacerlo.');
