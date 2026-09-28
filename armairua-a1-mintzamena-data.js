/* ══ Armairua · A1 · Mintzamena — «Modelos de conversaciones castellano-euskera» ══
   Eusko Jaurlaritza · Hezkuntza, Hizkuntza Politika eta Kultura Saila (Vitoria-Gasteiz,
   2015). Realizado por UZEI y aprobado por la Comisión de Terminología del Consejo
   Asesor del Euskera. Transcripción completa para estudio personal; el PDF original
   está en materialak/mintzamena/.

   Expone el global var A1_MINTZAMENA (sin IIFE; se carga con <script src> clásico
   antes de sus consumidores, igual que los demás ficheros de datos).

   Esquema:  b = bloques → s = situaciones → z = partes → r = filas
     bloque     {id, eu, es, ic, p, s:[…]}
     situación  {id, n, eu, es, p, z:[…]}
     parte      {h:[es, eu] título · w:1 lista de vocabulario · p página · r:[…]}
     fila       [es, eu]              frase; «\n» separa las variantes de una misma casilla
                {k, es, eu}           con columna clave (hora, número, medida…)
                {f:[es, eu], o:[…]}   casilla de sustitución: {0}, {1} son huecos y
                                      o[i] la lista de opciones [es, eu] del hueco i
                x: '…'                nota ⚠ (lo que no es literal del libro)
   p = página del libro · página del PDF = p + 1.                                     */
var A1_MINTZAMENA = {
  eu: 'Hizketa-ereduak',
  es: 'Modelos de conversaciones castellano-euskera',
  src: 'Eusko Jaurlaritza · Hezkuntza, Hizkuntza Politika eta Kultura Saila — «Modelos de conversaciones castellano-euskera» (Vitoria-Gasteiz, 2015). Elaborado por UZEI y aprobado por la Comisión de Terminología del Consejo Asesor del Euskera.',
  pdf: 'materialak/mintzamena/modelos-de-conversaciones.pdf',
  off: 1,
  laburdurak: [
    ['Ipar.', 'Iparraldea', 'euskera del País Vasco del Norte'],
    ['Bizk.', 'Bizkaiera', 'euskera vizcaíno'],
    ['Gip.', 'Gipuzkera', 'euskera guipuzcoano']
  ],
  oharrak: [
    'Son modelos abiertos, no normativos: cada frase se puede decir de otras maneras según el dialecto o la persona. Por eso a menudo hay más de una versión en euskera.',
    'Los dialectalismos van marcados: (Ipar.) Iparraldea, (Bizk.) vizcaíno, (Gip.) guipuzcoano.',
    'En las casillas de sustitución se elige una opción de cada columna: la primera en castellano va con la primera en euskera, y así sucesivamente.'
  ],
  b: []
};

/* ══ 1 · JARDUERA OROKORRAK · Actividades generales (pp. 17–40) ══ */
A1_MINTZAMENA.b.push({ id:'o', eu:'Jarduera orokorrak', es:'Actividades generales', ic:'💬', p:17, s:[

  { id:'o01', n:'01', eu:'Bezeroa agurtu', es:'Saludar al cliente o clienta', p:18, z:[
    { r:[
      ['¡Hola!', 'Kaixo!\nEup!'],
      ['Buenos días.', 'Egun on!'],
      ['Buenas tardes.', 'Arratsalde on!'],
      ['Buenas noches.', 'Gabon!\nGau on!'],
      ['Igualmente.', 'Bai eta zuri ere.'],
      ['Adiós.', 'Agur!\nAdio'],
      ['Que le vaya bien.', 'Izan ondo!\nIzan ongi!\nIzan ontsa! (Ipar.)\nOngi izan.\nOndo izan.'],
      ['Hasta siempre.', 'Ez adiorik!'],
      ['Hasta mañana.', 'Bihar arte.'],
      ['¡Hasta la vista!', 'Ikusi arte!'],
      ['¡Hasta la próxima!', 'Hurrengo arte!'],
      ['Hasta pronto.', 'Laster arte.'],
      ['Hasta luego.', 'Gero arte.'],
      { f:['Hasta el {0} que viene.', 'Hurrengo {0} arte.'], o:[[['martes','asteartea'], ['jueves','osteguna'], ['domingo','igandea']]] },
      ['Hasta la semana que viene.', 'Datorren astera arte.'],
      ['Me alegro mucho de verle.', 'Asko pozten nau zu ikusteak.'],
      ['Mucho gusto.', 'Pozten naiz.'],
      ['Tanto gusto.', 'Urte askotarako.'],
      ['Bienvenido / Bienvenida', 'Ongi etorri.'],
      ['¡Vaya usted con Dios!', 'Ondo joan!'],
      ['Que tenga buen viaje.', 'Bidaia ona izan.']
    ]}
  ]},

  { id:'o02', n:'02', eu:'Norbaitez galdetu', es:'Preguntar por alguien', p:19, z:[
    { r:[
      ['¿Qué tal?\n¿Qué tal está Ud.?', 'Zer moduz?\nZer moduz zaude?\nZelan zaude?'],
      { f:['¿Cómo está su {0}?', 'Zer moduz (dago) zure {0}?'], o:[[['padre','aita'], ['hija','alaba'], ['hermana','arreba / ahizpa'], ['primo','lehengusua'], ['tía','izeba']]] },
      ['¿En qué anda su hermano?', 'Zertan ari da zure anaia?\nZertan ari da zure neba?'],
      ['¿Todo en orden?\n¿Va todo bien?', 'Dena ondo?\nDena ongi?'],
      ['¿Alguna novedad?', 'Zer berri?\nEzer berririk bai?'],
      ['Muy bien, muchas gracias.\nTodo bien, muy agradecido.', 'Ondo, eskerrik asko.\nOngi, mila esker.\nOngi, esker anitz. (Ipar.)']
    ]},
    { h:['Parientes', 'Senitartekoak'], w:1, p:20, r:[
      ['Abuela', 'Amona\nAmama (Bizk.)'],
      ['Abuelo', 'Aitona\nAitita (Bizk.)'],
      ['Abuelos (abuelo y abuela)', 'Aitona-amonak\nAitita-amamak (Bizk.)'],
      ['Bisabuela', 'Birramona\nBirramama (Bizk.)'],
      ['Bisabuelo', 'Birraitona\nBirraitita (Bizk.)'],
      ['Cuñada', 'Koinata'],
      ['Cuñado', 'Koinatua'],
      ['Hermana', 'Arreba\nAhizpa'],
      ['Hermano', 'Anaia\nNeba (Bizk.)'],
      ['Hermanos (hermanos y hermanas)', 'Anai-arrebak\nNeba-arrebak (Bizk.)\nSenideak (Gip.)\nHaurrideak (Ipar.)'],
      ['Hija', 'Alaba'],
      ['Hijo', 'Semea'],
      ['Hijos (hijos e hijas)', 'Seme-alabak'],
      ['Madre', 'Ama'],
      ['Marido\nEsposo', 'Senarra\nGizona'],
      ['Mujer\nEsposa', 'Andrea\nEmaztea'],
      ['Nieto / Nieta', 'Biloba'],
      ['Nuera', 'Erraina'],
      ['Padre', 'Aita'],
      ['Padres (padre y madre)', 'Gurasoak'],
      ['Prima', 'Lehengusina (Bizk.)'],
      ['Primo / Prima', 'Lehengusua'],
      ['Primos (primos y primas)', 'Lehengusu-lehengusinak\nLehengusuak'],
      ['Sobrino / Sobrina', 'Iloba'],
      ['Suegra', 'Amaginarreba'],
      ['Suegro', 'Aitaginarreba'],
      ['Tía', 'Izeba\nIzeko (Bizk.)'],
      ['Tío', 'Osaba'],
      ['Yerno', 'Suhia']
    ]}
  ]},

  { id:'o03', n:'03', eu:'Denbora kronologikoa', es:'El tiempo cronológico', p:22, z:[
    { r:[
      ['¿Qué hora es, por favor?', 'Zer ordu da, mesedez?'],
      ['¿Me podría decir la hora que es?', 'Esango al didazu zer ordu den?'],
      ['¿Tiene usted hora?', 'Ba al duzu ordurik?'],
      ['Es la una de la tarde (en punto).', 'Ordu bata da (puntuan).\nOrdu bata da (puntu-puntuan).'],
      ['Son las cuatro y cuarto.', 'Laurak eta laurden dira.\nLau eta laurdenak dira.'],
      ['Son las once y media.', 'Hamaika eta erdiak dira.'],
      ['Sí, son las tres menos cinco.', 'Bai, hirurak bost gutxi dira.'],
      ['Son las diez de la mañana.', 'Goizeko hamarrak dira.'],
      ['Son las cinco de la tarde.', 'Arratsaldeko bostak dira.'],
      ['¿A qué hora es el autobús?', 'Zer ordutan da autobusa?'],
      ['¿A qué hora abren por la tarde?', 'Zer ordutan irekitzen dute arratsaldean?'],
      { f:['¿A qué hora cierra {0}?', 'Zer ordutan ixten dute {0}?'], o:[[['la taquilla','leihatila'], ['la peluquería','ile-apaindegia'], ['el restaurante','jatetxea'], ['el bar','taberna'], ['el servicio de información','informazio-zerbitzua']]] },
      { f:['¿A qué hora comenzará {0}?', 'Zein ordutan hasiko da {0}?'], o:[[['la degustación de productos','produktuen dastaketa'], ['el congreso de máquina herramienta','makina-erremintaren biltzarra'], ['la asamblea de socios','bazkideen bilera']]] },
      ['El espectáculo comienza a las cinco.', 'Ikuskizuna bostetan hastekoa da.'],
      ['La próxima película empezará a las seis y media.', 'Hurrengo filma sei eta erdietan hasiko da.'],
      ['No, vendrán a las siete y media.', 'Ez, zazpi eta erdietan etorriko dira.'],
      ['No cerramos al mediodía.', 'Ez dugu eguerdian ixten.'],
      ['Las tiendas cierran al mediodía.', 'Dendak itxita daude eguerdian.'],
      ['¿Cuánto tiempo necesita usted para sacar el dinero?', 'Zenbat denbora behar duzu dirua ateratzeko?'],
      ['En una hora aproximadamente le puedo preparar lo que me ha pedido.', 'Ordubetean prestatuko dizut, gutxi gorabehera, zuk eskatutakoa.'],
      ['Sí, hace tres meses que hizo usted el pedido.', 'Bai, duela hiru hilabete egin zenuen eskaera.'],
      ['Desde hace dos semanas ya está preparado lo que nos pidió.', 'Badira bi aste zuk eskatutakoa prest dagoela.'],
      { f:['Tenemos {0}.', 'Denbora {0} daukagu.'], o:[[['mucho tiempo','asko'], ['tiempo de sobra','soberan'], ['poco tiempo','gutxi']]] },
      ['No tengo tiempo.', 'Ez daukat astirik.'],
      ['No, todavía no, el sorteo se celebrará dentro de un mes.', 'Ez, oraindik ez, zozketa hilabete barru izango da.'],
      ['No, las rebajas fueron el mes pasado.', 'Ez, merkealdia lehengo hilean izan zen.'],
      ['Sí, me acuerdo perfectamente que vino el jueves pasado a comprar eso.', 'Bai, gogoratzen naiz joan den ostegunean etorri zinela hori erostera.'],
      ['El lunes por la mañana el centro de estética suele estar cerrado.', 'Astelehen-goizetan itxita egoten da estetika-zentroa.'],
      ['El año pasado vendimos muchísimo.', 'Joan zen urtean asko saldu genuen.'],
      ['Cogeremos vacaciones la segunda quincena de setiembre.', 'Iraileko bigarren hamabostaldian hartuko ditugu oporrak.'],
      ['En verano no trabajamos los sábados por la tarde.', 'Udan ez dugu larunbat-arratsaldeetan lanik egiten.'],
      ['Sí, en invierno abrimos mañana y tarde.', 'Bai, neguan bai, goizez eta arratsaldez irekitzen dugu.'],
      ['A pesar de ser verano, abrimos la tienda los domingos porque vienen muchos turistas.', 'Uda izan arren, igandeetan ere irekitzen dugu denda, turista asko etortzen da eta.']
    ]},
    { h:['La hora · ¿Qué hora es?', 'Ordua · Zer ordu da?'], p:24, r:[
      { k:'11:00', es:'Son las once (en punto).', eu:'Hamaikak dira.\nHamaikak puntuan dira.' },
      { k:'11:05', es:'Son las once y cinco (minutos).', eu:'Hamaikak eta bost dira.' },
      { k:'11:10', es:'Son las once y diez (minutos).', eu:'Hamaikak eta hamar dira.' },
      { k:'11:15', es:'Son las once y cuarto.', eu:'Hamaikak eta laurden dira.\nHamaika eta laurdenak dira.' },
      { k:'11:30', es:'Son las once y media.', eu:'Hamaika eta erdiak dira.' },
      { k:'11:35', es:'Son las once y treinta y cinco (minutos).\nSon las doce menos veinticinco (minutos).', eu:'Hamabiak hogeita bost gutxi dira.' },
      { k:'11:40', es:'Son las doce menos veinte (minutos).', eu:'Hamabiak hogei gutxi(ago) dira.' },
      { k:'11:45', es:'Son las doce menos cuarto.\nSon las once y tres cuartos.', eu:'Hamabiak laurden gutxi(ago) dira.' },
      { k:'12:00', es:'Son las doce (en punto).\nSon las doce del mediodía.', eu:'Hamabiak dira (puntu-puntuan).\nHamabi-hamabiak dira.\nEguerdiko hamabiak dira.' },
      { k:'13:00', es:'Es la una del mediodía.', eu:'Eguerdiko ordubata da.' },
      { k:'15:00', es:'Son las tres de la tarde.', eu:'(Arratsaldeko) hirurak dira.' },
      { k:'16:00', es:'Son las cuatro de la tarde.', eu:'(Arratsaldeko) laurak dira.' },
      { k:'24:00', es:'Son las doce de la noche.\nEs medianoche.', eu:'Gaueko hamabiak dira (puntuan).\nGaueko hamabi-hamabiak dira.\nGauerdia da.' }
    ]},
    { h:['¿A qué hora?', 'Zer ordutan?'], p:24, r:[
      { k:'08:20', es:'A las ocho y veinte.\nA las ocho y veinte de la mañana.', eu:'Zortziak eta hogeian.\nGoizeko zortziak eta hogeian.' },
      { k:'09:30', es:'A las nueve y media (de la mañana).', eu:'Bederatzi eta erdietan.\nGoizeko bederatzi eta erdietan.' },
      { k:'16:05', es:'A las cuatro y cinco (de la tarde).', eu:'Arratsaldeko laurak eta bostean.\nHamaseiak eta bostean.' },
      { k:'17:45', es:'A las seis menos cuarto.', eu:'Arratsaldeko seiak laurden gutxi(ago)tan.\nHamazazpiak eta berrogeita bostean.' },
      { k:'22:10', es:'A las diez y diez (minutos) (de la noche).\nA las veintidós horas y diez (minutos).', eu:'Gaueko hamarrak eta hamarrean.\nHogeita bi eta hamarrean.' },
      { k:'23:45', es:'A las doce menos cuarto de la noche.', eu:'Gaueko hamabiak laurden gutxi(ago)tan.' }
    ]},
    { h:['¿Desde qué hora a qué hora?', 'Zer ordutatik zer ordutara?'], p:25, r:[
      { k:'09:00 - 13:30', es:'De nueve de la mañana a una y media (del mediodía).', eu:'Goizeko bederatzietatik eguerdiko ordu bat eta erdietara.' },
      { k:'11:15 - 11:45', es:'De once y cuarto a doce menos cuarto.', eu:'Hamaikak eta laurdenetatik hamabiak laurden gutxi(ago)tara.' },
      { k:'08:00 - 21:30', es:'De ocho de la mañana a nueve y media de la noche.', eu:'(Goizeko) zortzietatik gaueko bederatzi eta erdietara.' },
      { k:'10:00 - 14:00; 16:00 - 22:00', es:'De diez de la mañana a dos del mediodía y de cuatro de la tarde a diez de la noche.', eu:'Goizeko hamarretatik eguerdiko ordu bietara eta arratsaldeko lauretatik gaueko hamarretara.' },
      { k:'13:30 - 16:00', es:'De una y media del mediodía a cuatro de la tarde.', eu:'(Eguerdiko) Ordu bat eta erdietatik arratsaldeko lauretara.' },
      { k:'20:30 - 23:00', es:'De ocho y media de la tarde a once de la noche.', eu:'(Arratsaldeko) zortzi eta erdietatik gaueko hamaiketara.' }
    ]},
    { h:['Fecha', 'Data'], p:25, r:[
      { k:'2005-07-07', es:'Siete de julio de dos mil cinco.', eu:'Bi mila eta bosteko uztailaren zazpia.' },
      { k:'2007-12-25', es:'Veinticinco de diciembre de dos mil siete.', eu:'Bi mila eta zazpiko abenduaren hogeita bosta.' },
      { k:'1983-10-01', es:'Uno de octubre de mil novecientos ochenta y tres.', eu:'Mila bederatziehun eta laurogeita hiruko urriaren bata.' },
      { k:'1990-06-26', es:'Veintiséis de junio de mil novecientos noventa.', eu:'Mila bederatziehun eta laurogeita hamarreko ekainaren hogeita seia.' }
    ]},
    { h:['Días de la semana', 'Asteko egunak'], w:1, p:26, r:[
      ['Lunes', 'Astelehena'], ['Martes', 'Asteartea'], ['Miércoles', 'Asteazkena'], ['Jueves', 'Osteguna'],
      ['Viernes', 'Ostirala'], ['Sábado', 'Larunbata'], ['Domingo', 'Igandea']
    ]},
    { h:['Meses', 'Hilak'], w:1, p:26, r:[
      ['Enero', 'Urtarrila'], ['Febrero', 'Otsaila'], ['Marzo', 'Martxoa'], ['Abril', 'Apirila'],
      ['Mayo', 'Maiatza'], ['Junio', 'Ekaina'], ['Julio', 'Uztaila'], ['Agosto', 'Abuztua'],
      ['Septiembre', 'Iraila'], ['Octubre', 'Urria'], ['Noviembre', 'Azaroa'], ['Diciembre', 'Abendua']
    ]},
    { h:['Estaciones del año', 'Urte-sasoiak'], w:1, p:26, r:[
      ['Invierno', 'Negua'], ['Verano', 'Uda'], ['Primavera', 'Udaberria'], ['Otoño', 'Udazkena']
    ]},
    { h:['Temporalización', 'Tenporalizazioa'], w:1, p:27, r:[
      ['Anochecer', 'Iluntzea'], ['Madrugada', 'Goizaldea'], ['Mañana', 'Goiza'], ['Mediodía', 'Eguerdia'],
      ['Noche', 'Gaua'], ['Tarde', 'Arratsaldea'], ['Anteayer', 'Herenegun'], ['Ayer', 'Atzo'],
      ['Hoy', 'Gaur'], ['Mañana', 'Bihar'], ['Pasado mañana', 'Etzi']
    ]}
  ]},

  { id:'o04', n:'04', eu:'Eguraldia', es:'El tiempo (meteorológico)', p:27, z:[
    { r:[
      ['¿Qué tiempo hace hoy?', 'Zer eguraldi egiten du gaur?\nZer eguraldi dago gaur?'],
      ['Hoy hace buen día.', 'Gaur eguraldi ederra dago.'],
      ['Hace un tiempo muy seco.', 'Oso eguraldi lehorra dago.'],
      ['¡Qué día más bueno hace hoy!', 'A zer eguraldia egiten duen!'],
      ['La temperatura de hoy es muy agradable.', 'Tenperatura oso atsegina da gaur.\nOso tenperatura atsegina dago gaur.'],
      ['Hace viento.', 'Haizea dabil.'],
      ['Sí, cae un sirimiri.\nEstá cayendo sirimiri.\nEstá lloviznando.', 'Zirimiria ari du.\nZirimiria egiten du.'],
      ['Ha empezado a llover.', 'Euria hasi du.'],
      ['Sí, empieza a hacer frío.', 'Bai, hozten hasi du.'],
      ['Sí, mejor que se ponga la chaqueta, porque ha refrescado.', 'Bai, hobe jaka janztea, freskatu egin du eta.'],
      { f:['{0}.', '{0} dago.'], o:[[['Hay niebla','Lainoa / Behe-lainoa'], ['Hay muchas nubes','Hodei asko'], ['Está nublado','Lainotuta'], ['Ha escampado','Ateri']]] },
      { f:['Hoy hace {0} {1}.', 'Gaur {1} {0} egiten du.'], o:[[['un poco de','apur bat'], ['mucho','handia'], ['poco','gutxi']], [['frío','hotz'], ['calor','bero']]] },
      { f:['Hoy no hace {0}.', 'Gaur ez du {0} egiten.'], o:[[['frío','hotzik'], ['calor','berorik'], ['viento','haizerik']]] },
      { f:['Hoy no hace nada de {0}.', 'Gaur ez du batere {0} egiten.'], o:[[['frío','hotzik'], ['calor','berorik'], ['viento','haizerik']]] },
      ['¡Uff! ¡Qué calor!\nVaya bochorno que hace hoy.', 'Ufa! Hau da beroa!\nA zer sargoria gaurkoa!'],
      ['¡Qué tiempo tan desapacible tenemos hoy!', 'Ze(in) eguraldi zakarra dagoen gaur!'],
      ['Parece que va a llover.', 'Euria egingo duela dirudi.\nEuria dakar.'],
      ['Ha tronado.\nHa habido relámpagos.', 'Trumoia jo du.\nTximistak jo du.'],
      ['Ha granizado.', 'Harria egin du.\nTxingorra egin du.\nKazkabarra bota du.'],
      ['Vaya manera de granizar.', 'Hori da kazkabarra botatzea, hori!'],
      ['Tenemos un clima de lo más variable.\nAhora llueve, y luego sale el sol.', 'Oso eguraldi aldakorra daukagu.\nOrain euria, eta gero eguzkia.'],
      ['¿Cree usted que hoy va a llover?', 'Euria egingo duela uste al duzu?'],
      ['Cada vez está más nublado.', 'Gero eta lainotuago dago.'],
      ['Vaya niebla que hay. No se ve nada.', 'Hori da behe-lainoa, hori. Ez da ezertxo ere ikusten.'],
      ['Mañana el cielo estará nublado.', 'Bihar zerua lainotuta egongo da.'],
      ['Yo creo que va a nevar.', '(Nik) uste dut elurra egingo duela.'],
      ['En la televisión han dicho que va a caer una nevada.', 'Elurra botako duela esan dute telebistan.']
    ]}
  ]},

  { id:'o05', n:'05', eu:'Helbide edo leku batera nola joan adierazi', es:'Señalar cómo se va a un sitio o dirección concretos', p:29, z:[
    { r:[
      { f:['Perdone, ¿sabe usted dónde está {0}?', 'Barkatu, ba al dakizu non dagoen {0}?'], o:[[['la carretera','errepidea'], ['la plaza','plaza'], ['el parque','parkea'], ['el polígono industrial','industrialdea']]] },
      ['No, no sé dónde está el polígono industrial.', 'Ez, ez dakit non dagoen industrialdea.'],
      ['Sí, pero está (muy) lejos de aquí.', 'Bai, baina hemendik oso urruti dago.'],
      ['Sí, está muy cerca de aquí.', 'Bai, hemendik oso hurbil dago.'],
      { f:['¿Dónde se encuentra {0}?', 'Non dago {0}?'], o:[[['la oficina de Correos','posta-bulegoa'], ['el parking','aparkalekua'], ['el museo','museoa'], ['la Policía municipal','Udaltzaingoa']]] },
      ['No, esa escuela no está muy cerca.', 'Ez, eskola hori ez dago oso gertu.'],
      ['Sí, el hipermercado está bastante lejos.', 'Bai, hipermerkatua urruti samar dago.'],
      ['Necesitará usted unos diez minutos para llegar hasta allí.', 'Hamar bat minutu beharko dituzu bertara iristeko.'],
      { f:['{0}', 'Bai, begira, {0}'], o:[[
        ['Sí, mire, coja por esta calle y continúe hacia arriba, hasta llegar al final.', 'hartu kale hau eta jarraitu gora, bukaerara iritsi arte.'],
        ['Veamos, siga por ese paseo hasta el tercer cruce.', 'jarraitu hiribide horri hirugarren bidegurutzeraino.'],
        ['Efectivamente, por este camino hacia delante, tiene usted unos tres kilómetros.', 'bide honetatik aurrera egin, eta hiru bat kilometro egin beharko dituzu.'],
        ['Sí, cruce usted esa plaza y coja hacia la derecha.', 'zeharkatu plaza hori, eta hartu eskuinaldera.'],
        ['Mire, gira usted en esa esquina y siga a la izquierda.', 'jiratu kale-kantoi horretan, eta jarraitu ezkerretara.']
      ]] }
    ]},
    { h:['Lugares', 'Lekuak'], w:1, p:30, r:[
      ['Acceso', 'Sarbidea'], ['Alameda', 'Zumardia'], ['Alto', 'Gaina'], ['Avenida', 'Etorbidea\nHiribidea'],
      ['Bajada', 'Jaitsiera'], ['Barriada\nUrbanización', 'Auzunea'], ['Barrio', 'Auzoa'], ['Bloque', 'Blokea'],
      ['Calle', 'Kalea'], ['Callejón', 'Kalexka\nKalezuloa'], ['Calzada', 'Galtzada'], ['Camino', 'Bidea'],
      ['Campa', 'Landa'], ['Cantón', 'Kantoia'], ['Carretera', 'Errepidea'], ['Casa', 'Etxea'],
      ['Caserío', 'Baserria'], ['Chalet', 'Txaleta'], ['Cuesta', 'Aldapa\nMalda'], ['Edificio', 'Eraikina'],
      ['Escalera', 'Eskailera'], ['Estrada', 'Estrata'], ['Explanada', 'Zabalgunea'], ['Grupo', 'Etxe multzoa'],
      ['Jardín', 'Lorategia'], ['Lugar', 'Tokia'], ['Monte', 'Mendia'], ['Muelle', 'Kaia'],
      ['Núcleo', 'Gunea'], ['Parque', 'Parkea'], ['Pasaje\nPasadizo', 'Igarobidea'], ['Paseo', 'Pasealekua'],
      ['Plaza', 'Plaza'], ['Plazoleta', 'Plazatxoa'], ['Plazuela', 'Plaza txikia'], ['Población\nPueblo', 'Herria'],
      ['Poblado', 'Herrixka'], ['Polígono industrial', 'Industrialdea'], ['Prolongación', 'Luzapena'], ['Puente', 'Zubia'],
      ['Ramal', 'Adarra'], ['Rampa', 'Arrapala'], ['Ribera', 'Erribera'], ['Ronda', 'Ingurabidea'],
      ['Rotonda\nGlorieta', 'Biribilgunea'], ['Sendero\nSenda', 'Bidezidorra'], ['Subida', 'Igoera'], ['Travesía', 'Zeharbidea\nZeharkalea'],
      ['Vía férrea', 'Trenbidea']
    ]},
    { h:['Instituciones', 'Erakundeak'], w:1, p:32, r:[
      ['Ayuntamiento', 'Udaletxea\nHerriko etxea (Ipar.)'], ['Banco', 'Bankua'], ['Cafetería', 'Kafetegia'],
      ['Campus universitario', 'Campusa\nUnibertsitate-campusa'], ['Cementerio', 'Hilerria'], ['Cine', 'Zinema'],
      ['Escuela', 'Eskola'], ['Estación', 'Geltokia'], ['Estadio (de deportes)', 'Kirol-estadioa'], ['Farmacia', 'Farmazia'],
      ['Gasolinera', 'Gasolindegia\nEzantza-zerbitzugunea (Ipar.)'], ['Iglesia', 'Eliza'], ['Mercado', 'Azoka'], ['Museo', 'Museoa'],
      ['Oficina de correos', 'Posta-bulegoa'], ['Parada', 'Geralekua'], ['Parking\nAparcamiento', 'Aparkalekua'],
      ['Policía municipal', 'Udaltzaingoa'], ['Polideportivo', 'Kiroldegia'], ['Tienda', 'Denda']
    ]}
  ]},

  { id:'o06', n:'06', eu:'Argibideren bat eman / eskatu', es:'Dar / solicitar información', p:33, z:[
    { r:[
      ['Debe ir usted a la segunda planta.', 'Bigarren solairura joan behar duzu.'],
      ['Tendrá que pedir ese impreso en la cuarta ventanilla.', 'Inprimaki hori laugarren leihatilan eskatu beharko duzu.'],
      ['Sí, puede subir en ascensor.', 'Bai, igogailuan igo zaitezke.'],
      ['No, para bajar al garaje tiene que utilizar las otras escaleras.', 'Ez, garajera jaisteko beste eskailera horiek erabili behar dituzu.'],
      ['¿Me entiende usted?', 'Ulertzen al didazu?'],
      ['¿Qué quiere decir esto?', 'Zer esan nahi du honek?'],
      ['¿Podría repetírmelo, por favor?', 'Errepikatuko al didazu mesedez?'],
      ['¿Qué dice?\n¿Qué quiere usted?', 'Zer diozu?\nZer nahi duzu?'],
      ['Un momento.\nEspere un poco, por favor.', 'Zaude apur bat!\nItxaron pixka bat.'],
      ['No le he oído.\nNo le he entendido.', 'Ez dizut entzun.\nEz dizut ulertu.'],
      ['¿Podría repetirlo, por favor?', 'Errepikatuko zenuke, faborez?'],
      ['Más despacio, por favor.', 'Polikiago, arren.'],
      ['Espere un momento, por favor.\nRepítalo, por favor.\nMás lentamente, por favor.', 'Egon apur batean, mesedez.\nBerriro, mesedez.\nAstiroago, mesedez.'],
      ['Pase.\nPase, por favor.', 'Aurrera, mesedez.\nSartu, mesedez.\nSartu barrura, mesedez.'],
      ['Adelante, adelante.', 'Jarrai aurrera, otoi.']
    ]}
  ]},

  { id:'o07', n:'07', eu:'Baietz / ezetz esan', es:'Decir que sí / no', p:34, z:[
    { r:[
      ['Sí, tiene usted razón.', 'Bai. Arrazoi duzu.'],
      ['Sí, ya sé de qué marca de relojes me está hablando.', 'Bai, badakit zein erloju markaz ari zaren hitz egiten.'],
      ['Me parece bien.', 'Ondo iruditzen zait.'],
      ['Es verdad. Por supuesto.', 'Egia da. Bai horixe.'],
      ['Como usted quiera.\nComo Vd. desee.', 'Nahi duzun bezala.'],
      ['Tal vez.\nPuede ser.\nPodría ser.', 'Beharbada.\nAgian.\nIzan liteke.\nLitekeena da.'],
      ['Depende.\nSegún para qué lo quiera usted.', 'Zertarako nahi duzun.'],
      ['No, no creo que eso sea así, me parece que está usted equivocado.', 'Ez. Ez dut uste hori horrela denik, oker zaudela iruditzen zait.'],
      ['No, no creo que se fabrique nada de esas dimensiones.', 'Ez dut uste neurri horretan ezer fabrikatzen denik.'],
      ['No, no conozco ese modelo.', 'Ez, ez dut modelo hori ezagutzen.'],
      ['No sé.', 'Ez dakit.'],
      ['No, lo siento, no conozco esas marcas de juguetes.', 'Ez, barkatu, jostailu-marka horiek ez ditut ezagutzen.'],
      ['No, se ha confundido, aquí no tenemos de eso.', 'Ez, nahastu egin zara, hemen ez daukagu horrelakorik.'],
      ['Qué lástima, de ese color no nos queda ninguna unidad.', 'Ez, sentitzen dut. Kolore horretakorik ez zaigu geratzen ale bakar bat ere.'],
      ['Ni hablar.', 'Ezta pentsatu ere.']
    ]}
  ]},

  { id:'o08', n:'08', eu:'Eskerrak eman', es:'Dar las gracias', p:35, z:[
    { r:[
      ['Muchas gracias.', 'Eskerrik asko.'],
      ['Muy agradecido.\nMuy agradecida.', 'Mila esker.'],
      ['Gracias mil.', 'Esker anitz.'],
      ['De nada.', 'Ez horregatik.'],
      ['Quiero darle las gracias.', 'Eskerrak eman nahi dizkizut.'],
      ['Les agradezco de verdad.', 'Benetan estimatzen dizuet.']
    ]}
  ]},

  { id:'o09', n:'09', eu:'Neurriak adierazi', es:'Unidades de medida', p:35, z:[
    { r:[
      ['¿Cuánto vale esto?', 'Zenbat balio du honek?'],
      ['¿Cuántos kilos de manzanas quiere usted?', 'Zenbat kilo sagar nahi dituzu?'],
      ['¿Cuántas docenas de claveles va a llevar?', 'Zenbat dozena krabelin eramango dituzu?'],
      ['Esa cámara de fotos vale 124 €.', 'Argazki-makina horrek 124 € balio du.'],
      ['Este sofá vale 335 €.', 'Besaulki honek 335 € balio du.'],
      ['Esa toalla vale 17 €.', 'Eskuoihal horrek 17 € balio du.'],
      ['Esta máquina es muy cara.', 'Makina hori ikaragarri garestia da.'],
      { f:['Lo siento, pero no tengo nada de {0}.', 'Sentitzen dut, baina ez daukat {0}.'], o:[[['cambios','kanbiorik'], ['moneda fraccionaria','diru xeherik']]] },
      ['No, esas tuercas son demasiado grandes. Las necesito de 1,5 mm.', 'Ez, azkoin horiek handiegiak dira. 1,5 mm-koak behar ditut.'],
      ['Los autobuses que fabrica Irizar suelen tener una longitud de entre 12 y 15 metros.', 'Irizarren egindako autobusek 12-15 metro bitarteko luzera izan ohi dute.'],
      ['Este ascensor sube hasta una altura de 70 metros.', 'Igogailu hau 70 metroko altueraraino igotzen da.'],
      ['El límite máximo permitido de altura de los palets es de 1,80 metros.', 'Paleten gehieneko altuera-muga 1,80 m da.'],
      ['Clavos de acero de 60 mm.', '60 mm-ko altzairuzko iltzeak.'],
      ['La profundidad de corte de esta sierra de calar es de 55 milímetros.', 'Inguratzeko zerra honen ebakiaren sakonera 55 mm da.'],
      ['Nuestros tableros de melamina de 2 cantos tienen un grosor de 16 ó 30 mm.', '2 ertzeko gure melamina-taulek 16 mm-ko edo 30 mm-ko lodiera dute.'],
      ['Estos tubos de PVC ligero tienen un diámetro de 63 mm.', 'PVC arinezko hodi hauek 63 milimetroko diametroa dute.'],
      ['Las medidas de este mueble microondas son 83 x 68 x 40 cm.', 'Mikrouhin-laberako altzari honen neurriak 83 x 68 x 40 cm dira.'],
      ['La velocidad máxima que puede alcanzar este taladro es de 900 rpm.', 'Zulagailu honek, gehienez ere, 900 bira/min-ko abiadura har dezake.'],
      ['Esta impresora imprime a una velocidad de 90 copias en blanco y negro por minuto, y 15 copias en color.', 'Inprimagailu honen inpresio-abiadura minutuko 90 kopia da zuri-beltzean eta 15 kopia koloretan.'],
      ['Los coches de Fórmula 1 alcanzan velocidades de hasta 300 km/h.', '1 Formulako autoek 300 km/h-ko abiadura hartzen dute.'],
      ['Necesito papel de fotocopiadora de 80 g/m².', 'Fotokopiagailuarentzat 80 g/m²-ko papera behar dut.'],
      ['Se nos ha estropeado el disco duro de 2 Tb.', '2 Tb-ko disko gogorra hondatu egin zaigu.'],
      ['Este televisor de 28” es adecuado para usted.', '28” dituen telebista hau egokia da zuretzat.'],
      ['¿Tiene CD-ROMs de 700 Mb y 80 min en oferta?', 'Ba al daukazu 700 Mb eta 80 minutuko CD-ROMik eskaintzan?'],
      ['¿Cómo puedo grabar un DVD de 4,7 Gb de 120 minutos?', 'Nola graba dezaket 4,7 Gb-ko eta 120 minutuko DVDa?'],
      ['La Fábrica Lambretta de Eibar producía motos de 1.000 cm³.', 'Eibarko Lambretta lantegiak 1.000 cm³-ko motoak egiten zituen.']
    ]},
    { h:['Números', 'Zenbakiak'], w:1, p:37, r:[
      { k:'1', es:'Uno', eu:'Bat' }, { k:'2', es:'Dos', eu:'Bi' }, { k:'3', es:'Tres', eu:'Hiru' }, { k:'4', es:'Cuatro', eu:'Lau' },
      { k:'5', es:'Cinco', eu:'Bost' }, { k:'6', es:'Seis', eu:'Sei' }, { k:'7', es:'Siete', eu:'Zazpi' }, { k:'8', es:'Ocho', eu:'Zortzi' },
      { k:'9', es:'Nueve', eu:'Bederatzi' }, { k:'10', es:'Diez', eu:'Hamar' }, { k:'11', es:'Once', eu:'Hamaika' }, { k:'12', es:'Doce', eu:'Hamabi' },
      { k:'13', es:'Trece', eu:'Hamahiru' }, { k:'14', es:'Catorce', eu:'Hamalau' }, { k:'15', es:'Quince', eu:'Hamabost' }, { k:'16', es:'Dieciséis', eu:'Hamasei' },
      { k:'17', es:'Diecisiete', eu:'Hamazazpi' }, { k:'18', es:'Dieciocho', eu:'Hemezortzi\nHamazortzi' }, { k:'19', es:'Diecinueve', eu:'Hemeretzi' }, { k:'20', es:'Veinte', eu:'Hogei' },
      { k:'21', es:'Veintiuno', eu:'Hogeita bat' }, { k:'22', es:'Veintidós', eu:'Hogeita bi' }, { k:'23', es:'Veintitrés', eu:'Hogeita hiru' }, { k:'24', es:'Veinticuatro', eu:'Hogeita lau' },
      { k:'35', es:'Treinta y cinco', eu:'Hogeita hamabost' }, { k:'47', es:'Cuarenta y siete', eu:'Berrogeita zazpi' }, { k:'58', es:'Cincuenta y ocho', eu:'Berrogeita hemezortzi' }, { k:'60', es:'Sesenta', eu:'Hirurogei' },
      { k:'77', es:'Setenta y siete', eu:'Hirurogeita hamazazpi' }, { k:'86', es:'Ochenta y seis', eu:'Laurogeita sei' }, { k:'90', es:'Noventa', eu:'Laurogeita hamar' }, { k:'100', es:'Cien', eu:'Ehun' },
      { k:'120', es:'Ciento veinte', eu:'Ehun eta hogei' }, { k:'275', es:'Doscientos setenta y cinco', eu:'Berrehun eta hirurogeita hamabost' }, { k:'300', es:'Trescientos', eu:'Hirurehun' },
      { k:'423', es:'Cuatrocientos veintitrés', eu:'Laurehun eta hogeita hiru' }, { k:'576', es:'Quinientos setenta y seis', eu:'Bostehun eta hirurogeita hamasei' },
      { k:'950', es:'Novecientos cincuenta', eu:'Bederatziehun eta berrogeita hamar' }, { k:'5.785', es:'Cinco mil setecientos ochenta y cinco', eu:'Bost mila zazpiehun eta laurogeita bost' },
      { k:'15.000', es:'Quince mil', eu:'Hamabost mila' }
    ]},
    { h:['Peso', 'Pisua'], w:1, p:38, r:[
      { k:'¼ kg (= 250 g)', es:'Cuarto de kilo (= doscientos cincuenta gramos).', eu:'Kilo-laurdena (= berrehun eta berrogeita hamar gramo).' },
      { k:'½ kg', es:'Medio kilo.', eu:'Kilo-erdia.' },
      { k:'¾ kg (= 750 g)', es:'Tres cuartos de kilo (= setecientos cincuenta gramos).', eu:'Hiru kilo-laurden (= zazpiehun eta berrogeita hamar gramo).' },
      { k:'1 kg', es:'Un kilo.\nUn kilogramo.', eu:'Kilo bat.\nKilogramo bat.' },
      { k:'5 kg', es:'Cinco kilos.', eu:'Bost kilo.' },
      { k:'3 ½ kg', es:'Tres kilos y medio.', eu:'Hiru kilo eta erdi.' },
      { k:'2,225 kg', es:'Dos kilos doscientos veinticinco gramos.', eu:'Bi kilo eta berrehun eta hogeita bost gramo.' },
      { k:'50 kg', es:'Cincuenta kilos.', eu:'Berrogeita hamar kilo.' },
      { k:'1.200 kg', es:'Mil doscientos kilos.', eu:'Mila eta berrehun kilo.' },
      { k:'80 g/m²', es:'80 gramos por metro cuadrado.', eu:'80 gramo metro karratuko.' }
    ]},
    { h:['Cantidad', 'Kantitatea / Kopurua'], w:1, p:39, r:[
      ['Una docena de huevos.', 'Dozena bat arrautza.'],
      ['Media docena de puerros.', 'Dozena erdi bat porru.'],
      ['Dos docenas y media de rosas.', 'Bi dozena eta erdi arrosa.'],
      ['Tres cajas de fresas.', 'Hiru kaxa marrubi.'],
      ['Un litro de leche.', 'Litro bat esne.'],
      ['Una botella de refresco de litro y medio.', 'Litro eta erdiko freskagarri-botila.'],
      ['Botella de medio litro.', 'Litro erdiko botila.'],
      ['Botella de tres cuartos (de litro).', 'Hiru txikiko botila.'],
      ['Botellín de cerveza de tercio.', 'Heren bateko garagardo botila (txikia).'],
      ['Una copa de vino.\nUn vaso de vino.', 'Baso bat ardo.'],
      ['Una copa de pacharán.', 'Kopa bat patxaran.'],
      ['Un vaso de agua.', 'Baso bat ur.\nBaso bete ur.']
    ]},
    { h:['Dimensiones · largura, altura, anchura, profundidad', 'Dimentsioak · luzera, altuera, zabalera, sakonera'], w:1, p:39, r:[
      { k:'2 m', es:'2 metros.', eu:'2 metro.' },
      { k:'12-15 m', es:'12-15 metros.', eu:'12-15 metro.' },
      { k:'70 m', es:'70 metros.', eu:'70 metro.' },
      { k:'83 x 68 x 49 cm', es:'83 x 68 x 49 centímetros.', eu:'83 x 68 x 49 zentimetro.' },
      { k:'60 mm', es:'60 milímetros.', eu:'60 milimetro.' },
      { k:'55 μm', es:'55 micrómetros.', eu:'55 mikrometro.' }
    ]},
    { h:['Velocidad', 'Abiadura'], w:1, p:40, r:[
      { k:'900 rpm', es:'900 revoluciones por minuto.', eu:'900 bira minutuko.' },
      { k:'15 copia/min', es:'15 copias por minuto.', eu:'15 kopia minutuko.' },
      { k:'25 km/h', es:'25 kilómetros por hora.', eu:'25 kilometro orduko.' }
    ]},
    { h:['Capacidad', 'Edukiera'], w:1, p:40, r:[
      { k:'1,44 Mb', es:'1,44 megabytes.', eu:'1,44 megabyte.' },
      { k:'15”', es:'15 pulgadas.', eu:'15 hazbete.' },
      { k:'1.000 cm³', es:'1.000 centímetros cúbicos.', eu:'1.000 zentimetro kubiko.' }
    ]}
  ]},

  { id:'o10', n:'10', eu:'Barkamena eskatu', es:'Pedir perdón', p:40, z:[
    { r:[
      ['Perdón.', 'Barka iezadazu.'],
      ['Disculpe, ha sido sin querer.', 'Nahi gabe egin dut.'],
      ['Disculpe, me he equivocado.', 'Barkatu, nahastu egin naiz.'],
      ['Lo siento, ha habido un malentendido.', 'Sentitzen dut, gaizki-ulerturen bat egon da.']
    ]}
  ]}
]});

/* ══ 2 · JATETXEAK, TABERNAK ETA KAFETEGIAK · Restaurantes, bares y cafeterías (pp. 41–51) ══ */
A1_MINTZAMENA.b.push({ id:'j', eu:'Jatetxeak, tabernak eta kafetegiak', es:'Restaurantes, bares y cafeterías', ic:'🍽️', p:41, s:[

  { id:'j01', n:'01', eu:'Telefonoz', es:'Al teléfono', p:42, z:[
    { r:[
      ['Sí, ¿para cuándo quiere usted hacer la reserva?', 'Bai, noizko nahi zenuke lekua?'],
      ['Lo siento, va a ser imposible, porque el lunes es nuestro día de descanso semanal.', 'Ezinezkoa da, astelehenetan egiten baitugu gure asteko atseden-eguna.'],
      ['¿Cuántos serán en total?', 'Zenbat izango zarete guztira?'],
      ['No, ya lo siento, pero el fin de semana siguiente está todo ocupado.', 'Ez, sentitzen dut, baina datorren astebururako dena hartua daukagu.'],
      ['¿A nombre de quién apunto la mesa de 12 personas que acaba de reservar?', 'Noren izenean apuntatuko dut 12 lagunentzat eskatu duzun mahaia?'],
      ['¿Desean encargar alguna cosa en especial (cordero, cabrito,...) o comerán Vds. a la carta?', 'Jateko zerbait berezia enkargatu nahi duzue (arkumea, antxumea,...) ala kartakoa jango duzue?'],
      ['¿A qué hora vendrán a comer? Nuestro horario para el público empieza a las 13:30 y la cocina cierra a las 15:30 horas.', 'Zer ordutan etorriko zarete bazkaltzera? Jendearentzat daukagun ordutegia 13:30ean hasten da, eta 15:30ak arte dago irekita sukaldea.'],
      ['No, no hay problema, la cafetería está abierta todo el día.', 'Ez, lasai, egun osoan irekita dago kafetegia.']
    ]}
  ]},

  { id:'j02', n:'02', eu:'Zerbitzariak harrera egin', es:'Acogiendo a la clientela', p:42, z:[
    { r:[
      ['Buenas tardes. ¿Cuántos son en total para comer?', 'Arratsalde on. Zenbat zarete guztira bazkaltzeko?'],
      ['Buenas noches. ¿Tienen mesa reservada? Pues lo siento, pero el comedor está lleno.', 'Gabon. Mahaia erreserbaturik al daukazue? Bada, sentitzen dut, jantokia beterik dago.'],
      ['Adelante. ¿Dónde quieren sentarse?', 'Bai, aurrera. Non eseri nahi duzue?'],
      ['Sí, pasen. Siéntense donde quieran.', 'Bai, aurrera. Eseri nahi duzuen tokian.'],
      ['Excepto en esa mesa que está reservada, pueden ponerse en la mesa que ustedes quieran.', 'Erreserbatutako mahai horretan izan ezik, beste edozein mahaitan jar zaitezkete.'],
      ['Tendrán que esperar una media hora, más o menos. En esa mesa, están acabando.', 'Ordu-erditxo bat itxaron beharko duzue. Mahai horretakoak bukatzen ari dira.'],
      ['Lo siento, pero la cocina está cerrada. Nuestro horario es hasta las 16:00 horas.', 'Sentitzen dut, baina sukaldea itxita dago. Gure ordutegia arratsaldeko 16:00ak artekoa da.'],
      { f:['¿Quieren que les retire {0}?', 'Nahi al duzue {0} jasotzea?'], o:[[['el abrigo','berokiak'], ['la chaqueta','txamarrak'], ['el paraguas','aterkia']]] },
      ['Sí, enseguida les traigo una trona para el bebé.', 'Bai, segituan ekarriko dizuet haurtxoarentzako aulki altua.'],
      ['¿Cuántos cojines necesitan?', 'Zenbat kuxin behar dituzue?'],
      ['¿Prefieren que les baje un poco el aire acondicionado o les parece bien tal y como está ahora?', 'Nahi al duzue aire girotua pixka bat jaistea? Edo dagoen bezala ondo iruditzen zaizue?'],
      ['¿Les molesta el aire acondicionado?', 'Aire girotuak enbarazu egiten al dizue?'],
      ['¿Quieren que quite el aire acondicionado?', 'Aire girotua kentzea nahi al duzue?']
    ]}
  ]},

  { id:'j03', n:'03', eu:'Erre daiteke?', es:'¿Se puede fumar?', p:43, z:[
    { r:[
      ['Perdone, pero aquí no se puede fumar. Para fumar debe usted salir a la terraza.', 'Barkatu, baina hemen ezin da erre. Erretzeko, terrazara irten beharko duzu.'],
      ['No, aquí no vendemos tabaco (cigarrillos).\nNo, aquí no tenemos puros.', 'Ez, hemen ez dugu zigarrorik saltzen.\nEz, hemen ez daukagu pururik.'],
      ['Sí, ahora mismo le traigo los puros. ¿Qué marca de puros quiere usted?', 'Bai, oraintxe ekarriko dizkizut puruak. Zer markatakoak nahi dituzu?'],
      ['¿Necesitan papel de fumar?', 'Zigarro-paperik behar al duzue?'],
      ['¿Quién me ha pedido un cenicero?', 'Hautsontzia nork eskatu dit?']
    ]}
  ]},

  { id:'j04', n:'04', eu:'Eskaera hartu', es:'Cogiendo la comanda', p:44, z:[
    { r:[
      ['¿Han pensado ustedes qué van a tomar?', 'Pentsatu al duzue zer nahi duzuen?'],
      ['¿Prefieren el menú del día o van a comer a la carta?', 'Eguneko menua ala kartakoa nahi duzue?'],
      ['No, los fines de semana no tenemos menú del día.', 'Ez, asteburuetan ez daukagu eguneko menurik.'],
      ['Los sábados y domingos tenemos menús especiales, algo más caros que el menú del día.', 'Larunbat eta igandeetan menu bereziak eskaintzen ditugu, zertxobait garestiagoak.'],
      ['¿Qué tomarán para empezar?', 'Zer hartuko duzue hasteko?'],
      ['¿Han pensado ya el segundo plato?', 'Pentsatu al duzue zein izango den bigarren platera?'],
      ['¿Van a tomar postre?', 'Azkenburukorik hartu behar duzue?'],
      ['Y para beber, ¿vino o sidra? ¿El vino de la casa, o les traigo la carta de vinos?', 'Eta edateko, ardoa ala sagardoa? Ardoa, etxekoa hartuko duzue ala ardoen karta ekarriko dizuet?'],
      ['¿Van a tomar ustedes café? ¿Y alguna copa o licor?', 'Kaferik hartu behar duzue? Eta pattarrik edo koparik?'],
      ['¿Cuántos de ustedes van a beber champán? Lo pregunto para sacar copas especiales.', 'Zenbatek edango duzue xanpaina? Kopa bereziak ateratzeko galdetzen dizuet.'],
      ['En el menú del día,', 'Eguneko menuan,'],
      { f:['De primer plato tienen para elegir {0}.', 'Lehenengo platerean, {0} daukazue/dauzkazue.'], ng:1, o:[[['ensalada mixta','entsalada mistoa'], ['puerros con patatas','porrusalda / porru-patatak'], ['canelones rellenos de carne','okela-kaneloiak / haragi-kaneloiak'], ['arroz con tomate','arroza tomatearekin'], ['alubias blancas','babarrun zuriak / indaba zuriak']]] },
      { f:['Luego, de segundo {0} a elegir.', 'Gero, bigarrenean, {0} daukazue/dauzkazue aukeran.'], ng:1, o:[[['lomo de cerdo con pimientos','txerri-solomoa piperrekin'], ['hamburguesas con tomate','hanburgesak tomatearekin'], ['merluza frita','legatz frijitua'], ['pollo','oilaskoa'], ['san jacobos','san jakoboak']]] },
      { f:['Y para terminar, de postre {0}.', 'Postrerako, berriz, {0}.'], o:[[['yogur','jogurtak'], ['fruta','fruta'], ['tartas caseras','etxeko tartak']]] },
      ['Pueden pedir también el menú degustación, pero en ese caso tienen que elegirlo todos los comensales.', 'Dastatzeko menua ere eska dezakezue, baina orduan mahaikide guztiek aukeratu behar duzue menua.'],
      ['Si prefieren, también disponemos de un menú especial para vegetarianos.', 'Nahi izanez gero, begetarianoentzako menu berezia ere badugu.'],
      ['¿Quieren la carta de platos combinados?', 'Plater konbinatuen karta nahi duzue?'],
      ['De la carta, se nos han acabado el lenguado y el besugo. Y sólo nos queda rape para dos personas.', 'Kartan dagoenetik, mihi-arraina eta bisigua bukatu egin zaizkigu. Eta zapoa birentzat bakarrik geratzen da.'],
      ['Además de la carta, hoy tenemos percebes y también rodaballo.', 'Kartakoaz gain, gaur lanpernak eta erreboiloa ere badauzkagu.'],
      { f:['Hoy les recomiendo especialmente los {0}.', 'Gaur {0} gomendatzen dizkizuet bereziki.'], ng:1, o:[[['chipirones Pelayo','Pelaio txipiroiak'], ['revuelto de hongos','onddo-nahaskia'], ['pichón','usakumea']]] },
      ['¿Quiere aceitunas negras o verdes? ¿Con hueso o rellenas de anchoa? ¿O mezcla de las dos clases?', 'Olibak, nolakoak nahi dituzu? Beltzak ala berdeak? / Oliba beltzak ala berdeak nahi dituzu? Hezurdunak ala antxoaz beteak? Edota bietatik, nahasian?'],
      ['La ensalada especial de la casa está compuesta de lechuga, gulas, queso, palmitos y atún.', 'Etxeko entsalada bereziak osagai hauek dauzka: letxuga, gulak, gazta, palmitoak eta atuna.'],
      ['La carne ¿cómo la quieren, muy hecha, poco hecha o cómo?', 'Haragia nola egina nahi duzue: gutxi egina, asko egina, edo nola?'],
      ['El queso ¿cómo lo quiere, fuerte o suave?', 'Gazta, nolakoa nahi duzu, fuertea ala suabea?']
    ]}
  ]},

  { id:'j05', n:'05', eu:'Janaria zerbitzatu', es:'Sirviendo la comida', p:46, z:[
    { h:['a) A la hora del desayuno', 'a) Gosari garaian'], p:46, r:[
      ['El (café) descafeinado, ¿lo quiere de máquina o de sobre?', '(Kafe) kafeinagabea nolakoa nahi duzu? Makinakoa ala sobrekoa?'],
      ['Aquí tienen el cortado y el solo. ¿Desean algo para comer?', 'Ebakia eta hutsa dira hauek. Jateko ezer nahi al duzue?'],
      ['En esta cesta tienen los edulcorantes (azúcar y sacarina). Coja lo que necesite.', 'Gozagarriak otarretxo honetan dauzkazue: azukrea eta sakarina. Hartu nahi duzuna.'],
      ['Buenos días. ¿Tomará también zumo de naranja con el café?', 'Egun on. Kafearekin laranja-zukua ere hartuko al duzu?'],
      ['¿Qué va a tomar con el café con leche: un cruasán o una tostada con mermelada?', 'Eta kafesnearekin, zer nahi duzu jateko: kruasana ala txigorkia marmeladarekin?']
    ]},
    { h:['b) En el bar, bebidas, pinchos', 'b) Tabernan, edariak, pintxoak'], p:46, r:[
      ['¿Me ha pedido caña o zurito?', 'Kaña ala zuritoa eskatu didazu?'],
      ['De los zuritos que me ha pedido, ¿cuántos son con gaseosa?', 'Eskatutako zuritoetatik, zenbat nahi dituzu gaseosarekin?'],
      ['Este es el crianza, este es reserva y este otro, el vino del año.', 'Hau ardo ondua da, hau erreserba, eta hau, berriz, urteko ardoa.'],
      ['No, no le puedo servir, tenemos prohibida la venta de bebidas alcohólicas a menores de 18 años.', 'Ez, ezin dizut zerbitzatu, debekatuta baitaukagu 18 urtez beherakoei edari alkoholdunak saltzea.'],
      ['¿Quieren algún pincho caliente? ¿Quiere que le caliente la banderilla?', 'Pintxo berorik nahi duzue? Nahi al duzu pintxoa berotzea?'],
      ['Tome un plato. Coja usted mismo los pinchos.', 'Hartu platera. Zeuk hartu pintxoak.'],
      ['¿Cuántos les pongo?', 'Zenbat jarriko dizkizuet?'],
      ['Estos pinchos acaban de salir de la cocina, esos otros en cambio son de hace un rato.', 'Pintxo hauek egin berri-berriak dira; horiek, lehentxeagokoak dituzu.'],
      ['Tenemos gran variedad de tortillas: de jamón, de chorizo, de anchoas, de champiñones, etc.', 'Tortilletan aukera handia daukagu: urdaiazpikoa, txorizoa, antxoak, barrengorriak,...'],
      ['El agua mineral ¿cómo la quiere, natural o fría? ¿Con gas o sin gas?', 'Ur minerala, nolakoa nahi duzu? Naturala ala hotza? Gasduna ala gasgabea?'],
      { f:['¿Quiere vaso para beber {0}?', 'Basorik behar al duzu {0} edateko?'], o:[[['el batido','irabiatua'], ['la cerveza','garagardoa'], ['la sidra','sagardoa'], ['la sangría','sangria']]] },
      ['¿Cuántos vasos necesitan para beber el agua?', 'Zenbat edalontzi behar dituzue ura edateko?'],
      ['¿Desea hielo para el refresco? ¿Cuántos cubitos quiere? ¿Le bastan con un par?', 'Izotz-koskorrik nahi al duzu freskagarriarentzat? Pare bat nahikoa duzu?']
    ]},
    { h:['c) En el bar, bocadillos', 'c) Tabernan, ogitartekoak'], p:47, r:[
      { f:['No, no tenemos bocadillos calientes. La cocina está cerrada ya. Si quiere, le puedo poner un bocadillo de {0}.', 'Ez, ez daukagu ogitarteko berorik. Sukaldea itxita dago jadanik. Nahi izanez gero, {0} ogitarteko bat jarriko dizut.'], o:[[['jamón','urdaiazpiko'], ['queso','gazta'], ['chorizo','txorizo']]] },
      { f:['Muy bien, ¿qué bocadillos desea? Le podemos preparar lo que usted quiera: {0}.', 'Bai, zer ogitarteko nahi zenituzke? Zuk nahi duzuna prestatuko dizugu: {0}.'], o:[[['lomo','solomoa'], ['queso','gazta'], ['bacon','hirugiharra'], ['tortilla','tortilla'], ['jamón','urdaiazpikoa'], ['lomo con pimientos','solomoa piperrekin'], ['jamón y queso','gazta urdaiazpikoarekin']]] },
      ['¿Cuántos vasos quieren con la botella de sidra?', 'Zenbat baso behar dituzue sagardo-botilarekin?'],
      ['Sí, este es el de tortilla de patatas; este de anchoa y ese, en cambio, de tortilla de jamón.', 'Bai, hau patata-tortilla da; beste hau, antxoazkoa eta hori, berriz, urdaiazpikozkoa.']
    ]},
    { h:['d) En el restaurante, a la hora de comer / cenar', 'd) Jatetxean, otordua bitartean'], p:48, r:[
      ['Tenga cuidado con el plato, que quema. Está muy caliente.', 'Kontu izan platerarekin, erre egiten du, oso beroa dago-eta.'],
      ['¿Quién necesitaba las vinagreras para aliñar la ensalada?', 'Nork behar zituen olioa eta ozpina entsalada maneatzeko?'],
      { f:['Aquí tienen {0}.', 'Hementxe dituzue {0}.'], ng:1, o:[[['los entrantes','sarrerak'], ['el primer plato','lehen platera'], ['el pescado','arraina'], ['la carne','haragia'], ['el pollo','oilaskoa'], ['el queso','gazta'], ['los postres','postrea'], ['los helados','izozkiak'], ['el vino','ardoa'], ['la sidra','sagardoa'], ['el agua','ura']]] },
      ['Que (les) aproveche.', 'On egin diezazuela.\nOn degizuela.\nOn egin.']
    ]}
  ]},

  { id:'j06', n:'06', eu:'Protesta egin', es:'La clientela protesta', p:49, z:[
    { r:[
      { f:['Sí, ahora mismo viene (le traigo) (sale) {0} que ha pedido.', 'Bai, oraintxe dator zuk eskatutako {0}.'], o:[[['el pincho','pintxoa'], ['la ración','errazioa / anoa'], ['el bocadillo','ogitartekoa']]] },
      { f:['¿Qué, no estaba buena {0}?', 'Zer, ez al zegoen ona {0}?'], ng:1, o:[[['la merluza','legatza'], ['el filete','xerra'], ['el jamón','urdaiazpikoa']]] },
      ['¿Quiere que le traiga alguna cosa más?', 'Nahi al duzu beste zerbait ekartzea?'],
      ['Perdone, ahora mismo le traigo los palillos.', 'Barkatu, oraintxe ekarriko dizkizut txotxak.'],
      ['Un momento, ahora mismo les hago caso.', 'Bai, barkatu oraintxe egingo dizuet kasu.'],
      ['Perdone, enseguida vengo.', 'Bai, barkatu oraintxe naiz zuekin.'],
      ['¿Les parece que la música está demasiado alta?', 'Zer, musika ozenegi dagoela iruditzen al zaizue?'],
      ['¿Desea la lista de precios?', 'Prezioen zerrenda nahi al duzu?'],
      ['Tenga, aquí tiene la hoja de reclamaciones, como me ha pedido.', 'Tori, hementxe daukazu erreklamazio-orria, zuk eskatu bezala.'],
      ['No, la cuenta está bien. La hemos revisado y el importe es correcto. ¿Les parece demasiado caro?', 'Ez, kontua ondo dago. Berrikusi dugu, eta zenbatekoa zuzena da. Garestiegia iruditzen al zaizue?'],
      ['No, no hay ninguna confusión. Estos son los vinos, y este es el precio de los postres.', 'Ez, ez dago nahasketarik. Hauek ardoak dira, eta beste hau, berriz, postreen prezioa da.']
    ]}
  ]},

  { id:'j07', n:'07', eu:'Sukaldaria zoriondu', es:'Felicitaciones al cocinero o cocinera', p:49, z:[
    { r:[
      ['Enseguida le digo a la cocinera que la paella les ha encantado.', 'Esango diot sukaldariari prestatutako paella asko gustatu zaizuela.'],
      { f:['{0} de parte del cocinero.', '{0} sukaldariaren partetik.'], o:[[['Muchas gracias','Eskerrik asko'], ['Muy agradecido','Mila esker'], ['Mil gracias','Esker anitz']]], x:'⚠ En el libro las opciones en euskera van en otro orden (Mila esker · Eskerrik asko · Esker anitz). Aquí cada una va con su equivalente, como en el apartado 08 «Eskerrak eman».' },
      ['Me alegro de ver que la comida les ha gustado.', 'Pozten nau jandakoa gustatu zaizuela ikusteak.']
    ]}
  ]},

  { id:'j08', n:'08', eu:'Non dago komuna?', es:'¿Dónde está el servicio?', p:50, z:[
    { r:[
      ['Sí, yendo por ahí a la izquierda, la primera puerta.', 'Bai, hortik joan eta ezkerretara, lehenengo atean daukazu komuna.'],
      ['El servicio está en el piso de abajo.', 'Beheko solairuan dago komuna.'],
      ['Sí, pero coja la llave, porque el servicio de señoras está cerrado.', 'Bai, baina har ezazu giltza, emakumezkoen komuna itxita dago-eta.']
    ]}
  ]},

  { id:'j09', n:'09', eu:'Kontua eskatu', es:'La cuenta, por favor', p:50, z:[
    { r:[
      ['¿Desea usted pagar con tarjeta?', 'Txartelarekin ordaindu nahi duzu?'],
      ['Cómo no, claro que puede pagar con tarjeta. ¿Puede enseñarme el DNI por favor?', 'Bai, noski. Txartelarekin ordaindu dezakezu. Zure nortasun-agiria erakutsiko didazu mesedez?'],
      ['¿Podría firmar ahí, si es tan amable?', 'Sinatuko duzu hemen, arren?'],
      ['¿Quieren cuentas separadas?', 'Kontu bananduak nahi al dituzue?'],
      ['Muchas gracias, ahora le traigo los cambios.', 'Mila esker, oraintxe ekarriko dizut kanbioa.']
    ]}
  ]},

  { id:'j10', n:'10', eu:'Egoera bereziak', es:'Situaciones especiales', p:51, z:[
    { r:[
      ['Perdone, enseguida le traigo el quitamanchas, para que se limpie esa mancha que le he hecho en la ropa.', 'Barkatu, oraintxe ekarriko dizut orban-kentzekoa, arropan egin dizudan mantxa kentzeko.'],
      { f:['¿Qué desea, que {0} televisor?', 'Zer nahi duzu, telebista {0}?'], o:[[['encienda el','piztea'], ['apague el','itzaltzea'], ['cambie el canal del','katea aldatzea']]] },
      ['No, lo siento, está prohibido jugar a las cartas en el comedor.', 'Sentitzen dut, baina debekatuta dago jantokian kartetan aritzea.'],
      ['Sí, ahora mismo le doy las cartas y el tapete. ¿Necesitan tantos?', 'Bai, oraintxe emango dizkizut kartak eta tapetea. Tantoak behar al dituzue?'],
      ['Lo siento, pero está prohibido cantar dentro del restaurante.', 'Barkatuko didazue, baina debekatua dago jatetxearen barruan kantatzea.']
    ]}
  ]}
]});

/* ══ 3 · SALTEGIAK · Establecimientos (pp. 53–78) ══ */
A1_MINTZAMENA.b.push({ id:'d', eu:'Saltegiak', es:'Establecimientos', ic:'🛍️', p:53, s:[

  { id:'d01', n:'01', eu:'Janari-dendan', es:'En la tienda de alimentación', p:54, z:[
    { h:['a) Acogida en general', 'a) Harrera orokorra'], p:54, r:[
      ['Buenos días, ¿qué desea?', 'Egun on. Zer nahi duzu?'],
      ['Buenas tardes, ¿en qué puedo ayudarle?', 'Arratsalde on. Zertan laguntzea nahi duzu?\nArratsalde on. Zertan lagunduko dizut?'],
      ['¿Necesita algo más?', 'Besterik behar duzu?\nBeste ezer behar duzu?'],
      ['¿Está bien así o le quito un poco?', 'Horrela ondo dago, ala pixka bat kenduko dizut?'],
      ['¿Quién es el siguiente?\n¿A quién le toca ahora?', 'Nor / Zein da hurrengoa?']
    ]},
    { h:['b) En la carnicería', 'b) Harategian'], p:54, r:[
      ['Las chuletas, ¿cómo las quiere, de ternera o de vaca?', 'Txuletak, nolakoak nahi dituzu? Gaztearenak ala zaharrarenak?'],
      ['¿Cuánto jamón le corto?', 'Zenbat urdaiazpiko moztuko dizut?'],
      ['¿Es suficiente así, o le corto más?', 'Nahikoa duzu hau, edo gehiago moztuko dizut?'],
      ['¿Quiere los despojos del pollo?', 'Oilaskoaren barrukiak nahi al dituzu?'],
      ['¿Prefiere chorizo dulce o picante? ¿Lo quiere de Pamplona o de Salamanca?', 'Txorizoa, nolakoa nahi duzu? Gozoa ala mina? Pamplona txorizoa ala Salamancakoa?'],
      ['Los callos son caseros. ¿Cuánto le pongo?', 'Tripaki hauek bertan eginak dira. Zenbat jarriko dizut?'],
      ['Las pechugas de pollo, ¿las necesita enteras o le saco filetes?', 'Oilasko-bularkiak osorik behar dituzu, ala xerrak ateratzea nahi duzu?']
    ]},
    { h:['c) En la pescadería', 'c) Arrandegian'], p:55, r:[
      { f:['¿Cómo le corto la merluza, {0}?', 'Nola moztuko dizut legatza, {0}?'], o:[[['en rodajas','trontzatan'], ['en filetes','xerratan'], ['en lomos','solomotan']]] },
      ['¿Quiere que le limpie el chicharro? ¿Utilizará para algo la cabeza?', 'Nahi al duzu txitxarroa garbitzea? Burua erabiliko al duzu ezertarako?'],
      { f:['No, hoy no tenemos {0}.', 'Ez, gaur ez daukagu {0}.'], o:[[['anchoas','antxoarik'], ['merluza','legatzik'], ['rape','zaporik']]] },
      { f:['¿Cuántos kilos de {0} necesita?', 'Zenbat kilo {0} behar dituzu?'], o:[[['merluza','legatz'], ['rodaballo','erreboilo'], ['besugo','bisigu']]] },
      ['Hoy tenemos anchoa, muy buena. Y a muy buen precio además.', 'Oso antxoa ederrak dauzkagu gaur. Eta modu onean, gainera.']
    ]},
    { h:['d) En los lácteos', 'd) Esnekietan'], p:55, r:[
      ['La leche ¿cómo la quiere: entera, desnatada o semidesnatada?', 'Esnea, nolakoa nahi duzu? Osoa, gaingabetua ala erdigaingabetua?'],
      ['Tranquilo, que la fecha de caducidad de la leche es del martes que viene.', 'Ez, lasai, esnearen iraungipen-data datorren asteartekoa da-eta.'],
      ['Sí, este queso de oveja es bastante suave. ¿Quiere usted probar un poco?', 'Bai, ardi-gazten artean hau nahiko suabea da. Dastatu nahi al duzu pixka bat?'],
      ['Si es para los críos, le recomiendo este queso de Burgos. Queda muy rico con membrillo.', 'Umeentzat baldin bada, Burgosko gazta gomendatzen dizut. Menbrilloarekin oso goxoa izaten da.'],
      ['Los yogures ¿los quiere naturales o de sabor a frutas?', 'Jogurt naturalak ala frutadunak, nolakoak behar dituzu?']
    ]},
    { h:['e) En la frutería', 'e) Fruta-dendan'], p:56, r:[
      { f:['No, todavía no tenemos {0}.', 'Ez, oraindik ez daukagu {0}.'], o:[[['melones','meloirik'], ['cerezas','gerezirik'], ['ciruelas','aranik']]] },
      ['Todavía no es la época.', 'Oraindik ez da garaia.'],
      ['Efectivamente, la uva está en su punto. ¿Prefiere la uva blanca o la negra? ¿Cuánto le pongo?', 'Bai. Mahatsa oraintxe dago puntu-puntuan. Zuria ala beltza nahiago duzu? Zenbat jarriko dizut?'],
      ['Estas cerezas son de Espeleta.', 'Gerezi hauek Ezpeletakoak dira.'],
      ['Por supuesto, esta fruta es de temporada.', 'Noski, fruta hau urte-sasoikoa da.'],
      ['Esas son de importación.', 'Horiek inportaziokoak dituzu.'],
      ['Aquí todo es del país.', 'Hemen dena bertakoa daukagu.']
    ]},
    { h:['f) En la tienda de verduras', 'f) Barazkietan'], p:56, r:[
      ['Sí, por supuesto, el tomate es del país, de un caserío muy cerca de aquí. Y está a muy buen precio además.', 'Bai, noski, tomatea bertakoa da, inguruko baserri batekoa. Eta oso modu onean daukat, gainera.'],
      ['Las zanahorias, ¿las prefiere por unidades o de bolsa?', 'Azenarioak, nolakoak nahi dituzu? Solteak ala poltsakoak?'],
      ['¿Cuántas vainas quiere, tres cuartos de kilo?', 'Zenbat leka nahi duzu, hiru kilo-laurden?'],
      ['Estos tomates son transgénicos.', 'Tomate hauek transgenikoak dira.'],
      ['Estas lechugas son ecológicas.', 'Letxuga hauek ekologikoak dira.']
    ]},
    { h:['g) En la panadería', 'g) Okindegian'], p:56, r:[
      ['¿Qué clase de pan prefiere: barra larga, integral, baguette, chapata o quiere un pan rústico (hogaza)?', 'Zein ogi duzu nahiago: barra luzea, osoko ogia, baguettea, txapata edo baserriko ogia (ogi biribila)?'],
      ['Lo siento, el pan de molde se nos ha acabado. Mañana tendremos más.', 'Ez, moldeko ogia agortu egin zaigu. Bihar ekarriko digute gehiago.'],
      ['La siguiente hornada será dentro de una hora más o menos.', 'Hurrengo labealdia ordubete barru-edo izango da.'],
      ['Así pues, ¿quiere usted encargar pasteles para el domingo? ¿Cuántos quiere?', 'Beraz, pastelak enkargatu nahi dituzu iganderako? Zenbat nahi dituzu?'],
      ['¿Cómo desea usted las pastas? ¿Quiere que le ponga surtido, un poco de todo?', 'Pastak, nolakoak nahi dituzu? Denetatik jarriko al dizkizut, nahasian?']
    ]}
  ]},

  { id:'d02', n:'02', eu:'Estankoan', es:'En el estanco', p:57, z:[
    { r:[
      ['¿Quiere tabaco negro o rubio?', 'Tabako beltza ala gorria nahi duzu?'],
      ['Del tabaco de pipa, ¿qué clase prefiere? ¿Tiene alguna marca preferida?', 'Pipako tabakoan, zein klasetakoa gustatzen zaizu? Marka jakinik nahi duzu?'],
      ['¿Qué clase de tabaco de liar prefiere usted?', 'Zein biltzeko tabako-klase nahiago duzu?'],
      ['Sí, ¿cuántos puros quiere usted? Las cajas son de 12 puros.', 'Bai, zenbat zigarro puru nahi dituzu? Kaxak 12koak dira.'],
      ['Sí, por supuesto que cargamos mecheros. Pero si no, puede comprar este cargador (de mecheros).', 'Bai, metxeroak kargatzen ditugu. Bestela, (metxero-)kargatzaile hau eros dezakezu.'],
      ['No, aquí no vendemos ese tipo de impresos.', 'Ez, hemen ez dugu horrelako inprimakirik saltzen.'],
      ['¿Para dónde quiere usted los sellos de correos?', 'Norako nahi dituzu posta-zigiluak?'],
      ['Si va a enviar la carta al extranjero el sello es de 35 céntimos; para el resto, en cambio, de 26 céntimos.', 'Gutuna atzerrira bidali behar baduzu, zigilua 35 zentimokoa da; bestela, berriz, 26 zentimokoa.'],
      ['Sí, esta petaca de cuero puede ser muy adecuada para hacer un regalo a su amigo.', 'Bai, larruzko petaka hau aukera ona izan daiteke zure lagunari opari polit bat egiteko.']
    ]}
  ]},

  { id:'d03', n:'03', eu:'Burdindegian', es:'En la ferretería', p:58, z:[
    { r:[
      ['Sí, enseguida le hago una copia de la llave.', 'Bai, oraintxe egingo dizut giltza horren kopia bat.'],
      ['No, lo siento, pero aquí no hacemos copias de llaves de seguridad como esa. Para eso, debe de ir usted al establecimiento que está junto a la iglesia.', 'Ez, sentitzen dut, baina horrelako segurtasun-giltzen kopiarik ez dugu egiten hemen. Horretarako, eliza ondoko dendara joan beharko duzu.'],
      { f:['¿De qué medida quiere {0}?', 'Zein neurritako {0} nahi dituzu?'], o:[[['las puntas de París','puntapaxak'], ['los tirafondos','tirafondoak'], ['las arandelas','zirrindolak'], ['los tornillos','torlojuak'], ['los clavos','iltzeak']]], x:'⚠ El libro pone «tirafonfoak»: errata evidente por «tirafondoak» (tirafondos).' },
      ['Tenemos diferentes clases de colgadores para el baño: adhesivos o para clavar en la pared. ¿De cuáles prefiere?', 'Behar izanez gero, bainurako kako-klase hauek ditugu: itsasgarriak eta iltzatzekoak. Nolakoak nahiago dituzu?'],
      ['La sartén, ¿la quiere normal o la prefiere antiadherente?', 'Zartagina normala ala itsasgaitz horietakoa nahi duzu?'],
      ['Lo siento, no le he entendido bien. ¿Cuántos metros de cuerda ha dicho que necesita?', 'Barkatu, ez dizut ondo aditu. Zenbat metro korda behar dituzula esan duzu?'],
      ['Por supuesto que tenemos llaves inglesas. Pero ¿de qué medida las quiere: de 8, de 10, de 12 o de 15?', 'Bai, noski, badauzkagu giltza ingelesak. Baina zer neurritakoak behar dituzu: 8, 10, 12 edo 15ekoak?'],
      ['Yo creo que para ese tipo de trabajo las sierras circulares son las más adecuadas.', '(Nik) uste dut zuk nahi duzun lan horretarako zerra zirkularrak direla egokienak.'],
      ['¿Para qué quiere Ud. la sierra, para cortar madera o para cortar metal?', 'Zertarako behar duzu zerra, egurra mozteko ala metala mozteko?'],
      ['Estos martillos están muy bien de precio: tienen mango de madera, y son de 16 o de 26 mm.', 'Mailu hauek oso merke dauzkazu. 16 nahiz 26 mm-koak dira, eta heldulekua zurezkoa dute.'],
      ['Aquí tiene puntales para ese destornillador. ¿Cuáles de estos necesita Ud.?', 'Hemen dauzkazu hainbat puntako bihurkin horrentzat. Zeintzuk behar dituzu?']
    ]}
  ]},

  { id:'d04', n:'04', eu:'Loradendan', es:'En la floristería', p:59, z:[
    { r:[
      ['¿Qué idea tiene usted, regalarle un ramo de flores, o prefiere tal vez una planta? ¿Y qué tal si eligiera un bonito centro de mesa?', 'Zer asmo duzu? Lore-sorta bat oparitzea? Ala landare bat nahiago duzu? Edo mahaierdiko polit bat aukeratuko bazenu?'],
      { f:['Sí, yo creo que en este caso {0} pueden ser muy adecuados.', 'Bai, (nik) uste dut kasu honetan {0} oso egokiak izan daitezkeela.'], ng:1, o:[[['los claveles','krabelinak'], ['las rosas','arrosak'], ['los tulipanes','tulipak'], ['las violetas','bioletak'], ['las margaritas','bitxiloreak']]] },
      ['¿Le pongo de las dos clases mezcladas? ¿Así, hasta completar docena y media?', 'Bietatik nahasian jarriko dizkizut? Horrela, dozena eta erdiko sorta osatu arte?'],
      ['¿A dónde hay que enviar las flores?', 'Nora bidali behar dira loreak?'],
      ['¿Quiere usted escribir algo en la tarjeta?', 'Zerbait idatzi nahi duzu txartelean?'],
      ['¿Qué inscripción desea grabar en la cinta que lleva la corona?', 'Enkargatu didazun koroarekin batera, zerbait grabatu nahi duzu zintan?'],
      ['Conviene cambiar la tierra a los dos meses, porque de lo contrario la planta se secará. Con regarla una vez a la semana es suficiente.', 'Lurra bi hilabete barru aldatzea komeni da. Bestela, ihartzeko arriskua dago. Astean behin ureztatzea nahikoa da.'],
      ['Ese abono es muy bueno. ¿Se lo va a llevar usted?', 'Ongarri hori oso ona duzu. Eramango al duzu?']
    ]}
  ]},

  { id:'d05', n:'05', eu:'Argazki-dendan', es:'En la tienda de fotos', p:60, z:[
    { r:[
      ['¿Para cuándo querría que le imprimiéramos esta foto digital?', 'Noizko nahi zenuke inprimatzea argazki digital hau?'],
      ['La tarifa urgente es más cara que la tarifa normal.', 'Presakako tarifa normalarena baino garestiagoa da.'],
      ['¿Cuántas copias quiere de cada una?', 'Zenbat kopia nahi dituzu bakoitzetik?'],
      ['¿Las fotos son para el documento nacional de identidad?', 'Nortasun-agiria ateratzeko nahi al dituzu zure argazkiak?'],
      ['¿De qué tamaño quiere usted las ampliaciones de las fotos? Ya sabe, cuanto más se amplía una foto más definición pierde.', 'Zer neurritakoak egin nahi dituzu argazkien handipenak? Badakizu, zenbat eta gehiago handitu, orduan eta bereizmen gehiago galtzen du argazkiak.'],
      ['De las fotos de este CD, ¿de cuántas quiere copia en papel? ¿Cuántas copias de cada una?', 'CD honetako argazkietatik, zenbaten kopiak nahi dituzu paperean? Zenbat ale bakoitzetik?'],
      ['Ahora mismo les saco el reportaje de la boda. A ver si les gusta.', 'Oraintxe aterako dizuet ezkontzaren erreportajea. Ea gustatzen zaizuen.'],
      ['Sí, después puede usted completar el álbum de fotos con más hojas.', 'Bai, argazki-album hau orri osagarriekin osa dezakezu gero.'],
      ['Tenemos una gran variedad de marcos: metálicos, de cristal, etc. de varias formas y tamaños.', 'Marko-aukera handia daukagu: metalikoak, kristalezkoak..., hainbat forma eta tamainatakoak.'],
      ['Con esta cámara de fotos digital puede sacar sus fotos en formato panorámico.', 'Argazki-kamera digital honekin, formatu panoramikoan atera ditzakezu argazkiak.'],
      ['Esta videocámara tiene dos tipos de zoom, de aumento diferente: uno digital y otro óptico.', 'Bideokamera honek bi zoom mota dauzka, handipen diferentekoak: digitala bata eta optikoa bestea.']
    ]}
  ]},

  { id:'d06', n:'06', eu:'Erloju-dendan. Bitxi-dendan', es:'En la relojería. En la joyería', p:61, z:[
    { r:[
      ['¿Cuánto dinero quiere Ud. gastarse en el reloj, más o menos?', 'Zenbat diru gastatu nahi zenuke erlojuan, gutxi gorabehera?'],
      ['¿Quiere usted un reloj digital o lo prefiere analógico?', 'Erloju digitala nahi duzu, ala erloju analogikoa?'],
      ['Estos modelos son muy adecuados para los críos, porque pueden bañarse con ellos sin ningún problema.', 'Umeentzako hauek oso egokiak dituzue, uretan arazorik gabe sartzeko modua izango dute-eta.'],
      ['¿Qué le pasa al reloj?', 'Zer gertatzen zaio erlojuari?'],
      ['Bueno, procuraremos arreglarlo en el taller, pero tal vez tendremos que enviárselo al fabricante. ¿Me podría dar su nombre? ¿Y el nº de teléfono, por favor?', 'Tailerrean konpontzen saiatuko gara, baina agian fabrikatzaileari bidali beharko diogu. Zure izena emango didazu? Eta telefono-zenbakia?'],
      ['Venga Ud. dentro de unos diez días, a ver si ya está arreglado.', 'Hamar bat egun barru etorri ea konponduta dagoen ikustera.'],
      { f:['Hoy en día las joyas que más se venden son de este tipo: {0}.', 'Gaur egun, honelako bitxiak saltzen dira gehien: {0}.'], o:[[['pendientes','belarritakoak'], ['anillos','eraztunak'], ['collares','lepokoak'], ['pulseras','eskumuturrekoak']]] },
      ['Actualmente está de moda el oro blanco y estos modelos son los más vendidos.', 'Bai, gaur egun urre zuria dago modan, eta modelo hauek dira gehien saltzen direnak.'],
      { f:['¿Qué tipo de piedra preciosa busca usted, {0}?', 'Zein harribitxi-mota ari zara bilatzen, {0}?'], o:[[['rubís','errubiak'], ['esmeraldas','esmeraldak'], ['granates','granateak']]] },
      ['O sea que ¿desea usted una pulsera de diamantes? Enseguida se las enseño, las hay preciosas.', 'Diamantezko eskumuturrekoa nahiko zenuke orduan? Erakutsiko dizkizut, dotoreak dituzu-eta.'],
      ['Dígame, ¿qué desea usted que grabemos en ese anillo?', 'Bai, zer nahi duzu grabatzea eraztun horretan?'],
      ['¿Qué tipo de despertador quiere? ¿Qué sonido de alarma quiere? ¿O prefiere despertarse con la radio?', 'Zer-nolako iratzargailua nahi duzu? Nolako alarma-hotsa izatea nahi duzu? Edo irratiarekin esnatzea nahiago duzu?']
    ]}
  ]},

  { id:'d07', n:'07', eu:'Garbitegian. Tindategian', es:'En la lavandería. En la tintorería', p:62, z:[
    { r:[
      { f:['En un par de días podrá recoger {0} que ha traído usted a lavar, pero para eso deberá presentar el resguardo.', 'Pare bat egun barru jaso ahal izango duzu/dituzu garbitzeko ekarri duzun/dituzun {0}, baina horretarako ordezkagiria aurkeztu/erakutsi beharko duzu.'], ng:1, o:[[['el vestido','soinekoa'], ['la chaqueta','jaka'], ['los pantalones','galtzak'], ['la gabardina','gabardina']]] },
      ['Por supuesto, también le lavaremos esa chaqueta de cuero.', 'Jakina, larruzko jaka hori ere garbituko dizugu.'],
      ['¿Para cuándo querría usted las cortinas y las alfombras? Está bien, las tendrá preparadas para ese día.', 'Noizko nahi zenituzke gortinak eta alfonbrak? Ondo da, egun horretarako prest izango dituzu.'],
      ['¿De qué color quiere que le tiñamos esta ropa?', 'Zer koloretan nahi duzu tindatzea arropa hau?'],
      ['No tenga cuidado, le plancharemos el vestido de 1ª comunión y lo tendrá listo para el día adecuado.', 'Egon lasai. Lehen jaunartzeko soineko hau goitik behera lisatu, eta garaiz prestatuko dizugu.'],
      ['La limpieza del edredón que ha traído tardará 4 o 5 días, y le costará 26 euros.', 'Zuk ekarritako edredoi hau lauzpabost egun barru edukiko duzu garbituta. 26 euro kostatuko zaizu.']
    ]}
  ]},

  { id:'d08', n:'08', eu:'Liburu-dendan. Paper-dendan', es:'En la librería. En la papelería', p:63, z:[
    { r:[
      ['¿Qué tipo de libro quiere usted regalar?', 'Zer-nolako liburua nahi duzu opari hori egiteko?'],
      { f:['¿Qué clase de libros le gusta leer? {0}', 'Zer-nolako liburuak irakurtzea gustatzen zaio? {0}'], o:[[['¿De misterio?','Misteriozkoak?'], ['¿De ciencia-ficción?','Zientzia-fikziozkoak?'], ['¿Románticas?','Maitasunezkoak?'], ['¿Best-seller?','Best-seller horietakoak?'], ['¿De qué otro tipo?','Edo nolakoak?']]] },
      ['Yo creo que los libros de esta sección le gustarán mucho.', '(Nik) uste dut sail honetakoak asko gustatuko zaizkizula.'],
      ['No, en este momento no disponemos de ese libro, pero si Ud. quiere se lo pediremos al almacén y lo tendremos en un par de días.', 'Ez, liburu hori ez daukagu, baina nahi baduzu, biltegira eskatu, eta pare bat egun barru hementxe izango duzu.'],
      ['No, ese título que me dice está descatalogado. Será difícil que encuentre ese libro en una librería normal. Tendrá que intentarlo en alguna feria del libro viejo.', 'Ez, zuk aipatutako titulu hori katalogoz kanpo dago. Zaila izango duzu liburu-denda batean aurkitzea. Liburu zaharren azoka batean saiatu beharko duzu.'],
      ['Sí, sí, esta colección de mapas es muy adecuada para lo que usted quiere.', 'Bai, mapa-bilduma hau oso egokia da zuk nahi duzunerako.'],
      ['Sí, yo creo que este es el mejor mapa para lo que usted quiere.', '(Nik) uste dut hau dela zuk nahi duzun moduko maparik onena.'],
      ['No, en este momento no tenemos ningún mapa de carreteras de ese país.', 'Ez, herrialde horretako errepide-maparik ez daukagu orain dendan.'],
      ['Tenemos una amplia variedad de mapas de ese país. Mire, ojéelos y elija usted mismo.', 'Herrialde horretako mapa-aukera zabala daukagu. Begira, ikusi eta aukeratu zerorrek.'],
      ['¿Qué color quiere para el recambio de ese bolígrafo: azul o negro?', 'Zer koloretako karga nahi duzu bolaluma horrentzat: urdina ala beltza?'],
      { f:['¿Qué tipo de cuaderno quiere usted: {0}', 'Zer-nolako koadernoa behar duzu: {0}'], o:[[['¿cuadriculado?','laukiduna?'], ['¿de espiral?','espiraldun edo kiribilduna?'], ['¿perforado?','zuloduna?'], ['¿microperforado?','mikrozulatua?'], ['¿qué otro tipo?','edo nolakoa?']]] },
      { f:['¿Cuántos {0} quiere usted?', 'Zenbat {0} nahi dituzu?'], ng:1, o:[[['folios','folio'], ['sobres','gutun-azal'], ['cuadernos','koaderno'], ['carpetas','karpeta']]] },
      { f:['No, no tenemos {0} para colorear.', 'Ez, ez daukagu haurrek margotu eta koloreztatzeko {0}.'], o:[[['cuentos','ipuinik'], ['cuadernos','koadernorik']]] },
      ['¿Para quién quiere usted el diccionario?', 'Norentzat behar duzu hiztegia?'],
      { f:['¿De cuántos idiomas quiere el diccionario? {0}', 'Zein hizkuntzatako hiztegia behar duzu? {0}'], o:[[['¿Solo euskera?','Euskara hutsekoa?'], ['¿O castellano/euskera?','Ala euskara/gaztelania?'], ['¿O francés/euskera?','Edo euskara/frantsesa?'], ['¿O inglés/euskera?','Edo euskara/ingelesa?']]] },
      ['No, lo siento, no tenemos postales.', 'Ez, sentitzen dut, ez daukagu posta-txartelik.'],
      ['Sí, aquí tiene usted postales, écheles un vistazo, a ver cuál le gusta más.', 'Bai, begira, hainbat posta-txartel dauzkazu hemen. Ea zein duzun gustukoen.'],
      ['Dígame, ¿qué agenda quiere usted? ¿Una de esas pequeñas, para llevar en el bolso, o una un poco mayor para tener en casa? Estas son muy baratas.', 'Bai, nolako agenda nahi duzu? Poltsan eramateko moduko txiki bat ala etxean edukitzeko beste handiago bat? Hauek oso prezio onean daude.'],
      ['¿Quiere que se lo envuelva para regalo?', 'Oparitarako biltzea nahi al duzu?'],
      ['El papel para regalos, ¿de qué tipo lo quiere usted?', 'Paketeak biltzeko opari-papera, nolakoa behar duzu?'],
      ['¿Algún otro adorno? ¿Alguna cinta?', 'Bestelako apaingarririk? Zintarik edo?']
    ]}
  ]},

  { id:'d09', n:'09', eu:'Musika-dendan', es:'En la tienda de música', p:65, z:[
    { r:[
      ['No, el disco que usted me pide se ha acabado. Lo recibiremos de nuevo la semana que viene.', 'Ez, zuk eskatutako disko hori agortu egin zaigu. Datorren astean izango dugu berriro.'],
      ['La música vasca la encontrará en esa estantería.', 'Bai, euskal musika horko apal horretan daukazu.'],
      { f:['Lo siento, ese {0} está descatalogado.', 'Ez, {0} hori katalogoz kanpo dago.'], o:[[['disco','disko'], ['CD','CD'], ['DVD','DVD']]] },
      ['Estos CDs y DVDs vírgenes son muy buenos para grabar las descargas de Internet.', 'Erabili gabeko CD eta DVD hauek aproposak dira Internetetik jaitsitakoak grabatzeko.'],
      ['En cuanto a la capacidad, los hay desde 700 Mb hasta 4 Gb.', 'Edukierari dagokionez, 700 Mb-etik hasi eta 4 Gb-era artekoak dituzu.'],
      ['¿Cuántas entradas quiere para el festival de música del sábado?', 'Zenbat sarrera nahi dituzu larunbateko musika-jaialdirako?'],
      ['No, la música de ese grupo no está en discos de vinilo, solo se ha publicado en CDs.', 'Ez, talde horren musika ez dago binilozko diskotan, CDtan bakarrik aurkituko duzu.']
    ]}
  ]},

  { id:'d10', n:'10', eu:'Mertzerian', es:'En la mercería', p:66, z:[
    { r:[
      { f:['¿De qué {0} desea usted los botones?', 'Zer {0} botoiak nahi dituzu?'], o:[[['color','koloretako'], ['medida','neurritako'], ['forma','formatako']]] },
      ['¿Cuántos metros de cinta necesita?', 'Zenbat metro zinta behar dituzu?'],
      ['Los imperdibles, ¿los quiere grandes, o prefiere estos más pequeños?', 'Kateorratz handiak nahi dituzu, edo beste txikixeago hauek?'],
      { f:['No, todavía no hemos recibido {0} de invierno. Los recibiremos al final del verano más o menos.', 'Ez, neguko {0} ez dugu oraindik jaso. Horiek uda amaitzean-edo izango ditugu.'], o:[[['la ropa','arroparik'], ['los pijamas','pijamarik'], ['las bufandas','bufandarik'], ['los guantes','eskularrurik']]] },
      ['Estos calcetines largos les gustan mucho a las personas mayores, porque son muy suaves.', 'Galtzerdi luze hauek oso gustukoak ditu adineko jendeak, leun-leunak direlako.'],
      ['Tenemos una gran variedad de medias hasta la cintura. Ya se las voy a enseñar.', 'Gerrirainoko galtzerdietan aukera zabala duzu. Aterako dizkizut ikusteko.'],
      ['Le recomiendo estas otras de licra. El fabricante es de toda garantía.', 'Lycrazko beste horiek gomendatzen dizkizut. Egiten dituena oso fabrikatzaile ona da.'],
      { f:['En este momento tenemos una gran oferta de sujetadores. La colección es actual, la acabamos de recibir: {0}.', 'Bularretakoetan eskaintza handia dugu une honetan. Bilduma heldu berria da. Ikusi: {0}.'], o:[[['con aros','uztaidunak'], ['sin aros','uztaigabeak'], ['de encaje','enkajedunak'], ['con relleno','betegarridunak'], ['deportivos','kirola egitekoak']]] },
      ['Además, si lo desea, tiene bonitos conjuntos de braga y sujetador.', 'Bestetik, nahi izanez gero, kulero eta bularretako joko politak ere badituzu.'],
      ['Los calcetines de caballero los tenemos en cuatro colores: negro, azul, gris y marrón.', 'Gizonezkoen sport-galtzerdiak lau koloretan ditugu: beltzak, urdinak, grisak eta marroiak.'],
      ['De acuerdo, entonces le pongo una camiseta de niño de manga corta, una de caballero de tirantes y unos calzoncillos.', 'Horrelaxe jarriko dizkizut, orduan: mahuka motzeko elastiko bat, mutilena; beste bat tiranteduna, gizonena; eta galtzontzilloak.']
    ]}
  ]},

  { id:'d11', n:'11', eu:'Optikan', es:'En la óptica', p:67, z:[
    { r:[
      ['¿Necesita usted gafas progresivas? ¿O unas graduadas normales?', 'Betaurreko progresiboak behar al dituzu? Ala graduatu normalak?'],
      ['Mire, estos son los modelos de gafas que más vendemos ahora. Tiene usted una gama muy grande en monturas.', 'Begira, hauek dira gehien saltzen diren betaurreko-modeloak. Eustoin edo armazoietan aukera handia daukazu.'],
      ['Pruébeselas ahí mismo, frente al espejo, a ver qué le parecen.', 'Probatu itzazu hortxe, ispiluaren aurrean, ea zer iruditzen zaizkizun.'],
      ['Sí, tenemos aquí su ficha. Con ella le prepararemos enseguida unas gafas nuevas.', 'Bai, zure fitxa hementxe daukagu, eta horrekin betaurreko berriak berehala prestatuko dizkizugu.'],
      ['¿Quiere que le dé hora para graduarse la vista? ¿Le viene bien mañana a las cinco de la tarde?', 'Ikusmena graduatzeko ordua ematerik nahi al duzu? Ondo al datorkizu bihar arratsaldeko bostetan?'],
      ['No, tranquila, estas gafas de sol tienen cristales polarizados, y con ellas no tendrá usted ningún problema, tampoco en la nieve.', 'Ez, lasai, eguzkitako betaurreko hauek kristal polarizatuak dauzkate, eta hauekin ez duzu inolako arazorik edukiko, ezta elurretan ere.'],
      ['Estas gafas de sol cumplen todas las normas de seguridad. Por esa parte, son de absoluta garantía.', 'Eguzkitako betaurreko hauek segurtasuneko araudi guztiak betetzen dituzte. Alde horretatik, erabateko bermea ziurtatua dago.'],
      ['¿Qué tipo de lentillas usa usted: rígidas, normales (convencionales) o de las desechables?', 'Zer-nolako lentillak erabiltzen dituzu: gogorrak, normalak (konbentzionalak) ala erabili eta botatzeko horietakoak?'],
      ['Le serviré el líquido limpiador adecuado a la lentilla.', 'Lentilla horren araberako likido garbitzailea emango dizut.']
    ]}
  ]},

  { id:'d12', n:'12', eu:'Botikan', es:'En la farmacia', p:68, z:[
    { r:[
      ['¿Ha traído usted la tarjeta sanitaria junto con la receta?', 'Ekarri al duzu osasun-txartela errezetarekin batera?'],
      ['Lo siento, para dispensarle ese medicamento necesita receta del médico.', 'Ez, sentitzen dut, medikuaren errezeta behar duzu botika hori lortu ahal izateko.'],
      ['Para el tratamiento de los piojos tendrá usted que comprar una loción y un champú especiales. Y leer las instrucciones de esta hoja.', 'Zorrien kontrako tratamendua egiteko lozioa eta xanpua erosi beharko dituzu. Eta irakurri orri honetan ematen diren jarraibideak.'],
      ['Sí, existe un cepillo especial para quitar las liendres de la cabeza.', 'Bai, bada orrazi berezi bat buruko bartzak kentzeko.'],
      ['¿Qué prefiere, un cepillo de dientes de cerdas duras, o prefiere un cepillo blando?', 'Nolako hortz-eskuila nahi duzu? Zurda gogorrak dituena ala zurda bigunekoa?'],
      ['Este fármaco es el mismo que me ha pedido usted, pero al ser un genérico es mucho más barato.', 'Botika hau zuk eskatutako bera da, baina, generikoa denez, askoz ere merkeagoa da.'],
      ['Es muy importante que tome este medicamento cada ocho horas, 3 veces al día, y antes de las comidas.', 'Garrantzi handikoa da botika hau zortzi ordutik zortzi ordura hartzea, egunean 3 aldiz, eta otorduen aurretik hobe.'],
      ['Le daré estas gotas para quitarle el dolor de oído, pero lo mejor es que vaya al médico mañana mismo.', 'Belarriko mina kentzeko tanta hauek emango dizkizut, baina hobe duzu bihar bertan medikuarengana joan.'],
      ['Este esparadrapo es de papel, no produce alergia y se quita muy fácilmente.', 'Esparatrapu hau paperezkoa da, ez du alergiarik sortzen eta oso erraz kentzen da.'],
      ['A decir verdad, esta pulsera no produce ningún efecto, pero, por supuesto, tampoco hace ningún mal.', 'Egia esateko, eskumuturreko honek ez du aparteko eraginik, baina kalterik ere ez du egiten, noski.'],
      ['Lo siento, aquí no vendemos plantas medicinales. Para eso deberá ir a algún comercio especializado.', 'Ez, hemen ez daukagu sendabelarrik. Horretarako, denda espezializatu batera joan beharko duzu.']
    ]}
  ]},

  { id:'d13', n:'13', eu:'Ile-apaindegian', es:'En la peluquería', p:69, z:[
    { h:['a) De hombres', 'a) Gizonezkoena'], p:69, r:[
      ['Tendrá usted que esperar un poco. Tiene tres por delante. Serán unos veinte minutos.', 'Txanda itxaron beharko duzu. Hiru pertsona dauzkazu aurretik. Beraz, hogei bat minutu izango dira.'],
      ['¿Cómo quiere que le corte el pelo?', 'Nola nahi duzu moztea ilea?'],
      ['Primero le lavaré la cabeza.', 'Aurrena, burua garbituko dizut.'],
      ['El pelo, ¿se lo corto a navaja o con la máquina?', 'Ilea labanaz moztea nahi duzu, edo makinarekin egingo dizut?'],
      ['¿Lo prefiere con tijera?', 'Nahiago al duzu artaziz?'],
      ['¿Quiere que le suba las patillas?', 'Nahi al duzu patillak (ile-zangoak) igotzea?'],
      ['¿Le pongo gomina? Este spray apenas mancha.', 'Gominarik jarriko al dizut? Espraizko honek ez du ia zikintzen.'],
      ['¿Qué marca de colonia usa usted? Tengo estas muestras para regalar.', 'Zer kolonia-marka erabiltzen duzu? Lagin hauek oparitzeko dauzkat.']
    ]},
    { h:['b) De mujeres', 'b) Emakumezkoena'], p:69, r:[
      ['O sea, ¿sólo lavar y marcar?', 'Beraz, garbitu eta markatu besterik ez?'],
      ['Después de lavar, ¿quiere que le ponga una máscara o alguna crema hidratante? El peinado le durará más.', 'Garbitu ondoren, maskararik edo krema hidratatzailerik jartzea nahi al duzu? Orrazketak gehiago iraungo dizu.'],
      ['¿Cómo quiere que le deje el flequillo?', 'Nola nahi duzu kopeta-ilea uztea?'],
      { f:['¿Quiere que le iguale {0}?', '{0} berdintzea nahi duzu?'], o:[[['el pelo','Ilea'], ['las puntas','Puntak']]] },
      ['Sí mujer, el pelo rizado le quedará muy bien. ¿O lo prefiere liso?', 'Bai emakumea, kizkurturik oso ederki geratuko zaizu. Ala lisoa nahiago duzu?'],
      ['Bueno, para ponerse extensiones deberá coger hora para otro día.', 'Beno, ile-luzapenak jartzeko beste egun baterako txanda hartu beharko duzu.'],
      ['Entonces ¿qué? ¿Teñir el pelo o solamente dar mechas?', 'Orduan, zer? Ilea tindatu egingo dugu, edota ile-sortak egin besterik ez?'],
      ['Yo creo que este corte de pelo le va muy bien a su cara.', '(Nik) uste dut ile-mozketa hau oso ondo doakizula zure aurpegierarekin.'],
      ['Por los rasgos de su cara, creo que le queda muy bien ese corte de pelo.', 'Nire ustez, zure aurpegierari oso ondo doakio ile-mozketa hori.'],
      ['¿Quiere alguna revista, café, agua o alguna otra cosa?', 'Aldizkariren bat, kaferik, urik edo beste zerbait nahi al duzu?'],
      ['Tenemos bonos para cinco peinados. Así le sale algo más barato. Creo que merece la pena.', 'Bost orraztalditarako bonuak baditugu. Merkexeago ateratzen zaizu. Hartzea merezi du.'],
      ['Entonces, ¿le doy hora para hacerse la pedicura y la manicura?', 'Beraz, ordua emango al dizut pedikura eta manikura egiteko?']
    ]}
  ]},

  { id:'d14', n:'14', eu:'Lurrindegian. Drogerian', es:'En la perfumería. En la droguería', p:70, z:[
    { r:[
      ['¿Qué tipo de recambios quiere para la maquinilla de afeitar? ¿De las desechables?', 'Bizar-aitzurrerako ordezkoak nolakoak behar dituzu? Erabili eta botatzekoak?'],
      ['Pruebe esta nueva crema de afeitar.', 'Proba ezazu bizarra mozteko krema berri hau.'],
      ['A los hombres les gusta mucho esta loción para después del afeitado.', 'Gizonezkoek oso gustukoa dute bizarra egin ondorengo lozio hau.'],
      ['Esta crema de día le hidratará la cara. La crema de noche, en cambio, es nutritiva.', 'Eguneko krema honek oso ondo hidratatuko dizu aurpegia. Gauekoa, berriz, nutritiboa da.'],
      { f:['Mire, tenemos esta bolsita de regalo. En el interior tiene Vd. estas muestras: {0}.', 'Begira, opari moduan poltsatxo hau dugu. Barruan, lagin hauek datoz: {0}.'], o:[[['crema facial antiarrugas','aurpegi-krema, zimur kontrakoa'], ['contorno de ojos','begi ingurukoa'], ['crema corporal reafirmante','gorputz-krema sendotzailea'], ['crema de manos','esku-krema'], ['lápiz de labios','ezpainetakoa']]] },
      ['Este maquillaje es ideal para su tono de piel. Lléveselo tranquilamente.', 'Zure larruazal-tonurako oso makillaje polita da hori, eraman lasai.'],
      ['Entonces, ¿qué? ¿Le pongo también la sombra de ojos para efectos especiales?', 'Efektu berezietarako begi-itzal hau ere jarriko dizut orduan?'],
      ['¿Qué factor de protección solar quiere? ¿El número 20?', 'Eguzkitik babesteko krema zer zenbakitakoa/faktoretakoa nahi duzu? 20koa?'],
      ['Hoy en día hay muy buenas cremas bronceadoras.', 'Beltzarantzeko krema onak dituzu gaur egun.'],
      ['¿El cepillo de dientes, lo prefiere blando o duro?', 'Hortzetako eskuila, gogorra ala biguna nahi duzu?'],
      ['Esta es la gama de lápices de labios que se ha puesto de moda últimamente.', 'Ezpainetako arkatzen gama hau jarri da modan azken denboraldi honetan.'],
      ['Esta colonia infantil es muy suave. Y este perfume también.', 'Haur-kolonia hau oso suabea da. Lurrin hau ere bai.'],
      ['No, ese no es un perfume de señora, sino una colonia de caballero.', 'Ez, hori ez da emakume-lurrina, gizonezko-kolonia baizik.'],
      ['Papel higiénico, lejía y jabón. Todo por 4 euros y veinte céntimos.', 'Komuneko papera, lixiba eta xaboia. Guztira, 4 euro eta hogei zentimo.']
    ]}
  ]},

  { id:'d15', n:'15', eu:'Arropa-dendan', es:'En la tienda de ropa', p:72, z:[
    { r:[
      ['¿Qué talla de camisa utiliza usted normalmente?', 'Zer alkandora-neurri erabiltzen duzu normalean?\nZer neurritako alkandora erabiltzen duzu?'],
      ['Por supuesto, vaya usted al probador y pruébeselo tranquilamente.', 'Bai, noski, zoaz probaleku horretara eta saia(tu) ezazu lasai.'],
      ['El pantalón ¿de qué tela lo quiere usted? Las personas mayores los prefieren de pana.', 'Zein ehunetako galtza nahi duzu? Adineko pertsonek oso gustukoak dituzte belus ildokatuzkoak (panazkoak).'],
      ['¿Desea usted pantalones vaqueros, o prefiere pantalones más de vestir? ¿Cuál es su idea?', 'Galtza bakeroak nahi al dituzu ala janztekoak/jantziagoak nahiago dituzu? Zein da zure ideia?'],
      ['En esta sección son todo pantalones pitillo. Pero también tenemos piratas.', 'Atal honetan galtza zango-estuak dira. Begira, piratak ere baditut.'],
      ['De éstas ¿cuál o cuáles le gustan?', 'Hemengo hauetatik zeintzuk gustatzen zaizkizu?'],
      ['Sí, claro, si usted quiere le cogeremos el dobladillo al pantalón.', 'Bai, noski, nahi izanez gero, galtzari azpildurak hartuko dizkiogu.'],
      { f:['La camisa la quiere usted {0}', 'Nolako alkandora nahiko zenuke? {0}'], o:[[['¿de manga corta o de manga larga?','Mahuka-luzea ala mahuka-motza?'], ['¿de cuadros o de rayas?','Koadroduna ala marraduna?'], ['¿lisa? ¿de qué color?','Lisoa bestela? Zer koloretakoa?']]] },
      ['No se olvide que para cambiar el producto necesita traer el ticket de compra.', 'Ez ahaztu aldatu ahal izateko erosketa-tiketa ekarri beharko duzula.'],
      ['No, en rebajas el precio del producto es el que se indica en la etiqueta.', 'Ez, merkealdietan produktuen prezioa etiketan adierazten dena izaten da.'],
      ['Sí, en rebajas, se cobran los arreglos.', 'Bai, merkealdietan konponketak kobratu egiten dira.'],
      ['En las rebajas, los productos no tienen garantía.', 'Merkealdietan produktuek ez dute garantiarik izaten.']
    ]}
  ]},

  { id:'d16', n:'16', eu:'Zapata-dendan', es:'En la zapatería', p:73, z:[
    { r:[
      ['¿Qué pie calza usted?', 'Zein da zure zapata-neurria?'],
      ['¿Qué nº de zapato usa usted normalmente?', 'Normalean zer neurritako oinetakoa erabiltzen duzu?'],
      { f:['¿Qué tipo de zapato prefiere, con {0}', 'Nolako zapatak nahi dituzu, {0}'], ng:1, o:[[['tacón alto o tacón bajo?','takoi altukoak ala baxukoak?'], ['plataforma?','plataformadunak?'], ['cordones o sin cordones?','lokarridunak ala lokarri gabekoak?']]] },
      ['De tipo sport, tengo estos zapatos.', 'Sportekoen artean, oinetako hauek dauzkat.'],
      ['¿Qué le parecen estas botas altas con cremallera? Bonitas, ¿a que sí?', 'Zer deritzezu bota altu kremaileradun hauei? Dotoreak benetan, nola ikusten dituzu?'],
      ['¿Le gustan estas zapatillas con flores para la hija?', 'Txapin loredun hauek gustatzen al zaizkizu alabarentzat?'],
      ['Mire estas sandalias cerradas. Las abiertas, en cambio, son más vestidas. Yo creo que son más adecuadas para ir de noche.', 'Ikusi sandalia itxi hauek. Irekiak, ordea, jantziagoak dira, bai. Nik hobeto ikusten dizkizut gauez janzteko.'],
      ['Por otra parte estas sandalias tipo esclava son muy cómodas, adecuadas para andar mucho.', 'Bestela ere, behatz-sandalia hauek oso erosoak dira. Asko ibiltzeko modukoak.'],
      ['Puede cambiar las medias suelas de plástico por otras de cuero, para no resbalarse.', 'Plastikozko zola-erdiak ken ditzakezu eta larruzkoak jarri, ez irristatzeko.'],
      ['Esas botas mejorarán mucho con unas plantillas. Son muy de vestir, como usted quería.', 'Barne-zola batzuekin ederki izango dituzu bota horiek. Oso jantziak dira, zuk eskatu bezala.'],
      ['También tenemos cinturones y bolsos. Si quiere se los puedo enseñar.', 'Nahi izanez gero, gerrikoak eta poltsak ere baditugu. Erakutsi egingo dizkizut.']
    ]}
  ]},

  { id:'d17', n:'17', eu:'Telefonia mugikorreko dendan', es:'En la tienda de telefonía móvil', p:74, z:[
    { r:[
      ['El teléfono móvil, ¿lo quiere con contrato o con tarjeta recargable?', 'Mugikorra, nolakoa nahi duzu: kontratuduna ala txartel kargagarriduna?'],
      ['¿Cómo quiere el móvil, con tarjeta o sin ella?', 'Txartelarekin edo txartelik gabe nahi duzu zure telefono mugikorra?'],
      ['Los teléfonos móviles tienen una gran diferencia de precio: los más caros pueden costar hasta seis veces más.', 'Mugikorretan, prezio-aukera oso desberdinak dauzkazu: garestienak merkeenak halako sei balio du.'],
      ['Este teléfono móvil tiene integrado el sistema Bluetooth.', 'Telefono mugikor honek Bluetooth sistema integratua dauka.'],
      ['Con este modelo de móvil tiene usted la posibilidad de hacer fotos.', 'Telefono mugikor honekin argazkiak egiteko aukera daukazu.'],
      { f:['Estos modelos ofrecen una gran variedad de prestaciones: {0}.', 'Modelo hauek prestazio ugari dituzte: {0}.'], o:[[['marcación directa','zuzenean markatzeko aukera'], ['rellamada automática','birdei automatikoa'], ['mantener una conversación múltiple con varias personas a la vez','bi pertsona edo gehiagorekin aldi berean elkarrizketa egiteko aukera'], ['marcación por voz','ahotsez markatzeko aukera'], ['posibilidad de adjuntar imágenes a los mensajes de texto','testu-mezuei irudiak eransteko aukera'], ['juegos','jokoak']]] },
      ['Para esa clase de teléfono móvil, estas fundas son muy adecuadas. El diseño es muy bonito y son muy resistentes.', 'Klase horretako telefono mugikorretarako, zorro hauek dira egokiak. Oso diseinu polita dute, eta gainera gogor-gogorrak dira.']
    ]}
  ]},

  { id:'d18', n:'18', eu:'Informatika-dendan', es:'En la tienda de informática', p:75, z:[
    { r:[
      ['Pues yo creo que con lo que me ha dicho usted, el ordenador que más le conviene es este modelo.', 'Ba, (nik) uste dut, zuk esandakoarekin, gehien komeni zaizun ordenagailua modelo hau dela.'],
      ['Este ordenador portátil está muy bien. Y además, es más práctico.', 'Ordenagailu eramangarri hau oso itxurosoa da. Eta praktikoagoa duzu.'],
      ['No hay ningún problema para aumentar la memoria de su disco duro de 500 Gb a 1 Tb, por ejemplo.', 'Ez dago inolako arazorik zure disko gogorreko memoria handitzeko: 500 Gb-tik 1 Tb-ra, esaterako.'],
      ['En ese caso, también le conviene cambiar la tarjeta de sonido.', 'Soinu-txartela aldatzea ere komeni zaizu, kasu horretan.'],
      ['Tenga en cuenta que la velocidad de la impresora láser es muy grande.', 'Kontuan hartu laser-inprimagailuaren abiadura oso handia dela.'],
      { es:'Yo creo que esta impresora normal de chorro de tinta es suficiente para trabajar en casa.', eu:'(Nik) uste dut etxerako tintazko inprimagailu arrunt hau aski izango duzula.', x:'⚠ El libro repite «uste dut dut».' },
      { f:['En ratones tenemos los siguientes modelos: {0}.', 'Saguetan honelakoak ditugu: {0}.'], o:[[['estáticos convencionales','betiko estatikoak'], ['ópticos','optikoak'], ['inalámbricos','hari gabekoak']]] },
      ['¿Cuál le pongo?', 'Zein jarriko dizut?'],
      ['Le regalamos la alfombrilla.', 'Sagu-azpikoa erregalatuko dizugu.'],
      ['Actualmente la mayoría de las pantallas son de cristal líquido.', 'Gaur egun pantailak kristal likidozkoak dira gehienbat.'],
      ['Aquí tiene los CD-ROM y los DVD. ¿Necesita algo más?', 'Hemen dituzu CD-ROMak eta DVDak. Besterik behar duzu? / Beste ezer behar duzu?'],
      ['Bueno, deje aquí su ordenador, y veremos dónde está el fallo.', 'Beno, utz ezazu hemen zure ordenagailua, eta begiratuko dugu ea zertan huts egiten duen.']
    ]}
  ]},

  { id:'d19', n:'19', eu:'Etxetresna elektrikoen dendan', es:'En la tienda de electrodomésticos', p:76, z:[
    { r:[
      ['¿De qué medida quiere usted el horno microondas?', 'Zer neurritako mikrouhin-labea nahi duzu?'],
      ['¿Desea únicamente frigorífico, o el modelo que tiene frigorífico y congelador?', 'Hozkailua soilik ala hozkailua eta izozkailua batera dituen modeloa nahi duzu?'],
      ['Una lavadora de este tipo puede consumir hasta un 40% menos de energía que la otra.', 'Arropa-garbigailu honek beste horrek baino % 40 energia gutxiago kontsumitzen du, onenean ere.'],
      ['¿Desea usted una lavadora de carga superior o la prefiere de carga frontal?', 'Nolako garbigailua nahi duzu, goitik kargatzen diren horietakoa ala aurrealdetik kargatzekoa?'],
      ['La lavadora ¿cómo la quiere? ¿Con secadora integrada?', 'Arropa-garbigailua nolakoa nahi duzu, lehorgailua duena?'],
      ['En cuestión de televisores, tenemos una amplia gama: de plasma, normales (convencionales), analógicos. ¿Qué busca Ud. exactamente?', 'Telebisten artean aukera zabala daukagu: plasmazkoak, normalak, analogikoak. Zeren bila zabiltza zehazki?'],
      ['¿Cuánto dinero piensa gastar en la compra del televisor?', 'Zenbat diru gastatu nahi duzu telebistan?'],
      ['Este reproductor DVD es compatible con todos los sistemas, también con MP3.', 'DVD irakurgailu hau mota guztiekin da bateragarria, eta baita MP3rekin ere.']
    ]}
  ]},

  { id:'d20', n:'20', eu:'Kutxa erregistratzailean', es:'En la caja registradora', p:77, z:[
    { r:[
      ['No, lo siento, esta es una «caja máximo 10 productos». Pase por esa otra caja.', 'Ez, hau «gehienez ere 10 produktuko kutxa» da. Zoaz beste horretara.'],
      ['Buenos días. ¿Puede enseñarme su bolsa, por favor?', 'Egun on. Erakutsiko al didazu zure poltsa, mesedez?'],
      ['Sí, aquí tiene usted las bolsas.', 'Bai, hemen dituzu poltsak.'],
      { f:['Lo siento, pero no ha marcado el precio de {0}.', 'Barkatu, baina {0} hauei ez diezu preziorik jarri.'], o:[[['los puerros','porru'], ['las peras','udare'], ['las cerezas','gerezi']]] },
      { f:['No ha pesado usted {0}.', '{0} ez dituzu pisatu.'], o:[[['los plátanos','Platanoak'], ['los melocotones','Mertxikak'], ['las fresas','Marrubiak']]] },
      ['Ya lo siento, pero el lector de códigos de barras se ha estropeado.', 'Barkatu, baina barra-kodeen irakurgailua matxuratu egin da.'],
      ['Son 14 euros y cuarenta céntimos.', '14 euro eta berrogei zentimo dira.'],
      ['¿Tiene usted tarjeta de socia?', 'Bazkide-txartelik ba al duzu?'],
      ['¿Me puede enseñar su documento nacional de identidad, por favor?', 'Erakutsiko al didazu zure nortasun-agiria, mesedez?'],
      ['Firme aquí, por favor.', 'Sina ezazu hor, mesedez.'],
      ['Para cualquier cambio o devolución, conserve el embalaje y el ticket de compra.', 'Aldatzeko edo itzultzeko, gorde enbalajea eta erosketa-tiketa.'],
      ['¿Quiere que se lo llevemos a casa? El coste del servicio a domicilio es de 2 euros.', 'Etxera eramatea nahi al duzu? Etxera eramateko zerbitzuaren kostua 2 euro da.'],
      ['¿Me puede dar la dirección de su casa, por favor? ¿Y el nº de teléfono?', 'Emango al didazu zure etxeko helbidea? Eta telefonoa?'],
      ['Irán a las seis de la tarde a su casa con el pedido.', 'Arratsaldeko seietan joango zaizkizu etxera eskabidearekin. Zehaztu ordua.'],
      ['Habrá alguien en casa, ¿verdad?', 'Etxean norbait izango da, ezta?'],
      ['¿Necesita usted un ticket para el parking?', 'Behar al duzu aparkalekurako txartelik?']
    ]}
  ]},

  { id:'d21', n:'21', eu:'Informazio-zerbitzuan', es:'En el servicio de información', p:78, z:[
    { r:[
      ['Los artículos depositados en consigna deben ser retirados en 24 horas.', 'Kontsignan utzitako gauzak 24 ordu baino lehen jaso behar dira.'],
      ['Según Ley 28/2005 no está permitido fumar en este establecimiento.', '28/2005 Legearen arabera, galarazita dago saltegi (establezimendu) honetan erretzea.'],
      ['Como bien sabrá usted, para cualquier reclamación es imprescindible la presentación del ticket de compra o factura.', 'Badakizu erreklamazio bat egiteko ezinbestekoa dela faktura edo erosketa-tiketa aurkeztea.']
    ]}
  ]}
]});

/* ══ 4 · INDUSTRIA · Industria (pp. 79–95) ══ */
A1_MINTZAMENA.b.push({ id:'i', eu:'Industria', es:'Industria', ic:'🏭', p:79, s:[

  { id:'i01', n:'01', eu:'Telefonoan', es:'Al teléfono', p:81, z:[
    { h:['a) Ofrecer un producto / un servicio al cliente o clienta', 'a) Produktu / zerbitzu bat eskaini bezeroari'], p:81, r:[
      ['¿Para cuándo querría usted el producto que acaba de pedir?', 'Noizko beharko zenuke eskatu duzun produktua?'],
      ['No, lo siento, pero nos es imposible terminar el trabajo para esa fecha, andamos a tope.', 'Sentitzen dut, ezinezkoa izango zaigu epe horretan lana bukatzea; produkzioa gainezka daukagu.'],
      ['Por supuesto, fabricamos elementos de automoción, tanto para la industria del automóvil como para electrodomésticos.', 'Bai, noski, automozio-osagaiak egiten ditugu, bai automobilgintzarako, bai etxetresna elektrikoetarako.'],
      ['En nuestro negocio producimos sobre todo brochas y tornos. Nuestra representante comercial le hará una visita y le enseñará nuestro catálogo.', 'Gure negozioan, batez ere brotxak eta tornuak ekoizten ditugu. Gure ordezkari komertzialak bisita egin diezazuke, eta gure katalogoa erakutsi.'],
      ['No, normalmente no fabricamos camas de esa medida.', 'Ez, neurri horretako oherik ez dugu normalean egiten.'],
      ['Enviamos nuestros productos etiquetados y debidamente embalados.', 'Etiketatuta eta behar bezalako bilgarriarekin bidaltzen ditugu gure produktu guztiak.'],
      ['Son productos de absoluta garantía.', 'Berme osoko produktuak dira.'],
      ['Pueden utilizar el servicio postventa para lo que necesiten.', 'Salmenta osteko zerbitzua eskuragarri duzue zuen behar guztietarako.'],
      ['Si necesitan algo, nuestro horario de atención al público es el mismo de siempre.', 'Zerbait behar izanez gero, jendearentzako gure arreta-zerbitzuaren ordutegia betikoa da.'],
      ['Esta mañana le hemos enviado por medio de una empresa de transporte el pedido que nos encargó.', 'Zuk enkargatutako eskabidea bidali dizugu gaur goizean bertan, garraiolari baten bidez.'],
      ['Llegará ahí a la tarde: ¿habrá alguien para recogerlo?', 'Arratsaldean iritsiko zaizue: hor izango al zarete hori jasotzeko?']
    ]},
    { h:['b) Pedir un producto / un servicio a la empresa proveedora', 'b) Produktu / zerbitzu bat eskatu hornitzaileari'], p:82, r:[
      ['Efectivamente, necesitamos tuercas de ese diámetro precisamente.', 'Bai, horixe, diametro horretako azkoinak behar ditugu.'],
      ['Querríamos brocas para metal.', 'Metal-barautsak nahiko genituzke.'],
      ['¿Tienen ustedes existencias de papel en el almacén?', 'Ba al daukazue paperik biltegian?'],
      ['El asesoramiento en recursos humanos ¿entra dentro de su plan de negocio?', 'Giza baliabideei buruzko aholkularitza zuen negozio-planean sartzen al da?'],
      { f:['Hola. ¿Podría enviarnos {0} como siempre?', 'Egun on. Bidaliko al zeniguke {0} beti bezala?'], o:[[['hierro','burdina'], ['acero','altzairua'], ['cemento','zementua']]] },
      ['Estamos muy interesados en ese software de gestión, y desearíamos concertar una reunión para concretar detalles y recibir información.', 'Oso interesatuta gaude kudeaketa-software horrekin, eta bilera tekniko bat egin nahiko genuke xehetasunak eta argibideak jasotzeko.'],
      ['Les pasaremos la oferta por fax. ¿Me podría dar su número de fax por favor? Si no, se lo enviaremos también por correo ordinario.', 'Eskaera faxez pasatuko dizuegu. Emango al didazu zenbakia? Bestela ere, posta arruntez bidaliko dugu.'],
      ['¿Podríamos firmar el contrato la semana que viene?', 'Kontratua datorren astean sinatuko al genuke?'],
      ['¿En qué plazo de tiempo podrían servirnos la partida de pilas?', 'Zer epetan bidaliko zenigukete pila-sorta?'],
      ['¿En qué fase de fabricación está el material que les solicitamos?', 'Eskatutako materiala, zein fabrikazio-fasetan dago une honetan?'],
      ['Todavía no hemos recibido las mercancías que les pedimos hace quince días, y el plazo de entrega que nos prometieron ya ha terminado.', 'Orain hamabost egun eskatutako salgaiak ez ditugu oraindik jaso, eta zuek agindutako entrega-epea aspaldi bukatu zen.']
    ]},
    { h:['c) Pasar la llamada de teléfono', 'c) Telefonoko deia norbaiti pasatu'], p:83, r:[
      ['Sí, ahora mismo le pongo con él / ella.', 'Bai, oraintxe jarriko zaitut berarekin.'],
      ['Lo siento, está en una reunión en este momento. ¿Quiere dejarle algún encargo?', 'Ez, orain ezinezkoa da. Bilera batean dago. Enkargurik utzi nahi diozu?'],
      ['¿Con quién desea hablar? La Jefa de Ventas está ocupada.', 'Norekin hitz egin nahi duzu? Salmentaburua lanpetua dago une honetan.']
    ]},
    { h:['d) Comunicar el cambio de dirección', 'd) Helbide-aldaketa jakinarazi'], p:83, r:[
      ['Nuestra empresa ha cambiado de dirección y le llamo para comunicarle la nueva dirección. Tome nota. También se lo notificaremos por escrito, por supuesto.', 'Gure enpresak helbidea aldatu du, eta horren berri emateko deitzen dizut: har ezazu, arren, helbide berria. Idatziz ere jakinaraziko dizugu, bai, jakina.'],
      ['Esperamos que sabrán disculpar las molestias que el traslado pueda causarles.', 'Barkamena eskatzen dizuegu, lekualdaketak eragozpenik sortzen badizue.']
    ]},
    { h:['e) Reclamar al cliente o clienta el pago de una factura', 'e) Fakturen ordainketak bezeroari erreklamatu'], p:83, r:[
      ['Buenos días, quisiéramos saber cuál es la causa de que hayan devuelto el efecto de pago que les habíamos cargado.', 'Egun on, bankuak abisatu digu atzera itzuli duzuela ordaintzeko zenuten gure efektua. Jakin nahi genuke zergatik gertatu den hori.'],
      ['Hola, hemos recibido la letra devuelta. ¿No están conformes con el importe de la misma?', 'Kaixo. Itzuli egin digute letra. Ez al zaudete konforme gure izenean bankuak aurkeztutako zenbatekoarekin?'],
      ['¿Que la orden de devolución ha sido un error? Entonces, ¿podrían avisar al banco por favor?', 'Itzultze-agindua akatsa izan dela? Abisatuko diozue orduan banketxeari?'],
      ['¿Qué previsiones tienen ustedes para pagar nuestra factura del día 23 de julio?', 'Noizko pentsatzen duzue ordainduta egongo dela uztailaren 23ko gure faktura?'],
      ['¿Cuándo van a pagar ustedes nuestra factura del día 13 de febrero?', 'Noiz ordainduko duzue otsailaren 13ko gure faktura?'],
      ['Quisiéramos tenerla pagada para la próxima semana, pues queremos cerrar el ejercicio anual.', 'Datorren asterako ordainduta egotea nahiko genuke, urteko ekitaldia itxi egin nahi dugu-eta.']
    ]}
  ]},

  { id:'i02', n:'02', eu:'Harreran', es:'En la recepción', p:84, z:[
    { h:['a) Recibir a un cliente o clienta / a la empresa proveedora', 'a) Bezeroari / hornitzaileari harrera egin'], p:84, r:[
      ['Buenos días, ¿me permite su DNI por favor? Lo necesitamos para anotarlo en el registro de entradas y salidas.', 'Egun on, NANa utziko didazu, mesedez? Sarrera-irteeren erregistroan idazteko behar dugu.'],
      ['Aquí tiene la tarjeta de visitante.', 'Hauxe duzu bisitari-txartela.'],
      ['Sí, al salir deposítela aquí mismo, por favor.', 'Bai, irtetean hementxe laga, mesedez.'],
      ['Enseguida le aviso al director que están ustedes aquí. Mientras tanto, pasen a la sala de espera por favor.', 'Oraintxe abisatuko diot zuzendariari hemen zaudetela. Pasa itxarongelara bitartean, arren.'],
      ['Les acompaño a la sala de reuniones. Vengan conmigo, hasta el final del pasillo, allí está la sala.', 'Lagunduko dizuet bilera-gelara. Etorri nirekin, korridorearen bukaeraraino, bertan da-eta.'],
      ['En este tríptico se recoge la normativa de seguridad del taller.', 'Lantegiko segurtasun-arauen bildumatxoa duzu triptiko hau.'],
      ['Es conveniente que lo lea atentamente.', 'Komeni da arretaz irakurtzea.']
    ]},
    { h:['b) Recibir a las personas candidatas de una oferta de trabajo', 'b) Lan-eskaintza bateko hautagaien harrera'], p:85, r:[
      ['Muy bien, ya les pasaré su currículum a los de RRHH.', 'Ondo da, pasatuko dut zure curriculuma giza baliabideen sailera.'],
      ['Sí, le avisaremos dentro de unos días.', 'Bai, abisatuko dizugu egun batzuk barru.'],
      ['Como les avisábamos en la carta, las entrevistas comenzarán a las 10 en punto, y les llamaremos por el orden alfabético de sus apellidos.', 'Gutunean adierazi bezala, elkarrizketak 10:00etan puntuan hasiko dira, eta abizenen ordena alfabetikoaren arabera deituko dizuegu.']
    ]},
    { h:['c) Recoger los catálogos de las empresas proveedoras', 'c) Hornitzaileengandik katalogoak jaso'], p:85, r:[
      ['Muchas gracias, ya le pasaré su catálogo al jefe de compras.', 'Bai, eskerrik asko, pasatuko diot zuen katalogoa erosketa-buruari.'],
      ['No, que yo sepa no necesitamos nada parecido por ahora, pero déjenos su catálogo y lo tendremos en cuenta la próxima vez.', 'Ez, nik dakidala ez dugu horrelakorik behar oraingoz, baina utz iezaguzu katalogoa eta ikusiko dugu hurrengo txandarako.']
    ]}
  ]},

  { id:'i03', n:'03', eu:'Produkzioan eta zehar-lerroko kudeaketa-planetan', es:'En producción y en planes de gestión transversales', p:86, z:[
    { h:['a) El personal técnico viene a reparar una avería', 'a) Teknikariak matxura konpontzera datoz'], p:86, r:[
      ['Hola, la fresadora que hay que arreglar es esa de ahí.', 'Egun on, hortxe daukazue konpondu beharreko fresatzeko makina.'],
      ['¿Para cuándo calcula que arreglará la avería de la cadena de montaje?', 'Noizko kalkulatzen duzu konponduko duzula muntaketa-katean izandako matxura?'],
      { f:['Intenta arreglar la {0} cuanto antes, porque es imprescindible para que sigamos trabajando.', 'Saia zaitez, arren, {0} lehenbailehen konpontzen, ezinbestekoa baita gure eguneroko lanean.'], o:[[['bomba de refrigeración','hozte-ponpa'], ['lijadora','lixatzeko makina'], ['prensa mecánica','prentsa mekanikoa']]] },
      ['De acuerdo. Tenga el parte de mantenimiento, firmado.', 'Ados gaude. Hementxe daukazu mantentze-lanen partea, sinatuta.']
    ]},
    { h:['b) El material producido no cumple las normas de calidad', 'b) Ekoitzi den materialak ez ditu kalitate-arauak betetzen'], p:86, r:[
      ['Sí, lo siento, hemos advertido que se ha producido un fallo en nuestro control de calidad.', 'Bai, sentitzen dut, konturatu gara gure kalitate-kontrolean hutsen bat gertatu dela.'],
      ['Los técnicos de control de calidad han detectado algún problema, y procuraremos arreglarlo cuanto antes.', 'Kalitate-kontroleko teknikariek sumatu dute arazoren bat, eta lehenbailehen zuzentzen saiatuko gara.'],
      ['Devuélvannos las piezas defectuosas, y enseguida les enviaremos otras piezas nuevas.', 'Itzul iezazkiguzue pieza akastunak, eta pieza egokiak berehala bidaliko dizkizuegu.'],
      ['Uno de nuestros valores estratégicos es ofrecer a nuestra clientela un producto de la máxima calidad.', 'Bezeroei kalitate goreneko produktua eskaintzea da gure balio estrategikoetako bat.']
    ]},
    { h:['c) Se ponen en marcha las acciones correctoras', 'c) Ekintza zuzentzaileak jartzen dira martxan'], p:87, r:[
      ['Le llamo para decirle que gracias a su reclamación hemos puesto en marcha las acciones necesarias para corregir ese error.', 'Bai, jakinarazten dizut zure erreklamazioaren ondorioz jarri ditugula martxan akats hori zuzentzeko beharrezko neurriak.'],
      ['Ya le avisaré cuando estemos de nuevo funcionando con normalidad.', 'Esango dizut noiz egongo garen berriro ere betiko martxan.'],
      ['En nuestro negocio utilizamos el sistema de gestión de calidad total.', 'Erabateko kalitatearen bidezko kudeaketa-sistema baliatzen dugu negozioan.'],
      ['Por ello les enviaremos una encuesta de satisfacción, a fin de medir los resultados.', 'Hortaz, gogobetetasun-inkesta bidaliko dizuegu emaitzak neurtze aldera.']
    ]},
    { h:['d) Plan de prevención de accidentes', 'd) Istripuen prebentzio-plana'], p:87, r:[
      ['El encargado de prevención tomó parte en aquel curso organizado por OSALAN el año pasado, junto con el de vuestra empresa.', 'Prebentzioko arduradunak joan den urtean parte hartu zuen OSALANek antolatutako ekitaldi horretan, zuen enpresakoarekin batera.'],
      ['En nuestra empresa hace tiempo que pusimos en marcha el actual sistema de prevención de riesgos laborales, y hemos tenido muy buenos resultados.', 'Gure enpresan aspaldi jarri genuen oraingo lan-arriskuen prebentzio-plana martxan, eta oso emaitza onak izan ditugu.'],
      ['Este año ha disminuido notablemente la tasa de accidentes laborales.', 'Laneko istripu-tasa nabarmen jaitsi da aurten.']
    ]},
    { h:['e) Plan de medio ambiente', 'e) Ingurumen-plana'], p:88, r:[
      ['Siempre procuramos utilizar materiales que respeten el medio ambiente.', 'Beti saiatzen gara ingurumena gehien errespetatzen duten materialak erabiltzen.'],
      ['El informe sobre el plan de medio ambiente está disponible, para que quien esté interesado pueda consultarlo.', 'Ingurumen-planaren inguruko txostena eskuragarri dugu, nahi duen orok kontsulta egiteko.'],
      ['La semana que viene impartiremos un cursillo de formación sobre el plan de medio ambiente. Si en vuestra empresa hay alguien interesado, puede apuntarse.', 'Datorren astean, ingurumen-planaren gaineko prestakuntza-ikastaro bat emango dugu. Nahi izanez gero, zuen enpresako langileren batek ere izena eman lezake.']
    ]},
    { h:['f) Materias primas', 'f) Lehengaiak'], w:1, p:88, r:[
      ['Acero', 'Altzairua'], ['Carbón', 'Ikatza'], ['Cartón', 'Kartoia'], ['Caucho', 'Kautxua'], ['Cemento', 'Zementua'],
      ['Chatarra', 'Txatarra'], ['Corcho', 'Kortxoa'], ['Hierro', 'Burdina'], ['Hormigón', 'Hormigoia'], ['Madera', 'Egurra'],
      ['Papel', 'Papera'], ['Piedra caliza', 'Kareharria'], ['Plástico', 'Plastikoa'], ['Vidrio', 'Beira'], ['Yeso', 'Igeltsua']
    ]},
    { h:['g) Máquinas', 'g) Makinak'], w:1, p:89, r:[
      ['Bomba de refrigeración', 'Hozte-ponpa'], ['Broca', 'Barautsa'], ['Caldera', 'Galdara'], ['Cepilladora', 'Arrabotatzeko makina'],
      ['Cizalla guillotina', 'Gillotina-zizaila'], ['Curvadora', 'Kurbatzeko makina'], ['Esmeriladora', 'Esmerilagailua'], ['Forja', 'Forja'],
      ['Fresadora', 'Fresatzeko makina'], ['Granalladora', 'Granailatzeko makina'], ['Laminadora', 'Ijezteko makina'], ['Lijadora', 'Lixatzeko makina'],
      ['Limadora', 'Karrakatzeko makina'], ['Mandrinadora', 'Mandrinatzeko makina'], ['Plegadora', 'Tolesteko makina'], ['Prensa hidráulica', 'Prentsa hidraulikoa'],
      ['Prensa mecánica', 'Prentsa mekanikoa'], ['Pulidora', 'Leuntzeko makina'], ['Rectificadora', 'Artezteko makina'], ['Remachadora', 'Errematxatzeko makina'],
      ['Roscadora', 'Hariztatzeko makina'], ['Taladradora', 'Zulatzeko makina'], ['Torno', 'Tornua'], ['Troqueladora', 'Trokelatzeko makina']
    ]},
    { h:['h) Tipos de industria', 'h) Industria motak'], w:1, p:90, r:[
      ['Equipos fotográficos y cinematográficos', 'Argazkigintza eta zinemagintzako ekipamendua'],
      ['Automoción', 'Automozioa'],
      ['Venta de automóviles (características, accesorios, modelo, color, financiación...)', 'Autoen salmenta (ezaugarriak, osagarriak, modeloa, kolorea, finantzaketa...)'],
      ['Reparación de automóviles (talleres de inspección técnica, ITV)', 'Konponketa-tailerrak (IAT azterketaren ingurukoak)'],
      ['Industria del vidrio', 'Beira-industria'],
      ['Otras industrias manufactureras (joyas, instrumentos de música, juegos, juguetes, artículos de deporte,...)', 'Bestelako manufakturak (bitxiak, musika-tresnak, joko eta jostailuak, kirol-materiala,...)'],
      ['Bicicletas, motocicletas', 'Bizikletak, motozikletak'],
      ['Máquinas de oficina y ordenadores', 'Bulego-makinak eta ordenagailuak'],
      ['Siderurgia y fabricación de acero', 'Siderurgia eta altzairugintza'],
      ['Instrumentos de precisión (óptica, material médico-quirúrgico, ortopedia)', 'Doitasunezko tresnak (optika, material mediko-kirurgikoa, ortopedia)'],
      ['Industrias de la madera, corcho, muebles de madera', 'Egurra, kortxoa, zurezko altzariak'],
      ['Industria textil, del cuero, calzado y vestido', 'Ehun-, larru-, oinetako- eta jantzi-industria'],
      ['Industria textil (algodón, lana, fibras). Industria del cuero', 'Ehun-industria (kotoia, artilea, zuntzak). Larru-industria'],
      ['Aparatos y equipo electromédico, y de uso profesional y científico', 'Elektromedikuntzako eta erabilera profesional nahiz zientifikoko aparatuak eta ekipamenduak'],
      ['Fabricación de relojes', 'Erlojuen fabrikazioa'],
      ['Aparatos electrodomésticos', 'Etxetresna elektrikoak'],
      ['Fundiciones', 'Galdaketa (galdategiak)'],
      ['Fabricación y distribución de gas. Captación, depuración y distribución de agua', 'Gasa (fabrikazioa eta banaketa). Ura (bilketa, arazketa eta banaketa)'],
      ['Hilos y cables eléctricos. Pilas y acumuladores', 'Hari eta kable elektrikoak. Pilak eta metagailuak'],
      ['Industria química', 'Industria kimikoa'],
      ['Instalaciones eléctricas. Material electrónico', 'Instalazio elektrikoak. Material elektronikoa'],
      ['Construcción naval, reparación y mantenimiento', 'Itsasontzien eraikuntza, konponketa eta mantentzea'],
      ['Industrias alimenticias, químicas, del plástico y del caucho', 'Janari-, kimika-, plastiko- eta kautxu-industria'],
      ['Productos alimenticios, bebidas y tabaco', 'Janari-produktuak, edariak eta tabakoa'],
      ['Caucho y materias plásticas', 'Kautxua eta gai plastikoak'],
      ['Contadores y aparatos de medida, control y verificación eléctricos', 'Kontagailu, neurgailu, kontrolagailu eta egiaztagailu elektrikoak'],
      ['Lámparas y material de alumbrado', 'Lanparak eta argiztapen-materiala'],
      ['Metales, madera y corcho', 'Metalak, zura eta kortxoa'],
      ['Máquinas agrícolas y tractores agrícolas', 'Nekazaritzako makinak eta traktoreak'],
      ['Industria del calzado y vestido', 'Oinetakoak eta jantziak'],
      ['Componentes electrónicos. Circuitos integrados', 'Osagai elektronikoak. Zirkuitu integratuak'],
      ['Industria del papel. Artes gráficas y edición', 'Paper-industria. Arte grafikoak eta argitalpenak'],
      ['Sonido e imagen', 'Soinua eta irudia'],
      ['Aparatos y equipos de telecomunicación', 'Telekomunikazioko aparatuak eta ekipamenduak'],
      ['Construcción, reparación y mantenimiento de material ferroviario', 'Trenbide-materialaren eraikuntza, konponketa eta mantentzea'],
      ['Cemento. Hormigón. Yeso. Escayola. Otros materiales de construcción', 'Zementua. Hormigoia. Igeltsua. Eskaiola. Bestelako eraikuntza-materialak'],
      ['Productos cerámicos', 'Zeramika-produktuak']
    ]}
  ]},

  { id:'i04', n:'04', eu:'Komertzialenak', es:'De los y las comerciales', p:92, z:[
    { h:['a) Presentar un producto / un servicio', 'a) Produktu / zerbitzu bat aurkeztu'], p:92, r:[
      ['Este es nuestro catálogo de productos / herramientas.', 'Hemen daukazu gure produktuen / tresnen katalogoa.'],
      ['Si quiere más detalles, tome mi nº de teléfono y mi e-mail.', 'Argibide gehiago nahi izanez gero, hauek dira nire telefonoa eta helbide elektronikoa.'],
      ['Si quisieran ampliar cualquier detalle, volvería cualquier otro día con mucho gusto.', 'Bestelako xehetasunik nahiko bazenute, oso gustura etorriko nintzateke beste egun batean.'],
      ['Si quisiera conocer más a fondo nuestros productos, venga a nuestra fábrica y allí podrá verlos.', 'Gure produktuak zuzenean ikusi nahi badituzu, zatoz gure fabrikara, eta han izango duzu horretarako aukera.'],
      ['Presentaremos nuevos modelos de muebles en la feria de primavera.', 'Udaberriko ferian altzari-modelo berriak aurkeztuko ditugu.']
    ]},
    { h:['b) El cliente o clienta quiere una rebaja en el precio', 'b) Bezeroak prezio-jaitsiera nahi du'], p:92, r:[
      ['Bien, de acuerdo, la próxima remesa se la cobraremos en el nuevo precio que hemos decidido.', 'Bai, konforme, hurrengo bidalketan adostutako prezio horretan kobratuko dizugu materiala.'],
      ['Ya miraré si su petición de precios puede adecuarse a nuestra política de precios. Veremos qué se puede hacer.', 'Aztertuko dut ea zuen prezio-eskaera egokitu daitekeen gure salmenta-prezioen politikarekin. Ea zer egin daitekeen.'],
      ['No, lo siento, pero en ese precio que usted me pide, no podemos llegar a un acuerdo.', 'Ez, sentitzen dut, baina ezin dugu zuk aipatzen diguzun prezio hori onartu, inola ere.'],
      ['Se trata de un precio muy competitivo. Además de ser un precio al por mayor, creemos que la relación calidad / precio es buena.', 'Prezio lehiakorra da hori. Handizkako prezioa izateaz gain, kalitate-prezio erlazioa ona delakoan gaude.']
    ]},
    { h:['c) Convenir la modalidad de pago con el cliente o clienta', 'c) Ordaintzeko modua adostu bezeroarekin'], p:93, r:[
      ['No hay ningún problema: si usted prefiere pagar a plazos, le giraremos unas letras.', 'Ez dago inolako arazorik: nahiago baduzu epeka ordaintzea, letra batzuk igorriko dizkizugu.'],
      ['Ya sabe usted que el pago en efectivo no tiene ningún gasto añadido. Las letras, en cambio, tienen el gasto de comisión bancaria.', 'Jakingo duzun bezala, eskudirutan ordaintzeak ez dakar bestelako gastu erantsirik; letrek, ordea, banku-komisioaren gastuak dituzte.'],
      ['Bien, haremos la transacción por cheque bancario nominativo.', 'Banku-txeke izendun bidez egingo dugu transakzioa, beraz.'],
      ['De acuerdo, no habrá ningún problema para convenir la modalidad de pago. Ofrecer facilidades a la clientela entra por supuesto dentro de nuestra política de empresa.', 'Ondo da. Ez da arazorik sortuko ordaintzeko modua adosteko. Bezeroari ordaintzeko erraztasunak ematea gure enpresa-politikaren barruan sartzen da, noski.']
    ]}
  ]},

  { id:'i05', n:'05', eu:'Erosketak', es:'Compras', p:94, z:[
    { h:['a) Pedir presupuestos a las empresas proveedoras', 'a) Aurrekontuak eskatu hornitzaileei'], p:94, r:[
      ['Por ampliación del Departamento, les pedimos presupuesto para el siguiente mobiliario: 4 mesas, 12 sillas (en cada mesa, 1 silla para el trabajador o trabajadora y 2 para las visitas); 2 armarios, 4 papeleras y 4 percheros.', 'Saila handitzeko asmoa dugunez, aurrekontua eskatzen dizuegu altzari hauek erosteko: 4 mahai; 12 aulki (horietatik mahai bakoitzean, 1 langilearentzat eta beste 2 bisitarientzat); 2 armairu; 4 paperontzi eta 4 kakotegi, arropa esekitzeko.'],
      ['Hemos recibido su presupuesto, pero agradeceríamos nos detallaran más en el material de oficina.', 'Jaso dugu zuen aurrekontua, baina eskertuko genuke xehetasun gehiago ematea bulegoko materialaren atalean.'],
      ['El presupuesto nos ha parecido algo elevado, y quisiéramos que nos hicieran otro. En este segundo quiten los dos ordenadores del último apartado y el periférico multifunción.', 'Aurrekontua garesti samarra iruditu zaigunez, bigarren bat egitea nahiko genuke. Kendu, horretarako, azken ataleko bi ordenagailuak eta funtzio anitzeko periferikoa.'],
      ['El presupuesto es con ¿IVA incluido o no? Porque no se detalla.', 'BEZa barne dela kalkulatu da aurrekontua ala BEZik gabe? Zehaztu gabe dago eta.']
    ]},
    { h:['b) Plazos y modalidades de pago', 'b) Ordaintzeko epeak eta moduak'], p:94, r:[
      ['¿Que de ahora en adelante, habéis decidido cambiar las facturas, y en vez de 30 días fecha factura hacerlas a 60 días? Conforme.', 'Orain artean 30 egunera egiten zenituzten fakturak, ezta? Aurrerantzean 60 egunera egitea erabaki duzuela? Konforme.'],
      ['Si no le importa, preferimos una transferencia bancaria a vuestra cuenta en vez de un giro.', 'Axola ez badizu, nahiago dugu banku-transferentzia bat zuen kontura, banku-igorpen bat egitea baino.'],
      ['¿Hacen ustedes descuento por pronto pago?', 'Egiten al duzue deskonturik goiz ordaintzeagatik?']
    ]}
  ]},

  { id:'i06', n:'06', eu:'Garraioa', es:'El transporte', p:95, z:[
    { h:['a) El transporte ¿a cargo de quién?', 'a) Garraioa nork ordaintzen du?'], p:95, r:[
      ['Sí, este servicio va a portes debidos, según indica la nota.', 'Bai, zerbitzu hau zuek ordaintzekoa da: horixe dio hemen, txartelean.'],
      ['No, en la factura pone que los portes están ya pagados.', 'Ez, garraio-kostua ordainduta dagoela dio fakturak.']
    ]},
    { h:['b) Descargar el camión', 'b) Kamioia deskargatu'], p:95, r:[
      ['Hola, ¿en qué pabellón tengo que descargar el camión?', 'Kaixo, kamioia zein pabiloitan deskargatu behar dut?'],
      ['El descargar es por vuestra cuenta, ¿o lo tengo que hacer yo?', 'Deskargatzea zuen kontura al da, ala nik egin behar dut?']
    ]},
    { h:['c) El albarán no coincide con el material que ha llegado', 'c) Albarana eta heldu den materiala ez datoz bat'], p:95, r:[
      ['¿Habéis comprobado la mercancía recibida? Por lo tanto, una de las tres cajas que nos han traído, ya venía abierta. Está bien, ya lo he anotado.', 'Jasotako salgaiak begiratu al dituzue? Beraz, ekarri dizkiguten hiru kaxetatik bat irekita zetorren. Ondo da, apuntatu dut.'],
      ['¿Cuántas piezas defectuosas habéis detectado en la partida que recibisteis ayer a la mañana?', 'Zenbat pieza akastun ikusi dituzue atzo goizean heldutako material-sortan?'],
      ['¿Me dices que a causa del deficiente embalaje, algunas piezas presentan graves deterioros?', 'Enbalatzeko materiala eskasa zenez, pieza batzuk nahiko hondatuak jaso dituzuela diozu?'],
      ['Notificaré a la empresa que lo especificado en el albarán no coincide exactamente con las mercancías enviadas.', 'Enpresari jakinaraziko diot albaranean zehaztutakoak ez direla guztiz egokitzen bidalitako salgaiekin.']
    ]}
  ]}
]});
