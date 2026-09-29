// El recorrido normal con dos dispositivos: crear el perfil en uno, entrar en
// el otro (con un PIN erróneo primero), que el progreso viaje en los dos
// sentidos y salir.
import { login, chip, hz, sync, server } from '../lib/app.mjs';

export default async function(t){
  const A = await t.tab(), B = await t.tab();

  // A: progreso sin perfil y luego crea el perfil
  await A.go(t.base + '/a1.html#mz-o01', 1800);
  await A.ev(`document.getElementById('mzDone').click()`); await A.sleep(200);
  await A.ev(`HIZTEGIA.grade(5, 2)`); await A.sleep(100);
  await A.ev(`document.getElementById('who').click()`); await A.sleep(300);
  t.ok(await A.ev(`!!document.getElementById('gatePin')`), 'la pantalla de entrada pide PIN');
  t.ok(/Aún no hay ninguno/.test(await A.ev(`document.querySelector('#gateBank .gb-list').textContent`)), 'lista de perfiles vacía');
  await A.ev(`document.getElementById('gateName').value = 'Maialen'; document.getElementById('gatePin').value = '12'; document.getElementById('gateForm').requestSubmit()`); await A.sleep(400);
  t.ok(!(await A.ev(`document.getElementById('gate').hidden`)) && (await A.ev(`localStorage.getItem('armairua-pin')`)) === null, 'un PIN de 2 cifras no deja entrar');
  await A.ev(`document.getElementById('gatePin').value = '1234'; document.getElementById('gateForm').requestSubmit()`); await A.sleep(1800);
  let c = await chip(A);
  t.ok(c.nm === 'Maialen' && /Sinkronizatuta/.test(c.st) && await A.ev(`document.getElementById('gate').hidden`), 'A entra y queda sincronizado: ' + c.st);
  let s = await server(t);
  t.ok(s && s.datuak.v['hitzen-kutxa-v1'] && s.datuak.v['mintzamena-a1-v1'], 'el progreso previo de A sube a la nube');

  // B: dispositivo nuevo; PIN erróneo y luego el bueno
  await B.go(t.base + '/a1.html#mintzamena', 1800);
  await B.ev(`document.getElementById('who').click()`); await B.sleep(500);
  t.ok(/Maialen/.test(await B.ev(`[...document.querySelectorAll('#gateBank .gb-chip')].map(b => b.textContent).join(',')`)), 'B ve «Maialen» en la lista');
  await B.ev(`document.querySelector('#gateBank .gb-chip').click()`); await B.sleep(100);
  await B.ev(`document.getElementById('gatePin').value = '0000'; document.getElementById('gateForm').requestSubmit()`); await B.sleep(700);
  t.ok(/Te quedan 4 intentos/.test(await B.ev(`document.getElementById('gateErr').textContent`)), 'PIN erróneo: avisa de los intentos que quedan');
  t.ok((await B.ev(`localStorage.getItem('euskara-izena')`)) === null, 'con PIN erróneo no se guarda el perfil');
  await B.ev(`document.getElementById('gatePin').value = '1234'; document.getElementById('gateForm').requestSubmit()`); await B.sleep(2800);
  c = await chip(B);
  t.ok(/Sinkronizatuta/.test(c.st), 'B entra y se sincroniza');
  t.ok((await hz(B))[5] && /o01/.test(await B.ev(`localStorage.getItem('mintzamena-a1-v1')`)), 'B recibe el progreso de A');

  // B avanza; A lo recibe
  await B.ev(`location.hash = 'mz-j09'`); await B.sleep(300);
  await B.ev(`document.getElementById('mzDone').click()`); await B.sleep(2800);
  t.ok(/j09/.test((await server(t)).datuak.v['mintzamena-a1-v1']), 'lo que marca B sube solo');
  await A.ev(`ARMAIRUA_BANK.sync({ reload: true })`); await A.sleep(2500);
  t.ok(/j09/.test(await A.ev(`localStorage.getItem('mintzamena-a1-v1')`)), 'A lo recibe al sincronizar');

  // cambios a la vez en claves distintas
  await A.ev(`HIZTEGIA.grade(7, 2)`);
  await B.ev(`localStorage.setItem('koadernoa:k1', JSON.stringify({ g0: 'etxean' }))`);
  await Promise.all([sync(A, 0), sync(B, 0)]); await A.sleep(700);
  await sync(A, 600); await sync(B, 600);
  t.ok((await hz(B))[7] && JSON.parse(await A.ev(`localStorage.getItem('koadernoa:k1')`) || '{}').g0 === 'etxean', 'cambios simultáneos en claves distintas: los dos dispositivos lo tienen todo');

  // el perfil también está en las otras páginas
  await B.go(t.base + '/index.html', 1500);
  await B.ev(`document.getElementById('who').click()`); await B.sleep(300);
  t.ok(await B.ev(`!!document.getElementById('gatePin') && !document.getElementById('gateSync').hidden`), 'portada: PIN y panel de sincronización');
  await B.go(t.base + '/gramatika.html', 1500);
  t.ok(/Sinkronizatuta/.test((await chip(B)).st), 'gramatika: perfil sincronizado');

  // salir
  await B.go(t.base + '/a1.html', 1500);
  await B.ev(`window.confirm = () => true; document.getElementById('who').click()`); await B.sleep(300);
  await B.ev(`document.getElementById('gsOut').click()`); await B.sleep(2200);
  const left = JSON.parse(await B.ev(`JSON.stringify({ n: localStorage.getItem('euskara-izena'), p: localStorage.getItem('armairua-pin'), k: Object.keys(localStorage).filter(k => /^(mintzamena|hitzen|koadernoa)/.test(k)).length })`));
  t.ok(left.n === null && left.p === null && left.k === 0 && (await chip(B)).nm === 'Sin perfil', 'salir borra perfil, PIN y progreso de este dispositivo');
  t.ok(!A.errs.length && !B.errs.length, 'sin errores de JavaScript' + ([...A.errs, ...B.errs].length ? ': ' + [...A.errs, ...B.errs][0] : ''));
  await A.close(); await B.close();
}
