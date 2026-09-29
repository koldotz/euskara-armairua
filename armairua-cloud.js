/* ─────────────────────────────────────────────────────────────────────
   Banco de perfiles (Supabase) · sincroniza el progreso entre navegadores
   y dispositivos. v2: nombre + PIN y fusión clave a clave.

   - Sin config (config.js vacío) → NO hace nada: la app queda igual
     (perfil y progreso solo en este navegador).
   - Con config → cada perfil (nombre + PIN de 4 cifras) guarda su progreso
     en Supabase a través de tres funciones (ver supabase/armairua-perfilak.sql):
       armairua_zerrenda · armairua_sartu · armairua_gorde
     La tabla está cerrada: sin el PIN nadie lee ni pisa un perfil.
   - Progreso = claves de localStorage de la app. Cada subida dice de qué
     versión de la nube parte; si otro dispositivo la cambió entretanto, el
     servidor la rechaza y aquí se fusionan las dos a tres bandas (base, local,
     nube: palabra a palabra, casilla a casilla) y se vuelve a subir. Así dos
     dispositivos no se borran el trabajo aunque trabajen sin conexión.
   - Se sincroniza al abrir la página, al volver a ella, tras cada cambio
     (con antirrebote), cada 45 s mientras está a la vista y al salir.
   - Se engancha al HUB de cada página sin reescribirlo: añade el PIN a la
     pantalla de entrada, el estado de la nube al chip de perfil y los
     botones «Sinkronizatu orain» e «Irten».
   ───────────────────────────────────────────────────────────────────── */
(function(){
  var C = window.ARMAIRUA_CFG || {};
  if (!C.url || !C.key || !window.HUB) return;   // sin backend → comportamiento local intacto

  var BASE = C.url.replace(/\/+$/, ''), KEY = C.key;
  var NAMEK = 'euskara-izena', PINK = 'armairua-pin', METAK = 'armairua-cloud-meta', BASEK = 'armairua-cloud-base', RG = 'armairua-reloaded';
  /* claves que viajan: el progreso de todos los materiales. Se quedan en el
     dispositivo las marcas __t del HUB y las preferencias de navegación/voz. */
  var SYNC = /^(euskara-|hitzen-kutxa|koadernoa|mintzamena|materialak)/;
  var SKIP = /__t$|^(euskara-izena|euskara-armairua-tab|euskara-a2-tab|euskara-a2-ost-sub|euskara-ent-view|euskara-a1-mz-last|euskara-a2-mat-last|euskara-entzumena-v1|euskara-geruzak-bt|euskara-hiztegia-modo|euskara-hitza-oharra)$/;
  function synced(k){ return SYNC.test(k) && !SKIP.test(k); }

  /* ── utilidades ── */
  function ls(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function lset(k, v){ try { localStorage.setItem(k, v); } catch(e){} }
  function ldel(k){ try { localStorage.removeItem(k); } catch(e){} }
  function name(){ var n = ''; try { n = (HUB.name && HUB.name()) || ''; } catch(e){} return String(n || ls(NAMEK) || '').trim(); }
  function pin(){ return ls(PINK) || ''; }
  function who(n){ return String(n || '').trim().toLowerCase(); }
  function hash(s){ s = String(s); var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36) + ':' + s.length; }
  /* meta: t = hora del último cambio local · h = huella del valor · p = hasta
     dónde se ha subido · c = versión de la nube en la que se basa lo local */
  function meta(){ var m; try { m = JSON.parse(ls(METAK) || '{}') || {}; } catch(e){ m = {}; } m.t = m.t || {}; m.h = m.h || {}; m.p = m.p || {}; m.c = m.c || {}; m.who = m.who || ''; return m; }
  function freshMeta(n){ return { t:{}, h:{}, p:{}, c:{}, who:who(n) }; }
  /* base: el valor de cada clave tal como está en la versión c de la nube
     (lo que hace falta para fusionar a tres bandas) */
  function base(w){ var b; try { b = JSON.parse(ls(BASEK) || 'null'); } catch(e){ b = null; } return (b && b.who === w && b.v) ? b : { who:w, v:{} }; }
  function saveBase(b){ lset(BASEK, JSON.stringify(b)); }
  function saveMeta(m){ lset(METAK, JSON.stringify(m)); }
  function localKeys(){ var a = []; try { for (var i = 0; i < localStorage.length; i++){ var k = localStorage.key(i); if (synced(k)) a.push(k); } } catch(e){} return a; }
  function hubT(k){ return Number(ls(k + '__t')) || 0; }

  function H(){
    var h = { apikey:KEY, 'Content-Type':'application/json', Accept:'application/json' };
    if (/^eyJ/.test(KEY)) h.Authorization = 'Bearer ' + KEY;   // claves «anon» antiguas (JWT); las sb_publishable_ van solo en apikey
    return h;
  }
  function rpc(fn, args, keepalive){
    return fetch(BASE + '/rest/v1/rpc/' + fn, { method:'POST', headers:H(), body:JSON.stringify(args || {}), keepalive:!!keepalive })
      .then(function(r){ if (!r.ok) throw new Error('http ' + r.status); return r.json(); });
  }

  /* marca la hora de cada clave que ha cambiado desde la última vez.
     La primera vez que se mira un perfil en este navegador, lo que ya había
     cuenta como «antiguo» (hora del HUB o 1) para no pisar la nube. */
  function scan(m){
    var now = Date.now(), first = !m.init;
    localKeys().forEach(function(k){
      var v = ls(k), h = hash(v);
      if (m.h[k] === h) return;
      m.h[k] = h;
      /* hora del cambio: la que apuntó el HUB al guardarlo (la real), o la de
         ahora si el cambio no pasó por el HUB; siempre posterior a lo subido */
      var ht = hubT(k), pk = m.p[k] || 0;
      m.t[k] = first ? (ht || 1) : Math.max(ht > pk ? ht : now, pk + 1);
    });
    m.init = true;
  }
  /* ── fusión a tres bandas de valores JSON ──
     o = base común, a = local, b = nube. Lo que solo cambió en un lado se
     queda; si cambió en los dos, se baja al detalle (palabra, casilla…) y en
     el último nivel gana el lado más reciente (pa = el local es más nuevo).
     ATOM: claves cuyos elementos no se parten. En Hitzen kutxa cada palabra
     es una ficha SM-2 (caja, intervalo, facilidad…) que va entera: mezclar
     campos de dos repasos distintos daría una ficha incoherente. */
  var ATOM = { 'hitzen-kutxa-v1':1 };
  function isMap(x){ return !!x && typeof x === 'object' && !Array.isArray(x); }
  function eq(a, b){
    if (a === b) return true;
    if (!a || !b || typeof a !== 'object' || typeof b !== 'object' || Array.isArray(a) !== Array.isArray(b)) return false;
    var ka = Object.keys(a), kb = Object.keys(b);
    return ka.length === kb.length && ka.every(function(k){ return Object.prototype.hasOwnProperty.call(b, k) && eq(a[k], b[k]); });
  }
  function merge3(o, a, b, pa, d){
    if (eq(a, b) || eq(b, o)) return a;
    if (eq(a, o)) return b;
    if (d > 0 && isMap(a) && isMap(b)){
      var out = {}, oo = isMap(o) ? o : {}, seen = {};
      Object.keys(a).concat(Object.keys(b), Object.keys(oo)).forEach(function(k){
        if (seen[k]) return; seen[k] = 1;
        var r = merge3(oo[k], a[k], b[k], pa, d - 1);
        if (r !== undefined) out[k] = r;
      });
      return out;
    }
    return pa ? a : b;
  }
  function jp(s){ if (s == null) return undefined; try { return JSON.parse(s); } catch(e){ return { __raw:s }; } }
  function mergeStr(k, bv, lv, cv, pa){
    var o = jp(bv), a = jp(lv), b = jp(cv);
    if ((isMap(a) && a.__raw !== undefined) || (isMap(b) && b.__raw !== undefined)) return pa ? lv : cv;   // no es JSON
    var r = merge3(o, a, b, pa, ATOM[k] != null ? ATOM[k] : 99);
    return eq(r, b) ? cv : (eq(r, a) ? lv : JSON.stringify(r));
  }
  /* aplica lo que la nube tiene más nuevo que nuestra base. Sin cambios
     locales, se toma tal cual; con cambios en los dos lados, se fusiona y el
     resultado queda pendiente de subir. Devuelve {ch: claves cambiadas aquí,
     dirty: hay fusiones que subir} */
  function apply(m, d, B){
    var ch = [], dirty = false;
    if (!d || !d.v) return { ch:ch, dirty:false };
    Object.keys(d.v).forEach(function(k){
      if (!synced(k)) return;
      var ct = Number(d.t && d.t[k]) || 0;
      if (ct <= (m.c[k] || 0)) return;                                  // ya partimos de esa versión
      var cv = d.v[k]; if (typeof cv !== 'string') cv = JSON.stringify(cv);
      var lv = ls(k), bv = B.v[k];
      var nv = (lv == null || lv === cv || lv === bv) ? cv : mergeStr(k, bv, lv, cv, (m.t[k] || 0) > ct);
      if (nv !== lv){ lset(k, nv); ch.push(k); if (ls(k + '__t') != null) lset(k + '__t', String(ct)); }
      m.c[k] = ct; B.v[k] = cv; m.h[k] = hash(nv);
      if (nv === cv){ m.t[k] = ct; m.p[k] = Math.max(m.p[k] || 0, ct); }
      else { m.t[k] = Math.max(Date.now(), ct + 1, (m.p[k] || 0) + 1); dirty = true; }
    });
    return { ch:ch, dirty:dirty };
  }
  function clearSynced(){ localKeys().forEach(function(k){ ldel(k); ldel(k + '__t'); }); ldel(BASEK); }

  /* ── estado (chip de perfil) ── */
  var state = '', errTxt = '', lastOk = 0;
  var MSG = {
    'pin':'PIN incorrecto.', 'pin-formatua':'El PIN son 4 cifras.', 'izena':'Nombre no válido (1–40 caracteres).',
    'blokeatuta':'Perfil bloqueado 15 minutos por demasiados PIN erróneos.', 'handiegia':'El progreso es demasiado grande para subirlo.',
    'sarea':'Sin conexión con el banco de perfiles: tu progreso se guarda aquí y se subirá cuando vuelva la conexión.',
    'pin-zaharra':'El PIN guardado en este dispositivo ya no vale (¿se ha restablecido?). Vuelve a escribirlo.',
    'utzi':'Cancelado: sigues en tu perfil. Cuando tengas conexión, sincroniza y vuelve a intentarlo.'
  };
  function errMsg(res){
    var e = (res && res.err) || 'sarea', t = MSG[e] || MSG.sarea;
    if (e === 'pin' && res && res.geratzen != null) t += res.geratzen > 0 ? ' Te quedan ' + res.geratzen + ' intentos antes del bloqueo.' : ' El perfil se ha bloqueado 15 minutos.';
    return t;
  }
  function paint(){
    var chip = document.getElementById('who'); if (!chip) return;
    var n = name(); if (!n) return;               // sin perfil: manda el texto del HUB
    var st = chip.querySelector('.st'), txt, ds;
    if (!pin()){ txt = 'Sin PIN · toca para sincronizar'; ds = 'local'; }
    else if (state === 'saving'){ txt = 'Sinkronizatzen…'; ds = 'saving'; }
    else if (state === 'error'){ txt = 'Sin sincronizar · solo aquí'; ds = 'error'; }
    else if (state === 'remote'){ txt = 'Cambios de otro dispositivo'; ds = 'saving'; }
    else if (state === 'ok'){ txt = 'Sinkronizatuta · en la nube'; ds = 'cloud'; }
    else { txt = 'Conectando…'; ds = 'saving'; }
    chip.setAttribute('data-state', ds);
    if (st) st.textContent = txt;
    chip.title = state === 'error' ? errTxt : (state === 'remote' ? 'Toca para cargar los cambios de otro dispositivo' : txt);
    paintPanel();
  }
  function setState(s, e){ state = s; if (e !== undefined) errTxt = e; paint(); }

  /* ── sincronizar: sube lo cambiado y trae lo más nuevo, en una sola llamada ── */
  var busy = false, again = false, timer = null, inflight = null, pinLost = false, merges = 0;
  function sync(opts){
    opts = opts || {};
    var n = name(), p = pin();
    if (!n || !p){ paint(); return Promise.resolve(false); }
    if (busy){ again = true; return inflight; }
    busy = true; if (!opts.quiet) setState('saving');
    var m = meta(); if (m.who !== who(n)) m = freshMeta(n);
    scan(m); saveMeta(m);
    var out = { v:{}, t:{}, b:{} };
    Object.keys(m.t).forEach(function(k){ if ((m.p[k] || 0) < m.t[k]){ var v = ls(k); if (v != null){ out.v[k] = v; out.t[k] = m.t[k]; out.b[k] = m.c[k] || 0; } } });
    inflight = rpc('armairua_gorde', { p_izena:n, p_pin:p, p_datuak:out }, opts.keepalive).then(function(res){
      busy = false;
      if (!res || !res.ok){
        /* PIN guardado que ya no vale (restablecido a mano): se olvida para no
           reintentar cada 45 s, porque cada fallo cuenta para el bloqueo */
        if (res && res.err === 'pin'){ ldel(PINK); pinLost = true; setState('error', MSG['pin-zaharra']); return false; }
        setState('error', errMsg(res)); return false;
      }
      var m2 = meta(); if (m2.who !== who(n)) m2 = m;
      var B = base(m2.who), dv = (res.datuak && res.datuak.v) || {}, dt = (res.datuak && res.datuak.t) || {};
      /* aceptado = la nube guarda ahora exactamente lo que subimos (vale también
         con el SQL antiguo, que no rechaza sino que se queda con lo más reciente) */
      Object.keys(out.t).forEach(function(k){
        var sv = dv[k]; if (sv != null && typeof sv !== 'string') sv = JSON.stringify(sv);
        if (sv === out.v[k]){ m2.p[k] = Math.max(m2.p[k] || 0, out.t[k]); m2.c[k] = Number(dt[k]) || 0; B.v[k] = out.v[k]; }
      });
      var r = apply(m2, res.datuak, B); saveMeta(m2); saveBase(B);         // lo rechazado se fusiona aquí
      lastOk = Date.now();
      if (r.dirty && merges < 3){ merges++; again = true; } else if (!r.dirty) merges = 0;
      if (r.ch.length){ if (opts.reload) reload(); else setState('remote'); }
      else if (state !== 'remote') setState('ok');
      if (again){ again = false; sync({ quiet:true }); }
      return r.ch.length > 0;
    }, function(){ busy = false; setState('error', MSG.sarea); return false; });
    return inflight;
  }
  /* claves con cambios que la nube todavía no tiene */
  function pending(){
    var n = name(); if (!n) return [];
    var m = meta();
    if (m.who !== who(n)) return localKeys();                  // de este perfil no se ha subido nada
    scan(m); saveMeta(m);
    return Object.keys(m.t).filter(function(k){ return (m.p[k] || 0) < m.t[k] && ls(k) != null; });
  }
  /* sube todo lo pendiente (hasta «tries» vueltas); devuelve lo que no se pudo subir */
  function flush(tries){
    return sync({ quiet:true }).then(function(){
      var left = pending();
      if (!left.length || !pin() || tries <= 1) return left;
      return new Promise(function(r){ setTimeout(r, 400); }).then(function(){ return flush(tries - 1); });
    });
  }
  function lostWarn(left, what){
    var n = left.length;
    return '⚠ ' + what + ' tiene progreso que no se ha podido subir a la nube (' + n + (n === 1 ? ' apartado' : ' apartados') + ')'
      + (state === 'error' && errTxt ? ': ' + errTxt : '.')
      + '\n\nSi sigues, ese progreso se borrará de este dispositivo y se perderá. «Cancelar» para quedarte y reintentarlo con conexión; «Aceptar» para seguir igualmente.';
  }
  function later(ms){ if (timer) clearTimeout(timer); timer = setTimeout(function(){ sync({ quiet:state === 'ok' }); }, ms || 1500); }
  function reload(){
    var t = 0; try { t = Number(sessionStorage.getItem(RG)) || 0; } catch(e){}
    if (Date.now() - t < 8000){ setState('remote'); return; }      // evita bucles de recarga
    try { sessionStorage.setItem(RG, String(Date.now())); } catch(e){}
    location.reload();
  }

  /* ── entrar con nombre + PIN ── */
  function login(n, p){
    return rpc('armairua_sartu', { p_izena:n, p_pin:p }).then(function(res){
      if (!res || !res.ok) return res || { ok:false, err:'sarea' };
      var m = meta();
      if (m.who && m.who !== who(res.izena)) clearSynced();     // otro perfil en este navegador: no mezclar
      if (m.who !== who(res.izena)) m = freshMeta(res.izena);
      lset(PINK, p);
      scan(m);                                                  // lo que hubiera aquí cuenta como antiguo
      var B = base(m.who), r = apply(m, res.datuak, B);          // lo local y lo de la nube se fusionan
      res.changed = r.ch; saveMeta(m); saveBase(B);
      return res;
    }, function(){ return { ok:false, err:'sarea' }; });
  }

  /* ── pantalla de entrada: PIN, lista de perfiles, panel de sincronización ── */
  var css = ''
    + '.gate-bank{margin:16px 0 4px}.gate-bank .gb-lbl{font-family:var(--f-mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}'
    + '.gate-bank .gb-list{display:flex;flex-wrap:wrap;gap:7px}.gate-bank .gb-chip{font-family:var(--f-ui);font-size:13px;font-weight:500;cursor:pointer;border:1px solid var(--line-strong);background:var(--ground);color:var(--ink);border-radius:20px;padding:5px 13px}'
    + '.gate-bank .gb-chip:hover{border-color:var(--sea);color:var(--sea)}.gate-bank .gb-empty{font-family:var(--f-ui);font-size:13px;color:var(--muted)}'
    + '#gateForm{flex-wrap:wrap}#gatePin{flex:0 0 96px;min-width:0;font-family:var(--f-mono);font-size:15px;letter-spacing:.3em;text-align:center;padding:9px 8px;border:1px solid var(--line-strong);border-radius:var(--r);background:var(--ground);color:var(--ink)}'
    + '#gatePin:focus{outline:2px solid var(--sea);outline-offset:1px;border-color:var(--sea)}'
    + '.gate-err{font-family:var(--f-ui);font-size:13px;color:var(--crit);margin-top:10px;line-height:1.45}.gate-err:empty{display:none}'
    + '.gate-sync{margin:16px 0 4px;padding:12px 14px;border:1px solid var(--line);border-radius:var(--r);background:var(--ground);font-family:var(--f-ui);font-size:13.5px;color:var(--ink-2);line-height:1.5}'
    + '.gate-sync b{color:var(--ink)}.gate-sync .gs-st{display:block;font-size:12.5px;color:var(--muted);margin-top:2px}.gate-sync .gs-st.bad{color:var(--crit)}'
    + '.gate-sync .gs-act{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.gate-sync button{font-family:var(--f-ui);font-size:13px;font-weight:600;cursor:pointer;border:1px solid var(--line-strong);background:var(--surface);color:var(--ink);border-radius:var(--r);padding:6px 12px}'
    + '.gate-sync button:hover{border-color:var(--sea);color:var(--sea)}.gate-sync button.out:hover{border-color:var(--crit);color:var(--crit)}'
    + '.hub .who[data-state="error"] .dot{background:var(--crit)}';
  try { var sEl = document.createElement('style'); sEl.textContent = css; document.head.appendChild(sEl); } catch(e){}

  var passing = false;
  function el(id){ return document.getElementById(id); }
  function showErr(t){ var e = el('gateErr'); if (e) e.textContent = t || ''; }
  function ago(t){ if (!t) return 'todavía no'; var s = Math.round((Date.now() - t) / 1000); return s < 60 ? 'hace un momento' : (s < 3600 ? 'hace ' + Math.round(s / 60) + ' min' : 'hace ' + Math.round(s / 3600) + ' h'); }

  function prepareGate(){
    var form = el('gateForm'), nameIn = el('gateName'); if (!form || !nameIn) return;
    if (!el('gatePin')){
      var pi = document.createElement('input');
      pi.id = 'gatePin'; pi.type = 'password'; pi.inputMode = 'numeric'; pi.maxLength = 4; pi.autocomplete = 'off';
      pi.placeholder = 'PIN'; pi.setAttribute('aria-label', 'PIN de 4 cifras'); pi.setAttribute('pattern', '[0-9]{4}');
      nameIn.parentNode.insertBefore(pi, nameIn.nextSibling);
      var er = document.createElement('p'); er.id = 'gateErr'; er.className = 'gate-err'; er.setAttribute('role', 'alert');
      form.parentNode.insertBefore(er, form.nextSibling);
      var fine = form.parentNode.querySelector('.fine');
      if (fine) fine.textContent = 'Tu nombre y un PIN de 4 cifras protegen tu progreso. Si el nombre es nuevo, se crea el perfil con ese PIN; si ya existe, el PIN tiene que coincidir. Con los mismos datos entras desde cualquier dispositivo. Apunta el PIN: no se puede recuperar.';
      var lede = form.parentNode.querySelector('.lede');
      if (lede) lede.textContent = 'Escribe tu nombre y tu PIN: el armario guardará tu progreso en tu cuenta y lo tendrás igual en el móvil, en la tableta o en cualquier navegador.';
    }
    var sp = el('gateSync');
    if (!sp){ sp = document.createElement('div'); sp.id = 'gateSync'; sp.className = 'gate-sync'; form.parentNode.insertBefore(sp, form); }
    paintPanel();
    renderBank();
    showErr(pinLost ? MSG['pin-zaharra'] : '');
    var p = el('gatePin'); if (p) p.value = '';
    if (name() && !pin()) setTimeout(function(){ try { el('gatePin').focus(); } catch(e){} }, 60);
  }
  function paintPanel(){
    var sp = el('gateSync'); if (!sp) return;
    var n = name();
    if (!n || !pin()){ sp.hidden = true; return; }
    sp.hidden = false;
    var bad = state === 'error';
    sp.innerHTML = 'Perfil activo: <b></b><span class="gs-st' + (bad ? ' bad' : '') + '"></span>'
      + '<div class="gs-act"><button type="button" id="gsSync">⟳ Sinkronizatu orain</button><button type="button" class="out" id="gsOut">Irten · salir en este dispositivo</button></div>';
    sp.querySelector('b').textContent = n;
    sp.querySelector('.gs-st').textContent = bad ? errTxt : (state === 'remote' ? 'Hay cambios de otro dispositivo: pulsa «Sinkronizatu orain» para cargarlos.' : 'Última sincronización: ' + ago(lastOk) + '.');
    el('gsSync').onclick = function(){ sync({ reload:true }); };
    el('gsOut').onclick = logout;
  }
  function logout(){
    if (!confirm('¿Salir de este perfil en este dispositivo? Tu progreso sigue guardado en la nube; aquí se borrará la copia local.')) return;
    var b = el('gsOut'); if (b) b.disabled = true;
    flush(3).then(function(left){
      if (left.length && !confirm(lostWarn(left, 'Este perfil'))){ if (b) b.disabled = false; paintPanel(); return; }
      clearSynced(); ldel(PINK); ldel(METAK); ldel(NAMEK);
      try { sessionStorage.removeItem(RG); } catch(e){}
      location.reload();
    });
  }
  function renderBank(){
    var form = el('gateForm'); if (!form) return;
    var wrap = el('gateBank');
    if (!wrap){ wrap = document.createElement('div'); wrap.id = 'gateBank'; wrap.className = 'gate-bank'; form.parentNode.insertBefore(wrap, form); }
    wrap.innerHTML = '<div class="gb-lbl">Perfiles guardados · toca el tuyo y escribe tu PIN</div><div class="gb-list">Kargatzen…</div>';
    rpc('armairua_zerrenda', {}).then(function(rows){ return rows || []; }, function(){ return null; }).then(function(rows){
      var l = wrap.querySelector('.gb-list');
      if (rows === null){ l.innerHTML = '<span class="gb-empty">No se puede conectar con el banco de perfiles ahora mismo.</span>'; return; }
      if (!rows.length){ l.innerHTML = '<span class="gb-empty">Aún no hay ninguno. Crea el tuyo abajo.</span>'; return; }
      l.innerHTML = '';
      rows.forEach(function(r){
        var b = document.createElement('button'); b.type = 'button'; b.className = 'gb-chip'; b.textContent = r.izena;
        b.addEventListener('click', function(){ el('gateName').value = r.izena; showErr(''); var p = el('gatePin'); if (p){ p.value = ''; p.focus(); } });
        l.appendChild(b);
      });
    });
  }

  /* el envío del formulario pasa primero por aquí (captura en document):
     se comprueba el PIN en la nube y, si vale, se deja seguir al HUB */
  document.addEventListener('submit', function(ev){
    var f = ev.target; if (!f || f.id !== 'gateForm' || passing) return;
    ev.preventDefault(); ev.stopPropagation(); if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    var n = (el('gateName').value || '').trim(), pi = el('gatePin'), p = pi ? (pi.value || '').trim() : '';
    if (!n) return;
    if (!/^[0-9]{4}$/.test(p)){ showErr(MSG['pin-formatua']); if (pi) pi.focus(); return; }
    var btn = f.querySelector('button[type="submit"]'); if (btn) btn.disabled = true;
    showErr('');
    var m0 = meta(), cur = name() || m0.who;
    var pre = (m0.who && m0.who !== who(n)) ? flush(3) : Promise.resolve([]);   // login() borrará lo de m0.who
    pre.then(function(left){
      if (left.length && !confirm(lostWarn(left, 'El perfil «' + cur + '»'))) return { ok:false, err:'utzi' };
      return login(n, p);
    }).then(function(res){
      if (btn) btn.disabled = false;
      if (!res.ok){ showErr(errMsg(res)); if (pi){ pi.value = ''; pi.focus(); } return; }
      pinLost = false;
      el('gateName').value = res.izena;
      passing = true;
      try { f.dispatchEvent(new Event('submit', { bubbles:true, cancelable:true })); } finally { passing = false; }
      try { var g = el('gate'); if (g) g.hidden = true; } catch(e){}
      lastOk = Date.now();
      sync({ quiet:true }).then(function(){ if (res.changed && res.changed.length) reload(); else setState('ok'); });
    });
  }, true);

  /* ── enganches ── */
  if (typeof HUB.save === 'function'){ var _s = HUB.save; HUB.save = function(){ _s.apply(HUB, arguments); later(1500); }; }
  if (typeof HUB.onChange === 'function') HUB.onChange(function(){ setTimeout(paint, 0); });

  var g = el('gate');
  if (g){
    try { new MutationObserver(function(){ if (!g.hidden) prepareGate(); }).observe(g, { attributes:true, attributeFilter:['hidden'] }); } catch(e){}
    if (!g.hidden) prepareGate();
  }
  document.addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'visible') sync({ reload:true, quiet:state === 'ok' });
    else if (name() && pin()) sync({ keepalive:true, quiet:true });
  });
  window.addEventListener('pagehide', function(){ if (name() && pin()) sync({ keepalive:true, quiet:true }); });
  setInterval(function(){ if (document.visibilityState === 'visible' && name() && pin()) sync({ quiet:true }); }, 45000);

  window.ARMAIRUA_BANK = { sync:sync, login:login, state:function(){ return state; } };

  function boot(){
    paint();
    if (name() && pin()) sync({ reload:true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(boot, 0); });
  else setTimeout(boot, 0);
})();
