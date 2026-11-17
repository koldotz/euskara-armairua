// Prueba «de mono»: en cada página, pestaña y subapartado, pulsa todos los
// botones que se ven (y los que aparecen al pulsar otros) y comprueba que
// ninguno lanza errores de JavaScript. confirm() responde «no», así que no
// borra nada; print, open, alert, prompt y la voz quedan anulados.
const PAGES = [['index.html', ['']], ['a1.html', ['egutegia', 'hiztegia', 'koadernoa', 'mintzamena', 'jokoa']],
  ['a2.html', ['orokorra', 'materialak', 'koadernoa']], ['gramatika.html', ['']], ['glosario.html', ['']],
  ['geruzak.html', ['']], ['ikasgela.html', ['']],
  ['kasuen-zuhaitza.html', ['']], ['nire-herria.html', ['']], ['nor-naiz.html', ['']], ['esaldi-eraikitzailea.html', ['']], ['kasuak-aurkezpena.html', ['']], ['gramatika-sakonean.html', ['']]];
const MAX = 200;   // pulsaciones por subapartado (los juegos generan botones nuevos sin fin)

const STUBS = `window.confirm = function(){ return false; }; window.alert = function(){}; window.prompt = function(){ return null; };
  window.print = function(){}; window.open = function(){ return null; };
  try { speechSynthesis.speak = function(){}; } catch(e){}`;

/* selectores de subapartado (botones segmentados, role=tab), que se recorren
   uno a uno; el resto son botones de contenido */
const HELPERS = `window.__mk = {
  vis: function(e){ var r = e.getBoundingClientRect(); return !e.disabled && r.width && r.height && !e.closest('[hidden]') && getComputedStyle(e).visibility !== 'hidden'; },
  skip: function(e){ return e.id === 'who' || !!e.closest('#gate') || /^tab-/.test(e.id); },
  sw: function(e){ return e.classList.contains('segbtn') || e.getAttribute('role') === 'tab'; },
  all: function(){ return [].slice.call(document.querySelectorAll('button, [role=button], [role=tab], summary')); },
  switchers: function(){ var m = __mk; return m.all().filter(function(e){ return m.vis(e) && !m.skip(e) && m.sw(e); }); },
  next: function(done){
    var m = __mk, seen = {}, all = m.all();
    for (var i = 0; i < all.length; i++){
      var e = all[i];
      if (!m.vis(e) || m.skip(e) || m.sw(e)) continue;
      var c = e.closest('[id]');
      var base = (c ? c.id : '') + '|' + (e.id || '') + '|' + (e.textContent || e.getAttribute('aria-label') || '').trim().replace(/\\s+/g, ' ').slice(0, 40);
      seen[base] = (seen[base] || 0) + 1;
      var s = base + '|' + seen[base];
      if (done[s]) continue;
      e.scrollIntoView({ block: 'center' });
      e.click();
      return s;
    }
    return '';
  }
};`;

export default async function(t){
  for (const [w, mobile] of [[1280, false], [390, true]]) {
    for (const [page, hashes] of PAGES) {
      for (const h of hashes) {
        const p = await t.tab({ width: w, height: 800, mobile });
        const url = t.base + '/' + page + (h ? '#' + h : '');
        const open = async () => { await p.go(url, 1500); await p.ev(STUBS + HELPERS); };
        await open();
        const where = w + 'px ' + page + (h ? '#' + h : '');
        const culprits = [];
        let n = 0;
        const nsw = await p.ev(`__mk.switchers().length`);
        // -1 = la vista inicial; después, cada subapartado desde una carga limpia
        for (let k = -1; k < (typeof nsw === 'number' ? nsw : 0); k++) {
          if (k >= 0) { await open(); await p.ev(`__mk.switchers()[${k}] && __mk.switchers()[${k}].click()`); await p.sleep(300); }
          const done = {};
          for (let i = 0; i < MAX; i++) {
            const before = p.errs.length;
            const s = await p.ev(`__mk.next(${JSON.stringify(done)})`);
            if (!s || s.startsWith('EVAL-ERR')) break;
            done[s] = 1; n++;
            await p.sleep(50);
            // si el botón ha llevado a otra página, vuelve
            const loc = await p.ev('location.pathname');
            if (typeof loc === 'string' && !loc.endsWith('/' + page)) await open();
            if (p.errs.length > before) culprits.push(s.split('|').slice(-2).join('#') + ' → ' + p.errs.slice(before).join(' | ').slice(0, 160));
          }
        }
        t.ok(!culprits.length, where + ': ' + n + ' pulsaciones sin errores de JavaScript' + (culprits.length ? ' — ' + culprits.slice(0, 3).join(' ;; ') : ''));
        await p.close();
      }
    }
  }
}
