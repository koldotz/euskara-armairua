// config.js y la tarea que mantiene despierto Supabase (.github/workflows/
// supabase-esnatuta.yml) tienen que seguir entendiéndose: la tarea saca la
// URL y la clave de config.js con estas mismas expresiones.
import fs from 'fs';
import path from 'path';

export default async function(t){
  const cfg = fs.readFileSync(path.join(t.root, 'config.js'), 'utf8');
  const url = (cfg.match(/^\s*url:\s*"([^"]+)"/m) || [])[1], key = (cfg.match(/^\s*key:\s*"([^"]+)"/m) || [])[1];
  t.ok(/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url || ''), 'config.js: la URL se puede leer y es de Supabase');
  t.ok(/^(sb_publishable_|eyJ)/.test(key || ''), 'config.js: la clave es la pública (publishable o anon)');
  t.ok(!/"[^"]*(service_role|sb_secret_)[^"]*"/.test(cfg), 'config.js no contiene ninguna clave secreta (solo en comentarios se nombran)');
  const wf = fs.readFileSync(path.join(t.root, '.github/workflows/supabase-esnatuta.yml'), 'utf8');
  t.ok(/cron:/.test(wf) && /armairua_zerrenda/.test(wf) && /workflow_dispatch/.test(wf), 'la tarea programada existe, consulta el banco y se puede lanzar a mano');
  t.ok(!/izena.*echo|cat out\.json.*zerrenda/.test(wf), 'la tarea no escribe nombres de perfiles en el registro público');
}
