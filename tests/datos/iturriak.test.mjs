// Etiquetas de procedencia: que ningún texto atribuya a un libro lo que ha
// preparado Claude, y que las transcripciones personales de libros (carpeta
// pribatua/, solo en local) no puedan llegar al repositorio ni a la web.
// Si pribatua/ existe en este ordenador, se comprueba además su coherencia.
import fs from 'fs';
import path from 'path';
import vm from 'vm';

export default async function(t){
  const read = f => fs.readFileSync(path.join(t.root, f), 'utf8');
  const a1 = read('a1.html'), sw = read('sw.js');

  // ── procedencia: nada atribuye a un libro lo que no es suyo
  const claims = [
    ['a1.html', /secuencia de <i>Bakarka 1<\/i>/, 'el pie del cuaderno'],
    ['a1.html', /vienen de los ejercicios del método|proceden de los ejercicios del método/, 'las notas de Irakurmena'],
    ['geruzak.html', /Apoyo<\/span><b>Bakarka|siguiendo la secuencia de <i>Bakarka/, 'la guía Geruzak'],
    ['index.html', /Bakarka 1<\/i> sekuentzian oinarrituta/, 'la portada'],
    ['armairua-esaldiak-data.js', /verificada\s+con el método/, 'los datos de Esaldiak']
  ];
  claims.forEach(([f, re, what]) => t.ok(!re.test(read(f)), `${what} ya no atribuye a un libro el contenido preparado por Claude`));
  t.ok(/armairua-iturriak\.js/.test(a1) && /armairua-koadernoa-iturriak\.js/.test(a1), 'a1.html carga las etiquetas y el módulo de procedencia del cuaderno');

  // ── las transcripciones de libros no se publican
  t.ok(/^pribatua\/$/m.test(read('.gitignore')), 'pribatua/ está en .gitignore (las transcripciones de libros no van al repositorio)');
  t.ok(!/pribatua|bakarka1-data|arian-data/.test(sw), 'sw.js no precachea transcripciones de libros');
  const at = a1.indexOf("'pribatua/armairua-a1-bakarka1-data.js'"), loader = a1.slice(a1.lastIndexOf('<script>', at), at);
  t.ok(!/<script[^>]+src="[^"]*(bakarka1|arian)-data\.js"/.test(a1) && at > 0 && /location\.hostname/.test(loader) && /if \(!local\) return;/.test(loader),
    'a1.html solo lee pribatua/ cuando se abre en local (en la web publicada ni se pide)');
  const pages = fs.readdirSync(t.root).filter(f => f.endsWith('.html'));
  const prom = pages.filter(f => /transcritas? del libro|liburuetatik hartutako ariketek/.test(read(f)));
  t.ok(!prom.length, 'ninguna página anuncia lecciones de libros transcritas' + (prom.length ? ': ' + prom.join(', ') : ''));

  // ── si en este ordenador hay transcripciones personales, que sean coherentes
  const priv = ['pribatua/armairua-a1-bakarka1-data.js', 'pribatua/armairua-a1-arian-data.js'].filter(f => fs.existsSync(path.join(t.root, f)));
  if (!priv.length) { t.ok(true, 'no hay pribatua/ en este ordenador: nada más que comprobar'); return; }
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
  priv.forEach(f => vm.runInContext(read(f), ctx, { filename: f }));
  const U = ctx.A1_ITURRIAK.unitateak, bad = [];
  t.ok(new Set(U.map(u => u.id)).size === U.length && U.every(u => /^(bk1|ar)-/.test(u.id)), 'local: cada unidad con id propio (bk1-…, ar-…) que no choca con las del cuaderno');
  let items = 0;
  U.forEach(u => {
    const keys = new Set();
    u.atalak.forEach(a => {
      const ex = a.mota === 'ariketa' ? a : (a.mota === 'irakurgaia' && a.galderak ? { k: a.k, items: a.galderak } : null);
      if (!ex) return;
      if (keys.has(ex.k)) bad.push(u.id + ': ejercicio repetido ' + ex.k); keys.add(ex.k);
      ex.items.forEach((it, i) => {
        items++;
        if (it.a == null) return;                                   // sin solución: nada que casar
        const g = ((it.q || '').match(/_{3,}/g) || []).length;
        if (Array.isArray(it.a) ? it.a.length !== g : g > 0) bad.push(`${u.id} ${ex.k} #${i + 1}: ${g} huecos y ${Array.isArray(it.a) ? it.a.length : 'texto'} en la solución`);
      });
    });
  });
  t.ok(!bad.length, 'local: cada hueco con solución tiene la suya y cada ejercicio su clave (' + items + ' líneas)' + (bad.length ? ': ' + bad.slice(0, 3).join(' | ') : ''));
}
