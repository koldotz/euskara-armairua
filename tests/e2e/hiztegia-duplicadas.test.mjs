// Palabras que están en dos temas (misma forma y traducción): comparten una
// ficha de repaso, no cuentan doble y las fichas antiguas del duplicado se
// trasladan solas a la que manda.
export default async function(t){
  const p = await t.tab();
  await p.go(t.base + '/a1.html?d1#hiztegia', 1500);
  const pairs = JSON.parse(await p.ev(`(function(){ var seen = {}, out = []; A1_DATA.w.forEach(function(w){ var k = w.eu.toLowerCase().trim() + '|' + w.es.toLowerCase().trim(); if (seen[k] != null) out.push([seen[k], w.i]); else seen[k] = w.i; }); return JSON.stringify(out); })()`));
  t.ok(pairs.length > 0, pairs.length + ' pares de palabras duplicadas en los datos');
  const [c0, a0] = pairs[0], [c1, a1] = pairs[1];
  const uniq = await p.ev(`A1_DATA.w.length`) - pairs.length;

  // fichas guardadas antes de este cambio: solo en el duplicado, y en los dos
  await p.ev(`localStorage.setItem('hitzen-kutxa-v1', JSON.stringify({ ${a0}: { b:3, d:99999, ef:2.5, iv:5, n:3, lp:0 }, ${c1}: { b:1, d:0, ef:2.5, iv:0, n:0, lp:1 }, ${a1}: { b:4, d:99999, ef:2.6, iv:10, n:4, lp:0 } }))`);
  await p.go(t.base + '/a1.html?d2#hiztegia', 1500);
  const st = JSON.parse(await p.ev(`localStorage.getItem('hitzen-kutxa-v1')`));
  t.ok(st[c0] && st[c0].b === 3 && !st[a0], 'la ficha guardada en el duplicado pasa a la que manda');
  t.ok(st[c1] && st[c1].b === 4 && !st[a1], 'con ficha en los dos, se queda la más madura');
  t.ok((await p.ev(`HIZTEGIA.total()`)) === uniq && (await p.ev(`document.getElementById('stTot').textContent`)) === String(uniq), 'total = palabras distintas (' + uniq + ')');

  const tema = await p.ev(`A1_DATA.w[${a0}].t`);
  await p.ev(`HIZTEGIA.showTheme(${tema})`); await p.sleep(200);
  t.ok((await p.ev(`document.getElementById('stTot').textContent`)) === String(await p.ev(`A1_DATA.w.filter(w => w.t === ${tema}).length`)), 'cada tema sigue listando todas sus palabras');
  const before = await p.ev(`JSON.stringify(JSON.parse(localStorage.getItem('hitzen-kutxa-v1'))[${c0}])`);
  await p.ev(`HIZTEGIA.grade(${a0}, 2)`);
  const after = JSON.parse(await p.ev(`localStorage.getItem('hitzen-kutxa-v1')`));
  t.ok(after[c0] && JSON.stringify(after[c0]) !== before && !after[a0], 'repasar el duplicado actualiza la ficha compartida');
  const cards = JSON.parse(await p.ev(`JSON.stringify(HIZTEGIA.sessionCards(0).map(c => c.eu + '|' + c.es))`));
  t.ok(cards.length === new Set(cards).size && (await p.ev(`HIZTEGIA.dueCount()`)) === cards.length, 'la sesión no trae la misma palabra dos veces');
  t.ok(!p.errs.length, 'sin errores de JavaScript' + (p.errs.length ? ': ' + p.errs[0] : ''));
  await p.close();
}
