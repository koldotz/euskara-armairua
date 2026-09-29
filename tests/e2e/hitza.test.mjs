// Desglose de palabras fuera de Geruzak: tocar una palabra en euskera del
// cuaderno, Mintzamena o Esaldiak abre su ficha.
export default async function(t){
  const p = await t.tab();
  await p.go(t.base + '/a1.html#koadernoa', 1800);
  const an = w => p.ev(`JSON.stringify((function(a){ return a ? { g: a.reads[0][0], p: a.reads[0][1], apx: !!a.approx, voc: !!a.voc } : null; })(HITZA.analyze(${JSON.stringify(w)})))`).then(JSON.parse);
  let a = await an('etxeetan');
  t.ok(a && a.p === 'etxe=casa|e:PL|ta:TA|n:NON' && !a.apx, 'forma del diccionario de las gafas: desglose completo');
  a = await an('mendietan');
  t.ok(a && a.p === 'mendi=monte|e:PL|ta:TA|n:NON' && a.apx, 'raíz del Hiztegia + terminación: aproximado y avisado');
  a = await an('Donostiakoak');
  t.ok(a && /ko:NONGO\|ak:DETPL/.test(a.p), 'dos terminaciones seguidas: Donostia-ko-ak');
  a = await an('geldituko');
  t.ok(a && /ko:FUT/.test(a.p), 'tras un verbo, -ko es futuro y no «de…»');
  a = await an('kafetegian');
  t.ok(a && /an:NONSG/.test(a.p), 'terminaciones escritas con paréntesis: kafetegi-an');
  t.ok((await an('Idoia')) === null, 'un nombre propio desconocido no se inventa');

  // tocar una palabra del cuaderno
  const tap = async (sel, word) => {
    const r = JSON.parse(await p.ev(`(function(){ var el = [...document.querySelectorAll(${JSON.stringify(sel)})].find(e => e.offsetParent && e.textContent.indexOf(${JSON.stringify(word)}) >= 0); if (!el) return 'null'; el.scrollIntoView({ block: 'center' }); var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n; while ((n = w.nextNode())) { var i = n.data.indexOf(${JSON.stringify(word)}); if (i >= 0) { var rg = document.createRange(); rg.setStart(n, i); rg.setEnd(n, i + 1); var b = rg.getBoundingClientRect(); return JSON.stringify({ x: b.left + b.width / 2, y: b.top + b.height / 2 }); } } return 'null'; })()`));
    if (!r) return false;
    await p.click(r.x, r.y); await p.sleep(250); return true;
  };
  t.ok(await tap('#k1 .q', 'Maialen'), 'hay texto en euskera en el cuaderno');
  t.ok(!(await p.ev(`document.querySelector('.hz-pop').hidden`)) && /Maialen|no está/.test(await p.ev(`document.querySelector('.hz-pop').textContent`)), 'tocar una palabra abre su ficha');
  await p.key('Escape'); await p.sleep(100);
  t.ok(await p.ev(`document.querySelector('.hz-pop').hidden`), 'Escape la cierra');
  await tap('#k1 .q', 'etxea');
  t.ok(/etxea/.test(await p.ev(`document.querySelector('.hz-w').textContent`)) && (await p.ev(`document.querySelectorAll('.hz-pop .hz-chip').length`)) >= 2 && /geruzak\.html#s/.test(await p.ev(`document.querySelector('.hz-pop a').getAttribute('href')`)), 'la ficha trae las piezas y enlaza al bloque de la guía');
  await p.key('Escape');
  // un campo de respuesta no abre la ficha
  const inp = JSON.parse(await p.ev(`JSON.stringify(document.querySelector('#k1 input.gapf').getBoundingClientRect())`));
  await p.click(inp.left + 5, inp.top + 5); await p.sleep(200);
  t.ok(await p.ev(`document.querySelector('.hz-pop').hidden`), 'tocar un campo de respuesta no abre nada');

  // Mintzamena y Esaldiak
  await p.ev(`location.hash = 'mz-o01'`); await p.sleep(600);
  const mzWord = await p.ev(`(document.querySelector('#app-mintzamena .mz-eu .mz-txt') || {}).textContent.trim().split(/\\s+/)[0].replace(/[^\\p{L}]/gu, '')`);
  await tap('#app-mintzamena .mz-eu .mz-txt', mzWord);
  t.ok(!(await p.ev(`document.querySelector('.hz-pop').hidden`)) && (await p.ev(`document.querySelector('.hz-w').textContent`)).toLowerCase() === mzWord.toLowerCase(), 'Mintzamena: tocar «' + mzWord + '» abre su ficha');
  await p.key('Escape');
  await p.ev(`location.hash = 'jokoa'`); await p.sleep(300); await p.ev(`JOKOA.show('esaldi')`); await p.sleep(400);
  const esWord = await p.ev(`(document.querySelector('#entViewEsaldi .esa-eu') || {}).textContent.trim().split(/\\s+/)[0].replace(/[^\\p{L}]/gu, '')`);
  await tap('#entViewEsaldi .esa-eu', esWord);
  t.ok(!(await p.ev(`document.querySelector('.hz-pop').hidden`)), 'Esaldiak: tocar «' + esWord + '» abre su ficha');
  // el aviso sale una vez
  t.ok(await p.ev(`!!document.querySelector('.hz-tip')`), 'la primera vez sale el aviso de la novedad');
  await p.ev(`document.querySelector('.hz-tip button').click()`);
  await p.go(t.base + '/a1.html?x#koadernoa', 1500);
  t.ok(!(await p.ev(`!!document.querySelector('.hz-tip')`)), 'y no vuelve a salir');
  t.ok(!p.errs.length, 'sin errores de JavaScript' + (p.errs.length ? ': ' + p.errs[0] : ''));
  await p.close();

  const m = await t.tab({ width: 390, height: 760, mobile: true });
  await m.go(t.base + '/a1.html#koadernoa', 1800);
  const r = JSON.parse(await m.ev(`(function(){ var q = document.querySelector('#k1 .q'); q.scrollIntoView({ block: 'center' }); var rg = document.createRange(); rg.setStart(q.firstChild, 0); rg.setEnd(q.firstChild, 1); var b = rg.getBoundingClientRect(); return JSON.stringify({ x: b.left + 2, y: b.top + b.height / 2 }); })()`));
  await m.tap(r.x, r.y); await m.sleep(300);
  t.ok(!(await m.ev(`document.querySelector('.hz-pop').hidden`)) && await m.ev(`document.querySelector('.hz-pop').classList.contains('sheet')`), '390px: la ficha sale como hoja inferior');
  await m.close();
}
