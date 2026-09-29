// Todas las páginas y pestañas, en escritorio y en móvil: sin errores de
// JavaScript, sin recursos locales que falten, sin ids repetidos y sin
// desbordamiento horizontal (la página no debe moverse de lado en el móvil).
const PAGES = [['index.html', ['']], ['a1.html', ['egutegia', 'hiztegia', 'koadernoa', 'mintzamena', 'jokoa']],
  ['a2.html', ['orokorra', 'materialak', 'koadernoa']], ['gramatika.html', ['']], ['glosario.html', ['']],
  ['geruzak.html', ['']], ['ikasgela.html', ['']]];

export default async function(t){
  for (const [w, mobile] of [[1280, false], [390, true], [320, true]]) {
    for (const [page, hashes] of PAGES) {
      const p = await t.tab({ width: w, height: 800, mobile });
      await p.go(t.base + '/' + page + '?w=' + w, 1800);
      for (const h of hashes) {
        if (h) { await p.ev(`location.hash = '${h}'`); await p.sleep(500); }
        const where = w + 'px ' + page + (h ? '#' + h : '');
        const o = await p.ev(`document.documentElement.scrollWidth - document.documentElement.clientWidth`);
        t.ok(o <= 0, where + ': sin desbordamiento horizontal' + (o > 0 ? ' (sobran ' + o + ' px)' : ''));
        const dup = await p.ev(`(function(){ var s = {}, d = []; document.querySelectorAll('[id]').forEach(function(e){ if (s[e.id]) d.push(e.id); s[e.id] = 1; }); return d.join(','); })()`);
        t.ok(!dup, where + ': sin ids repetidos' + (dup ? ' (' + dup + ')' : ''));
      }
      const bad = await p.ev(`JSON.stringify(performance.getEntriesByType('resource').filter(function(e){ return e.name.indexOf(location.origin) === 0 && e.responseStatus >= 400; }).map(function(e){ return e.name.replace(location.origin, '') + ' ' + e.responseStatus; }))`);
      t.ok(bad === '[]', w + 'px ' + page + ': todos los recursos locales cargan' + (bad !== '[]' ? ' — ' + bad : ''));
      t.ok(!p.errs.length, w + 'px ' + page + ': sin errores de JavaScript' + (p.errs.length ? ' — ' + p.errs.slice(0, 2).join(' | ') : ''));
      await p.close();
    }
  }
}
