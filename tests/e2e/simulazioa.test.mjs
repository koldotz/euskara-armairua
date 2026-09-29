// Simulacros cronometrados: tiempo del examen, soluciones cerradas mientras
// corre, entrega con corrección, total y aprobado, y la nota sola en el plan.
export default async function(t){
  const p = await t.tab();
  await p.go(t.base + '/a1.html#a1', 1800);
  const bar = () => p.ev(`document.querySelector('#a1 .sim').textContent`);
  t.ok((await p.ev(`document.querySelectorAll('#app-koadernoa .sim').length`)) === 3, 'los tres simulacros tienen su barra');
  t.ok(/75 minutos/.test(await bar()), 'toma el tiempo de la unidad (Eguna 24 · 75 min)');
  t.ok(/90 minutos/.test(await p.ev(`document.querySelector('#a3 .sim').textContent`)), 'el examen final, 90 minutos');
  await p.ev(`document.querySelector('#a1 .sim button[data-s="start"]').click()`); await p.sleep(2200);
  t.ok(/74:5\d/.test(await bar()) && !(await p.ev(`document.querySelector('.sim-clock').hidden`)), 'en marcha: cuenta atrás en la barra y en el reloj flotante');
  t.ok((await p.ev(`getComputedStyle(document.querySelector('#a1 details.sol')).display`)) === 'none' && (await p.ev(`getComputedStyle(document.querySelector('#a1 .kc-bar')).display`)) === 'none', 'mientras corre, ni soluciones ni «Egiaztatu»');
  t.ok((await p.ev(`getComputedStyle(document.querySelector('#a2 details.sol')).display`)) !== 'none', 'los demás simulacros no se tocan');
  // pausa: el tiempo se para
  await p.ev(`document.querySelector('#a1 .sim button[data-s="pause"]').click()`);
  const paused = (await bar()).match(/\d+:\d\d/)[0]; await p.sleep(2100);
  t.ok((await bar()).includes(paused) && /en pausa/.test(await bar()), 'en pausa el reloj no avanza (' + paused + ')');
  await p.ev(`document.querySelector('#a1 .sim button[data-s="resume"]').click()`);
  // el reloj flotante solo con el cuaderno a la vista
  await p.ev(`location.hash = 'hiztegia'`); await p.sleep(1300);
  t.ok(await p.ev(`document.querySelector('.sim-clock').hidden`), 'fuera del cuaderno el reloj flotante se oculta (el tiempo sigue)');
  await p.ev(`location.hash = 'a1'`); await p.sleep(1300);
  // entregar desde el reloj
  await p.ev(`document.querySelector('.sim-clock button[data-s="done"]').click()`); await p.sleep(300);
  t.ok(/Entregado · 0:0\d de 75 min/.test(await bar()) && await p.ev(`document.querySelector('.sim-clock').hidden`), 'entregado: tiempo usado y fuera el reloj');
  t.ok(await p.ev(`[...document.querySelectorAll('#a1 details.sol')].every(d => d.open)`), 'al entregar se abren todas las soluciones');
  // notas: cuatro destrezas → total solo, aprobado y en el plan
  const scores = vals => p.ev(`(function(){ var s = [...document.querySelectorAll('#a1 input.scoref')].slice(0, 4); ${JSON.stringify(vals)}.forEach(function(v, i){ s[i].value = v; s[i].dispatchEvent(new Event('input', { bubbles: true })); }); })()`);
  await scores(['20', '18', '12', '22']); await p.sleep(200);
  t.ok((await p.ev(`document.querySelectorAll('#a1 input.scoref')[4].value`)) === '72', 'la casilla GUZTIRA se rellena sola: 72');
  t.ok(/72 \/ 100/.test(await bar()) && /ez gainditua/.test(await bar()) && /por debajo de 15/.test(await bar()), 'con una destreza bajo 15 no aprueba aunque sume 72');
  t.ok((await p.ev(`PLANA.score('s1')`)) === '72', 'la nota va sola al plan (Simulacro 1)');
  t.ok(await p.ev(`(function(){ var d = PLANA.P.days.findIndex(x => x.tasks.some(t => t.u === '#a1' && t.k === 'proba')); var j = PLANA.P.days[d].tasks.findIndex(t => t.u === '#a1' && t.k === 'proba'); return PLANA.isDone(d, j); })()`), 'y la tarea del simulacro queda hecha');
  await scores(['20', '18', '16', '22']); await p.sleep(200);
  t.ok(/76 \/ 100/.test(await bar()) && /gainditua/.test(await bar()) && !/ez gainditua/.test(await bar()) && (await p.ev(`PLANA.score('s1')`)) === '76', 'corregida una nota: 76, gainditua, y el plan se actualiza');
  await p.ev(`location.hash = 'egutegia'`); await p.sleep(400);
  t.ok(await p.ev(`[...document.querySelectorAll('#pruebas input')].some(i => i.value === '76')`), 'el 76 aparece en las pruebas del Egutegia');
  // se acaba el tiempo: entrega sola
  await p.ev(`location.hash = 'a2'`); await p.sleep(300);
  await p.ev(`(function(){ var S = JSON.parse(localStorage.getItem('euskara-simulazioak-v1') || '{}'); S.a2 = { start: Date.now() - 80 * 60000, run: Date.now() - 76 * 60000, acc: 0 }; localStorage.setItem('euskara-simulazioak-v1', JSON.stringify(S)); })()`);
  await p.sleep(1600);
  t.ok(/se acabó el tiempo/.test(await p.ev(`document.querySelector('#a2 .sim').textContent`)), 'si se acaba el tiempo, se entrega solo');
  await p.ev(`document.querySelector('#a1 .sim button[data-s="again"]').click()`);
  t.ok(/Hasi/.test(await bar()), '«Repetir» deja el simulacro listo para empezar otra vez');
  t.ok(!p.errs.length, 'sin errores de JavaScript' + (p.errs.length ? ': ' + p.errs[0] : ''));
  await p.close();
  const m = await t.tab({ width: 360, height: 740, mobile: true });
  await m.go(t.base + '/a1.html#a3', 1800);
  await m.ev(`document.querySelector('#a3 .sim button[data-s="start"]').click()`); await m.sleep(1200);
  const r = JSON.parse(await m.ev(`JSON.stringify(document.querySelector('.sim-clock').getBoundingClientRect())`));
  t.ok(r.width > 0 && r.right <= 360 && (await m.ev(`document.documentElement.scrollWidth - document.documentElement.clientWidth`)) <= 0, '360px: el reloj cabe y nada desborda');
  await m.close();
}
