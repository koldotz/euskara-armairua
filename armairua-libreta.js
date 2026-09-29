/* ══════════════════════════════════════════════════════════════════════
   Armairua · Libreta — todo lo trabajado en un nivel, en un PDF
   ----------------------------------------------------------------------
   Núcleo común a todos los niveles. Cada nivel lo configura con
   LIBRETA.setup({ maila, key, sections, stats }) y abre el panel con
   LIBRETA.open():
     · vista previa en pantalla, con casillas para elegir apartados;
     · «Guardar PDF» abre el diálogo de imprimir (destino «Guardar como
       PDF»): sin librerías, texto seleccionable, funciona sin conexión;
     · la libreta es siempre completa y marca «Berria» lo trabajado desde
       la última exportación. Como el diálogo no dice si se guardó o se
       canceló, al cerrarlo se pregunta, y solo con un «sí» se mueve la
       referencia de «nuevo desde…» (clave cfg.key, viaja con el perfil).
   Cada apartado es { id, icon, eu, title, build(h) → { html, n } }.
   El ayudante h trae esc(), date(), dots() y mark(id, huella): devuelve la
   etiqueta «Berria» si ese elemento es nuevo o ha cambiado desde la última
   exportación, y lo apunta para la siguiente.
   LIBRETA.koadernoa(raíz) construye el apartado de ejercicios de cualquier
   nivel con el cuaderno editable (section.unit > .ar, huecos .gapf,
   respuestas .ansf, puntuaciones .scoref y soluciones .sol).
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  if (window.LIBRETA) return;
  var CFG = null, prev = null, snap = {}, cur = '', nNew = {}, ov = null, lastSel = null;

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function hash(s){ s = String(s); var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
  var MON = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function fdate(t){ var d = new Date(t); return d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear(); }
  function iso(t){ var d = new Date(t); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function dots(b){ var s = ''; for (var i = 1; i <= 5; i++) s += i <= b ? '●' : '○'; return '<span class="lb-dots" title="madurez ' + b + '/5">' + s + '</span>'; }
  function loadBase(){ try { var b = JSON.parse(localStorage.getItem(CFG.key) || 'null'); return b && b.t ? b : null; } catch (e) { return null; } }
  function saveBase(b){ try { localStorage.setItem(CFG.key, JSON.stringify(b)); } catch (e) {} }
  function who(){ try { return (window.HUB && HUB.name && HUB.name()) || localStorage.getItem('euskara-izena') || ''; } catch (e) { return ''; } }

  /* «Berria» si el elemento no estaba (o era distinto) en la última exportación */
  function mark(id, h){
    var v = h == null ? 1 : h;
    (snap[cur] = snap[cur] || {})[id] = v;
    if (!prev) return '';
    var p = prev.ids && prev.ids[cur];
    if (p && p[id] === v) return '';
    nNew[cur] = (nNew[cur] || 0) + 1;
    return '<span class="lb-new">Berria</span>';
  }
  var H = { esc: esc, date: fdate, dots: dots, mark: mark, hash: hash };

  /* ── el documento ── */
  function build(sel){
    prev = loadBase(); snap = {}; nNew = {};
    var body = [], toc = [];
    CFG.sections.forEach(function(s){
      if (!sel[s.id]) return;
      cur = s.id;
      var r = {};
      try { r = s.build(H) || {}; } catch (e) { r = { html: '<p class="lb-empty">No se ha podido preparar este apartado (' + esc(e.message) + ').</p>' }; }
      toc.push({ s: s, n: r.n, nw: nNew[s.id] || 0 });
      body.push('<section class="lb-sec"><header class="lb-sh"><span class="lb-ic" aria-hidden="true">' + s.icon + '</span><div><div class="lb-eu">' + esc(s.eu) + '</div><h2>' + esc(s.title) + '</h2></div>'
        + (r.n ? '<span class="lb-cnt">' + esc(r.n) + '</span>' : '') + '</header>'
        + (r.html || '<p class="lb-empty">Todavía no hay nada trabajado en este apartado.</p>') + '</section>');
    });
    var now = Date.now(), name = who(), st = [];
    try { st = CFG.stats ? CFG.stats() : []; } catch (e) {}
    var cover = '<section class="lb-cover">'
      + '<div class="lb-brand">Euskara <em>armairua</em></div>'
      + '<div class="lb-eu">Nire libreta · ' + esc(CFG.maila) + ' maila</div>'
      + '<h1>Libreta de lo trabajado · ' + esc(CFG.maila) + '</h1>'
      + '<p class="lb-who">' + (name ? '<b>' + esc(name) + '</b> · ' : '') + fdate(now) + '</p>'
      + (st.length ? '<div class="lb-stats">' + st.map(function(x){ return '<div><b>' + esc(x.v) + '</b><span>' + esc(x.l) + '</span></div>'; }).join('') + '</div>' : '')
      + '<p class="lb-since">' + (prev ? 'Marcado <span class="lb-new">Berria</span>: lo trabajado desde la última exportación, el ' + fdate(prev.t) + '.' : 'Primera libreta: a partir de la próxima, lo nuevo irá marcado <span class="lb-new">Berria</span>.') + '</p>'
      + '<h3 class="lb-toch">Aurkibidea · índice</h3><ol class="lb-toc">' + toc.map(function(x){
          return '<li><span class="lb-ic" aria-hidden="true">' + x.s.icon + '</span><span><b>' + esc(x.s.title) + '</b> <i>' + esc(x.s.eu) + '</i></span><span class="lb-tn">' + esc(x.n || '—') + (x.nw ? ' · <span class="lb-new">' + x.nw + ' berri</span>' : '') + '</span></li>';
        }).join('') + '</ol></section>';
    return cover + body.join('');
  }

  /* ── panel: vista previa + imprimir ── */
  function ensure(){
    if (ov) return;
    var st = document.createElement('style'); st.id = 'lb-style'; st.textContent = CSS; document.head.appendChild(st);
    ov = document.createElement('div'); ov.id = 'lbOv'; ov.className = 'lb-ov'; ov.hidden = true;
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Libreta');
    ov.innerHTML = '<div class="lb-bar"><div class="lb-bt"><b>📓 Libreta · ' + esc(CFG.maila) + '</b><span>Elige qué apartados entran y guárdala como PDF</span></div>'
      + '<div class="lb-chips"></div>'
      + '<div class="lb-act"><button type="button" class="lb-go">⬇ Gorde PDF · guardar</button><button type="button" class="lb-x" aria-label="Cerrar la libreta">✕</button></div></div>'
      + '<div class="lb-ask" hidden><span>¿Se ha guardado el PDF? Si dices que sí, en la próxima libreta se marcará como nuevo solo lo que trabajes desde hoy.</span><button type="button" class="lb-yes">Bai, gorde da</button><button type="button" class="lb-no">Ez</button></div>'
      + '<div class="lb-paper"><article id="lbDoc"></article></div>';
    document.body.appendChild(ov);
    ov.querySelector('.lb-chips').innerHTML = CFG.sections.map(function(s){
      return '<label class="lb-chip"><input type="checkbox" data-s="' + s.id + '" checked><span>' + s.icon + ' ' + esc(s.title) + '</span></label>';
    }).join('');
    ov.querySelector('.lb-chips').addEventListener('change', render);
    ov.querySelector('.lb-x').addEventListener('click', close);
    ov.querySelector('.lb-go').addEventListener('click', print);
    ov.querySelector('.lb-yes').addEventListener('click', function(){ commit(); ov.querySelector('.lb-ask').hidden = true; render(); });
    ov.querySelector('.lb-no').addEventListener('click', function(){ ov.querySelector('.lb-ask').hidden = true; });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && ov && !ov.hidden) close(); });
  }
  function selected(){ var s = {}; ov.querySelectorAll('.lb-chips input').forEach(function(c){ s[c.getAttribute('data-s')] = c.checked; }); return s; }
  function render(){ lastSel = selected(); ov.querySelector('#lbDoc').innerHTML = build(lastSel); }
  function open(){
    if (!CFG) return;
    ensure(); ov.hidden = false; ov.querySelector('.lb-ask').hidden = true;
    document.body.classList.add('lb-open');
    render(); ov.scrollTop = 0;
    try { ov.querySelector('.lb-go').focus({ preventScroll: true }); } catch (e) {}
  }
  function close(){ if (!ov) return; ov.hidden = true; document.body.classList.remove('lb-open'); }
  var title0 = '';
  function print(){
    render();
    title0 = document.title;
    var n = who();
    document.title = 'Libreta ' + CFG.maila + (n ? ' · ' + n : '') + ' · ' + iso(Date.now());   // nombre de archivo sugerido
    document.body.classList.add('lb-printing');
    var done = false;
    function after(){
      if (done) return; done = true;
      document.body.classList.remove('lb-printing'); document.title = title0;
      window.removeEventListener('afterprint', after);
      ov.querySelector('.lb-ask').hidden = false;
    }
    window.addEventListener('afterprint', after);
    window.print();
    setTimeout(after, 800);      // navegadores donde print() no espera o no avisa
  }
  /* guarda la referencia de «nuevo desde…» (solo los apartados incluidos) */
  function commit(){
    var b = prev || { ids: {} }, ids = b.ids || {};
    Object.keys(lastSel || {}).forEach(function(k){ if (lastSel[k]) ids[k] = snap[k] || {}; });
    saveBase({ t: Date.now(), ids: ids });
  }

  /* ── apartado genérico: el cuaderno de ejercicios ── */
  function koadernoa(root, opts){
    opts = opts || {};
    var FIELDS = 'input.gapf, textarea.ansf, input.scoref';
    function filled(clone, src){
      var a = src.querySelectorAll(FIELDS), b = clone.querySelectorAll(FIELDS);
      Array.prototype.forEach.call(b, function(el, i){
        var v = ((a[i] && a[i].value) || '').trim(), area = el.tagName === 'TEXTAREA';
        var sp = document.createElement(area ? 'div' : 'span');
        sp.className = (area ? 'lb-area' : 'lb-ans') + (v ? '' : ' empty');
        sp.textContent = v || (area ? '—' : '…');
        el.parentNode.replaceChild(sp, el);
      });
      clone.querySelectorAll('[id]').forEach(function(e){ e.removeAttribute('id'); });
      return clone;
    }
    return function(h){
      var out = [], done = 0, total = 0;
      if (!root) return { html: '', n: '' };
      Array.prototype.forEach.call(root.querySelectorAll('section.unit'), function(sec){
        var uh = sec.querySelector('.uhead'), items = [];
        Array.prototype.forEach.call(sec.querySelectorAll('.ar'), function(ar, k){
          total++;
          var vals = Array.prototype.map.call(ar.querySelectorAll(FIELDS), function(f){ return (f.value || '').trim(); });
          if (!vals.some(Boolean)) return;
          done++;
          var badge = h.mark(sec.id + ':' + k, h.hash(vals.join('\u0001')));
          var hd = ar.querySelector('.h'), num = hd && hd.querySelector('.k'), tit = hd && hd.querySelector('h3');
          var bsrc = ar.querySelector('.b') || ar, b = filled(bsrc.cloneNode(true), bsrc);
          Array.prototype.forEach.call(b.querySelectorAll('details'), function(d){ d.open = true; });
          var solHtml = '', sol = ar.querySelector('.sol .in');
          if (sol) {
            var sl = sol.querySelectorAll(':scope > ol > li'), il = b.querySelectorAll('ol.items > li');
            if (sl.length && sl.length === il.length) {
              // una solución por pregunta: al lado de cada respuesta
              Array.prototype.forEach.call(il, function(li, i){ var s = document.createElement('span'); s.className = 'lb-sol'; s.innerHTML = '→ ' + sl[i].innerHTML; li.appendChild(s); });
              var rest = sol.cloneNode(true); rest.querySelectorAll(':scope > ol').forEach(function(o){ o.remove(); });
              if (rest.textContent.trim()) solHtml = '<div class="lb-solnote">' + rest.innerHTML + '</div>';
            } else solHtml = '<div class="lb-solbox"><div class="lb-solt">Erantzunak · soluciones</div>' + sol.innerHTML + '</div>';
          }
          items.push('<div class="lb-ar"><div class="lb-arh">' + (num ? '<span class="lb-k">' + h.esc(num.textContent) + '</span>' : '')
            + '<h4>' + h.esc(tit ? tit.textContent : '') + '</h4>' + badge + '</div>' + b.innerHTML + solHtml + '</div>');
        });
        var scores = Array.prototype.map.call(sec.querySelectorAll('.score'), function(sc){ return filled(sc.cloneNode(true), sc).textContent.trim(); }).filter(function(t){ return /\d/.test(t.split('/')[0]); });
        if (!items.length && !scores.length) return;
        out.push('<h3 class="lb-unit"><span class="lb-un">' + h.esc(uh && uh.querySelector('.n') ? uh.querySelector('.n').textContent : '') + '</span>'
          + h.esc(uh && uh.querySelector('h2') ? uh.querySelector('h2').textContent : sec.id) + '</h3>'
          + items.join('') + scores.map(function(t){ return '<p class="lb-score">' + h.esc(t) + '</p>'; }).join(''));
      });
      return { html: out.join(''), n: done + ' / ' + total + ' ejercicios' };
    };
  }

  var CSS = [
    'body.lb-open{overflow:hidden}',
    '.lb-ov{position:fixed;inset:0;z-index:9000;overflow:auto;background:#5b615a;color-scheme:light}',
    '.lb-ov[hidden]{display:none}',
    '.lb-bar{position:sticky;top:0;z-index:2;display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;padding:10px 18px;background:#1b1f1b;color:#e8ebe4;font-family:var(--f-ui,system-ui,sans-serif);font-size:13px;box-shadow:0 2px 10px rgba(0,0,0,.3)}',
    '.lb-bt{display:flex;flex-direction:column;line-height:1.3}.lb-bt b{font-size:15px}.lb-bt span{color:#a9b0a6;font-size:12px}',
    '.lb-chips{display:flex;flex-wrap:wrap;gap:6px;flex:1 1 320px}',
    '.lb-chip{display:flex;align-items:center;gap:5px;cursor:pointer;border:1px solid #414840;border-radius:999px;padding:3px 10px 3px 7px;background:#242924;white-space:nowrap}',
    '.lb-chip input{margin:0;accent-color:#63c0a0}',
    '.lb-act{display:flex;gap:8px;margin-left:auto}',
    '.lb-go{font:inherit;font-weight:600;cursor:pointer;border:0;border-radius:6px;padding:8px 14px;background:#63c0a0;color:#131613}',
    '.lb-x{font:inherit;font-size:15px;cursor:pointer;border:1px solid #414840;border-radius:6px;padding:6px 10px;background:none;color:#e8ebe4}',
    '.lb-ask{position:sticky;top:58px;z-index:2;display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:12px auto 0;max-width:210mm;padding:10px 14px;border-radius:6px;background:#f0e6cc;color:#3e3000;font-family:var(--f-ui,system-ui,sans-serif);font-size:13.5px}',
    '.lb-ask[hidden]{display:none}.lb-ask span{flex:1 1 280px}',
    '.lb-ask button{font:inherit;font-weight:600;cursor:pointer;border:1px solid #8a6a19;border-radius:5px;padding:5px 11px;background:#fff;color:#3e3000}.lb-ask .lb-yes{background:#8a6a19;color:#fff}',
    '.lb-paper{max-width:210mm;margin:18px auto 60px;padding:16mm 15mm;background:#fff;box-shadow:0 6px 30px rgba(0,0,0,.35)}',
    '@media (max-width:600px){.lb-bar{padding:10px 12px;gap:8px 10px}.lb-bt span{display:none}.lb-chips{flex:1 0 100%;order:3;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;padding-bottom:2px}.lb-chips::-webkit-scrollbar{display:none}.lb-paper{margin:10px 0 40px;padding:18px 14px}.lb-ask{top:auto;margin:10px 8px 0}}',
    /* el documento: siempre claro, con la paleta de la web */
    '#lbDoc{--i:#171b18;--m:#6e756c;--l:#d2d6cc;--s:#1f5e4c;--ss:#dce9e2;--r:#b0472b;--rs:#f3ded6;--g:#8a6a19;--gs:#f0e6cc;color:var(--i);background:#fff;font-family:var(--f-body,Georgia,serif);font-size:10.5pt;line-height:1.5;page:libreta}',
    '#lbDoc h1,#lbDoc h2,#lbDoc h3,#lbDoc h4{font-family:var(--f-display,Georgia,serif);font-weight:600;line-height:1.2;margin:0;color:var(--i)}',
    '#lbDoc .lb-eu{font-family:var(--f-mono,monospace);font-size:8pt;letter-spacing:.14em;text-transform:uppercase;color:var(--m)}',
    '#lbDoc .lb-cover{break-after:page}',
    '#lbDoc .lb-brand{font-family:var(--f-display,Georgia,serif);font-weight:700;font-size:13pt;margin-bottom:26mm}#lbDoc .lb-brand em{font-style:normal;color:var(--r)}',
    '#lbDoc .lb-cover h1{font-size:28pt;letter-spacing:-.01em;margin:4px 0 6px}',
    '#lbDoc .lb-who{font-family:var(--f-ui,sans-serif);font-size:11pt;color:var(--m);margin:0 0 10mm}#lbDoc .lb-who b{color:var(--i)}',
    '#lbDoc .lb-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:8mm}',
    '@media screen and (max-width:600px){#lbDoc .lb-stats{grid-template-columns:repeat(2,minmax(0,1fr))}#lbDoc .lb-brand{margin-bottom:12mm}#lbDoc .lb-cols{column-count:1}}',
    '#lbDoc .lb-stats div{border:1px solid var(--l);border-left:3px solid var(--s);border-radius:4px;padding:8px 10px}',
    '#lbDoc .lb-stats b{display:block;font-family:var(--f-display,Georgia,serif);font-size:16pt;line-height:1.1}',
    '#lbDoc .lb-stats span{font-family:var(--f-ui,sans-serif);font-size:8.5pt;color:var(--m)}',
    '#lbDoc .lb-since{font-family:var(--f-ui,sans-serif);font-size:9.5pt;color:var(--m);margin:0 0 8mm}',
    '#lbDoc .lb-toch{font-size:13pt;margin-bottom:6px}',
    '#lbDoc .lb-toc{list-style:none;margin:0;padding:0;font-family:var(--f-ui,sans-serif);font-size:10pt}',
    '#lbDoc .lb-toc li{display:grid;grid-template-columns:22px 1fr auto;gap:8px;align-items:baseline;padding:6px 0;border-bottom:1px dotted var(--l)}',
    '#lbDoc .lb-toc i{color:var(--m);font-style:normal;font-size:8.5pt}#lbDoc .lb-tn{color:var(--m);font-size:9pt}',
    '#lbDoc .lb-new{display:inline-block;font-family:var(--f-mono,monospace);font-size:7pt;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#fff;background:var(--r);border-radius:2px;padding:0 4px;margin-left:6px;vertical-align:1px}',
    '#lbDoc .lb-sec{break-before:page}',
    '#lbDoc .lb-sh{display:flex;align-items:center;gap:10px;border-bottom:2px solid var(--i);padding-bottom:6px;margin-bottom:10px}',
    '#lbDoc .lb-sh .lb-ic{font-size:18pt}#lbDoc .lb-sh h2{font-size:17pt}#lbDoc .lb-cnt{margin-left:auto;font-family:var(--f-ui,sans-serif);font-size:9pt;color:var(--m)}',
    '#lbDoc h3{font-size:12.5pt;margin:14px 0 6px;break-after:avoid}#lbDoc h4{font-size:10.5pt}',
    '#lbDoc .lb-empty{font-family:var(--f-ui,sans-serif);color:var(--m);font-style:italic}',
    '#lbDoc .lb-note{font-family:var(--f-ui,sans-serif);font-size:9pt;color:var(--m);margin:4px 0 10px}',
    '#lbDoc table{width:100%;border-collapse:collapse;font-size:9.5pt;margin:4px 0 10px;break-inside:auto}',
    '#lbDoc th,#lbDoc td{text-align:left;padding:3px 6px;border-bottom:1px solid var(--l);vertical-align:top;white-space:normal;font-family:var(--f-body,Georgia,serif);font-size:9.5pt;background:none;position:static;color:var(--i)}',
    '#lbDoc th{font-family:var(--f-ui,sans-serif);font-size:8pt;letter-spacing:.06em;text-transform:uppercase;color:var(--m);font-weight:600}',
    '#lbDoc td .lb-note{font-size:8.5pt}',
    '#lbDoc .lb-nw{white-space:nowrap}',
    '#lbDoc tr{break-inside:avoid}',
    '#lbDoc .ok{color:var(--s);font-weight:600}#lbDoc .no{color:var(--m)}',
    '#lbDoc .lb-tasks{list-style:none;margin:3px 0 0;padding:0}#lbDoc .lb-tasks li{margin:1px 0;padding-left:16px;text-indent:-16px}#lbDoc .lb-tasks li.pend{color:var(--m)}',
    '#lbDoc .lb-dots{font-family:var(--f-mono,monospace);letter-spacing:1px;color:var(--s);white-space:nowrap}',
    '#lbDoc .lb-cols{column-count:2;column-gap:8mm;font-size:9.5pt}',
    '#lbDoc .lb-cols div{break-inside:avoid;padding:1px 0;border-bottom:1px dotted var(--l);display:flex;gap:6px;align-items:baseline}',
    '#lbDoc .lb-cols b{font-weight:600}#lbDoc .lb-cols i{color:var(--m);font-style:normal;flex:1}',
    '#lbDoc .lb-card{border:1px solid var(--l);border-radius:4px;padding:7px 10px;margin:0 0 7px;break-inside:avoid}',
    '#lbDoc .lb-card .say{font-family:var(--f-mono,monospace);font-size:9.5pt;margin-top:3px}',
    '#lbDoc .lb-unit{display:flex;gap:8px;align-items:baseline;border-bottom:1px solid var(--l);padding-bottom:3px}',
    '#lbDoc .lb-un{font-family:var(--f-mono,monospace);font-size:9pt;color:#fff;background:var(--s);border-radius:2px;padding:0 5px}',
    '#lbDoc .lb-ar{margin:8px 0 12px;padding-left:10px;border-left:2px solid var(--l);break-inside:avoid-page}',
    '#lbDoc .lb-arh{display:flex;gap:6px;align-items:baseline;margin-bottom:3px}#lbDoc .lb-k{font-family:var(--f-mono,monospace);font-size:9pt;color:var(--r)}',
    '#lbDoc .lb-ar p{margin:3px 0}#lbDoc .lb-ar ol,#lbDoc .lb-ar ul{margin:3px 0 3px 18px;padding:0}#lbDoc .lb-ar li{margin:2px 0}',
    '#lbDoc .lb-ar .instr{font-family:var(--f-ui,sans-serif);font-size:9pt;color:var(--m)}',
    '#lbDoc .lb-ans{font-family:var(--f-mono,monospace);font-size:9.5pt;color:var(--s);font-weight:600;border-bottom:1px solid var(--s);padding:0 3px}',
    '#lbDoc .lb-area{font-family:var(--f-mono,monospace);font-size:9.5pt;color:var(--s);white-space:pre-wrap;border-left:2px solid var(--ss);padding:1px 6px;margin:2px 0}',
    '#lbDoc .lb-ans.empty,#lbDoc .lb-area.empty{color:var(--m);font-weight:400;border-color:var(--l)}',
    '#lbDoc .lb-sol{font-family:var(--f-ui,sans-serif);font-size:8.5pt;color:var(--m);margin-left:8px}#lbDoc .lb-sol b{color:var(--g);font-weight:600}',
    '#lbDoc .lb-solbox,#lbDoc .lb-solnote{font-family:var(--f-ui,sans-serif);font-size:8.5pt;color:var(--m);background:#faf6ea;border-radius:3px;padding:5px 8px;margin-top:4px}',
    '#lbDoc .lb-solt{font-weight:600;color:var(--g);margin-bottom:2px}#lbDoc .lb-solbox b{color:var(--g)}',
    '#lbDoc .lb-score{font-family:var(--f-ui,sans-serif);font-weight:600;color:var(--r);margin:4px 0 10px}',
    '#lbDoc .txt,#lbDoc .gloss{font-size:9.5pt}',
    '#lbDoc summary{list-style:none;font-weight:600}',
    '@page libreta{size:A4;margin:15mm 14mm 16mm;@bottom-right{content:"Libreta · " counter(page) " / " counter(pages);font-family:sans-serif;font-size:8pt;color:#6e756c}}',
    '@media print{',
    '  body.lb-printing>*:not(#lbOv){display:none!important}',
    '  body.lb-printing{overflow:visible!important;background:#fff!important}',
    '  body.lb-printing .lb-ov{position:static;overflow:visible;background:#fff}',
    '  body.lb-printing .lb-bar,body.lb-printing .lb-ask{display:none!important}',
    '  body.lb-printing .lb-paper{max-width:none;margin:0;padding:0;box-shadow:none}',
    '  #lbDoc{print-color-adjust:exact;-webkit-print-color-adjust:exact}',
    '}'
  ].join('\n');

  window.LIBRETA = {
    setup: function(cfg){ CFG = cfg; },
    open: open,
    close: close,
    koadernoa: koadernoa,
    /* para las pruebas: el HTML del documento con los apartados indicados (todos por defecto) */
    _build: function(sel){ if (!sel) { sel = {}; CFG.sections.forEach(function(s){ sel[s.id] = true; }); } lastSel = sel; return build(sel); },
    _commit: function(){ commit(); }
  };
})();
