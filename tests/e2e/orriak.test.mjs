// Hojas de respuestas de Arian A1 en el cuaderno: se pintan, se escribe en sus
// casillas (texto, opción, marca, tabla, «Eginda»), lo escrito se guarda, viaja
// con el perfil a otro dispositivo y entra en la libreta. No tienen «Egiaztatu».
// El libro al lado (tu PDF) solo existe en local: si en este ordenador está
// enlazado en pribatua/, se comprueba; si no, esa parte se salta.
import { login, sync, serverKey } from '../lib/app.mjs';

export default async function(t){
  const A = await t.tab();
  await A.go(t.base + '/a1.html#aro-04', 2600);

  // ── se pintan, sin texto del libro ni corrección
  const k = JSON.parse(await A.ev(`(function(){
    var u = document.getElementById('aro-04'), g = [...document.querySelectorAll('#app-koadernoa nav.toc .grp')].find(x => /erantzun-orria/.test(x.textContent));
    return JSON.stringify({
      units: document.querySelectorAll('#app-koadernoa section.unit-orria').length,
      ar: u.querySelectorAll('.ar-orria').length, prog: u.querySelector('.or-n').textContent,
      kc: document.querySelectorAll('#app-koadernoa section.unit-orria .kc-btn').length, sol: document.querySelectorAll('#app-koadernoa section.unit-orria details.sol').length,
      visible: u.offsetParent !== null, open: g && g.getAttribute('aria-expanded'), toc: g ? g.nextElementSibling.children.length : 0,
      notes: u.querySelectorAll('.it-atala .itb-claude').length, links: [...u.querySelectorAll('.or-lot a')].every(a => /^geruzak\\.html#s\\d+$/.test(a.getAttribute('href'))),
      pages: [...u.querySelectorAll('.or-orr')].every(x => /\\d+\\. or\\./.test(x.textContent)), audio: u.querySelectorAll('.it-entzun').length,
      keys: (function(){ var ks = [...document.querySelectorAll('#app-koadernoa section.unit-orria [data-k]')].map(e => e.closest('section').id + '|' + e.getAttribute('data-k')); return ks.length === new Set(ks).size ? ks.length : -1; })() });
  })()`));
  t.ok(k.units === 12 && k.toc === 12, 'las doce hojas están en el cuaderno y en su grupo del índice');
  t.ok(k.visible && k.open === 'true', 'al llegar por el enlace de una unidad, su grupo del índice se despliega');
  t.ok(k.ar === 37 && k.prog === '0 / 37 ariketa landuta', 'unidad 4: sus 37 ejercicios y el recuento a cero (' + k.prog + ')');
  t.ok(k.kc === 0 && k.sol === 0, 'las hojas no tienen soluciones ni «Egiaztatu»');
  t.ok(k.notes === 6 && k.links, 'las notas de los seis apartados llevan «⚠ Claude» y enlazan a Geruzak');
  t.ok(k.pages && k.audio === 10, 'cada ejercicio con su página; los diez de audio, con su pista');
  t.ok(k.keys > 3000, 'cada casilla de las doce hojas tiene clave propia (' + k.keys + ')');

  // ── escribir: opción, texto, marca, tabla, redacción y «Eginda»
  const w = JSON.parse(await A.ev(`(function(){
    var u = document.getElementById('aro-04');
    function fire(el, v){ el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }
    u.querySelector('[data-orf="At2:2"] input[value="G"]').click();
    fire(u.querySelector('input.gapf[data-k="f:At2:2:z"]'), 'proba bat');
    u.querySelector('[data-orf="A5:2"] input[value="b"]').click();
    u.querySelector('[data-orf="A6:c"] input').click();
    u.querySelector('[data-orf="C3:1:3"] input').click();
    fire(u.querySelector('textarea.ansf[data-k="f:E9:t"]'), 'Nire iragarkia');
    u.querySelector('[data-orf="C1:done"] input').click();
    u.querySelector('[data-orf="Bd:3"] input[value="Bai"]').click();
    return JSON.stringify({ prog: u.querySelector('.or-n').textContent, on: u.querySelectorAll('.ar-orria.or-on').length, ls: JSON.parse(localStorage.getItem('koadernoa:aro-04')),
      given: u.querySelectorAll('.ar-orria[data-or="A5"] .or-adib').length, givenField: !!u.querySelector('[data-orf="A5:1"]') });
  })()`));
  t.ok(w.prog === '7 / 37 ariketa landuta' && w.on === 7, 'el recuento cuenta los ejercicios con algo escrito o marcados «Eginda»: ' + w.prog);
  t.ok(w.ls['f:At2:2'] === 'G' && w.ls['f:At2:2:z'] === 'proba bat' && w.ls['f:A5:2'] === 'b' && w.ls['f:A6:c'] === '1' && w.ls['f:C3:1:3'] === '1' && w.ls['f:E9:t'] === 'Nire iragarkia' && w.ls['f:C1:done'] === '1',
    'todo se guarda al momento, cada casilla con su clave');
  t.ok(w.given === 1 && !w.givenField, 'lo que el libro trae resuelto se enseña como dado, sin casilla');
  const off = JSON.parse(await A.ev(`(function(){ var u = document.getElementById('aro-04'), r = u.querySelector('[data-orf="Bd:3"] input[value="Bai"]'); r.click();
    return JSON.stringify({ checked: r.checked, prog: u.querySelector('.or-n').textContent, v: JSON.parse(localStorage.getItem('koadernoa:aro-04'))['f:Bd:3'] }); })()`));
  t.ok(!off.checked && off.v === '' && off.prog === '6 / 37 ariketa landuta', 'tocar otra vez la opción marcada la quita');

  // ── al volver a entrar, todo sigue ahí
  await A.go(t.base + '/a1.html?r#aro-04', 2600);
  const r = JSON.parse(await A.ev(`(function(){ var u = document.getElementById('aro-04');
    return JSON.stringify({ prog: u.querySelector('.or-n').textContent, g: u.querySelector('[data-orf="At2:2"] input[value="G"]').checked, z: u.querySelector('input.gapf[data-k="f:At2:2:z"]').value,
      c: u.querySelector('[data-orf="A6:c"] input').checked, t: u.querySelector('[data-orf="C3:1:3"] input').checked, done: u.querySelector('[data-orf="C1:done"] input').checked }); })()`));
  t.ok(r.prog === '6 / 37 ariketa landuta' && r.g && r.z === 'proba bat' && r.c && r.t && r.done, 'tras recargar, las casillas y el recuento vuelven como estaban');

  // ── libreta: el ejercicio con su página y tus respuestas
  const lb = JSON.parse(await A.ev(`(function(){ var d = document.createElement('div'); d.innerHTML = LIBRETA._build();
    var un = [...d.querySelectorAll('.lb-unit')].find(x => /Zure etxea/.test(x.textContent));
    var ars = [...d.querySelectorAll('.lb-ar')].filter(x => /^4(At|A|B|C|E|Bd)/.test((x.querySelector('.lb-k') || {}).textContent || ''));
    return JSON.stringify({ unit: un ? un.textContent : '', n: ars.length, txt: ars.map(x => x.textContent.replace(/\\s+/g, ' ')).join(' ‖ '), fields: d.querySelectorAll('input, textarea').length }); })()`));
  t.ok(/Arian A1 · 85–102/.test(lb.unit) && lb.n === 6, 'libreta: la unidad con su procedencia y los 6 ejercicios trabajados');
  t.ok(/87\. or\./.test(lb.txt) && /proba bat/.test(lb.txt) && /☑ c/.test(lb.txt) && /96\. or\. · eginda/.test(lb.txt) && /Nire iragarkia/.test(lb.txt) && lb.fields === 0,
    'libreta: cada uno con su página, tus respuestas, las marcas (☑) y «eginda»');

  // ── con perfil: sube a la nube y llega a otro dispositivo
  await login(A, 'Maialen', '1234'); await sync(A);
  const srv = JSON.parse((await serverKey(t, 'koadernoa:aro-04')) || '{}');
  t.ok(srv['f:At2:2'] === 'G' && srv['f:E9:t'] === 'Nire iragarkia' && srv['f:C1:done'] === '1', 'con perfil, lo escrito en la hoja sube a la nube');
  const B = await t.tab({ width: 390, height: 844, mobile: true });
  await B.go(t.base + '/a1.html#koadernoa', 2200);
  const b0 = JSON.parse(await B.ev(`(function(){ var g = [...document.querySelectorAll('#app-koadernoa nav.toc .grp')].find(x => /erantzun-orria/.test(x.textContent));
    return JSON.stringify({ open: g.getAttribute('aria-expanded'), own: document.querySelector('#app-koadernoa nav.toc .grp').getAttribute('aria-expanded'), sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }); })()`));
  t.ok(b0.open === 'false' && b0.own === 'true', 'móvil: el grupo de las hojas empieza plegado en el índice; los cuadernos propios, abiertos');
  await login(B, 'Maialen', '1234'); await sync(B);
  const b = JSON.parse(await B.ev(`(function(){ var u = document.getElementById('aro-04');
    return JSON.stringify({ prog: u.querySelector('.or-n').textContent, g: u.querySelector('[data-orf="At2:2"] input[value="G"]').checked, z: u.querySelector('input.gapf[data-k="f:At2:2:z"]').value,
      t: u.querySelector('[data-orf="C3:1:3"] input').checked, w: u.querySelector('textarea.ansf[data-k="f:E9:t"]').value }); })()`));
  t.ok(b.g && b.z === 'proba bat' && b.t && b.w === 'Nire iragarkia' && b.prog === '6 / 37 ariketa landuta', 'otro dispositivo: al entrar con el perfil llegan las respuestas y el recuento (' + b.prog + ')');
  await B.go(t.base + '/a1.html?m#aro-09', 2600);
  const m = JSON.parse(await B.ev(`(function(){ var wide = [...document.querySelectorAll('#app-koadernoa section.unit-orria .ar-orria, #app-koadernoa section.unit-orria .it-atala')].filter(a => a.offsetParent !== null && a.scrollWidth > a.clientWidth + 1).length;
    return JSON.stringify({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, wide: wide }); })()`));
  t.ok(b0.sw === b0.cw && m.sw === m.cw && m.wide === 0, 'móvil: ninguna hoja se sale de la pantalla');

  // ── tu libro al lado: solo si en este ordenador está enlazado en pribatua/
  await A.go(t.base + '/a1.html?l#aro-04', 2600);
  const hasBook = await A.ev(`!!(window.A1_LIBURUA && A1_LIBURUA.arian && A1_LIBURUA.arian.pdf)`);
  if (!hasBook) {
    t.ok((await A.ev(`document.querySelectorAll('#aro-04 button.or-orr').length`)) === 0, 'sin tu libro enlazado en este ordenador, la página es solo una referencia');
  } else {
    const v = JSON.parse(await A.ev(`(async function(){ var u = document.getElementById('aro-04');
      u.querySelector('.ar-orria[data-or="A1"] button.or-orr').click(); await new Promise(r => setTimeout(r, 200));
      var p = document.querySelector('.lib-panel'), f = p.querySelector('iframe'), out = { btn: u.querySelectorAll('button.or-orr').length, open: !p.hidden, src: f.getAttribute('src'), tit: p.querySelector('.lib-t').textContent };
      p.querySelector('[data-a="close"]').click(); out.closed = p.hidden && !p.querySelector('iframe'); return JSON.stringify(out); })()`));
    t.ok(v.btn === 37 && v.open && /^pribatua\/.+\.pdf#page=78/.test(v.src) && /88\. or\./.test(v.tit) && v.closed, 'local: la página de cada ejercicio abre tu PDF por ahí, al lado de las casillas (' + v.tit + ')');
  }

  t.ok(!A.errs.length && !B.errs.length, 'sin errores de JavaScript' + (A.errs.concat(B.errs).length ? ': ' + A.errs.concat(B.errs)[0] : ''));
  await A.close(); await B.close();
}
