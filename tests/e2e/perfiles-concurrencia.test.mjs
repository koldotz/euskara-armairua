// Dos dispositivos trabajando a la vez, uno sin conexión: al reconectar se
// fusiona todo (nada se pisa), la ficha de una palabra repasada en los dos va
// entera, los reinicios se propagan y un navegador con datos de la versión
// anterior converge sin perder nada.
import { login, hz, sync } from '../lib/app.mjs';

export default async function(t){
  const srvHz = async () => { const r = await t.sql(`select datuak from armairua_perfilak where gakoa = 'maialen'`); return JSON.parse(r[0].datuak.v['hitzen-kutxa-v1'] || '{}'); };
  const srvKey = async k => (await t.sql(`select datuak from armairua_perfilak where gakoa = 'maialen'`))[0].datuak.v[k];
  const A = await t.tab(), B = await t.tab();
  await A.go(t.base + '/a1.html?a#hiztegia', 1800); await B.go(t.base + '/a1.html?b#hiztegia', 1800);
  await login(A, 'Maialen', '1234'); await login(B, 'Maialen', '1234');
  t.ok((await A.ev(`ARMAIRUA_BANK.state()`)) === 'ok' && (await B.ev(`ARMAIRUA_BANK.state()`)) === 'ok', 'A y B dentro del mismo perfil');

  // A sin conexión repasa 5; B repasa 7 y sube; A repasa 11 (más tarde que B) y reconecta
  await A.offline(true);
  await A.ev(`HIZTEGIA.grade(5, 2)`); await A.sleep(1800);
  t.ok((await A.ev(`ARMAIRUA_BANK.state()`)) === 'error', 'A sin conexión: lo indica');
  await B.ev(`HIZTEGIA.grade(7, 2)`); await sync(B);
  await A.ev(`HIZTEGIA.grade(11, 2)`); await A.sleep(200);
  await A.offline(false); await sync(A, 3000);
  let s = await srvHz();
  t.ok(s[5] && s[7] && s[11], 'nube: los repasos de los dos (5 y 11 de A, 7 de B)');
  t.ok((await hz(A))[7], 'A recibe el de B');
  await sync(B);
  const b = await hz(B);
  t.ok(b[5] && b[11], 'B recibe los de A');

  // la misma palabra en los dos: la ficha entera del repaso más reciente
  await A.offline(true);
  await A.ev(`HIZTEGIA.grade(20, 0)`); await A.sleep(300);
  await B.sleep(100); await B.ev(`HIZTEGIA.grade(20, 2)`); await sync(B);
  const b20 = JSON.stringify((await hz(B))[20]);
  await A.offline(false); await sync(A, 3000);
  t.ok(JSON.stringify((await hz(A))[20]) === b20 && JSON.stringify((await srvHz())[20]) === b20, 'palabra repasada en los dos: gana entera la ficha más reciente (B)');

  // cuaderno: casillas distintas en cada dispositivo
  await A.offline(true);
  await A.ev(`localStorage.setItem('koadernoa:k1', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('koadernoa:k1') || '{}'), { g0: 'etxean' })))`);
  await B.ev(`localStorage.setItem('koadernoa:k1', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('koadernoa:k1') || '{}'), { g1: 'etxera' })))`); await sync(B);
  await A.offline(false); await sync(A, 3000);
  const k1 = JSON.parse(await srvKey('koadernoa:k1'));
  t.ok(k1.g0 === 'etxean' && k1.g1 === 'etxera', 'cuaderno: se juntan las casillas de los dos');

  // reiniciar el vocabulario en B se propaga a A
  await sync(A); await sync(B);
  await B.ev(`window.confirm = () => true; document.getElementById('resetHitz').click()`); await B.sleep(300); await sync(B);
  await sync(A, 2000);
  t.ok(Object.keys(await hz(A)).length === 0 && Object.keys(await srvHz()).length === 0, 'reiniciar en B deja a cero también A y la nube');

  // navegador con los datos de la versión anterior (sin base): converge
  await A.ev(`HIZTEGIA.grade(30, 2)`); await sync(A);
  await B.ev(`(function(){ var m = JSON.parse(localStorage.getItem('armairua-cloud-meta')); delete m.c; localStorage.setItem('armairua-cloud-meta', JSON.stringify(m)); localStorage.removeItem('armairua-cloud-base'); })()`);
  await B.ev(`HIZTEGIA.grade(31, 2)`); await sync(B, 3000);
  s = await srvHz();
  const b2 = await hz(B);
  t.ok(s[30] && s[31] && b2[30] && b2[31], 'desde datos de la versión anterior: no se pierde nada');
  t.ok(!A.errs.length && !B.errs.length, 'sin errores de JavaScript' + ([...A.errs, ...B.errs].length ? ': ' + [...A.errs, ...B.errs][0] : ''));
  await A.close(); await B.close();
}
