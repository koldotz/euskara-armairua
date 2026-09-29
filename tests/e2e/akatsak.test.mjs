// «Nire akatsak»: fallos de los juegos, del cuaderno y palabras difíciles en
// un solo repaso; lo acertado después sale solo de la lista.
export default async function(t){
  const p = await t.tab();
  await p.go(t.base + '/a1.html#jokoa', 1800);
  // fallar una ronda de Ordenatu (palabras al revés)
  await p.ev(`(function(){ var b = [...document.querySelectorAll('#jkOrdena .jk-tok')].sort(function(a, c){ return c.getAttribute('data-k') - a.getAttribute('data-k'); }); b.forEach(function(x){ x.click(); }); })()`); await p.sleep(200);
  let J = JSON.parse(await p.ev(`JSON.stringify(AKATSAK.data().j)`)), eu = Object.keys(J)[0];
  t.ok(eu && J[eu].g === 'ordena' && J[eu].es && J[eu].n === 1, 'fallar en Ordenatu la guarda con su traducción: ' + eu);
  // palabras difíciles y un hueco del cuaderno
  for (let r = 0; r < 3; r++) await p.ev(`HIZTEGIA.grade(3, 0)`);
  await p.ev(`(function(){ var f = document.querySelectorAll('#k1 .ar')[0].querySelectorAll('input.gapf'); f[0].value = 'da'; f[0].dispatchEvent(new Event('input', { bubbles: true })); document.querySelectorAll('#k1 .ar')[0].querySelector('.kc-btn').click(); })()`);
  await p.ev(`document.getElementById('segAkats').click()`); await p.sleep(300);
  const heads = await p.ev(`[...document.querySelectorAll('#entViewAkats .ak-sec h4')].map(h => h.textContent).join('|')`);
  t.ok(/resisten\s*1/.test(heads) && /juegos\s*1/.test(heads) && /coincidían\s*1/.test(heads), 'la pestaña «🩹 Akatsak» reúne palabra difícil, frase y hueco: ' + heads);
  t.ok(/Ni Maialen ___/.test(await p.ev(`document.querySelector('#entViewAkats .ak-gaps').textContent`)) && (await p.ev(`document.querySelector('#entViewAkats .ak-gaps a').getAttribute('href')`)) === '#k1', 'el hueco lleva la frase y un enlace a su ejercicio');
  // practicar la frase: ver → Badakit → fuera
  t.ok(await p.ev(`!!document.querySelector('#entViewAkats .ak-hid')`), 'la frase en euskera empieza tapada');
  await p.ev(`document.querySelector('#entViewAkats [data-a="show"]').click()`); await p.sleep(100);
  t.ok((await p.ev(`document.querySelector('#entViewAkats .ak-eu').textContent`)) === eu, '«Mira» la destapa');
  await p.ev(`document.querySelector('#entViewAkats [data-a="know"]').click()`); await p.sleep(150);
  t.ok(Object.keys(JSON.parse(await p.ev(`JSON.stringify(AKATSAK.data().j)`))).length === 0, '«Badakit» la quita de la lista');
  // acertar en el juego también la quita
  await p.ev(`AKATSAK.fail('ordena', 'Etxean nago', 'Estoy en casa'); AKATSAK.win('Etxean nago')`);
  t.ok(!JSON.parse(await p.ev(`JSON.stringify(AKATSAK.data().j)`))['Etxean nago'], 'acertarla después en un juego la quita sola');
  // quitar un hueco a mano
  await p.ev(`document.querySelector('#entViewAkats [data-a="rmk"]').click()`); await p.sleep(100);
  t.ok(Object.keys(JSON.parse(await p.ev(`JSON.stringify(AKATSAK.data().k)`))).length === 0, '✕ quita un hueco (por si tu respuesta también valía)');
  // repasar las palabras difíciles escribiéndolas
  await p.ev(`document.querySelector('#entViewAkats [data-a="drill-write"]').click()`); await p.sleep(400);
  t.ok((await p.ev(`location.hash`)) === '#hiztegia' && (await p.ev(`HIZTEGIA.mode()`)) === 'write' && (await p.ev(`HIZTEGIA.current().i`)) === 3 && (await p.ev(`document.getElementById('cnt').textContent`)) === '0 / 1', '«Escribirlas» abre Hiztegia solo con las difíciles, en modo «Idatzi»');
  // la libreta recoge los errores pendientes
  await p.ev(`AKATSAK.fail('zein', 'Zer moduz?', '¿Qué tal?')`);
  await p.ev(`document.getElementById('lbBtn').click()`); await p.sleep(400);
  t.ok(/Errores pendientes/.test(await p.ev(`document.getElementById('lbDoc').textContent`)) && /Zer moduz\?/.test(await p.ev(`document.getElementById('lbDoc').textContent`)), 'la libreta tiene el apartado de errores pendientes');
  t.ok(!p.errs.length, 'sin errores de JavaScript' + (p.errs.length ? ': ' + p.errs[0] : ''));
  await p.close();
}
