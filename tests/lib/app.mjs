// Acciones de usuario sobre la web, compartidas por las pruebas e2e.

/* entrar (o crear el perfil) por la pantalla de entrada */
export async function login(p, name, pin, wait = 2500){
  await p.ev(`document.getElementById('who').click()`); await p.sleep(300);
  await p.ev(`document.getElementById('gateName').value = ${JSON.stringify(name)}; document.getElementById('gatePin').value = '${pin}'; document.getElementById('gateForm').requestSubmit()`);
  await p.sleep(wait);
}
/* texto y estado de la etiqueta de perfil */
export async function chip(p){
  return JSON.parse(await p.ev(`JSON.stringify({ nm: document.querySelector('#who .nm').textContent, st: document.querySelector('#who .st').textContent, ds: document.getElementById('who').getAttribute('data-state') })`));
}
/* sustituye confirm(): responde en orden con «answers» (después, true) y guarda
   los mensajes en sessionStorage, que sobrevive a las recargas */
export function stubConfirm(p, answers){
  return p.ev(`sessionStorage.setItem('__cf', '[]'); window.__ans = ${JSON.stringify(answers)}; window.confirm = function(m){ var a = JSON.parse(sessionStorage.getItem('__cf') || '[]'); a.push(m); sessionStorage.setItem('__cf', JSON.stringify(a)); return __ans.length ? __ans.shift() : true; }`);
}
export async function confirms(p){ return JSON.parse((await p.ev(`sessionStorage.getItem('__cf')`)) || '[]'); }
/* estado de Hitzen kutxa guardado en el navegador */
export async function hz(p){ return JSON.parse((await p.ev(`localStorage.getItem('hitzen-kutxa-v1')`)) || '{}'); }
export async function sync(p, wait = 1500){ await p.ev(`ARMAIRUA_BANK.sync({ quiet: true })`); await p.sleep(wait); }
/* datos de un perfil en la base de datos de prueba */
export async function server(t, gakoa = 'maialen'){ const r = await t.sql(`select datuak, hutsak from armairua_perfilak where gakoa = '${gakoa}'`); return r[0] || null; }
export async function serverKey(t, key, gakoa = 'maialen'){ const s = await server(t, gakoa); return s ? s.datuak.v[key] : undefined; }
