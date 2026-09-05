/* ══════════════════════════════════════════════════════════════════════
   Armairua · Export / Copiar bloques
   ----------------------------------------------------------------------
   Añade a cada bloque exportable un botón "⧉ Copiar" con tres acciones:
     · 🖼️  Copiar como imagen  (PNG con colores, respeta claro/oscuro)
     · ⬇️  Descargar imagen    (mismo PNG como archivo, fallback)
     · 📋  Copiar como tabla / texto (HTML enriquecido + texto plano/TSV)

   Bloques marcados (empezamos por las tablas):
     · .card con <table>  → fichas de conjugación/declinación (gramatika)
     · .tw2               → tabla de vocabulario (a1 · hiztegia)
     · .ar                → ejercicios (a1/a2), SIN soluciones (.sol)

   Sin dependencias propias; html2canvas se carga bajo demanda desde CDN
   solo al usar una acción de imagen. Reutiliza los tokens de color de
   cada página (--surface, --line, --sea, --ink…), así el botón y los
   menús se ven bien en todas.
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  if (window.__ARMAIRUA_EXPORT__) return;
  window.__ARMAIRUA_EXPORT__ = 1;

  /* ── qué bloques son exportables ─────────────────────────────────────
     need : solo se engancha si contiene ese selector
     drop : selectores a excluir de imagen/formato (p. ej. soluciones)   */
  var TARGETS = [
    { sel:'.card', need:'table' },        // fichas de gramatika con tabla
    { sel:'.tw2' },                       // tabla de vocabulario (a1)
    { sel:'.ar',  drop:['.sol'] }         // ejercicios, sin soluciones
  ];

  /* ── html2canvas bajo demanda ───────────────────────────────────────── */
  var H2C_URL = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  var h2cPromise = null;
  function ensureH2C(){
    if (h2cPromise) return h2cPromise;
    h2cPromise = new Promise(function(res, rej){
      if (window.html2canvas) return res(window.html2canvas);
      var s = document.createElement('script');
      s.src = H2C_URL; s.async = true;
      s.onload = function(){ window.html2canvas ? res(window.html2canvas) : rej(new Error('h2c')); };
      s.onerror = function(){ h2cPromise = null; rej(new Error('h2c-load')); };
      document.head.appendChild(s);
    });
    return h2cPromise;
  }

  /* ── utilidades ──────────────────────────────────────────────────────── */
  function bgOf(node){
    var c = getComputedStyle(node).backgroundColor;
    if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c;
    var b = getComputedStyle(document.body).backgroundColor;
    return (b && b !== 'rgba(0, 0, 0, 0)' && b !== 'transparent') ? b : '#ffffff';
  }
  function titleOf(node){
    var h = node.querySelector('.eu, .h h3, h2, h3, summary');
    return h ? (h.innerText || h.textContent || '').trim() : '';
  }
  function fname(node){
    var t = titleOf(node) || 'euskara-armairua';
    t = t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
         .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,48);
    return t || 'euskara';
  }
  function rm(root, sel){
    var els = root.querySelectorAll(sel);
    for (var i=0;i<els.length;i++) if (els[i].parentNode) els[i].parentNode.removeChild(els[i]);
  }
  function ignore(el, drop){
    if (el.classList && el.classList.contains('xp-toolbar')) return true;
    if (drop) for (var i=0;i<drop.length;i++){ if (el.matches && el.matches(drop[i])) return true; }
    return false;
  }

  /* ── imagen (PNG) ─────────────────────────────────────────────────────── */
  function capture(node, drop){
    return ensureH2C().then(function(h2c){
      return h2c(node, {
        backgroundColor: bgOf(node),
        scale: 2,
        useCORS: true,
        logging: false,
        ignoreElements: function(el){ return ignore(el, drop); }
      });
    });
  }
  function downloadBlob(blob, node){
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = fname(node) + '.png';
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 1000);
  }
  function copyImage(node, drop, done){
    capture(node, drop).then(function(cv){
      cv.toBlob(function(blob){
        if (!blob) return done(false, 'No se pudo generar');
        if (navigator.clipboard && window.ClipboardItem){
          navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
            .then(function(){ done(true, 'Imagen copiada'); },
                  function(){ downloadBlob(blob, node); done(true, 'Imagen descargada'); });
        } else { downloadBlob(blob, node); done(true, 'Imagen descargada'); }
      }, 'image/png');
    })['catch'](function(){ done(false, 'No se pudo generar la imagen'); });
  }
  function downloadImage(node, drop, done){
    capture(node, drop).then(function(cv){
      cv.toBlob(function(blob){
        if (!blob) return done(false, 'No se pudo generar');
        downloadBlob(blob, node); done(true, 'Imagen descargada');
      }, 'image/png');
    })['catch'](function(){ done(false, 'No se pudo generar la imagen'); });
  }

  /* ── copiar con formato (text/html + text/plain) ─────────────────────── */
  var PROPS = ['color','background-color','font-family','font-size','font-weight',
    'font-style','text-align','vertical-align','padding-top','padding-right',
    'padding-bottom','padding-left','margin-top','margin-right','margin-bottom',
    'margin-left','border-top','border-right','border-bottom','border-left',
    'border-collapse','border-radius','line-height','letter-spacing',
    'text-transform','text-decoration','white-space','width'];
  function inlineWalk(o, c){
    var cs = getComputedStyle(o), s = '';
    for (var i=0;i<PROPS.length;i++){
      var p = PROPS[i], v = cs.getPropertyValue(p);
      if (v) s += p + ':' + v + ';';
    }
    c.setAttribute('style', s);
    var oc = o.children, cc = c.children, n = Math.min(oc.length, cc.length);
    for (var j=0;j<n;j++) inlineWalk(oc[j], cc[j]);
  }
  function tableTSV(table){
    var out = [], trs = table.querySelectorAll('tr');
    for (var i=0;i<trs.length;i++){
      var cells = trs[i].querySelectorAll('th,td'), r = [];
      for (var j=0;j<cells.length;j++) r.push((cells[j].innerText || cells[j].textContent || '').replace(/\s+/g,' ').trim());
      out.push(r.join('\t'));
    }
    return out.join('\n');
  }
  function textOffscreen(clone){
    clone.style.position = 'fixed'; clone.style.left = '-99999px'; clone.style.top = '0';
    document.body.appendChild(clone);
    var s = clone.innerText || clone.textContent || '';
    clone.remove();
    return s.replace(/\n{3,}/g,'\n\n').trim();
  }
  function plainOf(node, drop){
    var t = node.querySelector('table');
    if (t){
      var title = titleOf(node);
      return (title ? title + '\n' : '') + tableTSV(t);
    }
    var clone = node.cloneNode(true);
    rm(clone, '.xp-toolbar');
    if (drop) drop.forEach(function(sel){ rm(clone, sel); });
    return textOffscreen(clone);
  }
  function writeRich(html, text, done){
    if (navigator.clipboard && window.ClipboardItem){
      try {
        var item = new ClipboardItem({
          'text/html':  new Blob([html], { type:'text/html' }),
          'text/plain': new Blob([text], { type:'text/plain' })
        });
        navigator.clipboard.write([item]).then(
          function(){ done(true, 'Copiado con formato'); },
          function(){ fallbackRich(html, text, done); });
        return;
      } catch(e){ /* cae al fallback */ }
    }
    fallbackRich(html, text, done);
  }
  function fallbackRich(html, text, done){
    try {
      var d = document.createElement('div');
      d.contentEditable = 'true'; d.innerHTML = html;
      d.style.position = 'fixed'; d.style.left = '-99999px'; d.style.top = '0';
      document.body.appendChild(d);
      var range = document.createRange(); range.selectNodeContents(d);
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      var ok = document.execCommand('copy');
      sel.removeAllRanges(); d.remove();
      done(!!ok, ok ? 'Copiado con formato' : 'No se pudo copiar');
    } catch(e){ done(false, 'No se pudo copiar'); }
  }
  function copyFormatted(node, drop, done){
    var clone = node.cloneNode(true);
    inlineWalk(node, clone);              // estilos calculados → inline (antes de podar)
    rm(clone, '.xp-toolbar');
    if (drop) drop.forEach(function(sel){ rm(clone, sel); });
    writeRich(clone.outerHTML, plainOf(node, drop), done);
  }

  /* ── aviso emergente ──────────────────────────────────────────────────── */
  function toast(ok, msg){
    var t = document.createElement('div');
    t.className = 'xp-toast' + (ok ? '' : ' err');
    t.textContent = (ok ? '✓ ' : '✕ ') + msg;
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('show'); });
    setTimeout(function(){ t.classList.remove('show'); setTimeout(function(){ t.remove(); }, 250); }, 1900);
  }

  /* ── menú (portal a body, sin recortes por overflow) ─────────────────── */
  var curMenu = null;
  function closeMenu(){
    if (!curMenu) return;
    curMenu.remove(); curMenu = null;
    document.removeEventListener('click', closeMenu);
    document.removeEventListener('keydown', onEsc);
    window.removeEventListener('resize', closeMenu);
    window.removeEventListener('scroll', closeMenu, true);
  }
  function onEsc(e){ if (e.key === 'Escape') closeMenu(); }
  function openMenu(btn, node, cfg){
    closeMenu();
    var drop = cfg.drop || null;
    var m = document.createElement('div'); m.className = 'xp-menu';
    var actions = [
      ['🖼️', 'Copiar como imagen',        copyImage],
      ['⬇️', 'Descargar imagen',          downloadImage],
      ['📋', 'Copiar como tabla / texto', copyFormatted]
    ];
    actions.forEach(function(a){
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'xp-item';
      b.innerHTML = '<span class="xp-emo">' + a[0] + '</span>' + a[1];
      b.addEventListener('click', function(e){
        e.stopPropagation();
        b.disabled = true;
        b.innerHTML = '<span class="xp-emo">⏳</span>Procesando…';
        a[2](node, drop, function(ok, msg){ closeMenu(); toast(ok, msg); });
      });
      m.appendChild(b);
    });
    document.body.appendChild(m);
    var r = btn.getBoundingClientRect(), mw = m.offsetWidth, mh = m.offsetHeight;
    var left = Math.min(r.right - mw, window.innerWidth - mw - 8); if (left < 8) left = 8;
    var top = r.bottom + 6; if (top + mh > window.innerHeight - 8) top = r.top - mh - 6; if (top < 8) top = 8;
    m.style.left = left + 'px'; m.style.top = top + 'px';
    curMenu = m;
    setTimeout(function(){
      document.addEventListener('click', closeMenu);
      document.addEventListener('keydown', onEsc);
      window.addEventListener('resize', closeMenu);
      window.addEventListener('scroll', closeMenu, true);
    }, 0);
  }

  /* ── enganche por bloque ─────────────────────────────────────────────── */
  function attach(node, cfg){
    if (node.getAttribute('data-xp')) return;
    if (cfg.need && !node.querySelector(cfg.need)) return;
    node.setAttribute('data-xp', '1');
    if (getComputedStyle(node).position === 'static') node.style.position = 'relative';
    var bar = document.createElement('div'); bar.className = 'xp-toolbar';
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'xp-btn';
    btn.setAttribute('aria-label', 'Copiar o exportar este bloque');
    btn.innerHTML = '<span class="xp-ic" aria-hidden="true">⧉</span><span class="xp-lb">Copiar</span>';
    btn.addEventListener('click', function(e){ e.stopPropagation(); openMenu(btn, node, cfg); });
    bar.appendChild(btn); node.appendChild(bar);
  }

  /* ── escaneo + observador (gramatika re-renderiza en cada búsqueda) ──── */
  function scan(){
    TARGETS.forEach(function(cfg){
      var els = document.querySelectorAll(cfg.sel);
      for (var i=0;i<els.length;i++) attach(els[i], cfg);
    });
  }
  var obs = null, scheduled = false;
  function schedule(){
    if (scheduled) return; scheduled = true;
    requestAnimationFrame(function(){
      scheduled = false;
      if (obs) obs.disconnect();
      scan();
      if (obs) obs.observe(document.body, { childList:true, subtree:true });
    });
  }

  /* ── estilos (inyectados; reutilizan los tokens de cada página) ──────── */
  var CSS = [
    '[data-xp]{position:relative}',
    '.xp-toolbar{position:absolute;top:8px;right:8px;z-index:6;opacity:0;transition:opacity .15s;pointer-events:none}',
    '[data-xp]:hover>.xp-toolbar,.xp-toolbar:focus-within{opacity:1;pointer-events:auto}',
    '@media (hover:none){.xp-toolbar{opacity:.65;pointer-events:auto}}',
    '.xp-btn{display:inline-flex;align-items:center;gap:5px;cursor:pointer;font-family:var(--f-ui,system-ui,sans-serif);font-size:11.5px;font-weight:600;color:var(--ink-2,#3e453f);background:var(--surface,#f8f9f6);border:1px solid var(--line-strong,#b6bcb1);border-radius:6px;padding:4px 8px;box-shadow:0 1px 3px rgba(0,0,0,.14)}',
    '.xp-btn:hover{border-color:var(--sea,#1f5e4c);color:var(--sea,#1f5e4c)}',
    '.xp-btn .xp-ic{font-size:12px;line-height:1}',
    '@media (max-width:600px){.xp-btn .xp-lb{display:none}.xp-btn{padding:5px 7px}}',
    '.xp-menu{position:fixed;z-index:9999;background:var(--surface,#f8f9f6);border:1px solid var(--line-strong,#b6bcb1);border-radius:8px;box-shadow:0 8px 28px rgba(0,0,0,.20);padding:5px;min-width:216px;display:flex;flex-direction:column;gap:2px;font-family:var(--f-ui,system-ui,sans-serif)}',
    '.xp-item{display:flex;align-items:center;gap:9px;text-align:left;cursor:pointer;background:none;border:0;border-radius:6px;padding:9px 10px;font-size:13.5px;color:var(--ink,#171b18);font-family:inherit}',
    '.xp-item:hover{background:var(--surface-2,#e4e7e0)}',
    '.xp-item[disabled]{opacity:.65;cursor:default}',
    '.xp-emo{font-size:15px;width:20px;text-align:center;flex:none}',
    '.xp-toast{position:fixed;left:50%;bottom:26px;transform:translate(-50%,10px);z-index:10000;background:var(--ink,#171b18);color:var(--surface,#f8f9f6);font-family:var(--f-ui,system-ui,sans-serif);font-size:13.5px;font-weight:600;padding:9px 16px;border-radius:8px;box-shadow:0 6px 24px rgba(0,0,0,.28);opacity:0;transition:opacity .2s,transform .2s;pointer-events:none}',
    '.xp-toast.show{opacity:1;transform:translate(-50%,0)}',
    '.xp-toast.err{background:#a3341f;color:#fff}',
    '@media print{.xp-toolbar{display:none!important}}'
  ].join('\n');
  function injectCSS(){
    var st = document.createElement('style'); st.id = 'xp-style';
    st.textContent = CSS; document.head.appendChild(st);
  }

  function init(){
    injectCSS();
    scan();
    obs = new MutationObserver(schedule);
    obs.observe(document.body, { childList:true, subtree:true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
