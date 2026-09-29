/* ══════════════════════════════════════════════════════════════════════
   Armairua · Koadernoa — comprobar ejercicios y simulacros cronometrados
   ----------------------------------------------------------------------
   Para cualquier nivel con el cuaderno editable (section.unit > .ar con
   huecos .gapf, respuestas .ansf, puntuaciones .scoref y soluciones .sol):

   · «Egiaztatu» en cada ejercicio compara con la solución del libro:
       huecos → ✓ / ✗ (con la solución al lado del ✗);
       respuestas abiertas → ✓ si coinciden con la solución o con una de
       sus alternativas; si no, se enseña el modelo para compararlo tú
       («otras respuestas pueden valer»). Nunca se marcan como error.
     Los ✗ van a «Nire akatsak»; lo que luego coincide, sale de allí.

   · Simulacros: en las unidades configuradas como examen, un cronómetro
     con el tiempo de la unidad («Eguna 24 · 75 min»), pausa y entrega.
     Mientras corre, las soluciones de esa unidad no se pueden abrir. Al
     entregar se abren, se comprueba todo y se piden las notas de cada
     destreza; en cuanto están todas, el total se apunta solo en el plan
     (PLANA.setScore) y la tarea del simulacro queda hecha.

   KOADERNOA_CHECK.setup({ root, exams: { a1: { prueba: 's1' }, … } })
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  if (window.KOADERNOA_CHECK) return;
  var FIELDS = 'input.gapf, textarea.ansf';
  function nrm(s){ return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[«»"“”¿?¡!.,;:()…*]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function alts(el){ return String(el.textContent || '').split(/\s+\/\s+|\s+o\s+(?=[a-z])/i).map(nrm).filter(Boolean); }
  function AK(){ return window.AKATSAK || null; }

  /* ── comprobar un ejercicio ── */
  function clear(ar){
    ar.querySelectorAll('.kc-sol, .kc-model').forEach(function(x){ x.remove(); });
    ar.querySelectorAll('.kc-ok, .kc-ko, .kc-cmp').forEach(function(x){ x.classList.remove('kc-ok', 'kc-ko', 'kc-cmp'); x.removeAttribute('title'); });
    var s = ar.querySelector('.kc-sum'); if (s) s.textContent = '';
    ar.classList.remove('kc-on');
    var b = ar.querySelector('.kc-btn'); if (b) b.textContent = '✓ Egiaztatu · comprobar';
  }
  function itemText(li, gap){
    var out = '';
    (function walk(n){
      n.childNodes.forEach(function(c){
        if (c.nodeType === 3) out += c.data;
        else if (c.matches && c.matches('input.gapf')) out += c === gap ? '___' : (c.value || '…');
        else if (c.matches && (c.matches('.kc-sol, .kc-model, textarea') )) return;
        else walk(c);
      });
    })(li);
    return out.replace(/\s+/g, ' ').trim();
  }
  function check(ar, unit){
    var items = ar.querySelectorAll('.b ol.items > li'), sols = ar.querySelectorAll('.sol .in > ol > li');
    var r = { ok: 0, ko: 0, cmp: 0, empty: 0 };
    var hd = ar.querySelector('.h .k'), exLabel = hd ? hd.textContent.trim() : '', arIdx = Array.prototype.indexOf.call(unit.querySelectorAll('.ar'), ar);
    var same = items.length && items.length === sols.length;
    items.forEach(function(li, i){
      var sol = same ? sols[i] : null, gaps = li.querySelectorAll('input.gapf'), bs = sol ? sol.querySelectorAll('b') : [];
      gaps.forEach(function(g, j){
        var v = nrm(g.value), key = unit.id + ':' + arIdx + ':' + i + ':' + j;
        if (!v) { r.empty++; return; }
        if (!sol || bs.length !== gaps.length) { r.cmp++; g.classList.add('kc-cmp'); if (sol && j === gaps.length - 1) addModel(li, sol); return; }
        var ok = alts(bs[j]).indexOf(v) >= 0;
        g.classList.add(ok ? 'kc-ok' : 'kc-ko'); g.title = 'Solución: ' + bs[j].textContent.trim();
        if (ok) { r.ok++; if (AK()) AK().gapOk(key); }
        else {
          r.ko++;
          var s = document.createElement('span'); s.className = 'kc-sol'; s.textContent = '→ ' + bs[j].textContent.trim();
          g.insertAdjacentElement('afterend', s);
          if (AK()) AK().gap(key, { u: unit.id, x: exLabel, q: itemText(li, g), you: g.value.trim(), sol: bs[j].textContent.trim() });
        }
      });
      li.querySelectorAll('textarea.ansf').forEach(function(ta){
        var v = nrm(ta.value);
        if (!v) { r.empty++; return; }
        if (!sol) { r.cmp++; ta.classList.add('kc-cmp'); return; }
        var cands = bs.length ? Array.prototype.reduce.call(bs, function(a, b){ return a.concat(alts(b)); }, []) : alts(sol);
        if (cands.indexOf(v) >= 0 || nrm(sol.textContent) === v) { r.ok++; ta.classList.add('kc-ok'); ta.title = 'Coincide con la solución'; }
        else { r.cmp++; ta.classList.add('kc-cmp'); addModel(li, sol); }
      });
    });
    ar.classList.add('kc-on');
    if (!same && r.cmp) { var d = ar.querySelector('details.sol'); if (d) d.open = true; }   // sin solución por pregunta: se abre entera
    var sum = ar.querySelector('.kc-sum');
    if (sum) sum.innerHTML = '<b class="ok">✓ ' + r.ok + '</b>' + (r.ko ? ' · <b class="ko">✗ ' + r.ko + '</b>' : '') + (r.cmp ? ' · ' + r.cmp + ' para comparar con el modelo' : '') + (r.empty ? ' · ' + r.empty + ' sin responder' : '')
      + '<span class="kc-note">La solución es la del libro: otras respuestas pueden ser válidas.</span>';
    var b = ar.querySelector('.kc-btn'); if (b) b.textContent = 'Ocultar la corrección';
    return r;
  }
  function addModel(li, sol){
    if (li.querySelector('.kc-model')) return;
    var d = document.createElement('div'); d.className = 'kc-model';
    d.innerHTML = '<span>Modelo:</span> ' + sol.innerHTML;
    li.appendChild(d);
  }

  /* ── simulacros ── */
  var SK = 'euskara-simulazioak-v1', CFG = {}, root = null, tick = null, clock = null;
  function sload(){ try { return JSON.parse(localStorage.getItem(SK) || '{}') || {}; } catch (e) { return {}; } }
  function ssave(s){ if (window.HUB && HUB.save) HUB.save('simulazioak', SK, s); else try { localStorage.setItem(SK, JSON.stringify(s)); } catch (e) {} }
  function mins(unit){ var t = unit.querySelector('.uhead .tag'); var m = t && /(\d+)\s*min/.exec(t.textContent); return m ? +m[1] : 60; }
  function title(unit){ var h = unit.querySelector('.uhead h2'); return h ? h.textContent.trim() : unit.id; }
  function used(x){ return (x.acc || 0) + (x.run ? Date.now() - x.run : 0); }
  function fmt(ms){ ms = Math.max(0, ms); var s = Math.round(ms / 1000), m = Math.floor(s / 60); return m + ':' + String(s % 60).padStart(2, '0'); }
  function scores(unit){ return Array.prototype.slice.call(unit.querySelectorAll('input.scoref')); }
  /* la puntuación máxima de cada casilla es la del texto que la sigue («… / 25») */
  function maxOf(inp){ var n = inp.nextSibling, t = n && n.nodeType === 3 ? n.data : ''; var m = /^\s*\/\s*(\d+)/.exec(t); return m ? +m[1] : 0; }
  /* partes y casilla del total (la que vale lo que suman las demás: «GUZTIRA: __ / 100») */
  function parts(unit){
    var sc = scores(unit), mx = sc.map(maxOf), tot = null;
    sc.forEach(function(inp, i){ var rest = mx.reduce(function(a, v, j){ return j === i ? a : a + v; }, 0); if (mx[i] && mx[i] === rest) tot = inp; });
    return { parts: sc.filter(function(i){ return i !== tot; }), total: tot };
  }

  function simBar(unit){
    var S = sload(), x = S[unit.id] || {}, lim = mins(unit) * 60000, bar = unit.querySelector('.sim');
    if (!bar) { bar = document.createElement('div'); bar.className = 'sim'; var uh = unit.querySelector('.uhead'); (uh || unit.firstElementChild).insertAdjacentElement('afterend', bar); }
    unit.classList.toggle('sim-on', !!x.start && !x.done);
    var h = '';
    if (!x.start) h = '<div class="sim-t"><b>⏱ Simulacro cronometrado</b><span>' + mins(unit) + ' minutos, de una sentada. Mientras corre, las soluciones quedan cerradas.</span></div><button type="button" data-s="start">Hasi · empezar</button>';
    else if (!x.done) h = '<div class="sim-t"><b>⏱ ' + fmt(lim - used(x)) + '</b><span>' + (x.run ? 'en marcha' : 'en pausa') + ' · ' + mins(unit) + ' min</span></div>'
      + '<button type="button" data-s="' + (x.run ? 'pause' : 'resume') + '">' + (x.run ? 'Pausa' : 'Jarraitu · seguir') + '</button><button type="button" data-s="done" class="go">Entregar</button>';
    else {
      var R = result(unit), pr = CFG.exams && CFG.exams[unit.id] && CFG.exams[unit.id].prueba;
      h = '<div class="sim-t"><b>Entregado · ' + fmt(x.usedMs || 0) + ' de ' + mins(unit) + ' min' + (x.late ? ' (se acabó el tiempo)' : '') + '</b>'
        + '<span>' + (R.all ? 'Total <b>' + R.tot + ' / ' + R.max + '</b> · ' + (R.pass ? '<b class="sim-ok">gainditua</b>' : '<b class="sim-ko">ez gainditua</b>' + (R.low ? ' (alguna destreza por debajo de ' + R.min + ')' : ''))
            + (pr && window.PLANA && PLANA.setScore ? ' · apuntado en el plan ✓' : '')
          : 'Puntúa cada destreza en su casilla «Puntuazioa»: el total se calcula y se apunta solo en el plan.') + '</span></div>'
        + '<button type="button" data-s="again">Repetir</button>';
    }
    bar.innerHTML = h;
    renderClock();
  }
  function act(unit, a){
    var S = sload(), x = S[unit.id] || {};
    if (a === 'start') { unit.querySelectorAll('details.sol').forEach(function(d){ d.open = false; }); unit.querySelectorAll('.ar.kc-on').forEach(clear); x = { start: Date.now(), run: Date.now(), acc: 0 }; }
    else if (a === 'pause' && x.run) { x.acc = used(x); x.run = 0; }
    else if (a === 'resume' && !x.run) x.run = Date.now();
    else if (a === 'done' || a === 'late') {
      x.usedMs = Math.min(used(x), mins(unit) * 60000); x.acc = x.usedMs; x.run = 0; x.done = Date.now(); if (a === 'late') x.late = 1;
      S[unit.id] = x; ssave(S);
      unit.classList.remove('sim-on');
      unit.querySelectorAll('details.sol').forEach(function(d){ d.open = true; });
      unit.querySelectorAll('.ar').forEach(function(ar){ if (ar.querySelector('.kc-btn') && !ar.classList.contains('kc-on')) check(ar, unit); });
      simBar(unit);
      var first = scores(unit).filter(function(i){ return !i.value; })[0];
      if (first) try { first.focus({ preventScroll: true }); first.scrollIntoView({ block: 'center' }); } catch (e) {}
      return;
    }
    else if (a === 'again') x = {};
    S[unit.id] = x; ssave(S); simBar(unit);
  }
  /* notas de las destrezas → total, aprobado (60 y cada destreza al menos 15 de 25) */
  function result(unit){
    var P = parts(unit), vals = P.parts.map(function(i){ return i.value.trim(); });
    var all = P.parts.length > 0 && vals.every(function(v){ return v !== '' && !isNaN(+v); });
    var tot = vals.reduce(function(a, v){ return a + (+v || 0); }, 0), max = P.parts.reduce(function(a, i){ return a + maxOf(i); }, 0) || 100;
    var min = 0.6, low = P.parts.some(function(i){ return +i.value < Math.ceil(maxOf(i) * min); });
    return { P: P, all: all, tot: tot, max: max, pass: all && tot >= Math.ceil(max * min) && !low, low: all && low, min: Math.ceil(25 * min) };
  }
  /* total apuntado en el plan en cuanto están todas las notas */
  function syncScore(unit){
    var S = sload(), x = S[unit.id]; if (!x || !x.done) return;
    var ex = CFG.exams[unit.id], R = result(unit);
    if (!R.all) return simBar(unit);
    var tot = R.tot;
    if (R.P.total && R.P.total.value !== String(tot)) { R.P.total.value = String(tot); R.P.total.dispatchEvent(new Event('input', { bubbles: true })); }
    if (ex && ex.prueba && window.PLANA && PLANA.setScore) {
      if (String(PLANA.score(ex.prueba)) !== String(tot)) PLANA.setScore(ex.prueba, tot);
      if (PLANA.markLink) PLANA.markLink('#' + unit.id, 'proba');
    }
    simBar(unit);
  }
  /* reloj flotante mientras un simulacro está en marcha y el cuaderno a la vista */
  function renderClock(){
    var S = sload(), live = null;
    Object.keys(S).forEach(function(k){ if (S[k] && S[k].start && !S[k].done && CFG.exams[k]) live = k; });
    if (!clock) {
      clock = document.createElement('div'); clock.className = 'sim-clock'; clock.setAttribute('role', 'timer'); clock.hidden = true; document.body.appendChild(clock);
      clock.addEventListener('click', function(e){
        var u = clock.getAttribute('data-u') && document.getElementById(clock.getAttribute('data-u')), b = e.target.closest('button[data-s]');
        if (b && u) act(u, b.getAttribute('data-s')); else if (u) u.scrollIntoView({ block: 'start' });
      });
    }
    var unit = live && document.getElementById(live), vis = unit && !(root && root.closest('[hidden]'));
    if (live) clock.setAttribute('data-u', live);
    clock.hidden = !vis;
    if (!vis) return;
    var x = S[live], left = mins(unit) * 60000 - used(x);
    clock.classList.toggle('low', left < 5 * 60000);
    clock.innerHTML = '<span class="sim-c">⏱ <b>' + fmt(left) + '</b> · ' + esc(title(unit)) + '</span><button type="button" data-s="' + (x.run ? 'pause' : 'resume') + '">' + (x.run ? 'Pausa' : 'Seguir') + '</button><button type="button" data-s="done" class="go">Entregar</button>';
    if (left <= 0 && x.run) act(unit, 'late');
  }

  function setup(cfg){
    CFG = cfg || {}; CFG.exams = CFG.exams || {};
    root = typeof CFG.root === 'string' ? document.querySelector(CFG.root) : CFG.root;
    if (!root) return;
    root.querySelectorAll('section.unit').forEach(function(unit){
      unit.querySelectorAll('.ar').forEach(function(ar){
        if (!ar.querySelector('.sol') || !ar.querySelector(FIELDS)) return;
        var bar = document.createElement('div'); bar.className = 'kc-bar';
        bar.innerHTML = '<button type="button" class="kc-btn">✓ Egiaztatu · comprobar</button><span class="kc-sum" role="status" aria-live="polite"></span>';
        var sol = ar.querySelector('.sol'); sol.parentNode.insertBefore(bar, sol);
        bar.querySelector('.kc-btn').addEventListener('click', function(){ if (ar.classList.contains('kc-on')) clear(ar); else check(ar, unit); });
      });
      if (CFG.exams[unit.id]) {
        simBar(unit);
        unit.addEventListener('click', function(e){ var b = e.target.closest('.sim button[data-s]'); if (b) act(unit, b.getAttribute('data-s')); });
        unit.addEventListener('input', function(e){ if (e.target.matches('input.scoref') && e.target !== parts(unit).total) syncScore(unit); });
        // durante el simulacro no se abren las soluciones
        unit.addEventListener('toggle', function(e){ if (unit.classList.contains('sim-on') && e.target.matches && e.target.matches('details.sol') && e.target.open) e.target.open = false; }, true);
      }
    });
    // una respuesta que se cambia pierde su marca
    root.addEventListener('input', function(e){
      var f = e.target; if (!f.matches || !f.matches(FIELDS)) return;
      f.classList.remove('kc-ok', 'kc-ko', 'kc-cmp'); f.removeAttribute('title');
      var nx = f.nextElementSibling; if (nx && nx.classList.contains('kc-sol')) nx.remove();
    });
    if (tick) clearInterval(tick);
    tick = setInterval(function(){
      var S = sload();
      Object.keys(CFG.exams).forEach(function(k){ var u = document.getElementById(k), x = S[k]; if (u && x && x.start && !x.done && x.run) simBar(u); });
      renderClock();
    }, 1000);
    injectCSS();
  }

  function injectCSS(){
    if (document.getElementById('kc-style')) return;
    var st = document.createElement('style'); st.id = 'kc-style';
    st.textContent = [
      '.kc-bar{display:flex;flex-wrap:wrap;gap:6px 12px;align-items:baseline;margin:12px 0 4px;font-family:var(--f-ui);font-size:13px}',
      '.kc-btn{font:inherit;font-weight:600;cursor:pointer;border:1px solid var(--sea);color:var(--sea);background:var(--surface);border-radius:4px;padding:5px 11px}',
      '.kc-btn:hover{background:var(--sea-soft)}',
      '.kc-sum{color:var(--ink-2)}.kc-sum .ok{color:var(--sea)}.kc-sum .ko{color:var(--crit)}',
      '.kc-note{display:block;color:var(--muted);font-size:12px;margin-top:2px}',
      'input.gapf.kc-ok,textarea.ansf.kc-ok{border-color:var(--sea)!important;background:var(--sea-soft)!important}',
      'input.gapf.kc-ko{border-color:var(--crit)!important;background:var(--iron-soft)!important}',
      'input.gapf.kc-cmp,textarea.ansf.kc-cmp{border-color:var(--gold)!important}',
      '.kc-sol{font-family:var(--f-ui);font-size:12.5px;font-weight:600;color:var(--sea);margin:0 4px 0 2px;white-space:nowrap}',
      '.kc-model{font-family:var(--f-ui);font-size:13px;color:var(--ink-2);background:var(--gold-soft);border-left:3px solid var(--gold);border-radius:3px;padding:4px 9px;margin:4px 0 2px}',
      '.kc-model span{font-weight:600;color:var(--gold)}',
      '.sim{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin:14px 0 6px;padding:12px 14px;border:1px solid var(--line-strong);border-left:3px solid var(--iron);border-radius:4px;background:var(--surface);font-family:var(--f-ui);font-size:13.5px}',
      '.sim .sim-ok{color:var(--sea)!important}.sim .sim-ko{color:var(--crit)!important}',
      '.sim .sim-t{display:flex;flex-direction:column;gap:1px;flex:1 1 240px}.sim .sim-t b{font-size:15px}.sim .sim-t span{color:var(--muted)}.sim .sim-t span b{font-size:inherit;color:var(--ink)}',
      '.sim button,.sim-clock button{font:inherit;font-weight:600;cursor:pointer;border:1px solid var(--line-strong);border-radius:4px;background:var(--surface);color:var(--ink);padding:6px 12px}',
      '.sim button.go,.sim-clock button.go{background:var(--iron);border-color:var(--iron);color:#fff}',
      'section.unit.sim-on details.sol,section.unit.sim-on .kc-bar{display:none!important}',
      '.sim-clock{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:120;display:flex;align-items:center;gap:8px;flex-wrap:wrap;max-width:calc(100vw - 32px);padding:8px 10px 8px 14px;border-radius:8px;background:var(--ink);color:var(--surface);font-family:var(--f-ui);font-size:13px;box-shadow:0 6px 24px rgba(0,0,0,.3);cursor:pointer}',
      '.sim-clock[hidden]{display:none}.sim-clock .sim-c b{font-family:var(--f-mono);font-size:15px}.sim-clock.low{background:var(--crit)}',
      '.sim-clock button{padding:4px 10px;font-size:12.5px}',
      '@media print{.kc-bar,.sim,.sim-clock{display:none!important}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  window.KOADERNOA_CHECK = { setup: setup, check: function(ar){ return check(ar, ar.closest('section.unit')); }, clear: clear };
})();
