/* ══════════════════════════════════════════════════════════════════════
   Armairua · Koadernoa — procedencia de las unidades del cuaderno
   ----------------------------------------------------------------------
   · Pone «⚠ Claude» a las unidades propias del cuaderno.
   · Si hay unidades añadidas (apuntes o transcripciones personales del
     usuario, que viven en pribatua/ y solo se leen en local: nunca se
     publican), las pinta detrás con la etiqueta de su fuente y monta el
     filtro por fuente en el índice.
   KOADERNOA_ITURRIAK.render({ root, data, groups })
     root   → selector del panel del cuaderno (section.app con nav.toc y main)
     data   → { unitateak: [ { id, src, n, nk, eu, es, orr, intro, atalak: [...] } ] }
     groups → { src: 'Nombre del grupo en el índice' }
   Debe ejecutarse ANTES de los scripts que registran los campos del
   cuaderno y el índice: así las unidades nuevas se comportan igual que
   las propias (huecos editables, «Egiaztatu», libreta y «Nire akatsak»).
   Las unidades que ya estaban quedan con data-src="claude" y su ⚠.

   Tipos de «atal», en el orden del libro (orr = página):
     teoria        { tit, orr, html }
     hiztegia      { tit, orr, hitzak: [[eu, es], …] }
     ariketa       { k, tit, orr, instr, bank: [...], items: [{ q, a, cue, oh }], sol_oh }
                     q con «___» por hueco → a = [respuesta por hueco]
                     q sin hueco           → a = respuesta modelo; «x / y» = alternativas
     elkarrizketa  { tit, orr, oharra, lerroak: [[quién, eu, es], …] }
     irakurgaia    { tit, orr, p: [párrafos], gloss: [[eu, es], …],
                     galderak: [{ q, a }], k, gtit, ginstr, gorr }
     zerrenda      { k, tit, orr, instr, zutabeak: [[cabecera, [palabras]], …] }
                     (lectura en voz alta: cada palabra se escucha al tocarla)
     oharra        { orr, html }   nota breve (p. ej. lo que depende de un dibujo)
     atala         { id, k, tit, es, eu, orr, html }   apartado de la unidad (Atarian, A, B…):
                     cabecera con ancla (#<unidad>-<id>) y entrada en el menú de la unidad
     azpi          { tit, orr, html }   subapartado (título y texto de situación)
   Más campos de «ariketa» (los usa Arian A1):
     estiloa:'elk'   las preguntas son líneas de diálogo ({ nor, q }); las que no
                     tienen hueco quedan como texto, sin casilla
     adib: {q, a}    el ejemplo resuelto que da el libro («Adib.:»); puede ser una lista
     { g } (ítem)    rótulo de grupo dentro de la lista (qué dibujo es, qué conversación)
     aukerak         opciones por número: [['zuek','zu','gu'], …] («✓» delante = la
                     que el libro trae marcada como ejemplo)
     irudia          qué muestra el dibujo del que depende (nota de la app, con 🖼)
     entzun          pista del audio del libro (🎧)
     plain (ítem)    línea sin casilla · «[[x]]» en q = hueco que el libro trae resuelto
   Cada casilla lleva una clave propia (data-fk: ejercicio:pregunta[:hueco]) para que
   lo escrito no se descoloque si más adelante se corrige o se añade un ejercicio.
   Marcado mínimo en los textos: **negrita**, *cursiva*.

   HOJAS DE RESPUESTAS (opción «orriak» de render; datos en armairua-a1-arian-orria.js)
     Para trabajar un libro sin copiarlo: de cada ejercicio, solo su número, su
     página, la pista de audio y las casillas justas. Los enunciados se leen en el
     libro. No hay soluciones, así que no hay «Egiaztatu»: cada ejercicio se marca
     «Eginda». Se pueden publicar: no contienen texto del libro.
     orriak → { src, taldea, unitateak: [ { id, n, eu, orr, falta, atalak: [
                 { id, k, orr, lan, lot: [[§, título]], falta, ar: [ … ] } ] } ] }
       lan   nota propia (⚠ Claude) sobre lo que trabaja el apartado · lot → enlaces a Geruzak
       ar    { g } rótulo de subapartado, o un ejercicio { n, p, pp, au, m, zer, hint, adib, … }:
         m:'ikus'   solo leer o escuchar: no hay nada que escribir
         m:'lib'    en el libro se hace sobre un dibujo o un texto (subrayar, señalar): aquí, un
                    recuadro para apuntar la respuesta (oh: [rótulos] = una casilla por rótulo)
         m:'eg'     egia/gezurra y corrección por punto            it: [rótulos]
         m:'bai'    bai/ez por punto                              it: [rótulos]
         m:'abc'    una opción por punto (op: ['a','b','c'])      it: [rótulos] o grp: [[grupo, [rótulos]], …]
                    pre: { rótulo: opción que da el libro }
         m:'auk'    una opción por punto, con sus opciones        it: [[rótulo, [opciones]], …]
         m:'mark'   marcar las que correspondan                   it: [rótulos]  pre: [rótulos que da el libro]
         m:'taula'  tabla (filas × columnas) de marcas, o de texto con tx:true
         m:'idaz'   redacción larga
         m:'tx'     respuestas escritas   it: [rótulos] o grp: [[grupo, [rótulos]], …]
                    luze: respuesta larga (área) · zabal: columnas anchas · bat: una línea por punto
       pre (en cualquiera): lo que el libro trae ya resuelto. { rótulo: true } = «lo da el libro», sin
                    repetirlo aquí; { rótulo: 'b' } = la opción que trae marcada
       adib:true    el libro trae un ejemplo resuelto antes del primer punto
     Las casillas de opción y de marca son elementos .orf con propiedad «value»,
     para que el guardado, la libreta y el recuento las traten como un campo más.
   ══════════════════════════════════════════════════════════════════════ */
(function(){
  if (window.KOADERNOA_ITURRIAK) return;

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function inl(s){ return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>'); }
  /* en las soluciones solo la respuesta va en <b> (Egiaztatu compara hueco a hueco) */
  function inlSol(s){ return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<i>$1</i>'); }
  /* «[[x]]» = lo que el libro trae ya resuelto como ejemplo (en el libro, en letra manuscrita) */
  function adb(html){ return html.replace(/\[\[(.+?)\]\]/g, '<span class="it-adib">$1</span>'); }
  function IT(){ return window.ITURRIAK || null; }
  function badge(src, ref){ return IT() ? IT().badge(src, ref) : ''; }
  function orr(n){ return n ? n + '. or.' : ''; }

  function css(){
    if (document.getElementById('kit-css')) return;
    var st = document.createElement('style'); st.id = 'kit-css';
    st.textContent = [
      '.it-blk{border:1px solid var(--line);border-radius:var(--r,4px);background:var(--surface);padding:14px 18px;margin:18px 0 0}',
      '.it-blk > .ttl{font-family:var(--f-ui);font-size:15px;font-weight:600;color:var(--ink);margin-bottom:10px;display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}',
      '.it-blk > .ttl .itb{margin-left:auto}',
      '.it-blk p{font-size:15.5px;line-height:1.6;margin:0 0 8px}.it-blk p:last-child{margin-bottom:0}',
      '.it-blk .nb{font-family:var(--f-ui);font-size:12.5px;color:var(--muted)}',
      /* las tablas del libro: letra de texto, sin forzar una línea, y con scroll propio si no caben */
      '.it-blk table{display:block;overflow-x:auto;width:max-content;max-width:100%;border-collapse:collapse;font-family:var(--f-body);font-size:15px;font-variant-numeric:normal;margin:8px 0 10px}',
      '.it-blk td,.it-blk th{white-space:normal;border-bottom:0;padding:3px 14px 3px 0;vertical-align:top;text-align:left}',
      '.it-blk th{font-family:var(--f-ui);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:600;border-bottom:1px solid var(--line)}',
      '.it-blk table.grid td,.it-blk table.grid th{border:1px solid var(--line);padding:4px 10px}',
      '.it-blk .tw{max-width:100%}',
      '.it-blk .ex{margin:6px 0 10px 18px;line-height:1.7}',
      '.it-blk .ex i{color:var(--muted)}',
      '.it-blk .box{border:1px solid var(--line-strong);border-radius:3px;padding:8px 12px;margin:8px 0;font-family:var(--f-ui);font-size:13.5px;color:var(--ink-2)}',
      '.it-hitzak{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(220px,100%),1fr));gap:2px 20px;font-size:15px}',
      '.it-hitzak div{display:flex;gap:10px;justify-content:space-between;border-bottom:1px dotted var(--line);padding:3px 0}',
      '.it-hitzak b{font-weight:600}.it-hitzak span{color:var(--muted);text-align:right}',
      '.it-elk .l{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:4px 18px;padding:4px 0;border-bottom:1px dotted var(--line)}',
      '.it-elk .l:last-child{border-bottom:0}.it-elk .l.solo{grid-template-columns:1fr}',
      '.it-elk .l .eu{font-size:15.5px;font-style:normal;color:var(--ink)}.it-elk .l .eu b{color:var(--ink-2);font-weight:600;margin-right:5px}',
      '.it-blk > .ttl .k{font-family:var(--f-mono);font-size:12px;font-weight:500;color:var(--iron);border:1px solid var(--iron);border-radius:2px;padding:1px 6px}',
      '.it-elk .l .es{color:var(--muted);font-style:italic;font-size:14.5px}',
      '.it-elk .oh{font-family:var(--f-ui);font-size:12.5px;color:var(--muted);margin:0 0 8px}',
      '@media (max-width:640px){.it-elk .l{grid-template-columns:1fr;gap:0}}',
      '.it-zer{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(128px,100%),1fr));gap:12px 16px}',
      '.it-zer .col b{display:block;font-family:var(--f-mono);font-size:12px;color:var(--iron);letter-spacing:.06em;border-bottom:1px solid var(--line);margin-bottom:4px;padding-bottom:2px}',
      '.it-zer button{display:block;width:100%;text-align:left;font:inherit;font-size:15px;line-height:1.35;color:var(--ink);background:none;border:0;border-radius:3px;padding:2px 4px;cursor:pointer}',
      '.it-zer button:hover,.it-zer button:focus-visible{background:var(--sea-soft);color:var(--sea)}',
      '.it-zer button.playing{background:var(--sea-soft);color:var(--sea)}',
      '.it-oh{font-family:var(--f-ui);font-size:13px;color:var(--muted);border-left:2px solid var(--line-strong);padding:2px 0 2px 10px;margin:14px 0 0}',
      /* apartados y subapartados de una unidad (Arian A1) */
      '.it-nav{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0 0}',
      '.it-nav a{font-family:var(--f-ui);font-size:12.5px;color:var(--ink-2);text-decoration:none;border:1px solid var(--line-strong);border-radius:999px;padding:4px 11px}',
      '.it-nav a:hover{border-color:var(--sea);color:var(--sea);background:var(--sea-soft)}',
      '.it-atala{display:flex;gap:12px;align-items:flex-start;margin:44px 0 0;padding:12px 14px;background:var(--surface-2);border-left:3px solid var(--iron);border-radius:0 var(--r,4px) var(--r,4px) 0;scroll-margin-top:calc(var(--topbar,0px) + 18px)}',
      '.it-atala > .k{font-family:var(--f-display);font-weight:700;font-size:20px;line-height:1.15;color:var(--iron);flex:none;min-width:1.2em}',
      '.it-atala .tx{flex:1;min-width:0}.it-atala h3{font-family:var(--f-ui);font-size:15.5px;font-weight:600;margin:0 0 2px;color:var(--ink)}',
      '.it-atala p{font-family:var(--f-ui);font-size:13.5px;line-height:1.45;color:var(--ink-2);margin:2px 0 0}',
      '.it-atala p b{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:600;margin-right:4px}',
      '.it-atala .itb{flex:none}',
      '.it-azpi{margin:22px 0 0}.it-azpi h4{font-family:var(--f-ui);font-size:12.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--iron);margin:0 0 6px;border-bottom:1px solid var(--line);padding-bottom:4px}',
      '.it-azpi h4 .nb{font-family:var(--f-mono);font-size:10px;letter-spacing:.04em;color:var(--muted);font-weight:400;float:right;text-transform:none}',
      '.it-azpi p{font-size:15px;line-height:1.55;margin:0 0 6px;color:var(--ink-2)}',
      '.it-azpi p.egoera{font-family:var(--f-ui);font-size:13.5px;font-weight:600;color:var(--ink);background:var(--surface-2);border-radius:3px;padding:7px 10px}',
      /* ejercicios sin solución en el libro, diálogos con huecos, ejemplos y opciones */
      '#app-koadernoa .ar ol.items.it-lerroak > li{grid-template-columns:minmax(0,1fr)}#app-koadernoa .ar ol.items.it-lerroak > li::before{content:none}',
      '#app-koadernoa .ar ol.items > li[data-plain]{color:var(--ink-2)}',
      '#app-koadernoa .ar ol.items > li.it-talde{display:block;counter-increment:none;font-family:var(--f-ui);font-size:12.5px;color:var(--muted);margin-top:8px;padding-top:8px;border-top:1px dotted var(--line)}',
      '#app-koadernoa .ar ol.items > li.it-talde:first-child{margin-top:0;padding-top:0;border-top:0}#app-koadernoa .ar ol.items > li.it-talde::before{content:none}',
      '#app-koadernoa .ar .it-adibp + .it-adibp{margin-top:-6px}',
      '#app-koadernoa .ar .q .nor{font-family:var(--f-ui);font-size:13.5px;font-weight:600;color:var(--ink-2)}',
      '.it-adib{font-style:italic;color:var(--sea)}',
      '#app-koadernoa .ar .it-adibp{font-size:15px;line-height:1.5;margin:0 0 12px;padding:7px 10px;border:1px dashed var(--line-strong);border-radius:3px}',
      '#app-koadernoa .ar .it-adibp b{font-family:var(--f-ui);font-size:12px;color:var(--muted);margin-right:3px}',
      '#app-koadernoa .ar .it-irudia{font-family:var(--f-ui);font-size:12.5px;line-height:1.5;color:var(--muted);margin:0 0 12px;padding-left:10px;border-left:2px solid var(--line-strong)}',
      '#app-koadernoa .ar .it-entzun{font-family:var(--f-mono);font-size:11px;font-weight:500;color:var(--sea);border:1px solid var(--sea);border-radius:999px;padding:0 6px;margin-left:4px;white-space:nowrap}',
      '#app-koadernoa .ar ol.it-auk{list-style:none;margin:14px 0 0;padding:10px 12px;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(190px,100%),1fr));gap:6px 16px;background:var(--surface-2);border-radius:3px;font-family:var(--f-ui);font-size:13.5px}',
      '#app-koadernoa .ar ol.it-auk li b{color:var(--muted);font-weight:600;margin-right:2px}#app-koadernoa .ar ol.it-auk li span{display:block;padding-left:1.4em}',
      /* ejemplos traducidos de los cuadros de gramática */
      '.it-blk .exp{margin:4px 0 8px 14px;line-height:1.45}.it-blk .exp .eu{display:block;font-style:normal;color:var(--ink)}.it-blk .exp .es{display:block;font-size:14px;font-style:italic;color:var(--muted)}',
      '.it-blk ul{margin:6px 0 8px 18px;padding:0;font-size:15px;line-height:1.55}',
      '#app-koadernoa .txt .ttl{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}#app-koadernoa .txt .ttl .itb{margin-left:auto}',
      /* hojas de respuestas: casillas sin el texto del libro (.ar.ar-orria: la hoja de estilos de la página va después
         de esta en el documento, así que a igual peso ganaría ella) */
      '.or-prog{display:flex;align-items:center;gap:12px;font-family:var(--f-mono);font-size:12px;color:var(--ink-2);margin:10px 0 4px;font-variant-numeric:tabular-nums}',
      '.or-prog .track{flex:1;height:6px;border-radius:999px;background:var(--surface-2);overflow:hidden}.or-prog .track i{display:block;height:100%;width:0;background:var(--sea);transition:width .2s}',
      '.it-atala.or-atala{margin-top:40px;flex-wrap:wrap}.it-atala.or-atala .tx{min-width:min(100%,240px)}',
      '.it-atala .or-who{display:flex;gap:6px;align-items:center;font-family:var(--f-mono);font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--gold);margin:0 0 3px}',
      '.it-atala p.or-lan b{font-size:inherit;letter-spacing:0;text-transform:none;color:var(--ink);margin:0}.it-atala p.or-lan i{color:var(--sea)}',
      '.or-lot{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px}',
      '.or-lot a{font-family:var(--f-ui);font-size:12px;color:var(--sea);border:1px solid var(--sea);border-radius:3px;padding:1px 7px;background:var(--surface);text-decoration:none}.or-lot a:hover{background:var(--sea-soft)}',
      '.it-atala p.or-falta{font-size:12px;color:var(--gold);margin-top:6px}',
      '#app-koadernoa .ar.ar-orria{margin-top:12px}#app-koadernoa .ar.ar-orria.or-on{border-color:var(--sea)}',
      '#app-koadernoa .ar.ar-orria > .h{flex-wrap:wrap;align-items:center;gap:6px 10px;padding:9px 14px}#app-koadernoa .ar.ar-orria > .b{padding:12px 14px 14px}',
      '.or-meta{margin-left:auto;display:inline-flex;align-items:center;gap:10px}',
      '.or-orr{font-family:var(--f-mono);font-size:11px;line-height:1.5;color:var(--sea);background:var(--sea-soft);border:1px solid var(--sea);border-radius:3px;padding:0 7px;white-space:nowrap}',
      'button.or-orr{cursor:pointer}button.or-orr:hover{background:var(--surface)}',
      '.or-done{display:inline-flex;gap:5px;align-items:center;font-family:var(--f-ui);font-size:12px;color:var(--ink-2);cursor:pointer;white-space:nowrap}',
      '.or-done input,.or-chk input{accent-color:var(--sea);margin:0}',
      '#app-koadernoa .ar.ar-orria .or-hint{font-family:var(--f-ui);font-size:12.5px;line-height:1.5;color:var(--muted);margin:0 0 10px}',
      '.or-grid{display:grid;gap:8px 16px;grid-template-columns:repeat(auto-fill,minmax(min(170px,100%),1fr))}.or-grid.wide{grid-template-columns:repeat(auto-fill,minmax(min(250px,100%),1fr))}.or-grid.one{grid-template-columns:minmax(0,1fr)}',
      '.or-grid + .or-sub,.or-grid + .or-grid,#app-koadernoa .ar.ar-orria ol.items + .or-sub{margin-top:12px}',
      '.or-it{display:flex;gap:8px;align-items:center;min-width:0;flex-wrap:wrap}',
      '.or-it .l{font-family:var(--f-mono);font-size:12px;color:var(--muted);min-width:1.6em;flex:none}.or-it .l.luze{min-width:9.5em}',
      '#app-koadernoa .or-it .gapf{flex:1;min-width:90px;margin:0;text-align:left}',
      '.or-seg{display:inline-flex;flex-wrap:wrap;max-width:100%;border:1px solid var(--line-strong);border-radius:15px;overflow:hidden;flex:0 1 auto}',
      '.or-seg label{position:relative;cursor:pointer}.or-seg input{position:absolute;opacity:0;inset:0;margin:0;cursor:pointer}',
      '.or-seg label{margin-bottom:-1px}.or-seg label > span{display:block;font-family:var(--f-ui);font-size:12.5px;line-height:1;padding:6px 11px;color:var(--ink-2);border-right:1px solid var(--line);border-bottom:1px solid var(--line)}.or-seg label:last-child > span{border-right:0}',
      '.or-seg input:checked + span{background:var(--sea);color:var(--surface);font-weight:600}.or-seg input:focus-visible + span{outline:2px solid var(--sea);outline-offset:-2px}',
      '.or-adib{font-family:var(--f-ui);font-size:12.5px;font-style:italic;color:var(--sea);border:1px dashed var(--line-strong);border-radius:999px;padding:4px 11px;line-height:1}',
      '.or-adibl{font-family:var(--f-mono);font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}',
      '.or-marks{gap:6px}',
      '.or-chk{display:inline-flex;gap:6px;align-items:center;font-family:var(--f-mono);font-size:12.5px;color:var(--ink-2);border:1px solid var(--line-strong);border-radius:999px;padding:3px 11px 3px 8px;cursor:pointer}',
      '.or-chk.or-emana{border-style:dashed;cursor:default;color:var(--sea)}',
      '.or-taula{overflow-x:auto;max-width:100%}.or-taula table{border-collapse:collapse;font-family:var(--f-ui);font-size:13px;width:auto}',
      '.or-taula th,.or-taula td{border:1px solid var(--line);padding:5px 10px;text-align:center;white-space:nowrap;background:none}',
      '.or-taula th{font-family:var(--f-mono);font-size:11px;font-weight:500;color:var(--muted);letter-spacing:0;text-transform:none}.or-taula td:first-child{text-align:left;color:var(--ink-2)}',
      '.or-taula .or-chk{border:0;padding:0}#app-koadernoa .or-taula .gapf{min-width:110px;width:100%;margin:0;text-align:left}',
      '.or-sub{font-family:var(--f-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:0 0 6px}',
      '#app-koadernoa .ar.ar-orria ol.items > li{grid-template-columns:minmax(0,1fr);gap:0}#app-koadernoa .ar.ar-orria ol.items > li::before{content:none}',
      '#app-koadernoa .ar.ar-orria ol.items .q{font-family:var(--f-mono);font-size:12px;color:var(--muted)}#app-koadernoa .ar.ar-orria .ansf{grid-column:1;margin-top:3px}',
      '#app-koadernoa .ar.ar-orria li.or-idaz .ansf{min-height:9em}',
      '@media (max-width:640px){.it-atala.or-atala .tx{order:3;flex-basis:100%}.it-atala.or-atala > .itb{margin-left:auto}#app-koadernoa .ar.ar-orria > .h,#app-koadernoa .ar.ar-orria > .b{padding-left:12px;padding-right:12px}}',
      /* índice plegable por grupos */
      '#app-koadernoa nav.toc .grp[role="button"]{cursor:pointer;display:flex;align-items:center;gap:6px;border-radius:3px;margin-left:0;padding:3px 7px}',
      '#app-koadernoa nav.toc .grp[role="button"]:hover{background:var(--surface-2)}#app-koadernoa nav.toc .grp[role="button"]:focus-visible{outline:2px solid var(--sea);outline-offset:1px}',
      '#app-koadernoa nav.toc .grp[role="button"]::after{content:"▾";margin-left:auto;font-size:11px;color:var(--muted)}#app-koadernoa nav.toc .grp[aria-expanded="false"]::after{content:"▸"}',
      '#app-koadernoa nav.toc .grp .itg-n{font-family:var(--f-mono);font-size:10px;color:var(--muted);letter-spacing:0}',
      '#app-koadernoa nav.toc ol.itg-itxi{display:none}',
      '.uhead .itb{align-self:center}',
      '.uhead .n + h2 + .itb:last-child{margin-left:auto}',
      '.ar > .h .itb{margin-left:auto;flex:none;align-self:center}',
      'details.sol summary .itb{margin-left:8px}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function bank(words){
    return '<div class="bank"><span class="lbl">Hitz-bankua · banco de palabras</span>' + words.map(function(w){ return '<span>' + inl(w) + '</span>'; }).join('') + '</div>';
  }
  function ariketa(a, u, idx){
    var items = a.items || [], key = a.k || String(idx + 1), elk = a.estiloa === 'elk';
    /* si las preguntas ya traen su letra o número del libro («a. …»), no se numeran otra vez */
    var own = !elk && items.length > 0 && items.every(function(it){ return it.g != null || /^(\(?[a-zñ]\)|[a-zñ]\.|\d+\.)\s/.test(it.q || ''); });
    var qs = items.map(function(it, n){
      var fk = key + ':' + n, g = 0;
      var q = adb(inl(it.q))
        .replace(/_{3,}/g, function(){ return '<span class="gap" data-fk="' + esc(fk + ':' + (g++)) + '"></span>'; });
      var plain = it.plain || (elk && !g);
      if (it.g != null) return '<li data-plain class="it-talde">' + inl(it.g) + '</li>';      // rótulo de grupo (p. ej. qué dibujo es)
      return '<li' + (plain ? ' data-plain' : ' data-fk="' + esc(fk) + '"') + '><span class="q">' + (it.nor ? '<b class="nor">' + inl(it.nor) + ':</b> ' : '') + q +
        (it.cue ? ' <span class="cue">' + adb(inl(it.cue)) + '</span>' : '') + '</span></li>';
    }).join('');
    var hasSol = items.some(function(it){ return it.a != null && it.a !== ''; });
    var ss = items.map(function(it){
      var body;
      if (Array.isArray(it.a)){ var k = 0; body = inlSol(it.q).replace(/_{3,}/g, function(){ return '<b>' + inl(it.a[k++] || '') + '</b>'; }); }
      else if (it.a == null || it.a === '') body = '<span class="es">(el libro no da solución)</span>';
      else body = '<b>' + inl(it.a) + '</b>';
      return '<li>' + body + (it.oh ? ' <span class="es">— ' + inl(it.oh) + '</span>' : '') + '</li>';
    }).join('');
    var auk = (a.aukerak || []).map(function(op, i){
      return '<li><b>' + (i + 1) + '.</b> ' + op.map(function(x, j){
        var ok = x.charAt(0) === '✓';
        return '<span' + (ok ? ' class="it-adib"' : '') + '>' + (ok ? '✓ ' : '') + 'abcdef'.charAt(j) + '. ' + inl(ok ? x.slice(1) : x) + '</span>';
      }).join('') + '</li>';
    }).join('');
    return '<div class="ar' + (hasSol ? '' : ' ar-nosol') + '" data-src="' + esc(u.src) + '">' +
      '<div class="h"><span class="k">' + esc(key) + '</span><h3>' + inl(a.tit || 'Ariketa') + (a.entzun ? ' <span class="it-entzun" title="Pista ' + esc(a.entzun) + ' del audio del libro">🎧 ' + esc(a.entzun) + '</span>' : '') + '</h3>' + badge(u.src, orr(a.orr)) + '</div>' +
      '<div class="b">' + (a.instr ? '<p class="instr">' + inl(a.instr) + '</p>' : '') +
        (a.irudia ? '<p class="it-irudia">🖼 ' + inl(a.irudia) + '</p>' : '') +
        (a.bank ? bank(a.bank) : '') +
        (a.adib ? [].concat(a.adib).map(function(x){ return '<p class="it-adibp"><b>Adib.:</b> ' + inl(x.q) + (x.a ? '<br><span class="it-adib">' + inl(x.a) + '</span>' : '') + '</p>'; }).join('') : '') +
        '<ol class="items' + (elk || own ? ' it-lerroak' : '') + '">' + qs + '</ol>' +
        (auk ? '<ol class="it-auk">' + auk + '</ol>' : '') + '</div>' +
      (hasSol ? '<details class="sol"><summary>Erantzunak · ' + esc(IT() ? IT().label(u.src, orr(a.sorr)) : '') + '</summary><div class="in"><ol>' + ss + '</ol>' + (a.sol_oh ? '<p class="note">' + inl(a.sol_oh) + '</p>' : '') + '</div></details>' : '') +
      '</div>';
  }
  function blk(cls, titleHtml, a, u, inner){
    return '<div class="it-blk ' + cls + '" data-src="' + esc(u.src) + '"><div class="ttl">' + titleHtml + badge(u.src, orr(a.orr)) + '</div>' + inner + '</div>';
  }
  function atal(a, u, i){
    switch (a.mota){
      case 'teoria':   return blk('it-teoria', inl(a.tit || 'Teoria'), a, u, a.html || '');
      case 'hiztegia': return blk('it-hiztegia', inl(a.tit || 'Hiztegia · vocabulario'), a, u, '<div class="it-hitzak">' + (a.hitzak || []).map(function(h){ return '<div><b>' + inl(h[0]) + '</b><span>' + inl(h[1]) + '</span></div>'; }).join('') + '</div>');
      case 'ariketa':  return ariketa(a, u, i);
      case 'zerrenda':
        return blk('it-zerrenda', (a.k ? '<span class="k">' + esc(a.k) + '</span> ' : '') + inl(a.tit || 'Irakurri ozen'), a, u,
          (a.instr ? '<p class="nb">' + inl(a.instr) + '</p>' : '') +
          '<div class="it-zer">' + (a.zutabeak || []).map(function(c){
            return '<div class="col">' + (c[0] ? '<b>' + esc(c[0]) + '</b>' : '') + c[1].map(function(w){ return '<button type="button" data-say="' + esc(w) + '" title="Entzun · escuchar">' + esc(w) + '</button>'; }).join('') + '</div>';
          }).join('') + '</div>');
      case 'elkarrizketa':
        var solo = !(a.lerroak || []).some(function(l){ return l[2]; });
        return blk('it-elk', inl(a.tit || 'Elkarrizketa'), a, u, (a.oharra ? '<p class="oh">' + inl(a.oharra) + '</p>' : '') + (a.lerroak || []).map(function(l){
          return '<div class="l' + (solo ? ' solo' : '') + '"><div class="eu">' + (l[0] ? '<b>' + inl(l[0]) + '</b>' : '') + inl(l[1]) + '</div>' + (solo ? '' : '<div class="es">' + inl(l[2] || '') + '</div>') + '</div>';
        }).join(''));
      case 'irakurgaia':
        var txt = '<div class="txt" data-src="' + esc(u.src) + '"><div class="ttl">' + inl(a.tit || 'Irakurgaia') + badge(u.src, orr(a.orr)) + '</div>' +
          (a.p || []).map(function(p){ return '<p>' + inl(p) + '</p>'; }).join('') +
          (a.gloss && a.gloss.length ? '<p class="gloss">' + a.gloss.map(function(g){ return '<b>' + inl(g[0]) + '</b>: ' + inl(g[1]); }).join(' · ') + '</p>' : '') + '</div>';
        return txt + (a.galderak && a.galderak.length ? ariketa({ k: a.k || 'G', tit: a.gtit || 'Galderak · preguntas', orr: a.gorr || a.orr, sorr: a.sorr, instr: a.ginstr, items: a.galderak, sol_oh: a.sol_oh }, u, i) : '');
      case 'oharra': return '<p class="it-oh" data-src="' + esc(u.src) + '">' + (a.html || '') + (a.orr ? ' <span class="nb">(' + esc(orr(a.orr)) + ')</span>' : '') + '</p>';
      case 'atala':
        return '<div class="it-atala" id="' + esc(u.id + '-' + a.id) + '" data-src="' + esc(u.src) + '"><span class="k">' + esc(a.k) + '</span><div class="tx">' +
          (a.tit ? '<h3>' + inl(a.tit) + '</h3>' : '') +
          (a.es ? '<p><b>Objetivo</b> ' + inl(a.es) + '</p>' : '') + (a.eu ? '<p><b>Helburua</b> ' + inl(a.eu) + '</p>' : '') + '</div>' + badge(u.src, orr(a.orr)) + '</div>' +
          (a.html ? '<div class="it-azpi">' + a.html + '</div>' : '');
      case 'azpi':
        return '<div class="it-azpi" data-src="' + esc(u.src) + '">' + (a.tit ? '<h4>' + inl(a.tit) + (a.orr ? ' <span class="nb">' + esc(orr(a.orr)) + '</span>' : '') + '</h4>' : '') + (a.html || '') + '</div>';
      default: return '';
    }
  }
  function unit(u){
    return '<section class="unit" id="' + esc(u.id) + '" data-src="' + esc(u.src) + '"><div class="wrap">' +
      '<div class="uhead"><span class="n">' + esc(u.nk || u.n) + '</span><h2>' + inl(u.eu) + '</h2>' + badge(u.src, u.orr ? u.orr + '. or.' : '') + '</div>' +
      (u.es || u.intro ? '<p class="uintro">' + (u.es ? '<i>' + inl(u.es) + '</i>' : '') + (u.es && u.intro ? ' · ' : '') + (u.intro ? inl(u.intro) : '') + '</p>' : '') +
      (function(){
        var at = (u.atalak || []).filter(function(a){ return a.mota === 'atala'; });
        return at.length < 2 ? '' : '<nav class="it-nav" aria-label="Apartados de la unidad">' + at.map(function(a){ return '<a href="#' + esc(u.id + '-' + a.id) + '">' + esc(a.k) + '</a>'; }).join('') + '</nav>';
      })() +
      (u.atalak || []).map(function(a, i){ return atal(a, u, i); }).join('') +
      '</div></section>';
  }

  /* ── hojas de respuestas ─────────────────────────────────────────────── */
  var ZER = { lib: 'Liburuan · sobre el dibujo o el texto', ikus: 'Irakurri edo entzun · sin respuesta escrita', eg: 'Egia ala gezurra · corrige las falsas', bai: 'Bai ala ez', abc: 'Hutsuneak · elige una opción',
              auk: 'Aukeratu · elige una', mark: 'Markatu · marca las que correspondan', taula: 'Taula · completa la tabla', idaz: 'Idazlana · redacción', tx: 'Erantzun · escribe las respuestas' };
  function lbl(l){ return l === '' || l == null ? '' : '<span class="l' + (String(l).length > 3 ? ' luze' : '') + '">' + inl(l) + '</span>'; }
  function seg(u, fk, ops){
    return '<span class="orf or-seg" data-orf="' + esc(fk) + '" role="radiogroup">' + ops.map(function(o){
      return '<label><input type="radio" name="' + esc(u.id + ':' + fk) + '" value="' + esc(o) + '"><span>' + esc(o) + '</span></label>'; }).join('') + '</span>';
  }
  function chk(fk, l, cls){ return '<label class="orf or-chk' + (cls || '') + '" data-orf="' + esc(fk) + '"><input type="checkbox" value="1"' + (l ? '' : ' aria-label="' + esc(fk) + '"') + '>' + (l ? '<span>' + inl(l) + '</span>' : '') + '</label>'; }
  function emana(o){
    if (o === true) return '<span class="or-adibl" title="El libro lo trae resuelto">adib. · lo da el libro</span>';
    return '<span class="or-adib" title="El libro lo trae resuelto">' + esc(o) + '</span><span class="or-adibl">adib.</span>';
  }
  function gapS(fk){ return '<span class="gap" data-fk="' + esc(fk) + '"></span>'; }
  /* clave de un punto: su rótulo si lo tiene (no se descoloca si se corrige la hoja); si no, su posición */
  function ik(l, i){ var s = String(l == null ? '' : l).normalize('NFD').replace(/[^A-Za-z0-9]+/g, ''); return s || String(i); }
  function kontrolak(ex, u, ek){
    var f = function(x){ return ek + ':' + x; }, it = ex.it || [], h = '';
    if (ex.hint) h += '<p class="or-hint">' + inl(ex.hint) + '</p>';
    if (ex.adib) h += '<p class="or-hint">El libro trae antes un ejemplo resuelto (Adib.).</p>';
    switch (ex.m){
      case 'ikus':
        h += '<p class="or-hint">Solo hay que leer o escuchar: no se escribe nada. Márcalo cuando lo hayas hecho.</p>'; break;
      case 'lib':
        h += '<p class="or-hint">En el libro se hace sobre el dibujo o el texto. Apunta aquí tu respuesta, o márcalo sin más cuando esté hecho.</p>';
        if (ex.oh) h += '<div class="or-grid one">' + ex.oh.map(function(l, i){ return '<div class="or-it">' + lbl(l) + gapS(f('o' + i)) + '</div>'; }).join('') + '</div>';
        else h += '<ol class="items"><li data-fk="' + esc(f('o')) + '"></li></ol>';
        break;
      case 'eg':
        h += '<div class="or-grid one">' + it.map(function(l, i){ var k = ik(l, i); return '<div class="or-it">' + lbl(l) + seg(u, f(k), ['E', 'G']) + gapS(f(k) + ':z') + '</div>'; }).join('') + '</div>'; break;
      case 'bai': case 'abc': case 'auk':
        (ex.grp || [['', it]]).forEach(function(g, gi){
          var pf = ex.grp ? gi + ':' : '';
          if (g[0]) h += '<div class="or-sub">' + inl(g[0]) + '</div>';
          h += '<div class="or-grid' + (ex.m === 'auk' || ex.zabal ? ' wide' : '') + '">' + g[1].map(function(x, i){
            var l = Array.isArray(x) ? x[0] : x, ops = Array.isArray(x) ? x[1] : (ex.op || (ex.m === 'bai' ? ['Bai', 'Ez'] : ['a', 'b', 'c'])), pre = !ex.grp && ex.pre && ex.pre[l];
            return '<div class="or-it">' + lbl(l) + (pre ? emana(pre) : seg(u, f(pf + ik(l, i)), ops)) + '</div>'; }).join('') + '</div>';
        });
        break;
      case 'mark':
        h += '<div class="or-it or-marks">' + it.map(function(l, i){
          return ex.pre && ex.pre.indexOf(l) >= 0 ? '<span class="or-chk or-emana" title="El libro lo trae marcado">☑ ' + inl(l) + ' <span class="or-adibl">adib.</span></span>' : chk(f(ik(l, i)), l); }).join('') + '</div>'; break;
      case 'taula':
        h += '<div class="or-taula"><table><tr><th></th>' + ex.cols.map(function(c){ return '<th>' + inl(c) + '</th>'; }).join('') + '</tr>' + ex.rows.map(function(r, i){
          return '<tr><td>' + inl(r) + '</td>' + ex.cols.map(function(c, j){ var k = f(i + ':' + j);
            return '<td>' + (ex.pre && ex.pre.indexOf(i + ':' + j) >= 0 ? '<span class="or-adibl">adib.</span>' : ex.tx ? gapS(k) : chk(k, '', ' or-cell')) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>'; break;
      case 'idaz':
        h += '<ol class="items"><li class="or-idaz" data-fk="' + esc(f('t')) + '"></li></ol>'; break;
      default:
        (ex.grp || [['', it]]).forEach(function(g, gi){
          var pf = ex.grp ? gi + ':' : '';
          if (g[0]) h += '<div class="or-sub">' + inl(g[0]) + '</div>';
          if (ex.luze) h += '<ol class="items">' + g[1].map(function(l, i){ return '<li data-fk="' + esc(f(pf + ik(l, i))) + '">' + (l ? '<span class="q">' + inl(l) + '</span>' : '') + '</li>'; }).join('') + '</ol>';
          else h += '<div class="or-grid' + (ex.bat ? ' one' : ex.zabal ? ' wide' : '') + '">' + g[1].map(function(l, i){
            var pre = ex.pre && ex.pre[l];
            return '<div class="or-it">' + lbl(l) + (pre ? emana(pre) : gapS(f(pf + ik(l, i)))) + '</div>'; }).join('') + '</div>';
        });
    }
    return h;
  }
  function orriAtala(s, u){
    var body = (s.ar || []).map(function(ex){
      if (ex.g != null) return '<div class="it-azpi" data-src="' + esc(u.src) + '"><h4>' + inl(ex.g) + '</h4></div>';
      var ek = s.kode + ex.n, key = u.n + s.kode + (ex.n ? '·' + ex.n : ''), tracks = ex.au ? String(ex.au) : '';
      return '<div class="ar ar-nosol ar-orria" data-src="' + esc(u.src) + '" data-or="' + esc(ek) + '" data-p="' + esc(ex.p) + '">' +
        '<div class="h"><span class="k">' + esc(key) + '</span><h3>' + inl(ex.zer || ZER[ex.m] || ZER.tx) +
          (tracks ? ' <span class="it-entzun" data-au="' + esc(tracks) + '" title="Pista ' + esc(tracks) + ' del audio del libro">🎧 ' + esc(tracks) + '</span>' : '') + '</h3>' +
          '<span class="or-meta"><span class="or-orr" data-p="' + esc(ex.p) + '" title="' + esc((IT() ? IT().label(u.src) : '') + ' · ' + orr(ex.pp || ex.p)) + '">' + esc(orr(ex.pp || ex.p)) + '</span>' +
          '<label class="orf or-done" data-orf="' + esc(ek + ':done') + '"><input type="checkbox" value="1"> Eginda</label></span></div>' +
        '<div class="b">' + kontrolak(ex, u, ek) + '</div></div>';
    }).join('');
    return '<div class="it-atala or-atala" id="' + esc(u.id + '-' + s.id) + '" data-src="' + esc(u.src) + '"><span class="k">' + esc(s.k) + '</span><div class="tx">' +
      (s.lan ? '<p class="or-who">' + badge('claude') + '<span>nota propia</span></p><p class="or-lan">' + inl(s.lan) + '</p>' : '') +
      (s.lot && s.lot.length ? '<div class="or-lot">' + s.lot.map(function(l){ return '<a href="geruzak.html#s' + esc(l[0]) + '">Geruzak §' + esc(l[0]) + ' · ' + esc(l[1]) + ' →</a>'; }).join('') + '</div>' : '') +
      (s.falta ? '<p class="or-falta">⚠ ' + inl(s.falta) + '</p>' : '') + '</div>' + badge(u.src, orr(s.orr)) + '</div>' + body;
  }
  function orriUnit(u){
    var at = u.atalak || [];
    at.forEach(function(s){ s.kode = s.kode || ik(s.id, 0); });
    return '<section class="unit unit-orria" id="' + esc(u.id) + '" data-src="' + esc(u.src) + '"><div class="wrap">' +
      '<div class="uhead"><span class="n">' + esc(u.nk || u.n) + '</span><h2>' + inl(u.eu) + '</h2>' + badge(u.src, u.orr ? u.orr + '. or.' : '') + '</div>' +
      '<p class="uintro">Erantzun-orria · hoja de respuestas. Los enunciados están en el libro; aquí van el número de cada ejercicio, su página y las casillas.' + (u.falta ? ' ' + inl(u.falta) : '') + '</p>' +
      '<div class="or-prog"><span class="or-n"></span><span class="track"><i></i></span></div>' +
      (at.length < 2 ? '' : '<nav class="it-nav" aria-label="Apartados de la unidad">' + at.map(function(s){ return '<a href="#' + esc(u.id + '-' + s.id) + '">' + esc(s.k) + '</a>'; }).join('') + '</nav>') +
      at.map(function(s){ return orriAtala(s, u); }).join('') +
      '</div></section>';
  }
  /* las casillas de opción y de marca se leen y se escriben como un campo de texto (propiedad value) */
  function wire(root){
    Array.prototype.forEach.call(root.querySelectorAll('.orf'), function(el){
      var ins = el.querySelectorAll('input');
      Object.defineProperty(el, 'value', {
        get: function(){ for (var i = 0; i < ins.length; i++) if (ins[i].checked) return ins[i].value; return ''; },
        set: function(v){ v = v == null ? '' : String(v); for (var i = 0; i < ins.length; i++){ ins[i].checked = v !== '' && ins[i].value === v; ins[i].toggleAttribute('data-on', ins[i].checked); } }
      });
    });
    /* tocar otra vez la opción marcada la quita */
    root.addEventListener('click', function(e){
      var r = e.target; if (!r || r.type !== 'radio' || !r.closest('.or-seg')) return;
      if (r.hasAttribute('data-on')){ r.checked = false; r.removeAttribute('data-on'); r.dispatchEvent(new Event('input', { bubbles: true })); return; }
      Array.prototype.forEach.call(r.closest('.or-seg').querySelectorAll('input'), function(x){ x.toggleAttribute('data-on', x === r); });
    });
    root.addEventListener('input', function(e){ var s = e.target.closest && e.target.closest('section.unit-orria'); if (s) progress(s); });
  }
  var FIELDS = 'input.gapf, textarea.ansf, .orf';
  function worked(ar){ return Array.prototype.some.call(ar.querySelectorAll(FIELDS), function(f){ return String(f.value || '').trim(); }); }
  function progress(sec){
    var ars = sec.querySelectorAll('.ar-orria'), n = 0;
    Array.prototype.forEach.call(ars, function(ar){ var on = worked(ar); ar.classList.toggle('or-on', on); if (on) n++; });
    var t = sec.querySelector('.or-prog .or-n'), b = sec.querySelector('.or-prog .track i');
    if (t) t.textContent = n + ' / ' + ars.length + ' ariketa landuta';
    if (b) b.style.width = (ars.length ? n / ars.length * 100 : 0) + '%';
  }
  /* tras cargar lo guardado (o llegar de la nube): recuento de cada hoja */
  function refresh(scope){
    Array.prototype.forEach.call((scope || document).querySelectorAll('section.unit-orria'), progress);
    if (scope && scope.matches && scope.matches('section.unit-orria')) progress(scope);
  }

  function say(btn){
    if (!window.ENTZUN || !ENTZUN.say) return;
    var prev = document.querySelector('.it-zer button.playing'); if (prev) prev.classList.remove('playing');
    btn.classList.add('playing');
    ENTZUN.say(btn.getAttribute('data-say'), function(){ btn.classList.remove('playing'); });
  }

  /* índice plegable: cada grupo se abre y se cierra; los propios empiezan abiertos y los añadidos
     (libros, hojas de respuestas) plegados, salvo el de la unidad a la que se llega. Se recuerda en el navegador. */
  function tolestu(nav, key){
    var K = 'armairua-aurkibidea-' + key, st = {};
    try { st = JSON.parse(localStorage.getItem(K) || '{}') || {}; } catch(e){}
    function set(g, open, save){
      var ol = g.nextElementSibling; if (!ol || ol.tagName !== 'OL') return;
      ol.classList.toggle('itg-itxi', !open); g.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (save){ st[g.getAttribute('data-g')] = open ? 1 : 0; try { localStorage.setItem(K, JSON.stringify(st)); } catch(e){} }
    }
    Array.prototype.forEach.call(nav.querySelectorAll('.grp'), function(g){
      var id = g.textContent.trim(), ol = g.nextElementSibling;
      g.setAttribute('data-g', id); g.setAttribute('role', 'button'); g.setAttribute('tabindex', '0');
      if (ol && ol.tagName === 'OL' && g.getAttribute('data-src') !== 'claude') g.insertAdjacentHTML('beforeend', ' <span class="itg-n">' + ol.children.length + '</span>');
      set(g, st[id] != null ? !!st[id] : g.getAttribute('data-src') === 'claude');
      g.addEventListener('click', function(){ set(g, g.getAttribute('aria-expanded') !== 'true', true); });
      g.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); g.click(); } });
    });
    function openFor(){
      var h = location.hash.slice(1); if (!h) return;
      Array.prototype.some.call(nav.querySelectorAll('a[href^="#"]'), function(a){
        var id = a.getAttribute('href').slice(1);
        if (h !== id && h.indexOf(id + '-') !== 0) return false;
        var g = a.closest('ol') && a.closest('ol').previousElementSibling;
        if (g && g.classList.contains('grp')) set(g, true);
        return true;
      });
    }
    openFor(); window.addEventListener('hashchange', openFor);
  }

  function render(o){
    var root = document.querySelector(o.root); if (!root) return;
    css();
    var main = root.querySelector('main'), nav = root.querySelector('nav.toc .inner');
    var D = o.data || {}, U = (D.unitateak || []).filter(function(u){ return !o.src || o.src.indexOf(u.src) >= 0; });
    var O = o.orriak || {};
    U = U.concat((O.unitateak || []).map(function(u){ u.orria = true; u.src = u.src || O.src; u.taldea = u.taldea || O.taldea; return u; }));
    function gk(u){ return u.taldea || u.src; }
    /* 1 · lo que ya estaba: ⚠ Claude */
    Array.prototype.forEach.call(root.querySelectorAll('section.unit:not([data-src])'), function(sec){
      sec.setAttribute('data-src', 'claude');
      var uh = sec.querySelector('.uhead'), h2 = uh && uh.querySelector('h2');
      if (h2) h2.insertAdjacentHTML('afterend', badge('claude')); else if (uh) uh.insertAdjacentHTML('beforeend', badge('claude'));
    });
    if (nav) Array.prototype.forEach.call(nav.querySelectorAll('.grp, ol, li'), function(el){ if (!el.hasAttribute('data-src')) el.setAttribute('data-src', 'claude'); });
    /* 2 · unidades de los libros, antes del pie */
    var foot = main && main.querySelector(':scope > footer');
    var html = U.map(function(u){ return u.orria ? orriUnit(u) : unit(u); }).join('');
    if (main) { if (foot) foot.insertAdjacentHTML('beforebegin', html); else main.insertAdjacentHTML('beforeend', html); }
    if (main) main.addEventListener('click', function(e){ var b = e.target.closest && e.target.closest('.it-zer button[data-say]'); if (b) say(b); });
    if (main && O.unitateak && O.unitateak.length){
      wire(main);
      /* el recuento, cuando los campos editables (que se registran después) ya han cargado lo guardado */
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ refresh(main); }); else setTimeout(function(){ refresh(main); }, 0);
    }
    /* 3 · índice: un grupo por libro */
    if (nav){
      Object.keys(o.groups || {}).forEach(function(g){
        var us = U.filter(function(u){ return gk(u) === g; }); if (!us.length) return;
        var src = us[0].src;
        nav.insertAdjacentHTML('beforeend', '<div class="grp" data-src="' + esc(src) + '">' + esc(o.groups[g]) + '</div><ol data-src="' + esc(src) + '">' +
          us.map(function(u){ return '<li data-src="' + esc(src) + '"><a href="#' + esc(u.id) + '"><span class="n">' + esc(u.n) + '</span>' + inl(u.eu) + '</a></li>'; }).join('') + '</ol>');
      });
      /* 4 · filtro por fuente, bajo el título del índice */
      if (U.length) tolestu(nav, o.key || 'koadernoa');
      var srcs = ['claude'];
      U.forEach(function(u){ if (srcs.indexOf(u.src) < 0) srcs.push(u.src); });
      if (IT() && srcs.length > 1){          // con una sola fuente no hay nada que filtrar
        var holder = document.createElement('div'); var sub = nav.querySelector('.sub');
        if (sub) sub.insertAdjacentElement('afterend', holder); else nav.insertBefore(holder, nav.firstChild);
        IT().filter({ mount: holder, srcs: srcs, key: o.key || 'koadernoa',
          items: function(){ return Array.prototype.slice.call(root.querySelectorAll('section.unit[data-src], nav.toc [data-src]:not(.itb)')); } });
      }
    }
  }

  window.KOADERNOA_ITURRIAK = { render: render, unit: unit, refresh: refresh };
})();
