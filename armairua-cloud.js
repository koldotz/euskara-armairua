/* ─────────────────────────────────────────────────────────────────────
   Banco de perfiles (Supabase) · sincroniza el progreso entre navegadores
   y dispositivos, por perfil. Se apoya en el HUB existente sin reescribirlo.

   - Sin config (config.js vacío) → NO hace nada: la app queda igual que
     ahora (perfil y progreso solo en este navegador).
   - Con config → un "banco" público: cada perfil (nombre) guarda su
     progreso en la tabla `perfilak`. Al entrar con un nombre, se trae su
     progreso de la nube; al avanzar, se sube (con antirrebote).
   ───────────────────────────────────────────────────────────────────── */
(function(){
  var C = window.ARMAIRUA_CFG || {};
  if (!C.url || !C.key || !window.HUB) return;   // sin backend → comportamiento local intacto

  var BASE  = C.url.replace(/\/+$/, '');
  var KEY   = C.key;
  var TABLE = C.table || 'perfilak';
  var PRE   = /^(euskara|hitzen-kutxa|koadernoa)/;   // claves de la app en localStorage
  var HKEY  = 'armairua-cloud-t';                    // marca de tiempo de la última sync (local)
  var RG    = 'armairua-reloaded';                   // guarda de recarga (sessionStorage)

  function H(extra){
    var h = { apikey:KEY, Authorization:'Bearer '+KEY, 'Content-Type':'application/json', Accept:'application/json' };
    if (extra) for (var k in extra) h[k] = extra[k];
    return h;
  }
  function nm(){ try { return (HUB.name && HUB.name()) || localStorage.getItem('euskara-izena') || ''; } catch(e){ return ''; } }
  function localT(){ try { return Number(localStorage.getItem(HKEY)) || 0; } catch(e){ return 0; } }
  function setT(t){ try { localStorage.setItem(HKEY, String(t)); } catch(e){} }
  function snap(){
    var o = {};
    for (var i=0;i<localStorage.length;i++){ var k = localStorage.key(i); if (PRE.test(k) && k !== HKEY) o[k] = localStorage.getItem(k); }
    return o;
  }
  function applySnap(d){
    if (!d) return;
    var del = [];
    for (var i=0;i<localStorage.length;i++){ var k = localStorage.key(i); if (PRE.test(k) && k !== HKEY) del.push(k); }
    del.forEach(function(k){ try { localStorage.removeItem(k); } catch(e){} });
    Object.keys(d).forEach(function(k){ try { localStorage.setItem(k, d[k]); } catch(e){} });
  }

  /* ── nube ── */
  var pt = null;
  function push(){
    var izena = nm(); if (!izena) return;
    var t = Date.now();
    fetch(BASE+'/rest/v1/'+TABLE, {
      method:'POST',
      headers:H({ Prefer:'resolution=merge-duplicates,return=minimal' }),
      body:JSON.stringify({ izena:izena, datuak:snap(), eguneratua:new Date(t).toISOString() })
    }).then(function(r){ if (r.ok) setT(t); })['catch'](function(){});
  }
  function schedule(){ if (pt) clearTimeout(pt); pt = setTimeout(push, 900); }

  function pull(izena, cb){
    if (!izena){ cb && cb(false); return; }
    fetch(BASE+'/rest/v1/'+TABLE+'?izena=eq.'+encodeURIComponent(izena)+'&select=datuak,eguneratua&limit=1', { headers:H() })
      .then(function(r){ return r.json(); })
      .then(function(rows){
        if (rows && rows.length && rows[0].datuak){ cb && cb(true, rows[0].datuak, Date.parse(rows[0].eguneratua||'')||0); }
        else cb && cb(false);
      })['catch'](function(){ cb && cb(false); });
  }

  window.ARMAIRUA_BANK = {
    list:function(cb){
      fetch(BASE+'/rest/v1/'+TABLE+'?select=izena,eguneratua&order=eguneratua.desc.nullslast&limit=60', { headers:H() })
        .then(function(r){ return r.json(); }).then(function(rows){ cb(rows && rows.length ? rows : []); })['catch'](function(){ cb([]); });
    },
    pull:pull, push:push
  };

  /* ── engancharse al HUB ── */
  if (typeof HUB.save === 'function'){ var _s = HUB.save; HUB.save = function(){ _s.apply(HUB, arguments); schedule(); }; }

  function syncIn(izena){
    pull(izena, function(found, datuak, ct){
      if (found){
        if (ct > localT()){                        // la nube gana solo si es más nueva
          applySnap(datuak); setT(ct);
          var guard=''; try { guard = sessionStorage.getItem(RG) || ''; } catch(e){}
          if (guard !== izena){ try { sessionStorage.setItem(RG, izena); } catch(e){} location.reload(); }
        }
      } else { push(); }                            // perfil nuevo → créalo en el banco
    });
  }

  var last = nm();
  if (HUB.onChange) HUB.onChange(function(state, izena){ if (izena && izena !== last){ last = izena; syncIn(izena); } });

  /* ── "banco de perfiles a la vista" en la pantalla de nombre ── */
  var css = '.gate-bank{margin:16px 0 4px}.gate-bank .gb-lbl{font-family:var(--f-mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}.gate-bank .gb-list{display:flex;flex-wrap:wrap;gap:7px}.gate-bank .gb-chip{font-family:var(--f-ui);font-size:13px;font-weight:500;cursor:pointer;border:1px solid var(--line-strong);background:var(--ground);color:var(--ink);border-radius:20px;padding:5px 13px}.gate-bank .gb-chip:hover{border-color:var(--sea);color:var(--sea)}.gate-bank .gb-empty{font-family:var(--f-ui);font-size:13px;color:var(--muted)}';
  try { var sEl = document.createElement('style'); sEl.textContent = css; document.head.appendChild(sEl); } catch(e){}

  function renderBank(){
    var form = document.getElementById('gateForm'); if (!form) return;
    var wrap = document.getElementById('gateBank');
    if (!wrap){ wrap = document.createElement('div'); wrap.id = 'gateBank'; wrap.className = 'gate-bank'; form.parentNode.insertBefore(wrap, form); }
    wrap.innerHTML = '<div class="gb-lbl">Perfiles guardados · banku publikoa</div><div class="gb-list">Kargatzen…</div>';
    ARMAIRUA_BANK.list(function(rows){
      var l = wrap.querySelector('.gb-list');
      if (!rows.length){ l.innerHTML = '<span class="gb-empty">Aún no hay ninguno. Crea el tuyo abajo.</span>'; return; }
      l.innerHTML = '';
      rows.forEach(function(r){
        var b = document.createElement('button'); b.type = 'button'; b.className = 'gb-chip'; b.textContent = r.izena;
        b.addEventListener('click', function(){
          var i = document.getElementById('gateName'); i.value = r.izena;
          if (form.requestSubmit) form.requestSubmit(); else form.dispatchEvent(new Event('submit', { cancelable:true, bubbles:true }));
        });
        l.appendChild(b);
      });
    });
  }

  var g = document.getElementById('gate');
  if (g){
    try { new MutationObserver(function(){ if (!g.hidden) renderBank(); }).observe(g, { attributes:true, attributeFilter:['hidden'] }); } catch(e){}
    if (!g.hidden) renderBank();
  }

  /* al cargar, si ya hay nombre, sincroniza por si otro dispositivo avanzó */
  if (nm()) syncIn(nm());
})();
