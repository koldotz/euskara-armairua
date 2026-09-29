/* ══════════════════════════════════════════════════════════════════════
   Armairua · Hitza — toca una palabra en euskera y mira su desglose
   ----------------------------------------------------------------------
   Lleva las «gafas» de Geruzak al resto de la app sin tocar su HTML: al
   tocar (o pulsar) una palabra dentro de las zonas en euskera, se busca:
     1. en el diccionario de las gafas (armairua-geruzak-betaurrekoak.js):
        desglose completo, revisable en la guía;
     2. en el vocabulario del nivel (Hitzen kutxa): la palabra y su sentido;
     3. si no está, se prueba a quitarle hasta dos terminaciones conocidas
        (-etan, -arekin, -ko, -ak…) hasta dar con una raíz conocida
        («mendi-etan», «Donostia-ko-ak»): análisis aproximado, y se dice.
   Lo que no se encuentra se dice también, sin inventar.

   HITZA.setup({ dict, words, guide, zones: [{ root, sel }], hintKey })
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  if (window.HITZA) return;
  var D = null, VOC = {}, ENDS = [], GUIDE = 'geruzak.html', pop = null, zones = [];

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function reads(v){ return Array.isArray(v[0]) ? v : [v]; }
  function norm(w){ return String(w || '').toLowerCase().replace(/^[-'’]+|[-'’]+$/g, ''); }
  function pieces(p){
    return p.split('|').map(function(x){
      var m = /^(.*):([A-Z0-9]+)$/.exec(x);
      if (m) return { t: m[1].replace(/^-/, ''), id: m[2], mota: (D.m[m[2]] || ['erro'])[0] };
      var e = x.indexOf('=');
      return e < 0 ? { t: x, mota: 'erro' } : { t: x.slice(0, e), es: x.slice(e + 1), mota: 'erro' };
    });
  }

  /* raíz conocida: en el vocabulario del nivel o como forma simple del diccionario */
  function stem(s){
    var cands = [s]; if (/rr$/.test(s)) cands.push(s.slice(0, -1));
    for (var i = 0; i < cands.length; i++) {
      var c = cands[i];
      if (VOC[c]) return { p: c + '=' + VOC[c][0], g: VOC[c][0], verb: isVerb(VOC[c][0]) };
      if (D.w[c]) { var r = reads(D.w[c])[0]; if (r[1].indexOf('|') < 0) return { p: r[1], g: r[0], verb: isVerb(r[0]) }; }
    }
    return null;
  }
  /* ¿la raíz es un verbo? (su traducción empieza por un infinitivo: «parar», «quedarse») */
  function isVerb(g){ return /^[a-záéíóúñ]+(ar|er|ir)(se)?$/i.test(String(g || '').split(/[,/;(·]/)[0].trim()); }
  /* la lectura de una terminación que encaja con la raíz: verbal si es verbo */
  function pick(E, verb){
    var asp = function(r){ return /:(PERF|HAB|FUT|TZE|TEKO|TERA)\b/.test(r.p); };
    for (var i = 0; i < E.rs.length; i++) if (asp(E.rs[i]) === !!verb) return E.rs[i];
    return E.rs[0];
  }
  function analyze(tok){
    var w = norm(tok);
    if (w.length < 2) return null;
    if (D.w[w]) return { w: w, reads: reads(D.w[w]) };
    if (VOC[w]) return { w: w, reads: [[VOC[w].join(' · '), w + '=' + VOC[w][0]]], voc: true };
    for (var i = 0; i < ENDS.length; i++) {
      var E = ENDS[i]; if (w.length - E.e.length < 2 || w.slice(-E.e.length) !== E.e) continue;
      var base = w.slice(0, -E.e.length), si = stem(base), extra = '', mid = '';
      for (var j = 0; !si && j < ENDS.length; j++) {
        var E2 = ENDS[j]; if (base.length - E2.e.length < 2 || base.slice(-E2.e.length) !== E2.e) continue;
        var s2 = stem(base.slice(0, -E2.e.length));
        if (s2) { var r2 = pick(E2, s2.verb); si = s2; extra = '|' + r2.p; mid = ' + ' + r2.g; }
      }
      if (si) { var r1 = pick(E, si.verb && !extra); return { w: w, reads: [[si.g + mid + ' + ' + r1.g, si.p + extra + '|' + r1.p]], approx: true }; }
    }
    return null;
  }

  /* la palabra bajo el dedo: nodo de texto y posición → palabra completa */
  function isW(c){ return !!c && /[\p{L}'’-]/u.test(c); }
  function wordAt(x, y){
    var node, off;
    if (document.caretPositionFromPoint) { var p = document.caretPositionFromPoint(x, y); if (!p) return null; node = p.offsetNode; off = p.offset; }
    else if (document.caretRangeFromPoint) { var r = document.caretRangeFromPoint(x, y); if (!r) return null; node = r.startContainer; off = r.startOffset; }
    if (!node || node.nodeType !== 3) return null;
    var t = node.data, s = off, e = off;
    while (s > 0 && isW(t[s - 1])) s--;
    while (e < t.length && isW(t[e])) e++;
    var w = t.slice(s, e).replace(/^[-'’]+|[-'’]+$/g, '');
    if (!/\p{L}{2}/u.test(w)) return null;
    var rg = document.createRange(); rg.setStart(node, s); rg.setEnd(node, e);
    var b = rg.getBoundingClientRect();
    if (x < b.left - 3 || x > b.right + 3 || y < b.top - 3 || y > b.bottom + 3) return null;   // el cursor cae en un hueco
    return { w: w, rect: b, node: node };
  }

  /* ── ficha ── */
  var MOTA_FALLBACK = { erro: ['Erroa', 'raíz'], det: ['Mugatzailea', 'artículo y número'], kasu: ['Kasua', 'caso'], lot: ['Lotura', 'letra de enlace'], asp: ['Aspektua', 'forma del verbo'], pers: ['Pertsona', 'persona del verbo'], erat: ['Eratorria', 'grado o derivación'], part: ['Partikula', 'partícula'] };
  function chips(ps){ return ps.map(function(p){ return '<span class="hz-chip" data-m="' + p.mota + '">' + esc(p.t) + '</span>'; }).join(''); }
  function open(word, rect){
    var a = analyze(word);
    if (!pop) {
      pop = document.createElement('div'); pop.className = 'hz-pop'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', 'Desglose de la palabra'); pop.hidden = true;
      document.body.appendChild(pop);
      pop.addEventListener('click', function(e){ if (e.target.closest('.hz-x')) close(); });
    }
    var h = '<div class="hz-ph"><b class="hz-w">' + esc(word) + '</b><button type="button" class="hz-x" aria-label="Cerrar">✕</button></div>';
    if (!a) h += '<p class="hz-none">Esta forma todavía no está en el diccionario de la app. Si es un nombre propio o una forma verbal poco común, es normal.</p>';
    else {
      var r = a.reads[0], ps = pieces(r[1]);
      h += '<div class="hz-pw">' + chips(ps) + '</div><div class="hz-g">' + esc(r[0]) + '</div>';
      if (a.approx) h += '<p class="hz-apx">Análisis automático y aproximado: raíz del vocabulario + terminación conocida.</p>';
      else if (a.voc) h += '<p class="hz-apx">Palabra del vocabulario (Hitzen kutxa), sin desglose en la guía.</p>';
      h += '<ol class="hz-pl">' + ps.map(function(p){
        var mm = p.id && D.m[p.id], mo = D.mota[p.mota] || MOTA_FALLBACK[p.mota] || ['', ''];
        var txt = mm ? esc(mm[2]) + (mm[3] ? ' <a href="' + GUIDE + '#' + mm[3] + '" target="_blank" rel="noopener">bloque ' + mm[3].slice(1) + ' ↗</a>' : '') : (p.es ? '«' + esc(p.es) + '»' : 'raíz');
        return '<li><span class="hz-chip" data-m="' + p.mota + '">' + esc(p.t) + '</span><div><b>' + esc(mo[0]) + '</b> <span class="hz-mo">· ' + esc(mo[2] || mo[1]) + '</span><br>' + txt + '</div></li>';
      }).join('') + '</ol>';
      if (a.reads.length > 1) h += '<div class="hz-alt"><span>También puede ser</span>' + a.reads.slice(1).map(function(x){ return '<div><span class="hz-pw">' + chips(pieces(x[1])) + '</span> ' + esc(x[0]) + '</div>'; }).join('') + '</div>';
      h += '<p class="hz-note">Desglose preparado con ayuda de IA: contrástalo con la guía.</p>';
    }
    pop.innerHTML = h; pop.hidden = false;
    place(rect);
  }
  function place(rect){
    if (matchMedia('(max-width:600px)').matches) { pop.classList.add('sheet'); pop.style.left = pop.style.top = ''; return; }
    pop.classList.remove('sheet');
    var pw = pop.offsetWidth, ph = pop.offsetHeight, y = rect.bottom + 8;
    if (y + ph > innerHeight - 8 && rect.top - ph - 8 > 8) y = rect.top - ph - 8;
    pop.style.left = Math.max(8, Math.min(rect.left, innerWidth - pw - 8)) + 'px';
    pop.style.top = Math.max(8, Math.min(y, innerHeight - ph - 8)) + 'px';
  }
  function close(){ if (pop) pop.hidden = true; }

  function onClick(e){
    if (e.button || e.defaultPrevented) return;
    var t = e.target;
    if (t.closest('input, textarea, button, a, select, summary, label, .hz-pop')) return;
    var z = null;
    for (var i = 0; i < zones.length && !z; i++) { var r = zones[i].el; if (r && r.contains(t)) z = t.closest(zones[i].sel); }
    if (!z) return;
    if (z.closest('.mz-practice .mz-row:not(.rev)')) return;                     // Mintzamena en práctica: el toque destapa la línea
    var sel = window.getSelection && String(window.getSelection()); if (sel && sel.trim()) return;   // seleccionando texto
    var hit = wordAt(e.clientX, e.clientY); if (!hit || !z.contains(hit.node)) return;
    open(hit.w, hit.rect);
  }

  function setup(cfg){
    D = cfg.dict; if (!D) return;
    GUIDE = cfg.guide || GUIDE;
    (cfg.words || []).forEach(function(w){ var k = String(w.eu || '').toLowerCase().trim(); if (k && !/\s/.test(k)) (VOC[k] = VOC[k] || []).push(w.es); });
    /* terminaciones: las entradas «-…» del diccionario; «-(e)tan» da «-etan» y «-tan» */
    var seen = {};
    ENDS = [];
    /* primero las escritas tal cual («-etan» plural), luego las variantes de «-(e)tan» */
    Object.keys(D.w).sort(function(a, b){ return /\(/.test(a) - /\(/.test(b); }).forEach(function(k){
      if (k[0] !== '-' || k.length < 2 || /-$/.test(k)) return;
      var opt = /\(([a-z])\)/.exec(k);
      var vars = opt ? [[k.replace(opt[0], opt[1]), opt[1]], [k.replace(opt[0], ''), '']] : [[k, null]];
      vars.forEach(function(v){
        var e = v[0].slice(1); if (!e || /[()]/.test(e) || seen[e]) return; seen[e] = 1;
        var rs = reads(D.w[k]).map(function(r){
          var p = r[1].replace(/^-/, '');
          if (opt) p = v[1] ? p.replace('(' + opt[1] + ')', opt[1]) : p.split('|').filter(function(x){ return x.indexOf('(' + opt[1] + ')') !== 0; }).join('|');
          return { g: r[0], p: p.replace(/^-/, '') };
        });
        ENDS.push({ e: e, rs: rs });
      });
    });
    ENDS.sort(function(a, b){ return b.e.length - a.e.length; });
    zones = (cfg.zones || []).map(function(z){ return { el: typeof z.root === 'string' ? document.querySelector(z.root) : z.root, sel: z.sel }; });
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
    document.addEventListener('pointerdown', function(e){ if (pop && !pop.hidden && !pop.contains(e.target)) close(); }, true);
    addEventListener('scroll', function(){ if (pop && !pop.hidden && !pop.classList.contains('sheet')) close(); }, { passive: true });
    injectCSS(cfg.zones || []);
    // aviso una sola vez por dispositivo
    if (cfg.hintKey) {
      var seen = null; try { seen = localStorage.getItem(cfg.hintKey); } catch (e) {}
      if (!seen) {
        var tip = document.createElement('div'); tip.className = 'hz-tip'; tip.setAttribute('role', 'status');
        tip.innerHTML = '<span>👓 Novedad: toca una palabra en euskera del cuaderno, de Mintzamena o de Esaldiak y verás su desglose.</span><button type="button" aria-label="Entendido">Ados</button>';
        document.body.appendChild(tip);
        tip.querySelector('button').addEventListener('click', function(){ tip.remove(); try { localStorage.setItem(cfg.hintKey, '1'); } catch (e) {} });
      }
    }
  }

  function injectCSS(zs){
    var st = document.createElement('style'); st.id = 'hz-style';
    var sel = zs.map(function(z){ return (typeof z.root === 'string' ? z.root : '') + ' ' + z.sel.split(',').join(', ' + (typeof z.root === 'string' ? z.root : '') + ' '); }).join(', ');
    st.textContent = [
      ':root{--hz-plum:#6A4C93;--hz-plum-s:#EAE2F3;--hz-blue:#2D5F8B;--hz-blue-s:#DDE7F1;--hz-rose:#9A3B67;--hz-rose-s:#F5DFE9}',
      '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--hz-plum:#B99BE0;--hz-plum-s:#2D2339;--hz-blue:#8DB5DE;--hz-blue-s:#1C2B3A;--hz-rose:#E391B8;--hz-rose-s:#3A2230}}',
      ':root[data-theme="dark"]{--hz-plum:#B99BE0;--hz-plum-s:#2D2339;--hz-blue:#8DB5DE;--hz-blue-s:#1C2B3A;--hz-rose:#E391B8;--hz-rose-s:#3A2230}',
      '@media (hover:hover){' + sel + '{cursor:help}}',
      '.hz-pop{position:fixed;z-index:9500;width:min(360px,calc(100vw - 16px));max-height:min(70vh,520px);overflow-y:auto;background:var(--surface);color:var(--ink);border:1px solid var(--line-strong);border-radius:8px;box-shadow:var(--shadow);font-family:var(--f-ui);font-size:13.5px;line-height:1.45;padding:12px 14px}',
      '.hz-pop[hidden]{display:none}.hz-pop.sheet{left:8px!important;right:8px;bottom:calc(8px + env(safe-area-inset-bottom,0px));top:auto!important;width:auto;max-height:62vh}',
      '.hz-ph{display:flex;align-items:center;gap:8px}.hz-w{font-family:var(--f-display);font-size:18px}',
      '.hz-x{margin-left:auto;font:inherit;cursor:pointer;border:1px solid var(--line);border-radius:4px;background:none;color:var(--muted);padding:4px 8px}',
      '.hz-pw{display:inline-flex;flex-wrap:wrap;gap:2px;margin-top:6px}.hz-g{font-family:var(--f-body);font-style:italic;font-size:16px;margin:4px 0 6px}',
      '.hz-chip{display:inline-block;font-family:var(--f-mono);font-size:12.5px;font-weight:500;padding:0 5px;border-radius:2px;border-bottom:2px solid var(--line-strong);background:var(--surface-2);color:var(--ink);white-space:nowrap}',
      '.hz-chip[data-m="det"]{background:var(--gold-soft);color:var(--gold);border-color:var(--gold)}',
      '.hz-chip[data-m="kasu"]{background:var(--iron-soft);color:var(--iron);border-color:var(--iron)}',
      '.hz-chip[data-m="asp"]{background:var(--sea-soft);color:var(--sea);border-color:var(--sea)}',
      '.hz-chip[data-m="pers"]{background:var(--hz-plum-s);color:var(--hz-plum);border-color:var(--hz-plum)}',
      '.hz-chip[data-m="erat"]{background:var(--hz-blue-s);color:var(--hz-blue);border-color:var(--hz-blue)}',
      '.hz-chip[data-m="part"]{background:var(--hz-rose-s);color:var(--hz-rose);border-color:var(--hz-rose)}',
      '.hz-chip[data-m="lot"]{background:none;color:var(--muted);border-bottom:2px dotted var(--muted)}',
      '.hz-pl{list-style:none;margin:0;padding:8px 0 0;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:7px}',
      '.hz-pl li{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px;align-items:start;margin:0}.hz-mo{color:var(--muted);font-size:12px}',
      '.hz-apx,.hz-note,.hz-none{font-size:12px;color:var(--muted);margin:6px 0 0}.hz-apx{color:var(--gold)}.hz-none{font-size:13px}',
      '.hz-alt{border-top:1px solid var(--line);margin-top:8px;padding-top:6px;display:flex;flex-direction:column;gap:4px}.hz-alt>span{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}',
      '.hz-tip{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:9400;display:flex;gap:10px;align-items:center;max-width:calc(100vw - 32px);padding:10px 12px 10px 14px;border-radius:8px;background:var(--ink);color:var(--surface);font-family:var(--f-ui);font-size:13.5px;box-shadow:0 6px 24px rgba(0,0,0,.3)}',
      '.hz-tip button{flex:none;font:inherit;font-weight:600;cursor:pointer;border:0;border-radius:5px;background:var(--sea);color:#fff;padding:5px 12px}',
      '@media print{.hz-pop,.hz-tip{display:none!important}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  window.HITZA = { setup: setup, analyze: function(w){ return analyze(w); }, open: open, close: close };
})();
