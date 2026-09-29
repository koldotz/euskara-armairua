-- ══ Euskara Armairua · banco de perfiles con PIN (Supabase / PostgreSQL) ══
--
-- Cómo usarlo: en el panel de Supabase → SQL Editor → New query → pega TODO
-- este fichero → Run. Se puede ejecutar más de una vez sin romper nada.
--
-- Qué crea:
--   · la tabla armairua_perfilak, CERRADA al acceso directo (RLS sin políticas):
--     con la clave pública nadie puede leerla ni escribirla tal cual;
--   · tres funciones, que son la única puerta de entrada:
--       armairua_zerrenda()                  nombres de los perfiles (sin datos)
--       armairua_sartu(izena, pin)           entrar o crear el perfil
--       armairua_gorde(izena, pin, datuak)   subir cambios y recibir lo de la nube
--
-- El PIN (4 cifras) se guarda cifrado con bcrypt. Tras 5 PIN erróneos seguidos
-- el perfil se bloquea 15 minutos. Si alguien olvida su PIN: Table Editor →
-- armairua_perfilak → vacía su pin_hash; el siguiente PIN con el que entre
-- quedará como nuevo.
--
-- El progreso (datuak) es {"v": {clave: valor}, "t": {clave: marca_de_tiempo}}:
-- cada clave de localStorage con la hora de su último cambio. Al guardar, el
-- servidor se queda, clave a clave, con la versión más reciente, así que dos
-- dispositivos no se pisan el progreso aunque suban a la vez.

create extension if not exists pgcrypto;

create table if not exists public.armairua_perfilak (
  gakoa       text primary key,                          -- nombre normalizado (minúsculas)
  izena       text not null,                             -- nombre tal como se escribió
  pin_hash    text,
  datuak      jsonb not null default '{"v":{},"t":{}}'::jsonb,
  eguneratua  timestamptz not null default now(),
  sortua      timestamptz not null default now(),
  hutsak      integer not null default 0,                -- PIN erróneos seguidos
  blokeoa     timestamptz                                -- bloqueado hasta…
);

alter table public.armairua_perfilak enable row level security;
revoke all on table public.armairua_perfilak from anon, authenticated;

-- ── lista de nombres (para la pantalla de entrada) ─────────────────────
create or replace function public.armairua_zerrenda()
returns table(izena text, eguneratua timestamptz)
language sql stable security definer
set search_path = public, extensions
as $$
  select p.izena, p.eguneratua from public.armairua_perfilak p
  order by p.eguneratua desc limit 60
$$;

-- ── entrar (o crear el perfil si el nombre es nuevo) ───────────────────
create or replace function public.armairua_sartu(p_izena text, p_pin text)
returns jsonb
language plpgsql volatile security definer
set search_path = public, extensions
as $$
declare
  k text := lower(btrim(coalesce(p_izena, '')));
  r public.armairua_perfilak;
begin
  if k = '' or length(k) > 40 then
    return jsonb_build_object('ok', false, 'err', 'izena');
  end if;
  if p_pin is null or p_pin !~ '^[0-9]{4}$' then
    return jsonb_build_object('ok', false, 'err', 'pin-formatua');
  end if;

  select * into r from public.armairua_perfilak where gakoa = k for update;

  if not found then
    insert into public.armairua_perfilak (gakoa, izena, pin_hash)
    values (k, btrim(p_izena), crypt(p_pin, gen_salt('bf')))
    returning * into r;
    return jsonb_build_object('ok', true, 'berria', true, 'izena', r.izena,
                              'datuak', r.datuak, 'eguneratua', r.eguneratua);
  end if;

  if r.blokeoa is not null and r.blokeoa > now() then
    return jsonb_build_object('ok', false, 'err', 'blokeatuta', 'noiz_arte', r.blokeoa);
  end if;

  if r.pin_hash is null then
    -- perfil sin PIN (o PIN borrado a mano): el primero que entra lo fija
    update public.armairua_perfilak set pin_hash = crypt(p_pin, gen_salt('bf')) where gakoa = k;
  elsif r.pin_hash <> crypt(p_pin, r.pin_hash) then
    update public.armairua_perfilak
       set hutsak  = case when r.hutsak + 1 >= 5 then 0 else r.hutsak + 1 end,
           blokeoa = case when r.hutsak + 1 >= 5 then now() + interval '15 minutes' else null end
     where gakoa = k;
    return jsonb_build_object('ok', false, 'err', 'pin', 'geratzen', greatest(0, 4 - r.hutsak));
  end if;

  update public.armairua_perfilak set hutsak = 0, blokeoa = null where gakoa = k;
  return jsonb_build_object('ok', true, 'berria', false, 'izena', r.izena,
                            'datuak', r.datuak, 'eguneratua', r.eguneratua);
end
$$;

-- ── guardar: fusiona clave a clave (gana lo más reciente) y devuelve el total ──
create or replace function public.armairua_gorde(p_izena text, p_pin text, p_datuak jsonb)
returns jsonb
language plpgsql volatile security definer
set search_path = public, extensions
as $$
declare
  k  text := lower(btrim(coalesce(p_izena, '')));
  r  public.armairua_perfilak;
  v  jsonb;
  t  jsonb;
  nv jsonb := coalesce(p_datuak -> 'v', '{}'::jsonb);
  e  record;
  aldatu boolean := false;
begin
  select * into r from public.armairua_perfilak where gakoa = k for update;
  if not found or r.pin_hash is null
     or (r.blokeoa is not null and r.blokeoa > now())
     or r.pin_hash <> crypt(coalesce(p_pin, ''), r.pin_hash) then
    return jsonb_build_object('ok', false, 'err', 'pin');
  end if;

  v := coalesce(r.datuak -> 'v', '{}'::jsonb);
  t := coalesce(r.datuak -> 't', '{}'::jsonb);

  for e in select key, value from jsonb_each(coalesce(p_datuak -> 't', '{}'::jsonb)) loop
    if jsonb_typeof(e.value) = 'number' and nv ? e.key
       and (e.value #>> '{}')::numeric > coalesce((t ->> e.key)::numeric, 0) then
      v := v || jsonb_build_object(e.key, nv -> e.key);
      t := t || jsonb_build_object(e.key, e.value);
      aldatu := true;
    end if;
  end loop;

  if aldatu then
    if octet_length(jsonb_build_object('v', v, 't', t)::text) > 3000000 then
      return jsonb_build_object('ok', false, 'err', 'handiegia');
    end if;
    update public.armairua_perfilak
       set datuak = jsonb_build_object('v', v, 't', t), eguneratua = now()
     where gakoa = k
     returning eguneratua into r.eguneratua;
  end if;

  return jsonb_build_object('ok', true, 'aldatu', aldatu,
                            'datuak', jsonb_build_object('v', v, 't', t), 'eguneratua', r.eguneratua);
end
$$;

-- ── permisos: la clave pública solo puede llamar a las tres funciones ──
revoke all on function public.armairua_zerrenda()                 from public;
revoke all on function public.armairua_sartu(text, text)          from public;
revoke all on function public.armairua_gorde(text, text, jsonb)   from public;
grant execute on function public.armairua_zerrenda()               to anon, authenticated;
grant execute on function public.armairua_sartu(text, text)        to anon, authenticated;
grant execute on function public.armairua_gorde(text, text, jsonb) to anon, authenticated;
