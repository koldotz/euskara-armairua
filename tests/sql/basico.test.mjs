// Funcionamiento básico del banco de perfiles: crear, entrar, guardar, bloqueo,
// restablecer PIN, lista pública y permisos.
import { newDb } from '../lib/db.mjs';

export default async function(t){
  const D = await newDb(t.root);
  let r = await D.sartu('Maialen', '1234');
  t.ok(r.ok && r.berria, 'perfil nuevo');
  r = await D.sartu(' maialen ', '1234');
  t.ok(r.ok && !r.berria && r.izena === 'Maialen', 'el nombre no distingue mayúsculas ni espacios');
  r = await D.sartu('Maialen', '0000');
  t.ok(r.err === 'pin' && r.geratzen === 4, 'PIN erróneo: quedan 4 intentos');
  t.ok((await D.sartu('Maialen', '12a4')).err === 'pin-formatua', 'PIN que no son 4 cifras → pin-formatua');
  t.ok((await D.sartu('', '1234')).err === 'izena', 'nombre vacío → izena');

  // clientes antiguos (sin «b»): gana la hora más reciente, clave a clave
  r = await D.gorde('Maialen', '1234', { v: { 'hitzen-kutxa-v1': '{"0":{"b":2}}', 'koadernoa:k1': '{"g0":"etxean"}' }, t: { 'hitzen-kutxa-v1': 1000, 'koadernoa:k1': 1000 } });
  t.ok(r.ok && r.aldatu && r.datuak.t['koadernoa:k1'] === 1000, 'guardar: se acepta');
  r = await D.gorde('Maialen', '1234', { v: { 'hitzen-kutxa-v1': '{"0":{"b":1}}', 'koadernoa:k1': '{"g0":"etxera"}', 'mintzamena-a1-v1': '{"done":{"o01":1}}' }, t: { 'hitzen-kutxa-v1': 900, 'koadernoa:k1': 2000, 'mintzamena-a1-v1': 2000 } });
  t.ok(r.datuak.v['hitzen-kutxa-v1'] === '{"0":{"b":2}}', 'lo más antiguo no pisa');
  t.ok(r.datuak.v['koadernoa:k1'] === '{"g0":"etxera"}' && r.datuak.v['mintzamena-a1-v1'], 'lo más nuevo y lo nuevo sí entran');
  r = await D.gorde('Maialen', '1234', { v: {}, t: {} });
  t.ok(r.ok && !r.aldatu, 'solo leer: ok sin cambios');
  t.ok((await D.gorde('Maialen', '9999', { v: { a: '1' }, t: { a: 5 } })).err === 'pin', 'guardar con PIN erróneo → pin');

  // bloqueo tras 5 fallos seguidos (el de gorde ya cuenta)
  for (let i = 0; i < 4; i++) r = await D.sartu('Maialen', '1111');
  t.ok(r.err === 'pin' && r.geratzen === 0, 'quinto fallo');
  t.ok((await D.sartu('Maialen', '1234')).err === 'blokeatuta', 'bloqueado aunque el PIN sea bueno');
  await D.q(`update armairua_perfilak set blokeoa = now() - interval '1 minute'`);
  t.ok((await D.sartu('Maialen', '1234')).ok, 'al caducar el bloqueo vuelve a entrar');

  // PIN olvidado: se vacía pin_hash y el siguiente PIN queda como nuevo
  await D.q('update armairua_perfilak set pin_hash = null');
  t.ok((await D.sartu('Maialen', '5678')).ok && (await D.sartu('Maialen', '1234')).err === 'pin' && (await D.sartu('Maialen', '5678')).ok, 'PIN restablecido: vale el nuevo, no el viejo');

  const lista = await D.q('select * from armairua_zerrenda()');
  t.ok(lista.length === 1 && lista[0].izena === 'Maialen' && !('datuak' in lista[0]), 'la lista pública solo da nombre y fecha');
  t.ok((await D.perfila('maialen')).pin_hash.startsWith('$2a$'), 'el PIN se guarda con bcrypt');
  t.ok((await D.q('select armairua_bertsioa() v'))[0].v === 3, 'armairua_bertsioa() = 3 (súbelo en el SQL y aquí al cambiar el esquema)');

  await D.db.exec('set role anon');
  let err = '';
  try { await D.q('select * from armairua_perfilak'); } catch (e) { err = e.message; }
  t.ok(/permission denied/.test(err), 'anon no puede leer la tabla');
  t.ok((await D.sartu('Maialen', '5678')).ok, 'anon sí puede llamar a las funciones');
  await D.db.exec('reset role');
}
