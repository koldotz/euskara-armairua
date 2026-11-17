/* ══════════════════════════════════════════════════════════════════════
   Armairua · Iturriak — de dónde sale cada contenido
   ----------------------------------------------------------------------
   Etiqueta de procedencia para todo el portal:
     ⚠ Claude        → preparado por Claude, sin documento de origen
     Bakarka 1 · …   → transcrito de un documento de Documentos/EUS
   ITURRIAK.badge(src, ref)  → HTML de la etiqueta (src: clave de SRC)
   ITURRIAK.label(src, ref)  → el mismo texto, sin HTML
   ITURRIAK.filter(opts)     → barra de chips que muestra/oculta por fuente:
       { mount, items: () => [elementos con data-src], srcs: [claves], onChange }
   Los estilos se inyectan una sola vez; usan las variables de color de la
   página (--gold, --sea…), así que respetan el modo claro y el oscuro.
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  if (window.ITURRIAK) return;

  var SRC = {
    claude:      { tag: '⚠ Claude', doc: false,
                   full: 'Preparado por Claude: no sale de ningún documento de tu carpeta. Contrástalo con las fuentes.' },
    bakarka1:    { tag: 'Bakarka 1', doc: true, full: 'Bakarka 1 · J.A. Letamendia · Elkar' },
    arian:       { tag: 'Arian A1', doc: true, full: 'Arian A1 · Euskara ikasteko metodoa · HABE / Elkar' },
    mintzamena:  { tag: 'Eusko Jaurlaritza', doc: true, full: 'Modelos de conversaciones castellano-euskera · Gobierno Vasco (UZEI)' },
    ostalaritza: { tag: 'HABE · Elhuyar', doc: true, full: 'Ostalaritza · HABE / Elhuyar' }
  };

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function label(src, ref){ var s = SRC[src] || SRC.claude; return s.tag + (ref ? ' · ' + ref : ''); }
  function badge(src, ref){
    var s = SRC[src] || SRC.claude;
    return '<span class="itb ' + (s.doc ? 'itb-doc' : 'itb-claude') + '" data-src="' + esc(src) + '" title="' + esc(s.full + (ref ? ' · ' + ref : '')) + '">' + esc(label(src, ref)) + '</span>';
  }

  /* estilos comunes */
  function css(){
    if (document.getElementById('itb-css')) return;
    var st = document.createElement('style'); st.id = 'itb-css';
    st.textContent =
      '.itb{display:inline-flex;align-items:center;gap:3px;font-family:var(--f-mono,ui-monospace,Menlo,monospace);font-size:10px;font-weight:500;letter-spacing:.04em;line-height:1.5;' +
        'padding:0 6px;border-radius:3px;border:1px solid;white-space:nowrap;vertical-align:middle;text-transform:none;font-style:normal}' +
      '.itb-claude{color:var(--gold,#8A6A19);background:var(--gold-soft,#F0E6CC);border-color:var(--gold,#8A6A19)}' +
      '.itb-doc{color:var(--sea,#1F5E4C);background:var(--sea-soft,#DCE9E2);border-color:var(--sea,#1F5E4C)}' +
      '.itf{display:flex;flex-wrap:wrap;gap:4px;align-items:center;margin:6px 0 2px}' +
      '.itf .itf-l{font-family:var(--f-mono,ui-monospace,monospace);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted,#6E756C);margin-right:2px}' +
      '.itf button{font-family:var(--f-ui,system-ui,sans-serif);font-size:12px;line-height:1.2;padding:4px 9px;min-height:28px;border-radius:999px;border:1px solid var(--line,#D2D6CC);background:transparent;color:var(--ink-2,#3E453F);cursor:pointer}' +
      '.itf button[aria-pressed="true"]{border-color:var(--ink-2,#3E453F);background:var(--surface,#F8F9F6);color:var(--ink,#171B18);font-weight:600}' +
      '[data-itf-hide]{display:none!important}';
    (document.head || document.documentElement).appendChild(st);
  }

  /* barra de filtro por fuente */
  function filter(o){
    css();
    var bar = document.createElement('div'); bar.className = 'itf'; bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', 'Iturria · fuente');
    var srcs = ['*'].concat(o.srcs || Object.keys(SRC)), cur = '*';
    var key = o.key ? 'armairua-iturria-' + o.key : null;      // preferencia local: no viaja a la nube (armairua-cloud sincroniza euskara-…)
    try { if (key){ var v = localStorage.getItem(key); if (v && srcs.indexOf(v) >= 0) cur = v; } } catch(e){}
    bar.innerHTML = '<span class="itf-l">Iturria</span>' + srcs.map(function(s){
      return '<button type="button" data-v="' + esc(s) + '" aria-pressed="' + (s === cur) + '">' + esc(s === '*' ? 'Denak' : SRC[s].tag) + '</button>';
    }).join('');
    function apply(){
      (o.items() || []).forEach(function(el){
        var s = el.getAttribute('data-src') || 'claude';
        if (cur === '*' || s === cur) el.removeAttribute('data-itf-hide'); else el.setAttribute('data-itf-hide', '');
      });
      Array.prototype.forEach.call(bar.querySelectorAll('button'), function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-v') === cur); });
      if (o.onChange) o.onChange(cur);
    }
    bar.addEventListener('click', function(ev){
      var b = ev.target.closest('button'); if (!b) return;
      cur = b.getAttribute('data-v');
      try { if (key) localStorage.setItem(key, cur); } catch(e){}
      apply();
    });
    if (o.mount) o.mount.appendChild(bar);
    apply();
    return { el: bar, apply: apply, value: function(){ return cur; } };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', css); else css();
  window.ITURRIAK = { SRC: SRC, badge: badge, label: label, filter: filter, css: css, esc: esc };
})();
