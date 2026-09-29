// Libreta del A1: todo lo trabajado en un documento para guardar como PDF.
import fs from 'fs';
import os from 'os';
import path from 'path';

export default async function(t){
  const p = await t.tab();
  await p.go(t.base + '/a1.html#egutegia', 1500);
  await p.ev(`localStorage.setItem('euskara-izena', 'Maialen');
    localStorage.setItem('euskara-28-v1', JSON.stringify({ done: { '0-0':1, '0-1':1, '0-2':1, '0-3':1, '0-4':1, '1-0':1 }, retos: { r1: 1 }, scores: { p1: '18' } }));
    localStorage.setItem('euskara-memoria-v1', JSON.stringify({ know: { m0: 1 } }));
    localStorage.setItem('mintzamena-a1-v1', JSON.stringify({ done: { o01: Date.now() } }));
    localStorage.setItem('euskara-jokoa-v1', JSON.stringify({ xp: 40, eok: 3, etot: 4, ordena: 1, log: { osatu: { 'Etxean nago': ['Estoy en casa', Date.now()] } } }));`);
  await p.go(t.base + '/a1.html?r#jokoa', 1800);
  for (const i of [0, 1, 70, 402]) await p.ev(`HIZTEGIA.grade(${i}, 2)`);          // 402 es duplicado de 70
  await p.ev(`(function(){ var f = document.querySelectorAll('#k1 .ar')[0].querySelectorAll('input.gapf'); f[0].value = 'naiz'; f[0].dispatchEvent(new Event('input', { bubbles: true })); f[1].value = 'zara'; f[1].dispatchEvent(new Event('input', { bubbles: true })); })()`);
  // ganar una ronda de Ordenatu tocando las palabras en su orden → se registra la oración
  await p.ev(`(function(){ var b = [...document.querySelectorAll('#jkOrdena .jk-tok')].sort(function(a, c){ return a.getAttribute('data-k') - c.getAttribute('data-k'); }); b.forEach(function(x){ x.click(); }); })()`);
  await p.sleep(200);
  const ordLog = JSON.parse(await p.ev(`JSON.stringify((JSON.parse(localStorage.getItem('euskara-jokoa-v1')).log || {}).ordena || {})`));
  t.ok(Object.keys(ordLog).length === 1 && Object.values(ordLog)[0][0], 'acertar en Ordenatu registra la oración: ' + Object.keys(ordLog)[0]);
  await p.ev(`MEMORIA.todayN = function(){ return 9; }`);                        // como si fuera el día 9 del plan

  await p.ev(`document.getElementById('lbBtn').click()`); await p.sleep(500);
  t.ok(!(await p.ev(`document.getElementById('lbOv').hidden`)), 'el botón 📓 abre la libreta');
  const secs = await p.ev(`[...document.querySelectorAll('#lbDoc .lb-sec h2')].map(h => h.textContent).join('|')`);
  t.ok(secs.split('|').length === 7, 'siete apartados: ' + secs);
  const stats = await p.ev(`[...document.querySelectorAll('#lbDoc .lb-stats div')].map(d => d.textContent).join(' | ')`);
  t.ok(/1 \/ 28días del plan/.test(stats) && /6 \/ 136tareas/.test(stats) && /1 \/ 45ejercicios/.test(stats) && /^.*3 \(0\)palabras/.test(stats), 'portada con las cifras reales: ' + stats);
  t.ok(/Maialen/.test(await p.ev(`document.querySelector('#lbDoc .lb-who').textContent`)), 'portada con el nombre del perfil');
  // cuaderno: solo lo trabajado, con la respuesta y la solución al lado
  t.ok((await p.ev(`document.querySelectorAll('#lbDoc .lb-ar').length`)) === 1, 'cuaderno: solo el ejercicio con respuestas');
  t.ok((await p.ev(`[...document.querySelectorAll('#lbDoc .lb-ans:not(.empty)')].map(x => x.textContent).join(',')`)) === 'naiz,zara', 'cuaderno: tus respuestas');
  t.ok((await p.ev(`document.querySelectorAll('#lbDoc .lb-ar .lb-sol').length`)) === 10 && /naiz/.test(await p.ev(`document.querySelector('#lbDoc .lb-sol').textContent`)), 'cuaderno: la solución al lado de cada pregunta');
  t.ok(!(await p.ev(`document.querySelector('#lbDoc input, #lbDoc textarea')`)), 'sin campos de formulario en el documento');
  t.ok((await p.ev(`document.querySelectorAll('#lbDoc [id]').length`)) === 0, 'sin ids repetidos dentro del documento');
  // vocabulario, gramática, conversaciones y juegos
  const hz = await p.ev(`[...document.querySelectorAll('#lbDoc .lb-cols b')].map(b => b.textContent).join(',')`);
  t.ok(hz.split(',').length === 3, 'vocabulario: 3 palabras (la duplicada una sola vez): ' + hz);
  t.ok(/badakit/.test(await p.ev(`document.querySelector('#lbDoc .lb-card').parentNode.textContent`)) || /badakit/.test(await p.ev(`document.getElementById('lbDoc').textContent`)), 'gramática: recitado marcado como sabido');
  t.ok(/Bezeroa agurtu/.test(await p.ev(`document.getElementById('lbDoc').textContent`)), 'Mintzamena: la conversación hecha');
  const doc = await p.ev(`document.getElementById('lbDoc').textContent`);
  t.ok(/Etxean nago/.test(doc) && doc.includes(Object.keys(ordLog)[0]), 'juegos: oraciones resueltas (la antigua y la recién ganada)');

  // quitar un apartado
  await p.ev(`document.querySelector('.lb-chips input[data-s="hiztegia"]').click()`); await p.sleep(200);
  t.ok(!/Vocabulario trabajado/.test(await p.ev(`[...document.querySelectorAll('#lbDoc .lb-sec h2')].map(h => h.textContent).join()`)), 'desmarcar un apartado lo quita del documento');
  await p.ev(`document.querySelector('.lb-chips input[data-s="hiztegia"]').click()`); await p.sleep(200);

  // imprimir: solo la libreta, con nombre de archivo, y un PDF de verdad
  await p.S('Emulation.setEmulatedMedia', { media: 'print' });
  await p.ev(`document.body.classList.add('lb-printing')`);
  t.ok((await p.ev(`getComputedStyle(document.querySelector('.hub')).display`)) === 'none' && (await p.ev(`getComputedStyle(document.querySelector('.lb-bar')).display`)) === 'none', 'al imprimir solo sale el documento');
  const pdf = await p.S('Page.printToPDF', { printBackground: true, preferCSSPageSize: true });
  const buf = Buffer.from(pdf.result.data, 'base64'), pages = (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
  fs.writeFileSync(path.join(os.tmpdir(), 'armairua-libreta-prueba.pdf'), buf);
  t.ok(buf.slice(0, 4).toString() === '%PDF' && pages >= 7, 'Chrome genera el PDF (' + pages + ' páginas, A4)');
  await p.ev(`document.body.classList.remove('lb-printing')`);
  await p.S('Emulation.setEmulatedMedia', { media: '' });
  await p.ev(`window.print = function(){ window.__title = document.title; }`);
  await p.ev(`document.querySelector('.lb-go').click()`); await p.sleep(1000);
  t.ok(/^Libreta A1 · Maialen · \d{4}-\d\d-\d\d$/.test(await p.ev(`window.__title`)) && !/Libreta/.test(await p.ev(`document.title`)), 'nombre de archivo sugerido: ' + await p.ev(`window.__title`));
  t.ok(!(await p.ev(`document.querySelector('.lb-ask').hidden`)), 'tras imprimir pregunta si se guardó');

  // «nuevo desde la última»: sin marcas hasta confirmar; después, solo lo nuevo
  t.ok((await p.ev(`document.querySelectorAll('#lbDoc .lb-sec .lb-new').length`)) === 0, 'primera libreta: sin marcas «Berria»');
  await p.ev(`document.querySelector('.lb-yes').click()`); await p.sleep(200);
  t.ok(!!(await p.ev(`localStorage.getItem('euskara-libreta-a1')`)) && (await p.ev(`document.querySelectorAll('#lbDoc .lb-sec .lb-new').length`)) === 0, '«Bai, gorde da» guarda la referencia; nada es nuevo todavía');
  await p.ev(`document.querySelector('.lb-x').click()`);
  await p.ev(`HIZTEGIA.grade(5, 2)`);
  await p.ev(`(function(){ var f = document.querySelectorAll('#k1 .ar')[0].querySelectorAll('input.gapf'); f[2].value = 'da'; f[2].dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await p.ev(`document.getElementById('lbBtn').click()`); await p.sleep(500);
  const nw = await p.ev(`[...document.querySelectorAll('#lbDoc .lb-sec .lb-new')].map(x => x.closest('.lb-sec').querySelector('h2').textContent).join('|')`);
  t.ok(nw.split('|').sort().join('|') === 'Cuaderno de ejercicios|Vocabulario trabajado', 'segunda libreta: «Berria» justo en lo cambiado → ' + nw);
  t.ok(/desde la última exportación/.test(await p.ev(`document.querySelector('#lbDoc .lb-since').textContent`)), 'la portada dice desde cuándo es nuevo');
  await p.ev(`document.querySelector('.lb-x').click()`);
  t.ok(!p.errs.length, 'sin errores de JavaScript' + (p.errs.length ? ': ' + p.errs[0] : ''));
  await p.close();

  // móvil
  for (const w of [390, 320]) {
    const m = await t.tab({ width: w, height: 760, mobile: true });
    await m.go(t.base + '/a1.html', 1500);
    const b = JSON.parse(await m.ev(`JSON.stringify(document.getElementById('lbBtn').getBoundingClientRect())`));
    t.ok(b.width > 0 && b.right <= w, w + 'px: el botón 📓 está a la vista en la barra');
    await m.tap(b.left + b.width / 2, b.top + b.height / 2); await m.sleep(500);
    t.ok(!(await m.ev(`document.getElementById('lbOv').hidden`)), w + 'px: se abre con el dedo');
    t.ok((await m.ev(`document.getElementById('lbOv').scrollWidth - document.getElementById('lbOv').clientWidth`)) <= 0, w + 'px: la vista previa no desborda');
    await m.close();
  }
}
