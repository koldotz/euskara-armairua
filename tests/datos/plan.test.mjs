// Coherencia del plan de 28 días con el resto del A1: fechas y días de la
// semana, temas del Hiztegia y ejercicios del cuaderno que cita, secciones de
// la guía que nombra, y días de pruebas, retos e hitos.
import fs from 'fs';
import path from 'path';
import vm from 'vm';

const DOW = [['Ig', 'Igandea'], ['Al', 'Astelehena'], ['Ar', 'Asteartea'], ['Az', 'Asteazkena'], ['Og', 'Osteguna'], ['Ol', 'Ostirala'], ['Lr', 'Larunbata']];
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default async function(t){
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
  for (const f of ['armairua-a1-data.js', 'armairua-a1-plan.js']) vm.runInContext(fs.readFileSync(path.join(t.root, f), 'utf8'), ctx, { filename: f });
  const P = ctx.A1_PLAN, D = ctx.A1_DATA, days = P.days;
  const a1 = fs.readFileSync(path.join(t.root, 'a1.html'), 'utf8');
  const guide = fs.readFileSync(path.join(t.root, 'geruzak.html'), 'utf8');

  // ── calendario
  const cal = [];
  days.forEach((d, i) => {
    const dt = new Date(d.date + 'T12:00:00Z'), w = dt.getUTCDay();
    if (d.n !== i + 1) cal.push('día ' + d.n + ' en la posición ' + (i + 1));
    if (i && dt - new Date(days[i - 1].date + 'T12:00:00Z') !== 864e5) cal.push(d.date + ' no sigue a ' + days[i - 1].date);
    if (d.dow !== DOW[w][0] || d.dowfull !== DOW[w][1]) cal.push(d.date + ' es ' + DOW[w][1] + ', no ' + d.dowfull);
    if (d.dm !== dt.getUTCDate() || d.mon !== dt.getUTCMonth() + 1) cal.push(d.date + ': dm/mon no cuadran');
  });
  t.ok(days.length === 28 && !cal.length, 'plan: 28 días seguidos con su día de la semana' + (cal.length ? ' — ' + cal.slice(0, 3).join('; ') : ''));

  // ── temas del Hiztegia citados («Flashcards: tema «X» (N palabras)»)
  const themes = D.t.map(x => x.eu || x), count = {};
  D.w.forEach(w => { count[w.t] = (count[w.t] || 0) + 1; });
  const th = [];
  for (const d of days) for (const k of d.tasks) {
    if (k.k !== 'hiztegia') continue;
    for (const m of k.x.matchAll(/«([^»]+)»(?:\s*\((\d+) palabras\))?/g)) {
      const i = themes.indexOf(m[1]);
      if (i < 0) th.push('día ' + d.n + ': no hay tema «' + m[1] + '»');
      else if (m[2] && +m[2] !== count[i]) th.push('día ' + d.n + ': «' + m[1] + '» dice ' + m[2] + ' palabras y tiene ' + count[i]);
    }
  }
  t.ok(!th.length, 'plan: los temas del Hiztegia que cita existen (y con las palabras que dice)' + (th.length ? ' — ' + th.join('; ') : ''));

  // ── ejercicios del cuaderno citados («Koadernoa 1.1 y 1.2») y ejercicios sin día
  const exs = new Set([...a1.matchAll(/<span class="k">(\d+\.\d+)<\/span>/g)].map(m => m[1]));
  const used = new Set(), ex = [];
  for (const d of days) for (const k of d.tasks) {
    const m = k.x.match(/Koadernoa\s+([\d., y]+)/);
    if (!m) continue;
    for (const e of m[1].match(/\d+\.\d+/g) || []) { used.add(e); if (!exs.has(e)) ex.push('día ' + d.n + ' cita el ' + e); }
    if (k.u && !k.u.startsWith('#k' + m[1].trim().split('.')[0])) ex.push('día ' + d.n + ': Koadernoa ' + m[1].trim() + ' enlaza a ' + k.u);
  }
  t.ok(exs.size >= 30 && !ex.length, 'plan: los ' + used.size + ' ejercicios del cuaderno que cita existen y enlazan a su unidad' + (ex.length ? ' — ' + ex.join('; ') : ''));
  const orphan = [...exs].filter(e => !used.has(e));
  t.ok(!orphan.length, 'cuaderno: todos los ejercicios tienen día en el plan' + (orphan.length ? ' — sin día: ' + orphan.join(', ') : ''));

  // ── secciones de la guía citadas («Guía §14 «Título»» con enlace geruzak.html#s14)
  const secs = {};
  for (const m of guide.matchAll(/<section id="s(\d+)"[\s\S]*?<\/h2>/g)) secs[m[1]] = norm(m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
  const gs = [];
  for (const d of days) for (const k of d.tasks) {
    const refs = [...k.x.matchAll(/§\s?(\d+)(?:\s*«([^»]+)»)?/g)];
    refs.forEach(m => {
      if (!secs[m[1]]) gs.push('día ' + d.n + ': no hay §' + m[1]);
      else if (m[2] && !secs[m[1]].includes(norm(m[2]))) gs.push('día ' + d.n + ': §' + m[1] + ' no se titula «' + m[2] + '»');
    });
    const a = (k.u || '').match(/^geruzak\.html#s(\d+)$/);
    if (a && refs.length && refs[0][1] !== a[1]) gs.push('día ' + d.n + ': cita §' + refs[0][1] + ' y enlaza a #s' + a[1]);
  }
  t.ok(!gs.length, 'plan: las secciones de la guía que cita existen, con su título y su enlace' + (gs.length ? ' — ' + gs.join('; ') : ''));

  // ── pruebas, retos e hitos caen en días que existen y del tipo adecuado
  const pr = [];
  for (const p of P.pruebas) {
    const d = days[p.d - 1];
    if (!d) pr.push(p.id + ': no hay día ' + p.d);
    else if (!['proba', 'azterketa'].includes(d.kind)) pr.push(p.id + ': el día ' + p.d + ' («' + d.t + '») no es de prueba');
  }
  for (const r of [...P.retos, ...P.hitos]) if (!days[r.d - 1]) pr.push((r.id || r.t) + ': no hay día ' + r.d);
  t.ok(!pr.length, 'plan: pruebas, retos e hitos en días válidos' + (pr.length ? ' — ' + pr.join('; ') : ''));
}
