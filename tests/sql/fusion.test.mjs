// Versión base («b»): el servidor solo acepta un cambio si parte de lo que hay
// en la nube; si otro dispositivo la cambió entretanto, lo rechaza (ukatuak)
// para que el navegador fusione y reintente. Los clientes sin «b» siguen igual.
import { newDb } from '../lib/db.mjs';

export default async function(t){
  const D = await newDb(t.root);
  await D.sartu('M', '1234');
  const g = d => D.gorde('M', '1234', d);
  let r = await g({ v: { k: 'A1' }, t: { k: 1000 }, b: { k: 0 } });
  t.ok(r.ukatuak.length === 0 && r.datuak.v.k === 'A1' && r.datuak.t.k === 1000, 'clave nueva con base 0 → aceptada');
  r = await g({ v: { k: 'B1' }, t: { k: 900 }, b: { k: 1000 } });
  t.ok(r.datuak.v.k === 'B1' && r.datuak.t.k === 1001, 'base correcta con el reloj atrasado → aceptada, la versión sube (1001)');
  r = await g({ v: { k: 'A2' }, t: { k: 5000 }, b: { k: 1000 } });
  t.ok(r.ukatuak[0] === 'k' && r.datuak.v.k === 'B1', 'base vieja → rechazada, aunque su hora sea más reciente');
  r = await g({ v: { k: 'A2+B1' }, t: { k: 5000 }, b: { k: 1001 } });
  t.ok(r.ukatuak.length === 0 && r.datuak.v.k === 'A2+B1', 'reintento con la base buena → aceptado');
  r = await g({ v: { k: 'viejo' }, t: { k: 10 } });
  t.ok(r.datuak.v.k === 'A2+B1', 'cliente antiguo con hora vieja → no pisa');
  r = await g({ v: { k: 'antiguo' }, t: { k: 99999 } });
  t.ok(r.datuak.v.k === 'antiguo', 'cliente antiguo con hora nueva → gana (compatibilidad)');
  r = await g({ v: { x: '1', y: '2' }, t: { x: 1, y: 1 }, b: { x: 0, y: 7 } });
  t.ok(r.datuak.v.x === '1' && !r.datuak.v.y && r.ukatuak.join() === 'y', 'en una misma llamada: x aceptada, y rechazada');
}
