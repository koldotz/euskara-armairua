// Salir o cambiar de perfil nunca borra en silencio progreso que no está en la
// nube; y un PIN guardado que deja de valer no bloquea el perfil a base de
// reintentos automáticos.
import { login, chip, stubConfirm, confirms, hz, server } from '../lib/app.mjs';

export default async function(t){
  const p = await t.tab();
  await p.go(t.base + '/a1.html#mintzamena', 1800);
  await login(p, 'Maialen', '1234');
  t.ok((await p.ev(`ARMAIRUA_BANK.state()`)) === 'ok', 'entra como Maialen');

  // 1) salir con una sincronización en marcha: espera y no pierde nada
  await p.ev(`HIZTEGIA.grade(5, 2)`);
  await p.ev(`ARMAIRUA_BANK.sync({ quiet: true })`);
  await p.ev(`document.getElementById('who').click()`); await p.sleep(200);
  await stubConfirm(p, [true]);
  await p.ev(`document.getElementById('gsOut').click()`); await p.sleep(2200);
  t.ok(JSON.parse((await server(t)).datuak.v['hitzen-kutxa-v1'])[5], 'salir durante una sincronización: el cambio llega a la nube');
  t.ok((await p.ev(`localStorage.getItem('euskara-izena')`)) === null, 'y la copia local se borra');

  // 2) salir sin conexión: avisa, y «Cancelar» lo conserva todo
  await login(p, 'Maialen', '1234');
  t.ok((await hz(p))[5], 'al volver a entrar recupera el progreso');
  t.down(true);
  await p.ev(`HIZTEGIA.grade(7, 2)`); await p.sleep(200);
  await p.ev(`document.getElementById('who').click()`); await p.sleep(200);
  await stubConfirm(p, [true, false]);
  await p.ev(`document.getElementById('gsOut').click()`); await p.sleep(2500);
  let cf = await confirms(p);
  t.ok(cf.length === 2 && /⚠ Este perfil tiene progreso/.test(cf[1]), 'sin conexión: un segundo aviso de pérdida');
  t.ok((await p.ev(`localStorage.getItem('euskara-izena')`)) === 'Maialen' && (await hz(p))[7], '«Cancelar»: sigue el perfil con su progreso');
  t.ok(!(await p.ev(`document.getElementById('gsOut').disabled`)), 'el botón «Irten» vuelve a estar activo');
  t.down(false);
  await stubConfirm(p, [true]);
  await p.ev(`document.getElementById('gsOut').click()`); await p.sleep(2500);
  t.ok((await confirms(p)).length === 1 && JSON.parse((await server(t)).datuak.v['hitzen-kutxa-v1'])[7], 'con conexión: sale sin avisar y el cambio está en la nube');

  // 3) cambiar de perfil con cambios sin subir: avisa; «Cancelar» → sigue en el suyo
  await login(p, 'Maialen', '1234');
  t.down(true);
  await p.ev(`HIZTEGIA.grade(9, 2)`); await p.sleep(200);
  await stubConfirm(p, [false]);
  await login(p, 'Koldo', '5555');
  cf = await confirms(p);
  t.ok(cf.length === 1 && /El perfil «Maialen»/.test(cf[0]), 'cambiar de perfil sin conexión: avisa');
  t.ok(/^Cancelado/.test(await p.ev(`document.getElementById('gateErr').textContent`)) && (await p.ev(`localStorage.getItem('euskara-izena')`)) === 'Maialen' && (await hz(p))[9], '«Cancelar»: sigue en Maialen con su progreso');
  t.down(false);
  await stubConfirm(p, []);
  await p.ev(`document.getElementById('gatePin').value = '5555'; document.getElementById('gateName').value = 'Koldo'; document.getElementById('gateForm').requestSubmit()`); await p.sleep(2500);
  t.ok((await confirms(p)).length === 0 && JSON.parse((await server(t)).datuak.v['hitzen-kutxa-v1'])[9], 'con conexión: sin aviso, y lo de Maialen queda en la nube');
  t.ok((await p.ev(`localStorage.getItem('euskara-izena')`)) === 'Koldo' && !(await hz(p))[9], 'ahora en Koldo, sin el progreso de Maialen');

  // 4) PIN guardado que ya no vale: un solo fallo, se olvida y se explica
  await p.ev(`localStorage.setItem('armairua-pin', '0000')`);
  for (let i = 0; i < 4; i++) { await p.ev(`ARMAIRUA_BANK.sync({ quiet: true })`); await p.sleep(150); }
  t.ok((await server(t, 'koldo')).hutsak === 1, 'PIN caducado: un único fallo registrado');
  t.ok((await p.ev(`localStorage.getItem('armairua-pin')`)) === null && /^Sin PIN/.test((await chip(p)).st), 'el PIN malo se olvida y la etiqueta pide PIN');
  await p.ev(`document.getElementById('who').click()`); await p.sleep(300);
  t.ok(/ya no vale/.test(await p.ev(`document.getElementById('gateErr').textContent`)), 'la pantalla de entrada explica por qué');
  await p.ev(`document.getElementById('gatePin').value = '5555'; document.getElementById('gateForm').requestSubmit()`); await p.sleep(1800);
  t.ok((await p.ev(`ARMAIRUA_BANK.state()`)) === 'ok' && (await server(t, 'koldo')).hutsak === 0, 'con el PIN bueno vuelve a sincronizar y el contador se limpia');
  t.ok(!p.errs.length, 'sin errores de JavaScript' + (p.errs.length ? ': ' + p.errs[0] : ''));
  await p.close();
}
