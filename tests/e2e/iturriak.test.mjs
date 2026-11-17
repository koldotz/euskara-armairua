// Procedencia en la app: lo que ha preparado Claude lleva «⚠ Claude» y lo
// transcrito de un documento público, su fuente. Las hojas de respuestas de
// Arian A1 (sin texto del libro) son públicas y llevan la etiqueta del libro.
// Las transcripciones personales de libros (pribatua/) solo existen en local:
// si en este ordenador las hay, se comprueba que funcionan como el resto del
// cuaderno; si no, esa parte se salta.
export default async function(t){
  const p = await t.tab();
  await p.go(t.base + '/a1.html#koadernoa', 2200);

  // ── cuaderno: las unidades propias con ⚠
  const k = JSON.parse(await p.ev(`JSON.stringify({
    own: document.querySelectorAll('#app-koadernoa section.unit[data-src=claude]').length,
    ownBadge: document.querySelectorAll('#app-koadernoa section.unit[data-src=claude] .uhead .itb-claude').length,
    orri: document.querySelectorAll('#app-koadernoa section.unit-orria').length,
    orriBadge: document.querySelectorAll('#app-koadernoa section.unit-orria .uhead .itb-doc').length,
    priv: document.querySelectorAll('#app-koadernoa section.unit:not([data-src=claude]):not(.unit-orria)').length,
    privBadge: document.querySelectorAll('#app-koadernoa section.unit:not([data-src=claude]):not(.unit-orria) .uhead .itb-doc').length,
    toc: document.querySelectorAll('#app-koadernoa nav.toc li:not([data-src=claude])').length,
    chips: [...document.querySelectorAll('#app-koadernoa nav.toc .itf button')].map(b => b.textContent)
  })`));
  t.ok(k.own >= 14 && k.own === k.ownBadge, `las ${k.own} unidades propias del cuaderno llevan «⚠ Claude»`);

  t.ok(k.orri === 12 && k.orriBadge === 12, 'las 12 hojas de respuestas de Arian A1 llevan la etiqueta del libro');
  t.ok(k.chips[0] === 'Denak' && k.chips[1] === '⚠ Claude' && k.chips.includes('Arian A1'), 'filtro por fuente en el índice (' + k.chips.join(' · ') + ')');

  if (!k.priv) {
    t.ok(k.chips.length === 3 && k.toc === k.orri, 'sin transcripciones personales en este ordenador: en el cuaderno solo hay lo propio y las hojas');
  } else {
    // unidades personales (solo en local): etiqueta, índice, filtro y «Egiaztatu»
    t.ok(k.privBadge === k.priv && k.toc === k.priv + k.orri, `local: las ${k.priv} unidades personales están en el cuaderno y en el índice, con la etiqueta de su fuente`);
    const src = await p.ev(`document.querySelector('#app-koadernoa section.unit:not([data-src=claude]):not(.unit-orria)').dataset.src`);
    await p.ev(`[...document.querySelectorAll('#app-koadernoa .itf button')].find(b => b.dataset.v === ${JSON.stringify(src)}).click()`);
    const f = JSON.parse(await p.ev(`JSON.stringify({
      vis: [...document.querySelectorAll('#app-koadernoa section.unit')].filter(s => s.offsetParent !== null).map(s => s.dataset.src),
      ls: localStorage.getItem('armairua-iturria-koadernoa') })`));
    t.ok(f.vis.length > 0 && f.vis.every(s => s === src) && f.ls === src, 'local: el filtro deja solo las unidades de esa fuente y se recuerda');
    await p.go(t.base + '/a1.html#koadernoa', 2200);
    t.ok((await p.ev(`[...document.querySelectorAll('#app-koadernoa section.unit')].filter(s => s.offsetParent !== null).every(s => s.dataset.src === ${JSON.stringify(src)})`)), 'local: al volver a entrar sigue el filtro elegido');
    await p.ev(`[...document.querySelectorAll('#app-koadernoa .itf button')].find(b => b.dataset.v === '*').click()`);
    t.ok((await p.ev(`[...document.querySelectorAll('#app-koadernoa section.unit')].filter(s => s.offsetParent !== null).length`)) === k.own + k.priv + k.orri, 'local: «Denak» vuelve a enseñarlo todo');
    const r = JSON.parse(await p.ev(`(function(){
      var ar = [...document.querySelectorAll('#app-koadernoa section.unit:not([data-src=claude]):not(.unit-orria) .ar')].find(a => a.querySelector('.kc-btn') && a.querySelector('input.gapf'));
      if (!ar) return JSON.stringify({ none: true });
      var g = ar.querySelector('input.gapf'); g.value = 'xyzzy'; g.dispatchEvent(new Event('input', { bubbles: true }));
      ar.querySelector('.kc-btn').click();
      return JSON.stringify({ ko: ar.querySelectorAll('input.kc-ko').length, sol: !!ar.querySelector('.kc-sol') });
    })()`));
    t.ok(r.none || (r.ko === 1 && r.sol), 'local: «Egiaztatu» corrige también los ejercicios personales que tienen solución');
  }

  // ── Irakurmena ya no dice que sus frases salen del método
  t.ok(!(await p.ev(`/ejercicios del método/.test(document.getElementById('app-koadernoa').textContent)`)), 'Irakurmena no atribuye sus frases al método');

  // ── Hiztegia: temas de Bakarka, filtro por fuente y etiqueta en la tarjeta
  await p.go(t.base + '/a1.html#hiztegia', 2000);
  const h = JSON.parse(await p.ev(`JSON.stringify({ groups: [...document.querySelectorAll('#theme optgroup')].map(g => g.label + ':' + g.children.length), tag: document.getElementById('cTag').innerHTML })`));
  t.ok(h.groups.includes('Bakarka 1 · liburuko hiztegia:13') && h.groups.includes('Iturria · por fuente:3'), 'selector: 13 temas de Bakarka 1 y la opción «por fuente»');
  t.ok(/class="itb /.test(h.tag), 'la tarjeta lleva la etiqueta de su fuente');
  const bkCards = await p.ev(`(function(){ var s = document.getElementById('theme'); s.value = '-3'; s.dispatchEvent(new Event('change')); return document.getElementById('stTot').textContent; })()`);
  const expect = await p.ev(`(function(){ var seen = {}; A1_DATA.w.forEach(function(w){ if (w.src === 'bk1') seen[w.eu.toLowerCase().trim() + '|' + w.es.toLowerCase().trim()] = 1; }); return String(Object.keys(seen).length); })()`);
  t.ok(bkCards === expect && /Bakarka 1/.test(await p.ev(`document.getElementById('cTag').textContent`)), `«Bakarka 1 · todo su vocabulario»: ${bkCards} fichas, con su etiqueta`);
  await p.ev(`(function(){ var s = document.getElementById('theme'); s.value = '-1'; s.dispatchEvent(new Event('change')); })()`);

  // ── Esaldiak: cada frase con la etiqueta de su procedencia
  await p.go(t.base + '/a1.html#jokoa', 1500);
  const e = JSON.parse(await p.ev(`(function(){
    [...document.querySelectorAll('button')].find(x => /Esaldiak/.test(x.textContent)).click();
    var cards = [...document.querySelectorAll('#esaList .esa-card')];
    return JSON.stringify({ n: cards.length, badges: cards.filter(c => c.querySelector('.itb')).length, claude: document.querySelectorAll('#esaList .itb-claude').length,
      chips: [...document.querySelectorAll('#esaChips .esa-chip')].map(c => c.textContent) });
  })()`));
  t.ok(e.n > 0 && e.badges === e.n && e.claude > 0, 'Esaldiak: todas las frases llevan su etiqueta; las del curso de la app, «⚠ Claude»');
  t.ok(k.priv > 0 || !e.chips.includes('Bakarka 1'), 'sin transcripciones personales no hay frases de libros en Esaldiak');

  t.ok(!p.errs.length, 'sin errores de JavaScript' + (p.errs.length ? ': ' + p.errs[0] : ''));
  await p.close();
}
