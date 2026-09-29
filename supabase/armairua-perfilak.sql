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
-- cada clave de localStorage con la versión (marca de tiempo) de la nube. Cada
-- cambio dice de qué versión parte ("b"): si otro dispositivo la cambió
-- entretanto, el servidor lo rechaza y el navegador fusiona los dos (palabra a
-- palabra, casilla a casilla) y vuelve a subirlo. Así dos dispositivos no se
-- pisan el progreso aunque trabajen a la vez o sin conexión.

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

-- ── comprobar el PIN (interna: la usan sartu y gorde) ──────────────────
-- Devuelve null si el PIN es correcto, o el error listo para devolver.
-- Cada PIN erróneo cuenta, se entre por donde se entre: al quinto seguido el
-- perfil queda bloqueado 15 minutos. No se puede llamar desde fuera (ver
-- permisos al final).
create or replace function public.armairua_pin_egiaztatu(r public.armairua_perfilak, p_pin text)
returns jsonb
language plpgsql volatile
set search_path = public, extensions
as $$
begin
  if r.blokeoa is not null and r.blokeoa > now() then
    return jsonb_build_object('ok', false, 'err', 'blokeatuta', 'noiz_arte', r.blokeoa);
  end if;
  if r.pin_hash = crypt(coalesce(p_pin, ''), r.pin_hash) then
    if r.hutsak > 0 or r.blokeoa is not null then
      update public.armairua_perfilak set hutsak = 0, blokeoa = null where gakoa = r.gakoa;
    end if;
    return null;
  end if;
  update public.armairua_perfilak
     set hutsak  = case when r.hutsak + 1 >= 5 then 0 else r.hutsak + 1 end,
         blokeoa = case when r.hutsak + 1 >= 5 then now() + interval '15 minutes' else null end
   where gakoa = r.gakoa;
  return jsonb_build_object('ok', false, 'err', 'pin', 'geratzen', greatest(0, 4 - r.hutsak));
end
$$;

-- ── entrar (o crear el perfil si el nombre es nuevo) ───────────────────
create or replace function public.armairua_sartu(p_izena text, p_pin text)
returns jsonb
language plpgsql volatile security definer
set search_path = public, extensions
as $$
declare
  k  text := lower(btrim(coalesce(p_izena, '')));
  r  public.armairua_perfilak;
  ez jsonb;
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

  if r.pin_hash is null then
    -- perfil sin PIN (o PIN borrado a mano): el primero que entra lo fija
    update public.armairua_perfilak
       set pin_hash = crypt(p_pin, gen_salt('bf')), hutsak = 0, blokeoa = null
     where gakoa = k;
  else
    ez := public.armairua_pin_egiaztatu(r, p_pin);
    if ez is not null then return ez; end if;
  end if;

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
  nb jsonb := p_datuak -> 'b';          -- versión de la nube de la que parte cada cambio (clientes v3)
  e  record;
  ez jsonb;
  cur numeric;
  ukatuak jsonb := '[]'::jsonb;         -- claves rechazadas por conflicto
  aldatu boolean := false;
begin
  select * into r from public.armairua_perfilak where gakoa = k for update;
  if not found or r.pin_hash is null then
    return jsonb_build_object('ok', false, 'err', 'pin');   -- perfil borrado o PIN restablecido
  end if;
  ez := public.armairua_pin_egiaztatu(r, p_pin);             -- los fallos cuentan para el bloqueo
  if ez is not null then return ez; end if;

  v := coalesce(r.datuak -> 'v', '{}'::jsonb);
  t := coalesce(r.datuak -> 't', '{}'::jsonb);

  for e in select key, value from jsonb_each(coalesce(p_datuak -> 't', '{}'::jsonb)) loop
    continue when jsonb_typeof(e.value) <> 'number' or not (nv ? e.key);
    cur := coalesce((t ->> e.key)::numeric, 0);
    if nb is not null then
      -- el cliente dice de qué versión parte: solo se acepta si nadie la ha
      -- cambiado entretanto. Si no, se rechaza y el cliente fusiona y reintenta.
      if coalesce((nb ->> e.key)::numeric, 0) = cur then
        v := v || jsonb_build_object(e.key, nv -> e.key);
        t := t || jsonb_build_object(e.key, greatest((e.value #>> '{}')::numeric, cur + 1));
        aldatu := true;
      else
        ukatuak := ukatuak || to_jsonb(e.key);
      end if;
    elsif (e.value #>> '{}')::numeric > cur then
      -- clientes antiguos (sin base): gana la versión más reciente
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

  return jsonb_build_object('ok', true, 'aldatu', aldatu, 'ukatuak', ukatuak,
                            'datuak', jsonb_build_object('v', v, 't', t), 'eguneratua', r.eguneratua);
end
$$;

-- ── permisos: la clave pública solo puede llamar a las tres funciones ──
revoke all on function public.armairua_pin_egiaztatu(public.armairua_perfilak, text) from public, anon, authenticated;
revoke all on function public.armairua_zerrenda()                 from public;
revoke all on function public.armairua_sartu(text, text)          from public;
revoke all on function public.armairua_gorde(text, text, jsonb)   from public;
grant execute on function public.armairua_zerrenda()               to anon, authenticated;
grant execute on function public.armairua_sartu(text, text)        to anon, authenticated;
grant execute on function public.armairua_gorde(text, text, jsonb) to anon, authenticated;
