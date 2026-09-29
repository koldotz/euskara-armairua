// Cuaderno · «Egiaztatu»: compara con la solución del libro, sin dar por
// errónea una respuesta abierta distinta, y manda los fallos a «Nire akatsak».
export default async function(t){
  const p = await t.tab();
  await p.go(t.base + '/a1.html#koadernoa', 1800);
  t.ok((await p.ev(`document.querySelectorAll('#app-koadernoa .kc-btn').length`)) >= 40, 'cada ejercicio con solución tiene su botón «Egiaztatu»');
  const fill = (ex, vals) => p.ev(`(function(){ var f = document.querySelectorAll('#k1 .ar')[${ex}].querySelectorAll('input.gapf, textarea.ansf'); ${JSON.stringify(vals)}.forEach(function(v, i){ f[i].value = v; f[i].dispatchEvent(new Event('input', { bubbles: true })); }); })()`);
  const sum = ex => p.ev(`document.querySelectorAll('#k1 .ar')[${ex}].querySelector('.kc-sum').textContent`);
  const click = ex => p.ev(`document.querySelectorAll('#k1 .ar')[${ex}].querySelector('.kc-btn').click()`);

  // 1.1: ocho bien (con mayúsculas y un punto de más), uno mal, uno en blanco
  await fill(0, ['naiz', 'Zara', 'da.', 'gara', 'dira', 'zarete', 'dira', 'naiz', 'dira', '']);
  await click(0); await p.sleep(150);
  t.ok(/✓ 8/.test(await sum(0)) && /✗ 1/.test(await sum(0)) && /1 sin responder/.test(await sum(0)), 'huecos: ✓ 8 · ✗ 1 · 1 sin responder (sin importar mayúsculas ni signos)');
  t.ok((await p.ev(`document.querySelectorAll('#k1 .ar')[0].querySelectorAll('input.kc-ok').length`)) === 8 && (await p.ev(`document.querySelectorAll('#k1 .ar')[0].querySelector('input.kc-ko + .kc-sol').textContent`)) === '→ da', 'el ✗ lleva la solución al lado');
  t.ok(/otras respuestas pueden ser válidas/.test(await sum(0)), 'avisa de que la solución es la del libro');
  let k = JSON.parse(await p.ev(`JSON.stringify(Object.values(AKATSAK.data().k))`));
  t.ok(k.length === 1 && k[0].you === 'dira' && k[0].sol === 'da' && k[0].x === '1.1' && /___/.test(k[0].q), 'el fallo va a «Nire akatsak» con la frase, tu respuesta y la solución');
  // cambiar la respuesta quita la marca; corregida y comprobada, sale de «Nire akatsak»
  await p.ev(`(function(){ var g = document.querySelectorAll('#k1 .ar')[0].querySelector('input.kc-ko'); g.value = 'da'; g.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  t.ok((await p.ev(`document.querySelectorAll('#k1 .ar')[0].querySelectorAll('input.kc-ko, .kc-sol').length`)) === 0, 'al cambiar una respuesta se quita su marca');
  await click(0); await p.sleep(100);                      // ocultar
  t.ok((await p.ev(`document.querySelectorAll('#k1 .ar')[0].querySelectorAll('.kc-ok').length`)) === 0 && (await sum(0)) === '', 'el segundo clic oculta la corrección');
  await click(0); await p.sleep(100);
  t.ok(/✓ 9/.test(await sum(0)) && Object.keys(JSON.parse(await p.ev(`JSON.stringify(AKATSAK.data().k)`))).length === 0, 'corregido: ✓ 9 y fuera de «Nire akatsak»');

  // 1.3 abierta: igual al modelo → ✓; distinta → se enseña el modelo, sin ✗
  await p.ev(`(function(){ var ar = document.querySelectorAll('#k1 .ar')[2], sol = ar.querySelectorAll('.sol .in > ol > li'), t = ar.querySelectorAll('textarea.ansf'); var b = sol[0].querySelector('b'); t[0].value = (b ? b.textContent : sol[0].textContent).toUpperCase(); t[1].value = 'Beste erantzun bat'; t.forEach(function(x){ x.dispatchEvent(new Event('input', { bubbles: true })); }); })()`);
  await click(2); await p.sleep(100);
  t.ok(/✓ 1/.test(await sum(2)) && /1 para comparar/.test(await sum(2)) && !/✗/.test(await sum(2)), 'abiertas: la que coincide con el modelo ✓; la otra, «para comparar», nunca ✗');
  t.ok((await p.ev(`document.querySelectorAll('#k1 .ar')[2].querySelectorAll('.kc-model').length`)) === 1, 'se enseña el modelo bajo la respuesta distinta');
  // un ejercicio sin una solución por pregunta abre la solución entera
  await p.ev(`(function(){ var ar = [...document.querySelectorAll('#k8 .ar')].find(a => a.querySelectorAll('.b ol.items > li').length !== a.querySelectorAll('.sol .in > ol > li').length && a.querySelector('.kc-btn')); var f = ar.querySelector('textarea.ansf, input.gapf'); f.value = 'zerbait'; f.dispatchEvent(new Event('input', { bubbles: true })); ar.querySelector('.kc-btn').click(); window.__ar = ar; })()`);
  t.ok(await p.ev(`window.__ar.querySelector('details.sol').open`), 'si la solución no va pregunta a pregunta, se abre entera para comparar');
  t.ok(!p.errs.length, 'sin errores de JavaScript' + (p.errs.length ? ': ' + p.errs[0] : ''));
  await p.close();
}
