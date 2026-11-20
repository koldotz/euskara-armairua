/* ══ Armairua · Buruko neurona — motor (sin interfaz) ═══════════════════════
   Une los tres pilares:
     · Kasuen zuhaitza  → los casos y sus familias (datos del mural);
     · Hiztegia · Bakarka → las piezas: palabras con sus formas, campos,
       subcategorías y las tablas de auxiliares;
     · el catálogo genérico (BURUKO_NEURONA) → escenas, personajes, tiempo,
       rasgos y tono, que mueven la red.
   La red es asociativa: nodos y enlaces con peso, visibles y editables en cada
   contexto. Aquí está todo lo que no toca el DOM (activación, formas, análisis
   de concordancia y propuestas), para poder probarlo sin navegador.

   BN_MOTORRA.sortu({ hz, kasuak, katalogoa, a1, a2 }) → motor
     hz        bakarka-hiztegia.json ya leído
     kasuak    los datos del mural (FAM, CASES) o null
     katalogoa BURUKO_NEURONA
     a1, a2    listas de palabras del vocabulario A1 y A2 (para los niveles)
   ════════════════════════════════════════════════════════════════════════ */
(function(root){
  'use strict';

  var CASE_ORDER = ['nor','nork','nori','noren','norekin','norentzat','zerez','non','nongo','nondik','nora','norako','norengan','norengana','norengandik','mugagabe','rik'];
  var CASE_LBL = { nor:'NOR', nork:'NORK', nori:'NORI', noren:'NOREN', norekin:'NOREKIN', norentzat:'NORENTZAT', zerez:'ZEREZ', non:'NON', nongo:'NONGO', nondik:'NONDIK', nora:'NORA', norako:'NORAKO', norengan:'NORENGAN', norengana:'NORENGANA', norengandik:'NORENGANDIK', mugagabe:'MUGAGABE', rik:'-RIK', z:'-Z', gatik:'-GATIK' };
  var FUNTZIOA = { nor:'NOR', nork:'subjektua (NORK)', nori:'zeharkako osagarria (NORI)', noren:'jabea (NOREN)', norekin:'konpainia (NOREKIN)', norentzat:'onuraduna (NORENTZAT)', non:'lekua (NON)', nongo:'leku-genitiboa (NONGO)', nondik:'jatorria (NONDIK)', nora:'norabidea (NORA)', norengana:'norabidea pertsonekin (NORENGANA)', rik:'partitiboa (-RIK)', z:'tresna (-Z)', gatik:'kausa (-GATIK)' };
  var PERS = { ni:'1s', nik:'1s', niri:'1s', zu:'2s', zuk:'2s', zuri:'2s', hura:'3s', hark:'3s', hari:'3s', gu:'1p', guk:'1p', guri:'1p', zuek:'2p', zuei:'2p', haiek:'3p', haiei:'3p' };
  var PERS_LBL = { '1s':'ni', '2s':'zu', '3s':'hura', '1p':'gu', '2p':'zuek', '3p':'haiek' };
  var PERS_NORK = { '1s':'nik', '2s':'zuk', '3s':'hark', '1p':'guk', '2p':'zuek', '3p':'haiek' };
  var PERS_NORI = { '1s':'niri', '2s':'zuri', '3s':'hari', '1p':'guri', '2p':'zuei', '3p':'haiei' };
  /* qué casos admite cada marco del auxiliar */
  var ALLOW = { nor:{ nor:1 }, nork:{ nor:1, nork:1 }, nori:{ nor:1, nori:1 }, dio:{ nor:1, nori:1, nork:1 } };
  var FR_LBL = { nor:'NOR', nork:'NOR-NORK', nori:'NOR-NORI', dio:'NOR-NORI-NORK' };
  /* tablas de auxiliares del Hiztegia: qué marco son y qué persona varía */
  var TAULAK = {
    'izan (nor)': { fr:'nor', ald:'orain', v:'NOR' },
    'izan / *edun (nor-nork, objeto sg.)': { fr:'nork', ald:'orain', v:'NORK', NOR:'3s' },
    'izan / *edun (nor-nork, objeto pl.)': { fr:'nork', ald:'orain', v:'NORK', NOR:'3p' },
    'egon': { fr:'nor', ald:'orain', v:'NOR', sint:'egon' },
    'ibili': { fr:'nor', ald:'orain', v:'NOR', sint:'ibili' },
    'joan': { fr:'nor', ald:'orain', v:'NOR', sint:'joan' },
    'etorri': { fr:'nor', ald:'orain', v:'NOR', sint:'etorri' },
    'jakin': { fr:'nork', ald:'orain', v:'NORK', NOR:'3s', sint:'jakin' },
    'eduki': { fr:'nork', ald:'orain', v:'NORK', NOR:'3s', sint:'eduki' },
    'ekarri': { fr:'nork', ald:'orain', v:'NORK', NOR:'3s', sint:'ekarri' },
    'eraman': { fr:'nork', ald:'orain', v:'NORK', NOR:'3s', sint:'eraman' },
    'nor-nori (hari)': { fr:'nori', ald:'orain', v:'NORI', NOR:'3s' },
    'nor-nori-nork (hari)': { fr:'dio', ald:'orain', v:'NORK', NOR:'3s', NORI:'3s' },
    'nor-nori-nork (haiei)': { fr:'dio', ald:'orain', v:'NORK', NOR:'3s', NORI:'3p' },
    'nor-nori-nork (niri)': { fr:'dio', ald:'orain', v:'NORK', NOR:'3s', NORI:'1s' },
    'nor-nori-nork (zuri)': { fr:'dio', ald:'orain', v:'NORK', NOR:'3s', NORI:'2s' },
    'nor-nori-nork (guri)': { fr:'dio', ald:'orain', v:'NORK', NOR:'3s', NORI:'1p' },
    'nor-nori-nork (zuei)': { fr:'dio', ald:'orain', v:'NORK', NOR:'3s', NORI:'2p' },
    'nor-nork (ni)': { fr:'nork', ald:'orain', v:'NORK', NOR:'1s' },
    'nor-nork (zu)': { fr:'nork', ald:'orain', v:'NORK', NOR:'2s' },
    'nor-nork (gu)': { fr:'nork', ald:'orain', v:'NORK', NOR:'1p' },
    'nor-nork (zuek)': { fr:'nork', ald:'orain', v:'NORK', NOR:'2p' },
    'nor (iragana)': { fr:'nor', ald:'lehen', v:'NOR' },
    'nor-nork (iragana)': { fr:'nork', ald:'lehen', v:'NORK', NOR:'3s' },
    'nor-nori (iragana)': { fr:'nori', ald:'lehen', v:'NORI', NOR:'3s' },
    'nor-nori-nork (hari, iragana)': { fr:'dio', ald:'lehen', v:'NORK', NOR:'3s', NORI:'3s' },
    'nor-nork (objeto pl., iragana)': { fr:'nork', ald:'lehen', v:'NORK', NOR:'3p' },
    'egon (iragana)': { fr:'nor', ald:'lehen', v:'NOR', sint:'egon' }
  };

  function sortu(o){
    var hz = o.hz, K = o.katalogoa, E = hz.entries;
    var byId = {}, byEu = {};
    E.forEach(function(e, i){ e._i = i; byId[e.id] = e; (byEu[e.eu] = byEu[e.eu] || []).push(e); });
    function lemma(eu, cat){ var l = byEu[eu] || []; for (var i = 0; i < l.length; i++) if (!cat || l[i].cat === cat) return l[i]; return null; }
    var A1 = new Set((o.a1 || []).map(function(s){ return String(s).toLowerCase(); }));
    var A2 = new Set((o.a2 || []).map(function(s){ return String(s).toLowerCase(); }));
    function mailak(e){ var s = (e.src || []).slice(); if (A1.has(e.eu.toLowerCase())) s.push('A1'); if (A2.has(e.eu.toLowerCase())) s.push('A2'); return s; }

    /* ── nodos de la red ── */
    var NODES = {};
    K.eszenak.forEach(function(s){ NODES['e:' + s.id] = { id:'e:' + s.id, mota:'e', kick:'eszena', es:s.eu + ' · ' + s.es, ic:s.ic }; });
    Object.keys(hz.meta.fields).forEach(function(f){ NODES['f:' + f] = { id:'f:' + f, mota:'f', kick:'eremua · ' + f, es:hz.meta.fields[f] }; });
    hz.meta.taxonomy.blocks.forEach(function(b){ b.subs.forEach(function(s){ NODES['t:' + s] = { id:'t:' + s, mota:'t', kick:'azpikategoria · ' + s, es:b.labels[s] }; }); });
    Object.keys(K.nodoBerriak).forEach(function(n){ NODES[n] = { id:n, mota:'n', kick:'etiketa berria', es:K.nodoBerriak[n].es, berria:true }; });
    NODES['k:esk'] = { id:'k:esk', mota:'k', kick:'kategoria · esk', es:'Expresiones' };

    /* padres de cada palabra */
    var sceneOf = {};
    K.eszenak.forEach(function(s){
      var ws = s.lekua.concat(s.hitzak, s.rolak);
      s.ereduak.forEach(function(r){ ws.push(r.v); (r.obj || []).forEach(function(x){ ws.push(x); }); });
      ws.forEach(function(w){ var e = lemma(w, null); if (e) (sceneOf[e._i] = sceneOf[e._i] || []).push('e:' + s.id); });
    });
    var traitNode = {};
    K.ezaugarriak.forEach(function(z){ (z.hitzak || [z.id]).forEach(function(w){ var e = lemma(w, null); if (e && /^n:/.test(z.nodoa)) traitNode[e._i] = z.nodoa; }); });
    var PAR = E.map(function(e){
      var p = (sceneOf[e._i] || []).slice();
      if (e.field) p.push('f:' + e.field);
      (e.tax || []).forEach(function(t){ if (NODES['t:' + t]) p.push('t:' + t); });
      if (e.cat === 'esk') p.push('k:esk');
      if (traitNode[e._i]) p.push(traitNode[e._i]);
      return p.filter(function(x, i, a){ return NODES[x] && a.indexOf(x) === i; });
    });

    /* ── piezas que no están en el Hiztegia ── */
    function izenBerezia(n){
      var v = /[aeiou]$/i.test(n), s;
      s = v ? { nor:n, nork:n + 'k', nori:n + 'ri', noren:n + 'ren', norekin:n + 'rekin', norentzat:n + 'rentzat', norengana:n + 'rengana', norengan:n + 'rengan', norengandik:n + 'rengandik' }
            : { nor:n, nork:n + 'ek', nori:n + 'i', noren:n + 'en', norekin:n + 'ekin', norentzat:n + 'entzat', norengana:n + 'engana', norengan:n + 'engan', norengandik:n + 'engandik' };
      var it = (K.izenak || []).find(function(x){ return x.id === n; });
      return { id:'p:' + n, eu:n, es:it ? it.es : 'nombre propio', cat:'izb', biz:true, forms:{ sg:s } };
    }
    var PRON = (hz.pronouns || []).filter(function(p){ return /^[123][sp]$/.test(p.pers); }).map(function(p){ return { id:'pr:' + p.eu, eu:p.eu, es:p.es, cat:'izord', pers:p.pers, biz:true, forms:{ sg:p.forms } }; });
    function sarrera(id){
      if (typeof id === 'number' || /^\d+$/.test(String(id))) return byId[+id] || null;
      if (/^p:/.test(id)) return izenBerezia(id.slice(2));
      if (/^pr:/.test(id)) return PRON.find(function(p){ return p.id === id; }) || null;
      return null;
    }

    /* ── formas de una palabra (lo que se puede elegir en el puzzle) ── */
    function formak(e){
      var out = [], f = e.forms || {};
      function pieza(form, gakoa, kasua, zenb, mota, lbl){ if (form) out.push({ w:e.id, form:form, gakoa:gakoa, kasua:kasua, zenb:zenb, mota:mota, lbl:lbl, pers:persOfForm(e, zenb) }); }
      if (e.cat === 'iz' || e.cat === 'izb' || (e.cat === 'izord' && e.pers)){
        ['sg','pl','mg'].forEach(function(n){ Object.keys(f[n] || {}).forEach(function(k){ pieza(f[n][k], n + '.' + k, k, n, 'izena', (CASE_LBL[k] || k) + (n === 'sg' ? '' : n === 'pl' ? ' · pl' : ' · mugagabea')); }); });
      } else if (e.cat === 'lek'){
        pieza(e.eu, 'nor', 'nor', 'sg', 'izena', 'NOR');
        ['non','nora','nondik','nongo'].forEach(function(k){ pieza(f[k], k, k, 'sg', 'izena', CASE_LBL[k]); });
      } else if (e.cat === 'izl'){
        pieza(e.eu, 'lema', null, null, 'adj', 'izenondoa');
        pieza(f.mugatua, 'mugatua', 'nor', 'sg', 'adj', 'NOR · atributua');
        pieza(f.plurala, 'plurala', 'nor', 'pl', 'adj', 'NOR · pl');
        pieza(f.konparatiboa, 'konparatiboa', null, null, 'adj', 'konparatiboa');
        pieza(f.superlatiboa, 'superlatiboa', null, null, 'adj', 'superlatiboa');
      } else if (e.cat === 'ad'){
        pieza(f.partizipioa, 'partizipioa', null, null, 'aditza', 'partizipioa');
        pieza(f.burutugabea, 'burutugabea', null, null, 'aditza', 'burutugabea');
        pieza(f.geroa, 'geroa', null, null, 'aditza', 'geroa');
        pieza(f.aditz_izena, 'aditz_izena', null, null, 'aditza', 'aditz-izena');
      } else {
        pieza(e.eu, 'lema', null, null, 'beste', { adb:'adberbioa', esk:'esamoldea', jun:'juntagailua', det:'determinatzailea', izord:'izenordaina', zenb:'zenbakia', post:'postposizioa', atz:'atzizkia' }[e.cat] || e.cat);
      }
      return out;
    }
    function persOfForm(e, zenb){ if (e.pers) return e.pers; if (zenb === 'pl') return '3p'; return '3s'; }

    /* ── categoría (para distinguir homógrafos: goiz sustantivo / goiz adverbio) ── */
    var KAT = { ad:'verbo', iz:'sustantivo', lek:'lugar', izl:'adjetivo', adb:'adverbio', det:'determinante', izord:'pronombre', zenb:'número', post:'posposición', jun:'conjunción', esk:'expresión', atz:'sufijo', izb:'nombre propio' };
    function kategoria(e){ if (!e) return ''; return KAT[e.cat] || e.cat; }
    function homografoa(e){ return !!e && typeof e.id === 'number' && (byEu[e.eu] || []).length > 1; }
    /* origen de los lemas que son formas de otro (campo «jatorria», tools/hiztegia/salbuespenak.json) */
    function jatorria(e){ var j = e && e.jatorria; if (!j) return ''; return '«' + j.lema + '» + ' + j.atzizkia + (j.kasua ? ' (' + j.kasua + ')' : '') + (j.oharra ? ' · ' + j.oharra : ''); }

    /* ── choques: la misma forma escrita sale de dos lemas distintos (dendari = denda · NORI y dendari) ── */
    var FIDX = null;
    function fidx(){
      if (FIDX) return FIDX; FIDX = {};
      E.forEach(function(e){ formak(e).forEach(function(f){ var k = f.form.toLowerCase(); (FIDX[k] = FIDX[k] || []).push({ id:e.id, eu:e.eu, cat:e.cat, gakoa:f.gakoa, lbl:f.lbl }); }); });
      return FIDX;
    }
    function talkak(form, id){
      if (!form) return [];
      var e = sarrera(id), seen = {};
      return (fidx()[String(form).toLowerCase()] || []).filter(function(r){
        if (r.id === id || seen[r.id]) return false;
        if (e && e.jatorria && e.jatorria.id === r.id) return false;          // goizean ↔ goiz · NON: es su origen, no un choque
        var o = byId[r.id]; if (o && o.jatorria && o.jatorria.id === id) return false;
        seen[r.id] = 1; return true;
      });
    }
    function talkaTestua(r){ var o = byId[r.id]; return r.eu + ' · ' + r.lbl + ' (' + kategoria(o) + (o && o.es ? ': ' + String(o.es).split(/[;,(]/)[0].trim() : '') + ')'; }

    /* ── auxiliares: lecturas de cada forma ── */
    var AUX = {}, AUXL = [];
    (hz.conjugations || []).concat(K.laguntzaileGehigarriak || []).forEach(function(t){
      var m = TAULAK[t.eu]; if (!m) return;
      t.f.forEach(function(form, i){
        if (!form || form === '—') return;
        var r = { form:form, fr:m.fr, ald:m.ald, sint:m.sint || null, taula:t.eu, NOR:m.NOR || null, NORK:m.NORK || null, NORI:m.NORI || null };
        r[m.v] = PERS[t.pers[i]];
        (AUX[form] = AUX[form] || []).push(r); AUXL.push(r);
      });
    });
    function auxForma(fr, ald, q){
      q = q || {};
      var c = AUXL.filter(function(r){ return r.fr === fr && r.ald === ald && !r.sint && (!q.sint || r.sint === q.sint)
        && (q.NOR == null || r.NOR === q.NOR) && (q.NORK == null || r.NORK === q.NORK) && (q.NORI == null || r.NORI === q.NORI); });
      return c.length ? c[0].form : null;
    }
    function egonForma(ald, pers){ var r = AUXL.find(function(x){ return x.sint === 'egon' && x.ald === ald && x.NOR === pers; }); return r ? r.form : null; }

    /* ── activación de la red para un contexto ── */
    function eszena(id){ return K.eszenak.find(function(s){ return s.id === id; }) || K.eszenak[0]; }
    function aktibatu(ctx){
      var sc = eszena(ctx.eszena), raw = {}, contrib = {};
      function add(src, w){ Object.keys(w || {}).forEach(function(k){ if (!NODES[k]) return; raw[k] = (raw[k] || 0) + w[k]; (contrib[k] = contrib[k] || []).push({ src:src, w:w[k] }); }); }
      add('eszena', Object.assign({}, sc.w, (function(){ var x = {}; x['e:' + sc.id] = 1; return x; })()));
      add('prot', { 't:NG1':.5 });
      var beste = ctx.beste ? sarrera(ctx.beste) : null;
      if (beste){ var w = { 't:NG1':.3 }; if (beste.field) w['f:' + beste.field] = .5; add('beste', w); }
      if (ctx.rola){ add('rola', { 't:NG1':.3, 'f:lan':.3 }); }
      var d = K.denbora.find(function(x){ return x.id === ctx.denbora; }); if (d) add('denbora', d.w);
      if (ctx.unea) add('unea', { 'f:den':.6 });
      var z = K.ezaugarriak.find(function(x){ return x.id === ctx.ezaugarria; });
      if (z){ var zw = {}; zw[z.nodoa] = 1; if (z.aditza !== 'ukan') zw['f:abs'] = .2; if (z.aditza === 'egon') zw['t:V3'] = .5; add('ezaugarria', zw); }
      var tn = K.tonuak.find(function(x){ return x.id === ctx.tonua; }); if (tn) add('tonua', tn.w);
      var m1 = 1e-9; Object.keys(raw).forEach(function(k){ if (raw[k] > m1) m1 = raw[k]; });
      var a1 = {}; Object.keys(raw).forEach(function(k){ a1[k] = raw[k] / m1; });
      var pis = ctx.pisuak || {};
      Object.keys(pis).forEach(function(k){ if (NODES[k]) a1[k] = Math.max(0, Math.min(1, +pis[k] || 0)); });
      var N = E.length, a2 = new Float32Array(N), m2 = 1e-9;
      for (var i = 0; i < N; i++){ var s = 0, p = PAR[i]; for (var j = 0; j < p.length; j++) s += a1[p[j]] || 0; a2[i] = s; if (s > m2) m2 = s; }
      for (i = 0; i < N; i++) a2[i] = Math.min(1, a2[i] / m2);
      var ident = {};
      function on(eu, cat){ var e = lemma(eu, cat); if (e){ a2[e._i] = 1; ident[e._i] = 1; } }
      if (beste && typeof beste.id === 'number') { a2[beste._i] = 1; ident[beste._i] = 1; }
      if (ctx.rola) on(ctx.rola, 'iz');
      if (d) on(d.id, null);
      var u = K.unea.find(function(x){ return x.id === ctx.unea; }); if (u) on(u.id, 'iz');
      if (z) (z.hitzak || [z.id]).forEach(function(w){ on(w, null); });
      if (tn) (tn.hitzak || []).forEach(function(w){ on(w, null); });
      (ctx.gehitu || []).forEach(function(id){ var e = byId[id]; if (e){ a2[e._i] = 1; ident[e._i] = 1; } });
      var ml = ctx.mailak && ctx.mailak.length && ctx.mailak.length < (K.mailak || []).length ? ctx.mailak : null;
      if (ml) for (i = 0; i < N; i++){ if (ident[i]) continue; var lv = mailak(E[i]); if (!lv.some(function(x){ return ml.indexOf(x) >= 0; })) a2[i] = 0; }
      (ctx.isildu || []).forEach(function(id){ var e = byId[id]; if (e) a2[e._i] = 0; });
      var th = ctx.atalasea == null ? .3 : ctx.atalasea;
      return { a1:a1, a2:a2, ident:ident, contrib:contrib, th:th, eszena:sc,
        pasa:function(e){ return !!e && (typeof e.id !== 'number' || a2[e._i] >= th || !!ident[e._i]); },
        balioa:function(e){ return e && typeof e.id === 'number' ? a2[e._i] : 1; } };
    }

    /* ── análisis de una frase ── */
    function piezaAnalisia(p){
      var e = sarrera(p.w), lema = e ? e.eu : (p.lema || p.form);
      var suf = '';
      if (e && p.kasua){ var i = 0; while (i < lema.length && i < p.form.length && lema[i] === p.form[i]) i++; suf = p.form.slice(i); suf = suf ? '-' + suf : 'Ø'; }
      var jat = jatorria(e);
      return { form:p.form, lema:lema, id:e && typeof e.id === 'number' ? e.id : null, kategoria:p.mota === 'aux' ? 'laguntzailea' : kategoria(e), homografoa:homografoa(e),
        kasua:p.kasua ? (CASE_LBL[p.kasua] || p.kasua) : (p.mota === 'aux' ? 'laguntzailea' : p.mota === 'aditza' ? 'aditza' : p.lbl || ''),
        zenb:p.zenb || '', atzizkia:p.mota === 'aux' ? auxPertsonak(p.form) : suf,
        funtzioa:(p.kasua ? (FUNTZIOA[p.kasua] || '') : (p.mota === 'aux' ? auxDeskribapena(p.form) : p.lbl || '')) + (jat ? ' · lexicalizada: ' + jat : ''),
        jatorria:jat || null };
    }
    /* el auxiliar no se trocea (sería una segmentación discutible): se dice qué personas marca */
    function auxPertsonak(form){ var r = (AUX[form] || [])[0]; if (!r) return ''; var s = []; if (r.NORK) s.push('NORK ' + PERS_NORK[r.NORK]); if (r.NORI) s.push('NORI ' + PERS_NORI[r.NORI]); if (r.NOR) s.push('NOR ' + PERS_LBL[r.NOR]); return s.join(' · '); }
    function auxDeskribapena(form){ var r = (AUX[form] || [])[0]; return r ? (r.sint ? r.sint + ' · ' : '') + FR_LBL[r.fr] + ' · ' + (r.ald === 'lehen' ? 'iragana' : 'orainaldia') : ''; }
    function aztertu(piezak){
      var r0 = aztertuGramatika(piezak);
      /* avisador de choques: piezas cuya forma escrita también sale de otro lema */
      r0.talkak = [];
      var hasAux = (piezak || []).some(function(p){ return p.mota === 'aux'; });
      (piezak || []).forEach(function(p){
        if (p.w == null || p.w === 'aux' || typeof p.w === 'string' && !/^(p|pr):/.test(p.w)) return;
        if (p.mota === 'aditza' && hasAux) return;   // erantzun dio: con el auxiliar delante no hay duda de que es el verbo
        if ((p.lbl === 'egoera' || p.lbl === 'NOR · atributua') && hasAux) return;   // haserre dago, alaia da: el atributo con izan/egon tampoco deja duda
        var tk = talkak(p.form, p.w); if (!tk.length) return;
        var e = sarrera(p.w);
        r0.talkak.push('Choque de formas: «' + p.form + '» aquí es ' + (e ? e.eu + ' (' + kategoria(e) + ')' : p.form) + ', pero también puede leerse como ' + tk.map(talkaTestua).join(' o ') + '.');
      });
      return r0;
    }
    function aztertuGramatika(piezak){
      var out = { akatsak:[], oharrak:[], irakurketa:null };
      if (!piezak || !piezak.length) return out;
      var auxs = piezak.filter(function(p){ return p.mota === 'aux'; });
      var verbs = piezak.filter(function(p){ return p.mota === 'aditza'; });
      var cs = { nor:[], nork:[], nori:[] };
      piezak.forEach(function(p){ if (cs[p.kasua]) cs[p.kasua].push(p); });
      if (!auxs.length){
        if (verbs.length) out.akatsak.push('Falta el auxiliar: «' + verbs[0].form + '» necesita uno (da, du, dio, zaio…).');
        else out.oharrak.push('Sin verbo: es un sintagma o una réplica, no una frase completa.');
        return out;
      }
      if (auxs.length > 1) out.oharrak.push('Hay ' + auxs.length + ' auxiliares; se analiza el primero (' + auxs[0].form + ').');
      var reads = AUX[auxs[0].form] || [];
      if (!reads.length){ out.akatsak.push('«' + auxs[0].form + '» no está en las tablas de auxiliares del Hiztegia.'); return out; }
      var best = null;
      reads.forEach(function(r){
        var ak = [], oh = [], al = ALLOW[r.fr];
        if (cs.nork.length && !al.nork) ak.push('NORK sobra: «' + r.form + '» es ' + FR_LBL[r.fr] + ' y no lleva NORK. Quita la -k (' + cs.nork.map(function(p){ return p.form; }).join(', ') + ') o usa un auxiliar NOR-NORK.');
        if (cs.nori.length && !al.nori) ak.push('NORI sobra: «' + r.form + '» no lleva NORI. Para «a quién» hace falta un auxiliar con NORI (dio, zaio…).');
        function chk(arr, want, lbl){ arr.forEach(function(p){ if (want && p.pers && p.pers !== want) ak.push(lbl + ': «' + p.form + '» es ' + PERS_LBL[p.pers] + ', pero «' + r.form + '» concuerda con ' + PERS_LBL[want] + '.'); }); }
        if (al.nork) chk(cs.nork, r.NORK, 'NORK');
        if (al.nori) chk(cs.nori, r.NORI, 'NORI');
        var nors = cs.nor.filter(function(p){ return p.mota !== 'adj'; });
        if (r.NOR){
          nors.forEach(function(p){
            if (p.pers && p.pers !== r.NOR){
              if (r.fr === 'nork' && p.pers === '3p' && r.NOR === '3s') ak.push('NOR plural: «' + p.form + '» pide el auxiliar de objeto plural (' + (r.ald === 'lehen' ? 'zituen' : 'ditu') + ', no ' + r.form + ').');
              else ak.push('NOR: «' + p.form + '» es ' + PERS_LBL[p.pers] + ', pero «' + r.form + '» concuerda con ' + PERS_LBL[r.NOR] + '.');
            }
          });
        }
        verbs.forEach(function(v){
          var e = sarrera(v.w); if (!e || !e.aux) return;
          if (e.eu === 'izan') return;   // izan va con todos: da (ser), du («tener»: buruko mina izaten du)
          var okV =e.aux.indexOf(r.fr) >= 0 || (r.fr === 'dio' && e.aux.indexOf('nork') >= 0) || (r.fr === 'nori' && e.aux.indexOf('nor') >= 0) || (r.fr === 'nork' && e.aux.indexOf('dio') >= 0);
          if (!okV){
            if (e.aux.indexOf('nor') >= 0 && !e.aux.some(function(a){ return a === 'nork' || a === 'dio'; })) ak.push('«' + e.eu + '» es intransitivo (NOR: da, zen): no va con «' + r.form + '» (' + FR_LBL[r.fr] + ').');
            else oh.push('«' + e.eu + '» suele ir con ' + e.aux.map(function(a){ return FR_LBL[a] || a; }).join(' o ') + '; aquí va con ' + FR_LBL[r.fr] + '.');
          }
        });
        if (al.nork && !cs.nork.length && r.NORK) oh.push('NORK no aparece: se sobreentiende «' + PERS_NORK[r.NORK] + '».');
        if (al.nori && !cs.nori.length && r.NORI) oh.push('NORI no aparece: se sobreentiende «' + PERS_NORI[r.NORI] + '».');
        if (!r.sint && !verbs.length && r.taula !== 'izan (nor)' && r.taula !== 'nor (iragana)' && !(r.fr === 'nork' && piezak.some(function(p){ return p.gakoa === 'sg.nongo'; }))) oh.push('Sin verbo principal: «' + r.form + '» queda como auxiliar suelto.');
        if (!best || ak.length < best.ak.length) best = { r:r, ak:ak, oh:oh };
      });
      out.akatsak = best.ak; out.oharrak = best.oh; out.irakurketa = best.r;
      return out;
    }

    /* ── propuestas: frases que el motor sugiere para el contexto ── */
    function denbora(ctx){ return K.denbora.find(function(x){ return x.id === ctx.denbora; }) || K.denbora[1]; }
    function protE(ctx){ var id = ctx.prot || 'p:Ane'; return sarrera(id) || izenBerezia('Ane'); }
    function P(e, k, zenb){ zenb = zenb || 'sg'; var f = e.forms && e.forms[zenb] && e.forms[zenb][k]; if (!f && e.cat === 'lek') f = k === 'nor' ? e.eu : e.forms[k]; return f ? { w:e.id, form:f, gakoa:(e.cat === 'lek' ? k : zenb + '.' + k), kasua:k, zenb:zenb, mota:'izena', lbl:CASE_LBL[k] + (zenb === 'sg' ? '' : ' · ' + zenb), pers:persOfForm(e, zenb) } : null; }
    function V(e, d){ var k = d.aditza, f = e.forms[k]; return { w:e.id, form:f, gakoa:k, kasua:null, mota:'aditza', lbl:k }; }
    function A(form){ return form ? { w:'aux', form:form, kasua:null, mota:'aux', lbl:auxDeskribapena(form) } : null; }
    function B(e, lbl){ return { w:e.id, form:e.eu, gakoa:'lema', kasua:null, mota:'beste', lbl:lbl || e.cat }; }
    /* la mejor palabra de una lista; si se dice en qué caso va (k), primero las que no chocan con otra forma */
    function chocaEn(e, k){ if (!k) return false; var p = P(e, k); return !!(p && talkak(p.form, e.id).length); }
    function onena(a, list, cat, k){ var c = (list || []).map(function(w){ return lemma(w, cat); }).filter(function(e){ return e && a.pasa(e); }); c.sort(function(x, y){ return (chocaEn(x, k) - chocaEn(y, k)) || a.balioa(y) - a.balioa(x) || list.indexOf(x.eu) - list.indexOf(y.eu); }); return c[0] || null; }
    function rola(ctx, sc, a, k){ if (ctx.rola){ var e = lemma(ctx.rola, 'iz'); if (e) return e; } return onena(a, sc.rolak, 'iz', k) || lemma(sc.rolak[0], 'iz'); }
    function besteE(ctx, a){ return (ctx.beste && sarrera(ctx.beste)) || lemma('lagun', 'iz'); }
    function proposatu(ctx, opts){
      opts = opts || {};
      var a = opts.a || aktibatu(ctx), sc = a.eszena, d = denbora(ctx), ald = d.aldia === 'lehen' ? 'lehen' : 'orain';
      var used = opts.erabiliak || [], out = [];
      var pats = sc.ereduak.map(function(r, i){ var e = lemma(r.v, 'ad'); return { r:r, e:e, s:(e ? a.balioa(e) : 0) - (used.indexOf(r.v) >= 0 ? 5 : 0), i:i }; })
        .filter(function(x){ return x.e; }).sort(function(x, y){ return y.s - x.s || x.i - y.i; });
      if (opts.mota !== 'ezaugarria' && opts.mota !== 'tonua' && pats.length){
        var r = pats[0].r, ve = pats[0].e, pr = protE(ctx), fa = besteE(ctx, a);
        var rk = ['nork', 'nori', 'nor', 'norekin'].find(function(k){ return r[k] === 'R'; });
        var ro = sc.rolak.length ? rola(ctx, sc, a, rk) : null;
        var who = function(c){ return c === 'P' ? pr : c === 'R' ? ro : c === 'F' ? fa : null; };
        var obj = r.nor === 'O' ? onena(a, r.obj, 'iz', 'nor') || lemma(r.obj[0], 'iz') : null;
        var place = r.lek ? (onena(a, sc.lekua, 'iz', r.lek) || lemma(sc.lekua[0], 'iz')) : null;
        if (opts.lehena){ var de = lemma(d.id, null); if (de) out.push(B(de, d.id === 'egunero' ? 'AV2 · maiztasuna' : 'AV1 · denbora')); var ue = K.unea.find(function(x){ return x.id === ctx.unea; }); if (ue){ var uw = lemma(ue.id, 'iz'); var up = uw && P(uw, 'non'); if (up){ up.lbl = 'NON · denbora'; out.push(up); } } }
        if (r.f === 'nor'){ out.push(P(who(r.nor), 'nor')); }
        if (r.nork) out.push(P(who(r.nork), 'nork'));
        if (r.nori) out.push(P(who(r.nori), 'nori'));
        if (r.norekin) out.push(P(who(r.norekin), 'norekin'));
        if (place) out.push(P(place, r.lek));
        if (r.f !== 'nor' && r.nor) out.push(P(r.nor === 'O' ? obj : who(r.nor), 'nor'));
        out.push(V(ve, d));
        var NORp = r.f === 'nor' ? who(r.nor) : (r.nor ? (r.nor === 'O' ? obj : who(r.nor)) : null);
        var q = { NOR:NORp ? persOfForm(NORp, 'sg') : '3s' };
        if (r.f === 'nork' || r.f === 'dio') q.NORK = '3s';
        if (r.f === 'dio') q.NORI = '3s';
        if (r.f === 'nor'){ q = { NOR:persOfForm(who(r.nor), 'sg') }; }
        out.push(A(auxForma(r.f, ald, q)));
        return { mota:'ekintza', aditza:r.v, piezak:out.filter(Boolean) };
      }
      var z = K.ezaugarriak.find(function(x){ return x.id === ctx.ezaugarria; });
      if (opts.mota === 'ezaugarria' && z){
        var p = protE(ctx);
        if (z.aditza === 'izan'){ var ze = lemma(z.id, 'izl'); out.push(P(p, 'nor')); out.push({ w:ze.id, form:ze.forms.mugatua, gakoa:'mugatua', kasua:'nor', zenb:'sg', mota:'adj', lbl:'NOR · atributua', pers:'3s' }); out.push(A(auxForma('nor', 'orain', { NOR:'3s' }))); }
        else if (z.aditza === 'egon'){
          var ze2 = lemma(z.id, null); out.push(P(p, 'nor')); out.push({ w:ze2.id, form:ze2.eu, gakoa:'lema', kasua:null, mota:'beste', lbl:'egoera' });
          var eg = lemma('egon', 'ad');
          if (d.id === 'gaur' || d.id === 'atzo') out.push(A(egonForma(ald, '3s')));
          else { out.push(V(eg, d)); out.push(A(auxForma('nor', 'orain', { NOR:'3s' }))); }
        } else {
          var bu = lemma('buru', 'iz'), mi = lemma('min', 'iz'), iz = lemma('izan', 'ad');
          out.push(P(p, 'nork')); out.push(P(bu, 'nongo')); out.push(P(mi, 'nor'));
          if (d.id === 'egunero' || d.id === 'bihar') out.push(V(iz, d));
          out.push(A(auxForma('nork', ald, { NOR:'3s', NORK:'3s' })));
        }
        return { mota:'ezaugarria', piezak:out.filter(Boolean) };
      }
      if (opts.mota === 'tonua' && ctx.tonua && ctx.tonua !== 'neutroa'){
        var rs = sc.ereduak.find(function(x){ return x.obj && x.obj.length; });
        var ob = rs ? (onena(a, rs.obj, 'iz') || lemma(rs.obj[0], 'iz')) : null;
        if (ctx.tonua === 'adeitsua'){
          if (ob){ var mg = { w:ob.id, form:ob.forms.mg.nor, gakoa:'mg.nor', kasua:'nor', zenb:'mg', mota:'izena', lbl:'NOR · mugagabea', pers:'3s', cap:true };
            out.push(B(lemma('kaixo!', 'esk'), 'esamoldea')); out.push(mg); out.push({ w:'bat', form:'bat', kasua:null, mota:'beste', lbl:'zenbatzailea', p:',' }); out.push(Object.assign(B(lemma('mesedez', 'esk'), 'esamoldea'), { p:'.' })); }
          var ea = lemma('eskerrik asko', 'esk'); out.push(Object.assign(B(ea, 'esamoldea'), { cap:true, p:'!' }));
        } else {
          out.push({ w:'ez', form:'ez', kasua:null, mota:'beste', lbl:'ezezkoa', cap:true });
          out.push(A(egonForma('orain', '3s')));
          if (ob) out.push({ w:ob.id, form:ob.forms.mg.rik, gakoa:'mg.rik', kasua:'rik', zenb:'mg', mota:'izena', lbl:'-RIK', p:'!' });
        }
        return { mota:'tonua', hizlaria:ctx.prot || 'p:Ane', piezak:out.filter(Boolean) };
      }
      return null;
    }

    function testua(piezak, hizlaria){
      return piezak.map(function(p, i){ var t = p.form; if (i === 0 || p.cap) t = t.charAt(0).toUpperCase() + t.slice(1); return t + (p.p || ''); }).join(' ').replace(/\s+([,.!?])/g, '$1') + (piezak.length && !/[.!?]$/.test(piezak[piezak.length - 1].p || '') ? '.' : '');
    }

    return { E:E, byId:byId, lemma:lemma, sarrera:sarrera, izenBerezia:izenBerezia, PRON:PRON, NODES:NODES, PAR:PAR, mailak:mailak,
      formak:formak, aktibatu:aktibatu, aztertu:aztertu, talkak:talkak, talkaTestua:talkaTestua, kategoria:kategoria, homografoa:homografoa, jatorria:jatorria, piezaAnalisia:piezaAnalisia, proposatu:proposatu, testua:testua,
      AUX:AUX, AUXL:AUXL, auxForma:auxForma, egonForma:egonForma, eszena:eszena, CASE_ORDER:CASE_ORDER, CASE_LBL:CASE_LBL, FR_LBL:FR_LBL, kasuak:o.kasuak || null };
  }

  root.BN_MOTORRA = { sortu:sortu, CASE_ORDER:CASE_ORDER, CASE_LBL:CASE_LBL };
})(typeof window !== 'undefined' ? window : globalThis);
