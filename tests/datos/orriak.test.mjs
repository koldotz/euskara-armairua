// Hojas de respuestas de Arian A1 (armairua-a1-arian-orria.js): que estén las
// doce unidades bien formadas y, sobre todo, que sigan siendo solo eso: números,
// páginas, pistas y casillas, sin el texto del libro. Por eso se publican.
import fs from 'fs';
import path from 'path';
import vm from 'vm';

const TYPES = ['ikus', 'lib', 'eg', 'bai', 'abc', 'auk', 'mark', 'taula', 'idaz', 'tx'];
/* campos que puede llevar un ejercicio: si aparece otro, es que se ha colado algo que no es estructura */
const EX_KEYS = ['n', 'p', 'pp', 'au', 'm', 'zer', 'hint', 'adib', 'it', 'grp', 'op', 'pre', 'oh', 'rows', 'cols', 'tx', 'luze', 'zabal', 'bat'];
const words = s => String(s).trim().split(/\s+/).filter(Boolean).length;

export default async function(t){
  const read = f => fs.readFileSync(path.join(t.root, f), 'utf8');
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
  vm.runInContext(read('armairua-a1-arian-orria.js'), ctx, { filename: 'armairua-a1-arian-orria.js' });
  const O = ctx.A1_ORRIAK, U = O.unitateak;

  t.ok(O.src === 'arian' && O.taldea === 'arian-orria', 'las hojas se declaran de «Arian A1» y con su grupo de índice');
  t.ok(U.length === 12 && U.every((u, i) => u.n === i + 1 && u.id === 'aro-' + String(i + 1).padStart(2, '0')),
    'doce unidades, aro-01 … aro-12 (de ese id salen las claves de lo que escribes: no se cambia)');

  const bad = [], long = [], notes = [];
  let nEx = 0, nAu = 0;
  U.forEach(u => {
    const [from, to] = u.orr.split('–').map(Number), keys = new Set();
    if (!(from > 0 && to >= from)) bad.push(u.id + ': páginas «' + u.orr + '»');
    if (new Set(u.atalak.map(s => s.id)).size !== u.atalak.length) bad.push(u.id + ': apartado repetido');
    u.atalak.forEach(s => {
      if (!s.lan && !s.falta) bad.push(`${u.id} ${s.id}: sin nota ni aviso`);
      (s.lot || []).forEach(l => { if (!(l[0] >= 1 && l[0] <= 20) || !l[1]) bad.push(`${u.id} ${s.id}: enlace a Geruzak §${l[0]}`); });
      /* las notas son propias; lo que citan en euskera son formas sueltas, no frases del libro */
      [...String(s.lan || '').matchAll(/\*\*(.+?)\*\*|\*(.+?)\*/g)].forEach(m => { if (words(m[1] || m[2]) > 7) notes.push(`${u.id} ${s.id}: «${m[1] || m[2]}»`); });
      s.ar.forEach(e => {
        if (e.g != null) { if (Object.keys(e).length !== 1 || words(e.g) > 6) long.push(`${u.id} ${s.id}: rótulo «${e.g}»`); return; }
        nEx++; if (e.au) nAu++;
        const k = s.id + e.n, where = `${u.id} ${k}`;
        if (keys.has(k)) bad.push(where + ': clave repetida'); keys.add(k);
        if (!TYPES.includes(e.m)) bad.push(where + ': tipo «' + e.m + '»');
        if (!(e.p >= from && e.p <= to)) bad.push(where + ': página ' + e.p + ' fuera de ' + u.orr);
        if (e.au && !/^\d+(–\d+)?$/.test(String(e.au))) bad.push(where + ': pista «' + e.au + '»');
        const extra = Object.keys(e).filter(x => !EX_KEYS.includes(x));
        if (extra.length) bad.push(where + ': campo desconocido ' + extra.join(', '));
        const groups = e.grp || (e.it ? [['', e.it]] : []);
        const labels = groups.flatMap(g => g[1].map(x => Array.isArray(x) ? x[0] : x));
        groups.forEach(g => { const ls = g[1].map(x => Array.isArray(x) ? x[0] : x); if (new Set(ls).size !== ls.length) bad.push(where + ': rótulo repetido'); });
        if (e.pre && !Array.isArray(e.pre)) Object.keys(e.pre).forEach(l => { if (!labels.includes(l)) bad.push(where + ': «pre» de un punto que no existe (' + l + ')'); });
        if (['eg', 'bai', 'abc', 'auk', 'mark'].includes(e.m) && !labels.length) bad.push(where + ': sin puntos');
        if (e.m === 'taula' && !(e.rows && e.cols)) bad.push(where + ': tabla sin filas o columnas');
        /* rótulos: una letra, un número, un nombre o una palabra suelta; nunca una frase */
        [...labels, ...groups.map(g => g[0]), ...(e.oh || []), ...(e.rows || []), ...(e.cols || []), ...(e.op || []), ...groups.flatMap(g => g[1].flatMap(x => Array.isArray(x) ? x[1] : []))]
          .forEach(l => { if (String(l).split(' · ').some(x => words(x) > 6 || x.length > 40)) long.push(where + ': «' + l + '»'); });   // «euskera · glosa»: cada parte por separado
      });
    });
  });
  t.ok(!bad.length, `las ${nEx} hojas de ejercicio están bien formadas: clave propia, tipo conocido y página dentro de su unidad` + (bad.length ? ' — ' + bad.slice(0, 4).join(' | ') : ''));
  t.ok(nEx > 400 && nAu > 100, `${nEx} ejercicios, ${nAu} con pista de audio`);
  t.ok(!long.length, 'ningún rótulo es una frase: las hojas no llevan el texto del libro' + (long.length ? ' — ' + long.slice(0, 3).join(' | ') : ''));
  t.ok(!notes.length, 'las notas de apartado solo citan formas sueltas en euskera' + (notes.length ? ' — ' + notes.slice(0, 3).join(' | ') : ''));

  // ── cómo se cargan
  const a1 = read('a1.html'), sw = read('sw.js');
  const iData = a1.indexOf('<script src="armairua-a1-arian-orria.js">'), iRender = a1.indexOf('<script src="armairua-koadernoa-iturriak.js">');
  t.ok(iData > 0 && iData < iRender && /orriak: window\.A1_ORRIAK/.test(a1), 'a1.html carga las hojas antes de pintar el cuaderno');
  t.ok(/'armairua-a1-arian-orria\.js'/.test(sw), 'las hojas están precacheadas: funcionan sin conexión');

  // ── el libro al lado es solo cosa del ordenador de cada cual
  const pages = fs.readdirSync(t.root).filter(f => f.endsWith('.html'));
  t.ok(!pages.some(f => /<script[^>]+src="[^"]*armairua-koadernoa-liburua\.js"/.test(read(f))), 'ninguna página carga el visor del libro con un <script src> fijo');
  const at = a1.indexOf("'armairua-koadernoa-liburua.js'"), loader = a1.slice(a1.lastIndexOf('<script>', at), at);
  t.ok(at > 0 && /if \(!local\) return;/.test(loader), 'el visor del libro solo se pide cuando la app se abre en local');
  const viewer = read('armairua-koadernoa-liburua.js'), tool = read('tools/iturriak/liburua.mjs');
  t.ok(!/\.pdf['"]/.test(viewer.replace(/\/\*[\s\S]*?\*\//g, '')) && /dir: 'pribatua\//.test(tool), 'el visor no lleva dentro ningún PDF ni audio: los enlaza la herramienta en pribatua/');
}
