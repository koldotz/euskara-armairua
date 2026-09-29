// Hiztegia · modo «Idatzi»: ves el castellano y lo escribes en euskera. La
// corrección propone la nota del repaso espaciado (Badakit / Kosta zait / Ez dakit).
export default async function(t){
  const p = await t.tab();
  await p.go(t.base + '/a1.html#hiztegia', 1800);
  const idx = eu => p.ev(`A1_DATA.w.findIndex(w => w.eu === ${JSON.stringify(eu)})`);
  const chk = async (typed, eu) => JSON.parse(await p.ev(`JSON.stringify(HIZTEGIA.check(${JSON.stringify(typed)}, ${await idx(eu)}))`));

  // la corrección, con palabras concretas
  t.ok((await chk('etxe', 'etxe')).r === 'ok', 'exacta → correcta');
  t.ok((await chk('  ETXE ', 'etxe')).r === 'ok', 'sin importar mayúsculas ni espacios');
  t.ok((await chk('ondo nago eskerrik asko', 'Ondo nago, eskerrik asko.')).r === 'ok', 'sin importar comas ni puntos en una frase');
  t.ok((await chk('Zer moduz', 'zer moduz?')).r === 'ok', 'sin importar los signos de pregunta');
  let r = await chk('etxea', 'etxe');
  t.ok(r.r === 'near' && /artículo/.test(r.note), 'con el artículo de más → casi, y lo explica');
  t.ok((await chk('neska', 'neska')).r === 'ok' && (await chk('neskaa', 'neska')).r === 'near', 'la -a orgánica no se toma por artículo');
  r = await chk('etse', 'etxe');
  t.ok(r.r === 'near' && /Una letra/.test(r.note), 'una letra distinta → casi');
  t.ok((await chk('etxebizitza', 'etxe')).r === 'no' && (await chk('', 'etxe')).r === 'no', 'otra palabra o en blanco → incorrecta');
  r = await chk('kazkabar', 'txingor');
  t.ok(r.r === 'ok' && /misma traducción/.test(r.note), 'un sinónimo con la misma traducción vale, y dice cuál era la de la tarjeta');

  // el modo en la pantalla
  await p.ev(`document.getElementById('mWrite').click()`); await p.sleep(200);
  t.ok((await p.ev(`HIZTEGIA.mode()`)) === 'write' && await p.ev(`document.getElementById('dirSeg').hidden`) && !(await p.ev(`document.getElementById('wForm').hidden`)), 'el botón «Idatzi» cambia de modo y oculta la dirección');
  let cur = JSON.parse(await p.ev(`JSON.stringify(HIZTEGIA.current())`));
  t.ok((await p.ev(`document.getElementById('cFront').textContent`)) === cur.es, 'la tarjeta enseña el castellano');
  t.ok((await p.ev(`document.activeElement.id`)) === 'wIn', 'el cursor queda en la casilla');
  // una tecla «1» mientras se escribe no califica
  await p.S('Input.dispatchKeyEvent', { type: 'keyDown', key: '1', code: 'Digit1', text: '1' });
  await p.S('Input.dispatchKeyEvent', { type: 'keyUp', key: '1', code: 'Digit1' });
  t.ok((await p.ev(`document.getElementById('g0').disabled`)) && (await p.ev(`document.getElementById('wIn').value`)) === '1', 'escribir «1» en la casilla no pone nota');

  // correcta con Intro, y otra vez Intro acepta la nota propuesta
  const n0 = await p.ev(`(JSON.parse(localStorage.getItem('hitzen-kutxa-v1') || '{}')[${cur.i}] || {}).n || 0`);
  await p.ev(`document.getElementById('wIn').value = ${JSON.stringify(cur.eu.toUpperCase())}`);
  const enter = async () => { await p.S('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r' }); await p.S('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }); await p.sleep(200); };
  await enter();
  t.ok((await p.ev(`document.getElementById('wFb').getAttribute('data-r')`)) === 'ok' && (await p.ev(`document.activeElement.id`)) === 'g2', 'Intro corrige: «Zuzen!» y propone «Badakit»');
  t.ok(await p.ev(`document.getElementById('card').getAttribute('data-flipped') === 'true'`), 'se ve la forma correcta en la tarjeta');
  await enter();
  const st = JSON.parse(await p.ev(`localStorage.getItem('hitzen-kutxa-v1')`))[cur.i];
  t.ok(st && st.n === n0 + 1 && st.b >= 2, 'Intro acepta la nota: la palabra sube en el repaso');
  const next = JSON.parse(await p.ev(`JSON.stringify(HIZTEGIA.current())`));
  t.ok(next && next.i !== cur.i && (await p.ev(`document.getElementById('wIn').value`)) === '' && (await p.ev(`document.activeElement.id`)) === 'wIn', 'pasa a la siguiente con la casilla vacía');

  // casi: se marcan las letras que fallan y se propone «Kosta zait»
  cur = next;
  const typo = cur.eu.length > 3 ? cur.eu.slice(0, 2) + (cur.eu[2] === 'z' ? 'x' : 'z') + cur.eu.slice(3) : cur.eu + 'z';
  await p.ev(`document.getElementById('wIn').value = ${JSON.stringify(typo)}; document.getElementById('wGo').click()`); await p.sleep(150);
  t.ok((await p.ev(`document.getElementById('wFb').getAttribute('data-r')`)) === 'near' && (await p.ev(`document.querySelector('#g1').classList.contains('sug')`)), 'una errata → «Ia-ia» y propone «Kosta zait» (' + typo + ')');
  t.ok((await p.ev(`document.querySelectorAll('#wFb .sol mark').length`)) >= 1 && (await p.ev(`document.querySelector('#wFb .you').textContent`)) === typo, 'marca la letra que falla y enseña lo que escribiste');
  t.ok(!(await p.ev(`document.getElementById('g2').disabled`)), 'se puede subir la nota si fue una errata');
  await p.ev(`document.getElementById('g1').click()`); await p.sleep(100);

  // incorrecta → «Ez dakit»; la tarjeta vuelve al final de la cola
  cur = JSON.parse(await p.ev(`JSON.stringify(HIZTEGIA.current())`));
  await p.ev(`document.getElementById('wIn').value = 'qqqqqq'; document.getElementById('wGo').click()`); await p.sleep(150);
  t.ok((await p.ev(`document.getElementById('wFb').getAttribute('data-r')`)) === 'no' && (await p.ev(`document.activeElement.id`)) === 'g0', 'incorrecta → «Ez» y propone «Ez dakit»');
  t.ok(await p.ev(`!!document.getElementById('wSay')`), 'se puede escuchar la forma correcta');

  // el modo se recuerda al volver
  await p.go(t.base + '/a1.html?v#hiztegia', 1800);
  t.ok((await p.ev(`document.getElementById('mWrite').getAttribute('aria-pressed')`)) === 'true' && (await p.ev(`HIZTEGIA.mode()`)) === 'write', 'al volver sigue en «Idatzi»');
  await p.ev(`document.getElementById('mStudy').click()`); await p.sleep(100);
  t.ok(!(await p.ev(`document.getElementById('dirSeg').hidden`)) && await p.ev(`document.getElementById('wForm').hidden`), 'volver a «Ikasi» restaura la tarjeta que se gira');
  t.ok(!p.errs.length, 'sin errores de JavaScript' + (p.errs.length ? ': ' + p.errs[0] : ''));
  await p.close();

  for (const w of [390, 320]) {
    const m = await t.tab({ width: w, height: 760, mobile: true });
    await m.go(t.base + '/a1.html#hiztegia', 1800);
    await m.ev(`document.getElementById('mWrite').click()`); await m.sleep(200);
    t.ok((await m.ev(`document.documentElement.scrollWidth - document.documentElement.clientWidth`)) <= 0, w + 'px: el modo «Idatzi» no desborda');
    t.ok(parseFloat(await m.ev(`getComputedStyle(document.getElementById('wIn')).fontSize`)) >= 16, w + 'px: letra de la casilla ≥ 16 px (el iPhone no hace zoom)');
    await m.close();
  }
}
