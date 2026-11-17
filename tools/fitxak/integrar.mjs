// Integra en euskara-armairua los seis artifacts de «Fichas A1 · kasuak» y «Gramatika sakonean»
// (ver tools/README.md, sección fitxak/).
// Uso: node tools/fitxak/integrar.mjs <carpeta-con-los-artifacts> .
//   <carpeta>/src/{kasuen-zuhaitza,nire-herria,nor-naiz,esaldi-eraikitzailea,gramatika-sakonean}.html  ← página de cada artifact
//   <carpeta>/deck/project/deck.json y deck/project/slides/*.html                     ← ficheros de la presentación
import fs from 'fs';
import path from 'path';

const [, , S, REPO] = process.argv;
const SRC = path.join(S, 'src'), DECK = path.join(S, 'deck', 'project');

const LOCAL = {
  '4QV4TTtHHzWCoYDPhKAbDm': 'kasuen-zuhaitza.html',
  '6FapFZiPSA2VPF3gerYTiR': 'nire-herria.html',
  'Lb8BcM7HF2J9zQeJG9Wujm': 'nor-naiz.html',
  'T24wv26pDyCt4FPCFEHHxx': 'kasuak-aurkezpena.html',
  'V5y7xg9jgmNi7mHfCfjsmG': 'esaldi-eraikitzailea.html',
  'Cmb2XurSJHhdVzAWhtZ5nC': 'gramatika-sakonean.html',
};
const DESC = {
  'kasuen-zuhaitza.html': 'Kasuen zuhaitza — mural de los diecisiete casos del euskera (A1–A2): árbol por familias, ficha de cada caso y banco de frases con filtros.',
  'nire-herria.html': 'Nire herria — ficha A1 explicada: las siete preguntas sobre tu pueblo, los casos que pide cada una y cómo responder.',
  'nor-naiz.html': 'Nor naiz? — ficha A1 explicada: las ocho preguntas para presentarte, con NOREKIN y NOR-NORI.',
  'esaldi-eraikitzailea.html': 'Esaldi-eraikitzailea — constructor de frases A1: elige qué decir y cómo, y la frase se monta con el caso y el verbo marcados.',
  'kasuak-aurkezpena.html': 'Kasuak · Nire herria — presentación de los nueve casos de la ficha, para ver o proyectar.',
  'gramatika-sakonean.html': 'Gramatika sakonean — explicación a fondo de la gramática del buscador de Euskara Armairua: casos, determinantes, posposiciones, auxiliares, verbos sintéticos, formas verbales, tiempos, sufijos y adverbios.',
};
const HEAD = file => `<meta name="description" content="${DESC[file]}">
<meta name="theme-color" content="#171B18">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icon-192.png">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="icon" href="icon-192.png" type="image/png" sizes="192x192">`;
const AVISO = '<span>&#9888; Claude · por contrastar: explicaciones y frases preparadas por Claude, sin revisar todavía por un hablante.</span>';

function count(s, re){ return (s.match(re) || []).length; }

function enlaces(html){
  // enlaces a artifacts integrados y al propio sitio → rutas relativas, sin pestaña nueva ni flecha
  html = html.replace(/<a ([^>]*?)href="https:\/\/(?:claude\.ai\/artifact\/([A-Za-z0-9]{22})|koldotz\.github\.io\/euskara-armairua\/([a-z0-9-]+\.html))(#[^"]*)?"([^>]*)>([\s\S]*?)<\/a>/g,
    (m, pre, id, page, hash, post, text) => {
      const dest = id ? LOCAL[id] : page;
      if (!dest) throw new Error('artifact sin destino: ' + id);
      const attrs = (pre + post).replace(/\s*target="_blank"/, '').replace(/\s*rel="noopener"/, '').trim();
      return `<a ${attrs ? attrs + ' ' : ''}href="${dest}${hash || ''}">${text.replace(/\s*↗$/, '')}</a>`;
    });
  return html;
}

function cabecera(html, file){
  html = html.replace(/<meta name="claude:viewport-fit-sides" content="cover">\n?/, '').replace(/<meta name="description"[^>]*>\n?/, '');
  // «Fichas A1» de la ruta lleva a su bloque de la portada
  html = html.replace('<span>Fichas A1</span>', '<a href="index.html#kasuak">Fichas A1</a>');
  return html.replace(/<title>/, HEAD(file) + '\n<title>');
}

function pie(html){
  if (count(html, /<\/footer>/g) !== 1) throw new Error('se esperaba un único <footer>');
  return html.replace('</footer>', '  ' + AVISO + '\n</footer>');
}

function comprobar(html, file){
  const resto = html.match(/https:\/\/(claude\.ai|koldotz\.github\.io)[^"' ]*/g);
  if (resto) throw new Error(file + ': quedan enlaces externos al proyecto: ' + resto.join(', '));
  if (/target="_blank"/.test(html)) throw new Error(file + ': queda un target=_blank');
}

/* ── 1. Las cuatro páginas HTML ── */
for (const file of ['kasuen-zuhaitza.html', 'nire-herria.html', 'nor-naiz.html', 'esaldi-eraikitzailea.html', 'gramatika-sakonean.html']) {
  let html = fs.readFileSync(path.join(SRC, file), 'utf8');

  if (html.startsWith('<!doctype html><html><head><meta charset=utf8>')) {
    // viene envuelto en el esqueleto del visor: <title>, <link> y <style> están dentro de <body>
    const a = html.indexOf('<body>') + '<body>'.length, b = html.indexOf('<header class="mast">');
    const meta = html.slice(a, b).trim();
    html = html.slice(0, html.indexOf('</head>')) + '\n' + meta + '\n</head>\n<body>\n' + html.slice(b);
    html = html.replace('<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">',
      '<!DOCTYPE html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n');
    if (!html.startsWith('<!DOCTYPE html>\n<html lang="es">')) throw new Error(file + ': cabecera inesperada');
  }

  html = cabecera(html, file);
  html = enlaces(html);

  if (file === 'esaldi-eraikitzailea.html') {
    // los enlaces al mural se pintan desde el script
    // (la sustitución general de enlaces ya lo ha reescrito: se comprueba)
    if (!html.includes(`href="kasuen-zuhaitza.html#' + id + '">' + CASEN[id] + ' en el mural</a>'`)) throw new Error('esaldi: el enlace al mural del script no ha quedado bien');
    html = html.replace('<nav class="crumbs">', '<nav class="crumbs" aria-label="Ruta"><a href="index.html">Euskara Armairua</a><span>/</span>');
    // las pruebas de enlaces reconocen las anclas que la página resuelve con su script (#intención)
    html = html.replace("var BY = {}; INTENTS.forEach(function(i){ BY[i.id] = i; });",
      "var BY = {}; INTENTS.forEach(function(i){ BY[i.id] = i; });\nwindow.ARMAIRUA_HASH_OK = function(h){ return !!BY[h]; };");
  }
  if (file === 'kasuen-zuhaitza.html') {
    html = html.replace("var C = {}; D.CASES.forEach(function(c){ C[c.id] = c; });",
      "var C = {}; D.CASES.forEach(function(c){ C[c.id] = c; });\nwindow.ARMAIRUA_HASH_OK = function(h){ return !!C[h]; };");
  }
  if (!/ARMAIRUA_HASH_OK/.test(html) && /kasuen-zuhaitza|esaldi/.test(file)) throw new Error(file + ': no se pudo añadir el gancho de anclas');

  html = pie(html);
  comprobar(html, file);
  fs.writeFileSync(path.join(REPO, file), html);
  console.log('escrito', file, html.length);
}

/* ── 2. La presentación: diapositivas del artifact Slides en una página estática ── */
const deck = JSON.parse(fs.readFileSync(path.join(DECK, 'deck.json'), 'utf8'));
const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const desc = {};
for (const s of Object.values(deck.sections)) desc[s.start] = s.description;
const N = deck.order.length;
const slides = deck.order.map((id, i) => {
  let sec = fs.readFileSync(path.join(DECK, 'slides', id + '.html'), 'utf8').trim();
  if (!sec.startsWith(`<section id="${id}"`) || !sec.endsWith('</section>')) throw new Error('diapositiva rara: ' + id);
  if (/<script|<x-|_blob|<img/.test(sec)) throw new Error('elemento no soportado en ' + id);
  let nota = '';
  sec = sec.replace(/<aside>([\s\S]*?)<\/aside>\s*(?=<\/section>$)/, (m, t) => { nota = t.trim(); return ''; });
  sec = sec.replace(`<section id="${id}"`, `<section id="${id}" class="slide" aria-label="Diapositiva ${i + 1} de ${N}"`);
  return `<figure class="sl" id="d${i + 1}" data-n="${i + 1}">
<div class="frame">
${sec}
</div>
<figcaption><span class="num">${i + 1} / ${N}</span>${desc[id] ? `<span class="sdesc">${esc(desc[id])}</span>` : ''}${nota ? `<details class="nota"><summary>Notas</summary><p>${esc(nota)}</p></details>` : ''}</figcaption>
</figure>`;
}).join('\n');

const fonts = Object.values(deck.faces).map(f => f.href.replace(/^https:\/\/fonts\.googleapis\.com\/css2\?/, '').replace(/&display=swap$/, '')).join('&');
const page = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${HEAD('kasuak-aurkezpena.html')}
<title>${esc(deck.title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts}&display=swap">
<style>
:root{
  --ground:#F1EEE4; --surface:#FBF9F2; --surface-2:#E7E2D3;
  --ink:#1E1C17; --ink-2:#46423A; --muted:#716B5E;
  --line:#DAD3C2; --line-strong:#BDB5A1; --leaf:#6F8A4C; --sea:#1F5E4C;
  --f-display:"Fraunces", Georgia, serif; --f-body:"Literata", Georgia, serif; --f-ui:"Work Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  --gut-l:max(16px, env(safe-area-inset-left, 0px)); --gut-r:max(16px, env(safe-area-inset-right, 0px));
  color-scheme:light;
}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){
  --ground:#15140F; --surface:#1D1B15; --surface-2:#29261E; --ink:#EDE9DE; --ink-2:#CCC6B7; --muted:#989182;
  --line:#332F26; --line-strong:#4B4639; --leaf:#93AF70; --sea:#63C0A0; color-scheme:dark } }
:root[data-theme="dark"]{
  --ground:#15140F; --surface:#1D1B15; --surface-2:#29261E; --ink:#EDE9DE; --ink-2:#CCC6B7; --muted:#989182;
  --line:#332F26; --line-strong:#4B4639; --leaf:#93AF70; --sea:#63C0A0; color-scheme:dark }
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--ground);color:var(--ink);font:400 16px/1.55 var(--f-body);-webkit-text-size-adjust:100%;padding:0 var(--gut-r) 0 var(--gut-l)}
a{color:var(--sea);text-underline-offset:.18em}
:focus-visible{outline:2px solid var(--sea);outline-offset:2px}
.mast,.deck,footer{max-width:1180px;margin:0 auto}
.mast{padding-block:40px 24px;display:grid;gap:14px}
.crumbs{font:500 12px/1.4 var(--f-ui);letter-spacing:.08em;text-transform:uppercase;color:var(--muted);display:flex;flex-wrap:wrap;gap:6px 10px}
.crumbs a{color:var(--muted);text-decoration:none}
.mast h1{margin:0;font:600 clamp(2.4rem, 6.4vw, 4.2rem)/1 var(--f-display);font-variation-settings:'opsz' 144;letter-spacing:-.015em}
.mast h1 em{font-style:italic;font-weight:400;color:var(--sea)}
.intro{margin:0;max-width:62ch;font-size:1.08rem;color:var(--ink-2)}
.bar{display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;font:500 13.5px/1.4 var(--f-ui);color:var(--ink-2)}
.btn{font:600 13px/1 var(--f-ui);letter-spacing:.03em;padding:10px 16px;border-radius:2px;border:1px solid var(--ink);background:var(--ink);color:var(--ground);cursor:pointer}
.btn:hover{opacity:.9}
.deck{display:grid;gap:34px;padding-block:8px 40px}
.sl{margin:0;display:grid;gap:10px;scroll-margin-top:16px}
.frame{position:relative;width:100%;aspect-ratio:16 / 9;overflow:hidden;background:#F4F1E8;border:1px solid var(--line-strong);border-radius:4px;box-shadow:0 14px 30px -22px rgba(0,0,0,.45)}
figcaption{display:flex;flex-wrap:wrap;gap:4px 14px;align-items:baseline;font:400 13.5px/1.45 var(--f-ui);color:var(--muted)}
figcaption .num{font:italic 600 14px/1 var(--f-display);color:var(--ink-2)}
.nota{flex-basis:100%}
.nota summary{cursor:pointer;width:max-content;font-weight:500;color:var(--ink-2)}
.nota p{margin:6px 0 0;max-width:80ch;color:var(--ink-2)}
footer{border-top:1px solid var(--line-strong);padding-block:20px 40px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;font:400 13px/1.5 var(--f-ui);color:var(--muted)}

/* lienzo de cada diapositiva: 1920 × 1080, escalado al ancho del marco */
.slide{position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:hidden;transform-origin:0 0;transform:scale(var(--k, .5))}
.slide, .slide *{box-sizing:border-box}
.slide :is(p, h1, h2, h3, ul, ol){margin:0}
.slide div{position:relative}   /* como en el visor de Slides: lo fijado se coloca respecto a su bloque */

/* modo presentación: una sola diapositiva a pantalla completa */
.ctl{display:none}
body.present{overflow:hidden;background:#0E0D0A;padding:0}
body.present .mast, body.present footer, body.present figcaption{display:none}
body.present .deck{position:fixed;inset:0;max-width:none;padding:0;display:block}
body.present .sl{display:none;position:absolute;inset:0;place-items:center}
body.present .sl.on{display:grid;animation:in .25s ease-out}
body.present .frame{width:min(100vw, calc(100vh * 16 / 9));border:0;border-radius:0;box-shadow:none}
body.present .ctl{display:flex;position:fixed;right:14px;bottom:14px;z-index:5;gap:6px;align-items:center;font:600 13px/1 var(--f-ui);color:#CCC6B7;opacity:.6;transition:opacity .2s}
body.present .ctl:hover, body.present .ctl:focus-within{opacity:1}
.ctl button{font:600 15px/1 var(--f-ui);min-width:40px;height:40px;border-radius:2px;border:1px solid #4B4639;background:#1D1B15;color:#EDE9DE;cursor:pointer}
.ctl span{padding:0 6px;font-variant-numeric:tabular-nums}
@keyframes in{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion: reduce){ body.present .sl.on{animation:none} }
</style>
</head>
<body>
<header class="mast">
  <nav class="crumbs" aria-label="Ruta"><a href="index.html">Euskara Armairua</a><span aria-hidden="true">/</span><a href="index.html#kasuak">Fichas A1</a><span aria-hidden="true">/</span><span>Diapositivas</span></nav>
  <h1>Kasuak · <em>Nire herria</em></h1>
  <p class="intro">Los nueve casos de la ficha <i>Nire herria</i> en ${N} diapositivas: portada, leyenda de colores, una tarjeta por caso y dos resúmenes. Pulsa <b>Presentar</b> para verlas a pantalla completa (flechas o espacio para avanzar, Esc para salir).</p>
  <div class="bar"><button type="button" class="btn" id="play">▶ Presentar</button><span>${N} diapositivas · <a href="kasuen-zuhaitza.html">Kasuen zuhaitza</a> · <a href="nire-herria.html">Nire herria</a></span></div>
</header>
<main class="deck" id="deck">
${slides}
</main>
<div class="ctl" id="ctl" role="group" aria-label="Presentación"><button type="button" id="prev" aria-label="Anterior">‹</button><span id="pos">1 / ${N}</span><button type="button" id="next" aria-label="Siguiente">›</button><button type="button" id="exit" aria-label="Salir de la presentación">✕</button></div>
<footer>
  <span>Kasuak · Nire herria · presentación A1 · Euskara Armairua</span>
  ${AVISO}
</footer>
<script>
(function(){
var figs = [].slice.call(document.querySelectorAll('.sl')), cur = 0;
function fit(){ figs.forEach(function(f){ var fr = f.querySelector('.frame'), w = fr.clientWidth; if (w) fr.querySelector('.slide').style.setProperty('--k', w / 1920); }); }
if (window.ResizeObserver) { var ro = new ResizeObserver(fit); figs.forEach(function(f){ ro.observe(f.querySelector('.frame')); }); }
window.addEventListener('resize', fit);
function show(i){ cur = Math.max(0, Math.min(figs.length - 1, i)); figs.forEach(function(f, j){ f.classList.toggle('on', j === cur); }); document.getElementById('pos').textContent = (cur + 1) + ' / ' + figs.length; fit(); }
function present(on, i){
  document.body.classList.toggle('present', on);
  if (on) { show(i || 0); try { if (document.documentElement.requestFullscreen && !document.fullscreenElement) document.documentElement.requestFullscreen().catch(function(){}); } catch (e) {} }
  else { try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) {} figs[cur].scrollIntoView({ block: 'start' }); }
  fit();
}
document.getElementById('play').addEventListener('click', function(){ present(true, 0); });
document.getElementById('prev').addEventListener('click', function(){ show(cur - 1); });
document.getElementById('next').addEventListener('click', function(){ show(cur + 1); });
document.getElementById('exit').addEventListener('click', function(){ present(false); });
document.addEventListener('fullscreenchange', function(){ if (!document.fullscreenElement && document.body.classList.contains('present')) present(false); });
document.getElementById('deck').addEventListener('click', function(e){
  if (!document.body.classList.contains('present')) { var f = e.target.closest('.frame'); if (f && !e.target.closest('a,button,summary')) present(true, figs.indexOf(f.parentNode)); return; }
  show(cur + (e.clientX > innerWidth / 3 ? 1 : -1));
});
document.addEventListener('keydown', function(e){
  if (!document.body.classList.contains('present')) return;
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].indexOf(e.key) >= 0) { e.preventDefault(); show(cur + 1); }
  else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].indexOf(e.key) >= 0) { e.preventDefault(); show(cur - 1); }
  else if (e.key === 'Home') show(0);
  else if (e.key === 'End') show(figs.length - 1);
  else if (e.key === 'Escape') present(false);
});
fit();
})();
</script>
</body>
</html>
`;
comprobar(page, 'kasuak-aurkezpena.html');
fs.writeFileSync(path.join(REPO, 'kasuak-aurkezpena.html'), page);
console.log('escrito kasuak-aurkezpena.html', page.length);
