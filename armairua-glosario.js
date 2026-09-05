/* ══════════════════════════════════════════════════════════════════════
   Armairua · Enlazador del glosario gramatical
   ----------------------------------------------------------------------
   Detecta términos gramaticales «clásicos» (ergativo, genitivo, sintagma,
   aspecto, posposición…) en el texto explicativo y los convierte en
   hipervínculos a glosario.html#g-<id>, que abren en OTRA PESTAÑA para no
   recargar el apartado de euskera.

   · Enlaza solo la PRIMERA aparición de cada concepto dentro de cada
     bloque (una vez por ficha), para no saturar.
   · No toca enlaces, código ni títulos; subrayado punteado discreto.
   · Reengancha tras cada búsqueda (gramatika re-renderiza sus fichas).

   Configuración por página en UNITS (contenedor + selectores a escanear).
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  if (window.__ARMAIRUA_GLOS__) return;
  window.__ARMAIRUA_GLOS__ = 1;

  var HREF = 'glosario.html';

  /* ── qué escanear en cada página ─────────────────────────────────────
     unit : bloque en el que se deduplica (1 enlace por concepto por bloque)
     scan : dentro del bloque, qué elementos escanear (omitido → todo el bloque)
     skipHeadings : no enlazar dentro de títulos (h1–h6)                     */
  function pageUnits(){
    if (document.getElementById('results') && document.getElementById('q'))
      return [{ unit:'.card', scan:'.fun, .es' }];                 // gramatika: por ficha
    if (document.getElementById('app-koadernoa'))
      return [{ unit:'#app-koadernoa', scan:'.uintro, .instr, .h, .note' }]; // a1/a2: koadernoa (1ª vez por tab)
    if (document.querySelector('.strata-block'))
      return [{ unit:'section[id^="s"]', skipHeadings:true }];      // geruzak: 1ª vez por sección
    return [];
  }
  var UNITS = null;

  /* ── conceptos: id → formas de superficie (con y sin tilde, plurales) ── */
  var TERMS = [
    ['sintagma-nominal',        ['sintagma nominal','sintagma']],
    ['nucleo',                  ['núcleo','nucleo','núcleos','nucleos']],
    ['determinante',            ['determinante','determinantes','artículo determinado','artículos','artículo','articulo','articulos']],
    ['adjetivo',                ['adjetivo','adjetivos']],
    ['sujeto',                  ['sujeto','sujetos']],
    ['objeto-directo',          ['objeto directo','objetos directos']],
    ['objeto-indirecto',        ['objeto indirecto','objetos indirectos','complemento indirecto','complementos indirectos']],
    ['caso',                    ['declinación','declinacion','casos','caso']],
    ['absolutivo',              ['absolutivo']],
    ['ergativo',                ['ergativo','ergatividad']],
    ['dativo',                  ['dativo']],
    ['genitivo',                ['genitivo']],
    ['inesivo',                 ['inesivo']],
    ['adlativo',                ['adlativo']],
    ['ablativo',                ['ablativo']],
    ['sociativo',               ['sociativo','comitativo']],
    ['instrumental',            ['instrumental']],
    ['partitivo',               ['partitivo']],
    ['auxiliar',                ['auxiliares','auxiliar']],
    ['transitivo-intransitivo', ['intransitivo','intransitiva','intransitivos','transitivo','transitiva','transitivos']],
    ['participio',              ['participio','participios','infinitivo','infinitivos']],
    ['aspecto',                 ['aspecto','gerundio']],
    ['imperativo',              ['imperativo']],
    ['morfema',                 ['morfema','morfemas','sufijo','sufijos','diminutivo']],
    ['comparativo',             ['comparativo']],
    ['superlativo',             ['superlativo']],
    ['posposicion',             ['posposiciones','posposición','posposicion']],
    ['adverbio',                ['adverbios','adverbio']]
  ];

  var LABELS = {
    'sintagma-nominal':'Sintagma nominal','nucleo':'Núcleo','determinante':'Determinante',
    'adjetivo':'Adjetivo','sujeto':'Sujeto','objeto-directo':'Objeto directo',
    'objeto-indirecto':'Objeto indirecto','caso':'Caso · declinación','absolutivo':'Absolutivo',
    'ergativo':'Ergativo','dativo':'Dativo','genitivo':'Genitivo','inesivo':'Inesivo',
    'adlativo':'Adlativo','ablativo':'Ablativo','sociativo':'Sociativo','instrumental':'Instrumental',
    'partitivo':'Partitivo','auxiliar':'Verbo auxiliar','transitivo-intransitivo':'Transitivo / intransitivo',
    'participio':'Participio','aspecto':'Aspecto','imperativo':'Imperativo','morfema':'Morfema · sufijo',
    'comparativo':'Comparativo','superlativo':'Superlativo','posposicion':'Posposición','adverbio':'Adverbio'
  };

  /* ── construir mapa forma→id y el regex combinado (más largo primero) ── */
  var FORM2ID = {}, forms = [];
  TERMS.forEach(function(pair){
    pair[1].forEach(function(f){ FORM2ID[f.toLowerCase()] = pair[0]; forms.push(f); });
  });
  forms.sort(function(a, b){ return b.length - a.length; });
  function esc(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  var L = 'A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ';
  var alts = forms.map(esc).join('|');
  var RE;
  try {
    RE = new RegExp('(?<![' + L + '])(' + alts + ')(?![' + L + '])', 'gi');
  } catch (e) {
    RE = new RegExp('\\b(' + alts + ')\\b', 'gi');   // fallback sin lookbehind
  }

  /* ── enlazar los nodos de texto de un bloque (dedupe por bloque) ─────── */
  function skip(node, root, cfg){
    var p = node.parentNode;
    while (p && p !== root){
      var t = p.nodeName;
      if (t === 'A' || t === 'CODE' || t === 'SCRIPT' || t === 'STYLE' || t === 'BUTTON') return true;
      if (cfg && cfg.skipHeadings && /^H[1-6]$/.test(t)) return true;
      p = p.parentNode;
    }
    return false;
  }
  function processText(node, used){
    var text = node.nodeValue;
    RE.lastIndex = 0;
    var m;
    while ((m = RE.exec(text))){
      var id = FORM2ID[m[1].toLowerCase()];
      if (!id || used[id]) continue;               // ya enlazado en este bloque
      used[id] = 1;
      var word = m[1], i = m.index;
      var frag = document.createDocumentFragment();
      if (i) frag.appendChild(document.createTextNode(text.slice(0, i)));
      var a = document.createElement('a');
      a.className = 'glink'; a.href = HREF + '#g-' + id;
      a.target = '_blank'; a.rel = 'noopener';
      a.title = '«' + (LABELS[id] || word) + '» en el glosario';
      a.textContent = word;
      frag.appendChild(a);
      var rest = document.createTextNode(text.slice(i + word.length));
      frag.appendChild(rest);
      node.parentNode.replaceChild(frag, node);
      processText(rest, used);                      // seguir con el resto
      return;
    }
  }
  function linkifyUnit(unit, cfg){
    if (unit.getAttribute('data-gl')) return;
    unit.setAttribute('data-gl', '1');
    var used = {};
    var scopes = cfg.scan ? unit.querySelectorAll(cfg.scan) : [unit];
    for (var i = 0; i < scopes.length; i++){
      var walker = document.createTreeWalker(scopes[i], NodeFilter.SHOW_TEXT, null);
      var batch = [], n;
      while ((n = walker.nextNode())){
        if (n.nodeValue && n.nodeValue.trim() && !skip(n, scopes[i], cfg)) batch.push(n);
      }
      batch.forEach(function(node){ processText(node, used); });
    }
  }

  function scan(){
    if (!UNITS) UNITS = pageUnits();
    UNITS.forEach(function(cfg){
      var units = document.querySelectorAll(cfg.unit);
      for (var i = 0; i < units.length; i++) linkifyUnit(units[i], cfg);
    });
  }

  /* ── estilo del enlace (reutiliza los tokens de la página) ───────────── */
  function injectCSS(){
    var st = document.createElement('style'); st.id = 'gl-style';
    st.textContent =
      '.glink{color:inherit;text-decoration:underline;text-decoration-style:dotted;' +
      'text-decoration-color:var(--sea,#1f5e4c);text-underline-offset:2px;cursor:help}' +
      '.glink:hover,.glink:focus{text-decoration-style:solid;color:var(--sea,#1f5e4c)}';
    document.head.appendChild(st);
  }

  /* ── init + observador (gramatika re-renderiza al buscar) ────────────── */
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
  function init(){
    injectCSS();
    scan();
    obs = new MutationObserver(schedule);
    obs.observe(document.body, { childList:true, subtree:true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
