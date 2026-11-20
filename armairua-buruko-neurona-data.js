/* ══ Armairua · Buruko neurona — catálogo genérico (⚠ Claude) ══════════════
   Escenas y personajes de la vida diaria para el motor de creación: el «vínculo
   con la realidad» de la red asociativa. Lo ha propuesto Claude el 2026-11-19
   (pendiente de revisar); las palabras son todas del Hiztegia · Bakarka
   (bakarka-hiztegia.json), por su lema, y la prueba datos/buruko-neurona
   comprueba que existan. Dos escenas siguen situaciones de Mintzamena.

   Expone el global var BURUKO_NEURONA (sin IIFE, como los demás ficheros de datos).

   escena  {id, eu, es, ic, lekua:[lemas], w:{nodo:peso}, hitzak:[lemas],
            rolak:[lemas animados], ereduak:[patrón…], iturria}
   patrón  {v: verbo, f: marco (nor · nork · nori · dio), y quién ocupa cada hueco:
            nork/nori/nor/norekin: 'P' protagonista · 'R' papel de la escena ·
            'F' otro personaje · 'O' objeto de la lista obj; lek: 'non'|'nora'|'nondik'}
   Los nodos de la red: f:<campo> y t:<subcategoría> del Hiztegia, e:<escena>,
   n:<etiqueta nueva> y k:esk (expresiones).                                    */
var BURUKO_NEURONA = {
  bertsioa: 1,
  iturria: '⚠ Claude · catálogo genérico propuesto el 2026-11-19, pendiente de revisar; palabras del Hiztegia · Bakarka',

  eszenak: [
    { id:'etxea', eu:'Etxean', es:'en casa', ic:'🏠', lekua:['etxe','sukalde','egongela','logela'],
      w:{'f:etx':1, 'f:fam':.6, 'f:jan':.5, 't:V10':.5, 't:V13':.5, 't:V9':.5},
      hitzak:['afari','gosari','bazkari','mahai','telebista','ohe','opari'], rolak:[],
      ereduak:[
        { v:'prestatu', f:'nork', nork:'P', nor:'O', obj:['afari','gosari','bazkari'], lek:'non' },
        { v:'jan', f:'nork', nork:'P', nor:'O', obj:['gosari','bazkari','afari'], lek:'non' },
        { v:'garbitu', f:'nork', nork:'P', nor:'O', obj:['sukalde','logela','mahai'] },
        { v:'eman', f:'dio', nork:'P', nori:'F', nor:'O', obj:['opari'] },
        { v:'ikusi', f:'nork', nork:'P', nor:'O', obj:['telebista'], lek:'non' },
        { v:'lo egin', f:'nork', nork:'P', lek:'non' }
      ] },
    { id:'denda', eu:'Dendan', es:'en la tienda', ic:'🛒', lekua:['denda'], iturria:'Mintzamena d01 · Janari-dendan',
      w:{'f:jan':.7, 'f:hiri':.5, 'f:lan':.3, 't:V2':1},
      hitzak:['ogi','esne','sagar','fruta','arrain','diru'], rolak:['dendari','saltzaile'],
      ereduak:[
        { v:'erosi', f:'nork', nork:'P', nor:'O', obj:['ogi','esne','sagar','fruta','arrain'], lek:'non' },
        { v:'ordaindu', f:'nork', nork:'P', nor:'O', obj:['ogi','fruta','arrain'] },
        { v:'eman', f:'dio', nork:'P', nori:'R', nor:'O', obj:['diru'] },
        { v:'saldu', f:'dio', nork:'R', nori:'P', nor:'O', obj:['ogi','fruta','arrain'] },
        { v:'joan', f:'nor', nor:'P', lek:'nora' }
      ] },
    { id:'jatetxea', eu:'Jatetxean', es:'en el restaurante', ic:'🍽️', lekua:['jatetxe'], iturria:'Mintzamena j04 · Eskaera hartu',
      w:{'f:jan':1, 'f:hiri':.4, 'f:lan':.3, 't:V10':1, 't:V2':.5},
      hitzak:['kafe','ardo','ur','postre','arrain','kontu','mahai'], rolak:['zerbitzari','sukaldari'],
      ereduak:[
        { v:'eskatu', f:'dio', nork:'P', nori:'R', nor:'O', obj:['kafe','ardo','ur','postre','arrain'] },
        { v:'ekarri', f:'nork', nork:'R', nor:'O', obj:['kafe','ardo','ur','postre','arrain'] },
        { v:'jan', f:'nork', nork:'P', nor:'O', obj:['arrain','postre'], lek:'non' },
        { v:'edan', f:'nork', nork:'P', nor:'O', obj:['kafe','ardo','ur'], lek:'non' },
        { v:'ordaindu', f:'nork', nork:'P', nor:'O', obj:['kontu'] }
      ] },
    { id:'osasuna', eu:'Anbulatorioan', es:'en el centro de salud', ic:'🩺', lekua:['anbulatorio','farmazia'],
      w:{'f:gorp':1, 'f:lan':.3, 'f:hiri':.3, 't:V4':.5},
      hitzak:['buru','sabel','hortz','eztarri','min','botika'], rolak:['mediku','erizain'],
      ereduak:[
        { v:'joan', f:'nor', nor:'P', lek:'nora' },
        { v:'ikusi', f:'nork', nork:'R', nor:'P' },
        { v:'galdetu', f:'dio', nork:'R', nori:'P' },
        { v:'erosi', f:'nork', nork:'P', nor:'O', obj:['botika'] }
      ] },
    { id:'ikastola', eu:'Ikastolan', es:'en la escuela', ic:'🏫', lekua:['ikastola','gela'],
      w:{'f:lan':.8, 'f:kult':.4, 't:V5':.6, 't:V6':.5},
      hitzak:['liburu','arkatz','boligrafo','mezu'], rolak:['irakasle','ikasle'],
      ereduak:[
        { v:'irakurri', f:'nork', nork:'P', nor:'O', obj:['liburu'], lek:'non' },
        { v:'idatzi', f:'nork', nork:'P', nor:'O', obj:['mezu'] },
        { v:'ikasi', f:'nork', nork:'P', lek:'non' },
        { v:'galdetu', f:'dio', nork:'P', nori:'R' },
        { v:'erantzun', f:'dio', nork:'R', nori:'P' },
        { v:'eman', f:'dio', nork:'R', nori:'P', nor:'O', obj:['liburu'] }
      ] },
    { id:'lana', eu:'Lanean', es:'en el trabajo', ic:'💼', lekua:['bulego','lantegi'],
      w:{'f:lan':1, 't:V13':.6, 't:V5':.5},
      hitzak:['lan','ordenagailu','mezu'], rolak:['lankide','nagusi'],
      ereduak:[
        { v:'lan egin', f:'nork', nork:'P', lek:'non' },
        { v:'deitu', f:'dio', nork:'P', nori:'R' },
        { v:'bidali', f:'nork', nork:'P', nor:'O', obj:['mezu'] },
        { v:'idatzi', f:'nork', nork:'P', nor:'O', obj:['mezu'] },
        { v:'hitz egin', f:'nork', nork:'P', norekin:'R' }
      ] },
    { id:'garraioa', eu:'Geltokian', es:'en la estación', ic:'🚉', lekua:['geltoki'],
      w:{'f:hiri':1, 't:V1':1, 't:V2':.3},
      hitzak:['tren','autobus','txartel'], rolak:['gidari','bidaiari'],
      ereduak:[
        { v:'hartu', f:'nork', nork:'P', nor:'O', obj:['tren','autobus'] },
        { v:'erosi', f:'nork', nork:'P', nor:'O', obj:['txartel'], lek:'non' },
        { v:'joan', f:'nor', nor:'P', lek:'nora' },
        { v:'etorri', f:'nor', nor:'P', lek:'nondik' }
      ] },
    { id:'herria', eu:'Herrian', es:'en el pueblo', ic:'🏘️', lekua:['herri','plaza','kale'],
      w:{'f:hiri':1, 'f:fam':.3, 't:V1':.6, 't:V14':.6},
      hitzak:[], rolak:['bizilagun','lagun'],
      ereduak:[
        { v:'ibili', f:'nor', nor:'P', lek:'non' },
        { v:'ikusi', f:'nork', nork:'P', nor:'R' },
        { v:'agurtu', f:'nork', nork:'P', nor:'R' },
        { v:'hitz egin', f:'nork', nork:'P', norekin:'R', lek:'non' }
      ] },
    { id:'aisia', eu:'Hondartzan', es:'en la playa o el monte', ic:'🏖️', lekua:['hondartza','mendi'],
      w:{'f:nat':1, 'f:kult':.5, 't:V14':.5, 't:V12':.4},
      hitzak:['eguzki','ur','baloi'], rolak:['lagun'],
      ereduak:[
        { v:'igeri egin', f:'nork', nork:'P', lek:'non' },
        { v:'ibili', f:'nor', nor:'P', lek:'non' },
        { v:'joan', f:'nor', nor:'P', norekin:'F', lek:'nora' },
        { v:'ikusi', f:'nork', nork:'P', nor:'O', obj:['eguzki'] }
      ] },
    { id:'telefonoa', eu:'Telefonoz', es:'al teléfono', ic:'📞', lekua:[],
      w:{'f:kult':.4, 'f:lan':.3, 'f:abs':.3, 't:V5':1},
      hitzak:['telefono','mezu'], rolak:[],
      ereduak:[
        { v:'deitu', f:'dio', nork:'P', nori:'F' },
        { v:'esan', f:'dio', nork:'P', nori:'F' },
        { v:'entzun', f:'nork', nork:'P', nor:'F' },
        { v:'bidali', f:'nork', nork:'P', nor:'O', obj:['mezu'] }
      ] },
    { id:'bulegoa', eu:'Udaletxean', es:'en el ayuntamiento', ic:'🏛️', lekua:['udaletxe','bulego'],
      w:{'f:lan':1, 'f:abs':.4, 't:V2':.6, 't:V5':.5},
      hitzak:['txartel'], rolak:['langile'],
      ereduak:[
        { v:'eskatu', f:'dio', nork:'P', nori:'R', nor:'O', obj:['txartel'] },
        { v:'eman', f:'dio', nork:'R', nori:'P', nor:'O', obj:['txartel'] },
        { v:'sinatu', f:'nork', nork:'P' },
        { v:'joan', f:'nor', nor:'P', lek:'nora' }
      ] },
    { id:'jaia', eu:'Jaian', es:'en la fiesta', ic:'🎉', lekua:['plaza'],
      w:{'f:kult':1, 'f:fam':.5, 't:V14':1, 't:V7':.5},
      hitzak:['jai','opari','musika','dantza'], rolak:['lagun'],
      ereduak:[
        { v:'dantza egin', f:'nork', nork:'P', norekin:'F', lek:'non' },
        { v:'abestu', f:'nork', nork:'P' },
        { v:'ospatu', f:'nork', nork:'P', nor:'O', obj:['jai'] },
        { v:'eman', f:'dio', nork:'P', nori:'F', nor:'O', obj:['opari'] },
        { v:'entzun', f:'nork', nork:'P', nor:'O', obj:['musika'] }
      ] }
  ],

  /* nombres propios genéricos: se declinan por regla (Ane-k, Jon-ek…) */
  izenak: [
    { id:'Ane', es:'persona modelo de las fichas' },
    { id:'Jon', es:'nombre genérico' },
    { id:'Miren', es:'nombre genérico' }
  ],
  familia: ['ama','aita','amona','aitona','anaia','ahizpa','arreba','neba','seme','alaba','lagun','bizilagun'],

  denbora: [
    { id:'egunero', es:'todos los días', w:{'t:AV2':1, 'f:den':.3}, aditza:'burutugabea', aldia:'orain' },
    { id:'gaur', es:'hoy', w:{'t:AV1':1, 'f:den':.3}, aditza:'partizipioa', aldia:'orain' },
    { id:'atzo', es:'ayer', w:{'t:AV1':1, 'f:den':.3}, aditza:'partizipioa', aldia:'lehen' },
    { id:'bihar', es:'mañana', w:{'t:AV1':1, 'f:den':.3}, aditza:'geroa', aldia:'orain' }
  ],
  unea: [
    { id:'goiz', eu:'goizean', es:'por la mañana' },
    { id:'eguerdi', eu:'eguerdian', es:'a mediodía' },
    { id:'arratsalde', eu:'arratsaldean', es:'por la tarde' },
    { id:'gau', eu:'gauean', es:'por la noche' }
  ],
  /* rasgos: el verbo que piden es parte de la gramática (izan carácter, egon estado, ukan dolor) */
  ezaugarriak: [
    { id:'alai', aditza:'izan', nodoa:'n:izaera', es:'alegre' },
    { id:'jator', aditza:'izan', nodoa:'n:izaera', es:'majo' },
    { id:'lasai', aditza:'izan', nodoa:'n:izaera', es:'tranquilo' },
    { id:'lotsati', aditza:'izan', nodoa:'n:izaera', es:'tímido' },
    { id:'altu', aditza:'izan', nodoa:'n:itxura', es:'alto' },
    { id:'gazte', aditza:'izan', nodoa:'n:itxura', es:'joven' },
    { id:'zahar', aditza:'izan', nodoa:'n:itxura', es:'mayor' },
    { id:'urduri', aditza:'egon', nodoa:'n:egoera', es:'nervioso' },
    { id:'triste', aditza:'egon', nodoa:'n:egoera', es:'triste' },
    { id:'haserre', aditza:'egon', nodoa:'n:egoera', es:'enfadado' },
    { id:'pozik', aditza:'egon', nodoa:'n:egoera', es:'contento' },
    { id:'buru', eu:'buruko mina', aditza:'ukan', nodoa:'f:gorp', es:'dolor de cabeza', hitzak:['buru','min'] }
  ],
  tonuak: [
    { id:'neutroa', es:'neutro', w:{} },
    { id:'adeitsua', es:'cortés', w:{'k:esk':1}, hitzak:['mesedez','eskerrik asko','kaixo!'] },
    { id:'kexatia', es:'de queja', w:{'k:esk':.4, 't:V7':.5, 't:V3':.4, 'n:egoera':.4} }
  ],
  /* etiquetas que no existen en el Hiztegia (propuesta): se aplican a los adjetivos de los rasgos */
  nodoBerriak: {
    'n:izaera': { es:'Carácter · va con izan' },
    'n:egoera': { es:'Estado · va con egon' },
    'n:itxura': { es:'Aspecto físico · va con izan' }
  },
  mailak: [
    { id:'A1', es:'vocabulario A1 de armairua' },
    { id:'A2', es:'A2 · Ostalaritza' },
    { id:'B1', es:'Bakarka 1' },
    { id:'B3', es:'Bakarka 3' }
  ],
  /* pasados que faltan en las tablas del Hiztegia (formas estándar, ⚠ Claude) */
  laguntzaileGehigarriak: [
    { eu:'nor-nori-nork (hari, iragana)', pers:['nik','zuk','hark','guk','zuek','haiek'], f:['nion','zenion','zion','genion','zenioten','zioten'] },
    { eu:'nor-nork (objeto pl., iragana)', pers:['nik','zuk','hark','guk','zuek','haiek'], f:['nituen','zenituen','zituen','genituen','zenituzten','zituzten'] },
    { eu:'egon (iragana)', pers:['ni','zu','hura','gu','zuek','haiek'], f:['nengoen','zeunden','zegoen','geunden','zeundeten','zeuden'] }
  ]
};
