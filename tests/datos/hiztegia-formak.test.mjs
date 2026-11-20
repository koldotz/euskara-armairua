// Formas generadas del Hiztegia · Bakarka y su lista de correcciones revisadas
// (tools/hiztegia/salbuespenak.json, auditoría del 2026-11-19). Comprueba que la
// lista esté bien formada, que cada corrección apunte a una forma que existe,
// que las aprobadas estén aplicadas en bakarka-hiztegia.json y que no vuelvan
// los patrones de error ya corregidos (si una reimportación los trae, esto para).
import fs from 'fs';
import path from 'path';
import { aplikatu } from '../../tools/hiztegia/salbuespenak.mjs';

export default async function(t){
  const read = f => JSON.parse(fs.readFileSync(path.join(t.root, f), 'utf8'));
  const d = read('bakarka-hiztegia.json'), S = read('tools/hiztegia/salbuespenak.json');
  const ESTADOS = Object.keys(S.egoerak || {});
  const Z = S.zuzenketak || [];

  // ── la lista
  const malas = Z.filter(z => !(Number.isInteger(z.id) && z.lema && z.kat && z.gakoa && typeof z.okerra === 'string' && z.zuzena && z.arrazoia && z.iturria && ESTADOS.includes(z.egoera)));
  t.ok(Z.length && !malas.length, `las ${Z.length} correcciones llevan id, lema, categoría, clave, forma mala y buena, motivo, fuente y estado` + (malas.length ? ' — mal: ' + malas.slice(0, 3).map(z => z.lema + ' ' + z.gakoa).join(', ') : ''));
  const claves = Z.map(z => z.id + ':' + z.gakoa);
  t.ok(new Set(claves).size === claves.length, 'ninguna forma se corrige dos veces');
  t.ok(Z.every(z => z.okerra !== z.zuzena), 'cada corrección cambia algo');
  t.ok((S.zalantzak || []).every(x => x.gaia && x.proposamena && ESTADOS.includes(x.egoera)), `las ${(S.zalantzak || []).length} dudas abiertas dicen qué se propone`);

  // ── aplicadas
  const copia = JSON.parse(JSON.stringify(d));
  const r = aplikatu(copia, S);
  t.ok(!r.falta.length, 'cada corrección apunta a una palabra y una forma que existen' + (r.falta.length ? ' — no encuentro: ' + r.falta.map(z => z.lema + ' ' + z.gakoa).join(', ') : ''));
  t.ok(!r.aldatuak.length, 'ninguna forma corregida ha cambiado por otro lado' + (r.aldatuak.length ? ' — ' + r.aldatuak.map(z => z.lema + ' ' + z.gakoa + ' = ' + z.orain).join(', ') : ''));
  t.ok(!r.aplikatuak.length, `las ${Z.filter(z => z.egoera === 'onartua').length} correcciones aprobadas están aplicadas en bakarka-hiztegia.json` + (r.aplikatuak.length ? ' — faltan ' + r.aplikatuak.length + ': node tools/hiztegia/salbuespenak.mjs --aplikatu' : ''));

  // ── orígenes de los lemas que son formas de otro lema
  const J = S.jatorriak || [];
  t.ok(J.length && !r.jat.falta.length, `los ${J.length} orígenes apuntan a palabras que existen` + (r.jat.falta.length ? ' — no encuentro: ' + r.jat.falta.map(z => z.lema).join(', ') : ''));
  t.ok(!r.jat.aplikatuak.length, 'los orígenes aprobados están en bakarka-hiztegia.json (campo «jatorria»)' + (r.jat.aplikatuak.length ? ' — faltan ' + r.jat.aplikatuak.length : ''));
  const byId = new Map(d.entries.map(e => [e.id, e]));
  const incoh = J.filter(z => { const j = z.jatorria; if (!j || !j.lema || !j.atzizkia) return true; if (j.id == null) return !j.oharra; const o = byId.get(j.id); if (!o || o.eu !== j.lema) return true;
    if (j.gakoa){ const v = j.gakoa.split('.').reduce((a, x) => a && a[x], o.forms); return v !== z.lema; } return !z.lema.startsWith(j.lema); }).map(z => z.lema);
  t.ok(!incoh.length, 'cada origen cuadra: la forma del lema de origen es la palabra (goiz · sg.non = goizean)' + (incoh.length ? ' — ' + incoh.join(', ') : ''));

  // ── que no vuelvan los patrones corregidos
  const E = d.entries;
  const gau = E.find(e => e.eu === 'gau' && e.cat === 'iz');
  t.ok(gau && gau.forms.sg.non === 'gauean' && gau.forms.sg.nongo === 'gaueko', 'gau se declina con -e-: gauean, gaueko');
  const ng3 = E.filter(e => e.cat === 'iz' && (e.tax || []).includes('NG3') && e.forms.mg && e.forms.pl)
    .filter(e => e.forms.pl.nor !== e.forms.mg.nor + (/a$/.test(e.forms.mg.nor) ? 'k' : 'ak')).map(e => e.eu + ' (' + e.forms.mg.nor + ')');
  t.ok(!ng3.length, 'los plurales fijos tienen un mugagabe que da su plural (galtza → galtzak)' + (ng3.length ? ' — ' + ng3.join(', ') : ''));
  const art = E.filter(e => (e.cat === 'iz' || e.cat === 'lek') && e.forms && / /.test(e.eu) && /a$/.test(e.eu)).filter(e => {
    const f = e.cat === 'lek' ? e.forms : e.forms.sg; return f && f.nora === e.eu + 'ra';
  }).map(e => e.eu);
  const okArt = ['aurrezki kutxa'];   // kutxa: la -a es de la palabra
  const restan = art.filter(x => !okArt.includes(x));
  t.ok(!restan.length, 'los lemas de varias palabras con artículo pierden la -a al declinarse (Kantauri itsasora)' + (restan.length ? ' — ' + restan.join(', ') : ''));
  const on = E.find(e => e.eu === 'on' && e.cat === 'izl');
  t.ok(on && on.forms.konparatiboa === 'hobe', 'on → hobe');
}
