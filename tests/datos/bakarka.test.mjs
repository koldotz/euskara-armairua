// Grupo «Hiztegia · Bakarka» (importado de artifacts con tools/fitxak/bakarka.mjs):
// bakarka-hiztegia.html + .json y las dos síntesis (bakarka-1/3-sintesia.html).
// De los libros comerciales se publica vocabulario suelto, resúmenes propios y
// citas breves, nunca el texto (norma de procedencia). Si una reimportación trae
// frases en el hiztegia, más de 3 citas por texto o textos sin resumen, esto la para.
import fs from 'fs';
import path from 'path';

export default async function(t){
  const read = f => fs.readFileSync(path.join(t.root, f), 'utf8');
  const words = s => String(s).replace(/<[^>]+>/g, ' ').replace(/…/g, ' ').split(/\s+/).filter(Boolean).length;
  const limpio = (html, f) => {
    t.ok(!/claude\.ai\/artifact|target="_blank"/.test(html), f + ': no enlaza artifacts privados ni abre pestañas nuevas');
    t.ok(/&#9888; Claude/.test(html), f + ': el pie lleva el aviso de procedencia (⚠ Claude)');
  };

  // ── hiztegia: palabras sueltas
  const html = read('bakarka-hiztegia.html');
  let d = null;
  try { d = JSON.parse(read('bakarka-hiztegia.json')); } catch (e) {}
  t.ok(d && Array.isArray(d.entries), 'bakarka-hiztegia.json se lee');
  if (d) {
    t.ok(d.entries.length === d.meta.n, `entries cuadra con meta.n (${d.entries.length})`);
    t.ok(new Set(d.entries.map(e => e.id)).size === d.entries.length, 'ids de palabra únicos');
    const largas = d.entries.filter(e => words(e.eu) > 4).map(e => e.eu);
    t.ok(!largas.length, 'ninguna entrada del hiztegia es una frase (más de 4 palabras)' + (largas.length ? ': ' + largas.slice(0, 3).join(' | ') : ''));
    const ej = (d.determiners || []).filter(r => words(r[3]) > 4).map(r => r[3]);
    t.ok(!ej.length, 'los ejemplos de determinantes son sintagmas, no frases' + (ej.length ? ': ' + ej.join(' | ') : ''));
  }
  t.ok(html.includes("fetch('bakarka-hiztegia.json')"), 'el hiztegia pide su fichero de datos');
  limpio(html, 'bakarka-hiztegia.html');

  // ── síntesis: resúmenes propios y como mucho 3 citas breves por texto
  for (const n of ['1', '3']) {
    const f = `bakarka-${n}-sintesia.html`, h = read(f);
    limpio(h, f);
    t.ok(/las frases clave y parte de los ejemplos son citas breves del libro/.test(h), f + ': el pie dice que las frases clave son citas del libro');
    let S = null;
    try { S = JSON.parse(h.match(/<script type="application\/json" id="bk-data">([\s\S]*?)<\/script>/)[1]); } catch (e) {}
    t.ok(S && Array.isArray(S.L) && S.L.length, f + ': los datos de las lecciones se leen');
    if (!S) continue;
    const textos = S.L.flatMap(l => [...(l.elk || []), ...(l.irak || [])]);
    const sin = textos.filter(x => !x.sin || !x.sin_eu).map(x => x.t);
    t.ok(!sin.length, f + `: los ${textos.length} textos llevan resumen en castellano y laburpena` + (sin.length ? ' — faltan: ' + sin.slice(0, 3).join(' | ') : ''));
    const muchas = textos.filter(x => (x.fr || []).length > 3).map(x => x.t);
    t.ok(!muchas.length, f + ': como mucho 3 frases clave por texto' + (muchas.length ? ' — ' + muchas.join(' | ') : ''));
    const largas = textos.flatMap(x => (x.fr || []).map(r => r[0])).filter(s => words(s) > 10);
    t.ok(!largas.length, f + ': las frases clave son cortas (10 palabras como mucho)' + (largas.length ? ' — ' + largas.slice(0, 2).join(' | ') : ''));
  }
}
