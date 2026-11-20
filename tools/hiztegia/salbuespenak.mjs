// Correcciones revisadas de las formas generadas del Hiztegia · Bakarka.
// La lista vive en tools/hiztegia/salbuespenak.json: cada corrección dice qué
// palabra (id, lema, categoría), qué forma (gakoa: «sg.non», «nora»,
// «konparatiboa»…), la forma mala que trae el generador, la buena, el motivo,
// la fuente y su estado. Solo se aplican las «onartua».
//
//   node tools/hiztegia/salbuespenak.mjs              comprueba (no escribe)
//   node tools/hiztegia/salbuespenak.mjs --aplikatu   las aplica a bakarka-hiztegia.json
//
// El importador del hiztegia (tools/fitxak/bakarka.mjs) llama a aplikatu() al
// reimportar, para que una versión nueva del artifact no deshaga lo corregido.
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const LISTA = path.join(HERE, 'salbuespenak.json');

export function irakurri(file = LISTA){ return JSON.parse(fs.readFileSync(file, 'utf8')); }

/* Aplica a `d` (el JSON del hiztegia ya leído) las correcciones cuyo estado esté en `egoerak`.
   Devuelve qué se aplicó, qué ya estaba, qué ha cambiado por otro lado y qué no se encuentra. */
export function aplikatu(d, S, { egoerak = ['onartua'] } = {}){
  const byId = new Map(d.entries.map(e => [e.id, e]));
  const r = { aplikatuak:[], jadanik:[], aldatuak:[], falta:[] };
  for (const z of S.zuzenketak){
    if (!egoerak.includes(z.egoera)) continue;
    const e = byId.get(z.id);
    if (!e || e.eu !== z.lema || e.cat !== z.kat){ r.falta.push(z); continue; }
    const p = z.gakoa.split('.'), k = p.pop();
    const o = p.reduce((a, x) => a && a[x], e.forms);
    if (!o || !(k in o)){ r.falta.push(z); continue; }
    if (o[k] === z.zuzena) r.jadanik.push(z);
    else if (o[k] === z.okerra){ o[k] = z.zuzena; r.aplikatuak.push(z); }
    else r.aldatuak.push({ ...z, orain:o[k] });
  }
  /* jatorriak: lemas que son formas de otro lema (goizean = goiz + NON); se quedan como
     palabras propias y llevan «jatorria» para que el análisis explique su lectura */
  r.jat = { aplikatuak:[], jadanik:[], falta:[] };
  for (const z of (S.jatorriak || [])){
    if (!egoerak.includes(z.egoera)) continue;
    const e = byId.get(z.id);
    if (!e || e.eu !== z.lema || e.cat !== z.kat){ r.jat.falta.push(z); continue; }
    if (JSON.stringify(e.jatorria) === JSON.stringify(z.jatorria)) r.jat.jadanik.push(z);
    else { e.jatorria = z.jatorria; r.jat.aplikatuak.push(z); }
  }
  return r;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href){
  const ROOT = path.resolve(HERE, '..', '..');
  const HZ = path.join(ROOT, 'bakarka-hiztegia.json');
  const d = JSON.parse(fs.readFileSync(HZ, 'utf8'));
  const S = irakurri();
  const r = aplikatu(d, S);
  const pend = S.zuzenketak.filter(z => z.egoera === 'berrikusteko').length;
  console.log(`Correcciones aprobadas: ${S.zuzenketak.filter(z => z.egoera === 'onartua').length} · pendientes de revisar: ${pend} · dudas abiertas: ${(S.zalantzak || []).length}`);
  console.log(`  por aplicar: ${r.aplikatuak.length} · ya aplicadas: ${r.jadanik.length}`);
  console.log(`Orígenes (jatorriak): ${(S.jatorriak || []).length} · por aplicar: ${r.jat.aplikatuak.length} · ya aplicados: ${r.jat.jadanik.length}`);
  r.aldatuak.forEach(z => console.log(`  ⚠ ${z.lema} ${z.gakoa}: se esperaba «${z.okerra}» y hay «${z.orain}»`));
  r.falta.concat(r.jat.falta).forEach(z => console.log(`  ⚠ no encuentro ${z.lema} (#${z.id}, ${z.kat}) ${z.gakoa || ''}`));
  const n = r.aplikatuak.length + r.jat.aplikatuak.length;
  if (process.argv.includes('--aplikatu') && n){
    fs.writeFileSync(HZ, JSON.stringify(d));
    console.log(`  escrito bakarka-hiztegia.json (${r.aplikatuak.length} formas corregidas, ${r.jat.aplikatuak.length} orígenes)`);
  } else if (n) console.log('  (sin escribir: añade --aplikatu)');
  if (r.aldatuak.length || r.falta.length || r.jat.falta.length) process.exit(1);
}
