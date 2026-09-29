/* ══ Armairua · Libreta del A1 ══════════════════════════════════════════
   Qué entra en la libreta del A1 y de dónde sale. El núcleo (panel, PDF,
   marcas de «nuevo») está en armairua-libreta.js; aquí solo se leen los
   módulos de a1.html por sus APIs (PLANA, MEMORIA, ERREPASOA, HIZTEGIA,
   JOKOA) y el progreso guardado. Para otro nivel: copia este fichero,
   cambia maila/key y quédate con los apartados que tenga ese nivel.
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  if (!window.LIBRETA) return;
  function read(k){ try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } }

  /* ── cifras comunes (portada y apartados) ── */
  function plan(){
    var P = (window.PLANA && PLANA.P) || window.A1_PLAN, st = read('euskara-28-v1') || {};
    var done = st.done || {}, r = { P: P, st: st, tasks: 0, tDone: 0, full: 0 };
    if (!P) return r;
    P.days.forEach(function(d, i){
      var c = 0; d.tasks.forEach(function(t, j){ r.tasks++; if (done[i + '-' + j]) { c++; r.tDone++; } });
      if (c && c === d.tasks.length) r.full++;
    });
    return r;
  }
  function gram(){
    var M = window.MEMORIA, E = window.ERREPASOA, N = M ? M.todayN() : 1;
    var mem = M ? M.unlocked(N) : [], rev = E ? E.sessionItems() : [];
    return { N: N, mem: mem, rev: rev, known: mem.filter(function(it){ return M.isKnown(it._id); }).length + rev.filter(function(it){ return it.known; }).length, total: mem.length + rev.length };
  }
  function words(){ return (window.HIZTEGIA && HIZTEGIA.worked) ? HIZTEGIA.worked() : []; }
  function mz(){
    var D = window.A1_MINTZAMENA, st = read('mintzamena-a1-v1') || {}, done = st.done || {}, all = [];
    if (D) D.b.forEach(function(b){ b.s.forEach(function(s){ all.push({ b: b, s: s, t: done[s.id] }); }); });
    return { all: all, done: all.filter(function(x){ return x.t; }) };
  }
  function koadCount(){
    var root = document.getElementById('app-koadernoa'), n = 0, tot = 0;
    if (root) root.querySelectorAll('section.unit .ar').forEach(function(ar){
      tot++;
      if (Array.prototype.some.call(ar.querySelectorAll('input.gapf, textarea.ansf, input.scoref'), function(f){ return (f.value || '').trim(); })) n++;
    });
    return { n: n, tot: tot };
  }
  function games(){ return (window.JOKOA && JOKOA.stats) ? JOKOA.stats() : null; }

  var LV = ['Erraza', 'Ertaina', 'Zaila'];
  var GAMES = [
    ['entzun', '🎧 Entzun', 'escuchar y elegir', 'lvEntzun'], ['lotu', '🔗 Lotu', 'emparejar', null], ['osatu', '✍️ Osatu', 'rellenar', 'lvOsatu'],
    ['zein', '❓ Zein da?', 'elegir la traducción', 'lvZein'], ['ordena', '🔀 Ordenatu', 'ordenar la frase', 'lvOrdena'],
    ['egia', '⚖️ Egia ala gezurra', 'verdadero o falso', 'lvEgia'], ['sailkatu', '🗂️ Sailkatu', 'clasificar', 'lvSailka']
  ];

  LIBRETA.setup({
    maila: 'A1',
    key: 'euskara-libreta-a1',
    stats: function(){
      var p = plan(), g = gram(), w = words(), k = koadCount(), m = mz(), j = games();
      return [
        { v: p.full + ' / ' + (p.P ? p.P.days.length : 28), l: 'días del plan completos' },
        { v: p.tDone + ' / ' + p.tasks, l: 'tareas hechas' },
        { v: k.n + ' / ' + k.tot, l: 'ejercicios del cuaderno' },
        { v: w.length + ' (' + w.filter(function(x){ return x.b >= 5; }).length + ')', l: 'palabras trabajadas (dominadas)' },
        { v: g.known + ' / ' + g.total, l: 'gramática desbloqueada que dominas' },
        { v: m.done.length + ' / ' + m.all.length, l: 'conversaciones de Mintzamena' }
      ].concat(j ? [{ v: j.xp + ' XP', l: 'maila: ' + j.maila }, { v: j.streak + ' / ' + j.best, l: 'racha de días (actual / mejor)' }] : []);
    },
    sections: [

      { id: 'plana', icon: '📅', eu: 'Egutegia · plana', title: 'Plan de 28 días',
        build: function(h){
          var p = plan(), P = p.P, st = p.st, done = st.done || {}, out = [];
          if (!P) return {};
          P.days.forEach(function(d, i){
            var c = d.tasks.filter(function(t, j){ return done[i + '-' + j]; }).length;
            if (!c) return;
            out.push('<div class="lb-card"><div><b>Eguna ' + d.n + ' · ' + h.esc(d.t) + '</b> <span class="lb-note">' + h.esc(d.f) + ' · ' + h.esc(d.dowfull) + ' ' + d.dm + '/' + d.mon + ' · ' + c + '/' + d.tasks.length + '</span>' + h.mark('d' + d.n, c) + '</div><ul class="lb-tasks">'
              + d.tasks.map(function(t, j){ var ok = done[i + '-' + j]; return '<li' + (ok ? '' : ' class="pend"') + '><span class="' + (ok ? 'ok' : 'no') + '">' + (ok ? '✓' : '○') + '</span> ' + h.esc(t.x) + ' <span class="lb-note">· ' + t.m + ' min</span></li>'; }).join('') + '</ul></div>');
          });
          var retos = (P.retos || []).map(function(r){ var ok = st.retos && st.retos[r.id]; return '<tr><td class="' + (ok ? 'ok' : 'no') + '">' + (ok ? '✓' : '○') + '</td><td class="lb-nw">Eguna ' + r.d + '</td><td><b>' + h.esc(r.t) + '</b>' + (ok ? h.mark('r' + r.id) : '') + '<br><span class="lb-note">' + h.esc(r.x) + '</span></td></tr>'; });
          var pr = (P.pruebas || []).map(function(r){ var v = st.scores && st.scores[r.id]; return '<tr><td class="lb-nw">Eguna ' + r.d + '</td><td><b>' + h.esc(r.t) + '</b><br><span class="lb-note">' + h.esc(r.x) + '</span></td><td><b>' + (v != null && v !== '' ? h.esc(v) + h.mark('p' + r.id, h.hash(v)) : '—') + '</b></td></tr>'; });
          return {
            n: p.tDone + ' / ' + p.tasks + ' tareas · ' + p.full + (p.full === 1 ? ' día completo' : ' días completos'),
            html: (out.length ? out.join('') : '<p class="lb-empty">Aún no has marcado tareas del plan.</p>')
              + '<h3>Erronkak · retos</h3><table><tbody>' + retos.join('') + '</tbody></table>'
              + '<h3>Probak · pruebas</h3><table><thead><tr><th>Día</th><th>Prueba</th><th>Nota</th></tr></thead><tbody>' + pr.join('') + '</tbody></table>'
          };
        } },

      { id: 'gramatika', icon: '🧩', eu: 'Gramatika · desblokeatuta', title: 'Gramática desbloqueada',
        build: function(h){
          var g = gram(), M = window.MEMORIA;
          if (!g.total) return {};
          var mem = g.mem.map(function(it){
            var k = M.isKnown(it._id);
            return '<div class="lb-card"><b>' + h.esc(it.tit) + '</b>' + (k ? ' <span class="ok">✓ badakit</span>' : '') + h.mark(it._id, k ? 1 : 0)
              + ' <span class="lb-note">· eguna ' + it.d + '</span><div class="lb-note" style="margin:0">' + h.esc(it.note) + '</div><div class="say">' + it.say + '</div></div>';
          });
          var cats = {};
          g.rev.forEach(function(it){ (cats[it.cat] = cats[it.cat] || []).push(it); });
          var rev = Object.keys(cats).map(function(c){
            return '<h4 style="margin-top:8px">' + h.esc(c) + '</h4><table><tbody>' + cats[c].map(function(it){
              return '<tr><td class="' + (it.known ? 'ok' : 'no') + '" style="width:14px">' + (it.known ? '✓' : '○') + '</td><td><b>' + it.q + '</b>' + h.mark(it.id, it.known ? 1 : 0) + '</td><td>' + it.a + '</td></tr>';
            }).join('') + '</tbody></table>';
          });
          return {
            n: g.known + ' / ' + g.total + ' dominados · hasta el día ' + g.N,
            html: '<p class="lb-note">Lo que el plan ha desbloqueado hasta el día ' + g.N + '. ✓ = lo has marcado como sabido.</p>'
              + '<h3>Memoria gramatikala · recitados</h3>' + mem.join('')
              + (rev.length ? '<h3>Errepasoa · repaso acumulado</h3>' + rev.join('') : '')
          };
        } },

      { id: 'koadernoa', icon: '✏️', eu: 'Koadernoa · ariketak', title: 'Cuaderno de ejercicios',
        build: LIBRETA.koadernoa(document.getElementById('app-koadernoa')) },

      { id: 'hiztegia', icon: '🗃️', eu: 'Hiztegia · hitzen kutxa', title: 'Vocabulario trabajado',
        build: function(h){
          var w = words();
          if (!w.length) return {};
          var line = function(x){ return '<div><b>' + h.esc(x.eu) + '</b><i>' + h.esc(x.es) + '</i>' + h.dots(x.b) + h.mark('w' + x.i) + '</div>'; };
          var hard = w.filter(function(x){ return x.lp >= 2; }), byT = {}, order = [];
          w.forEach(function(x){ if (!byT[x.t]) { byT[x.t] = []; order.push(x.t); } byT[x.t].push(x); });
          order.sort(function(a, b){ return a - b; });
          return {
            n: w.length + ' palabras · ' + w.filter(function(x){ return x.b >= 5; }).length + ' dominadas',
            html: '<p class="lb-note">Madurez de 1 a 5 (●): sube con cada repaso acertado y el intervalo entre repasos se alarga.</p>'
              + (hard.length ? '<h3>Zailak · las que más te cuestan</h3><div class="lb-cols">' + hard.map(line).join('') + '</div>' : '')
              + order.map(function(t){ return '<h3>' + h.esc(byT[t][0].tema) + ' <span class="lb-note">· ' + byT[t].length + '</span></h3><div class="lb-cols">' + byT[t].map(line).join('') + '</div>'; }).join('')
          };
        } },

      { id: 'mintzamena', icon: '🗣️', eu: 'Mintzamena · hizketa-ereduak', title: 'Conversaciones trabajadas',
        build: function(h){
          var m = mz(), D = window.A1_MINTZAMENA;
          if (!m.done.length) return { n: '0 / ' + m.all.length };
          var byB = {};
          m.done.forEach(function(x){ (byB[x.b.id] = byB[x.b.id] || { b: x.b, l: [] }).l.push(x); });
          return {
            n: m.done.length + ' / ' + m.all.length + ' situaciones',
            html: '<p class="lb-note">De «' + h.esc(D.es || 'Modelos de conversaciones') + '». La página es la del PDF original.</p>'
              + Object.keys(byB).map(function(k){ var g = byB[k];
                return '<h3>' + h.esc(g.b.eu) + ' <span class="lb-note">· ' + h.esc(g.b.es) + '</span></h3><table><tbody>' + g.l.map(function(x){
                  return '<tr><td style="width:28px" class="lb-note">' + h.esc(x.s.n) + '</td><td><b>' + h.esc(x.s.eu) + '</b>' + h.mark(x.s.id) + '<br><span class="lb-note">' + h.esc(x.s.es) + '</span></td><td class="lb-note">p. ' + h.esc(x.s.p) + '</td><td class="lb-note" style="white-space:nowrap">' + (typeof x.t === 'number' && x.t > 1e11 ? h.date(x.t) : '') + '</td></tr>';
                }).join('') + '</tbody></table>'; }).join('')
          };
        } },

      { id: 'akatsak', icon: '🩹', eu: 'Nire akatsak', title: 'Errores pendientes de repaso',
        build: function(h){
          var A = window.AKATSAK ? AKATSAK.data() : { j: {}, k: {} }, hard = words().filter(function(w){ return w.lp >= 2; });
          var jk = Object.keys(A.j), kk = Object.keys(A.k);
          if (!hard.length && !jk.length && !kk.length) return { n: '0' };
          return {
            n: (hard.length + jk.length + kk.length) + ' por repasar',
            html: '<p class="lb-note">Lo que se te resiste en este momento. Al acertarlo sale de la lista, así que cada libreta enseña los errores que siguen vivos.</p>'
              + (hard.length ? '<h3>Palabras difíciles</h3><div class="lb-cols">' + hard.map(function(x){ return '<div><b>' + h.esc(x.eu) + '</b><i>' + h.esc(x.es) + '</i><span class="lb-note">×' + x.lp + '</span>' + h.mark('w' + x.i) + '</div>'; }).join('') + '</div>' : '')
              + (jk.length ? '<h3>Frases falladas en los juegos</h3><table><tbody>' + jk.map(function(eu){ var e = A.j[eu]; return '<tr><td><b>' + h.esc(eu) + '</b>' + h.mark('j:' + h.hash(eu)) + '</td><td>' + h.esc(e.es) + '</td><td class="lb-note lb-nw">×' + e.n + '</td></tr>'; }).join('') + '</tbody></table>' : '')
              + (kk.length ? '<h3>Huecos del cuaderno</h3><table><tbody>' + kk.map(function(k){ var g = A.k[k]; return '<tr><td class="lb-nw">' + h.esc(g.x) + '</td><td>' + h.esc(g.q) + h.mark('k:' + k) + '</td><td><s>' + h.esc(g.you) + '</s> → <b>' + h.esc(g.sol) + '</b></td></tr>'; }).join('') + '</tbody></table>' : '')
          };
        } },

      { id: 'jokoa', icon: '🎮', eu: 'Jokoa · jolasak', title: 'Juegos y oraciones resueltas',
        build: function(h){
          var j = games();
          if (!j) return {};
          var rows = GAMES.map(function(g){
            var lv = g[0] === 'lotu' ? 'N' + (j.lotuLv + 1) : (g[3] ? LV[j.lv[g[3]] || 0] : '—');
            return '<tr><td><b>' + g[1] + '</b> <span class="lb-note">' + g[2] + '</span></td><td>' + lv + '</td><td><b>' + (j.n[g[0]] || 0) + '</b> aciertos' + h.mark('g' + g[0], j.n[g[0]] || 0) + '</td></tr>';
          });
          var names = {}; GAMES.forEach(function(g){ names[g[0]] = g[1]; });
          var logs = Object.keys(j.log || {}).filter(function(k){ return Object.keys(j.log[k]).length; }).map(function(k){
            var L = j.log[k], ks = Object.keys(L).sort(function(a, b){ return L[a][1] - L[b][1]; });
            return '<h4 style="margin-top:8px">' + (names[k] || h.esc(k)) + ' <span class="lb-note">· ' + ks.length + '</span></h4><table><tbody>' + ks.map(function(eu){
              return '<tr><td><b>' + h.esc(eu) + '</b>' + h.mark(k + ':' + h.hash(eu)) + '</td><td>' + h.esc(L[eu][0]) + '</td><td class="lb-note" style="white-space:nowrap">' + h.date(L[eu][1]) + '</td></tr>';
            }).join('') + '</tbody></table>';
          });
          return {
            n: j.xp + ' XP · ' + j.maila,
            html: '<p class="lb-note">Maila <b>' + h.esc(j.maila) + '</b> · ' + j.xp + ' XP · racha de ' + j.streak + (j.streak === 1 ? ' día' : ' días') + ' (mejor: ' + j.best + ')' + (j.etot ? ' · acierto en Entzun: ' + Math.round(100 * j.eok / j.etot) + ' %' : '') + '</p>'
              + '<table><thead><tr><th>Juego</th><th>Nivel elegido</th><th>Resultado</th></tr></thead><tbody>' + rows.join('') + '</tbody></table>'
              + '<h3>Esaldi ebatziak · oraciones resueltas</h3>'
              + (logs.length ? logs.join('') : '<p class="lb-empty">Aún no hay ninguna. Las oraciones se registran desde que existe la libreta; antes los juegos solo contaban aciertos.</p>')
          };
        } }
    ]
  });
})();
