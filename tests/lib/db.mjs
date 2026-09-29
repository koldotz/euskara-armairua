// Base de datos de prueba: PostgreSQL en memoria (PGlite + pgcrypto) con el
// SQL real de supabase/armairua-perfilak.sql cargado dos veces (debe ser
// idempotente). Imita los permisos por defecto de Supabase, que conceden
// EXECUTE a anon y authenticated en cada función nueva del esquema public.
import fs from 'fs';
import path from 'path';

export async function newDb(root){
  const { PGlite } = await import('@electric-sql/pglite');
  const { pgcrypto } = await import('@electric-sql/pglite/contrib/pgcrypto');
  const db = new PGlite({ extensions: { pgcrypto } });
  await db.exec('create role anon; create role authenticated;');
  await db.exec('alter default privileges in schema public grant execute on functions to anon, authenticated;');
  const SQL = fs.readFileSync(path.join(root, 'supabase/armairua-perfilak.sql'), 'utf8');
  await db.exec(SQL);
  await db.exec(SQL);
  const q = async (s, p = []) => (await db.query(s, p)).rows;
  const one = async (s, p = []) => { const r = await q(s, p); return r[0] ? r[0].r : undefined; };
  return {
    db, q, one,
    sartu: (n, pin) => one('select armairua_sartu($1,$2) r', [n, pin]),
    gorde: (n, pin, d) => one('select armairua_gorde($1,$2,$3::jsonb) r', [n, pin, JSON.stringify(d)]),
    perfila: async gakoa => (await q('select * from armairua_perfilak where gakoa = $1', [gakoa]))[0] || null
  };
}
