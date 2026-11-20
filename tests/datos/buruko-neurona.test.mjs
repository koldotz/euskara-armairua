// Buruko neurona: el catálogo genérico (armairua-buruko-neurona-data.js) y el
// motor (armairua-buruko-neurona-motorra.js). Todo lo que el catálogo nombra
// existe en el Hiztegia · Bakarka con la categoría y el marco que pide; cada
// propuesta del motor pasa su propio análisis; y el análisis caza los errores
// de concordancia típicos.
import fs from 'fs';
import path from 'path';
import vm from 'vm';

export default async function(t){
  const R = f => fs.readFileSync(path.join(t.root, f), 'utf8');
  const c = {}; c.window = c; vm.createContext(c);
  for (const f of ['armairua-buruko-neurona-data.js', 'armairua-buruko-neurona-motorra.js', 'armairua-a1-data.js', 'armairua-a2-ostalaritza-data.js']) vm.runInContext(R(f), c);
  const K = c.BURUKO_NEURONA, hz = JSON.parse(R('bakarka-hiztegia.json'));
  const by = {}; hz.entries.forEach(e => (by[e.eu] = by[e.eu] || []).push(e));
  const has = (w, cat) => (by[w] || []).find(e => !cat || e.cat === cat) || null;

  // ── catálogo
  t.ok(K && K.eszenak.length >= 10, `el catálogo tiene ${K.eszenak.length} escenas`);
  t.ok(/⚠ Claude/.test(K.iturria), 'el catálogo dice que es ⚠ Claude y está sin revisar');
  const ids = K.eszenak.map(s => s.id);
  t.ok(new Set(ids).size === ids.length, 'ids de escena únicos');
  const miss = [], bad = [];
  const tax = new Set(); hz.meta.taxonomy.blocks.forEach(b => b.subs.forEach(s => tax.add(s)));
  for (const s of K.eszenak) {
    [...s.lekua, ...s.hitzak].forEach(w => { if (!has(w, 'iz')) miss.push(s.id + ': ' + w); });
    s.rolak.forEach(w => { const e = has(w, 'iz'); if (!e) miss.push(s.id + ': ' + w); else if (!e.biz) bad.push(s.id + ': «' + w + '» no es animado'); });
    Object.keys(s.w).forEach(k => { const [p, v] = k.split(':'); if ((p === 'f' && !hz.meta.fields[v]) || (p === 't' && !tax.has(v))) bad.push(s.id + ': nodo ' + k); });
    s.ereduak.forEach(r => {
      const e = has(r.v, 'ad'); if (!e) { miss.push(s.id + ': ' + r.v); return; }
      if (!(e.aux || []).includes(r.f)) bad.push(s.id + ': ' + r.v + ' con ' + r.f + ' y el Hiztegia dice [' + e.aux + ']');
      (r.obj || []).forEach(o => { if (!has(o, 'iz')) miss.push(s.id + ': ' + o); });
      if ([r.nork, r.nori, r.nor, r.norekin].includes('R') && !s.rolak.length) bad.push(s.id + ': ' + r.v + ' usa un papel y la escena no tiene');
      if (r.lek && !s.lekua.length) bad.push(s.id + ': ' + r.v + ' usa un lugar y la escena no tiene');
    });
  }
  K.familia.forEach(w => { const e = has(w, 'iz'); if (!e || !e.biz) bad.push('familia: ' + w); });
  K.ezaugarriak.forEach(z => (z.hitzak || [z.id]).forEach(w => { if (!has(w)) miss.push('rasgo: ' + w); }));
  t.ok(!miss.length, 'todas las palabras del catálogo están en el Hiztegia' + (miss.length ? ' — faltan: ' + miss.slice(0, 5).join(', ') : ''));
  t.ok(!bad.length, 'papeles animados, nodos que existen y marcos que cuadran con el auxiliar de cada verbo' + (bad.length ? ' — ' + bad.slice(0, 4).join(' | ') : ''));

  // ── motor
  const a2 = []; c.A2_OSTALARITZA.units.forEach(u => (u.hz || []).forEach(g => (g[2] || []).forEach(w => a2.push(w[0]))));
  const M = c.BN_MOTORRA.sortu({ hz, kasuak: null, katalogoa: K, a1: c.A1_DATA.w.map(w => w.eu), a2 });
  t.ok(M.AUXL.length > 140 && M.AUX.dio && M.AUX.zion && M.AUX.zegoen, `las tablas de auxiliares dan ${M.AUXL.length} formas (con dio, zion y zegoen)`);
  let n = 0; const errs = [], choques = [];
  for (const s of K.eszenak) for (const prot of ['p:Ane', 'p:Jon']) for (const d of K.denbora) for (const z of K.ezaugarriak) for (const tn of K.tonuak) {
    const ctx = { eszena: s.id, prot, beste: has('amona', 'iz').id, denbora: d.id, unea: 'goiz', ezaugarria: z.id, tonua: tn.id, atalasea: .3 };
    const a = M.aktibatu(ctx), used = [];
    const check = (p, lbl) => { if (!p) return; n++; const r = M.aztertu(p.piezak); if (r.akatsak.length || p.piezak.some(x => !x || !x.form)) errs.push(lbl + ': ' + M.testua(p.piezak) + ' — ' + r.akatsak.join(' ')); if (r.talkak.length) choques.push(M.testua(p.piezak) + ' — ' + r.talkak[0]); };
    for (let k = 0; k < s.ereduak.length; k++) { const p = M.proposatu(ctx, { a, erabiliak: used, lehena: k === 0 }); if (p) used.push(p.aditza); check(p, s.id); }
    check(M.proposatu(ctx, { a, mota: 'ezaugarria' }), 'rasgo');
    check(M.proposatu(ctx, { a, mota: 'tonua' }), 'tono');
  }
  t.ok(n > 10000 && !errs.length, `las ${n} propuestas del motor pasan su propio análisis` + (errs.length ? ' — ' + errs.slice(0, 3).join(' | ') : ''));
  t.ok(!choques.length, 'las propuestas evitan las formas que chocan con otra palabra' + (choques.length ? ' — ' + choques.length + ': ' + choques.slice(0, 2).join(' | ') : ''));

  // repeticiones: homógrafos con su categoría, lexicalizadas con su origen y avisador de choques
  const hotzA = M.lemma('hotz', 'izl'), hotzS = M.lemma('hotz', 'iz');
  t.ok(M.homografoa(hotzA) && M.kategoria(hotzA) === 'adjetivo' && M.kategoria(hotzS) === 'sustantivo' && hotzA.id !== hotzS.id, 'los homógrafos se distinguen por su número y su categoría (hotz adjetivo / hotz sustantivo)');
  const go = M.lemma('goizean', 'adb');
  t.ok(/«goiz» \+ -ean \(NON\)/.test(M.piezaAnalisia(M.formak(go)[0]).funtzioa) && !M.talkak('goizean', go.id).length, 'una palabra lexicalizada explica su origen (goizean = goiz + -ean) y no cuenta como choque');
  const dd = M.lemma('dendari', 'iz'), dmg = M.formak(dd).find(f => f.gakoa === 'mg.nor');
  t.ok(M.aztertu([dmg]).talkak.some(m => /denda · NORI/.test(m)), 'el avisador salta con «dendari» (también es denda · NORI)');

  // el análisis caza los errores típicos y deja pasar lo correcto
  const L = (eu, cat) => M.lemma(eu, cat);
  const pz = (eu, k, zenb = 'sg') => M.formak(L(eu, 'iz')).find(f => f.kasua === k && f.zenb === zenb);
  const vb = eu => M.formak(L(eu, 'ad')).find(f => f.gakoa === 'partizipioa');
  const ax = f => ({ w: 'aux', form: f, mota: 'aux' });
  const ane = M.formak(M.izenBerezia('Ane')).find(f => f.kasua === 'nork');
  const caso = (ps, re) => { const r = M.aztertu(ps); return re ? r.akatsak.some(m => re.test(m)) : !r.akatsak.length; };
  t.ok(caso([ane, pz('denda', 'nora'), vb('joan'), ax('da')], /NORK sobra/), '«Anek dendara joan da» → NORK sobra');
  t.ok(caso([ane, pz('ogi', 'nor', 'pl'), vb('erosi'), ax('du')], /ditu/), '«Anek ogiak erosi du» → objeto plural: ditu');
  t.ok(caso([ane, pz('ogi', 'nor'), vb('erosi'), ax('dut')], /dut/), '«Anek ogia erosi dut» → persona del auxiliar');
  t.ok(caso([ane, pz('dendari', 'nori'), pz('diru', 'nor'), vb('eman'), ax('du')], /NORI sobra/), '«… dendariari … eman du» → NORI sobra');
  t.ok(caso([ane, pz('ogi', 'nor'), vb('joan'), ax('du')], /intransitivo/), '«… joan du» → joan es intransitivo');
  t.ok(caso([ane, pz('ogi', 'nor'), vb('erosi')], /Falta el auxiliar/), 'sin auxiliar → falta el auxiliar');
  t.ok(caso([ane, pz('dendari', 'nori', 'pl'), pz('diru', 'nor'), vb('eman'), ax('die')]), '«Anek dendariei dirua eman die» pasa');
  t.ok(caso([ane, pz('denda', 'non'), pz('ogi', 'nor'), vb('erosi'), ax('zuen')]), '«Anek dendan ogia erosi zuen» pasa');
}
