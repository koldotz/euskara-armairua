/* ══ Armairua · Buruko neurona — interfaz del motor de creación ═════════════
   Contextos (escena, personajes, tiempo, rasgo, tono, niveles) → red asociativa
   editable → puzzle (el usuario elige y ordena las piezas) → análisis de la
   redacción (casos, declinaciones, concordancia) → Libreta (PDF) y JSON.
   Todo lo creado se guarda en localStorage «euskara-buruko-neurona», que viaja
   con el perfil (armairua-cloud.js). La lógica sin DOM está en
   armairua-buruko-neurona-motorra.js.
   ════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var KEY = 'euskara-buruko-neurona';
  var K = window.BURUKO_NEURONA, M = null, KASUAK = null, ST = null, A = null, sel = null;
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return [].slice.call((r || document).querySelectorAll(s)); };
  var esc = function(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); };
  var fmt = function(n){ return (Math.round(n * 100) / 100).toFixed(2).replace('.', ','); };
  var uid = function(){ return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); };

  /* ── estado guardado ── */
  function load(){ try { var s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && s.tt) return s; } catch (e) {} return { v:1, aktiboa:null, tt:{} }; }
  var saveT = 0;
  function save(){ clearTimeout(saveT); saveT = setTimeout(function(){ try { localStorage.setItem(KEY, JSON.stringify(ST)); } catch (e) {} }, 250); }
  function berria(izena, base){
    var c = Object.assign({ eszena:'denda', prot:'p:Ane', beste:'', rola:'', denbora:'atzo', unea:'goiz', ezaugarria:'urduri', tonua:'adeitsua', mailak:[], atalasea:.3, pisuak:{}, gehitu:[], isildu:[], esaldiak:[] }, base || {});
    c.id = uid(); c.izena = izena; c.t = Date.now(); c.sortua = Date.now(); c.aukeratua = 0;   // sortua fija el orden de las pestañas (t cambia con cada edición)
    if (!c.esaldiak.length) c.esaldiak = [{ id:uid(), hizlaria:'', piezak:[] }];
    return c;
  }
  function ctx(){ return ST.tt[ST.aktiboa]; }
  function touch(){ ctx().t = Date.now(); save(); }

  /* ── arranque: datos del Hiztegia y del mural ── */
  function boot(){
    var root = $('#bn-app');
    Promise.all([
      fetch('bakarka-hiztegia.json').then(function(r){ if (!r.ok) throw new Error('bakarka-hiztegia.json'); return r.json(); }),
      fetch('kasuen-zuhaitza.html').then(function(r){ return r.ok ? r.text() : ''; }).catch(function(){ return ''; })
    ]).then(function(res){
      var hz = res[0];
      try { var m = res[1].match(/<script type="application\/json" id="kasuak-data">([\s\S]*?)<\/script>/); KASUAK = m ? JSON.parse(m[1]) : null; } catch (e) { KASUAK = null; }
      var a1 = (window.A1_DATA && A1_DATA.w || []).map(function(w){ return w.eu; });
      var a2 = []; ((window.A2_OSTALARITZA && A2_OSTALARITZA.units) || []).forEach(function(u){ (u.hz || []).forEach(function(g){ (g[2] || []).forEach(function(w){ a2.push(w[0]); }); }); });
      M = BN_MOTORRA.sortu({ hz:hz, kasuak:KASUAK, katalogoa:K, a1:a1, a2:a2 });
      window.BN = { M:M, ctx:function(){ return ctx(); }, egoera:function(){ return ST; }, render:renderAll };
      ST = load();
      if (!ST.aktiboa || !ST.tt[ST.aktiboa]){ var c = berria('Lehen testuingurua'); ST.tt[c.id] = c; ST.aktiboa = c.id; save(); }
      root.removeAttribute('aria-busy'); $('#bn-loading').hidden = true; $('#bn-main').hidden = false;
      wire(); setupLibreta(); renderAll();
    }).catch(function(e){
      $('#bn-loading').innerHTML = '<p class="bn-err">No se han podido cargar los datos (' + esc(e.message) + '). Abre la página con conexión una vez para que quede guardada sin conexión.</p>';
    });
  }

  /* ── etiquetas ── */
  function izenaDe(id){ if (!id) return '—'; if (/^l:/.test(id)) return String(id).slice(2); var e = M.sarrera(id); return e ? e.eu : String(id); }
  function hizlariak(c){ var out = [{ id:'', eu:'Narrazioa' }]; [c.prot, c.beste].forEach(function(x){ if (x) out.push({ id:x, eu:izenaDe(x) }); }); var sc = M.eszena(c.eszena); var r = c.rola || sc.rolak[0]; if (r) out.push({ id:'l:' + r, eu:r }); return out; }

  /* ═════════ render ═════════ */
  function renderAll(){ A = M.aktibatu(ctx()); renderTabs(); renderEditor(); renderNet(); renderPuzzle(); renderAnalisia(); }
  function refresh(){ A = M.aktibatu(ctx()); renderNet(); renderPuzzle(); renderAnalisia(); }

  function renderTabs(){
    var ids = Object.keys(ST.tt).sort(function(a, b){ return (ST.tt[a].sortua || ST.tt[a].t) - (ST.tt[b].sortua || ST.tt[b].t); });
    $('#bn-tabs').innerHTML = ids.map(function(id){ var c = ST.tt[id], sc = M.eszena(c.eszena), n = c.esaldiak.reduce(function(s, e){ return s + (e.piezak.length ? 1 : 0); }, 0);
      return '<button type="button" class="bn-tab" role="tab" data-tt="' + id + '" aria-selected="' + (id === ST.aktiboa) + '"><span>' + sc.ic + '</span><b>' + esc(c.izena) + '</b><small>' + n + ' esaldi</small></button>'; }).join('');
    $('#bn-izena').value = ctx().izena;
  }

  function chips(group, opts, cur, multi){
    return opts.map(function(o){ var on = multi ? cur.indexOf(o.v) >= 0 : String(cur) === String(o.v);
      return '<button type="button" class="chip" data-g="' + group + '" data-v="' + esc(o.v) + '" aria-pressed="' + on + '"' + (o.t ? ' title="' + esc(o.t) + '"' : '') + '>' + (o.ic ? '<span aria-hidden="true">' + o.ic + '</span> ' : '') + esc(o.l) + '</button>'; }).join('');
  }
  function renderEditor(){
    var c = ctx(), sc = M.eszena(c.eszena);
    var prot = K.izenak.map(function(x){ return { v:'p:' + x.id, l:x.id, t:x.es }; }).concat(K.familia.map(function(w){ var e = M.lemma(w, 'iz'); return { v:e.id, l:w, t:e.es }; }));
    var beste = [{ v:'', l:'—' }].concat(K.familia.map(function(w){ var e = M.lemma(w, 'iz'); return { v:e.id, l:w, t:e.es }; }));
    var rolak = [{ v:'', l:'auto' }].concat(sc.rolak.map(function(w){ return { v:w, l:w, t:(M.lemma(w, 'iz') || {}).es }; }));
    var grp = function(id, eu, es, html){ return '<div class="grp" role="group" aria-label="' + esc(eu) + '"><div class="gl">' + esc(eu) + ' <span>· ' + esc(es) + '</span></div><div class="chips">' + html + '</div></div>'; };
    $('#bn-editor').innerHTML =
      grp('eszena', 'Eszena', 'escenario', chips('eszena', K.eszenak.map(function(s){ return { v:s.id, l:s.eu, ic:s.ic, t:s.es + (s.iturria ? ' · ' + s.iturria : '') }; }), c.eszena)) +
      grp('prot', 'Protagonista', 'quién', chips('prot', prot, c.prot)) +
      grp('beste', 'Beste pertsonaia', 'familia o amistad', chips('beste', beste, c.beste)) +
      (sc.rolak.length ? grp('rola', 'Papera', 'quién atiende en la escena', chips('rola', rolak, c.rola)) : '') +
      grp('denbora', 'Denbora', 'cuándo y tiempo del verbo', chips('denbora', K.denbora.map(function(d){ return { v:d.id, l:d.id, t:d.es }; }), c.denbora)) +
      grp('unea', 'Eguneko unea', 'momento del día', chips('unea', [{ v:'', l:'—' }].concat(K.unea.map(function(u){ return { v:u.id, l:u.eu, t:u.es }; })), c.unea)) +
      grp('ezaugarria', 'Ezaugarria', 'rasgo (izan · egon · ukan)', chips('ezaugarria', [{ v:'', l:'—' }].concat(K.ezaugarriak.map(function(z){ return { v:z.id, l:z.eu || z.id, t:z.es + ' · ' + z.aditza }; })), c.ezaugarria)) +
      grp('tonua', 'Tonua', 'tono', chips('tonua', K.tonuak.map(function(t){ return { v:t.id, l:t.id, t:t.es }; }), c.tonua)) +
      grp('mailak', 'Mailak', 'niveles (vacío = todos)', chips('mailak', K.mailak.map(function(m){ return { v:m.id, l:m.id, t:m.es }; }), c.mailak, true)) +
      '<div class="thr"><label for="bn-thr">Umbral</label><input type="range" id="bn-thr" min="0" max="0.9" step="0.05" value="' + c.atalasea + '"><output id="bn-thr-o">' + fmt(c.atalasea) + '</output></div>';
  }

  /* ── red ── */
  var EDGES = [], SRC_LBL = { eszena:'Eszena', prot:'Protagonista', beste:'Beste pertsonaia', rola:'Papera', denbora:'Denbora', unea:'Unea', ezaugarria:'Ezaugarria', tonua:'Tonua' };
  function usedMap(){ var m = {}; ctx().esaldiak.forEach(function(s){ s.piezak.forEach(function(p){ if (p.w == null || p.w === 'aux') return; (m[p.w] = m[p.w] || {})[p.kasua || '_'] = 1; }); }); return m; }
  function renderNet(){
    var c = ctx(), sc = A.eszena, used = usedMap();
    EDGES = [];
    var src = [['eszena', sc.ic + ' ' + sc.eu], ['prot', izenaDe(c.prot)], ['beste', c.beste ? izenaDe(c.beste) : ''], ['rola', c.rola || ''], ['denbora', c.denbora], ['unea', c.unea ? (K.unea.find(function(u){ return u.id === c.unea; }) || {}).eu : ''], ['ezaugarria', c.ezaugarria ? ((K.ezaugarriak.find(function(z){ return z.id === c.ezaugarria; }) || {}).eu || c.ezaugarria) : ''], ['tonua', c.tonua]]
      .filter(function(x){ return x[1]; });
    var col0 = '<p class="lh"><span>0 · Testuingurua</span></p>' + src.map(function(x){ return '<div class="src" data-id="x:' + x[0] + '"><small>' + SRC_LBL[x[0]] + '</small>' + esc(x[1]) + '</div>'; }).join('');
    var ord = { e:0, f:1, t:2, n:3, k:4 };
    var nodes = Object.keys(A.a1).filter(function(k){ return A.a1[k] > .02 || (c.pisuak[k] != null); }).map(function(k){ return M.NODES[k]; }).filter(Boolean)
      .sort(function(a, b){ return (ord[a.mota] - ord[b.mota]) || (A.a1[b.id] - A.a1[a.id]); }).slice(0, 18);
    var col1 = '<p class="lh"><span>1 · Nodoak</span><span>toca para editar el peso</span></p>' + nodes.map(function(n){ var ov = c.pisuak[n.id] != null;
      return '<button type="button" class="node' + (n.berria ? ' nueva' : '') + (ov ? ' ov' : '') + '" data-id="' + n.id + '" data-node="' + n.id + '" title="activación ' + fmt(A.a1[n.id] || 0) + (ov ? ' · peso editado' : '') + '"><span class="k">' + esc(n.kick) + (ov ? ' · ✎' : '') + '</span><span class="t">' + esc(n.es) + '</span><i class="m" style="--a:' + (A.a1[n.id] || 0).toFixed(3) + '"></i></button>'; }).join('');
    Object.keys(A.contrib).forEach(function(k){ if (!nodes.some(function(n){ return n.id === k; })) return; A.contrib[k].forEach(function(x){ EDGES.push({ a:'x:' + x.src, b:k, w:Math.min(1, x.w), cls:'' }); }); });
    var all = [], N = M.E.length;
    for (var i = 0; i < N; i++) if (A.a2[i] > .001) all.push(i);
    all.sort(function(a, b){ return A.a2[b] - A.a2[a]; });
    var must = {}; (c.gehitu || []).forEach(function(id){ var e = M.byId[id]; if (e) must[e._i] = 1; }); Object.keys(used).forEach(function(id){ var e = M.byId[id]; if (e) must[e._i] = 1; });
    var shown = all.filter(function(i){ return must[i]; }); all.forEach(function(i){ if (!must[i] && shown.length < 24 && A.a2[i] >= A.th) shown.push(i); });
    shown.sort(function(a, b){ return A.a2[b] - A.a2[a]; });
    var col2 = '<p class="lh"><span>2 · Hitzak</span><span>' + all.filter(function(i){ return A.a2[i] >= A.th; }).length + ' activas</span></p>'
      + '<form class="addw" id="bn-addw"><input id="bn-addw-i" list="bn-hitzak" placeholder="＋ añadir palabra" aria-label="Añadir una palabra del Hiztegia a este contexto" autocomplete="off"></form>'
      + shown.map(function(i){ var e = M.E[i], u = used[e.id], dots = u ? Object.keys(u).filter(function(k){ return k !== '_'; }).map(function(k){ return '<i class="dot k-' + k + '"></i>'; }).join('') : '';
        var add = (c.gehitu || []).indexOf(e.id) >= 0;
        var homo = M.homografoa(e);
        return '<div class="word' + (A.a2[i] < A.th && !add ? ' off' : '') + '" data-id="w:' + e.id + '"><button type="button" class="wb" data-w="' + e.id + '" title="' + esc(e.eu + ' (' + M.kategoria(e) + ', nº ' + e.id + ') · ' + e.es) + ' · activación ' + fmt(A.a2[i]) + '"><b>' + esc(e.eu) + '</b><span class="es">' + esc(String(e.es).split(/[;,(]/)[0]) + '</span>' + (homo ? '<span class="tag kat" title="Homógrafo: hay otra palabra que se escribe igual">' + esc(M.kategoria(e)) + '</span>' : '') + (add ? '<span class="tag">añadida</span>' : '') + (dots ? '<span class="dots">' + dots + '</span>' : '') + '</button><button type="button" class="mute" data-mute="' + e.id + '" title="Quitar de este contexto" aria-label="Quitar ' + esc(e.eu) + ' de este contexto">✕</button><i class="m" style="--a:' + A.a2[i].toFixed(3) + '"></i></div>'; }).join('')
      + ((c.isildu || []).length ? '<button type="button" class="more" id="bn-unmute">' + c.isildu.length + ' quitadas · devolverlas</button>' : '');
    shown.forEach(function(i){ var e = M.E[i]; M.PAR[i].forEach(function(p){ if (nodes.some(function(n){ return n.id === p; })) EDGES.push({ a:p, b:'w:' + e.id, w:A.a1[p] || 0, cls:'l1', off:A.a2[i] < A.th }); }); });
    var pot = {}; shown.forEach(function(i){ var e = M.E[i]; if (e.cat === 'iz' && A.a2[i] >= A.th) (e.biz ? ['nork','nori','noren','norekin','norentzat','norengana'] : ['nor','non','nora','nondik','nongo','rik']).forEach(function(k){ pot[k] = 1; }); });
    var cnt = {}; Object.keys(used).forEach(function(id){ Object.keys(used[id]).forEach(function(k){ cnt[k] = (cnt[k] || 0) + 1; }); });
    var cases = KASUAK && KASUAK.CASES ? KASUAK.CASES.map(function(x){ return x.id; }) : M.CASE_ORDER;
    var col3 = '<p class="lh"><span>3 · Kasuak</span><span>árbol</span></p>' + cases.map(function(k){ var info = KASUAK && KASUAK.CASES ? KASUAK.CASES.find(function(x){ return x.id === k; }) : null;
      var stc = cnt[k] ? 'used' : pot[k] ? '' : 'idle';
      return '<div class="case k-' + k + ' ' + stc + '" data-id="c:' + k + '" title="' + esc(info ? info.name + ' · ' + (info.tipo || '') + ' · ' + (info.qw || '') : k) + '"><span>' + esc(M.CASE_LBL[k] || k) + '</span>' + (cnt[k] ? '<small>' + cnt[k] + '</small>' : '') + '</div>'; }).join('');
    Object.keys(used).forEach(function(id){ Object.keys(used[id]).forEach(function(k){ if (k !== '_' && cases.indexOf(k) >= 0) EDGES.push({ a:'w:' + id, b:'c:' + k, w:.9, cls:'case k-' + k }); }); });
    $('#bn-l0').innerHTML = col0; $('#bn-l1').innerHTML = col1; $('#bn-l2').innerHTML = col2; $('#bn-l3').innerHTML = col3;
    scheduleDraw();
  }
  var raf = 0;
  function scheduleDraw(){ cancelAnimationFrame(raf); raf = requestAnimationFrame(drawEdges); }
  function drawEdges(){
    var net = $('#bn-net'), svg = $('#bn-edges'); if (!net || net.offsetParent === null) return;
    var R = net.getBoundingClientRect();
    svg.setAttribute('width', Math.ceil(R.width)); svg.setAttribute('height', Math.ceil(net.scrollHeight));
    var stacked = getComputedStyle(net).gridTemplateColumns.trim().split(/\s+/).length === 1, h = '';
    EDGES.forEach(function(e){
      var Aa = net.querySelector('[data-id="' + e.a + '"]'), Bb = net.querySelector('[data-id="' + e.b + '"]'); if (!Aa || !Bb) return;
      var ra = Aa.getBoundingClientRect(), rb = Bb.getBoundingClientRect(), d;
      if (!stacked){ var la = Aa.closest('.layer').getBoundingClientRect(); var x1 = la.right - R.left, y1 = ra.top + ra.height / 2 - R.top, x2 = rb.left - R.left, y2 = rb.top + rb.height / 2 - R.top, dx = Math.max(18, (x2 - x1) / 2);
        d = 'M' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' C' + (x1 + dx).toFixed(1) + ',' + y1.toFixed(1) + ' ' + (x2 - dx).toFixed(1) + ',' + y2.toFixed(1) + ' ' + x2.toFixed(1) + ',' + y2.toFixed(1); }
      else { var X1 = ra.left + ra.width / 2 - R.left, Y1 = ra.bottom - R.top, X2 = rb.left + rb.width / 2 - R.left, Y2 = rb.top - R.top; if (Y2 <= Y1) return; var dy = Math.max(12, (Y2 - Y1) / 2);
        d = 'M' + X1.toFixed(1) + ',' + Y1.toFixed(1) + ' C' + X1.toFixed(1) + ',' + (Y1 + dy).toFixed(1) + ' ' + X2.toFixed(1) + ',' + (Y2 - dy).toFixed(1) + ' ' + X2.toFixed(1) + ',' + Y2.toFixed(1); }
      h += '<path d="' + d + '" class="e ' + (e.cls || '') + (e.off ? ' off' : '') + '" data-a="' + esc(e.a) + '" data-b="' + esc(e.b) + '" style="--w:' + e.w.toFixed(2) + '"/>';
    });
    svg.innerHTML = h;
  }

  /* ── puzzle ── */
  function pieceHtml(p, si, pi){
    var k = p.kasua || p.mota, lbl = p.lbl || (p.kasua ? M.CASE_LBL[p.kasua] : p.mota);
    var on = sel && sel.s === si && sel.p === pi, e = p.w != null && p.w !== 'aux' ? M.sarrera(p.w) : null;
    var tit = (e ? e.eu + ' (' + M.kategoria(e) + (typeof e.id === 'number' ? ', nº ' + e.id : '') + ') · ' : '') + lbl;
    return '<button type="button" class="pz k-' + esc(k) + (on ? ' sel' : '') + '" draggable="true" data-s="' + si + '" data-p="' + pi + '" title="' + esc(tit) + '"><b>' + esc(p.form + (p.p || '')) + '</b><small>' + esc(lbl) + '</small></button>';
  }
  function renderPuzzle(){
    var c = ctx(), hz = hizlariak(c);
    $('#bn-puzzle').innerHTML = c.esaldiak.map(function(s, si){
      var opts = hz.map(function(h){ return '<option value="' + esc(h.id) + '"' + (String(s.hizlaria || '') === String(h.id) ? ' selected' : '') + '>' + esc(h.eu) + '</option>'; }).join('');
      return '<div class="es-row' + (si === c.aukeratua ? ' act' : '') + '" data-s="' + si + '"><div class="es-h"><span class="es-n">' + (si + 1) + '</span><select class="es-who" data-s="' + si + '" aria-label="Quién habla en la frase ' + (si + 1) + '">' + opts + '</select>'
        + '<span class="sp"></span><button type="button" class="ib" data-act="up" data-s="' + si + '" aria-label="Subir la frase" title="Subir">↑</button><button type="button" class="ib" data-act="down" data-s="' + si + '" aria-label="Bajar la frase" title="Bajar">↓</button><button type="button" class="ib" data-act="del" data-s="' + si + '" aria-label="Borrar la frase" title="Borrar la frase">✕</button></div>'
        + '<div class="es-p" data-s="' + si + '">' + (s.piezak.length ? s.piezak.map(function(p, pi){ return pieceHtml(p, si, pi); }).join('') : '<span class="es-empty">Toca una palabra de la red, un personaje o un auxiliar para añadir piezas a esta frase.</span>') + '</div>'
        + (sel && sel.s === si ? '<div class="es-tool"><button type="button" class="btn" data-act="pl">← Mover</button><button type="button" class="btn" data-act="pr">Mover →</button><button type="button" class="btn" data-act="pd">Quitar pieza</button></div>' : '') + '</div>';
    }).join('');
  }

  /* ── análisis ── */
  function renderAnalisia(){
    var c = ctx(), out = [], rows = [], cnt = {}, ok = 0, tot = 0;
    c.esaldiak.forEach(function(s, si){
      if (!s.piezak.length) return; tot++;
      var r = M.aztertu(s.piezak), t = M.testua(s.piezak), who = s.hizlaria ? hizlariak(c).find(function(h){ return String(h.id) === String(s.hizlaria); }) : null;
      if (!r.akatsak.length) ok++;
      out.push('<div class="an-s ' + (r.akatsak.length ? 'bad' : r.oharrak.length ? 'warn' : 'ok') + '"><div class="an-t"><span class="an-v" aria-hidden="true">' + (r.akatsak.length ? '✗' : '✓') + '</span><span>' + (si + 1) + '. ' + (who ? '<b>' + esc(who.eu) + ':</b> «' + esc(t) + '»' : esc(t)) + '</span></div>'
        + (r.irakurketa ? '<p class="an-r">' + esc(M.FR_LBL[r.irakurketa.fr] + ' · ' + (r.irakurketa.ald === 'lehen' ? 'iragana' : 'orainaldia') + (r.irakurketa.sint ? ' · ' + r.irakurketa.sint + ' trinkoa' : '')) + '</p>' : '')
        + r.akatsak.map(function(m){ return '<p class="an-m bad">✗ ' + esc(m) + '</p>'; }).join('') + (r.talkak || []).map(function(m){ return '<p class="an-m talka">⚠ ' + esc(m) + '</p>'; }).join('') + r.oharrak.map(function(m){ return '<p class="an-m">· ' + esc(m) + '</p>'; }).join('') + '</div>');
      s.piezak.forEach(function(p, pi){ var a = M.piezaAnalisia(p); if (p.kasua) cnt[p.kasua] = (cnt[p.kasua] || 0) + 1;
        rows.push('<tr><td>' + (si + 1) + '.' + (pi + 1) + '</td><td class="hw">' + esc(a.form) + '</td><td>' + esc(a.lema) + (a.homografoa ? ' <span class="small">nº ' + a.id + '</span>' : '') + '</td><td class="small">' + esc(a.kategoria) + '</td><td class="k-' + esc(p.kasua || p.mota) + ' kc">' + esc(a.kasua) + '</td><td>' + esc(a.zenb) + '</td><td class="mono">' + esc(a.atzizkia) + '</td><td>' + esc(a.funtzioa) + '</td></tr>'); });
    });
    var mx = Math.max.apply(null, [1].concat(Object.keys(cnt).map(function(k){ return cnt[k]; })));
    $('#bn-anal').innerHTML = tot ? ('<div class="an-head"><b>' + ok + ' / ' + tot + '</b> frases sin errores de concordancia</div>' + out.join('')
      + '<div class="an-red"><span class="small">Redacción</span><p>' + redakzioa(c).map(esc).join('<br>') + '</p></div>'
      + '<div class="an-cnt">' + Object.keys(cnt).sort(function(a, b){ return cnt[b] - cnt[a]; }).map(function(k){ return '<div class="bar k-' + k + '"><span>' + esc(M.CASE_LBL[k] || k) + '</span><i style="width:' + (100 * cnt[k] / mx) + '%"></i><b>' + cnt[k] + '</b></div>'; }).join('') + '</div>'
      + '<div class="tbl"><table><thead><tr><th>#</th><th>hitza</th><th>lema</th><th>kat.</th><th>kasua</th><th>zenb.</th><th>atzizkia · pertsonak</th><th>funtzioa</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>')
      : '<p class="small">Cuando haya piezas en el puzzle, aquí verás cada frase analizada: casos, declinación y concordancia del auxiliar.</p>';
  }
  function redakzioa(c){ var hz = hizlariak(c); return c.esaldiak.filter(function(s){ return s.piezak.length; }).map(function(s){ var t = M.testua(s.piezak); var w = s.hizlaria ? hz.find(function(h){ return String(h.id) === String(s.hizlaria); }) : null; return w ? w.eu + ': «' + t + '»' : t; }); }

  /* ═════════ popovers: formas, nodos, personajes, auxiliares ═════════ */
  var pop = null;
  function closePop(){ if (pop){ pop.remove(); pop = null; } }
  function openPop(anchor, html, cls){
    closePop();
    pop = document.createElement('div'); pop.className = 'bn-pop ' + (cls || ''); pop.setAttribute('role', 'dialog'); pop.innerHTML = '<button type="button" class="px" aria-label="Cerrar">✕</button>' + html;
    document.body.appendChild(pop);
    var r = anchor.getBoundingClientRect(), w = Math.min(420, window.innerWidth - 24);
    pop.style.width = w + 'px';
    var left = Math.min(window.innerWidth - w - 12, Math.max(12, r.left + window.scrollX - 10));
    var top = r.bottom + window.scrollY + 6;
    if (window.innerWidth < 640){ left = 12 + window.scrollX; }
    pop.style.left = left + 'px'; pop.style.top = top + 'px';
    var f = pop.querySelector('button:not(.px), input'); if (f) f.focus();
    pop.querySelector('.px').onclick = closePop;
  }
  function formPop(anchor, id){
    var e = M.sarrera(id); if (!e) return;
    var F = M.formak(e), groups = {};
    F.forEach(function(f){ var g = f.zenb === 'pl' ? 'Plurala' : f.zenb === 'mg' ? 'Mugagabea' : f.mota === 'aditza' ? 'Aditza' : f.mota === 'adj' ? 'Izenondoa' : 'Singularra'; (groups[g] = groups[g] || []).push(f); });
    var anyT = false;
    var html = '<div class="pp-h"><b>' + esc(e.eu) + '</b> <span>' + esc(M.kategoria(e) + (typeof e.id === 'number' ? ' · nº ' + e.id : '') + ' · ' + (e.es || '')) + '</span></div>'
      + (M.homografoa(e) ? '<p class="small">Homógrafo: hay otra palabra que se escribe igual; esta es la de categoría «' + esc(M.kategoria(e)) + '».</p>' : '')
      + (M.jatorria(e) ? '<p class="small">Lexicalizada: ' + esc(M.jatorria(e)) + '.</p>' : '')
      + '<p class="small">Elige la forma: entra en la frase ' + (ctx().aukeratua + 1) + '.</p>'
      + Object.keys(groups).map(function(g){ return '<div class="pp-g"><div class="gl">' + g + '</div><div class="pp-f">' + groups[g].map(function(f){
          var tk = M.talkak(f.form, e.id); if (tk.length) anyT = true;
          return '<button type="button" class="pz k-' + esc(f.kasua || f.mota) + (tk.length ? ' talka' : '') + '" data-fi="' + F.indexOf(f) + '"' + (tk.length ? ' title="' + esc('También es: ' + tk.map(M.talkaTestua).join(' · ')) + '"' : '') + '><b>' + esc(f.form) + (tk.length ? ' ⚠' : '') + '</b><small>' + esc(f.lbl) + '</small></button>'; }).join('') + '</div></div>'; }).join('');
    if (anyT) html += '<p class="small talka-n">⚠ Esa forma se escribe igual que otra palabra (pasa el ratón para ver cuál). Si puede confundir, elige otra forma o palabra.</p>';
    openPop(anchor, html, 'forms');
    pop.addEventListener('click', function(ev){ var b = ev.target.closest('[data-fi]'); if (!b) return; var f = F[+b.dataset.fi]; addPiece(Object.assign({}, f)); toast('«' + f.form + '» → frase ' + (ctx().aukeratua + 1)); });
  }
  function nodePop(anchor, id){
    var n = M.NODES[id], c = ctx(), v = c.pisuak[id] != null ? c.pisuak[id] : (A.a1[id] || 0);
    openPop(anchor, '<div class="pp-h"><b>' + esc(n.es) + '</b> <span>' + esc(n.kick) + '</span></div><p class="small">El peso de este nodo en este contexto. 0 lo apaga; los cambios solo afectan a «' + esc(c.izena) + '».</p>'
      + '<div class="thr"><label for="bn-npis">Peso</label><input type="range" id="bn-npis" min="0" max="1" step="0.05" value="' + v + '"><output id="bn-npis-o">' + fmt(v) + '</output></div>'
      + '<div class="row"><button type="button" class="btn" id="bn-nreset"' + (c.pisuak[id] == null ? ' disabled' : '') + '>Volver al peso calculado</button><button type="button" class="btn" id="bn-noff">Apagar</button></div>', 'node');
    var inp = pop.querySelector('#bn-npis');
    inp.addEventListener('input', function(){ c.pisuak[id] = +inp.value; pop.querySelector('#bn-npis-o').textContent = fmt(+inp.value); touch(); refresh(); });
    pop.querySelector('#bn-nreset').onclick = function(){ delete c.pisuak[id]; touch(); refresh(); closePop(); };
    pop.querySelector('#bn-noff').onclick = function(){ c.pisuak[id] = 0; touch(); refresh(); closePop(); };
  }
  function charPop(anchor){
    var c = ctx(), sc = M.eszena(c.eszena), list = [];
    [c.prot, c.beste].forEach(function(x){ if (x) list.push(x); });
    var r = c.rola || sc.rolak[0]; if (r){ var re = M.lemma(r, 'iz'); if (re) list.push(re.id); }
    M.PRON.forEach(function(p){ list.push(p.id); });
    openPop(anchor, '<div class="pp-h"><b>Pertsonaiak eta izenordainak</b></div><p class="small">Elige quién y después su forma (Anek, Aneri, niri…).</p><div class="pp-f">' + list.map(function(id){ var e = M.sarrera(id); return e ? '<button type="button" class="chip" data-id="' + esc(id) + '">' + esc(e.eu) + '</button>' : ''; }).join('') + '</div>', 'chars');
    pop.addEventListener('click', function(ev){ var b = ev.target.closest('[data-id]'); if (!b) return; var id = b.dataset.id; formPop(anchor, /^\d+$/.test(id) ? +id : id); });
  }
  function auxPop(anchor){
    var tabs = {};
    M.AUXL.forEach(function(r){ (tabs[r.taula] = tabs[r.taula] || []).push(r); });
    var order = Object.keys(tabs);
    openPop(anchor, '<div class="pp-h"><b>Laguntzailea</b> <span>tablas del Hiztegia</span></div><label class="small" for="bn-auxt">Tabla</label> <select id="bn-auxt">' + order.map(function(t, i){ return '<option value="' + i + '">' + esc(t) + '</option>'; }).join('') + '</select><div class="pp-f" id="bn-auxf"></div>', 'aux');
    function fill(){ var t = order[+pop.querySelector('#bn-auxt').value]; pop.querySelector('#bn-auxf').innerHTML = tabs[t].map(function(r){ return '<button type="button" class="pz k-aux" data-f="' + esc(r.form) + '"><b>' + esc(r.form) + '</b><small>' + esc((r.NORK ? 'NORK ' + r.NORK + ' ' : '') + (r.NORI ? 'NORI ' + r.NORI + ' ' : '') + (r.NOR ? 'NOR ' + r.NOR : '')) + '</small></button>'; }).join(''); }
    pop.querySelector('#bn-auxt').addEventListener('change', fill); fill();
    pop.addEventListener('click', function(ev){ var b = ev.target.closest('[data-f]'); if (!b) return; var f = b.dataset.f; addPiece({ w:'aux', form:f, kasua:null, mota:'aux', lbl:(M.AUX[f] && M.AUX[f][0] ? M.FR_LBL[M.AUX[f][0].fr] + ' · ' + (M.AUX[f][0].ald === 'lehen' ? 'iragana' : 'orainaldia') : 'laguntzailea') }); toast('«' + f + '» → frase ' + (ctx().aukeratua + 1)); });
  }

  /* ═════════ acciones ═════════ */
  function addPiece(p){ var c = ctx(); if (!c.esaldiak.length) c.esaldiak.push({ id:uid(), hizlaria:'', piezak:[] }); var s = c.esaldiak[Math.min(c.aukeratua, c.esaldiak.length - 1)]; s.piezak.push(p); touch(); refresh(); }
  function proposatu(mota){
    var c = ctx(), used = [];
    c.esaldiak.forEach(function(s){ s.piezak.forEach(function(p){ if (p.mota === 'aditza'){ var e = M.sarrera(p.w); if (e) used.push(e.eu); } }); });
    var lehena = !c.esaldiak.some(function(s){ return s.piezak.length; });
    var r = M.proposatu(c, { a:A, erabiliak:used, lehena:lehena, mota:mota });
    if (!r){ toast(mota === 'ezaugarria' ? 'Elige un rasgo en el contexto.' : mota === 'tonua' ? 'Elige un tono que no sea neutro.' : 'No hay propuesta para esta escena.'); return; }
    var empty = c.esaldiak.findIndex(function(s){ return !s.piezak.length; });
    var s = { id:uid(), hizlaria:r.hizlaria || '', piezak:r.piezak };
    if (empty >= 0) c.esaldiak[empty] = s; else c.esaldiak.push(s);
    c.aukeratua = empty >= 0 ? empty : c.esaldiak.length - 1;
    touch(); refresh(); renderTabs();
  }
  function setCtx(g, v){
    var c = ctx();
    if (g === 'mailak'){ var i = c.mailak.indexOf(v); if (i >= 0) c.mailak.splice(i, 1); else c.mailak.push(v); }
    else if (g === 'prot' || g === 'beste') c[g] = /^\d+$/.test(v) ? +v : v;
    else { c[g] = v; if (g === 'eszena') c.rola = ''; }
    touch(); renderAll();
  }

  function wire(){
    document.getElementById('bn-hitzak').innerHTML = M.E.filter(function(e, i, a){ return a.findIndex(function(x){ return x.eu === e.eu; }) === i; }).map(function(e){ return '<option value="' + esc(e.eu) + '">'; }).join('');
    $('#bn-editor').addEventListener('click', function(ev){ var b = ev.target.closest('.chip'); if (b) setCtx(b.dataset.g, b.dataset.v); });
    $('#bn-editor').addEventListener('input', function(ev){ if (ev.target.id === 'bn-thr'){ ctx().atalasea = +ev.target.value; $('#bn-thr-o').textContent = fmt(+ev.target.value); touch(); refresh(); } });
    $('#bn-tabs').addEventListener('click', function(ev){ var b = ev.target.closest('[data-tt]'); if (!b) return; ST.aktiboa = b.dataset.tt; sel = null; save(); renderAll(); });
    $('#bn-izena').addEventListener('change', function(ev){ var v = ev.target.value.trim(); if (v){ ctx().izena = v; touch(); renderTabs(); } });
    $('#bn-new').addEventListener('click', function(){ var c = berria('Testuingurua ' + (Object.keys(ST.tt).length + 1)); c.sortua = Date.now(); ST.tt[c.id] = c; ST.aktiboa = c.id; sel = null; save(); renderAll(); $('#bn-izena').focus(); $('#bn-izena').select(); });
    $('#bn-dup').addEventListener('click', function(){ var o = JSON.parse(JSON.stringify(ctx())); delete o.id; var c = berria(o.izena + ' (kopia)', o); c.sortua = Date.now(); ST.tt[c.id] = c; ST.aktiboa = c.id; save(); renderAll(); });
    $('#bn-del').addEventListener('click', function(){
      var ids = Object.keys(ST.tt); if (!confirm('¿Borrar el contexto «' + ctx().izena + '» y su redacción?')) return;
      delete ST.tt[ST.aktiboa]; ids = Object.keys(ST.tt);
      if (!ids.length){ var c = berria('Lehen testuingurua'); ST.tt[c.id] = c; ids = [c.id]; }
      ST.aktiboa = ids[0]; sel = null; save(); renderAll();
    });
    var net = $('#bn-net');
    net.addEventListener('click', function(ev){
      var wb = ev.target.closest('.wb'); if (wb){ formPop(wb, +wb.dataset.w); return; }
      var mu = ev.target.closest('[data-mute]'); if (mu){ var c = ctx(), id = +mu.dataset.mute; c.isildu = (c.isildu || []).concat([id]); c.gehitu = (c.gehitu || []).filter(function(x){ return x !== id; }); touch(); refresh(); return; }
      if (ev.target.id === 'bn-unmute'){ ctx().isildu = []; touch(); refresh(); return; }
      var nd = ev.target.closest('[data-node]'); if (nd){ nodePop(nd, nd.dataset.node); }
    });
    net.addEventListener('submit', function(ev){
      if (ev.target.id !== 'bn-addw') return; ev.preventDefault();
      var q = $('#bn-addw-i').value.trim(), e = M.lemma(q, null) || M.E.find(function(x){ return x.eu.toLowerCase() === q.toLowerCase(); });
      if (!e){ toast('«' + q + '» no está en el Hiztegia.'); return; }
      var c = ctx(); c.gehitu = (c.gehitu || []).filter(function(x){ return x !== e.id; }).concat([e.id]); c.isildu = (c.isildu || []).filter(function(x){ return x !== e.id; }); touch(); refresh(); toast('«' + e.eu + '» añadida a este contexto.');
    });
    net.addEventListener('pointerover', function(ev){ var n = ev.target.closest('[data-id]'); if (!n || !net.contains(n)) return; var id = n.dataset.id; net.classList.add('focus'); $$('#bn-edges .e').forEach(function(p){ p.classList.toggle('hot', p.dataset.a === id || p.dataset.b === id); }); });
    net.addEventListener('pointerleave', function(){ net.classList.remove('focus'); });
    var pz = $('#bn-puzzle');
    pz.addEventListener('click', function(ev){
      var c = ctx(), row = ev.target.closest('.es-row');
      var act = ev.target.closest('[data-act]');
      if (act){
        var a = act.dataset.act, si = +(act.dataset.s != null ? act.dataset.s : (sel ? sel.s : 0));
        if (a === 'del'){ if (c.esaldiak[si].piezak.length && !confirm('¿Borrar la frase ' + (si + 1) + '?')) return; c.esaldiak.splice(si, 1); if (!c.esaldiak.length) c.esaldiak.push({ id:uid(), hizlaria:'', piezak:[] }); c.aukeratua = Math.min(c.aukeratua, c.esaldiak.length - 1); sel = null; }
        else if (a === 'up' && si > 0){ var t = c.esaldiak[si]; c.esaldiak[si] = c.esaldiak[si - 1]; c.esaldiak[si - 1] = t; c.aukeratua = si - 1; sel = null; }
        else if (a === 'down' && si < c.esaldiak.length - 1){ var t2 = c.esaldiak[si]; c.esaldiak[si] = c.esaldiak[si + 1]; c.esaldiak[si + 1] = t2; c.aukeratua = si + 1; sel = null; }
        else if (sel && (a === 'pl' || a === 'pr' || a === 'pd')) movePiece(a === 'pl' ? -1 : a === 'pr' ? 1 : 0);
        touch(); refresh(); renderTabs(); return;
      }
      var p = ev.target.closest('.pz');
      if (p){ var s2 = +p.dataset.s, p2 = +p.dataset.p; sel = (sel && sel.s === s2 && sel.p === p2) ? null : { s:s2, p:p2 }; c.aukeratua = s2; renderPuzzle(); var again = $('.pz.sel', pz); if (again) again.focus(); return; }
      if (row && !ev.target.closest('select')){ c.aukeratua = +row.dataset.s; sel = null; save(); renderPuzzle(); }
    });
    pz.addEventListener('change', function(ev){ if (ev.target.classList.contains('es-who')){ var s = ctx().esaldiak[+ev.target.dataset.s]; var v = ev.target.value; s.hizlaria = /^\d+$/.test(v) ? +v : v; touch(); renderAnalisia(); } });
    pz.addEventListener('keydown', function(ev){
      if (!sel || !ev.target.classList.contains('pz')) return;
      if (ev.key === 'ArrowLeft'){ ev.preventDefault(); movePiece(-1); }
      else if (ev.key === 'ArrowRight'){ ev.preventDefault(); movePiece(1); }
      else if (ev.key === 'Delete' || ev.key === 'Backspace'){ ev.preventDefault(); movePiece(0); }
      else return;
      touch(); refresh(); var f = $('.pz.sel', pz); if (f) f.focus();
    });
    /* arrastrar piezas entre posiciones y frases */
    var drag = null;
    pz.addEventListener('dragstart', function(ev){ var p = ev.target.closest('.pz'); if (!p) return; drag = { s:+p.dataset.s, p:+p.dataset.p }; ev.dataTransfer.effectAllowed = 'move'; try { ev.dataTransfer.setData('text/plain', p.textContent); } catch (e) {} });
    pz.addEventListener('dragover', function(ev){ if (drag && ev.target.closest('.es-p')){ ev.preventDefault(); } });
    pz.addEventListener('drop', function(ev){
      var box = ev.target.closest('.es-p'); if (!drag || !box) return; ev.preventDefault();
      var c = ctx(), ts = +box.dataset.s, target = ev.target.closest('.pz'), tp = target ? +target.dataset.p : c.esaldiak[ts].piezak.length;
      var piece = c.esaldiak[drag.s].piezak.splice(drag.p, 1)[0];
      if (drag.s === ts && tp > drag.p) tp--;
      c.esaldiak[ts].piezak.splice(tp, 0, piece); c.aukeratua = ts; sel = null; drag = null; touch(); refresh(); renderTabs();
    });
    pz.addEventListener('dragend', function(){ drag = null; });
    $('#bn-plus').addEventListener('click', function(){ var c = ctx(); c.esaldiak.push({ id:uid(), hizlaria:'', piezak:[] }); c.aukeratua = c.esaldiak.length - 1; sel = null; touch(); renderPuzzle(); });
    $('#bn-prop').addEventListener('click', function(){ proposatu(null); });
    $('#bn-prop-z').addEventListener('click', function(){ proposatu('ezaugarria'); });
    $('#bn-prop-t').addEventListener('click', function(){ proposatu('tonua'); });
    $('#bn-chars').addEventListener('click', function(ev){ charPop(ev.currentTarget); });
    $('#bn-auxb').addEventListener('click', function(ev){ auxPop(ev.currentTarget); });
    $('#bn-clear').addEventListener('click', function(){ var c = ctx(); if (!confirm('¿Vaciar el puzzle de «' + c.izena + '»?')) return; c.esaldiak = [{ id:uid(), hizlaria:'', piezak:[] }]; c.aukeratua = 0; sel = null; touch(); refresh(); renderTabs(); });
    $('#bn-lib').addEventListener('click', function(){ if (window.LIBRETA) LIBRETA.open(); });
    $('#bn-json').addEventListener('click', jsonExport);
    $('#bn-copy').addEventListener('click', function(){ var t = redakzioa(ctx()).join('\n'); if (navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ toast('Redacción copiada.'); }, function(){ toast('No se ha podido copiar.'); }); });
    document.addEventListener('keydown', function(ev){ if (ev.key === 'Escape') closePop(); });
    document.addEventListener('click', function(ev){ if (pop && !pop.contains(ev.target) && !ev.target.closest('.wb, [data-node], #bn-chars, #bn-auxb, .bn-pop')) closePop(); }, true);
    if (window.ResizeObserver) new ResizeObserver(scheduleDraw).observe(net); else window.addEventListener('resize', scheduleDraw);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleDraw);
    window.addEventListener('storage', function(ev){ if (ev.key === KEY){ ST = load(); if (!ST.tt[ST.aktiboa]) ST.aktiboa = Object.keys(ST.tt)[0]; renderAll(); } });
  }
  function movePiece(d){
    var c = ctx(), s = c.esaldiak[sel.s];
    if (d === 0){ s.piezak.splice(sel.p, 1); sel = null; return; }
    var j = sel.p + d; if (j < 0 || j >= s.piezak.length) return;
    var t = s.piezak[sel.p]; s.piezak[sel.p] = s.piezak[j]; s.piezak[j] = t; sel.p = j;
  }

  /* ═════════ exportar ═════════ */
  function egitura(c){
    var sc = M.eszena(c.eszena);
    return { testuingurua:{ izena:c.izena, eszena:sc.eu, protagonista:izenaDe(c.prot), beste:c.beste ? izenaDe(c.beste) : null, papera:c.rola || null, denbora:c.denbora, unea:c.unea || null, ezaugarria:c.ezaugarria || null, tonua:c.tonua, mailak:c.mailak },
      esaldiak:c.esaldiak.filter(function(s){ return s.piezak.length; }).map(function(s){ var r = M.aztertu(s.piezak); return { hizlaria:s.hizlaria ? izenaDe(s.hizlaria) : null, testua:M.testua(s.piezak), akatsak:r.akatsak, talkak:r.talkak, oharrak:r.oharrak,
        piezak:s.piezak.map(function(p){ var a = M.piezaAnalisia(p); return { hitza:a.form, lema:a.lema, id:a.id, kategoria:a.kategoria, kasua:a.kasua, zenbakia:a.zenb || null, atzizkia:a.atzizkia, funtzioa:a.funtzioa, jatorria:a.jatorria }; }) }; }),
      iturria:'Hiztegia · Bakarka (bakarka-hiztegia.json), Kasuen zuhaitza y catálogo Buruko neurona (⚠ Claude)', sortua:new Date().toISOString().slice(0, 10) };
  }
  function jsonExport(){
    var c = ctx(), blob = new Blob([JSON.stringify(egitura(c), null, 2)], { type:'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'erredakzioa-' + c.izena.toLowerCase().replace(/[^a-z0-9ñ]+/g, '-').replace(/^-|-$/g, '') + '.json';
    document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function setupLibreta(){
    if (!window.LIBRETA) return;
    LIBRETA.setup({
      maila:'Buruko neurona', key:'euskara-buruko-neurona-libreta',
      stats:function(){ var ids = Object.keys(ST.tt), n = 0, ok = 0; ids.forEach(function(id){ ST.tt[id].esaldiak.forEach(function(s){ if (s.piezak.length){ n++; if (!M.aztertu(s.piezak).akatsak.length) ok++; } }); });
        return [{ v:ids.length, l:'contextos creados' }, { v:n, l:'frases montadas' }, { v:ok + ' / ' + n, l:'frases sin errores de concordancia' }]; },
      sections:[{ id:'erredakzioak', icon:'🧠', eu:'Erredakzioak', title:'Redacciones del motor de creación',
        build:function(h){
          var out = [], n = 0;
          Object.keys(ST.tt).forEach(function(id){
            var c = ST.tt[id], E2 = egitura(c); if (!E2.esaldiak.length) return; n++;
            var t = E2.testuingurua;
            out.push('<div class="lb-card"><div><b>' + h.esc(c.izena) + '</b> <span class="lb-note">' + h.esc([t.eszena, t.protagonista, t.beste, t.denbora, t.ezaugarria, t.tonua].filter(Boolean).join(' · ')) + '</span>' + h.mark('tt' + id, h.hash(JSON.stringify(E2.esaldiak))) + '</div>'
              + '<p style="margin:4px 0 6px">' + E2.esaldiak.map(function(s){ return h.esc(s.hizlaria ? s.hizlaria + ': «' + s.testua + '»' : s.testua); }).join('<br>') + '</p>'
              + '<table style="width:100%;border-collapse:collapse;font-size:8.5pt"><tr style="text-align:left"><th>hitza</th><th>lema</th><th>kat.</th><th>kasua</th><th>zenb.</th><th>atzizkia</th><th>funtzioa</th></tr>'
              + E2.esaldiak.map(function(s){ return s.piezak.map(function(p){ return '<tr style="border-top:1px solid #ddd"><td><b>' + h.esc(p.hitza) + '</b></td><td>' + h.esc(p.lema) + '</td><td>' + h.esc(p.kategoria) + '</td><td>' + h.esc(p.kasua) + '</td><td>' + h.esc(p.zenbakia || '') + '</td><td>' + h.esc(p.atzizkia) + '</td><td>' + h.esc(p.funtzioa) + '</td></tr>'; }).join(''); }).join('') + '</table>'
              + E2.esaldiak.filter(function(s){ return s.akatsak.length; }).map(function(s){ return '<p class="lb-note">✗ ' + h.esc(s.testua) + ': ' + h.esc(s.akatsak.join(' ')) + '</p>'; }).join('') + '</div>');
          });
          return { html:out.join(''), n:n + ' contextos' };
        } }]
    });
  }

  var tt = 0;
  function toast(m){ var t = $('#bn-toast'); t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(function(){ t.hidden = true; }, 2200); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
