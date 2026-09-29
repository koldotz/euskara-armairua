// Seguridad del PIN: todo fallo cuenta para el bloqueo, entre por donde entre
// (antes se podían probar los 10 000 PIN por armairua_gorde sin bloquearse).
import { newDb } from '../lib/db.mjs';

export default async function(t){
  const D = await newDb(t.root);
  const st = async () => { const p = await D.perfila('maialen'); return { hutsak: p.hutsak, bl: !!p.blokeoa && new Date(p.blokeoa) > new Date() }; };
  await D.sartu('Maialen', '7351');
  await D.gorde('Maialen', '7351', { v: { 'koadernoa:k1': 'x' }, t: { 'koadernoa:k1': 5 } });

  let r;
  for (let i = 0; i < 5; i++) r = await D.gorde('Maialen', '000' + i, {});
  t.ok((await st()).bl && r.err === 'pin' && r.geratzen === 0, 'gorde: al quinto PIN erróneo, bloqueo');
  r = await D.gorde('Maialen', '7351', {});
  t.ok(r.err === 'blokeatuta' && !r.datuak, 'bloqueado: ni con el PIN bueno se leen los datos');
  t.ok((await D.sartu('Maialen', '7351')).err === 'blokeatuta', 'sartu también está bloqueado');

  await D.q('update armairua_perfilak set blokeoa = null, hutsak = 0');
  let tries = 0, found = false;
  for (let i = 0; i < 10000 && !found; i++) {
    r = await D.gorde('Maialen', String(i).padStart(4, '0'), {}); tries++;
    if (r.ok) found = true;
    if (r.err === 'blokeatuta') break;
  }
  t.ok(!found && tries <= 6, `un ataque por fuerza bruta se corta a los ${tries} intentos`);

  await D.q('update armairua_perfilak set blokeoa = null, hutsak = 0');
  await D.sartu('Maialen', '1111'); await D.gorde('Maialen', '2222', {});
  t.ok((await st()).hutsak === 2, 'los fallos de sartu y gorde se suman');
  r = await D.gorde('Maialen', '7351', {});
  t.ok(r.ok && (await st()).hutsak === 0 && r.datuak.v['koadernoa:k1'] === 'x', 'el PIN bueno reinicia el contador; datos intactos');

  for (let i = 0; i < 5; i++) await D.sartu('Maialen', '9999');
  await D.q(`update armairua_perfilak set blokeoa = now() - interval '1 minute'`);
  r = await D.sartu('Maialen', '7351');
  t.ok(r.ok && !(await st()).bl && (await st()).hutsak === 0, 'bloqueo caducado: entra y se limpia');

  await D.q('update armairua_perfilak set pin_hash = null');
  r = await D.gorde('Maialen', '7351', {});
  t.ok(r.err === 'pin' && (await st()).hutsak === 0, 'PIN restablecido: gorde falla sin contar');
  t.ok((await D.sartu('Maialen', '4242')).ok && (await D.gorde('Maialen', '4242', {})).datuak.v['koadernoa:k1'] === 'x', 'nuevo PIN fijado, progreso conservado');

  await D.db.exec('set role anon');
  const intenta = async s => { try { await D.q(s); return 'ok'; } catch (e) { return e.message; } };
  t.ok(/permission denied/.test(await intenta(`select public.armairua_pin_egiaztatu(null::public.armairua_perfilak, '1')`)), 'anon no puede llamar a la función interna del PIN');
  t.ok(/permission denied/.test(await intenta('select * from armairua_perfilak')), 'anon no puede leer la tabla');
  t.ok((await intenta('select armairua_zerrenda()')) === 'ok', 'anon sí lista nombres');
  t.ok((await intenta(`select armairua_gorde('Maialen','4242','{}'::jsonb)`)) === 'ok', 'anon sí guarda (y la función interna actúa dentro)');
  await D.db.exec('reset role');
}
