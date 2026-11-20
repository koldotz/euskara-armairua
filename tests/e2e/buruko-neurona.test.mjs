// Buruko neurona (buruko-neurona.html): el motor de creación. La red se dibuja
// desde el contexto, las propuestas y las piezas elegidas entran en el puzzle, el
// análisis detecta errores de concordancia, los pesos se editan por contexto,
// todo se guarda en la clave que viaja con el perfil y la Libreta lo exporta.
export default async function(t){
  const p = await t.tab({ width:1360, height:1000 });
  await p.go(t.base + '/buruko-neurona.html', 300);
  await p.ev(`localStorage.removeItem('euskara-buruko-neurona')`);
  await p.go(t.base + '/buruko-neurona.html', 2500);
  const ready = async () => { for (let i = 0; i < 30; i++){ if (await p.ev(`!!(window.BN && document.querySelector('#bn-l2 .word'))`)) return true; await p.sleep(300); } return false; };
  t.ok(await ready(), 'carga el Hiztegia y el árbol y dibuja la red');
  const n = async sel => p.ev(`document.querySelectorAll(${JSON.stringify(sel)}).length`);
  t.ok(await n('#bn-l1 .node') >= 5 && await n('#bn-l2 .word') >= 10 && await n('#bn-l3 .case') === 17, 'la red tiene nodos, palabras y los 17 casos del árbol');
  t.ok(await n('#bn-edges .e') > 20, 'las aristas unen contexto, nodos y palabras');
  t.ok(await p.ev(`!!document.querySelector('#bn-l0 [data-id="x:eszena"]') && /Dendan/.test(document.querySelector('#bn-l0').textContent)`), 'el contexto de ejemplo empieza en la tienda');

  // una forma que choca con otra palabra sale marcada en el selector (dendari = denda · NORI)
  await p.ev(`document.querySelector('#bn-l2 .wb[data-w="' + BN.M.lemma('dendari', 'iz').id + '"]').click()`); await p.sleep(150);
  t.ok(await p.ev(`(function(){ var b = [...document.querySelectorAll('.bn-pop.forms .pz')].find(x => x.querySelector('b').textContent.trim() === 'dendari ⚠'); return !!b && b.classList.contains('talka') && /denda · NORI/.test(b.title); })()`), 'el selector marca ⚠ la forma «dendari», que también es denda · NORI');
  await p.key('Escape'); await p.sleep(100);

  // proponer una frase: entra en el puzzle y el análisis la da por buena
  await p.ev(`document.getElementById('bn-prop').click()`); await p.sleep(250);
  const s1 = await p.ev(`JSON.stringify(BN.ctx().esaldiak[0].piezak.map(x => x.form))`);
  t.ok(JSON.parse(s1).length >= 4, 'la propuesta llena la primera frase: ' + s1);
  t.ok(await n('#bn-anal .an-s.ok, #bn-anal .an-s.warn') === 1 && await n('#bn-anal .an-s.bad') === 0, 'el análisis da la frase propuesta por buena');
  t.ok(await n('#bn-l3 .case.used') >= 2, 'los casos de la frase se encienden en el árbol');
  t.ok(await p.ev(`[...document.querySelectorAll('#bn-anal th')].some(th => th.textContent === 'kat.') && /sustantivo/.test(document.querySelector('#bn-anal tbody').textContent)`), 'la tabla del análisis muestra la categoría de cada pieza');

  // una frase a mano con un error: NORK con un auxiliar NOR
  await p.ev(`document.getElementById('bn-plus').click()`); await p.sleep(150);
  await p.ev(`document.getElementById('bn-chars').click()`); await p.sleep(150);
  await p.ev(`[...document.querySelectorAll('.bn-pop .chip')].find(b => b.textContent === 'Ane').click()`); await p.sleep(150);
  t.ok(await p.ev(`!!document.querySelector('.bn-pop.forms')`), 'un personaje abre sus formas (Ane, Anek, Aneri…)');
  await p.ev(`[...document.querySelectorAll('.bn-pop .pz')].find(b => b.querySelector('b').textContent === 'Anek').click()`); await p.sleep(150);
  await p.ev(`document.getElementById('bn-auxb').click()`); await p.sleep(150);
  await p.ev(`(function(){ var s = document.getElementById('bn-auxt'); s.value = [...s.options].find(o => o.textContent === 'izan (nor)').value; s.dispatchEvent(new Event('change')); })()`); await p.sleep(100);
  await p.ev(`[...document.querySelectorAll('.bn-pop .pz')].find(b => b.querySelector('b').textContent === 'da').click()`); await p.sleep(200);
  t.ok(await p.ev(`JSON.stringify(BN.ctx().esaldiak[1].piezak.map(x => x.form))`) === '["Anek","da"]', 'las piezas elegidas entran en la frase activa');
  t.ok(await n('#bn-anal .an-s.bad') === 1 && /NORK sobra/.test(await p.ev(`document.querySelector('#bn-anal .an-s.bad').textContent`)), 'el análisis marca «NORK sobra» en «Anek da»');
  // mover y quitar piezas
  await p.ev(`document.querySelector('.es-row[data-s="1"] .pz[data-p="1"]').click()`); await p.sleep(100);
  await p.ev(`document.querySelector('.es-tool [data-act="pl"]').click()`); await p.sleep(150);
  t.ok(await p.ev(`BN.ctx().esaldiak[1].piezak[0].form`) === 'da', 'una pieza se mueve a la izquierda');
  await p.ev(`document.querySelector('.es-row[data-s="1"] .pz[data-p="1"]').click()`); await p.sleep(100);
  await p.ev(`document.querySelector('.es-tool [data-act="pd"]').click()`); await p.sleep(150);
  t.ok(await p.ev(`BN.ctx().esaldiak[1].piezak.length`) === 1, 'y se quita');

  // una palabra de la red abre sus formas
  await p.ev(`[...document.querySelectorAll('#bn-l2 .wb')].find(b => (BN.M.byId[b.dataset.w] || {}).cat === 'iz').click()`); await p.sleep(150);
  t.ok(await n('.bn-pop.forms .pz') >= 2, 'tocar una palabra de la red muestra sus formas declinadas');
  await p.key('Escape'); await p.sleep(100);

  // el peso de un nodo se edita solo en este contexto
  const node = await p.ev(`document.querySelector('#bn-l1 [data-node^="f:"]').dataset.node`);
  await p.ev(`document.querySelector('#bn-l1 [data-node="${node}"]').click()`); await p.sleep(150);
  await p.ev(`document.getElementById('bn-noff').click()`); await p.sleep(200);
  t.ok(await p.ev(`BN.ctx().pisuak[${JSON.stringify(node)}]`) === 0, 'apagar un nodo guarda su peso (0) en el contexto');

  // cambiar la escena cambia la red
  await p.ev(`document.querySelector('#bn-editor .chip[data-g="eszena"][data-v="jatetxea"]').click()`); await p.sleep(300);
  t.ok(/Jatetxean/.test(await p.ev(`document.querySelector('#bn-l0').textContent`)), 'otra escena reconecta la red');

  // un contexto nuevo y la persistencia
  await p.ev(`document.getElementById('bn-new').click()`); await p.sleep(300);
  t.ok(await n('#bn-tabs .bn-tab') === 2, 'se crea un segundo contexto');
  await p.sleep(400);
  const saved = JSON.parse(await p.ev(`localStorage.getItem('euskara-buruko-neurona')`) || '{}');
  t.ok(saved && Object.keys(saved.tt || {}).length === 2, 'los contextos se guardan en «euskara-buruko-neurona» (viaja con el perfil)');
  await p.go(t.base + '/buruko-neurona.html', 2000); await ready();
  t.ok(await n('#bn-tabs .bn-tab') === 2, 'tras recargar siguen los dos contextos');

  // Libreta
  await p.ev(`document.querySelector('#bn-tabs .bn-tab').click()`); await p.sleep(200);
  await p.ev(`document.getElementById('bn-lib').click()`); await p.sleep(500);
  t.ok(await p.ev(`!!document.querySelector('#lbOv') && !document.querySelector('#lbOv').hidden && /Erredakzioak/.test(document.querySelector('#lbOv').textContent)`), 'la Libreta abre con el apartado de redacciones');
  if (process.env.BN_SHOT) { await p.ev(`document.getElementById('lbOv').hidden = true`); await p.shot(process.env.BN_SHOT); }

  t.ok(!p.errs.length, 'sin errores de JavaScript' + (p.errs.length ? ': ' + p.errs.slice(0, 3).join(' | ') : ''));
  await p.close();
}
