// Gafas de Geruzak: el diccionario es coherente y el fichero publicado es
// exactamente lo que produce el generador (nadie lo ha tocado a mano).
import fs from 'fs';
import { OUT, validate, generate } from '../../tools/geruzak/build.mjs';

export default async function(t){
  const errs = validate();
  t.ok(!errs.length, 'diccionario coherente (morfemas conocidos, piezas que forman la palabra)' + (errs.length ? ': ' + errs.slice(0, 5).join(' · ') : ''));
  t.ok(fs.readFileSync(OUT, 'utf8') === generate(), 'armairua-geruzak-betaurrekoak.js coincide con tools/geruzak (si no: node tools/geruzak/build.mjs)');
}
