/* ─────────────────────────────────────────────────────────────────────
   Banco de perfiles · configuración de Supabase
   Para activarlo (una sola vez):
     1. supabase.com → New project (el plan gratuito basta).
     2. SQL Editor → New query → pega supabase/armairua-perfilak.sql → Run.
     3. Project Settings → API Keys: copia la «Project URL» y la clave
        «publishable» (sb_publishable_…) y ponlas abajo.
   Estos datos son PÚBLICOS por diseño (van en el navegador): con ellos solo
   se puede llamar a las tres funciones del banco, que exigen nombre + PIN.
   No pongas aquí nunca la clave «secret» ni la «service_role».
   Mientras estén vacíos, la app funciona igual (progreso solo en el navegador).
   ───────────────────────────────────────────────────────────────────── */
window.ARMAIRUA_CFG = {
  url: "https://vqbwospxdoyquuqqcuxj.supabase.co",               // Project URL
  key: "sb_publishable_Nipeg8V4EFYYUAFlrn9uhA_OT97osVQ"          // clave publishable
};
