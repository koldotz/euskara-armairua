/* ══════════════════════════════════════════════════════════════════════
   Armairua · Nire akatsak — los errores, para repasarlos
   ----------------------------------------------------------------------
   Reúne en un solo sitio lo que se te ha resistido:
     · palabras de Hitzen kutxa falladas varias veces (las «difíciles»);
     · frases y palabras falladas en los juegos (AKATSAK.fail);
     · huecos del cuaderno con respuesta distinta de la solución
       (AKATSAK.gap, desde «Egiaztatu»).
   Lo que aciertas después sale solo de la lista: el juego llama a
   AKATSAK.win, el cuaderno a AKATSAK.gapOk y la palabra deja de ser difícil
   al repasarla. También se puede quitar a mano.
   Guardado en «euskara-akatsak-v1» por el HUB (viaja con el perfil).
   La vista se monta con AKATSAK.mount(contenedor, { hiztegia, unitTitle }).
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  if (window.AKATSAK) return;
  var KEY = 'euskara-akatsak-v1', MAX = 300;
  var st = load(), subs = [];

  function fix(v){ v = (v && typeof v === 'object') ? v : {}; v.j = v.j || {}; v.k = v.k || {}; return v; }
  function load(){ try { return fix(JSON.parse(localStorage.getItem(KEY) || 'null')); } catch (e) { return fix(null); } }
  function save(){
    if (window.HUB && HUB.save) HUB.save('akatsak', KEY, st);
    else try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {}
    emit();
  }
  function emit(){ subs.forEach(function(fn){ try { fn(); } catch (e) {} }); }
  function cap(m){ var ks = Object.keys(m); if (ks.length > MAX) ks.sort(function(a, b){ return m[a].t - m[b].t; }).slice(0, ks.length - MAX).forEach(function(k){ delete m[k]; }); }
  function clean(s){ return String(s == null ? '' : s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }

  var API = {
    /* juegos: una frase o palabra fallada (se acumulan las veces) */
    fail: function(game, eu, es){
      eu = clean(eu); if (!eu) return;
      var e = st.j[eu] || { n: 0 };
      e.g = game; e.es = clean(es) || e.es || ''; e.n = (e.n || 0) + 1; e.t = Date.now();
      st.j[eu] = e; cap(st.j); save();
    },
    /* acertada después (en el juego o al repasarla aquí): sale de la lista */
    win: function(eu){ eu = clean(eu); if (st.j[eu]) { delete st.j[eu]; save(); } },
    /* cuaderno: hueco con una respuesta distinta de la solución */
    gap: function(key, d){ d.t = Date.now(); st.k[key] = d; cap(st.k); save(); },
    gapOk: function(key){ if (st.k[key]) { delete st.k[key]; save(); } },
    dismiss: function(kind, key){ if (st[kind] && st[kind][key]) { delete st[kind][key]; save(); } },
    data: function(){ return st; },
    onChange: function(fn){ subs.push(fn); },
    mount: mount
  };
  window.AKATSAK = API;
  if (window.HUB && HUB.bind) HUB.bind('akatsak', KEY, function(v){ st = fix(v); emit(); }, function(){ return st; });

  /* ── la vista ── */
  var GAMES = { entzun: '🎧 Entzun', osatu: '✍️ Osatu', zein: '❓ Zein da?', ordena: '🔀 Ordenatu', egia: '⚖️ Egia ala gezurra', lotu: '🔗 Lotu' };
  function mount(root, opts){
    if (!root) return;
    opts = opts || {};
    var H = opts.hiztegia, cur = null, shown = false;
    function hard(){ return H && H.worked ? H.worked().filter(function(w){ return w.lp >= 2; }).sort(function(a, b){ return b.lp - a.lp; }) : []; }
    function queue(){ return Object.keys(st.j).sort(function(a, b){ return st.j[b].t - st.j[a].t; }); }
    function render(){
      var hw = hard(), jq = queue(), kq = Object.keys(st.k).sort(function(a, b){ return st.k[b].t - st.k[a].t; });
      if (cur && !st.j[cur]) { cur = null; shown = false; }
      if (!cur && jq.length) cur = jq[0];
      var total = hw.length + jq.length + kq.length;
      var h = '<header class="ak-h"><h3>🩹 Nire akatsak <span class="ak-n">' + total + '</span></h3>'
        + '<p>Lo que se te ha resistido en las tarjetas, los juegos y el cuaderno. Cuando lo aciertas, sale solo de la lista.</p></header>';

      h += '<section class="ak-sec"><h4>Hitzak · palabras que se te resisten <span class="ak-n">' + hw.length + '</span></h4>';
      if (hw.length) {
        h += '<div class="ak-words">' + hw.slice(0, 60).map(function(w){ return '<span><b>' + esc(w.eu) + '</b> ' + esc(w.es) + '</span>'; }).join('') + (hw.length > 60 ? '<span class="ak-more">y ' + (hw.length - 60) + ' más</span>' : '') + '</div>'
          + '<div class="ak-act"><button type="button" data-a="drill-study">🃏 Repasarlas con tarjetas</button><button type="button" data-a="drill-write">✍️ Escribirlas en euskera</button></div>';
      } else h += '<p class="ak-empty">Ninguna. Son las que fallas dos veces o más en Hitzen kutxa.</p>';
      h += '</section>';

      h += '<section class="ak-sec"><h4>Esaldiak · falladas en los juegos <span class="ak-n">' + jq.length + '</span></h4>';
      if (cur) {
        var e = st.j[cur];
        h += '<div class="ak-card"><div class="ak-meta">' + esc(GAMES[e.g] || e.g) + ' · fallada ' + e.n + (e.n === 1 ? ' vez' : ' veces') + '</div>'
          + '<div class="ak-es">' + esc(e.es || '—') + '</div>'
          + (shown ? '<div class="ak-eu">' + esc(cur) + '</div>' : '<div class="ak-eu ak-hid" aria-hidden="true">· · ·</div>')
          + '<div class="ak-act">' + (shown
              ? '<button type="button" data-a="know" class="yes">Badakit · quitar de la lista</button><button type="button" data-a="next">Oraindik ez · la siguiente</button>'
              : '<button type="button" data-a="show">Dilo en euskera y mira ↓</button>' + (window.ENTZUN && ENTZUN.say ? '<button type="button" data-a="say">🔊 Escuchar</button>' : ''))
          + '</div></div>'
          + '<details class="ak-list"><summary>Ver todas (' + jq.length + ')</summary><ul>' + jq.map(function(k){ var x = st.j[k];
              return '<li><span><b>' + esc(k) + '</b> ' + esc(x.es) + ' <i>' + esc(GAMES[x.g] || x.g) + ' · ×' + x.n + '</i></span><button type="button" class="ak-x" data-a="rmj" data-k="' + esc(k) + '" aria-label="Quitar de la lista">✕</button></li>'; }).join('') + '</ul></details>';
      } else h += '<p class="ak-empty">Ninguna. Aquí aparecen las frases y palabras que fallas en Entzun, Osatu, Zein da?, Ordenatu y Egia ala gezurra.</p>';
      h += '</section>';

      h += '<section class="ak-sec"><h4>Koadernoa · huecos que no coincidían <span class="ak-n">' + kq.length + '</span></h4>';
      if (kq.length) {
        h += '<ul class="ak-gaps">' + kq.map(function(k){ var g = st.k[k];
          return '<li><a href="#' + esc(g.u) + '" title="Ir al ejercicio">' + esc(g.x || '') + '</a><span class="ak-q">' + esc(g.q) + '</span>'
            + '<span class="ak-ans"><s>' + esc(g.you) + '</s> → <b>' + esc(g.sol) + '</b></span>'
            + '<button type="button" class="ak-x" data-a="rmk" data-k="' + esc(k) + '" aria-label="Quitar de la lista">✕</button></li>'; }).join('') + '</ul>'
          + '<p class="ak-note">Vuelve al ejercicio, corrige y pulsa «Egiaztatu»: lo que coincida sale de aquí. Si tu respuesta también vale, quítala con ✕.</p>';
      } else h += '<p class="ak-empty">Ninguno. Aparecen al pulsar «Egiaztatu» en un ejercicio del cuaderno.</p>';
      h += '</section>';
      root.innerHTML = '<div class="ak">' + h + '</div>';
    }
    root.addEventListener('click', function(e){
      var b = e.target.closest('button[data-a]'); if (!b) return;
      var a = b.getAttribute('data-a');
      if (a === 'show') { shown = true; render(); }
      else if (a === 'say' && cur) ENTZUN.say(cur);
      else if (a === 'know' && cur) { var k = cur; cur = null; shown = false; API.win(k); }
      else if (a === 'next' && cur) {
        var q = queue(), i = q.indexOf(cur); cur = q[(i + 1) % q.length]; shown = false; render();
      }
      else if (a === 'rmj') API.dismiss('j', b.getAttribute('data-k'));
      else if (a === 'rmk') API.dismiss('k', b.getAttribute('data-k'));
      else if ((a === 'drill-study' || a === 'drill-write') && H && H.drill) H.drill(hard().map(function(w){ return w.i; }), a === 'drill-write' ? 'write' : 'study');
    });
    subs.push(render);
    if (H && H.onGrade) H.onGrade(render);
    render();
    return { render: render };
  }
})();
