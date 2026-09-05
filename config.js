/* ─────────────────────────────────────────────────────────────────────
   Banco de perfiles · configuración de Supabase
   Rellena estos dos valores con los de TU proyecto (Settings → API):
     url : «Project URL»      p.ej.  https://abcdxyzw.supabase.co
     key : «anon public» key  (Project API keys → anon / public)
   Estos datos son PÚBLICOS por diseño (van en el navegador); no pongas
   aquí la «service_role».
   Mientras estén vacíos, la app funciona exactamente igual que ahora
   (perfil y progreso solo en este navegador).
   ───────────────────────────────────────────────────────────────────── */
window.ARMAIRUA_CFG = {
  url:   "",          // ← pega aquí tu Project URL
  key:   "",          // ← pega aquí tu anon public key
  table: "perfilak"   // nombre de la tabla (déjalo así salvo que la llames distinto)
};
