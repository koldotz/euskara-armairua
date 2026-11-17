/* ══════════════════════════════════════════════════════════════════════
   Armairua · Koadernoa — tu copia del libro, al lado de las hojas
   ----------------------------------------------------------------------
   SOLO EN LOCAL. Este fichero lo pide el cargador de a1.html únicamente
   cuando la app se abre desde tu ordenador (o tu red de casa); en la web
   publicada ni se carga. No contiene nada del libro: abre TU PDF y TUS
   audios, que están en pribatua/ (fuera del repositorio) porque los has
   enlazado ahí con  node tools/iturriak/liburua.mjs --escribir
   Esa herramienta escribe pribatua/<libro>/index.js:
     window.A1_LIBURUA = { arian: { izena, pdf, mapa: [[pdfDesde, pdfHasta, desfase], …], audioak: { pista: url },
                                    gehigarriak: [{ pdf, mapa }] } }
       mapa → página impresa = página del PDF + desfase (el escaneado no trae todas las páginas)
       gehigarriak → otros PDF tuyos con las páginas que al libro entero le faltan
   KOADERNOA_LIBURUA.setup({ root, liburuak: window.A1_LIBURUA })
     · la página de cada ejercicio de las hojas pasa a ser un botón que abre el PDF por ahí:
       en pantalla ancha, en un panel al lado de las casillas; en estrecha, en otra pestaña;
     · la pista de audio pasa a ser un botón que la reproduce.
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  if (window.KOADERNOA_LIBURUA) return;
  var root, L = {}, panel = null, bar = null, cur = null, WIDE = '(min-width:1100px)';

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function book(el){ var u = el.closest('section.unit'); return u ? L[u.getAttribute('data-src')] : null; }
  /* los PDF de un libro: el entero y, detrás, los sueltos */
  function files(b){ return (b.pdf ? [{ pdf: b.pdf, mapa: b.mapa || [] }] : []).concat(b.gehigarriak || []); }
  /* página impresa → { f: PDF, n: su página } (null si esa página no está en ninguna copia) */
  function locate(b, p){
    p = parseInt(p, 10);
    var fs = files(b);
    for (var j = 0; j < fs.length; j++) for (var i = 0; i < fs[j].mapa.length; i++){ var m = fs[j].mapa[i], n = p - m[2]; if (n >= m[0] && n <= m[1]) return { f: fs[j], n: n }; }
    return null;
  }
  function pdfPage(b, p){ var l = locate(b, p); return l ? l.n : null; }
  function printed(f, n){ for (var i = 0; i < f.mapa.length; i++){ var m = f.mapa[i]; if (n >= m[0] && n <= m[1]) return n + m[2]; } return null; }
  function tracks(s){               // «51» → [51] · «60–62» → [60, 61, 62]
    var m = String(s).match(/^(\d+)\s*[–-]\s*(\d+)$/), out = [], i;
    if (m) for (i = +m[1]; i <= +m[2]; i++) out.push(i); else String(s).split(/[,\s]+/).forEach(function(x){ if (/^\d+$/.test(x)) out.push(+x); });
    return out;
  }

  function css(){
    if (document.getElementById('lib-css')) return;
    var st = document.createElement('style'); st.id = 'lib-css';
    st.textContent = [
      ':root{--libw:clamp(380px,44vw,760px)}',
      '.lib-panel{position:fixed;right:0;top:var(--topbar,0px);bottom:0;width:var(--libw);z-index:40;display:flex;flex-direction:column;background:var(--surface);border-left:1px solid var(--line-strong);box-shadow:-8px 0 24px -18px rgba(0,0,0,.5)}',
      '.lib-panel[hidden]{display:none}',
      '.lib-h{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid var(--line);font-family:var(--f-ui);font-size:13px;color:var(--ink-2)}',
      '.lib-h b{font-weight:600;color:var(--ink)}.lib-h .sp{flex:1}',
      '.lib-h button{font:inherit;font-size:13px;line-height:1;cursor:pointer;border:1px solid var(--line-strong);border-radius:4px;background:transparent;color:var(--ink-2);padding:5px 9px}',
      '.lib-h button:hover{border-color:var(--sea);color:var(--sea)}.lib-h button:disabled{opacity:.4;cursor:default}',
      '.lib-b{flex:1;min-height:0;background:var(--surface-2)}.lib-b iframe{display:block;width:100%;height:100%;border:0}',
      '.lib-n{font-family:var(--f-ui);font-size:11.5px;color:var(--muted);padding:5px 12px;border-top:1px solid var(--line)}',
      '@media ' + WIDE + '{#app-koadernoa.lib-on .shell{padding-right:var(--libw)}}',
      '#app-koadernoa .ar .it-entzun.lib-ez{color:var(--muted);border-color:var(--line-strong);border-style:dashed}',
      'button.it-entzun{cursor:pointer;background:transparent;font:inherit;font-family:var(--f-mono);font-size:11px}button.it-entzun:hover,button.it-entzun.on{background:var(--sea-soft)}',
      '.lib-audio{position:fixed;left:12px;bottom:12px;z-index:41;display:flex;align-items:center;gap:8px;padding:6px 8px 6px 12px;background:var(--surface);border:1px solid var(--line-strong);border-radius:999px;box-shadow:0 6px 20px -10px rgba(0,0,0,.5);font-family:var(--f-mono);font-size:12px;color:var(--ink-2);max-width:calc(100vw - 24px)}',
      '.lib-audio[hidden]{display:none}.lib-audio audio{height:32px;max-width:min(320px,60vw)}',
      '@media (min-width:901px){.lib-audio{left:248px}}',                 /* al lado del índice, no encima */
      '.lib-audio button{font:inherit;cursor:pointer;border:0;background:transparent;color:var(--muted);padding:4px 6px}',
      '@media print{.lib-panel,.lib-audio{display:none!important}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  /* ── el panel con el PDF ── */
  function ensurePanel(){
    if (panel) return;
    panel = document.createElement('aside'); panel.className = 'lib-panel'; panel.hidden = true; panel.setAttribute('aria-label', 'Tu copia del libro');
    panel.innerHTML = '<div class="lib-h"><b class="lib-t"></b><span class="sp"></span>' +
      '<button type="button" data-a="prev" title="Página anterior" aria-label="Página anterior">‹</button><button type="button" data-a="next" title="Página siguiente" aria-label="Página siguiente">›</button>' +
      '<button type="button" data-a="tab" title="Abrir en otra pestaña">↗</button><button type="button" data-a="close" aria-label="Cerrar el libro">✕</button></div>' +
      '<div class="lib-b"></div><div class="lib-n">Tu copia del libro, desde tu ordenador. No sale de aquí ni se publica.</div>';
    document.body.appendChild(panel);
    panel.addEventListener('click', function(e){
      var b = e.target.closest('button[data-a]'); if (!b || !cur) return;
      var a = b.getAttribute('data-a');
      if (a === 'close') return close();
      if (a === 'tab') return window.open(url(cur.f, cur.n), 'armairua-liburua');
      show(cur.b, cur.f, cur.n + (a === 'next' ? 1 : -1));
    });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && panel && !panel.hidden && !document.body.classList.contains('lb-open')) close(); });
  }
  function url(f, n){ return f.pdf + '#page=' + n + '&view=FitH&navpanes=0'; }      // a lo ancho y sin el panel de miniaturas
  function show(b, f, n){
    var max = Math.max.apply(null, f.mapa.map(function(m){ return m[1]; }));
    n = Math.max(1, Math.min(max, n));
    cur = { b: b, f: f, n: n };
    var p = printed(f, n);
    panel.querySelector('.lib-t').textContent = (b.izena || 'Liburua') + (p ? ' · ' + p + '. or.' : '');
    /* un marco nuevo cada vez: el visor de PDF del navegador no siempre atiende a un cambio de #page */
    panel.querySelector('.lib-b').innerHTML = '<iframe title="' + esc((b.izena || 'Liburua') + (p ? ', ' + p + '. orrialdea' : '')) + '" src="' + esc(url(f, n)) + '"></iframe>';
    panel.querySelector('[data-a="prev"]').disabled = n <= 1; panel.querySelector('[data-a="next"]').disabled = n >= max;
    panel.hidden = false; root.classList.add('lib-on');
  }
  function close(){ if (!panel) return; panel.hidden = true; panel.querySelector('.lib-b').innerHTML = ''; root.classList.remove('lib-on'); cur = null; }
  function open(b, p){
    var l = locate(b, p); if (!l) return;
    if (!window.matchMedia || !window.matchMedia(WIDE).matches) { window.open(url(l.f, l.n), 'armairua-liburua'); return; }   // pantalla estrecha: en otra pestaña
    ensurePanel(); show(b, l.f, l.n);
  }

  /* ── el audio ── */
  function play(b, n, btn){
    if (!bar){
      bar = document.createElement('div'); bar.className = 'lib-audio'; bar.hidden = true;
      bar.innerHTML = '<span class="lib-at"></span><audio controls preload="none"></audio><button type="button" aria-label="Cerrar el audio">✕</button>';
      document.body.appendChild(bar);
      bar.querySelector('button').addEventListener('click', function(){ bar.querySelector('audio').pause(); bar.hidden = true; mark(null); });
    }
    var au = bar.querySelector('audio');
    bar.querySelector('.lib-at').textContent = '🎧 ' + n;
    au.src = b.audioak[n]; bar.hidden = false; mark(btn);
    var pr = au.play(); if (pr && pr.catch) pr.catch(function(){});
  }
  function mark(btn){ Array.prototype.forEach.call(root.querySelectorAll('button.it-entzun.on'), function(x){ x.classList.remove('on'); }); if (btn) btn.classList.add('on'); }

  function setup(o){
    root = typeof o.root === 'string' ? document.querySelector(o.root) : o.root;
    L = o.liburuak || {};
    if (!root || !Object.keys(L).length) return;
    css();
    Array.prototype.forEach.call(root.querySelectorAll('.ar-orria'), function(ar){
      var b = book(ar); if (!b) return;
      var sp = ar.querySelector('.or-orr');
      if (sp && locate(b, sp.getAttribute('data-p'))){
        var bt = document.createElement('button'); bt.type = 'button'; bt.className = 'or-orr'; bt.setAttribute('data-p', sp.getAttribute('data-p'));
        bt.textContent = '📖 ' + sp.textContent; bt.title = 'Abrir tu copia del libro por esta página';
        sp.parentNode.replaceChild(bt, sp);
      } else if (sp) sp.title = 'Esta página no está en tu copia del libro';
      var en = ar.querySelector('.it-entzun[data-au]');
      if (en && b.audioak){
        var ts = tracks(en.getAttribute('data-au'));
        if (ts.some(function(n){ return b.audioak[n]; })) en.outerHTML = ts.map(function(n){
          return b.audioak[n] ? '<button type="button" class="it-entzun" data-n="' + n + '" title="Escuchar la pista ' + n + '">▶ ' + n + '</button>'
                              : '<span class="it-entzun lib-ez" title="La pista ' + n + ' no está en tu carpeta de audios">🎧 ' + n + '</span>'; }).join(' ');
        else { en.classList.add('lib-ez'); en.title = 'Pista ' + en.getAttribute('data-au') + ': no está en tu carpeta de audios'; }
      }
    });
    root.addEventListener('click', function(e){
      var p = e.target.closest && e.target.closest('button.or-orr'); if (p){ var b = book(p); if (b) open(b, p.getAttribute('data-p')); return; }
      var a = e.target.closest && e.target.closest('button.it-entzun[data-n]'); if (a){ var b2 = book(a); if (b2) play(b2, a.getAttribute('data-n'), a); }
    });
    /* con el libro abierto, al pasar a otro ejercicio el panel va a su página */
    root.addEventListener('focusin', function(e){
      if (!cur || !panel || panel.hidden) return;
      var ar = e.target.closest && e.target.closest('.ar-orria'), b = ar && book(ar); if (!b) return;
      var l = locate(b, ar.getAttribute('data-p')); if (l && (l.f !== cur.f || l.n !== cur.n)) show(b, l.f, l.n);
    });
  }

  window.KOADERNOA_LIBURUA = { setup: setup, pdfPage: pdfPage, close: close };
})();
