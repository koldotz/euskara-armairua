/* ══ Euskara Armairua · A2 · Materialak › Ostalaritza (fuente de datos) ══
   Transcripción de «Ostalaritza. Ostalaritzan euskara erabiltzeko gida»
   (HABE · Elhuyar Aholkularitza, 2005): 1. liburukia «Tabernan» (1–10),
   2. liburukia «Jatetxean» (11–19) y 20. Glosategia; más el cartel
   «Eska itzazu frutak eta barazkiak euskaraz» (udalak / Euskarako
   Batzordea). Los PDF originales están en materialak/ostalaritza/.

   Expone el global var A2_OSTALARITZA (sin IIFE, cargado con <script src>
   clásico antes de su consumidor en a2.html; ver convención de datos).

   Esquema de unidad:
     n, eu, es      número y título                tomo, orr   libro y página inicial
     pdf, off       fichero y páginas previas a la unidad dentro del PDF
     helb [eu,es]   objetivo                        eg [eu,es]  situación del diálogo
     cd             pista del CD                    dial [[hablante, eu, es]]
     ar / er        ariketak / errepasoa: {k, eu, es, m ('irudia'|'cd'), o (página),
                    it [ítems], op [opciones a unir], sol [..] | 'texto', nota}
     az             azalpenak: [letra, título, html]
     hz             hiztegia: [categoría eu, categoría es, [[eu, es]…]]
     bad            badakizu: {t:[eu,es], eu, es}
   Lo que NO viene del libro (erratas corregidas, glosas añadidas) va
   marcado con «⚠» en `nota`, igual que el resto del armario.            */
var A2_OSTALARITZA = {
  src: 'HABE · Elhuyar Aholkularitza — «Ostalaritza. Ostalaritzan euskara erabiltzeko gida» (2005). 1. liburukia: Tabernan · 2. liburukia: Jatetxean.',
  dir: 'materialak/ostalaritza/',
  units: []
};

/* ─────────────────────────── 1. liburukia · Tabernan ─────────────────────────── */

A2_OSTALARITZA.units.push({
  n:1, eu:'Edariak', es:'Bebidas', tomo:1, orr:21, pdf:'01-edariak.pdf', off:11,
  helb:['Edaria eta pintxoak euskaraz zerbitzatzen ikastea.','Aprender a servir bebidas y pinchos en euskera.'],
  eg:['Eguerdia da. Garazi eta bere kuadrila tabernan sartu dira.','Es mediodía. Garazi y su cuadrilla han entrado al bar.'],
  cd:1,
  dial:[
    ['Tabernaria','Egun on!','¡Buenos días!'],
    ['Garazi','Baita zuri ere!','¡Buenas!'],
    ['Tabernaria','Zer hartuko duzue?','¿Qué van a tomar?'],
    ['Garazi','Edateko, bi zurito, txakolina eta beltza. Eta jateko, berriz, lau kroketa, patata-tortilla pintxo bat, eta txorizo egosia.','Para beber, dos zuritos, un chacolí y un tinto. Y para comer, cuatro croquetas, un pincho de tortilla y chorizo cocido.'],
    ['Tabernaria','Polikiago mesedez, euskara gutxi dakit-eta.','Más despacio, por favor. Es que no sé mucho euskera.'],
    ['Garazi','Bai, lasai. Berriro esango dizut.','Sí, tranquila. Ahora te lo repito.']
  ],
  ar:[
    {k:'1', eu:'Begiratu marrazkiko erlojuari eta jarri azpian dagokion agurra.', es:'Observa el reloj de los dibujos y escribe debajo el saludo correspondiente.', m:'irudia', o:24,
      it:['23:00','12:30','16:30','08:00'], op:['Egun on!','Arratsalde on!','Gabon!'],
      sol:['Gabon!','Egun on!','Arratsalde on!','Egun on!']},
    {k:'2', eu:'Idatz ezazu zenbakia letraz, argazkiei begiratuta.', es:'Observa cada foto y escribe con letras el número que corresponde a cada objeto.', m:'irudia', o:24,
      nota:'1 bat · 2 bi · 3 hiru · 4 lau · 5 bost · 6 sei · 7 zazpi · 8 zortzi · 9 bederatzi · 10 hamar.',
      it:['… ardo','… aulki','… edalontzi','… kroketa','… azeituna-plater','… kafesne','Hautsontzi …','… salda','… edari','… beltz'],
      sol:['Lau ardo','Hiru aulki','Sei edalontzi','Bederatzi kroketa','Bi azeituna-plater','Bost kafesne','Hautsontzi bat','Zazpi salda','Hamar edari','Zortzi beltz']},
    {k:'3', eu:'CDa entzun eta x batekin marka ezazu entzundakoa.', es:'Marca con una x las bebidas y comidas que escuches en el CD.', m:'cd', cdp:2, o:25,
      it:['Bi huts eta ebakia','Hiru pintxo txistorra eta botila bat sagardo','Hiru ardo','Lau garagardo','Botila bat ur','Bi gorri eta beltz bat','Bi pintxo eta bi zurito','Azeitunak, kasa limoizkoa eta Coca-Cola','Kroketa bat eta hiru txakolin','Hiru ebaki','Patxaran bat','Bi deskafeinatu eta bi kruasan','Ganbak eta, edateko, bi zurito eta ardo bat','Lau pintxo haragi egosi eta botila bat txakolin','Hiru kafe huts','Baso bat ur, mesedez.'],
      sol:'Se oyen: Bi huts eta ebakia · Botila bat ur · Kroketa bat eta hiru txakolin · Ganbak eta, edateko, bi zurito eta ardo bat · Bi gorri eta beltz bat · Azeitunak, kasa limoizkoa eta Coca-Cola · Bi deskafeinatu eta bi kruasan · Lau pintxo haragi egosi eta botila bat txakolin · Baso bat ur, mesedez.'}
  ],
  az:[
    ['A','Agurrak · Saludos','<ul><li>Por la mañana: <b>Egun on!</b></li><li>Por la tarde: <b>Arratsalde on!</b></li><li>Por la noche: <b>Gabon!</b></li></ul><p>Respuestas, válidas para todas las situaciones: <b>Berdin!</b> · <b>Baita zuri ere!</b> (igualmente).</p><p>Saludos para cualquier momento, como «¡Hola!»: <b>Eup!</b> · <b>Kaixo!</b> · <b>(I)epa!</b> — para responder se repite el mismo saludo: <i>Eup! — Eup!</i> · <i>Kaixo! — Kaixo!</i></p>'],
    ['B','Zenbakien ordena · Posición de los números','<p>Con cantidades el orden normal es <b>número + objeto</b>: <i>bi ardo, lau pintxo, hamar kafe</i>.</p><p>Con <b>bat</b> (uno) es al revés, <b>objeto + número</b>: <i>ardo bat, pintxo bat</i>.</p>'],
    ['C','Esaldi-ereduak · Frases para cuando sabes poco euskera','<ul><li><b>Polikiago, mesedez, euskara gutxi dakit-eta.</b> — Más despacio, que casi no sé euskera.</li><li><b>Errepikatuko al didazu?</b> — ¿Puedes repetírmelo?</li><li><b>Esango al didazu berriz?</b> — ¿Me lo dices otra vez?</li><li><b>Barkatu, baina ikasten ari naiz.</b> — Perdona, pero estoy aprendiendo.</li><li><b>Barkatu, baina oso gutxi ulertzen dut.</b> — Perdona, pero entiendo muy poco.</li></ul>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Edan','Beber'],['Egosi','Cocer'],['Entzun','Escuchar; oír'],['Esan','Decir; hablar'],['Hartu','Coger; tomar'],['Ikasi','Aprender'],['Jakin','Saber'],['Jan','Comer'],['Zerbitzatu','Servir']]],
    ['Agurrak','Saludos',[['Agur','Adiós'],['Arratsalde on','Buenas tardes'],['Egun on','Buenos días'],['Eup','Hola'],['Gabon','Buenas noches'],['Iepa','Hola'],['Kaixo','Hola']]],
    ['Eguneko uneak','Momentos del día',[['Arratsalde','Tarde'],['Eguerdi','Mediodía'],['Gau','Noche'],['Goiz','Mañana']]],
    ['Erantzunak','Respuestas',[['Baita zuri ere','Igualmente'],['Berdin','Igualmente']]],
    ['Janariak eta edariak','Comidas y bebidas',[['(Ardo) beltz','Tinto'],['(Ardo) gorri','Claro'],['(Ardo) txuri','Blanco'],['Ardo','Vino'],['Kruasan','Cruasán'],['Deskafeinatu','Descafeinado'],['Ebaki','Cortado'],['Ganba','Gamba'],['Garagardo','Cerveza'],['Haragi','Carne'],['Huts','Solo'],['Kafe','Café'],['Kafesne','Café con leche'],['Kroketa','Croqueta'],['Patata-tortilla','Tortilla de patatas'],['Patxaran','Pacharán'],['Pintxo','Pincho'],['Salda','Caldo'],['Txakolina','Chacolí'],['Txistorra','Chistorra'],['Txorixo','Chorizo'],['Ur','Agua'],['Urdaiazpiko','Jamón serrano']]],
    ['Zenbakiak','Números',[['Bat','Uno'],['Bi','Dos'],['Hiru','Tres'],['Lau','Cuatro'],['Bost','Cinco'],['Sei','Seis'],['Zazpi','Siete'],['Zortzi','Ocho'],['Bederatzi','Nueve'],['Hamar','Diez']]],
    ['Besterik','Otros',[['Aizu','Oye'],['Asko','Mucho'],['Aulki','Silla'],['Berriro','De nuevo'],['Botila','Botella'],['Edalontzi','Vaso; copa'],['Eskerrik asko','Gracias'],['Euskara','Euskera'],['Gaztelania; Erdara','Castellano'],['Gutxi','Poco'],['Hautsontzi','Cenicero'],['Lagun','Amigo/a'],['Lasai','Tranquilo'],['Mahai','Mesa'],['Mesedez','Por favor'],['Poliki','Despacio']]]
  ],
  er:[
    {k:'A', eu:'Antton tabernan sartu da. Irudia ikusita, bete hutsuneak.', es:'Antton ha entrado al bar. Mira la imagen y completa la conversación (en el dibujo pide «Bi kroketa eta hiru zurito»).', m:'irudia', o:30,
      it:['Tabernaria: Egun on! — Antton: …','Tabernaria: Zer nahi duzue? — Antton: …','Tabernaria: … — Antton: Bai, bai, lasai. Berriro esango dizut.'],
      sol:['Baita zuri ere! / Berdin!','Bi kroketa eta hiru zurito.','Polikiago, mesedez, euskara gutxi dakit-eta. (Valen también: Errepikatuko al didazu? · Esango al didazu berriz? · Barkatu, baina ikasten ari naiz. · Barkatu, baina oso gutxi ulertzen dut.)']},
    {k:'B', eu:'Lotu esanahi bera duten euskarazko eta gaztelaniazko hitzak.', es:'Une las palabras que tengan el mismo significado en euskera y en castellano.', o:30,
      it:['Eup','Hiru','Ura','Beltz berezia','Garagardoa','Eguerdia','Edan','Mesedez','Lasai','Salda','Arratsalde on','Jan'],
      op:['Comer','Tinto especial','Mediodía','Por favor','Hola','Tranquilo','Caldo','Tres','Beber','Buenas tardes','Cerveza','Agua'],
      sol:['Hola','Tres','Agua','Tinto especial','Cerveza','Mediodía','Beber','Por favor','Tranquilo','Caldo','Buenas tardes','Comer']}
  ],
  bad:{t:['Koadrila eta poteoa','Cuadrilla y poteo'],
    eu:'Euskal Herrian ohikoa da bazkal aurretik poteoa egitea eta pintxoak jatea. Euskal Herriko pintxoak nazioartean ospetsuak dira, eta herri honetako goi mailako sukaldaritzaren isla dira.\n\nKoadrila: lagun-taldeari esaten diogu. Askotan, gaztetan sortutako lagun-taldea da eta betiko edo urte luzez eusten zaio talde horri (nahiz eta urteak pasa ahala ez diren hain maiz elkartzen). Baina badira plan jakinetarako elkartzen diren lagun-taldeak ere: mendira joateko koadrila… Edo bizitza aldatu ahala sortzen diren koadrila berriak. Koadrilaren kontzeptua oso sustraituta dago Euskal Herrian.',
    es:'En Euskal Herria es típico potear y comer pinchos antes de ir a comer. Los pinchos de Euskal Herria son internacionalmente conocidos y son el reflejo de la alta cocina de este pueblo.\n\nLa cuadrilla: se llama cuadrilla al grupo de amigos. Normalmente estas cuadrillas se forman en la adolescencia y se mantienen toda la vida o durante muchos años (aunque con el paso de los años no se reúnan tan a menudo). También se llama cuadrilla al grupo de amigos que se junta para determinados planes: ir al monte… A medida que nos cambia la vida vamos formando nuevas cuadrillas (normalmente sin renunciar a la de la adolescencia). El concepto de cuadrilla está muy arraigado en Euskal Herria.'}
});

A2_OSTALARITZA.units.push({
  n:2, eu:'Kobratzen', es:'Cobrando', tomo:1, orr:33, pdf:'02-kobratzen.pdf', off:0,
  helb:['Kontua eskatzen diotenean ulertzea eta kobratzea.','Entender cuando se le pide la cuenta y realizar el cobro.'],
  cd:3,
  dial:[
    ['Eider','Aizu, barkatu, kobratuko al didazu, mesedez?','Oye, perdona, ¿me cobras, por favor?'],
    ['Zerbitzaria','Bai, banoa, segituan ekarriko dizut kontua.','Sí, ya voy, enseguida te traigo la cuenta.'],
    ['Eider','Zenbat da?','¿Cuánto es?'],
    ['Zerbitzaria','Ea, bada, bi garagardo eta bi bokadilo… zortzi euro eta hirurogeita hamar zentimo.','A ver, dos cervezas y dos bocadillos… ocho euros y setenta céntimos.'],
    ['Eider','Tori. Barkatu, baina ez daukat kanbiorik.','Toma. Perdona, pero no tengo cambios.'],
    ['Zerbitzaria','Lasai, berehala ekarriko dizkizut bueltak.','Tranquila, enseguida te traigo las vueltas.'],
    ['Zerbitzaria','Hartu, eta eskerrik asko.','Toma, gracias.'],
    ['Eider','Zuri. Agur!','A ti. ¡Adiós!']
  ],
  ar:[
    {k:'1', eu:'Entzun berriro elkarrizketa eta ordenatu esaldiak batetik bostera.', es:'Escucha de nuevo el diálogo y ordena las frases del 1 al 5.', m:'cd', cdp:3, o:36,
      it:['Bai, segituan egingo dizut kontua.','Hartu, eta eskerrik asko!','Aizu, barkatu, kobratuko didazu, mesedez?','Ea, bada, bi garagardo eta bi bokadilo… 8,70 €.','Zuri. Agur!'],
      sol:['2','4','1','3','5']},
    {k:'2', eu:'Lotu itzazu irudiak eta balioak.', es:'Une las imágenes (billetes y monedas) con su valor.', m:'irudia', o:36,
      nota:'1 bat · 2 bi · 3 hiru · 5 bost · 10 hamar · 20 hogei · 50 berrogeita hamar · 100 ehun · 200 berrehun · 500 bostehun.',
      it:['Zentimo bat','Bi zentimo','Bost zentimo','Hamar zentimo','Hogei zentimo','Berrogeita hamar zentimo','Euro bat','Bi euro','Bost euro','Hamar euro','Hogei euro','Berrogeita hamar euro','Ehun euro','Berrehun euro','Bostehun euro'],
      sol:['irudia e','irudia m','irudia d','irudia l','irudia h','irudia ñ','irudia c','irudia n','irudia i','irudia f','irudia g','irudia a','irudia j','irudia b','irudia k']},
    {k:'3', eu:'Atera kontuak eta idatzi emaitza letraz (aurrena, begiratu zenbakien azalpenari).', es:'Saca la cuenta y escribe con letras los resultados (mira antes la explicación de los números).', o:37,
      it:['bi bokadilo 7 € · freskagarri bat 1,55 € · garagardo bat 1,35 € — Zenbat da?','lau beltz berezi 2,40 € · bi txuri 0,80 € · hiru ganba 3,60 € — Zenbat da?','bi txorizo egosi 2,40 € · bi salda 2,30 € · hiru txakoli 2 € · bitter bat 1,70 € — Zenbat da?'],
      sol:['Bederatzi euro eta laurogeita hamar zentimo. (9,90 €)','Sei euro eta laurogei zentimo. (6,80 €)','Zortzi euro eta berrogei zentimo. (8,40 €)']},
    {k:'4', eu:'Lotu galderak eta erantzunak.', es:'Une cada pregunta con su respuesta.', o:37,
      it:['Kobratuko didazu?','Zenbat da?','Eskerrik asko!','Zer hartu duzue?'],
      op:['Bi euro dira.','Zuri.','Bai, segituan kobratuko dizut.','Bi txuri berezi.'],
      sol:['Bai, segituan kobratuko dizut.','Bi euro dira.','Zuri.','Bi txuri berezi.']}
  ],
  az:[
    ['A','Zerbait eskatzeko · Para pedir algo','<p>El orden de la frase en euskera es inverso al del castellano.</p><ul><li><b>Kontua emango didazu / diguzu?</b> — ¿Me das / nos das la cuenta?</li><li><b>Kontua ekarriko didazu / diguzu?</b> — ¿Me traes / nos traes la cuenta?</li><li><b>Bai, segituan emango dizut / dizuet.</b> — Sí, enseguida te la doy / os la doy.</li><li><b>Bai, ekarriko dizut / dizuet.</b> — Te la traigo / os la traigo.</li></ul>'],
    ['B','Eskerrak emateko · Para dar las gracias','<p><b>Eskerrik asko!</b> · <b>Mila esker!</b></p><p>Para contestar: <b>Zuri</b> (a ti) · <b>Ez horregatik!</b> (no hay de qué).</p>'],
    ['C','Kopurua galdetzeko · Para preguntar la cantidad','<ul><li><b>Zenbat da?</b> — ¿Cuánto es? (la más común)</li><li><b>Zenbat zor dizut?</b> — ¿Cuánto te debo?</li><li><b>Zenbat eman behar dizut?</b> — ¿Cuánto te doy?</li></ul><p>Respuestas: <b>35 € dira</b> (son 35 €) · <b>35 € zor dizkidazu</b> (me debes 35 €) · <b>35 € eman behar dizkidazu</b> (me debes 35 €).</p>'],
    ['D','Zenbakiak euskaraz · Los números','<p>1 bat · 2 bi · 3 hiru · 4 lau · 5 bost · 6 sei · 7 zazpi · 8 zortzi · 9 bederatzi · 10 hamar</p><p>11 hamaika · 12 hamabi · 13 hamairu · 14 hamalau · 15 hamabost · 16 hamasei · 17 hamazazpi · 18 hemezortzi · 19 hemeretzi · 20 hogei · 21 hogeita bat · 22 hogeita bi</p><p>30 hogeita hamar · 31 hogeita hamaika · 32 hogeita hamabi · 40 berrogei · 41 berrogeita bat · 42 berrogeita bi · 50 berrogeita hamar · 51 berrogeita hamaika · 52 berrogeita hamabi</p><p>60 hirurogei · 61 hirurogeita bat · 62 hirurogeita bi · 70 hirurogeita hamar · 71 hirurogeita hamaika · 72 hirurogeita hamabi · 80 laurogei · 81 laurogeita bat · 82 laurogeita bi · 90 laurogeita hamar · 91 laurogeita hamaika · 92 laurogeita hamabi</p><p>300 hirurehun · 400 laurehun · 500 bostehun</p>'],
    ['E','Esaldiak · Algunas frases','<ul><li><b>Ez daukat kanbiorik.</b> — No tengo cambios.</li><li><b>Banoa!</b> — ¡Ya voy!</li><li><b>Zer hartu duzue?</b> — ¿Qué habéis tomado?</li><li><b>Zer hartu duzu?</b> — ¿Qué has tomado?</li><li><b>Zer izan da?</b> — ¿Qué ha sido?</li></ul>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Aizu','Oye'],['Banoa','Ya voy'],['Daude','Están'],['Ekarri','Traer'],['Eman','Dar'],['Esan','Decir'],['Eseri','Sentarse'],['Eserita','Sentado/a'],['Itxaron','Esperar'],['Kobratu','Cobrar'],['Ordaindu','Pagar'],['Tori','Toma'],['Zer hartu duzu','Qué has tomado'],['Zer hartu duzue','Qué habéis tomado']]],
    ['Dirua','Dinero',[['Billete','Billete'],['Buelta; Gainerako','Vuelta'],['Diru','Dinero'],['Garesti','Caro'],['Juxtu','Justo'],['Kanbio','Cambio'],['Kontu','Cuenta'],['Merke','Barato'],['Txanpon','Moneda'],['Zentimo','Céntimo']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Beltz berezi','Tinto especial'],['Biter','Bitter'],['Freskagarri','Refresco'],['Garagardo','Cerveza'],['Gorri berezi','Clarete especial'],['Ogitarteko; Otarteko','Bocadillo'],['Sagar','Manzana'],['Salda','Caldo'],['Txuri berezi','Blanco especial'],['Zumo','Zumo']]],
    ['Besterik','Otros',[['Badaukat','Ya tengo'],['Badaukazu','Ya tienes'],['Badaukazue','Ya tenéis'],['Baina','Pero'],['Barkatu','Perdón'],['Berehala','Enseguida'],['Ea, bada','Vamos a ver; a ver'],['Eskerrik asko','Muchas gracias'],['Ez daukat','No tengo'],['Ez daukazu','No tienes'],['Ez horregatik','No hay por qué'],['Globo; Bunbuilo','Globo; bocadillo (cómic)'],['Mahaian','En la mesa'],['Mila esker','Mil gracias'],['Segituan','Enseguida'],['Zenbat','Cuánto'],['Zerbitzari','Camarero/a'],['Zuei','A vosotros'],['Zuri','A ti']]]
  ],
  er:[
    {k:'A', eu:'Saia zaitez idazten CDan entzuten dituzun zenbakiak.', es:'Trata de escribir los números que escuchas en el CD.', m:'cd', cdp:4, o:42,
      it:['…','…','…','…','…','…'], sol:['1,75','4,30','15,20','12','27','18,50']},
    {k:'B', eu:'Erderazko esaldiak bere itzulpenarekin lotu.', es:'Une las frases en castellano con sus traducciones.', o:42,
      it:['¿Cuánto te debo?','La cuenta, por favor.','No tengo cambios.','Toma las vueltas.','Son 18 euros.'],
      op:['Ez daukat kanbiorik.','Hemezortzi euro dira.','Zenbat zor dizut?','Tori bueltak.','Kontua, mesedez.'],
      sol:['Zenbat zor dizut?','Kontua, mesedez.','Ez daukat kanbiorik.','Tori bueltak.','Hemezortzi euro dira.']},
    {k:'C', eu:'Sartu esaldiak dagokien globoan.', es:'Escribe las frases en los bocadillos que correspondan: «Kobratuko didazu?» · «Bai, segituan.» · «Zenbat da?» · «Lau euro eta hogei zentimo.»', m:'irudia', o:42,
      it:['1. bineta: bezeroa — … / zerbitzaria — …','2. bineta: bezeroa — … / zerbitzaria — …'],
      sol:['Bezeroa: Kobratuko didazu? — Zerbitzaria: Bai, segituan.','Bezeroa: Zenbat da? — Zerbitzaria: Lau euro eta hogei zentimo.']}
  ],
  bad:{t:['Botea','El bote'],
    eu:'«Potea» tabernaz taberna ibiltzeko lagun koadrila batek adostuta eta denek kopuru bera jartzen duten dirua da. Koadrila batzuetan, beti pertsona berak eramaten du, eta, beste batzuetan, txandaka egiten da.\n\nOhitura zabaldua izan arren, gure herrian berri samarra dela esan dezakegu eta, sorreraren zergatia ez badakigu ere, susmoa da beharbada koadrilaren batek sortuko zuela inork ez zedin ordaindu gabe gera. Izan ere, koadriletan, handietan batez ere, beti izaten da bat edo beste «eskakeatzen» dena, eta, egun batean edo bitan errondarik ez ordaintzeagatik ezer gertatzen ez bada ere, azkenerako aspertu egiten zara «espabilatuari» ordaintzen. Potea jarraraziz, egoera gogor samarrak saihesten dira, inori ezer aurpegiratu beharrik gabe.',
    es:'El bote o fondo es un dinero que pone una cuadrilla para ir de bar en bar. Todos ponen la misma cantidad y en algunas cuadrillas siempre lo lleva la misma persona; en otras, en cambio, se hace por turnos.\n\nAunque es una costumbre muy extendida, podemos decir que es bastante nueva en nuestro país, y aunque no sabemos cómo surgió, probablemente la haya instaurado alguna cuadrilla para evitar que nadie se quede sin pagar. En las cuadrillas, sobre todo en las grandes, siempre hay alguno/a que anda escaqueándose, y aunque no pasa nada por no pagar alguna ronda un día o dos, al final uno se aburre de pagarle al «espabilado/a». El bote sirve para evitar estas situaciones, a veces bastante incómodas, sin tener que echar nada en cara a nadie.'}
});

A2_OSTALARITZA.units.push({
  n:3, eu:'Freskagarriak', es:'Refrescos', tomo:1, orr:45, pdf:'03-freskagarriak.pdf', off:0,
  helb:['Eskatutakoa ulertzea eta zerbitzatzea.','Entender y servir lo que se le pide.'],
  eg:['Arratsaldea da. Bero handia dago. Amona eta bilobak hondartzako tabernara joan dira.','Es la tarde. Hace mucho calor. La abuela y los nietos han ido al bar de la playa.'],
  cd:5,
  dial:[
    ['Tabernaria','Zein da hurrengoa?','¿Quién es el siguiente?'],
    ['Amona','Gu gara. Ea, laranja-zumo bat nahi dut, eta umeentzat izozkiak.','Nosotros. A ver, quiero un zumo de naranja y helados para los niños.'],
    ['Tabernaria','Izozkiak, nolakoak?','Los helados, ¿de qué clase?'],
    ['Amona','Utzidazu izozkien kartela aukeratzeko.','Déjame el cartel de los helados para elegir.'],
    ['Tabernaria','Aukeratu al duzue?','¿Habéis elegido?'],
    ['Amona','Bai. Bi marrubizko kukurutxo eta limoizko polo bat. Eta garagardo bat, hotz-hotza.','Sí. Dos cucuruchos de fresa y un polo de limón. ¡Ah!, y una cerveza, bien fría.'],
    ['Tabernaria','Oso ondo, tori.','Muy bien, tenga.'],
    ['Amona','Itxaron, gozoki batzuk ere bai. Bi patata-poltsa eta sei gominola.','Espera, también quiero unas golosinas. Dos bolsas de patatas y seis gominolas.'],
    ['Tabernaria','Ederki. Besterik?','Bien. ¿Algo más?'],
    ['Amona','Ez, zenbat da?','No. ¿Cuánto es?'],
    ['Tabernaria','Sei euro eta hirurogeita hamar zentimo.','Seis euros y setenta céntimos.'],
    ['Amona','Tori.','Toma.'],
    ['Tabernaria','Eskerrik asko.','Gracias.']
  ],
  ar:[
    {k:'1', eu:'Lotu irudiak eta hitzak.', es:'Une los dibujos y las palabras.', m:'irudia', o:48,
      it:['Marrubizko kukurutxoa','Izozkiak','Limoizko poloa','Garagardoa','Patata-poltsa','Laranja-zumoa'],
      sol:['irudia a','irudia b','irudia f','irudia d','irudia e','irudia c']},
    {k:'2', eu:'Jarri euskaraz esaldi hauek.', es:'Pon en euskera estas frases.', o:48,
      it:['¿Quién es el siguiente?','¿Para tomar aquí o para llevar?','En vaso de plástico, por favor.','Dos polos de limón.','Un zumo bien frío.'],
      sol:['Zein / Nor da hurrengoa?','Hemen hartzeko ala eramateko?','Plastikozko basoan, mesedez.','Bi limoizko polo.','Zumo bat, hotz-hotza.']},
    {k:'3', eu:'Lotu pertsonaia bakoitza eskatzen duenarekin.', es:'Une cada personaje con lo que pide.', m:'irudia', o:48,
      it:['Piña-zumoa nahi dut.','Emaidazu botila bat ur.','Garagardoa nahi dut.','Lau marrubizko kukurutxo nahi ditugu.'],
      sol:['pertsonaia d','pertsonaia c','pertsonaia a','pertsonaia b']},
    {k:'4', eu:'CDa entzun eta x batekin marka ezazu amonak eskatutakoa.', es:'Escucha el CD y marca con una x lo que pide la abuela.', m:'cd', cdp:6, o:49,
      it:['Pintxo bat','Limoizko poloa','Gominolak','Kafesne bat','Freskagarri bat','Garagardoa','Marrubizko kukurutxoak','Ura','Laranja-zumoa','Salda beroa','Olibak','Patatak','Izozkien kartela'],
      sol:'Pide: limoizko poloa · gominolak · garagardoa · marrubizko kukurutxoak · laranja-zumoa · patatak · izozkien kartela.'},
    {k:'5', eu:'Lotu galderak eta erantzunak.', es:'Une cada pregunta con su respuesta.', o:49,
      it:['Zer nahi duzu?','Zenbat izozki?','Zein da hurrengoa?','Eta umearentzat?'],
      op:['Lau izozki.','Gu gara.','Umearentzat patata-poltsa bat.','Laranja-zumoa nahi dut.'],
      sol:['Laranja-zumoa nahi dut.','Lau izozki.','Gu gara.','Umearentzat patata-poltsa bat.']}
  ],
  az:[
    ['A','Nahi edo behar · Querer o necesitar','<p>¿Cómo le preguntaremos al cliente qué quiere?</p><ul><li><b>Zer nahi duzu / duzue?</b> — ¿Qué quieres / quieren?</li><li><b>Zer behar duzu / duzue?</b> — ¿Qué necesitas / necesitan?</li></ul><p>Respuestas: <b>Izozkia nahi dut / dugu</b> (quiero / queremos helado, sing.) · <b>Izozkiak nahi ditut / ditugu</b> (pl.) · <b>Izozkia behar dut / dugu</b> · <b>Izozkiak behar ditut / ditugu</b>.</p>'],
    ['B','Txanda · El turno','<ul><li><b>Zein / Nor da hurrengoa?</b> · <b>Hurrengoa?</b> — ¿Cuál / quién es el siguiente? · ¿El siguiente?</li><li><b>Ni</b> o <b>Ni naiz</b> — Yo · Soy yo.</li><li><b>Gu</b> o <b>Gu gara</b> — Nosotros · Somos nosotros.</li></ul>'],
    ['C','Zerezkoa? · ¿De qué?','<p>Para aclarar de qué gusto o clase es algo (recuerda: «limoizko poloa»): <b>CLASE + ZKO + OBJETO</b>.</p><p><i>marrubi + zko + kukurutxoa</i> = <b>marrubizko kukurutxoa</b> (cucurucho de fresa).</p><p>Si la clase termina en consonante, se mete una «e»: <b>paperezko serbileta</b> (servilleta de papel).</p><p>En otros casos basta con la clase y la comida o bebida: <b>laranja-zumoa</b> (zumo de naranja), <b>piña-zumoa</b>. El orden es el contrario al castellano: zumo de melocotón → <b>melokotoi-zumoa</b>.</p>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Aukeratu','Elegir'],['Behar izan','Necesitar'],['Ekarri','Traer'],['Eman','Dar'],['Eraman','Llevar'],['Erantzun','Contestar'],['Galdetu','Preguntar'],['Hartu','Coger'],['Itxaron','Esperar'],['Nahi izan','Querer']]],
    ['Familia','Familia',[['Ahizpa','Hermana (de hermana)'],['Aita','Padre'],['Aitona','Abuelo'],['Alaba','Hija'],['Ama','Madre'],['Amona','Abuela'],['Anaia','Hermano (de hermano)'],['Arreba','Hermana (de hermano)'],['Biloba','Nieto/a'],['Neba','Hermano (de hermana)'],['Seme','Hijo']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Batido','Batido'],['Bermut','Vermouth'],['Garagardo','Cerveza'],['Gominola','Gominola'],['Gozoki','Golosina'],['Izotz','Hielo'],['Izozki','Helado'],['Kukurutxo','Cucurucho'],['Laranja','Naranja'],['Limoi','Limón'],['Marrubi','Fresa'],['Melokotoi','Melocotón'],['Mosto','Mosto'],['Patata','Patata'],['Piña; Anana','Piña'],['Polo','Polo'],['Txokolate','Chocolate'],['Urdaiazpiko bokadilo','Bocadillo de jamón'],['Zumo','Zumo']]],
    ['Besterik','Otros',[['Bero','Caliente'],['Bero-bero','Bien caliente'],['Bezero','Cliente/a'],['Emaidazu','Dame'],['Eramateko','Para llevar'],['Gu','Nosotros/as'],['Handi','Grande'],['Hartzeko','Para tomar'],['Hau','Este/a/o'],['Hemen','Aquí'],['Hondartza','Playa'],['Hor','Ahí'],['Hori','Ese/a/o'],['Hotz','Frío'],['Hotz-hotz','Bien frío'],['Hurrengo','Próximo; siguiente'],['Kartela','Cartel'],['Mota','Clase'],['Mutil','Chico'],['Neska','Chica'],['Ni','Yo'],['Niretzat','Para mí'],['Paper','Papel'],['Plastikozko','De plástico'],['Plastikozko baso / edalontzi','Vaso de plástico'],['Poltsa','Bolsa'],['Serbileta','Servilleta'],['Txiki','Pequeño'],['Ume','Niño/a'],['Utzidazu','Déjame'],['Zakarrontzi','Basurero']]]
  ],
  er:[
    {k:'A', eu:'Nola esaten da?', es:'¿Cómo se dice?', o:54,
      it:['Un zumo de limón.','Una servilleta de papel.','Un helado de melocotón.','Un batido de chocolate.'],
      sol:['Limoizko zumo bat.','Paperezko serbileta bat.','Melokotoizko izozki bat.','Txokolatezko batido bat.']},
    {k:'B', eu:'Ordenatu elkarrizketa.', es:'Ordena el diálogo.', o:54,
      it:['Ez. Zenbat da?','Tori. Besterik?','Bi garagardo eta mosto bat nahi ditut.','Lau euro eta berrogeita bost zentimo dira.','Kaixo! Zer nahi duzu?'],
      nota:'La solución es el diálogo ya ordenado, de la primera a la última frase.',
      sol:['Kaixo! Zer nahi duzu?','Bi garagardo eta mosto bat nahi ditut.','Tori. Besterik?','Ez. Zenbat da?','Lau euro eta berrogeita bost zentimo dira.']},
    {k:'C', eu:'Lotu euskaraz eta gaztelaniaz esanahi bera duten hitzak.', es:'Une las palabras que tienen el mismo significado en euskera y en castellano.', o:54,
      it:['Patata-poltsa','Banillazko batidoa','Garagardo hotza','Kartela','Plastikozko basoa','Itxaron'],
      op:['Vaso de plástico','Bolsa de patatas','Espera','Batido de vainilla','Cartel','Cerveza fría'],
      sol:['Bolsa de patatas','Batido de vainilla','Cerveza fría','Cartel','Vaso de plástico','Espera']}
  ],
  bad:{t:['Azeitunak / olibak','Aceitunas'],
    eu:'Zerbeza ala garagardoa? Azeitunak ala olibak? Ogitartekoa ala bokadiloa? Zenbat komeria!\n\nZerbeza, azeituna, bokadiloa, bueltak, kanbioak… Seguruenez, hitz hauei erdal kutsua hartuko zenien. Egia esan, hauek guztiak esateko euskal hitz jatorrak badaude, baina badira gaztelaniatik (edo beste hizkuntza batzuetatik) hartutako zenbait hitz erabileraren poderioz gure hizkuntzan sartzen joan direnak eta gaur egun erabat arrunt bihurtu direnak.\n\nHori bai, bakar batzuk besterik ez dira; beraz, «zerbeza bat» bai, baina «vino bat» ez!',
    es:'¿«Zerbeza» o «garagardoa»? ¿«Azeitunak» u «olibak»? ¿«Ogitartekoa» o «bokadiloa»? ¡Qué lío!\n\n«Zerbeza, azeituna, bokadiloa, bueltak, kanbioak…» Seguramente te habrás dado cuenta de que estas palabras son un calco del castellano. A decir verdad, existen palabras en euskera para expresar estos conceptos, pero hay ciertas palabras provenientes del castellano (o de algunas otras lenguas) que se han ido afincando en nuestro idioma a fuerza de utilizarlas, y hoy en día se utilizan de forma natural.\n\nEso sí, son solo unas pocas; por lo tanto, «zerbeza bat» sí, pero «vino bat» ¡no!'}
});

A2_OSTALARITZA.units.push({
  n:4, eu:'Musika', es:'Música', tomo:1, orr:57, pdf:'04-musika.pdf', off:0,
  helb:['Bezeroak gustuko musika eskatzean erantzutea.','Responder cuando el cliente le pide la música que le gusta.'],
  eg:['Pubean musika lasaia dago, baina Ainarari ez zaio gustatzen. Mahaitik altxatuko da eta tabernariari aldatzeko esango dio.','En el pub hay música tranquila, pero a Ainara no le gusta. Se levanta de la mesa y le pide al camarero que la cambie.'],
  cd:7,
  oh:['⚠ Errata del libro corregida: el camarero dice «Bai, baino altuegi ez»; lo correcto es «baina» (pero).'],
  dial:[
    ['Ainara','Aizu, musika aldatuko al duzu?','¿Te importa cambiar la música?'],
    ['Tabernaria','Zer, ez zaizu gustatzen?','¿Qué, no te gusta?'],
    ['Ainara','Bai, baina nahiago dut euskal musika.','Sí, pero prefiero la música vasca.'],
    ['Tabernaria','Euskal musika hemen dago. Aukeratu.','La música vasca está aquí. Elige la que quieras.'],
    ['Ainara','Jar ezazu hau, Mikel Urdangarin da.','Pon esta, es Mikel Urdangarin.'],
    ['Tabernaria','Bale, oso polita da. Niri ere gustatzen zait.','Vale, es muy bonita. A mí también me gusta.'],
    ['Ainara','Altuxeago jarriko duzu?','¿La pones un poco más alta?'],
    ['Tabernaria','Bai, baina altuegi ez.','Sí, pero demasiado alta no, ¿eh?'],
    ['Ainara','Bale, oso ondo; horrela bai.','Vale, muy bien; así sí.']
  ],
  ar:[
    {k:'1', eu:'Entzun berriro elkarrizketa eta osatu hutsuneak.', es:'Escucha de nuevo el diálogo y completa los huecos.', m:'cd', cdp:7, o:60,
      it:['Tabernaria: Zer, …?','Tabernaria: …, …','Tabernaria: Bale, oso polita da. …','Tabernaria: Bai, …'],
      sol:['Zer, ez zaizu gustatzen?','Euskal musika hemen dago. Aukeratu.','Niri ere gustatzen zait.','Bai, baina altuegi ez.']},
    {k:'2', eu:'Lotu esanahi bereko hitzak.', es:'Une las palabras que tienen el mismo significado.', o:60,
      it:['Musika','Gustatu','Jarri','Aldatu','Baxuxeago','Horrela'],
      op:['Cambiar','Poner','Así','Música','Gustar','Un poco más bajo'],
      sol:['Música','Gustar','Poner','Cambiar','Un poco más bajo','Así']},
    {k:'3', eu:'Lotu irudiak eta esaldiak.', es:'Une las frases y los dibujos (tres discos: 1 Jazzmatazz · 2 Mikel Laboa · 3 música clásica).', m:'irudia', o:61,
      it:['Musika klasikoa gustatzen zait.','Euskal musika nahiago dut.','Jazza gustatzen zaizu?'],
      sol:['3. diskoa (klasikoa)','2. diskoa (Mikel Laboa)','1. diskoa (Jazzmatazz)']},
    {k:'4', eu:'Jarri euskaraz esaldi hauek.', es:'Pon en euskera estas frases.', o:61,
      it:['Prefiero el rock.','¿No te gusta?','Pon Benito Lertxundi.','Es muy bonito.'],
      sol:['Nahiago dut rocka.','Ez zaizu gustatzen?','Jarri Benito Lertxundi.','Oso polita da.']}
  ],
  az:[
    ['A','Hau gustatzen zait / Hau ez zait gustatzen · Me gusta / no me gusta','<p><b>OBJETO + GUSTATZEN + ZAIT</b> (a mí) · <b>ZAIZU</b> (a ti) · <b>ZAIGU</b> (a nosotros) · <b>ZAIZUE</b> (a vosotros)</p><p><i>Euskal musika gustatzen zait</i> = me gusta la música vasca.</p><p>Negativa: <b>OBJETO + EZ + ZAIT/ZAIZU/ZAIGU/ZAIZUE + GUSTATZEN</b> — <i>Musika ez zait gustatzen</i> = no me gusta la música.</p><p>Pregunta: <b>Euskal musika gustatzen zaizu?</b> — <i>Bai, euskal musika gustatzen zait.</i> / <i>Ez, euskal musika ez zait gustatzen.</i></p>'],
    ['B','Aginduak · Órdenes','<p>Hay más de una forma de dar órdenes; aquí dos:</p><p>a. <b>El verbo en infinitivo</b> (vale igual para «tú» y «vosotros»): <b>Ekarri!</b> ¡trae! / ¡traed! · <b>Aldatu!</b> ¡cambia! / ¡cambiad! · <b>Jarri!</b> ¡pon! / ¡poned!</p><p>b. <b>Especificando la persona</b>: <b>Ekar ezazu!</b> ¡tráelo tú! · <b>Alda ezazu!</b> ¡cámbialo tú! · <b>Jar ezazu!</b> ¡ponlo tú!</p>'],
    ['C','Altuago, altuxeago, altuegi','<ul><li>Más: adjetivo + <b>AGO</b> = <b>altuago</b> (más alto)</li><li>Un poco más: adjetivo + <b>XEAGO</b> = <b>altuxeago</b> (un poco más alto)</li><li>Demasiado: adjetivo + <b>EGI</b> = <b>altuegi</b> (demasiado alto)</li></ul>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Aldatu','Cambiar'],['Altxatu','Levantarse'],['Aukeratu','Elegir'],['Gustatu','Gustar'],['Igo; Altxatu','Subir'],['Ipini','Poner'],['Jaitsi','Bajar'],['Jarri','Poner'],['Kendu','Quitar'],['Nahiago izan','Preferir']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Kafe irlandar','Café irlandés'],['Koinak','Coñac'],['Konbinatu','Combinado'],['Kopa','Copa'],['Likore','Licor'],['Txanpain','Champagne'],['Txupito','Chupito']]],
    ['Besterik','Otros',[['Abeslari','Cantante'],['Alai','Alegre'],['Altu','Alto'],['Atsegin','Agradable'],['Baxu','Bajo'],['Da','Es'],['Dantza','Danza'],['Euskal musika','Música de Euskal Herria'],['Goxo','Suave'],['Hau','Este/a/o'],['Horrela','Así'],['Itsusi','Feo'],['Musika','Música'],['Musika klasiko','Música clásica'],['Musika-talde','Grupo musical'],['Oso','Muy'],['Polit','Bonito'],['Triste','Triste'],['Txoko','Rincón'],['Zarata','Ruido']]]
  ],
  er:[
    {k:'A', eu:'Euskaratu.', es:'Pon en euskera.', o:66,
      it:['Julio Iglesias no me gusta.','La música es muy bonita.','Pon un poco más bajo.','Pon un poco más alto.'],
      sol:['Julio Iglesias ez zait gustatzen.','Musika oso polita da.','Jarri / jar ezazu baxuxeago.','Jarri / jar ezazu altuxeago.']},
    {k:'B', eu:'Lotu kontrako esanahia dutenak.', es:'Une las palabras que signifiquen lo contrario.', o:66,
      it:['Altuegia','Polita','Jarri','Eskatu','Altxatu'],
      op:['Itsusia','Eman','Jaitsi','Baxuegia','Kendu'],
      sol:['Baxuegia','Itsusia','Kendu','Eman','Jaitsi']},
    {k:'C', eu:'Jarri esaldiak beren lekuan elkarrizketa osatzeko.', es:'Pon las frases en su sitio para completar el diálogo.', m:'irudia', o:66,
      it:['Bezeroa: … / Tabernaria: … / Bezeroa: … — con «Bai, zein musika nahi duzu?» · «Musika aldatuko duzu?» · «Musika lasaia nahi dut.»','Tabernaria: … / Bezeroa: … — con «Bai, hau oso polita da» · «Hau gustatzen zaizu?»'],
      sol:['Bezeroa: Musika aldatuko duzu? — Tabernaria: Bai, zein musika nahi duzu? — Bezeroa: Musika lasaia nahi dut.','Tabernaria: Hau gustatzen zaizu? — Bezeroa: Bai, hau oso polita da.']}
  ],
  bad:{t:['Festak','Fiestas'],
    eu:'Egutegiari begiratuz gero, festa mordoa aurkituko duzu: inauteriak, herri bakoitzeko festak, santomasak… Euskal Herriko festa batzuk oso ezagunak dira; izan ere, nork ez ditu ezagutzen Donostiako Danborrada, sanferminak edo Irungo Alardea? Hala ere, badira beste batzuk, hain ezagunak izan gabe, oso politak edo bitxiak direnak: adibidez, Urkiolako «sanantonioak».\n\nEkainaren 13an ospatzen da, Bizkaiko Urkiola mendian dagoen San Antonio Santutegian, eta erromeria horretara mota guztietako jendea joaten bada ere, helburua oso berezia da. Diotenez, San Antoniok senargaia edo andregaia aurkitzen laguntzen du. Elizaren aurrean dagoen harritzarrari hiru buelta eman, eliza barruan santuari kandela bat piztu eta listo! Hurrengo egunean bikotea aseguratuta! Edo horrela esaten du, behintzat, kantuak:\n«Neskazaharrak joaten dira Urkiolara, Urkiolara, / Santuari eskatzeko senar on bana, senar on bana».',
    es:'Si miras el calendario, encontrarás un montón de fiestas: carnavales, las fiestas de cada pueblo, Santo Tomás… Algunas fiestas de Euskal Herria son muy conocidas: ¿quién no conoce la Tamborrada de Donostia, los sanfermines o el Alarde de Irun? Sin embargo, hay otras que, sin ser tan conocidas, son muy curiosas y bonitas. Un ejemplo son los sanantonios de Urkiola.\n\nEsta fiesta se celebra el 13 de junio en el Santuario de San Antonio, en el monte Urkiola de Bizkaia. Aunque ahora va gente de toda clase a esta romería, el objetivo es muy especial. Según dicen, San Antonio ayuda a encontrar novio o novia. Dar tres vueltas a la gran piedra que está delante de la iglesia, luego encender una vela al santo dentro ¡y listo! ¡Al día siguiente, pareja asegurada! O eso dice por lo menos la canción:\n«Las solteras van a Urkiola, a Urkiola, / a pedirle al santo un buen marido para cada una».'}
});

A2_OSTALARITZA.units.push({
  n:5, eu:'Laguntza', es:'Ayuda', tomo:1, orr:69, pdf:'05-laguntza.pdf', off:0,
  helb:['Ondoezik dagoen pertsonari laguntza eskaintzea.','Ofrecer ayuda a alguien que no se encuentra bien.'],
  eg:['Oier eta Leire igerilekuko terrazan daude. Oier ondoezik dago eta Leire tabernariari laguntza eskatzera joan da.','Oier y Leire están en la terraza de la piscina. Oier no se encuentra bien y Leire ha ido a pedir ayuda a la camarera.'],
  cd:8,
  dial:[
    ['Leire','Aizu! Lagundu, mesedez!','Perdona, ¿nos podrías ayudar?'],
    ['Tabernaria','Bai, zer behar duzu?','Sí, ¿qué os pasa?'],
    ['Leire','Nire laguna ez dago ondo. Lagunduko didazu?','Mi amigo no está bien. ¿Me ayudas?'],
    ['Tabernaria','Jakina! Non dago?','¡Sí, por supuesto! ¿Dónde está?'],
    ['Leire','Han.','Allí.'],
    ['Tabernaria','Zer gertatzen zaio?','¿Qué le pasa?'],
    ['Leire','Ez dakit. Buruko mina dauka eta zorabiatuta dago. Badaukazu zerbait emateko?','No sé. Le duele la cabeza y está mareado. ¿Tienes algo para darle?'],
    ['Tabernaria','Trankil! Egon hemen, itzalean. Orain etorriko naiz.','Tranquila. Quedaos aquí, en la sombra, que vengo enseguida.'],
    ['Leire','Aizu, faborez, ur pixka bat ere bai.','Bien, pero tráenos también un poco de agua, por favor.'],
    ['Tabernaria','Tori, ura fresko-freskoa dago. Mesede egingo dio. Eta lasaitu, orain etorriko da soroslea.','Toma, el agua está muy fresca. Le hará bien. Y tranquilizaos, ahora vendrá el socorrista.'],
    ['Leire','Oso ondo! Mila esker!','¡Muy bien! ¡Muchas gracias!']
  ],
  ar:[
    {k:'1', eu:'Begiratu argazkiei eta saiatu lotzen esanahi bera duten euskarazko eta gaztelaniazko esaldiak.', es:'Mira las fotos (burua · besoa · bizkarra · hanka) y une las frases que tengan el mismo significado.', m:'irudia', o:72,
      it:['Tiene dolor de cabeza','Tiene dolor de brazo','Tiene dolor de espalda','Tiene dolor de pierna'],
      op:['Hankako mina dauka.','Buruko mina dauka.','Bizkarreko mina dauka.','Besoko mina dauka.'],
      sol:['Buruko mina dauka.','Besoko mina dauka.','Bizkarreko mina dauka.','Hankako mina dauka.']},
    {k:'2', eu:'Entzun berriro elkarrizketa eta osatu hutsuneak.', es:'Escucha de nuevo el diálogo y completa lo que dice la camarera.', m:'cd', cdp:8, o:72,
      it:['Tabernaria: Bai, …','Tabernaria: … (Leire: Han.)','Tabernaria: …','Tabernaria: Trankil! …','Tabernaria: Tori, … Eta lasaitu, …'],
      sol:['Bai, zer behar duzu?','Jakina! Non dago?','Zer gertatzen zaio?','Trankil! Egon hemen, itzalean. Orain etorriko naiz.','Tori, ura fresko-freskoa dago. Mesede egingo dio. Eta lasaitu, orain etorriko da soroslea.']},
    {k:'3', eu:'Jarri euskaraz esaldi hauek.', es:'Pon en euskera estas frases.', o:73,
      it:['¿Qué le pasa?','Tranquila, te ayudaré.','Le hará bien.','Mi amigo no está bien.'],
      sol:['Zer gertatzen zaio?','Lasai / trankil, lagunduko dizut.','Mesede egingo dio.','Nire laguna ez dago ondo.']},
    {k:'4', eu:'Lotu esaldiak eta marrazkiak.', es:'Une las frases con los dibujos.', m:'irudia', o:73,
      it:['Hartu ura, mesede egingo dizu.','Nire laguna zorabiatuta dago.','Eseri hemen itzalean.','Laguntza behar dut!'],
      sol:['marrazkia d','marrazkia b','marrazkia a','marrazkia c']},
    {k:'5', eu:'Lotu galderak eta erantzunak.', es:'Une las preguntas con sus respuestas.', o:73,
      it:['Zer gertatzen zaio?','Non dago zure laguna?','Laguntza behar duzu?','Badaukazu zerbait emateko?'],
      op:['Bai, tori ur freskoa.','Hankako mina dauka.','Han dago.','Bai, laguntza behar dut.'],
      sol:['Hankako mina dauka.','Han dago.','Bai, laguntza behar dut.','Bai, tori ur freskoa.']}
  ],
  az:[
    ['A','Laguntza eskaintzeko · Para ofrecer ayuda','<ul><li><b>Lagunduko dizut / dizuet?</b> — ¿Te / os ayudo?</li><li><b>Laguntzarik behar duzu / duzue?</b> — ¿Necesitas / necesitan ayuda?</li></ul><p>Respuestas: <b>Bai, lagundu, mesedez.</b> (Sí, ayúdame / ayúdanos, por favor) · <b>Bai, laguntza behar dut / dugu.</b> (Sí, necesito / necesitamos ayuda)</p>'],
    ['B','Eta laguntza eskatzen badizute? · ¿Y si te piden ayuda?','<ul><li><b>Mesedez, lagunduko didazu / diguzu?</b> — ¿Por favor, me / nos ayudas?</li><li><b>Mesedez, laguntza behar dut / dugu.</b> — Por favor, necesito / necesitamos ayuda.</li></ul><p>Respuestas: <b>Bai, lagunduko dizut / dizuet.</b> (Sí, te / os ayudaré) · <b>Bai, zer behar duzu / duzue?</b> (¿Sí, qué necesitas / necesitan?) · <b>Jakina! Bai horixe!</b> (Sí, ¡cómo no!)</p>'],
    ['C','Nola dago? · ¿Cómo está?','<ul><li><b>Nola zaude / dago?</b> · <b>Zer moduz zaude / dago?</b> — <i>Ondo nago / dago.</i> · <i>Gaizki nago / dago.</i></li><li><b>Ondo zaude / dago?</b> — <i>Bai, ondo nago / dago.</i> · <i>Ez, ez nago / dago ondo.</i></li><li><b>Zer gertatzen zaizu / zaio?</b> — <i>…-ko mina daukat / dauka</i> (me / le duele…) · <i>Zorabiatuta nago / dago</i> (mareado/a) · <i>Ondoezik nago / dago</i> (estoy mal).</li><li><b>Hobeto zaude / dago?</b> — <i>Bai, hobeto nago / dago.</i></li></ul>'],
    ['D','Nongo mina duzu? · ¿Dónde le duele?','<p><b>PARTE DEL CUERPO + (E)KO + MINA</b> (tengo dolor de…):</p><p><i>buru + ko + mina</i> = <b>buruko mina</b> (dolor de cabeza) · <i>bizkar + eko + mina</i> = <b>bizkarreko mina</b> (dolor de espalda)</p><p>Otra forma — <b>Non duzu mina? Hemen.</b> (¿Dónde te duele? Aquí.) <b>PARTE DEL CUERPO + (E)AN</b>: <b>buruan</b> (en la cabeza) · <b>bizkarrean</b> (en la espalda).</p>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Behar izan','Necesitar'],['Bihurritu','Torcer'],['Deitu','Llamar'],['Ebakia egin','Hacerse un corte'],['Eduki','Tener'],['Egon','Estar'],['Ekarri','Traer'],['Erori','Caer(se)'],['Etorri','Venir'],['Gertatu','Ocurrir; suceder; pasar'],['Hots egin','Llamar'],['Irristatu','Resbalar'],['Kolpea hartu','Darse un golpe'],['Lagundu','Ayudar'],['Lasaitu','Tranquilizar(se)'],['Min hartu','Hacerse daño'],['Zauritu','Herir(se)'],['Zorabiatu','Marear']]],
    ['Egoerak','Estados',[['Aurpegi txar','Mala cara'],['Bero','Caliente'],['Botaka','Vomitando'],['Fresko-freskoa','Muy fresco'],['Gaizki','Mal'],['Hobeto','Mejor'],['Hotz','Frío'],['Konorterik gabe','Sin conocimiento; desmayado/a'],['Larri','Mal; apurado/a'],['Minez','Dolorido/a'],['Okerrago','Peor'],['Ondo','Bien'],['Ondoezik','Mal (con algún malestar)'],['Zorabiatuta','Mareado/a'],['Zurbil','Pálido/a']]],
    ['Gorputz-zatiak','Partes del cuerpo',[['Beso','Brazo'],['Bizkar','Espalda'],['Buru','Cabeza'],['Esku','Mano'],['Eskumutur','Muñeca'],['Hanka','Pie; pierna'],['Lepo','Cuello'],['Orkatila','Tobillo'],['Sabel; Tripa','Tripa']]],
    ['Janaria – edaria','Comida – bebida',[['Azukre','Azúcar'],['Gatz','Sal'],['Jela; Izotz','Hielo'],['Kamamila','Manzanilla; camomila'],['Limoiarekin','Con limón'],['Te','Té'],['Ur','Agua'],['Zerbait beroa','Algo caliente']]],
    ['Besterik','Otros',[['Anbulantzia','Ambulancia'],['Aspirina','Aspirina'],['Botikin','Botiquín'],['Eguzkitan','Al sol'],['Ere bai','También'],['Han','Allí'],['Hemen','Aquí'],['Itzalean','A la sombra'],['Lagun','Amigo/a'],['Laguntza','Ayuda'],['Mesede egingo dio','Le hará bien'],['Min','Dolor'],['Nire','Mi'],['Nola','Cómo'],['Non','Dónde'],['Orain etorriko da','Ahora vendrá'],['Orain etorriko naiz','Ahora vendré'],['Sendagile','Médico/a'],['Sorosle','Socorrista'],['Tentsioa jaitsi','Bajar la tensión'],['Tirita','Tirita'],['Ukendu','Pomada'],['Zer moduz','Qué tal'],['Zerbait emateko','Algo para darle'],['Ziztada','Picadura']]]
  ],
  er:[
    {k:'A', eu:'Lotu irudiak eta hitzak.', es:'Une los dibujos con las palabras.', m:'irudia', o:78,
      it:['1. marrazkia (persona agobiada)','2. marrazkia (cubo)','3. marrazkia (persona tumbada, mareada)','4. marrazkia (socorrista)'],
      op:['Soroslea','Zorabiatuta','Izotza','Larri nago'],
      sol:['Larri nago','Izotza','Zorabiatuta','Soroslea']},
    {k:'B', eu:'Nola esaten da?', es:'¿Cómo se dice?', o:78,
      it:['¿Qué te sucede?','Una manzanilla con limón, por favor.','¿Quieres que te ayude?','No estoy bien. Ayúdame, por favor.'],
      sol:['Zer gertatzen zaizu?','Kamamila limoiarekin, mesedez.','Lagunduko dizut?','Ez nago ondo. Lagundu, mesedez.']},
    {k:'C', eu:'Erantzun galderei.', es:'Contesta las preguntas.', o:78,
      it:['Hobeto zaude? (ez)','Lagunduko diguzu? (bai)','Non duzu mina? (en el tobillo)','Non dago soroslea? (ahora vendrá)'],
      sol:['Ez, ez nago hobeto.','Bai, lagunduko dizuet.','Orkatilan.','Orain etorriko da.']}
  ],
  bad:{t:['Pintxoak','Pinchos'],
    eu:'Euskal Herriko, batik bat Hegoaldeko, taberna gehienetan mostradoreak jaki goxoz beterik ikusteak bertakooi harridurarik sortzen ez badigu ere, aho zabalik uzten ditu gure herrira etortzen direnak. Garai batean goiz erdian mokadutxo bat egiteko basoerdi batzuk lagungarri gisa hartzen baziren ere, gaur, hainbeste egin du aurrera sukaldaritza-mota honek, «miniaturako sukaldaritza» ere baderitzo, ezen inolako beldurrik gabe goi-mailako sukaldaritza dela esan dezakegun; eta, hasierako zeregin horietatik haratago, otordu bikainak, oso bariatuak, orekatuak eta goxoak egiteko aukera aparta eskaintzen digu: arrautzak era guztietara prestatuta, arrainak, saltsak, entsaladak, itsaskiak…\n\nTabernetan ia denetik aurki daitekeen arren, zenbait taberna espezializatu egin dira, eta ospe handia dute tabernek zein sukaldaritza honek gure lurraldetik kanpo.',
    es:'Aunque a nosotros no nos cause ninguna sorpresa, el hecho de ver los mostradores de la mayoría de los bares de Euskal Herria, sobre todo de Hegoalde, repletos de exquisiteces deja boquiabiertas a las personas que visitan nuestro país.\n\nEn otra época era costumbre comer un pincho solamente para acompañar la bebida; ahora, sin embargo, esta llamada «cocina en miniatura» puede considerarse alta cocina y, más allá de la función que cumplía en sus comienzos, es tan amplia la variedad que nos ofrece (huevos preparados de muchas maneras, pescados, salsas, ensaladas, marisco…) que podemos hacer comidas fantásticas, muy variadas y equilibradas.\n\nAunque se puede encontrar en casi todos los bares, algunos se han especializado en este tipo de cocina hasta el punto de hacerla conocida fuera de nuestro país.'}
});

A2_OSTALARITZA.units.push({
  n:6, eu:'Debekua', es:'Prohibición', tomo:1, orr:81, pdf:'06-debekua.pdf', off:0,
  helb:['Bezeroei debekatuta dauden ekintzak jakinaraztea.','Informar al cliente sobre las actividades que están prohibidas.'],
  eg:['Goiza da. Anderrek txakurra paseatzera atera du, eta tabernan sartu da.','Es la mañana. Ander ha sacado a pasear al perro y ha entrado en el bar.'],
  cd:9,
  dial:[
    ['Ander','Egun on!','¡Buenos días!'],
    ['Tabernaria','Baita zuri ere!','¡Igualmente!'],
    ['Ander','Ebaki bat jarriko didazu?','¿Me pones un cortado?'],
    ['Tabernaria','Bai. Barkatu, baina hemen ezin da txakurrarekin sartu.','Sí. Oye, perdona, aquí no se puede entrar con el perro.'],
    ['Ander','A, ez?','¿Ah, no?'],
    ['Tabernaria','Ez, hor jartzen du: «animaliekin sartzea debekatuta dago».','No, mira: «está prohibido entrar con animales».'],
    ['Ander','Barkatu, ez naiz konturatu! Kanpoan lotu beharko dut.','Perdona, no me había dado cuenta. Lo ataré fuera.'],
    ['Tabernaria','Bai, eskerrik asko.','Sí, gracias.']
  ],
  ar:[
    {k:'1', eu:'Elkarrizketa CDan entzuten duzun bitartean, ordenatu esaldiak.', es:'Mientras escuchas el diálogo en el CD, ordena las frases.', m:'cd', cdp:9, o:84,
      it:['Baita zuri ere!','Bai. Barkatu, baina hemen ezin da txakurrarekin sartu.','Egun on!','Ebaki bat jarriko didazu?','Barkatu, ez naiz konturatu! Kanpoan lotu beharko dut.','A, ez?','Bai, eskerrik asko.','Ez, hor jartzen du: «animaliekin sartzea debekatuta dago».'],
      sol:['2','4','1','3','7','5','8','6']},
    {k:'2', eu:'Lotu marrazkiak eta esaldiak.', es:'Une las frases y los dibujos.', m:'irudia', o:84,
      it:['1. marrazkia (txakurra)','2. marrazkia (zigarroa)','3. marrazkia (saskia)','4. marrazkia (kartelak)'],
      op:['Erretzea debekatuta dago.','Etxetik janaria ekartzea debekatuta dago.','Txakurrak sartzea debekatuta dago.','Paretan kartelak eranstea debekatuta dago.'],
      sol:['Txakurrak sartzea debekatuta dago.','Erretzea debekatuta dago.','Etxetik janaria ekartzea debekatuta dago.','Paretan kartelak eranstea debekatuta dago.']},
    {k:'3', eu:'Parekatu esanahi bereko esaldiak.', es:'Une las frases que tienen igual significado.', o:85,
      it:['Ezin da erre.','Ezin da erabili.','Ezin da animaliarik sartu.','Ezin da eseri.'],
      op:['Erabiltzea debekatuta dago.','Erretzea debekatuta dago.','Esertzea debekatuta dago.','Animaliekin sartzea debekatuta dago.'],
      sol:['Erretzea debekatuta dago.','Erabiltzea debekatuta dago.','Animaliekin sartzea debekatuta dago.','Esertzea debekatuta dago.']},
    {k:'4', eu:'Idatzi marrazkietan ikusten duzuna.', es:'Escribe lo que ves en los dibujos.', m:'irudia', o:85,
      it:['1 (un perro)','2 (alguien fumando)','3 (una señal de prohibido)','4 (alguien entrando por la puerta)'],
      sol:['Txakur','Erre','Debekatuta','Sartu']},
    {k:'5', eu:'Lotu euskaraz eta gaztelaniaz esanahi berdina duten esaldiak.', es:'Une las frases que tienen igual significado en euskera y en castellano.', o:85,
      it:['Txakurra kanpoan utzi beharko duzu.','Zigarroa itzali beharko duzu.','Mugikorra erabili beharko duzu.'],
      op:['Deberás usar el móvil.','Deberás dejar al perro fuera.','Deberás apagar el cigarro.'],
      sol:['Deberás dejar al perro fuera.','Deberás apagar el cigarro.','Deberás usar el móvil.']}
  ],
  az:[
    ['A','Debekuak adierazteko · Para expresar las prohibiciones','<p><b>DEBEKATUTA + DAGO + (OBJETO) + VERBO + T(Z)EA</b></p><ul><li><b>Debekatuta dago txakurrarekin sartzea.</b> — Está prohibido entrar con el perro.</li><li><b>Debekatuta dago pipak jatea.</b> — Está prohibido comer pipas.</li></ul>'],
    ['B','Ezin · No poder','<p>Hay varias formas de decir que algo no es posible; de momento, una: <b>EZIN + DA + OBJETO + VERBO</b>.</p><ul><li><b>Ezin da barrura sartu.</b> — No se puede entrar dentro.</li><li><b>Ezin da txakurrarekin sartu.</b> — No se puede entrar con el perro.</li></ul>'],
    ['C','«Kanpoan utzi beharko dut» · «Deberé dejarlo fuera»','<p><b>Behar izan</b> significa «deber» o «necesitar» (recuerda: <i>Zer behar duzu?</i> ¿Qué necesitas?). Para el futuro se le añade <b>-ko</b>:</p><ul><li>Ahora: <b>Txakurra kanpoan utzi behar dut.</b> — Debo dejar el perro fuera.</li><li>Luego: <b>Txakurra kanpoan utzi beharko dut.</b> — Deberé dejar el perro fuera.</li></ul>'],
    ['D','Kontuz ordenarekin! · ¡Cuidado con el orden!','<p>El orden de las palabras en euskera es muy importante y casi nunca coincide con el castellano:</p><p>«Deberé dejar el perro fuera» → <b>Txakurra kanpoan utzi beharko dut</b> — literalmente «el perro fuera dejar deberé».</p>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Ahal izan','Poder'],['Atera','Salir; sacar'],['Barkatu','Perdonar'],['Begiratu','Mirar'],['Behar','Deber; necesitar'],['Egon','Estar'],['Erabili','Utilizar'],['Erantsi','Pegar'],['Erre','Fumar; quemar; asar'],['Eseri','Sentar(se)'],['Ezin izan','No poder'],['Irten','Salir'],['Itzali','Apagar'],['Jan','Comer'],['Jarri','Poner'],['Konturatu','Darse cuenta'],['Lotu','Atar'],['Piztu','Encender'],['Sartu','Entrar; meter(se)']]],
    ['Esaldiak','Frases',[['Ahal da','Se puede'],['Baita zuri ere','Igualmente'],['Ez da posible','No es posible'],['Ez naiz konturatu','No me he dado cuenta'],['Ezin da','No se puede'],['Jartzen du','Pone'],['Posible da','Es posible']]],
    ['Besterik','Otros',[['Animalia','Animal'],['Arau','Regla'],['Ate','Puerta'],['Azukre','Azúcar'],['Barruan','Dentro'],['Bezero','Cliente/a'],['Debekatuta','Prohibido'],['Debeku','Prohibición'],['Ebaki','Cortado'],['Esne','Leche'],['Goiz','Mañana'],['Hemen','Aquí'],['Hor','Ahí'],['Kafesne','Café con leche'],['Kanpoan','Fuera'],['Kartel','Cartel'],['Mugikor','Móvil'],['Pipak','Pipas'],['Posible','Posible'],['Telefono','Teléfono'],['Txakur','Perro/a'],['Zigarro','Cigarro']]]
  ],
  er:[
    {k:'A', eu:'Lotu erlazioa duten esaldiak.', es:'Une las frases que tengan relación.', o:90,
      it:['Erretzea debekatuta dago.','Animaliekin sartzea debekatuta dago.','Ezin da mugikorra erabili.'],
      op:['Kalera joan beharko dut.','Zigarroa itzali beharko dut.','Txakurra kanpoan utzi beharko dut.'],
      sol:['Zigarroa itzali beharko dut.','Txakurra kanpoan utzi beharko dut.','Kalera joan beharko dut.']},
    {k:'B', eu:'Jarri globo bakoitzean dagokion esaldia.', es:'Rellena los globos con las frases correspondientes.', m:'irudia', o:90,
      it:['1. bineta (una clienta fuma leyendo el periódico; el camarero la avisa): «Aizu, hemen debekatuta dago erretzea.» · «Barkatu, zigarroa itzaliko dut.»','2. bineta (alguien con carteles habla con la camarera): «Posible da kartela eranstea?» · «Ez, ezin da erantsi.»'],
      sol:['Tabernaria: Aizu, hemen debekatuta dago erretzea. — Bezeroa: Barkatu, zigarroa itzaliko dut.','Bezeroa: Posible da kartela eranstea? — Tabernaria: Ez, ezin da erantsi.']}
  ],
  bad:{t:['Dena lurrera','Todo al suelo'],
    eu:'Azeituna-hezurrak, paperezko serbiletak, txotxak… Hau da kuxidadea! Izan ere, kaleak eta garbi-garbiak dauden herri batean, harrigarria egiten zaie zenbaiti tabernetako zoruak hain zikinak ikustea. Beste herrialde batzuetan gaizki ikusita dago horrelako gauzak erabili eta inongo erreparorik gabe lurrera botatzea, ez ordea Euskal Herrian.\n\nBehin baino gehiagotan ikusiko dugu turista dabilena alde guztietara begira, eskuan daukan erabilitako serbileta edo txotxa nora bota ez dakiela, zakarrontziaren bila. Arraro samarra egiten da hasieran, eta disimuluz botako duzu, erori izan balitzaizu bezala, baina lasai… Bota ezazu! Inork ez dizu ezer esango! Zertarako daude, bestela, erratzak?',
    es:'Huesos de aceituna, servilletas de papel, palillos… ¡Qué marranada! En efecto, a muchos les sorprende ver los suelos de los bares tan sucios en un lugar donde las calles y demás están tan limpias. En otros países está mal visto tirar ese tipo de cosas al suelo después de usarlas, pero no en Euskal Herria.\n\nMás de una vez veremos a un turista mirando a todas partes con una servilleta usada o un palillo en la mano, sin saber dónde echarlo, buscando el basurero. Al principio se hace un poco raro, y lo tirarás con disimulo, como si se te hubiese caído, pero ¡tranquilo/a! ¡Échalo! ¡Nadie te dirá nada! ¿Para qué están, si no, las escobas?'}
});

A2_OSTALARITZA.units.push({
  n:7, eu:'Bokadiloak', es:'Bocadillos', tomo:1, orr:93, pdf:'07-bokadiloak.pdf', off:0,
  helb:['Jan eta edanetan dauden aukerak jakinaraztea eta bezeroaren eskaera ulertzea.','Informar sobre la variedad de comidas y bebidas y entender lo que quiere el cliente.'],
  eg:['Koadrila bat paseoan ibili da arratsalde osoan. Orain berandu da eta taberna batean bokadilo batzuk afaldu nahi dituzte.','Una cuadrilla ha estado paseando durante toda la tarde. Ahora se ha hecho tarde y quieren cenar unos bocadillos en un bar.'],
  cd:10,
  dial:[
    ['Koadrilakoak','Eup!','¡Eup!'],
    ['Tabernaria','Kaixo! Zer behar duzue?','¡Hola! ¿Qué queréis?'],
    ['Koadrilakoa','Bokadilorik badaukazue?','¿Tenéis bocadillos?'],
    ['Tabernaria','Bai, hotzak eta beroak.','Sí, fríos y calientes.'],
    ['Koadrilakoa','Zer bokadilo dauzkazu?','¿De qué tenéis?'],
    ['Tabernaria','Hor daude, hormako kartelean: tortillak, solomoa, hirugiharra gaztarekin… Aukera handia dago.','Están ahí, en el cartel de la pared: tortillas, lomo, beicon con queso… Hay gran variedad.'],
    ['Koadrilakoa','Ea, itxaron pixka batean.','A ver, espera un momento.'],
    ['Tabernaria','Bai, lasai aukeratu eta esan.','Sí, tranquila, elegid y ya me diréis.'],
    ['Tabernaria','Aukeratu al duzue?','¿Habéis elegido?'],
    ['Koadrilakoa','Bai, ea ba, bat zainzuri-tortillarena, bat solomoarena eta beste bi urdaiazpikoarenak. Eta umeentzat bat patata-tortillarena, erdibituta.','Sí, a ver, uno de tortilla de espárragos, uno de lomo y otros dos de jamón. Y para los niños uno de tortilla de patatas, partido por la mitad.'],
    ['Tabernaria','Edateko?','¿Para beber?'],
    ['Koadrilakoa','Botila bat sagardo eta bi botila ur.','Una botella de sidra y dos botellas de agua.'],
    ['Tabernaria','Oso ondo, segituan ekarriko dizkizuet.','Muy bien, enseguida.']
  ],
  ar:[
    {k:'1', eu:'Lotu argazkiak eta hitzak.', es:'Une las fotos y las palabras.', m:'irudia', o:96,
      it:['Gazta','Hirugiharra','Solomoa','Zainzuria','Tortilla','Urdaiazpikoa','Sagardoa'],
      sol:['argazkia A','argazkia E','argazkia F','argazkia C','argazkia D','argazkia G','argazkia B']},
    {k:'2', eu:'Jar itzazu euskaraz hurrengo esaldiak.', es:'Pon en euskera las siguientes frases.', o:96,
      it:['¿Tenéis bocadillos?','Espera un poco.','Dos botellas de sidra.','Bocadillo de jamón.'],
      sol:['Bokadilorik badaukazue?','Itxaron pixka batean.','Bi botila sagardo.','Urdaiazpiko-bokadiloa.']},
    {k:'3', eu:'Elkarrizketa CDan entzuten duzun bitartean, marka itzazu gurutze batez koadrila honek eskatzen dituen gauzak.', es:'Mientras escuchas el diálogo en el CD, marca con una cruz lo que pide esta cuadrilla.', m:'cd', cdp:10, o:96,
      it:['Patata-tortilla bokadiloa','Freskagarriak','Ura','Urdaiazpiko-bokadiloak','Sagardoa','Ebakia','Solomo-bokadiloa','Hirugihar-bokadiloa','Zainzuri-tortilla bokadiloa'],
      sol:'Piden: patata-tortilla bokadiloa · ura · urdaiazpiko-bokadiloak · sagardoa · zainzuri-tortilla bokadiloa · solomo-bokadiloa.'},
    {k:'4', eu:'Lotu galderak eta erantzunak.', es:'Une las preguntas y las respuestas.', o:96,
      it:['Zer bokadilo da?','Patata-tortilla bokadilorik badaukazue?','Zer behar duzue edateko?','Tortilla hotza badago?'],
      op:['Ez, beroa dago.','Bai, badaukagu.','Edateko ura behar dugu.','Txorizo-tortilla bokadiloa da.'],
      sol:['Txorizo-tortilla bokadiloa da.','Bai, badaukagu.','Edateko ura behar dugu.','Ez, beroa dago.']},
    {k:'5', eu:'Lotu euskaraz eta erdaraz esanahi bera duten hitzak.', es:'Une las palabras que tienen el mismo significado en euskera y en castellano.', o:97,
      it:['Gazta','Xerra','Piperra','Ogia','Bejetala','Solomoa','Hotza','Beroa'],
      op:['Caliente','Queso','Lomo','Filete','Frío','Pimiento','Pan','Vegetal'],
      sol:['Queso','Filete','Pimiento','Pan','Vegetal','Lomo','Frío','Caliente']},
    {k:'6', eu:'Aurkitu letra-zopa honetan marrazkietako gauzen izenak.', es:'Encuentra en esta sopa de letras los nombres de las cosas de los dibujos (1 botella · 2 calamares · 3 pincho de tortilla · 4 pincho de chistorra).', m:'irudia', o:97,
      grid:['TEDANADISKD','TTRTILAXESI','ESXPARRATFB','FBDIREAOKEO','AOTISERUALE','ITKAFTAILOU','EILEIBOLAMA','BLALATARMAR','TAAFNSATARE','LETXUGARREI','HIRUGIHAEAT'],
      it:['1','2','3','4'], sol:['Botilla','Kalamar','Tortilla','Txistorra'],
      nota:'⚠ En la sopa de letras el libro usa «botilla» (en el resto del método, «botila») y «kalamar» (en los hiztegiak, «txibi»).'},
    {k:'7', eu:'Itzuli kartel hau.', es:'Traduce este cartel.', o:97,
      it:['BOCADILLOS FRÍOS: jamón · vegetal · york y queso · atún','BOCADILLOS CALIENTES: jamón y queso · tortilla de chorizo · tortilla de jamón · tortilla de espárragos · beicon y queso · lomo y pimientos'],
      sol:['BOKADILO HOTZAK: urdaiazpikoa · bejetala · york eta gazta · atuna','BOKADILO BEROAK: urdaiazpikoa eta gazta · txorizo-tortilla · urdaiazpiko-tortilla · esparrago-tortilla · hirugiharra eta gazta · solomoa eta piperrak']}
  ],
  az:[
    ['A','Bokadiloak · Bocadillos','<p>Dos maneras de pedir bocadillos, pinchos, etc.:</p><p>a. <b>BOKADILO BAT + INGREDIENTE + (ARENA / ARENAK)</b>: <b>Bokadilo bat urdaiazpiko(arena)</b> = un bocadillo de jamón · <b>Bi pintxo solomo(arenak)</b> = dos pinchos de lomo.</p><p>b. <b>INGREDIENTE + BOKADILOA</b>: <b>urdaiazpiko-bokadiloa</b> = bocadillo de jamón.</p>'],
    ['B','Tortillak · Las tortillas','<p><b>INGREDIENTE + TORTILLA</b>: <b>patata-tortilla</b> (tortilla de patatas) · <b>txorizo-tortilla</b> (tortilla de chorizo).</p>'],
    ['C','Botila bat ur · Una botella de agua','<p>Con un poco de cuidado con el orden: <b>RECIPIENTE + BEBIDA / LÍQUIDO</b> → <b>botila bat ur</b> (una botella de agua).</p>'],
    ['D','Otorduak · Las comidas','<ul><li>Goizean — <b>gosaria</b> (desayuno)</li><li>Eguerdian — <b>bazkaria</b> (comida)</li><li>Arratsaldean — <b>merienda / askaria</b> (merienda)</li><li>Gauean — <b>afaria</b> (cena)</li></ul><p>A veces, a media mañana, hacemos otra comida: <b>hamaiketakoa</b> (almuerzo).</p>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Afaldu','Cenar'],['Aukeratu','Elegir'],['Berotu','Calentar'],['Edan','Beber'],['Egon','Estar'],['Ekarri','Traer'],['Erdibitu','Dividir por la mitad'],['Esan','Decir'],['Ibili','Andar'],['Itxaron','Esperar'],['Moztu','Cortar']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Arrautz','Huevo'],['Atun','Atún'],['Begetala','Vegetal'],['Bokadilo; Otarteko','Bocadillo'],['Botila bat ur','Botella de agua'],['Freskagarri','Refresco'],['Ganba','Gamba'],['Gatz','Sal'],['Gazta','Queso'],['Hirugihar','Beicon'],['Kaxuela','Cazuela'],['Maionesa','Mahonesa'],['Moldeko ogi','Pan de molde'],['Ogi','Pan'],['Patata','Patata'],['Petxuga','Pechuga'],['Pintxo','Banderilla; pincho'],['Piper berde','Pimiento verde'],['Piper gorri','Pimiento rojo'],['Piper','Pimiento'],['Razio','Ración'],['Sagardo','Sidra'],['Solomo','Lomo'],['Tomate','Tomate'],['Tortilla','Tortilla'],['Txigortu; Tostatu','Tostado'],['Txibi','Calamar'],['Txistor','Chistorra'],['Urdaiazpiko gozo','Jamón York'],['Urdaiazpiko','Jamón'],['Xerra','Filete'],['Zainzuri','Espárrago']]],
    ['Besterik','Otros',[['Afari','Cena'],['Arratsalde','Tarde'],['Badaukagu','Ya tenemos'],['Badaukazu','Ya tienes'],['Badaukazue','Ya tenéis'],['Bero','Caliente'],['Daude','Están'],['Edalontzi','Vaso'],['Eguerdi','Mediodía'],['Erdibituta','Partido por la mitad'],['Gau','Noche'],['Goiz','Mañana'],['Gosari','Desayuno'],['Gutxi eginda','Poco hecho'],['Hamaiketako','Almuerzo'],['Hotz','Frío'],['Kartel','Cartel'],['Lasai','Tranquilo'],['Ondo eginda','Bien hecho'],['Ontzi','Recipiente'],['Osagai','Ingrediente'],['Otordu','Comida (en general)'],['Plater','Plato'],['Segituan','Enseguida'],['Serbileta','Servilleta']]]
  ],
  er:[
    {k:'A', eu:'Sartu gauza bakoitza dagokion koadroan (edariak / janariak).', es:'Introduce cada cosa en el cuadro que le corresponde (bebidas / comidas).', o:102,
      it:['urdaiazpikoa · sagardoa · txistorra · txakolina · ardoa · gazta · ura · patata-tortilla · piper gorriak · freskagarria · solomoa · xerrak · garagardoa · kalimotxoa · ganba-tortilla'],
      sol:'EDARIAK: sagardoa, txakolina, ardoa, ura, freskagarria, garagardoa, kalimotxoa · JANARIAK: urdaiazpikoa, txistorra, gazta, patata-tortilla, piper gorriak, solomoa, xerrak, ganba-tortilla.'},
    {k:'B', eu:'Lotu irudiak esaldien arabera.', es:'Une las imágenes de acuerdo a las frases.', m:'irudia', o:102,
      it:['Imanolek sagardoa nahi du.','Jonek gazta eta urdaiazpikoa nahi ditu.','Umeek txistor-bokadiloak nahi dituzte.','Amaiak bejetala nahi du.'],
      sol:['irudia 2 (botila)','irudia 4 (gazta eta urdaiazpikoa)','irudia 1 (bokadiloa)','irudia 3 (bejetala)']},
    {k:'C', eu:'Jarri erloju bakoitzaren ondoan zein otordu tokatzen den.', es:'Pon al lado de cada reloj qué comida toca a esa hora.', o:102,
      it:['11:00','13:30','17:00','21:00','08:00'],
      sol:['hamaiketakoa','bazkaria','merienda','afaria','gosaria']}
  ],
  bad:{t:['Bokadiloak','Bocadillos'],
    eu:'Oso gustura gabiltza, baina berandutu egin zaigu. Afaltzeko ordua da eta oraindik kalean gaude. Zer egin dezakegu? Bada, bokadilo batzuk jango ditugu nonbaiten! Zenbat aldiz entzun edo esan dugu esaldi hori? Izan ere, zaila izango da hemen adina bokadilo (eta hain onak!) jaten diren herririk aurkitzea.\n\nHerriko festetan ere errazago aurkituko dugu afaltzeko mahai bat koadrila osorako bokadiloak emango dizkigun taberna baino, gehienak ailegatu ezinik ibiltzen baitira.\n\nJanari azkarra da, tokatuz gero zutik egiteko modukoa, aurretik antolatu beharrik gabe egin daitekeen lagun arteko afaria edo bazkaria. Gainera, osagaiei dagokienez, gustu guztiak asetzeko modukoa da.\n\nNorbaitek esan dezake horrelakoetan beste aukera batzuk ere badaudela, azken urteotan ugaritu diren pizza edo hanburgesak, esate baterako. Baina ez dira berdinak; edo, zuk zer egingo zenuke urdaiazpiko-tortilla bokadiloa eta auskalo zerez egina dagoen hanburgesa ziztrin bat aukeran jarriko balizkizute?',
    es:'Andamos a gusto, pero se nos ha hecho tarde. Es la hora de cenar y todavía andamos en la calle. ¿Qué podemos hacer? ¡Comeremos unos bocadillos por ahí! ¿Cuántas veces has escuchado o dicho esta frase? Será difícil encontrar un pueblo donde se coman tantos bocadillos como aquí (¡y tan buenos!).\n\nTambién en las fiestas de pueblo nos será más fácil encontrar una mesa para cenar que un bar que nos prepare bocadillos para toda la cuadrilla, pues suelen andar todos sin dar abasto.\n\nEs una comida rápida, que se puede hacer de pie si es necesario, una comida entre amigos que no requiere organizarse de antemano. Además, en lo que respecta a los ingredientes, puede satisfacer todos los gustos.\n\nAlguien puede decir que para estas ocasiones hay otras opciones, como la pizza o las hamburguesas que se han extendido en estos últimos años. Pero no es lo mismo; ¿o tú qué harías si te pusiesen a elegir entre un bocadillo de tortilla de jamón y una hamburguesa que no se sabe de qué está hecha?'}
});

A2_OSTALARITZA.units.push({
  n:8, eu:'Gosaria', es:'Desayuno', tomo:1, orr:105, pdf:'08-gosaria.pdf', off:0,
  helb:['Gosaria eskatzen diotenean, ulertu eta zerbitzatzea.','Entender cuando se le pide el desayuno y servirlo.'],
  eg:['Goizeko zortzi eta erdiak dira. Ekaitz eta Igor trenetik jaitsi dira. Goseak daude eta gosaltzera joan dira.','Son las ocho y media de la mañana. Ekaitz e Igor han bajado del tren. Tienen hambre y han ido a desayunar.'],
  cd:11,
  dial:[
    ['Ekaitz','Egun on!','¡Buenos días!'],
    ['Tabernaria','Baita zuri ere!','¡Igualmente!'],
    ['Ekaitz','Gosaririk ematen al duzue?','¿Dais desayunos?'],
    ['Tabernaria','Nola ez! Zer nahi duzue?','¡Claro! ¿Qué queréis?'],
    ['Ekaitz','Nik kafesnea tostadekin, mantekila eta marmelada eta laranja-zumoa.','Yo café con leche con tostadas, mantequilla y mermelada y zumo de naranja.'],
    ['Igor','Nik… arrautza frijitu pare bat hirugiharrarekin eta kafesne bat, bero-beroa.','Yo… un par de huevos fritos con beicon y café con leche, bien caliente.'],
    ['Tabernaria','Ederki! Berehalaxe ekarriko dizuet.','¡Muy bien! Enseguida.'],
    ['Igor','Barkatu, egunkaririk ba al duzue?','Perdona, ¿tenéis periódicos?'],
    ['Tabernaria','Bai, hantxe dauzkazue, izkina hartan. Hartu nahi duzuena.','Sí, allí mismo los tenéis, en aquella esquina. Coged el que queráis.'],
    ['Igor','Eskerrik asko.','Gracias.']
  ],
  ar:[
    {k:'1', eu:'Elkarrizketa entzuten duzun bitartean, markatu zerrenda honetan zer eskatzen duten Igorrek eta Ekaitzek.', es:'Mientras escuchas el diálogo, marca en las 11 fotos lo que piden Igor y Ekaitz.', m:'cd', cdp:11, o:108,
      it:['Marca las fotos (1–11) de lo que piden.'],
      sol:'Fotos: 2 kafesnea · 5 arrautzak · 6 laranja-zumoa · 7 mantekila · 9 marmelada · 4 egunkaria.'},
    {k:'2', eu:'Euskaratu hitzok.', es:'Pon en euskera estas palabras.', o:108,
      it:['Café con leche y tostadas con mantequilla.','Zumo de naranja, galletas y chocolate.','Huevos fritos con jamón y café.'],
      sol:['Kafesnea eta tostadak mantekilarekin.','Laranja-zumoa, gailetak eta txokolatea.','Arrautza frijituak urdaiazpikoarekin eta kafea.']},
    {k:'3', eu:'Lotu izenak eta irudiak.', es:'Une los dibujos con sus nombres.', m:'irudia', o:108,
      it:['1. irudia','2. irudia','3. irudia','4. irudia'],
      op:['Egunkaria','Izkina','Gosaria','Opila'],
      sol:['Izkina','Gosaria','Opila','Egunkaria']},
    {k:'4', eu:'Lotu euskaraz eta erdaraz esanahi bera duten esaldiak.', es:'Une las frases que tienen el mismo significado en euskera y en castellano.', o:108,
      it:['El café está aquí.','El periódico está allí.','Las tostadas están ahí.'],
      op:['Tostadak hor daude.','Kafea hemen dago.','Egunkaria han dago.'],
      sol:['Kafea hemen dago.','Egunkaria han dago.','Tostadak hor daude.']},
    {k:'5', eu:'Idatz itzazu esaldiak ereduaren arabera: Tostadak + mantekila → Tostadak mantekilarekin · Kafesnea + tostadak → Kafesnea tostadekin.', es:'Escribe las frases siguiendo el ejemplo.', o:109,
      it:['Esnea + txokolatea','Arrautzak + txistorra','Esnea + gailetak','Kafea + madalenak'],
      sol:['Esnea txokolatearekin','Arrautzak txistorrarekin','Esnea gailetekin','Kafea madalenekin'],
      nota:'⚠ El solucionario del libro pone «Kafesnea gailetekin» en el 3; con el enunciado («Esnea + gailetak») es «Esnea gailetekin».'},
    {k:'6', eu:'Ordenatu elkarrizketa zenbakien bidez.', es:'Ordena el diálogo numerando cada frase.', o:109,
      it:['Egun on!','Oso ondo, segituan ekarriko dizut.','Laranja-zumoa, kafea eta kruasan bat.','Baita zuri ere!','Zer nahi duzu?'],
      sol:['1','5','4','2','3']},
    {k:'7', eu:'Idatz ezazu zer gosaldu duen pertsonaia bakoitzak.', es:'Escribe qué ha desayunado cada personaje (mira las fotos).', m:'irudia', o:109,
      it:['Imanolek …','Anek …','Oierrek …'],
      sol:['Imanolek laranja-zumoa, kafea eta kruasana.','Anek esnea, tostadak eta marmelada.','Oierrek kafesnea, arrautzak eta fruta.']}
  ],
  az:[
    ['A','«Bero-beroa», «goxo-goxoa» · «Muy caliente», «muy bueno»','<p>Para decir que algo está muy bueno, muy caliente, etc., <b>se repite la cualidad</b>:</p><ul><li>Oso goxoa dago → <b>goxo-goxoa dago</b> (está muy bueno)</li><li>Oso handia da → <b>handi-handia da</b> (es muy grande)</li></ul><p>La primera palabra no lleva la «-a» y entre las dos va un guion.</p>'],
    ['B','Zerekin? · ¿Con qué?','<p>La compañía se expresa con <b>-(r)ekin</b>. Recuerda lo que pide Ekaitz: «kafesnea tostad<b>ekin</b>».</p><ul><li>Plural: kafea + tostadak = <b>kafea tostadekin</b> (tostada + ekin)</li><li>Singular: kafea + azukrea = <b>kafea azukrearekin</b> (azukrea + rekin)</li></ul>'],
    ['C','Kokapena · Ubicación','<p>Para la ubicación se usa el caso <b>NON</b>. De momento, algunas palabras:</p><p>a. <b>hemen</b> aquí · <b>hor</b> ahí · <b>han</b> allí — <b>hementxe · hortxe · hantxe</b> aquí / ahí / allí mismo.<br><i>Non dago egunkaria?</i> — <b>Han dago</b> (está allí) · <b>Hantxe dago</b> (está allí mismo).</p><p>b. <b>honetan</b> en este/a · <b>horretan</b> en ese/a · <b>hartan</b> en aquel / aquella.<br><b>Izkina hartan dago</b> (en aquella esquina) · <b>Mahai horretan dago</b> (en esa mesa) · <b>Aulki honetan dago</b> (en esta silla).</p><p>El orden es distinto al castellano: en este cajón → <b>kajoi honetan</b> («cajón en este»).</p>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Afaldu','Cenar'],['Bazkaldu','Comer'],['Berotu','Calentar'],['Ekarri','Traer'],['Eman','Dar'],['Frijitu','Freír'],['Gosaldu','Desayunar'],['Hartu','Coger'],['Hoztu','Enfriar'],['Jaitsi','Bajar'],['Utzi','Dejar']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Arrautza','Huevo'],['Azukre','Azúcar'],['Esne','Leche'],['Ezti','Miel'],['Fruta','Fruta'],['Gaileta','Galleta'],['Gurin; Mantekila','Mantequilla'],['Hirugihar','Beicon'],['Jogurta','Yogur'],['Kafesne','Café con leche'],['Kaputxino','Capuchino'],['Karajilo','Carajillo'],['Kruasan','Cruasán'],['Marmelada','Mermelada'],['Ogi txigortu','Pan tostado'],['Ogi-xerra','Rebanada de pan'],['Opil','Bollo'],['Pastel','Pastel'],['Te','Té'],['Tostada','Tostada'],['Txistor','Chistorra'],['Txokolate','Chocolate'],['Urdaiazpiko','Jamón'],['Zereal','Cereal'],['Zumo; Zuku','Zumo']]],
    ['Besterik','Otros',[['Afari','Cena'],['Aldizkari','Revista'],['Aulki','Silla'],['Bazkari','Almuerzo'],['Berehalaxe','Ahora mismo; enseguida'],['Dago','Está'],['Daude','Están'],['Daukazu; Duzu','Tienes'],['Dauzkazue; Duzue','Tenéis'],['Egarri','Sed'],['Egunkari','Periódico'],['Ekarriko dizut / dizuet','Te / os lo traeré'],['Ematen al duzue','¿Dais?'],['Epel','Tibio'],['Gosari','Desayuno'],['Gose','Hambre'],['Goseak daude','Tienen hambre'],['Izkina','Esquina'],['Mahai','Mesa'],['Merienda; Askari','Merienda'],['Nahi duzuena','El / la / lo que queráis'],['Non','Dónde'],['Pare bat','Un par'],['Plater','Plato'],['Txoko','Rincón'],['Zer nahi duzu / duzue','Qué quieres / quieren'],['Zerekin','Con qué']]]
  ],
  er:[
    {k:'A', eu:'Euskara ezazu hurrengo elkarrizketa.', es:'Pon en euskera el siguiente diálogo.', o:114,
      it:['¡Buenos días!','¡Igualmente!','¿Qué quieres?','Un zumo de naranja, un café y dos tostadas.','¿Quieres mantequilla y mermelada?','No.','Vale, enseguida.','Toma, aquí tienes.','Gracias.'],
      sol:['Egun on!','Baita zuri ere! / Berdin!','Zer nahi duzu?','Laranja-zumo bat, kafe bat eta bi tostada.','Mantekila eta marmelada nahi duzu?','Ez.','Bale, segituan / berehala.','Hartu / Tori, hemen duzu / daukazu.','Eskerrik asko.']},
    {k:'B', eu:'Lotu irudiak eta esaldiak.', es:'Une las imágenes y las frases.', m:'irudia', o:114,
      it:['Egunkaria mahai honetan dago.','Tostadak plater horretan daude.','Zumoa edalontzi honetan daukazu.','Opilak izkina hartan daude.'],
      sol:['argazkia 1','argazkia 2','argazkia 3','argazkia 4']},
    {k:'C', eu:'Esan beste era batean.', es:'Dilo de otra manera.', o:114,
      it:['Zumoa oso hotza dago.','Opila goxo-goxoa dago.','Kafesnea oso beroa dago.'],
      sol:['Zumoa hotz-hotza dago.','Opila oso goxoa dago.','Kafesnea bero-beroa dago.']},
    {k:'D', eu:'Lotu euskaraz eta erdaraz esanahi bera duten hitzak.', es:'Une las palabras que tienen el mismo significado en euskera y en castellano.', o:114,
      it:['Huevos con jamón','Leche con chocolate','Café con leche con galletas','Tostadas con mermelada'],
      op:['Tostadak marmeladarekin','Arrautzak urdaiazpikoarekin','Esnea txokolatearekin','Kafesnea gailetekin'],
      sol:['Arrautzak urdaiazpikoarekin','Esnea txokolatearekin','Kafesnea gailetekin','Tostadak marmeladarekin']}
  ],
  bad:{t:['Gosaria','Desayuno'],
    eu:'«Gosari txikia», «gosaria», «hamaiketakoa»… Zenbat aldiz jan dezakegun goiz batean! Seguru asko ezagutuko duzu «gosari amerikarra» delakoa, ezta? Eta «gosari euskalduna»? Ez hainbeste, ezta? Egia esan, bat baino gehiago dago, eta, gainera, denboraren poderioz aldatzen joan da.\n\nHasteko, bereizketa egin behar dugu. Garai batean, goizean jaikitakoan egiten zen otorduari «gosari txikia» deitzen zitzaion, eta bestea, «gosaria», geroago egiten zen, goizerdian.\n\nGosari txikia, orain leku askotan egiten denaren antzekoa bada ere (kafesnea, tostadak, Cola Caoa, etab.), lehen ezberdina zen. Lehen ohikoa zen talo-zopak edo esne-zopak (ogia esnetan beratuta) jatea.\n\nGosaria edo «hamaiketakoa» goizerdian indarberritzeko egiten dena da. Lan gogorra egiten aritu bagara, bokadiloa edo plater kozinaturen bat izan daiteke; bulegoan eserita mugitu gabe egonez gero, ebaki bat eta aurrera!',
    es:'«Mini desayuno», «desayuno», «hamaiketako»… ¡Cuántas veces podemos comer en una mañana! Seguro que conoces el «desayuno americano», ¿no? ¿Y el «desayuno vasco»? No tanto, ¿verdad? La verdad es que hay más de uno y, además, con el paso del tiempo ha ido cambiando.\n\nPara empezar debemos hacer una distinción. Al desayuno que se tomaba al levantarse se le llamaba «gosari txikia», y el otro, el «desayuno» o «hamaiketako», era el que se hacía más tarde, a media mañana. Aunque ahora el «gosari txikia» es parecido al que se hace en muchos lugares (café con leche, tostadas, Cola Cao, etc.), antes era diferente: era costumbre tomar sopas de talo o de leche (pan remojado en leche).\n\nEl desayuno o «hamaiketako» es el que hacemos a media mañana para reponer fuerzas. Si hemos estado haciendo un trabajo duro, puede ser un bocadillo o un plato cocinado; pero si hemos estado sentados/as en la oficina sin movernos, ¡un cortado y va que chuta!'}
});

A2_OSTALARITZA.units.push({
  n:9, eu:'Gozokiak', es:'Golosinas', tomo:1, orr:117, pdf:'09-gozokiak.pdf', off:0,
  helb:['Umeei gozokiak erostera joaten direnean ulertzea.','Entender a los niños cuando van a comprar golosinas.'],
  eg:['Ane, Maider eta Iraitz plazan daude. Gozokiak erostera joan dira.','Ane, Maider e Iraitz están en la plaza. Han ido a comprar chucherías.'],
  cd:12,
  dial:[
    ['Saltzailea','Ea umeak, txintxo, e? Zer nahi duzue?','A ver, niños, formales, ¿eh? ¿Qué queréis?'],
    ['Ane','Gozokiak!','¡Golosinas!'],
    ['Maider','Nik gusanitoak eta… zizareak.','Yo gusanitos y… lombrices.'],
    ['Saltzailea','Gusanitoak eta, zenbat zizare?','Gusanitos y ¿cuántas lombrices?'],
    ['Maider','Hogeita hamar zentimo dauzkat, zenbat erosteko ailegatzen zait?','Tengo treinta céntimos, ¿para cuántas me llega?'],
    ['Saltzailea','Bi zizare, tori. Eta zuk?','Dos lombrices, toma. ¿Y tú?'],
    ['Ane','Nik pipak eta txupa txupsa, pikapikaduna. Eta meloi bat.','Yo pipas y chupa chups con picapica. Y un melón.'],
    ['Iraitz','Nik hiru behatz eta kantinplora gorria.','Yo tres dedos y una cantimplora roja.'],
    ['Saltzailea','Hemen dauzkazue pipak, gusanitoak, zizareak, behatzak, kantinplora eta txupa txupsa. Eta txikle hauek, opari! Menta ala marrubizkoak?','Aquí tenéis las pipas, los gusanitos, las lombrices, los dedos, la cantimplora y el chupa chups. Y estos chicles, de regalo. ¿Los queréis de menta o de fresa?'],
    ['Ane','Nik mentazkoak!','¡Yo de menta!'],
    ['Maider','Eta nik marrubizkoa!','Y yo de fresa.'],
    ['Iraitz','Nik ez dut nahi, oso pikantea da!','Yo no quiero, me pican.'],
    ['Saltzailea','Zuretzat orduan, erregaliz bat. Tori, ba! Eta txintxo ibili!','Entonces para ti un regaliz. ¡Tomad, y sed formales!'],
    ['Umeak','Bai, eskerrik asko!','Sí, gracias.']
  ],
  ar:[
    {k:'1', eu:'Elkarrizketa irakurri eta markatu pertsonaia bakoitzak zer eskatzen duen.', es:'Lee el diálogo y marca qué pide cada uno de los personajes (pipak · zizareak · gusanitoak · behatzak · txupa txupsa · meloia · kantinplora gorria · txiklea).', o:120,
      it:['Maider','Ane','Iraitz'],
      sol:['gusanitoak, zizareak','pipak, txupa txupsa, meloia','behatzak, kantinplora gorria']},
    {k:'2', eu:'Lotu irudiak eta hitzak.', es:'Une las palabras y las imágenes.', m:'irudia', o:120,
      it:['Txupa txupsak','Zizareak','Kantinplora','Meloiak','Gusanitoak'],
      sol:['argazkia 5','argazkia 2','argazkia 1','argazkia 3','argazkia 4']},
    {k:'3', eu:'Euskaratu esaldiok (lagungarri izango zaizu CDaren elkarrizketa).', es:'Pon en euskera estas frases (te servirá de ayuda el diálogo del CD).', m:'cd', cdp:12, o:120,
      it:['Quiero un chicle.','¿Me llega?','Tengo cincuenta céntimos. ¿Para cuántos me llega?','¿Cuántos chupa chups quieres?'],
      sol:['Txikle bat nahi dut.','Ailegatzen zait?','Berrogeita hamar zentimo dauzkat. Zenbat erosteko ailegatzen zait?','Zenbat txupa txups nahi duzu?']},
    {k:'4', eu:'Lotu euskaraz eta erdaraz esanahi bera duten hitzak.', es:'Une las palabras que tienen el mismo significado.', o:121,
      it:['Zorroa','Arrautza sorpresaduna','Palmera handia','Gozoki gorriak','Behatz pikapikadunak'],
      op:['Gominolas rojas','Dedos picantes','Bolsa','Huevo con sorpresa','Palmera grande'],
      sol:['Bolsa','Huevo con sorpresa','Palmera grande','Gominolas rojas','Dedos picantes']},
    {k:'5', eu:'Idatzi zein koloretakoak diren gozoki hauek.', es:'Escribe de qué color son estas gominolas.', m:'irudia', o:121,
      it:['a','b','c','d','e'], sol:['Gorria','Berdea','Horia','Urdina','Arrosa']},
    {k:'6', eu:'Osatu esaldiak marrazkiei begiratuta.', es:'Completa las frases mirando los dibujos.', m:'irudia', o:121,
      it:['Janirek … nahi ditu.','Jonek … nahi ditu.','Julenek … nahi ditu.'],
      sol:['Janirek gominolak eta piruleta nahi ditu.','Jonek izozkia eta txikleak nahi ditu.','Julenek patatak eta erregaliza nahi ditu.']}
  ],
  az:[
    ['A','Koloreak · Los colores','<p><b>urdina</b> azul · <b>laranja</b> naranja · <b>gorria</b> rojo · <b>berdea</b> verde · <b>horia</b> amarillo · <b>arrosa</b> rosa · <b>morea</b> morado · <b>beltza</b> negro</p>'],
    ['B','«Marraduna», «sorpresaduna» · «De rayas», «con sorpresa»','<p><b>CARACTERÍSTICA + DUN + OBJETO</b>:</p><ul><li>marra + dun + gozokia → <b>marradun gozokia</b> (caramelo de rayas)</li><li>sorpresa + dun + arrautza → <b>sorpresadun arrautza</b> (huevo con sorpresa)</li></ul>'],
    ['C','Zerezkoa? · ¿De qué?','<p>Repaso de una estructura muy usada con las golosinas: <b>MATERIAL / INGREDIENTE + (E)ZKO + OBJETO</b>.</p><ul><li>goma + zko + gozokia → <b>gomazko gozokia</b> (caramelo de goma)</li><li><b>marrubizko izozkia</b> (helado de fresa) · <b>mentazko txiklea</b> (chicle de menta)</li></ul><p>Se usa con materiales y con sabores.</p>'],
    ['D','Zenbat erosteko ailegatzen zait? · ¿Para cuánto me llega?','<p>Una pregunta muy de niños:</p><ul><li><b>Zenbat gozoki erosteko ailegatzen zait / zaigu?</b> — ¿Para cuántos caramelos me / nos llega?</li><li><b>Hiru gozoki erosteko ailegatzen zaizu / zaizue.</b> — Te / os llega para tres caramelos.</li></ul>'],
    ['E','Ordenari buruz · Sobre el orden','<p><b>NÚMERO + OBJETO + ADJETIVO</b>: <b>lau txikle gorri</b> (cuatro chicles rojos). Con número, el nombre no lleva la «-a».</p><p>Cuidado con <b>bat</b>, que va al final: <b>hiru mentazko gominola</b> (tres gominolas de menta), pero <b>mentazko gominola bat</b> (una gominola de menta).</p>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Ailegatu','Llegar; alcanzar'],['Erosi','Comprar'],['Gustatu','Gustar'],['Ibili','Andar'],['Oparitu','Regalar'],['Min egon / izan','Picar']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Arrautza','Huevo'],['Behatz','Dedo'],['Bihotz','Corazón'],['Bolatxo','Bolita'],['Bonboi','Bombón'],['Edateko','Bebida'],['Gozoki','Golosina; caramelo; gominola'],['Gusanito','Gusanito'],['Jateko diru','Dinero comestible'],['Marrubi','Fresa'],['Opil','Bollo'],['Palmera','Palmera'],['Palomita','Palomita'],['Patata','Patata'],['Pikapika','Picapica'],['Piruleta','Piruleta'],['Txikle','Chicle'],['Txokolate','Chocolate'],['Txupa txups','Chupa chups'],['Zizare','Lombriz']]],
    ['Koloreak eta formak','Colores y formas',[['Arrosa','Rosado'],['Berde','Verde'],['Bigun','Blando'],['Borobil','Redondo'],['Gogor','Duro'],['Gorri','Rojo'],['Handi','Grande'],['Laranja','Naranja'],['Luze','Largo'],['More','Morado'],['Txiki','Pequeño'],['Txuri','Blanco'],['Urdin','Azul']]],
    ['Besterik','Otros',[['Daukat','Tengo'],['Daukazu / daukazue','Tienes / tenéis'],['Globo; Puxika','Globo'],['Kromo','Cromo'],['Marra','Raya'],['Opari','Regalo'],['Osagarri','Ingrediente'],['Prezio; Salneurri','Precio'],['Sorpresa','Sorpresa'],['Txintxo','Formal'],['Zenbat','Cuántos']]]
  ],
  er:[
    {k:'A', eu:'Lotu irudiak eta esaldiak.', es:'Une los dibujos y las frases.', m:'irudia', o:126,
      it:['Mentazko txiklea','Marrubizko txupa txupsa','Zizare gorria','Patata-zorroa','Txokolatezko arrautza'],
      sol:['marrazkia 4','marrazkia 3','marrazkia 5','marrazkia 1','marrazkia 2']},
    {k:'B', eu:'Atera kontuak! (Letraz idatzi.) Prezioak, unitateko: gominolak 5 zentimo · zizareak 10 · txikleak 15 · arrautzak 60.', es:'¡Saca las cuentas! (Escribe con letras.) Precios por unidad.', o:126,
      it:['Hiru zizare, arrautza bat eta txikle bat','Bi arrautza, bi txikle eta gominola bat','Lau txikle eta zizare bat'],
      sol:['Euro bat eta bost zentimo. (1,05 €)','Euro bat eta berrogeita hamabost zentimo. (1,55 €)','Hirurogeita hamar zentimo. (0,70 €)']},
    {k:'C', eu:'Euskara ezazu elkarrizketa hau.', es:'Pon en euskera este diálogo.', o:126,
      it:['Saltzailea: ¡Hola, Ane! ¿Qué quieres?','Ane: Dos corazones de fresa y patatas. ¿Me llega?','Saltzailea: A ver, son treinta y cinco céntimos.','Ane: Sí, me llega.','Saltzailea: Muy bien, toma.','Ane: Gracias.'],
      sol:['Kaixo, Ane! Zer nahi duzu?','Bi marrubizko bihotz eta patatak. Ailegatzen zait?','Ea, hogeita hamabost zentimo dira.','Bai, ailegatzen zait.','Oso ondo! Tori.','Eskerrik asko.']}
  ],
  bad:{t:['Gura dot / nahi det','«Quiero»'],
    eu:'«Nahi dut», «gura dot», «nahi det»… ai ama! Honez gero konturatuko zinenez, gauza bat esateko era bat baino gehiago dago. Izan ere, beste hizkuntza askorekin gertatzen den bezala, gurea ere aldatu egiten da tokiaren arabera. Goierrikoek ez dute kostaldekoek bezala hitz egiten, ezta Nafarroakoek edo Gernikakoek ere, aldaera edo dialekto asko baititu gure hizkuntzak.\n\nHau oso aberasgarria den arren, nahasmena sortzen du batzuetan. Hori dela eta, 1968. urtean, denok ulertzeko moduko euskara bateratua sortzea erabaki zen: euskara batua. Hauxe erabiltzen da komunikabideetan, erakunde ofizialetan, eskolan, etab. eta bera da hemen landuko duguna, zeren aldaera guztiak aztertzea nekosoegia izango litzateke. Baina, lasai, euskara batua ikasiz gero, borondate pixka batez, segituan hartuko dituzu bizi zaren lekuko euskararen ezaugarriak.',
    es:'«Nahi dut», «gura dot», «nahi det»… ¡ay, madre! Como ya te habrás dado cuenta, hay más de una forma de decir cada cosa. Al igual que sucede con muchas otras lenguas, la nuestra también cambia según el lugar. Los del Goierri no hablan igual que los de la costa, ni tampoco los de Nafarroa ni los de Gernika, pues nuestra lengua tiene muchas variantes o dialectos.\n\nEsto, a pesar de ser muy enriquecedor, da lugar a confusiones y por eso, en el año 1968, se decidió crear una lengua unificada que pudiésemos entender todos: el euskera batua. Es el que se utiliza en los medios de comunicación, las entidades oficiales, la escuela, etc., y es el que utilizaremos aquí, ya que sería demasiado complicado analizar todas las variantes. De todas maneras, tranquilo/a: si aprendes este, con un poco de voluntad enseguida cogerás las características del euskera del lugar donde vives.'}
});

A2_OSTALARITZA.units.push({
  n:10, eu:'Itxiera', es:'Cierre', tomo:1, orr:129, pdf:'10-itxiera.pdf', off:0,
  helb:['Bezeroei taberna ixteko garaia iritsi dela adieraztea.','Informar a los clientes de que ha llegado la hora de cerrar el bar.'],
  eg:['Goizeko ordu biak dira. Oraindik tabernan koadrila bat dago, baina tabernariak itxi egin nahi du.','Son las dos de la mañana. Todavía hay una cuadrilla en el bar, pero la camarera quiere cerrar.'],
  cd:13,
  oh:['⚠ Errata del libro corregida en el hiztegia: da «Irten = Entrar» y «Sartu = Salir»; es al revés (irten = salir, sartu = entrar).'],
  dial:[
    ['Tabernaria','Mesedez, edariak bukatu, ixteko garaia da eta.','Por favor, id terminando las bebidas, que es hora de cerrar.'],
    ['Neska 1','Ixteko garaia? Zer ordu da, ba?','¿La hora de cerrar? ¿Qué hora es, pues?'],
    ['Tabernaria','Goizeko ordu biak dira.','Son las dos de la mañana.'],
    ['Neska 2','Ordu biak? Oraindik goiz da!','¿Las dos? ¡Todavía es pronto!'],
    ['Tabernaria','Goiz? Goizeko 9etatik nago hemen, eta, gainera, badakizue… legeak ordu bietan ixteko esaten du.','¿Pronto? Estoy aquí desde las nueve de la mañana y, además, ya sabéis… la ley dice que hay que cerrar a las dos.'],
    ['Mutila','Beno, baina edariak bukatu behar ditugu.','Bueno, pero tenemos que terminar los tragos.'],
    ['Tabernaria','Bale, bale. Nik atea itxi eta musika itzali behar dut.','Vale, vale. Yo, de momento, cierro la puerta y apago la música.'],
    ['Neska 1','Konforme!','¡Conforme!'],
    ['Neska 1','Beno, bagoaz.','Bueno, nos vamos.'],
    ['Mutila','Bai, erretiratzeko garaia da eta.','Sí, que ya es hora de retirarse.'],
    ['Tabernaria','Eskerrik asko eta barkatu, baina…','Gracias, y lo siento, pero…'],
    ['Neska 1','Lasai, lasai. Gabon pasa eta bihar arte.','Tranquila, tranquila. Que pases buena noche, hasta mañana.'],
    ['Neska 2','Agur!','¡Adiós!'],
    ['Mutila','Bihar arte!','¡Hasta mañana!'],
    ['Tabernaria','Bihar arte, bai.','Sí, hasta mañana.']
  ],
  ar:[
    {k:'1', eu:'Entzun elkarrizketa eta saiatu galdera hauei erantzuten.', es:'Escucha el diálogo y trata de responder a estas preguntas.', m:'cd', cdp:13, o:132,
      it:['Zer ordu da?','Zer ordutan ixten da taberna?','Zer da, goiz ala berandu?'],
      sol:['Goizeko ordu biak dira.','Ordu bietan.','Berandu da.']},
    {k:'2', eu:'Idatzi zer ordu den erloju bakoitzean.', es:'Escribe qué hora es en cada reloj.', m:'irudia', o:132,
      it:['1. erlojua','2. erlojua','3. erlojua','4. erlojua','5. erlojua','6. erlojua','7. erlojua','8. erlojua'],
      sol:['Laurak eta bost. (4:05)','Seiak eta hamar. (6:10)','Zazpiak eta laurden. (7:15)','Bostak bost gutxi. (4:55)','Bederatzi eta erdiak. (9:30)','Hamabiak laurden gutxi. (11:45)','Hamaikak eta hogei. (11:20)','Ordu bata hogeita bost gutxi. (12:35)']},
    {k:'3', eu:'Euskaratu esaldiok.', es:'Pon en euskera estas frases.', o:132,
      it:['Es hora de cerrar.','Son las cinco de la tarde.','Es hora de abrir.','A las tres de la mañana.'],
      sol:['Ixteko ordua da.','Arratsaldeko bostak dira.','Irekitzeko ordua da.','Goizeko hiruretan.']},
    {k:'4', eu:'Idatzi esaldiak ereduaren arabera: itxi + ordua → Ixteko ordua.', es:'Escribe las frases según el ejemplo.', o:132,
      it:['bazkaldu + garaia','irten + ordua','musika kendu + ordua'],
      sol:['Bazkaltzeko garaia.','Irteteko ordua.','Musika kentzeko ordua.'],
      nota:'⚠ El solucionario pone «Irtetzeko ordua»; en batua es «irteteko» (irten → irte-teko).'},
    {k:'5', eu:'Idatzi letraz ordutegi hauek (08:00-14:00 → Zortzietatik ordu bietara).', es:'Escribe con letras estos horarios.', o:133,
      it:['12:15-17:30','13:00-21:00','15:00-02:00','09:00-24:00'],
      sol:['Hamabiak eta laurdenetatik bost eta erdietara.','Ordu batetik bederatzietara.','Hiruretatik ordu bietara.','Bederatzietatik hamabietara.'],
      nota:'⚠ El solucionario pone «Ordu batetatik»; la forma de batua es «ordu batetik» (bat es singular: batean, batetik, batera).'},
    {k:'6', eu:'Lotu zerikusia duten esaldiak.', es:'Une las frases que estén relacionadas.', o:133,
      it:['Gosaltzeko garaia','Afaltzeko garaia','Bazkaltzeko garaia','Hamaiketakoa egiteko garaia','Meriendatzeko garaia'],
      op:['Arratsaldeko bost eta erdiak','Goizeko hamaika eta erdiak','Eguerdiko ordu bata','Gaueko bederatziak','Goizeko zortziak'],
      sol:['Goizeko zortziak','Gaueko bederatziak','Eguerdiko ordu bata','Goizeko hamaika eta erdiak','Arratsaldeko bost eta erdiak']},
    {k:'7', eu:'Lotu globoak eta pertsonaiak.', es:'Une los globos con los personajes (un cliente sentado y el camarero).', m:'irudia', o:133,
      it:['Barkatu, ixteko ordua da.','Goizeko hirurak.','Zer ordu da?'],
      sol:['tabernaria','tabernaria','bezeroa']},
    {k:'8', eu:'Euskaratu hurrengo elkarrizketa.', es:'Pon en euskera el siguiente diálogo.', o:133,
      it:['Cliente: ¿Qué hora es?','Camarera: Son las dos y media de la mañana.','Cliente: Es tarde, es la hora de ir a casa.','Camarera: Sí, es hora de cerrar.','Cliente: Bueno, hasta mañana.','Camarera: Sí, buenas noches y hasta mañana.'],
      sol:['Zer ordu da?','Goizeko ordu bi eta erdiak dira.','Berandu da, etxera joateko ordua da.','Bai, ixteko ordua da.','Beno, bihar arte.','Bai, gabon eta bihar arte.']}
  ],
  az:[
    ['—','-T(Z)EKO garaia / ordua · «Hora de…»','<p><b>VERBO + -T(Z)EKO + ORDUA / GARAIA</b>: itxi + t(z)eko + ordua = <b>ixteko ordua</b> (hora de cerrar).</p><p><b>Irekitzeko garaia da.</b> Es hora de abrir. · <b>Erretiratzeko ordua da.</b> Es hora de retirarse.</p>'],
    ['A','Zer ordu da? · ¿Qué hora es?','<p>01:00 ordu bata · 01:05 ordu bata eta bost · 02:00 ordu biak · 02:10 ordu biak eta hamar · 03:00 hirurak · 03:15 hirurak eta laurden · 04:00 laurak · 04:20 laurak eta hogei · 05:00 bostak · 05:25 bostak eta hogeita bost · 06:00 seiak · 06:30 sei eta erdiak · 07:00 zazpiak · 06:35 zazpiak hogeita bost gutxi · 08:00 zortziak · 07:40 zortziak hogei gutxi · 09:00 bederatziak · 08:45 bederatziak laurden gutxi · 10:00 hamarrak · 09:50 hamarrak hamar gutxi · 11:00 hamaikak · 10:55 hamaikak bost gutxi · 12:00 hamabiak</p><p>Delante de la hora: <b>goizeko</b> (de la mañana), <b>arratsaldeko</b> (de la tarde), <b>gaueko</b> (de la noche)… — 10:30 <b>Goizeko hamar eta erdiak dira.</b> · 22:30 <b>Gaueko hamar eta erdiak dira.</b></p>'],
    ['B','Zer ordutan? · ¿A qué hora?','<p>01:00 ordu batean · 01:05 ordu bata eta bostean · 02:00 ordu bietan · 02:10 ordu biak eta hamarrean · 03:00 hiruretan · 03:15 hirurak eta laurdenetan · 04:00 lauretan · 04:20 laurak eta hogeian · 05:00 bostetan · 05:25 bostak eta hogeita bostean · 06:00 seietan · 06:30 sei eta erdietan · 07:00 zazpietan · 06:35 zazpiak hogeita bost gutxitan · 08:00 zortzietan · 07:40 zortziak hogei gutxitan · 09:00 bederatzietan · 08:45 bederatziak laurden gutxitan · 10:00 hamarretan · 09:50 hamarrak hamar gutxitan · 11:00 hamaiketan · 10:55 hamaikak bost gutxitan · 12:00 hamabietan</p><p><b>Zer ordutan ixten da?</b> (12:00) <b>Hamabietan ixten da.</b> — ¿A qué hora cierra? Cierra a las doce.</p>'],
    ['C','Zein ordutatik zein ordutara? · ¿De qué hora a qué hora?','<p>Basta con añadir <b>-etatik</b> y <b>-etara</b>:</p><ul><li>09:00–14:00 → <b>Bederatzietatik ordu bietara.</b> De nueve a dos.</li><li>12:30–06:15 → <b>Hamabi eta erdietatik seiak eta laurdenetara.</b> De doce y media a seis y cuarto.</li></ul>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Afaldu','Cenar'],['Barkatu','Perdonar'],['Bazkaldu','Comer'],['Bukatu','Terminar'],['Edan','Beber'],['Erretiratu','Retirarse'],['Esan','Decir'],['Etorri','Venir'],['Gosaldu','Desayunar'],['Hasi','Empezar'],['Ireki','Abrir'],['Irten','Salir'],['Itxi','Cerrar'],['Joan','Ir'],['Pasatu','Pasar'],['Sartu','Entrar']]],
    ['Besterik','Otros',[['Berandu','Tarde'],['Eragozpen','Molestia'],['Etxera','A casa'],['Gainera','Además'],['Goiz','Pronto; temprano'],['Lege','Ley'],['Mesedez','Por favor'],['Oraindik','Todavía']]]
  ],
  er:[
    {k:'A', eu:'Idatzi erloju bakoitzaren azpian eguneko zein garaitakoa den ordua: goizekoa, eguerdikoa, arratsaldekoa ala gauekoa.', es:'Escribe debajo de cada reloj a qué parte del día corresponde la hora.', o:138,
      it:['07:00','11:00','16:00','21:00','13:00'],
      sol:['goizekoa','goizekoa','arratsaldekoa','gauekoa','eguerdikoa']},
    {k:'B', eu:'Elkarrizketa entzun bitartean, saiatu hutsuneak betetzen.', es:'Mientras escuchas el diálogo, trata de rellenar los espacios.', m:'cd', cdp:13, o:138,
      it:['Tabernaria: Mesedez, edariak bukatu, … eta.','Neska 1: Ixteko garaia? …, ba?','Tabernaria: … dira.','Tabernaria: …? Goizeko 9etatik nago hemen, eta, gainera, badakizue… legeak … ixteko esaten du.','Tabernaria: Bale, bale. Nik atea … eta musika … behar dut.','Mutila: Bai, … da eta.'],
      sol:['ixteko garaia da','Zer ordu da','Goizeko ordu biak','Goiz? … ordu bietan','itxi … itzali','erretiratzeko garaia']},
    {k:'C', eu:'Idatzi letraz zenbakiz dagoena.', es:'Escribe con letras lo que está escrito con números.', o:138,
      it:['Taberna hau goizeko 3etan ixten da.','«Ekaitz» taberna arratsaldeko 5etan irekitzen da.','Diskoteka goizeko 6,30etan ixten da.','Ordutegia: goizeko 10etatik arratsaldeko 8etara.'],
      sol:['Taberna hau goizeko hiruretan ixten da.','«Ekaitz» taberna arratsaldeko bostetan irekitzen da.','Diskoteka goizeko sei eta erdietan ixten da.','Ordutegia: goizeko hamarretatik arratsaldeko zortzietara.']}
  ],
  bad:{t:['Tabernen itxiera','Cierre de los bares'],
    eu:'Sekula ez al zaizu gertatu taberna batetik pasatu eta, nahiz eta ateak itxita egon, barruan jendea dagoen susmoa eduki? Ez, ez dira garbitzen ari —beno, hori ere baliteke—, baina seguruena azkeneko gautxoriak izango dira. Izan ere, lehen tabernek berandu arte irekita egoteko baimena zuten, eta ordu txikitan ere tabernaz taberna ibiltzeko aukera genuen.\n\nDuela urte batzuetatik hona, berriz, Europako beste herrialdeekin bateratsu, tabernetako ordutegia murriztu egin zen; hau da, lehenago itxi beharra daukate. Zer egin, ordea, ixteko garaia ailegatuta, barruan dauden bezeroekin? Asmatu dugu, bada, horretarako ere irtenbidea! Leku askotan, musika kendu, edo behintzat jaitsi, argi batzuk emendatu (nik dakidan taberna batean, argien partez, kandelak pizten dituzte), atea itxi eta goxo-goxo barruan gelditzen dira azkeneko bezeroak alde egin arte.',
    es:'¿Nunca te ha ocurrido pasar por un bar y, aun estando la puerta cerrada, tener la impresión de que hay gente dentro? No, no están limpiando —bueno, eso también es posible—, pero seguramente serán los últimos noctámbulos. Antes los bares tenían permiso para estar abiertos hasta tarde, y aun de madrugada teníamos la posibilidad de andar de bar en bar.\n\nDesde hace unos años, junto con otros lugares de Europa, los horarios de los bares se han visto reducidos, es decir, deben cerrar más temprano. ¿Qué hacemos con los clientes que aún están dentro cuando llega la hora de cerrar? ¡Pues también para eso hemos encontrado solución! En algunos sitios se quita la música, o por lo menos se baja, se apagan algunas luces (en un bar que yo conozco, en lugar de luces encienden velas), se cierra la puerta y ahí se quedan dentro, «goxo-goxo», hasta que se va el último cliente.'}
});

/* ─────────────────────────── 2. liburukia · Jatetxean ─────────────────────────── */

A2_OSTALARITZA.units.push({
  n:11, eu:'Menua', es:'Menú', tomo:2, orr:5, pdf:'11-menua.pdf', off:0,
  helb:['Menua eskaini eta eskaera ulertu eta jasotzea.','Ofrecer el menú y entender y recoger el pedido.'],
  eg:['Ane eta Maider afaltzera joan dira. Jatetxean sartu eta mahai batean eseri dira. Zerbitzaria etorri da.','Ane y Maider han ido a cenar. Han entrado en un restaurante y se han sentado a una mesa. Ha venido el camarero.'],
  cd:14,
  dial:[
    ['Bikotea','Kaixo! Gabon!','¡Hola! ¡Buenas noches!'],
    ['Zerbitzaria','Gabon!','¡Buenas noches!'],
    ['Ane','Zer daukazue afaltzeko?','¿Qué tenéis para cenar?'],
    ['Zerbitzaria','Hasteko: entsalada, esparragoak, fritoak eta arrain-zopa.','Para empezar tenéis: ensalada, espárragos, fritos y sopa de pescado.'],
    ['Ane','Nik entsalada mistoa hartuko dut.','Yo una ensalada mixta.'],
    ['Maider','Eta nik esparragoak maionesarekin. Eta frito batzuk ere bai, biontzat.','Y yo espárragos con mahonesa. Y también unos fritos, para las dos.'],
    ['Zerbitzaria','Oso ondo. Bigarrengo, zera daukagu: txuleta, sahieskia, solomoa eta legatza.','Muy bien. De segundo tenéis lo siguiente: chuleta, costilla, lomo y merluza.'],
    ['Ane','Nik solomoa piper gorriekin.','Yo lomo con pimientos rojos.'],
    ['Maider','Nik arraina nahiago dut: legatza.','Yo prefiero pescado: merluza.'],
    ['Zerbitzaria','Eta edateko? Ardoa, sagardoa…','¿Y para beber? Vino, sidra…'],
    ['Maider','Sagardoa edango dugu.','Beberemos sidra.'],
    ['Zerbitzaria','Ederki, segituan ekarriko dizuet.','Muy bien, os lo traigo enseguida.']
  ],
  ar:[
    {k:'1', eu:'Zer eskatzen dute? Elkarrizketa entzun bitartean, marka ezazu gurutze batez bikote honek eskatzen duena.', es:'¿Qué piden? Mientras escuchas el diálogo, marca con una cruz lo que pide esta pareja.', m:'cd', cdp:14, o:8,
      it:['Lehenengo platera: entsalada · urdaiazpikoa · esparragoak · fritoak · perretxiko-tortilla','Bigarren platera: txuleta · bixigua · solomoa · legatza · oilasko errea'],
      sol:['entsalada · esparragoak · fritoak','solomoa · legatza']},
    {k:'2', eu:'Lotu itzazu irudiak eta hitzak.', es:'Une las imágenes y las palabras.', m:'irudia', o:8,
      it:['1. argazkia','2. argazkia','3. argazkia','4. argazkia','5. argazkia'],
      op:['haragia','arraina','piper gorriak','zopa','entsalada mistoa'],
      sol:['piper gorriak','entsalada mistoa','haragia','arraina','zopa']},
    {k:'3', eu:'Lotu itzazu galderak dagokion erantzunarekin.', es:'Une las preguntas con la respuesta correspondiente.', o:8,
      it:['Eta edateko, zer nahi duzue?','Zer nahiago duzu, arraina ala haragia?','Hasteko, zer hartuko duzue?'],
      op:['Nik haragia nahiago dut.','Edateko, ardo gorria nahi dugu.','Hasteko, arrain-zopa hartuko dugu.'],
      sol:['Edateko, ardo gorria nahi dugu.','Nik haragia nahiago dut.','Hasteko, arrain-zopa hartuko dugu.']},
    {k:'4', eu:'Irudiei begira, idatzi plateraren izena.', es:'Mira las imágenes y escribe el nombre del plato.', m:'irudia', o:9,
      it:['huevos fritos + patatas fritas','pollo + ensalada','espárragos + mahonesa'],
      sol:['Arrautza frijituak patatekin.','Oilasko errea entsaladarekin.','Esparragoak maionesarekin.']},
    {k:'5', eu:'Lotu erdaraz eta euskaraz esanahi bera duten hitzak edo esaldiak.', es:'Une las palabras o frases que tienen el mismo significado en euskera y en castellano.', o:9,
      it:['Hasteko.','Bigarrengo.','Zer nahiago duzu?','Ekarriko dizuet.'],
      op:['¿Qué prefieres?','De segundo.','Para empezar.','Os lo traeré.'],
      sol:['Para empezar.','De segundo.','¿Qué prefieres?','Os lo traeré.']}
  ],
  az:[
    ['A','Zer daukazu? … daukat · ¿Qué tienes? Tengo…','<p>El verbo <b>eduki</b> (tener), de momento solo en las personas que necesitamos:</p><ul><li><b>Nik daukat</b> (una cosa) / <b>dauzkat</b> (muchas cosas) — yo tengo</li><li><b>Zuk daukazu / dauzkazu</b> — tú tienes</li><li><b>Guk daukagu / dauzkagu</b> — nosotros tenemos</li><li><b>Zuek daukazue / dauzkazue</b> — vosotros tenéis</li></ul><p>Orden. Pregunta: a. <b>Zer + verbo?</b> — <i>Zer daukazu?</i> (¿Qué tienes?) · b. <b>Ba + verbo + cosa + rik?</b> — <i>Badaukazu txuletarik?</i> (¿Tienes chuleta?)</p><p>Respuesta: a. <b>cosa + verbo</b> — <i>Legatza daukat.</i> · b. <b>Bai, ba + verbo + cosa</b> — <i>Bai, badaukagu txuleta.</i> · o <b>Ez, ez + verbo + cosa + rik</b> — <i>Ez, ez daukagu txuletarik.</i></p><p>Ese <b>-rik</b> final es el <b>partitivo</b>: va al final de la cosa en preguntas y negativas.</p>'],
    ['B','Zerekin? · ¿Con qué?','<p>La compañía: <i>xerra entsalada<b>rekin</b></i> (filete con ensalada) · <i>xerra patat<b>ekin</b></i> (filete con patatas).</p><ul><li>Compañía en singular: <b>-arekin</b> → entsaladarekin, maionesarekin, tomatearekin.</li><li>Compañía en plural: <b>-ekin</b> → patatekin, arrautzekin, piper gorriekin.</li></ul>'],
    ['C','Arrain-zopa, perretxiko-tortilla · Sopa de pescado, tortilla de setas','<p>Para el «de» del castellano: dale la vuelta, pon un guion en medio ¡y listo!</p><ul><li>Tortilla de espárragos → <b>esparrago-tortilla</b></li><li>Ensalada de pasta → <b>pasta-entsalada</b></li></ul>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Berotu','Calentar'],['Bukatu','Terminar'],['Eduki','Tener'],['Ekarri','Traer'],['Eraman','Llevar'],['Erre','Asar'],['Frijitu','Freír'],['Hartu','Coger'],['Hasi','Empezar'],['Hoztu','Enfriar'],['Nahiago izan','Preferir']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Ardo gorri / txuri / beltz','Vino clarete / blanco / tinto'],['Arrain','Pescado'],['Arrain-zopa','Sopa de pescado'],['Arrautza frijitu','Huevo frito'],['Bixigu','Besugo'],['Entsalada','Ensalada'],['Frito','Frito'],['Gatz','Sal'],['Haragi','Carne'],['Legatz','Merluza'],['Ogi','Pan'],['Oilasko','Pollo'],['Oilasko erre','Pollo asado'],['Olio','Aceite'],['Ozpin','Vinagre'],['Patata','Patata'],['Piper','Pimiento'],['Sahieski; Saihets','Costilla'],['Solomo','Lomo'],['Txuleta','Chuleta'],['Xerra','Filete'],['Zopa','Sopa']]],
    ['Besterik','Otros',[['Batzuk','Algunos/as'],['Bigarren plater','Segundo plato'],['Bigarrengo','De segundo'],['Biontzat','Para los / las dos'],['Edalontzi','Vaso'],['Edango dugu','Beberemos'],['Edateko','Para beber'],['Ere bai','También'],['Koilara','Cuchara'],['Hartuko dut','Tomaré'],['Hasteko','Para empezar'],['Labana; Aizto','Cuchillo'],['Lehenengo plater','Primer plato'],['Lehenengo','Primero'],['Mahai','Mesa'],['Plater','Plato'],['Postre; Azkenburuko','Postre'],['Sardexka; Tenedore','Tenedor']]]
  ],
  er:[
    {k:'A', eu:'Elkarrizketa entzun bitartean, osatu hutsuneak.', es:'Completa el diálogo mientras lo escuchas en el CD.', m:'cd', cdp:14, o:14,
      it:['Ane: Zer … afaltzeko?','Zerbitzaria: Hasteko: entsalada, …, fritoak eta …','Ane: Nik … hartuko dut.','Maider: Eta nik esparragoak … Eta … ere bai, biontzat.','Zerbitzaria: … … Bigarrengo, zera daukagu: txuleta, …, solomoa eta …','Ane: Nik solomoa … …','Maider: Nik … nahiago dut, …'],
      sol:['daukazue','esparragoak … arrain-zopa','entsalada mistoa','maionesarekin … frito batzuk','Oso ondo. … sahieskia … legatza','piper gorriekin','arraina … legatza']},
    {k:'B', eu:'Nola esaten da euskaraz?', es:'¿Cómo se dice en euskera?', o:14,
      it:['Pollo asado con ensalada.','Merluza con patatas.','Huevos con tomate.'],
      sol:['Oilasko errea entsaladarekin.','Legatza patatekin.','Arrautzak tomatearekin.']},
    {k:'C', eu:'Erantzun galderoi adibideari jarraituz (Badaukazue entsaladarik? — Bai, badaukagu entsalada. / Ez, ez daukagu entsaladarik.).', es:'Contesta a estas preguntas siguiendo el ejemplo (sí y no).', o:14,
      it:['Badaukazu arrain-zoparik?','Badaukazue bixigurik?'],
      sol:['Bai, badaukagu arrain-zopa. / Ez, ez daukagu arrain-zoparik.','Bai, badaukagu bixigua. / Ez, ez daukagu bixigurik.']}
  ],
  bad:{t:['Kantua','El canto'],
    eu:'«Isil-isilik dago kaia barrenean…» Horrelako kantuak gure kale, sozietate, sukalde eta abarretan entzutea gero eta bitxiagoa da. Izan ere, garai batean ohikoak ziren lagunartean basoerdi batzuk hartzen ziren bitartean, edo sozietatean edo etxean afal ondoren, egiten ziren kantu-saioak… Egungo ohitura eta bizimodu berriek, aldiz, ohitura honen galera ekarri dute neurri handi batean.\n\nOrain, egun jakin batzuetan bakarrik egiten da kantuan: despedidaren bat denean, edo herriko festetan edo Gabonetan… eta kitto. Agian ahalegindu egin beharko genuke geurea den usadio honi eusten; bestela, ohitura ez ezik, abestiak ere galdu egingo baitira.',
    es:'«Isil-isilik dago kaia barrenean…» Cada vez es más raro escuchar estos cantos en nuestras calles, sociedades, cocinas… La costumbre de cantar entre amigos mientras se poteaba, o en casa, o en la sociedad después de cenar, que era habitual en otra época, se ha visto afectada en gran medida por el cambio en la forma de vivir de nuestros días.\n\nHoy solamente se canta en fechas señaladas, como cuando hay alguna despedida, en las fiestas del pueblo o en Navidades. Deberíamos esforzarnos en conservar esta costumbre tan nuestra; si no, no solo la costumbre, sino también las canciones correrán el riesgo de desaparecer.'}
});

A2_OSTALARITZA.units.push({
  n:12, eu:'Eskaera', es:'Petición', tomo:2, orr:17, pdf:'12-eskaera.pdf', off:0,
  helb:['Falta den zerbait eskatzean erantzutea.','Responder cuando se pide algo que falta.'],
  eg:['Egoitz afaltzen ari da. Ogia falta zaiola konturatzen da eta zerbitzariari eskatzen dio.','Egoitz está cenando. Se da cuenta de que le falta el pan y se lo pide a la camarera.'],
  cd:15,
  oh:['⚠ En el hiztegia de esta unidad el libro da «Goilara = cuchara» y «Koilara = cucharilla»; en el resto del método (y en batua) koilara = cuchara y koilaratxo = cucharilla (goilara es variante dialectal de koilara).'],
  dial:[
    ['Egoitz','Aizu, mesedez!','¡Oye, por favor!'],
    ['Zerbitzaria','Bai, esan.','Sí, dime.'],
    ['Egoitz','Ogia ekartzea ahaztu zaizu, eta nire zopa ere bai.','Se te ha olvidado traer el pan, y también mi sopa.'],
    ['Zerbitzaria','A! Barkatu! Ogia oraintxe ekarriko dizut, baina zopa ez didazu eskatu. Nahi baduzu, pixka batean itxaron beharko duzu.','¡Ah, perdona! Ahora mismo te traigo el pan, pero la sopa no me la has pedido. Si quieres, deberás esperar un poco.'],
    ['Egoitz','Bai, itxarongo dut.','Sí, ya espero.'],
    ['Zerbitzaria','Hementxe duzu ogia.','Aquí tienes el pan.'],
    ['Egoitz','Eskerrik asko. Zopari gatza falta zaio.','Gracias. A la sopa le falta sal.'],
    ['Zerbitzaria','Gatza? Hemen duzu, tori.','¿Sal? Aquí tienes, toma.'],
    ['Egoitz','Mila esker, eta barkatu eragozpenak.','Gracias, y perdona las molestias.'],
    ['Zerbitzaria','Ez da ezer.','No es nada.']
  ],
  ar:[
    {k:'1', eu:'CDko elkarrizketa entzuten duzun bitartean, saia zaitez esaldiak ordenatzen (bineta bakoitzean, 1etik 5era).', es:'Mientras escuchas el diálogo en el CD, trata de ordenar las frases (en cada viñeta, del 1 al 5).', m:'cd', cdp:15, o:20,
      it:['1. bineta · A! Barkatu! Ogia oraintxe ekarriko dizut, baina zopa ez didazu eskatu. Nahi baduzu, pixka batean itxaron beharko duzu.','1. bineta · Bai, esan.','1. bineta · Bai, itxarongo dut.','1. bineta · Ogia ekartzea ahaztu zaizu, eta nire zopa ere bai.','1. bineta · Aizu, mesedez!','2. bineta · Eskerrik asko. Zopari gatza falta zaio.','2. bineta · Mila esker, eta barkatu eragozpenak.','2. bineta · Hementxe duzu ogia.','2. bineta · Ez da ezer.','2. bineta · Gatza? Hemen duzu, tori.'],
      sol:['4','2','5','3','1','2','4','1','5','3']},
    {k:'2', eu:'Marrazkiei begiratuta, osatu esaldiak ereduaren arabera (Bokadiloari urdaiazpikoa falta zaio).', es:'Mirando los dibujos, completa las frases de acuerdo al ejemplo.', m:'irudia', o:20,
      it:['Zopari … falta zaio.','Bezeroari … falta zaio.','Kafeari … falta zaio.','Bakailaoari … falta zaio.'],
      sol:['Zopari gatza falta zaio.','Bezeroari edalontzia falta zaio.','Kafeari azukrea falta zaio.','Bakailaoari perrexila falta zaio.']},
    {k:'3', eu:'Lotu euskaraz eta erdaraz esanahi bera duten hitzak.', es:'Une las palabras que tienen el mismo significado en euskera y en castellano.', o:21,
      it:['Ahaztu','Pixka bat','Falta zaio','Ez da ezer','Berehala'],
      op:['Le falta','No es nada','Olvidar','Un poco','Enseguida'],
      sol:['Olvidar','Un poco','Le falta','No es nada','Enseguida']},
    {k:'4', eu:'Lotu hitzak eta irudiak.', es:'Une las palabras y las imágenes.', m:'irudia', o:21,
      it:['A irudia','B irudia','C irudia','D irudia','E irudia','F irudia'],
      op:['Gatza','Zopa','Ogia','Koilara','Labana','Perrexila'],
      sol:['Ogia','Labana','Gatza','Perrexila','Zopa','Koilara']}
  ],
  az:[
    ['A','Zer falta zaio? · ¿Qué le falta?','<p>El orden de la frase en euskera es al revés que en castellano. Cuando se nos olvida llevarle algo al cliente: «me falta el pan», «le falta sal»…</p><p>a. <b>OBJETO + RI + lo que falta + FALTA + ZAIO</b>: <b>Zopari gatza falta zaio.</b> — A la sopa le falta sal.</p><p>Si le falta algo a una persona: <b>PERSONA + RI + lo que falta + FALTA + ZAIT…</b>: <b>Niri koilara falta zait.</b> — A mí me falta la cuchara.</p><ul><li><b>Zuri</b> koilara / labana… falta <b>zaizu</b> — a ti te falta…</li><li><b>Guri</b> … falta <b>zaigu</b> — a nosotros nos falta…</li><li><b>Zuei</b> … falta <b>zaizue</b> — a vosotros os falta…</li></ul><p>b. Para preguntar: <b>Zer falta zaio / zaizu / zaizue?</b> — <i>Zer falta zaizu? — Labana falta zait.</i></p>'],
    ['B','Barkamena eskatzeko · Para pedir perdón','<ul><li><b>Barkatu, ahaztu egin zait.</b> — Perdón, se me ha olvidado.</li><li><b>Barkatu, nahastu egin naiz.</b> — Perdón, me he confundido.</li><li><b>Barkatu, nahastu egingo nintzen.</b> — Perdón, me habré confundido.</li><li><b>Barkatu, segituan ekarriko dizut / dizuet.</b> — Perdón, enseguida te / os lo traigo.</li></ul>'],
    ['C','Mahaia jartzera! · ¡A poner la mesa!','<p>Los nombres de la foto de la mesa puesta: <b>basoa / edalontzia</b> (vaso) · <b>botila</b> (botella) · <b>koilara</b> (cuchara) · <b>platera</b> (plato) · <b>serbileta</b> (servilleta) · <b>sardexka</b> (tenedor).</p>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Ahaztu','Olvidar'],['Barkatu','Perdonar'],['Ekarri','Traer'],['Eraman','Llevar'],['Eskatu','Pedir'],['Falta izan','Faltar'],['Gogoratu','Recordar'],['Itxaron','Esperar'],['Konturatu','Dar(se) cuenta'],['Nahastu','Confundirse'],['Probatu','Probar']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Azukre','Azúcar'],['Bakailao','Bacalao'],['Gatza','Sal'],['Kafe','Café'],['Ogi','Pan'],['Perrexil','Perejil'],['Zopa','Sopa']]],
    ['Mahai-tresnak','Utensilios de mesa',[['Botila','Botella'],['Edalontzi; Baso','Vaso'],['Erretilu','Bandeja'],['Goilara','Cuchara'],['Koilara','Cucharilla (ver nota)'],['Katilu','Taza'],['Kopa','Copa'],['Labana; Aizto','Cuchillo'],['Mantel','Mantel'],['Plater sakon','Plato hondo'],['Plater zapal','Plato llano'],['Plater','Plato'],['Sardexka; Tenedore','Tenedor'],['Zapi','Servilleta']]],
    ['Esaldiak','Frases',[['(…) ekartzea ahaztu zaizu','Se te ha olvidado traer (…)'],['Baina','Pero'],['Barkatu eragozpena','Perdona la molestia'],['Barkatu','Perdón; perdona; perdonad'],['Ez da ezer','No es nada'],['Itxaron pixka batean','Espera un momento'],['Pixka batean','Un momento'],['Segituan; Berehala','Enseguida']]]
  ],
  er:[
    {k:'A', eu:'Euskaratu ezazu ondorengo elkarrizketa.', es:'Pon en euskera este diálogo.', o:26,
      it:['Endika: Oye, perdón, pero me falta la cuchara.','Zerbitzaria: Perdona, se me ha olvidado.','Endika: No es nada.','Zerbitzaria: Enseguida te la traigo.','Endika: Gracias.'],
      sol:['Aizu, barkatu, baina koilara falta zait.','Barkatu, ahaztu egin zait.','Ez da ezer.','Berehala ekarriko dizut.','Eskerrik asko.']},
    {k:'B', eu:'Jarri izenak marrazkiko gauzei.', es:'Pon los nombres a las cosas de la foto (una mesa puesta).', m:'irudia', o:26,
      it:['Nombra cada cosa de la mesa.'],
      sol:'basoa / edalontzia · gatza · labana · sardexka · ogia · serbileta · platera · koilara.'},
    {k:'C', eu:'Lotu esanahi bereko hitzak edo esaldiak.', es:'Une las palabras o frases que tienen el mismo significado.', o:26,
      it:['Edalontziak jartzea ahaztu zait.','Ura falta zaigu.','Barkatu, segituan ekarriko dizuet.','Hemen duzu gatza.'],
      op:['Perdón, enseguida os lo traigo.','Aquí tienes la sal.','Se me ha olvidado poner los vasos.','Nos falta el agua.'],
      sol:['Se me ha olvidado poner los vasos.','Nos falta el agua.','Perdón, enseguida os lo traigo.','Aquí tienes la sal.']}
  ],
  bad:{t:['Jana tradizionala','Comida tradicional'],
    eu:'Bertako indabak, odolkiak, bakailaoa, txuleta… eta hortik aurrera, ezer gutxi. Euskaldunok ez gara oso zaleak gauza «arraroak» probatzen. Gure sukaldaritza tradizionalari begiratu besterik ez dago, oso osagai gutxi eta sinpleekin plater bikainak moldatzeko gai garela konturatzeko. Eta espeziei dagokienez, zer esanik ez!: perrexila, gatza, baratxuria eta tipula; alde batera beste herrialde batzuetan hain preziatuak diren belar fin horiek!\n\nHala ere, azken urteotan, alde batetik etorkin-uholdea dela eta, eta bestetik sukaldari batzuei esker, pixkanaka-pixkanaka hasi gara beste gauza batzuk probatzen, eta gaur egun jadanik ez dugu «aitaren» egiten bakarren bat haragiari piperrautsa edo gisatuari erramu-hosto bat botatzen ikusitakoan.',
    es:'Alubias del país, morcillas, bacalao, chuleta… y no mucho más. Los vascos no somos muy aficionados a probar «cosas raras». Solamente basta mirar nuestra cocina tradicional para darnos cuenta de que con unos pocos y simples ingredientes somos capaces de crear muy buenos platos. Y en cuanto a las especias: perejil, sal, ajo y cebolla; ¡fuera esas hierbas finas tan apreciadas en otros lugares!\n\nDe todas maneras, estos últimos años, por una parte a causa de la afluencia de inmigrantes y por otra gracias a algunos cocineros, nos hemos empezado a animar a probar otras cosas, y ya no nos escandalizamos al ver a alguien echarle pimienta a la carne o una hoja de laurel al guisado.'}
});

A2_OSTALARITZA.units.push({
  n:13, eu:'Kexa', es:'Queja', tomo:2, orr:29, pdf:'13-kexa.pdf', off:0,
  helb:['Kexa adieraztean, erantzun sinple bat ematea.','Dar una respuesta simple ante una queja.'],
  eg:['Iñaki eta Pello bazkaltzera joan dira. Iñakik txuleta eskatu du, baina ez dago berari gustatzen zaion bezala. Zerbitzariari deitu eta kexa adierazi dio.','Iñaki y Pello han ido a comer. Iñaki ha pedido chuleta, pero no está como le gusta a él. Ha llamado a la camarera y se ha quejado.'],
  cd:16,
  oh:['⚠ El libro rotula las cuatro explicaciones como A, B, B, B; aquí van como A–D.'],
  dial:[
    ['Iñaki','Aizu, barkatu, baina txuleta hau…','Oye, perdona, pero esta chuleta…'],
    ['Zerbitzaria','Zer? Ez dago ona?','¿Qué? ¿No está buena?'],
    ['Iñaki','Ez, gehiegi eginda dago.','No, está demasiado hecha.'],
    ['Zerbitzaria','Gehiegi eginda?','¿Demasiado hecha?'],
    ['Iñaki','Bai, lehor-lehorra dago, eta nik gutxi eginda esan dizut.','Sí, está muy seca, y yo te he dicho poco hecha.'],
    ['Zerbitzaria','Barkatu, nahastu egingo nintzen. Lasai, segituan konponduko dugu eta. Beste bat ekarriko dizut.','Perdona, me habré confundido. Tranquilo, lo arreglaremos enseguida. Te traeré otra.'],
    ['Zerbitzaria','Hemen duzu. Ea orain ondo dagoen! Eta barkatu! Bestela, kexa-liburua…','Aquí tienes. A ver si ahora está bien. Y perdona. Si no, el libro de reclamaciones…'],
    ['Iñaki','Ez, ez, lasai, orain ondo dago. Eskerrik asko!','No, no, tranquila, ahora está bien, gracias.']
  ],
  ar:[
    {k:'1', eu:'Elkarrizketaren arabera, azpimarratu erantzun zuzena.', es:'Subraya la respuesta correcta según la conversación.', o:32,
      it:['Txuleta ona dago? (bai / ez)','Nola dago txuleta? (gehiegi eginda / gutxi eginda)','Bigarren txuleta ondo dago? (ez / bai)'],
      sol:['Ez.','Gehiegi eginda.','Bai.']},
    {k:'2', eu:'Lotu euskaraz eta erdaraz esanahi bera duten hitzak edo esaldiak.', es:'Une las frases que tienen el mismo significado en euskera y en castellano.', o:32,
      it:['Lehor-lehorra dago','Gutxi eginda','Lasai','Ez dago ona?'],
      op:['Tranquila','Está muy seca','¿No está buena?','Poco hecha'],
      sol:['Está muy seca','Poco hecha','Tranquila','¿No está buena?']},
    {k:'3', eu:'Lotu esaldiak eta irudiak.', es:'Une las frases y las imágenes.', m:'irudia', o:32,
      it:['A argazkia','B argazkia','C argazkia','D argazkia'],
      op:['Gutxi eginda dago.','Erreta dago.','Gatz gehiegi dauka.','Usain txarra dauka.'],
      sol:['Erreta dago.','Gatz gehiegi dauka.','Gutxi eginda dago.','Usain txarra dauka.']},
    {k:'4', eu:'Entzun berriz elkarrizketa eta esan elkarrizketako zeini dagozkion esaldi hauek.', es:'Escucha de nuevo la grabación e identifica a qué personaje corresponden estas frases.', m:'cd', cdp:16, o:33,
      it:['Gehiegi eginda dago.','Barkatu, nahastu egingo nintzen.','Ea orain ondo dagoen!','Lehor-lehorra dago eta nik gutxi eginda esan dizut.'],
      sol:['Iñaki','Zerbitzaria','Zerbitzaria','Iñaki']},
    {k:'5', eu:'Lotu kontrako esanahia duten hitzak.', es:'Une las palabras que tengan significado contrario.', o:33,
      it:['gogor-gogorra','lehorra','txarra','gehiegi','hotzegia'],
      op:['ona','gutxiegi','beroegia','samur-samurra','urtsua'],
      sol:['samur-samurra','urtsua','ona','gutxiegi','beroegia']}
  ],
  az:[
    ['A','Nolakoa da? / Nola dago? · ¿Cómo es? / ¿Cómo está?','<p>Hay que diferenciar muy bien estos dos conceptos:</p><p>a. <b>Nolakoa da haragia? Haragia txarra da.</b> — La carne es mala: de por sí es mala, no es que esté mal preparada, poco hecha o con demasiada sal.</p><p>b. <b>Nola dago haragia? Haragia txarra dago.</b> — La carne está mala: aunque pueda ser buena, no está buena.</p><p>La diferencia está en el verbo: <b>Nolakoa DA? Txarra DA</b> (izan, ser) · <b>Nola DAGO? Txarra DAGO</b> (egon, estar).</p><ul><li><b>Zopa hau gaziegia dago.</b> — Esta sopa está demasiado salada (no es salada, pero le hemos echado demasiada sal).</li><li><b>Bakailaoa gazia da.</b> — El bacalao es salado (de por sí).</li></ul>'],
    ['B','Gazi samarra, gazia, gazi-gazia, gaziegia · Graduar una cualidad','<ul><li><b>gazia</b> — salado</li><li><b>gazi samarra</b> — bastante salado</li><li><b>oso gazia / gazi-gazia</b> — muy salado</li><li><b>gaziegia</b> — demasiado salado</li></ul><p>Vale para cualquier otro adjetivo.</p>'],
    ['C','Gehiago / gutxiago · gehiegi / gutxiegi','<p>a. <b>gehiago</b> (más) y <b>gutxiago</b> (menos): <b>OBJETO + GEHIAGO / GUTXIAGO + VERBO</b></p><ul><li><b>Gatz gehiago botako didazu?</b> — ¿Me echas más sal?</li><li><b>Haragia gehiago egingo didazu?</b> — ¿Me haces más la carne?</li><li><b>Izotz gutxiago jarriko didazu?</b> — ¿Me pones menos hielo?</li></ul><p>b. <b>gehiegi</b> (demasiado) y <b>gutxiegi</b> (demasiado poco): <b>OBJETO + GEHIEGI / GUTXIEGI + VERBO</b></p><ul><li><b>Gatz gehiegi dauka.</b> — Tiene demasiada sal.</li><li><b>Olio gutxiegi dauka.</b> — Tiene demasiado poco aceite.</li></ul>'],
    ['D','Gehiegi eginda dago · Está demasiado hecho','<p>Normalmente calificamos con adjetivos (<b>Haragia samurra dago</b>, la carne está tierna), pero también con otras palabras: <b>eginda</b> (hecho), <b>erreta</b> (asado), <b>nahastuta</b> (mezclado). Y también se gradúan:</p><p><b>ondo eginda</b> bien hecho · <b>gaizki eginda</b> mal hecho · <b>gehiegi eginda</b> demasiado hecho · <b>gutxi eginda</b> poco hecho · <b>gutxiegi eginda</b> demasiado poco hecho · <b>gehiago eginda</b> más hecho.</p>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Barkatu','Perdonar'],['Berotu','Calentar'],['Busti','Mojar'],['Egin','Hacer'],['Egon','Estar'],['Egosi','Cocer'],['Erre','Asar; quemar'],['Gazitu','Salar'],['Hoztu','Enfriar'],['Izan','Ser'],['Kendu','Quitar'],['Nahastu','Confundir; mezclar'],['Urtu','Fundir']]],
    ['Adjektiboak','Adjetivos',[['Arin','Ligero'],['Astun','Pesado'],['Bigun','Blando'],['Bikain','Excelente'],['Egina','Hecho'],['Epel','Tibio'],['Fresko','Fresco'],['Garbi','Limpio'],['Garratz','Agrio'],['Gazi','Salado'],['Geza','Soso'],['Gogor','Duro'],['Gordin','Crudo'],['Gozo','Dulce'],['Lehor','Seco'],['Mikatz','Amargo'],['Min','Picante'],['On','Bueno'],['Samur','Tierno'],['Txar','Malo'],['Ustel','Podrido'],['Zikin','Sucio'],['Zimel','Marchito']]],
    ['Besterik','Otros',[['Gaizki; Txarto','Mal'],['Gehiago','Más'],['Gehiegi','Demasiado'],['Gizen','Grasa'],['Gutxiago','Menos'],['Gutxiegi','Demasiado poco'],['Itxura','Aspecto'],['Ondo; Ongi','Bien'],['Oso','Muy'],['Samar','Bastante'],['Usain','Olor']]],
    ['Esaldiak','Frases',[['Beste bat ekarriko dizut / dizuet','Te / os traeré otro'],['Ea ondo dagoen','A ver si está bien'],['Konponduko dugu','Lo arreglaremos'],['Lasai','Tranquilo; tranquilos'],['Nahi baduzu / baduzue','Si quieres / queréis'],['Ona(k) dago / daude','Está(n) bueno(s)'],['Txarra(k) dago / daude','Está(n) malo(s)']]]
  ],
  er:[
    {k:'A', eu:'Lotu hitzok dagokion marrazkiarekin.', es:'Une las palabras con la imagen que corresponde.', m:'irudia', o:38,
      it:['1. marrazkia','2. marrazkia','3. marrazkia','4. marrazkia','5. marrazkia'],
      op:['Ustel','Zikin','Zimel','Usain txarreko','Min'],
      sol:['Usain txarreko','Zimel','Min','Ustel','Zikin']},
    {k:'B', eu:'Sartu esaldiok dagokion globoan.', es:'Mete estas frases en el globo que corresponda.', m:'irudia', o:38,
      it:['1. bineta: «Aizu, letxuga hau zimel-zimela dago!» · «Barkatu, baina fresko-freskoa da.»','2. bineta: «Barkatu, beste bat ekarriko dizut.» · «Arraina ona al dago?» · «Ez, oso txarra dago, usain txarra dauka!»'],
      sol:['Bezeroa: Aizu, letxuga hau zimel-zimela dago! — Zerbitzaria: Barkatu, baina fresko-freskoa da.','Zerbitzaria: Arraina ona al dago? — Bezeroa: Ez, oso txarra dago, usain txarra dauka! — Zerbitzaria: Barkatu, beste bat ekarriko dizut.']},
    {k:'C', eu:'Lotu euskaraz eta erdaraz esanahi bera duten esaldiak.', es:'Une las frases que tienen el mismo significado en euskera y en castellano.', o:38,
      it:['Barkatu, baina haragi honek gizen gehiegi dauka.','Nahi baduzu, beste bat ekarriko dizut.','Entsaladak itxura txarra dauka.','Antxoak ez daude ondo eginda.','Barkatu, gehiago egingo dizut.'],
      op:['Si quieres, te traigo otro.','Perdón, te lo haré más.','Perdona, pero esta carne tiene demasiada grasa.','La ensalada tiene mal aspecto.','Las anchoas no están bien hechas.'],
      sol:['Perdona, pero esta carne tiene demasiada grasa.','Si quieres, te traigo otro.','La ensalada tiene mal aspecto.','Las anchoas no están bien hechas.','Perdón, te lo haré más.']}
  ],
  bad:{t:['Sagardotegia','La sidrería'],
    eu:'Argentinan «parrillas», Irlandan «pubs», Amsterdamen «coffee shops», Perun «cevicherías» eta Euskal Herrian sagardotegiak! Gastronomiari dagokionez, herrialde gehienek daukate besteengandik bereizten dituena, eta gurean, zalantzarik gabe, sagardotegiak dira. Lehen, bertsolarien biltoki ziren; orain, gurera etortzen diren kanpokoak aho zabalik uzten dituen lagun arteko bazkaria edo afaria egiteko leku aproposa.\n\nSagardo garaian dugu aukerarik hoberena, sagardoa egin berria eta kupeletik zuzenean hartu baitezakegu. Orain, teknologiari esker, edozein garaitan dugu sagardoa dastatzeko aukera, kupeletik ez bada, botilatik. Tradizionalenek zutik jan behar dela esaten dute: «mokau» bat egin eta, «txotx» entzutean, korrika kupel aldera. Baina gauza guztiekin gertatzen den bezala, ohitura hau ere aldatzen joan da, eta gaur egun lasai eserita (mantela jartzea ere eska dezakezu) egon zaitezke, bakarren batek basoa bete eta mahairaino ekarriko dizu eta.',
    es:'En Argentina, «parrillas»; en Irlanda, «pubs»; en Ámsterdam, «coffee shops»; en Perú, «cevicherías»; ¡y en Euskal Herria, sidrerías! En lo que concierne a la gastronomía, la mayoría de los países tienen algo que los distingue de los demás, y aquí, sin duda alguna, son las sidrerías. Antes, lugar de reunión de bertsolaris; ahora, un lugar sin par que deja boquiabiertos a los que se acercan a nuestro país.\n\nEn la época de la sidra es cuando tenemos la mejor oportunidad, ya que podemos probar la sidra recién hecha directamente de la kupela; pero ahora, gracias a la tecnología, podemos hacerlo en cualquier época del año: si no es de la kupela, de la botella. Los más tradicionales dicen que se debe comer de pie, tomar un bocado y, al oír «txotx», ir corriendo a la kupela. Pero como ocurre con todas las cosas, esta costumbre también ha ido cambiando, y hoy en día puedes estar sentado tranquilamente (también puedes pedir que te pongan mantel), que ya te traerá alguien el vaso lleno hasta la mesa.'}
});

A2_OSTALARITZA.units.push({
  n:14, eu:'Argibideak', es:'Información', tomo:2, orr:41, pdf:'14-argibideak.pdf', off:0,
  helb:['Zerbaiten kokapena galdetzean erantzutea eta argibideak ematea.','Responder y dar instrucciones cuando se le pregunta dónde está algo.'],
  cd:17,
  dial:[
    ['','Martina jatetxean dago. Komunera joan nahi du, baina ez daki non dagoen. Zerbitzariari galdetu dio.','Martina está en el restaurante. Quiere ir al servicio pero no sabe dónde está. Le ha preguntado al camarero.'],
    ['Martina','Aizu, barkatu, komunak non daude?','Oye, perdona. ¿Dónde están los servicios?'],
    ['Zerbitzaria','Komuna? Bai, begira, lehenengo solairuan dago. Segi zuzen hemendik eta han, ezkerrean, eskailerak aurkituko dituzu; igo. Han argia piztu behar duzu. Bertan duzu komuna.','¿El servicio? Sí, mira, está en el primer piso. Sigue recto por aquí y allí, a la izquierda, encontrarás las escaleras; sube. Allí debes encender la luz. Allí mismo tienes el servicio.'],
    ['Martina','Ondo da, eskerrik asko.','Está bien, gracias.'],
    ['','Jokinek berokia zintzilikatu egin nahi du, baina ez daki non, eta zerbitzariari galdetu dio.','Jokin quiere colgar el abrigo, pero no sabe dónde, y le ha preguntado a la camarera.'],
    ['Jokin','Aizu, berokia non zintzilikatu ahal dut?','Oye, ¿dónde puedo colgar el abrigo?'],
    ['Zerbitzaria','Pertxeroa han dago, komunaren ezkerrean.','Allí está el perchero, a la izquierda del servicio.'],
    ['Jokin','Ondo da, eskerrik asko.','Vale, gracias.'],
    ['','Leirek tabakoa behar du, baina ez du tabako-makina ikusten.','Leire necesita tabaco pero no ve la máquina, y le ha preguntado al camarero.'],
    ['Leire','Aizu, tabakorik badaukazue?','Oye, ¿tenéis tabaco?'],
    ['Zerbitzaria','Bai, hantxe dago tabako-makina, barraren ondoan.','Sí, allí mismo está la máquina de tabaco, al lado de la barra.'],
    ['Leire','Ongi da, eskerrik asko.','Vale, gracias.']
  ],
  ar:[
    {k:'1', eu:'Elkarrizketa entzuten duzun bitartean, marka ezazu planoan Martinak komunera joateko egin behar duen bidea.', es:'Mientras escuchas el diálogo, marca en el plano el camino que debe seguir Martina para ir al servicio.', m:'cd', cdp:17, o:44,
      it:['Marca el recorrido en el plano (barra · eskailerak · lehenengo solairua · komunak).'],
      sol:'Recto desde donde están Martina y el camarero; a la izquierda, las escaleras; sube al primer piso y allí están los servicios. El plano resuelto está en la página de soluciones del PDF.'},
    {k:'2', eu:'Orain zuk! Esan bezero honi zer egin behar duen komunera joateko (planoan bidea markatuta daukazu).', es:'¡Ahora tú! Dile a este cliente qué debe hacer para llegar al servicio (el camino está señalado en el plano).', m:'irudia', o:44,
      it:['…'], sol:['Segi zuzen pasilutik, hartu eskuinetara eta igo eskailerak.']},
    {k:'3', eu:'Jarri euskaraz hitz hauek.', es:'Pon en euskera estas palabras.', o:45,
      it:['En el segundo piso','A la izquierda','Por aquí','Recto'],
      sol:['Bigarren solairuan','Ezkerretara','Hemendik','Zuzen']},
    {k:'4', eu:'Lotu hitzak eta irudiak.', es:'Une las palabras con las imágenes.', m:'irudia', o:45,
      it:['a (bombilla)','b (flecha)','c (señal del servicio)','d (cuadros en un pasillo)','e (escalera)'],
      op:['komuna','eskailerak','argia','pasilua','zuzen'],
      sol:['argia','zuzen','komuna','pasilua','eskailerak']},
    {k:'5', eu:'Hutsuneak bete beheko hitzak aukeratuz: daude · eskailerak · zuzen pasilutik · ezkerretara · komunak.', es:'Rellena los huecos eligiendo las palabras de abajo.', o:45,
      it:['Maite: Non … komunak?','Itziar: Bigarren solairuan daude. Jarraitu … eta igo … Han hartu … Bertan daude …'],
      sol:['Non daude komunak?','Jarraitu zuzen pasilutik eta igo eskailerak. Han hartu ezkerretara. Bertan daude komunak.']}
  ],
  az:[
    ['A','Non dago? · ¿Dónde está?','<p>Primero hay que saber expresar dónde están las cosas. <b>Non dago / daude platera / platerak?</b> — ¿Dónde está / están el plato / los platos? (<b>NON + VERBO + OBJETO?</b>)</p><p>a. <b>Teniendo en cuenta el lugar</b>: <b>Platera mahaian dago</b> (mahai acaba en vocal → <b>-an</b>) · <b>Platera lurrean dago</b> (lur acaba en consonante → <b>-ean</b>).</p><p>b. <b>Teniendo en cuenta la distancia</b>: platera <b>hemen</b> dago (aquí) · <b>hor</b> (ahí) · <b>han</b> (allí).</p><p>c. <b>Con otra cosa como referencia</b>: <b>Platera mahai gainean dago</b> (encima de la mesa) · <b>Platera mahai azpian dago</b> (debajo de la mesa).</p><p>Cuidado con el orden: «El plato está en la mesa» → <b>Platera mahaian dago</b> («el plato en la mesa está»).</p><p>Hemos usado el caso NON, pero hay otros: <b>mahaian</b> (en la mesa, NON?) · <b>mahaira</b> (a la mesa, NORA?) · <b>mahaitik</b> (de la mesa, NONDIK?).</p>'],
    ['B','Non dago pilota? · Posposiciones','<p><b>aurrean</b> delante · <b>atzean</b> detrás · <b>ezkerrean</b> a la izquierda · <b>eskuinean</b> a la derecha · <b>goian</b> arriba · <b>behean</b> abajo</p>'],
    ['C','Aginduak ematen · Dando órdenes','<p><b>VERBO + DEMÁS ELEMENTOS</b>: <b>Ekarri kontua!</b> ¡Trae la cuenta! · <b>Jarri hau!</b> ¡Pon esto! · <b>Etorri hona!</b> ¡Ven aquí!</p><p>Para indicar el camino: <b>Jarraitu aurrera</b> (sigue adelante) · <b>Joan ezkerretara</b> (ve a la izquierda) · <b>Igo gora</b> (sube arriba) · <b>Hartu eskuinetara</b> (gira a la derecha).</p>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Aurkitu','Encontrar'],['Bilatu','Buscar'],['Etorri','Venir'],['Hartu','Coger'],['Igo','Subir'],['Irten','Salir'],['Itzali','Apagar'],['Jaitsi','Bajar'],['Jarraitu; Segi','Seguir'],['Joan','Ir'],['Markatu','Marcar'],['Piztu','Encender'],['Sartu','Entrar'],['Seinalatu','Señalar'],['Zintzilikatu','Colgar']]],
    ['Lekuak','Lugares',[['Aparkaleku','Aparcamiento; parking'],['Barra','Barra'],['Eskailera','Escalera'],['Irteera','Salida'],['Jangela','Comedor'],['Komun','Servicio'],['Lur','Suelo; tierra'],['Pasilu','Pasillo'],['Sarrera','Entrada'],['Solairu','Piso; planta'],['Sukalde','Cocina'],['Txoko','Rincón']]],
    ['Besterik','Otros',[['Argi','Luz'],['Argibide; Jarraibide','Instrucción'],['Arte','Entre'],['Ate','Puerta'],['Atze','Detrás'],['Atzera','Hacia atrás'],['Aurre','Delante'],['Aurrera','Hacia delante'],['Azpi','Debajo'],['Barru','Dentro'],['Barrura','Hacia dentro'],['Behe','Abajo'],['Behera','Hacia abajo'],['Beroki','Abrigo'],['Bezero','Cliente/a'],['Erdi','Medio'],['Erdira','Hacia el medio'],['Eskuin','Derecha'],['Eskuinetara','A la derecha'],['Ezker','Izquierda'],['Ezkerretara','A la izquierda'],['Gain','Encima'],['Gainera','Además; encima'],['Goi','Arriba'],['Gora','Arriba (hacia)'],['Han bertan','Allí mismo'],['Han','Allí'],['Hantxe','Allí mismo'],['Hara','Hacia allí'],['Hemen','Aquí'],['Hementxe','Aquí mismo'],['Hona','Hacia aquí'],['Hor','Ahí'],['Horra','Hacia ahí'],['Hortxe','Ahí mismo'],['Inguru','Alrededor'],['Kanpo','Fuera'],['Kanpora','Hacia fuera'],['Non','Dónde'],['Nondik','De dónde; por dónde'],['Nora','Adónde'],['Ondo','Al lado'],['Pertxero','Perchero'],['Sukaldari','Cocinero/a'],['Zerbitzari','Camarero/a'],['Zuzen','Recto']]]
  ],
  er:[
    {k:'A', eu:'Lotu irudiak eta hitzak.', es:'Une las imágenes (flechas) y las palabras.', o:50,
      it:['a (→)','b (←)','c (↑)','d (↓)'],
      op:['Gora','Ezkerretara','Behera','Eskuinetara'],
      sol:['Eskuinetara','Ezkerretara','Gora','Behera']},
    {k:'B', eu:'Lotu galderak eta erantzunak marrazkiei begiratuta.', es:'Une las preguntas con las respuestas que les corresponden (mira las fotos).', m:'irudia', o:50,
      it:['Non daude platerak?','Non dago zerbitzaria?','Non dago komuna?','Non dago sukaldaria?'],
      op:['Sukalde barruan dago.','Barra atzean dago.','Mahai gainean daude.','Lehenengo solairuan dago.'],
      sol:['Mahai gainean daude.','Barra atzean dago.','Lehenengo solairuan dago.','Sukalde barruan dago.']},
    {k:'C', eu:'Jarri euskaraz.', es:'Pon en euskera.', o:50,
      it:['Sigue por el pasillo, sube las escaleras y gira a la derecha.','Perdón, ¿dónde están los servicios?','Vete a la caja y paga allí.','Los vasos están encima de la mesa.'],
      sol:['Jarraitu pasilutik, igo eskailerak eta hartu eskuinetara.','Barkatu, non daude komunak?','Joan kutxara eta ordaindu han.','Edalontziak mahai gainean daude.']}
  ],
  bad:{t:['Propina','La propina'],
    eu:'Txilin, txilin, txilin… bote, bote, bote… eta horrelako zenbait zarata eta hots entzun ohi dugu tarteka-marteka tabernarik taberna ibiltzen garenean. Bai, tarteka-marteka, ez baita oso ohikoa zerbitzariari barran horrelako sari edo propinak ematea, Euskal Herrian behintzat. Dena den, esan beharra dago asko aldatzen dela herri handietatik txikietara eta tabernatik tabernara edo kafetegitik kafetegira. Halaber, nabari da atzerritarrek guk ez bezalako ohiturak dituztela eta ohituago daudela sari hauek ematen, taberna, zerbitzua edo produktuak asko gustatu zaizkielako edo euren heziketa edo ohiturak horrelakoak direlako.\n\nJatetxean beste kontu bat gertatzen da, eta herrialde bakoitzean ohitura desberdinak daude; adibidez, Ameriketako Estatu Batuetan kontuan % 10 gehitzen omen dute, eta horrela bezeroari automatikoki kentzen diote aipatu propina. Hemen, horrelakorik gertatzen ez bada ere, mostradorean edo barran ez bezala, jatetxean bai badugu propina uzteko ohitura.',
    es:'Txilin, txilin, txilin… bote, bote, bote… De vez en cuando solemos oír este tipo de ruidos cuando andamos de bar en bar. De vez en cuando, ya que en Euskal Herria no es demasiado habitual dar al camarero/a este tipo de propinas en la barra. De todas maneras, hay que decir que cambia mucho de un pueblo a otro y de un bar a otro. De la misma manera, es evidente que los extranjeros/as tienen otras costumbres y están más habituados a dar propinas cuando se encuentran satisfechos con el lugar, el servicio o los productos.\n\nEn el comedor la cosa cambia, y cada país tiene sus costumbres. Por ejemplo, en Estados Unidos se añade un 10 % a la cuenta y así se le cobra al cliente automáticamente la propina. Aquí, aunque en el mostrador y en la barra no se dé, en los restaurantes sí tenemos la costumbre de dejar propina.'}
});

A2_OSTALARITZA.units.push({
  n:15, eu:'Erreserba', es:'Reserva', tomo:2, orr:53, pdf:'15-erreserba.pdf', off:0,
  helb:['Erreserba egitea.','Hacer una reserva.'],
  eg:['Oierrek erreserba egin nahi du herriko jatetxe batean. Telefonoz deitu du.','Oier quiere hacer una reserva en un restaurante del pueblo. Ha llamado por teléfono.'],
  cd:18,
  dial:[
    ['','Ring, ring…','Ring, ring…'],
    ['Zerbitzaria','Bai, esan.','Sí, diga.'],
    ['Oier','Egun on! «Kutixi» jatetxea al da?','¡Buenos días! ¿Es el restaurante «Kutixi»?'],
    ['Zerbitzaria','Bai, hala da. Zer nahi duzu?','Sí, así es. ¿Qué quería?'],
    ['Oier','Begira, bihar gauerako erreserba bat egin nahi dut.','Mire, quería hacer una reserva para mañana por la noche.'],
    ['Zerbitzaria','Bihar gauerako, bai. Zenbat lagunentzat?','Para mañana por la noche, sí. ¿Para cuántas personas?'],
    ['Oier','Zazpi lagun izango gara.','Seremos siete personas.'],
    ['Zerbitzaria','Ondo da, noren izenean?','Está bien, ¿a nombre de quién?'],
    ['Oier','Oier Artabururena.','A nombre de Oier Artaburu.'],
    ['Zerbitzaria','Menua aukeratu nahi al duzue?','¿Quieren elegir el menú?'],
    ['Oier','Bai, konplikaziorik gabekoa… Entsalada batzuk, ganbak, pate pixka bat eta urdaiazpikoa. Eta gainerako, arraina.','Sí, algo simple. Unas ensaladas, gambas, un poco de paté y jamón. Y de segundo, pescado.'],
    ['Zerbitzaria','Ederki! Zein ordutan afaldu nahi duzue?','¡Muy bien! ¿A qué hora quieren cenar?'],
    ['Oier','Bederatziak aldera.','Alrededor de las nueve.'],
    ['Zerbitzaria','Oso ondo. Bihar arte, orduan.','Muy bien. Hasta mañana, entonces.'],
    ['Oier','Bihar arte, bai.','Sí, hasta mañana.']
  ],
  ar:[
    {k:'1', eu:'Lotu galderak eta erantzunak.', es:'Une las preguntas y las respuestas.', o:56,
      it:['Zenbat lagunentzat?','Zein ordutan?','Noizko?'],
      op:['Seiak aldera.','Lau lagunentzat.','Bihar gauerako.'],
      sol:['Lau lagunentzat.','Seiak aldera.','Bihar gauerako.']},
    {k:'2', eu:'Lotu argazkiak eta hitzak.', es:'Une las fotografías y las palabras.', m:'irudia', o:56,
      it:['a argazkia','b argazkia','c argazkia','d argazkia'],
      op:['zazpi ganba','sei arrain','bost lagun','bi entsalada'],
      sol:['zazpi ganba','bost lagun','sei arrain','bi entsalada']},
    {k:'3', eu:'Zein ordutan afaldu nahi duzu? Ereduari jarraituz eta erlojuei begiratuta, osatu esaldiak (09:00 → Bederatziak aldera afaldu nahi dut).', es:'Siguiendo el ejemplo y mirando los relojes, completa las frases.', o:56,
      it:['12:00 — … bazkaldu nahi du.','17:00 — … joango gara.','20:00 — … etorriko dira.'],
      sol:['Hamabiak aldera bazkaldu nahi du.','Bostak aldera joango gara.','Zortziak aldera etorriko dira.']},
    {k:'4', eu:'Lotu euskaraz eta gaztelaniaz esanahi bera duten esaldiak.', es:'Une las frases que tienen el mismo significado en euskera y en castellano.', o:57,
      it:['Bihar gauerako.','Lau lagun izango gara.','Noren izenean?','Gainerako, haragia.'],
      op:['¿A nombre de quién?','De segundo, carne.','Para mañana por la noche.','Seremos cuatro personas.'],
      sol:['Para mañana por la noche.','Seremos cuatro personas.','¿A nombre de quién?','De segundo, carne.']},
    {k:'5', eu:'Euskara ezazu jatetxeko menua.', es:'Pon en euskera el menú.', o:57,
      it:['Primer plato: jamón, espárragos, paté, almejas, ensaladas.','Segundo plato — carne: costilla, chuleta, escalope, solomillo · pescados: merluza, bacalao, anchoas, rape.','Postres: tarta de queso, helado, cuajada, flan, tarta de manzana.'],
      sol:['Lehenengo platera: urdaiazpikoa, esparragoak, patea, almejak, entsaladak.','Bigarren platera — haragia: sahietsa, txuleta, eskalopea, solomiloa · arraina: legatza, makailaoa, antxoa, itsasapoa.','Postreak / azkenburukoak: gazta-tarta, izozkia, mamia, flana, sagar-tarta.']}
  ],
  az:[
    ['A','Telefonoa hartzeko · Para coger el teléfono','<ul><li><b>Bai, nor da?</b> (o <b>Zein da?</b>) — ¿Quién es?</li><li><b>Bai, esan.</b> — Sí, diga.</li><li><b>«…» jatetxea, nor da?</b> — Restaurante «…», ¿quién es?</li><li><b>«…» jatetxea, egun on!</b> (o gabon, arratsalde on) — Restaurante «…», buenos días (buenas noches, buenas tardes).</li></ul>'],
    ['B','Erreserba bat egiteko galderak · Preguntas para hacer una reserva','<p><b>Para cuándo — Noizko?</b> — <i>Bihar gauerako.</i> (para mañana por la noche) · Estructura: <b>día / momento + (e)RAKO</b>: <b>biharko</b> (para mañana) · <b>gaur gauerako</b> (para hoy por la noche).</p><p><b>Cuánta gente — Zenbat lagunentzat?</b> — <i>Zazpi lagunentzat.</i> · Estructura: <b>número + lagunentzat</b>: <b>zortzi lagunentzat</b>.</p><p><b>Hora — Zein ordutan?</b> (afaldu / bazkaldu nahi duzue) — <i>Bederatzietan</i> (hora + etan). Si no somos tan exactos: <b>bederatziak aldera</b> · <b>bederatziak inguruan</b> (alrededor de las nueve).</p>'],
    ['C','Noiz? · ¿Cuándo?','<p><b>herenegun</b> anteayer · <b>atzo</b> ayer · <b>gaur</b> hoy · <b>bihar</b> mañana · <b>etzi</b> pasado mañana</p><p><b>astelehena</b> lunes · <b>asteartea</b> martes · <b>asteazkena</b> miércoles · <b>osteguna</b> jueves · <b>ostirala</b> viernes · <b>larunbata / zapatua</b> sábado · <b>igandea / domeka</b> domingo</p>'],
    ['D','Beste kontu batzuk · Algunas otras cosas','<ul><li><b>Datorren astean / astelehenean / asteartean…</b> — La semana / el lunes / el martes que viene.</li><li><b>Hurrengo astean / astelehenean / asteartean…</b> — La próxima semana, el próximo lunes, martes…</li></ul>']
  ],
  hz:[
    ['Denbora adierazteko','Para expresar el tiempo',[['Arratsalde','Tarde'],['Aste','Semana'],['Astearte','Martes'],['Asteazken','Miércoles'],['Astelehen','Lunes'],['Bihar','Mañana'],['Datorren','El que viene'],['Egun','Día'],['Etzi','Pasado mañana'],['Gau','Noche'],['Gaur','Hoy'],['Hurrengo','Próximo'],['Igande; Domeka','Domingo'],['Larunbat; Zapatu','Sábado'],['Ostegun','Jueves'],['Ostiral','Viernes']]],
    ['Bestelakoak','Otros',[['Bazkaldu','Comer'],['Erraza; Sinple','Simple'],['Erreserba','Reserva'],['Lagun','Persona; amigo/a']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Antxoa','Anchoa'],['Itsas-zapo','Rape'],['Ardo','Vino'],['Arrain','Pescado'],['Azpizun','Solomillo'],['Bigarren plater','Segundo plato'],['Entsalada','Ensalada'],['Eskalope','Escalope'],['Flan; Budin','Flan'],['Ganba','Gamba'],['Gazta-tarta','Tarta de queso'],['Haragi','Carne'],['Izozki','Helado'],['Legatz','Merluza'],['Lehenengo plater','Primer plato'],['Bakailao','Bacalao'],['Mamia','Cuajada'],['Ogi','Pan'],['Pate','Paté'],['Postre; Azkenburuko','Postre'],['Sagardo','Sidra'],['Sagar-tarta','Tarta de manzana'],['Sahiets','Costilla'],['Txuleta','Chuleta'],['Ur','Agua'],['Urdaiazpiko','Jamón']]],
    ['Esaldi eginak','Frases habituales',[['Bai, hala da','Sí, así es'],['Begira','Mira'],['Erreserba bat egin nahi dut','Quiero hacer una reserva'],['Eta gainerako','Y de segundo'],['Noren izenean','A nombre de quién'],['Ondo da','Está bien']]]
  ],
  er:[
    {k:'A', eu:'Sailkatu jaki hauek (haragiak / arrainak / postreak).', es:'Clasifica estas comidas (carnes / pescados / postres).', o:62,
      it:['txuleta · sagar-tarta · antxoak · mamia · eskalopea · xerra · flana · makailaoa · legatza · bixigua · izozkia · sahietsa'],
      sol:'HARAGIAK: txuleta, eskalopea, xerra, sahietsa · ARRAINAK: antxoak, makailaoa, legatza, bixigua · POSTREAK: sagar-tarta, mamia, flana, izozkia.'},
    {k:'B', eu:'Jar ezazu euskaraz gaztelaniaz dagoena.', es:'Pon en euskera lo que está en castellano.', o:62,
      it:['Ane: Para hoy a la noche erreserba bat egin nahi dut.','Zerbitzaria: ¿Para cuántas personas?','Ane: Diez lagun izango gara.','Zerbitzaria: ¿A qué hora?','Ane: Alrededor de las siete.','Zerbitzaria: Oso ondo. Gero arte!'],
      sol:['Gaur gauerako erreserba bat egin nahi dut.','Zenbat lagunentzat?','Hamar lagun izango gara.','Zein ordutan?','Zazpiak aldera.','Oso ondo. Gero arte!']},
    {k:'C', eu:'Lotu irudiak eta hitzak.', es:'Une las palabras y los dibujos.', m:'irudia', o:62,
      it:['a (dos personas)','b (cenando, de noche)','c (reloj a las nueve)','d (comiendo, de día)'],
      op:['Afaldu','Bazkaldu','Bi lagun','Bederatzietan'],
      sol:['Bi lagun','Afaldu','Bederatzietan','Bazkaldu']},
    {k:'D', eu:'Bete itzazu falta diren datuak marrazkiei begiratuta.', es:'Llena los datos que faltan mirando los dibujos.', m:'irudia', o:62,
      it:['Zenbat lagun?','Zein ordutan?','Menua:'],
      sol:['Sei lagun.','Hamarretan.','Entsalada, arraina, kafea.']}
  ],
  bad:{t:['Elkarte gastronomikoa','La sociedad gastronómica'],
    eu:'Euskal Herrian elkarte gastronomikoetan parte hartzeko ohitura aspalditik datorren kontua da.\n\nHonelako elkarte bat osatzeko, jarraitu beharreko pausoak ondorengoak dira: bazkide izan nahi dutenen konpromisoa lortu, lokala erosi, lokalaren egokitze-lanak egin, barne-funtzionamendua arautzeko estatutuak onartu eta elkarteen erregistroetan inskribatu. Elkartean bazkideek osaturiko batzorde bat egon ohi da, eta batzorde horrek egiten ditu erosketak, zenbaketa eta gainerako betebehar guztien kontrola.\n\nElkartea bazkideek familia edo lagun arteko afariak, bazkariak, etab. egiteko erabiltzen dute, baita bakoitzak sukaldean duen abilezia frogatzeko ere! Orain dela gutxira arte, zenbaitetan emakumezkoek sarrera bera ere debekatuta zuten. Zorionez, azken urteotan aurrerapauso handiak eman dira, eta elkarte gehienetan sartu ez ezik, bazkide izateko eskubidea ere badute emakumezkoek.',
    es:'En Euskal Herria, la costumbre de formar parte de una sociedad viene de hace mucho tiempo.\n\nEstos son los pasos para formar una sociedad: comprometer a los que quieran ser socios/as, comprar el local, hacer las obras necesarias, aprobar unos estatutos que regirán el funcionamiento e inscribirla en el registro de sociedades. En la sociedad hay una junta formada por socios/as que se encarga de las compras, la contabilidad y el control de todas las actividades.\n\nEstas sociedades se utilizan para hacer cenas, comidas, etc. con amigos/as o familiares, ¡y también para probar la habilidad de los socios/as en la cocina! Hasta hace muy poco, en algunas de estas sociedades las mujeres no podían ni entrar. Por suerte las cosas han cambiado y ahora, en la mayoría de las sociedades, las mujeres tienen derecho no solo a entrar, sino también a ser socias.'}
});

A2_OSTALARITZA.units.push({
  n:16, eu:'Koktela', es:'Cóctel', tomo:2, orr:65, pdf:'16-koktela.pdf', off:0,
  helb:['Koktela eskaintzea.','Ofrecer el cóctel.'],
  eg:['Ezkontza batean gaude. Jende asko dago eta zerbitzariak batetik bestera dabiltza koktela eskainiz.','Estamos en una boda. Hay mucha gente y los camareros andan de un lado para otro ofreciendo el cóctel.'],
  cd:19,
  dial:[
    ['Zerbitzaria','Kroketarik?','¿Croquetas?'],
    ['Emakumea','Bai, eskerrik asko!','Sí, gracias.'],
    ['Zerbitzaria','Kontuz! Oso beroak daude!','¡Cuidado! Están muy calientes.'],
    ['Zerbitzaria','Edateko? Koktel kopa bat?','¿Algo para beber? ¿Una copa de cóctel?'],
    ['Gizona','Bai, bai, baina koktelik ez, ardoa nahiago dut.','Sí, sí, pero cóctel no, prefiero vino.'],
    ['Zerbitzaria','Beltza ala gorria?','¿Tinto o clarete?'],
    ['Gizona','Gorria, mesedez.','Clarete, por favor.'],
    ['Zerbitzaria','Segituan.','Enseguida.'],
    ['Bikotea','Zer dira hauek?','¿Qué son estos?'],
    ['Zerbitzaria','Hauek onddo vol-au-ventak.','Estos son vol-au-vents de hongos.'],
    ['Emakumea','Oso goxoak ematen dute, bat hartuko dut.','Parecen muy buenos, cogeré uno.'],
    ['Gizona','Nik ere bai.','Yo también.'],
    ['Zerbitzaria','Bai, eta tori serbileta pare bat.','Sí, y aquí tenéis un par de servilletas.']
  ],
  ar:[
    {k:'1', eu:'Lotu hitzak eta irudiak.', es:'Une las palabras y las imágenes.', m:'irudia', o:68,
      it:['a argazkia','b argazkia','c argazkia','d argazkia'],
      op:['Kopa','Kroketak','Vol-au-ventak','Serbileta'],
      sol:['Kopa','Kroketak','Vol-au-ventak','Serbileta']},
    {k:'2', eu:'Jarri globoak dagokien lekuan, adibidean bezala. Globoak: a «Langostinorik?» · b «Esparrago albardatuak dira.» · c «Zer dira hauek?» · d «Bai, eskerrik asko.» · e «Koktel pixka bat ekarriko didazu?» · f «Bai, segituan.»', es:'Pon los globos en el lugar que corresponda, como en el ejemplo.', m:'irudia', o:68,
      it:['1. bineta (langostinos)','2. bineta (espárragos)','3. bineta'],
      sol:['Zerbitzaria: Langostinorik? (a) — Bezeroa: Bai, eskerrik asko. (d)','Bezeroa: Zer dira hauek? (c) — Zerbitzaria: Esparrago albardatuak dira. (b)','Bezeroa: Koktel pixka bat ekarriko didazu? (e) — Zerbitzaria: Bai, segituan. (f)']},
    {k:'3', eu:'Lotu euskaraz eta erdaraz esanahi bera duten esaldiak.', es:'Une las frases que tengan igual significado en euskera y en castellano.', o:69,
      it:['Oso beroak daude.','Edateko?','Tori serbileta bat.','Gazta vol-au-ventak.','Zer dira hauek?'],
      op:['Coge una servilleta.','¿Para beber?','Están muy calientes.','¿Qué son estos?','Vol-au-vents de queso.'],
      sol:['Están muy calientes.','¿Para beber?','Coge una servilleta.','Vol-au-vents de queso.','¿Qué son estos?']},
    {k:'4', eu:'Zer dira hauek? Jarri «E» edatekoak badira eta «J» jatekoak badira.', es:'¿Qué son estos? Pon una «E» si son bebidas y una «J» si son comidas.', o:69,
      it:['Koktela','Esparragoak','Ardo gorria','Kroketa','Langostinoak','Vol-au-venta','Urdaiazpikoa','Freskagarria'],
      sol:['E','J','E','J','J','J','J','E']}
  ],
  az:[
    ['A','Zer da hau? Zer dira hauek? · ¿Qué es esto? ¿Qué son estos?','<p>Lo que se ofrece en los cócteles suele ser bastante especial, y la pregunta más frecuente será esta:</p><ul><li>Singular: <b>Zer da hau / hori?</b> — <b>Hau (objeto) da.</b></li><li>Plural: <b>Zer dira hauek / horiek?</b> — <b>Hauek (objetos) dira.</b></li></ul><p><b>Zer dira hauek? Hauek txanpinoiak dira.</b> — ¿Qué son estos? Estos son champiñones.<br><b>Zer da hori? Hau txanpain-koktela da.</b> — ¿Qué es eso? Esto es cóctel de champán.</p>'],
    ['B','Gauzak eskaintzeko · Para ofrecer cosas','<p>Aquí hace falta algo que se diga rápido, y esto es lo más fácil: <b>OBJETO + RIK?</b></p><ul><li><b>Kroketarik?</b> — ¿Croquetas?</li><li><b>Edatekorik?</b> — ¿Algo para beber?</li></ul><p>También: <b>Edateko zerbait nahi duzu / duzue?</b> (¿quieres / queréis algo para beber?) · <b>Kroketa bat nahi duzu / duzue?</b> (¿quieres una croqueta?) · <b>Kroketarik nahi duzu / duzue?</b> (¿quieres croquetas?).</p>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Aukeratu','Elegir'],['Bota','Tirar'],['Bukatu','Terminar'],['Egon','Estar'],['Ekarri','Traer'],['Eraman','Llevar'],['Eskaini','Ofrecer'],['Eskertu','Agradecer'],['Hartu','Coger'],['Ibili','Andar'],['Izan','Ser'],['Nahi izan','Querer'],['Nahiago izan','Preferir']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Albardatu; Arrautza-irinetan pasatu','Albardado; rebozado'],['Ardo gorri / txuri / beltz','Vino clarete / blanco / tinto'],['Arrautza','Huevo'],['Bete','Relleno'],['Bexamel','Bechamel'],['Esparrago','Espárrago'],['Freskagarri','Refresco'],['Frijitu','Frito'],['Gazta','Queso'],['Jelatina','Gelatina'],['Kaba','Cava'],['Kanape','Canapé'],['Koktel','Cóctel'],['Langostino','Langostino'],['Mingain','Lengua'],['Ogi','Pan'],['Onddo','Hongo'],['Perretxiko','Seta'],['Piper','Pimiento'],['Txanpain','Champán'],['Ur','Agua'],['Vol-au-vent','Vol-au-vent'],['Zizka-mizka','Entremés']]],
    ['Bestelakoak','Otros',[['Batzuk','Algunos/as'],['Bero','Caliente'],['Edalontzi','Vaso'],['Edango dugu','Beberemos'],['Edateko','Para beber'],['Ere bai','También'],['Hartuko dut','Tomaré'],['Hotz','Frío'],['Kopa','Copa'],['Mahai','Mesa'],['Plater','Plato'],['Serbileta','Servilleta']]]
  ],
  er:[
    {k:'A', eu:'Jarri izenak irudi hauei.', es:'Pon los nombres a estas imágenes.', m:'irudia', o:74,
      it:['a argazkia','b argazkia','c argazkia','d argazkia'],
      sol:['Urdaiazpikoa','Langostinoak','Frijituak','Zumoa']},
    {k:'B', eu:'Jarri esaldi hauek euskaraz.', es:'Pon estas frases en euskera.', o:74,
      it:['Estas son croquetas de jamón.','¿Agua o vino?','¿Un langostino?','Toma una copa.'],
      sol:['Hauek urdaiazpiko-kroketak dira.','Ura ala ardoa?','Langostinorik?','Hartu / Tori kopa bat.']},
    {k:'C', eu:'Begiratu irudiei eta jar ezazu galdera bakoitzari dagokion erantzuna.', es:'Mira los dibujos y pon la respuesta adecuada a cada pregunta.', m:'irudia', o:74,
      it:['Zer dira hauek? (1. argazkia)','Zer da hau? (2. argazkia)','Zer dira hauek? (3. argazkia)'],
      sol:['Hauek esparrago albardatuak dira.','Hau ardo gorria da.','Hauek kanape bariatuak dira.']}
  ],
  bad:{t:['Angulak','Las angulas'],
    eu:'Prezioa dela eta, oso noizean behin jateko dira angulak. Itsasadarretan harrapatzen dira azaroa eta apirila bitartean; bolada hori aukeratzen dute ibaietan gora igotzeko. «Zuri» harrapatzen dira, haztegietan zertxobait gizentzen dira eta orduan irteten zaie duten marra beltza. Normalean garbituta eta egosita saltzen diren arren, Iparraldean bizirik ere saltzen dira.\n\nOso gureak dira angulak eta oso errotuta daude gure ohituretan; izan ere, Hendaian angulen kofradia sortu da.\n\nBa al dakizu prestatzen? Hementxe duzu angula bikainak prestatzeko errezeta: kazuela berotzen jarri eta olioa eta baratxuria zatitan bota. Baratxuria gorritzean, bota angulak eta su bizian jarri; asko eragin, kiskal ez daitezen. Pipermin puska txiki bat gehitu eta mahaira!',
    es:'Debido a su precio, las angulas son para comer muy de vez en cuando. Se capturan en los brazos de mar entre noviembre y abril, que es la época que aprovechan para subir río arriba. Se capturan blancas y luego se llevan a los viveros, donde se engordan un poco; es ahí donde les sale la raya negra que tienen. Aunque normalmente se venden limpias y cocidas, en Iparralde también se venden vivas.\n\nLas angulas están muy enraizadas en nuestra cultura, son muy nuestras: tanto que en Hendaia se ha creado la Cofradía de las angulas.\n\n¿Sabes prepararlas? Aquí tienes una receta para unas angulas excelentes: pon a calentar una cazuela y echa el aceite y el ajo en trocitos. Cuando se dore el ajo, echa las angulas a fuego vivo y revuélvelas mucho para que no se quemen. Agrega un trocito de guindilla ¡y a la mesa!'}
});

A2_OSTALARITZA.units.push({
  n:17, eu:'Eguneko menua', es:'Menú del día', tomo:2, orr:77, pdf:'17-eguneko-menua.pdf', off:0,
  helb:['Eguneko menua eskaini eta eskaera ulertzea.','Ofrecer el menú del día y entender el pedido.'],
  eg:['Olatz lanean aritu da. Eguerdiko ordu bata da eta bazkaltzera joan da taberna batera.','Olatz ha estado trabajando. Es la una del mediodía y ha ido a comer a un bar-restaurante.'],
  cd:20,
  dial:[
    ['Olatz','Kaixo!','¡Hola!'],
    ['Zerbitzaria','Kaixo!','¡Hola!'],
    ['Olatz','Eguneko menua nahi nuke. Zer daukazue?','Quisiera el menú del día. ¿Qué tenéis?'],
    ['Zerbitzaria','Hasteko, babarrun zuriak, entsalada eta paella dauzkazu.','De primero tienes alubias blancas, ensalada y paella.'],
    ['Olatz','Babarrun zuriak hartuko ditut.','Comeré alubias blancas.'],
    ['Zerbitzaria','Bigarrena, xerra albardatua, legatz frijitua eta haragi gisatua.','De segundo, filete empanado, merluza frita y carne guisada.'],
    ['Olatz','Xerra albardatua.','Filete empanado.'],
    ['Zerbitzaria','Oso ondo. Edateko?','Muy bien. ¿Para beber?'],
    ['Olatz','Ardoa, mesedez. Beltza.','Vino, por favor. Tinto.'],
    ['Zerbitzaria','Hemen dauzkazu babarrunak. Xerra patatekin ala letxugarekin nahi duzu?','Aquí tienes las alubias. ¿El filete lo quieres con patatas o con lechuga?'],
    ['Olatz','Letxugarekin, faborez.','Con lechuga, por favor.'],
    ['Zerbitzaria','Ederki.','Muy bien.'],
    ['Zerbitzaria','Postrerik hartuko duzu? Arroz-esnea, jogurta eta mamia dauzkagu.','¿Vas a tomar postre? Tenemos arroz con leche, yogur y cuajada.'],
    ['Olatz','Arroz-esnea eta kafe bat, mesedez.','Arroz con leche y un café, por favor.'],
    ['Zerbitzaria','Ondo da, segituan ekarriko dizut.','Vale, enseguida te lo traigo.']
  ],
  ar:[
    {k:'1', eu:'Marka ezazu gurutze batez Olatzek eskatzen duena.', es:'Marca con una cruz lo que pide Olatz.', o:80,
      it:['Lehenengo platera: garbantzuak · babarrun zuriak · paella · entsalada · zopa','Bigarren platera: oilaskoa · legatz frijitua · haragi gisatua · xerra albardatua · txerri-txuletak','Postrea: mamia · arroz-esnea · jogurta · frutak · flana'],
      sol:['babarrun zuriak','xerra albardatua','arroz-esnea']},
    {k:'2', eu:'Lotu irudiak eta hitzak.', es:'Une las palabras y las imágenes.', m:'irudia', o:80,
      it:['a marrazkia','b marrazkia','c marrazkia','d marrazkia','e marrazkia'],
      op:['babarrun zuriak','babarrun gorriak','xerrak','frutak','mamia'],
      sol:['frutak','babarrun gorriak','mamia','babarrun zuriak','xerrak']},
    {k:'3', eu:'Lotu euskaraz eta erdaraz esanahi bera duten esaldiak.', es:'Une las frases que tienen igual significado en euskera y en castellano.', o:80,
      it:['Garbantzuak hartuko ditut.','Zer daukazue?','Postrerik hartuko duzu?','Eguneko menua.','Oilaskoa patatekin.'],
      op:['¿Tomarás postre?','Menú del día.','Comeré garbanzos.','Pollo con patatas.','¿Qué tenéis?'],
      sol:['Comeré garbanzos.','¿Qué tenéis?','¿Tomarás postre?','Menú del día.','Pollo con patatas.']},
    {k:'4', eu:'Azpimarratu erantzun zuzena.', es:'Subraya la respuesta correcta.', o:81,
      it:['Zer nahi du Olatzek? (eguneko menua / menu berezia)','Zer hartuko du Olatzek? (xerra patatekin / xerra letxugarekin)','Zer edango du Olatzek? (ura edango du / ardoa edango du)'],
      sol:['Eguneko menua.','Xerra letxugarekin.','Ardoa edango du.']},
    {k:'5', eu:'Nola esaten da?', es:'¿Cómo se dice?', o:81,
      it:['merluza','alubias','filete','guisado','cuajada'],
      sol:['legatza','babarrunak','xerra','gisatua','mamia']}
  ],
  az:[
    ['A','Geroaldia · El futuro','<p>¿Te suenan «<b>hartuko dut</b>» (tomaré) o «<b>ekarriko dizut</b>» (te traeré)? Ese <b>-ko</b> pegado al verbo expresa el futuro, muy útil para preguntar a la clientela qué quiere.</p><p><b>Zer hartuko duzu?</b> ¿Qué tomarás? — <b>Haragia hartuko dut.</b> Comeré carne.</p><p>La pregunta y la respuesta tienen la misma estructura: <b>QUÉ + VERBO + KO/GO + AUXILIAR</b> — <b>Zer edango duzu?</b> — <b>Ardoa edango dut.</b> (Unas veces -ko y otras -go: depende de cómo acabe el verbo; ya lo aprenderás con el tiempo.)</p><p>El auxiliar:</p><ul><li><b>Nik</b> un objeto: verbo + <b>dut</b> · muchos objetos: verbo + <b>ditut</b></li><li><b>Zuk</b>: <b>duzu</b> / <b>dituzu</b></li><li><b>Guk</b>: <b>dugu</b> / <b>ditugu</b></li><li><b>Zuek</b>: <b>duzue</b> / <b>dituzue</b></li></ul>'],
    ['B','Prestatzeko erak · Formas de preparar','<p>Basta con tomar el verbo y añadirle <b>-a</b> o <b>-ak</b>:</p><ul><li>arraina + frijitu → <b>arrain frijitua</b> (pescado frito)</li><li>patatak + egosi → <b>patata egosiak</b> (patatas cocidas)</li></ul>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Adobatu','Adobar'],['Albardatu; Arrautza-irinetan pasatu','Empanar; albardar'],['Bete','Llenar; rellenar'],['Edan','Beber'],['Egosi','Cocer'],['Ekarri','Traer'],['Erre','Asar'],['Frijitu','Freír'],['Gisatu','Guisar'],['Hartu','Tomar; coger'],['Izoztu','Helar'],['Jan','Comer'],['Nahi izan','Querer'],['Salteatu','Saltear']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Albondiga','Albóndiga'],['Antxoa','Anchoa'],['Ardo','Vino'],['Arrautza','Huevo'],['Arroza','Arroz'],['Arroz-esne','Arroz con leche'],['Atun','Atún'],['Baba','Haba'],['Babarrun beltz','Alubia negra'],['Babarrun gorri','Alubia roja'],['Babarrun zuri','Alubia blanca'],['Flan','Flan'],['Fruta','Fruta'],['Garbantzu','Garbanzo'],['Haragi','Carne'],['Ilar','Guisante'],['Jogurt','Yogur'],['Kafe','Café'],['Legatz','Merluza'],['Leka','Vaina'],['Lenteja','Lenteja'],['Makarroi','Macarrón'],['Mamia','Cuajada'],['Natila','Natilla'],['Oilasko','Pollo'],['Paella','Paella'],['Sagardo','Sidra'],['Txerri-txuleta','Chuleta de cerdo'],['Ur','Agua'],['Xerra','Filete'],['Zopa','Sopa']]],
    ['Jaki prestatuak','Platos preparados',[['Arraina plantxan','Pescado a la plancha'],['Arrain-zopa','Sopa de pescado'],['Arrautza egosia','Huevo cocido'],['Arrautza frijitua','Huevo frito'],['Arroza txerri-kostilarekin','Arroz con costilla de cerdo'],['Atuna tomatearekin','Atún con tomate'],['Babak urdaiazpikoarekin','Habas con jamón'],['Barazki-zopa','Sopa de verduras'],['Haragi gisatua','Carne guisada'],['Legatz frijitua','Merluza frita'],['Legatza saltsan','Merluza en salsa'],['Lekak patatekin','Vainas con patatas'],['Makarroiak tomatearekin','Macarrones con tomate'],['Oilasko errea','Pollo asado'],['Petxuga plantxan','Pechuga a la plancha'],['Porru-patatak','Porrusalda'],['Xerra albardatua','Filete empanado']]],
    ['Bestelakoak','Otros',[['Eguneko menu','Menú del día'],['Era','Modo; forma'],['Menu berezi','Menú especial'],['Nahi nuke','Quisiera']]]
  ],
  er:[
    {k:'A', eu:'Euskara ezazu eguneko menu hori.', es:'Pon en euskera el menú del día.', o:86,
      it:['Primer plato: macarrones · lentejas · ensalada mixta · habas con jamón','Segundo plato: pollo asado · albóndigas · filete empanado · merluza en salsa','Postre: natillas · flan · fruta · yogur','Bebidas: vino, sidra, agua — 8 euros'],
      sol:['Lehenengo platera: makarroiak · lentejak · entsalada mistoa · babak urdaiazpikoarekin','Bigarren platera: oilasko errea · albondigak · xerra albardatua · legatza saltsan','Postrea: natilak · flana · fruta · jogurta','Edariak: ardoa, sagardoa, ura — 8 euro']},
    {k:'B', eu:'Parekatu esanahi bereko esaldiak.', es:'Une las frases de igual significado.', o:86,
      it:['Postrea hartuko dut.','Ardo gorria edango dugu.','Ogia ekarriko dut.','Xerra jango duzu?','Comeré macarrones.'],
      op:['Traeré el pan.','¿Comerás filete?','Comeré postre.','Beberemos vino clarete.','Makarroiak jango ditut.'],
      sol:['Comeré postre.','Beberemos vino clarete.','Traeré el pan.','¿Comerás filete?','Makarroiak jango ditut.']},
    {k:'C', eu:'Begiratu marrazkiei eta erantzun galderei.', es:'Mira los dibujos y contesta las preguntas.', m:'irudia', o:86,
      it:['Zerbitzaria: Zer hartuko duzu? — Bezeroa: …','Zerbitzaria: Zer hartuko duzue? — Mutila: …','… — Umea: …'],
      sol:['Oilasko errea eta patata frijituak (hartuko ditut).','Arraina plantxan (hartuko dut).','Arrautza frijitua (hartuko dut).']}
  ],
  bad:{t:['Eguneko menua','El menú del día'],
    eu:'Lehen, «eguneko menua» esanez gero, zera etortzen zitzaigun burura: jatetxe xumea, prezio onean, baina oso aukera gutxi, etab. Orain, ordea, gauzak asko aldatu dira, eta jatetxerik onenetan ere eskaintzen dute eguneko menua. Horrela bada, lehen gutxi batzuen eskura bakarrik zeuden platerak poltsiko guztientzako moduan jarrita daude. Jatetxe famatuetara joan gabe ere, edozein jatetxetan aurki dezakegu gustuko eguneko menuren bat.\n\nNormalean, bazkaria izaten da eskaintzen den otordua: hiru edo lau lehenengo plater, beste horrenbeste bigarren, postreak eta kafea eskaintzen dituzte. Edariak ere barne izaten dira batzuetan. Aukera ezin hobea dira lana dela eta etxetik kanpo bazkaldu behar eta mahaian eserita «behar den bezala» jatea gustatzen zaienentzat.',
    es:'Antes, el «menú del día» lo asociábamos a un restaurante humilde, a buen precio, pero con poca elección, etc. Ahora, en cambio, las cosas han cambiado mucho y hasta en los mejores restaurantes ofrecen menú del día. De esta manera, platos que antes solo estaban al alcance de unos pocos se han puesto al alcance de todos los bolsillos. Sin ir a restaurantes famosos, en cualquiera podemos encontrar un menú del día a nuestro gusto.\n\nNormalmente se ofrece a la hora de comer, con tres o cuatro primeros platos a escoger, otros tantos segundos, postres y café. Algunas veces también entran las bebidas. Es una oportunidad inmejorable para quienes, por trabajo, deben comer fuera de casa y les gusta comer sentados a la mesa «como debe ser».'}
});

A2_OSTALARITZA.units.push({
  n:18, eu:'Sukaldean', es:'En la cocina', tomo:2, orr:89, pdf:'18-sukaldean.pdf', off:0,
  helb:['Sukaldean erabiltzen diren instrukzioak ulertzea.','Entender las instrucciones que se dan en la cocina.'],
  eg:['Gaur lan handia dago jatetxean eta Agurtzane sukaldean ari da laguntzaile.','Hoy hay mucho trabajo en el restaurante y Agurtzane está ayudando en la cocina.'],
  cd:21,
  dial:[
    ['Agurtzane','Zer egin behar dut?','¿Qué tengo que hacer?'],
    ['Sukaldaria','Patata-tortilla egin behar dugu. Zu hasi patatak zuritzen eta gero arrautzak batituko ditugu.','Tenemos que hacer tortilla de patatas. Empieza a pelar las patatas y luego batiremos los huevos.'],
    ['Agurtzane','Ondo da.','Vale.'],
    ['Agurtzane','Patatak zurituta daude, eta txikituta ere bai.','Las patatas están peladas y troceadas.'],
    ['Sukaldaria','Oso ondo. Orain frijitu egingo ditugu. Bota olioa zartagin handian eta sutan jarri. Berotu olioa eta bota patatak.','Muy bien, ahora las freiremos. Echa aceite en la sartén grande y ponla al fuego. Calienta el aceite y echa las patatas.'],
    ['Agurtzane','Ederki.','Vale.'],
    ['Sukaldaria','Patatak eginak daude. Arrautzekin nahastu eta tortilla egingo dugu.','Las patatas ya están hechas. Las mezclaremos con los huevos y haremos la tortilla.'],
    ['Agurtzane','Hori nik egingo dut.','Eso lo haré yo.'],
    ['Sukaldaria','Bota gatz pixka bat.','Echa un poco de sal.'],
    ['Sukaldaria','Oso itxura ona dauka!','¡Tiene muy buena pinta!'],
    ['Agurtzane','Eskerrik asko! Orain zatitu eta eraman egingo dut.','¡Gracias! Ahora la parto y la llevo.']
  ],
  ar:[
    {k:'1', eu:'Zer egin behar du Agurtzanek? Ordenatu jarraitu beharreko pausuak.', es:'¿Qué debe hacer Agurtzane? Ordena los pasos a seguir.', o:92,
      it:['Zatitu eta eraman.','Patatak zuritu.','Olioa bota zartagin handian.','Arrautzekin nahastu.','Olioa berotu eta patatak frijitu.','Arrautzak batitu.','Patatak txikitu.'],
      sol:['7','1','3','6','4','5','2']},
    {k:'2', eu:'Lotu irudiak eta hitzak.', es:'Une las imágenes y las palabras.', m:'irudia', o:92,
      it:['1. argazkia','2. argazkia','3. argazkia','4. argazkia','5. argazkia','6. argazkia'],
      op:['Gatza','Sukaldaria','Zartagina','Arrautza','Sua','Olioa'],
      sol:['Zartagina','Olioa','Sua','Gatza','Sukaldaria','Arrautza']},
    {k:'3', eu:'Lotu euskaraz eta erdaraz esanahi bera duten aditzak.', es:'Une los verbos que tienen el mismo significado en euskera y en castellano.', o:92,
      it:['Batitu','Frijitu','Eraman','Bota','Zuritu','Berotu'],
      op:['Pelar','Calentar','Batir','Freír','Echar','Llevar'],
      sol:['Batir','Freír','Llevar','Echar','Pelar','Calentar']},
    {k:'4', eu:'Zer behar du Agurtzanek patata-tortilla egiteko? Marka itzazu gurutze batez Agurtzanek erabili dituen gauzak.', es:'¿Qué necesita Agurtzane para hacer una tortilla de patatas? Marca las cosas que ha utilizado.', o:93,
      it:['patatak · zartagina · sua · urdaiazpikoa · olioa · edalontzia · arrautzak · labana · piperrak · tomatea · gatza · lapikoa'],
      sol:'patatak · zartagina · sua · olioa · arrautzak · labana · gatza.'},
    {k:'5', eu:'Azpimarratu elkarrizketan azaldu diren hitzak.', es:'Subraya las palabras que han aparecido en el diálogo.', o:93,
      it:['frijitu · eginak · txikituta · gisatua · hasi · uretan · sutan · nahastu · errea · pixka bat · eta gero · aurretik'],
      sol:'frijitu · eginak · txikituta · hasi · sutan · nahastu · pixka bat · eta gero.'}
  ],
  az:[
    ['A','Denborazkoak: aurretik, bitartean, eta gero · Antes, mientras, después','<p>Para ordenar los pasos de una receta o de unas instrucciones. Hay muchos; de momento, tres:</p><p>a. <b>VERBO + AURRETIK</b> (antes de): <b>Patatak frijitu aurretik, txikitu behar dituzu.</b> — Antes de freír las patatas, las debes trocear.</p><p>b. <b>VERBO + BITARTEAN</b> (mientras): <b>Patatak frijitu bitartean, arrautzak batituko ditut.</b> — Mientras frío las patatas, batiré los huevos.</p><p>c. <b>VERBO + ETA GERO</b> (después de): <b>Patatak frijitu eta gero, arrautzekin nahastu.</b> — Después de freír las patatas, mézclalas con los huevos.</p>'],
    ['B','Oliotan, uretan · En aceite, en agua','<ul><li><b>su</b> fuego → <b>sutan</b> en el fuego · <b>sutatik</b> del fuego</li><li><b>ur</b> agua → <b>uretan</b> en agua · <b>uretatik</b> del agua</li><li><b>olio</b> aceite → <b>oliotan</b> en aceite</li></ul><p><b>Oliotan frijitu</b> freír en aceite · <b>Uretatik atera</b> sacar del agua · <b>Sutan jarri</b> poner al fuego · <b>Sutatik kendu</b> quitar del fuego.</p>']
  ],
  hz:[
    ['Aditzak','Verbos',[['Batitu','Batir'],['Berotu','Calentar'],['Bete','Llenar; rellenar'],['Birrindu','Rallar'],['Bota','Echar'],['Bukatu','Terminar'],['Ebaki','Cortar'],['Egin','Hacer'],['Egosi','Cocer'],['Eragin','Agitar; remover'],['Eraman','Llevar'],['Erre','Asar'],['Frijitu','Freír'],['Garbitu','Limpiar'],['Gehitu','Añadir'],['Gorritu','Dorar'],['Hasi','Empezar'],['Irakin','Hervir'],['Jarri','Poner'],['Kiskali','Quemar'],['Loditu','Espesar'],['Nahastu','Mezclar'],['Puskatu','Romper'],['Salteatu','Saltear'],['Txikitu','Picar'],['Urtu','Fundir'],['Xigortu','Tostar'],['Zabaldu','Extender'],['Zatitu','Trocear'],['Zuritu','Pelar']]],
    ['Sukaldeko tresnak','Utensilios de cocina',[['Azpil','Fuente'],['Burduntzali','Cazo'],['Egurrezko koilara','Cuchara de madera'],['Ehogailu','Molinillo'],['Espatula','Espátula'],['Guraize','Tijera'],['Helduleku','Mango; asa'],['Hozkailu','Frigorífico'],['Inbutu','Embudo'],['Iragazki','Colador'],['Koilara','Cuchara'],['Labe','Horno'],['Lapiko','Puchero'],['Molde','Molde'],['Ohol','Tabla'],['Ontzi','Recipiente'],['Su','Fuego'],['Zartagin','Sartén'],['Zerra','Sierra']]],
    ['Janariak eta edariak','Comidas y bebidas',[['Arrautza','Huevo'],['Baratxuri; Berakatz','Ajo'],['Gatz','Sal'],['Letxuga','Lechuga'],['Olio','Aceite'],['Ozpin','Vinagre'],['Tipula','Cebolla'],['Tomate','Tomate']]],
    ['Bestelakoak','Otros',[['Aurretik','Antes'],['Bitartean','Mientras tanto'],['Eta gero','Después'],['Pixka bat','Un poco'],['Su bizian','A fuego fuerte'],['Su motelean','A fuego lento'],['Sukaldari','Cocinero/a']]]
  ],
  er:[
    {k:'A', eu:'Ordena itzazu argazkiak esaldien arabera.', es:'Ordena estas imágenes de acuerdo con las frases.', m:'irudia', o:98,
      it:['Lehenengo, letxuga garbitu.','Letxuga garbitu eta gero, tomateak txikitu.','Gero, tomateak eta letxuga nahastu.','Tipula bota.','Olioa, ozpina eta gatza bota.'],
      sol:['argazkia e','argazkia c','argazkia b','argazkia a','argazkia d']},
    {k:'B', eu:'Lotu irudiak eta hitzak.', es:'Une las palabras y las imágenes.', m:'irudia', o:98,
      it:['Haragia zatitu.','Lapikoa sutan jarri.','Tipulak zartaginera bota.','Baratxuria txikitu.','Tomateak garbitu.'],
      sol:['argazkia b','argazkia a','argazkia c','argazkia d','argazkia e']},
    {k:'C', eu:'Nola esaten da euskaraz?', es:'¿Cómo se dice en euskera?', o:98,
      it:['Después de limpiar la lechuga, corta el tomate.','Antes de empezar, lávate las manos.','Mientras se cuecen los macarrones, pica el ajo.'],
      sol:['Letxuga garbitu eta gero, txikitu / zatitu tomatea.','Hasi aurretik, garbitu eskuak.','Makarroiak egosi bitartean, txikitu baratxuria.']}
  ],
  bad:{t:['Produktu tipikoak','Productos típicos'],
    eu:'Gastronomiari dagokionez, herrialde guztietan legez, gurean ere zonalde bakoitzak bere berezitasuna dauka, besteengandik bereizten duen plater edo produktua. Nork ez ditu ezagutzen «Idiazabalgo gazta» edo «Gernikako piperrak»?\n\nHauek bi adibide besterik ez dira; izan ere, «txango gastronomikoa» egin nahi izanez gero, aukera ezin hobea daukagu Euskal Herrian. Animatuko al zinateke? Horrela bada, liburuko mapa lagungarri gerta dakizuke. Hori bai, bertan azaltzen direnak gutxi batzuk besterik ez dira, beste asko baitaude, baina horiek zuri dagokizu aurkitu eta dastatzea!',
    es:'En lo que se refiere a la gastronomía, al igual que en todos los países, en el nuestro cada zona tiene su especialidad, un plato o producto que la distingue de las demás. ¿Quién no conoce el «queso de Idiazabal» o los «pimientos de Gernika»?\n\nEstos son solo dos ejemplos: si quieres hacer un recorrido gastronómico, Euskal Herria ofrece una oportunidad inmejorable. ¿Te animarías? Si es así, el mapa del libro te puede ayudar. Eso sí, lo que aparece ahí es solo una muestra, pues hay muchos más… ¡pero te toca a ti descubrirlos y saborearlos!'}
});

A2_OSTALARITZA.units.push({
  n:19, eu:'Hornitzailea', es:'Proveedor/a', tomo:2, orr:101, pdf:'19-hornitzailea.pdf', off:0,
  helb:['Hornitzaileei eskaerak egitea.','Hacer el pedido a los proveedores.'],
  eg:['Maiderrek edari batzuk behar ditu eta edari-banatzaileari deitu dio telefonoz.','Maider necesita algunas bebidas y ha llamado por teléfono al proveedor.'],
  cd:22,
  oh:['⚠ La versión castellana del libro dice «una (caja) de sidra»; el diálogo en euskera y el solucionario dicen «3 kaxa sagardo». Aquí se sigue el euskera.',
      '⚠ El hiztegia 19.4 del libro es, por error, una copia del de la unidad 9 (golosinas). El vocabulario de abajo está sacado de esta misma unidad (diálogo, explicaciones y ejercicios): no es la lista del libro.'],
  dial:[
    ['Maider','Kaixo, egun on! Maider naiz, «Kupela» jatetxekoa.','Hola, buenos días. Soy Maider, del restaurante «Kupela».'],
    ['Hornitzailea','Egun on! Zer nahi duzu?','Buenos días. ¿Qué necesitáis?'],
    ['Maider','Begira, atzo ia ezer gabe geratu ginen eta edari batzuk eskatu nahi dizkizut.','Mira, ayer nos quedamos casi sin nada y quiero pedirte algunas bebidas.'],
    ['Hornitzailea','Ederki. Zer behar duzue?','Muy bien. ¿Cuáles?'],
    ['Maider','Lau kaxa ardo beltz, bi gorri eta zuri bat. Txakolinik eta sagardorik badaukazue?','Cuatro cajas de vino tinto, dos de clarete y una de blanco. ¿Tenéis chacolí y sidra?'],
    ['Hornitzailea','Jakina!','¡Por supuesto!'],
    ['Maider','Primeran! Orduan, lehen esandakoaz gain, ekarri bi kaxa txakolin eta 3 kaxa sagardo. Noiz ekarriko dizkidazue?','¡Perfecto! Entonces, además de lo dicho antes, traed dos cajas de chacolí y tres de sidra. ¿Cuándo me las traeréis?'],
    ['Hornitzailea','Ez dakit, mutila atera da banaketak egitera eta hamabiak baino lehen oso zaila izango da. 12:30etarako eramango dizkizu.','No sé. El chico ha salido a hacer el reparto y antes de las doce será muy difícil. Te las llevará para las doce y media.'],
    ['Maider','12:30etarako ekartzea nahikoa da, ordu batean hasten gara bazkariak ematen. Baina ez hutsik egin, ezer gabe gaude eta!','Con traerlas para las doce y media es suficiente; empezamos a dar comidas a la una. Pero traedlas sin falta, ¡que estamos sin nada!'],
    ['Hornitzailea','Lasai, andrea, hortxe edukiko duzu dena 12:30etan.','¡Tranquila, mujer! Lo tendrás todo ahí a las doce y media.'],
    ['Maider','Ondo da. Gero arte, orduan.','Está bien. Entonces, hasta luego.'],
    ['Hornitzailea','Bai, gero arte.','Sí, hasta luego.']
  ],
  ar:[
    {k:'1', eu:'Elkarrizketa entzuten duzun bitartean, osa itzazu Maiderren eskaeran falta diren datuak.', es:'Mientras escuchas el diálogo, completa los datos que faltan en el pedido de Maider.', m:'cd', cdp:22, o:104,
      it:['LAU … ARDO BELTZ','… GORRI','… … ARDO ZURI','… … TXAKOLIN','HIRU KAXA …'],
      sol:['LAU KAXA ARDO BELTZ','BI GORRI','KAXA BAT ARDO ZURI','BI KAXA TXAKOLIN','HIRU KAXA SAGARDO']},
    {k:'2', eu:'Jar itzazu edari hauen izenak.', es:'Pon el nombre a estas bebidas.', m:'irudia', o:104,
      it:['1. argazkia','2. argazkia','3. argazkia','4. argazkia','5. argazkia'],
      sol:['Sagardoa','Ardo gorria','Ardo zuria','Ardo beltza','Garagardoa']},
    {k:'3', eu:'Lotu galderak eta erantzunak.', es:'Une las preguntas y las respuestas.', o:104,
      it:['Noiz ekarriko dizkidazue?','Zer nahi duzu?','Noizko behar duzu?','Sagardorik badaukazue?'],
      op:['Lau kaxa ardo gorri.','Jakina!','Hamabi eta erdietan.','Biharko behar dut.'],
      sol:['Hamabi eta erdietan.','Lau kaxa ardo gorri.','Biharko behar dut.','Jakina!']},
    {k:'4', eu:'Lotu erdaraz eta euskaraz esanahi bera duten esaldiak.', es:'Une las frases que tienen el mismo significado en euskera y en castellano.', o:105,
      it:['Ezer gabe gaude.','12:30etarako eramango dizu.','Bi kaxa garagardo.','Oso zaila izango da.'],
      op:['Dos cajas de cerveza.','Será muy difícil.','Estamos sin nada.','Te lo llevará para las doce y media.'],
      sol:['Estamos sin nada.','Te lo llevará para las doce y media.','Dos cajas de cerveza.','Será muy difícil.']},
    {k:'5', eu:'Markatu gurutze batez elkarrizketan azaldu diren hitzak.', es:'Marca con una cruz las palabras que aparecen en el diálogo.', o:105,
      it:['kaxa · banaketa · patatak · ura · eraman · ordaindu · kobratu · eskatu · ireki · afariak · nahikoa · ezer gabe · sagardo · noiz · jakina'],
      sol:'kaxa · banaketa · eraman · eskatu · nahikoa · ezer gabe · sagardo · noiz · jakina.'}
  ],
  az:[
    ['A','Bai, nor da? · Sí, ¿quién es?','<p>Cuando llamamos por teléfono solemos identificarnos:</p><ul><li><b>Bai, nor da? / Zein da?</b> — Sí, ¿quién es?</li><li><b>Maider naiz, «Kupela» jatetxekoa.</b> — Soy Maider, del restaurante «Kupela».</li></ul><p>Estructura: <b>NOMBRE + NAIZ, NOMBRE + JATETXE / TABERNA + KOA</b> — <b>Alaitz naiz, «Tximist» tabernakoa.</b> Soy Alaitz, del bar «Tximist».</p>'],
    ['B','Lau kaxa ardo gorri · Cuatro cajas de vino clarete','<p>Para expresar cantidades al hacer un pedido: <b>NÚMERO + BOTILA / KAXA / BIDOI / POLTSA + PRODUCTO</b>.</p><p><b>Zer behar duzu?</b> — <b>Lau kaxa ardo gorri behar ditut.</b></p><ul><li><b>Hiru kaxa ardo beltz</b> — tres cajas de vino tinto</li><li><b>Lau bidoi olio</b> — cuatro bidones de aceite</li><li><b>Hamar botila ur</b> — diez botellas de agua</li></ul>'],
    ['C','Noiz? / Noizko? · ¿Cuándo? / ¿Para cuándo?','<p>a. <b>Noiz ekarriko didazu / didazue / dit?</b> — ¿Cuándo me traerás / traeréis / traerá? → <b>Bihar eramango dizut / dizugu / dizu.</b> — Mañana te llevaré / llevaremos / llevará.</p><p>Algunos «noiz»: <b>gaur</b> (hoy), <b>bihar</b> (mañana), <b>gero</b> (después), <b>laster</b> (pronto), hora + <b>etan</b> (hamabietan, bederatzi eta erdietan), día + <b>ean</b> (astelehenean, asteartean, larunbatean).</p><p>b. <b>Noizko ekarriko didazu / didazue / dit?</b> — ¿Para cuándo me traerás…? → <b>Biharko eramango dizut / dizugu / dizu.</b> — Para mañana te lo llevaré…</p><p>Algunos «noizko»: <b>gaurko</b> (para hoy), <b>biharko</b> (para mañana), hora + <b>etarako</b> (hamabietarako, zortzi eta erdietarako, seietarako), día + <b>erako</b> (astelehenerako, ostegunerako).</p>']
  ],
  hz:[
    ['⚠ Aditzak','Verbos',[['Eskatu','Pedir'],['Ekarri','Traer'],['Eraman','Llevar'],['Geratu','Quedar(se)'],['Atera','Salir'],['Hasi','Empezar'],['Eduki','Tener'],['Deitu','Llamar']]],
    ['⚠ Ontziak eta kantitateak','Envases y cantidades',[['Kaxa','Caja'],['Botila','Botella'],['Bidoi','Bidón'],['Poltsa','Bolsa'],['Zaku','Saco'],['Lata','Lata']]],
    ['⚠ Edariak eta gaiak','Bebidas y productos',[['Ardo beltz','Vino tinto'],['Ardo gorri','Clarete'],['Ardo zuri','Vino blanco'],['Txakolin','Chacolí'],['Sagardo','Sidra'],['Garagardo','Cerveza'],['Ur','Agua'],['Olio','Aceite'],['Patata','Patata'],['Piper','Pimiento']]],
    ['⚠ Besterik','Otros',[['Hornitzaile','Proveedor/a'],['Edari-banatzaile','Distribuidor/a de bebidas'],['Banaketa','Reparto'],['Eskaera','Pedido'],['Ezer gabe','Sin nada'],['Nahikoa','Suficiente'],['Jakina','Por supuesto'],['Primeran','Perfecto; muy bien'],['Ez hutsik egin!','¡Sin falta!'],['Noiz','Cuándo'],['Noizko','Para cuándo'],['Laster','Pronto'],['Gero arte','Hasta luego']]]
  ],
  er:[
    {k:'A', eu:'Euskaratu ezazu elkarrizketa hau.', es:'Pon en euskera este diálogo.', o:110,
      it:['Proveedor: Sí, ¿quién es?','Leire: Hola, soy Leire, del restaurante «Tripazorriak».','Proveedor: ¿Qué quieres?','Leire: Dos cajas de cerveza, tres cajas de sidra y cinco cajas de agua.','Proveedor: Muy bien, para mañana te lo llevo.','Leire: Gracias, adiós.'],
      sol:['Bai, nor da?','Kaixo! Leire naiz, «Tripazorriak» jatetxekoa.','Zer behar duzu?','Bi kaxa garagardo, hiru kaxa sagardo eta bost kaxa ur.','Oso ondo, biharko eramango dizut.','Eskerrik asko, agur.']},
    {k:'B', eu:'Osa ezazu koadro hau ereduari jarraituz (Hamaikak → Noiz? Hamaiketan · Noizko? Hamaiketarako).', es:'Completa este cuadro siguiendo el ejemplo.', o:110,
      it:['Astelehena','Goiza','Bihar','Hirurak'],
      sol:['Astelehenean · Astelehenerako','Goizean · Goizerako','Bihar · Biharko','Hiruretan · Hiruretarako']},
    {k:'C', eu:'Marrazkiei begiratuta, idatz ezazu eskaera.', es:'Escribe el pedido mirando las imágenes.', m:'irudia', o:110,
      it:['1. argazkia','2. argazkia','3. argazkia','4. argazkia','5. argazkia'],
      sol:['Hiru botila olio','Bi kaxa sagardo','Hiru zaku patata','Hamar lata piper','Bost kaxa ur']}
  ],
  bad:{t:['Bertoko garagardoa','La cerveza de aquí'],
    eu:'Orain arte, Euskal Herriko edari tipikoak aipatu behar izanez gero, sagardoa, txakolina eta Errioxako ardoa ziren burura etortzen zitzaizkigunak. Hemendik aurrera, aldiz, beste bat gehitu beharko diogu zerrenda honi. Izan ere, Bizkaiko Arratiako ibarrean garagardoa ekoizten hasi dira duela urte batzuk eta, hasiera xumea izan badu ere, orain atzerrira ere esportatzen ari dira.\n\nZein dira, bada, garagardo horren berezitasunak? Berezitasun nagusia bere ekoizpen-prozesua guztiz naturala izatea da; horixe zen, hain zuzen ere, produktua zabaltzea galarazten zien ezaugarria, garagardo horrek bizitza laburra baitzuen. Orain, berriz, bizitza luzatzea lortu dute, fabrikazioaren prozesu naturala batere aldatu gabe. Beraz, aurki Australia, Txile edota Ukrainara joanda ere, «euskal garagardoa» eskatzeko aukera izango dugu.',
    es:'Hasta ahora, si había que mencionar las bebidas típicas de Euskal Herria, hablábamos de la sidra, el chacolí y el vino de La Rioja. De ahora en adelante, en cambio, habrá que añadir una más a la lista: en el valle vizcaíno de Arratia empezaron hace unos años a fabricar cerveza y, aunque los comienzos fueron humildes, ahora exportan también al extranjero.\n\n¿Cuáles son las características de esa cerveza? La principal es que su proceso de fabricación es totalmente natural, y precisamente eso les impedía expandirse, porque el producto duraba muy poco. Ahora han conseguido alargar su caducidad sin cambiar para nada el proceso. Así que pronto, aunque vayamos a Australia, Chile o Ucrania, podremos pedir «cerveza vasca».'}
});

/* ─────────────────────────── 20. Glosategia ─────────────────────────── */

A2_OSTALARITZA.units.push({
  n:20, eu:'Hiztegia', es:'Vocabulario', tomo:2, orr:113, pdf:'20-hiztegia.pdf', off:0, glos:true,
  helb:['Unitate guztietan azaldutako hiztegia errepasatzea.','Repaso del vocabulario utilizado en todas las unidades.'],
  oh:['⚠ Erratas del libro corregidas: en 20.11 da «garratz = amargo» y «mikatz = agrio» (es al revés, como en la unidad 13); en 20.15 escribe «Pasillo» por «Pasilu»; en 20.5 falta el -rekin en «Arroza txerri-sahieskia» (aquí «txerri-sahieskiarekin»); en 20.18 incluye «Sin falta = Sin falta», que aquí va como «Hutsik egin gabe».'],
  hz:[
    ['20.1 Agurrak','Saludos',[['Adio; Agur','Adiós'],['Arratsalde on','Buenas tardes'],['Baita zuri ere','Igualmente'],['Berdin','Igualmente'],['Bihar arte','Hasta mañana'],['Egun on','Buenos días'],['Gabon','Buenas noches'],['Gabon pasa','Que pases / pasen buenas noches'],['Gero arte','Hasta luego'],['Hurrengora arte','Hasta la próxima'],['Kaixo; Iepa; Eup','Hola']]],
    ['20.2 Janariak','Comidas',[['Antxoa','Anchoa'],['Arrain','Pescado'],['Arrautza','Huevo'],['Arroz','Arroz'],['Atun','Atún'],['Azukre','Azúcar'],['Baba','Haba'],['Babarrun beltz','Alubia negra'],['Babarrun gorri','Alubia roja'],['Babarrun zuri','Alubia blanca'],['Baratxuri; Berakatz','Ajo'],['Begetal','Vegetal'],['Behatz','Dedo'],['Bexamel','Bechamel'],['Bihotz','Corazón'],['Bixigu','Besugo'],['Bolatxo','Bolita'],['Bonboi','Bombón'],['Kruasan','Cruasán'],['Esparrago; Zainzuri','Espárrago'],['Esparrago-punta','Punta de espárrago'],['Ezti','Miel'],['Fruta','Fruta'],['Gaileta','Galleta'],['Ganba','Gamba'],['Garbantzu','Garbanzo'],['Gatz','Sal'],['Gazta','Queso'],['Gizen','Grasa'],['Gominola','Gominola'],['Gozoki','Dulce; caramelo; golosina'],['Gurin; Mantekila','Mantequilla'],['Gusanito','Gusanito'],['Haragi','Carne'],['Hirugihar','Beicon'],['Ilar','Guisante'],['Itsas-zapo','Rape'],['Izozki','Helado'],['Gelatina','Gelatina'],['Sahieski','Costilla'],['Kroketa','Croqueta'],['Kukurutxo','Cucurucho'],['Langostino','Langostino'],['Laranja','Naranja'],['Legatz','Merluza'],['Leka','Vaina'],['Lenteja','Lenteja'],['Limoi','Limón'],['Maionesa','Mahonesa'],['Bakailao','Bacalao'],['Makarroi','Macarrón'],['Marrubi','Fresa'],['Melokotoi','Melocotón'],['Marmelada','Mermelada'],['Mingain','Lengua'],['Moldeko ogi','Pan de molde'],['Ogi','Pan'],['Ogi xigortu','Pan tostado'],['Ogi-xerra','Rebanada de pan'],['Oilasko','Pollo'],['Onddo','Hongo'],['Opil','Bollo'],['Ozpin','Vinagre'],['Palmera','Palmera'],['Palomita','Palomita'],['Pastel','Pastel'],['Patata','Patata'],['Pate','Paté'],['Perretxiko','Seta'],['Perrexil','Perejil'],['Petxuga','Pechuga'],['Piña; Anana','Piña'],['Pintxo','Pincho; banderilla'],['Pipa','Pipa'],['Piper','Pimiento'],['Piper berde','Pimiento verde'],['Piper gorri','Pimiento rojo'],['Piruleta','Piruleta'],['Polo','Polo'],['Razio','Ración'],['Salda','Caldo'],['Solomilo','Solomillo'],['Solomo','Lomo'],['Tipula','Cebolla'],['Tomate','Tomate'],['Tortilla','Tortilla'],['Tostada','Tostada'],['Txerri-txuleta','Chuleta de cerdo'],['Txibi','Calamar'],['Txikle','Chicle'],['Txistor','Chistorra'],['Txokolate','Chocolate'],['Txuleta','Chuleta'],['Txupa txups','Chupa chups'],['Urdaiazpiko','Jamón'],['Urdaiazpiko egosi','Jamón York'],['Xerra','Filete'],['Zereal','Cereal']]],
    ['20.3 Edariak','Bebidas',[['Ardo','Vino'],['Ardo gorri','Vino clarete'],['Ardo beltz','Vino tinto'],['Ardo berezi','Vino especial'],['Ardo txuri','Vino blanco'],['Batido','Batido'],['Beltz berezi','Tinto especial'],['Bermut','Vermouth'],['Biter','Bitter'],['Esne','Leche'],['Freskagarri','Refresco'],['Garagardo','Cerveza'],['Gorri berezi','Claro especial'],['Kaba','Cava'],['Kalimotxo','Calimocho'],['Katxi','Cachi'],['Koñak','Coñac'],['Koktel','Cóctel'],['Konbinatu','Combinado'],['Kopa','Copa'],['Likore','Licor'],['Mosto','Mosto'],['Nahasketa','Mezcla'],['Patxaran','Pacharán'],['Sagar','Manzana'],['Sagardo','Sidra'],['Txakolin','Chacolí'],['Txanpain','Champán'],['Txupito','Chupito'],['Txuri berezi','Blanco especial'],['Ur','Agua'],['Zerbeza; Garagardo','Cerveza'],['Zumo','Zumo']]],
    ['20.4 Infusioak','Infusiones',[['Deskafeinatu','Descafeinado'],['Ebaki; Kortadu','Cortado'],['Kafe','Café'],['Kafe huts','Café solo'],['Kafe irlandar','Café irlandés'],['Kafesne','Café con leche'],['Kamamila','Manzanilla'],['Karajilo','Carajillo'],['Menta','Menta'],['Te','Té'],['Tea limoiarekin','Té con limón']]],
    ['20.5 Jaki prestatuak','Platos preparados',[['Albondiga','Albóndiga'],['Arrain-zopa','Sopa de pescado'],['Arrautza egosia','Huevo cocido'],['Arrautza frijitua','Huevo frito'],['Arroza tomatearekin','Arroz con tomate'],['Arroza txerri-sahieskiarekin','Arroz con costilla de cerdo'],['Atuna tomatearekin','Atún con tomate'],['Babak urdaiazpikoarekin','Habas con jamón'],['Barazki-zopa','Sopa de verduras'],['Bokadilo; Ogitarteko','Bocadillo'],['Entsalada','Ensalada'],['Eskalope','Escalope'],['Haragi egosi','Carne cocida'],['Haragi gisatu','Carne guisada'],['Kanape','Canapé'],['Kaxuela','Cazuela'],['Kroketa','Croqueta'],['Legatz frijitu','Merluza frita'],['Legatza saltsan','Merluza en salsa'],['Lekak patatekin','Vainas con patatas'],['Makarroiak tomatearekin','Macarrones con tomate'],['Oilasko errea','Pollo asado'],['Paella','Paella'],['Patata-tortilla','Tortilla de patatas'],['Petxuga plantxan','Pechuga a la plancha'],['Porru-patatak','Puerros con patatas'],['Txorizo egosia','Chorizo cocido'],['Urdaiazpiko bokadilo','Bocadillo de jamón'],['Vol-au-vent','Vol-au-vent'],['Xerra albardatua','Filete empanado'],['Zizka-mizka','Entremeses'],['Zopa','Sopa']]],
    ['20.6 Postreak','Postres',[['Arroz-esne','Arroz con leche'],['Flan','Flan'],['Fruta','Fruta'],['Gazta-tarta','Tarta de queso'],['Izozki','Helado'],['Jogurt','Yogur'],['Mami; Gatzatu','Cuajada'],['Natilla','Natilla'],['Pastel','Pastel'],['Sagar-tarta','Tarta de manzana']]],
    ['20.7 Aditzak','Verbos',[['Adobatu','Adobar'],['Afaldu','Cenar'],['Ahal izan','Poder'],['Ahaztu','Olvidar(se)'],['Ailegatu; Iritsi','Llegar'],['Albardatu; Arrautza-irinetan pasatu','Albardar; empanar'],['Aldatu','Cambiar(se)'],['Atera','Salir'],['Aukeratu','Elegir'],['Barkatu','Perdonar'],['Batitu','Batir'],['Bazkaldu','Comer'],['Begiratu','Mirar'],['Behar','Necesitar'],['Berotu','Calentar'],['Bete','Llenar; rellenar'],['Bihurritu','Torcer'],['Bilatu','Buscar'],['Birrindu','Rallar'],['Bota','Echar'],['Bukatu','Terminar'],['Busti','Mojar(se)'],['Debekatu','Prohibir'],['Deitu','Llamar'],['Ebaki','Cortar'],['Ebakia egin','Hacer un corte'],['Edan','Beber'],['Eduki','Tener'],['Egon','Estar'],['Egosi','Cocer'],['Ekarri','Traer'],['Eman','Dar'],['Erabili','Utilizar'],['Eragin','Revolver; remover'],['Eraman','Llevar'],['Erantsi','Pegar'],['Erantzun','Contestar'],['Erdibitu','Partir por la mitad'],['Erori','Caer'],['Erosi','Comprar'],['Erre','Quemar; fumar; asar'],['Erretiratu','Retirar(se)'],['Esan','Decir'],['Eseri','Sentar(se)'],['Eskaini','Ofrecer'],['Eskatu','Pedir'],['Eskertu','Agradecer'],['Etorri','Venir'],['Ezin izan','No poder'],['Falta izan','Faltar'],['Frijitu','Freír'],['Galdetu','Preguntar'],['Garbitu','Limpiar'],['Gazitu','Salar'],['Gehitu','Añadir'],['Geratu','Quedar(se)'],['Gertatu','Suceder'],['Gisatu','Guisar'],['Gogoratu','Recordar'],['Gorritu','Dorar'],['Gosaldu','Desayunar'],['Gustatu','Gustar'],['Hartu','Coger; tomar'],['Hasi','Empezar'],['Hots egin','Llamar'],['Hoztu','Enfriar'],['Ibili','Andar'],['Igo','Subir'],['Igo; Altxatu','Subir; levantar(se)'],['Ikusi','Ver'],['Ipini','Poner(se)'],['Irakin','Hervir'],['Ireki','Abrir'],['Irristatu','Resbalar'],['Irten','Salir'],['Itxaron','Esperar'],['Itxi','Cerrar'],['Itzali','Apagar(se)'],['Itzuli','Volver'],['Izan','Ser'],['Izoztu','Congelar'],['Jaitsi','Bajar'],['Jakin','Saber'],['Jan','Comer'],['Jarraitu; Segitu','Seguir'],['Jarri','Poner'],['Joan','Ir'],['Kendu','Quitar(se)'],['Kiskali','Quemar(se); abrasar(se); achicharrar(se)'],['Kobratu','Cobrar'],['Kolpea hartu','Golpear(se)'],['Konturatu','Dar(se) cuenta'],['Lagundu','Ayudar; acompañar'],['Lasaitu','Tranquilizar(se)'],['Loditu','Engordar; espesar(se); cuajar(se)'],['Lotu','Atar; unir'],['Markatu','Marcar'],['Min hartu','Hacerse daño'],['Moztu','Cortar(se)'],['Nahastu','Mezclar'],['Nahi','Querer'],['Nahiago izan','Preferir'],['Oparitu','Regalar'],['Ordaindu','Pagar'],['Pasatu','Pasar'],['Pikatu','Picar'],['Piztu','Encender'],['Probatu','Probar'],['Puskatu','Romper(se)'],['Salteatu','Saltear'],['Sartu','Entrar; meter(se); introducir(se)'],['Seinalatu','Señalar'],['Txikitu','Picar; cortar pequeño'],['Urtu','Derretir'],['Utzi','Dejar; permitir'],['Xigortu','Tostar'],['Zabaldu','Abrir'],['Zauritu','Herir'],['Zintzilikatu','Colgar'],['Zorabiatu','Marear(se)'],['Zuritu','Pelar']]],
    ['20.8 Mahaiko eta sukaldeko tresnak','Utensilios de mesa y de cocina',[['Azpil','Fuente'],['Baso; Edalontzi','Vaso'],['Botila','Botella'],['Burduntzali','Cazo'],['Egurrezko koilara','Cuchara de madera'],['Ehogailu','Molinillo'],['Erretilu','Fuente; bandeja'],['Espatula','Espátula'],['Helduleku','Mango; asa'],['Hozkailu','Frigorífico'],['Inbutu','Embudo'],['Iragazki','Colador'],['Katilu','Tazón; taza'],['Kaxa','Caja'],['Koilara','Cuchara'],['Koilaratxo','Cucharilla'],['Kopa','Copa'],['Labana; Aizto','Cuchillo'],['Labe','Horno'],['Lapiko','Cazuela'],['Mahai','Mesa'],['Molde','Molde'],['Ohol','Tabla'],['Ontzi','Recipiente'],['Plastikozko baso','Vaso de plástico'],['Plater','Plato'],['Plater sakon','Plato hondo'],['Plater zapal','Plato llano'],['Sardexka; Tenedore','Tenedor'],['Serbileta','Servilleta'],['Su','Fuego'],['Zakarrontzi','Basurero'],['Zapi','Mantel'],['Zartagin','Sartén'],['Zerra','Sierra']]],
    ['20.9 Zenbakiak','Números',[['Bat','Uno'],['Bi','Dos'],['Hiru','Tres'],['Lau','Cuatro'],['Bost','Cinco'],['Sei','Seis'],['Zazpi','Siete'],['Zortzi','Ocho'],['Bederatzi','Nueve'],['Hamar','Diez']]],
    ['20.10 Dirua','Dinero',[['Billete','Billete'],['Buelta','Vuelta'],['Diru','Dinero'],['Garesti','Caro'],['Juxtu','Justo'],['Kanbio','Cambio'],['Kontu','Cuenta'],['Merke','Barato'],['Txanpon','Moneda'],['Zentimo','Céntimo']]],
    ['20.11 Adjektiboak','Adjetivos',[['Alai','Alegre'],['Altu','Alto'],['Atsegin','Agradable'],['Baxu','Bajo'],['Bero','Caliente'],['Bero-bero','Muy caliente'],['Bigun','Blando'],['Bikain','Excelente'],['Egina','Hecho'],['Epel','Tibio; templado'],['Fresko','Fresco'],['Garbi','Limpio'],['Garratz','Agrio'],['Gazi','Salado'],['Geza','Soso'],['Gogor','Duro'],['Gordin','Crudo'],['Goxo','Dulce; suave'],['Gozo','Dulce'],['Hotz','Frío'],['Hotz-hotz','Muy frío'],['Itsusi','Feo'],['Lasai','Tranquilo'],['Lehor','Seco'],['Mikatz','Amargo'],['On','Bueno'],['Polit','Bonito'],['Samur','Tierno'],['Sinple','Simple'],['Triste','Triste'],['Txar','Malo; defectuoso'],['Ustel','Podrido'],['Zikin','Sucio'],['Zimel','Marchito']]],
    ['20.12 Koloreak eta formak','Colores y formas',[['Arros','Rosa'],['Beltz','Negro'],['Berde','Verde'],['Borobil','Redondo'],['Gorri','Rojo'],['Handi','Grande'],['Laranja','Naranja'],['Luze','Largo'],['Marroi','Marrón'],['More','Morado'],['Txiki','Pequeño'],['Txuri','Blanco'],['Urdin','Azul']]],
    ['20.13 Gorputz atalak','Partes del cuerpo',[['Beso','Brazo'],['Bizkar','Espalda'],['Buru','Cabeza'],['Esku','Mano'],['Eskumutur','Muñeca'],['Hanka','Pierna'],['Lepo','Cuello'],['Orkatila','Tobillo'],['Sabel; Tripa','Tripa']]],
    ['20.14 Egoerak','Estados',[['Asko egina','Muy hecho'],['Aurpegi txar','Mala cara'],['Bero','Caliente'],['Bero-beroa','Muy caliente'],['Botaka','Vomitando'],['Egarriz','Sediento'],['Fresko-fresko','Bien fresco'],['Gaizki','Mal'],['Gehiegi egina','Demasiado hecho'],['Gosez','Hambriento'],['Gutxi egina','Poco hecho'],['Hobeto','Mejor'],['Hotz','Frío'],['Konorterik gabe','Sin conocimiento'],['Larri','Nervioso; apurado'],['Lehor','Seco'],['Minez','Dolorido'],['Okerrago','Peor'],['Ondo','Bien'],['Ongi','Bien'],['Ondoezik','Indispuesto; mal'],['Samar','Bastante'],['Trankil','Tranquilo'],['Txarto','Mal'],['Zer moduz','Qué tal'],['Zorabiatuta','Mareado'],['Zurbil','Pálido']]],
    ['20.15 Lekuak','Lugares',[['Aparkaleku','Aparcamiento'],['Barra','Barra'],['Eskailera','Escalera'],['Irteera','Salida'],['Jangela','Comedor'],['Komun','Servicio'],['Lur','Suelo'],['Pasilu','Pasillo'],['Sarrera','Entrada'],['Solairu','Piso; planta'],['Sukalde','Cocina'],['Txoko','Rincón']]],
    ['20.16 Gauzen kokapena','La ubicación de las cosas',[['Arte','Hasta'],['Atze','Detrás (de); tras'],['Atzera','Para atrás'],['Aurre','Delante (de); ante'],['Aurrera','Para adelante; adelante'],['Azpi','Debajo (de); bajo'],['Barru','Dentro (de)'],['Barrura','Para dentro (de)'],['Behe','Abajo'],['Behera','Para abajo'],['Erdi','Medio'],['Erdira','Para el medio'],['Eskuin','Derecha'],['Eskuinetara','Para la derecha'],['Ezker','Izquierda'],['Ezkerretara','Para la izquierda'],['Gain','Encima'],['Gainera','Para encima'],['Goi','Arriba'],['Gora','Para arriba'],['Han','Allí'],['Han bertan','Allí mismo'],['Hantxe','Allí mismo'],['Hara','Para allí'],['Hemen','Aquí'],['Hona','Para aquí'],['Hor','Ahí'],['Horra','Para ahí'],['Hortxe','Ahí mismo'],['Inguru','Alrededor; más o menos'],['Kanpo','Fuera'],['Kanpora','Para fuera'],['Non','Dónde'],['Nondik','Desde dónde'],['Nora','Adónde'],['Ondo','Al lado'],['Zuzen','Derecho; recto']]],
    ['20.17 Denbora','El tiempo',[['Goiz','Mañana'],['Arratsalde','Tarde'],['Eguerdi','Mediodía'],['Gau','Noche'],['Astelehen','Lunes'],['Astearte','Martes'],['Asteazken','Miércoles'],['Ostegun','Jueves'],['Ostiral','Viernes'],['Larunbat','Sábado'],['Igande','Domingo'],['Aste','Semana'],['Atzo','Ayer'],['Aurretik','Antes'],['Azkar','Rápido'],['Berandu','Tarde'],['Berehala; Segituan','Enseguida'],['Bihar','Mañana'],['Bitartean','Mientras tanto'],['Datorren','Próximo'],['Gero','Después'],['Etzi','Pasado mañana'],['Gaur','Hoy'],['Goiz','Temprano'],['Laster','Pronto'],['Oraindik','Todavía'],['Ordu','Hora']]],
    ['20.18 Esaldi eginak','Frases hechas',[['(…) ekartzea ahaztu zaizu','Se te ha olvidado traer (…)'],['Ahal da','Se puede'],['Aizu','Oye'],['Aizue','Oíd (vosotros)'],['Bagoaz','Ya vamos; nos vamos'],['Bai, hala da','Sí, así es'],['Baita zuri ere','Igualmente'],['Banoa','Ya voy'],['Barkatu eragozpenak','Perdonen las molestias'],['Barkatu','Perdón'],['Begira','Mira'],['Beste bat ekarriko dizut / dizuet','Te / os traeré otro/a'],['Ea ondo dagoen','A ver si está bien'],['Edari batzuk eskatu nahi dizkizut','Te quiero pedir unas bebidas'],['Ederki','Muy bien'],['Ekarriko dizut / dizuet','Ya te / os lo traeré'],['Emadazu','Dame(lo)'],['Erreserba bat egin nahi dut','Quiero hacer una reserva'],['Esadazu','Dime'],['Esaten du','Dice'],['Eskerrik asko','Gracias'],['Eta gainerako','Y además'],['Ez da ezer','No es nada'],['Ez da posible','No es posible'],['Ezer gabe','Sin nada'],['Ez naiz konturatu','No me he dado cuenta'],['Ezin da','No se puede'],['Itxaron pixka batean','Espera un momento'],['Jakina','Por supuesto'],['Jartzen du','Pone'],['Joan edariak bukatzen','Id terminando las bebidas'],['Konponduko dugu','Lo arreglaremos'],['Lasai','Tranquilo/a'],['Nahi baduzu / baduzue','Si quieres / queréis'],['Nahi duzuna / duzuena','Lo que quieras / queráis'],['Nahi nuke','Quisiera'],['Nola','Cómo'],['Non','Dónde'],['Noren izenean','A nombre de quién'],['Ona(k) dago / daude','Está(n) bueno(s); rico'],['Ondo da','Vale; está bien'],['Orain etorriko da','Ahora viene'],['Oraindik goiz da','Todavía es temprano'],['Pixka batean','Un poco; un momento'],['Posible da','Es posible'],['Primeran','Muy bien'],['Hutsik egin gabe','Sin falta'],['Txarra(k) dago / daude','Está(n) malo(s)'],['Utzidazu','Déjame'],['Zer hartu duzu','Qué has tomado'],['Zer hartu duzue','Qué habéis tomado'],['Zer nahi duzu / duzue','Qué quieres / queréis tomar'],['Zerekin','Con qué'],['Ea, bada','A ver'],['Zenbat da','Cuánto es']]],
    ['20.19 Bestelakoak','Otros',[['Abeslari','Cantante'],['Aitona','Abuelo'],['Aldizkari','Revista'],['Amona','Abuela'],['Anbulantzia','Ambulancia'],['Animalia','Animal'],['Arau','Regla; norma'],['Argi','Luz'],['Argibide','Instrucción; información'],['Asko','Mucho'],['Aspirina','Aspirina'],['Ate','Puerta'],['Baina','Pero'],['Banaketa','Reparto'],['Beroki','Abrigo'],['Bezero','Cliente'],['Botikin','Botiquín'],['Debeku','Prohibición'],['Egunkari','Periódico'],['Eguzkitan','Al sol'],['Eragozpen','Molestia'],['Erreserba','Reserva'],['Eskaera','Pedido'],['Eskaintza','Ofrecimiento'],['Etxe','Casa'],['Euskara','Euskera'],['Ezkontza','Boda'],['Globo; Puxika','Globo'],['Gutxi','Poco'],['Hautsontzi','Cenicero'],['Hondartza','Playa'],['Hurrengo','Próximo'],['Huts','Solo; vacío'],['Itzalean','A la sombra'],['Izotz','Hielo'],['Kartel','Cartel'],['Kaxa','Caja'],['Kexa','Queja'],['Koadrila','Cuadrilla'],['Kromo','Cromo'],['Lagun','Amigo/a'],['Laguntza','Ayuda'],['Lege','Ley'],['Makina','Máquina'],['Marra','Raya'],['Mugikor','Móvil'],['Musika','Música'],['Musika-talde','Grupo de música'],['Mutil','Chico'],['Neska','Chica'],['Opari','Regalo'],['Osagai','Ingrediente'],['Osagarri','Complemento'],['Paper','Papel'],['Pertxero','Perchero'],['Poltsa','Bolsa'],['Prezio','Precio'],['Sendagile','Médico/a'],['Sorosle','Socorrista'],['Sorpresa','Sorpresa'],['Sukaldari','Cocinero/a'],['Tabako','Tabaco'],['Tabako-makina','Máquina de tabaco'],['Telefono','Teléfono'],['Tentsio','Tensión'],['Tirita','Tirita'],['Txakur','Perro/a'],['Txintxo','Formal; bueno'],['Ukendu','Pomada'],['Ume','Niño/a'],['Zarata','Ruido'],['Zerbait','Algo'],['Zerbitzari','Camarero/a'],['Zigarro','Cigarro'],['Ziztada','Picadura; pinchazo'],['Zuei','A vosotros'],['Zuri','A ti']]]
  ]
});

/* ─────────────────────────── Kartela · Frutak eta barazkiak ─────────────────────────── */

A2_OSTALARITZA.kartela = {
  eu:'Eska itzazu frutak eta barazkiak euskaraz',
  es:'Pide las frutas y las verduras en euskera',
  src:'Andoain, Astigarraga, Hernani, Lasarte-Oria, Urnieta eta Usurbilgo udalak · Euskarako Batzordea',
  pdf:'frutak-barazkiak-kartela.pdf',
  nota:'⚠ El cartel solo trae los nombres en euskera (en plural, como se piden en la tienda); la traducción al castellano la ha añadido Claude.',
  frutak:[['Ahuakateak','Aguacates'],['Albertxikoak','Albaricoques'],['Ananak','Piñas'],['Angurriak','Sandías'],['Aranak','Ciruelas'],['Arbendolak','Almendras'],['Bananak','Bananas'],['Datilak','Dátiles'],['Gaztainak','Castañas'],['Gereziak','Cerezas'],['Hurrak','Avellanas'],['Intxaurrak','Nueces'],['Irasagarrak','Membrillos'],['Kakahueteak','Cacahuetes'],['Kakiak','Caquis'],['Kiwiak','Kiwis'],['Klementinak','Clementinas'],['Laranjak','Naranjas'],['Limoiak','Limones'],['Mahaspasak','Pasas'],['Mahatsa','Uva'],['Mandarinak','Mandarinas'],['Mangoak','Mangos'],['Marrubiak','Fresas'],['Meloiak','Melones'],['Mertxikak','Melocotones'],['Mingranak','Granadas'],['Mizpirak','Nísperos'],['Nektarinak','Nectarinas'],['Orejoiak','Orejones'],['Papaiak','Papayas'],['Paraguaioak','Paraguayos'],['Pikuak','Higos'],['Platanoak','Plátanos'],['Pomeloak','Pomelos'],['Sagarrak','Manzanas'],['Txirimoiak','Chirimoyas'],['Udareak','Peras'],['Uztapikuak','Brevas']],
  barazkiak:[['Alberjiniak','Berenjenas'],['Apioa','Apio'],['Azak','Berzas; coles'],['Azaloreak','Coliflores'],['Azenarioak','Zanahorias'],['Babak','Habas'],['Babarrunak','Alubias'],['Baratxuriak','Ajos'],['Batatak','Batatas'],['Borraja','Borraja'],['Brokoliak','Brócolis'],['Dilistak','Lentejas'],['Endibiak','Endibias'],['Errefautxoak','Rabanitos'],['Erremolatxak','Remolachas'],['Eskarolak','Escarolas'],['Esparragoak','Espárragos'],['Espinakak','Espinacas'],['Ilarrak','Guisantes'],['Kardua','Cardo'],['Kornixonak','Pepinillos'],['Kuiak','Calabazas'],['Kuiatxoak','Calabacines'],['Kukuluak','Cogollos'],['Lekak','Vainas (judías verdes)'],['Orburuak','Alcachofas'],['Patatak','Patatas'],['Pepinoak','Pepinos'],['Perretxikoak','Setas'],['Piperrak','Pimientos'],['Piperminak','Guindillas'],['Porruak','Puerros'],['Romaneskoak','Romanescos'],['Tipulak','Cebollas'],['Tipulinak','Cebolletas'],['Tomateak','Tomates'],['Txanpiñoiak','Champiñones'],['Txitxirioak','Garbanzos'],['Urazak','Lechugas'],['Zerbak','Acelgas']]
};
