// Gafas de aprendizaje en geruzak.html: desglose de toda la guía, lectura
// correcta en las tablas, ficha de palabra, filtro de la leyenda, estado
// recordado, devolución exacta del HTML al quitarlas y uso en el móvil.
export default async function(t){
  const p = await t.tab();
  await p.go(t.base + '/geruzak.html?g1', 1800);
  const before = await p.ev(`document.querySelector('main').innerHTML`);
  await p.ev(`BETAURREKOAK.set(true)`);
  const n = await p.ev(`document.querySelectorAll('.bt-w').length`);
  t.ok(n > 1500, 'se desglosan ' + n + ' palabras');
  const fb = await p.ev(`[...document.querySelectorAll('.bt-w')].filter(w => { var v = GERUZAK_BETAURREKOAK.w[w.__bt.k]; var r = Array.isArray(v[0]) ? v[w.__bt.r] : v; return r[1].split('|').length > 1 && w.querySelectorAll('.bt-p').length === 1; }).map(w => w.__bt.core).join(' ')`);
  t.ok(!fb, 'todas las palabras se trocean tal como están escritas' + (fb ? ': ' + fb.slice(0, 80) : ''));

  // tablas: la fila (caso) y la columna (número) eligen la lectura
  const cell = (tbl, row, col) => p.ev(`(function(){ var tb = [...document.querySelectorAll('#s5 table')][${tbl}]; var c = tb.tBodies[0].rows[${row}].cells[${col}]; var w = c.querySelector('.bt-w'); return w ? w.querySelector('.bt-t').textContent : ''; })()`);
  t.ok(/agente/.test(await cell(1, 1, 1)) && !/amigos/.test(await cell(1, 1, 1)), 'lagunek en NORK · mugagabe: «amigo (agente)» → ' + await cell(1, 1, 1));
  t.ok(/los amigos \(agente/.test(await cell(1, 1, 3)), 'lagunek en NORK · plural: «los amigos (agente)»');
  t.ok(/el amigo \(agente/.test(await cell(1, 1, 2)), 'lagunak en NORK · singular: «el amigo (agente)»');
  t.ok(/^al amigo$/.test(await cell(1, 2, 2)), 'glosa con contracción: «al amigo»');
  t.ok(await p.ev(`[...document.querySelectorAll('#s10 .bt-w')].filter(w => w.__bt.k === 'zuen').every(w => /tenía/.test(w.querySelector('.bt-t').textContent))`), 'zuen en el bloque del verbo: «lo tenía», no «vuestro»');
  t.ok(/Aprende cada palabra con su h/.test(await p.ev(`[...document.querySelectorAll('#s2 .card .v')][1].textContent`)) && await p.ev(`![...document.querySelectorAll('#s2 .card .v')][1].innerText.includes('fuego')`), '«su» castellano no se toma por «su» (fuego)');
  t.ok((await p.ev(`document.querySelectorAll('.bt-tr').length`)) >= 19, 'las fórmulas del bloque 20 llevan traducción');

  // ficha de la palabra
  const pt = JSON.parse(await p.ev(`(function(){ var w = [...document.querySelectorAll('#s1 .bt-w')].find(w => w.__bt.k === 'etxeetan'); w.scrollIntoView({ block: 'center' }); var b = w.querySelectorAll('.bt-p')[2].getBoundingClientRect(); return JSON.stringify({ x: b.left + 3, y: b.top + 5 }); })()`));
  await p.click(pt.x, pt.y); await p.sleep(250);
  t.ok(!(await p.ev(`btPop.hidden`)) && (await p.ev(`document.querySelector('.bt-pg').textContent`)) === 'en las casas', 'tocar una pieza abre la ficha: «en las casas»');
  t.ok(/^ta/.test(await p.ev(`(document.querySelector('.bt-pl li.on') || {}).textContent || ''`)) && /#s5/.test(await p.ev(`[...document.querySelectorAll('.bt-pl a')].map(a => a.getAttribute('href')).join()`)), 'resalta la pieza tocada y enlaza a su bloque');
  await p.key('Escape'); await p.sleep(100);
  t.ok(await p.ev(`btPop.hidden`) && (await p.ev(`document.activeElement.className`)) === 'bt-w', 'Escape cierra y devuelve el foco a la palabra');
  await p.ev(`[...document.querySelectorAll('#s1 .bt-w')].find(w => w.__bt.k === 'gizonak').click()`); await p.sleep(150);
  t.ok((await p.ev(`document.querySelectorAll('.bt-alt button').length`)) >= 1, 'una forma con dos lecturas ofrece la otra');
  await p.ev(`document.querySelector('.bt-x').click()`);

  // leyenda: resaltar un tipo
  await p.ev(`document.querySelector('.bt-legend button[data-m="kasu"]').click()`);
  t.ok((await p.ev(`getComputedStyle(document.querySelector('.bt-p[data-m="erro"]')).opacity`)) === '0.3' && (await p.ev(`getComputedStyle(document.querySelector('.bt-p[data-m="kasu"]')).opacity`)) === '1', 'la leyenda resalta solo los casos');
  await p.ev(`document.querySelector('.bt-legend button[data-m="kasu"]').click()`);

  // quitar: el HTML vuelve exactamente al original; el estado se recuerda
  await p.ev(`BETAURREKOAK.set(false)`);
  t.ok((await p.ev(`document.querySelector('main').innerHTML`)) === before, 'al quitarlas, el HTML queda idéntico al original');
  await p.ev(`BETAURREKOAK.set(true)`);
  await p.go(t.base + '/geruzak.html?g2', 1800);
  t.ok(await p.ev(`BETAURREKOAK.on()`) && (await p.ev(`document.getElementById('btBtn').getAttribute('aria-pressed')`)) === 'true', 'se recuerdan puestas al volver');
  t.ok(!p.errs.length, 'sin errores de JavaScript' + (p.errs.length ? ': ' + p.errs[0] : ''));
  await p.close();

  // móvil: botón con el dedo, ficha como hoja inferior, sin desbordar
  for (const w of [390, 320]) {
    const m = await t.tab({ width: w, height: 760, mobile: true });
    await m.go(t.base + '/geruzak.html?m' + w, 1800);
    const b = JSON.parse(await m.ev(`JSON.stringify(document.getElementById('btBtn').getBoundingClientRect())`));
    await m.tap(b.left + 20, b.top + 15); await m.sleep(400);
    t.ok(await m.ev(`BETAURREKOAK.on()`), w + 'px: el botón se activa con el dedo');
    t.ok((await m.ev(`document.documentElement.scrollWidth - document.documentElement.clientWidth`)) <= 0, w + 'px: sin desbordamiento con las gafas puestas');
    const q = JSON.parse(await m.ev(`(function(){ var x = document.querySelector('#s1 .ex .bt-w'); x.scrollIntoView({ block: 'center' }); var r = x.getBoundingClientRect(); return JSON.stringify({ x: r.left + 8, y: r.top + 8 }); })()`));
    await m.sleep(200); await m.tap(q.x, q.y); await m.sleep(300);
    t.ok(!(await m.ev(`btPop.hidden`)) && await m.ev(`btPop.classList.contains('sheet')`), w + 'px: la ficha sale como hoja inferior');
    await m.tap(10, 70); await m.sleep(200);
    t.ok(await m.ev(`btPop.hidden`), w + 'px: tocar fuera la cierra');
    await m.close();
  }
}
