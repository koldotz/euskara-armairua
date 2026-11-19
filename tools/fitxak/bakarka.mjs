// Integra en euskara-armairua los tres artifacts de vocabulario y libros de Bakarka
// (grupo «Hiztegia · Bakarka» de la portada; ver tools/README.md, sección fitxak/):
//   Bakarka · hiztegia     claude.ai/artifact/MuSaLbS1TWnkcYmhh14X4N → bakarka-hiztegia.html + bakarka-hiztegia.json
//   Bakarka 1 · síntesis   claude.ai/artifact/Ps5ia2R6FHRuG7rDKPcJhY → bakarka-1-sintesia.html
//   Bakarka 3 · síntesis   claude.ai/artifact/6vNeXq6GBbJVDWehBMmJoZ → bakarka-3-sintesia.html
// Uso: node tools/fitxak/bakarka.mjs <carpeta> .
//   <carpeta>/hiztegia.html y hiztegia.json (página del artifact y su fichero «hiztegia.json»),
//   <carpeta>/bakarka-1.html y bakarka-3.html (página de cada síntesis)
import fs from 'fs';
import path from 'path';

const [, , S, REPO] = process.argv;
if (!S || !REPO) { console.error('uso: node tools/fitxak/bakarka.mjs <carpeta> <repo>'); process.exit(1); }

/* artifacts que ya están en el sitio (los demás enlaces a claude.ai hacen fallar la importación) */
const LOCAL = {
  '4QV4TTtHHzWCoYDPhKAbDm': 'kasuen-zuhaitza.html',
  '6FapFZiPSA2VPF3gerYTiR': 'nire-herria.html',
  'Lb8BcM7HF2J9zQeJG9Wujm': 'nor-naiz.html',
  'MuSaLbS1TWnkcYmhh14X4N': 'bakarka-hiztegia.html',
  'Ps5ia2R6FHRuG7rDKPcJhY': 'bakarka-1-sintesia.html',
  '6vNeXq6GBbJVDWehBMmJoZ': 'bakarka-3-sintesia.html',
};
const DESC = {
  'bakarka-hiztegia.html': 'Bakarka · hiztegia — fichero con el léxico de Bakarka 1 y Bakarka 3: cada palabra con su traducción, sus rasgos y sus formas (declinación, tiempos, grados), más las piezas fijas.',
  'bakarka-1-sintesia.html': 'Bakarka 1 · síntesis — las catorce lecciones del libro resumidas: teoría con ejemplos, error típico, vocabulario y los diálogos y lecturas contados en castellano y en euskera sencillo.',
  'bakarka-3-sintesia.html': 'Bakarka 3 · síntesis — las nueve lecciones del libro resumidas: auxiliares completos, relativo, causales, concesivas y condicionales, sufijos, y los diálogos y lecturas contados en castellano y en euskera sencillo.',
};
const HEAD = file => `<meta name="description" content="${DESC[file]}">
<meta name="theme-color" content="#171B18">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icon-192.png">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="icon" href="icon-192.png" type="image/png" sizes="192x192">`;
const AVISO = {
  hiztegia: '<span>&#9888; Claude · por contrastar: las palabras son de los libros (sueltas, sin frases); traducciones, rasgos, formas generadas y explicaciones las ha preparado Claude, sin revisar todavía por un hablante.</span>',
  sintesia: '<span>&#9888; Claude · por contrastar: resúmenes, explicaciones y laburpenak preparados por Claude, sin revisar todavía por un hablante.</span>',
};

function cambia(html, de, a, n = 1){
  const k = html.split(de).length - 1;
  if (k !== n) throw new Error(`se esperaba ${n} vez «${de.slice(0, 70)}» y aparece ${k}`);
  return html.split(de).join(a);
}

function comun(html, file){
  if (!html.startsWith('<!DOCTYPE html>\n<html lang="es">')) throw new Error(file + ': cabecera inesperada');
  html = html.replace(/<meta name="claude:viewport-fit-sides" content="cover">\n?/, '');
  html = cambia(html, '<title>', HEAD(file) + '\n<title>');
  // ruta: portada y grupo «Hiztegia · Bakarka», en la misma pestaña
  html = cambia(html, '<a href="https://koldotz.github.io/euskara-armairua/index.html" target="_blank" rel="noopener">Euskara Armairua</a>', '<a href="index.html">Euskara Armairua</a>');
  html = cambia(html, '<span>Libros</span>', '<a href="index.html#hiztegiak">Hiztegia · Bakarka</a>');
  // enlaces a artifacts ya integrados → página del sitio, sin pestaña nueva ni flecha
  html = html.replace(/<a ([^>]*?)href="https:\/\/claude\.ai\/artifact\/([A-Za-z0-9]{22})(#[^"]*)?"([^>]*)>([\s\S]*?)<\/a>/g, (m, pre, id, hash, post, text) => {
    if (!LOCAL[id]) throw new Error(file + ': artifact sin página en el sitio: ' + id);
    const attrs = (pre + post).replace(/\s*target="_blank"/, '').replace(/\s*rel="noopener"/, '').trim();
    return `<a ${attrs ? attrs + ' ' : ''}href="${LOCAL[id]}${hash || ''}">${text.replace(/\s*↗$/, '')}</a>`;
  });
  return html;
}

function comprobar(html, file){
  const resto = html.match(/https:\/\/(claude\.ai|koldotz\.github\.io)[^"' ]*/g);
  if (resto) throw new Error(file + ': quedan enlaces externos al proyecto: ' + resto.join(', '));
  if (/target="_blank"/.test(html)) throw new Error(file + ': queda un target=_blank');
}

const out = {};

/* ── 1. El hiztegia (página + JSON) ── */
{
  const file = 'bakarka-hiztegia.html';
  let html = comun(fs.readFileSync(path.join(S, 'hiztegia.html'), 'utf8'), file);
  html = cambia(html, "fetch('hiztegia.json')", "fetch('bakarka-hiztegia.json')");
  html = cambia(html, '</footer>', '  ' + AVISO.hiztegia + '\n</footer>');
  comprobar(html, file);
  out[file] = html;
  const raw = fs.readFileSync(path.join(S, 'hiztegia.json'), 'utf8');
  const d = JSON.parse(raw);
  if (!Array.isArray(d.entries) || d.entries.length !== d.meta.n) throw new Error('hiztegia.json: entries no cuadra con meta.n');
  out['bakarka-hiztegia.json'] = raw;
}

/* ── 2. Las dos síntesis ── */
for (const [n, other] of [['1', '3'], ['3', '1']]) {
  const file = `bakarka-${n}-sintesia.html`;
  let html = comun(fs.readFileSync(path.join(S, `bakarka-${n}.html`), 'utf8'), file);
  // de un libro a su hiztegia y al otro libro (las fichas del árbol ya van enlazadas)
  html = cambia(html, '<p class="mast-links">', `<p class="mast-links"><a href="bakarka-hiztegia.html">Bakarka · hiztegia</a><a href="bakarka-${other}-sintesia.html">Bakarka ${other} · síntesis</a>`);
  // el pie decía «no copiados»: las frases clave y parte de los ejemplos son citas breves del libro
  html = cambia(html, 'Los textos están resumidos, no copiados.', 'Los textos están resumidos; las frases clave y parte de los ejemplos son citas breves del libro.');
  html = cambia(html, '</footer>', '  ' + AVISO.sintesia + '\n</footer>');
  if (!/<script type="application\/json" id="bk-data">/.test(html)) throw new Error(file + ': no encuentro los datos (bk-data)');
  comprobar(html, file);
  out[file] = html;
}

for (const [f, s] of Object.entries(out)) { fs.writeFileSync(path.join(REPO, f), s); console.log('escrito', f, s.length); }
