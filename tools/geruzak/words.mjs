// Diccionario de las gafas: forma → [glosa, piezas] o varias lecturas [[glosa, piezas], …].
// Para añadir una forma: set({ forma: ['traducción', 'raíz=significado|sufijo:ID'] }) al final del
// bloque que toque (ID = un morfema de morf.mjs). Si ya existe, se añade como otra lectura.
// Luego: npm run gafas  (valida y regenera armairua-geruzak-betaurrekoak.js).
// Piezas separadas por «|»: «etxe=casa» raíz con significado · «ta:TA» morfema del inventario.
export const W = {};
export const MERGED = [];
const reads = v => Array.isArray(v[0]) ? v : [v];
function add(k, v){
  k = k.toLowerCase();
  if (!W[k]) { W[k] = v; return; }
  const a = reads(W[k]), seen = new Set(a.map(r => r[1]));
  reads(v).forEach(r => { if (!seen.has(r[1])) a.push(r); });
  W[k] = a.length === 1 ? a[0] : a; MERGED.push(k);
}
function set(o){ Object.keys(o).forEach(k => add(k, o[k])); }

/* ══ declinación regular (tablas del bloque 5) ══ */
function declV(r, m, g){      // raíz en vocal: etxe
  const R = r + '=' + m;
  set({
    [r]: [g.mug, R],
    [r+'a']: [g.sg, R+'|a:DET'],
    [r+'ak']: [[g.pl, R+'|ak:DETPL'], [g.sg + ' (agente, NORK)', R+'|a:DET|k:NORK']],
    [r+'k']: [g.mug + ' (agente, NORK)', R+'|k:NORK'],
    [r+'ek']: [g.pl + ' (agente, NORK)', R+'|e:PL|k:NORK'],
    [r+'ri']: ['a ' + g.mug, R+'|r:LOTR|i:NORI'],
    [r+'ari']: ['a ' + g.sg, R+'|a:DET|r:LOTR|i:NORI'],
    [r+'ei']: ['a ' + g.pl, R+'|e:PL|i:NORI'],
    [r+'ren']: ['de ' + g.mug, R+'|r:LOTR|en:NOREN'],
    [r+'aren']: ['de ' + g.sg, R+'|a:DET|r:LOTR|en:NOREN'],
    [r+'en']: ['de ' + g.pl, R+'|e:PL|n:NOREN'],
    [r+'rentzat']: ['para ' + g.mug, R+'|r:LOTR|entzat:NORENTZAT'],
    [r+'arentzat']: ['para ' + g.sg, R+'|a:DET|r:LOTR|entzat:NORENTZAT'],
    [r+'entzat']: ['para ' + g.pl, R+'|e:PL|ntzat:NORENTZAT'],
    [r+'rekin']: ['con ' + g.mug, R+'|r:LOTR|ekin:NOREKIN'],
    [r+'arekin']: ['con ' + g.sg, R+'|a:DET|r:LOTR|ekin:NOREKIN'],
    [r+'ekin']: ['con ' + g.pl, R+'|e:PL|kin:NOREKIN'],
    [r+'tako']: ['de ' + g.mug + ' (lugar)', R+'|ta:TA|ko:NONGO'],
    [r+'ko']: ['de ' + g.sg + ' (lugar)', R+'|ko:NONGO'],
    [r+'etako']: ['de ' + g.pl + ' (lugar)', R+'|e:PL|ta:TA|ko:NONGO'],
    [r+'tan']: ['en ' + g.mug, R+'|ta:TA|n:NON'],
    [r+'an']: ['en ' + g.sg, R+'|an:NONSG'],
    [r+'etan']: ['en ' + g.pl, R+'|e:PL|ta:TA|n:NON'],
    [r+'tara']: ['a ' + g.mug + ' (dirección)', R+'|ta:TA|ra:NORA'],
    [r+'ra']: ['a ' + g.sg + ' (dirección)', R+'|ra:NORA'],
    [r+'etara']: ['a ' + g.pl + ' (dirección)', R+'|e:PL|ta:TA|ra:NORA'],
    [r+'tatik']: ['desde ' + g.mug, R+'|ta:TA|tik:NONDIK'],
    [r+'tik']: ['desde ' + g.sg, R+'|tik:NONDIK'],
    [r+'etatik']: ['desde ' + g.pl, R+'|e:PL|ta:TA|tik:NONDIK'],
    [r+'z']: ['con / de ' + g.mug + ' (medio)', R+'|z:INST'],
    [r+'az']: ['con / de ' + g.sg + ' (medio)', R+'|a:DET|z:INST'],
    [r+'ez']: ['con / de ' + g.pl + ' (medio)', R+'|e:PL|z:INST']
  });
}
declV('etxe', 'casa', { mug:'casa', sg:'la casa', pl:'las casas' });
W['etxean'] = ['en la casa, en casa', 'etxe=casa|an:NONSG'];
W['etxera'] = ['a casa', 'etxe=casa|ra:NORA'];
W['etxetik'] = ['desde casa', 'etxe=casa|tik:NONDIK'];
W['etxeko'] = ['de casa (de la casa)', 'etxe=casa|ko:NONGO'];

function declC(r, m, g){      // raíz en consonante: lagun (se intercala -e-)
  const R = r + '=' + m;
  set({
    [r]: [g.mug, R],
    [r+'a']: [g.sg, R+'|a:DET'],
    [r+'ak']: [[g.pl, R+'|ak:DETPL'], [g.sg + ' (agente, NORK)', R+'|a:DET|k:NORK']],
    [r+'ek']: [[g.pl + ' (agente, NORK)', R+'|e:PL|k:NORK'], [g.mug + ' (agente, NORK)', R+'|e:LOTE|k:NORK']],
    [r+'i']: ['a ' + g.mug, R+'|i:NORI'],
    [r+'ari']: ['a ' + g.sg, R+'|a:DET|r:LOTR|i:NORI'],
    [r+'ei']: ['a ' + g.pl, R+'|e:PL|i:NORI'],
    [r+'en']: [['de ' + g.pl, R+'|e:PL|n:NOREN'], ['de ' + g.mug, R+'|en:NOREN']],
    [r+'aren']: ['de ' + g.sg, R+'|a:DET|r:LOTR|en:NOREN'],
    [r+'entzat']: [['para ' + g.pl, R+'|e:PL|ntzat:NORENTZAT'], ['para ' + g.mug, R+'|entzat:NORENTZAT']],
    [r+'arentzat']: ['para ' + g.sg, R+'|a:DET|r:LOTR|entzat:NORENTZAT'],
    [r+'ekin']: [['con ' + g.pl, R+'|e:PL|kin:NOREKIN'], ['con ' + g.mug, R+'|ekin:NOREKIN']],
    [r+'arekin']: ['con ' + g.sg, R+'|a:DET|r:LOTR|ekin:NOREKIN'],
    [r+'etako']: [['de ' + g.pl + ' (lugar)', R+'|e:PL|ta:TA|ko:NONGO'], ['de ' + g.mug + ' (lugar)', R+'|e:LOTE|ta:TA|ko:NONGO']],
    [r+'eko']: ['de ' + g.sg + ' (lugar)', R+'|e:LOTE|ko:NONGO'],
    [r+'etan']: [['en ' + g.pl, R+'|e:PL|ta:TA|n:NON'], ['en ' + g.mug, R+'|e:LOTE|ta:TA|n:NON']],
    [r+'ean']: ['en ' + g.sg, R+'|e:LOTE|an:NONSG'],
    [r+'etara']: [['a ' + g.pl + ' (dirección)', R+'|e:PL|ta:TA|ra:NORA'], ['a ' + g.mug + ' (dirección)', R+'|e:LOTE|ta:TA|ra:NORA']],
    [r+'era']: ['a ' + g.sg + ' (dirección)', R+'|e:LOTE|ra:NORA'],
    [r+'etatik']: [['desde ' + g.pl, R+'|e:PL|ta:TA|tik:NONDIK'], ['desde ' + g.mug, R+'|e:LOTE|ta:TA|tik:NONDIK']],
    [r+'etik']: ['desde ' + g.sg, R+'|e:LOTE|tik:NONDIK'],
    [r+'ez']: [['con / de ' + g.pl + ' (medio)', R+'|e:PL|z:INST'], ['con / de ' + g.mug + ' (medio)', R+'|e:LOTE|z:INST']],
    [r+'az']: ['con / de ' + g.sg + ' (medio)', R+'|a:DET|z:INST']
  });
}
declC('lagun', 'amigo', { mug:'amigo', sg:'el amigo', pl:'los amigos' });
set({
  lagunik: ['ningún amigo (partitivo)', 'lagun=amigo|ik:PART'],
  lagunarengan: ['en el amigo (persona)', 'lagun=amigo|a:DET|r:LOTR|en:NOREN|gan:GAN'],
  lagunengan: ['en los amigos (personas)', 'lagun=amigo|e:PL|n:NOREN|gan:GAN'],
  lagunarengana: ['al amigo (a donde está)', 'lagun=amigo|a:DET|r:LOTR|en:NOREN|gana:GANA'],
  lagunengana: ['a los amigos (a donde están)', 'lagun=amigo|e:PL|n:NOREN|gana:GANA'],
  lagunarengandik: ['del amigo (desde él)', 'lagun=amigo|a:DET|r:LOTR|en:NOREN|gandik:GANDIK'],
  lagunengandik: ['de los amigos (desde ellos)', 'lagun=amigo|e:PL|n:NOREN|gandik:GANDIK']
});

/* ══ demostrativos (bloque 4) ══ */
function dem(sg, obl, pl, esSg, esPl){
  // sg: hau / hori / hura · obl: raíz oblicua hon / horr / har · pl: hau / hori / hai
  const S = sg + '=' + esSg, O = obl + '=' + esSg, P = pl + '=' + esSg;
  set({
    [sg]: [esSg, S],
    [pl+'ek']: [[esPl, P+'|ek:EK'], [esPl + ' (agente, NORK)', P+'|e:PL|k:NORK']],
    [obl+(obl==='har'?'k':'ek')]: [esSg + ' (agente, NORK)', obl==='har' ? O+'|k:NORK' : O+'|e:LOTE|k:NORK'],
    [obl+'i']: ['a ' + esSg, O+'|i:NORI'],
    [pl+'ei']: ['a ' + esPl, P+'|e:PL|i:NORI'],
    [obl+'en']: ['de ' + esSg, O+'|en:NOREN'],
    [pl+'en']: ['de ' + esPl, P+'|e:PL|n:NOREN'],
    [obl+'ekin']: ['con ' + esSg, O+'|ekin:NOREKIN'],
    [pl+'ekin']: ['con ' + esPl, P+'|e:PL|kin:NOREKIN'],
    [obl+(obl==='har'?'tan':'etan')]: ['en ' + esSg, obl==='har' ? O+'|ta:TA|n:NON' : O+'|e:LOTE|ta:TA|n:NON'],
    [pl+'etan']: ['en ' + esPl, P+'|e:PL|ta:TA|n:NON'],
    [obl+(obl==='har'?'tara':'etara')]: ['a ' + esSg + ' (dirección)', obl==='har' ? O+'|ta:TA|ra:NORA' : O+'|e:LOTE|ta:TA|ra:NORA'],
    [pl+'etara']: ['a ' + esPl + ' (dirección)', P+'|e:PL|ta:TA|ra:NORA'],
    [obl+(obl==='har'?'tatik':'etatik')]: ['desde ' + esSg, obl==='har' ? O+'|ta:TA|tik:NONDIK' : O+'|e:LOTE|ta:TA|tik:NONDIK'],
    [pl+'etatik']: ['desde ' + esPl, P+'|e:PL|ta:TA|tik:NONDIK'],
    [obl+(obl==='har'?'tako':'etako')]: ['de ' + esSg + ' (lugar)', obl==='har' ? O+'|ta:TA|ko:NONGO' : O+'|e:LOTE|ta:TA|ko:NONGO'],
    [pl+'etako']: ['de ' + esPl + ' (lugar)', P+'|e:PL|ta:TA|ko:NONGO']
  });
}
dem('hau', 'hon', 'hau', 'este, esto', 'estos, estas');
dem('hori', 'horr', 'hori', 'ese, eso', 'esos, esas');
dem('hura', 'har', 'hai', 'aquel, él / ella', 'aquellos, ellos / ellas');
W['haiek'] = [['aquellos, ellos / ellas', 'hai=aquel|ek:EK'], ['ellos / ellas (agente, NORK)', 'hai=aquel|e:PL|k:NORK']];
W['haiei'] = ['a ellos / a ellas', 'hai=aquel|e:PL|i:NORI'];
W['haien'] = ['de ellos, su', 'hai=aquel|e:PL|n:NOREN'];
W['haiekin'] = ['con ellos / ellas', 'hai=aquel|e:PL|kin:NOREKIN'];
W['hari'] = ['a él / a ella', 'har=aquel|i:NORI'];
W['haren'] = ['de él / de ella, su', 'har=aquel|en:NOREN'];
W['harekin'] = ['con él / con ella', 'har=aquel|ekin:NOREKIN'];
W['hark'] = ['él / ella (agente, NORK)', 'har=aquel|k:NORK'];
W['horrek'] = ['ese, eso (agente, NORK)', 'horr=ese|e:LOTE|k:NORK'];

/* ══ pronombres personales ══ */
function pron(p, es, gen){
  set({
    [p]: [es, p + '=' + es],
    [p+'k']: [es + ' (agente, NORK)', p + '=' + es + '|k:NORK'],
    [p+'ri']: ['a ' + (p==='ni'?'mí':p==='zu'?'ti':p==='gu'?'nosotros':p==='hi'?'ti':es), p + '=' + es + '|r:LOTR|i:NORI'],
    [p+'re']: [gen, p + '=' + es + '|re:NORENRE']
  });
  if (p !== 'hi') add(p+'rekin', ['con ' + (p==='ni'?'migo':p==='zu'?'tigo':'nosotros'), p + '=' + es + '|re:NORENRE|kin:NOREKIN']);
}
pron('ni', 'yo', 'mi, de mí'); pron('zu', 'tú / usted', 'tu, de ti'); pron('gu', 'nosotros', 'nuestro, de nosotros'); pron('hi', 'tú (familiar)', 'tu (familiar)');
W['zuri'] = [['a ti', 'zu=tú|r:LOTR|i:NORI'], ['blanco', 'zuri=blanco']];
set({
  zuek: ['vosotros / vosotras (NOR y NORK)', 'zu=tú|ek:EK'],
  zuei: ['a vosotros', 'zu=tú|e:PL|i:NORI'],
  zuen: ['vuestro, de vosotros', 'zu=tú|e:PL|n:NOREN'],
  zuekin: ['con vosotros', 'zu=tú|e:PL|kin:NOREKIN'],
  nirea: ['el mío, la mía', 'ni=yo|re:NORENRE|a:DET'],
  zurea: ['el tuyo, la tuya', 'zu=tú|re:NORENRE|a:DET'],
  zuretaz: ['de ti, sobre ti', 'zu=tú|re:NORENRE|taz:TAZ'],
  nigan: ['en mí', 'ni=yo|gan:GAN'], zugan: ['en ti', 'zu=tú|gan:GAN'],
  nigana: ['a mí (hacia mí)', 'ni=yo|gana:GANA'], zugana: ['a ti (hacia ti)', 'zu=tú|gana:GANA'],
  nigandik: ['de mí, desde mí', 'ni=yo|gandik:GANDIK'], zugandik: ['de ti, desde ti', 'zu=tú|gandik:GANDIK']
});

/* ══ nombres propios (bloque 7) ══ */
set({
  mikel: ['Mikel', 'Mikel'], mikelek: ['Mikel (agente)', 'Mikel|e:LOTE|k:NORK'], mikeli: ['a Mikel', 'Mikel|i:NORI'],
  mikelen: ['de Mikel', 'Mikel|en:NOREN'], mikelekin: ['con Mikel', 'Mikel|ekin:NOREKIN'], mikelena: ['el / la de Mikel', 'Mikel|en:NOREN|a:DET'],
  lupe: ['Lupe', 'Lupe'], lupek: ['Lupe (agente)', 'Lupe|k:NORK'], luperi: ['a Lupe', 'Lupe|r:LOTR|i:NORI'],
  luperen: ['de Lupe', 'Lupe|r:LOTR|en:NOREN'], luperekin: ['con Lupe', 'Lupe|r:LOTR|ekin:NOREKIN'],
  bilbo: ['Bilbao', 'Bilbo=Bilbao'], bilbok: ['Bilbao (agente)', 'Bilbo=Bilbao|k:NORK'], bilbori: ['a Bilbao', 'Bilbo=Bilbao|r:LOTR|i:NORI'],
  bilboren: ['de Bilbao (posesión)', 'Bilbo=Bilbao|r:LOTR|en:NOREN'], bilborekin: ['con Bilbao', 'Bilbo=Bilbao|r:LOTR|ekin:NOREKIN'],
  bilboko: ['de Bilbao', 'Bilbo=Bilbao|ko:NONGO'], bilbon: ['en Bilbao', 'Bilbo=Bilbao|n:NON'], bilbora: ['a Bilbao', 'Bilbo=Bilbao|ra:NORA'],
  bilbotik: ['desde Bilbao', 'Bilbo=Bilbao|tik:NONDIK'], bilbokoa: ['de Bilbao (soy / es de Bilbao)', 'Bilbo=Bilbao|ko:NONGO|a:DET'],
  bilbokoak: ['de Bilbao (plural)', 'Bilbo=Bilbao|ko:NONGO|ak:DETPL'],
  irun: ['Irun', 'Irun'], irunek: ['Irun (agente)', 'Irun|e:LOTE|k:NORK'], iruni: ['a Irun', 'Irun|i:NORI'],
  irunen: [['en Irun', 'Irun|e:LOTE|n:NON'], ['de Irun (posesión)', 'Irun|en:NOREN']], irunekin: ['con Irun', 'Irun|ekin:NOREKIN'],
  irungo: ['de Irun', 'Irun|go:NONGOG'], irunera: ['a Irun', 'Irun|e:LOTE|ra:NORA'], irundik: ['desde Irun', 'Irun|dik:NONDIKD'],
  zumarraga: ['Zumarraga', 'Zumarraga'], zumarragako: ['de Zumarraga', 'Zumarraga|ko:NONGO'],
  deba: ['Deba', 'Deba'], debako: ['de Deba', 'Deba|ko:NONGO'],
  zarautz: ['Zarautz', 'Zarautz'], zarauzko: ['de Zarautz (tz → z)', 'Zarauz=Zarautz|ko:NONGO'],
  aritz: ['Aritz', 'Aritz'], arizko: ['de Aritz (tz → z)', 'Ariz=Aritz|ko:NONGO'],
  donostia: ['San Sebastián', 'Donostia=San Sebastián'], donostian: ['en San Sebastián', 'Donostia=San Sebastián|n:NON'],
  donostiakoa: ['de San Sebastián (soy / es de)', 'Donostia=San Sebastián|ko:NONGO|a:DET'],
  koldok: ['Koldo (agente)', 'Koldo|k:NORK'], maialen: ['Maialen', 'Maialen'], bizkaia: ['Bizkaia', 'Bizkaia'], iparralde: ['el País Vasco del Norte', 'iparr=norte|alde=lado']
});

/* ══ interrogativos (bloque 8) ══ */
set({
  nor: ['quién · caso NOR', 'nor=quién'], nork: ['quién (agente) · caso NORK', 'nor=quién|k:NORK'], nori: ['a quién · caso NORI', 'nor=quién|i:NORI'],
  noren: ['de quién · caso NOREN', 'nor=quién|en:NOREN'], norekin: ['con quién (NOREKIN)', 'nor=quién|ekin:NOREKIN'],
  norentzat: ['para quién (NORENTZAT)', 'nor=quién|entzat:NORENTZAT'], norena: ['de quién (es)', 'nor=quién|en:NOREN|a:DET'],
  norengan: ['en quién (persona)', 'nor=quién|en:NOREN|gan:GAN'], norengana: ['a quién (hacia una persona)', 'nor=quién|en:NOREN|gana:GANA'],
  norengandik: ['de quién (desde una persona)', 'nor=quién|en:NOREN|gandik:GANDIK'],
  non: ['dónde (NON)', 'non=dónde'], nora: ['a dónde (NORA)', 'no=dónde|ra:NORA'], nondik: ['de dónde (NONDIK)', 'non=dónde|dik:NONDIKD'],
  nongo: ['de dónde (NONGO)', 'non=dónde|go:NONGOG'], nongoa: ['de dónde (eres / es)', 'non=dónde|go:NONGOG|a:DET'],
  nongoak: ['de dónde (sois / son)', 'non=dónde|go:NONGOG|ak:DETPL'],
  zer: ['qué', 'zer=qué'], zein: ['cuál, qué', 'zein=cuál'], noiz: ['cuándo', 'noiz=cuándo'], zenbat: ['cuánto', 'zenbat=cuánto'],
  nola: ['cómo', 'nola=cómo'], nolako: ['cómo (es), de qué clase', 'nola=cómo|ko:NONGO'], nolakoa: ['cómo (es)', 'nola=cómo|ko:NONGO|a:DET'],
  zergatik: ['por qué', 'zer=qué|gatik:GATIK'], zertarako: ['para qué', 'zer=qué|ta:TA|ra:NORA|ko:NONGO'],
  zenbatgarren: ['qué número (de orden)', 'zenbat=cuánto|garren:ORD'],
  galdetzaileak: ['los interrogativos', 'galde=pregunta|tzaile:LE|ak:DETPL'], galdetzailea: ['el interrogativo', 'galde=pregunta|tzaile:LE|a:DET']
});

/* ══ IZAN, UKAN y sus formas (bloques 9, 10) ══ */
set({
  izan: ['ser / estar; sido', 'izan=ser'], ukan: ['tener (auxiliar)', 'ukan=tener'],
  naiz: ['soy / estoy; (yo) he …', 'n:PNI|aiz:IZANR'], zara: ['eres / estás; has …', 'z:PZU|ara:IZANR'], da: ['es / está; ha …', 'd:P3|a:IZANR'],
  gara: ['somos / estamos', 'g:PGU|ara:IZANR'], zarete: ['sois / estáis', 'z:PZU|are:IZANR|te:PLTE'], dira: ['son / están; han …', 'd:P3|ira:IZANR'],
  nintzen: ['era / estaba (yo)', 'n:PNI|intz:IZANR|en:PAST'], zinen: ['eras / estabas', 'z:PZU|in:IZANR|en:PAST'], zen: ['era / estaba (él, ella)', 'z:P3PAST|en:PAST'],
  ginen: ['éramos', 'g:PGU|in:IZANR|en:PAST'], zineten: ['erais', 'z:PZU|in:IZANR|ete:PLTE|n:PAST'], ziren: ['eran', 'z:P3PAST|ir:PL3|en:PAST'],
  dut: ['(yo) lo tengo / lo he …', 'd:P3|u:UKANR|t:KT'], duzu: ['(tú) lo tienes / lo has …', 'd:P3|u:UKANR|zu:KZU'], du: ['(él) lo tiene / lo ha …', 'd:P3|u:UKANR'],
  dugu: ['lo tenemos / lo hemos …', 'd:P3|u:UKANR|gu:KGU'], duzue: ['lo tenéis / lo habéis …', 'd:P3|u:UKANR|zue:KZUE'], dute: ['lo tienen / lo han …', 'd:P3|u:UKANR|te:KTE'],
  nuen: ['(yo) lo tenía / lo había …', 'n:PNI|u:UKANR|en:PAST'], zenuen: ['(tú) lo tenías', 'zen:PZUPAST|u:UKANR|en:PAST'], zuen: ['(él) lo tenía', 'z:P3PAST|u:UKANR|en:PAST'],
  genuen: ['lo teníamos', 'gen:PGUPAST|u:UKANR|en:PAST'], zenuten: ['lo teníais', 'zen:PZUPAST|u:UKANR|te:PLTE|n:PAST'], zuten: ['lo tenían', 'z:P3PAST|u:UKANR|te:PLTE|n:PAST'],
  ditut: ['(yo) los tengo / los he …', 'd:P3|it:IT|u:UKANR|t:KT'], dituzu: ['(tú) los tienes / los has …', 'd:P3|it:IT|u:UKANR|zu:KZU'],
  ditu: ['(él) los tiene / los ha …', 'd:P3|it:IT|u:UKANR'], ditugu: ['los tenemos / los hemos …', 'd:P3|it:IT|u:UKANR|gu:KGU'],
  dituzue: ['los tenéis / los habéis …', 'd:P3|it:IT|u:UKANR|zue:KZUE'], dituzte: ['los tienen / los han …', 'd:P3|it:IT|u:UKANR|zte:PLZTE'],
  nituen: ['(yo) los tenía', 'n:PNI|it:IT|u:UKANR|en:PAST'], zenituen: ['(tú) los tenías', 'zen:PZUPAST|it:IT|u:UKANR|en:PAST'],
  zituen: ['(él) los tenía', 'z:P3PAST|it:IT|u:UKANR|en:PAST'], genituen: ['los teníamos', 'gen:PGUPAST|it:IT|u:UKANR|en:PAST'],
  zenituzten: ['los teníais', 'zen:PZUPAST|it:IT|u:UKANR|zte:PLZTE|n:PAST'], zituzten: ['los tenían', 'z:P3PAST|it:IT|u:UKANR|zte:PLZTE|n:PAST'],
  aditza: ['el verbo', 'aditz=verbo|a:DET'], aditz: ['verbo', 'aditz=verbo'], aspektua: ['el aspecto', 'aspektu=aspecto|a:DET'],
  trinkoak: ['sintéticos (de una sola palabra)', 'trinko=compacto|ak:DETPL'], perifrasiak: ['las perífrasis', 'perifrasi=perífrasis|ak:DETPL']
});

/* ══ verbos sintéticos (bloque 12) ══ */
function sint(forms){ Object.keys(forms).forEach(k => add(k, forms[k])); }
sint({
  egon: ['estar', 'egon=estar'], joan: ['ir; ido', 'joan=ir'], etorri: ['venir; venido', 'etorr=venir|i:PERF'], ibili: ['andar; andado', 'ibil=andar|i:PERF'],
  jakin: ['saber; sabido', 'jakin=saber'], eduki: ['tener; tenido', 'eduki=tener'],
  nago: ['estoy', 'n:PNI|ago:EGONR'], zaude: ['estás', 'z:PZU|aude:EGONR'], dago: ['está; hay', 'd:P3|ago:EGONR'], gaude: ['estamos', 'g:PGU|aude:EGONR'],
  zaudete: ['estáis', 'z:PZU|aude:EGONR|te:PLTE'], daude: ['están', 'd:P3|aude:EGONR'],
  noa: ['voy', 'n:PNI|oa:JOANR'], zoaz: ['vas', 'z:PZU|oaz:JOANR'], doa: ['va', 'd:P3|oa:JOANR'], goaz: ['vamos', 'g:PGU|oaz:JOANR'],
  zoazte: ['vais', 'z:PZU|oaz:JOANR|te:PLTE'], doaz: ['van', 'd:P3|oaz:JOANR'],
  nator: ['vengo', 'n:PNI|ator:ETORRIR'], zatoz: ['vienes', 'z:PZU|atoz:ETORRIR'], dator: ['viene', 'd:P3|ator:ETORRIR'], gatoz: ['venimos', 'g:PGU|atoz:ETORRIR'],
  zatozte: ['venís', 'z:PZU|atoz:ETORRIR|te:PLTE'], datoz: ['vienen', 'd:P3|atoz:ETORRIR'],
  nabil: ['ando', 'n:PNI|abil:IBILIR'], zabiltza: ['andas', 'z:PZU|abiltza:IBILIR'], dabil: ['anda', 'd:P3|abil:IBILIR'], gabiltza: ['andamos', 'g:PGU|abiltza:IBILIR'],
  zabiltzate: ['andáis', 'z:PZU|abiltza:IBILIR|te:PLTE'], dabiltza: ['andan', 'd:P3|abiltza:IBILIR'],
  dakit: ['(yo) sé', 'd:P3|aki:JAKINR|t:KT'], dakizu: ['(tú) sabes', 'd:P3|aki:JAKINR|zu:KZU'], daki: ['sabe', 'd:P3|aki:JAKINR'],
  dakigu: ['sabemos', 'd:P3|aki:JAKINR|gu:KGU'], dakizue: ['sabéis', 'd:P3|aki:JAKINR|zue:KZUE'], dakite: ['saben', 'd:P3|aki:JAKINR|te:KTE'],
  daukat: ['(yo) lo tengo', 'd:P3|auka:EDUKIR|t:KT'], daukazu: ['(tú) lo tienes', 'd:P3|auka:EDUKIR|zu:KZU'], dauka: ['lo tiene', 'd:P3|auka:EDUKIR'],
  daukagu: ['lo tenemos', 'd:P3|auka:EDUKIR|gu:KGU'], daukazue: ['lo tenéis', 'd:P3|auka:EDUKIR|zue:KZUE'], daukate: ['lo tienen', 'd:P3|auka:EDUKIR|te:KTE'],
  dauzkat: ['(yo) los tengo', 'd:P3|auzka:EDUKIR|t:KT'], dauzkazu: ['(tú) los tienes', 'd:P3|auzka:EDUKIR|zu:KZU'], dauzka: ['los tiene', 'd:P3|auzka:EDUKIR'],
  dauzkagu: ['los tenemos', 'd:P3|auzka:EDUKIR|gu:KGU'], dauzkazue: ['los tenéis', 'd:P3|auzka:EDUKIR|zue:KZUE'], dauzkate: ['los tienen', 'd:P3|auzka:EDUKIR|te:KTE'],
  badago: ['sí hay / sí está', 'ba:BA|d:P3|ago:EGONR'], badakizu: ['¿(lo) sabes? / sí sabes', 'ba:BA|d:P3|aki:JAKINR|zu:KZU'], badakit: ['sí (lo) sé', 'ba:BA|d:P3|aki:JAKINR|t:KT'],
  dezakezu: ['puedes (hacerlo)', 'd:P3|ezake:EZANR|zu:KZU']
});

/* ══ NOR-NORI y NOR-NORI-NORK (bloque 13) ══ */
set({
  zait: ['me (gusta, pasa…)', 'zai:ZAIR|t:KT'], zaizu: ['te (gusta…)', 'zai:ZAIR|zu:KZU'], zaio: ['le (gusta…)', 'zai:ZAIR|o:KO'],
  zaigu: ['nos (gusta…)', 'zai:ZAIR|gu:KGU'], zaizue: ['os (gusta…)', 'zai:ZAIR|zue:KZUE'], zaie: ['les (gusta…)', 'zai:ZAIR|e:KE'],
  zaizkit: ['me (gustan…)', 'zai:ZAIR|zki:ZKI|t:KT'], zaizkizu: ['te (gustan…)', 'zai:ZAIR|zki:ZKI|zu:KZU'], zaizkio: ['le (gustan…)', 'zai:ZAIR|zki:ZKI|o:KO'],
  zaizkigu: ['nos (gustan…)', 'zai:ZAIR|zki:ZKI|gu:KGU'], zaizkizue: ['os (gustan…)', 'zai:ZAIR|zki:ZKI|zue:KZUE'], zaizkie: ['les (gustan…)', 'zai:ZAIR|zki:ZKI|e:KE'],
  diot: ['(yo) se lo … (a él / ella)', 'd:P3|i:DAT|o:KO|t:KT'], dizut: ['(yo) te lo …', 'd:P3|i:DAT|zu:KZU|t:KT'], diet: ['(yo) se lo … (a ellos)', 'd:P3|i:DAT|e:KE|t:KT'],
  didazu: ['(tú) me lo …', 'd:P3|i:DAT|da:KT|zu:KZU'], diozu: ['(tú) se lo … (a él / ella)', 'd:P3|i:DAT|o:KO|zu:KZU'], diguzu: ['(tú) nos lo …', 'd:P3|i:DAT|gu:KGU|zu:KZU'],
  diezu: ['(tú) se lo … (a ellos)', 'd:P3|i:DAT|e:KE|zu:KZU'], dit: ['(él) me lo …', 'd:P3|i:DAT|t:KT'], dizu: ['(él) te lo …', 'd:P3|i:DAT|zu:KZU'],
  dio: ['(él) se lo … (a él / ella)', 'd:P3|i:DAT|o:KO'], digu: ['(él) nos lo …', 'd:P3|i:DAT|gu:KGU'], die: ['(él) se lo … (a ellos)', 'd:P3|i:DAT|e:KE'],
  dizue: ['(él) os lo …', 'd:P3|i:DAT|zue:KZUE'],
  dizugu: ['te lo … (nosotros)', 'd:P3|i:DAT|zu:KZU|gu:KGU'], diogu: ['se lo … (nosotros, a él)', 'd:P3|i:DAT|o:KO|gu:KGU'], diegu: ['se lo … (nosotros, a ellos)', 'd:P3|i:DAT|e:KE|gu:KGU'],
  didazue: ['me lo … (vosotros)', 'd:P3|i:DAT|da:KT|zue:KZUE'], diozue: ['se lo … (vosotros, a él)', 'd:P3|i:DAT|o:KO|zue:KZUE'],
  diguzue: ['nos lo … (vosotros)', 'd:P3|i:DAT|gu:KGU|zue:KZUE'], diezue: ['se lo … (vosotros, a ellos)', 'd:P3|i:DAT|e:KE|zue:KZUE'],
  didate: ['me lo … (ellos)', 'd:P3|i:DAT|da:KT|te:KTE'], dizute: ['te lo … (ellos)', 'd:P3|i:DAT|zu:KZU|te:KTE'], diote: ['se lo … (ellos, a él)', 'd:P3|i:DAT|o:KO|te:KTE'],
  digute: ['nos lo … (ellos)', 'd:P3|i:DAT|gu:KGU|te:KTE'], diete: ['se lo … (ellos, a ellos)', 'd:P3|i:DAT|e:KE|te:KTE'],
  dizkiot: ['(yo) se los … (a él / ella)', 'd:P3|i:DAT|zki:ZKI|o:KO|t:KT'], dizkizu: ['(él) te los …', 'd:P3|i:DAT|zki:ZKI|zu:KZU'],
  dizkigute: ['(ellos) nos los …', 'd:P3|i:DAT|zki:ZKI|gu:KGU|te:KTE']
});

/* ══ aspecto: participio, habitual, futuro (bloque 11) ══ */
function verb(part, stem, hab, fut, es){
  // part: participio · hab: [base, sufijo] del habitual · fut: [base, sufijo] del futuro
  const p = part.parts;
  if (!W[part.w]) add(part.w, [es + '; ' + (part.es || 'hecho'), p]);
  if (hab && !W[hab[0] + hab[1]]) add(hab[0] + hab[1], [es + ' (habitual)', hab[0] + '=' + es + '|' + hab[1] + ':HAB']);
  if (fut && !W[fut[0] + fut[1]]) add(fut[0] + fut[1], [es + ' (futuro)', fut[0] + '=' + es + '|' + fut[1] + ':FUT']);
}
[
  [{ w:'jan', parts:'jan=comer', es:'comido' }, ['ja','ten'], ['jan','go'], 'comer'],
  [{ w:'edan', parts:'edan=beber', es:'bebido' }, ['eda','ten'], ['edan','go'], 'beber'],
  [{ w:'egin', parts:'egin=hacer', es:'hecho' }, ['egi','ten'], ['egin','go'], 'hacer'],
  [{ w:'ikusi', parts:'ikus=ver|i:PERF', es:'visto' }, ['ikus','ten'], ['ikusi','ko'], 'ver'],
  [{ w:'etorri', parts:'etorr=venir|i:PERF', es:'venido' }, ['etor','tzen'], ['etorri','ko'], 'venir'],
  [{ w:'joan', parts:'joan=ir', es:'ido' }, ['joa','ten'], ['joan','go'], 'ir'],
  [{ w:'hartu', parts:'har=coger|tu:PERF', es:'cogido' }, ['har','tzen'], ['hartu','ko'], 'coger'],
  [{ w:'eman', parts:'eman=dar', es:'dado' }, ['ema','ten'], ['eman','go'], 'dar'],
  [{ w:'esan', parts:'esan=decir', es:'dicho' }, ['esa','ten'], ['esan','go'], 'decir'],
  [{ w:'erosi', parts:'eros=comprar|i:PERF', es:'comprado' }, ['eros','ten'], ['erosi','ko'], 'comprar'],
  [{ w:'ikasi', parts:'ikas=aprender|i:PERF', es:'aprendido' }, ['ikas','ten'], ['ikasi','ko'], 'aprender, estudiar'],
  [{ w:'bizi', parts:'bizi=vivir', es:'vivo' }, null, ['bizi','ko'], 'vivir'],
  [{ w:'irten', parts:'irten=salir', es:'salido' }, ['irte','ten'], ['irten','go'], 'salir'],
  [{ w:'atera', parts:'atera=salir, sacar', es:'salido' }, ['atera','tzen'], ['atera','ko'], 'salir, sacar'],
  [{ w:'iritsi', parts:'irits=llegar|i:PERF', es:'llegado' }, ['iris','ten'], ['iritsi','ko'], 'llegar'],
  [{ w:'heldu', parts:'hel=llegar|du:PERF', es:'llegado' }, ['hel','tzen'], ['heldu','ko'], 'llegar'],
  [{ w:'irakurri', parts:'irakurr=leer|i:PERF', es:'leído' }, ['irakur','tzen'], null, 'leer'],
  [{ w:'gustatu', parts:'gusta=gustar|tu:PERF', es:'gustado' }, ['gusta','tzen'], null, 'gustar'],
  [{ w:'ulertu', parts:'ulert=entender|u:PERF', es:'entendido' }, ['ulert','zen'], null, 'entender']
].forEach(a => verb(a[0], null, a[1], a[2], a[3]));
set({
  prestatu: ['preparar; preparado', 'presta=preparar|tu:PERF'], deitu: ['llamar; llamado', 'dei=llamada|tu:PERF'],
  erakutsi: ['enseñar, mostrar', 'erakuts=mostrar|i:PERF'], saldu: ['vender; vendido', 'sal=vender|du:PERF'], idatzi: ['escribir; escrito', 'idatz=escribir|i:PERF'],
  galdetu: ['preguntar; preguntado', 'galde=pregunta|tu:PERF'], erantzun: ['responder', 'erantzun=responder'], ekarri: ['traer; traído', 'ekarr=traer|i:PERF'],
  eskatu: ['pedir; pedido', 'eska=pedir|tu:PERF'], iruditu: ['parecer', 'irudi=parecer|tu:PERF'], ahaztu: ['olvidar; olvidado', 'ahaz=olvidar|tu:PERF'],
  gertatu: ['ocurrir; ocurrido', 'gerta=ocurrir|tu:PERF'], jarri: ['poner; puesto', 'jarr=poner|i:PERF'], etsi: ['rendirse', 'ets=rendirse|i:PERF'],
  lan: ['trabajo (lan egin = trabajar)', 'lan=trabajo'], hitz: ['palabra (hitz egin = hablar)', 'hitz=palabra'],
  nahi: ['querer (nahi izan)', 'nahi=querer'], behar: ['necesitar, tener que', 'behar=necesidad'], ahal: ['poder (ahal izan)', 'ahal=poder'],
  ari: ['estar (haciendo): ari izan', 'ari=ocupado en'], ezin: ['no poder', 'ezin=imposible'], balio: ['valor (balio izan = valer)', 'balio=valor'],
  uste: ['creencia (uste dut = creo)', 'uste=creencia'],
  jateko: ['para comer', 'ja=comer|teko:TEKO'], ikasteko: ['para estudiar', 'ikas=estudiar|teko:TEKO'], erostera: ['a comprar', 'eros=comprar|tera:TERA'],
  nekatuta: ['cansado/a', 'nekatu=cansar|ta:TAEG']
});

/* ══ negación, partitivo, subordinación (bloques 15, 19) ══ */
set({
  ez: ['no', 'ez:EZ'], ezta: ['tampoco (ez + da)', 'ez:EZ|ta=da'], bai: ['sí', 'bai=sí'], al: ['¿…? (pregunta sí / no)', 'al:AL'], ete: ['¿…? (pregunta, vizcaíno)', 'ete:AL'],
  ba: ['sí (ba-)', 'ba:BA'],
  dirurik: ['ningún dinero, nada de dinero', 'diru=dinero|rik:PART'], libururik: ['algún / ningún libro', 'liburu=libro|rik:PART'],
  arazorik: ['ningún problema', 'arazo=problema|rik:PART'], gauzarik: ['ninguna cosa', 'gauza=cosa|rik:PART'], etxerik: ['ninguna casa', 'etxe=casa|rik:PART'],
  gogorik: ['ningunas ganas', 'gogo=ganas|rik:PART'], eskerrik: ['gracias (eskerrik asko)', 'esker=gracia|rik:PART'],
  norbait: ['alguien', 'nor=quién|bait=algún'], zerbait: ['algo', 'zer=qué|bait=algún'], nonbait: ['en algún sitio', 'non=dónde|bait=algún'],
  noizbait: ['alguna vez', 'noiz=cuándo|bait=algún'], inor: ['nadie (con ez)', 'inor=nadie'], ezer: ['nada (con ez)', 'ezer=nada'], inon: ['en ningún sitio', 'inon=ningún sitio'],
  inoiz: ['nunca / alguna vez', 'inoiz=nunca'], sekula: ['nunca, jamás', 'sekula=jamás'],
  dela: ['que es / que está (da → de-la)', 'd:P3|e:IZANR|la:LA'], dudala: ['que (yo) lo tengo / he …', 'd:P3|u:UKANR|da:KT|la:LA'], dagoela: ['que está', 'd:P3|ago:EGONR|e:LOTE|la:LA'],
  naizela: ['que soy / estoy', 'n:PNI|aiz:IZANR|e:LOTE|la:LA'], zarela: ['que eres / estás', 'z:PZU|are:IZANR|la:LA'], direla: ['que son / están', 'd:P3|ire:IZANR|la:LA'],
  dagoen: ['(dónde / si) está', 'd:P3|ago:EGONR|en:NIND'], naizenean: ['cuando soy / vengo…', 'n:PNI|aiz:IZANR|enean:NEAN'], nagoelako: ['porque estoy', 'n:PNI|ago:EGONR|e:LOTE|lako:LAKO'],
  baduzu: ['si (lo) tienes / si quieres', 'ba:BAC|d:P3|u:UKANR|zu:KZU'], bazara: ['si eres / si estás', 'ba:BAC|z:PZU|ara:IZANR'],
  ezeztapena: ['la negación', 'ezezta=negar|pen:PEN|a:DET'], menderakuntza: ['la subordinación', 'mendera=someter|kuntza:PEN']
});

/* ══ grado, posposiciones, adverbios (bloques 6, 16) ══ */
set({
  handi: ['grande', 'handi=grande'], handia: ['(el) grande', 'handi=grande|a:DET'], handiak: ['los grandes', 'handi=grande|ak:DETPL'],
  handiagoa: ['más grande', 'handi=grande|ago:COMP|a:DET'], handiena: ['el más grande', 'handi=grande|en:SUP|a:DET'], handiegia: ['demasiado grande', 'handi=grande|egi:EXC|a:DET'],
  beroegi: ['demasiado caliente', 'bero=caliente|egi:EXC'], merkeegia: ['demasiado barato', 'merke=barato|egi:EXC|a:DET'], garestiegia: ['demasiado caro', 'garesti=caro|egi:EXC|a:DET'],
  oso: ['muy', 'oso=muy'], samar: ['bastante, algo', 'samar=algo'], samarra: ['bastante (…)', 'samarr=algo|a:DET'], nahiko: ['bastante', 'nahiko=bastante'], baino: ['que (comparación)', 'baino=que'],
  aurrean: ['delante', 'aurre=delantera|an:NONSG'], atzean: ['detrás', 'atze=trasera|an:NONSG'], gainean: ['encima', 'gain=parte de arriba|e:LOTE|an:NONSG'],
  azpian: ['debajo', 'azpi=parte de abajo|an:NONSG'], ondoan: ['al lado', 'ondo=lado|an:NONSG'], artean: ['entre', 'arte=espacio entre|an:NONSG'],
  barruan: ['dentro', 'barru=interior|an:NONSG'], kanpoan: ['fuera', 'kanpo=exterior|an:NONSG'], kanpo: ['fuera', 'kanpo=exterior'],
  inguruan: ['alrededor', 'inguru=entorno|an:NONSG'], erdian: ['en medio', 'erdi=medio|an:NONSG'], goian: ['arriba', 'goi=lo alto|an:NONSG'], behean: ['abajo', 'behe=lo bajo|an:NONSG'],
  urruti: ['lejos', 'urruti=lejos'], gertu: ['cerca', 'gertu=cerca'], arte: ['hasta', 'arte=hasta'], buruz: ['acerca de', 'buru=cabeza|z:INST'],
  batera: ['junto (con)', 'bat=uno|e:LOTE|ra:NORA'], gabe: ['sin', 'gabe=sin'], bidez: ['por medio de', 'bide=camino|z:INST'],
  hemen: ['aquí', 'hemen=aquí'], hor: ['ahí', 'hor=ahí'], han: ['allí', 'han=allí'], hona: ['(a) aquí', 'hona=hacia aquí'], horra: ['(a) ahí', 'horra=hacia ahí'], hara: ['(a) allí', 'hara=hacia allí'],
  hemendik: ['desde aquí', 'hemen=aquí|dik:NONDIKD'], hortik: ['desde ahí', 'hor=ahí|tik:NONDIK'], handik: ['desde allí', 'han=allí|dik:NONDIKD'],
  hemengo: ['de aquí', 'hemen=aquí|go:NONGOG'], horko: ['de ahí', 'hor=ahí|ko:NONGO'], hango: ['de allí', 'han=allí|go:NONGOG'],
  poliki: ['despacio', 'poliki=despacio'], astiro: ['despacio', 'astiro=despacio'], ozenki: ['en voz alta', 'ozen=sonoro|ki:KI'], zorionez: ['afortunadamente', 'zorion=felicidad|ez:INST'],
  batez: ['sobre (batez ere = sobre todo)', 'bat=uno|e:LOTE|z:INST'], ere: ['también, incluso', 'ere=también'], baita: ['también (baita… ere)', 'baita=también'],
  egurrezko: ['de madera', 'egurr=madera|ez:INST|ko:NONGO'], autobusez: ['en autobús', 'autobus=autobús|e:LOTE|z:INST'], oinez: ['a pie', 'oin=pie|e:LOTE|z:INST'],
  euskaraz: ['en euskera', 'euskara=euskera|z:INST'], moduz: ['de modo (zer moduz = qué tal)', 'modu=modo|z:INST'], igerian: ['nadando', 'igeri=nado|an:NONSG'],
  gaixorik: ['enfermo/a', 'gaixo=enfermo|rik:PART']
});

/* ══ números, hora, calendario (bloque 17) ══ */
set({
  bat: ['uno, una, un', 'bat=uno'], bi: ['dos', 'bi=dos'], hiru: ['tres', 'hiru=tres'], lau: ['cuatro', 'lau=cuatro'], bost: ['cinco', 'bost=cinco'],
  sei: ['seis', 'sei=seis'], zazpi: ['siete', 'zazpi=siete'], zortzi: ['ocho', 'zortzi=ocho'], bederatzi: ['nueve', 'bederatzi=nueve'], hamar: ['diez', 'hamar=diez'],
  hamaika: ['once', 'hamaika=once'], hamabi: ['doce', 'hama=diez y|bi=dos'], hamahiru: ['trece', 'hama=diez y|hiru=tres'], hamalau: ['catorce', 'hama=diez y|lau=cuatro'],
  hamabost: ['quince', 'hama=diez y|bost=cinco'], hamasei: ['dieciséis', 'hama=diez y|sei=seis'], hamazazpi: ['diecisiete', 'hama=diez y|zazpi=siete'],
  hemezortzi: ['dieciocho', 'heme=diez y|zortzi=ocho'], hemeretzi: ['diecinueve', 'heme=diez y|retzi=nueve'], hogei: ['veinte', 'hogei=veinte'],
  hogeita: ['veinti… (veinte y)', 'hogei=veinte|ta=y'], berrogei: ['cuarenta (dos veintes)', 'berr=dos|ogei=veinte'], berrogeita: ['cuarenta y', 'berr=dos|ogei=veinte|ta=y'],
  hirurogei: ['sesenta (tres veintes)', 'hirur=tres|ogei=veinte'], hirurogeita: ['sesenta y', 'hirur=tres|ogei=veinte|ta=y'],
  laurogei: ['ochenta (cuatro veintes)', 'laur=cuatro|ogei=veinte'], laurogeita: ['ochenta y', 'laur=cuatro|ogei=veinte|ta=y'],
  ehun: ['cien', 'ehun=cien'], berrehun: ['doscientos', 'berr=dos|ehun=cien'], hirurehun: ['trescientos', 'hirur=tres|ehun=cien'], mila: ['mil', 'mila=mil'], milioi: ['millón', 'milioi=millón'],
  lehen: ['primer, antes', 'lehen=primero'], lehenengo: ['primero', 'lehen=primero|engo=(ordinal)'], bigarren: ['segundo', 'bi=dos|garren:ORD'], hirugarren: ['tercero', 'hiru=tres|garren:ORD'],
  laugarren: ['cuarto', 'lau=cuatro|garren:ORD'], bosgarren: ['quinto', 'bos=cinco|garren:ORD'], seigarren: ['sexto', 'sei=seis|garren:ORD'], zazpigarren: ['séptimo', 'zazpi=siete|garren:ORD'],
  zortzigarren: ['octavo', 'zortzi=ocho|garren:ORD'], bederatzigarren: ['noveno', 'bederatzi=nueve|garren:ORD'], hamargarren: ['décimo', 'hamar=diez|garren:ORD'],
  ordu: ['hora', 'ordu=hora'], ordua: ['la hora', 'ordu=hora|a:DET'], bata: ['la una', 'bat=uno|a:DET'], biak: ['las dos', 'bi=dos|ak:DETPL'],
  hirurak: ['las tres', 'hiru=tres|r:LOTR|ak:DETPL'], laurak: ['las cuatro', 'lau=cuatro|r:LOTR|ak:DETPL'], bostak: ['las cinco', 'bost=cinco|ak:DETPL'],
  seiak: ['las seis', 'sei=seis|ak:DETPL'], zortziak: ['las ocho', 'zortzi=ocho|ak:DETPL'], laurden: ['cuarto (de hora)', 'laurden=cuarto'], erdi: ['medio, media', 'erdi=medio'],
  gutxi: ['poco; menos (en la hora)', 'gutxi=poco'], ordutan: ['a qué hora (zer ordutan)', 'ordu=hora|ta:TA|n:NON'],
  hiruretan: ['a las tres', 'hiru=tres|r:LOTR|e:PL|ta:TA|n:NON'], batean: ['a la una', 'bat=uno|e:LOTE|an:NONSG'], erdietan: ['y media (a las … y media)', 'erdi=medio|e:PL|ta:TA|n:NON'],
  asteko: ['de la semana', 'aste=semana|ko:NONGO'], egunak: ['los días', 'egun=día|ak:DETPL'], egun: ['día (egun on = buenos días)', 'egun=día'],
  astelehena: ['el lunes', 'aste=semana|lehen=primero|a:DET'], asteartea: ['el martes', 'aste=semana|arte=entre|a:DET'], asteazkena: ['el miércoles', 'aste=semana|azken=último|a:DET'],
  osteguna: ['el jueves', 'ostegun=jueves|a:DET'], ostirala: ['el viernes', 'ostiral=viernes|a:DET'], larunbata: ['el sábado', 'larunbat=sábado|a:DET'], igandea: ['el domingo', 'igande=domingo|a:DET'],
  hilabeteak: ['los meses', 'hilabete=mes|ak:DETPL'], urtarrila: ['enero', 'urtarril=enero|a:DET'], otsaila: ['febrero', 'otsail=febrero|a:DET'], martxoa: ['marzo', 'martxo=marzo|a:DET'],
  apirila: ['abril', 'apiril=abril|a:DET'], maiatza: ['mayo', 'maiatz=mayo|a:DET'], ekaina: ['junio', 'ekain=junio|a:DET'], uztaila: ['julio', 'uztail=julio|a:DET'],
  abuztua: ['agosto', 'abuztu=agosto|a:DET'], iraila: ['septiembre', 'irail=septiembre|a:DET'], urria: ['octubre', 'urri=octubre|a:DET'], azaroa: ['noviembre', 'azaro=noviembre|a:DET'],
  abendua: ['diciembre', 'abendu=diciembre|a:DET'], irailaren: ['de septiembre', 'irail=septiembre|a:DET|r:LOTR|en:NOREN'],
  gaur: ['hoy', 'gaur=hoy'], atzo: ['ayer', 'atzo=ayer'], bihar: ['mañana', 'bihar=mañana'], etzi: ['pasado mañana', 'etzi=pasado mañana'], orain: ['ahora', 'orain=ahora'],
  gero: ['luego, después', 'gero=luego'], beti: ['siempre', 'beti=siempre'], goizean: ['por la mañana', 'goiz=mañana|e:LOTE|an:NONSG'], arratsaldean: ['por la tarde', 'arratsalde=tarde|an:NONSG'],
  gauean: ['por la noche', 'gau=noche|e:LOTE|an:NONSG'], eguerdian: ['al mediodía', 'eguerdi=mediodía|an:NONSG'], egunero: ['cada día', 'egun=día|ero:ERO'], astero: ['cada semana', 'ast=semana|ero:ERO'],
  batzuetan: ['a veces', 'batzu=algunos|e:PL|ta:TA|n:NON'], maiz: ['a menudo', 'maiz=a menudo'], sarri: ['a menudo', 'sarri=a menudo'],
  astelehenean: ['el lunes (ese día)', 'astelehen=lunes|e:LOTE|an:NONSG'], astelehenetan: ['los lunes (cada lunes)', 'astelehen=lunes|e:PL|ta:TA|n:NON'],
  gaurko: ['de hoy', 'gaur=hoy|ko:NONGO'], urte: ['año', 'urte=año'], denbora: ['tiempo', 'denbora=tiempo'], berandu: ['tarde (con retraso)', 'berandu=tarde']
});

/* ══ léxico de los ejemplos ══ */
set({
  gizon: ['hombre', 'gizon=hombre'], gizona: ['el hombre', 'gizon=hombre|a:DET'], gizonak: [['el hombre (agente, NORK)', 'gizon=hombre|a:DET|k:NORK'], ['los hombres', 'gizon=hombre|ak:DETPL']],
  liburu: ['libro', 'liburu=libro'], liburua: ['el libro', 'liburu=libro|a:DET'], liburuak: [['los libros', 'liburu=libro|ak:DETPL'], ['el libro (agente, NORK)', 'liburu=libro|a:DET|k:NORK']],
  irakurtzen: ['leyendo (habitual)', 'irakur=leer|tzen:HAB'], zuria: ['(el / la) blanco/a', 'zuri=blanco|a:DET'],
  galdegaia: ['el foco (galdegaia)', 'galde=pregunta|gai=tema|a:DET'], galdegai: ['foco', 'galde=pregunta|gai=tema'],
  zu_: null
});
delete W['zu_'];
set({
  hotz: ['frío', 'hotz=frío'], hotza: ['el frío; frío', 'hotz=frío|a:DET'], su: ['fuego', 'su=fuego'], gauza: ['cosa', 'gauza=cosa'],
  xagu: ['ratoncito', 'xagu=ratoncito'], kaixo: ['hola', 'kaixo=hola'], ipuinxka: ['cuentecillo', 'ipuin=cuento|xka:TXO'], bihotz: ['corazón', 'bihotz=corazón'],
  hots: ['sonido', 'hots=sonido'], hotsak: ['los sonidos', 'hots=sonido|ak:DETPL'], itsaso: ['mar', 'itsaso=mar'], txakur: ['perro', 'txakur=perro'], zakur: ['perro', 'zakur=perro'],
  txarto: ['mal', 'txarto=mal'], eder: ['hermoso', 'eder=hermoso'], erre: ['quemar; fumar', 'erre=quemar'], baina: ['pero', 'baina=pero'],
  eta: ['y', 'eta=y'], letrak: ['las letras', 'letra=letra|k:DETPL'],
  izen: ['nombre', 'izen=nombre'], sintagma: ['sintagma', 'sintagma'], anaiaren: ['de (mi) hermano', 'anaia=hermano|r:LOTR|en:NOREN'], anaia: ['hermano', 'anaia=hermano'],
  herriko: ['del pueblo', 'herri=pueblo|ko:NONGO'], herritik: ['del pueblo (desde)', 'herri=pueblo|tik:NONDIK'], zahar: ['viejo', 'zahar=viejo'], zaharrak: ['los viejos', 'zaharr=viejo|ak:DETPL'],
  mugatua: ['determinado (con artículo)', 'mugatu=limitado|a:DET'], mugatu: ['determinado', 'mugatu=limitado'], mugagabea: ['indeterminado (sin artículo)', 'muga=límite|gabe=sin|a:DET'],
  mugagabe: ['indeterminado', 'muga=límite|gabe=sin'],
  neska: ['chica, la chica (-a orgánica)', 'neska=chica'], neskak: ['las chicas', 'neska=chica|k:DETPL'], eliza: ['iglesia', 'eliza=iglesia'], elizaren: ['de la iglesia', 'eliza=iglesia|r:LOTR|en:NOREN'],
  denda: ['tienda', 'denda=tienda'], ama: ['madre', 'ama=madre'], amak: ['(mi) madre (agente, NORK)', 'ama=madre|k:NORK'], amarengandik: ['de (mi) madre (desde ella)', 'ama=madre|r:LOTR|en:NOREN|gandik:GANDIK'],
  alaba: ['hija', 'alaba=hija'], hizkuntza: ['lengua', 'hizkuntza=lengua'], mutil: ['chico', 'mutil=chico'], mutila: ['el chico', 'mutil=chico|a:DET'],
  mutilak: [['los chicos', 'mutil=chico|ak:DETPL'], ['el chico (agente, NORK)', 'mutil=chico|a:DET|k:NORK']],
  batzuk: ['unos, unas', 'batzu=algunos|k:DETPL'], batek: ['uno (agente, NORK)', 'bat=uno|e:LOTE|k:NORK'], batzuekin: ['con unos', 'batzu=algunos|e:PL|kin:NOREKIN'],
  erakusleak: ['los demostrativos', 'erakus=mostrar|le:LE|ak:DETPL'], deklinabidea: ['la declinación', 'deklina=declinar|bide:BIDE|a:DET'],
  kasuak: ['los casos', 'kasu=caso|ak:DETPL'], 'banan-banan': ['uno a uno', 'banan=de uno en uno|banan=de uno en uno'],
  ura: ['el agua', 'ur=agua|a:DET'], edaten: ['bebiendo, bebo (habitual)', 'eda=beber|ten:HAB'], afaria: ['la cena', 'afari=cena|a:DET'],
  euskara: ['el euskera', 'euskara=euskera'], euskararen: ['del euskera', 'euskara=euskera|r:LOTR|en:NOREN'], giltza: ['llave', 'giltza=llave'],
  autoa: ['el coche', 'auto=coche|a:DET'], egunkaria: ['el periódico', 'egunkari=periódico|a:DET'], lanetik: ['del trabajo', 'lan=trabajo|e:LOTE|tik:NONDIK'],
  lanera: ['al trabajo', 'lan=trabajo|e:LOTE|ra:NORA'], mahaia: ['la mesa', 'mahai=mesa|a:DET'], mahaiaren: ['de la mesa', 'mahai=mesa|a:DET|r:LOTR|en:NOREN'],
  bizidunak: ['los seres vivos', 'bizi=vida|dun:DUN|ak:DETPL'], bereziak: ['especiales, propios', 'berezi=especial|ak:DETPL'],
  medikuarengana: ['al médico (a donde está)', 'mediku=médico|a:DET|r:LOTR|en:NOREN|gana:GANA'], medikura: ['*al médico (incorrecto)', 'mediku=médico|ra:NORA'],
  geltokia: ['la estación', 'geltoki=estación|a:DET'], pisua: ['el piso', 'pisu=piso|a:DET'],
  ikaslea: ['el / la estudiante', 'ikas=aprender|le:LE|a:DET'], ikasleak: ['los estudiantes', 'ikas=aprender|le:LE|ak:DETPL'],
  irakaslea: ['el / la profesor/a', 'irakas=enseñar|le:LE|a:DET'], kotxea: ['el coche', 'kotxe=coche|a:DET'], kotxe: ['coche', 'kotxe=coche'],
  dirua: ['el dinero', 'diru=dinero|a:DET'], arrazoia: ['la razón', 'arrazoi=razón|a:DET'], galderak: ['las preguntas', 'galdera=pregunta|k:DETPL'],
  arazoak: ['los problemas', 'arazo=problema|ak:DETPL'], altua: ['alto/a', 'altu=alto|a:DET'], filmak: ['las películas', 'film=película|ak:DETPL'],
  haurrei: ['a los niños', 'haurr=niño|e:PL|i:NORI'], gozokiak: ['los caramelos', 'gozoki=caramelo|ak:DETPL'], euria: ['la lluvia', 'euri=lluvia|a:DET'],
  gogoa: ['las ganas', 'gogo=ganas|a:DET'], kafea: ['el café', 'kafe=café|a:DET'], etxearen_: null
});
delete W['etxearen_'];
set({
  ohearen: ['de la cama', 'ohe=cama|a:DET|r:LOTR|en:NOREN'], bankuaren: ['del banco', 'banku=banco|a:DET|r:LOTR|en:NOREN'], bien: ['de los dos', 'bi=dos|en:NOREN'],
  poltsaren: ['del bolso', 'poltsa=bolso|r:LOTR|en:NOREN'], plazaren: ['de la plaza', 'plaza=plaza|r:LOTR|en:NOREN'], kalearen: ['de la calle', 'kale=calle|a:DET|r:LOTR|en:NOREN'],
  zenbakiak: ['los números', 'zenbaki=número|ak:DETPL'], ogia: ['el pan', 'ogi=pan|a:DET'], orduan: ['entonces', 'ordu=hora|an:NONSG'], azkenean: ['al final', 'azken=final|e:LOTE|an:NONSG'],
  aurretik: ['antes', 'aurre=delantera|tik:NONDIK'], ondoren: ['después', 'ondoren=después'], gainera: ['además', 'gain=encima|e:LOTE|ra:NORA'], ordea: ['sin embargo', 'ordea=sin embargo'],
  hala: ['así (hala ere = aun así)', 'hala=así'], berriz: ['en cambio; de nuevo', 'berriz=de nuevo'], beraz: ['por lo tanto', 'beraz=por lo tanto'],
  laburpena: ['el resumen', 'labur=corto|pen:PEN|a:DET'], izenondoak: ['los adjetivos', 'izen=nombre|ondo=junto a|ak:DETPL'], postposizioak: ['las posposiciones', 'postposizio=posposición|ak:DETPL'],
  gramatika: ['gramática', 'gramatika=gramática'], morfologia: ['morfología', 'morfologia=morfología'], maila: ['nivel', 'maila=nivel'], geruzak: ['las capas', 'geruza=capa|k:DETPL'],
  on: ['bueno (egun on = buenos días)', 'on=bueno'], arratsalde: ['tarde', 'arratsalde=tarde'], gabon: ['buenas noches', 'gabon=buenas noches'], agur: ['adiós', 'agur=adiós'],
  ondo: ['bien', 'ondo=bien'], asko: ['mucho', 'asko=mucho'], errepika: ['repetir', 'errepika=repetir'], mesedez: ['por favor', 'mesedez=por favor'],
  horregatik: ['por eso (ez horregatik = de nada)', 'horr=eso|e:LOTE|gatik:GATIK'], barkatu: ['perdona, perdón', 'barka=perdonar|tu:PERF'], zorionak: ['felicidades', 'zorion=felicidad|ak:DETPL'],
  zuzen: ['recto', 'zuzen=recto'], eskuinera: ['a la derecha', 'eskuin=derecha|e:LOTE|ra:NORA'], ezkerrera: ['a la izquierda', 'ezkerr=izquierda|e:LOTE|ra:NORA'],
  bakarka: ['a solas (título del método)', 'bakar=solo|ka=(modo)']
});

/* ══ notaciones de sufijos ══ */
set({
  '-a': ['el / la (artículo)', '-a:DET'], '-ak': [['los / las (plural)', '-ak:DETPL'], ['NORK singular: el / la (agente)', '-a:DET|k:NORK']],
  '-k': ['NORK (agente)', '-k:NORK'], '-(e)k': ['NORK (agente) sin artículo', '-(e):LOTE|k:NORK'], '-ek': [['NORK plural', '-e:PL|k:NORK'], ['NORK tras consonante', '-e:LOTE|k:NORK']],
  '-(r)i': ['NORI: a …', '-(r):LOTR|i:NORI'], '-ari': ['NORI singular: al / a la', '-a:DET|r:LOTR|i:NORI'], '-ei': ['NORI plural: a los / las', '-e:PL|i:NORI'],
  '-(r)en': ['NOREN: de …', '-(r):LOTR|en:NOREN'], '-aren': ['NOREN singular: del / de la', '-a:DET|r:LOTR|en:NOREN'],
  '-en': [['NOREN plural: de los / las', '-e:PL|n:NOREN'], ['superlativo: el más …', '-en:SUP']],
  '-(r)entzat': ['NORENTZAT: para …', '-(r):LOTR|entzat:NORENTZAT'], '-arentzat': ['para el / la', '-a:DET|r:LOTR|entzat:NORENTZAT'], '-entzat': ['para los / las', '-e:PL|ntzat:NORENTZAT'],
  '-(r)ekin': ['NOREKIN: con …', '-(r):LOTR|ekin:NOREKIN'], '-arekin': ['con el / la', '-a:DET|r:LOTR|ekin:NOREKIN'], '-ekin': ['con los / las', '-e:PL|kin:NOREKIN'],
  '-rekin': ['NOREKIN: con …', '-r:LOTR|ekin:NOREKIN'], '-ren': ['NOREN: de …', '-r:LOTR|en:NOREN'],
  '-(e)tako': ['NONGO sin artículo', '-(e):LOTE|ta:TA|ko:NONGO'], '-(e)ko': ['NONGO singular: de …', '-(e):LOTE|ko:NONGO'], '-etako': ['NONGO plural', '-e:PL|ta:TA|ko:NONGO'],
  '-(e)tan': ['NON sin artículo: en …', '-(e):LOTE|ta:TA|n:NON'], '-(e)an': ['NON singular: en el / la', '-(e):LOTE|an:NONSG'], '-etan': ['NON plural: en los / las', '-e:PL|ta:TA|n:NON'],
  '-(e)tara': ['NORA sin artículo', '-(e):LOTE|ta:TA|ra:NORA'], '-(e)ra': ['NORA singular: al / a la', '-(e):LOTE|ra:NORA'], '-etara': ['NORA plural', '-e:PL|ta:TA|ra:NORA'],
  '-(e)tatik': ['NONDIK sin artículo', '-(e):LOTE|ta:TA|tik:NONDIK'], '-(e)tik': ['NONDIK singular: desde el / la', '-(e):LOTE|tik:NONDIK'], '-etatik': ['NONDIK plural', '-e:PL|ta:TA|tik:NONDIK'],
  '-(e)z': ['instrumental sin artículo', '-(e):LOTE|z:INST'], '-az': ['instrumental singular', '-a:DET|z:INST'], '-ez': ['instrumental plural', '-e:PL|z:INST'],
  '-z': ['instrumental: medio, materia, tema', '-z:INST'], '-ik': ['partitivo', '-ik:PART'], '-rik': ['partitivo tras vocal', '-rik:PART'],
  '-ko': [['NONGO: de … (lugar, tiempo)', '-ko:NONGO'], ['futuro del verbo', '-ko:FUT']], '-go': [['NONGO tras -n / -l', '-go:NONGOG'], ['futuro tras -n', '-go:FUT']],
  '-tik': ['NONDIK: desde …', '-tik:NONDIK'], '-ra': ['NORA: a …', '-ra:NORA'], '-engan-': ['-gan-: casos de lugar con personas', '-engan-:GAN'],
  '-it-': ['objeto plural (ukan)', '-it-:IT'], '-zki-': ['objeto plural (con NORI)', '-zki-:ZKI'], '-u-': ['raíz de ukan', '-u-:UKANR'], '-zu': ['zuk / zuri: tú', '-zu:KZU'],
  '-ago': ['comparativo: más …', '-ago:COMP'], '-egi': ['excesivo: demasiado …', '-egi:EXC'], '-garren': ['ordinal', '-garren:ORD'], '-tar': ['de origen (-tar)', '-tar:TAR'],
  '-tu': ['participio', '-tu:PERF'], '-du': ['participio', '-du:PERF'], '-i': [['participio', '-i:PERF'], ['NORI: a …', '-i:NORI']],
  '-t(z)en': ['habitual', '-t(z)en:HAB'], '-tzen': ['habitual', '-tzen:HAB'], '-ten': ['habitual', '-ten:HAB'],
  '-(e)la': ['completiva: que …', '-(e)la:LA'], '-(e)n': ['interrogativa indirecta', '-(e)n:NIND'], '-(e)nean': ['temporal: cuando …', '-(e)nean:NEAN'],
  '-t(z)eko': ['finalidad: para …', '-t(z)eko:TEKO'], '-tzeko': ['finalidad: para …', '-tzeko:TEKO'], '-elako': ['causal: porque …', '-elako:LAKO'],
  '-tzera': ['a (hacer), con verbos de movimiento', '-tzera:TERA'], 'ba-': [['condicional: si …', 'ba-:BAC'], ['afirmativo (badago)', 'ba-:BA']],
  '-e-': [['letra de enlace', '-e-:LOTE'], ['plural dentro del caso', '-e-:PL']], '-ta-': ['enlace de los casos de lugar', '-ta-:TA'],
  '-t': ['nik / niri: yo, a mí', '-t:KT'], '-i-': ['hay un NORI en el auxiliar', '-i-:DAT'], '-o-': ['NORI hari: a él / ella', '-o-:KO'], 'd-': ['presente, 3.ª persona', 'd-:P3'],
  'da-': ['3.ª persona de izan', 'd:P3|a-:IZANR'], 'n-': ['ni: yo', 'n-:PNI'], 'z-': ['zu: tú / pasado 3.ª', 'z-:PZU'], 'g-': ['gu: nosotros', 'g-:PGU'],
  '-n': [['NON: en … (Bilbo-n)', '-n:NON'], ['participio (ja-n, egi-n)', '-n:PERF'], ['pasado (nue-n, zen)', '-n:PAST'], ['interrogativa indirecta (dagoe-n)', '-n:NIND']],
  '-en-en': ['intensivo: el más … de todos', '-en-en:SUP'],
  'nor-nork': ['verbo con NOR y NORK (ukan)', 'nor=quién|nork=quién (agente)'], 'nor-nori': ['verbo con NOR y NORI (zait)', 'nor=quién|nori=a quién'],
  'nor-nori-nork': ['verbo con NOR, NORI y NORK (diot)', 'nor=quién|nori=a quién|nork=quién (agente)']
});

/* ══ añadidos tras la prueba de cobertura ══ */
set({
  ikasgai: ['lección, unidad', 'ikas=aprender|gai=materia'],
  an: ['el día … (3an = el día 3)', 'an:NONSG'],
  'lehen(engo)': ['primer(o)', 'lehen=primero|(engo)=(ordinal)']
});
